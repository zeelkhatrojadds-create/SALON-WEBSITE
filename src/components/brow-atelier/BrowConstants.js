// Brow Atelier Constants & Configuration
// GLAM GIRL BY JANKI — Ottawa Luxury Beauty Studio
// Brand Palette: Deep Black (#10110F), Forest Green (#263D2B), Olive (#465640), Sage (#A8B5A0), Warm Cream (#F7F4ED)

export const BROW_GALLERY_FILTERS = [
  { id: 'all', label: 'All Styles' },
  { id: 'natural', label: 'Natural' },
  { id: 'soft', label: 'Soft' },
  { id: 'defined', label: 'Defined' },
  { id: 'feathered', label: 'Feathered' },
  { id: 'bold', label: 'Bold' },
  { id: 'laminated', label: 'Laminated' }
];

export const BROW_INSPIRATION_GALLERY = [
  {
    id: 'natural-brows',
    name: 'Natural Brows',
    category: 'natural',
    subtitle: 'Understated Arch Following Native Bone Structure',
    tagline: 'Your natural brow shape, elevated with gentle polish',
    image: '/images/brows/brow-natural.jpg',
    description: 'An effortless, organic brow shape that respects your unique hair growth pattern. Subtle stray-hair cleanup frames the eyes while preserving full, authentic density.',
    characteristics: [
      'Soft, diffused brow bulb with zero harsh lines',
      'Gentle natural arch following the supraorbital ridge',
      'Preserves natural brow thickness and texture',
      'Ideal for low-maintenance daily grooming'
    ],
    suitableLook: 'Best for clients with balanced natural growth who want clean, tidy framing without obvious cosmetic shaping.',
    isServiceInCatalog: true,
    offeredTreatmentName: 'Eyebrow Threading ($10 CAD / 15 min)',
    serviceId: 'eyebrow-threading',
    inspirationNote: 'Inspiration visual style. Threading technique is calibrated to your individual bone contour.'
  },
  {
    id: 'soft-defined-brows',
    name: 'Soft Defined Brows',
    category: 'soft',
    subtitle: 'Tailored Clean Edges with Velvety Interior Texture',
    tagline: 'Refined clarity without rigidity',
    image: '/images/brows/brow-artist-client.webp',
    description: 'Crisp, clean perimeter grooming paired with a soft, feathery interior fill. Strikes the perfect harmony between polished precision and touchable softness.',
    characteristics: [
      'Clean baseline contour removing stray fuzz',
      'Softened upper border for a blended silhouette',
      'Medium arch height calibrated to eye clearance',
      'Smooth tail tapering toward the outer temple'
    ],
    suitableLook: 'Everyday corporate polish, versatile day-to-night elegance, and clients who love structured yet approachable brows.',
    isServiceInCatalog: true,
    offeredTreatmentName: 'Eyebrow Threading ($10 CAD / 15 min)',
    serviceId: 'eyebrow-threading',
    inspirationNote: 'Inspiration styling approach. Threading creates clean lines with millimeter accuracy.'
  },
  {
    id: 'feathered-brows',
    name: 'Feathered Brows',
    category: 'feathered',
    subtitle: 'Airy Upward Strands with Individual Hair Separation',
    tagline: 'Light, wispy flutter mimicking micro-blade strokes',
    image: '/images/brows/brow-fluffy.jpg',
    description: 'Characterized by separated, upward-brushed hairs that create an airy, textured, and youthful appearance. Focuses on individual hair movement rather than solid pigment fill.',
    characteristics: [
      'Separated hairs brushed upward at a 45-degree angle',
      'Lightweight, transparent skin visibility between strands',
      'Natural feathery tail with organic dispersion',
      'Maintained with a clean spoolie and clear brow gel'
    ],
    suitableLook: 'Modern editorial lovers, oval and heart-shaped faces, and clients wanting a youthful, eye-opening lift.',
    isServiceInCatalog: false,
    inspirationNote: 'Inspiration styling technique. Can be achieved with precision threading cleanup and daily spoolie styling.'
  },
  {
    id: 'fluffy-brows',
    name: 'Fluffy Brows',
    category: 'feathered',
    subtitle: 'Generous Volume & Textured Full-Bodied Density',
    tagline: 'Effortlessly full, boyish brow grandeur',
    image: '/images/brows/brow-fluffy.jpg',
    description: 'A full-bodied, high-density brow aesthetic where hairs are groomed upward and outward to maximize vertical height and create a soft, cloud-like frame.',
    characteristics: [
      'Expanded vertical brow height with brushed hairs',
      'Soft, un-tweezed look with only stray cleanup beneath the arch',
      'Textured, multi-dimensional strand overlapping',
      'Effortless runway and editorial appeal'
    ],
    suitableLook: 'Clients with abundant natural brow hair who want to embrace maximum fullness without over-plucking.',
    isServiceInCatalog: false,
    inspirationNote: 'Inspiration styling silhouette. Threading removes only stray hairs outside the natural shape.'
  },
  {
    id: 'straight-brows',
    name: 'Straight Brows',
    category: 'natural',
    subtitle: 'Minimal Arch Angle with Horizontal Elongation',
    tagline: 'Youthful Korean-inspired linear grace',
    image: '/images/brows/brow-natural.jpg',
    description: 'Inspired by modern East-Asian beauty trends, this shape minimizes the upward peak of the arch in favor of a gentle, linear horizontal line that softens facial angles.',
    characteristics: [
      'Subtle, nearly flat arch with minimal vertical rise',
      'Soft horizontal baseline extending outward',
      'Visually shortens long or oval facial silhouettes',
      'Creates a sweet, youthful, and innocent expression'
    ],
    suitableLook: 'Long, rectangular, or high-forehead face shapes seeking balanced facial harmony.',
    isServiceInCatalog: false,
    inspirationNote: 'Inspiration design map. Our certified threading specialist shapes the arch to your natural eye fold.'
  },
  {
    id: 'arched-brows',
    name: 'Arched Brows',
    category: 'defined',
    subtitle: 'Crisp Elevated Peak for an Optical Eye Lift',
    tagline: 'Classic architectural symmetry and lift',
    image: '/images/brows/brow-arched.jpg',
    description: 'A timeless silhouette featuring a well-defined peak positioned over the outer two-thirds of the eye, visually drawing the eyelids upward and opening the entire gaze.',
    characteristics: [
      'Crisp upward rise from bulb to highest arch peak',
      'Graceful downward taper toward the temple',
      'Accentuates high cheekbones and bone structure',
      'Provides a natural, non-surgical lifting illusion'
    ],
    suitableLook: 'Round, square, or hooded eye contours wanting to add vertical dimension and definition.',
    isServiceInCatalog: true,
    offeredTreatmentName: 'Eyebrow Threading ($10 CAD / 15 min)',
    serviceId: 'eyebrow-threading',
    inspirationNote: 'Approved salon service mapping. Achieved through precision threading and mapping.'
  },
  {
    id: 'soft-angled-brows',
    name: 'Soft Angled Brows',
    category: 'soft',
    subtitle: 'Gentle Curved Apex Balancing Softness & Structure',
    tagline: 'The universally flattering architectural curve',
    image: '/images/brows/brow-artist-client.webp',
    description: 'Features a subtle, rounded angle at the arch peak rather than a sharp point. Combines the lift of an arched brow with the approachable softness of a curved brow.',
    characteristics: [
      'Subtly rounded arch apex without rigid corners',
      'Consistent, gentle tapering toward the outer tail',
      'Harmonizes with natural facial movements',
      'Flattering across virtually all eye shapes'
    ],
    suitableLook: 'First-time brow shaping clients, diamond and heart-shaped faces, and balanced everyday wear.',
    isServiceInCatalog: true,
    offeredTreatmentName: 'Eyebrow Threading ($10 CAD / 15 min)',
    serviceId: 'eyebrow-threading',
    inspirationNote: 'Approved salon service mapping. Our master artist guides arch curvature to brow-bone landmarks.'
  },
  {
    id: 'bold-defined-brows',
    name: 'Bold Defined Brows',
    category: 'bold',
    subtitle: 'High-Impact Sculpted Density & Crisp Precision',
    tagline: 'Dramatic, photo-ready statement framing',
    image: '/images/brows/brow-arched.jpg',
    description: 'An authoritative, high-contrast look featuring a rich, solid brow baseline, sharp arch corners, and saturated fullness designed to anchor bold makeup styles.',
    characteristics: [
      'Sharp, crisp upper and lower perimeter borders',
      'Deep, continuous pigment density along the body',
      'Structured, commanding arch angle',
      'Complements red-carpet and evening glam makeup'
    ],
    suitableLook: 'Galas, weddings, evening celebrations, and clients who love dramatic, high-fashion facial structure.',
    isServiceInCatalog: false,
    inspirationNote: 'Inspiration aesthetic look. Beautifully paired with full-glam or bridal makeup artistry.'
  },
  {
    id: 'brushed-up-brows',
    name: 'Brushed-Up Brows',
    category: 'feathered',
    subtitle: 'Directional Upward Styling with Clean Perimeter',
    tagline: 'Disciplined lift that elongates the eye area',
    image: '/images/brows/brow-fluffy.jpg',
    description: 'Hairs are combed upward and neatly swept toward the temples along the top line, creating clean directional flow that exposes the eyelid and lifts hooded brows.',
    characteristics: [
      'Uniform upward grooming along the inner bulb',
      'Diagonal 45-degree sweep through the arch body',
      'Clean, hair-free lower eyelid margin',
      'Enhanced light reflection across the brow bone'
    ],
    suitableLook: 'Hooded eyes, mature eye contours, and clients seeking an awakened, wide-open gaze.',
    isServiceInCatalog: false,
    inspirationNote: 'Inspiration styling technique. Clean threading beneath the brow accentuates the upward sweep.'
  },
  {
    id: 'classic-brows',
    name: 'Classic Brows',
    category: 'soft',
    subtitle: 'The Gold Standard Balanced Golden-Ratio Silhouette',
    tagline: 'Timeless proportions that never go out of style',
    image: '/images/brows/brow-natural.jpg',
    description: 'Rooted in classic golden-ratio aesthetics: starts directly above the inner nostril, arches above the outer iris, and ends along the diagonal from nostril to outer eye corner.',
    characteristics: [
      'Balanced proportions based on traditional facial mapping',
      'Moderate thickness neither too thin nor overly bushy',
      'Natural arch curvature that moves with facial expression',
      'Decades-tested timeless elegance'
    ],
    suitableLook: 'Clients who prefer classic elegance over fast-moving social media trends; perfect for all ages.',
    isServiceInCatalog: true,
    offeredTreatmentName: 'Eyebrow Threading ($10 CAD / 15 min)',
    serviceId: 'eyebrow-threading',
    inspirationNote: 'Approved salon service mapping. Handcrafted with authentic antibacterial cotton thread.'
  },
  {
    id: 'laminated-brow-inspiration',
    name: 'Laminated Brow Inspiration',
    category: 'laminated',
    subtitle: 'Sleek Uniform Lift with Semi-Permanent Direction',
    tagline: 'Sleek, glossy high-fashion strand alignment',
    image: '/images/brows/brow-fluffy.jpg',
    description: 'An inspirational modern treatment style where unruly brow hairs are smoothed, aligned upward, and set into uniform sleekness for maximum fullness and shine.',
    characteristics: [
      'All brow hairs brushed and aligned in uniform direction',
      'Covers sparse patches by redistributing natural hair volume',
      'Glossy, high-shine editorial reflection',
      'Creates the illusion of 30% thicker brows'
    ],
    suitableLook: 'Clients with curly, downward-pointing, or sparse brow hairs seeking structured vertical fullness.',
    isServiceInCatalog: false,
    inspirationNote: 'Inspiration reference look. Demonstrates the aesthetic effect of brow lamination and styling.'
  },
  {
    id: 'minimal-everyday-brows',
    name: 'Minimal Everyday Brows',
    category: 'natural',
    subtitle: 'Clean Precision Grooming with Zero Daily Maintenance',
    tagline: 'Groom and go with effortless confidence',
    image: '/images/brows/brow-hero.webp',
    description: 'A practical, understated approach focused on clean hair removal along the bridge of the nose and lower eyelid, leaving the natural brow body entirely untouched.',
    characteristics: [
      'Removal of mono-brow center hairs for facial openness',
      'Gentle lower line cleanup without reshaping the main body',
      'Zero home pencils, powders, or pomades required',
      'Quick 15-minute maintenance appointment'
    ],
    suitableLook: 'Busy professionals, athletes, students, and anyone desiring low-maintenance, clean daily grooming.',
    isServiceInCatalog: true,
    offeredTreatmentName: 'Eyebrow Threading ($10 CAD / 15 min)',
    serviceId: 'eyebrow-threading',
    inspirationNote: 'Approved salon service mapping. Fast, gentle, and chemical-free threading.'
  }
];

