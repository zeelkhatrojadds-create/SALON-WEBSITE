import React from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  Search, 
  Droplet, 
  Layers, 
  Eye, 
  ShieldCheck, 
  Check, 
  Info 
} from 'lucide-react';
import { LASH_JOURNEY_STEPS } from './LashConstants';

const STEP_ICONS = [
  MessageSquare,
  Search,
  Droplet,
  Layers,
  Eye,
  ShieldCheck
];

export default function LashApplicationJourney() {
  return (
    <section id="lash-application-journey" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
          <Layers className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            ATELIER PROTOCOL JOURNEY
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          The Lash Application Journey
        </h2>

        <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
          From your initial consultation and microscopic follicle assessment to precision isolation and nano-cure setting, experience our 6-step atelier experience designed to safeguard natural lash vitality.
        </p>

        {/* Individual Variation Note */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-[11px] text-[#465640] max-w-xl text-left sm:text-center mt-2">
          <Info className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
          <span>
            <strong>Natural Variation Notice:</strong> Every eye anatomy and natural lash density is biologically distinct. Results are individually calibrated and never identical from client to client.
          </span>
        </div>
      </div>

      {/* 6 Step Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {LASH_JOURNEY_STEPS.map((item, index) => {
          const IconComponent = STEP_ICONS[index] || Sparkles;
          return (
            <div
              key={item.step}
              className="bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-[#263D2B]/40 transition-all duration-300 flex flex-col justify-between space-y-4 relative group"
            >
              {/* Top Row: Step Number & Icon */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[#263D2B]/40 group-hover:text-[#263D2B] transition-colors">
                  {item.step}
                </span>
                
                <div className="w-10 h-10 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-center text-[#263D2B] group-hover:bg-[#263D2B] group-hover:text-white transition-all duration-300">
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>

              {/* Title & Summary */}
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

              {/* Step Assurance Checkmark */}
              <div className="pt-3 border-t border-[#DCE1D8]/60 flex items-center gap-1.5 text-[11px] font-semibold text-[#465640]">
                <Check className="w-3.5 h-3.5 text-[#263D2B]" />
                <span>Certified Studio Standard</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety & Damage-Free Guarantee Strip */}
      <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#263D2B] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A8B5A0] block">
            JANKI KHATROJA ARTISTRY PLEDGE
          </span>
          <h4 className="font-serif text-xl sm:text-2xl text-white">
            Damage-Free Isolation Guarantee
          </h4>
          <p className="text-xs text-white/80 max-w-xl">
            We never glue multiple natural lashes together. Each extension is applied with precise millimeter clearance from the eyelid margin to ensure healthy, uninterrupted follicle growth.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
            <span className="text-base font-bold font-mono block text-white">0.5mm</span>
            <span className="text-[10px] text-[#A8B5A0] uppercase font-mono">Skin Margin</span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
            <span className="text-base font-bold font-mono block text-white">100%</span>
            <span className="text-[10px] text-[#A8B5A0] uppercase font-mono">Latex-Free</span>
          </div>
        </div>
      </div>

    </section>
  );
}
