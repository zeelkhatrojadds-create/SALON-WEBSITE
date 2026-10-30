// Brow Atelier Constants & Configuration
// GLAM GIRL BY JANKI — Ottawa Luxury Beauty Studio
// Editorial Brand Palette: Deep Black (#10110F), Forest Green (#263D2B), Olive (#465640), Sage (#A8B5A0), Warm Cream (#F7F4ED)

export const BROW_GALLERY_FILTERS = [
  { id: 'all', label: 'All Styles' },
  { id: 'natural', label: 'Natural' },
  { id: 'soft', label: 'Soft' },
  { id: 'defined', label: 'Defined' },
  { id: 'feathered', label: 'Feathered' },
  { id: 'bold', label: 'Bold' },
  { id: 'laminated', label: 'Laminated' }
];

export const BROW_INSPIRATION_STYLES = [
  {
    id: 'natural-brows',
    name: 'Natural Brows',
    category: 'natural',
    subtitle: 'Gentle Clean Border & Soft Original Density',
    tagline: 'Your natural brow shape, effortlessly refined',
    image: '/images/threading/eyebrow-threading.jpg',
    description: 'An organic, understated enhancement that preserves the natural curvature and density of your brows while cleaning stray hairs along the perimeter for neat, polished framing.',
    shapeCharacteristics: [
      'Follows natural brow bone curvature',
      'Soft diffused perimeter without harsh edges',
      'Subtle cleanup of stray hairs beneath the arch',
      'Zero artificial pencil lines or heavy pomades'
    ],
    suitableLook: 'Everyday workplace polish, minimal beauty routines, and clients who love their natural brow density.',
    isServiceInCatalog: true,
    offeredServiceName: 'Eyebrow Threading ($10 CAD / 15 min)',
    serviceId: 'eyebrow-threading',
    inspirationNote: 'Style inspiration reference. Threading removes perimeter strays while honoring your natural brow thickness.'
  },
  {
    id: 'soft-defined-brows',
    name: 'Soft Defined Brows',
    category: 'soft',
    subtitle: 'Balanced Arch Symmetry & Gentle Definition',
    tagline: 'Refined structure with a soft, touchable finish',
    image: '/images/brows/brow-hero.jpg',
    description: 'A harmonious brow shape featuring a gently tailored arch and defined lower border, creating a balanced frame that lifts the eye area without feeling overly structured or sharp.',
    shapeCharacteristics: [
      'Gently contoured arch peak aligned to outer iris',
      'Tapered tail following the temple angle',
      'Soft powder or tint shading in sparse zones',
      'Crisp yet natural baseline definition'
    ],
    suitableLook: 'Versatile day-to-night elegance, almond or round eye shapes, and client headshot photography.',
    isServiceInCatalog: true,
    offeredServiceName: 'Eyebrow Threading ($10 CAD / 15 min)',
    serviceId: 'eyebrow-threading',
    inspirationNote: 'Style inspiration reference. Shaping is calibrated to your natural facial landmarks during consultation.'
  },
  {
    id: 'feathered-brows',
    name: 'Feathered Brows',
    category: 'feathered',
    subtitle: 'Airy Hair-Stroke Texture & Dispersed Separation',
    tagline: 'Lightweight, multidirectional hair-stroke flutter',
    image: '/images/threading/sitara-full-face-threading.jpg',
    description: 'A lightweight, modern editorial style highlighting individual brow hair strokes. Hair is brushed gently outward and upward to create an airy, feathered texture with effortless movement.',
    shapeCharacteristics: [
      'Visible individual hair-stroke texture',
      'Airy spacing rather than a solid color block',
      'Soft, dispersed brow tail with natural gradient',
      'Micro-trimmed tips preserving feathery volume'
    ],
    suitableLook: 'Editorial photography, contemporary fashion styling, and clients with medium to full natural brow hair.',
    isServiceInCatalog: false,
    offeredServiceName: 'Inspiration Design Style (Consultation & Shaping available)',
    serviceId: 'eyebrow-threading',
    inspirationNote: 'Style inspiration design. Achieved with precision threading cleanup and clear grooming styling.'
  },
  {
    id: 'fluffy-brows',
    name: 'Fluffy Brows',
    category: 'feathered',
    subtitle: 'Full-Bodied Volume & Brushed-Up Fuller Width',
    tagline: 'Youthful, lifted, and voluminous brow density',
    image: '/images/brows/brow-artist.jpg',
    description: 'A high-volume brow look that maximizes the optical width of your brows by brushing all healthy hairs upward and outward, creating a youthful, wide-awake, and softly relaxed aesthetic.',
    shapeCharacteristics: [
      'Expanded vertical brow width',
      'Hairs brushed upward at the head and diagonally through body',
      'Full, relaxed texture with zero thinning',
      'Cleaned lower edge emphasizing upward lift'
    ],
    suitableLook: 'Clients with sparse brows wanting fuller appearance, youthful everyday styling, and casual chic looks.',
    isServiceInCatalog: false,
    offeredServiceName: 'Inspiration Design Style',
    serviceId: 'eyebrow-threading',
    inspirationNote: 'Style inspiration reference. Focuses on minimal hair removal to preserve maximum hair volume.'
  },
  {
    id: 'straight-brows',
    name: 'Straight Brows',
    category: 'defined',
    subtitle: 'Horizontal Korean-Inspired Archless Symmetry',
    tagline: 'Youthful, modern, and gentle ocular framing',
    image: '/images/threading/eyebrow-threading.jpg',
    description: 'Inspired by East-Asian beauty trends, straight brows feature a minimal or virtually flat arch with a horizontal baseline, giving the face a gentle, innocent, and youthful expression.',
    shapeCharacteristics: [
      'Flat or subtly angled baseline with minimal arch peak',
      'Short, soft tail without sharp downward droop',
      'Softens strong jawlines and lengthens round faces',
      'Cleaned perimeter with straight guide paths'
    ],
    suitableLook: 'Oval, heart-shaped, and longer face shapes, minimal makeup lovers, and contemporary clean aesthetics.',
    isServiceInCatalog: true,
    offeredServiceName: 'Eyebrow Threading ($10 CAD / 15 min)',
    serviceId: 'eyebrow-threading',
    inspirationNote: 'Style inspiration reference. Natural brow bone alignment determines how straight a brow can safely be styled.'
  },
  {
    id: 'arched-brows',
    name: 'Arched Brows',
    category: 'defined',
    subtitle: 'High-Lift Architectural Curve & Eye Opening Height',
    tagline: 'Dramatic, feminine lift opening the eye contour',
    image: '/images/brows/brow-hero.jpg',
    description: 'A classic high-lift arch positioned precisely two-thirds of the way along the brow. Creates an instant open-eye illusion and frames the brow bone with graceful, feminine curvature.',
    shapeCharacteristics: [
      'Pronounced, sculpted arch peak over the outer iris',
      'Clean, clear clearance above the eyelid fold',
      'Visually lifts deep-set or hooded eyes',
      'Crisply shaped lower arch curve'
    ],
    suitableLook: 'Round and square face contours, hooded eyes needing vertical lift, and formal celebration makeup.',
    isServiceInCatalog: true,
    offeredServiceName: 'Eyebrow Threading ($10 CAD / 15 min)',
    serviceId: 'eyebrow-threading',
    inspirationNote: 'Style inspiration reference. We never over-pluck the arch; height is mapped to your natural muscle movement.'
  },
  {
    id: 'soft-angled-brows',
    name: 'Soft Angled Brows',
    category: 'soft',
    subtitle: 'Subtle Angular Bend with Tenderly Curved Edges',
    tagline: 'Gentle structure that flatters every facial contour',
    image: '/images/threading/sitara-full-face-threading.jpg',
    description: 'A delicate compromise between a high arch and a straight brow, featuring a subtle angle at the peak that is softened around the curve to create gentle definition without sternness.',
    shapeCharacteristics: [
      'Soft triangular peak with rounded corners',
      'Harmonious transition from brow head to tail',
      'Gentle lift suitable for all facial contours',
      'Balanced density throughout the brow body'
    ],
    suitableLook: 'Universally flattering on oval, heart, diamond, and round face shapes for everyday wear.',
    isServiceInCatalog: true,
    offeredServiceName: 'Eyebrow Threading ($10 CAD / 15 min)',
    serviceId: 'eyebrow-threading',
    inspirationNote: 'Style inspiration reference. The most requested natural arch pattern in our Ottawa studio.'
  },
  {
    id: 'bold-defined-brows',
    name: 'Bold Defined Brows',
    category: 'bold',
    subtitle: 'Rich Pigment Density & Crisp Architectural Borders',
    tagline: 'Statement elegance for bridal and celebratory glam',
    image: '/images/brows/brow-artist.jpg',
    description: 'A high-impact statement brow featuring deep pigment definition, crisp top and bottom borders, and full density that commands attention alongside festive or bridal makeup.',
    shapeCharacteristics: [
      'Impeccably sharp lower and upper borders',
      'Rich, uniform color saturation from mid-brow to tail',
      'Ombré soft fade at the front inner head',
      'Photogenic 4K finish matching high-glam looks'
    ],
    suitableLook: 'Bridal ceremonies, sangeet performances, evening galas, and clients who love dramatic makeup.',
    isServiceInCatalog: false,
    offeredServiceName: 'Inspiration Design Style (Consultation available)',
    serviceId: 'eyebrow-threading',
    inspirationNote: 'Style inspiration reference. Paired beautifully with our bridal and occasion makeup services.'
  },
  {
    id: 'brushed-up-brows',
    name: 'Brushed-Up Brows',
    category: 'feathered',
    subtitle: 'Vertical Spoolie Grooming & Natural Directional Flow',
    tagline: 'Wide-awake vertical lift and groomed separation',
    image: '/images/threading/sitara-full-face-threading.jpg',
    description: 'A clean grooming technique where natural brow hairs are guided vertically and set with transparent styling balm to lift the eyelid area and accentuate hair-by-hair texture.',
    shapeCharacteristics: [
      'Vertical orientation of hairs at the inner head',
      'Smooth diagonal sweep through the arch and tail',
      'Highlights the natural gloss and health of brow hairs',
      'Keeps brows in place all day without stiffness'
    ],
    suitableLook: 'Active lifestyles, clean-girl aesthetic, corporate professionals, and minimal makeup days.',
    isServiceInCatalog: false,
    offeredServiceName: 'Inspiration Design Style',
    serviceId: 'eyebrow-threading',
    inspirationNote: 'Style inspiration reference. Easily styled at home with a clean spoolie and transparent brow balm.'
  },
  {
    id: 'classic-brows',
    name: 'Classic Brows',
    category: 'natural',
    subtitle: 'Timeless Proportions & Golden-Ratio Architecture',
    tagline: 'The enduring standard of balanced beauty',
    image: '/images/threading/eyebrow-threading.jpg',
    description: 'Based on time-tested golden-ratio brow architecture: the head aligns with the tear duct, the arch aligns with the iris, and the tail tapers toward the outer corner of the eye.',
    shapeCharacteristics: [
      'Mathematically balanced 3-point alignment',
      'Medium thickness tapering symmetrically to tail',
      'Never goes out of style or follows fleeting trends',
      'Complements natural bone structure seamlessly'
    ],
    suitableLook: 'All ages, corporate environments, milestone family portraits, and first-time salon clients.',
    isServiceInCatalog: true,
    offeredServiceName: 'Eyebrow Threading ($10 CAD / 15 min)',
    serviceId: 'eyebrow-threading',
    inspirationNote: 'Style inspiration reference. Our master artist maps these 3 golden points before every treatment.'
  },
  {
    id: 'laminated-brow-inspiration',
    name: 'Laminated Brow Inspiration',
    category: 'laminated',
    subtitle: 'High-Gloss Semi-Permanent Hair Direction & Sleek Lift',
    tagline: 'Sleek, uniform, magazine-cover brow architecture',
    image: '/images/brows/brow-hero.jpg',
    description: 'An editorial design inspiration simulating the sleek, uniform, high-gloss appearance of professionally set brow hairs, relaxing unruly curls and locking hairs into a uniform upward sweep.',
    shapeCharacteristics: [
      'Uniformly aligned hair shafts in an upward sweep',
      'Covers natural brow gaps by redistributing existing hair',
      'High-gloss sheen catching natural daylight',
      'Full, lifted illusion lasting throughout the day'
    ],
    suitableLook: 'Clients with coarse or downward-growing brow hairs, editorial shoots, and modern trendsetters.',
    isServiceInCatalog: false,
    offeredServiceName: 'Inspiration Design Concept',
    serviceId: 'eyebrow-threading',
    inspirationNote: 'Inspiration styling concept. We provide precision shaping and consultation to achieve this aesthetic.'
  },
  {
    id: 'minimal-everyday-brows',
    name: 'Minimal Everyday Brows',
    category: 'natural',
    subtitle: 'Zero-Maintenance Tidy & Stray-Hair Soft Clearance',
    tagline: 'Effortless maintenance for low-key confidence',
    image: '/images/threading/eyebrow-threading.jpg',
    description: 'The ultimate low-maintenance approach: gentle threading solely focused on clearing stray unibrow and eyelid hairs while leaving the main brow density 100% untouched and natural.',
    shapeCharacteristics: [
      'Preserves original thickness and natural borders',
      'Only clears stray fuzz between and beneath brows',
      'Quick, comfortable 10-15 minute appointment',
      'Zero downtime or noticeable redness'
    ],
    suitableLook: 'Busy students, athletes, minimalists, and clients who dislike thin or heavily shaped brows.',
    isServiceInCatalog: true,
    offeredServiceName: 'Eyebrow Threading ($10 CAD / 15 min)',
    serviceId: 'eyebrow-threading',
    inspirationNote: 'Approved catalog service. The gentlest, purest way to keep brows tidy without changing your natural shape.'
  }
];

