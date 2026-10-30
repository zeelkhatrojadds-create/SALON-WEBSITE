// Makeup Atelier Constants & Configuration
// GLAM GIRL BY JANKI — Ottawa Luxury Beauty Studio
// Editorial Brand Palette: Deep Black (#10110F), Forest Green (#263D2B), Olive (#465640), Sage (#A8B5A0), Warm Cream (#F7F4ED)

export const MAKEUP_GALLERY_FILTERS = [
  { id: 'all', label: 'All Styles' },
  { id: 'natural', label: 'Natural' },
  { id: 'soft-glam', label: 'Soft Glam' },
  { id: 'full-glam', label: 'Full Glam' },
  { id: 'bridal', label: 'Bridal' },
  { id: 'party', label: 'Party' },
  { id: 'traditional', label: 'Traditional' },
  { id: 'editorial', label: 'Editorial' }
];

export const MAKEUP_INSPIRATION_GALLERY = [
  {
    id: 'natural-makeup',
    name: 'Natural Makeup',
    category: 'natural',
    subtitle: 'Breathable Sheer Radiance & Bare Skin Elegance',
    tagline: 'Your natural beauty, effortlessly illuminated',
    image: '/images/makeup/client-mirror.webp',
    description: 'A delicate enhancement focusing on breathable, sheer skin tints, feathered natural brows, soft cream blush, and lightly defined lashes for an immaculate clean-girl aesthetic.',
    characteristics: [
      'Sheer, breathable skin tint base',
      'Fluffy, brushed-up micro-blade look brows',
      'Soft cream peach or rose blush on high cheeks',
      'Hydrating peptide tinted lip balm'
    ],
    suitableLook: 'Everyday corporate polish, weekend brunches, daytime celebrations, and first-time makeup clients.',
    isServiceInCatalog: false,
    inspirationNote: 'Inspiration visual reference. Product formulations are calibrated to your skin type during consultation.'
  },
  {
    id: 'soft-glam-makeup',
    name: 'Soft Glam Makeup',
    category: 'soft-glam',
    subtitle: 'Diffused Neutrals & Velvety Dimensional Radiance',
    tagline: 'The timeless red-carpet signature',
    image: '/images/makeup/makeup-hero.webp',
    description: 'The epitome of modern luxury makeup. Features seamless, warm neutral eyeshadow blending, soft feline wing eyeliner, velvety contoured cheekbones, and blurred satin nude lips.',
    characteristics: [
      'Diffused warm taupe and champagne eye crease',
      'Soft satin-matte velvet skin finish',
      'Wispy faux lash flutter calibrated to eye shape',
      'Defined yet soft contoured lip with satin gloss'
    ],
    suitableLook: 'The ultimate versatile look for cocktails, dinner parties, engagement dinners, and milestone celebrations.',
    isServiceInCatalog: true,
    offeredServiceId: 'noor-signature-makeup',
    offeredServiceName: 'Noor Signature Makeup ($95 CAD / 60 min)',
    inspirationNote: 'Featured atelier service. Personalized to your facial contours and eye shape.'
  },
  {
    id: 'full-glam-makeup',
    name: 'Full Glam Makeup',
    category: 'full-glam',
    subtitle: 'Sculpted High-Def Airbrush & Opulent Drama',
    tagline: 'Striking red-carpet stage presence',
    image: '/images/makeup/makeup-hero.webp',
    description: 'High-octane makeup architecture featuring flawless full-coverage HD airbrush foundation, crisp cut-crease eyeshadow, sculpted facial contours, and high-impact mink lashes.',
    characteristics: [
      'Full-coverage 16+ hour transfer-resistant foundation',
      'Sculpted baking and chiseled contour architecture',
      'Dramatic cut-crease with metallic or shimmer pigments',
      'Multi-dimensional statement faux lashes'
    ],
    suitableLook: 'Evening galas, milestone birthday bashes, stage performances, and high-glamour celebrations.',
    isServiceInCatalog: true,
    offeredServiceId: 'party-makeup',
    offeredServiceName: 'Party Makeup ($85 CAD / 50 min)',
    inspirationNote: 'Featured atelier service. Coverage level is fully customized to your comfort zone.'
  },
  {
    id: 'dewy-makeup',
    name: 'Dewy Makeup',
    category: 'natural',
    subtitle: 'Glass-Skin Hydration & Luminous Liquid Pearls',
    tagline: 'Fresh, juicy, light-catching glow',
    image: '/images/makeup/client-mirror.webp',
    description: 'Skin-first makeup infused with botanical serums, hyaluronic light-reflecting bases, cream cheek tints, and high-gloss lips that catch every angle of ambient light.',
    characteristics: [
      'Hyaluronic acid and squalane luminous prep',
      'Liquid pearl highlight on cheekbones, nose bridge, and cupid\'s bow',
      'Cream-based melting bronzer and dewy blush',
      'High-shine reflective glass lip glaze'
    ],
    suitableLook: 'Spring and summer weddings, outdoor garden parties, daytime bridal showers, and dry-skin clients.',
    isServiceInCatalog: false,
    inspirationNote: 'Inspiration visual reference. Primers and setting mists are tailored to skin hydration levels.'
  },
  {
    id: 'matte-makeup',
    name: 'Matte Makeup',
    category: 'full-glam',
    subtitle: 'Shine-Free Velvet Canvas & Flash-Proof Perfection',
    tagline: 'Zero glare under high-powered flash photography',
    image: '/images/makeup/makeup-hero.webp',
    description: 'An immaculate, shine-free velvet complexion engineered with micro-milled silica powders and sebum-control primers for 16+ hour endurance, flash photography, and all-weather precision.',
    characteristics: [
      'Silica micro-powder oil absorption matrix',
      'Zero flashback under professional studio strobes',
      'Sharp, crisp, architectural eyeliner and brow edges',
      'Transfer-proof matte velvet lip stain'
    ],
    suitableLook: 'High-humidity outdoor events, studio headshots, television interviews, and oily/combination skin types.',
    isServiceInCatalog: false,
    inspirationNote: 'Inspiration visual reference. Can be requested as the foundation finish for any service.'
  },
  {
    id: 'bridal-makeup-inspiration',
    name: 'Bridal Makeup Inspiration',
    category: 'bridal',
    subtitle: 'Royal South-Asian & Western Bridal Splendor',
    tagline: '24-hour tear-proof royal perfection',
    image: '/images/makeup/makeup-hero.webp',
    description: 'The definitive bridal transformation suite: 24-hour waterproof HD complexion, faux mink lash application, dupatta pin placement, and royal bridal hair architecture.',
    characteristics: [
      '24-hour waterproof, tear-resistant formula matrix',
      'Custom color harmony matching bridal lehenga or gown',
      'Architectural eyelid definition with gold leaf or champagne shimmer',
      'Dupatta, veil, and jewelry pin placement assistance'
    ],
    suitableLook: 'Wedding Ceremony, Mandap & Pheras ritual, church white-gown nuptials, and royal receptions.',
    isServiceInCatalog: true,
    offeredServiceId: 'shringar-bridal-makeup',
    offeredServiceName: 'Shringar Bridal Makeup ($220 CAD / 90 min)',
    inspirationNote: 'Featured atelier service. Includes comprehensive bridal consultation.'
  },
  {
    id: 'party-makeup',
    name: 'Party Makeup',
    category: 'party',
    subtitle: 'Celebration Glamour with Glitter & Graphic Wings',
    tagline: 'Camera-ready radiance for festive nights',
    image: '/images/makeup/makeup-hero.webp',
    description: 'Turn heads at every festive party with camera-ready smokey party makeup, voluminous salon blow-dry styling, and flawless celebratory glam.',
    characteristics: [
      'Vibrant duochrome or sparkling pressed glitters',
      'Sharp liquid feline eyeliner wings',
      'Longwear transfer-proof lipstick in bold or nude hues',
      'Sweat-proof finishing spray seal'
    ],
    suitableLook: 'Birthdays, festive celebrations, bachelorettes, New Year parties, and celebratory dinners.',
    isServiceInCatalog: true,
    offeredServiceId: 'party-makeup',
    offeredServiceName: 'Party Makeup ($85 CAD / 50 min)',
    inspirationNote: 'Featured atelier service. Can be customized with smokey or shimmer eye palettes.'
  },
  {
    id: 'evening-glam',
    name: 'Evening Glam',
    category: 'party',
    subtitle: 'Sultry Smokey Eyes & Warm Sculpted Bronzing',
    tagline: 'Deep, atmospheric nighttime drama',
    image: '/images/makeup/makeup-hero.webp',
    description: 'A moody, atmospheric aesthetic centered on deep smokey khol-rimmed eyes, warm terracotta and bronze contouring, and a soft neutral lip to balance the dramatic gaze.',
    characteristics: [
      'Smudged khol kajal blended into espresso shadows',
      'Deep dimensional eye halo effect',
      'Warm bronzed complexion with sculpted warmth',
      'Soft nude or peachy caramel velvet lips'
    ],
    suitableLook: 'Black-tie galas, formal anniversary banquets, evening cocktail receptions, and luxury date nights.',
    isServiceInCatalog: false,
    inspirationNote: 'Inspiration visual reference. Ideal eye-look selection for Party Makeup appointments.'
  },
  {
    id: 'traditional-makeup',
    name: 'Traditional Makeup',
    category: 'traditional',
    subtitle: 'Cultural Heritage Artistry & Rich Festive Hues',
    tagline: 'Timeless South-Asian beauty traditions',
    image: '/images/makeup/makeup-hero.webp',
    description: 'Celebrating cultural heritage with deep winged kajal, warm undertone foundation calibration, ornate bindi harmony, and classic ruby or berry lip pigments.',
    characteristics: [
      'Kajal-rimmed almond eye shaping',
      'Warm South-Asian undertone foundation matching',
      'High-pigment traditional lip shades (vermillion, ruby, maroon)',
      'Harmonized with traditional heirloom jewelry and sarees'
    ],
    suitableLook: 'Mehndi ceremonies, Haldi rituals, Sangeet performances, Diwali, and festive family poojas.',
    isServiceInCatalog: true,
    offeredServiceId: 'bridal-side-functions',
    offeredServiceName: 'Bridal Side Functions Makeup ($150 CAD / 75 min)',
    inspirationNote: 'Featured atelier service. Specially formulated to complement vivid traditional attire.'
  },
  {
    id: 'minimal-makeup',
    name: 'Minimal Makeup',
    category: 'natural',
    subtitle: 'Micro-Corrected Complexion & Effortless Polish',
    tagline: 'Uncomplicated, understated everyday confidence',
    image: '/images/makeup/client-mirror.webp',
    description: 'An ultra-refined "no-makeup makeup" approach using pinpoint spot concealer, translucent mineral setting, warm monochromatic cheek washes, and groom-and-go brow styling.',
    characteristics: [
      'Pinpoint micro-concealing where needed without full base',
      'Sheer cream balm on lips and eyelids',
      'Clear brow lamination gel setting',
      'Natural curl lifting with clear or brown lash conditioning'
    ],
    suitableLook: 'Business headshots, creative casting, corporate presentations, and effortless daytime wear.',
    isServiceInCatalog: false,
    inspirationNote: 'Inspiration visual reference. Highlights natural facial features without heavy cosmetics.'
  },
  {
    id: 'engagement-makeup',
    name: 'Engagement Makeup',
    category: 'bridal',
    subtitle: 'Romantic Ring Ceremony Glow with Rose-Gold Shimmer',
    tagline: 'The sweet spot between soft glam and bridal majesty',
    image: '/images/makeup/makeup-hero.webp',
    description: 'Romantic ring-ceremony makeup striking the perfect balance between soft glam and bridal elegance, featuring rose-gold lids, blushing cheeks, and all-night hold.',
    characteristics: [
      'Rose-gold, champagne, or soft bronze shimmer lids',
      'Soft romantic blush sweeping from apples to temples',
      'Flirty dimensional flutter lashes',
      'Semi-matte longwear rose or mauve lip color'
    ],
    suitableLook: 'Engagement parties, ring ceremonies, Roka events, and pre-wedding bridal photoshoots.',
    isServiceInCatalog: true,
    offeredServiceId: 'engagement-makeup',
    offeredServiceName: 'Engagement Makeup ($130 CAD / 75 min)',
    inspirationNote: 'Featured atelier service. Designed to glow under ring-ceremony flash photography.'
  },
  {
    id: 'editorial-makeup',
    name: 'Editorial Makeup',
    category: 'editorial',
    subtitle: 'Avant-Garde Graphic Lines & High-Fashion Artistry',
    tagline: 'Bold creative statements for camera and runway',
    image: '/images/makeup/client-mirror.webp',
    description: 'Cutting-edge creative makeup featuring graphic floating eyeliner, bold monochromatic washes, dewy glass-skin accents, and high-concept runway flair.',
    characteristics: [
      'Graphic floating liner or artistic geometric negative space',
      'High-contrast textures (matte lips paired with glossy lids)',
      'Unconventional color blocking or metallic foil leafing',
      'Engineered for 4K video close-ups and editorial print'
    ],
    suitableLook: 'High-fashion editorial photoshoots, brand commercial campaigns, runway shows, and artistic content creation.',
    isServiceInCatalog: false,
    inspirationNote: 'Inspiration creative style. Available for custom photo campaigns upon consultation.'
  }
];

