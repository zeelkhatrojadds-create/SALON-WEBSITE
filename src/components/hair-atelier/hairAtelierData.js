// Data model and catalog mapping for The Hair Atelier — GLAM GIRL BY JANKI
// All services map directly to authentic, salon-approved master records in salonDatabase.js

export const HAIR_BRAND_PALETTE = {
  deepBlack: '#10110F',
  forestGreen: '#263D2B',
  olive: '#465640',
  sage: '#A8B5A0',
  warmCream: '#F7F4ED',
  border: '#DCE1D8',
};

// =========================================================================
// 1. THE TRANSFORMATION ROOM LOOKS (Haircuts & Style Inspiration)
// =========================================================================
export const TRANSFORMATION_LOOKS = [
  {
    id: 'transform-long-layers',
    title: 'Flowing Botanical Face-Framing Layers',
    length: 'long',
    texture: 'wavy',
    serviceId: 'meera-layer-cut',
    serviceName: 'Meera Layer Cut',
    price: 65,
    duration: '45 min',
    image: '/images/hair-care/54-meera-layer-cut.webp',
    description: 'Precision cascading layers that accentuate cheekbones and natural waves, removing bulk while preserving length and fullness.',
    idealFor: 'Medium to thick hair seeking movement, bounce, and effortless framing.'
  },
  {
    id: 'transform-signature-cut',
    title: 'The Signature Precision Sculpt & Blowout',
    length: 'medium',
    texture: 'straight',
    serviceId: 'noor-signature-haircut',
    serviceName: 'Noor Signature Haircut',
    price: 55,
    duration: '45 min',
    image: '/images/hair-care/53-noor-signature-haircut.webp',
    description: 'Bespoke structural cut mapped to your facial symmetry and hair growth pattern, completed with a glossy salon blowout.',
    idealFor: 'Fine to medium hair craving clean architecture, fullness, and easy home styling.'
  },
  {
    id: 'transform-long-curtain',
    title: 'Sleek Density-Balanced Perimeter Cut',
    length: 'long',
    texture: 'straight',
    serviceId: 'long-hair-cut',
    serviceName: 'Long Hair Cut',
    price: 50,
    duration: '40 min',
    image: '/images/hair-care/56-long-hair-cut.webp',
    description: 'Targeted length preservation with split-end dusting, perimeter alignment, and weight distribution for long, silky tresses.',
    idealFor: 'Clients growing their hair long who want clean, dense ends without losing length.'
  },
  {
    id: 'transform-textured-lob',
    title: 'Textured Collarbone Lob & Edge Trim',
    length: 'short',
    texture: 'textured',
    serviceId: 'classic-trim',
    serviceName: 'Classic Trim',
    price: 35,
    duration: '30 min',
    image: '/images/hair-care/55-classic-trim.webp',
    description: 'Refined collarbone grazing cut with micro-point cutting for airy texture, effortless movement, and instant polish.',
    idealFor: 'Shorter to mid-length styles requiring crisp maintenance and healthy ends.'
  },
  {
    id: 'transform-curly-definition',
    title: 'Hydrated Curl Architecture & Shape',
    length: 'medium',
    texture: 'curly',
    serviceId: 'meera-layer-cut',
    serviceName: 'Meera Layer Cut',
    price: 65,
    duration: '45 min',
    image: '/images/hair-care/meera-layer-cut.webp',
    description: 'Curl-by-curl dimensional shaping designed to prevent the dreaded pyramid effect and encourage springy, defined curl clusters.',
    idealFor: 'Type 2C to 3B waves and curls seeking lift at the crown and uniform bounce.'
  },
  {
    id: 'transform-volume-crown',
    title: 'Airy Feathered Crown & Curtain Fringe',
    length: 'short',
    texture: 'wavy',
    serviceId: 'noor-signature-haircut',
    serviceName: 'Noor Signature Haircut',
    price: 55,
    duration: '45 min',
    image: '/images/hair-care/precision-haircut.webp',
    description: 'Soft curtain fringe paired with internal texture to give natural body and height without daily backcombing.',
    idealFor: 'Anyone wanting soft face-framing softness and modern French-girl fullness.'
  }
];

