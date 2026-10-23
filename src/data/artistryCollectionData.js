// GLAM GIRL BY JANKI — The Artistry Collection Master Gallery Data
// Magazine-inspired editorial exhibition of couture nail art, technique spotlights, and signature designs

export const ARTISTRY_CATEGORIES = [
  { id: 'all', label: 'All Artworks' },
  { id: '3d', label: '3D Art' },
  { id: 'abstract', label: 'Abstract' },
  { id: 'geometry', label: 'Geometry' },
  { id: 'chrome', label: 'Chrome' },
  { id: 'botanical', label: 'Botanical' },
  { id: 'bridal', label: 'Bridal' },
  { id: 'mixed-media', label: 'Mixed Media' }
];

export const ARTIST_SPOTLIGHT_PIECE = {
  id: 'spotlight-forest-monarch',
  title: 'The Forest Monarch',
  collection: 'Signature Creations',
  subtitle: 'Hand-Carved Botanical Relief, Liquid Mirror Chrome & Velvet Cat-Eye Depth',
  image: '/images/nails/3d/bojana-elatus.jpg',
  artistStory: '“The Forest Monarch was conceived as a tribute to organic architecture. We layered 4D builder plastiline gel to sculpt raised leaf veins and unfurling petals, framing a center nail bathed in deep emerald velvet cat-eye shimmer. Molten chrome drops trickle down the sidewalls like morning dew.” — Janki Patel',
  inspiration: 'Ancient woodland flora, tactile high-fashion jewelry, and optical depth interplay.',
  shapes: 'Almond or Stiletto',
  colors: 'Forest Green (#263D2B), Atelier Noir (#10110F) & Mirrored Platinum Chrome',
  finish: 'High-Gloss Glass Topcoat with Frosted Matte Petals',
  techniques: [
    'Layered 4D Plastiline Hand-Carving',
    'Neodymium Rare-Earth Velvet Cat-Eye Alignment',
    'Non-Wipe Sculpted Chrome Droplet Burnishing',
    'Inverted Architectural Apex Balancing'
  ],
  preset: {
    shapeId: 'almond',
    colorId: 'forest-green',
    finishId: 'chrome',
    artId: 'floral-art',
    artisanNote: 'Artist Spotlight: The Forest Monarch 3D sculpted botanical relief with velvet cat-eye core.'
  },
  serviceId: 'nail-art-addon',
  serviceName: 'Bespoke Hand-Painted Nail Art (Full Set)'
};

