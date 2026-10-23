import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, SlidersHorizontal, Sparkles, Calendar, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { CATEGORIES, ALL_SERVICES } from '../data/servicesData';
import salonDB from '../db/salonDatabase';
import ServiceCard from '../components/common/ServiceCard';
import ScrollReveal from '../components/ScrollReveal/ScrollReveal';
import MonthlyBeautyCalendar from '../components/beauty-guide/MonthlyBeautyCalendar';

export default function BeautyGuidePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [services, setServices] = useState(() => {
    try {
      const dbServices = salonDB.getServices();
      return dbServices && dbServices.length > 0 ? dbServices : ALL_SERVICES;
    } catch (e) {
      return ALL_SERVICES;
    }
  });

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  // Sync with live database
  useEffect(() => {
    const refreshServices = () => {
      try {
        const dbServices = salonDB.getServices();
        if (dbServices && dbServices.length > 0) {
          setServices(dbServices);
        }
      } catch (err) {
        console.warn('Error refreshing services:', err);
      }
    };

    refreshServices();
    const unsub = salonDB.subscribe(() => {
      refreshServices();
    });
    return () => unsub();
  }, []);

  // Update page title & scroll top on mount
  useEffect(() => {
    document.title = 'Beauty Guide: Complete Salon Services Catalog — GLAM GIRL BY JANKI';
    window.scrollTo(0, 0);
  }, []);

  // Sync category with URL if changed
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    setSelectedCategory(cat);
  }, [searchParams]);

  // Handle category switch
  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams, { replace: true });
  };

  // Build category filter list dynamically with exact counts from master data
  const categoryFilters = useMemo(() => {
    const list = [{ id: 'all', name: 'All Services', count: services.length }];

    CATEGORIES.forEach((cat) => {
      const count = services.filter((s) => {
        const sCat = String(s.category || '').toLowerCase().replace(/[-_\s]/g, '');
        const target = String(cat.id || '').toLowerCase().replace(/[-_\s]/g, '');
        return sCat === target || s.category === cat.id;
      }).length;

      if (count > 0) {
        list.push({
          id: cat.id,
          name: cat.name,
          count
        });
      }
    });

    return list;
  }, [services]);

  // Filter & Search & Sort pipeline
  const filteredServices = useMemo(() => {
    let result = services.filter((service) => {
      // 1. Category filter
      let matchesCat = true;
      if (selectedCategory !== 'all') {
        const sCat = String(service.category || '').toLowerCase().replace(/[-_\s]/g, '').replace(/s$/, '');
        const target = String(selectedCategory).toLowerCase().replace(/[-_\s]/g, '').replace(/s$/, '');
        matchesCat = service.category === selectedCategory || sCat === target;
      }

      // 2. Search query filter
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inName = (service.name || '').toLowerCase().includes(q);
        const inDesc = (service.description || '').toLowerCase().includes(q);
        const inCat = (service.categoryName || service.category || '').toLowerCase().includes(q);
        const inFeatures = Array.isArray(service.features) && service.features.some(f => f.toLowerCase().includes(q));
        matchesSearch = inName || inDesc || inCat || inFeatures;
      }

      return matchesCat && matchesSearch;
    });

    // 3. Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    } else if (sortBy === 'duration') {
      result.sort((a, b) => {
        const durA = parseInt(String(a.duration || '0').match(/\d+/)?.[0] || '0', 10);
        const durB = parseInt(String(b.duration || '0').match(/\d+/)?.[0] || '0', 10);
        return durA - durB;
      });
    }

    return result;
  }, [services, selectedCategory, searchQuery, sortBy]);

  const activeCategoryObj = categoryFilters.find(c => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#10110F] pt-24 sm:pt-28 pb-20 selection:bg-[#263D2B] selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 pb-10 text-center border-b border-[#DCE1D8]">
        <ScrollReveal className="max-w-3xl mx-auto space-y-4">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
            <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              MASTER BEAUTY GUIDE
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight leading-[1.12]">
            Beauty Guide &amp; Services
          </h1>

          {/* Subtle Decorative Line */}
          <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

          {/* Subtitle */}
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto">
            Discover our complete salon services catalog. Every treatment is thoughtfully designed with tailored care, master artistry, and transparent CAD pricing.
          </p>

        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 2. STICKY SEARCH & CATEGORY CONTROLS TOOLBAR                              */}
      {/* ========================================================================= */}
      <div className="sticky top-[80px] sm:top-[86px] lg:top-[92px] z-30 bg-[#F7F4ED]/95 backdrop-blur-md border-b border-[#DCE1D8] shadow-xs py-3 sm:py-4 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="w-4 h-4 text-[#6B7068] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all salon services by name, keyword, or treatment..."
              className="w-full bg-white border border-[#DCE1D8] focus:border-[#263D2B] rounded-full h-[46px] pl-11 pr-10 text-xs sm:text-sm text-[#10110F] placeholder-[#6B7068] focus:outline-none shadow-2xs transition-all font-sans"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-[#6B7068] hover:text-[#10110F] transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="w-full overflow-x-auto pb-1 scrollbar-none flex items-center justify-start sm:justify-center gap-2 flex-nowrap sm:flex-wrap">
            {categoryFilters.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`min-h-[36px] px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.14em] whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#263D2B] text-white border border-[#263D2B] shadow-xs'
                      : 'bg-white text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED] border border-[#DCE1D8]'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#F7F4ED] text-[#465640]'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. RESULTS COUNTER & SORTING CONTROLS                                     */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#DCE1D8] gap-3">
          
          <div className="text-xs font-semibold text-[#6B7068] font-sans">
            Showing <span className="font-bold text-[#10110F]">{filteredServices.length}</span> of {services.length} services
            {selectedCategory !== 'all' && (
              <span className="ml-1 text-[#263D2B]">
                in {activeCategoryObj?.name || selectedCategory}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-[#6B7068] font-sans">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#263D2B]" />
            <label htmlFor="beauty-guide-sort" className="font-medium">Sort by:</label>
            <select
              id="beauty-guide-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#DCE1D8] rounded-[4px] px-3 py-1.5 text-xs text-[#10110F] font-semibold focus:outline-none focus:border-[#263D2B] shadow-2xs cursor-pointer min-h-[34px]"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="duration">Duration</option>
            </select>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. ALL SALON SERVICES GRID                                                */}
      {/* ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#DCE1D8] p-8 shadow-xs max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#F7F4ED] text-[#263D2B] flex items-center justify-center mx-auto mb-3.5 border border-[#DCE1D8]">
              <Search className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F] mb-2">
              No services found
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7068] mb-6 font-sans">
              No services matched your search criteria. Try a different keyword or reset filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-6 py-2.5 rounded-[4px] bg-[#263D2B] hover:bg-[#1C2E20] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              View All Services
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {/* 5. MONTHLY BEAUTY CALENDAR SECTION */}
        <MonthlyBeautyCalendar />

        {/* Bottom Banner */}
        <ScrollReveal className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-3xl bg-white text-[#10110F] border border-[#DCE1D8] shadow-xs relative overflow-hidden text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              <Sparkles className="w-4 h-4 text-[#263D2B]" />
              NEED PERSONAL GUIDANCE?
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#10110F]">
              Ready to experience our signature treatments?
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed max-w-lg mx-auto font-sans font-light">
              Book online or consult with master artist Janki Khatroja to find the perfect ritual for your skin, hair, and style.
            </p>

            <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
              <Link
                to="/book-appointment"
                className="global-button !px-8 !py-3.5 text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
              >
                BOOK APPOINTMENT
              </Link>
              <Link
                to="/contact"
                className="global-button-secondary !px-8 !py-3.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                CONTACT ATELIER
              </Link>
            </div>
          </div>
        </ScrollReveal>

      </main>

    </div>
  );
}
