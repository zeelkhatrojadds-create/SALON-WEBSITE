import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  Sparkles, 
  Check, 
  Info, 
  ArrowRight,
  ChevronRight,
  Feather
} from 'lucide-react';
import { 
  BROW_EXPLORER_CRITERIA, 
  BROW_INSPIRATION_STYLES 
} from './BrowConstants';

export default function BrowShapeExplorer() {
  const [preferences, setPreferences] = useState({
    appearance: 'natural',
    archStructure: 'soft',
    shapeCurvature: 'arched',
    finishDensity: 'light',
    stylingLook: 'groomed-up'
  });

  const handleSelect = (category, value) => {
    setPreferences(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleReset = () => {
    setPreferences({
      appearance: 'natural',
      archStructure: 'soft',
      shapeCurvature: 'arched',
      finishDensity: 'light',
      stylingLook: 'groomed-up'
    });
  };

  // Compute matching styles based on selections
  const matchingStyles = useMemo(() => {
    return BROW_INSPIRATION_STYLES.map(style => {
      let score = 50;

      // 1. Appearance matching
      if (preferences.appearance === 'natural') {
        if (style.category === 'natural' || style.category === 'soft') score += 20;
        if (style.id === 'natural-brows' || style.id === 'minimal-everyday-brows' || style.id === 'classic-brows') score += 15;
      } else {
        if (style.category === 'defined' || style.category === 'bold' || style.category === 'laminated') score += 20;
        if (style.id === 'bold-defined-brows' || style.id === 'soft-defined-brows' || style.id === 'arched-brows') score += 15;
      }

      // 2. Arch structure matching
      if (preferences.archStructure === 'soft') {
        if (style.id === 'soft-angled-brows' || style.id === 'soft-defined-brows' || style.id === 'natural-brows') score += 20;
      } else {
        if (style.id === 'arched-brows' || style.id === 'bold-defined-brows') score += 20;
      }

      // 3. Shape curvature
      if (preferences.shapeCurvature === 'straight') {
        if (style.id === 'straight-brows' || style.id === 'minimal-everyday-brows') score += 25;
      } else {
        if (style.id === 'arched-brows' || style.id === 'soft-angled-brows' || style.id === 'classic-brows') score += 20;
      }

      // 4. Finish density
      if (preferences.finishDensity === 'light') {
        if (style.category === 'feathered' || style.category === 'natural') score += 15;
      } else {
        if (style.category === 'bold' || style.category === 'defined' || style.category === 'laminated') score += 15;
      }

      // 5. Styling look
      if (preferences.stylingLook === 'groomed-up') {
        if (style.id === 'feathered-brows' || style.id === 'fluffy-brows' || style.id === 'brushed-up-brows' || style.id === 'laminated-brow-inspiration') score += 25;
      } else {
        if (style.id === 'minimal-everyday-brows' || style.id === 'classic-brows' || style.id === 'natural-brows') score += 25;
      }

      const matchPct = Math.min(99, Math.max(76, score));
      return { style, matchPct };
    }).sort((a, b) => b.matchPct - a.matchPct).slice(0, 3);
  }, [preferences]);

  return (
    <section id="brow-explorer" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            INTERACTIVE PREFERENCE DISCOVERY
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          Brow Shape Explorer
        </h2>

        <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
          Explore your personal aesthetic preferences across 5 key dimensions: border definition, arch structure, horizontal curvature, density, and grooming direction.
        </p>

        {/* Responsible Notice */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-[11px] text-[#465640] max-w-xl text-left sm:text-center mt-2">
          <Info className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
          <span>
            <strong>Style Preference Guide:</strong> This interactive tool explores personal aesthetic desires. It does not diagnose facial bone structures or guarantee specific brow symmetry.
          </span>
        </div>
      </div>

      {/* Main Layout: Criteria Left (7 cols), Visual Summary & Matches Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: 5 Criteria Selectors */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-8 shadow-xs space-y-7">
          
          <div className="flex items-center justify-between pb-4 border-b border-[#DCE1D8]">
            <h3 className="font-serif text-xl sm:text-2xl text-[#10110F]">
              Select Your Brow Attributes
            </h3>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#465640] hover:text-[#10110F] hover:bg-[#F7F4ED] border border-[#DCE1D8] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Selections</span>
            </button>
          </div>

          {/* 1. Natural or Defined Appearance */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
              1. Border Appearance (Natural vs. Defined)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BROW_EXPLORER_CRITERIA.appearance.map((opt) => {
                const isSelected = preferences.appearance === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect('appearance', opt.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                        : 'bg-[#FBF9F4] text-[#10110F] border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold">{opt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#A8B5A0]" />}
                    </div>
                    <p className={`text-[10.5px] ${isSelected ? 'text-[#DCE1D8]' : 'text-[#6B7068]'}`}>
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Soft or Structured Arch */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
              2. Arch Height &amp; Structure
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BROW_EXPLORER_CRITERIA.archStructure.map((opt) => {
                const isSelected = preferences.archStructure === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect('archStructure', opt.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                        : 'bg-[#FBF9F4] text-[#10110F] border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold">{opt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#A8B5A0]" />}
                    </div>
                    <p className={`text-[10.5px] ${isSelected ? 'text-[#DCE1D8]' : 'text-[#6B7068]'}`}>
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Straight or Curved Shape */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
              3. Horizontal Line Shape
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BROW_EXPLORER_CRITERIA.shapeCurvature.map((opt) => {
                const isSelected = preferences.shapeCurvature === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect('shapeCurvature', opt.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                        : 'bg-[#FBF9F4] text-[#10110F] border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold">{opt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#A8B5A0]" />}
                    </div>
                    <p className={`text-[10.5px] ${isSelected ? 'text-[#DCE1D8]' : 'text-[#6B7068]'}`}>
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Light or Bold Finish */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
              4. Finish &amp; Color Density
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BROW_EXPLORER_CRITERIA.finishDensity.map((opt) => {
                const isSelected = preferences.finishDensity === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect('finishDensity', opt.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                        : 'bg-[#FBF9F4] text-[#10110F] border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold">{opt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#A8B5A0]" />}
                    </div>
                    <p className={`text-[10.5px] ${isSelected ? 'text-[#DCE1D8]' : 'text-[#6B7068]'}`}>
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Minimal or Groomed-Up Look */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
              5. Styling &amp; Hair Orientation
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BROW_EXPLORER_CRITERIA.stylingLook.map((opt) => {
                const isSelected = preferences.stylingLook === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect('stylingLook', opt.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                        : 'bg-[#FBF9F4] text-[#10110F] border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold">{opt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#A8B5A0]" />}
                    </div>
                    <p className={`text-[10.5px] ${isSelected ? 'text-[#DCE1D8]' : 'text-[#6B7068]'}`}>
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Visual Summary & Matching Styles (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Visual Summary Card */}
          <div className="bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-7 shadow-xs space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                YOUR BROW SPECIFICATION
              </span>
              <h4 className="font-serif text-2xl text-[#10110F]">
                Selected Preference Blueprint
              </h4>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between text-xs">
                <span className="text-[#6B7068]">Appearance:</span>
                <strong className="text-[#10110F] capitalize">{preferences.appearance}</strong>
              </div>
              <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between text-xs">
                <span className="text-[#6B7068]">Arch Structure:</span>
                <strong className="text-[#10110F] capitalize">{preferences.archStructure} Arch</strong>
              </div>
              <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between text-xs">
                <span className="text-[#6B7068]">Horizontal Line:</span>
                <strong className="text-[#10110F] capitalize">{preferences.shapeCurvature}</strong>
              </div>
              <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between text-xs">
                <span className="text-[#6B7068]">Finish &amp; Density:</span>
                <strong className="text-[#10110F] capitalize">{preferences.finishDensity} Density</strong>
              </div>
              <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between text-xs">
                <span className="text-[#6B7068]">Hair Direction:</span>
                <strong className="text-[#263D2B] capitalize">{preferences.stylingLook}</strong>
              </div>
            </div>
          </div>

          {/* Matching Gallery Styles */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#10110F] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#263D2B]" />
                <span>Matching Gallery Looks</span>
              </span>
              <span className="text-[11px] font-mono text-[#263D2B] font-semibold">
                Top 3 Matches
              </span>
            </div>

            {matchingStyles.map(({ style, matchPct }, index) => {
              const isTop = index === 0;
              return (
                <div
                  key={style.id}
                  className={`p-4 rounded-3xl border transition-all ${
                    isTop
                      ? 'bg-white border-[#263D2B] shadow-md ring-1 ring-[#263D2B]'
                      : 'bg-white border-[#DCE1D8] shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold ${
                          isTop ? 'bg-[#263D2B] text-white' : 'bg-[#F7F4ED] text-[#263D2B] border border-[#DCE1D8]'
                        }`}>
                          {matchPct}% Match
                        </span>
                        {isTop && (
                          <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#263D2B]">
                            Recommended
                          </span>
                        )}
                      </div>
                      <h5 className="font-serif text-lg text-[#10110F]">
                        {style.name}
                      </h5>
                      <p className="text-[11px] text-[#263D2B] italic line-clamp-1">
                        "{style.tagline}"
                      </p>
                    </div>

                    <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#DCE1D8] flex-shrink-0 bg-[#10110F]">
                      <img src={style.image} alt={style.name} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <p className="text-xs text-[#6B7068] line-clamp-2 leading-relaxed mb-3">
                    {style.description}
                  </p>

                  <div className="pt-2 border-t border-[#DCE1D8]/60 flex items-center justify-between text-xs">
                    <span className="text-[10.5px] text-[#465640] font-mono">
                      Category: {style.category.toUpperCase()}
                    </span>
                    <a
                      href="#brow-gallery"
                      className="text-[#263D2B] font-bold hover:text-[#10110F] flex items-center gap-1 cursor-pointer"
                    >
                      <span>View in Gallery</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </section>
  );
}
