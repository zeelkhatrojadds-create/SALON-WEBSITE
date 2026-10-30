// GLAM GIRL BY JANKI — What Is Mehndi Made Of? Dataset
// Comprehensive educational dataset covering botanical origin (Lawsonia inermis),
// core vs optional ingredients, 7-step natural preparation process, safety table,
// Natural vs Black Henna comparison, and interactive ingredient explorer.

export const HENNA_BOTANICAL_INFO = {
  plantName: 'Lawsonia inermis',
  commonName: 'Henna Plant (Mehndi Plant)',
  activeDyeMolecule: 'Lawsone (2-hydroxy-1,4-naphthoquinone)',
  overview:
    'Natural henna is made from the dried and finely ground leaves of the henna plant, Lawsonia inermis, a flowering shrub native to arid and subtropical regions of South Asia, North Africa, and the Middle East.',
  botanicalFact:
    'The lawsone dye molecule is naturally held within the plant leaves. When the dried leaves are ground into a fine powder and hydrated, the lawsone molecules are released, binding gently with the keratin proteins present in human skin and hair.'
};

// =============================================================================
// 1. WHAT IS MEHNDI MADE FROM? (6 INDIVIDUAL VISUAL CARDS)
// =============================================================================
export const MEHNDI_CORE_INGREDIENTS = [
  {
    id: 'henna-powder',
    name: 'Natural Henna Powder',
    scientificName: 'Lawsonia inermis (dried & ground leaves)',
    status: 'Core Botanical Ingredient',
    statusType: 'foundational',
    isOptional: false,
    badge: 'Traditional Foundational',
    image: '/images/mehndi/mehndi-studio-card.webp',
    iconName: 'Leaf',
    summary: 'Finely ground henna leaves that provide the natural dye.',
    description:
      'The foundational component of all authentic mehndi. Sun-dried henna foliage is crushed and triple-sifted through micro-mesh to create a velvet powder. Contains the organic lawsone dye molecule that naturally oxidizes on skin.',
    safetyNote:
      'Pure henna leaf powder is plant-derived. However, like any botanical, mild plant sensitivities can occasionally occur. Always verify that no synthetic dyes or chemical additives have been blended in.',
    role: 'Primary source of natural lawsone dye pigment and paste body.'
  },
  {
    id: 'water',
    name: 'Water',
    scientificName: 'H₂O (Purified or Distilled Water)',
    status: 'Traditional Mixing Liquid',
    statusType: 'essential-liquid',
    isOptional: false,
    badge: 'Essential Liquid',
    image: '/images/mehndi/finger-rings-lace.webp',
    iconName: 'Droplets',
    summary: 'Used to mix the powder into a workable paste.',
    description:
      'The primary hydration medium that activates the dried henna powder. Clean, warm water breaks down the leaf cellulose, hydrating the dry grains into a smooth, malleable, toothpaste-like consistency suitable for applicator cones.',
    safetyNote:
      'Neutral, gentle, and non-irritating for skin. Clean, filtered, or distilled water is recommended to avoid tap mineral deposits that could affect paste texture or consistency.',
    role: 'Hydrates powder and facilitates dye release and smooth extrusion.'
  },
  {
    id: 'lemon-juice',
    name: 'Lemon Juice or Acidic Liquid',
    scientificName: 'Citrus limon juice / Citric acid liquid',
    status: 'Optional Traditional Additive',
    statusType: 'optional',
    isOptional: true,
    badge: 'Optional Acidic Liquid',
    image: '/images/mehndi/minimalist-fine-line.webp',
    iconName: 'Sparkles',
    summary: 'Sometimes used in traditional recipes; it is not necessary for every formulation and may irritate sensitive skin.',
    description:
      'A mild acid that some traditional artists incorporate during paste preparation to slow down and stabilize dye release. Some artists also use a lemon-sugar glaze dabbed lightly over dry paste as a topical sealant.',
    safetyNote:
      'Optional. Citrus juices contain citric acid and natural psoralens which can cause dryness, tingling, or contact dermatitis on sensitive or sun-exposed skin. Never necessary for successful paste development.',
    role: 'Optional acid medium used in select historical recipes for dye timing.'
  },
  {
    id: 'sugar',
    name: 'Sugar',
    scientificName: 'Sucrose / Dextrose',
    status: 'Optional Texture Aid',
    statusType: 'optional',
    isOptional: true,
    badge: 'Optional Texture Aid',
    image: '/images/mehndi/mandala-palm-art.webp',
    iconName: 'Layers',
    summary: 'Sometimes added to change the paste\'s consistency and help it adhere to the skin.',
    description:
      'A small measure of granulated or powdered cane sugar may be stirred into the paste. As a natural humectant, sugar helps retain moisture in dry climates, preventing the paste from drying out too quickly and cracking off prematurely.',
    safetyNote:
      'Optional. Generally well-tolerated on skin. In high-humidity environments, adding excess sugar can make the paste sticky, stringy, or prone to smearing.',
    role: 'Modifies paste elasticity, tensile flexibility, and skin adhesion.'
  },
  {
    id: 'essential-oils',
    name: 'Essential Oils',
    scientificName: 'Terpene-containing botanical oils (Eucalyptus, Cajeput, Lavender)',
    status: 'Optional / Extra Caution',
    statusType: 'caution-optional',
    isOptional: true,
    badge: 'Optional / Requires Caution',
    image: '/images/mehndi/arabic-floral-bel.webp',
    iconName: 'AlertTriangle',
    summary: 'Some recipes use selected essential oils, but these can cause irritation or allergies. Never imply that every essential oil is safe for skin.',
    description:
      'Certain botanical oils containing natural monoterpenes (such as high-cineole eucalyptus, cajeput, or high-linalool lavender) are sometimes mixed into henna paste to assist dye penetration and add aroma.',
    safetyNote:
      'Crucial safety consideration: Essential oils are highly concentrated chemical compounds that can cause allergic contact dermatitis, chemical irritation, or sensitization. They are never universally safe for all skin types, and their use is optional.',
    role: 'Optional aromatic and terpene solvent component in select artisan formulations.'
  },
  {
    id: 'ready-made-paste',
    name: 'Ready-Made Henna Paste',
    scientificName: 'Commercial Pre-Mixed Formulations',
    status: 'Commercial Product Consideration',
    statusType: 'commercial',
    isOptional: true,
    badge: 'Check Manufacturer Label',
    image: '/images/mehndi/indian-traditional-jaal.webp',
    iconName: 'HelpCircle',
    summary: 'Commercial products may contain additional ingredients. Always check the manufacturer\'s complete ingredient list.',
    description:
      'Factory-prepared henna cones sold in stores or online often incorporate additional binders, shelf-life preservatives, solvents, or dye enhancers to survive ambient transit without freezing.',
    safetyNote:
      'Always examine the manufacturer\'s ingredient statement. Reject any commercial cone that lacks full ingredient transparency or that makes unverified claims of "instant black" colour within minutes.',
    role: 'Pre-packaged alternative requiring mandatory ingredient due diligence.'
  }
];

