/**
 * GLAM GIRL BY JANKI — Client Customization Studio Engine
 * Master catalog and configuration for personalized beauty experiences.
 * Adheres strictly to salon brand palette:
 * - Deep Black: #10110F
 * - Forest Green: #263D2B
 * - Olive: #465640
 * - Sage: #A8B5A0
 * - Warm Cream: #F7F4ED
 */

export const CUSTOMIZATION_CATEGORIES = [
  {
    id: 'hair-services',
    title: 'Hair Services',
    subtitle: 'Precision cuts, couture styling & thermal finishes',
    iconName: 'Scissors',
    badge: 'STYLING & CUTS',
    matchingCategoryIds: ['hairstyling', 'hair-cut', 'hair-treatments'],
    description: 'Personalize your cut or styling with bespoke hair length sectioning, event styling preferences, and private inspiration imagery.'
  },
  {
    id: 'hair-colour',
    title: 'Hair Colour',
    subtitle: 'Balayage, foil illumination & gloss glazes',
    iconName: 'Droplets',
    badge: 'COLOUR ATELIER',
    matchingCategoryIds: ['hair-color'],
    description: 'Select your dream tone, dimensional painting technique, and upload your personal shade reference photo.'
  },
  {
    id: 'skin-care',
    title: 'Skin Care',
    subtitle: 'Holistic botanical facials & barrier rituals',
    iconName: 'Sparkles',
    badge: 'FACIAL RITUALS',
    matchingCategoryIds: ['facial'],
    description: 'Select an approved facial treatment, customize targeted skincare priorities, and disclose sensitive skin tolerances.'
  },
  {
    id: 'nail-art',
    title: 'Nail Art',
    subtitle: 'Architectural shaping, gel artistry & velvet finishes',
    iconName: 'Palette',
    badge: 'MANICURE COUTURE',
    matchingCategoryIds: ['nails'],
    description: 'Choose your desired silhouette shape, curated tonal palette, topcoat finish, and bespoke hand-painted artwork.'
  },
  {
    id: 'mehndi',
    title: 'Mehndi',
    subtitle: 'Pure Rajasthani henna couture & heirloom motifs',
    iconName: 'Feather',
    badge: 'ORGANIC HENNA',
    matchingCategoryIds: ['henna'],
    description: 'Select from our heritage design collection and specify hand, forearm, or bridal feet placement preferences.'
  },
  {
    id: 'makeup',
    title: 'Makeup',
    subtitle: 'High-definition airbrush & celebration looks',
    iconName: 'Sparkle',
    badge: 'ROYAL MAKEUP',
    matchingCategoryIds: ['makeup'],
    description: 'Customize your camera-ready look, specific ceremony or reception occasion, and provide inspiration aesthetics.'
  }
];

// =========================================================================
// CATEGORY-SPECIFIC CUSTOMIZATION OPTIONS
// =========================================================================

export const HAIR_SERVICES_OPTIONS = {
  hairstyles: [
    { id: 'hollywood-waves', label: 'Red-Carpet Hollywood Waves', desc: 'Sculpted high-gloss S-waves with 12h hold' },
    { id: 'voluminous-blowout', label: 'Signature Voluminous Blowout', desc: 'Bouncy round-brush blowout with lasting root lift' },
    { id: 'textured-updo', label: 'Couture Romantic Textured Updo', desc: 'Soft pinned twists with wispy face-framing pieces' },
    { id: 'bridal-chignon', label: 'Classic Sleek Low Chignon', desc: 'Architectural bridal bun with secure dupatta anchor' },
    { id: 'boho-braid', label: 'Bohemian Fishtail / Dutch Crown Braid', desc: 'Intricate relaxed braid with floral pin readiness' },
    { id: 'half-up-half-down', label: 'Half-Up Twisted Crown with Curls', desc: 'Romantic half-up styling with cascading soft curls' },
    { id: 'sleek-glass-hair', label: 'Mirror Glass Sleek Straight', desc: 'Ultra-flat thermal press with high-shine humidity shield' },
    { id: 'bespoke-cut-layers', label: 'Precision Layers & Face Framing', desc: 'Custom weight removal and seamless dimensional movement' }
  ],
  hairLengths: [
    { id: 'short-bob', label: 'Short (Above Chin / Classic Bob)', desc: 'Precision sectioning for shorter silhouettes' },
    { id: 'shoulder-length', label: 'Shoulder Length', desc: 'Standard medium length styling & blowout' },
    { id: 'mid-back', label: 'Mid-Back Length (Bra-Strap)', desc: 'Extended thermal work and curl setting' },
    { id: 'waist-length-dense', label: 'Waist Length / Very Dense or Curly', desc: 'Comprehensive sectioning and double-layer hold' }
  ],
  stylingPreferences: [
    { id: 'curls-volume', label: 'Voluminous Bouncy Curls', desc: 'Large barrel curling with ceramic setting clips' },
    { id: 'sleek-gloss', label: 'Ultra-Sleek Glass Finish', desc: 'Thermal flat iron glide with argan shine shield' },
    { id: 'natural-diffused', label: 'Soft Natural Wave & Diffused Texture', desc: 'Enhance organic wave pattern with anti-frizz balm' },
    { id: 'dupatta-setting', label: 'Bridal Dupatta / Veil & Jewelry Pinning', desc: 'Reinforced hair padding and heavy fabric anchoring' },
    { id: 'vintage-glam', label: 'Old Hollywood Brushed-Out Waves', desc: 'Continuous synchronized wave formation' }
  ]
};

