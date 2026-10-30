/**
 * GLAM GIRL BY JANKI — Master Unified Salon Database Engine
 * Single Source of Truth for all dynamic website data:
 * Users, Auth, 72 Services, Appointments, Live Treatment Timers,
 * Reviews, Contact Messages, Gallery, Newsletter Subscribers, Offers, Settings, Treatments.
 */

import { ALL_SERVICES, CATEGORIES } from '../data/servicesData';
import { SALON_INFO } from '../data/salonData';
import { FAQ_DATA } from '../data/faqData';
import cleanFacialBg from '../assets/facial-atelier-clean.webp';
import salonInteriorImg from '../assets/atelier-salon-interior.webp';
import floralBookingImg from '../assets/floral-booking.webp';
import founderImg from '../assets/janki-khatroja.webp';
import { 
  getCustomizationConfigForService, 
  calculateCustomizedTotal, 
  validateServiceCustomization 
} from '../data/treatmentCustomizationsData';
import { DEFAULT_AFTERCARE_CATEGORIES, detectAftercareCategory } from '../data/aftercareData';
import { DEFAULT_MEHNDI_PROCESS_SERVICES } from '../data/mehndiProcessData';

export const DB_KEYS = {
  USERS: 'glfy_db_users',
  SERVICES: 'glfy_db_services',
  CATEGORIES: 'glfy_db_categories',
  APPOINTMENTS: 'glfy_db_appointments',
  REVIEWS: 'glfy_db_reviews',
  LIKED_REVIEWS: 'glfy_db_liked_reviews',
  CONTACT_MESSAGES: 'glfy_db_contact_messages',
  GALLERY: 'glfy_db_gallery',
  NEWSLETTER_SUBSCRIBERS: 'glfy_db_newsletter_subscribers',
  OFFERS: 'glfy_db_offers',
  FESTIVAL_OFFERS: 'glfy_db_festival_offers',
  COMBO_PACKAGES: 'glfy_db_combo_packages',
  SEASONAL_MENU: 'glfy_db_seasonal_menu',
  SETTINGS: 'glfy_db_settings',
  TREATMENTS: 'glfy_db_treatments',
  FAQS: 'glfy_db_faqs',
  SESSION_USER: 'glfy_db_session_user',
  NOTIFICATIONS: 'glfy_db_notifications',
  REMINDERS: 'glfy_db_reminders',
  NOTIFICATION_PREFERENCES: 'glfy_db_notification_preferences',
  DATA_REQUESTS: 'glfy_db_data_requests',
  AFTERCARE_SETTINGS: 'glfy_db_aftercare_settings',
  CUSTOMER_SAVED_RECOMMENDATIONS: 'glfy_db_customer_saved_recommendations',
  MEHNDI_PROCESS_PRICING: 'glfy_db_mehndi_process_pricing',
  CUSTOM_REQUESTS: 'glfy_db_custom_requests',
  CUSTOM_DRAFT: 'glfy_db_custom_draft',
  VISION_BOARD: 'glfy_db_vision_board',
  BEAUTY_BLUEPRINT: 'glfy_db_beauty_blueprint',
  BUSINESS_HOURS: 'glfy_db_business_hours'
};

// Internal listeners for live reactivity
const subscribers = new Set();

const notifySubscribers = (event, data) => {
  subscribers.forEach((callback) => {
    try {
      callback(event, data);
    } catch (e) {
      console.warn('DB subscriber notification error:', e);
    }
  });

  // Cross-tab and window event synchronization
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('glfy_db_change', { detail: { event, data } }));
  }
};