// =============================================================================
// 2. HOW IS NATURAL MEHNDI MADE? (7-STEP VISUAL PROCESS)
// =============================================================================
export const NATURAL_HENNA_PREPARATION_STEPS = [
  {
    step: 1,
    number: '01',
    title: 'Harvesting Henna Leaves',
    shortTitle: 'Harvesting',
    subtitle: 'Selective Foliage Collection',
    description: 'Henna leaves are collected from the henna plant.',
    details:
      'Healthy mature leaves of the Lawsonia inermis shrub are gently harvested during dry seasons, when the concentration of natural lawsone pigment within the leaf cells is at its botanical peak.',
    iconName: 'Leaf',
    timeframe: 'Agricultural Phase'
  },
  {
    step: 2,
    number: '02',
    title: 'Drying the Leaves',
    shortTitle: 'Drying',
    subtitle: 'Controlled Ambient Curing',
    description: 'The leaves are dried under appropriate conditions.',
    details:
      'Freshly harvested leaves are cured in well-ventilated, shaded drying facilities away from direct ultraviolet scorching to preserve the delicate lawsone dye molecules and natural leaf integrity.',
    iconName: 'Compass',
    timeframe: '2–4 Days Curing'
  },
  {
    step: 3,
    number: '03',
    title: 'Grinding into Powder',
    shortTitle: 'Grinding',
    subtitle: 'Triple Micro-Mesh Sifting',
    description: 'The dried leaves are finely ground into henna powder.',
    details:
      'Crisp dried leaves are pulverized in mechanical stone or roller mills and passed through ultra-fine silk or synthetic micro-sieves, yielding a silky, clump-free olive-green powder.',
    iconName: 'Layers',
    timeframe: 'Milling & Sifting'
  },
  {
    step: 4,
    number: '04',
    title: 'Preparing the Paste',
    shortTitle: 'Mixing',
    subtitle: 'Controlled Hydration & Resting',
    description: 'The powder is mixed with a suitable liquid according to the recipe or manufacturer\'s instructions.',
    details:
      'Clean water (and optional mild additives if specified by the recipe) is stirred into the powder until a velvety consistency is achieved. The mixture is allowed to rest so the lawsone dye releases naturally.',
    iconName: 'Droplets',
    timeframe: '4–12 Hours Dye Release'
  },
  {
    step: 5,
    number: '05',
    title: 'Filling the Henna Cone',
    shortTitle: 'Cone Filling',
    subtitle: 'Precision Applicator Packaging',
    description: 'The prepared paste is placed into a clean applicator cone.',
    details:
      'The smooth, strain-free paste is transferred into a piping bag or rolled cellophane cone. The cone tip is trimmed to a microscopic opening to ensure fluid, effortless pressure control.',
    iconName: 'Sparkles',
    timeframe: 'Immediate Hand Prep'
  },
  {
    step: 6,
    number: '06',
    title: 'Applying the Design',
    shortTitle: 'Application',
    subtitle: 'Hand-Drawn Surface Artistry',
    description: 'The artist applies the paste to clean, dry, intact skin using the cone.',
    details:
      'The artist carefully applies fine lines, botanical paisleys, and mandalas onto unbroken, clean skin. The paste rests atop the epidermal stratum corneum, transferring lawsone dye into keratin cells.',
    iconName: 'Flower2',
    timeframe: 'Session Duration'
  },
  {
    step: 7,
    number: '07',
    title: 'Natural Stain Development',
    shortTitle: 'Stain Bloom',
    subtitle: 'Atmospheric Keratin Oxidation',
    description: 'The stain generally starts orange and gradually deepens over the following 24–48 hours.',
    details:
      'When paste is gently scraped off, the fresh mark is a pale pumpkin orange. Over the next 24 to 48 hours, exposure to ambient air and natural body warmth oxidizes the lawsone dye into rich reddish-brown or deep mahogany.',
    iconName: 'Clock',
    timeframe: '24–48 Hours Oxidation'
  }
];

