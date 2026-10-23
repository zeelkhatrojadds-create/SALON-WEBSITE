// GLAM GIRL BY JANKI — Nail Studio Master Constants & Shapes

export const NAIL_SHAPES = [
  {
    id: 'square',
    name: 'Square',
    subtitle: 'Straight tip with defined corners.',
    description: 'Straight parallel sidewalls with sharp, 90-degree flat edges for a bold, crisp silhouette.',
    path: 'M 20 150 C 20 158 80 158 80 150 L 80 40 L 20 40 Z',
    tipHighlightPath: 'M 20 40 L 80 40',
    accentTipHeight: 40
  },
  {
    id: 'squoval',
    name: 'Squoval',
    subtitle: 'Square shape with softly rounded corners.',
    description: 'The universally flattering hybrid: flat horizontal free edge with softly curved, rounded corners.',
    path: 'M 20 150 C 20 158 80 158 80 150 L 80 48 C 80 40, 75 38, 68 38 L 32 38 C 25 38, 20 40, 20 48 Z',
    tipHighlightPath: 'M 22 46 C 26 40 74 40 78 46',
    accentTipHeight: 42
  },
  {
    id: 'round',
    name: 'Round',
    subtitle: 'Naturally rounded, classic shape.',
    description: 'Straight sides that curve gracefully into a soft, circular arch following the natural fingertip contour.',
    path: 'M 20 150 C 20 158 80 158 80 150 L 80 62 C 80 34, 20 34, 20 62 Z',
    tipHighlightPath: 'M 22 58 C 30 38 70 38 78 58',
    accentTipHeight: 48
  },
  {
    id: 'oval',
    name: 'Oval',
    subtitle: 'Smooth, elegant oval silhouette.',
    description: 'Softly tapering sides with an extended, elongated curved tip that visually lengthens the fingers.',
    path: 'M 20 150 C 20 158 80 158 80 150 L 80 68 C 80 26, 20 26, 20 68 Z',
    tipHighlightPath: 'M 24 62 C 34 30 66 30 76 62',
    accentTipHeight: 42
  },
  {
    id: 'almond',
    name: 'Almond',
    subtitle: 'Tapered sides with a softly pointed tip.',
    description: 'Slender tapering sides converging into a graceful, softly rounded peak resembling an almond silhouette.',
    path: 'M 20 150 C 20 158 80 158 80 150 L 78 72 C 76 42, 58 22, 50 20 C 42 22, 24 42, 22 72 Z',
    tipHighlightPath: 'M 28 66 C 38 34 50 24 50 24 C 50 24 62 34 72 66',
    accentTipHeight: 34
  },
  {
    id: 'coffin',
    name: 'Coffin / Ballerina',
    subtitle: 'Tapered sides with a flat tip.',
    description: 'Dramatic slender tapered sidewalls terminating in a flat, squared-off tip inspired by ballerina pointe shoes.',
    path: 'M 20 150 C 20 158 80 158 80 150 L 78 74 L 66 24 L 34 24 L 22 74 Z',
    tipHighlightPath: 'M 34 24 L 66 24',
    accentTipHeight: 28
  },
  {
    id: 'stiletto',
    name: 'Stiletto',
    subtitle: 'Long, sharply pointed silhouette.',
    description: 'Ultra-dramatic, razor-sharp tapered point creating an iconic high-fashion, show-stopping statement.',
    path: 'M 20 150 C 20 158 80 158 80 150 L 78 72 L 50 12 L 22 72 Z',
    tipHighlightPath: 'M 26 68 L 50 16 L 74 68',
    accentTipHeight: 22
  }
];

export const NAIL_COLORS = [
  { id: 'classic-red', name: 'Classic Red', hex: '#B91C1C', textTone: 'light' },
  { id: 'nude-beige', name: 'Nude Beige', hex: '#D4B89C', textTone: 'dark' },
  { id: 'soft-pink', name: 'Soft Pink', hex: '#E8A7A1', textTone: 'dark' },
  { id: 'milky-white', name: 'Milky White', hex: '#F3F4F6', textTone: 'dark' },
  { id: 'forest-green', name: 'Forest Green', hex: '#263D2B', textTone: 'light' },
  { id: 'black', name: 'Atelier Black', hex: '#10110F', textTone: 'light' },
  { id: 'burgundy', name: 'Royal Burgundy', hex: '#6B1D2F', textTone: 'light' },
  { id: 'lavender', name: 'Lavender Mist', hex: '#B8A9C9', textTone: 'dark' },
  { id: 'chocolate-brown', name: 'Chocolate Brown', hex: '#4A2E1B', textTone: 'light' },
  { id: 'french-manicure', name: 'French Manicure', hex: '#F7D6D0', textTone: 'dark', isFrench: true }
];

