import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MessagesSquare, 
  ScanFace, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

const PROCESS_STEPS = [
  {
    stepNumber: '01',
    title: 'Consultation',
    subtitle: 'Listen & Align',
    description: 'We discuss your beauty goals, preferences, concerns, and treatment expectations before getting started.',
    icon: MessagesSquare,
    highlight: 'One-on-One Discussion'
  },
  {
    stepNumber: '02',
    title: 'Hair & Skin Analysis',
    subtitle: 'Diagnostic Assessment',
    description: 'We assess your hair or skin condition and identify the most suitable treatment approach based on your individual needs.',
    icon: ScanFace,
    highlight: 'Personalized Diagnostics'
  },
  {
    stepNumber: '03',
    title: 'Treatment Application',
    subtitle: 'Atelier Execution',
    description: 'Our beauty professional performs your selected treatment with care, attention to detail, and appropriate salon techniques.',
    icon: Sparkles,
    highlight: 'Master Craftsmanship'
  },
  {
    stepNumber: '04',
    title: 'Aftercare Guidance',
    subtitle: 'Sustained Radiance',
    description: 'We share practical aftercare recommendations to help you maintain your results and care for your hair or skin at home.',
    icon: ShieldCheck,
    highlight: 'Home Maintenance Tips'
  }
];

export default function TreatmentProcessSection() {
  return (
    <section className="mt-20 sm:mt-28 lg:mt-32 pt-16 sm:pt-20 border-t border-[#DCE1D8]">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* ===================================================================== */}
        {/* SECTION HEADER                                                        */}
        {/* ===================================================================== */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-20">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
            <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.26em] text-[#263D2B]">
              THE GLAM GIRL EXPERIENCE
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
            Our Treatment Process
          </h2>

          {/* Subtle Decorative Forest Green Accent Line */}
          <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

          {/* Description */}
          <p className="font-sans text-sm sm:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto pt-1">
            Every beauty journey begins with understanding you. Our personalized process helps us tailor each treatment to your hair, skin, and beauty goals.
          </p>
        </ScrollReveal>

        {/* ===================================================================== */}
        {/* FOUR TREATMENT STEPS WITH CONNECTED TIMELINE                          */}
        {/* ===================================================================== */}
        <div className="relative">
          
          {/* Desktop Timeline Connecting Progress Line (Horizontal across cols) */}
          <div 
            className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[2px] -z-0 bg-gradient-to-r from-[#263D2B]/15 via-[#263D2B]/40 to-[#263D2B]/15" 
            aria-hidden="true"
          />

          {/* Grid Layout: Desktop 4 columns, Tablet 2 columns, Mobile 1 column */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-6 relative z-10">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = step.icon;

              return (
                <ScrollReveal
                  key={step.stepNumber}
                  delay={idx * 120}
                  className="h-full"
                >
                  <div className="group h-full bg-white rounded-3xl p-6 sm:p-7 border border-[#DCE1D8] hover:border-[#263D2B] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden hover:-translate-y-1">
                    
                    {/* Top Step Number & Timeline Node Indicator */}
                    <div className="flex items-center justify-between pb-6">
                      
                      {/* Step Indicator Badge */}
                      <div className="relative">
                        <div className="w-11 h-11 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] group-hover:border-[#263D2B] group-hover:bg-[#263D2B] flex items-center justify-center transition-all duration-300 shadow-xs">
                          <Icon className="w-5 h-5 text-[#263D2B] group-hover:text-white transition-colors duration-300 stroke-[1.8]" />
                        </div>
                      </div>

                      {/* Prominent Serif Step Number */}
                      <span className="font-serif text-3xl sm:text-4xl font-normal text-[#DCE1D8] group-hover:text-[#263D2B]/40 transition-colors duration-300 select-none">
                        {step.stepNumber}
                      </span>
                    </div>

                    {/* Step Content: Heading, Subtitle & Description */}
                    <div className="space-y-3 flex-1">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#465640] block font-sans">
                          {step.subtitle}
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F] tracking-tight group-hover:text-[#263D2B] transition-colors">
                          {step.stepNumber}. {step.title}
                        </h3>
                      </div>

                      <p className="font-sans text-xs sm:text-[13px] text-[#6B7068] leading-relaxed font-light">
                        {step.description}
                      </p>
                    </div>

                    {/* Bottom Highlight Pill */}
                    <div className="pt-5 mt-5 border-t border-[#DCE1D8]/60 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#263D2B] flex-shrink-0" />
                      <span className="text-[11px] font-medium text-[#465640] truncate">
                        {step.highlight}
                      </span>
                    </div>

                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>

        {/* ===================================================================== */}
        {/* CALL TO ACTION BUTTON                                                 */}
        {/* ===================================================================== */}
        <ScrollReveal className="pt-14 sm:pt-16 text-center space-y-3">
          <div>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 rounded-[4px] bg-[#263D2B] hover:bg-[#1C2E20] text-white text-xs font-bold uppercase tracking-[0.18em] shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-[#263D2B]/25 active:scale-98 cursor-pointer group"
            >
              <span>EXPLORE OUR SERVICES</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <p className="text-xs text-[#6B7068] font-light max-w-md mx-auto">
            Discover our complete repertoire of 72 tailored hair, skin, and wellness treatments in Ottawa.
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
}
