// GLAM GIRL BY JANKI — Curated 16 Master Nail Art Gallery Designs
// Genuine nail art imagery, editorial descriptions, suggested specifications,
// studio presets for the interactive customizer, and official salon service references.

export const GALLERY_CATEGORIES = [
  'All Designs',
  'Minimal',
  'Classic',
  'Glamorous',
  'Bridal',
  'Artistic',
  'Seasonal'
];

export const NAIL_ART_GALLERY = [
  {
    id: 'french-tip-nails',
    name: 'French Tip Nails',
    category: 'Classic',
    subtitle: 'Iconic Parisian smile crescent',
    description: 'Crisp porcelain-white crescent smile lines layered over a translucent sheer blush foundation. Clean, timeless, and effortlessly chic for every occasion.',
    image: '/images/nails/french-manicure.webp',
    suggestedShape: 'Squoval or Almond',
    suggestedColors: 'Sheer Rose Blush & Crystalline Pure White',
    suggestedFinish: 'French Tips / High-Gloss Topcoat',
    preset: {
      shapeId: 'squoval',
      colorId: 'french-manicure',
      finishId: 'french-tips',
      artId: 'none'
    },
    serviceId: 'french-manicure',
    serviceName: 'French Manicure',
    servicePrice: 45,
    serviceDuration: '50 min'
  },
  {
    id: 'floral-nail-art',
    name: 'Floral Nail Art',
    category: 'Artistic',
    subtitle: 'Hand-painted botanical blossoms',
    description: 'Delicate hand-painted jasmine petals, botanical stems, and micro-leaf accents blooming along the cuticle line, sealed under crystalline glass gel.',
    image: '/images/nails/flower-nail-art.jpg',
    suggestedShape: 'Almond or Oval',
    suggestedColors: 'Soft Peony Pink, Sage Foliage & Ivory White',
    suggestedFinish: 'Glossy Gel Seal',
    preset: {
      shapeId: 'almond',
      colorId: 'soft-pink',
      finishId: 'glossy',
      artId: 'floral-art'
    },
    serviceId: 'nail-art-design',
    serviceName: 'Nail Art Design',
    servicePrice: 60,
    serviceDuration: '60 min'
  },
  {
    id: 'chrome-nails',
    name: 'Chrome Nails',
    category: 'Glamorous',
    subtitle: 'Liquid platinum mirror glaze',
    description: 'Pure liquid silver and champagne chrome pigments burnished into cured gel base, producing a seamless high-fashion mirror reflection with zero brush lines.',
    image: '/images/nails/metallic-chrome-nails.jpg',
    suggestedShape: 'Almond or Coffin',
    suggestedColors: 'Mirrored Liquid Silver & Icy Platinum Pearl',
    suggestedFinish: 'Burnished Mirror Chrome',
    preset: {
      shapeId: 'almond',
      colorId: 'milky-white',
      finishId: 'chrome',
      artId: 'none'
    },
    serviceId: 'gel-manicure',
    serviceName: 'Gel Manicure',
    servicePrice: 50,
    serviceDuration: '55 min'
  },
  {
    id: 'glitter-nails',
    name: 'Glitter Nails',
    category: 'Glamorous',
    subtitle: 'Luminous diamond dust cascade',
    description: 'Micro-faceted diamond glitter dust suspended in transparent sculpting builder resin, cascading gracefully from the tip into a luminous starry ombre.',
    image: '/images/nails/bad-romance.jpg',
    suggestedShape: 'Coffin or Stiletto',
    suggestedColors: 'Atelier Black with Magenta & Diamond Shimmer',
    suggestedFinish: 'High-Density Glitter Glaze',
    preset: {
      shapeId: 'coffin',
      colorId: 'black',
      finishId: 'glitter',
      artId: 'glitter-accent'
    },
    serviceId: 'nail-art-design',
    serviceName: 'Nail Art Design',
    servicePrice: 60,
    serviceDuration: '60 min'
  },
  {
    id: 'cat-eye-nails',
    name: 'Cat-Eye Nails',
    category: 'Glamorous',
    subtitle: 'Dimensional magnetic velvet glow',
    description: 'Rare-earth magnetic shimmer flakes aligned with precision neodymium wands to produce a dynamic, multi-dimensional velvet sheen that moves with the light.',
    image: '/images/nails/cat-eye-nails.jpg',
    suggestedShape: 'Oval or Almond',
    suggestedColors: 'Forest Velvet Emerald & Celestial Silk',
    suggestedFinish: '3D Velvet Magnetic Beam',
    preset: {
      shapeId: 'oval',
      colorId: 'forest-green',
      finishId: 'cat-eye',
      artId: 'none'
    },
    serviceId: 'gel-manicure',
    serviceName: 'Gel Manicure',
    servicePrice: 50,
    serviceDuration: '55 min'
  },
  {
    id: 'ombre-nails',
    name: 'Ombre Nails',
    category: 'Classic',
    subtitle: 'Seamless airbrushed gradient transition',
    description: 'A whisper-soft horizontal fade from natural nude blush to crisp porcelain white, visually elongating fingers and imparting a polished, modern gradient.',
    image: '/images/nails/decoradas-13.jpg',
    suggestedShape: 'Squoval or Oval',
    suggestedColors: 'Nude Almond Beige fading to Milky White',
    suggestedFinish: 'Ultra-Glossy Mirror Coat',
    preset: {
      shapeId: 'squoval',
      colorId: 'nude-beige',
      finishId: 'glossy',
      artId: 'none'
    },
    serviceId: 'gel-manicure',
    serviceName: 'Gel Manicure',
    servicePrice: 50,
    serviceDuration: '55 min'
  },
  {
    id: 'marble-nail-art',
    name: 'Marble Nail Art',
    category: 'Artistic',
    subtitle: 'Natural Carrara quartz mineral veining',
    description: 'Hand-swirled mineral veining with semi-translucent depths, evoking the cool organic luxury of polished Italian Carrara quartz stone.',
    image: '/images/nails/nail-art-design.webp',
    suggestedShape: 'Almond',
    suggestedColors: 'Milky Quartz White, Smokey Charcoal & Soft Pearl',
    suggestedFinish: 'Glossy Stone Polish',
    preset: {
      shapeId: 'almond',
      colorId: 'milky-white',
      finishId: 'glossy',
      artId: 'marble'
    },
    serviceId: 'nail-art-design',
    serviceName: 'Nail Art Design',
    servicePrice: 60,
    serviceDuration: '60 min'
  },
  {
    id: 'minimalist-nail-art',
    name: 'Minimalist Nail Art',
    category: 'Minimal',
    subtitle: 'Understated negative-space linear precision',
    description: 'Precision razor-fine pinstripes, clean negative-space framing, and subtle micro-dots on a bare natural base designed for effortless modern elegance.',
    image: '/images/nails/classic-manicure.webp',
    suggestedShape: 'Square or Oval',
    suggestedColors: 'Clean Nude Foundation with Jet Black Linework',
    suggestedFinish: 'Frosted Matte or Clean Gloss',
    preset: {
      shapeId: 'square',
      colorId: 'nude-beige',
      finishId: 'matte',
      artId: 'minimal-lines'
    },
    serviceId: 'classic-manicure',
    serviceName: 'Classic Manicure',
    servicePrice: 35,
    serviceDuration: '40 min'
  },
  {
    id: 'geometric-nail-art',
    name: 'Geometric Nail Art',
    category: 'Minimal',
    subtitle: 'Architectural angles & chevron symmetry',
    description: 'Sharp diagonal dividers, modern chevron symmetry, and balanced negative-space blocks that create an architectural, structured editorial statement.',
    image: '/images/nails/geometric-stripes.jpg',
    suggestedShape: 'Coffin or Square',
    suggestedColors: 'Forest Green, Deep Charcoal & Bare Negative Space',
    suggestedFinish: 'Silky Velvet Matte',
    preset: {
      shapeId: 'coffin',
      colorId: 'forest-green',
      finishId: 'matte',
      artId: 'geometric'
    },
    serviceId: 'nail-art-design',
    serviceName: 'Nail Art Design',
    servicePrice: 60,
    serviceDuration: '60 min'
  },
  {
    id: 'bridal-nail-art',
    name: 'Bridal Nail Art',
    category: 'Bridal',
    subtitle: 'Couture opalescence & bridal strass crystals',
    description: 'Crafted specifically for ceremony moments. Sheer blushing pearl foundation accented by Swarovski crystal strass and pearl-dust highlights that radiate in wedding photography.',
    image: '/images/nails/bridal-strass.jpg',
    suggestedShape: 'Almond or Oval',
    suggestedColors: 'Luminescent Bridal Pearl & Sheer Blush Rose',
    suggestedFinish: 'Pearl Glow with Crystal Accents',
    preset: {
      shapeId: 'almond',
      colorId: 'soft-pink',
      finishId: 'pearl',
      artId: 'floral-art'
    },
    serviceId: 'nail-art-design',
    serviceName: 'Nail Art Design',
    servicePrice: 60,
    serviceDuration: '60 min'
  },
  {
    id: 'abstract-nail-art',
    name: 'Abstract Nail Art',
    category: 'Artistic',
    subtitle: 'Fluid organic contour brushstrokes',
    description: 'Expressive organic arcs, asymmetrical contour curves, and contemporary earthy palette pairings tailored individually to your personal aesthetic expression.',
    image: '/images/nails/abstract-swirls.jpg',
    suggestedShape: 'Almond or Round',
    suggestedColors: 'Chocolate Brown, Warm Vanilla & Terracotta',
    suggestedFinish: 'Ultra-Glossy Lacquer',
    preset: {
      shapeId: 'almond',
      colorId: 'chocolate-brown',
      finishId: 'glossy',
      artId: 'abstract'
    },
    serviceId: 'nail-art-design',
    serviceName: 'Nail Art Design',
    servicePrice: 60,
    serviceDuration: '60 min'
  },
  {
    id: 'seasonal-nail-art',
    name: 'Seasonal Nail Art',
    category: 'Seasonal',
    subtitle: 'Curated holiday & celebration editions',
    description: 'Seasonal couture transformations, celebrating deep royal burgundy, winter emerald glazes, autumn spices, and radiant festive celebrations with opulent depth.',
    image: '/images/nails/gel-manicure.webp',
    suggestedShape: 'Stiletto or Almond',
    suggestedColors: 'Royal Burgundy, Rich Forest Green & Champagne Shimmer',
    suggestedFinish: 'Chrome & Gloss Hybrid',
    preset: {
      shapeId: 'stiletto',
      colorId: 'burgundy',
      finishId: 'chrome',
      artId: 'minimal-lines'
    },
    serviceId: 'gel-manicure',
    serviceName: 'Gel Manicure',
    servicePrice: 50,
    serviceDuration: '55 min'
  },
  {
    id: '3d-nail-art',
    name: '3D Nail Art',
    category: 'Artistic',
    subtitle: 'Sculpted clear gel droplets & relief motifs',
    description: 'High-viscosity sculpting builder gel crafted into tactile 3D water droplets, raised organic ridges, and embossed relief textures over a crystal-clear glaze.',
    image: '/images/nails/3d-nail-art.jpg',
    suggestedShape: 'Coffin or Almond',
    suggestedColors: 'Crystalline Glass Gel & Milky Sheer Foundation',
    suggestedFinish: 'High-Gloss Dimensional Sculpt',
    preset: {
      shapeId: 'coffin',
      colorId: 'milky-white',
      finishId: 'glossy',
      artId: 'geometric'
    },
    serviceId: 'gel-nail-extensions',
    serviceName: 'Gel Nail Extensions',
    servicePrice: 85,
    serviceDuration: '80 min'
  },
  {
    id: 'aura-nails',
    name: 'Aura Nails',
    category: 'Glamorous',
    subtitle: 'Radial chromatic glow & soft energy center',
    description: 'Airbrushed radial gradient aura with a soft, glowing chromatic core fading delicately into translucent milky edges, evoking an ethereal and radiant energy.',
    image: '/images/nails/aura-nails.jpg',
    suggestedShape: 'Almond',
    suggestedColors: 'Sheer Blush Foundation with Vibrant Sunset Magenta Core',
    suggestedFinish: 'Glossy Glass Finish',
    preset: {
      shapeId: 'almond',
      colorId: 'soft-pink',
      finishId: 'glossy',
      artId: 'abstract'
    },
    serviceId: 'nail-art-design',
    serviceName: 'Nail Art Design',
    servicePrice: 60,
    serviceDuration: '60 min'
  },
  {
    id: 'pressed-flower-nails',
    name: 'Pressed Flower Nails',
    category: 'Bridal',
    subtitle: 'Genuine dried botanical wildflowers encased in gel',
    description: 'Real microscopic dried wildflowers, petals, and golden botanical flecks encapsulated between layers of translucent milky builder gel for a permanent botanical garden manicure.',
    image: '/images/nails/pressed-flower-nails.jpg',
    suggestedShape: 'Almond or Oval',
    suggestedColors: 'Translucent Milky Quartz & Real Wildflower Florets',
    suggestedFinish: 'Crystal-Clear Builder Gel Glaze',
    preset: {
      shapeId: 'almond',
      colorId: 'milky-white',
      finishId: 'glossy',
      artId: 'floral-art'
    },
    serviceId: 'nail-art-design',
    serviceName: 'Nail Art Design',
    servicePrice: 60,
    serviceDuration: '60 min'
  },
  {
    id: 'korean-inspired-nail-art',
    name: 'Korean-Inspired Nail Art',
    category: 'Minimal',
    subtitle: 'Translucent syrup glass & delicate micro-motifs',
    description: 'Inspired by Seoul couture nail ateliers: sheer syrup glass base, ultra-fine hand-painted micro-hearts, chrome water drops, and soft blushing cheek gradients.',
    image: '/images/nails/decoradas-art.jpg',
    suggestedShape: 'Short Oval or Squoval',
    suggestedColors: 'Honey Syrup Blush, Milky Cream & Silver Chrome Linework',
    suggestedFinish: 'Iridescent Pearl & Syrup Gloss',
    preset: {
      shapeId: 'oval',
      colorId: 'soft-pink',
      finishId: 'pearl',
      artId: 'minimal-lines'
    },
    serviceId: 'nail-art-design',
    serviceName: 'Nail Art Design',
    servicePrice: 60,
    serviceDuration: '60 min'
  }
];
