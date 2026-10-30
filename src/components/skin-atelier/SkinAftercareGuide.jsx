import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sun, 
  Droplets, 
  HeartHandshake, 
  ChevronDown, 
  Clock,
  ShieldAlert
} from 'lucide-react';
import { SKIN_ATELIER_FAQS, MEDICAL_SAFETY_DISCLAIMER } from './SkinConstants';

export default function SkinAftercareGuide() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? -1 : idx);
  };

  return (
    <section id="skin-aftercare-guide" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 1. EDITORIAL HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            HEALTH &amp; SUSTAINED RADIANCE
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          Skin Health &amp; Aftercare Guidance
        </h2>

        <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed font-light">
          Maximizing the benefits of your facial ritual requires conscious post-treatment care. Follow our certified aesthetician aftercare guidelines to protect your moisture barrier and sustain your ethereal glow.
        </p>
      </div>

      {/* 2. THREE PILLARS OF POST-FACIAL AFTERCARE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
        
        {/* Pillar 1: First 24-48 Hours */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#DCE1D8] shadow-xs space-y-4 hover:border-[#263D2B]/40 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-[#F7F4ED] text-[#263D2B] flex items-center justify-center border border-[#DCE1D8]">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl text-[#10110F]">
            The First 24–48 Hours
          </h3>
          <p className="text-xs text-[#6B7068] leading-relaxed">
            Your skin pores and barrier have just received active botanical infusions. Avoid wearing heavy foundations, liquid concealers, or powder makeup for at least 24 hours to prevent clogging freshly cleared follicles.
          </p>
          <ul className="text-xs text-[#465640] space-y-2 pt-2 border-t border-[#DCE1D8]/60">
            <li className="flex items-start gap-2">
              <span className="text-[#263D2B] font-bold">•</span>
              <span>Avoid hot saunas, steam rooms, and hot tubs for 48 hours.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#263D2B] font-bold">•</span>
              <span>Refrain from strenuous workouts and excessive perspiration on treatment day.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#263D2B] font-bold">•</span>
              <span>Do not touch extractions or your face with unwashed hands.</span>
            </li>
          </ul>
        </div>

        {/* Pillar 2: UV Defense & Protection */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#DCE1D8] shadow-xs space-y-4 hover:border-[#263D2B]/40 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-[#F7F4ED] text-[#263D2B] flex items-center justify-center border border-[#DCE1D8]">
            <Sun className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl text-[#10110F]">
            Sun Defense &amp; Barrier Safety
          </h3>
          <p className="text-xs text-[#6B7068] leading-relaxed">
            Freshly resurfaced, exfoliated, and brightened skin is particularly sensitive to ultraviolet radiation. Proper sun protection preserves your luminous clarity and prevents hyperpigmentation.
          </p>
          <ul className="text-xs text-[#465640] space-y-2 pt-2 border-t border-[#DCE1D8]/60">
            <li className="flex items-start gap-2">
              <span className="text-[#263D2B] font-bold">•</span>
              <span>Apply broad-spectrum SPF 30+ sunscreen every morning.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#263D2B] font-bold">•</span>
              <span>Avoid tanning beds and direct midday sunbathing for at least 5 days.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#263D2B] font-bold">•</span>
              <span>Wear a wide-brimmed sun hat when outside during Ottawa summer months.</span>
            </li>
          </ul>
        </div>

        {/* Pillar 3: Gentle Hydration & Active Ingredients */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#DCE1D8] shadow-xs space-y-4 hover:border-[#263D2B]/40 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-[#F7F4ED] text-[#263D2B] flex items-center justify-center border border-[#DCE1D8]">
            <Droplets className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl text-[#10110F]">
            Hydration &amp; Product Timing
          </h3>
          <p className="text-xs text-[#6B7068] leading-relaxed">
            Support your skin&apos;s natural repair cycle with gentle hydration. Avoid aggressive active chemical agents until your barrier is fully stabilized.
          </p>
          <ul className="text-xs text-[#465640] space-y-2 pt-2 border-t border-[#DCE1D8]/60">
            <li className="flex items-start gap-2">
              <span className="text-[#263D2B] font-bold">•</span>
              <span>Pause retinol, AHAs, BHAs, and physical facial scrubs for 72 hours.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#263D2B] font-bold">•</span>
              <span>Drink 8–10 glasses of water daily to maintain cellular plumping.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#263D2B] font-bold">•</span>
              <span>Use a calming, fragrance-free ceramide or hyaluronic moisturizer.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* 3. MEDICAL SAFETY & PERSISTENT CONCERN NOTICE BANNER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#263D2B]/20 shadow-xs space-y-3 mb-16">
        <div className="flex items-center gap-2 text-[#263D2B] font-bold text-xs uppercase tracking-wider">
          <ShieldAlert className="w-5 h-5 text-[#263D2B] flex-shrink-0" />
          <span>Professional Non-Diagnostic Commitment</span>
        </div>
        <p className="text-xs sm:text-sm text-[#465640] leading-relaxed">
          {MEDICAL_SAFETY_DISCLAIMER.content}
        </p>
        <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#263D2B]">
          <HeartHandshake className="w-4 h-4 text-[#263D2B]" />
          <span>Your wellness and skin safety are always our utmost priority.</span>
        </div>
      </div>

      {/* 4. FREQUENTLY ASKED QUESTIONS ACCORDION */}
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="text-center space-y-1 mb-8">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B]">
            ATELIER CLIENT INQUIRIES
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F]">
            Frequently Asked Skincare Questions
          </h3>
        </div>

        <div className="space-y-3">
          {SKIN_ATELIER_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-[#DCE1D8] overflow-hidden transition-colors shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg text-[#10110F] font-normal">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#263D2B] transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#465640] font-light leading-relaxed border-t border-[#DCE1D8]/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
