// Lash Atelier Constants & Configuration
// GLAM GIRL BY JANKI — Ottawa Luxury Beauty Studio

export const LASH_STYLES = [
  {
    id: 'natural',
    name: 'Natural Classic',
    subtitle: '1:1 Contour Following Natural Lash Line',
    tagline: 'Effortless everyday definition',
    image: '/images/lashes/lash-lift-natural.jpg',
    description: 'A clean, refined enhancement that follows the natural growth pattern of your lash line. One extension is placed per natural lash for mascara-like definition without excess drama.',
    bestFor: ['Almond & round eyes', 'First-time lash clients', 'Professional & corporate environments'],
    recommendedCurl: 'C-Curl or J/B-Curl',
    recommendedLength: 'Subtle (8mm – 10mm)',
    recommendedFullness: 'Natural (1:1 Single Lash)',
    referenceNote: 'Inspiration visual reference only. Natural lash density dictates final finish.'
  },
  {
    id: 'wispy',
    name: 'Wispy Flutter',
    subtitle: 'Dimensional Spikes & Airy Feathering',
    tagline: 'Kim-K textured modern chic',
    image: '/images/lashes/lash-styles-wispy.jpg',
    description: 'Alternating lengths and strategically placed spikes that create a playful, dimensional, staggered effect. Mimics natural lash texture with airy, flirty volume.',
    bestFor: ['All eye shapes', 'Clients who love texture', 'Photo-ready bridal & event beauty'],
    recommendedCurl: 'D-Curl or C-Curl',
    recommendedLength: 'Medium (11mm – 13mm)',
    recommendedFullness: 'Light Volume (2D – 3D Fans)',
    referenceNote: 'Inspiration visual reference only. Spiking density is calibrated to individual eye curvature.'
  },
  {
    id: 'cat-eye',
    name: 'Cat-Eye Flare',
    subtitle: 'Shorter Inner Corners Flaring to Winged Edges',
    tagline: 'Sensual, elongated winged gaze',
    image: '/images/lashes/lash-styles-wispy.jpg',
    description: 'Gradual elongation from the inner tear duct to the outer corner, visually pulling the eyes outward into an elegant feline lift. Creates the illusion of liquid eyeliner wings.',
    bestFor: ['Round, close-set & almond eyes', 'Clients seeking an elongated silhouette'],
    recommendedCurl: 'C-Curl into D-Curl or L-Curl outer wings',
    recommendedLength: 'Medium to Statement (11mm – 14mm)',
    recommendedFullness: 'Light to Full Glamour',
    referenceNote: 'Inspiration visual reference only. Not recommended for downturned outer corners without artist modification.'
  },
  {
    id: 'doll-eye',
    name: 'Doll-Eye Openness',
    subtitle: 'Longest Extensions Centered Over the Pupil',
    tagline: 'Bright, wide-awake round symmetry',
    image: '/images/lashes/lash-atelier-hero.jpg',
    description: 'Focuses maximum length right in the center of the upper eyelid, creating a rounded, wide-awake, and youthful doe-eyed illusion. Opens up hooded or smaller eyes beautifully.',
    bestFor: ['Wide-set, hooded & monolid eyes', 'Clients wanting a youthful, alert appearance'],
    recommendedCurl: 'D-Curl (Maximum upward lift)',
    recommendedLength: 'Medium (11mm – 13mm centered)',
    recommendedFullness: 'Full Glamour (3D – 5D Fans)',
    referenceNote: 'Inspiration visual reference only. Center length is calibrated to brow-bone clearance.'
  },
  {
    id: 'hybrid',
    name: 'Textured Hybrid',
    subtitle: 'Balanced 50/50 Classic & Volume Fans',
    tagline: 'The sweet spot of fullness and texture',
    image: '/images/lashes/lash-styles-wispy.jpg',
    description: 'A harmonious blend of single classic lashes and multi-lash volume fans. Provides the density of volume extensions while retaining the textured separation of classic lashes.',
    bestFor: ['Clients with sparse natural lash gaps', 'Day-to-night versatility'],
    recommendedCurl: 'C-Curl & D-Curl blend',
    recommendedLength: 'Medium (10mm – 13mm)',
    recommendedFullness: 'Light to Medium Volume',
    referenceNote: 'Inspiration visual reference only. Blend ratio adjusted for natural lash gap distribution.'
  },
  {
    id: 'volume',
    name: 'Russian Glamour Volume',
    subtitle: 'Ultra-Fine 3D–6D Fans for Velvety Density',
    tagline: 'Deep, rich, pitch-black lash line',
    image: '/images/lashes/lash-atelier-hero.jpg',
    description: 'Handcrafted bouquet fans made of ultra-lightweight 0.05mm–0.07mm silk fibers. Wraps around each natural lash to create a continuous, dense, velvety-dark eyeliner band.',
    bestFor: ['Bridal galas, receptions & evening wear', 'Clients who love bold glamour'],
    recommendedCurl: 'D-Curl or C-Curl',
    recommendedLength: 'Medium to Statement (12mm – 15mm)',
    recommendedFullness: 'Full Glamour (4D – 6D Fans)',
    referenceNote: 'Inspiration visual reference only. Natural lash strength is verified prior to high-density fan placement.'
  }
];

