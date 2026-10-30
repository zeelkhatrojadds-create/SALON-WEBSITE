// Lash Atelier Constants & Configuration
// GLAM GIRL BY JANKI — Ottawa Luxury Beauty Studio
// Editorial Brand Palette: Deep Black (#10110F), Forest Green (#263D2B), Olive (#465640), Sage (#A8B5A0), Warm Cream (#F7F4ED)

export const LASH_STYLE_CATEGORIES = [
  { id: 'all', label: 'All Styles' },
  { id: 'natural', label: 'Natural' },
  { id: 'soft-glam', label: 'Soft Glam' },
  { id: 'wispy', label: 'Wispy' },
  { id: 'volume', label: 'Volume' },
  { id: 'dramatic', label: 'Dramatic' }
];

export const LASH_STYLES = [
  {
    id: 'classic-lashes',
    name: 'Classic Lashes',
    category: 'natural',
    subtitle: 'Timeless 1:1 Individual Strand Architecture',
    tagline: 'Clean, elegant mascara-like enhancement',
    image: '/images/lashes/lash-lift-natural.jpg',
    description: 'A traditional, meticulous 1:1 extension method where one featherweight synthetic silk fiber is bonded to each healthy natural lash, delivering defined, clean length and natural curvature.',
    characteristics: [
      '1:1 single lash ratio placement',
      'Preserves individual lash separation',
      'Ultra-light 0.12mm–0.15mm silk fibers',
      'Seamless mascara effect with zero clumping'
    ],
    suitableLook: 'Ideal for everyday corporate polish, clean-girl aesthetic, or first-time lash clients with healthy natural density.',
    isSalonService: true,
    offeredTreatmentName: 'Classic Lash Extensions ($90 CAD / 75 min)',
    serviceId: 'classic-eyelash-extension',
    bestFor: ['Almond & round eyes', 'First-time lash clients', 'Everyday workplace elegance'],
    recommendedCurl: 'C-Curl or J/B-Curl',
    recommendedLength: 'Subtle (8mm – 10mm)',
    recommendedFullness: 'Natural (1:1 Single Lash)',
    referenceNote: 'Salon-approved offered treatment. Final density directly depends on client natural lash count.'
  },
  {
    id: 'hybrid-lashes',
    name: 'Hybrid Lashes',
    category: 'soft-glam',
    subtitle: 'Bespoke 50/50 Classic & Handcrafted Fan Fusion',
    tagline: 'Dimensional balance of texture and subtle fullness',
    image: '/images/lashes/lash-styles-wispy.jpg',
    description: 'An artful combination pairing single classic extensions with handcrafted 2D–3D volume fans. Creates a textured, staggered lash line that conceals natural lash gaps while retaining airy softness.',
    characteristics: [
      'Balanced blend of 1:1 singles and light fans',
      'Multi-level dimensional staggered texture',
      'Soft fluffy depth without excessive weight',
      'Customized eye-mapping blueprint'
    ],
    suitableLook: 'Perfect for clients seeking more noticeable fullness than Classic without committing to full dramatic volume.',
    isSalonService: true,
    offeredTreatmentName: 'Hybrid Lash Extensions ($110 CAD / 90 min)',
    serviceId: 'hybrid-eyelash-extension',
    bestFor: ['Sparse natural lash lines', 'Day-to-night versatility', 'Clients wanting textured flutter'],
    recommendedCurl: 'C-Curl & D-Curl blend',
    recommendedLength: 'Medium (10mm – 12mm)',
    recommendedFullness: 'Light Volume (2D – 3D Fans)',
    referenceNote: 'Salon-approved offered treatment. Fan distribution is calibrated to natural lash gap locations.'
  },
  {
    id: 'volume-lashes',
    name: 'Volume Lashes',
    category: 'volume',
    subtitle: 'Russian 3D–5D Handcrafted Bouquet Fans',
    tagline: 'Velvety density with a dark eyeliner effect',
    image: '/images/lashes/lash-atelier-hero.jpg',
    description: 'Handcrafted bouquets of 3 to 5 ultra-fine, lightweight lash fibers wrapped gently around each natural lash. Produces a full, fluffy, deep-black lash line that visually mimics smudged liquid eyeliner.',
    characteristics: [
      'Handcrafted 3D–5D volume bouquets',
      'Ultra-fine 0.05mm–0.07mm micro-fibers',
      'Rich, velvety pitch-black eyeliner band illusion',
      'Featherlight weight distributing evenly on lash roots'
    ],
    suitableLook: 'Best for clients desiring uniform darkness, fluffy depth, and photo-ready glamour for events and celebrations.',
    isSalonService: true,
    offeredTreatmentName: 'Volume Lash Extensions ($130 CAD / 105 min)',
    serviceId: 'volume-eyelash-extension',
    bestFor: ['Bridal galas & festive dinners', 'Naturally sparse or fine lashes', 'Lovers of fluffy glamour'],
    recommendedCurl: 'D-Curl or C-Curl',
    recommendedLength: 'Medium to Statement (11mm – 14mm)',
    recommendedFullness: 'Full Glamour (3D – 5D Fans)',
    referenceNote: 'Salon-approved offered treatment. Lash diameter is strictly monitored to prevent root tension.'
  },
  {
    id: 'mega-volume-lashes',
    name: 'Mega Volume Lashes',
    category: 'dramatic',
    subtitle: 'Maximum Density 6D–10D Micro-Fiber Couture',
    tagline: 'Extreme pitch-black density & opulent drama',
    image: '/images/lashes/lash-atelier-hero.jpg',
    description: 'The pinnacle of lash fullness. Utilizes hyper-fine 0.03mm silk micro-fibers sculpted into dense 6D–10D fans, delivering intense midnight-black drama and 100% natural lash coverage with safe weight distribution.',
    characteristics: [
      'High-density 6D–10D bouquet fans',
      'Ultra-fine 0.03mm featherweight silk filaments',
      'Continuous, solid jet-black lash baseline',
      'Maximum allowable coverage with zero clumping'
    ],
    suitableLook: 'Ideal for high-fashion runway, editorial photography, red-carpet galas, and maximalist beauty enthusiasts.',
    isSalonService: true,
    offeredTreatmentName: 'Mega Volume Lash Extensions ($150 CAD / 120 min)',
    serviceId: 'mega-volume-eyelash-extension',
    bestFor: ['High-fashion editorial shoots', 'Royal wedding ceremonies', 'Maximalist dramatic style'],
    recommendedCurl: 'D-Curl or CC-Curl',
    recommendedLength: 'Statement (12mm – 15mm)',
    recommendedFullness: 'Mega Density (6D – 10D Fans)',
    referenceNote: 'Salon-approved offered treatment. Requires pristine natural lash health assessment prior to application.'
  },
  {
    id: 'natural-lash-look',
    name: 'Natural Lash Look',
    category: 'natural',
    subtitle: 'Botanical Keratin Infusion & Lash Architecture',
    tagline: 'Effortless "your lashes but better" purity',
    image: '/images/lashes/lash-lift-natural.jpg',
    description: 'A minimalist approach dedicated to enhancing your existing natural lashes. Pairs precision root lifting, organic peptide strengthening serums, and optional soft tinting without artificial extensions.',
    characteristics: [
      'Zero artificial lash extensions applied',
      'Lifts natural lashes directly from the eyelid root',
      'Peptide and keratin conditioning infusion',
      '100% hypoallergenic and low-maintenance'
    ],
    suitableLook: 'Created for active clients, gym-goers, swimmers, or anyone seeking effortless beauty with zero home refill upkeep.',
    isSalonService: true,
    offeredTreatmentName: 'Natural Lash Enhancement / Keratin Lash Lift ($65–$70 CAD)',
    serviceId: 'natural-lash-enhancement',
    bestFor: ['Athletes & swimmers', 'Minimalist beauty routines', 'Sensitive eye clients'],
    recommendedCurl: 'Natural C-Curl Shield',
    recommendedLength: 'Natural lash length',
    recommendedFullness: '100% Natural Lashes',
    referenceNote: 'Salon-approved offered treatment. Lasts 6 to 8 weeks through your natural lash growth cycle.'
  },
  {
    id: 'wispy-lash-look',
    name: 'Wispy Lash Look',
    category: 'wispy',
    subtitle: 'Kim-K Inspired Staggered Peak & Valley Mapping',
    tagline: 'Textured flutter with intentional airy spikes',
    image: '/images/lashes/lash-styles-wispy.jpg',
    description: 'An editorial mapping technique characterized by alternating shorter base fans with intentionally longer "closed fan" spikes. Recreates the coveted Kim-K red-carpet flutter with airy, playful movement.',
    characteristics: [
      'Alternating long textured spike peaks with shorter base fans',
      'Airy, dimensional flutter that dances in natural light',
      'Prevents a blocky or overly dense appearance',
      'Artistic lash mapping tailored to brow arch heights'
    ],
    suitableLook: 'Best suited for modern trendsetters who love photographic texture and dimensional flutter without heavy thickness.',
    isSalonService: false,
    offeredTreatmentName: 'Inspiration Design Map (Customizable with Hybrid or Volume Service)',
    serviceId: 'hybrid-eyelash-extension',
    bestFor: ['Photographic events & content creation', 'Clients desiring textured dimension', 'Bridal showers'],
    recommendedCurl: 'D-Curl spikes over C-Curl base',
    recommendedLength: 'Staggered (9mm base up to 14mm spikes)',
    recommendedFullness: 'Textured Hybrid Spikes',
    referenceNote: 'Inspiration styling technique. Can be requested during Hybrid or Volume extension appointments.'
  },
  {
    id: 'doll-eye',
    name: 'Doll Eye',
    category: 'soft-glam',
    subtitle: 'Centered Length Symmetry for Wide-Awake Doe Eyes',
    tagline: 'Round, youthful, wide-awake ocular illusion',
    image: '/images/lashes/lash-doll-eye.jpg',
    description: 'A structural lash map where the longest extensions are placed precisely over the pupil in the center of the upper eyelid, while shorter lengths taper toward both corners. Opens eyes vertically for an alert, doe-eyed aesthetic.',
    characteristics: [
      'Peak lengths positioned over the center pupil',
      'Graceful tapering at both inner and outer corners',
      'Creates a visually larger, more rounded eye contour',
      'Lifts hooded eyelids by drawing attention upward'
    ],
    suitableLook: 'Ideal for clients with hooded, monolid, or almond eyes who want to visually enlarge and brighten their gaze.',
    isSalonService: false,
    offeredTreatmentName: 'Inspiration Design Map (Applicable to Classic, Hybrid, or Volume)',
    serviceId: 'volume-eyelash-extension',
    bestFor: ['Hooded & deep-set eyes', 'Monolid eye shapes', 'Clients wanting a youthful, alert gaze'],
    recommendedCurl: 'D-Curl or CC-Curl',
    recommendedLength: 'Medium Centered (11mm–13mm peak)',
    recommendedFullness: 'Light to Full Glamour',
    referenceNote: 'Inspiration styling map. Our certified artist calibrates peak placement to your pupil alignment.'
  },
  {
    id: 'cat-eye',
    name: 'Cat Eye',
    category: 'dramatic',
    subtitle: 'Elongated Outer Wings for Feline Allure',
    tagline: 'Sensual liquid-eyeliner winged silhouette',
    image: '/images/lashes/lash-cat-eye.jpg',
    description: 'Begins with shorter, delicate extensions at the inner tear duct that progressively elongate toward the outer corner, culminating in sweeping winged tips that visually stretch the eye outward into a sultry feline flick.',
    characteristics: [
      'Gradual extension progression from tear duct to temple',
      'Winged outer corners simulating liquid eyeliner flair',
      'Visually elongates round or close-set eye shapes',
      'L-Curl or D-Curl outer accents for crisp lift'
    ],
    suitableLook: 'Fabulous for round or almond eyes desiring a sensual, lifted, winged effect without applying daily liquid eyeliner.',
    isSalonService: false,
    offeredTreatmentName: 'Inspiration Design Map (Applicable to Hybrid or Volume)',
    serviceId: 'hybrid-eyelash-extension',
    bestFor: ['Round & close-set eyes', 'Clients seeking an elongated gaze', 'Winged eyeliner devotees'],
    recommendedCurl: 'C-Curl transitioning to L-Curl or D-Curl outer wings',
    recommendedLength: 'Graduated (8mm inner to 14mm outer)',
    recommendedFullness: 'Medium to Full Glamour',
    referenceNote: 'Inspiration styling map. For downturned eye corners, our artist modifies outer taper to avoid drooping.'
  },
  {
    id: 'open-eye',
    name: 'Open Eye',
    category: 'natural',
    subtitle: 'Curvature Lift Focused Across the Entire Iris',
    tagline: 'Awakened, vibrant symmetry that highlights eye color',
    image: '/images/lashes/lash-doll-eye.jpg',
    description: 'A balanced geometric mapping technique that places uniform lifting curvature across the middle two-thirds of the eyelid. Opens the entire gaze uniformly without pulling excessively inward or outward.',
    characteristics: [
      'Extended curvature across the middle two-thirds of the lash line',
      'Soft feathering on outer corners preventing corner droop',
      'Enhances natural eye color and iris clarity',
      'Subtle and sophisticated for daily wearing'
    ],
    suitableLook: 'Recommended for clients with deep-set or smaller eyes wanting to project an alert, awake, and energetic expression.',
    isSalonService: false,
    offeredTreatmentName: 'Inspiration Design Map (Applicable to Classic, Hybrid, or Lift)',
    serviceId: 'classic-eyelash-extension',
    bestFor: ['Deep-set & downturned eyes', 'Mature eye contours', 'Everyday effortless vibrance'],
    recommendedCurl: 'C-Curl with gentle upward sweep',
    recommendedLength: 'Subtle to Medium (9mm–11mm)',
    recommendedFullness: 'Natural to Light Volume',
    referenceNote: 'Inspiration styling map. Designed to keep eye corners lifted and free of visual weight.'
  },
  {
    id: 'wet-look',
    name: 'Wet Look',
    category: 'wispy',
    subtitle: 'Glossy De-Structured Spikes with Closed Micro-Fans',
    tagline: 'High-gloss editorial dewy chic',
    image: '/images/lashes/lash-wet-look.jpg',
    description: 'An avant-garde technique using closed, unbloomed volume fans to mimic the sleek, glossy texture of freshly wet lashes after a swim or shower. Delivers sharp definition, dark contrast, and modern runway grit.',
    characteristics: [
      'Closed volume micro-fans that do not bloom',
      'High-contrast spiky silhouettes resembling mascara tips',
      'Dewy, glossy appearance with sharp tips',
      'High retention due to narrow fan bonding surface'
    ],
    suitableLook: 'Perfect for fashion-forward clients who love glossy editorial styling, high-contrast lashes, and clean graphic beauty.',
    isSalonService: false,
    offeredTreatmentName: 'Inspiration Design Map (Customizable upon request)',
    serviceId: 'hybrid-eyelash-extension',
    bestFor: ['Editorial photo shoots', 'Fashion-forward clients', 'Modern runway lovers'],
    recommendedCurl: 'D-Curl or M-Curl',
    recommendedLength: 'Medium (10mm–13mm spikes)',
    recommendedFullness: 'Narrow Closed Micro-Fans',
    referenceNote: 'Inspiration styling technique. Requires specialized artist fan manipulation during application.'
  },
  {
    id: 'anime-inspired-look',
    name: 'Anime-Inspired Look',
    category: 'dramatic',
    subtitle: 'Dramatic Manga Spikes with Doll-Like Gaps',
    tagline: 'Manga-style graphic symmetry and playful peaks',
    image: '/images/lashes/lash-wet-look.jpg',
    description: 'Inspired by Japanese manga and anime heroines, this expressive design features prominent, distinct spike clusters spaced symmetrically across the lash line with shorter delicate filler lashes in between.',
    characteristics: [
      'Prominent, defined spike clusters spaced with deliberate gaps',
      'Accentuates bottom lash symmetry and graphic geometry',
      'Playful, animated, and doll-like optical impact',
      'Ultra-precise mapping calibrated to upper lid landmarks'
    ],
    suitableLook: 'Created for creative souls, cosplay artists, creators, and bold beauties wanting a truly distinctive, theatrical gaze.',
    isSalonService: false,
    offeredTreatmentName: 'Inspiration Design Map (Custom Artistic Request)',
    serviceId: 'volume-eyelash-extension',
    bestFor: ['Content creators & influencers', 'Cosplay & anime enthusiasts', 'Bold artistic statements'],
    recommendedCurl: 'D-Curl with sharp taper',
    recommendedLength: 'Extreme Staggered (8mm base with 14mm–16mm spikes)',
    recommendedFullness: 'Graphic Peak Clusters',
    referenceNote: 'Inspiration artistic style. Placement and spacing are individually tailored to your eye shape.'
  },
  {
    id: 'soft-glam-lash-look',
    name: 'Soft Glam Lash Look',
    category: 'soft-glam',
    subtitle: 'Cloud-Like Dimensional Softness & Fluffy Elegance',
    tagline: 'Romantic, dreamy flutter for weddings and milestones',
    image: '/images/lashes/lash-styles-wispy.jpg',
    description: 'The epitome of romantic sophistication. Soft, ultra-light 2D–4D fans are blended seamlessly to create a diffuse, cloud-like lash line that softens facial features while delivering undeniable red-carpet elegance.',
    characteristics: [
      'Ultra-soft 0.05mm cashmere silk fibers',
      'Cloud-like diffused lash tips without harsh lines',
      'Enhances natural eye brightness without overbearing darkness',
      'Complements soft neutral bridal and celebration makeup'
    ],
    suitableLook: 'The ultimate choice for brides, gala guests, and celebratory events where timeless romantic beauty is the goal.',
    isSalonService: false,
    offeredTreatmentName: 'Inspiration Design Map (Applicable to Hybrid or Volume Sets)',
    serviceId: 'hybrid-eyelash-extension',
    bestFor: ['Bridal portraits & wedding days', 'Romantic date nights & galas', 'Balanced soft luxury'],
    recommendedCurl: 'Soft C-Curl into CC-Curl',
    recommendedLength: 'Medium (10mm–13mm feathered)',
    recommendedFullness: 'Soft Dimensional Volume',
    referenceNote: 'Inspiration design styling. Beautifully paired with our Bridal Lash Styling service.'
  }
];

