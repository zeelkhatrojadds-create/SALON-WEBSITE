/**
 * GLAM GIRL BY JANKI — The Beauty Vision Board Catalog
 * Curated inspiration library for hairstyles, hair colours, nail art, makeup looks, and mehndi art.
 * Strictly adheres to the luxury palette:
 * - Deep Black: #10110F
 * - Forest Green: #263D2B
 * - Olive: #465640
 * - Sage: #A8B5A0
 * - Warm Cream: #F7F4ED
 */

export const VISION_BOARD_CATEGORIES = [
  { id: 'all', label: 'All Inspirations', iconName: 'Sparkles' },
  { id: 'hairstyles', label: 'Hairstyles', iconName: 'Scissors', badge: 'HAIR COUTURE', count: 6 },
  { id: 'hair-colours', label: 'Hair Colours', iconName: 'Droplets', badge: 'COLOUR ATELIER', count: 6 },
  { id: 'nail-art', label: 'Nail Art', iconName: 'Palette', badge: 'NAILS & GEL', count: 6 },
  { id: 'makeup', label: 'Makeup Looks', iconName: 'Sparkle', badge: 'ROYAL MAKEUP', count: 6 },
  { id: 'mehndi', label: 'Mehndi Art', iconName: 'Feather', badge: 'ORGANIC HENNA', count: 6 }
];