export const NAIL_FINISHES = [
  {
    id: 'glossy',
    name: 'Glossy',
    subtitle: 'Mirror-glass shine',
    description: 'Ultra-reflective salon gel topcoat with crystalline specular highlights.'
  },
  {
    id: 'matte',
    name: 'Matte',
    subtitle: 'Silky smooth finish',
    description: 'Zero-reflection frosted velvet coat with a modern, high-fashion finish.'
  },
  {
    id: 'chrome',
    name: 'Chrome',
    subtitle: 'Futuristic mirror sheen',
    description: 'Hand-buffed metallic powder creating an iridescent mirror reflection.'
  },
  {
    id: 'glitter',
    name: 'Glitter',
    subtitle: 'Sparkling diamond dust',
    description: 'Suspended micro-glitter crystals catching light from every angle.'
  },
  {
    id: 'pearl',
    name: 'Pearl',
    subtitle: 'Soft iridescent glow',
    description: 'Subtle mermaid pearl glaze reflecting ethereal pink and champagne sheen.'
  },
  {
    id: 'cat-eye',
    name: 'Cat-Eye',
    subtitle: '3D velvet depth',
    description: 'Rare-earth magnetic particles creating a shifting celestial beam.'
  },
  {
    id: 'french-tips',
    name: 'French Tips',
    subtitle: 'Crisp smile line crescent',
    description: 'Iconic porcelain smile tips painted on a natural sheer pink nail bed.'
  }
];

export const NAIL_ART_OPTIONS = [
  {
    id: 'none',
    name: 'No Nail Art',
    subtitle: 'Pure pristine lacquer',
    description: 'Clean, solid salon polish emphasizing the color and finish.'
  },
  {
    id: 'minimal-lines',
    name: 'Minimal Lines',
    subtitle: 'Fine geometric accents',
    description: 'Delicate geometric pinstripe detailing for understated luxury.'
  },
  {
    id: 'floral-art',
    name: 'Floral Art',
    subtitle: 'Botanical petals',
    description: 'Fine-brush jasmine and botanical petals painted near the cuticle.'
  },
  {
    id: 'glitter-accent',
    name: 'Glitter Accent',
    subtitle: 'Cascade sparkle',
    description: 'Diamond dust cascade drifting down the ring finger and thumb.'
  },
  {
    id: 'geometric',
    name: 'Geometric Designs',
    subtitle: 'Modernist chevron & angles',
    description: 'Clean negative-space lines and contemporary angular framing.'
  },
  {
    id: 'marble',
    name: 'Marble Nail Art',
    subtitle: 'Swirled quartz veining',
    description: 'Ethereal quartz stone marbling with delicate depth and texture.'
  },
  {
    id: 'abstract',
    name: 'Abstract Nail Art',
    subtitle: 'Modern brushstrokes',
    description: 'Expressive organic arcs and contemporary artistic negative space.'
  }
];

// Re-export master curated 16 Nail Art Gallery designs
export { NAIL_ART_GALLERY } from '../../data/nailGalleryData';

// Hand Proportions for 5-finger manicure preview
export const FINGERS_CONFIG = [
  { id: 'thumb', label: 'Thumb', scaleY: 0.95, width: 72, height: 140, isAccent: true, tilt: -4 },
  { id: 'index', label: 'Index', scaleY: 0.98, width: 64, height: 150, isAccent: false, tilt: -1.5 },
  { id: 'middle', label: 'Middle', scaleY: 1.05, width: 66, height: 160, isAccent: false, tilt: 0 },
  { id: 'ring', label: 'Ring', scaleY: 1.00, width: 62, height: 152, isAccent: true, tilt: 1.5 },
  { id: 'pinky', label: 'Pinky', scaleY: 0.88, width: 52, height: 130, isAccent: false, tilt: 4 }
];
