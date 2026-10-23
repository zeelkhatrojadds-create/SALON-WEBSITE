// GLAM GIRL BY JANKI — Mix & Match Finger Designer Master Data

export const TEN_FINGERS = [
  // Left Hand (Pinky/Little to Thumb — anatomical palms down layout)
  {
    id: 'left-little',
    hand: 'left',
    name: 'Left Little',
    shortName: 'L. Little',
    isAccentDefault: false,
    tilt: -8,
    scale: 0.88,
    offsetY: 18,
    symmetryId: 'right-little'
  },
  {
    id: 'left-ring',
    hand: 'left',
    name: 'Left Ring',
    shortName: 'L. Ring',
    isAccentDefault: true,
    tilt: -4,
    scale: 0.98,
    offsetY: 6,
    symmetryId: 'right-ring'
  },
  {
    id: 'left-middle',
    hand: 'left',
    name: 'Left Middle',
    shortName: 'L. Middle',
    isAccentDefault: false,
    tilt: 0,
    scale: 1.05,
    offsetY: 0,
    symmetryId: 'right-middle'
  },
  {
    id: 'left-index',
    hand: 'left',
    name: 'Left Index',
    shortName: 'L. Index',
    isAccentDefault: false,
    tilt: 4,
    scale: 0.98,
    offsetY: 6,
    symmetryId: 'right-index'
  },
  {
    id: 'left-thumb',
    hand: 'left',
    name: 'Left Thumb',
    shortName: 'L. Thumb',
    isAccentDefault: false,
    tilt: 9,
    scale: 1.12,
    offsetY: 22,
    symmetryId: 'right-thumb'
  },

  // Right Hand (Thumb to Pinky/Little — anatomical palms down layout)
  {
    id: 'right-thumb',
    hand: 'right',
    name: 'Right Thumb',
    shortName: 'R. Thumb',
    isAccentDefault: false,
    tilt: -9,
    scale: 1.12,
    offsetY: 22,
    symmetryId: 'left-thumb'
  },
  {
    id: 'right-index',
    hand: 'right',
    name: 'Right Index',
    shortName: 'R. Index',
    isAccentDefault: false,
    tilt: -4,
    scale: 0.98,
    offsetY: 6,
    symmetryId: 'left-index'
  },
  {
    id: 'right-middle',
    hand: 'right',
    name: 'Right Middle',
    shortName: 'R. Middle',
    isAccentDefault: false,
    tilt: 0,
    scale: 1.05,
    offsetY: 0,
    symmetryId: 'left-middle'
  },
  {
    id: 'right-ring',
    hand: 'right',
    name: 'Right Ring',
    shortName: 'R. Ring',
    isAccentDefault: true,
    tilt: 4,
    scale: 0.98,
    offsetY: 6,
    symmetryId: 'left-ring'
  },
  {
    id: 'right-little',
    hand: 'right',
    name: 'Right Little',
    shortName: 'R. Little',
    isAccentDefault: false,
    tilt: 8,
    scale: 0.88,
    offsetY: 18,
    symmetryId: 'left-little'
  }
];

export const MIX_MATCH_COLORS = [
  { id: 'forest-green', name: 'Forest Green', hex: '#263D2B', textTone: 'light' },
  { id: 'emerald', name: 'Emerald', hex: '#0F5132', textTone: 'light' },
  { id: 'black', name: 'Atelier Black', hex: '#10110F', textTone: 'light' },
  { id: 'burgundy', name: 'Burgundy', hex: '#6B1D2F', textTone: 'light' },
  { id: 'rose-pink', name: 'Rose Pink', hex: '#E8A7A1', textTone: 'dark' },
  { id: 'lavender', name: 'Lavender', hex: '#B8A9C9', textTone: 'dark' },
  { id: 'nude', name: 'Nude', hex: '#D4B89C', textTone: 'dark' },
  { id: 'milky-white', name: 'Milky White', hex: '#F4F2EC', textTone: 'dark' },
  { id: 'silver', name: 'Silver', hex: '#C0C0C0', textTone: 'dark' }
];

export const MIX_MATCH_PATTERNS = [
  { id: 'solid', name: 'Solid', description: 'Flawless pure solid lacquer coat' },
  { id: 'french-tip', name: 'French Tip', description: 'Curved smile tip with contrasting edge' },
  { id: 'ombre', name: 'Ombre', description: 'Smooth gradient fading into a vibrant tip' },
  { id: 'polka-dots', name: 'Polka Dots', description: 'Delicate hand-dotted Parisian polka grid' },
  { id: 'stripes', name: 'Stripes', description: 'Architectural pinstripes and linear geometry' },
  { id: 'checkerboard', name: 'Checkerboard', description: 'Modern micro-checkerboard grid' },
  { id: 'floral', name: 'Floral', description: 'Delicate hand-painted botanical petals' },
  { id: 'marble', name: 'Marble', description: 'Smoky, organic flowing Italian marble veins' },
  { id: 'glitter', name: 'Glitter', description: 'High-density sparkling micro-crystals' },
  { id: 'cat-eye', name: 'Cat-Eye', description: 'Luminous 3D magnetic velvet reflection band' },
  { id: 'abstract-swirls', name: 'Abstract Swirls', description: 'Freehand undulating contoured ribbons' },
  { id: 'chrome', name: 'Chrome', description: 'Liquid mirror burnished metallic sheen' }
];