// =========================================================================
// 2. THE COLOUR ATELIER SHADES (Master Techniques & Catalog Mapping)
// =========================================================================
export const COLOUR_ATELIER_TECHNIQUES = [
  { id: 'all', name: 'All Techniques' },
  { id: 'balayage', name: 'Balayage & Foilyage' },
  { id: 'highlights', name: 'Dimensional Highlights' },
  { id: 'global', name: 'Global Botanical Colour' },
  { id: 'blonde', name: 'Luminous Blonde' },
  { id: 'brunette', name: 'Rich Brunette & Mocha' },
  { id: 'grey-blending', name: 'Grey Blending' }
];

export const COLOUR_ATELIER_SHADES = [
  {
    id: 'shade-noor-balayage',
    name: 'Sun-Kissed Golden Caramel Balayage',
    technique: 'balayage',
    family: 'brunette',
    serviceId: 'noor-balayage',
    serviceName: 'Noor Balayage',
    price: 195,
    duration: '150 min',
    image: '/images/hair-care/58-noor-balayage.webp',
    description: 'Freehand painted seamless transitions starting softly at the roots and blooming into luminous warm honey caramel ribbons through the mid-lengths and ends.',
    maintenance: 'Low (12-16 weeks touchup)',
    glossTone: 'Warm Caramel & Honey Gold'
  },
  {
    id: 'shade-micro-foil-highlights',
    name: 'Multi-Dimensional Micro-Foil Highlights',
    technique: 'highlights',
    family: 'blonde',
    serviceId: 'highlights',
    serviceName: 'Highlights',
    price: 140,
    duration: '110 min',
    image: '/images/hair-care/59-highlights.webp',
    description: 'Ultra-fine foil weaving close to the scalp providing maximum lightness, brilliant reflectivity, and customized tone neutralizers.',
    maintenance: 'Moderate (8-10 weeks)',
    glossTone: 'Pearl Vanilla & Champagne Ash'
  },
  {
    id: 'shade-kesariya-chestnut',
    name: 'Kesariya Botanical Chestnut Glaze',
    technique: 'global',
    family: 'brunette',
    serviceId: 'kesariya-hair-colour',
    serviceName: 'Kesariya Hair Colour',
    price: 85,
    duration: '75 min',
    image: '/images/hair-care/57-kesariya-hair-colour.webp',
    description: 'Ammonia-free conditioning colour infused with Ayurvedic herbal extracts that drenches strands in rich, deep chestnut and radiant mirror shine.',
    maintenance: 'Gentle (6-8 weeks)',
    glossTone: 'Deep Chestnut & Amber Reflect'
  },
  {
    id: 'shade-full-espresso-colour',
    name: 'Velvet Espresso Full Coverage Colour',
    technique: 'global',
    family: 'brunette',
    serviceId: 'full-colour',
    serviceName: 'Full Colour',
    price: 120,
    duration: '90 min',
    image: '/images/hair-care/61-full-colour.webp',
    description: 'Complete root-to-tip uniform colour saturation delivering 100% resilient grey coverage and deep espresso depth.',
    maintenance: 'Regular (5-7 weeks)',
    glossTone: 'Cool Cocoa & Dark Velvet'
  },
  {
    id: 'shade-root-touchup-blend',
    name: 'Precision Root Fusion & Shadow Melt',
    technique: 'grey-blending',
    family: 'grey-blending',
    serviceId: 'root-touch-up',
    serviceName: 'Root Touch-Up',
    price: 60,
    duration: '45 min',
    image: '/images/hair-care/60-root-touch-up.webp',
    description: 'Seamless hairline and part line regrowth coverage that blends invisibly with your existing shade without pigment banding.',
    maintenance: 'Targeted (4-6 weeks)',
    glossTone: 'Custom Matched Base Tone'
  },
  {
    id: 'shade-buttercream-blonde',
    name: 'Buttercream Ribbon Balayage',
    technique: 'balayage',
    family: 'blonde',
    serviceId: 'noor-balayage',
    serviceName: 'Noor Balayage',
    price: 195,
    duration: '150 min',
    image: '/images/hair-care/balayage-highlights.webp',
    description: 'Soft cream-blonde ribbons hand-swept through natural brunette bases with Olaplex fiber reinforcement for silky softness.',
    maintenance: 'Low (12-16 weeks)',
    glossTone: 'Soft Buttercream & Vanilla'
  }
];