export const BROW_EXPLORER_CRITERIA = {
  appearance: [
    { id: 'natural', name: 'Natural Appearance', desc: 'Soft, organic framing that embraces your native brow growth and density.' },
    { id: 'defined', name: 'Defined Appearance', desc: 'Crisp perimeters and structured lines for high-definition facial framing.' }
  ],
  archStructure: [
    { id: 'soft', name: 'Soft Gentle Arch', desc: 'Curved, rounded apex that softens angular bone structure and expressions.' },
    { id: 'structured', name: 'Structured High Arch', desc: 'Prominent, elevated peak that visually lifts the eye and creates dramatic height.' }
  ],
  shapeSilhouette: [
    { id: 'straight', name: 'Straight / Linear Silhouette', desc: 'Horizontal flow with minimal vertical rise for a youthful, modern look.' },
    { id: 'arched', name: 'Classic Arched Silhouette', desc: 'Graceful curve from inner corner to peak, tapering neatly toward temples.' }
  ],
  finishIntensity: [
    { id: 'light', name: 'Light & Feathery Finish', desc: 'Airy, transparent density with visible skin between individual strands.' },
    { id: 'bold', name: 'Bold & Saturated Finish', desc: 'Rich, uniform density creating an authoritative, camera-ready frame.' }
  ],
  groomingStyle: [
    { id: 'minimal', name: 'Minimal & Effortless', desc: 'Simple stray cleanup with zero daily pencil or gel maintenance needed.' },
    { id: 'brushed-up', name: 'Brushed-Up & Fluffy', desc: 'Directional upward grooming creating vertical height and editorial flair.' }
  ]
};

