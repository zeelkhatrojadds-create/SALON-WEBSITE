// Complete, comprehensive treatment dataset for GLAM GIRL BY JANKI
// All pricing in CAD (editable salon sample pricing)

export const CATEGORIES = [
  { id: 'all', name: 'All Services', icon: 'Sparkles', slug: 'all' },
  { id: 'threading', name: 'Threading', icon: 'Feather', slug: 'threading' },
  { id: 'waxing', name: 'Waxing', icon: 'Sparkle', slug: 'waxing' },
  { id: 'facial', name: 'Facial', icon: 'Sparkles', slug: 'facial' },
  { id: 'massage', name: 'Massage', icon: 'Flower2', slug: 'massage' },
  { id: 'henna', name: 'Henna', icon: 'Palette', slug: 'henna' },
  { id: 'makeup', name: 'Makeup', icon: 'Wand2', slug: 'makeup' },
  { id: 'hairstyling', name: 'Hairstyling', icon: 'Sparkles', slug: 'hairstyling' },
  { id: 'haircut', name: 'Hair cut', icon: 'Scissors', slug: 'hair-cut' },
  { id: 'haircolor', name: 'Hair color', icon: 'Droplets', slug: 'hair-color' },
  { id: 'hairtreatments', name: 'Hair treatments', icon: 'Heart', slug: 'hair-treatments' }
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
  // 1. THREADING
  // ==========================================
  {
    id: 'eyebrow-threading',
    name: 'Eyebrow Threading',
    category: 'threading',
    categoryName: 'Threading',
    price: 15,
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    description: 'Authentic Indian cotton thread technique for crisp, symmetrical brow arches with zero chemical irritation.',
    features: ['Custom brow mapping', 'Precision cotton thread shaping', 'Soothing aloe-vera gel', 'Brow comb finish']
  },
  {
    id: 'upper-lip-threading',
    name: 'Upper Lip Threading',
    category: 'threading',
    categoryName: 'Threading',
    price: 10,
    duration: '10 min',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Quick, precise hair removal from upper lip leaving skin silky smooth and foundation-ready.',
    features: ['Sanitized thread', 'Rapid removal', 'Cooling rosewater dab', 'Zero redness formula']
  },
  {
    id: 'forehead-threading',
    name: 'Forehead Threading',
    category: 'threading',
    categoryName: 'Threading',
    price: 12,
    duration: '10 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    description: 'Gentle cotton thread hair removal along hairline and forehead for a clean, bright face.',
    features: ['Precision hairline shaping', 'Calming tea tree lotion', 'Smooth finish']
  },
  {
    id: 'chin-jawline-threading',
    name: 'Chin & Jawline Threading',
    category: 'threading',
    categoryName: 'Threading',
    price: 14,
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1512290900672-1f02e60938c5?auto=format&fit=crop&w=800&q=80',
    description: 'Targeted removal of stray chin and jawline hair with anti-irritation soothing compress.',
    features: ['Root hair removal', 'Cooling rose water', 'Nourishing aloe mist']
  },
  {
    id: 'full-face-threading',
    name: 'Full Face Threading',
    category: 'threading',
    categoryName: 'Threading',
    price: 40,
    duration: '35 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    description: 'Complete facial hair removal covering brows, upper lip, chin, sideburns, and forehead.',
    features: ['Brows, lip, chin, sides', 'Fine peach fuzz removal', 'Calming cucumber compress', 'Skin soothing lotion']
  },

  // ==========================================
  // 2. WAXING
  // ==========================================
  {
    id: 'eyebrow-waxing',
    name: 'Eyebrow Waxing',
    category: 'waxing',
    categoryName: 'Waxing',
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
    categoryName: 'Waxing',
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
    categoryName: 'Waxing',
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
    categoryName: 'Waxing',
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
    categoryName: 'Waxing',
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
    categoryName: 'Waxing',
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
    categoryName: 'Waxing',
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
    categoryName: 'Waxing',
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
    categoryName: 'Waxing',
    price: 40,
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    description: 'Tidy, hygienic bikini line waxing using ultra-gentle hard wax designed for sensitive areas.',
    features: ['Sanitary single-dip spatulas', 'Comfort hard wax', 'Calming tea tree lotion', 'Total privacy']
  },

  // ==========================================
  // 3. FACIAL
  // ==========================================
  {
    id: 'classic-facial',
    name: 'Classic Facial',
    category: 'facial',
    categoryName: 'Facial',
    price: 65,
    duration: '50 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    description: 'Essential refreshing facial featuring gentle cleansing, exfoliation, steam, and customized hydration mask.',
    features: ['Double cleanse', 'Enzyme exfoliation', 'Warm towel steam', 'Custom soothing mask']
  },
  {
    id: 'deep-cleansing-facial',
    name: 'Deep Cleansing Facial',
    category: 'facial',
    categoryName: 'Facial',
    price: 85,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1512290900672-1f02e60938c5?auto=format&fit=crop&w=800&q=80',
    description: 'Pore decongesting treatment with gentle extractions, purifying clay mask, and high-frequency antibacterial care.',
    features: ['Pore unclogging steam', 'Manual comedone extraction', 'Purifying clay mask', 'High frequency therapy']
  },
  {
    id: 'hydrating-facial',
    name: 'Hydrating Facial',
    category: 'facial',
    categoryName: 'Facial',
    price: 80,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Quenches dry skin with hyaluronic acid infusions and a soothing rosewater hydro-jelly mask.',
    features: ['Hyaluronic multi-layer serum', 'Hydro-jelly mask', 'Cryo-globe massage', 'Barrier renewal cream']
  },
  {
    id: 'brightening-kumkumadi-facial',
    name: 'Brightening Kumkumadi Facial',
    category: 'facial',
    categoryName: 'Facial',
    price: 95,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Ayurvedic Kumkumadi and botanical alpha-arbutin treatment to diminish sunspots and restore luminous glow.',
    features: ['Sandalwood exfoliation', 'Kumkumadi oil lymphatic massage', 'Brightening botanical pack', 'Sun defense seal']
  },
  {
    id: '24k-gold-hydra-facial',
    name: '24K Gold & Hydra-Glow Facial',
    category: 'facial',
    categoryName: 'Facial',
    price: 135,
    duration: '75 min',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    description: 'Luxurious 24K pure gold leaf facial that improves cellular renewal and leaves skin royally radiant.',
    features: ['24K gold foil application', 'Gold serum ionization', 'Lymphatic face massage', 'Illuminating gold mask']
  },
  {
    id: 'anti-aging-facial',
    name: 'Anti-Aging Facial',
    category: 'facial',
    categoryName: 'Facial',
    price: 115,
    duration: '75 min',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    description: 'Collagen-stimulating facial with peptide serums, Gua Sha contouring, and firming bio-cellulose mask.',
    features: ['Peptide complex infusion', 'Rose quartz Gua Sha sculpt', 'Collagen firming sheet', 'Micro-current toning']
  },
  {
    id: 'express-glow-facial',
    name: 'Express Glow Facial',
    category: 'facial',
    categoryName: 'Facial',
    price: 45,
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Quick pick-me-up facial: rapid exfoliation, hydrating mask, and glow moisturizer.',
    features: ['Express cleanse', 'Gently polishing scrub', 'Quick glow mask', 'SPF hydration']
  },

  // ==========================================
  // 4. MASSAGE
  // ==========================================
  {
    id: 'head-scalp-massage',
    name: 'Head & Scalp Massage',
    category: 'massage',
    categoryName: 'Massage',
    price: 45,
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    description: 'Therapeutic warm herbal oil head massage relieving stress, tension, and nourishing hair roots.',
    features: ['Warm herbal oil', 'Acupressure point focus', 'Deep scalp circulation', 'Stress release']
  },
  {
    id: 'neck-shoulder-massage',
    name: 'Neck & Shoulder Relief Massage',
    category: 'massage',
    categoryName: 'Massage',
    price: 50,
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Targeted deep-tissue massage releasing tight neck muscles, upper back knots, and posture fatigue.',
    features: ['Trigger point therapy', 'Eucalyptus balm', 'Muscle knot kneading', 'Tension relief']
  },
  {
    id: 'aromatherapy-body-massage',
    name: 'Aromatherapy Full Body Massage',
    category: 'massage',
    categoryName: 'Massage',
    price: 120,
    duration: '75 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Custom blend of lavender, jasmine, and ylang-ylang essential oils to melt away full body tension.',
    features: ['Essential oil blend', 'Heated stone accents', 'Full body relaxation', 'Herbal tea finish']
  },
  {
    id: 'foot-reflexology-massage',
    name: 'Foot Reflexology Spa Massage',
    category: 'massage',
    categoryName: 'Massage',
    price: 65,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80',
    description: 'Revitalizing foot bath, foot scrub, and pressure point reflexology restoring energy and circulation.',
    features: ['Himalayan salt soak', 'Peppermint oil rubbing', 'Reflex zone mapping', 'Light leg massage']
  },

  // ==========================================
  // 5. HENNA
  // ==========================================
  {
    id: 'simple-hand-henna',
    name: 'Simple Hand Henna / Mehndi',
    category: 'henna',
    categoryName: 'Henna',
    price: 25,
    duration: '20 min',
    image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=800&q=80',
    description: 'Elegant mandala or floral motif hand henna design using 100% natural organic Rajastani henna.',
    features: ['Natural organic henna', 'Mandala or finger strip design', 'Lemon sugar seal', 'Rich dark stain']
  },
  {
    id: 'both-hands-henna',
    name: 'Both Hands Front & Back Henna',
    category: 'henna',
    categoryName: 'Henna',
    price: 60,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=800&q=80',
    description: 'Traditional Arabic or floral patterns covering palm and back of both hands up to wrists.',
    features: ['Arabic floral patterns', 'Deep red/brown stain', 'Aftercare essential oil', 'Long lasting stain']
  },
  {
    id: 'party-henna-art',
    name: 'Party Henna Art',
    category: 'henna',
    categoryName: 'Henna',
    price: 85,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=800&q=80',
    description: 'Intricate festive henna styling for parties, sangeet, Eid, or festive celebrations.',
    features: ['Detailed wrist to forearm work', 'Custom motif selection', 'All-natural chemical free', 'Stain fixative application']
  },
  {
    id: 'bridal-henna-couture',
    name: 'Royal Bridal Henna Couture',
    category: 'henna',
    categoryName: 'Henna',
    price: 200,
    duration: '150 min',
    image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=800&q=80',
    description: 'Bespoke bridal Mehndi extending to elbows and feet with personalized bride-groom figures & stories.',
    features: ['Elbow length front & back', 'Bridal feet henna included', 'Custom story motifs', 'Bridal aftercare spray']
  },
  {
    id: 'organic-hair-henna',
    name: 'Natural Organic Hair Henna Application',
    category: 'henna',
    categoryName: 'Henna',
    price: 65,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    description: 'Pure herbal henna and indigo hair pack for deep natural conditioning, hair fall reduction, and reddish-brown tint.',
    features: ['Chemical-free organic herbs', 'Deep root application', 'Scalp conditioning rinse', 'Blow dry finish']
  },

  // ==========================================
  // 6. MAKEUP
  // ==========================================
  {
    id: 'natural-makeup',
    name: 'Natural "No-Makeup" Glow',
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
    name: 'Evening Glam & Party Makeup',
    category: 'makeup',
    categoryName: 'Makeup',
    price: 110,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    description: 'Glamorous evening makeup with contour, highlight, sculpted eyes, and premium faux mink lashes.',
    features: ['Full coverage base', 'Smokey / glitter eye artistry', 'Faux mink lashes', 'Setting spray lock']
  },
  {
    id: 'engagement-makeup',
    name: 'Engagement & Sagan Makeup',
    category: 'makeup',
    categoryName: 'Makeup',
    price: 165,
    duration: '90 min',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Luminous romantic makeup with soft glitter accents, customized for ring ceremonies & parties.',
    features: ['Glow primer base', 'Shimmer shadow & liner', 'Silk strip lashes', 'Long-wear lip stain']
  },
  {
    id: 'reception-makeup',
    name: 'Reception & Cocktail Makeup',
    category: 'makeup',
    categoryName: 'Makeup',
    price: 185,
    duration: '90 min',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    description: 'Dramatic evening high-definition look designed specifically for reception lighting and photography.',
    features: ['HD camera-ready base', '3D cut-crease eye', 'Luxury lashes', 'Setting spray seal']
  },
  {
    id: 'bridal-makeup',
    name: 'Royal HD Airbrush Bridal Makeup',
    category: 'makeup',
    categoryName: 'Makeup',
    price: 275,
    duration: '120 min',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    description: 'Complete high-definition bridal makeover with 24-hr waterproof formula, lashes, and jewelry/dupatta setting.',
    features: ['High-Definition Airbrush base', 'Custom eye couture & lashes', 'Jewelry & dupatta pin', 'Touch-up emergency kit']
  },

  // ==========================================
  // 7. HAIRSTYLING
  // ==========================================
  {
    id: 'express-blow-dry',
    name: 'Express Blow Dry',
    category: 'hairstyling',
    categoryName: 'Hairstyling',
    price: 35,
    duration: '35 min',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Express professional blow dry for smooth, bouncy, frizz-free locks for your day or evening.',
    features: ['Heat protectant infusion', 'Round brush sculpt', 'Volume lift', 'Anti-humidity lock']
  },
  {
    id: 'volumizing-wash-blowout',
    name: 'Volumizing Wash & Blowout',
    category: 'hairstyling',
    categoryName: 'Hairstyling',
    price: 45,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    description: 'Invigorating double shampoo wash, botanical conditioning mask, and expert bouncy blow dry.',
    features: ['Aromatherapeutic head wash', 'Hydrating conditioner', 'Full blowout', 'Gloss drop glaze']
  },
  {
    id: 'hollywood-waves-curls',
    name: 'Hollywood Waves & Curls',
    category: 'hairstyling',
    categoryName: 'Hairstyling',
    price: 55,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Hollywood glamour waves, textured beach curls, or sleek straightened styling for events.',
    features: ['Heat defense prep', 'Hot tool styling', 'Setting spray lock', 'Luminous shine finish']
  },
  {
    id: 'party-hair-updo',
    name: 'Party Hair Updo & Buns',
    category: 'hairstyling',
    categoryName: 'Hairstyling',
    price: 75,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80',
    description: 'Glamorous half-up hairstyles, textured messy buns, or romantic braided styles for parties.',
    features: ['Backcombing volume base', 'Curling & pinning', 'Accessory placement', 'Long-lasting hold']
  },
  {
    id: 'bridal-hair-couture',
    name: 'Royal Bridal Hair Couture',
    category: 'hairstyling',
    categoryName: 'Hairstyling',
    price: 150,
    duration: '90 min',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    description: 'Intricate bridal updos, braided crowns, dupatta/veil setting, and luxury floral accessory pinning.',
    features: ['Bridal consultation', 'Textured updo structure', 'Veil / dupatta pinning', 'All-day security lock']
  },

  // ==========================================
  // 8. HAIR CUT
  // ==========================================
  {
    id: 'womens-trim-cut',
    name: "Women's Trim & Precision Cut",
    category: 'haircut',
    categoryName: 'Hair cut',
    price: 45,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    description: 'Customized precision haircut tailored to your facial structure, lifestyle, and hair texture.',
    features: ['Consultation & texture assessment', 'Custom shears haircut', 'Light texturizing', 'Quick style check']
  },
  {
    id: 'haircut-blowdry-styling',
    name: 'Signature Haircut & Blowdry Styling',
    category: 'haircut',
    categoryName: 'Hair cut',
    price: 65,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
    description: 'Master haircut followed by a luxurious shampoo ritual and signature voluminous blow dry.',
    features: ['Clarifying wash & scalp massage', 'Precision master cut', 'Volumizing round brush blow dry', 'Shine mist finish']
  },
  {
    id: 'layers-textured-shag-cut',
    name: 'Layers & Textured Shag Cut',
    category: 'haircut',
    categoryName: 'Hair cut',
    price: 60,
    duration: '50 min',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    description: 'Modern butterfly layers, curtain bangs framing, or movement-filled shag cut.',
    features: ['Face-framing layers', 'Weight removal texturizing', 'Bouncy blowout']
  },
  {
    id: 'bangs-fringe-cut',
    name: 'Bangs & Fringe Cut',
    category: 'haircut',
    categoryName: 'Hair cut',
    price: 25,
    duration: '20 min',
    image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=800&q=80',
    description: 'Express curtain bangs, wispy fringe, or blunt bang trimming.',
    features: ['Dry precision trim', 'Style setting check']
  },

  // ==========================================
  // 9. HAIR COLOR
  // ==========================================
  {
    id: 'root-touch-up',
    name: 'Root Touch-Up',
    category: 'haircolor',
    categoryName: 'Hair color',
    price: 60,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    description: 'Targeted root colour matching to conceal regrowth and maintain consistent vibrant tones.',
    features: ['Up to 1.5 inches regrowth coverage', 'Seamless shade blending', 'Nourishing rinse', 'Quick blow dry']
  },
  {
    id: 'hair-colour-single-process',
    name: 'Single Process Hair Colour',
    category: 'haircolor',
    categoryName: 'Hair color',
    price: 85,
    duration: '90 min',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80',
    description: 'Single-process ammonia-free hair colouring delivering rich pigments, shine, and complete gray coverage.',
    features: ['Skin-tone custom mix', 'Scalp barrier shield', 'Ammonia-free formula', 'Post-colour nourishment']
  },
  {
    id: 'full-global-hair-colour',
    name: 'Full Global Hair Colour',
    category: 'haircolor',
    categoryName: 'Hair color',
    price: 110,
    duration: '105 min',
    image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=800&q=80',
    description: 'Complete transformation from roots to tips with radiant multi-tonal dimensional colour.',
    features: ['Root-to-end full application', 'Bond-protecting additive', 'Color-lock masque', 'Blow dry styling']
  },
  {
    id: 'luxe-balayage-gloss',
    name: 'Luxe Balayage & Gloss Finish',
    category: 'haircolor',
    categoryName: 'Hair color',
    price: 185,
    duration: '150 min',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-painted sun-kissed gradients with seamless transition and low maintenance grow-out.',
    features: ['Bespoke freehand painting', 'Gloss toner glaze', 'Olaplex bond treatment', 'Signature wave finish']
  },
  {
    id: 'precision-foil-highlights',
    name: 'Precision Foil Highlights',
    category: 'haircolor',
    categoryName: 'Hair color',
    price: 140,
    duration: '120 min',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    description: 'Precision foil highlights for maximum contrast, brightness, and illuminated dimension.',
    features: ['Full or half head foils', 'Custom lifting level', 'Toner equalization', 'Conditioning treatment']
  },
  {
    id: 'ombre-colour-melt',
    name: 'Ombre & Colour Melt',
    category: 'haircolor',
    categoryName: 'Hair color',
    price: 165,
    duration: '135 min',
    image: 'https://images.unsplash.com/photo-1500840216050-6ffa99d75160?auto=format&fit=crop&w=800&q=80',
    description: 'Graduated color melt transitioning from darker roots to luminous, lighter ends.',
    features: ['Color melt transition', 'Custom gradient matching', 'Gloss sealant', 'Blowout styling']
  },

  // ==========================================
  // 10. HAIR TREATMENTS
  // ==========================================
  {
    id: 'royal-herbal-hair-spa',
    name: 'Royal Herbal Hair Spa & Scalp Therapy',
    category: 'hairtreatments',
    categoryName: 'Hair treatments',
    price: 85,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    description: 'Relaxing hair spa treatment for soft, shiny and healthy hair. Includes massage, steam and deep conditioning.',
    features: ['Herbal steam infusion', 'Aromatherapeutic head massage', 'Deep moisture cream bath', 'Blowout finish']
  },
  {
    id: 'deep-conditioning-treatment',
    name: 'Deep Conditioning & Cuticle Repair',
    category: 'hairtreatments',
    categoryName: 'Hair treatments',
    price: 50,
    duration: '40 min',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    description: 'Intense moisture infusion formula designed to repair parched, chemically treated, or brittle hair.',
    features: ['Keratin & Argan oil mask', 'Infrared absorption boost', 'Cuticle smoothing', 'Frizz protection']
  },
  {
    id: 'keratin-treatment',
    name: 'Pure Keratin Smoothing Treatment',
    category: 'hairtreatments',
    categoryName: 'Hair treatments',
    price: 220,
    duration: '180 min',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80',
    description: 'Formaldehyde-free smoothing complex that eliminates frizz and cuts blow dry time in half for months.',
    features: ['Deep cleansing prep', 'Pure keratin infusion', 'Thermal lock seal', 'Silky 4-month longevity']
  },
  {
    id: 'botanical-hair-smoothening',
    name: 'Botanical Hair Smoothening',
    category: 'hairtreatments',
    categoryName: 'Hair treatments',
    price: 195,
    duration: '150 min',
    image: 'https://images.unsplash.com/photo-1584297091622-af8e5fd70a33?auto=format&fit=crop&w=800&q=80',
    description: 'Gentle protein-enriching system that relaxes unruly waves into silky, manageable tresses.',
    features: ['Botanical protein formula', 'Gentle wave softening', 'Nutrient sealing', 'High shine finish']
  },
  {
    id: 'thermal-hair-straightening',
    name: 'Thermal Permanent Hair Straightening',
    category: 'hairtreatments',
    categoryName: 'Hair treatments',
    price: 230,
    duration: '180 min',
    image: 'https://images.unsplash.com/photo-1519735777090-ec97162dc266?auto=format&fit=crop&w=800&q=80',
    description: 'Permanent thermal reconditioning for pin-straight, ultra-sleek, glassy hair.',
    features: ['Strand porosity testing', 'Thermal straightening irons', 'Neutralizing cream', 'Intensive post-care mask']
  },
  {
    id: 'anti-frizz-glossing',
    name: 'Anti-Frizz Glossing Ritual',
    category: 'hairtreatments',
    categoryName: 'Hair treatments',
    price: 55,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80',
    description: 'Translucent conditioning gloss that neutralizes brassiness and adds mirror-like shine.',
    features: ['Acidic pH shine enhancer', 'Brass neutralization', 'Deep hydration', 'Lasts up to 6 weeks']
  }
];

export const getServiceById = (id) => {
  if (!id) return null;
  return ALL_SERVICES.find(
    (s) => s.id === id || s.name.toLowerCase() === String(id).toLowerCase() || s.id.toLowerCase() === String(id).toLowerCase()
  ) || null;
};
