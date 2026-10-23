import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  X, 
  Printer, 
  Clock, 
  ArrowRight, 
  SlidersHorizontal, 
  LayoutList, 
  LayoutGrid, 
  Sparkles, 
  HelpCircle, 
  ShieldCheck, 
  RotateCcw,
  CheckCircle2,
  CalendarCheck,
  Zap,
  Coffee,
  Heart,
  Crown,
  AlertTriangle
} from 'lucide-react';
import { salonDB } from '../db/salonDatabase';
import { CATEGORIES } from '../data/servicesData';
import ScrollReveal from '../components/ScrollReveal/ScrollReveal';
import LuxuryBeautyMenuPreviewSection from '../components/services/LuxuryBeautyMenuPreviewSection';

// Helper to parse duration string to integer minutes for robust sorting and slot calculations
function parseDurationMinutes(durationStr) {
  if (!durationStr) return 999999;
  if (typeof durationStr === 'number') return durationStr;
  const match = String(durationStr).match(/(\d+)/);
  if (!match) return 999999;
  const num = parseInt(match[1], 10);
  const lower = String(durationStr).toLowerCase();
  if (lower.includes('hr') || lower.includes('hour')) {
    return num * 60;
  }
  return num;
}

// Helper to format price in CAD safely without guessing
function formatPriceCAD(price) {
  if (price === null || price === undefined || price === '' || isNaN(Number(price))) {
    return 'Contact for pricing';
  }
  return `$${Number(price)} CAD`;
}

// Helper to format duration safely with hours + minutes and review flag for missing data
function formatDurationDetails(duration, durationDisplay) {
  if (!duration && !durationDisplay) {
    return {
      text: 'Duration not specified',
      isMissing: true,
      mins: null
    };
  }

  const raw = String(durationDisplay || duration || '').trim();
  const mins = parseDurationMinutes(raw);

  if (mins === 999999 || isNaN(mins) || mins <= 0) {
    return {
      text: raw || 'Duration not specified',
      isMissing: !raw,
      mins: null
    };
  }

  let formatted = `${mins} min`;
  if (mins >= 60) {
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    if (remMins === 0) {
      formatted = `${hrs} hr${hrs > 1 ? 's' : ''} (${mins} min)`;
    } else {
      formatted = `${hrs} hr ${remMins} min (${mins} min)`;
    }
  }

  return {
    text: formatted,
    isMissing: false,
    mins
  };
}

// Standard categories matching salon services
const CATEGORY_GROUPS = [
  { id: 'all', label: 'All Services', aliases: ['all'] },
  { id: 'hair-care', label: 'Hair Care', aliases: ['hair-cut', 'hair-treatments', 'hair-color', 'hair-care'] },
  { id: 'hairstyling', label: 'Hair Styling', aliases: ['hairstyling', 'hair styling'] },
  { id: 'facial', label: 'Skin Care & Facials', aliases: ['facial', 'skincare', 'skin-care'] },
  { id: 'makeup', label: 'Makeup', aliases: ['makeup'] },
  { id: 'nails', label: 'Nails', aliases: ['nails', 'nail'] },
  { id: 'waxing', label: 'Waxing', aliases: ['waxing', 'wax'] },
  { id: 'massage', label: 'Spa & Body', aliases: ['massage', 'spa'] },
  { id: 'bridal', label: 'Bridal', aliases: ['bridal', 'henna', 'mehndi'] },
  { id: 'threading', label: 'Grooming', aliases: ['threading'] }
];

// Time budget duration brackets
const DURATION_BRACKETS = [
  {
    id: 'express',
    title: 'Quick Refinements',
    rangeLabel: '< 30 min',
    min: 0,
    max: 29,
    icon: Zap,
    description: 'Eyebrows, lip grooming, split-end dusting, lash removals'
  },
  {
    id: 'standard',
    title: 'Standard Treatments',
    rangeLabel: '30 – 60 min',
    min: 30,
    max: 60,
    icon: Coffee,
    description: 'Precision haircuts, blowouts, express facials, waxing'
  },
  {
    id: 'relaxed',
    title: 'Relaxing Rituals',
    rangeLabel: '60 – 90 min',
    min: 61,
    max: 90,
    icon: Heart,
    description: 'Ayurvedic hair spas, pedicures, evening party makeup'
  },
  {
    id: 'extended',
    title: 'Full Transformations',
    rangeLabel: '90+ min',
    min: 91,
    max: 9999,
    icon: Crown,
    description: 'Royal bridal makeovers, balayage, mega volume lash sets'
  }
];