export const MAKEUP_OCCASIONS = [
  {
    id: 'wedding',
    name: 'Wedding Ceremony',
    tagline: 'The ultimate royal milestone makeover',
    description: 'Comprehensive 24-hour waterproof bridal artistry engineered for studio lights, emotional tears, and royal grandeur.',
    recommendedStyles: ['Bridal Makeup Inspiration', 'Traditional Makeup', 'Full Glam Makeup'],
    matchedServiceId: 'shringar-bridal-makeup',
    matchedServiceName: 'Shringar Bridal Makeup ($220 CAD / 90 min)',
    colorPalette: 'Deep reds, rich gold, soft rose gold, champagne',
    finishRecommendation: 'Radiant Velvet Matte (Flash-proof & longwear)',
    timingAdvice: 'Schedule 2.5 to 3 hours before your bridal entry or photoshoot departure.'
  },
  {
    id: 'engagement',
    name: 'Engagement / Ring Ceremony',
    tagline: 'Romantic, radiant ring-exchange glamour',
    description: 'The golden balance between soft glam and celebratory majesty with luminous rose-gold lids and blushing cheek warmth.',
    recommendedStyles: ['Engagement Makeup', 'Soft Glam Makeup', 'Dewy Makeup'],
    matchedServiceId: 'engagement-makeup',
    matchedServiceName: 'Engagement Makeup ($130 CAD / 75 min)',
    colorPalette: 'Rose gold, dusty pink, soft peach, mauve',
    finishRecommendation: 'Luminous Satin Glow',
    timingAdvice: 'Schedule 1.5 to 2 hours prior to guest arrival.'
  },
  {
    id: 'reception',
    name: 'Wedding Reception',
    tagline: 'Modern, high-fashion evening glamour',
    description: 'Sophisticated Western or contemporary South-Asian evening glam featuring bold sculpted eyes, contoured warmth, and sleek modern styling.',
    recommendedStyles: ['Full Glam Makeup', 'Soft Glam Makeup', 'Evening Glam'],
    matchedServiceId: 'party-makeup',
    matchedServiceName: 'Party Makeup ($85 CAD / 50 min)',
    colorPalette: 'Smokey bronze, champagne, deep berry, velvet nude',
    finishRecommendation: 'Velvet Matte or Demi-Matte',
    timingAdvice: 'Book for late afternoon before the evening entrance.'
  },
  {
    id: 'mehndi',
    name: 'Mehndi Ceremony',
    tagline: 'Playful, vibrant, and festive celebrations',
    description: 'Colorful, fresh, and camera-ready makeup that withstands long seated sessions of henna application while looking radiant in 4K photography.',
    recommendedStyles: ['Traditional Makeup', 'Soft Glam Makeup', 'Dewy Makeup'],
    matchedServiceId: 'bridal-side-functions',
    matchedServiceName: 'Bridal Side Functions Makeup ($150 CAD / 75 min)',
    colorPalette: 'Warm coral, marigold yellow accents, bronze, pink',
    finishRecommendation: 'Fresh Dewy or Luminous Satin',
    timingAdvice: 'Apply makeup before henna application begins.'
  },
  {
    id: 'haldi',
    name: 'Haldi Ceremony',
    tagline: 'Fresh, waterproof, and glowing morning beauty',
    description: 'Lightweight, water-resistant formulation that withstands turmeric splashes and playful family rituals while keeping skin radiant.',
    recommendedStyles: ['Natural Makeup', 'Minimal Makeup', 'Dewy Makeup'],
    matchedServiceId: 'bridal-side-functions',
    matchedServiceName: 'Bridal Side Functions Makeup ($150 CAD / 75 min)',
    colorPalette: 'Golden glow, fresh apricot, warm nude',
    finishRecommendation: 'Waterproof Skin Tint with Dewy Highlights',
    timingAdvice: 'Morning application with waterproof barrier setting.'
  },
  {
    id: 'sangeet',
    name: 'Sangeet & Musical Night',
    tagline: 'High-energy dance-proof glamour',
    description: 'Dynamic, sweat-resistant festive makeup with sparkling eyes, winged eyeliner, and transfer-proof lips built for high-energy dancing.',
    recommendedStyles: ['Party Makeup', 'Traditional Makeup', 'Full Glam Makeup'],
    matchedServiceId: 'party-makeup',
    matchedServiceName: 'Party Makeup ($85 CAD / 50 min)',
    colorPalette: 'Sparkling glitter, deep emerald or plum accents, ruby lips',
    finishRecommendation: 'Sweat-Proof Matte Base with Glitter Accents',
    timingAdvice: 'Early evening preparation with extra setting spray locks.'
  },
  {
    id: 'birthday-party',
    name: 'Birthday Party',
    tagline: 'Fun, photogenic, and glamorous celebration',
    description: 'Flirty, youthful, and vibrant styling tailored to make the birthday star or guest stand out in group selfies and candid photos.',
    recommendedStyles: ['Party Makeup', 'Soft Glam Makeup', 'Dewy Makeup'],
    matchedServiceId: 'party-makeup',
    matchedServiceName: 'Party Makeup ($85 CAD / 50 min)',
    colorPalette: 'Champagne shimmer, berry pinks, glossy peach',
    finishRecommendation: 'Radiant Glow with Glass Gloss',
    timingAdvice: '1 hour prior to party start time.'
  },
  {
    id: 'festive-celebration',
    name: 'Festive Celebration (Diwali / Eid)',
    tagline: 'Cultural brilliance for festive gatherings',
    description: 'Luminous traditional glam harmonizing with traditional silks, lehengas, and intricate jewelry for community festivals.',
    recommendedStyles: ['Traditional Makeup', 'Soft Glam Makeup', 'Evening Glam'],
    matchedServiceId: 'noor-signature-makeup',
    matchedServiceName: 'Noor Signature Makeup ($95 CAD / 60 min)',
    colorPalette: 'Gold, warm bronze, deep terracotta, classic red',
    finishRecommendation: 'Satin Velvet Glow',
    timingAdvice: 'Afternoon booking before evening lamp lighting & festivities.'
  },
  {
    id: 'photoshoot',
    name: 'Professional Photoshoot',
    tagline: 'High-definition strobe-ready complexion',
    description: 'Anti-glare, high-contrast makeup crafted specifically for 4K video lenses, strobe flashes, and print editorial lighting.',
    recommendedStyles: ['Editorial Makeup', 'Matte Makeup', 'Full Glam Makeup'],
    matchedServiceId: 'noor-signature-makeup',
    matchedServiceName: 'Noor Signature Makeup ($95 CAD / 60 min)',
    colorPalette: 'Neutral sculpted shades, monochromatic tones',
    finishRecommendation: 'Flash-Proof Matte or Controlled Semi-Matte',
    timingAdvice: 'Arrive 1.5 hours before camera call time.'
  },
  {
    id: 'professional-event',
    name: 'Professional Event & Gala',
    tagline: 'Polished, authoritative, and elegant poise',
    description: 'Sophisticated corporate polish combining subtle definition, pristine skin correction, and understated confidence for awards and keynotes.',
    recommendedStyles: ['Natural Makeup', 'Minimal Makeup', 'Soft Glam Makeup'],
    matchedServiceId: 'noor-signature-makeup',
    matchedServiceName: 'Noor Signature Makeup ($95 CAD / 60 min)',
    colorPalette: 'Soft neutrals, warm beige, rosy brown, muted nude',
    finishRecommendation: 'Natural Soft Matte',
    timingAdvice: '1 hour appointment before registration.'
  },
  {
    id: 'date-night',
    name: 'Date Night & Anniversary',
    tagline: 'Intimate, romantic, candle-lit allure',
    description: 'A soft, romantic look with diffused fluttery lashes, glowing cheeks, and touchable velvet lips designed to shine in low candlelit ambiance.',
    recommendedStyles: ['Soft Glam Makeup', 'Dewy Makeup', 'Evening Glam'],
    matchedServiceId: 'noor-signature-makeup',
    matchedServiceName: 'Noor Signature Makeup ($95 CAD / 60 min)',
    colorPalette: 'Romantic mauve, flushed rose, warm amber',
    finishRecommendation: 'Luminous Candlelit Glow',
    timingAdvice: 'Late afternoon before evening dinner.'
  },
  {
    id: 'other-special-occasion',
    name: 'Other Special Occasion',
    tagline: 'Customized beauty for your unique moment',
    description: 'Bespoke makeup styling designed from the ground up to match your unique outfit, personal comfort level, and celebration theme.',
    recommendedStyles: ['Soft Glam Makeup', 'Natural Makeup', 'Party Makeup'],
    matchedServiceId: 'noor-signature-makeup',
    matchedServiceName: 'Noor Signature Makeup ($95 CAD / 60 min)',
    colorPalette: 'Fully customized to your vision',
    finishRecommendation: 'Tailored to your skin type',
    timingAdvice: 'Discussed during personal consultation.'
  }
];

