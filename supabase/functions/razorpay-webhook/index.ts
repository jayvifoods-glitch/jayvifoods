// Jayvi Foods — razorpay-webhook
//
// Webhook URL to enter in Razorpay Dashboard → Settings → Webhooks:
//   https://<project-ref>.supabase.co/functions/v1/razorpay-webhook
// Events: payment.captured, payment.failed, order.paid, payment.authorized,
//         refund.created, refund.processed, refund.failed
// Secret: any strong random string; store the SAME value as the
//         Supabase secret RAZORPAY_WEBHOOK_SECRET.
//
// Security / reliability:
//   • X-Razorpay-Signature = HMAC_SHA256(raw body, RAZORPAY_WEBHOOK_SECRET),
//     verified in constant time BEFORE anything is parsed or stored.
//   • Idempotent: each x-razorpay-event-id is processed once
//     (razorpay_webhook_events); settlement functions are idempotent too.
//   • Never creates Jayvi orders; only settles payments for Razorpay
//     orders this server created (razorpay_payments).
//   • Returns 5xx on transient errors so Razorpay retries.
//
// Deploy: supabase functions deploy razorpay-webhook --no-verify-jwt

import { Db } from "../_shared/db.ts";
import { describe, log } from "../_shared/http.ts";
import { attemptByRzpOrder, settlePayment } from "../_shared/payments.ts";
import { Razorpay, RazorpayApiError, RzpPayment, rzpConfig, sha256Hex, verifyWebhookSignature } from "../_shared/razorpay.ts";

const FN = "razorpay-webhook";
const text = (status: number, body: string) =>
  new Response(body, { status, headers: { "Content-Type": "text/plain", "Cache-Control": "no-store" } });

async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") return text(405, "method not allowed");
  const cfg = rzpConfig();
  if (!cfg.webhookSecret) {
    log("error", FN, "webhook_secret_missing", {});
    return text(503, "not configured"); // Razorpay will retry once configured
  }

  const raw = await req.text();
  const signature = req.headers.get("x-razorpay-signature") ?? "";
  if (!(await verifyWebhookSignature(raw, signature, cfg.webhookSecret))) {
    log("warn", FN, "invalid_signature", { length: raw.length });
    return text(401, "invalid signature");
  }

  let payload: any;
  try { payload = JSON.parse(raw); } catch { return text(400, "bad json"); }
  const event = String(payload?.event ?? "");
  const eventId = req.headers.get("x-razorpay-event-id") || `sha256:${await sha256Hex(raw)}`;

  let db: Db;
  try {
    db = new Db();
    const begin = await db.rpc<string>("razorpay_webhook_begin", { p_event_id: eventId, p_event: event, p_payload: payload });
    if (begin === "duplicate") {
      log("info", FN, "duplicate_event", { eventId, event });
      return text(200, "duplicate");
    }
  } catch (e) {
    log("error", FN, "begin_failed", { eventId, error: describe(e) });
    return text(500, "retry");
  }

  try {
    const result = await processEvent(db, new Razorpay(cfg), event, payload);
    await db.rpc("razorpay_webhook_finish", { p_event_id: eventId, p_result: result });
    log("info", FN, "processed", { eventId, event, result });
    return text(200, result);
  } catch (e) {
    log("error", FN, "processing_failed", { eventId, event, error: describe(e) });
    // Not marked processed → Razorpay's retry will reprocess (idempotently).
    return text(500, "retry");
  }
}

async function processEvent(db: Db, rzp: Razorpay, event: string, payload: any): Promise<string> {
  const payment: RzpPayment | undefined = payload?.payload?.payment?.entity;

  switch (event) {
    case "payment.captured":
    case "payment.authorized":
    case "payment.failed":
    case "order.paid": {
      const orderId = payment?.order_id ?? payload?.payload?.order?.entity?.id;
      if (!payment?.id || !orderId) return "ignored:no_payment";
      const attempt = await attemptByRzpOrder(db, orderId);
      if (!attempt) return "ignored:unknown_order"; // not created by this site
      try {
        // A captured/failed entity from a signature-verified webhook is authoritative;
        // an authorized one is captured by settlePayment().
        const outcome = await settlePayment(db, rzp, attempt, payment.id, { method: "webhook", entity: payment });
        if (outcome === "processing") throw new Error("razorpay_unreachable");
        return outcome;
      } catch (e) {
        if (e instanceof RazorpayApiError && e.status !== 0) return `error:${e.rzpCode}`;
        throw e;
      }
    }

    case "refund.created":
    case "refund.processed":
    case "refund.failed": {
      const refund = payload?.payload?.refund?.entity;
      if (!refund?.id || !refund?.payment_id) return "ignored:no_refund";
      const status = event === "refund.processed" ? "processed" : event === "refund.failed" ? "failed" : (refund.status ?? "created");
      return "refund:" + await db.rpc<string>("razorpay_record_refund", {
        p_razorpay_payment_id: refund.payment_id, p_refund_id: refund.id,
        p_amount_paise: Number(refund.amount ?? 0), p_refund_status: status,
      });
    }

    default:
      return `ignored:${event || "unknown"}`;
  }
}

Deno.serve(handler);