export const LASH_JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Lash Consultation',
    summary: 'Discuss desired appearance, lifestyle, and treatment suitability.',
    details: 'Your experience begins with an open conversation with master stylist Janki Khatroja. We explore your beauty routine, event milestones, preferred silhouettes, and aesthetic goals to identify the most flattering lash protocol.'
  },
  {
    step: '02',
    title: 'Natural Lash Assessment',
    summary: 'Comprehensive evaluation of natural lash condition and follicle vitality.',
    details: 'Using magnification, we examine your natural lash diameter, growth density, curvature, and follicle health. We strictly verify that your natural lashes can safely support your desired curl and extension weight without strain.'
  },
  {
    step: '03',
    title: 'Lash Preparation',
    summary: 'Meticulous purification, oil-free lash bath, and hydrogel eye isolation.',
    details: 'We cleanse your eye area with an ophthalmologist-grade foaming lash bath to remove all traces of sebum, dust, and makeup. Soothing hydrogel collagen pads are placed to isolate bottom lashes and protect sensitive under-eye skin.'
  },
  {
    step: '04',
    title: 'Lash Application',
    summary: 'Precision 1:1 strand isolation and adhesive bonding of your selected treatment.',
    details: 'Working strand by strand, our certified director isolates each natural lash and places weightless silk fibers or handcrafted fans with medical-grade, hypoallergenic adhesive positioned precisely 0.5mm from the skin margin.'
  },
  {
    step: '05',
    title: 'Final Styling',
    summary: 'Meticulous separation review, nano-mist cure, and symmetry inspection.',
    details: 'Every extension is inspected for flawless separation, clean direction, and balance. We administer a gentle soothing nano-mister to instantly polymerize adhesive bonds and eliminate lingering fumes before you open your eyes.'
  },
  {
    step: '06',
    title: 'Aftercare Guidance',
    summary: 'Personalized maintenance tutorial, spoolie demonstration, and care guide.',
    details: 'We present you with a complimentary luxury spoolie and walk you through step-by-step home maintenance, cleansing protocols, sleeping tips, and normal shedding cycles to ensure optimal 4-to-6 week retention.'
  }
];

