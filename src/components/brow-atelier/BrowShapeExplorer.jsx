import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  SlidersHorizontal, 
  Check, 
  Info, 
  ArrowRight,
  ChevronRight,
  Eye,
  Sliders
} from 'lucide-react';
import { 
  BROW_EXPLORER_CRITERIA, 
  BROW_INSPIRATION_GALLERY 
} from './BrowConstants';

export default function BrowShapeExplorer() {
  const [preferences, setPreferences] = useState({
    appearance: 'natural',
    archStructure: 'soft',
    shapeSilhouette: 'arched',
    finishIntensity: 'light',
    groomingStyle: 'minimal'
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
      shapeSilhouette: 'arched',
      finishIntensity: 'light',
      groomingStyle: 'minimal'
    });
  };

  // Compute matched gallery styles with scoring algorithm
  const matchedStyles = useMemo(() => {
    const scored = BROW_INSPIRATION_GALLERY.map((style) => {
      let score = 50;

      // 1. Appearance matching
      if (preferences.appearance === 'natural') {
        if (style.category === 'natural' || style.category === 'soft') score += 20;
        if (style.id === 'natural-brows' || style.id === 'minimal-everyday-brows') score += 15;
      } else {
        if (style.category === 'defined' || style.category === 'bold') score += 20;
        if (style.id === 'bold-defined-brows' || style.id === 'arched-brows') score += 15;
      }

      // 2. Arch Structure matching
      if (preferences.archStructure === 'soft') {
        if (style.id === 'soft-angled-brows' || style.id === 'soft-defined-brows' || style.id === 'classic-brows') score += 20;
      } else {
        if (style.id === 'arched-brows' || style.id === 'bold-defined-brows') score += 20;
      }

      // 3. Shape Silhouette matching
      if (preferences.shapeSilhouette === 'straight') {
        if (style.id === 'straight-brows' || style.id === 'natural-brows') score += 25;
      } else {
        if (style.id === 'arched-brows' || style.id === 'soft-angled-brows' || style.id === 'classic-brows') score += 25;
      }

      // 4. Finish Intensity matching
      if (preferences.finishIntensity === 'light') {
        if (style.category === 'feathered' || style.category === 'natural') score += 20;
      } else {
        if (style.category === 'bold' || style.category === 'defined' || style.category === 'laminated') score += 20;
      }

      // 5. Grooming Style matching
      if (preferences.groomingStyle === 'minimal') {
        if (style.id === 'minimal-everyday-brows' || style.id === 'natural-brows' || style.id === 'classic-brows') score += 20;
      } else {
        if (style.id === 'fluffy-brows' || style.id === 'brushed-up-brows' || style.id === 'laminated-brow-inspiration') score += 25;
      }

      const matchPct = Math.min(99, Math.max(76, score));
      return { style, matchPct };
    });

    scored.sort((a, b) => b.matchPct - a.matchPct);
    return scored.slice(0, 3);
  }, [preferences]);

  const selectedAppearanceObj = BROW_EXPLORER_CRITERIA.appearance.find(a => a.id === preferences.appearance);
  const selectedArchObj = BROW_EXPLORER_CRITERIA.archStructure.find(a => a.id === preferences.archStructure);
  const selectedShapeObj = BROW_EXPLORER_CRITERIA.shapeSilhouette.find(s => s.id === preferences.shapeSilhouette);
  const selectedFinishObj = BROW_EXPLORER_CRITERIA.finishIntensity.find(f => f.id === preferences.finishIntensity);
  const selectedGroomingObj = BROW_EXPLORER_CRITERIA.groomingStyle.find(g => g.id === preferences.groomingStyle);

  return (
    <section id="brow-explorer" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
          <Sliders className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            INTERACTIVE SHAPE ARCHITECT
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          Interactive Brow Shape Explorer
        </h2>

        <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
          Discover which brow geometry resonates with your personal style. Select your structural preferences below to uncover your ideal matching gallery silhouettes.
        </p>

        {/* Technical Guidance Disclaimer */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-[11px] text-[#465640] max-w-xl text-left sm:text-center mt-2">
          <Info className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
          <span>
            <strong>Preference Guide:</strong> This discovery tool explores styling preferences. It does not medically diagnose facial anatomy or guarantee an identical cosmetic outcome.
          </span>
        </div>
      </div>

      {/* Main Grid: Controls Left (7 cols), Live Matches Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: 5 Criteria Selectors (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-8 shadow-xs space-y-8">
          
          <div className="flex items-center justify-between pb-4 border-b border-[#DCE1D8]">
            <h3 className="font-serif text-xl sm:text-2xl text-[#10110F]">
              Select Your Preferred Brow Attributes
            </h3>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#465640] hover:text-[#10110F] hover:bg-[#F7F4ED] border border-[#DCE1D8] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Choices</span>
            </button>
          </div>

          {/* 1. Natural vs Defined Appearance */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                1. Overall Appearance
              </label>
              <span className="text-[11px] font-mono text-[#263D2B] font-semibold">{selectedAppearanceObj?.name}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BROW_EXPLORER_CRITERIA.appearance.map((opt) => {
                const isSelected = preferences.appearance === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect('appearance', opt.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                        : 'bg-[#FBF9F4] text-[#10110F] border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">{opt.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#A8B5A0]" />}
                    </div>
                    <p className={`text-[10.5px] leading-snug ${isSelected ? 'text-[#DCE1D8]' : 'text-[#6B7068]'}`}>
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Soft vs Structured Arch */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                2. Arch Structure
              </label>
              <span className="text-[11px] font-mono text-[#263D2B] font-semibold">{selectedArchObj?.name}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BROW_EXPLORER_CRITERIA.archStructure.map((opt) => {
                const isSelected = preferences.archStructure === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect('archStructure', opt.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                        : 'bg-[#FBF9F4] text-[#10110F] border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">{opt.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#A8B5A0]" />}
                    </div>
                    <p className={`text-[10.5px] leading-snug ${isSelected ? 'text-[#DCE1D8]' : 'text-[#6B7068]'}`}>
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Straight vs Arched Shape */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                3. Shape Silhouette
              </label>
              <span className="text-[11px] font-mono text-[#263D2B] font-semibold">{selectedShapeObj?.name}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BROW_EXPLORER_CRITERIA.shapeSilhouette.map((opt) => {
                const isSelected = preferences.shapeSilhouette === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect('shapeSilhouette', opt.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                        : 'bg-[#FBF9F4] text-[#10110F] border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">{opt.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#A8B5A0]" />}
                    </div>
                    <p className={`text-[10.5px] leading-snug ${isSelected ? 'text-[#DCE1D8]' : 'text-[#6B7068]'}`}>
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Light vs Bold Finish */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                4. Finish Intensity
              </label>
              <span className="text-[11px] font-mono text-[#263D2B] font-semibold">{selectedFinishObj?.name}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BROW_EXPLORER_CRITERIA.finishIntensity.map((opt) => {
                const isSelected = preferences.finishIntensity === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect('finishIntensity', opt.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                        : 'bg-[#FBF9F4] text-[#10110F] border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">{opt.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#A8B5A0]" />}
                    </div>
                    <p className={`text-[10.5px] leading-snug ${isSelected ? 'text-[#DCE1D8]' : 'text-[#6B7068]'}`}>
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Minimal vs Brushed-Up Grooming */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                5. Grooming Style
              </label>
              <span className="text-[11px] font-mono text-[#263D2B] font-semibold">{selectedGroomingObj?.name}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BROW_EXPLORER_CRITERIA.groomingStyle.map((opt) => {
                const isSelected = preferences.groomingStyle === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect('groomingStyle', opt.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                        : 'bg-[#FBF9F4] text-[#10110F] border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">{opt.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#A8B5A0]" />}
                    </div>
                    <p className={`text-[10.5px] leading-snug ${isSelected ? 'text-[#DCE1D8]' : 'text-[#6B7068]'}`}>
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Live Preference Summary & Matching Gallery Results (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Live Preference Summary Box */}
          <div className="bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-7 shadow-xs space-y-4">
            <div className="space-y-1 pb-3 border-b border-[#DCE1D8]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                YOUR BROW SPECIFICATION
              </span>
              <h4 className="font-serif text-xl sm:text-2xl text-[#10110F]">
                Live Preference Summary
              </h4>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between">
                <span className="text-[#6B7068]">Appearance:</span>
                <strong className="text-[#10110F]">{selectedAppearanceObj?.name}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between">
                <span className="text-[#6B7068]">Arch:</span>
                <strong className="text-[#10110F]">{selectedArchObj?.name}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between">
                <span className="text-[#6B7068]">Silhouette:</span>
                <strong className="text-[#10110F]">{selectedShapeObj?.name}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between">
                <span className="text-[#6B7068]">Finish:</span>
                <strong className="text-[#10110F]">{selectedFinishObj?.name}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between">
                <span className="text-[#6B7068]">Grooming:</span>
                <strong className="text-[#263D2B]">{selectedGroomingObj?.name}</strong>
              </div>
            </div>
          </div>

          {/* Top Matching Gallery Results */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#10110F] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
                <span>Top Matching Gallery Styles</span>
              </span>
              <span className="text-[11px] font-mono text-[#263D2B] font-semibold">
                Top 3 Matches
              </span>
            </div>

            <div className="space-y-3">
              {matchedStyles.map(({ style, matchPct }, index) => {
                const isTopMatch = index === 0;
                return (
                  <div
                    key={style.id}
                    className={`rounded-3xl border overflow-hidden p-5 transition-all duration-300 ${
                      isTopMatch
                        ? 'bg-white border-[#263D2B] shadow-md ring-1 ring-[#263D2B]'
                        : 'bg-white border-[#DCE1D8] shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            isTopMatch ? 'bg-[#263D2B] text-white' : 'bg-[#F7F4ED] text-[#263D2B] border border-[#DCE1D8]'
                          }`}>
                            {matchPct}% Match
                          </span>
                          {isTopMatch && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B]">
                              Best Match
                            </span>
                          )}
                        </div>
                        <h5 className="font-serif text-lg text-[#10110F]">
                          {style.name}
                        </h5>
                        <p className="text-[11px] text-[#263D2B] font-medium italic">
                          "{style.tagline}"
                        </p>
                      </div>

                      <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[#DCE1D8] flex-shrink-0 bg-[#10110F]">
                        <img
                          src={style.image}
                          alt={style.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <p className="text-xs text-[#465640] line-clamp-2 leading-relaxed mb-3">
                      {style.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-[#DCE1D8]/60 text-xs">
                      <span className="text-[11px] text-[#6B7068] font-mono">
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

      </div>

    </section>
  );
}
