import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  ChevronDown, 
  ShieldCheck, 
  Info, 
  Heart, 
  Layers, 
  Feather,
  Droplet,
  Clock,
  Sparkle,
  Check
} from 'lucide-react';
import { 
  BROW_DESIGN_EXPERIENCE_STEPS, 
  BROW_MAINTENANCE_SECTIONS, 
  BROW_CHECKLIST_ITEMS, 
  BROW_FAQS 
} from './BrowConstants';

export default function BrowExperienceGuide() {
  // Interactive checklist state (all unchecked by default, or partially checked)
  const [checkedItems, setCheckedItems] = useState({});
  // FAQ accordion state
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

  const totalChecklist = BROW_CHECKLIST_ITEMS.length;
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalChecklist) * 100);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-20 sm:space-y-28 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#DCE1D8]">

      {/* ============================================================ */}
      {/* 5. BROW DESIGN EXPERIENCE */}
      {/* ============================================================ */}
      <section id="brow-experience">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
            <Layers className="w-3.5 h-3.5 text-[#263D2B]" />
            <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              THE 6-STEP ATELIER PROTOCOL
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
            The Brow Design Experience
          </h2>

          <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
            From initial shape discovery to precision salon threading and post-care education, each step is tailored to honor your individual bone structure and natural hair growth patterns.
          </p>

          <p className="text-[11px] text-[#465640]/80 italic">
            * Note: Because each individual's brow bone anatomy and natural hair growth density are unique, brow shaping results are personalized and vary between clients.
          </p>
        </div>

        {/* Step-by-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BROW_DESIGN_EXPERIENCE_STEPS.map((stepItem, idx) => (
            <div
              key={stepItem.step}
              className="relative p-6 sm:p-7 rounded-3xl bg-white border border-[#DCE1D8] hover:border-[#263D2B]/50 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between group"
            >
              <div>
                {/* Step Number & Badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-serif text-2xl sm:text-3xl font-light text-[#263D2B]/40 group-hover:text-[#263D2B] transition-colors">
                    {stepItem.step}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#F7F4ED] text-[#263D2B] border border-[#DCE1D8]">
                    Phase {idx + 1}
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-medium text-[#10110F] mb-2 group-hover:text-[#263D2B] transition-colors">
                  {stepItem.title}
                </h3>

                <p className="text-xs font-medium text-[#263D2B] mb-3 leading-relaxed">
                  {stepItem.summary}
                </p>

                <p className="text-xs text-[#465640] leading-relaxed">
                  {stepItem.details}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#DCE1D8]/60 flex items-center justify-between text-[11px] text-[#465640]">
                <span>Artisan Touch</span>
                <Sparkle className="w-3.5 h-3.5 text-[#263D2B]" />
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ============================================================ */}
      {/* 6. BROW MAINTENANCE & AFTERCARE GUIDE */}
      {/* ============================================================ */}
      <section id="brow-maintenance">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
            <Feather className="w-3.5 h-3.5 text-[#263D2B]" />
            <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              ESSENTIAL AT-HOME AFTERCARE
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
            Brow Maintenance Guide
          </h2>

          <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
            Comprehensive care instructions to safeguard your skin barrier, maintain healthy hair follicles, and preserve your brow arch between visits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BROW_MAINTENANCE_SECTIONS.map((section) => (
            <div
              key={section.id}
              className="p-6 sm:p-7 rounded-3xl bg-[#F7F4ED] border border-[#DCE1D8] flex flex-col justify-between hover:border-[#263D2B]/40 transition-all duration-300"
            >
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-white text-[#263D2B] text-[10px] font-bold uppercase tracking-wider border border-[#DCE1D8] mb-3 shadow-xs">
                  {section.badge}
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-medium text-[#10110F] mb-4">
                  {section.title}
                </h3>

                <ul className="space-y-3">
                  {section.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-xs text-[#465640] leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B] mt-1.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#DCE1D8] flex items-center gap-2 text-[11px] text-[#263D2B] font-medium">
                <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Certified Esthetician Practice</span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ============================================================ */}
      {/* 7. INTERACTIVE BROW CARE CHECKLIST */}
      {/* ============================================================ */}
      <section id="brow-checklist" className="rounded-3xl bg-white border border-[#DCE1D8] p-6 sm:p-10 lg:p-12 shadow-xs">
        <div className="max-w-3xl mx-auto">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 text-center sm:text-left">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-widest text-[#263D2B] mb-2">
                <Check className="w-3.5 h-3.5" />
                <span>INTERACTIVE ROUTINE BUILDER</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                Daily Brow Care Checklist
              </h2>
              <p className="text-xs sm:text-sm text-[#465640] mt-1">
                Check off items as you build healthy daily and post-treatment brow grooming habits.
              </p>
            </div>

            <button
              onClick={resetChecklist}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#DCE1D8] text-xs text-[#465640] hover:text-[#10110F] hover:bg-[#F7F4ED] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Checklist</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-medium text-[#10110F]">
                Your Brow Wellness Progress: <span className="text-[#263D2B] font-bold">{completedCount} of {totalChecklist} completed</span>
              </span>
              <span className="font-semibold text-[#263D2B]">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white overflow-hidden border border-[#DCE1D8]/60">
              <div 
                className="h-full bg-[#263D2B] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-3">
            {BROW_CHECKLIST_ITEMS.map((item) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`flex items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border transition-all duration-200 cursor-pointer select-none ${
                    isChecked 
                      ? 'bg-[#F7F4ED]/80 border-[#263D2B]' 
                      : 'bg-white border-[#DCE1D8] hover:border-[#263D2B]/40'
                  }`}
                  role="checkbox"
                  aria-checked={isChecked}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      toggleCheck(item.id);
                    }
                  }}
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div 
                      className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-colors mt-0.5 sm:mt-0 ${
                        isChecked 
                          ? 'bg-[#263D2B] text-white' 
                          : 'border border-[#DCE1D8] bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <p className={`text-xs sm:text-sm ${isChecked ? 'line-through text-[#465640]/70' : 'text-[#10110F] font-medium'}`}>
                        {item.title}
                      </p>
                      <span className="text-[10px] uppercase font-bold text-[#465640]/70 tracking-wider">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full flex-shrink-0 ${
                    isChecked 
                      ? 'bg-[#263D2B] text-white' 
                      : 'bg-[#F7F4ED] text-[#465640]'
                  }`}>
                    {isChecked ? 'Completed' : 'Pending'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Completion Celebration Message */}
          {completedCount === totalChecklist && (
            <div className="mt-6 p-4 rounded-2xl bg-[#263D2B] text-white flex items-center gap-3 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-[#A8B5A0] flex-shrink-0" />
              <div className="text-xs">
                <span className="font-bold">Outstanding Commitment!</span> You've completed all brow care practices. Maintaining this mindful routine will keep your brow arches defined and healthy.
              </div>
            </div>
          )}

        </div>
      </section>


      {/* ============================================================ */}
      {/* 8. BROW FAQS */}
      {/* ============================================================ */}
      <section id="brow-faqs" className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
            <Info className="w-3.5 h-3.5 text-[#263D2B]" />
            <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              EXPERT CONSULTATION KNOWLEDGE
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#10110F] font-normal tracking-tight">
            Frequently Asked Brow Questions
          </h2>

          <p className="text-xs sm:text-sm text-[#465640] max-w-xl mx-auto leading-relaxed">
            Clear, transparent answers regarding brow shaping, organic threading, lamination, and aftercare. We encourage a direct consultation for sensitive skin or individual suitability.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {BROW_FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white border border-[#DCE1D8] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-[#F7F4ED]/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-medium text-[#10110F]">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-[#F7F4ED] text-[#263D2B] transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 bg-[#263D2B] text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#465640] leading-relaxed border-t border-[#DCE1D8]/60 pt-4 bg-[#F7F4ED]/20">
                    <p>{faq.answer}</p>
                    <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#263D2B] font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Certified Esthetics Protocol by Janki Khatroja</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sensitivities Note */}
        <div className="mt-8 p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-center text-xs text-[#465640]">
          <strong>Skin Sensitivity Notice:</strong> If you are using prescription retinoids, Accutane, or chemical peels, please notify your artist before any brow hair removal. A patch test is always available.
        </div>
      </section>

    </div>
  );
}
