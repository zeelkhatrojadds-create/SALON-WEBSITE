import React, { useState } from 'react';
import { 
  Sparkles, 
  Calendar, 
  RotateCcw, 
  ArrowRight, 
  Check, 
  Info, 
  Clock, 
  Heart, 
  ChevronRight,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { 
  MAKEUP_OCCASIONS, 
  MAKEUP_INSPIRATION_GALLERY 
} from './MakeupConstants';

export default function MakeupOccasionSelector({ onSelectOccasionForConsultation }) {
  const [selectedOccasionId, setSelectedOccasionId] = useState('wedding');

  const selectedOccasion = MAKEUP_OCCASIONS.find(o => o.id === selectedOccasionId) || MAKEUP_OCCASIONS[0];

  const matchingStyles = MAKEUP_INSPIRATION_GALLERY.filter(item => 
    selectedOccasion.recommendedStyles.some(rec => 
      item.name.toLowerCase().includes(rec.toLowerCase()) || 
      rec.toLowerCase().includes(item.name.toLowerCase())
    )
  );

  const handleReset = () => {
    setSelectedOccasionId('wedding');
  };

  return (
    <section id="makeup-occasions" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
          <Calendar className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            CURATED CELEBRATION DISCOVERY
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          Choose Your Occasion
        </h2>

        <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
          Every celebration has its own lighting, pace, and emotional energy. Select your upcoming milestone to discover tailored makeup palettes, recommended gallery styles, and approved atelier rituals.
        </p>

        {/* Responsible Guidance Disclaimer */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-[11px] text-[#465640] max-w-xl text-left sm:text-center mt-2">
          <Info className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
          <span>
            <strong>Inspiration Suggestions:</strong> Suggested looks and colors are aesthetic recommendations. We do not automatically assign fixed prices or promise identical results for every client.
          </span>
        </div>
      </div>

      {/* Occasion Selection Pills Grid (12 Occasions) */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
            1. Select Your Upcoming Event ({MAKEUP_OCCASIONS.length} Occasions)
          </span>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold text-[#465640] hover:text-[#10110F] hover:bg-white border border-[#DCE1D8] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset to Wedding</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {MAKEUP_OCCASIONS.map((occ) => {
            const isSelected = selectedOccasionId === occ.id;
            return (
              <button
                key={occ.id}
                type="button"
                onClick={() => setSelectedOccasionId(occ.id)}
                className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-md ring-1 ring-[#263D2B]'
                    : 'bg-white text-[#10110F] border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-[#FBF9F4]'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold line-clamp-1">{occ.name}</span>
                    {isSelected && <Check className="w-3 h-3 text-[#A8B5A0] flex-shrink-0" />}
                  </div>
                  <p className={`text-[10px] line-clamp-1 ${isSelected ? 'text-[#DCE1D8]' : 'text-[#6B7068]'}`}>
                    {occ.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Occasion Showcase Panel */}
      <div className="bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-10 shadow-xs space-y-8">
        
        {/* Top Info Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#DCE1D8]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#263D2B]">
              <Sparkles className="w-4 h-4" />
              <span>Tailored Occasion Architecture</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#10110F]">
              {selectedOccasion.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#465640] max-w-2xl leading-relaxed pt-1">
              {selectedOccasion.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-4 py-2 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs font-semibold text-[#263D2B] whitespace-nowrap">
              Active Selection
            </span>
          </div>
        </div>

        {/* 3 Occasion Parameter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1">
            <span className="font-bold text-[#10110F] uppercase tracking-wider text-[10px] block text-[#263D2B]">
              Recommended Finish:
            </span>
            <p className="font-serif text-base text-[#10110F]">
              {selectedOccasion.finishRecommendation}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1">
            <span className="font-bold text-[#10110F] uppercase tracking-wider text-[10px] block text-[#263D2B]">
              Complementary Color Palette:
            </span>
            <p className="text-[#465640] leading-snug">
              {selectedOccasion.colorPalette}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1">
            <span className="font-bold text-[#10110F] uppercase tracking-wider text-[10px] block text-[#263D2B]">
              Timing &amp; Preparation Tip:
            </span>
            <p className="text-[#465640] leading-snug">
              {selectedOccasion.timingAdvice}
            </p>
          </div>
        </div>

        {/* Matching Gallery Inspiration Looks */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="font-serif text-xl sm:text-2xl text-[#10110F]">
              Matching Gallery Looks for {selectedOccasion.name}
            </h4>
            <span className="text-xs text-[#6B7068]">
              {matchingStyles.length} Curated Looks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchingStyles.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl border border-[#DCE1D8] bg-[#FBF9F4] flex items-start gap-3.5 hover:border-[#263D2B]/40 transition-colors"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#DCE1D8] flex-shrink-0 bg-[#10110F]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif text-base text-[#10110F] font-semibold">{item.name}</span>
                  </div>
                  <p className="text-[11px] text-[#263D2B] font-medium italic line-clamp-1">
                    "{item.tagline}"
                  </p>
                  <p className="text-[10.5px] text-[#6B7068] line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Approved Salon Service Cross-Link (Pure Information, No Booking) */}
        {selectedOccasion.matchedServiceName && (
          <div className="p-5 rounded-2xl bg-[#263D2B] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#A8B5A0] block">
                CORRESPONDING SALON SERVICE IN CATALOG
              </span>
              <h4 className="font-serif text-xl text-white">
                {selectedOccasion.matchedServiceName}
              </h4>
              <p className="text-xs text-white/80">
                Performed by certified beauty director Janki Khatroja with authentic pricing and certified duration.
              </p>
            </div>

            <a
              href="#makeup-services"
              className="px-5 py-2.5 rounded-full bg-white text-[#10110F] text-xs font-bold uppercase tracking-wider hover:bg-[#F7F4ED] transition-transform hover:scale-105 flex items-center justify-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span>View Service Details ↓</span>
            </a>
          </div>
        )}

      </div>

    </section>
  );
}
