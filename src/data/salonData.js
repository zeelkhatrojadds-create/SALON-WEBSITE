// Comprehensive salon mock data for Girl Looked For You, Ottawa

export const CATEGORIES = [
  {
    id: 'threading',
    name: 'Threading',
    slug: 'threading',
    icon: 'Feather',
    count: 8,
    description: 'Precision cotton thread shaping for eyebrows, upper lip, chin & full face.'
  },
  {
    id: 'waxing',
    name: 'Waxing',
    slug: 'waxing',
    icon: 'Sparkle',
    count: 19,
    description: 'Gentle stripless hard wax & warm honey wax for smooth, hair-free skin.'
  },
  {
    id: 'facial',
    name: 'Facial',
    slug: 'facial',
    icon: 'Sparkles',
    count: 7,
    description: '24K Gold, Hydra-Glow, Ayurvedic Kumkumadi & deep cleansing facials.'
  },
  {
    id: 'massage',
    name: 'Massage',
    slug: 'massage',
    icon: 'Flower2',
    count: 4,
    description: 'Therapeutic head & scalp massage, aromatherapy & deep relaxation.'
  },
  {
    id: 'henna',
    name: 'Henna',
    slug: 'henna',
    icon: 'Palette',
    count: 5,
    description: 'Rajastani organic bridal Mehndi, party henna art & natural hair henna.'
  },
  {
    id: 'makeup',
    name: 'Makeup',
    slug: 'makeup',
    icon: 'Wand2',
    count: 5,
    description: 'Royal HD Airbrush bridal makeover, engagement & evening glam.'
  },
  {
    id: 'hairstyling',
    name: 'Hairstyling',
    slug: 'hairstyling',
    icon: 'Sparkles',
    count: 5,
    description: 'Hollywood waves, voluminous blowouts, bridal updos & event styling.'
  },
  {
    id: 'haircut',
    name: 'Hair cut',
    slug: 'hair-cut',
    icon: 'Scissors',
    count: 4,
    description: 'Bespoke precision haircuts, butterfly layers & face-framing fringe.'
  },
  {
    id: 'haircolor',
    name: 'Hair color',
    slug: 'hair-color',
    icon: 'Droplets',
    count: 6,
    description: 'Hand-painted balayage, single process colour, root touch-ups & highlights.'
  },
  {
    id: 'hairtreatments',
    name: 'Hair treatments',
    slug: 'hair-treatments',
    icon: 'Heart',
    count: 6,
    description: 'Royal herbal hair spa, pure keratin smoothing & deep repair treatments.'
  }
];

export const BENEFITS = [
  {
    id: 1,
    title: 'Certified Experts',
    subtitle: 'Skilled professionals with years of experience',
    icon: 'ShieldCheck',
    badge: 'Certified'
  },
  {
    id: 2,
    title: 'Premium Products',
    subtitle: 'Safe & high-quality beauty products',
    icon: 'Sparkles',
    badge: '100% Safe'
  },
  {
    id: 3,
    title: 'Flexible Booking',
    subtitle: 'Easy online booking & quick confirmation',
    icon: 'Clock',
    badge: 'Instant'
  },
  {
    id: 4,
    title: 'Your Beauty, Our Priority',
    subtitle: 'We care about your skin, hair and happiness',
    icon: 'Heart',
    badge: '5-Star Care'
  }
];

