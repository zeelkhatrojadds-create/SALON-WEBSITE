// Complete, comprehensive treatment dataset for Girl Looked For You Girls Salon (Ottawa, Canada)
// All pricing in CAD (editable salon sample pricing)

export const CATEGORIES = [
  { id: 'all', name: 'All Services', icon: 'Sparkles', slug: 'all' },
  { id: 'hair', name: 'Hair Care', icon: 'Scissors', slug: 'hair-care' },
  { id: 'skin', name: 'Skin Care', icon: 'Sparkles', slug: 'skin-care' },
  { id: 'nails', name: 'Nail Care', icon: 'Hand', slug: 'nail-care' },
  { id: 'makeup', name: 'Makeup', icon: 'Palette', slug: 'makeup' },
  { id: 'spa', name: 'Spa & Wellness', icon: 'Flower2', slug: 'spa-wellness' },
  { id: 'waxing', name: 'Hair Removal & Extras', icon: 'Sparkle', slug: 'hair-removal' }
];

export const SERVICE_BENEFITS = [
  {
    id: 1,
    title: 'Certified Professionals',
    subtitle: 'Skilled professionals with years of experience',
    icon: 'ShieldCheck'
  },
  {
    id: 2,
    title: 'Premium Products',
    subtitle: 'Safe and high-quality beauty products',
    icon: 'Sparkles'
  },
  {
    id: 3,
    title: 'Hygienic & Safe',
    subtitle: 'Clean and comfortable salon environment',
    icon: 'Sparkle'
  },
  {
    id: 4,
    title: 'Relaxing Ambience',
    subtitle: 'A peaceful and welcoming beauty experience',
    icon: 'Heart'
  }
];

