// Jayvi Foods — shared Razorpay settlement logic used by
// verify-razorpay-payment (checkout callback + reconcile) and
// razorpay-webhook. All state changes go through the SECURITY DEFINER
// SQL functions in supabase_migration_razorpay_v1.sql, which lock the
// order row, so callback + webhook arriving together can't double-apply.

import { Db } from "./db.ts";
import { digits10, log, ORDER_NUMBER_RE, PublicError, str } from "./http.ts";
import { Razorpay, RazorpayApiError, RzpPayment } from "./razorpay.ts";

export const PAYABLE_STATUSES = ["Payment Pending", "Payment Failed"];
export const PAID_PAYMENT_STATUSES = ["verified", "refund_pending", "refunded"];

export type Order = Record<string, any>;
export type Attempt = {
  id: string; order_number: string; razorpay_order_id: string; razorpay_payment_id: string | null;
  amount_paise: number; status: string; created_at: string;
};

/** Load a Jayvi order and check the caller knows its phone number (same model as track_guest_order). */
export async function loadAuthorisedOrder(db: Db, body: Record<string, unknown>): Promise<Order> {
  const orderNumber = str(body.order_number, 40);
  const phone = digits10(body.phone);
  if (!ORDER_NUMBER_RE.test(orderNumber) || phone.length !== 10) throw new PublicError(400, "bad_request");
  const rows = await db.select<Order>("orders", `select=*&order_number=eq.${encodeURIComponent(orderNumber)}&limit=1`);
  const order = rows[0];
  if (!order || digits10(order.guest_phone) !== phone) {
    throw new PublicError(404, "order_not_found", "We couldn't find this order. Please check the order number and mobile number.");
  }
  return order;
}

export async function listAttempts(db: Db, orderNumber: string): Promise<Attempt[]> {
  return await db.select<Attempt>("razorpay_payments",
    `select=id,order_number,razorpay_order_id,razorpay_payment_id,amount_paise,status,created_at&order_number=eq.${encodeURIComponent(orderNumber)}&order=created_at.desc&limit=10`);
}

export async function attemptByRzpOrder(db: Db, rzpOrderId: string): Promise<Attempt | null> {
  const rows = await db.select<Attempt>("razorpay_payments",
    `select=id,order_number,razorpay_order_id,razorpay_payment_id,amount_paise,status,created_at&razorpay_order_id=eq.${encodeURIComponent(rzpOrderId)}&limit=1`);
  return rows[0] ?? null;
}

export type SettleOutcome =
  | "paid" | "already_paid" | "duplicate_payment" | "paid_after_cancel"
  | "failed" | "pending" | "processing" | "amount_mismatch" | "review";

/**
 * Settle one Razorpay payment for a known attempt. `entity` may come from a
 * signature-verified webhook; otherwise the payment is fetched from the
 * Razorpay API (the server never trusts browser-supplied status).
 */