export const HAIR_COLOUR_OPTIONS = {
  techniques: [
    { id: 'balayage', label: 'Balayage Hand-Painting', desc: 'Sun-kissed freehand surface painting with seamless grow-out' },
    { id: 'highlights', label: 'Precision Micro-Foil Highlights', desc: 'All-over root-to-tip brightness and multi-tonal contrast' },
    { id: 'babylights', label: 'Delicate Whisper Babylights', desc: 'Hyper-fine micro weaves for an ethereal, natural shimmer' },
    { id: 'global-color', label: 'All-Over Rich Single Process', desc: 'Complete root-to-end saturation for uniform depth and shine' },
    { id: 'root-melt', label: 'Root Shadow & Color Melt', desc: 'Soft gradient transition from dark roots into lighter lengths' },
    { id: 'face-framing', label: 'Money Piece / Face-Framing Brightness', desc: 'High-impact illumination isolating front fringe and temples' }
  ],
  shades: [
    { id: 'warm-honey', label: 'Warm Honey & Golden Caramel', tone: '#C89D66', desc: 'Luminous warm undertones that flatter warm skin tones' },
    { id: 'mushroom-brown', label: 'Cool Mushroom Ash Brown', tone: '#7B6F64', desc: 'Chic smoky beige-brown with zero brassy red undertones' },
    { id: 'espresso-gloss', label: 'Rich Espresso Dark Chocolate', tone: '#2D201A', desc: 'Ultra-deep glossy brown with reflective mirror light' },
    { id: 'champagne-blonde', label: 'Champagne Soft Blonde', tone: '#D9C8AA', desc: 'Sophisticated neutral-cool blonde with pearl radiance' },
    { id: 'cinnamon-chestnut', label: 'Cinnamon Chestnut Copper', tone: '#8D472B', desc: 'Rich autumnal spice with radiant red-gold embers' },
    { id: 'soft-ash-glaze', label: 'Smoky Silver-Ash Glaze', tone: '#8C8C88', desc: 'Modern acidic gloss that neutralizes unwanted warmth' }
  ]
};

export const SKIN_CARE_OPTIONS = {
  skinPreferences: [
    { id: 'deep-hydration', label: 'Intense Cellular Hydration', desc: 'Multi-depth hyaluronic infusion for parched skin' },
    { id: 'instant-glow', label: 'Bridal Radiance & Luminosity', desc: 'Botanical brightening agents for an ethereal wedding glow' },
    { id: 'pore-clarifying', label: 'Pore Clarification & Blackhead Relief', desc: 'Gentle ultrasonic extractions and clarifying mask' },
    { id: 'barrier-repair', label: 'Soothing Barrier Restoration', desc: 'Ceramides, centella, and chamomile to soothe reactivity' },
    { id: 'firming-contour', label: 'Lymphatic Drainage & Facial Contouring', desc: 'Kansa wand and cryo globe massage to sculpt jawline' },
    { id: 'anti-aging', label: 'Peptide Collagen Rejuvenation', desc: 'Targeted firming peptides and antioxidant renewal' }
  ],
  sensitivities: [
    { id: 'none', label: 'No Known Sensitivities', desc: 'Comfortable with standard luxury botanical actives' },
    { id: 'sensitive-skin', label: 'Sensitive / Prone to Redness', desc: 'Requires hypoallergenic, alcohol-free and fragrance-free care' },
    { id: 'nut-allergies', label: 'Nut Oil Allergy (No Almond / Argan)', desc: 'Strict elimination of tree-nut and seed-derived carriers' },
    { id: 'acne-reactive', label: 'Acne-Prone / Non-Comedogenic Only', desc: 'Lightweight gel-based hydrators with zero heavy pore-cloggers' },
    { id: 'retinol-sensitive', label: 'Active Retinol / AHA User', desc: 'Gentle non-peeling protocol to safeguard sensitive barrier' },
    { id: 'rosacea-prone', label: 'Rosacea-Prone / Heat Sensitive', desc: 'Cool-mist protocols only; no hot towels or thermal steams' }
  ]
};

