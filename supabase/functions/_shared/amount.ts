// Jayvi Foods — trusted order amount for Razorpay.
//
// place_order() receives subtotal/shipping/total from the browser. It
// re-validates the coupon server-side, but because an automatically
// confirmed online payment must never trust a browser number, the amount
// sent to Razorpay is re-derived here from database data only, using the
// SAME rules the storefront uses (app.js cartTotals()/effectiveShipping()
// and the coupon definition in public.coupons):
//
//   subtotal = Σ catalogue price × qty      (products.variants[].price / combos.price)
//   shipping = 0 if subtotal ≥ free_shipping_threshold
//              else check_pincode(pin).delivery_charge ?? shipping_flat
//   discount = the discount place_order() stored on the order, capped at
//              what the order's coupon can legitimately give
//   total    = max(0, subtotal − discount + shipping)
//
// The Jayvi order is only payable through Razorpay if this equals the
// stored orders.total. If not, nothing is charged and the mismatch is
// logged for Admin (customer sees the standard friendly error).
//
// ⚠ Schema note: the order's coupon code/discount columns aren't visible
// in the frontend code, so the likely names are tried in order below. If
// your orders table uses different names, add them to these two lists.

import { Db, inList } from "./db.ts";
import { log } from "./http.ts";

export const COUPON_CODE_COLUMNS = ["coupon_code", "applied_coupon_code", "coupon"];
export const DISCOUNT_COLUMNS = ["discount_amount", "discount", "coupon_discount"];
/** validate_coupon() may round to the rupee — allow at most ₹1 of rounding on the discount. */
const DISCOUNT_ROUNDING_TOLERANCE = 1;

const r2 = (n: number) => Math.round(n * 100) / 100;

export type AmountResult =
  | { ok: true; amountPaise: number; total: number; breakdown: Record<string, number | string | null> }
  | { ok: false; reason: string; breakdown?: Record<string, unknown> };

type Order = Record<string, any>;
type Item = { item_type?: string; product_id?: string | null; variant_id?: string | null; combo_id?: string | null; qty: number; unit_price?: number };

export async function computeTrustedAmount(db: Db, order: Order, items: Item[]): Promise<AmountResult> {
  if (!items.length) return { ok: false, reason: "no_items" };

  // ---- subtotal from catalogue prices
  const productIds = [...new Set(items.filter((i) => !i.combo_id && i.product_id).map((i) => String(i.product_id)))];
  const comboIds = [...new Set(items.filter((i) => i.combo_id).map((i) => String(i.combo_id)))];
  const [products, combos] = await Promise.all([
    productIds.length ? db.select<{ id: string; variants: any[] }>("products", `select=id,variants&id=${encodeURIComponent(inList(productIds))}`) : Promise.resolve([]),
    comboIds.length ? db.select<{ id: string; price: number }>("combos", `select=id,price&id=${encodeURIComponent(inList(comboIds))}`) : Promise.resolve([]),
  ]);

  let subtotal = 0;
  for (const it of items) {
    const qty = Number(it.qty);
    if (!Number.isInteger(qty) || qty <= 0 || qty > 1000) return { ok: false, reason: "bad_qty" };
    let price: number | null = null;
    if (it.combo_id) {
      const c = combos.find((x) => x.id === it.combo_id);
      price = c ? Number(c.price) : null;
    } else {
      const p = products.find((x) => x.id === it.product_id);
      const v = (p?.variants ?? []).find((x: any) => x && String(x.id) === String(it.variant_id));
      price = v ? Number(v.price) : null;
    }
    if (!(price !== null && price > 0)) return { ok: false, reason: "item_not_in_catalogue", breakdown: { item: it } };
    subtotal += r2(price * qty);
  }
  subtotal = r2(subtotal);

  // ---- shipping from store settings / pincode rules
  const [settings] = await db.select<{ free_shipping_threshold: number; shipping_flat: number }>(
    "store_settings", "select=free_shipping_threshold,shipping_flat&id=eq.default");
  const threshold = Number(settings?.free_shipping_threshold ?? 0);
  const flat = Number(settings?.shipping_flat ?? 0);
  let shipping = 0;
  if (!(subtotal > 0 && subtotal >= threshold)) {
    shipping = flat;
    try {
      const rows = await db.rpc<any[]>("check_pincode", { p_pincode: String(order.address_pincode ?? "") });
      const row = Array.isArray(rows) ? rows[0] : rows;
      if (row && row.delivery_charge !== null && row.delivery_charge !== undefined) shipping = Number(row.delivery_charge);
    } catch {
      // Same fail-open behaviour as the storefront (flat charge) — logged by Db.
    }
  }
  shipping = r2(shipping);

  // ---- discount (bounded by the coupon's own definition)
  const storedTotal = r2(Number(order.total));
  const code = COUPON_CODE_COLUMNS.map((c) => order[c]).find((v) => typeof v === "string" && v.trim());
  const storedDiscountRaw = DISCOUNT_COLUMNS.map((c) => order[c]).find((v) => v !== null && v !== undefined && v !== "");
  const claimedDiscount = r2(storedDiscountRaw !== undefined ? Number(storedDiscountRaw) : subtotal + shipping - storedTotal);

  let maxDiscount = 0;
  if (code) {
    const coupons = await db.select<any>("coupons",
      // Admin saves codes upper-cased (admin.js saveCoupon), so exact match on UPPER.
      `select=code,discount_type,discount_value,max_discount&code=eq.${encodeURIComponent(String(code).trim().toUpperCase())}`);
    const c = coupons[0];
    if (!c) return { ok: false, reason: "coupon_not_found", breakdown: { code } };
    maxDiscount = c.discount_type === "percentage"
      ? subtotal * Number(c.discount_value) / 100
      : Number(c.discount_value);
    if (c.max_discount !== null && c.max_discount !== undefined && c.max_discount !== "") {
      maxDiscount = Math.min(maxDiscount, Number(c.max_discount));
    }
    maxDiscount = r2(Math.min(subtotal, Math.max(0, maxDiscount)) + DISCOUNT_ROUNDING_TOLERANCE);
  }
  if (!(claimedDiscount >= 0) || claimedDiscount > maxDiscount + 0.001) {
    const breakdown = { subtotal, shipping, claimedDiscount, maxDiscount, storedTotal, code: code ?? null };
    log("warn", "amount", "discount_not_allowed", { order_number: order.order_number, ...breakdown });
    return { ok: false, reason: "discount_not_allowed", breakdown };
  }
  const discount = Math.min(claimedDiscount, subtotal);
  const total = r2(Math.max(0, subtotal - discount + shipping));

  const breakdown = { subtotal, shipping, discount, total, storedTotal, code: code ?? null };
  if (Math.abs(total - storedTotal) > 0.009) {
    log("warn", "amount", "total_mismatch", { order_number: order.order_number, ...breakdown });
    return { ok: false, reason: "total_mismatch", breakdown };
  }
  const amountPaise = Math.round(total * 100);
  if (amountPaise < 100) return { ok: false, reason: "below_minimum", breakdown };
  return { ok: true, amountPaise, total, breakdown };
}
