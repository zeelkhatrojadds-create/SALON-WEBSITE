import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  X, 
  Wand2, 
  Eye, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Palette, 
  Check, 
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import { NAIL_ART_GALLERY, GALLERY_CATEGORIES } from '../../data/nailGalleryData';

export default function NailArtGallery({ onApplyPreset }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Designs');
  const [activeModalDesign, setActiveModalDesign] = useState(null);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Filtered designs based on active category and live search term
  const filteredDesigns = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return NAIL_ART_GALLERY.filter((item) => {
      const matchesCategory = 
        selectedCategory === 'All Designs' || 
        item.category.toLowerCase() === selectedCategory.toLowerCase();
      
      const matchesSearch = 
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query) ||
        item.suggestedShape.toLowerCase().includes(query) ||
        item.suggestedFinish.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Modal keyboard accessibility (ESC key to close) & background scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeModalDesign) {
        setActiveModalDesign(null);
      }
    };

    if (activeModalDesign) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalDesign]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Designs');
  };

  const handleTryDesign = (preset) => {
    if (activeModalDesign) {
      setActiveModalDesign(null);
    }
    if (onApplyPreset) {
      onApplyPreset(preset);
    }
  };

  return (
    <section 
      id="nail-art-gallery" 
      aria-label="The Nail Art Gallery"
      className="w-full bg-white border-t border-[#DCE1D8] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 shadow-2xs scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER                                                         */}
        {/* ========================================================================= */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>STEP 03 · CURATED ATELIER GALLERY</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
            The Nail Art Gallery
          </h2>

          <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto">
            “From timeless elegance to bold statement nails — find the design that speaks your style.”
          </p>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 2. SEARCH & CATEGORY FILTERS CONTROLS                                     */}
        {/* ========================================================================= */}
        <div className="mb-10 space-y-5 max-w-4xl mx-auto">
          {/* Live Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#6B7068]">
              <Search className="w-4 h-4 text-[#465640]" />
            </div>
            <input
              type="text"
              id="nail-gallery-search"
              aria-label="Search nail art designs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search designs by name or style (e.g., French, Chrome, Floral, Cat-Eye)..."
              className="w-full pl-11 pr-10 py-3.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-2xl text-xs sm:text-sm text-[#10110F] placeholder-[#6B7068] focus:outline-hidden focus:border-[#263D2B] focus:ring-1 focus:ring-[#263D2B] transition-all shadow-2xs font-sans"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search input"
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6B7068] hover:text-[#10110F] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {GALLERY_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                      : 'bg-white text-[#465640] border-[#DCE1D8] hover:border-[#263D2B] hover:text-[#10110F]'
                  }`}
                  aria-pressed={isActive}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Results Summary Counter */}
          <div className="flex items-center justify-between text-[11px] text-[#6B7068] px-2 pt-1">
            <span>
              Showing <strong className="text-[#10110F] font-semibold">{filteredDesigns.length}</strong> of {NAIL_ART_GALLERY.length} curated designs
              {selectedCategory !== 'All Designs' && ` in ${selectedCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            {(selectedCategory !== 'All Designs' || searchQuery) && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-[#263D2B] hover:underline font-semibold cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. GALLERY CARDS GRID OR FRIENDLY EMPTY STATE                             */}
        {/* ========================================================================= */}
        {filteredDesigns.length === 0 ? (
          <div className="text-center py-16 px-4 bg-[#F7F4ED] rounded-3xl border border-[#DCE1D8] max-w-2xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-white border border-[#DCE1D8] flex items-center justify-center mx-auto text-[#263D2B]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal">
              No matching nail art designs found
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7068] max-w-md mx-auto leading-relaxed">
              We couldn&apos;t find any designs matching &ldquo;{searchQuery}&rdquo; in the {selectedCategory} collection. Try adjusting your search query or reset your filters.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleClearFilters}
                className="global-button !px-6 !py-2.5 text-xs text-white uppercase font-bold tracking-wider cursor-pointer"
              >
                Reset Filters &amp; View All
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
            {filteredDesigns.map((item, index) => (
              <div
                key={item.id}
                className="bg-[#F7F4ED] rounded-3xl border border-[#DCE1D8] overflow-hidden shadow-2xs hover:shadow-md hover:border-[#263D2B] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Image with Badges */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-white">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Category Tag */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-[#263D2B] border border-[#DCE1D8] shadow-2xs">
                      {item.category}
                    </div>

                    {/* Quick View Hover Overlay Button */}
                    <button
                      type="button"
                      onClick={() => setActiveModalDesign(item)}
                      aria-label={`View ${item.name} details`}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md border border-[#DCE1D8] flex items-center justify-center text-[#263D2B] opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#263D2B] hover:text-white cursor-pointer shadow-xs"
                      title="View design details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    {/* Catalog Price Tag */}
                    <div className="absolute bottom-2.5 right-3 text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-[#10110F]/80 text-white backdrop-blur-xs">
                      ${item.servicePrice} CAD
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-2.5">
                    <div className="space-y-0.5">
                      <h3 className="font-serif text-lg font-normal text-[#10110F] group-hover:text-[#263D2B] transition-colors leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-[11px] font-medium text-[#465640] uppercase tracking-wider">
                        {item.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-[#6B7068] leading-relaxed font-light line-clamp-3">
                      {item.description}
                    </p>

                    {/* Specifications Tags */}
                    <div className="pt-2 flex flex-wrap gap-1.5 border-t border-[#DCE1D8]/60">
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-[#DCE1D8] text-[#465640]">
                        Shape: {item.suggestedShape}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dual Action CTA Buttons: View Design + Try This Design */}
                <div className="p-5 pt-0 border-t border-[#DCE1D8]/60 mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveModalDesign(item)}
                    className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#F7F4ED] text-[#10110F] border border-[#DCE1D8] hover:border-[#263D2B] text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-2xs"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#263D2B]" />
                    <span>View Design</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTryDesign(item.preset)}
                    className="py-2.5 px-3 rounded-xl bg-[#263D2B] hover:bg-[#18271B] text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-2xs group/btn"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>Try This</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. ACCESSIBLE INTERACTIVE DESIGN PREVIEW MODAL                            */}
        {/* ========================================================================= */}
        {activeModalDesign && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#10110F]/80 backdrop-blur-xs animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-design-title"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setActiveModalDesign(null);
              }
            }}
          >
            <div
              ref={modalRef}
              className="bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200"
            >
              {/* Close Button Top Right */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setActiveModalDesign(null)}
                aria-label="Close design preview modal"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 border border-[#DCE1D8] text-[#10110F] hover:bg-[#263D2B] hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Large Design Image Preview */}
                <div className="relative aspect-4/3 md:aspect-auto md:min-h-[380px] bg-[#F7F4ED] overflow-hidden rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl">
                  <img
                    src={activeModalDesign.image}
                    alt={activeModalDesign.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#263D2B] border border-[#DCE1D8] shadow-2xs">
                    {activeModalDesign.category} Collection
                  </div>
                </div>

                {/* Modal Detail Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#465640] block">
                        SIGNATURE ATELIER LOOK
                      </span>
                      <h3
                        id="modal-design-title"
                        className="font-serif text-2xl sm:text-3xl font-normal text-[#10110F] leading-tight"
                      >
                        {activeModalDesign.name}
                      </h3>
                      <p className="text-xs font-medium text-[#263D2B] uppercase tracking-wider">
                        {activeModalDesign.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed font-light">
                      {activeModalDesign.description}
                    </p>

                    {/* Specifications Box */}
                    <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2.5 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#465640] block">
                          Suggested Nail Shape:
                        </span>
                        <span className="font-semibold text-[#10110F]">
                          {activeModalDesign.suggestedShape}
                        </span>
                      </div>

                      <div className="border-t border-[#DCE1D8]/60 pt-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#465640] block">
                          Suggested Colors &amp; Accents:
                        </span>
                        <span className="font-semibold text-[#10110F]">
                          {activeModalDesign.suggestedColors}
                        </span>
                      </div>

                      <div className="border-t border-[#DCE1D8]/60 pt-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#465640] block">
                          Suggested Finish:
                        </span>
                        <span className="font-semibold text-[#10110F]">
                          {activeModalDesign.suggestedFinish}
                        </span>
                      </div>
                    </div>

                    {/* Official Salon Service Linkage */}
                    <div className="p-3 rounded-xl bg-white border border-[#DCE1D8] flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">
                          RECOMMENDED SERVICE
                        </span>
                        <span className="font-serif text-sm font-normal text-[#10110F]">
                          {activeModalDesign.serviceName}
                        </span>
                        <span className="text-[10px] text-[#465640] block">
                          Duration: {activeModalDesign.serviceDuration}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-serif text-lg font-normal text-[#10110F]">
                          ${activeModalDesign.servicePrice}
                        </span>
                        <span className="text-[10px] text-[#6B7068] block">CAD</span>
                      </div>
                    </div>
                  </div>

                  {/* Modal Action CTA Buttons */}
                  <div className="space-y-2 pt-2 border-t border-[#DCE1D8]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleTryDesign(activeModalDesign.preset)}
                        className="w-full py-3 px-4 rounded-full bg-[#263D2B] hover:bg-[#18271B] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                      >
                        <Wand2 className="w-3.5 h-3.5" />
                        <span>Try In Studio</span>
                      </button>

                      <Link
                        to={`/book-appointment?service=${activeModalDesign.serviceId}`}
                        onClick={() => setActiveModalDesign(null)}
                        className="w-full py-3 px-4 rounded-full bg-white hover:bg-[#F7F4ED] text-[#10110F] border border-[#263D2B] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#263D2B]" />
                        <span>Book Appointment</span>
                      </Link>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveModalDesign(null)}
                      className="w-full py-2 text-center text-xs text-[#6B7068] hover:text-[#10110F] font-medium transition-colors cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
