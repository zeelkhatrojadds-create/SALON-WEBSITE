// GLAM GIRL BY JANKI — Create Your Mehndi Package Data Model
// Step-by-step package builder configurations linked to existing salon catalogue pricing and assets.

export const MEHNDI_OCCASIONS = [
  {
    id: 'bridal',
    name: 'Bridal Mehndi',
    subtitle: 'The Grand Wedding Ceremony',
    description: 'Master storytelling compositions, sacred lotus, peacocks, and doli motifs covering forearms and feet.',
    image: '/images/mehndi/bridal-mehndi-hero.webp',
    recommendedHand: 'intricate-bridal-hand',
    recommendedFeet: 'bridal-feet',
    defaultComplexity: 'intricate',
    isBridal: true
  },
  {
    id: 'engagement',
    name: 'Engagement',
    subtitle: 'Ring Ceremony Elegance',
    description: 'Sophisticated romantic patterns with graceful left ring finger halos and delicate wrist cuffs.',
    image: '/images/mehndi/engagement-elegance.webp',
    recommendedHand: 'both-sides-hand',
    recommendedFeet: 'minimal-feet',
    defaultComplexity: 'medium',
    isBridal: false
  },
  {
    id: 'wedding-guest',
    name: 'Wedding Guest',
    subtitle: 'Celebratory Charm',
    description: 'Eye-catching party motifs for bridesmaids, sisters, and family guests attending sangeet and wedding events.',
    image: '/images/mehndi/arabic-mehndi.webp',
    recommendedHand: 'arabic-hand',
    recommendedFeet: 'arabic-feet',
    defaultComplexity: 'medium',
    isBridal: false
  },
  {
    id: 'karwa-chauth',
    name: 'Karwa Chauth',
    subtitle: 'Auspicious Sringar Ritual',
    description: 'Traditional auspicious jaals, crescent moon accents, and deep dark mahogany staining motifs.',
    image: '/images/mehndi/festival-sangeet.webp',
    recommendedHand: 'traditional-indian-hand',
    recommendedFeet: 'front-foot',
    defaultComplexity: 'medium',
    isBridal: false
  },
  {
    id: 'diwali-festivals',
    name: 'Diwali and Festivals',
    subtitle: 'Festive Illumination',
    description: 'Joyous circular palm mandalas, floral mesh, and fast-setting festive patterns for family celebrations.',
    image: '/images/mehndi/mandala-palm-art.webp',
    recommendedHand: 'front-hand',
    recommendedFeet: 'minimal-feet',
    defaultComplexity: 'simple',
    isBridal: false
  },
  {
    id: 'eid',
    name: 'Eid Celebration',
    subtitle: 'Chand Raat & Morning Prayers',
    description: 'Fluid Gulf vines, shaded leaf clusters, and elegant negative space trailing across the dorsal hand.',
    image: '/images/mehndi/arabic-floral-bel.webp',
    recommendedHand: 'arabic-hand',
    recommendedFeet: 'arabic-feet',
    defaultComplexity: 'medium',
    isBridal: false
  },
  {
    id: 'baby-shower',
    name: 'Baby Shower',
    subtitle: 'Godh Bharai & Motherhood Blessings',
    description: 'Gentle, soothing botanical lines, baby footprints, lotus blooms, and auspicious blessing motifs.',
    image: '/images/mehndi/minimalist-fine-line.webp',
    recommendedHand: 'half-hand',
    recommendedFeet: 'minimal-feet',
    defaultComplexity: 'simple',
    isBridal: false
  },
  {
    id: 'party-events',
    name: 'Party and Special Events',
    subtitle: 'Contemporary Chic',
    description: 'Statement haathphool finger rings, delicate wrist cuffs, and modern cocktail jewelry accents.',
    image: '/images/mehndi/backhand-cuff-chain.webp',
    recommendedHand: 'back-hand',
    recommendedFeet: 'minimal-feet',
    defaultComplexity: 'simple',
    isBridal: false
  },
  {
    id: 'casual',
    name: 'Casual Mehndi',
    subtitle: 'Everyday Minimal Art',
    description: 'Quick, delicate single-finger vines and micro-florals drying in under 15 minutes for everyday wear.',
    image: '/images/mehndi/finger-rings-lace.webp',
    recommendedHand: 'finger-mehndi',
    recommendedFeet: null,
    defaultComplexity: 'simple',
    isBridal: false
  }
];

