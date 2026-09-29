// Complete, clean treatment dataset for GLAM GIRL BY JANKI
// All 44 Services with matching HD images and exact pricing

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
  { id: 'hairtreatments', name: 'Hair treatments', icon: 'Heart', slug: 'hair-treatments' },
  { id: 'other', name: 'Other Services', icon: 'Sparkles', slug: 'other-services' }
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
  // THREADING SERVICES (8 Items)
  // ==========================================
  {
    id: 'eyebrows-threading',
    name: 'Eyebrows Threading',
    category: 'threading',
    categoryName: 'Threading',
    price: 10,
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    description: 'Precision cotton thread shaping for clean, symmetrical eyebrow arches.',
    features: ['Custom brow mapping', 'Cotton thread shaping', 'Aloe vera gel']
  },
  {
    id: 'upperlip-threading',
    name: 'Upperlip Threading',
    category: 'threading',
    categoryName: 'Threading',
    price: 6,
    duration: '10 min',
    image: 'https://images.unsplash.com/photo-1512290900672-1f02e60938c5?auto=format&fit=crop&w=800&q=80',
    description: 'Quick, gentle cotton thread hair removal for the upper lip.',
    features: ['Sanitized thread', 'Fast & precise', 'Soothing rosewater']
  },
  {
    id: 'forehead-threading',
    name: 'Forehead Threading',
    category: 'threading',
    categoryName: 'Threading',
    price: 6,
    duration: '10 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    description: 'Hairline and forehead hair removal for a smooth, radiant face.',
    features: ['Precision hairline', 'Gentle thread pull', 'Cooling lotion']
  },
  {
    id: 'chin-threading',
    name: 'Chin Threading',
    category: 'threading',
    categoryName: 'Threading',
    price: 8,
    duration: '10 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Targeted chin hair threading with anti-irritation soothing balm.',
    features: ['Root hair removal', 'Chin shaping', 'Aloe soothing']
  },
  {
    id: 'cheek-threading',
    name: 'Cheek Threading',
    category: 'threading',
    categoryName: 'Threading',
    price: 8,
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    description: 'Gentle cheek peach fuzz removal leaving skin soft and makeup-ready.',
    features: ['Peach fuzz removal', 'Smooth finish', 'Hydrating compress']
  },
  {
    id: 'sideburns-threading',
    name: 'Sideburns Threading',
    category: 'threading',
    categoryName: 'Threading',
    price: 8,
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Clean sideburns contouring and hair removal.',
    features: ['Sideburn contour', 'Crisp facial line', 'Aloe gel seal']
  },
  {
    id: 'neck-threading',
    name: 'Neck Threading',
    category: 'threading',
    categoryName: 'Threading',
    price: 8,
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    description: 'Neck area stray hair threading for a clean, elegant look.',
    features: ['Neck hair removal', 'Skin calming balm', 'Zero redness formula']
  },
  {
    id: 'full-face-threading',
    name: 'Full Face Threading',
    category: 'threading',
    categoryName: 'Threading',
    price: 35,
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    description: 'Complete facial threading covering brows, lip, chin, cheeks, forehead, sideburns & neck.',
    features: ['Brows, lip, chin, cheeks, forehead', 'Full facial hair removal', 'Cooling cucumber compress', 'Calming aloe lotion']
  },

  // ==========================================
  // WAXING SERVICES (19 Items)
  // ==========================================
  {
    id: 'eyebrows-waxing',
    name: 'Eyebrows Waxing',
    category: 'waxing',
    categoryName: 'Waxing',
    price: 10,
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    description: 'Precision hard wax brow shaping for clean, long-lasting arches.',
    features: ['Hypoallergenic hard wax', 'Precision spatulas', 'Soothing azulene oil']
  },
  {
    id: 'upperlip-waxing',
    name: 'Upperlip Waxing',
    category: 'waxing',
    categoryName: 'Waxing',
    price: 6,
    duration: '10 min',
    image: 'https://images.unsplash.com/photo-1512290900672-1f02e60938c5?auto=format&fit=crop&w=800&q=80',
    description: 'Fast, gentle depilatory waxing for upper lip hair.',
    features: ['Sensitive skin wax', 'Quick removal', 'Cooling after-wax balm']
  },
  {
    id: 'forehead-waxing',
    name: 'Forehead Waxing',
    category: 'waxing',
    categoryName: 'Waxing',
    price: 6,
    duration: '10 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    description: 'Forehead and hairline smooth waxing.',
    features: ['Clean hairline', 'Gentle pull', 'Hydrating finish']
  },
  {
    id: 'chin-waxing',
    name: 'Chin Waxing',
    category: 'waxing',
    categoryName: 'Waxing',
    price: 8,
    duration: '10 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Chin area hair removal using gentle stripless wax.',
    features: ['Root elimination', 'Aloe soothing lotion', 'Smooth skin']
  },
  {
    id: 'cheek-waxing',
    name: 'Cheek Waxing',
    category: 'waxing',
    categoryName: 'Waxing',
    price: 8,
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    description: 'Cheek peach fuzz waxing for a silky smooth finish.',
    features: ['Peach fuzz removal', 'Zero residue', 'Calming compress']
  },
  {
    id: 'sideburns-waxing',
    name: 'Sideburns Waxing',
    category: 'waxing',
    categoryName: 'Waxing',
    price: 8,
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Sideburn line waxing and contouring.',
    features: ['Clean facial lines', 'Stripless wax', 'Calming oil']
  },
  {
    id: 'neck-waxing',
    name: 'Neck Waxing',
    category: 'waxing',
    categoryName: 'Waxing',
    price: 8,
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    description: 'Gentle neck area waxing.',
    features: ['Stray hair removal', 'Soothing balm', 'No irritation']
  },
  {
    id: 'full-face-waxing',
    name: 'Full Face Waxing',
    category: 'waxing',
    categoryName: 'Waxing',
    price: 35,
    duration: '35 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    description: 'Complete facial waxing covering forehead, brows, lip, chin, cheeks & sideburns.',
    features: ['Full facial coverage', 'Gentle hard wax', 'Ice globe massage', 'Aloe mask']
  },
  {
    id: 'under-arms-waxing',
    name: 'Under Arms Waxing',
    category: 'waxing',
    categoryName: 'Waxing',
    price: 12,
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    description: 'Clean, smooth underarm waxing leaving skin hair-free for weeks.',
    features: ['Root removal', 'Stripless hard wax', 'Ingrown prevention']
  },
  {
    id: 'half-arms-waxing',
    name: 'Half Arms Waxing',
    category: 'waxing',
    categoryName: 'Waxing',
    price: 15,
    duration: '25 min',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    description: 'Lower or upper arm waxing using honey strip wax.',
    features: ['Elbow to wrist', 'Smooth finish', 'Botanical oil cleanse']
  },
  {
    id: 'full-arms-waxing',
    name: 'Full Arms Waxing',
    category: 'waxing',
    categoryName: 'Waxing',
    price: 25,
    duration: '35 min',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Full arm waxing including fingers and hands.',
    features: ['Shoulder to fingertips', 'Quick clean removal', 'Moisturizing oil']
  },
  {
    id: 'lower-half-legs-waxing',
    name: 'Lower Half Legs Waxing',
    category: 'waxing',
    categoryName: 'Waxing',
    price: 25,
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80',
    description: 'Thorough lower leg waxing from knee down to toes.',
    features: ['Knee to ankle coverage', 'Ingrown-free technique', 'Moisturizing lotion']
  },
  {
    id: 'upper-half-legs-waxing',
    name: 'Upper Half Legs Waxing',
    category: 'waxing',
    categoryName: 'Waxing',
    price: 30,
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80',
    description: 'Thigh area leg waxing extending to knees.',
    features: ['Thigh coverage', 'Soft skin formula', 'Hydrating lotion']
  },
  {
    id: 'full-legs-waxing',
    name: 'Full Legs Waxing',
    category: 'waxing',
    categoryName: 'Waxing',
    price: 45,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80',
    description: 'Complete leg hair removal from upper thighs down to toes.',
    features: ['Full leg coverage', 'Warm honey wax', 'Body butter hydration']
  },
  {
    id: 'half-back-waxing',
    name: 'Half Back Waxing',
    category: 'waxing',
    categoryName: 'Waxing',
    price: 20,
    duration: '25 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Upper or lower back waxing for a clean, smooth skin feel.',
    features: ['Targeted back area', 'Clean removal', 'Soothing lotion']
  },
  {
    id: 'full-back-waxing',
    name: 'Full Back Waxing',
    category: 'waxing',
    categoryName: 'Waxing',
    price: 30,
    duration: '35 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Complete back waxing covering shoulders down to waist.',
    features: ['Full back coverage', 'Gentle removal', 'Skin calming balm']
  },
  {
    id: 'stomach-waxing',
    name: 'Stomach Waxing',
    category: 'waxing',
    categoryName: 'Waxing',
    price: 15,
    duration: '20 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    description: 'Gentle stomach area hair removal.',
    features: ['Abdominal area', 'Gentle wax formula', 'Cooling lotion']
  },
  {
    id: 'full-front-waxing',
    name: 'Full Front Waxing',
    category: 'waxing',
    categoryName: 'Waxing',
    price: 25,
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    description: 'Full chest and stomach front waxing.',
    features: ['Chest & stomach', 'Complete front coverage', 'Soothing aftercare']
  },
  {
    id: 'bikini-lines-waxing',
    name: 'Bikini Lines Waxing',
    category: 'waxing',
    categoryName: 'Waxing',
    price: 20,
    duration: '25 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    description: 'Tidy, hygienic bikini line waxing using ultra-gentle hard wax.',
    features: ['Bikini line edging', 'Comfort hard wax', 'Tea tree soothing balm']
  },

  // ==========================================
  // FACIAL SERVICES (10 Items)
  // ==========================================
  {
    id: 'mini-facial',
    name: 'Mini-Facial',
    category: 'facial',
    categoryName: 'Facial',
    price: 20,
    duration: '25 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Quick refreshing facial treatment featuring scrub, steaming, and blackheads extraction.',
    features: ['Scrubbing & exfoliation', 'Warm steaming', 'Blackhead extraction', 'Soothing hydration']
  },
  {
    id: 'express-facial',
    name: 'Express Facial',
    category: 'facial',
    categoryName: 'Facial',
    price: 40,
    duration: '35 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    description: 'Rejuvenating express facial including cleansing, scrubbing, and a relaxing face massage.',
    features: ['Cleansing', 'Scrubbing', 'Relaxing face massage', 'Hydration mask']
  },
  {
    id: 'herbal-facial',
    name: 'Herbal Facial',
    category: 'facial',
    categoryName: 'Facial',
    price: 60,
    duration: '50 min',
    image: 'https://images.unsplash.com/photo-1512290900672-1f02e60938c5?auto=format&fit=crop&w=800&q=80',
    description: 'Natural skincare with plant-based ingredients for sensitive and pure skin care.',
    features: ['Plant-based ingredients', 'Botanical cleansing', 'Herbal face pack', 'Natural glow']
  },
  {
    id: 'fruit-facial',
    name: 'Fruit Facial',
    category: 'facial',
    categoryName: 'Facial',
    price: 65,
    duration: '50 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Refreshing skincare infused with fruity goodness to nourish and brighten your skin.',
    features: ['Fresh fruit extracts', 'Deep vitamin nourishment', 'Fruity glow mask', 'Skin softening']
  },
  {
    id: 'oxy-glow-facial',
    name: 'Oxy Glow Facial',
    category: 'facial',
    categoryName: 'Facial',
    price: 70,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    description: 'Rejuvenating skin treatment for a radiant, oxygenated glow.',
    features: ['Oxygen infusion boost', 'Pore detoxifying', 'Radiant skin glow', 'Cellular revival']
  },
  {
    id: 'golden-glow-facial',
    name: 'Golden Glow Facial',
    category: 'facial',
    categoryName: 'Facial',
    price: 70,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    description: 'Illuminating skincare featuring gold essence for glowing, luminous skin.',
    features: ['Gold serum massage', 'Illuminating glow pack', 'Skin polishing', 'Luminous finish']
  },
  {
    id: 'diamond-dust-facial',
    name: 'Diamond Dust Facial',
    category: 'facial',
    categoryName: 'Facial',
    price: 70,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    description: 'Luxurious skincare with micro-diamond dust for an ultra-radiant complexion.',
    features: ['Micro-diamond polishing', 'Complexion brightening', 'Luxury glow mask', 'Skin smoothing']
  },
  {
    id: 'deep-cleansing-facial',
    name: 'Deep Cleansing Facial',
    category: 'facial',
    categoryName: 'Facial',
    price: 80,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1512290900672-1f02e60938c5?auto=format&fit=crop&w=800&q=80',
    description: 'Purifying skincare for a fresh, deeply cleansed, and decongested feel.',
    features: ['Pore decongesting steam', 'Deep extraction', 'Purifying mask', 'Antibacterial therapy']
  },
  {
    id: 'advanced-brightening-facial',
    name: 'Advanced Brightening Facial',
    category: 'facial',
    categoryName: 'Facial',
    price: 80,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Skin-brightening treatment targeting dullness for a luminous, even look.',
    features: ['Alpha-arbutin serum', 'Targeted spot lightening', 'Brightening mask', 'UV defense']
  },
  {
    id: 'special-glam-girl-facial',
    name: 'Special Glam Girl Facial',
    category: 'facial',
    categoryName: 'Facial',
    price: 120,
    duration: '75 min',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    description: 'Signature luxury treatment featuring a full facial, hot towel treatment, and relaxing back massage.',
    features: ['Full signature facial', 'Hot towel treatment', 'Relaxing back massage', 'Hydrating face pack', 'Royal pampering']
  },

  // ==========================================
  // MASSAGE (2 Items)
  // ==========================================
  {
    id: 'indian-head-massage',
    name: 'Indian Head massage',
    category: 'massage',
    categoryName: 'Massage',
    price: 50,
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Traditional warm herbal oil scalp, neck and shoulder massage to melt away stress.',
    features: ['Warm herbal oil', 'Scalp acupressure', 'Neck & shoulder relief', 'Tension melt therapy']
  },
  {
    id: 'body-massage',
    name: 'Body massage',
    category: 'massage',
    categoryName: 'Massage',
    price: 100,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Full body relaxing massage restoring muscle tone and deep relaxation.',
    features: ['Full body therapy', 'Essential oil blend', 'Deep muscle relaxation', 'Stress release']
  },

  // ==========================================
  // HENNA (1 Item)
  // ==========================================
  {
    id: 'henna',
    name: 'Henna',
    category: 'henna',
    categoryName: 'Henna',
    price: 25,
    duration: '20 min',
    image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=800&q=80',
    description: '100% natural organic Rajastani henna designs for hands, feet & hair application.',
    features: ['Arabic & floral motifs', 'Bridal Mehndi couture', 'Organic hair henna', 'Rich long-lasting stain']
  },

  // ==========================================
  // MAKEUP (1 Item)
  // ==========================================
  {
    id: 'makeup',
    name: 'Makeup',
    category: 'makeup',
    categoryName: 'Makeup',
    price: 70,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    description: 'HD Airbrush bridal makeover, engagement glow & glamorous party makeup.',
    features: ['Skin prep & base', 'Eye couture & lashes', 'High-Definition contour', '24-hr setting lock']
  },

  // ==========================================
  // HAIRSTYLING (1 Item)
  // ==========================================
  {
    id: 'hairstyling',
    name: 'Hairstyling',
    category: 'hairstyling',
    categoryName: 'Hairstyling',
    price: 55,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Hollywood waves, bouncy blowouts, party updos & bridal hair styling.',
    features: ['Hot tool curling & waves', 'Volumizing blowout', 'Bridal updos & buns', 'Shine lock setting']
  },

  // ==========================================
  // HAIR CUT (1 Item)
  // ==========================================
  {
    id: 'haircut',
    name: 'Hair cut',
    category: 'haircut',
    categoryName: 'Hair cut',
    price: 45,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    description: 'Bespoke precision haircuts, butterfly layers, bangs & signature blow dry.',
    features: ['Consultation & cut', 'Layers & texturizing', 'Curtain bangs framing', 'Bouncy blowout']
  },

  // ==========================================
  // HAIR COLOR (1 Item)
  // ==========================================
  {
    id: 'haircolor',
    name: 'Hair color',
    category: 'haircolor',
    categoryName: 'Hair color',
    price: 85,
    duration: '90 min',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80',
    description: 'Single process global hair colour, hand-painted balayage, root touch-up & highlights.',
    features: ['Ammonia-free formulas', 'Balayage & ombre', 'Root regrowth coverage', 'Olaplex gloss sealant']
  },

  // ==========================================
  // HAIR TREATMENTS (1 Item)
  // ==========================================
  {
    id: 'hairtreatments',
    name: 'Hair treatments',
    category: 'hairtreatments',
    categoryName: 'Hair treatments',
    price: 85,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    description: 'Royal herbal hair spa, pure keratin smoothing, deep conditioning & straightening.',
    features: ['Herbal steam hair spa', 'Formaldehyde-free keratin', 'Deep cuticle repair', 'High-shine gloss']
  },

  // ==========================================
  // OTHER SERVICES (5 Items)
  // ==========================================
  {
    id: 'brow-lamination',
    name: 'Brow lamination',
    category: 'other',
    categoryName: 'Other Services',
    price: 70,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    description: 'Symmetry, volume and fullness treatment for sleek, lifted eyebrows.',
    features: ['Symmetry brow mapping', 'Lamination perming formula', 'Nourishing kerashield']
  },
  {
    id: 'eyebrow-tinting',
    name: 'Eyebrow tinting',
    category: 'other',
    categoryName: 'Other Services',
    price: 15,
    duration: '20 min',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    description: 'Custom brow dye tinting for fuller, defined eyebrows.',
    features: ['Custom shade matching', 'Long-lasting tint', 'Brow conditioning']
  },
  {
    id: 'eyelash-tinting',
    name: 'Eyelash tinting',
    category: 'other',
    categoryName: 'Other Services',
    price: 20,
    duration: '25 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    description: 'Darkening tint for natural lashes providing mascara-like definition.',
    features: ['Deep jet-black/brown dye', 'Safe ocular formula', 'Zero smudging']
  },
  {
    id: 'indian-head-massage-other',
    name: 'Indian Head massage',
    category: 'other',
    categoryName: 'Other Services',
    price: 50,
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Traditional warm herbal oil scalp, neck and shoulder massage to melt away stress.',
    features: ['Warm herbal oil', 'Scalp acupressure', 'Neck & shoulder relief']
  },
  {
    id: 'body-massage-other',
    name: 'Body massage',
    category: 'other',
    categoryName: 'Other Services',
    price: 100,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Full body relaxing massage restoring muscle tone and deep relaxation.',
    features: ['Full body therapy', 'Essential oil blend', 'Deep muscle relaxation']
  }
];

export const getServiceById = (id) => {
  if (!id) return null;
  return ALL_SERVICES.find(
    (s) => s.id === id || s.name.toLowerCase() === String(id).toLowerCase() || s.id.toLowerCase() === String(id).toLowerCase()
  ) || ALL_SERVICES[0];
};