// =========================================================================
// 3. THE HAIR RITUAL STUDIO (Concerns & Catalog Treatments)
// =========================================================================
export const HAIR_RITUAL_CONCERNS = [
  {
    id: 'dryness',
    name: 'Dryness & Dehydration',
    description: 'Brittle texture, lack of suppleness, and rough cuticles from Ottawa weather swings.',
    recommendedServiceId: 'deep-conditioning',
    recommendedServiceName: 'Deep Conditioning Treatment',
    price: 55,
    duration: '40 min',
    keyActive: 'Pure Argan & Plant Lipid Complexes',
    ritualSummary: 'Steam-infused lipid replenishment that restores elastic softness in 40 minutes.'
  },
  {
    id: 'damage',
    name: 'Chemical & Heat Damage',
    description: 'Weakened hair bonds, split ends, and porosity from frequent flat ironing or colour.',
    recommendedServiceId: 'noor-hair-repair-ritual',
    recommendedServiceName: 'Noor Hair Repair Ritual',
    price: 95,
    duration: '60 min',
    keyActive: 'Hydrolyzed Keratin & Bond Builders',
    ritualSummary: 'Intensive 4-step structural reconstruction repairing broken keratin chains from inside out.'
  },
  {
    id: 'scalp',
    name: 'Scalp Congestion & Flaking',
    description: 'Buildup from hard water, product residues, itchiness, or excess seasonal sebum.',
    recommendedServiceId: 'scalp-treatment',
    recommendedServiceName: 'Ayurvedic Scalp Purification',
    price: 65,
    duration: '45 min',
    keyActive: 'Tea Tree, Neem & Rosemary Elixirs',
    ritualSummary: 'Detoxifying scalp exfoliation with pressure-point stimulation and circulation massage.'
  },
  {
    id: 'frizz',
    name: 'Frizz & Environmental Stress',
    description: 'Unruly flyaways, dullness, and humidity swelling that resists ordinary serums.',
    recommendedServiceId: 'kesariya-hair-spa',
    recommendedServiceName: 'Kesariya Luxury Hair Spa',
    price: 75,
    duration: '50 min',
    keyActive: 'Saffron Extract & Botanical Oils',
    ritualSummary: 'Royal hot-towel Ayurvedic compress with intensive mask infusion for silk-like smoothness.'
  }
];

export const RITUAL_SERVICES_CATALOG = [
  {
    id: 'kesariya-hair-spa',
    name: 'Kesariya Hair Spa',
    price: 75,
    duration: '50 min',
    image: '/images/hair-care/62-kesariya-hair-spa.webp',
    idealFor: 'Dull, frizzy, and environmentally stressed hair needing luminous silkiness.',
    includes: ['Herbal steam infusion', 'Aromatherapeutic head massage', 'Deep conditioning wrap', 'Blow-dry finish'],
    botanicalActives: 'Saffron, Sweet Almond & Hibiscus'
  },
  {
    id: 'noor-hair-repair-ritual',
    name: 'Noor Hair Repair Ritual',
    price: 95,
    duration: '60 min',
    image: '/images/hair-care/63-noor-hair-repair-ritual.webp',
    idealFor: 'Bleached, chemically processed, or heat-fatigued strands requiring bond restoration.',
    includes: ['Bond-building amino bath', 'Micro-mist penetration cap', 'Cuticle smoothing seal', 'Protective thermal shield'],
    botanicalActives: 'Hydrolyzed Silk, Keratin & Ceramides'
  },
  {
    id: 'deep-conditioning',
    name: 'Deep Conditioning Treatment',
    price: 55,
    duration: '40 min',
    image: '/images/hair-care/64-deep-conditioning.webp',
    idealFor: 'Dry, moisture-depleted hair seeking immediate softness and effortless detangling.',
    includes: ['Purifying wash', 'Hydra-nourishing cream mask', 'Warm towel compress', 'Silkening leave-in finish'],
    botanicalActives: 'Moroccan Argan, Jojoba & Vitamin E'
  },
  {
    id: 'scalp-treatment',
    name: 'Ayurvedic Scalp Purification',
    price: 65,
    duration: '45 min',
    image: '/images/hair-care/65-scalp-treatment.webp',
    idealFor: 'Dry, itchy, or congested scalps needing balanced follicle health and tension relief.',
    includes: ['Gentle enzymatic scalp polish', 'Herbal oil massage therapy', 'Thermal towel steam', 'Balancing clarifying rinse'],
    botanicalActives: 'Rosemary, Neem, Tea Tree & Brahmi'
  }
];

