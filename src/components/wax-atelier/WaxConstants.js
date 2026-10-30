// GLAM GIRL BY JANKI — The Wax Atelier Constants
// Authentic waxing categories, prep guidelines, aftercare protocols, and FAQs

export const WAX_CATEGORIES = [
  {
    id: 'facial-waxing',
    name: 'Facial Waxing',
    group: 'face',
    subtitle: 'Silky, Peach-Fuzz Free Complexion & Radiant Glow',
    tagline: 'Precision clearing for seamless makeup application',
    image: '/images/facial/mini-facial-exfoliation.webp',
    description: 'A comprehensive facial smoothing treatment targeting peach fuzz, forehead hairline, cheeks, and chin using low-temperature hypoallergenic wax formulated for delicate facial skin.',
    idealLength: '1/8 inch (fine vellus hair)',
    benefits: [
      'Eliminates vellus hair for glass-like skincare absorption',
      'Gentle peel-off without follicle trauma',
      'Includes calming botanical rosewater seal'
    ],
    recommendedInterval: '3 to 4 weeks'
  },
  {
    id: 'eyebrow-waxing',
    name: 'Eyebrow Waxing',
    group: 'face',
    subtitle: 'Crisp Arch Framing & Clean Symmetry Alignment',
    tagline: 'Clean arch definition tailored to your facial landmarks',
    image: '/images/brows/brow-arched.webp',
    description: 'Precision eyebrow contouring using fine strip wax along the upper and lower orbital ridge, paired with complimentary brow trimming and cooling organic aloe vera gel.',
    idealLength: '1/4 inch (hair should lay flat)',
    benefits: [
      'Sharp, defined baseline and tail taper',
      'Fast, virtually painless arch cleanup',
      'Finished with soothing pure organic aloe'
    ],
    recommendedInterval: '2 to 3 weeks'
  },
  {
    id: 'upper-lip-waxing',
    name: 'Upper Lip Waxing',
    group: 'face',
    subtitle: 'Ultra-Gentle Sensitive Skin Smoothing',
    tagline: 'Quick 5-minute cleanup with chamomile protection',
    image: '/images/threading/gulab-upper-lip-threading.webp',
    description: 'A targeted rapid treatment for the philtrum and upper lip contours using warm chamomile-infused wax designed specifically to avoid redness or skin peeling.',
    idealLength: '1/8 to 1/4 inch',
    benefits: [
      'Rapid 5-minute appointment duration',
      'Zero stubble or shadow',
      'Infused with anti-inflammatory chamomile'
    ],
    recommendedInterval: '2 to 3 weeks'
  },
  {
    id: 'arm-waxing',
    name: 'Arm Waxing',
    group: 'arms',
    subtitle: 'Half Arm or Full Arm Flawless Touch',
    tagline: 'Silky smooth arms from shoulders down to fingertips',
    image: '/images/waxing/wax-hero.webp',
    description: 'Thorough hair removal across the forearm, upper arm, and fingers using botanical roll-on or warm wax, leaving arms soft, radiant, and completely hair-free.',
    idealLength: '1/4 inch (grain of rice)',
    benefits: [
      'Covers arms, elbows, wrists, and individual fingers',
      'Weakens hair root over repeated sessions',
      'Includes deep hydrating lavender body milk'
    ],
    recommendedInterval: '4 to 5 weeks'
  },
  {
    id: 'underarm-waxing',
    name: 'Underarm Waxing',
    group: 'arms',
    subtitle: 'Hygienic Hard-Wax Purification',
    tagline: 'Zero daily shaving irritation or dark shadow',
    image: '/images/waxing/wax-calming.webp',
    description: 'Professional underarm waxing using flexible stripless hard wax that shrinks around coarse hairs without pulling on sensitive underarm skin tissue.',
    idealLength: '1/4 to 1/2 inch',
    benefits: [
      'Stripless hard wax protects fragile axillary skin',
      'Eliminates 5 o\'clock shadow caused by shaving',
      'Keeps underarms smooth for 3 to 4 weeks'
    ],
    recommendedInterval: '3 to 4 weeks'
  },
  {
    id: 'full-leg-waxing',
    name: 'Full Leg Waxing',
    group: 'legs',
    subtitle: 'Head-to-Toe Lower Body Velvet Transformation',
    tagline: 'From upper thighs down to ankles and toes',
    image: '/images/waxing/wax-finishing.webp',
    description: 'A comprehensive leg ritual covering upper thighs, knees, calves, ankles, and tops of toes, concluding with an invigorating botanical oil massage.',
    idealLength: '1/4 inch (about 2 weeks of natural growth)',
    benefits: [
      'Complete 360-degree lower body smoothness',
      'Removes deep roots for up to 5 weeks of freedom',
      'Finished with nourishing botanical body oil'
    ],
    recommendedInterval: '4 to 6 weeks'
  },
  {
    id: 'half-leg-waxing',
    name: 'Half Leg Waxing',
    group: 'legs',
    subtitle: 'Knee-to-Ankle Everyday Convenience',
    tagline: 'Quick 25-minute maintenance for busy schedules',
    image: '/images/waxing/wax-hero.webp',
    description: 'Focused waxing from knees down through the shin, calves, ankles, and toes using professional honey strip wax with a soothing menthol cooling lotion.',
    idealLength: '1/4 inch',
    benefits: [
      'Fast 25-minute salon visit',
      'Perfect for skirt and fitness routine readiness',
      'Includes cooling menthol hydration finish'
    ],
    recommendedInterval: '3 to 4 weeks'
  },
  {
    id: 'bikini-waxing',
    name: 'Bikini Waxing',
    group: 'bikini',
    subtitle: 'Clean Panty Line Precision & Comfort',
    tagline: 'Neat, modest perimeter grooming for swimwear',
    image: '/images/waxing/wax-calming.webp',
    description: 'Grooming around the natural bikini line edges to remove hairs that extend beyond swimsuit borders, performed with sanitized stripless blue wax.',
    idealLength: '1/4 to 1/2 inch',
    benefits: [
      'Ideal for first-time waxing clients',
      'Clean swimwear border contouring',
      'Includes soothing anti-bump botanical balm'
    ],
    recommendedInterval: '3 to 4 weeks'
  },
  {
    id: 'brazilian-waxing',
    name: 'Brazilian Waxing',
    group: 'bikini',
    subtitle: 'Complete Intimate Smoothness & Clean Confidence',
    tagline: 'Full front-to-back silky perfection in private suite',
    image: '/images/waxing/wax-calming.webp',
    description: 'Complete intimate waxing in our single-guest Ottawa suite using European low-temperature stripless wax that adheres exclusively to hairs, not delicate skin.',
    idealLength: '1/4 to 1/2 inch (length of an eyelash or grain of rice)',
    benefits: [
      'Private, hygienic, discreet single-guest suite',
      'Gentle low-temperature stripless hard wax',
      'Ingrown-hair prevention application included'
    ],
    recommendedInterval: '4 to 5 weeks'
  },
  {
    id: 'back-waxing',
    name: 'Back Waxing',
    group: 'body',
    subtitle: 'Upper, Lower, or Full Back Clarifying Treatment',
    tagline: 'Silky, breathable skin across shoulders and spine',
    image: '/images/waxing/wax-hero.webp',
    description: 'Clean hair removal across the shoulders, shoulder blades, and lower lumbar region, finished with an antibacterial tea tree wipe to prevent post-wax blemishes.',
    idealLength: '1/4 inch',
    benefits: [
      'Eliminates back fuzz and coarse shoulder hair',
      'Tea tree antiseptic wipe prevents backne/bumps',
      'Smooth, breathable feel under all fabrics'
    ],
    recommendedInterval: '4 to 6 weeks'
  },
  {
    id: 'full-body-waxing',
    name: 'Full Body Waxing',
    group: 'body',
    subtitle: 'The Ultimate All-Over Silky Reset',
    tagline: 'Head-to-toe smoothness in a single dedicated ritual',
    image: '/images/waxing/wax-artist-client.webp',
    description: 'A luxurious full-suite session combining full legs, full arms, underarms, torso, and facial zones with restorative botanical skin calming treatments.',
    idealLength: '1/4 inch across all target zones',
    benefits: [
      'Comprehensive head-to-toe hair removal',
      'Uniform regrowth timeline for all areas',
      'Deep post-wax botanical recovery infusion'
    ],
    recommendedInterval: '4 to 6 weeks'
  }
];

