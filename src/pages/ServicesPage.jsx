import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Sparkles, RefreshCw, Layers, ArrowDown } from 'lucide-react';
import { CATEGORIES } from '../data/servicesData';
import salonDB from '../db/salonDatabase';
import ServicesHero from '../components/services/ServicesHero';
import ServicesBenefits from '../components/services/ServicesBenefits';
import CategoryFilter from '../components/services/CategoryFilter';
import CategorySection from '../components/services/CategorySection';
import SearchBar from '../components/services/SearchBar';
import ServiceCard from '../components/common/ServiceCard';

export default function ServicesPage({ isSection = false }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const [servicesData, setServicesData] = useState(() => salonDB.getServices());
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ ...Object.fromEntries(searchParams), category: catId });
      // If on SPA, smooth scroll to category section
      const catEl = document.getElementById(`services-${catId}`);
      if (catEl) {
        const navHeight = 80;
        const pos = catEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    }
  };

  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSearchParams({});
  };

  // Calculate counts per category dynamically from database
  const categoryCounts = useMemo(() => {
    const counts = { all: servicesData.length };
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
        service.categoryName.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q) ||
        (service.features && service.features.some((f) => f.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [servicesData, selectedCategory, searchQuery]);

  const handleQuickBook = (service) => {
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      window.dispatchEvent(new CustomEvent('select-booking-service', { detail: service.id }));
      const navHeight = 80;
      const topPos = bookingEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: topPos, behavior: 'smooth' });
    } else {
      navigate(`/booking?service=${service.id}`);
    }
  };

  const handleViewDetails = (service) => {
    navigate(`/services/${service.id}`);
  };

  const isBrowsingAllSections = selectedCategory === 'all' && !searchQuery;
  const categoriesList = CATEGORIES.filter(c => c.id !== 'all');

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

        {/* 4. Active Filter Summary Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 sm:mb-8 border-b border-white/10 text-xs sm:text-sm text-white/60">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-pink flex-shrink-0" />
            <span>
              Showing <strong className="text-white">{filteredServices.length}</strong> {filteredServices.length === 1 ? 'treatment' : 'treatments'}
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
              <span>View All Categories & Sections</span>
            </button>
          )}
        </div>

        {/* 5. DEDICATED CATEGORY SECTIONS OR FILTERED GRID */}
        {isBrowsingAllSections ? (
          /* Render distinct showcase sections for each category */
          <div className="space-y-6">
            {categoriesList.map((cat) => {
              const catServices = servicesData.filter(s => s.category === cat.id && s.active !== false);
              return (
                <CategorySection
                  key={cat.id}
                  category={cat}
                  services={catServices}
                  onQuickBook={handleQuickBook}
                  onViewDetails={handleViewDetails}
                />
              );
            })}
          </div>
        ) : (
          /* Render filtered grid when user searches or picks a single category */
          <>
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onQuickBook={handleQuickBook}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
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
                  Clear Search & Show All Sections
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