// =============================================================================
// 3. COMMON INGREDIENTS TO UNDERSTAND (COMPREHENSIVE TABLE & EXPLORER DATA)
// =============================================================================
export const COMMON_HENNA_INGREDIENTS = [
  {
    id: 'henna-powder',
    name: 'Henna Powder',
    category: 'Natural plant ingredient',
    categoryKey: 'plant',
    whyUsed: 'Provides the active botanical dye molecule (lawsone) that naturally colors skin and hair.',
    safetyInformation:
      'Generally considered gentle for external skin use when derived purely from Lawsonia inermis. As with any botanical, rare contact allergies can occur. Check that powder contains no undisclosed mineral salts or synthetic dyes.',
    riskLevel: 'Low Botanical Risk',
    isSafeForSkin: true,
    isOptional: false,
    recommendedByAtelier: true
  },
  {
    id: 'water',
    name: 'Water',
    category: 'Mixing ingredient',
    categoryKey: 'mixing',
    whyUsed: 'Hydrates dried leaf powder into a workable, smooth paste consistency suitable for cone extrusion.',
    safetyInformation:
      'Neutral and safe for all skin types. Use purified, distilled, or boiled cooled water to prevent microbial contamination and mineral deposits during paste resting.',
    riskLevel: 'Neutral & Gentle',
    isSafeForSkin: true,
    isOptional: false,
    recommendedByAtelier: true
  },
  {
    id: 'lemon-juice',
    name: 'Lemon Juice',
    category: 'Optional ingredient',
    categoryKey: 'optional',
    whyUsed: 'Provides mild acidity that can slow and stabilize dye release in some traditional home recipes.',
    safetyInformation:
      'Optional ingredient. Citric acid and citrus oils can cause skin dryness, tingling, irritation, or phytophotodermatitis on sensitive skin exposed to sunlight. Not essential for paste formulation.',
    riskLevel: 'Mild Irritant Potential',
    isSafeForSkin: true,
    isOptional: true,
    recommendedByAtelier: false
  },
  {
    id: 'sugar',
    name: 'Sugar (Sucrose)',
    category: 'Optional ingredient',
    categoryKey: 'optional',
    whyUsed: 'Acts as a humectant to modify paste flexibility and prevent premature cracking on skin in dry climates.',
    safetyInformation:
      'Safe and well-tolerated on skin. Excess amounts can attract moisture in humid environments, leading to sticky lines that smudge easily. Optional texture aid.',
    riskLevel: 'Minimal Risk',
    isSafeForSkin: true,
    isOptional: true,
    recommendedByAtelier: true
  },
  {
    id: 'essential-oils',
    name: 'Essential Oils (e.g. Eucalyptus, Cajeput, Lavender)',
    category: 'Ingredient requiring extra caution',
    categoryKey: 'caution',
    whyUsed: 'Contains natural terpenes that some artists use to assist lawsone dye penetration and impart aroma.',
    safetyInformation:
      'Requires vigilance. Essential oils are concentrated chemical compounds that frequently cause allergic contact dermatitis or chemical burns if used improperly or in high ratios. Never assume every essential oil is safe for skin.',
    riskLevel: 'Caution Required (Allergen Potential)',
    isSafeForSkin: false, // requires strict dilution & caution
    isOptional: true,
    recommendedByAtelier: false
  },
  {
    id: 'preservatives',
    name: 'Preservatives',
    category: 'Ingredient requiring extra caution',
    categoryKey: 'caution',
    whyUsed: 'Added to commercial ready-made cones to prevent mold and bacterial growth during ambient shelf storage.',
    safetyInformation:
      'Some commercial formulations contain parabens, phenoxyethanol, or unlisted antimicrobials that can trigger skin sensitivities. Fresh homemade paste refrigerated or frozen needs no artificial preservatives.',
    riskLevel: 'Check Formulation Label',
    isSafeForSkin: false,
    isOptional: true,
    recommendedByAtelier: false
  },
  {
    id: 'fragrance-ingredients',
    name: 'Fragrance Ingredients (Artificial Perfumes)',
    category: 'Ingredient requiring extra caution',
    categoryKey: 'caution',
    whyUsed: 'Used in mass-produced commercial cones to mask chemical or sour paste aromas.',
    safetyInformation:
      'Artificial fragrances are among the leading triggers of allergic skin reactions and hives. Avoid commercial products listing vague "fragrance" or "parfum" with undisclosed constituent ingredients.',
    riskLevel: 'Common Allergic Sensitizer',
    isSafeForSkin: false,
    isOptional: true,
    recommendedByAtelier: false
  },
  {
    id: 'ppd',
    name: 'PPD (para-phenylenediamine)',
    category: 'Ingredient requiring extra caution',
    categoryKey: 'caution',
    whyUsed: 'Used in commercial hair dyes to produce rapid, pitch-black coloring. Illegally added to products marketed as "black henna".',
    safetyInformation:
      'DANGEROUS: PPD is a potent chemical sensitizer that causes severe chemical burns, open blistering, permanent keloid scarring, and lifelong medical allergies. NEVER add PPD to henna, and NEVER apply black henna to skin.',
    riskLevel: 'Hazardous / Do Not Use on Skin',
    isSafeForSkin: false,
    isOptional: false,
    recommendedByAtelier: false,
    isHazard: true
  }
];

