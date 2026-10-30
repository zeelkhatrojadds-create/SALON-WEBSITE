import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  findBeautyGuideCategory,
  BEAUTY_GUIDE_CATEGORIES
} from '../data/beautyGuideData';
import NotFoundPage from './NotFoundPage';

export default function BeautyGuideDetailPage() {
  const { category: categorySlug } = useParams();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const categoryData = useMemo(() => {
    return findBeautyGuideCategory(categorySlug);
  }, [categorySlug]);

  useEffect(() => {
    if (categoryData) {
      document.title = `${categoryData.name} Guidance & Care Compendium — GLAM GIRL BY JANKI`;
      window.scrollTo(0, 0);
    }
  }, [categoryData]);

  if (!categoryData) {
    return <NotFoundPage />;
  }

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  // Find related category objects
  const relatedCategories = categoryData.relatedCategories
    ? categoryData.relatedCategories
        .map((slug) => findBeautyGuideCategory(slug))
        .filter(Boolean)
    : [];

  return (
    <div className="w-full min-h-screen min-h-[100dvh] overflow-x-hidden bg-[#F7F4ED] text-[#10110F] font-sans selection:bg-[#263D2B] selection:text-white pt-24 sm:pt-28 pb-20">
      
      {/* ===================================================================== */}
      {/* 1. TOP BREADCRUMB & BACK NAVIGATION                                    */}
      {/* ===================================================================== */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <Link
          to="/beauty-guide"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#263D2B] hover:text-[#10110F] transition-colors py-2 px-3 rounded-full bg-white border border-[#DCE1D8] shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B]"
        >
          <span>&larr;</span>
          <span>Back to Beauty Guide</span>
        </Link>
      </div>

      {/* ===================================================================== */}
      {/* 2. CATEGORY HERO HEADER                                               */}
      {/* ===================================================================== */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DCE1D8] shadow-xs space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[#263D2B] text-[10.5px] font-bold uppercase tracking-[0.2em]">
            <span>CATEGORY GUIDANCE COMPENDIUM</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-tight">
            {categoryData.name} Guidance
          </h1>

          <p className="font-serif text-base sm:text-lg text-[#465640] italic">
            {categoryData.subtitle}
          </p>

          <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed font-light">
            {categoryData.summary}
          </p>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* 3. MAIN COMPREHENSIVE GUIDANCE MODULES                                */}
      {/* ===================================================================== */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* 1. ABOUT THIS SERVICE CATEGORY */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-xs space-y-4">
          <div className="border-b border-[#DCE1D8] pb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
              SECTION 01
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F]">
              About This Service Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#10110F] leading-relaxed font-light">
            {categoryData.about}
          </p>
        </section>

        {/* 2. TYPES OF SERVICES */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-xs space-y-5">
          <div className="border-b border-[#DCE1D8] pb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
              SECTION 02
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F]">
              Types of Services in This Category
            </h2>
          </div>

          <div className="divide-y divide-[#DCE1D8]">
            {categoryData.typesOfServices.map((svc, sIdx) => (
              <div key={sIdx} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-serif text-base font-semibold text-[#10110F]">
                    {svc.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="font-bold text-[#263D2B]">{svc.price}</span>
                    <span className="text-[#6B7068]">•</span>
                    <span className="text-[#6B7068]">{svc.duration}</span>
                  </div>
                </div>
                <p className="text-xs text-[#6B7068] font-light leading-relaxed">
                  {svc.purpose}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. PURPOSE AND BENEFITS */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-xs space-y-4">
          <div className="border-b border-[#DCE1D8] pb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
              SECTION 03
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F]">
              Purpose and Benefits
            </h2>
          </div>
          <p className="text-xs text-[#6B7068] italic font-serif">
            Intended benefits without guaranteeing specific medical or physiological outcomes.
          </p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#10110F] pt-2">
            {categoryData.purposeAndBenefits.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B] mt-2 shrink-0" />
                <span className="leading-relaxed font-light">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 4. BEFORE YOUR APPOINTMENT */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-xs space-y-4">
          <div className="border-b border-[#DCE1D8] pb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
              SECTION 04
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F]">
              Before Your Appointment
            </h2>
          </div>
          <p className="text-xs text-[#6B7068] font-light">
            Preparation instructions and pre-service precautions to ensure a comfortable and safe appointment.
          </p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#10110F] pt-2">
            {categoryData.beforeAppointment.map((prep, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#465640] mt-2 shrink-0" />
                <span className="leading-relaxed font-light">{prep}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. STEP-BY-STEP PROCESS */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-xs space-y-5">
          <div className="border-b border-[#DCE1D8] pb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
              SECTION 05
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F]">
              Step-by-Step Process
            </h2>
          </div>
          <p className="text-xs text-[#6B7068] font-light">
            How treatments in this category are generally conducted from initial consultation to completion.
          </p>

          <div className="space-y-4 pt-2">
            {categoryData.stepByStepProcess.map((st) => (
              <div key={st.step} className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-full bg-[#263D2B] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs">
                  {st.step}
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-serif font-semibold text-sm text-[#10110F]">
                    {st.title}
                  </h3>
                  <p className="text-xs text-[#6B7068] leading-relaxed font-light">
                    {st.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. TIME AND PRICE INFORMATION */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-xs space-y-4">
          <div className="border-b border-[#DCE1D8] pb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
              SECTION 06
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F]">
              Time and Price Information
            </h2>
          </div>
          <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2">
            <p className="text-xs sm:text-sm text-[#10110F] leading-relaxed font-medium">
              {categoryData.timeAndPriceInfo}
            </p>
            <p className="text-[11px] text-[#6B7068] font-light">
              All prices are in Canadian Dollars (CAD) and reflect our approved salon catalog. Exact appointment times depend on hair length, density, and selected design complexity.
            </p>
          </div>
        </section>

        {/* 7. AFTERCARE GUIDANCE */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-xs space-y-4">
          <div className="border-b border-[#DCE1D8] pb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
              SECTION 07
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F]">
              Aftercare Guidance
            </h2>
          </div>
          <p className="text-xs text-[#6B7068] font-light">
            Recommended aftercare practices to protect your skin, maintain longevity, and prevent irritation.
          </p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#10110F] pt-2">
            {categoryData.aftercareGuidance.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B] mt-2 shrink-0" />
                <span className="leading-relaxed font-light">{rule}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 8. SAFETY INFORMATION */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-xs space-y-4">
          <div className="border-b border-[#DCE1D8] pb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
              SECTION 08
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F]">
              Safety Information &amp; Contraindications
            </h2>
          </div>
          <p className="text-xs text-[#6B7068] font-light">
            Important details on sanitation standards, contraindications, ingredient considerations, and normal temporary responses.
          </p>
          <ul className="space-y-3 text-xs sm:text-sm text-[#10110F] pt-2">
            {categoryData.safetyInformation.map((safe, idx) => (
              <li key={idx} className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] leading-relaxed font-light">
                {safe}
              </li>
            ))}
          </ul>
        </section>

        {/* 9. FREQUENTLY ASKED QUESTIONS */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-xs space-y-4">
          <div className="border-b border-[#DCE1D8] pb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
              SECTION 09
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 pt-2">
            {categoryData.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#DCE1D8] overflow-hidden transition-all bg-[#F7F4ED]"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white transition-colors"
                  >
                    <span className="font-serif text-sm font-semibold text-[#10110F]">
                      {faq.q}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#263D2B] shrink-0">
                      {isOpen ? '—' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-[#6B7068] leading-relaxed border-t border-[#DCE1D8]/60 bg-white font-light">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 10. RELATED GUIDANCE */}
        {relatedCategories.length > 0 && (
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-xs space-y-4">
            <div className="border-b border-[#DCE1D8] pb-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
                SECTION 10
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F]">
                Related Category Guidance
              </h2>
            </div>
            <p className="text-xs text-[#6B7068] font-light">
              Explore complementary educational guidance across our service catalog.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
              {relatedCategories.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/beauty-guide/${rel.slug}`}
                  className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] hover:border-[#263D2B] hover:bg-white transition-all text-left flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <h3 className="font-serif text-sm font-semibold text-[#10110F] group-hover:text-[#263D2B] transition-colors">
                      {rel.name}
                    </h3>
                    <p className="text-[11px] text-[#6B7068] mt-1 line-clamp-2 font-light">
                      {rel.subtitle}
                    </p>
                  </div>
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#263D2B] mt-3 block">
                    Read Guidance &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Back to Beauty Guide Navigation */}
        <div className="text-center pt-6">
          <Link
            to="/beauty-guide"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#263D2B] hover:text-[#10110F] transition-colors py-2.5 px-6 rounded-full bg-white border border-[#DCE1D8] shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B]"
          >
            <span>&larr;</span>
            <span>Back to Beauty Guide Compendium</span>
          </Link>
        </div>

      </main>
    </div>
  );
}
