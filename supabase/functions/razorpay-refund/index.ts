// Jayvi Foods — razorpay-refund (V34.4)
//
// Refunds the Razorpay payment of a CANCELLED order. It never cancels an
// order itself: cancellation stays with the existing cancel_order() RPC
// (customer) or the Admin status editor, so the existing cancellation
// window (Order Confirmed / Preparing only) and status_transitions rules
// remain the single authority.
//
//   Customer (after cancel_order succeeded):
//     POST { action:"request", order_number, phone }
//   Admin (retry, or after cancelling in Admin):
//     POST { action:"admin_refund", order_number }   Authorization: Bearer <admin access token>
//
//   → { ok:true, status, amount?, message }
//     status: refund_initiated | refund_pending | refunded | not_applicable |
//             not_cancelled | excluded | refund_failed (admin only; customers see refund_pending)
//
// Idempotency: razorpay_refund_begin() claims the refund under a row lock
// and refuses a second claim; before creating a refund, existing refunds
// for the payment are read back from Razorpay (covers a crash between the
// API call and the DB write). The refund is then recorded through the
// SAME razorpay_record_refund() the webhook uses; refund.processed later
// moves the order Refund Pending → Refunded.
//
// Deploy: supabase functions deploy razorpay-refund --no-verify-jwt

import { Db } from "../_shared/db.ts";
import { describe, errorResponse, json, log, ORDER_NUMBER_RE, PublicError, readJson, str } from "../_shared/http.ts";
import { loadAuthorisedOrder, Order } from "../_shared/payments.ts";
import { Razorpay, RazorpayApiError, RzpRefund, rzpConfig } from "../_shared/razorpay.ts";

const FN = "razorpay-refund";

async function refundDays(db: Db): Promise<number> {
  try {
    const [s] = await db.select<{ refund_business_days: number }>("store_settings", "select=refund_business_days&id=eq.default");
    return Number(s?.refund_business_days) || 4;
  } catch { return 4; }
}

