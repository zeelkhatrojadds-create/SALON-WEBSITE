import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  SlidersHorizontal, 
  Eye, 
  Check, 
  Info, 
  ChevronRight,
  ShieldCheck,
  Compass,
  ArrowRight
} from 'lucide-react';
import { 
  LASH_STYLES, 
  LASH_STYLE_FINDER_QUESTIONS 
} from './LashConstants';

export default function LashStyleFinder({ onSelectStyleForDetail }) {
  const [answers, setAnswers] = useState({
    appearance: 'natural',
    volume: 'soft',
    finish: 'wispy',
    occasion: 'everyday'
  });

  const handleOptionSelect = (questionId, optionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleReset = () => {
    setAnswers({
      appearance: 'natural',
      volume: 'soft',
      finish: 'wispy',
      occasion: 'everyday'
    });
  };

  // Compute match rankings
  const matchedStyles = useMemo(() => {
    const scored = LASH_STYLES.map((style) => {
      let score = 50;

      // 1. Appearance intensity matching
      if (answers.appearance === 'natural') {
        if (style.category === 'natural') score += 25;
        if (style.id === 'classic-lashes' || style.id === 'natural-lash-look' || style.id === 'open-eye') score += 15;
      } else if (answers.appearance === 'soft-glam') {
        if (style.category === 'soft-glam' || style.category === 'wispy') score += 25;
        if (style.id === 'hybrid-lashes' || style.id === 'doll-eye' || style.id === 'soft-glam-lash-look') score += 15;
      } else if (answers.appearance === 'dramatic') {
        if (style.category === 'dramatic' || style.category === 'volume') score += 25;
        if (style.id === 'mega-volume-lashes' || style.id === 'cat-eye' || style.id === 'anime-inspired-look') score += 15;
      }

      // 2. Volume & Density matching
      if (answers.volume === 'soft') {
        if (style.recommendedFullness.toLowerCase().includes('natural') || style.recommendedFullness.toLowerCase().includes('light')) score += 20;
      } else if (answers.volume === 'medium') {
        if (style.recommendedFullness.toLowerCase().includes('medium') || style.recommendedFullness.toLowerCase().includes('light to full')) score += 20;
      } else if (answers.volume === 'full') {
        if (style.recommendedFullness.toLowerCase().includes('full') || style.recommendedFullness.toLowerCase().includes('mega')) score += 20;
      }

      // 3. Texture & Finish matching
      if (answers.finish === 'wispy' && (style.id === 'wispy-lash-look' || style.id === 'wet-look' || style.id === 'hybrid-lashes')) {
        score += 20;
      } else if (answers.finish === 'defined' && (style.id === 'classic-lashes' || style.id === 'natural-lash-look' || style.id === 'open-eye')) {
        score += 20;
      } else if (answers.finish === 'winged' && style.id === 'cat-eye') {
        score += 25;
      } else if (answers.finish === 'centered' && (style.id === 'doll-eye' || style.id === 'open-eye')) {
        score += 25;
      }

      // 4. Occasion matching
      if (answers.occasion === 'everyday') {
        if (style.bestFor.some(b => b.toLowerCase().includes('everyday') || b.toLowerCase().includes('corporate') || b.toLowerCase().includes('minimalist'))) score += 15;
      } else if (answers.occasion === 'evening') {
        if (style.bestFor.some(b => b.toLowerCase().includes('day-to-night') || b.toLowerCase().includes('social') || b.toLowerCase().includes('texture'))) score += 15;
      } else if (answers.occasion === 'milestone') {
        if (style.bestFor.some(b => b.toLowerCase().includes('bridal') || b.toLowerCase().includes('wedding') || b.toLowerCase().includes('editorial') || b.toLowerCase().includes('galas'))) score += 15;
      }

      const matchPct = Math.min(99, Math.max(78, score));
      return { style, matchPct };
    });

    scored.sort((a, b) => b.matchPct - a.matchPct);
    return scored.slice(0, 3);
  }, [answers]);

  return (
    <section id="lash-style-finder" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
          <Compass className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            INTERACTIVE STYLE DISCOVERY
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          Lash Style Finder
        </h2>

        <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
          Not sure which lash silhouette suits your eye contour and lifestyle? Select your aesthetic preferences below to reveal your ideal studio match.
        </p>

        {/* Clear Disclaimer */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-[11px] text-[#465640] max-w-xl text-left sm:text-center mt-2">
          <Info className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
          <span>
            <strong>Style Inspiration Only:</strong> Match suggestions serve as visual guidance. Final lash curl, length, and fan weight are individually calibrated to your natural lash vitality during consultation.
          </span>
        </div>
      </div>

      {/* Main Grid: Questions Left (7 cols), Results Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Preference Questionnaire (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-8 shadow-xs space-y-8">
          
          <div className="flex items-center justify-between pb-4 border-b border-[#DCE1D8]">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#263D2B]" />
              <h3 className="font-serif text-xl sm:text-2xl text-[#10110F]">
                Define Your Aesthetic Criteria
              </h3>
            </div>
            
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#465640] hover:text-[#10110F] hover:bg-[#F7F4ED] border border-[#DCE1D8] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Selections</span>
            </button>
          </div>

          {/* 4 Questionnaire Sections */}
          <div className="space-y-6">
            {LASH_STYLE_FINDER_QUESTIONS.map((q) => (
              <div key={q.id} className="space-y-3">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                    {q.title}
                  </h4>
                  <p className="text-[11px] text-[#6B7068]">
                    {q.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {q.options.map((opt) => {
                    const isSelected = answers[q.id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleOptionSelect(q.id, opt.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-sm ring-1 ring-[#263D2B]'
                            : 'bg-[#FBF9F4] text-[#10110F] border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold">{opt.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#A8B5A0]" />}
                        </div>
                        <p className={`text-[10.5px] leading-snug line-clamp-2 ${isSelected ? 'text-[#DCE1D8]' : 'text-[#6B7068]'}`}>
                          {opt.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Live Matching Results (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#10110F] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#263D2B]" />
              <span>Recommended Atelier Matches</span>
            </span>
            <span className="text-[11px] font-mono text-[#263D2B] font-semibold">
              Top 3 Matches
            </span>
          </div>

          <div className="space-y-4">
            {matchedStyles.map(({ style, matchPct }, index) => {
              const isTopMatch = index === 0;
              return (
                <div
                  key={style.id}
                  className={`rounded-3xl border overflow-hidden p-5 transition-all duration-300 ${
                    isTopMatch
                      ? 'bg-white border-[#263D2B] shadow-md ring-1 ring-[#263D2B]'
                      : 'bg-white border-[#DCE1D8] shadow-xs hover:border-[#A8B5A0]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
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
                      <h4 className="font-serif text-xl text-[#10110F]">
                        {style.name}
                      </h4>
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

                  <div className="p-2.5 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-[11px] text-[#465640] mb-3">
                    <span className="font-bold text-[#10110F]">Why it fits: </span>
                    <span>Matches your {answers.appearance} aesthetic preference with {style.recommendedFullness}.</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#DCE1D8]/60 text-xs">
                    <span className="text-[11px] text-[#6B7068] font-mono">
                      Curl: {style.recommendedCurl}
                    </span>
                    <a
                      href="#lash-styles-gallery"
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

          {/* Reset Action */}
          <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-center space-y-2">
            <p className="text-xs text-[#465640]">
              Want to see recommendations for a different event or mood?
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-bold text-[#263D2B] hover:text-[#10110F] underline cursor-pointer"
            >
              Reset All Filters &amp; Try Again
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}
