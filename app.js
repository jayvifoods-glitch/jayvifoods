/* =========================================================
   Jayvi Foods — v34.0 storefront logic (V33 brand/content layer: see
   the 'V33 — Site content' block below; V34 promotions + immersive hero:
   see 'V34 — Promotions' and heroShow())
   Data model and localStorage keys are unchanged from v27/28
   so existing Admin-entered data keeps working after this
   upgrade. All UI/interaction code has been rewritten as a
   single clean pass (no runtime "patches") for v31.
   ========================================================= */

const EMBEDDED_CONFIG = {
  "store": {
    "name": "Jayvi Foods",
    "tagline": "Purely Traditional. Simply Delicious.",
    "country": "IN",
    "freeShippingThreshold": 599,
    "shippingFlat": 49,
    "deliveryMinDays": 4,
    "deliveryMaxDays": 8,
    "vacationMode": false,
    "vacationMessage": "We are taking a short break. Orders will resume soon.",
    "googleMapsApiKey": "",
    "googleReviewsUrl": "https://www.google.com/search?q=Jayvi+Foods+reviews",
    "whatsapp": "918861981003",
    "instagram": "https://instagram.com/jayvifoods",
    "razorpayKeyId": "",
    "razorpayEnabled": false,
    "upiEnabled": true,
    "codEnabled": false,
    "otpEnabled": false,
    "upiId": "",
    "upiName": "Jayvi Foods",
    "upiQrImage": "",
    "upiMc": "",
    "paymentNote": "Pay by UPI QR. Order moves to processing after payment verification.",
    "refundBusinessDays": 4,
    "announcementSpeed": "normal",
    "homepageReviewCount": 6,
    "deliveryMode": "india",
    "paymentMode": "upi_manual",
    "otpProvider": ""
  },
  "homepage": {
    "heroAutoplay": true,
    "heroSeconds": 5
  },
  "categories": [
    {
      "id": "chutney",
      "name": "Chutney Powders",
      "enabled": true,
      "order": 1
    },
    {
      "id": "pudi",
      "name": "Pudi",
      "enabled": true,
      "order": 2
    },
    {
      "id": "snacks",
      "name": "Snacks",
      "enabled": true,
      "order": 3
    },
    {
      "id": "combos",
      "name": "Combos",
      "enabled": true,
      "order": 4
    }
  ],
  "products": [
    {
      "id": "peanut",
      "sku": "JF-TAR-CLS-PNT",
      "name": "Peanut Chutney",
      "short": "Rich, nutty and comforting.",
      "category": "chutney",
      "active": true,
      "best": true,
      "image": "images/products/peanut/hero.webp",
      "imageClass": "peanut",
      "variants": [
        {
          "id": "peanut-200",
          "label": "200g",
          "weight": "200g",
          "price": 155,
          "mrp": 199,
          "sku": "JF-TAR-CLS-PNT-200",
          "active": true
        },
        {
          "id": "peanut-400",
          "label": "400g",
          "weight": "400g",
          "price": 249,
          "mrp": 299,
          "sku": "JF-TAR-CLS-PNT-400",
          "active": true
        }
      ],
      "mealTags": [
        "idli",
        "dosa",
        "chapati",
        "rice"
      ],
      "rating": 0,
      "reviewCount": 0
    },
    {
      "id": "flaxseed",
      "sku": "JF-TAR-CLS-FLX",
      "name": "Flaxseed Chutney",
      "short": "A distinctive traditional flavour.",
      "category": "chutney",
      "active": true,
      "best": true,
      "image": "images/products/flaxseed/hero.webp",
      "imageClass": "flaxseed",
      "variants": [
        {
          "id": "flaxseed-200",
          "label": "200g",
          "weight": "200g",
          "price": 155,
          "mrp": 199,
          "sku": "JF-TAR-CLS-FLX-200",
          "active": true
        },
        {
          "id": "flaxseed-400",
          "label": "400g",
          "weight": "400g",
          "price": 249,
          "mrp": 299,
          "sku": "JF-TAR-CLS-FLX-400",
          "active": true
        }
      ],
      "mealTags": [
        "idli",
        "dosa",
        "chapati",
        "rice"
      ],
      "rating": 0,
      "reviewCount": 0
    },
    {
      "id": "pudi",
      "sku": "JF-TAR-CLS-IDP",
      "name": "Idli Dosa Pudi",
      "short": "Made for idli, dosa and everyday meals.",
      "category": "pudi",
      "active": true,
      "best": true,
      "image": "images/products/pudi/hero.webp",
      "imageClass": "pudi",
      "variants": [
        {
          "id": "pudi-200",
          "label": "200g",
          "weight": "200g",
          "price": 155,
          "mrp": 199,
          "sku": "JF-TAR-CLS-IDP-200",
          "active": true
        },
        {
          "id": "pudi-400",
          "label": "400g",
          "weight": "400g",
          "price": 249,
          "mrp": 299,
          "sku": "JF-TAR-CLS-IDP-400",
          "active": true
        }
      ],
      "mealTags": [
        "idli",
        "dosa",
        "chapati",
        "rice"
      ],
      "rating": 0,
      "reviewCount": 0
    },
    {
      "id": "puffora",
      "sku": "JF-PUF",
      "name": "Puffora",
      "short": "Crunchy, puffy, made for anytime snacking.",
      "category": "snacks",
      "active": true,
      "best": true,
      "image": "images/products/puffora/hero.webp",
      "imageClass": "puffora",
      "variants": [
        {
          "id": "puffora-pack",
          "label": "Pack",
          "weight": "Pack",
          "price": 99,
          "mrp": 129,
          "sku": "JF-PUF-200",
          "active": true
        }
      ],
      "mealTags": [],
      "rating": 0,
      "reviewCount": 0
    }
  ],
  "combos": [
    {
      "id": "duo",
      "name": "Traditional Duo",
      "short": "Peanut + Flaxseed. Two everyday favourites.",
      "active": true,
      "price": 289,
      "mrp": 310,
      "image": "images/combos/traditional-duo/hero.webp",
      "items": [
        {
          "productId": "peanut",
          "variantId": "peanut-200",
          "qty": 1
        },
        {
          "productId": "flaxseed",
          "variantId": "flaxseed-200",
          "qty": 1
        }
      ]
    }
  ],
  "announcements": [
    {
      "id": "h1",
      "label": "BESTSELLER",
      "title": "Peanut Chutney",
      "em": "for every meal.",
      "text": "Rich, nutty and comforting — the everyday favourite.",
      "productId": "peanut",
      "actionType": "product",
      "actionTarget": "peanut",
      "active": true,
      "order": 1
    },
    {
      "id": "h2",
      "label": "NEW",
      "title": "Puffora",
      "em": "crunch time.",
      "text": "A crunchy Jayvi snack for anytime munching.",
      "productId": "puffora",
      "actionType": "product",
      "actionTarget": "puffora",
      "active": true,
      "order": 2
    },
    {
      "id": "h3",
      "label": "COMBO",
      "title": "Traditional Duo",
      "em": "one easy choice.",
      "text": "Peanut + Flaxseed together at ₹289.",
      "comboId": "duo",
      "actionType": "combo",
      "actionTarget": "duo",
      "active": true,
      "order": 3
    }
  ],
  "mealTags": [
    {
      "id": "idli",
      "name": "Idli",
      "enabled": true,
      "order": 1
    },
    {
      "id": "dosa",
      "name": "Dosa",
      "enabled": true,
      "order": 2
    },
    {
      "id": "chapati",
      "name": "Chapati",
      "enabled": true,
      "order": 3
    },
    {
      "id": "rice",
      "name": "Rice + Ghee",
      "enabled": true,
      "order": 4
    },
    {
      "id": "roti",
      "name": "Roti",
      "enabled": true,
      "order": 5
    },
    {
      "id": "paratha",
      "name": "Paratha",
      "enabled": true,
      "order": 6
    },
    {
      "id": "poori",
      "name": "Poori",
      "enabled": true,
      "order": 7
    },
    {
      "id": "upma",
      "name": "Upma",
      "enabled": true,
      "order": 8
    },
    {
      "id": "vada",
      "name": "Vada",
      "enabled": true,
      "order": 9
    },
    {
      "id": "curd-rice",
      "name": "Curd Rice",
      "enabled": true,
      "order": 10
    }
  ],
  "reviews": [],
  "mealLabels": {
    "idli": "Idli",
    "dosa": "Dosa",
    "chapati": "Chapati",
    "rice": "Rice + Ghee",
    "roti": "Roti",
    "paratha": "Paratha",
    "poori": "Poori",
    "upma": "Upma",
    "vada": "Vada",
    "curd-rice": "Curd Rice"
  }
};

// V32.6: the generic-gallery fallback (images/gallery/*) that used to
// backfill missing per-product media has been removed on purpose — see
// PLACEHOLDER_MEDIA below and cardMediaMarkup(). A product with no
// media of its own now shows an explicit placeholder, never another
// product's (or a generic marketing) image. Product media is now
// sourced from Supabase's product_media table (see loadCatalogFromSupabase()).
const PLACEHOLDER_MEDIA=[{type:'image',path:'images/brand/placeholder.svg'}];

// V32.7 — performance fix (spec items 6 & 9): product photos are shipped
// as "images/products/<slug>/<name>.webp" masters. V32.8 extended the
// same dedicated-folder convention to combos too
// ("images/combos/<slug>/<name>.webp" — see CHANGELOG_V32.8.md item 7),
// so both are covered here. scripts/generate-product-image-variants.py
// generates a "-400w"/"-800w" sibling next to every one of those masters
// (see that script for details) — the master itself doubles as the
// ~1600px "desktop" tier. This helper turns a plain path into a srcset
// ONLY for paths that convention guarantees have those siblings;
// anything else (external URLs, SVGs, images/gallery/, brand assets, a
// future product/combo photo that hasn't been through the script yet)
// is left completely alone and just renders as a normal <img src>. No
// database/schema change and no per-product/per-combo code was needed
// for this — the same generic component handles every product and
// every combo, present or future.
const RESPONSIVE_PRODUCT_IMG = /^images\/(products|combos)\/.+\.webp$/i;
// V32.12 (Workstream 3, item 3.8): a Git-repo image gets its responsive
// srcset from the pre-generated -400w/-800w files (see
// scripts/generate-product-image-variants.py). A Supabase Storage
// image never has those pre-generated siblings — instead we use
// Supabase's own on-the-fly image-transformation endpoint
// (storage/v1/render/image/public/... ?width=&quality=), which resizes
// server-side per request, so a 600px product card never has to
// download an 8K source file. Detected purely by URL shape — this
// storefront still doesn't care whether a product's media lives in Git
// or Storage, exactly as documented in PRODUCT_MEDIA_MIGRATION.md.
const SUPABASE_STORAGE_OBJECT_RE = /\/storage\/v1\/object\/public\/(.+)$/;
function supabaseImageVariant(path, width){
  const m = path.match(SUPABASE_STORAGE_OBJECT_RE);
  if(!m) return null;
  const base = path.slice(0, path.indexOf('/storage/v1/object/public/'));
  return `${base}/storage/v1/render/image/public/${m[1]}?width=${width}&quality=75&resize=contain`;
}
function responsiveImgAttrs(path,sizes){
  if(!path) return {src:path,srcset:'',sizes:''};
  if(RESPONSIVE_PRODUCT_IMG.test(path)){
    const stem=path.slice(0,-5); // strip ".webp"
    return {
      src:`${stem}-800w.webp`,
      srcset:`${stem}-400w.webp 400w, ${stem}-800w.webp 800w, ${path} 1600w`,
      sizes:sizes||'(max-width:600px) 45vw, 280px'
    };
  }
  // Supabase Storage image (public bucket URL) — only images, never
  // videos, and the render/image endpoint is best-effort: if the
  // project's Supabase plan doesn't have Image Transformation enabled,
  // the endpoint 404s and the <img> tag's plain `src` (below) is what
  // actually renders since it's a normal object URL, not the transform
  // one — so this can never make an image disappear, only skip the
  // resize optimisation.
  if(/\.(webp|jpe?g|png|avif)$/i.test(path)){
    const v400=supabaseImageVariant(path,400), v800=supabaseImageVariant(path,800), v1600=supabaseImageVariant(path,1600);
    if(v400) return {src:v800, srcset:`${v400} 400w, ${v800} 800w, ${v1600} 1600w`, sizes:sizes||'(max-width:600px) 45vw, 280px'};
  }
  return {src:path,srcset:'',sizes:''};
}

/* ---------- State ---------- */
let CONFIG, products=[], categories=[], mealTagList=[], pairingTagList=[];
let cat='all', heroIndex=0, heroTimer=null, meal='idli', selectedVariants={}, mealFilter=null, discoveryFilter=null, availabilityFilter='all', priceBucket='all', sortValue='featured';
let cart=loadCart(), wishlist=loadWishlist(), mapsReady=false;

/* ---------- Helpers ---------- */
const $=id=>document.getElementById(id);
const money=n=>'₹'+Number(n||0).toLocaleString('en-IN');
const isMobile=()=>window.matchMedia('(max-width:959px)').matches;
function escapeHtml(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}

// PatilKaki-review addition: search synonyms, kept in this ONE map so
// it stays maintainable (per the brief, no separate search system).
// Each key maps to the other terms customers might type instead —
// both directions are handled by expandSearchQuery() below, so it's
// enough to list a pair once.
const SEARCH_SYNONYMS = {
  'peanut':['shenga','groundnut'],
  'shenga':['peanut','groundnut'],
  'flaxseed':['agasi','flax seed','flax'],
  'agasi':['flaxseed','flax seed','flax'],
  'chutney pudi':['chutney powder'],
  'chutney powder':['chutney pudi'],
  'pudi':['powder'],
  'powder':['pudi'],
  'idli dosa pudi':['idli dosa chutney powder','idli/dosa pudi'],
  'idli/dosa pudi':['idli dosa pudi'],
  'rajam':['rajamudi','rajmudi rice'],
  'rajamudi':['rajam','rajmudi rice'],
  'podi':['pudi'],
  'chakkuli':['chakli'],
  'chakli':['chakkuli'],
  'kodbale':['kodubale'],
  'kodubale':['kodbale']
};
function expandSearchQuery(q){
  q=(q||'').trim().toLowerCase();
  if(!q) return [q];
  const terms=new Set([q]);
  Object.entries(SEARCH_SYNONYMS).forEach(([k,vals])=>{
    if(q.includes(k)) vals.forEach(v=>terms.add(v));
    if(vals.some(v=>q.includes(v))) terms.add(k);
  });
  return [...terms];
}
function matchesSearch(p,q){
  if(!q) return true;
  if(!p||!p.name) return false;
  const mealTagNames=(p.mealTags||[]).map(m=>mealTagList.find(t=>t.id===m)?.name||'').join(' ');
  const haystack=`${p.name} ${catName(p.category)} ${p.short||''} ${p.description||''} ${mealTagNames}`.toLowerCase();
  return expandSearchQuery(q).some(term=>haystack.includes(term));
}

/* ---------- Config / data ---------- */
function loadConfig(){
  try{
    const raw=localStorage.getItem('jayviStoreV14');
    const d=structuredClone(EMBEDDED_CONFIG);
    const u=raw?JSON.parse(raw):{};
    d.store={...d.store,...(u.store||{})};
    const baseById=Object.fromEntries((d.products||[]).map(p=>[p.id,p]));
    d.products=(u.products||d.products).map(p=>{
      const base=baseById[p.id]||{};
      const badImage=!p.image||String(p.image).includes('jayvi-products.webp')||String(p.image).includes('placeholder.svg')||String(p.image).includes('v22-demo');
      return {...base,...p,image:badImage?base.image:p.image,media:p.media?.length?p.media:(base.media||[])};
    });
    d.categories=u.categories||d.categories;
    d.combos=u.combos||d.combos;
    d.announcements=u.announcements||d.announcements;
    d.mealTags=u.mealTags||d.mealTags;
    d.mealLabels=Object.fromEntries((d.mealTags||[]).map(t=>[t.id,t.name]));
    d.reviews=u.reviews||d.reviews;
    return d;
  }catch{ return structuredClone(EMBEDDED_CONFIG); }
}
// V32.6: products, product media, and combos now come from Supabase —
// the single source of truth shared by every browser/device (mobile
// and desktop included), replacing the per-browser localStorage
// catalogue. This is intentionally the smallest safe change: store
// settings, announcements, and reviews are untouched and keep working
// exactly as before. If the fetch fails for any reason (offline, RLS
// misconfigured, etc.) we fall back to whatever CONFIG already has
// (EMBEDDED_CONFIG / localStorage) so the storefront never goes blank
// — "minimum risk" per the agreed spec.
async function loadCatalogFromSupabase(){
  try{
    const [{data:dbProducts,error:pErr},{data:dbCombos,error:cErr},{data:dbMedia,error:mErr}]=await Promise.all([
      sb.from('products').select('*').eq('active',true),
      sb.from('combos').select('*').eq('active',true),
      sb.from('product_media').select('*').eq('is_active',true).order('display_order',{ascending:true})
    ]);
    if(pErr||cErr||mErr) throw (pErr||cErr||mErr);
    if(!dbProducts) throw new Error('No product data returned');

    // V32.12.1 fix: is_primary now actually carried through (previously
    // dropped here, so the storefront could never tell which media row
    // Admin had marked primary and always silently fell back to lowest
    // display_order). Also reorders the media array itself so the
    // primary item is always index 0 — every consumer of p.media/
    // c.media (product card carousel, combo card carousel, product
    // detail gallery's initial image) reads media[0] as "the" image, so
    // fixing the order once here, in one place, is what makes primary
    // actually apply everywhere without touching each render function.
    // Fallback (no row marked primary — e.g. legacy data from before
    // the is_primary column existed) is exactly the previous behaviour:
    // lowest display_order, unchanged, since dbMedia is already ordered
    // that way by the query above.
    const mediaFor=(ownerKey,ownerId)=>{
      const list=dbMedia.filter(m=>m[ownerKey]===ownerId)
        .map(m=>({type:m.media_type,path:m.media_url,poster:m.poster_url||'',isPrimary:!!m.is_primary}));
      const primaryIdx=list.findIndex(m=>m.isPrimary);
      if(primaryIdx>0) return [list[primaryIdx], ...list.slice(0,primaryIdx), ...list.slice(primaryIdx+1)];
      return list;
    };

    CONFIG.products=[...dbProducts].sort((a,b)=>(a.display_order||0)-(b.display_order||0)).map(p=>{
      const media=mediaFor('product_id',p.id);
      return {
        id:p.id, sku:p.sku, name:p.name, short:p.short_description,
        description:p.description, category:p.category, categories:p.categories,
        mealTags:p.meal_tags, active:p.active, best:p.best,
        image:media[0]?.path||'', media,
        variants:p.variants||[], rating:p.rating, reviewCount:p.review_count,
        // Additive product-detail fields (supabase_migration_product_details.sql).
        // All optional — openProduct() only renders a section when the
        // corresponding value is actually present.
        highlights:p.highlights||[], ingredients:p.ingredients||'',
        storageInstructions:p.storage_instructions||'', shelfLife:p.shelf_life||'',
        allergens:p.allergens||'', nutrition:p.nutrition||[], faq:p.faq||[],
        isNew:!!p.is_new, newUntil:p.new_until||null,
        // Phase 2 cont'd: created_at already comes back from the
        // existing `select('*')` below — it just wasn't mapped before.
        // No migration needed; this is what makes a real "Newest" sort
        // possible without inventing data.
        createdAt:p.created_at||null,
        // V33 merchandising/relationships/SEO (supabase_migration_v33_brand_upgrade.sql) — all optional.
        isPopular:!!p.is_popular, isHealthy:!!p.is_healthy, relatedProducts:p.related_products||[],
        howToEnjoyText:p.how_to_enjoy||'', seoTitle:p.seo_title||'', seoDescription:p.seo_description||''
      };
    });

    CONFIG.combos=(dbCombos||[]).map(c=>{
      const media=mediaFor('combo_id',c.id);
      return {
        id:c.id, name:c.name, short:c.short_description, active:c.active,
        price:c.price, mrp:c.mrp, items:c.items||[],
        image:media[0]?.path||'', media
      };
    });
    return true;
  }catch(err){
    console.warn('Falling back to embedded/local catalogue — Supabase product fetch failed:', err?.message||err);
    return false;
  }
}
// V32.10: Categories and Meal tags now come from Supabase too, closing
// the last two pieces of the catalogue that were still per-browser
// localStorage. Deliberately a SEPARATE try/catch from
// loadCatalogFromSupabase() above — if this fetch fails for any reason,
// it falls back to whatever CONFIG already has (same "never go blank"
// principle) WITHOUT affecting the products/combos fetch above at all,
// which succeeds or fails entirely independently.
async function loadCategoriesAndMealTagsFromSupabase(){
  try{
    const [{data:dbCategories,error:catErr},{data:dbMealTags,error:mtErr}]=await Promise.all([
      sb.from('categories').select('*').eq('enabled',true),
      sb.from('meal_tags').select('*').eq('enabled',true)
    ]);
    if(catErr||mtErr) throw (catErr||mtErr);
    if(!dbCategories || !dbMealTags) throw new Error('No category/meal-tag data returned');

    CONFIG.categories=[...dbCategories].sort((a,b)=>(a.display_order||0)-(b.display_order||0)).map(c=>({
      id:c.id, name:c.name, enabled:c.enabled, order:c.display_order||0,
      description:c.description||'', imageUrl:c.image_url||'',
      imageType:c.image_type||'packshot' // V34.1 (optional column) — category photos default to "show whole"
    }));
    CONFIG.mealTags=[...dbMealTags].sort((a,b)=>(a.display_order||0)-(b.display_order||0)).map(t=>({
      id:t.id, name:t.name, enabled:t.enabled, order:t.display_order||0,
      // V34.2 product tags: a "pairing" tag (Idli, Dosa, Rice + Ghee…) also
      // appears in "Made for every meal" and on the product page; a
      // use-case tag (Breakfast, Travel, Gifting…) only groups products,
      // e.g. for occasions. Column absent (migration not run) = pairing.
      pairing:t.show_as_pairing!==false
    }));
    CONFIG.mealLabels=Object.fromEntries(CONFIG.mealTags.map(t=>[t.id,t.name]));
    return true;
  }catch(err){
    console.warn('Falling back to embedded/local categories/meal tags — Supabase fetch failed:', err?.message||err);
    return false;
  }
}
// V32.11: Store settings, homepage announcements, and curated ("Google")
// reviews now come from Supabase too — the last three pieces of
// business data that were still EMBEDDED_CONFIG/localStorage. Same
// independent try/catch, "never render blank" fallback principle as
// loadCategoriesAndMealTagsFromSupabase() above.
const STORE_FIELD_MAP = {
  name:'name', tagline:'tagline', country:'country',
  freeShippingThreshold:'free_shipping_threshold', shippingFlat:'shipping_flat',
  deliveryMinDays:'delivery_min_days', deliveryMaxDays:'delivery_max_days',
  vacationMode:'vacation_mode', vacationMessage:'vacation_message',
  googleMapsApiKey:'google_maps_api_key', googleReviewsUrl:'google_reviews_url',
  whatsapp:'whatsapp', instagram:'instagram',
  razorpayKeyId:'razorpay_key_id', razorpayEnabled:'razorpay_enabled',
  upiEnabled:'upi_enabled', codEnabled:'cod_enabled', otpEnabled:'otp_enabled',
  upiId:'upi_id', upiName:'upi_name', upiQrImage:'upi_qr_image', upiMc:'upi_mc',
  paymentNote:'payment_note', refundBusinessDays:'refund_business_days',
  announcementSpeed:'announcement_speed', homepageReviewCount:'homepage_review_count',
  deliveryMode:'delivery_mode', paymentMode:'payment_mode', otpProvider:'otp_provider'
};
async function loadSettingsAnnouncementsReviewsFromSupabase(){
  try{
    const [{data:row,error:sErr},{data:dbAnn,error:aErr},{data:dbRev,error:rErr}]=await Promise.all([
      sb.from('store_settings').select('*').eq('id','default').single(),
      sb.from('announcements').select('*').eq('active',true),
      sb.from('curated_reviews').select('*').eq('active',true)
    ]);
    if(sErr||aErr||rErr) throw (sErr||aErr||rErr);
    if(!row) throw new Error('No store settings row returned');

    const store={};
    Object.entries(STORE_FIELD_MAP).forEach(([jsKey,dbKey])=>{ store[jsKey]=row[dbKey]; });
    CONFIG.store=store;
    CONFIG.homepage={heroAutoplay:row.hero_autoplay, heroSeconds:row.hero_seconds};

    CONFIG.announcements=(dbAnn||[]).sort((a,b)=>(a.display_order||0)-(b.display_order||0)).map(a=>({
      id:a.id, label:a.label, title:a.title, em:a.em, text:a.text,
      image:a.image, mediaType:a.media_type||'image', posterUrl:a.poster_url||'',
      // V34 (supabase_migration_v34_hero_media.sql — optional columns; absent = old behaviour)
      mobileImage:a.mobile_image||'', imageType:a.image_type||'lifestyle', imageFocus:a.image_focus||'',
      // V34.2 (optional columns — absent = split layout, the safe default)
      layout:a.layout||'split', mobileLayout:a.mobile_layout||'auto', overlayStrength:a.overlay_strength||'auto', badge:a.badge_text||'', mobileImageFocus:a.mobile_image_focus||'', textPlacement:a.text_placement||'',
      showPrice:a.show_price,
      ctaLabel:a.cta_label||'', secondaryLabel:a.secondary_cta_label||'', secondaryTarget:a.secondary_cta_target||'',
      // V32.3 (spec 3): the explicit product/combo ASSOCIATION, separate
      // from actionType/actionTarget (only the click destination for a
      // General announcement's optional CTA — see heroShow() below).
      announcementType:a.announcement_type||(a.product_id||a.combo_id?'product':'general'),
      targetType:a.target_type||(a.combo_id?'combo':a.product_id?'product':''),
      actionType:a.action_type, actionTarget:a.action_target,
      productId:a.product_id||'', comboId:a.combo_id||'', active:a.active, order:a.display_order||0
    }));
    CONFIG.reviews=(dbRev||[]).sort((a,b)=>(a.display_order||0)-(b.display_order||0)).map(r=>({
      source:r.source, name:r.name, rating:r.rating, text:r.text,
      productId:r.product_id||'', active:r.active, verifiedPurchase:r.verified_purchase
    }));
    return true;
  }catch(err){
    console.warn('Falling back to embedded/local settings/announcements/reviews — Supabase fetch failed:', err?.message||err);
    return false;
  }
}
function sync(){
  // Item T: announcement speed is Admin-configurable (was a hardcoded
  // 22s) — 'normal' is intentionally a bit faster than the old fixed
  // value, per the approved spec ("slightly faster than current").
  const speedMap = {slow:26, normal:18, fast:11};
  const speed = speedMap[CONFIG.store.announcementSpeed] || speedMap.normal;
  document.documentElement.style.setProperty('--marquee-duration', speed+'s');
  // Item Q, defensive half: even if a fundamentally incomplete product
  // (no id, no name, no image, or zero sellable variants) somehow ends
  // up in the data, it's filtered out here — never reaches
  // productCard()/openProduct(), which would otherwise crash on
  // getVariant() returning undefined. Every other valid product keeps
  // rendering normally; nothing here can take down the whole grid.
  // Item Q, defensive half: even if a fundamentally incomplete product
  // (no id, no name, no image, or zero PRICED variants) somehow ends
  // up in the data, it's filtered out here — never reaches
  // productCard()/openProduct(), which would otherwise crash on
  // getVariant() returning undefined. Every other valid product keeps
  // rendering normally; nothing here can take down the whole grid.
  //
  // Phase 2: this used to also require an ACTIVE variant, which meant
  // a fully sold-out product (every variant's "Available for sale"
  // unchecked in Admin) disappeared from the storefront entirely
  // instead of showing a "Sold Out" badge. Relaxed to just "has at
  // least one priced variant" — active/inactive is now decided at
  // render time by isProductSoldOut() below, so a sold-out product
  // stays visible (browsable, badge shown, purchase disabled) exactly
  // like the brief asks, with zero change for any product that still
  // has stock (that path is untouched).
  const isDisplayable = p => p && p.id && p.name && p.image &&
    (p.variants||[]).some(v=>v && Number(v.price)>0 && Number(v.mrp)>0);
  products=(CONFIG.products||[]).filter(p=>p.active && isDisplayable(p))
    .map(p=>({...p,media:p.media?.length?p.media:(p.image?[{type:'image',path:p.image}]:PLACEHOLDER_MEDIA)}));
  categories=(CONFIG.categories||[]).filter(c=>c.enabled).sort((a,b)=>a.order-b.order);
  mealTagList=(CONFIG.mealTags||[]).filter(t=>t.enabled).sort((a,b)=>a.order-b.order);
  pairingTagList=mealTagList.filter(t=>t.pairing!==false);
  if(pairingTagList.length && !pairingTagList.some(t=>t.id===meal)) meal=pairingTagList[0].id;
  if($('topShipping')) $('topShipping').textContent=`FREE SHIPPING ABOVE ${money(CONFIG.store.freeShippingThreshold)}`;
  // V32.3 fix (spec 20.C): the duplicate (aria-hidden, for the seamless
  // marquee loop) and the "Free delivery" trust-badge both had the same
  // ₹599 hardcoded independently of `topShipping` above, so changing
  // the threshold in Store Settings only ever updated one of the three
  // on-page copies. All three now come from the same CONFIG.store value.
  if($('topShippingDup')) $('topShippingDup').textContent=`FREE SHIPPING ABOVE ${money(CONFIG.store.freeShippingThreshold)}`;
  if($('trustFreeDelivery')) $('trustFreeDelivery').textContent=`Above ${money(CONFIG.store.freeShippingThreshold)}`;
}
function getProduct(id){return products.find(p=>p.id===id)}
function getCombo(id){return (CONFIG.combos||[]).find(c=>c.id===id&&c.active)}
function getVariant(p,vid){
  if(!p) return null;
  return (p.variants||[]).find(v=>v && v.id===vid && v.active && Number(v.price)>0)
    || (p.variants||[]).find(v=>v && v.active && Number(v.price)>0)
    // Phase 2 addition: if NO variant is active (fully sold out), still
    // return a priced variant so price/image/gallery keep rendering
    // instead of the card/detail view breaking. isProductSoldOut()
    // below is what actually decides the Sold Out badge/disabled
    // actions — this fallback only ever engages when both clauses
    // above already failed, so it changes nothing for any in-stock
    // product.
    || (p.variants||[]).find(v=>v && Number(v.price)>0)
    || null;
}
function isProductSoldOut(p){
  return !(p?.variants||[]).some(v=>v && v.active && Number(v.price)>0);
}
function catName(id){return categories.find(c=>c.id===id)?.name||id}
// PatilKaki-review additions — admin-controlled "New" badge (never
// auto-derived from created_at, so importing older catalogue rows
// doesn't silently mark everything new) and a per-product "Offer"
// badge computed from the SAME activeOffers array already fetched for
// the floating offer button (see fetchActiveOffers()) — no second
// offers query.
function isProductNew(p){
  if(!p?.isNew) return false;
  if(!p.newUntil) return true;
  const today=new Date(); today.setHours(0,0,0,0);
  return new Date(p.newUntil) >= today;
}
// Mirrors validate_coupon()'s restriction check EXACTLY (see
// supabase_migration_coupon_checkout.sql): applicable_products/
// applicable_categories are containment ("<@" — every id on the left
// must be in the list on the right) checks, evaluated independently,
// BOTH must pass when both are configured. For one product that
// means: if applicable_products is set, p.id must be in it; if
// applicable_categories is set, EVERY category p belongs to (not just
// one) must be in it — a product in a category outside the coupon's
// allowed set fails this, same as validate_coupon() would reject a
// cart containing it. Using .every() here (not .some()) is what keeps
// this in lockstep with the real eligibility check — a looser .some()
// would badge products the coupon actually can't discount.
function productHasActiveOffer(p){
  if(!p || !(activeOffers||[]).length) return false;
  const pCats=[p.category,...(p.categories||[])].filter(Boolean);
  return activeOffers.some(o=>{
    const prodRestricted=o.applicable_products?.length>0;
    const catRestricted=o.applicable_categories?.length>0;
    const prodOk = !prodRestricted || o.applicable_products.includes(p.id);
    const catOk = !catRestricted || (pCats.length>0 && pCats.every(c=>o.applicable_categories.includes(c)));
    return prodOk && catOk;
  });
}
// Inline (non-absolutely-positioned) variant of the same badge set,
// for use in the product detail modal where there's no .visualWrap to
// anchor an absolute badge stack against.
// Badge priority (Phase 2): Sold Out > New > Offer — only ONE of these
// three shows at a time, so a product never carries all three at once;
// Bestseller is independent of that priority and can still appear
// alongside whichever one applies.
function detailBadges(p){
  const t=[];
  if(p.best) t.push('<span class="tag tagBest">Bestseller</span>');
  if(isProductSoldOut(p)) t.push('<span class="tag tagSoldOut">Sold out</span>');
  else if(isProductNew(p)) t.push('<span class="tag tagNew">New</span>');
  else if(productHasActiveOffer(p)) t.push('<span class="tag tagOffer">Offer</span>');
  return t.length?`<div class="detailTags">${t.join('')}</div>`:'';
}
function productBadges(p){
  const b=[];
  if(p.best) b.push('<span class="badge" title="Bestseller" aria-label="Bestseller"><i class="fa-solid fa-star" aria-hidden="true"></i></span>');
  if(isProductSoldOut(p)) b.push('<span class="badge badgeSoldOut" title="Sold out" aria-label="Sold out"><i class="fa-solid fa-ban" aria-hidden="true"></i></span>');
  else if(isProductNew(p)) b.push('<span class="badge badgeNew" title="New" aria-label="New"><i class="fa-solid fa-bolt" aria-hidden="true"></i></span>');
  else if(productHasActiveOffer(p)) b.push('<span class="badge badgeOffer" title="Offer available" aria-label="Offer available"><i class="fa-solid fa-percent" aria-hidden="true"></i></span>');
  return b.length?`<div class="badgeStack">${b.join('')}</div>`:'';
}
function variantKey(id){return selectedVariants[id]||getVariant(getProduct(id))?.id}
function setVariant(id,vid){selectedVariants[id]=vid;refreshProductViews()}
function cartQtyFor(pid,vid){const x=cart.find(i=>i.type==='product'&&i.productId===pid&&i.variantId===vid);return x?.qty||0}

