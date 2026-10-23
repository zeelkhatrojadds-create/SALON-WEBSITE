import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

const SIGNATURE_LOOKS = [
  {
    id: 'radiant-bridal',
    tag: 'COUTURE BRIDAL',
    title: 'Radiant Bridal',
    description: 'Elegant bridal makeup, glowing skin, and refined finishing details tailored for your most cherished celebration.',
    highlights: ['16+ Hr Wear', 'Mink Lashes', 'Dupatta Placement'],
    image: '/floral-booking.webp',
    link: '/treatments/makeup',
    linkLabel: 'EXPLORE BRIDAL'
  },
  {
    id: 'soft-glam',
    tag: 'NATURAL RADIANCE',
    title: 'Soft Glam',
    description: 'Luminous skin, softly defined eyes, and natural-looking glamour for effortlessly polished elegance.',
    highlights: ['Dewy Complexion', 'Feathered Brows', 'Nude Lip'],
    image: '/hero-glam-girl.webp',
    link: '/treatments/makeup',
    linkLabel: 'EXPLORE SOFT GLAM'
  },
  {
    id: 'evening-elegance',
    tag: 'RED-CARPET COUTURE',
    title: 'Evening Elegance',
    description: 'Sophisticated makeup, statement eyes, and a polished evening look crafted for gala celebrations and special nights out.',
    highlights: ['Smoky Eyes', 'Velvet Contour', 'Bold Lip'],
    image: '/hero-campaign.webp',
    link: '/treatments/makeup',
    linkLabel: 'EXPLORE EVENING'
  },
  {
    id: 'modern-hair-artistry',
    tag: 'HAUTE COIFFURE',
    title: 'Modern Hair Artistry',
    description: 'Beautifully styled waves, dimensional Parisian balayage, and precision cutting designed to move with natural grace.',
    highlights: ['Balayage Melt', 'Bouncy Waves', 'Silk Gloss'],
    image: '/images/hair-care/58-noor-balayage.webp',
    link: '/treatments/hair-treatments',
    linkLabel: 'EXPLORE HAIR'
  },
  {
    id: 'glass-skin-radiance',
    tag: 'DERMAL RESTORATION',
    title: 'Glass Skin Radiance',
    description: 'Targeted cellular hydration, gentle botanical extraction, and 24K gold radiance facials for effortless clarity.',
    highlights: ['Hyaluronic Lift', 'Pure Botanicals', 'Lymphatic Jade'],
    image: '/facial-atelier-clean.webp',
    link: '/treatments/facial',
    linkLabel: 'EXPLORE FACIALS'
  },
  {
    id: 'festive-mehndi-couture',
    tag: 'CELEBRATORY ARTISTRY',
    title: 'Festive Mehndi & Styling',
    description: 'Intricate organic henna artistry, cultural storytelling motifs, and royal hair updos celebrating festive milestones.',
    highlights: ['100% Organic Henna', 'Dark Stain Seal', 'Royal Updos'],
    image: '/images/hair-care/50-bridal-hair-styling.webp',
    link: '/services/henna',
    linkLabel: 'EXPLORE HENNA'
  }
];

export default function SignatureLooksSection() {
  return (
    <section 
      id="signature-looks" 
      className="w-full bg-[#FAF6F0] text-[#100C0D] py-20 sm:py-28 border-t border-[#E8E2D8] font-sans overflow-hidden"
      aria-label="Signature Looks Gallery"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-20">
        
        {/* ========================================================================= */}
        {/* 1. SECTION HEADING                                                        */}
        {/* ========================================================================= */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4" stagger={true}>
          
          {/* Small Uppercase Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F1E8] border border-[#CFA46A]/30 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CFA46A]" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.26em] text-[#CFA46A]">
              THE ART OF BEAUTY
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#100C0D] leading-[1.08]">
            Signature <span className="italic font-normal text-[#CFA46A]">Looks</span>
          </h2>

          {/* Supporting Description */}
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#5A524C] leading-relaxed max-w-2xl mx-auto font-light">
            Discover our signature beauty styles, thoughtfully created to celebrate individuality, enhance natural beauty, and make every occasion unforgettable.
          </p>

          {/* Thin Champagne Accent Line */}
          <div className="w-14 h-[1.5px] bg-[#CFA46A] mx-auto rounded-full mt-2" />
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 2. SIGNATURE LOOK GALLERY GRID (6 CARDS)                                   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {SIGNATURE_LOOKS.map((look, idx) => (
            <ScrollReveal
              key={look.id}
              delay={idx * 80}
              className="flex flex-col"
            >
              <div className="group bg-white rounded-2xl sm:rounded-3xl border border-[#E8E2D8] hover:border-[#CFA46A] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden h-full">
                
                {/* Image Container with Luxury Overlay */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#100C0D]">
                  <img
                    src={look.image}
                    alt={`${look.title} signature beauty look by Glam Girl by Janki in Ottawa`}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Gradient Shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#100C0D]/80 via-[#100C0D]/10 to-transparent pointer-events-none" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#100C0D]/70 backdrop-blur-md border border-[#CFA46A]/30 text-[#CFA46A] text-[9.5px] font-bold tracking-[0.2em] uppercase font-mono">
                      {look.tag}
                    </span>
                  </div>

                  {/* Bottom Image Overlay Title */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#F7F1E8] tracking-tight">
                      {look.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-5 bg-white">
                  
                  {/* Description */}
                  <p className="font-sans text-xs sm:text-[13px] text-[#5A524C] leading-relaxed font-light">
                    {look.description}
                  </p>

                  {/* Highlights Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {look.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-[#F7F1E8] border border-[#E8E2D8] text-[10px] font-medium text-[#5A524C] font-mono uppercase tracking-wider"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Card Action Link */}
                  <div className="pt-3 border-t border-[#E8E2D8] flex items-center justify-between">
                    <Link
                      to={look.link}
                      className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#100C0D] group-hover:text-[#CFA46A] transition-colors cursor-pointer"
                    >
                      <span>{look.linkLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-[#CFA46A]" />
                    </Link>

                    <Link
                      to="/book-appointment"
                      className="text-[10px] uppercase tracking-wider text-[#5A524C] hover:text-[#100C0D] underline underline-offset-2 transition-colors font-mono"
                    >
                      Reserve Look
                    </Link>
                  </div>

                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Subtle Bottom Aesthetic Bar */}
        <ScrollReveal className="pt-4 border-t border-[#E8E2D8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5A524C]">
          <span className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#CFA46A]" />
            <span>Each signature look is customized to your face shape, skin undertone, and personal style.</span>
          </span>
          <Link
            to="/book-appointment"
            className="text-xs font-bold uppercase tracking-wider text-[#100C0D] hover:text-[#CFA46A] inline-flex items-center gap-1.5 underline underline-offset-4"
          >
            <span>Book A Bespoke Consultation</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </ScrollReveal>

      </div>
    </section>
  );
}
