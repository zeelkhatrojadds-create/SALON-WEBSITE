// The Skin Atelier Constants & Clinical Aesthetic Configuration
// GLAM GIRL BY JANKI — Ottawa Luxury Beauty Sanctuary
// Palette: Deep Black (#10110F), Forest Green (#263D2B), Olive (#465640), Sage (#A8B5A0), Warm Cream (#F7F4ED)
// Strictly non-medical, educational & aesthetic guidance only.

export const SKIN_CARE_GOALS = [
  {
    id: 'deep-cleansing',
    label: 'Deep Pore Cleansing & Clarifying',
    description: 'Clear trapped sebum, blackheads, and environmental buildup for refined, clean pores.'
  },
  {
    id: 'intensive-hydration',
    label: 'Intensive Hydration & Barrier Nourishment',
    description: 'Quench dehydrated skin, restore lipid barrier balance, and soothe tight, dry textures.'
  },
  {
    id: 'radiance-brightening',
    label: 'Luminous Glow & Radiance Brightening',
    description: 'Target dullness, hyperpigmentation, and sun fatigue with active botanical antioxidants.'
  },
  {
    id: 'sensitive-calming',
    label: 'Sensitive Skin Soothing & Redness Relief',
    description: 'Gentle, anti-inflammatory Ayurvedic botanicals formulated to calm and protect reactive skin.'
  },
  {
    id: 'firming-anti-aging',
    label: 'Tightening & Anti-Aging Cellular Vitality',
    description: 'Stimulate micro-circulation, smooth fine lines, and enhance skin suppleness.'
  },
  {
    id: 'express-refresh',
    label: 'Quick Radiance Boost & Exfoliation',
    description: 'Efficient 25 to 30-minute polishing facial for immediate glass-skin luminosity.'
  }
];

export const DISCLOSED_SKIN_PREFERENCES = [
  { id: 'normal-balanced', label: 'Normal / Balanced' },
  { id: 'dry-dehydrated', label: 'Dry / Dehydrated' },
  { id: 'oily-congested', label: 'Oily / Congested' },
  { id: 'combination', label: 'Combination (Oily T-Zone)' },
  { id: 'sensitive-reactive', label: 'Sensitive / Easily Flushed' },
  { id: 'acne-prone', label: 'Acne-Prone / Breakout-Prone' },
  { id: 'mature-firmness', label: 'Mature / Loss of Firmness' }
];

export const COMMON_PRODUCT_SENSITIVITIES = [
  'None Known',
  'Fragrance / Essential Oils',
  'Salicylic Acid (BHA)',
  'Glycolic Acid (AHA)',
  'Nut / Almond Oils',
  'Latex / Rubber Masks',
  'Aloe Vera',
  'Sulfates'
];

export const CONSULTATION_OCCASIONS = [
  'Routine Skincare Maintenance',
  'Bridal & Wedding Celebrations',
  'Engagement / Sangeet / Pre-Wedding',
  'Festive Gala (Diwali, Eid, Holidays)',
  'Milestone Event & Photoshoot',
  'Post-Travel Skin Recovery',
  'First-Time Facial Experience'
];

