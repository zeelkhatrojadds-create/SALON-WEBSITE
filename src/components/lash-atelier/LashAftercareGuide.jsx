import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Droplet, 
  EyeOff, 
  Moon, 
  RefreshCcw, 
  AlertTriangle, 
  Check, 
  ChevronDown, 
  ChevronUp,
  HeartHandshake,
  Sparkles
} from 'lucide-react';
import { LASH_AFTERCARE_RULES, MEDICAL_SAFETY_DISCLAIMER } from './LashConstants';

const FAQS = [
  {
    q: 'How long do lash extensions typically last before needing a refill?',
    a: 'Natural eyelashes naturally complete their shed and regrowth cycle every 6 to 8 weeks, shedding 3 to 5 natural lashes daily. To maintain consistent symmetry and density, salon-approved refills are recommended every 2 to 3 weeks.'
  },
  {
    q: 'Can I wear mascara or eyeliner with my lash extensions?',
    a: 'We strictly recommend avoiding traditional waterproof mascara and liquid eyeliners containing oils or glycols, as they dissolve extension adhesives and clump fans. If desired, oil-free water-based eyeliner applied solely to the lid (not the lash base) may be used.'
  },
  {
    q: 'Will eyelash extensions or lash lifts damage my natural lashes?',
    a: 'No. When applied by a certified master artist like Janki Khatroja, extensions are individually isolated and calibrated to the exact weight and length your natural lash hair can support. Natural lash damage only occurs from pulling or plucking them at home.'
  },
  {
    q: 'What should I do if my eyes feel irritated or itchy after an appointment?',
    a: 'Mild sensitivity from adhesive fumes dissipates within a few hours. However, if you experience ongoing itching, redness, swelling, or suspect an allergic reaction, stop touching the area and seek medical guidance promptly. Contact our studio for safe, complimentary professional cream removal.'
  },
  {
    q: 'Can I shower, swim, or wash my face after a lash lift or extension set?',
    a: 'Keep lashes completely dry for the first 24 hours while bonding polymers cure. After 24 hours, you may shower, wash your face, and swim freely. Cleanse lashes daily using an oil-free foaming lash wash and pat dry gently with a lint-free towel.'
  }
];

export default function LashAftercareGuide() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  return (
    <section id="lash-aftercare-guide" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            SALON-APPROVED AFTERCARE &amp; LONGEVITY
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          Lash Care Protocol &amp; Health Guide
        </h2>

        <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
          Preserve your lush lash density, safeguard natural lash follicle health, and extend retention for weeks with our director-approved home regimen.
        </p>
      </div>

      {/* 6 Core Aftercare Rule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {LASH_AFTERCARE_RULES.map((rule) => (
          <div
            key={rule.id}
            className="p-6 rounded-3xl bg-white border border-[#DCE1D8] shadow-xs space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#263D2B] text-white font-mono text-xs font-bold flex items-center justify-center">
                  0{rule.id}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F7F4ED] text-[#263D2B] text-[10px] font-bold uppercase tracking-wider border border-[#DCE1D8]">
                  {rule.badge}
                </span>
              </div>

              <h3 className="font-serif text-lg text-[#10110F] font-normal leading-snug">
                {rule.title}
              </h3>

              <p className="text-xs text-[#6B7068] leading-relaxed">
                {rule.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#DCE1D8]/60 flex items-center gap-1.5 text-[11px] font-semibold text-[#263D2B]">
              <Check className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>Certified Salon Protocol</span>
            </div>
          </div>
        ))}
      </div>

      {/* Safety & Medical Guidance Card */}
      <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#263D2B] text-white flex items-center justify-center flex-shrink-0">
            <HeartHandshake className="w-5 h-5 text-[#A8B5A0]" />
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#10110F]">
              Health, Hygiene &amp; Preliminary Patch Testing
            </h3>
            <p className="text-xs text-[#6B7068]">
              Your eye comfort and long-term corneal safety are our highest priorities.
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#465640] leading-relaxed">
          {MEDICAL_SAFETY_DISCLAIMER}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3.5 rounded-2xl bg-white border border-[#DCE1D8] space-y-1">
            <span className="font-bold text-[#10110F] block">1. Hypoallergenic Adhesives</span>
            <p className="text-[#6B7068] text-[11px]">Latex-free and formaldehyde-free medical grade cyanoacrylate.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-[#DCE1D8] space-y-1">
            <span className="font-bold text-[#10110F] block">2. Complimentary Patch Test</span>
            <p className="text-[#6B7068] text-[11px]">24-hour micro patch testing available prior to full application.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-[#DCE1D8] space-y-1">
            <span className="font-bold text-[#10110F] block">3. Gentle Cream Removal</span>
            <p className="text-[#6B7068] text-[11px]">Free removal service if you ever experience sensitivity at home.</p>
          </div>
        </div>
      </div>

      {/* FAQs Accordion */}
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="text-center space-y-1 mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B]">
            COMMON QUESTIONS
          </span>
          <h3 className="font-serif text-2xl text-[#10110F]">
            Lash Atelier Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#DCE1D8] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-serif text-base sm:text-lg text-[#10110F] font-normal">
                    {faq.q}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-center flex-shrink-0 text-[#263D2B]">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#465640] leading-relaxed border-t border-[#DCE1D8]/50 pt-3">
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
