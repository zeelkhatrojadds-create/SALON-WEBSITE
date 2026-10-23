import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Scissors, 
  Sparkles, 
  Palette, 
  Flower2, 
  ArrowRight
} from 'lucide-react';
import cleanFacialBg from '../assets/facial-atelier-clean.webp';
import salonInteriorImg from '../assets/atelier-salon-interior.webp';
import ScrollReveal from '../components/ScrollReveal/ScrollReveal';
import TreatmentProcessSection from '../components/treatments/TreatmentProcessSection';
import TreatmentPackagesSection from '../components/treatments/TreatmentPackagesSection';
import TimeBehindYourGlowSection from '../components/treatments/TimeBehindYourGlowSection';
import TreatmentFaqSection from '../components/treatments/TreatmentFaqSection';

const TREATMENT_CATEGORIES = [
  {
    id: 'hair-scalp',
    title: 'Hair & Scalp Care',
    description: 'Customized hair spas, precision haircuts, restorative botanical treatments, and hand-painted balayage.',
    icon: Scissors,
    link: '/treatments/hair-treatments',
    tag: 'Care & Styling'
  },
  {
    id: 'skin-facial',
    title: 'Skin & Facial Treatments',
    description: 'Targeted deep cleansing, cellular rejuvenation, and 24K gold radiance facials tailored to your skin.',
    icon: Sparkles,
    link: '/treatments/facial',
    tag: 'Skin Rituals'
  },
  {
    id: 'makeup-occasions',
    title: 'Makeup & Special Occasions',
    description: 'High-definition bridal artistry, party makeovers, dupatta styling, and intricate celebratory mehndi.',
    icon: Palette,
    link: '/treatments/makeup',
    tag: 'Bridal & Glam'
  },
  {
    id: 'body-relaxation',
    title: 'Body & Relaxation',
    description: 'Restorative Ayurvedic scalp massages, soothing body treatments, and gentle organic waxing.',
    icon: Flower2,
    link: '/treatments/massage',
    tag: 'Holistic Wellness'
  }
];

