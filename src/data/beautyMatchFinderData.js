/**
 * GLAM GIRL BY JANKI — The Beauty Match Finder Engine
 * Data model, question structure, scoring algorithms, and recommendation generator.
 *
 * Strict salon brand palette:
 * - Deep Black: #10110F
 * - Forest Green: #263D2B
 * - Olive: #465640
 * - Sage: #A8B5A0
 * - Warm Cream: #F7F4ED
 *
 * Strictly NO gold or cyan.
 */

import { ALL_SERVICES } from './servicesData.js';

// 8 Authorized Categories supported by actual salon catalog
export const BEAUTY_MATCH_CATEGORIES = [
  {
    id: 'hair',
    categoryKey: 'hair-cut',
    studioCategoryId: 'hair-services',
    label: 'Hair',
    iconName: 'Scissors',
    subtitle: 'Signature haircuts, layer cutting & reshaping',
    serviceCount: 4,
    priceRange: '$35 – $65 CAD'
  },
  {
    id: 'hair-colour',
    categoryKey: 'hair-color',
    studioCategoryId: 'hair-colour',
    label: 'Hair Colour',
    iconName: 'Droplets',
    subtitle: 'Hand-painted balayage, highlights & full rich tones',
    serviceCount: 5,
    priceRange: '$60 – $195 CAD'
  },
  {
    id: 'skin-care',
    categoryKey: 'facial',
    studioCategoryId: 'skin-care',
    label: 'Skin Care & Facials',
    iconName: 'Sparkles',
    subtitle: 'Brightening, detox, fruit & 24k golden radiance facials',
    serviceCount: 10,
    priceRange: '$35 – $125 CAD'
  },
  {
    id: 'makeup',
    categoryKey: 'makeup',
    studioCategoryId: 'makeup',
    label: 'Makeup',
    iconName: 'Wand2',
    subtitle: 'Royal bridal, red-carpet, engagement & celebration glam',
    serviceCount: 6,
    priceRange: '$85 – $250 CAD'
  },
  {
    id: 'nails',
    categoryKey: 'nails',
    studioCategoryId: 'nail-art',
    label: 'Nails & Nail Art',
    iconName: 'Sparkle',
    subtitle: 'Gel extensions, French manicures & custom nail art',
    serviceCount: 12,
    priceRange: '$15 – $95 CAD'
  },
  {
    id: 'mehndi',
    categoryKey: 'henna',
    studioCategoryId: 'mehndi',
    label: 'Mehndi',
    iconName: 'Feather',
    subtitle: '100% organic Rajasthani bridal, Arabic & festive henna',
    serviceCount: 4,
    priceRange: '$25 – $180 CAD'
  },
  {
    id: 'waxing',
    categoryKey: 'waxing',
    studioCategoryId: 'hair-services',
    label: 'Waxing',
    iconName: 'Sparkles',
    subtitle: 'Ultra-gentle Italian strip & stripless silky hair removal',
    serviceCount: 19,
    priceRange: '$8 – $55 CAD'
  },
  {
    id: 'hairstyling',
    categoryKey: 'hairstyling',
    studioCategoryId: 'hair-services',
    label: 'Styling',
    iconName: 'Crown',
    subtitle: 'Royal bridal updos, party Hollywood curls & blowouts',
    serviceCount: 4,
    priceRange: '$45 – $110 CAD'
  }
];

// Occasions for Question 2
export const OCCASIONS = [
  {
    id: 'wedding',
    label: 'Wedding or Bridal Event',
    subtitle: 'Bespoke couture for brides, wedding entourage & receptions',
    keywords: ['bridal', 'bride', 'shringar', 'wedding', 'royal', 'white-dress', 'special']
  },
  {
    id: 'party',
    label: 'Party or Celebration',
    subtitle: 'Evening galas, cocktail soirees & glamorous dinners',
    keywords: ['party', 'glam', 'glow', 'rani', 'highlights', 'layer', 'manicure']
  },
  {
    id: 'festival',
    label: 'Festival',
    subtitle: 'Diwali, Eid, Karwa Chauth, Navratri & seasonal traditions',
    keywords: ['mehndi', 'henna', 'facial', 'glow', 'colour', 'kesariya', 'gold']
  },
  {
    id: 'birthday',
    label: 'Birthday',
    subtitle: 'Special milestone pampering to look and feel radiant',
    keywords: ['signature', 'glow', 'party', 'extensions', 'balayage', 'layer']
  },
  {
    id: 'everyday',
    label: 'Everyday Beauty',
    subtitle: 'Effortless maintenance, clean lines & elevated daily polish',
    keywords: ['classic', 'trim', 'express', 'touch-up', 'manicure', 'blow-dry', 'waxing']
  },
  {
    id: 'self-care',
    label: 'Self-Care Day',
    subtitle: 'Restorative wellness, stress-relief & luxurious pampering',
    keywords: ['spa', 'herbal', 'relaxation', 'deep-cleansing', 'pedicure', 'soothing']
  },
  {
    id: 'casual',
    label: 'No Special Occasion',
    subtitle: 'Treating yourself to professional beauty simply because you deserve it',
    keywords: ['classic', 'signature', 'glow', 'manicure', 'haircut']
  }
];

