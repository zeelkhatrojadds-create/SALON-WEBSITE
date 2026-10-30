import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import salonDB from '../db/salonDatabase';
import { ALL_SERVICES } from '../data/servicesData';
import { getMergedThreadingServices } from '../data/threadingGuidanceData';

export default function ThreadingGuidancePage() {
  const navigate = useNavigate();

  // Retrieve live approved catalog services from database, fallback to ALL_SERVICES
  const [catalogServices, setCatalogServices] = useState(() => {
    try {
      const dbServices = salonDB.getServices();
      const threadingFromDb = dbServices.filter((s) => s.category === 'threading');
      if (threadingFromDb.length > 0) return threadingFromDb;
    } catch (e) {
      // fallback
    }
    return ALL_SERVICES.filter((s) => s.category === 'threading');
  });

  useEffect(() => {
    document.title = 'Threading Guidance & Service Compendium — GLAM GIRL BY JANKI';
    window.scrollTo(0, 0);

    const unsub = salonDB.subscribe(() => {
      try {
        const dbServices = salonDB.getServices();
        const threadingFromDb = dbServices.filter((s) => s.category === 'threading');
        if (threadingFromDb.length > 0) setCatalogServices(threadingFromDb);
      } catch (e) {}
    });
    return () => unsub();
  }, []);

  // Merge live catalog prices, durations, and names with detailed educational guidance
  const threadingServices = useMemo(() => {
    return getMergedThreadingServices(catalogServices);
  }, [catalogServices]);

  // Accordion state: by default, first service is open; can toggle individually
  const [openAccordions, setOpenAccordions] = useState({ 0: true });

  const toggleAccordion = (index) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const expandAll = () => {
    const all = {};
    threadingServices.forEach((_, idx) => {
      all[idx] = true;
    });
    setOpenAccordions(all);
  };

  const collapseAll = () => {
    setOpenAccordions({});
  };

  // Scroll to a specific service section
  const scrollToService = (index) => {
    setOpenAccordions((prev) => ({ ...prev, [index]: true }));
    const element = document.getElementById(`service-guide-${index}`);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen min-h-[100dvh] overflow-x-hidden bg-[#F7F4ED] text-[#10110F] font-sans selection:bg-[#263D2B] selection:text-white pt-24 sm:pt-28 pb-24">
      
      {/* ===================================================================== */}
      {/* 1. TOP BREADCRUMB & DUAL ACTIONS BAR                                   */}
      {/* ===================================================================== */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/beauty-guide"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#263D2B] hover:text-[#10110F] transition-colors py-2 px-3.5 rounded-full bg-white border border-[#DCE1D8] shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B]"
          >
            <span>&larr;</span>
            <span>Back to Beauty Guide</span>
          </Link>

          <Link
            to="/services/threading"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#465640] hover:text-[#10110F] transition-colors py-2 px-3.5 rounded-full bg-white border border-[#DCE1D8] shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B]"
          >
            <span>View All Threading Services in Catalog</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. EDITORIAL HERO BANNER                                              */}
      {/* ===================================================================== */}
      <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DCE1D8] shadow-xs space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[#263D2B] text-[10.5px] font-bold uppercase tracking-[0.24em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
            <span>EDUCATIONAL SERVICE GUIDANCE COMPENDIUM</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-tight">
            Threading Guidance
          </h1>

          <p className="font-serif text-base sm:text-lg text-[#465640] italic">
            Centuries-Old Precision Epilation, Detailed Line-by-Line Service Guidance &amp; Safety Protocols
          </p>

          <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed font-light max-w-3xl">
            Welcome to the comprehensive Threading guidance compendium. Every threading treatment from our approved salon catalog is outlined below with line-by-line guidance—explaining exactly what the service entails, anatomical focus areas, step-by-step procedures, clinical contraindications, preparation precautions, approved catalog pricing, and recommended aftercare.
          </p>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* 3. TABLE OF CONTENTS / QUICK JUMP NAVIGATION                          */}
      {/* ===================================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#DCE1D8] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DCE1D8] pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
                CATALOG NAVIGATION
              </span>
              <h2 className="font-serif text-lg sm:text-xl font-normal text-[#10110F]">
                All Existing Threading Services ({threadingServices.length})
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={expandAll}
                className="px-3 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[#263D2B] hover:text-[#10110F] hover:border-[#263D2B] font-medium transition-colors cursor-pointer"
              >
                Expand All
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="px-3 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[#6B7068] hover:text-[#10110F] hover:border-[#263D2B] font-medium transition-colors cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>

          <p className="text-xs text-[#6B7068] font-light">
            Click any service below to jump directly to its complete educational guidance:
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {threadingServices.map((svc, idx) => {
              const isOpen = !!openAccordions[idx];
              return (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => scrollToService(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isOpen
                      ? 'bg-[#263D2B] text-white shadow-2xs font-medium'
                      : 'bg-[#F7F4ED] text-[#10110F] border border-[#DCE1D8] hover:border-[#263D2B]'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-75">{String(idx + 1).padStart(2, '0')}</span>
                  <span>{svc.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. LINE-BY-LINE INDIVIDUAL SERVICE GUIDANCE ACCORDIONS                 */}
      {/* ===================================================================== */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {threadingServices.map((service, index) => {
          const isOpen = !!openAccordions[index];
          const serviceIndexStr = String(index + 1).padStart(2, '0');

          return (
            <article
              key={service.id}
              id={`service-guide-${index}`}
              className="bg-white rounded-3xl border border-[#DCE1D8] shadow-xs overflow-hidden transition-all duration-300"
            >
              {/* Accordion Trigger Header */}
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                aria-expanded={isOpen}
                className="w-full p-6 sm:p-8 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-[#F7F4ED]/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B]"
              >
                <div className="space-y-1.5 flex-1 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#263D2B]">
                      SERVICE {serviceIndexStr} OF {String(threadingServices.length).padStart(2, '0')}
                    </span>
                    <span className="text-[#6B7068]">•</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#465640] px-2 py-0.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8]">
                      {service.duration}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] px-2 py-0.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8]">
                      {service.price}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#10110F] leading-tight">
                    {service.name}
                  </h3>

                  <p className="text-xs text-[#6B7068] font-light">
                    Target Area: <strong className="font-medium text-[#10110F]">{service.targetArea}</strong>
                  </p>
                </div>

                {/* Plus / Minus Indicator */}
                <div className="w-9 h-9 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-center text-sm font-bold text-[#263D2B] shrink-0 mt-1 transition-transform">
                  {isOpen ? '—' : '+'}
                </div>
              </button>

              {/* Accordion Expanded Content (All 12 Modules Line by Line) */}
              {isOpen && (
                <div className="p-6 sm:p-8 pt-2 sm:pt-4 border-t border-[#DCE1D8] space-y-8 bg-white">
                  
                  {/* Line 1: Exact Service Name & Target Area */}
                  <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
                      1. EXACT SERVICE NAME &amp; CLASSIFICATION
                    </span>
                    <p className="font-serif text-lg font-normal text-[#10110F]">
                      {service.name}
                    </p>
                    <p className="text-xs text-[#6B7068] font-light">
                      Approved Salon Catalog Category: <span className="font-medium text-[#10110F]">Threading</span> • Target Area: <span className="font-medium text-[#10110F]">{service.targetArea}</span>
                    </p>
                  </div>

                  {/* Line 2: What Is This Service? */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
                      <h4 className="font-serif text-base font-semibold text-[#10110F]">
                        2. What Is This Service?
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#10110F] leading-relaxed font-light pl-3.5 border-l-2 border-[#DCE1D8]">
                      {service.whatIsThisService}
                    </p>
                  </section>

                  {/* Line 3: Purpose and Benefits */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
                      <h4 className="font-serif text-base font-semibold text-[#10110F]">
                        3. Purpose and Benefits
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#10110F] leading-relaxed font-light pl-3.5 border-l-2 border-[#DCE1D8]">
                      {service.purposeAndBenefits}
                    </p>
                  </section>

                  {/* Line 4: Who May Consider It? */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
                      <h4 className="font-serif text-base font-semibold text-[#10110F]">
                        4. Who May Consider It?
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#10110F] leading-relaxed font-light pl-3.5 border-l-2 border-[#DCE1D8]">
                      {service.whoMayConsiderIt}
                    </p>
                  </section>

                  {/* Line 5: Before the Treatment */}
                  <section className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
                      <h4 className="font-serif text-base font-semibold text-[#10110F]">
                        5. Before the Treatment
                      </h4>
                    </div>
                    <ul className="space-y-2 pl-3.5 border-l-2 border-[#DCE1D8] text-xs sm:text-sm text-[#10110F]">
                      {service.beforeTreatment.map((item, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#465640] mt-2 shrink-0" />
                          <span className="font-light leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Line 6: Step-by-Step Threading Process */}
                  <section className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
                      <h4 className="font-serif text-base font-semibold text-[#10110F]">
                        6. Step-by-Step Threading Process (Adapted for {service.name})
                      </h4>
                    </div>

                    <div className="space-y-2.5 pl-3.5 border-l-2 border-[#DCE1D8]">
                      {service.stepByStepProcess.map((stepItem) => (
                        <div
                          key={stepItem.step}
                          className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-start gap-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-[#263D2B] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs">
                            {stepItem.step}
                          </div>
                          <div className="space-y-0.5">
                            <h5 className="font-serif text-xs font-semibold text-[#10110F]">
                              {stepItem.title}
                            </h5>
                            <p className="text-xs text-[#6B7068] font-light leading-relaxed">
                              {stepItem.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Line 7: Benefits */}
                  <section className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
                      <h4 className="font-serif text-base font-semibold text-[#10110F]">
                        7. Benefits
                      </h4>
                    </div>
                    <ul className="space-y-1.5 pl-3.5 border-l-2 border-[#DCE1D8] text-xs sm:text-sm text-[#10110F]">
                      {service.benefits.map((benefit, benIdx) => (
                        <li key={benIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B] mt-2 shrink-0" />
                          <span className="font-light leading-relaxed">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Line 8 & 9: Estimated Duration and Approved Salon Price */}
                  <section className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
                        8. ESTIMATED DURATION
                      </span>
                      <p className="font-serif text-lg font-normal text-[#10110F]">
                        {service.duration || 'Duration to be confirmed'}
                      </p>
                      <p className="text-[11px] text-[#6B7068] font-light">
                        Approved catalog appointment duration for {service.name}.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
                        9. APPROVED SALON PRICE
                      </span>
                      <p className="font-serif text-lg font-normal text-[#263D2B]">
                        {service.price || 'Price on consultation'}
                      </p>
                      <p className="text-[11px] text-[#6B7068] font-light">
                        Transparent pricing in Canadian Dollars (CAD). Never estimated or invented.
                      </p>
                    </div>
                  </section>

                  {/* Line 10: Aftercare */}
                  <section className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
                      <h4 className="font-serif text-base font-semibold text-[#10110F]">
                        10. Aftercare
                      </h4>
                    </div>
                    <ul className="space-y-2 pl-3.5 border-l-2 border-[#DCE1D8] text-xs sm:text-sm text-[#10110F]">
                      {service.aftercare.map((care, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B] mt-2 shrink-0" />
                          <span className="font-light leading-relaxed">{care}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Line 11: Possible Reactions and Safety */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
                      <h4 className="font-serif text-base font-semibold text-[#10110F]">
                        11. Possible Reactions and Safety
                      </h4>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                      <p className="text-xs sm:text-sm text-[#10110F] leading-relaxed font-light">
                        {service.possibleReactionsAndSafety}
                      </p>
                    </div>
                  </section>

                  {/* Line 12: Frequently Asked Questions */}
                  <section className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
                      <h4 className="font-serif text-base font-semibold text-[#10110F]">
                        12. Frequently Asked Questions
                      </h4>
                    </div>

                    <div className="space-y-2.5 pl-3.5 border-l-2 border-[#DCE1D8]">
                      {service.faqs.map((faq, fIdx) => (
                        <div key={fIdx} className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1">
                          <h5 className="font-serif text-xs font-semibold text-[#10110F]">
                            Q: {faq.q}
                          </h5>
                          <p className="text-xs text-[#6B7068] font-light leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Educational Action Bar: Connected to Existing Booking Flow */}
                  <div className="pt-4 border-t border-[#DCE1D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs text-[#6B7068] font-light">
                      Ready to experience precision {service.name.toLowerCase()}?
                    </p>

                    <Link
                      to={`/book-appointment?service=${service.id}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#263D2B] hover:bg-[#1C2E20] text-white text-xs font-bold uppercase tracking-[0.16em] transition-all duration-200 shadow-2xs hover:scale-[1.01] active:scale-98 cursor-pointer text-center"
                    >
                      <span>Book This Service ({service.price})</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>

                </div>
              )}
            </article>
          );
        })}
      </main>

      {/* ===================================================================== */}
      {/* 5. GENERAL CLINICAL & DERMATOLOGICAL NOTICE                           */}
      {/* ===================================================================== */}
      <footer className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DCE1D8] shadow-xs text-center space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
            GENERAL THREADING SAFETY &amp; HYGIENE NOTICE
          </span>
          <h3 className="font-serif text-lg sm:text-xl font-normal text-[#10110F]">
            Transparent Care &amp; Clean Salon Protocols
          </h3>
          <p className="text-xs text-[#6B7068] leading-relaxed font-light max-w-3xl mx-auto">
            At GLAM GIRL BY JANKI, we use 100% antibacterial organic cotton thread. A fresh length of thread is drawn and tensioned for each client, never reused. Individual results and regrowth timelines vary naturally according to follicle cycles. All information within this guide is educational and does not constitute medical diagnosis or replace dermatological consultation.
          </p>

          <div className="pt-4">
            <Link
              to="/beauty-guide"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#263D2B] hover:text-[#10110F] transition-colors py-2.5 px-6 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B]"
            >
              <span>&larr;</span>
              <span>Back to Beauty Guide Compendium</span>
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
