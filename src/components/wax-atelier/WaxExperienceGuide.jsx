import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  ChevronDown, 
  ShieldCheck, 
  RotateCcw, 
  Heart, 
  CheckCircle2, 
  Droplets,
  HelpCircle,
  Clock,
  Layers,
  Award,
  Feather,
  AlertCircle
} from 'lucide-react';
import { 
  WAX_EXPERIENCE_STEPS, 
  WAX_PREP_GUIDELINES, 
  WAX_AFTERCARE_CARDS, 
  WAX_CHECKLIST_DATA, 
  WAX_FAQS 
} from './WaxConstants';

export default function WaxExperienceGuide() {
  // Checklist interactive state
  const [checkedItems, setCheckedItems] = useState({});
  // FAQ expandable state
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const resetChecklist = () => {
    setCheckedItems({});
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((checkedCount / WAX_CHECKLIST_DATA.length) * 100);

  return (
    <div className="space-y-20 sm:space-y-28 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
      
      {/* =========================================================================
          SECTION 1: SKIN PREPARATION GUIDE (5 ESSENTIAL PROTOCOLS)
      ========================================================================= */}
      <section id="wax-prep" className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B]" />
            <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              ESSENTIAL PREPARATION
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
            Skin Preparation Guide
          </h2>

          <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
            Proper preparation ensures a comfortable session, clean hair extraction from the root, and silky, bump-free results.
          </p>
        </div>

        {/* 5 Preparation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {WAX_PREP_GUIDELINES.map((prep, idx) => (
            <div
              key={prep.id}
              className={`bg-white rounded-3xl p-7 border border-[#DCE1D8] shadow-xs hover:border-[#263D2B]/40 transition-all flex flex-col justify-between ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-wider text-[#263D2B]">
                    {prep.badge}
                  </span>
                  <span className="font-serif text-xl font-bold text-[#A8B5A0]">0{idx + 1}</span>
                </div>

                <h3 className="font-serif text-xl font-semibold text-[#10110F]">
                  {prep.title}
                </h3>

                <p className="text-xs font-medium text-[#263D2B]">
                  {prep.summary}
                </p>

                <p className="text-xs text-[#465640] leading-relaxed pt-2 border-t border-[#DCE1D8]/60">
                  {prep.details}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#DCE1D8]/40 flex items-center gap-2 text-[11px] text-[#6B7068]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#263D2B]" />
                <span>Pre-Treatment Recommendation</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: WAXING EXPERIENCE (6-STEP VISUAL JOURNEY)
      ========================================================================= */}
      <section id="wax-experience" className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
            <Droplets className="w-3.5 h-3.5 text-[#263D2B]" />
            <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              THE 6-STEP ATELIER METHOD
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
            The Waxing Experience
          </h2>

          <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
            From skin sensitivity analysis to immediate botanical recovery, discover the meticulous steps behind our painless, hygienic waxing rituals.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WAX_EXPERIENCE_STEPS.map((stepItem, idx) => (
            <div
              key={stepItem.step}
              className="group bg-white rounded-3xl p-7 border border-[#DCE1D8] hover:border-[#263D2B]/50 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#263D2B]/10 group-hover:bg-[#263D2B] transition-colors duration-300" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl sm:text-4xl text-[#263D2B]/30 group-hover:text-[#263D2B] transition-colors font-bold">
                    {stepItem.step}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#465640] px-2.5 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8]">
                    Phase {idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#10110F] group-hover:text-[#263D2B] transition-colors">
                    {stepItem.title}
                  </h3>
                  <p className="text-xs font-medium text-[#263D2B] mt-1">
                    {stepItem.summary}
                  </p>
                </div>

                <p className="text-xs text-[#465640] leading-relaxed pt-2 border-t border-[#DCE1D8]/60">
                  {stepItem.details}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#DCE1D8]/40 flex items-center gap-2 text-[11px] text-[#6B7068]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B]" />
                <span>Zero Double-Dipping Guaranteed</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: WAXING AFTERCARE (6 CARDS)
      ========================================================================= */}
      <section id="wax-aftercare" className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
            <Feather className="w-3.5 h-3.5 text-[#263D2B]" />
            <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              LONG-LASTING SILKINESS
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
            Waxing Aftercare &amp; Recovery
          </h2>

          <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
            Protect your freshly treated skin barrier, prevent ingrown hairs, and maintain flawless smoothness for weeks between salon visits.
          </p>
        </div>

        {/* 6 Aftercare Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {WAX_AFTERCARE_CARDS.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-3xl p-7 border border-[#DCE1D8] shadow-xs hover:border-[#263D2B]/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-wider text-[#263D2B]">
                    {card.badge}
                  </span>
                  <Heart className="w-4 h-4 text-[#A8B5A0]" />
                </div>

                <h3 className="font-serif text-xl font-semibold text-[#10110F]">
                  {card.title}
                </h3>

                <ul className="space-y-2.5 pt-2">
                  {card.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-xs text-[#465640] leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B] mt-1.5 flex-shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#DCE1D8]/60 text-[11px] text-[#6B7068] italic">
                *Adhere to these guidelines for 48 hours post-treatment.
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: INTERACTIVE AFTERCARE CHECKLIST
      ========================================================================= */}
      <section id="wax-checklist" className="bg-[#F7F4ED] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#DCE1D8] space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#DCE1D8]">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white border border-[#DCE1D8] text-[10.5px] font-bold text-[#263D2B] uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Interactive Adherence Tool</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-semibold">
              Interactive Waxing Care Checklist
            </h3>
            <p className="text-xs sm:text-sm text-[#465640] leading-relaxed">
              Check off your preparation and aftercare steps to ensure the smoothest, most comfortable experience before and after your salon appointment.
            </p>
          </div>

          {/* Progress Tracker & Reset */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#DCE1D8] shadow-xs flex flex-col gap-3 min-w-[240px]">
            <div className="flex items-center justify-between text-xs font-bold text-[#10110F]">
              <span>Checklist Progress</span>
              <span className="text-[#263D2B]">{checkedCount} of {WAX_CHECKLIST_DATA.length} Complete ({progressPercent}%)</span>
            </div>

            <div className="w-full bg-[#F7F4ED] h-2 rounded-full overflow-hidden border border-[#DCE1D8]">
              <div 
                className="bg-[#263D2B] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-[#6B7068]">
                {progressPercent === 100 ? '✨ Waxing Routine Perfected!' : 'Click items to mark complete'}
              </span>
              {checkedCount > 0 && (
                <button
                  type="button"
                  onClick={resetChecklist}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#263D2B] hover:text-[#10110F] transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Checkbox Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WAX_CHECKLIST_DATA.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-4 select-none ${
                  isChecked 
                    ? 'bg-white border-[#263D2B] shadow-sm' 
                    : 'bg-white/70 hover:bg-white border-[#DCE1D8]'
                }`}
              >
                <div 
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200 ${
                    isChecked
                      ? 'bg-[#263D2B] border-[#263D2B] text-white'
                      : 'border-[#A8B5A0] bg-white text-transparent'
                  }`}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] px-2 py-0.5 rounded-md bg-[#F7F4ED]">
                      {item.category}
                    </span>
                  </div>
                  <p className={`text-xs sm:text-sm font-medium transition-colors ${
                    isChecked ? 'text-[#10110F] line-through opacity-80' : 'text-[#10110F]'
                  }`}>
                    {item.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: WAXING FAQS (7 ACCORDIONS)
      ========================================================================= */}
      <section id="wax-faqs" className="space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#263D2B]" />
            <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              FREQUENT QUESTIONS
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
            Waxing Questions Answered
          </h2>

          <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
            Honest answers to help you navigate hair growth cycles, sensitive skin precautions, and home aftercare.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto space-y-3.5">
          {WAX_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#DCE1D8] overflow-hidden transition-all duration-200 shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-[#F7F4ED]/50 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg font-medium text-[#10110F]">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full border border-[#DCE1D8] flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#263D2B] text-white border-[#263D2B]' : 'bg-white text-[#465640]'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#465640] leading-relaxed border-t border-[#DCE1D8]/60 bg-white animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Informational Guidance Footer Box */}
        <div className="p-6 rounded-2xl bg-white border border-[#DCE1D8] text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#263D2B]">
            <ShieldCheck className="w-4 h-4" />
            <span>Certified Sanitary Waxing Environment</span>
          </div>
          <p className="text-[11.5px] text-[#465640] leading-relaxed">
            Our studio strictly observes a zero double-dipping policy with hospital-grade sanitization between appointments, ensuring the purest, safest waxing experience in Ottawa.
          </p>
        </div>
      </section>

    </div>
  );
}