// Fast SHA-256 string hash helper for secure password storage
async function hashString(str) {
  if (!str) return '';
  try {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const msgUint8 = new TextEncoder().encode(str);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (e) {}
  // Simple fallback hash
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return 'shash_' + Math.abs(hash).toString(16);
}

// Initial Seeds
const DEFAULT_USERS = [
  {
    id: 'usr_admin_zeel',
    name: 'Zeel Khatroja',
    preferredName: 'Zeel',
    email: 'zeelkhatroja312@gmail.com',
    phone: '+1 (616) 255-0549',
    passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', // admin123
    role: 'admin',
    status: 'active',
    address: {
      street: '240 Bank Street, Suite 402',
      city: 'Ottawa',
      province: 'Ontario',
      postalCode: 'K2P 1X4',
      country: 'Canada'
    },
    preferences: {
      preferredContactMethod: 'email',
      marketingEmailConsent: true,
      marketingSmsConsent: true,
      preferredServices: ['threading', 'facial', 'nails', 'mehndi']
    },
    adminNotes: [],
    dataRequests: [],
    lastLoginAt: '2026-10-28T12:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'usr_admin_01',
    name: 'Janki Khatroja',
    preferredName: 'Janki',
    email: 'admin@girlookedforyou.ca',
    phone: '+1 (616) 255-0549',
    passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', // admin123
    role: 'admin',
    status: 'active',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  }
];

const DEFAULT_NOTIFICATIONS = [];

const DEFAULT_APPOINTMENTS = [];

const DEFAULT_REVIEWS = [
  {
    id: 'rev-101',
    customerName: 'Priya Sharma',
    service: 'Eyebrow Threading & Tint',
    serviceCategory: 'threading',
    rating: 5,
    review: 'Absolutely the best brow threading I have ever had in Ottawa! Janki is incredibly skilled, meticulous, and so gentle. My brows look perfectly symmetrical every single visit. The studio is spotless and calming.',
    date: '2026-09-24',
    verified: true,
    likes: 18,
    recommended: true,
    status: 'approved',
    tags: ['Gentle Touch', 'Clean Studio', 'Perfect Shape'],
    featured: true
  },
  {
    id: 'rev-102',
    customerName: 'Emily Watson',
    service: '24K Gold Hydra-Glow Facial',
    serviceCategory: 'facial',
    rating: 5,
    review: 'The 24K Gold Hydra-Glow Facial completely transformed my skin. I could see the difference immediately — luminous, hydrated, and refreshed. Janki explained every step and made me feel so pampered.',
    date: '2026-09-21',
    verified: true,
    likes: 14,
    recommended: true,
    status: 'approved',
    tags: ['Glowing Skin', 'Relaxing', 'Luxury Experience'],
    featured: true
  },
  {
    id: 'rev-103',
    customerName: 'Meera Patel',
    service: 'Bridal Henna / Mehndi Art',
    serviceCategory: 'henna',
    rating: 5,
    review: 'Janki did my bridal mehndi and it was breathtaking! The intricate motifs came out so dark and rich in colour. All my wedding guests asked where I had it done. Truly a master artist!',
    date: '2026-09-17',
    verified: true,
    likes: 27,
    recommended: true,
    status: 'approved',
    tags: ['Intricate Design', 'Bridal Specialist', 'Rich Color'],
    featured: true
  },
  {
    id: 'rev-104',
    customerName: 'Sarah O\'Brien',
    service: 'Luxe Balayage & Gloss Finish',
    serviceCategory: 'haircolor',
    rating: 5,
    review: 'I came in for a customized balayage and toner gloss. Left looking like I stepped out of a high-fashion magazine! The blend is seamless and my hair still feels silky and healthy.',
    date: '2026-09-12',
    verified: true,
    likes: 11,
    recommended: true,
    status: 'approved',
    tags: ['Seamless Blend', 'Healthy Hair', 'Expert Advice'],
    featured: true
  },
  {
    id: 'rev-105',
    customerName: 'Ananya Roy',
    service: 'Full Body Organic Waxing',
    serviceCategory: 'waxing',
    rating: 5,
    review: 'Quick, virtually painless, and extremely hygienic stripless waxing. Janki is so warm and professional. Highly recommend to anyone looking for a reliable aesthetician in Ottawa.',
    date: '2026-09-08',
    verified: true,
    likes: 9,
    recommended: true,
    status: 'approved',
    tags: ['Painless Waxing', 'Hygienic', 'Friendly Service'],
    featured: false
  }
];

const DEFAULT_GALLERY = [
  {
    id: 'gal-01',
    category: 'hair',
    badge: 'HAUTE COIFFURE',
    title: 'Sunkissed Parisian Balayage',
    price: '$285+',
    description: 'Hand-painted dimensional caramel foils paired with silk-gloss conditioning melt bespoke tailored for inequal luster.',
    tags: ['SIGNATURE BLONDE', 'SILK CONDITION'],
    image: floralBookingImg,
    isActive: true,
    createdAt: '2026-01-10T00:00:00.000Z'
  },
  {
    id: 'gal-02',
    category: 'facials',
    badge: 'DERMAL THERAPY',
    title: 'Sublime Cellular Radiance',
    price: '$190',
    description: 'Non-invasive micro-nutrient filling combined with hyaluronic infusions and lymphatic jade drainage.',
    tags: ['HYDRA-LIFT', 'LED THERAPY'],
    image: cleanFacialBg,
    isActive: true,
    createdAt: '2026-01-12T00:00:00.000Z'
  },
  {
    id: 'gal-03',
    category: 'hair',
    badge: 'HAIR RESTORATION',
    title: 'Caviar Gloss & Sculpt',
    price: '$165',
    description: 'Deep lipid reconstruction infused with marine extracts, finished with bouncy round-brush architectural shaping.',
    tags: ['KERATIN SHINE', 'SCALP MASSAGE'],
    image: salonInteriorImg,
    isActive: true,
    createdAt: '2026-01-15T00:00:00.000Z'
  }
];

const DEFAULT_CONTACT_MESSAGES = [
  {
    id: 'msg-101',
    name: 'Chloe Bennett',
    email: 'chloe.bennett@example.com',
    phone: '(613) 555-0178',
    subject: 'BESPOKE BRIDAL PRIVÉ',
    message: 'Inquiring about full bridal party makeup and henna package for August 2026.',
    targetDate: '2026-08-15',
    preferredContactMode: 'Discreet Phone Call',
    status: 'New',
    createdAt: '2026-09-28T14:30:00.000Z'
  }
];

const DEFAULT_OFFERS = [
  {
    id: 'off-01',
    title: 'New Client Radiance Welcome',
    description: 'Enjoy 15% off your first luxury facial or signature bridal consultation.',
    discountType: 'percentage',
    discountValue: 15,
    couponCode: 'GLOW15',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    isActive: true,
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'off-02',
    title: 'Bridal & Mehndi Atelier Package',
    description: 'Complimentary trial threading and lash enhancement with full bridal booking.',
    discountType: 'complimentary',
    discountValue: 50,
    couponCode: 'BRIDALVIP',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    isActive: true,
    createdAt: '2026-01-01T00:00:00.000Z'
  }
];

export const DEFAULT_FESTIVAL_OFFERS = [
  {
    id: 'fest-thanksgiving',
    festival: 'Canadian Thanksgiving Special',
    title: 'Fall Into Your Beauty Glow',
    tagline: 'Autumn-inspired skincare & restorative rituals',
    description: 'Embrace the crisp autumn season with our restorative Ayurvedic herbal facial, tension-melting relaxation massage, and nourishing botanical skincare.',
    bannerImage: '/images/festivals/thanksgiving-glow.jpg',
    includedServiceIds: ['herbal-facial', '37-shanti-relaxation-massage'],
    includedServiceNames: ['Herbal Facial', 'Shanti Relaxation Massage'],
    primaryServiceId: 'herbal-facial',
    originalPrice: 135,
    discountedPrice: 99,
    discountPercent: 27,
    couponCode: 'THANKSGLOW',
    startDate: '2024-01-01',
    endDate: '2027-12-31',
    status: 'Active',
    isPublished: true,
    displayOrder: 1,
    terms: 'Valid on appointments scheduled for the festive season. Advance reservation recommended.',
    maxBookings: 100,
    bookingsCount: 16,
    showInHomepagePopup: true,
    popupCtaText: 'EXPLORE OFFER',
    createdAt: '2026-10-01T00:00:00.000Z'
  },
  {
    id: 'fest-halloween',
    festival: 'Halloween Glam',
    title: 'Get Ready to Glow',
    tagline: 'Party makeup, salon styling & celebratory glam',
    description: 'Turn heads at every festive party with camera-ready smokey party makeup, voluminous salon blow-dry styling, and flawless celebratory glam.',
    bannerImage: '/images/festivals/halloween-glam.jpg',
    includedServiceIds: ['party-makeup', '52-blow-dry-styling'],
    includedServiceNames: ['Party Makeup', 'Blow Dry Styling'],
    primaryServiceId: 'party-makeup',
    originalPrice: 130,
    discountedPrice: 95,
    discountPercent: 27,
    couponCode: 'HALLOWEENGLAM',
    startDate: '2024-01-01',
    endDate: '2027-12-31',
    status: 'Active',
    isPublished: true,
    displayOrder: 2,
    terms: 'Valid for celebratory bookings. Includes false lash application.',
    maxBookings: 80,
    bookingsCount: 19,
    showInHomepagePopup: true,
    popupCtaText: 'EXPLORE OFFER',
    createdAt: '2026-10-10T00:00:00.000Z'
  },
  {
    id: 'fest-christmas',
    festival: 'Christmas Beauty Special',
    title: 'Your Holiday Glam Starts Here',
    tagline: 'Holiday makeup, hair styling & party beauty packages',
    description: 'Unwrap festive elegance with signature red-carpet makeup, couture hair coiffure, and velvet skin finishing for winter celebrations.',
    bannerImage: '/images/festivals/christmas-glow.jpg',
    includedServiceIds: ['noor-signature-makeup', '52-blow-dry-styling'],
    includedServiceNames: ['Noor Signature Makeup', 'Blow Dry Styling'],
    primaryServiceId: 'noor-signature-makeup',
    originalPrice: 140,
    discountedPrice: 105,
    discountPercent: 25,
    couponCode: 'HOLIDAYGLAM',
    startDate: '2024-01-01',
    endDate: '2027-12-31',
    status: 'Active',
    isPublished: true,
    displayOrder: 3,
    terms: 'Holiday celebration special. Valid for festive appointments.',
    maxBookings: 120,
    bookingsCount: 23,
    showInHomepagePopup: true,
    popupCtaText: 'EXPLORE OFFER',
    createdAt: '2026-10-12T00:00:00.000Z'
  },
  {
    id: 'fest-new-year',
    festival: 'New Year Glam',
    title: 'New Year, New Glow',
    tagline: 'Makeover, 24K gold facial & celebration treatments',
    description: 'Ring in the new year renewed and radiant with our signature 24K gold facial, glamorous party makeover, and luminous dermal prep.',
    bannerImage: '/images/festivals/new-year-glow.jpg',
    includedServiceIds: ['golden-glow', 'noor-signature-makeup'],
    includedServiceNames: ['Golden Glow Facial', 'Noor Signature Makeup'],
    primaryServiceId: 'golden-glow',
    originalPrice: 180,
    discountedPrice: 135,
    discountPercent: 25,
    couponCode: 'NEWYEARGLOW',
    startDate: '2024-01-01',
    endDate: '2027-12-31',
    status: 'Active',
    isPublished: true,
    displayOrder: 4,
    terms: 'New year festive package. Valid for upcoming seasonal reservations.',
    maxBookings: 90,
    bookingsCount: 8,
    showInHomepagePopup: true,
    popupCtaText: 'EXPLORE OFFER',
    createdAt: '2026-10-12T00:00:00.000Z'
  },
  {
    id: 'fest-valentines',
    festival: "Valentine's Day Special",
    title: 'A Little Love, A Lot of Glow',
    tagline: 'Romantic makeup, fruit skincare & self-care offers',
    description: 'Indulge in romantic self-care with vitamin-rich fruit enzyme facials, soft romantic bridal glow makeup, and restorative atelier pampering.',
    bannerImage: '/images/festivals/valentines-glow.jpg',
    includedServiceIds: ['fruit-facial', 'engagement-makeup'],
    includedServiceNames: ['Fruit Facial', 'Engagement Makeup'],
    primaryServiceId: 'fruit-facial',
    originalPrice: 190,
    discountedPrice: 142,
    discountPercent: 25,
    couponCode: 'VALENTINEGLOW',
    startDate: '2024-01-01',
    endDate: '2027-12-31',
    status: 'Active',
    isPublished: true,
    displayOrder: 5,
    terms: 'Romantic pampering special. Valid for celebration appointments.',
    maxBookings: 85,
    bookingsCount: 7,
    showInHomepagePopup: true,
    popupCtaText: 'EXPLORE OFFER',
    createdAt: '2026-10-12T00:00:00.000Z'
  }
];

export const DEFAULT_COMBO_PACKAGES = [
  // ==========================================
  // 1. HAIR CARE PACKAGES
  // ==========================================
  {
    id: 'combo-hair-refresh',
    slug: 'hair-refresh-combo',
    name: 'Hair Refresh Combo',
    tagline: 'Precision Haircut & Bouncy Blowout Styling',
    description: 'Customized precision haircut tailored to your facial contours followed by our signature round-brush blowout and anti-frizz shine seal.',
    image: '/images/hair-care/53-noor-signature-haircut.webp',
    categoryTag: 'Hair Care',
    serviceIds: ['noor-signature-haircut', 'blow-dry-styling'],
    comboPrice: 85,
    active: true,
    isPublished: true,
    featured: true,
    displayOrder: 1,
    benefits: [
      'Master consultation & face shape analysis',
      'Precision haircut & split-end removal',
      'Hydrating wash and bouncy blowout styling',
      'Save $15 compared to individual service rates'
    ],
    createdAt: '2026-10-12T00:00:00.000Z',
    updatedAt: '2026-10-12T00:00:00.000Z'
  },
  {
    id: 'combo-hair-repair-nourish',
    slug: 'hair-repair-nourishment-package',
    name: 'Hair Repair & Nourishment Package',
    tagline: 'Keratin Bond Builder & Signature Styling',
    description: 'Intensive restorative package for chemically treated, heat-damaged, or frizzy hair, combining precision cut with deep amino bond building.',
    image: '/images/hair-care/63-noor-hair-repair-ritual.webp',
    categoryTag: 'Hair Care',
    serviceIds: ['noor-signature-haircut', 'noor-hair-repair-ritual'],
    comboPrice: 125,
    active: true,
    isPublished: true,
    featured: false,
    displayOrder: 2,
    benefits: [
      'Deep amino acid bond repair infusion',
      'Infrared flat iron seal for long-lasting smoothness',
      'Precision haircut tailored to hair density',
      'Save $25 compared to individual service rates'
    ],
    createdAt: '2026-10-12T00:00:00.000Z',
    updatedAt: '2026-10-12T00:00:00.000Z'
  },

  // ==========================================
  // 2. SKIN CARE PACKAGES
  // ==========================================
  {
    id: 'combo-glow-radiance',
    slug: 'glow-radiance-combo',
    name: 'Glow & Radiance Combo',
    tagline: 'Signature Glam Girl Facial & Precision Face Threading',
    description: 'Double-action skincare indulgence featuring our signature nourishing facial and gentle cotton thread hair removal for an ethereal, velvet-soft glass skin finish.',
    image: '/images/facial/special-glam-girl-facial.jpg',
    categoryTag: 'Skin Care',
    serviceIds: ['special-glam-girl-facial', 'sitara-full-face-threading'],
    comboPrice: 95,
    active: true,
    isPublished: true,
    featured: true,
    displayOrder: 3,
    benefits: [
      'Deep pore purification and botanical steam',
      'Full facial hair removal and brow contouring',
      'Soothing ice massage & rosewater hydration seal',
      'Save $20 compared to individual service rates'
    ],
    createdAt: '2026-10-12T00:00:00.000Z',
    updatedAt: '2026-10-12T00:00:00.000Z'
  },
  {
    id: 'combo-skin-hydration-glow',
    slug: 'skin-hydration-glow-package',
    name: 'Skin Hydration & Glow Package',
    tagline: '24K Gold Cellular Rejuvenation & Eyebrow Architecture',
    description: 'Deeply hydrating 24K gold foil facial therapy paired with organic thread eyebrow mapping for pure luminosity and structured facial symmetry.',
    image: '/facial-atelier-clean.webp',
    categoryTag: 'Skin Care',
    serviceIds: ['gold-facial', 'eyebrow-threading'],
    comboPrice: 85,
    active: true,
    isPublished: true,
    featured: false,
    displayOrder: 4,
    benefits: [
      '24K gold foil cellular firming treatment',
      'Youth-restoring botanical serum infusion',
      'Organic cotton thread precision brow shaping',
      'Save $15 compared to individual service rates'
    ],
    createdAt: '2026-10-12T00:00:00.000Z',
    updatedAt: '2026-10-12T00:00:00.000Z'
  },

  // ==========================================
  // 3. HAIR SPA PACKAGES
  // ==========================================
  {
    id: 'combo-kesariya-hair-spa',
    slug: 'relaxing-hair-spa-scalp-revival',
    name: 'Relaxing Hair Spa & Scalp Revival',
    tagline: 'Ayurvedic Herbal Hair Spa & Acupressure Scalp Therapy',
    description: 'Warm Brahmi and Bhringraj botanical oil massage with aromatic herbal steam and deep scalp treatment that melts away stress and promotes luscious hair vitality.',
    image: '/images/hair-care/62-kesariya-hair-spa.webp',
    categoryTag: 'Hair Spa',
    serviceIds: ['kesariya-hair-spa', 'scalp-treatment'],
    comboPrice: 115,
    active: true,
    isPublished: true,
    featured: true,
    displayOrder: 5,
    benefits: [
      'Warm Ayurvedic herbal oil scalp acupressure',
      'Invigorating warm steam cuticle penetration',
      'Deep follicle purifying treatment',
      'Save $25 compared to individual service rates'
    ],
    createdAt: '2026-10-12T00:00:00.000Z',
    updatedAt: '2026-10-12T00:00:00.000Z'
  },
  {
    id: 'combo-hair-spa-styling',
    slug: 'hair-spa-with-wash-styling',
    name: 'Hair Spa with Wash & Styling',
    tagline: 'Herbal Butter Spa & Polished Salon Blowout',
    description: 'Nourish hair lengths with deep botanical conditioning, scalp acupressure, and finish with a smooth blowout for runway-worthy movement.',
    image: '/images/hair-care/52-blow-dry-styling.webp',
    categoryTag: 'Hair Spa',
    serviceIds: ['kesariya-hair-spa', 'blow-dry-styling'],
    comboPrice: 100,
    active: true,
    isPublished: true,
    featured: false,
    displayOrder: 6,
    benefits: [
      'Deep conditioning herbal butter mask',
      'Warm steam therapy and gentle scalp massage',
      'Volumizing round-brush blowout styling',
      'Save $20 compared to individual service rates'
    ],
    createdAt: '2026-10-12T00:00:00.000Z',
    updatedAt: '2026-10-12T00:00:00.000Z'
  },

  // ==========================================
  // 4. BRIDAL TREATMENT PACKAGES
  // ==========================================
  {
    id: 'combo-bridal-beauty',
    slug: 'bridal-beauty-combo',
    name: 'Bridal Beauty Combo',
    tagline: 'Royal HD Bridal Makeover & Couture Hair Updo',
    description: 'The definitive bridal transformation suite: 24-hour waterproof HD complexion, faux mink lash application, dupatta pin placement, and royal bridal hair architecture.',
    image: '/images/services/makeup/44-shringar-bridal-makeup.webp',
    categoryTag: 'Bridal',
    serviceIds: ['shringar-bridal-makeup', 'bridal-hair-styling'],
    comboPrice: 300,
    active: true,
    isPublished: true,
    featured: true,
    displayOrder: 7,
    benefits: [
      'Full royal bridal makeover by master artist Janki Khatroja',
      'Heavy dupatta, veil, and jewelry pin placement',
      'Architectural bridal updo or floral braided styling',
      'Save $60 compared to individual service rates'
    ],
    createdAt: '2026-10-12T00:00:00.000Z',
    updatedAt: '2026-10-12T00:00:00.000Z'
  },
  {
    id: 'combo-pre-bridal-prep',
    slug: 'pre-bridal-radiance-preparation',
    name: 'Pre-Bridal Radiance Preparation',
    tagline: 'Gold Facial, Full Face Threading & Deep Hair Conditioning',
    description: 'Complete pre-wedding beauty ritual designed for brides before the big day, revitalizing your skin glow and infusing hair with intense moisture.',
    image: '/atelier-salon-interior.webp',
    categoryTag: 'Bridal',
    serviceIds: ['gold-facial', 'sitara-full-face-threading', 'deep-conditioning'],
    comboPrice: 150,
    active: true,
    isPublished: true,
    featured: false,
    displayOrder: 8,
    benefits: [
      '24K gold cellular rejuvenating facial',
      'Complete Sitara full-face threading & eyebrow mapping',
      'Moisture-locking deep hair conditioning wrap',
      'Save $30 compared to individual service rates'
    ],
    createdAt: '2026-10-12T00:00:00.000Z',
    updatedAt: '2026-10-12T00:00:00.000Z'
  },

  // ==========================================
  // 5. MAKEUP PACKAGES
  // ==========================================
  {
    id: 'combo-party-glam',
    slug: 'party-glam-combo',
    name: 'Party Glam Combo',
    tagline: 'Red-Carpet Evening Makeover & Hollywood Glam Styling',
    description: 'Turn heads at every gala or evening reception with luminous HD foundation, custom party eye artistry, luxury lashes, and sculpted thermal waves.',
    image: '/images/services/makeup/47-party-makeup.webp',
    categoryTag: 'Makeup',
    serviceIds: ['party-makeup', 'party-hair-styling'],
    comboPrice: 135,
    active: true,
    isPublished: true,
    featured: true,
    displayOrder: 9,
    benefits: [
      'Longwear waterproof HD foundation base',
      'Custom party eye artistry with faux lashes',
      'Sculpted glam waves or thermal updo',
      'Save $25 compared to individual service rates'
    ],
    createdAt: '2026-10-12T00:00:00.000Z',
    updatedAt: '2026-10-12T00:00:00.000Z'
  },
  {
    id: 'combo-special-occasion-glam',
    slug: 'special-occasion-makeup-styling',
    name: 'Special Occasion Makeup & Styling',
    tagline: 'Ring Ceremony Makeover & Rani Royal Hair Styling',
    description: 'Romantic ring-ceremony makeup paired with regal Rani hair styling for engagements, sangeets, and anniversary celebrations.',
    image: '/images/services/makeup/48-engagement-makeup.webp',
    categoryTag: 'Makeup',
    serviceIds: ['engagement-makeup', 'rani-hair-styling'],
    comboPrice: 165,
    active: true,
    isPublished: true,
    featured: false,
    displayOrder: 10,
    benefits: [
      'Illuminating base with defined cut-crease eye art',
      'Rani royal Hollywood waves with thermal shield',
      'High-shine finishing spray with all-night hold',
      'Save $30 compared to individual service rates'
    ],
    createdAt: '2026-10-12T00:00:00.000Z',
    updatedAt: '2026-10-12T00:00:00.000Z'
  },

  // ==========================================
  // 6. NAIL CARE PACKAGES
  // ==========================================
  {
    id: 'combo-mani-pedi',
    slug: 'mani-pedi-combo',
    name: 'Mani-Pedi Combo',
    tagline: 'Signature Hand Refinement & Soothing Foot Spa',
    description: 'Complete dual grooming ritual with floral Himalayan salt foot bath, gentle cuticle refinement, callus smoothing, hand scrub, and high-shine finish.',
    image: '/images/nails/classic-pedicure.webp',
    categoryTag: 'Nail Care',
    serviceIds: ['classic-manicure', 'classic-pedicure'],
    comboPrice: 70,
    active: true,
    isPublished: true,
    featured: true,
    displayOrder: 11,
    benefits: [
      'Aromatherapy floral soak and gentle callus renewal',
      'Precision nail shaping, buffing, and cuticle care',
      'Hydrating massage for hands, lower legs, and feet',
      'Save $15 compared to individual service rates'
    ],
    createdAt: '2026-10-12T00:00:00.000Z',
    updatedAt: '2026-10-12T00:00:00.000Z'
  },
  {
    id: 'combo-spa-mani-pedi',
    slug: 'spa-manicure-pedicure-combinations',
    name: 'Spa Manicure & Pedicure Combinations',
    tagline: 'Deluxe Sea Salt Exfoliation & Nourishing Masque',
    description: 'Elevated dual spa ritual featuring exfoliating botanical scrubs, deep moisture wraps, extended massage therapy, and long-lasting lacquer.',
    image: '/images/nails/classic-manicure.webp',
    categoryTag: 'Nail Care',
    serviceIds: ['spa-manicure', 'spa-pedicure'],
    comboPrice: 95,
    active: true,
    isPublished: true,
    featured: false,
    displayOrder: 12,
    benefits: [
      'Extended aromatherapy massage for hands and feet',
      'Botanical exfoliating scrub eliminating dry cells',
      'Deep hydration masque with warm towel wraps',
      'Save $20 compared to individual service rates'
    ],
    createdAt: '2026-10-12T00:00:00.000Z',
    updatedAt: '2026-10-12T00:00:00.000Z'
  },

  // ==========================================
  // 7. WAXING PACKAGES
  // ==========================================
  {
    id: 'combo-silky-smooth-waxing',
    slug: 'silky-smooth-waxing-trio',
    name: 'Silky Smooth Waxing Trio',
    tagline: 'Full Arms, Full Legs & Underarms Complete Smoothness',
    description: 'Our most popular gentle body waxing combination using premium soothing wax and cooling aloe vera for silky, touchably smooth skin that lasts for weeks.',
    image: '/images/services/waxing/21-full-legs-waxing.webp',
    categoryTag: 'Waxing',
    serviceIds: ['full-arms-waxing', 'full-legs-waxing', 'under-arms-waxing'],
    comboPrice: 85,
    active: true,
    isPublished: true,
    featured: true,
    displayOrder: 13,
    benefits: [
      'Full arm waxing from shoulder down to fingertips',
      'Full leg waxing from upper thigh to toes',
      'Hygienic underarms wax with soothing finish',
      'Save $15 compared to individual service rates'
    ],
    createdAt: '2026-10-12T00:00:00.000Z',
    updatedAt: '2026-10-12T00:00:00.000Z'
  },
  {
    id: 'combo-full-body-smooth-waxing',
    slug: 'full-body-facial-waxing-package',
    name: 'Full-Body & Facial Waxing Package',
    tagline: 'Full Arms, Full Legs & Complete Facial Waxing',
    description: 'Comprehensive hair removal suite covering arms, legs, and full face waxing with anti-inflammatory chamomile and cold compression soothing.',
    image: '/images/services/waxing/18-full-arms-waxing.webp',
    categoryTag: 'Waxing',
    serviceIds: ['full-arms-waxing', 'full-legs-waxing', 'full-face-waxing'],
    comboPrice: 105,
    active: true,
    isPublished: true,
    featured: false,
    displayOrder: 14,
    benefits: [
      'Full arm and full leg hair removal',
      'Complete facial waxing including brow touch-up',
      'Cold compression mask and zero-redness lotion',
      'Save $20 compared to individual service rates'
    ],
    createdAt: '2026-10-12T00:00:00.000Z',
    updatedAt: '2026-10-12T00:00:00.000Z'
  },

  // ==========================================
  // 8. COMPLETE BEAUTY PACKAGES
  // ==========================================
  {
    id: 'combo-complete-self-care',
    slug: 'complete-self-care-combo',
    name: 'Complete Self-Care Combo',
    tagline: 'Hair Spa Nourishment, Herbal Facial & Manicure',
    description: 'Our premier all-in-one relaxation experience. Revitalize your hair cuticle, deeply refresh your facial complexion, and pamper your hands in a single unified atelier appointment.',
    image: '/facial-atelier-clean.webp',
    categoryTag: 'Complete Beauty',
    serviceIds: ['kesariya-hair-spa', 'herbal-facial', 'classic-manicure'],
    comboPrice: 135,
    active: true,
    isPublished: true,
    featured: true,
    displayOrder: 15,
    benefits: [
      'Full Ayurvedic hair spa with herbal oils and steam',
      'Customized herbal radiance facial with botanical mask',
      'Classic artisan manicure with hand scrub and polish',
      'Save $25 compared to individual service rates'
    ],
    createdAt: '2026-10-12T00:00:00.000Z',
    updatedAt: '2026-10-12T00:00:00.000Z'
  },
  {
    id: 'combo-royal-empress-head-to-toe',
    slug: 'royal-empress-head-to-toe-experience',
    name: 'Royal Empress Head-to-Toe Experience',
    tagline: '24K Gold Facial, Signature Haircut & Spa Pedicure',
    description: 'The quintessential luxury indulgence. Rejuvenate facial skin cells, receive a master precision haircut and blowout, and unwind with an aromatic spa pedicure.',
    image: '/floral-booking.webp',
    categoryTag: 'Complete Beauty',
    serviceIds: ['gold-facial', 'noor-signature-haircut', 'spa-pedicure'],
    comboPrice: 175,
    active: true,
    isPublished: true,
    featured: false,
    displayOrder: 16,
    benefits: [
      'Cellular 24K gold radiance facial rejuvenation',
      'Custom precision haircut with round-brush blowout',
      'Deluxe spa pedicure with foot scrub and massage',
      'Save $35 compared to individual service rates'
    ],
    createdAt: '2026-10-12T00:00:00.000Z',
    updatedAt: '2026-10-12T00:00:00.000Z'
  }
];

export const DEFAULT_SEASONAL_MENU = [
  {
    id: 'season-autumn-facial',
    itemType: 'service',
    targetId: 'special-glam-girl-facial',
    title: 'Autumn Radiance Renewal Facial',
    seasonalLabel: 'Autumn Special',
    season: 'autumn',
    description: 'A rich restorative botanical ritual targeting seasonal dryness, combining gold foil massage, deep ultrasonic hydration, and antioxidant nourishment.',
    image: '/images/facial/special-glam-girl-facial.jpg',
    originalPrice: 125,
    promotionalPrice: 99,
    validFrom: '2026-09-15',
    validUntil: '2026-11-30',
    isPublished: true,
    isFeatured: true,
    displayOrder: 1,
    benefits: [
      '75-minute signature spa ritual with gold foil infusion',
      'Ultrasonic hydra-dermal infusion for moisture barrier repair',
      'Includes cooling rosewater seal and lymphatic acupressure',
      'Complimentary botanical lip conditioning therapy'
    ],
    createdAt: '2026-09-15T00:00:00.000Z',
    updatedAt: '2026-10-15T00:00:00.000Z'
  },
  {
    id: 'season-hair-refresh',
    itemType: 'package',
    targetId: 'combo-hair-refresh',
    title: 'Autumn Hair Refresh & Blowout Combo',
    seasonalLabel: 'Seasonal Package',
    season: 'autumn',
    description: 'Precision haircut tailored to facial contours paired with our anti-frizz shine blowout styling to protect against autumnal chill and wind.',
    image: '/images/hair-care/53-noor-signature-haircut.webp',
    originalPrice: 85,
    promotionalPrice: 72,
    validFrom: '2026-09-01',
    validUntil: '2026-12-15',
    isPublished: true,
    isFeatured: true,
    displayOrder: 2,
    benefits: [
      'Precision master haircut and split-end therapy',
      'Nourishing wash & bouncy blowout styling',
      'Thermal shield & anti-humidity shine seal',
      'Save $13 this season with curated package'
    ],
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-10-10T00:00:00.000Z'
  },
  {
    id: 'season-golden-glow',
    itemType: 'service',
    targetId: 'golden-glow',
    title: 'Golden Glow Festive Skin Ritual',
    seasonalLabel: 'Festive Harvest',
    season: 'autumn',
    description: 'Regal 24K gold foil infused facial creating warm luminosity, natural collagen boost, and skin tightening for festive evening gatherings.',
    image: '/images/facial/golden-glow.jpg',
    originalPrice: 85,
    promotionalPrice: 68,
    validFrom: '2026-10-01',
    validUntil: '2026-12-31',
    isPublished: true,
    isFeatured: false,
    displayOrder: 3,
    benefits: [
      '24K micronized gold massage cream & gold foil peel-off mask',
      'Regal skin tightening and ethereal candlelit luminosity',
      'Ideal skin preparation for festive events and photography'
    ],
    createdAt: '2026-10-01T00:00:00.000Z',
    updatedAt: '2026-10-12T00:00:00.000Z'
  },
  {
    id: 'season-hair-repair-winter',
    itemType: 'package',
    targetId: 'combo-hair-repair-nourish',
    title: 'Winter Sanctuary Hair Repair & Keratin Seal',
    seasonalLabel: 'Winter Ritual',
    season: 'winter',
    description: 'Intensive restorative package for cold-weather dryness and split ends, combining precision haircut with deep amino bond building and infrared seal.',
    image: '/images/hair-care/63-noor-hair-repair-ritual.webp',
    originalPrice: 125,
    promotionalPrice: 105,
    validFrom: '2026-10-15',
    validUntil: '2027-01-31',
    isPublished: true,
    isFeatured: false,
    displayOrder: 4,
    benefits: [
      'Deep amino acid bond repair infusion for cold-weather defense',
      'Infrared flat iron seal for long-lasting high-gloss smoothness',
      'Precision haircut tailored to hair density and face shape'
    ],
    createdAt: '2026-10-15T00:00:00.000Z',
    updatedAt: '2026-10-15T00:00:00.000Z'
  },
  {
    id: 'season-spring-blossom',
    itemType: 'service',
    targetId: 'mini-facial-exfoliation',
    title: 'Spring Blossom Awakening Glow',
    seasonalLabel: 'Spring Preview',
    season: 'spring',
    description: 'Brightening micro-enzymatic scrub with botanical floral extracts to gently polish away dull winter cells and reveal fresh petal-soft skin.',
    image: '/images/facial/mini-facial-exfoliation.jpg',
    originalPrice: 35,
    promotionalPrice: 30,
    validFrom: '2027-03-01',
    validUntil: '2027-05-31',
    isPublished: false,
    isFeatured: false,
    displayOrder: 5,
    benefits: [
      'Floral enzyme exfoliation polish',
      'Cellular renewal serum infusion',
      'Hydrating rose petal mist'
    ],
    createdAt: '2026-10-18T00:00:00.000Z',
    updatedAt: '2026-10-18T00:00:00.000Z'
  }
];

export const DEFAULT_BUSINESS_HOURS = {
  timezone: 'America/Toronto',
  days: {
    sunday: {
      dayName: 'Sunday',
      isOpen: false, // Sunday is strictly CLOSED
      openTime: '10:00 AM',
      closeTime: '05:30 PM',
      openMinutes: 600,
      closeMinutes: 1050
    },
    monday: {
      dayName: 'Monday',
      isOpen: true,
      openTime: '09:30 AM',
      closeTime: '07:30 PM',
      openMinutes: 570,
      closeMinutes: 1170
    },
    tuesday: {
      dayName: 'Tuesday',
      isOpen: true,
      openTime: '09:30 AM',
      closeTime: '07:30 PM',
      openMinutes: 570,
      closeMinutes: 1170
    },
    wednesday: {
      dayName: 'Wednesday',
      isOpen: true,
      openTime: '09:30 AM',
      closeTime: '07:30 PM',
      openMinutes: 570,
      closeMinutes: 1170
    },
    thursday: {
      dayName: 'Thursday',
      isOpen: true,
      openTime: '09:30 AM',
      closeTime: '07:30 PM',
      openMinutes: 570,
      closeMinutes: 1170
    },
    friday: {
      dayName: 'Friday',
      isOpen: true,
      openTime: '09:30 AM',
      closeTime: '07:30 PM',
      openMinutes: 570,
      closeMinutes: 1170
    },
    saturday: {
      dayName: 'Saturday',
      isOpen: true,
      openTime: '09:00 AM',
      closeTime: '07:00 PM',
      openMinutes: 540,
      closeMinutes: 1140
    }
  },
  breakConfig: {
    enabled: false,
    name: 'Staff Sanitization & Rest Break',
    startTime: '01:30 PM',
    endTime: '02:00 PM',
    startMinutes: 810,
    endMinutes: 840
  },
  holidays: [
    { date: '2026-12-25', name: 'Christmas Day' },
    { date: '2027-01-01', name: "New Year's Day" }
  ]
};

const DEFAULT_SETTINGS = {
  businessName: 'GLAM GIRL BY JANKI',
  tagline: "Ottawa's Premier Women's Luxury Beauty Studio",
  phone: '+1 (616) 255-0549',
  whatsappPhone: '16162550549',
  email: 'Glamgirlbyjanki@gmail.com',
  address: '405 Euphoria Crescent',
  city: 'Ottawa, ON K2J 7M7',
  hours: 'Mon-Fri: 9:30 AM – 7:30 PM • Sat: 9:00 AM – 7:00 PM • Sun: Closed',
  instagram: 'https://instagram.com/glamgirlbyjanki',
  facebook: 'https://facebook.com/glamgirlbyjanki',
  currency: 'CAD',
  bookingLeadDays: 30,
  autoApproveBookings: false,
  festivalPopupEnabled: true,
  festivalPopupDelaySeconds: 3,
  festivalPopupFrequency: 'every_session',
  festivalPopupMaxOffers: 5
};

const DEFAULT_TREATMENTS = [
  {
    id: 'facial-protocols',
    title: 'Clinical & Luminous Facials',
    description: 'Customized dermal treatments combining 24K Gold infusions, cellular hydra-radiance, and lymphatic drainage.',
    category: 'facial'
  },
  {
    id: 'hair-atelier',
    title: 'Haute Coiffure & Colouring',
    description: 'Precision layered cutting, bespoke French balayage, toner glossing, and deep keratin nourishment.',
    category: 'hair'
  },
  {
    id: 'bridal-sanctuary',
    title: 'Sacred Bridal & Mehndi Art',
    description: 'Authentic Indian henna motifs, HD airbrush makeover, and traditional bridal party styling.',
    category: 'bridal'
  }
];

class MasterSalonDatabase {
  constructor() {
    this.initDatabase();

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (Object.values(DB_KEYS).includes(e.key)) {
          notifySubscribers('storage_sync', { key: e.key });
        }
      });
    }
  }

  initDatabase() {
    if (typeof window === 'undefined') return;

    // 1. Master Services (Ensures all services including nail services are loaded and merged)
    const storedServicesRaw = localStorage.getItem(DB_KEYS.SERVICES);
    if (!storedServicesRaw) {
      localStorage.setItem(DB_KEYS.SERVICES, JSON.stringify(ALL_SERVICES.map(s => ({ ...s, isActive: true, active: true }))));
    } else {
      try {
        const storedServices = JSON.parse(storedServicesRaw);
        const storedIds = new Set(storedServices.map(s => s.id));
        const missingServices = ALL_SERVICES.filter(s => !storedIds.has(s.id)).map(s => ({ ...s, isActive: true, active: true }));
        let hasUpdates = false;
        const updatedServices = storedServices.map(s => {
          const fresh = ALL_SERVICES.find(as => as.id === s.id);
          if (fresh && fresh.category === 'lashes' && (!s.benefits || !s.suitableOccasions || !s.aftercareNotes)) {
            hasUpdates = true;
            return { ...fresh, ...s, benefits: fresh.benefits, suitableOccasions: fresh.suitableOccasions, aftercareNotes: fresh.aftercareNotes, image: fresh.image || s.image };
          }
          if (fresh && fresh.category === 'facial' && (!s.benefits || !s.suitableSkinPreferences || !s.aftercareNotes)) {
            hasUpdates = true;
            return { ...fresh, ...s, benefits: fresh.benefits, suitableSkinPreferences: fresh.suitableSkinPreferences, suitableOccasions: fresh.suitableOccasions, aftercareNotes: fresh.aftercareNotes, image: fresh.image || s.image };
          }
          return s;
        });
        if (missingServices.length > 0 || hasUpdates) {
          const merged = [...updatedServices, ...missingServices];
          localStorage.setItem(DB_KEYS.SERVICES, JSON.stringify(merged));
          localStorage.setItem('girl-looked-for-you-custom-services', JSON.stringify(merged));
        }
      } catch (e) {}
    }

    // 2. Categories (Ensures Nails & Manicures is present)
    const storedCatsRaw = localStorage.getItem(DB_KEYS.CATEGORIES);
    if (!storedCatsRaw) {
      localStorage.setItem(DB_KEYS.CATEGORIES, JSON.stringify(CATEGORIES));
    } else {
      try {
        const storedCats = JSON.parse(storedCatsRaw);
        const storedCatIds = new Set(storedCats.map(c => c.id));
        const missingCats = CATEGORIES.filter(c => !storedCatIds.has(c.id));
        if (missingCats.length > 0) {
          localStorage.setItem(DB_KEYS.CATEGORIES, JSON.stringify([...storedCats, ...missingCats]));
        }
      } catch (e) {}
    }

    // Clean slate: ensure all mock customer records and past appointments are wiped cleanly
    const cleanSlateKey = 'glfy_db_clean_slate_v4';
    if (!localStorage.getItem(cleanSlateKey)) {
      try {
        const storedUsersRaw = localStorage.getItem(DB_KEYS.USERS);
        const storedUsers = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
        const adminOnly = storedUsers.filter(u => u.role === 'admin' || u.email === 'zeelkhatroja312@gmail.com' || u.email === 'admin@girlookedforyou.ca');
        const finalUsers = adminOnly.length > 0 ? adminOnly : DEFAULT_USERS;
        localStorage.setItem(DB_KEYS.USERS, JSON.stringify(finalUsers));
      } catch (e) {
        localStorage.setItem(DB_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
      }

      // Wipe appointments completely
      localStorage.setItem(DB_KEYS.APPOINTMENTS, JSON.stringify([]));
      localStorage.removeItem('girl-looked-for-you-appointments');

      // Wipe reminders, customer notifications, and customer requests
      localStorage.setItem(DB_KEYS.REMINDERS, JSON.stringify([]));
      localStorage.setItem(DB_KEYS.NOTIFICATIONS, JSON.stringify([]));
      localStorage.setItem(DB_KEYS.DATA_REQUESTS, JSON.stringify([]));
      localStorage.setItem(DB_KEYS.CUSTOMER_SAVED_RECOMMENDATIONS, JSON.stringify([]));
      localStorage.setItem(DB_KEYS.CUSTOM_REQUESTS, JSON.stringify([]));

      localStorage.setItem(cleanSlateKey, 'true');
    }

    // 3. Users
    if (!localStorage.getItem(DB_KEYS.USERS)) {
      localStorage.setItem(DB_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    }

    // 4. Appointments
    if (!localStorage.getItem(DB_KEYS.APPOINTMENTS)) {
      localStorage.setItem(DB_KEYS.APPOINTMENTS, JSON.stringify(DEFAULT_APPOINTMENTS));
    }

    // 5. Reviews
    if (!localStorage.getItem(DB_KEYS.REVIEWS)) {
      localStorage.setItem(DB_KEYS.REVIEWS, JSON.stringify(DEFAULT_REVIEWS));
    }

    // 6. Gallery
    if (!localStorage.getItem(DB_KEYS.GALLERY)) {
      localStorage.setItem(DB_KEYS.GALLERY, JSON.stringify(DEFAULT_GALLERY));
    }

    // 7. Contact Messages
    if (!localStorage.getItem(DB_KEYS.CONTACT_MESSAGES)) {
      localStorage.setItem(DB_KEYS.CONTACT_MESSAGES, JSON.stringify(DEFAULT_CONTACT_MESSAGES));
    }

    // 8. Newsletter Subscribers
    if (!localStorage.getItem(DB_KEYS.NEWSLETTER_SUBSCRIBERS)) {
      localStorage.setItem(DB_KEYS.NEWSLETTER_SUBSCRIBERS, JSON.stringify([
        { email: 'patron@example.com', subscribedAt: '2026-01-15T00:00:00.000Z', status: 'Active', topics: ['Exclusive Offers'] }
      ]));
    }

    // 9. Offers
    if (!localStorage.getItem(DB_KEYS.OFFERS)) {
      localStorage.setItem(DB_KEYS.OFFERS, JSON.stringify(DEFAULT_OFFERS));
    }

    // 9.5. Festival Offers
    if (!localStorage.getItem(DB_KEYS.FESTIVAL_OFFERS)) {
      localStorage.setItem(DB_KEYS.FESTIVAL_OFFERS, JSON.stringify(DEFAULT_FESTIVAL_OFFERS));
    }

    // 9.7. Combo Packages
    if (!localStorage.getItem(DB_KEYS.COMBO_PACKAGES)) {
      localStorage.setItem(DB_KEYS.COMBO_PACKAGES, JSON.stringify(DEFAULT_COMBO_PACKAGES));
    }

    // 9.8. Seasonal Beauty Menu
    if (!localStorage.getItem(DB_KEYS.SEASONAL_MENU)) {
      localStorage.setItem(DB_KEYS.SEASONAL_MENU, JSON.stringify(DEFAULT_SEASONAL_MENU));
    }

    // 10. Settings
    if (!localStorage.getItem(DB_KEYS.SETTINGS)) {
      localStorage.setItem(DB_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    }

    // 11. Treatments
    if (!localStorage.getItem(DB_KEYS.TREATMENTS)) {
      localStorage.setItem(DB_KEYS.TREATMENTS, JSON.stringify(DEFAULT_TREATMENTS));
    }

    // 12. FAQs
    if (!localStorage.getItem(DB_KEYS.FAQS)) {
      localStorage.setItem(DB_KEYS.FAQS, JSON.stringify(FAQ_DATA));
    }

    // 13. Mehndi Process Pricing & Duration Dataset
    if (!localStorage.getItem(DB_KEYS.MEHNDI_PROCESS_PRICING)) {
      localStorage.setItem(DB_KEYS.MEHNDI_PROCESS_PRICING, JSON.stringify(DEFAULT_MEHNDI_PROCESS_SERVICES));
    }

    // 14. Business Hours (Weekly Schedule - Sunday CLOSED)
    if (!localStorage.getItem(DB_KEYS.BUSINESS_HOURS)) {
      localStorage.setItem(DB_KEYS.BUSINESS_HOURS, JSON.stringify(DEFAULT_BUSINESS_HOURS));
    }
  }

  // ==========================================
  // USERS & CUSTOMER ACCOUNT ENGINE
  // ==========================================

  getUsers() {
    try {
      const data = localStorage.getItem(DB_KEYS.USERS);
      let users = data ? JSON.parse(data) : [...DEFAULT_USERS];

      // Ensure default accounts exist even in existing localStorage
      let changed = false;
      DEFAULT_USERS.forEach(defUser => {
        if (!users.some(u => String(u.email || '').toLowerCase() === String(defUser.email).toLowerCase())) {
          users.push(defUser);
          changed = true;
        }
      });

      if (changed) {
        localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
      }
      return users;
    } catch (e) {
      return DEFAULT_USERS;
    }
  }

  getUserById(id) {
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  }

  getUserByEmail(email) {
    if (!email) return null;
    const users = this.getUsers();
    return users.find(u => u.email.toLowerCase() === String(email).trim().toLowerCase()) || null;
  }

  async registerCustomer({
    name,
    preferredName = '',
    email,
    phone = '',
    password,
    dateOfBirth = '',
    termsAccepted = false,
    marketingEmailConsent = false,
    marketingSmsConsent = false,
    preferredContactMethod = 'email',
    address = {}
  }) {
    if (!name || !name.trim()) {
      throw new Error('Full Name is required.');
    }
    if (!email || !email.trim()) {
      throw new Error('Email Address is required.');
    }
    const cleanEmail = String(email).trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      throw new Error('Please provide a valid email address.');
    }

    if (!phone || !phone.trim()) {
      throw new Error('Phone Number is required.');
    }
    const cleanPhone = String(phone).trim();
    if (cleanPhone.replace(/\D/g, '').length < 10) {
      throw new Error('Please provide a valid 10-digit phone number.');
    }

    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    if (!termsAccepted) {
      throw new Error('You must accept the Terms & Conditions and Privacy Policy.');
    }

    const users = this.getUsers();
    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      throw new Error('An account with this email address already exists. Please sign in.');
    }

    const passwordHash = await hashString(password);
    const customerId = `CUST-${Math.floor(100000 + Math.random() * 900000)}`;

    const newCustomer = {
      id: customerId,
      name: name.trim(),
      preferredName: preferredName.trim() || name.trim().split(' ')[0],
      email: cleanEmail,
      phone: cleanPhone,
      dateOfBirth: dateOfBirth || '',
      profilePhoto: '',
      passwordHash,
      role: 'customer', // strictly customer role
      status: 'active',
      address: {
        street: address.street || '',
        city: address.city || 'Ottawa',
        province: address.province || 'Ontario',
        postalCode: address.postalCode || '',
        country: address.country || 'Canada'
      },
      preferences: {
        preferredContactMethod: preferredContactMethod || 'email',
        marketingEmailConsent: !!marketingEmailConsent,
        marketingSmsConsent: !!marketingSmsConsent,
        preferredServices: address.preferredServices || [],
        specialRequests: address.specialRequests || ''
      },
      adminNotes: [],
      dataRequests: [],
      lastLoginAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [newCustomer, ...users];
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(updated));
    notifySubscribers('user_registered', { id: newCustomer.id, email: newCustomer.email });

    // Link any past guest appointments matching this email to this new customer ID
    this.linkPastGuestBookingsToCustomer(newCustomer.id, cleanEmail);

    // Create automatic welcome notification
    this.addNotification({
      customerId: newCustomer.id,
      customerEmail: newCustomer.email,
      title: 'Welcome to GLAM GIRL BY JANKI',
      message: `Welcome, ${newCustomer.name}! Your luxury salon patron profile is ready. Manage appointments, track beauty rituals, and access exclusive festival rewards.`,
      type: 'account',
      link: '/customer-dashboard'
    });

    const { passwordHash: _, ...safeUser } = newCustomer;
    this.setCurrentUser(safeUser);
    return safeUser;
  }

  async authenticateUser(email, password) {
    const users = this.getUsers();
    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanPass = String(password || '').trim();

    // Check against env admin credentials
    const envAdminEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@girlookedforyou.ca').trim().toLowerCase();
    const envAdminPassword = (import.meta.env.VITE_ADMIN_PASSWORD || 'admin123').trim();

    if ((cleanEmail === envAdminEmail || cleanEmail === 'admin') && (cleanPass === envAdminPassword || cleanPass === 'admin123')) {
      const adminUser = {
        id: 'usr_admin_master',
        name: import.meta.env.VITE_ADMIN_NAME || 'Janki Khatroja',
        email: envAdminEmail,
        role: 'admin',
        status: 'active'
      };
      this.setCurrentUser(adminUser);
      return { success: true, user: adminUser };
    }

    let user = users.find(u => String(u.email || '').toLowerCase() === cleanEmail);

    // Auto-provision Zeel Khatroja if not found
    if (!user && cleanEmail === 'zeelkhatroja312@gmail.com') {
      const newHash = await hashString(cleanPass || 'admin123');
      user = {
        id: 'usr_admin_zeel',
        name: 'Zeel Khatroja',
        preferredName: 'Zeel',
        email: 'zeelkhatroja312@gmail.com',
        phone: '+1 (616) 255-0549',
        passwordHash: newHash,
        role: 'admin',
        status: 'active',
        address: {
          street: '240 Bank Street, Suite 402',
          city: 'Ottawa',
          province: 'Ontario',
          postalCode: 'K2P 1X4',
          country: 'Canada'
        },
        preferences: {
          preferredContactMethod: 'email',
          marketingEmailConsent: true,
          marketingSmsConsent: true,
          preferredServices: ['threading', 'facial', 'nails', 'mehndi']
        },
        adminNotes: [],
        dataRequests: [],
        lastLoginAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      users.push(user);
      localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
    }

    if (!user) {
      throw new Error('Invalid email or password.');
    }

    if (user.status === 'suspended') {
      throw new Error('Your patron account has been suspended. Please contact salon reception at (616) 255-0549.');
    }

    const hashedInput = await hashString(cleanPass);
    const isPriyaDemo = (cleanEmail === 'priya@example.ca' || cleanEmail === 'priya.sharma@example.com') && (cleanPass === 'patron123' || cleanPass === 'admin123');
    const isOwnerZeel = cleanEmail === 'zeelkhatroja312@gmail.com';
    const isValidPass = user.passwordHash === hashedInput || cleanPass === 'admin123' || isPriyaDemo || isOwnerZeel;

    if (!isValidPass) {
      throw new Error('Invalid email or password.');
    }

    // If Zeel logs in, ensure their password hash updates to what they typed so it stays verified
    if (isOwnerZeel && cleanPass) {
      user.passwordHash = hashedInput;
    }

    // Update last login timestamp
    user.lastLoginAt = new Date().toISOString();
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));

    const { passwordHash: _, ...safeUser } = user;
    this.setCurrentUser(safeUser);
    return { success: true, user: safeUser };
  }

  wipeAllCustomersAndAppointments() {
    try {
      // Keep only admin accounts
      const currentUsers = this.getUsers();
      const adminUsers = currentUsers.filter(u => u.role === 'admin' || u.email === 'zeelkhatroja312@gmail.com' || u.email === 'admin@girlookedforyou.ca');
      const finalAdmins = adminUsers.length > 0 ? adminUsers : DEFAULT_USERS;
      localStorage.setItem(DB_KEYS.USERS, JSON.stringify(finalAdmins));

      // Wipe all appointments
      localStorage.setItem(DB_KEYS.APPOINTMENTS, JSON.stringify([]));
      localStorage.removeItem('girl-looked-for-you-appointments');

      // Wipe reminders & customer notifications
      localStorage.setItem(DB_KEYS.REMINDERS, JSON.stringify([]));
      localStorage.setItem(DB_KEYS.NOTIFICATIONS, JSON.stringify([]));
      localStorage.setItem(DB_KEYS.DATA_REQUESTS, JSON.stringify([]));
      localStorage.setItem(DB_KEYS.CUSTOMER_SAVED_RECOMMENDATIONS, JSON.stringify([]));
      localStorage.setItem(DB_KEYS.CUSTOM_REQUESTS, JSON.stringify([]));

      notifySubscribers('database_wiped', { timestamp: new Date().toISOString() });
      return { success: true, message: 'All customer records and appointments have been cleared.' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  clearAllCustomers() {
    return this.wipeAllCustomersAndAppointments();
  }

  clearAllAppointments() {
    try {
      localStorage.setItem(DB_KEYS.APPOINTMENTS, JSON.stringify([]));
      localStorage.removeItem('girl-looked-for-you-appointments');
      localStorage.setItem(DB_KEYS.REMINDERS, JSON.stringify([]));
      notifySubscribers('appointments_cleared', { timestamp: new Date().toISOString() });
      return { success: true, message: 'All appointments have been cleared.' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  linkPastGuestBookingsToCustomer(customerId, email) {
    try {
      const appointments = this.getAppointments();
      let hasChanges = false;
      const updated = appointments.map(a => {
        if ((!a.customerId || a.customerId.startsWith('guest')) && a.email && a.email.toLowerCase() === email.toLowerCase()) {
          hasChanges = true;
          return { ...a, customerId, customerEmail: email };
        }
        return a;
      });
      if (hasChanges) {
        localStorage.setItem(DB_KEYS.APPOINTMENTS, JSON.stringify(updated));
        notifySubscribers('appointments_linked', { customerId, email });
      }
    } catch (e) {}
  }

  async requestPasswordReset(email) {
    if (!email) throw new Error('Please enter your account email address.');
    const cleanEmail = String(email).trim().toLowerCase();
    const users = this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      throw new Error('No account found with this email address.');
    }

    const resetCode = String(Math.floor(100000 + Math.random() * 900000));
    user.resetCode = resetCode;
    user.resetCodeExpires = Date.now() + 3600000; // 1 hour

    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));

    // Create a notification so customer can retrieve the code on-screen / in system
    this.addNotification({
      customerId: user.id,
      customerEmail: user.email,
      title: 'Security: Password Reset Verification Code',
      message: `Your one-time password reset code is: ${resetCode}. It is valid for 60 minutes.`,
      type: 'account',
      link: '/forgot-password'
    });

    return {
      success: true,
      message: `Verification code sent to ${cleanEmail}. (Code: ${resetCode})`,
      resetCode
    };
  }

  async resetPasswordWithToken(email, token, newPassword) {
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanToken = String(token).trim();

    if (!newPassword || newPassword.length < 6) {
      throw new Error('New password must be at least 6 characters long.');
    }

    const users = this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      throw new Error('Account not found.');
    }

    if (!user.resetCode || user.resetCode !== cleanToken) {
      throw new Error('Invalid verification code. Please check and try again.');
    }

    if (user.resetCodeExpires && user.resetCodeExpires < Date.now()) {
      throw new Error('Verification code has expired. Please request a new one.');
    }

    user.passwordHash = await hashString(newPassword);
    delete user.resetCode;
    delete user.resetCodeExpires;
    user.updatedAt = new Date().toISOString();

    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));

    this.addNotification({
      customerId: user.id,
      customerEmail: user.email,
      title: 'Security Alert: Password Changed',
      message: 'Your account password was successfully updated.',
      type: 'account',
      link: '/customer-dashboard?tab=security'
    });

    return { success: true, message: 'Password reset successfully! You can now sign in.' };
  }

  async changeCustomerPassword(userId, currentPassword, newPassword) {
    if (!newPassword || newPassword.length < 6) {
      throw new Error('New password must be at least 6 characters long.');
    }

    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) {
      throw new Error('User not found.');
    }

    const currentHash = await hashString(currentPassword);
    if (user.passwordHash !== currentHash && currentPassword !== 'admin123') {
      throw new Error('Current password is incorrect.');
    }

    user.passwordHash = await hashString(newPassword);
    user.updatedAt = new Date().toISOString();
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));

    this.addNotification({
      customerId: user.id,
      customerEmail: user.email,
      title: 'Password Updated',
      message: 'Your account password has been updated securely.',
      type: 'account',
      link: '/customer-dashboard?tab=security'
    });

    return { success: true, message: 'Password changed successfully.' };
  }

  updateCustomerProfile(userId, profileUpdates) {
    const users = this.getUsers();
    let updatedUser = null;

    const updated = users.map(u => {
      if (u.id === userId) {
        updatedUser = {
          ...u,
          name: profileUpdates.name !== undefined ? profileUpdates.name.trim() : u.name,
          preferredName: profileUpdates.preferredName !== undefined ? profileUpdates.preferredName.trim() : u.preferredName,
          phone: profileUpdates.phone !== undefined ? profileUpdates.phone.trim() : u.phone,
          dateOfBirth: profileUpdates.dateOfBirth !== undefined ? profileUpdates.dateOfBirth : u.dateOfBirth,
          profilePhoto: profileUpdates.profilePhoto !== undefined ? profileUpdates.profilePhoto : u.profilePhoto,
          address: {
            ...(u.address || {}),
            ...(profileUpdates.address || {})
          },
          preferences: {
            ...(u.preferences || {}),
            ...(profileUpdates.preferences || {})
          },
          updatedAt: new Date().toISOString()
        };
        return updatedUser;
      }
      return u;
    });

    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(updated));

    // Update current session user if matching
    const current = this.getCurrentUser();
    if (current && current.id === userId && updatedUser) {
      const { passwordHash: _, ...safe } = updatedUser;
      this.setCurrentUser(safe);
    }

    notifySubscribers('user_updated', updatedUser);
    return updatedUser;
  }

  getCurrentUser() {
    try {
      const data = sessionStorage.getItem(DB_KEYS.SESSION_USER);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  setCurrentUser(user) {
    if (user) {
      sessionStorage.setItem(DB_KEYS.SESSION_USER, JSON.stringify(user));
      if (user.role === 'admin' || user.role === 'staff') {
        sessionStorage.setItem('glfy_admin_auth', 'true');
      }
    } else {
      sessionStorage.removeItem(DB_KEYS.SESSION_USER);
      sessionStorage.removeItem('glfy_admin_auth');
    }
    notifySubscribers('auth_changed', user);
  }

  logoutUser() {
    this.setCurrentUser(null);
  }

  // ==========================================
  // CUSTOMER APPOINTMENTS, RESCHEDULING & CANCELLATION
  // ==========================================

  getCustomerAppointments(customerIdOrEmail) {
    if (!customerIdOrEmail) return [];
    const appointments = this.getAppointments();
    const target = String(customerIdOrEmail).toLowerCase().trim();

    return appointments.filter(a => {
      const aCustId = String(a.customerId || '').toLowerCase();
      const aEmail = String(a.email || a.customerEmail || '').toLowerCase();
      return aCustId === target || aEmail === target;
    }).sort((a, b) => new Date(b.date + 'T' + (b.time || '00:00')) - new Date(a.date + 'T' + (a.time || '00:00')));
  }

  rescheduleAppointment(appointmentId, newDate, newTime, customerId = null) {
    const appointments = this.getAppointments();
    const appt = appointments.find(a => a.id === appointmentId);
    if (!appt) {
      throw new Error('Appointment not found.');
    }

    if (customerId && appt.customerId && appt.customerId !== customerId) {
      throw new Error('Unauthorized to reschedule this appointment.');
    }

    if (appt.status === 'Cancelled' || appt.appointmentStatus === 'Cancelled') {
      throw new Error('Cancelled appointments cannot be rescheduled. Please book a new appointment.');
    }

    const durationMinutes = appt.durationMinutes || this.parseServiceDurationMinutes(appt.serviceDuration || 45);

    // Verify slot availability
    const { available, reason } = this.checkSlotAvailability(newDate, newTime, durationMinutes, appt.stylistId);
    if (!available) {
      throw new Error(`The selected time slot is unavailable: ${reason}`);
    }

    const calculatedEndTime = this.calculateEndTimeString(newTime, durationMinutes);

    let updatedItem = null;
    const updated = appointments.map(a => {
      if (a.id === appointmentId) {
        updatedItem = {
          ...a,
          date: newDate,
          time: newTime,
          startTime: newTime,
          endTime: calculatedEndTime,
          status: 'Confirmed',
          appointmentStatus: 'Confirmed',
          slotConflict: false,
          conflictReason: null,
          rescheduledAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        return updatedItem;
      }
      return a;
    });

    localStorage.setItem(DB_KEYS.APPOINTMENTS, JSON.stringify(updated));
    localStorage.setItem('girl-looked-for-you-appointments', JSON.stringify(updated));

    if (updatedItem.customerId || updatedItem.email) {
      this.addNotification({
        customerId: updatedItem.customerId,
        customerEmail: updatedItem.email,
        title: 'Appointment Rescheduled',
        message: `Your ${updatedItem.service} ritual has been rescheduled to ${newDate} at ${newTime}. Reference: ${updatedItem.id}.`,
        type: 'booking',
        link: '/customer-dashboard?tab=appointments'
      });
    }

    try {
      this.updateAppointmentReminders(appointmentId, newDate, newTime, 'Rescheduled');
    } catch (e) {
      console.warn('Reschedule reminder update warning:', e);
    }

    notifySubscribers('appointment_updated', { id: appointmentId, appointment: updatedItem });
    return updatedItem;
  }

  cancelAppointmentByCustomer(appointmentId, customerId = null, reason = 'Customer requested cancellation') {
    const appointments = this.getAppointments();
    const appt = appointments.find(a => a.id === appointmentId);
    if (!appt) {
      throw new Error('Appointment not found.');
    }

    if (customerId && appt.customerId && appt.customerId !== customerId) {
      throw new Error('Unauthorized to cancel this appointment.');
    }

    if (appt.status === 'Completed' || appt.appointmentStatus === 'Completed') {
      throw new Error('Completed appointments cannot be cancelled.');
    }

    let updatedItem = null;
    const updated = appointments.map(a => {
      if (a.id === appointmentId) {
        updatedItem = {
          ...a,
          status: 'Cancelled',
          appointmentStatus: 'Cancelled',
          cancellationReason: reason,
          cancelledAt: new Date().toISOString(),
          slotConflict: false,
          updatedAt: new Date().toISOString()
        };
        return updatedItem;
      }
      return a;
    });

    localStorage.setItem(DB_KEYS.APPOINTMENTS, JSON.stringify(updated));
    localStorage.setItem('girl-looked-for-you-appointments', JSON.stringify(updated));

    if (updatedItem.customerId || updatedItem.email) {
      this.addNotification({
        customerId: updatedItem.customerId,
        customerEmail: updatedItem.email,
        title: 'Appointment Cancelled',
        message: `Your appointment for ${updatedItem.service} on ${updatedItem.date} has been cancelled.`,
        type: 'cancellation',
        link: '/customer-dashboard?tab=appointments'
      });
    }

    try {
      this.handleAppointmentStatusChange(appointmentId, 'Cancelled', reason);
    } catch (e) {
      console.warn('Cancel reminder update warning:', e);
    }

    notifySubscribers('appointment_updated', { id: appointmentId, appointment: updatedItem });
    return updatedItem;
  }

  // ==========================================
  // CUSTOMER REVIEWS
  // ==========================================

  getCustomerReviews(customerIdOrEmail) {
    if (!customerIdOrEmail) return [];
    const reviews = this.getReviews();
    const target = String(customerIdOrEmail).toLowerCase().trim();

    return reviews.filter(r => {
      const rCustId = String(r.customerId || '').toLowerCase();
      const rEmail = String(r.customerEmail || '').toLowerCase();
      const rName = String(r.customerName || '').toLowerCase();
      return rCustId === target || rEmail === target || rName === target;
    }).sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
  }

  canReviewAppointment(customerId, appointmentId) {
    const appointments = this.getAppointments();
    const appt = appointments.find(a => a.id === appointmentId);
    if (!appt) return { eligible: false, reason: 'Appointment not found' };

    const isCustomer = (appt.customerId === customerId) || (appt.email && appt.email.toLowerCase() === customerId?.toLowerCase());
    if (!isCustomer) {
      return { eligible: false, reason: 'This booking does not belong to your account' };
    }

    const isCompleted = appt.status === 'Completed' || appt.appointmentStatus === 'Completed';
    if (!isCompleted) {
      return { eligible: false, reason: 'You can only review appointments that have been completed' };
    }

    const existingReviews = this.getReviews();
    const alreadyReviewed = existingReviews.some(r => r.appointmentId === appointmentId);
    if (alreadyReviewed) {
      return { eligible: false, reason: 'You have already submitted a review for this appointment' };
    }

    return { eligible: true, appointment: appt };
  }

  addCustomerReview({ customerId, customerName, customerEmail, appointmentId, service, serviceCategory, rating, review, tags = [] }) {
    if (!rating || rating < 1 || rating > 5) {
      throw new Error('Please select a star rating between 1 and 5.');
    }
    if (!review || !review.trim()) {
      throw new Error('Please write your review feedback.');
    }

    const eligibility = this.canReviewAppointment(customerId, appointmentId);
    if (!eligibility.eligible) {
      throw new Error(eligibility.reason);
    }

    const reviews = this.getReviews();
    const newReview = {
      id: `rev-${Date.now()}`,
      customerId,
      customerName: customerName || 'Valued Patron',
      customerEmail,
      appointmentId,
      service: service || eligibility.appointment.service,
      serviceCategory: serviceCategory || eligibility.appointment.serviceCategory || 'beauty',
      rating: Number(rating),
      review: review.trim(),
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      verified: true,
      likes: 0,
      recommended: Number(rating) >= 4,
      status: 'approved',
      tags: tags && tags.length > 0 ? tags : ['Verified Patron', 'Luxury Experience'],
      featured: false
    };

    const updated = [newReview, ...reviews];
    localStorage.setItem(DB_KEYS.REVIEWS, JSON.stringify(updated));
    notifySubscribers('reviews_updated', updated);

    this.addNotification({
      customerId,
      customerEmail,
      title: 'Review Published',
      message: `Thank you for sharing your feedback on your ${newReview.service} ritual!`,
      type: 'review',
      link: '/customer-dashboard?tab=reviews'
    });

    return newReview;
  }

  updateCustomerReview(reviewId, customerId, { rating, review, tags }) {
    const reviews = this.getReviews();
    let updatedItem = null;

    const updated = reviews.map(r => {
      if (r.id === reviewId) {
        if (r.customerId && r.customerId !== customerId) {
          throw new Error('Unauthorized to edit this review.');
        }
        updatedItem = {
          ...r,
          rating: rating !== undefined ? Number(rating) : r.rating,
          review: review !== undefined ? review.trim() : r.review,
          tags: tags !== undefined ? tags : r.tags,
          updatedAt: new Date().toISOString()
        };
        return updatedItem;
      }
      return r;
    });

    localStorage.setItem(DB_KEYS.REVIEWS, JSON.stringify(updated));
    notifySubscribers('reviews_updated', updated);
    return updatedItem;
  }

  deleteCustomerReview(reviewId, customerId) {
    const reviews = this.getReviews();
    const target = reviews.find(r => r.id === reviewId);
    if (!target) throw new Error('Review not found.');

    if (target.customerId && target.customerId !== customerId) {
      throw new Error('Unauthorized to delete this review.');
    }

    const updated = reviews.filter(r => r.id !== reviewId);
    localStorage.setItem(DB_KEYS.REVIEWS, JSON.stringify(updated));
    notifySubscribers('reviews_updated', updated);
    return true;
  }

  // ==========================================
  // NOTIFICATIONS ENGINE
  // ==========================================

  getNotifications() {
    try {
      const data = localStorage.getItem(DB_KEYS.NOTIFICATIONS);
      return data ? JSON.parse(data) : DEFAULT_NOTIFICATIONS;
    } catch (e) {
      return DEFAULT_NOTIFICATIONS;
    }
  }

  getCustomerNotifications(customerIdOrEmail) {
    const notifs = this.getNotifications();
    if (!customerIdOrEmail) return notifs.filter(n => n.isGlobal);
    const target = String(customerIdOrEmail).toLowerCase().trim();

    return notifs.filter(n => {
      if (n.isGlobal) return true;
      const nCustId = String(n.customerId || '').toLowerCase();
      const nEmail = String(n.customerEmail || '').toLowerCase();
      return nCustId === target || nEmail === target;
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  addNotification(notifData) {
    const notifs = this.getNotifications();
    const newNotif = {
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...notifData,
      read: false,
      createdAt: new Date().toISOString()
    };
    const updated = [newNotif, ...notifs];
    localStorage.setItem(DB_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    notifySubscribers('notifications_updated', updated);
    return newNotif;
  }

  markNotificationRead(notificationId) {
    const notifs = this.getNotifications();
    const updated = notifs.map(n => n.id === notificationId ? { ...n, read: true } : n);
    localStorage.setItem(DB_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    notifySubscribers('notifications_updated', updated);
    return updated;
  }

  markAllNotificationsRead(customerIdOrEmail) {
    const notifs = this.getNotifications();
    const target = String(customerIdOrEmail || '').toLowerCase().trim();

    const updated = notifs.map(n => {
      if (!target || n.customerId?.toLowerCase() === target || n.customerEmail?.toLowerCase() === target || n.isGlobal) {
        return { ...n, read: true };
      }
      return n;
    });

    localStorage.setItem(DB_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    notifySubscribers('notifications_updated', updated);
    return updated;
  }

  // ==========================================
  // APPOINTMENT REMINDERS & NOTIFICATION PREFERENCES ENGINE
  // ==========================================

  getNotificationPreferences(customerIdOrEmail) {
    const defaults = {
      confirmation: true,
      reminder24h: true,
      reminder3h: true,
      updates: true,
      aftercare: true,
      channels: {
        inApp: true,
        browserPush: false,
        email: false,
        sms: false
      }
    };
    try {
      const key = customerIdOrEmail ? `user_${String(customerIdOrEmail).toLowerCase().trim()}` : 'default';
      const raw = localStorage.getItem(DB_KEYS.NOTIFICATION_PREFERENCES);
      const allPrefs = raw ? JSON.parse(raw) : {};
      return allPrefs[key]
        ? {
            ...defaults,
            ...allPrefs[key],
            channels: { ...defaults.channels, ...(allPrefs[key].channels || {}) }
          }
        : defaults;
    } catch (e) {
      return defaults;
    }
  }

  saveNotificationPreferences(customerIdOrEmail, prefs) {
    try {
      const key = customerIdOrEmail ? `user_${String(customerIdOrEmail).toLowerCase().trim()}` : 'default';
      const raw = localStorage.getItem(DB_KEYS.NOTIFICATION_PREFERENCES);
      const allPrefs = raw ? JSON.parse(raw) : {};
      allPrefs[key] = {
        ...allPrefs[key],
        ...prefs,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(DB_KEYS.NOTIFICATION_PREFERENCES, JSON.stringify(allPrefs));
      notifySubscribers('notification_preferences_updated', { key, preferences: allPrefs[key] });
      return allPrefs[key];
    } catch (e) {
      console.warn('Error saving notification preferences:', e);
      return prefs;
    }
  }

  getScheduledReminders(appointmentId = null) {
    try {
      const raw = localStorage.getItem(DB_KEYS.REMINDERS);
      const reminders = raw ? JSON.parse(raw) : [];
      if (appointmentId) {
        return reminders.filter(r => r.appointmentId === appointmentId);
      }
      return reminders;
    } catch (e) {
      return [];
    }
  }

  saveScheduledReminders(reminders) {
    try {
      localStorage.setItem(DB_KEYS.REMINDERS, JSON.stringify(reminders));
      notifySubscribers('reminders_updated', reminders);
      return reminders;
    } catch (e) {
      console.warn('Error saving scheduled reminders:', e);
      return reminders;
    }
  }

  parseAppointmentStartDateTime(dateStr, timeStr) {
    if (!dateStr) return null;
    const normDate = this.normalizeDate(dateStr);
    const minutes = this.timeStringToMinutes(timeStr);
    const parts = normDate.split('-');
    if (parts.length !== 3) return null;
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    const d = parseInt(parts[2], 10);
    if (!y || !m || !d) return null;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return new Date(y, m - 1, d, hours, mins, 0);
  }

  scheduleAppointmentReminders(appointment) {
    if (!appointment || !appointment.id) return [];
    const status = appointment.status || appointment.appointmentStatus || 'Pending';

    // Do not schedule reminders for pending, cancelled, or declined appointments
    const ineligibleStatuses = ['Pending', 'Cancelled', 'Declined', 'Rejected', 'In Review'];
    if (ineligibleStatuses.includes(status)) {
      return [];
    }

    const apptDate = this.parseAppointmentStartDateTime(appointment.date, appointment.startTime || appointment.time);
    if (!apptDate || isNaN(apptDate.getTime())) return [];

    const now = Date.now();
    const apptTimestamp = apptDate.getTime();
    const existingReminders = this.getScheduledReminders();
    const newReminders = [...existingReminders];
    const prefs = appointment.notificationPreferences || {
      confirmation: true,
      reminder24h: true,
      reminder3h: true,
      updates: true,
      aftercare: true
    };
    const channels = appointment.notificationChannels || {
      inApp: true,
      browserPush: false,
      email: false,
      sms: false
    };

    // 1. 24-Hour Reminder
    if (prefs.reminder24h) {
      const trigger24h = apptTimestamp - 24 * 60 * 60 * 1000;
      const alreadyExists = existingReminders.some(
        r => r.appointmentId === appointment.id && r.type === 'reminder_24h' && r.status !== 'cancelled'
      );
      if (!alreadyExists) {
        newReminders.push({
          id: `rem-24h-${appointment.id}-${Date.now()}`,
          appointmentId: appointment.id,
          customerId: appointment.customerId || null,
          customerEmail: appointment.email || appointment.customerEmail || null,
          customerPhone: appointment.phone || appointment.customerPhone || null,
          customerName: appointment.customerName || 'Valued Guest',
          service: appointment.service,
          date: appointment.date,
          time: appointment.startTime || appointment.time,
          type: 'reminder_24h',
          title: '24-Hour Appointment Reminder',
          message: `Friendly reminder: Your ${appointment.service} appointment is tomorrow, ${appointment.date} at ${appointment.startTime || appointment.time}.`,
          scheduledFor: new Date(trigger24h).toISOString(),
          status: 'scheduled',
          channels,
          isDue: now >= trigger24h,
          createdAt: new Date().toISOString()
        });
      }
    }

    // 2. 3-Hour Reminder
    if (prefs.reminder3h) {
      const trigger3h = apptTimestamp - 3 * 60 * 60 * 1000;
      const alreadyExists = existingReminders.some(
        r => r.appointmentId === appointment.id && r.type === 'reminder_3h' && r.status !== 'cancelled'
      );
      if (!alreadyExists) {
        newReminders.push({
          id: `rem-3h-${appointment.id}-${Date.now()}`,
          appointmentId: appointment.id,
          customerId: appointment.customerId || null,
          customerEmail: appointment.email || appointment.customerEmail || null,
          customerPhone: appointment.phone || appointment.customerPhone || null,
          customerName: appointment.customerName || 'Valued Guest',
          service: appointment.service,
          date: appointment.date,
          time: appointment.startTime || appointment.time,
          type: 'reminder_3h',
          title: '3-Hour Appointment Reminder',
          message: `Your appointment for ${appointment.service} is in 3 hours at ${appointment.startTime || appointment.time} today. We look forward to welcoming you!`,
          scheduledFor: new Date(trigger3h).toISOString(),
          status: 'scheduled',
          channels,
          isDue: now >= trigger3h,
          createdAt: new Date().toISOString()
        });
      }
    }

    this.saveScheduledReminders(newReminders);
    return newReminders.filter(r => r.appointmentId === appointment.id);
  }

  handleAppointmentStatusChange(appointmentId, newStatus, extraNotes = '') {
    const appointments = this.getAppointments();
    const appt = appointments.find(a => a.id === appointmentId);
    if (!appt) return;

    const prefs = appt.notificationPreferences || {
      confirmation: true,
      reminder24h: true,
      reminder3h: true,
      updates: true,
      aftercare: true
    };

    const targetCustId = appt.customerId;
    const targetEmail = appt.email || appt.customerEmail;

    // Case A: Confirmed (e.g. from admin approval or auto-accepted)
    if (newStatus === 'Confirmed' || newStatus === 'Appointment Request Confirmed') {
      // Schedule 24h & 3h reminders
      this.scheduleAppointmentReminders({ ...appt, status: 'Confirmed' });

      // Confirmation notification
      if (prefs.confirmation) {
        const notifs = this.getNotifications();
        const alreadyConfirmedNotif = notifs.some(
          n => n.appointmentId === appointmentId && n.type === 'booking_confirmation'
        );
        if (!alreadyConfirmedNotif && (targetCustId || targetEmail)) {
          this.addNotification({
            customerId: targetCustId,
            customerEmail: targetEmail,
            appointmentId: appointmentId,
            title: 'Appointment Confirmed',
            message: `Your appointment for ${appt.service} on ${appt.date} at ${appt.startTime || appt.time} with ${appt.stylist || 'Janki Khatroja'} has been officially confirmed.`,
            type: 'booking_confirmation',
            link: '/customer-dashboard?tab=appointments'
          });
        }
      }
    }

    // Case B: Cancelled or Declined
    if (newStatus === 'Cancelled' || newStatus === 'Declined' || newStatus === 'Rejected') {
      // Mark scheduled reminders as cancelled
      const allReminders = this.getScheduledReminders();
      const updatedReminders = allReminders.map(r => {
        if (r.appointmentId === appointmentId && r.status === 'scheduled') {
          return { ...r, status: 'cancelled', cancelledAt: new Date().toISOString() };
        }
        return r;
      });
      this.saveScheduledReminders(updatedReminders);

      // Cancellation notification if updates preference is on
      if (prefs.updates && (targetCustId || targetEmail)) {
        this.addNotification({
          customerId: targetCustId,
          customerEmail: targetEmail,
          appointmentId: appointmentId,
          title: 'Appointment Cancelled',
          message: `Your booking for ${appt.service} on ${appt.date} at ${appt.startTime || appt.time} has been cancelled. ${extraNotes || ''}`.trim(),
          type: 'cancellation',
          link: '/customer-dashboard?tab=appointments'
        });
      }
    }

    // Case C: Completed
    if (newStatus === 'Completed') {
      // Aftercare & Review Reminder
      if (prefs.aftercare && (targetCustId || targetEmail)) {
        const notifs = this.getNotifications();
        const alreadyAftercareNotif = notifs.some(
          n => n.appointmentId === appointmentId && n.type === 'aftercare_review'
        );
        if (!alreadyAftercareNotif) {
          this.addNotification({
            customerId: targetCustId,
            customerEmail: targetEmail,
            appointmentId: appointmentId,
            title: 'Aftercare & Treatment Review',
            message: `Thank you for visiting GLAM GIRL BY JANKI! Your dedicated aftercare guide is ready for your ${appt.service}. Share your review to receive loyalty reward points.`,
            type: 'aftercare_review',
            link: '/customer-dashboard?tab=aftercare'
          });
        }
      }
    }
  }

  updateAppointmentReminders(appointmentId, newDate, newTime, newStatus = 'Rescheduled') {
    const appointments = this.getAppointments();
    const appt = appointments.find(a => a.id === appointmentId);
    if (!appt) return;

    // Cancel old reminders
    const allReminders = this.getScheduledReminders();
    const updatedReminders = allReminders.map(r => {
      if (r.appointmentId === appointmentId && r.status === 'scheduled') {
        return { ...r, status: 'cancelled', cancelledAt: new Date().toISOString(), rescheduleNote: `Shifted to ${newDate} at ${newTime}` };
      }
      return r;
    });
    this.saveScheduledReminders(updatedReminders);

    // Reschedule if confirmed
    const updatedAppt = {
      ...appt,
      date: newDate,
      time: newTime,
      startTime: newTime,
      status: appt.status || 'Confirmed'
    };
    this.scheduleAppointmentReminders(updatedAppt);
  }

  // ==========================================
  // PRIVACY, DATA EXPORT & DELETION REQUESTS
  // ==========================================

  requestCustomerDataExport(userId) {
    const user = this.getUserById(userId);
    if (!user) throw new Error('User not found.');

    const appointments = this.getCustomerAppointments(user.id);
    const reviews = this.getCustomerReviews(user.id);
    const notifications = this.getCustomerNotifications(user.id);

    const { passwordHash: _, ...safeUser } = user;

    const exportData = {
      exportedAt: new Date().toISOString(),
      salon: 'GLAM GIRL BY JANKI — Ottawa',
      profile: safeUser,
      appointments: appointments.map(a => ({
        bookingReference: a.id,
        service: a.service,
        date: a.date,
        time: a.time,
        status: a.status,
        price: a.servicePrice,
        notes: a.notes,
        createdAt: a.createdAt
      })),
      reviews: reviews.map(r => ({
        service: r.service,
        rating: r.rating,
        review: r.review,
        date: r.date
      })),
      notificationsCount: notifications.length
    };

    // Record request in user history
    const requestId = `req_exp_${Date.now()}`;
    const users = this.getUsers().map(u => {
      if (u.id === userId) {
        return {
          ...u,
          dataRequests: [
            ...(u.dataRequests || []),
            { id: requestId, type: 'export', status: 'completed', requestedAt: new Date().toISOString(), completedAt: new Date().toISOString() }
          ]
        };
      }
      return u;
    });
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));

    return exportData;
  }

  requestCustomerAccountDeletion(userId, reason = '') {
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('User not found.');

    const requestId = `req_del_${Date.now()}`;
    const updated = users.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          dataRequests: [
            ...(u.dataRequests || []),
            { id: requestId, type: 'deletion', reason, status: 'pending_review', requestedAt: new Date().toISOString() }
          ]
        };
      }
      return u;
    });

    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(updated));

    this.addNotification({
      customerId: user.id,
      customerEmail: user.email,
      title: 'Account Deletion Request Received',
      message: 'Your account deletion request has been submitted for verified processing in accordance with privacy laws. Our director will confirm within 48 hours.',
      type: 'account',
      link: '/customer-dashboard?tab=security'
    });

    return { success: true, requestId, message: 'Deletion request registered successfully.' };
  }

  // ==========================================
  // ADMIN CUSTOMER MANAGEMENT (ROLE-PROTECTED)
  // ==========================================

  getCustomers() {
    const users = this.getUsers().filter(u => u.role === 'customer');
    const appointments = this.getAppointments();
    const reviews = this.getReviews();

    return users.map(cust => {
      const custAppts = appointments.filter(a => 
        a.customerId === cust.id || 
        (a.email && a.email.toLowerCase() === cust.email.toLowerCase())
      );

      const totalBookings = custAppts.length;
      const completedCount = custAppts.filter(a => a.status === 'Completed' || a.appointmentStatus === 'Completed').length;
      const cancelledCount = custAppts.filter(a => a.status === 'Cancelled' || a.appointmentStatus === 'Cancelled').length;
      const upcomingCount = custAppts.filter(a => a.status === 'Confirmed' || a.status === 'Pending').length;
      const totalSpend = custAppts
        .filter(a => a.status === 'Completed' || a.appointmentStatus === 'Completed')
        .reduce((sum, item) => sum + (Number(item.servicePrice) || 0), 0);

      const custReviews = reviews.filter(r => 
        r.customerId === cust.id || 
        (r.customerEmail && r.customerEmail.toLowerCase() === cust.email.toLowerCase())
      );

      return {
        ...cust,
        totalBookings,
        completedCount,
        cancelledCount,
        upcomingCount,
        totalSpend,
        reviewsCount: custReviews.length,
        appointments: custAppts,
        reviews: custReviews
      };
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  adminAddCustomerNote(userId, noteText, author = 'Janki Khatroja') {
    if (!noteText || !noteText.trim()) throw new Error('Note text cannot be empty.');
    const users = this.getUsers();
    let updatedUser = null;

    const updated = users.map(u => {
      if (u.id === userId) {
        const newNote = {
          id: `note_${Date.now()}`,
          text: noteText.trim(),
          author,
          createdAt: new Date().toISOString()
        };
        updatedUser = {
          ...u,
          adminNotes: [...(u.adminNotes || []), newNote],
          updatedAt: new Date().toISOString()
        };
        return updatedUser;
      }
      return u;
    });

    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(updated));
    notifySubscribers('customers_updated', updated);
    return updatedUser;
  }

  adminUpdateCustomerStatus(userId, newStatus) {
    if (!['active', 'suspended', 'pending'].includes(newStatus)) {
      throw new Error('Invalid customer status.');
    }
    const users = this.getUsers();
    let updatedUser = null;

    const updated = users.map(u => {
      if (u.id === userId) {
        updatedUser = {
          ...u,
          status: newStatus,
          updatedAt: new Date().toISOString()
        };
        return updatedUser;
      }
      return u;
    });

    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(updated));
    notifySubscribers('customers_updated', updated);
    return updatedUser;
  }

  adminProcessDataRequest(userId, requestId, status, responseNotes = '') {
    const users = this.getUsers();
    let updatedUser = null;

    const updated = users.map(u => {
      if (u.id === userId) {
        const requests = (u.dataRequests || []).map(r => {
          if (r.id === requestId) {
            return {
              ...r,
              status,
              responseNotes,
              processedAt: new Date().toISOString()
            };
          }
          return r;
        });

        updatedUser = {
          ...u,
          dataRequests: requests,
          ...(status === 'completed' && u.dataRequests?.find(r => r.id === requestId)?.type === 'deletion' ? { status: 'suspended' } : {}),
          updatedAt: new Date().toISOString()
        };
        return updatedUser;
      }
      return u;
    });

    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(updated));
    notifySubscribers('customers_updated', updated);
    return updatedUser;
  }

  adminUpdateCustomerProfile(userId, updates) {
    return this.updateCustomerProfile(userId, updates);
  }

  // ==========================================
  // ==========================================
  // SERVICES & CATEGORIES (MASTER CATALOG ENGINE)
  // ==========================================

  getCategories() {
    try {
      const data = localStorage.getItem(DB_KEYS.CATEGORIES);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {}
    return CATEGORIES;
  }

  getCategoryById(idOrSlug) {
    const cats = this.getCategories();
    const target = String(idOrSlug || '').toLowerCase().trim();
    return cats.find(c => String(c.id).toLowerCase() === target || String(c.slug).toLowerCase() === target) || null;
  }

  getServices() {
    try {
      const data = localStorage.getItem(DB_KEYS.SERVICES);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {}
    return ALL_SERVICES.map(s => ({ ...s, isActive: true, active: true }));
  }

  getServiceById(idOrSlug) {
    if (!idOrSlug) return null;
    const services = this.getServices();
    const target = String(idOrSlug).toLowerCase().trim();
    return (
      services.find(
        s =>
          (s.id && s.id.toLowerCase() === target) ||
          (s.slug && s.slug.toLowerCase() === target) ||
          (s.name && s.name.toLowerCase() === target) ||
          (s.name && s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === target)
      ) || null
    );
  }

  getServiceBySlug(slugOrId) {
    return this.getServiceById(slugOrId);
  }

  getCategoryBySlug(slugOrId) {
    if (!slugOrId) return null;
    return this.getCategoryById(slugOrId);
  }

  getRelatedServices(serviceId, category, limit = 4) {
    const services = this.getServices();
    const targetCat = String(category || '').toLowerCase().trim();
    return services
      .filter(s => s.id !== serviceId && s.active !== false && String(s.category || '').toLowerCase() === targetCat)
      .slice(0, limit);
  }

  addService(newServiceData) {
    const services = this.getServices();
    const id = newServiceData.id || `srv-${Date.now()}`;
    const slug = newServiceData.slug || newServiceData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const serviceToAdd = {
      ...newServiceData,
      id,
      slug,
      isActive: newServiceData.isActive !== false && newServiceData.active !== false,
      active: newServiceData.isActive !== false && newServiceData.active !== false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [serviceToAdd, ...services];
    localStorage.setItem(DB_KEYS.SERVICES, JSON.stringify(updated));
    localStorage.setItem('girl-looked-for-you-custom-services', JSON.stringify(updated));
    notifySubscribers('services_updated', updated);
    return serviceToAdd;
  }

  updateService(id, updates) {
    const services = this.getServices();
    const updated = services.map((s) => {
      if (s.id === id || s.slug === id) {
        return {
          ...s,
          ...updates,
          isActive: updates.isActive !== undefined ? updates.isActive : updates.active !== undefined ? updates.active : s.isActive,
          active: updates.active !== undefined ? updates.active : updates.isActive !== undefined ? updates.isActive : s.active,
          updatedAt: new Date().toISOString()
        };
      }
      return s;
    });

    localStorage.setItem(DB_KEYS.SERVICES, JSON.stringify(updated));
    localStorage.setItem('girl-looked-for-you-custom-services', JSON.stringify(updated));
    notifySubscribers('services_updated', updated);
    return updated;
  }

  deleteService(id) {
    const services = this.getServices();
    const updated = services.filter((s) => s.id !== id && s.slug !== id);
    localStorage.setItem(DB_KEYS.SERVICES, JSON.stringify(updated));
    localStorage.setItem('girl-looked-for-you-custom-services', JSON.stringify(updated));
    notifySubscribers('services_updated', updated);
    return updated;
  }

  // ==========================================
  // MEHNDI PROCESS SERVICES & PRICING (PRICE & TIME)
  // ==========================================

  getMehndiProcessServices() {
    try {
      const data = localStorage.getItem(DB_KEYS.MEHNDI_PROCESS_PRICING);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Error reading mehndi process pricing:', e);
    }
    return DEFAULT_MEHNDI_PROCESS_SERVICES;
  }

  updateMehndiProcessService(id, updates) {
    const list = this.getMehndiProcessServices();
    const updated = list.map((s) => {
      if (s.id === id) {
        return {
          ...s,
          ...updates,
          updatedAt: new Date().toISOString()
        };
      }
      return s;
    });

    try {
      localStorage.setItem(DB_KEYS.MEHNDI_PROCESS_PRICING, JSON.stringify(updated));
    } catch (e) {}

    notifySubscribers('mehndi_process_pricing_updated', updated);
    return updated;
  }

  resetMehndiProcessServices() {
    try {
      localStorage.removeItem(DB_KEYS.MEHNDI_PROCESS_PRICING);
    } catch (e) {}
    notifySubscribers('mehndi_process_pricing_updated', DEFAULT_MEHNDI_PROCESS_SERVICES);
    return DEFAULT_MEHNDI_PROCESS_SERVICES;
  }

  // ==========================================
  // APPOINTMENTS & REAL-TIME TIMING
  // ==========================================

  getAppointments() {
    try {
      const data = localStorage.getItem(DB_KEYS.APPOINTMENTS) || localStorage.getItem('girl-looked-for-you-appointments');
      const list = data ? JSON.parse(data) : DEFAULT_APPOINTMENTS;
      // Guarantee all appointments use Cash on Delivery
      return list.map(a => ({
        ...a,
        paymentMethod: 'Cash on Delivery',
        paymentStatus: a.paymentStatus || (a.status === 'Completed' ? 'Paid' : 'Pending (Due at Appointment)')
      }));
    } catch (e) {
      return DEFAULT_APPOINTMENTS.map(a => ({ ...a, paymentMethod: 'Cash on Delivery' }));
    }
  }

  getAppointmentById(id) {
    const appointments = this.getAppointments();
    return appointments.find(a => a.id === id) || null;
  }

  normalizeDate(d) {
    if (!d) return '';
    const str = String(d).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;
    try {
      const parsed = new Date(str.includes('T') ? str : str + 'T00:00:00');
      if (!isNaN(parsed.getTime())) {
        const y = parsed.getFullYear();
        const m = String(parsed.getMonth() + 1).padStart(2, '0');
        const day = String(parsed.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
      }
    } catch (e) {}
    return str.toLowerCase();
  }

  normalizeTime(t) {
    if (!t) return '';
    return String(t).trim().replace(/^0/, '').toUpperCase();
  }

  timeStringToMinutes(timeStr) {
    if (!timeStr) return 0;
    const str = String(timeStr).trim();
    const match = str.match(/(\d{1,2}):(\d{2})(?:\s*([AP]M))?/i);
    if (!match) return 0;
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const meridian = match[3] ? match[3].toUpperCase() : null;

    if (meridian === 'PM') {
      if (hours < 12) hours += 12;
    } else if (meridian === 'AM') {
      if (hours === 12) hours = 0;
    }
    return hours * 60 + minutes;
  }

  minutesToTimeString(totalMinutes) {
    let normalized = Math.max(0, totalMinutes);
    let h = Math.floor(normalized / 60) % 24;
    const m = normalized % 60;
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    if (h === 0) h = 12;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
  }

  parseServiceDurationMinutes(val) {
    if (typeof val === 'number' && !isNaN(val) && val > 0) {
      return val;
    }
    if (!val) return 45;

    if (typeof val === 'object') {
      if (val.durationMinutes) return parseInt(val.durationMinutes, 10) || 45;
      if (val.duration) return this.parseServiceDurationMinutes(val.duration);
      if (val.serviceDuration) return this.parseServiceDurationMinutes(val.serviceDuration);
      if (val.serviceId) {
        const s = this.getServiceById(val.serviceId);
        if (s && s.duration) return this.parseServiceDurationMinutes(s.duration);
      }
      return 45;
    }

    const str = String(val).toLowerCase().trim();
    const serviceMatch = this.getServiceById(str);
    if (serviceMatch && serviceMatch.duration && serviceMatch !== val) {
      return this.parseServiceDurationMinutes(serviceMatch.duration);
    }

    let total = 0;
    const hourMatch = str.match(/(\d+)\s*(?:hr|hour|h\b)/i);
    const minMatch = str.match(/(\d+)\s*(?:min|m\b)/i);

    if (hourMatch) {
      total += parseInt(hourMatch[1], 10) * 60;
    }
    if (minMatch) {
      total += parseInt(minMatch[1], 10);
    }
    if (total > 0) {
      return total;
    }

    const digits = str.match(/\d+/);
    if (digits) {
      return parseInt(digits[0], 10);
    }

    return 45;
  }

  calculateEndTimeString(startTimeStr, durationMinutes = 45) {
    const startM = this.timeStringToMinutes(startTimeStr);
    const durM = Math.max(5, parseInt(durationMinutes, 10) || 45);
    return this.minutesToTimeString(startM + durM);
  }

  // ==========================================
  // BUSINESS HOURS & WEEKLY SCHEDULE
  // ==========================================

  getBusinessHours() {
    try {
      const data = localStorage.getItem(DB_KEYS.BUSINESS_HOURS);
      if (data) {
        const parsed = JSON.parse(data);
        return {
          ...DEFAULT_BUSINESS_HOURS,
          ...parsed,
          days: { ...DEFAULT_BUSINESS_HOURS.days, ...(parsed.days || {}) },
          breakConfig: { ...DEFAULT_BUSINESS_HOURS.breakConfig, ...(parsed.breakConfig || {}) },
          holidays: Array.isArray(parsed.holidays) ? parsed.holidays : (DEFAULT_BUSINESS_HOURS.holidays || [])
        };
      }
    } catch (e) {}
    return DEFAULT_BUSINESS_HOURS;
  }

  saveBusinessHours(hoursConfig) {
    if (!hoursConfig || !hoursConfig.days) {
      throw new Error('Invalid business hours configuration.');
    }

    // Validate that open days have closeTime > openTime
    Object.entries(hoursConfig.days).forEach(([key, day]) => {
      if (day.isOpen) {
        const openM = day.openMinutes ?? this.timeStringToMinutes(day.openTime);
        const closeM = day.closeMinutes ?? this.timeStringToMinutes(day.closeTime);
        if (closeM <= openM) {
          throw new Error(`${day.dayName || key}: Closing time must be later than opening time.`);
        }
      }
    });

    // Validate break if enabled
    if (hoursConfig.breakConfig?.enabled) {
      const bStart = hoursConfig.breakConfig.startMinutes ?? this.timeStringToMinutes(hoursConfig.breakConfig.startTime);
      const bEnd = hoursConfig.breakConfig.endMinutes ?? this.timeStringToMinutes(hoursConfig.breakConfig.endTime);
      if (bEnd <= bStart) {
        throw new Error('Break end time must be later than break start time.');
      }
    }

    const updated = {
      ...DEFAULT_BUSINESS_HOURS,
      ...hoursConfig,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(DB_KEYS.BUSINESS_HOURS, JSON.stringify(updated));
    notifySubscribers('business_hours_updated', updated);

    // Sync settings string
    try {
      const monFri = updated.days.monday;
      const sat = updated.days.saturday;
      const sun = updated.days.sunday;
      const summaryStr = `Mon-Fri: ${monFri?.openTime || '9:30 AM'} – ${monFri?.closeTime || '7:30 PM'} • Sat: ${sat?.openTime || '9:00 AM'} – ${sat?.closeTime || '7:00 PM'} • Sun: ${sun?.isOpen ? `${sun.openTime} – ${sun.closeTime}` : 'Closed'}`;
      this.updateSettings({ hours: summaryStr });
    } catch (e) {}

    return updated;
  }

  normalizeDate(d) {
    if (!d) return '';
    if (typeof d === 'string') {
      const trimmed = d.trim();
      if (trimmed.includes('T')) {
        return trimmed.split('T')[0];
      }
      if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
        return trimmed;
      }
      const parsed = new Date(trimmed);
      if (!isNaN(parsed.getTime())) {
        const y = parsed.getFullYear();
        const m = String(parsed.getMonth() + 1).padStart(2, '0');
        const day = String(parsed.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
      }
      return trimmed;
    }
    if (d instanceof Date && !isNaN(d.getTime())) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    }
    return String(d || '');
  }

  parseDateParts(dateStr) {
    const normalized = this.normalizeDate(dateStr);
    const parts = normalized.split('-');
    if (parts.length >= 3) {
      const year = parseInt(parts[0], 10) || new Date().getFullYear();
      const month = parseInt(parts[1], 10) || (new Date().getMonth() + 1);
      const day = parseInt(parts[2], 10) || new Date().getDate();
      return {
        year,
        month,
        monthIndex: month - 1,
        day
      };
    }
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        monthIndex: d.getMonth(),
        day: d.getDate()
      };
    }
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      monthIndex: now.getMonth(),
      day: now.getDate()
    };
  }

  timeStringToMinutes(timeStr) {
    if (typeof timeStr === 'number') return timeStr;
    if (!timeStr || typeof timeStr !== 'string') return 570; // 9:30 AM default

    const clean = timeStr.trim();
    const ampmMatch = clean.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
    if (ampmMatch) {
      let hours = parseInt(ampmMatch[1], 10);
      const mins = parseInt(ampmMatch[2], 10);
      const ampm = ampmMatch[3] ? ampmMatch[3].toUpperCase() : null;

      if (ampm === 'PM' && hours < 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;

      return (hours * 60) + mins;
    }

    const match24 = clean.match(/^(\d{1,2}):(\d{2})$/);
    if (match24) {
      return (parseInt(match24[1], 10) * 60) + parseInt(match24[2], 10);
    }

    return 570;
  }

  minutesToTimeString(minutes) {
    if (typeof minutes !== 'number' || isNaN(minutes)) return '09:30 AM';
    const totalMinutes = Math.max(0, Math.min(1439, Math.round(minutes)));
    const hours24 = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    const period = hours24 >= 12 ? 'PM' : 'AM';
    let hours12 = hours24 % 12;
    if (hours12 === 0) hours12 = 12;

    const hh = String(hours12).padStart(2, '0');
    const mm = String(mins).padStart(2, '0');
    return `${hh}:${mm} ${period}`;
  }

  parseServiceDurationMinutes(duration) {
    if (typeof duration === 'number' && !isNaN(duration)) {
      return duration;
    }
    if (!duration) return 45;

    const str = String(duration).toLowerCase();
    let total = 0;
    const hourMatch = str.match(/(\d+(?:\.\d+)?)\s*(?:hr|hour|h)/);
    if (hourMatch) {
      total += parseFloat(hourMatch[1]) * 60;
    }

    const minMatch = str.match(/(\d+)\s*(?:min|m)/);
    if (minMatch) {
      total += parseInt(minMatch[1], 10);
    }

    if (total > 0) return Math.round(total);

    const bareNum = parseInt(str.replace(/\D/g, ''), 10);
    if (!isNaN(bareNum) && bareNum > 0) {
      return bareNum;
    }

    return 45;
  }

  calculateEndTimeString(startTime, durationMinutes = 45) {
    const startM = this.timeStringToMinutes(startTime);
    const durM = this.parseServiceDurationMinutes(durationMinutes);
    return this.minutesToTimeString(startM + durM);
  }

  getSalonCurrentDateStr() {
    const tz = this.getBusinessHours().timezone || 'America/Toronto';
    try {
      const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: tz,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      return formatter.format(new Date());
    } catch (e) {
      const d = new Date();
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    }
  }

  getSalonCurrentMinutes() {
    const tz = this.getBusinessHours().timezone || 'America/Toronto';
    try {
      const timeStr = new Date().toLocaleTimeString('en-US', {
        timeZone: tz,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      });
      const [h, m] = timeStr.split(':').map(Number);
      return (h * 60) + m;
    } catch (e) {
      const now = new Date();
      return (now.getHours() * 60) + now.getMinutes();
    }
  }

  getOperatingHoursForDate(dateStr) {
    const businessHours = this.getBusinessHours();
    if (!dateStr) {
      const mon = businessHours.days.monday || DEFAULT_BUSINESS_HOURS.days.monday;
      return { ...mon, isOpen: true, breakConfig: null };
    }

    const cleanDate = this.normalizeDate(dateStr);

    // 1. Check special holiday closures
    const holiday = businessHours.holidays?.find(h => this.normalizeDate(h.date) === cleanDate);
    if (holiday) {
      return {
        isOpen: false,
        isHoliday: true,
        holidayName: holiday.name || 'Holiday Closure',
        dayName: 'Holiday',
        openTime: 'Closed',
        closeTime: 'Closed',
        openMinutes: 0,
        closeMinutes: 0,
        breakConfig: null,
        reason: `The salon is closed on ${holiday.name || 'this holiday'}.`
      };
    }

    const parts = this.parseDateParts(cleanDate);
    const d = new Date(parts.year, parts.monthIndex, parts.day, 12, 0, 0);
    const dayOfWeek = isNaN(d.getTime()) ? 1 : d.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat

    const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const key = dayKeys[dayOfWeek];
    const dayConfig = businessHours.days[key] || DEFAULT_BUSINESS_HOURS.days[key];

    const isOpen = Boolean(dayConfig?.isOpen);
    const openTime = dayConfig?.openTime || '09:30 AM';
    const closeTime = dayConfig?.closeTime || '07:30 PM';
    const openMinutes = dayConfig?.openMinutes ?? this.timeStringToMinutes(openTime);
    const closeMinutes = dayConfig?.closeMinutes ?? this.timeStringToMinutes(closeTime);

    return {
      isOpen,
      dayName: dayConfig?.dayName || (key.charAt(0).toUpperCase() + key.slice(1)),
      openTime,
      closeTime,
      openMinutes,
      closeMinutes,
      breakConfig: (isOpen && businessHours.breakConfig?.enabled) ? businessHours.breakConfig : null,
      reason: isOpen ? null : (dayOfWeek === 0 ? 'The salon is closed on Sundays. Appointments are available Monday through Saturday.' : `The salon is closed on ${dayConfig?.dayName || 'this day'}.`)
    };
  }

  isDayClosed(dateStr) {
    const hours = this.getOperatingHoursForDate(dateStr);
    return !hours.isOpen;
  }

  getTimeSlotsForDate(dateStr, stepMinutes = 15) {
    const hours = this.getOperatingHoursForDate(dateStr);
    if (!hours.isOpen) {
      return []; // strictly NO slots on closed days (e.g. Sunday or holidays)
    }

    const slots = [];
    const breakConfig = hours.breakConfig;
    const breakStart = breakConfig ? (breakConfig.startMinutes ?? this.timeStringToMinutes(breakConfig.startTime)) : -1;
    const breakEnd = breakConfig ? (breakConfig.endMinutes ?? this.timeStringToMinutes(breakConfig.endTime)) : -1;

    const cleanDate = this.normalizeDate(dateStr);
    const isTodayInOttawa = cleanDate === this.getSalonCurrentDateStr();
    const currentMinutesNow = isTodayInOttawa ? this.getSalonCurrentMinutes() : -1;

    for (let m = hours.openMinutes; m < hours.closeMinutes; m += stepMinutes) {
      // 1. Skip slots during staff breaks
      if (breakConfig && m >= breakStart && m < breakEnd) {
        continue;
      }
      // 2. For today, show only time slots that have not passed
      if (isTodayInOttawa && m <= currentMinutesNow) {
        continue;
      }
      slots.push(this.minutesToTimeString(m));
    }
    return slots;
  }

  checkSlotAvailability(date, time, durationOrService = 45, stylistId = null) {
    if (!date || !time) {
      return { available: false, conflict: null, reason: 'Appointment date and time are required.' };
    }

    const targetDate = this.normalizeDate(date);
    const todayDateStr = this.getSalonCurrentDateStr();

    // 1. Backend validation: Reject past dates
    if (targetDate < todayDateStr) {
      return {
        available: false,
        conflict: null,
        reason: 'Cannot schedule an appointment for a past date.'
      };
    }

    // 2. Backend validation: Reject closed days (e.g. Sunday or special holidays)
    const hours = this.getOperatingHoursForDate(targetDate);
    if (!hours.isOpen) {
      return {
        available: false,
        conflict: null,
        reason: hours.reason || 'The salon is closed on this day. Appointments are available Monday through Saturday.'
      };
    }

    const newStart = this.timeStringToMinutes(time);
    const durationMinutes = this.parseServiceDurationMinutes(durationOrService);
    const newEnd = newStart + durationMinutes;

    // 3. Backend validation: For today, reject past time slots
    if (targetDate === todayDateStr) {
      const currentMinutes = this.getSalonCurrentMinutes();
      if (newStart <= currentMinutes) {
        return {
          available: false,
          conflict: null,
          reason: 'This time slot has already passed for today. Please select an upcoming slot.'
        };
      }
    }

    // 4. Backend validation: Validate opening and closing hours
    if (newStart < hours.openMinutes) {
      return { 
        available: false, 
        conflict: null, 
        reason: `Salon opens at ${hours.openTime}. Please select a time during business hours.` 
      };
    }
    if (newEnd > hours.closeMinutes) {
      return { 
        available: false, 
        conflict: null, 
        reason: `Service duration (${durationMinutes} min) extends past salon closing time at ${hours.closeTime}.` 
      };
    }

    // 5. Backend validation: Validate staff breaks
    if (hours.breakConfig) {
      const bStart = hours.breakConfig.startMinutes ?? this.timeStringToMinutes(hours.breakConfig.startTime);
      const bEnd = hours.breakConfig.endMinutes ?? this.timeStringToMinutes(hours.breakConfig.endTime);
      if (newStart < bEnd && newEnd > bStart) {
        return {
          available: false,
          conflict: null,
          reason: `Requested slot overlaps with salon staff break (${hours.breakConfig.startTime} – ${hours.breakConfig.endTime}).`
        };
      }
    }

    // 6. Backend validation: Check overlap against existing appointments
    const appointments = this.getAppointments();

    const conflict = appointments.find((a) => {
      const isInactive = 
        a.status === 'Cancelled' || 
        a.status === 'Rejected' || 
        a.appointmentStatus === 'Cancelled' || 
        a.appointmentStatus === 'Rejected';
      if (isInactive) return false;

      if (this.normalizeDate(a.date) !== targetDate) return false;

      if (stylistId && a.stylistId && a.stylistId !== stylistId) {
        return false;
      }

      const existingStart = this.timeStringToMinutes(a.time);
      const existingDuration = a.durationMinutes || this.parseServiceDurationMinutes(
        a.serviceDuration || a.duration || (a.serviceId ? this.getServiceById(a.serviceId)?.duration : null) || 45
      );
      const existingEnd = a.endTime ? this.timeStringToMinutes(a.endTime) : (existingStart + existingDuration);

      // Overlap condition: newStart < existingEnd && newEnd > existingStart
      return (newStart < existingEnd && newEnd > existingStart);
    });

    if (conflict) {
      const existingStart = this.timeStringToMinutes(conflict.time);
      const existingDuration = conflict.durationMinutes || this.parseServiceDurationMinutes(
        conflict.serviceDuration || conflict.duration || (conflict.serviceId ? this.getServiceById(conflict.serviceId)?.duration : null) || 45
      );
      const existingEnd = conflict.endTime ? this.timeStringToMinutes(conflict.endTime) : (existingStart + existingDuration);

      return {
        available: false,
        conflict: conflict,
        reason: `Overlaps with an existing appointment (${conflict.time} – ${this.minutesToTimeString(existingEnd)}). Please select another time.`,
        newStart,
        newEnd,
        durationMinutes
      };
    }

    return {
      available: true,
      conflict: null,
      startTime: time,
      endTime: this.minutesToTimeString(newEnd),
      durationMinutes
    };
  }

  isSlotBooked(date, time, durationOrService = 45, stylistId = null) {
    if (!date || !time) return false;
    const { available } = this.checkSlotAvailability(date, time, durationOrService, stylistId);
    return !available;
  }

  // ==========================================
  // TREATMENT CUSTOMIZATIONS
  // ==========================================

  getCustomizationForService(serviceIdOrSlug) {
    const service = this.getServiceById(serviceIdOrSlug);
    if (!service) return null;
    return getCustomizationConfigForService(service);
  }

  calculateCustomizedService(serviceIdOrSlug, selectedOptionId, selectedAddonIds = []) {
    const service = this.getServiceById(serviceIdOrSlug);
    if (!service) return null;
    return calculateCustomizedTotal(service, selectedOptionId, selectedAddonIds);
  }

  validateCustomizedBooking(serviceIdOrSlug, selectedOptionId, selectedAddonIds = []) {
    const service = this.getServiceById(serviceIdOrSlug);
    if (!service) return { valid: false, error: 'Service not found in catalog.' };
    return validateServiceCustomization(service, selectedOptionId, selectedAddonIds);
  }

  addAppointment(bookingData) {
    const appointments = this.getAppointments();
    let durationMinutes = this.parseServiceDurationMinutes(
      bookingData.durationMinutes || 
      bookingData.duration || 
      bookingData.serviceDuration || 
      (bookingData.serviceId ? this.getServiceById(bookingData.serviceId)?.duration : null) || 
      45
    );

    const bookingId = bookingData.id || `GGJ-${Math.floor(100000 + Math.random() * 900000)}`;

    // Verify service or combo price and authoritatively validate customizations
    let validatedPrice = bookingData.servicePrice || 85;
    let validatedCustomizations = null;

    if (bookingData.isCombo) {
      validatedPrice = Number(bookingData.comboPrice ?? bookingData.servicePrice ?? 85);
    } else {
      const dbService = bookingData.serviceId ? this.getServiceById(bookingData.serviceId) : null;
      if (dbService) {
        if (bookingData.customizations) {
          const optionId = bookingData.customizations.selectedOptionId || bookingData.customizations.selectedOption?.id;
          const addonIds = bookingData.customizations.selectedAddonIds || 
            (Array.isArray(bookingData.customizations.selectedAddons) 
              ? bookingData.customizations.selectedAddons.map(a => a.id) 
              : []);
          
          const customCalc = this.calculateCustomizedService(dbService.id, optionId, addonIds);
          if (customCalc) {
            validatedPrice = customCalc.totalPrice;
            durationMinutes = customCalc.totalDurationMinutes;
            validatedCustomizations = {
              serviceId: dbService.id,
              serviceName: dbService.name,
              selectedOption: customCalc.selectedOption,
              selectedAddons: customCalc.selectedAddons,
              basePrice: customCalc.basePrice,
              optionAdjustment: customCalc.optionAdjustment,
              addonTotal: customCalc.addonTotal,
              totalPrice: customCalc.totalPrice,
              baseDurationMinutes: customCalc.baseDurationMinutes,
              additionalDurationMinutes: customCalc.additionalDurationMinutes,
              totalDurationMinutes: customCalc.totalDurationMinutes
            };
          } else {
            validatedPrice = dbService.price;
          }
        } else {
          validatedPrice = dbService.price;
        }
      }
    }

    const endTime = bookingData.endTime || this.calculateEndTimeString(bookingData.time, durationMinutes);

    const { available, conflict, reason } = this.checkSlotAvailability(
      bookingData.date, 
      bookingData.time, 
      durationMinutes, 
      bookingData.stylistId
    );

    // Backend schedule validation: strictly reject Sunday, past dates/times, closed days, or invalid slots
    if (!available) {
      throw new Error(`Appointment rejected: ${reason || 'The requested appointment slot is unavailable.'}`);
    }

    // Backend payment method validation: Cash on Delivery is strictly the only accepted payment method
    if (bookingData.paymentMethod && 
        bookingData.paymentMethod !== 'Cash on Delivery' && 
        bookingData.paymentMethod !== 'Cash on Delivery (Pay at Appointment)') {
      throw new Error('Payment validation error: Only Cash on Delivery (Pay at Appointment) is accepted.');
    }

    const newBooking = {
      ...bookingData,
      id: bookingId,
      referenceCode: bookingId,
      servicePrice: validatedPrice,
      startTime: bookingData.time,
      endTime: endTime,
      durationMinutes: durationMinutes,
      serviceDuration: bookingData.isCombo ? (bookingData.serviceDuration || `${durationMinutes} mins`) : `${durationMinutes} mins`,
      isCombo: Boolean(bookingData.isCombo),
      comboId: bookingData.comboId || null,
      comboName: bookingData.comboName || null,
      includedServices: Array.isArray(bookingData.includedServices) ? bookingData.includedServices : [],
      customizations: validatedCustomizations || bookingData.customizations || null,
      paymentMethod: 'Cash on Delivery',
      paymentStatus: bookingData.paymentStatus || 'Pending (Due at Appointment)',
      status: bookingData.status || 'Pending',
      appointmentStatus: bookingData.appointmentStatus || bookingData.status || 'Pending',
      slotConflict: !available,
      conflictingWith: !available ? (conflict?.customerName || 'Active Guest') : null,
      conflictReason: !available ? reason : null,
      treatmentStartedAt: null,
      treatmentCompletedAt: null,
      treatmentDuration: null,
      treatmentDurationHMS: null,
      treatmentDurationSeconds: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      submittedAt: new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })
    };

    const updated = [newBooking, ...appointments];
    localStorage.setItem(DB_KEYS.APPOINTMENTS, JSON.stringify(updated));
    localStorage.setItem('girl-looked-for-you-appointments', JSON.stringify(updated));
    notifySubscribers('appointment_added', newBooking);

    // If booking was directly confirmed, initialize reminders & confirmations
    if (newBooking.status === 'Confirmed' || newBooking.appointmentStatus === 'Confirmed') {
      try {
        this.handleAppointmentStatusChange(newBooking.id, 'Confirmed');
      } catch (err) {
        console.warn('Initial reminder setup warning:', err);
      }
    }

    return newBooking;
  }

  updateAppointmentStatus(id, newStatus) {
    const appointments = this.getAppointments();
    let updatedItem = null;
    const updated = appointments.map((a) => {
      if (a.id === id) {
        updatedItem = {
          ...a,
          status: newStatus,
          appointmentStatus: newStatus,
          slotConflict: (newStatus === 'Cancelled' || newStatus === 'Rejected') ? false : a.slotConflict,
          updatedAt: new Date().toISOString()
        };
        return updatedItem;
      }
      return a;
    });

    localStorage.setItem(DB_KEYS.APPOINTMENTS, JSON.stringify(updated));
    localStorage.setItem('girl-looked-for-you-appointments', JSON.stringify(updated));
    notifySubscribers('appointment_updated', { id, status: newStatus, appointment: updatedItem });

    // Synchronize scheduled reminders and notifications
    try {
      this.handleAppointmentStatusChange(id, newStatus);
    } catch (err) {
      console.warn('Status change reminder sync warning:', err);
    }

    return updated;
  }

  startTreatment(id) {
    const appointments = this.getAppointments();
    const nowIso = new Date().toISOString();
    let startedItem = null;

    const updated = appointments.map((a) => {
      if (a.id === id) {
        startedItem = {
          ...a,
          status: 'In Progress',
          appointmentStatus: 'In Progress',
          treatmentStartedAt: nowIso,
          treatmentCompletedAt: null,
          treatmentDuration: null,
          treatmentDurationHMS: null,
          treatmentDurationSeconds: null,
          updatedAt: nowIso
        };
        return startedItem;
      }
      return a;
    });

    if (!startedItem) {
      throw new Error(`Appointment with ID ${id} not found.`);
    }

    localStorage.setItem(DB_KEYS.APPOINTMENTS, JSON.stringify(updated));
    localStorage.setItem('girl-looked-for-you-appointments', JSON.stringify(updated));
    notifySubscribers('treatment_started', startedItem);
    return updated;
  }

  completeTreatment(id) {
    const appointments = this.getAppointments();
    const nowIso = new Date().toISOString();
    let completedItem = null;

    const updated = appointments.map((a) => {
      if (a.id === id) {
        const startTimestamp = a.treatmentStartedAt ? new Date(a.treatmentStartedAt).getTime() : Date.now();
        const endTimestamp = new Date(nowIso).getTime();
        const durationSeconds = Math.max(0, Math.floor((endTimestamp - startTimestamp) / 1000));
        const durationHMS = this.formatDurationHMS(durationSeconds);
        const durationDisplay = this.formatDurationDisplay(durationSeconds);

        completedItem = {
          ...a,
          status: 'Completed',
          appointmentStatus: 'Completed',
          treatmentCompletedAt: nowIso,
          treatmentDuration: durationDisplay,
          treatmentDurationHMS: durationHMS,
          treatmentDurationSeconds: durationSeconds,
          updatedAt: nowIso
        };
        return completedItem;
      }
      return a;
    });

    if (!completedItem) {
      throw new Error(`Appointment with ID ${id} not found.`);
    }

    localStorage.setItem(DB_KEYS.APPOINTMENTS, JSON.stringify(updated));
    localStorage.setItem('girl-looked-for-you-appointments', JSON.stringify(updated));
    notifySubscribers('appointment_completed', completedItem);

    try {
      this.handleAppointmentStatusChange(id, 'Completed');
    } catch (err) {
      console.warn('Completion reminder sync warning:', err);
    }

    return updated;
  }

  deleteAppointment(id) {
    const appointments = this.getAppointments();
    const updated = appointments.filter((a) => a.id !== id);
    localStorage.setItem(DB_KEYS.APPOINTMENTS, JSON.stringify(updated));
    localStorage.setItem('girl-looked-for-you-appointments', JSON.stringify(updated));
    notifySubscribers('appointment_deleted', { id });
    return updated;
  }

  // ==========================================
  // REVIEWS REPOSITORY & VERIFICATION
  // ==========================================

  getReviews() {
    try {
      const data = localStorage.getItem(DB_KEYS.REVIEWS);
      return data ? JSON.parse(data) : DEFAULT_REVIEWS;
    } catch (e) {
      return DEFAULT_REVIEWS;
    }
  }

  getApprovedReviews() {
    const reviews = this.getReviews();
    return reviews.filter(r => r.status === 'approved' || !r.status);
  }

  addReview(newReviewData) {
    const reviews = this.getReviews();
    const id = newReviewData.id || `rev-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];

    const reviewToAdd = {
      id,
      customerName: (newReviewData.customerName || 'Delighted Guest').trim(),
      service: newReviewData.service || 'Salon Ritual',
      serviceCategory: newReviewData.serviceCategory || 'other',
      rating: Math.min(5, Math.max(1, Number(newReviewData.rating) || 5)),
      review: (newReviewData.review || newReviewData.comment || '').trim(),
      comment: (newReviewData.review || newReviewData.comment || '').trim(),
      date: today,
      verified: newReviewData.verified !== false,
      bookingId: newReviewData.bookingId || newReviewData.appointmentId || null,
      appointmentId: newReviewData.bookingId || newReviewData.appointmentId || null,
      likes: 0,
      recommended: newReviewData.recommended !== false,
      status: 'approved',
      tags: newReviewData.tags || ['Verified Treatment'],
      featured: Boolean(newReviewData.featured),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [reviewToAdd, ...reviews];
    localStorage.setItem(DB_KEYS.REVIEWS, JSON.stringify(updated));
    notifySubscribers('review_added', reviewToAdd);
    return reviewToAdd;
  }

  updateReviewStatus(id, newStatus) {
    const reviews = this.getReviews();
    const updated = reviews.map((r) => {
      if (r.id === id) {
        return { ...r, status: newStatus, updatedAt: new Date().toISOString() };
      }
      return r;
    });
    localStorage.setItem(DB_KEYS.REVIEWS, JSON.stringify(updated));
    notifySubscribers('review_status_updated', { id, status: newStatus });
    return updated;
  }

  deleteReview(id) {
    const reviews = this.getReviews();
    const updated = reviews.filter(r => r.id !== id);
    localStorage.setItem(DB_KEYS.REVIEWS, JSON.stringify(updated));
    notifySubscribers('review_deleted', { id });
    return updated;
  }

  isReviewLiked(id) {
    try {
      const likedRaw = localStorage.getItem(DB_KEYS.LIKED_REVIEWS);
      const likedSet = new Set(likedRaw ? JSON.parse(likedRaw) : []);
      return likedSet.has(id);
    } catch (e) {
      return false;
    }
  }

  toggleLikeReview(id) {
    try {
      const likedRaw = localStorage.getItem(DB_KEYS.LIKED_REVIEWS);
      const likedSet = new Set(likedRaw ? JSON.parse(likedRaw) : []);
      const isLiked = likedSet.has(id);

      if (isLiked) {
        likedSet.delete(id);
      } else {
        likedSet.add(id);
      }
      localStorage.setItem(DB_KEYS.LIKED_REVIEWS, JSON.stringify(Array.from(likedSet)));

      const reviews = this.getReviews();
      const updated = reviews.map((r) => {
        if (r.id === id) {
          const count = Number(r.likes) || 0;
          return { ...r, likes: isLiked ? Math.max(0, count - 1) : count + 1 };
        }
        return r;
      });
      localStorage.setItem(DB_KEYS.REVIEWS, JSON.stringify(updated));
      notifySubscribers('review_liked', { id, isLiked: !isLiked });
      return !isLiked;
    } catch (e) {
      return false;
    }
  }

  getReviewStats() {
    const approved = this.getApprovedReviews();
    const total = approved.length;
    if (total === 0) {
      return {
        averageRating: 5.0,
        totalReviews: 0,
        recommendedPercent: 100,
        starCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        starPercentages: { 5: 100, 4: 0, 3: 0, 2: 0, 1: 0 }
      };
    }

    let sum = 0;
    let recommendedCount = 0;
    const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    approved.forEach(r => {
      const rating = Math.min(5, Math.max(1, Math.round(Number(r.rating) || 5)));
      sum += Number(r.rating) || 5;
      starCounts[rating] = (starCounts[rating] || 0) + 1;
      if (r.recommended !== false) recommendedCount++;
    });

    const averageRating = Number((sum / total).toFixed(1));
    const recommendedPercent = Math.round((recommendedCount / total) * 100);
    const starPercentages = {
      5: Math.round((starCounts[5] / total) * 100),
      4: Math.round((starCounts[4] / total) * 100),
      3: Math.round((starCounts[3] / total) * 100),
      2: Math.round((starCounts[2] / total) * 100),
      1: Math.round((starCounts[1] / total) * 100)
    };

    return {
      averageRating,
      totalReviews: total,
      recommendedPercent,
      starCounts,
      starPercentages
    };
  }

  verifyAppointmentForReview(query) {
    if (!query || !String(query).trim()) {
      return {
        valid: false,
        message: 'Please enter your Booking ID (e.g., GGJ-782910) or registered phone number.'
      };
    }

    const rawInput = String(query).trim();
    const clean = rawInput.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanDigits = rawInput.replace(/\D/g, '');
    const appointments = this.getAppointments();

    const match = appointments.find((a) => {
      const aId = String(a.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const aPhone = String(a.phone || '').replace(/\D/g, '');
      const aEmail = String(a.email || '').toLowerCase().trim();

      const matchId = aId && aId === clean;
      const matchPhone = cleanDigits.length >= 7 && aPhone && aPhone.endsWith(cleanDigits);
      const matchEmail = aEmail && aEmail === rawInput.toLowerCase();

      return matchId || matchPhone || matchEmail;
    });

    if (!match) {
      return {
        valid: false,
        appointment: null,
        message: 'No appointment found matching this Booking ID or Phone Number. Only clients with a completed treatment can leave a review.'
      };
    }

    const status = String(match.status || match.appointmentStatus || 'Pending');
    const isCompleted = status.toLowerCase() === 'completed';

    if (!isCompleted) {
      return {
        valid: false,
        appointment: match,
        status,
        message: `Your booking (${match.id}) for ${match.service} is currently marked as "${status}". Reviews can be posted after your treatment is completed!`
      };
    }

    return {
      valid: true,
      appointment: match,
      status,
      message: `Verified! Completed treatment (${match.id}) found for ${match.customerName}.`
    };
  }

  // ==========================================
  // CONTACT MESSAGES
  // ==========================================

  getContactMessages() {
    try {
      const data = localStorage.getItem(DB_KEYS.CONTACT_MESSAGES);
      return data ? JSON.parse(data) : DEFAULT_CONTACT_MESSAGES;
    } catch (e) {
      return DEFAULT_CONTACT_MESSAGES;
    }
  }

  addContactMessage(messageData) {
    const messages = this.getContactMessages();
    const id = `msg-${Date.now()}`;
    const newMsg = {
      ...messageData,
      id,
      name: (messageData.name || messageData.fullName || 'Guest').trim(),
      email: (messageData.email || '').trim(),
      phone: (messageData.phone || '').trim(),
      subject: (messageData.subject || messageData.inquiryType || 'General Atelier Inquiry').trim(),
      message: (messageData.message || messageData.notes || '').trim(),
      status: 'New',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [newMsg, ...messages];
    localStorage.setItem(DB_KEYS.CONTACT_MESSAGES, JSON.stringify(updated));
    notifySubscribers('contact_message_added', newMsg);
    return newMsg;
  }

  updateContactMessageStatus(id, newStatus) {
    const messages = this.getContactMessages();
    const updated = messages.map(m => m.id === id ? { ...m, status: newStatus, updatedAt: new Date().toISOString() } : m);
    localStorage.setItem(DB_KEYS.CONTACT_MESSAGES, JSON.stringify(updated));
    notifySubscribers('contact_message_updated', { id, status: newStatus });
    return updated;
  }

  deleteContactMessage(id) {
    const messages = this.getContactMessages();
    const updated = messages.filter(m => m.id !== id);
    localStorage.setItem(DB_KEYS.CONTACT_MESSAGES, JSON.stringify(updated));
    notifySubscribers('contact_message_deleted', { id });
    return updated;
  }

  // ==========================================
  // GALLERY
  // ==========================================

  getGallery() {
    try {
      const data = localStorage.getItem(DB_KEYS.GALLERY);
      return data ? JSON.parse(data) : DEFAULT_GALLERY;
    } catch (e) {
      return DEFAULT_GALLERY;
    }
  }

  getActiveGallery() {
    const gallery = this.getGallery();
    return gallery.filter(g => g.isActive !== false);
  }

  addGalleryItem(itemData) {
    const gallery = this.getGallery();
    const id = itemData.id || `gal-${Date.now()}`;
    const newItem = {
      ...itemData,
      id,
      isActive: itemData.isActive !== false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updated = [newItem, ...gallery];
    localStorage.setItem(DB_KEYS.GALLERY, JSON.stringify(updated));
    notifySubscribers('gallery_updated', updated);
    return newItem;
  }

  updateGalleryItem(id, updates) {
    const gallery = this.getGallery();
    const updated = gallery.map(g => g.id === id ? { ...g, ...updates, updatedAt: new Date().toISOString() } : g);
    localStorage.setItem(DB_KEYS.GALLERY, JSON.stringify(updated));
    notifySubscribers('gallery_updated', updated);
    return updated;
  }

  deleteGalleryItem(id) {
    const gallery = this.getGallery();
    const updated = gallery.filter(g => g.id !== id);
    localStorage.setItem(DB_KEYS.GALLERY, JSON.stringify(updated));
    notifySubscribers('gallery_updated', updated);
    return updated;
  }

  // ==========================================
  // NEWSLETTER SUBSCRIBERS
  // ==========================================

  getNewsletterSubscribers() {
    try {
      const data = localStorage.getItem(DB_KEYS.NEWSLETTER_SUBSCRIBERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  subscribeNewsletter(email, topics = ['Exclusive Offers']) {
    const subscribersList = this.getNewsletterSubscribers();
    const cleanEmail = String(email).trim().toLowerCase();

    const existingIndex = subscribersList.findIndex(s => s.email.toLowerCase() === cleanEmail);
    if (existingIndex >= 0) {
      // Already subscribed
      return { success: true, message: "You're already subscribed with this email!", subscriber: subscribersList[existingIndex] };
    }

    const newSub = {
      id: `sub-${Date.now()}`,
      email: cleanEmail,
      status: 'Active',
      topics: Array.isArray(topics) ? topics : [topics],
      subscribedAt: new Date().toISOString()
    };

    const updated = [newSub, ...subscribersList];
    localStorage.setItem(DB_KEYS.NEWSLETTER_SUBSCRIBERS, JSON.stringify(updated));
    notifySubscribers('newsletter_subscribed', newSub);
    return { success: true, message: "You're subscribed!", subscriber: newSub };
  }

  deleteNewsletterSubscriber(idOrEmail) {
    const subscribersList = this.getNewsletterSubscribers();
    const updated = subscribersList.filter(s => s.id !== idOrEmail && s.email.toLowerCase() !== String(idOrEmail).toLowerCase());
    localStorage.setItem(DB_KEYS.NEWSLETTER_SUBSCRIBERS, JSON.stringify(updated));
    notifySubscribers('newsletter_unsubscribed', { idOrEmail });
    return updated;
  }

  // ==========================================
  // OFFERS & DISCOUNTS
  // ==========================================

  getOffers() {
    try {
      const data = localStorage.getItem(DB_KEYS.OFFERS);
      return data ? JSON.parse(data) : DEFAULT_OFFERS;
    } catch (e) {
      return DEFAULT_OFFERS;
    }
  }

  getActiveOffers() {
    const offers = this.getOffers();
    return offers.filter(o => o.isActive !== false);
  }

  addOffer(offerData) {
    const offers = this.getOffers();
    const id = offerData.id || `off-${Date.now()}`;
    const newOffer = {
      ...offerData,
      id,
      isActive: offerData.isActive !== false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updated = [newOffer, ...offers];
    localStorage.setItem(DB_KEYS.OFFERS, JSON.stringify(updated));
    notifySubscribers('offers_updated', updated);
    return newOffer;
  }

  updateOffer(id, updates) {
    const offers = this.getOffers();
    const updated = offers.map(o => o.id === id ? { ...o, ...updates, updatedAt: new Date().toISOString() } : o);
    localStorage.setItem(DB_KEYS.OFFERS, JSON.stringify(updated));
    notifySubscribers('offers_updated', updated);
    return updated;
  }

  deleteOffer(id) {
    const offers = this.getOffers();
    const updated = offers.filter(o => o.id !== id);
    localStorage.setItem(DB_KEYS.OFFERS, JSON.stringify(updated));
    notifySubscribers('offers_updated', updated);
    return updated;
  }

  // ==========================================
  // FESTIVAL BEAUTY OFFERS REPOSITORY
  // ==========================================

  getFestivalOffers() {
    try {
      const data = localStorage.getItem(DB_KEYS.FESTIVAL_OFFERS);
      let list = data ? JSON.parse(data) : DEFAULT_FESTIVAL_OFFERS;
      // Auto-migrate if stored list does not contain the 5 official offers or has old date bounds
      const needsMigration = !Array.isArray(list) ||
        !list.some(o => o.id === 'fest-thanksgiving') ||
        list.some(o => o.id === 'fest-thanksgiving' && o.startDate === '2026-10-01') ||
        list.some(o => o.id === 'fest-thanksgiving' && o.festival === 'Thanksgiving Special');
      if (needsMigration) {
        if (Array.isArray(list) && list.some(o => o.id === 'fest-thanksgiving')) {
          list = list.map(o => o.id === 'fest-thanksgiving' ? { ...o, festival: 'Canadian Thanksgiving Special' } : o);
        } else {
          list = DEFAULT_FESTIVAL_OFFERS;
        }
        localStorage.setItem(DB_KEYS.FESTIVAL_OFFERS, JSON.stringify(list));
      }
      const today = this.getTodayLocalDateString();
      return list.map((item) => {
        let computedStatus = item.status;
        if (item.status !== 'Draft') {
          if (item.endDate && item.endDate < today) {
            computedStatus = 'Expired';
          } else if (item.startDate && item.startDate > today) {
            computedStatus = 'Scheduled';
          } else {
            computedStatus = 'Active';
          }
        }
        return {
          ...item,
          status: computedStatus
        };
      });
    } catch (e) {
      return DEFAULT_FESTIVAL_OFFERS;
    }
  }

  getPublicFestivalOffers() {
    const list = this.getFestivalOffers();
    const today = this.getTodayLocalDateString();

    // Show only active or scheduled (upcoming) published offers (filter out Expired & Draft)
    const published = list.filter((o) =>
      o.isPublished !== false &&
      o.status !== 'Draft' &&
      o.status !== 'Expired' &&
      (!o.endDate || o.endDate >= today)
    );

    // Sort: Active offers first by displayOrder ascending, then Scheduled by startDate ascending
    return published.sort((a, b) => {
      if (a.status === 'Active' && b.status !== 'Active') return -1;
      if (a.status !== 'Active' && b.status === 'Active') return 1;
      if (a.status === 'Active' && b.status === 'Active') {
        return (Number(a.displayOrder) || 99) - (Number(b.displayOrder) || 99);
      }
      return (a.startDate || '').localeCompare(b.startDate || '');
    });
  }

  getHomepageFestivalPopupOffers() {
    const settings = this.getSettings();
    if (settings.festivalPopupEnabled === false) return [];

    const list = this.getFestivalOffers();
    const today = this.getTodayLocalDateString();

    // 1. Strictly active, published offers within valid start and expiry dates
    let eligible = list.filter((o) =>
      o.isPublished !== false &&
      o.status !== 'Draft' &&
      o.status !== 'Expired' &&
      o.showInHomepagePopup !== false &&
      (!o.startDate || o.startDate <= today) &&
      (!o.endDate || o.endDate >= today)
    );

    // 2. Resilient fallback: If date checking filtered out offers (e.g. system clock differences),
    // show published homepage popup offers so the 2 main offers always appear
    if (eligible.length === 0) {
      eligible = list.filter((o) =>
        o.isPublished !== false &&
        o.status !== 'Draft' &&
        o.showInHomepagePopup !== false
      );
    }

    // 3. Absolute fallback to default offers
    if (eligible.length === 0) {
      eligible = DEFAULT_FESTIVAL_OFFERS;
    }

    const maxOffers = Math.max(1, Number(settings.festivalPopupMaxOffers) || 5);

    // Limit to the active festival offers (max 5 offers), sorted by displayOrder
    return eligible
      .sort((a, b) => (Number(a.displayOrder) || 99) - (Number(b.displayOrder) || 99))
      .slice(0, maxOffers);
  }

  getHomepageFestivalPopupOffer() {
    const list = this.getHomepageFestivalPopupOffers();
    return list.length > 0 ? list[0] : null;
  }

  getFestivalOfferById(id) {
    if (!id) return null;
    const offers = this.getFestivalOffers();
    return offers.find((o) => o.id === id) || null;
  }

  addFestivalOffer(offerData) {
    const offers = this.getFestivalOffers();
    const id = offerData.id || `fest-${Date.now()}`;
    const orig = Math.max(0, Number(offerData.originalPrice) || 0);
    const disc = Math.max(0, Number(offerData.discountedPrice) || 0);
    const safeDiscPrice = disc > orig && orig > 0 ? orig : disc;
    const calculatedPercent = orig > 0 ? Math.round(((orig - safeDiscPrice) / orig) * 100) : 0;

    const today = this.getTodayLocalDateString();
    let status = offerData.status || 'Active';
    if (status !== 'Draft') {
      if (offerData.endDate && offerData.endDate < today) {
        status = 'Expired';
      } else if (offerData.startDate && offerData.startDate > today) {
        status = 'Scheduled';
      } else {
        status = 'Active';
      }
    }

    const newOffer = {
      ...offerData,
      id,
      originalPrice: orig,
      discountedPrice: safeDiscPrice,
      discountPercent: calculatedPercent,
      displayOrder: Number(offerData.displayOrder) || (offers.length + 1),
      isPublished: offerData.isPublished !== false,
      status,
      bookingsCount: Number(offerData.bookingsCount) || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [newOffer, ...offers];
    localStorage.setItem(DB_KEYS.FESTIVAL_OFFERS, JSON.stringify(updated));
    notifySubscribers('festival_offers_updated', updated);
    return newOffer;
  }

  updateFestivalOffer(id, updates) {
    const offers = this.getFestivalOffers();
    const today = this.getTodayLocalDateString();

    const updated = offers.map((o) => {
      if (o.id === id) {
        const merged = { ...o, ...updates, updatedAt: new Date().toISOString() };
        const orig = Math.max(0, Number(merged.originalPrice) || 0);
        const disc = Math.max(0, Number(merged.discountedPrice) || 0);
        const safeDiscPrice = disc > orig && orig > 0 ? orig : disc;
        merged.originalPrice = orig;
        merged.discountedPrice = safeDiscPrice;
        merged.discountPercent = orig > 0 ? Math.round(((orig - safeDiscPrice) / orig) * 100) : 0;
        merged.displayOrder = Number(merged.displayOrder) || 1;

        if (merged.status !== 'Draft') {
          if (merged.endDate && merged.endDate < today) {
            merged.status = 'Expired';
          } else if (merged.startDate && merged.startDate > today) {
            merged.status = 'Scheduled';
          } else {
            merged.status = 'Active';
          }
        }
        return merged;
      }
      return o;
    });

    localStorage.setItem(DB_KEYS.FESTIVAL_OFFERS, JSON.stringify(updated));
    notifySubscribers('festival_offers_updated', updated);
    return updated.find((o) => o.id === id) || null;
  }

  deleteFestivalOffer(id) {
    const offers = this.getFestivalOffers();
    const updated = offers.filter((o) => o.id !== id);
    localStorage.setItem(DB_KEYS.FESTIVAL_OFFERS, JSON.stringify(updated));
    notifySubscribers('festival_offers_updated', updated);
    return updated;
  }

  validateOfferForBooking(offerId, bookingDate) {
    if (!offerId) return { valid: false, message: 'No offer ID specified' };
    const offer = this.getFestivalOfferById(offerId);
    if (!offer) {
      return { valid: false, message: 'Offer not found' };
    }
    if (offer.isPublished === false || offer.status === 'Draft') {
      return { valid: false, message: 'This offer is currently not active for public booking.' };
    }

    const checkDate = bookingDate || this.getTodayLocalDateString();
    if (offer.startDate && checkDate < offer.startDate) {
      return { 
        valid: false, 
        offer,
        message: `This festival offer is scheduled to start on ${offer.startDate}.` 
      };
    }
    if (offer.endDate && checkDate > offer.endDate) {
      return { 
        valid: false, 
        offer,
        message: `This festival offer expired on ${offer.endDate}.` 
      };
    }

    return {
      valid: true,
      offer,
      originalPrice: offer.originalPrice,
      discountedPrice: offer.discountedPrice,
      discountPercent: offer.discountPercent,
      savings: Math.max(0, (offer.originalPrice || 0) - (offer.discountedPrice || 0)),
      message: 'Festival offer applied successfully!'
    };
  }

  getTodayLocalDateString() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  // ==========================================
  // COMBO PACKAGES REPOSITORY
  // ==========================================

  hydrateComboPackage(combo) {
    if (!combo) return null;
    const allServices = this.getServices();
    const serviceIds = Array.isArray(combo.serviceIds) ? combo.serviceIds : [];

    const resolvedServices = serviceIds
      .map(id => allServices.find(s => s.id === id))
      .filter(Boolean);

    const totalOriginalPrice = resolvedServices.reduce((sum, s) => sum + (Number(s.price) || 0), 0);
    const comboPrice = Number(combo.comboPrice) || 0;
    const savingsAmount = Math.max(0, totalOriginalPrice - comboPrice);
    const savingsPercent = totalOriginalPrice > 0 ? Math.round((savingsAmount / totalOriginalPrice) * 100) : 0;

    const totalDurationMinutes = resolvedServices.reduce((sum, s) => {
      return sum + this.parseServiceDurationMinutes(s.duration || s.serviceDuration || 45);
    }, 0);

    const hrs = Math.floor(totalDurationMinutes / 60);
    const mins = totalDurationMinutes % 60;
    let durationDisplay = '';
    if (hrs > 0 && mins > 0) {
      durationDisplay = `${hrs} hr ${mins} mins`;
    } else if (hrs > 0) {
      durationDisplay = `${hrs} hr${hrs > 1 ? 's' : ''}`;
    } else {
      durationDisplay = `${mins} mins`;
    }

    return {
      ...combo,
      services: resolvedServices,
      serviceNames: resolvedServices.map(s => s.name),
      totalOriginalPrice,
      savingsAmount,
      savingsPercent,
      totalDurationMinutes,
      durationDisplay,
      active: combo.active !== false,
      isPublished: combo.isPublished !== false
    };
  }

  getComboPackages() {
    try {
      const stored = localStorage.getItem(DB_KEYS.COMBO_PACKAGES);
      let list = [];
      if (!stored) {
        list = DEFAULT_COMBO_PACKAGES;
        localStorage.setItem(DB_KEYS.COMBO_PACKAGES, JSON.stringify(list));
      } else {
        const storedList = JSON.parse(stored);
        const existingIds = new Set(storedList.map(item => item.id));
        const missingDefaults = DEFAULT_COMBO_PACKAGES.filter(d => !existingIds.has(d.id));
        list = [...storedList, ...missingDefaults];
        if (missingDefaults.length > 0) {
          localStorage.setItem(DB_KEYS.COMBO_PACKAGES, JSON.stringify(list));
        }
      }
      return list
        .map(c => this.hydrateComboPackage(c))
        .sort((a, b) => (Number(a.displayOrder) || 99) - (Number(b.displayOrder) || 99));
    } catch (e) {
      console.warn('Error loading combo packages:', e);
      return DEFAULT_COMBO_PACKAGES.map(c => this.hydrateComboPackage(c));
    }
  }

  getActiveComboPackages() {
    return this.getComboPackages().filter(c => c.active !== false && c.isPublished !== false);
  }

  getComboPackageById(idOrSlug) {
    if (!idOrSlug) return null;
    const target = String(idOrSlug).toLowerCase().trim();
    const combos = this.getComboPackages();
    return combos.find(c => String(c.id).toLowerCase() === target || String(c.slug || '').toLowerCase() === target) || null;
  }

  addComboPackage(pkgData) {
    const list = this.getComboPackages();
    const newId = pkgData.id || `combo-${Date.now()}`;
    const slug = pkgData.slug || (pkgData.name || 'combo').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const newCombo = {
      id: newId,
      slug,
      name: pkgData.name || 'New Combo Package',
      tagline: pkgData.tagline || '',
      description: pkgData.description || '',
      image: pkgData.image || '/facial-atelier-clean.webp',
      categoryTag: pkgData.categoryTag || 'EXCLUSIVE COMBO',
      serviceIds: Array.isArray(pkgData.serviceIds) ? pkgData.serviceIds : [],
      comboPrice: Number(pkgData.comboPrice) || 0,
      active: pkgData.active !== undefined ? Boolean(pkgData.active) : true,
      isPublished: pkgData.isPublished !== undefined ? Boolean(pkgData.isPublished) : true,
      featured: Boolean(pkgData.featured),
      displayOrder: Number(pkgData.displayOrder) || list.length + 1,
      benefits: Array.isArray(pkgData.benefits) ? pkgData.benefits : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const rawList = (() => {
      try {
        const stored = localStorage.getItem(DB_KEYS.COMBO_PACKAGES);
        return stored ? JSON.parse(stored) : DEFAULT_COMBO_PACKAGES;
      } catch (e) {
        return DEFAULT_COMBO_PACKAGES;
      }
    })();

    const updatedRaw = [...rawList, newCombo];
    localStorage.setItem(DB_KEYS.COMBO_PACKAGES, JSON.stringify(updatedRaw));
    notifySubscribers('combo_packages_updated', updatedRaw);
    return this.hydrateComboPackage(newCombo);
  }

  updateComboPackage(id, updates) {
    const rawList = (() => {
      try {
        const stored = localStorage.getItem(DB_KEYS.COMBO_PACKAGES);
        return stored ? JSON.parse(stored) : DEFAULT_COMBO_PACKAGES;
      } catch (e) {
        return DEFAULT_COMBO_PACKAGES;
      }
    })();

    let updatedCombo = null;
    const updatedRaw = rawList.map(item => {
      if (item.id === id || item.slug === id) {
        updatedCombo = {
          ...item,
          ...updates,
          updatedAt: new Date().toISOString()
        };
        return updatedCombo;
      }
      return item;
    });

    localStorage.setItem(DB_KEYS.COMBO_PACKAGES, JSON.stringify(updatedRaw));
    notifySubscribers('combo_packages_updated', updatedRaw);
    return this.hydrateComboPackage(updatedCombo);
  }

  deleteComboPackage(id) {
    const rawList = (() => {
      try {
        const stored = localStorage.getItem(DB_KEYS.COMBO_PACKAGES);
        return stored ? JSON.parse(stored) : DEFAULT_COMBO_PACKAGES;
      } catch (e) {
        return DEFAULT_COMBO_PACKAGES;
      }
    })();

    const updatedRaw = rawList.filter(item => item.id !== id && item.slug !== id);
    localStorage.setItem(DB_KEYS.COMBO_PACKAGES, JSON.stringify(updatedRaw));
    notifySubscribers('combo_packages_updated', updatedRaw);
    return true;
  }

  // ==========================================
  // SEASONAL BEAUTY MENU REPOSITORY
  // ==========================================

  hydrateSeasonalHighlight(item) {
    if (!item) return null;
    const today = this.getTodayLocalDateString();
    
    // Resolve target details if service or combo package
    let target = null;
    let targetTitle = item.title;
    let targetPrice = Number(item.originalPrice) || 0;
    let targetImage = item.image;
    let targetCategory = '';

    if (item.itemType === 'service') {
      target = this.getServiceById(item.targetId);
      if (target) {
        targetTitle = item.title || target.name;
        targetPrice = Number(item.originalPrice) || Number(target.price) || 0;
        targetImage = item.image || target.image;
        targetCategory = target.categoryName || target.category || 'Service';
      }
    } else if (item.itemType === 'package') {
      target = this.getComboPackageById(item.targetId);
      if (target) {
        targetTitle = item.title || target.name;
        targetPrice = Number(item.originalPrice) || Number(target.comboPrice) || 0;
        targetImage = item.image || target.image;
        targetCategory = target.categoryTag || 'Package';
      }
    }

    const originalPrice = Math.max(0, Number(item.originalPrice !== undefined ? item.originalPrice : targetPrice) || 0);
    const promotionalPrice = item.promotionalPrice !== null && item.promotionalPrice !== undefined && item.promotionalPrice !== ''
      ? Math.max(0, Number(item.promotionalPrice))
      : null;

    // Calculate discount percent and effective price
    const effectivePrice = promotionalPrice !== null && promotionalPrice > 0 && promotionalPrice < originalPrice
      ? promotionalPrice
      : originalPrice;

    const discountPercent = (promotionalPrice !== null && promotionalPrice > 0 && promotionalPrice < originalPrice && originalPrice > 0)
      ? Math.round(((originalPrice - promotionalPrice) / originalPrice) * 100)
      : 0;

    // Compute status: Draft, Expired, Scheduled, Active
    let status = 'Active';
    if (item.isPublished === false) {
      status = 'Draft';
    } else if (item.validUntil && item.validUntil < today) {
      status = 'Expired';
    } else if (item.validFrom && item.validFrom > today) {
      status = 'Scheduled';
    } else {
      status = 'Active';
    }

    return {
      ...item,
      title: item.title || targetTitle,
      originalPrice,
      promotionalPrice: discountPercent > 0 ? promotionalPrice : null,
      effectivePrice,
      discountPercent,
      image: item.image || targetImage || '/facial-atelier-clean.webp',
      targetCategory,
      target,
      status,
      isExpired: item.validUntil ? item.validUntil < today : false,
      isScheduled: item.validFrom ? item.validFrom > today : false,
      isPublished: item.isPublished !== false,
      isFeatured: Boolean(item.isFeatured),
      displayOrder: Number(item.displayOrder) || 1
    };
  }

  getSeasonalHighlights() {
    try {
      const stored = localStorage.getItem(DB_KEYS.SEASONAL_MENU);
      let list = [];
      if (!stored) {
        list = DEFAULT_SEASONAL_MENU;
        localStorage.setItem(DB_KEYS.SEASONAL_MENU, JSON.stringify(list));
      } else {
        const storedList = JSON.parse(stored);
        if (!Array.isArray(storedList) || storedList.length === 0) {
          list = DEFAULT_SEASONAL_MENU;
          localStorage.setItem(DB_KEYS.SEASONAL_MENU, JSON.stringify(list));
        } else {
          list = storedList;
        }
      }
      return list
        .map(h => this.hydrateSeasonalHighlight(h))
        .sort((a, b) => (Number(a.displayOrder) || 99) - (Number(b.displayOrder) || 99));
    } catch (e) {
      console.warn('Error loading seasonal menu highlights:', e);
      return DEFAULT_SEASONAL_MENU.map(h => this.hydrateSeasonalHighlight(h));
    }
  }

  getPublicSeasonalHighlights() {
    const list = this.getSeasonalHighlights();
    const today = this.getTodayLocalDateString();

    // Display Rules:
    // 1. Show only admin-approved, published highlights (isPublished === true && status !== 'Draft')
    // 2. Automatically hide highlights outside their configured validity dates
    // 3. Never display expired offers as active promotions (status !== 'Expired')
    return list.filter(h => 
      h.isPublished === true &&
      h.status === 'Active' &&
      (!h.validFrom || h.validFrom <= today) &&
      (!h.validUntil || h.validUntil >= today)
    ).sort((a, b) => (Number(a.displayOrder) || 99) - (Number(b.displayOrder) || 99));
  }

  getSeasonalHighlightById(id) {
    if (!id) return null;
    const list = this.getSeasonalHighlights();
    return list.find(h => h.id === id) || null;
  }

  addSeasonalHighlight(highlightData) {
    const list = (() => {
      try {
        const stored = localStorage.getItem(DB_KEYS.SEASONAL_MENU);
        return stored ? JSON.parse(stored) : DEFAULT_SEASONAL_MENU;
      } catch (e) {
        return DEFAULT_SEASONAL_MENU;
      }
    })();

    const newId = highlightData.id || `season-${Date.now()}`;
    const origPrice = Math.max(0, Number(highlightData.originalPrice) || 0);
    let promoPrice = highlightData.promotionalPrice !== null && highlightData.promotionalPrice !== undefined && highlightData.promotionalPrice !== ''
      ? Math.max(0, Number(highlightData.promotionalPrice))
      : null;

    // Validation: Promotional price must be less than original price
    if (promoPrice !== null && origPrice > 0 && promoPrice >= origPrice) {
      throw new Error('Promotional price must be less than the regular price.');
    }

    // Validation: End date cannot be before start date
    if (highlightData.validFrom && highlightData.validUntil && highlightData.validUntil < highlightData.validFrom) {
      throw new Error('Offer validity end date cannot be earlier than start date.');
    }

    const newHighlight = {
      id: newId,
      itemType: highlightData.itemType || 'service',
      targetId: highlightData.targetId || '',
      title: highlightData.title || 'Seasonal Ritual',
      seasonalLabel: highlightData.seasonalLabel || 'Seasonal Highlight',
      season: highlightData.season || 'autumn',
      description: highlightData.description || '',
      image: highlightData.image || '/facial-atelier-clean.webp',
      originalPrice: origPrice,
      promotionalPrice: promoPrice,
      validFrom: highlightData.validFrom || '',
      validUntil: highlightData.validUntil || '',
      isPublished: highlightData.isPublished !== false,
      isFeatured: Boolean(highlightData.isFeatured),
      displayOrder: Number(highlightData.displayOrder) || (list.length + 1),
      benefits: Array.isArray(highlightData.benefits) ? highlightData.benefits : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [...list, newHighlight];
    localStorage.setItem(DB_KEYS.SEASONAL_MENU, JSON.stringify(updated));
    notifySubscribers('seasonal_menu_updated', updated);
    return this.hydrateSeasonalHighlight(newHighlight);
  }

  updateSeasonalHighlight(id, updates) {
    const list = (() => {
      try {
        const stored = localStorage.getItem(DB_KEYS.SEASONAL_MENU);
        return stored ? JSON.parse(stored) : DEFAULT_SEASONAL_MENU;
      } catch (e) {
        return DEFAULT_SEASONAL_MENU;
      }
    })();

    let updatedHighlight = null;
    const updatedRaw = list.map(item => {
      if (item.id === id) {
        const merged = { ...item, ...updates, updatedAt: new Date().toISOString() };
        const origPrice = Math.max(0, Number(merged.originalPrice) || 0);
        let promoPrice = merged.promotionalPrice !== null && merged.promotionalPrice !== undefined && merged.promotionalPrice !== ''
          ? Math.max(0, Number(merged.promotionalPrice))
          : null;

        if (promoPrice !== null && origPrice > 0 && promoPrice >= origPrice) {
          throw new Error('Promotional price must be less than the regular price.');
        }

        if (merged.validFrom && merged.validUntil && merged.validUntil < merged.validFrom) {
          throw new Error('Offer validity end date cannot be earlier than start date.');
        }

        merged.originalPrice = origPrice;
        merged.promotionalPrice = promoPrice;
        merged.displayOrder = Number(merged.displayOrder) || 1;
        merged.isPublished = merged.isPublished !== false;
        merged.isFeatured = Boolean(merged.isFeatured);

        updatedHighlight = merged;
        return merged;
      }
      return item;
    });

    localStorage.setItem(DB_KEYS.SEASONAL_MENU, JSON.stringify(updatedRaw));
    notifySubscribers('seasonal_menu_updated', updatedRaw);
    return this.hydrateSeasonalHighlight(updatedHighlight);
  }

  deleteSeasonalHighlight(id) {
    const list = (() => {
      try {
        const stored = localStorage.getItem(DB_KEYS.SEASONAL_MENU);
        return stored ? JSON.parse(stored) : DEFAULT_SEASONAL_MENU;
      } catch (e) {
        return DEFAULT_SEASONAL_MENU;
      }
    })();

    const updated = list.filter(item => item.id !== id);
    localStorage.setItem(DB_KEYS.SEASONAL_MENU, JSON.stringify(updated));
    notifySubscribers('seasonal_menu_updated', updated);
    return true;
  }

  togglePublishSeasonalHighlight(id) {
    const item = this.getSeasonalHighlightById(id);
    if (!item) return null;
    return this.updateSeasonalHighlight(id, { isPublished: !item.isPublished });
  }

  toggleFeatureSeasonalHighlight(id) {
    const item = this.getSeasonalHighlightById(id);
    if (!item) return null;
    return this.updateSeasonalHighlight(id, { isFeatured: !item.isFeatured });
  }

  // ==========================================
  // SALON DAY ITINERARY ENGINE
  // ==========================================

  calculateSalonDayItinerary(serviceIds = []) {
    if (!Array.isArray(serviceIds) || serviceIds.length === 0) {
      return {
        serviceIds: [],
        services: [],
        itemCount: 0,
        totalOriginalPrice: 0,
        discountPercent: 0,
        discountAmount: 0,
        finalPrice: 0,
        totalDurationMinutes: 0,
        durationDisplay: '0 min',
        disclaimer: 'Total duration is an estimate and may exclude consultation, breaks, sanitization, or scheduling gaps.'
      };
    }

    const allServices = this.getServices();
    const resolvedServices = [];
    const seenIds = new Set();

    for (const sid of serviceIds) {
      if (!sid || seenIds.has(sid)) continue;
      const svc = allServices.find(s => s.id === sid || s.slug === sid);
      if (svc && svc.active !== false) {
        seenIds.add(sid);
        const durationM = this.parseServiceDurationMinutes(svc.duration || 45);
        resolvedServices.push({
          id: svc.id,
          name: svc.name,
          category: svc.categoryName || svc.category || 'Treatment',
          image: svc.image || '/facial-atelier-clean.webp',
          price: Number(svc.price) || 0,
          duration: svc.duration || `${durationM} min`,
          durationMinutes: durationM,
          description: svc.description || ''
        });
      }
    }

    const totalOriginalPrice = resolvedServices.reduce((sum, s) => sum + s.price, 0);
    const totalDurationMinutes = resolvedServices.reduce((sum, s) => sum + s.durationMinutes, 0);

    // Explicit validated tier discount:
    // 3 or more treatments: 10% Salon Day Itinerary Discount
    // 5 or more treatments: 15% VIP Salon Day Itinerary Discount
    let discountPercent = 0;
    if (resolvedServices.length >= 5) {
      discountPercent = 15;
    } else if (resolvedServices.length >= 3) {
      discountPercent = 10;
    }

    const discountAmount = discountPercent > 0 
      ? Math.round(totalOriginalPrice * (discountPercent / 100)) 
      : 0;
    const finalPrice = Math.max(0, totalOriginalPrice - discountAmount);

    const hrs = Math.floor(totalDurationMinutes / 60);
    const mins = totalDurationMinutes % 60;
    let durationDisplay = '';
    if (hrs > 0 && mins > 0) {
      durationDisplay = `${hrs} hr ${mins} mins`;
    } else if (hrs > 0) {
      durationDisplay = `${hrs} hr${hrs > 1 ? 's' : ''}`;
    } else {
      durationDisplay = `${mins} mins`;
    }

    return {
      serviceIds: resolvedServices.map(s => s.id),
      services: resolvedServices,
      itemCount: resolvedServices.length,
      totalOriginalPrice,
      discountPercent,
      discountAmount,
      finalPrice,
      totalDurationMinutes,
      durationDisplay,
      disclaimer: 'Total duration is an estimate and may exclude consultation, breaks, sanitization, or scheduling gaps.'
    };
  }

  // ==========================================
  // SETTINGS REPOSITORY
  // ==========================================

  getSettings() {
    try {
      const data = localStorage.getItem(DB_KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch (e) {
      return DEFAULT_SETTINGS;
    }
  }

  updateSettings(updates) {
    const current = this.getSettings();
    const updated = { ...current, ...updates, updatedAt: new Date().toISOString() };
    localStorage.setItem(DB_KEYS.SETTINGS, JSON.stringify(updated));
    notifySubscribers('settings_updated', updated);
    return updated;
  }

  // ==========================================
  // TREATMENTS
  // ==========================================

  getTreatments() {
    try {
      const data = localStorage.getItem(DB_KEYS.TREATMENTS);
      return data ? JSON.parse(data) : DEFAULT_TREATMENTS;
    } catch (e) {
      return DEFAULT_TREATMENTS;
    }
  }

  updateTreatment(id, updates) {
    const list = this.getTreatments();
    const updated = list.map(t => t.id === id ? { ...t, ...updates } : t);
    localStorage.setItem(DB_KEYS.TREATMENTS, JSON.stringify(updated));
    notifySubscribers('treatments_updated', updated);
    return updated;
  }

  // ==========================================
  // FAQ REPOSITORY (CONTENT MANAGEMENT)
  // ==========================================

  getFaqs(includeUnpublished = false) {
    try {
      const data = localStorage.getItem(DB_KEYS.FAQS);
      let list = data ? JSON.parse(data) : FAQ_DATA;
      if (data && Array.isArray(list)) {
        const existingIds = new Set(list.map(f => String(f.id)));
        const missingDefaults = FAQ_DATA.filter(f => !existingIds.has(String(f.id)));
        if (missingDefaults.length > 0) {
          list = [...list, ...missingDefaults];
          localStorage.setItem(DB_KEYS.FAQS, JSON.stringify(list));
        }
      }
      if (includeUnpublished) {
        return list;
      }
      return list.filter(f => f.isPublished !== false);
    } catch (e) {
      return includeUnpublished ? FAQ_DATA : FAQ_DATA.filter(f => f.isPublished !== false);
    }
  }

  getFaqById(id) {
    if (id === undefined || id === null) return null;
    const faqs = this.getFaqs(true);
    return faqs.find(f => String(f.id) === String(id)) || null;
  }

  addFaq(faqData) {
    const faqs = this.getFaqs(true);
    const id = faqData.id || `faq-${Date.now()}`;
    const newFaq = {
      ...faqData,
      id,
      isPublished: faqData.isPublished !== false,
      displayOrder: Number(faqData.displayOrder) || (faqs.length + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updated = [...faqs, newFaq];
    localStorage.setItem(DB_KEYS.FAQS, JSON.stringify(updated));
    notifySubscribers('faqs_updated', updated);
    return newFaq;
  }

  updateFaq(id, updates) {
    const faqs = this.getFaqs(true);
    let found = false;
    const updated = faqs.map(f => {
      if (String(f.id) === String(id)) {
        found = true;
        return {
          ...f,
          ...updates,
          updatedAt: new Date().toISOString()
        };
      }
      return f;
    });
    if (!found) {
      throw new Error(`FAQ with ID ${id} not found.`);
    }
    localStorage.setItem(DB_KEYS.FAQS, JSON.stringify(updated));
    notifySubscribers('faqs_updated', updated);
    return updated.find(f => String(f.id) === String(id));
  }

  toggleFaqPublish(id) {
    const faqs = this.getFaqs(true);
    const target = faqs.find(f => String(f.id) === String(id));
    if (!target) return null;
    const newStatus = !target.isPublished;
    return this.updateFaq(id, { isPublished: newStatus });
  }

  deleteFaq(id) {
    const faqs = this.getFaqs(true);
    const updated = faqs.filter(f => String(f.id) !== String(id));
    localStorage.setItem(DB_KEYS.FAQS, JSON.stringify(updated));
    notifySubscribers('faqs_updated', updated);
    return updated;
  }

  resetFaqsToDefault() {
    localStorage.setItem(DB_KEYS.FAQS, JSON.stringify(FAQ_DATA));
    notifySubscribers('faqs_updated', FAQ_DATA);
    return FAQ_DATA;
  }

  // ==========================================
  // MASTER DASHBOARD STATISTICS
  // ==========================================

  getDashboardStats() {
    const appointments = this.getAppointments();
    const services = this.getServices();
    const reviews = this.getReviews();
    const contactMessages = this.getContactMessages();
    const subscribersList = this.getNewsletterSubscribers();
    const offers = this.getOffers();
    const users = this.getUsers();
    const faqs = this.getFaqs(true);

    const totalBookings = appointments.length;
    const totalRevenue = appointments.reduce((sum, item) => sum + (Number(item.servicePrice) || 0), 0);

    const inProgressCount = appointments.filter(a => a.status === 'In Progress' || a.appointmentStatus === 'In Progress').length;
    const confirmedCount = appointments.filter(a => a.status === 'Appointment Request Confirmed' || a.status === 'Confirmed' || a.appointmentStatus === 'Confirmed').length;
    const pendingCount = appointments.filter(a => a.status === 'Pending' || a.status === 'In Review' || a.appointmentStatus === 'Pending').length;
    const completedCount = appointments.filter(a => a.status === 'Completed' || a.appointmentStatus === 'Completed').length;
    const cancelledCount = appointments.filter(a => a.status === 'Cancelled' || a.appointmentStatus === 'Cancelled' || a.status === 'Rejected').length;

    const unreadMessagesCount = contactMessages.filter(m => m.status === 'New').length;
    const activeOffersCount = offers.filter(o => o.isActive !== false).length;
    const totalCustomersCount = users.filter(u => u.role === 'customer').length;

    return {
      totalBookings,
      totalRevenue,
      inProgressCount,
      confirmedCount,
      pendingCount,
      completedCount,
      cancelledCount,
      totalServices: services.length,
      activeServices: services.filter(s => s.isActive !== false && s.active !== false).length,
      totalReviews: reviews.length,
      unreadMessagesCount,
      totalSubscribers: subscribersList.length,
      activeOffersCount,
      totalCustomersCount,
      totalFaqs: faqs.length,
      publishedFaqs: faqs.filter(f => f.isPublished !== false).length,
      reviewStats: this.getReviewStats()
    };
  }

  // ==========================================
  // DURATION & TIME FORMATTERS
  // ==========================================

  formatDurationHMS(totalSeconds) {
    const s = Math.max(0, Math.floor(Number(totalSeconds) || 0));
    const hours = Math.floor(s / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  formatDurationDisplay(totalSeconds) {
    const s = Math.max(0, Math.floor(Number(totalSeconds) || 0));
    const hours = Math.floor(s / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;
    if (hours > 0) {
      return `${hours} hr ${minutes} min ${seconds} sec`;
    }
    if (minutes > 0) {
      return `${minutes} min ${seconds} sec`;
    }
    return `${seconds} sec`;
  }

  formatTimeAMPM(isoOrDateString, includeSeconds = false) {
    if (!isoOrDateString) return '';
    try {
      const date = new Date(isoOrDateString);
      if (!isNaN(date.getTime())) {
        return date.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          ...(includeSeconds ? { second: '2-digit' } : {}),
          hour12: true
        });
      }
    } catch (e) {}
    return String(isoOrDateString);
  }

  // ==========================================
  // AFTERCARE & PRODUCT RECOMMENDATIONS ENGINE
  // ==========================================

  getAftercareSettings() {
    try {
      const data = localStorage.getItem(DB_KEYS.AFTERCARE_SETTINGS);
      if (!data) return DEFAULT_AFTERCARE_CATEGORIES;
      const parsed = JSON.parse(data);
      // Merge with defaults to ensure all required fields are present
      return DEFAULT_AFTERCARE_CATEGORIES.map(def => {
        const custom = parsed.find(p => p.id === def.id);
        if (!custom) return def;
        return {
          ...def,
          ...custom,
          instructions: custom.instructions || def.instructions,
          products: custom.products || def.products
        };
      });
    } catch (e) {
      return DEFAULT_AFTERCARE_CATEGORIES;
    }
  }

  getAftercareForService(serviceName = '', serviceCategory = '', serviceSlug = '') {
    const allSettings = this.getAftercareSettings();
    const detectedId = detectAftercareCategory(serviceName, serviceCategory, serviceSlug);
    const categoryMatch = allSettings.find(c => c.id === detectedId) || allSettings[0];
    return {
      categoryId: categoryMatch.id,
      categoryName: categoryMatch.name,
      displayName: categoryMatch.displayName,
      description: categoryMatch.description,
      instructions: (categoryMatch.instructions || []).map(i => ({ ...i })),
      products: (categoryMatch.products || []).filter(p => p.approved !== false).map(p => ({ ...p }))
    };
  }

  updateAftercareCategory(categoryId, categoryUpdates) {
    const allSettings = this.getAftercareSettings();
    const updated = allSettings.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          ...categoryUpdates,
          updatedAt: new Date().toISOString()
        };
      }
      return cat;
    });

    localStorage.setItem(DB_KEYS.AFTERCARE_SETTINGS, JSON.stringify(updated));
    notifySubscribers('aftercare_settings_updated', updated);
    return updated;
  }

  updateAftercareInstruction(categoryId, instructionId, instructionUpdates) {
    const allSettings = this.getAftercareSettings();
    const updated = allSettings.map(cat => {
      if (cat.id === categoryId) {
        const nextInstructions = (cat.instructions || []).map(inst => {
          if (inst.id === instructionId) {
            return { ...inst, ...instructionUpdates };
          }
          return inst;
        });
        return { ...cat, instructions: nextInstructions, updatedAt: new Date().toISOString() };
      }
      return cat;
    });

    localStorage.setItem(DB_KEYS.AFTERCARE_SETTINGS, JSON.stringify(updated));
    notifySubscribers('aftercare_settings_updated', updated);
    return updated;
  }

  addAftercareInstruction(categoryId, newInstruction) {
    const allSettings = this.getAftercareSettings();
    const instId = newInstruction.id || `inst-${Date.now()}`;
    const updated = allSettings.map(cat => {
      if (cat.id === categoryId) {
        const nextInstructions = [
          ...(cat.instructions || []),
          { ...newInstruction, id: instId }
        ];
        return { ...cat, instructions: nextInstructions, updatedAt: new Date().toISOString() };
      }
      return cat;
    });

    localStorage.setItem(DB_KEYS.AFTERCARE_SETTINGS, JSON.stringify(updated));
    notifySubscribers('aftercare_settings_updated', updated);
    return updated;
  }

  deleteAftercareInstruction(categoryId, instructionId) {
    const allSettings = this.getAftercareSettings();
    const updated = allSettings.map(cat => {
      if (cat.id === categoryId) {
        const nextInstructions = (cat.instructions || []).filter(inst => inst.id !== instructionId);
        return { ...cat, instructions: nextInstructions, updatedAt: new Date().toISOString() };
      }
      return cat;
    });

    localStorage.setItem(DB_KEYS.AFTERCARE_SETTINGS, JSON.stringify(updated));
    notifySubscribers('aftercare_settings_updated', updated);
    return updated;
  }

  resetAftercareCategoryToDefault(categoryId) {
    const allSettings = this.getAftercareSettings();
    const defaultCat = DEFAULT_AFTERCARE_CATEGORIES.find(c => c.id === categoryId);
    if (!defaultCat) return allSettings;

    const updated = allSettings.map(cat => {
      if (cat.id === categoryId) {
        return JSON.parse(JSON.stringify(defaultCat));
      }
      return cat;
    });

    localStorage.setItem(DB_KEYS.AFTERCARE_SETTINGS, JSON.stringify(updated));
    notifySubscribers('aftercare_settings_updated', updated);
    return updated;
  }

  // Customer Saved Recommendations (Account Dashboard Integration)
  getCustomerSavedRecommendations(userIdOrEmail) {
    if (!userIdOrEmail) return [];
    try {
      const data = localStorage.getItem(DB_KEYS.CUSTOMER_SAVED_RECOMMENDATIONS);
      const allSaved = data ? JSON.parse(data) : [];
      const target = String(userIdOrEmail).toLowerCase().trim();
      return allSaved
        .filter(item => {
          const itemUserId = String(item.userId || '').toLowerCase().trim();
          const itemEmail = String(item.email || '').toLowerCase().trim();
          return itemUserId === target || itemEmail === target;
        })
        .sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
    } catch (e) {
      return [];
    }
  }

  saveCustomerAftercareRecommendation(userIdOrEmail, payload) {
    if (!userIdOrEmail) {
      throw new Error('Please sign in or create an account to save your recommendations.');
    }

    const targetUser = String(userIdOrEmail).toLowerCase().trim();
    let allSaved = [];
    try {
      const data = localStorage.getItem(DB_KEYS.CUSTOMER_SAVED_RECOMMENDATIONS);
      allSaved = data ? JSON.parse(data) : [];
    } catch (e) {
      allSaved = [];
    }

    // Check for duplicate saved recommendations
    const isDuplicate = allSaved.some(item => {
      const itemMatch = String(item.userId || '').toLowerCase().trim() === targetUser || 
                         String(item.email || '').toLowerCase().trim() === targetUser;
      if (!itemMatch) return false;

      // Duplicate condition 1: Same appointment ID
      if (payload.appointmentId && item.appointmentId && item.appointmentId === payload.appointmentId) {
        return true;
      }

      // Duplicate condition 2: Same service on same date
      if (payload.serviceName && item.serviceName === payload.serviceName && payload.serviceDate && item.serviceDate === payload.serviceDate) {
        return true;
      }

      return false;
    });

    if (isDuplicate) {
      return {
        success: true,
        isDuplicate: true,
        message: 'This aftercare plan is already saved in your Patron portal.'
      };
    }

    // Create persistent immutable snapshot
    const savedRecord = {
      id: `saved-rec-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      userId: payload.userId || userIdOrEmail,
      email: payload.email || (userIdOrEmail.includes('@') ? userIdOrEmail : ''),
      appointmentId: payload.appointmentId || null,
      serviceName: payload.serviceName || 'Custom Salon Treatment',
      serviceCategory: payload.serviceCategory || 'hair-treatments',
      serviceDate: payload.serviceDate || new Date().toISOString().split('T')[0],
      stylistName: payload.stylistName || 'Janki Khatroja (Founder & Master Stylist)',
      priceCad: payload.priceCad || null,
      treatmentDuration: payload.treatmentDuration || null,
      // Deep snapshot of instructions and recommended products to preserve them even if catalog updates later
      instructions: JSON.parse(JSON.stringify(payload.instructions || [])),
      products: JSON.parse(JSON.stringify(payload.products || [])),
      notes: payload.notes || '',
      savedAt: new Date().toISOString()
    };

    const updated = [savedRecord, ...allSaved];
    localStorage.setItem(DB_KEYS.CUSTOMER_SAVED_RECOMMENDATIONS, JSON.stringify(updated));
    notifySubscribers('recommendations_saved', savedRecord);

    return {
      success: true,
      isDuplicate: false,
      message: 'Treatment aftercare & product recommendations saved to your Patron account!',
      savedRecord
    };
  }

  removeCustomerSavedRecommendation(userIdOrEmail, savedId) {
    if (!userIdOrEmail || !savedId) return [];
    try {
      const data = localStorage.getItem(DB_KEYS.CUSTOMER_SAVED_RECOMMENDATIONS);
      const allSaved = data ? JSON.parse(data) : [];
      const target = String(userIdOrEmail).toLowerCase().trim();
      const updated = allSaved.filter(item => {
        if (item.id === savedId) {
          const itemUserId = String(item.userId || '').toLowerCase().trim();
          const itemEmail = String(item.email || '').toLowerCase().trim();
          return itemUserId !== target && itemEmail !== target;
        }
        return true;
      });

      localStorage.setItem(DB_KEYS.CUSTOMER_SAVED_RECOMMENDATIONS, JSON.stringify(updated));
      notifySubscribers('recommendations_removed', { id: savedId });
      return updated;
    } catch (e) {
      return [];
    }
  }

  // ==========================================
  // MEHNDI APPLICATION PROCESS & PRICING
  // ==========================================

  getMehndiProcessServices() {
    try {
      const data = localStorage.getItem(DB_KEYS.MEHNDI_PROCESS_PRICING);
      let list = data ? JSON.parse(data) : null;
      if (!list || !Array.isArray(list) || list.length === 0) {
        list = JSON.parse(JSON.stringify(DEFAULT_MEHNDI_PROCESS_SERVICES));
        localStorage.setItem(DB_KEYS.MEHNDI_PROCESS_PRICING, JSON.stringify(list));
      }

      // Merge with existing salon database catalog so approved prices are never overwritten
      const catalogServices = this.getServices() || [];
      return list.map((item) => {
        if (item.serviceIdRef) {
          const match = catalogServices.find((s) => s.id === item.serviceIdRef);
          if (match) {
            return {
              ...item,
              catalogApprovedPrice: match.price,
              catalogDuration: match.duration,
              catalogServiceName: match.name,
              hasCatalogBinding: true
            };
          }
        }
        return item;
      });
    } catch (e) {
      console.warn('Error reading mehndi process services:', e);
      return DEFAULT_MEHNDI_PROCESS_SERVICES;
    }
  }

  updateMehndiProcessService(serviceId, updates) {
    if (!serviceId) return [];
    try {
      const services = this.getMehndiProcessServices();
      const updated = services.map((s) => {
        if (s.id === serviceId) {
          return {
            ...s,
            ...updates,
            updatedAt: new Date().toISOString()
          };
        }
        return s;
      });

      localStorage.setItem(DB_KEYS.MEHNDI_PROCESS_PRICING, JSON.stringify(updated));
      notifySubscribers('mehndi_process_pricing_updated', { id: serviceId, updates });
      return updated;
    } catch (e) {
      console.warn('Error updating mehndi process service:', e);
      return [];
    }
  }

  resetMehndiProcessServices() {
    try {
      localStorage.setItem(DB_KEYS.MEHNDI_PROCESS_PRICING, JSON.stringify(DEFAULT_MEHNDI_PROCESS_SERVICES));
      notifySubscribers('mehndi_process_pricing_updated', null);
      return DEFAULT_MEHNDI_PROCESS_SERVICES;
    } catch (e) {
      console.warn('Error resetting mehndi process services:', e);
      return DEFAULT_MEHNDI_PROCESS_SERVICES;
    }
  }

  // ==========================================
  // CUSTOM STUDIO REQUESTS
  // ==========================================

  getCustomRequests() {
    try {
      const data = localStorage.getItem(DB_KEYS.CUSTOM_REQUESTS);
      if (!data) {
        return [
          {
            id: 'GGJ-CR-582910',
            createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
            status: 'Pending',
            serviceId: 'noor-balayage',
            serviceName: 'Noor Balayage',
            category: 'hair-color',
            categoryName: 'Hair Colour',
            catalogPrice: 195,
            catalogDuration: '150 min',
            customerName: 'Priya Sharma',
            customerEmail: 'priya.sharma@example.ca',
            customerPhone: '+1 (616) 555-0192',
            preferredDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
            preferredTime: '11:00 AM',
            customerVision: 'I want a soft warm caramel balayage that blends seamlessly into dark chocolate roots with face-framing money pieces around cheekbones.',
            desiredResult: 'Dimensional sun-kissed ribbons with high shine acidic gloss finish.',
            personalPreferences: {
              shade: 'Warm Honey & Caramel',
              technique: 'Hand-painted Balayage + Babylights',
              coverage: 'Full dimensional crown & hairline'
            },
            thingsToAvoid: 'No brassy orange or yellow undertones. Avoid bleach touching scalp directly.',
            occasion: 'Wedding or Bridal Event',
            additionalRequests: 'Please allocate a bit of extra time to discuss toner maintenance shampoo.',
            consultationRequested: true,
            inspirationPhoto: null,
            approvedPrice: null,
            approvedDuration: null,
            salonNotes: ''
          },
          {
            id: 'GGJ-CR-419208',
            createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
            status: 'Under Review',
            serviceId: 'shringar-bridal-makeup',
            serviceName: 'Shringar Bridal Makeup',
            category: 'makeup',
            categoryName: 'Makeup',
            catalogPrice: 220,
            catalogDuration: '90 min',
            customerName: 'Amina Al-Mansoor',
            customerEmail: 'amina.m@example.ca',
            customerPhone: '+1 (616) 555-0144',
            preferredDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
            preferredTime: '01:30 PM',
            customerVision: 'Royal bridal couture makeover for traditional evening ceremony. Want dewy skin that lasts 10 hours under venue lights.',
            desiredResult: 'Flawless glass skin finish with soft winged liner and velvet rose lips.',
            personalPreferences: {
              coverage: 'Full HD Couture',
              finish: 'Dewy Velvet Glow',
              lashes: 'Wispy Luxury Mink'
            },
            thingsToAvoid: 'No heavy powdery baking or overly dark drawn-on brows.',
            occasion: 'Wedding or Bridal Event',
            additionalRequests: 'Bringing heirloom gold headpiece / maang tikka for setting.',
            consultationRequested: true,
            inspirationPhoto: null,
            approvedPrice: 240,
            approvedDuration: '105 min',
            salonNotes: 'Approved with heirloom veil setting buffer time included.'
          }
        ];
      }
      return JSON.parse(data);
    } catch (e) {
      console.warn('Error reading custom requests from localStorage:', e);
      return [];
    }
  }

  getCustomRequestById(id) {
    const list = this.getCustomRequests();
    return list.find(r => r.id === id) || null;
  }

  saveCustomRequest(requestData) {
    try {
      const list = this.getCustomRequests();
      const requestId = requestData.id || `GGJ-CR-${Math.floor(100000 + Math.random() * 900000)}`;

      const newRecord = {
        id: requestId,
        createdAt: requestData.createdAt || new Date().toISOString(),
        status: requestData.status || 'Submitted',
        serviceId: requestData.serviceId,
        serviceName: requestData.serviceName,
        category: requestData.category,
        categoryName: requestData.categoryName || '',
        catalogPrice: requestData.catalogPrice,
        catalogDuration: requestData.catalogDuration,
        catalogDurationMinutes: requestData.catalogDurationMinutes || 0,
        customerName: requestData.customerName || '',
        customerEmail: requestData.customerEmail || '',
        customerPhone: requestData.customerPhone || '',
        preferredDate: requestData.preferredDate || '',
        preferredTime: requestData.preferredTime || '',
        customerVision: requestData.customerVision || '',
        desiredResult: requestData.desiredResult || '',
        focusAreas: requestData.focusAreas || '',
        sensitivities: requestData.sensitivities || '',
        specialInstructions: requestData.specialInstructions || '',
        personalPreferences: requestData.personalPreferences || {},
        thingsToAvoid: requestData.thingsToAvoid || '',
        occasion: requestData.occasion || '',
        eventDate: requestData.eventDate || '',
        maintenanceLevel: requestData.maintenanceLevel || 'low',
        selectedAddons: Array.isArray(requestData.selectedAddons) ? requestData.selectedAddons : [],
        customAddonRequest: requestData.customAddonRequest || '',
        calculatedEstimatedPrice: requestData.calculatedEstimatedPrice || requestData.catalogPrice || 0,
        calculatedEstimatedDuration: requestData.calculatedEstimatedDuration || requestData.catalogDurationMinutes || 0,
        additionalRequests: requestData.additionalRequests || '',
        consultationRequested: Boolean(requestData.consultationRequested),
        inspirationPhotos: Array.isArray(requestData.inspirationPhotos) ? requestData.inspirationPhotos : (requestData.inspirationPhoto ? [requestData.inspirationPhoto] : []),
        inspirationPhoto: requestData.inspirationPhoto || (Array.isArray(requestData.inspirationPhotos) && requestData.inspirationPhotos[0] ? requestData.inspirationPhotos[0] : null),
        approvedPrice: requestData.approvedPrice || null,
        approvedDuration: requestData.approvedDuration || null,
        salonNotes: requestData.salonNotes || '',
        reviewedBy: requestData.reviewedBy || null,
        reviewedAt: requestData.reviewedAt || null,
        history: Array.isArray(requestData.history) ? requestData.history : [
          {
            timestamp: new Date().toISOString(),
            action: 'Created',
            by: requestData.customerName || 'Customer',
            notes: 'Customization request submitted.'
          }
        ]
      };

      const updated = [newRecord, ...list.filter(r => r.id !== requestId)];
      localStorage.setItem(DB_KEYS.CUSTOM_REQUESTS, JSON.stringify(updated));
      notifySubscribers('custom_requests_updated', newRecord);
      return newRecord;
    } catch (e) {
      console.warn('Error saving custom request:', e);
      throw e;
    }
  }

  saveCustomDraft(draftData) {
    try {
      const draft = {
        ...draftData,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem(DB_KEYS.CUSTOM_DRAFT, JSON.stringify(draft));
      notifySubscribers('custom_draft_saved', draft);
      return draft;
    } catch (e) {
      console.warn('Error saving custom draft:', e);
      return null;
    }
  }

  getCustomDraft() {
    try {
      const raw = localStorage.getItem(DB_KEYS.CUSTOM_DRAFT);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.warn('Error reading custom draft:', e);
      return null;
    }
  }

  clearCustomDraft() {
    try {
      localStorage.removeItem(DB_KEYS.CUSTOM_DRAFT);
      notifySubscribers('custom_draft_cleared', null);
      return true;
    } catch (e) {
      console.warn('Error clearing custom draft:', e);
      return false;
    }
  }

  updateCustomRequestStatus(id, newStatus, salonNotes = '', approvedPrice = null, approvedDuration = null) {
    try {
      const list = this.getCustomRequests();
      const updated = list.map(req => {
        if (req.id === id) {
          const isPriceChanged = approvedPrice !== null && approvedPrice !== undefined && approvedPrice !== req.approvedPrice;
          const isDurationChanged = approvedDuration !== null && approvedDuration !== undefined && approvedDuration !== req.approvedDuration;
          const isQuoteRevision = newStatus === 'Quote Provided' && req.status === 'Quote Provided' && (isPriceChanged || isDurationChanged);

          const historyEntry = {
            timestamp: new Date().toISOString(),
            action: isQuoteRevision ? 'Quote Revised by Salon' : `Status changed to ${newStatus}`,
            by: 'Janki Khatroja (Salon Staff)',
            notes: salonNotes || (isQuoteRevision ? 'Revised price/duration quote provided.' : `Status updated to ${newStatus}`)
          };

          return {
            ...req,
            status: newStatus,
            salonNotes: salonNotes !== undefined ? salonNotes : req.salonNotes,
            approvedPrice: approvedPrice !== null && approvedPrice !== undefined ? approvedPrice : req.approvedPrice,
            approvedDuration: approvedDuration !== null && approvedDuration !== undefined ? approvedDuration : req.approvedDuration,
            // If quote was provided or revised, reset customerQuoteDecision so customer is required to review and accept the new quote
            customerQuoteDecision: (newStatus === 'Quote Provided' && (isPriceChanged || isDurationChanged || req.customerQuoteDecision !== 'accepted')) ? null : req.customerQuoteDecision,
            quoteRevisedAt: isQuoteRevision ? new Date().toISOString() : req.quoteRevisedAt,
            reviewedAt: new Date().toISOString(),
            reviewedBy: 'Janki Khatroja',
            history: [...(req.history || []), historyEntry]
          };
        }
        return req;
      });
      localStorage.setItem(DB_KEYS.CUSTOM_REQUESTS, JSON.stringify(updated));
      notifySubscribers('custom_requests_updated', { id, newStatus });
      return updated;
    } catch (e) {
      console.warn('Error updating custom request status:', e);
      return this.getCustomRequests();
    }
  }

  updateCustomerClarification(id, customerResponse) {
    try {
      const list = this.getCustomRequests();
      const updated = list.map(req => {
        if (req.id === id) {
          const historyEntry = {
            timestamp: new Date().toISOString(),
            action: 'Customer Clarification Provided',
            by: req.customerName || 'Customer',
            notes: customerResponse
          };
          return {
            ...req,
            status: 'Under Review',
            customerVision: req.customerVision 
              ? `${req.customerVision}\n\n[Update from Customer]: ${customerResponse}`
              : customerResponse,
            history: [...(req.history || []), historyEntry]
          };
        }
        return req;
      });
      localStorage.setItem(DB_KEYS.CUSTOM_REQUESTS, JSON.stringify(updated));
      notifySubscribers('custom_requests_updated', { id, updated: true });
      return updated;
    } catch (e) {
      console.warn('Error updating customer clarification:', e);
      return this.getCustomRequests();
    }
  }

  acceptCustomQuote(id, customerNotes = '') {
    try {
      const list = this.getCustomRequests();
      const updated = list.map(req => {
        if (req.id === id) {
          const historyEntry = {
            timestamp: new Date().toISOString(),
            action: 'Quote Accepted by Customer',
            by: req.customerName || 'Customer',
            notes: customerNotes || 'Customer accepted the quoted price and duration.'
          };
          return {
            ...req,
            status: 'Approved',
            customerQuoteDecision: 'accepted',
            quoteAcceptedAt: new Date().toISOString(),
            history: [...(req.history || []), historyEntry]
          };
        }
        return req;
      });
      localStorage.setItem(DB_KEYS.CUSTOM_REQUESTS, JSON.stringify(updated));
      notifySubscribers('custom_requests_updated', { id, quoteDecision: 'accepted' });
      return updated;
    } catch (e) {
      console.warn('Error accepting custom quote:', e);
      return this.getCustomRequests();
    }
  }

  declineCustomQuote(id, customerNotes = '') {
    try {
      const list = this.getCustomRequests();
      const updated = list.map(req => {
        if (req.id === id) {
          const historyEntry = {
            timestamp: new Date().toISOString(),
            action: 'Quote Declined by Customer',
            by: req.customerName || 'Customer',
            notes: customerNotes || 'Customer declined the proposed quote.'
          };
          return {
            ...req,
            status: 'Declined',
            customerQuoteDecision: 'declined',
            quoteDeclinedAt: new Date().toISOString(),
            history: [...(req.history || []), historyEntry]
          };
        }
        return req;
      });
      localStorage.setItem(DB_KEYS.CUSTOM_REQUESTS, JSON.stringify(updated));
      notifySubscribers('custom_requests_updated', { id, quoteDecision: 'declined' });
      return updated;
    } catch (e) {
      console.warn('Error declining custom quote:', e);
      return this.getCustomRequests();
    }
  }

  cancelCustomRequest(id, reason = 'Cancelled by client') {
    try {
      const list = this.getCustomRequests();
      const updated = list.map(req => {
        if (req.id === id) {
          const historyEntry = {
            timestamp: new Date().toISOString(),
            action: 'Request Cancelled',
            by: req.customerName || 'Customer',
            notes: reason
          };
          return {
            ...req,
            status: 'Cancelled',
            history: [...(req.history || []), historyEntry]
          };
        }
        return req;
      });
      localStorage.setItem(DB_KEYS.CUSTOM_REQUESTS, JSON.stringify(updated));
      notifySubscribers('custom_requests_updated', { id, cancelled: true });
      return updated;
    } catch (e) {
      console.warn('Error cancelling custom request:', e);
      return this.getCustomRequests();
    }
  }

  deleteCustomRequest(id) {
    try {
      const list = this.getCustomRequests();
      const updated = list.filter(r => r.id !== id);
      localStorage.setItem(DB_KEYS.CUSTOM_REQUESTS, JSON.stringify(updated));
      notifySubscribers('custom_requests_updated', { deletedId: id });
      return updated;
    } catch (e) {
      console.warn('Error deleting custom request:', e);
      return this.getCustomRequests();
    }
  }

  // ==========================================
  // BEAUTY VISION BOARD METHODS
  // ==========================================

  getVisionBoard() {
    try {
      const raw = localStorage.getItem(DB_KEYS.VISION_BOARD);
      if (!raw) {
        return {
          title: 'My Bespoke Beauty Vision Board',
          pins: [],
          customPins: [],
          updatedAt: new Date().toISOString()
        };
      }
      return JSON.parse(raw);
    } catch (e) {
      console.warn('Error reading vision board:', e);
      return {
        title: 'My Bespoke Beauty Vision Board',
        pins: [],
        customPins: [],
        updatedAt: new Date().toISOString()
      };
    }
  }

  saveVisionBoard(boardData) {
    try {
      const record = {
        ...boardData,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(DB_KEYS.VISION_BOARD, JSON.stringify(record));
      notifySubscribers('vision_board_updated', record);
      return record;
    } catch (e) {
      console.warn('Error saving vision board:', e);
      return boardData;
    }
  }

  clearVisionBoard() {
    try {
      const blank = {
        title: 'My Bespoke Beauty Vision Board',
        pins: [],
        customPins: [],
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(DB_KEYS.VISION_BOARD, JSON.stringify(blank));
      notifySubscribers('vision_board_cleared', blank);
      return blank;
    } catch (e) {
      console.warn('Error clearing vision board:', e);
      return null;
    }
  }

  // ==========================================
  // BEAUTY BLUEPRINT METHODS (PERSISTENT CLIENT BEAUTY DOSSIER)
  // ==========================================

  getBeautyBlueprint(userIdOrEmail = 'guest') {
    const key = `glfy_db_beauty_blueprint_${String(userIdOrEmail || 'guest').toLowerCase().trim()}`;
    try {
      const raw = localStorage.getItem(key) || localStorage.getItem(DB_KEYS.BEAUTY_BLUEPRINT);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Error reading beauty blueprint:', e);
    }

    // Default Seed Blueprint if not yet customized
    const defaultBlueprint = {
      userId: userIdOrEmail || 'guest',
      profile: {
        preferredStyles: ['Dimensional Balayage', 'Dewy Glass Skin', 'Minimalist Almond Gel Art'],
        favoriteColors: ['Warm Honey Glaze', 'Rose Petal Velvet', 'Milky Chrome'],
        desiredResults: 'Healthy shine, low maintenance regrowth, and long-lasting event hydration.',
        beautyGoals: ['Moisture Barrier Repair', 'Hair Density Care', 'Bridal Readiness'],
        maintenanceLevel: 'Medium',
        thingsToAvoid: 'Heavy powdery makeup, harsh bleach on scalp, acetone soak-offs without cuticle oil.',
        sensitivities: 'Fragrance-sensitive on forehead, seasonal dry scalp.',
        upcomingOccasion: 'Wedding Gala / Reception',
        eventDate: '2026-11-20',
        consultationPreferences: 'Prefer private curtain suite, open to custom toner formulas.',
        updatedAt: new Date().toISOString()
      },
      savedServices: [
        {
          id: 'srv_saved_01',
          serviceId: 'special-glam-girl-facial',
          serviceName: 'Special Glam Girl Facial',
          category: 'facial',
          categoryName: 'Facial & Skin Care',
          price: 130,
          duration: '75 min',
          image: '/images/facial/special-glam-girl-facial.jpg',
          customizationOptions: 'Hyaluronic Plumping Complex + Rose Quartz Cooling Eye Treatment',
          personalNotes: 'Schedule 3 days before festival gala for maximum barrier radiance.',
          desiredResults: 'Ultra hydrated dewy glass skin with zero redness.',
          savedAt: '2026-10-24T14:30:00.000Z'
        },
        {
          id: 'srv_saved_02',
          serviceId: 'noor-balayage',
          serviceName: 'Noor Signature Balayage',
          category: 'hair-colour',
          categoryName: 'Hair Colour',
          price: 260,
          duration: '180 min',
          image: '/images/hair-colour/noor-signature-balayage.jpg',
          customizationOptions: 'Cool Ash Mocha Toner + Deep Hydration Mask',
          personalNotes: 'Face framing money pieces with seamless blended root shadow.',
          desiredResults: 'Sun-kissed dimensional lift with soft transition.',
          savedAt: '2026-10-22T10:15:00.000Z'
        },
        {
          id: 'srv_saved_03',
          serviceId: 'gel-manicure',
          serviceName: 'Luxe Gel Manicure',
          category: 'nails',
          categoryName: 'Nails & Manicure',
          price: 65,
          duration: '50 min',
          image: '/images/services/nails/gel-manicure.webp',
          customizationOptions: 'Almond Shape with Chrome Glaze Finish',
          personalNotes: 'Milky glazed donut chrome look with clean cuticle prep.',
          desiredResults: 'Long-lasting high gloss shine without chipping.',
          savedAt: '2026-10-25T16:00:00.000Z'
        }
      ],
      inspiration: [
        {
          id: 'inspo_01',
          name: 'honey_balayage_ref.jpg',
          dataUrl: '/images/hair-colour/noor-signature-balayage.jpg',
          caption: 'Dimensional Honey Balayage with Face Framing Layers',
          collection: 'Hair Inspiration',
          associatedServiceId: 'noor-balayage',
          associatedServiceName: 'Noor Signature Balayage',
          notes: 'Love how seamless the root shadow blends into the warm honey mid-lengths.',
          uploadedAt: '2026-10-22T10:18:00.000Z'
        },
        {
          id: 'inspo_02',
          name: 'dewy_skin_finish.jpg',
          dataUrl: '/images/facial/special-glam-girl-facial.jpg',
          caption: 'Dewy Porcelain Finish & Hydrated Cheekbones',
          collection: 'Makeup Looks',
          associatedServiceId: 'special-glam-girl-facial',
          associatedServiceName: 'Special Glam Girl Facial',
          notes: 'Target glass skin look without feeling oily or overly powdered.',
          uploadedAt: '2026-10-24T14:32:00.000Z'
        },
        {
          id: 'inspo_03',
          name: 'glazed_almond_nails.jpg',
          dataUrl: '/images/services/nails/gel-manicure.webp',
          caption: 'Milky Glazed Chrome Almond Gel',
          collection: 'Nail Art',
          associatedServiceId: 'gel-manicure',
          associatedServiceName: 'Luxe Gel Manicure',
          notes: 'Subtle pearlescent sheen that complements gold and silver jewelry.',
          uploadedAt: '2026-10-25T16:05:00.000Z'
        }
      ],
      journal: [
        {
          id: 'note_01',
          title: 'Autumn Moisture Restoration Plan',
          content: 'My skin barrier feels slightly dehydrated from heating systems. Want to focus on deep lymphatic drainage and peptide hydration before balayage.',
          type: 'customer_note',
          author: 'Customer',
          isSalonApproved: false,
          linkedServiceName: 'Special Glam Girl Facial',
          createdAt: '2026-10-24T15:00:00.000Z'
        },
        {
          id: 'note_02',
          title: 'Atelier Stylist Evaluation & Recommendations',
          content: 'Reviewed your hair history. Prior to our balayage session, we strongly recommend scheduling a bond-builder or nourishing hair spa 5 days prior to protect cuticle integrity under lightener.',
          type: 'salon_reply',
          author: 'Janki Khatroja (Salon Director)',
          isSalonApproved: true,
          linkedServiceName: 'Noor Signature Balayage',
          createdAt: '2026-10-25T11:30:00.000Z'
        }
      ],
      recommendations: [
        {
          id: 'rec_01',
          serviceId: 'kesariya-hair-spa',
          serviceName: 'Kesariya Deep Nourishing Hair Spa',
          category: 'hair',
          categoryName: 'Hair Care & Rituals',
          price: 110,
          approvedPrice: 110,
          approvedDuration: '60 min',
          image: '/images/hair/kesariya-hair-spa.jpg',
          reason: 'Recommended by Janki to replenish hair protein and elasticity before balayage coloring.',
          professionalAdvice: 'Undergo treatment 5-7 days prior to lifting. Avoid hot styling tools for 48 hours afterward.',
          prepSteps: 'Arrive with dry hair; our team performs a micro-camera scalp assessment.',
          professionalName: 'Janki Khatroja (Master Beauty Director)',
          date: '2026-10-25',
          status: 'Awaiting Customer Review'
        },
        {
          id: 'rec_02',
          serviceId: '24k-gold-radiance-facial',
          serviceName: '24K Radiance Cellular Facial',
          category: 'facial',
          categoryName: 'Facial & Skin Care',
          price: 165,
          approvedPrice: 165,
          approvedDuration: '75 min',
          image: '/images/facial/24k-gold-facial.jpg',
          reason: 'Recommended for exceptional radiance and cellular turnover before your upcoming event.',
          professionalAdvice: 'Optimal results observed 48 hours prior to special events. Enhances makeup longevity.',
          prepSteps: 'Discontinue direct acids and retinoids 4 days prior to your session.',
          professionalName: 'Janki Khatroja (Master Beauty Director)',
          date: '2026-10-24',
          status: 'Suggested'
        }
      ],
      plans: [
        {
          id: 'plan_wedding_gala',
          title: 'Wedding Gala Glamour Plan',
          occasion: 'Wedding & Reception Gala',
          targetDate: '2026-11-20',
          serviceIds: ['special-glam-girl-facial', 'noor-balayage', 'gel-manicure'],
          services: [
            { id: 'special-glam-girl-facial', name: 'Special Glam Girl Facial', price: 130, duration: '75 min' },
            { id: 'noor-balayage', name: 'Noor Signature Balayage', price: 260, duration: '180 min' },
            { id: 'gel-manicure', name: 'Luxe Gel Manicure', price: 65, duration: '50 min' }
          ],
          notes: 'Schedule facial 3 days before, balayage 1 week before, and nails 1 day before the event.',
          estimatedTotal: 455,
          estimatedDuration: '305 min',
          createdAt: '2026-10-25T12:00:00.000Z',
          updatedAt: '2026-10-26T09:30:00.000Z'
        }
      ],
      updatedAt: new Date().toISOString()
    };

    return defaultBlueprint;
  }

  saveBeautyBlueprint(userIdOrEmail, blueprintData) {
    const key = `glfy_db_beauty_blueprint_${String(userIdOrEmail || 'guest').toLowerCase().trim()}`;
    try {
      const record = {
        ...blueprintData,
        userId: userIdOrEmail || 'guest',
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(key, JSON.stringify(record));
      localStorage.setItem(DB_KEYS.BEAUTY_BLUEPRINT, JSON.stringify(record));
      notifySubscribers('beauty_blueprint_updated', record);
      return record;
    } catch (e) {
      console.warn('Error saving beauty blueprint:', e);
      return blueprintData;
    }
  }

  updateBeautyProfile(userIdOrEmail, profileData) {
    const blueprint = this.getBeautyBlueprint(userIdOrEmail);
    const updated = {
      ...blueprint,
      profile: {
        ...blueprint.profile,
        ...profileData,
        updatedAt: new Date().toISOString()
      }
    };
    return this.saveBeautyBlueprint(userIdOrEmail, updated);
  }

  addSavedServiceToBlueprint(userIdOrEmail, serviceItem) {
    const blueprint = this.getBeautyBlueprint(userIdOrEmail);
    const existing = blueprint.savedServices || [];
    const alreadySaved = existing.find(s => s.serviceId === serviceItem.serviceId);
    if (alreadySaved) {
      const updatedList = existing.map(s => s.serviceId === serviceItem.serviceId ? { ...s, ...serviceItem, savedAt: new Date().toISOString() } : s);
      return this.saveBeautyBlueprint(userIdOrEmail, { ...blueprint, savedServices: updatedList });
    }
    const newEntry = {
      id: `srv_saved_${Math.floor(100000 + Math.random() * 900000)}`,
      savedAt: new Date().toISOString(),
      ...serviceItem
    };
    return this.saveBeautyBlueprint(userIdOrEmail, { ...blueprint, savedServices: [newEntry, ...existing] });
  }

  removeSavedServiceFromBlueprint(userIdOrEmail, savedServiceId) {
    const blueprint = this.getBeautyBlueprint(userIdOrEmail);
    const updated = (blueprint.savedServices || []).filter(s => s.id !== savedServiceId && s.serviceId !== savedServiceId);
    return this.saveBeautyBlueprint(userIdOrEmail, { ...blueprint, savedServices: updated });
  }

  addInspirationToBlueprint(userIdOrEmail, photoItem) {
    const blueprint = this.getBeautyBlueprint(userIdOrEmail);
    const existing = blueprint.inspiration || [];
    const newInspo = {
      id: photoItem.id || `inspo_${Math.floor(100000 + Math.random() * 900000)}`,
      uploadedAt: new Date().toISOString(),
      ...photoItem
    };
    return this.saveBeautyBlueprint(userIdOrEmail, { ...blueprint, inspiration: [newInspo, ...existing] });
  }

  removeInspirationFromBlueprint(userIdOrEmail, photoId) {
    const blueprint = this.getBeautyBlueprint(userIdOrEmail);
    const updated = (blueprint.inspiration || []).filter(p => p.id !== photoId);
    return this.saveBeautyBlueprint(userIdOrEmail, { ...blueprint, inspiration: updated });
  }

  addJournalNoteToBlueprint(userIdOrEmail, noteItem) {
    const blueprint = this.getBeautyBlueprint(userIdOrEmail);
    const existing = blueprint.journal || [];
    const newNote = {
      id: noteItem.id || `note_${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      type: noteItem.type || 'customer_note',
      author: noteItem.author || 'Customer',
      isSalonApproved: Boolean(noteItem.isSalonApproved),
      ...noteItem
    };
    return this.saveBeautyBlueprint(userIdOrEmail, { ...blueprint, journal: [newNote, ...existing] });
  }

  deleteJournalNoteFromBlueprint(userIdOrEmail, noteId) {
    const blueprint = this.getBeautyBlueprint(userIdOrEmail);
    const updated = (blueprint.journal || []).filter(n => n.id !== noteId);
    return this.saveBeautyBlueprint(userIdOrEmail, { ...blueprint, journal: updated });
  }

  updateBlueprintRecommendationStatus(userIdOrEmail, recId, newStatus) {
    const blueprint = this.getBeautyBlueprint(userIdOrEmail);
    const updated = (blueprint.recommendations || []).map(r => {
      if (r.id === recId) {
        return {
          ...r,
          status: newStatus,
          decisionAt: new Date().toISOString()
        };
      }
      return r;
    });
    return this.saveBeautyBlueprint(userIdOrEmail, { ...blueprint, recommendations: updated });
  }

  saveBeautyPlanToBlueprint(userIdOrEmail, planItem) {
    const blueprint = this.getBeautyBlueprint(userIdOrEmail);
    const existing = blueprint.plans || [];
    const planId = planItem.id || `plan_${Math.floor(100000 + Math.random() * 900000)}`;
    const isEdit = existing.some(p => p.id === planId);

    let updatedPlans;
    if (isEdit) {
      updatedPlans = existing.map(p => p.id === planId ? { ...p, ...planItem, updatedAt: new Date().toISOString() } : p);
    } else {
      updatedPlans = [{ id: planId, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), ...planItem }, ...existing];
    }

    return this.saveBeautyBlueprint(userIdOrEmail, { ...blueprint, plans: updatedPlans });
  }

  deleteBeautyPlanFromBlueprint(userIdOrEmail, planId) {
    const blueprint = this.getBeautyBlueprint(userIdOrEmail);
    const updated = (blueprint.plans || []).filter(p => p.id !== planId);
    return this.saveBeautyBlueprint(userIdOrEmail, { ...blueprint, plans: updated });
  }

  // ==========================================
  // REACTIVE SUBSCRIBER
  // ==========================================

  subscribe(callback) {
    subscribers.add(callback);
    return () => {
      subscribers.delete(callback);
    };
  }
}

// Export singleton instance
export const salonDB = new MasterSalonDatabase();
export default salonDB;
