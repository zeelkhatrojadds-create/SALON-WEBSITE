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

  // Filter & Sort treatments
  const filteredTreatments = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    
    let list = servicesData.filter((service) => {
      if (service.active === false) return false;

      // Category matching logic
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

      // Search matching logic
      const matchesSearch =
        !q ||
        service.name.toLowerCase().includes(q) ||
        (service.categoryName && service.categoryName.toLowerCase().includes(q)) ||
        (service.description && service.description.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });

    // Sort logic
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
      {/* 1. HERO BANNER - Curated Rituals for Hair & Beauty                         */}
      {/* ========================================================================= */}
      <div className="relative bg-gradient-to-b from-[#F5EFE6] via-[#FAF5EE] to-[#FBF8F4] pt-12 sm:pt-16 pb-12 sm:pb-16 overflow-hidden border-b border-[#E8DFD3]">
        <div className="absolute top-0 right-1/4 w-[480px] h-[480px] bg-[#CFA46A]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[360px] h-[360px] bg-[#E8DFD3]/40 rounded-full blur-2xl pointer-events-none" />

        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center" stagger={true}>
          
          {/* Eyebrow Pill Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#CFA46A]/40 text-[#A67C48] text-[11px] font-bold tracking-[0.24em] uppercase mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#CFA46A]" />
            <span>GLAM GIRL EXCLUSIVE</span>
          </div>

          {/* Main Editorial Headline */}
          {isSection ? (
            <h2 className="font-serif text-[30px] sm:text-[54px] lg:text-[64px] text-[#1E1714] leading-[1.05] tracking-[-0.01em] mb-4 font-semibold">
              Curated Rituals for <span className="italic font-serif text-[#CFA46A]">Hair & Beauty.</span>
            </h2>
          ) : (
            <h1 className="font-serif text-[30px] sm:text-[54px] lg:text-[64px] text-[#1E1714] leading-[1.05] tracking-[-0.01em] mb-4 font-semibold">
              Curated Rituals for <span className="italic font-serif text-[#CFA46A]">Hair & Beauty.</span>
            </h1>
          )}

          {/* Subtitle */}
          <p className="font-body text-[#5A4F48] text-sm sm:text-base lg:text-[16.5px] leading-relaxed max-w-2xl mx-auto font-normal mb-8">
            Indulge in bespoke salon treatments tailored to your unique elegance.
          </p>

          {/* Key Feature Bullets */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs sm:text-[13px] font-medium text-[#6B5E55]">
            <span className="inline-flex items-center gap-2">
              <span className="text-[#CFA46A] text-sm">✦</span> Certified Stylists
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="text-[#CFA46A] text-sm">✦</span> Premium Eco-Friendly Products
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="text-[#CFA46A] text-sm">✦</span> Hygienic & Safe
            </span>
          </div>

        </ScrollReveal>
      </div>

      {/* ========================================================================= */}
      {/* 2. SEARCH BAR & FILTER CONTROL TOOLBAR                                    */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        
        {/* Search Input Box */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 72 treatments and custom packages..."
              className="w-full bg-white border border-[#DED4C7] focus:border-[#1E1714] rounded-full py-4 pl-14 pr-28 text-sm text-[#1E1714] placeholder-[#8C7E75] focus:outline-none shadow-md shadow-black/5 transition-all"
            />
            <Search className="w-5 h-5 text-[#8C7E75] absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none" />
            
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-[#8C7E75] hover:text-[#1E1714] transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 rounded-full bg-[#1E1714] text-white text-[11px] font-bold tracking-wider uppercase pointer-events-none shadow-sm">
                SEARCH
              </div>
            )}
          </div>
        </div>

        {/* Category Pill Navigation Row */}
        <div className="mb-6 pb-2">
          {/* Scrollable Pills container - horizontal scroll on mobile, wraps on desktop */}
          <div className="pills-scroll sm:flex-wrap">
            {CATEGORY_PILLS.map((pill) => {
              const isActive = selectedCategory === pill.id || (pill.categories && pill.categories.includes(selectedCategory));
              return (
                <button
                  key={pill.id}
                  onClick={() => handleCategoryChange(pill.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 ${
                    isActive
                      ? 'bg-[#1E1714] text-white shadow-md scale-[1.02]'
                      : 'bg-white text-[#5A4F48] hover:text-[#1E1714] hover:bg-[#F2ECE4] border border-[#E0D5C7] shadow-xs'
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filters Bar (Sort & Counter) */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-8 border-b border-[#E8DFD3] gap-4">
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
                className="bg-white border border-[#E0D5C7] rounded-lg px-3 py-1.5 text-xs text-[#1E1714] font-semibold focus:outline-none focus:border-[#CFA46A] shadow-xs cursor-pointer"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Empty Search State */}
        {filteredTreatments.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#E8DFD3] p-8 shadow-sm">
            <p className="text-base text-[#6B5E55] mb-4">No treatments found matching "{searchQuery}".</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-6 py-3 rounded-full bg-[#1E1714] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#CFA46A] hover:text-[#1E1714] transition-colors"
            >
              Reset Filters & View All Services
            </button>
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

