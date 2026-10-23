import React from 'react';
import { 
  HeartHandshake, 
  ScanFace, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2,
  Clock,
  Sparkle
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import treatmentImage from '../../assets/facial-atelier-hero.webp';

const GLOW_STEPS = [
  {
    stepNumber: '01',
    title: 'Personal Consultation',
    description: 'Understand your beauty goals, concerns, and expectations.',
    tag: 'One-on-One Listening',
    icon: HeartHandshake
  },
  {
    stepNumber: '02',
    title: 'Hair & Skin Analysis',
    description: 'Assess your hair and skin to determine the most suitable treatment.',
    tag: 'Professional Assessment',
    icon: ScanFace
  },
  {
    stepNumber: '03',
    title: 'Careful Treatment Application',
    description: 'Deliver each treatment with precision, care, and attention to detail.',
    tag: 'Bespoke Technique',
    icon: Sparkles
  },
  {
    stepNumber: '04',
    title: 'Aftercare Guidance',
    description: 'Recommend suitable aftercare practices to help maintain your results.',
    tag: 'Sustained Glow',
    icon: ShieldCheck
  }
];

export default function TimeBehindYourGlowSection() {
  return (
    <section 
      id="time-behind-your-glow"
      aria-label="The Time Behind Your Glow"
      className="mt-20 sm:mt-28 lg:mt-36 pt-16 sm:pt-20 border-t border-[#DCE1D8]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">
        
        {/* ===================================================================== */}
        {/* LEFT COLUMN: EDITORIAL SALON TREATMENT IMAGE (STICKY ON DESKTOP)       */}
        {/* ===================================================================== */}
        <ScrollReveal 
          className="lg:col-span-5 flex justify-center lg:sticky lg:top-28" 
          delay={100}
        >
          <div className="relative w-full max-w-[500px] rounded-3xl overflow-hidden shadow-xl border border-[#DCE1D8] bg-white group">
            
            {/* Image Container with Responsive Aspect Ratio */}
            <div className="w-full aspect-[4/5] sm:aspect-[4/5] lg:aspect-[3/4] overflow-hidden bg-[#10110F]">
              <img
                src={treatmentImage}
                alt="Professional salon treatment at Glam Girl by Janki Ottawa atelier"
                className="w-full h-full object-cover object-[75%_center] transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/facial/special-glam-girl-facial.webp';
                }}
              />
            </div>

            {/* Subtle Luxury Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#10110F]/75 via-transparent to-black/20 pointer-events-none" />

            {/* Top Floating Atelier Badge */}
            <div className="absolute top-4 sm:top-5 left-4 sm:left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#DCE1D8] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
              <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#263D2B]">
                GLAM GIRL ATELIER
              </span>
            </div>

            {/* Top Right Floating Detail Pill */}
            <div className="absolute top-4 sm:top-5 right-4 sm:right-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#10110F]/80 backdrop-blur-md border border-white/15 text-[10px] font-medium text-[#F7F4ED]">
              <Clock className="w-3 h-3 text-[#A8B5A0]" />
              <span>Unhurried Care</span>
            </div>

            {/* Bottom Floating Editorial Narrative Pill */}
            <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#DCE1D8] shadow-md flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#263D2B] block">
                  MINDFUL CRAFTSMANSHIP
                </span>
                <span className="font-serif text-xs sm:text-sm text-[#10110F] font-normal block">
                  Dedicated 1-on-1 Beauty Experience
                </span>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#263D2B] flex-shrink-0" />
            </div>

          </div>
        </ScrollReveal>

        {/* ===================================================================== */}
        {/* RIGHT COLUMN: HEADINGS, EDITORIAL DESCRIPTION & 4 STEP CARDS           */}
        {/* ===================================================================== */}
        <ScrollReveal className="lg:col-span-7 space-y-8 sm:space-y-10 text-left" stagger={true}>
          
          {/* Header Block */}
          <div className="space-y-3 sm:space-y-4">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
              <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
                THE ART OF UNHURRIED BEAUTY
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
              The Time Behind Your Glow
            </h2>

            {/* Subtitle */}
            <p className="font-serif text-lg sm:text-xl lg:text-2xl italic font-normal text-[#263D2B]">
              Every treatment takes time. Every detail makes a difference.
            </p>

            {/* Subtle Decorative Forest Green Accent Line */}
            <div className="w-12 h-[2px] bg-[#263D2B] rounded-full" />

            {/* Description */}
            <p className="font-sans text-sm sm:text-base text-[#6B7068] leading-relaxed max-w-2xl font-light pt-1">
              At GLAM GIRL BY JANKI, we believe beautiful results cannot be rushed. Every hair and skin treatment is thoughtfully designed around your individual needs. From consultation and professional analysis to treatment application and aftercare, we dedicate the time, care, and expertise your beauty deserves.
            </p>
          </div>

          {/* =================================================================== */}
          {/* FOUR STEPS: ELEGANT NUMBERED TIMELINE CARDS                         */}
          {/* =================================================================== */}
          <div className="space-y-3 sm:space-y-4 relative">
            
            {/* Subtle Vertical Connecting Line along the Number Badges */}
            <div 
              className="absolute left-[23px] sm:left-[25px] top-6 bottom-6 w-[1.5px] bg-[#DCE1D8] -z-0 hidden sm:block" 
              aria-hidden="true"
            />

            {GLOW_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.stepNumber}
                  className="group relative flex items-start gap-3.5 sm:gap-4 z-10"
                >
                  {/* Elegant Numbered Node */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border border-[#DCE1D8] group-hover:border-[#263D2B] group-hover:bg-[#263D2B] flex items-center justify-center transition-all duration-300 shadow-xs flex-shrink-0">
                    <span className="font-serif text-sm sm:text-base font-semibold text-[#263D2B] group-hover:text-white transition-colors duration-300">
                      {step.stepNumber}
                    </span>
                  </div>

                  {/* Step Card */}
                  <div className="flex-1 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#DCE1D8] group-hover:border-[#263D2B] shadow-xs group-hover:shadow-md transition-all duration-300 flex flex-col justify-between group-hover:-translate-y-0.5">
                    
                    {/* Top Row: Title + Tag */}
                    <div className="flex items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
                        <h3 className="font-serif text-base sm:text-lg font-normal text-[#10110F] tracking-tight group-hover:text-[#263D2B] transition-colors leading-snug">
                          {step.title}
                        </h3>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#465640] bg-[#F7F4ED] px-2.5 py-0.5 rounded-full border border-[#DCE1D8]/60 flex-shrink-0">
                        {step.tag}
                      </span>
                    </div>

                    {/* Step Description */}
                    <p className="font-sans text-xs sm:text-[13.5px] text-[#6B7068] leading-relaxed font-light mt-2">
                      {step.description}
                    </p>

                  </div>
                </div>
              );
            })}

          </div>

          {/* =================================================================== */}
          {/* CLOSING STATEMENT BANNER                                            */}
          {/* =================================================================== */}
          <div className="pt-2">
            <div className="relative rounded-2xl sm:rounded-3xl bg-[#263D2B] text-white p-6 sm:p-7 shadow-lg overflow-hidden border border-[#263D2B]">
              
              {/* Subtle Ambient Glow */}
              <div 
                className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" 
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[#A8B5A0]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.24em]">
                      THE GLAM GIRL COMMITMENT
                    </span>
                  </div>
                  <blockquote className="font-serif text-lg sm:text-xl lg:text-2xl italic font-normal text-[#F7F4ED] tracking-tight leading-snug">
                    “Your Glow. Your Time. Your Experience.”
                  </blockquote>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] font-medium text-[#F7F4ED] backdrop-blur-xs self-start sm:self-center flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#A8B5A0]" />
                  <span>Single-Guest Atelier</span>
                </div>
              </div>

            </div>
          </div>

        </ScrollReveal>

      </div>
    </section>
  );
}
