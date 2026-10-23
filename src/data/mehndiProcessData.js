// GLAM GIRL BY JANKI — Mehndi Application Process, Pricing & Duration Dataset
// 16 Approved/Suggested Services, 6-Step Application Process, and Time/Price Aggregators

export const DEFAULT_MEHNDI_PROCESS_SERVICES = [
  {
    id: 'simple-finger-mehndi',
    name: 'Simple Finger Mehndi',
    applicationTime: '15–20 minutes',
    minMinutes: 15,
    maxMinutes: 20,
    suggestedPriceCad: 15,
    suggestedPriceDisplay: '$15',
    minPrice: 15,
    maxPrice: 15,
    isPriceRange: false,
    category: 'hand',
    categoryLabel: 'Hand Accent',
    image: '/images/mehndi/finger-rings-lace.webp',
    description: 'Delicate lace rings, leaf vines, and micro-filigree on fingers with bare palms for effortless grace.',
    available: true,
    isApprovedByAdmin: true,
    approvedPriceCad: 15,
    serviceIdRef: 'mehndi-classic-design'
  },
  {
    id: 'one-side-hand-mehndi',
    name: 'One-Side Hand Mehndi',
    applicationTime: '20–30 minutes',
    minMinutes: 20,
    maxMinutes: 30,
    suggestedPriceCad: 25,
    suggestedPriceDisplay: '$25',
    minPrice: 25,
    maxPrice: 25,
    isPriceRange: false,
    category: 'hand',
    categoryLabel: 'Single Hand',
    image: '/images/services/mehndi/39-mehndi-classic-design.webp',
    description: 'A focused, balanced design on either the palm or back of one hand up to the wrist crease.',
    available: true,
    isApprovedByAdmin: true,
    approvedPriceCad: 25,
    serviceIdRef: 'mehndi-classic-design'
  },
  {
    id: 'front-hand-mehndi',
    name: 'Front-Hand Mehndi',
    applicationTime: '30–45 minutes',
    minMinutes: 30,
    maxMinutes: 45,
    suggestedPriceCad: 35,
    suggestedPriceDisplay: '$35',
    minPrice: 35,
    maxPrice: 35,
    isPriceRange: false,
    category: 'hand',
    categoryLabel: 'Palm & Fingers',
    image: '/images/mehndi/mandala-palm-art.webp',
    description: 'Classic central palm mandala, floral jaal, or paisley cascade reaching the wrist and fingertips.',
    available: true,
    isApprovedByAdmin: true,
    approvedPriceCad: 35,
    serviceIdRef: 'party-mehndi'
  },
  {
    id: 'back-hand-mehndi',
    name: 'Back-Hand Mehndi',
    applicationTime: '30–45 minutes',
    minMinutes: 30,
    maxMinutes: 45,
    suggestedPriceCad: 35,
    suggestedPriceDisplay: '$35',
    minPrice: 35,
    maxPrice: 35,
    isPriceRange: false,
    category: 'hand',
    categoryLabel: 'Back of Hand',
    image: '/images/mehndi/backhand-cuff-chain.webp',
    description: 'Jewelry-inspired haathphool motifs, wrist cuffs, and graceful trailing vines across dorsal skin.',
    available: true,
    isApprovedByAdmin: true,
    approvedPriceCad: 35,
    serviceIdRef: 'party-mehndi'
  },
  {
    id: 'both-side-hand-mehndi',
    name: 'Both-Side Hand Mehndi',
    applicationTime: '60–90 minutes',
    minMinutes: 60,
    maxMinutes: 90,
    suggestedPriceCad: 60,
    suggestedPriceDisplay: '$60',
    minPrice: 60,
    maxPrice: 60,
    isPriceRange: false,
    category: 'hand',
    categoryLabel: 'Both Sides',
    image: '/images/mehndi/indian-traditional-jaal.webp',
    description: 'Cohesive matching coverage for both palm and back of one hand for high-definition harmony.',
    available: true,
    isApprovedByAdmin: true,
    approvedPriceCad: 60,
    serviceIdRef: 'party-mehndi'
  },
  {
    id: 'arabic-mehndi',
    name: 'Arabic Mehndi',
    applicationTime: '30–60 minutes',
    minMinutes: 30,
    maxMinutes: 60,
    suggestedPriceCad: 40,
    suggestedPriceDisplay: '$40',
    minPrice: 40,
    maxPrice: 40,
    isPriceRange: false,
    category: 'hand',
    categoryLabel: 'Arabic Bel',
    image: '/images/mehndi/arabic-mehndi.webp',
    description: 'Flowing diagonal floral bels, bold outer contours, and delicate graduated petal shading.',
    available: true,
    isApprovedByAdmin: true,
    approvedPriceCad: 45,
    serviceIdRef: 'arabic-mehndi'
  },
  {
    id: 'floral-mehndi',
    name: 'Floral Mehndi',
    applicationTime: '30–45 minutes',
    minMinutes: 30,
    maxMinutes: 45,
    suggestedPriceCad: 35,
    suggestedPriceDisplay: '$35',
    minPrice: 35,
    maxPrice: 35,
    isPriceRange: false,
    category: 'hand',
    categoryLabel: 'Botanical',
    image: '/images/mehndi/arabic-floral-bel.webp',
    description: 'Botanical lotus blooms, blooming roses, leafy garlands, and fine shaded petals across the hand.',
    available: true,
    isApprovedByAdmin: true,
    approvedPriceCad: 35,
    serviceIdRef: 'party-mehndi'
  },
  {
    id: 'mandala-mehndi',
    name: 'Mandala Mehndi',
    applicationTime: '30–45 minutes',
    minMinutes: 30,
    maxMinutes: 45,
    suggestedPriceCad: 35,
    suggestedPriceDisplay: '$35',
    minPrice: 35,
    maxPrice: 35,
    isPriceRange: false,
    category: 'hand',
    categoryLabel: 'Sacred Mandala',
    image: '/images/mehndi/mandala-palm-art.webp',
    description: 'Sacred radial geometry centered on the palm or dorsal hand, framed with intricate dotted borders.',
    available: true,
    isApprovedByAdmin: true,
    approvedPriceCad: 35,
    serviceIdRef: 'party-mehndi'
  },
  {
    id: 'minimal-mehndi',
    name: 'Minimal Mehndi',
    applicationTime: '15–30 minutes',
    minMinutes: 15,
    maxMinutes: 30,
    suggestedPriceCad: 20,
    suggestedPriceDisplay: '$20',
    minPrice: 20,
    maxPrice: 20,
    isPriceRange: false,
    category: 'hand',
    categoryLabel: 'Contemporary',
    image: '/images/mehndi/minimalist-fine-line.webp',
    description: 'Subtle wrist bracelets, single finger accents, and minimalist negative-space modern motifs.',
    available: true,
    isApprovedByAdmin: true,
    approvedPriceCad: 20,
    serviceIdRef: 'mehndi-classic-design'
  },
  {
    id: 'feet-mehndi',
    name: 'Feet Mehndi',
    applicationTime: '30–60 minutes',
    minMinutes: 30,
    maxMinutes: 60,
    suggestedPriceCad: 40,
    suggestedPriceDisplay: '$40',
    minPrice: 40,
    maxPrice: 40,
    isPriceRange: false,
    category: 'feet',
    categoryLabel: 'Feet & Anklet',
    image: '/images/mehndi/bridal-feet-anklet.webp',
    description: 'Elegant anklet cuffs, top of foot floral clusters, and toe caps crafted for bridal & festive wear.',
    available: true,
    isApprovedByAdmin: true,
    approvedPriceCad: 40,
    serviceIdRef: 'party-mehndi'
  },
  {
    id: 'one-full-hand-mehndi',
    name: 'One Full Hand Mehndi',
    applicationTime: '60–120 minutes',
    minMinutes: 60,
    maxMinutes: 120,
    suggestedPriceCad: 75,
    suggestedPriceDisplay: '$75',
    minPrice: 75,
    maxPrice: 75,
    isPriceRange: false,
    category: 'hand',
    categoryLabel: 'Forearm Tapestry',
    image: '/images/mehndi/bridal-full-hand.webp',
    description: 'Complete wrist-to-mid-forearm intricate tapestry with jaali grids and storytelling medallions.',
    available: true,
    isApprovedByAdmin: true,
    approvedPriceCad: 75,
    serviceIdRef: 'party-mehndi'
  },
  {
    id: 'both-full-hands-mehndi',
    name: 'Both Full Hands Mehndi',
    applicationTime: '2–4 hours',
    minMinutes: 120,
    maxMinutes: 240,
    suggestedPriceCad: 150,
    suggestedPriceDisplay: '$150',
    minPrice: 150,
    maxPrice: 150,
    isPriceRange: false,
    category: 'hand',
    categoryLabel: 'Full Set Forearms',
    image: '/images/mehndi/bridal-mehndi-hero.webp',
    description: 'Symmetrical forearm coverage across both hands, designed for sangeet celebrations and guest of honour.',
    available: true,
    isApprovedByAdmin: true,
    approvedPriceCad: 150,
    serviceIdRef: 'bridal-mehndi'
  },
  {
    id: 'engagement-mehndi',
    name: 'Engagement Mehndi',
    applicationTime: '2–3 hours',
    minMinutes: 120,
    maxMinutes: 180,
    suggestedPriceCad: 120,
    suggestedPriceDisplay: '$120',
    minPrice: 120,
    maxPrice: 120,
    isPriceRange: false,
    category: 'bridal',
    categoryLabel: 'Engagement',
    image: '/images/mehndi/engagement-elegance.webp',
    description: 'Refined celebration motifs incorporating initials, ring finger emphasis, and wrist cuffs.',
    available: true,
    isApprovedByAdmin: true,
    approvedPriceCad: 120,
    serviceIdRef: 'bridal-mehndi'
  },
  {
    id: 'bridal-mehndi',
    name: 'Bridal Mehndi',
    applicationTime: '4–8 hours',
    minMinutes: 240,
    maxMinutes: 480,
    suggestedPriceCad: 350,
    suggestedPriceDisplay: '$250–$450',
    minPrice: 250,
    maxPrice: 450,
    isPriceRange: true,
    category: 'bridal',
    categoryLabel: 'Royal Bridal',
    image: '/images/services/mehndi/40-bridal-mehndi.webp',
    description: 'Couture storytelling bridal tapestry, Radha-Krishna portraits, dense Jaal, and elbow-length arm coverage.',
    available: true,
    isApprovedByAdmin: true,
    approvedPriceCad: 180, // Existing catalog base
    serviceIdRef: 'bridal-mehndi'
  },
  {
    id: 'bridal-hands-and-feet',
    name: 'Bridal Hands and Feet',
    applicationTime: '6–10 hours',
    minMinutes: 360,
    maxMinutes: 600,
    suggestedPriceCad: 475,
    suggestedPriceDisplay: '$350–$600',
    minPrice: 350,
    maxPrice: 600,
    isPriceRange: true,
    category: 'bridal',
    categoryLabel: 'Grand Bridal Suite',
    image: '/images/mehndi/bridal-feet-anklet.webp',
    description: 'Complete royal trousseau package covering elbows to fingertips and knees to toes with personalized storytelling.',
    available: true,
    isApprovedByAdmin: true,
    approvedPriceCad: 350,
    serviceIdRef: 'bridal-mehndi'
  },
  {
    id: 'custom-mehndi-design',
    name: 'Custom Mehndi Design',
    applicationTime: '30 minutes–4 hours',
    minMinutes: 30,
    maxMinutes: 240,
    suggestedPriceCad: 35,
    suggestedPriceDisplay: 'From $35',
    minPrice: 35,
    maxPrice: 200,
    isPriceRange: true,
    category: 'custom',
    categoryLabel: 'Bespoke Concept',
    image: '/images/mehndi/mehndi-studio-card.webp',
    description: 'Custom client references, bespoke cultural fusion motifs, tattoo-style placement, or personalized symbols.',
    available: true,
    isApprovedByAdmin: true,
    approvedPriceCad: 35,
    serviceIdRef: 'party-mehndi'
  }
];

