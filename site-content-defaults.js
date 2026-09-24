/* =========================================================
   Jayvi Foods — site-content-defaults.js (V34.2)

   ONE shared definition of every Admin-editable content block
   (announcement bar, welcome popup, homepage sections, brand/theme).
   Loaded by BOTH index.html (storefront) and admin.html (editor), so
   the fallback values can never drift between the two.

   These are only FALLBACKS. The live values come from the
   public.site_content table (supabase_migration_v33_brand_upgrade.sql)
   and are deep-merged over these at runtime — Admin → Site content
   saves there. A field Admin never touched keeps the default below; a
   field Admin cleared stays cleared.

   Nothing here is a price, threshold or coupon code:
   - free shipping threshold / charge  → store_settings (Admin → Store settings)
   - coupon codes and discounts        → coupons table (Admin → Coupons & Offers)
   - welcome coupon code               → site_content 'welcome_popup_coupon' (admin-only row)
   - products, prices, combos          → products / combos tables
   Copy that mentions "10%" below is marketing text Admin edits in the
   same screen as the coupon it describes.

   V34 additions:
   - `promotions`     — several offers at once (display + rules metadata).
                        The discount actually charged is still decided by
                        the coupon in Coupons & Offers, re-validated on the
                        server at order time. See CHANGELOG (V34) §9–10.
   V34.1:
   - Every uploadable image has an `imageType`:
       'packshot'  → product/pouch shot: shown WHOLE (object-fit:contain), never cropped
       'lifestyle' → food/lifestyle photography: fills the frame (object-fit:cover)
     Images the site borrows from a product are always treated as packshots.
   - Floating offer = ONE promotion chosen in promotions.floatingButton.promotionId.
   - Coupon stacking is NOT available yet (backend accepts one code per order);
     `canCombine` is kept only as a disabled placeholder for later.
   V34.2:
   - Hero slides have a LAYOUT: 'split' (text beside the image on computers,
     below it on phones — text can never cover the product) or 'overlay'
     (text on the image, for artwork designed with empty space). Text
     position top / centre / bottom / none, overlay strength, badge.
   - Occasions are built from real photography (or a clean typographic tile
     when no photo yet — never emoji) and pick products via PRODUCT TAGS
     and/or hand-picked products.
   - brand.packBackground: the neutral ground every pack shot sits on.
   - JAYVI_IMAGE_SLOTS — the ONE definition of every image slot's real
                        on-screen shape, used by style.css (as documented
                        ratios), Admin upload guidance and crop previews.
   - {discount} placeholder in welcome/offer copy (from the popup's
                        discountPercent or its linked promotion), so
                        changing 10% → 15% is one field, not five.
   ========================================================= */

/* ---------- Image slots (V34) ----------
   Every slot is a plain rectangle; images fill it with object-fit:cover
   and an optional focal point. The decorative gold frame is a border
   drawn AROUND the rectangle — it never changes the image's shape, so
   artwork never has to be designed around it.
   `ratio` is the exact CSS aspect-ratio used by style.css for that slot.
   `safe` describes the area that stays visible (and uncovered by text)
   at every supported screen size. */