export const SERVICES = [
  {
    id: 'haircut-styling',
    name: 'Signature Haircut & Blowdry Styling',
    category: 'hair',
    categoryName: 'Hair Care',
    price: 65,
    duration: '45 mins',
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    popular: true,
    tag: 'Best Seller',
    description: 'Precision consultation, customized shampoo ritual, scalp massage, master haircut, and a voluminous blowout finish.',
    features: ['Custom scalp diagnostics', 'Organic botanical shampoo', 'Expert blowout styling', 'Heat protection serum']
  },
  {
    id: 'balayage-colour',
    name: 'Luxe Balayage & Gloss Finish',
    category: 'hair',
    categoryName: 'Hair Care',
    price: 195,
    duration: '150 mins',
    rating: 5.0,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    popular: true,
    tag: 'Trending',
    description: 'Hand-painted dimensional balayage highlights seamlessly tailored to your skin tone, sealed with an ultra-reflective toner gloss.',
    features: ['Custom color formulation', 'Olaplex bond builder', 'Toner gloss glaze', 'Post-color conditioning']
  },
  {
    id: 'ayurvedic-hair-spa',
    name: 'Royal Herbal Hair Spa & Scalp Therapy',
    category: 'hair',
    categoryName: 'Hair Care',
    price: 85,
    duration: '60 mins',
    rating: 4.9,
    reviewsCount: 82,
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    popular: false,
    tag: 'Relaxing',
    description: 'Traditional warm herb-infused oil massage, steam infusion, deep nourishing mask, and tension-relief shoulder massage.',
    features: ['Warm Brahmi & Bhringraj oils', 'Herbal steam therapy', 'Deep cuticle repair mask', 'Acupressure head massage']
  },
  {
    id: 'hydra-glow-facial',
    name: '24K Gold & Hydra-Glow Facial',
    category: 'skin',
    categoryName: 'Skin Care',
    price: 135,
    duration: '75 mins',
    rating: 4.9,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    popular: true,
    tag: 'Most Loved',
    description: 'Deep pore vacuum suction, gentle AHA/BHA exfoliation, gold serum infusion, and LED phototherapy for an unmissable luminous radiance.',
    features: ['Hydro-dermabrasion exfoliation', '24K pure gold leaf mask', 'Hyaluronic moisture bath', 'Rose quartz lymphatic drainage']
  },
  {
    id: 'ayurvedic-brightening-facial',
    name: 'Saffron & Kumkumadi Brightening Facial',
    category: 'skin',
    categoryName: 'Skin Care',
    price: 110,
    duration: '60 mins',
    rating: 4.8,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1512290900672-1f02e60938c5?auto=format&fit=crop&w=800&q=80',
    popular: false,
    tag: 'Organic',
    description: 'Pure Kashmiri saffron, cold-pressed Kumkumadi oil, gentle sandalwood ubtan, and cooling rose water mist to reduce pigmentation.',
    features: ['Handcrafted sandalwood polish', 'Kumkumadi oil massage', 'Herbal anti-tanning pack', 'Chilled rose water compress']
  },
  {
    id: 'threading-waxing-combo',
    name: 'Eyebrow Threading & Herbal Glow Waxing',
    category: 'skin',
    categoryName: 'Skin Care',
    price: 45,
    duration: '35 mins',
    rating: 4.9,
    reviewsCount: 240,
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    popular: true,
    tag: 'Daily Essential',
    description: 'Precision Indian thread shaping for brows and upper lip, plus gentle organic strip-less waxing for smooth, soft skin.',
    features: ['Hypoallergenic stripless wax', 'Precision arch shaping', 'Soothing aloe-vera mist', 'No redness irritation formula']
  },
  {
    id: 'deluxe-gel-manicure',
    name: 'Deluxe Rose & Milk Gel Manicure',
    category: 'nails',
    categoryName: 'Nail Care',
    price: 60,
    duration: '50 mins',
    rating: 4.9,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    popular: true,
    tag: 'Popular',
    description: 'Nourishing rose petal hand soak, gentle cuticle care, exfoliating sugar scrub, long-lasting LED gel polish and nourishing cuticle oil.',
    features: ['Organic rose petal soak', 'Diamond file shaping', '3-week chip-free gel', 'Warm paraffin moisturising wax']
  },
  {
    id: 'spa-pedicure-botanical',
    name: 'Botanical Eucalyptus & Peppermint Pedicure',
    category: 'nails',
    categoryName: 'Nail Care',
    price: 75,
    duration: '60 mins',
    rating: 4.8,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80',
    popular: false,
    tag: 'Soothing',
    description: 'Jet foot spa bath with Himalayan pink salt, calloused heel buffing, mint mud mask with hot towel wrap, and deep calf massage.',
    features: ['Himalayan salt soak', 'Callus smoothing therapy', 'Hot towel herbal wrap', 'Calf acupressure massage']
  },
  {
    id: 'bridal-makeover',
    name: 'Royal Bridal Makeover & Hair Couture',
    category: 'makeup',
    categoryName: 'Makeup',
    price: 350,
    duration: '180 mins',
    rating: 5.0,
    reviewsCount: 65,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    popular: true,
    tag: 'Signature Bridal',
    description: 'Full HD / Airbrush bridal makeup tailored for all ceremonies, dupatta/veil setting, bridal jewelry placement and luxury lashes.',
    features: ['High-Definition 24-hr base', 'Mink silk luxury lashes', 'Dupatta/Sari draping & pin', 'Bridal touch-up luxury kit']
  },
  {
    id: 'glam-party-makeup',
    name: 'Evening Glam & Party Makeover',
    category: 'makeup',
    categoryName: 'Makeup',
    price: 125,
    duration: '75 mins',
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    popular: true,
    tag: 'Cocktail & Party',
    description: 'Smokey or soft-glam eye makeup, luminous skin, contour & highlight, premium faux mink lashes, and all-day setting lock.',
    features: ['Custom eye artistry', 'Waterproof longwear formula', 'Contour & highlight sculpt', 'Lash application included']
  },
  {
    id: 'aromatherapy-body-spa',
    name: 'Aromatherapy Serenity Full Body Massage',
    category: 'spa',
    categoryName: 'Spa & Wellness',
    price: 120,
    duration: '75 mins',
    rating: 4.9,
    reviewsCount: 73,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    popular: true,
    tag: 'Relaxation',
    description: 'Custom blend of lavender, jasmine and ylang-ylang essential oils to melt away tension, improve circulation and restore serene calm.',
    features: ['Custom essential oil blends', 'Heated basalt stones', 'Full-body muscle relaxation', 'Chamomile herbal tea service']
  },
  {
    id: 'rejuvenating-body-polish',
    name: 'Rose & Sandalwood Body Glow Polish',
    category: 'spa',
    categoryName: 'Spa & Wellness',
    price: 110,
    duration: '60 mins',
    rating: 4.8,
    reviewsCount: 51,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    popular: false,
    tag: 'Glow Ritual',
    description: 'Gentle sugar & crushed rose petal exfoliation, warm shower rinse, followed by sandalwood body butter massage for velvety skin.',
    features: ['Organic rose petal scrub', 'Sandalwood hydration butter', 'Silky skin transformation', 'Detoxifying lymph stimulation']
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Ottawa Local, Kanata',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Glam Girl by Janki is truly the best salon experience in Ottawa! The balayage and gold facial made me feel so pampered and confident for my sister’s wedding.',
    date: '2 weeks ago',
    service: 'Luxe Balayage & Gold Facial'
  },
  {
    id: 2,
    name: 'Emily Tremblay',
    role: 'ByWard Market Resident',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'The ambience is pure luxury yet so warm and welcoming. My haircut and gel manicure by Janki lasted weeks with zero chipping. A true artist!',
    date: '1 month ago',
    service: 'Signature Haircut & Gel Manicure'
  },
  {
    id: 3,
    name: 'Ananya Patel',
    role: 'Nepean, Ottawa',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Finally found an Ottawa salon that does perfect eyebrow threading and herbal hair spa! Janki Khatroja takes such good care of you from the moment you step in.',
    date: '3 weeks ago',
    service: 'Herbal Hair Spa & Threading'
  }
];

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Bridal Elegance Hair Styling',
    category: 'Hair Care',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    tag: 'Bridal'
  },
  {
    id: 2,
    title: 'Hydra Radiant Glass Skin',
    category: 'Skin Care',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    tag: 'Facial'
  },
  {
    id: 3,
    title: 'Rose Gold Chrome Nails',
    category: 'Nail Care',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    tag: 'Nails'
  },
  {
    id: 4,
    title: 'Warm Honey Balayage',
    category: 'Hair Care',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    tag: 'Colour'
  },
  {
    id: 5,
    title: 'Airbrush Glow Party Makeup',
    category: 'Makeup',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    tag: 'Glam'
  },
  {
    id: 6,
    title: 'Zen Botanical Spa Treatment',
    category: 'Spa & Wellness',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    tag: 'Wellness'
  }
];