export default function TreatmentsPage() {
  useEffect(() => {
    document.title = 'Personalized Beauty Treatments — GLAM GIRL BY JANKI | Ottawa';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F7F4ED] text-[#10110F] selection:bg-[#263D2B] selection:text-white pt-[80px] sm:pt-[90px] lg:pt-[100px] pb-16 sm:pb-24 flex flex-col justify-center">
      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-8 sm:py-12 lg:py-16">
        
        {/* ========================================================================= */}
        {/* 1. HERO SECTION: INFORMATIONAL INTRODUCTION & 5-LINE BIOGRAPHY            */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE: INFORMATIONAL INTRODUCTION & 5-LINE BIOGRAPHY */}
          <ScrollReveal className="lg:col-span-6 space-y-6 sm:space-y-8 text-left" stagger={true}>
            
            {/* Small Forest-Green Eyebrow */}
            <div className="inline-flex items-center gap-3">
              <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.28em] text-[#263D2B]">
                SIGNATURE BEAUTY EXPERIENCE
              </span>
            </div>

            {/* Headings */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#10110F] tracking-tight leading-[1.08]">
                Treatments
              </h1>
              <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl italic font-normal text-[#263D2B]">
                Care Designed Around You
              </h2>
            </div>

            {/* Small Decorative Forest-Green Element */}
            <div className="w-14 h-[2px] bg-[#263D2B]" />

            {/* Exactly 5 Lines of General Treatment Biography */}
            <div className="font-sans text-sm sm:text-base text-[#6B7068] leading-[1.9] max-w-xl space-y-3 font-light">
              <p>
                Our treatments are thoughtfully designed to bring together beauty, care, and relaxation.
              </p>
              <p>
                Every experience is created with attention to detail and a focus on your individual needs.
              </p>
              <p>
                From refreshing beauty rituals to restorative salon care, we create moments that help you feel your best.
              </p>
              <p>
                Our professional approach combines quality products, refined techniques, and a calming salon atmosphere.
              </p>
              <p>
                Step into GLAM GIRL BY JANKI and enjoy a beautiful treatment experience created just for you.
              </p>
            </div>

          </ScrollReveal>

          {/* RIGHT SIDE: REUSED HERO SALON PHOTOGRAPH */}
          <ScrollReveal className="lg:col-span-6 flex justify-center lg:justify-end" delay={150}>
            <div className="relative w-full max-w-[560px] aspect-[4/5] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-[#DCE1D8] bg-white">
              <img
                src={cleanFacialBg}
                alt="Glam Girl by Janki treatment experience"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                }}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </ScrollReveal>

        </div>

        {/* ========================================================================= */}
        {/* 2. OUR TREATMENT PROCESS: 4-STEP CONNECTED TIMELINE JOURNEY               */}
        {/* ========================================================================= */}
        <TreatmentProcessSection />

        {/* ========================================================================= */}
        {/* 3. SIGNATURE TREATMENT PACKAGES (8 BEAUTY CATEGORIES & LIVE BOOKING)       */}
        {/* ========================================================================= */}
        <TreatmentPackagesSection />

        {/* ========================================================================= */}
        {/* 4. THE TIME BEHIND YOUR GLOW (EDITORIAL TWO-COLUMN LAYOUT)                */}
        {/* ========================================================================= */}
        <TimeBehindYourGlowSection />

        {/* ========================================================================= */}
        {/* 5. DISCOVER YOUR TREATMENT (EDITORIAL TWO-COLUMN LAYOUT)                  */}
        {/* ========================================================================= */}
        <section className="mt-20 sm:mt-28 lg:mt-36 pt-16 sm:pt-20 border-t border-[#DCE1D8]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: EDITORIAL TEXT & 4 CATEGORY CARDS */}
            <ScrollReveal className="lg:col-span-7 space-y-8 sm:space-y-10" stagger={true}>
              
              {/* Header Block */}
              <div className="space-y-3 sm:space-y-4">
                {/* Eyebrow Label */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
                  <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
                    YOUR BEAUTY, YOUR WAY
                  </span>
                </div>

                {/* Main Heading */}
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
                  Discover the Right Treatment for You
                </h2>

                {/* Description */}
                <p className="font-sans text-sm sm:text-base text-[#6B7068] leading-relaxed max-w-2xl font-light">
                  Explore personalized beauty treatments designed to care for your skin, hair, and overall well-being. Find the experience that best suits your beauty goals.
                </p>

                {/* Subtle Decorative Forest Green Accent Line */}
                <div className="w-12 h-[2px] bg-[#263D2B] rounded-full pt-0.5" />
              </div>

              {/* Four Elegant Category Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-2">
                {TREATMENT_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <Link
                      key={cat.id}
                      to={cat.link}
                      className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#DCE1D8] hover:border-[#263D2B] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-5 cursor-pointer hover:-translate-y-1"
                    >
                      {/* Top: Icon + Badge */}
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-center text-[#263D2B] group-hover:bg-[#263D2B] group-hover:text-white transition-colors duration-300">
                          <Icon className="w-4 h-4 stroke-[2]" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#465640] bg-[#F7F4ED] px-2.5 py-1 rounded-full border border-[#DCE1D8]/60">
                          {cat.tag}
                        </span>
                      </div>

                      {/* Middle: Title & Short Description */}
                      <div className="space-y-2">
                        <h3 className="font-serif text-lg sm:text-xl font-normal text-[#10110F] tracking-tight group-hover:text-[#263D2B] transition-colors leading-snug">
                          {cat.title}
                        </h3>
                        <p className="font-sans text-xs sm:text-[13px] text-[#6B7068] leading-relaxed font-light">
                          {cat.description}
                        </p>
                      </div>

                      {/* Bottom: EXPLORE TREATMENTS Link */}
                      <div className="pt-2 border-t border-[#DCE1D8]/70 flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#263D2B] group-hover:text-[#10110F] transition-colors">
                        <span>EXPLORE TREATMENTS</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </Link>
                  );
                })}
              </div>

            </ScrollReveal>

            {/* RIGHT COLUMN: PREMIUM SALON TREATMENT IMAGE */}
            <ScrollReveal className="lg:col-span-5 flex justify-center lg:justify-end lg:sticky lg:top-28" delay={150}>
              <div className="relative w-full max-w-[500px] rounded-3xl overflow-hidden shadow-xl border border-[#DCE1D8] bg-white group">
                
                {/* Image Container with Responsive Aspect Ratio */}
                <div className="w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[3/4] overflow-hidden">
                  <img
                    src={salonInteriorImg}
                    alt="Glam Girl by Janki private luxury treatment atelier suite in Ottawa"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Subtle Luxury Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#10110F]/60 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Editorial Floating Pill */}
                <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#DCE1D8] shadow-sm flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
                      PRIVATE ATELIER SUITE
                    </span>
                    <span className="font-serif text-xs sm:text-sm text-[#10110F] font-normal block">
                      Single-Guest Luxury Sanctuary • Ottawa
                    </span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#263D2B] flex-shrink-0" />
                </div>

              </div>
            </ScrollReveal>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. FREQUENTLY ASKED QUESTIONS & BOTTOM CLOSING CTA                        */}
        {/* ========================================================================= */}
        <TreatmentFaqSection />

      </main>
    </div>
  );
}
