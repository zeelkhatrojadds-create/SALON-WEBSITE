import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import jankiPhoto from '../../assets/janki-khatroja.webp';

export default function ServicesHero() {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-white border border-[#DCE1D8] shadow-sm mb-8 sm:mb-12 lg:mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
        {/* Left Copy */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-14 z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[#263D2B] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-[#263D2B] flex-shrink-0" />
            <span>FULL TREATMENT CATALOGUE</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.15]">
            Premium Beauty & Wellness<br className="hidden sm:inline" /> Rituals for Every Woman
          </h1>

          <p className="text-[#6B7068] text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-sans">
            From bespoke hair couture to botanical skincare rituals, explore our complete menu crafted by Founder & Master Artist Janki Khatroja.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-[#6B7068] font-sans">
            <span className="flex items-center gap-1.5 font-semibold text-[#263D2B]">
              <span className="w-2 h-2 rounded-full bg-[#263D2B]"></span>
              All 86 Services Available in Ottawa
            </span>
            <span className="hidden sm:inline text-[#DCE1D8]">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B]" />
              Personally Directed by Owner Janki Khatroja
            </span>
          </div>
        </div>

        {/* Right Hero Image */}
        <div className="lg:col-span-5 h-[260px] sm:h-[320px] lg:h-full min-h-[260px] lg:min-h-[360px] relative overflow-hidden flex items-center justify-center bg-[#F7F4ED]">
          <img
            src={jankiPhoto || "/janki-khatroja.jpg"}
            alt="Janki Khatroja — Founder, Main Owner & Master Beauty Director"
            className="w-full h-full object-cover object-top filter brightness-95"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden opacity-80" />

          {/* Owner Identity Badge */}
          <div className="absolute bottom-4 right-4 bg-[#263D2B]/95 backdrop-blur-md px-3.5 py-1.5 rounded-[4px] text-xs font-semibold text-white border border-white/20 flex items-center gap-2 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#A8B5A0]" />
            <span>Janki Khatroja — Founder & Owner</span>
          </div>
        </div>
      </div>
    </div>
  );
}
