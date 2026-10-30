/**
 * Skin Care Guidance & Safety Data
 * GLAM GIRL BY JANKI — Educational & Safety Knowledge System
 * 
 * Strict Brand Aesthetics: Deep Black (#10110F), Forest Green (#263D2B),
 * Olive Green (#465640), Sage (#A8B5A0), Warm Cream (#F7F4ED).
 * Educational, ethical, non-diagnostic guidelines.
 */

export const SKIN_TYPES = [
  {
    id: 'normal',
    name: 'Normal Skin',
    tagline: 'Well-balanced hydration & barrier integrity',
    badge: 'Balanced',
    summary: 'General cleansing, moisturizing, and sun protection.',
    description:
      'Normal skin generally produces a balanced amount of sebum and maintains comfortable moisture levels without excessive oiliness or flaking. It has a relatively resilient protective moisture barrier.',
    coreNeeds: [
      'Gentle daily cleansing that does not strip natural lipids',
      'Daily lightweight or medium-weight moisturizer to lock in hydration',
      'Broad-spectrum sunscreen (SPF 30+) daily on all exposed skin',
      'Consistent, gentle maintenance rather than frequent routine changes'
    ],
    treatmentPrepTip: 'Maintain standard hydration prior to appointments; avoid trying novel active products within 48 hours of a facial.',
    iconName: 'Sparkles'
  },
  {
    id: 'dry',
    name: 'Dry Skin',
    tagline: 'Depleted moisture barrier needing gentle lipid support',
    badge: 'Needs Hydration',
    summary: 'Gentle cleansing and fragrance-free moisturizing products.',
    description:
      'Dry skin produces less natural oil than normal skin, which can lead to feelings of tightness, surface flaking, or a compromised moisture barrier. It benefits most from emollient-rich and non-stripping formulas.',
    coreNeeds: [
      'Ultra-gentle, non-foaming or cream cleansers',
      'Fragrance-free moisturizing creams containing barrier-supporting lipids (ceramides, glycerin)',
      'Avoiding harsh physical scrubs and high-temperature water',
      'Daily broad-spectrum sunscreen with hydrating humectants'
    ],
    treatmentPrepTip: 'Ensure skin is well-hydrated leading up to waxing or threading; avoid waxing over dry, flaky patches or cracked areas.',
    iconName: 'Droplets'
  },
  {
    id: 'oily',
    name: 'Oily Skin',
    tagline: 'Active sebum production benefiting from non-comedogenic care',
    badge: 'Balance Sebum',
    summary: 'Gentle cleansing and lightweight, non-comedogenic moisturizers.',
    description:
      'Oily skin produces excess sebum, often presenting with noticeable shine and enlarged pores. The goal is to balance surface oil without over-cleansing, which can trigger compensatory oil rebound.',
    coreNeeds: [
      'Gentle gel or foaming cleanser that removes excess sebum without over-drying',
      'Lightweight, non-comedogenic (pore-friendly) gel or water-based moisturizers',
      'Non-greasy, matte or fluid broad-spectrum sunscreen (SPF 30+)',
      'Avoiding aggressive alcohol-based astringents that strip the stratum corneum'
    ],
    treatmentPrepTip: 'Cleanse thoroughly prior to makeup or threading sessions, and inform your artist of any topical acne treatments in use.',
    iconName: 'Sun'
  },
  {
    id: 'combination',
    name: 'Combination Skin',
    tagline: 'Variable sebum production across different facial zones',
    badge: 'Multi-Zone',
    summary: 'Adjust moisturizing according to different areas of the face.',
    description:
      'Combination skin typically presents with an oily T-zone (forehead, nose, and chin) alongside normal or dry cheeks. Care should be adapted selectively to cater to the varied needs of each facial zone.',
    coreNeeds: [
      'Mild, pH-balanced cleanser that cleanses the T-zone without parching cheeks',
      'Zone-specific moisturizing: lighter lotion on the T-zone, richer cream on dry cheek zones',
      'Universal broad-spectrum SPF 30+ daily wear',
      'Targeted, gentle exfoliants used conservatively on oilier zones only'
    ],
    treatmentPrepTip: 'Point out your drier and oilier zones during facial consultations so your aesthetician can calibrate treatment steps.',
    iconName: 'Layers'
  },
  {
    id: 'sensitive',
    name: 'Sensitive Skin',
    tagline: 'Delicate, highly reactive barrier requiring extra care',
    badge: 'Low Irritant',
    summary: 'Choose gentle, fragrance-free products and introduce new products carefully.',
    description:
      'Sensitive skin responds quickly to environmental factors, harsh chemicals, heat, or synthetic fragrances with redness, stinging, itching, or irritation. It requires minimalist formulations and mindful product introduction.',
    coreNeeds: [
      'Minimal-ingredient, fragrance-free, soap-free gentle cleansers',
      'Simple, barrier-reinforcing soothing moisturizers',
      'Mineral-based (zinc oxide/titanium dioxide) broad-spectrum sunscreens',
      'Patch testing new products and introducing one product at a time over several weeks'
    ],
    treatmentPrepTip: 'Always request a patch test before new waxes, facials, or mehndi, and inform your artist of any known sensitivities beforehand.',
    iconName: 'ShieldAlert'
  }
];