// Category-specific Look Options for Question 3
export const LOOK_OPTIONS_BY_CATEGORY = {
  hair: [
    { id: 'natural', label: 'Natural and effortless', description: 'Clean weightless silhouette, wash-and-wear health, soft ends' },
    { id: 'elegant', label: 'Elegant and polished', description: 'Refined symmetry, tailored face-framing layers, smooth movement' },
    { id: 'bold', label: 'Bold and glamorous', description: 'High-impact volume, textured dramatic layers, statement shaping' },
    { id: 'trendy', label: 'Trendy and creative', description: 'Modern butterfly layers, curtain bangs, chic curtain cuts' },
    { id: 'relaxing', label: 'Relaxing and refreshing', description: 'Restorative trim, cleansing consultation, stress-free cut' }
  ],
  'hair-colour': [
    { id: 'natural', label: 'Natural and effortless', description: 'Sun-kissed melted blend, subtle dimensional soft ribbons' },
    { id: 'elegant', label: 'Elegant and polished', description: 'Luminous tone, seamless uniform gloss, pristine reflective shine' },
    { id: 'bold', label: 'Bold and glamorous', description: 'High-contrast balayage, intense depth, head-turning transformation' },
    { id: 'trendy', label: 'Trendy and creative', description: 'Fashion-forward placement, multi-tonal light reflections' },
    { id: 'relaxing', label: 'Relaxing and refreshing', description: 'Pristine root touch-up, gloss refreshment, conditioning care' }
  ],
  'skin-care': [
    { id: 'natural', label: 'Natural and effortless', description: 'Pore-clarifying purity, fresh botanical glow, daily hydration' },
    { id: 'elegant', label: 'Elegant and polished', description: 'Porcelain smoothness, balanced texture, unified tone' },
    { id: 'bold', label: 'Bold and glamorous', description: 'Red-carpet radiance, 24k golden illumination, diamond sheen' },
    { id: 'trendy', label: 'Trendy and creative', description: 'Active brightening infusion, revitalizing oxygen therapy' },
    { id: 'relaxing', label: 'Relaxing and refreshing', description: 'Deep soothing acupressure, calming herbal steam, detox' }
  ],
  makeup: [
    { id: 'natural', label: 'Natural and effortless', description: 'Dewy glass skin, soft neutral tones, breathable finish' },
    { id: 'elegant', label: 'Elegant and polished', description: 'Sculpted contours, timeless soft smokey eyes, refined lips' },
    { id: 'bold', label: 'Bold and glamorous', description: 'High-definition coverage, dramatic winged eyes, royal bridal couture' },
    { id: 'trendy', label: 'Trendy and creative', description: 'Contemporary editorial shimmer, crisp modern definition' },
    { id: 'relaxing', label: 'Relaxing and refreshing', description: 'Lightweight soothing complexion prep, fresh radiant tint' }
  ],
  nails: [
    { id: 'natural', label: 'Natural and effortless', description: 'Clean buffed nails, healthy cuticle care, delicate nude tint' },
    { id: 'elegant', label: 'Elegant and polished', description: 'Timeless French tips, crisp architectural edges, glassy topcoat' },
    { id: 'bold', label: 'Bold and glamorous', description: 'Sculpted extensions, jewel embellishments, striking length' },
    { id: 'trendy', label: 'Trendy and creative', description: 'Bespoke hand-painted nail art, chrome sheen, artistic accents' },
    { id: 'relaxing', label: 'Relaxing and refreshing', description: 'Nourishing spa soak, exfoliation scrub, relaxing hand massage' }
  ],
  mehndi: [
    { id: 'natural', label: 'Natural and effortless', description: 'Minimalist mandala, delicate finger lace, airy negative space' },
    { id: 'elegant', label: 'Elegant and polished', description: 'Flowing Arabic vines, intricate shading, graceful symmetry' },
    { id: 'bold', label: 'Bold and glamorous', description: 'Full traditional Rajasthani bridal cuff, dense intricate motifs' },
    { id: 'trendy', label: 'Trendy and creative', description: 'Fusion contemporary geometry, modern floral symmetry' },
    { id: 'relaxing', label: 'Relaxing and refreshing', description: 'Soothing organic eucalyptus henna therapy and aromatics' }
  ],
  waxing: [
    { id: 'natural', label: 'Natural and effortless', description: 'Clean defined brow arch and upper lip precision touch-up' },
    { id: 'elegant', label: 'Elegant and polished', description: 'Velvety smooth arms and silky half legs for sleek poise' },
    { id: 'bold', label: 'Bold and glamorous', description: 'Head-to-toe full-body silky smoothness and pristine confidence' },
    { id: 'trendy', label: 'Trendy and creative', description: 'Sharply sculpted facial profile and flawless makeup base' },
    { id: 'relaxing', label: 'Relaxing and refreshing', description: 'Ultra-gentle Italian waxing with botanical post-soothing lotion' }
  ],
  hairstyling: [
    { id: 'natural', label: 'Natural and effortless', description: 'Airy salon blowout, bouncy lightweight movement, natural shine' },
    { id: 'elegant', label: 'Elegant and polished', description: 'Pristine structured updo, classic chignon, heirloom hair setting' },
    { id: 'bold', label: 'Bold and glamorous', description: 'Hollywood waves, voluminous textured high ponytail, red-carpet hold' },
    { id: 'trendy', label: 'Trendy and creative', description: 'Bohemian textured braid, half-up twisted curls, modern aesthetic' },
    { id: 'relaxing', label: 'Relaxing and refreshing', description: 'Revitalizing wash, tension-melting scalp blow dry & style' }
  ]
};

