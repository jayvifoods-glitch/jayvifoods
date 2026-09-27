// Jayvi Foods — create-razorpay-order
//
// POST { order_number, phone }
//   → { ok:true, status:"ready", key_id, razorpay_order_id, amount, currency, order_number, prefill, description }
//   → { ok:true, status:"already_paid", order_number }
//   → { ok:false, code, message }            (message is always customer-safe)
//
// POST { action:"status", admin_key_id? }   (Admin → Settings configuration check; no secrets returned)
//   → { ok:true, server_configured, webhook_configured, key_id, key_mode, admin_key_matches, razorpay_enabled }
//
// The Jayvi order itself is created by the existing place_order() RPC
// (coupon validation, stock, delivery rules — unchanged). This function
// only prices the Razorpay order, from database data, never from the browser.
//
// Deploy with JWT verification OFF (guests have no JWT):
//   supabase functions deploy create-razorpay-order --no-verify-jwt

import { computeTrustedAmount } from "../_shared/amount.ts";
import { Db } from "../_shared/db.ts";
import { errorResponse, json, log, PublicError, readJson, str } from "../_shared/http.ts";
import { listAttempts, loadAuthorisedOrder, PAID_PAYMENT_STATUSES, PAYABLE_STATUSES, reconcileOrder } from "../_shared/payments.ts";
import { KEY_ID_RE, keyMode, Razorpay, RazorpayApiError, rzpConfig } from "../_shared/razorpay.ts";

const FN = "create-razorpay-order";

export async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") return json(req, 200, { ok: true });
  if (req.method !== "POST") return json(req, 405, { ok: false, code: "method_not_allowed" });
  try {
    const body = await readJson(req);
    const cfg = rzpConfig();
    const db = new Db();
    const [settings] = await db.select<{ razorpay_enabled: boolean; razorpay_key_id: string | null }>(
      "store_settings", "select=razorpay_enabled,razorpay_key_id&id=eq.default");

    // ---- Admin configuration check (public info only)
    if (body.action === "status") {
      const adminKey = str(body.admin_key_id, 80) || (settings?.razorpay_key_id ?? "");
      return json(req, 200, {
        ok: true,
        razorpay_enabled: !!settings?.razorpay_enabled,
        server_configured: KEY_ID_RE.test(cfg.keyId) && cfg.keySecret.length > 0,
        webhook_configured: cfg.webhookSecret.length > 0,
        key_id: KEY_ID_RE.test(cfg.keyId) ? cfg.keyId : null,   // public identifier, safe to show
        key_mode: keyMode(cfg.keyId),
        admin_key_matches: adminKey ? adminKey === cfg.keyId : null,
      });
    }

    // ---- Preconditions
    if (!settings?.razorpay_enabled) throw new PublicError(409, "razorpay_disabled", "Online payment is currently unavailable. Please choose another payment method.");
    if (!KEY_ID_RE.test(cfg.keyId) || !cfg.keySecret) {
      log("error", FN, "not_configured", { hasKeyId: !!cfg.keyId, hasSecret: !!cfg.keySecret });
      throw new PublicError(503, "not_configured", "Online payment is currently unavailable. Please choose another payment method.");
    }
    if (settings.razorpay_key_id && settings.razorpay_key_id !== cfg.keyId) {
      // Server secret decides which key pairs with it; Admin sees a warning in Settings.
      log("warn", FN, "admin_key_id_differs_from_server_key", { admin: settings.razorpay_key_id, server: cfg.keyId });
    }

    const order = await loadAuthorisedOrder(db, body);
    const rzp = new Razorpay(cfg);

    if (order.payment_method !== "razorpay") throw new PublicError(409, "not_razorpay_order");
    if (PAID_PAYMENT_STATUSES.includes(order.payment_status)) {
      return json(req, 200, { ok: true, status: "already_paid", order_number: order.order_number });
    }
    if (!PAYABLE_STATUSES.includes(order.status)) {
      throw new PublicError(409, "not_payable", "This order can no longer be paid online. Please contact us if you need help.");
    }

    // ---- Trusted amount
    const items = await db.select<any>("order_items",
      `select=item_type,product_id,variant_id,combo_id,qty,unit_price&order_id=eq.${encodeURIComponent(order.id)}`);
    const amount = await computeTrustedAmount(db, order, items);
    if (!amount.ok) {
      log("warn", FN, "amount_rejected", { order_number: order.order_number, reason: amount.reason, breakdown: amount.breakdown });
      throw new PublicError(409, "amount_mismatch");
    }

    // ---- Reuse an open Razorpay order (double click, refresh, second tab)
    const attempts = await listAttempts(db, order.order_number);
    if (attempts.some((a) => a.status === "paid")) {
      await reconcileOrder(db, rzp, order).catch(() => null);
      return json(req, 200, { ok: true, status: "already_paid", order_number: order.order_number });
    }
    let rzpOrderId: string | null = null;
    const open = attempts.find((a) => (a.status === "created" || a.status === "attempted" || a.status === "failed") && Number(a.amount_paise) === amount.amountPaise);
    if (open) {
      try {
        const ro = await rzp.fetchOrder(open.razorpay_order_id);
        if (ro.status === "paid") {
          const outcome = await reconcileOrder(db, rzp, order);
          if (outcome === "paid" || outcome === "already_paid") {
            return json(req, 200, { ok: true, status: "already_paid", order_number: order.order_number });
          }
        } else if (Number(ro.amount) === amount.amountPaise) {
          rzpOrderId = ro.id; // created | attempted → still payable
        }
      } catch (e) {
        if (!(e instanceof RazorpayApiError) || e.status === 0) throw e;
      }
    }

    // ---- Create a new Razorpay order
    if (!rzpOrderId) {
      const receipt = String(order.order_number).slice(0, 40);
      const ro = await rzp.createOrder(amount.amountPaise, receipt, { jayvi_order_number: String(order.order_number) });
      if (Number(ro.amount) !== amount.amountPaise) {
        log("error", FN, "razorpay_amount_differs", { expected: amount.amountPaise, got: ro.amount });
        throw new PublicError(502, "gateway_error");
      }
      const rec = await db.rpc<string>("razorpay_record_order_created", {
        p_order_number: order.order_number, p_razorpay_order_id: ro.id,
        p_amount_paise: amount.amountPaise, p_currency: "INR", p_receipt: receipt,
      });
      if (rec !== "ok") throw new PublicError(409, "order_not_found");
      rzpOrderId = ro.id;
      log("info", FN, "razorpay_order_created", { order_number: order.order_number, razorpay_order_id: ro.id, amount: amount.amountPaise });
    }

    return json(req, 200, {
      ok: true,
      status: "ready",
      key_id: cfg.keyId,
      razorpay_order_id: rzpOrderId,
      amount: amount.amountPaise,
      currency: "INR",
      order_number: order.order_number,
      description: `Order ${order.order_number}`,
      prefill: { name: String(order.guest_name ?? "").slice(0, 80), contact: String(order.guest_phone ?? "").replace(/\D/g, "").slice(-10) },
    });
  } catch (err) {
    if (err instanceof RazorpayApiError) return errorResponse(req, new PublicError(502, "gateway_error"), FN);
    return errorResponse(req, err, FN);
  }
}

Deno.serve(handler);
