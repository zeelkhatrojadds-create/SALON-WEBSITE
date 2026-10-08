import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative w-full text-[#F7F1E8] overflow-x-hidden bg-[#100C0D]"
    >
      {/* ========================================================================= */}
      {/* MOBILE VIEW (< md): FULL UPLOADED IMAGE -> HERO CONTENT -> CTA BUTTONS   */}
      {/* ========================================================================= */}
      <div className="block md:hidden w-full pt-[68px]">
        {/* 1. Full Uploaded Hero Image (100% visible, natural aspect ratio, no crop) */}
        <div className="w-full bg-[#100C0D] overflow-hidden">
          <img
            src="/hero-mobile.webp"
            alt="GLAM GIRL BY JANKI luxury salon atelier"
            width="575"
            height="1024"
            fetchPriority="high"
            decoding="async"
            className="w-full h-auto block object-contain object-center"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'contain',
              objectPosition: 'center'
            }}
          />
        </div>

        {/* 2. Mobile Hero Content Section */}
        <div className="w-full px-5 py-6 bg-gradient-to-b from-[#100C0D] via-[#140F11] to-[#100C0D] flex flex-col items-start border-t border-[#CFA46A]/15">
          
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="text-[10.5px] font-bold uppercase tracking-[3px] text-[#DDB88C]">
              FACIAL • SKIN • BEAUTY
            </span>
            <span className="w-6 h-px bg-[#DDB88C]/60" />
          </div>

          {/* Luxury Heading */}
          <h1 className="font-serif font-normal mb-2 text-[32px] xs:text-[36px] leading-[1.05] tracking-tight text-[#F7F1E8]">
            <span className="block">GLAM GIRL</span>
            <span className="block italic text-[#CFA46A]">BY JANKI</span>
          </h1>

          {/* Description */}
          <p className="font-body font-normal text-[13.5px] xs:text-[14px] leading-[1.6] text-[#F7F1E8]/85 mb-5 max-w-[480px]">
            Personalized facial rituals designed to cleanse, nourish, refresh, and reveal your skin's natural radiance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-2.5 w-full">
            <Link
              to="/book-appointment"
              className="w-full inline-flex items-center justify-center gap-2 h-[50px] rounded-full bg-gradient-to-r from-[#CFA46A] via-[#E5C492] to-[#CFA46A] text-[#100C0D] text-[11.5px] font-extrabold uppercase tracking-widest shadow-[0_4px_20px_rgba(207,164,106,0.35)] active:scale-98 transition-all"
            >
              <span>BOOK APPOINTMENT</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

            <Link
              to="/services"
              className="w-full inline-flex items-center justify-center gap-2 h-[50px] rounded-full bg-[#1A1416] hover:bg-[#241C1F] text-[#F7F1E8] text-[11.5px] font-bold uppercase tracking-widest border border-[#CFA46A]/40 active:scale-98 transition-all"
            >
              <span>EXPLORE TREATMENTS</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>



        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP VIEW (>= md): ORIGINAL FULL-SCREEN HERO (COMPLETELY UNCHANGED)    */}
      {/* ========================================================================= */}
      <div className="hidden md:flex relative w-full min-h-[100svh] h-[100svh] flex-col justify-between overflow-hidden">
        
        {/* LAYER 0: DESKTOP FULL HD PHOTOGRAPH (1920x1080) */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-[#100C0D]">
          <picture className="w-full h-full block">
            <source
              type="image/webp"
              srcSet="/facial-atelier-clean-1920.webp 1920w, /facial-atelier-clean-1200.webp 1200w"
              sizes="100vw"
            />
            <img
              src="/facial-atelier-clean-1920.webp"
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

        {/* LAYER 1: DESKTOP READING GRADIENT */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(16,12,13,0.88) 0%, rgba(16,12,13,0.6) 45%, rgba(16,12,13,0.2) 75%, transparent 100%)'
          }}
        />

        {/* LAYER 2: TABLET & DESKTOP HERO CONTENT */}
        <div className="relative z-20 flex-1 flex flex-col justify-center w-full max-w-none xl:max-w-[1500px] mx-auto px-6 md:px-8 lg:px-10 xl:px-[6%] pt-[84px] pb-16">
          <div className="w-full max-w-[560px] lg:max-w-[580px] xl:max-w-[540px] text-left flex flex-col items-start">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4 md:mb-5 lg:mb-[24px]">
              <span className="text-[11px] md:text-[11.5px] font-bold uppercase tracking-[3px] text-[#DDB88C]">
                FACIAL • SKIN • BEAUTY
              </span>
              <span className="w-8 h-px bg-[#DDB88C]/60" />
            </div>

            {/* Heading */}
            <h1 
              className="font-serif font-normal mb-4 md:mb-5 lg:mb-[28px] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] max-w-[560px]"
              style={{
                fontSize: 'clamp(32px, 5.2vw, 74px)',
                lineHeight: '1.02',
                letterSpacing: '-1px'
              }}
            >
              <span className="block text-[#F7F1E8]">The Art of</span>
              <span className="block italic text-[#CFA46A]">Luminous Skin.</span>
            </h1>

            {/* Description */}
            <p 
              className="font-body font-normal mb-6 md:mb-7 lg:mb-[30px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] max-w-[480px] text-[14.5px] md:text-[15.5px] lg:text-[17.5px] leading-[1.6]"
              style={{
                color: 'rgba(247, 241, 232, 0.82)'
              }}
            >
              Personalized facial rituals designed to cleanse, nourish, refresh, and reveal your skin's natural radiance.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row md:flex-row items-stretch sm:items-center gap-3 lg:gap-3.5 w-full sm:w-auto">
              <Link
                to="/book-appointment?category=facial"
                className="inline-flex items-center justify-center gap-2.5 px-6 lg:px-7 h-[50px] lg:h-[54px] rounded-full bg-gradient-to-r from-[#CFA46A] via-[#E5C492] to-[#CFA46A] hover:from-[#E5C492] hover:to-[#CFA46A] text-[#100C0D] text-[11px] lg:text-[11.5px] font-extrabold uppercase tracking-widest whitespace-nowrap shadow-[0_4px_22px_rgba(207,164,106,0.35)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <span>BOOK FACIAL APPOINTMENT</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] flex-shrink-0" />
              </Link>

              <Link
                to="/services?category=facial"
                className="inline-flex items-center justify-center gap-2.5 px-6 lg:px-7 h-[50px] lg:h-[54px] rounded-full bg-[#100C0D]/60 hover:bg-[#100C0D]/85 text-[#F7F1E8] hover:text-[#CFA46A] text-[11px] lg:text-[11.5px] font-bold uppercase tracking-widest whitespace-nowrap border border-[#CFA46A]/40 hover:border-[#CFA46A] backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <span>EXPLORE FACIAL TREATMENTS</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] flex-shrink-0" />
              </Link>
            </div>

          </div>
        </div>

        {/* LAYER 3: DESKTOP BOTTOM BAR */}
        <div className="absolute bottom-0 left-0 right-0 z-20 w-full py-2.5 bg-gradient-to-t from-black/75 via-black/35 to-transparent">
          <div className="max-w-7xl mx-auto w-full px-8 lg:px-12 flex items-center justify-between text-[10px] font-body tracking-[0.22em] uppercase text-[#F7F1E8]/80">
            <div className="flex items-center gap-2 text-[#CFA46A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CFA46A]" />
              <span className="font-semibold text-[#F7F1E8]">GLAM GIRL BY JANKI</span>
            </div>
            <a
              href="#services"
              className="flex items-center gap-1.5 hover:text-[#CFA46A] transition-colors group cursor-pointer"
            >
              <span>SCROLL</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#CFA46A] group-hover:translate-y-0.5 transition-transform" />
            </a>
            <div className="text-right text-[#F7F1E8]/70 font-semibold">
              OTTAWA • WOMEN'S BEAUTY STUDIO
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
