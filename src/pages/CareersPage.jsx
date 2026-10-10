import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ArrowDown, 
  Send, 
  UploadCloud, 
  ShieldCheck, 
  Check, 
  Compass, 
  BookOpen, 
  Armchair, 
  HeartHandshake, 
  ArrowRight,
  MessageCircle,
  Mail,
  Lock,
  FileText,
  Building2,
  Phone,
  MapPin,
  Clock,
  Sparkle
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal/ScrollReveal';

// Images from assets
import founderPortrait from '../assets/janki-khatroja.webp';
import salonInterior from '../assets/atelier-salon-interior.webp';

const ARTISAN_POSITIONS = [
  {
    id: 'hair-direction',
    category: 'HAIR DIRECTION',
    filterTag: 'HAIR DIRECTION',
    title: 'Master Hair Stylist & Balayage Artisan',
    employmentType: 'Full-Time / Part-Time',
    location: 'Ottawa Flagship · Salon Floor',
    description: 'Seeking a visionary colorist versed in multi-dimensional French balayage, tonal melts, and high-precision structural cuts with a refined clientele.',
    bullets: [
      '4+ Years Atelier or Luxury Experience',
      'Advanced Color Theory Expertise'
    ]
  },
  {
    id: 'master-aesthetics',
    category: 'MASTER AESTHETICS',
    filterTag: 'MASTER AESTHETICS',
    title: 'Advanced Dermal Esthetician & Facialist',
    employmentType: 'Full-Time',
    location: 'Private Esthetic Suite',
    description: 'Perform bespoke holistic skin rituals, lymphatic drainage, micro-needling protocols, and bespoke seasonal resurfacing in our acoustically insulated spa suite.',
    bullets: [
      'CIDESCO / Ontario Medical Esthetic Cert',
      'Mastery of Dermal Remodeling Devices'
    ]
  },
  {
    id: 'nail-architecture',
    category: 'NAIL ARCHITECTURE',
    filterTag: 'NAIL ARCHITECTURE',
    title: 'Precision Russian Nail Architect',
    employmentType: 'Full-Time / Part-Time',
    location: 'Nail Sanctuary Lounge',
    description: 'Executing immaculate dry/e-file manicures, structured builder gel overlays, and minimalist editorial nail art in a serene, odour-free atelier setting.',
    bullets: [
      'Expert in E-File Cuticle Precision',
      'Apres Gel-X & Sculpted Gel Extensions'
    ]
  },
  {
    id: 'bridal-editorial',
    category: 'EDITORIAL MAKEUP',
    filterTag: 'BRIDAL & EDITORIAL MAKEUP',
    title: 'Haute Editorial & Bridal Makeup Artist',
    employmentType: 'Seasonal / Part-Time',
    location: 'Studio & Captive On-Location',
    description: 'Join our prestigious bridal and editorial division delivering luminous, red-carpet complexion work and refined glamour for discerning diplomatic luxury brides.',
    bullets: [
      'Published Portfolio / Bridal Track Record',
      'Experience with Diverse Skin Complexions'
    ]
  },
  {
    id: 'lash-artistry',
    category: 'LASH & BROW',
    filterTag: 'LASH ARTISTRY',
    title: 'Bespoke Lash & Brow Architect',
    employmentType: 'Part-Time / Full-Time',
    location: 'Dermal Suite',
    description: 'Curate featherlight volume lash extensions, keratine lash infusions, and precision brow lamination mappings customized to individual facial symmetry.',
    bullets: [
      'Certified Lash Technician & Brow Sculptor',
      'Isolation and Hygiene Mastery'
    ]
  },
  {
    id: 'client-relations',
    category: 'CLIENT RELATIONS',
    filterTag: 'HAIR DIRECTION',
    title: 'Front Atelier Concierge & Director',
    employmentType: 'Full-Time',
    location: 'Main Sanctuary Lounge',
    description: 'Curate the guest arrival journey, manage private suite transitions, supervise beverage service, and uphold a flawless five-star hospitality standard.',
    bullets: [
      'Luxury Hospitality or Retail Background',
      'Exemplary Tactile Communication'
    ]
  }
];