const JAYVI_IMAGE_SLOTS = {
  // Split layout (default): the SAME 4:3 photo is used on computers (right
  // side, beside the text) and phones (top, above the text) — no crop needed.
  heroSplit: { label:'Hero image — split layout (computers & phones)', w:1600, h:1200, ratio:'4/3', ratioText:'4:3',
    safe:{x:0.1,y:0.1,w:0.8,h:0.8}, text:null,
    safeText:'Text sits beside the image on computers and below it on phones, so the whole photo is visible — keep the product inside the dashed box. Other shapes work too (the frame follows the photo between square and 2:1).' },
  heroDesktop: { label:'Hero banner — overlay layout, computers', w:1920, h:840, ratio:'16/7', ratioText:'16:7 (≈2.29:1)',
    safe:{x:0.46,y:0.10,w:0.42,h:0.80}, text:{x:0,y:0,w:0.45,h:1},
    safeText:'Keep the product / key subject inside the right-hand area (the dashed box). The left 45% sits under the headline and buttons — keep it plain (background, texture, props). Very wide screens may trim up to 10% from the top and bottom.' },
  heroMobile: { label:'Hero banner — overlay layout, phones', w:1080, h:1350, ratio:'4/5', ratioText:'4:5',
    safe:{x:0.06,y:0.05,w:0.88,h:0.50}, text:{x:0,y:0.55,w:1,h:0.45},
    safeText:'Keep the product / key subject in the top half, inside the dashed box. The bottom 45% sits under the headline and Shop button. Without a phone image, phones automatically use the split layout (text below the image), so nothing is covered.' },
  promo:      { label:'Promotional banner', w:1600, h:1000, ratio:'16/10', ratioText:'16:10', safe:{x:0.08,y:0.08,w:0.84,h:0.84}, safeText:'No text is placed over this image. Keep important content away from the outer 8%.' },
  heritage:   { label:'Heritage story image', w:1080, h:1350, ratio:'4/5', ratioText:'4:5', safe:{x:0.08,y:0.08,w:0.84,h:0.84}, safeText:'Plain rectangle with a decorative gold border around it. Keep important content away from the outer 8%.' },
  about:      { label:'About image', w:1600, h:1200, ratio:'4/3', ratioText:'4:3', safe:{x:0.06,y:0.06,w:0.88,h:0.88}, safeText:'Keep important content away from the outer 6%.' },
  category:   { label:'Category card', w:1000, h:1000, ratio:'1/1', ratioText:'1:1', safe:{x:0.08,y:0.08,w:0.84,h:0.84}, safeText:'A pack shot is shown whole (never cropped) on a warm background. A lifestyle photo fills the card — keep the subject away from the outer 8%.' },
  occasion:   { label:'Occasion card', w:1080, h:1350, ratio:'4/5', ratioText:'4:5', safe:{x:0.1,y:0.08,w:0.8,h:0.84}, safeText:'Real food / lifestyle photography (e.g. an idli breakfast plate, a festive thali). Landscape photos also work — set the focal point. With no photo, a clean text tile in Jayvi colours is shown (never emoji, never a pouch).' },
  enjoy:      { label:'How-to-enjoy card', w:1200, h:900, ratio:'4/3', ratioText:'4:3', safe:{x:0.06,y:0.06,w:0.88,h:0.88}, safeText:'Keep important content away from the outer 6%.' },
  social:     { label:'Instagram tile', w:1080, h:1080, ratio:'1/1', ratioText:'1:1', safe:{x:0.05,y:0.05,w:0.9,h:0.9}, safeText:'Shown as a square.' },
  popup:      { label:'Offer popup image', w:1200, h:600, ratio:'2/1', ratioText:'2:1', safe:{x:0.08,y:0.1,w:0.84,h:0.8}, safeText:'Shown above the offer headline. Avoid putting text in the image.' },
  ogImage:    { label:'Google / social share image', w:1200, h:630, ratio:'1200/630', ratioText:'1.91:1', safe:{x:0.24,y:0.05,w:0.52,h:0.9}, safeText:'Some apps (e.g. WhatsApp) crop this to a square from the centre — keep the logo inside the dashed box. JPG or PNG, under 1 MB.' },
  offerCard:  { label:'Offer card image (optional)', w:1200, h:675, ratio:'16/9', ratioText:'16:9', safe:{x:0.06,y:0.08,w:0.88,h:0.84}, safeText:'Shown at the top of the offer card. The offer headline is written below it by the website — no need to put text in the image.' },
  logo:       { label:'Logo', w:640, h:577, ratio:'640/577', ratioText:'original', safe:null, safeText:'Transparent PNG/WebP of the original logo.' }
};
const JAYVI_SITE_DEFAULTS = {
  // V34 — several offers at once. Nothing here is active until Admin
  // switches it on (never advertise an offer that doesn't exist). Each
  // offer with a coupon code must ALSO exist in Coupons & Offers — that
  // coupon is what the server actually validates and charges.
  promotions: {
    enabled: true,
    // Exactly ONE promotion may occupy the floating offer button. Blank = no floating offer.
    floatingButton: { promotionId: '', label: '' },  // label blank = that promotion's short title
    items: [
      { id:'welcome', active:false, name:'New customer welcome', shortTitle:'10% OFF', title:'10% off your first order', description:'Available after you sign up.',
        couponCode:'', codeVisibility:'signup', discountType:'percentage', discountValue:10, minOrderValue:0,
        appliesTo:'all', productIds:[], categoryIds:[], audience:'new', startDate:'', endDate:'',
        showOnHomepage:true, showInPopup:true, showInCart:true, priority:1,
        canCombine:false, usageNote:'One use per customer.', ctaLabel:'Get my 10% off', ctaTarget:'#welcome', image:'', imageType:'lifestyle' },
      { id:'two-packs', active:false, name:'Any 2 packs', shortTitle:'2 for ₹199', title:'Any 2 packs for ₹199', description:'Mix and match your favourites.',
        couponCode:'', codeVisibility:'none', discountType:'bundle', discountValue:199, minOrderValue:0,
        appliesTo:'all', productIds:[], categoryIds:[], audience:'all', startDate:'', endDate:'',
        showOnHomepage:true, showInPopup:false, showInCart:true, priority:2,
        canCombine:false, usageNote:'', ctaLabel:'Shop the offer', ctaTarget:'#combos', image:'', imageType:'lifestyle' },
      { id:'festive', active:false, name:'Festival offer', shortTitle:'Extra 5% OFF', title:'Additional 5% off', description:'For a limited time during the festival.',
        couponCode:'', codeVisibility:'show', discountType:'percentage', discountValue:5, minOrderValue:0,
        appliesTo:'all', productIds:[], categoryIds:[], audience:'all', startDate:'', endDate:'',
        showOnHomepage:true, showInPopup:false, showInCart:true, priority:3,
        canCombine:false, usageNote:'', ctaLabel:'Shop now', ctaTarget:'#shop', image:'', imageType:'lifestyle' }
    ]
  },

  announcement_bar: {
    enabled: true,
    mode: 'rotate',            // 'rotate' (one message at a time) | 'marquee' (continuous scroll)
    intervalSeconds: 4,
    includeLiveOffers: false,  // also append public coupons from Coupons & Offers
    messages: [
      { text: '🎁 Welcome to Jayvi — get {discount} off your first order', link: '#welcome', enabled: true },
      { text: '🚚 Free shipping above {freeShippingThreshold}', link: '', enabled: true },
      { text: '🇮🇳 Delivering across India', link: '', enabled: true }
    ]
  },

  welcome_popup: {
    enabled: false,            // stays off until Admin enables it (needs a matching coupon + the V33 migration)
    eyebrow: 'Welcome to Jayvi Foods ❤️',
    title: 'Get {discount} off your first order',
    description: 'Join the Jayvi Foods family and get a welcome offer on your first order.',
    discountPercent: 10,       // fills {discount} in the copy — a linked promotion (showInPopup) overrides it
    discountLabel: '{discount} OFF',
    ctaLabel: 'Get my {discount} off',
    successTitle: 'Your Jayvi welcome offer is ready!',
    successText: 'Use this code at checkout to enjoy {discount} off your first order.',
    codeLabel: 'Your coupon:',
    copyLabel: 'Copy code',
    shopLabel: 'Shop now',
    expiryText: '',
    image: '',
    imageType: 'lifestyle',
    delaySeconds: 6,
    audience: 'new',           // 'new' = hide for signed-in customers and devices that already ordered | 'all'
    frequency: 'days',         // 'once' = never again after close | 'session' = once per visit | 'days' = again after reshowAfterDays
    reshowAfterDays: 10,
    showOn: 'all',             // 'all' | 'mobile' | 'desktop'
    skipWhenCartHasItems: false,
    fields: {
      name:   { show: true, required: false },
      mobile: { show: true, required: true },
      email:  { show: true, required: false }
    }
  },

  brand: {
    logoUrl: '',
    colors: { maroon: '#9E1B32', green: '#1F6B3A', gold: '#D6A63A', cream: '#FFF7E8', sand: '#F3E5CF', text: '#29221F' },
    contactEmail: 'jayvifoods@gmail.com',
    contactPhone: '+91 88619 81003',
    footerTagline: 'Purely Traditional. Simply Delicious.',
    fssai: '21226177001087',
    udyam: 'UDYAM-KR-03-0681597',
    analytics: { ga4Id: '' },
    seo: { homeTitle: '', homeDescription: '', ogImage: '', ogImageAlt: '' },
    packBackground: '#FFFFFF',   // V34.2: ground behind every pack shot. White matches most studio pack photos, so no "box" shows.
    packBackgroundAuto: true,    // V34.2: match each pack photo's own light studio background (e.g. light grey) automatically   // blank = the values built into index.html
    // Small reassurance row on every product page (icon = Font Awesome name).
    productTrust: [
      { icon: 'fa-box-open',  text: 'Freshly packed' },
      { icon: 'fa-truck',     text: 'Delivery across India' },
      { icon: 'fa-lock',      text: 'Secure payment' },
      { icon: 'fa-headset',   text: 'Easy issue resolution' }
    ],
    shipping: {
      progressMessage: "You're {amount} away from FREE SHIPPING 🎉",
      unlockedMessage: "You've unlocked FREE SHIPPING 🎉",
      deliveryNote: 'Freshly packed and dispatched across India.'
    }
  },

  homepage: {
    // Section order on the homepage. Admin → Site content → Homepage
    // sections can reorder, show/hide and retitle each one.
    sectionOrder: ['hero','welcomeOffer','loveThese','categories','occasions','promo','offers','why','howToEnjoy','combos','heritage','reviews','shop','social','gallery','about','newsletter','mealMatch'],
    sections: {
      hero: {
        enabled: true,
        label: 'Hero banners',
        // Slides themselves are managed in Admin → Homepage (hero slides).
        // This fallback slide is only shown when no slide is active.
        secondaryLabel: 'Explore bestsellers',
        secondaryTarget: '#best-sellers',
        trust: ['Freshly packed', 'Delivered across India', 'FSSAI registered'],
        fallback: {
          eyebrow: 'Authentic Karnataka flavours',
          title: 'Purely Traditional.',
          em: 'Simply Delicious.',
          text: 'Traditional favourites made for everyday moments.',
          ctaLabel: 'Shop now',
          ctaTarget: '#shop',
          image: '',             // desktop/tablet banner — 1920 × 840 (16:7)
          imageType: 'lifestyle',  // 'packshot' shows an uploaded pouch whole on a brand background
          layout: 'split',         // 'split' = text beside/below the image | 'overlay' = text on the image
          mobileLayout: 'auto',    // 'auto' = overlay only when a phone image exists, else split | 'overlay' | 'split'
          overlayStrength: 'auto', // overlay only: 'auto' | 'none' | 'light' | 'medium' | 'strong'
          badge: '',               // optional small pill, e.g. 'New launch'
          mobileImage: '',       // phone banner — 1080 × 1350 (4:5); blank = desktop image cropped
          imageFocus: 'center',
          mobileImageFocus: 'center',
          textPlacement: 'center'  // 'top' | 'center' | 'bottom' | 'none' (artwork already contains its own text)
        }
      },
      welcomeOffer: {
        enabled: true,
        label: 'First-order offer strip',
        eyebrow: 'Discover Jayvi',
        title: 'Your first taste, {discount} off',
        text: 'Share your number and we will send your welcome code instantly.',
        ctaLabel: 'Unlock my {discount} off',
        action: 'popup',       // 'popup' opens the welcome popup | 'link' goes to `link`
        link: '',
        hideWhenPopupDisabled: true
      },
      loveThese: {
        enabled: true,
        label: "You'll love these",
        eyebrow: 'Handpicked for you',
        title: "You'll love these ❤️",
        maxItems: 8,
        tabs: [
          { id: 'best',    label: 'Best Sellers',    enabled: true },
          { id: 'new',     label: 'New Arrivals',    enabled: true },
          { id: 'popular', label: 'Popular',         enabled: true },
          { id: 'healthy', label: 'Healthy Choices', enabled: true }
        ]
      },
      categories: {
        enabled: true,
        label: 'Shop by category',
        eyebrow: 'Explore Jayvi',
        title: 'Shop by category',
        // Used only when a category has no description/image set in
        // Admin → Categories. Matched by category id OR name keyword.
        fallbackCopy: [
          { match: 'chutney', text: 'Add tradition to every meal' },
          { match: 'pudi',    text: 'Add tradition to every meal' },
          { match: 'rice',    text: 'Heritage grains from Karnataka' },
          { match: 'snack',   text: 'Crunchy favourites for every moment' },
          { match: 'combo',   text: 'More flavour. Better value.' }
        ]
      },
      occasions: {
        enabled: true,
        label: 'Shop by occasion',
        eyebrow: 'Shop by occasion',
        title: 'What are you craving today?',
        // Each card shows products by explicit id (productIds) or, if
        // none are set, by name keyword. target:'combos' jumps to combos.
        // A card with no matching products is hidden automatically.
        // V34.2 — each occasion: name, short description, a real food /
        // lifestyle photo (type + focal point), products chosen by PRODUCT
        // TAGS and/or hand-picked products, button text + link, order,
        // active. No photo → a clean typographic tile in Jayvi colours.
        // Products = hand-picked ∪ products carrying any selected tag.
        // (keywords are only a fallback while no tags/products are set.)
        items: [
          { id: 'breakfast', active: true, order: 1, title: 'Breakfast', description: 'Start your day the traditional way.',       image: '', imageType: 'lifestyle', imageFocus: 'center', tagIds: ['breakfast','idli','dosa'], productIds: [], keywords: ['idli dosa pudi','pudi','peanut'], target: '',       ctaLabel: 'Shop breakfast', ctaTarget: '', icon: '' },
          { id: 'lunch',     active: true, order: 2, title: 'Lunch',     description: 'Hot rice, ghee and a spoon of chutney.',    image: '', imageType: 'lifestyle', imageFocus: 'center', tagIds: ['lunch','rice'],              productIds: [], keywords: ['rajamudi','peanut','flaxseed'],   target: '',       ctaLabel: 'Shop lunch',     ctaTarget: '', icon: '' },
          { id: 'tea-time',  active: true, order: 3, title: 'Tea time',  description: 'Crunchy favourites for chai time.',        image: '', imageType: 'lifestyle', imageFocus: 'center', tagIds: ['tea-time','snack-time'],     productIds: [], keywords: ['chakli','kodubale','puffora'],    target: '',       ctaLabel: 'Shop tea time',  ctaTarget: '', icon: '' },
          { id: 'festival',  active: true, order: 4, title: 'Festival',  description: 'Traditional flavours for celebrations.',   image: '', imageType: 'lifestyle', imageFocus: 'center', tagIds: ['festival','gifting'],        productIds: [], keywords: [],                                  target: 'combos', ctaLabel: 'Shop festive',   ctaTarget: '', icon: '' }
        ]
      },
      promo: {
        enabled: false,        // off until Admin sets up a real offer — never advertise one that doesn't exist
        label: 'Promotional banner',
        eyebrow: 'Festival offer',
        title: 'Any 2 packs for a special price',
        text: 'More flavour. More smiles.',
        ctaLabel: 'Shop offer',
        ctaTarget: '#offers',
        image: '',
        imageType: 'lifestyle',
        imageFocus: 'center',
        startDate: '',
        endDate: '',
        productIds: []
      },
      // V34.1: off by default — offers already appear on the floating
      // button, in the cart and in the sign-up popup. Switch on in
      // Homepage sections if you want a dedicated offers row as well.
      offers: {
        enabled: false,
        label: 'Current offers (homepage row)',
        eyebrow: "Don't miss out",
        title: 'Current offers'
      },
      why: {
        enabled: true,
        label: 'Why Jayvi',
        eyebrow: 'Our promise',
        title: 'Why Jayvi?',
        // Keep only claims that are true for every product shown.
        items: [
          { icon: 'fa-seedling',        title: 'Traditional recipes',       text: 'Inspired by authentic Karnataka flavours.' },
          { icon: 'fa-hand-holding-heart', title: 'Small-batch preparation', text: 'Made with care, not mass-produced.' },
          { icon: 'fa-wheat-awn',       title: 'Carefully selected ingredients', text: 'Quality ingredients chosen for everyday food.' },
          { icon: 'fa-box-open',        title: 'Freshly packed',            text: 'Packed carefully to preserve freshness.' },
          { icon: 'fa-location-dot',    title: 'Rooted in Karnataka',       text: 'Traditional flavours with a modern touch.' },
          { icon: 'fa-heart',           title: 'Made with care',            text: 'Food made to bring people together.' }
        ]
      },
      howToEnjoy: {
        enabled: true,
        label: 'How to enjoy',
        eyebrow: 'How to enjoy Jayvi',
        title: 'One product. So many ways.',
        items: [
          { productId: '', keyword: 'peanut',   title: 'Peanut Chutney',   pairings: ['Rice + ghee','Idli','Dosa'],        image: '', imageType: 'lifestyle', imageFocus: 'center' },
          { productId: '', keyword: 'flaxseed', title: 'Flaxseed Chutney', pairings: ['Rice + ghee','Curd rice','Dosa'],   image: '', imageType: 'lifestyle', imageFocus: 'center' },
          { productId: '', keyword: 'pudi',     title: 'Idli Dosa Pudi',   pairings: ['Idli','Dosa','Breakfast'],          image: '', imageType: 'lifestyle', imageFocus: 'center' },
          { productId: '', keyword: 'rajamudi', title: 'Rajamudi Rice',    pairings: ['Rajamudi + ghee + peanut chutney'], image: '', imageType: 'lifestyle', imageFocus: 'center' }
        ]
      },
      combos: {
        enabled: true,
        label: 'Combos',
        eyebrow: 'Jayvi combos',
        title: 'More to love 🎁'
      },
      heritage: {
        enabled: true,
        // Featured / Discover story. Rajamudi is only the DEFAULT content —
        // any product (productId or productKeyword), copy, button and
        // image can be set in Admin → Site content → Homepage sections.
        label: 'Featured story (default: Rajamudi)',
        eyebrow: "A taste of Karnataka's heritage",
        title: 'Some combinations simply feel like home.',
        text: 'Rajamudi rice, a little ghee and our peanut chutney.',
        ctaLabel: 'Discover Rajamudi',
        productId: '',
        productKeyword: 'rajamudi',
        ctaTarget: '',         // optional override, e.g. '#product/rajamudi' or a URL
        image: '',
        imageType: 'lifestyle',
        imageFocus: 'center'
      },
      reviews: {
        enabled: true,
        label: 'Customer reviews',
        eyebrow: 'Customer love',
        title: 'Loved by Jayvi customers ❤️',
        // Blank (recommended) = the real average and count of approved website
        // reviews, or nothing at all when there are none. Only fill these to
        // quote a genuine public rating, e.g. your Google Business rating.
        ratingValue: '',
        ratingCount: '',
        ratingSource: 'Google'
      },
      shop: {
        enabled: true,
        label: 'All products (with filters)',
        eyebrow: 'All products',
        title: 'Find your favourite'
      },
      social: {
        enabled: true,
        label: 'Instagram / social',
        eyebrow: 'Community',
        title: 'Follow the Jayvi journey',
        handle: '@jayvifoods',
        profileUrl: '',        // blank = Instagram link from Social Links / Store settings
        ctaLabel: 'Follow us on Instagram',
        tiles: []              // [{ image, link, caption }] — real posts only
      },
      gallery: {
        enabled: true,
        label: 'Brand gallery (Admin → Gallery)'
      },
      about: {
        enabled: true,
        label: 'About Jayvi',
        eyebrow: 'About Jayvi',
        title: 'From Karnataka, with tradition ❤️',
        text: 'Jayvi Foods brings the warmth of traditional Indian flavours to modern kitchens. Inspired by the food, recipes and everyday traditions we grew up with, we create thoughtfully crafted foods that are simple to enjoy and made to bring people together.',
        body: 'From everyday favourites to traditional specialities, every Jayvi Foods product is rooted in familiar flavours, quality ingredients and the joy of good food.',
        signoff: 'Purely Traditional. Simply Delicious.',
        ctaLabel: 'Our story',
        story: 'Jayvi Foods brings the warmth of traditional Indian flavours to modern kitchens. Inspired by the food, recipes and everyday traditions we grew up with, we create thoughtfully crafted foods that are simple to enjoy and made to bring people together.\n\nFrom everyday favourites to traditional specialities, every Jayvi Foods product is rooted in familiar flavours, quality ingredients and the joy of good food.\n\nPurely Traditional. Simply Delicious.',
        image: '',
        imageType: 'lifestyle',
        imageFocus: 'center'
      },
      newsletter: {
        enabled: true,
        label: 'Newsletter / WhatsApp',
        eyebrow: 'Stay in touch',
        title: 'New launches and offers, first.',
        text: 'Chat with our team on WhatsApp for orders, recommendations and festival specials.',
        whatsappLabel: 'Chat on WhatsApp',
        offerLabel: 'Get my welcome offer'
      },
      mealMatch: {
        enabled: false,
        label: 'Made for every meal (meal-tag finder)',
        eyebrow: 'Find your match',
        title: 'Made for every meal'
      }
    }
  }
};

/* Deep merge: objects merge key-by-key; arrays and scalars from `over`
   replace the default outright (so Admin can shorten a list). */
function jayviDeepMerge(base, over){
  if(over === undefined || over === null) return structuredClone(base);
  if(Array.isArray(base) || Array.isArray(over) || typeof base !== 'object' || typeof over !== 'object' || base === null) return structuredClone(over);
  const out = structuredClone(base);
  Object.keys(over).forEach(k => { out[k] = (k in base) ? jayviDeepMerge(base[k], over[k]) : structuredClone(over[k]); });
  return out;
}