export const BROW_EXPLORER_CRITERIA = {
  appearance: [
    { id: 'natural', label: 'Natural', desc: 'Soft organic borders preserving original density' },
    { id: 'defined', label: 'Defined', desc: 'Crisp architectural contours with clear shape' }
  ],
  archStructure: [
    { id: 'soft', label: 'Soft Arch', desc: 'Gentle, tender curve following the brow bone' },
    { id: 'structured', label: 'Structured Arch', desc: 'Noticeable high-lift peak opening the eyelid' }
  ],
  shapeCurvature: [
    { id: 'straight', label: 'Straight Brow', desc: 'Horizontal alignment with minimal upward bend' },
    { id: 'arched', label: 'Curved Arch', desc: 'Classic sweeping curvature creating eye height' }
  ],
  finishDensity: [
    { id: 'light', label: 'Light & Soft', desc: 'Airy, sheer density that looks effortless' },
    { id: 'bold', label: 'Bold & Full', desc: 'Rich saturation and prominent presence' }
  ],
  stylingLook: [
    { id: 'minimal', label: 'Minimal Tidy', desc: 'Uncomplicated natural groom-and-go' },
    { id: 'groomed-up', label: 'Groomed-Up / Feathery', desc: 'Brushed-up vertical lift and feathery strokes' }
  ]
};

