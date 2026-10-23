// GLAM GIRL BY JANKI — Hair Colour Atelier Master Data
// 8 Master Techniques, Filter Mapping, Signature Inspiration Gallery, Shade Explorer, Before/Afters, and Quiz

export const TECHNIQUE_FILTERS = [
  { id: 'all', label: 'All Techniques' },
  { id: 'natural', label: 'Natural & Subtle' },
  { id: 'dimensional', label: 'Dimensional Colour' },
  { id: 'all-over', label: 'All-Over Colour' },
  { id: 'correction', label: 'Correction & Blending' }
];

export const HAIR_COLOUR_TECHNIQUES = [
  {
    id: 'balayage',
    name: 'Balayage',
    tagline: 'Hand-painted sun-kissed dimension',
    categoryIds: ['dimensional'],
    categoryLabel: 'Dimensional Colour',
    description: 'French freehand technique where lightener is custom-painted across the hair surface for seamless, multi-tonal dimension and an effortless, low-maintenance grow-out.',
    expectedResult: 'Soft ribbons of light concentrated from mid-lengths to ends, mimicking a sun-drenched European holiday.',
    hairConsiderations: 'Works beautifully on medium to long hair lengths across all straight, wavy, and curly textures.',
    maintenance: 'Low: Touch-up every 3 to 5 months with an optional 8-week toner refresh.',
    consultationNotes: 'We examine your natural hair density, wave pattern, and undertones to position brightness where it flatters your cheekbones and jawline.',
    duration: '150 min',
    price: 195,
    serviceId: 'noor-balayage',
    image: '/images/hair-care/58-noor-balayage.webp',
    bestFor: 'Clients desiring natural, dimensional radiance without strict root touch-up schedules.',
    processHighlights: ['Freehand surface painting with clay lightener', 'Custom gloss toner bath', 'Olaplex bond protection & blowout']
  },
  {
    id: 'highlights',
    name: 'Highlights',
    tagline: 'Precision foil brightness from roots to ends',
    categoryIds: ['dimensional'],
    categoryLabel: 'Dimensional Colour',
    description: 'Structured foil placement isolating woven strands from roots to tips, delivering consistent brightness, all-over lifting, and dramatic multi-tonal contrast.',
    expectedResult: 'Vibrant, all-over blonde or caramel illumination distributed evenly from the crown to perimeter.',
    hairConsiderations: 'Adaptable to all lengths from textured bobs to long layers. Suitable for dark, medium, and blonde bases.',
    maintenance: 'Medium: Retouch new growth at the scalp every 8 to 10 weeks.',
    consultationNotes: 'Choose between full foil (maximum all-over lightness) or partial foil (top crown and face-framing illumination).',
    duration: '110 min',
    price: 140,
    serviceId: 'highlights',
    image: '/images/hair-care/59-highlights.webp',
    bestFor: 'Clients looking for maximum lift, distinct contrast, and brightness right up to the scalp.',
    processHighlights: ['Micro-weave foil isolation', 'Scalp-close lifting', 'Neutralizing acidic gloss & blowout']
  },
  {
    id: 'babylights',
    name: 'Babylights',
    tagline: 'Delicate, whisper-thin micro weaves',
    categoryIds: ['natural', 'dimensional'],
    categoryLabel: 'Natural & Subtle',
    description: 'Hyper-fine micro-woven foils that mimic the delicate, sun-brightened hair of childhood. Creates an ultra-soft veil of shimmer that blends seamlessly into natural hair.',
    expectedResult: 'Subtle, luminous shimmer with zero stark stripes or harsh foil lines.',
    hairConsiderations: 'Ideal for fine to medium hair textures, or anyone nervous about taking their first step into hair lightening.',
    maintenance: 'Medium: Soft grow-out allows 10 to 12 weeks between salon visits.',
    consultationNotes: 'Sections are separated in 1mm micro-slices, requiring high precision and patience for seamless results.',
    duration: '120 min',
    price: 155,
    serviceId: 'highlights',
    image: '/images/hair-care/balayage-highlights.webp',
    bestFor: 'Clients wanting subtle illumination, first-time color clients, or delicate face-framing brightness.',
    processHighlights: ['Whisper-thin 1mm foil sections', 'Zero-stripe blend', 'Silk gloss glaze & blowout']
  },
  {
    id: 'ombre',
    name: 'Ombre',
    tagline: 'Dramatic, gradient color transition',
    categoryIds: ['dimensional'],
    categoryLabel: 'Dimensional Colour',
    description: 'A striking horizontal gradient transitioning seamlessly from a deeper, natural or rich root into progressively lighter mid-lengths and luminous ends.',
    expectedResult: 'Bold, high-contrast two-tone gradient with an artistically blurred transition zone.',
    hairConsiderations: 'Most dramatic on medium-to-long hair where the gradient has ample vertical space to blend smoothly.',
    maintenance: 'Very Low: Regrowth leaves the gradient intact; only ends require toning every 4 to 6 months.',
    consultationNotes: 'Can be customized with subtle natural caramel fades or high-contrast platinum ends.',
    duration: '135 min',
    price: 175,
    serviceId: 'noor-balayage',
    image: '/images/hair-care/58-noor-balayage.webp',
    bestFor: 'Statement-makers who want zero-root maintenance and striking color dimension.',
    processHighlights: ['Teased backcomb gradient blur', 'Dual-tone formulation', 'Ends bond-builder seal & blowout']
  },
  {
    id: 'root-melt',
    name: 'Root Melt',
    tagline: 'Seamless shadow root & toner glaze',
    categoryIds: ['natural', 'correction'],
    categoryLabel: 'Correction & Blending',
    description: 'A specialized blending technique where a richer root formula is feathered 2 to 3 inches down the shaft, softening previous foil lines into a lived-in shadow root.',
    expectedResult: 'An effortless, soft root transition that banishes harsh demarcation lines and adds modern depth.',
    hairConsiderations: 'Perfect for existing highlight or balayage clients transitioning to a lower-maintenance routine.',
    maintenance: 'Low: Quick refresh every 6 to 8 weeks to maintain optimal tone gloss.',
    consultationNotes: 'We formulate the melt to harmonize with your natural eyebrow and root shade.',
    duration: '60 min',
    price: 85,
    serviceId: 'root-touch-up',
    image: '/images/hair-care/60-root-touch-up.webp',
    bestFor: 'Eliminating stripy regrowth lines, softening high-contrast highlights, or refreshing faded toner.',
    processHighlights: ['Feathered root tapping', 'Mid-length blend comb', 'Mirror shine acid toner']
  },
  {
    id: 'global-colour',
    name: 'Global Colour',
    tagline: 'All-over rich single-process saturation',
    categoryIds: ['all-over'],
    categoryLabel: 'All-Over Colour',
    description: 'Uniform all-over pigment application from scalp to ends using ammonia-free, botanical-infused formulas for deep saturation, rich tones, and mirror-like shine.',
    expectedResult: 'Rich, uniform color with 100% gray coverage and high-luster light reflectivity.',
    hairConsiderations: 'Suitable for all hair lengths and textures. Choose from deep espresso, warm chestnut, mocha, and auburn.',
    maintenance: 'High: Root touch-up recommended every 4 to 6 weeks as new hair emerges.',
    consultationNotes: 'Our ammonia-free formulation respects scalp sensitivity while delivering long-lasting pigment retention.',
    duration: '75 min',
    price: 85,
    serviceId: 'full-colour',
    image: '/images/hair-care/57-kesariya-hair-colour.webp',
    bestFor: 'Complete color transformations, solid shiny brunettes, or reliable grey coverage.',
    processHighlights: ['Ammonia-free gentle formula', 'Scalp barrier protection', 'Antioxidant seal treatment & blowout']
  },
  {
    id: 'grey-blending',
    name: 'Grey Blending',
    tagline: 'Graceful multi-tonal integration',
    categoryIds: ['natural', 'correction'],
    categoryLabel: 'Natural & Subtle',
    description: 'A modern, artful approach that weaves lowlights and delicate babylights through silver strands to soften contrast, celebrating natural silver without the harsh line of solid dye.',
    expectedResult: 'A soft, sophisticated salt-and-pepper or silver-blonde dimension with zero sudden demarcation line.',
    hairConsiderations: 'Ideal for clients with 20% to 75% natural grey who are tired of rigid 3-week root cycles.',
    maintenance: 'Low to Medium: Requires maintenance only every 10 to 14 weeks.',
    consultationNotes: 'Focuses on graceful blending and artistic camouflage rather than artificial opaque coverage.',
    duration: '105 min',
    price: 135,
    serviceId: 'highlights',
    image: '/images/hair-care/balayage-highlights.webp',
    bestFor: 'Embracing natural silver gracefully with soft, flattering multi-tonal dimension.',
    processHighlights: ['Strategic micro-weave placement', 'Acidic demi-permanent toning', 'Moisture-infusion seal']
  },
  {
    id: 'colour-correction',
    name: 'Colour Correction',
    tagline: 'Customized tone restoration & repair',
    categoryIds: ['correction'],
    categoryLabel: 'Correction & Blending',
    description: 'Advanced bespoke color adjustment designed to neutralize unwanted brassiness, correct uneven banding, remove stubborn box dye buildup, or fix prior color discrepancies.',
    expectedResult: 'Restored tonal harmony, even canvas balance, and reinforced hair fiber integrity.',
    hairConsiderations: 'Every case is unique. Timing and steps depend entirely on hair history, porosity, and past chemical applications.',
    maintenance: 'Varies based on hair condition and target shade roadmap.',
    consultationNotes: 'IMPORTANT: In-person consultation is strictly required before service. Pricing ($100/hr CAD) and duration are confirmed after a strand test.',
    duration: '180+ min (Consultation First)',
    price: 100, // hourly rate or consultation
    isConsultationRequired: true,
    serviceId: 'noor-balayage',
    image: '/images/hair-care/63-noor-hair-repair-ritual.webp',
    bestFor: 'Uneven tones, heavy box dye buildup, green/orange mineral stains, or post-bleach banding.',
    processHighlights: ['In-depth strand elasticity analysis', 'Gentle multi-step color stripping', 'Continuous Olaplex molecular reinforcement']
  }
];