const FILTER_TABS = [
  'ALL ROLES (6)',
  'HAIR DIRECTION',
  'MASTER AESTHETICS',
  'NAIL ARCHITECTURE',
  'BRIDAL & EDITORIAL MAKEUP',
  'LASH ARTISTRY'
];

const PHILOSOPHY_CARDS = [
  {
    icon: Compass,
    title: 'Creative Sovereignty',
    description: 'Unhurried appointment blocks, bespoke pacing, and authentic artistic latitude. You set the rhythm for transformational client work.',
    tag: '0% HUSTLE · 100% EXCELLENCE'
  },
  {
    icon: BookOpen,
    title: 'Parisian Mentorship',
    description: 'Continuous calibration in European aesthetic rituals, balayage contouring, and advanced dermal techniques guided directly by Janki Khatroja.',
    tag: 'BI-WEEKLY MASTERCLASSES'
  },
  {
    icon: Armchair,
    title: 'Sanctuary Workspace',
    description: 'Ergonomic custom Italian styling chairs, silent air purification, bespoke surfaces, and whisper-quiet acoustic separation.',
    tag: 'OTTAWA FLAGSHIP SUITES'
  },
  {
    icon: HeartHandshake,
    title: 'Collegiate Harmony',
    description: 'Respectful, collaborative salon culture. Zero drama, competitive friction, transparent tiered compensation, and shared milestones.',
    tag: 'COMPASSIONATE ECOSYSTEM'
  }
];