export const BROW_DESIGN_STEPS = [
  {
    step: '01',
    title: 'Brow Inspiration',
    summary: 'Explore different brow styles, finishes, and optical silhouettes.',
    details: 'Begin by exploring our inspiration anthology. Discuss whether you prefer feathery brushed-up brows, classic arches, or minimal everyday tidy styling with master artist Janki Khatroja.'
  },
  {
    step: '02',
    title: 'Preference Discovery',
    summary: 'Identify your desired shape, arch height, and thickness preferences.',
    details: 'We discuss your comfort zone, personal grooming habits, makeup routine, and whether you prefer keeping maximum natural fullness or creating a clean, defined contour.'
  },
  {
    step: '03',
    title: 'Natural Brow Assessment',
    summary: 'Assess natural brow growth, hair density, and facial symmetry landmarks.',
    details: 'Using 3-point golden ratio mapping (tear duct alignment, pupil arch peak, and outer eye tail), we evaluate your natural follicle growth and identify areas to preserve or gently shape.'
  },
  {
    step: '04',
    title: 'Precision Brow Service',
    summary: 'Perform your selected approved salon service using sanitary organic thread or wax.',
    details: 'Using 100% antibacterial organic cotton thread or gentle facial wax, your artist isolates and lifts stray hairs from the root with swift, precise millimeter accuracy.'
  },
  {
    step: '05',
    title: 'Finishing Touches',
    summary: 'Soothe the skin with pure organic aloe vera gel and review symmetry.',
    details: 'We apply cooling, organic aloe vera gel and calming rosewater to instantly soothe freshly treated skin, then present a handheld mirror to review balanced symmetry under natural daylight.'
  },
  {
    step: '06',
    title: 'Maintenance Guidance',
    summary: 'Explain personalized home aftercare, spoolie brushing, and regrowth cycles.',
    details: 'We share tips on gentle spoolie brushing, avoiding over-plucking at home, and when to schedule your next tidy based on your unique natural hair growth cycle.'
  }
];