export const NAIL_ART_OPTIONS = {
  shapes: [
    { id: 'almond', label: 'Almond', desc: 'Tapered sides with a soft rounded tip; elongates fingers' },
    { id: 'coffin-ballerina', label: 'Coffin / Ballerina', desc: 'Tapered shape with a clean squared-off tip' },
    { id: 'square', label: 'Classic Square', desc: 'Straight parallel sidewalls with sharp, modern 90° corners' },
    { id: 'squoval', label: 'Soft Squoval', desc: 'Square silhouette with gently rounded, chip-resistant edges' },
    { id: 'oval', label: 'Natural Oval', desc: 'Timeless rounded curve mirroring your natural cuticle line' },
    { id: 'stiletto', label: 'Dramatic Stiletto', desc: 'Bold, needle-sharp silhouette for high-impact editorial glamour' }
  ],
  colours: [
    { id: 'nude-blush', label: 'Nude Silk Blush', hex: '#E8D5CE' },
    { id: 'french-cream', label: 'Warm French Cream', hex: '#F7F4ED' },
    { id: 'deep-cabernet', label: 'Deep Cabernet Wine', hex: '#4A1D24' },
    { id: 'forest-emerald', label: 'Forest Green Velvet', hex: '#263D2B' },
    { id: 'muted-sage', label: 'Botanical Soft Sage', hex: '#A8B5A0' },
    { id: 'glazed-pearl', label: 'Glazed Donut Chrome Pearl', hex: '#F0ECE5' },
    { id: 'espresso-truffle', label: 'Dark Espresso Truffle', hex: '#2E221F' }
  ],
  finishes: [
    { id: 'high-gloss', label: 'Diamond High-Gloss Topcoat', desc: 'Ultra-reflective mirror shine with 14-day anti-scratch shield' },
    { id: 'velvet-matte', label: 'Velvet Haute Matte', desc: 'Contemporary glare-free texture with silky editorial feel' },
    { id: 'magnetic-cat-eye', label: 'Magnetic Velvet Cat-Eye', desc: 'Shimmering metallic line that moves fluidly with the light' },
    { id: 'chrome-glaze', label: 'Translucent Chrome Mirror Glaze', desc: 'Iridescent pearl powder rubbed over your chosen base tone' }
  ],
  designs: [
    { id: 'french-smile', label: 'Minimalist Micro French Tips', desc: 'Crisp micro line following the free edge of each nail' },
    { id: 'abstract-swirls', label: 'Modern Abstract Swirls & Curves', desc: 'Organic flowing lines with elegant negative space' },
    { id: 'hand-painted-floral', label: 'Hand-Painted Botanical Florals', desc: 'Delicate fine-brush petals and leaves on feature nails' },
    { id: 'ombre-gradient', label: 'Babyboomer / Ombre Gradient', desc: 'Seamless airbrushed fade from soft nude into milky white' },
    { id: 'minimal-accents', label: 'Crystal / Gold Foil Micro Accents', desc: 'Subtle placement of micro studs and foil on two accent nails' },
    { id: 'solid-pure', label: 'Pure Monochrome Solid Tone', desc: 'Flawless single-tone application with clean sidewall precision' }
  ]
};

export const MEHNDI_OPTIONS = {
  designs: [
    { id: 'bridal-storytelling', label: 'Royal Bridal Tapestry', desc: 'Intricate Radha-Krishna or peacock motifs with dense jaal' },
    { id: 'arabic-bel', label: 'Flowing Arabic Floral Bel', desc: 'Bold diagonal floral trails with delicate internal shading' },
    { id: 'marwari-heritage', label: 'Traditional Rajasthani Checkwork', desc: 'Fine checks, jhumkas, lotus blossoms, and balanced symmetry' },
    { id: 'modern-mandala', label: 'Minimalist Mandala & Wrist Cuff', desc: 'Sacred circular center with contemporary geometric bands' },
    { id: 'glove-finger-henna', label: 'Delicate Finger & Bracelet Henna', desc: 'Lace-like finger details and graceful wrist corsage' }
  ],
  placements: [
    { id: 'full-bridal-hands-feet', label: 'Full Bridal (Hands & Forearms + Feet)', desc: 'Complete wedding ceremony coverage on both sides' },
    { id: 'both-hands-elbows', label: 'Both Hands (Palms & Forearms to Elbows)', desc: 'Traditional extensive ceremony coverage' },
    { id: 'both-hands-wrists', label: 'Both Hands (Palms & Back to Wrists)', desc: 'Popular for sangeet, eid, and wedding guests' },
    { id: 'palms-only', label: 'Palms Only (Both Hands)', desc: 'Front palm focus with fingertip caps' },
    { id: 'feet-ankles', label: 'Bridal Feet & Ankles Only', desc: 'Intricate ankle payal and toe motifs' },
    { id: 'single-statement-hand', label: 'Single Statement Hand', desc: 'Festive one-hand design for casual celebration' }
  ]
};

