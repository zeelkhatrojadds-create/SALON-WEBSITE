/**
 * Beauty Guide Before & After Transformations Dataset
 * GLAM GIRL BY JANKI — Authentic Looks, Clinical Transparencies & Technique Demonstrations
 * 
 * Strict Brand Aesthetics: Deep Black (#10110F), Forest Green (#263D2B),
 * Olive Green (#465640), Sage (#A8B5A0), Warm Cream (#F7F4ED).
 * No gold or cyan. Pure guidance — no medical claims, no guaranteed outcomes.
 */

export const TRANSFORMATION_CATEGORIES = [
  { id: 'all', label: 'All Looks' },
  { id: 'hair-styling', label: 'Hair Styling' },
  { id: 'hair-colour', label: 'Hair Colour' },
  { id: 'skin-care', label: 'Skin Care & Facials' },
  { id: 'makeup', label: 'Makeup' },
  { id: 'nail-art', label: 'Nail Art' },
  { id: 'mehndi', label: 'Mehndi Designs' },
  { id: 'eyebrow-threading', label: 'Eyebrow & Threading' },
  { id: 'bridal', label: 'Bridal Looks' }
];

export const BEFORE_AFTER_LOOKS = [
  // 1. HAIR COLOUR
  {
    id: 'trans-hc-1',
    category: 'hair-colour',
    categoryLabel: 'Hair Colour',
    title: 'Warm Demarcation to Luminous Ash Balayage',
    guidePath: '/beauty-guide/hair-colour',
    guideLabel: 'Hair Colour Guidance',
    badgeType: 'Studio Transformation',
    beforeImage: '/images/hair-care/57-kesariya-hair-colour.webp',
    afterImage: '/images/hair-care/58-noor-balayage.webp',
    beforeLabel: 'Before: Uneven warm brassy tones with visible outgrowth demarcation.',
    afterLabel: 'After: Multidimensional ash balayage with seamless feathered root melt.',
    description: 'Master hand-painted balayage blended with a cool-toned gloss toner to neutralize brassiness while preserving hair elasticity and shine.'
  },
  {
    id: 'trans-hc-2',
    category: 'hair-colour',
    categoryLabel: 'Hair Colour',
    title: 'Monotone Chestnut to Dimensional Caramel Ribbons',
    guidePath: '/beauty-guide/hair-colour',
    guideLabel: 'Hair Colour Guidance',
    badgeType: 'Studio Transformation',
    beforeImage: '/images/hair-care/61-full-colour.webp',
    afterImage: '/images/hair-care/59-highlights.webp',
    beforeLabel: 'Before: Flat, single-process dark base lacking movement.',
    afterLabel: 'After: Sunlit caramel ribbons framing cheekbones and perimeter layers.',
    description: 'Precision babylights combined with conditioning Olaplex bond repair, delivering high-contrast dimension with zero structural damage.'
  },

  // 2. HAIR STYLING
  {
    id: 'trans-hs-1',
    category: 'hair-styling',
    categoryLabel: 'Hair Styling',
    title: 'Natural Lengths to High-Gloss Salon Blowout',
    guidePath: '/beauty-guide/hair-styling',
    guideLabel: 'Hair Styling Guidance',
    badgeType: 'Technique Demonstration',
    beforeImage: '/images/hair-care/55-classic-trim.webp',
    afterImage: '/images/hair-care/52-blow-dry-styling.webp',
    beforeLabel: 'Before: Air-dried natural texture with humidity-induced flyaways.',
    afterLabel: 'After: Round-brush blowout with bouncy curtain layers and mirror shine.',
    description: 'Thermal shield prep followed by directional airflow round brushing for long-lasting root lift, fluid movement, and velvet touch.'
  },
  {
    id: 'trans-hs-2',
    category: 'hair-styling',
    categoryLabel: 'Hair Styling',
    title: 'Casual Waves to Sculpted Bridal Updo',
    guidePath: '/beauty-guide/hair-styling',
    guideLabel: 'Hair Styling Guidance',
    badgeType: 'Studio Transformation',
    beforeImage: '/images/hair-care/meera-layer-cut.webp',
    afterImage: '/images/hair-care/50-bridal-hair-styling.webp',
    beforeLabel: 'Before: Everyday layered straight cut.',
    afterLabel: 'After: Royal sculpted updo engineered for dupatta pinning and jewelry anchoring.',
    description: 'Structural micro-crimping and hidden anchor pins ensure 12+ hours of ceremonial durability without pulling delicate hairline edges.'
  },

  // 3. SKIN CARE & FACIALS
  {
    id: 'trans-sc-1',
    category: 'skin-care',
    categoryLabel: 'Skin Care & Facials',
    title: 'Congested Surface to Glass-Skin Radiance',
    guidePath: '/beauty-guide/skin-care',
    guideLabel: 'Skin Care Guidance',
    badgeType: 'Studio Transformation',
    beforeImage: '/images/facial/deep-cleansing-facial.webp',
    afterImage: '/images/facial/special-glam-girl-facial.webp',
    beforeLabel: 'Before: Uneven skin texture, dullness, and dehydration patches.',
    afterLabel: 'After: Deeply plumped, dewy complexion with refined pore clarity.',
    description: 'Ultrasonic micro-exfoliation paired with multi-depth hyaluronic acid infusion and soothing rose-infused botanical mask.'
  },
  {
    id: 'trans-sc-2',
    category: 'skin-care',
    categoryLabel: 'Skin Care & Facials',
    title: 'Fatigued Complexion to Golden Ayurvedic Glow',
    guidePath: '/beauty-guide/skin-care',
    guideLabel: 'Skin Care Guidance',
    badgeType: 'Technique Demonstration',
    beforeImage: '/images/facial/express-facial.webp',
    afterImage: '/images/facial/golden-glow.webp',
    beforeLabel: 'Before: Environmental fatigue and transient surface dryness.',
    afterLabel: 'After: Luminous warm clarity and enhanced skin barrier resilience.',
    description: 'Traditional saffron, turmeric, and herbal compress treatment stimulating facial lymph flow and delivering instant revitalized glow.'
  },

  // 4. MAKEUP
  {
    id: 'trans-mu-1',
    category: 'makeup',
    categoryLabel: 'Makeup',
    title: 'Fresh Canvas Prep to Luminous Event Glamour',
    guidePath: '/beauty-guide/makeup',
    guideLabel: 'Makeup Guidance',
    badgeType: 'Studio Transformation',
    beforeImage: '/images/facial/mini-facial-exfoliation.webp',
    afterImage: '/images/gallery/finishing-touch.webp',
    beforeLabel: 'Before: Freshly cleansed skin with zero cosmetic enhancement.',
    afterLabel: 'After: High-definition camera-ready contour, soft smoky eye, and velvet lip.',
    description: 'Waterproof, sweat-resistant bridal foundation formulation designed for flash photography and multi-hour celebration endurance.'
  },

  // 5. NAIL ART
  {
    id: 'trans-na-1',
    category: 'nail-art',
    categoryLabel: 'Nail Art',
    title: 'Natural Short Nails to 3D Sculpted Couture',
    guidePath: '/beauty-guide/nails',
    guideLabel: 'Nail Art Guidance',
    badgeType: 'Studio Transformation',
    beforeImage: '/images/nails/classic-manicure.webp',
    afterImage: '/images/nails/3d/complex-nail-art.jpg',
    beforeLabel: 'Before: Plain short natural nails with bare nail plates.',
    afterLabel: 'After: Hand-carved 3D petal sculptures, crystal accents, and chrome highlights.',
    description: 'Rubber base reinforcement topped with zero-shrinkage Japanese gel and hand-sculpted relief florals for bespoke bridal nails.'
  },
  {
    id: 'trans-na-2',
    category: 'nail-art',
    categoryLabel: 'Nail Art',
    title: 'Fragile Plates to Liquid Chrome Overlay',
    guidePath: '/beauty-guide/nails',
    guideLabel: 'Nail Art Guidance',
    badgeType: 'Technique Demonstration',
    beforeImage: '/images/nails/nail-repair.webp',
    afterImage: '/images/nails/3d/chrome-sculptures.jpg',
    beforeLabel: 'Before: Micro-split natural nail edge requiring reinforcement.',
    afterLabel: 'After: Seamless builder gel apex with reflective liquid silver chrome finish.',
    description: 'Structural fiber silk wrap repair encapsulated under non-wipe glass topcoat with high-reflective metallic pigment rub.'
  },

  // 6. MEHNDI DESIGNS
  {
    id: 'trans-mh-1',
    category: 'mehndi',
    categoryLabel: 'Mehndi Designs',
    title: 'Fresh Paste Application to Mahogany Stain Reveal',
    guidePath: '/beauty-guide/mehndi',
    guideLabel: 'Mehndi Guidance',
    badgeType: 'Studio Transformation',
    beforeImage: '/images/mehndi/finger-rings-lace.webp',
    afterImage: '/images/mehndi/bridal-full-hand.webp',
    beforeLabel: 'Before: Fine-line green organic Rajasthani henna paste application.',
    afterLabel: 'After: Rich dark burgundy botanical stain fully developed after 48 hours.',
    description: 'Triple-sifted Sojat henna powder blended with pure eucalyptus oil, resulting in deep, long-lasting ceremonial color without chemical additives.'
  },
  {
    id: 'trans-mh-2',
    category: 'mehndi',
    categoryLabel: 'Mehndi Designs',
    title: 'Minimalist Wrist Lace to Full Palm Mandala',
    guidePath: '/beauty-guide/mehndi',
    guideLabel: 'Mehndi Guidance',
    badgeType: 'Technique Demonstration',
    beforeImage: '/images/mehndi/minimalist-fine-line.webp',
    afterImage: '/images/mehndi/mandala-palm-art.webp',
    beforeLabel: 'Before: Express minimal wrist bracelet pattern.',
    afterLabel: 'After: Concentric symmetrical floral mandala with shaded fingertips.',
    description: 'Hand-drawn mandala precision balancing bold central shading with delicate lace borders for modern festive wear.'
  },

  // 7. EYEBROW & THREADING
  {
    id: 'trans-th-1',
    category: 'eyebrow-threading',
    categoryLabel: 'Eyebrow & Threading',
    title: 'Overgrown Regrowth to Razor-Sharp Brow Arches',
    guidePath: '/beauty-guide/threading',
    guideLabel: 'Threading Guidance',
    badgeType: 'Studio Transformation',
    beforeImage: '/images/threading/forehead-threading.jpg',
    afterImage: '/images/threading/eyebrow-threading.jpg',
    beforeLabel: 'Before: Diffuse vellus regrowth and loss of arch definition.',
    afterLabel: 'After: Clean, symmetrical, customized arches tailored to facial bone structure.',
    description: 'Sanitized organic cotton thread epilation removing micro-fuzz without chemical wax adhesives or epidermal stripping.'
  },
  {
    id: 'trans-th-2',
    category: 'eyebrow-threading',
    categoryLabel: 'Eyebrow & Threading',
    title: 'Diffuse Facial Fuzz to Sitara Full-Face Polish',
    guidePath: '/beauty-guide/threading',
    guideLabel: 'Threading Guidance',
    badgeType: 'Technique Demonstration',
    beforeImage: '/images/threading/sideburn-threading.jpg',
    afterImage: '/images/threading/sitara-full-face-threading.jpg',
    beforeLabel: 'Before: Unshaped sideburns and upper lip shadow.',
    afterLabel: 'After: Completely smooth, hair-free facial canvas ready for flawless foundation.',
    description: 'Comprehensive facial threading accompanied by organic rosewater and cooling ice massage to calm follicles.'
  },

  // 8. BRIDAL LOOKS
  {
    id: 'trans-br-1',
    category: 'bridal',
    categoryLabel: 'Bridal Looks',
    title: 'Trial Consultation to Royal Bridal Grandeur',
    guidePath: '/beauty-guide/bridal',
    guideLabel: 'Bridal Guidance',
    badgeType: 'Studio Transformation',
    beforeImage: '/images/gallery/client-mirror.webp',
    afterImage: '/images/mehndi/bridal-mehndi-hero.webp',
    beforeLabel: 'Before: Preliminary styling consultation and moodboard alignment.',
    afterLabel: 'After: Harmonized bridal artistry featuring organic henna, couture hair, and royal finish.',
    description: 'A completely coordinated bridal transformation uniting organic mehndi couture, structural hair styling, and glowing skin prep.'
  }
];