export const LASH_AFTERCARE_CARDS = [
  {
    id: 'first-24-48-hours',
    badge: 'First 24–48 Hours',
    title: 'Critical Adhesive Curing Period',
    iconName: 'Droplet',
    points: [
      'Follow the specific product and adhesive aftercare instructions strictly.',
      'Avoid activities or products restricted by your technician, including steam rooms, saunas, hot yoga, and direct high-pressure shower spray.',
      'Do not rub, pull, touch, or pick at your lashes while the bonding matrix cures.',
      'Sleep on your back with lashes clear of bedding.'
    ]
  },
  {
    id: 'daily-lash-care',
    badge: 'Daily Care Ritual',
    title: 'Gentle Cleansing & Brushing',
    iconName: 'Sparkles',
    points: [
      'Clean lashes gently once daily using an approved oil-free, lash-safe foaming cleanser.',
      'Keep the lash baseline clean and free from environmental dust, sebum, and dead skin buildup.',
      'Brush gently with a clean, dry spoolie only when lashes are fully dry, starting from mid-shaft to tips.',
      'Avoid excessive rubbing, pulling, or aggressive towel-drying.'
    ]
  },
  {
    id: 'products-and-makeup',
    badge: 'Product Compatibility',
    title: 'Cosmetic & Skincare Selection',
    iconName: 'ShieldCheck',
    points: [
      'Verify compatibility of all makeup and facial skincare with lash extensions before use.',
      'Strictly avoid waterproof mascara, mechanical eyelash curlers, and oil-based serums near the eyelids.',
      'Avoid cleansers containing glycols, mineral oils, or heavy oils that weaken extension adhesives.',
      'Use gentle, oil-free micellar water and lint-free cotton applicators for eyeshadow removal.'
    ]
  },
  {
    id: 'sleeping-and-habits',
    badge: 'Lifestyle & Sleep',
    title: 'Sleeping Habits & Friction Prevention',
    iconName: 'Moon',
    points: [
      'Avoid pressing, smashing, or rubbing your eyes against standard cotton pillows during sleep.',
      'Switch to a smooth silk or satin pillowcase to reduce nocturnal fiber friction and preserve fan shape.',
      'Handle lashes gently during daily clothing changes, sunglasses wear, and sports routines.',
      'Never pull or tug at an outgrown extension that feels loose.'
    ]
  },
  {
    id: 'lash-maintenance',
    badge: 'Natural Growth Cycle',
    title: 'Normal Shedding & Maintenance',
    iconName: 'RefreshCcw',
    points: [
      'Natural eyelashes cycle through growth phases and shed normally at a rate of 3 to 5 lashes per eye every single day.',
      'When a natural lash sheds, its attached extension sheds with it — this is a sign of healthy follicle regeneration, not damage.',
      'Professional touch-up maintenance is typically recommended every 2 to 3 weeks to replace naturally shed lashes and balance outgrown fans.',
      'Do not attempt home maintenance or use store-bought glue.'
    ]
  },
  {
    id: 'when-to-seek-help',
    badge: 'Health & Medical Guidance',
    title: 'Irritation Protocol & Safety Warnings',
    iconName: 'AlertTriangle',
    points: [
      'Watch for warning signs such as persistent eye redness, eyelid swelling, persistent pain, discharge, or intense itching.',
      'If irritation occurs, stop using all eye-area cosmetic products immediately and seek appropriate professional medical advice.',
      'Never encourage or attempt to pull, yank, or remove extensions yourself if you experience an adverse reaction.',
      'Contact our studio for safe, damage-free professional cream removal performed by certified staff.'
    ]
  }
];