// Category-specific Preferred Results for Question 4
export const RESULT_OPTIONS_BY_CATEGORY = {
  hair: [
    { id: 'layering', label: 'Dimensional Layering & Movement', targetIds: ['meera-layer-cut'] },
    { id: 'signature', label: 'Total Signature Restyle & Face Framing', targetIds: ['noor-signature-haircut'] },
    { id: 'maintenance', label: 'Clean Healthy Ends & Split End Trim', targetIds: ['classic-trim'] },
    { id: 'length', label: 'Long Hair Reshaping & Density Balancing', targetIds: ['long-hair-cut'] }
  ],
  'hair-colour': [
    { id: 'balayage', label: 'Hand-Painted Dimensional Balayage', targetIds: ['noor-balayage'] },
    { id: 'highlights', label: 'Multidimensional Contrast Highlights', targetIds: ['highlights'] },
    { id: 'full', label: 'Rich Full-Coverage Colour Transformation', targetIds: ['full-colour', 'kesariya-hair-colour'] },
    { id: 'root', label: 'Targeted Root Refresh & Regrowth Touch-up', targetIds: ['root-touch-up'] }
  ],
  'skin-care': [
    { id: 'royal-glow', label: 'Special Signature Red Carpet Facial', targetIds: ['special-glam-girl-facial', 'diamond-dust'] },
    { id: 'brightening', label: 'Advanced Brightening & Skin Tone Evening', targetIds: ['advanced-brightening-facial', 'oxy-glow'] },
    { id: 'gold-glow', label: 'Bridal Golden Glow & Radiance', targetIds: ['golden-glow', 'fruit-facial'] },
    { id: 'detox', label: 'Deep Pore Cleansing & Clarifying Detox', targetIds: ['deep-cleansing-facial', 'herbal-facial'] },
    { id: 'express', label: 'Quick Rejuvenation & Gentle Exfoliation', targetIds: ['mini-facial-exfoliation', 'express-facial'] }
  ],
  makeup: [
    { id: 'bridal', label: 'Royal Traditional Bridal Makeover', targetIds: ['shringar-bridal-makeup'] },
    { id: 'white-dress', label: 'Contemporary White Dress Couture Bride', targetIds: ['white-dress-bride'] },
    { id: 'side-function', label: 'Bridal Sangeet & Side Function Glam', targetIds: ['bridal-side-functions'] },
    { id: 'engagement', label: 'Polished Engagement & Reception Glamour', targetIds: ['engagement-makeup'] },
    { id: 'signature', label: 'Signature Red-Carpet High-Definition Look', targetIds: ['noor-signature-makeup'] },
    { id: 'party', label: 'Celebration Evening Party Glamour', targetIds: ['party-makeup'] }
  ],
  nails: [
    { id: 'extensions', label: 'Sculpted Gel or Acrylic Nail Extensions', targetIds: ['gel-nail-extensions', 'acrylic-nails', 'nail-extensions'] },
    { id: 'custom-art', label: 'Creative Hand-Painted Custom Nail Art', targetIds: ['nail-art-design'] },
    { id: 'gel-care', label: 'Long-Lasting High-Gloss Gel Mani or Pedi', targetIds: ['gel-manicure', 'gel-pedicure'] },
    { id: 'french', label: 'Chic Timeless French Manicure', targetIds: ['french-manicure'] },
    { id: 'spa', label: 'Complete Rejuvenating Spa Manicure & Pedicure', targetIds: ['spa-manicure-pedicure'] },
    { id: 'classic', label: 'Essential Classic Maintenance & Polish', targetIds: ['classic-manicure', 'classic-pedicure', 'nail-polish-application'] }
  ],
  mehndi: [
    { id: 'bridal', label: 'Intricate Royal Bridal Henna to Forearms', targetIds: ['bridal-mehndi'] },
    { id: 'arabic', label: 'Graceful Flowing Arabic Motifs & Florals', targetIds: ['arabic-mehndi'] },
    { id: 'party', label: 'Festive Party Henna for Hands & Palms', targetIds: ['party-mehndi'] },
    { id: 'classic', label: 'Delicate Minimalist Classic Henna Accent', targetIds: ['mehndi-classic-design'] }
  ],
  waxing: [
    { id: 'full-body', label: 'Complete Silky Smooth Full Body Experience', targetIds: ['full-legs-waxing', 'full-arms-waxing', 'full-front-waxing', 'full-back-waxing'] },
    { id: 'legs-arms', label: 'Essential Silky Legs & Arms Smoothness', targetIds: ['full-legs-waxing', 'lower-half-legs-waxing', 'full-arms-waxing', 'half-arms-waxing'] },
    { id: 'face', label: 'Defined Full Facial Waxing Profile', targetIds: ['full-face-waxing', 'eyebrows-waxing'] },
    { id: 'targeted', label: 'Quick Targeted Gentle Touch-Up', targetIds: ['under-arms-waxing', 'upper-lip-waxing', 'chin-waxing'] }
  ],
  hairstyling: [
    { id: 'bridal-updo', label: 'Architectural Royal Bridal Updo & Setting', targetIds: ['bridal-hair-styling'] },
    { id: 'party-styling', label: 'Voluminous Party Waves & Statement Curls', targetIds: ['party-hair-styling'] },
    { id: 'signature-style', label: 'Rani Signature Glamour Styling', targetIds: ['rani-hair-styling'] },
    { id: 'blowout', label: 'High-Shine Bouncy Blowout & Setting', targetIds: ['blow-dry-styling'] }
  ]
};

