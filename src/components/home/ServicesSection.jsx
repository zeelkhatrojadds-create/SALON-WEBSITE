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
    <section id="services" className="w-full bg-[#100C0D] py-20 sm:py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">

        {/* Section heading */}
        <ScrollReveal className="text-center mb-12 sm:mb-16" stagger={true}>
          <div className="inline-flex items-center gap-3 text-[#CFA46A] mb-4">
            <span className="w-8 h-px bg-[#CFA46A]/50" />
            <span className="text-[11px] uppercase tracking-[0.22em] font-semibold">Master 72-Treatment Menu</span>
            <span className="w-8 h-px bg-[#CFA46A]/50" />
          </div>
          <h2 className="font-serif font-normal text-[#F7F1E8] text-3xl sm:text-4xl lg:text-5xl leading-tight mb-3">
            Signature <span className="italic text-[#CFA46A]">Treatments</span>
          </h2>
          <p className="text-[#F7F1E8]/60 text-sm sm:text-base max-w-xl mx-auto">
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
            className="inline-flex items-center gap-2 bg-[#CFA46A] hover:bg-[#B88D57] text-[#100C0D] text-xs font-bold uppercase tracking-widest px-10 py-4 rounded-full transition-all duration-200 shadow-xl shadow-[#CFA46A]/20 hover:scale-[1.02]"
          >
            VIEW ALL SERVICES
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/book-appointment"
            className="inline-flex items-center gap-2 bg-[#CFA46A] hover:bg-[#B88D57] text-[#100C0D] text-xs font-bold uppercase tracking-widest px-10 py-4 rounded-full transition-all duration-200 shadow-xl shadow-[#CFA46A]/20 hover:scale-[1.02]"
          >
            BOOK APPOINTMENT
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
