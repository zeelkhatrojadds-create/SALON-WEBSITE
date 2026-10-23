import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

const EXPERIENCE_BLOCKS = [
  {
    number: '01',
    title: 'The Finishing Touch',
    description:
      'Every detail is carefully refined to complete your treatment, from styling and skin finishing to the final professional touches.'
  },
  {
    number: '02',
    title: 'A Moment for You',
    description:
      'Enjoy a calm, welcoming atmosphere where personalized attention and thoughtful care make your salon visit feel special.'
  },
  {
    number: '03',
    title: 'Leave Feeling Beautiful',
    description:
      'Step away feeling refreshed, confident, and ready to enjoy your finished look.'
  }
];

export default function ClosingExperienceSection() {
  return (
    <section 
      id="closing-experience" 
      className="w-full bg-[#FAF6F0] text-[#100C0D] py-20 sm:py-28 border-t border-[#E8E2D8] font-sans overflow-hidden"
      aria-label="The Closing Experience"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* ========================================================================= */}
        {/* 1. SECTION HEADING                                                        */}
        {/* ========================================================================= */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4" stagger={true}>
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F1E8] border border-[#CFA46A]/30 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CFA46A]" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.26em] text-[#CFA46A]">
              THE FINAL TOUCH
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#100C0D] leading-[1.08]">
            The Closing <span className="italic font-normal text-[#CFA46A]">Experience</span>
          </h2>

          {/* Supporting Text */}
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#5A524C] leading-relaxed max-w-2xl mx-auto font-light">
            Every beautiful experience deserves a beautiful finish. Discover the little details, thoughtful care, and finishing touches that make every visit to Glam Girl by Janki memorable.
          </p>

          {/* Thin Champagne Accent Divider */}
          <div className="w-14 h-[1.5px] bg-[#CFA46A] mx-auto rounded-full mt-2" />
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 2. PREMIUM VISUAL EDITORIAL COMPOSITION (3 AUTHENTIC PHOTOGRAPHS)          */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Large Main Feature Photograph (Left 7 Cols Desktop, Beautician Finishing Touches) */}
          <ScrollReveal className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#100C0D] border border-[#E8E2D8] shadow-md group">
              <picture>
                <source srcSet="/images/gallery/finishing-touch.webp" type="image/webp" />
                <img
                  src="/images/gallery/finishing-touch.jpg"
                  alt="Beautician applying the final finishing styling touches to client's hair and makeup at Glam Girl by Janki"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
                  loading="lazy"
                />
              </picture>

              {/* Gentle Warm Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#100C0D]/85 via-[#100C0D]/20 to-transparent pointer-events-none" />

              {/* Floating Editorial Label */}
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#CFA46A] block">
                    01 • ARTISAN FINISHING
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#F7F1E8] tracking-tight">
                    The Art of the Finishing Touch
                  </h3>
                  <p className="text-xs text-[#F7F1E8]/80 font-light max-w-md hidden sm:block">
                    Precision styling, soft veil setting, and final hair sculpting tailored to your aesthetic.
                  </p>
                </div>
                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#100C0D]/70 backdrop-blur-md border border-[#CFA46A]/30 text-[10px] uppercase tracking-wider text-[#CFA46A] flex-shrink-0">
                  <Sparkles className="w-3 h-3 text-[#CFA46A]" />
                  <span>Atelier Care</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column Stack (5 Cols Desktop: Arranged Products & Client Mirror) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-8">
            
            {/* Top Right: Neatly Arranged Products, Towels, Brushes */}
            <ScrollReveal delay={100} className="flex flex-col">
              <div className="relative w-full h-[240px] sm:h-[260px] lg:h-[255px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#100C0D] border border-[#E8E2D8] shadow-sm group">
                <picture>
                  <source srcSet="/images/gallery/salon-essentials.webp" type="image/webp" />
                  <img
                    src="/images/gallery/salon-essentials.jpg"
                    alt="Neatly arranged organic beauty elixirs, fresh rolled towels, and soft makeup brushes on a marble atelier counter"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
                    loading="lazy"
                  />
                </picture>

                <div className="absolute inset-0 bg-gradient-to-t from-[#100C0D]/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-[#CFA46A] block">
                    02 • CURATED BOTANICALS
                  </span>
                  <p className="font-serif text-sm sm:text-base text-[#F7F1E8] font-normal">
                    Fresh Linens &amp; Botanical Essentials
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Bottom Right: Happy Client Admiring Look in Salon Mirror */}
            <ScrollReveal delay={150} className="flex flex-col">
              <div className="relative w-full h-[240px] sm:h-[260px] lg:h-[255px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#100C0D] border border-[#E8E2D8] shadow-sm group">
                <picture>
                  <source srcSet="/images/gallery/client-mirror.webp" type="image/webp" />
                  <img
                    src="/images/gallery/client-mirror.jpg"
                    alt="Happy client warmly admiring her finished beauty look in an illuminated boutique salon mirror"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
                    loading="lazy"
                  />
                </picture>

                <div className="absolute inset-0 bg-gradient-to-t from-[#100C0D]/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-[#CFA46A] block">
                    03 • THE REVEAL
                  </span>
                  <p className="font-serif text-sm sm:text-base text-[#F7F1E8] font-normal">
                    Confidence in Every Reflection
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. EXPERIENCE DETAILS: THREE ELEGANT CONTENT BLOCKS                        */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 pt-4 sm:pt-6">
          {EXPERIENCE_BLOCKS.map((block, idx) => (
            <ScrollReveal 
              key={block.number} 
              delay={idx * 100}
              className="space-y-3 pt-4 border-t border-[#E8E2D8] transition-colors group"
            >
              {/* Number Label in Champagne Gold */}
              <div className="flex items-center justify-between">
                <span className="font-serif text-xl sm:text-2xl font-medium text-[#CFA46A] tracking-wider">
                  {block.number}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8E2D8] group-hover:bg-[#CFA46A] transition-colors" />
              </div>

              {/* Block Title */}
              <h3 className="font-serif text-xl sm:text-2xl text-[#100C0D] font-normal tracking-tight group-hover:text-[#CFA46A] transition-colors">
                {block.title}
              </h3>

              {/* Block Description */}
              <p className="font-sans text-xs sm:text-sm text-[#5A524C] leading-relaxed font-light">
                {block.description}
              </p>
            </ScrollReveal>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* 4. CLOSING CALL TO ACTION PANEL                                           */}
        {/* ========================================================================= */}
        <ScrollReveal className="relative rounded-3xl bg-[#F7F1E8] border border-[#E8E2D8] p-8 sm:p-14 lg:p-16 text-center shadow-xs overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#CFA46A]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            
            {/* CTA Heading */}
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#100C0D] tracking-tight leading-[1.12]">
              Your Next Beautiful Moment <span className="italic font-normal text-[#CFA46A]">Awaits.</span>
            </h3>

            {/* CTA Description */}
            <p className="font-sans text-xs sm:text-sm md:text-base text-[#5A524C] leading-relaxed max-w-xl mx-auto font-light italic">
              Make time for yourself and discover your next favorite beauty experience.
            </p>

            {/* Actions Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              
              {/* Primary Button */}
              <Link
                to="/book-appointment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[4px] bg-[#100C0D] hover:bg-[#1C1618] text-white text-xs font-bold uppercase tracking-[0.18em] shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer border border-[#100C0D]"
              >
                <span>BOOK YOUR APPOINTMENT</span>
                <span className="text-sm font-normal text-[#CFA46A]">→</span>
              </Link>

              {/* Secondary Text Link */}
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#100C0D] hover:text-[#CFA46A] transition-colors underline underline-offset-4 cursor-pointer"
              >
                <span>EXPLORE OUR SERVICES</span>
                <span className="text-sm font-normal">→</span>
              </Link>

            </div>

            {/* Subtle Reassurance Footer */}
            <div className="pt-4 border-t border-[#E8E2D8]/80 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[10.5px] uppercase tracking-widest text-[#5A524C] font-mono">
              <span>SINGLE-GUEST PRIVACY</span>
              <span>•</span>
              <span>OTTAWA ATELIER SUITE</span>
              <span>•</span>
              <span>NO ADVANCE DEPOSIT REQUIRED</span>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