export const BROW_DESIGN_EXPERIENCE_STEPS = BROW_DESIGN_STEPS;

export const BROW_MAINTENANCE_SECTIONS = [
  {
    id: 'daily-brow-care',
    badge: 'Daily Ritual',
    title: 'Daily Brow Care & Spoolie Routine',
    points: [
      'Brush brows gently each morning using a clean, dry spoolie in the direction of natural hair growth.',
      'Avoid unnecessary rubbing, pulling, or aggressive scrubbing around the brow hair follicles.',
      'Keep the brow area clean and free from heavy comedogenic face oils or trapped foundation.',
      'Follow certified professional instructions for any specifically treated or tinted brows.'
    ]
  },
  {
    id: 'after-threading-shaping',
    badge: 'Post-Treatment',
    title: 'Care After Threading or Shaping',
    points: [
      'Avoid unnecessary touching, picking, or scratching the freshly threaded area for at least 6 to 12 hours.',
      'Follow your artist\'s specific skin-care advice and apply cooling aloe vera gel if mild redness occurs.',
      'Avoid perfumed skincare, alcohol-based toners, and exfoliating acids around freshly treated follicles.',
      'Use gentle, fragrance-free moisturizers and avoid steam rooms or intense gym workouts immediately post-service.'
    ]
  },
  {
    id: 'after-tinting',
    badge: 'Tint Longevity',
    title: 'Care After Brow Tinting',
    points: [
      'Keep brows completely dry for the first 12 to 24 hours to allow organic tint pigments to oxidize fully.',
      'Avoid harsh rubbing, exfoliating scrubs, or oil-based makeup removers directly over the brow hairs.',
      'Cleanse your face gently around the brows using lukewarm water and a soft washcloth.',
      'Avoid excessive sun exposure or chlorine pools that can accelerate tint fading.'
    ]
  },
  {
    id: 'after-lamination',
    badge: 'Lamination Care',
    title: 'Care After Brow Lamination',
    points: [
      'Follow your technician\'s exact aftercare instructions strictly for the initial 24 to 48 hours.',
      'Keep brows dry and avoid steam, hot showers, saunas, and intense sweating while chemical bonds stabilize.',
      'Avoid manipulating, sleeping face-down, or crushing brow hairs into pillows.',
      'Apply recommended nourishing brow oil or keratin conditioner nightly starting 48 hours post-treatment.'
    ]
  },
  {
    id: 'brow-maintenance-cycle',
    badge: 'Growth Cycles',
    title: 'Natural Regrowth & Maintenance Cadence',
    points: [
      'Natural brow growth cycles vary between individuals, typically taking 3 to 6 weeks for complete regrowth.',
      'Encourage gentle salon maintenance rather than aggressive home tweezing, which can damage hair roots.',
      'We avoid promising fixed maintenance intervals because hormonal and biological growth rates differ.',
      'Schedule a tidy when stray hairs begin to obscure your natural arch line.'
    ]
  }
];