export const DAILY_ROUTINE = {
  morning: {
    title: 'Morning Skincare Ritual',
    subtitle: 'Protect, Hydrate & Shield Against Daytime Stressors',
    steps: [
      {
        step: 1,
        title: 'Gentle Cleanser',
        desc: 'Wash with lukewarm water and a mild, non-stripping cleanser suited to your skin type to remove overnight natural oils without disturbing the lipid barrier.',
        tip: 'Avoid hot water, which can deplete vital surface lipids and induce redness.'
      },
      {
        step: 2,
        title: 'Hydrating Moisturizer',
        desc: 'Apply a moisturizer formulated for your skin’s needs (lightweight for oily/combination, richer for dry/sensitive) to seal in moisture and preserve elasticity.',
        tip: 'Apply to slightly damp skin for optimal moisture retention.'
      },
      {
        step: 3,
        title: 'Broad-Spectrum Sunscreen (SPF 30+)',
        desc: 'Apply a generous layer of broad-spectrum sunscreen with SPF 30 or higher to all exposed skin on the face, neck, and ears. Reapply throughout the day as directed on the product label.',
        tip: 'Essential everyday protection — even on overcast Ottawa days or when working near windows.'
      }
    ]
  },
  evening: {
    title: 'Evening Skincare Ritual',
    subtitle: 'Cleanse, Replenish & Support Overnight Natural Recovery',
    steps: [
      {
        step: 1,
        title: 'Gently Remove Makeup & Sunscreen',
        desc: 'Dissolve cosmetic pigments, water-resistant sunscreen, and daytime pollutants using a gentle makeup remover, micellar water, or oil-based balm without harsh rubbing.',
        tip: 'Use soft cotton pads with gentle pressing motions rather than aggressive pulling.'
      },
      {
        step: 2,
        title: 'Cleanse Without Scrubbing',
        desc: 'Follow with your gentle daily cleanser using soft circular fingertip motions to purify the skin thoroughly while preserving the delicate stratum corneum.',
        tip: 'Skip abrasive facial brushes or gritty scrubs that cause micro-tears.'
      },
      {
        step: 3,
        title: 'Apply Nourishing Moisturizer',
        desc: 'Smooth a replenishing moisturizer over the face and neck to hydrate, soothe, and support the natural nocturnal skin recovery process.',
        tip: 'Allow 2 to 3 minutes for absorption before resting on your pillow.'
      },
      {
        step: 4,
        title: 'Targeted Treatments (When Appropriate Only)',
        desc: 'Use additional skincare products (such as gentle serums or targeted treatments) only when appropriate for your specific skin needs, tolerance, and following clear product instructions.',
        tip: 'Avoid introducing multiple active ingredients at the same time.'
      }
    ]
  },
  beginnerRule: {
    headline: 'Golden Rule for Skincare Beginners',
    text: 'Avoid recommending or layering multiple strong active ingredients (such as high-strength exfoliating acids, retinoids, and vitamin C) simultaneously. A consistent, minimalist foundation of cleanser, moisturizer, and sunscreen delivers significantly better barrier protection than an overly aggressive multi-step regimen.'
  }
};

