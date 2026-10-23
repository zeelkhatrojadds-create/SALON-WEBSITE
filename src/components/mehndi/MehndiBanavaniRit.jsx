// GLAM GIRL BY JANKI — Mehndi Banavani Rit (The Art of Mehndi)
// Step-by-step complete mehndi application process with horizontal desktop & vertical mobile timeline, progress indicator, and booking CTA.

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Leaf,
  Flower2,
  ShieldCheck,
  Compass,
  Layers,
  Heart
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

export const MEHNDI_APPLICATION_STEPS = [
  {
    step: 1,
    number: '01',
    title: 'Design Selection',
    subtitle: 'Consultation & Silhouette Matching',
    description: 'The customer selects a preferred design, such as bridal, Arabic, traditional, floral, or minimal mehndi.',
    proTip: 'During your consultation, Janki assesses hand proportions and fabric sleeve lengths to recommend harmonious placement.',
    image: '/images/mehndi/mehndi-studio-card.webp',
    duration: '10 - 15 mins'
  },
  {
    step: 2,
    number: '02',
    title: 'Skin Preparation',
    subtitle: 'Cleansing & Natural Moisture Balance',
    description: 'Clean and dry the hands or feet before applying mehndi. Avoid applying henna over irritated or broken skin.',
    proTip: 'We cleanse with pure witch hazel and warm eucalyptus water to remove barrier lotions so the natural lawsone dye binds directly to keratin.',
    image: '/images/mehndi/minimalist-fine-line.webp',
    duration: '5 - 10 mins'
  },
  {
    step: 3,
    number: '03',
    title: 'Henna Cone Preparation',
    subtitle: 'Paste Consistency & Precision Tip Flow',
    description: 'Prepare a suitable henna cone and check that the paste flows smoothly for clean, precise patterns.',
    proTip: 'Our fresh organic Rajasthani paste is triple-sifted with zero grittiness, sealed in hand-rolled micro-nozzle cellophane cones for whisper-thin lines.',
    image: '/images/mehndi/finger-rings-lace.webp',
    duration: 'Pre-Session'
  },
  {
    step: 4,
    number: '04',
    title: 'Outline the Design',
    subtitle: 'Foundational Geometry & Center Mandalas',
    description: 'Start with the main shapes, flowers, leaves, paisleys, or mandala patterns, then build the design carefully.',
    proTip: 'Foundational paisleys and floral crests are laid out first to establish architectural balance across both palms.',
    image: '/images/mehndi/mandala-palm-art.webp',
    duration: '15 - 30 mins'
  },
  {
    step: 5,
    number: '05',
    title: 'Add Fine Details',
    subtitle: 'Micro Jaali Mesh, Shading & Filigree',
    description: 'Fill the design with fine lines, dots, curves, and decorative details to create a beautiful finish.',
    proTip: 'Delicate inner hatching, cross-checks, and graduated petal shading create rich dimensional texture as the stain oxidizes.',
    image: '/images/mehndi/indian-traditional-jaal.webp',
    duration: '20 - 45 mins'
  },
  {
    step: 6,
    number: '06',
    title: 'Let the Mehndi Dry',
    subtitle: 'Natural Air Drying & Lemon-Sugar Glaze',
    description: 'Allow the applied paste to dry naturally. Follow the henna product’s recommended application instructions.',
    proTip: 'We dab a warm clove-infused lemon sugar syrup over the drying paste to lock moisture and keep the botanical dye active on your skin.',
    image: '/images/mehndi/arabic-floral-bel.webp',
    duration: '30 - 45 mins'
  },
  {
    step: 7,
    number: '07',
    title: 'Remove the Dried Paste',
    subtitle: 'Gentle Scraping Without Water Contact',
    description: 'Gently scrape or brush away the dried paste when appropriate. Avoid washing immediately if the product instructions recommend keeping the area dry.',
    proTip: 'Never wash with tap water. Gently rub dry flakes off with natural coconut oil or a butter knife edge to protect the fresh orange pigment.',
    image: '/images/mehndi/backhand-cuff-chain.webp',
    duration: '6 - 8 hours later'
  },
  {
    step: 8,
    number: '08',
    title: 'Aftercare and Colour Development',
    subtitle: '48-Hour Natural Oxidation to Deep Mahogany',
    description: 'Follow safe aftercare guidance. The henna stain usually develops over the following 24–48 hours and may deepen gradually.',
    proTip: 'Keep hands warm and moisturize with balms before showering. Within 48 hours, exposure to body heat transforms the stain into a deep, rich mahogany burgundy.',
    image: '/images/mehndi/bridal-mehndi-hero.webp',
    duration: '24 - 48 hours'
  }
];