export const BROW_CHECKLIST_ITEMS = [
  {
    id: 'brush-gently',
    title: 'Brush brows gently each morning with a clean, dedicated spoolie',
    category: 'Daily Care'
  },
  {
    id: 'avoid-excessive-plucking',
    title: 'Avoid excessive plucking or tweezing between salon appointments',
    category: 'Preservation'
  },
  {
    id: 'keep-tools-clean',
    title: 'Keep personal grooming tweezers and spoolies sanitized and clean',
    category: 'Hygiene'
  },
  {
    id: 'follow-aftercare',
    title: 'Follow treatment-specific aftercare instructions for threading or tinting',
    category: 'Treatment Protocol'
  },
  {
    id: 'avoid-irritating-products',
    title: 'Avoid perfumed skincare or harsh chemical exfoliants on freshly threaded skin',
    category: 'Skin Safety'
  },
  {
    id: 'maintain-gentle-routine',
    title: 'Maintain a gentle daily routine with soothing hydration and gentle cleansing',
    category: 'Barrier Health'
  }
];

export const BROW_FAQS = [
  {
    question: 'What is the difference between brow shaping and eyebrow threading?',
    answer: 'Eyebrow threading is the precise method of hair removal using an organic antibacterial twisted cotton thread that rolls over the skin to lift stray hairs cleanly from the root. Brow shaping is the artistic design process — mapping the golden ratio, arch peak, and tail length — that guides which hairs should be removed. In our studio, eyebrow threading is the preferred vehicle for achieving flawless, tailored brow shaping with zero chemical exposure.'
  },
  {
    question: 'What are feathered brows?',
    answer: 'Feathered brows are an airy, modern brow style characterized by visible individual hair-stroke texture rather than a solid or stenciled block of color. Hairs are brushed gently outward and upward, creating a soft, dispersed, and youthful look that celebrates the natural movement of your brows.'
  },
  {
    question: 'How do I maintain my natural brow shape without making them too thin?',
    answer: 'The key is avoiding magnifying mirrors and resisting the urge to tweeze near the main brow body at home. Clean only stray hairs far below the arch on the eyelid or between the brows. Visiting a certified threading specialist every 3 to 4 weeks ensures that your natural brow width and follicle health are permanently protected.'
  },
  {
    question: 'What is brow lamination?',
    answer: 'Brow lamination is a gentle cosmetic treatment that relaxes and realigns natural brow hairs into a uniform, upward-swept direction using a specialized keratin perm solution. It helps coarse or unruly hairs lie flat, fills in sparse gaps by redistributing hair volume, and creates a sleek, high-gloss editorial look.'
  },
  {
    question: 'Is brow tinting suitable for everyone?',
    answer: 'Brow tinting is suitable for most clients looking to darken pale, sun-bleached, or fine gray brow hairs for enhanced definition without daily pencil application. However, for clients with sensitive skin, active dermatitis, or a history of allergic reactions to hair dyes, a complimentary 24-hour patch test is strongly recommended before full application.'
  },
  {
    question: 'What should I avoid immediately after eyebrow threading?',
    answer: 'Immediately after threading, hair follicles remain slightly open for a few hours. Avoid touching the area with unwashed hands, and avoid perfumed lotions, alcohol-based toners, foundation makeup, hot steam rooms, and direct sun exposure for 6 to 12 hours. We apply pure soothing organic aloe vera gel to calm any transient pinkness.'
  },
  {
    question: 'How often should I maintain my brows?',
    answer: 'Because natural hair growth rates vary between individuals, most clients find that scheduling an eyebrow threading appointment every 3 to 4 weeks maintains crisp arch symmetry and prevents hairs from growing into unmanageable clusters. Your artist will observe your hair growth speed during your consultation and advise on a cadence tailored to you.'
  }
];