export const COLOUR_INSPIRATION_GALLERY = [
  {
    id: 'inspo-1',
    title: 'Sun-Kissed Honey Balayage',
    techniqueId: 'balayage',
    techniqueName: 'Balayage',
    image: '/images/hair-care/58-noor-balayage.webp',
    vibe: 'Warm Golden Sun',
    tones: 'Caramel & Raw Honey'
  },
  {
    id: 'inspo-2',
    title: 'Dimensional Crown Highlights',
    techniqueId: 'highlights',
    techniqueName: 'Highlights',
    image: '/images/hair-care/59-highlights.webp',
    vibe: 'Bright & Radiant',
    tones: 'Champagne & Vanilla'
  },
  {
    id: 'inspo-3',
    title: 'Whisper-Soft Babylights',
    techniqueId: 'babylights',
    techniqueName: 'Babylights',
    image: '/images/hair-care/balayage-highlights.webp',
    vibe: 'Natural Luminosity',
    tones: 'Subtle Beige Bronde'
  },
  {
    id: 'inspo-4',
    title: 'Espresso Velvet Global Colour',
    techniqueId: 'global-colour',
    techniqueName: 'Global Colour',
    image: '/images/hair-care/57-kesariya-hair-colour.webp',
    vibe: 'Mirror Glass Gloss',
    tones: 'Deep Roasted Mocha'
  },
  {
    id: 'inspo-5',
    title: 'Lived-In Shadow Root Melt',
    techniqueId: 'root-melt',
    techniqueName: 'Root Melt',
    image: '/images/hair-care/60-root-touch-up.webp',
    vibe: 'Effortless Transition',
    tones: 'Dark Ash Root to Honey'
  },
  {
    id: 'inspo-6',
    title: 'Molecular Tone Correction',
    techniqueId: 'colour-correction',
    techniqueName: 'Colour Correction',
    image: '/images/hair-care/63-noor-hair-repair-ritual.webp',
    vibe: 'Tone Restoration',
    tones: 'Neutralized Neutral Blonde'
  }
];

