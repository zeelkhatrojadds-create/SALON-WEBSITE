import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Calendar, 
  Check, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  Search, 
  X, 
  Info, 
  HeartHandshake,
  Tag
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';
import SafeServiceImage from '../common/SafeServiceImage';

export default function LashServiceMenu({ onSelectServiceForConsultation }) {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalService, setModalService] = useState(null);

  // Fetch live services from master salon database
  const allLashServices = useMemo(() => {
    const services = salonDB.getServices() || [];
    return services.filter((s) => s.category === 'lashes' && s.active !== false);
  }, []);

  // Filtered lash services
  const filteredServices = useMemo(() => {
    return allLashServices.filter((s) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        s.name.toLowerCase().includes(q) ||
        (s.description && s.description.toLowerCase().includes(q)) ||
        (s.features && s.features.some(f => f.toLowerCase().includes(q)));

      if (!matchesSearch) return false;

      if (selectedFilter === 'all') return true;
      if (selectedFilter === 'extensions') {
        return (
          s.id.includes('extension') || 
          s.id.includes('volume') || 
          s.id.includes('hybrid') || 
          s.id.includes('classic')
        ) && !s.id.includes('removal') && !s.id.includes('refill');
      }
      if (selectedFilter === 'lifts') {
        return s.id.includes('lift') || s.id.includes('tint') || s.id.includes('natural');
      }
      if (selectedFilter === 'care') {
        return (
          s.id.includes('refill') || 
          s.id.includes('removal') || 
          s.id.includes('consultation') || 
          s.id.includes('bridal')
        );
      }
      return true;
    });
  }, [allLashServices, selectedFilter, searchQuery]);

  return (
    <section id="lash-service-menu" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            AUTHENTIC ATELIER SERVICE MENU
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          Approved Lash Artistry Services
        </h2>

        <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
          Every service is performed by our certified beauty directors with authentic, salon-approved pricing, actual service durations, and meticulous hypoallergenic care.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 sm:mb-10">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-[#DCE1D8] shadow-xs overflow-x-auto max-w-full">
          {[
            { id: 'all', label: `All Services (${allLashServices.length})` },
            { id: 'extensions', label: 'Lash Extensions' },
            { id: 'lifts', label: 'Lifts & Tints' },
            { id: 'care', label: 'Refills & Care' }
          ].map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#263D2B] text-white shadow-xs'
                    : 'text-[#465640] hover:text-[#10110F] hover:bg-[#F7F4ED]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#6B7068] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search approved lash treatments..."
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-[#DCE1D8] bg-white text-xs text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none focus:border-[#263D2B]"
          />
        </div>

      </div>

      {/* Service Cards Grid */}
      {filteredServices.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-[#DCE1D8] space-y-3">
          <Eye className="w-8 h-8 text-[#6B7068] mx-auto" />
          <h3 className="font-serif text-xl text-[#10110F]">No lash services matched your search</h3>
          <p className="text-xs text-[#6B7068]">Try searching with a different keyword or view all approved services.</p>
          <button
            type="button"
            onClick={() => { setSelectedFilter('all'); setSearchQuery(''); }}
            className="global-button-secondary !py-2 !px-4 text-xs font-semibold"
          >
            Reset Filters
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
                  
                  {/* Card Image */}
                  <div className="relative h-52 sm:h-56 overflow-hidden bg-[#F7F4ED]">
                    <SafeServiceImage
                      src={service.image}
                      alt={service.name}
                      category="lashes"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Price & Duration Badge Overlay */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#10110F]/90 backdrop-blur-md text-white font-mono text-xs font-semibold shadow-xs">
                        {priceDisplay}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#263D2B] font-mono text-[10.5px] font-bold flex items-center gap-1 shadow-xs">
                        <Clock className="w-3 h-3 text-[#263D2B]" />
                        <span>{service.duration || '45 min'}</span>
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

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 space-y-4">
                    
                    <div className="space-y-1">
                      <h3 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal group-hover:text-[#263D2B] transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-xs text-[#6B7068] line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Benefits Preview */}
                    {service.benefits && service.benefits.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                          Client Benefits:
                        </span>
                        <ul className="space-y-1 text-xs text-[#465640]">
                          {service.benefits.slice(0, 2).map((b, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-[#263D2B] flex-shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Suitable Occasions Pills */}
                    {service.suitableOccasions && service.suitableOccasions.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {service.suitableOccasions.slice(0, 2).map((occ, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-0.5 rounded-lg bg-[#F7F4ED] text-[#465640] text-[10.5px] border border-[#DCE1D8]"
                          >
                            {occ}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Aftercare snippet */}
                    {service.aftercareNotes && (
                      <div className="p-2.5 rounded-xl bg-[#FBF9F4] border border-[#DCE1D8] text-[11px] text-[#6B7068]">
                        <span className="font-semibold text-[#10110F]">Aftercare: </span>
                        <span className="line-clamp-1">{service.aftercareNotes}</span>
                      </div>
                    )}

                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 sm:p-6 pt-0 border-t border-[#DCE1D8]/60 flex items-center justify-between gap-2.5 mt-4">
                  <button
                    type="button"
                    onClick={() => setModalService(service)}
                    className="global-button-secondary w-full !py-2.5 !px-3.5 text-xs font-semibold text-center cursor-pointer hover:border-[#263D2B] transition-colors"
                  >
                    View Details &amp; Guidance →
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Detail Protocol Modal */}
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
                GLAM GIRL BY JANKI — ATELIER PROTOCOL
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
                  Ottawa Studio
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
                  What's Included in Your Ritual:
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

            {/* Benefits */}
            {modalService.benefits && modalService.benefits.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                  Client Benefits:
                </h4>
                <ul className="space-y-1.5 text-xs text-[#465640]">
                  {modalService.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#263D2B] flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Aftercare Specifics */}
            {modalService.aftercareNotes && (
              <div className="p-4 rounded-2xl bg-[#FBF9F4] border border-[#DCE1D8] space-y-1 text-xs">
                <div className="font-bold text-[#10110F] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#263D2B]" />
                  <span>Approved Aftercare Protocol</span>
                </div>
                <p className="text-[#465640] leading-relaxed">
                  {modalService.aftercareNotes}
                </p>
              </div>
            )}

            {/* Modal Actions */}
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
