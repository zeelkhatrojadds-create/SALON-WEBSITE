import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Check, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  HeartHandshake, 
  Droplet, 
  Eye, 
  Brush, 
  Wand2, 
  Smile, 
  Moon, 
  AlertTriangle 
} from 'lucide-react';
import { 
  MAKEUP_EXPERIENCE_STEPS, 
  MAKEUP_PREPARATION_CARDS, 
  MAKEUP_AFTERCARE_CARDS, 
  MAKEUP_FAQS 
} from './MakeupConstants';

export default function MakeupExperienceGuide() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  return (
    <div className="space-y-20 sm:space-y-28">
      
      {/* 1. THE MAKEUP EXPERIENCE (6 STEPS) */}
      <section id="makeup-experience" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
            <Layers className="w-3.5 h-3.5 text-[#263D2B]" />
            <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              ATELIER SERVICE PROTOCOL
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
            The Makeup Experience
          </h2>

          <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
            From initial palette exploration to radiant mirror reveal, experience an intimate 6-stage transformation ritual designed around your natural facial architecture.
          </p>

          <p className="text-[11px] text-[#6B7068] italic">
            Note: Every face shape, eyelid symmetry, and skin undertone is distinct. Results are customized and will vary from client to client.
          </p>
        </div>

        {/* 6 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {MAKEUP_EXPERIENCE_STEPS.map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-[#263D2B]/40 transition-all duration-300 flex flex-col justify-between space-y-4 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[#263D2B]/40 group-hover:text-[#263D2B] transition-colors">
                  {item.step}
                </span>

                <div className="w-9 h-9 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-center text-[#263D2B] group-hover:bg-[#263D2B] group-hover:text-white transition-all duration-300">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-xl sm:text-2xl text-[#10110F]">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-[#263D2B] leading-snug">
                  {item.summary}
                </p>
                <p className="text-xs text-[#6B7068] leading-relaxed pt-1">
                  {item.details}
                </p>
              </div>

              <div className="pt-3 border-t border-[#DCE1D8]/60 flex items-center gap-1.5 text-[11px] font-semibold text-[#465640]">
                <Check className="w-3.5 h-3.5 text-[#263D2B]" />
                <span>Certified Director Standard</span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 2. MAKEUP PREPARATION GUIDE (6 CARDS) */}
      <section id="makeup-preparation" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B]" />
            <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              PRE-EVENT CLIENT PREPARATION
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
            Makeup Preparation Guide
          </h2>

          <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
            Maximize foundation smoothness, color payoff, and 16+ hour endurance by following our director-approved preparation recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {MAKEUP_PREPARATION_CARDS.map((card, idx) => (
            <div
              key={card.id}
              className="p-6 rounded-3xl bg-white border border-[#DCE1D8] shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-xl bg-[#263D2B] text-white font-mono text-xs font-bold flex items-center justify-center">
                    0{idx + 1}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F7F4ED] text-[#263D2B] text-[10px] font-bold uppercase tracking-wider border border-[#DCE1D8]">
                    Preparation Tip
                  </span>
                </div>

                <h3 className="font-serif text-xl text-[#10110F] font-normal">
                  {card.title}
                </h3>

                <p className="text-xs text-[#6B7068] leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#DCE1D8]/60 flex items-center gap-1.5 text-[11px] font-semibold text-[#263D2B]">
                <Check className="w-3.5 h-3.5 text-[#263D2B]" />
                <span>Pre-Event Recommendation</span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 3. MAKEUP AFTERCARE GUIDE (6 CARDS) */}
      <section id="makeup-aftercare" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
            <HeartHandshake className="w-3.5 h-3.5 text-[#263D2B]" />
            <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              POST-EVENT SKINCARE &amp; REMOVAL
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
            Makeup Aftercare &amp; Skin Health
          </h2>

          <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
            Protect your delicate skin barrier, prevent pore congestion, and gently dissolve longwear cosmetic pigments after your celebration concludes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {MAKEUP_AFTERCARE_CARDS.map((card, idx) => {
            const isHealthCard = card.id === 'irritation-protocol';
            return (
              <div
                key={card.id}
                className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between space-y-4 ${
                  isHealthCard 
                    ? 'bg-[#FBF9F4] border-[#263D2B]/30 ring-1 ring-[#263D2B]/20 shadow-xs' 
                    : 'bg-white border-[#DCE1D8] shadow-xs'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-xl bg-[#263D2B] text-white font-mono text-xs font-bold flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F7F4ED] text-[#263D2B] text-[10px] font-bold uppercase tracking-wider border border-[#DCE1D8]">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-[#10110F]">
                    {card.title}
                  </h3>

                  <ul className="space-y-2 text-xs text-[#465640]">
                    {card.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B] mt-1.5 flex-shrink-0" />
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-[#DCE1D8]/60 flex items-center gap-1.5 text-[11px] font-semibold text-[#263D2B]">
                  <Check className="w-3.5 h-3.5" />
                  <span>Approved Skin Hygiene</span>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* 4. MAKEUP FAQS (7 EXPANDABLE QUESTIONS) */}
      <section id="makeup-faqs" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
        
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DCE1D8] text-[10px] font-bold uppercase tracking-widest text-[#263D2B]">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>HELPFUL &amp; ACCURATE ANSWERS</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F]">
              Makeup Atelier Frequently Asked Questions
            </h3>
            <p className="text-xs text-[#6B7068]">
              Honest guidance regarding bridal makeup, finishes, inspiration sharing, and gentle removal.
            </p>
          </div>

          <div className="space-y-3">
            {MAKEUP_FAQS.map((faq, index) => {
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

          {/* Health Disclaimer Note */}
          <div className="p-5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs text-[#465640] leading-relaxed text-center sm:text-left flex flex-col sm:flex-row items-center gap-3">
            <HeartHandshake className="w-6 h-6 text-[#263D2B] flex-shrink-0" />
            <span>
              <strong>Professional Notice:</strong> GLAM GIRL BY JANKI provides luxury cosmetic makeup artistry. We do not diagnose or treat dermatological conditions. If you experience persistent irritation or swelling from any cosmetic, discontinue use and consult a healthcare physician.
            </span>
          </div>

        </div>

      </section>

    </div>
  );
}