/* ---------- Wishlist ---------- */
function loadWishlist(){try{return JSON.parse(localStorage.getItem('jayviWishlistV9')||'[]')}catch{return []}}
function saveWishlist(){localStorage.setItem('jayviWishlistV9',JSON.stringify(wishlist))}
function toggleWishlist(pid){
  wishlist=wishlist.includes(pid)?wishlist.filter(x=>x!==pid):[...wishlist,pid];
  saveWishlist();refreshProductViews();updateWishlistBadge();
  showToast(wishlist.includes(pid)?'Added to favourites':'Removed from favourites');
}
// Phase 2 — header/menu wishlist entry point. Reuses productCard() and
// the existing account overlay (same pattern as openAllReviews()) —
// no new modal, no new product-rendering code.
function updateWishlistBadge(){
  const el=$('wishlistCount'); if(!el) return;
  el.textContent=wishlist.length;
  el.style.display=wishlist.length?'flex':'none';
}
function openWishlist(){
  $('accountOverlay').classList.add('open'); document.body.classList.add('modalOpen');
  const items=products.filter(p=>wishlist.includes(p.id));
  $('accountContent').innerHTML=`<div class="eyebrow">YOUR FAVOURITES</div><h2>${items.length} saved item${items.length===1?'':'s'}</h2>
    <div class="productGrid" style="margin-top:14px">${items.map(productCard).join('')||'<div class="empty">No favourites yet — tap the heart on any product to save it here.</div>'}</div>`;
  bindGalleryScrollers();
}

/* ---------- Product media / gallery ---------- */
// V32.5 fix (Priority 2, item 7): a broken/missing image used to just
// vanish from the DOM (onerror removed the slide) while data-count and the
// "1 / N" badge kept the ORIGINAL count — so a product with e.g. 4
// configured media entries but a bad path on 3 of them silently ended up
// with a single working slide (no scroll possible) while still claiming
// "1 / 4". This keeps the count/controls in sync with what's actually still
// in the DOM, and removes the counter entirely once only one slide is left
// — matching the spec: a genuinely single-media product stays static, a
// multi-media one keeps scrolling, and this is fully automatic for every
// product (no per-product exception).
function handleMediaError(imgEl){
  const frame = imgEl.closest('.cardMediaFrame');
  imgEl.closest('.cardMediaSlide')?.remove();
  if(!frame) return;
  const scroller = frame.querySelector('.cardMediaScroller');
  const remaining = scroller ? scroller.querySelectorAll('.cardMediaSlide').length : 0;
  if(scroller) scroller.dataset.count = remaining;
  const badge = frame.querySelector('.galleryCount');
  if(remaining<=1) badge?.remove();
  else if(badge) badge.textContent = `1 / ${remaining}`;
}
function cardMediaMarkup(p){
  // No generic-gallery fallback: a product with no media of its own
  // shows the explicit placeholder, never another product's image.
  const media=(p.media?.length?p.media:(p.image?[{type:'image',path:p.image}]:PLACEHOLDER_MEDIA)).filter(Boolean);
  const count=media.length;
  const slides=media.map((m,i)=>{
    if(m.type==='video'&&m.path) return `<div class="cardMediaSlide cardVideo"><video controls playsinline preload="metadata" poster="${escapeHtml(m.poster||'')}"><source src="${escapeHtml(m.path)}" type="video/mp4"></video><span class="mediaLabel">Video</span></div>`;
    const a=responsiveImgAttrs(m.path||m,'(max-width:600px) 45vw, 280px');
    return `<div class="cardMediaSlide"><img src="${escapeHtml(a.src)}"${a.srcset?` srcset="${escapeHtml(a.srcset)}" sizes="${escapeHtml(a.sizes)}"`:''} alt="${escapeHtml(p.name)} image ${i+1}" loading="${i?'lazy':'eager'}" decoding="async" onerror="handleMediaError(this)"></div>`;
  }).join('');
  const controls=count>1?`<span class="galleryCount">1 / ${count}</span>`:'';
  return `<div class="cardMediaFrame"><div class="cardMediaScroller" data-count="${count}" aria-label="${escapeHtml(p.name)} media">${slides}</div>${controls}</div>`;
}
function refreshGalleryCounts(){
  document.querySelectorAll('.cardMediaFrame').forEach(frame=>{
    const s=frame.querySelector('.cardMediaScroller'), c=frame.querySelector('.galleryCount');
    if(!s||!c)return;
    const count=Math.max(1,Number(s.dataset.count||1));
    const idx=Math.max(0,Math.min(count-1,Math.round(s.scrollLeft/(s.clientWidth||1))));
    c.textContent=`${idx+1} / ${count}`;
  });
}
function refreshComboGalleryCounts(){
  document.querySelectorAll('.comboImage').forEach(frame=>{
    const s=frame.querySelector('.comboMediaScroller'), c=frame.querySelector('.galleryCount');
    if(!s||!c)return;
    const count=Math.max(1,Number(s.dataset.count||1));
    const idx=Math.max(0,Math.min(count-1,Math.round(s.scrollLeft/(s.clientWidth||1))));
    c.textContent=`${idx+1} / ${count}`;
  });
}
function bindComboGalleryScrollers(){
  document.querySelectorAll('.comboMediaScroller').forEach(s=>{
    if(s.dataset.bound)return; s.dataset.bound='1';
    s.addEventListener('scroll',refreshComboGalleryCounts,{passive:true});
    let down=false,startX=0,startScroll=0,moved=false;
    s.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;down=true;moved=false;startX=e.clientX;startScroll=s.scrollLeft;s.setPointerCapture?.(e.pointerId)});
    s.addEventListener('pointermove',e=>{if(!down||e.pointerType!=='mouse')return;const dx=e.clientX-startX;if(Math.abs(dx)>5)moved=true;if(moved)s.scrollLeft=startScroll-dx});
    const end=e=>{if(e.pointerType==='mouse')down=false};
    s.addEventListener('pointerup',end);s.addEventListener('pointercancel',end);
  });
  refreshComboGalleryCounts();
}
function bindGalleryScrollers(){
  document.querySelectorAll('.cardMediaScroller').forEach(s=>{
    if(s.dataset.bound)return; s.dataset.bound='1';
    s.addEventListener('scroll',refreshGalleryCounts,{passive:true});
    // Desktop mouse-drag support
    let down=false,startX=0,startScroll=0,moved=false;
    s.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;down=true;moved=false;startX=e.clientX;startScroll=s.scrollLeft;s.setPointerCapture?.(e.pointerId)});
    s.addEventListener('pointermove',e=>{if(!down||e.pointerType!=='mouse')return;const dx=e.clientX-startX;if(Math.abs(dx)>5)moved=true;if(moved)s.scrollLeft=startScroll-dx});
    const end=e=>{if(e.pointerType==='mouse')down=false};
    s.addEventListener('pointerup',end);s.addEventListener('pointercancel',end);
    s.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopPropagation();moved=false}},{capture:true});
  });
  refreshGalleryCounts();
}
function productGalleryMarkup(p){
  const media=(p.media||[]).filter(x=>x.type!=='video'&&(x.path||x.file));
  const items=media.length?media:[{path:p.image}];
  const main=responsiveImgAttrs(items[0].path,'(max-width:600px) 92vw, 480px');
  return `<div class="productGallery"><div class="galleryMain"><img id="galleryMainImg" src="${escapeHtml(main.src)}"${main.srcset?` srcset="${escapeHtml(main.srcset)}" sizes="${escapeHtml(main.sizes)}"`:''} data-full="${escapeHtml(items[0].path)}" alt="${escapeHtml(p.name)}" decoding="async" onerror="this.removeAttribute('srcset');this.src='images/brand/placeholder.svg'"></div><div class="galleryThumbs">${items.map((m,i)=>{const t=responsiveImgAttrs(m.path,'80px');return `<button type="button" class="${i===0?'active':''}" onclick="setGalleryImage('${escapeHtml(m.path)}',this)"><img src="${escapeHtml(t.src)}"${t.srcset?` srcset="${escapeHtml(t.srcset)}" sizes="${escapeHtml(t.sizes)}"`:''} loading="lazy" decoding="async" alt=""></button>`}).join('')}</div></div>`;
}
function setGalleryImage(path,btn){
  const img=$('galleryMainImg');
  if(img){
    const a=responsiveImgAttrs(path,'(max-width:600px) 92vw, 480px');
    img.src=a.src;
    if(a.srcset){img.srcset=a.srcset;img.sizes=a.sizes} else img.removeAttribute('srcset');
    img.dataset.full=path;
    img.onerror=()=>{img.removeAttribute('srcset');img.src='images/brand/placeholder.svg'};
  }
  document.querySelectorAll('.galleryThumbs button').forEach(x=>x.classList.remove('active'));
  btn?.classList.add('active');
}