// =============================================================================
// 2. 6-STEP MEHNDI APPLICATION PROCESS
// =============================================================================

export const MEHNDI_APPLICATION_PROCESS_STEPS = [
  {
    step: 1,
    number: '01',
    title: 'Design Consultation',
    estimatedTime: '5–10 minutes',
    description: "Discuss the customer's preferred style, occasion, and design requirements.",
    details: 'Janki Khatroja reviews hand anatomy, sleeve hemlines, bridal palette, and motif preferences to map the blueprint of the design.',
    iconName: 'Compass'
  },
  {
    step: 2,
    number: '02',
    title: 'Skin Preparation',
    estimatedTime: '5 minutes',
    description: 'Ensure the hands or feet are clean and dry before application.',
    details: 'Gentle alcohol-free botanical wipe removes barrier lotions, silicones, and sebum so lawsone dye penetrates deep into the keratin layer.',
    iconName: 'Sparkles'
  },
  {
    step: 3,
    number: '03',
    title: 'Design Outline',
    estimatedTime: 'Included in Service',
    description: 'Create the main shapes, patterns, and outlines according to the selected design.',
    details: 'Laying down structural mandala centers, paisleys, architectural arches, and flowing diagonal bel contours with crisp line pressure.',
    iconName: 'Layers'
  },
  {
    step: 4,
    number: '04',
    title: 'Detailed Mehndi Application',
    estimatedTime: 'Depends on selected design',
    description: 'Add flowers, leaves, paisleys, mandalas, dots, and fine decorative patterns. Time depends on the selected design.',
    details: 'Delicate micro-mesh jaali, intricate negative-space shading, teardrop dots, and hand-sifted paste precision that bring the design alive.',
    iconName: 'Flower2'
  },
  {
    step: 5,
    number: '05',
    title: 'Drying and Stain Development',
    estimatedTime: 'Separate from application (24–48h development)',
    description: 'Allow the henna paste to dry according to the product instructions. Drying time is separate from application time. The stain typically deepens over the next 24–48 hours.',
    details: 'Warm lemon-sugar sealant glaze locks moisture, followed by dry scraping. Body heat gradually oxidizes the lawsone dye into rich mahogany.',
    iconName: 'Clock'
  },
  {
    step: 6,
    number: '06',
    title: 'Aftercare Guidance',
    estimatedTime: '5 minutes',
    description: 'Provide instructions for caring for the finished design and supporting natural stain development.',
    details: 'Complete guidance on water avoidance, coconut oil barriers, warm clove steam infusion, and safe practices for 7–14 days of lasting beauty.',
    iconName: 'ShieldCheck'
  }
];