// Question 5: Duration Preferences
export const DURATION_OPTIONS = [
  {
    id: 'quick',
    label: 'Quick appointment',
    description: 'Under 45 minutes — efficient, focused, high-precision treatment',
    maxMinutes: 45,
    minMinutes: 0
  },
  {
    id: 'one-hour',
    label: 'Around one hour',
    description: '45 to 75 minutes — ideal balance of deep care and thorough styling',
    maxMinutes: 75,
    minMinutes: 40
  },
  {
    id: 'two-hours',
    label: 'Two hours or more',
    description: '80+ minutes — luxurious immersive transformations and bridal rituals',
    maxMinutes: 999,
    minMinutes: 75
  },
  {
    id: 'flexible',
    label: 'Flexible — recommend what suits me',
    description: 'Prioritize result excellence over duration constraints',
    maxMinutes: 999,
    minMinutes: 0
  }
];

// Question 6: CAD Budget Ranges
export const BUDGET_OPTIONS = [
  {
    id: 'under-50',
    label: 'Under $50 CAD',
    description: 'Affordable maintenance, precision trims, brow waxing & mini rituals',
    minPrice: 0,
    maxPrice: 50
  },
  {
    id: '50-100',
    label: '$50 to $100 CAD',
    description: 'Signature cuts, classic facials, gel manicures, party hair styling',
    minPrice: 50,
    maxPrice: 100
  },
  {
    id: '100-180',
    label: '$100 to $180 CAD',
    description: 'Highlights, brightening facials, engagement glam, spa packages',
    minPrice: 100,
    maxPrice: 180
  },
  {
    id: 'above-180',
    label: '$180+ CAD',
    description: 'Balayage master artistry, royal bridal makeup, bespoke bridal henna',
    minPrice: 180,
    maxPrice: 9999
  },
  {
    id: 'flexible',
    label: "I'm flexible",
    description: 'Recommend the highest quality service tailored to my dream look',
    minPrice: 0,
    maxPrice: 9999
  }
];