export const LASH_CURLS = [
  {
    id: 'j-b-curl',
    name: 'J / B Curl',
    badge: 'Natural / Soft',
    description: 'Subtle, gentle lift mimicking natural straight lashes. Ideal for minimalist elegance or downward-pointing hooded eyes.'
  },
  {
    id: 'c-curl',
    name: 'C-Curl',
    badge: 'Universal Favorite',
    description: 'The golden standard open-eye curl. Mimics the upward sweep of a luxury mechanical lash curler.'
  },
  {
    id: 'd-curl',
    name: 'D-Curl',
    badge: 'Dramatic Lift',
    description: 'High-lift curvature that pops noticeably above the eyelid. Excellent for dramatic flutter and deep-set eyes.'
  },
  {
    id: 'l-curl',
    name: 'L-Curl',
    badge: 'Straight Lash Specialist',
    description: 'Flat horizontal base transitioning into a sharp vertical lift. Engineered specifically for straight or downward-pointing natural lashes.'
  }
];

export const LASH_LENGTHS = [
  {
    id: 'subtle',
    name: 'Subtle',
    range: '8mm – 10mm',
    bestFor: 'Everyday workplace, natural lash enhancement, sensitive eyes'
  },
  {
    id: 'medium',
    name: 'Medium',
    range: '11mm – 13mm',
    bestFor: 'Versatile day-to-night glamour, weddings, balanced elegance'
  },
  {
    id: 'statement',
    name: 'Statement',
    range: '14mm – 16mm',
    bestFor: 'High-fashion editorial, stage performance, celebratory galas'
  }
];

export const LASH_FULLNESS_OPTIONS = [
  {
    id: 'natural-1-1',
    name: 'Natural Definition',
    ratio: '1:1 Single Lash',
    description: 'One featherlight silk fiber attached to each single natural lash.'
  },
  {
    id: 'light-volume',
    name: 'Light Volume',
    ratio: '2D – 3D Fans',
    description: 'Soft, airy handmade fans giving subtle fullness without heavy weight.'
  },
  {
    id: 'full-glamour',
    name: 'Full Glamour',
    ratio: '4D – 6D Fans',
    description: 'Rich, fluffy velvety coverage creating a dark lash-line eyeliner illusion.'
  },
  {
    id: 'mega-volume',
    name: 'Mega Density',
    ratio: '8D – 10D Fans',
    description: 'Maximum allowable density using ultra-fine 0.03mm micro-fibers.'
  }
];

export const LASH_AFTERCARE_RULES = [
  {
    id: 1,
    title: 'Keep Lashes Completely Dry for the First 24 Hours',
    description: 'Avoid contact with water, steam, high humidity, saunas, and intense workouts while the medical-grade bonding adhesive fully cures.',
    badge: 'First 24 Hours'
  },
  {
    id: 2,
    title: 'Cleanse Daily with an Oil-Free Foaming Lash Wash',
    description: 'Gently wash your lash line daily using a dedicated oil-free lash cleanser and soft cleansing brush. Oil breaks down adhesive polymers and leads to premature shedding.',
    badge: 'Daily Care'
  },
  {
    id: 3,
    title: 'Never Rub, Pull, Pluck, or Use Mechanical Curlers',
    description: 'Mechanical lash curlers will crimp or break extensions and damage your natural hair root. Never pick or pull loose extensions; brush them gently with a dry spoolie.',
    badge: 'Preservation'
  },
  {
    id: 4,
    title: 'Sleep on Your Back or on Silk / Satin Pillowcases',
    description: 'Friction from cotton pillowcases causes premature corner loss and bent fibers. Sleeping on your back preserves symmetrical extension retention.',
    badge: 'Sleep Habits'
  },
  {
    id: 5,
    title: 'Schedule Refills Every 2 to 3 Weeks',
    description: 'Natural eyelashes naturally shed 3 to 5 lashes per eye every day. Scheduling refills at 2 to 3 weeks replaces outgrown fans before they tip or strain new growth.',
    badge: 'Refill Cadence'
  },
  {
    id: 6,
    title: 'Professional Medical Guidance & Irritation Protocol',
    description: 'If you ever experience burning, itching, excessive watering, or signs of an eye infection, stop all cosmetic use immediately and seek professional medical guidance. We offer gentle complimentary removal if needed.',
    badge: 'Safety & Health'
  }
];

export const MEDICAL_SAFETY_DISCLAIMER = 
  'GLAM GIRL BY JANKI provides cosmetic aesthetic lash styling. Our artists do not diagnose medical or ophthalmic conditions. If you currently experience active eye redness, blepharitis, styes, conjunctivitis, or unexplained irritation, we advise seeking appropriate professional medical evaluation before scheduling any eye-area cosmetic treatment.';
