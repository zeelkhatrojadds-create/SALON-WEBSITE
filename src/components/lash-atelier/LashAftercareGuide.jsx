import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Droplet, 
  Sparkles, 
  Moon, 
  RefreshCcw, 
  AlertTriangle, 
  Check, 
  CheckSquare2, 
  Square, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp,
  HeartHandshake,
  HelpCircle,
  Clock,
  EyeOff
} from 'lucide-react';
import { 
  LASH_AFTERCARE_CARDS, 
  LASH_CHECKLIST_DATA, 
  LASH_FAQS_DATA 
} from './LashConstants';

const ICON_MAP = {
  Droplet,
  Sparkles,
  ShieldCheck,
  Moon,
  RefreshCcw,
  AlertTriangle
};

export default function LashAftercareGuide() {
  // Interactive Checklist State
  const [checkedItems, setCheckedItems] = useState({
    'clean-gently': true,
    'avoid-rubbing': true,
    'brush-properly': false,
    'use-compatible-products': true,
    'follow-instructions': true
  });

  // FAQs Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleChecklist = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleResetChecklist = () => {
    setCheckedItems({
      'clean-gently': false,
      'avoid-rubbing': false,
      'brush-properly': false,
      'use-compatible-products': false,
      'follow-instructions': false
    });
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = LASH_CHECKLIST_DATA.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <section id="lash-aftercare-guide" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
      
      {/* 1. SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            LONGEVITY &amp; HYGIENE PRESERVATION
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          The Lash Aftercare Guide
        </h2>

        <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
          Proper home aftercare accounts for 50% of your extension retention and protects natural eyelash follicle vitality. Follow our certified director guidelines to enjoy effortless, fluttery lashes for weeks.
        </p>
      </div>

      {/* 2. DEDICATED VISUAL AFTERCARE CARDS (6 Key Areas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-16 sm:mb-20">
        {LASH_AFTERCARE_CARDS.map((card, idx) => {
          const IconComp = ICON_MAP[card.iconName] || ShieldCheck;
          const isWarningCard = card.id === 'when-to-seek-help';

          return (
            <div
              key={card.id}
              className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between space-y-5 transition-all duration-300 ${
                isWarningCard 
                  ? 'bg-[#FBF9F4] border-[#263D2B]/30 ring-1 ring-[#263D2B]/20 shadow-xs' 
                  : 'bg-white border-[#DCE1D8] shadow-xs hover:border-[#263D2B]/40 hover:shadow-md'
              }`}
            >
              <div className="space-y-4">
                
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-[#263D2B] text-white font-mono text-xs font-bold flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F7F4ED] text-[#263D2B] text-[10px] font-bold uppercase tracking-wider border border-[#DCE1D8]">
                      {card.badge}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-[#F7F4ED] text-[#263D2B] flex items-center justify-center">
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl sm:text-2xl text-[#10110F]">
                  {card.title}
                </h3>

                {/* Points List */}
                <ul className="space-y-2 text-xs text-[#465640]">
                  {card.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B] mt-1.5 flex-shrink-0" />
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Card Footer Badge */}
              <div className="pt-3 border-t border-[#DCE1D8]/60 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-[#263D2B] flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Approved Salon Care</span>
                </span>
                {isWarningCard && (
                  <span className="text-[#263D2B] font-mono font-bold">
                    Safety Notice
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. INTERACTIVE LASH CARE CHECKLIST */}
      <div className="mb-16 sm:mb-20 bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-10 shadow-xs">
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Checklist Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DCE1D8]">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#263D2B]">
                <CheckSquare2 className="w-4 h-4" />
                <span>Client Self-Checklist</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F]">
                Daily Lash Preservation Checklist
              </h3>
              <p className="text-xs text-[#6B7068]">
                Tap each habit to track your daily lash care routine and ensure prolonged retention.
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetChecklist}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#465640] hover:text-[#10110F] hover:bg-[#F7F4ED] border border-[#DCE1D8] transition-colors cursor-pointer self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Checklist</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[#10110F]">
                Habits Completed: <strong className="text-[#263D2B]">{completedCount} of {totalCount}</strong>
              </span>
              <span className="font-mono text-[#263D2B]">{progressPercent}% Adherence</span>
            </div>
            
            <div className="w-full h-2.5 rounded-full bg-[#DCE1D8] overflow-hidden">
              <div 
                className="h-full bg-[#263D2B] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {completedCount === totalCount && (
              <p className="text-[11px] text-[#263D2B] font-bold flex items-center gap-1 pt-1">
                <Check className="w-3.5 h-3.5 text-[#263D2B]" />
                <span>Pristine routine! Your lash extensions and natural follicles are in optimal condition.</span>
              </p>
            )}
          </div>

          {/* Interactive Checklist Items */}
          <div className="space-y-3">
            {LASH_CHECKLIST_DATA.map((item) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleChecklist(item.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3.5 cursor-pointer ${
                    isChecked
                      ? 'bg-[#F7F4ED]/60 border-[#263D2B]/40 text-[#10110F]'
                      : 'bg-white border-[#DCE1D8] hover:border-[#A8B5A0] text-[#10110F]'
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {isChecked ? (
                      <div className="w-5 h-5 rounded-lg bg-[#263D2B] text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-lg border-2 border-[#6B7068] bg-white" />
                    )}
                  </div>

                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs sm:text-sm font-medium ${isChecked ? 'line-through text-[#6B7068]' : 'text-[#10110F]'}`}>
                        {item.title}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#263D2B] block">
                      {item.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* 4. EXPANDABLE LASH FAQS ACCORDION (7 Questions) */}
      <div className="max-w-3xl mx-auto space-y-6">
        
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DCE1D8] text-[10px] font-bold uppercase tracking-widest text-[#263D2B]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>ACCURATE &amp; RESPONSIBLE GUIDANCE</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F]">
            Lash Atelier Frequently Asked Questions
          </h3>
          <p className="text-xs text-[#6B7068]">
            Honest answers regarding retention, cleaning, natural lash health, and medical safety.
          </p>
        </div>

        <div className="space-y-3">
          {LASH_FAQS_DATA.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#DCE1D8] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FBF9F4] transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg text-[#10110F] font-normal pr-2">
                    {faq.question}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-center flex-shrink-0 text-[#263D2B]">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#465640] leading-relaxed border-t border-[#DCE1D8]/50 pt-3.5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Responsible Guidance Footer Box */}
        <div className="p-5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs text-[#465640] leading-relaxed text-center sm:text-left flex flex-col sm:flex-row items-center gap-3">
          <HeartHandshake className="w-6 h-6 text-[#263D2B] flex-shrink-0" />
          <span>
            <strong>Health Note:</strong> GLAM GIRL BY JANKI provides certified aesthetic services and does not diagnose ophthalmic conditions. For unexplained eye redness, swelling, or irritation, discontinue product use and consult an eye-care medical physician.
          </span>
        </div>

      </div>

    </section>
  );
}
