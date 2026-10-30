// GLAM GIRL BY JANKI — Main Services Page
// Displays ONE main image-based card for each service category.
// Clicking any card opens the dedicated category detail view (/services/:category).

import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, ArrowRight, X, Eye, Scissors } from 'lucide-react';
import { salonDB } from '../db/salonDatabase';
import { MAIN_SERVICE_CATEGORIES, getServicesForCategory } from '../data/mainCategoriesData';
import CategoryCard from '../components/services/CategoryCard';
import ScrollReveal from '../components/ScrollReveal/ScrollReveal';
import DownloadableBeautyMenuSection from '../components/services/DownloadableBeautyMenuSection';
import SkinServiceMenu from '../components/skin-atelier/SkinServiceMenu';
import SkinConsultationModal from '../components/skin-atelier/SkinConsultationModal';

export default function ServicesPage({ isSection = false }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [servicesData, setServicesData] = useState(() => salonDB.getServices());
  const [isSkinConsultationOpen, setIsSkinConsultationOpen] = useState(false);
  const [skinConsultationService, setSkinConsultationService] = useState(null);

  const handleOpenSkinConsultation = (service = null) => {
    setSkinConsultationService(service);
    setIsSkinConsultationOpen(true);
  };

  // Load services with live reactive subscription
  useEffect(() => {
    setServicesData(salonDB.getServices());
    const unsub = salonDB.subscribe(() => {
      setServicesData(salonDB.getServices());
    });
    return () => unsub();
  }, []);

  // Set page title for standalone route
  useEffect(() => {
    if (!isSection) {
      document.title = 'Services & Treatment Categories — GLAM GIRL BY JANKI';
      window.scrollTo(0, 0);
    }
  }, [isSection]);

  // Compute live service counts for each main category from active database services
  const categoryCounts = useMemo(() => {
    const counts = {};
    MAIN_SERVICE_CATEGORIES.forEach((cat) => {
      counts[cat.id] = getServicesForCategory(cat, servicesData).length;
    });
    return counts;
  }, [servicesData]);

  // Filter main categories by search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return MAIN_SERVICE_CATEGORIES;
    }
    const q = searchQuery.toLowerCase().trim();
    return MAIN_SERVICE_CATEGORIES.filter((cat) => {
      const matchName = cat.name.toLowerCase().includes(q);
      const matchDesc = cat.description.toLowerCase().includes(q);
      const matchSubtitle = cat.subtitle && cat.subtitle.toLowerCase().includes(q);
      const matchSlug = cat.slug.toLowerCase().includes(q);
      // Also match if any service name within this category matches
      const services = getServicesForCategory(cat, servicesData);
      const matchService = services.some((s) => s.name.toLowerCase().includes(q));
      return matchName || matchDesc || matchSubtitle || matchSlug || matchService;
    });
  }, [searchQuery, servicesData]);

  return (
    <div className={`min-h-screen bg-[#F7F4ED] text-[#10110F] ${isSection ? 'py-12' : 'pt-20 sm:pt-24 pb-20'} selection:bg-[#263D2B] selection:text-white font-sans antialiased`}>
      
      {/* 1. HERO TITLE BANNER */}
      <div className="relative bg-[#F7F4ED] pt-8 sm:pt-12 pb-8 sm:pb-12 overflow-hidden border-b border-[#DCE1D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE1D8] shadow-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
            <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              ATELIER SERVICE PORTFOLIO
            </span>
          </div>

          {/* Main Editorial Headline */}
          {isSection ? (
            <h2 className="font-serif text-[28px] sm:text-[44px] lg:text-[52px] text-[#10110F] leading-[1.08] tracking-tight mb-3 font-normal">
              Curated Rituals for <span className="italic text-[#263D2B]">Hair & Beauty.</span>
            </h2>
          ) : (
            <h1 className="font-serif text-[28px] sm:text-[44px] lg:text-[52px] text-[#10110F] leading-[1.08] tracking-tight mb-3 font-normal">
              Curated Rituals for <span className="italic text-[#263D2B]">Hair & Beauty.</span>
            </h1>
          )}

          {/* Subtitle */}
          <p className="font-sans text-[#6B7068] text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-2xl mx-auto font-light">
            Select a service category below to view all included treatments, transparent Canadian pricing, durations, and private Ottawa suite availability.
          </p>

          {/* Quick Shortcuts */}
          <div className="pt-5 flex flex-wrap items-center justify-center gap-2.5">
            <Link
              to="/hair-atelier"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#10110F] hover:bg-[#263D2B] text-white text-xs font-bold uppercase tracking-[0.14em] shadow-sm transition-all duration-200 hover:scale-[1.02]"
            >
              <Scissors className="w-3.5 h-3.5 text-[#A8B5A0]" />
              <span>THE HAIR ATELIER</span>
            </Link>
            <a
              href="#the-skin-atelier"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#263D2B] hover:bg-[#1C2E20] text-white text-xs font-bold uppercase tracking-[0.14em] shadow-sm transition-all duration-200 hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A8B5A0]" />
              <span>THE SKIN ATELIER</span>
            </a>
            <Link
              to="/lash-atelier"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#F7F4ED] border border-[#DCE1D8] hover:border-[#263D2B] text-[#263D2B] text-xs font-bold uppercase tracking-[0.14em] shadow-2xs transition-all duration-200 hover:scale-[1.02]"
            >
              <Eye className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>THE LASH ATELIER</span>
            </Link>
            <Link
              to="/makeup-atelier"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#F7F4ED] border border-[#DCE1D8] hover:border-[#263D2B] text-[#263D2B] text-xs font-bold uppercase tracking-[0.14em] shadow-2xs transition-all duration-200 hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>THE MAKEUP ATELIER</span>
            </Link>
            <Link
              to="/special-treatments"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#F7F4ED] border border-[#DCE1D8] hover:border-[#263D2B] text-[#263D2B] text-xs font-bold uppercase tracking-[0.14em] shadow-2xs transition-all duration-200 hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>SPECIAL TREATMENTS</span>
            </Link>
            <Link
              to="/mehndi-design-studio"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#F7F4ED] border border-[#DCE1D8] hover:border-[#263D2B] text-[#263D2B] text-xs font-bold uppercase tracking-[0.14em] shadow-2xs transition-all duration-200 hover:scale-[1.02]"
            >
              <span>MEHNDI STUDIO</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/price-list"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#F7F4ED] border border-[#DCE1D8] hover:border-[#263D2B] text-[#263D2B] text-xs font-bold uppercase tracking-[0.14em] shadow-2xs transition-all duration-200 hover:scale-[1.02]"
            >
              <span>VIEW FULL PRICE LIST</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>

      {/* 2. STICKY SEARCH & CATEGORY COUNTER BAR */}
      <div className="sticky top-[72px] sm:top-[78px] md:top-[84px] lg:top-[88px] z-30 bg-[#F7F4ED]/95 backdrop-blur-md border-b border-[#DCE1D8] shadow-xs py-3 sm:py-4 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Category Search Form */}
            <div className="relative w-full sm:max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories (e.g. Eyebrow, Hair Colour, Waxing)..."
                className="w-full bg-white border border-[#DCE1D8] focus:border-[#263D2B] rounded-full h-[44px] pl-10 pr-9 text-xs sm:text-sm text-[#10110F] placeholder-[#6B7068] focus:outline-none shadow-2xs transition-all"
              />
              <Search className="w-4 h-4 text-[#6B7068] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#6B7068] hover:text-[#10110F]"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Counter Pill */}
            <div className="text-xs font-semibold text-[#6B7068] whitespace-nowrap">
              Showing <span className="font-bold text-[#10110F]">{filteredCategories.length}</span> Service Categories
            </div>
          </div>

        </div>
      </div>

      {/* 2.4. ATELIER SPOTLIGHT: THE HAIR ATELIER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="rounded-3xl bg-white border border-[#DCE1D8] p-6 sm:p-8 shadow-sm hover:border-[#263D2B] transition-all flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-neutral-900 border border-[#DCE1D8] flex-shrink-0">
              <img
                src="/images/hair-care/50-bridal-hair-styling.webp"
                alt="The Hair Atelier at GLAM GIRL BY JANKI"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#10110F] text-white text-[10.5px] font-bold uppercase tracking-wider">
                <Scissors className="w-3 h-3 text-[#A8B5A0]" />
                <span>DISTINCTIVE HAIR EXPERIENCE</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal">
                The Hair Atelier
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7068] font-light max-w-xl">
                &ldquo;Your Hair. Your Signature.&rdquo; Discover 5 curated hair experiences: The Transformation Room, The Colour Atelier, The Hair Ritual Studio, The Styling Lounge, and The Bridal Hair Gallery.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              to="/hair-atelier"
              className="global-button !px-6 !py-3.5 text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2 whitespace-nowrap cursor-pointer hover:scale-[1.02] transition-transform"
            >
              <span>Explore Hair Atelier</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/book-appointment?service=noor-signature-haircut"
              className="global-button-secondary !px-5 !py-3.5 text-xs font-semibold whitespace-nowrap cursor-pointer"
            >
              Book Cut &amp; Style
            </Link>
          </div>
        </div>
      </div>

      {/* 2.5. ATELIER SPOTLIGHT: THE SKIN ATELIER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="rounded-3xl bg-white border border-[#DCE1D8] p-6 sm:p-8 shadow-sm hover:border-[#263D2B] transition-all flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-neutral-900 border border-[#DCE1D8] flex-shrink-0">
              <img
                src="/images/facial/the-skin-atelier-hero.jpg"
                alt="The Skin Atelier at GLAM GIRL BY JANKI"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#263D2B]/10 text-[#263D2B] text-[10.5px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#263D2B]" />
                <span>NEW PREMIUM SERVICE CATEGORY</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal">
                The Skin Atelier
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7068] font-light max-w-xl">
                Experience curated botanical facials, deep pore purification, and 24K gold firming rituals. Fill an optional consultation form, customize your care focus, and book your private Ottawa suite.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href="#the-skin-atelier"
              className="global-button !px-6 !py-3.5 text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2 whitespace-nowrap cursor-pointer hover:scale-[1.02] transition-transform"
            >
              <span>Explore Skin Menu</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => handleOpenSkinConsultation()}
              className="global-button-secondary !px-5 !py-3.5 text-xs font-semibold whitespace-nowrap cursor-pointer"
            >
              Skin Consultation
            </button>
            <Link
              to="/skin-atelier"
              className="px-4 py-3 text-xs font-semibold text-[#263D2B] hover:underline whitespace-nowrap"
            >
              Dedicated Studio Page →
            </Link>
          </div>
        </div>
      </div>

      {/* 2.6. SPECIAL TREATMENT SPOTLIGHT: MEHNDI DESIGN STUDIO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="rounded-3xl bg-white border border-[#DCE1D8] p-6 sm:p-8 shadow-sm hover:border-[#263D2B] transition-all flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-neutral-900 border border-[#DCE1D8] flex-shrink-0">
              <img
                src="/images/mehndi/mehndi-studio-card.webp"
                alt="Mehndi Design Studio Special Treatment"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#263D2B]/10 text-[#263D2B] text-[10.5px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#263D2B]" />
                <span>SIGNATURE SPECIAL TREATMENT</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal">
                Mehndi Design Studio
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7068] font-light max-w-xl">
                Discover intricate henna artistry, from timeless bridal patterns to modern minimalist designs. Explore 12 dedicated design categories and reserve your private session.
              </p>
            </div>
          </div>
          <Link
            to="/mehndi-design-studio"
            className="global-button !px-7 !py-3.5 text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2 whitespace-nowrap cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <span>Explore Mehndi Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 3. MAIN CATEGORY CARDS GRID */}
      {/* Exactly ONE main card per category. Individual treatments appear inside category detail view. */}
      <div id="services-grid-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#DCE1D8] p-8 shadow-xs max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#F7F4ED] text-[#263D2B] flex items-center justify-center mx-auto border border-[#DCE1D8]">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F]">
              No service categories found
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7068]">
              Try searching for a different keyword or reset to browse all categories.
            </p>
            <div>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="global-button !px-6 !py-2.5 text-white text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs"
              >
                Show All Categories
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-stretch">
            {(isSection ? filteredCategories.slice(0, 9) : filteredCategories).map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                serviceCount={categoryCounts[category.id] || 0}
              />
            ))}
          </div>
        )}

        {isSection && (
          <div className="mt-12 flex justify-center">
            <Link
              to="/services"
              className="global-button inline-flex items-center gap-2.5 !px-8 !py-3.5 text-white text-xs font-bold uppercase tracking-widest shadow-sm cursor-pointer"
            >
              <span>VIEW ALL {MAIN_SERVICE_CATEGORIES.length} CATEGORIES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* 3.5. THE SKIN ATELIER SERVICE MENU SECTION */}
        <div id="the-skin-atelier" className="mt-16 sm:mt-24 border-t border-[#DCE1D8] pt-12 sm:pt-16">
          <div className="mb-10 sm:mb-12 max-w-5xl mx-auto">
            <div className="w-full bg-[#10110F] rounded-2xl sm:rounded-3xl border border-[#DCE1D8] shadow-xl p-1.5 sm:p-2.5">
              <img
                src="/images/facial/the-skin-atelier-hero.jpg"
                alt="The Skin Atelier Treatment Sanctuary at GLAM GIRL BY JANKI"
                className="w-full h-auto block rounded-xl sm:rounded-2xl"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                loading="lazy"
              />
            </div>
            <div className="mt-3 px-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#6B7068]">
              <span className="font-serif italic text-sm text-[#263D2B]">The Skin Atelier Sanctuary &bull; Private Ottawa Skincare Suite</span>
              <span className="font-mono text-[11px] text-[#263D2B] font-medium">Certified Aesthetic Director: Janki Khatroja</span>
            </div>
          </div>
          <SkinServiceMenu onOpenConsultation={handleOpenSkinConsultation} />
        </div>

        {/* 4. DOWNLOADABLE BEAUTY MENU SECTION */}
        <div className="mt-16 sm:mt-24">
          <DownloadableBeautyMenuSection />
        </div>

        {/* 5. BOTTOM LUXURY APPOINTMENT BANNER */}
        <ScrollReveal className="mt-16 sm:mt-24 p-8 sm:p-14 rounded-3xl bg-white text-[#10110F] border border-[#DCE1D8] shadow-sm relative overflow-hidden text-center">
          <div className="max-w-2xl mx-auto relative z-10 space-y-4">
            <span className="inline-flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              <Sparkles className="w-4 h-4 text-[#263D2B]" />
              BESPOKE BEAUTY SANCTUARY
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-normal text-[#10110F]">
              Elevate your beauty experience. Reserve your appointment today.
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed max-w-lg mx-auto font-light">
              Every appointment at GLAM GIRL BY JANKI is hosted in a peaceful, single-guest private suite in Ottawa.
            </p>

            <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
              <Link
                to="/book-appointment"
                className="global-button !px-8 !py-3.5 text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
              >
                BOOK APPOINTMENT ONLINE
              </Link>
              <a
                href="tel:16162550549"
                className="global-button-secondary !px-8 !py-3.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                CALL CONCIERGE: +1 (616) 255-0549
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>

      {/* Skin Consultation Modal */}
      <SkinConsultationModal
        isOpen={isSkinConsultationOpen}
        onClose={() => setIsSkinConsultationOpen(false)}
        initialService={skinConsultationService}
      />
    </div>
  );
}
