import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Compass, Scissors, ShieldCheck } from 'lucide-react';

export default function HairHeroSection({ onOpenConsultation, onExploreExperiences }) {
  return (
    <section className="relative pt-10 sm:pt-16 pb-14 sm:pb-20 border-b border-[#DCE1D8] bg-white">
      {/* Subtle Ambient Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#263D2B]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#A8B5A0]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Editorial Intro Block */}
        <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-5">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] shadow-xs">
            <Scissors className="w-3.5 h-3.5 text-[#263D2B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              BESPOKE OTTAWA HAIR STUDIO
            </span>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <span className="font-serif italic text-lg sm:text-2xl text-[#263D2B] block font-light">
              &ldquo;Your Hair. Your Signature.&rdquo;
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#10110F] font-normal tracking-tight leading-[1.15]">
              The Art of Beautiful Hair
            </h1>
            <p className="font-mono text-xs uppercase tracking-widest text-[#465640]">
              The Hair Atelier at GLAM GIRL BY JANKI
            </p>
          </div>

          <p className="text-xs sm:text-sm md:text-base text-[#465640] max-w-2xl mx-auto leading-relaxed font-light">
            Discover your style, explore your possibilities, and create a hair experience designed around you. In our private, single-guest Ottawa studio, master aesthetician and stylist Janki Khatroja harmonizes precision cutting, multi-tonal dimensional colour, and botanical Ayurvedic hair rituals with unhurried personal care.
          </p>

          {/* Action CTAs: Discover Experiences & Consultation */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button
              type="button"
              onClick={onExploreExperiences}
              className="global-button w-full sm:w-auto !py-3.5 !px-8 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer hover:scale-[1.02] transition-transform"
            >
              <Compass className="w-4 h-4 text-white" />
              <span>Discover Experiences ↓</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenConsultation && onOpenConsultation()}
              className="global-button-secondary w-full sm:w-auto !py-3.5 !px-7 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer hover:border-[#263D2B] transition-colors"
            >
              <span>Personalized Consultation</span>
            </button>
          </div>

        </div>

        {/* FULL-WIDTH PHOTOGRAPHIC HERO: REAL STYLIST WORKING ON HAIR (NO CROPPING) */}
        <div className="mt-10 sm:mt-14 w-full max-w-5xl mx-auto">
          <div className="w-full bg-[#10110F] rounded-2xl sm:rounded-3xl border border-[#DCE1D8] shadow-2xl p-2 sm:p-3">
            <img
              src="/images/hair-care/50-bridal-hair-styling.jpg"
              alt="Professional stylist precision styling long glossy hair in private Ottawa hair studio at GLAM GIRL BY JANKI"
              className="w-full h-auto block rounded-xl sm:rounded-2xl"
              style={{ width: '100%', height: 'auto', display: 'block' }}
              loading="eager"
              onError={(e) => {
                e.currentTarget.src = '/images/hair-care/50-bridal-hair-styling.webp';
              }}
            />
          </div>

          {/* Clean Editorial Caption Beneath (Not on top of the image) */}
          <div className="mt-3.5 px-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs text-[#6B7068]">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-serif italic text-sm text-[#263D2B]">The Private Hair Suite</span>
              <span className="hidden sm:inline text-[#DCE1D8]">&bull;</span>
              <span>1:1 Dedicated Stylist Attention &bull; Authentic Salon Precision</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap text-[11px] font-mono">
              <span className="text-[#263D2B] font-semibold">Master Stylist: Janki Khatroja</span>
              <span className="inline-flex items-center gap-1 text-[#263D2B] bg-[#263D2B]/10 px-2.5 py-0.5 rounded-full font-sans font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Single-Guest Sanctuary
              </span>
            </div>
          </div>
        </div>

        {/* 4 Atelier Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mt-10 pt-6 border-t border-[#DCE1D8]/70">
          <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-center">
            <div className="text-base font-bold text-[#10110F]">1:1 Suite</div>
            <div className="text-[10px] text-[#6B7068] uppercase font-mono mt-0.5">Private Sanctuary</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-center">
            <div className="text-base font-bold text-[#10110F]">100% CAD</div>
            <div className="text-[10px] text-[#6B7068] uppercase font-mono mt-0.5">Transparent Rates</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-center">
            <div className="text-base font-bold text-[#10110F]">Botanical</div>
            <div className="text-[10px] text-[#6B7068] uppercase font-mono mt-0.5">Herbal Care &amp; Spas</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-center">
            <div className="text-base font-bold text-[#10110F]">Bespoke</div>
            <div className="text-[10px] text-[#6B7068] uppercase font-mono mt-0.5">Face-Framing Cuts</div>
          </div>
        </div>

        {/* Quick Anchor Jumps */}
        <div className="pt-8 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] overflow-x-auto max-w-full text-xs">
            <a href="#signature-experiences" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors whitespace-nowrap">
              1. 5 Signature Experiences
            </a>
            <a href="#hair-inspiration-board" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors whitespace-nowrap">
              2. Inspiration Board
            </a>
            <a href="#hair-experience-finder" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors whitespace-nowrap">
              3. Experience Finder
            </a>
            <a href="#hair-service-menu" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors whitespace-nowrap">
              4. Service Menu
            </a>
            <a href="#hair-care-journal" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors whitespace-nowrap">
              5. Care Journal
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