export const MAKEUP_OPTIONS = {
  looks: [
    { id: 'royal-bridal', label: 'Royal Traditional Bridal Glam', desc: 'Regal defined eyes, radiant skin base, and classic red/maroon lips' },
    { id: 'soft-glam-dewy', label: 'Soft Glam Glass Skin Glow', desc: 'Featherlight dewy base, illuminated cheekbones, and nude velvet pout' },
    { id: 'smokey-sultry', label: 'Smokey Kohl Eye with Soft Nude Lip', desc: 'Dimensional bronze/black smudged eye with balanced neutral tone' },
    { id: 'red-carpet-velvet', label: 'Red Carpet Editorial Velvet Glam', desc: 'Seamless matte base, sculpted contour, and bold statement lip' },
    { id: 'reception-elegance', label: 'Reception & Sangeet Sparkle', desc: 'Fine glitter eyelid wash, dramatic flutter lashes, and gloss' },
    { id: 'daytime-minimalist', label: 'Effortless Daytime Event Elegance', desc: 'Polished "no-makeup" makeup for morning functions and photos' }
  ],
  occasions: [
    { id: 'wedding-ceremony', label: 'Bridal Wedding Ceremony', desc: 'Engineered for high-intensity camera flashes, 14h waterproof wear' },
    { id: 'reception-sangeet', label: 'Reception / Sangeet / Mehndi Night', desc: 'High-energy celebration, sweat-resistant, and dance floor proof' },
    { id: 'engagement-roka', label: 'Engagement / Roka Ceremony', desc: 'Romantic and luminous for intimate stage & family photography' },
    { id: 'graduation-formal', label: 'Graduation / Gala / Formal Dinner', desc: 'Polished sophistication for milestone evening events' },
    { id: 'family-guest', label: 'Wedding Party / Sister of the Bride', desc: 'Complements the wedding party theme without competing with the bride' },
    { id: 'editorial-photoshoot', label: 'Editorial / Pre-Wedding Photoshoot', desc: 'Optimized for natural sunlight, close-ups, and wardrobe changes' }
  ]
};

export const THREADING_OPTIONS = {
  areas: [
    { id: 'eyebrows-only', label: 'Eyebrows Only', desc: 'Precision mapping and organic thread shaping' },
    { id: 'upper-lip-chin', label: 'Upper Lip & Chin', desc: 'Gentle hair removal on lower facial zone' },
    { id: 'full-face', label: 'Full Face Threading', desc: 'Complete forehead, temples, cheeks, lip & chin' },
    { id: 'forehead-eyebrows', label: 'Forehead & Eyebrow Framing', desc: 'Clean hairline definition and sculpted arches' }
  ],
  shapings: [
    { id: 'natural-full-arch', label: 'Natural Full Arch', desc: 'Retains maximum natural thickness with clean lines' },
    { id: 'sharp-defined', label: 'Sharp Crisp High Arch', desc: 'Dramatic lifted tail and defined bottom baseline' },
    { id: 'soft-curve', label: 'Soft Gentle Curve', desc: 'Rounded, gentle feminine contour without harsh angles' },
    { id: 'straight-arch', label: 'Straight Soft Brow', desc: 'Modern youth-enhancing horizontal arch' },
    { id: 'clean-cleanup-only', label: 'Stray Hair Cleanup Only', desc: 'Removes out-of-line strays while preserving natural growth' }
  ]
};

export const WAXING_OPTIONS = {
  areas: [
    { id: 'face-precision', label: 'Facial Waxing (Brows, Lip, Chin)', desc: 'Ultra-delicate stripless peel-off wax' },
    { id: 'underarms', label: 'Underarms', desc: 'Gentle blue stripless wax with soothing chamomile' },
    { id: 'arms-full-half', label: 'Full / Half Arms', desc: 'Italian strip wax for velvety soft arms' },
    { id: 'legs-full-half', label: 'Full / Half Legs', desc: 'Silky hair removal from toes to upper thighs' },
    { id: 'bikini-line', label: 'Bikini Line Grooming', desc: 'Hygienic gentle edging with sensitive skin prep' },
    { id: 'full-body-smoothness', label: 'Full Body Combination', desc: 'Head-to-toe smoothness tailored to your comfort' }
  ],
  comfortPreferences: [
    { id: 'ultra-gentle-stripless', label: 'Ultra-Gentle Stripless Italian Wax', desc: 'Low-temperature peel that grips hair, not skin' },
    { id: 'sensitive-skin-barrier', label: 'Sensitive Skin Barrier Prep', desc: 'Pre-wax soothing oil barrier and talc-free powder' },
    { id: 'post-soothing-aloe', label: 'Soothing Aloe & Lavender Post-Balm', desc: 'Reduces erythema and calms hair follicles instantly' },
    { id: 'low-heat-protocol', label: 'Low-Heat Sensitive Protocol', desc: 'Carefully monitored warm wax for heat-reactive skin' }
  ]
};

export const MASSAGE_OPTIONS = {
  pressures: [
    { id: 'gentle-soothing', label: 'Gentle & Soothing (Swedish Flow)', desc: 'Light rhythmic strokes for deep relaxation and stress relief' },
    { id: 'medium-restorative', label: 'Medium Restorative Pressure', desc: 'Balanced muscle tension release and circulation boost' },
    { id: 'firm-tension-release', label: 'Firm Tension Relief & Acupressure', desc: 'Focused pressure on chronic upper back and shoulder knots' }
  ],
  focusAreas: [
    { id: 'head-scalp-neck', label: 'Scalp, Neck & Shoulder Focus', desc: 'Traditional Champi head massage to melt mental stress' },
    { id: 'upper-lower-back', label: 'Full Spine & Upper Back Knots', desc: 'Targeted shoulder blade and lumbar relaxation' },
    { id: 'arms-legs-feet', label: 'Legs, Calves & Tired Feet Reflexology', desc: 'Revitalizing drainage for active legs and feet' },
    { id: 'full-body-harmony', label: 'Full Body Harmonizing Flow', desc: 'Complete head-to-toe holistic alignment' }
  ],
  oilPreferences: [
    { id: 'warm-herbal-sesame', label: 'Warm Traditional Ayurvedic Herbal Oil', desc: 'Nourishing botanical blend infused with calming herbs' },
    { id: 'pure-sweet-almond', label: 'Pure Sweet Almond & Lavender', desc: 'Silky, vitamin-E rich carrier for deep skin moisture' },
    { id: 'hypoallergenic-jojoba', label: 'Hypoallergenic Unscented Jojoba Oil', desc: 'Zero essential oils for sensitive or reactive skin' }
  ]
};