// =========================================================================
// 4. THE STYLING LOUNGE LOOKS
// =========================================================================
export const STYLING_LOUNGE_CATEGORIES = [
  { id: 'all', name: 'All Styles' },
  { id: 'sleek', name: 'Sleek & Polished' },
  { id: 'waves', name: 'Soft Waves & Curls' },
  { id: 'blowout', name: 'Blowouts & Volume' },
  { id: 'updo', name: 'Elegant Updos' },
  { id: 'event', name: 'Occasion & Red-Carpet' }
];

export const STYLING_LOUNGE_LOOKS = [
  {
    id: 'style-rani',
    title: 'Rani Royal Festive Updo & Floral Accent',
    category: 'updo',
    serviceId: 'rani-hair-styling',
    serviceName: 'Rani Hair Styling',
    price: 65,
    duration: '45 min',
    image: '/images/hair-care/49-rani-hair-styling.webp',
    description: 'Sculpted romantic updo with braided crown textures, veil/dupatta security, and lasting evening hold.',
    vibe: 'Regal, elegant, evening-ready'
  },
  {
    id: 'style-hollywood-waves',
    title: 'Lustrous Hollywood Glamour Waves',
    category: 'waves',
    serviceId: 'party-hair-styling',
    serviceName: 'Party Hair Styling',
    price: 75,
    duration: '45 min',
    image: '/images/hair-care/51-party-hair-styling.webp',
    description: 'Glossy, uniform s-curve waves brushed into a mirror-like cascade with anti-humidity thermal setting.',
    vibe: 'Glamorous, red-carpet, photo-perfect'
  },
  {
    id: 'style-silky-blowout',
    title: 'The Signature Feathered Silk Blowout',
    category: 'blowout',
    serviceId: 'blow-dry-styling',
    serviceName: 'Blow Dry & Styling',
    price: 45,
    duration: '30 min',
    image: '/images/hair-care/52-blow-dry-styling.webp',
    description: 'Round-brush blowout delivering maximum root lift, curved ends, and featherweight silk movement that lasts for days.',
    vibe: 'Effortless, buoyant, everyday luxury'
  },
  {
    id: 'style-glass-sleek',
    title: 'Architectural Ultra-Sleek Glass Hair',
    category: 'sleek',
    serviceId: 'blow-dry-styling',
    serviceName: 'Blow Dry & Styling',
    price: 45,
    duration: '30 min',
    image: '/images/hair-care/blow-dry-styling.webp',
    description: 'Pin-straight precision finish with thermal gloss infusion that reflects light like liquid obsidian.',
    vibe: 'Modern, high-fashion, pristine'
  },
  {
    id: 'style-bridal-couture',
    title: 'Couture Bridal Updo & Jewelry Setting',
    category: 'event',
    serviceId: 'bridal-hair-styling',
    serviceName: 'Bridal Hair Styling',
    price: 110,
    duration: '60 min',
    image: '/images/hair-care/50-bridal-hair-styling.webp',
    description: 'Comprehensive bridal masterpiece with anchor pinning for heavy maang tikka, matha patti, and heavy dupattas.',
    vibe: 'Bridal, timeless, resilient all-day hold'
  }
];