export const MIX_MATCH_ACCENTS = [
  { id: 'none', name: 'No Accent', description: 'Clean, unembellished polish' },
  { id: 'rhinestones', name: 'Rhinestones', description: 'Single high-clarity crystal at the cuticle' },
  { id: 'tiny-flowers', name: 'Tiny Flowers', description: 'Miniature 3D blossom core accent' },
  { id: 'hearts', name: 'Hearts', description: 'Hand-painted delicate couture heart' },
  { id: 'stars', name: 'Stars', description: 'Celestial 4-point starlight flash' },
  { id: 'pearls', name: 'Pearls', description: 'Iridescent freshwater miniature pearl bead' },
  { id: 'metallic-details', name: 'Gold-Free Metallic Details', description: 'Burnished chrome/silver geometric micro-stud' },
  { id: 'minimalist-lines', name: 'Minimalist Lines', description: 'Crisp vertical fine-line divider' }
];

export const MIX_MATCH_FINISHES = [
  { id: 'glossy', name: 'Glossy', description: 'Glass-like high mirror shine' },
  { id: 'matte', name: 'Matte', description: 'Velvety soft frosted finish' },
  { id: 'chrome', name: 'Chrome', description: 'Molten liquid metal mirror' },
  { id: 'velvet', name: 'Velvet', description: 'Cashmere multi-angle diffuse glow' },
  { id: 'holographic', name: 'Holographic', description: 'Prismatic rainbow light refraction' }
];

export const COORDINATED_THEMES = [
  {
    id: 'dark-luxury',
    name: 'Dark Luxury',
    tagline: 'Forest, Onyx & Liquid Chrome',
    applyTheme: (baseNails) => {
      const updated = { ...baseNails };
      TEN_FINGERS.forEach(f => {
        const isAccent = f.isAccentDefault || f.id.includes('thumb');
        updated[f.id] = {
          colorHex: isAccent ? '#10110F' : '#263D2B',
          colorId: isAccent ? 'black' : 'forest-green',
          patternId: isAccent ? 'cat-eye' : 'solid',
          accentId: isAccent ? 'metallic-details' : 'none',
          finishId: 'glossy'
        };
      });
      return updated;
    }
  },
  {
    id: 'bridal',
    name: 'Bridal',
    tagline: 'Milky White, Nude & Pearls',
    applyTheme: (baseNails) => {
      const updated = { ...baseNails };
      TEN_FINGERS.forEach(f => {
        const isAccent = f.isAccentDefault;
        updated[f.id] = {
          colorHex: isAccent ? '#F4F2EC' : '#D4B89C',
          colorId: isAccent ? 'milky-white' : 'nude',
          patternId: isAccent ? 'french-tip' : 'ombre',
          accentId: isAccent ? 'pearls' : 'none',
          finishId: 'glossy'
        };
      });
      return updated;
    }
  },
  {
    id: 'floral',
    name: 'Floral',
    tagline: 'Rose Pink, Lavender & Petals',
    applyTheme: (baseNails) => {
      const updated = { ...baseNails };
      TEN_FINGERS.forEach((f, idx) => {
        const isOdd = idx % 2 === 0;
        const isAccent = f.isAccentDefault;
        updated[f.id] = {
          colorHex: isAccent ? '#F4F2EC' : (isOdd ? '#E8A7A1' : '#B8A9C9'),
          colorId: isAccent ? 'milky-white' : (isOdd ? 'rose-pink' : 'lavender'),
          patternId: isAccent ? 'floral' : 'solid',
          accentId: isAccent ? 'tiny-flowers' : 'none',
          finishId: 'matte'
        };
      });
      return updated;
    }
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    tagline: 'Nude, Clean Lines & Subtle French',
    applyTheme: (baseNails) => {
      const updated = { ...baseNails };
      TEN_FINGERS.forEach((f, idx) => {
        const isAccent = f.isAccentDefault;
        updated[f.id] = {
          colorHex: '#D4B89C',
          colorId: 'nude',
          patternId: isAccent ? 'french-tip' : 'solid',
          accentId: isAccent ? 'minimalist-lines' : 'none',
          finishId: 'glossy'
        };
      });
      return updated;
    }
  },
  {
    id: 'chrome',
    name: 'Chrome',
    tagline: 'Silver Mercury & Molten Metals',
    applyTheme: (baseNails) => {
      const updated = { ...baseNails };
      TEN_FINGERS.forEach((f) => {
        const isAccent = f.isAccentDefault;
        updated[f.id] = {
          colorHex: '#C0C0C0',
          colorId: 'silver',
          patternId: isAccent ? 'abstract-swirls' : 'chrome',
          accentId: isAccent ? 'metallic-details' : 'none',
          finishId: 'chrome'
        };
      });
      return updated;
    }
  },
  {
    id: 'party',
    name: 'Party',
    tagline: 'Emerald, Glitter & Holographic Stars',
    applyTheme: (baseNails) => {
      const updated = { ...baseNails };
      TEN_FINGERS.forEach((f, idx) => {
        const isAccent = f.isAccentDefault;
        updated[f.id] = {
          colorHex: isAccent ? '#0F5132' : '#263D2B',
          colorId: isAccent ? 'emerald' : 'forest-green',
          patternId: isAccent ? 'glitter' : 'cat-eye',
          accentId: isAccent ? 'stars' : 'rhinestones',
          finishId: 'holographic'
        };
      });
      return updated;
    }
  }
];

export const DEFAULT_NAIL_DESIGN = {
  colorHex: '#263D2B',
  colorId: 'forest-green',
  patternId: 'solid',
  accentId: 'none',
  finishId: 'glossy'
};

export const INITIAL_TEN_NAILS_STATE = TEN_FINGERS.reduce((acc, finger) => {
  if (finger.isAccentDefault) {
    acc[finger.id] = {
      colorHex: '#0F5132',
      colorId: 'emerald',
      patternId: 'cat-eye',
      accentId: 'pearls',
      finishId: 'glossy'
    };
  } else {
    acc[finger.id] = { ...DEFAULT_NAIL_DESIGN };
  }
  return acc;
}, {});