export const HAIR_TREATMENTS_OPTIONS = {
  goals: [
    { id: 'bond-repair-strength', label: 'Intense Bond Repair & Anti-Breakage', desc: 'Rebuilds broken disulphide bonds from bleach and heat' },
    { id: 'deep-moisture-shine', label: 'Cellular Moisture & Liquid Shine Glaze', desc: 'Quenches dry porous lengths with mirror reflection' },
    { id: 'scalp-detox-clarifying', label: 'Scalp Exfoliation & Follicle Detox', desc: 'Removes product buildup, soothes itchiness and flaking' },
    { id: 'anti-frizz-humidity', label: 'Anti-Frizz Humidity Shield', desc: 'Seals cuticle layer against moisture loss and swelling' }
  ],
  finishes: [
    { id: 'voluminous-blowout', label: 'Bouncy Salon Blowout', desc: 'Weightless lift and soft movement' },
    { id: 'mirror-sleek', label: 'Mirror Glass Flat-Iron Press', desc: 'Ultra-flat reflective finish' },
    { id: 'natural-airdry', label: 'Natural Texture & Wave Definition', desc: 'Gentle diffused drying for organic curls' }
  ]
};

export const LASHES_OPTIONS = {
  styles: [
    { id: 'natural', label: 'Natural Classic (1:1 Contour)', desc: 'One extension per natural lash for clean, mascara-like definition' },
    { id: 'wispy', label: 'Wispy Flutter (Dimensional Spikes)', desc: 'Alternating spikes for an airy, textured modern look' },
    { id: 'cat-eye', label: 'Cat-Eye Flare (Elongated Wings)', desc: 'Shorter inner corners flaring to dramatic winged edges' },
    { id: 'doll-eye', label: 'Doll-Eye Openness (Centered Lift)', desc: 'Longest extensions in center creating doe-eyed symmetry' },
    { id: 'hybrid', label: 'Textured Hybrid (50/50 Balance)', desc: 'Balanced fusion of classic single lashes and volume fans' },
    { id: 'volume', label: 'Russian Glamour Volume (Velvety Density)', desc: 'Handcrafted bouquet fans for continuous dark fullness' }
  ],
  curls: [
    { id: 'j-b-curl', label: 'J / B Curl (Natural Soft)', desc: 'Subtle everyday straight lift' },
    { id: 'c-curl', label: 'C-Curl (Natural Open Eye)', desc: 'Universal lash curler upward curve' },
    { id: 'd-curl', label: 'D-Curl (Dramatic Lift)', desc: 'High-lift curve visible above the eyelid line' },
    { id: 'l-curl', label: 'L-Curl (Straight Lash Specialist)', desc: 'Sharp vertical sweep for straight or downward lashes' }
  ],
  lengths: [
    { id: 'subtle', label: 'Subtle (8mm – 10mm)', desc: 'Understated office & everyday wear' },
    { id: 'medium', label: 'Medium (11mm – 13mm)', desc: 'Versatile day-to-night glamour' },
    { id: 'statement', label: 'Statement (14mm – 16mm)', desc: 'High-drama editorial & gala events' }
  ],
  fullness: [
    { id: 'natural-1-1', label: 'Natural (1:1 Single Lash)', desc: 'One silk strand per natural lash' },
    { id: 'light-volume', label: 'Light Volume (2D – 3D Fans)', desc: 'Soft airy multi-strand fans' },
    { id: 'full-glamour', label: 'Full Glamour (4D – 6D Fans)', desc: 'Velvety density and dark lash line' },
    { id: 'mega-volume', label: 'Mega Density (8D – 10D Fans)', desc: 'Maximum permissible dark volume' }
  ]
};

export const CUSTOM_OCCASIONS = [
  { id: 'wedding-bridal', label: 'Wedding or Bridal Event' },
  { id: 'party-celebration', label: 'Party or Celebration' },
  { id: 'festival', label: 'Festival (Diwali, Eid, Karwa Chauth)' },
  { id: 'birthday', label: 'Birthday / Milestone Celebration' },
  { id: 'everyday-care', label: 'Everyday Care & Maintenance' },
  { id: 'self-care-day', label: 'Self-Care & Personal Pampering' },
  { id: 'other', label: 'Other (Specify Below)' }
];

