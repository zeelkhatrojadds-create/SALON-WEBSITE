// GLAM GIRL BY JANKI — Hair Colour Customizer Data
// Comprehensive shade library, model profiles, and finish types

export const CUSTOMIZER_MODELS = [
  {
    id: 'aria-balayage',
    name: 'Aria',
    style: 'Long Cascading Layered Waves',
    image: '/images/hair/model-customizer-portrait.jpg',
    baseNaturalTone: '#3D2A1F',
    hairPathD: `
      M 160 800
      C 140 700, 110 560, 115 420
      C 120 300, 150 180, 220 130
      C 260 100, 340 100, 380 130
      C 450 180, 480 300, 485 420
      C 490 560, 460 700, 440 800
      C 410 760, 370 700, 360 620
      C 355 580, 370 510, 375 450
      C 385 360, 380 290, 340 240
      C 310 210, 290 210, 260 240
      C 220 290, 215 360, 225 450
      C 230 510, 245 580, 240 620
      C 230 700, 190 760, 160 800
      Z
    `,
    faceCutoutD: `
      M 260 240
      C 290 215, 310 215, 340 240
      C 365 270, 375 320, 375 370
      C 375 420, 365 470, 355 510
      C 345 540, 325 565, 300 570
      C 275 565, 255 540, 245 510
      C 235 470, 225 420, 225 370
      C 225 320, 235 270, 260 240
      Z
    `,
    crownHighlightD: `
      M 240 140
      C 270 120, 330 120, 360 140
      C 380 160, 390 190, 385 220
      C 355 190, 325 180, 290 180
      C 260 180, 235 195, 215 220
      C 210 190, 220 160, 240 140
      Z
    `
  }
];

// The 7 explicit required categories + All + Favourites
export const HAIR_SHADE_CATEGORIES = [
  { id: 'all', label: 'All Shades' },
  { id: 'natural', label: 'Natural' },
  { id: 'blonde', label: 'Blonde' },
  { id: 'brown', label: 'Brown' },
  { id: 'red', label: 'Red' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'balayage', label: 'Balayage' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'favourites', label: 'Favourites' }
];

