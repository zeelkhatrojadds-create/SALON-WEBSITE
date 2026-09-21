import React from 'react';
import { Sparkles } from 'lucide-react';

export default function ServicesHero() {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1C1418] via-[#23181E] to-[#140E11] border border-white/10 shadow-2xl mb-8 sm:mb-12 lg:mb-16">
      {/* Background ambient lighting */}
      <div className="absolute -top-12 -left-12 w-64 sm:w-80 h-64 sm:h-80 bg-brand-pink/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-64 sm:w-80 h-64 sm:h-80 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
        {/* Left Copy */}
        <div className="lg:col-span-7 p-5 sm:p-8 lg:p-14 z-10 space-y-3.5 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-brand-gold-light text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.24em]">
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-brand-pink flex-shrink-0" />
            <span>FULL TREATMENT CATALOGUE</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.18]">
            Premium Beauty & Wellness<br className="hidden sm:inline" /> Services for Every Woman
          </h1>

          <p className="text-[#F2ECE4]/80 text-xs sm:text-base lg:text-lg leading-relaxed max-w-xl">
            From bespoke hair couture to botanical skincare rituals, explore our complete menu crafted to help you look, feel, and be your absolute best.
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 text-[11px] sm:text-xs md:text-sm text-white/60">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              All 86 Services Available in Ottawa
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span>Certified Stylists & Master Aestheticians</span>
          </div>
        </div>

        {/* Right Hero Image */}
        <div className="lg:col-span-5 h-[200px] sm:h-[280px] lg:h-full min-h-[200px] lg:min-h-[360px] relative overflow-hidden flex items-center justify-center">
          <img
            src="/hero-campaign.jpg"
            alt="Girl Looked For You Girls Salon Ottawa Services"
            className="w-full h-full object-cover object-[75%_center] lg:object-center filter brightness-95"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1418] via-transparent to-transparent lg:hidden opacity-90" />
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#1C1418] to-transparent hidden lg:block" />
        </div>
      </div>
    </div>
  );
}