/**
 * Universal helper that dynamically provides tailored customization controls
 * for ANY service in the entire 85-service salon catalog.
 */
export function getServiceCustomControls(service) {
  if (!service) return null;
  const cat = service.category;

  if (cat === 'hair-cut') {
    return {
      type: 'haircut',
      categoryLabel: 'Haircut & Shaping',
      lengthOptions: HAIR_SERVICES_OPTIONS.hairLengths,
      stylingOptions: HAIR_SERVICES_OPTIONS.stylingPreferences,
      hairstyles: HAIR_SERVICES_OPTIONS.hairstyles
    };
  }

  if (cat === 'hairstyling') {
    return {
      type: 'hairstyling',
      categoryLabel: 'Hairstyling Couture',
      hairstyles: HAIR_SERVICES_OPTIONS.hairstyles,
      stylingOptions: HAIR_SERVICES_OPTIONS.stylingPreferences,
      lengths: HAIR_SERVICES_OPTIONS.hairLengths
    };
  }

  if (cat === 'hair-color') {
    return {
      type: 'hair-colour',
      categoryLabel: 'Hair Colour Atelier',
      techniques: HAIR_COLOUR_OPTIONS.techniques,
      shades: HAIR_COLOUR_OPTIONS.shades
    };
  }

  if (cat === 'hair-treatments') {
    return {
      type: 'hair-treatments',
      categoryLabel: 'Hair Treatments & Spa',
      goals: HAIR_TREATMENTS_OPTIONS.goals,
      finishes: HAIR_TREATMENTS_OPTIONS.finishes
    };
  }

  if (cat === 'facial') {
    return {
      type: 'facial',
      categoryLabel: 'Facial & Skin Care Rituals',
      preferences: SKIN_CARE_OPTIONS.skinPreferences,
      sensitivities: SKIN_CARE_OPTIONS.sensitivities
    };
  }

  if (cat === 'makeup') {
    return {
      type: 'makeup',
      categoryLabel: 'Royal Bridal & Event Makeup',
      looks: MAKEUP_OPTIONS.looks,
      occasions: MAKEUP_OPTIONS.occasions
    };
  }

  if (cat === 'nails') {
    return {
      type: 'nails',
      categoryLabel: 'Nail Art & Couture',
      shapes: NAIL_ART_OPTIONS.shapes,
      colours: NAIL_ART_OPTIONS.colours,
      finishes: NAIL_ART_OPTIONS.finishes,
      designs: NAIL_ART_OPTIONS.designs
    };
  }

  if (cat === 'henna') {
    return {
      type: 'henna',
      categoryLabel: 'Organic Rajasthani Mehndi',
      designs: MEHNDI_OPTIONS.designs,
      placements: MEHNDI_OPTIONS.placements
    };
  }

  if (cat === 'threading') {
    return {
      type: 'threading',
      categoryLabel: 'Precision Facial Threading',
      areas: THREADING_OPTIONS.areas,
      shapings: THREADING_OPTIONS.shapings
    };
  }

  if (cat === 'waxing') {
    return {
      type: 'waxing',
      categoryLabel: 'Silky Italian Waxing',
      areas: WAXING_OPTIONS.areas,
      preferences: WAXING_OPTIONS.comfortPreferences
    };
  }

  if (cat === 'massage') {
    return {
      type: 'massage',
      categoryLabel: 'Holistic Body & Scalp Therapy',
      pressures: MASSAGE_OPTIONS.pressures,
      focusAreas: MASSAGE_OPTIONS.focusAreas,
      oils: MASSAGE_OPTIONS.oilPreferences
    };
  }

  if (cat === 'lashes') {
    return {
      type: 'lashes',
      categoryLabel: 'The Lash Atelier Couture',
      styles: LASHES_OPTIONS.styles,
      curls: LASHES_OPTIONS.curls,
      lengths: LASHES_OPTIONS.lengths,
      fullness: LASHES_OPTIONS.fullness
    };
  }

  // Universal fallback for any other service
  return {
    type: 'universal',
    categoryLabel: service.categoryName || 'Bespoke Salon Service'
  };
}

/**
 * Helper to build clear, comprehensive customer notes summarizing customization
 */
export function formatCustomizationSummaryNotes({
  serviceName,
  categoryTitle,
  selectedOptions,
  customerNotes
}) {
  const parts = [];
  parts.push(`[CUSTOM STUDIO REQUEST: ${categoryTitle} — ${serviceName}]`);

  if (selectedOptions) {
    Object.entries(selectedOptions).forEach(([key, val]) => {
      if (val && typeof val === 'object' && val.label) {
        parts.push(`• ${key}: ${val.label}`);
      } else if (typeof val === 'string' && val.trim()) {
        parts.push(`• ${key}: ${val}`);
      }
    });
  }

  if (customerNotes && customerNotes.trim()) {
    parts.push(`Client Note: "${customerNotes.trim()}"`);
  }

  parts.push(`Pricing: Base approved catalog price applies. Additional custom requests subject to salon consultation and approval.`);
  return parts.join('\n');
}