export const COLOUR_FAMILIES_CATALOGUE = [
  {
    id: 'brunette',
    name: 'Brunette',
    tagline: 'Deep velvets, roasted chestnuts & molten chocolates',
    description: 'Timeless, glossy brunette tones offering rich pigment saturation, mirror-like reflectivity, and effortless depth.',
    undertone: 'Neutral to Warm Mocha',
    heroImage: '/images/hair-care/57-kesariya-hair-colour.webp',
    shades: [
      {
        id: 'espresso-brown',
        name: 'Espresso Brown',
        hex: '#231713',
        baseLevel: 'Level 3–4',
        bestSkin: 'All Skin Tones (Fair to Deep)',
        description: 'Deep, velvety roasted coffee shade with cool reflective sheen that exudes understated sophistication and diamond gloss.',
        expectedEffect: 'Ultra-dark, lustrous espresso depth with 100% grey blending and high-gloss light bounce.',
        recommendedTechnique: 'Global Colour or Shadow Root',
        serviceId: 'full-colour',
        image: '/images/hair-care/57-kesariya-hair-colour.webp'
      },
      {
        id: 'chocolate-brown',
        name: 'Chocolate Brown',
        hex: '#3D251E',
        baseLevel: 'Level 4–5',
        bestSkin: 'Warm, Olive & Neutral Tones',
        description: 'Rich, molten cocoa with balanced warm-neutral undertones for a classic, healthy radiance that never looks dull.',
        expectedEffect: 'Silky, multi-dimensional brown with decadent cocoa reflections under natural daylight.',
        recommendedTechnique: 'All-Over Colour or Balayage Lowlights',
        serviceId: 'full-colour',
        image: '/images/hair-care/61-full-colour.webp'
      },
      {
        id: 'mocha-brown',
        name: 'Mocha Brown',
        hex: '#4A332A',
        baseLevel: 'Level 5',
        bestSkin: 'Neutral, Olive & Golden',
        description: 'A harmonious fusion of deep espresso depth and velvety milk-chocolate warmth with subtle coffee undertones.',
        expectedEffect: 'Lived-in, soft-contrast brunette with gentle movement and natural sunlit reflections.',
        recommendedTechnique: 'Balayage or Root Melt',
        serviceId: 'noor-balayage',
        image: '/images/hair-care/58-noor-balayage.webp'
      },
      {
        id: 'caramel-brown',
        name: 'Caramel Brown',
        hex: '#7A4B2A',
        baseLevel: 'Level 6–7',
        bestSkin: 'Warm Golden, Peachy & Tan',
        description: 'Golden bronze-infused brown that weaves amber ribbons of light into dark bases, adding sun-kissed dimension.',
        expectedEffect: 'Sunlit caramel ribbons that visually lift facial features with warm radiance.',
        recommendedTechnique: 'Noor Balayage or Highlights',
        serviceId: 'noor-balayage',
        image: '/images/hair-care/58-noor-balayage.webp'
      },
      {
        id: 'chestnut-brown',
        name: 'Chestnut Brown',
        hex: '#63351C',
        baseLevel: 'Level 5–6',
        bestSkin: 'Warm Peachy, Fair & Warm Olive',
        description: 'A glowing fusion of deep mahogany and roasted hazelnut with warm reddish undertones that flatter complexion warmth.',
        expectedEffect: 'Vibrant autumn warmth with rich reddish-brown reflections and luxurious shine.',
        recommendedTechnique: 'Global Colour or Babylights',
        serviceId: 'full-colour',
        image: '/images/hair-care/57-kesariya-hair-colour.webp'
      },
      {
        id: 'mushroom-brown',
        name: 'Mushroom Brown',
        hex: '#6B5E54',
        baseLevel: 'Level 6–7',
        bestSkin: 'Cool Pink, Neutral & Cool Olive',
        description: 'A modern, earthy cool-toned ash brunette that neutralizes unwanted warmth with smokey taupe elegance.',
        expectedEffect: 'Muted, high-fashion cool brunette with zero brassiness and a soft matte-silk luster.',
        recommendedTechnique: 'Root Melt with Ash Glaze',
        serviceId: 'root-touch-up',
        image: '/images/hair-care/60-root-touch-up.webp'
      }
    ]
  },
  {
    id: 'blonde',
    name: 'Blonde',
    tagline: 'Sun-drenched honeys, champagnes & icy platinums',
    description: 'Luminous lightened expressions ranging from golden sun-kissed warmth to crisp, brass-free Nordic platinums.',
    undertone: 'Golden, Neutral & Icy Vanilla',
    heroImage: '/images/hair-care/59-highlights.webp',
    shades: [
      {
        id: 'honey-blonde',
        name: 'Honey Blonde',
        hex: '#D4AF37',
        baseLevel: 'Level 7–8',
        bestSkin: 'Warm, Peachy & Golden Complexions',
        description: 'Gilded golden-amber blonde mimicking the warm radiance of raw honey and Mediterranean sunshine.',
        expectedEffect: 'Sun-drenched, dimensional blonde ribbons that catch gold reflections in every light.',
        recommendedTechnique: 'Noor Balayage',
        serviceId: 'noor-balayage',
        image: '/images/hair-care/58-noor-balayage.webp'
      },
      {
        id: 'golden-blonde',
        name: 'Golden Blonde',
        hex: '#E0BC58',
        baseLevel: 'Level 8',
        bestSkin: 'Warm & Neutral Olive Complexions',
        description: 'Radiant, buttery blonde illuminated with yellow-gold reflects that infuse vitality into dull hair.',
        expectedEffect: 'Luminous, bright golden aura with buttery smoothness from roots to ends.',
        recommendedTechnique: 'Full Foil Highlights',
        serviceId: 'highlights',
        image: '/images/hair-care/59-highlights.webp'
      },
      {
        id: 'beige-blonde',
        name: 'Beige Blonde',
        hex: '#D9C8A9',
        baseLevel: 'Level 8–9',
        bestSkin: 'Neutral, Olive & Fair',
        description: 'A balanced, quiet luxury blend of warm champagne and soft cool ash for a neutral, natural blonde finish.',
        expectedEffect: 'Effortless creamy beige dimension with balanced reflection and soft grow-out.',
        recommendedTechnique: 'Babylights & Gloss Bath',
        serviceId: 'highlights',
        image: '/images/hair-care/balayage-highlights.webp'
      },
      {
        id: 'champagne-blonde',
        name: 'Champagne Blonde',
        hex: '#E6DCC5',
        baseLevel: 'Level 9',
        bestSkin: 'Cool Pink, Fair & Neutral',
        description: 'Shimmering pale blonde with iridescent cool-neutral sparkle and delicate effervescent pearl tones.',
        expectedEffect: 'Crystal-clear pale blonde that gleams with refined, luxurious brightness.',
        recommendedTechnique: 'Highlights & Acidic Pearl Toner',
        serviceId: 'highlights',
        image: '/images/hair-care/59-highlights.webp'
      },
      {
        id: 'creamy-blonde',
        name: 'Creamy Blonde',
        hex: '#EFE3C3',
        baseLevel: 'Level 9–10',
        bestSkin: 'Fair & Neutral Complexions',
        description: 'Ultra-soft vanilla blonde with pale pearl undertones that delivers a rich, milky velvet glow.',
        expectedEffect: 'Seamless, cloud-soft pale blonde with ultra-fine multi-tonal micro-dimension.',
        recommendedTechnique: 'Micro Babylights & Silk Glaze',
        serviceId: 'highlights',
        image: '/images/hair-care/balayage-highlights.webp'
      },
      {
        id: 'platinum-blonde',
        name: 'Platinum Blonde',
        hex: '#F0ECE1',
        baseLevel: 'Level 10',
        bestSkin: 'Cool Fair & Neutral Porcelain',
        description: 'High-lift icy pure blonde with brilliant clarity, zero brass, and a sleek modern edge.',
        expectedEffect: 'Dramatic, high-impact Scandinavian ice blonde with mirror-like clarity.',
        recommendedTechnique: 'Full Bleach Lift & Olaplex Toner',
        serviceId: 'highlights',
        image: '/images/hair-care/59-highlights.webp'
      }
    ]
  },
  {
    id: 'copper',
    name: 'Copper',
    tagline: 'Spiced apricots, vibrant gingers & gilded ambers',
    description: 'Dynamic metallic coppers and rich autumnal gingers formulated to catch the light with incandescent warmth.',
    undertone: 'Warm Peach, Amber & Metallic Cinnamon',
    heroImage: '/images/hair-care/58-noor-balayage.webp',
    shades: [
      {
        id: 'soft-copper',
        name: 'Soft Copper',
        hex: '#B86842',
        baseLevel: 'Level 6–7',
        bestSkin: 'Fair, Peachy & Warm Neutral',
        description: 'An understated, natural strawberry-amber hue with delicate apricot shimmer and soft organic warmth.',
        expectedEffect: 'Gentle, natural-looking ginger hue that softly awakens fair to medium complexions.',
        recommendedTechnique: 'Demi-Permanent Copper Glaze',
        serviceId: 'full-colour',
        image: '/images/hair-care/58-noor-balayage.webp'
      },
      {
        id: 'copper-gold',
        name: 'Copper Gold',
        hex: '#C67A32',
        baseLevel: 'Level 7',
        bestSkin: 'Warm Golden & Olive Tones',
        description: 'Gilded metallic copper infused with radiant yellow-gold highlights for an energized sunset reflection.',
        expectedEffect: 'Warm metallic shimmer that shifts between burnt amber and golden yellow in moving light.',
        recommendedTechnique: 'Balayage with Copper Toner',
        serviceId: 'noor-balayage',
        image: '/images/hair-care/58-noor-balayage.webp'
      },
      {
        id: 'bright-copper',
        name: 'Bright Copper',
        hex: '#C04618',
        baseLevel: 'Level 6–7',
        bestSkin: 'Fair Peachy, Freckled & Warm',
        description: 'Vibrant, fiery spiced ginger with high-octane saturation, intense reflectivity, and head-turning presence.',
        expectedEffect: 'Bold, high-voltage copper saturation with stunning glossy vitality.',
        recommendedTechnique: 'All-Over High-Luster Colour',
        serviceId: 'full-colour',
        image: '/images/hair-care/57-kesariya-hair-colour.webp'
      },
      {
        id: 'ginger-copper',
        name: 'Ginger Copper',
        hex: '#A54924',
        baseLevel: 'Level 5–6',
        bestSkin: 'Warm, Neutral & Light Olive',
        description: 'Organic earthy terracotta red with warm cinnamon depth inspired by natural Scottish auburns.',
        expectedEffect: 'Deep, rich ginger with earthy terracotta depth and authentic organic warmth.',
        recommendedTechnique: 'Global Colour or Balayage',
        serviceId: 'full-colour',
        image: '/images/hair-care/57-kesariya-hair-colour.webp'
      },
      {
        id: 'copper-blonde',
        name: 'Copper Blonde',
        hex: '#D18758',
        baseLevel: 'Level 8',
        bestSkin: 'Fair, Peachy & Rosy Complexions',
        description: 'Sunlit peach and rose-gold kissed strawberry blonde that blends lightener brightness with warm apricot toner.',
        expectedEffect: 'Playful, pastel-warm strawberry glow that sparkles softly under the sun.',
        recommendedTechnique: 'Babylights & Peach Copper Toner',
        serviceId: 'highlights',
        image: '/images/hair-care/balayage-highlights.webp'
      }
    ]
  },
  {
    id: 'auburn',
    name: 'Auburn',
    tagline: 'Molten terracotta, spiced ciders & mahogany embers',
    description: 'Rich, multi-faceted reddish-browns that bridge classic brunette depth with captivating fiery warmth.',
    undertone: 'Warm Rust, Mahogany & Chestnut Amber',
    heroImage: '/images/hair-care/57-kesariya-hair-colour.webp',
    shades: [
      {
        id: 'light-auburn',
        name: 'Light Auburn',
        hex: '#964B34',
        baseLevel: 'Level 6',
        bestSkin: 'Fair, Rosy & Peachy',
        description: 'Delicate golden russet with soft ginger undertones that brightens face-framing sections naturally.',
        expectedEffect: 'Soft autumnal warmth that brightens brown hair without overwhelming contrast.',
        recommendedTechnique: 'Balayage or Subtle Foils',
        serviceId: 'noor-balayage',
        image: '/images/hair-care/58-noor-balayage.webp'
      },
      {
        id: 'warm-auburn',
        name: 'Warm Auburn',
        hex: '#8C3823',
        baseLevel: 'Level 5–6',
        bestSkin: 'Warm Golden, Peachy & Tan',
        description: 'Rich spiced cider and copper-chestnut radiance that wraps strands in rich, glossy amber warmth.',
        expectedEffect: 'Radiant cinnamon-chestnut glow that feels cozy, luxurious, and dynamic.',
        recommendedTechnique: 'Global Saturation with Gloss Bath',
        serviceId: 'full-colour',
        image: '/images/hair-care/57-kesariya-hair-colour.webp'
      },
      {
        id: 'rich-auburn',
        name: 'Rich Auburn',
        hex: '#7A2C1C',
        baseLevel: 'Level 5',
        bestSkin: 'All Complexions (Neutral to Warm)',
        description: 'Deep molten bronze-red with high-luster reflectivity and balanced chocolate-red undertones.',
        expectedEffect: 'Decadent, deep red-brown luster that catches fiery ruby sparkles in motion.',
        recommendedTechnique: 'Full Colour Single Process',
        serviceId: 'full-colour',
        image: '/images/hair-care/57-kesariya-hair-colour.webp'
      },
      {
        id: 'mahogany-auburn',
        name: 'Mahogany Auburn',
        hex: '#5E2219',
        baseLevel: 'Level 4–5',
        bestSkin: 'Olive, Deep & Neutral Complexions',
        description: 'Sophisticated woodgrain red with rich chocolate base undertones and deep wine-tinged reflections.',
        expectedEffect: 'Smoldering, aristocratic mahogany depth with exceptional multi-angle luster.',
        recommendedTechnique: 'Root Melt or Global Colour',
        serviceId: 'full-colour',
        image: '/images/hair-care/61-full-colour.webp'
      },
      {
        id: 'deep-auburn',
        name: 'Deep Auburn',
        hex: '#4A1913',
        baseLevel: 'Level 3–4',
        bestSkin: 'Deep, Olive & Fair Cool Complexions',
        description: 'Dramatic dark burgundy-chestnut with smoldering warmth that whispers mystery and high shine.',
        expectedEffect: 'Near-black base that reveals gorgeous molten garnet ribbons when light strikes.',
        recommendedTechnique: 'Global Colour with Acidic Glaze',
        serviceId: 'full-colour',
        image: '/images/hair-care/61-full-colour.webp'
      }
    ]
  },
  {
    id: 'burgundy',
    name: 'Burgundy',
    tagline: 'Velvet cabernets, black cherries & deep plum jewels',
    description: 'Opulent, jewel-toned reds with deep violet and ruby reflections designed for high-drama sophistication.',
    undertone: 'Cool Violet, Ruby & Cabernet',
    heroImage: '/images/hair-care/57-kesariya-hair-colour.webp',
    shades: [
      {
        id: 'burgundy-red',
        name: 'Burgundy Red',
        hex: '#721B2B',
        baseLevel: 'Level 4–5',
        bestSkin: 'Cool Pink, Fair & Deep Complexions',
        description: 'Bold crimson-violet jewel tone with striking brilliance and deep romantic velvet intensity.',
        expectedEffect: 'Vibrant, dramatic jewel-toned crimson reflections over dark or lightened hair.',
        recommendedTechnique: 'All-Over Gloss or Ombre',
        serviceId: 'full-colour',
        image: '/images/hair-care/57-kesariya-hair-colour.webp'
      },
      {
        id: 'wine-burgundy',
        name: 'Wine Burgundy',
        hex: '#571626',
        baseLevel: 'Level 4',
        bestSkin: 'Cool Olive, Neutral & Fair',
        description: 'Luxurious deep cabernet tone with velvety cool undertones inspired by vintage Bordeaux wines.',
        expectedEffect: 'Moody, refined wine tones that flatter cool complexions and enhance eye contrast.',
        recommendedTechnique: 'Global Saturation or Root Melt',
        serviceId: 'full-colour',
        image: '/images/hair-care/61-full-colour.webp'
      },
      {
        id: 'deep-plum-burgundy',
        name: 'Deep Plum Burgundy',
        hex: '#441228',
        baseLevel: 'Level 3–4',
        bestSkin: 'Deep, Olive & Neutral Cool',
        description: 'Midnight berry violet that exudes royal elegance, blending purple and burgundy pigments seamlessly.',
        expectedEffect: 'Mysterious, sultry dark plum glow that shines rich berry violet under lighting.',
        recommendedTechnique: 'Global Colour with Violet Booster',
        serviceId: 'full-colour',
        image: '/images/hair-care/61-full-colour.webp'
      },
      {
        id: 'black-cherry',
        name: 'Black Cherry',
        hex: '#300F1C',
        baseLevel: 'Level 2–3',
        bestSkin: 'All Complexions',
        description: 'Inky raven base saturated with rich dark cherry undertones that flash bold red-violet in sunlight.',
        expectedEffect: 'Dramatic dark base that looks black indoors and reveals lustrous ruby cherry outdoors.',
        recommendedTechnique: 'Full Colour Single Process',
        serviceId: 'full-colour',
        image: '/images/hair-care/61-full-colour.webp'
      },
      {
        id: 'burgundy-brown',
        name: 'Burgundy Brown',
        hex: '#4A2127',
        baseLevel: 'Level 4–5',
        bestSkin: 'Warm, Olive & Tan Complexions',
        description: 'Lived-in dark espresso subtly glazed with mulled wine shimmer for wearable, office-ready elegance.',
        expectedEffect: 'Subtle, wearable burgundy infusion over an espresso canvas with soft sheen.',
        recommendedTechnique: 'Root Melt & Gloss Toner',
        serviceId: 'root-touch-up',
        image: '/images/hair-care/60-root-touch-up.webp'
      }
    ]
  },
  {
    id: 'ash',
    name: 'Ash',
    tagline: 'Smoky mushrooms, Nordic silvers & zero-brass neutrals',
    description: 'Ultra-cool, brass-neutralizing tones engineered with violet, graphite, and smoke pigments for pure modern chic.',
    undertone: 'Cool Smoke, Graphite & Violet Neutralizer',
    heroImage: '/images/hair-care/balayage-highlights.webp',
    shades: [
      {
        id: 'ash-brown',
        name: 'Ash Brown',
        hex: '#534B46',
        baseLevel: 'Level 5–6',
        bestSkin: 'Cool Pink, Neutral & Cool Olive',
        description: 'Cool-cast espresso devoid of red or orange brass, featuring muted graphite undertones.',
        expectedEffect: 'Crisp, matte-sheen cool brunette that creates a clean, modern aesthetic.',
        recommendedTechnique: 'Full Colour or Root Melt',
        serviceId: 'full-colour',
        image: '/images/hair-care/60-root-touch-up.webp'
      },
      {
        id: 'ash-blonde',
        name: 'Ash Blonde',
        hex: '#AFA99E',
        baseLevel: 'Level 8–9',
        bestSkin: 'Cool Fair, Porcelain & Neutral',
        description: 'Pale Nordic blonde with violet and graphite cool neutralizing undertones that eliminate brass.',
        expectedEffect: 'Clean, silvery beige-blonde with icy highlights and zero yellow tones.',
        recommendedTechnique: 'Highlights & Acidic Ash Toner',
        serviceId: 'highlights',
        image: '/images/hair-care/balayage-highlights.webp'
      },
      {
        id: 'mushroom-ash',
        name: 'Mushroom Ash',
        hex: '#746B63',
        baseLevel: 'Level 6–7',
        bestSkin: 'Neutral, Olive & Cool',
        description: 'Smoky cool taupe-brown with muted earthy sophistication that balances lightness and depth.',
        expectedEffect: 'Multi-dimensional taupe ribbons that frame the face with subtle modern contrast.',
        recommendedTechnique: 'Noor Balayage with Ash Melt',
        serviceId: 'noor-balayage',
        image: '/images/hair-care/58-noor-balayage.webp'
      },
      {
        id: 'smoky-ash',
        name: 'Smoky Ash',
        hex: '#8A8682',
        baseLevel: 'Level 8',
        bestSkin: 'Cool Fair & Neutral Olive',
        description: 'Charcoal-infused cool pearl with modern edge, providing a soft mist of silvery depth.',
        expectedEffect: 'Distinct smoky silver-grey aura that illuminates modern cuts and bobs.',
        recommendedTechnique: 'Full Bleach Lift & Smoky Toner',
        serviceId: 'highlights',
        image: '/images/hair-care/balayage-highlights.webp'
      },
      {
        id: 'silver-ash',
        name: 'Silver Ash',
        hex: '#BFBEBA',
        baseLevel: 'Level 9–10',
        bestSkin: 'Cool Fair & Silver Blending Clients',
        description: 'Luminous icy metallic grey with ethereal shine, perfect for grey blending or statement coolness.',
        expectedEffect: 'Ultra-reflective metallic silver with zero brass and striking editorial elegance.',
        recommendedTechnique: 'Grey Blending or Bleach & Tone',
        serviceId: 'highlights',
        image: '/images/hair-care/59-highlights.webp'
      }
    ]
  },
  {
    id: 'fantasy',
    name: 'Fantasy Colours',
    tagline: 'Blush roses, lavender mists & electric jewels',
    description: 'Expressive fashion shades formulated with gentle direct dyes and bond-rebuilding elixirs for artistic individuality.',
    undertone: 'Pastel, Jewel Violet, Sapphire & Emerald',
    heroImage: '/images/hair-care/63-noor-hair-repair-ritual.webp',
    shades: [
      {
        id: 'rose-pink',
        name: 'Rose Pink',
        hex: '#C97A8C',
        baseLevel: 'Level 9–10 (Pre-Lightened)',
        bestSkin: 'Cool Fair, Rosy & Peachy',
        description: 'Romantic blush pastel with subtle champagne iridescence that gives a soft editorial fairy-tale wash.',
        expectedEffect: 'Delicate vintage rose shimmer that fades gracefully into soft champagne blonde.',
        recommendedTechnique: 'Bleach Lift & Pastel Glaze',
        serviceId: 'highlights',
        image: '/images/hair-care/63-noor-hair-repair-ritual.webp'
      },
      {
        id: 'pastel-pink',
        name: 'Pastel Pink',
        hex: '#DBA8B5',
        baseLevel: 'Level 10 (Platinum Base)',
        bestSkin: 'Fair & Neutral Complexions',
        description: 'Delicate cotton-candy pink with a whisper-soft powdery finish that glows with youthful charm.',
        expectedEffect: 'Ultra-light baby pink veil that creates a dreamy, whimsical aesthetic.',
        recommendedTechnique: 'Platinum Balayage & Direct Pigment',
        serviceId: 'highlights',
        image: '/images/hair-care/63-noor-hair-repair-ritual.webp'
      },
      {
        id: 'lavender',
        name: 'Lavender',
        hex: '#A798B7',
        baseLevel: 'Level 9–10 (Pre-Lightened)',
        bestSkin: 'Cool Fair, Pale Olive & Neutral',
        description: 'Soft whimsical floral violet with icy cool undertones that cancels pale yellow while radiating lilac mist.',
        expectedEffect: 'Cool, ethereal floral lilac glow with silver-violet reflections.',
        recommendedTechnique: 'Lightening & Pastel Lavender Bath',
        serviceId: 'highlights',
        image: '/images/hair-care/63-noor-hair-repair-ritual.webp'
      },
      {
        id: 'violet',
        name: 'Violet',
        hex: '#5E3875',
        baseLevel: 'Level 7–8',
        bestSkin: 'Cool Olive, Deep & Fair Cool',
        description: 'Deep royal amethyst with vibrant pigment saturation that delivers rich jewel-tone depth.',
        expectedEffect: 'Electric, velvety purple saturation with breathtaking depth under spotlight.',
        recommendedTechnique: 'All-Over Fashion Tint',
        serviceId: 'full-colour',
        image: '/images/hair-care/63-noor-hair-repair-ritual.webp'
      },
      {
        id: 'blue',
        name: 'Blue',
        hex: '#2B4A75',
        baseLevel: 'Level 9–10 (Pre-Lightened)',
        bestSkin: 'Cool & Neutral Complexions',
        description: 'Electric midnight sapphire with jewel-like clarity, evocative of starlit night skies.',
        expectedEffect: 'Rich ocean-sapphire brilliance with striking high-contrast presence.',
        recommendedTechnique: 'Pre-Lighten & Midnight Blue Tint',
        serviceId: 'highlights',
        image: '/images/hair-care/63-noor-hair-repair-ritual.webp'
      },
      {
        id: 'teal',
        name: 'Teal',
        hex: '#236B69',
        baseLevel: 'Level 8–9 (Pre-Lightened)',
        bestSkin: 'Neutral, Olive & Warm Tan',
        description: 'Ocean emerald and deep cyan fusion with vivid multi-tonal peacock sheen.',
        expectedEffect: 'Mesmerizing deep turquoise-emerald luster with rich aquatic iridescence.',
        recommendedTechnique: 'Ombre or Balayage Fashion Glaze',
        serviceId: 'highlights',
        image: '/images/hair-care/63-noor-hair-repair-ritual.webp'
      },
      {
        id: 'silver-grey',
        name: 'Silver Grey',
        hex: '#969B9E',
        baseLevel: 'Level 10 (Clean Platinum)',
        bestSkin: 'Cool Fair & Neutral Complexions',
        description: 'Futuristic titanium metallic with mirror gloss and clean graphite undertones.',
        expectedEffect: 'Sleek, high-polish liquid mercury finish with zero residual warmth.',
        recommendedTechnique: 'Full Lift & Titanium Silver Bath',
        serviceId: 'highlights',
        image: '/images/hair-care/balayage-highlights.webp'
      }
    ]
  }
];

