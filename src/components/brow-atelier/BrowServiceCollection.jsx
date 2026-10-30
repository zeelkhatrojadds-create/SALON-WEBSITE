import React, { useState, useMemo } from 'react';
import { 
  Clock, 
  Check, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Search, 
  X, 
  Info, 
  Feather,
  Flame,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';
import SafeServiceImage from '../common/SafeServiceImage';

export default function BrowServiceCollection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalService, setModalService] = useState(null);

  // Retrieve approved brow-related services strictly from master salon database
  const approvedBrowServices = useMemo(() => {
    const services = salonDB.getServices() || [];
    // Filter services that explicitly target eyebrows or contain full brow shaping in their inclusions
    return services.filter((s) => {
      if (s.active === false) return false;
      const lowerId = (s.id || '').toLowerCase();
      const lowerName = (s.name || '').toLowerCase();
      
      // Known catalog brow treatments
      const isEyebrowSpecific = 
        lowerId === 'eyebrow-threading' || 
        lowerId === 'eyebrows-waxing' || 
        lowerId === 'sitara-full-face-threading' ||
        lowerName.includes('eyebrow') ||
        lowerName.includes('brow');

      return isEyebrowSpecific;
    });
  }, []);

  const filteredServices = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return approvedBrowServices;
    return approvedBrowServices.filter((s) => 
      s.name.toLowerCase().includes(q) ||
      (s.description && s.description.toLowerCase().includes(q)) ||
      (s.features && s.features.some(f => f.toLowerCase().includes(q))) ||
      (s.categoryName && s.categoryName.toLowerCase().includes(q))
    );
  }, [approvedBrowServices, searchQuery]);

  return (
    <section id="brow-services" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            AUTHENTIC ATELIER MENU
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          Approved Brow Services
        </h2>

        <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
          Every brow service is performed by certified beauty director Janki Khatroja using authentic, salon-approved pricing, actual treatment durations, and hospital-grade antibacterial organic thread.
        </p>

        {/* Informational Guidance Notice - Strictly No Booking */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-[11px] text-[#465640] max-w-xl text-left sm:text-center mt-2">
          <Info className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
          <span>
            <strong>Informational Catalog:</strong> Exact approved rates in Canadian Dollars (CAD). Reused directly from our master salon service menu with zero duplicate listings.
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#465640]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search approved brow services..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#DCE1D8] text-xs sm:text-sm text-[#10110F] placeholder-[#465640]/60 focus:outline-none focus:ring-1 focus:ring-[#263D2B] focus:border-[#263D2B] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#465640] hover:text-[#10110F] p-0.5"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-[#465640]">
          <span className="font-medium text-[#10110F]">{filteredServices.length}</span> approved treatments shown
        </div>
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredServices.map((service) => {
          const isThreading = service.category === 'threading';
          const isWaxing = service.category === 'waxing';

          return (
            <article
              key={service.id}
              className="group flex flex-col rounded-2xl bg-white border border-[#DCE1D8] overflow-hidden shadow-xs hover:shadow-md hover:border-[#263D2B]/40 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-56 w-full overflow-hidden bg-[#EAE7DC]">
                <SafeServiceImage
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Category & Badge Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-medium uppercase tracking-wider text-white">
                  {isThreading ? (
                    <Feather className="w-3 h-3 text-[#A8B5A0]" />
                  ) : (
                    <Flame className="w-3 h-3 text-[#A8B5A0]" />
                  )}
                  <span>{service.categoryName || (isThreading ? 'Threading' : 'Waxing')}</span>
                </div>

                {service.featured && (
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#263D2B] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    Popular
                  </div>
                )}

                {/* Duration Overlay */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] font-medium text-white/90 drop-shadow-sm">
                  <Clock className="w-3.5 h-3.5 text-[#A8B5A0]" />
                  <span>{service.duration || service.durationDisplay}</span>
                </div>
              </div>

              {/* Content Block */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h3 className="font-serif text-lg sm:text-xl font-medium text-[#10110F] group-hover:text-[#263D2B] transition-colors line-clamp-1">
                      {service.name}
                    </h3>
                    <div className="text-right flex-shrink-0">
                      <span className="text-lg sm:text-xl font-semibold text-[#10110F]">
                        ${service.price}
                      </span>
                      <span className="text-[10px] font-medium text-[#465640] ml-1 uppercase">CAD</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#465640] leading-relaxed line-clamp-2 mb-4">
                    {service.description}
                  </p>

                  {/* Highlights/What's included preview */}
                  {service.whatsIncluded && service.whatsIncluded.length > 0 && (
                    <ul className="space-y-1.5 mb-5 border-t border-[#DCE1D8]/70 pt-3">
                      {service.whatsIncluded.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-[11.5px] text-[#465640]">
                          <Check className="w-3.5 h-3.5 text-[#263D2B] flex-shrink-0" />
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* View Details CTA Button - Purely informational modal, no booking */}
                <button
                  type="button"
                  onClick={() => setModalService(service)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#F7F4ED] text-[#10110F] text-xs font-semibold hover:bg-[#263D2B] hover:text-white transition-all duration-200 border border-[#DCE1D8] group-hover:border-[#263D2B]"
                >
                  <span>View Details & Protocol</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Catalog Transparency Notice */}
      <div className="mt-12 rounded-2xl bg-white border border-[#DCE1D8] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5 justify-between">
        <div className="space-y-1.5 max-w-2xl text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-[#263D2B]">
            <ShieldCheck className="w-4 h-4 text-[#263D2B]" />
            <span>Salon Catalog Guarantee</span>
          </div>
          <p className="text-xs sm:text-sm text-[#465640] leading-relaxed">
            All prices and durations shown reflect our verified in-salon master registry. We honor your natural skin sensitivity with strict single-use disposables, medical-grade sanitization, and gentle organic aloe vera post-care.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2.5 flex-shrink-0 w-full sm:w-auto">
          <a
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#10110F] text-white text-xs font-medium hover:bg-[#263D2B] transition-colors"
          >
            <span>Explore Full 72-Service Catalog</span>
          </a>
        </div>
      </div>

      {/* Service Details Modal (Informational Only - No Booking) */}
      {modalService && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="brow-modal-title"
        >
          <div 
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#DCE1D8] overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative h-48 w-full bg-[#EAE7DC] flex-shrink-0">
              <SafeServiceImage
                src={modalService.image}
                alt={modalService.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <button
                type="button"
                onClick={() => setModalService(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="px-2.5 py-0.5 rounded-full bg-[#263D2B] text-[10px] font-bold uppercase tracking-wider text-white inline-block mb-1.5">
                  {modalService.categoryName || 'Brow Service'}
                </span>
                <h3 id="brow-modal-title" className="font-serif text-2xl font-normal leading-tight">
                  {modalService.name}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-[#465640]">
              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#465640]/70 tracking-wider block">
                    Approved Rate
                  </span>
                  <span className="text-base sm:text-lg font-bold text-[#10110F]">
                    ${modalService.price} CAD
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#465640]/70 tracking-wider block">
                    Duration
                  </span>
                  <span className="text-base sm:text-lg font-bold text-[#10110F] flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#263D2B]" />
                    {modalService.duration || modalService.durationDisplay}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-serif text-base text-[#10110F] font-medium mb-1.5">
                  Service Overview
                </h4>
                <p className="leading-relaxed">
                  {modalService.description}
                </p>
              </div>

              {/* What's Included */}
              {modalService.whatsIncluded && modalService.whatsIncluded.length > 0 && (
                <div>
                  <h4 className="font-serif text-base text-[#10110F] font-medium mb-2">
                    What's Included in This Service
                  </h4>
                  <ul className="space-y-2">
                    {modalService.whatsIncluded.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#263D2B] flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Hygiene & Sensitivity Guidance */}
              <div className="p-4 rounded-2xl bg-white border border-[#DCE1D8] space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#10110F]">
                  <AlertCircle className="w-4 h-4 text-[#263D2B]" />
                  <span>Atelier Hygiene Standards</span>
                </div>
                <p className="text-[11.5px] text-[#465640] leading-relaxed">
                  100% antibacterial twisted cotton thread or sensitive hypoallergenic wax. Hands and target areas are sanitized before and after treatment, followed by cooling pure aloe vera soothing gel.
                </p>
              </div>
            </div>

            {/* Modal Footer (Purely Informational Close, Strictly No Booking) */}
            <div className="p-4 sm:p-5 border-t border-[#DCE1D8] bg-[#F7F4ED] flex items-center justify-between gap-3">
              <span className="text-[11px] text-[#465640]">
                Informational studio compendium
              </span>
              <button
                type="button"
                onClick={() => setModalService(null)}
                className="px-5 py-2 rounded-full bg-[#10110F] text-white text-xs font-medium hover:bg-[#263D2B] transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