// =============================================================================
// 4. NATURAL HENNA VS. BLACK HENNA (SIDE-BY-SIDE COMPARISON)
// =============================================================================
export const HENNA_COMPARISON = {
  natural: {
    title: 'Natural Henna',
    subtitle: 'Pure Botanical Lawsonia inermis',
    badge: 'Authentic Botanical',
    origin: 'Made from pure dried and ground henna leaves (Lawsonia inermis).',
    stainAppearance:
      'Typically leaves an orange-to-brown stain that darkens into rich mahogany or reddish-brown over 24–48 hours.',
    stainTiming: 'Dye requires several hours on skin to transfer; stain gradually oxidizes with air and body heat.',
    safetyProfile:
      'Plant-derived and traditional, but may still cause reactions in some people. Product ingredients and quality should always be checked.',
    verdict: 'The traditional and respected form of body artistry when pure ingredients are verified.'
  },
  black: {
    title: 'Black Henna',
    subtitle: 'Chemical / Synthetic Colourant Danger',
    badge: 'High Allergic Risk',
    origin: 'Not natural henna. Usually synthetic black hair dye paste containing PPD or other undisclosed colourants.',
    stainAppearance:
      'Stains jet black immediately within 15–30 minutes, without any natural oxidation or orange transition.',
    stainTiming: 'Immediate unnatural jet black stain created by chemical oxidation.',
    safetyProfile:
      'Can cause serious skin reactions, chemical burns, swelling, blistering, and permanent scarring. Do not use products containing PPD for skin decoration.',
    verdict: 'Do not use. Avoid all products with unknown, undisclosed, or "instant black" chemical ingredients.'
  },
  colourDisclaimer:
    'Important Note: Colour alone does not prove whether a product is safe or natural. Always check complete ingredient statements rather than relying solely on product appearance or marketing labels.'
};

