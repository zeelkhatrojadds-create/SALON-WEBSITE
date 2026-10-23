import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Clock, ArrowRight, Check, ShieldCheck, Heart, Star } from 'lucide-react';
import { salonDB } from '../../db/salonDatabase';
import SafeServiceImage from '../common/SafeServiceImage';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

// Subcategory tabs to quickly filter within the editorial section
const NAIL_TABS = [
  { id: 'all', label: 'All Nail Rituals' },
  { id: 'manicures', label: 'Manicures' },
  { id: 'pedicures', label: 'Pedicures' },
  { id: 'extensions', label: 'Gel & Extensions' },
  { id: 'art-care', label: 'Artistry & Care' }
];

export default function NailServicesSection({ onSelectCategory }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [services, setServices] = useState(() => salonDB.getServices());

  React.useEffect(() => {
    const sync = () => setServices(salonDB.getServices());
    const unsub = salonDB.subscribe(sync);
    return () => unsub();
  }, []);

  // Filter only nail services from master catalog
  const nailServices = useMemo(() => {
    return services.filter((s) => {
      const cat = String(s.category || '').toLowerCase();
      return cat === 'nails' || cat === 'nail-care' || cat === 'manicure';
    });
  }, [services]);

  // Tab filtering
  const displayedServices = useMemo(() => {
    if (activeTab === 'manicures') {
      return nailServices.filter(s => s.id.includes('manicure') && !s.id.includes('pedicure'));
    }
    if (activeTab === 'pedicures') {
      return nailServices.filter(s => s.id.includes('pedicure'));
    }
    if (activeTab === 'extensions') {
      return nailServices.filter(s => s.id.includes('extension') || s.id.includes('acrylic'));
    }
    if (activeTab === 'art-care') {
      return nailServices.filter(s => s.id.includes('art') || s.id.includes('repair') || s.id.includes('polish'));
    }
    return nailServices;
  }, [nailServices, activeTab]);

  const handleBookNow = (serviceId) => {
    navigate(`/book-appointment?service=${encodeURIComponent(serviceId)}`);
  };

  const handleExploreAll = () => {
    if (onSelectCategory) {
      onSelectCategory('nails');
      const el = document.getElementById('services-grid-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/services/nails');
    }
  };

  // Identify showcase hero service (French Manicure or Classic Manicure)
  const heroService = nailServices.find(s => s.id === 'french-manicure') || nailServices[0];
  const gridServices = activeTab === 'all' 
    ? nailServices.filter(s => s.id !== heroService?.id)
    : displayedServices;

  return (
    <section 
      id="nail-services-atelier"
      aria-labelledby="nail-section-heading"
      className="relative w-full py-16 sm:py-24 bg-[#F7F4ED] border-y border-[#DCE1D8] overflow-hidden"
    >
      {/* Subtle Luxury Atelier Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#A8B5A0]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#263D2B]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. EDITORIAL HEADER                                                       */}
        {/* ========================================================================= */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[#263D2B] shadow-2xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#465640] animate-pulse" />
            <span className="font-sans text-[11px] font-bold tracking-[0.24em] uppercase">
              THE ART OF NAILS
            </span>
          </div>

          <h2
            id="nail-section-heading"
            className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-normal text-[#10110F] tracking-tight leading-[1.12] mb-4"
          >
            Beautiful Nails. <span className="italic text-[#263D2B]">Beautiful You.</span>
          </h2>

          <p className="font-sans text-sm sm:text-base lg:text-lg text-[#6B7068] font-light leading-relaxed max-w-2xl mx-auto">
            From timeless manicures to creative nail art, discover nail treatments designed to complement your style.
          </p>

          {/* Action Button: EXPLORE ALL NAIL SERVICES */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              id="explore-all-nails-button"
              onClick={handleExploreAll}
              className="global-button inline-flex items-center gap-2.5 !px-7 !py-3 text-white text-xs font-bold uppercase tracking-[0.16em] shadow-sm transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-95"
            >
              <span>EXPLORE ALL NAIL SERVICES</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/book-appointment?category=nails"
              className="global-button-secondary inline-flex items-center gap-2 !px-7 !py-3 text-xs font-bold uppercase tracking-[0.16em] cursor-pointer"
            >
              <span>RESERVE NAIL APPOINTMENT</span>
            </Link>
          </div>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 2. SUBCATEGORY FILTER TABS                                                */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10 sm:mb-14">
          {NAIL_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-[38px] px-4 sm:px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.12em] transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#263D2B] text-white shadow-xs'
                    : 'bg-white text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED] border border-[#DCE1D8]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 3. HERO SPOTLIGHT CARD (Featured Large Editorial Showcase)               */}
        {/* ========================================================================= */}
        {activeTab === 'all' && heroService && (
          <ScrollReveal className="mb-10 sm:mb-14">
            <div className="group relative rounded-2xl bg-white border border-[#DCE1D8] hover:border-[#263D2B]/40 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                
                {/* Left: Large High-Resolution Editorial Nail Photography */}
                <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[420px] overflow-hidden bg-[#10110F]">
                  <SafeServiceImage
                    service={heroService}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none lg:hidden" />
                  
                  {/* Floating Luxury Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3.5 py-1 rounded-full bg-[#10110F]/85 backdrop-blur-md border border-white/20 text-[#F7F4ED] text-[10.5px] font-bold uppercase tracking-wider shadow-sm">
                      SIGNATURE RITUAL
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#263D2B] text-[10.5px] font-bold uppercase tracking-wider shadow-sm">
                      {heroService.categoryName || 'NAIL CARE'}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white lg:hidden">
                    <span className="font-serif text-2xl font-normal drop-shadow-md">
                      ${heroService.price} CAD
                    </span>
                    <span className="text-xs font-medium bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full">
                      {heroService.duration}
                    </span>
                  </div>
                </div>

                {/* Right: Editorial Information & Booking Panel */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white text-[#10110F]">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-2.5">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#465640]">
                        ATELIER FAVORITE
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-[#6B7068] font-sans">
                        <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                        <span>{heroService.duration}</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#10110F] leading-tight mb-3">
                      <Link 
                        to={`/services/nails/${heroService.slug || heroService.id}`}
                        className="hover:text-[#263D2B] transition-colors"
                      >
                        {heroService.name}
                      </Link>
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-[#6B7068] leading-relaxed mb-6 font-light">
                      {heroService.description}
                    </p>

                    {/* Benefits List */}
                    <div className="mb-6 space-y-2.5">
                      <span className="text-[10.5px] font-bold uppercase tracking-widest text-[#10110F] block">
                        TREATMENT BENEFITS
                      </span>
                      <ul className="space-y-2">
                        {(heroService.benefits || heroService.features || [
                          'Precision nail contouring and cuticle care',
                          'Ultra-fine crisp French tip definition',
                          'Long-wearing chip-resistant mirror shine'
                        ]).slice(0, 3).map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-[#465640] font-sans">
                            <span className="w-4 h-4 rounded-full bg-[#A8B5A0]/25 text-[#263D2B] flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                            </span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Price & Booking Call-to-Action */}
                  <div className="pt-6 border-t border-[#DCE1D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#6B7068] block">
                        INVESTMENT
                      </span>
                      <span className="font-serif text-2xl sm:text-3xl font-normal text-[#10110F]">
                        ${heroService.price} <span className="text-xs font-sans font-medium text-[#6B7068]">CAD</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Link
                        to={`/services/nails/${heroService.slug || heroService.id}`}
                        className="global-button-secondary !px-4 !py-2.5 text-xs font-bold uppercase tracking-wider"
                      >
                        DETAILS
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleBookNow(heroService.id)}
                        className="global-button !px-6 !py-2.5 text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer active:scale-95"
                      >
                        BOOK NOW
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </ScrollReveal>
        )}

        {/* ========================================================================= */}
        {/* 4. UNIFORM EDITORIAL CARD GRID (All Cards Exact Same Size & Equal Heights) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {gridServices.map((service) => {
            const isFeatured = service.featured;

            return (
              <ScrollReveal key={service.id} className="h-full flex flex-col">
                <div className="group h-full flex flex-col bg-white rounded-xl border border-[#DCE1D8] hover:border-[#263D2B]/50 transition-all duration-300 shadow-2xs hover:shadow-md overflow-hidden text-left">
                  
                  {/* Uniform 16:10 Image Container across ALL cards */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F7F4ED]">
                    <SafeServiceImage
                      service={service}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                    {/* Top Left: Category Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#F7F4ED]/95 backdrop-blur-md text-[#10110F] text-[10px] font-bold uppercase tracking-wider border border-[#DCE1D8] shadow-xs">
                      {service.categoryName || 'NAIL CARE'}
                    </div>

                    {/* Top Right: Duration Pill */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#10110F]/85 backdrop-blur-md text-white text-[10px] font-medium shadow-xs flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#A8B5A0]" />
                      <span>{service.duration}</span>
                    </div>

                    {/* Bottom Floating Price Pill */}
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#10110F] font-serif text-sm font-semibold shadow-xs">
                      ${service.price} CAD
                    </div>
                  </div>

                  {/* Body Content Panel */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Sub-label & Status with Fixed Height */}
                      <div className="flex items-center justify-between gap-2 mb-2 min-h-[20px]">
                        <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#465640]">
                          PRECISION TREATMENT
                        </span>
                        {isFeatured ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#263D2B] bg-[#263D2B]/8 px-2 py-0.5 rounded-full">
                            <Sparkles className="w-3 h-3 text-[#263D2B]" />
                            Popular
                          </span>
                        ) : (
                          <span className="invisible text-[10px] px-2 py-0.5" aria-hidden="true">&nbsp;</span>
                        )}
                      </div>

                      {/* Service Title with Uniform 2-Line Height */}
                      <h3 className="font-serif text-lg sm:text-[20px] font-normal text-[#10110F] leading-snug group-hover:text-[#263D2B] transition-colors mb-2 min-h-[3rem] flex items-center">
                        <Link to={`/services/nails/${service.slug || service.id}`} className="line-clamp-2">
                          {service.name}
                        </Link>
                      </h3>

                      {/* Description with Uniform 2-Line Height */}
                      <p className="font-sans text-xs sm:text-[13px] text-[#6B7068] line-clamp-2 leading-relaxed mb-4 font-light min-h-[2.5rem]">
                        {service.description}
                      </p>

                      {/* Benefits Pills with Guaranteed Uniform Height */}
                      <div className="flex flex-wrap gap-1.5 mb-5 min-h-[3.25rem] items-start content-start">
                        {service.benefits && service.benefits.slice(0, 2).map((benefit, bIdx) => (
                          <span 
                            key={bIdx}
                            className="text-[10.5px] px-2.5 py-1 rounded-md bg-[#F7F4ED] text-[#465640] border border-[#DCE1D8] font-normal inline-block max-w-[200px] truncate"
                            title={benefit}
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Row: Details & Book Now - Anchored to bottom */}
                    <div className="pt-4 border-t border-[#DCE1D8] flex items-center justify-between gap-3 mt-auto">
                      <Link
                        to={`/services/nails/${service.slug || service.id}`}
                        className="global-button-secondary !px-4 !py-2 text-[10.5px] font-bold uppercase tracking-wider"
                      >
                        DETAILS
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleBookNow(service.id)}
                        className="global-button flex-1 !px-4 !py-2 text-white text-[11px] font-bold uppercase tracking-wider shadow-xs cursor-pointer active:scale-95 text-center flex items-center justify-center gap-1.5"
                      >
                        <span>BOOK NOW</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 5. LUXURY ATELIER QUALITY ASSURANCE FOOTER BANNER                         */}
        {/* ========================================================================= */}
        <ScrollReveal className="mt-14 sm:mt-18 p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE1D8] shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-[#DCE1D8]">
            <div className="flex items-center gap-3.5 pt-4 md:pt-0">
              <div className="w-10 h-10 rounded-full bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-[#10110F]">Hospital-Grade Hygiene</h4>
                <p className="text-xs text-[#6B7068] font-sans">Single-use files, autoclaved steel tools & sanitized stations.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 pt-4 md:pt-0 md:pl-6">
              <div className="w-10 h-10 rounded-full bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-[#10110F]">Non-Toxic Polishes</h4>
                <p className="text-xs text-[#6B7068] font-sans">10-free, vegan & cruelty-free luxury lacquers & LED gels.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 pt-4 md:pt-0 md:pl-6">
              <div className="w-10 h-10 rounded-full bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-[#10110F]">Precise Slot Scheduling</h4>
                <p className="text-xs text-[#6B7068] font-sans">Duration-blocked appointments ensuring zero salon rushing.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