export const APPROVED_CUSTOMIZATION_OPTIONS = {
  careFocus: [
    {
      id: 'focus-hydration',
      name: 'Hydration-Focused Care',
      tagline: 'Triple Hyaluronic Plumping Complex',
      description: 'Multi-molecular hyaluronic infusion delivering deep cellular hydration and lasting barrier dewiness.',
      compatibleWith: ['all']
    },
    {
      id: 'focus-sensitive',
      name: 'Gentle / Sensitive-Skin Option',
      tagline: 'Soothing Chamomile & Organic Aloe Elixir',
      description: 'Fragrance-free, hypoallergenic botanical formulation designed to soothe redness and fortify reactive skin barriers.',
      compatibleWith: ['all']
    },
    {
      id: 'focus-brightening',
      name: 'Brightening-Focused Treatment',
      tagline: 'Active Vitamin C & Licorice Luminous Complex',
      description: 'Antioxidant-concentrated botanical peptides targeting sunspots, uneven tone, and dull complexions.',
      compatibleWith: ['express-facial', 'advanced-brightening-facial', 'fruit-facial', 'oxy-glow', 'special-glam-girl-facial', 'mini-facial-exfoliation']
    },
    {
      id: 'focus-antiaging',
      name: 'Cellular Vitality & Firming',
      tagline: 'Colloidal Gold Peptides & Facial Acupressure',
      description: 'Micro-circulation stimulation and peptide tightening to smooth expression lines and restore bounce.',
      compatibleWith: ['golden-glow', 'diamond-dust', 'special-glam-girl-facial', 'herbal-facial']
    }
  ],
  relaxationPreferences: [
    {
      id: 'relax-massage',
      name: 'Gentle Lymphatic Face & Neck Acupressure',
      description: 'Rhythmic, gentle drainage movements along jawline and cheek contours to relieve facial tension.'
    },
    {
      id: 'relax-cooling-roller',
      name: 'Cooling Rose Quartz Crystal Contouring',
      description: 'Refrigerated rose quartz stone rollers applied post-mask to soothe and depuff delicate facial zones.'
    },
    {
      id: 'relax-silent',
      name: 'Silent Treatment / Quiet Meditation',
      description: 'Quiet appointment atmosphere with minimal conversation and serene ambient music for deep tranquility.'
    }
  ],
  approvedAddons: [
    {
      id: 'addon-rose-quartz-eye',
      name: 'Rose Quartz Cooling Eye Treatment',
      price: 18,
      duration: '10 min',
      description: 'Chilled crystal lymphatic contouring to diminish peri-orbital puffiness and eye strain.',
      compatibleWith: ['all']
    },
    {
      id: 'addon-collagen-lip',
      name: 'Collagen Lip Plump & Exfoliation',
      price: 12,
      duration: '5 min',
      description: 'Gentle organic brown sugar scrub followed by warm peptide-infused collagen lip therapy.',
      compatibleWith: ['all']
    },
    {
      id: 'addon-high-freq',
      name: 'High-Frequency Clarifying Wand',
      price: 22,
      duration: '10 min',
      description: 'Sanitizing thermal ozone current to purify blemish-causing bacteria in congested zones.',
      compatibleWith: ['deep-cleansing-facial', 'herbal-facial', 'mini-facial-exfoliation']
    },
    {
      id: 'addon-gold-leaf',
      name: 'Pure Gold Leaf Facial Accent',
      price: 30,
      duration: '15 min',
      description: 'Targeted botanical gold foil applied to cheekbones and temples for luminous radiance.',
      compatibleWith: ['golden-glow', 'special-glam-girl-facial', 'diamond-dust', 'oxy-glow']
    }
  ]
};

export const MEDICAL_SAFETY_DISCLAIMER = {
  title: 'Professional Aesthetic Care & Non-Diagnostic Guidance',
  content: 'GLAM GIRL BY JANKI provides professional cosmetic, aesthetic, and relaxation skincare rituals in Ottawa. Our treatments, personalized consultations, and aesthetician recommendations are designed exclusively for skin beautification, hydration, and relaxation. We do not diagnose, treat, or cure dermatological or medical conditions, nor do our services guarantee medical outcomes. Customers experiencing persistent, severe, painful, or concerning skin symptoms—such as cystic acne, dermatitis, severe eczema, rosacea flare-ups, or suspicious lesions—are strongly encouraged to consult a licensed medical dermatologist or primary healthcare professional prior to booking.'
};

export const SKIN_ATELIER_FAQS = [
  {
    q: 'How do I choose the right facial ritual for my skin type?',
    a: 'Every skin ritual at GLAM GIRL BY JANKI begins with an in-depth visual skin assessment by certified aesthetician Janki Khatroja. You can also book our complimentary 15-minute Skin Consultation ($0 CAD) or submit our online Skin Consultation form to disclose your skincare goals, sensitivities, and occasion ahead of time.'
  },
  {
    q: 'What is the difference between an Express Facial and a Deep Cleansing Facial?',
    a: 'The Express Facial ($45 CAD, 30 min) is a quick pick-me-up featuring cleansing, steam, light massage, and glow hydration—ideal for busy schedules. The Deep Cleansing Facial ($80 CAD, 60 min) is an intensive pore-purifying protocol with gentle blackhead extractions, clay detox mask, and high-frequency antibacterial therapy.'
  },
  {
    q: 'Are your facial products safe for sensitive or reactive skin?',
    a: 'Yes. We utilize 100% sanitized tools, hypoallergenic botanicals, fragrance-free options, and calming Ayurvedic extracts like neem, tulsi, and aloe vera. Please inform us of any known sensitivities or allergies during consultation.'
  },
  {
    q: 'Can I customize my facial treatment with add-ons?',
    a: 'Yes! Eligible treatments can be personalized with hydration-focused serums, sensitive-skin elixirs, brightening botanicals, relaxation preferences, and approved add-ons such as rose quartz eye treatments or collagen lip care. Custom requests are noted in your booking summary, and final price and duration are subject to salon approval.'
  },
  {
    q: 'What aftercare steps should I follow after my facial?',
    a: 'Keep skin hydrated, drink plenty of water, and apply broad-spectrum SPF 30+ daily. Avoid wearing heavy foundation or makeup for 24 hours to allow active serums to penetrate. Avoid hot saunas, swimming in chlorinated pools, and harsh scrubs for 48 hours.'
  }
];

