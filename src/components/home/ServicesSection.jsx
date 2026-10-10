import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import salonDB from '../../db/salonDatabase';
import { CATEGORIES } from '../../data/servicesData';
import CategoryScrollTabs from '../common/CategoryScrollTabs';

import ServiceCard from '../common/ServiceCard';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState('threading');
  const [servicesData, setServicesData] = useState(() => salonDB.getServices());

  useEffect(() => {
    const unsub = salonDB.subscribe(() => {
      setServicesData(salonDB.getServices());
    });
    return () => unsub();
  }, []);

  const activeServices = servicesData.filter(s => s.active !== false);

  const displayedTreatments = activeServices.filter((s) => {
    const target = String(activeCategory).toLowerCase();
    const sCat = String(s.category || '').toLowerCase();
    return sCat === target || sCat.replace(/[^a-z0-9]+/g, '-') === target;
  }).slice(0, 8);

  return (
    <section id="services" className="w-full bg-[#F7F4ED] py-20 sm:py-28 border-t border-[#DCE1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">

        {/* Section heading */}
        <ScrollReveal className="text-center mb-12 sm:mb-16" stagger={true}>
          <div className="inline-flex items-center gap-3 text-[#263D2B] mb-4">
            <span className="w-8 h-px bg-[#263D2B]/50" />
            <span className="text-[11px] uppercase tracking-[0.22em] font-semibold">Master Treatment Menu</span>
            <span className="w-8 h-px bg-[#263D2B]/50" />
          </div>
          <h2 className="font-serif font-normal text-[#10110F] text-3xl sm:text-4xl lg:text-5xl leading-tight mb-3">
            Signature <span className="italic text-[#263D2B]">Treatments</span>
          </h2>
          <p className="text-[#6B7068] text-sm sm:text-base max-w-xl mx-auto font-sans">
            Every treatment is performed with luxury salon mastery, pure botanical ingredients, and private one-on-one appointments.
          </p>
        </ScrollReveal>

        {/* Category tabs with luxury auto-scroll and arrow controls */}
        <div className="mb-12">
          <CategoryScrollTabs
            categories={CATEGORIES}
            selectedId={activeCategory}
            onSelect={(id) => setActiveCategory(id)}
            showAll={false}
          />
        </div>

        {/* Service grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedTreatments.map((treatment) => (
            <ServiceCard key={treatment.id} service={treatment} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-14">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-[#263D2B] hover:bg-[#1C2E20] text-white text-xs font-bold uppercase tracking-widest px-10 py-4 rounded-full transition-all duration-200 shadow-md hover:scale-[1.02]"
          >
            VIEW ALL SERVICES
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/book-appointment"
            className="inline-flex items-center gap-2 bg-white hover:bg-[#F7F4ED] text-[#10110F] border border-[#263D2B] text-xs font-bold uppercase tracking-widest px-10 py-4 rounded-full transition-all duration-200 shadow-sm hover:scale-[1.02]"
          >
            BOOK APPOINTMENT
            <ArrowRight className="w-4 h-4 text-[#263D2B]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
