// Complete, clean treatment dataset for GLAM GIRL BY JANKI
// Contains ONLY the 10 requested services

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
  {
    id: 'threading',
    name: 'Threading',
    category: 'threading',
    categoryName: 'Threading',
    price: 15,
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    description: 'Precision eyebrow, upper lip, chin & full face cotton thread shaping.',
    features: ['Eyebrow shaping', 'Upper lip threading', 'Full face hair removal', 'Aloe vera soothing gel']
  },
  {
    id: 'waxing',
    name: 'Waxing',
    category: 'waxing',
    categoryName: 'Waxing',
    price: 25,
    duration: '20 min',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    description: 'Gentle stripless hard wax & warm honey wax for smooth, hair-free skin.',
    features: ['Face & brow waxing', 'Arms & underarms waxing', 'Legs waxing', 'Soothing oil finish']
  },
  {
    id: 'facial',
    name: 'Facial',
    category: 'facial',
    categoryName: 'Facial',
    price: 65,
    duration: '50 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    description: 'Deep cleansing, 24K Gold, Hydra-Glow & herbal Ayurvedic facial therapies.',
    features: ['Deep pore cleanse', 'Exfoliation & steam', 'Custom herbal mask', 'Glowing hydration seal']
  },
  {
    id: 'massage',
    name: 'Massage',
    category: 'massage',
    categoryName: 'Massage',
    price: 50,
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Therapeutic warm oil head & scalp massage, neck relief & body relaxation.',
    features: ['Warm herbal oil', 'Scalp acupressure', 'Neck & shoulder relief', 'Tension melt therapy']
  },
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
  }
];

export const getServiceById = (id) => {
  if (!id) return null;
  return ALL_SERVICES.find(
    (s) => s.id === id || s.name.toLowerCase() === String(id).toLowerCase() || s.id.toLowerCase() === String(id).toLowerCase()
  ) || ALL_SERVICES[0];
};