export const MAKEUP_EXPLORER_CRITERIA = {
  finishes: [
    { id: 'natural', name: 'Natural', desc: 'Skin-like breathable coverage that looks like your best complexion day' },
    { id: 'dewy', name: 'Dewy', desc: 'Ultra-hydrated, reflective glass-skin finish with luminous liquid highlights' },
    { id: 'satin', name: 'Satin', desc: 'Balanced demi-matte radiance with velvety smoothness and zero shine' },
    { id: 'matte', name: 'Matte', desc: 'Velvet oil-controlled finish engineered for 16h wear and flash photography' },
    { id: 'radiant', name: 'Radiant', desc: 'Lit-from-within golden pearl illumination that catches ambient light' }
  ],
  eyeMakeups: [
    { id: 'minimal', name: 'Minimal', desc: 'Clean eyelid wash with mascara definition and combed feathered brows' },
    { id: 'soft-shimmer', name: 'Soft Shimmer', desc: 'Romantic champagne or rose-gold reflection across the lid' },
    { id: 'smokey', name: 'Smokey', desc: 'Blended charcoal, espresso, or bronze khol rimming for sultry depth' },
    { id: 'defined', name: 'Defined', desc: 'Cut-crease structure with sculpted socket contour and lid brightness' },
    { id: 'winged', name: 'Winged', desc: 'Crisp liquid feline eyeliner flick elongating the natural eye contour' }
  ],
  lipStyles: [
    { id: 'nude', name: 'Nude', desc: 'Sophisticated warm beige, caramel, or mauve nude matched to undertone' },
    { id: 'pink', name: 'Pink', desc: 'Romantic rose, dusty petal, or soft bubblegum blush' },
    { id: 'peach', name: 'Peach', desc: 'Fresh warm apricot and coral tones ideal for golden and warm undertones' },
    { id: 'red', name: 'Red', desc: 'Classic blue-red, crimson, or vermillion red statement lip' },
    { id: 'bold', name: 'Bold', desc: 'Deep plum, blackberry, terracotta, or chocolate velvet intensity' }
  ],
  overallLooks: [
    { id: 'minimal', name: 'Minimal', desc: "Fresh, effortless, 'no-makeup' confidence prioritizing skincare" },
    { id: 'elegant', name: 'Elegant', desc: 'Sophisticated, balanced, and timeless for formal and family occasions' },
    { id: 'glamorous', name: 'Glamorous', desc: 'Opulent, photo-ready, high-impact drama with luxury lashes' },
    { id: 'traditional', name: 'Traditional', desc: 'Cultural South-Asian heritage artistry harmonizing with bridal silks' },
    { id: 'modern', name: 'Modern', desc: 'Runway-inspired, graphic, and trendsetting editorial elements' }
  ]
};