export const HAND_DESIGN_OPTIONS = [
  {
    id: 'front-hand',
    name: 'Front-Hand Design',
    scope: 'Both Palms',
    scopeDetails: 'Applied to both front palms from wrist to fingertips',
    description: 'Centered palm mandala and fingertip filigree on both palms with deep lawsone saturation.',
    image: '/images/mehndi/mandala-palm-art.webp',
    coverage: 'Palms & Fingertips (Both Hands)',
    price: 25,
    durationMinutes: 20,
    serviceId: 'mehndi-classic-design',
    compatibleStyles: ['traditional', 'minimal', 'arabic']
  },
  {
    id: 'back-hand',
    name: 'Back-Hand Design',
    scope: 'Both Dorsals',
    scopeDetails: 'Applied to the back of both hands from wrist cuffs down to fingers',
    description: 'Dramatic cuff-to-finger haathphool geometry, draping pearl swags, and dorsal lace.',
    image: '/images/mehndi/backhand-cuff-chain.webp',
    coverage: 'Dorsal Wrist to Fingers (Both Hands)',
    price: 35,
    durationMinutes: 25,
    serviceId: 'party-mehndi',
    compatibleStyles: ['arabic', 'traditional', 'minimal']
  },
  {
    id: 'both-sides-hand',
    name: 'Both-Sides Hand Design',
    scope: 'Both Sides (Front & Back)',
    scopeDetails: 'Applied to both palms AND both dorsal hands for balanced 360-degree coverage',
    description: 'Complete front and back coverage with harmonized diagonal floral bels and matching knuckle bands.',
    image: '/images/mehndi/arabic-mehndi.webp',
    coverage: 'Front & Back of Both Hands',
    price: 45,
    durationMinutes: 30,
    serviceId: 'arabic-mehndi',
    compatibleStyles: ['arabic', 'traditional']
  },
  {
    id: 'half-hand',
    name: 'Half-Hand Design',
    scope: 'Both Hands (Half Length)',
    scopeDetails: 'Applied to lower palm or mid-hand up to fingertips',
    description: 'Clean mid-hand composition leaving negative space around the wrist for bangles and watches.',
    image: '/images/mehndi/minimalist-fine-line.webp',
    coverage: 'Mid-Palm to Fingertips (Both Hands)',
    price: 25,
    durationMinutes: 20,
    serviceId: 'mehndi-classic-design',
    compatibleStyles: ['minimal', 'arabic']
  },
  {
    id: 'full-hand',
    name: 'Full-Hand Design',
    scope: 'Full Forearms & Palms',
    scopeDetails: 'Full coverage spanning from mid-forearm/elbow down to all fingertips on both hands',
    description: 'Elbow-to-fingertip dense artisan coverage with continuous storytelling jaali and sacred symbolism.',
    image: '/images/mehndi/bridal-full-hand.webp',
    coverage: 'Forearm to Fingertips (Both Arms)',
    price: 180,
    durationMinutes: 120,
    serviceId: 'bridal-mehndi',
    compatibleStyles: ['traditional', 'arabic']
  },
  {
    id: 'finger-mehndi',
    name: 'Finger Mehndi',
    scope: 'All 10 Fingers',
    scopeDetails: 'Applied across all 10 fingers while keeping the palm completely clean',
    description: 'Intricate jewelry-inspired lace gloves, chevron bands, and midi-ring imitations.',
    image: '/images/mehndi/finger-rings-lace.webp',
    coverage: 'Knuckles to Cuticles (All 10 Fingers)',
    price: 25,
    durationMinutes: 20,
    serviceId: 'mehndi-classic-design',
    compatibleStyles: ['minimal']
  },
  {
    id: 'arabic-hand',
    name: 'Arabic Hand Design',
    scope: 'Both Hands (Diagonal)',
    scopeDetails: 'Graceful diagonal flow from wrist across both palms or dorsals to index finger',
    description: 'Bold flowing contours, delicate petal shading, and modern breathing room.',
    image: '/images/mehndi/arabic-floral-bel.webp',
    coverage: 'Forearm to Index Fingertip (Both Hands)',
    price: 45,
    durationMinutes: 30,
    serviceId: 'arabic-mehndi',
    compatibleStyles: ['arabic']
  },
  {
    id: 'traditional-indian-hand',
    name: 'Traditional Indian Design',
    scope: 'Both Hands (Wrist to Finger)',
    scopeDetails: 'Full palm and wrist coverage on both hands in authentic Rajasthani heritage style',
    description: 'Fine checkwork mesh, peacock crests, jhumkas, and balanced Marwari symmetry.',
    image: '/images/mehndi/indian-traditional-jaal.webp',
    coverage: 'Palm to 3-Inch Forearm (Both Hands)',
    price: 35,
    durationMinutes: 25,
    serviceId: 'party-mehndi',
    compatibleStyles: ['traditional']
  },
  {
    id: 'intricate-bridal-hand',
    name: 'Intricate Bridal Hand Design',
    scope: 'Full Bridal Arms (Both Sides)',
    scopeDetails: 'Master bridal couture spanning full forearms, palms, and dorsal hands on both arms',
    description: 'Royal South-Asian bridal masterpiece with custom storytelling crests and clove steam treatment.',
    image: '/images/mehndi/bridal-mehndi-hero.webp',
    coverage: 'Elbow to Fingertip 360° (Both Arms)',
    price: 180,
    durationMinutes: 120,
    serviceId: 'bridal-mehndi',
    compatibleStyles: ['traditional']
  }
];

