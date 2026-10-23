// GLAM GIRL BY JANKI — Seasonal Nail Art Collections Data

export const SEASONS_CONFIG = [
  {
    id: 'spring',
    name: 'Spring Florals',
    tagline: 'Fresh, elegant, soft, and romantic botanical blooms',
    badge: '🌸 SPRING COUTURE',
    accentColor: '#E8A7A1',
    description: 'Delicate cherry blossoms, hand-painted daisies, pastel tulips, and sheer French tips inspired by springtime gardens in full bloom.'
  },
  {
    id: 'summer',
    name: 'Summer Brights',
    tagline: 'Bold, playful, bright, and energetic vacation motifs',
    badge: '☀️ SUMMER VIBRANCE',
    accentColor: '#F59E0B',
    description: 'High-voltage sunset corals, turquoise ocean waves, playful citrus slices, and neon French smile lines for sun-drenched days.'
  },
  {
    id: 'autumn',
    name: 'Autumn Textures',
    tagline: 'Warm, sophisticated, rich, and cozy tactile effects',
    badge: '🍂 AUTUMN TEXTURES',
    accentColor: '#881337',
    description: 'Deep terracotta, amber tortoiseshell glass, cashmere velvet ripples, and falling leaf veining in cozy earthy hues.'
  },
  {
    id: 'winter',
    name: 'Winter-Inspired',
    tagline: 'Icy, glamorous, festive, and luxurious crystal couture',
    badge: '❄️ WINTER GLAMOUR',
    accentColor: '#3B82F6',
    description: 'Frosted snowflake filigree, liquid silver chrome, emerald velvet cat-eye, and Swarovski bezel crystal accents.'
  }
];

