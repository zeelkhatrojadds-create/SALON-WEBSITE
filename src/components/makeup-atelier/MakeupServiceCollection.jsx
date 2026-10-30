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
  Tag
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';
import SafeServiceImage from '../common/SafeServiceImage';

export default function MakeupServiceCollection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalService, setModalService] = useState(null);

  // Retrieve approved makeup services directly from master salon database
  const approvedMakeupServices = useMemo(() => {
    const services = salonDB.getServices() || [];
    return services.filter((s) => s.category === 'makeup' && s.active !== false);
  }, []);

  const filteredServices = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return approvedMakeupServices;
    return approvedMakeupServices.filter((s) => 
      s.name.toLowerCase().includes(q) ||
      (s.description && s.description.toLowerCase().includes(q)) ||
      (s.features && s.features.some(f => f.toLowerCase().includes(q)))
    );
  }, [approvedMakeupServices, searchQuery]);

  return (
    <section id="makeup-services" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            AUTHENTIC ATELIER MENU
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          Approved Makeup Services
        </h2>

        <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
          Every service is performed by certified beauty director Janki Khatroja using authentic, salon-approved pricing, actual treatment durations, and professional hypoallergenic cosmetic kits.
        </p>

        {/* Informational Guidance Notice */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-[11px] text-[#465640] max-w-xl text-left sm:text-center mt-2">
          <Info className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
          <span>
            <strong>Informational Catalog:</strong> Exact approved rates in Canadian Dollars (CAD). Click any service card to view complete ritual inclusions and client benefits.
          </span>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="flex items-center justify-between gap-4 mb-8 sm:mb-10 max-w-md mx-auto">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#6B7068] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search approved makeup services..."
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-[#DCE1D8] bg-white text-xs text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none focus:border-[#263D2B]"
          />
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-[#DCE1D8] space-y-3 max-w-md mx-auto">
          <h3 className="font-serif text-xl text-[#10110F]">No makeup services matched your search</h3>
          <p className="text-xs text-[#6B7068]">Try searching with a different keyword or reset search.</p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="global-button-secondary !py-2 !px-4 text-xs font-semibold"
          >
            Reset Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredServices.map((service) => {
            const priceDisplay = service.price === 0 ? 'Complimentary' : `$${service.price} CAD`;
            return (
              <div
                key={service.id}
                className="group bg-white rounded-3xl border border-[#DCE1D8] overflow-hidden shadow-xs hover:shadow-md hover:border-[#263D2B]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  
                  {/* Service Image with Badges */}
                  <div className="relative h-52 sm:h-56 overflow-hidden bg-[#F7F4ED]">
                    <SafeServiceImage
                      src={service.image}
                      alt={service.name}
                      category="makeup"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Price Badge Overlay */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-[#10110F]/90 backdrop-blur-md text-white font-mono text-xs font-semibold shadow-xs">
                        {priceDisplay}
                      </span>
                    </div>

                    {/* Duration Badge Overlay */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#263D2B] font-mono text-[10.5px] font-bold flex items-center gap-1 shadow-xs">
                        <Clock className="w-3 h-3 text-[#263D2B]" />
                        <span>{service.duration || '60 min'}</span>
                      </span>
                    </div>

                    {service.featured && (
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#263D2B] text-white text-[9.5px] font-bold uppercase tracking-wider shadow-xs">
                          Studio Signature
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    
                    <div className="space-y-1">
                      <h3 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal group-hover:text-[#263D2B] transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-xs text-[#6B7068] line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* What's Included Preview */}
                    {service.whatsIncluded && service.whatsIncluded.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                          What's Included:
                        </span>
                        <ul className="space-y-1 text-xs text-[#465640]">
                          {service.whatsIncluded.slice(0, 2).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-[#263D2B] flex-shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Features Badges */}
                    {service.features && service.features.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {service.features.slice(0, 2).map((feat, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-0.5 rounded-lg bg-[#F7F4ED] text-[#465640] text-[10.5px] border border-[#DCE1D8]"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    )}

                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 sm:p-6 pt-0 border-t border-[#DCE1D8]/60 flex items-center justify-between gap-2.5 mt-4">
                  <button
                    type="button"
                    onClick={() => setModalService(service)}
                    className="global-button-secondary w-full !py-2.5 !px-3.5 text-xs font-semibold text-center cursor-pointer hover:border-[#263D2B] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Treatment Details &amp; Inclusions</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Service Details Protocol Modal */}
      {modalService && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setModalService(null)}
        >
          <div 
            className="w-full max-w-2xl bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setModalService(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-[#465640] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="space-y-2 pr-8">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B] block">
                GLAM GIRL BY JANKI — APPROVED MAKEUP SERVICE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F]">
                {modalService.name}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#465640]">
                <span className="font-mono font-bold text-base text-[#10110F]">
                  {modalService.price === 0 ? 'Complimentary' : `$${modalService.price} CAD`}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                  <span>Duration: {modalService.duration}</span>
                </span>
                <span>•</span>
                <span className="text-[#263D2B] font-semibold">
                  Ottawa Studio Sanctuary
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#465640] leading-relaxed">
              {modalService.description}
            </p>

            {/* What's Included */}
            {modalService.whatsIncluded && modalService.whatsIncluded.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                  What's Included in This Service:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {modalService.whatsIncluded.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs text-[#10110F]">
                      <Check className="w-3.5 h-3.5 text-[#263D2B] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features */}
            {modalService.features && modalService.features.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                  Highlights &amp; Artistry Elements:
                </h4>
                <ul className="space-y-1.5 text-xs text-[#465640]">
                  {modalService.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#263D2B] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Consultation Form Callout */}
            <div className="p-4 rounded-2xl bg-[#FBF9F4] border border-[#DCE1D8] space-y-2 text-xs">
              <span className="font-bold text-[#10110F] block">Interested in this service for your event?</span>
              <p className="text-[#465640] leading-relaxed">
                You can discuss <strong>{modalService.name}</strong> and share your event date and look preferences in our consultation form below.
              </p>
              <a
                href="#makeup-consultation"
                onClick={() => setModalService(null)}
                className="inline-flex items-center gap-1.5 font-bold text-[#263D2B] hover:text-[#10110F] pt-1"
              >
                <span>Proceed to Consultation Form</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Modal Actions - NO BOOKING */}
            <div className="pt-3 border-t border-[#DCE1D8] flex items-center justify-end">
              <button
                type="button"
                onClick={() => setModalService(null)}
                className="w-full sm:w-auto global-button !py-2.5 !px-6 text-white text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
