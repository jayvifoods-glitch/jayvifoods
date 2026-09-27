// Jayvi Foods — shared HTTP helpers for the Razorpay Edge Functions.
// Customer-facing responses carry only a stable `code` + a simple
// message. Details go to the server log (Supabase → Edge Functions → Logs).

const ALLOWED = (Deno.env.get("JAYVI_ALLOWED_ORIGINS") ?? "")
  .split(",").map((s) => s.trim()).filter(Boolean);

export function corsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") ?? "";
  // If JAYVI_ALLOWED_ORIGINS is set (recommended: https://jayvifoods.com),
  // only those origins get CORS access; otherwise any origin (the
  // functions authorise by order number + phone, not by origin).
  const allow = ALLOWED.length === 0 ? "*" : (ALLOWED.includes(origin) ? origin : ALLOWED[0]);
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

export function json(req: Request, status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(req), "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export const CUSTOMER_ERROR =
  "Payment could not be completed. Please try again or choose another payment method.";

/** A failure we report to the browser with a stable code + safe message. */
export class PublicError extends Error {
  constructor(public status: number, public code: string, public publicMessage = CUSTOMER_ERROR) {
    super(code);
  }
}

export function errorResponse(req: Request, err: unknown, fn: string): Response {
  if (err instanceof PublicError) {
    return json(req, err.status, { ok: false, code: err.code, message: err.publicMessage });
  }
  log("error", fn, "unhandled", { error: describe(err) });
  return json(req, 500, { ok: false, code: "server_error", message: CUSTOMER_ERROR });
}

export function describe(err: unknown): string {
  if (err instanceof Error) return `${err.name}: ${err.message}`;
  try { return JSON.stringify(err); } catch { return String(err); }
}

/** Structured log line. Never pass secrets or full card/UPI data here. */
export function log(level: "info" | "warn" | "error", fn: string, event: string, details: Record<string, unknown> = {}) {
  const line = JSON.stringify({ level, fn, event, ...details, at: new Date().toISOString() });
  if (level === "error") console.error(line); else if (level === "warn") console.warn(line); else console.log(line);
}

export async function readJson(req: Request): Promise<Record<string, unknown>> {
  try {
    const body = await req.json();
    return body && typeof body === "object" ? body as Record<string, unknown> : {};
  } catch {
    throw new PublicError(400, "bad_request");
  }
}

export function str(v: unknown, max = 200): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export const ORDER_NUMBER_RE = /^[A-Za-z0-9-]{4,40}$/;
export const digits10 = (v: unknown) => String(v ?? "").replace(/\D/g, "").slice(-10);
