// GLAM GIRL BY JANKI — Comprehensive FAQ Master Data
// Verified Questions Categorized for Luxury Salon & Spa Studio
// Preserves all original 22 questions and adds comprehensive new service, pricing, duration, and festival entries.

export const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'booking', label: 'Booking & New Services' },
  { id: 'services', label: 'Services Overview' },
  { id: 'hair', label: 'Hair Care & Styling' },
  { id: 'facials', label: 'Facials & Skincare' },
  { id: 'makeup', label: 'Makeup & Bridal' },
  { id: 'nails', label: 'Nail Treatments' },
  { id: 'waxing', label: 'Waxing & Grooming' },
  { id: 'spa', label: 'Spa & Body Treatments' },
  { id: 'payments', label: 'Prices & Durations' },
  { id: 'offers', label: 'Festival Offers & Promos' },
  { id: 'preparation', label: 'Preparation' },
  { id: 'aftercare', label: 'Aftercare & Support' },
  { id: 'privacy', label: 'Privacy Policy' },
];

export const FAQ_DATA = [
  // -------------------------------------------------------------
  // 1. Booking Appointments (Original Preserved 1–5)
  // -------------------------------------------------------------
  {
    id: 1,
    category: 'booking',
    categoryLabel: 'Booking Appointments',
    question: 'How do I book an appointment?',
    answer: 'You can easily reserve your appointment online through our dedicated Booking page. Simply choose your desired service or treatment ritual, select your preferred date and available time slot, and provide your contact information. No prepayment is required, and your appointment request is confirmed immediately with an on-screen confirmation summary.',
    isPublished: true,
    serviceLink: '/book-appointment'
  },
  {
    id: 2,
    category: 'booking',
    categoryLabel: 'Booking Appointments',
    question: 'Can I choose my preferred stylist?',
    answer: 'Yes. All treatments and rituals at our Ottawa atelier are directed and masterfully executed by salon owner and master beauty director Janki Patel (Khatroja) alongside our certified senior aesthetic specialists. When reserving your appointment, you receive direct masterclass care.',
    isPublished: true
  },
  {
    id: 3,
    category: 'booking',
    categoryLabel: 'Booking Appointments',
    question: 'Can I reschedule or cancel my appointment?',
    answer: 'Yes, we understand that schedules can shift. We offer flexible cancellation and rescheduling without penalties. We kindly request at least 24 hours advance notice whenever possible so we can offer the reserved time slot to waiting guests.',
    isPublished: true
  },
  {
    id: 4,
    category: 'booking',
    categoryLabel: 'Booking Appointments',
    question: 'How early should I arrive?',
    answer: 'We recommend arriving approximately 5 to 10 minutes prior to your scheduled reservation time. This ensures an unhurried arrival, allows you a calm moment to settle into our reception lounge, and gives time for a personalized consultation before your treatment begins.',
    isPublished: true
  },
  {
    id: 5,
    category: 'booking',
    categoryLabel: 'Booking Appointments',
    question: 'Can I book multiple services in one appointment?',
    answer: 'Absolutely. You are welcome to combine multiple treatments—such as eyebrow threading, signature facials, hair styling, organic waxing, or head and body massage—into a single visit. If you need help scheduling seamless back-to-back services, you can also reach out to our concierge directly.',
    isPublished: true,
    serviceLink: '/book-appointment'
  },

  // -------------------------------------------------------------
  // 2. Services and Treatments (Original Preserved 6–10)
  // -------------------------------------------------------------
  {
    id: 6,
    category: 'services',
    categoryLabel: 'Services Overview',
    question: 'What beauty services do you offer?',
    answer: 'GLAM GIRL BY JANKI offers an extensive menu of over 80 luxury beauty rituals in Ottawa, including precision eyebrow threading and tinting, organic waxing, cellular and clinical facials, bridal & party makeup artistry, organic henna and mehndi, precision haircutting, Parisian balayage and highlights, deep hair repair therapies, and therapeutic body massages.',
    isPublished: true,
    serviceLink: '/services'
  },
  {
    id: 7,
    category: 'services',
    categoryLabel: 'Services Overview',
    question: 'How do I choose the right treatment?',
    answer: 'You can browse our complete collection on the Services page, filtered by category with detailed descriptions, durations, and benefits for each treatment. If you are uncertain about which ritual suits your current hair texture, skin profile, or occasion, our team is delighted to provide personalized recommendations.',
    isPublished: true,
    serviceLink: '/services'
  },
  {
    id: 8,
    category: 'payments',
    categoryLabel: 'Prices & Durations',
    question: 'How long does each treatment take?',
    answer: 'Treatment durations vary depending on the service: quick essentials like threading or waxing take 15 to 30 minutes, restorative facials and hair spa treatments take 45 to 75 minutes, and comprehensive transformations such as balayage or full bridal couture take 2 to 3.5 hours. Estimated durations are clearly shown beside each service on our menu.',
    isPublished: true,
    serviceLink: '/price-list'
  },
  {
    id: 9,
    category: 'services',
    categoryLabel: 'Services Overview',
    question: 'Can I request a customized treatment?',
    answer: 'Yes. Bespoke care is the cornerstone of our practice. Every beauty ritual is tailored to your unique skin type, hair needs, tone, and personal aesthetic preferences using gentle, clean, and hypoallergenic botanical formulations.',
    isPublished: true
  },
  {
    id: 10,
    category: 'services',
    categoryLabel: 'Services Overview',
    question: 'Do I need a consultation before certain treatments?',
    answer: 'While every treatment begins with an initial consultation, we specifically recommend an advance in-depth consultation for specialized services such as custom bridal hair & makeup packages, extensive balayage color corrections, or targeted dermal skin therapies. You can schedule a consultation directly through our website.',
    isPublished: true,
    serviceLink: '/contact'
  },

  // -------------------------------------------------------------
  // 3. Pricing and Payments (Original Preserved 11–14)
  // -------------------------------------------------------------
  {
    id: 11,
    category: 'payments',
    categoryLabel: 'Prices & Durations',
    question: 'Where can I find service prices?',
    answer: 'Complete, transparent pricing in Canadian Dollars (CAD) is published directly on our Services and Booking pages. Every treatment displays its exact price so you can make informed choices with complete transparency.',
    isPublished: true,
    serviceLink: '/price-list'
  },
  {
    id: 12,
    category: 'payments',
    categoryLabel: 'Prices & Durations',
    question: 'Which payment methods do you accept?',
    answer: 'We exclusively accept Cash on Delivery (Pay at Appointment), payable in cash at the studio upon completion of your service. Zero online advance deposit or prepayment is required at the time of booking.',
    isPublished: true
  },
  {
    id: 13,
    category: 'offers',
    categoryLabel: 'Festival Offers & Promos',
    question: 'Do you offer packages or special promotions?',
    answer: 'Yes, we periodically offer curated seasonal packages, multi-service bridal bundles, and seasonal promotions. Please inquire during your visit or contact our concierge to discover current packages and offerings.',
    isPublished: true,
    serviceLink: '/services'
  },
  {
    id: 14,
    category: 'payments',
    categoryLabel: 'Prices & Durations',
    question: 'Will I be informed if a treatment price changes?',
    answer: 'Yes, absolutely. We uphold complete transparency: the price of your reserved treatment is confirmed upfront before any service begins. Any optional bespoke additions or specialized upgrades will always be discussed with you beforehand.',
    isPublished: true
  },

  // -------------------------------------------------------------
  // 4. Before Your Appointment (Original Preserved 15–18)
  // -------------------------------------------------------------
  {
    id: 15,
    category: 'preparation',
    categoryLabel: 'Preparation',
    question: 'How should I prepare for my appointment?',
    answer: 'We suggest wearing comfortable clothing for your visit. For skincare and facial rituals, avoid harsh exfoliants, chemical peels, or excessive sun exposure 48 hours prior. For bridal and formal makeup appointments, a button-down or zip-up top is recommended to preserve your styling when changing.',
    isPublished: true
  },
  {
    id: 16,
    category: 'preparation',
    categoryLabel: 'Preparation',
    question: 'Should I arrive with clean hair or skin?',
    answer: 'For makeup services, please arrive with clean, freshly cleansed skin free of heavy products. For facial rituals, light daily wear is fine as we begin with a deep double cleanse. For haircut and styling appointments, clean, dry hair is appreciated unless your service includes our signature shampoo and blowout ritual.',
    isPublished: true
  },
  {
    id: 17,
    category: 'preparation',
    categoryLabel: 'Preparation',
    question: 'What should I do if I have sensitive skin or allergies?',
    answer: 'Please mention any sensitive skin conditions, product allergies, or sensitivities in the notes section when booking, or inform your specialist at the start of your consultation. We formulate rituals with gentle, hypoallergenic botanical lines and can gladly perform a preliminary patch test.',
    isPublished: true
  },
  {
    id: 18,
    category: 'preparation',
    categoryLabel: 'Preparation',
    question: 'Can I bring someone with me?',
    answer: 'To preserve the peaceful, discreet single-guest sanctuary atmosphere of our private studio suite, we kindly ask that guests attend unaccompanied unless attending an organized joint bridal booking or accompanied by an adult for minor guests.',
    isPublished: true
  },

  // -------------------------------------------------------------
  // 5. Aftercare and Support (Original Preserved 19–22)
  // -------------------------------------------------------------
  {
    id: 19,
    category: 'aftercare',
    categoryLabel: 'Aftercare & Support',
    question: 'Will I receive aftercare instructions?',
    answer: 'Yes. At the conclusion of your treatment, your specialist will provide customized aftercare guidance and product recommendations to protect your skin barrier, prolong your hair color or styling, and maintain your salon glow at home.',
    isPublished: true
  },
  {
    id: 20,
    category: 'aftercare',
    categoryLabel: 'Aftercare & Support',
    question: 'What should I do if I have questions after my treatment?',
    answer: 'Our concierge and master aesthetician are always available for aftercare support. If you have any questions or need advice following your appointment, feel free to call us, send an email, or message us via our Contact page.',
    isPublished: true,
    serviceLink: '/contact'
  },
  {
    id: 21,
    category: 'aftercare',
    categoryLabel: 'Aftercare & Support',
    question: 'How can I contact the salon?',
    answer: 'You can contact GLAM GIRL BY JANKI by phone at +1 (616) 255-0549, by email at Glamgirlbyjanki@gmail.com, or visit us at 405 Euphoria Crescent in Ottawa, ON (K2J 7M7). You can also submit an inquiry anytime via our online Contact form.',
    isPublished: true,
    serviceLink: '/contact'
  },
  {
    id: 22,
    category: 'aftercare',
    categoryLabel: 'Aftercare & Support',
    question: 'How can I leave a review?',
    answer: 'We deeply appreciate your feedback! You can share your experience on our website by clicking "Write a Review" on the Reviews page, leaving feedback via the real-time guest review invite popup, or sharing your rating on our Google profile.',
    isPublished: true,
    serviceLink: '/reviews'
  },

  // -------------------------------------------------------------
  // 6. Newly Added Salon Services & Booking (IDs 23–26)
  // -------------------------------------------------------------
  {
    id: 23,
    category: 'services',
    categoryLabel: 'Services Overview',
    question: 'What newly added beauty services and treatments are currently available?',
    answer: 'GLAM GIRL BY JANKI frequently expands our treatment repertoire with advanced beauty techniques. Our newest services include Noor Balayage ($195 CAD, 150 min), Special Glam Girl Facial ($125 CAD, 75 min), Kesariya Hair Spa ($75 CAD, 50 min), Noor Hair Repair Ritual ($95 CAD, 60 min), and Shringar Bridal HD Makeovers ($220 CAD, 90 min). Any new rituals added by our director are instantly synchronized with our live booking catalog.',
    isPublished: true,
    serviceId: 'noor-balayage',
    isDynamicServices: true
  },
  {
    id: 24,
    category: 'booking',
    categoryLabel: 'Booking & New Services',
    question: 'How do I book a newly added or specialized service?',
    answer: 'Booking newly added services is simple: visit our online Booking page, navigate to the relevant category, and select the ritual. Newly introduced services are labeled with a highlight tag and detail exact pricing, duration, and what is included. Select your preferred date and time slot, and your reservation is immediately confirmed with zero online prepayment required.',
    isPublished: true,
    serviceLink: '/book-appointment'
  },
  {
    id: 25,
    category: 'booking',
    categoryLabel: 'Booking & New Services',
    question: 'What should I do if a newly added service time slot appears fully booked?',
    answer: 'If your preferred time slot for a newly added treatment appears booked, please reach out directly to our concierge team at +1 (616) 255-0549 or via our Contact form. We actively manage a flexible waitlist and do our utmost to accommodate special requests or schedule bespoke director sessions.',
    isPublished: true,
    serviceLink: '/contact'
  },
  {
    id: 26,
    category: 'services',
    categoryLabel: 'Services Overview',
    question: 'How frequently does GLAM GIRL BY JANKI introduce new beauty rituals?',
    answer: 'Master Beauty Director Janki Patel curates and integrates new luxury rituals on a seasonal basis, including pre-festive and wedding bridal collections. When a new service is published via our administration catalog, it is immediately updated across the entire website and available for reservation.',
    isPublished: true,
    serviceLink: '/services'
  },

  // -------------------------------------------------------------
  // 7. Hair Care and Styling (IDs 27–29)
  // -------------------------------------------------------------
  {
    id: 27,
    category: 'hair',
    categoryLabel: 'Hair Care & Styling',
    question: 'What hair care, cutting, and styling treatments do you specialize in?',
    answer: 'Our hair atelier specializes in face-sculpting precision cuts ($35–$65 CAD, 30–45 min), bespoke blowout styling ($45 CAD, 30 min), hand-painted Noor Balayage ($195 CAD, 150 min), full foil highlights ($140 CAD, 110 min), ammonia-free Kesariya colour ($85 CAD, 75 min), and royal Rani waves & bridal hair couture ($65–$110 CAD). All cutting and colour services include consultation and professional styling.',
    isPublished: true,
    serviceId: 'noor-signature-haircut',
    serviceLink: '/book-appointment?service=noor-signature-haircut'
  },
  {
    id: 28,
    category: 'hair',
    categoryLabel: 'Hair Care & Styling',
    question: 'What is the difference between Kesariya Hair Spa and Noor Hair Repair Ritual?',
    answer: 'The Kesariya Hair Spa ($75 CAD, 50 min) is a deeply nourishing hydration ritual featuring herbal butter masks, warm steam therapy, and an Ayurvedic scalp massage for dry, lifeless hair. The Noor Hair Repair Ritual ($95 CAD, 60 min) is an intensive bond-rebuilding and keratin repair therapy designed to restructure chemically treated, heat-damaged, or bleached hair with infrared sealing.',
    isPublished: true,
    serviceId: 'kesariya-hair-spa',
    serviceLink: '/book-appointment?service=kesariya-hair-spa'
  },
  {
    id: 29,
    category: 'hair',
    categoryLabel: 'Hair Care & Styling',
    question: 'How should I care for my hair after a Balayage or Highlights colour service?',
    answer: 'To preserve the luminosity of your Balayage or highlights, we recommend using sulfate-free and color-safe shampoos, washing with lukewarm water, applying weekly deep conditioning masks, and using thermal heat protectants before hot styling. We also recommend scheduling a toner gloss or root touch-up ($60 CAD, 45 min) every 6 to 8 weeks.',
    isPublished: true,
    serviceId: 'noor-balayage',
    serviceLink: '/book-appointment?service=noor-balayage'
  },

  // -------------------------------------------------------------
  // 8. Facials and Skincare Treatments (IDs 30–32)
  // -------------------------------------------------------------
  {
    id: 30,
    category: 'facials',
    categoryLabel: 'Facials & Skincare',
    question: 'What facial and clinical skincare treatments do you offer for different skin concerns?',
    answer: 'We offer 10 curated facial rituals tailored to unique skin goals: Express Facial ($45 CAD, 30 min) for quick refreshes, Herbal Ayurvedic Facial ($55 CAD, 45 min) for calming inflammation, Deep Cleansing Facial ($80 CAD, 60 min) with blackhead extraction and clay detox, 24K Golden Glow ($85 CAD, 60 min) for royal tightening, Diamond Dust Micro-Polish ($95 CAD, 60 min) for glass-skin clarity, and our signature Special Glam Girl Facial ($125 CAD, 75 min) combining gold, hydra-infusion, and neck-shoulder relaxation.',
    isPublished: true,
    serviceId: 'special-glam-girl-facial',
    serviceLink: '/book-appointment?service=special-glam-girl-facial'
  },
  {
    id: 31,
    category: 'facials',
    categoryLabel: 'Facials & Skincare',
    question: 'Which facial treatment is best suited for sensitive or acne-prone skin?',
    answer: 'For sensitive skin, our Herbal Facial ($55 CAD, 45 min) uses pure neem, tulsi, and aloe extracts to calm redness without aggressive chemicals. For congested or acne-prone skin, our Deep Cleansing Facial ($80 CAD, 60 min) includes gentle steam, manual blackhead extraction, high-frequency antibacterial therapy, and a purifying clay mask.',
    isPublished: true,
    serviceId: 'herbal-facial',
    serviceLink: '/book-appointment?service=herbal-facial'
  },
  {
    id: 32,
    category: 'facials',
    categoryLabel: 'Facials & Skincare',
    question: 'How often should I schedule a facial for long-term skin health and radiance?',
    answer: 'Because the skin cellular turnover cycle takes approximately 28 days, we recommend a restorative facial every 3 to 4 weeks for optimal skin barrier maintenance. For acute concerns like hyperpigmentation or wedding preparation, a series of 3 to 4 treatments spaced 2 weeks apart yields remarkable radiance.',
    isPublished: true,
    serviceId: 'deep-cleansing-facial',
    serviceLink: '/book-appointment?service=deep-cleansing-facial'
  },

  // -------------------------------------------------------------
  // 9. Makeup and Bridal Packages (IDs 33–35)
  // -------------------------------------------------------------
  {
    id: 33,
    category: 'makeup',
    categoryLabel: 'Makeup & Bridal',
    question: 'What bridal makeup, hair couture, and Mehndi packages do you offer?',
    answer: 'Our bridal offerings include Shringar Bridal HD Makeover ($220 CAD, 90 min) engineered for 16+ hour water-resistant wear with false mink lashes, dupatta setting, and jewelry placement; White Dress Bride ($250 CAD, 120 min) with romantic glass skin and veil placement; Bridal Hair Styling ($110 CAD, 60 min); and Bridal Mehndi ($180 CAD, 120 min) with intricate custom storytelling motifs and dark stain clove sealants.',
    isPublished: true,
    serviceId: 'shringar-bridal-makeup',
    serviceLink: '/book-appointment?service=shringar-bridal-makeup'
  },
  {
    id: 34,
    category: 'makeup',
    categoryLabel: 'Makeup & Bridal',
    question: 'Can I book a bridal trial or customize a multi-event bridal party package?',
    answer: 'Yes! We encourage all brides-to-be to schedule an advance bridal consultation and trial session. We also design comprehensive packages bundling bridal hair, makeup, henna, and party styling for bridesmaids, mothers, and sangeet celebrations.',
    isPublished: true,
    serviceId: 'white-dress-bride',
    serviceLink: '/contact'
  },
  {
    id: 35,
    category: 'makeup',
    categoryLabel: 'Makeup & Bridal',
    question: 'How far in advance should I reserve bridal hair, makeup, and mehndi?',
    answer: 'For weddings and major bridal celebrations, we strongly recommend reserving your date 3 to 6 months in advance, especially for prime spring, summer, and autumn dates. Contact our bridal concierge to check date availability and review contract terms.',
    isPublished: true,
    serviceId: 'bridal-mehndi',
    serviceLink: '/book-appointment?service=bridal-mehndi'
  },

  // -------------------------------------------------------------
  // 10. Nail Treatments (IDs 36–37)
  // -------------------------------------------------------------
  {
    id: 36,
    category: 'nails',
    categoryLabel: 'Nail Treatments',
    question: 'What nail treatments, manicures, and pedicures do you provide?',
    answer: 'Our nail sanctuary offers precision cuticle grooming, express botanical manicures, luxury spa pedicures, and structured gel overlays. Every nail service is performed in a clean, tranquil, odor-free environment using premium non-toxic polishes, hydrating cuticle serums, and skin-softening botanical scrubs.',
    isPublished: true,
    serviceLink: '/services'
  },
  {
    id: 37,
    category: 'nails',
    categoryLabel: 'Nail Treatments',
    question: 'How does the salon ensure medical-grade sterilization for nail and grooming tools?',
    answer: 'Guest health and safety is our foremost commitment. All stainless steel implements (nail nippers, pushers, tweezers, scissors) undergo hospital-grade ultrasonic sanitization and autoclave sterilization sealed in single-use sterilization pouches. Nail files, buffers, and foot sanding pads are strictly 100% disposable single-use.',
    isPublished: true
  },

  // -------------------------------------------------------------
  // 11. Waxing and Grooming (IDs 38–39)
  // -------------------------------------------------------------
  {
    id: 38,
    category: 'waxing',
    categoryLabel: 'Waxing & Grooming',
    question: 'What waxing and grooming techniques do you use, and is it suitable for sensitive skin?',
    answer: 'We provide gentle organic strip and stripless waxing across all body zones, including Full Legs ($55 CAD, 45 min), Half Legs ($35 CAD, 25 min), Bikini Lines ($35 CAD, 25 min), and Full Back ($45 CAD, 35 min). Our low-temperature wax adheres only to hairs rather than the delicate skin barrier, and every session concludes with calming lavender body milk.',
    isPublished: true,
    serviceId: 'full-legs-waxing',
    serviceLink: '/book-appointment?service=full-legs-waxing'
  },
  {
    id: 39,
    category: 'waxing',
    categoryLabel: 'Waxing & Grooming',
    question: 'What is the difference between eyebrow threading and facial waxing?',
    answer: 'Eyebrow Threading ($10 CAD, 15 min) uses pure 100% sanitized organic cotton thread to cleanly remove hairs at the follicle with millimeter arch precision without peeling skin, making it ideal for clients with sensitive skin or those using retinoids. Facial waxing covers larger surface areas quickly. We offer both so you can choose what feels best for your skin.',
    isPublished: true,
    serviceId: 'eyebrow-threading',
    serviceLink: '/book-appointment?service=eyebrow-threading'
  },

  // -------------------------------------------------------------
  // 12. Spa and Body Treatments (IDs 40–41)
  // -------------------------------------------------------------
  {
    id: 40,
    category: 'spa',
    categoryLabel: 'Spa & Body Treatments',
    question: 'What spa, relaxation, and holistic body treatments are available?',
    answer: 'Our holistic spa rituals include Shanti Relaxation Massage ($85 CAD, 60 min) using warm herbal botanical oils and rhythmic strokes to dissolve muscular stress, and Indian Head Massage ($45 CAD, 30 min) featuring traditional Ayurvedic acupressure for the scalp, neck, and shoulders to relieve headaches and restore calm.',
    isPublished: true,
    serviceId: 'shanti-relaxation-massage',
    serviceLink: '/book-appointment?service=shanti-relaxation-massage'
  },
  {
    id: 41,
    category: 'spa',
    categoryLabel: 'Spa & Body Treatments',
    question: 'Can I combine a body massage or scalp therapy with a facial or hair treatment?',
    answer: 'Yes! Combining treatments into a restorative half-day spa retreat is one of our most popular guest choices. Many guests pair an Indian Head Massage with a Kesariya Hair Spa or follow a Shanti Relaxation Massage with our Special Glam Girl Facial. You can select multiple services seamlessly during online booking.',
    isPublished: true,
    serviceId: 'indian-head-massage',
    serviceLink: '/book-appointment?service=indian-head-massage'
  },

  // -------------------------------------------------------------
  // 13. Service Prices and Treatment Durations (IDs 42–43)
  // -------------------------------------------------------------
  {
    id: 42,
    category: 'payments',
    categoryLabel: 'Prices & Durations',
    question: 'What are your treatment price ranges and service durations?',
    answer: 'Our pricing and timing are completely transparent: Quick essentials (threading, waxing, trims) range from $6 to $35 CAD and take 5 to 30 minutes. Restorative rituals (facials, head massages, hair spas) range from $45 to $125 CAD and take 30 to 75 minutes. Comprehensive transformations (balayage, full bridal couture, intricate mehndi) range from $110 to $250 CAD and take 90 to 150 minutes. All rates are listed openly on our Price List page.',
    isPublished: true,
    serviceLink: '/price-list'
  },
  {
    id: 43,
    category: 'payments',
    categoryLabel: 'Prices & Durations',
    question: 'Are the prices listed on your website guaranteed with no surprise charges?',
    answer: 'Yes, 100%. We believe luxury hospitality requires total financial clarity. The price displayed in our online booking directory and price list is the exact price you pay at the salon. Any optional bespoke additions (such as extra hair toner or specialized nail art) will always be explicitly explained and confirmed with you beforehand.',
    isPublished: true,
    serviceLink: '/price-list'
  },

  // -------------------------------------------------------------
  // 14. Festival Offers and Promotional Packages (IDs 44–45)
  // -------------------------------------------------------------
  {
    id: 44,
    category: 'offers',
    categoryLabel: 'Festival Offers & Promos',
    question: 'Do you offer festival offers, seasonal promotions, and celebratory packages?',
    answer: 'Yes! GLAM GIRL BY JANKI celebrates all major cultural and festive milestones—including Diwali, Navratri, Karwa Chauth, Eid, Christmas, New Year, and Valentine\'s Day—with curated beauty packages and seasonal savings. First-time guests can also enjoy 15% off their debut facial or bridal consultation using promo code GLOW15.',
    isPublished: true,
    isDynamicOffers: true,
    serviceLink: '/services'
  },
  {
    id: 45,
    category: 'offers',
    categoryLabel: 'Festival Offers & Promos',
    question: 'How do I apply or redeem a promotional coupon code when booking online?',
    answer: 'When booking online, simply choose your desired treatment and enter your promotional code (such as GLOW15 or BRIDALVIP) in the "Special Requests or Notes" box on the booking form. When you arrive at our Ottawa atelier, your discount is verified and deducted from your final checkout balance.',
    isPublished: true,
    serviceLink: '/book-appointment'
  },

  // -------------------------------------------------------------
  // 15. Privacy Policy & Data Security (IDs 46–54)
  // -------------------------------------------------------------
  {
    id: 46,
    category: 'privacy',
    categoryLabel: 'Privacy Policy',
    question: 'How does GLAM GIRL BY JANKI handle my personal information?',
    answer: 'GLAM GIRL BY JANKI handles your personal information with strict confidentiality and respect. We collect guest information exclusively to coordinate appointments, confirm reservations, provide personalized consultations, and communicate essential treatment updates. We operate under a dedicated single-occupancy privacy protocol and never sell, rent, lease, or monetize customer details to third-party advertisers. For complete details on our collection, handling, and retention practices, please review our full Privacy Policy.',
    isPublished: true,
    serviceLink: '/privacy-policy',
    linkText: 'Read Full Privacy Policy'
  },
  {
    id: 47,
    category: 'privacy',
    categoryLabel: 'Privacy Policy',
    question: 'What information is collected when I book an appointment?',
    answer: 'When reserving an appointment through our online booking system, we collect only the details necessary to coordinate your visit: your full name, telephone number, email address, chosen beauty treatment, and preferred date and time slot. You may also optionally provide service notes (such as skin sensitivities or promo codes). We do not collect credit card numbers or financial details on our booking form, as appointments require no online prepayment.',
    isPublished: true,
    serviceLink: '/book-appointment'
  },
  {
    id: 48,
    category: 'privacy',
    categoryLabel: 'Privacy Policy',
    question: 'Is my personal information secure?',
    answer: 'We employ industry-standard technical, administrative, and physical safeguards to protect guest information. All traffic across our website is encrypted using HTTPS/TLS, administrative portal access is restricted with password protection, and client records are stored securely within local and database storage environments. While no digital transmission or online storage method can be guaranteed as 100% impenetrable, we take all reasonable and prudent precautions to safeguard your records.',
    isPublished: true
  },
  {
    id: 49,
    category: 'privacy',
    categoryLabel: 'Privacy Policy',
    question: 'Is my information shared with third parties?',
    answer: 'We only share information with verified third-party service providers essential for atelier operations and guest communications. This includes direct appointment messaging tools (such as WhatsApp or telephone services when you choose to connect), mapping services (Google Maps to help guests navigate to our Ottawa studio), and certified point-of-sale merchant terminals for in-person payments. We do not sell, trade, or share your data with external marketing brokers or advertising networks.',
    isPublished: true
  },
  {
    id: 50,
    category: 'privacy',
    categoryLabel: 'Privacy Policy',
    question: 'How are my booking and payment details handled?',
    answer: 'Our online booking portal is completely free of prepayment or deposit requirements. Your reservation is stored securely and confirmed with an on-screen booking summary. Payment is handled exclusively in person at our Ottawa atelier upon completion of your treatment ritual, using certified debit/credit card POS terminals (Interac, Visa, Mastercard, AMEX) or cash. We do not store, process, or collect credit card information on this website.',
    isPublished: true,
    serviceLink: '/price-list'
  },
  {
    id: 51,
    category: 'privacy',
    categoryLabel: 'Privacy Policy',
    question: 'Can I request access to or deletion of my personal information?',
    answer: 'Yes. Under Canadian privacy principles (including PIPEDA), guests have the right to request access to their personal records or ask for corrections and deletion. If you would like to review, update, or remove your contact and appointment history from our active records, please contact our concierge at Glamgirlbyjanki@gmail.com or call +1 (616) 255-0549. We will verify your identity and fulfill your request in a timely manner.',
    isPublished: true,
    serviceLink: '/contact'
  },
  {
    id: 52,
    category: 'privacy',
    categoryLabel: 'Privacy Policy',
    question: 'Does the website use cookies or similar technologies?',
    answer: 'GLAM GIRL BY JANKI does not use third-party tracking cookies, advertising pixels, or cross-site behavioral monitoring tools. Our website utilizes standard browser local storage (localStorage) strictly for essential functionality—such as preserving your appointment booking status, managing administrative portal sessions, and caching FAQ and treatment catalog preferences locally on your browser.',
    isPublished: true
  },
  {
    id: 53,
    category: 'privacy',
    categoryLabel: 'Privacy Policy',
    question: 'How can I contact the salon about privacy concerns?',
    answer: 'For any inquiries, requests, or privacy concerns, you can contact salon director Janki Patel directly by email at Glamgirlbyjanki@gmail.com, by phone at +1 (616) 255-0549, or by visiting our private studio at 405 Euphoria Crescent, Ottawa, ON (K2J 7M7). You can also submit an inquiry through our online Contact page.',
    isPublished: true,
    serviceLink: '/contact'
  },
  {
    id: 54,
    category: 'privacy',
    categoryLabel: 'Privacy Policy',
    question: 'Where can I read the full Privacy Policy?',
    answer: 'You can read our complete, dedicated Privacy Policy by visiting our Privacy Policy page. It provides comprehensive information on our data practices, local storage usage, security safeguards, guest rights, and contact details.',
    isPublished: true,
    serviceLink: '/privacy-policy',
    linkText: 'Read Full Privacy Policy'
  }
];