export const WAX_EXPERIENCE_STEPS = [
  {
    step: '01',
    title: 'Skin Consultation',
    summary: 'Skin history, allergy screening, and sensitivity analysis.',
    details: 'We assess your skin type, hair texture, and any active topical ingredients (such as retinol, AHAs, or acne treatments) to select the optimal wax formulation.'
  },
  {
    step: '02',
    title: 'Skin Preparation',
    summary: 'Sanitization, oil removal, and protective skin barrier.',
    details: 'The treatment area is cleansed with a gentle antibacterial pre-wax tonic, patted completely dry, and lightly dusted with cornstarch or barrier oil to protect the epidermis.'
  },
  {
    step: '03',
    title: 'Professional Wax Application',
    summary: 'Calibrated temperature and anatomical grain direction.',
    details: 'Warm honey strip wax or low-temperature flexible hard wax is applied precisely in the direction of natural hair growth with single-use sterile wooden spatulas.'
  },
  {
    step: '04',
    title: 'Gentle Removal',
    summary: 'Taut skin support and rapid, low-angle release.',
    details: 'The skin is held firmly taut, and the wax is removed parallel to the skin surface in one fluid motion, extracting hairs cleanly from the follicle bulb with minimal sensation.'
  },
  {
    step: '05',
    title: 'Soothing Skin Care',
    summary: 'Calming botanical lotions, pure aloe, and cooling pressure.',
    details: 'Immediate hand pressure neutralizes pain receptors, followed by pure organic aloe vera, chamomile lotion, or antibacterial tea tree oil to calm warmth and reduce pinkness.'
  },
  {
    step: '06',
    title: 'Aftercare Guidance',
    summary: 'Personalized 48-hour instructions and ingrown prevention.',
    details: 'You receive clear guidance on when to begin exfoliation, safe clothing choices, and recommended home moisturizers to maintain silky skin until your next appointment.'
  }
];

