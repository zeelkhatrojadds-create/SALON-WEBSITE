import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Check, 
  ArrowRight, 
  Eye, 
  Info, 
  Layers, 
  SlidersHorizontal,
  Compass,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { 
  LASH_STYLES, 
  LASH_CURLS, 
  LASH_LENGTHS, 
  LASH_FULLNESS_OPTIONS 
} from './LashConstants';

export default function LashStyleSelector({ onOpenConsultation }) {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState(LASH_STYLES[1]); // Default Wispy
  const [selectedCurl, setSelectedCurl] = useState(LASH_CURLS[1]); // C-Curl
  const [selectedLength, setSelectedLength] = useState(LASH_LENGTHS[1]); // Medium
  const [selectedFullness, setSelectedFullness] = useState(LASH_FULLNESS_OPTIONS[1]); // Light Volume

  // Map chosen style to best matching salon service ID
  const getMappedServiceId = () => {
    switch (selectedStyle.id) {
      case 'natural':
        return 'classic-eyelash-extension';
      case 'wispy':
      case 'hybrid':
        return 'hybrid-eyelash-extension';
      case 'cat-eye':
      case 'doll-eye':
      case 'volume':
        return 'volume-eyelash-extension';
      default:
        return 'hybrid-eyelash-extension';
    }
  };

  const handleLaunchConsultation = () => {
    if (onOpenConsultation) {
      onOpenConsultation({
        style: selectedStyle.name,
        curl: selectedCurl.name,
        length: `${selectedLength.name} (${selectedLength.range})`,
        fullness: `${selectedFullness.name} (${selectedFullness.ratio})`
      });
    }
  };

  return (
    <section id="lash-style-selector" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
          <Eye className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            INTERACTIVE LASH PREFERENCE ARCHITECT
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          Curate Your Signature Lash Silhouette
        </h2>

        <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
          Explore customized lash geometries calibrated to your eye contour. Select your preferred look, curl, length, and fullness before your appointment.
        </p>

        {/* Reference Disclaimer */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-[11px] text-[#6B7068]">
          <Info className="w-3.5 h-3.5 text-[#263D2B] flex-shrink-0" />
          <span>All visual styles are inspiration references. Final results are individually calibrated to your natural lash strength.</span>
        </div>
      </div>

      {/* Main Grid: Style Selector Tabs + Live Studio Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: 6 Style Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#10110F] flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>1. Choose Lash Silhouette</span>
            </span>
            <span className="text-[11px] text-[#465640] font-medium">
              {LASH_STYLES.length} Curated Silhouettes
            </span>
          </div>

          <div className="space-y-2.5">
            {LASH_STYLES.map((style) => {
              const isSelected = selectedStyle.id === style.id;
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setSelectedStyle(style)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 relative cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#263D2B] shadow-md ring-1 ring-[#263D2B]'
                      : 'bg-[#FBF9F4] border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-base sm:text-lg text-[#10110F] font-normal">
                          {style.name}
                        </h4>
                        {isSelected && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9.5px] font-bold uppercase bg-[#263D2B] text-white">
                            <Check className="w-2.5 h-2.5" />
                            Selected
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-medium text-[#263D2B]">
                        {style.subtitle}
                      </p>
                      <p className="text-[11px] text-[#6B7068] line-clamp-2">
                        {style.description}
                      </p>
                    </div>

                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#DCE1D8] flex-shrink-0 bg-neutral-100">
                      <img
                        src={style.image}
                        alt={style.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Customization Controls & Visual Reference (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active Style Visual Showcase Card */}
          <div className="bg-white rounded-3xl border border-[#DCE1D8] overflow-hidden shadow-sm p-6 sm:p-8 space-y-6">
            
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#DCE1D8]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                  SELECTED ATELIER LOOK
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F]">
                  {selectedStyle.name}
                </h3>
                <p className="text-xs text-[#6B7068] italic">
                  "{selectedStyle.tagline}"
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[11px] font-semibold text-[#465640]">
                  Studio Reference Photo
                </span>
              </div>
            </div>

            {/* Visual Photo Banner */}
            <div className="relative rounded-2xl overflow-hidden border border-[#DCE1D8] bg-[#10110F] aspect-[16/9] max-h-72">
              <img
                src={selectedStyle.image}
                alt={selectedStyle.name}
                className="w-full h-full object-cover opacity-95 transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 sm:p-6 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A8B5A0]">
                  Inspiration Reference View
                </span>
                <p className="text-xs font-light max-w-lg text-white/90">
                  {selectedStyle.referenceNote}
                </p>
              </div>
            </div>

            {/* 3 Parameter Selectors: Curl, Length, Fullness */}
            <div className="space-y-5 pt-2">
              
              {/* 1. Curl */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block mb-2 flex items-center justify-between">
                  <span>2. Preferred Curl Curvature</span>
                  <span className="text-[11px] font-mono text-[#263D2B] font-semibold">{selectedCurl.name}</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {LASH_CURLS.map((curl) => {
                    const active = selectedCurl.id === curl.id;
                    return (
                      <button
                        key={curl.id}
                        type="button"
                        onClick={() => setSelectedCurl(curl)}
                        className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                            : 'bg-[#FBF9F4] text-[#10110F] border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                        }`}
                      >
                        <div className="text-xs font-bold">{curl.name}</div>
                        <div className={`text-[10px] truncate ${active ? 'text-[#A8B5A0]' : 'text-[#6B7068]'}`}>
                          {curl.badge}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Length */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block mb-2 flex items-center justify-between">
                  <span>3. Desired Lash Length</span>
                  <span className="text-[11px] font-mono text-[#263D2B] font-semibold">{selectedLength.name} ({selectedLength.range})</span>
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {LASH_LENGTHS.map((len) => {
                    const active = selectedLength.id === len.id;
                    return (
                      <button
                        key={len.id}
                        type="button"
                        onClick={() => setSelectedLength(len)}
                        className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                            : 'bg-[#FBF9F4] text-[#10110F] border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                        }`}
                      >
                        <div className="text-xs font-bold">{len.name}</div>
                        <div className={`text-[10px] font-mono ${active ? 'text-[#A8B5A0]' : 'text-[#6B7068]'}`}>
                          {len.range}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Fullness / Density */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block mb-2 flex items-center justify-between">
                  <span>4. Fullness &amp; Density Ratio</span>
                  <span className="text-[11px] font-mono text-[#263D2B] font-semibold">{selectedFullness.name} ({selectedFullness.ratio})</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {LASH_FULLNESS_OPTIONS.map((f) => {
                    const active = selectedFullness.id === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setSelectedFullness(f)}
                        className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                            : 'bg-[#FBF9F4] text-[#10110F] border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                        }`}
                      >
                        <div className="text-xs font-bold truncate">{f.name}</div>
                        <div className={`text-[10px] font-mono ${active ? 'text-[#A8B5A0]' : 'text-[#6B7068]'}`}>
                          {f.ratio}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Custom Configuration Summary Pill */}
            <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#10110F]">
                <Sparkles className="w-4 h-4 text-[#263D2B]" />
                <span>Your Personalized Lash Specification</span>
              </div>
              <div className="text-xs text-[#465640] flex flex-wrap items-center gap-x-3 gap-y-1">
                <span><strong>Silhouette:</strong> {selectedStyle.name}</span>
                <span>•</span>
                <span><strong>Curl:</strong> {selectedCurl.name}</span>
                <span>•</span>
                <span><strong>Length:</strong> {selectedLength.name} ({selectedLength.range})</span>
                <span>•</span>
                <span><strong>Fullness:</strong> {selectedFullness.name} ({selectedFullness.ratio})</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={handleLaunchConsultation}
                className="global-button w-full sm:w-auto !py-3.5 !px-8 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Compass className="w-4 h-4 text-white" />
                <span>Include Style in Lash Consultation</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