// Re-export SHADE_FAMILIES as an alias for backwards compatibility
export const SHADE_FAMILIES = COLOUR_FAMILIES_CATALOGUE;

export const BEFORE_AFTER_TRANSFORMATIONS = [
  {
    id: 'trans-1',
    title: 'Brassy Yellow to Luminous Ash Balayage',
    technique: 'Balayage & Root Melt Toner',
    time: '2.5 hrs',
    service: 'Noor Balayage ($195 CAD)',
    beforeDesc: 'Uneven brassy orange tones and grown-out foil demarcation lines.',
    afterDesc: 'Seamless cool-toned mushroom balayage with an organic feathered root melt.',
    beforeImage: '/images/hair-care/57-kesariya-hair-colour.webp',
    afterImage: '/images/hair-care/58-noor-balayage.webp'
  },
  {
    id: 'trans-2',
    title: 'Flat Monochrome to Dimensional Caramel Ribbons',
    technique: 'Hand-Painted Babylights & Gloss',
    time: '2 hrs',
    service: 'Full Highlights & Toner ($140 CAD)',
    beforeDesc: 'Monotone dark brown hair lacking movement and dimension.',
    afterDesc: 'Rich honey caramel ribbons weaving through face-framing layers.',
    beforeImage: '/images/hair-care/61-full-colour.webp',
    afterImage: '/images/hair-care/59-highlights.webp'
  },
  {
    id: 'trans-3',
    title: 'High-Contrast Regrowth to Lived-In Root Melt',
    technique: 'Shadow Root & Pearl Gloss',
    time: '1.25 hrs',
    service: 'Root Melt & Tone ($85 CAD)',
    beforeDesc: 'Hard horizontal line from 3 months of natural dark regrowth.',
    afterDesc: 'Blended shadow root transition that extends wear by 8 additional weeks.',
    beforeImage: '/images/hair-care/60-root-touch-up.webp',
    afterImage: '/images/hair-care/balayage-highlights.webp'
  }
];