export const COMPLETE_HAIR_SHADES = [
  // =========================================================================
  // 1. NATURAL CATEGORY (Includes Black, Soft Black, Espresso, Dark Brown)
  // =========================================================================
  {
    id: 'black',
    name: 'Black',
    category: 'natural',
    hex: '#111111',
    variantImage: '/images/hair/variants/black.jpg',
    undertone: 'Neutral Noir',
    description: 'Deep, ink-rich raven black with mirror reflection and velvet depths.',
    formula: 'Level 1.0 Neutral Jet Noir with Botanical Gloss',
    service: 'full-colour'
  },
  {
    id: 'soft-black',
    name: 'Soft Black',
    category: 'natural',
    hex: '#211E1C',
    variantImage: '/images/hair/variants/black.jpg',
    undertone: 'Soft Onyx',
    description: 'Gentle, naturalistic off-black without harsh blue or flat undertones.',
    formula: 'Level 2.0 Soft Onyx with Argan Gloss Seal',
    service: 'full-colour'
  },
  {
    id: 'espresso',
    name: 'Espresso',
    category: 'natural',
    hex: '#261914',
    variantImage: '/images/hair/variants/chocolate-brown.jpg',
    undertone: 'Deep Roasted Coffee',
    description: 'Deep, smokey dark roast brunette with zero orange brassiness.',
    formula: 'Level 3.1 Smokey Espresso Melt',
    service: 'full-colour'
  },
  {
    id: 'dark-brown',
    name: 'Dark Brown',
    category: 'natural',
    hex: '#2A1D17',
    variantImage: '/images/hair/variants/chocolate-brown.jpg',
    undertone: 'Deep Cocoa',
    description: 'Classic dark cocoa brown with rich light-reflecting depth.',
    formula: 'Level 3.0 Deep Cocoa Brown Glaze',
    service: 'full-colour'
  },

  // =========================================================================
  // 2. BROWN CATEGORY (Includes Chocolate Brown, Mocha, Caramel, Ash Brown, Chestnut, Mushroom)
  // =========================================================================
  {
    id: 'chocolate-brown',
    name: 'Chocolate Brown',
    category: 'brown',
    hex: '#3E2519',
    variantImage: '/images/hair/variants/chocolate-brown.jpg',
    undertone: 'Warm Chocolate',
    description: 'Decadent dark chocolate brunette with warm mahogany light bounces.',
    formula: 'Level 4.35 Belgian Truffle Brown',
    service: 'full-colour'
  },
  {
    id: 'mocha',
    name: 'Mocha',
    category: 'brown',
    hex: '#4A3022',
    variantImage: '/images/hair/variants/mocha.jpg',
    undertone: 'Balanced Velvet Mocha',
    description: 'Harmonious blend of warm cocoa and cool cafe reflections.',
    formula: 'Level 4.8 Cafe Mocha Acidic Glaze',
    service: 'full-colour'
  },
  {
    id: 'caramel',
    name: 'Caramel',
    category: 'brown',
    hex: '#8B5324',
    variantImage: '/images/hair/variants/caramel.jpg',
    undertone: 'Golden Toffee',
    description: 'Warm, luminous golden caramel tones on a rich hazelnut base.',
    formula: 'Level 6.34 Salted Caramel Melt',
    service: 'noor-balayage'
  },
  {
    id: 'ash-brown',
    name: 'Ash Brown',
    category: 'brown',
    hex: '#4A423D',
    variantImage: '/images/hair/variants/ash-brown.jpg',
    undertone: 'Cool Mineral Ash',
    description: 'Refined smoky brunette that neutralizes all orange warmth.',
    formula: 'Level 5.1 Cool Graphite Brown Glaze',
    service: 'full-colour'
  },
  {
    id: 'chestnut-brown',
    name: 'Chestnut Brown',
    category: 'brown',
    hex: '#583321',
    variantImage: '/images/hair/variants/chocolate-brown.jpg',
    undertone: 'Warm Auburn Glow',
    description: 'Medium brown illuminated with spicy chestnut and copper warmth.',
    formula: 'Level 5.4 Roasted Chestnut Gloss',
    service: 'full-colour'
  },
  {
    id: 'mushroom-brown',
    name: 'Mushroom Brown',
    category: 'brown',
    hex: '#5A504B',
    variantImage: '/images/hair/variants/ash-brown.jpg',
    undertone: 'Earthy Taupe',
    description: 'Trendy cool-toned taupe brunette inspired by earthy portobello tones.',
    formula: 'Level 6.12 Mushroom Taupe Glaze',
    service: 'noor-balayage'
  },
  {
    id: 'medium-brown',
    name: 'Medium Brown',
    category: 'brown',
    hex: '#4E3524',
    variantImage: '/images/hair/variants/mocha.jpg',
    undertone: 'Natural Hazelnut',
    description: 'Classic hazelnut brown flattering all olive and neutral complexions.',
    formula: 'Level 5.0 Golden Hazelnut Brown',
    service: 'full-colour'
  },

  // =========================================================================
  // 3. BLONDE CATEGORY (Includes Honey Blonde, Platinum, Golden, Champagne, Icy)
  // =========================================================================
  {
    id: 'honey-blonde',
    name: 'Honey Blonde',
    category: 'blonde',
    hex: '#C99E5A',
    variantImage: '/images/hair/variants/honey-blonde.jpg',
    undertone: 'Warm Golden Nectar',
    description: 'Sun-drenched golden honey tone that radiates warmth and dimension.',
    formula: 'Level 8.3 Acacia Honey Gloss',
    service: 'highlights'
  },
  {
    id: 'platinum',
    name: 'Platinum',
    category: 'blonde',
    hex: '#E8E3D7',
    variantImage: '/images/hair/variants/platinum.jpg',
    undertone: 'Clean High-Lift Pale',
    description: 'Maximum brightness clean pale platinum with icy luster.',
    formula: 'Level 10.0 High-Lift Platinum Bath',
    service: 'highlights'
  },
  {
    id: 'golden-blonde',
    name: 'Golden Blonde',
    category: 'blonde',
    hex: '#D8AA56',
    variantImage: '/images/hair/variants/honey-blonde.jpg',
    undertone: 'Radiant Amber Gold',
    description: 'Bright California golden ribbons with luminous sparkle.',
    formula: 'Level 9.3 Golden Sunlight Balayage',
    service: 'highlights'
  },
  {
    id: 'champagne-blonde',
    name: 'Champagne Blonde',
    category: 'blonde',
    hex: '#D9C5A0',
    variantImage: '/images/hair/variants/honey-blonde.jpg',
    undertone: 'Effervescent Pearl',
    description: 'Pale shimmering blonde with soft peach-pearl undertones.',
    formula: 'Level 9.13 Vintage Champagne Glaze',
    service: 'noor-balayage'
  },
  {
    id: 'icy-blonde',
    name: 'Icy Blonde',
    category: 'blonde',
    hex: '#F2F0ED',
    variantImage: '/images/hair/variants/platinum.jpg',
    undertone: 'Arctic Frost',
    description: 'Crisp, frosty blonde with an almost white mirror finish.',
    formula: 'Level 10.12 Glacier Cool Neutralizer',
    service: 'highlights'
  },
  {
    id: 'beige-blonde',
    name: 'Beige Blonde',
    category: 'blonde',
    hex: '#BBA178',
    variantImage: '/images/hair/variants/honey-blonde.jpg',
    undertone: 'Neutral Sand',
    description: 'Balanced sandy beige that is neither brassy nor overly ashy.',
    formula: 'Level 8.13 Parisian Sand Beige',
    service: 'highlights'
  },

  // =========================================================================
  // 4. RED CATEGORY (Includes Copper, Auburn, Burgundy, Cherry Red, Wine Red)
  // =========================================================================
  {
    id: 'copper',
    name: 'Copper',
    category: 'red',
    hex: '#B85226',
    variantImage: '/images/hair/variants/copper.jpg',
    undertone: 'Pure Tangerine Amber',
    description: 'High-voltage copper with luminous orange-gold reflections.',
    formula: 'Level 7.40 Chromatic Irish Copper',
    service: 'full-colour'
  },
  {
    id: 'auburn',
    name: 'Auburn',
    category: 'red',
    hex: '#7A2C18',
    variantImage: '/images/hair/variants/auburn.jpg',
    undertone: 'Deep Autumn Leaf',
    description: 'Classic velvety red-brown inspired by rich autumn foliage.',
    formula: 'Level 5.46 Deep Crimson Auburn',
    service: 'full-colour'
  },
  {
    id: 'burgundy',
    name: 'Burgundy',
    category: 'red',
    hex: '#521524',
    variantImage: '/images/hair/variants/burgundy.jpg',
    undertone: 'Deep Plum Ruby',
    description: 'Sophisticated wine burgundy that glows intensely in light.',
    formula: 'Level 4.26 Bordeaux Wine Velvet',
    service: 'full-colour'
  },
  {
    id: 'cherry-red',
    name: 'Cherry Red',
    category: 'red',
    hex: '#78121E',
    variantImage: '/images/hair/variants/burgundy.jpg',
    undertone: 'Vibrant Bing Cherry',
    description: 'Intense chromatic red with pure ruby depth and zero orange fade.',
    formula: 'Level 5.66 Ripe Bing Cherry Glaze',
    service: 'full-colour'
  },
  {
    id: 'wine-red',
    name: 'Wine Red',
    category: 'red',
    hex: '#641626',
    variantImage: '/images/hair/variants/burgundy.jpg',
    undertone: 'Cabernet Red',
    description: 'Opulent deep red with dark blackberry and garnet undertones.',
    formula: 'Level 4.62 Vintage Cabernet Glaze',
    service: 'full-colour'
  },
  {
    id: 'light-copper',
    name: 'Light Copper',
    category: 'red',
    hex: '#D06E39',
    variantImage: '/images/hair/variants/copper.jpg',
    undertone: 'Spiced Apricot',
    description: 'Soft, airy copper with peach undertones that shimmer in sunlight.',
    formula: 'Level 8.4 Spiced Apricot Glaze',
    service: 'full-colour'
  },

  // =========================================================================
  // 5. FASHION CATEGORY (Includes Pink, Purple, Blue, Silver, Pastel Pink, etc.)
  // =========================================================================
  {
    id: 'pink',
    name: 'Pink',
    category: 'fashion',
    hex: '#E5A8BA',
    variantImage: '/images/hair/variants/pink.jpg',
    undertone: 'Blush Rosewater',
    description: 'Romantic soft pastel pink with glowing petal undertones.',
    formula: 'Level 10.45 Sakura Blossom Tint',
    service: 'highlights'
  },
  {
    id: 'purple',
    name: 'Purple',
    category: 'fashion',
    hex: '#682A7C',
    variantImage: '/images/hair/variants/purple.jpg',
    undertone: 'Royal Amethyst',
    description: 'Rich royal amethyst purple shimmering under bright light.',
    formula: 'Level 5.22 Velvet Amethyst Direct Dye',
    service: 'full-colour'
  },
  {
    id: 'blue',
    name: 'Blue',
    category: 'fashion',
    hex: '#1D2A4F',
    variantImage: '/images/hair/variants/blue.jpg',
    undertone: 'Deep Sapphire',
    description: 'Inky sapphire blue revealing luminous cobalt highlights.',
    formula: 'Level 2.11 Midnight Navy Cobalt',
    service: 'full-colour'
  },
  {
    id: 'silver',
    name: 'Silver',
    category: 'fashion',
    hex: '#A8B0B8',
    variantImage: '/images/hair/variants/silver.jpg',
    undertone: 'Sterling Silver',
    description: 'Pure metallic silver with cool platinum reflections.',
    formula: 'Level 10.11 Pure Sterling Toner',
    service: 'highlights'
  },
  {
    id: 'lavender',
    name: 'Lavender',
    category: 'fashion',
    hex: '#9D8EB9',
    variantImage: '/images/hair/variants/purple.jpg',
    undertone: 'Pastel Lilac Smoke',
    description: 'Dreamy pastel purple that softens into luminous platinum.',
    formula: 'Level 10.22 Frosted Lavender Elixir',
    service: 'highlights'
  },
  {
    id: 'deep-purple',
    name: 'Deep Purple',
    category: 'fashion',
    hex: '#3B1854',
    variantImage: '/images/hair/variants/purple.jpg',
    undertone: 'Midnight Aubergine',
    description: 'Mysterious midnight plum purple on the edge of black.',
    formula: 'Level 3.20 Midnight Aubergine',
    service: 'full-colour'
  },
  {
    id: 'navy-blue',
    name: 'Navy Blue',
    category: 'fashion',
    hex: '#19233C',
    variantImage: '/images/hair/variants/blue.jpg',
    undertone: 'Midnight Blue',
    description: 'Dark, velvety indigo navy with subtle blue shimmer.',
    formula: 'Level 2.1 Midnight Navy Indigo',
    service: 'full-colour'
  },

  // =========================================================================
  // 6. BALAYAGE CATEGORY (Dimensional hand-painted blends)
  // =========================================================================
  {
    id: 'caramel-balayage',
    name: 'Caramel Balayage',
    category: 'balayage',
    hex: '#B47D48',
    variantImage: '/images/hair/variants/caramel.jpg',
    isDimensional: true,
    rootHex: '#3A2419',
    undertone: 'Molten Butterscotch',
    description: 'Dark chocolate roots melting seamlessly into creamy caramel ribbons.',
    formula: 'Root Shadow 4.0 + Balayage 8.34 Caramel Glaze',
    service: 'noor-balayage'
  },
  {
    id: 'honey-balayage',
    name: 'Honey Balayage',
    category: 'balayage',
    hex: '#C89B53',
    variantImage: '/images/hair/variants/honey-blonde.jpg',
    isDimensional: true,
    rootHex: '#2D1E16',
    undertone: 'Golden Honey Ribbons',
    description: 'Hand-painted sunlit honey ribbons over a deep hazelnut base.',
    formula: 'Root Shadow 4.3 + High-Toned 9.3 Honey Glaze',
    service: 'noor-balayage'
  },
  {
    id: 'mocha-balayage',
    name: 'Mocha Balayage',
    category: 'balayage',
    hex: '#5A3D2A',
    variantImage: '/images/hair/variants/mocha.jpg',
    isDimensional: true,
    rootHex: '#241710',
    undertone: 'Velvet Cafe Melt',
    description: 'Rich dark espresso root fading into soft creamy mocha lengths.',
    formula: 'Root Shadow 3.0 + Mid-Length 5.8 Mocha Toner',
    service: 'noor-balayage'
  },
  {
    id: 'copper-balayage',
    name: 'Copper Balayage',
    category: 'balayage',
    hex: '#B85C30',
    variantImage: '/images/hair/variants/copper.jpg',
    isDimensional: true,
    rootHex: '#32180F',
    undertone: 'Fiery Amber Melt',
    description: 'Vibrant amber and copper ribbons dancing across deep chestnut hair.',
    formula: 'Level 7.44 Fiery Sunset Balayage',
    service: 'noor-balayage'
  },
  {
    id: 'ash-balayage',
    name: 'Ash Balayage',
    category: 'balayage',
    hex: '#968C81',
    variantImage: '/images/hair/variants/ash-brown.jpg',
    isDimensional: true,
    rootHex: '#2C2622',
    undertone: 'Smokey Mushroom Melt',
    description: 'Cool graphite shadow root fading into smoky silver-blonde ends.',
    formula: 'Root Shadow 3.1 + Mid-Tone 8.1 Ash Toner',
    service: 'noor-balayage'
  },
  {
    id: 'chocolate-balayage',
    name: 'Chocolate Balayage',
    category: 'balayage',
    hex: '#4E2E1E',
    variantImage: '/images/hair/variants/chocolate-brown.jpg',
    isDimensional: true,
    rootHex: '#1F120B',
    undertone: 'Deep Truffle Ribbons',
    description: 'Subtle espresso root with hazelnut and milk chocolate ribbons.',
    formula: 'Root Shadow 3.0 + Ribbon 5.35 Belgian Brown',
    service: 'noor-balayage'
  },

  // =========================================================================
  // 7. HIGHLIGHTS CATEGORY (Precision woven foils & face-framing ribbons)
  // =========================================================================
  {
    id: 'honey-highlights',
    name: 'Honey Highlights',
    category: 'highlights',
    hex: '#C29B63',
    variantImage: '/images/hair/variants/honey-blonde.jpg',
    isDimensional: true,
    rootHex: '#38261C',
    undertone: 'Sunlit Honey Foils',
    description: 'Woven honey ribbons throughout the hair for instant brightness.',
    formula: 'Crown Foil 9.3 + Lived-in Base Root Tap',
    service: 'highlights'
  },
  {
    id: 'platinum-highlights',
    name: 'Platinum Highlights',
    category: 'highlights',
    hex: '#DAC397',
    variantImage: '/images/hair/variants/platinum.jpg',
    isDimensional: true,
    rootHex: '#423326',
    undertone: 'Icy Platinum Foils',
    description: 'Micro-woven platinum foils delivering high contrast and radiance.',
    formula: 'Micro-Weave 10.0 + Translucent Champagne Bath',
    service: 'highlights'
  },
  {
    id: 'caramel-highlights',
    name: 'Caramel Highlights',
    category: 'highlights',
    hex: '#D5A754',
    variantImage: '/images/hair/variants/caramel.jpg',
    isDimensional: true,
    rootHex: '#3A271C',
    undertone: 'Gilded Amber Ribbons',
    description: 'Warm luminous caramel foils creating rich contrast against brunette.',
    formula: 'Level 8.34 Pure Caramel Foiling',
    service: 'highlights'
  },
  {
    id: 'silver-highlights',
    name: 'Silver Highlights',
    category: 'highlights',
    hex: '#B0A89E',
    variantImage: '/images/hair/variants/silver.jpg',
    isDimensional: true,
    rootHex: '#2A2420',
    undertone: 'Crisp Silver Strands',
    description: 'Neutral cool silver highlights woven through a deep brunette base.',
    formula: 'Level 9.12 Violet-Silver Multi-Weave',
    service: 'highlights'
  },
  {
    id: 'ash-highlights',
    name: 'Ash Highlights',
    category: 'highlights',
    hex: '#4A423D',
    variantImage: '/images/hair/variants/ash-brown.jpg',
    isDimensional: true,
    rootHex: '#26201D',
    undertone: 'Smokey Ash Ribbons',
    description: 'Cool toned ash highlights neutralizing warmth for an editorial look.',
    formula: 'Level 6.1 Cool Smoke Foil Weave',
    service: 'highlights'
  },
  {
    id: 'copper-highlights',
    name: 'Copper Highlights',
    category: 'highlights',
    hex: '#B85226',
    variantImage: '/images/hair/variants/copper.jpg',
    isDimensional: true,
    rootHex: '#351B12',
    undertone: 'Amber Spark Ribbons',
    description: 'Vibrant amber and copper highlights dancing through medium hair.',
    formula: 'Level 7.44 Fiery Sunset Foil Placement',
    service: 'highlights'
  }
];

export const HAIR_FINISHES = [
  { id: 'gloss', label: 'Luminous Gloss', opacity: 0.85, blendMode: 'color', filter: 'brightness(1.05) contrast(1.02)' },
  { id: 'matte', label: 'Velvet Matte', opacity: 0.75, blendMode: 'multiply', filter: 'contrast(0.95) saturate(1.1)' },
  { id: 'metallic', label: 'Metallic Sheen', opacity: 0.90, blendMode: 'overlay', filter: 'brightness(1.1) contrast(1.15)' },
  { id: 'dimensional', label: 'Sunkissed Balayage', opacity: 0.80, blendMode: 'soft-light', filter: 'contrast(1.08)' }
];
