import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  Phone, 
  ExternalLink 
} from 'lucide-react';
import cleanFacialBg from '../../assets/facial-atelier-clean.webp';
import salonInteriorImg from '../../assets/atelier-salon-interior.webp';
import floralBookingImg from '../../assets/floral-booking.webp';
import founderImg from '../../assets/janki-khatroja.webp';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import salonDB from '../../db/salonDatabase';

const FILTER_CATEGORIES = [
  { id: 'all', label: 'ALL 50 EXHIBITIONS' },
  { id: 'facials', label: 'LUMINOUS FACIALS' },
  { id: 'hair', label: 'HAUTE COIFFURE & BALAYAGE' },
  { id: 'bridal', label: 'BRIDAL PREP' },
  { id: 'suites', label: 'ATELIER SUITES & INTERIOR' },
  { id: 'clinical', label: 'CLINICAL DERMO CARE' }
];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [galleryItems, setGalleryItems] = useState(() => salonDB.getActiveGallery());

  React.useEffect(() => {
    const sync = () => setGalleryItems(salonDB.getActiveGallery());
    sync();
    const unsub = salonDB.subscribe(sync);
    return () => unsub();
  }, []);

  const filteredCards = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(c => c.category === activeFilter || activeFilter === 'all');

  return (
    <section id="gallery" className="w-full bg-[#F7F4ED] text-[#10110F] py-16 sm:py-24 overflow-hidden border-t border-[#DCE1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ========================================================================= */}
        {/* 1. HEADER SECTION                                                         */}
        {/* ========================================================================= */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3.5 mb-10 sm:mb-14" stagger={true}>
          
          {/* Main Title */}
          <h2 className="font-serif text-[38px] sm:text-[50px] lg:text-[58px] font-normal leading-[1.05] text-[#10110F] tracking-tight">
            The Radiance <span className="italic font-normal text-[#263D2B]">Archive.</span>
          </h2>

          {/* Subtitle Description */}
          <p className="font-sans text-[#6B7068] text-xs sm:text-sm lg:text-[15px] leading-[1.7] max-w-2xl mx-auto">
            A curated retrospective of couture hair transformations, bespoke balayage, luminous clinical skin rituals, and sacred beauty captured inside our Ottawa sanctuary.
          </p>

          {/* Trust & Guest Rating Row */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#263D2B] font-sans">
            <div className="flex items-center gap-1 text-[#263D2B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#263D2B] text-[#263D2B]" />
              ))}
              <span className="ml-1 text-[#10110F]">4.95/5 GUEST RATING</span>
            </div>
            <span className="text-[#DCE1D8] hidden sm:inline">•</span>
            <div className="flex items-center gap-1 text-[#10110F]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>PRIVATE ATELIER SUITE</span>
            </div>
            <span className="text-[#DCE1D8] hidden sm:inline">•</span>
            <div className="flex items-center gap-1 text-[#10110F]">
              <MapPin className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>OTTAWA • WOMEN'S BEAUTY STUDIO</span>
            </div>
          </div>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 2. FILTER PILLS BAR                                                       */}
        {/* ========================================================================= */}
        <div className="pills-scroll sm:flex-wrap sm:justify-center mb-10 sm:mb-16 font-sans">
          {FILTER_CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer flex-shrink-0 ${
                  isActive
                    ? 'bg-[#263D2B] text-white shadow-md scale-[1.02]'
                    : 'bg-white text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED] border border-[#DCE1D8] shadow-xs'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 3. ROW 1: LARGE HERO SHOWCASE (65% TREATMENT + 35% FOUNDER ARCH)           */}
        {/* ========================================================================= */}
        <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-10 sm:mb-14 items-stretch">
          
          {/* LEFT 65% HERO ATELIER CARD */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-white rounded-3xl border border-[#DCE1D8] shadow-md overflow-hidden group">
            
            {/* Image & Interactive Treatment Overlay */}
            <div className="relative min-h-[340px] sm:min-h-[400px] lg:min-h-[420px] w-full overflow-hidden bg-[#10110F]">
              <img
                src={cleanFacialBg || "/images/facial-atelier-clean.jpg"}
                alt="Botanical Cellular Lift & Sculpt Facial"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#10110F]/90 via-[#10110F]/40 to-transparent" />
              
              {/* Top Tags inside photo */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap items-center gap-2 font-sans">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-[0.2em] uppercase">
                  FACIAL • SKIN • BEAUTY
                </span>
                <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[#A8B5A0] text-[10px] font-bold tracking-[0.2em] uppercase font-mono">
                  01 / FACIAL RITUAL
                </span>
              </div>

              {/* Center Left Subtle Headline */}
              <div className="absolute top-20 sm:top-24 left-4 sm:left-6 max-w-md hidden sm:block">
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal drop-shadow-md">
                  The Art of <span className="italic text-[#A8B5A0]">Luminous Skin.</span>
                </h3>
              </div>

              {/* Bottom Protocol Details Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 font-sans">
                <div className="space-y-1.5 max-w-lg">
                  <p className="text-[10.5px] uppercase tracking-[0.22em] text-[#A8B5A0] font-bold font-mono">
                    CLINICAL RESURFACING PROTOCOL 01 | 75 MIN
                  </p>
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                    Botanical Cellular Lift & Sculpt
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2 sm:line-clamp-none font-normal leading-relaxed">
                    Personalized facial rituals designed to cleanse, nourish, refresh, and reveal your skin's natural radiance.
                  </p>
                </div>

                <Link
                  to="/services/facial"
                  className="global-button-secondary inline-flex items-center justify-center gap-2 !px-5 !py-2.5 !bg-white/95 text-xs font-bold uppercase tracking-wider shadow-lg flex-shrink-0"
                >
                  <span>EXPLORE PROTOCOL</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

            {/* Bottom Info Bar Attached to Card */}
            <div className="p-4 sm:p-5 bg-[#F7F4ED] border-t border-[#DCE1D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#263D2B] flex-shrink-0 border border-[#DCE1D8]">
                  <Sparkles className="w-4 h-4 text-[#263D2B]" />
                </div>
                <div>
                  <p className="font-bold text-[#10110F] tracking-wide">
                    Ergonomic Upright Reclining Comfort
                  </p>
                  <p className="text-[11px] text-[#6B7068]">
                    Private Atelier Suite, Ottawa Flagship
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-[#263D2B] font-semibold">
                <span className="px-2.5 py-1 rounded-md bg-white border border-[#DCE1D8]">
                  99.8% BIO-TOLERANCE
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-[#DCE1D8]">
                  OPERATION SINCE 2019
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT 35% FOUNDER ARCH PORTRAIT CARD */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-[#DCE1D8] shadow-md p-6 sm:p-8 flex flex-col justify-between font-sans">
            
            {/* Top Arched Image Container */}
            <div>
              <div className="relative mx-auto w-full max-w-[280px] rounded-2xl overflow-hidden border border-[#DCE1D8] shadow-md bg-[#F7F4ED] group/founder">
                <img
                  src="/janki-khatroja.webp"
                  alt="Janki Khatroja - Founder & Master Director"
                  width="722"
                  height="1024"
                  className="w-full h-auto object-contain object-center group-hover/founder:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {/* Founder Information */}
              <div className="text-center mt-5 space-y-1">
                <h3 className="font-serif text-2xl font-normal text-[#10110F]">
                  Janki Khatroja
                </h3>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#263D2B]">
                  HAUTE COIFFEUR & DERMAL SPECIALIST
                </p>
              </div>

              {/* Quote Block */}
              <div className="mt-4 p-4 rounded-2xl bg-[#F7F4ED] border-l-2 border-[#263D2B] text-[#6B7068]">
                <p className="font-serif italic text-xs sm:text-[13px] leading-relaxed text-[#10110F]">
                  “Every woman requires reverence. Our rituals balance restorative clinical efficacy with haute-tailored quiet luxury.”
                </p>
              </div>
            </div>

            {/* Founder Footer Meta */}
            <div className="mt-6 pt-4 border-t border-[#DCE1D8] flex items-center justify-between text-[10.5px] uppercase tracking-wider font-bold text-[#263D2B]">
              <span>12+ YEARS MASTERCLASS</span>
              <Link
                to="/about"
                className="inline-flex items-center gap-1 text-[#263D2B] hover:text-[#10110F] transition-colors"
              >
                <span>DIRECTOR'S EDIT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 4. ROW 2: THREE-COLUMN TRANSFORMATION CARDS                               */}
        {/* ========================================================================= */}
        <ScrollReveal stagger={true} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10 sm:mb-14 font-sans">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-3xl border border-[#DCE1D8] shadow-md overflow-hidden hover:shadow-xl hover:border-[#263D2B] transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F7F4ED]">
                <img
                  src={card.image}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.style.display = 'none';
                  }}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#10110F]/85 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                  {card.badge}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif text-lg sm:text-xl font-normal text-[#10110F] leading-snug">
                      {card.title}
                    </h4>
                    <span className="font-serif text-base sm:text-lg font-normal text-[#263D2B] flex-shrink-0">
                      {card.price}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B7068] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Pill Tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-[#DCE1D8]">
                  {card.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[10px] font-bold uppercase tracking-wider text-[#6B7068]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 5. ROW 3: SANCTUARY ENVIRONMENT / SUITE SHOWCASE                           */}
        {/* ========================================================================= */}
        <ScrollReveal className="bg-white rounded-3xl border border-[#DCE1D8] shadow-md overflow-hidden p-6 sm:p-8 lg:p-10 mb-12 sm:mb-16 font-sans">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Suite Photograph */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-md aspect-[16/10] bg-[#F7F4ED] group">
              <img
                src="/hero-campaign.jpg"
                alt="The Private Suite & Sanctuary - Ottawa, Ontario"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 px-3.5 py-1.5 rounded-full bg-[#10110F]/90 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-[10.5px] font-bold uppercase tracking-widest shadow-md">
                THE PRIVATE SUITE & SANCTUARY — OTTAWA, ONTARIO
              </div>
            </div>

            {/* Right Suite Text Content */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#263D2B]/10 border border-[#263D2B]/20 text-[#263D2B] text-[10px] font-bold uppercase tracking-[0.22em]">
                SANCTUARY ENVIRONMENT
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal leading-snug">
                Designed for Stillness & Discrete Indulgence.
              </h3>

              <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed">
                Every detail of our Ottawa atelier is engineered to restore you from outside noise. From sound-dampened lime-plaster architectural suites to Italian reclining loungers, your transformation unfolds in absolute tranquility.
              </p>

              {/* Feature Checklist */}
              <div className="space-y-2.5 pt-2 text-xs text-[#10110F]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
                  <span>Strict single-client private booking policy</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
                  <span>Filtered mineral water & botanical herbal infusions</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
                  <span>Complimentary valet & private courtyard entry</span>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#263D2B] hover:text-[#10110F] transition-colors"
                >
                  <span>EXPLORE ALL SUITES</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 6. ROW 4: FOUR IMPACT METRIC COUNTERS                                     */}
        {/* ========================================================================= */}
        <ScrollReveal className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-8 sm:py-10 border-y border-[#DCE1D8] text-center mb-12 sm:mb-16 font-sans">
          <div className="space-y-1 sm:border-r border-[#DCE1D8] px-3">
            <p className="font-serif text-3xl sm:text-4xl text-[#10110F] font-normal">100%</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#263D2B]">CUSTOM FORMULATIONS</p>
            <p className="text-[11px] text-[#6B7068]">Exclusively tailored to each client's profile</p>
          </div>

          <div className="space-y-1 lg:border-r border-[#DCE1D8] px-3">
            <p className="font-serif text-3xl sm:text-4xl text-[#10110F] font-normal">01</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#263D2B]">DEDICATED PRIVATE SUITES</p>
            <p className="text-[11px] text-[#6B7068]">One-guest-per-suite exclusivity</p>
          </div>

          <div className="space-y-1 sm:border-r border-[#DCE1D8] px-3">
            <p className="font-serif text-3xl sm:text-4xl text-[#10110F] font-normal">12+</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#263D2B]">YEARS COMBINED EXPERTISE</p>
            <p className="text-[11px] text-[#6B7068]">Haute coiffure & clinical aesthetics</p>
          </div>

          <div className="space-y-1 px-3">
            <p className="font-serif text-3xl sm:text-4xl text-[#10110F] font-normal">100%</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#263D2B]">BOTANICAL INGREDIENTS</p>
            <p className="text-[11px] text-[#6B7068]">Pure certified gentle elixirs</p>
          </div>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 7. ROW 5: READY TO EXPERIENCE YOUR TRANSFORMATION CTA CARD               */}
        {/* ========================================================================= */}
        <ScrollReveal className="rounded-3xl bg-white border border-[#DCE1D8] text-[#10110F] p-8 sm:p-12 lg:p-14 text-center shadow-lg relative overflow-hidden font-sans">
          
          {/* Subtle glow background */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#263D2B]/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#263D2B]/5 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-5">
            
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[#263D2B] text-[10.5px] font-bold uppercase tracking-[0.22em]">
              <Calendar className="w-3.5 h-3.5" />
              <span>APPOINTMENTS CURRENTLY OPEN</span>
            </div>

            {/* Heading */}
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#10110F]">
              Ready to Experience Your <span className="italic text-[#263D2B]">Transformation?</span>
            </h3>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm lg:text-base text-[#6B7068] max-w-2xl mx-auto leading-relaxed">
              Consult one-on-one with Founder Janki Khatroja and our artisan team for bespoke hair coiffure, bridal aesthetics, and rejuvenating skin therapies.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/book-appointment"
                className="global-button w-full sm:w-auto inline-flex items-center justify-center gap-2 !px-7 !py-3.5 text-xs font-extrabold uppercase tracking-widest shadow-md"
              >
                <span>REQUEST BESPOKE CONSULTATION</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              <a
                href="tel:16162550549"
                className="global-button-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 !px-6 !py-3.5 text-xs font-bold uppercase tracking-wider"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>CALL STUDIO</span>
              </a>
            </div>

            {/* Bottom Guarantee Perks */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10.5px] uppercase tracking-widest text-[#6B7068] font-mono">
              <span>VALET & RESERVED PARKING</span>
              <span>•</span>
              <span>PRIVATE CONSULTATIONS ONLY</span>
              <span>•</span>
              <span>COMPLIMENTARY PATCH ASSESSMENT</span>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
