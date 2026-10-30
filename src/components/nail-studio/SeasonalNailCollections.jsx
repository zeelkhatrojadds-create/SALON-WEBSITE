import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Eye, 
  Wand2, 
  Calendar, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Info,
  Clock,
  Layers,
  Check,
  Palette,
  Sun,
  Flame,
  Snowflake,
  Flower2
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import { SEASONS_CONFIG, SEASONAL_NAIL_COLLECTIONS } from '../../data/seasonalNailData';

export default function SeasonalNailCollections({ onApplyPreset }) {
  const navigate = useNavigate();
  const [activeSeasonTab, setActiveSeasonTab] = useState('all'); // 'all' | 'spring' | 'summer' | 'autumn' | 'winter'
  const [activeModalDesign, setActiveModalDesign] = useState(null);
  const closeButtonRef = useRef(null);

  // Keyboard accessibility (Escape key to dismiss) & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeModalDesign) {
        setActiveModalDesign(null);
      }
    };

    if (activeModalDesign) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalDesign]);

  // Filtered designs
  const displayedDesigns = useMemo(() => {
    if (activeSeasonTab === 'all') return SEASONAL_NAIL_COLLECTIONS;
    return SEASONAL_NAIL_COLLECTIONS.filter(d => d.seasonId === activeSeasonTab);
  }, [activeSeasonTab]);

  // Current active season metadata (if single season selected)
  const currentSeasonMeta = useMemo(() => {
    return SEASONS_CONFIG.find(s => s.id === activeSeasonTab) || null;
  }, [activeSeasonTab]);

  // Handle Try Design
  const handleTryDesign = (preset) => {
    if (activeModalDesign) {
      setActiveModalDesign(null);
    }
    if (onApplyPreset) {
      onApplyPreset(preset);
    }
  };

  const getSeasonIcon = (seasonId) => {
    switch (seasonId) {
      case 'spring': return <Flower2 className="w-3.5 h-3.5 text-[#E8A7A1]" />;
      case 'summer': return <Sun className="w-3.5 h-3.5 text-[#F59E0B]" />;
      case 'autumn': return <Flame className="w-3.5 h-3.5 text-[#881337]" />;
      case 'winter': return <Snowflake className="w-3.5 h-3.5 text-[#3B82F6]" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />;
    }
  };

  return (
    <section 
      id="seasonal-nail-collections" 
      aria-label="Seasonal Nail Art Collections"
      className="w-full bg-[#FAF7F2] border-t border-[#DCE1D8] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 shadow-2xs scroll-mt-24 select-none"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER                                                         */}
        {/* ========================================================================= */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>STEP 05 · FOUR-SEASON HAUTE COUTURE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
            Seasonal Nail Art Collections
          </h2>

          <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto">
            From blooming spring pastels and sun-drenched summer brights to cozy autumn textures and frosted winter crystals — discover curated collections inspired by the changing seasons.
          </p>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 2. SEASON SELECTOR TABS & SEASON VIBE BANNER                              */}
        {/* ========================================================================= */}
        <div className="space-y-4 mb-12 sm:mb-16">
          
          {/* Tabs Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveSeasonTab('all')}
              className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-2xs ${
                activeSeasonTab === 'all'
                  ? 'bg-[#263D2B] text-white ring-2 ring-[#263D2B] ring-offset-2 ring-offset-[#FAF7F2]'
                  : 'bg-white text-[#10110F] border border-[#DCE1D8] hover:bg-[#F7F4ED]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>All Collections (16)</span>
            </button>

            {SEASONS_CONFIG.map((season) => {
              const isSel = activeSeasonTab === season.id;
              return (
                <button
                  key={season.id}
                  type="button"
                  onClick={() => setActiveSeasonTab(season.id)}
                  className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-2xs ${
                    isSel
                      ? 'bg-[#263D2B] text-white ring-2 ring-[#263D2B] ring-offset-2 ring-offset-[#FAF7F2]'
                      : 'bg-white text-[#10110F] border border-[#DCE1D8] hover:bg-[#F7F4ED]'
                  }`}
                >
                  {getSeasonIcon(season.id)}
                  <span>{season.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Season Highlight Card (when a specific season is active) */}
          {currentSeasonMeta && (
            <div className="max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-white border border-[#DCE1D8] shadow-xs text-center space-y-1.5 animate-in fade-in duration-300">
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#263D2B] block">
                {currentSeasonMeta.badge}
              </span>
              <h3 className="font-serif text-lg font-normal text-[#10110F]">
                {currentSeasonMeta.tagline}
              </h3>
              <p className="text-xs text-[#6B7068] leading-relaxed max-w-lg mx-auto font-light">
                {currentSeasonMeta.description}
              </p>
            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* 3. SEASONAL GALLERY CARDS GRID (RESPONSIVE)                               */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {displayedDesigns.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-[#DCE1D8] overflow-hidden shadow-2xs hover:shadow-md hover:border-[#263D2B] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Image Preview */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F7F4ED]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Season Badge Top Left */}
                  <div className="absolute top-3 left-3 bg-[#10110F]/90 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-2xs flex items-center gap-1 border border-white/10">
                    {getSeasonIcon(item.seasonId)}
                    <span>{item.seasonName.toUpperCase()}</span>
                  </div>

                  {/* Style Category Badge Bottom Left */}
                  <div className="absolute bottom-2.5 left-3 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider text-[#263D2B] border border-[#DCE1D8]">
                    {item.category}
                  </div>

                  {/* Quick View Button Top Right */}
                  <button
                    type="button"
                    onClick={() => setActiveModalDesign(item)}
                    aria-label={`Explore ${item.name} details`}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md border border-[#DCE1D8] flex items-center justify-center text-[#263D2B] opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#263D2B] hover:text-white cursor-pointer shadow-xs"
                    title="Explore design"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <div className="space-y-0.5">
                    <h3 className="font-serif text-lg font-normal text-[#10110F] group-hover:text-[#263D2B] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-[11px] font-medium text-[#465640] uppercase tracking-wider line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-[#6B7068] leading-relaxed font-light line-clamp-2">
                    {item.description}
                  </p>

                  {/* Palette Swatch Row */}
                  <div className="pt-1 flex items-center gap-1.5">
                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#6B7068] mr-1">
                      PALETTE:
                    </span>
                    <div className="flex items-center gap-1">
                      {item.palette.map((swatch, idx) => (
                        <div
                          key={idx}
                          className="w-4 h-4 rounded-full border border-black/15 shadow-2xs cursor-pointer hover:scale-110 transition-transform"
                          style={{ backgroundColor: swatch.hex }}
                          title={`${swatch.name} (${swatch.hex})`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Explore Details & Try In Studio */}
              <div className="p-5 pt-0 border-t border-[#DCE1D8]/60 mt-2 space-y-2">
                <button
                  type="button"
                  onClick={() => setActiveModalDesign(item)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#F7F4ED] hover:bg-[#263D2B] text-[#10110F] hover:text-white border border-[#DCE1D8] hover:border-[#263D2B] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-2xs group/btn"
                >
                  <Eye className="w-3.5 h-3.5 text-[#263D2B] group-hover/btn:text-white transition-colors" />
                  <span>Explore Design</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTryDesign(item.preset)}
                  className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-[#F7F4ED] text-[#263D2B] border border-[#263D2B]/30 hover:border-[#263D2B] text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-2xs"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Try In Studio</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* 4. INTERACTIVE SEASONAL DESIGN DETAILS MODAL                              */}
        {/* ========================================================================= */}
        {activeModalDesign && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#10110F]/80 backdrop-blur-xs animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-seasonal-design-title"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setActiveModalDesign(null);
              }
            }}
          >
            <div
              className="bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto relative animate-in zoom-in-95 duration-200"
            >
              {/* Close Button Top Right */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setActiveModalDesign(null)}
                aria-label="Close seasonal design modal"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/95 border border-[#DCE1D8] text-[#10110F] hover:bg-[#263D2B] hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                
                {/* Large Close-Up Image Column */}
                <div className="md:col-span-5 relative aspect-square md:aspect-auto md:min-h-[460px] bg-[#F7F4ED] overflow-hidden rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl">
                  <img
                    src={activeModalDesign.image}
                    alt={activeModalDesign.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#10110F]/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 border border-white/20">
                    {getSeasonIcon(activeModalDesign.seasonId)}
                    <span>{activeModalDesign.seasonName}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-[#DCE1D8] text-[11px] text-[#465640] shadow-sm">
                    <span className="font-bold text-[#10110F] block">Artisan Technique:</span>
                    <span>{activeModalDesign.technique}</span>
                  </div>
                </div>

                {/* Details Column */}
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-5">
                    
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#263D2B] block">
                        HAUTE SEASONAL ATELIER COLLECTION
                      </span>
                      <h3
                        id="modal-seasonal-design-title"
                        className="font-serif text-2xl sm:text-3xl font-normal text-[#10110F] leading-tight"
                      >
                        {activeModalDesign.name}
                      </h3>
                      <p className="text-xs font-medium text-[#465640] uppercase tracking-wider">
                        {activeModalDesign.subtitle} · {activeModalDesign.category}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed font-light">
                      {activeModalDesign.description}
                    </p>

                    {/* Palette Swatches Matrix */}
                    <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#465640] block">
                        Signature Seasonal Palette:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-0.5">
                        {activeModalDesign.palette.map((swatch, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-1.5 rounded-xl bg-white border border-[#DCE1D8]/60">
                            <div 
                              className="w-4 h-4 rounded-full border border-black/15 shadow-2xs flex-shrink-0"
                              style={{ backgroundColor: swatch.hex }}
                            />
                            <div className="truncate">
                              <span className="text-[10.5px] font-semibold text-[#10110F] block truncate leading-tight">
                                {swatch.name}
                              </span>
                              <span className="text-[9px] font-mono text-[#6B7068] block">
                                {swatch.hex}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Styling Specs & Aftercare */}
                    <div className="p-4 rounded-2xl bg-white border border-[#DCE1D8] space-y-2.5 text-xs">
                      <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#DCE1D8]/60">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#465640] block">
                            Suggested Shapes:
                          </span>
                          <span className="font-semibold text-[#10110F]">
                            {activeModalDesign.suggestedShapes}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#465640] block">
                            Recommended Finish:
                          </span>
                          <span className="font-semibold text-[#10110F]">
                            {activeModalDesign.finish}
                          </span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#263D2B] flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B]" />
                          Seasonal Maintenance &amp; Care:
                        </span>
                        <p className="text-[11px] text-[#6B7068] leading-relaxed pt-0.5 font-light">
                          {activeModalDesign.aftercare}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Actions Footer */}
                  <div className="space-y-2 pt-2 border-t border-[#DCE1D8]">
                    <div>
                      <button
                        type="button"
                        onClick={() => handleTryDesign(activeModalDesign.preset)}
                        className="w-full py-3 px-4 rounded-full bg-[#263D2B] hover:bg-[#18271B] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                      >
                        <Wand2 className="w-3.5 h-3.5" />
                        <span>Try In Studio Customizer</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveModalDesign(null)}
                      className="w-full py-2 text-center text-xs text-[#6B7068] hover:text-[#10110F] font-medium transition-colors cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>

                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
