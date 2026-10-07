import React, { useEffect } from 'react';
import cleanFacialBg from '../assets/facial-atelier-clean.webp';
import ScrollReveal from '../components/ScrollReveal/ScrollReveal';

export default function TreatmentsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F7F1E8] text-[#100C0D] selection:bg-[#CFA46A]/20 selection:text-[#100C0D] pt-[80px] sm:pt-[90px] lg:pt-[100px] pb-16 sm:pb-24 flex flex-col justify-center">
      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT SIDE: INFORMATIONAL INTRODUCTION & 5-LINE BIOGRAPHY                 */}
          {/* ========================================================================= */}
          <ScrollReveal className="lg:col-span-6 space-y-6 sm:space-y-8 text-left" stagger={true}>
            
            {/* Small Gold Eyebrow */}
            <div className="inline-flex items-center gap-3">
              <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.28em] text-[#CFA46A]">
                SIGNATURE BEAUTY EXPERIENCE
              </span>
            </div>

            {/* Headings */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#100C0D] tracking-tight leading-[1.08]">
                Treatments
              </h1>
              <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl italic font-normal text-[#CFA46A]">
                Care Designed Around You
              </h2>
            </div>

            {/* Small Decorative Gold Element */}
            <div className="w-14 h-[2px] bg-[#CFA46A]" />

            {/* Exactly 5 Lines of General Treatment Biography */}
            <div className="font-sans text-sm sm:text-base text-[#100C0D]/80 leading-[1.9] max-w-xl space-y-3">
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

          {/* ========================================================================= */}
          {/* RIGHT SIDE: REUSED HERO SALON PHOTOGRAPH                                  */}
          {/* ========================================================================= */}
          <ScrollReveal className="lg:col-span-6 flex justify-center lg:justify-end" delay={150}>
            <div className="relative w-full max-w-[560px] aspect-[4/5] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[#CFA46A]/20 bg-[#100C0D]">
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
      </main>
    </div>
  );
}