// =============================================================================
// 5. SAFE PREPARATION TIPS (CHECKLIST)
// =============================================================================
export const SAFE_PREPARATION_TIPS = [
  {
    id: 'tip-1',
    title: 'Reputable Supplier Labeling',
    text: 'Use a clearly labelled henna product from a reputable supplier with verifiable origins.',
    icon: 'ShieldCheck'
  },
  {
    id: 'tip-2',
    title: 'Ingredient Scrutiny',
    text: 'Check the full ingredient list before opening or applying any product.',
    icon: 'HelpCircle'
  },
  {
    id: 'tip-3',
    title: 'Hygiene & Clean Utensils',
    text: 'Use clean utensils, bowls, and applicators to prevent bacterial contamination during paste preparation.',
    icon: 'Sparkles'
  },
  {
    id: 'tip-4',
    title: 'Zero Unknown Additives',
    text: 'Do not mix unknown chemicals, hair dyes, petroleum distillates, or industrial solvents into henna paste.',
    icon: 'AlertTriangle'
  },
  {
    id: 'tip-5',
    title: 'Intact Skin Application Only',
    text: 'Avoid applying henna to irritated, broken, freshly shaved, sunburnt, or infected skin.',
    icon: 'ShieldAlert'
  },
  {
    id: 'tip-6',
    title: 'Follow Specific Instructions',
    text: 'Follow product-specific manufacturer instructions for mixing, resting times, and shelf-life storage.',
    icon: 'Compass'
  },
  {
    id: 'tip-7',
    title: 'Patch Testing Awareness',
    text: 'Remember that patch testing cannot guarantee that an adverse allergic reaction will not occur, though it is a prudent precautionary step.',
    icon: 'Info'
  }
];
