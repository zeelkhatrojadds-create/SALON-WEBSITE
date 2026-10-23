/**
 * GLAM GIRL BY JANKI — Treatment Customizations & Add-ons Engine
 * Single Source of Truth for customizable treatment options, mutually exclusive tiers,
 * eligible add-ons, pricing adjustments, and duration increments.
 */

export const CUSTOMIZATION_PROFILES = {
  // =========================================================================
  // 1. FACIAL & SKIN CARE
  // =========================================================================
  facial: {
    categoryName: 'Facial & Skin Care',
    optionsGroup: {
      id: 'facial-serum',
      title: 'Targeted Serum Infusion',
      subtitle: 'Select one concentrated serum formula (mutually exclusive)',
      required: true,
      options: [
        {
          id: 'serum-botanical',
          name: 'Pure Botanical Herbal Elixir',
          description: 'Soothing chamomile, rosehip & organic aloe vera concentrate.',
          priceAdjustment: 0,
          durationMinutes: 0,
          isDefault: true
        },
        {
          id: 'serum-hyaluronic',
          name: 'Triple Hyaluronic Plumping Complex',
          description: 'Deep cellular hydration, barrier restoration & moisture-lock peptide.',
          priceAdjustment: 20,
          durationMinutes: 10
        },
        {
          id: 'serum-24k-gold',
          name: '24K Colloidal Gold Cellular Radiance',
          description: 'Illuminating gold peptides with micro-circulation and antioxidant rejuvenation.',
          priceAdjustment: 35,
          durationMinutes: 15
        }
      ]
    },
    addons: [
      {
        id: 'addon-rose-quartz-eye',
        name: 'Rose Quartz Cooling Eye Treatment',
        description: 'Lymphatic eye contour massage using refrigerated crystal rollers to diminish puffiness.',
        price: 18,
        durationMinutes: 10,
        active: true
      },
      {
        id: 'addon-collagen-lip',
        name: 'Collagen Lip Plump & Exfoliation',
        description: 'Organic raw sugar scrub followed by warm peptide-infused lip collagen pad.',
        price: 12,
        durationMinutes: 5,
        active: true
      },
      {
        id: 'addon-high-freq',
        name: 'High-Frequency Acne Clarifying Wand',
        description: 'Antibacterial ozone thermal wand for blemish-prone and congested skin zones.',
        price: 22,
        durationMinutes: 10,
        active: true
      },
      {
        id: 'addon-gold-leaf',
        name: '24K Pure Gold Foil Facial Accent',
        description: 'Targeted pure gold leaf applied to cheeks and forehead for maximum radiance.',
        price: 30,
        durationMinutes: 15,
        active: true
      }
    ]
  },

  // =========================================================================
  // 2. HAIR CARE & CUTS
  // =========================================================================
  'hair-cut': {
    categoryName: 'Hair Cut & Styling',
    optionsGroup: {
      id: 'hair-length',
      title: 'Hair Length & Density Tier',
      subtitle: 'Select your hair length for custom sectioning (mutually exclusive)',
      required: true,
      options: [
        {
          id: 'length-standard',
          name: 'Shoulder Length / Fine to Medium',
          description: 'Standard precision haircut and classic salon blowout.',
          priceAdjustment: 0,
          durationMinutes: 0,
          isDefault: true
        },
        {
          id: 'length-medium',
          name: 'Below Shoulder / Medium to Thick',
          description: 'Extended sectioning, texturizing, and polished round-brush styling.',
          priceAdjustment: 15,
          durationMinutes: 15
        },
        {
          id: 'length-long-thick',
          name: 'Waist Length / Dense or Curly',
          description: 'Comprehensive weight removal, bespoke layering, and high-shine thermal finish.',
          priceAdjustment: 25,
          durationMinutes: 20
        }
      ]
    },
    addons: [
      {
        id: 'addon-scalp-detox',
        name: 'Organic Tea Tree & Rosemary Scalp Scrub',
        description: 'Exfoliating botanical scalp polish that clears buildup and promotes hair growth.',
        price: 25,
        durationMinutes: 15,
        active: true
      },
      {
        id: 'addon-steam-mask',
        name: 'Deep Restorative Botanical Steam Mask',
        description: 'Warm micro-mist moisture infusion under our luxury hair steamer.',
        price: 20,
        durationMinutes: 15,
        active: true
      },
      {
        id: 'addon-split-end',
        name: 'Split-End Thermal Keratin Sealing',
        description: 'Biotin and argan heat-activated treatment that seals damaged and frayed ends.',
        price: 15,
        durationMinutes: 10,
        active: true
      }
    ]
  },

  // Hairstyling category inherits hair-cut options with styling focus
  hairstyling: {
    categoryName: 'Hair Styling & Blowout',
    optionsGroup: {
      id: 'style-complexity',
      title: 'Styling Complexity',
      subtitle: 'Choose your event styling finish (mutually exclusive)',
      required: true,
      options: [
        {
          id: 'style-classic',
          name: 'Signature Voluminous Blowout',
          description: 'Classic round-brush blowout with natural body and bounce.',
          priceAdjustment: 0,
          durationMinutes: 0,
          isDefault: true
        },
        {
          id: 'style-hollywood-waves',
          name: 'Red Carpet Hollywood Waves',
          description: 'Precision set waves with high-gloss mirror finish and 12-hour hold.',
          priceAdjustment: 25,
          durationMinutes: 20
        },
        {
          id: 'style-intricate-updo',
          name: 'Couture Editorial Bridal / Party Updo',
          description: 'Intricate pinned twists, dupatta/veil pin setting, and floral placement.',
          priceAdjustment: 35,
          durationMinutes: 30
        }
      ]
    },
    addons: [
      {
        id: 'addon-glam-clipin',
        name: 'Clip-In Hair Extension Blend & Style',
        description: 'Seamless placement, blending, and heat styling of your own clip-in extensions.',
        price: 25,
        durationMinutes: 20,
        active: true
      },
      {
        id: 'addon-hair-jewels',
        name: 'Pearl & Floral Hair Pin Placement',
        description: 'Artful pinning of luxury decorative hair jewelry and floral accents.',
        price: 15,
        durationMinutes: 10,
        active: true
      },
      {
        id: 'addon-anti-humidity',
        name: '24-Hour Anti-Humidity Glass Shield',
        description: 'Thermal protective glass-hair spray that repels moisture and prevents frizz.',
        price: 12,
        durationMinutes: 5,
        active: true
      }
    ]
  },

  // =========================================================================
  // 3. HAIR COLOUR & BALAYAGE
  // =========================================================================
  'hair-color': {
    categoryName: 'Hair Colour & Balayage',
    optionsGroup: {
      id: 'color-finish',
      title: 'Colour Protection & Finish Tier',
      subtitle: 'Select bond protector and gloss finish (mutually exclusive)',
      required: true,
      options: [
        {
          id: 'color-standard',
          name: 'Standard Salon Colour & Neutralizing Wash',
          description: 'Professional cream developer formula with pH balancing conditioner.',
          priceAdjustment: 0,
          durationMinutes: 0,
          isDefault: true
        },
        {
          id: 'color-gloss-toner',
          name: 'Acidic Glass Gloss Shine Glaze',
          description: 'Translucent acidic shine toner that locks in pigment and mirrors light.',
          priceAdjustment: 25,
          durationMinutes: 15
        },
        {
          id: 'color-bond-builder',
          name: 'Olaplex / Bond-Building Intensive Shield',
          description: 'Disulfide bond rebuilder mixed directly into color to eliminate breakage.',
          priceAdjustment: 35,
          durationMinutes: 15
        }
      ]
    },
    addons: [
      {
        id: 'addon-scalp-shield',
        name: 'Pre-Colour Scalp Barrier Oil',
        description: 'Hypoallergenic botanical oil applied before tint to protect sensitive scalps.',
        price: 12,
        durationMinutes: 5,
        active: true
      },
      {
        id: 'addon-color-lock-mask',
        name: 'Post-Colour Antioxidant Silk Mask',
        description: 'Deep conditioning treatment that seals hair cuticles and prevents fading.',
        price: 22,
        durationMinutes: 15,
        active: true
      }
    ]
  },

  // =========================================================================
  // 4. HAIR TREATMENTS & HAIR SPAS
  // =========================================================================
  'hair-treatments': {
    categoryName: 'Hair Treatments & Spas',
    optionsGroup: {
      id: 'treatment-formula',
      title: 'Restorative Mask Formulation',
      subtitle: 'Choose your intensive mask therapy (mutually exclusive)',
      required: true,
      options: [
        {
          id: 'spa-kesariya',
          name: 'Ayurvedic Kesariya Herbal Infusion',
          description: 'Traditional saffron, brahmi and amla paste for root strengthening.',
          priceAdjustment: 0,
          durationMinutes: 0,
          isDefault: true
        },
        {
          id: 'spa-keratin-ampoule',
          name: 'Hydrolyzed Keratin Core Rebuilder',
          description: 'High-potency micro-protein ampoule that fills chemical and heat fissures.',
          priceAdjustment: 25,
          durationMinutes: 15
        },
        {
          id: 'spa-caviar-lipid',
          name: 'Bio-Lipid Caviar Moisture Reconstruction',
          description: 'Rich lipid repair complex for severely bleached, brittle or unruly hair.',
          priceAdjustment: 35,
          durationMinutes: 20
        }
      ]
    },
    addons: [
      {
        id: 'addon-kansa-comb',
        name: 'Kansa Bronze Scalp Acupressure Comb',
        description: 'Traditional copper-tin alloy comb massage that releases deep cranial tension.',
        price: 18,
        durationMinutes: 10,
        active: true
      },
      {
        id: 'addon-argan-hot-wrap',
        name: 'Moroccan Argan Warm Towel Compress',
        description: 'Heated organic argan steam wrap that forces active ingredients into the hair core.',
        price: 15,
        durationMinutes: 10,
        active: true
      }
    ]
  },

  // =========================================================================
  // 5. WAXING TREATMENTS
  // =========================================================================
  waxing: {
    categoryName: 'Waxing Treatments',
    optionsGroup: {
      id: 'wax-formula',
      title: 'Wax Formulation',
      subtitle: 'Choose your wax formulation (mutually exclusive)',
      required: true,
      options: [
        {
          id: 'wax-honey',
          name: 'Classic Organic Honey Strip Wax',
          description: 'Gentle natural honey wax suitable for smooth normal skin hair removal.',
          priceAdjustment: 0,
          durationMinutes: 0,
          isDefault: true
        },
        {
          id: 'wax-aloe-hard',
          name: 'Sensitive Organic Aloe Stripless Hot Wax',
          description: 'Low-temperature peel-off wax that grips hair not skin; ideal for sensitive zones.',
          priceAdjustment: 12,
          durationMinutes: 5
        },
        {
          id: 'wax-rica-white',
          name: 'Rica Italian White Chocolate Wax',
          description: 'Colophony-free Italian wax infused with zinc oxide to banish post-wax redness.',
          priceAdjustment: 18,
          durationMinutes: 5
        }
      ]
    },
    addons: [
      {
        id: 'addon-lavender-prep',
        name: 'Pre-Wax Lavender Antiseptic Cleanse',
        description: 'Botanical tea tree and lavender mist to prep follicles and calm nerve endings.',
        price: 8,
        durationMinutes: 5,
        active: true
      },
      {
        id: 'addon-ingrown-serum',
        name: 'Post-Wax Cryo Roller & Ingrown Defense',
        description: 'Cold ice-roller glide with soothing witch hazel and salicylic prevention serum.',
        price: 14,
        durationMinutes: 5,
        active: true
      }
    ]
  },

  // =========================================================================
  // 6. NAILS & MANICURES
  // =========================================================================
  nails: {
    categoryName: 'Nails & Manicures',
    optionsGroup: {
      id: 'nail-finish',
      title: 'Topcoat & Polish Finish',
      subtitle: 'Select your manicure finish and longevity (mutually exclusive)',
      required: true,
      options: [
        {
          id: 'nail-gloss',
          name: 'Classic 7-Free High-Shine Gloss',
          description: 'Breathable fast-drying lacquer with chip-resistant diamond topcoat.',
          priceAdjustment: 0,
          durationMinutes: 0,
          isDefault: true
        },
        {
          id: 'nail-shellac-gel',
          name: 'Long-Wear LED Shellac Gel Polish',
          description: 'Instantly dry LED-cured gel polish with 14-day zero-chip mirror shine.',
          priceAdjustment: 18,
          durationMinutes: 15
        },
        {
          id: 'nail-matte',
          name: 'Velvet Matte Haute Topcoat',
          description: 'Contemporary velvet finish that eliminates glare for an editorial look.',
          priceAdjustment: 10,
          durationMinutes: 5
        }
      ]
    },
    addons: [
      {
        id: 'addon-paraffin-dip',
        name: 'Warm Lavender Paraffin Moisture Dip',
        description: 'Heated therapeutic wax bath that deeply softens hands, palms, and cuticles.',
        price: 16,
        durationMinutes: 15,
        active: true
      },
      {
        id: 'addon-keratin-gloves',
        name: 'Intensive Keratin Moisture Gloves',
        description: 'Single-use peptide treatment gloves worn during cuticle care.',
        price: 12,
        durationMinutes: 10,
        active: true
      },
      {
        id: 'addon-french-accent',
        name: 'Classic French Tips / Feature Nail Art',
        description: 'Hand-painted white smile lines or minimalist floral accent on two feature nails.',
        price: 15,
        durationMinutes: 15,
        active: true
      }
    ]
  },

  // =========================================================================
  // 7. MASSAGE & BODY CARE
  // =========================================================================
  massage: {
    categoryName: 'Head & Body Massage',
    optionsGroup: {
      id: 'massage-oil',
      title: 'Therapeutic Oil Blend',
      subtitle: 'Select your botanical massage oil (mutually exclusive)',
      required: true,
      options: [
        {
          id: 'oil-sesame',
          name: 'Warm Ayurvedic Sesame & Brahmi Oil',
          description: 'Traditional vata-pacifying warmed herbal oil for deep grounding.',
          priceAdjustment: 0,
          durationMinutes: 0,
          isDefault: true
        },
        {
          id: 'oil-lavender',
          name: 'French Lavender & Sweet Almond Calming Oil',
          description: 'Gentle soothing aroma that relieves stress and relaxes tired muscles.',
          priceAdjustment: 14,
          durationMinutes: 0
        },
        {
          id: 'oil-eucalyptus',
          name: 'Eucalyptus, Peppermint & Camphor Muscle Relief',
          description: 'Invigorating thermal blend targeting stubborn shoulder and neck knots.',
          priceAdjustment: 18,
          durationMinutes: 0
        }
      ]
    },
    addons: [
      {
        id: 'addon-hot-stones',
        name: 'Volcanic Basalt Hot Stone Placement',
        description: 'Heated basalt river stones placed along spinal and scapular energy lines.',
        price: 25,
        durationMinutes: 15,
        active: true
      },
      {
        id: 'addon-foot-reflex',
        name: 'Peppermint Foot Acupressure Revitalizer',
        description: 'Targeted acupressure pressure point massage with cooling foot cream.',
        price: 20,
        durationMinutes: 15,
        active: true
      }
    ]
  },

  // =========================================================================
  // 8. THREADING & TINTING
  // =========================================================================
  threading: {
    categoryName: 'Threading & Tinting',
    optionsGroup: {
      id: 'threading-finish',
      title: 'Soothing Finish Formula',
      subtitle: 'Select your post-threading soothing care (mutually exclusive)',
      required: true,
      options: [
        {
          id: 'thread-aloe',
          name: 'Fresh Organic Aloe Vera Gel',
          description: 'Natural soothing aloe to calm follicular heat immediately.',
          priceAdjustment: 0,
          durationMinutes: 0,
          isDefault: true
        },
        {
          id: 'thread-rose-ice',
          name: 'Rosewater Cryo Ice Globe Compress',
          description: 'Sub-zero cryo globe glide that tightens open pores and banishes redness.',
          priceAdjustment: 6,
          durationMinutes: 5
        }
      ]
    },
    addons: [
      {
        id: 'addon-brow-growth-serum',
        name: 'Castor & Rosemary Brow Follicle Serum',
        description: 'Nourishing botanical peptide treatment brushed into brow roots.',
        price: 6,
        durationMinutes: 5,
        active: true
      },
      {
        id: 'addon-eye-patches',
        name: 'Collagen Under-Eye De-Puffing Gel Pads',
        description: 'Cooling hydrogel pads applied under eyes during your threading session.',
        price: 8,
        durationMinutes: 5,
        active: true
      }
    ]
  },

  // =========================================================================
  // 9. MAKEUP ARTISTRY
  // =========================================================================
  makeup: {
    categoryName: 'Makeup Artistry',
    optionsGroup: {
      id: 'makeup-base',
      title: 'Foundation & Wear Profile',
      subtitle: 'Select your makeup finish profile (mutually exclusive)',
      required: true,
      options: [
        {
          id: 'makeup-hd',
          name: 'Classic HD Camera-Ready Radiance',
          description: 'High-pigment dewy or velvet finish crafted for natural and studio lighting.',
          priceAdjustment: 0,
          durationMinutes: 0,
          isDefault: true
        },
        {
          id: 'makeup-airbrush',
          name: 'Waterproof Airbrush Silicone Mist',
          description: 'Ultra-lightweight 24-hour transfer-proof airbrush base that will not budge.',
          priceAdjustment: 35,
          durationMinutes: 20
        }
      ]
    },
    addons: [
      {
        id: 'addon-mink-lashes',
        name: '3D Silk Luxury Strip Lashes',
        description: 'Featherlight multi-layered false lashes customized to your eye shape.',
        price: 18,
        durationMinutes: 10,
        active: true
      },
      {
        id: 'addon-glass-prep',
        name: '10-Minute Collagen Sheet Mask Prep',
        description: 'Pre-makeup intensive hydration mask that creates a smooth glass canvas.',
        price: 15,
        durationMinutes: 10,
        active: true
      }
    ]
  },

  // =========================================================================
  // 10. HENNA & MEHNDI
  // =========================================================================
  henna: {
    categoryName: 'Henna & Mehndi',
    optionsGroup: {
      id: 'henna-style',
      title: 'Henna Design Style',
      subtitle: 'Select your design density (mutually exclusive)',
      required: true,
      options: [
        {
          id: 'henna-classic',
          name: 'Classic Floral & Mandala Palm Placement',
          description: 'Organic Rajasthani henna paste covering hands and wrists.',
          priceAdjustment: 0,
          durationMinutes: 0,
          isDefault: true
        },
        {
          id: 'henna-elbow',
          name: 'Elbow-Length Elaborate Bridal Mandalas',
          description: 'Intricate peacock, paisley and traditional bridal motifs up to forearms.',
          priceAdjustment: 30,
          durationMinutes: 30
        }
      ]
    },
    addons: [
      {
        id: 'addon-eucalyptus-oil',
        name: 'Pure Nilgiri Eucalyptus Stain Enhancer',
        description: 'Pre-henna warm botanical oil massage to open pores for a darker mahogany stain.',
        price: 10,
        durationMinutes: 5,
        active: true
      },
      {
        id: 'addon-lemon-sugar',
        name: 'Lemon-Sugar Sealant & Clove Steam Finish',
        description: 'Traditional sealant mist and warming clove smoke that deepens pigment richness.',
        price: 12,
        durationMinutes: 10,
        active: true
      }
    ]
  }
};