// =========================================================================
// 5. THE BRIDAL HAIR GALLERY
// =========================================================================
export const BRIDAL_HAIR_GALLERY = [
  {
    id: 'bridal-regal-bun',
    title: 'Regal Crown Bun with Fresh Floral Halo',
    type: 'Bridal Updo',
    serviceId: 'bridal-hair-styling',
    serviceName: 'Bridal Hair Styling',
    price: 110,
    duration: '60 min',
    image: '/images/hair-care/50-bridal-hair-styling.webp',
    description: 'Architecturally balanced bun positioned comfortably to bear heavy dupattas and bridal jewellery with graceful elegance.',
    features: ['Dupatta pinning & anchor system', 'Maang Tikka balance', '12-hour humidity hold']
  },
  {
    id: 'bridal-bohemian-cascade',
    title: 'Romantic Half-Up Waterfall Curls',
    type: 'Romantic Waves',
    serviceId: 'party-hair-styling',
    serviceName: 'Party Hair Styling',
    price: 75,
    duration: '45 min',
    image: '/images/hair-care/49-rani-hair-styling.webp',
    description: 'Soft, touchable waves with twisted botanical crown detailing for Sangeet nights and outdoor garden weddings.',
    features: ['Airy natural movement', 'Jeweled hair vine integration', 'Anti-frizz serum seal']
  },
  {
    id: 'bridal-textured-glam',
    title: 'Contemporary Textured Low Chignon',
    type: 'Modern Contemporary',
    serviceId: 'bridal-hair-styling',
    serviceName: 'Bridal Hair Styling',
    price: 110,
    duration: '60 min',
    image: '/images/gallery/finishing-touch.webp',
    description: 'Softly gathered low bun with face-framing tendrils and invisible structural support for evening receptions.',
    features: ['Effortless modern aesthetic', 'Veil-friendly silhouette', 'Weightless thermal spray']
  },
  {
    id: 'bridal-mirror-waves',
    title: 'Sculpted Sangeet Hollywood Waves',
    type: 'Reception Glam',
    serviceId: 'party-hair-styling',
    serviceName: 'Party Hair Styling',
    price: 75,
    duration: '45 min',
    image: '/images/gallery/client-mirror.webp',
    description: 'Pristine, synchronized waves that photograph gorgeously under studio lighting and reception flash photography.',
    features: ['High-shine mirror glaze', 'Consistent wave pattern', 'Lightweight flexible hold']
  }
];