export const CURATED_VISION_INSPIRATIONS = [
  // ==========================================
  // 1. HAIRSTYLES
  // ==========================================
  {
    id: 'hs-hollywood-waves',
    category: 'hairstyles',
    categoryLabel: 'Hairstyle',
    title: 'Red-Carpet Hollywood Waves',
    subtitle: 'High-gloss S-waves with continuous flow',
    image: '/images/hair-care/50-bridal-hair-styling.webp',
    tags: ['Hollywood Waves', 'High Gloss', '12h Hold', 'Evening Glam'],
    recommendedServiceId: 'bridal-hair-styling',
    description: 'Sculpted high-gloss synchronous waves creating an elegant, liquid silhouette that withstands movement all night.',
    expertTip: 'Pair with an argan anti-humidity gloss finish for red-carpet mirror light reflection.'
  },
  {
    id: 'hs-voluminous-blowout',
    category: 'hairstyles',
    categoryLabel: 'Hairstyle',
    title: 'Signature Voluminous Blowout',
    subtitle: 'Root lift with soft inward cascade',
    image: '/images/hair-care/52-blow-dry-styling.webp',
    tags: ['Voluminous', 'Round Brush', 'Root Lift', 'Effortless'],
    recommendedServiceId: 'blow-dry-styling',
    description: 'Weightless ceramic round-brush blowout delivering dramatic crown fullness and bouncy, healthy swing.',
    expertTip: 'Best prepped with a botanical leave-in moisture tonic to seal split ends.'
  },
  {
    id: 'hs-romantic-updo',
    category: 'hairstyles',
    categoryLabel: 'Hairstyle',
    title: 'Couture Romantic Textured Updo',
    subtitle: 'Soft twists with face-framing tendrils',
    image: '/images/hair-care/49-rani-hair-styling.webp',
    tags: ['Textured Updo', 'Romantic', 'Bridal Dupatta', 'Wispy'],
    recommendedServiceId: 'rani-hair-styling',
    description: 'Delicately pinned multi-tier twists with soft wispies around temples; engineered to anchor heavy veils and floral pins.',
    expertTip: 'We reinforce internal padding to support dupattas without pulling natural roots.'
  },
  {
    id: 'hs-sleek-chignon',
    category: 'hairstyles',
    categoryLabel: 'Hairstyle',
    title: 'Classic Sleek Low Chignon',
    subtitle: 'Architectural bridal bun with glass shine',
    image: '/images/hair-care/51-party-hair-styling.webp',
    tags: ['Low Chignon', 'Minimalist', 'Clean Part', 'Glass Shine'],
    recommendedServiceId: 'party-hair-styling',
    description: 'Ultra-clean polished low bun with crisp center or side parting for a timeless, regal aesthetic.',
    expertTip: 'Provides a secure flat anchor for maang tikka and matha patti headpieces.'
  },
  {
    id: 'hs-signature-layers',
    category: 'hairstyles',
    categoryLabel: 'Hairstyle',
    title: 'Precision Face-Framing Cut',
    subtitle: 'Seamless dimensional movement & curtain fringe',
    image: '/images/hair-care/53-noor-signature-haircut.webp',
    tags: ['Precision Cut', 'Face Framing', 'Curtain Bangs', 'Movement'],
    recommendedServiceId: 'noor-signature-haircut',
    description: 'Artisanal scissor layering that accentuates cheekbones and removes excess weight while retaining perimeter length.',
    expertTip: 'Blow dry with a medium round brush directing front pieces backward.'
  },
  {
    id: 'hs-boho-crown-braid',
    category: 'hairstyles',
    categoryLabel: 'Hairstyle',
    title: 'Bohemian Dutch Crown Braid',
    subtitle: 'Textured romantic braid with floral readiness',
    image: '/images/hair-care/54-meera-layer-cut.webp',
    tags: ['Dutch Braid', 'Floral Pins', 'Sangeet Look', 'Whimsical'],
    recommendedServiceId: 'meera-layer-cut',
    description: 'Intricately woven halo braid gently fluffed for full-bodied bohemian elegance, perfect for outdoor ceremonies and sangeet dances.',
    expertTip: 'Finished with fine hairspray so hair stays secure through hours of dancing.'
  },

  // ==========================================
  // 2. HAIR COLOURS
  // ==========================================
  {
    id: 'col-honey-balayage',
    category: 'hair-colours',
    categoryLabel: 'Hair Colour',
    title: 'Noor Warm Honey Balayage',
    subtitle: 'Sun-kissed freehand dimensional painting',
    image: '/images/hair-care/58-noor-balayage.webp',
    tags: ['Warm Honey', 'Balayage', 'Face Framing', 'Seamless Grow-Out'],
    recommendedServiceId: 'noor-balayage',
    description: 'Warm golden honey ribbons hand-painted onto lengths, creating natural sunlight contrast that flatters warm undertones.',
    expertTip: 'Requires no harsh root demarcation, making touch-ups effortless every 12–16 weeks.'
  },
  {
    id: 'col-micro-foil-highlights',
    category: 'hair-colours',
    categoryLabel: 'Hair Colour',
    title: 'Micro-Foil Multitonal Highlights',
    subtitle: 'All-over root-to-tip illuminated brightness',
    image: '/images/hair-care/59-highlights.webp',
    tags: ['Highlights', 'Micro Foils', 'Multi-Tonal', 'Brightness'],
    recommendedServiceId: 'highlights',
    description: 'Hyper-fine foil weaves delivering all-over illumination and soft dimensional shimmer throughout dense hair.',
    expertTip: 'Toned with an acidic pearl gloss to eliminate all brassy undertones.'
  },
  {
    id: 'col-kesariya-copper',
    category: 'hair-colours',
    categoryLabel: 'Hair Colour',
    title: 'Kesariya Warm Copper Chestnut',
    subtitle: 'Rich autumnal spice with fiery gold embers',
    image: '/images/hair-care/57-kesariya-hair-colour.webp',
    tags: ['Copper', 'Chestnut', 'Autumnal', 'Rich Pigment'],
    recommendedServiceId: 'kesariya-hair-colour',
    description: 'Lustrous cinnamon and chestnut tones infused with warm red-gold pigments that reflect rich warmth in natural daylight.',
    expertTip: 'Preserve vibrant warmth at home with cold-water rinses and sulfate-free care.'
  },
  {
    id: 'col-dark-espresso-gloss',
    category: 'hair-colours',
    categoryLabel: 'Hair Colour',
    title: 'Deep Espresso Mirror Gloss',
    subtitle: 'Rich dark chocolate single process with high shine',
    image: '/images/hair-care/61-full-colour.webp',
    tags: ['Espresso', 'Dark Chocolate', 'High Gloss', 'Even Tone'],
    recommendedServiceId: 'full-colour',
    description: 'Flawless root-to-end saturation creating deep, uniform dark chocolate hair with an ultra-reflective mirror sheen.',
    expertTip: 'Infused with botanical lipids that seal dry, porous cuticles.'
  },
  {
    id: 'col-root-shadow-melt',
    category: 'hair-colours',
    categoryLabel: 'Hair Colour',
    title: 'Root Shadow & Color Melt',
    subtitle: 'Soft gradient transition into luminous ends',
    image: '/images/hair-care/60-root-touch-up.webp',
    tags: ['Root Shadow', 'Color Melt', 'Seamless Blend', 'Modern'],
    recommendedServiceId: 'root-touch-up',
    description: 'Blends dark natural roots into lighter mid-lengths, giving a soft, lived-in transition with zero demarcation lines.',
    expertTip: 'The ultimate low-maintenance option for clients who love lighter ends.'
  },
  {
    id: 'col-mushroom-ash-glaze',
    category: 'hair-colours',
    categoryLabel: 'Hair Colour',
    title: 'Cool Mushroom Ash Glaze',
    subtitle: 'Smoky beige-brown with zero brassiness',
    image: '/images/hair-care/balayage-highlights.webp',
    tags: ['Mushroom Brown', 'Ash Tone', 'Anti-Brass', 'Editorial'],
    recommendedServiceId: 'noor-balayage',
    description: 'Chic smoky beige-brown glaze neutralizing yellow or orange undertones for a sleek, cool-toned brunette aesthetic.',
    expertTip: 'Works best when paired with an Olaplex bond repair treatment during application.'
  },

  // ==========================================
  // 3. NAIL ART
  // ==========================================
  {
    id: 'nl-glazed-chrome-pearl',
    category: 'nail-art',
    categoryLabel: 'Nail Art',
    title: 'Glazed Donut Chrome Pearl',
    subtitle: 'Iridescent pearl powder over nude silk',
    image: '/images/nails/chrome-hologram.jpg',
    tags: ['Glazed Chrome', 'Hailey Bieber Style', 'Pearl Radiance', 'Almond Shape'],
    recommendedServiceId: 'gel-nail-extensions',
    description: 'Ultra-luminous chrome powder hand-rubbed over soft blush nude gel, producing an ethereal, iridescent pearl gleam.',
    expertTip: 'Looks exceptionally elegant on soft almond or medium oval silhouettes.'
  },
  {
    id: 'nl-micro-french-tips',
    category: 'nail-art',
    categoryLabel: 'Nail Art',
    title: 'Minimalist Micro French Tips',
    subtitle: 'Crisp precision edge on soft milky base',
    image: '/images/nails/french-manicure.webp',
    tags: ['Micro French', 'Minimalist', 'Timeless Chic', 'Clean Lines'],
    recommendedServiceId: 'classic-manicure',
    description: 'Subtle whisper-thin French smile lines drawn along the free edge of each nail on a clean, sheer base.',
    expertTip: 'Elongates the appearance of fingers while maintaining an understated, executive look.'
  },
  {
    id: 'nl-magnetic-cat-eye',
    category: 'nail-art',
    categoryLabel: 'Nail Art',
    title: 'Magnetic Velvet Cat-Eye',
    subtitle: 'Metallic particle line that moves with light',
    image: '/images/nails/cat-eye-nails.jpg',
    tags: ['Cat Eye', 'Magnetic Velvet', '3D Shimmer', 'Deep Tone'],
    recommendedServiceId: 'gel-manicure',
    description: 'Special magnetic gel particles sculpted with dual rare-earth magnets to create a fluid, celestial metallic band.',
    expertTip: 'Stunning in deep forest emerald, burgundy wine, and smoky champagne.'
  },
  {
    id: 'nl-botanical-florals',
    category: 'nail-art',
    categoryLabel: 'Nail Art',
    title: 'Hand-Painted Botanical Florals',
    subtitle: 'Fine-brush leaf and petal artistry on accent nails',
    image: '/images/nails/flower-nail-art.jpg',
    tags: ['Botanical Florals', 'Hand-Painted', 'Accent Nails', 'Romantic'],
    recommendedServiceId: 'nail-art-design',
    description: 'Intricate micro-brush florals and leaves hand-painted directly onto feature accent nails with sealed gel resin.',
    expertTip: 'Choose two accent nails per hand to keep the look balanced and refined.'
  },
  {
    id: 'nl-ombre-babyboomer',
    category: 'nail-art',
    categoryLabel: 'Nail Art',
    title: 'Ombre Babyboomer Gradient',
    subtitle: 'Seamless fade from soft nude into milky white',
    image: '/images/nails/abstract-swirls.jpg',
    tags: ['Babyboomer', 'Ombre Fade', 'Milky White', 'Bridal Favorite'],
    recommendedServiceId: 'acrylic-nails',
    description: 'Airbrushed soft gradient melting creamy nude pink into a soft milky white tip with zero visible color lines.',
    expertTip: 'A top bridal favorite that complements both western white gowns and vibrant lehengas.'
  },
  {
    id: 'nl-swarovski-crystal-art',
    category: 'nail-art',
    categoryLabel: 'Nail Art',
    title: 'Swarovski Crystal Accent Couture',
    subtitle: 'Authentic crystals securely sealed in hard gel',
    image: '/images/nails/3d-nail-art.jpg',
    tags: ['Swarovski Crystals', 'Couture', 'Statement Nails', 'High Glamour'],
    recommendedServiceId: 'gel-nail-extensions',
    description: 'Precision placement of authentic Swarovski faceted crystals along the cuticle line and feature accent nails.',
    expertTip: 'Sealed with triple-cure resin so crystals never catch on hair or delicate fabrics.'
  },

  // ==========================================
  // 4. MAKEUP LOOKS
  // ==========================================
  {
    id: 'mu-shringar-bridal-glam',
    category: 'makeup',
    categoryLabel: 'Makeup',
    title: 'Royal Shringar Bridal Glam',
    subtitle: 'Regal defined eyes with 16h airbrush wear',
    image: '/images/services/makeup/44-shringar-bridal-makeup.webp',
    tags: ['Royal Bridal', 'Airbrush', '16h Waterproof', 'Classic Red Lip'],
    recommendedServiceId: 'shringar-bridal-makeup',
    description: 'Regal airbrush bridal makeover engineered to withstand high-temperature ceremony lights, emotion, and photography flashes.',
    expertTip: 'Includes complimentary dupatta pinning and tikka jewelry alignment.'
  },
  {
    id: 'mu-white-dress-glass-skin',
    category: 'makeup',
    categoryLabel: 'Makeup',
    title: 'Ethereal White Gown Glass Skin',
    subtitle: 'Luminescent base with soft neutral tones',
    image: '/images/services/makeup/45-white-dress-bride.webp',
    tags: ['Glass Skin', 'White Dress Bride', 'Neutral Elegance', 'Veil Ready'],
    recommendedServiceId: 'white-dress-bride',
    description: 'Soft romantic bridal makeup emphasizing natural radiance, cloud-soft blush, flutter silk lashes, and gentle lip gloss.',
    expertTip: 'Optimized for soft outdoor daylight photography and veil placement.'
  },
  {
    id: 'mu-noor-soft-glam',
    category: 'makeup',
    categoryLabel: 'Makeup',
    title: 'Noor Signature Soft Glam Pout',
    subtitle: 'Dewy skin, sculpted contour & nude velvet lip',
    image: '/images/services/makeup/43-noor-signature-makeup.webp',
    tags: ['Soft Glam', 'Sculpted Cheekbones', 'Nude Velvet Pout', 'Everyday Glam'],
    recommendedServiceId: 'noor-signature-makeup',
    description: 'Sophisticated dewy base with softly sculpted contours, illuminated high points, and a flattering satin nude lip.',
    expertTip: 'Ideal for engagement ceremonies, reception dinners, and cocktail nights.'
  },
  {
    id: 'mu-sangeet-vibrant-eyes',
    category: 'makeup',
    categoryLabel: 'Makeup',
    title: 'Sangeet & Haldi Vibrant Shimmer',
    subtitle: 'High-energy, sweat-resistant sparkle eye art',
    image: '/images/services/makeup/46-bridal-side-functions.webp',
    tags: ['Sangeet', 'Haldi', 'Vibrant Shimmer', 'Dance-Proof'],
    recommendedServiceId: 'bridal-side-functions',
    description: 'Vibrant celebratory makeup with micro-glitter eyelid wash, sweat-resistant base, and bold, camera-ready lashes.',
    expertTip: 'Finished with a proprietary micro-fine fixative spray that prevents shine on the dance floor.'
  },
  {
    id: 'mu-smokey-kohl-glamour',
    category: 'makeup',
    categoryLabel: 'Makeup',
    title: 'Red Carpet Smokey Kohl Glam',
    subtitle: 'Dimensional smudged eye with balanced nude lip',
    image: '/images/services/makeup/47-party-makeup.webp',
    tags: ['Smokey Kohl', 'Red Carpet', 'Sultry Eyes', 'Statement Night'],
    recommendedServiceId: 'party-makeup',
    description: 'Smoldering bronze and black kohl eyes with smoked-out lash lines, balanced with a velvet matte skin finish.',
    expertTip: 'Keeps focus on intense eye drama without looking overly heavy.'
  },
  {
    id: 'mu-engagement-roka-glow',
    category: 'makeup',
    categoryLabel: 'Makeup',
    title: 'Romantic Engagement & Roka Glow',
    subtitle: 'Romantic rose-gold flush with lit-from-within glow',
    image: '/images/services/makeup/44-shringar-bridal-makeup.webp',
    tags: ['Engagement', 'Roka', 'Rose Gold Flush', 'Romantic'],
    recommendedServiceId: 'engagement-makeup',
    description: 'Luminous rose-gold tones on eyelids and cheeks for intimate family ceremonies and close-up stage photography.',
    expertTip: 'Formulated with hyaluronic primers that maintain hydration for 12+ hours.'
  },

  // ==========================================
  // 5. MEHNDI ART
  // ==========================================
  {
    id: 'hn-royal-bridal-tapestry',
    category: 'mehndi',
    categoryLabel: 'Mehndi',
    title: 'Royal Bridal Tapestry Jaal',
    subtitle: 'Intricate peacock, jhumka & floral motifs to elbows',
    image: '/images/services/mehndi/40-bridal-mehndi.webp',
    tags: ['Royal Bridal', 'Peacock Motifs', 'Dense Jaal', 'Deep Mahogany'],
    recommendedServiceId: 'bridal-mehndi',
    description: 'Heirloom bridal henna coverage featuring customized bride-groom motifs, delicate checks, and symmetrical dense jaal.',
    expertTip: 'Includes lemon-sugar glaze application and clove smoke warmth technique for deepest mahogany stain.'
  },
  {
    id: 'hn-arabic-floral-bel',
    category: 'mehndi',
    categoryLabel: 'Mehndi',
    title: 'Flowing Arabic Floral Bel',
    subtitle: 'Bold diagonal trails with delicate internal shading',
    image: '/images/services/mehndi/41-arabic-mehndi.webp',
    tags: ['Arabic Bel', 'Floral Trail', 'Bold Outline', 'Fast Drying'],
    recommendedServiceId: 'arabic-mehndi',
    description: 'Graceful diagonal trails of bold open flowers and shaded leaves wrapping from fingertips across the wrist.',
    expertTip: 'Modern, airy composition that leaves elegant negative skin space.'
  },
  {
    id: 'hn-marwari-heritage-lotus',
    category: 'mehndi',
    categoryLabel: 'Mehndi',
    title: 'Traditional Marwari Lotus & Checks',
    subtitle: 'Fine heritage checkwork, lotus blooms & cuffs',
    image: '/images/mehndi/indian-traditional-jaal.webp',
    tags: ['Marwari Heritage', 'Lotus Bloom', 'Fine Checks', 'Symmetry'],
    recommendedServiceId: 'mehndi-classic-design',
    description: 'Sacred blooming lotus buds paired with precise mathematical checkwork and ornate wrist cuffs.',
    expertTip: 'Mixed with 100% organic triple-filtered Sojat henna and pure Nilgiri essential oil.'
  },
  {
    id: 'hn-mandala-wrist-cuff',
    category: 'mehndi',
    categoryLabel: 'Mehndi',
    title: 'Sacred Circular Mandala & Cuff',
    subtitle: 'Harmonious center chakra with geometric bracelet',
    image: '/images/mehndi/mandala-palm-art.webp',
    tags: ['Mandala Art', 'Wrist Cuff', 'Chakra Motif', 'Festive Favorite'],
    recommendedServiceId: 'party-mehndi',
    description: 'Hypnotic circular mandala on the center of the palm framed by modern lace fingertip caps and an architectural wrist bracelet.',
    expertTip: 'A favorite for festivals such as Karwa Chauth, Diwali, and intimate celebrations.'
  },
  {
    id: 'hn-finger-rings-lace',
    category: 'mehndi',
    categoryLabel: 'Mehndi',
    title: 'Delicate Finger Lace & Bracelet',
    subtitle: 'Fine jewelry-like rings and delicate hand harness',
    image: '/images/mehndi/finger-rings-lace.webp',
    tags: ['Finger Lace', 'Jewelry Henna', 'Minimalist', 'Modern'],
    recommendedServiceId: 'mehndi-classic-design',
    description: 'Featherlight henna jewelry mimicking rings and dainty chain links along fingers and the back of the hand.',
    expertTip: 'Takes only 15–20 minutes to apply and dries quickly.'
  },
  {
    id: 'hn-bridal-feet-payal',
    category: 'mehndi',
    categoryLabel: 'Mehndi',
    title: 'Bridal Feet Anklet & Lotus Motif',
    subtitle: 'Intricate ankle payal band with delicate toe motifs',
    image: '/images/mehndi/bridal-feet-anklet.webp',
    tags: ['Bridal Feet', 'Anklet Payal', 'Lotus Motif', 'Wedding Ceremony'],
    recommendedServiceId: 'bridal-mehndi',
    description: 'Architectural payal (anklet) band wrapping around the ankle with cascading lotus vines and matching toe crowns.',
    expertTip: 'Engineered to frame bridal footwear and wedding photography brilliantly.'
  }
];