export const PRE_TREATMENT_CHECKLIST = [
  {
    id: 'allergies',
    title: 'Disclose Known Allergies & Reactions',
    description: 'Inform your beauty professional of any known allergies, contact dermatitis history, or past adverse reactions to wax, dyes, topical products, or botanical extracts.',
    category: 'Communication'
  },
  {
    id: 'actives',
    title: 'Disclose Current Skincare Products & Procedures',
    description: 'Share details of all topical actives in current use (retinoids, AHA/BHA exfoliants, prescription ointments) and any recent clinical procedures (chemical peels, laser treatments, microneedling).',
    category: 'History'
  },
  {
    id: 'prep',
    title: 'Follow Treatment-Specific Preparation',
    description: 'Comply with the exact preparatory guidelines provided for your specific service (e.g., hair length guidelines for waxing, clean skin for facials, dry skin for mehndi).',
    category: 'Preparation'
  },
  {
    id: 'integrity',
    title: 'Avoid Broken, Irritated, or Infected Skin',
    description: 'Never apply beauty treatments to skin that is actively sunburned, cracked, open, inflamed, infected, or experiencing an active eczema or psoriasis flare-up in the treatment area.',
    category: 'Safety'
  },
  {
    id: 'suitability',
    title: 'Consult on Retinoids & Exfoliating Acids',
    description: 'Ask your aesthetician or stylist about procedural suitability if you are actively using prescription retinoids or potent exfoliants, as these temporarily thin the outer barrier and increase sensitivity to waxing and chemical facials.',
    category: 'Contraindications'
  },
  {
    id: 'prescriptions',
    title: 'Consult Your Prescribing Clinician',
    description: 'Never discontinue, pause, or alter any prescribed dermatological or medical treatments without explicit guidance from your licensed healthcare provider.',
    category: 'Medical Disclaimer'
  }
];

export const AFTERCARE_GUIDES = [
  {
    id: 'facial',
    treatment: 'After Facial Treatments',
    subtitle: 'Nurture freshly treated, receptive skin',
    icon: 'Sparkles',
    guidance: [
      'Use only gentle, non-stripping, hydrating skincare for the first 48 to 72 hours.',
      'Avoid facial scrubbing, mechanical cleansing brushes, or introducing new or potentially irritating active products while the skin remains sensitive.',
      'Follow treatment-specific aftercare instructions provided by your aesthetician, including diligent daily sunscreen application on vulnerable newly exfoliated skin.',
      'Refrain from steam rooms, saunas, and intense sweaty workouts for 24 hours to prevent pore irritation.'
    ]
  },
  {
    id: 'waxing',
    treatment: 'After Waxing',
    subtitle: 'Soothe exposed follicles & prevent friction',
    icon: 'ShieldCheck',
    guidance: [
      'Avoid excessive heat (hot baths, hot showers, saunas) and mechanical friction for at least 24 to 48 hours while the skin is sensitive.',
      'Follow professional post-wax soothing guidance; use light, calming lotions if recommended by your esthetician.',
      'Do not wax skin that is broken, sunburned, or actively inflamed.',
      'Wear loose-fitting, breathable cotton clothing over waxed areas to prevent pore clogging and chafing.'
    ]
  },
  {
    id: 'threading',
    treatment: 'After Threading',
    subtitle: 'Calm temporary redness & protect pores',
    icon: 'Feather',
    guidance: [
      'Avoid unnecessary touching, picking, or rubbing of freshly threaded areas to prevent bacteria transfer into open follicles.',
      'Avoid harsh, fragranced products, alcohol-based toners, and heavy makeup over threaded zones for 12 to 24 hours.',
      'Use gentle care (such as a clean cool compress or pure soothing aloe) if temporary redness or mild localized warmth occurs.',
      'Avoid direct intense sun exposure immediately following brow or facial threading.'
    ]
  },
  {
    id: 'mehndi',
    treatment: 'After Mehndi Application',
    subtitle: 'Natural stain development & skin safety',
    icon: 'Palette',
    guidance: [
      'Use only natural henna products with clearly disclosed, 100% plant-based ingredient lists.',
      'Allow the natural henna paste to dry naturally and remain on the skin according to product instructions (typically 4 to 8 hours for rich stain maturity).',
      'Never use synthetic "black henna" containing toxic para-phenylenediamine (PPD), which causes chemical burns and severe permanent sensitization.',
      'Follow appropriate paste-removal and aftercare instructions: gently scrape off dry paste with oil; avoid water exposure for the initial 12 to 24 hours.'
    ]
  },
  {
    id: 'makeup',
    treatment: 'After Makeup',
    subtitle: 'Clean removal & hygiene best practices',
    icon: 'Eye',
    guidance: [
      'Always remove makeup gently and thoroughly before sleeping to prevent clogged pores and localized irritation.',
      'Clean reusable brushes, sponges, and cosmetic applicators regularly with warm water and gentle soap to prevent microbial accumulation.',
      'Never share eye makeup (mascara, eyeliner) or contaminated applicators with others to avoid ocular infections and cross-contamination.',
      'Discard expired cosmetic formulations or any product that exhibits changes in scent, separation, or texture.'
    ]
  }
];