export const FEET_DESIGN_OPTIONS = [
  {
    id: 'front-foot',
    name: 'Front-Foot Design',
    scope: 'Both Feet (Instep)',
    scopeDetails: 'Applied to the top instep and arches of both feet',
    description: 'Botanical side arch vines and floral medallions framing open-toed festive sandals.',
    image: '/images/mehndi/bridal-feet-anklet.webp',
    coverage: 'Instep & Arches (Both Feet)',
    price: 35,
    durationMinutes: 25,
    serviceId: 'party-mehndi'
  },
  {
    id: 'back-foot',
    name: 'Back-Foot Design',
    scope: 'Both Feet (Heels & Ankles)',
    scopeDetails: 'Applied to the back heels, Achilles tendon, and lateral ankle curves',
    description: 'Curved heel medallions and rising tendon tendrils made for slingbacks and juttis.',
    image: '/images/mehndi/bridal-feet-anklet.webp',
    coverage: 'Heel Curve & Ankle Bone (Both Feet)',
    price: 35,
    durationMinutes: 25,
    serviceId: 'party-mehndi'
  },
  {
    id: 'both-feet',
    name: 'Both-Feet Design',
    scope: 'Both Feet (Full Instep & Toes)',
    scopeDetails: 'Complete decorative coverage for the tops, sides, and toes of both feet',
    description: 'Harmonious dual foot adornment with matching toe rings and floral crests.',
    image: '/images/mehndi/bridal-feet-anklet.webp',
    coverage: 'Instep, Sides & All Toes (Both Feet)',
    price: 45,
    durationMinutes: 30,
    serviceId: 'arabic-mehndi'
  },
  {
    id: 'half-foot',
    name: 'Half-Foot Design',
    scope: 'Both Anklets Only',
    scopeDetails: 'Delicate band encircling the ankles like jewelry',
    description: 'Petite anklet payal chain encircling both ankle bones with floating bells.',
    image: '/images/mehndi/minimalist-fine-line.webp',
    coverage: 'Ankle Bone Circling (Both Feet)',
    price: 25,
    durationMinutes: 20,
    serviceId: 'mehndi-classic-design'
  },
  {
    id: 'full-foot',
    name: 'Full-Foot Design',
    scope: 'Mid-Calf to Toes (Both Legs)',
    scopeDetails: 'Lavish coverage from lower calf down to all toes on both legs',
    description: 'Dense ceremonial bridal net imitating silver ghunghroo bells and intricate toe bands.',
    image: '/images/mehndi/bridal-feet-anklet.webp',
    coverage: 'Mid-Calf to All Toes (Both Feet)',
    price: 180,
    durationMinutes: 120,
    serviceId: 'bridal-mehndi'
  },
  {
    id: 'bridal-feet',
    name: 'Bridal Feet Design',
    scope: 'Royal Bridal Payal & Toes',
    scopeDetails: 'Royal bridal couture covering ankles, insteps, heels, and intricate toe rings',
    description: 'Full bridal foot couture with royal payal bells, lotus crests, and dark mahogany stain seal.',
    image: '/images/mehndi/bridal-feet-anklet.webp',
    coverage: 'Ankles, Instep, Heel & Toes (Both Feet)',
    price: 180,
    durationMinutes: 120,
    serviceId: 'bridal-mehndi'
  },
  {
    id: 'arabic-feet',
    name: 'Arabic Feet Design',
    scope: 'Both Feet (Flowing Vine)',
    scopeDetails: 'Diagonal flowing Arabic bel trailing across the lateral side of both feet',
    description: 'Bold diagonal contours with soft shaded leaf clusters elongating the foot.',
    image: '/images/mehndi/arabic-floral-bel.webp',
    coverage: 'Lateral Side Edge & Big Toe (Both Feet)',
    price: 45,
    durationMinutes: 30,
    serviceId: 'arabic-mehndi'
  },
  {
    id: 'minimal-feet',
    name: 'Minimal Feet Design',
    scope: 'Both Feet (Delicate Accent)',
    scopeDetails: 'Subtle micro-sprays on outer ankle bone and toe rings',
    description: 'Understated single-stem vine that hugs the ankle bone, perfect for reception gowns.',
    image: '/images/mehndi/minimalist-fine-line.webp',
    coverage: 'Ankle Accent & Toe Caps (Both Feet)',
    price: 25,
    durationMinutes: 20,
    serviceId: 'mehndi-classic-design'
  }
];

