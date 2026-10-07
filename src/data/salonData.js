// GLAM GIRL BY JANKI — Salon Metadata & Legacy Data Engine

export const FEATURED_SERVICES = [
  {
    id: 'signature-haircut',
    name: 'Signature Precision Haircut & Blowdry',
    category: 'hair',
    categoryName: 'Hair Care',
    price: 65,
    duration: '45 mins',
    rating: 4.9,
    reviewsCount: 128,
    image: '/images/hair-care/53-noor-signature-haircut.webp',
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
    image: '/images/hair-care/58-noor-balayage.webp',
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
    image: '/images/hair-care/62-kesariya-hair-spa.webp',
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
    image: '/images/services/facial/32-golden-glow.webp',
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
    image: '/images/services/facial/35-advanced-brightening-facial.webp',
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
    image: '/images/services/threading/07-sitara-full-face-threading.webp',
    popular: true,
    tag: 'Daily Essential',
    description: 'Precision Indian thread shaping for brows and upper lip, plus gentle organic strip-less waxing for smooth, soft skin.',
    features: ['Hypoallergenic stripless wax', 'Precision arch shaping', 'Soothing aloe-vera mist', 'No redness irritation formula']
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
    image: '/images/services/makeup/44-shringar-bridal-makeup.webp',
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
    image: '/images/services/makeup/47-party-makeup.webp',
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
    image: '/images/services/massage/37-shanti-relaxation-massage.webp',
    popular: true,
    tag: 'Relaxation',
    description: 'Custom blend of lavender, jasmine and ylang-ylang essential oils to melt away tension, improve circulation and restore serene calm.',
    features: ['Custom essential oil blends', 'Heated basalt stones', 'Full-body muscle relaxation', 'Chamomile herbal tea service']
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Ottawa Local, Kanata',
    avatar: '/images/services/makeup/43-noor-signature-makeup.webp',
    rating: 5,
    text: 'Glam Girl by Janki is truly the best salon experience in Ottawa! The balayage and gold facial made me feel so pampered and confident for my sister’s wedding.',
    date: '2 weeks ago',
    service: 'Luxe Balayage & Gold Facial'
  },
  {
    id: 2,
    name: 'Emily Tremblay',
    role: 'ByWard Market Resident',
    avatar: '/images/services/makeup/47-party-makeup.webp',
    rating: 5,
    text: 'The ambience is pure luxury yet so warm and welcoming. My haircut and styling by Janki lasted weeks with zero issues. A true artist!',
    date: '1 month ago',
    service: 'Signature Haircut & Styling'
  },
  {
    id: 3,
    name: 'Ananya Patel',
    role: 'Nepean, Ottawa',
    avatar: '/images/services/makeup/48-engagement-makeup.webp',
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
    image: '/images/hair-care/50-bridal-hair-styling.webp',
    tag: 'Bridal'
  },
  {
    id: 2,
    title: 'Hydra Radiant Glass Skin',
    category: 'Skin Care',
    image: '/images/services/facial/36-special-glam-girl-facial.webp',
    tag: 'Facial'
  },
  {
    id: 3,
    title: 'Warm Honey Balayage',
    category: 'Hair Care',
    image: '/images/hair-care/58-noor-balayage.webp',
    tag: 'Colour'
  },
  {
    id: 4,
    title: 'Airbrush Glow Party Makeup',
    category: 'Makeup',
    image: '/images/services/makeup/44-shringar-bridal-makeup.webp',
    tag: 'Glam'
  },
  {
    id: 5,
    title: 'Zen Botanical Spa Treatment',
    category: 'Spa & Wellness',
    image: '/images/services/massage/37-shanti-relaxation-massage.webp',
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
    answer: 'Our luxury salon is conveniently located in Ottawa, ON, with free dedicated guest parking behind the studio.'
  },
  {
    question: 'What professional product brands do you use?',
    answer: 'We exclusively partner with clean, high-performance luxury brands including Olaplex, Kérastase, Dermalogica, and certified Ayurvedic herbal formulations.'
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
  subtitle: 'Women\'s Luxury Beauty Studio by Janki Khatroja',
  address: '405 Euphoria Crescent',
  city: 'Ottawa, ON K2J 7M7',
  phone: '+1 (616) 255-0549',
  email: 'Glamgirlbyjanki@gmail.com',
  hours: [
    { days: 'Monday – Friday', time: '9:30 AM – 7:30 PM' },
    { days: 'Saturday', time: '9:00 AM – 7:00 PM' },
    { days: 'Sunday', time: '10:00 AM – 5:30 PM' }
  ]
};