export const MAKEUP_EXPERIENCE_STEPS = [
  {
    step: '01',
    title: 'Inspiration & Vision',
    summary: 'Explore curated makeup styles and share your personal preferences.',
    details: 'Begin by browsing our gallery of finishes, eye contours, and lip palettes. Share reference photos, event themes, and outfit colors with master stylist Janki Khatroja.'
  },
  {
    step: '02',
    title: 'Personal Consultation',
    summary: 'Discuss the occasion, skin undertones, lighting, and comfort zone.',
    details: 'We evaluate your facial symmetry, eye shape, and skin undertones (warm, cool, neutral). We discuss event lighting (daylight, studio flash, candlelit evening) to select the perfect formula.'
  },
  {
    step: '03',
    title: 'Skin Preparation & Barrier Priming',
    summary: 'Purify, hydrate, and prepare the skin canvas with tailored botanicals.',
    details: 'A flawless makeup look requires a healthy skin foundation. We apply micellar cleansing, lymphatic facial massage, hyaluronic hydration, and pore-smoothing primer matched to your skin type.'
  },
  {
    step: '04',
    title: 'Couture Makeup Artistry',
    summary: 'Precision HD foundation blending, customized eye artistry, and lashes.',
    details: 'Using sanitized, professional brushes and airbrush techniques, we craft seamless complexion coverage, sculpted bone structure, and custom-mapped eye architecture with luxury lashes.'
  },
  {
    step: '05',
    title: 'Final Look & Setting Lock',
    summary: 'Review under varied lighting, lip refinement, and transfer-proof seal.',
    details: 'We inspect the finished look under daylight and studio simulation mirrors. We apply longwear setting mist to lock formulas for 16+ hours and provide complimentary touch-up advice.'
  },
  {
    step: '06',
    title: 'Care Guidance & Gentle Removal',
    summary: 'Share skin-friendly makeup removal methods and post-event skincare.',
    details: 'We provide step-by-step guidance on gentle dual-phase cleansing, preserving natural eyelash health, and restoring skin barrier hydration after your celebration.'
  }
];