export const INGREDIENT_GUIDE = [
  {
    ingredient: 'Fragrance (Parfum / Synthetic Scents)',
    category: 'Sensitizer',
    guidance: 'May irritate some sensitive or reactive skin types. Opt for fragrance-free formulations when dealing with reactive barriers or post-treatment sensitivity.',
    level: 'Caution for Sensitive Skin'
  },
  {
    ingredient: 'Exfoliating Acids (AHA / BHA / PHA)',
    category: 'Chemical Exfoliant',
    guidance: 'Use according to exact product instructions. Overuse or combining multiple acid formulations may compromise the skin barrier and cause persistent redness, peeling, or stinging.',
    level: 'Use with Moderation'
  },
  {
    ingredient: 'Retinoids (Retinol / Tretinoin / Retinal)',
    category: 'Cell Turnover Active',
    guidance: 'May cause initial dryness, flaking, and irritation, and significantly increases sensitivity to procedural waxing, threading, and chemical peels. Always disclose use to your aesthetician.',
    level: 'Procedural Precaution'
  },
  {
    ingredient: 'Essential Oils (Citrus, Lavender, Tea Tree, etc.)',
    category: 'Botanical Extract',
    guidance: 'Natural does not automatically mean non-irritating. Selected essential oils can cause contact dermatitis, phototoxicity, or allergic reactions in vulnerable individuals.',
    level: 'Variable Sensitivity'
  },
  {
    ingredient: 'Sunscreen (Zinc Oxide, Titanium Dioxide, Chemical Filters)',
    category: 'Photoprotection',
    guidance: 'Choose broad-spectrum SPF 30 or higher. Protects newly treated skin against UV damage, hyperpigmentation, and premature barrier degradation. Daily essential.',
    level: 'Daily Essential'
  },
  {
    ingredient: 'Henna Products (Lawsonia inermis vs. Black Henna)',
    category: 'Botanical Colorant',
    guidance: 'Check the complete ingredient list. Authentic natural henna is greenish-brown powder from Lawsonia inermis. Avoid any black paste marketed as henna containing PPD or synthetic dyes.',
    level: 'Strict Ingredient Check'
  }
];

export const PATCH_TEST_GUIDELINES = {
  title: 'Know Before You Apply',
  subtitle: 'Allergy Awareness & Responsible Product Testing',
  principles: [
    {
      title: 'Follow Specific Manufacturer Instructions',
      text: 'Always follow the manufacturer’s patch-test instructions for the specific product, formulation, and intended application area.'
    },
    {
      title: 'A Patch Test Is Not a Guarantee',
      text: 'A localized patch test is a helpful preliminary precaution but cannot guarantee that a broader reaction will not develop under different circumstances or prolonged use.'
    },
    {
      title: 'Never Test Unknown Formulations',
      text: 'Never apply an unlabeled or unknown substance to your skin simply to test whether it is safe. True safety starts with known, verified ingredients.'
    },
    {
      title: 'Discontinue Immediately if Irritation Occurs',
      text: 'Stop using the product immediately if burning, stinging, itching, erythema (redness), swelling, or a rash develops at any point.'
    },
    {
      title: 'Seek Professional Medical Advice',
      text: 'Consult a licensed physician or dermatologist if skin reactions persist, worsen, or fail to resolve within a reasonable timeframe.'
    }
  ],
  emergencyWarning: {
    title: 'CRITICAL EMERGENCY WARNING',
    text: 'Difficulty breathing, swelling of the lips, tongue, or throat, dizziness, or hives spreading across the body are symptoms of severe anaphylaxis. This requires immediate emergency medical care (call 911 in Canada / local emergency services).'
  },
  disclaimer: 'The salon’s safety guidelines and patch-testing information are provided solely as educational awareness and should never be construed as a clinical allergy test, medical diagnosis, or treatment.'
};

