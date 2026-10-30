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
  Heart
} from 'lucide-react';
import { 
  MAKEUP_EXPLORER_CRITERIA, 
  MAKEUP_INSPIRATION_GALLERY 
} from './MakeupConstants';

export default function MakeupStyleExplorer({ onApplyToConsultation }) {
  const [preferences, setPreferences] = useState({
    finish: 'satin',
    eyeMakeup: 'soft-shimmer',
    lipStyle: 'nude',
    overallLook: 'elegant'
  });

  const handleSelect = (category, value) => {
    setPreferences(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleReset = () => {
    setPreferences({
      finish: 'satin',
      eyeMakeup: 'soft-shimmer',
      lipStyle: 'nude',
      overallLook: 'elegant'
    });
  };

  // Find matching inspiration look
  const bestMatchingLook = useMemo(() => {
    if (preferences.overallLook === 'traditional') {
      return MAKEUP_INSPIRATION_GALLERY.find(i => i.id === 'traditional-makeup') || MAKEUP_INSPIRATION_GALLERY[8];
    }
    if (preferences.overallLook === 'glamorous') {
      return preferences.eyeMakeup === 'smokey' 
        ? MAKEUP_INSPIRATION_GALLERY.find(i => i.id === 'evening-glam')
        : MAKEUP_INSPIRATION_GALLERY.find(i => i.id === 'full-glam-makeup');
    }
    if (preferences.overallLook === 'minimal') {
      return preferences.finish === 'dewy'
        ? MAKEUP_INSPIRATION_GALLERY.find(i => i.id === 'dewy-makeup')
        : MAKEUP_INSPIRATION_GALLERY.find(i => i.id === 'natural-makeup');
    }
    if (preferences.overallLook === 'modern') {
      return MAKEUP_INSPIRATION_GALLERY.find(i => i.id === 'editorial-makeup') || MAKEUP_INSPIRATION_GALLERY[11];
    }
    // Default Elegant
    return MAKEUP_INSPIRATION_GALLERY.find(i => i.id === 'soft-glam-makeup') || MAKEUP_INSPIRATION_GALLERY[1];
  }, [preferences]);

  const selectedFinishObj = MAKEUP_EXPLORER_CRITERIA.finishes.find(f => f.id === preferences.finish);
  const selectedEyeObj = MAKEUP_EXPLORER_CRITERIA.eyeMakeups.find(e => e.id === preferences.eyeMakeup);
  const selectedLipObj = MAKEUP_EXPLORER_CRITERIA.lipStyles.find(l => l.id === preferences.lipStyle);
  const selectedOverallObj = MAKEUP_EXPLORER_CRITERIA.overallLooks.find(o => o.id === preferences.overallLook);

  return (
    <section id="makeup-explorer" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            INTERACTIVE PREFERENCE EXPLORER
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          Makeup Style Explorer
        </h2>

        <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
          Design your custom aesthetic blueprint. Mix and match your ideal skin finish, eye artistry, lip hue, and overall mood to discover your personalized studio direction.
        </p>

        {/* Technical Transparency Disclaimer */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-[11px] text-[#465640] max-w-xl text-left sm:text-center mt-2">
          <Info className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
          <span>
            <strong>Preference Guide:</strong> This is an interactive style explorer tool to map your aesthetic desires. It is not an AI virtual try-on or facial simulation.
          </span>
        </div>
      </div>

      {/* Main Grid: Controls Left (7 cols), Visual Summary Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: 4 Selection Categories */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-8 shadow-xs space-y-8">
          
          <div className="flex items-center justify-between pb-4 border-b border-[#DCE1D8]">
            <h3 className="font-serif text-xl sm:text-2xl text-[#10110F]">
              Curate Your Makeup Elements
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

          {/* 1. Preferred Finish */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                1. Preferred Skin Finish
              </label>
              <span className="text-[11px] font-mono text-[#263D2B] font-semibold">{selectedFinishObj?.name}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {MAKEUP_EXPLORER_CRITERIA.finishes.map((f) => {
                const isSelected = preferences.finish === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => handleSelect('finish', f.id)}
                    className={`p-3 rounded-2xl border text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                        : 'bg-[#FBF9F4] text-[#10110F] border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                    }`}
                  >
                    <div className="text-xs font-bold mb-0.5">{f.name}</div>
                    <p className={`text-[10px] line-clamp-2 ${isSelected ? 'text-[#DCE1D8]' : 'text-[#6B7068]'}`}>
                      {f.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Eye Makeup */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                2. Eye Makeup Architecture
              </label>
              <span className="text-[11px] font-mono text-[#263D2B] font-semibold">{selectedEyeObj?.name}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {MAKEUP_EXPLORER_CRITERIA.eyeMakeups.map((e) => {
                const isSelected = preferences.eyeMakeup === e.id;
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => handleSelect('eyeMakeup', e.id)}
                    className={`p-3 rounded-2xl border text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                        : 'bg-[#FBF9F4] text-[#10110F] border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                    }`}
                  >
                    <div className="text-xs font-bold mb-0.5">{e.name}</div>
                    <p className={`text-[10px] line-clamp-2 ${isSelected ? 'text-[#DCE1D8]' : 'text-[#6B7068]'}`}>
                      {e.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Lip Style */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                3. Lip Color &amp; Style
              </label>
              <span className="text-[11px] font-mono text-[#263D2B] font-semibold">{selectedLipObj?.name}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {MAKEUP_EXPLORER_CRITERIA.lipStyles.map((l) => {
                const isSelected = preferences.lipStyle === l.id;
                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => handleSelect('lipStyle', l.id)}
                    className={`p-3 rounded-2xl border text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                        : 'bg-[#FBF9F4] text-[#10110F] border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                    }`}
                  >
                    <div className="text-xs font-bold mb-0.5">{l.name}</div>
                    <p className={`text-[10px] line-clamp-2 ${isSelected ? 'text-[#DCE1D8]' : 'text-[#6B7068]'}`}>
                      {l.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Overall Look */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                4. Overall Aesthetic Mood
              </label>
              <span className="text-[11px] font-mono text-[#263D2B] font-semibold">{selectedOverallObj?.name}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {MAKEUP_EXPLORER_CRITERIA.overallLooks.map((o) => {
                const isSelected = preferences.overallLook === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => handleSelect('overallLook', o.id)}
                    className={`p-3 rounded-2xl border text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                        : 'bg-[#FBF9F4] text-[#10110F] border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                    }`}
                  >
                    <div className="text-xs font-bold mb-0.5">{o.name}</div>
                    <p className={`text-[10px] line-clamp-2 ${isSelected ? 'text-[#DCE1D8]' : 'text-[#6B7068]'}`}>
                      {o.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Visual Summary & Matching Look (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-7 shadow-xs space-y-5">
            
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                YOUR SIGNATURE BLUEPRINT
              </span>
              <h3 className="font-serif text-2xl text-[#10110F]">
                Selected Preference Summary
              </h3>
            </div>

            {/* 4 Selected Attribute Badges */}
            <div className="space-y-2.5">
              <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between text-xs">
                <span className="text-[#6B7068]">Skin Finish:</span>
                <strong className="text-[#10110F] font-semibold">{selectedFinishObj?.name} Finish</strong>
              </div>

              <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between text-xs">
                <span className="text-[#6B7068]">Eye Artistry:</span>
                <strong className="text-[#10110F] font-semibold">{selectedEyeObj?.name} Eye Design</strong>
              </div>

              <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between text-xs">
                <span className="text-[#6B7068]">Lip Style:</span>
                <strong className="text-[#10110F] font-semibold">{selectedLipObj?.name} Lip Palette</strong>
              </div>

              <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between text-xs">
                <span className="text-[#6B7068]">Overall Mood:</span>
                <strong className="text-[#263D2B] font-semibold">{selectedOverallObj?.name} Vibe</strong>
              </div>
            </div>

            {/* Matching Inspiration Image Showcase */}
            {bestMatchingLook && (
              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#10110F] block">
                  Best Matching Gallery Inspiration:
                </span>

                <div className="relative rounded-2xl overflow-hidden border border-[#DCE1D8] aspect-[16/10] bg-[#10110F]">
                  <img
                    src={bestMatchingLook.image}
                    alt={bestMatchingLook.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#A8B5A0]">
                      Inspiration Reference
                    </span>
                    <h4 className="font-serif text-lg text-white">
                      {bestMatchingLook.name}
                    </h4>
                    <p className="text-[11px] text-white/80 line-clamp-1 italic">
                      "{bestMatchingLook.tagline}"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Send to Consultation Button */}
            <div className="pt-2">
              <a
                href="#makeup-consultation"
                onClick={() => {
                  if (onApplyToConsultation) {
                    onApplyToConsultation({
                      finish: selectedFinishObj?.name,
                      eyeMakeup: selectedEyeObj?.name,
                      lipStyle: selectedLipObj?.name,
                      overallLook: selectedOverallObj?.name
                    });
                  }
                }}
                className="global-button w-full !py-3.5 !px-6 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Use Preferences in Consultation ↓</span>
              </a>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