export const COMPLEXITY_LEVELS = [
  { id: 'simple', label: 'Simple / Delicate', description: 'Clean lines, quick drying, minimal density' },
  { id: 'medium', label: 'Medium / Balanced', description: 'Flowing motifs with shaded negative space' },
  { id: 'intricate', label: 'Intricate / Grand Couture', description: 'High-density micro-lines, storytelling jaal' }
];

export const COVERAGE_LEVELS = [
  { id: 'minimal', label: 'Minimal Coverage', description: 'Accents & targeted wrist/palm placements' },
  { id: 'moderate', label: 'Moderate Coverage', description: 'Standard hand or foot coverage' },
  { id: 'extensive', label: 'Extensive / Full Coverage', description: 'Full forearms and/or mid-calf coverage' }
];

export const STYLE_OPTIONS = [
  { id: 'traditional', label: 'Traditional Indian Heritage', description: 'Paisleys, peacocks, jhumkas, and check jaal' },
  { id: 'arabic', label: 'Arabic Flowing Floral', description: 'Bold diagonal contours, shaded petals, open space' },
  { id: 'indo-arabic', label: 'Indo-Arabic Fusion', description: 'Bold Arabic architecture with fine Indian mesh' }
];

/**
 * Calculates live package pricing, duration, and discounts based strictly on actual catalog data.
 * Rule: Bridal Mehndi ($180 CAD, 120 min) already covers full forearms AND feet!
 * If both full-hand bridal ($180) and bridal-feet ($180) are selected, the existing catalog service is Bridal Mehndi ($180 CAD).
 */