// =========================================================================
// 6. INSPIRATION BOARD COMPLETE LOOKS
// =========================================================================
export const INSPIRATION_BOARD_LOOKS = [
  {
    id: 'inspo-1',
    title: 'Bespoke Balayage & Botanical Face Frame',
    category: 'Colour & Styling',
    length: 'long',
    style: 'wavy',
    occasion: 'Everyday & Events',
    image: '/images/hair-care/58-noor-balayage.webp',
    serviceId: 'noor-balayage',
    serviceName: 'Noor Balayage',
    price: 195,
    duration: '150 min',
    caption: 'Soft golden honey ribbons painted to enhance organic wave dimension.'
  },
  {
    id: 'inspo-2',
    title: 'Regal Bridal Styling with Sheer Veil Setting',
    category: 'Bridal Couture',
    length: 'long',
    style: 'updo',
    occasion: 'Bridal Ceremonies',
    image: '/images/hair-care/50-bridal-hair-styling.webp',
    serviceId: 'bridal-hair-styling',
    serviceName: 'Bridal Hair Styling',
    price: 110,
    duration: '60 min',
    caption: 'Securely anchored bridal masterpiece crafted for Ottawa brides.'
  },
  {
    id: 'inspo-3',
    title: 'Noor Signature Precision Sculpt & Blowout',
    category: 'Couture Haircut',
    length: 'medium',
    style: 'straight',
    occasion: 'Professional & Daily',
    image: '/images/hair-care/53-noor-signature-haircut.webp',
    serviceId: 'noor-signature-haircut',
    serviceName: 'Noor Signature Haircut',
    price: 55,
    duration: '45 min',
    caption: 'Clean, intentional lines tailored to unique bone structure.'
  },
  {
    id: 'inspo-4',
    title: 'Kesariya Saffron Scalp & Hair Restoration',
    category: 'Hair Ritual',
    length: 'all',
    style: 'ritual',
    occasion: 'Self-Care & Recovery',
    image: '/images/hair-care/62-kesariya-hair-spa.webp',
    serviceId: 'kesariya-hair-spa',
    serviceName: 'Kesariya Hair Spa',
    price: 75,
    duration: '50 min',
    caption: 'Warm oil and botanical steam immersion for deep lipid recovery.'
  },
  {
    id: 'inspo-5',
    title: 'Voluminous Feathered Blowout Cascade',
    category: 'Salon Blowout',
    length: 'medium',
    style: 'wavy',
    occasion: 'Weekend & Dinners',
    image: '/images/hair-care/52-blow-dry-styling.webp',
    serviceId: 'blow-dry-styling',
    serviceName: 'Blow Dry & Styling',
    price: 45,
    duration: '30 min',
    caption: 'Bouncy, round-brush blowout with thermal shine sealant.'
  },
  {
    id: 'inspo-6',
    title: 'Multi-Tonal Foil Highlights & Gloss Bath',
    category: 'Colour Artistry',
    length: 'long',
    style: 'wavy',
    occasion: 'All Occasions',
    image: '/images/hair-care/59-highlights.webp',
    serviceId: 'highlights',
    serviceName: 'Highlights',
    price: 140,
    duration: '110 min',
    caption: 'High-lift blonde foils paired with an acidic gloss toner bath.'
  },
  {
    id: 'inspo-7',
    title: 'Meera Layered Movement & Texture',
    category: 'Precision Cut',
    length: 'long',
    style: 'textured',
    occasion: 'Everyday Wear',
    image: '/images/hair-care/54-meera-layer-cut.webp',
    serviceId: 'meera-layer-cut',
    serviceName: 'Meera Layer Cut',
    price: 65,
    duration: '45 min',
    caption: 'Airy, dynamic layers removing weight while accentuating length.'
  },
  {
    id: 'inspo-8',
    title: 'Finishing Touch Polish & Thermal Silk',
    category: 'Styling Ritual',
    length: 'medium',
    style: 'wavy',
    occasion: 'Photo Shoots & Parties',
    image: '/images/gallery/finishing-touch.webp',
    serviceId: 'party-hair-styling',
    serviceName: 'Party Hair Styling',
    price: 75,
    duration: '45 min',
    caption: 'Detailed styling check ensuring zero flyaways and lasting shape.'
  }
];

// =========================================================================
// 7. FIND YOUR HAIR EXPERIENCE (Questionnaire Algorithm Rules)
// =========================================================================
export const HAIR_QUESTIONNAIRE = [
  {
    id: 'goal',
    title: '1. What is your primary hair aspiration today?',
    options: [
      { id: 'look', label: 'A Fresh New Look or Haircut', desc: 'Precision reshaping, layers, or perimeter transformation' },
      { id: 'styling', label: 'Polished Styling for an Occasion', desc: 'Blowout, glamorous waves, or bridal updo' },
      { id: 'colour', label: 'Dimensional Hair Colour or Balayage', desc: 'Luminous highlights, grey blending, or rich gloss' },
      { id: 'care', label: 'Deep Hair Care & Ritual Recovery', desc: 'Hydration spa, bond repair, or scalp detox' }
    ]
  },
  {
    id: 'length',
    title: '2. What is your current hair length?',
    options: [
      { id: 'short', label: 'Short Hair', desc: 'Pixie, chin-length bob, or above shoulders' },
      { id: 'medium', label: 'Medium Hair', desc: 'Collarbone grazing to shoulder-blade length' },
      { id: 'long', label: 'Long to Very Long Hair', desc: 'Mid-back or waist-length tresses' }
    ]
  },
  {
    id: 'style',
    title: '3. What aesthetic style reflects your signature vibe?',
    options: [
      { id: 'natural', label: 'Effortless & Natural', desc: 'Low maintenance, organic movement, healthy bounce' },
      { id: 'polished', label: 'Sleek & Polished', desc: 'Architectural lines, glass hair shine, pristine finish' },
      { id: 'voluminous', label: 'Voluminous & Bouncy', desc: 'Big round-brush body, Hollywood glamour waves' },
      { id: 'bold', label: 'Bold & Transformative', desc: 'High-contrast colour, dramatic layers, couture updo' }
    ]
  },
  {
    id: 'consultation',
    title: '4. Would you like a personalized 1-on-1 consultation prior to your treatment?',
    options: [
      { id: 'yes', label: 'Yes, I would love a consultation', desc: 'Discuss strand history, face shape, and custom formulation with Janki' },
      { id: 'no', label: 'No, I have my desired style chosen', desc: 'Explore treatments and care journal directly' }
    ]
  }
];

