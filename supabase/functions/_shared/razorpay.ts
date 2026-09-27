// Jayvi Foods — Razorpay server-side helpers.
//
// Secrets (Supabase → Edge Functions → Secrets), NEVER in the browser:
//   RAZORPAY_KEY_ID          public key id (rzp_test_… / rzp_live_…)
//   RAZORPAY_KEY_SECRET      API secret — used for API calls + checkout signature
//   RAZORPAY_WEBHOOK_SECRET  the secret you type when creating the webhook
//                            in the Razorpay Dashboard (a different value)
// Optional, leave unset in production:
//   RAZORPAY_API_BASE_URL    defaults to https://api.razorpay.com/v1
//                            (only overridden by the offline test harness)

import { log } from "./http.ts";

export interface RzpConfig { keyId: string; keySecret: string; webhookSecret: string; apiBase: string }

export function rzpConfig(): RzpConfig {
  return {
    keyId: (Deno.env.get("RAZORPAY_KEY_ID") ?? "").trim(),
    keySecret: (Deno.env.get("RAZORPAY_KEY_SECRET") ?? "").trim(),
    webhookSecret: (Deno.env.get("RAZORPAY_WEBHOOK_SECRET") ?? "").trim(),
    apiBase: (Deno.env.get("RAZORPAY_API_BASE_URL") ?? "https://api.razorpay.com/v1").replace(/\/$/, ""),
  };
}

export const KEY_ID_RE = /^rzp_(test|live)_[A-Za-z0-9]{6,}$/;
export const keyMode = (keyId: string) => keyId.startsWith("rzp_live_") ? "live" : keyId.startsWith("rzp_test_") ? "test" : "unknown";

export class RazorpayApiError extends Error {
  constructor(public status: number, public rzpCode: string, public rzpDescription: string) {
    super(`Razorpay API ${status} ${rzpCode}`);
  }
}

export interface RzpOrder { id: string; amount: number; currency: string; receipt?: string; status: string }
export interface RzpPayment {
  id: string; order_id: string; amount: number; currency: string;
  status: "created" | "authorized" | "captured" | "refunded" | "failed";
  error_code?: string | null; error_description?: string | null; error_reason?: string | null;
}

export class Razorpay {
  constructor(private cfg: RzpConfig) {}

  private async call<T>(method: string, path: string, body?: unknown): Promise<T> {
    const auth = btoa(`${this.cfg.keyId}:${this.cfg.keySecret}`);
    let res: Response;
    try {
      res = await fetch(`${this.cfg.apiBase}${path}`, {
        method,
        headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(15_000),
      });
    } catch (e) {
      log("error", "razorpay", "network_error", { method, path, error: String(e) });
      throw new RazorpayApiError(0, "NETWORK_ERROR", "Razorpay not reachable");
    }
    const text = await res.text();
    let data: any = null;
    try { data = text ? JSON.parse(text) : null; } catch { /* non-JSON */ }
    if (!res.ok) {
      const code = data?.error?.code ?? "UNKNOWN";
      const desc = data?.error?.description ?? text.slice(0, 200);
      log("error", "razorpay", "api_error", { method, path, status: res.status, code, desc });
      throw new RazorpayApiError(res.status, code, desc);
    }
    return data as T;
  }

  createOrder(amountPaise: number, receipt: string, notes: Record<string, string>) {
    return this.call<RzpOrder>("POST", "/orders", { amount: amountPaise, currency: "INR", receipt, notes });
  }
  fetchOrder(id: string) { return this.call<RzpOrder>("GET", `/orders/${encodeURIComponent(id)}`); }
  fetchOrderPayments(id: string) {
    return this.call<{ items: RzpPayment[] }>("GET", `/orders/${encodeURIComponent(id)}/payments`);
  }
  fetchPayment(id: string) { return this.call<RzpPayment>("GET", `/payments/${encodeURIComponent(id)}`); }
  capturePayment(id: string, amountPaise: number) {
    return this.call<RzpPayment>("POST", `/payments/${encodeURIComponent(id)}/capture`, { amount: amountPaise, currency: "INR" });
  }
  // V34.4 — refunds (used by razorpay-refund)
  fetchPaymentRefunds(id: string) {
    return this.call<{ items: RzpRefund[] }>("GET", `/payments/${encodeURIComponent(id)}/refunds`);
  }
  createRefund(paymentId: string, amountPaise: number, receipt: string, notes: Record<string, string>) {
    return this.call<RzpRefund>("POST", `/payments/${encodeURIComponent(paymentId)}/refund`,
      { amount: amountPaise, speed: "normal", receipt, notes });
  }
}

export interface RzpRefund { id: string; payment_id: string; amount: number; currency?: string; status: "pending" | "processed" | "failed"; receipt?: string | null }

// ---------------------------------------------------------------- crypto
const enc = new TextEncoder();

export async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(message)));
  return Array.from(sig, (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function sha256Hex(message: string): Promise<string> {
  const d = new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(message)));
  return Array.from(d, (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Constant-time comparison of two hex strings. */
export function safeEqual(a: string, b: string): boolean {
  const x = enc.encode(a.toLowerCase()), y = enc.encode(b.toLowerCase());
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

/** Razorpay Checkout: signature = HMAC_SHA256(order_id + "|" + payment_id, key_secret) */
export async function verifyCheckoutSignature(orderId: string, paymentId: string, signature: string, secret: string) {
  if (!orderId || !paymentId || !signature || !secret) return false;
  return safeEqual(await hmacSha256Hex(secret, `${orderId}|${paymentId}`), signature);
}

/** Webhooks: X-Razorpay-Signature = HMAC_SHA256(raw request body, webhook_secret) */
export async function verifyWebhookSignature(rawBody: string, signature: string, secret: string) {
  if (!signature || !secret) return false;
  return safeEqual(await hmacSha256Hex(secret, rawBody), signature);
}
