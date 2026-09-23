/* =========================================================
   Jayvi Foods — config-lite.js (V33.0)

   help.html and legal.html are static pages that don't load the full
   app.js storefront bundle (they have no cart/catalogue/checkout to
   run) — but two pieces of copy on them ("Orders at or above ₹599
   qualify for free delivery", "The current store estimate is 4–8
   days") were previously typed by hand directly into the HTML. That's
   exactly the hardcoding spec 7/8/10 asked to remove: Admin changing
   the free-delivery threshold or delivery estimate in Store Settings
   had no effect on these two pages, because they never read
   store_settings at all.

   This is intentionally NOT a second copy of app.js's Supabase client
   — no supabase-js SDK needed for one read-only, single-row select.
   It's a plain fetch() against Supabase's auto-generated REST API,
   using the SAME anon key and SAME store_settings row
   (`id = 'default'`) that STORE_FIELD_MAP in app.js maps into
   CONFIG.store.freeShippingThreshold/deliveryMinDays/deliveryMaxDays —
   so a change Admin makes in Store Settings shows up identically here,
   on the storefront, and in Help & Support/Policies & Legal, from one
   single source of truth.

   Usage: include supabase-config.js BEFORE this file (for
   SUPABASE_URL/SUPABASE_ANON_KEY), then mark any element that should
   show the free-delivery threshold or delivery timeline with:
     <span data-cfg="free-delivery-threshold">₹599</span>
     <span data-cfg="delivery-timeline">4–8 days</span>
   The existing text is left in place as a fallback and is only
   replaced once the live value is confirmed — if the fetch fails
   (offline, RLS misconfigured, etc.) the page still shows a reasonable
   last-published value instead of going blank.
   V33: also applies the live WhatsApp number / Instagram URL (store_settings)
   and brand contact details + colours (site_content 'brand') to help.html
   and legal.html, via the same data-* hooks the storefront uses:
     <a data-wa-link href="https://wa.me/…">   <a data-ig-link …>
     <a data-brand-email href="mailto:…">     (fallback href/text kept)
   ========================================================= */
(function(){
  function money(n){ return '₹' + Math.round(Number(n)||0); }
  const base = () => SUPABASE_URL.replace(/\/$/,'') + '/rest/v1/';
  const headers = () => ({ apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + SUPABASE_ANON_KEY });
  async function getJson(path){
    const res = await fetch(base() + path, { headers: headers() });
    if(!res.ok) throw new Error(path.split('?')[0] + ' fetch failed: ' + res.status);
    return res.json();
  }
  async function loadDeliveryConfig(){
    try{
      const rows = await getJson('store_settings?id=eq.default&select=free_shipping_threshold,delivery_min_days,delivery_max_days,whatsapp,instagram');
      const row = Array.isArray(rows) ? rows[0] : null;
      if(!row) return;
      if(row.free_shipping_threshold != null){
        document.querySelectorAll('[data-cfg="free-delivery-threshold"]').forEach(el=>{ el.textContent = money(row.free_shipping_threshold); });
      }
      if(row.delivery_min_days != null && row.delivery_max_days != null){
        document.querySelectorAll('[data-cfg="delivery-timeline"]').forEach(el=>{ el.textContent = `${row.delivery_min_days}–${row.delivery_max_days} days`; });
      }
      const wa = String(row.whatsapp||'').replace(/\D/g,'');
      if(wa) document.querySelectorAll('[data-wa-link]').forEach(a=>{ a.href = 'https://wa.me/' + wa; });
      if(row.instagram) document.querySelectorAll('[data-ig-link]').forEach(a=>{ a.href = row.instagram; });
    }catch(err){
      // Fail quiet, fail safe: the HTML's existing text stays exactly
      // as it was, which is a real last-published value, not a
      // placeholder — never worse than the previous hardcoded behavior.
      console.warn('Could not load live delivery configuration — showing last-published copy:', err?.message||err);
    }
  }
  async function loadBrand(){
    try{
      const rows = await getJson('site_content?id=eq.brand&select=data');
      const b = Array.isArray(rows) && rows[0] ? (rows[0].data||{}) : null;
      if(!b) return;
      if(b.contactEmail) document.querySelectorAll('[data-brand-email]').forEach(a=>{ a.href='mailto:'+b.contactEmail; a.textContent=b.contactEmail; });
      const c = b.colors||{}, map = {maroon:'--jayvi-maroon',green:'--jayvi-green',gold:'--jayvi-gold',cream:'--jayvi-cream',sand:'--jayvi-sand',text:'--jayvi-text'};
      Object.entries(map).forEach(([k,v])=>{ if(/^#[0-9a-f]{6}$/i.test(c[k]||'')) document.documentElement.style.setProperty(v,c[k]); });
    }catch(err){
      console.warn('Could not load brand settings (site_content) — using built-in brand defaults:', err?.message||err);
    }
  }
  function run(){ loadDeliveryConfig(); loadBrand(); }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
