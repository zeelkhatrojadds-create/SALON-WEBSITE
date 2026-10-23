// GLAM GIRL BY JANKI — Magnetic Cat-Eye Nail Lab Data

export const MAGNETIC_COLORS = [
  {
    id: 'emerald-green',
    name: 'Emerald Green',
    subtitle: 'Deep malachite with vivid jade luminescence',
    baseHex: '#062618',
    midHex: '#0F5132',
    magneticHex: '#34D399',
    sparkleHex: '#A7F3D0',
    swatchGrad: 'linear-gradient(135deg, #062618 0%, #10B981 50%, #062618 100%)'
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    subtitle: 'Signature salon evergreen with olive gold sheen',
    baseHex: '#0B1C10',
    midHex: '#263D2B',
    magneticHex: '#6E8E68',
    sparkleHex: '#D6E2D4',
    swatchGrad: 'linear-gradient(135deg, #0B1C10 0%, #465640 50%, #0B1C10 100%)'
  },
  {
    id: 'ruby-red',
    name: 'Ruby Red',
    subtitle: 'Velvety crimson garnet with fiery scarlet pulse',
    baseHex: '#2E060E',
    midHex: '#881337',
    magneticHex: '#EF4444',
    sparkleHex: '#FECACA',
    swatchGrad: 'linear-gradient(135deg, #2E060E 0%, #E11D48 50%, #2E060E 100%)'
  },
  {
    id: 'sapphire-blue',
    name: 'Sapphire Blue',
    subtitle: 'Midnight royal cobalt with luminous cyan ribbon',
    baseHex: '#0A152E',
    midHex: '#1E3A8A',
    magneticHex: '#3B82F6',
    sparkleHex: '#BFDBFE',
    swatchGrad: 'linear-gradient(135deg, #0A152E 0%, #2563EB 50%, #0A152E 100%)'
  },
  {
    id: 'purple-amethyst',
    name: 'Purple Amethyst',
    subtitle: 'Regal imperial violet with electric lilac refraction',
    baseHex: '#1F0A2E',
    midHex: '#581C87',
    magneticHex: '#A855F7',
    sparkleHex: '#E9D5FF',
    swatchGrad: 'linear-gradient(135deg, #1F0A2E 0%, #9333EA 50%, #1F0A2E 100%)'
  },
  {
    id: 'rose-pink',
    name: 'Rose Pink',
    subtitle: 'Blush quartz rose with champagne iridescent glow',
    baseHex: '#2E0E1C',
    midHex: '#831843',
    magneticHex: '#EC4899',
    sparkleHex: '#FCE7F3',
    swatchGrad: 'linear-gradient(135deg, #2E0E1C 0%, #F472B6 50%, #2E0E1C 100%)'
  },
  {
    id: 'silver-chrome',
    name: 'Silver Chrome',
    subtitle: 'Liquid platinum mercury over smoked obsidian',
    baseHex: '#151719',
    midHex: '#374151',
    magneticHex: '#CBD5E1',
    sparkleHex: '#FFFFFF',
    swatchGrad: 'linear-gradient(135deg, #151719 0%, #E2E8F0 50%, #151719 100%)'
  },
  {
    id: 'black-diamond',
    name: 'Black Diamond',
    subtitle: 'Galactic carbon black with crystalline starlight',
    baseHex: '#08090A',
    midHex: '#1F2428',
    magneticHex: '#94A3B8',
    sparkleHex: '#F8FAFC',
    swatchGrad: 'linear-gradient(135deg, #08090A 0%, #64748B 50%, #08090A 100%)'
  },
  {
    id: 'golden-champagne',
    name: 'Golden Champagne',
    subtitle: 'Warm gilded amber with spun spun-gold beam',
    baseHex: '#241804',
    midHex: '#78350F',
    magneticHex: '#F59E0B',
    sparkleHex: '#FEF3C7',
    swatchGrad: 'linear-gradient(135deg, #241804 0%, #FBBF24 50%, #241804 100%)'
  }
];