export default function MehndiBanavaniRit() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const activeStep = MEHNDI_APPLICATION_STEPS[activeStepIndex];
  const progressPercent = Math.round(((activeStepIndex + 1) / MEHNDI_APPLICATION_STEPS.length) * 100);

  // Navigate to step and scroll container
  const handleSelectStep = (index) => {
    setActiveStepIndex(index);
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const stepElements = container.children;
      if (stepElements[index]) {
        stepElements[index].scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    }
  };

  const handleNextStep = () => {
    const next = activeStepIndex < MEHNDI_APPLICATION_STEPS.length - 1 ? activeStepIndex + 1 : 0;
    handleSelectStep(next);
  };

  const handlePrevStep = () => {
    const next = activeStepIndex > 0 ? activeStepIndex - 1 : MEHNDI_APPLICATION_STEPS.length - 1;
    handleSelectStep(next);
  };

  const scrollTimeline = (direction) => {
    if (!scrollContainerRef.current) return;
    const amount = direction === 'left' ? -320 : 320;
    scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  // Sync active step when user scrolls horizontally through the timeline
  const handleHorizontalScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = 304; // 288px (w-72) + 16px (gap-4)
    const newIndex = Math.min(
      MEHNDI_APPLICATION_STEPS.length - 1,
      Math.max(0, Math.round(container.scrollLeft / cardWidth))
    );
    if (newIndex !== activeStepIndex) {
      setActiveStepIndex(newIndex);
    }
  };

  return (
    <section id="mehndi-banavani-rit" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
      
      {/* 1. SECTION INTRO & EDITORIAL TITLE */}
      <ScrollReveal className="space-y-4 text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
          <Leaf className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            AUTHENTIC ATELIER RITUAL • મહેંદી બનાવવાની રીત
          </span>
        </div>

        {/* Exact Section Name Required */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          Mehndi Banavani Rit
        </h2>

        {/* Exact Subtitle Required */}
        <p className="font-serif text-lg sm:text-xl text-[#465640] italic font-light max-w-2xl mx-auto">
          From the First Henna Stroke to a Beautiful Mehndi Design
        </p>

        <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

        <p className="text-xs sm:text-sm text-[#6B7068] font-light max-w-2xl mx-auto leading-relaxed">
          Explore the complete 8-step henna artistry journey practiced by master artist Janki Khatroja. 
          Discover how botanical skin prep, hand-rolled cones, and natural lawsone oxidation culminate in a radiant, lasting stain.
        </p>

        {/* Step Progress Pills Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {MEHNDI_APPLICATION_STEPS.map((s, idx) => {
            const isCurrent = activeStepIndex === idx;
            return (
              <button
                key={s.step}
                type="button"
                onClick={() => handleSelectStep(idx)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 border ${
                  isCurrent
                    ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                    : 'bg-white text-[#465640] border-[#DCE1D8] hover:border-[#263D2B]'
                }`}
                aria-label={`Go to step ${s.step}: ${s.title}`}
              >
                <span className="font-mono text-[10px]">{s.number}</span>
                <span className="hidden md:inline">{s.title}</span>
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* 2. ACTIVE STEP HERO SPOTLIGHT WORKBENCH */}
      <div className="bg-white rounded-3xl border border-[#DCE1D8] shadow-md p-6 sm:p-10 mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Step Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-[#DCE1D8] shadow-sm group">
              <img
                src={activeStep.image}
                alt={`${activeStep.title} — Step ${activeStep.step} of Mehndi Banavani Rit`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

              {/* Number Badge */}
              <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-bold text-[#263D2B] border border-[#DCE1D8] shadow-xs flex items-center gap-1.5">
                <span>STEP {activeStep.number} OF 08</span>
              </div>

              {/* Phase Duration Tag */}
              <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-lg text-[10.5px] text-white font-mono flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#A8B5A0]" />
                <span>{activeStep.duration}</span>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B] block">
                {activeStep.subtitle}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal leading-tight">
                Step {activeStep.step}: {activeStep.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#10110F] leading-relaxed font-normal">
              {activeStep.description}
            </p>

            {/* Janki's Pro Tip Note */}
            <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-[#263D2B] mt-0.5 flex-shrink-0" />
              <div className="space-y-0.5 text-xs text-[#465640]">
                <span className="font-bold text-[#10110F] block">Janki&apos;s Artisanal Insight:</span>
                <p className="font-light leading-relaxed">{activeStep.proTip}</p>
              </div>
            </div>

            {/* Step Controls */}
            <div className="pt-2 flex items-center justify-between border-t border-[#DCE1D8]/80">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2 rounded-xl border border-[#DCE1D8] text-xs font-semibold text-[#465640] hover:text-[#10110F] hover:border-[#10110F] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>

              <span className="text-xs font-mono font-semibold text-[#6B7068]">
                {activeStep.step} / {MEHNDI_APPLICATION_STEPS.length}
              </span>

              <button
                type="button"
                onClick={handleNextStep}
                className="px-4 py-2 rounded-xl bg-[#263D2B] text-white text-xs font-semibold hover:bg-[#1f3123] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. VISUALLY ENGAGING HORIZONTAL TIMELINE ON DESKTOP & VERTICAL ON MOBILE */}
      <div className="space-y-6">
        
        {/* Progress Indicator */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#DCE1D8] shadow-xs space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#263D2B] animate-pulse" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#263D2B]">
                Process Progress Indicator
              </span>
            </div>
            <span className="font-mono text-xs font-bold text-[#10110F]">
              Step {activeStep.number} of 08 ({progressPercent}%)
            </span>
          </div>
          <div 
            className="w-full h-2.5 rounded-full bg-[#E8ECE4] overflow-hidden"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="Mehndi Process Step Progress"
          >
            <div 
              className="h-full bg-[#263D2B] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B] block">
              COMPLETE 8-STEP PROCESS TIMELINE
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal">
              Scroll the Timeline
            </h3>
          </div>
          
          {/* Desktop Left/Right Controls */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollTimeline('left')}
              className="p-2.5 rounded-full border border-[#DCE1D8] bg-white hover:border-[#263D2B] text-[#465640] hover:text-[#10110F] transition-all cursor-pointer shadow-2xs"
              aria-label="Scroll timeline left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollTimeline('right')}
              className="p-2.5 rounded-full border border-[#DCE1D8] bg-white hover:border-[#263D2B] text-[#465640] hover:text-[#10110F] transition-all cursor-pointer shadow-2xs"
              aria-label="Scroll timeline right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* DESKTOP: HORIZONTAL TIMELINE (Hidden on mobile) */}
        <div className="hidden lg:block">
          <div
            ref={scrollContainerRef}
            onScroll={handleHorizontalScroll}
            className="flex gap-4 overflow-x-auto pb-4 pt-2 scrollbar-thin select-none scroll-smooth"
          >
            {MEHNDI_APPLICATION_STEPS.map((s, idx) => {
              const isSelected = activeStepIndex === idx;
              return (
                <div
                  key={s.step}
                  onClick={() => handleSelectStep(idx)}
                  className={`flex-shrink-0 w-72 rounded-3xl border p-4 transition-all cursor-pointer bg-white group flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#263D2B] ring-2 ring-[#263D2B]/20 shadow-md bg-[#FBF9F4]'
                      : 'border-[#DCE1D8] hover:border-[#465640] hover:shadow-xs'
                  }`}
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900 mb-3">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 bg-white/95 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold text-[#263D2B]">
                        STEP {s.number}
                      </div>
                    </div>

                    <h4 className="font-serif text-base text-[#10110F] font-normal leading-snug group-hover:text-[#263D2B] transition-colors">
                      {s.title}
                    </h4>

                    <p className="text-[11px] text-[#6B7068] font-light line-clamp-3 mt-1.5 leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#DCE1D8]/60 flex items-center justify-between text-[10px] text-[#465640] mt-3">
                    <span className="font-semibold">{s.duration}</span>
                    <span className={`text-[11px] font-bold ${isSelected ? 'text-[#263D2B]' : 'text-[#6B7068]'}`}>
                      {isSelected ? 'Active •' : 'View →'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MOBILE & TABLET: VERTICAL TIMELINE (Visible < lg) */}
        <div className="lg:hidden relative pl-6 border-l-2 border-[#263D2B]/30 space-y-8 my-6">
          {MEHNDI_APPLICATION_STEPS.map((s, idx) => {
            const isSelected = activeStepIndex === idx;
            return (
              <div
                key={s.step}
                onClick={() => handleSelectStep(idx)}
                className="relative cursor-pointer group"
              >
                {/* Milestone Node on Connecting Line */}
                <div className={`absolute -left-[31px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-[#263D2B] border-white text-white shadow-xs'
                    : 'bg-white border-[#263D2B] text-[#263D2B]'
                }`}>
                  <span className="text-[9px] font-mono font-bold">{s.step}</span>
                </div>

                {/* Step Card */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? 'border-[#263D2B] bg-white shadow-sm ring-1 ring-[#263D2B]/20'
                    : 'border-[#DCE1D8] bg-[#FBF9F4]'
                }`}>
                  <div className="flex gap-3 items-center">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-16 h-16 rounded-xl object-cover border border-[#DCE1D8] flex-shrink-0"
                    />
                    <div>
                      <span className="text-[9.5px] font-mono font-bold text-[#263D2B] block">
                        STEP {s.number} • {s.duration}
                      </span>
                      <h4 className="font-serif text-base text-[#10110F] font-normal leading-tight">
                        {s.title}
                      </h4>
                      <p className="text-[11px] text-[#6B7068] line-clamp-2 mt-0.5">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. FINAL CTA: READY FOR YOUR MEHNDI? */}
      <div className="mt-16 sm:mt-20">
        <ScrollReveal className="rounded-3xl bg-white border border-[#DCE1D8] p-8 sm:p-14 text-center shadow-sm relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8]">
              <Calendar className="w-3.5 h-3.5 text-[#263D2B]" />
              <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
                PRIVATE ATELIER RESERVATION
              </span>
            </div>

            {/* Exact Heading Required */}
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal leading-tight">
              Ready for Your Mehndi?
            </h3>

            <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed max-w-lg mx-auto font-light">
              Experience Janki&apos;s authentic handcrafted Rajasthani henna ritual in our serene Ottawa private suite. 
              Personalized scaling, dark mahogany stain care, and transparent Canadian pricing.
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-3.5">
              {/* Working Button Connected to Existing Appointment Booking Flow */}
              <Link
                to="/book-appointment?service=bridal-mehndi"
                className="global-button !px-8 !py-4 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Mehndi Appointment</span>
              </Link>

              <a
                href="#choose-your-mehndi-design"
                className="global-button-secondary !px-7 !py-4 text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Choose Your Design
              </a>
            </div>

            <div className="pt-4 border-t border-[#DCE1D8] flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#6B7068]">
              <span>Ottawa Private Suite</span>
              <span>•</span>
              <span>100% Organic Henna</span>
              <span>•</span>
              <span>Direct Inquiries: <a href="tel:+16162550549" className="font-semibold text-[#10110F] hover:text-[#263D2B]">+1 (616) 255-0549</a></span>
            </div>
          </div>
        </ScrollReveal>
      </div>

    </section>
  );
}