export const BROW_EXPERIENCE_STEPS = [
  {
    step: '01',
    title: 'Brow Inspiration',
    summary: 'Explore brow silhouettes, arches, and finishes tailored to your aesthetic.',
    details: 'Begin by browsing our gallery of natural, feathered, arched, and fluffy brow shapes to identify the aesthetic direction that aligns with your lifestyle and personal taste.'
  },
  {
    step: '02',
    title: 'Preference Discovery',
    summary: 'Share your comfort zone, daily makeup routine, and growth history.',
    details: 'We discuss whether you prefer low-maintenance natural framing or crisp architectural lines, along with any previous over-plucking areas you are currently growing out.'
  },
  {
    step: '03',
    title: 'Brow Assessment',
    summary: 'Facial bone analysis, brow-bone landmark mapping, and symmetry check.',
    details: 'Master artist Janki Khatroja examines your orbital bone structure, hair growth direction, natural density, and eyelid clearance to plan your custom brow blueprint.'
  },
  {
    step: '04',
    title: 'Precision Brow Service',
    summary: 'Execution with 100% antibacterial cotton thread or gentle wax.',
    details: 'Using sterile techniques, we remove unwanted hairs row by row directly from the root with surgical precision, creating crisp lines without peeling or traumatizing the skin.'
  },
  {
    step: '05',
    title: 'Finishing Touches',
    summary: 'Soothing organic aloe vera infusion, scissor trimming, and spoolie styling.',
    details: 'We gently trim long brow hairs for uniform lie, apply pure soothing organic aloe vera to calm micro-circulation, and brush hairs into place for a pristine mirror reveal.'
  },
  {
    step: '06',
    title: 'Maintenance Guidance',
    summary: 'Personalized home spoolie routines and natural regrowth timelines.',
    details: 'We explain your natural hair cycle, demonstrate how to brush your brows daily without strain, and provide honest guidance on when a maintenance appointment is beneficial.'
  }
];