export const HAIR_COLOUR_QUIZ_QUESTIONS = [
  {
    id: 'baseLevel',
    question: 'What is your current natural hair base level?',
    options: [
      { label: 'Deep Black to Dark Espresso (Level 1–3)', value: 'dark' },
      { label: 'Medium to Dark Chestnut Brown (Level 4–5)', value: 'medium-brown' },
      { label: 'Light Brown or Dark Bronde (Level 6–7)', value: 'light-brown' },
      { label: 'Natural or Lightened Blonde (Level 8–10)', value: 'blonde' }
    ]
  },
  {
    id: 'skinUndertone',
    question: 'What undertone best describes your skin?',
    options: [
      { label: 'Cool (Silver jewelry looks best, veins appear blue/purple)', value: 'cool' },
      { label: 'Warm (Gold jewelry looks best, veins appear greenish)', value: 'warm' },
      { label: 'Neutral (Both gold & silver flatter, balanced undertone)', value: 'neutral' }
    ]
  },
  {
    id: 'maintenance',
    question: 'How often would you like to visit the salon for upkeep?',
    options: [
      { label: 'Ultra Low: Once or twice a year (lived-in balayage)', value: 'low' },
      { label: 'Balanced: Every 8–10 weeks (foil highlights or babylights)', value: 'medium' },
      { label: 'Polished: Every 4–6 weeks (single process or root coverage)', value: 'high' }
    ]
  },
  {
    id: 'vibe',
    question: 'What aesthetic outcome are you dreaming of?',
    options: [
      { label: 'Sun-Kissed & Natural: Effortless ribbons that look like summer in Paris', value: 'natural-balayage' },
      { label: 'High-Impact Brightness: Maximum blonde visibility from crown to ends', value: 'bright-highlights' },
      { label: 'Rich & Glossy: Deep, luxurious chocolate or warm hazelnut depth', value: 'glossy-brunette' },
      { label: 'Lived-In Cool Tones: Smokey ash, mushroom bronde, zero brass', value: 'ash-melt' }
    ]
  }
];