export const WAX_PREP_GUIDELINES = [
  {
    id: 'hair-length',
    badge: 'Crucial Requirement',
    title: 'Optimal Hair Length (1/4 Inch)',
    summary: 'Hairs should be approximately 1/4 inch long — roughly the length of a grain of rice or an eyelash (2 to 3 weeks of natural growth after shaving).',
    details: 'Wax needs adequate grip to extract hair from the follicle bulb. Hairs that are too short may break or be missed, while overly long hairs can cause extra discomfort. Please avoid trimming too close before your visit.'
  },
  {
    id: 'skin-cleansing',
    badge: 'Clean Canvas',
    title: 'Pre-Session Skin Cleansing',
    summary: 'Shower and cleanse the area using a mild, fragrance-free body wash on the day of your appointment.',
    details: 'Remove sweat, natural sebum, and surface debris so the wax adheres cleanly. Avoid applying heavy body butters, tanning lotions, deodorants, or perfumed oils immediately before waxing, as they create a barrier.'
  },
  {
    id: 'exfoliation',
    badge: '24-48 Hours Prior',
    title: 'Exfoliation Timing',
    summary: 'Gently exfoliate the target skin 24 to 48 hours before your appointment — never on the day of waxing.',
    details: 'A gentle scrub or exfoliating mitt lifts trapped hairs and sloughs away dead surface cells. However, exfoliating on the same day can sensitize the skin barrier and cause unnecessary irritation.'
  },
  {
    id: 'sensitive-skin',
    badge: 'Safety Protocols',
    title: 'Active Ingredients & Medications',
    summary: 'Pause retinoids, tretinoin, Accutane, and chemical peels around facial waxing zones.',
    details: 'Topical vitamin A derivatives and high-strength glycolic/salicylic acids thin the upper stratum corneum and can cause skin lifting. Discontinue topical retinoids 5–7 days prior. Oral Accutane requires waiting 6 months post-treatment.'
  },
  {
    id: 'comfort-prep',
    badge: 'Client Comfort',
    title: 'Comfort & Clothing Choices',
    summary: 'Wear loose, breathable cotton clothing and stay well-hydrated before your visit.',
    details: 'Tight synthetic jeans or lace can create friction and trap heat on freshly waxed follicles. Loose cotton joggers or soft garments allow the skin to breathe. Avoid excessive caffeine right before waxing, as stimulants can heighten nerve sensitivity.'
  }
];