export function calculatePackageSummary({
  occasion,
  selectedHandIds = [],
  selectedFeetIds = [],
  complexity = 'medium',
  coverage = 'moderate',
  style = 'traditional',
  matchingHandAndFeet = false,
  isBridal = false
}) {
  const selectedHands = HAND_DESIGN_OPTIONS.filter((h) => selectedHandIds.includes(h.id));
  const selectedFeet = FEET_DESIGN_OPTIONS.filter((f) => selectedFeetIds.includes(f.id));

  // Determine if both full bridal hands and bridal feet are selected
  const hasBridalHand = selectedHands.some((h) => h.id === 'full-hand' || h.id === 'intricate-bridal-hand');
  const hasBridalFeet = selectedFeet.some((f) => f.id === 'full-foot' || f.id === 'bridal-feet');

  let rawTotal = 0;
  let totalDurationMinutes = 0;
  let discountAmount = 0;
  let discountLabel = null;

  if (hasBridalHand && hasBridalFeet) {
    // The master catalog Bridal Mehndi service is $180 CAD and 120 min covering both arms & feet!
    rawTotal = 360;
    discountAmount = 180;
    discountLabel = 'Master Full Bridal Suite Bundle (Arms & Feet Included in $180 CAD Bridal Service)';
    totalDurationMinutes = 120;
  } else {
    // Sum unique selected services
    const serviceMap = new Map();

    selectedHands.forEach((h) => {
      rawTotal += h.price;
      totalDurationMinutes += h.durationMinutes;
      serviceMap.set(h.serviceId, Math.max(serviceMap.get(h.serviceId) || 0, h.price));
    });

    selectedFeet.forEach((f) => {
      rawTotal += f.price;
      totalDurationMinutes += f.durationMinutes;
      serviceMap.set(f.serviceId, Math.max(serviceMap.get(f.serviceId) || 0, f.price));
    });

    // If customer selected matching hands & feet and 2+ designs are active, apply approved bundle discount if applicable
    if (matchingHandAndFeet && selectedHands.length > 0 && selectedFeet.length > 0) {
      discountAmount = 10;
      discountLabel = 'Harmonized Hand & Feet Pattern Pairing (-$10 CAD)';
    }
  }

  const finalPrice = Math.max(0, rawTotal - discountAmount);

  // Format duration into readable display
  let durationDisplay = '0 min';
  if (totalDurationMinutes >= 60) {
    const hours = Math.floor(totalDurationMinutes / 60);
    const mins = totalDurationMinutes % 60;
    durationDisplay = mins > 0 ? `Approx. ${hours}h ${mins}m` : `Approx. ${hours} hours`;
  } else if (totalDurationMinutes > 0) {
    durationDisplay = `Approx. ${totalDurationMinutes} mins`;
  } else {
    durationDisplay = 'Time to be confirmed';
  }

  // Primary linked salon catalogue service
  let primaryServiceId = 'mehndi-classic-design';
  if (hasBridalHand || hasBridalFeet || occasion?.id === 'bridal') {
    primaryServiceId = 'bridal-mehndi';
  } else if (selectedHands.some((h) => h.serviceId === 'arabic-mehndi') || selectedFeet.some((f) => f.serviceId === 'arabic-mehndi')) {
    primaryServiceId = 'arabic-mehndi';
  } else if (selectedHands.some((h) => h.serviceId === 'party-mehndi') || selectedFeet.some((f) => f.serviceId === 'party-mehndi')) {
    primaryServiceId = 'party-mehndi';
  }

  return {
    itemCount: selectedHands.length + selectedFeet.length,
    rawTotal,
    discountAmount,
    discountLabel,
    finalPrice,
    finalPriceDisplay: finalPrice > 0 ? `$${finalPrice} CAD` : 'Price to be confirmed',
    totalDurationMinutes,
    durationDisplay,
    selectedHands,
    selectedFeet,
    primaryServiceId,
    isBridal: isBridal || occasion?.id === 'bridal' || hasBridalHand || hasBridalFeet
  };
}