export const MAGNETIC_FINISHES = [
  {
    id: 'glossy',
    name: 'Glossy',
    tagline: 'High-Mirror Crystal Reflection',
    description: 'Ultra-reflective diamond topcoat that produces a sharp, glass-like cat-eye light slash.'
  },
  {
    id: 'velvet',
    name: 'Velvet',
    tagline: 'Multi-Directional Diffuse Glow',
    description: 'Soft cashmere diffusion dispersing the magnetic particles throughout the nail plate like velvet fabric.'
  },
  {
    id: 'holographic',
    name: 'Holographic',
    tagline: 'Prismatic Rainbow Shimmer',
    description: 'Infused with linear holographic micro-flocculants that break light into a dazzling spectrum.'
  }
];

export const MAGNETIC_SHAPES = [
  {
    id: 'almond',
    name: 'Almond',
    subtitle: 'Graceful tapered curve',
    path: 'M 20 150 C 20 158 80 158 80 150 L 78 72 C 76 42, 58 22, 50 20 C 42 22, 24 42, 22 72 Z'
  },
  {
    id: 'oval',
    name: 'Oval',
    subtitle: 'Smooth elongated silhouette',
    path: 'M 20 150 C 20 158 80 158 80 150 L 80 68 C 80 26, 20 26, 20 68 Z'
  },
  {
    id: 'square',
    name: 'Square',
    subtitle: 'Defined architectural edge',
    path: 'M 20 150 C 20 158 80 158 80 150 L 80 40 L 20 40 Z'
  },
  {
    id: 'coffin',
    name: 'Coffin',
    subtitle: 'Tapered sides with flat tip',
    path: 'M 20 150 C 20 158 80 158 80 150 L 78 74 L 66 24 L 34 24 L 22 74 Z'
  },
  {
    id: 'stiletto',
    name: 'Stiletto',
    subtitle: 'Razor-sharp statement point',
    path: 'M 20 150 C 20 158 80 158 80 150 L 78 72 L 50 12 L 22 72 Z'
  }
];

export const MAGNETIC_PRESETS = [
  {
    id: 'emerald-galaxy',
    name: 'Emerald Galaxy',
    description: 'Deep malachite jade with a crisp 45° diagonal magnetic comet beam.',
    colorId: 'emerald-green',
    finishId: 'glossy',
    shapeId: 'almond',
    bandPosition: 50,
    bandAngle: 45,
    shimmerIntensity: 95
  },
  {
    id: 'midnight-cat-eye',
    name: 'Midnight Cat-Eye',
    description: 'Onyx starlight with an ethereal silver cat-eye slit across the apex.',
    colorId: 'black-diamond',
    finishId: 'glossy',
    shapeId: 'coffin',
    bandPosition: 42,
    bandAngle: -35,
    shimmerIntensity: 88
  },
  {
    id: 'velvet-amethyst',
    name: 'Velvet Amethyst',
    description: 'Cashmere-soft diffuse purple amethyst with multidirectional velvet halo.',
    colorId: 'purple-amethyst',
    finishId: 'velvet',
    shapeId: 'oval',
    bandPosition: 52,
    bandAngle: 60,
    shimmerIntensity: 90
  },
  {
    id: 'ruby-aurora',
    name: 'Ruby Aurora',
    description: 'Fiery garnet red enveloped by prismatic holographic spectrum refraction.',
    colorId: 'ruby-red',
    finishId: 'holographic',
    shapeId: 'stiletto',
    bandPosition: 62,
    bandAngle: -45,
    shimmerIntensity: 100
  },
  {
    id: 'silver-moonlight',
    name: 'Silver Moonlight',
    description: 'Liquid mercury mirror line cutting clean through deep smoke charcoal.',
    colorId: 'silver-chrome',
    finishId: 'glossy',
    shapeId: 'square',
    bandPosition: 50,
    bandAngle: 15,
    shimmerIntensity: 92
  },
  {
    id: 'pink-nebula',
    name: 'Pink Nebula',
    description: 'Blush quartz base illuminated by multidimensional celestial pink dust.',
    colorId: 'rose-pink',
    finishId: 'holographic',
    shapeId: 'almond',
    bandPosition: 46,
    bandAngle: -25,
    shimmerIntensity: 96
  }
];