export const COLOUR_PROCESS_STAGES = [
  {
    step: '01',
    id: 'consultation',
    title: 'Personal Consultation',
    eyebrow: 'STAGE 01 • IN-DEPTH ALIGNMENT',
    tagline: 'Understanding your inspiration, lifestyle & hair history',
    summary: 'Every transformation begins with an unhurried, one-on-one conversation in our private Ottawa suite to align on your vision, previous chemical history, and investment.',
    bullets: [
      'Understand your desired look, colour inspiration, daily lifestyle, and maintenance preferences.',
      'Comprehensive review of past chemical treatments, box dyes, henna, or bleach history.',
      'Transparent discussion of realistic lifting thresholds, maintenance schedules, and estimated costs before proceeding.'
    ],
    tips: 'Bring 2–3 photos highlighting both the color placement and tone reflections you admire.',
    ctaText: 'Explore Colour Inspiration',
    ctaLink: '#colour-techniques',
    image: '/images/gallery/client-mirror.webp',
    durationNote: '15–20 minutes dedicated to alignment'
  },
  {
    step: '02',
    id: 'assessment',
    title: 'Hair Assessment',
    eyebrow: 'STAGE 02 • DIAGNOSTIC ANALYSIS',
    tagline: 'Diagnostic fiber health, porosity & technique selection',
    summary: 'A meticulous physical analysis of hair density, elasticity, scalp health, and existing undertones to select the safest, most flattering lightening discipline.',
    bullets: [
      'Assess hair condition, current color levels, previous chemical treatments, and color goals.',
      'Discuss suitable techniques such as Balayage, Highlights, Babylights, Ombre, Root Melt, or Global Colour.',
      'Determine whether strand testing or additional consultation is appropriate (essential for compromised hair).',
      'Explain that color results depend on starting shade, hair history, and cuticle condition.'
    ],
    tips: 'Honesty regarding past home dye or mineral water buildup ensures predictable, beautiful results.',
    ctaText: 'Explore Colour Techniques',
    ctaLink: '#colour-techniques',
    image: '/images/hair-care/63-noor-hair-repair-ritual.webp',
    durationNote: 'Strand elasticity & porosity test'
  },
  {
    step: '03',
    id: 'application',
    title: 'Colour Application',
    eyebrow: 'STAGE 03 • ARTISANAL CRAFTSMANSHIP',
    tagline: 'Precision sectioning, bond protection & controlled processing',
    summary: 'Master artisan Janki applies your custom formula with meticulous sectioning and continuous Olaplex bond reinforcement.',
    bullets: [
      'Present the selected technique and planned colour placement tailored to your facial features.',
      'Explain the application process using elegant, step-by-step artisanal placement.',
      'Highlight professional application, careful sectioning, and appropriate processing according to product instructions.',
      'Note that application and processing times vary by service and hair density.'
    ],
    tips: 'Relax in our tranquil, single-guest suite with artisan tea while your formula gently processes.',
    ctaText: 'Find Your Perfect Shade',
    ctaLink: '#shade-explorer',
    image: '/images/hair-care/57-kesariya-hair-colour.webp',
    durationNote: 'Application & processing vary by service (45–90 min)'
  },
  {
    step: '04',
    id: 'toner-finish',
    title: 'Toner & Finish',
    eyebrow: 'STAGE 04 • REFINEMENT & REVEAL',
    tagline: 'Acidic gloss glaze, blowout styling & final radiance',
    summary: 'The crucial perfecting phase where acidic demi-permanent gloss neutralizes warmth, refines tone, and locks in mirror-like shine.',
    bullets: [
      'Explain how toning may refine warmth, enhance the desired shade, or help create a balanced finish when appropriate.',
      'Showcase the finishing process, blowout styling, and the dramatic final color reveal under natural light.',
      'Visual Before & After comparison showcasing authentic tone neutralization and dimension.',
      'Explain that toning is not required for every color service (e.g., solid single-process darks).'
    ],
    tips: 'Acidic gloss balances hair pH to 4.5–5.5, smoothing the cuticle for maximum shine and color longevity.',
    ctaText: 'View Before & Afters',
    ctaLink: '#transformations',
    image: '/images/hair-care/59-highlights.webp',
    beforeAfter: {
      beforeImage: '/images/hair-care/61-full-colour.webp',
      afterImage: '/images/hair-care/59-highlights.webp',
      caption: 'Before (Flat mono tone) → After (Toned dimensional champagne highlights)'
    },
    durationNote: '20–30 min gloss bath & blowout'
  },
  {
    step: '05',
    id: 'aftercare',
    title: 'Aftercare Guidance',
    eyebrow: 'STAGE 05 • LONGEVITY & HEALTH',
    tagline: 'Personalized home regimen & maintenance roadmap',
    summary: 'Your hair journey continues at home. We provide personalized advice to maintain color vibrancy and hair condition without false promises.',
    bullets: [
      'Provide personalized advice for maintaining color vibrancy, moisture balance, and fiber health.',
      'Guidance on suitable color-safe products, heat protection, and gentle washing routines.',
      'Interactive aftercare checklist allowing clients to review and mark key recommendations as complete.',
      'Transparent maintenance expectations avoiding promises of fixed lifespans or universal schedules.'
    ],
    checklist: [
      { id: 'wash-delay', text: 'Wait 48 hours post-appointment before your first shampoo' },
      { id: 'sulfate-free', text: 'Use salon-grade sulfate-free & acidic color-safe wash' },
      { id: 'cool-water', text: 'Wash and rinse hair with cool or lukewarm water' },
      { id: 'heat-guard', text: 'Apply thermal heat protectant before blow-drying or hot tools' },
      { id: 'toner-refresh', text: 'Schedule a 45-minute toner bath refresh every 8–10 weeks' }
    ],
    tips: 'Color longevity varies naturally with water mineral hardness, wash frequency, and UV exposure.',
    ctaText: 'Book a Consultation',
    ctaLink: '/book-appointment?service=noor-balayage',
    image: '/images/hair-care/balayage-highlights.webp',
    durationNote: 'Ongoing customized beauty roadmap'
  }
];