export const BROW_DESIGN_EXPERIENCE_STEPS = BROW_EXPERIENCE_STEPS;

export const BROW_MAINTENANCE_CARDS = [
  {
    id: 'daily-care',
    badge: 'Daily Routine',
    title: 'Daily Brow Care & Spoolie Routine',
    points: [
      'Brush brows gently every morning using a clean, dry spoolie in the direction of natural hair growth.',
      'Avoid unnecessary rubbing, scratching, or picking at brow hairs throughout the day.',
      'Keep the brow area clean with a gentle, non-comedogenic daily facial cleanser.',
      'Follow professional artist instructions for grooming and conditioning.'
    ]
  },
  {
    id: 'after-threading',
    badge: 'Post-Treatment',
    title: 'After Threading or Waxing Care',
    points: [
      'Avoid touching the freshly threaded skin with unwashed hands for at least 2 to 4 hours.',
      'Apply pure soothing aloe vera gel or rosewater to calm temporary redness or warmth.',
      'Avoid harsh chemical exfoliants, retinoids, swimming pools, and direct sunlight for 24 hours.',
      'Do not apply heavy foundations directly onto freshly opened follicles.'
    ]
  },
  {
    id: 'after-tinting',
    badge: 'Tint Longevity',
    title: 'After Brow Tinting Protocol',
    points: [
      'Follow product-specific aftercare guidance provided by your specialist.',
      'Keep tinted brows dry for the first 12 to 24 hours to allow dye molecules to set.',
      'Avoid harsh oil-based cleansers, clarifying toners, and scrubs directly across the brow area.',
      'Cleanse gently with lukewarm water and a soft cloth to preserve rich color depth.'
    ]
  },
  {
    id: 'after-lamination',
    badge: 'Lamination Care',
    title: 'After Brow Lamination Guidance',
    points: [
      'Follow the technician\'s aftercare instructions strictly during the first 24 to 48 hours.',
      'Keep brows completely dry and avoid steam rooms, saunas, and intense workouts while bonds cure.',
      'Avoid manipulating, flattening, or sleeping face-down against pillows.',
      'Apply recommended nourishing brow oils or peptide serums once the initial curing window passes.'
    ]
  },
  {
    id: 'growth-cycles',
    badge: 'Natural Growth',
    title: 'Brow Hair Biology & Maintenance',
    points: [
      'Natural eyebrow hairs cycle through growth (anagen), resting (catagen), and shedding (telogen) phases every 3 to 4 months.',
      'Eyebrow hairs grow at a slower rate than scalp hair — typically about 0.14mm to 0.16mm per day.',
      'Gentle grooming preserves the delicate hair follicle sheath; avoid aggressive over-tweezing at home.',
      'Schedule maintenance based on your personal hair growth speed rather than rigid, false schedules.'
    ]
  }
];

