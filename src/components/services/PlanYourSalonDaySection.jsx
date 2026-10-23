import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  Clock, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Info, 
  Calendar, 
  RotateCcw, 
  AlertCircle,
  Tag,
  CheckCircle2,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

export default function PlanYourSalonDaySection() {
  const navigate = useNavigate();

  const [servicesList, setServicesList] = useState(() => salonDB.getServices());
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Category horizontal scroll controls
  const categoryScrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkCategoryScroll = useCallback(() => {
    const el = categoryScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 6);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 6);
  }, []);

  useEffect(() => {
    const el = categoryScrollRef.current;
    if (!el) return;
    checkCategoryScroll();
    el.addEventListener('scroll', checkCategoryScroll, { passive: true });
    window.addEventListener('resize', checkCategoryScroll);
    return () => {
      el.removeEventListener('scroll', checkCategoryScroll);
      window.removeEventListener('resize', checkCategoryScroll);
    };
  }, [checkCategoryScroll]);

  const handleScrollCategories = (direction) => {
    const el = categoryScrollRef.current;
    if (!el) return;
    const scrollAmount = Math.max(220, Math.floor(el.clientWidth * 0.6));
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Sync with DB
  useEffect(() => {
    const syncServices = () => {
      setServicesList(salonDB.getServices());
    };
    syncServices();
    const unsub = salonDB.subscribe(syncServices);
    return () => unsub();
  }, []);

  // Filtered catalog list
  const filteredServices = useMemo(() => {
    return servicesList.filter((service) => {
      if (service.active === false) return false;

      let matchesCat = true;
      if (selectedCategory !== 'all') {
        const cat = String(service.categoryName || service.category || '').toLowerCase();
        matchesCat = cat.includes(selectedCategory.toLowerCase());
      }

      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        matchesSearch = 
          service.name.toLowerCase().includes(q) ||
          service.description.toLowerCase().includes(q) ||
          (service.categoryName && service.categoryName.toLowerCase().includes(q));
      }

      return matchesCat && matchesSearch;
    });
  }, [servicesList, selectedCategory, searchQuery]);

  // Unique categories for pills
  const categories = useMemo(() => {
    const set = new Set(servicesList.map(s => s.categoryName || s.category).filter(Boolean));
    return Array.from(set);
  }, [servicesList]);

  // Live Itinerary calculations via Master Salon Database
  const itinerary = useMemo(() => {
    return salonDB.calculateSalonDayItinerary(selectedServiceIds);
  }, [selectedServiceIds]);

  // Add Treatment to Day
  const handleAddTreatment = (serviceId) => {
    if (selectedServiceIds.includes(serviceId)) return;
    setSelectedServiceIds(prev => [...prev, serviceId]);
  };

  // Remove Treatment
  const handleRemoveTreatment = (serviceId) => {
    setSelectedServiceIds(prev => prev.filter(id => id !== serviceId));
  };

  // Reorder Treatments (Move Up)
  const handleMoveUp = (index) => {
    if (index <= 0) return;
    setSelectedServiceIds(prev => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  // Reorder Treatments (Move Down)
  const handleMoveDown = (index) => {
    if (index >= selectedServiceIds.length - 1) return;
    setSelectedServiceIds(prev => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  // Clear All
  const handleClearAll = () => {
    setSelectedServiceIds([]);
    setShowClearConfirm(false);
  };

  // Continue to Booking
  const handleProceedToBooking = () => {
    if (selectedServiceIds.length === 0) return;
    const query = selectedServiceIds.join(',');
    navigate(`/book-appointment?itinerary=${encodeURIComponent(query)}`);
  };

  return (
    <section 
      id="plan-salon-day" 
      className="w-full relative py-16 sm:py-24 bg-[#F7F4ED] border-t border-[#DCE1D8] overflow-hidden text-[#10110F]"
    >
      {/* Decorative Brand Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#263D2B]/5 rounded-full blur-3xl pointer-events-none -mt-20" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#465640]/5 rounded-full blur-3xl pointer-events-none -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER                                                         */}
        {/* ========================================================================= */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[#263D2B] text-xs font-bold uppercase tracking-[0.22em] shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>BESPOKE SALON ITINERARY</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-tight">
            Plan Your Salon Day
          </h2>

          <p className="text-sm sm:text-base font-serif italic text-[#263D2B] font-medium">
            Your perfect beauty day, planned your way.
          </p>

          <p className="text-[#6B7068] text-xs sm:text-sm leading-relaxed font-body font-light max-w-2xl mx-auto">
            Build your personalized salon itinerary by combining your favorite treatments. Review the estimated total cost and time required, then continue to booking.
          </p>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 2. SPLIT WORKBENCH: BROWSE CATALOG (LEFT) vs ITINERARY PANEL (RIGHT)     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ===================================================================== */}
          {/* LEFT AREA: SERVICE SEARCH & CATALOG CARDS (7 or 8 Cols)              */}
          {/* ===================================================================== */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            
            {/* Search & Category Filter Header Card */}
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#DCE1D8] shadow-xs space-y-4">
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#6B7068] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${servicesList.length} treatments (e.g., Facial, Balayage, Manicure, Threading)...`}
                  className="w-full h-11 pl-10 pr-4 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-2xl text-xs text-[#10110F] placeholder-[#6B7068] focus:outline-none focus:border-[#263D2B]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#6B7068] hover:text-[#10110F]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Filter Pills (Scrollable with Left & Right Arrows) */}
              <div className="relative flex items-center gap-1.5 sm:gap-2 w-full pt-1">
                {/* Left Arrow Button */}
                <button
                  type="button"
                  onClick={() => handleScrollCategories('left')}
                  disabled={!canScrollLeft}
                  aria-label="Scroll categories left"
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0 flex items-center justify-center border transition-all duration-200 ${
                    canScrollLeft
                      ? 'bg-white border-[#DCE1D8] text-[#263D2B] hover:bg-[#263D2B] hover:text-white cursor-pointer shadow-xs hover:scale-105 active:scale-95'
                      : 'bg-[#F7F4ED]/80 border-[#DCE1D8]/60 text-[#6B7068]/30 cursor-not-allowed opacity-40'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Center Horizontal Track */}
                <div
                  ref={categoryScrollRef}
                  className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex-shrink-0 ${
                      selectedCategory === 'all'
                        ? 'bg-[#263D2B] text-white shadow-xs'
                        : 'bg-[#F7F4ED] border border-[#DCE1D8] text-[#6B7068] hover:text-[#10110F]'
                    }`}
                  >
                    ALL TREATMENTS ({servicesList.length})
                  </button>
                  {categories.map((cat, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex-shrink-0 ${
                        selectedCategory === cat
                          ? 'bg-[#263D2B] text-white shadow-xs'
                          : 'bg-[#F7F4ED] border border-[#DCE1D8] text-[#6B7068] hover:text-[#10110F]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Right Arrow Button */}
                <button
                  type="button"
                  onClick={() => handleScrollCategories('right')}
                  disabled={!canScrollRight}
                  aria-label="Scroll categories right"
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0 flex items-center justify-center border transition-all duration-200 ${
                    canScrollRight
                      ? 'bg-white border-[#DCE1D8] text-[#263D2B] hover:bg-[#263D2B] hover:text-white cursor-pointer shadow-xs hover:scale-105 active:scale-95'
                      : 'bg-[#F7F4ED]/80 border-[#DCE1D8]/60 text-[#6B7068]/30 cursor-not-allowed opacity-40'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Results Grid */}
            {filteredServices.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-[#DCE1D8] text-center space-y-3">
                <Search className="w-6 h-6 text-[#6B7068] mx-auto" />
                <h4 className="font-serif text-lg font-normal text-[#10110F]">No matching treatments found</h4>
                <p className="text-xs text-[#6B7068]">Try searching a different term or clear your active category filter.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="global-button-secondary !py-2 !px-4 text-xs font-bold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
                {filteredServices.map((service) => {
                  const isSelected = selectedServiceIds.includes(service.id);
                  const durationStr = service.duration || '45 min';

                  return (
                    <div
                      key={service.id}
                      className={`bg-white rounded-2xl border p-4 transition-all duration-200 flex flex-col justify-between group shadow-xs h-full text-left ${
                        isSelected 
                          ? 'border-[#263D2B] ring-1 ring-[#263D2B]/30 bg-[#263D2B]/5' 
                          : 'border-[#DCE1D8] hover:border-[#263D2B]/60 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start gap-3.5 flex-1">
                        {/* Service Thumbnail */}
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#F7F4ED] flex-shrink-0 border border-[#DCE1D8]">
                          <img
                            src={service.image || '/facial-atelier-clean.webp'}
                            alt={service.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => { e.currentTarget.src = '/facial-atelier-clean.webp'; }}
                          />
                        </div>

                        {/* Title & Details */}
                        <div className="space-y-1 flex-1 min-w-0">
                          <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#263D2B] block truncate min-h-[14px]">
                            {service.categoryName || service.category}
                          </span>
                          <h4 className="font-serif text-sm font-bold text-[#10110F] leading-snug line-clamp-1 min-h-[1.25rem]">
                            {service.name}
                          </h4>
                          <p className="text-[11px] text-[#6B7068] line-clamp-2 leading-relaxed min-h-[2rem]">
                            {service.description}
                          </p>
                        </div>
                      </div>

                      {/* Footer Row: Duration, Price, and Action Button */}
                      <div className="pt-3 mt-auto border-t border-[#DCE1D8]/60 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 text-[10.5px] font-mono text-[#6B7068]">
                            <Clock className="w-3 h-3 text-[#263D2B]" />
                            {durationStr}
                          </span>
                          <span className="text-[#DCE1D8]">•</span>
                          <span className="font-serif font-bold text-sm text-[#263D2B]">
                            ${service.price} <span className="text-[9px] font-sans font-semibold">CAD</span>
                          </span>
                        </div>

                        {isSelected ? (
                          <button
                            type="button"
                            onClick={() => handleRemoveTreatment(service.id)}
                            className="px-3 py-1.5 rounded-xl bg-[#263D2B] text-white text-[11px] font-bold flex items-center gap-1 shadow-xs cursor-pointer hover:bg-rose-700 transition-colors"
                            title="Click to remove from day"
                          >
                            <Check className="w-3 h-3" />
                            <span>In Day</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleAddTreatment(service.id)}
                            className="px-3 py-1.5 rounded-xl bg-white border border-[#263D2B] text-[#263D2B] hover:bg-[#263D2B] hover:text-white text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add to Day</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* ===================================================================== */}
          {/* RIGHT AREA: STICKY ITINERARY SUMMARY WORKBENCH (5 or 4 Cols)         */}
          {/* ===================================================================== */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-24 space-y-6">
            
            <div className="bg-white rounded-3xl border-2 border-[#DCE1D8] shadow-lg p-6 sm:p-7 space-y-6">
              
              {/* Itinerary Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#DCE1D8]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B] block">
                    LIVE ITINERARY
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F]">
                    Your Salon Day
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#263D2B] text-white text-xs font-mono font-bold">
                    {itinerary.itemCount} {itinerary.itemCount === 1 ? 'Ritual' : 'Rituals'}
                  </span>

                  {itinerary.itemCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowClearConfirm(true)}
                      className="p-1.5 rounded-full hover:bg-rose-50 text-rose-500 transition-colors cursor-pointer"
                      title="Clear all treatments"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Treatments List in Order */}
              {itinerary.itemCount === 0 ? (
                /* EMPTY STATE */
                <div className="py-12 px-4 rounded-2xl bg-[#F7F4ED] border border-dashed border-[#DCE1D8] text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-white border border-[#DCE1D8] flex items-center justify-center mx-auto text-[#263D2B]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-base font-normal text-[#10110F]">
                    Your salon day starts here
                  </h4>
                  <p className="text-xs text-[#6B7068] max-w-xs mx-auto leading-relaxed">
                    Select your favorite treatments from the catalogue on the left to build your personalized beauty itinerary.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {itinerary.services.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-3 bg-[#F7F4ED] rounded-2xl border border-[#DCE1D8] flex items-center justify-between gap-3 group animate-fade-in"
                    >
                      {/* Step Number Badge */}
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-6 h-6 rounded-full bg-[#263D2B] text-white text-[11px] font-mono font-bold flex items-center justify-center flex-shrink-0">
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <div className="min-w-0">
                          <h5 className="font-serif text-xs font-bold text-[#10110F] truncate">
                            {item.name}
                          </h5>
                          <span className="text-[10px] text-[#6B7068] font-mono block">
                            {item.duration} • ${item.price} CAD
                          </span>
                        </div>
                      </div>

                      {/* Reorder and Delete Controls */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {/* Move Up */}
                        <button
                          type="button"
                          onClick={() => handleMoveUp(index)}
                          disabled={index === 0}
                          className="p-1 rounded-md hover:bg-white text-[#6B7068] disabled:opacity-20 cursor-pointer"
                          title="Move earlier in day"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>

                        {/* Move Down */}
                        <button
                          type="button"
                          onClick={() => handleMoveDown(index)}
                          disabled={index === itinerary.services.length - 1}
                          className="p-1 rounded-md hover:bg-white text-[#6B7068] disabled:opacity-20 cursor-pointer"
                          title="Move later in day"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => handleRemoveTreatment(item.id)}
                          className="p-1 rounded-md hover:bg-rose-100 text-rose-500 cursor-pointer"
                          title="Remove from itinerary"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Price & Duration Calculation Matrix */}
              {itinerary.itemCount > 0 && (
                <div className="space-y-4 pt-4 border-t border-[#DCE1D8]">
                  
                  {/* Estimated Time Block */}
                  <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6B7068] block">
                        Estimated Treatment Time
                      </span>
                      <span className="font-serif text-lg font-bold text-[#10110F]">
                        {itinerary.durationDisplay}
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#DCE1D8] flex items-center justify-center text-[#263D2B]">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[#6B7068]">
                      <span>Treatments Subtotal ({itinerary.itemCount})</span>
                      <span className="font-mono">${itinerary.totalOriginalPrice} CAD</span>
                    </div>

                    {itinerary.discountAmount > 0 && (
                      <div className="flex items-center justify-between text-[#263D2B] font-bold bg-[#263D2B]/10 p-2 rounded-xl">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Salon Day Perk ({itinerary.discountPercent}% OFF)</span>
                        </span>
                        <span className="font-mono">-${itinerary.discountAmount} CAD</span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-[#DCE1D8] flex items-baseline justify-between">
                      <span className="font-serif text-base font-bold text-[#10110F]">
                        Estimated Total Cost
                      </span>
                      <span className="font-serif text-2xl font-bold text-[#263D2B]">
                        ${itinerary.finalPrice} <span className="text-xs font-sans font-semibold">CAD</span>
                      </span>
                    </div>
                  </div>

                  {/* Time Estimate Disclaimer Note */}
                  <p className="text-[10px] text-[#6B7068] leading-relaxed italic bg-white p-2.5 rounded-xl border border-[#DCE1D8]/60">
                    * {itinerary.disclaimer}
                  </p>

                  {/* Book My Salon Day Button */}
                  <button
                    type="button"
                    onClick={handleProceedToBooking}
                    className="global-button w-full !py-3.5 text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>Book My Salon Day</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </div>
              )}

              {/* Bottom Assurance */}
              <div className="pt-2 flex items-center justify-center gap-2 text-[10.5px] text-[#6B7068]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B]" />
                <span>Instant confirmation • Pay at appointment</span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. CLEAR ALL CONFIRMATION MODAL                                           */}
      {/* ========================================================================= */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white max-w-sm w-full p-6 rounded-3xl border border-[#DCE1D8] shadow-2xl text-center space-y-4 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg font-normal text-[#10110F]">
              Clear Your Salon Day Itinerary?
            </h4>
            <p className="text-xs text-[#6B7068] leading-relaxed">
              Are you sure you want to remove all {itinerary.itemCount} selected treatments from your itinerary?
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="global-button-secondary !py-2 !px-4 text-xs font-semibold"
              >
                Keep Itinerary
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="bg-rose-600 hover:bg-rose-700 text-white !py-2 !px-4 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