/* ---------- Product card / grids ---------- */
// V33: one text badge per card (priority below), real star rating only when
// reviews exist, a single full-width Add to cart ("quick add") action.
function productTag(p){
  if(isProductSoldOut(p)) return '<span class="pcTag soldout">Sold out</span>';
  if(isProductNew(p)) return '<span class="pcTag new">New</span>';
  if(p.best) return '<span class="pcTag">Bestseller</span>';
  if(p.isPopular) return '<span class="pcTag popular">Popular</span>';
  if(p.isHealthy) return '<span class="pcTag healthy">Healthy</span>';
  if(productHasActiveOffer(p)) return '<span class="pcTag offer">Offer</span>';
  return '';
}
function starsMarkup(r){ const n=Math.max(0,Math.min(5,Math.round(Number(r)||0))); return '★'.repeat(n)+'☆'.repeat(5-n); }
function productCard(p){
  const v=getVariant(p,variantKey(p.id));
  if(!v) return ''; // defensive: should never happen post-sync(), but never crash the grid if it does
  const soldOut=isProductSoldOut(p);
  const off=v.mrp-v.price,q=soldOut?0:cartQtyFor(p.id,v.id);
  const rated=Number(p.reviewCount)>0&&Number(p.rating)>0;
  const activeVariants=(p.variants||[]).filter(x=>x.active);
  const actions=soldOut
    ?`<div class="pcActions"><button class="soldOutBtn" disabled>Sold out</button></div>`
    :q
    ?`<div class="pcActions hasQty"><div class="inlineQty"><button onclick="changeProductQty('${p.id}','${v.id}',-1)" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button><b>${q}</b><button onclick="changeProductQty('${p.id}','${v.id}',1)" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button></div><button class="viewCartBtn" onclick="openCart()" aria-label="View cart"><i class="fa-solid fa-bag-shopping"></i></button></div>`
    :`<div class="pcActions single"><button onclick="addToCart('${p.id}','${v.id}')" aria-label="Add ${escapeHtml(p.name)} to cart"><i class="fa-solid fa-plus" aria-hidden="true"></i>Add to cart</button></div>`;
  return `<article class="productCard${soldOut?' isSoldOut':''}" data-product-id="${p.id}">
    <div class="visualWrap" onclick="openProduct('${p.id}')">${cardMediaMarkup(p)}${productTag(p)}<button class="heart ${wishlist.includes(p.id)?'isWish':''}" onclick="event.stopPropagation();toggleWishlist('${p.id}')" aria-label="Favourite ${escapeHtml(p.name)}"><i class="${wishlist.includes(p.id)?'fa-solid':'fa-regular'} fa-heart"></i></button></div>
    <div class="pcBody">
      <small>${escapeHtml(catName(p.category))}</small>
      <h3 onclick="openProduct('${p.id}')">${escapeHtml(p.name)}</h3>
      <div class="stars${rated?'':' noRating'}"${rated?` aria-label="Rated ${p.rating} out of 5"`:' aria-hidden="true"'}>${starsMarkup(p.rating)} <span>${rated?`${p.rating} (${p.reviewCount})`:''}</span></div>
      <p>${escapeHtml(p.short||'')}</p>
      ${!soldOut&&activeVariants.length>1?`<div class="sizes">${activeVariants.map(x=>`<button class="${x.id===v.id?'active':''}" onclick="event.stopPropagation();setVariant('${p.id}','${x.id}')">${escapeHtml(x.label)}</button>`).join('')}</div>`:''}
      <div class="price"><b>${money(v.price)}</b>${v.mrp>v.price?`<del>${money(v.mrp)}</del>${!soldOut&&off>0?`<em>Save ${money(off)}</em>`:''}`:''}</div>
      ${actions}
    </div>
  </article>`;
}
// PatilKaki-review addition: Bestsellers / New Arrivals tabs on the
// homepage discovery section. Reuses the existing bestseller flag and
// the isNew() helper above — no separate "new products" fetch. The
// tab row only appears at all when there's at least one new product to
// show, so sites with no New items yet look exactly as before.
let discoveryTab='best';
function setDiscoveryTab(t){ discoveryTab=t; renderBest(); track('view_item_list',{item_list_id:'home_'+t}); }
// V33 "You'll love these": tabs come from Admin (Site content → Homepage →
// You'll love these); each tab is backed by a product flag Admin sets per
// product (Bestseller / New / Popular / Healthy). A tab with no products
// is hidden automatically.
const DISCOVERY_FILTERS={best:p=>p.best,new:p=>isProductNew(p),popular:p=>p.isPopular,healthy:p=>p.isHealthy};
function discoveryList(id){ const f=DISCOVERY_FILTERS[id]; return f?products.filter(f):[]; }
function renderBest(){
  if(!$('bestGrid')) return;
  const cfg=sec('loveThese');
  const tabs=(cfg.tabs||[]).filter(t=>t&&t.enabled!==false&&discoveryList(t.id).length);
  if(tabs.length && !tabs.some(t=>t.id===discoveryTab)) discoveryTab=tabs[0].id;
  const box=$('discoveryTabs');
  if(box){
    box.style.display=tabs.length>1?'flex':'none';
    box.innerHTML=tabs.map(t=>`<button role="tab" aria-selected="${t.id===discoveryTab}" class="${t.id===discoveryTab?'active':''}" onclick="setDiscoveryTab('${t.id}')">${escapeHtml(t.label)}</button>`).join('');
  }
  if($('discoveryEyebrow')) $('discoveryEyebrow').textContent=cfg.eyebrow||'';
  if($('discoveryHeading')) $('discoveryHeading').textContent=cfg.title||'';
  const list=(tabs.length?discoveryList(discoveryTab):products).slice(0,Number(cfg.maxItems)||8);
  $('bestGrid').innerHTML=list.map(productCard).join('')||'<div class="empty smallEmpty">Nothing here yet.</div>';
  bindGalleryScrollers();
}
function renderCategories(){
  if(!$('categoryTabs'))return;
  $('categoryTabs').innerHTML=`<button class="${cat==='all'?'active':''}" onclick="setCat('all',this)">All</button>`+
    categories.filter(c=>products.some(p=>p.category===c.id||(p.categories||[]).includes(c.id))).map(c=>`<button class="${cat===c.id?'active':''}" onclick="setCat('${c.id}',this)">${escapeHtml(c.name)}</button>`).join('');
  renderCategoryCards();
}
// Phase 2 — deterministic colour accent for any category/meal-tag id:
// hashes the string into one of 6 palette slots (see .catAccent-0..5 in
// style.css), so a category added next year gets a distinct, coherent
// colour automatically — no per-name colour map to maintain.
function categoryAccentClass(id){
  let h=0; const s=String(id||'');
  for(let i=0;i<s.length;i++) h=(h*31+s.charCodeAt(i))>>>0;
  return 'catAccent-'+(h%6);
}
// "Shop by Category" — big colourful, image-led cards. Data-driven off
// the same `categories`/`products` arrays the category tabs already
// use; a category with zero active products simply doesn't get a
// card, so this scales to 100+ products without any code changes.
// V33 "Shop by category": arch-framed cards. Image/description come from
// Admin → Categories; if unset, a product pack image and the default copy
// from site-content-defaults.js are used. A combos-type category with no
// products still gets a card that jumps to the combos section.
function categoryCopy(c){
  if(c.description) return c.description;
  const key=(c.id+' '+c.name).toLowerCase();
  return ((sec('categories').fallbackCopy)||[]).find(f=>f&&f.match&&key.includes(String(f.match).toLowerCase()))?.text||'';
}
function renderCategoryCards(){
  const box=$('categoryCardsGrid'); if(!box) return;
  const combos=(CONFIG.combos||[]).filter(c=>c.active);
  const cards=categories.map(c=>{
    const inCat=products.filter(p=>p.category===c.id||(p.categories||[]).includes(c.id));
    const isComboCat=/combo/i.test(c.id+' '+c.name);
    if(!inCat.length && !(isComboCat&&combos.length)) return '';
    const img=c.imageUrl||firstRealImage(inCat)||(isComboCat?firstRealImage(combos):'')||'';
    const count=inCat.length?`${inCat.length} product${inCat.length>1?'s':''}`:`${combos.length} combo${combos.length>1?'s':''}`;
    const action=inCat.length?`filterByCategory('${c.id}')`:`navigate('#combos')`;
    return `<button class="catCard" type="button" onclick="${action}">
      <div class="catImg${fitAttrs(isPackshot(c.imageType,!c.imageUrl))}">${imgTag(img,'(max-width:767px) 45vw, 280px',c.name)}</div>
      <h3>${escapeHtml(c.name)}</h3><p>${escapeHtml(categoryCopy(c)||count)}</p><span class="catLink">Shop now →</span>
    </button>`;
  }).filter(Boolean).join('');
  const section=$('shopByCategory');
  if(section) section.style.display=cards?'':'none';
  box.innerHTML=cards;
}
// "Shop by Occasion" — reuses mealTags exactly as they're already
// stored/managed in Admin; a tag with zero matching products doesn't
// get a card, and the whole section hides if there's no meal-tag data
// at all yet.
// V33 "What are you craving today?": cards come from Admin (Site content →
// Homepage → Shop by occasion), each resolving to explicit product ids or
// name keywords. A card with no matching products is hidden. If Admin has
// removed every card, falls back to the pre-V33 meal-tag cards.
let occasionItems=[];
// V34.2 occasions. Admin data only: name, description, real food/lifestyle
// photo (type + focal point), products, product tags, button, order, active.
//   products = hand-picked productIds  ∪  products carrying ANY selected tag
//   (keywords are used only while neither is set, so the section works
//   before tags are assigned). No photo → a clean typographic tile in Jayvi
//   colours — never an emoji default and never a product pouch.
// An optional Admin icon is still honoured if someone deliberately sets one.
function occasionProducts(it){
  const ids=new Set(it.productIds||[]), tags=new Set(it.tagIds||[]);
  let list=products.filter(p=>ids.has(p.id) || (tags.size && (p.mealTags||[]).some(t=>tags.has(t))));
  if(!ids.size && !tags.size) list=resolveProducts([],it.keywords);
  return list;
}
function occasionIconMarkup(icon){
  const v=String(icon||'').trim();
  if(/^fa-[a-z0-9-]+$/.test(v)) return `<i class="fa-solid ${v}" aria-hidden="true"></i>`;
  return escapeHtml(v);
}
const OCC_TILES=['maroon','green','gold'];
function renderOccasionCards(){
  const box=$('occasionGrid'), section=$('occasionSection');
  if(!box||!section) return;
  const combos=(CONFIG.combos||[]).filter(c=>c.active);
  occasionItems=(sec('occasions').items||[]).filter(it=>it && it.title && it.active!==false)
    .map((it,i)=>({...it,_i:i,list:it.target==='combos'?[]:occasionProducts(it)}))
    // A card must lead somewhere: its own button link, the combos, or at least one product.
    .filter(it=>it.ctaTarget || (it.target==='combos'?combos.length:it.list.length))
    .sort((a,b)=>(Number(a.order)||999)-(Number(b.order)||999) || a._i-b._i);
  const card=(it,i)=>{
    let media;
    if(it.image){
      const pack=isPackshot(it.imageType);
      media=`<div class="occImg${pack?' fit-pack':' cover fit-life'}"${pack?'':` style="--focus:${focusToCss(it.imageFocus)}"`}>${imgTag(it.image,'(max-width:767px) 46vw, 260px',it.title)}</div>`;
    } else {
      const icon=it.icon?`<span class="occIcon">${occasionIconMarkup(it.icon)}</span>`:'';
      media=`<div class="occImg occTile occTile-${OCC_TILES[i%OCC_TILES.length]}" aria-hidden="true">${icon}<span class="occTileName">${escapeHtml(it.description||it.title)}</span></div>`;
    }
    const tile=!it.image;
    const sub=tile?'':(it.description||(it.target==='combos'?combos.map(c=>c.name):it.list.map(p=>p.name)).slice(0,3).join(', '));
    return `<button class="occCard${tile?' hasTile':''}" type="button" onclick="setOccasion(${i})">${media}<div class="occBody"><h3>${escapeHtml(it.title)}</h3>${sub?`<p>${escapeHtml(sub)}</p>`:''}${it.ctaLabel?`<span class="occCta">${escapeHtml(it.ctaLabel)} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>`:''}</div></button>`;
  };
  let cards='';
  if(occasionItems.length){
    cards=occasionItems.map(card).join('');
  } else if(!(sec('occasions').items||[]).length){
    // Nothing configured at all → one tile per use-case/pairing tag that has products.
    cards=mealTagList.map((t,i)=>{
      const m=products.filter(p=>(p.mealTags||[]).includes(t.id)); if(!m.length) return '';
      return `<button class="occCard" type="button" onclick="setMealFilter('${t.id}')"><div class="occImg occTile occTile-${OCC_TILES[i%OCC_TILES.length]}" aria-hidden="true"><span class="occTileName">${escapeHtml(t.name)}</span></div><div class="occBody"><h3>${escapeHtml(t.name)}</h3><p>${m.length} product${m.length>1?'s':''}</p></div></button>`;
    }).filter(Boolean).join('');
  }
  section.style.display=cards?'':'none';
  box.innerHTML=cards;
}
function setOccasion(i){
  const it=occasionItems[i]; if(!it) return;
  if(it.ctaTarget){ const t=it.ctaTarget; if(t.startsWith('#')) navigate(t); else location.href=safeHref(t); return; }
  if(it.target==='combos'){ navigate('#combos'); return; }
  occasionFilter={label:it.title,ids:it.list.map(p=>p.id)}; mealFilter=null; discoveryFilter=null; cat='all';
  renderCategories(); renderProducts(); scrollToSection('shop');
  track('view_item_list',{item_list_id:'occasion_'+(it.id||i),item_list_name:it.title});
}
// Offers homepage section — reads the SAME activeOffers array already
// fetched for the floating offer button/announcement (fetchActiveOffers()),
// reuses offerLabel(); no second offers query, no new coupon logic.
// Resolves a single, reliable navigation target for an offer from the
// SAME applicable_products/applicable_categories the coupon system
// already enforces (see list_active_offers()) — never guesses: a
// multi-category/multi-product offer, or one with no restriction at
// all (storewide), simply gets no CTA button, per the brief.
function offerTarget(o){
  if(o.applicable_categories?.length===1){
    const c=categories.find(x=>x.id===o.applicable_categories[0]);
    if(c) return {type:'category',id:c.id,label:`Shop ${c.name} →`};
  }
  if(o.applicable_products?.length===1){
    const p=getProduct(o.applicable_products[0]);
    if(p) return {type:'product',id:p.id,label:'Shop this product →'};
  }
  return null;
}
function renderOffersSection(){
  const box=$('offersSectionGrid'); const section=$('offersSection');
  if(!box||!section) return;
  // V34: configured promotions first (priority order), then any live public
  // coupon they don't already cover — so several offers can run at once.
  const promos=promotionsConfigured()?livePromotions('homepage'):[];
  const coupons=promos.length?uncoveredCoupons(promos):activeOffers;
  if(!promos.length && !coupons.length){ section.style.display='none'; return; }
  section.style.display='';
  box.innerHTML=promos.map(p=>promoCardMarkup(p,'home')).join('')+coupons.map(o=>{
    const target=offerTarget(o);
    const cta=target?`<button class="btn gold" onclick="${target.type==='category'?`filterByCategory('${target.id}')`:`openProduct('${target.id}')`}">${escapeHtml(target.label)}</button>`:'';
    return `<article class="promoOfferCard">
      <span class="promoOfferEyebrow">${escapeHtml(o.name||'Jayvi offer')}</span>
      <h3 class="promoOfferHeadline">${offerLabel(o)}</h3>
      ${o.description?`<p>${escapeHtml(o.description)}</p>`:''}
      ${o.min_order_value?`<small>Min order ${money(o.min_order_value)}</small>`:''}
      ${cta}
    </article>`;
  }).join('');
}
function setCat(c,b){cat=c;mealFilter=null;discoveryFilter=null;occasionFilter=null;document.querySelectorAll('.categoryTabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderProducts()}
// Client-side filters (no migration): availability reuses
// isProductSoldOut(); price buckets read each product's already-loaded
// variant price. Both apply on top of category/meal/discovery/search.
function priceMatchesBucket(v,bucket){
  if(!v||bucket==='all') return true;
  if(bucket==='under200') return v.price<200;
  if(bucket==='under500') return v.price<500;
  if(bucket==='500plus') return v.price>=500;
  return true;
}
function renderProducts(){
  if(!$('productGrid'))return;
  const q=($('productSearch')?.value||'').toLowerCase();
  let arr=products.filter(p=>{
    const v=getVariant(p,variantKey(p.id));
    return (cat==='all'||p.category===cat)
      &&(!mealFilter||(p.mealTags||[]).includes(mealFilter))
      &&(!discoveryFilter||(DISCOVERY_FILTERS[discoveryFilter]||(()=>true))(p))
      &&(!occasionFilter||occasionFilter.ids.includes(p.id))
      &&(availabilityFilter!=='inStock'||!isProductSoldOut(p))
      &&priceMatchesBucket(v,priceBucket)
      &&matchesSearch(p,q);
  });
  const s=sortValue;
  if(s==='priceLow')arr.sort((a,b)=>getVariant(a,variantKey(a.id)).price-getVariant(b,variantKey(b.id)).price);
  if(s==='priceHigh')arr.sort((a,b)=>getVariant(b,variantKey(b.id)).price-getVariant(a,variantKey(a.id)).price);
  if(s==='rating')arr.sort((a,b)=>b.rating-a.rating);
  // "Newest" uses the real created_at column (already in the DB,
  // just newly mapped — see loadCatalogFromSupabase). Deliberately NO
  // "Best Selling" sort: the storefront has no reliable per-product
  // sales-count data, and the brief is explicit not to invent one —
  // `best` (Bestseller) is a separate, admin-curated flag, surfaced
  // instead via the "Bestsellers" View all filter, not as a sort.
  if(s==='newest')arr.sort((a,b)=>(b.createdAt?new Date(b.createdAt).getTime():0)-(a.createdAt?new Date(a.createdAt).getTime():0));
  $('productGrid').innerHTML=arr.map(productCard).join('')||'<div class="empty">No products match these filters.</div>';
  bindGalleryScrollers();
  renderActiveFilterChip();
  updateShopResultCount(arr.length);
}
function setAvailabilityFilter(v){ availabilityFilter=v; syncFilterControls(); renderProducts(); }
function setPriceBucket(v){ priceBucket=v; syncFilterControls(); renderProducts(); }
function setSortValue(v){ sortValue=v; syncFilterControls(); renderProducts(); }
// Phase 2 — mobile "Filter / Sort" drawer (item 4). Reuses the exact
// same .overlay.drawerOverlay/.drawer markup pattern already used for
// the cart and search drawers, and the SAME state (sortValue,
// availabilityFilter, priceBucket) the desktop inline controls use —
// two input surfaces, one shared state, so they can never disagree.
function openShopFilterDrawer(){
  syncFilterControls();
  $('shopFilterOverlay')?.classList.add('open'); document.body.classList.add('modalOpen');
}
function closeShopFilterDrawer(){
  $('shopFilterOverlay')?.classList.remove('open'); document.body.classList.remove('modalOpen');
}
function syncFilterControls(){
  [['sortSelect',sortValue],['sortSelectMobile',sortValue],
   ['availabilitySelect',availabilityFilter],['availabilitySelectMobile',availabilityFilter],
   ['priceBucketSelect',priceBucket],['priceBucketSelectMobile',priceBucket]].forEach(([id,val])=>{
    const el=$(id); if(el) el.value=val;
  });
}
function updateShopResultCount(n){
  const label=`${n} product${n===1?'':'s'}`;
  const a=$('shopResultCount'); if(a) a.textContent=label;
  const b=$('shopResultCountDrawer'); if(b) b.textContent=n;
}
// Phase 2 — "Shop by Occasion" filter chip, and (cont'd) the Bestsellers/
// New Arrivals "View all" destinations, all funnel into this ONE chip +
// this ONE product grid rather than separate pages/components.
function setMealFilter(tagId){
  mealFilter=tagId; discoveryFilter=null; occasionFilter=null; cat='all';
  renderCategories(); renderProducts();
  scrollToSection('shop');
}
function viewAllDiscovery(which){ // which: 'best' | 'new' | 'popular' | 'healthy'
  discoveryFilter=which; mealFilter=null; occasionFilter=null; cat='all';
  renderCategories(); renderProducts();
  scrollToSection('shop');
}
function clearActiveFilter(){ mealFilter=null; discoveryFilter=null; occasionFilter=null; renderProducts(); }
function renderActiveFilterChip(){
  const box=$('mealFilterChip'); if(!box) return;
  let label=null;
  if(discoveryFilter) label=(sec('loveThese').tabs||[]).find(t=>t&&t.id===discoveryFilter)?.label||discoveryFilter;
  else if(occasionFilter) label=occasionFilter.label;
  else if(mealFilter) label=mealTagList.find(t=>t.id===mealFilter)?.name||CONFIG.mealLabels?.[mealFilter]||mealFilter;
  if(!label){ box.style.display='none'; return; }
  box.style.display='flex';
  box.querySelector('b').textContent=label;
}
function filterByCategory(catId){
  mealFilter=null; discoveryFilter=null; occasionFilter=null; cat=catId;
  renderCategories(); renderProducts();
  scrollToSection('shop');
  track('view_item_list',{item_list_id:'category_'+catId,item_list_name:catName(catId)});
}
function comboMediaMarkup(c){
  // V32.6: combos now follow the exact same product_media architecture
  // as products (item 14 of the spec) — c.media comes straight from
  // Supabase. Falls back to the old item-image composite only for a
  // combo that somehow has no media rows of its own, so nothing breaks.
  const media=(c.media||[]).filter(Boolean);
  const slidesSrc = media.length
    ? media
    : [c.image,...(c.items||[]).map(i=>getProduct(i.productId)?.image)].filter(Boolean).map(path=>({type:'image',path}));
  const unique=[...new Map(slidesSrc.map(m=>[m.path,m])).values()];
  const count=unique.length;
  const slides=unique.map((m,i)=>{
    if(m.type==='video'&&m.path) return `<div class="comboSlide cardVideo"><video controls playsinline preload="metadata" poster="${escapeHtml(m.poster||'')}"><source src="${escapeHtml(m.path)}" type="video/mp4"></video><span class="mediaLabel">Video</span></div>`;
    const a=responsiveImgAttrs(m.path,'(max-width:600px) 45vw, 280px');
    return `<div class="comboSlide"><img src="${escapeHtml(a.src)}"${a.srcset?` srcset="${escapeHtml(a.srcset)}" sizes="${escapeHtml(a.sizes)}"`:''} alt="${escapeHtml(c.name)} image ${i+1}" loading="${i?'lazy':'eager'}" decoding="async"></div>`;
  }).join('');
  const controls=count>1?`<span class="galleryCount">1 / ${count}</span>`:'';
  return `<div class="comboMediaScroller" data-count="${count}" aria-label="${escapeHtml(c.name)} images">${slides}</div>${controls}`;
}
function cartQtyForCombo(cid){const x=cart.find(i=>i.type==='combo'&&i.comboId===cid);return x?.qty||0}
// Extracted from renderCombos() so the same combo card markup can be
// reused in the product-detail "Complete your meal" section (see
// relatedSectionsMarkup) without a second, drifting copy of it.
function comboCard(c){
  // V32.5 fix (Priority 2, item 5): same data-driven qty-stepper pattern
  // as productCard() — a combo already in the cart must show -/+ just
  // like every other product, not a static Add to cart button forever.
  const q=cartQtyForCombo(c.id);
  const actions=q
    ?`<div class="pcActions comboActions hasQty"><div class="inlineQty"><button onclick="changeComboQty('${c.id}',-1)" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button><b>${q}</b><button onclick="changeComboQty('${c.id}',1)" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button></div><button class="viewCartBtn" onclick="openCart()" aria-label="View cart"><i class="fa-solid fa-bag-shopping"></i></button></div>`
    :`<div class="pcActions comboActions"><button onclick="addCombo('${c.id}')">Add combo</button><button onclick="buyCombo('${c.id}')">Buy now</button></div>`;
  // Phase 2 — "Individual Value": computed live from each item's
  // ACTUAL current variant price (getProduct/getVariant — the same
  // data the product cards use), rather than trusting admin's
  // separately hand-entered combo.mrp to stay in sync with prices
  // that can change independently. Falls back to combo.mrp only if an
  // item's price can't be resolved (e.g. a since-removed product).
  const items=c.items.map(i=>{
    const p=getProduct(i.productId), v=p?getVariant(p,i.variantId):null;
    return {p,v,qty:i.qty||1};
  });
  const resolvedAll=items.every(i=>i.v);
  const individualValue=resolvedAll?items.reduce((sum,i)=>sum+i.v.price*i.qty,0):c.mrp;
  const realSavings=individualValue-c.price;
  const itemRow=items.map(i=>`<span class="comboItemName">${escapeHtml(i.p?.name||'')}${i.v?.label?` · ${escapeHtml(i.v.label)}`:''}</span>`).join('<span class="comboPlus">+</span>');
  return `<article class="comboCard">
  <div class="comboImage">${comboMediaMarkup(c)}</div>
  <div class="comboBody">
    <div class="eyebrow comboEyebrow"><i class="fa-solid fa-gift" aria-hidden="true"></i>Jayvi Combo</div>
    <h3>${escapeHtml(c.name)}</h3><p>${escapeHtml(c.short)}</p>
    <div class="comboItemsRow">${itemRow}</div>
    <div class="comboValueBlock">
      ${individualValue>c.price?`<div class="comboValueRow"><span>Buying separately</span><del>${money(individualValue)}</del></div>`:''}
      <div class="comboValueRow comboValueMain"><span>Combo price</span><b>${money(c.price)}</b></div>
      ${realSavings>0?`<div class="comboValueRow comboSaveRow"><span>You save</span><b>${money(realSavings)}</b></div>`:''}
    </div>
    ${actions}
  </div></article>`;
}
function renderCombos(){
  if(!$('comboGrid'))return;
  const cs=(CONFIG.combos||[]).filter(c=>c.active);
  $('comboCount').textContent=cs.length?`${cs.length} combo${cs.length>1?'s':''}`:'';
  $('comboGrid').innerHTML=cs.length?cs.map(comboCard).join(''):'<div class="empty" style="color:var(--jayvi-on-dark-soft)">No active combos yet.</div>';
  bindComboGalleryScrollers();
}
function addCombo(id){
  const c=getCombo(id);if(!c)return;const key='combo:'+id;const x=cart.find(i=>i.key===key);
  if(x)x.qty++; else cart.push({key,type:'combo',comboId:id,qty:1});
  track('add_to_cart',{currency:'INR',value:c.price,items:[{item_id:'combo:'+c.id,item_name:c.name,item_category:'Combo',price:c.price,quantity:1}]});
  saveCart();renderCart();refreshProductViews();
  // V32.5 fix (Priority 2, item 5): must match addToCart()'s UX exactly —
  // stay on the page and show a toast, never auto-open the cart drawer.
  showCartAddedToast(c.name);
}
function buyCombo(id){const c=getCombo(id);if(!c)return;const key='combo:'+id;const x=cart.find(i=>i.key===key);if(x)x.qty++;else cart.push({key,type:'combo',comboId:id,qty:1});saveCart();renderCart();refreshProductViews();openCheckout()}
function changeComboQty(id,d){
  const key='combo:'+id; let x=cart.find(i=>i.key===key);
  if(!x&&d>0){const c=getCombo(id);if(!c)return;cart.push({key,type:'combo',comboId:id,qty:1})}
  else if(!x){return}
  else{x.qty+=d; if(x.qty<1)cart=cart.filter(i=>i.key!==key)}
  saveCart();renderCart();refreshProductViews();
}

/* ---------- Meal match ---------- */
const MEAL_DESCRIPTIONS={idli:'Idli + your favourite podi or chutney',dosa:'Dosa + your favourite chutney flavour',chapati:'Chapati works with every chutney and podi',rice:'Rice + ghee + chutney powder or podi'};
function renderMeal(){
  if(!$('mealTabs'))return;
  $('mealTabs').innerHTML=pairingTagList.map(t=>`<button class="${t.id===meal?'active':''}" onclick="setMeal('${t.id}')">${escapeHtml(t.name)}</button>`).join('');
  const rec=products.filter(p=>p.mealTags?.includes(meal));
  const desc=MEAL_DESCRIPTIONS[meal]||'Pick from all products that fit this meal';
  // V32.6 (root cause of the "combo -/+ doesn't show" bug, item 6): this
  // used to call getVariant(p,...) and read v.price with no null-check.
  // A product with zero active/sellable variants made getVariant()
  // return null, so v.price threw — and because refreshProductViews()
  // runs renderMeal() BEFORE renderCombos(), that uncaught exception
  // silently aborted the rest of the chain, leaving the combo card (and
  // anything else queued after it) stuck showing "Add to cart" even
  // though the cart itself had already updated correctly. Filtering out
  // unsellable products here (same defensive pattern productCard()
  // already uses) fixes this at the actual source, for every product,
  // not just combos — see also the defensive per-call wrapping in
  // refreshProductViews() below, which now guarantees one broken
  // section can never again block its siblings from re-rendering.
  const sellableRec = rec.filter(p=>getVariant(p,variantKey(p.id)));
  $('mealRecommendations').innerHTML=`<div class="mealIntro"><b>${escapeHtml(desc)}</b><span>${sellableRec.length} product${sellableRec.length===1?'':'s'}</span></div>
    <div class="miniProducts">${sellableRec.map(p=>{const v=getVariant(p,variantKey(p.id));const a=responsiveImgAttrs(p.image,'64px');return `<button onclick="openProduct('${p.id}')"><div class="miniImg"><img src="${escapeHtml(a.src)}"${a.srcset?` srcset="${escapeHtml(a.srcset)}" sizes="${escapeHtml(a.sizes)}"`:''} loading="lazy" decoding="async" alt=""></div><span>${escapeHtml(p.name)}</span><b>${money(v.price)}</b></button>`}).join('')||'<div class="empty">No matching products yet.</div>'}</div>`;
}
function setMeal(m){meal=m;renderMeal()}

/* ---------- Footer social links (item 14) ---------- */
const SOCIAL_ICONS={whatsapp:'fa-whatsapp',instagram:'fa-instagram',facebook:'fa-facebook',youtube:'fa-youtube',x:'fa-x-twitter',linkedin:'fa-linkedin'};
const SOCIAL_LABELS={whatsapp:'WhatsApp',instagram:'Instagram',facebook:'Facebook',youtube:'YouTube',x:'X',linkedin:'LinkedIn'};
async function renderFooterSocialLinks(){
  const box=$('footerSocialLinks'); if(!box) return;
  try{
    const {data,error}=await sb.from('social_links').select('*').eq('enabled',true).order('display_order',{ascending:true});
    if(error||!data) throw error||new Error('empty');
    data.forEach(x=>{ if(x.platform&&!socialLinkUrls[x.platform]) socialLinkUrls[x.platform]=x.url; });
    applyContactLinks(); renderSocialSection();
    if(!data.length) return; // keep the two hardcoded fallback links already in the HTML rather than showing nothing
    box.innerHTML=data.map(s=>`<a href="${escapeHtml(s.url)}" target="_blank" rel="noopener">${escapeHtml(s.label||SOCIAL_LABELS[s.platform]||s.platform)}</a>`).join('');
  }catch(err){
    // Migration not yet run, or a transient fetch failure — the two
    // links already hard-coded in index.html stay exactly as they were,
    // so the footer is never empty.
    console.warn('Footer social links: using fallback (Supabase fetch failed):', err?.message||err);
  }
}

/* ---------- Gallery (V32.3) ----------
   Replaces the V32.6 Git/manifest.json-based brand marquee (images/gallery/
   + generate-gallery-manifest.js — the existing images/gallery/manifest.json
   was already an empty [] with nothing to migrate) with an Admin-managed,
   Supabase Storage-backed gallery (spec 11-18). Unlike the old marquee,
   this supports images AND videos mixed freely, has a real slideshow
   instead of a continuous scroll, and only ever loads/plays the ONE
   video that's currently on screen (spec 23: never preload several
   large videos at once). */
let galleryItems=[], galleryIndex=0, galleryTimer=null;
async function renderBrandGallery(){
  const section=$('brandGallery'), track=$('gallerySlides'), dotsEl=$('galleryDots');
  if(!section||!track) return;
  try{
    const {data:rows,error}=await sb.from('gallery_media').select('*').eq('active',true).order('display_order',{ascending:true});
    if(error) throw error;
    galleryItems=(rows||[]).filter(g=>g && g.media_url);
  }catch(err){
    // Migration not yet run, or a transient fetch failure — hide
    // gracefully rather than show a broken/empty section, same
    // fail-safe spirit as the old manifest.json fetch.
    console.warn('Gallery: could not load active items from Supabase — hiding section:', err?.message||err);
    section.style.display='none';
    return;
  }
  clearInterval(galleryTimer);
  if(!galleryItems.length){ section.style.display='none'; track.innerHTML=''; if(dotsEl)dotsEl.innerHTML=''; return; }

  track.innerHTML=galleryItems.map((g,i)=>{
    const cap=g.caption?`<span class="galleryCaption">${escapeHtml(g.caption)}</span>`:'';
    if(g.media_type==='video'){
      // Only the first (initially-active) slide gets a real `src` —
      // every other video slide starts empty and is only given its
      // real URL the moment it actually becomes active (see
      // gallerySetIndex()), so a gallery of several videos never
      // downloads more than one at a time.
      return `<div class="gallerySlide${i===0?' active':''}" data-i="${i}"><video ${g.poster_url?`poster="${escapeHtml(g.poster_url)}"`:''} playsinline muted preload="${i===0?'auto':'none'}" ${i===0?`src="${escapeHtml(g.media_url)}"`:''} data-src="${escapeHtml(g.media_url)}"></video>${cap}</div>`;
    }
    return `<div class="gallerySlide${i===0?' active':''}" data-i="${i}"><img src="${escapeHtml(g.media_url)}" alt="${escapeHtml(g.caption||'')}" loading="${i===0?'eager':'lazy'}" decoding="async" onerror="this.closest('.gallerySlide')?.remove()">${cap}</div>`;
  }).join('');

  if(dotsEl){
    if(galleryItems.length>1){
      dotsEl.style.display='';
      dotsEl.innerHTML=galleryItems.map((_,i)=>`<button class="${i===0?'active':''}" onclick="gallerySetIndex(${i})" aria-label="Show gallery item ${i+1}"></button>`).join('');
    } else {
      dotsEl.style.display='none'; dotsEl.innerHTML='';
    }
  }
  section.style.display='';
  galleryIndex=0;
  // Spec 17: 1-2 items never get an awkward auto-rotating animation —
  // a single item is simply static, two items still get a gentle
  // rotation (there's nothing "awkward" about a 2-item slideshow, only
  // about an infinite marquee loop of 1-2 images, which is what this
  // replaces). Many items stay performant because only the active
  // slide's video (if any) is ever actually loaded — see above.
  if(galleryItems.length>1) startGalleryTimer();
}
function startGalleryTimer(){
  clearInterval(galleryTimer);
  galleryTimer=setInterval(()=>{ gallerySetIndex((galleryIndex+1)%galleryItems.length); }, 4500);
}
function gallerySetIndex(i){
  const track=$('gallerySlides'); if(!track||!galleryItems.length) return;
  galleryIndex=i;
  track.querySelectorAll('.gallerySlide').forEach((el,idx)=>{
    const item=galleryItems[idx];
    el.classList.toggle('active', idx===i);
    if(!item) return;
    if(idx===i && item.media_type==='video'){
      const v=el.querySelector('video');
      if(v && !v.getAttribute('src')){ v.src=v.dataset.src; v.load(); }
      v?.play?.().catch(()=>{});
      // Spec 17: "pause/appropriate handling for video" — don't yank
      // the slideshow forward mid-clip; resume auto-rotation once this
      // video actually finishes.
      clearInterval(galleryTimer);
      if(v) v.onended=()=>{ if(galleryItems.length>1) startGalleryTimer(); };
    } else if(item.media_type==='video'){
      el.querySelector('video')?.pause?.();
    }
  });
  document.querySelectorAll('#galleryDots button').forEach((d,idx)=>d.classList.toggle('active', idx===i));
}


/* ---------- Reviews ---------- */
async function renderReviews(){
  if(!$('reviewGrid'))return;
  // V33: horizontal review cards + a rating summary. Only REAL reviews are
  // shown: curated customer testimonials (Admin → Reviews) and approved
  // website reviews. The headline score is either the rating Admin enters
  // (e.g. the public Google rating, labelled with its source) or the
  // computed average of approved website reviews — never invented.
  const cfg=sec('reviews');
  const curated=(CONFIG.reviews||[]).filter(r=>r.active&&r.source==='customer').slice(0,3);
  let live=[], liveCount=0, avg=null, ratedCount=0;
  try{
    const {data, count} = await sb.from('website_reviews').select('customer_name,rating,review_text,created_at,featured',{count:'exact'}).eq('status','approved').order('featured',{ascending:false}).order('created_at',{ascending:false}).limit(CONFIG.store.homepageReviewCount||6);
    live = data||[]; liveCount = count||0;
  }catch{}
  try{
    const {data} = await sb.from('website_reviews').select('rating').eq('status','approved').limit(1000);
    if(data?.length){ ratedCount=data.length; avg=data.reduce((t,r)=>t+Number(r.rating||0),0)/data.length; }
  }catch{}
  const card=(rating,text,name,meta,featured)=>`<article class="reviewCard">${featured?'<span class="pcTag popular" style="position:static;align-self:flex-start">Featured</span>':''}${Number(rating)>0?`<div class="stars" aria-label="${Number(rating)} out of 5">${starsMarkup(rating)}</div>`:''}<p>“${escapeHtml(text)}”</p><b>${escapeHtml(name)}</b><small>${escapeHtml(meta)}</small></article>`;
  let cards = curated.map(r=>card(r.rating,r.text,r.name,r.verifiedPurchase?'Verified purchase':'Customer review')).join('')
    + live.map(r=>card(r.rating,r.review_text,r.customer_name,'Verified Jayvi customer',r.featured)).join('');
  if(liveCount>live.length) cards += `<article class="reviewCard action"><i class="fa-solid fa-list" aria-hidden="true"></i><p>${liveCount} customer reviews</p><a href="#" onclick="openAllReviews();return false">View all reviews →</a></article>`;
  if(!cards) cards = `<article class="reviewCard action"><i class="fa-regular fa-pen-to-square" aria-hidden="true"></i><p>Tried Jayvi? Be the first to share what you thought.</p><a href="#" onclick="openReviewForm();return false">Write a review →</a></article>`;
  $('reviewGrid').innerHTML = cards;
  const sum=$('reviewSummary');
  if(sum){
    // V34.1: the score is ALWAYS real — either the average + count of
    // approved website reviews, or a public rating Admin quotes WITH its
    // source (e.g. Google). No reviews and no quoted rating → no score.
    const manual=parseFloat(cfg.ratingValue), manualCount=parseInt(cfg.ratingCount,10);
    const total=Math.max(liveCount,ratedCount);
    if(manual>0 && manual<=5 && cfg.ratingSource) sum.innerHTML=`<span class="reviewScore">${manual.toFixed(1)}<small>/5</small></span><span class="starsBig" aria-hidden="true">${starsMarkup(manual)}</span><span class="src">${escapeHtml(cfg.ratingSource)} rating${manualCount>0?` · ${manualCount} review${manualCount===1?'':'s'}`:''}</span>`;
    else if(avg>0 && total>0) sum.innerHTML=`<span class="reviewScore">${avg.toFixed(1)}<small>/5</small></span><span class="starsBig" aria-hidden="true">${starsMarkup(avg)}</span><span class="src">Based on ${total} review${total===1?'':'s'}</span>`;
    else sum.innerHTML='';
  }
  // "View all reviews" only when there is something to view.
  const va=document.querySelector('.reviewActions a[onclick^="openAllReviews"]'); if(va) va.hidden=!liveCount;
  const wr=document.querySelector('.reviewActions a[onclick^="openReviewForm"]'); if(wr) wr.hidden=!(curated.length||live.length); // the empty-state card already offers it
  const g=$('googleReviewsTop');
  if(g){ if(CONFIG.store.googleReviewsUrl){ g.href=CONFIG.store.googleReviewsUrl; g.hidden=false; } else g.hidden=true; }
}
let _allReviewsOffset = 0;
const ALL_REVIEWS_PAGE_SIZE = 10;
async function openAllReviews(reset=true){
  if(reset) _allReviewsOffset = 0;
  $('accountOverlay').classList.add('open');document.body.classList.add('modalOpen');
  const {data, count, error} = await sb.from('website_reviews')
    .select('customer_name,rating,review_text,created_at,featured',{count:'exact'})
    .eq('status','approved')
    .order('featured',{ascending:false}).order('created_at',{ascending:false})
    .range(_allReviewsOffset, _allReviewsOffset+ALL_REVIEWS_PAGE_SIZE-1);
  if(error){ showToast('Could not load reviews'); return; }
  const rows = data||[];
  $('accountContent').innerHTML = `<div class="eyebrow">CUSTOMER REVIEWS</div><h2>${count||0} reviews</h2>
    <div class="reviewGrid" style="grid-template-columns:1fr;margin-top:14px">${rows.map(r=>`<article>${r.featured?'<span class="typeTag" style="background:var(--gold-soft);color:var(--jayvi-gold-dark)">FEATURED</span>':''}<div class="stars">${'★'.repeat(r.rating)}</div><p>“${escapeHtml(r.review_text)}”</p><b>${escapeHtml(r.customer_name)}</b><small>${new Date(r.created_at).toLocaleDateString('en-IN')}</small></article>`).join('')||'<div class="empty">No reviews yet.</div>'}</div>
    ${count>_allReviewsOffset+ALL_REVIEWS_PAGE_SIZE?`<button class="btn light full" style="margin-top:14px" onclick="_allReviewsOffset+=${ALL_REVIEWS_PAGE_SIZE};openAllReviews(false)">Load more</button>`:''}`;
}
function openReviewForm(){
  $('accountOverlay').classList.add('open');document.body.classList.add('modalOpen');
  $('accountContent').innerHTML = `<div class="eyebrow">WRITE A REVIEW</div><h2>Tell us what you thought.</h2>
    <p class="muted">Your review is checked by Jayvi before it appears on the site — this usually takes a day or two.</p>
    <form onsubmit="submitReview(event)">
      <label>Your name *<input id="revName" required value="${escapeHtml(currentProfile?.name||'')}"></label>
      <label>Rating *<select id="revRating" required>
        <option value="5">★★★★★ — Excellent</option><option value="4">★★★★ — Good</option>
        <option value="3">★★★ — Okay</option><option value="2">★★ — Not great</option><option value="1">★ — Poor</option>
      </select></label>
      <label>Which product? (optional)<select id="revProduct"><option value="">General review</option>${products.map(p=>`<option value="${p.id}">${escapeHtml(p.name)}</option>`).join('')}</select></label>
      <label>Order number (optional)<input id="revOrder" placeholder="JF-YYYYMMDD-XXXXXX"></label>
      <label>Your review *<textarea id="revText" required rows="4" placeholder="What did you think?"></textarea></label>
      <button class="btn gold full" type="submit">Submit review →</button>
    </form>`;
}
async function submitReview(e){
  e.preventDefault();
  const payload = {
    customer_id: currentUser?.id || null,
    customer_name: $('revName').value.trim(),
    rating: Number($('revRating').value),
    review_text: $('revText').value.trim(),
    product_id: $('revProduct').value || null,
    order_number: $('revOrder').value.trim() || null,
    status: 'pending'
  };
  if(!payload.customer_name || !payload.review_text){ showToast('Please fill in your name and review'); return; }
  const {error} = await sb.from('website_reviews').insert(payload);
  if(error){ showToast('Could not submit review: '+error.message); return; }
  $('accountContent').innerHTML = `<div class="successIcon"><i class="fa-solid fa-check"></i></div><div class="eyebrow">THANK YOU</div><h2>Review submitted.</h2><p class="muted">Jayvi will review it shortly — approved reviews appear on the site automatically.</p><button class="btn gold full" onclick="closeAccount()">Close</button>`;
}

/* ---------- Hero ---------- */
function heroSlides(){
  const a=(CONFIG.announcements||[]).filter(x=>x.active).sort((x,y)=>x.order-y.order);
  if(a.length) return a;
  // V33: no active hero slide → the brand slide from Site content → Homepage → Hero.
  const f=sec('hero').fallback||{};
  return [{id:'fallback',label:f.eyebrow||'',title:f.title||'',em:f.em||'',text:f.text||'',image:f.image||'',mobileImage:f.mobileImage||'',imageType:f.imageType||'lifestyle',layout:f.layout||'split',mobileLayout:f.mobileLayout||'auto',overlayStrength:f.overlayStrength||'auto',badge:f.badge||'',imageFocus:f.imageFocus||'',mobileImageFocus:f.mobileImageFocus||'',textPlacement:f.textPlacement||'',mediaType:'image',announcementType:'general',actionType:'hash',actionTarget:f.ctaTarget||'#shop',ctaLabel:f.ctaLabel||'',showPrice:false,active:true}];
}
// V34: focal point → CSS object-position. Accepts the Admin presets
// ('center', 'top', 'bottom left', …) or an explicit "x% y%".
const FOCUS_WORDS={left:'0%',center:'50%',right:'100%',top:'0%',bottom:'100%'};
function focusToCss(v){
  const s=String(v||'').trim().toLowerCase();
  if(!s||s==='center') return '50% 50%';
  const m=s.match(/^(\d{1,3}(?:\.\d+)?)%\s+(\d{1,3}(?:\.\d+)?)%$/);
  if(m) return `${Math.min(100,+m[1])}% ${Math.min(100,+m[2])}%`;
  const w=s.split(/[\s-]+/); let x='50%',y='50%';
  w.forEach(t=>{ if(t==='left'||t==='right') x=FOCUS_WORDS[t]; else if(t==='top'||t==='bottom') y=FOCUS_WORDS[t]; });
  return `${x} ${y}`;
}
function heroShow(){
  if(!$('heroLabel'))return;
  const a=heroSlides();
  const s=a[heroIndex%a.length], h=sec('hero');
  // announcementType/targetType = explicit product/combo association (V32.3),
  // separate from actionType/actionTarget (a General slide's optional CTA).
  const isProductAnn = s.announcementType==='product';
  const p = isProductAnn && s.targetType!=='combo' && s.productId ? getProduct(s.productId) : null;
  const combo = isProductAnn && s.targetType==='combo' && s.comboId ? getCombo(s.comboId) : null;
  const linkBroken = isProductAnn && !p && !combo;
  $('heroLabel').textContent=s.label||'';
  $('heroTitle').innerHTML=`${escapeHtml(s.title||'')}${s.em?` <em>${escapeHtml(s.em)}</em>`:''}`;
  $('heroDesc').textContent=s.text||'';
  const priceEl=$('heroPrice')?.closest('.heroPrice');
  if(isProductAnn && !linkBroken && s.showPrice!==false){
    const pv=p?getVariant(p,variantKey(p.id)):null;
    $('heroPrice').textContent=money(pv?pv.price:combo?.price||0);
    if(priceEl) priceEl.style.display='';
  } else if(priceEl) priceEl.style.display='none';
  // Media: uploaded slide media (photography → cover) wins; otherwise the
  // linked product/combo pack, else the first bestseller pack (contained,
  // never cropped — packaging is always shown whole and unaltered).
  const heroImgEl=$('heroImg'), heroVideoEl=$('heroVideo'), box=$('heroImageBox');
  const stage=$('heroStage'), mSrc=$('heroMobileSrc');
  const isVideo=!!(s.image && s.mediaType==='video');
  const packMode=!isVideo && isPackshot(s.imageType,!s.image);
  if(stage){
    // V34.2 layout rules:
    //  • pack shots are ALWAYS split — text never sits on packaging;
    //  • phones use overlay only when the slide has its own phone image
    //    (artwork made for it) or Admin forces it; otherwise split, so a
    //    wide desktop photo is never squeezed under a headline.
    const L=(!packMode && s.layout==='overlay')?'overlay':'split';
    let ML=s.mobileLayout||'auto';
    if(packMode) ML='split';
    else if(ML==='auto') ML=(L==='overlay' && s.mobileImage)?'overlay':'split';
    stage.dataset.layout=L; stage.dataset.mlayout=ML;
    stage.dataset.text=['top','center','bottom','none'].includes(s.textPlacement)?s.textPlacement:'center';
    stage.dataset.overlay=['none','light','medium','strong'].includes(s.overlayStrength)?s.overlayStrength:'auto';
    stage.dataset.pack=packMode?'1':'0';
    stage.style.setProperty('--focus',focusToCss(s.imageFocus));
    stage.style.setProperty('--focus-m',focusToCss(s.mobileImageFocus||s.imageFocus));
    stage.style.removeProperty('--ratio-m'); stage.style.removeProperty('--ratio-d');
  }
  const badge=$('heroBadge'); if(badge){ badge.textContent=s.badge||''; badge.hidden=!s.badge; }
  if(s.image && s.mediaType==='video'){
    heroVideoEl.src=s.image; if(s.posterUrl) heroVideoEl.poster=s.posterUrl;
    heroVideoEl.style.display='block'; heroImgEl.style.display='none';
    heroVideoEl.play?.().catch(()=>{});
    box?.classList.remove('contain','fit-pack'); box?.classList.add('fit-life');
  } else {
    heroVideoEl.style.display='none'; heroImgEl.style.display='block';
    const fallbackImg=p?.image||combo?.image||firstRealImage(products.filter(x=>x.best))||firstRealImage(products)||'images/brand/placeholder.svg';
    const src=s.image||fallbackImg;
    // Photography fills the full-bleed stage; a pack shot is shown whole.
    const pack=packMode;
    const attrs=responsiveImgAttrs(src,'(max-width:767px) 100vw, 60vw');
    heroImgEl.src=attrs.src;
    if(attrs.srcset){ heroImgEl.srcset=attrs.srcset; heroImgEl.sizes=attrs.sizes; } else heroImgEl.removeAttribute('srcset');
    // Optional phone-specific artwork (4:5) via <picture><source media>.
    if(mSrc){
      if(s.image && s.mobileImage && !pack){ const m=responsiveImgAttrs(s.mobileImage,'100vw'); mSrc.srcset=m.srcset||m.src; if(m.srcset) mSrc.sizes='100vw'; else mSrc.removeAttribute('sizes'); }
      else { mSrc.removeAttribute('srcset'); mSrc.removeAttribute('sizes'); }
    }
    heroImgEl.alt=[s.title,s.em].filter(Boolean).join(' ')||'Jayvi Foods';
    heroImgEl.onerror=()=>{ heroImgEl.onerror=null; heroImgEl.removeAttribute('srcset'); mSrc?.removeAttribute('srcset'); heroImgEl.src='images/brand/placeholder.svg'; };
    // Split layout: the frame follows the photo's own shape (within limits)
    // instead of cropping it to a fixed composition.
    heroImgEl.onload=()=>setHeroRatio(heroImgEl);
    if(heroImgEl.complete && heroImgEl.naturalWidth) setHeroRatio(heroImgEl);
    box?.classList.toggle('contain',pack);
    box?.classList.toggle('fit-pack',pack); box?.classList.toggle('fit-life',!pack);
  }
  const btn=$('heroShop');
  if(btn){
    const arrow=' <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>';
    let action=null, label=s.ctaLabel||'';
    if(isProductAnn){
      if(!linkBroken){ label=label||(combo?'Shop combo':'Shop now'); action=()=>{ if(p) openProduct(p.id); else navigate('#combos'); }; }
    } else {
      const cta=s.actionType||'none';
      if(cta==='shop') action=()=>navigate('#shop');
      else if(cta==='reviews') action=()=>navigate('#reviews');
      else if((cta==='url'||cta==='hash') && s.actionTarget) action=()=>{ const t=s.actionTarget; if(t.startsWith('#')) navigate(t); else location.href=safeHref(t); };
      label=label||'Shop now';
    }
    if(action){ btn.style.display=''; btn.innerHTML=escapeHtml(label)+arrow; btn.onclick=action; } else btn.style.display='none';
  }
  const sec2=$('heroSecondary');
  if(sec2){
    const l=s.secondaryLabel||h.secondaryLabel, t=s.secondaryTarget||h.secondaryTarget;
    if(l&&t){ sec2.hidden=false; sec2.textContent=l; sec2.setAttribute('href',safeHref(t)); } else sec2.hidden=true;
  }
  const trust=$('heroTrust');
  if(trust && !trust.dataset.done){ trust.dataset.done='1'; trust.innerHTML=(h.trust||[]).map(x=>`<span><i class="fa-solid fa-check" aria-hidden="true"></i>${escapeHtml(x)}</span>`).join(''); }
  $('heroDots').innerHTML=a.length>1?a.map((_,i)=>`<button class="${i===heroIndex%a.length?'active':''}" aria-label="Show slide ${i+1}" onclick="heroIndex=${i};heroShow();restartHero()"></button>`).join(''):'';
  const g=document.querySelector('.heroGrid');
  if(g){ g.classList.remove('heroChange'); void g.offsetWidth; g.classList.add('heroChange'); }
  fitHeroTitle(); requestAnimationFrame(fitHeroTitle);
}
// Frame ratio for the split layout, from the image actually displayed
// (the phone image on phones). Phones: between 4:5 and 2:1. Computers:
// between 5:4 and 16:9. Inside those limits nothing is cropped at all.
function setHeroRatio(img){
  const st=$('heroStage'); if(!st||!img.naturalWidth||!img.naturalHeight) return;
  const r=img.naturalWidth/img.naturalHeight;
  st.style.setProperty('--ratio-m',String(Math.min(2,Math.max(0.8,r))));
  st.style.setProperty('--ratio-d',String(Math.min(16/9,Math.max(1.25,r))));
  requestAnimationFrame(fitHeroTitle); // the column width may have changed
}
// Headline auto-fit: long Admin headlines step down in size until the
// headline is at most 3 lines (never below 22px on phones / 30px on
// computers) — so it can't become oversized, push the button off screen
// or make the hero unnecessarily tall.
function fitHeroTitle(){
  const h=$('heroTitle'); if(!h) return;
  h.style.fontSize='';
  if($('heroStage')?.dataset.text==='none') return; // headline is visually hidden
  const mobile=window.matchMedia('(max-width:767px)').matches;
  const min=mobile?22:(window.innerWidth<1024?26:30), maxLines=3;
  let size=parseFloat(getComputedStyle(h).fontSize)||28;
  for(let guard=0; guard<30; guard++){
    const lh=parseFloat(getComputedStyle(h).lineHeight)||size*1.1;
    // layout height, not scrollHeight: italic glyphs overhang by a few px
    if(h.getBoundingClientRect().height <= lh*(maxLines+0.5) || size<=min) break;
    size-=1; h.style.fontSize=size+'px';
  }
}
let _heroFitT=null;
document.fonts?.ready?.then(()=>fitHeroTitle());
window.addEventListener('resize',()=>{ clearTimeout(_heroFitT); _heroFitT=setTimeout(fitHeroTitle,120); });
function restartHero(){clearInterval(heroTimer);startHero()}
function startHero(){
  const n=(CONFIG.announcements||[]).filter(x=>x.active).length;
  if(CONFIG.homepage.heroAutoplay&&n>1)heroTimer=setInterval(()=>{heroIndex=(heroIndex+1)%n;heroShow()},CONFIG.homepage.heroSeconds*1000);
}
// V34: lets CSS move the floating buttons out of the way of the hero CTA on phones.
function observeHeroVisibility(){
  const st=$('heroStage'); if(!st||!('IntersectionObserver' in window)) return;
  new IntersectionObserver(([e])=>document.body.classList.toggle('heroInView',e.intersectionRatio>0.35),{threshold:[0,0.35,0.6,1]}).observe(st);
}
function enableHeroSwipe(){
  const hero=document.querySelector('.hero');
  if(!hero)return;
  let sx=0;
  hero.addEventListener('touchstart',e=>{sx=e.touches[0].clientX},{passive:true});
  hero.addEventListener('touchend',e=>{
    const dx=e.changedTouches[0].clientX-sx;
    const n=(CONFIG.announcements||[]).filter(x=>x.active).length;
    if(n>1&&Math.abs(dx)>35){heroIndex=(heroIndex+(dx<0?1:-1)+n)%n;heroShow();restartHero()}
  },{passive:true});
}

/* ---------- V34.1: product ratings come from real approved reviews ----------
   Product-card / product-page stars and the Product JSON-LD aggregateRating
   are computed from approved website_reviews (product_id + rating). A
   product with no approved reviews shows no stars. If the reviews query
   itself fails (e.g. offline), the stored products.rating/review_count are
   left as they were rather than guessed. */
let _approvedRatingRows=null;
async function fetchApprovedRatings(){
  try{
    const {data,error}=await sb.from('website_reviews').select('product_id,rating').eq('status','approved').limit(5000);
    if(error) throw error;
    _approvedRatingRows=data||[];
  }catch(err){ _approvedRatingRows=null; console.warn('Could not load approved review ratings — keeping stored product ratings:', err?.message||err); }
}
function applyApprovedRatings(){
  if(!_approvedRatingRows) return;
  const agg={};
  _approvedRatingRows.forEach(r=>{ const k=r.product_id, v=Number(r.rating); if(!k||!(v>0)) return; (agg[k]=agg[k]||{t:0,n:0}); agg[k].t+=v; agg[k].n++; });
  (CONFIG.products||[]).forEach(p=>{ const a=agg[p.id]; p.rating=a?Math.round(a.t/a.n*10)/10:0; p.reviewCount=a?a.n:0; });
}

/* ---------- Coupons & Offers (Workstream 1) ---------- */
// Discovery list only (code, name, description, discount_type,
// discount_value, min_order_value) via the public.list_active_offers()
// RPC added in supabase_migration_coupon_checkout.sql — the coupons
// table itself stays admin-only (see that migration's own comments on
// why: a signed-in customer enumerating every code directly would be
// a minor information leak). Never hard-coded, per spec 1.2.
let activeOffers = [];
async function fetchActiveOffers(){
  try{
    const {data,error} = await sb.rpc('list_active_offers');
    if(error) throw error;
    activeOffers = data||[];
  }catch(err){
    console.warn('Could not load active offers — floating button/announcement/cart dropdown will simply show none until this succeeds:', err?.message||err);
    activeOffers = [];
  }
}
function loadCoupon(){try{return JSON.parse(localStorage.getItem('jayviCouponV1')||'null')}catch{return null}}
function saveCoupon(c){ if(c) localStorage.setItem('jayviCouponV1', JSON.stringify(c)); else localStorage.removeItem('jayviCouponV1'); }
let appliedCoupon = loadCoupon(); // {code,name,discountType,discountValue,minOrderValue,discountAmount} | null — the UI-side preview only; server re-validates authoritatively at place_order() time (see placeOrder()).

function offerLabel(o){ return o.discount_type==='percentage' ? `${o.discount_value}% OFF` : `${money(o.discount_value)} OFF`; }
// V34.1: exactly ONE promotion can occupy the floating button — the one
// chosen in Admin (promotions.floatingButton.promotionId). No selection, or
// the selected offer is off / out of date / not for this visitor → no
// floating button at all. Never "10% OFF +1", never an automatic pick.
function floatingPromotion(){
  const cfg=SITE.promotions||{};
  if(cfg.enabled===false) return null;
  const id=String(cfg.floatingButton?.promotionId||'').trim();
  if(!id) return null;
  const p=(cfg.items||[]).find(x=>x&&x.id===id);
  return promoLive(p)?p:null;
}
function renderFloatingOffer(){
  const btn=$('offerFloatBtn'); if(!btn)return;
  const p=floatingPromotion();
  if(!p){ btn.style.display='none'; return; }
  const fb=SITE.promotions.floatingButton||{};
  const label=fillOfferText(fb.label||promoHeadline(p));
  $('offerFloatLabel').textContent=label;
  btn.setAttribute('aria-label',`View offer: ${label}`);
  btn.style.display='flex';
}
// Live public coupons that no configured promotion already describes.
function uncoveredCoupons(promos){ const codes=new Set(promos.map(promoCode).filter(Boolean)); return activeOffers.filter(o=>!codes.has(String(o.code||'').toUpperCase())); }
// V32.12.1 (spec 2/3/17): "View all active offers" now shows every
// offer's LOCK STATE relative to the customer's current cart — not
// just a flat list — so the offer itself becomes a sales motivator
// ("Add ₹44 more to unlock") rather than only a validation mechanism.
// Deliberately uses the cart subtotal only (not the restriction-aware
// list_eligible_offers_for_cart() RPC) so this panel can render
// instantly from data already in memory; a coupon that's unlockable by
// subtotal but still product/category-restricted will correctly be
// rejected as a preview by applyCouponFromCart() below if selected,
// same as any other ineligible attempt.
function openOffersPanel(){
  const sub = cart.length ? cartTotals().sub : 0;
  const promos=promotionsConfigured()?(SITE.promotions.items||[]).filter(promoLive).sort((a,b)=>(Number(a.priority)||99)-(Number(b.priority)||99)):[];
  const coupons=promos.length?uncoveredCoupons(promos):activeOffers;
  const promoHtml=promos.map(p=>promoCardMarkup(p,cart.length?'cart':'panel')).join('');
  $('offersPanelList').innerHTML = (promoHtml||coupons.length)
    ? promoHtml + coupons.map(o=>{
        const min = o.min_order_value||0;
        const unlocked = !cart.length ? false : sub >= min;
        const remaining = money(Math.max(0, min - sub));
        return `<div class="offerCard ${cart.length ? (unlocked?'unlocked':'locked') : ''}">
          <b>${escapeHtml(o.code)} — ${offerLabel(o)}${unlocked?' unlocked!':''}</b>
          <p>${escapeHtml(o.description||o.name||'')}${min?` · Min order ${money(min)}`:''}</p>
          ${cart.length
            ? (unlocked
                ? `<button type="button" class="btn light small" onclick="applyCouponFromCart('${escapeHtml(o.code)}');closeOffersPanel();openCart()">Apply to my cart</button>`
                : `<span class="lockNote">🔒 Add ${remaining} more to unlock</span>`)
            : ''}
        </div>`;
      }).join('')
    : '<div class="empty smallEmpty">No active offers right now.</div>';
  if(promos.length || coupons.length) $('offersPanelList').insertAdjacentHTML('beforeend','<p class="tiny promoStackNote">One coupon code can be used per order.</p>');
  $('offersOverlay').classList.add('open'); document.body.classList.add('modalOpen');
}
function closeOffersPanel(){ $('offersOverlay').classList.remove('open'); document.body.classList.remove('modalOpen'); }
function renderOfferAnnouncement(){ renderAnnouncementBar(); } // V33: live offers are an optional feed into the Admin-configured announcement bar
// Cart "Apply coupon" — client calls validate_coupon() for immediate,
// responsive feedback (spec 1.5: "the customer UI can calculate/display
// the offer for responsiveness"), but this is only ever a PREVIEW.
// place_order() calls validate_coupon() itself again, server-side, at
// the moment the order is actually placed — that second call is the
// only one that is ever trusted to authorize a real discount.
//
// V32.12.1 fix: cartProductAndCategoryIds() below builds the same
// product-id/category-id pair validate_coupon() now checks against
// coupons.applicable_products/applicable_categories — passed into
// BOTH the "Apply coupon" preview call and the eligible-offers
// dropdown fetch, so a restricted coupon can never even be selected
// for a cart it doesn't apply to, let alone applied.
function cartProductAndCategoryIds(){
  const productIds = new Set(), categoryIds = new Set();
  const addProduct = p=>{ if(!p) return; productIds.add(p.id); if(p.category) categoryIds.add(p.category); (p.categories||[]).forEach(c=>categoryIds.add(c)); };
  cart.forEach(x=>{
    if(x.type==='combo'){
      const c=getCombo(x.comboId); if(!c) return;
      productIds.add(x.comboId);
      (c.items||[]).forEach(it=>addProduct(getProduct(it.productId)));
    } else {
      addProduct(getProduct(x.productId));
    }
  });
  return {productIds:[...productIds], categoryIds:[...categoryIds]};
}
async function applyCouponFromCart(code){
  if(!code)return;
  const t=cartTotals();
  const {productIds,categoryIds} = cartProductAndCategoryIds();
  const phone = currentProfile?.phone || null;
  const {data,error} = await sb.rpc('validate_coupon',{p_code:code,p_subtotal:t.sub,p_customer_phone:phone,p_product_ids:productIds,p_category_ids:categoryIds});
  const row = Array.isArray(data)?data[0]:data;
  if(error || !row || !row.valid){
    showToast(row?.reason || error?.message || 'This coupon could not be applied.');
    track('coupon_rejected',{coupon:String(code).toUpperCase(),reason:row?.reason||error?.message||''});
    return;
  }
  const meta = eligibleCartOffers.find(o=>o.code.toUpperCase()===code.toUpperCase()) || activeOffers.find(o=>o.code.toUpperCase()===code.toUpperCase());
  // V34: orders accept ONE coupon code (enforced by place_order()). Say so
  // rather than silently swapping one code for another.
  const replaced = appliedCoupon && appliedCoupon.code!==code.toUpperCase() ? appliedCoupon.code : '';
  appliedCoupon = {
    code: code.toUpperCase(), coupon_id: row.coupon_id,
    name: meta?.name||'', discountType: meta?.discount_type||null,
    // V32.12.1 fix (spec 4): minOrderValue is now stored on the applied
    // coupon itself so renderCart()/revalidateAppliedCoupon() below can
    // tell, on every subsequent render, whether the CURRENT subtotal
    // still qualifies — previously nothing about the coupon's own
    // minimum was kept after applying it, so a cart that dropped below
    // threshold after applying just kept showing the stale discount.
    minOrderValue: Number(meta?.min_order_value||0),
    discountAmount: Number(row.discount_amount)
  };
  saveCoupon(appliedCoupon);
  renderCart(); updateCheckoutSummary();
  showToast(replaced
    ? `${appliedCoupon.code} applied instead of ${replaced} — one coupon code per order. Discount ${money(appliedCoupon.discountAmount)}`
    : `Coupon applied: ${appliedCoupon.code} — Discount ${money(appliedCoupon.discountAmount)}`);
  track('coupon_applied',{coupon:appliedCoupon.code,value:appliedCoupon.discountAmount,currency:'INR'});
}
function removeAppliedCoupon(){
  appliedCoupon=null; saveCoupon(null);
  renderCart(); updateCheckoutSummary();
  showToast('Coupon removed');
}
// Recomputed on every cart render against the CURRENT subtotal (cart
// contents can change after a coupon was applied) — if the previously
// applied code no longer qualifies (subtotal dropped below its minimum,
// it expired, etc.) it's cleared here with the exact customer-facing
// wording required by spec 1.6, rather than silently kept stale.
function currentDiscount(sub){
  if(!appliedCoupon) return 0;
  if(appliedCoupon.discountAmount>sub){ return sub; }
  return appliedCoupon.discountAmount;
}
// V32.12.1 fix (spec 4 — "Coupon Must Automatically Become Invalid When
// Cart Changes"). Every renderCart() now calls this once (see
// renderCart() below). It re-runs the SAME server-side validate_coupon()
// used for the original "Apply coupon" preview, against the CURRENT
// subtotal and CURRENT cart contents (product/category ids), and if the
// coupon no longer qualifies for ANY reason — subtotal dropped below its
// minimum, a restricted product was removed, it expired, it was disabled
// by Admin, or its usage limit was reached by someone else in the
// meantime — it is cleared immediately with the exact wording spec 4
// requires, rather than silently staying applied with a stale discount.
// This is intentionally the single place this happens (not one bespoke
// check per scenario), per spec 16's "review these as a single
// stale-state consistency problem."
let _revalidatingCoupon = false;
async function revalidateAppliedCoupon(){
  if(!appliedCoupon || _revalidatingCoupon) return;
  _revalidatingCoupon = true;
  try{
    const t=cartTotals();
    const {productIds,categoryIds} = cartProductAndCategoryIds();
    const phone = currentProfile?.phone || null;
    const {data,error} = await sb.rpc('validate_coupon',{p_code:appliedCoupon.code,p_subtotal:t.sub,p_customer_phone:phone,p_product_ids:productIds,p_category_ids:categoryIds});
    const row = Array.isArray(data)?data[0]:data;
    if(error || !row || !row.valid){
      const wasCode = appliedCoupon.code;
      const min = appliedCoupon.minOrderValue||0;
      appliedCoupon=null; saveCoupon(null);
      const reason = row?.reason || '';
      const msg = /minimum order value/i.test(reason) || (min && t.sub<min)
        ? `${wasCode} was removed because your cart is now below ₹${min}.`
        : `${wasCode} was removed — it no longer applies to your cart.`;
      showToast(msg);
      renderCart(); updateCheckoutSummary();
    } else if(Number(row.discount_amount) !== appliedCoupon.discountAmount){
      // Discount can legitimately change (e.g. a percentage coupon
      // against a new subtotal) without becoming invalid — keep it in
      // sync so Subtotal/Discount/Delivery/Total/mobile bar/checkout
      // summary never show a stale number.
      appliedCoupon.discountAmount = Number(row.discount_amount);
      saveCoupon(appliedCoupon);
      renderCart(); updateCheckoutSummary();
    }
  }catch(err){
    console.warn('Could not revalidate applied coupon (leaving it as-is until the next render):', err?.message||err);
  }finally{
    _revalidatingCoupon = false;
  }
}
// V32.12.1 fix: the dropdown now shows only offers that are ELIGIBLE
// FOR THIS CART right now — restriction-aware (product/category) and
// min-order-aware — fetched from list_eligible_offers_for_cart(),
// never the unfiltered marketing list (activeOffers) that the floating
// button/announcement use. This is a network call, so it's fetched
// asynchronously and cached in eligibleCartOffers; couponSectionMarkup()
// itself stays a plain, synchronous renderer of whatever was last
// fetched, same pattern as every other cached-then-rendered list in
// this file (categories, mealTags, etc.).
let eligibleCartOffers = [];
async function refreshEligibleCartOffers(){
  if(!cart.length){ eligibleCartOffers=[]; return; }
  const t=cartTotals();
  const {productIds,categoryIds} = cartProductAndCategoryIds();
  try{
    const {data,error} = await sb.rpc('list_eligible_offers_for_cart',{p_product_ids:productIds,p_category_ids:categoryIds,p_subtotal:t.sub});
    if(error) throw error;
    eligibleCartOffers = data||[];
  }catch(err){
    console.warn('Could not refresh eligible cart offers:', err?.message||err);
    eligibleCartOffers = [];
  }
  const box=document.getElementById('cartCouponBox');
  if(box && cart.length && !appliedCoupon) box.innerHTML = couponSectionMarkup();
}
// V32.12.1 (spec 2 — "Show Available Offers Even When Cart Is Not
// Eligible"). When no offer currently qualifies, this no longer just
// falls through to a flat "No offers eligible" line — it finds the
// SINGLE closest-to-unlock marketing offer (smallest remaining amount)
// and shows it as a concrete nudge ("🎁 10% OFF available! Add ₹44 more
// to unlock this offer."), with a "View all active offers" action that
// opens the full locked/unlocked list (openOffersPanel(), above).
// Deliberately computed off activeOffers (the marketing list) rather
// than the restriction-aware eligibleCartOffers, since the entire point
// here is offers the cart does NOT yet qualify for by subtotal — this
// is a nudge, not a guarantee of applicability; the actual "Apply"
// action always re-validates server-side regardless (applyCouponFromCart()).
function nearestLockedOffer(sub){
  const locked = activeOffers.filter(o=>(o.min_order_value||0) > sub);
  if(!locked.length) return null;
  return locked.sort((a,b)=>(a.min_order_value-sub)-(b.min_order_value-sub))[0];
}
function couponSectionMarkup(){
  const t=cartTotals();
  if(appliedCoupon){
    const stack=`<small class="couponStackNote">One coupon code can be used per order.</small>`;
    return `<div class="couponSection"><div class="couponApplied"><b>Coupon applied: ${escapeHtml(appliedCoupon.code)} · Discount ${money(currentDiscount(t.sub))}</b><button onclick="removeAppliedCoupon()">Remove coupon</button></div>${stack}</div>`;
  }
  const eligible = eligibleCartOffers;
  let nudge = '';
  if(!eligible.length){
    const near = nearestLockedOffer(t.sub);
    if(near){
      const remaining = money(Math.max(0,(near.min_order_value||0)-t.sub));
      nudge = `<div class="offerNudge">🎁 ${offerLabel(near)} available!<br>Add ${remaining} more to unlock this offer. <button type="button" class="linkBtn" onclick="openOffersPanel()">View all active offers</button></div>`;
    }
  }
  const wc=welcomeState().code;
  const coveredByPromo=promotionsConfigured() && livePromotions('cart').some(p=>p.codeVisibility==='signup');
  const welcomeHint=wc&&!coveredByPromo?`<div class="welcomeCodeHint"><span>Your welcome code <b>${escapeHtml(wc)}</b></span><button type="button" onclick="applyCouponFromCart('${escapeHtml(wc)}')">Apply</button></div>`:'';
  // V34: configured cart promotions as compact cards (code ones get Apply).
  const cartPromos=promotionsConfigured()?livePromotions('cart'):[];
  const promoList=cartPromos.length?`<div class="cartPromos">${cartPromos.map(p=>{
      const min=Number(p.minOrderValue)||0, locked=min>t.sub;
      const note=locked?`Add ${money(min-t.sub)} more to unlock`:(p.description?fillOfferText(p.description):'');
      return `<div class="cartPromo${locked?' locked':''}"><div><b>${escapeHtml(fillOfferText(p.title||promoHeadline(p)))}</b>${note?`<small>${escapeHtml(note)}</small>`:''}</div>${locked?'':promoActionMarkup(p,'cart')}</div>`;
    }).join('')}</div>`:'';
  const codeEntry=`<div class="codeEntry"><input id="couponCodeInput" placeholder="Have a code? Enter it here" maxlength="30" aria-label="Coupon code" onkeydown="if(event.key==='Enter'){event.preventDefault();applyTypedCoupon()}"><button type="button" onclick="applyTypedCoupon()">Apply</button></div>`;
  return `<div class="couponSection">${welcomeHint}${promoList}${nudge}<label><b>Apply coupon</b>
    <select id="couponSelect" onchange="this.value&&applyCouponFromCart(this.value)">
      <option value="">${eligible.length?'Select an offer…':(activeOffers.length?'No offers eligible for the items in your cart':'No offers available right now')}</option>
      ${eligible.map(o=>`<option value="${escapeHtml(o.code)}">${escapeHtml(o.code)} – ${offerLabel(o)}</option>`).join('')}
    </select></label>${codeEntry}${activeOffers.length?`<button type="button" class="linkBtn offersLink" onclick="openOffersPanel()">View all active offers</button>`:''}</div>`;
}

/* ---------- Cart ---------- */
function loadCart(){try{return JSON.parse(localStorage.getItem('jayviCartV14')||'[]')}catch{return []}}
function saveCart(){localStorage.setItem('jayviCartV14',JSON.stringify(cart))}
function cartItemDetails(x){
  if(x.type==='combo'){const c=getCombo(x.comboId);return c?{name:c.name,price:c.price,mrp:c.mrp,image:c.image,label:'Combo'}:{name:'Unavailable combo',price:0,mrp:0,image:'',label:''}}
  const p=getProduct(x.productId),v=p?getVariant(p,x.variantId):null;
  return p&&v?{name:p.name,price:v.price,mrp:v.mrp,image:p.image,label:v.label}:{name:'Unavailable product',price:0,mrp:0,image:'',label:''};
}
// V32.6 (item 6 defense-in-depth, re-verified in this release): each
// render function is isolated so a bug/exception in any one of them
// can never again silently prevent the others from running — this is
// what let a renderMeal() crash block renderCombos() before the real
// fix (see renderMeal() above). Not a combo-specific workaround: every
// section gets identical protection, and errors are still visible in
// the console for debugging rather than being swallowed silently.
// renderCombos() is also intentionally ordered right after renderBest
// here (not last) as a second, independent layer of defense — even if
// a future bug appeared in renderProducts()/renderMeal(), the combo
// card would already be updated before either of them ever runs.
function refreshProductViews(){
  [renderBest,renderCombos,renderProducts,renderMeal,renderOccasionCards].forEach(fn=>{
    try{ fn(); }catch(err){ console.error(`${fn.name} failed to render:`, err); }
  });
}
// Optional third arg lets a BULK caller (addSelectedMealPicks below)
// reuse this exact function — same key format, same increment logic —
// without triggering a UI refresh/toast per item; every existing call
// site passes no third argument, so this is 100% unchanged for them.
function addToCart(pid,vid,opts){
  const p=getProduct(pid),v=getVariant(p,vid); if(!p||!v)return;
  const key='product:'+pid+':'+v.id, x=cart.find(i=>i.key===key);
  if(x)x.qty++; else cart.push({key,type:'product',productId:pid,variantId:v.id,qty:1});
  saveCart();
  track('add_to_cart',{currency:'INR',value:v.price,items:[gaItem(p,v,1)]});
  if(opts?.silent) return; // caller refreshes the UI once, itself, after the whole batch
  renderCart();refreshProductViews();refreshOpenProductDetail(pid);
  // Item S (approved spec): Add to Cart must NOT open the cart drawer —
  // customers adding several items shouldn't be bounced to the cart
  // after each one. Confirmation toast with an explicit "View cart"
  // action instead; only that action (or the cart icon) opens it.
  showCartAddedToast(p.name);
}
function changeProductQty(pid,vid,d){
  const key='product:'+pid+':'+vid; let x=cart.find(i=>i.key===key);
  if(!x&&d>0){const p=getProduct(pid),v=getVariant(p,vid);if(!p||!v)return;cart.push({key,type:'product',productId:pid,variantId:v.id,qty:1})}
  else if(!x){return}
  else{x.qty+=d; if(x.qty<1)cart=cart.filter(i=>i.key!==key)}
  saveCart();renderCart();refreshProductViews();refreshOpenProductDetail(pid);
}
function buyNow(pid,vid){
  const p=getProduct(pid),v=getVariant(p,vid); if(!p||!v)return;
  const key='product:'+pid+':'+v.id, x=cart.find(i=>i.key===key);
  if(x)x.qty++; else cart.push({key,type:'product',productId:pid,variantId:v.id,qty:1});
  track('add_to_cart',{currency:'INR',value:v.price,items:[gaItem(p,v,1)]});
  saveCart();renderCart();refreshProductViews();openCheckout();
}
function changeQty(key,d){
  const x=cart.find(i=>i.key===key); if(!x)return;
  if(d<0){ const det=cartItemDetails(x); track('remove_from_cart',{currency:'INR',value:det.price,items:[{item_id:x.productId||('combo:'+x.comboId),item_name:det.name,price:det.price,quantity:1}]}); }
  x.qty+=d; if(x.qty<1)cart=cart.filter(i=>i!==x);
  saveCart();renderCart();refreshProductViews();
  if(x.type==='product') refreshOpenProductDetail(x.productId);
}
function removeCart(key){
  const x=cart.find(i=>i.key===key);
  if(x){ const d=cartItemDetails(x); track('remove_from_cart',{currency:'INR',value:d.price*x.qty,items:[{item_id:x.productId||('combo:'+x.comboId),item_name:d.name,price:d.price,quantity:x.qty}]}); }
  cart=cart.filter(i=>i.key!==key);saveCart();renderCart();refreshProductViews();showToast('Removed from cart');
  if(x?.type==='product') refreshOpenProductDetail(x.productId);
}
function cartTotals(){
  let sub=cart.reduce((s,x)=>{const d=cartItemDetails(x);return s+d.price*x.qty},0);
  const th=CONFIG.store.freeShippingThreshold, ship=sub===0?0:sub>=th?0:CONFIG.store.shippingFlat;
  return {sub,ship,total:sub+ship,remaining:Math.max(0,th-sub)};
}
function renderCart(){
  if(!$('cartItems'))return;
  if(cart.length===0 && appliedCoupon){ appliedCoupon=null; saveCoupon(null); } // an emptied cart clears any applied coupon — nothing to discount
  const count=cart.reduce((s,x)=>s+x.qty,0);
  $('cartCount').textContent=count;
  const t=cartTotals();
  const discount=currentDiscount(t.sub);
  $('cartSubtotal').textContent=money(t.sub);
  $('cartTotal').textContent=money(Math.max(0,t.total-discount));
  $('cartShipping').innerHTML=t.sub===0?'':t.ship===0?'<span class="free">FREE DELIVERY</span>':`Delivery ${money(t.ship)}`;
  $('cartHint').textContent=''; // V33: replaced by the free-shipping progress bar
  renderShipProgress(t);
  const foot=document.querySelector('.cartFoot');
  if(foot){
    let discLine = document.getElementById('cartDiscountLine');
    if(discount>0){
      if(!discLine){ discLine=document.createElement('div'); discLine.id='cartDiscountLine'; discLine.className='line discount'; foot.insertBefore(discLine, foot.querySelector('.line.total')); }
      discLine.innerHTML=`<span>Discount</span><b>−${money(discount)}</b>`;
    } else if(discLine){ discLine.remove(); }
    let couponBox=document.getElementById('cartCouponBox');
    if(!couponBox){ couponBox=document.createElement('div'); couponBox.id='cartCouponBox'; foot.insertBefore(couponBox, foot.firstChild); }
    couponBox.innerHTML = cart.length ? couponSectionMarkup() : '';
    if(cart.length){
      refreshEligibleCartOffers(); // async — re-renders just #cartCouponBox when it resolves (see refreshEligibleCartOffers)
      revalidateAppliedCoupon(); // async — clears a now-ineligible applied coupon with the required message (spec 4)
    }
  }
  $('cartItems').innerHTML=cart.length?cart.map(x=>{
    const d=cartItemDetails(x);
    const a=responsiveImgAttrs(d.image,'64px');
    return `<div class="cartItem"><img src="${a.src}"${a.srcset?` srcset="${a.srcset}" sizes="${a.sizes}"`:''} loading="lazy" decoding="async" alt=""><div><b>${escapeHtml(d.name)}</b><small>${escapeHtml(d.label)} · ${money(d.price)}</small>
      <div class="qty"><button onclick="changeQty('${x.key}',-1)">−</button><span>${x.qty}</span><button onclick="changeQty('${x.key}',1)">+</button><button onclick="removeCart('${x.key}')">Remove</button></div></div></div>`;
  }).join(''):`<div class="emptyCart"><i class="fa-solid fa-bag-shopping"></i><h3>Your bag is empty</h3><p>Add a Jayvi favourite to get started.</p></div>`;
  const recsBox = $('cartRecs'); if(recsBox) recsBox.innerHTML = cart.length ? cartRecsMarkup() : '';
  updateMobileCartBar(count,Math.max(0,t.total-discount));
  updateBottomNavBadge(count);
}
// V32.12.1 (spec 3 — "Encourage Customers to Increase Cart Value").
// Deliberately simple, deterministic logic per spec ("do not build an
// AI recommendation engine"): rank every sellable product NOT already
// in the cart by how many of its categories/meal-tags overlap with
// what's already in the cart (complementary/same-category first),
// then fall back to bestsellers to fill up to 3 — never random, never
// a network call, so it's instant and works fully offline/from the
// in-memory catalogue like everything else in this section.
function cartRecommendations(){
  // Deterministic, instant (no network): Admin-set "Goes great with"
  // relationships of cart items first, then shared category/meal tags,
  // bestseller as a tie-breaker, and — per V33 — cheaper items first on a
  // tie, so the nudge is an easy add-on rather than a second big purchase.
  if(!cart.length) return [];
  const inCart = new Set(), related = new Set();
  const cartCategories = new Set(), cartMealTags = new Set();
  const note = p=>{ if(!p) return; inCart.add(p.id); if(p.category)cartCategories.add(p.category); (p.mealTags||[]).forEach(m=>cartMealTags.add(m)); (p.relatedProducts||[]).forEach(r=>related.add(r)); };
  cart.forEach(x=>{
    if(x.type==='combo'){ const c=getCombo(x.comboId); (c?.items||[]).forEach(it=>note(getProduct(it.productId))); }
    else note(getProduct(x.productId));
  });
  const price = p=>getVariant(p,variantKey(p.id))?.price||0;
  const score = p=>{
    let s=0;
    if(related.has(p.id)) s+=4;
    if(p.category && cartCategories.has(p.category)) s+=2;
    s += (p.mealTags||[]).filter(m=>cartMealTags.has(m)).length;
    if(p.best) s+=1;
    return s;
  };
  return products.filter(p=>!inCart.has(p.id)&&!isProductSoldOut(p))
    .map(p=>({p,s:score(p),pr:price(p)})).sort((a,b)=>b.s-a.s||a.pr-b.pr).slice(0,3).map(x=>x.p);
}
function cartRecsMarkup(){
  const recs = cartRecommendations();
  if(!recs.length) return '';
  return `<div class="cartRecsInner"><b class="cartRecsTitle">You may also like</b><div class="cartRecsRow">${recs.map(p=>{
    const v=getVariant(p,variantKey(p.id)); if(!v) return '';
    const a=responsiveImgAttrs(p.image,'56px');
    return `<div class="cartRecCard"><img src="${a.src}" loading="lazy" decoding="async" alt=""><div><b>${escapeHtml(p.name)}</b><small>${money(v.price)}</small></div><button type="button" onclick="addToCart('${p.id}','${v.id}')" aria-label="Add ${escapeHtml(p.name)} to cart"><i class="fa-solid fa-plus"></i></button></div>`;
  }).join('')}</div></div>`;
}
function openCart(){$('cartOverlay').classList.add('open');document.body.classList.add('modalOpen');renderCart()}
function closeCart(){$('cartOverlay').classList.remove('open');document.body.classList.remove('modalOpen')}

/* ---------- Mobile bottom bar / nav badges ---------- */
function updateMobileCartBar(count,total){
  const bar=$('mobileCartBar'); if(!bar)return;
  bar.classList.toggle('hasItems',count>0);
  $('mobileCartCount').textContent=count;
  $('mobileCartTotal').textContent=money(total);
}
function updateBottomNavBadge(count){
  const b=$('bottomNavCartBadge'); if(!b)return;
  b.textContent=count; b.style.display=count>0?'grid':'none';
}

/* ---------- Search ---------- */
function openSearch(){$('searchOverlay').classList.add('open');document.body.classList.add('modalOpen');renderSearch();setTimeout(()=>$('searchBox').focus(),80)}
function closeSearch(){$('searchOverlay').classList.remove('open');document.body.classList.remove('modalOpen')}
let _searchTrackTimer=null;
function searchResultItem(p){
  const v=getVariant(p,variantKey(p.id));
  return `<button class="srItem" onclick="closeSearch();openProduct('${p.id}')">${imgTag(p.image,'52px','')}<span><b>${escapeHtml(p.name)}</b><small>${escapeHtml(catName(p.category))}${v?.label?' · '+escapeHtml(v.label):''}</small></span><strong>${v?money(v.price):''}</strong></button>`;
}
function renderSearch(){
  const raw=$('searchBox').value.trim(), q=raw.toLowerCase();
  const box=$('searchResults');
  if(!q){
    // Suggestion chips derived from the live catalogue (category + product names).
    const words=[...new Set([...categories.map(c=>c.name.split(' ')[0]),...products.map(p=>p.name.split(' ')[0])].map(w=>w.toLowerCase()).filter(w=>w.length>2))].slice(0,10);
    const top=products.filter(p=>p.best).slice(0,4);
    box.innerHTML=(words.length?`<div class="searchChips">${words.map(w=>`<button type="button" onclick="$('searchBox').value='${escapeHtml(w)}';renderSearch()">${escapeHtml(w)}</button>`).join('')}</div>`:'')
      +(top.length?`<div class="eyebrow" style="margin:6px 0 4px">Popular right now</div>${top.map(searchResultItem).join('')}`:'');
    return;
  }
  // Name matches first, then category/meal-tag/synonym matches.
  const list=products.filter(p=>matchesSearch(p,q)).sort((a,b)=>(expandSearchQuery(q).some(t=>b.name.toLowerCase().includes(t))?1:0)-(expandSearchQuery(q).some(t=>a.name.toLowerCase().includes(t))?1:0));
  const combos=(CONFIG.combos||[]).filter(c=>c.active&&(`${c.name} ${c.short||''}`.toLowerCase().includes(q)||(c.items||[]).some(i=>matchesSearch(getProduct(i.productId),q))));
  box.innerHTML=list.map(searchResultItem).join('')
    +combos.map(c=>`<button class="srItem" onclick="closeSearch();navigate('#combos')">${imgTag(c.image,'52px','')}<span><b>${escapeHtml(c.name)}</b><small>Combo</small></span><strong>${money(c.price)}</strong></button>`).join('')
    ||'<div class="empty">No products found. Try "chutney", "rice" or "snacks".</div>';
  clearTimeout(_searchTrackTimer);
  _searchTrackTimer=setTimeout(()=>track('search',{search_term:raw,results:list.length+combos.length}),900);
}

/* ---------- Customers / auth ---------- */
/* ---------- Supabase client + auth (customers, addresses, session) ---------- */
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
let currentUser = null;   // { id, email/phone } from supabase auth
let currentProfile = null; // row from public.profiles

function phoneToAuthEmail(phone){ return phone + '@' + EMAIL_MAP_DOMAIN; }

async function getSessionUser(){
  const {data} = await sb.auth.getSession();
  return data?.session?.user || null;
}
async function refreshProfile(){
  if(!currentUser){ currentProfile = null; return null; }
  const {data, error} = await sb.from('profiles').select('*').eq('id', currentUser.id).single();
  if(error){ currentProfile = null; return null; }
  currentProfile = data;
  return data;
}
function openAccount(){
  $('accountOverlay').classList.add('open');document.body.classList.add('modalOpen');
  if(currentUser) renderAccountView(); else $('accountContent').innerHTML = authView('login');
}
function openTrackOrder(){
  $('accountOverlay').classList.add('open');document.body.classList.add('modalOpen');
  trackOrderPrompt();
}
function closeAccount(){$('accountOverlay').classList.remove('open');document.body.classList.remove('modalOpen')}
function openAuth(m){$('accountContent').innerHTML=authView(m)}
function authView(mode){
  // Login accepts mobile number OR email (customers use phone, Admin
  // uses email) — registration stays phone-only, customers don't
  // register with email. The HTML pattern attribute previously forced
  // 10-digit-numeric on this same shared field for both modes, which
  // is what silently blocked an email address from even being typed.
  const idField = mode==='login'
    ? `<label>Mobile number or email *<input id="authId" required placeholder="10-digit mobile number or email"></label>`
    : `<label>Mobile number *<input id="authId" inputmode="numeric" maxlength="10" pattern="[0-9]{10}" required placeholder="10-digit mobile number"></label>`;
  return `<div class="eyebrow">MY JAYVI</div><h2>${mode==='login'?'Welcome back.':'Create your Jayvi account.'}</h2>
  <p class="muted">${mode==='login'?'Use your mobile number or email, and password.':'Your mobile number is your Jayvi user ID.'}</p>
  <form onsubmit="${mode==='login'?'loginSubmit(event)':'registerSubmit(event)'}">
    ${mode==='register'?'<label>Name *<input id="authName" required></label>':''}
    ${idField}
    <label>Password *<input id="authPass" type="password" minlength="6" required></label>
    ${mode==='register'?'<label>Confirm password *<input id="authPass2" type="password" minlength="6" required></label>':''}
    <button class="btn gold full">${mode==='login'?'Sign in':'Create account'} →</button>
  </form>
  <div id="authError" class="tiny" style="color:var(--danger)"></div>
  <div class="authSwitch">${mode==='login'?`New here? <button onclick="openAuth('register')">Create account</button>`:`Already have an account? <button onclick="openAuth('login')">Sign in</button>`}</div>
  ${mode==='login'?'<button class="textBtn" onclick="openForgotPassword()">Forgot password?</button>':''}
  <div class="guestNote">You can always <button onclick="closeAccount();openCheckout()">continue as guest</button> without creating an account. Already placed an order? <button onclick="trackOrderPrompt()">Track it here</button>.</div>`;
}
function openForgotPassword(){
  $('accountContent').innerHTML = `<div class="eyebrow">FORGOT PASSWORD</div><h2>Let's find your account.</h2>
    <p class="muted">Enter the mobile number your account is registered with.</p>
    <label>Mobile number *<input id="fpPhone" inputmode="numeric" maxlength="10" pattern="[0-9]{10}" required placeholder="10-digit mobile number"></label>
    <button class="btn gold full" onclick="checkForgotPasswordPhone()">Continue →</button>
    <div class="authSwitch"><button onclick="openAuth('login')">← Back to sign in</button></div>`;
}
async function checkForgotPasswordPhone(){
  const phone = $('fpPhone').value.trim();
  if(!/^\d{10}$/.test(phone)){ showToast('Enter a valid 10-digit mobile number'); return; }
  const {data:exists} = await sb.rpc('check_phone_registered', {p_phone:phone});
  if(!exists){
    $('accountContent').innerHTML = `<div class="eyebrow">FORGOT PASSWORD</div><h2>No account found.</h2>
      <p class="muted">We couldn't find a Jayvi account with that mobile number.</p>
      <button class="btn gold full" onclick="openAuth('register')">Create an account instead →</button>
      <div class="authSwitch"><button onclick="openAuth('login')">← Back to sign in</button></div>`;
    return;
  }
  // Phase 1 (R2/R3): no automated OTP/email verification yet — identity
  // is confirmed by Jayvi's team via WhatsApp, then Admin resets the
  // password. Architecture leaves room to swap this for self-service
  // OTP/email later without changing the account system itself.
  const waMsg = encodeURIComponent(`Hello Jayvi Foods, I need help resetting the password for my account registered with ${phone}.`);
  $('accountContent').innerHTML = `<div class="eyebrow">FORGOT PASSWORD</div><h2>We found your account.</h2>
    <p class="muted">We can't automatically verify your identity yet. Please contact Jayvi Foods to reset your password.</p>
    <a class="btn gold full" href="https://wa.me/${CONFIG.store.whatsapp}?text=${waMsg}" target="_blank">WhatsApp Jayvi Foods →</a>
    <button class="btn light full" style="margin-top:10px" onclick="closeAccount();openCheckout()">Continue as guest</button>
    <div class="authSwitch"><button onclick="openAuth('login')">← Back to sign in</button></div>`;
}
function authErr(msg){ const el=$('authError'); if(el) el.textContent=msg; else showToast(msg); }

async function registerSubmit(e){
  e.preventDefault();
  const name=$('authName').value.trim(), phone=$('authId').value.trim(), p=$('authPass').value, p2=$('authPass2').value;
  if(!/^\d{10}$/.test(phone)){authErr('Enter a valid 10-digit mobile number');return}
  if(p!==p2){authErr('Passwords do not match');return}

  let signUpResult;
  if(AUTH_MODE==='phone'){
    signUpResult = await sb.auth.signUp({ phone, password:p, options:{ data:{ name, phone } } });
  }else{
    signUpResult = await sb.auth.signUp({ email:phoneToAuthEmail(phone), password:p, options:{ data:{ name, phone } } });
  }
  const {data, error} = signUpResult;
  if(error){
    if(/already|exists|registered/i.test(error.message)){
      // R1: existing account — offer Log in / Forgot password rather
      // than just an error with no way forward.
      $('accountContent').innerHTML = `<div class="eyebrow">MY JAYVI</div><h2>Account already exists.</h2>
        <p class="muted">An account already exists with this mobile number.</p>
        <button class="btn gold full" onclick="openAuth('login')">Log in →</button>
        <button class="btn light full" style="margin-top:10px" onclick="openForgotPassword()">Forgot password?</button>`;
    } else {
      authErr(error.message);
    }
    return;
  }
  currentUser = data.user;
  // Some Supabase configs require confirmation before a session exists yet.
  if(!data.session){
    const {data:signInData, error:signInErr} = AUTH_MODE==='phone'
      ? await sb.auth.signInWithPassword({ phone, password:p })
      : await sb.auth.signInWithPassword({ email:phoneToAuthEmail(phone), password:p });
    if(signInErr){ authErr('Account created — please sign in.'); openAuth('login'); return; }
    currentUser = signInData.user;
  }
  await refreshProfile();
  // Associate any existing guest orders placed with the same phone number.
  try{ await sb.rpc('link_guest_orders_to_me'); }catch{}
  showToast('Account created');
  renderAccountView();
}
async function loginSubmit(e){
  e.preventDefault();
  const identifier=$('authId').value.trim(), p=$('authPass').value;
  // Routing only — decides which Supabase Auth call to make, grants
  // nothing by itself. Actual access is decided after real
  // authentication succeeds, by reading profiles.role from the
  // database (see below) — never by which format was typed.
  const looksLikeEmail = identifier.includes('@');
  let result;
  if(looksLikeEmail){
    // Admin's account (or any other real-email account) — sign in
    // directly with the typed email. No phone-mapping applied.
    result = await sb.auth.signInWithPassword({ email: identifier, password:p });
  } else {
    if(!/^\d{10}$/.test(identifier)){
      authErr('Enter a valid 10-digit mobile number or email address');
      return;
    }
    result = AUTH_MODE==='phone'
      ? await sb.auth.signInWithPassword({ phone: identifier, password:p })
      : await sb.auth.signInWithPassword({ email: phoneToAuthEmail(identifier), password:p });
  }
  const {data, error} = result;
  if(error){
    // R6: incorrect password (or unknown identifier) — always offer
    // the recovery path right where the error appears, not just an error.
    $('authError').innerHTML = `Mobile number/email or password is incorrect. <button class="textBtn" onclick="openForgotPassword()" style="display:inline">Forgot password?</button>`;
    return;
  }
  currentUser = data.user;
  // Role comes from profiles.role, read fresh from Supabase for this
  // specific authenticated user's own id — never inferred from
  // whether they typed an email or a phone number. A customer typing
  // an arbitrary email cannot gain admin access this way: without the
  // correct password for a real admin account, auth itself fails
  // above; and even if someone's profile row were somehow inspected,
  // it can't say role='admin' unless an actual admin set it that way
  // (enforced by the prevent_privilege_escalation trigger — see
  // supabase_schema_phase1_v3.sql). Every real admin data query in
  // admin.js is separately gated by RLS checking public.is_admin() at
  // the database level regardless of what this redirect does, so this
  // check is a UX convenience, not the actual security boundary.
  await refreshProfile();
  showToast('Signed in');
  // Item J / this fix: any successful login where the account is
  // actually flagged admin goes straight to the Admin panel — no
  // separate admin-login page, no public "Admin login" link, and this
  // no longer depends on how the visit arrived (?returnTo=admin).
  if(currentProfile?.role==='admin'){
    location.href='admin.html';
    return;
  }
  renderAccountView();
}
async function signOut(){
  await sb.auth.signOut();
  currentUser = null; currentProfile = null;
  openAuth('login');
}

async function renderAccountView(activeTab='orders'){
  if(!currentUser){ $('accountContent').innerHTML = authView('login'); return; }
  if(!currentProfile) await refreshProfile();
  const isAdmin = currentProfile?.role === 'admin';
  $('accountContent').innerHTML = `<div class="eyebrow">MY JAYVI</div><h2>Welcome, ${escapeHtml((currentProfile?.name||'Customer').split(' ')[0])}.</h2>
    <p class="muted">${escapeHtml(currentProfile?.phone||'')}</p>
    ${isAdmin?`<div class="notice" style="background:var(--olive-soft);border-radius:var(--radius-md);padding:12px 14px;margin:10px 0;font-size:12.5px">You're signed in with an Admin account. This shows only orders placed directly by this account — for the full order list and order management, use <a href="admin.html" style="font-weight:700;color:var(--brand-dark)">the Admin panel</a>.</div>`:''}
    <div class="accountTabs">
      <button class="${activeTab==='orders'?'active':''}" onclick="renderAccountView('orders')">Orders</button>
      <button class="${activeTab==='addresses'?'active':''}" onclick="renderAccountView('addresses')">Addresses</button>
      <button class="${activeTab==='security'?'active':''}" onclick="renderAccountView('security')">Security</button>
      <button onclick="trackOrderPrompt()">Track order</button>
      <button onclick="signOut()">Sign out</button>
    </div>
    <div id="accountTabBody">Loading…</div>`;
  if(activeTab==='addresses') renderAddressTab();
  else if(activeTab==='security') renderSecurityTab();
  else renderOrdersTab();
}
// V32.8 (item 3): the piece that was actually missing end-to-end — a
// customer-facing way to SET THEIR OWN password, whether that's
// because Admin just gave them a temporary one via "Reset password",
// or they simply want to change it. This is a genuine gap fix, not a
// login-architecture change: it calls Supabase's own self-service
// sb.auth.updateUser() for the CURRENTLY signed-in user, which is a
// completely different, unprivileged code path from Admin's
// admin-reset-password Edge Function (that one needs the service_role
// key to change ANOTHER user's password; this one only ever touches
// the caller's own session and needs no special privilege at all).
// Phone-based login identity, registration behavior, and Admin's own
// email login are untouched by this addition.
async function renderSecurityTab(){
  const body = $('accountTabBody'); if(!body) return;
  body.innerHTML = `<p class="muted" style="margin-bottom:12px">Set a new password for your account. If Jayvi Foods support just reset your password for you, use this to replace it with one only you know.</p>
    <form onsubmit="submitPasswordChange(event)">
      <label>New password *<input id="secNewPass" type="password" minlength="6" required placeholder="At least 6 characters"></label>
      <label>Confirm new password *<input id="secNewPass2" type="password" minlength="6" required></label>
      <button class="btn gold full" type="submit">Update password →</button>
    </form>
    <div id="secMsg" class="tiny" style="margin-top:10px"></div>`;
}
async function submitPasswordChange(e){
  e.preventDefault();
  const p1 = $('secNewPass').value, p2 = $('secNewPass2').value;
  const msg = $('secMsg');
  if(p1.length < 6){ msg.style.color='var(--danger)'; msg.textContent='Password must be at least 6 characters.'; return; }
  if(p1 !== p2){ msg.style.color='var(--danger)'; msg.textContent='Passwords do not match.'; return; }
  const {error} = await sb.auth.updateUser({ password: p1 });
  if(error){
    // Root-cause message, not a generic failure — e.g. Supabase enforces
    // "new password must be different from the old password" server-side,
    // which otherwise looks like a silent no-op to the customer.
    msg.style.color='var(--danger)';
    msg.textContent = 'Could not update password: ' + error.message;
    return;
  }
  msg.style.color='var(--success)';
  msg.textContent = 'Password updated. Use it next time you sign in.';
  $('secNewPass').value=''; $('secNewPass2').value='';
  showToast('Password updated');
}
async function renderOrdersTab(){
  const body = $('accountTabBody'); if(!body) return;
  // Explicitly scoped to this signed-in user's own id — never relies on
  // RLS alone to narrow the result. RLS legitimately allows an admin
  // session to read every order (correct, at the database level); this
  // explicit filter keeps the storefront's "My Orders" UI showing only
  // this account's own orders regardless of what role is signed in, so
  // an admin session never has the full order list surfaced through the
  // customer-facing account view.
  const {data, error} = await sb.from('orders')
    .select('order_number,status,total,created_at')
    .eq('customer_id', currentUser.id)
    .order('created_at',{ascending:false});
  if(error){ body.innerHTML = `<div class="empty">Could not load orders: ${escapeHtml(error.message)}</div>`; return; }
  body.innerHTML = `<div class="orders">${(data||[]).length ? data.map(o=>
    `<button class="order" type="button" onclick="trackKnownOrder('${escapeHtml(o.order_number)}','${escapeHtml(currentProfile?.phone||'')}')"><b>${escapeHtml(o.order_number)}</b><span>${new Date(o.created_at).toLocaleDateString('en-IN')}</span><strong>${money(o.total)}</strong><small>${escapeHtml(o.status)}</small></button>`
  ).join('') : '<div class="empty">No orders yet.</div>'}</div>`;
}
async function renderAddressTab(){
  const body = $('accountTabBody'); if(!body) return;
  // Same explicit-scoping principle as renderOrdersTab() above.
  const {data, error} = await sb.from('customer_addresses').select('*').eq('customer_id', currentUser.id).order('is_default',{ascending:false});
  if(error){ body.innerHTML = `<div class="empty">Could not load addresses: ${escapeHtml(error.message)}</div>`; return; }
  body.innerHTML = `<div class="orders">${(data||[]).map(a=>`
    <div class="order" style="cursor:default">
      <div><b>${escapeHtml(a.line1)}</b><span>${escapeHtml(a.city)}, ${escapeHtml(a.state)} – ${escapeHtml(a.pincode)}${a.landmark?' · '+escapeHtml(a.landmark):''}</span></div>
      <button class="textBtn" type="button" onclick="deleteAddress('${a.id}')">Remove</button>
    </div>`).join('') || '<div class="empty">No saved addresses yet.</div>'}</div>
    <form onsubmit="addAddress(event)" style="margin-top:14px">
      <label>Address line *<input id="newAddrLine1" required placeholder="House/flat, street"></label>
      <label>Landmark<input id="newAddrLandmark"></label>
      <div class="two"><label>City *<input id="newAddrCity" required></label><label>State *<input id="newAddrState" required></label></div>
      <label>PIN code *<input id="newAddrPin" required maxlength="6" pattern="[0-9]{6}"></label>
      <button class="btn light full" type="submit">Save address</button>
    </form>`;
}
async function addAddress(e){
  e.preventDefault();
  const {error} = await sb.from('customer_addresses').insert({
    customer_id: currentUser.id,
    line1: $('newAddrLine1').value.trim(),
    landmark: $('newAddrLandmark').value.trim() || null,
    city: $('newAddrCity').value.trim(),
    state: $('newAddrState').value.trim(),
    pincode: $('newAddrPin').value.trim(),
    is_default: true
  });
  if(error){ showToast('Could not save address: '+error.message); return; }
  showToast('Address saved');
  renderAddressTab();
}
async function deleteAddress(id){
  const {error} = await sb.from('customer_addresses').delete().eq('id', id);
  if(error){ showToast('Could not remove address: '+error.message); return; }
  renderAddressTab();
}

/* ---------- Checkout ---------- */
let checkoutPinInfo = null; // set by verifyPincode() once a PIN is confirmed serviceable; drives both displayed AND charged shipping (item B) and the dynamic ETA shown (item H) — never two different numbers for the same thing.

// V32.12.1 (spec 6/16 — "Live Configuration Changes Must Be Respected
// Before Checkout" / "Stale-State Review"). CONFIG.store is only ever
// as fresh as the last full page load — a customer who opens the site,
// adds items, then leaves the tab open for a while is looking at
// whatever CONFIG.store said at load time, even if Admin has since
// flipped Vacation Mode or Delivery Enabled. The browser/cart is
// explicitly NOT the source of truth (spec 6's own stated principle),
// so this re-reads the two checkout-gating fields directly from
// Supabase — a single small `select` rather than the full settings/
// announcements/reviews fetch — at the two moments that actually
// matter: opening checkout, and the instant before placeOrder() submits.
// This is a best-effort UX improvement, NOT the authoritative check —
// place_order() itself (see supabase_migration_v32_12_1.sql) re-checks
// vacation_mode/delivery_mode server-side, atomically, at the moment the
// order row is actually created, so there is no real race condition even
// if this client-side check is skipped (offline, request failure, etc).
async function fetchLiveCheckoutGate(){
  try{
    const {data,error} = await sb.from('store_settings').select('vacation_mode,vacation_message,delivery_mode').eq('id','default').maybeSingle();
    if(error || !data) return null;
    return { vacationMode: !!data.vacation_mode, vacationMessage: data.vacation_message, deliveryMode: data.delivery_mode };
  }catch(err){
    console.warn('Could not re-check live store configuration before checkout — proceeding with last-known settings (place_order() still enforces this server-side):', err?.message||err);
    return null;
  }
}
// Returns true (and shows the right message) if checkout should be
// BLOCKED right now. Silently allows checkout to proceed if the live
// check itself couldn't be reached (fail open on the client — the
// server-side check in place_order() is the real backstop).
async function checkoutIsBlockedByLiveConfig(){
  const live = await fetchLiveCheckoutGate();
  if(!live) return false;
  if(live.vacationMode){
    showToast(live.vacationMessage || "We're currently not accepting orders. Please try again when ordering resumes.");
    CONFIG.store.vacationMode = true; CONFIG.store.vacationMessage = live.vacationMessage; applyVacation();
    return true;
  }
  if(live.deliveryMode !== 'india'){
    showToast('Delivery is currently unavailable. Please try again later.');
    CONFIG.store.deliveryMode = live.deliveryMode;
    return true;
  }
  // Keep CONFIG in sync even when neither gate is tripped, so the rest
  // of the checkout UI (banners, disabled buttons) reflects reality too.
  CONFIG.store.vacationMode = false; CONFIG.store.deliveryMode = live.deliveryMode;
  return false;
}

function effectiveShipping(t){
  // V32.5 fix (Priority 3, item 8): free delivery above the configured
  // threshold must apply across every state/PIN, per the explicit
  // requirement ("Free delivery above ₹599 remains applicable across
  // states"). Previously, ANY non-null PIN-level delivery_charge always
  // overrode this — a real order above the free-shipping threshold could
  // still get charged shipping just because its PIN had a configured
  // charge. This was a pre-existing latent bug that becomes much more
  // impactful now that state-level defaults (item 8/9) mean most PINs
  // will have a resolved delivery_charge, so it's fixed here as part of
  // shipping this feature.
  if(t.sub > 0 && t.sub >= (CONFIG.store.freeShippingThreshold||0)) return 0;
  return checkoutPinInfo?.charge != null ? Number(checkoutPinInfo.charge) : t.ship;
}
function updateCheckoutSummary(){
  const t = cartTotals();
  const ship = effectiveShipping(t);
  const discount = currentDiscount(t.sub);
  const total = Math.max(0, t.sub - discount + ship);
  const shipEl = $('checkoutShipLine'), totalEl = $('checkoutTotalLine'), estEl = $('checkoutEstimate');
  const discEl = $('checkoutDiscountLine');
  if(discEl) discEl.parentElement.style.display = discount>0 ? '' : 'none';
  if(discEl) discEl.textContent = '−'+money(discount);
  if(shipEl) shipEl.textContent = ship ? money(ship) : 'FREE';
  if(totalEl) totalEl.textContent = money(total);
  if(estEl){
    const min = checkoutPinInfo?.min ?? CONFIG.store.deliveryMinDays ?? 4;
    const max = checkoutPinInfo?.max ?? CONFIG.store.deliveryMaxDays ?? 8;
    estEl.innerHTML = `<b>Estimated delivery: ${min}–${max} days</b><span>${checkoutPinInfo?.pinChecked?'Based on your PIN code.':'Delivery time varies by location and PIN code.'}</span>`;
  }
}
async function openCheckout(){
  if(CONFIG.store.vacationMode){showToast(CONFIG.store.vacationMessage||'Ordering is temporarily paused.');return}
  if(!cart.length){showToast('Your cart is empty');return}
  // V32.12.1 (spec 6): re-check live config BEFORE opening checkout at
  // all, not just the possibly-stale CONFIG.store value above — a
  // customer who kept the tab open across an Admin change should see
  // the block here, not get all the way to the payment form first.
  if(await checkoutIsBlockedByLiveConfig()) return;
  closeCart();
  closeWelcomePopup();
  checkoutPinInfo = null;
  const t=cartTotals();
  track('begin_checkout',{currency:'INR',value:t.sub,coupon:appliedCoupon?.code||undefined,items:cart.map(x=>{const d=cartItemDetails(x);return {item_id:x.productId||('combo:'+x.comboId),item_name:d.name,price:d.price,quantity:x.qty}})});
  const u = currentUser ? currentProfile : null;
  let savedAddr = null;
  if(currentUser){
    const {data} = await sb.from('customer_addresses').select('*').eq('customer_id', currentUser.id).order('is_default',{ascending:false}).limit(1);
    savedAddr = data?.[0] || null;
  }
  const upi=CONFIG.store.upiEnabled!==false, cod=CONFIG.store.codEnabled!==false;
  $('checkoutContent').innerHTML=`<div class="checkoutGrid">
    <div>
      <div class="eyebrow">CHECKOUT</div><h2>Delivery details.</h2>
      <p class="muted">Choose how you want to pay. You can order as a guest or sign in.</p>
      <div class="deliveryEstimate" id="checkoutEstimate"><b>Estimated delivery: ${CONFIG.store.deliveryMinDays||4}–${CONFIG.store.deliveryMaxDays||8} days</b><span>Delivery time varies by location and PIN code.</span></div>
      <div class="guestChoice"><b>Checkout as ${u?'signed-in customer':'guest'}</b>${u?`<button onclick="signOut().then(openCheckout)">Use guest</button>`:'<button onclick="closeCheckout();openAccount()">Sign in / register</button>'}</div>
      <form id="checkoutForm" onsubmit="placeOrder(event)">
        <label>Full name *<input id="coName" value="${escapeHtml(u?.name||'')}" required></label>
        <label>Mobile *<input id="coPhone" value="${escapeHtml(u?.phone||'')}" required pattern="[0-9]{10}" maxlength="10"></label>
        <label>Search your Google location <span class="tiny">${CONFIG.store.googleMapsApiKey?'':'not yet configured'}</span><div id="placeBox"></div></label>
        <label>Address *<textarea id="coAddress" required rows="3" placeholder="House / flat, street, landmark">${escapeHtml(savedAddr?.line1||'')}</textarea></label>
        <div class="two"><label>City *<input id="coCity" required value="${escapeHtml(savedAddr?.city||'')}"></label><label>State *<input id="coState" required value="${escapeHtml(savedAddr?.state||'')}"></label></div>
        <div class="pinRow"><label>PIN code *<input id="coPin" required inputmode="numeric" pattern="[0-9]{6}" maxlength="6" value="${escapeHtml(savedAddr?.pincode||'')}"></label><button type="button" class="btn outline" onclick="verifyPincode()">Verify PIN</button></div>
        <div id="pinStatus" class="pinStatus"></div>
        <label>Country<select id="coCountry" disabled><option value="IN">India</option></select></label>
        <div class="paymentChooser"><h3>Payment method</h3>
          ${upi?`<label class="paymentOption active"><input type="radio" name="paymentMethod" value="upi" checked onchange="togglePaymentNote()"><span><b>Pay by UPI QR</b><small>Scan and pay the exact order amount</small></span></label>`:''}
          ${cod?`<label class="paymentOption"><input type="radio" name="paymentMethod" value="cod" onchange="togglePaymentNote()"><span><b>Cash on Delivery</b><small>Pay when your order is delivered</small></span></label>`:''}
          <div id="paymentNote" class="paymentNote">${escapeHtml(CONFIG.store.paymentNote||'')}</div>
        </div>
        <button class="btn gold full" type="submit">Continue checkout <i class="fa-solid fa-arrow-right"></i></button>
      </form>
    </div>
    <aside class="summary"><h3>Your order</h3>
      ${cart.map(x=>{const d=cartItemDetails(x);return `<div class="line"><span>${escapeHtml(d.name)} · ${escapeHtml(d.label)} × ${x.qty}</span><b>${money(d.price*x.qty)}</b></div>`}).join('')}
      <div class="line"><span>Subtotal</span><b>${money(t.sub)}</b></div>
      <div class="line discount" style="display:${currentDiscount(t.sub)>0?'':'none'}"><span>Discount ${appliedCoupon?'('+escapeHtml(appliedCoupon.code)+')':''}</span><b id="checkoutDiscountLine">−${money(currentDiscount(t.sub))}</b></div>
      <div class="line"><span>Delivery</span><b id="checkoutShipLine">${t.ship?money(t.ship):'FREE'}</b></div>
      <div class="line total"><span>Total</span><b id="checkoutTotalLine">${money(Math.max(0,t.sub-currentDiscount(t.sub)+t.ship))}</b></div>
    </aside></div>`;
  $('checkoutOverlay').classList.add('open');document.body.classList.add('modalOpen');
  initPlaces();
}
function closeCheckout(){$('checkoutOverlay').classList.remove('open');document.body.classList.remove('modalOpen')}
function togglePaymentNote(){
  document.querySelectorAll('.paymentOption').forEach(x=>x.classList.toggle('active',x.querySelector('input')?.checked));
  const m=document.querySelector('input[name=paymentMethod]:checked')?.value;
  const n=$('paymentNote'); if(n)n.textContent=m==='cod'?'Pay the delivery partner when your order arrives.':'Scan the QR, pay the exact total, then share the UTR/reference number so we can verify your payment.';
}
const PIN_NOT_SERVICEABLE_MSG = 'Delivery is currently unavailable to this PIN code.';
async function verifyPincode(){
  const pin=$('coPin').value.trim(), status=$('pinStatus');
  if(!/^\d{6}$/.test(pin)){status.className='pinStatus bad';status.textContent='Enter a 6-digit Indian PIN code.';return}
  if(CONFIG.store.deliveryMode!=='india'){status.className='pinStatus bad';status.textContent='Delivery is currently unavailable. Please try again later.';return}
  status.className='pinStatus';status.textContent='Checking delivery availability…';
  checkoutPinInfo = null;
  const {data, error} = await sb.rpc('check_pincode', {p_pincode:pin});
  const row = data?.[0];
  if(error){
    // Master lookup itself failed (network/infra hiccup, not a bad PIN) —
    // fail open to the generic estimate rather than blocking checkout over
    // an infrastructure issue. This is a genuinely different case from "PIN
    // not in master" below and is intentionally left as fail-open. Marked
    // as verified (not pin-specific) so placeOrder() still allows checkout
    // to proceed rather than getting stuck behind an outage.
    status.className='pinStatus good';
    status.textContent=`Estimated delivery: ${CONFIG.store.deliveryMinDays||4}–${CONFIG.store.deliveryMaxDays||8} days.`;
    checkoutPinInfo = { charge:null, min:CONFIG.store.deliveryMinDays||4, max:CONFIG.store.deliveryMaxDays||8, pinChecked:false, verifiedPin:pin };
    updateCheckoutSummary();
    return;
  }
  if(!row || !row.found){
    // V32.5 fix (Priority 1, item 1): a PIN that does not exist in the
    // pincode master must NEVER fall back to the generic estimate — that
    // silently told customers we deliver to an arbitrary/nonexistent PIN.
    // Treated identically to "not serviceable" (case C from the spec).
    // checkoutPinInfo is deliberately left null so placeOrder() below
    // blocks the order until a serviceable PIN is verified.
    status.className='pinStatus bad';
    status.textContent=PIN_NOT_SERVICEABLE_MSG;
    updateCheckoutSummary();
    return;
  }
  if(!row.effective_serviceable){
    // Never explains *why* (state disabled vs. individual PIN disabled
    // vs. inactive) — internal admin rules aren't exposed to customers.
    status.className='pinStatus bad';
    status.textContent=PIN_NOT_SERVICEABLE_MSG;
    updateCheckoutSummary();
    return;
  }
  const min = row.min_eta_days || CONFIG.store.deliveryMinDays || 4;
  const max = row.max_eta_days || CONFIG.store.deliveryMaxDays || 8;
  // This is the actual fix for the flagged gap: the same numbers used
  // in the status message below are stored here and are what
  // updateCheckoutSummary()/placeOrder() actually use — the displayed
  // amount and the charged amount can no longer diverge.
  checkoutPinInfo = { charge: row.delivery_charge, min, max, pinChecked: true, verifiedPin: pin };
  status.className='pinStatus good';
  status.textContent = row.delivery_charge!=null
    ? `Delivery available. Estimated delivery: ${min}–${max} days. Delivery charge for this PIN: ${row.delivery_charge>0?money(row.delivery_charge):'FREE'}.`
    : `Delivery available. Estimated delivery: ${min}–${max} days.`;
  updateCheckoutSummary();
}
async function initPlaces(){
  const box=$('placeBox'); if(!box)return;
  if(!CONFIG.store.googleMapsApiKey){box.innerHTML='<input id="placeFallback" placeholder="Add Google Maps API key in Admin to search locations">';return}
  try{
    if(!window.google){
      await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=`https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(CONFIG.store.googleMapsApiKey)}&v=weekly`;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)});
    }
    await google.maps.importLibrary('places');
    const el=new google.maps.places.PlaceAutocompleteElement({});
    el.setAttribute('placeholder','Search your address or area');
    el.includedRegionCodes=['in'];
    box.innerHTML='';box.appendChild(el);
    el.addEventListener('gmp-select',async({placePrediction})=>{
      const place=placePrediction.toPlace();
      await place.fetchFields({fields:['formattedAddress','addressComponents','location']});
      $('coAddress').value=place.formattedAddress||'';
      const comps=place.addressComponents||[];
      const get=t=>comps.find(c=>c.types?.includes(t))?.longText||'';
      $('coCity').value=get('locality')||get('administrative_area_level_2');
      $('coState').value=get('administrative_area_level_1');
      $('coPin').value=get('postal_code');
      verifyPincode();
    });
    mapsReady=true;
  }catch{ box.innerHTML='<input id="placeFallback" placeholder="Google Maps could not be loaded — enter address manually">'; }
}
function makeOrderNumber(){
  const d=new Date(), y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,'0'), day=String(d.getDate()).padStart(2,'0');
  // Client-generated, but must be safe against collisions across different
  // devices/customers now that orders live in one shared database (a
  // simple local daily counter, as used pre-Supabase, is no longer safe).
  const suffix = Date.now().toString(36).slice(-4).toUpperCase() + Math.random().toString(36).slice(2,4).toUpperCase();
  return `JF-${y}${m}${day}-${suffix}`;
}
async function placeOrder(e){
  e.preventDefault();
  // V32.12.1 (spec 6/16): re-check live config again right before
  // submitting — the checkout form can legitimately sit open for a
  // while (address entry, PIN verification, reading payment options),
  // so the check at openCheckout() alone isn't enough to catch a
  // change made WHILE checkout was already open.
  if(await checkoutIsBlockedByLiveConfig()) return;
  const pin=$('coPin').value.trim();
  if(!/^\d{6}$/.test(pin)){verifyPincode();showToast('Please verify your 6-digit PIN');return}
  // V32.5 fix (Priority 1, item 1): checkoutPinInfo is only populated by
  // verifyPincode() when the PIN is confirmed serviceable (or when the
  // lookup itself failed and we're intentionally failing open — see
  // verifyPincode()). If the PIN wasn't verified at all, or was verified
  // and found non-serviceable/nonexistent, or the customer edited the PIN
  // after verifying, checkoutPinInfo is null/stale here — re-run
  // verification and block the order rather than silently accepting it.
  if(!checkoutPinInfo || checkoutPinInfo.verifiedPin !== pin){
    verifyPincode();
    showToast('Please verify delivery availability for this PIN before placing the order.');
    return;
  }
  const t=cartTotals();
  const ship = effectiveShipping(t); // same value the summary just displayed — never a second, different number
  const discount = currentDiscount(t.sub); // UI preview only — place_order() below re-validates this server-side and is the real authority (spec 1.5)
  const total = Math.max(0, t.sub - discount + ship);
  const min = checkoutPinInfo?.min ?? CONFIG.store.deliveryMinDays ?? 4;
  const max = checkoutPinInfo?.max ?? CONFIG.store.deliveryMaxDays ?? 8;
  const method=document.querySelector('input[name=paymentMethod]:checked')?.value||'upi';
  const items = cart.map(x=>{
    const d=cartItemDetails(x);
    return {
      item_type: x.type, product_id: x.productId||null, variant_id: x.variantId||null, combo_id: x.comboId||null,
      name: d.name, variant_label: d.label, unit_price: d.price, qty: x.qty, line_total: Math.round(d.price*x.qty*100)/100
    };
  });
  const submitBtn = e.target.querySelector('button[type=submit]');
  if(submitBtn){ submitBtn.disabled = true; submitBtn.textContent = 'Placing order…'; }

  let orderNumber = makeOrderNumber(), attempt = 0, result;
  while(attempt < 2){
    result = await sb.rpc('place_order', {
      p_order_number: orderNumber,
      p_guest_name: $('coName').value.trim(),
      p_guest_phone: $('coPhone').value.trim(),
      p_address_line1: $('coAddress').value.trim(),
      p_address_city: $('coCity').value.trim(),
      p_address_state: $('coState').value.trim(),
      p_address_pincode: pin,
      p_subtotal: t.sub, p_shipping: ship, p_total: total,
      p_payment_method: method,
      p_estimated_delivery: `${min}-${max} days`,
      p_items: items,
      p_eta_min_days: min, p_eta_max_days: max,
      p_coupon_code: appliedCoupon?.code || null
    });
    if(!result.error || result.error.code !== '23505') break; // 23505 = unique_violation, retry with a new number
    orderNumber = makeOrderNumber(); attempt++;
  }
  if(submitBtn){ submitBtn.disabled = false; submitBtn.textContent = 'Continue checkout'; }

  if(result.error){
    // Spec 1.6: if the coupon became invalid between cart and checkout
    // (expired, usage limit reached by someone else, etc.) place_order()
    // rejects the ENTIRE order server-side rather than silently
    // dropping just the discount — this is that exact customer-facing
    // message, and the stale local coupon is cleared so the next
    // attempt starts clean.
    if(/coupon is no longer available/i.test(result.error.message||'')){
      appliedCoupon=null; saveCoupon(null);
      showToast('This coupon is no longer available. Please select another offer.');
      renderCart(); updateCheckoutSummary();
      return;
    }
    showToast('Could not place order: '+result.error.message); return;
  }

  const phone = $('coPhone').value.trim(), name = $('coName').value.trim();
  // V33 analytics: 'purchase' = order successfully created (UPI payment is
  // still verified manually afterwards — see the Admin order workflow).
  track('purchase',{transaction_id:orderNumber,currency:'INR',value:Number(total)||0,payment_type:method,coupon:appliedCoupon?.code||undefined,items:cart.map(x=>{const d=cartItemDetails(x);return {item_id:x.productId||('combo:'+x.comboId),item_name:d.name,price:d.price,quantity:x.qty}})});
  cart=[]; saveCart();
  appliedCoupon=null; saveCoupon(null);
  closeCheckout();
  const orderStub = { order_number: orderNumber, total, status: method==='upi'?'Payment verification pending':'Order received — COD', customerName:name, phone, estimated_delivery:`${CONFIG.store.deliveryMinDays||4}–${CONFIG.store.deliveryMaxDays||8} days` };
  if(method==='upi') showUpiPayment(orderStub); else showOrderSuccess(orderStub);
  refreshProductViews(); renderCart();
}
// Resolves CONFIG.store.upiQrImage into something that actually loads
// on the deployed GitHub Pages site. Historically this field only ever
// held a bare repo-relative filename (e.g. "images/payments/jayvi-upi.webp"),
// but that path doesn't exist in this repo — the real file lives at
// "images/jayvi-upi.webp" — so the <img> silently failed and only the
// alt text showed. This now accepts THREE shapes so the same Admin
// field keeps working after the QR is uploaded through the Admin
// upload widget (which stores a full Supabase Storage public URL,
// same pattern as product/announcement/gallery media):
//   1) a full http(s) URL (Supabase Storage or any other host) — used as-is
//   2) a repo-relative path with a leading slash — leading slash is
//      stripped, since GitHub Pages project sites are served from a
//      subpath (e.g. https://user.github.io/repo/), and a leading
//      slash would resolve to the domain root instead of the repo.
//   3) a bare repo-relative path — used as-is, relative to index.html,
//      exactly like every other image in this app (images/brand/...,
//      images/products/...).
function resolveUpiQrSrc(path){
  const p = String(path||'').trim();
  if(!p) return '';
  if(/^https?:\/\//i.test(p)) return p;
  return p.replace(/^\/+/, '');
}
function showUpiPayment(o){
  const qrSrc = resolveUpiQrSrc(CONFIG.store.upiQrImage);
  // onerror swap: if the configured path/URL 404s (wrong filename,
  // bucket object removed, etc.) show the same "ask Admin to upload"
  // placeholder instead of a broken-image icon + alt text.
  const qr = qrSrc
    ? `<img class="upiQr" src="${escapeHtml(qrSrc)}" alt="Jayvi Foods UPI QR" onerror="this.outerHTML='&lt;div class=&quot;upiQr placeholder&quot;&gt;&lt;b&gt;UPI QR&lt;/b&gt;&lt;span&gt;QR image could not be loaded — check Admin &gt; Payment settings&lt;/span&gt;&lt;/div&gt;'">`
    : `<div class="upiQr placeholder"><b>UPI QR</b><span>Upload your Jayvi QR from Admin</span></div>`;
  // Item G: on mobile, a "Pay with UPI app" deep link is offered above
  // the QR — tapping it hands off to whichever UPI app the customer
  // has installed via the standard upi://pay intent. On desktop there's
  // no UPI app to hand off to, so only the QR + manual reference is
  // shown, exactly as specified ("Desktop → QR + manual reference
  // fallback"). Neither path can auto-confirm the payment — the UTR
  // field below is always required either way; this is explicitly NOT
  // claiming automatic reference retrieval, which the current
  // architecture cannot do without a real payment gateway.
  //
  // Root cause of "receiver is not accepting payments on this UPI ID" /
  // "Transaction not permitted to this VPA by the PSP": msjayvifoods.eazypay@icici
  // is a MERCHANT (P2M) handle — ICICI's "eazypay" is their merchant
  // collection product, not a personal/P2P handle — and NPCI-registered
  // merchant VPAs are validated by the UPI app against the intent's own
  // fields, not just the VPA. When a customer types the same VPA
  // manually inside PhonePe/HDFC (a P2P-style flow), the app looks the
  // VPA up itself and fills in the correct merchant details, so it
  // works. But a generic `upi://pay` intent built without `mc` (Merchant
  // Category Code) or a `tr` (unique transaction reference, distinct
  // from `tn`) reads as an incomplete/invalid merchant transaction to
  // the receiving PSP, which is exactly what both error messages mean —
  // it is not an amount or order-number problem, which matches your
  // testing. `am` is also now formatted to exactly 2 decimals, since
  // some PSPs are strict about this.
  //
  // `mc` MUST be set to the actual Merchant Category Code ICICI/Eazypay
  // assigned when this VPA was onboarded (Admin > Payment settings >
  // "Merchant Category Code (MCC)") — this is not something we can
  // guess from the app; ask ICICI Eazypay support or check the Eazypay
  // merchant dashboard/onboarding paperwork for it. Until it's filled
  // in, the link below still improves on the previous version (adds
  // `tr`, drops nothing) but may continue to fail on apps that hard-
  // require `mc` for this VPA type.
  const amount = Number(o.total).toFixed(2);
  const orderRef = String(o.order_number||'');
  const upiLink = CONFIG.store.upiId
    ? `upi://pay?pa=${encodeURIComponent(CONFIG.store.upiId)}&pn=${encodeURIComponent(CONFIG.store.upiName||'Jayvi Foods')}${CONFIG.store.upiMc?`&mc=${encodeURIComponent(CONFIG.store.upiMc)}`:''}&tr=${encodeURIComponent(orderRef)}&tn=${encodeURIComponent('Payment for '+orderRef)}&am=${encodeURIComponent(amount)}&cu=INR`
    : null;

  const intentButton = (isMobile() && upiLink)
    ? `<a class="btn gold full" href="${upiLink}">Pay with UPI app →</a><p class="tiny" style="text-align:center;margin:8px 0">or scan the QR below</p>`
    : '';
  $('accountContent').innerHTML=`<div class="paymentSuccess"><div class="eyebrow">PAYMENT</div><h2>Pay ${money(o.total)}</h2>
    <p class="muted">${isMobile()?'Pay with your UPI app, or scan the QR.':'Scan this QR with any UPI app.'} Your order will move to processing after we verify the payment.</p>
    ${intentButton}${qr}
    <div class="upiMeta"><b>${escapeHtml(CONFIG.store.upiName||'Jayvi Foods')}</b>${CONFIG.store.upiId?`<span>UPI ID: ${escapeHtml(CONFIG.store.upiId)}</span>`:''}</div>
    <label>UPI transaction / UTR reference *<input id="utrInput" placeholder="Enter the reference after payment"></label>
    <button class="btn gold full" onclick="submitUpiProof('${escapeHtml(o.order_number)}','${escapeHtml(o.phone)}')">I have paid →</button>
    <p class="tiny">Order ${escapeHtml(o.order_number)} · Payment verification pending</p></div>`;
  $('accountOverlay').classList.add('open');document.body.classList.add('modalOpen');
}
async function submitUpiProof(orderNumber, phone){
  const utr=$('utrInput')?.value.trim();
  if(!utr){showToast('Enter the UTR/reference number');return}
  const {error} = await sb.rpc('submit_payment_proof', {p_order_number:orderNumber, p_phone:phone, p_utr:utr});
  if(error){ showToast('Could not submit payment proof: '+error.message); return; }
  showToast('Payment proof submitted. Jayvi will verify it.');
  showOrderSuccess({ order_number:orderNumber, phone, status:'Payment verification pending', total:null });
}
function showOrderSuccess(o){
  markDeviceOrdered(); // V34: lets "new customer" offers/popup step aside on this device
  $('accountContent').innerHTML=`<div class="successIcon"><i class="fa-solid fa-check"></i></div><div class="eyebrow">ORDER RECEIVED</div><h2>${escapeHtml(o.order_number)}</h2>
    <p class="muted">${escapeHtml(o.status)}. We'll update the order status as it moves through fulfilment.</p>
    <div class="trackMini">${renderTimeline(o)}</div>
    <button class="btn gold full" onclick="closeAccount()">Continue shopping</button>`;
  $('accountOverlay').classList.add('open');document.body.classList.add('modalOpen');
}
function renderTimeline(o){
  const status = o.status||'';
  // Item N: a cancelled or delivery-failed order must NOT render the
  // normal happy-path timeline — each gets its own track, per the
  // approved spec's exact examples.
  const NORMAL = ['Order Confirmed','Preparing','Packed & Shipped','Out for Delivery','Delivered'];
  const CANCELLED = ['Order Confirmed','Preparing','Cancelled','Refund Pending','Refunded'];
  const FAILED = ['Packed & Shipped','Out for Delivery','Delivery Failed','Returned'];

  let steps;
  if(['Cancelled','Refund Pending','Refunded'].includes(status)) steps = CANCELLED;
  else if(['Delivery Failed','Returned'].includes(status)) steps = FAILED;
  else steps = NORMAL;

  const idx = steps.indexOf(status);
  return `<div class="timeline">${steps.map((s,i)=>{
    const cls = i===idx ? 'current' : (idx>=0 && i<idx ? 'done' : '');
    return `<div class="timelineStep ${cls}"><i>${i<idx?'✓':i+1}</i><span>${s}</span></div>`;
  }).join('')}</div>`;
}
function trackOrderPrompt(){
  openAccount();
  $('accountContent').innerHTML=`<div class="eyebrow">TRACK ORDER</div><h2>Where is my order?</h2><p class="muted">Enter your order number and mobile number.</p>
    <label>Order number<input id="trackId" placeholder="JF-YYYYMMDD-XXXXXX"></label>
    <label>Mobile<input id="trackPhone" maxlength="10"></label>
    <button class="btn gold full" onclick="trackOrder()">Track order →</button>`;
}
const CANCELLABLE_STATUSES = ['Order Confirmed','Preparing']; // mirrors status_transitions exactly — server enforces the real rule regardless, this only decides whether to show the button
// V32.5 fix (Priority 1, item 2): statuses from which the state machine
// (supabase_migration_order_state_machine.sql) allows moving back into
// "Payment Verification" — i.e. a payment that never happened or didn't
// go through. This is what "Retry Payment" is for: never a new order.
const RETRY_PAYMENT_STATUSES = ['Payment Pending','Payment Failed'];
async function trackKnownOrder(orderNumber, phone){
  const {data, error} = await sb.rpc('track_guest_order', {p_order_number:orderNumber, p_phone:phone});
  const o = data?.[0];
  if(error || !o){showToast('Order could not be found for this mobile number.');return}
  const canCancel = CANCELLABLE_STATUSES.includes(o.status);
  const canRetryPayment = RETRY_PAYMENT_STATUSES.includes(o.status);
  $('accountContent').innerHTML=`<div class="eyebrow">ORDER ${escapeHtml(o.order_number)}</div><h2>${escapeHtml(o.status||'Order received')}</h2>
    <p class="muted">${money(o.total)}</p>${renderTimeline(o)}
    <div class="orderTrackNote">
      ${o.tracking_url?`Tracking: <a href="${escapeHtml(o.tracking_url)}" target="_blank">Open courier tracking →</a><br>`:''}
      ${o.tracking_number?`Tracking number: <b>${escapeHtml(o.tracking_number)}</b><br>`:''}
      ${o.reference_number?`Reference number: <b>${escapeHtml(o.reference_number)}</b><br>`:''}
      ${o.delivery_partner?`Delivery partner: ${escapeHtml(o.delivery_partner)}<br>`:''}
      ${formatDynamicEta(o)}
    </div>
    ${canRetryPayment?`<button class="btn gold full" style="margin-top:14px" onclick="retryPayment('${escapeHtml(o.order_number)}','${escapeHtml(phone)}')">Retry Payment</button>`:''}
    ${canCancel?`<button class="btn light full" style="margin-top:14px" onclick="confirmCancelOrder('${escapeHtml(o.order_number)}','${escapeHtml(phone)}')">Cancel order</button>`
      : (o.status==='Packed & Shipped'||o.status==='Out for Delivery' ? `<p class="tiny" style="margin-top:10px">Cancellation is no longer available because your order has already been shipped.</p>` : '')}`;
  $('accountOverlay').classList.add('open');document.body.classList.add('modalOpen');
}
// V32.5 fix (Priority 1, item 2): re-opens payment for an EXISTING order —
// never calls place_order, so no duplicate order is ever created. Re-fetches
// the order first so a stale button (e.g. Admin already verified payment in
// another tab) can't reopen payment on an order that's moved on.
// Payment method: UPI only for now, matching the current single-method
// checkout. When more payment methods exist, branch here on the order's own
// payment_method (once track_guest_order exposes it) instead of assuming UPI.
async function retryPayment(orderNumber, phone){
  const {data, error} = await sb.rpc('track_guest_order', {p_order_number:orderNumber, p_phone:phone});
  const o = data?.[0];
  if(error || !o){showToast('Order could not be found for this mobile number.');return}
  if(!RETRY_PAYMENT_STATUSES.includes(o.status)){
    showToast(`This order is already "${o.status}" — no payment retry needed.`);
    trackKnownOrder(orderNumber, phone);
    return;
  }
  showUpiPayment({ order_number:o.order_number, phone, total:o.total });
}
function formatDynamicEta(o){
  // Item H: reflects the order's OWN stored estimate, and firms up as
  // status progresses — never just re-shows the generic 4–8 days after
  // the order has moved on.
  if(o.status==='Delivered') return `Delivered.`;
  if(o.dispatch_date && ['Packed & Shipped','Out for Delivery'].includes(o.status)){
    return `Shipped. Expected delivery: ${new Date(o.dispatch_date).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}${o.eta_max_days?' – '+new Date(new Date(o.dispatch_date).getTime()+o.eta_max_days*86400000).toLocaleDateString('en-IN',{day:'numeric',month:'short'}):''}.`;
  }
  if(o.status==='Out for Delivery') return `Expected today.`;
  return `Estimated delivery: ${o.estimated_delivery||'4–8 days'}.`;
}
async function confirmCancelOrder(orderNumber, phone){
  if(!confirm(`Cancel order ${orderNumber}? This can't be undone.`)) return;
  const {error} = await sb.rpc('cancel_order', {p_order_number:orderNumber, p_phone:phone});
  if(error){ showToast('Could not cancel: '+error.message); return; }
  showToast(`Order ${orderNumber} cancelled. If payment was made, your refund will be credited within ${CONFIG.store.refundBusinessDays||4} business days.`);
  trackKnownOrder(orderNumber, phone);
}
function trackOrder(){
  const id=$('trackId').value.trim(), phone=$('trackPhone').value.trim();
  if(!/^\d{10}$/.test(phone)){showToast('Enter the 10-digit mobile number used for the order.');return}
  trackKnownOrder(id,phone);
}

/* ---------- Product detail ---------- */
// V32.5 fix (Priority 2, item 6): tracks which product's detail modal is
// currently open so cart-mutating actions (addToCart/changeProductQty/
// buyNow, and the cart drawer's own changeQty/removeCart) can refresh it.
// This is the actual root cause of "newly added products don't show
// quantity controls": the detail modal's Add to cart/Buy now buttons were
// static HTML that never re-rendered after adding to cart, for ANY
// product — most testing happens via the grid card (which already
// re-renders correctly on every cart change), so it only surfaced when a
// just-added product was tested through the detail view.
let openProductId = null;
/* ---------- Product detail: structured info accordions (PatilKaki-review addition) ----------
   Each section below renders to '' when its data is empty, so openProduct()
   can simply concatenate all of them — a product with no data entered
   yet looks exactly like it did before this change. */
function accordion(title,bodyHtml,open=false,id=''){
  return `<details class="detailAccordion"${open?' open':''}${id?` id="${id}"`:''}><summary>${escapeHtml(title)}</summary><div class="detailAccordionBody">${bodyHtml}</div></details>`;
}
function sectionHighlights(p){
  if(!p.highlights?.length) return '';
  return accordion("Why you'll love it", `<ul class="highlightList">${p.highlights.map(h=>`<li><i class="fa-solid fa-check"></i>${escapeHtml(h)}</li>`).join('')}</ul>`, true);
}
function sectionIngredients(p){
  if(!p.ingredients) return '';
  return accordion('Ingredients', `<p>${escapeHtml(p.ingredients)}</p>`);
}
function sectionHowToEnjoy(p){
  // V33: Admin free-text serving ideas (one per line) take priority.
  const lines=String(p.howToEnjoyText||'').split('\n').map(x=>x.trim()).filter(Boolean);
  if(lines.length) return accordion('How to enjoy', `<div class="pillRow">${lines.map(n=>`<span class="pill">${escapeHtml(n)}</span>`).join('')}</div>`);
  // Reuses mealTags — the exact same data already shown as "Works well
  // with" in the old modal — rather than a separate how-to-enjoy field.
  // V34.2: only pairing tags read as "how to enjoy" — use-case tags (Travel, Gifting…) don't.
  const names=(p.mealTags||[]).filter(m=>{ const t=mealTagList.find(x=>x.id===m); return t?t.pairing!==false:!!CONFIG.mealLabels?.[m]; })
    .map(m=>escapeHtml(mealTagList.find(t=>t.id===m)?.name||CONFIG.mealLabels?.[m]||m)).filter(Boolean);
  if(!names.length) return '';
  return accordion('How to enjoy', `<div class="pillRow">${names.map(n=>`<span class="pill">${n}</span>`).join('')}</div>`);
}
function sectionStorage(p){
  if(!p.storageInstructions && !p.shelfLife) return '';
  const rows=[
    p.storageInstructions?`<div class="kvRow"><b>Storage</b><span>${escapeHtml(p.storageInstructions)}</span></div>`:'',
    p.shelfLife?`<div class="kvRow"><b>Shelf life</b><span>${escapeHtml(p.shelfLife)}</span></div>`:''
  ].join('');
  return accordion('Storage & shelf life', rows);
}
function sectionNutritionAllergens(p){
  if(!p.nutrition?.length && !p.allergens) return '';
  const table=p.nutrition?.length?`<div class="nutritionTable">${p.nutrition.map(r=>`<div class="kvRow"><b>${escapeHtml(r.label||'')}</b><span>${escapeHtml(r.value||'')}</span></div>`).join('')}</div>`:'';
  const allergenNote=p.allergens?`<p class="allergenNote"><i class="fa-solid fa-triangle-exclamation"></i> ${escapeHtml(p.allergens)}</p>`:'';
  return accordion('Nutrition & allergens', table+allergenNote);
}
function sectionFaq(p){
  if(!p.faq?.length) return '';
  const rows=p.faq.map(f=>`<div class="faqRow"><b>${escapeHtml(f.question||'')}</b><p>${escapeHtml(f.answer||'')}</p></div>`).join('');
  return accordion('Frequently asked questions', rows);
}
// "Complete your meal" / "You may also like" / "More from this
// category" — all three reuse existing catalogue data (combos,
// mealTags, category) rather than a new recommendation engine.
function relatedSectionsMarkup(p){
  const combosWithProduct=(CONFIG.combos||[]).filter(c=>c.active&&(c.items||[]).some(it=>it.productId===p.id)).slice(0,2);
  const rel=new Set(p.relatedProducts||[]);
  const sameCategory=products.filter(x=>x.id!==p.id&&!rel.has(x.id)&&x.category===p.category).slice(0,4);
  const usedIds=new Set(sameCategory.map(x=>x.id));
  const pTags=p.mealTags||[];
  const sameMeal=products.filter(x=>x.id!==p.id&&!usedIds.has(x.id)&&!rel.has(x.id)&&(x.mealTags||[]).some(t=>pTags.includes(t)));
  const block=(title,gridClass,items,cardFn)=>items.length?`<div class="relatedBlock"><h3>${escapeHtml(title)}</h3><div class="${gridClass} relatedGrid">${items.map(cardFn).join('')}</div></div>`:'';
  // Phase 2 item 8: when an actual combo already contains this product,
  // that combo (with its own one-tap "Add combo") IS the strongest
  // "complete your meal" answer, so keep showing it exactly as before,
  // plus "You may also like" from the remaining meal-tag matches.
  // Only when there's NO combo match do we build the lighter bulk-pick
  // strip below from the same meal-tag data — never both, to avoid
  // listing the same products twice under two different headings.
  let completeYourMeal, alsoLike;
  if(combosWithProduct.length){
    completeYourMeal=block('Complete your meal','comboGrid',combosWithProduct,comboCard);
    alsoLike=block('You may also like','productGrid',sameMeal.slice(0,4),productCard);
  } else if(sameMeal.length){
    completeYourMeal=completeMealBulkMarkup(sameMeal.slice(0,3));
    alsoLike='';
  } else {
    completeYourMeal=''; alsoLike='';
  }
  return [
    completeYourMeal,
    alsoLike,
    block('More from this category','productGrid',sameCategory,productCard)
  ].filter(Boolean).join('');
}
// Lightweight "Complete your meal" bulk-add — reuses the EXISTING
// addToCart() for every selected item (looped), so there is no second
// cart mechanism; only the selection UI (checkboxes) is new.
function completeMealBulkMarkup(items){
  if(!items.length) return '';
  const rows=items.map(x=>{
    const v=getVariant(x,variantKey(x.id));
    return `<label class="mealPickRow"><input type="checkbox" class="mealPickCb" value="${x.id}" checked>
      <span class="mealPickThumb">${x.image?`<img src="${escapeHtml(x.image)}" alt="" loading="lazy">`:''}</span>
      <span class="mealPickName">${escapeHtml(x.name)}</span>
      <span class="mealPickPrice">${v?money(v.price):''}</span>
    </label>`;
  }).join('<span class="comboPlus mealPickPlus">+</span>');
  return `<div class="relatedBlock"><h3>Complete your meal</h3>
    <div class="mealPickList">${rows}</div>
    <button class="btn gold" onclick="addSelectedMealPicks()">Add selected to cart</button>
  </div>`;
}
function addSelectedMealPicks(){
  const boxes=[...document.querySelectorAll('.mealPickCb:checked')];
  if(!boxes.length){ showToast('Select at least one item first'); return; }
  let added=0;
  boxes.forEach(cb=>{
    const p=getProduct(cb.value); if(!p) return;
    const v=getVariant(p,variantKey(p.id)); if(!v) return;
    addToCart(p.id,v.id,{silent:true}); // the SAME addToCart() every other Add to Cart button uses — no second mutation path
    added++;
  });
  if(added){ renderCart(); refreshProductViews(); } // one refresh for the whole batch, not one per item
  showToast(added?`Added ${added} item${added>1?'s':''} to cart`:'Could not add those items right now');
}
// Product-specific reviews reuse the exact same website_reviews table
// and 'approved' status the homepage/account review flows already use
// (see renderReviews / submitReview) — filtered to this product's id,
// which that table already stores. No new reviews system.
async function loadProductReviews(pid){
  const holder=document.getElementById(`prodReviews-${pid}`);
  if(!holder) return;
  try{
    const {data,count}=await sb.from('website_reviews')
      .select('customer_name,rating,review_text,created_at',{count:'exact'})
      .eq('status','approved').eq('product_id',pid)
      .order('created_at',{ascending:false}).limit(4);
    const rows=data||[];
    if(!rows.length){ holder.closest('details')?.remove(); return; }
    holder.innerHTML=rows.map(r=>`<article class="prodReviewCard"><div class="stars">${'★'.repeat(r.rating)}</div><p>“${escapeHtml(r.review_text)}”</p><b>${escapeHtml(r.customer_name)}</b></article>`).join('')
      + (count>rows.length?`<a href="#" class="viewAllProdReviews" onclick="closeProduct();openAllReviews();return false">View all ${count} reviews →</a>`:'');
  }catch(err){
    console.warn('Could not load product reviews:', err?.message||err);
    holder.closest('details')?.remove();
  }
}
// Clicking the rating line ("★★★★★ 4.8 · 12 reviews") opens and
// scrolls to the existing Customer reviews accordion below — no new
// review UI, just a shortcut into the one that's already there.
function goToProductReviews(){
  const el=document.getElementById('prodReviewsAccordion');
  if(!el) return;
  el.open=true;
  el.scrollIntoView({behavior:'smooth',block:'start'});
}
function refreshOpenProductDetail(pid){
  if(openProductId===pid && $('productOverlay')?.classList.contains('open')) openProduct(pid);
}
function openProduct(id){
  const p=getProduct(id); if(!p)return;
  if(isMobile()){
    const card=document.querySelector(`[data-product-id="${id}"]`);
    card?.scrollIntoView({behavior:'smooth',block:'start'});
  }
  const v=getVariant(p,variantKey(id));
  if(!v){ showToast('This product is currently unavailable.'); return; } // defensive, same reasoning as productCard()
  openProductId = id;
  const soldOut=isProductSoldOut(p);
  const paused=!!CONFIG.store.vacationMode;
  const addAction=paused?"showToast('Ordering is paused while Jayvi Foods is on vacation.')":`addToCart('${p.id}','${v.id}')`;
  const buyAction=paused?"showToast('Ordering is paused while Jayvi Foods is on vacation.')":`buyNow('${p.id}','${v.id}')`;
  // Data-driven, same as productCard(): once this variant is in the cart,
  // show the -/+ stepper instead of Add to cart — works automatically for
  // every product, new or existing, with no product-specific code.
  const q=(paused||soldOut)?0:cartQtyFor(p.id,v.id);
  const detailActions = soldOut
    ? `<div class="detailBtns"><button class="soldOutBtn" style="flex:1" disabled>Sold out — check back soon</button></div>`
    : q
    ? `<div class="detailBtns hasQty"><div class="inlineQty"><button onclick="changeProductQty('${p.id}','${v.id}',-1)" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button><b>${q}</b><button onclick="changeProductQty('${p.id}','${v.id}',1)" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button></div><button class="btn gold" onclick="openCart()">View cart</button></div>`
    : `<div class="detailBtns"><button class="btn light" ${paused?'disabled':''} onclick="${addAction}">${paused?'Orders paused':'Add to cart'}</button><button class="btn gold" ${paused?'disabled':''} onclick="${buyAction}">${paused?'Unavailable':'Buy now →'}</button></div>`;
  // Order below follows the brief exactly: image -> name -> rating ->
  // price/variant -> Add to cart/Buy now (all inside detailGrid, kept
  // fixed and above the fold) -> structured info accordions -> reviews
  // -> related products (all full-width, below). Every accordion
  // section function returns '' when its data is empty, so a product
  // with nothing entered yet renders identically to before.
  const infoSections=[
    sectionHighlights(p), sectionIngredients(p), sectionHowToEnjoy(p),
    sectionNutritionAllergens(p), sectionStorage(p), sectionShipping(p), sectionFaq(p)
  ].filter(Boolean).join('');
  const reviewsSection=accordion(`Customer reviews (${p.reviewCount||0})`, `<div id="prodReviews-${p.id}" class="prodReviewGrid"><div class="empty smallEmpty">Loading reviews…</div></div>`, false, 'prodReviewsAccordion');
  const relatedHtml=goesGreatWithMarkup(p)+relatedSectionsMarkup(p);

  $('productContent').innerHTML=`<div class="detailGrid">
    <div class="detailImage">${productGalleryMarkup(p)}</div>
    <div class="detailCopy">
      <div class="detailTopRow"><div class="eyebrow">${escapeHtml(catName(p.category))}</div>${detailBadges(p)}</div>
      <h2>${escapeHtml(p.name)}</h2>
      ${Number(p.reviewCount)>0&&Number(p.rating)>0?`<div class="stars ratingLink" onclick="goToProductReviews()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();goToProductReviews()}" role="button" tabindex="0" aria-label="Rated ${p.rating} out of 5 from ${p.reviewCount} reviews"><span class="starsIcon">${starsMarkup(p.rating)}</span> <span>${p.rating} · ${p.reviewCount} reviews</span></div>`:''}
      <p>${escapeHtml(p.short)}</p>
      ${soldOut?'':`<div class="detailVariants">${p.variants.filter(x=>x.active).map(x=>`<button class="${x.id===v.id?'active':''}" onclick="selectedVariants['${p.id}']='${x.id}';openProduct('${p.id}')">${escapeHtml(x.label)}<small>${money(x.price)}</small></button>`).join('')}</div>`}
      <div class="detailPrice"><b>${money(v.price)}</b><del>${money(v.mrp)}</del>${v.mrp>v.price?`<em>Save ${money(v.mrp-v.price)}</em>`:''}</div>
      ${v.weight&&v.weight!==v.label?`<div class="detailWeight">Net weight: ${escapeHtml(v.weight)}</div>`:''}
      ${detailActions}
      ${productTrustMarkup(p)}
    </div></div>
    <div class="detailInfoStack">${infoSections}${reviewsSection}</div>
    ${relatedHtml ? `<div class="detailRelated">${relatedHtml}</div>` : ''}`;
  $('productOverlay').classList.add('open');document.body.classList.add('modalOpen');
  bindGalleryScrollers(); bindComboGalleryScrollers();
  loadProductReviews(p.id);
  setProductSeo(p,v);
  track('view_item',{currency:'INR',value:v.price,items:[gaItem(p,v,1)]});
}
function closeProduct(){const wasOpen=$('productOverlay').classList.contains('open');openProductId=null;$('productOverlay').classList.remove('open');document.body.classList.remove('modalOpen');if(wasOpen)clearProductSeo()}

/* ---------- Back-button / history sync (item 12) ---------- */
// Not a routing framework — deliberately kept small per the spec. Every
// overlay in this app (cart, product detail, search, account, checkout)
// is opened from several different call sites via a plain
// classList.add('open'), so instead of touching every one of those call
// sites individually (higher risk of missing one), this watches the
// overlays' class attribute directly: whenever any overlay becomes
// open, it pushes exactly one history entry; whenever it's dismissed
// (Escape, backdrop click, an explicit close button — anything that
// removes the 'open' class) it consumes that same entry via
// history.back() so the two states never drift apart. The result:
// pressing the hardware/browser/gesture Back button while any overlay
// is open closes that overlay and returns to the underlying page —
// exactly like closing it any other way — instead of leaving the site
// or losing where the customer was.
function initBackNavigation(){
  const overlayIds=['cartOverlay','productOverlay','searchOverlay','accountOverlay','checkoutOverlay','mobileMenu','welcomeOverlay','storyOverlay'];
  let pushedForOverlay=false;
  const anyOverlayOpen=()=>overlayIds.some(id=>$(id)?.classList.contains('open'));
  const observer=new MutationObserver(()=>{
    const isOpen=anyOverlayOpen();
    if(isOpen && !pushedForOverlay){
      pushedForOverlay=true;
      history.pushState({jayviOverlay:true}, '', location.href);
    }else if(!isOpen && pushedForOverlay){
      // Closed via a UI action (not Back) while our entry is still the
      // current one — consume it so a later Back press doesn't land on
      // a dead, already-dismissed overlay state.
      // V33 fix: deferred one tick, because closing one overlay and
      // opening the next can happen in two separate click listeners
      // (e.g. mobile menu link → product). Without the deferral,
      // history.back() fired between them and its popstate then closed
      // the newly opened overlay.
      setTimeout(()=>{
        if(anyOverlayOpen()||!pushedForOverlay) return;
        pushedForOverlay=false;
        if(history.state?.jayviOverlay) history.back();
      },0);
    }
  });
  overlayIds.forEach(id=>{ const el=$(id); if(el) observer.observe(el,{attributes:true,attributeFilter:['class']}); });
  window.addEventListener('popstate', ()=>{
    // A real Back press: if something is still open at this point, it
    // means Back itself is what should close it (the case above already
    // handled UI-driven closes and won't still show anything open here).
    if(anyOverlayOpen()){
      closeCart();closeProduct();closeSearch();closeAccount();closeCheckout();closeMenu();closeWelcomePopup(true);closeStory();
      pushedForOverlay=false;
    }
  });
}

/* ---------- Misc UI ---------- */
function toggleMenu(){$('mobileMenu').classList.toggle('open');$('menuScrim')?.classList.toggle('open')}
function closeMenu(){$('mobileMenu').classList.remove('open');$('menuScrim')?.classList.remove('open')}
function initOverlayDismissal(){
  document.querySelectorAll('.overlay').forEach(o=>o.addEventListener('click',e=>{
    if(e.target!==o)return;
    if(o.id==='cartOverlay')closeCart();
    else if(o.id==='productOverlay')closeProduct();
    else if(o.id==='searchOverlay')closeSearch();
    else if(o.id==='accountOverlay')closeAccount();
    else if(o.id==='checkoutOverlay')closeCheckout();
    else if(o.id==='welcomeOverlay')closeWelcomePopup(true);
    else if(o.id==='storyOverlay')closeStory();
    else if(o.id==='offersOverlay')closeOffersPanel();
  }));
  document.addEventListener('keydown',e=>{
    if(e.key!=='Escape')return;
    closeCart();closeProduct();closeSearch();closeAccount();closeCheckout();closeMenu();closeWelcomePopup(true);closeStory();toggleMegaMenu(false);
  });
}
let toastTimer;
function showToast(t){
  clearTimeout(toastTimer);
  const el=$('toast'); el.innerHTML=`<strong>${escapeHtml(t)}</strong>`;
  el.classList.add('show');
  toastTimer=setTimeout(()=>el.classList.remove('show'),2800);
}
function showCartAddedToast(productName){
  clearTimeout(toastTimer);
  const el=$('toast');
  el.innerHTML = `<span class="toastRow"><strong>✓ ${escapeHtml(productName)} added to your bag</strong><button onclick="openCart()">View Cart</button></span>`;
  el.classList.add('show');
  toastTimer=setTimeout(()=>el.classList.remove('show'),3600);
}
function applyVacation(){
  const banner=$('vacationBanner');
  if(CONFIG.store?.vacationMode){
    if(banner){banner.style.display='block';banner.textContent=CONFIG.store.vacationMessage||'Orders are temporarily paused while Jayvi Foods is away.'}
    document.querySelectorAll('.pcActions button,.comboActions button').forEach(b=>{b.disabled=true;b.textContent='Orders paused'});
  }else if(banner){banner.style.display='none'}
}
function setupAnnouncementTicker(){ /* V33: replaced by renderAnnouncementBar() (rotating, Admin-configured) */ }


/* =========================================================================
   V33 — Site content, brand theme, navigation, homepage sections,
   welcome popup, analytics. Everything below reads Admin-managed data
   (SITE ← public.site_content, merged over JAYVI_SITE_DEFAULTS from
   site-content-defaults.js) or existing catalogue/store data. No
   prices, thresholds or coupon codes are hard-coded here.
   ========================================================================= */
if(typeof JAYVI_SITE_DEFAULTS==='undefined'){ window.JAYVI_SITE_DEFAULTS={announcement_bar:{enabled:false,messages:[]},welcome_popup:{enabled:false},brand:{},homepage:{sectionOrder:[],sections:{}}}; }
if(typeof jayviDeepMerge==='undefined'){ window.jayviDeepMerge=(a,b)=>structuredClone(b??a); }
let SITE=structuredClone(JAYVI_SITE_DEFAULTS);
let siteContentLive=false;      // true only when site_content was actually read from Supabase
const socialLinkUrls={};        // platform -> url, from public.social_links
let occasionFilter=null;        // {label, ids[]} — set by "Shop by occasion" cards

async function loadSiteContent(){
  try{
    const {data,error}=await sb.from('site_content').select('id,data');
    if(error) throw error;
    (data||[]).forEach(r=>{ if(JAYVI_SITE_DEFAULTS[r.id]) SITE[r.id]=jayviDeepMerge(JAYVI_SITE_DEFAULTS[r.id], r.data||{}); });
    siteContentLive=true;
    return true;
  }catch(err){
    console.warn('Site content: using built-in defaults (Supabase site_content fetch failed — has supabase_migration_v33_brand_upgrade.sql been run?):', err?.message||err);
    return false;
  }
}
function sec(id){ return (SITE.homepage&&SITE.homepage.sections&&SITE.homepage.sections[id])||{}; }
const prefersReducedMotion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function safeHref(u){
  const s=String(u||'').trim();
  if(!s) return '#';
  if(/^(#|\/|\.\/|https?:\/\/|mailto:|tel:)/i.test(s) || /^[a-z0-9_-]+\.html(#.*)?$/i.test(s)) return s;
  return '#';
}
function safeIcon(i){ return /^fa-[a-z0-9-]+$/.test(String(i||''))?i:'fa-leaf'; }
function imgTag(path,sizes,alt,extra=''){
  if(!path) return '';
  const a=responsiveImgAttrs(path,sizes);
  return `<img src="${escapeHtml(a.src)}"${a.srcset?` srcset="${escapeHtml(a.srcset)}" sizes="${escapeHtml(a.sizes)}"`:''} alt="${escapeHtml(alt||'')}" loading="lazy" decoding="async" onerror="this.onerror=null;this.removeAttribute('srcset');this.src='images/brand/placeholder.svg'" ${extra}>`;
}
// V34.1 — image types. 'packshot' = product/pouch shot → shown whole
// (object-fit:contain), never cropped. 'lifestyle' = food/lifestyle photo →
// fills its frame (cover). Anything borrowed from a product is a packshot.
function isPackshot(type,borrowedFromProduct){ return borrowedFromProduct || type==='packshot'; }
// V34.2 — pack frames that match the photo. When a pack shot was photographed
// on light grey (not white), its frame would show a grey "box". We sample the
// image corners (through a separate probe image, so the visible image is never
// affected) and, if they're one uniform light neutral, paint the frame that
// colour. If the image host doesn't allow sampling, the frame simply keeps the
// default pack background. Admin: Brand → packBackgroundAuto.
const _packBgCache=new Map();
function samplePackBg(url){
  if(_packBgCache.has(url)) return _packBgCache.get(url);
  const pr=new Promise(res=>{
    const probe=new Image(); probe.crossOrigin='anonymous'; probe.decoding='async';
    probe.onload=()=>{ try{
      const c=document.createElement('canvas'); c.width=c.height=16; const x=c.getContext('2d',{willReadFrequently:true});
      x.drawImage(probe,0,0,16,16);
      const px=[[0,0],[15,0],[0,15],[15,15],[7,0],[0,7]].map(([a,b])=>x.getImageData(a,b,1,1).data);
      if(px.some(p=>p[3]<250)) return res(null);                 // transparent PNG → keep the default ground
      const avg=[0,1,2].map(i=>px.reduce((t,p)=>t+p[i],0)/px.length);
      const uniform=px.every(p=>[0,1,2].every(i=>Math.abs(p[i]-avg[i])<=10));
      const light=avg.every(v=>v>=205), neutral=Math.max(...avg)-Math.min(...avg)<=18;
      res(uniform&&light&&neutral?`rgb(${avg.map(Math.round).join(',')})`:null);
    }catch{ res(null); } };
    probe.onerror=()=>res(null);
    probe.src=url;
  });
  _packBgCache.set(url,pr); return pr;
}
function initPackBgMatching(){
  if(SITE.brand?.packBackgroundAuto===false) return;
  document.addEventListener('load',e=>matchPackBg(e.target),true);
  // images that were already loaded (e.g. from cache) before this ran
  const sweep=()=>document.querySelectorAll('.fit-pack img,.cardMediaFrame img').forEach(i=>{ if(i.complete&&i.naturalWidth) matchPackBg(i); });
  setTimeout(sweep,0); setTimeout(sweep,2500);
}
function matchPackBg(img){
    if(!(img instanceof HTMLImageElement)) return;
    const box=img.closest('.fit-pack,.cardMediaFrame'); if(!box) return;
    const url=img.currentSrc||img.src; if(!url||url.startsWith('data:')||/placeholder\.svg/.test(url)) return;
    samplePackBg(url).then(bg=>{ if(bg && (img.currentSrc||img.src)===url) (img.closest('.cardMediaSlide')||box).style.setProperty('background',bg,'important'); });
}
// V34.2 — ONE image treatment used by every homepage image module.
//   fit-pack: whole product, contain, centred, on the neutral pack ground
//   fit-life: fills the frame (cover) around the Admin focal point
function fitAttrs(pack,focus){
  return pack ? ' fit-pack contain' : ` fit-life" style="--focus:${focusToCss(focus)}`;
}
function fmtDate(d){ try{ return new Date(d+'T00:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short'}); }catch{ return d; } }
function scrollToSection(id){
  const el=$(id); if(!el) return;
  if(el.hidden && (el.dataset.section==='shop')) el.hidden=false;
  el.scrollIntoView({behavior:prefersReducedMotion()?'auto':'smooth',block:'start'});
}
function scrollRow(id,dir){ const el=$(id); if(el) el.scrollBy({left:dir*el.clientWidth*0.85,behavior:prefersReducedMotion()?'auto':'smooth'}); }

/* ---------- Analytics (GA4 via gtag if configured, else dataLayer) ---------- */
function gaItem(p,v,qty=1){ return {item_id:v?.sku||p?.id, item_name:p?.name, item_category:p?catName(p.category):'', item_variant:v?.label||'', price:Number(v?.price||0), quantity:qty}; }
function track(event,params={}){
  try{
    if(typeof window.gtag==='function') window.gtag('event',event,params);
    else { window.dataLayer=window.dataLayer||[]; window.dataLayer.push({event,...params}); }
    if(/[?&]debug=analytics/.test(location.search)) console.info('[analytics]',event,params);
  }catch{}
}
function initAnalytics(){
  const id=String((SITE.brand&&SITE.brand.analytics&&SITE.brand.analytics.ga4Id)||'').trim();
  if(!/^G-[A-Z0-9]{4,}$/i.test(id)) return;
  const s=document.createElement('script'); s.async=true; s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);
  document.head.appendChild(s);
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){ window.dataLayer.push(arguments); };
  window.gtag('js',new Date()); window.gtag('config',id);
}
function initOutboundTracking(){
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href]'); if(!a) return;
    const h=a.getAttribute('href')||'';
    if(/wa\.me|whatsapp\.com/i.test(h)) track('whatsapp_click',{link_url:h.split('?')[0]});
    else if(/instagram\.com/i.test(h)) track('instagram_click',{link_url:h});
  },{capture:true});
}