export const WAX_AFTERCARE_CARDS = [
  {
    id: 'first-24-hours',
    badge: 'First 24 Hours',
    title: 'The Golden 24-Hour Rule',
    points: [
      'Avoid hot baths, saunas, hot tubs, and steam rooms; take lukewarm showers only.',
      'Refrain from vigorous exercise, heavy sweating, and gym sessions for 24 hours.',
      'Wear loose, soft, breathable cotton garments to prevent friction against open follicles.',
      'Do not apply makeup, scented lotions, perfumes, or chemical deodorants to freshly waxed skin.'
    ]
  },
  {
    id: 'avoiding-irritation',
    badge: 'Irritation Shield',
    title: 'Preventing Follicular Irritation',
    points: [
      'Avoid touching freshly waxed skin with unwashed hands to prevent bacterial transfer.',
      'Do not swim in chlorinated pools, lakes, or oceans for at least 48 hours.',
      'Avoid tanning beds, direct sunlight, and UV exposure on freshly waxed zones.',
      'Skip tight synthetic leggings, tight waistbands, or rough fabrics that cause chafe.'
    ]
  },
  {
    id: 'moisturizing',
    badge: 'Skin Hydration',
    title: 'Gentle Botanical Hydration',
    points: [
      'Apply pure soothing organic aloe vera gel to reduce temporary warmth or mild redness.',
      'Use non-comedogenic, fragrance-free body moisturizers 24 hours post-wax.',
      'Look for calming ingredients like chamomile, lavender, green tea, and jojoba oil.',
      'Avoid heavy mineral oils or thick petrolatum that clog open hair follicles.'
    ]
  },
  {
    id: 'exfoliation-timing',
    badge: 'Day 3 & Beyond',
    title: 'Strategic Exfoliation Timing',
    points: [
      'Begin gentle exfoliation 48 to 72 hours after your waxing appointment.',
      'Exfoliate 2 to 3 times weekly using a gentle body scrub or exfoliating washcloth.',
      'Light circular motions encourage new, soft hair tips to emerge cleanly without curling inward.',
      'Always follow exfoliation with a light, non-pore-clogging body lotion.'
    ]
  },
  {
    id: 'ingrown-prevention',
    badge: 'Smooth Maintenance',
    title: 'Ingrown-Hair Prevention Routine',
    points: [
      'Never pick, squeeze, or aggressively dig at developing bumps or ingrown hairs at home.',
      'Apply a targeted post-wax serum containing mild tea tree or lactic acid 3 days post-wax.',
      'Keep skin consistently hydrated so hair tips can easily penetrate the skin surface.',
      'Maintain consistent 3-to-5 week waxing intervals to weaken coarse follicle roots.'
    ]
  },
  {
    id: 'professional-advice',
    badge: 'Health Guidance',
    title: 'When to Consult a Professional',
    points: [
      'Mild pinkness and small histamine bumps typically subside within 2 to 24 hours.',
      'If irritation, severe tenderness, or redness persists beyond 48 hours, reach out to our concierge.',
      'Apply a cool chamomile compress if skin feels unusually warm after treatment.',
      'Our team is always available to answer post-care questions and suggest gentle home remedies.'
    ]
  }
];

