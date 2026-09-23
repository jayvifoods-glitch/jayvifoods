/* =========================================================
   Jayvi Foods — site-content-defaults.js (V33)

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
   ========================================================= */
const JAYVI_SITE_DEFAULTS = {
  announcement_bar: {
    enabled: true,
    mode: 'rotate',            // 'rotate' (one message at a time) | 'marquee' (continuous scroll)
    intervalSeconds: 4,
    includeLiveOffers: false,  // also append public coupons from Coupons & Offers
    messages: [
      { text: '🎁 Welcome to Jayvi — get 10% off your first order', link: '#welcome', enabled: true },
      { text: '🚚 Free shipping above {freeShippingThreshold}', link: '', enabled: true },
      { text: '🇮🇳 Delivering across India', link: '', enabled: true }
    ]
  },

  welcome_popup: {
    enabled: false,            // stays off until Admin enables it (needs a matching coupon + the V33 migration)
    eyebrow: 'Welcome to Jayvi Foods ❤️',
    title: 'Get 10% off your first order',
    description: 'Discover the taste of traditional Karnataka flavours.',
    discountLabel: '10% OFF',
    ctaLabel: 'Get my 10% off',
    successTitle: 'Your Jayvi welcome offer is ready!',
    successText: 'Use this code at checkout to enjoy 10% off your first order.',
    expiryText: '',
    image: '',
    delaySeconds: 6,
    reshowAfterDays: 10,
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
    seo: { homeTitle: '', homeDescription: '', ogImage: '' },
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
          image: ''
        }
      },
      welcomeOffer: {
        enabled: true,
        label: 'First-order offer strip',
        eyebrow: 'Discover Jayvi',
        title: 'Your first taste, 10% off',
        text: 'Share your number and we will send your welcome code instantly.',
        ctaLabel: 'Unlock my 10% off',
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
        items: [
          { id: 'breakfast',   title: 'Breakfast',   emoji: '🥣', productIds: [], keywords: ['idli dosa pudi','pudi','peanut'], target: '', image: '' },
          { id: 'lunch',       title: 'Lunch',       emoji: '🍚', productIds: [], keywords: ['rajamudi','peanut','flaxseed'],   target: '', image: '' },
          { id: 'tea-time',    title: 'Tea time',    emoji: '☕', productIds: [], keywords: ['chakli','kodubale','puffora'],    target: '', image: '' },
          { id: 'gifting',     title: 'Gifting',     emoji: '🎁', productIds: [], keywords: [],                                  target: 'combos', image: '' },
          { id: 'traditional', title: 'Traditional', emoji: '🌿', productIds: [], keywords: ['rajamudi','chutney'],             target: '', image: '' }
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
        startDate: '',
        endDate: '',
        productIds: []
      },
      offers: {
        enabled: true,
        label: 'Live coupon offers',
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
          { productId: '', keyword: 'peanut',   title: 'Peanut Chutney',   pairings: ['Rice + ghee','Idli','Dosa'],        image: '' },
          { productId: '', keyword: 'flaxseed', title: 'Flaxseed Chutney', pairings: ['Rice + ghee','Curd rice','Dosa'],   image: '' },
          { productId: '', keyword: 'pudi',     title: 'Idli Dosa Pudi',   pairings: ['Idli','Dosa','Breakfast'],          image: '' },
          { productId: '', keyword: 'rajamudi', title: 'Rajamudi Rice',    pairings: ['Rajamudi + ghee + peanut chutney'], image: '' }
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
        label: 'Rajamudi / heritage story',
        eyebrow: "A taste of Karnataka's heritage",
        title: 'Some combinations simply feel like home.',
        text: 'Rajamudi rice, a little ghee and our peanut chutney.',
        ctaLabel: 'Discover Rajamudi',
        productId: '',
        productKeyword: 'rajamudi',
        ctaTarget: '',         // optional override, e.g. '#product/rajamudi' or a URL
        image: ''
      },
      reviews: {
        enabled: true,
        label: 'Customer reviews',
        eyebrow: 'Customer love',
        title: 'Loved by Jayvi customers ❤️',
        ratingValue: '',       // e.g. '4.8' — your public Google rating. Blank = average of approved website reviews.
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
        text: "Some flavours don't need an introduction. They remind us of home.",
        body: 'Jayvi Foods brings traditional Karnataka-inspired flavours into everyday modern meals — from familiar chutney powders to heritage rice and crunchy favourites.',
        ctaLabel: 'Our story',
        story: 'Jayvi Foods began with the chutney powders and podi our families have always made — in small batches, the traditional way, with nothing shortcut for shelf life and nothing added for show.\n\nToday we bring those same flavours to kitchens across India: chutney powders for idli, dosa and hot rice with ghee, heritage Rajamudi rice from Karnataka, and crunchy tea-time favourites.\n\nPurely traditional. Simply delicious.',
        image: ''
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