/**
 * Service-specific overrides for individual treatments that require distinct options
 */
export const SERVICE_SPECIFIC_CUSTOMIZATIONS = {
  // Precision eyebrow threading has focused options
  'eyebrow-threading': {
    optionsGroup: {
      id: 'brow-styling',
      title: 'Eyebrow Shaping Style',
      subtitle: 'Select your preferred arch contour (mutually exclusive)',
      required: true,
      options: [
        {
          id: 'brow-natural',
          name: 'Natural Soft Arch',
          description: 'Gentle cleanup maintaining your natural fullness and brow thickness.',
          priceAdjustment: 0,
          durationMinutes: 0,
          isDefault: true
        },
        {
          id: 'brow-defined',
          name: 'Defined High Arch & Precision Trim',
          description: 'Crisp geometric mapping with scissor trimming of unruly hairs.',
          priceAdjustment: 4,
          durationMinutes: 5
        }
      ]
    },
    addons: [
      {
        id: 'addon-brow-tint',
        name: 'Natural Henna Brow Tinting',
        description: 'Semi-permanent vegetable stain that darkens and defines brows for 2-3 weeks.',
        price: 15,
        durationMinutes: 15,
        active: true
      },
      {
        id: 'addon-rose-compress',
        name: 'Rosewater Cryo Ice Globe Compress',
        description: 'Cools irritated follicles and soothes sensitive skin instantly.',
        price: 6,
        durationMinutes: 5,
        active: true
      }
    ]
  }
};