export const WAX_CHECKLIST_DATA = [
  {
    id: 'loose-cotton',
    title: 'Wear loose, breathable cotton clothing to your appointment',
    category: 'Comfort'
  },
  {
    id: 'optimal-length',
    title: 'Ensure hair is at least 1/4 inch long (2-3 weeks post-shaving)',
    category: 'Preparation'
  },
  {
    id: 'clean-dry',
    title: 'Arrive with clean, dry skin free of heavy body oils and butters',
    category: 'Preparation'
  },
  {
    id: 'pause-retinol',
    title: 'Paused retinoids and strong AHA/BHA exfoliants 5-7 days prior',
    category: 'Safety'
  },
  {
    id: 'avoid-hot-baths',
    title: 'Skip hot baths, saunas, hot tubs, and heavy gym sessions for 24h',
    category: 'Aftercare'
  },
  {
    id: 'gentle-exfoliation',
    title: 'Exfoliate gently 2-3x weekly starting 48 hours after waxing',
    category: 'Maintenance'
  }
];

export const WAX_FAQS = [
  {
    question: 'How long does hair need to be before a waxing appointment?',
    answer: 'For optimal results, your hair should be approximately 1/4 inch long — about the size of a grain of rice or an eyelash. This typically corresponds to about 2 to 3 weeks of natural hair growth following your last shave. If hair is too short, the wax cannot grip it properly; if it is excessively long, our specialist can gently trim it before treatment for maximum comfort.'
  },
  {
    question: 'How often should I schedule waxing appointments?',
    answer: 'Most clients schedule waxing appointments every 3 to 5 weeks. Waxing pulls hair from the root, which weakens the hair follicle over time and leads to finer, softer, and slower regrowth. Maintaining a consistent routine ensures hairs stay on the same growth cycle for prolonged smoothness.'
  },
  {
    question: 'What is the difference between hard wax and soft strip wax?',
    answer: 'Hard wax (stripless wax) is applied warm and allowed to cool directly on the skin. It shrink-wraps tightly around hair strands without adhering to the living skin cells, making it ideal for sensitive and delicate areas like the face, underarms, and bikini zones. Soft strip wax is applied in a thin layer and removed with a fabric strip, which is highly efficient and gentle for larger areas such as legs, arms, and back.'
  },
  {
    question: 'How can I prevent ingrown hairs after waxing?',
    answer: 'The secret to preventing ingrown hairs is a balance of gentle exfoliation and consistent hydration. Wait 48 hours after waxing, then gently exfoliate 2 to 3 times a week using a body scrub or textured mitt. This removes dead skin cells that can trap new hair tips. Follow up daily with a lightweight, non-comedogenic moisturizer or tea tree soothing balm.'
  },
  {
    question: 'Can I get waxed if I am using retinol, tretinoin, or acne medications?',
    answer: 'If you are using topical retinoids, tretinoin, adapalene, or prescription chemical exfoliants, you must discontinue their use around the facial waxing zone for at least 5 to 7 days before your appointment, as these products thin the outer skin barrier. If you are taking oral Accutane (isotretinoin), you must wait at least 6 months after completing treatment before waxing.'
  },
  {
    question: 'What should I avoid immediately after waxing?',
    answer: 'For the first 24 to 48 hours, avoid anything that introduces heat, sweat, friction, or bacteria to freshly opened follicles: avoid hot tubs, saunas, steam rooms, swimming pools, direct sunlight/tanning beds, intense workouts, tight synthetic clothes, and fragranced lotions or sprays.'
  },
  {
    question: 'Is waxing safe during pregnancy?',
    answer: 'Yes, waxing is completely safe during pregnancy! Because hormonal changes increase blood flow to the skin, you may experience slightly higher skin sensitivity. Our master specialists take extra care to ensure maximum comfort, gentle low-temperature wax application, and soothing botanical finishes throughout your session.'
  }
];