// ============================================================================
// COLOUR CARE JOURNAL DATA & LUXURY ADVICE CHAPTERS
// ============================================================================

export const COLOUR_FAMILY_CARE_ADVICE = {
  Brunette: {
    title: 'Rich Brunette & Mocha Care',
    eyebrow: 'BRUNETTE • DEPTH & MIRROR LUSTER',
    tips: 'Use anti-oxidant, sulfate-free cleansers to preserve multi-dimensional warmth without turning brassy or muddy. Cold-water rinses enhance mirror shine.',
    recommendedGlaze: 'Demi-permanent espresso or chocolate gloss bath every 10–12 weeks.',
    recommendedProduct: 'Rich argan or camellia oil serum on ends to amplify deep light reflections.'
  },
  Blonde: {
    title: 'Luminous Champagne & Platinum Care',
    eyebrow: 'BLONDE • CLARITY & BRIGHTNESS',
    tips: 'Alternate between gentle moisturizing wash and a targeted violet or pearl toning bath once weekly to neutralize yellow undertones without over-depositing pigment.',
    recommendedGlaze: 'Violet-pearl acidic gloss refresh every 6–8 weeks to keep tone bright and clear.',
    recommendedProduct: 'Bond-building leave-in fluid (Olaplex No. 9) to protect lightened, porous strands.'
  },
  Copper: {
    title: 'Vibrant Copper & Tangerine Care',
    eyebrow: 'COPPER • CHROMATIC INTENSITY',
    tips: 'Red and copper pigments have the largest molecular footprint and rinse out fastest. Wash with lukewarm water only, and use an acidic color-lock conditioner.',
    recommendedGlaze: 'Warm copper or amber demi-glaze refresh every 6 weeks for fiery brilliance.',
    recommendedProduct: 'UV protective leave-in mist to shield sensitive red pigments from sun bleaching.'
  },
  Auburn: {
    title: 'Warm Auburn & Cinnamon Care',
    eyebrow: 'AUBURN • WARM RADIANCE',
    tips: 'Balance moisture and color seal. Auburn tones thrive when cleansed gently with low-lather creamy cleansers that protect natural lipid barriers.',
    recommendedGlaze: 'Cinnamon-gold toner refresh every 8 weeks to maintain rich undertones.',
    recommendedProduct: 'Weightless botanical smoothing cream with thermal protection.'
  },
  Burgundy: {
    title: 'Deep Burgundy & Wine Care',
    eyebrow: 'BURGUNDY • JEWEL-TONED LUSTER',
    tips: 'Preserve deep ruby reflections by limiting wash frequency to 2–3 times weekly. Avoid clarifying shampoos with harsh sulfates that cause rapid fade.',
    recommendedGlaze: 'Rich plum or berry gloss toner every 7–9 weeks.',
    recommendedProduct: 'Silicone-free radiance elixir to highlight jewel-toned depth.'
  },
  Ash: {
    title: 'Cool Ash & Mushroom Bronde Care',
    eyebrow: 'ASH • ZERO BRASS PRECISION',
    tips: 'Ash pigments are most susceptible to warm mineral buildup in tap water. Install a showerhead filter if you have hard water, and use a cool-ash tone deposit mask biweekly.',
    recommendedGlaze: 'Smokey mushroom demi-permanent toner bath every 6–8 weeks.',
    recommendedProduct: 'Blue-ash toning drops blended with your regular deep conditioning mask.'
  },
  'Fantasy Colours': {
    title: 'Vivid Pastel & Fantasy Shade Care',
    eyebrow: 'FANTASY • PIGMENT LOCKDOWN',
    tips: 'Direct dyes sit on the hair cuticle and require strict cold-water washing, dry shampoo between washes, and zero sulfate contact to avoid accelerated fading.',
    recommendedGlaze: 'Direct pigment refresher glaze every 4–6 weeks.',
    recommendedProduct: 'Strict heat limit of 280°F (138°C) with dual-phase thermal barrier spray.'
  }
};

export const HAIR_CONCERN_ADVICE = {
  Dryness: {
    title: 'Targeting Moisture Depletion',
    action: 'Incorporate deep-conditioning masks with hyaluronic acid and shea butter twice weekly.',
    avoid: 'Avoid daily shampooing and high-heat drying on wet strands.'
  },
  Dullness: {
    title: 'Targeting Lack of Shine',
    action: 'Perform a cool-water final rinse to seal cuticles and apply 2 drops of botanical argan serum.',
    avoid: 'Avoid heavy silicone buildup that coats hair and scatters light.'
  },
  Fading: {
    title: 'Targeting Rapid Colour Loss',
    action: 'Switch exclusively to acidic pH (4.5–5.5) cleansers and wash no more than 2–3 times per week.',
    avoid: 'Avoid hot shower water, swimming in chlorinated pools without barrier oils, and clarifying shampoos.'
  },
  Frizz: {
    title: 'Targeting Cuticle Roughness',
    action: 'Sleep on a mulberry silk pillowcase and apply a leave-in smoothing lotion with thermal protection.',
    avoid: 'Avoid rough towel-drying with terry cloth; blot gently with microfibre.'
  },
  'Heat styling': {
    title: 'Targeting Thermal Oxidation',
    action: 'Always mist a 450°F-rated heat protectant and limit flat irons to maximum 330°F–350°F.',
    avoid: 'Avoid pressing irons on damp or unshielded hair; never do multiple passes over the same section.'
  }
};

