import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import founderImg from '../../assets/janki-khatroja.webp';
import salonInteriorImg from '../../assets/atelier-salon-interior.webp';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import { 
  Sparkles, 
  Leaf, 
  Building2, 
  ArrowRight, 
  Quote, 
  CheckCircle2, 
  Volume2, 
  Compass, 
  Calendar, 
  Phone, 
  X, 
  Check, 
  Star,
  ShieldCheck,
  Award
} from 'lucide-react';

export default function AboutSection() {
  const navigate = useNavigate();
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [consultFormData, setConsultFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceInterest: 'Signature Facial & Skin Therapy',
    preferredDate: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setConsultModalOpen(false);
      navigate('/book-appointment');
    }, 1800);
  };

  const pillars = [
    {
      icon: Sparkles,
      tag: 'HOLISTIC',
      title: 'Bespoke Artistry',
      desc: 'Elevated skin tone, hair roots, & therapeutic rituals, crafted for a customized atmosphere. Radiance of treatment customized with personalized ingredients to enhance your natural youthful look.',
      link: '/services'
    },
    {
      icon: Leaf,
      tag: 'PURE',
      title: 'Clinical Purity',
      desc: 'With a deep priority for botanical ingredients, non-toxic products, 100% clean and non-polluting skincare line, formulated to meet high standards without harsh chemicals.',
      link: '/services'
    },
    {
      icon: Building2,
      tag: 'SERENE',
      title: 'The Sanctuary Experience',
      desc: 'A peaceful sanctuary to retreat from active lifestyle, relax and soothe, experience blissful calm through personalized sensory atmosphere and soothing ambience.',
      link: '/services'
    }
  ];

  return (
    <div id="about" className="w-full bg-[#F7F4ED] text-[#10110F] font-sans antialiased selection:bg-[#263D2B] selection:text-[#FFFFFF]">
      
      {/* ========================================================================= */}
      {/* 1. HERO PHILOSOPHY HEADER                                                */}
      {/* ========================================================================= */}
      <ScrollReveal className="pt-20 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center" stagger={true}>

        {/* Main Serif Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#10110F] font-normal tracking-tight leading-[1.15] mb-6">
          The Philosophy of{' '}
          <span className="italic font-accent text-[#263D2B] font-normal">
            Elevated Radiance
          </span>
          .
        </h1>

        {/* Philosophy Description */}
        <p className="max-w-3xl mx-auto text-[#6B7068] text-xs sm:text-sm md:text-[15px] leading-relaxed mb-6 font-light">
          <strong className="text-[#10110F] font-semibold">GLAM GIRL BY JANKI</strong> is an elevated treatment sanctuary where bespoke beauty meets artistry. Our passion with a humanistic touch is driven to empower client wellness through personalized care, by crafting individualized treatments for body, skin, hair, and beyond with pristine products.
        </p>

        {/* Sign-off */}
        <div className="font-serif italic text-sm sm:text-base text-[#263D2B] tracking-wide">
          with love, Janki Patel
        </div>
      </ScrollReveal>

      {/* ========================================================================= */}
      {/* 2. FOUNDER'S SECTION                                                      */}
      {/* ========================================================================= */}
      <section className="bg-white py-16 sm:py-24 border-y border-[#DCE1D8]">
        <ScrollReveal className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Signature Arch Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
                {/* Arch frame */}
                <div className="relative aspect-[3/4] rounded-t-[160px] sm:rounded-t-[190px] rounded-b-3xl overflow-hidden shadow-xl border-4 border-[#F7F4ED] bg-[#F7F4ED]">
                  <img
                    src={founderImg}
                    alt="Janki Patel — Founder & Master Artist of Glam Girl Atelier"
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                    }}
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10110F]/30 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Bottom Pill Badge */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#DCE1D8] shadow-md flex items-center gap-1.5 text-[10px] font-bold text-[#10110F] uppercase tracking-[0.16em]">
                  <Sparkles className="w-3 h-3 text-[#263D2B]" />
                  <span>GLAM GIRL BY JANKI</span>
                </div>
              </div>
            </div>

            {/* Right: Founder Story, Quote, Stats, CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge & Title */}
              <div>
                <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#263D2B] mb-2">
                  FOUNDER'S SECTION
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#10110F] font-normal tracking-tight">
                  Janki Patel
                </h2>
              </div>

              {/* Bio Paragraph */}
              <p className="text-[#6B7068] text-xs sm:text-sm md:text-[15px] leading-relaxed font-light">
                Dedicated to the fine art of bespoke beauty and restorative rituals, Janki brings over 14 years of master expertise in women's wellness. Driven by an authentic vision to enhance natural individuality rather than mask it, each signature service is delivered with high-touch precision and gentle botanical formulas.
              </p>

              {/* Quote Card */}
              <div className="bg-[#F7F4ED] rounded-2xl p-5 sm:p-6 border border-[#DCE1D8] shadow-xs relative overflow-hidden group">
                <div className="flex items-start gap-3">
                  <Quote className="w-5 h-5 text-[#263D2B] flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="font-serif italic text-xs sm:text-sm md:text-[15px] text-[#10110F] leading-relaxed">
                      "To do not seek your beauty as to alter, but to allow your skin's natural radiance and soul-state that shines with effortless grace."
                    </p>
                    <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#263D2B]">
                      — JANKI PATEL, FOUNDER OF GLAM GIRL BY JANKI
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-3 sm:gap-4 pt-2 border-t border-[#DCE1D8]">
                <div>
                  <div className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                    14+ Yrs
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-[#6B7068] uppercase tracking-wider font-semibold mt-0.5">
                    Founder Practice & Artistry
                  </div>
                </div>

                <div>
                  <div className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                    99.8%
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-[#6B7068] uppercase tracking-wider font-semibold mt-0.5">
                    Positive Client Satisfaction
                  </div>
                </div>

                <div>
                  <div className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                    100%
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-[#6B7068] uppercase tracking-wider font-semibold mt-0.5">
                    Bespoke Beauty Protocols
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => setConsultModalOpen(true)}
                  className="global-button inline-flex items-center justify-center gap-2 !px-6 !py-3.5 text-xs font-bold uppercase tracking-[0.16em] shadow-md cursor-pointer"
                >
                  <span>SCHEDULE A CONSULTATION</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <Link
                  to="/book-appointment"
                  className="global-button-secondary inline-flex items-center justify-center gap-2 !px-6 !py-3.5 text-xs font-bold uppercase tracking-[0.16em] cursor-pointer"
                >
                  <span>EXPLORE AN APPOINTMENT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE THREE PILLARS OF OUR PRACTICE                                      */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <ScrollReveal stagger={true}>
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
            <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#263D2B] mb-2.5">
              THE CORE DESIGN
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#10110F] font-normal tracking-tight mb-3">
              The Three Pillars of Our Practice
            </h2>
            <p className="text-[#6B7068] text-xs sm:text-sm leading-relaxed font-light">
              Every personalized ritual and holistic therapy provides a gentle, authentic sanctuary designed for total serenity and timeless radiance.
            </p>
          </div>

          {/* 3 Pillars Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-xs hover:shadow-md hover:border-[#263D2B] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Circle Icon */}
                    <div className="w-12 h-12 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-center text-[#263D2B] mb-5 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Subtag */}
                    <div className="text-[10px] font-bold tracking-[0.2em] text-[#263D2B] uppercase mb-1">
                      {pillar.tag}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl text-[#10110F] font-normal mb-3">
                      {pillar.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#6B7068] text-xs sm:text-sm leading-relaxed mb-6 font-light">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Link */}
                  <div>
                    <Link
                      to={pillar.link}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#10110F] hover:text-[#263D2B] transition-colors"
                    >
                      <span>EXPLORE SERVICES</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 4. ARCHITECTURAL SERENITY IN THE CAPITAL CORE                             */}
      {/* ========================================================================= */}
      <section className="bg-white py-16 sm:py-24 border-y border-[#DCE1D8]">
        <ScrollReveal className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Details & Features */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[#10110F] text-[10px] font-bold uppercase tracking-[0.2em]">
                <span>STUDIO & ATMOSPHERE / IMMERSION</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-3xl sm:text-4xl text-[#10110F] font-normal leading-tight">
                Architectural Serenity in the Capital Core.
              </h2>

              {/* Paragraph */}
              <p className="text-[#6B7068] text-xs sm:text-sm md:text-[15px] leading-relaxed font-light">
                Designed as an exclusive sanctuary for renewal, our studio pairs refined modern aesthetics with intimate warmth. Every arch, ambient light, and acoustic curve has been curated to allow you to disconnect from the world and step into pure stillness.
              </p>

              {/* Feature Points */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-center text-[#263D2B] flex-shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-[#263D2B]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-normal text-sm sm:text-base text-[#10110F]">
                      Unrivaled Tranquil Ambience
                    </h3>
                    <p className="text-xs text-[#6B7068] leading-relaxed font-light">
                      Custom designed ambient lighting and modern interior layout for a soothing, tranquil experience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-center text-[#263D2B] flex-shrink-0 mt-0.5">
                    <Volume2 className="w-4 h-4 text-[#263D2B]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-normal text-sm sm:text-base text-[#10110F]">
                      Bespoke Aroma & Sound Calibration
                    </h3>
                    <p className="text-xs text-[#6B7068] leading-relaxed font-light">
                      Calming aromatherapy & curated soundtrack designed to transport you away from stress into pure relaxation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Explore Link */}
              <div className="pt-2">
                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#10110F] hover:text-[#263D2B] transition-colors"
                >
                  <span>EXPLORE OUR FULL SPA SANCTUARY</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

            {/* Right Column: Salon Interior Photograph */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-[#F7F4ED] bg-[#F7F4ED] group">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={salonInteriorImg || "/atelier-salon-interior.jpg"}
                    alt="The Main Reception & Salon Lounge at Glam Girl Atelier"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                    }}
                  />
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-[#DCE1D8] shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
                  <div>
                    <h4 className="font-serif font-medium text-xs sm:text-sm text-[#10110F]">
                      The Main Reception & Salon
                    </h4>
                    <p className="text-[10px] text-[#6B7068]">Glam Girl By Janki</p>
                  </div>

                  <Link
                    to="/gallery"
                    className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#10110F] hover:text-[#263D2B] transition-colors"
                  >
                    <span>EXPLORE THE ATELIER</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 5. BEGIN YOUR JOURNEY TO LUMINOUS POISE (CTA BANNER)                      */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <ScrollReveal className="bg-white rounded-3xl sm:rounded-[36px] p-8 sm:p-14 md:p-16 border border-[#DCE1D8] shadow-xl text-center relative overflow-hidden">
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            
            {/* Tag */}
            <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              BEGIN YOUR JOURNEY
            </span>

            {/* Title */}
            <h2 className="font-serif text-3xl sm:text-5xl text-[#10110F] font-normal leading-tight">
              Begin Your Journey to{' '}
              <span className="italic font-accent text-[#263D2B]">
                Luminous Poise
              </span>
              .
            </h2>

            {/* Subtitle */}
            <p className="text-[#6B7068] text-xs sm:text-sm md:text-[15px] leading-relaxed max-w-lg mx-auto font-light">
              Transformative well-being with tailored personalized care. Step into our world and experience the difference.
            </p>

            {/* 2 CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                to="/book-appointment"
                className="global-button w-full sm:w-auto inline-flex items-center justify-center gap-2 !px-8 !py-3.5 text-xs font-bold uppercase tracking-[0.16em] shadow-md cursor-pointer"
              >
                <span>SCHEDULE A VISIT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={() => setConsultModalOpen(true)}
                className="global-button-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 !px-7 !py-3.5 text-xs font-bold uppercase tracking-[0.16em] cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
                <span>DIRECT BOARD CONSULTATION</span>
              </button>
            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 6. VIP CONSULTATION MODAL (INTERACTIVE & FULLY WORKING)                    */}
      {/* ========================================================================= */}
      {consultModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#F7F4ED] border border-[#DCE1D8] w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl p-5 sm:p-8 shadow-2xl relative">
            
            {/* Close Button */}
            <button
              onClick={() => setConsultModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white text-[#10110F] flex items-center justify-center hover:bg-[#DCE1D8] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#263D2B]/15 text-[#263D2B] flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl text-[#10110F]">Consultation Requested</h3>
                <p className="text-xs sm:text-sm text-[#6B7068]">
                  Thank you, <strong>{consultFormData.name || 'Client'}</strong>. Janki & our team will contact you shortly to confirm your bespoke session. Redirecting to appointment booking...
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block mb-1">
                    BESPOKE BEAUTY INQUIRY
                  </span>
                  <h3 className="font-serif text-2xl text-[#10110F]">
                    Schedule a Consultation with Janki
                  </h3>
                  <p className="text-xs text-[#6B7068] mt-1 font-light">
                    Connect directly for customized skin, hair, and bridal rituals tailored to your needs.
                  </p>
                </div>

                <form onSubmit={handleConsultSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="consult-fullname" className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-1">
                      Full Name *
                    </label>
                    <input
                      id="consult-fullname"
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={consultFormData.name}
                      onChange={(e) => setConsultFormData({ ...consultFormData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DCE1D8] text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="consult-phone" className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-1">
                        Phone Number *
                      </label>
                      <input
                        id="consult-phone"
                        type="tel"
                        required
                        placeholder="e.g. +1 616-255-0549"
                        value={consultFormData.phone}
                        onChange={(e) => setConsultFormData({ ...consultFormData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DCE1D8] text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                      />
                    </div>

                    <div>
                      <label htmlFor="consult-email" className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-1">
                        Email Address
                      </label>
                      <input
                        id="consult-email"
                        type="email"
                        placeholder="sarah@example.com"
                        value={consultFormData.email}
                        onChange={(e) => setConsultFormData({ ...consultFormData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DCE1D8] text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="consult-service" className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-1">
                      Service of Interest
                    </label>
                    <select
                      id="consult-service"
                      value={consultFormData.serviceInterest}
                      onChange={(e) => setConsultFormData({ ...consultFormData, serviceInterest: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DCE1D8] text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                    >
                      <option>Signature Facial & Skin Therapy</option>
                      <option>Precision Eyebrow & Facial Threading</option>
                      <option>Botanical Haircare & Scalp Treatment</option>
                      <option>Bridal Mehndi & Editorial Makeup</option>
                      <option>Full Atelier Day Spa Package</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="consult-notes" className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-1">
                      Preferred Date / Note
                    </label>
                    <input
                      id="consult-notes"
                      type="text"
                      placeholder="e.g. Next Tuesday morning or specific requests"
                      value={consultFormData.notes}
                      onChange={(e) => setConsultFormData({ ...consultFormData, notes: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DCE1D8] text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setConsultModalOpen(false)}
                      className="global-button-secondary !px-5 !py-2.5 text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="global-button !px-6 !py-2.5 text-xs font-bold uppercase tracking-wider shadow-md"
                    >
                      Request Consultation
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