/** Admin check: token must be a valid Supabase session (Auth API) whose profile has role = admin. */
async function requireAdmin(req: Request, db: Db): Promise<string> {
  const token = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  const url = (Deno.env.get("SUPABASE_URL") ?? "").replace(/\/$/, "");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  if (!token || token === key) throw new PublicError(401, "not_authorised", "Please sign in again.");
  let userId = "";
  try {
    const res = await fetch(`${url}/auth/v1/user`, { headers: { apikey: key, Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(10_000) });
    if (res.ok) userId = String((await res.json())?.id ?? "");
  } catch (e) { log("warn", FN, "auth_lookup_failed", { error: describe(e) }); }
  if (!userId) throw new PublicError(401, "not_authorised", "Please sign in again.");
  const rows = await db.select<{ role: string }>("profiles", `select=role&id=eq.${encodeURIComponent(userId)}&limit=1`);
  if (rows[0]?.role !== "admin") throw new PublicError(403, "not_authorised", "Admin access required.");
  return userId;
}

type Outcome = { status: string; amount?: number; detail?: string };

async function refundOrder(db: Db, rzp: Razorpay, order: Order, actor: "customer" | "admin"): Promise<Outcome> {
  if (order.payment_method !== "razorpay") return { status: "not_applicable" };
  const begin = await db.rpc<any>("razorpay_refund_begin", { p_order_number: order.order_number, p_actor: actor });
  switch (begin?.result) {
    case "not_applicable": return { status: "not_applicable" };
    case "not_cancelled": return { status: "not_cancelled" };
    case "excluded": return { status: "excluded" };
    case "already_refunded": return { status: "refunded" };
    case "already_requested": case "in_progress": return { status: "refund_pending" };
    case "proceed": break;
    default: throw new Error(`unexpected refund_begin result ${JSON.stringify(begin)}`);
  }
  const paymentId = String(begin.payment_id);
  const amount = Number(begin.amount_paise);

  try {
    // 1) Idempotency against Razorpay itself: a refund may already exist
    //    (created by an earlier attempt that crashed, or by Admin in the Dashboard).
    const existing = ((await rzp.fetchPaymentRefunds(paymentId)).items ?? []).filter((r) => r.status !== "failed");
    let refunds: RzpRefund[] = existing;
    if (!existing.length) {
      // 2) Create exactly one refund for the remaining amount.
      const refund = await rzp.createRefund(paymentId, amount, `${order.order_number}-refund`.slice(0, 40), {
        jayvi_order_number: String(order.order_number), reason: "order_cancelled", requested_by: actor,
      });
      refunds = [refund];
      log("info", FN, "refund_created", { order_number: order.order_number, refund: refund.id, amount: refund.amount, status: refund.status });
    } else {
      log("info", FN, "refund_already_exists_at_razorpay", { order_number: order.order_number, refunds: existing.map((r) => r.id) });
    }
    // 3) Record through the same idempotent function the webhook uses.
    for (const r of refunds) {
      await db.rpc("razorpay_record_refund", {
        p_razorpay_payment_id: paymentId, p_refund_id: r.id, p_amount_paise: Number(r.amount),
        p_refund_status: r.status === "processed" ? "processed" : "pending",
      });
    }
    const allProcessed = refunds.every((r) => r.status === "processed");
    return { status: allProcessed ? "refunded" : "refund_initiated", amount: refunds.reduce((s, r) => s + Number(r.amount), 0) / 100 };
  } catch (e) {
    const detail = e instanceof RazorpayApiError ? `${e.rzpCode}: ${e.rzpDescription}` : describe(e);
    log("error", FN, "refund_failed", { order_number: order.order_number, detail });
    await db.rpc("razorpay_refund_failed", { p_order_number: order.order_number, p_error: detail }).catch(() => null);
    return { status: "refund_failed", amount: amount / 100, detail };
  }
}

function message(status: string, days: number, amount?: number): string {
  const amt = amount ? `₹${amount % 1 ? amount.toFixed(2) : amount} ` : "";
  switch (status) {
    case "refund_initiated": case "refund_pending": case "refund_failed":
      return `Your refund ${amt}has been initiated to your original payment method and should reach you within ${days} business days.`;
    case "refunded": return `Your refund ${amt}has been processed to your original payment method.`;
    case "excluded": return `Your refund will be processed by our team within ${days} business days.`;
    default: return "";
  }
}

async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") return json(req, 200, { ok: true });
  if (req.method !== "POST") return json(req, 405, { ok: false, code: "method_not_allowed" });
  try {
    const body = await readJson(req);
    const db = new Db();
    const cfg = rzpConfig();
    const action = str(body.action, 20);

    let order: Order; let actor: "customer" | "admin";
    if (action === "request") {
      order = await loadAuthorisedOrder(db, body);
      actor = "customer";
    } else if (action === "admin_refund") {
      await requireAdmin(req, db);
      const n = str(body.order_number, 40);
      if (!ORDER_NUMBER_RE.test(n)) throw new PublicError(400, "bad_request");
      const rows = await db.select<Order>("orders", `select=*&order_number=eq.${encodeURIComponent(n)}&limit=1`);
      if (!rows[0]) throw new PublicError(404, "order_not_found", "Order not found.");
      order = rows[0]; actor = "admin";
    } else {
      throw new PublicError(400, "bad_request");
    }

    if (order.payment_method !== "razorpay") return json(req, 200, { ok: true, status: "not_applicable", message: "" });
    if (!cfg.keyId || !cfg.keySecret) {
      log("error", FN, "not_configured", {});
      const days = await refundDays(db);
      return json(req, 200, { ok: true, status: actor === "admin" ? "refund_failed" : "refund_pending", message: actor === "admin" ? "Razorpay secrets are not configured on the server." : message("refund_pending", days) });
    }

    const out = await refundOrder(db, new Razorpay(cfg), order, actor);
    const days = await refundDays(db);
    if (actor === "customer") {
      const status = out.status === "refund_failed" ? "refund_pending" : out.status; // customers never see gateway errors
      return json(req, 200, { ok: true, status, amount: out.amount ?? null, message: message(status, days, out.amount) });
    }
    return json(req, 200, {
      ok: true, status: out.status, amount: out.amount ?? null,
      message: out.status === "refund_failed" ? `Razorpay refund could not be created (${out.detail}). The order stays Refund Pending — you can retry, or refund from the Razorpay Dashboard.`
             : out.status === "excluded" ? "This order is excluded from automatic refunds (razorpay_refund_exclusions). Refund it manually in the Razorpay Dashboard if needed — the webhook will record it."
             : out.status === "not_cancelled" ? "Only cancelled orders can be refunded here. Cancel the order first."
             : message(out.status, days, out.amount),
    });
  } catch (err) {
    return errorResponse(req, err, FN);
  }
}

Deno.serve(handler);