// Total 6 questions metadata
export const QUIZ_QUESTIONS = [
  {
    id: 'category',
    stepNumber: 1,
    title: 'What would you like to customize?',
    subtitle: 'Select one of our specialized salon artistry departments.',
    field: 'categoryId'
  },
  {
    id: 'occasion',
    stepNumber: 2,
    title: 'What is your occasion?',
    subtitle: 'Tell us where you are headed so we can tailor the styling appropriately.',
    field: 'occasionId'
  },
  {
    id: 'look',
    stepNumber: 3,
    title: 'What look are you dreaming of?',
    subtitle: 'Select the visual aesthetic that resonates with your personal energy.',
    field: 'lookId'
  },
  {
    id: 'result',
    stepNumber: 4,
    title: 'What is your preferred result?',
    subtitle: 'Choose the specific outcome you want our artists to achieve.',
    field: 'resultId'
  },
  {
    id: 'time',
    stepNumber: 5,
    title: 'How much time would you like to spend?',
    subtitle: 'We respect your schedule and match real service durations from our catalog.',
    field: 'timeId'
  },
  {
    id: 'budget',
    stepNumber: 6,
    title: 'What is your preferred budget?',
    subtitle: 'Transparent CAD pricing directly aligned with our published salon menu.',
    field: 'budgetId'
  }
];

export function parseDurationMinutes(val) {
  if (typeof val === 'number' && !isNaN(val) && val > 0) return val;
  if (!val) return 45;
  const str = String(val).toLowerCase().trim();
  let total = 0;
  const hourMatch = str.match(/(\d+)\s*(?:hr|hour|h\b)/i);
  const minMatch = str.match(/(\d+)\s*(?:min|m\b)/i);
  if (hourMatch) total += parseInt(hourMatch[1], 10) * 60;
  if (minMatch) total += parseInt(minMatch[1], 10);
  if (total > 0) return total;
  const numOnly = parseInt(str.replace(/[^0-9]/g, ''), 10);
  return isNaN(numOnly) || numOnly <= 0 ? 45 : numOnly;
}

/**
 * Intelligent Recommendation Matching Algorithm
 * Evaluates candidate services in the selected category and returns up to 3 highest-ranking matches.
 */
