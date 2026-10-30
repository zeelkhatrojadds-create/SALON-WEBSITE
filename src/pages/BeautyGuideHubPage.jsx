import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BEAUTY_GUIDE_CATEGORIES } from '../data/beautyGuideData';
import BeforeAfterSection from '../components/beauty-guide/BeforeAfterSection';

export default function BeautyGuideHubPage() {
  useEffect(() => {
    document.title = 'Beauty Guide: Service Categories & Educational Guidance — GLAM GIRL BY JANKI';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen min-h-[100dvh] overflow-x-hidden bg-[#F7F4ED] text-[#10110F] font-sans selection:bg-[#263D2B] selection:text-white pt-24 sm:pt-28 pb-20">
      
      {/* ===================================================================== */}
      {/* 1. HERO SECTION                                                       */}
      {/* ===================================================================== */}
      <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 sm:pb-16 text-center">
        <div className="space-y-4 max-w-3xl mx-auto">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[#263D2B] text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.24em] shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
            <span>EDUCATIONAL SALON COMPENDIUM</span>
          </div>

          {/* Page Title */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-tight">
            Beauty Guide
          </h1>

          {/* Subtitle */}
          <p className="font-serif text-base sm:text-lg text-[#465640] italic">
            Informed Choices. Transparent Care. Beautiful Results.
          </p>

          {/* Educational Purpose Statement */}
          <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed max-w-2xl mx-auto font-light">
            Welcome to our dedicated Beauty Guide. This compendium is created exclusively for client education—offering in-depth explanations of salon treatments, step-by-step processes, preparation protocols, aftercare standards, and ingredient safety. Select any category below to explore its comprehensive guidance.
          </p>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* 2. MAIN CATEGORY CARDS GRID (PREMIUM TEXT-ONLY DESIGN)                */}
      {/* ===================================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Intro Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DCE1D8] pb-4 mb-8 sm:mb-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
              SERVICE KNOWLEDGE DIRECTORY
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F]">
              Explore Service Guidance by Category
            </h2>
          </div>
          <span className="text-xs text-[#6B7068] font-mono">
            {BEAUTY_GUIDE_CATEGORIES.length} Service Categories
          </span>
        </div>

        {/* Text-Only Responsive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 items-stretch">
          {BEAUTY_GUIDE_CATEGORIES.map((cat, idx) => {
            const indexNumber = String(idx + 1).padStart(2, '0');

            return (
              <Link
                key={cat.id}
                to={`/beauty-guide/${cat.slug}`}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-[#DCE1D8] shadow-xs hover:shadow-md hover:border-[#263D2B] transition-all duration-300 flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B] focus-visible:ring-offset-2 active:scale-[0.99] cursor-pointer"
              >
                {/* Card Top: Index and Tag */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#A8B5A0] group-hover:text-[#263D2B] transition-colors">
                      {indexNumber}
                    </span>
                    <span className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#465640] px-2.5 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] group-hover:border-[#263D2B]/30 transition-colors">
                      Guidance
                    </span>
                  </div>

                  {/* Category Name */}
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F] group-hover:text-[#263D2B] transition-colors leading-tight">
                      {cat.name}
                    </h3>
                    <p className="font-serif text-xs text-[#465640] italic mt-1 line-clamp-1">
                      {cat.subtitle}
                    </p>
                  </div>

                  {/* Summary Text */}
                  <p className="text-xs text-[#6B7068] leading-relaxed line-clamp-3 font-light">
                    {cat.summary}
                  </p>
                </div>

                {/* Card Bottom: Simple Text Link */}
                <div className="pt-6 mt-6 border-t border-[#DCE1D8] flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-[#263D2B] group-hover:text-[#10110F] transition-colors">
                  <span>Read Guidance</span>
                  <span className="text-sm transform group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ===================================================================== */}
        {/* 3. BEFORE & AFTER TRANSFORMATIONS SECTION                             */}
        {/* ===================================================================== */}
        <BeforeAfterSection />

        {/* ===================================================================== */}
        {/* 4. TRANSPARENCY & DISCLAIMER STATEMENT                                */}
        {/* ===================================================================== */}
        <section className="mt-16 sm:mt-24 p-6 sm:p-8 rounded-3xl bg-white border border-[#DCE1D8] shadow-xs text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
            EDUCATIONAL NOTICE
          </span>
          <h2 className="font-serif text-lg sm:text-xl font-normal text-[#10110F]">
            Guidance &amp; Client Safety Principles
          </h2>
          <p className="text-xs text-[#6B7068] leading-relaxed font-light">
            All guidance, timelines, and product information within the Beauty Guide are published solely for general educational purposes. Individual results, hair growth cycles, skin sensitivities, and healing rates naturally vary. Our recommendations do not substitute for dermatological or medical diagnosis.
          </p>
        </section>

      </main>
    </div>
  );
}