export const SEASONAL_NAIL_COLLECTIONS = [
  // =========================================================================
  // 1. SPRING FLORALS (4 DESIGNS)
  // =========================================================================
  {
    id: 'spring-cherry-blossom',
    seasonId: 'spring',
    seasonName: 'Spring Florals',
    name: 'Cherry Blossom French',
    subtitle: 'Blush Sakura Petals & Micro-Pearls',
    description: 'Translucent sheer pink base with soft white French smile lines adorned with hand-painted Japanese cherry blossoms and miniature dewdrops.',
    image: '/images/nails/seasonal/spring-cherry-blossom.jpg',
    category: 'Botanical French',
    technique: 'Japanese ultra-fine liner brushwork & micro-bead placement',
    suggestedShapes: 'Almond, Oval, Squoval',
    finish: 'Glossy Diamond Topcoat',
    palette: [
      { name: 'Soft Sakura', hex: '#FBCFE8' },
      { name: 'Milky Sheer', hex: '#FDF2F8' },
      { name: 'Sage Leaf', hex: '#A8B5A0' },
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    aftercare: 'Apply organic jojoba cuticle oil daily to nourish natural nail bed and protect fine hand-painted petals.',
    preset: {
      shapeId: 'almond',
      colorId: 'soft-pink',
      finishId: 'glossy',
      artId: 'floral',
      artisanNote: 'Hand-painted Sakura cherry blossom petals and delicate floral branch accents.'
    }
  },
  {
    id: 'spring-daisy-meadow',
    seasonId: 'spring',
    seasonName: 'Spring Florals',
    name: 'Pastel Daisy Meadow',
    subtitle: 'Real Encapsulated Flora & Butter Yellow',
    description: 'Genuine dried meadow wildflowers and miniature daisies encapsulated in crystal builder gel over a sheer milky foundation.',
    image: '/images/nails/seasonal/spring-daisy-meadow.jpg',
    category: 'Encapsulated Floral',
    technique: 'Real pressed botanical encapsulation in BIAB structured gel',
    suggestedShapes: 'Almond, Coffin, Oval',
    finish: 'Glossy Glass Apex',
    palette: [
      { name: 'Buttercup', hex: '#FEF08A' },
      { name: 'Milky White', hex: '#F3F4F6' },
      { name: 'Mint Meadow', hex: '#A7F3D0' },
      { name: 'Petal Lilac', hex: '#E9D5FF' }
    ],
    aftercare: 'Gentle hand washing with moisturizing soap; builder gel keeps encapsulated flora sealed for 4+ weeks.',
    preset: {
      shapeId: 'almond',
      colorId: 'milky-white',
      finishId: 'glossy',
      artId: 'floral',
      artisanNote: 'Real botanical meadow wildflower encapsulation sealed with crystal apex builder gel.'
    }
  },
  {
    id: 'spring-lavender-botanical',
    seasonId: 'spring',
    seasonName: 'Spring Florals',
    name: 'Lavender Botanical Flora',
    subtitle: '3D Sculpted Petals & Lilac Mist',
    description: 'Dimensional sculpted porcelain lilac petals with crystal rhinestone cores on an ethereal lavender mist ombre canvas.',
    image: '/images/nails/seasonal/spring-lavender-botanical.jpg',
    category: '3D Sculpted Floral',
    technique: '3D acrylic paste petal sculpting & crystal setting',
    suggestedShapes: 'Almond, Stiletto, Coffin',
    finish: 'Velvet Satin & Glossy Petals',
    palette: [
      { name: 'Lavender Mist', hex: '#B8A9C9' },
      { name: 'Pale Violet', hex: '#DDD6FE' },
      { name: 'Forest Moss', hex: '#263D2B' },
      { name: 'Dewdrop Clear', hex: '#F8FAFC' }
    ],
    aftercare: 'Avoid using sculpted nails to open cans; wear cotton-lined gloves for household tasks.',
    preset: {
      shapeId: 'almond',
      colorId: 'lavender',
      finishId: 'velvet',
      artId: 'floral',
      artisanNote: 'Sculpted 3D porcelain lavender petals with crystal rhinestone cores.'
    }
  },
  {
    id: 'spring-mint-tulip',
    seasonId: 'spring',
    seasonName: 'Spring Florals',
    name: 'Mint Dewdrop Tulip',
    subtitle: 'Soft Pistachio Aura & Micro-Line Art',
    description: 'Radiant pistachio mint aura center fading into milky quartz borders with delicate fine-line tulip silhouettes and dewdrops.',
    image: '/images/nails/seasonal/spring-mint-tulip.jpg',
    category: 'Spring Aura',
    technique: 'Airbrush pigment diffusion with high-precision liner art',
    suggestedShapes: 'Oval, Almond, Squoval',
    finish: 'Glossy High-Beam',
    palette: [
      { name: 'Pistachio Mint', hex: '#A7F3D0' },
      { name: 'Blush Cream', hex: '#FDF2F8' },
      { name: 'Olive Vine', hex: '#465640' },
      { name: 'Pearl Sheen', hex: '#FFFFFF' }
    ],
    aftercare: 'Reapply topcoat after 2 weeks if requested; keep cuticles hydrated with our atelier serum.',
    preset: {
      shapeId: 'oval',
      colorId: 'milky-white',
      finishId: 'glossy',
      artId: 'aura',
      artisanNote: 'Pastel mint aura glow with fine-line floral tulip silhouettes.'
    }
  },

  // =========================================================================
  // 2. SUMMER BRIGHTS (4 DESIGNS)
  // =========================================================================
  {
    id: 'summer-coral-swirls',
    seasonId: 'summer',
    seasonName: 'Summer Brights',
    name: 'Sunset Coral Swirls',
    subtitle: 'Vibrant Peach, Melon & Tangerine Waves',
    description: 'Multi-toned swirling ribbons of neon coral, sunny papaya, and warm peach dancing across a sheer negative-space nail plate.',
    image: '/images/nails/seasonal/summer-coral-swirls.jpg',
    category: 'Vibrant Abstract',
    technique: 'Multi-layer Japanese pigment drag & negative-space balance',
    suggestedShapes: 'Coffin, Almond, Square',
    finish: 'High-Gloss Glass',
    palette: [
      { name: 'Neon Coral', hex: '#FB7185' },
      { name: 'Papaya Orange', hex: '#F97316' },
      { name: 'Sunny Lemon', hex: '#FACC15' },
      { name: 'Nude Base', hex: '#D4B89C' }
    ],
    aftercare: 'HEMA-free gel prevents UV yellowing during sunny beach trips; rinse after chlorine exposure.',
    preset: {
      shapeId: 'coffin',
      colorId: 'classic-red',
      finishId: 'glossy',
      artId: 'abstract',
      artisanNote: 'High-energy multi-color sunset coral swirls with negative-space accents.'
    }
  },
  {
    id: 'summer-turquoise-wave',
    seasonId: 'summer',
    seasonName: 'Summer Brights',
    name: 'Turquoise Ocean Wave',
    subtitle: 'Mediterranean Cobalt & Seafoam Foam',
    description: 'Swirling layers of electric turquoise, deep cerulean, and pearlescent seafoam mimicking the sunlight on Mediterranean ocean waves.',
    image: '/images/nails/seasonal/summer-turquoise-wave.jpg',
    category: 'Oceanic Couture',
    technique: 'Blooming gel watercolor diffusion with gold-free chrome foil',
    suggestedShapes: 'Stiletto, Coffin, Almond',
    finish: 'Glossy Chrome Sheen',
    palette: [
      { name: 'Aqua Turquoise', hex: '#06B6D4' },
      { name: 'Royal Cobalt', hex: '#1D4ED8' },
      { name: 'Seafoam Foam', hex: '#6EE7B7' },
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    aftercare: 'Waterproof medical-grade gel formula ensures durability during swimming and watersports.',
    preset: {
      shapeId: 'stiletto',
      colorId: 'forest-green',
      finishId: 'chrome',
      artId: 'marble',
      artisanNote: 'Layered Mediterranean ocean wave blooming effects with pearlescent seafoam.'
    }
  },
  {
    id: 'summer-tropical-citrus',
    seasonId: 'summer',
    seasonName: 'Summer Brights',
    name: 'Tropical Citrus Splash',
    subtitle: 'Grapefruit & Lime Micro-Details',
    description: 'Juicy micro-citrus slice hand paintings paired with zesty lime French smile lines and bright tropical foliage accents.',
    image: '/images/nails/seasonal/summer-tropical-citrus.jpg',
    category: 'Playful Summer Art',
    technique: 'Micro-illustrative fruit brushwork with raised dewdrop gel',
    suggestedShapes: 'Square, Squoval, Round',
    finish: 'Glossy Glass with 3D Drops',
    palette: [
      { name: 'Grapefruit Pink', hex: '#F43F5E' },
      { name: 'Lime Zest', hex: '#84CC16' },
      { name: 'Sunburst Gold', hex: '#EAB308' },
      { name: 'Milky White', hex: '#F3F4F6' }
    ],
    aftercare: 'Keep hands protected with sunscreen; our diamond seal prevents color fading under UV light.',
    preset: {
      shapeId: 'square',
      colorId: 'soft-pink',
      finishId: 'glossy',
      artId: 'geometric',
      artisanNote: 'Vivid summer tropical citrus illustrations with tactile 3D clear water droplets.'
    }
  },
  {
    id: 'summer-neon-fuchsia',
    seasonId: 'summer',
    seasonName: 'Summer Brights',
    name: 'Neon Fuchsia French',
    subtitle: 'Hot Magenta Tips & Silver Foil Stars',
    description: 'Electric hot magenta French smile curves accented by fine-line silver foil stars and a clean milky quartz base.',
    image: '/images/nails/seasonal/summer-neon-fuchsia.jpg',
    category: 'Neon French',
    technique: 'Precision deep French smile painting with foil transfer',
    suggestedShapes: 'Almond, Coffin, Stiletto',
    finish: 'Glossy High-Mirror',
    palette: [
      { name: 'Hot Fuchsia', hex: '#D946EF' },
      { name: 'Electric Pink', hex: '#EC4899' },
      { name: 'Silver Foil', hex: '#E2E8F0' },
      { name: 'Quartz Nude', hex: '#D4B89C' }
    ],
    aftercare: 'High-flexibility rubber base prevents chipping during outdoor summer activities.',
    preset: {
      shapeId: 'almond',
      colorId: 'classic-red',
      finishId: 'glossy',
      artId: 'french',
      artisanNote: 'High-voltage neon fuchsia French smile curves with delicate metallic stars.'
    }
  },

  // =========================================================================
  // 3. AUTUMN TEXTURES (4 DESIGNS)
  // =========================================================================
  {
    id: 'autumn-tortoiseshell',
    seasonId: 'autumn',
    seasonName: 'Autumn Textures',
    name: 'Amber Tortoiseshell Couture',
    subtitle: 'Layered Glass Amber & Smoked Obsidian',
    description: 'Iconic autumnal tortoiseshell pattern crafted by layering sheer jelly amber, burnt caramel, and deep obsidian brown with gold foil.',
    image: '/images/nails/seasonal/autumn-tortoiseshell.jpg',
    category: 'Jelly Tortoiseshell',
    technique: 'Multi-tier glass gel layering & fluid ink blending',
    suggestedShapes: 'Almond, Coffin, Oval',
    finish: 'Ultra-Glossy Jelly Glass',
    palette: [
      { name: 'Amber Caramel', hex: '#B45309' },
      { name: 'Smoked Obsidian', hex: '#292524' },
      { name: 'Rich Ochre', hex: '#D97706' },
      { name: 'Warm Terracotta', hex: '#9A3412' }
    ],
    aftercare: 'Nourish with botanical almond oil daily to accentuate depth and glass-like clarity.',
    preset: {
      shapeId: 'almond',
      colorId: 'chocolate-brown',
      finishId: 'glossy',
      artId: 'marble',
      artisanNote: 'Multi-layer glass amber tortoiseshell with warm caramel depth.'
    }
  },
  {
    id: 'autumn-terracotta-velvet',
    seasonId: 'autumn',
    seasonName: 'Autumn Textures',
    name: 'Velvet Terracotta Swirl',
    subtitle: 'Textured Ripples & Cashmere Matte',
    description: 'Warm burnt terracotta and spiced cinnamon polish featuring 3D dimensional ribbed textures and cashmere matte contrasts.',
    image: '/images/nails/seasonal/autumn-terracotta-velvet.jpg',
    category: 'Dimensional Texture',
    technique: 'High-viscosity embossing gel & micro-ribbing brush',
    suggestedShapes: 'Almond, Square, Squoval',
    finish: 'Cashmere Matte & Glossy Ribs',
    palette: [
      { name: 'Terracotta', hex: '#C2410C' },
      { name: 'Spiced Cinnamon', hex: '#7C2D12' },
      { name: 'Cozy Nude', hex: '#D4B89C' },
      { name: 'Olive Moss', hex: '#465640' }
    ],
    aftercare: 'Matte finishes love a quick rub with alcohol wipe if skin oils slightly reduce velvety texture.',
    preset: {
      shapeId: 'almond',
      colorId: 'burgundy',
      finishId: 'matte',
      artId: 'textured',
      artisanNote: 'Raised dimensional terracotta ripples with contrasting matte finish.'
    }
  },
  {
    id: 'autumn-burgundy-leaf',
    seasonId: 'autumn',
    seasonName: 'Autumn Textures',
    name: 'Spiced Burgundy Foliage',
    subtitle: 'Royal Wine & Hand-Painted Leaves',
    description: 'Deep royal burgundy wine foundation with delicate autumnal maple leaf veining, burnt orange accents, and gold-free chrome foil.',
    image: '/images/nails/seasonal/autumn-burgundy-leaf.jpg',
    category: 'Autumn Leaves',
    technique: 'Intricate botanical skeleton leaf painting with foil transfer',
    suggestedShapes: 'Oval, Almond, Coffin',
    finish: 'High-Gloss Diamond',
    palette: [
      { name: 'Royal Burgundy', hex: '#6B1D2F' },
      { name: 'Burnt Ochre', hex: '#B45309' },
      { name: 'Espresso', hex: '#4A2E1B' },
      { name: 'Chrome Silver', hex: '#CBD5E1' }
    ],
    aftercare: 'Gentle cuticle care maintains rich wine luster through chilly fall weather.',
    preset: {
      shapeId: 'oval',
      colorId: 'burgundy',
      finishId: 'glossy',
      artId: 'floral',
      artisanNote: 'Deep spiced burgundy with hand-painted autumn leaf veining.'
    }
  },
  {
    id: 'autumn-olive-marble',
    seasonId: 'autumn',
    seasonName: 'Autumn Textures',
    name: 'Olive Cashmere Marble',
    subtitle: 'Signature Forest Green & Carrara Veins',
    description: 'Muted olive and salon forest green blended into smoky white marble veins with subtle silver metallic pinstripes.',
    image: '/images/nails/seasonal/autumn-olive-marble.jpg',
    category: 'Earthy Marble',
    technique: 'Wet-on-wet gel marble dragging with alcohol dispersion',
    suggestedShapes: 'Squoval, Almond, Coffin',
    finish: 'Velvet Satin Finish',
    palette: [
      { name: 'Salon Forest', hex: '#263D2B' },
      { name: 'Olive Drab', hex: '#465640' },
      { name: 'Carrara White', hex: '#F3F4F6' },
      { name: 'Sage Green', hex: '#A8B5A0' }
    ],
    aftercare: 'Moisturize cuticles daily to preserve the velvety smoothness of the cashmere finish.',
    preset: {
      shapeId: 'squoval',
      colorId: 'forest-green',
      finishId: 'velvet',
      artId: 'marble',
      artisanNote: 'Earthy olive and forest green marble veining with satin texture.'
    }
  },

  // =========================================================================
  // 4. WINTER-INSPIRED DESIGNS (4 DESIGNS)
  // =========================================================================
  {
    id: 'winter-icy-snowflake',
    seasonId: 'winter',
    seasonName: 'Winter-Inspired',
    name: 'Frosted Icy Snowflake',
    subtitle: 'Micro-Crystal Lace & Silver Dust',
    description: 'Ethereal sheer quartz base dusted with holographic diamond snow and delicate hand-painted crystal snowflake starbursts.',
    image: '/images/nails/seasonal/winter-icy-snowflake.jpg',
    category: 'Frosted Holiday Art',
    technique: 'Intricate needle-liner snowflake geometry with sugar glitter',
    suggestedShapes: 'Almond, Stiletto, Coffin',
    finish: 'Sugar Sparkle & High Gloss',
    palette: [
      { name: 'Icy White', hex: '#F8FAFC' },
      { name: 'Glacial Silver', hex: '#E2E8F0' },
      { name: 'Diamond Sparkle', hex: '#FFFFFF' },
      { name: 'Pale Frost Blue', hex: '#E0F2FE' }
    ],
    aftercare: 'Sugar glitter texture is cured and hard-sealed, avoiding snagging on winter knitwear.',
    preset: {
      shapeId: 'almond',
      colorId: 'milky-white',
      finishId: 'glossy',
      artId: 'glitter',
      artisanNote: 'Hand-painted icy snowflake filigree dusted with diamond sugar crystals.'
    }
  },
  {
    id: 'winter-emerald-cat-eye',
    seasonId: 'winter',
    seasonName: 'Winter-Inspired',
    name: 'Emerald Velvet Cat-Eye',
    subtitle: 'Deep Malachite & Diagonal Starlight',
    description: 'Rich salon emerald green infused with micronized magnetic pearls manipulated into a sharp diagonal starlight beam.',
    image: '/images/nails/seasonal/winter-emerald-cat-eye.jpg',
    category: 'Magnetic Velvet',
    technique: 'Neodymium magnet bar manipulation & Russian dry prep',
    suggestedShapes: 'Almond, Coffin, Oval',
    finish: 'Velvet Cat-Eye Reflection',
    palette: [
      { name: 'Deep Malachite', hex: '#062618' },
      { name: 'Emerald Beam', hex: '#34D399' },
      { name: 'Atelier Forest', hex: '#263D2B' },
      { name: 'Starlight Core', hex: '#D1FAE5' }
    ],
    aftercare: 'Cat-eye depth intensifies under indoor holiday chandelier lighting; hydrate with vitamin E oil.',
    preset: {
      shapeId: 'almond',
      colorId: 'forest-green',
      finishId: 'chrome',
      artId: 'cat-eye',
      artisanNote: 'Deep malachite magnetic cat-eye with diagonal starlight beam.'
    }
  },
  {
    id: 'winter-crystal-french',
    seasonId: 'winter',
    seasonName: 'Winter-Inspired',
    name: 'Black Tie Crystal French',
    subtitle: 'Square Obsidian & Swarovski Bezel',
    description: 'Sleek black-tie French manicure featuring crisp atelier black smile tips and a dazzling Swarovski crystal band across the apex.',
    image: '/images/nails/seasonal/winter-crystal-french.jpg',
    category: 'Couture Crystal French',
    technique: 'Precision French smile sculpting & jewel adhesive setting',
    suggestedShapes: 'Square, Coffin, Almond',
    finish: 'High-Gloss Diamond Mirror',
    palette: [
      { name: 'Atelier Black', hex: '#10110F' },
      { name: 'Swarovski Crystal', hex: '#FFFFFF' },
      { name: 'Liquid Silver', hex: '#CBD5E1' },
      { name: 'Clean Nude', hex: '#D4B89C' }
    ],
    aftercare: 'Crystals are encased in jewelry-grade resin to ensure zero snagging during winter gala events.',
    preset: {
      shapeId: 'square',
      colorId: 'black',
      finishId: 'glossy',
      artId: 'french',
      artisanNote: 'Atelier black French smile curves with Swarovski bezel crystal cluster.'
    }
  },
  {
    id: 'winter-silver-chrome',
    seasonId: 'winter',
    seasonName: 'Winter-Inspired',
    name: 'Midnight Silver Chrome',
    subtitle: 'Liquid Mercury Mirror & Hologram',
    description: 'Ultra-reflective burnished platinum chrome powder buffed over a midnight black foundation for a mirror liquid-mercury finish.',
    image: '/images/nails/seasonal/winter-silver-chrome.jpg',
    category: 'Liquid Chrome',
    technique: 'Zero-grain chrome powder buffing & non-wipe gel seal',
    suggestedShapes: 'Stiletto, Coffin, Square',
    finish: 'Mirror Molten Chrome',
    palette: [
      { name: 'Liquid Mercury', hex: '#CBD5E1' },
      { name: 'Smoked Platinum', hex: '#94A3B8' },
      { name: 'Atelier Black', hex: '#10110F' },
      { name: 'Pure White Specular', hex: '#FFFFFF' }
    ],
    aftercare: 'Wipe with microfiber cloth to remove fingerprints and restore high-wattage mirror shine.',
    preset: {
      shapeId: 'stiletto',
      colorId: 'black',
      finishId: 'chrome',
      artId: 'chrome',
      artisanNote: 'Burnished liquid silver chrome mirror reflection with midnight base.'
    }
  }
];