export const ARTISTRY_ARTWORKS = [
  // 1. Sculpted 3D Art
  {
    id: 'art-sculpted-gardenia',
    title: 'Porcelain Gardenia Blooms',
    category: '3d',
    categoryName: 'Sculpted 3D Art',
    image: '/images/nails/3d/sculpted-flowers.jpg',
    aspect: 'tall', // 16:9 vertical / masonry feature
    badge: '3D SCULPTED',
    shortDesc: 'Dimensional hand-carved porcelain white petals with freshwater pearl stamens.',
    inspiration: 'Botanical glasshouse flora and sculpted haute couture bridal gowns.',
    shapes: 'Almond, Oval, Coffin',
    colors: 'Milky Porcelain White & Soft Sheer Pink',
    finish: 'Glossy Base with Matte Petal Contours',
    techniques: ['4D Gel Clay Sculpting', 'Silicone Stylus Carving', 'Pearl Bead Pinning'],
    preset: {
      shapeId: 'almond',
      colorId: 'soft-pink',
      finishId: 'glossy',
      artId: 'floral-art',
      artisanNote: 'Artistry Collection: Porcelain Gardenia 3D sculpted blooms with pearl stamens.'
    },
    serviceId: 'nail-art-addon'
  },
  {
    id: 'art-sculpted-ribbon-bows',
    title: 'Architectural Coquette Bows',
    category: '3d',
    categoryName: 'Sculpted 3D Art',
    image: '/images/nails/3d/sculpted-bows.jpg',
    aspect: 'square',
    badge: '3D SCULPTED',
    shortDesc: 'Three-dimensional folded ribbon bow sculptures with crisp fabric creases.',
    inspiration: 'Parisian salon couture, coquette ribbons, and vintage millinery.',
    shapes: 'Squoval, Almond',
    colors: 'Atelier Black & Classic Rouge',
    finish: 'High-Gloss Glass Gel',
    techniques: ['Dual-Loop Acrylic Ribbon Bending', 'Anchor Gel Fusion', 'High-Gloss Seal'],
    preset: {
      shapeId: 'squoval',
      colorId: 'black',
      finishId: 'glossy',
      artId: 'minimal-lines',
      artisanNote: 'Artistry Collection: Architectural 3D ribbon bow sculpture.'
    },
    serviceId: 'nail-art-addon'
  },

  // 2. Abstract Expressions
  {
    id: 'art-fluid-emerald-swirls',
    title: 'Harmonic Forest Swirls',
    category: 'abstract',
    categoryName: 'Abstract Expressions',
    image: '/images/nails/abstract-swirls.jpg',
    aspect: 'wide',
    badge: 'ABSTRACT ART',
    shortDesc: 'Undulating multi-tone ribbons sweeping down translucent negative space beds.',
    inspiration: '70s mid-century modern wave typography and organic river currents.',
    shapes: 'Stiletto, Almond, Oval',
    colors: 'Forest Green, Sage, & Milky Cream',
    finish: 'Ultra-Gloss Diamond Topcoat',
    techniques: ['Freehand Striper Brush Flow', 'Negative Space Framing', 'Flash Freezing'],
    preset: {
      shapeId: 'stiletto',
      colorId: 'forest-green',
      finishId: 'glossy',
      artId: 'abstract',
      artisanNote: 'Artistry Collection: Harmonic 70s fluid undulating swirls in forest green & sage.'
    },
    serviceId: 'nail-art-addon'
  },
  {
    id: 'art-aura-diffused-blush',
    title: 'Aura of Serenity',
    category: 'abstract',
    categoryName: 'Abstract Expressions',
    image: '/images/nails/aura-nails.jpg',
    aspect: 'tall',
    badge: 'AURA BLUSH',
    shortDesc: 'Ethereal diffused radial center blush fading seamlessly into sheer milk.',
    inspiration: 'Chromotherapy, atmospheric dawn skies, and mood gradients.',
    shapes: 'Oval, Almond, Squoval',
    colors: 'Milky White with Forest & Sage Aura',
    finish: 'Satin Silk or High Gloss',
    techniques: ['Blooming Sponge Circular Stippling', 'Pigment Feathering', 'Micro-Glitter Dust'],
    preset: {
      shapeId: 'oval',
      colorId: 'forest-green',
      finishId: 'glossy',
      artId: 'abstract',
      artisanNote: 'Artistry Collection: Aura of Serenity radial center blush.'
    },
    serviceId: 'nail-art-addon'
  },

  // 3. Modern Geometry
  {
    id: 'art-minimalist-pinstripe-arches',
    title: 'Modernist Sidewall Arches',
    category: 'geometry',
    categoryName: 'Modern Geometry',
    image: '/images/nails/geometric-stripes.jpg',
    aspect: 'tall',
    badge: 'GEOMETRIC',
    shortDesc: 'Asymmetrical architectural arches framing bare natural nail plates.',
    inspiration: 'Bauhaus minimalism, contemporary framing, and negative space tension.',
    shapes: 'Squoval, Square',
    colors: 'Forest Green & Chalk White on Bare Keratin',
    finish: 'Dual Contrast (Matte Plate + Gloss Line)',
    techniques: ['000 Precision Liner Detailing', 'Acetone Cleanse Chiseling', 'Dual-Sheen Topcoat'],
    preset: {
      shapeId: 'squoval',
      colorId: 'forest-green',
      finishId: 'matte',
      artId: 'minimal-lines',
      artisanNote: 'Artistry Collection: Modernist negative space sidewall arches.'
    },
    serviceId: 'nail-art-addon'
  },

  // 4. Chrome & Magnetic
  {
    id: 'art-liquid-chrome-sculptures',
    title: 'Molten Platinum Drips',
    category: 'chrome',
    categoryName: 'Chrome & Magnetic',
    image: '/images/nails/3d/chrome-sculptures.jpg',
    aspect: 'wide',
    badge: 'LIQUID METAL',
    shortDesc: 'Sculptured 3D raised metal drops gleaming with mirror-plated chrome powder.',
    inspiration: 'Liquid mercury, high-jewelry metalsmithing, and futuristic chrome couture.',
    shapes: 'Almond, Stiletto, Coffin',
    colors: 'Atelier Noir & Mirror Silver Chrome',
    finish: 'Cashmere Matte Base with Mirror Metallic Relief',
    techniques: ['3D Clay Gel Piping', 'Silicone Powder Burnishing', 'Targeted Relief Sealing'],
    preset: {
      shapeId: 'almond',
      colorId: 'black',
      finishId: 'chrome',
      artId: 'abstract',
      artisanNote: 'Artistry Collection: Sculptural 3D molten chrome drips over velvet noir.'
    },
    serviceId: 'nail-art-addon'
  },
  {
    id: 'art-emerald-cat-eye-velvet',
    title: 'Velvet Cat-Eye Starlight',
    category: 'chrome',
    categoryName: 'Chrome & Magnetic',
    image: '/images/nails/cat-eye-nails.jpg',
    aspect: 'tall',
    badge: 'MAGNETIC LAB',
    shortDesc: 'Rare-earth magnetic shimmer aligned into a brilliant diagonal optical light beam.',
    inspiration: 'Deep emerald beryl gemstones and celestial starlight refraction.',
    shapes: 'Almond, Oval, Coffin',
    colors: 'Deep Forest Emerald & Silver Spark',
    finish: 'High-Gloss Glass Depth',
    techniques: ['Neodymium Wand Alignment', 'Cryo-Flash Curing', 'High-Index Encapsulation'],
    preset: {
      shapeId: 'almond',
      colorId: 'forest-green',
      finishId: 'cat-eye',
      artId: 'none',
      artisanNote: 'Artistry Collection: Velvet emerald cat-eye diagonal light beam.'
    },
    serviceId: 'nail-art-addon'
  },

  // 5. Botanical Elegance
  {
    id: 'art-pressed-botanical-wildflowers',
    title: 'Botanical Herbarium Flora',
    category: 'botanical',
    categoryName: 'Botanical Elegance',
    image: '/images/nails/pressed-flower-nails.jpg',
    aspect: 'tall',
    badge: 'BOTANICAL',
    shortDesc: 'Delicate hand-painted wildflowers, leafy sage vines, and encapsulated botanicals.',
    inspiration: 'Pressed botanical herbariums, spring wildflower meadows, and cottagecore luxury.',
    shapes: 'Almond, Oval',
    colors: 'Milky Cashmere, Sage Leaf & Ivory Petals',
    finish: 'Glossy Silk Topcoat',
    techniques: ['Fine Brush Petal Deposition', 'Botanical Lineage', 'Diamond Gel Floating'],
    preset: {
      shapeId: 'almond',
      colorId: 'milky-white',
      finishId: 'glossy',
      artId: 'floral-art',
      artisanNote: 'Artistry Collection: Botanical herbarium hand-painted wildflowers.'
    },
    serviceId: 'nail-art-addon'
  },
  {
    id: 'art-spring-sakura-french',
    title: 'Blush Sakura French',
    category: 'botanical',
    categoryName: 'Botanical Elegance',
    image: '/images/nails/flower-nail-art.jpg',
    aspect: 'square',
    badge: 'BOTANICAL',
    shortDesc: 'Sheer blush pink base with delicate micro-cherry blossoms drifting over the smile line.',
    inspiration: 'Japanese Hanami cherry blossom season in Ottawa spring.',
    shapes: 'Almond, Squoval',
    colors: 'Soft Pink, Cherry Red & Pure White',
    finish: 'Mirror Diamond Gel',
    techniques: ['Petal Dotting', 'Smile Line Micro-French', 'Crystal Dewdrop Accents'],
    preset: {
      shapeId: 'almond',
      colorId: 'soft-pink',
      finishId: 'french-tips',
      artId: 'floral-art',
      artisanNote: 'Artistry Collection: Blush sakura cherry blossom French manicure.'
    },
    serviceId: 'nail-art-addon'
  },

  // 6. Bridal Masterpieces
  {
    id: 'art-bridal-pearl-couture',
    title: 'L’Amour Bridal Pearls',
    category: 'bridal',
    categoryName: 'Bridal Masterpieces',
    image: '/images/nails/3d/bridal-3d-nails.jpg',
    aspect: 'tall',
    badge: 'BRIDAL COUTURE',
    shortDesc: 'Soft ombre French manicure adorned with graduated freshwater pearl accents and silver foil.',
    inspiration: 'Haute couture wedding veils, heirloom pearls, and timeless bridal grace.',
    shapes: 'Almond, Coffin, Oval',
    colors: 'Milky Porcelain Nude & Luminous Pearls',
    finish: 'Diamond Glass Topcoat',
    techniques: ['French Baby Boomer Ombre', 'Reinforced Pearl Bezel Setting', 'Diamond Cure'],
    preset: {
      shapeId: 'almond',
      colorId: 'nude-beige',
      finishId: 'pearl',
      artId: 'minimal-lines',
      artisanNote: 'Artistry Collection: L’Amour bridal pearls with soft French baby boomer ombre.'
    },
    serviceId: 'gel-manicure'
  },
  {
    id: 'art-swarovski-crystal-constellation',
    title: 'Crystal Constellation Strass',
    category: 'bridal',
    categoryName: 'Bridal Masterpieces',
    image: '/images/nails/3d/crystal-gem-nails.jpg',
    aspect: 'square',
    badge: 'BRIDAL COUTURE',
    shortDesc: 'Precision-set multi-faceted crystal gemstones cascading down the ring finger apex.',
    inspiration: 'Diamond tiaras, starlight constellations, and high-jewelry bezel settings.',
    shapes: 'Coffin, Almond, Stiletto',
    colors: 'Sheer Rose Quartz & Crystal Clarity',
    finish: 'High-Gloss Glass',
    techniques: ['Bezel Gel Embedding', 'Micro-Crystal Cluster Layout', 'Caviar Bead Framing'],
    preset: {
      shapeId: 'coffin',
      colorId: 'soft-pink',
      finishId: 'glitter',
      artId: 'glitter-accent',
      artisanNote: 'Artistry Collection: Swarovski crystal constellation cluster.'
    },
    serviceId: 'gel-manicure'
  },

  // 7. Mixed-Media Nails
  {
    id: 'art-mixed-media-tapestry',
    title: 'Texture & Chrome Tapestry',
    category: 'mixed-media',
    categoryName: 'Mixed-Media Nails',
    image: '/images/nails/3d/complex-nail-art.jpg',
    aspect: 'wide',
    badge: 'MIXED MEDIA',
    shortDesc: 'A lavish fusion of molten chrome drips, embossed cable textures, and natural marbling.',
    inspiration: 'Mixed-media contemporary sculpture and high-fashion editorial runway sets.',
    shapes: 'Almond, Stiletto',
    colors: 'Forest Green, Atelier Black & Platinum Mirror',
    finish: 'Multi-Textured (Matte, Gloss & Relief Chrome)',
    techniques: ['Multi-Medium Gel Fusion', 'Acrylic Texturing', 'Selective Topcoat Sealing'],
    preset: {
      shapeId: 'almond',
      colorId: 'forest-green',
      finishId: 'chrome',
      artId: 'abstract',
      artisanNote: 'Artistry Collection: Multi-textured mixed media tapestry with chrome & relief.'
    },
    serviceId: 'nail-art-addon'
  },
  {
    id: 'art-butterfly-3d-flight',
    title: '3D Butterfly Papillon',
    category: 'mixed-media',
    categoryName: 'Mixed-Media Nails',
    image: '/images/nails/3d/butterfly-nails.jpg',
    aspect: 'tall',
    badge: 'MIXED MEDIA',
    shortDesc: 'Iridescent sculpted resin butterfly wings perched delicately on a French gradient bed.',
    inspiration: 'Ethereal metamorphoses, delicate butterfly wings, and fairycore romanticism.',
    shapes: 'Almond, Coffin',
    colors: 'Milky Blush with Holographic Wing Sheen',
    finish: 'Holographic Iridescent Glaze',
    techniques: ['Pre-Formed 3D Resin Anchoring', 'Caviar Accent Filigree', 'High-Tack Gel Bonding'],
    preset: {
      shapeId: 'almond',
      colorId: 'milky-white',
      finishId: 'glossy',
      artId: 'floral-art',
      artisanNote: 'Artistry Collection: 3D sculpted butterfly papillon wings with caviar accents.'
    },
    serviceId: 'nail-art-addon'
  }
];