/* ---------- Brand theme / contact / SEO ---------- */
let BASE_SEO={title:document.title,desc:''};
function setMeta(attr,key,val){
  let m=document.querySelector(`meta[${attr}="${key}"]`);
  if(!m){ m=document.createElement('meta'); m.setAttribute(attr,key); document.head.appendChild(m); }
  m.setAttribute('content',val);
}
function applyBrandTheme(){
  // V34.2: neutral ground for every pack shot (Admin → Brand → Pack shot background)
  const pb=String(SITE.brand?.packBackground||'').trim();
  if(/^#[0-9a-f]{3,8}$/i.test(pb)) document.documentElement.style.setProperty('--pack-bg',pb);
  const b=SITE.brand||{}, c=b.colors||{};
  const map={maroon:'--jayvi-maroon',green:'--jayvi-green',gold:'--jayvi-gold',cream:'--jayvi-cream',sand:'--jayvi-sand',text:'--jayvi-text'};
  Object.entries(map).forEach(([k,v])=>{ if(/^#[0-9a-f]{6}$/i.test(c[k]||'')) document.documentElement.style.setProperty(v,c[k]); });
  if(/^#[0-9a-f]{6}$/i.test(c.maroon||'')) setMeta('name','theme-color',c.maroon);
  if(b.logoUrl) document.querySelectorAll('[data-brand-logo]').forEach(img=>{ img.removeAttribute('srcset'); img.src=b.logoUrl; });
  // V34: Admin SEO overrides now keep og:*, twitter:* and the share-image
  // alt/dimensions in step. NOTE: social scrapers (WhatsApp, Facebook…)
  // do not run JavaScript — they always read the static tags in
  // index.html, which were made brand-wide in V34. These runtime
  // overrides mainly help Google (which renders JS) and in-browser shares.
  const seo=b.seo||{};
  if(seo.homeTitle){ document.title=seo.homeTitle; setMeta('property','og:title',seo.homeTitle); setMeta('name','twitter:title',seo.homeTitle); }
  if(seo.homeDescription){ setMeta('name','description',seo.homeDescription); setMeta('property','og:description',seo.homeDescription); setMeta('name','twitter:description',seo.homeDescription); }
  if(seo.ogImage){
    let abs=seo.ogImage; try{ abs=new URL(seo.ogImage,location.href).href; }catch{}
    setMeta('property','og:image',abs); setMeta('property','og:image:secure_url',abs); setMeta('name','twitter:image',abs);
    // A replacement image may not be 1200×630 — drop the static size hints rather than state wrong ones.
    ['og:image:width','og:image:height','og:image:type'].forEach(k=>document.querySelector(`meta[property="${k}"]`)?.remove());
  }
  if(seo.ogImageAlt){ setMeta('property','og:image:alt',seo.ogImageAlt); setMeta('name','twitter:image:alt',seo.ogImageAlt); }
  BASE_SEO={title:document.title, desc:document.querySelector('meta[name="description"]')?.getAttribute('content')||''};
}
function waUrl(text){
  const n=String(CONFIG.store.whatsapp||'').replace(/\D/g,'');
  if(!n) return '';
  return `https://wa.me/${n}${text?`?text=${encodeURIComponent(text)}`:''}`;
}
function instagramUrl(){ return sec('social').profileUrl || socialLinkUrls.instagram || CONFIG.store.instagram || ''; }
function applyContactLinks(){
  const b=SITE.brand||{};
  document.querySelectorAll('[data-wa-link]').forEach(a=>{ const u=waUrl(a.dataset.waText||''); if(u){ a.href=u; a.hidden=false; } else a.hidden=true; });
  document.querySelectorAll('[data-ig-link]').forEach(a=>{ const u=instagramUrl(); if(u){ a.href=u; a.hidden=false; } else a.hidden=true; });
  document.querySelectorAll('[data-brand-email]').forEach(a=>{ if(b.contactEmail){ a.href='mailto:'+b.contactEmail; a.textContent=b.contactEmail; a.hidden=false; } else a.hidden=true; });
  document.querySelectorAll('[data-brand-phone]').forEach(a=>{ if(b.contactPhone){ a.href='tel:'+b.contactPhone.replace(/[^\d+]/g,''); a.textContent=b.contactPhone; a.hidden=false; } else a.hidden=true; });
  document.querySelectorAll('[data-brand-tagline]').forEach(el=>{ if(b.footerTagline) el.textContent=b.footerTagline; });
  document.querySelectorAll('[data-brand-fssai]').forEach(el=>{ if(b.fssai) el.textContent=b.fssai; });
  document.querySelectorAll('[data-brand-udyam]').forEach(el=>{ if(b.udyam) el.textContent=b.udyam; });
  if($('copyYear')) $('copyYear').textContent=new Date().getFullYear();
}

/* ---------- Homepage section visibility / order / titles ---------- */
const SELF_MANAGED_SECTIONS=new Set(['welcomeOffer','promo','howToEnjoy','heritage','social','newsletter','mealMatch']);
function applySectionConfig(){
  const order=[...(SITE.homepage.sectionOrder||[])];
  Object.keys(JAYVI_SITE_DEFAULTS.homepage.sections||{}).forEach(k=>{ if(!order.includes(k)) order.push(k); });
  document.querySelectorAll('main#home>[data-section]').forEach(el=>{
    const id=el.dataset.section, c=sec(id);
    const idx=order.indexOf(id);
    el.style.order=String(idx>=0?idx:99);
    if(c.enabled===false) el.hidden=true;
    else if(!SELF_MANAGED_SECTIONS.has(id)) el.hidden=false;
    const t=el.querySelector('[data-sec-title]'); if(t&&c.title) t.textContent=c.title;
    const e=el.querySelector('[data-sec-eyebrow]'); if(e&&typeof c.eyebrow==='string') e.textContent=c.eyebrow;
  });
}

/* ---------- Announcement bar ---------- */
let annTimer=null, annIndex=0;
function annMessages(){
  const cfg=SITE.announcement_bar||{};
  const fill=t=>fillOfferText(String(t||'').replace(/\{freeShippingThreshold\}/g,money(CONFIG.store.freeShippingThreshold)).replace(/\{shippingFlat\}/g,money(CONFIG.store.shippingFlat)));
  let msgs=(cfg.messages||[]).filter(m=>m&&m.enabled!==false&&m.text).map(m=>({text:fill(m.text),link:m.link||''}));
  // Never advertise the welcome offer when the popup that delivers it is off.
  if(!welcomeEnabled()) msgs=msgs.filter(m=>m.link!=='#welcome');
  if(!(Number(CONFIG.store.freeShippingThreshold)>0)) msgs=msgs.filter(m=>!/free shipping/i.test(m.text));
  if(cfg.includeLiveOffers) (activeOffers||[]).forEach(o=>msgs.push({text:`🎉 ${offerLabel(o)}${o.min_order_value?` on orders above ${money(o.min_order_value)}`:''} — use code ${o.code}`,link:'#offers'}));
  return msgs;
}
function renderAnnouncementBar(){
  const bar=$('annBar'); if(!bar) return;
  clearInterval(annTimer);
  const cfg=SITE.announcement_bar||{};
  const msgs=annMessages();
  if(cfg.enabled===false||!msgs.length){ bar.hidden=true; bar.innerHTML=''; return; }
  bar.hidden=false;
  const item=(m,cls)=>m.link
    ?`<a class="annMsg ${cls}" href="${escapeHtml(safeHref(m.link))}"${/^https?:/i.test(m.link)?' target="_blank" rel="noopener"':''}>${escapeHtml(m.text)}</a>`
    :`<span class="annMsg ${cls}">${escapeHtml(m.text)}</span>`;
  if(cfg.mode==='marquee'){
    bar.classList.add('marquee');
    const once=msgs.map(m=>item(m,'')).join('');
    bar.innerHTML=`<div class="annTrack">${once}<span aria-hidden="true" style="display:contents">${once}</span></div>`;
    return;
  }
  bar.classList.remove('marquee');
  annIndex=0;
  bar.innerHTML=msgs.map((m,i)=>item(m,i===0?'on':'')).join('')+(msgs.length>1?`<button class="annNav annPrev" onclick="annStep(-1)" aria-label="Previous announcement"><i class="fa-solid fa-chevron-left" aria-hidden="true"></i></button><button class="annNav annNext" onclick="annStep(1)" aria-label="Next announcement"><i class="fa-solid fa-chevron-right" aria-hidden="true"></i></button>`:'');
  if(msgs.length>1){
    const ms=Math.max(2,Number(cfg.intervalSeconds)||4)*1000;
    annTimer=setInterval(()=>{ if(!bar.matches(':hover')&&!document.hidden) annStep(1); },ms);
  }
}
function annStep(d){
  const els=[...document.querySelectorAll('#annBar .annMsg')]; if(!els.length) return;
  els[annIndex%els.length]?.classList.remove('on');
  annIndex=(annIndex+d+els.length)%els.length;
  els[annIndex].classList.add('on');
}

/* ---------- Navigation: mega menu, mobile product groups, footer ---------- */
function productGroups(){
  return categories.map(c=>({c,items:products.filter(p=>p.category===c.id||(p.categories||[]).includes(c.id))})).filter(g=>g.items.length);
}
function renderNavigation(){
  const groups=productGroups();
  const combos=(CONFIG.combos||[]).filter(c=>c.active);
  const hasNew=products.some(isProductNew);
  const mega=$('megaMenu');
  if(mega){
    mega.innerHTML=groups.map(g=>`<div class="megaCol"><b><a href="#category/${encodeURIComponent(g.c.id)}">${escapeHtml(g.c.name)}</a></b>${g.items.map(p=>`<a href="#product/${encodeURIComponent(p.id)}">${escapeHtml(p.name)}</a>`).join('')}</div>`).join('')
      +(combos.length?`<div class="megaCol"><b><a href="#combos">Combos</a></b>${combos.slice(0,6).map(c=>`<a href="#combos">${escapeHtml(c.name)}</a>`).join('')}</div>`:'')
      +`<div class="megaCol explore"><b>Explore</b><a href="#best-sellers">Best Sellers</a>${hasNew?'<a href="#new-arrivals">New Arrivals</a>':''}<a href="#offers">Offers</a><a href="#shop">All products</a></div>`;
  }
  const mm=$('menuProducts');
  if(mm){
    mm.innerHTML=groups.map(g=>`<a class="menuCat" href="#category/${encodeURIComponent(g.c.id)}" onclick="closeMenu()">${escapeHtml(g.c.name)}</a>${g.items.map(p=>`<a href="#product/${encodeURIComponent(p.id)}" onclick="closeMenu()">${escapeHtml(p.name)}</a>`).join('')}`).join('')
      +(combos.length?`<a class="menuCat" href="#combos" onclick="closeMenu()">Combos</a>`:'');
  }
  const fl=$('footerCategoryLinks');
  if(fl) fl.innerHTML=groups.slice(0,5).map(g=>`<a href="#category/${encodeURIComponent(g.c.id)}">${escapeHtml(g.c.name)}</a>`).join('');
  // New Arrivals nav entry only when there is something new.
  document.querySelectorAll('a[href="#new-arrivals"]').forEach(a=>{ if(!a.closest('.megaCol')) a.hidden=!hasNew; });
}
function toggleMegaMenu(force){
  const d=$('catDrop'); if(!d) return;
  const open=force!==undefined?force:!d.classList.contains('open');
  d.classList.toggle('open',open);
  d.querySelector('button')?.setAttribute('aria-expanded',String(open));
}
function initMegaMenu(){
  const d=$('catDrop'); if(!d) return;
  let t;
  d.addEventListener('mouseenter',()=>{ if(window.matchMedia('(hover:hover)').matches){ clearTimeout(t); toggleMegaMenu(true); } });
  d.addEventListener('mouseleave',()=>{ if(window.matchMedia('(hover:hover)').matches){ t=setTimeout(()=>toggleMegaMenu(false),180); } });
  document.addEventListener('click',e=>{ if(!e.target.closest('#catDrop')) toggleMegaMenu(false); });
}

/* ---------- Hash router (#shop, #best-sellers, #category/x, #product/x …) ---------- */
function goToOffers(){
  const vis=id=>{ const el=$(id); return el && !el.hidden && el.style.display!=='none'; };
  if(vis('offersSection')) return scrollToSection('offersSection');
  if(vis('promoBanner')) return scrollToSection('promoBanner');
  if(vis('welcomeOffer')) return scrollToSection('welcomeOffer');
  openOffersPanel();
}
const ROUTES={
  home:()=>window.scrollTo({top:0,behavior:prefersReducedMotion()?'auto':'smooth'}),
  shop:()=>{ mealFilter=null; discoveryFilter=null; occasionFilter=null; cat='all'; renderCategories(); renderProducts(); scrollToSection('shop'); },
  categories:()=>scrollToSection('shopByCategory'),
  'best-sellers':()=>viewAllDiscovery('best'),
  'new-arrivals':()=>viewAllDiscovery('new'),
  popular:()=>viewAllDiscovery('popular'),
  healthy:()=>viewAllDiscovery('healthy'),
  combos:()=>scrollToSection('combos'),
  offers:()=>goToOffers(),
  track:()=>openTrackOrder(),
  wishlist:()=>openWishlist(),
  account:()=>openAccount(),
  cart:()=>openCart(),
  search:()=>openSearch(),
  welcome:()=>openWelcomePopup('link'),
  story:()=>openStory(),
  reviews:()=>scrollToSection('reviews')
};
function navigate(hash){
  const h=String(hash||'').replace(/^#/,'');
  if(!h) return false;
  const [key,...rest]=h.split('/'); const arg=rest.join('/');
  closeMenu(); toggleMegaMenu(false);
  if(key==='product'&&arg){ closeSearch(); openProduct(decodeURIComponent(arg)); return true; }
  if(key==='category'&&arg){ filterByCategory(decodeURIComponent(arg)); return true; }
  if(ROUTES[key]){ ROUTES[key](); return true; }
  if(document.getElementById(h)){ scrollToSection(h); return true; }
  return false;
}
function initRouter(){
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href^="#"]'); if(!a) return;
    const href=a.getAttribute('href');
    if(href==='#'){ if(a.hasAttribute('data-wa-link')) e.preventDefault(); return; }
    if(navigate(href)) e.preventDefault();
  });
  const handle=()=>{ const h=location.hash; if(h.length>1){ history.replaceState(history.state,'',location.pathname+location.search); navigate(h); } };
  window.addEventListener('hashchange',handle);
  if(location.hash.length>1) setTimeout(handle,60);
}

/* ---------- Homepage sections ---------- */
function resolveProducts(ids,keywords){
  if(ids&&ids.length) return ids.map(getProduct).filter(Boolean);
  const kws=(keywords||[]).map(k=>String(k).toLowerCase().trim()).filter(Boolean);
  const seen=new Set(), out=[];
  kws.forEach(k=>products.forEach(p=>{ if(!seen.has(p.id)&&String(p.name).toLowerCase().includes(k)){ seen.add(p.id); out.push(p); } }));
  return out;
}
const isRealImg=u=>!!u&&!/placeholder\.svg/.test(u);
function firstRealImage(list){ return (list||[]).map(x=>x&&x.image).find(isRealImg)||(list||[]).map(x=>x&&x.image).find(Boolean)||''; }
function findProduct(id,keyword){
  if(id){ const p=getProduct(id); if(p) return p; }
  return keyword?(resolveProducts([],[keyword])[0]||null):null;
}
function renderWelcomeStrip(){
  const el=$('welcomeOffer'), box=$('welcomeCard'); if(!el||!box) return;
  const c=sec('welcomeOffer'), usesPopup=c.action!=='link', st=welcomeState();
  if(c.enabled===false || (usesPopup && !welcomeEnabled() && c.hideWhenPopupDisabled!==false) || (!usesPopup && !c.link)){ el.hidden=true; return; }
  el.hidden=false;
  if(usesPopup && st.code){
    box.innerHTML=`<div><div class="eyebrow">${escapeHtml(c.eyebrow||'')}</div><h2>Your welcome code is ready</h2><p>Use <b>${escapeHtml(st.code)}</b> at checkout.</p></div><a class="btn onDark" href="#shop">Shop now <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>`;
    return;
  }
  const label=escapeHtml(fillOfferText(c.ctaLabel||'Shop now'));
  const btn=usesPopup?`<button class="btn onDark" onclick="openWelcomePopup('strip')">${label}</button>`:`<a class="btn onDark" href="${escapeHtml(safeHref(c.link))}">${label}</a>`;
  box.innerHTML=`<div><div class="eyebrow">${escapeHtml(c.eyebrow||'')}</div><h2>${escapeHtml(fillOfferText(c.title||''))}</h2>${c.text?`<p>${escapeHtml(fillOfferText(c.text))}</p>`:''}</div>${btn}`;
}
function inDateRange(start,end){
  const now=new Date();
  if(start && now<new Date(start+'T00:00:00')) return false;
  if(end && now>new Date(end+'T23:59:59')) return false;
  return true;
}
function renderPromo(){
  const el=$('promoBanner'), box=$('promoGrid'), c=sec('promo'); if(!el||!box) return;
  if(c.enabled===false||!c.title||!inDateRange(c.startDate,c.endDate)){ el.hidden=true; return; }
  const items=(c.productIds||[]).map(getProduct).filter(Boolean);
  el.hidden=false;
  box.innerHTML=`<div><div class="eyebrow">${escapeHtml(c.eyebrow||'')}</div><h2>${escapeHtml(c.title)}</h2>${c.text?`<p>${escapeHtml(c.text)}</p>`:''}
    ${items.length?`<div class="pairings" style="margin-top:14px">${items.map(p=>`<span>${escapeHtml(p.name)}</span>`).join('')}</div>`:''}
    ${c.ctaLabel&&c.ctaTarget?`<div class="heroBtns"><a class="btn onDark" href="${escapeHtml(safeHref(c.ctaTarget))}">${escapeHtml(c.ctaLabel)} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a></div>`:''}
    ${c.endDate?`<div class="promoDates">Offer ends ${escapeHtml(fmtDate(c.endDate))}</div>`:''}</div>
    ${c.image?`<div class="promoImg${fitAttrs(isPackshot(c.imageType),c.imageFocus)}">${imgTag(c.image,'(max-width:767px) 92vw, 560px',c.title)}</div>`:''}`;
}
function renderWhy(){
  const box=$('whyGrid'); if(!box) return;
  const items=(sec('why').items||[]).filter(i=>i&&i.title);
  box.innerHTML=items.map(i=>`<div class="whyItem"><i class="fa-solid ${safeIcon(i.icon)}" aria-hidden="true"></i><b>${escapeHtml(i.title)}</b>${i.text?`<small>${escapeHtml(i.text)}</small>`:''}</div>`).join('');
  if(!items.length && $('whyJayvi')) $('whyJayvi').hidden=true;
}
function renderHowToEnjoy(){
  const el=$('howToEnjoy'), box=$('enjoyGrid'), c=sec('howToEnjoy'); if(!el||!box) return;
  const cards=(c.items||[]).map(it=>{
    const p=findProduct(it.productId,it.keyword);
    if(!p && !it.image) return '';
    const img=it.image||p?.image||'';
    const pack=isPackshot(it.imageType,!it.image);
    const pair=(Array.isArray(it.pairings)?it.pairings:String(it.pairings||'').split(',')).map(s=>String(s).trim()).filter(Boolean);
    return `<button class="enjoyCard" type="button"${p?` onclick="openProduct('${p.id}')"`:''}><div class="enjoyImg${fitAttrs(pack,it.imageFocus)}">${imgTag(img,'(max-width:767px) 72vw, 300px',it.title||p?.name)}</div><div class="enjoyBody"><h3>${escapeHtml(it.title||p?.name||'')}</h3><div class="pairings">${pair.map(x=>`<span>${escapeHtml(x)}</span>`).join('')}</div></div></button>`;
  }).filter(Boolean).join('');
  el.hidden=c.enabled===false||!cards;
  box.innerHTML=cards;
}
function renderHeritage(){
  const el=$('heritageStory'), box=$('heritageGrid'), c=sec('heritage'); if(!el||!box) return;
  const p=findProduct(c.productId,c.productKeyword);
  const target=c.ctaTarget||(p?`#product/${encodeURIComponent(p.id)}`:'');
  if(c.enabled===false||!target){ el.hidden=true; return; }
  el.hidden=false;
  const img=c.image||p?.image||'';
  box.innerHTML=`<div class="heritageImg${fitAttrs(isPackshot(c.imageType,!c.image),c.imageFocus)}">${imgTag(img,'(max-width:767px) 92vw, 440px',c.title)}</div>
    <div class="heritageCopy"><div class="eyebrow">${escapeHtml(c.eyebrow||'')}</div><h2>${escapeHtml(c.title||'')}</h2>${c.text?`<p>${escapeHtml(c.text)}</p>`:''}
    ${c.ctaLabel?`<a class="btn primary" href="${escapeHtml(safeHref(target))}">${escapeHtml(c.ctaLabel)} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>`:''}</div>`;
}
function renderSocialSection(){
  const el=$('socialSection'), box=$('socialInner'), c=sec('social'); if(!el||!box) return;
  const url=instagramUrl();
  const tiles=(c.tiles||[]).filter(t=>t&&t.image);
  if(c.enabled===false||(!url&&!tiles.length)){ el.hidden=true; return; }
  el.hidden=false;
  box.innerHTML=`<div class="socialHead"><div class="eyebrow">${escapeHtml(c.eyebrow||'')}</div><h2 style="font-size:clamp(26px,5.6vw,38px)">${escapeHtml(c.title||'')}</h2>${c.handle?`<span class="handle">${escapeHtml(c.handle)}</span>`:''}</div>
    ${tiles.length?`<div class="socialGrid">${tiles.map(t=>`<a href="${escapeHtml(safeHref(t.link||url))}" target="_blank" rel="noopener" aria-label="${escapeHtml(t.caption||'Instagram post')}">${imgTag(t.image,'(max-width:767px) 33vw, 300px',t.caption||'')}</a>`).join('')}</div>`:''}
    ${url?`<div class="socialCta"><a class="btn primary" href="${escapeHtml(safeHref(url))}" target="_blank" rel="noopener"><i class="fa-brands fa-instagram" aria-hidden="true"></i> ${escapeHtml(c.ctaLabel||'Follow us')}</a></div>`:''}`;
}
function renderAbout(){
  const el=$('about'), box=$('aboutInner'), c=sec('about'); if(!el||!box) return;
  box.innerHTML=`<div><div class="eyebrow">${escapeHtml(c.eyebrow||'')}</div><h2>${escapeHtml(c.title||'')}</h2>${c.text?`<p class="lead">${escapeHtml(c.text)}</p>`:''}${c.body?`<p>${escapeHtml(c.body)}</p>`:''}${c.signoff?`<p class="aboutSignoff">${escapeHtml(c.signoff)}</p>`:''}
    ${c.ctaLabel&&c.story?`<div class="heroBtns"><a class="btn secondary" href="#story">${escapeHtml(c.ctaLabel)} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a></div>`:''}</div>
    ${c.image?`<div class="aboutImg${fitAttrs(isPackshot(c.imageType),c.imageFocus)}">${imgTag(c.image,'(max-width:767px) 92vw, 560px',c.title)}</div>`:''}`;
}
function renderNewsletter(){
  const el=$('newsletter'), box=$('newsInner'), c=sec('newsletter'); if(!el||!box) return;
  const wa=waUrl('Hi Jayvi Foods, please share your latest launches and offers.');
  const pop=welcomeEnabled()&&!welcomeState().code;
  if(c.enabled===false||(!wa&&!pop)){ el.hidden=true; return; }
  el.hidden=false;
  box.innerHTML=`<div class="eyebrow">${escapeHtml(c.eyebrow||'')}</div><h2>${escapeHtml(c.title||'')}</h2>${c.text?`<p>${escapeHtml(c.text)}</p>`:''}
    <div class="newsBtns">${wa?`<a class="btn wa" href="${escapeHtml(wa)}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i> ${escapeHtml(c.whatsappLabel||'WhatsApp')}</a>`:''}${pop?`<button class="btn ghost" onclick="openWelcomePopup('newsletter')">${escapeHtml(c.offerLabel||'Get my welcome offer')}</button>`:''}</div>`;
}
function renderV33Sections(){
  [renderWelcomeStrip,renderPromo,renderWhy,renderHowToEnjoy,renderHeritage,renderSocialSection,renderAbout,renderNewsletter].forEach(fn=>{
    try{ fn(); }catch(err){ console.error(`${fn.name} failed to render:`, err); }
  });
  const mm=$('mealMatch'); if(mm) mm.hidden=sec('mealMatch').enabled!==true;
}

/* ---------- Story modal ---------- */
function openStory(){
  const c=sec('about');
  const paras=String(c.story||c.body||'').split(/\n{2,}/).map(s=>s.trim()).filter(Boolean);
  $('storyContent').innerHTML=`<div class="eyebrow">${escapeHtml(c.eyebrow||'Our story')}</div><h2>${escapeHtml(c.title||'')}</h2><div class="storyBody" style="margin-top:14px">${paras.map(p=>`<p>${escapeHtml(p)}</p>`).join('')}</div><a class="btn primary full" href="#shop" onclick="closeStory()">Shop Jayvi favourites</a>`;
  $('storyOverlay').classList.add('open'); document.body.classList.add('modalOpen');
}
function closeStory(){ $('storyOverlay')?.classList.remove('open'); if(!document.querySelector('.overlay.open')) document.body.classList.remove('modalOpen'); }

/* ---------- First-visit welcome popup (lead capture) ---------- */
const WELCOME_KEY='jayviWelcomeV1';
function welcomeState(){ try{ return JSON.parse(localStorage.getItem(WELCOME_KEY)||'{}')||{}; }catch{ return {}; } }
function saveWelcomeState(s){ try{ localStorage.setItem(WELCOME_KEY,JSON.stringify(s)); }catch{} }
// Popup only runs when Admin enabled it AND the config genuinely came from
// Supabase — never from built-in defaults, because submitting needs the
// live submit_welcome_lead() RPC to issue the code.
function welcomeEnabled(){ return !!(SITE.welcome_popup&&SITE.welcome_popup.enabled) && siteContentLive; }
// V34 display rules (all Admin-configured in Site content → First-visit
// offer popup): audience, frequency, device, and "not while shopping".
// These only decide whether the popup is SHOWN automatically; the #welcome
// link / "Unlock" buttons can still open it on request.
function welcomeAutoAllowed(){
  const c=SITE.welcome_popup||{}, st=welcomeState();
  if(st.code) return false;
  if(c.audience!=='all' && isKnownCustomer()) return false;
  const mobile=window.matchMedia('(max-width:767px)').matches;
  if(c.showOn==='mobile'&&!mobile || c.showOn==='desktop'&&mobile) return false;
  if(c.skipWhenCartHasItems && cart.length) return false;
  const freq=c.frequency||'days';
  if(st.dismissedAt){
    if(freq==='once') return false;
    if(freq==='days'){ const days=Number(c.reshowAfterDays)||0; if(!days || Date.now()-st.dismissedAt < days*864e5) return false; }
  }
  try{ if(sessionStorage.getItem('jayviWelcomeShown')) return false; }catch{}
  return true;
}
function initWelcomePopup(){
  if(!welcomeEnabled()) return;
  if(!welcomeAutoAllowed()) return;
  const delay=Math.max(0,Number(SITE.welcome_popup.delaySeconds)||0)*1000;
  const tryShow=(attempt)=>{
    // Re-checked at show time: the visitor may have signed in / filled the cart during the delay.
    if(!welcomeAutoAllowed()) return;
    // Never interrupt an open cart/checkout/product/menu — wait and retry.
    if(document.querySelector('.overlay.open')||$('mobileMenu')?.classList.contains('open')){ if(attempt<6) setTimeout(()=>tryShow(attempt+1),5000); return; }
    openWelcomePopup('auto');
  };
  setTimeout(()=>tryShow(0),delay);
}
function welcomeFormMarkup(){
  const c=SITE.welcome_popup, f=c.fields||{};
  const field=(key,label,type,attrs)=>f[key]?.show===false?'':`<label for="wm_${key}">${label}${f[key]?.required?' *':''}<input id="wm_${key}" name="${key}" type="${type}" ${attrs}${f[key]?.required?' required':''}></label>`;
  const T=x=>escapeHtml(fillOfferText(x));
  return `${c.image?`<img class="wmImg${isPackshot(c.imageType)?' contain':''}" src="${escapeHtml(c.image)}" alt="" decoding="async">`:''}<div class="wmTop"><div class="wmEyebrow">${T(c.eyebrow||'')}</div>${c.discountLabel?`<div class="wmDiscount">${T(c.discountLabel)}</div>`:''}<h2 id="wmTitle">${T(c.title||'')}</h2></div>
  <form class="wmBody" onsubmit="submitWelcomeLead(event)" novalidate>${c.description?`<p>${T(c.description)}</p>`:''}
    ${field('name','Name','text','autocomplete="name" maxlength="120"')}
    ${field('mobile','Mobile number','tel','inputmode="numeric" autocomplete="tel-national" maxlength="10" placeholder="10-digit mobile"')}
    ${field('email','Email','email','autocomplete="email" maxlength="200" placeholder="you@example.com"')}
    <div class="wmErr" id="wmErr" role="alert"></div>
    <button class="btn primary full" type="submit" id="wmSubmit">${T(c.ctaLabel||'Get my offer')}</button>
    ${c.expiryText?`<p class="wmFine">${T(c.expiryText)}</p>`:''}
    <p class="wmFine">We use your details only to share Jayvi offers and updates. <a href="legal.html#privacy" style="text-decoration:underline">Privacy</a></p>
  </form>`;
}
function welcomeSuccessMarkup(code){
  const c=SITE.welcome_popup, T=x=>escapeHtml(fillOfferText(x)), q=escapeHtml(code);
  const shop=`<a class="btn primary full" href="#shop" onclick="closeWelcomePopup()">${T(c.shopLabel||'Shop now')} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>`;
  const apply=cart.length?`<button class="btn secondary full wmApply" onclick="closeWelcomePopup();applyCouponFromCart('${q}');openCart()">Apply to my basket</button>`:'';
  return `<div class="wmTop"><div class="wmEyebrow">🎉</div><h2 id="wmTitle">${T(c.successTitle||'Your offer is ready')}</h2></div>
  <div class="wmBody">${c.successText?`<p>${T(c.successText)}</p>`:''}
    <div class="wmCode"><span class="wmCodeText"><small>${T(c.codeLabel||'Your coupon:')}</small><b>${q}</b></span><button type="button" onclick="copyWelcomeCode('${q}')">${T(c.copyLabel||'Copy code')}</button></div>
    ${c.expiryText?`<p class="wmFine">${T(c.expiryText)}</p>`:''}${shop}${apply}</div>`;
}
let _welcomeSource='';
function openWelcomePopup(source='manual'){
  if(!welcomeEnabled()){ if(source!=='auto') goToOffers(); return; }
  _welcomeSource=String(source||'').replace(/[^a-z0-9_-]/gi,'').slice(0,20);
  if(source==='auto' && $('checkoutOverlay')?.classList.contains('open')) return;
  try{ sessionStorage.setItem('jayviWelcomeShown','1'); }catch{}
  const st=welcomeState();
  $('welcomeContent').innerHTML=st.code?welcomeSuccessMarkup(st.code):welcomeFormMarkup();
  $('welcomeOverlay').classList.add('open'); document.body.classList.add('modalOpen');
  if(!st.code) setTimeout(()=>$('welcomeContent').querySelector('input')?.focus({preventScroll:true}),120);
  track('popup_view',{source});
}
function closeWelcomePopup(dismissed=false){
  const o=$('welcomeOverlay'); if(!o||!o.classList.contains('open')) return;
  o.classList.remove('open');
  if(!document.querySelector('.overlay.open')) document.body.classList.remove('modalOpen');
  if(dismissed && !welcomeState().code){ saveWelcomeState({dismissedAt:Date.now()}); track('popup_dismiss',{}); }
}
function copyWelcomeCode(code){
  (navigator.clipboard?.writeText(code)||Promise.reject()).then(()=>showToast(`Copied ${code}`)).catch(()=>showToast(`Your code: ${code}`));
}
async function submitWelcomeLead(e){
  e.preventDefault();
  const f=SITE.welcome_popup.fields||{};
  const val=k=>($('wm_'+k)?.value||'').trim();
  const name=val('name'), mobile=val('mobile').replace(/\D/g,'').replace(/^91(?=\d{10}$)/,''), email=val('email');
  const errEl=$('wmErr'), err=m=>{ errEl.textContent=m; return false; };
  for(const [k,label] of [['name','your name'],['mobile','your mobile number'],['email','your email']]){
    if(f[k]?.show!==false && f[k]?.required && !val(k)) return err(`Please enter ${label}.`);
  }
  if(mobile && !/^[6-9]\d{9}$/.test(mobile)) return err('Please enter a valid 10-digit mobile number.');
  if(email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return err('Please enter a valid email address.');
  if(!mobile && !email) return err('Please enter your mobile number or email.');
  errEl.textContent='';
  const btn=$('wmSubmit'), label=btn.textContent;
  btn.disabled=true; btn.textContent='Unlocking your offer…';
  try{
    // V34: the popup's linked promotion (campaign) and what opened it are
    // appended to source_page — the existing column, so no RPC/schema
    // change is needed. Timestamp = leads.created_at (server-set).
    const lp=livePromotions('popup')[0];
    const tag=[lp?`campaign=${lp.id||lp.name}`:'', `via=${_welcomeSource||'popup'}`].filter(Boolean).join('&');
    const sourcePage=(location.pathname+location.search+(tag?(location.search?'&':'?')+tag:'')).slice(0,300);
    const {data,error}=await sb.rpc('submit_welcome_lead',{p_name:name||null,p_mobile:mobile||null,p_email:email||null,p_source_page:sourcePage});
    if(error) throw error;
    const row=Array.isArray(data)?data[0]:data;
    if(!row?.ok || !row.coupon_code){ err(row?.message||'Could not unlock the offer. Please try again.'); btn.disabled=false; btn.textContent=label; return; }
    saveWelcomeState({code:row.coupon_code,at:Date.now()});
    $('welcomeContent').innerHTML=welcomeSuccessMarkup(row.coupon_code);
    track('generate_lead',{source:'welcome_popup'}); track('popup_submit',{});
    renderWelcomeStrip(); renderNewsletter(); renderCart(); renderOffersSection(); renderFloatingOffer();
  }catch(ex){
    console.warn('Welcome lead submit failed:', ex?.message||ex);
    err('We could not connect just now. Please check your connection and try again.');
    btn.disabled=false; btn.textContent=label;
  }
}

/* =========================================================================
   V34 — Promotions (several offers at once)
   Source: site_content 'promotions' (Admin → Site content → Offers &
   promotions), merged over JAYVI_SITE_DEFAULTS.promotions (all inactive).
   A promotion is DISPLAY + RULE METADATA: where it shows, for whom, when,
   its priority. (Combining offers is NOT supported yet.) Whenever it carries a
   coupon code, the discount actually charged is still decided by that
   coupon in Coupons & Offers — validate_coupon() previews it and
   place_order() re-validates it server-side. Nothing here can make the
   server grant a discount it wouldn't otherwise grant.
   If no promotion is configured, every surface falls back to exactly the
   V33 behaviour (live public coupons from list_active_offers()).
   ========================================================================= */
const ORDERED_KEY='jayviHasOrderedV1';
function deviceHasOrdered(){ try{ return !!localStorage.getItem(ORDERED_KEY); }catch{ return false; } }
function markDeviceOrdered(){ try{ localStorage.setItem(ORDERED_KEY,String(Date.now())); }catch{} }
// "Existing customer" as far as the browser can tell: signed in, or this
// device has placed an order. Display only — first-order-only enforcement
// belongs to the coupon (per-customer limit / a server rule).
function isKnownCustomer(){ return !!currentUser || deviceHasOrdered(); }
function audienceOk(a){ if(a==='new') return !isKnownCustomer(); if(a==='existing') return isKnownCustomer(); return true; }
function promoCode(p){ return String(p?.couponCode||'').trim().toUpperCase(); }
function promoLive(p){
  if(!p || p.active!==true || !(p.title||p.shortTitle||p.name) || !inDateRange(p.startDate,p.endDate) || !audienceOk(p.audience)) return false;
  // A sign-up offer is only offered while the popup that delivers its code can run (or the visitor already has the code).
  if(p.codeVisibility==='signup' && !welcomeEnabled() && !welcomeState().code) return false;
  return true;
}
const PROMO_PLACES={homepage:'showOnHomepage',cart:'showInCart',popup:'showInPopup'};
function livePromotions(place){
  const cfg=SITE.promotions||{};
  if(cfg.enabled===false) return [];
  const flag=PROMO_PLACES[place];
  return (cfg.items||[]).filter(p=>promoLive(p) && (!flag || p[flag]===true))
    .sort((a,b)=>(Number(a.priority)||99)-(Number(b.priority)||99));
}
function promotionsConfigured(){ const c=SITE.promotions||{}; return c.enabled!==false && (c.items||[]).some(p=>p&&p.active===true); }
function promoForCode(code){ const c=String(code||'').toUpperCase(); return c ? (SITE.promotions?.items||[]).find(p=>p&&p.active===true&&promoCode(p)===c) || null : null; }
function promoValueLabel(p){
  const v=Number(p.discountValue)||0;
  if(p.discountType==='percentage') return v?`${v}% OFF`:'';
  if(p.discountType==='flat') return v?`${money(v)} OFF`:'';
  if(p.discountType==='bundle') return v?`${money(v)}`:'';
  if(p.discountType==='freeShipping') return 'FREE SHIPPING';
  return '';
}
function promoHeadline(p){ return p.shortTitle||promoValueLabel(p)||p.title||p.name||'Offer'; }
function promoRuleNotes(p){
  const n=[];
  if(Number(p.minOrderValue)>0) n.push(`Min order ${money(p.minOrderValue)}`);
  if(p.appliesTo==='products' && (p.productIds||[]).length){ const names=(p.productIds||[]).map(id=>getProduct(id)?.name).filter(Boolean); if(names.length) n.push(`On ${names.slice(0,3).join(', ')}${names.length>3?'…':''}`); }
  if(p.appliesTo==='categories' && (p.categoryIds||[]).length){ const names=(p.categoryIds||[]).map(catName).filter(Boolean); if(names.length) n.push(`On ${names.join(', ')}`); }
  if(p.audience==='new') n.push('New customers');
  else if(p.audience==='existing') n.push('Returning customers');
  if(p.endDate) n.push(`Ends ${fmtDate(p.endDate)}`);
  if(p.usageNote) n.push(p.usageNote);
  // V34.1: no "can/cannot be combined" claims — combining offers needs
  // backend support that does not exist yet (one coupon code per order).
  return n;
}
// One action per promotion, resolved from its configuration:
//  signup → open the sign-up popup (or apply/show the code already earned)
//  show   → reveal the code + Apply (in cart) / Copy
//  none   → just the CTA link (automatic offers such as combo pricing)
function promoActionMarkup(p,context){
  const id=escapeHtml(p.id||'');
  const code=promoCode(p);
  if(p.codeVisibility==='signup'){
    const wc=welcomeState().code;
    if(wc) return context==='cart'
      ? `<button type="button" class="btn light small" data-promo-act="apply" data-code="${escapeHtml(wc)}">Apply ${escapeHtml(wc)}</button>`
      : `<span class="promoCode"><b>${escapeHtml(wc)}</b><button type="button" data-promo-act="copy" data-code="${escapeHtml(wc)}">Copy</button></span>`;
    return `<button type="button" class="btn ${context==='cart'?'light small':'gold'}" data-promo-act="popup" data-promo="${id}">${escapeHtml(fillOfferText(p.ctaLabel)||'Unlock offer')}</button>`;
  }
  if(p.codeVisibility==='show' && code){
    return context==='cart'
      ? `<button type="button" class="btn light small" data-promo-act="apply" data-code="${escapeHtml(code)}">Apply ${escapeHtml(code)}</button>`
      : `<span class="promoCode"><b>${escapeHtml(code)}</b><button type="button" data-promo-act="copy" data-code="${escapeHtml(code)}">Copy</button></span>${p.ctaTarget&&p.ctaLabel?`<a class="btn gold" href="${escapeHtml(safeHref(p.ctaTarget))}">${escapeHtml(p.ctaLabel)}</a>`:''}`;
  }
  if(context!=='cart' && p.ctaTarget && p.ctaLabel) return `<a class="btn gold" href="${escapeHtml(safeHref(p.ctaTarget))}">${escapeHtml(fillOfferText(p.ctaLabel))}</a>`;
  return '';
}
function promoCardMarkup(p,context='home'){
  const notes=promoRuleNotes(p);
  const img=context==='home'&&p.image?`<div class="promoCardImg${fitAttrs(isPackshot(p.imageType),p.imageFocus)}">${imgTag(p.image,'(max-width:767px) 92vw, 380px',p.title||p.name)}</div>`:'';
  return `<article class="promoOfferCard v34Promo">${img}
    <span class="promoOfferEyebrow">${escapeHtml(p.name||'Jayvi offer')}</span>
    <h3 class="promoOfferHeadline">${escapeHtml(fillOfferText(promoHeadline(p)))}</h3>
    ${p.title&&p.title!==p.shortTitle?`<b class="promoTitle">${escapeHtml(fillOfferText(p.title))}</b>`:''}
    ${p.description?`<p>${escapeHtml(fillOfferText(p.description))}</p>`:''}
    <ul class="promoNotes">${notes.map(t=>`<li>${escapeHtml(t)}</li>`).join('')}</ul>
    <div class="promoActions">${promoActionMarkup(p,context)}</div>
  </article>`;
}
function initPromoActions(){
  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-promo-act]'); if(!b) return;
    const act=b.dataset.promoAct, code=b.dataset.code||'';
    if(act==='popup'){ e.preventDefault(); closeOffersPanel(); if($('cartOverlay')?.classList.contains('open')) closeCart(); openWelcomePopup('promo'); }
    else if(act==='copy'){ e.preventDefault(); copyWelcomeCode(code); }
    else if(act==='apply'){ e.preventDefault(); if(!cart.length){ showToast('Add something to your basket first'); return; } closeOffersPanel(); applyCouponFromCart(code).then(()=>openCart()); }
  });
}
// {discount} in any offer copy → the welcome offer's value ("10%", "₹100").
function welcomeDiscountText(){
  const lp=livePromotions('popup')[0];
  if(lp){ const v=Number(lp.discountValue)||0; if(lp.discountType==='percentage'&&v) return `${v}%`; if(lp.discountType==='flat'&&v) return money(v); }
  const n=Number(SITE.welcome_popup?.discountPercent);
  return n>0?`${n}%`:'';
}
function fillOfferText(t){
  const d=welcomeDiscountText();
  return String(t??'').replace(/\{discount\}/g,d||'a special').replace(/\s{2,}/g,' ').trim();
}

/* ---------- Cart: free-shipping progress + typed coupon ---------- */
function renderShipProgress(t){
  const box=$('shipProgress'); if(!box) return;
  const th=Number(CONFIG.store.freeShippingThreshold)||0;
  if(!cart.length||th<=0){ box.hidden=true; box.innerHTML=''; return; }
  const s=(SITE.brand&&SITE.brand.shipping)||{};
  const done=t.sub>=th, pct=Math.min(100,Math.round(t.sub*100/th));
  const msg=done
    ?escapeHtml(s.unlockedMessage||'Free shipping unlocked')
    :escapeHtml(s.progressMessage||"You're {amount} away from free shipping").replace('{amount}',`<b>${money(t.remaining)}</b>`);
  box.hidden=false; box.className='shipProgress'+(done?' done':'');
  box.innerHTML=`<p>${msg}</p><div class="shipBar" role="progressbar" aria-label="Progress to free shipping" aria-valuemin="0" aria-valuemax="${th}" aria-valuenow="${Math.min(t.sub,th)}"><i style="width:${pct}%"></i></div><div class="shipScale"><span>₹0</span><span>${money(th)}</span></div>`;
}
function applyTypedCoupon(){
  const code=($('couponCodeInput')?.value||'').trim().toUpperCase();
  if(!code){ showToast('Enter a coupon code first'); return; }
  applyCouponFromCart(code);
}

/* ---------- Product page helpers ---------- */
function productTrustMarkup(){
  let pin=''; try{ pin=localStorage.getItem('jayviPinV1')||''; }catch{}
  const items=(SITE.brand&&SITE.brand.productTrust)||[];
  return `<div class="pinCheck"><b><i class="fa-solid fa-truck-fast" aria-hidden="true"></i> Check delivery to your PIN code</b><div class="pinCheckRow"><input id="pdPin" inputmode="numeric" maxlength="6" placeholder="6-digit PIN" aria-label="PIN code" value="${escapeHtml(pin)}" onkeydown="if(event.key==='Enter')checkProductPin()"><button type="button" onclick="checkProductPin()">Check</button></div><div id="pdPinStatus" class="pinStatus" aria-live="polite"></div></div>
  ${items.length?`<div class="detailTrust">${items.map(i=>`<div><i class="fa-solid ${safeIcon(i.icon)}" aria-hidden="true"></i>${escapeHtml(i.text||'')}</div>`).join('')}</div>`:''}`;
}
async function checkProductPin(){
  const pin=($('pdPin')?.value||'').trim(), st=$('pdPinStatus'); if(!st) return;
  if(!/^\d{6}$/.test(pin)){ st.className='pinStatus bad'; st.textContent='Enter a 6-digit Indian PIN code.'; return; }
  try{ localStorage.setItem('jayviPinV1',pin); }catch{}
  if(CONFIG.store.deliveryMode!=='india'){ st.className='pinStatus bad'; st.textContent='Delivery is currently unavailable. Please try again later.'; return; }
  st.className='pinStatus'; st.textContent='Checking…';
  try{
    const {data,error}=await sb.rpc('check_pincode',{p_pincode:pin});
    if(error) throw error;
    const row=data?.[0];
    if(!row||!row.found||!row.effective_serviceable){ st.className='pinStatus bad'; st.textContent=PIN_NOT_SERVICEABLE_MSG; return; }
    const min=row.min_eta_days||CONFIG.store.deliveryMinDays||4, max=row.max_eta_days||CONFIG.store.deliveryMaxDays||8;
    st.className='pinStatus good'; st.textContent=`Delivers to ${pin} in about ${min}–${max} days.`;
  }catch(err){
    st.className='pinStatus'; st.textContent=`We couldn't check right now. Delivery is usually ${CONFIG.store.deliveryMinDays||4}–${CONFIG.store.deliveryMaxDays||8} days; your PIN is confirmed at checkout.`;
  }
}
function sectionShipping(){
  const s=CONFIG.store, th=Number(s.freeShippingThreshold)||0;
  const note=(SITE.brand&&SITE.brand.shipping&&SITE.brand.shipping.deliveryNote)||'';
  const rows=[
    `<div class="kvRow"><b>Delivery time</b><span>${s.deliveryMinDays||4}–${s.deliveryMaxDays||8} days, depending on PIN code</span></div>`,
    th>0?`<div class="kvRow"><b>Free shipping</b><span>On orders of ${money(th)} or more</span></div>`:'',
    Number(s.shippingFlat)>0?`<div class="kvRow"><b>Delivery charge</b><span>${money(s.shippingFlat)}${th>0?` below ${money(th)}`:''} (may vary by PIN)</span></div>`:'',
    `<div class="kvRow"><b>Cash on delivery</b><span>${s.codEnabled?'Available':'Not available right now'}</span></div>`,
    note?`<p style="margin-top:8px">${escapeHtml(note)}</p>`:''
  ].join('');
  return accordion('Shipping & delivery', rows);
}
function goesGreatWithMarkup(p){
  const items=(p.relatedProducts||[]).map(getProduct).filter(x=>x&&x.id!==p.id);
  if(!items.length) return '';
  return `<div class="relatedBlock goesGreat"><h3>Goes great with this ❤️</h3><div class="hScroll">${items.map(productCard).join('')}</div></div>`;
}
function setProductSeo(p,v){
  document.title=p.seoTitle||`${p.name} | ${CONFIG.store.name||'Jayvi Foods'}`;
  const desc=p.seoDescription||p.short||String(p.description||'').slice(0,160);
  if(desc) setMeta('name','description',desc);
  const abs=u=>{ try{ return new URL(u,location.href).href; }catch{ return u; } };
  const imgs=(p.media||[]).filter(m=>m.type!=='video'&&m.path).map(m=>abs(m.path)).slice(0,5);
  const ld={'@context':'https://schema.org','@type':'Product',name:p.name,sku:v?.sku||p.sku||p.id,description:desc||undefined,image:imgs.length?imgs:undefined,brand:{'@type':'Brand',name:CONFIG.store.name||'Jayvi Foods'},
    offers:{'@type':'Offer',priceCurrency:'INR',price:String(v?.price||''),availability:isProductSoldOut(p)?'https://schema.org/OutOfStock':'https://schema.org/InStock',url:location.origin+location.pathname+'#product/'+encodeURIComponent(p.id)}};
  if(Number(p.reviewCount)>0&&Number(p.rating)>0) ld.aggregateRating={'@type':'AggregateRating',ratingValue:String(p.rating),reviewCount:String(p.reviewCount)};
  const put=(id,obj)=>{ let s=document.getElementById(id); if(!obj){ s?.remove(); return; } if(!s){ s=document.createElement('script'); s.type='application/ld+json'; s.id=id; document.head.appendChild(s); } s.textContent=JSON.stringify(obj); };
  put('productLd',ld);
  put('faqLd',p.faq?.length?{'@context':'https://schema.org','@type':'FAQPage',mainEntity:p.faq.map(f=>({'@type':'Question',name:f.question,acceptedAnswer:{'@type':'Answer',text:f.answer}}))}:null);
}
function clearProductSeo(){
  document.title=BASE_SEO.title;
  if(BASE_SEO.desc) setMeta('name','description',BASE_SEO.desc);
  document.getElementById('productLd')?.remove(); document.getElementById('faqLd')?.remove();
}

/* ---------- Boot ---------- */
async function init(){
  CONFIG=loadConfig();
  initOverlayDismissal();
  initBackNavigation();
  // V32.6: products/media/combos come from Supabase now (see
  // loadCatalogFromSupabase). CONFIG.products/CONFIG.combos are
  // overwritten in place when the fetch succeeds; on failure they keep
  // whatever loadConfig() already gave them, so the storefront never
  // renders empty.
  // V32.10: same principle for Categories/Meal tags, via a fully
  // independent function/try-catch — see
  // loadCategoriesAndMealTagsFromSupabase() above.
  // V32.11: same again for Store settings/Announcements/curated
  // Reviews — see loadSettingsAnnouncementsReviewsFromSupabase() above.
  // All three fetches run in parallel; a failure in any one has no
  // effect on the others.
  await Promise.all([loadCatalogFromSupabase(), loadCategoriesAndMealTagsFromSupabase(), loadSettingsAnnouncementsReviewsFromSupabase(), fetchActiveOffers(), loadSiteContent(), fetchApprovedRatings()]);
  applyApprovedRatings();
  sync();
  // V33: brand theme, contact links, analytics, section order/visibility,
  // navigation and the announcement bar — all from Admin-managed data.
  applyBrandTheme(); applyContactLinks(); initAnalytics(); initOutboundTracking();
  applySectionConfig(); renderNavigation(); initMegaMenu(); renderAnnouncementBar(); initPromoActions(); initPackBgMatching();
  renderFloatingOffer(); renderOfferAnnouncement(); renderOffersSection();
  if(CONFIG.store.vacationMode){
    const b=$('vacationBanner');
    if(b){b.style.display='block';b.textContent=CONFIG.store.vacationMessage||'Orders are temporarily paused while Jayvi Foods is away.'}
  }
  renderBest();renderCategories();syncFilterControls();renderProducts();renderCombos();renderMeal();renderReviews();renderCart();
  renderOccasionCards();
  updateWishlistBadge();
  renderFooterSocialLinks();
  renderBrandGallery();
  heroShow();startHero();enableHeroSwipe();observeHeroVisibility();setupAnnouncementTicker();
  renderV33Sections();
  applyVacation();
  initRouter();
  initWelcomePopup();
  track('homepage_view',{page_location:location.href});

  // Restore a persistent Supabase session (works across devices in the
  // sense that signing in on any device authenticates against the same
  // Supabase account — profile/orders/addresses always come from
  // Supabase, never from this device's localStorage).
  currentUser = await getSessionUser();
  if(currentUser) await refreshProfile();
  if(currentUser){ renderFloatingOffer(); renderOffersSection(); } // V34: audience-targeted offers depend on sign-in
  sb.auth.onAuthStateChange((_event, session) => {
    currentUser = session?.user || null;
    if(!currentUser) currentProfile = null;
  });

  // Item J: arriving from Admin's own redirect (no session yet) opens
  // straight to login, or straight to the Admin panel if already
  // signed in as an admin — either way, no separate admin-login page.
  if(new URLSearchParams(location.search).get('returnTo')==='admin'){
    if(currentUser && currentProfile?.role==='admin') location.href='admin.html';
    else openAccount();
  }
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