export const ALL_SERVICES = [
  // ==========================================
  // HAIR CARE (20 Treatments)
  // ==========================================
  {
    id: 'womens-haircut',
    name: "Women's Haircut",
    category: 'hair',
    categoryName: 'Hair Care',
    price: 45,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    description: "Customized precision haircut tailored to your facial structure, lifestyle, and hair texture.",
    features: ['Consultation & texture assessment', 'Custom shears haircut', 'Light texturizing', 'Quick style check']
  },
  {
    id: 'haircut-styling',
    name: 'Haircut & Styling',
    category: 'hair',
    categoryName: 'Hair Care',
    price: 65,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
    description: 'Master haircut followed by a luxurious shampoo ritual and signature voluminous blow dry.',
    features: ['Clarifying wash & scalp massage', 'Precision master cut', 'Volumizing round brush blow dry', 'Shine mist finish']
  },
  {
    id: 'blow-dry',
    name: 'Blow Dry',
    category: 'hair',
    categoryName: 'Hair Care',
    price: 35,
    duration: '35 min',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Express professional blow dry for smooth, bouncy, frizz-free locks for your day or evening.',
    features: ['Heat protectant infusion', 'Round brush sculpt', 'Volume lift', 'Anti-humidity lock']
  },
  {
    id: 'hair-wash-blow-dry',
    name: 'Hair Wash & Blow Dry',
    category: 'hair',
    categoryName: 'Hair Care',
    price: 45,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    description: 'Invigorating double shampoo wash, botanical conditioning mask, and expert bouncy blow dry.',
    features: ['Aromatherapeutic head wash', 'Hydrating conditioner', 'Full blowout', 'Gloss drop glaze']
  },
  {
    id: 'hair-colour',
    name: 'Hair Colour',
    category: 'hair',
    categoryName: 'Hair Care',
    price: 85,
    duration: '90 min',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80',
    description: 'Single-process ammonia-free hair colouring delivering rich pigments, shine, and complete gray coverage.',
    features: ['Skin-tone custom mix', 'Scalp barrier shield', 'Ammonia-free formula', 'Post-colour nourishment']
  },
  {
    id: 'root-touch-up',
    name: 'Root Touch-Up',
    category: 'hair',
    categoryName: 'Hair Care',
    price: 60,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    description: 'Targeted root colour matching to conceal regrowth and maintain consistent vibrant tones.',
    features: ['Up to 1.5 inches regrowth coverage', 'Seamless shade blending', 'Nourishing rinse', 'Quick blow dry']
  },
  {
    id: 'full-hair-colour',
    name: 'Full Hair Colour',
    category: 'hair',
    categoryName: 'Hair Care',
    price: 110,
    duration: '105 min',
    image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=800&q=80',
    description: 'Complete transformation from roots to tips with radiant multi-tonal dimensional colour.',
    features: ['Root-to-end full application', 'Bond-protecting additive', 'Color-lock masque', 'Blow dry styling']
  },
  {
    id: 'balayage',
    name: 'Balayage',
    category: 'hair',
    categoryName: 'Hair Care',
    price: 185,
    duration: '150 min',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-painted sun-kissed gradients with seamless transition and low maintenance grow-out.',
    features: ['Bespoke freehand painting', 'Gloss toner glaze', 'Olaplex bond treatment', 'Signature wave finish']
  },
  {
    id: 'highlights',
    name: 'Highlights',
    category: 'hair',
    categoryName: 'Hair Care',
    price: 140,
    duration: '120 min',
    image: 'https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?auto=format&fit=crop&w=800&q=80',
    description: 'Precision foil highlights for maximum contrast, brightness, and illuminated dimension.',
    features: ['Full or half head foils', 'Custom lifting level', 'Toner equalization', 'Conditioning treatment']
  },
  {
    id: 'ombre-hair',
    name: 'Ombre Hair',
    category: 'hair',
    categoryName: 'Hair Care',
    price: 165,
    duration: '135 min',
    image: 'https://images.unsplash.com/photo-1500840216050-6ffa99d75160?auto=format&fit=crop&w=800&q=80',
    description: 'Graduated color melt transitioning from darker roots to luminous, lighter ends.',
    features: ['Color melt transition', 'Custom gradient matching', 'Gloss sealant', 'Blowout styling']
  },
  {
    id: 'hair-glossing',
    name: 'Hair Glossing',
    category: 'hair',
    categoryName: 'Hair Care',
    price: 55,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80',
    description: 'Translucent conditioning gloss that neutralizes brassiness and adds mirror-like shine.',
    features: ['Acidic pH shine enhancer', 'Brass neutralization', 'Deep hydration', 'Lasts up to 6 weeks']
  },
  {
    id: 'hair-spa',
    name: 'Hair Spa',
    category: 'hair',
    categoryName: 'Hair Care',
    price: 85,
    duration: '60 mins',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    description: 'Relaxing hair spa treatment for soft, shiny and healthy hair. Includes massage, nutrition and deep conditioning.',
    benefits: [
      'Improves hair texture',
      'Reduces hair fall',
      'Deep conditioning',
      'Full relaxation'
    ],
    features: ['Herbal steam infusion', 'Aromatherapeutic head massage', 'Deep moisture cream bath', 'Blowout finish']
  },
  {
    id: 'deep-conditioning-treatment',
    name: 'Deep Conditioning Treatment',
    category: 'hair',
    categoryName: 'Hair Care',
    price: 50,
    duration: '40 min',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    description: 'Intense moisture infusion formula designed to repair parched, chemically treated, or brittle hair.',
    features: ['Keratin & Argan oil mask', 'Infrared absorption boost', 'Cuticle smoothing', 'Frizz protection']
  },
  {
    id: 'keratin-treatment',
    name: 'Keratin Treatment',
    category: 'hair',
    categoryName: 'Hair Care',
    price: 220,
    duration: '180 min',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80',
    description: 'Formaldehyde-free smoothing complex that eliminates frizz and cuts blow dry time in half for months.',
    features: ['Deep cleansing prep', 'Pure keratin infusion', 'Thermal lock seal', 'Silky 4-month longevity']
  },
  {
    id: 'hair-smoothening',
    name: 'Hair Smoothening',
    category: 'hair',
    categoryName: 'Hair Care',
    price: 195,
    duration: '150 min',
    image: 'https://images.unsplash.com/photo-1584297091622-af8e5fd70a33?auto=format&fit=crop&w=800&q=80',
    description: 'Gentle protein-enriching system that relaxes unruly waves into silky, manageable tresses.',
    features: ['Botanical protein formula', 'Gentle wave softening', 'Nutrient sealing', 'High shine finish']
  },
  {
    id: 'hair-straightening',
    name: 'Hair Straightening',
    category: 'hair',
    categoryName: 'Hair Care',
    price: 230,
    duration: '180 min',
    image: 'https://images.unsplash.com/photo-1519735777090-ec97162dc266?auto=format&fit=crop&w=800&q=80',
    description: 'Permanent thermal reconditioning for pin-straight, ultra-sleek, glassy hair.',
    features: ['Strand porosity testing', 'Thermal straightening irons', 'Neutralizing cream', 'Intensive post-care mask']
  },
  {
    id: 'hair-styling',
    name: 'Hair Styling',
    category: 'hair',
    categoryName: 'Hair Care',
    price: 55,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Hollywood waves, textured beach curls, or sleek straightened styling for dinner & events.',
    features: ['Heat defense prep', 'Hot tool styling', 'Setting spray lock', 'Luminous shine finish']
  },
  {
    id: 'bridal-hair-styling',
    name: 'Bridal Hair Styling',
    category: 'hair',
    categoryName: 'Hair Care',
    price: 150,
    duration: '90 min',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    description: 'Intricate bridal updos, braided crowns, dupatta/veil setting, and luxury floral accessory pinning.',
    features: ['Bridal consultation', 'Textured updo structure', 'Veil / dupatta pinning', 'All-day security lock']
  },
  {
    id: 'party-hair-styling',
    name: 'Party Hair Styling',
    category: 'hair',
    categoryName: 'Hair Care',
    price: 75,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80',
    description: 'Glamorous half-up hairstyles, textured messy buns, or romantic braided styles for parties.',
    features: ['Backcombing volume base', 'Curling & pinning', 'Accessory placement', 'Long-lasting hold']
  },
  {
    id: 'hair-consultation',
    name: 'Hair Consultation',
    category: 'hair',
    categoryName: 'Hair Care',
    price: 25,
    duration: '20 min',
    image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=800&q=80',
    description: 'One-on-one scalp, porosity, and color diagnostic consultation with our master colorist.',
    features: ['Scalp camera analysis', 'Skin-tone color swatching', 'Custom treatment roadmap', 'Fee credited toward service']
  },

  // ==========================================
  // SKIN CARE & FACIALS (15 Treatments)
  // ==========================================
  {
    id: 'classic-facial',
    name: 'Classic Facial',
    category: 'skin',
    categoryName: 'Skin Care',
    price: 65,
    duration: '50 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    description: 'Essential refreshing facial featuring gentle cleansing, exfoliation, steam, and customized hydration mask.',
    features: ['Double cleanse', 'Enzyme exfoliation', 'Warm towel steam', 'Custom soothing mask']
  },
  {
    id: 'deep-cleansing-facial',
    name: 'Deep Cleansing Facial',
    category: 'skin',
    categoryName: 'Skin Care',
    price: 85,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1512290900672-1f02e60938c5?auto=format&fit=crop&w=800&q=80',
    description: 'Pore decongesting treatment with gentle extractions, purifying clay mask, and high-frequency antibacterial care.',
    features: ['Pore unclogging steam', 'Manual comedone extraction', 'Purifying clay mask', 'High frequency therapy']
  },
  {
    id: 'hydrating-facial',
    name: 'Hydrating Facial',
    category: 'skin',
    categoryName: 'Skin Care',
    price: 80,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Quenches dry and dehydrated skin with hyaluronic acid infusions and a soothing rosewater hydro-jelly mask.',
    features: ['Hyaluronic multi-layer serum', 'Hydro-jelly mask', 'Cryo-globe massage', 'Barrier renewal cream']
  },
  {
    id: 'brightening-facial',
    name: 'Brightening Facial',
    category: 'skin',
    categoryName: 'Skin Care',
    price: 95,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Ayurvedic Kumkumadi and botanical alpha-arbutin treatment to diminish sunspots and restore luminous glow.',
    features: ['Sandalwood exfoliation', 'Kumkumadi oil lymphatic massage', 'Brightening botanical pack', 'Sun defense seal']
  },
  {
    id: 'anti-aging-facial',
    name: 'Anti-Aging Facial',
    category: 'skin',
    categoryName: 'Skin Care',
    price: 115,
    duration: '75 min',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    description: 'Collagen-stimulating facial with peptide serums, Gua Sha contouring, and firming bio-cellulose mask.',
    features: ['Peptide complex infusion', 'Rose quartz Gua Sha sculpt', 'Collagen firming sheet', 'Micro-current toning']
  },
  {
    id: 'acne-care-facial',
    name: 'Acne Care Facial',
    category: 'skin',
    categoryName: 'Skin Care',
    price: 90,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1512290900672-1f02e60938c5?auto=format&fit=crop&w=800&q=80',
    description: 'Calming and clarifying treatment with salicylic acid, tea tree essence, and soothing blue LED therapy.',
    features: ['Salicylic pore scrub', 'Gentle extraction', 'Tea tree clarifying mask', 'Blue LED light therapy']
  },
  {
    id: 'sensitive-skin-facial',
    name: 'Sensitive Skin Facial',
    category: 'skin',
    categoryName: 'Skin Care',
    price: 80,
    duration: '50 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    description: 'Fragrance-free, hypoallergenic facial with chamomile, centella asiatica, and cooling aloe-vera compress.',
    features: ['Ultra-gentle cleanser', 'Centella calming mask', 'Chilled rose quartz balls', 'Ceramide barrier cream']
  },
  {
    id: 'vitamin-c-facial',
    name: 'Vitamin C Facial',
    category: 'skin',
    categoryName: 'Skin Care',
    price: 100,
    duration: '65 min',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Potent antioxidant therapy to fight environmental stressors, boost radiance, and even skin tone.',
    features: ['Pure Vitamin C 20% serum', 'Citrus enzyme peel', 'Oxygen infusion mist', 'Radiance moisturizer']
  },
  {
    id: 'gold-facial',
    name: 'Gold Facial',
    category: 'skin',
    categoryName: 'Skin Care',
    price: 135,
    duration: '75 min',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    description: 'Luxurious 24K pure gold leaf facial that improves cellular renewal and leaves skin royally radiant.',
    features: ['24K gold foil application', 'Gold serum ionization', 'Lymphatic face massage', 'Illuminating gold mask']
  },
  {
    id: 'express-facial',
    name: 'Express Facial',
    category: 'skin',
    categoryName: 'Skin Care',
    price: 45,
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Quick pick-me-up facial for busy girls: rapid exfoliation, hydrating mask, and glow moisturizer.',
    features: ['Express cleanse', 'Gently polishing scrub', 'Quick glow mask', 'SPF hydration']
  },
  {
    id: 'face-cleanup',
    name: 'Face Cleanup',
    category: 'skin',
    categoryName: 'Skin Care',
    price: 50,
    duration: '35 min',
    image: 'https://images.unsplash.com/photo-1512290900672-1f02e60938c5?auto=format&fit=crop&w=800&q=80',
    description: 'Traditional herbal cleanup targeting blackheads, excess oil, and surface impurities.',
    features: ['Herbal face wash', 'Mild steam & nose strip', 'Neem/Tulsi pack', 'Rose water toner']
  },
  {
    id: 'back-facial',
    name: 'Back Facial',
    category: 'skin',
    categoryName: 'Skin Care',
    price: 90,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Comprehensive clarifying treatment for the hard-to-reach back area; exfoliates and clears congestion.',
    features: ['Deep back cleanse', 'Sea salt scrub exfoliation', 'Back extractions', 'Purifying mud pack']
  },
  {
    id: 'skin-consultation',
    name: 'Skin Consultation',
    category: 'skin',
    categoryName: 'Skin Care',
    price: 25,
    duration: '20 min',
    image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=800&q=80',
    description: 'Professional skin diagnostic assessing hydration, barrier health, and customized home care advice.',
    features: ['Digital moisture scan', 'Skin type classification', 'Product recommendations', 'Credited toward facial']
  },
  {
    id: 'chemical-peel',
    name: 'Chemical Peel',
    category: 'skin',
    categoryName: 'Skin Care',
    price: 110,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    description: 'Superficial glycolic or lactic acid peel to smooth texture, diminish fine lines, and renew skin clarity.',
    features: ['Pre-peel skin prep', 'Custom AHA/BHA peel solution', 'Neutralizing cold compress', 'Post-peel balm']
  },
  {
    id: 'face-mask-treatment',
    name: 'Face Mask Treatment',
    category: 'skin',
    categoryName: 'Skin Care',
    price: 40,
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    description: 'Targeted booster mask therapy chosen specifically for hydration, soothing redness, or detox.',
    features: ['Gentle cleanse', 'Custom botanical mask', 'Neck & shoulder rub', 'Day serum seal']
  },

  // ==========================================
  // HAIR REMOVAL & BEAUTY EXTRAS (12 Treatments)
  // ==========================================
  {
    id: 'eyebrow-threading',
    name: 'Eyebrow Threading',
    category: 'waxing',
    categoryName: 'Hair Removal & Beauty Extras',
    price: 15,
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    description: 'Authentic Indian cotton thread technique for crisp, symmetrical brow arches with zero chemical irritation.',
    features: ['Custom brow mapping', 'Precision cotton thread shaping', 'Soothing aloe-vera gel', 'Brow comb finish']
  },
  {
    id: 'upper-lip-threading',
    name: 'Upper Lip Threading',
    category: 'waxing',
    categoryName: 'Hair Removal & Beauty Extras',
    price: 10,
    duration: '10 min',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Quick, precise hair removal from upper lip leaving skin silky smooth and foundation-ready.',
    features: ['Sanitized thread', 'Rapid removal', 'Cooling rosewater dab', 'Zero redness formula']
  },
  {
    id: 'full-face-threading',
    name: 'Full Face Threading',
    category: 'waxing',
    categoryName: 'Hair Removal & Beauty Extras',
    price: 40,
    duration: '35 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    description: 'Complete facial hair removal covering brows, upper lip, chin, sideburns, and forehead.',
    features: ['Brows, lip, chin, sides', 'Fine peach fuzz removal', 'Calming cucumber compress', 'Skin soothing lotion']
  },
  {
    id: 'eyebrow-waxing',
    name: 'Eyebrow Waxing',
    category: 'waxing',
    categoryName: 'Hair Removal & Beauty Extras',
    price: 18,
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    description: 'Warm soothing hard wax shaping for ultra-defined, clean brow lines lasting up to 4 weeks.',
    features: ['Hypoallergenic hard wax', 'Precision spatulas', 'Calming azulene oil', 'Soothing finish']
  },
  {
    id: 'upper-lip-waxing',
    name: 'Upper Lip Waxing',
    category: 'waxing',
    categoryName: 'Hair Removal & Beauty Extras',
    price: 12,
    duration: '10 min',
    image: 'https://images.unsplash.com/photo-1512290900672-1f02e60938c5?auto=format&fit=crop&w=800&q=80',
    description: 'Gentle, fast-acting depilatory wax for delicate upper lip hair with minimum redness.',
    features: ['Sensitive skin wax', 'Quick gentle pull', 'Cooling after-wax balm', 'Hydration barrier']
  },
  {
    id: 'full-face-waxing',
    name: 'Full Face Waxing',
    category: 'waxing',
    categoryName: 'Hair Removal & Beauty Extras',
    price: 45,
    duration: '40 min',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    description: 'Full facial gentle wax including forehead, cheeks, lip, and chin for glass-smooth makeup glide.',
    features: ['Pre-wax cleanser', 'Full face gentle waxing', 'Post-wax ice globe massage', 'Aloe soothing mask']
  },
  {
    id: 'underarm-waxing',
    name: 'Underarm Waxing',
    category: 'waxing',
    categoryName: 'Hair Removal & Beauty Extras',
    price: 25,
    duration: '20 min',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Smooth underarm waxing with peel-off hard wax leaving skin hair-free for 3 to 5 weeks.',
    features: ['Gentle stripless wax', 'Root hair removal', 'Ingrown prevention lotion', 'Silk smooth finish']
  },
  {
    id: 'half-arm-waxing',
    name: 'Half Arm Waxing',
    category: 'waxing',
    categoryName: 'Hair Removal & Beauty Extras',
    price: 30,
    duration: '25 min',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    description: 'Waxing from elbow to wrists (or upper arm) using warm honey strip wax.',
    features: ['Warm honey wax', 'Complete hair elimination', 'Botanical oil cleanse', 'Softening body lotion']
  },
  {
    id: 'full-arm-waxing',
    name: 'Full Arm Waxing',
    category: 'waxing',
    categoryName: 'Hair Removal & Beauty Extras',
    price: 45,
    duration: '40 min',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Full arm waxing including fingers and hands for velvet-smooth glowing skin.',
    features: ['Shoulder to fingertips', 'Quick clean removal', 'Hydrating chamomile oil', 'Smooth skin finish']
  },
  {
    id: 'half-leg-waxing',
    name: 'Half Leg Waxing',
    category: 'waxing',
    categoryName: 'Hair Removal & Beauty Extras',
    price: 35,
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80',
    description: 'Thorough waxing from knee down to toes with skin-nourishing botanical wax.',
    features: ['Knee to ankle coverage', 'Ingrown-free technique', 'Moisturizing lotion', 'Quick & efficient']
  },
  {
    id: 'full-leg-waxing',
    name: 'Full Leg Waxing',
    category: 'waxing',
    categoryName: 'Hair Removal & Beauty Extras',
    price: 60,
    duration: '50 min',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80',
    description: 'Complete leg hair removal from upper thighs to toes for touchably soft legs.',
    features: ['Full thigh to toe wax', 'Warm soothing wax', 'Hydrating body butter', 'Lasts 3-5 weeks']
  },
  {
    id: 'bikini-waxing',
    name: 'Bikini Waxing',
    category: 'waxing',
    categoryName: 'Hair Removal & Beauty Extras',
    price: 40,
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    description: 'Tidy, hygienic bikini line waxing using ultra-gentle hard wax designed for sensitive areas.',
    features: ['Sanitary single-dip spatulas', 'Comfort hard wax', 'Calming tea tree lotion', 'Total privacy']
  },

  // ==========================================
  // NAIL CARE (15 Treatments)
  // ==========================================
  {
    id: 'classic-manicure',
    name: 'Classic Manicure',
    category: 'nails',
    categoryName: 'Nail Care',
    price: 35,
    duration: '35 min',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    description: 'Nail shaping, warm cuticle soak, gentle buffing, hand massage, and regular polish.',
    features: ['Nail trimming & filing', 'Cuticle care & oil', 'Hydrating hand lotion', 'Standard high-shine lacquer']
  },
  {
    id: 'classic-pedicure',
    name: 'Classic Pedicure',
    category: 'nails',
    categoryName: 'Nail Care',
    price: 48,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80',
    description: 'Invigorating foot bath, exfoliating scrub, heel buffing, toenail shaping, and polish.',
    features: ['Sea salt foot soak', 'Callus smoothing buff', 'Calf & foot rub', 'Toe polish application']
  },
  {
    id: 'gel-manicure',
    name: 'Gel Manicure',
    category: 'nails',
    categoryName: 'Nail Care',
    price: 55,
    duration: '50 min',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
    description: 'Long-wearing LED-cured gel polish that remains flawless and chip-free for up to 3 weeks.',
    features: ['Precision dry manicure prep', 'OPI/Bio-Gel colour', 'LED lamp cure', 'Cuticle nourishment']
  },
  {
    id: 'gel-pedicure',
    name: 'Gel Pedicure',
    category: 'nails',
    categoryName: 'Nail Care',
    price: 68,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80',
    description: 'Full spa pedicure combined with instant-dry, ultra-durable glossy gel color.',
    features: ['Aromatic foot soak', 'Heel pumice exfoliation', 'Gel LED curing', 'Zero smudging guarantee']
  },
  {
    id: 'french-manicure',
    name: 'French Manicure',
    category: 'nails',
    categoryName: 'Nail Care',
    price: 45,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    description: 'Timeless sheer pink or nude nail base paired with crisp, clean white smile line tips.',
    features: ['Classic sheer base coat', 'Crisp white French smile line', 'High-gloss top coat', 'Cuticle oil']
  },
  {
    id: 'nail-art',
    name: 'Nail Art',
    category: 'nails',
    categoryName: 'Nail Care',
    price: 25,
    duration: '25 min',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
    description: 'Custom hand-painted designs, chrome powder, foil accents, or subtle minimalist line art.',
    features: ['Hand-painted accents', 'Chrome & glaze powder', 'Rhinestones & foils', 'Per-set customization']
  },
  {
    id: 'nail-extensions',
    name: 'Nail Extensions',
    category: 'nails',
    categoryName: 'Nail Care',
    price: 85,
    duration: '90 min',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    description: 'Full set of lightweight, durable tip extensions sculpted to your desired length and shape.',
    features: ['Almond/Coffin/Square shapes', 'Custom length extension', 'Gel overlay strength', 'Gel polish finish']
  },
  {
    id: 'acrylic-nails',
    name: 'Acrylic Nails',
    category: 'nails',
    categoryName: 'Nail Care',
    price: 80,
    duration: '85 min',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
    description: 'Classic acrylic overlay or extensions engineered for maximum strength and length.',
    features: ['Full acrylic powder sculpt', 'Precision filing & balance', 'Gel polish color', 'Cuticle oil finish']
  },
  {
    id: 'builder-gel-nails',
    name: 'Builder Gel Nails',
    category: 'nails',
    categoryName: 'Nail Care',
    price: 75,
    duration: '75 min',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    description: 'BIAB (Builder In A Bottle) overlay that strengthens natural nails and prevents breakage.',
    features: ['Natural nail overlay', 'Reinforced apex structure', 'Flexible durable shield', 'Gel color finish']
  },
  {
    id: 'nail-removal',
    name: 'Nail Removal',
    category: 'nails',
    categoryName: 'Nail Care',
    price: 20,
    duration: '25 min',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    description: 'Gentle, damage-free soak-off removal of gel, acrylic, or builder gel followed by keratin oil.',
    features: ['Foil soak-off method', 'No nail bed peeling', 'Keratin strengthener', 'Hydrating hand lotion']
  },
  {
    id: 'nail-repair',
    name: 'Nail Repair',
    category: 'nails',
    categoryName: 'Nail Care',
    price: 10,
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
    description: 'Single nail repair for chipped gel, broken extension, or split natural nail.',
    features: ['Silk wrap / gel patch', 'Seamless color touch-up', 'Structural reinvigoration', 'Top coat seal']
  },
  {
    id: 'spa-manicure',
    name: 'Spa Manicure',
    category: 'nails',
    categoryName: 'Nail Care',
    price: 50,
    duration: '50 min',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    description: 'Indulgent hand retreat with rose petal soak, sugar scrub, warm paraffin wax, and massage.',
    features: ['Rose petal hand bath', 'Sugar exfoliation', 'Warm paraffin dip', 'Extended hand & arm massage']
  },
  {
    id: 'spa-pedicure',
    name: 'Spa Pedicure',
    category: 'nails',
    categoryName: 'Nail Care',
    price: 65,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80',
    description: 'Deluxe foot spa with lavender salt soak, peppermint mask, hot towels, and acupressure massage.',
    features: ['Lavender bath salts', 'Peppermint cooling clay', 'Hot towel steam wrap', 'Extended calf massage']
  },
  {
    id: 'cuticle-care',
    name: 'Cuticle Care',
    category: 'nails',
    categoryName: 'Nail Care',
    price: 20,
    duration: '20 min',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    description: 'Dedicated cuticle softening, gentle pushback, micro-trimming, and intensive vitamin E treatment.',
    features: ['Cuticle softening oil', 'Precision micro-trimming', 'Vitamin E balm', 'Nail bed buff']
  },
  {
    id: 'nail-buffing',
    name: 'Nail Buffing',
    category: 'nails',
    categoryName: 'Nail Care',
    price: 18,
    duration: '20 min',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
    description: 'Chemical-free natural nail enhancement creating a high-gloss natural sheen with buffing paste.',
    features: ['Japanese shine paste', 'Natural mirror sheen', 'Promotes blood circulation', 'Zero polish needed']
  },

  // ==========================================
  // MAKEUP (12 Treatments)
  // ==========================================
  {
    id: 'natural-makeup',
    name: 'Natural Makeup',
    category: 'makeup',
    categoryName: 'Makeup',
    price: 70,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    description: 'Clean, radiant "no-makeup makeup" look highlighting your natural features with dewy skin.',
    features: ['Skin tint & light concealer', 'Subtle brow definition', 'Mascara & cream blush', 'Tinted lip glow']
  },
  {
    id: 'party-makeup',
    name: 'Party Makeup',
    category: 'makeup',
    categoryName: 'Makeup',
    price: 110,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    description: 'Glamorous evening makeup with contour, highlight, sculpted eyes, and premium faux mink lashes.',
    features: ['Full coverage base', 'Smokey / glitter eye artistry', 'Faux mink lashes', 'Setting spray lock']
  },
  {
    id: 'bridal-makeup',
    name: 'Bridal Makeup',
    category: 'makeup',
    categoryName: 'Makeup',
    price: 275,
    duration: '120 min',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    description: 'Complete high-definition bridal makeover with 24-hr waterproof formula, lashes, and jewelry/dupatta setting.',
    features: ['High-Definition Airbrush base', 'Custom eye couture & lashes', 'Jewelry & dupatta pin', 'Touch-up emergency kit']
  },
  {
    id: 'engagement-makeup',
    name: 'Engagement Makeup',
    category: 'makeup',
    categoryName: 'Makeup',
    price: 165,
    duration: '90 min',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Luminous romantic makeup with soft glitter accents, customized for ring ceremonies & engagement parties.',
    features: ['Glow primer base', 'Shimmer shadow & liner', 'Silk strip lashes', 'Long-wear lip stain']
  },
  {
    id: 'reception-makeup',
    name: 'Reception Makeup',
    category: 'makeup',
    categoryName: 'Makeup',
    price: 185,
    duration: '90 min',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    description: 'High-impact modern glamour for wedding receptions, featuring bold eyes, sculpted glow, and lashes.',
    features: ['Camera-ready HD base', 'Dimensional contouring', 'Luxury lash application', 'Waterproof formula']
  },
  {
    id: 'hd-makeup',
    name: 'HD Makeup',
    category: 'makeup',
    categoryName: 'Makeup',
    price: 140,
    duration: '75 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    description: 'Micro-fine HD pigments designed to look flawless under high-resolution studio cameras and flash lights.',
    features: ['Pore-diffusing silicon base', 'HD light-reflecting pigments', 'Seamless blending', '18-hr crease resistance']
  },
  {
    id: 'soft-glam-makeup',
    name: 'Soft Glam Makeup',
    category: 'makeup',
    categoryName: 'Makeup',
    price: 95,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Sophisticated neutral tones, velvety skin finish, wispy fluttery lashes, and a nude glossy pout.',
    features: ['Neutral velvet base', 'Monochromatic tones', 'Wispy corner lashes', 'Plumping nude lip']
  },
  {
    id: 'eye-makeup',
    name: 'Eye Makeup',
    category: 'makeup',
    categoryName: 'Makeup',
    price: 45,
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    description: 'Express focus on the eyes: custom shadow look, precision winged liner, brow grooming, and lashes.',
    features: ['Primer & shadow blends', 'Sharp winged eyeliner', 'Brow sculpting', 'Lash application']
  },
  {
    id: 'makeup-consultation',
    name: 'Makeup Consultation',
    category: 'makeup',
    categoryName: 'Makeup',
    price: 30,
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=800&q=80',
    description: 'Bridal or event trial discussing look references, outfit color pairing, and foundation shade testing.',
    features: ['Undertone color testing', 'Bridal moodboard review', 'Texture compatibility', 'Credited on booking']
  },
  {
    id: 'makeup-touch-up',
    name: 'Makeup Touch-Up',
    category: 'makeup',
    categoryName: 'Makeup',
    price: 35,
    duration: '25 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    description: 'Mid-event freshen up: powdering T-zone, re-lining lips, re-applying blush and mascara revival.',
    features: ['Blotting & translucent powder', 'Blush & highlight freshen', 'Lip re-lining', 'Lash re-securing']
  },
  {
    id: 'photoshoot-makeup',
    name: 'Photoshoot Makeup',
    category: 'makeup',
    categoryName: 'Makeup',
    price: 130,
    duration: '75 min',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    description: 'Formulated for studio lighting: anti-glare finish, dramatic contour sculpt, and eye definition.',
    features: ['Non-flashback powders', 'Studio light contouring', 'High-contrast eye design', 'Lash set included']
  },
  {
    id: 'special-occasion-makeup',
    name: 'Special Occasion Makeup',
    category: 'makeup',
    categoryName: 'Makeup',
    price: 115,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Custom makeover for galas, graduations, anniversaries, and red-carpet festive dinners.',
    features: ['Skin prep & base match', 'Customized eye & brow work', 'Luxury lashes', 'Setting mist lock']
  },

  // ==========================================
  // SPA & WELLNESS (12 Treatments)
  // ==========================================
  {
    id: 'relaxation-massage',
    name: 'Relaxation Massage',
    category: 'spa',
    categoryName: 'Spa & Wellness',
    price: 90,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Full body Swedish-style relaxation massage using warm botanical oils to dissolve mental & physical stress.',
    features: ['Full body Swedish flow', 'Warm sweet almond oil', 'Tension release strokes', 'Herbal tea service']
  },
  {
    id: 'head-massage',
    name: 'Head Massage',
    category: 'spa',
    categoryName: 'Spa & Wellness',
    price: 45,
    duration: '35 min',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    description: 'Traditional Indian Champi scalp massage with warm herbs to relieve headaches, stress, and nourish roots.',
    features: ['Warm coconut/sesame oil', 'Acupressure marma points', 'Neck & upper back release', 'Warm towel wrap']
  },
  {
    id: 'scalp-massage',
    name: 'Scalp Massage',
    category: 'spa',
    categoryName: 'Spa & Wellness',
    price: 40,
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
    description: 'Targeted therapeutic scalp therapy promoting healthy microcirculation and deep relaxation.',
    features: ['Rosemary & peppermint elixir', 'Scalp detox brushes', 'Vibration pulse massage', 'Stress relief']
  },
  {
    id: 'back-massage',
    name: 'Back Massage',
    category: 'spa',
    categoryName: 'Spa & Wellness',
    price: 60,
    duration: '40 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Focused tension relief for the neck, shoulders, and lower back muscles.',
    features: ['Hot basalt stones', 'Focused trigger point work', 'Arnica & eucalyptus balm', 'Hot towel compress']
  },
  {
    id: 'aromatherapy-massage',
    name: 'Aromatherapy Massage',
    category: 'spa',
    categoryName: 'Spa & Wellness',
    price: 110,
    duration: '75 min',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    description: 'Harmonious full-body sensory journey with tailored organic essential oils (Lavender, Bergamot, Ylang-Ylang).',
    features: ['Essential oil custom blend', 'Rhythmic flowing massage', 'Deep sensory calm', 'Steam inhalation']
  },
  {
    id: 'foot-massage',
    name: 'Foot Massage',
    category: 'spa',
    categoryName: 'Spa & Wellness',
    price: 45,
    duration: '35 min',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80',
    description: 'Foot reflexology massage stimulating pressure points to improve whole-body energy and relieve fatigue.',
    features: ['Warm foot rinse', 'Reflexology pressure therapy', 'Cooling peppermint butter', 'Tired leg relief']
  },
  {
    id: 'body-scrub',
    name: 'Body Scrub',
    category: 'spa',
    categoryName: 'Spa & Wellness',
    price: 85,
    duration: '50 min',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    description: 'Full-body exfoliation with mineral-rich Dead Sea salt and botanical oils revealing glowing baby-soft skin.',
    features: ['Dead Sea salt & rose scrub', 'Full body polishing buff', 'Warm rain shower rinse', 'Hydration lotion application']
  },
  {
    id: 'body-polish',
    name: 'Body Polish',
    category: 'spa',
    categoryName: 'Spa & Wellness',
    price: 95,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Gentle sandalwood & crushed walnut exfoliation followed by whipped shea butter wrap for velvet smoothness.',
    features: ['Sandalwood cream polish', 'Nourishing shea butter wrap', 'Silk skin transformation', 'Detoxifying lymph stimulation']
  },
  {
    id: 'spa-treatment',
    name: 'Spa Treatment',
    category: 'spa',
    categoryName: 'Spa & Wellness',
    price: 125,
    duration: '80 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Combination ritual featuring back massage, scalp therapy, and customized express radiance facial.',
    features: ['Relaxing back massage', 'Indian head massage', 'Radiance glow facial', 'Total mind-body recharge']
  },
  {
    id: 'relaxation-package',
    name: 'Relaxation Package',
    category: 'spa',
    categoryName: 'Spa & Wellness',
    price: 195,
    duration: '120 min',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    description: 'The ultimate sanctuary retreat: full aromatherapy massage, rose body polish, and gold sheet facial.',
    features: ['Full 60-min massage', 'Rose body exfoliation', 'Gold leaf facial treatment', 'Complimentary VIP tea tray']
  },
  {
    id: 'hand-spa',
    name: 'Hand Spa',
    category: 'spa',
    categoryName: 'Spa & Wellness',
    price: 45,
    duration: '35 min',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    description: 'Intensive restorative care for overworked hands with warm milk bath, honey scrub, and warm paraffin mittens.',
    features: ['Warm almond milk soak', 'Honey sugar hand polish', 'Thermal paraffin mittens', 'Deep wrist & finger rub']
  },
  {
    id: 'foot-spa',
    name: 'Foot Spa',
    category: 'spa',
    categoryName: 'Spa & Wellness',
    price: 55,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80',
    description: 'Jet foot hydrotherapy with Epsom salts, eucalyptus scrub, calloused heel relief, and acupressure.',
    features: ['Jet whirlpool salt bath', 'Eucalyptus callus treatment', 'Heated basalt foot rocks', 'Moisture sealing socks']
  }
];

// Helper to find service by id
export const getServiceById = (id) => ALL_SERVICES.find((s) => s.id === id);
