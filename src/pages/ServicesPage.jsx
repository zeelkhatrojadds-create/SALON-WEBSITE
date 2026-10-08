import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Search, 
  Check, 
  Star,
  MessageCircle,
  Phone,
  SlidersHorizontal,
  X
} from 'lucide-react';
import salonDB from '../db/salonDatabase';
import { CATEGORIES } from '../data/servicesData';
import ServiceCard from '../components/common/ServiceCard';
import ScrollReveal from '../components/ScrollReveal/ScrollReveal';

// Broad Category Pills matching screenshot
const CATEGORY_PILLS = [
  { id: 'all', label: 'ALL SERVICES', count: 72 },
  { id: 'hair-care', label: 'HAIR CARE', count: 18, categories: ['hair-cut', 'hair-color', 'hair-treatments'] },
  { id: 'styling', label: 'STYLING', count: 6, categories: ['hairstyling'] },
  { id: 'skin-care', label: 'SKIN CARE', count: 12, categories: ['facial'] },
  { id: 'massage', label: 'MASSAGE & BODY', count: 2, categories: ['massage'] },
  { id: 'make-up', label: 'MAKE UP', count: 8, categories: ['makeup'] },
  { id: 'nails', label: 'NAILS', count: 6, categories: ['nails'] },
  { id: 'waxing', label: 'WAXING', count: 19, categories: ['waxing'] },
  { id: 'bridal', label: 'BRIDAL & MEHNDI', count: 6, categories: ['henna', 'bridal'] },
  { id: 'grooming', label: 'GROOMING & LASHES', count: 8, categories: ['threading', 'lashes'] },
];