export const BROW_CHECKLIST_DATA = [
  {
    id: 'brush-spoolie',
    title: 'Brush brows gently every morning using a clean dry spoolie',
    category: 'Daily Routine'
  },
  {
    id: 'avoid-plucking',
    title: 'Avoid excessive home tweezing or plucking between salon visits',
    category: 'Preservation'
  },
  {
    id: 'clean-tools',
    title: 'Keep personal brow brushes, tweezers, and grooming tools sanitized',
    category: 'Hygiene'
  },
  {
    id: 'treatment-aftercare',
    title: 'Follow treatment-specific aftercare guidance for threading, tinting, or lamination',
    category: 'Safety'
  },
  {
    id: 'avoid-irritants',
    title: 'Avoid harsh scrubs, acids, or heavy makeup on freshly treated brow skin for 24 hours',
    category: 'Skin Barrier'
  },
  {
    id: 'gentle-routine',
    title: 'Maintain a gentle daily routine and nourish brow hairs with botanical oils',
    category: 'Nourishment'
  }
];

export const BROW_FAQS = [
  {
    question: 'What is the difference between brow shaping and threading?',
    answer: 'Eyebrow threading is an ancient precision hair-removal technique that uses a twisted, 100% antibacterial cotton thread rolled across the skin to trap and gently lift individual hairs from the root. Brow shaping is the overall artistic design process of creating symmetry, arch height, and tail length tailored to your facial landmarks. At GLAM GIRL BY JANKI, threading is our premier method for brow shaping because it does not peel the skin, uses zero hot chemicals, and allows millimeter-level accuracy.'
  },
  {
    question: 'What are feathered brows?',
    answer: 'Feathered brows are an airy, natural brow styling technique that emphasizes individual strand separation, brushed-up hair direction, and a light, wispy finish. Unlike heavily filled-in or stamped brows, feathered brows celebrate natural skin visibility between the hairs, creating a soft, youthful, and eye-opening effect that can be maintained with precision threading and clear brow gel.'
  },
  {
    question: 'How do I maintain my natural brow shape without over-plucking?',
    answer: 'The most important rule is to avoid magnifying mirrors and aggressive daily tweezing at home. When you tweeze daily, it is easy to accidentally pluck hairs from the main brow body, leading to thinning or uneven arches that take months to regrow. We recommend only plucking obvious stray hairs on the bridge of the nose and having your main brow shape professionally maintained every 2 to 4 weeks.'
  },
  {
    question: 'What is brow lamination?',
    answer: 'Brow lamination is a cosmetic treatment that uses a gentle chemical solution to relax and redirect natural brow hairs, allowing them to be brushed and set into a uniform, upward, and fuller direction. It creates a sleek, fluffy, and brushed-up appearance that lasts several weeks. It is ideal for clients with coarse, downward-growing, or unruly brow hairs who want manageable, high-fashion fullness.'
  },
  {
    question: 'Is brow tinting suitable for everyone?',
    answer: 'Brow tinting is suitable for most clients looking to add depth, definition, and the appearance of thickness to their brows, especially those with blonde, light brown, red, or gray hairs. However, clients with active eczema, open skin abrasions near the brows, or a history of dye allergies should request a complimentary 24-hour patch test before undergoing tinting.'
  },
  {
    question: 'What should I avoid immediately after eyebrow threading?',
    answer: 'For the first 2 to 4 hours after eyebrow threading, avoid touching the area with unwashed hands, as open follicles are susceptible to surface bacteria. For 24 hours, avoid swimming in chlorinated pools, saunas, hot steam rooms, heavy foundation makeup directly over the brow bone, and harsh exfoliating acids or retinoids. Apply pure organic aloe vera gel to soothe any mild pinkness.'
  },
  {
    question: 'How often should I maintain my brows?',
    answer: 'Maintenance frequency depends entirely on your personal hair growth rate and lifestyle. Most clients find that scheduling a professional threading appointment every 2 to 4 weeks keeps their arch crisp, eliminates stray fuzz, and prevents hairs from growing out of alignment. If you are actively growing out thin brows, your artist may recommend 4 to 6-week maintenance intervals.'
  }
];
