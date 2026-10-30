// GLAM GIRL BY JANKI — Dedicated Category Detail Page
// Displays all individual services belonging to a selected category with working back navigation and booking.

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  AlertCircle, 
  ShieldCheck,
  Search,
  SlidersHorizontal,
  X,
  Calendar
} from 'lucide-react';
import Breadcrumbs from '../components/services/Breadcrumbs';
import salonDB from '../db/salonDatabase';
import { MAIN_SERVICE_CATEGORIES, findMainCategory, getServicesForCategory } from '../data/mainCategoriesData';
import ServiceCard from '../components/common/ServiceCard';
import ScrollReveal from '../components/ScrollReveal/ScrollReveal';

export default function CategoryPage() {
  const { category: categoryParam } = useParams();
  const navigate = useNavigate();
  const [servicesData, setServicesData] = useState(() => salonDB.getServices());
  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setSearchFilter('');
  }, [categoryParam]);

  useEffect(() => {
    const handleUpdate = () => {
      setServicesData(salonDB.getServices());
    };
    const unsubscribe = salonDB.subscribe(handleUpdate);
    return () => unsubscribe();
  }, []);

  // 1. Direct Service Redirect Check:
  // If user navigated to /services/:slug or /treatments/:slug directly where slug is a service, redirect to treatment detail
  const matchingService = salonDB.getServiceBySlug(categoryParam) || salonDB.getServiceById(categoryParam);
  useEffect(() => {
    if (matchingService) {
      navigate(`/services/${matchingService.category || 'all'}/${matchingService.slug || matchingService.id}`, { replace: true });
    }
  }, [matchingService, navigate]);

  // Normalization map for category aliases
  const normalizeCategory = (slug) => {
    const s = String(slug || '').toLowerCase().trim();
    if (s === 'hair-styling') return 'hairstyling';
    if (s === 'hair-treatment') return 'hair-treatments';
    if (s === 'hair-color') return 'hair-colour';
    if (s === 'mehndi') return 'henna';
    if (s === 'spa') return 'massage';
    if (s === 'skin' || s === 'skincare') return 'facial';
    return s;
  };

  const normalizedTarget = normalizeCategory(categoryParam);

  // Match against our master 13 main categories registry
  const mainCatDef = findMainCategory(categoryParam);

  let categoryName = '';
  let categorySubtitle = '';
  let categoryDesc = '';
  let categoryImage = '';
  let categoryBadge = 'ATELIER CATEGORY';
  let rawTreatments = [];

  if (mainCatDef) {
    categoryName = mainCatDef.name;
    categorySubtitle = mainCatDef.subtitle;
    categoryDesc = mainCatDef.description;
    categoryImage = mainCatDef.image;
    categoryBadge = mainCatDef.badge;
    rawTreatments = getServicesForCategory(mainCatDef, servicesData);
  } else {
    // Fallback to legacy categories
    const categories = salonDB.getCategories();
    const currentCategory = categories.find((c) => {
      const cSlug = String(c.slug || c.id || '').toLowerCase();
      const cId = String(c.id || '').toLowerCase();
      return cSlug === normalizedTarget || cId === normalizedTarget;
    });

    categoryName = currentCategory?.name || (categoryParam ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).replace(/-/g, ' ') : 'Category');
    categorySubtitle = currentCategory?.subtitle || 'Bespoke Rituals & Treatments';
    categoryDesc = currentCategory?.description || `Discover our bespoke ${categoryName.toLowerCase()} treatments designed for exquisite beauty and natural confidence.`;
    categoryImage = currentCategory?.image;
    rawTreatments = servicesData.filter((s) => {
      if (s.active === false) return false;
      const target = String(currentCategory?.id || normalizedTarget).toLowerCase();
      const sCat = String(s.category || '').toLowerCase();
      const sCatSlug = String(s.category || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return sCat === target || sCatSlug === target;
    });
  }

  // Filter & sort treatments within category
  const categoryTreatments = useMemo(() => {
    let list = rawTreatments.filter((treatment) => {
      if (!searchFilter.trim()) return true;
      const q = searchFilter.toLowerCase().trim();
      return (
        treatment.name.toLowerCase().includes(q) ||
        (treatment.description && treatment.description.toLowerCase().includes(q))
      );
    });

    if (sortBy === 'price-low') {
      list.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'duration') {
      list.sort((a, b) => parseInt(a.duration || 0) - parseInt(b.duration || 0));
    }

    return list;
  }, [rawTreatments, searchFilter, sortBy]);

  // Set document title
  useEffect(() => {
    if (categoryName) {
      document.title = `${categoryName} Services — GLAM GIRL BY JANKI`;
    }
  }, [categoryName]);

  if (matchingService) {
    return (
      <div className="min-h-screen bg-[#F7F4ED] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#263D2B] border-t-transparent animate-spin" />
      </div>
    );
  }

  // 404 Empty Category handler
  if (!mainCatDef && rawTreatments.length === 0) {
    return (
      <div className="min-h-screen bg-[#F7F4ED] text-[#10110F] pt-32 pb-24 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#DCE1D8] shadow-lg space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#10110F]">Category Not Found</h1>
            <p className="text-[#6B7068] text-sm font-sans leading-relaxed">
              The service category &ldquo;{categoryParam}&rdquo; could not be located in our salon database.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/services"
                className="global-button w-full sm:w-auto min-h-[44px] !px-6 !py-2.5 text-white text-xs font-bold uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Services</span>
              </Link>
              <Link
                to="/"
                className="global-button-secondary w-full sm:w-auto min-h-[44px] !px-6 !py-2.5 text-xs font-semibold flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
              >
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const categorySlug = mainCatDef?.slug || categoryParam;

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#10110F] pt-24 sm:pt-28 pb-20 selection:bg-[#263D2B] selection:text-white font-sans antialiased">
      
      {/* 1. EDITORIAL HEADER & BREADCRUMBS */}
      <div className="relative border-b border-[#DCE1D8] bg-[#F7F4ED] pb-12 sm:pb-16 pt-4">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" stagger={true}>
          
          {/* Top navigation row with Breadcrumbs and Back Button */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <Breadcrumbs categoryName={categoryName} categorySlug={categorySlug} />

            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE1D8] hover:border-[#263D2B] text-xs font-bold uppercase tracking-wider text-[#10110F] hover:text-[#263D2B] transition-all shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Categories</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center mt-6">
            
            {/* Left Column: Title & Description */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] text-[#263D2B] text-xs font-bold tracking-widest uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
                <span>{categoryBadge}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#10110F] leading-tight">
                {categoryName}
              </h1>

              {categorySubtitle && (
                <p className="text-sm sm:text-base font-serif italic text-[#465640]">
                  {categorySubtitle}
                </p>
              )}

              <p className="text-[#6B7068] text-sm sm:text-base max-w-2xl font-light leading-relaxed">
                {categoryDesc}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 text-xs sm:text-sm text-[#465640]">
                <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[#10110F] font-bold shadow-xs">
                  {rawTreatments.length} {rawTreatments.length === 1 ? 'Treatment' : 'Treatments'} in Catalog
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#263D2B]" /> Single-Guest Private Suite
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-4 h-4 text-[#263D2B]" /> Transparent Canadian Pricing
                </span>
              </div>

              {/* Primary Informational Action Bar */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href="#category-services-grid"
                  className="global-button !py-3.5 !px-8 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  <span>Explore {rawTreatments.length} Services Below ↓</span>
                </a>

                <Link
                  to="/services"
                  className="global-button-secondary !py-3.5 !px-6 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer hover:border-[#263D2B] transition-colors"
                >
                  <span>View All Salon Categories</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Category Image */}
            {categoryImage && (
              <div className="lg:col-span-4">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-[#DCE1D8] shadow-xl group bg-white">
                  <img
                    src={categoryImage}
                    alt={categoryName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = '/images/threading/sitara-full-face-threading.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 text-white text-[11px] font-medium">
                    GLAM GIRL BY JANKI Atelier Collection
                  </div>
                </div>
              </div>
            )}

          </div>

          {(categorySlug === 'skin-atelier' || categorySlug === 'skin-care' || categorySlug === 'facial' || categorySlug === 'skincare') && (
            <div className="mt-8 p-5 sm:p-6 rounded-3xl bg-white border border-[#263D2B]/30 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  THE SKIN ATELIER INTERACTIVE SUITE
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-[#10110F]">
                  Explore The Skin Atelier &amp; Personalized Consultation Studio
                </h3>
                <p className="text-xs text-[#6B7068] max-w-xl">
                  Discover our complete portfolio of clinical botanical facials, submit your personalized skincare goals and sensitivities, and customize your treatment focus.
                </p>
              </div>
              <Link
                to="/skin-atelier"
                className="global-button !py-3 !px-6 text-xs font-bold uppercase tracking-wider text-white whitespace-nowrap shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Enter The Skin Atelier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {(categorySlug === 'eyelashes' || categorySlug === 'lashes') && (
            <div className="mt-8 p-5 sm:p-6 rounded-3xl bg-white border border-[#263D2B]/30 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  THE LASH ATELIER INTERACTIVE SUITE
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-[#10110F]">
                  Explore our Interactive Lash Style Selector &amp; Consultation Studio
                </h3>
                <p className="text-xs text-[#6B7068] max-w-xl">
                  Choose your desired curl, length, and fullness with live visual references, explore our 12 approved services, and submit your custom consultation notes.
                </p>
              </div>
              <Link
                to="/lash-atelier"
                className="global-button !py-3 !px-6 text-xs font-bold uppercase tracking-wider text-white whitespace-nowrap shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Enter The Lash Atelier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </ScrollReveal>
      </div>

      {/* 2. MAIN TREATMENTS GRID SECTION */}
      <div id="category-services-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* Toolbar: Counter & Search & Sort */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-5 border-b border-[#DCE1D8]">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
              All {categoryName} Services
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7068] mt-1 font-light">
              Showing {categoryTreatments.length} of {rawTreatments.length} approved treatments. Explore treatment details, pricing, and care below.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search filter within category */}
            <div className="relative flex-1 md:w-60">
              <Search className="w-3.5 h-3.5 text-[#6B7068] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder={`Search ${categoryName}...`}
                className="w-full pl-9 pr-8 py-2 rounded-full bg-white border border-[#DCE1D8] text-xs text-[#10110F] placeholder-[#6B7068] focus:outline-none focus:border-[#263D2B] shadow-2xs"
              />
              {searchFilter && (
                <button
                  type="button"
                  onClick={() => setSearchFilter('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B7068] hover:text-[#10110F]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-[#DCE1D8] rounded-full px-3 py-1.5 shadow-2xs text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#263D2B]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs text-[#10110F] font-medium focus:outline-none cursor-pointer"
                aria-label="Sort services"
              >
                <option value="default">Default Order</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>
        </div>

        {/* Treatment Cards Grid */}
        {categoryTreatments.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#DCE1D8] p-8 max-w-md mx-auto shadow-xs space-y-3">
            <p className="text-sm text-[#6B7068]">
              No treatments matched &ldquo;{searchFilter}&rdquo; in {categoryName}.
            </p>
            <button
              type="button"
              onClick={() => setSearchFilter('')}
              className="global-button !px-5 !py-2 text-xs uppercase"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categoryTreatments.map((treatment) => (
              <ServiceCard key={treatment.id} service={treatment} showBooking={false} />
            ))}
          </div>
        )}

        {/* Bottom Informational Banner */}
        <section className="mt-16 p-8 sm:p-12 rounded-3xl bg-[#263D2B] text-white text-center space-y-4 shadow-xl relative overflow-hidden">
          <span className="text-[10.5px] font-mono uppercase tracking-widest text-[#A8B5A0]">
            GLAM GIRL ATELIER EXPERIENCES
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight">
            Curated {categoryName} Care &amp; Artistry
          </h3>
          <p className="text-xs sm:text-sm text-white/80 max-w-lg mx-auto font-light leading-relaxed">
            Every session is a private 1-on-1 experience in our dedicated Waterloo beauty studio with certified aesthetic director Janki Khatroja.
          </p>
          <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
            <Link
              to="/services"
              className="global-button !bg-white !text-[#10110F] hover:!bg-[#F7F4ED] !py-3.5 !px-8 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>Explore All Salon Services</span>
              <ArrowRight className="w-4 h-4 text-[#263D2B]" />
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-full border border-white/30 text-white hover:bg-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Ask A Question / Inquire</span>
            </Link>
          </div>
        </section>

        {/* 3. EXPLORE OTHER SALON CATEGORIES FOOTER */}
        <div className="mt-20 pt-12 border-t border-[#DCE1D8]">
          <div className="text-center space-y-2 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              COMPLETE BEAUTY REPERTOIRE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
              Explore Other Salon Categories
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7068] font-light max-w-md mx-auto">
              Browse our other specialized atelier disciplines for hair, skin, nails, and bridal beauty.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 max-w-5xl mx-auto">
            {MAIN_SERVICE_CATEGORIES
              .filter((c) => c.slug !== categorySlug && c.id !== categorySlug)
              .map((c) => (
                <Link
                  key={c.id}
                  to={`/services/${c.slug}`}
                  className="px-4 py-2.5 rounded-full bg-white hover:bg-[#263D2B] border border-[#DCE1D8] hover:border-[#263D2B] text-xs font-semibold text-[#10110F] hover:text-white transition-all shadow-2xs hover:shadow-sm"
                >
                  {c.name}
                </Link>
              ))}
          </div>

          <div className="pt-8 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#263D2B] hover:text-[#10110F] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to All Services Main Page</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