export const SAFETY_CHECKER_QUESTIONS = [
  {
    id: 'ingredients',
    label: 'Have I checked the product ingredients?',
    detail: 'I have reviewed the product formulation and confirmed it contains disclosed ingredients free from my known allergens.'
  },
  {
    id: 'allergies',
    label: 'Have I informed my beauty professional about known allergies?',
    detail: 'I have clearly communicated past reactions, sensitive skin history, and product sensitivities to my service provider.'
  },
  {
    id: 'skin_integrity',
    label: 'Is my skin free from active irritation or open wounds in the treatment area?',
    detail: 'The target area is healthy and free from active sunburn, rashes, cuts, active eczema, or infections.'
  },
  {
    id: 'prep_instructions',
    label: 'Have I reviewed the preparation instructions?',
    detail: 'I understand and have followed the pre-care guidelines specific to my scheduled treatment (e.g., pausing harsh actives).'
  },
  {
    id: 'aftercare_understood',
    label: 'Do I understand the recommended aftercare?',
    detail: 'I know how to care for my skin post-service, including sun protection, gentle cleansing, and what activities to pause.'
  }
];

export const SKIN_CARE_FAQS = [
  {
    id: 'faq-1',
    question: 'How do I identify my skin type?',
    answer: 'A practical educational method is the "bare-faced test." Cleanse your face with a mild, gentle cleanser, gently pat dry, and leave skin completely bare without any moisturizers or serums for 30 minutes. If skin feels tight and looks dull, it is likely dry. If prominent shine appears all over, it is likely oily. If shine appears primarily on the forehead, nose, and chin while cheeks remain normal or tight, you likely have combination skin. If it reacts with redness or stinging, it has sensitive tendencies. Note that this is educational guidance, not a medical dermatological evaluation.'
  },
  {
    id: 'faq-2',
    question: 'Why is sunscreen important?',
    answer: 'Broad-spectrum sunscreen shields skin from both UVA rays (which cause deep cellular damage and premature aging) and UVB rays (which cause painful surface sunburns). Following beauty treatments such as facials, waxing, or threading, newly exposed skin is significantly more vulnerable to UV-induced hyperpigmentation and barrier compromise. Daily SPF 30+ is essential to protect skin health.'
  },
  {
    id: 'faq-3',
    question: 'Can natural ingredients cause irritation?',
    answer: 'Yes. "Natural" does not mean hypoallergenic or risk-free. Common botanical extracts, concentrated essential oils (like tea tree or citrus extracts), and unrefined plant pastes can cause contact dermatitis, phototoxicity, or allergic reactions in sensitive individuals. It is always wise to review ingredient lists and patch-test before full application.'
  },
  {
    id: 'faq-4',
    question: 'Why should I check skincare product ingredients?',
    answer: 'Checking ingredient lists allows you to identify potential allergens, ensure you are not accidentally layering conflicting active ingredients (like combining prescription retinoids with strong chemical peels), and verify that products (such as henna) contain safe, disclosed botanical components rather than hazardous synthetic additives like PPD.'
  },
  {
    id: 'faq-5',
    question: 'What should I do if my skin reacts after a treatment?',
    answer: 'Immediately stop using any newly applied products. Gently rinse the area with cool water. Avoid scrubbing or applying harsh cosmetics. If mild redness or warmth occurs, a clean, cool compress can provide comfort. If itching, hives, blistering, or swelling develops, discontinue all products and consult a licensed healthcare professional. Any swelling of the tongue, lips, or difficulty breathing requires emergency medical care.'
  },
  {
    id: 'faq-6',
    question: 'Can I have a beauty treatment when my skin is irritated?',
    answer: 'No. Treatments like waxing, threading, chemical facials, and mehndi should never be performed on skin that is actively inflamed, sunburned, cracked, or infected. Applying procedural friction, heat, or cosmetic compounds over a compromised barrier can worsen irritation, delay healing, or lead to secondary skin complications. Allow your skin to fully recover first.'
  },
  {
    id: 'faq-7',
    question: 'Does a patch test guarantee that I will not have a reaction?',
    answer: 'No. While a preliminary patch test is a valuable precautionary step that helps identify acute contact sensitivities, it cannot guarantee that a reaction will not occur under different circumstances, upon repeated exposure, or over larger surface areas. Always monitor skin closely whenever applying products.'
  }
];