/**
 * Helper to build comprehensive notes when customer transfers vision board pins into the Custom Studio workspace
 */
export function formatVisionBoardSummaryNotes(visionBoard) {
  if (!visionBoard || (!visionBoard.pins?.length && !visionBoard.customPins?.length)) {
    return '';
  }

  const parts = [];
  parts.push(`[THE BEAUTY VISION BOARD: “${visionBoard.title || 'My Personalized Moodboard'}”]`);

  const categoryGroups = {
    hairstyles: [],
    'hair-colours': [],
    'nail-art': [],
    makeup: [],
    mehndi: []
  };

  visionBoard.pins.forEach(pin => {
    if (categoryGroups[pin.category]) {
      categoryGroups[pin.category].push(pin);
    }
  });

  if (categoryGroups.hairstyles.length > 0) {
    parts.push(`• Hairstyle Inspiration: ${categoryGroups.hairstyles.map(p => p.title + (p.userNote ? ` (Note: "${p.userNote}")` : '')).join('; ')}`);
  }

  if (categoryGroups['hair-colours'].length > 0) {
    parts.push(`• Hair Colour Inspiration: ${categoryGroups['hair-colours'].map(p => p.title + (p.userNote ? ` (Note: "${p.userNote}")` : '')).join('; ')}`);
  }

  if (categoryGroups['nail-art'].length > 0) {
    parts.push(`• Nail Art Inspiration: ${categoryGroups['nail-art'].map(p => p.title + (p.userNote ? ` (Note: "${p.userNote}")` : '')).join('; ')}`);
  }

  if (categoryGroups.makeup.length > 0) {
    parts.push(`• Makeup Inspiration: ${categoryGroups.makeup.map(p => p.title + (p.userNote ? ` (Note: "${p.userNote}")` : '')).join('; ')}`);
  }

  if (categoryGroups.mehndi.length > 0) {
    parts.push(`• Mehndi Inspiration: ${categoryGroups.mehndi.map(p => p.title + (p.userNote ? ` (Note: "${p.userNote}")` : '')).join('; ')}`);
  }

  if (visionBoard.customPins && visionBoard.customPins.length > 0) {
    parts.push(`• Custom Uploaded Pins (${visionBoard.customPins.length}): ${visionBoard.customPins.map(p => `${p.title || 'Custom Pin'}${p.userNote ? ` ("${p.userNote}")` : ''}`).join('; ')}`);
  }

  parts.push(`Client Goal: Please review this curated moodboard to tailor my bespoke salon experience to match this collective aesthetic.`);

  return parts.join('\n');
}