/**
 * Returns customization profile for a given service object.
 * Returns null if the service does not have an active customization profile.
 */
export function getCustomizationConfigForService(service) {
  if (!service) return null;

  // 1. Check for service-specific override first
  if (service.id && SERVICE_SPECIFIC_CUSTOMIZATIONS[service.id]) {
    return {
      serviceId: service.id,
      serviceName: service.name,
      basePrice: Number(service.price) || 0,
      baseDuration: parseInt(service.duration, 10) || 30,
      ...SERVICE_SPECIFIC_CUSTOMIZATIONS[service.id]
    };
  }

  // 2. Check for category configuration
  const catKey = String(service.category || '').toLowerCase().trim();
  if (catKey && CUSTOMIZATION_PROFILES[catKey]) {
    const profile = CUSTOMIZATION_PROFILES[catKey];
    return {
      serviceId: service.id,
      serviceName: service.name,
      basePrice: Number(service.price) || 0,
      baseDuration: parseInt(service.duration, 10) || 30,
      optionsGroup: profile.optionsGroup,
      addons: profile.addons.filter((a) => a.active !== false)
    };
  }

  // 3. Fallback check for category aliases
  const aliasMap = {
    'hair-cut': 'hair-cut',
    'haircut': 'hair-cut',
    'hair': 'hair-cut',
    'hair-care': 'hair-cut',
    'facials': 'facial',
    'facial': 'facial',
    'skin': 'facial',
    'massages': 'massage',
    'massage': 'massage',
    'wax': 'waxing',
    'waxing': 'waxing',
    'nail': 'nails',
    'nails': 'nails',
    'manicure': 'nails',
    'pedicure': 'nails',
    'hair-colour': 'hair-color',
    'hair-color': 'hair-color',
    'colour': 'hair-color',
    'color': 'hair-color',
    'hair-treatment': 'hair-treatments',
    'hair-treatments': 'hair-treatments',
    'hairstyling': 'hairstyling',
    'styling': 'hairstyling',
    'mehndi': 'henna',
    'henna': 'henna',
    'makeup': 'makeup'
  };

  const matchedKey = aliasMap[catKey];
  if (matchedKey && CUSTOMIZATION_PROFILES[matchedKey]) {
    const profile = CUSTOMIZATION_PROFILES[matchedKey];
    return {
      serviceId: service.id,
      serviceName: service.name,
      basePrice: Number(service.price) || 0,
      baseDuration: parseInt(service.duration, 10) || 30,
      optionsGroup: profile.optionsGroup,
      addons: profile.addons.filter((a) => a.active !== false)
    };
  }

  return null;
}

