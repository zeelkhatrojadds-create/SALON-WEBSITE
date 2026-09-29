import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Sparkles, RefreshCw, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../data/servicesData';
import salonDB from '../db/salonDatabase';
import ServicesHero from '../components/services/ServicesHero';
import ServicesBenefits from '../components/services/ServicesBenefits';
import CategoryFilter from '../components/services/CategoryFilter';
import SearchBar from '../components/services/SearchBar';
import ServiceCard from '../components/common/ServiceCard';

const ITEMS_PER_PAGE = 12;

export default function ServicesPage({ isSection = false }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const [servicesData, setServicesData] = useState(() => salonDB.getServices());
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Subscribe to live database updates
  useEffect(() => {
    setServicesData(salonDB.getServices());
    const unsubscribe = salonDB.subscribe(() => {
      setServicesData(salonDB.getServices());
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Reset pagination to page 1 whenever category or search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ ...Object.fromEntries(searchParams), category: catId });
    }
  };

  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSearchParams({});
    setCurrentPage(1);
  };

  // Calculate counts per category dynamically from database
  const categoryCounts = useMemo(() => {
    const counts = { all: servicesData.filter(s => s.active !== false).length };
    CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = servicesData.filter((s) => s.category === cat.id && s.active !== false).length;
      }
    });
    return counts;
  }, [servicesData]);

  // Filter treatments by Category & Search query in real time
  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      if (service.active === false) return false;

      const matchesCategory =
        selectedCategory === 'all' || service.category === selectedCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        service.name.toLowerCase().includes(q) ||
        (service.categoryName && service.categoryName.toLowerCase().includes(q)) ||
        (service.description && service.description.toLowerCase().includes(q)) ||
        (service.features && service.features.some((f) => f.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [servicesData, selectedCategory, searchQuery]);

  // Pagination calculation (max 12 products per page)
  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);

  const paginatedServices = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredServices.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [filteredServices, currentPage]);

  const startItem = filteredServices.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredServices.length);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    
    // Smooth scroll to top of services grid
    const gridEl = document.getElementById('services-grid-top');
    if (gridEl) {
      const navHeight = 90;
      const pos = gridEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  const handleQuickBook = (service) => {
    navigate(`/book-appointment?service=${service.id}`);
  };

  const handleViewDetails = (service) => {
    navigate(`/book-appointment?service=${service.id}`);
  };

  return (
    <div 
      id="services"
      className={`w-full bg-[#140E11] text-white ${
        isSection ? 'py-16 sm:py-24' : 'pt-24 sm:pt-28 pb-16 sm:pb-24 min-h-screen'
      }`}
    >
      <div className="w-full px-3 sm:px-6 lg:px-12 xl:px-20 mx-auto">
        
        {/* 1. Services Hero Banner */}
        <ServicesHero />

        {/* 2. Four-Column Trust Benefits Section */}
        <ServicesBenefits />

        {/* 3. Filter & Search Controls */}
        <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
          
          {/* Real-time Search Bar */}
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            totalResults={filteredServices.length}
          />

          {/* Horizontal Category Navigation Bar */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
            counts={categoryCounts}
          />

        </div>

        {/* Anchor point for smooth scrolling on page change */}
        <div id="services-grid-top" className="scroll-mt-28" />

        {/* 4. Active Filter Summary Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 sm:mb-8 border-b border-white/10 text-xs sm:text-sm text-white/60">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-pink flex-shrink-0" />
            <span>
              Showing <strong className="text-white">{startItem}–{endItem}</strong> of <strong className="text-white">{filteredServices.length}</strong> {filteredServices.length === 1 ? 'treatment' : 'treatments'}
              {selectedCategory !== 'all' && (
                <> in <span className="text-brand-pink-muted font-semibold capitalize">{CATEGORIES.find(c => c.id === selectedCategory)?.name}</span></>
              )}
            </span>
          </div>

          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={handleClearAll}
              className="text-xs font-medium text-brand-pink-muted hover:text-brand-pink flex items-center gap-1.5 hover:underline cursor-pointer py-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Search & Filters</span>
            </button>
          )}
        </div>

        {/* 5. FILTERED GRID WITH 12 PRODUCTS PER PAGE LIMIT */}
        {paginatedServices.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {paginatedServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onQuickBook={handleQuickBook}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            {/* 6. PAGINATION CONTROLS (ONLY RENDERED WHEN > 12 PRODUCTS) */}
            {totalPages > 1 && (
              <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
                <div className="text-xs sm:text-sm text-white/60">
                  Page <strong className="text-white font-semibold">{currentPage}</strong> of <strong className="text-white font-semibold">{totalPages}</strong> ({filteredServices.length} total treatments, 12 per page)
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-white/5 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 cursor-pointer"
                    aria-label="Previous Page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline font-medium">Previous</span>
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    const isActive = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center ${
                          isActive
                            ? 'bg-brand-pink text-white shadow-lg shadow-brand-pink/30 scale-105 border border-brand-pink'
                            : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/15 hover:text-white'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-white/5 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 cursor-pointer"
                    aria-label="Next Page"
                  >
                    <span className="hidden sm:inline font-medium">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Empty Search & Filter State */
          <div className="bg-[#1C1418]/90 backdrop-blur-md rounded-3xl p-6 sm:p-12 text-center shadow-2xl border border-white/10 max-w-lg mx-auto my-8 sm:my-12 animate-fade-in">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 text-brand-pink flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <h3 className="font-serif font-bold text-lg sm:text-xl text-white mb-2">
              No services found
            </h3>

            <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6">
              We couldn't find any treatments matching your current search. Try a different keyword or reset filters.
            </p>

            <button
              onClick={handleClearAll}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white text-xs sm:text-sm font-semibold shadow-lg shadow-brand-pink/30 transition-all active:scale-95 cursor-pointer"
            >
              Clear Search & Show All Treatments
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