export const MAKEUP_PREPARATION_CARDS = [
  {
    id: 'skincare-prep',
    title: 'Prepare the Skin with Hydration',
    description: 'Maintain your consistent hydrating skincare routine in the days leading up to your event. Hydrated, exfoliated skin allows foundations to blend seamlessly without clinging to dry patches.'
  },
  {
    id: 'avoid-unfamiliar-products',
    title: 'Avoid Unfamiliar Active Ingredients',
    description: 'Do not experiment with new chemical peels, strong retinols, or unfamiliar facial products within 5 to 7 days of your event to prevent unexpected allergic redness or peeling.'
  },
  {
    id: 'share-sensitivities',
    title: 'Share Known Product Sensitivities',
    description: 'Inform your artist about any allergies to latex, fragrance, specific oils, or eye makeup ingredients during your consultation so we can curate hypoallergenic formulations.'
  },
  {
    id: 'bring-inspiration',
    title: 'Bring Inspiration Photos & Outfit Swatches',
    description: 'Bring reference photographs of makeup styles you love, along with pictures of your outfit, jewelry, and neckline to help us design a harmonized color palette.'
  },
  {
    id: 'discuss-coverage',
    title: 'Discuss Preferred Coverage & Finish',
    description: 'Be open about your comfort zone. Whether you prefer a sheer skin-like tint, a luminous glow, or full-coverage matte airbrush, we tailor the application to your aesthetic.'
  },
  {
    id: 'clean-canvas',
    title: 'Arrive with Clean, Fresh Skin',
    description: 'Arrive at your appointment with a freshly washed, bare face free of existing mascara or makeup residue, allowing maximum time for skin prep and custom artistry.'
  }
];