// =============================================================================
// 3. CALCULATION UTILITIES
// =============================================================================

/**
 * Calculates total estimated price from an array of selected services
 */
export function calculateTotalMehndiPrice(selectedServices = []) {
  if (!selectedServices || selectedServices.length === 0) {
    return {
      min: 0,
      max: 0,
      display: '$0 CAD',
      isRange: false,
      count: 0
    };
  }

  let totalMin = 0;
  let totalMax = 0;
  let hasRange = false;

  selectedServices.forEach((s) => {
    const min = s.minPrice !== undefined ? s.minPrice : (s.suggestedPriceCad || 0);
    const max = s.maxPrice !== undefined ? s.maxPrice : (s.suggestedPriceCad || 0);
    totalMin += min;
    totalMax += max;
    if (min !== max) {
      hasRange = true;
    }
  });

  const display = hasRange
    ? `$${totalMin}–$${totalMax} CAD`
    : `$${totalMin} CAD`;

  return {
    min: totalMin,
    max: totalMax,
    display,
    isRange: hasRange,
    count: selectedServices.length
  };
}

/**
 * Calculates total estimated application time from selected services
 */
export function calculateTotalMehndiTime(selectedServices = []) {
  if (!selectedServices || selectedServices.length === 0) {
    return {
      minMinutes: 0,
      maxMinutes: 0,
      display: '0 minutes',
      formattedShort: '0 min'
    };
  }

  let totalMinMins = 0;
  let totalMaxMins = 0;

  selectedServices.forEach((s) => {
    totalMinMins += s.minMinutes || 0;
    totalMaxMins += s.maxMinutes || (s.minMinutes || 0);
  });

  const display = formatMinutesRange(totalMinMins, totalMaxMins);

  return {
    minMinutes: totalMinMins,
    maxMinutes: totalMaxMins,
    display,
    formattedShort: display
  };
}

/**
 * Helper to format minutes into human readable hours & minutes
 */
export function formatMinutesRange(minMins, maxMins) {
  if (minMins <= 0 && maxMins <= 0) return '0 minutes';

  const formatSingle = (mins) => {
    if (mins < 60) return `${mins} mins`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (m === 0) return `${h} ${h === 1 ? 'hour' : 'hours'}`;
    return `${h}h ${m}m`;
  };

  if (minMins === maxMins) {
    return formatSingle(minMins);
  }

  // If both under 60
  if (minMins < 60 && maxMins < 60) {
    return `${minMins}–${maxMins} minutes`;
  }

  // If crossing hours
  return `${formatSingle(minMins)} – ${formatSingle(maxMins)}`;
}