// =========================================================================
// 8. THE HAIR CARE JOURNAL (6 Editorial Guidance Articles)
// =========================================================================
export const HAIR_CARE_JOURNAL = [
  {
    id: 'journal-heat-protection',
    category: 'Thermal Care',
    readTime: '3 min read',
    title: 'The Science of Thermal Protection: Safeguarding Cuticle Health',
    summary: 'Why styling tools over 350°F melt vital hair lipids and how to establish an impenetrable thermal barrier.',
    content: [
      'Hot styling tools are capable of reaching 450°F (232°C), a temperature at which the alpha-keratin cortex of your hair begins to unravel and surface lipids crystallize.',
      'Always apply a certified thermal protectant containing hydrolysed botanical proteins and dimethicone polymers while hair is still 80% damp.',
      'Allow the thermal mist to absorb before hot tools touch the hair. Never apply flat irons or curling wands to damp hair, as boiling trapped water inside the cortex causes irreversible bubble hair fractures.',
      'Keep hot tool passes to a maximum of two per strand, working in clean, narrow sections rather than lingering on one spot.'
    ],
    salonTips: [
      'Lower flat iron heat to 320°F–350°F for fine or colour-treated hair.',
      'Reapply a drop of botanical oil to seal ends post-styling.'
    ]
  },
  {
    id: 'journal-colour-maintenance',
    category: 'Colour Longevity',
    readTime: '4 min read',
    title: 'Maintaining Salon Colour: Preventing Oxidation & Brassiness',
    summary: 'The secret to keeping your balayage and brunette gloss looking fresh and salon-vibrant between appointments.',
    content: [
      'After a colour or balayage service, the hair cuticle remains slightly porous for 48 to 72 hours as oxidative dye molecules stabilize inside the cortex. Refrain from shampooing during this critical stabilization window.',
      'When you do wash, use only 100% sulfate-free shampoos. Sulfates act as harsh industrial surfactants that strip artificial colour molecules and degrade the outer lipid envelope.',
      'Rinse with cool or lukewarm water. Hot shower water swells the cuticle shingle, allowing micro-pigments to leach down the drain.',
      'For balayage and blonde highlights, incorporate an acidic toning gloss or violet shampoo once every 10 to 14 days to neutralize warm copper undertones.'
    ],
    salonTips: [
      'Schedule a Kesariya gloss refresh at week 6 to restore mirror-like shine.',
      'Install a chlorine shower filter to prevent Ottawa tap minerals from dulling blonde tones.'
    ]
  },
  {
    id: 'journal-washing-cleansing',
    category: 'Washing Rituals',
    readTime: '3 min read',
    title: 'Mindful Washing & Conditioning: The Scalp-First Method',
    summary: 'Transform your daily shower into a restorative spa ritual that preserves natural moisture.',
    content: [
      'Shampoo is engineered for your scalp, not your mid-lengths and ends. Focus your lather on the root zone, gently massaging with finger pads to stimulate micro-circulation without scratching the delicate scalp mantle.',
      'The suds flowing through your ends during rinsing are more than sufficient to cleanse the lengths without stripping essential moisture.',
      'Before applying conditioner or a hair mask, gently press excess water out of your hair with hands or a microfiber cloth. Hair soaked with water cannot absorb conditioning lipids efficiently.',
      'Apply conditioner strictly from ears down, allowing 3 to 5 minutes of dwell time before performing a final cool-water rinse.'
    ],
    salonTips: [
      'Wash 2 to 3 times weekly maximum to allow natural scalp sebum to nurture lengths.',
      'Use a wide-tooth comb to gently distribute conditioner through damp strands.'
    ]
  },
  {
    id: 'journal-deep-hydration',
    category: 'Moisture Balance',
    readTime: '4 min read',
    title: 'Moisture vs Protein: Finding Your Hair’s Perfect Equilibrium',
    summary: 'Diagnosing whether your strands are crying out for water-binding humectants or structural keratin reinforcement.',
    content: [
      'Healthy hair requires a delicate balance of moisture (hydration) and protein (strength). Moisture supplies elasticity and softness, while protein provides tensile strength and backbone.',
      'If your hair stretches excessively and snaps like a rubber band when wet, it is protein-deficient and requires our Noor Hair Repair Ritual with hydrolysed keratin.',
      'If your hair feels stiff, straw-like, coarse, and snaps with zero stretch, it is protein-overloaded and desperately needs moisture-rich treatments like our Deep Conditioning mask with Argan and plant squalane.',
      'Ottawa winters bring severe dry indoor heating that leaches moisture from hair fiber. Counterbalance this with bi-weekly steam hydration rituals.'
    ],
    salonTips: [
      'Alternate between an intensive moisture mask and a light protein treatment weekly.',
      'Never skip leave-in hydrating conditioners in sub-zero Ottawa winter months.'
    ]
  },
  {
    id: 'journal-styling-maintenance',
    category: 'Daily Maintenance',
    readTime: '3 min read',
    title: 'Extending Your Salon Blowout & Silk Sleep Habits',
    summary: 'Simple nighttime habits that protect your hair from overnight friction, tangles, and split ends.',
    content: [
      'Traditional cotton pillowcases act as moisture sponges, absorbing the natural oils and styling serums from your hair while generating abrasive mechanical friction every time you turn your head.',
      'Switching to a 100% 22-momme Mulberry silk pillowcase dramatically reduces overnight friction, eliminates morning bedhead frizz, and keeps your blowouts sleek for up to 4 days.',
      'Before bed, loosely gather your hair into a high pineapple bun secured with a pure silk scrunchie. Never use tight elastic bands with metal clasps that crimp and snap fragile strands.',
      'To revive roots between washes, apply dry shampoo before sleep so it can absorb overnight sebum as it is produced.'
    ],
    salonTips: [
      'Brush hair gently starting from the tips upward using a boar bristle and nylon loop brush.',
      'Sleep on silk to protect delicate face-framing baby hairs from friction breakage.'
    ]
  },
  {
    id: 'journal-post-service-aftercare',
    category: 'Post-Service Care',
    readTime: '3 min read',
    title: 'Atelier Aftercare: Preserving Cut, Colour & Spa Treatments',
    summary: 'Essential guidelines to maximize the value, shape, and longevity of your GLAM GIRL salon investment.',
    content: [
      'Following a haircut at GLAM GIRL BY JANKI, your perimeters are cleanly sealed. Book your maintenance trim every 8 to 10 weeks to prevent microscopic split ends from traveling up the hair shaft.',
      'Following a Kesariya Hair Spa or Scalp Treatment, avoid high-heat styling for 24 hours to let the cold-pressed botanical oils deeply nourish the hair matrix.',
      'Following chemical lightening or balayage, treat your hair like fine cashmere. Avoid chlorine swimming pools without a protective silicone cap and pre-wetting hair with clean tap water.',
      'If you have questions about styling products or techniques between appointments, Janki is always available for patron guidance.'
    ],
    salonTips: [
      'Schedule your next appointment before leaving the studio to secure preferred weekend times.',
      'Always use salon-recommended botanical aftercare designed specifically for your hair type.'
    ]
  }
];