export default function CareersPage() {
  const [activeTab, setActiveTab] = useState('ALL ROLES (6)');
  const [selectedRole, setSelectedRole] = useState(ARTISAN_POSITIONS[0].title);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: ARTISAN_POSITIONS[0].title,
    experience: '',
    portfolio: '',
    philosophy: ''
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const positionsRef = useRef(null);
  const dossierRef = useRef(null);

  useEffect(() => {
    document.title = 'Crafting Artistry. Elevating Careers. | GLAM GIRL BY JANKI';
  }, []);

  const scrollToPositions = () => {
    positionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDossier = (roleTitle = null) => {
    if (roleTitle) {
      setSelectedRole(roleTitle);
      setFormData(prev => ({ ...prev, role: roleTitle }));
    }
    dossierRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmitDossier = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const filteredPositions = ARTISAN_POSITIONS.filter(pos => {
    if (activeTab === 'ALL ROLES (6)') return true;
    return pos.filterTag === activeTab || pos.category === activeTab;
  });

  return (
    <div className="w-full min-h-screen bg-[#F7F4ED] text-[#10110F] font-sans antialiased selection:bg-[#263D2B] selection:text-white pt-20 sm:pt-24">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <ScrollReveal className="lg:col-span-7 space-y-6 text-left" stagger={true}>
            
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[#263D2B] text-[10.5px] font-bold tracking-[0.22em] uppercase shadow-xs">
              <span>✦</span>
              <span>JOIN THE MAESTRO GUILD · OTTAWA FLAGSHIP</span>
            </div>

            {/* Editorial Title */}
            <h1 className="font-serif text-[32px] min-[380px]:text-[40px] sm:text-[56px] lg:text-[70px] text-[#10110F] leading-[1.06] tracking-[-0.015em] font-normal">
              Crafting Artistry.<br />
              <span className="italic font-serif text-[#263D2B]">Elevating Careers.</span>
            </h1>

            {/* Sub-description paragraph */}
            <p className="font-sans text-[#6B7068] text-[14px] sm:text-[15.5px] leading-[1.8] max-w-xl font-light">
              Step beyond conventional salon environments into an unhurried sanctuary in Ottawa. We invite visionary hair sculptors, dermal estheticians, and beauty artisans to cultivate mastery in a space built upon deep creative sovereignty, tactile luxury, and continuous elevation.
            </p>

            {/* 3 Luxury Badge Bullets */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3 text-[11.5px] sm:text-[12px] font-medium text-[#6B7068] pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
                <span className="text-[#263D2B] text-xs">✦</span> Top 1% Luxury Studio in Ottawa
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
                <span className="text-[#263D2B] text-xs">✦</span> Continuous Masterclass Education
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
                <span className="text-[#263D2B] text-xs">✦</span> Private Atelier Suites
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={scrollToPositions}
                className="global-button !px-7 !py-3.5 text-white text-[11.5px] font-bold uppercase tracking-[0.2em] shadow-md flex items-center gap-2 cursor-pointer group"
              >
                <span>EXPLORE POSITIONS</span>
                <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
              </button>

              <button
                onClick={() => scrollToDossier()}
                className="global-button-secondary !px-7 !py-3.5 text-[11.5px] font-bold uppercase tracking-[0.2em] shadow-xs cursor-pointer"
              >
                SUBMIT SILENT DOSSIER
              </button>
            </div>

          </ScrollReveal>

          {/* Right Column: Visual & Founder Portrait Collage */}
          <ScrollReveal className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-[420px]">
              
              {/* Architectural Lounge Banner */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] bg-[#F7F4ED] group">
                <img
                  src={salonInterior}
                  alt="Architectural salon lounge at Glam Girl Atelier"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
                
                {/* Floating Top Pill Badge */}
                <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#DCE1D8] text-[#10110F] text-[10.5px] font-bold uppercase tracking-widest shadow-md flex items-center gap-1.5 font-sans">
                  <span className="text-[#263D2B]">✦</span>
                  <span>EST. OTTAWA | The Atelier Guild</span>
                </div>
              </div>

              {/* Floating Arched Founder Card */}
              <div className="absolute -bottom-8 left-2 sm:-bottom-10 sm:-left-8 w-[160px] min-[380px]:w-[190px] sm:w-[220px] bg-white rounded-2xl p-2.5 sm:p-3 shadow-2xl border border-[#DCE1D8] z-20 transform -rotate-1 hover:rotate-0 hover:scale-[1.04] transition-all duration-500 cursor-pointer">
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-[#F7F4ED] mb-2.5 border border-[#DCE1D8] group/founder">
                  <img
                    src={founderPortrait}
                    alt="Janki Khatroja - Founder & Master Director"
                    className="w-full h-full object-cover object-top group-hover/founder:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-center pb-1">
                  <p className="font-serif text-[13px] font-bold text-[#10110F] uppercase tracking-wider">
                    JANKI KHATROJA
                  </p>
                  <p className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-[#263D2B] font-sans">
                    FOUNDER & CREATIVE DIRECTOR
                  </p>
                </div>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE ATELIER PHILOSOPHY ("An Ecosystem of Unhurried Mastery")            */}
      {/* ========================================================================= */}
      <section className="bg-white py-18 sm:py-24 px-4 sm:px-6 lg:px-12 border-t border-b border-[#DCE1D8]">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-[#263D2B] block mb-2.5 font-sans">
              THE ATELIER PHILOSOPHY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#10110F] font-normal tracking-tight mb-4">
              An Ecosystem of Unhurried Mastery
            </h2>
            <p className="text-[#6B7068] text-xs sm:text-sm leading-relaxed font-sans font-light">
              We reject industrialized salon assembly lines. Every practitioner is given tactile time, acoustic serenity, and pristine tools essential to execute enduring aesthetic impressions.
            </p>
          </ScrollReveal>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
            {PHILOSOPHY_CARDS.map((card, idx) => {
              const IconComponent = card.icon;
              return (
                <ScrollReveal key={idx} className="h-full">
                  <div className="bg-[#F7F4ED] rounded-3xl p-7 sm:p-8 border border-[#DCE1D8] hover:border-[#263D2B] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
                    <div>
                      {/* Icon Badge */}
                      <div className="w-12 h-12 rounded-2xl bg-white text-[#263D2B] flex items-center justify-center mb-6 shadow-xs border border-[#DCE1D8]">
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <h3 className="font-serif text-lg sm:text-[19px] font-bold text-[#10110F] mb-3">
                        {card.title}
                      </h3>

                      <p className="text-xs sm:text-[13px] text-[#6B7068] leading-[1.8] mb-6 font-sans font-light">
                        {card.description}
                      </p>
                    </div>

                    {/* Bottom Tag */}
                    <div className="pt-4 border-t border-[#DCE1D8] text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] font-sans">
                      {card.tag}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ARTISAN POSITIONS AT KENT STREET (VACANCIES)                          */}
      {/* ========================================================================= */}
      <section ref={positionsRef} className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        
        {/* Section Heading & Subtitle Row */}
        <ScrollReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#DCE1D8]">
          <div>
            <span className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-[#263D2B] block mb-2 font-sans">
              CURRENT VACANCIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#10110F] font-normal tracking-tight">
              Artisan Positions at Ottawa Studio
            </h2>
          </div>
          <p className="text-xs sm:text-[13.5px] text-[#6B7068] max-w-md leading-relaxed font-sans font-light">
            Selected creative disciplines currently accepting applications. We recruit selectively for craft, emotional composure, and character.
          </p>
        </ScrollReveal>

        {/* Filter Pills Row */}
        <div className="mb-10 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 font-sans">
          <div className="flex items-center gap-2.5 min-w-max">
            {FILTER_TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#263D2B] text-white shadow-md scale-[1.02]'
                      : 'bg-white text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED] border border-[#DCE1D8]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6 Positions Cards Grid */}
        <div key={activeTab} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 animate-fade-in font-sans">
          {filteredPositions.map((pos) => (
            <div key={pos.id} className="h-full">
              <div className="bg-white rounded-3xl p-7 sm:p-8 border border-[#DCE1D8] hover:border-[#263D2B] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
                <div>
                  
                  {/* Category & Employment Type Header Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[#263D2B] text-[10px] font-bold uppercase tracking-wider">
                      {pos.category}
                    </span>
                    <span className="text-[11px] font-medium text-[#6B7068]">
                      {pos.employmentType}
                    </span>
                  </div>

                  {/* Position Title */}
                  <h3 className="font-serif text-xl sm:text-[22px] font-bold text-[#10110F] group-hover:text-[#263D2B] transition-colors leading-snug mb-1.5">
                    {pos.title}
                  </h3>

                  {/* Location Eyebrow */}
                  <p className="text-xs italic font-serif text-[#6B7068] mb-4">
                    {pos.location}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-[#6B7068] leading-relaxed mb-6 font-light">
                    {pos.description}
                  </p>

                  {/* Bullet Requirements */}
                  <ul className="space-y-2 mb-8 pt-4 border-t border-[#DCE1D8]">
                    {pos.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="text-xs text-[#6B7068] flex items-start gap-2">
                        <span className="text-[#263D2B] text-xs mt-0.5">✦</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                </div>

                {/* Card Button */}
                <button
                  onClick={() => scrollToDossier(pos.title)}
                  className="global-button w-full !py-3 text-white text-[11px] font-bold uppercase tracking-[0.18em] cursor-pointer shadow-sm"
                >
                  VIEW DOSSIER & APPLY
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. SUBMIT YOUR ARTISAN DOSSIER (APPLICATION FORM)                         */}
      {/* ========================================================================= */}
      <section ref={dossierRef} className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-white border-t border-[#DCE1D8]">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            
            <div className="bg-[#F7F4ED] rounded-[32px] p-8 sm:p-14 shadow-md border border-[#DCE1D8]">
              
              {/* Form Header */}
              <div className="text-center mb-10 font-sans">
                {/* Confidentiality Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[#263D2B] text-[10.5px] font-bold uppercase tracking-[0.22em] mb-4 shadow-xs">
                  <Lock className="w-3.5 h-3.5 text-[#263D2B]" />
                  <span>STRICT CONFIDENTIALITY GUARANTEED</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl text-[#10110F] font-normal tracking-tight mb-2.5">
                  Submit Your Artisan Dossier
                </h2>

                <p className="text-xs sm:text-[13.5px] text-[#6B7068] max-w-md mx-auto leading-relaxed font-light">
                  All inquiries are held in absolute, discreet confidence. Janki Khatroja personally reviews each portfolio.
                </p>
              </div>

              {submitted ? (
                <div className="bg-white border border-[#263D2B]/30 rounded-2xl p-8 sm:p-10 text-center space-y-4 font-sans">
                  <div className="w-14 h-14 bg-[#263D2B] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#10110F]">
                    Dossier Transmitted Discreetly
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7068] max-w-md mx-auto leading-relaxed font-light">
                    Thank you. Your portfolio and philosophy notes have been securely submitted directly to Janki Khatroja. We will reach out privately within 24–48 hours.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="global-button !px-6 !py-2.5 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Submit Another Dossier
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitDossier} className="space-y-6 font-sans">
                  
                  {/* Row 1: Full Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-2">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. Camille Laurent"
                        className="w-full bg-white border border-[#DCE1D8] focus:border-[#263D2B] rounded-xl px-4 py-3.5 text-xs sm:text-sm text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-2">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="claurent@atelier-co.com"
                        className="w-full bg-white border border-[#DCE1D8] focus:border-[#263D2B] rounded-xl px-4 py-3.5 text-xs sm:text-sm text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Cellular Phone & Desired Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-2">
                        CELLULAR PHONE *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+1 (613) 555-0120"
                        className="w-full bg-white border border-[#DCE1D8] focus:border-[#263D2B] rounded-xl px-4 py-3.5 text-xs sm:text-sm text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-2">
                        DESIRED ROLE *
                      </label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-[#DCE1D8] focus:border-[#263D2B] rounded-xl px-4 py-3.5 text-xs sm:text-sm text-[#10110F] focus:outline-none transition-colors cursor-pointer"
                      >
                        {ARTISAN_POSITIONS.map(p => (
                          <option key={p.id} value={p.title}>{p.title} ({p.employmentType})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Years in Active Experience & Portfolio / Instagram URL */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-2">
                        YEARS IN ACTIVE EXPERIENCE
                      </label>
                      <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder="e.g. 5+ Years Luxury Salon"
                        className="w-full bg-white border border-[#DCE1D8] focus:border-[#263D2B] rounded-xl px-4 py-3.5 text-xs sm:text-sm text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-2">
                        PORTFOLIO / INSTAGRAM / URL *
                      </label>
                      <input
                        type="text"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        required
                        placeholder="https://instagram.com/yourhandle"
                        className="w-full bg-white border border-[#DCE1D8] focus:border-[#263D2B] rounded-xl px-4 py-3.5 text-xs sm:text-sm text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Artisan Philosophy & Values */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-2">
                      ARTISAN PHILOSOPHY & VALUES
                    </label>
                    <textarea
                      name="philosophy"
                      rows={4}
                      value={formData.philosophy}
                      onChange={handleInputChange}
                      placeholder="Briefly articulate your philosophy regarding client care, craftsmanship, and long-term aesthetic growth."
                      className="w-full bg-white border border-[#DCE1D8] focus:border-[#263D2B] rounded-xl p-4 text-xs sm:text-sm text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none transition-colors resize-none leading-relaxed font-light"
                    />
                  </div>

                  {/* Curriculum Vitae / Dossier (PDF Upload Box) */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-2">
                      CURRICULUM VITAE / DOSSIER (PDF)
                    </label>
                    
                    <label className="border-2 border-dashed border-[#DCE1D8] hover:border-[#263D2B] rounded-2xl p-8 bg-white flex flex-col items-center justify-center cursor-pointer transition-colors block text-center">
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx" 
                        onChange={handleFileChange}
                        className="hidden" 
                      />
                      <div className="w-10 h-10 rounded-full bg-[#F7F4ED] text-[#263D2B] flex items-center justify-center mb-3 border border-[#DCE1D8]">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <p className="text-xs sm:text-[13px] font-bold text-[#10110F] mb-1">
                        {uploadedFile ? uploadedFile.name : 'Click to upload your dossier, or drag and drop'}
                      </p>
                      <p className="text-[11px] text-[#6B7068]">
                        PDF, DOCX up to 10MB
                      </p>
                    </label>
                  </div>

                  {/* Discretion Protocol Notice Box */}
                  <div className="p-4 rounded-xl bg-white border border-[#DCE1D8] flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#263D2B] shrink-0 mt-0.5" />
                    <p className="text-[11.5px] text-[#6B7068] leading-relaxed">
                      <span className="font-bold text-[#10110F]">Discretion Protocol:</span> Current salon affiliations are strictly guarded. Interviews are hosted privately outside standard operating hours upon mutual request.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="global-button w-full !py-4 !px-4 sm:!px-6 text-white text-[11.5px] sm:text-xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.22em] shadow-md cursor-pointer flex items-center justify-center gap-2.5 text-center"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                    ) : (
                      <>
                        <span className="whitespace-normal sm:whitespace-nowrap">TRANSMIT SILENT DOSSIER</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0 text-white/80" />
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>

          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