export const COLOUR_CARE_JOURNAL_CHAPTERS = [
  {
    chapter: '01',
    id: 'washing',
    title: 'Colour-Safe Washing',
    subtitle: 'Gentle Cleansing Protocol',
    tagline: 'Gentle cleansing that respects your toner and scalp balance',
    image: '/images/hair-care/57-kesariya-hair-colour.webp',
    summary: 'Building a thoughtful washing routine is the foundation of long-lasting colour. Water temperature, cleansing frequency, and acidic pH balance determine how long your toner pigments stay locked into the hair cortex.',
    guidelines: [
      'Choose an acidic, sulfate-free shampoo formulated specifically for chemically treated hair to prevent opening the outer cuticle.',
      'Always wash with comfortably lukewarm or cool water; hot water expands the hair fiber and leaches delicate toner molecules prematurely.',
      'Avoid unnecessarily frequent washing when it does not suit your hair or scalp type. 2–3 gentle washes weekly is optimal for most coloured hair.',
      'Follow your salon colorist’s product-specific advice and wait a full 48 hours post-service before your first home shampoo.'
    ],
    checklist: [
      { id: 'wash-1', text: 'Wait 48 hours post-colour service before your first home wash' },
      { id: 'wash-2', text: 'Lather only at the roots using sulfate-free, pH-balanced cleanser' },
      { id: 'wash-3', text: 'Rinse thoroughly with lukewarm or cool water to seal the hair cuticle' },
      { id: 'wash-4', text: 'Apply colour-safe conditioner from mid-lengths to ends, resting 2–3 minutes' },
      { id: 'wash-5', text: 'Gently squeeze water out with a microfibre towel (never rough-dry or rub)' }
    ],
    expandableTips: [
      {
        title: 'Why pH Balance Matters for Coloured Hair',
        text: 'Standard tap water has a neutral to alkaline pH (~7.0–8.0), whereas healthy hair cuticles seal tightly at an acidic pH (4.5–5.5). Acidic shampoo formulas maintain this optimal pH, keeping cuticle scales sealed and preserving luminous color.'
      },
      {
        title: 'Managing Hard Water & Tap Minerals',
        text: 'Mineral deposits such as iron, copper, and chlorine in municipal water can bind to lightened hair, creating stubborn brassiness or greenish tints. A filtered showerhead filter is an effortless salon-grade investment.'
      }
    ]
  },
  {
    chapter: '02',
    id: 'heat',
    title: 'Heat Protection Ritual',
    subtitle: 'Thermal Defense & Styling',
    tagline: 'Minimise thermal stress, colour oxidation & fiber dullness',
    image: '/images/hair-care/58-noor-balayage.webp',
    summary: 'Excessive heat oxidizes toner formulas and evaporates hair moisture, causing vibrant blondes to turn brassy and dark tones to look washed out. Mindful temperature control keeps hair silky and reflective.',
    guidelines: [
      'Always apply an appropriate salon-grade heat protectant spray or barrier cream evenly through damp or dry hair prior to any heat styling.',
      'Dial down hot tool temperatures: Keep flat irons and curling wands between 300°F–350°F (150°C–175°C) for coloured hair, never exceeding 380°F.',
      'Avoid excessive or repeated high-heat passes over the same section of hair, which scorches the cuticle and leaches toner gloss.',
      'Explore air-drying and heat-free styling alternatives such as overnight silk ribbons, loose braids, or cool-diffuser drying.'
    ],
    checklist: [
      { id: 'heat-1', text: 'Distribute thermal protectant evenly from mid-lengths to tips before heat tools' },
      { id: 'heat-2', text: 'Set hot tools to ≤ 350°F (175°C) to prevent oxidising toner gloss' },
      { id: 'heat-3', text: 'Limit heat styling passes to a single, smooth, continuous glide' },
      { id: 'heat-4', text: 'Incorporate 2–3 heat-free styling days into your weekly routine' },
      { id: 'heat-5', text: 'Use ceramic or tourmaline styling tools with precise digital temperature control' }
    ],
    expandableTips: [
      {
        title: 'How Thermal Heat Fades Colour Molecule Bonds',
        text: 'Temperatures exceeding 380°F denature keratin proteins and melt fragile demi-permanent toner pigments. Consistent protection ensures your salon toner lasts up to 8–10 weeks instead of fading in 3.'
      },
      {
        title: 'The Art of Low-Heat & Air-Dry Styling',
        text: 'Allowing hair to air-dry 70–80% before blow-drying reduces thermal exposure by more than half. Finishing with a blast of cool air locks in natural wave formation and adds instant gloss.'
      }
    ]
  },
  {
    chapter: '03',
    id: 'hydration',
    title: 'Hydration & Nourishment',
    subtitle: 'Moisture Replenishment',
    tagline: 'Deep conditioning & elastic fiber replenishment',
    image: '/images/hair-care/63-noor-hair-repair-ritual.webp',
    summary: 'Lightening and chemical colouring alter the hair cortex’s moisture retention capacity. Weekly targeted nourishment restores elasticity, prevents split ends, and ensures hair flows with natural movement.',
    guidelines: [
      'Introduce a nourishing hair mask or deep-conditioning bond treatment once weekly in place of your daily conditioner.',
      'Practice gentle detangling using a wide-tooth comb or flexible wet-brush, working slowly from the ends upward to reduce mechanical stress.',
      'Select hydration products tailored to your hair texture (fine, medium, or coarse) to maintain softness without weighing hair down.',
      'Seal ends with 1–2 drops of weightless botanical oil (such as squalane, argan, or marula) to prevent moisture evaporation.'
    ],
    checklist: [
      { id: 'hyd-1', text: 'Apply a deep hydrating hair mask once weekly for 10–15 minutes' },
      { id: 'hyd-2', text: 'Always detangle gently starting from the ends upward with a wide-tooth comb' },
      { id: 'hyd-3', text: 'Sleep on a 100% pure mulberry silk or satin pillowcase to reduce friction' },
      { id: 'hyd-4', text: 'Incorporate a bond-repair leave-in treatment (e.g. Olaplex No. 3 or No. 9)' },
      { id: 'hyd-5', text: 'Apply 1–2 drops of lightweight hair oil to dry ends before bedtime' }
    ],
    expandableTips: [
      {
        title: 'Balancing Moisture and Protein',
        text: 'Coloured hair needs both hydration (water-binding emollients for suppleness) and protein (amino acids for structural tensile strength). Too much protein makes hair stiff; balance with rich botanical moisture.'
      },
      {
        title: 'Wet Hair Vulnerability & Mechanical Stress',
        text: 'When hair is saturated with water, its hydrogen bonds temporarily break and the fiber stretches up to 30% more before snapping. Gentle combing with a wide-tooth comb is essential.'
      }
    ]
  },
  {
    chapter: '04',
    id: 'shine',
    title: 'Maintain Your Shine',
    subtitle: 'Gloss & Environmental Defense',
    tagline: 'Polished gloss, UV defense & shade-specific longevity',
    image: '/images/hair-care/59-highlights.webp',
    summary: 'A polished, mirror-like finish depends on cuticle smoothness, environmental shielding, and timely toner maintenance. Protect your hair from sun bleaching and mineral oxidation to preserve luminous shine.',
    guidelines: [
      'Gently dry hair using blotting motions with a microfibre towel or 100% cotton T-shirt to smooth cuticle alignment.',
      'Apply an acidic leave-in shine serum or lightweight gloss mist to lock in mirror-like light reflection.',
      'Shield coloured hair from intense UV exposure with a protective hair mist or stylish wide-brim hat during summer months.',
      'Identify early signs of brassiness and schedule a quick 45-minute toner consultation and gloss bath when warmth begins to show.'
    ],
    checklist: [
      { id: 'shine-1', text: 'Mist a UV and environmental barrier shield over styled hair' },
      { id: 'shine-2', text: 'Finish blow-drying with a 30-second cool-shot blast to lock down the cuticle' },
      { id: 'shine-3', text: 'Apply a weightless shine mist or high-gloss serum for luminous light reflection' },
      { id: 'shine-4', text: 'Schedule a professional 45-minute toner gloss refresh every 8–10 weeks' },
      { id: 'shine-5', text: 'Rinse with fresh water before and after swimming in chlorinated pools' }
    ],
    expandableTips: [
      {
        title: 'The Science of Light Reflection & Cuticles',
        text: 'Hair shine is specular reflection: light bouncing cleanly off flat, aligned cuticle scales. When cuticles are raised from bleaching or friction, light scatters diffusely and looks matte. Smoothing serums realign cuticles for instant high-shine.'
      },
      {
        title: 'When to Book a Toner vs. Full Colour',
        text: 'If your root growth is soft and lived-in but your mid-lengths look slightly brassy, you don’t need a costly full lightening service — a quick 45-minute toner bath completely restores tone brilliance.'
      }
    ]
  }
];

