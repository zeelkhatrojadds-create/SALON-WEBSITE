import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Clock, 
  Check, 
  X, 
  Sparkles, 
  ArrowRight, 
  Scissors 
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';

export default function HairServiceMenu({ onOpenConsultation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [modalService, setModalService] = useState(null);

  // Fetch live hair services from master salon database
  const [allServices, setAllServices] = useState(() => salonDB.getServices() || []);

  useEffect(() => {
    const handleUpdate = () => {
      setAllServices(salonDB.getServices() || []);
    };
    const unsub = salonDB.subscribe(handleUpdate);
    return () => unsub();
  }, []);

  // Filter only authentic hair categories
  const hairServices = useMemo(() => {
    return allServices.filter((s) => {
      const cat = (s.category || '').toLowerCase();
      const catName = (s.categoryName || '').toLowerCase();
      return (
        cat === 'hairstyling' || 
        cat === 'hair-cut' || 
        cat === 'hair-color' || 
        cat === 'hair-treatments' || 
        cat.includes('hair') ||
        catName.includes('hair')
      ) && s.active !== false;
    });
  }, [allServices]);

  // Apply search query and category tab filters
  const filteredServices = useMemo(() => {
    return hairServices.filter((s) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        s.name.toLowerCase().includes(q) ||
        (s.description && s.description.toLowerCase().includes(q)) ||
        (s.features && s.features.some((f) => f.toLowerCase().includes(q))) ||
        (s.benefits && s.benefits.some((b) => b.toLowerCase().includes(q))) ||
        (s.whatsIncluded && s.whatsIncluded.some((w) => w.toLowerCase().includes(q)));

      if (!matchesSearch) return false;

      if (selectedFilter === 'all') return true;
      if (selectedFilter === 'haircuts') return s.category === 'hair-cut';
      if (selectedFilter === 'colour') return s.category === 'hair-color';
      if (selectedFilter === 'treatments') return s.category === 'hair-treatments';
      if (selectedFilter === 'styling') return s.category === 'hairstyling';

      return true;
    });
  }, [hairServices, searchQuery, selectedFilter]);

  return (
    <section id="hair-service-menu" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#DCE1D8]">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] shadow-xs">
          <Scissors className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            AUTHENTIC MASTER HAIR CATALOG
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          Approved Hair Service Menu
        </h2>

        <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed font-light">
          Every service is performed exclusively by master aesthetician and stylist Janki Khatroja in our private single-guest Ottawa sanctuary, using authenticated pricing, durations, and clean formulations.
        </p>

        {/* Quick Consultation Callout */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => onOpenConsultation && onOpenConsultation()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#263D2B] hover:text-[#10110F] border-b border-[#263D2B] pb-0.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Need advice? Request a 1-on-1 hair consultation with Janki</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 sm:mb-10">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-[#DCE1D8] shadow-xs overflow-x-auto max-w-full">
          {[
            { id: 'all', label: `All Hair Services (${hairServices.length})` },
            { id: 'haircuts', label: 'Precision Haircuts (4)' },
            { id: 'colour', label: 'Balayage & Colour (5)' },
            { id: 'treatments', label: 'Spas & Treatments (4)' },
            { id: 'styling', label: 'Styling & Bridal (4)' }
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

        {/* Live Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#6B7068] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cuts, balayage, spas..."
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-[#DCE1D8] bg-white text-xs text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none focus:border-[#263D2B]"
          />
        </div>

      </div>

      {/* Service Cards Grid */}
      {filteredServices.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-[#DCE1D8] space-y-3">
          <Search className="w-8 h-8 text-[#6B7068] mx-auto" />
          <h3 className="font-serif text-xl text-[#10110F]">No hair services matched your search</h3>
          <p className="text-xs text-[#6B7068]">
            Try searching for a different keyword or reset filters to view all approved hair treatments.
          </p>
          <button
            type="button"
            onClick={() => { setSelectedFilter('all'); setSearchQuery(''); }}
            className="global-button-secondary !py-2 !px-4 text-xs font-semibold cursor-pointer"
          >
            View All Services
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="rounded-3xl bg-white border border-[#DCE1D8] overflow-hidden shadow-xs hover:border-[#263D2B] hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] bg-neutral-900 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = '/images/hair-care/50-bridal-hair-styling.webp';
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-[#10110F]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-white border border-white/10">
                    {service.categoryName || service.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-mono font-bold text-[#10110F] shadow-sm">
                    ${service.price} CAD
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="space-y-1">
                    <h4 className="font-serif text-xl text-[#10110F] font-normal group-hover:text-[#263D2B] transition-colors">
                      {service.name}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-[#6B7068] font-mono">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                        {service.durationDisplay || service.duration}
                      </span>
                      <span>&bull;</span>
                      <span>Ottawa Suite</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#465640] leading-relaxed line-clamp-2 font-light">
                    {service.description}
                  </p>

                  {/* Highlights Bullets */}
                  {service.features && service.features.length > 0 && (
                    <div className="space-y-1 pt-2 border-t border-[#DCE1D8]">
                      {service.features.slice(0, 2).map((feat, idx) => (
                        <div key={idx} className="text-[11px] text-[#6B7068] flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-[#263D2B] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => setModalService(service)}
                  className="global-button-secondary w-full !py-2.5 text-xs font-semibold cursor-pointer hover:border-[#263D2B] transition-colors"
                >
                  View Details &amp; Guidance →
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* ===================================================================== */}
      {/* FULL SERVICE DETAILS MODAL                                            */}
      {/* ===================================================================== */}
      {modalService && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setModalService(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative space-y-5 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalService(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-[#F7F4ED] text-[#6B7068] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex gap-4 items-center">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-neutral-900 border border-[#DCE1D8] shrink-0">
                <img src={modalService.image} alt={modalService.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#263D2B] block">
                  {modalService.categoryName || modalService.category}
                </span>
                <h3 className="font-serif text-2xl text-[#10110F]">{modalService.name}</h3>
                <div className="text-sm font-bold font-mono text-[#263D2B] mt-0.5">
                  ${modalService.price} CAD &bull; {modalService.durationDisplay || modalService.duration}
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#465640] leading-relaxed">
              {modalService.description}
            </p>

            {modalService.whatsIncluded && modalService.whatsIncluded.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2">
                <span className="text-xs font-bold text-[#10110F] block">What Is Included:</span>
                <div className="space-y-1.5">
                  {modalService.whatsIncluded.map((item, idx) => (
                    <div key={idx} className="text-xs text-[#465640] flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#263D2B] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {modalService.benefits && modalService.benefits.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-[#10110F] block">Service Benefits:</span>
                {modalService.benefits.map((b, idx) => (
                  <div key={idx} className="text-xs text-[#6B7068] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B] shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4 border-t border-[#DCE1D8] flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  const s = modalService;
                  setModalService(null);
                  if (onOpenConsultation) onOpenConsultation(s);
                }}
                className="global-button flex-1 !py-3 text-white text-xs font-bold uppercase tracking-wider text-center cursor-pointer"
              >
                Request Hair Consultation
              </button>
              <button
                type="button"
                onClick={() => setModalService(null)}
                className="global-button-secondary !py-3 !px-6 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