export const LASH_CHECKLIST_DATA = [
  {
    id: 'clean-gently',
    title: 'Clean lashes gently with an oil-free, lash-safe cleanser daily',
    category: 'Daily Hygiene'
  },
  {
    id: 'avoid-rubbing',
    title: 'Avoid rubbing, pulling, picking, or sleeping face-down on pillows',
    category: 'Preservation'
  },
  {
    id: 'brush-properly',
    title: 'Brush gently with a clean dry spoolie only when lashes are fully dry',
    category: 'Styling'
  },
  {
    id: 'use-compatible-products',
    title: 'Use strictly oil-free makeup, eyeliner, and gentle skincare around the eyes',
    category: 'Cosmetics'
  },
  {
    id: 'follow-instructions',
    title: 'Follow professional aftercare instructions and monitor for any sensitivity',
    category: 'Safety'
  }
];

export const LASH_FAQS_DATA = [
  {
    question: 'How long do lash extensions typically last?',
    answer: 'Eyelash extensions remain bonded to your natural eyelashes throughout their natural growth and shedding cycle, which typically spans 6 to 8 weeks. Because humans naturally shed 3 to 5 natural lashes per eye each day, professional touch-ups are usually recommended every 2 to 3 weeks to maintain consistent fullness and symmetry. Individual retention also depends on personal skin oiliness, daily aftercare adherence, and lifestyle habits.'
  },
  {
    question: 'What is the difference between classic, hybrid, and volume lashes?',
    answer: 'The primary difference lies in the ratio of extensions applied to each natural lash. Classic lashes use a 1:1 ratio (one extension attached to one natural lash) for crisp, clean mascara-like definition. Volume lashes use handcrafted bouquet fans of 3 to 5 ultra-fine micro-fibers (3D–5D) on each natural lash for dense, velvety fullness. Hybrid lashes combine both techniques (typically a 50/50 blend) to create a dimensional, textured wispy finish.'
  },
  {
    question: 'Is natural lash shedding normal?',
    answer: 'Yes, natural lash shedding is completely normal, healthy, and expected. Every natural eyelash follicle progresses through three distinct growth stages: the active growth phase (anagen), the transitional resting phase (catagen), and the shedding phase (telogen). Most people naturally shed 3 to 5 lashes per eye every single day as new baby lashes emerge beneath them. When an extension sheds with a natural lash still attached to its root, it simply means that hair completed its biological lifecycle.'
  },
  {
    question: 'How should lash extensions be cleaned?',
    answer: 'Lash extensions should be cleansed gently once daily starting 24 to 48 hours after your appointment. Use a specialized, oil-free foaming lash wash and a soft cleansing brush. Gently work the foam downward along the lash line and eyelids using circular motions, then rinse with cool or lukewarm water. Pat around the eyes gently with a lint-free towel and allow the extensions to air dry before brushing them upward with a clean spoolie.'
  },
  {
    question: 'Can I wear makeup with lash extensions?',
    answer: 'You may wear face makeup and oil-free eye cosmetics, such as water-based eyeshadows and oil-free liquid eyeliners applied along the upper lid. However, you should strictly avoid waterproof mascara, fiber mascaras, pencil eyeliners containing waxes or oils, and liquid eyeliners containing glycols, as these dissolve the adhesive bond and cause fans to clump. When removing makeup, use gentle, oil-free micellar water applied with a lint-free swab.'
  },
  {
    question: 'Why is a patch test recommended?',
    answer: 'A complimentary 15-minute patch test is strongly recommended for first-time clients, contact lens wearers, and anyone with sensitive skin or a history of allergic reactions. During a patch test, our certified artist applies a small number of extension fibers to the outer corner of each eye using our hypoallergenic adhesive. This allows you to monitor for any subtle sensitivity, redness, or histamine response over a 24-hour period before undergoing a full application.'
  },
  {
    question: 'What should I do if irritation occurs?',
    answer: 'If you experience unusual itching, persistent redness, swelling, burning, or signs of an allergic reaction, stop touching or rubbing your eyes immediately. Avoid applying any creams or home solvents. Never attempt to pull, pluck, or forcefully remove extensions yourself, as this can severely damage your natural lash follicles. Instead, seek appropriate professional medical advice, and contact our studio for safe, damage-free professional cream removal.'
  }
];