export default function ServicesPage({ isSection = false }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'all';

  const [servicesData, setServicesData] = useState(() => salonDB.getServices());
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [genderFilter, setGenderFilter] = useState('all');

  // Live database subscription
  useEffect(() => {
    const updateData = () => {
      setServicesData(salonDB.getServices());
    };
    const unsubscribe = salonDB.subscribe(updateData);
    return () => unsubscribe();
  }, []);

  // Sync category param
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  // Filter & Sort treatments — Case-insensitive partial matching on service.name + category
  const filteredTreatments = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    
    let list = servicesData.filter((service) => {
      if (service.active === false) return false;

      // 1. Category filter matching
      let matchesCategory = false;
      if (selectedCategory === 'all') {
        matchesCategory = true;
      } else {
        const pillConfig = CATEGORY_PILLS.find(p => p.id === selectedCategory || p.categories?.includes(selectedCategory));
        if (pillConfig && pillConfig.categories) {
          matchesCategory = pillConfig.categories.includes(service.category?.toLowerCase());
        } else {
          matchesCategory =
            service.category?.toLowerCase() === selectedCategory.toLowerCase() ||
            service.categoryName?.toLowerCase() === selectedCategory.toLowerCase();
        }
      }

      // 2. Search query matching on service.name
      let matchesSearch = true;
      if (q) {
        const name = (service.name || '').toLowerCase();
        const catName = (service.categoryName || '').toLowerCase();
        const catId = (service.category || '').toLowerCase();
        
        matchesSearch = name.includes(q) || catName.includes(q) || catId.includes(q);
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
    <div className="min-h-screen bg-[#FBF8F4] text-[#1C1614] pt-20 sm:pt-24 pb-20 selection:bg-[#CFA46A] selection:text-[#100C0D]">
      
      {/* ========================================================================= */}
      {/* 1. COMPACT HERO TITLE BANNER                                              */}
      {/* ========================================================================= */}
      <div className="relative bg-gradient-to-b from-[#F5EFE6] via-[#FAF5EE] to-[#FBF8F4] pt-6 sm:pt-10 pb-6 sm:pb-8 overflow-hidden border-b border-[#E8DFD3]">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#CFA46A]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-[#E8DFD3]/40 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Eyebrow Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#CFA46A]/40 text-[#A67C48] text-[10.5px] font-bold tracking-[0.24em] uppercase mb-2.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#CFA46A]" />
            <span>GLAM GIRL ATELIER</span>
          </div>

          {/* Main Editorial Headline */}
          {isSection ? (
            <h2 className="font-serif text-[28px] sm:text-[44px] lg:text-[52px] text-[#1E1714] leading-[1.08] tracking-[-0.01em] mb-2 font-semibold">
              Curated Rituals for <span className="italic font-serif text-[#CFA46A]">Hair & Beauty.</span>
            </h2>
          ) : (
            <h1 className="font-serif text-[28px] sm:text-[44px] lg:text-[52px] text-[#1E1714] leading-[1.08] tracking-[-0.01em] mb-2 font-semibold">
              Curated Rituals for <span className="italic font-serif text-[#CFA46A]">Hair & Beauty.</span>
            </h1>
          )}

          {/* Subtitle */}
          <p className="font-body text-[#5A4F48] text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-xl mx-auto font-normal">
            Explore our complete collection of 72 bespoke luxury salon & spa treatments in Ottawa.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. STICKY SEARCH & CATEGORY CONTROLS TOOLBAR                              */}
      {/* ========================================================================= */}
      <div className="sticky top-[68px] sm:top-[74px] md:top-[78px] lg:top-[80px] z-30 bg-[#FBF8F4]/95 backdrop-blur-md border-b border-[#E8DFD3] shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-3 sm:py-4 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* A. Search Input Form */}
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
                placeholder="Search 72 treatments and services..."
                className="w-full bg-white border border-[#DED4C7] focus:border-[#1E1714] rounded-full h-[46px] sm:h-[50px] pl-11 sm:pl-13 pr-28 sm:pr-32 text-xs sm:text-sm text-[#1E1714] placeholder-[#8C7E75] focus:outline-none shadow-sm transition-all"
              />
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#8C7E75] absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 pointer-events-none" />
              
              {/* Clear button if text exists */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-24 sm:right-28 top-1/2 -translate-y-1/2 p-1.5 text-[#8C7E75] hover:text-[#1E1714] transition-colors cursor-pointer"
                  aria-label="Clear search text"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Clickable SEARCH button */}
              <button
                type="submit"
                className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 px-4 sm:px-5 py-2 rounded-full bg-[#1E1714] hover:bg-[#CFA46A] hover:text-[#100C0D] text-white text-[10.5px] sm:text-[11.5px] font-extrabold tracking-wider uppercase shadow-sm transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center min-h-[36px]"
              >
                <span>SEARCH</span>
              </button>
            </div>
          </form>

          {/* B. Category Filter Row — Haute Luxe Obsidian & Gold Aesthetic with Mobile Scroll & Desktop Centered Wrap */}
          <div className="w-full overflow-x-auto no-scrollbar scroll-smooth flex items-center justify-start sm:justify-center flex-nowrap sm:flex-wrap gap-2 sm:gap-2.5 pb-1 pt-1">
            {CATEGORY_PILLS.map((pill) => {
              const isActive = selectedCategory === pill.id || (pill.categories && pill.categories.includes(selectedCategory));
              return (
                <button
                  key={pill.id}
                  onClick={() => handleCategoryChange(pill.id)}
                  className={`min-h-[42px] px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-[11.5px] font-bold uppercase tracking-[0.14em] whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 flex items-center justify-center gap-1.5 ${
                    isActive
                      ? 'bg-[#120D0F] text-[#FFF6E5] border border-[#CFA46A] shadow-[0_4px_18px_rgba(207,164,106,0.32)] scale-[1.03]'
                      : 'bg-white/95 text-[#483C36] hover:text-[#120D0F] hover:bg-[#FAF4EC] border border-[#E2D6C8] hover:border-[#CFA46A]/50 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(207,164,106,0.12)] active:scale-95'
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CFA46A] shadow-[0_0_8px_#CFA46A] animate-pulse" />
                  )}
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SORTING & RESULTS COUNTER BAR                                          */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#E8DFD3] gap-3">
          <div className="text-xs font-semibold text-[#6B5E55]">
            Showing <span className="font-bold text-[#1E1714]">{filteredTreatments.length}</span> luxury treatments
            {selectedCategory !== 'all' && (
              <span className="ml-1 text-[#A67C48]">
                in {currentPill?.label || currentCategoryObj?.name || selectedCategory}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs text-[#6B5E55]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#A67C48]" />
              <label htmlFor="services-sort-select" className="font-medium">Sort by:</label>
              <select
                id="services-sort-select"
                aria-label="Sort services by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#E0D5C7] rounded-lg px-3 py-1.5 text-xs text-[#1E1714] font-semibold focus:outline-none focus:border-[#CFA46A] shadow-xs cursor-pointer min-h-[36px]"
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

      {/* ========================================================================= */}
      {/* 3. CARD GRID (3 COLUMNS - EXACT MATCH TO REFERENCE SCREENSHOT)             */}
      {/* ========================================================================= */}
      <div id="services-grid-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Empty Search State */}
        {filteredTreatments.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E8DFD3] p-8 shadow-sm max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#F5EFE6] text-[#A67C48] flex items-center justify-center mx-auto mb-3.5">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1E1714] mb-2">
              No treatments found
            </h3>
            <p className="text-xs sm:text-sm text-[#6B5E55] mb-6">
              Try another service name or browse all treatments.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-6 py-2.5 rounded-full bg-[#1E1714] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#CFA46A] hover:text-[#100C0D] transition-all cursor-pointer shadow-sm active:scale-95 min-h-[40px]"
              >
                CLEAR SEARCH
              </button>
              {selectedCategory !== 'all' && (
                <button
                  type="button"
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  className="px-6 py-2.5 rounded-full border border-[#E0D5C7] text-[#5A4F48] hover:text-[#1E1714] hover:bg-[#F2ECE4] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95 min-h-[40px]"
                >
                  VIEW ALL SERVICES
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {(isSection ? filteredTreatments.slice(0, 8) : filteredTreatments).map((treatment) => (
              <ServiceCard key={treatment.id} service={treatment} />
            ))}
          </div>
        )}

        {isSection && (
          <div className="mt-12 flex justify-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#CFA46A] hover:bg-[#B88D57] text-[#100C0D] text-xs font-bold uppercase tracking-widest transition-all duration-200 shadow-xl shadow-[#CFA46A]/20 hover:scale-105 cursor-pointer"
            >
              <span>VIEW ALL SERVICES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. BOTTOM DARK LUXURY BANNER                                              */}
        {/* ========================================================================= */}
        <ScrollReveal className="mt-16 sm:mt-24 p-8 sm:p-14 rounded-3xl bg-[#140E11] text-[#FAF6F0] border border-white/10 shadow-2xl relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#CFA46A]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl mx-auto relative z-10">
            <span className="inline-flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#CFA46A] mb-3">
              <Sparkles className="w-4 h-4 text-[#CFA46A]" />
              LUXURY SALON EXPERIENCE
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-white mb-4">
              Elevate your salon experience. Book an appointment today.
            </h3>
            <p className="text-xs sm:text-sm text-[#C8BCB3] mb-8 leading-relaxed max-w-lg mx-auto">
              Treat yourself to bespoke hair styling, glowing facials, and luxury beauty treatments crafted by our master artists.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link
                to="/book-appointment"
                className="px-8 py-3.5 rounded-full bg-[#CFA46A] hover:bg-[#E5C492] text-[#140E11] text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-lg"
              >
                BOOK APPOINTMENT
              </Link>
              <a
                href="tel:16162550549"
                className="px-8 py-3.5 rounded-full border border-white/30 hover:border-white text-white text-xs font-bold uppercase tracking-wider transition-all duration-200"
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