export function findBeautyMatches(answers, allServices = ALL_SERVICES) {
  if (!answers || !answers.categoryId) {
    return {
      matches: [],
      reasoning: 'Please select a service category to begin finding your beauty matches.'
    };
  }

  const selectedCategoryObj = BEAUTY_MATCH_CATEGORIES.find(c => c.id === answers.categoryId);
  if (!selectedCategoryObj) {
    return { matches: [], reasoning: 'Selected category is not recognized.' };
  }

  const categoryKey = selectedCategoryObj.categoryKey;

  // Filter only active catalog services matching this category
  const candidateServices = allServices.filter(
    s => s.category === categoryKey && s.active !== false
  );

  if (candidateServices.length === 0) {
    return {
      matches: [],
      reasoning: `No services currently active in the ${selectedCategoryObj.label} department.`
    };
  }

  // Selected Option Metadata
  const occasionObj = OCCASIONS.find(o => o.id === answers.occasionId) || OCCASIONS[0];
  const resultList = RESULT_OPTIONS_BY_CATEGORY[answers.categoryId] || [];
  const resultObj = resultList.find(r => r.id === answers.resultId);
  const durationObj = DURATION_OPTIONS.find(d => d.id === answers.timeId) || DURATION_OPTIONS[3];
  const budgetObj = BUDGET_OPTIONS.find(b => b.id === answers.budgetId) || BUDGET_OPTIONS[4];

  // Score each candidate service
  const scored = candidateServices.map(service => {
    let score = 20; // Base score
    const matchReasons = [];

    const servicePrice = typeof service.price === 'number' ? service.price : parseFloat(String(service.price).replace(/[^0-9.]/g, '')) || 0;
    const serviceDurationMin = parseDurationMinutes(service.duration);
    const searchString = `${service.name} ${service.description || ''} ${(service.features || []).join(' ')} ${(service.whatsIncluded || []).join(' ')}`.toLowerCase();

    // 1. Result Match (Highest Weight: +35 points)
    if (resultObj && Array.isArray(resultObj.targetIds)) {
      if (resultObj.targetIds.includes(service.id) || resultObj.targetIds.includes(service.slug)) {
        score += 35;
        matchReasons.push(`Direct match for your desired ${resultObj.label.toLowerCase()}`);
      } else {
        // Partial text similarity
        const resultWords = resultObj.label.toLowerCase().split(/\s+/).filter(w => w.length > 3);
        const hasWordMatch = resultWords.some(w => searchString.includes(w));
        if (hasWordMatch) {
          score += 15;
          matchReasons.push(`Delivers elements of ${resultObj.label.toLowerCase()}`);
        }
      }
    }

    // 2. Occasion Match (+25 points)
    let occasionMatched = false;
    if (occasionObj.keywords && occasionObj.keywords.length > 0) {
      for (const kw of occasionObj.keywords) {
        if (searchString.includes(kw)) {
          score += 25;
          occasionMatched = true;
          matchReasons.push(`Ideal for your ${occasionObj.label}`);
          break;
        }
      }
    }
    if (!occasionMatched && answers.occasionId === 'casual') {
      score += 15;
    }

    // 3. Look & Aesthetic Match (+20 points)
    const lookId = answers.lookId;
    if (lookId === 'natural' && (searchString.includes('natural') || searchString.includes('clean') || searchString.includes('classic') || searchString.includes('gentle'))) {
      score += 20;
      matchReasons.push('Emphasizes effortless, natural elegance');
    } else if (lookId === 'bold' && (searchString.includes('dramatic') || searchString.includes('bold') || searchString.includes('glam') || searchString.includes('royal') || searchString.includes('couture') || searchString.includes('balayage'))) {
      score += 20;
      matchReasons.push('Delivers high-impact glamour and vibrant definition');
    } else if (lookId === 'elegant' && (searchString.includes('refined') || searchString.includes('elegant') || searchString.includes('french') || searchString.includes('gold') || searchString.includes('layer'))) {
      score += 20;
      matchReasons.push('Tailored for a sophisticated, polished finish');
    } else if (lookId === 'relaxing' && (searchString.includes('relax') || searchString.includes('spa') || searchString.includes('herbal') || searchString.includes('sooth') || searchString.includes('steam'))) {
      score += 20;
      matchReasons.push('Provides deeply calming, restorative care');
    } else if (lookId === 'trendy' && (searchString.includes('modern') || searchString.includes('trend') || searchString.includes('art') || searchString.includes('extension'))) {
      score += 20;
      matchReasons.push('Features trendsetting, contemporary artistry');
    }

    // 4. Duration Compatibility (+20 points or penalty)
    if (durationObj.id !== 'flexible') {
      if (serviceDurationMin >= durationObj.minMinutes && serviceDurationMin <= durationObj.maxMinutes) {
        score += 20;
        matchReasons.push(`Fits your ${durationObj.label.toLowerCase()} preference (${serviceDurationMin} mins)`);
      } else if (serviceDurationMin > durationObj.maxMinutes + 30) {
        score -= 25; // Heavily penalize service that exceeds requested time significantly
      } else if (serviceDurationMin < durationObj.minMinutes - 15) {
        score -= 10;
      }
    } else {
      score += 15;
      matchReasons.push(`Authentic duration: ${service.duration || 'Flexible'}`);
    }

    // 5. Budget Compatibility (+20 points or penalty)
    if (budgetObj.id !== 'flexible') {
      if (servicePrice >= budgetObj.minPrice && servicePrice <= budgetObj.maxPrice) {
        score += 20;
        matchReasons.push(`Matches your CAD budget ($${servicePrice} CAD)`);
      } else if (servicePrice > budgetObj.maxPrice + 35) {
        score -= 30; // Strongly penalize over-budget treatments
      } else if (servicePrice < budgetObj.minPrice - 20) {
        score -= 5;
      }
    } else {
      score += 15;
    }

    // Deduplicate match reasons
    const uniqueReasons = Array.from(new Set(matchReasons));

    return {
      service,
      score,
      servicePrice,
      serviceDurationMin,
      matchReasons: uniqueReasons
    };
  });

  // Filter out any service with a strictly negative score due to total incompatibility
  const viable = scored.filter(item => item.score > 25);

  // If strict filtering yields nothing (e.g. asking for $250 bridal service for under $50),
  // don't recommend unrelated fake services!
  if (viable.length === 0) {
    return {
      matches: [],
      reasoning: `We couldn't find a service in ${selectedCategoryObj.label} that matches both your exact time limit (${durationObj.label}) and budget range (${budgetObj.label}). Our signature services in this category require specialized artist time and quality botanicals. We recommend selecting "Flexible" on budget or duration to explore our complete options.`
    };
  }

  // Sort descending by score
  viable.sort((a, b) => b.score - a.score);

  // Take top 3 recommendations
  const topMatches = viable.slice(0, 3).map(item => {
    const s = item.service;
    
    // Fallback reasoning if none populated
    let explanation = item.matchReasons.join('. ');
    if (!explanation) {
      explanation = `Selected from our curated ${selectedCategoryObj.label} catalog for its exceptional craftsmanship and alignment with your ${occasionObj.label}.`;
    } else {
      explanation += '.';
    }

    return {
      id: s.id,
      slug: s.slug || s.id,
      name: s.name,
      category: s.category,
      categoryName: selectedCategoryObj.label,
      studioCategoryId: selectedCategoryObj.studioCategoryId,
      price: typeof s.price === 'number' ? s.price : parseFloat(String(s.price).replace(/[^0-9.]/g, '')) || null,
      priceDisplay: s.price !== undefined && s.price !== null ? `$${s.price} CAD` : 'Price to be confirmed',
      duration: s.duration || null,
      durationDisplay: s.durationDisplay || s.duration || 'Duration to be confirmed',
      image: s.image,
      description: s.description || '',
      matchScore: Math.min(99, Math.max(78, item.score)),
      whyItMatches: explanation
    };
  });

  return {
    matches: topMatches,
    reasoning: `Found ${topMatches.length} tailored service match${topMatches.length > 1 ? 'es' : ''} in ${selectedCategoryObj.label} for your ${occasionObj.label}.`
  };
}

/**
 * Helper to generate pre-filled consultation notes for Custom Studio integration
 */
export function formatBeautyMatchSummaryNotes(service, answers) {
  if (!answers) return '';
  const occasionObj = OCCASIONS.find(o => o.id === answers.occasionId);
  const lookList = LOOK_OPTIONS_BY_CATEGORY[answers.categoryId] || [];
  const lookObj = lookList.find(l => l.id === answers.lookId);
  const resultList = RESULT_OPTIONS_BY_CATEGORY[answers.categoryId] || [];
  const resultObj = resultList.find(r => r.id === answers.resultId);
  const durationObj = DURATION_OPTIONS.find(d => d.id === answers.timeId);
  const budgetObj = BUDGET_OPTIONS.find(b => b.id === answers.budgetId);

  const lines = [
    `[Beauty Match Finder Profile]`,
    occasionObj ? `• Occasion: ${occasionObj.label}` : null,
    lookObj ? `• Aesthetic: ${lookObj.label}` : null,
    resultObj ? `• Desired Result: ${resultObj.label}` : null,
    durationObj ? `• Schedule: ${durationObj.label}` : null,
    budgetObj ? `• Budget: ${budgetObj.label}` : null
  ].filter(Boolean);

  return lines.join('\n');
}

