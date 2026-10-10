import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, Link, useSearchParams } from 'react-router-dom';
import { Search, Sparkles, SlidersHorizontal, ArrowRight, X } from 'lucide-react';
import { CATEGORIES } from '../data/servicesData';
import { salonDB } from '../db/salonDatabase';
import ServiceCard from '../components/common/ServiceCard';
import ScrollReveal from '../components/ScrollReveal/ScrollReveal';

// Unified Category Filter Pills
const CATEGORY_PILLS = [
  { id: 'all', label: 'All Services' },
  { id: 'threading', label: 'Threading & Tinting' },
  { id: 'waxing', label: 'Waxing Treatments' },
  { id: 'facial', label: 'Facial & Skin Care' },
  { id: 'makeup', label: 'Makeup Artistry' },
  { id: 'henna', label: 'Henna & Mehndi' },
  { id: 'hair-cut', label: 'Hair Care & Cuts' },
  { id: 'hair-color', label: 'Hair Color & Highlights' },
  { id: 'hair-treatment', label: 'Hair Treatments' },
  { id: 'hair-styling', label: 'Hair Styling & Blowout' },
  { id: 'massage', label: 'Head & Body Massage' }
];

export default function ServicesPage({ isSection = false }) {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  // Category state initialized from URL query param (?category=...)
  const initialCat = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [servicesData, setServicesData] = useState([]);

  // Load services from master database
  useEffect(() => {
    const list = salonDB.getServices();
    setServicesData(list);
  }, []);

  // Sync category state when URL changes
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    setSelectedCategory(cat);
  }, [searchParams]);

  // Set page title for standalone route
  useEffect(() => {
    if (!isSection) {
      document.title = 'Complete Treatment Catalogue — GLAM GIRL BY JANKI';
      window.scrollTo(0, 0);
    }
  }, [isSection]);

  // Switch category handler with smooth scroll to grid
  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setSearchQuery('');
  };

  // Filter & Search & Sort pipeline
  const filteredTreatments = useMemo(() => {
    let list = servicesData.filter((service) => {
      // 1. Category filter
      let matchesCategory = true;
      if (selectedCategory !== 'all') {
        const catConfig = CATEGORY_PILLS.find(c => c.id === selectedCategory);
        if (catConfig && catConfig.categories) {
          matchesCategory = catConfig.categories.includes(service.category);
        } else {
          matchesCategory = service.category === selectedCategory;
        }
      }

      // 2. Search query filter
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        matchesSearch =
          service.name.toLowerCase().includes(q) ||
          service.description.toLowerCase().includes(q) ||
          (service.categoryName && service.categoryName.toLowerCase().includes(q));
      }

      return matchesCategory && matchesSearch;
    });

    // 3. Sort logic
    if (sortBy === 'price-low') {
      list.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'duration') {
      list.sort((a, b) => parseInt(a.duration || 0) - parseInt(b.duration || 0));
    }

    return list;
  }, [servicesData, selectedCategory, searchQuery, sortBy]);

  const currentPill = CATEGORY_PILLS.find(c => c.id === selectedCategory || c.categories?.includes(selectedCategory));
  const currentCategoryObj = CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#10110F] pt-20 sm:pt-24 pb-20 selection:bg-[#263D2B] selection:text-white">
      
      {/* 1. HERO TITLE BANNER */}
      <div className="relative bg-[#F7F4ED] pt-8 sm:pt-12 pb-8 sm:pb-10 overflow-hidden border-b border-[#DCE1D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Main Editorial Headline */}
          {isSection ? (
            <h2 className="font-serif text-[28px] sm:text-[44px] lg:text-[52px] text-[#10110F] leading-[1.08] tracking-tight mb-2 font-normal">
              Curated Rituals for <span className="italic text-[#263D2B]">Hair & Beauty.</span>
            </h2>
          ) : (
            <h1 className="font-serif text-[28px] sm:text-[44px] lg:text-[52px] text-[#10110F] leading-[1.08] tracking-tight mb-2 font-normal">
              Curated Rituals for <span className="italic text-[#263D2B]">Hair & Beauty.</span>
            </h1>
          )}

          {/* Subtitle */}
          <p className="font-sans text-[#6B7068] text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-xl mx-auto font-normal">
            Explore our complete collection of 86 bespoke luxury salon & spa treatments in Ottawa.
          </p>
        </div>
      </div>

      {/* 2. STICKY SEARCH & CATEGORY CONTROLS TOOLBAR */}
      <div className="sticky top-[72px] sm:top-[78px] md:top-[84px] lg:top-[88px] z-30 bg-[#F7F4ED]/95 backdrop-blur-md border-b border-[#DCE1D8] shadow-xs py-3 sm:py-4 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search Input Form */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const grid = document.getElementById('services-grid-section');
              if (grid) {
                const navOffset = 140;
                const elementPosition = grid.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}
            className="relative max-w-2xl mx-auto mb-3"
          >
            <div className="relative flex items-center w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search treatments and rituals..."
                className="w-full bg-white border border-[#DCE1D8] focus:border-[#263D2B] rounded-full h-[46px] sm:h-[48px] pl-11 pr-28 text-xs sm:text-sm text-[#10110F] placeholder-[#6B7068] focus:outline-none shadow-2xs transition-all font-sans"
              />
              <Search className="w-4 h-4 text-[#6B7068] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              
              {/* Clear button if text exists */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-24 top-1/2 -translate-y-1/2 p-1.5 text-[#6B7068] hover:text-[#10110F] transition-colors cursor-pointer"
                  aria-label="Clear search text"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* SEARCH button */}
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-2 rounded-full bg-[#263D2B] hover:bg-[#1C2E20] text-white text-[10.5px] font-bold tracking-wider uppercase shadow-xs transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center min-h-[34px]"
              >
                <span>SEARCH</span>
              </button>
            </div>
          </form>

          {/* Category Filter Row */}
          <div className="w-full overflow-x-auto no-scrollbar scroll-smooth flex items-center justify-start sm:justify-center flex-nowrap sm:flex-wrap gap-2 pb-1 pt-1">
            {CATEGORY_PILLS.map((pill) => {
              const isActive = selectedCategory === pill.id || (pill.categories && pill.categories.includes(selectedCategory));
              return (
                <button
                  key={pill.id}
                  onClick={() => handleCategoryChange(pill.id)}
                  className={`min-h-[38px] px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.14em] whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 flex items-center justify-center gap-1.5 ${
                    isActive
                      ? 'bg-[#263D2B] text-white border border-[#263D2B] shadow-xs'
                      : 'bg-white text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED] border border-[#DCE1D8] active:scale-95'
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A8B5A0]" />
                  )}
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* 3. SORTING & RESULTS COUNTER BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#DCE1D8] gap-3">
          <div className="text-xs font-semibold text-[#6B7068] font-sans">
            Showing <span className="font-bold text-[#10110F]">{filteredTreatments.length}</span> luxury treatments
            {selectedCategory !== 'all' && (
              <span className="ml-1 text-[#263D2B]">
                in {currentPill?.label || currentCategoryObj?.name || selectedCategory}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-[#6B7068] font-sans">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#263D2B]" />
              <label htmlFor="services-sort-select" className="font-medium">Sort by:</label>
              <select
                id="services-sort-select"
                aria-label="Sort services by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#DCE1D8] rounded-[4px] px-3 py-1.5 text-xs text-[#10110F] font-semibold focus:outline-none focus:border-[#263D2B] shadow-2xs cursor-pointer min-h-[34px] font-sans"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 4. CARD GRID */}
      <div id="services-grid-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {filteredTreatments.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#DCE1D8] p-8 shadow-2xs max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#F7F4ED] text-[#263D2B] flex items-center justify-center mx-auto mb-3.5 border border-[#DCE1D8]">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F] mb-2">
              No treatments found
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7068] mb-6 font-sans">
              Try another service name or browse all treatments.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="global-button !px-6 !py-2.5 text-white text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs"
              >
                CLEAR SEARCH
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {(isSection ? filteredTreatments.slice(0, 9) : filteredTreatments).map((treatment) => (
              <ServiceCard key={treatment.id} service={treatment} />
            ))}
          </div>
        )}

        {isSection && (
          <div className="mt-12 flex justify-center">
            <Link
              to="/services"
              className="global-button inline-flex items-center gap-2.5 !px-8 !py-3.5 text-white text-xs font-bold uppercase tracking-widest shadow-sm cursor-pointer"
            >
              <span>VIEW ALL SERVICES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* 5. BOTTOM LUXURY BANNER */}
        <ScrollReveal className="mt-16 sm:mt-24 p-8 sm:p-14 rounded-2xl bg-white text-[#10110F] border border-[#DCE1D8] shadow-sm relative overflow-hidden text-center">
          <div className="max-w-2xl mx-auto relative z-10">
            <span className="inline-flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B] mb-3">
              <Sparkles className="w-4 h-4 text-[#263D2B]" />
              LUXURY SALON EXPERIENCE
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-normal text-[#10110F] mb-4">
              Elevate your beauty experience. Reserve your appointment today.
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7068] mb-8 leading-relaxed max-w-lg mx-auto font-sans">
              Treat yourself to bespoke hair styling, glowing facials, and luxury beauty treatments crafted by our master artists.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link
                to="/book-appointment"
                className="global-button !px-8 !py-3.5 text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
              >
                BOOK APPOINTMENT
              </Link>
              <a
                href="tel:16162550549"
                className="global-button-secondary !px-8 !py-3.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                CALL STUDIO
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
