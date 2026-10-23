// GLAM GIRL BY JANKI — Your Nail Appointment Experience
// Interactive 5-step journey showing clients what to expect from discovery to finished look

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Calendar, 
  Sliders, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Clock, 
  ShieldCheck, 
  HeartHandshake, 
  Layers, 
  Phone, 
  Info, 
  Palette, 
  Brush,
  ChevronRight,
  Eye
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

export default function NailAppointmentExperience({
  selectedShape,
  selectedColor,
  selectedFinish,
  selectedArt,
  active3DNote,
  onApplyPreset
}) {
  const [activeStep, setActiveStep] = useState(1); // 1 to 5

  const journeySteps = [
    {
      number: '01',
      title: 'Discover Your Style',
      shortName: 'Discover Style',
      badge: 'EXPLORATION',
      icon: Compass,
      headline: 'Find the Aesthetic That Speaks Your Personal Style',
      description: 'Explore The Artistry Collection, Seasonal Nail Art, or the 3D Interactive Pattern Journal. Experiment with magnetic cat-eye shimmer in the optical lab, or design each fingertip individually in the 10-Finger Mix & Match Studio.',
      keyPoints: [
        'Curate inspiration from 10 signature Pattern Journal plates',
        'Simulate velvet magnetic cat-eye reflections live',
        'Save personal favorites for consultation discussion'
      ],
      primaryCta: {
        label: 'EXPLORE NAIL DESIGNS',
        href: '#artistry-collection',
        isAnchor: true
      },
      secondaryCta: {
        label: 'Try 10-Finger Mix & Match',
        href: '#mix-match-finger-designer',
        isAnchor: true
      },
      illustrationType: 'discover'
    },
    {
      number: '02',
      title: 'Choose Your Appointment',
      shortName: 'Book Service',
      badge: 'RESERVATION',
      icon: Calendar,
      headline: 'Reserve Private Sanctuary Time with Master Artist Janki',
      description: 'Select your preferred treatment from our transparent studio menu: Haute Gel Manicure with Russian cuticle care, BIAB builder overlay, or Apres Gel-X couture extensions. Check live real-time calendar availability in our Ottawa suite.',
      keyPoints: [
        'Single-guest private suite without rushed salon turnover',
        'Transparent Canadian rates ($65–$95 CAD) with verified durations',
        'Instant appointment confirmation & calendar sync'
      ],
      primaryCta: {
        label: 'BOOK YOUR APPOINTMENT',
        href: '/book-appointment?service=gel-manicure',
        isAnchor: false
      },
      secondaryCta: {
        label: 'View Full Treatment Menu',
        href: '#salon-catalog-pricing',
        isAnchor: true
      },
      illustrationType: 'booking'
    },
    {
      number: '03',
      title: 'Personalize Your Look',
      shortName: 'Personalize',
      badge: 'CUSTOMIZATION',
      icon: Sliders,
      headline: 'Fine-Tune Shape, Palette, Finish & Accent Details',
      description: 'Choose from 7 natural nail shapes (Almond, Coffin, Stiletto, Oval, Squoval, Square, Round). Select your signature lacquer shade, custom hex tones, frosted velvet or mirror chrome finishes, and fine-line hand-painted accents.',
      keyPoints: [
        '7 architectural nail shapes tailored to finger bed proportions',
        'Hypoallergenic, HEMA-free high-pigment gel palettes',
        'Optional 3D sculpted embellishments, pearls & charms'
      ],
      primaryCta: {
        label: 'CUSTOMIZE YOUR NAILS',
        href: '#nail-customizer-workbench',
        isAnchor: true
      },
      secondaryCta: {
        label: 'Choose Nail Shape',
        href: '#choose-nail-shape',
        isAnchor: true
      },
      illustrationType: 'customize'
    },
    {
      number: '04',
      title: 'Enjoy Your Nail Session',
      shortName: 'Salon Session',
      badge: 'ATELIER CARE',
      icon: Brush,
      headline: 'Relax Through Gentle Russian E-File Prep & Artisan Brushwork',
      description: 'Your unhurried visit begins with a 5-minute lifestyle consultation and medical-grade waterless e-file cuticle detailing. Watch each layer come to life — from protective rubber base to freehand liner brushwork and apex balancing.',
      keyPoints: [
        'Precision non-damaging waterless dry manicure',
        'Step-by-step creation using Japanese Kolinsky liner brushes',
        'Complimentary artisanal tea & calm private suite atmosphere'
      ],
      primaryCta: {
        label: 'DISCOVER THE PROCESS',
        href: '#behind-nail-design',
        isAnchor: true
      },
      secondaryCta: {
        label: 'Browse 3D Gallery',
        href: '#3d-nail-art-gallery',
        isAnchor: true
      },
      illustrationType: 'session'
    },
    {
      number: '05',
      title: 'Reveal Your Finished Look',
      shortName: 'Finished Look',
      badge: 'COUTURE REVEAL',
      icon: Sparkles,
      headline: 'Admire Flawless Diamond Shine & Long-Lasting Wear',
      description: 'Inspect your cured set under true studio lighting. Receive personalized organic jojoba aftercare recommendations and take home photo-worthy nails engineered to remain chip-resistant, glossy, and structural for 3 to 4 weeks.',
      keyPoints: [
        'High-gloss diamond seal with self-levelled architectural apex',
        'Daily jojoba & keratin aftercare routine guidance',
        'Seamless re-booking privileges for 3-week maintenance fills'
      ],
      primaryCta: {
        label: 'EXPLORE MORE DESIGNS',
        href: '#artistry-collection',
        isAnchor: true
      },
      secondaryCta: {
        label: 'Book Appointment Now',
        href: '/book-appointment?service=nail-art-addon',
        isAnchor: false
      },
      illustrationType: 'reveal'
    }
  ];

  const currentStepData = journeySteps[activeStep - 1];

  const handleNext = () => {
    if (activeStep < 5) setActiveStep(activeStep + 1);
  };

  const handlePrev = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  const handleResetToStart = () => {
    setActiveStep(1);
  };

  // Render authentic vector illustration corresponding to the active step
  const renderStepIllustration = (type) => {
    switch (type) {
      case 'discover':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full text-[#A8B5A0] overflow-visible">
            {/* Color Palette Fan */}
            <circle cx="100" cy="100" r="75" fill="none" stroke="#263D2B" strokeWidth="2" strokeDasharray="4 4" />
            <g transform="translate(100, 100)">
              {/* Radiating Swatch Rays */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <g key={i} transform={`rotate(${angle})`}>
                  <line x1="30" y1="0" x2="65" y2="0" stroke="#465640" strokeWidth="1.5" />
                  <circle cx="65" cy="0" r="7" fill={i % 2 === 0 ? '#263D2B' : '#E8A7A1'} stroke="#F7F4ED" strokeWidth="1.5" />
                </g>
              ))}
              {/* Central Compass Lens */}
              <circle cx="0" cy="0" r="24" fill="#18271B" stroke="#263D2B" strokeWidth="2" />
              <path d="M 0 -14 L 4 0 L 0 14 L -4 0 Z" fill="#F7F4ED" />
              <circle cx="0" cy="0" r="3" fill="#263D2B" />
            </g>
          </svg>
        );

      case 'booking':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full text-[#A8B5A0] overflow-visible">
            {/* Calendar Sanctuary Frame */}
            <rect x="35" y="40" width="130" height="120" rx="16" fill="#18271B" stroke="#263D2B" strokeWidth="2" />
            {/* Top Binder Bar */}
            <path d="M 35 56 C 35 47 42 40 51 40 L 149 40 C 158 40 165 47 165 56 L 165 68 L 35 68 Z" fill="#263D2B" />
            <circle cx="65" cy="54" r="3" fill="#F7F4ED" />
            <circle cx="135" cy="54" r="3" fill="#F7F4ED" />
            {/* Days Grid */}
            {[0, 1, 2].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={60 + col * 26}
                  cy={88 + row * 22}
                  r="5"
                  fill={row === 1 && col === 2 ? '#263D2B' : '#465640'}
                  stroke={row === 1 && col === 2 ? '#A8B5A0' : 'none'}
                  strokeWidth="1.5"
                />
              ))
            )}
            {/* Selected Booking Check Badge */}
            <circle cx="112" cy="110" r="10" fill="#263D2B" stroke="#F7F4ED" strokeWidth="1.5" />
            <path d="M 108 110 L 111 113 L 117 107" fill="none" stroke="#F7F4ED" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );

      case 'customize':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full text-[#A8B5A0] overflow-visible">
            {/* Stylized Almond Nail Preview */}
            <path
              d="M 70 160 C 70 170 130 170 130 160 L 128 85 C 126 55 108 30 100 26 C 92 30 74 55 72 85 Z"
              fill={selectedColor?.hex || '#263D2B'}
              stroke="#A8B5A0"
              strokeWidth="2"
            />
            {/* Specular Highlight */}
            <path
              d="M 82 50 C 80 85 82 130 84 150"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.4"
            />
            {/* Slider Adjustment Rails */}
            <line x1="25" y1="100" x2="55" y2="100" stroke="#465640" strokeWidth="2" />
            <circle cx="40" cy="100" r="6" fill="#263D2B" stroke="#A8B5A0" strokeWidth="1.5" />
            <line x1="145" y1="100" x2="175" y2="100" stroke="#465640" strokeWidth="2" />
            <circle cx="160" cy="100" r="6" fill="#263D2B" stroke="#A8B5A0" strokeWidth="1.5" />
          </svg>
        );

      case 'session':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full text-[#A8B5A0] overflow-visible">
            {/* Artist Hand & Precision Liner Brush */}
            <path
              d="M 60 160 C 60 170 120 170 120 160 L 118 95 C 116 70 104 48 90 42 C 76 48 64 70 62 95 Z"
              fill="#F5E5DC"
              stroke="#263D2B"
              strokeWidth="1.5"
            />
            {/* Brush Descending */}
            <g transform="translate(90, 30) rotate(-25)">
              <rect x="-5" y="-50" width="10" height="45" rx="3" fill="#465640" stroke="#263D2B" />
              <path d="M -4 -5 L -2 15 C -1 18 1 18 2 15 L 4 -5 Z" fill="#263D2B" />
              <circle cx="0" cy="12" r="2" fill="#F7F4ED" />
            </g>
            {/* Micro Lotus Flourish */}
            <circle cx="90" cy="100" r="3" fill="#263D2B" />
            <circle cx="82" cy="100" r="2" fill="#465640" />
            <circle cx="98" cy="100" r="2" fill="#465640" />
          </svg>
        );

      case 'reveal':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full text-[#A8B5A0] overflow-visible">
            {/* Finished Haute Nail with Radiating Starlight */}
            <path
              d="M 75 160 C 75 170 125 170 125 160 L 123 80 C 121 52 106 30 100 26 C 94 30 79 52 77 80 Z"
              fill="#263D2B"
              stroke="#A8B5A0"
              strokeWidth="2"
            />
            {/* Mirror Glass Arc */}
            <path d="M 85 45 C 83 75 85 125 87 145" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.5" strokeLinecap="round" />
            {/* Starlight Starburst 1 */}
            <g transform="translate(60, 60)">
              <line x1="-12" y1="0" x2="12" y2="0" stroke="#F7F4ED" strokeWidth="1.5" />
              <line x1="0" y1="-12" x2="0" y2="12" stroke="#F7F4ED" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="2" fill="#F7F4ED" />
            </g>
            {/* Starlight Starburst 2 */}
            <g transform="translate(140, 80) scale(0.7)">
              <line x1="-10" y1="0" x2="10" y2="0" stroke="#F7F4ED" strokeWidth="1.5" />
              <line x1="0" y1="-10" x2="0" y2="10" stroke="#F7F4ED" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="2" fill="#F7F4ED" />
            </g>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <section 
      id="appointment-experience" 
      className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-20 sm:pt-28 scroll-mt-24"
    >
      {/* ========================================================================= */}
      {/* 1. SECTION HEADER                                                         */}
      {/* ========================================================================= */}
      <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B] shadow-xs">
          <HeartHandshake className="w-3.5 h-3.5 text-[#263D2B]" />
          <span>CLIENT JOURNEY PROTOCOL</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
          Your Nail Appointment Experience
        </h2>

        <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

        <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto italic">
          &ldquo;From your first inspiration to your final flawless finish, every detail is designed around you.&rdquo;
        </p>

        {/* Quick Reset to Step 1 */}
        {activeStep > 1 && (
          <div className="pt-2">
            <button
              onClick={handleResetToStart}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DCE1D8] text-[11px] font-semibold text-[#465640] hover:text-[#10110F] shadow-2xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-[#263D2B]" />
              <span>Start Journey from Step 01</span>
            </button>
          </div>
        )}
      </ScrollReveal>

      {/* ========================================================================= */}
      {/* 2. INTERACTIVE 5-STEP JOURNEY TIMELINE                                    */}
      {/* ========================================================================= */}
      <div className="mb-10">
        
        {/* Desktop Horizontal Stepper (hidden on mobile) */}
        <div className="hidden lg:block relative mb-8">
          {/* Connector Line Behind Icons */}
          <div className="absolute top-1/2 left-10 right-10 -translate-y-1/2 h-0.5 bg-[#DCE1D8] z-0" />
          <div 
            className="absolute top-1/2 left-10 -translate-y-1/2 h-0.5 bg-[#263D2B] transition-all duration-500 z-0"
            style={{ width: `${((activeStep - 1) / 4) * 88}%` }}
          />

          <div className="relative z-10 grid grid-cols-5 gap-4">
            {journeySteps.map((step, idx) => {
              const stepNum = idx + 1;
              const isCurrent = activeStep === stepNum;
              const isCompleted = activeStep > stepNum;
              const StepIcon = step.icon;

              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(stepNum)}
                  className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                >
                  {/* Step Marker Circle */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isCurrent
                      ? 'bg-[#263D2B] text-white border-[#263D2B] ring-4 ring-[#263D2B]/20 scale-110 shadow-md'
                      : isCompleted
                      ? 'bg-[#18271B] text-[#A8B5A0] border-[#263D2B]'
                      : 'bg-white text-[#6B7068] border-[#DCE1D8] group-hover:border-[#263D2B]'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-[#A8B5A0]" />
                    ) : (
                      <StepIcon className="w-5 h-5" />
                    )}
                  </div>

                  {/* Step Number & Title */}
                  <div className="mt-3 space-y-0.5">
                    <span className={`text-[10px] font-mono font-bold tracking-widest uppercase block ${
                      isCurrent ? 'text-[#263D2B]' : 'text-[#6B7068]'
                    }`}>
                      STEP {step.number}
                    </span>
                    <span className={`text-xs font-semibold block transition-colors leading-tight ${
                      isCurrent ? 'text-[#10110F] font-bold' : 'text-[#6B7068] group-hover:text-[#10110F]'
                    }`}>
                      {step.shortName}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet Horizontal Scrollable Stepper */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none mb-6">
          {journeySteps.map((step, idx) => {
            const stepNum = idx + 1;
            const isCurrent = activeStep === stepNum;
            const StepIcon = step.icon;

            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(stepNum)}
                className={`flex-shrink-0 px-3.5 py-2 rounded-2xl border text-xs font-semibold tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                    : 'bg-white text-[#465640] border-[#DCE1D8]'
                }`}
              >
                <StepIcon className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px]">{step.number}</span>
                <span>{step.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* ======================================================================= */}
        {/* ACTIVE STAGE CARD: EDITORIAL DARK FRAME                                 */}
        {/* ======================================================================= */}
        <div className="bg-[#10110F] text-[#F7F4ED] rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-[#263D2B]/80 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column (5 cols): Visual Interactive Illustration */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full max-w-xs p-8 rounded-3xl bg-[#18271B]/60 border border-[#263D2B] shadow-inner text-center relative group">
                
                {/* Active Stage Eyebrow Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#263D2B] text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#A8B5A0] mb-4 shadow-xs">
                  <span>PHASE {currentStepData.number}</span>
                  <span>•</span>
                  <span>{currentStepData.badge}</span>
                </div>

                {/* SVG Illustration Container */}
                <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto relative flex items-center justify-center filter drop-shadow-xl">
                  {renderStepIllustration(currentStepData.illustrationType)}
                </div>

                <div className="mt-4 pt-3 border-t border-[#263D2B]/80 text-[11px] text-[#A8B5A0] font-light italic">
                  GLAM GIRL BY JANKI • Private Ottawa Suite Protocol
                </div>
              </div>
            </div>

            {/* Right Column (7 cols): Stage Narrative & Interactive CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2 border-b border-[#263D2B]/80 pb-4">
                <span className="text-[10px] font-mono tracking-widest text-[#A8B5A0] uppercase block">
                  STEP {currentStepData.number} OF 05 • {currentStepData.title}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight">
                  {currentStepData.headline}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#DCE1D8] font-light leading-relaxed pt-1">
                  {currentStepData.description}
                </p>
              </div>

              {/* Verified Atelier Key Points */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8B5A0] block">
                  EXPERIENCE HIGHLIGHTS
                </span>
                <ul className="space-y-2 text-xs text-[#DCE1D8]">
                  {currentStepData.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#A8B5A0] flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons: Primary & Secondary */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {currentStepData.primaryCta.isAnchor ? (
                  <a
                    href={currentStepData.primaryCta.href}
                    className="global-button !px-6 !py-3 text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span>{currentStepData.primaryCta.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <Link
                    to={currentStepData.primaryCta.href}
                    className="global-button !px-6 !py-3 text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span>{currentStepData.primaryCta.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}

                {currentStepData.secondaryCta.isAnchor ? (
                  <a
                    href={currentStepData.secondaryCta.href}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-[#263D2B] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>{currentStepData.secondaryCta.label}</span>
                  </a>
                ) : (
                  <Link
                    to={currentStepData.secondaryCta.href}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-[#263D2B] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>{currentStepData.secondaryCta.label}</span>
                  </Link>
                )}
              </div>

              {/* Stepper Navigation Footer */}
              <div className="pt-4 border-t border-[#263D2B]/80 flex items-center justify-between text-xs text-[#A8B5A0]">
                <button
                  onClick={handlePrev}
                  disabled={activeStep === 1}
                  className={`inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeStep === 1 ? 'opacity-30 cursor-not-allowed text-neutral-600' : 'hover:text-white'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous Step</span>
                </button>

                <span className="font-mono text-[11px]">
                  {activeStep} of 5
                </span>

                <button
                  onClick={handleNext}
                  disabled={activeStep === 5}
                  className={`inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeStep === 5 ? 'opacity-30 cursor-not-allowed text-neutral-600' : 'hover:text-white'
                  }`}
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. LIVE PERSONALIZED DESIGN SUMMARY & PREPARATION REMINDERS               */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        
        {/* Left Card (7 cols): Live Personalized Design Summary */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#263D2B]">
                <Palette className="w-3.5 h-3.5 text-[#263D2B]" />
                <span>YOUR CURRENT CUSTOMIZATION SELECTIONS</span>
              </div>
              <span className="text-[10.5px] text-[#465640] font-medium">
                Live Studio State
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal">
                {selectedArt?.name || 'Solid Couture Polish'}
              </h4>
              <p className="text-xs text-[#6B7068] font-light">
                {active3DNote 
                  ? active3DNote 
                  : 'Selections applied in the Customizer Workbench or Pattern Library will sync here automatically.'}
              </p>
            </div>

            {/* Selected Spec Pills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs">
              <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1">
                <span className="text-[9.5px] uppercase font-bold tracking-wider text-[#6B7068] block">
                  SHAPE
                </span>
                <span className="text-[#10110F] font-semibold block truncate">
                  {selectedShape?.name || 'Almond'}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1">
                <span className="text-[9.5px] uppercase font-bold tracking-wider text-[#6B7068] block">
                  COLORWAY
                </span>
                <div className="flex items-center gap-1.5 truncate">
                  <span 
                    className="w-3.5 h-3.5 rounded-full border border-black/10 flex-shrink-0"
                    style={{ backgroundColor: selectedColor?.hex || '#263D2B' }}
                  />
                  <span className="text-[#10110F] font-semibold truncate">
                    {selectedColor?.name || 'Forest Green'}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1">
                <span className="text-[9.5px] uppercase font-bold tracking-wider text-[#6B7068] block">
                  FINISH
                </span>
                <span className="text-[#10110F] font-semibold block truncate">
                  {selectedFinish?.name || 'Glossy'}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1">
                <span className="text-[9.5px] uppercase font-bold tracking-wider text-[#6B7068] block">
                  ART ACCENT
                </span>
                <span className="text-[#10110F] font-semibold block truncate">
                  {selectedArt?.name || 'None'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#DCE1D8]/80 flex flex-wrap items-center justify-between gap-3">
            <Link
              to={`/book-appointment?service=nail-art-addon&shape=${selectedShape?.id || 'almond'}&color=${encodeURIComponent(selectedColor?.name || 'Forest Green')}`}
              className="global-button !px-6 !py-3 text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <span>CONTINUE WITH THIS LOOK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href="#nail-customizer-workbench"
              className="text-xs font-semibold text-[#263D2B] hover:text-[#18271B] underline cursor-pointer"
            >
              Modify Choices in Customizer
            </a>
          </div>
        </div>

        {/* Right Card (5 cols): Appointment Preparation Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#263D2B]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>APPOINTMENT PREPARATION GUIDANCE</span>
            </div>

            <h4 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal">
              Preparing for Your Visit
            </h4>

            <p className="text-xs text-[#6B7068] font-light leading-relaxed">
              Help us deliver an exceptional experience by keeping these friendly reminders in mind prior to arriving at our Ottawa suite:
            </p>

            <ul className="space-y-2.5 pt-1 text-xs text-[#10110F]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B] mt-1.5 flex-shrink-0" />
                <span><strong>Arrive On Time:</strong> Arrive 5 minutes before your scheduled slot for an unhurried consultation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B] mt-1.5 flex-shrink-0" />
                <span><strong>Bring Inspo Photos:</strong> Feel free to share your saved Pattern Journal plates or customizer bookmarks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B] mt-1.5 flex-shrink-0" />
                <span><strong>Gentle Bare Nails:</strong> Avoid peeling or forcibly removing old enhancements; our gentle soak-off preserves natural keratin.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B] mt-1.5 flex-shrink-0" />
                <span><strong>Share Sensitivities:</strong> Let Janki know if you have sensitive skin, allergies, or prefer hypoallergenic HEMA-free gels.</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-[#DCE1D8]/80 flex items-center justify-between text-xs text-[#6B7068]">
            <span className="flex items-center gap-1 font-medium">
              <Phone className="w-3.5 h-3.5 text-[#263D2B]" />
              Questions? <a href="tel:+16162550549" className="text-[#10110F] font-semibold underline">+1 (616) 255-0549</a>
            </span>
            <span className="text-[11px] font-mono">Ottawa, ON</span>
          </div>
        </div>

      </div>

    </section>
  );
}