export async function settlePayment(
  db: Db, rzp: Razorpay, attempt: Attempt, paymentId: string,
  opts: { method: "checkout_signature" | "webhook" | "reconcile"; signature?: string | null; entity?: RzpPayment },
): Promise<SettleOutcome> {
  let p: RzpPayment;
  try {
    p = opts.entity ?? await rzp.fetchPayment(paymentId);
  } catch (e) {
    if (e instanceof RazorpayApiError && e.status === 0) return "processing"; // network: don't assume failure
    throw e;
  }

  if (p.order_id !== attempt.razorpay_order_id || p.currency !== "INR" || Number(p.amount) !== Number(attempt.amount_paise)) {
    log("error", "settle", "payment_does_not_match_attempt", {
      order_number: attempt.order_number, attempt: attempt.razorpay_order_id,
      payment_order: p.order_id, amount: p.amount, expected: attempt.amount_paise, currency: p.currency,
    });
    if (p.order_id === attempt.razorpay_order_id && (p.status === "captured" || p.status === "authorized")) {
      await db.rpc("razorpay_mark_paid", {
        p_order_number: attempt.order_number, p_razorpay_order_id: attempt.razorpay_order_id,
        p_razorpay_payment_id: p.id, p_signature: opts.signature ?? null,
        p_amount_paise: Number(p.amount), p_method: opts.method,
      }); // records amount_mismatch for Admin
      return "amount_mismatch";
    }
    return "review";
  }

  if (p.status === "authorized") {
    // Auto-capture may be off in the Razorpay account: capture our own order's payment.
    try {
      p = await rzp.capturePayment(p.id, Number(attempt.amount_paise));
    } catch (e) {
      if (e instanceof RazorpayApiError && e.status === 0) return "processing";
      // Already captured by auto-capture / a parallel request → re-read.
      try { p = await rzp.fetchPayment(p.id); } catch { return "processing"; }
    }
  }

  if (p.status === "captured" || p.status === "refunded") {
    const result = await db.rpc<string>("razorpay_mark_paid", {
      p_order_number: attempt.order_number, p_razorpay_order_id: attempt.razorpay_order_id,
      p_razorpay_payment_id: p.id, p_signature: opts.signature ?? null,
      p_amount_paise: Number(p.amount), p_method: opts.method,
    });
    log("info", "settle", "mark_paid", { order_number: attempt.order_number, payment: p.id, method: opts.method, result });
    if (result === "paid" || result === "already_paid" || result === "duplicate_payment" || result === "paid_after_cancel" || result === "amount_mismatch") {
      return result;
    }
    return "review";
  }

  if (p.status === "failed") {
    const reason = [p.error_code, p.error_reason].filter(Boolean).join(":") || "payment_failed";
    const result = await db.rpc<string>("razorpay_mark_failed", {
      p_order_number: attempt.order_number, p_razorpay_order_id: attempt.razorpay_order_id,
      p_razorpay_payment_id: p.id, p_reason: reason,
    });
    log("info", "settle", "mark_failed", { order_number: attempt.order_number, payment: p.id, result });
    return result === "ignored_paid" ? "already_paid" : "failed";
  }

  return "pending"; // created / still authorising
}

/**
 * Ask Razorpay what really happened for this Jayvi order (customer
 * returned after closing the tab, lost connection, or pressed
 * "I've already paid"). Settles any captured/authorized payment.
 */
export async function reconcileOrder(db: Db, rzp: Razorpay, order: Order): Promise<SettleOutcome> {
  const attempts = await listAttempts(db, order.order_number);
  if (!attempts.length) return "pending";
  let sawFailure = false;
  let sawNetworkIssue = false;
  for (const att of attempts.slice(0, 5)) {
    let payments: RzpPayment[];
    try {
      payments = (await rzp.fetchOrderPayments(att.razorpay_order_id)).items ?? [];
    } catch (e) {
      if (e instanceof RazorpayApiError && e.status === 0) { sawNetworkIssue = true; continue; }
      throw e;
    }
    const good = payments.find((p) => p.status === "captured") ?? payments.find((p) => p.status === "authorized");
    if (good) return await settlePayment(db, rzp, att, good.id, { method: "reconcile", entity: good.status === "captured" ? good : undefined });
    const failed = payments.find((p) => p.status === "failed");
    if (failed) {
      sawFailure = true;
      if (att === attempts[0]) await settlePayment(db, rzp, att, failed.id, { method: "reconcile", entity: failed });
    }
  }
  if (sawNetworkIssue) return "processing";
  return sawFailure ? "failed" : "pending";
}

/** Customer-facing view of an outcome. */
export function publicStatus(outcome: SettleOutcome): { status: string; message: string } {
  switch (outcome) {
    case "paid": case "already_paid": case "duplicate_payment":
      return { status: "paid", message: "Payment received. Your order is confirmed." };
    case "failed":
      return { status: "failed", message: "Payment could not be completed. Please try again or choose another payment method." };
    case "processing": case "pending":
      return { status: outcome, message: "We haven't received a confirmed payment for this order yet. If money was debited, it will be confirmed automatically within a few minutes." };
    default: // amount_mismatch | review | paid_after_cancel
      return { status: "review", message: "We've received your payment and our team is reviewing it. We'll contact you shortly." };
  }
}
