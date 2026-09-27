// Jayvi Foods — minimal PostgREST client for Edge Functions.
// Uses SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY, which Supabase injects
// into every Edge Function automatically. The service role key never
// leaves the server and is never returned to the browser.

import { log } from "./http.ts";

export class DbError extends Error {}

export class Db {
  private base: string;
  private key: string;

  constructor() {
    const url = Deno.env.get("SUPABASE_URL") ?? "";
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    if (!url || !key) throw new DbError("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not available to the function");
    this.base = url.replace(/\/$/, "") + "/rest/v1";
    this.key = key;
  }

  private headers(extra: Record<string, string> = {}): Record<string, string> {
    return {
      apikey: this.key,
      Authorization: `Bearer ${this.key}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...extra,
    };
  }

  private async handle(res: Response, what: string): Promise<unknown> {
    const text = await res.text();
    if (!res.ok) {
      // Full detail to the server log only.
      log("error", "db", "request_failed", { what, status: res.status, body: text.slice(0, 500) });
      throw new DbError(`${what} failed (${res.status})`);
    }
    return text ? JSON.parse(text) : null;
  }

  /** GET /rest/v1/<table>?<query> → rows */
  async select<T = Record<string, unknown>>(table: string, query: string): Promise<T[]> {
    const res = await fetch(`${this.base}/${table}?${query}`, {
      headers: this.headers(),
      signal: AbortSignal.timeout(10_000),
    });
    return (await this.handle(res, `select ${table}`)) as T[];
  }

  /** POST /rest/v1/rpc/<fn> */
  async rpc<T = unknown>(fn: string, args: Record<string, unknown>): Promise<T> {
    const res = await fetch(`${this.base}/rpc/${fn}`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(args),
      signal: AbortSignal.timeout(10_000),
    });
    return (await this.handle(res, `rpc ${fn}`)) as T;
  }
}

export const inList = (ids: string[]) =>
  `in.(${ids.map((i) => `"${String(i).replace(/["\\]/g, "")}"`).join(",")})`;