export const MAKEUP_AFTERCARE_CARDS = [
  {
    id: 'gentle-removal',
    badge: 'Cleansing',
    title: 'Gentle Dual-Phase Removal',
    points: [
      'Use an oil-based cleansing balm or dual-phase micellar water to gently melt longwear foundation and waterproof eye makeup.',
      'Allow the cleanser to dissolve makeup for 60 seconds before wiping gently with a soft microfiber cloth.',
      'Never aggressively rub or scrub sensitive eye areas or pull on false lash bands.'
    ]
  },
  {
    id: 'double-cleanse',
    badge: 'Skincare',
    title: 'Double Cleansing Protocol',
    points: [
      'Follow your oil cleanser with a gentle, hydrating foaming cleanser to remove all remaining cosmetic pigments and impurities.',
      'Rinse with lukewarm water rather than hot water to prevent stripping your skin barrier.',
      'Pat dry gently with a clean face towel.'
    ]
  },
  {
    id: 'never-sleep-in-makeup',
    badge: 'Hygiene',
    title: 'Never Sleep with Makeup On',
    points: [
      'Sleeping in heavy makeup traps environmental sebum and dead skin cells, causing clogged pores and breakouts.',
      'Residual eye makeup can migrate into the eye during sleep, leading to conjunctival irritation or styes.',
      'Even on late event nights, perform at least a gentle micellar cleanse and moisturizer application.'
    ]
  },
  {
    id: 'tool-hygiene',
    badge: 'Maintenance',
    title: 'Clean Makeup Tools Regularly',
    points: [
      'Wash your personal beauty sponges and foundation brushes at least once weekly using mild antimicrobial soap.',
      'Dry brushes flat with bristles pointing slightly downward to prevent water from degrading ferrule glue.',
      'Replace makeup sponges every 2 to 3 months for optimal skin health.'
    ]
  },
  {
    id: 'cosmetic-storage',
    badge: 'Storage',
    title: 'Store Cosmetics Properly',
    points: [
      'Keep your daily cosmetics in a cool, dry area away from direct sunlight and humid bathroom steam.',
      'Ensure caps and lids are tightly sealed after every use to prevent formula oxidation and bacterial contamination.',
      'Respect cosmetic expiry symbols (e.g. 6M for mascaras, 12M for liquid foundations).'
    ]
  },
  {
    id: 'irritation-protocol',
    badge: 'Health Notice',
    title: 'Seek Advice If Irritation Occurs',
    points: [
      'If you notice persistent redness, itching, swelling, or burning sensations around the eyes or skin, wash makeup off immediately.',
      'Discontinue use of all cosmetic products on the affected area.',
      'If irritation or allergic symptoms persist, seek professional medical guidance promptly.'
    ]
  }
];

