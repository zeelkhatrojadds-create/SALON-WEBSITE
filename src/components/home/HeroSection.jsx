import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative w-full min-h-[100svh] h-[100svh] text-[#F7F1E8] flex flex-col justify-between overflow-hidden bg-[#100C0D]"
    >
      {/* ========================================================================= */}
      {/* LAYER 0: RESPONSIVE HIGH-PERFORMANCE WEBP FACIAL ATELIER PHOTOGRAPH       */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-[#100C0D]">
        <picture className="w-full h-full block">
          <source
            type="image/webp"
            srcSet="/facial-atelier-clean-480.webp 480w, /facial-atelier-clean-768.webp 768w, /facial-atelier-clean-1200.webp 1200w, /facial-atelier-clean-1920.webp 1920w"
            sizes="100vw"
          />
          <img
            src="/facial-atelier-clean-1200.webp"
            alt="GLAM GIRL Luxury Facial Treatment Atelier Ottawa"
            width="1920"
            height="1080"
            fetchPriority="high"
            decoding="async"
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
        </picture>
      </div>

      {/* ========================================================================= */}
      {/* LAYER 1: SPECIFIED SUBTLE READING GRADIENT (KEEPS SCENE SHARP & NATURAL)  */}
      {/* ========================================================================= */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(16,12,13,0.88) 0%, rgba(16,12,13,0.6) 45%, rgba(16,12,13,0.2) 75%, transparent 100%)'
        }}
      />

      {/* ========================================================================= */}
      {/* LAYER 2: HERO CONTENT (BALANCED SPACING FOR DESKTOP & MOBILE)             */}
      {/* ========================================================================= */}
      <div className="relative z-20 flex-1 flex flex-col justify-center w-full max-w-[1500px] mx-auto px-5 sm:px-[6%] lg:px-[7%] pt-[72px] sm:pt-[84px] pb-10 sm:pb-16">
        <div className="w-full max-w-[540px] text-left flex flex-col items-start">

          {/* 1. EYEBROW: FACIAL • SKIN • BEAUTY */}
          <div className="flex items-center gap-3 mb-5 sm:mb-[24px]">
            <span className="text-[11px] sm:text-[11.5px] font-bold uppercase tracking-[3px] text-[#DDB88C]">
              FACIAL • SKIN • BEAUTY
            </span>
            <span className="w-6 sm:w-8 h-px bg-[#DDB88C]/60" />
          </div>

          {/* 3. MAIN HEADING: The Art of Luminous Skin. */}
          <h1 
            className="font-serif font-normal mb-5 sm:mb-[28px] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
            style={{
              fontSize: 'clamp(34px, 7vw, 74px)',
              lineHeight: '1.0',
              letterSpacing: '-1px',
              maxWidth: '540px'
            }}
          >
            <span className="block text-[#F7F1E8]">The Art of</span>
            <span className="block italic text-[#CFA46A]">Luminous Skin.</span>
          </h1>

          {/* 4. DESCRIPTION */}
          <p 
            className="font-body font-normal mb-6 sm:mb-[30px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
            style={{
              maxWidth: '480px',
              fontSize: 'clamp(14px, 1.2vw, 17.5px)',
              lineHeight: '1.6',
              color: 'rgba(247, 241, 232, 0.82)'
            }}
          >
            Personalized facial rituals designed to cleanse, nourish, refresh, and reveal your skin's natural radiance.
          </p>

          {/* 5. BUTTONS — stack vertically on mobile, row on sm+ */}
          <div className="flex flex-col xs:flex-row sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            {/* Primary Button */}
            <Link
              to="/book-appointment?category=facial"
              className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-7 h-[50px] sm:h-[54px] rounded-full bg-gradient-to-r from-[#CFA46A] via-[#E5C492] to-[#CFA46A] hover:from-[#E5C492] hover:to-[#CFA46A] text-[#100C0D] text-[11px] font-extrabold uppercase tracking-widest whitespace-nowrap shadow-[0_4px_22px_rgba(207,164,106,0.35)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer w-full sm:w-auto"
            >
              <span>BOOK FACIAL APPOINTMENT</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] flex-shrink-0" />
            </Link>

            {/* Secondary Button */}
            <Link
              to="/services?category=facial"
              className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-7 h-[50px] sm:h-[54px] rounded-full bg-[#100C0D]/60 hover:bg-[#100C0D]/85 text-[#F7F1E8] hover:text-[#CFA46A] text-[11px] font-bold uppercase tracking-widest whitespace-nowrap border border-[#CFA46A]/40 hover:border-[#CFA46A] backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer w-full sm:w-auto"
            >
              <span>EXPLORE FACIAL TREATMENTS</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] flex-shrink-0" />
            </Link>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* LAYER 4: BOTTOM FLOATING TRANSPARENT HERO INFO BAR                         */}
      {/* ========================================================================= */}
      <div className="absolute bottom-0 left-0 right-0 z-20 w-full py-2.5 bg-gradient-to-t from-black/75 via-black/35 to-transparent">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between text-[9.5px] sm:text-[10px] font-body tracking-[0.22em] uppercase text-[#F7F1E8]/80">
          
          {/* Left Brand Indicator */}
          <div className="flex items-center gap-2 text-[#CFA46A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CFA46A]" />
            <span className="font-semibold text-[#F7F1E8]">GLAM GIRL BY JANKI</span>
          </div>

          {/* Center Scroll Prompt */}
          <a
            href="#services"
            className="flex items-center gap-1.5 hover:text-[#CFA46A] transition-colors group cursor-pointer"
          >
            <span>SCROLL</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#CFA46A] group-hover:translate-y-0.5 transition-transform" />
          </a>

          {/* Right Location */}
          <div className="hidden sm:block text-right text-[#F7F1E8]/70 font-semibold">
            OTTAWA • WOMEN'S BEAUTY STUDIO
          </div>

        </div>
      </div>
    </section>
  );
}
