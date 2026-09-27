// Jayvi Foods — verify-razorpay-payment
//
// 1) Checkout success callback:
//    POST { order_number, phone, razorpay_order_id, razorpay_payment_id, razorpay_signature }
// 2) Reconcile ("I've already paid", customer returned, connection dropped):
//    POST { order_number, phone, mode:"reconcile" }
//
// → { ok:true, status: "paid" | "pending" | "processing" | "failed" | "review" | "not_razorpay", message, payment_method? }
// → { ok:false, code:"invalid_signature" | ..., message }
//
// The order is marked paid ONLY after: signature is valid (HMAC with
// RAZORPAY_KEY_SECRET), the payment is fetched from Razorpay and is
// captured, and its order id / amount / currency match what this server
// created. The browser's "success" alone never changes anything.
//
// Deploy: supabase functions deploy verify-razorpay-payment --no-verify-jwt

import { Db } from "../_shared/db.ts";
import { errorResponse, json, log, PublicError, readJson, str } from "../_shared/http.ts";
import {
  attemptByRzpOrder, loadAuthorisedOrder, PAID_PAYMENT_STATUSES, PAYABLE_STATUSES, publicStatus, reconcileOrder, settlePayment,
} from "../_shared/payments.ts";
import { Razorpay, RazorpayApiError, rzpConfig, verifyCheckoutSignature } from "../_shared/razorpay.ts";

const FN = "verify-razorpay-payment";

async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") return json(req, 200, { ok: true });
  if (req.method !== "POST") return json(req, 405, { ok: false, code: "method_not_allowed" });
  try {
    const body = await readJson(req);
    const db = new Db();
    const order = await loadAuthorisedOrder(db, body);

    if (order.payment_method !== "razorpay") {
      return json(req, 200, { ok: true, status: "not_razorpay", payment_method: order.payment_method ?? null, message: "" });
    }
    // Already paid: answer immediately — unless the browser reports a DIFFERENT
    // payment (e.g. paid again in a second tab). That one is still verified
    // below so it gets recorded as duplicate_paid and flagged for refund.
    const reportedPayment = str(body.razorpay_payment_id, 64);
    if (PAID_PAYMENT_STATUSES.includes(order.payment_status)
        && (body.mode === "reconcile" || !reportedPayment || reportedPayment === order.razorpay_payment_id)) {
      return json(req, 200, { ok: true, status: "paid", payment_method: "razorpay", ...paidMsg() });
    }

    const cfg = rzpConfig();
    if (!cfg.keyId || !cfg.keySecret) {
      log("error", FN, "not_configured", {});
      // Don't claim failure — the webhook can still settle it later.
      return json(req, 200, { ok: true, payment_method: "razorpay", ...publicStatus("processing") });
    }
    const rzp = new Razorpay(cfg);

    if (body.mode === "reconcile") {
      const outcome = await reconcileOrder(db, rzp, order);
      return json(req, 200, { ok: true, payment_method: "razorpay", payable: PAYABLE_STATUSES.includes(order.status), ...publicStatus(outcome) });
    }

    // ---- Checkout callback
    const rzpOrderId = str(body.razorpay_order_id, 64);
    const paymentId = str(body.razorpay_payment_id, 64);
    const signature = str(body.razorpay_signature, 256);
    if (!rzpOrderId || !paymentId || !signature) throw new PublicError(400, "bad_request");

    const attempt = await attemptByRzpOrder(db, rzpOrderId);
    if (!attempt || attempt.order_number !== order.order_number) {
      log("warn", FN, "unknown_razorpay_order", { order_number: order.order_number, rzpOrderId });
      throw new PublicError(400, "invalid_signature");
    }

    const valid = await verifyCheckoutSignature(rzpOrderId, paymentId, signature, cfg.keySecret);
    if (!valid) {
      log("warn", FN, "invalid_signature", { order_number: order.order_number, rzpOrderId, paymentId });
      await db.rpc("razorpay_note_signature_failure", { p_razorpay_order_id: rzpOrderId, p_razorpay_payment_id: paymentId }).catch(() => null);
      throw new PublicError(400, "invalid_signature");
    }

    const outcome = await settlePayment(db, rzp, attempt, paymentId, { method: "checkout_signature", signature });
    return json(req, 200, { ok: true, payment_method: "razorpay", ...publicStatus(outcome) });
  } catch (err) {
    if (err instanceof RazorpayApiError) {
      // Razorpay API unreachable/erroring after a real payment: never report failure.
      return json(req, 200, { ok: true, payment_method: "razorpay", ...publicStatus("processing") });
    }
    return errorResponse(req, err, FN);
  }
}

const paidMsg = () => ({ message: "Payment received. Your order is confirmed." });

Deno.serve(handler);
