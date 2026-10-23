import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Info, 
  Tag, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Star,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

// Helper to format validity date cleanly
function formatValidityDate(dateStr) {
  if (!dateStr) return '';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  } catch (e) {}
  return dateStr;
}

export default function SeasonalBeautyMenuSection() {
  const [highlights, setHighlights] = useState(() => salonDB.getPublicSeasonalHighlights());
  const [selectedItemForModal, setSelectedItemForModal] = useState(null);
  const [selectedSeasonFilter, setSelectedSeasonFilter] = useState('all');

  // Synchronize with database in real time (e.g. when admin changes publish status or dates)
  useEffect(() => {
    const syncHighlights = () => {
      setHighlights(salonDB.getPublicSeasonalHighlights());
    };

    syncHighlights();
    const unsub = salonDB.subscribe(syncHighlights);
    return () => unsub();
  }, []);

  // Filter highlights if user clicks a season filter pill
  const filteredHighlights = useMemo(() => {
    if (selectedSeasonFilter === 'all') return highlights;
    return highlights.filter(h => h.season === selectedSeasonFilter);
  }, [highlights, selectedSeasonFilter]);

  // Unique seasons present in published active list
  const availableSeasons = useMemo(() => {
    const set = new Set(highlights.map(h => h.season).filter(Boolean));
    return Array.from(set);
  }, [highlights]);

  // If no highlights are published or active, hide gracefully or show elegant fallback
  if (highlights.length === 0) {
    return null;
  }

  return (
    <section 
      id="seasonal-menu" 
      className="w-full relative py-16 sm:py-24 bg-[#F7F4ED] border-t border-[#DCE1D8] overflow-hidden text-[#10110F]"
    >
      {/* Background Ambience Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#263D2B]/5 rounded-full blur-3xl pointer-events-none -mt-20" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#465640]/5 rounded-full blur-3xl pointer-events-none -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER (Playfair Display, Forest Green Theme)                  */}
        {/* ========================================================================= */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4" stagger={true}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[#263D2B] text-xs font-bold uppercase tracking-[0.22em] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>SEASONAL BEAUTY MENU</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-tight">
            Discover the season. Embrace your glow.
          </h2>

          <p className="text-[#6B7068] text-sm sm:text-base leading-relaxed font-body font-light max-w-2xl mx-auto">
            Explore treatments and exclusive beauty packages thoughtfully selected for the season. Discover your next beauty ritual with personalized care from GLAM GIRL BY JANKI.
          </p>

          {/* Interactive Season Filters (if multiple seasons are configured) */}
          {availableSeasons.length > 1 && (
            <div className="pt-2 flex items-center justify-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setSelectedSeasonFilter('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedSeasonFilter === 'all'
                    ? 'bg-[#263D2B] text-white shadow-xs'
                    : 'bg-white border border-[#DCE1D8] text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED]'
                }`}
              >
                All Seasonal Highlights ({highlights.length})
              </button>
              {availableSeasons.map((season) => (
                <button
                  key={season}
                  type="button"
                  onClick={() => setSelectedSeasonFilter(season)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer capitalize ${
                    selectedSeasonFilter === season
                      ? 'bg-[#263D2B] text-white shadow-xs'
                      : 'bg-white border border-[#DCE1D8] text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED]'
                  }`}
                >
                  {season} Rituals
                </button>
              ))}
            </div>
          )}
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 2. SEASONAL HIGHLIGHTS RESPONSIVE GRID                                   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredHighlights.map((highlight, index) => {
            const origPrice = Number(highlight.originalPrice) || 0;
            const effectivePrice = Number(highlight.effectivePrice) || origPrice;
            const hasPromo = highlight.discountPercent > 0;
            const savings = Math.max(0, origPrice - effectivePrice);

            // Dynamic booking target
            const bookingUrl = highlight.itemType === 'package'
              ? `/book-appointment?combo=${encodeURIComponent(highlight.targetId)}`
              : `/book-appointment?service=${encodeURIComponent(highlight.targetId)}`;

            return (
              <ScrollReveal
                key={highlight.id}
                delay={index * 120}
                className="bg-white rounded-3xl border border-[#DCE1D8] hover:border-[#263D2B] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col overflow-hidden group"
              >
                {/* Image Container with Luxury Gradient Overlay */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F7F4ED]">
                  <img
                    src={highlight.image || '/facial-atelier-clean.webp'}
                    alt={highlight.title}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="250"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/facial-atelier-clean.webp';
                    }}
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

                  {/* Top Seasonal Label Badge */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs border border-[#DCE1D8] text-[#10110F] text-[10.5px] font-bold uppercase tracking-wider shadow-xs">
                    <Sparkles className="w-3 h-3 text-[#263D2B]" />
                    <span>{highlight.seasonalLabel}</span>
                  </div>

                  {/* Promotional Discount Pill */}
                  {hasPromo && (
                    <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-[#263D2B] text-white text-[10.5px] font-bold uppercase tracking-wider shadow-md">
                      {highlight.discountPercent}% OFF
                    </div>
                  )}

                  {/* Offer Validity Pill */}
                  {highlight.validUntil && (
                    <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-xs text-white text-[10px] font-medium tracking-wide">
                      <Clock className="w-3 h-3 text-amber-300" />
                      <span>Valid until {formatValidityDate(highlight.validUntil)}</span>
                    </div>
                  )}

                  {/* Featured Badge */}
                  {highlight.isFeatured && (
                    <div className="absolute bottom-3 right-3.5 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-[#10110F] text-[9.5px] font-bold uppercase tracking-wider shadow-xs">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Featured</span>
                    </div>
                  )}
                </div>

                {/* Card Content Area */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    
                    {/* Title & Short Description */}
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F] leading-snug group-hover:text-[#263D2B] transition-colors">
                        {highlight.title}
                      </h3>
                      <p className="text-xs text-[#6B7068] font-body mt-2 leading-relaxed line-clamp-3">
                        {highlight.description}
                      </p>
                    </div>

                    {/* Key Highlights / Benefits Bullet Points */}
                    {Array.isArray(highlight.benefits) && highlight.benefits.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-[#DCE1D8]/60">
                        {highlight.benefits.slice(0, 3).map((benefit, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2 text-[11.5px] text-[#10110F] leading-snug">
                            <Check className="w-3.5 h-3.5 text-[#263D2B] flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Price Matrix */}
                    <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#6B7068] block tracking-wider">
                          {hasPromo ? 'Special Seasonal Price' : 'Ritual Price'}
                        </span>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="font-serif text-2xl font-bold text-[#263D2B]">
                            ${effectivePrice} <span className="text-xs font-sans font-semibold">CAD</span>
                          </span>
                          {hasPromo && (
                            <span className="text-xs line-through text-[#6B7068] font-medium">
                              ${origPrice} CAD
                            </span>
                          )}
                        </div>
                      </div>

                      {hasPromo && (
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-[#263D2B] block uppercase tracking-wider">
                            Save ${savings} CAD
                          </span>
                          <span className="text-[9px] text-[#6B7068]">Limited season offer</span>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Dual Action Buttons: View Details & Book Now */}
                  <div className="pt-2 grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedItemForModal(highlight)}
                      className="global-button-secondary !py-2.5 !px-3 text-xs uppercase font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5 text-[#263D2B]" />
                      <span>View Details</span>
                    </button>

                    <Link
                      to={bookingUrl}
                      className="global-button !py-2.5 !px-3 text-xs uppercase font-bold flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md transition-all cursor-pointer"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom Salon Confidence Assurance Banner */}
        <div className="pt-4 border-t border-[#DCE1D8] flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-[#6B7068]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#263D2B]" />
            100% Admin Curated & Quality Verified
          </span>
          <span className="hidden sm:inline text-[#DCE1D8]">•</span>
          <span className="flex items-center gap-1.5">
            <CalendarCheck className="w-4 h-4 text-[#263D2B]" />
            Personalized Beauty Consultations Included
          </span>
          <span className="hidden sm:inline text-[#DCE1D8]">•</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#263D2B]" />
            Premium Botanical Products Only
          </span>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. LUXURY DETAIL MODAL (WHEN CUSTOMER CLICKS "VIEW DETAILS")             */}
      {/* ========================================================================= */}
      {selectedItemForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto animate-fade-in">
          <div className="bg-white w-full max-w-xl rounded-3xl border border-[#DCE1D8] shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] overflow-hidden bg-[#F7F4ED]">
              <img
                src={selectedItemForModal.image || '/facial-atelier-clean.webp'}
                alt={selectedItemForModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedItemForModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Top Seasonal Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[#10110F] text-[10.5px] font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3 h-3 text-[#263D2B]" />
                <span>{selectedItemForModal.seasonalLabel}</span>
              </div>

              {/* Title on Banner */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block mb-1">
                  {selectedItemForModal.itemType === 'package' ? 'Curated Beauty Package' : 'Seasonal Dermal Service'}
                </span>
                <h3 className="font-serif text-2xl font-normal leading-snug">
                  {selectedItemForModal.title}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7068] mb-2">
                  About This Ritual
                </h4>
                <p className="text-sm text-[#10110F] leading-relaxed font-light">
                  {selectedItemForModal.description}
                </p>
              </div>

              {/* Benefits & Inclusions */}
              {Array.isArray(selectedItemForModal.benefits) && selectedItemForModal.benefits.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7068] mb-2.5">
                    What's Included In This Experience
                  </h4>
                  <div className="space-y-2 bg-[#F7F4ED] p-4 rounded-2xl border border-[#DCE1D8]">
                    {selectedItemForModal.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#10110F]">
                        <CheckCircle2 className="w-4 h-4 text-[#263D2B] flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing & Validity Details */}
              <div className="p-4 rounded-2xl border border-[#DCE1D8] bg-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">
                    Special Seasonal Price
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-serif text-3xl font-bold text-[#263D2B]">
                      ${selectedItemForModal.effectivePrice} <span className="text-xs font-sans font-semibold">CAD</span>
                    </span>
                    {selectedItemForModal.discountPercent > 0 && (
                      <span className="text-sm line-through text-[#6B7068]">
                        ${selectedItemForModal.originalPrice} CAD
                      </span>
                    )}
                  </div>
                </div>

                {selectedItemForModal.validUntil && (
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">
                      Offer Validity
                    </span>
                    <span className="text-xs font-mono font-bold text-[#10110F]">
                      Valid until {formatValidityDate(selectedItemForModal.validUntil)}
                    </span>
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="p-5 bg-[#F7F4ED] border-t border-[#DCE1D8] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedItemForModal(null)}
                className="global-button-secondary !py-2.5 !px-5 text-xs font-bold uppercase tracking-wider"
              >
                Close
              </button>

              <Link
                to={
                  selectedItemForModal.itemType === 'package'
                    ? `/book-appointment?combo=${encodeURIComponent(selectedItemForModal.targetId)}`
                    : `/book-appointment?service=${encodeURIComponent(selectedItemForModal.targetId)}`
                }
                onClick={() => setSelectedItemForModal(null)}
                className="global-button !py-2.5 !px-6 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>Reserve Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
