// Master Default Aftercare Instructions & Approved Stylist Products
// GLAM GIRL BY JANKI - Luxury Salon Brand (Ottawa, ON)

export const DEFAULT_AFTERCARE_CATEGORIES = [
  {
    id: 'hair-treatments',
    name: 'Hair Treatment',
    displayName: 'Hair Spas & Intensive Repair Treatments',
    description: 'Post-treatment protocols to preserve deep hydration, cuticle seal, and structural hair health.',
    applicableKeywords: ['treatment', 'spa', 'repair', 'conditioning', 'keratin', 'scalp', 'kesariya', 'noor-hair'],
    instructions: [
      {
        id: 'ht-1',
        title: 'Recommended Washing Schedule',
        description: 'Allow the intensive restorative botanicals to fully bind to your hair cortex. Avoid shampooing for the first 48 hours. When washing, use lukewarm or cool water rather than hot water.',
        icon: 'Clock',
        timePeriod: 'First 48 Hours'
      },
      {
        id: 'ht-2',
        title: 'Heat Protection Protocol',
        description: 'Minimize blow dryers, flat irons, and curling wands. When thermal styling is essential, always mist an approved heat protectant barrier (up to 230°C / 450°F) from mid-lengths to ends.',
        icon: 'Shield',
        timePeriod: 'Day 3 Onwards'
      },
      {
        id: 'ht-3',
        title: 'Hydration & Hair Maintenance',
        description: 'Sleep on a mulberry silk pillowcase to prevent friction breakage. Brush gently with a wide-tooth detangling comb starting at the ends, working upward toward the scalp.',
        icon: 'Sparkles',
        timePeriod: 'Daily Routine'
      },
      {
        id: 'ht-4',
        title: 'Weekly Deep Moisture Refresh',
        description: 'Apply an intensive nourishing hair masque once weekly for 15 minutes under a warm towel to extend the glass-like salon softness for up to 6 weeks.',
        icon: 'Heart',
        timePeriod: 'Weekly Ritual'
      }
    ],
    products: [
      {
        id: 'prod-ht-1',
        name: "Luxe Botanical Keratin Hair Elixir",
        category: 'Hair Treatment & Repair',
        image: '/images/products/keratin-hair-serum.jpg',
        description: 'Ultra-lightweight restorative oil infused with cold-pressed Moroccan argan, plant keratin, and amber essence.',
        whyStylistRecommends: 'Janki Khatroja recommends this elixir to lock in the deep moisture infused during your salon ritual, providing 24-hour humidity resistance without weighing down strands.',
        howToUse: 'Dispense 2 to 3 drops between palms and gently distribute through damp or dry ends. Do not rinse.',
        priceCad: 48.00,
        purchaseUrl: '',
        approved: true
      },
      {
        id: 'prod-ht-2',
        name: 'Kesariya Intensive Nourishing Hair Masque',
        category: 'Weekly Hair Maintenance',
        image: '/images/products/color-lock-mask.webp',
        description: 'Deep conditioning treatment enriched with amino peptides and saffron extract for compromised strands.',
        whyStylistRecommends: 'Formulated to replenish vital proteins lost to environmental stress, keeping hair supple and visibly silky between salon visits.',
        howToUse: 'After gentle cleansing, smooth generously through towel-dried mid-lengths. Leave on for 10-15 minutes before rinsing with cool water.',
        priceCad: 52.00,
        purchaseUrl: '',
        approved: true
      }
    ]
  },
  {
    id: 'facial',
    name: 'Facial Treatment',
    displayName: 'Rejuvenating Facials & Skin Rituals',
    description: 'Post-facial guidelines to protect the skin barrier, sustain your radiant glow, and maximize product efficacy.',
    applicableKeywords: ['facial', 'glow', 'brightening', 'cleansing', 'diamond', 'fruit', 'herbal', 'oxy'],
    instructions: [
      {
        id: 'fc-1',
        title: 'Gentle Cleansing Only',
        description: 'Do not wash your face with harsh soaps or foaming cleansers tonight. Tomorrow morning, cleanse only with cool water or a gentle, non-stripping botanical milk cleanser.',
        icon: 'Droplets',
        timePeriod: 'First 24 Hours'
      },
      {
        id: 'fc-2',
        title: 'Barrier Moisturizing & Hydration',
        description: 'Drink 2 to 3 liters of water to optimize cellular recovery. Keep skin generously hydrated with a fragrance-free ceramide moisturizer or hyaluronic acid serum morning and evening.',
        icon: 'Heart',
        timePeriod: 'Daily for 7 Days'
      },
      {
        id: 'fc-3',
        title: 'Broad-Spectrum Mineral Sunscreen',
        description: 'Freshly exfoliated skin is particularly sensitive to ultraviolet radiation. Apply SPF 50 broad-spectrum sunscreen daily before stepping outdoors, even on overcast days.',
        icon: 'Sun',
        timePeriod: 'Every Morning'
      },
      {
        id: 'fc-4',
        title: 'Temporary Avoidance of Irritants',
        description: 'Avoid retinoids, AHA/BHA chemical peels, physical scrubs, and heavy foundation. Refrain from saunas, steam rooms, and intense cardiovascular exercise that induces heavy sweating.',
        icon: 'ShieldAlert',
        timePeriod: 'Next 48 to 72 Hours'
      }
    ],
    products: [
      {
        id: 'prod-fc-1',
        name: 'Radiance Botanical Soothing Cleanser & SPF 50 Duo',
        category: 'Facial Aftercare & Sun Defense',
        image: '/images/products/botanical-cleanser-spf.jpg',
        description: 'Gentle calendula and green tea cleansing milk coupled with sheer broad-spectrum mineral zinc protection.',
        whyStylistRecommends: 'Essential to shield newly resurfaced dermal layers without clogging pores, sealing in the radiant luminance achieved in our treatment room.',
        howToUse: 'Massage 1 pump of cleansing milk with tepid water and pat dry. In the morning, follow with a nickel-sized amount of SPF 50 over face and décolletage.',
        priceCad: 56.00,
        purchaseUrl: '',
        approved: true
      }
    ]
  },
  {
    id: 'hair-color',
    name: 'Hair Coloring',
    displayName: 'Balayage, Highlights & Dimensional Colour',
    description: 'Specialized color-maintenance regimen designed to lock in tonal richness, prevent brassiness, and prolong vibrant shine.',
    applicableKeywords: ['color', 'colour', 'balayage', 'highlight', 'touch-up', 'kesariya-hair-colour', 'noor-balayage'],
    instructions: [
      {
        id: 'hc-1',
        title: 'Color-Safe Shampoo Protocol',
        description: 'Wait at least 72 hours before your first post-color wash to allow the hair cuticle to fully contract and trap the color molecules. Always use 100% sulfate-free, color-safe cleanser.',
        icon: 'Clock',
        timePeriod: 'First 72 Hours'
      },
      {
        id: 'hc-2',
        title: 'Conditioner & Temperature Control',
        description: 'Always rinse your hair with cool water. Cool water seals the outer cuticle layer, preventing premature pigment leaching and delivering unmatched reflective shine.',
        icon: 'ThermometerSnowflake',
        timePeriod: 'Every Wash'
      },
      {
        id: 'hc-3',
        title: 'Color-Maintenance Tips & Toning',
        description: 'If you received blonde highlights or balayage, integrate a gentle violet or pearl toning treatment once every 10 days to neutralize unwanted warm or brassy undertones.',
        icon: 'Sparkles',
        timePeriod: 'Every 10-14 Days'
      },
      {
        id: 'hc-4',
        title: 'Chlorine & UV Protection',
        description: 'Wear a protective hat under direct midday sunlight. Coat hair with clean water and leave-in conditioner before swimming in chlorinated pools or saltwater.',
        icon: 'Sun',
        timePeriod: 'Ongoing Maintenance'
      }
    ],
    products: [
      {
        id: 'prod-hc-1',
        name: 'Color-Lock Silk Wash & Gloss Mask',
        category: 'Hair Coloring Maintenance',
        image: '/images/products/color-lock-mask.webp',
        description: 'Sulfate-free lipid-replenishing wash and gloss masque tailored for balayage and single-process color.',
        whyStylistRecommends: 'Prevents color fading by up to 80% while reinforcing hair fiber integrity after highlighting or toning.',
        howToUse: 'Lather gently onto wet roots, rinse thoroughly with cool water, and apply the gloss masque from mid-lengths down for 5 minutes.',
        priceCad: 62.00,
        purchaseUrl: '',
        approved: true
      },
      {
        id: 'prod-hc-2',
        name: 'Luxe Botanical Keratin Hair Elixir',
        category: 'Color Shine & Thermal Shield',
        image: '/images/products/keratin-hair-serum.jpg',
        description: 'Reflective hair polish that smooths lifted cuticles and illuminates multidimensional color tones.',
        whyStylistRecommends: 'Adds mirror-like gloss and shields against thermal fading when heat styling.',
        howToUse: 'Apply 1-2 drops to dry styled hair as a final luminous veil.',
        priceCad: 48.00,
        purchaseUrl: '',
        approved: true
      }
    ]
  },
  {
    id: 'waxing',
    name: 'Waxing',
    displayName: 'Silky Smooth Hair Removal',
    description: 'Post-depilatory instructions to soothe follicles, prevent ingrown hairs, and maintain ultra-smooth, calm skin.',
    applicableKeywords: ['wax', 'waxing', 'bikini', 'legs', 'arms', 'underarms', 'brazilian'],
    instructions: [
      {
        id: 'wx-1',
        title: 'Avoid Excessive Heat & Sweating',
        description: 'Pores and hair follicles remain open and sensitive after waxing. Strictly avoid hot showers, saunas, hot tubs, sunbathing, and strenuous workouts.',
        icon: 'Flame',
        timePeriod: 'First 24 to 48 Hours'
      },
      {
        id: 'wx-2',
        title: 'Friction & Clothing Care',
        description: 'Wear loose-fitting, breathable cotton clothing. Avoid synthetic fabrics, tight leggings, or tight waistbands that cause chafing or trap perspiration against freshly waxed skin.',
        icon: 'Shield',
        timePeriod: 'First 48 Hours'
      },
      {
        id: 'wx-3',
        title: 'Harsh Products & Fragrance Avoidance',
        description: 'Do not apply scented lotions, chemical deodorants, self-tanners, or alcohol-based sprays on treated areas. Use only pure organic aloe vera or gentle soothing balms.',
        icon: 'Droplets',
        timePeriod: 'First 48 Hours'
      },
      {
        id: 'wx-4',
        title: 'Gentle Exfoliation (Ingrown Prevention)',
        description: 'Do NOT exfoliate immediately. After 3 full days, begin gently exfoliating the area 2-3 times per week with a soft loofah or gentle scrub to guide new hair growth smoothly past the surface.',
        icon: 'Sparkles',
        timePeriod: 'Day 4 Onwards'
      }
    ],
    products: [
      {
        id: 'prod-wx-1',
        name: 'Organic Aloe & Chamomile Calming Post-Wax Balm',
        category: 'Waxing Aftercare & Soothing',
        image: '/images/products/post-wax-calming-balm.webp',
        description: 'Ultra-gentle soothing formula with 99% pure organic cold-pressed aloe, chamomile flower extract, and provitamin B5.',
        whyStylistRecommends: 'Instantly cools follicle erythema, eliminates redness, and keeps skin soft and completely bump-free.',
        howToUse: 'Apply a thin layer over clean, dry waxed areas twice daily until skin is calm and hydrated.',
        priceCad: 34.00,
        purchaseUrl: '',
        approved: true
      }
    ]
  },
  {
    id: 'makeup',
    name: 'Bridal Makeup',
    displayName: 'Bridal & Red-Carpet Makeovers',
    description: 'End-of-celebration removal ritual to dissolve high-definition makeup, cleanse lashes gently, and replenish moisture.',
    applicableKeywords: ['makeup', 'bridal', 'makeover', 'shringar', 'wedding', 'glam'],
    instructions: [
      {
        id: 'mk-1',
        title: 'Gentle Two-Phase Makeup Removal',
        description: 'Never sleep in your event makeup or rub aggressively. Begin with a nourishing cleansing balm or oil to dissolve waterproof foundation and bridal setting sprays gently.',
        icon: 'Droplets',
        timePeriod: 'Night of the Event'
      },
      {
        id: 'mk-2',
        title: 'Careful Lash & Eye Contour Cleansing',
        description: 'Hold a cotton pad soaked in micellar water or makeup remover over closed eyes for 20 seconds to dissolve lash adhesive and waterproof liner without pulling on delicate skin.',
        icon: 'Eye',
        timePeriod: 'Evening Routine'
      },
      {
        id: 'mk-3',
        title: 'Intensive Skin Hydration Ritual',
        description: 'After long-wear makeup, skin craves hydration. Apply a rich hyaluronic serum followed by a restorative night cream or overnight sleeping mask to reset your dewy complexion.',
        icon: 'Sparkles',
        timePeriod: 'Overnight Recovery'
      },
      {
        id: 'mk-4',
        title: 'Post-Bridal Skin Reset',
        description: 'Give skin a 24-hour breather free of heavy makeup. Mist frequently with botanical floral water and drink plenty of water to eliminate metabolic fatigue.',
        icon: 'Heart',
        timePeriod: 'Day After Event'
      }
    ],
    products: [
      {
        id: 'prod-mk-1',
        name: 'Hydrating Rose Camellia Cleansing Balm & Skin Mist',
        category: 'Bridal Makeup Removal & Hydration',
        image: '/images/products/cleansing-balm-mist.webp',
        description: 'Melt-away cleansing butter crafted with Japanese camellia oil, Damask rose water, and squalane.',
        whyStylistRecommends: 'Effortlessly dissolves stubborn waterproof mascara, lash glue, and long-wear pigments without any pulling or redness.',
        howToUse: 'Warm an almond-sized amount between dry fingers, massage gently over face in circular motions, and wipe away with a warm damp cloth.',
        priceCad: 44.00,
        purchaseUrl: '',
        approved: true
      }
    ]
  },
  {
    id: 'nails',
    name: 'Nail Treatment',
    displayName: 'Luxury Manicures, Pedicures & Nail Enhancements',
    description: 'Protective routines to guard against chips, nourish nail matrices, and sustain high-gloss longevity.',
    applicableKeywords: ['nail', 'nails', 'manicure', 'pedicure', 'gel', 'acrylic', 'polish'],
    instructions: [
      {
        id: 'nl-1',
        title: 'Cuticle Care & Deep Conditioning',
        description: 'Massage pure jojoba or botanical cuticle oil into the nail bed and surrounding cuticles twice daily. Hydrated cuticles prevent hangnails and keep gel edges securely bonded.',
        icon: 'Heart',
        timePeriod: 'Twice Daily'
      },
      {
        id: 'nl-2',
        title: 'Hand & Foot Moisturizing',
        description: 'Apply a rich emollient hand cream after every hand wash. Before sleeping, apply an intensive balm to hands and feet to lock in supple smoothness.',
        icon: 'Sparkles',
        timePeriod: 'Daily Routine'
      },
      {
        id: 'nl-3',
        title: 'Nail Protection & Household Tasks',
        description: 'Always wear protective rubber gloves when washing dishes, cleaning with household detergents, or gardening. Harsh surfactants break down topcoats and dehydrate natural nails.',
        icon: 'Shield',
        timePeriod: 'Whenever Cleaning'
      },
      {
        id: 'nl-4',
        title: 'Never Peel or Pry Gel Enhancements',
        description: 'If you notice slight lifting, never peel or pick at the gel or acrylic, as this removes layers of your natural nail plate. Visit Janki for professional, damage-free removal.',
        icon: 'AlertCircle',
        timePeriod: 'Ongoing Rule'
      }
    ],
    products: [
      {
        id: 'prod-nl-1',
        name: 'Fortifying Botanical Cuticle Elixir',
        category: 'Nail & Cuticle Conditioning',
        image: '/images/products/cuticle-nail-elixir.webp',
        description: 'Pure cold-pressed golden jojoba, sweet almond oil, and vitamin E fortified with calming lavender botanicals.',
        whyStylistRecommends: 'Recommended by Janki to stimulate healthy nail growth and preserve high-gloss salon shine for weeks.',
        howToUse: 'Brush one drop onto each cuticle base morning and night. Massage gently in circular motions until absorbed.',
        priceCad: 26.00,
        purchaseUrl: '',
        approved: true
      }
    ]
  },
  {
    id: 'threading',
    name: 'Threading',
    displayName: 'Precision Eyebrow & Facial Threading',
    description: 'Calming post-threading care to prevent temporary irritation and maintain defined contours.',
    applicableKeywords: ['threading', 'eyebrow', 'sitara', 'upper-lip', 'chin', 'forehead'],
    instructions: [
      {
        id: 'th-1',
        title: 'Hands Off Treated Areas',
        description: 'Avoid touching freshly threaded eyebrows or facial zones with unwashed hands to prevent bacteria from entering empty follicles.',
        icon: 'Shield',
        timePeriod: 'First 12 Hours'
      },
      {
        id: 'th-2',
        title: 'Soothing Pure Rosewater or Aloe',
        description: 'If you experience slight pinkness, apply chilled organic rosewater or pure aloe vera gel. Avoid alcohol-based toners or scented creams.',
        icon: 'Droplets',
        timePeriod: 'First 24 Hours'
      },
      {
        id: 'th-3',
        title: 'Avoid Sunbeds & Direct Sun Heat',
        description: 'Do not expose freshly threaded facial skin to direct harsh sunlight or tanning beds on the day of your service.',
        icon: 'Sun',
        timePeriod: 'Day of Service'
      }
    ],
    products: [
      {
        id: 'prod-th-1',
        name: 'Organic Aloe & Chamomile Calming Post-Wax Balm',
        category: 'Sensitive Skin Soothing',
        image: '/images/products/post-wax-calming-balm.webp',
        description: 'Instant calming botanical gel suitable for freshly threaded eyebrows, upper lip, and delicate facial areas.',
        whyStylistRecommends: 'Soothes stinging and prevents tiny bumps on delicate skin.',
        howToUse: 'Dab a pinpoint amount onto threaded zones after service.',
        priceCad: 34.00,
        purchaseUrl: '',
        approved: true
      }
    ]
  }
];

// Helper to determine category from service name / category / slug
export function detectAftercareCategory(serviceName = '', serviceCategory = '', serviceSlug = '') {
  const query = `${serviceName} ${serviceCategory} ${serviceSlug}`.toLowerCase();

  for (const cat of DEFAULT_AFTERCARE_CATEGORIES) {
    if (cat.id === serviceCategory?.toLowerCase()) return cat.id;
    for (const kw of cat.applicableKeywords) {
      if (query.includes(kw)) {
        return cat.id;
      }
    }
  }

  // Fallbacks
  if (query.includes('hair') && (query.includes('color') || query.includes('colour') || query.includes('balayage'))) {
    return 'hair-color';
  }
  if (query.includes('hair')) {
    return 'hair-treatments';
  }
  if (query.includes('nail') || query.includes('pedi') || query.includes('mani')) {
    return 'nails';
  }
  if (query.includes('wax')) {
    return 'waxing';
  }
  if (query.includes('face') || query.includes('facial') || query.includes('skin')) {
    return 'facial';
  }
  if (query.includes('makeup') || query.includes('bride') || query.includes('bridal')) {
    return 'makeup';
  }

  return 'hair-treatments';
}