export const MAKEUP_FAQS = [
  {
    question: 'What is the difference between natural and soft glam makeup?',
    answer: 'Natural makeup focuses on lightweight, sheer skin tints, groomed brows, and subtle tinted balms to enhance what you naturally have without noticeable cosmetic weight. Soft glam makeup is a red-carpet signature that uses medium-coverage velvety foundation, sculpted neutral contour, diffused eyeshadow blending, and delicate faux lashes to create a polished, photogenic, and glamorous appearance that still looks sophisticated and timeless.'
  },
  {
    question: 'What makeup style is suitable for a wedding?',
    answer: 'For wedding ceremonies, longwear, tear-resistant, and flash-proof formulations are essential. Most brides choose between Royal Traditional Bridal Makeup (rich gold or jewel tones matching traditional South-Asian attire) or Western Bridal Radiance (rose-gold, champagne, and glass skin matching white gowns). During your consultation, we evaluate your outfit colors, jewelry, venue lighting, and personal comfort zone to curate your bespoke bridal style.'
  },
  {
    question: 'Can I share inspiration photographs during my consultation?',
    answer: 'Yes! We actively encourage clients to bring inspiration photographs, mood boards, outfit fabric swatches, and pictures of jewelry. Inspiration photos help us understand your aesthetic preferences, favored eye shapes, and color choices. Our master artist will adapt those inspirations to complement your unique facial anatomy and skin undertones.'
  },
  {
    question: 'How do I choose between dewy and matte finishes?',
    answer: 'The choice depends on your skin type, event venue, and personal preference. Dewy finishes are radiant, hydrating, and light-reflecting, making them ideal for dry skin, daytime outdoor events, and springtime celebrations. Matte finishes offer velvety, shine-free oil control and zero flashback under strobe lights, making them ideal for oily or combination skin, warm summer evenings, and high-flash photography.'
  },
  {
    question: 'Can I request a personalized makeup look not listed in the gallery?',
    answer: 'Absolutely. Every look created at GLAM GIRL BY JANKI is customized. The styles in our gallery serve as design inspirations and creative starting points. Through our personalized consultation, you can blend elements from different styles — such as pairing a dewy glass-skin complexion with a dramatic smokey eye or a soft glam eye with a bold ruby lip.'
  },
  {
    question: 'Should I share product sensitivities and skin allergies?',
    answer: 'Yes, please share any known sensitivities, allergies, or past reactions during your consultation. Knowing if your skin reacts to fragrances, latex in lash adhesives, specific oils, or heavy powders allows us to select certified hypoallergenic, fragrance-free, and sensitive-skin-friendly formulations from our professional kit.'
  },
  {
    question: 'How should I remove longwear event makeup after my celebration?',
    answer: 'We recommend double cleansing. First, use a gentle cleansing balm, oil-based cleanser, or dual-phase micellar water to dissolve longwear foundation and waterproof eye makeup without pulling or tugging. After rinsing, follow with a gentle, hydrating foaming cleanser to purify the pores. Finish with a soothing moisturizer to replenish skin barrier hydration overnight.'
  }
];
