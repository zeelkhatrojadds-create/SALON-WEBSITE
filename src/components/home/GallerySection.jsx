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

const FILTER_CATEGORIES = [
  { id: 'all', label: 'ALL 50 EXHIBITIONS' },
  { id: 'facials', label: 'LUMINOUS FACIALS' },
  { id: 'hair', label: 'HAUTE COIFFURE & BALAYAGE' },
  { id: 'bridal', label: 'BRIDAL PREP' },
  { id: 'suites', label: 'ATELIER SUITES & INTERIOR' },
  { id: 'clinical', label: 'CLINICAL DERMO CARE' }
];

const TRANSFORMATION_CARDS = [
  {
    id: 1,
    category: 'hair',
    badge: 'HAUTE COIFFURE',
    title: 'Sunkissed Parisian Balayage',
    price: '$285+',
    description: 'Hand-painted dimensional caramel foils paired with silk-gloss conditioning melt bespoke tailored for inequal luster.',
    tags: ['SIGNATURE BLONDE', 'SILK CONDITION'],
    image: floralBookingImg
  },
  {
    id: 2,
    category: 'facials',
    badge: 'DERMAL THERAPY',
    title: 'Sublime Cellular Radiance',
    price: '$190',
    description: 'Non-invasive micro-nutrient filling combined with hyaluronic infusions and lymphatic jade drainage.',
    tags: ['HYDRA-LIFT', 'LED THERAPY'],
    image: cleanFacialBg
  },
  {
    id: 3,
    category: 'hair',
    badge: 'HAIR RESTORATION',
    title: 'Caviar Gloss & Sculpt',
    price: '$165',
    description: 'Deep lipid reconstruction infused with marine extracts, finished with bouncy round-brush architectural shaping.',
    tags: ['KERATIN SHINE', 'SCALP MASSAGE'],
    image: salonInteriorImg
  }
];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredCards = activeFilter === 'all' 
    ? TRANSFORMATION_CARDS 
    : TRANSFORMATION_CARDS.filter(c => c.category === activeFilter || activeFilter === 'all');

  return (
    <section id="gallery" className="w-full bg-[#FAF6F0] text-[#1E1714] py-16 sm:py-24 overflow-hidden border-t border-[#E8DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ========================================================================= */}
        {/* 1. HEADER SECTION                                                         */}
        {/* ========================================================================= */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3.5 mb-10 sm:mb-14" stagger={true}>
          
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3ECE1] border border-[#CFA46A]/30 text-[#8C6430] text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.24em] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CFA46A]" />
            <span>BESPOKE ATELIER • CURATED ARCHIVE | 50+ VISUAL EXHIBITION</span>
          </div>

          {/* Main Title */}
          <h2 className="font-serif text-[38px] sm:text-[50px] lg:text-[58px] font-normal leading-[1.05] text-[#161012] tracking-tight">
            The Radiance <span className="italic font-normal text-[#CFA46A]">Archive.</span>
          </h2>

          {/* Subtitle Description */}
          <p className="font-body text-[#5C4F46] text-xs sm:text-sm lg:text-[15px] leading-[1.7] max-w-2xl mx-auto">
            A curated retrospective of couture hair transformations, bespoke balayage, luminous clinical skin rituals, and sacred beauty captured inside our Ottawa sanctuary.
          </p>

          {/* Trust & Guest Rating Row */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#8C6430]">
            <div className="flex items-center gap-1 text-[#CFA46A]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#CFA46A] text-[#CFA46A]" />
              ))}
              <span className="ml-1 text-[#4A3E38]">4.95/5 GUEST RATING</span>
            </div>
            <span className="text-[#CFA46A]/60 hidden sm:inline">•</span>
            <div className="flex items-center gap-1 text-[#4A3E38]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#CFA46A]" />
              <span>PRIVATE ATELIER SUITE</span>
            </div>
            <span className="text-[#CFA46A]/60 hidden sm:inline">•</span>
            <div className="flex items-center gap-1 text-[#4A3E38]">
              <MapPin className="w-3.5 h-3.5 text-[#CFA46A]" />
              <span>OTTAWA • WOMEN'S BEAUTY STUDIO</span>
            </div>
          </div>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 2. FILTER PILLS BAR                                                       */}
        {/* ========================================================================= */}
        <div className="pills-scroll sm:flex-wrap sm:justify-center mb-10 sm:mb-16">
          {FILTER_CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer flex-shrink-0 ${
                  isActive
                    ? 'bg-[#161012] text-[#FAF6F0] shadow-md scale-[1.02]'
                    : 'bg-white text-[#5C4F46] hover:text-[#161012] hover:bg-[#F2ECE4] border border-[#E0D5C7] shadow-xs'
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
          <div className="lg:col-span-8 flex flex-col justify-between bg-white rounded-3xl border border-[#E8DFD3] shadow-lg overflow-hidden group">
            
            {/* Image & Interactive Treatment Overlay */}
            <div className="relative min-h-[340px] sm:min-h-[400px] lg:min-h-[420px] w-full overflow-hidden bg-[#1E1714]">
              <img
                src={cleanFacialBg || "/images/facial-atelier-clean.jpg"}
                alt="24K Gold Cellular Lift & Sculpt Facial"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#140F11]/90 via-[#140F11]/40 to-transparent" />
              
              {/* Top Tags inside photo */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#CFA46A]/40 text-[#FAF6F0] text-[10px] font-bold tracking-[0.2em] uppercase">
                  FACIAL • SKIN • BEAUTY
                </span>
                <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[#CFA46A] text-[10px] font-bold tracking-[0.2em] uppercase font-mono">
                  01 / FACIAL RITUAL
                </span>
              </div>

              {/* Center Left Subtle Headline */}
              <div className="absolute top-20 sm:top-24 left-4 sm:left-6 max-w-md hidden sm:block">
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal drop-shadow-md">
                  The Art of <span className="italic text-[#CFA46A]">Luminous Skin.</span>
                </h3>
              </div>

              {/* Bottom Protocol Details Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1.5 max-w-lg">
                  <p className="text-[10.5px] uppercase tracking-[0.22em] text-[#CFA46A] font-bold font-mono">
                    CLINICAL RESURFACING PROTOCOL 01 | 75 MIN
                  </p>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#FAF6F0] font-normal">
                    24K Gold Cellular Lift & Sculpt
                  </h3>
                  <p className="text-xs text-[#FAF6F0]/80 line-clamp-2 sm:line-clamp-none font-normal leading-relaxed">
                    Personalized facial rituals designed to cleanse, nourish, refresh, and reveal your skin's natural radiance.
                  </p>
                </div>

                <Link
                  to="/services/facial"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-[#161012] hover:text-[#CFA46A] text-xs font-bold uppercase tracking-wider shadow-lg transition-all flex-shrink-0"
                >
                  <span>EXPLORE PROTOCOL</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

            {/* Bottom Info Bar Attached to Card */}
            <div className="p-4 sm:p-5 bg-[#FAF6F0] border-t border-[#E8DFD3] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EFE7DC] flex items-center justify-center text-[#CFA46A] flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-[#A67C48]" />
                </div>
                <div>
                  <p className="font-bold text-[#1E1714] tracking-wide">
                    Ergonomic Upright Reclining Comfort
                  </p>
                  <p className="text-[11px] text-[#6B5E55]">
                    Private Atelier Suite, Ottawa Flagship
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-[#8C6430] font-semibold">
                <span className="px-2.5 py-1 rounded-md bg-white border border-[#E8DFD3]">
                  99.8% BIO-TOLERANCE
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-[#E8DFD3]">
                  OPERATION SINCE 2019
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT 35% FOUNDER ARCH PORTRAIT CARD */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-[#E8DFD3] shadow-lg p-6 sm:p-8 flex flex-col justify-between">
            
            {/* Top Arched Image Container */}
            <div>
              <div className="relative mx-auto w-full max-w-[280px] aspect-[4/5] rounded-t-[120px] rounded-b-2xl overflow-hidden border-2 border-[#E8DFD3] shadow-md bg-[#F2ECE4]">
                <img
                  src="/janki-khatroja.jpg"
                  alt="Janki Patel - Founder & Master Artisan"
                  className="w-full h-full object-cover object-center"
                />
                {/* Badge Over Photo */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#161012]/90 backdrop-blur-md border border-[#CFA46A]/40 text-[#FAF6F0] text-[10px] font-bold uppercase tracking-widest whitespace-nowrap shadow-md">
                  FOUNDER & MASTER ARTISAN
                </div>
              </div>

              {/* Founder Information */}
              <div className="text-center mt-5 space-y-1">
                <h3 className="font-serif text-2xl font-normal text-[#161012]">
                  Janki Patel
                </h3>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#CFA46A]">
                  HAUTE COIFFEUR & DERMAL SPECIALIST
                </p>
              </div>

              {/* Quote Block */}
              <div className="mt-4 p-4 rounded-2xl bg-[#FAF6F0] border-l-2 border-[#CFA46A] text-[#5C4F46]">
                <p className="font-serif italic text-xs sm:text-[13px] leading-relaxed">
                  “Every woman requires reverence. Our rituals balance restorative clinical efficacy with haute-tailored quiet luxury.”
                </p>
              </div>
            </div>

            {/* Founder Footer Meta */}
            <div className="mt-6 pt-4 border-t border-[#F2ECE4] flex items-center justify-between text-[10.5px] uppercase tracking-wider font-bold text-[#8C6430]">
              <span>12+ YEARS MASTERCLASS</span>
              <Link
                to="/about"
                className="inline-flex items-center gap-1 text-[#A67C48] hover:text-[#161012] transition-colors"
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
        <ScrollReveal stagger={true} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10 sm:mb-14">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-3xl border border-[#E8DFD3] shadow-md overflow-hidden hover:shadow-xl hover:border-[#CFA46A] transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1E1714]">
                <img
                  src={card.image}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.style.display = 'none';
                  }}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#161012]/85 backdrop-blur-md border border-white/10 text-[#FAF6F0] text-[10px] font-bold uppercase tracking-wider shadow-md">
                  {card.badge}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif text-lg sm:text-xl font-normal text-[#161012] leading-snug">
                      {card.title}
                    </h4>
                    <span className="font-serif text-base sm:text-lg font-normal text-[#A67C48] flex-shrink-0">
                      {card.price}
                    </span>
                  </div>
                  <p className="text-xs text-[#5C4F46] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Pill Tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-[#F2ECE4]">
                  {card.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full bg-[#FAF6F0] border border-[#E8DFD3] text-[10px] font-bold uppercase tracking-wider text-[#6B5E55]"
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
        <ScrollReveal className="bg-gradient-to-br from-white via-[#FDFCFA] to-[#F7F2EA] rounded-3xl border border-[#E8DFD3] shadow-lg overflow-hidden p-6 sm:p-8 lg:p-10 mb-12 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Suite Photograph */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-md aspect-[16/10] bg-[#1E1714] group">
              <img
                src="/hero-campaign.jpg"
                alt="The Private Suite & Sanctuary - Ottawa, Ontario"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 px-3.5 py-1.5 rounded-full bg-[#161012]/90 backdrop-blur-md border border-[#CFA46A]/40 text-[#FAF6F0] text-[10px] sm:text-[10.5px] font-bold uppercase tracking-widest shadow-md">
                THE PRIVATE SUITE & SANCTUARY — OTTAWA, ONTARIO
              </div>
            </div>

            {/* Right Suite Text Content */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3ECE1] border border-[#CFA46A]/30 text-[#8C6430] text-[10px] font-bold uppercase tracking-[0.22em]">
                SANCTUARY ENVIRONMENT
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#161012] font-normal leading-snug">
                Designed for Stillness & Discrete Indulgence.
              </h3>

              <p className="text-xs sm:text-sm text-[#5C4F46] leading-relaxed">
                Every detail of our Ottawa atelier is engineered to restore you from outside noise. From sound-dampened lime-plaster architectural suites to Italian reclining loungers, your transformation unfolds in absolute tranquility.
              </p>

              {/* Feature Checklist */}
              <div className="space-y-2.5 pt-2 font-body text-xs text-[#4A3E38]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#CFA46A] flex-shrink-0" />
                  <span>Strict single-client private booking policy</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#CFA46A] flex-shrink-0" />
                  <span>Filtered mineral water & botanical herbal infusions</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#CFA46A] flex-shrink-0" />
                  <span>Complimentary valet & private Kent St courtyard entry</span>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A67C48] hover:text-[#161012] transition-colors"
                >
                  <span>EXPLORE ALL 8 SUITES</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 6. ROW 4: FOUR IMPACT METRIC COUNTERS                                     */}
        {/* ========================================================================= */}
        <ScrollReveal className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-8 sm:py-10 border-y border-[#E8DFD3] text-center mb-12 sm:mb-16">
          <div className="space-y-1 sm:border-r border-[#E8DFD3] px-3">
            <p className="font-serif text-3xl sm:text-4xl text-[#161012] font-normal">100%</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#A67C48]">CUSTOM FORMULATIONS</p>
            <p className="text-[11px] text-[#6B5E55]">Exclusively tailored to each client's profile</p>
          </div>

          <div className="space-y-1 lg:border-r border-[#E8DFD3] px-3">
            <p className="font-serif text-3xl sm:text-4xl text-[#161012] font-normal">01</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#A67C48]">DEDICATED PRIVATE SUITES</p>
            <p className="text-[11px] text-[#6B5E55]">One-guest-per-suite exclusivity</p>
          </div>

          <div className="space-y-1 sm:border-r border-[#E8DFD3] px-3">
            <p className="font-serif text-3xl sm:text-4xl text-[#161012] font-normal">12+</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#A67C48]">YEARS COMBINED EXPERTISE</p>
            <p className="text-[11px] text-[#6B5E55]">Haute coiffure & clinical aesthetics</p>
          </div>

          <div className="space-y-1 px-3">
            <p className="font-serif text-3xl sm:text-4xl text-[#161012] font-normal">24K</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#A67C48]">CELLULAR GOLD</p>
            <p className="text-[11px] text-[#6B5E55]">Pure micronized keratin elixirs</p>
          </div>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 7. ROW 5: READY TO EXPERIENCE YOUR TRANSFORMATION CTA CARD               */}
        {/* ========================================================================= */}
        <ScrollReveal className="rounded-3xl bg-[#28201E] border border-[#CFA46A]/30 text-[#FAF6F0] p-8 sm:p-12 lg:p-14 text-center shadow-2xl relative overflow-hidden">
          
          {/* Subtle glow background */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#CFA46A]/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#CFA46A]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-5">
            
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[#E5C492] text-[10.5px] font-bold uppercase tracking-[0.22em]">
              <Calendar className="w-3.5 h-3.5" />
              <span>AUTUMN & WINTER APPOINTMENTS OPEN</span>
            </div>

            {/* Heading */}
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
              Ready to Experience Your <span className="italic text-[#CFA46A]">Transformation?</span>
            </h3>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm lg:text-base text-[#FAF6F0]/80 max-w-2xl mx-auto leading-relaxed">
              Consult one-on-one with Founder Janki Patel and our artisan team for bespoke hair coiffure, bridal aesthetics, and rejuvenating skin therapies.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/book-appointment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#CFA46A] via-[#E5C492] to-[#CFA46A] hover:from-[#E5C492] hover:to-[#CFA46A] text-[#161012] text-xs font-extrabold uppercase tracking-widest shadow-xl transition-all hover:scale-105"
              >
                <span>REQUEST BESPOKE CONSULTATION</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              <a
                href="tel:16162550549"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-[#FAF6F0] text-xs font-bold uppercase tracking-wider border border-white/20 transition-all hover:scale-105"
              >
                <Phone className="w-3.5 h-3.5 text-[#CFA46A]" />
                <span>CALL (616) 255-0549</span>
              </a>
            </div>

            {/* Bottom Guarantee Perks */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10.5px] uppercase tracking-widest text-[#FAF6F0]/70 font-mono">
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
