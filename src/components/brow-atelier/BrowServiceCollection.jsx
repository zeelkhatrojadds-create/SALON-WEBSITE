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
  Scissors,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';
import SafeServiceImage from '../common/SafeServiceImage';

// Specific approved salon services that directly involve brow shaping, framing, and architecture
const BROW_SERVICE_IDS = [
  'eyebrow-threading',
  'eyebrows-waxing',
  'sitara-full-face-threading',
  'forehead-threading'
];

export default function BrowServiceCollection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalService, setModalService] = useState(null);

  // Retrieve approved brow services directly from master salon database
  const approvedBrowServices = useMemo(() => {
    const allServices = salonDB.getServices() || [];
    return allServices.filter(s => 
      s.active !== false && (
        BROW_SERVICE_IDS.includes(s.id) ||
        (s.name && s.name.toLowerCase().includes('eyebrow'))
      )
    );
  }, []);

  const filteredServices = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return approvedBrowServices;
    return approvedBrowServices.filter((s) => 
      s.name.toLowerCase().includes(q) ||
      (s.description && s.description.toLowerCase().includes(q)) ||
      (s.features && s.features.some(f => f.toLowerCase().includes(q))) ||
      (s.whatsIncluded && s.whatsIncluded.some(item => item.toLowerCase().includes(q)))
    );
  }, [approvedBrowServices, searchQuery]);

  return (
    <section id="brow-services" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
          <Scissors className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            AUTHENTIC SALON MENU
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          Approved Brow Services
        </h2>

        <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
          Every shaping ritual is personally performed by certified threading specialist Janki Khatroja using authentic, catalog-approved pricing, actual service durations, and 100% organic antibacterial thread.
        </p>

        {/* Informational Guidance Notice */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-[11px] text-[#465640] max-w-xl text-left sm:text-center mt-2">
          <Info className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
          <span>
            <strong>Informational Catalog:</strong> Exact approved rates in Canadian Dollars (CAD). Click any service card to view complete treatment inclusions and salon protocol.
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
            placeholder="Search approved brow treatments..."
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-[#DCE1D8] bg-white text-xs text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none focus:border-[#263D2B]"
          />
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-[#DCE1D8] space-y-3 max-w-md mx-auto">
          <h3 className="font-serif text-xl text-[#10110F]">No brow treatments matched your search</h3>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => {
            const priceDisplay = `$${service.price} CAD`;
            const durationDisplay = service.durationDisplay || service.duration || '15 min';

            return (
              <div
                key={service.id}
                className="group bg-white rounded-3xl border border-[#DCE1D8] overflow-hidden shadow-xs hover:shadow-md hover:border-[#263D2B]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Service Image */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-[#F7F4ED]">
                    <SafeServiceImage
                      src={service.image}
                      alt={service.name}
                      category={service.category || 'threading'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-[#10110F]/80 backdrop-blur-md text-[10px] font-medium text-white uppercase tracking-wider">
                        {service.categoryName || (service.category === 'waxing' ? 'Waxing' : 'Threading')}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 text-xs font-semibold text-[#10110F]">
                      <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                      <span>{durationDisplay}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg font-semibold text-[#10110F] leading-snug group-hover:text-[#263D2B] transition-colors">
                        {service.name}
                      </h3>
                      <div className="text-right flex-shrink-0">
                        <span className="font-serif text-base font-bold text-[#263D2B] block">
                          {priceDisplay}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#465640] line-clamp-3 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features list */}
                    {(service.whatsIncluded || service.features) && (
                      <div className="pt-2 border-t border-[#DCE1D8]/60 space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068]">
                          Service Inclusions:
                        </span>
                        <ul className="space-y-1">
                          {(service.whatsIncluded || service.features).slice(0, 3).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 text-[11px] text-[#465640]">
                              <Check className="w-3.5 h-3.5 text-[#263D2B] flex-shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action - Pure View Details (NO BOOKING BUTTONS) */}
                <div className="p-5 sm:p-6 pt-0 mt-auto">
                  <button
                    type="button"
                    onClick={() => setModalService(service)}
                    className="w-full py-2.5 px-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] hover:bg-[#263D2B] text-[#10110F] hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-2 group/btn shadow-2xs"
                  >
                    <span>View Treatment Details</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#465640] group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Service Details Modal */}
      {modalService && (
        <div
          className="fixed inset-0 z-50 bg-[#10110F]/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          onClick={() => setModalService(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-[#DCE1D8] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative h-56 sm:h-64 bg-[#F7F4ED] overflow-hidden rounded-t-3xl">
              <SafeServiceImage
                src={modalService.image}
                alt={modalService.name}
                category={modalService.category || 'threading'}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setModalService(null)}
                aria-label="Close treatment details"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-[#10110F] hover:bg-white flex items-center justify-center shadow-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#10110F]/85 backdrop-blur-md text-xs font-semibold text-white uppercase tracking-wider">
                  {modalService.categoryName || (modalService.category === 'waxing' ? 'Waxing' : 'Threading')}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-[#263D2B] shadow-xs">
                  ${modalService.price} CAD • {modalService.durationDisplay || modalService.duration || '15 min'}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#10110F] mb-2">
                  {modalService.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#465640] leading-relaxed">
                  {modalService.description}
                </p>
              </div>

              {/* What's Included */}
              {(modalService.whatsIncluded || modalService.features) && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#10110F] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#263D2B]" />
                    <span>Included in This Brow Treatment</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {(modalService.whatsIncluded || modalService.features).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-3 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8]">
                        <CheckCircle2 className="w-4 h-4 text-[#263D2B] flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-[#10110F] font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Atelier Quality Guarantee */}
              <div className="p-4 rounded-2xl bg-white border border-[#DCE1D8] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#263D2B]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>The Glam Girl Brow Standard</span>
                </div>
                <p className="text-[11.5px] text-[#465640] leading-relaxed">
                  Every treatment utilizes sterile, single-use organic cotton thread or low-temperature hypoallergenic botanical strip wax. Includes complimentary arch symmetry assessment and calming botanical aloe infusion.
                </p>
              </div>

              {/* Informational Notice (No Booking) */}
              <div className="pt-2 border-t border-[#DCE1D8] flex items-center justify-between">
                <span className="text-[11px] text-[#6B7068] italic">
                  Informational preview from Glam Girl by Janki service catalog.
                </span>
                <button
                  type="button"
                  onClick={() => setModalService(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#10110F] text-white text-xs font-semibold hover:bg-[#263D2B] transition-colors"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