export const FAQS = [
  {
    question: 'How do I book an appointment at Glam Girl by Janki?',
    answer: 'You can easily book online by clicking the "Book Appointment" button, selecting your desired service, date, and preferred time slot. You will receive an instant confirmation summary.'
  },
  {
    question: 'Where is your Ottawa salon located?',
    answer: 'Our luxury salon is conveniently located at 450 Bank Street, Central Ottawa, ON, with free dedicated guest parking behind the studio.'
  },
  {
    question: 'What professional product brands do you use?',
    answer: 'We exclusively partner with clean, high-performance luxury brands including Olaplex, Kérastase, Dermalogica, OPI GelColor, and certified Ayurvedic herbal formulations.'
  },
  {
    question: 'Do you offer bridal makeup trials and group bookings?',
    answer: 'Yes! Janki Khatroja offers customized bridal packages that include trials, bridal hair couture, HD makeup, draping, and group styling for bridesmaids and family.'
  },
  {
    question: 'What is your cancellation or rescheduling policy?',
    answer: 'We kindly request at least 24 hours notice for any cancellations or rescheduling so we can accommodate other guests.'
  }
];

export const SALON_INFO = {
  name: 'GLAM GIRL BY JANKI',
  subtitle: 'Women\'s Beauty Studio by Janki Khatroja',
  address: '450 Bank Street, Suite 201',
  city: 'Ottawa, ON K2P 1Y9',
  phone: '(613) 555-GLOW (4569)',
  email: 'hello@glamgirlbyjanki.ca',
  hours: [
    { days: 'Monday – Friday', time: '9:30 AM – 7:30 PM' },
    { days: 'Saturday', time: '9:00 AM – 7:00 PM' },
    { days: 'Sunday', time: '10:00 AM – 5:30 PM' }
  ]
};
