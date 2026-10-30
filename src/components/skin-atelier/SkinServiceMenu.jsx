import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Calendar, 
  Check, 
  Sparkles, 
  Search, 
  X, 
  Info, 
  ArrowRight
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';
import SafeServiceImage from '../common/SafeServiceImage';
import { APPROVED_CUSTOMIZATION_OPTIONS } from './SkinConstants';

export default function SkinServiceMenu({ onOpenConsultation }) {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalService, setModalService] = useState(null);

  // Customization state inside modal
  const [selectedFocus, setSelectedFocus] = useState('focus-hydration');
  const [selectedRelaxation, setSelectedRelaxation] = useState('relax-massage');
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Fetch live services from master salon database
  const [allServices, setAllServices] = useState(() => salonDB.getServices() || []);

  useEffect(() => {
    const handleUpdate = () => {
      setAllServices(salonDB.getServices() || []);
    };
    const unsub = salonDB.subscribe(handleUpdate);
    return () => unsub();
  }, []);

  const facialServices = useMemo(() => {
    return allServices.filter((s) => s.category === 'facial' && s.active !== false);
  }, [allServices]);

  // Filtered facial treatments
  const filteredServices = useMemo(() => {
    return facialServices.filter((s) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        s.name.toLowerCase().includes(q) ||
        (s.description && s.description.toLowerCase().includes(q)) ||
        (s.features && s.features.some((f) => f.toLowerCase().includes(q))) ||
        (s.suitableSkinPreferences && s.suitableSkinPreferences.some((p) => p.toLowerCase().includes(q))) ||
        (s.benefits && s.benefits.some((b) => b.toLowerCase().includes(q)));

      if (!matchesSearch) return false;

      if (selectedFilter === 'all') return true;
      if (selectedFilter === 'cleansing') {
        return (
          s.id.includes('cleansing') || 
          s.id.includes('herbal') || 
          s.name.toLowerCase().includes('clean') ||
          s.name.toLowerCase().includes('acne')
        );
      }
      if (selectedFilter === 'brightening') {
        return (
          s.id.includes('brightening') || 
          s.id.includes('oxy') || 
          s.id.includes('golden') || 
          s.id.includes('diamond')
        );
      }
      if (selectedFilter === 'hydration') {
        return (
          s.id.includes('fruit') || 
          s.id.includes('herbal') || 
          s.id.includes('special-glam-girl')
        );
      }
      if (selectedFilter === 'express') {
        return (
          s.id.includes('express') || 
          s.id.includes('mini') || 
          s.id.includes('exfoliation')
        );
      }
      if (selectedFilter === 'luxury') {
        return (
          s.id.includes('special-glam-girl') || 
          s.id.includes('golden') || 
          s.id.includes('diamond') ||
          s.id.includes('consultation')
        );
      }
      return true;
    });
  }, [facialServices, selectedFilter, searchQuery]);

  const handleOpenModal = (service) => {
    setModalService(service);
    setSelectedFocus('focus-hydration');
    setSelectedRelaxation('relax-massage');
    setSelectedAddons([]);
  };

  const toggleAddon = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  // Compatible options for current modal service
  const compatibleFocusOptions = useMemo(() => {
    if (!modalService) return [];
    return APPROVED_CUSTOMIZATION_OPTIONS.careFocus.filter((f) => {
      if (f.compatibleWith.includes('all')) return true;
      return f.compatibleWith.includes(modalService.id);
    });
  }, [modalService]);

  const compatibleAddons = useMemo(() => {
    if (!modalService) return [];
    return APPROVED_CUSTOMIZATION_OPTIONS.approvedAddons.filter((a) => {
      if (a.compatibleWith.includes('all')) return true;
      return a.compatibleWith.includes(modalService.id);
    });
  }, [modalService]);

  return (
    <section id="skin-service-menu" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            AUTHENTIC ATELIER SERVICE MENU
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          Approved Skincare &amp; Facial Rituals
        </h2>

        <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed font-light">
          Every facial ritual is performed in a private single-guest Ottawa sanctuary by certified aesthetician Janki Khatroja, using authenticated salon catalog data, transparent Canadian pricing, and custom aftercare.
        </p>

        {/* Quick Consultation CTA */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => onOpenConsultation && onOpenConsultation()}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#263D2B] hover:text-[#1C2E20] border-b border-[#263D2B] pb-0.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Need guidance? Fill our complimentary Skin Consultation Form</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 sm:mb-10">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-[#DCE1D8] shadow-xs overflow-x-auto max-w-full">
          {[
            { id: 'all', label: `All Facials (${facialServices.length})` },
            { id: 'cleansing', label: 'Deep Cleansing & Clarifying' },
            { id: 'brightening', label: 'Radiance & Brightening' },
            { id: 'hydration', label: 'Hydration & Soothing' },
            { id: 'express', label: 'Express & Exfoliation' },
            { id: 'luxury', label: 'Luxury & Consultation' }
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
            placeholder="Search approved facials, benefits..."
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-[#DCE1D8] bg-white text-xs text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none focus:border-[#263D2B]"
          />
        </div>

      </div>

      {/* Service Cards Grid */}
      {filteredServices.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-[#DCE1D8] space-y-3">
          <Search className="w-8 h-8 text-[#6B7068] mx-auto" />
          <h3 className="font-serif text-xl text-[#10110F]">No facial services matched your search</h3>
          <p className="text-xs text-[#6B7068]">
            Try searching for a different keyword or view all approved facial services.
          </p>
          <button
            type="button"
            onClick={() => { setSelectedFilter('all'); setSearchQuery(''); }}
            className="global-button-secondary !py-2 !px-4 text-xs font-semibold cursor-pointer"
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
                      category="facial"
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

                    {/* Suitable Skin Preferences Badges */}
                    {service.suitableSkinPreferences && service.suitableSkinPreferences.length > 0 && (
                      <div className="space-y-1 pt-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                          Suitable Skin Types:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {service.suitableSkinPreferences.slice(0, 3).map((pref, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-[#F7F4ED] text-[#465640] text-[10.5px] border border-[#DCE1D8] font-medium"
                            >
                              {pref}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

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

                    {/* Aftercare Guidance Snippet */}
                    {service.aftercareNotes && (
                      <div className="p-2.5 rounded-xl bg-[#FBF9F4] border border-[#DCE1D8] text-[11px] text-[#6B7068]">
                        <span className="font-semibold text-[#10110F]">Aftercare: </span>
                        <span className="line-clamp-2">{service.aftercareNotes}</span>
                      </div>
                    )}

                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 sm:p-6 pt-0 border-t border-[#DCE1D8]/60 flex items-center justify-between gap-2.5 mt-4">
                  <button
                    type="button"
                    onClick={() => handleOpenModal(service)}
                    className="global-button-secondary w-full !py-2.5 !px-3.5 text-xs font-semibold text-center cursor-pointer hover:border-[#263D2B] transition-colors"
                  >
                    View Treatment Protocols &amp; Details →
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Service Details & Treatment Customization Modal */}
      {modalService && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalService(null);
          }}
        >
          <div className="w-full max-w-2xl bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto relative space-y-6 text-[#10110F]">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#DCE1D8] pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B] block">
                  THE SKIN ATELIER PROTOCOL
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                  {modalService.name}
                </h3>
                <div className="flex items-center gap-3 text-xs text-[#465640] pt-1">
                  <span className="font-bold text-[#10110F]">
                    {modalService.price === 0 ? 'Complimentary' : `$${modalService.price} CAD`}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                    {modalService.duration}
                  </span>
                  <span>•</span>
                  <span>Private Ottawa Suite</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalService(null)}
                className="p-2 rounded-full text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#465640] leading-relaxed">
              {modalService.description}
            </p>

            {/* Full Benefits */}
            {modalService.benefits && modalService.benefits.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#263D2B]">
                  Treatment Benefits
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {modalService.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#465640]">
                      <Check className="w-3.5 h-3.5 text-[#263D2B] flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's Included */}
            {modalService.whatsIncluded && modalService.whatsIncluded.length > 0 && (
              <div className="space-y-2 p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#263D2B]">
                  What&apos;s Included In This Ritual
                </h4>
                <ul className="space-y-1.5 text-xs text-[#465640]">
                  {modalService.whatsIncluded.map((step, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 4. SKIN TREATMENT CUSTOMIZATION */}
            {modalService.price > 0 && (
              <div className="space-y-4 pt-2 border-t border-[#DCE1D8]">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                      PERSONALIZATION OPTIONS
                    </span>
                    <h4 className="font-serif text-lg text-[#10110F]">
                      Customize Your Treatment
                    </h4>
                  </div>
                  <span className="text-[10.5px] px-2.5 py-0.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[#465640] font-semibold">
                    Salon-Approved Options
                  </span>
                </div>

                {/* Notice: Subject to salon approval */}
                <div className="p-3 rounded-xl bg-[#F7F4ED] border border-[#263D2B]/20 text-[11.5px] text-[#263D2B] flex items-center gap-2 font-medium">
                  <Info className="w-4 h-4 flex-shrink-0" />
                  <span>Final price and duration subject to salon approval.</span>
                </div>

                {/* Care Focus / Serum Infusion (Compatible only) */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#465640]">
                    Care Focus &amp; Serum Infusion
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {compatibleFocusOptions.map((opt) => {
                      const isSelected = selectedFocus === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedFocus(opt.id)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#F7F4ED] border-[#263D2B] ring-1 ring-[#263D2B]'
                              : 'bg-white border-[#DCE1D8] hover:bg-[#F7F4ED]/50'
                          }`}
                        >
                          <div className="text-xs font-semibold text-[#10110F]">{opt.name}</div>
                          <div className="text-[10px] text-[#465640] font-medium mt-0.5">{opt.tagline}</div>
                          <div className="text-[10.5px] text-[#6B7068] mt-1 leading-snug">{opt.description}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Relaxation Preferences */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#465640]">
                    Relaxation Atmosphere Preference
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {APPROVED_CUSTOMIZATION_OPTIONS.relaxationPreferences.map((rel) => {
                      const isSelected = selectedRelaxation === rel.id;
                      return (
                        <button
                          key={rel.id}
                          type="button"
                          onClick={() => setSelectedRelaxation(rel.id)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#263D2B] text-white border-[#263D2B]'
                              : 'bg-white border-[#DCE1D8] text-[#465640] hover:border-[#263D2B]'
                          }`}
                        >
                          <div className="text-xs font-semibold">{rel.name}</div>
                          <div className={`text-[10px] mt-0.5 leading-snug ${isSelected ? 'text-white/80' : 'text-[#6B7068]'}`}>
                            {rel.description}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Approved Add-ons (Compatible only) */}
                {compatibleAddons.length > 0 && (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#465640]">
                      Optional Approved Add-ons
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {compatibleAddons.map((addon) => {
                        const isChecked = selectedAddons.includes(addon.id);
                        return (
                          <div
                            key={addon.id}
                            onClick={() => toggleAddon(addon.id)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                              isChecked
                                ? 'bg-[#F7F4ED] border-[#263D2B]'
                                : 'bg-white border-[#DCE1D8] hover:border-[#263D2B]/50'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="mt-0.5 rounded border-[#DCE1D8] text-[#263D2B] focus:ring-[#263D2B]"
                            />
                            <div className="space-y-0.5 flex-1">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-semibold text-[#10110F]">{addon.name}</span>
                                <span className="font-mono text-[#263D2B] font-bold">+${addon.price} CAD</span>
                              </div>
                              <div className="text-[10px] text-[#6B7068]">{addon.description} ({addon.duration})</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* Aftercare Notes */}
            {modalService.aftercareNotes && (
              <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                  Post-Treatment Care Guidance
                </span>
                <p className="text-xs text-[#465640] leading-relaxed">
                  {modalService.aftercareNotes}
                </p>
              </div>
            )}

            {/* Modal Actions Footer */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#DCE1D8]">
              <button
                type="button"
                onClick={() => {
                  const service = modalService;
                  setModalService(null);
                  if (onOpenConsultation) onOpenConsultation(service);
                }}
                className="text-xs font-semibold text-[#263D2B] hover:text-[#10110F] flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fill Skin Consultation First</span>
              </button>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setModalService(null)}
                  className="global-button !py-2.5 !px-6 text-xs font-bold uppercase tracking-wider text-white cursor-pointer shadow-xs"
                >
                  Close Window
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