export const MAINTENANCE_LEVELS = [
  { 
    id: 'low', 
    label: 'Low Maintenance', 
    badge: 'EFFORTLESS', 
    desc: 'Natural styling and low-touch upkeep that grows out gracefully without frequent salon visits.' 
  },
  { 
    id: 'moderate', 
    label: 'Moderate Maintenance', 
    badge: 'BALANCED', 
    desc: 'Polished look with standard 4–6 week touch-ups or occasional home styling rituals.' 
  },
  { 
    id: 'high-glamour', 
    label: 'High Glamour / Frequent Upkeep', 
    badge: 'SIGNATURE COUTURE', 
    desc: 'High-definition, editorial or event finish requiring precision care and regular upkeep.' 
  }
];

export const CUSTOM_STATUSES = {
  DRAFT: 'Draft',
  SUBMITTED: 'Submitted',
  UNDER_REVIEW: 'Under Review',
  AWAITING_CUSTOMER_RESPONSE: 'Awaiting Customer Response',
  QUOTE_PROVIDED: 'Quote Provided',
  APPROVED: 'Approved',
  DECLINED: 'Declined',
  CONVERTED_TO_BOOKING: 'Converted to Booking',
  CANCELLED: 'Cancelled'
};

export const CATALOG_ADDONS_BY_DEPARTMENT = {
  'hair-cut': [
    { id: 'addon-hc-mask', name: 'Deep Nourishing Botanical Hair Mask', price: 15, durationMinutes: 15, desc: 'Ultra-rich argan and shea butter mask to seal cuticles and boost mirror shine.' },
    { id: 'addon-hc-scalp', name: 'Bond-Building Scalp Treatment', price: 25, durationMinutes: 20, desc: 'Exfoliating botanical scalp detox with targeted follicle strengthening serum.' },
    { id: 'addon-hc-gloss', name: 'Argan Thermal Gloss Finishing Press', price: 15, durationMinutes: 15, desc: 'Anti-humidity thermal glazing press for lasting frizz-free glass finish.' }
  ],
  'hairstyling': [
    { id: 'addon-hs-mask', name: 'Deep Hydrating Silk Mask', price: 15, durationMinutes: 15, desc: 'Pre-styling deep hydration treatment for maximum bounce and movement.' },
    { id: 'addon-hs-dupatta', name: 'Bridal Dupatta / Veil & Heavy Jewelry Setting', price: 25, durationMinutes: 20, desc: 'Architectural pinning, heavy fabric anchoring, and secure tikka/matha patti placement.' },
    { id: 'addon-hs-ext-install', name: 'Clip-In Hair Extension Blending & Styling', price: 25, durationMinutes: 20, desc: 'Seamlessly blends your client-provided clip-in hair extensions with natural hair.' }
  ],
  'hair-color': [
    { id: 'addon-col-olaplex', name: 'Olaplex / Bond Rebuilder Infusion', price: 30, durationMinutes: 15, desc: 'Protects disulfide bonds inside hair shaft during chemical lightening or colouring.' },
    { id: 'addon-col-gloss', name: 'Acidic Demi-Gloss & Tone Refresh', price: 35, durationMinutes: 20, desc: 'Seals cuticle, neutralizes brassiness, and imparts 4-week radiant mirror shine.' },
    { id: 'addon-col-lock', name: 'Color-Lock Hydrating Scalp Mask', price: 20, durationMinutes: 15, desc: 'pH-balancing post-color botanical scalp wrap to soothe and lock pigment.' }
  ],
  'hair-treatments': [
    { id: 'addon-ht-steam', name: 'Ultrasonic Cold-Mist Steam Infusion', price: 20, durationMinutes: 15, desc: 'Breaks treatment nutrients into micro-droplets for 3x deeper shaft absorption.' },
    { id: 'addon-ht-kansa', name: 'Kansa Wand Scalp Acupressure', price: 20, durationMinutes: 15, desc: 'Ayurvedic bronze wand massage stimulating marma points to release cranial tension.' }
  ],
  'facial': [
    { id: 'addon-fac-cryo', name: 'Botanical Cryo-Globe Lymphatic Contour', price: 15, durationMinutes: 10, desc: 'Sub-zero cooling globes glide across contours to depuff, firm, and tighten pores.' },
    { id: 'addon-fac-lip', name: 'Collagen & Honey Plumping Lip Sheet', price: 10, durationMinutes: 10, desc: 'Intense peptide hydration restoring dry, chapped lips to supple velvet fullness.' },
    { id: 'addon-fac-neck', name: 'Neck & Décolleté Firming Wrap', price: 25, durationMinutes: 20, desc: 'Targeted botanical firming compress smoothing fine lines on the delicate neck area.' },
    { id: 'addon-fac-eye', name: 'Rose Quartz Depuffing Eye Treatment', price: 18, durationMinutes: 15, desc: 'Caffeine-infused serum paired with cool gemstone therapy to diminish dark circles.' }
  ],
  'makeup': [
    { id: 'addon-mu-lashes', name: '3D Luxury Silk Lashes Application', price: 20, durationMinutes: 15, desc: 'Handcrafted dimensional multi-layer silk lashes tailored to your eye shape.' },
    { id: 'addon-mu-shield', name: '18-Hour Waterproof Setting Shield', price: 15, durationMinutes: 10, desc: 'Pro-grade micro-fine fixative lock ensuring flawless wear through heat and tears.' },
    { id: 'addon-mu-dupatta', name: 'Dupatta / Saree Draping & Pinning', price: 30, durationMinutes: 20, desc: 'Professional pleating, iron-press touchup, and secure safety pinning.' }
  ],
  'nails': [
    { id: 'addon-nl-crystals', name: 'Swarovski Crystal Accent Placements', price: 15, durationMinutes: 15, desc: 'Authentic crystals securely sealed onto 2 accent nails with resin gel.' },
    { id: 'addon-nl-paraffin', name: 'Warm Paraffin Hand Hydration Pack', price: 18, durationMinutes: 15, desc: 'Deep heat soothing wax bath leaving cuticles and knuckles incredibly soft.' },
    { id: 'addon-nl-chrome', name: 'Chrome / Glazed Donut Mirror Powder', price: 12, durationMinutes: 10, desc: 'Iridescent pearl chrome rubbed over entire set for luminous red-carpet shine.' }
  ],
  'henna': [
    { id: 'addon-hn-clove', name: 'Pure Nilgiri & Clove Essential Aftercare Seal', price: 10, durationMinutes: 10, desc: 'Warming botanical oil blend rubbed to deepen stain into rich mahogany tone.' },
    { id: 'addon-hn-glaze', name: 'Lemon-Sugar Glaze & Protective Medical Wrap', price: 10, durationMinutes: 10, desc: 'Binds henna crust to skin for overnight heat retention and darkest color yield.' },
    { id: 'addon-hn-glitter', name: 'Sparkling Henna Glitter Accents', price: 12, durationMinutes: 10, desc: 'Cosmetic-grade shimmer accents dusted onto motifs for photo sessions.' }
  ],
  'threading': [
    { id: 'addon-th-ice', name: 'Cooling Aloe & Rosewater Ice Globes', price: 8, durationMinutes: 5, desc: 'Instant soothing glide calming flushed skin and closing open follicles.' },
    { id: 'addon-th-compress', name: 'Soothing Lavender Anti-Redness Compress', price: 8, durationMinutes: 5, desc: 'Cold botanical compress reducing post-thread sensitivity in minutes.' }
  ],
  'waxing': [
    { id: 'addon-wx-ingrown', name: 'Ingrown Hair Prevention Follicle Treatment', price: 12, durationMinutes: 10, desc: 'Salicylic botanical exfoliation wipe and pore-calming serum.' },
    { id: 'addon-wx-azulene', name: 'Ultra-Soothing Azulene Calming Serum', price: 10, durationMinutes: 5, desc: 'Chamomile-derived azulene extract that instantly neutralizes heat and irritation.' },
    { id: 'addon-wx-paraffin', name: 'Deep Paraffin Hydration Pack for Hands or Feet', price: 15, durationMinutes: 15, desc: 'Warm botanical wax sealing in moisture on exposed extremities.' }
  ],
  'massage': [
    { id: 'addon-ms-kizhi', name: 'Warm Ayurvedic Herbal Potli Compress (Kizhi)', price: 25, durationMinutes: 20, desc: 'Steamed herbal bundle pressed into stiff muscle knots for deep heat relief.' },
    { id: 'addon-ms-foot', name: 'Eucalyptus & Peppermint Foot Scrub', price: 18, durationMinutes: 15, desc: 'Invigorating sea salt exfoliation rejuvenating tired, achy feet.' },
    { id: 'addon-ms-kansa', name: 'Kansa Bronze Wand Tension Release', price: 20, durationMinutes: 15, desc: 'Traditional kansa metal wand balanced with warm sesame oil for deep marma therapy.' }
  ],
  'lashes': [
    { id: 'addon-ls-bath', name: 'Lash Bath & Deep Bubble Prep', price: 12, durationMinutes: 10, desc: 'Gentle micellar foam wash removing natural oils for maximum glue adhesion.' },
    { id: 'addon-ls-plump', name: 'Keratin Lash Plumping Booster', price: 15, durationMinutes: 10, desc: 'Conditioning vitamin serum strengthening natural lash follicles.' }
  ]
};

export const UNIVERSAL_ADDONS = [
  { id: 'addon-uni-scalp', name: 'Express Scalp & Marma Acupressure', price: 15, durationMinutes: 10, desc: 'Targeted head and temple pressure release performed while service is resting.' },
  { id: 'addon-uni-eyepads', name: 'Calming Cucumber & Herbal Eye Compress', price: 12, durationMinutes: 10, desc: 'Chilled botanical pads placed over eyes for serene relaxation during your appointment.' }
];

export function getEligibleAddonsForService(service) {
  if (!service) return UNIVERSAL_ADDONS;
  const dept = service.category;
  const deptAddons = CATALOG_ADDONS_BY_DEPARTMENT[dept] || [];
  return [...deptAddons, ...UNIVERSAL_ADDONS];
}

