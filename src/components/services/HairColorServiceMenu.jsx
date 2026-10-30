import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  X, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Info, 
  Calendar, 
  ShieldCheck, 
  SlidersHorizontal, 
  RotateCcw, 
  Droplets,
  AlertCircle,
  HeartHandshake,
  CheckCircle2,
  HelpCircle,
  Sun
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';
import SafeServiceImage from '../common/SafeServiceImage';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

/**
 * GLAM GIRL BY JANKI — Hair Colour Service Menu
 * 
 * Displays genuine salon-approved hair-colour services directly from the master catalogue.
 * Preserves exact approved names, prices, durations, and booking flows.
 */
export default function HairColorServiceMenu() {
  const navigate = useNavigate();

  // Master services state synchronized with salonDB
  const [allServices, setAllServices] = useState(() => salonDB.getServices());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'name-asc' | 'name-desc'
  const [selectedServiceForModal, setSelectedServiceForModal] = useState(null);

  // Subscribe to live database changes
  useEffect(() => {
    const syncServices = () => {
      setAllServices(salonDB.getServices());
    };
    const unsubscribe = salonDB.subscribe(syncServices);
    return () => unsubscribe();
  }, []);

  // Filter ONLY approved hair-colour services from the master catalogue
  // Strictly exclude haircuts, nail art, skincare, waxing, threading, or other salon treatments
  const hairServices = useMemo(() => {
    const seenIds = new Set();
    return allServices.filter((service) => {
      if (!service) return false;
      if (service.active === false || service.isActive === false) return false;

      const cat = String(service.category || '').toLowerCase().trim();
      const catName = String(service.categoryName || '').toLowerCase().trim();
      
      const isHairColorCategory = 
        cat === 'hair-color' || 
        cat === 'hair-colour' || 
        catName.includes('hair colour') || 
        catName.includes('hair color');

      if (!isHairColorCategory) return false;

      // Prevent duplicate services
      const dedupeKey = service.id || service.slug || service.name;
      if (seenIds.has(dedupeKey)) return false;
      seenIds.add(dedupeKey);

      return true;
    });
  }, [allServices]);

  // Dynamically derive categories strictly supported by the actual hair colour catalogue
  const supportedCategories = useMemo(() => {
    const categoryMap = new Map();
    hairServices.forEach((s) => {
      const id = s.category || 'hair-color';
      const label = s.categoryName || 'Hair Colour';
      if (!categoryMap.has(id)) {
        categoryMap.set(id, label);
      }
    });
    return Array.from(categoryMap.entries()).map(([id, label]) => ({ id, label }));
  }, [hairServices]);

  // Filter & Search & Sort pipeline
  const filteredServices = useMemo(() => {
    let list = hairServices.filter((service) => {
      // 1. Category filter
      if (selectedCategory !== 'all') {
        const matchesCategory = 
          service.category === selectedCategory || 
          service.categoryName === selectedCategory;
        if (!matchesCategory) return false;
      }

      // 2. Search by service name (case-insensitive substring)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = service.name && service.name.toLowerCase().includes(q);
        if (!matchesName) return false;
      }

      return true;
    });

    // 3. Sort by service name
    if (sortBy === 'name-asc') {
      list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else if (sortBy === 'name-desc') {
      list.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
    }

    return list;
  }, [hairServices, selectedCategory, searchQuery, sortBy]);

  // Handle resetting all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('default');
  };

  const isFiltered = searchQuery.trim() !== '' || selectedCategory !== 'all' || sortBy !== 'default';

  // Helper for formatting approved prices accurately
  const formatApprovedPrice = (price) => {
    if (price === null || price === undefined || price === '' || isNaN(Number(price))) {
      return 'Contact us to confirm';
    }
    return `$${Number(price)} CAD`;
  };

  // Helper for formatting approved duration accurately
  const formatApprovedDuration = (service) => {
    if (service?.durationDisplay) return service.durationDisplay;
    if (service?.duration) return service.duration;
    return 'Contact us to confirm';
  };

  // Keyboard listener for accessible modal closing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedServiceForModal) {
        setSelectedServiceForModal(null);
      }
    };
    if (selectedServiceForModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedServiceForModal]);

  return (
    <section 
      id="hair-colour-menu"
      aria-labelledby="hair-colour-menu-heading"
      className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16 sm:pt-24 pb-8 sm:pb-16 scroll-mt-24 font-sans"
    >
      {/* ========================================================================= */}
      {/* 1. SECTION INTRODUCTION                                                   */}
      {/* ========================================================================= */}
      <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B] shadow-xs">
          <Droplets className="w-3.5 h-3.5 text-[#263D2B]" />
          <span>APPROVED COLOUR SERVICES</span>
        </div>

        <h2 
          id="hair-colour-menu-heading"
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]"
        >
          The Hair Colour Menu
        </h2>

        <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

        <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto italic">
          Explore our available colour services, discover the details, and choose the right option for your next hair transformation.
        </p>
      </ScrollReveal>

      {/* ========================================================================= */}
      {/* 2. SEARCH, FILTER & SORT CONTROLS                                         */}
      {/* ========================================================================= */}
      {hairServices.length > 0 && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#DCE1D8] shadow-xs mb-8 sm:mb-12 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
            
            {/* Search Input: Search by service name */}
            <div className="md:col-span-5 relative">
              <label htmlFor="hair-service-search" className="sr-only">
                Search colour services by name
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7068] pointer-events-none" />
                <input
                  id="hair-service-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search colour services by name..."
                  aria-label="Search colour services by name"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs sm:text-sm text-[#10110F] placeholder-[#6B7068] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B] transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search input"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7068] hover:text-[#10110F] p-1 rounded-full focus-visible:ring-2 focus-visible:ring-[#263D2B] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills / Dropdown */}
            <div className="md:col-span-4 flex items-center gap-2">
              <label htmlFor="hair-category-filter" className="text-xs font-semibold text-[#10110F] whitespace-nowrap hidden sm:inline">
                Category:
              </label>
              <select
                id="hair-category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Filter by hair-colour category"
                className="w-full py-2.5 px-3 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs sm:text-sm text-[#10110F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B] cursor-pointer"
              >
                <option value="all">All Colour Categories</option>
                {supportedCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown: Sort by service name */}
            <div className="md:col-span-3 flex items-center gap-2">
              <label htmlFor="hair-sort-select" className="text-xs font-semibold text-[#10110F] whitespace-nowrap hidden sm:inline">
                Sort:
              </label>
              <select
                id="hair-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort hair colour services by name"
                className="w-full py-2.5 px-3 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs sm:text-sm text-[#10110F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B] cursor-pointer"
              >
                <option value="default">Default Catalogue Order</option>
                <option value="name-asc">Service Name (A to Z)</option>
                <option value="name-desc">Service Name (Z to A)</option>
              </select>
            </div>

          </div>

          {/* Results Summary & Reset Filter Action */}
          <div className="pt-2 border-t border-[#DCE1D8] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="text-[#6B7068]">
              {filteredServices.length === hairServices.length ? (
                <span>Showing all <strong className="text-[#10110F] font-semibold">{hairServices.length}</strong> approved colour services</span>
              ) : (
                <span>
                  Showing <strong className="text-[#10110F] font-semibold">{filteredServices.length}</strong> of{' '}
                  <strong className="text-[#10110F] font-semibold">{hairServices.length}</strong> colour services
                </span>
              )}
            </div>

            {isFiltered && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F4ED] hover:bg-[#DCE1D8] text-[#263D2B] font-semibold text-xs transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#263D2B]"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset all filters</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SERVICE GRID OR EMPTY STATES                                           */}
      {/* ========================================================================= */}

      {/* Case A: No approved hair colour services exist in catalogue */}
      {hairServices.length === 0 && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#DCE1D8] text-center max-w-xl mx-auto shadow-xs my-8">
          <div className="w-14 h-14 rounded-full bg-[#F7F4ED] text-[#263D2B] flex items-center justify-center mx-auto mb-4 border border-[#DCE1D8]">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-2xl text-[#10110F] font-normal mb-2">
            No Approved Hair Colour Services Available
          </h3>
          <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed mb-6 font-sans">
            Our colour service menu is currently undergoing seasonal curation. Please contact our salon atelier directly to consult with Janki or explore our complete beauty services.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate('/contact')}
              className="global-button !px-6 !py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Contact Atelier
            </button>
            <button
              onClick={() => navigate('/services')}
              className="global-button-secondary !px-6 !py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Browse All Services
            </button>
          </div>
        </div>
      )}

      {/* Case B: Approved services exist, but search/filter produced no results */}
      {hairServices.length > 0 && filteredServices.length === 0 && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#DCE1D8] text-center max-w-xl mx-auto shadow-xs my-8">
          <div className="w-14 h-14 rounded-full bg-[#F7F4ED] text-[#465640] flex items-center justify-center mx-auto mb-4 border border-[#DCE1D8]">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-2xl text-[#10110F] font-normal mb-2">
            No Colour Services Found
          </h3>
          <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed mb-6 font-sans">
            We couldn't find any approved hair colour services matching{' '}
            {searchQuery ? <strong className="text-[#10110F] font-semibold">&ldquo;{searchQuery}&rdquo;</strong> : 'your selected category'}.
            Try modifying your search query or reset your filters.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="global-button !px-6 !py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* Case C: Display Approved Service Cards Grid */}
      {filteredServices.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => {
            const priceFormatted = formatApprovedPrice(service.price);
            const durationFormatted = formatApprovedDuration(service);
            const isUnconfirmed = priceFormatted.includes('Contact us') || durationFormatted.includes('Contact us');

            return (
              <article
                key={service.id || service.slug}
                className="bg-white rounded-2xl sm:rounded-3xl border border-[#DCE1D8] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group"
              >
                {/* Top Section: Image & Badge */}
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F7F4ED]">
                    <SafeServiceImage
                      service={service}
                      src={service.image}
                      alt={service.name}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Featured / Signature Badge */}
                    {service.featured && (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#263D2B] text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-md">
                        <Sparkles className="w-3 h-3 text-[#A8B5A0]" />
                        <span>Signature Ritual</span>
                      </div>
                    )}

                    {/* Category Label */}
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-[#10110F]/75 backdrop-blur-xs text-[#F7F4ED] text-[10.5px] font-medium tracking-wide">
                      {service.categoryName || 'Hair Colour'}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-3.5">
                    
                    {/* Service Name */}
                    <h3 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal leading-snug group-hover:text-[#263D2B] transition-colors">
                      {service.name}
                    </h3>

                    {/* Approved Price & Duration Metadata */}
                    <div className="flex items-center justify-between gap-3 pt-1 pb-2 border-b border-[#DCE1D8]/60">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">
                          Approved Price
                        </span>
                        <span className="text-base sm:text-lg font-semibold text-[#10110F]">
                          {priceFormatted}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">
                          Duration
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#263D2B]">
                          <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                          <span>{durationFormatted}</span>
                        </span>
                      </div>
                    </div>

                    {/* Short Description */}
                    {service.description && (
                      <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed line-clamp-3 font-normal">
                        {service.description}
                      </p>
                    )}

                    {/* Feature Highlights Pills from Approved Data */}
                    {Array.isArray(service.features) && service.features.length > 0 && (
                      <div className="pt-1 flex flex-wrap gap-1.5">
                        {service.features.slice(0, 2).map((feat, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F7F4ED] text-[#263D2B] text-[10.5px] font-medium border border-[#DCE1D8]"
                          >
                            <Check className="w-2.5 h-2.5 text-[#263D2B]" />
                            <span>{feat}</span>
                          </span>
                        ))}
                      </div>
                    )}

                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-5 sm:p-6 pt-0 space-y-2">
                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    
                    {/* View Details Action */}
                    <button
                      type="button"
                      onClick={() => setSelectedServiceForModal(service)}
                      aria-label={`View details for ${service.name}`}
                      className="global-button-secondary w-full !py-2.5 !px-3 text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer text-center hover:border-[#263D2B] transition-colors"
                    >
                      <Info className="w-3.5 h-3.5 text-[#263D2B]" />
                      <span>View Service Details &amp; Guidance →</span>
                    </button>

                  </div>
                </div>

              </article>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. ACCESSIBLE SERVICE DETAILS MODAL                                       */}
      {/* ========================================================================= */}
      {selectedServiceForModal && (
        <div 
          className="fixed inset-0 bg-[#10110F]/65 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-hair-service-title"
          onClick={() => setSelectedServiceForModal(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-[#F7F4ED] rounded-3xl border border-[#DCE1D8] shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-[#DCE1D8] bg-white flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#263D2B]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#263D2B]">
                  {selectedServiceForModal.categoryName || 'Hair Colour Atelier'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedServiceForModal(null)}
                aria-label="Close service details"
                className="p-1.5 rounded-full text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#263D2B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
              
              {/* Service Hero Image */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#DCE1D8] bg-white shadow-2xs">
                <SafeServiceImage
                  service={selectedServiceForModal}
                  src={selectedServiceForModal.image}
                  alt={selectedServiceForModal.name}
                  width={600}
                  height={340}
                  className="w-full h-full object-cover"
                />
                {selectedServiceForModal.featured && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#263D2B] text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3 text-[#A8B5A0]" />
                    <span>Signature Technique</span>
                  </div>
                )}
              </div>

              {/* Title & Key Highlights Grid */}
              <div className="space-y-4">
                <h3 
                  id="modal-hair-service-title"
                  className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal leading-tight"
                >
                  {selectedServiceForModal.name}
                </h3>

                {/* Price & Duration Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 bg-white rounded-xl border border-[#DCE1D8]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">
                      Approved Price
                    </span>
                    <span className="text-base sm:text-lg font-semibold text-[#10110F]">
                      {formatApprovedPrice(selectedServiceForModal.price)}
                    </span>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-[#DCE1D8]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">
                      Duration
                    </span>
                    <span className="text-base sm:text-lg font-semibold text-[#263D2B] flex items-center gap-1">
                      <Clock className="w-4 h-4 text-[#263D2B]" />
                      <span>{formatApprovedDuration(selectedServiceForModal)}</span>
                    </span>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-[#DCE1D8] col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">
                      Booking Type
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#10110F] flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-[#263D2B]" />
                      <span>Instant Booking</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedServiceForModal.description && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                    Service Overview
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed">
                    {selectedServiceForModal.description}
                  </p>
                </div>
              )}

              {/* What's Included from Catalogue */}
              {Array.isArray(selectedServiceForModal.whatsIncluded) && selectedServiceForModal.whatsIncluded.length > 0 && (
                <div className="space-y-2.5 bg-white p-4 sm:p-5 rounded-2xl border border-[#DCE1D8]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#10110F] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#263D2B]" />
                    <span>What Is Included</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#6B7068]">
                    {selectedServiceForModal.whatsIncluded.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B] mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Features & Formulations from Catalogue */}
              {Array.isArray(selectedServiceForModal.features) && selectedServiceForModal.features.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                    Key Formulation Highlights
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedServiceForModal.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-white text-[#263D2B] text-xs font-medium border border-[#DCE1D8]"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Existing Preparation Guidelines from Approved Salon FAQs */}
              <div className="space-y-2 bg-white p-4 sm:p-5 rounded-2xl border border-[#DCE1D8]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#10110F] flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#263D2B]" />
                  <span>Preparation Guidelines</span>
                </h4>
                <ul className="space-y-2 text-xs text-[#6B7068]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#465640] mt-1.5 flex-shrink-0" />
                    <span>Arrive with dry hair free of heavy styling waxes, oils, or dry shampoo build-up to allow even colour absorption.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#465640] mt-1.5 flex-shrink-0" />
                    <span>Inform your specialist in the booking notes or at arrival of any previous chemical treatments, henna, or scalp sensitivities.</span>
                  </li>
                </ul>
              </div>

              {/* Existing Aftercare Instructions from Master Aftercare Catalogue */}
              <div className="space-y-2 bg-white p-4 sm:p-5 rounded-2xl border border-[#DCE1D8]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#10110F] flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-[#263D2B]" />
                  <span>Approved Aftercare Protocol</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#6B7068] pt-1">
                  <div className="p-3 bg-[#F7F4ED] rounded-xl border border-[#DCE1D8]/70">
                    <strong className="block text-[#10110F] font-semibold mb-1">First 72 Hours</strong>
                    <span>Wait at least 72 hours before your first wash to allow the hair cuticle to fully contract and lock in toner pigments.</span>
                  </div>
                  <div className="p-3 bg-[#F7F4ED] rounded-xl border border-[#DCE1D8]/70">
                    <strong className="block text-[#10110F] font-semibold mb-1">Cool Water Rinse</strong>
                    <span>Always rinse with cool water to seal outer cuticle layers, preventing premature leaching and enhancing gloss shine.</span>
                  </div>
                  <div className="p-3 bg-[#F7F4ED] rounded-xl border border-[#DCE1D8]/70">
                    <strong className="block text-[#10110F] font-semibold mb-1">Tone Maintenance</strong>
                    <span>Integrate a sulfate-free violet or pearl toning treatment every 10–14 days to neutralize warm brassiness.</span>
                  </div>
                  <div className="p-3 bg-[#F7F4ED] rounded-xl border border-[#DCE1D8]/70">
                    <strong className="block text-[#10110F] font-semibold mb-1">UV &amp; Heat Defense</strong>
                    <span>Apply a botanical thermal shield before hot tool styling and coat hair with leave-in conditioner before swimming.</span>
                  </div>
                </div>
              </div>

              {/* Consultation Note */}
              <div className="p-3.5 rounded-xl bg-[#263D2B]/5 border border-[#263D2B]/15 text-xs text-[#263D2B] flex items-start gap-2.5">
                <HeartHandshake className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#263D2B]" />
                <p>
                  Every appointment includes an in-depth consultation with Janki to assess hair history, face-framing angles, and skin undertones for a bespoke finish.
                </p>
              </div>

            </div>

            {/* Modal Footer with Direct Booking Link */}
            <div className="p-4 sm:p-6 border-t border-[#DCE1D8] bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-[#6B7068] text-center sm:text-left">
                <span>Selected Service: </span>
                <strong className="text-[#10110F] font-semibold">{selectedServiceForModal.name}</strong>
                <span> &bull; {formatApprovedPrice(selectedServiceForModal.price)}</span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedServiceForModal(null)}
                  className="global-button !py-2.5 !px-6 text-xs font-bold uppercase tracking-wider cursor-pointer w-full sm:w-auto text-center text-white"
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