export const LASH_STYLE_FINDER_QUESTIONS = [
  {
    id: 'appearance',
    title: '1. Desired Appearance Intensity',
    subtitle: 'How prominent do you want your lash look to be?',
    options: [
      { id: 'natural', label: 'Natural & Refined', desc: 'Clean, effortless, like an immaculate coat of luxury mascara' },
      { id: 'soft-glam', label: 'Soft Glamour', desc: 'Noticeable texture, flirty flutter, and dimensional depth' },
      { id: 'dramatic', label: 'Dramatic & Bold', desc: 'Maximum dark lash-line intensity, winged angles, or statement spikes' }
    ]
  },
  {
    id: 'volume',
    title: '2. Volume & Density Level',
    subtitle: 'What density of lash fibers feels right for your eyes?',
    options: [
      { id: 'soft', label: 'Delicate / Soft (1:1 to 2D)', desc: 'Lightweight feathering that preserves individual strand separation' },
      { id: 'medium', label: 'Balanced / Medium (3D to 4D)', desc: 'Fluffy dimensional density that fills any natural lash gaps' },
      { id: 'full', label: 'Full / Mega (5D to 10D)', desc: 'Dense, pitch-black velvety coverage creating an eyeliner band' }
    ]
  },
  {
    id: 'finish',
    title: '3. Texture & Silhouette Finish',
    subtitle: 'Which optical silhouette best suits your eye contour?',
    options: [
      { id: 'wispy', label: 'Wispy & Textured Spikes', desc: 'Staggered peak lengths creating airy, fluttery dimension' },
      { id: 'defined', label: 'Uniform & Defined Arc', desc: 'Smooth, unbroken curve contouring seamlessly along your lid' },
      { id: 'winged', label: 'Winged Cat-Eye Flare', desc: 'Gradually extending toward the temples for a lifted feline gaze' },
      { id: 'centered', label: 'Centered Doll-Eye Lift', desc: 'Longest strands centered over the pupil for round, doe eyes' }
    ]
  },
  {
    id: 'occasion',
    title: '4. Lifestyle & Occasion Context',
    subtitle: 'Where will you be wearing your signature lash look most?',
    options: [
      { id: 'everyday', label: 'Everyday Work & Casual', desc: 'Low-key, comfortable, professional, and practical' },
      { id: 'evening', label: 'Weekend Social & Evening', desc: 'Photogenic, versatile day-to-night glamour' },
      { id: 'milestone', label: 'Bridal & Red-Carpet Gala', desc: 'High-definition, tear-resistant, camera-ready perfection' }
    ]
  }
];