/**
 * Calculates live total price and duration based on service and selected options.
 * Trusted mathematical calculation preventing frontend tampering.
 */
export function calculateCustomizedTotal(service, selectedOptionId, selectedAddonIds = []) {
  if (!service) {
    return {
      basePrice: 0,
      optionAdjustment: 0,
      selectedOption: null,
      selectedAddons: [],
      addonTotal: 0,
      totalPrice: 0,
      baseDurationMinutes: 0,
      additionalDurationMinutes: 0,
      totalDurationMinutes: 0,
      formattedPrice: '$0.00 CAD'
    };
  }

  const basePrice = Number(service.price) || 0;
  const baseDurationMinutes = parseInt(service.duration, 10) || 45;

  const config = getCustomizationConfigForService(service);
  if (!config) {
    return {
      basePrice,
      optionAdjustment: 0,
      selectedOption: null,
      selectedAddons: [],
      addonTotal: 0,
      totalPrice: basePrice,
      baseDurationMinutes,
      additionalDurationMinutes: 0,
      totalDurationMinutes: baseDurationMinutes,
      formattedPrice: `$${basePrice.toFixed(2)} CAD`
    };
  }

  // 1. Resolve selected option from optionsGroup
  let selectedOption = null;
  let optionAdjustment = 0;
  let optionDuration = 0;

  if (config.optionsGroup && Array.isArray(config.optionsGroup.options)) {
    if (selectedOptionId) {
      selectedOption = config.optionsGroup.options.find((opt) => opt.id === selectedOptionId);
    }
    if (!selectedOption) {
      // Fallback to default option
      selectedOption = config.optionsGroup.options.find((opt) => opt.isDefault) || config.optionsGroup.options[0];
    }
    if (selectedOption) {
      optionAdjustment = Number(selectedOption.priceAdjustment) || 0;
      optionDuration = Number(selectedOption.durationMinutes) || 0;
    }
  }

  // 2. Resolve eligible selected add-ons (preventing duplicates and ineligible add-ons)
  const eligibleAddonMap = new Map((config.addons || []).map((a) => [a.id, a]));
  const validAddons = [];
  const seenIds = new Set();
  let addonTotal = 0;
  let addonDuration = 0;

  if (Array.isArray(selectedAddonIds)) {
    for (const addonId of selectedAddonIds) {
      if (!addonId || seenIds.has(addonId)) continue;
      seenIds.add(addonId);

      const addonObj = eligibleAddonMap.get(addonId);
      if (addonObj && addonObj.active !== false) {
        validAddons.push(addonObj);
        addonTotal += Number(addonObj.price) || 0;
        addonDuration += Number(addonObj.durationMinutes) || 0;
      }
    }
  }

  const totalPrice = Math.max(0, basePrice + optionAdjustment + addonTotal);
  const additionalDurationMinutes = optionDuration + addonDuration;
  const totalDurationMinutes = baseDurationMinutes + additionalDurationMinutes;

  return {
    basePrice,
    optionAdjustment,
    selectedOption,
    selectedAddons: validAddons,
    addonTotal,
    totalPrice,
    baseDurationMinutes,
    additionalDurationMinutes,
    totalDurationMinutes,
    formattedPrice: `$${totalPrice.toFixed(2)} CAD`
  };
}

/**
 * Authoritative validator for booking payload to prevent client-side price tampering.
 */
export function validateServiceCustomization(service, selectedOptionId, selectedAddonIds = []) {
  if (!service) {
    return { valid: false, error: 'Service not found in database catalog.' };
  }

  const calculation = calculateCustomizedTotal(service, selectedOptionId, selectedAddonIds);
  return {
    valid: true,
    serviceId: service.id,
    serviceName: service.name,
    ...calculation
  };
}