export default function PriceListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // URL-driven category param
  const initialCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [durationFilter, setDurationFilter] = useState('all'); // 'all' | 'express' | 'standard' | 'relaxed' | 'extended'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('category'); // 'category' | 'duration-asc' | 'duration-desc' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'
  const [services, setServices] = useState(() => salonDB.getServices());

  // Subscribe to live database updates
  useEffect(() => {
    document.title = 'All Services & Price List — GLAM GIRL BY JANKI | Ottawa';
    window.scrollTo({ top: 0, behavior: 'instant' });

    const sync = () => {
      setServices(salonDB.getServices());
    };
    sync();

    const unsub = salonDB.subscribe(sync);

    const handleCustomChange = (e) => {
      if (e?.detail?.event === 'services_updated') {
        sync();
      }
    };
    window.addEventListener('glfy_db_change', handleCustomChange);

    return () => {
      unsub();
      window.removeEventListener('glfy_db_change', handleCustomChange);
    };
  }, []);

  // Sync category state with searchParams
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    setSelectedCategory(cat);
  }, [searchParams]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setDurationFilter('all');
    setSortBy('category');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  // Helper to test if a service matches a category group
  const serviceMatchesCategory = (service, catGroupId) => {
    if (catGroupId === 'all') return true;

    const group = CATEGORY_GROUPS.find((g) => g.id === catGroupId);
    if (!group) {
      return service.category === catGroupId;
    }

    if (group.id === 'bridal') {
      const sId = (service.id || '').toLowerCase();
      const sName = (service.name || '').toLowerCase();
      return sId.includes('bridal') || sName.includes('bridal') || service.category === 'henna';
    }

    return group.aliases.some((alias) => {
      return (
        service.category === alias ||
        (service.categoryName && service.categoryName.toLowerCase().includes(alias))
      );
    });
  };

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: services.length };
    CATEGORY_GROUPS.forEach((group) => {
      if (group.id !== 'all') {
        counts[group.id] = services.filter((s) => serviceMatchesCategory(s, group.id)).length;
      }
    });
    return counts;
  }, [services]);

  // Compute duration bracket counts
  const durationBracketCounts = useMemo(() => {
    const counts = { express: 0, standard: 0, relaxed: 0, extended: 0 };
    services.forEach((s) => {
      const mins = parseDurationMinutes(s.duration || s.durationDisplay);
      if (mins < 30) counts.express += 1;
      else if (mins <= 60) counts.standard += 1;
      else if (mins <= 90) counts.relaxed += 1;
      else counts.extended += 1;
    });
    return counts;
  }, [services]);

  // Filter & Search & Sort pipeline
  const filteredServices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    // 1. Filter
    let list = services.filter((s) => {
      // Category match
      const matchesCategory = serviceMatchesCategory(s, selectedCategory);

      // Duration bracket match
      let matchesDuration = true;
      if (durationFilter !== 'all') {
        const mins = parseDurationMinutes(s.duration || s.durationDisplay);
        const bracket = DURATION_BRACKETS.find((b) => b.id === durationFilter);
        if (bracket) {
          matchesDuration = mins >= bracket.min && mins <= bracket.max;
        }
      }

      // Keyword match (service name, description, category name)
      const matchesSearch =
        !q ||
        (s.name && s.name.toLowerCase().includes(q)) ||
        (s.description && s.description.toLowerCase().includes(q)) ||
        (s.categoryName && s.categoryName.toLowerCase().includes(q)) ||
        (s.category && s.category.toLowerCase().includes(q));

      return matchesCategory && matchesDuration && matchesSearch;
    });

    // 2. Sort
    list = [...list];
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => {
          const pa = typeof a.price === 'number' ? a.price : 999999;
          const pb = typeof b.price === 'number' ? b.price : 999999;
          return pa - pb;
        });
        break;
      case 'price-desc':
        list.sort((a, b) => {
          const pa = typeof a.price === 'number' ? a.price : -1;
          const pb = typeof b.price === 'number' ? b.price : -1;
          return pb - pa;
        });
        break;
      case 'duration-asc':
        list.sort((a, b) => parseDurationMinutes(a.duration || a.durationDisplay) - parseDurationMinutes(b.duration || b.durationDisplay));
        break;
      case 'duration-desc':
        list.sort((a, b) => parseDurationMinutes(b.duration || b.durationDisplay) - parseDurationMinutes(a.duration || a.durationDisplay));
        break;
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'category':
      default:
        // Keep category order
        break;
    }

    return list;
  }, [services, selectedCategory, durationFilter, searchQuery, sortBy]);

  // Group by category when viewing in 'category' order without search query or duration filter
  const shouldGroup = sortBy === 'category' && !searchQuery.trim() && selectedCategory === 'all' && durationFilter === 'all';

  // Grouped list
  const groupedServices = useMemo(() => {
    if (!shouldGroup) return [];
    const groups = [];
    CATEGORIES.forEach((cat) => {
      const catServices = filteredServices.filter((s) => s.category === cat.id);
      if (catServices.length > 0) {
        groups.push({
          category: cat,
          items: catServices
        });
      }
    });
    return groups;
  }, [shouldGroup, filteredServices]);

  // Print handler
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F7F4ED] text-[#10110F] pt-24 sm:pt-28 pb-16 sm:pb-24 selection:bg-[#263D2B] selection:text-white font-sans antialiased">
      
      {/* ========================================================================= */}
      {/* PRINT-ONLY OFFICIAL HEADER (HIDDEN ON SCREEN, SHOWN WHEN PRINTED)         */}
      {/* ========================================================================= */}
      <div className="hidden print:block mb-8 border-b-2 border-[#10110F] pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#10110F] uppercase tracking-wider">
              GLAM GIRL BY JANKI
            </h1>
            <p className="text-xs text-[#465640] tracking-widest uppercase mt-0.5 font-medium">
              Official Salon &amp; Spa Service Duration &amp; Price List
            </p>
          </div>
          <div className="text-right text-[11px] text-[#465640] leading-tight">
            <p>405 Euphoria Crescent, Ottawa, ON K2J 7M7</p>
            <p>Tel: +1 (616) 255-0549 • Glamgirlbyjanki@gmail.com</p>
            <p className="mt-1 font-semibold text-[#10110F]">All Prices in CAD (Canadian Dollars)</p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (SCREEN ONLY)                                             */}
      {/* ========================================================================= */}
      <section className="print:hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-4 sm:pt-8 pb-8 sm:pb-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#DCE1D8] pb-8 sm:pb-12">
          
          <div className="max-w-2xl space-y-3.5">
            {/* Small Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[#263D2B] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
              <span>TRANSPARENT LUXURY PRICING</span>
            </div>

            {/* Main Page Heading */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#10110F] font-normal tracking-tight leading-[1.12]">
              All Services &amp;{' '}
              <span className="italic font-normal text-[#263D2B]">
                Price List
              </span>
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-xl">
              Explore our complete beauty repertoire, transparent pricing, and treatment durations to plan your next salon visit in Ottawa.
            </p>
          </div>

          {/* Quick Header Actions (Print / Book) */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={handlePrint}
              aria-label="Print or save price list as PDF"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-[4px] bg-white hover:bg-[#F7F4ED] border border-[#DCE1D8] hover:border-[#263D2B] text-[#10110F] text-xs font-bold uppercase tracking-[0.14em] transition-all duration-200 cursor-pointer shadow-xs active:scale-98"
            >
              <Printer className="w-4 h-4 text-[#263D2B]" />
              <span>PRINT / SAVE PDF</span>
            </button>

            <Link
              to="/book-appointment"
              className="global-button !px-6 !py-3 !text-xs text-white inline-flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>BOOK APPOINTMENT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE GLAM GIRL BEAUTY MENU (ULTRA-PREMIUM EDITORIAL LOOKBOOK SECTION)   */}
      {/* ========================================================================= */}
      <div className="print:hidden">
        <LuxuryBeautyMenuPreviewSection />
      </div>

      {/* ========================================================================= */}
      {/* 3. SERVICE DURATION GUIDE SECTION (HEADER, TIME-BUDGET CARDS & FILTERS)   */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10 sm:mb-12">
        
        {/* SECTION HEADING */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              PLAN YOUR BEAUTY EXPERIENCE
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight leading-[1.12]">
            Service Duration Guide
          </h2>

          {/* Subtle Accent Line */}
          <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

          {/* Description */}
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto">
            Know how much time to set aside for your favourite treatments and plan your salon visit with confidence.
          </p>
        </ScrollReveal>

        {/* TIME-BUDGET DURATION BRACKET CARDS (CLICKABLE DURATION FILTERS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {DURATION_BRACKETS.map((bracket) => {
            const Icon = bracket.icon;
            const count = durationBracketCounts[bracket.id];
            const isSelected = durationFilter === bracket.id;

            return (
              <button
                key={bracket.id}
                type="button"
                onClick={() => setDurationFilter((prev) => (prev === bracket.id ? 'all' : bracket.id))}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                  isSelected
                    ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-md -translate-y-1'
                    : 'bg-white hover:bg-[#F7F4ED] border-[#DCE1D8] hover:border-[#263D2B] shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between pb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-white/15 text-white' : 'bg-[#F7F4ED] text-[#263D2B] group-hover:bg-[#263D2B] group-hover:text-white'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#F7F4ED] text-[#465640]'
                  }`}>
                    {count} Services
                  </span>
                </div>

                <div className="space-y-1">
                  <div className={`font-serif text-lg font-normal ${isSelected ? 'text-white' : 'text-[#10110F]'}`}>
                    {bracket.title}
                  </div>
                  <div className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-[#A8B5A0]' : 'text-[#263D2B]'}`}>
                    {bracket.rangeLabel}
                  </div>
                  <p className={`text-[11px] leading-relaxed line-clamp-2 pt-0.5 ${isSelected ? 'text-white/80' : 'text-[#6B7068]'}`}>
                    {bracket.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* SEARCH, SORT & VIEW CONTROLS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center mb-5">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#6B7068] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services by name, keyword or treatment..."
              className="w-full bg-white border border-[#DCE1D8] focus:border-[#263D2B] rounded-2xl pl-11 pr-11 py-3 text-xs sm:text-sm text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none focus:ring-1 focus:ring-[#263D2B] shadow-xs transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#F7F4ED] hover:bg-[#DCE1D8] text-[#10110F] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-4 flex items-center gap-2">
            <div className="relative w-full">
              <label htmlFor="price-list-sort" className="sr-only">Sort by Name, Duration or Price</label>
              <div className="relative">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#6B7068] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id="price-list-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-white border border-[#DCE1D8] focus:border-[#263D2B] rounded-2xl pl-9 pr-8 py-3 text-xs sm:text-sm text-[#10110F] font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-[#263D2B] shadow-xs cursor-pointer transition-colors"
                >
                  <option value="category">Sort: Category Menu Order</option>
                  <option value="duration-asc">Duration: Shortest First</option>
                  <option value="duration-desc">Duration: Longest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Service Name: A to Z</option>
                  <option value="name-desc">Service Name: Z to A</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7068] text-xs">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* View Mode Toggle (Table / Card Grid) */}
          <div className="md:col-span-2 flex items-center justify-end gap-1.5">
            <span className="text-[11px] text-[#6B7068] uppercase tracking-wider font-semibold mr-1 hidden sm:inline">View:</span>
            <div className="inline-flex p-1 bg-white border border-[#DCE1D8] rounded-xl shadow-xs">
              <button
                type="button"
                onClick={() => setViewMode('table')}
                aria-label="Table list view"
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-[#263D2B] text-white shadow-xs'
                    : 'text-[#6B7068] hover:text-[#10110F]'
                }`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                aria-label="Card grid view"
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-[#263D2B] text-white shadow-xs'
                    : 'text-[#6B7068] hover:text-[#10110F]'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* CATEGORY FILTER PILLS BAR */}
        <div className="pills-scroll flex sm:flex-wrap items-center gap-2 pt-1 pb-2">
          {CATEGORY_GROUPS.map((group) => {
            const count = categoryCounts[group.id] || 0;
            if (group.id !== 'all' && count === 0) return null;
            const isActive = selectedCategory === group.id;

            return (
              <button
                key={group.id}
                type="button"
                onClick={() => handleCategorySelect(group.id)}
                className={`min-h-[38px] px-4 py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 flex-shrink-0 ${
                  isActive
                    ? 'bg-[#263D2B] text-white border border-[#263D2B] shadow-sm'
                    : 'bg-white text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED] border border-[#DCE1D8]'
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8B5A0]" />
                )}
                <span>{group.label}</span>
                <span className={`text-[10px] ml-0.5 px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-[#F7F4ED] text-[#465640]'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* DYNAMIC MATCHING SERVICES COUNT & ACTIVE FILTER PILLS */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 px-1 text-xs text-[#6B7068]">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-[#10110F]">
              Showing <strong className="font-bold text-[#263D2B]">{filteredServices.length}</strong> of {services.length} services
            </span>
            {selectedCategory !== 'all' && (
              <span className="text-[#465640]">
                • Category: <strong>{CATEGORY_GROUPS.find((g) => g.id === selectedCategory)?.label || selectedCategory}</strong>
              </span>
            )}
            {durationFilter !== 'all' && (
              <span className="text-[#465640]">
                • Duration: <strong>{DURATION_BRACKETS.find((b) => b.id === durationFilter)?.rangeLabel}</strong>
              </span>
            )}
            {searchQuery && (
              <span className="text-[#465640]">
                • Search: &ldquo;<span className="text-[#263D2B] font-semibold">{searchQuery}</span>&rdquo;
              </span>
            )}
          </div>

          {(searchQuery || selectedCategory !== 'all' || durationFilter !== 'all' || sortBy !== 'category') && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider font-bold text-[#263D2B] hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 3. SERVICE DURATION & PRICE DISPLAY (ORGANIZED TABLE OR CARDS)            */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {filteredServices.length === 0 ? (
          /* Empty Search / Filter State */
          <div className="bg-white rounded-3xl p-10 sm:p-14 border border-[#DCE1D8] text-center space-y-4 shadow-sm max-w-md mx-auto my-12">
            <div className="w-14 h-14 rounded-full bg-[#F7F4ED] text-[#263D2B] border border-[#DCE1D8] flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal">
              No matching services found
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed">
              We couldn&apos;t find any service matching your current filters. Try resetting filters or browsing all salon treatments.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleClearFilters}
                className="global-button !px-6 !py-2.5 !text-xs text-white"
              >
                VIEW ALL SERVICES
              </button>
            </div>
          </div>
        ) : shouldGroup ? (
          /* Grouped by Category View */
          <div className="space-y-12 sm:space-y-16">
            {groupedServices.map((group) => (
              <div key={group.category.id} className="space-y-4">
                
                {/* Category Header Banner */}
                <div className="flex items-center justify-between border-b-2 border-[#263D2B] pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#263D2B]" />
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal tracking-tight">
                      {group.category.name}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#465640] uppercase tracking-wider font-semibold">
                    {group.items.length} {group.items.length === 1 ? 'treatment' : 'treatments'}
                  </span>
                </div>

                {/* Services in this category */}
                {viewMode === 'table' ? (
                  <PriceListTableView items={group.items} />
                ) : (
                  <PriceListCardView items={group.items} />
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Flat Filtered / Sorted View */
          <div>
            {viewMode === 'table' ? (
              <PriceListTableView items={filteredServices} showCategoryColumn={selectedCategory === 'all'} />
            ) : (
              <PriceListCardView items={filteredServices} />
            )}
          </div>
        )}

      </section>

      {/* ========================================================================= */}
      {/* 4. CONCIERGE & BOOKING CTA SECTION (SCREEN ONLY)                          */}
      {/* ========================================================================= */}
      <section className="print:hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-16 sm:mt-24">
        <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-14 border border-[#DCE1D8] shadow-lg text-center relative overflow-hidden">
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B]">
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>CUSTOM CARE &amp; CONCIERGE</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl text-[#10110F] font-normal tracking-tight">
              Ready to Reserve Your Treatment?
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light">
              Every appointment includes a personal consultation with our master aesthetics team. We block the exact service duration to give you our undivided attention with zero overlapping delays.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
              <Link
                to="/contact"
                className="global-button-secondary btn-luxury-arrow w-full sm:w-auto inline-flex items-center justify-center gap-2 !px-7 !py-3.5 text-xs font-bold uppercase tracking-[0.16em] cursor-pointer"
              >
                <span>CONTACT ATELIER</span>
                <span className="arrow-symbol text-sm font-normal">→</span>
              </Link>

              <Link
                to="/book-appointment"
                className="global-button w-full sm:w-auto inline-flex items-center justify-center gap-2 !px-8 !py-3.5 text-xs font-bold uppercase tracking-[0.16em] shadow-md cursor-pointer"
              >
                <span>BOOK APPOINTMENT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Salon Info Badges */}
            <div className="pt-4 border-t border-[#DCE1D8] flex flex-wrap items-center justify-center gap-5 text-[11px] text-[#6B7068]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B]" />
                Zero Booking Deposit Required (Pay at Appointment)
              </span>
              <span>•</span>
              <span>Ottawa Atelier: 405 Euphoria Crescent</span>
              <span>•</span>
              <span>Direct Phone: +1 (616) 255-0549</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

// =========================================================================
// SUBCOMPONENT: LUXURY TABLE VIEW (COMPACT, SCANNABLE, PRINT-FRIENDLY)
// =========================================================================
function PriceListTableView({ items, showCategoryColumn = false }) {
  return (
    <div className="bg-white rounded-2xl border border-[#DCE1D8] shadow-xs overflow-hidden print:border-none print:shadow-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F7F4ED] border-b border-[#DCE1D8] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#465640]">
              <th className="py-3.5 sm:py-4 px-4 sm:px-6 w-12 text-center print:w-8">#</th>
              <th className="py-3.5 sm:py-4 px-4 sm:px-6 min-w-[220px]">Service Name</th>
              <th className="py-3.5 sm:py-4 px-4 sm:px-6 min-w-[130px]">Service Category</th>
              <th className="py-3.5 sm:py-4 px-4 sm:px-6 min-w-[150px]">Estimated Duration</th>
              <th className="py-3.5 sm:py-4 px-4 sm:px-6 min-w-[130px] text-right">Current Price (CAD)</th>
              <th className="py-3.5 sm:py-4 px-4 sm:px-6 text-right w-48 print:hidden">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DCE1D8]/70 text-xs sm:text-sm">
            {items.map((service, index) => {
              const bookingUrl = `/book-appointment?service=${encodeURIComponent(service.slug || service.id)}`;
              const priceDisplay = formatPriceCAD(service.price);
              const durationInfo = formatDurationDetails(service.duration, service.durationDisplay);

              return (
                <tr 
                  key={service.id || service.slug || index}
                  className="hover:bg-[#F7F4ED]/50 transition-colors group print:break-inside-avoid"
                >
                  {/* Row Index */}
                  <td className="py-4 px-4 sm:px-6 text-center text-[#6B7068] font-mono text-[11px] align-middle">
                    {index + 1}
                  </td>

                  {/* Service Name & Description */}
                  <td className="py-4 px-4 sm:px-6 align-middle">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-base sm:text-lg text-[#10110F] font-medium leading-snug group-hover:text-[#263D2B] transition-colors">
                          {service.name}
                        </span>
                        {service.featured && (
                          <span className="print:hidden text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#263D2B] text-white">
                            Signature
                          </span>
                        )}
                      </div>
                      {service.description && (
                        <p className="text-xs text-[#6B7068] font-light leading-relaxed line-clamp-2 max-w-xl">
                          {service.description}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* Service Category */}
                  <td className="py-4 px-4 sm:px-6 align-middle">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#465640] px-2.5 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8]/60 inline-block">
                      {service.categoryName || service.category}
                    </span>
                  </td>

                  {/* Estimated Duration */}
                  <td className="py-4 px-4 sm:px-6 align-middle text-[#465640]">
                    {durationInfo.isMissing ? (
                      <div className="inline-flex items-center gap-1.5 text-amber-700 font-medium">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                        <span>Duration not specified</span>
                        <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold" title="Flagged for admin review">
                          Review
                        </span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 font-medium whitespace-nowrap text-[#10110F]">
                        <Clock className="w-3.5 h-3.5 text-[#263D2B] print:hidden flex-shrink-0" />
                        <span>{durationInfo.text}</span>
                      </div>
                    )}
                  </td>

                  {/* Current Price in CAD */}
                  <td className="py-4 px-4 sm:px-6 align-middle text-right whitespace-nowrap">
                    <span className="font-serif text-base sm:text-lg text-[#263D2B] font-bold tracking-tight">
                      {priceDisplay}
                    </span>
                  </td>

                  {/* Booking CTA Button (Hidden on Print) */}
                  <td className="py-4 px-4 sm:px-6 align-middle text-right print:hidden">
                    <Link
                      to={bookingUrl}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-[4px] bg-[#263D2B] hover:bg-[#1C2E20] text-white text-[11px] font-bold uppercase tracking-[0.14em] shadow-xs transition-all duration-200 hover:scale-[1.02] active:scale-98 whitespace-nowrap cursor-pointer"
                    >
                      <span>Book Appointment</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =========================================================================
// SUBCOMPONENT: LUXURY CARD GRID VIEW
// =========================================================================
function PriceListCardView({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((service, index) => {
        const bookingUrl = `/book-appointment?service=${encodeURIComponent(service.slug || service.id)}`;
        const priceDisplay = formatPriceCAD(service.price);
        const durationInfo = formatDurationDetails(service.duration, service.durationDisplay);

        return (
          <div
            key={service.id || service.slug || index}
            className="bg-white rounded-2xl border border-[#DCE1D8] hover:border-[#263D2B] transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between shadow-xs hover:shadow-md group"
          >
            <div className="space-y-3">
              {/* Category & Badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#465640] px-2 py-0.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8]/60">
                  {service.categoryName || service.category}
                </span>
                {service.featured && (
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#263D2B] text-white">
                    Signature
                  </span>
                )}
              </div>

              {/* Service Title */}
              <h3 className="font-serif text-lg sm:text-xl text-[#10110F] font-medium leading-snug group-hover:text-[#263D2B] transition-colors">
                {service.name}
              </h3>

              {/* Description */}
              {service.description && (
                <p className="text-xs text-[#6B7068] leading-relaxed font-light line-clamp-3">
                  {service.description}
                </p>
              )}
            </div>

            {/* Bottom Meta & Book Action */}
            <div className="pt-5 mt-5 border-t border-[#DCE1D8]/70 space-y-3.5">
              <div className="flex items-center justify-between gap-2">
                {/* Estimated Duration */}
                {durationInfo.isMissing ? (
                  <div className="flex items-center gap-1 text-[11px] text-amber-700 font-medium">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Duration not specified</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-[#465640] font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                    <span>{durationInfo.text}</span>
                  </div>
                )}

                {/* Current Price */}
                <div className="font-serif text-lg sm:text-xl font-bold text-[#263D2B] whitespace-nowrap">
                  {priceDisplay}
                </div>
              </div>

              <Link
                to={bookingUrl}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-[4px] bg-[#263D2B] hover:bg-[#1C2E20] text-white text-xs font-bold uppercase tracking-[0.16em] transition-all duration-200 hover:shadow-sm active:scale-98 cursor-pointer"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
