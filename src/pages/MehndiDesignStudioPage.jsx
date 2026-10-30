// GLAM GIRL BY JANKI — Mehndi Design Studio Page
// Luxury Organic Henna Artistry, 12 Core Service Cards, Design Picker & Integrated Booking Form

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  Clock,
  ShieldCheck,
  ArrowRight,
  Search,
  Eye,
  CheckCircle2,
  X,
  Heart,
  Phone,
  Mail,
  User,
  SlidersHorizontal,
  ChevronRight,
  Leaf,
  Flower2,
  Compass
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal/ScrollReveal';
import {
  MEHNDI_SERVICE_CARDS,
  MEHNDI_GALLERY_FILTERS,
  HENNA_CARE_STEPS
} from '../data/mehndiData';
import salonDB from '../db/salonDatabase';
import CreateYourMehndiPackage from '../components/mehndi/CreateYourMehndiPackage';
import MehndiBanavaniRit from '../components/mehndi/MehndiBanavaniRit';
import MehndiProcessPriceTime from '../components/mehndi/MehndiProcessPriceTime';
import MehndiIngredientsPrep from '../components/mehndi/MehndiIngredientsPrep';

export default function MehndiDesignStudioPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const packageBuilderRef = useRef(null);
  const ritRef = useRef(null);
  const ingredientsRef = useRef(null);
  const priceTimeRef = useRef(null);
  const galleryRef = useRef(null);
  const chooserRef = useRef(null);
  const bookingRef = useRef(null);

  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Active design selected in "Choose Your Mehndi Design" section and booking form
  const preselectedId = searchParams.get('design') || MEHNDI_SERVICE_CARDS[0].id;
  const initialDesign = MEHNDI_SERVICE_CARDS.find((d) => d.id === preselectedId) || MEHNDI_SERVICE_CARDS[0];
  const [selectedDesign, setSelectedDesign] = useState(initialDesign);
  
  // Modal preview state for "View Design"
  const [previewModalDesign, setPreviewModalDesign] = useState(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    document.title = 'Mehndi Design Studio — Special Treatment | GLAM GIRL BY JANKI';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  // Filtered designs for gallery
  const filteredDesigns = useMemo(() => {
    return MEHNDI_SERVICE_CARDS.filter((card) => {
      let matchesCategory = true;
      if (selectedFilter === 'bridal') {
        matchesCategory = card.id.includes('bridal') || card.id.includes('full-hand');
      } else if (selectedFilter === 'arabic') {
        matchesCategory = card.id.includes('arabic');
      } else if (selectedFilter === 'traditional') {
        matchesCategory = card.id.includes('traditional');
      } else if (selectedFilter === 'minimal') {
        matchesCategory = card.id.includes('minimal');
      } else if (selectedFilter === 'hands-feet') {
        matchesCategory = card.id.includes('hand') || card.id.includes('feet');
      } else if (selectedFilter === 'festive') {
        matchesCategory = card.id.includes('festival') || card.id.includes('engagement');
      }

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        card.name.toLowerCase().includes(q) ||
        card.description.toLowerCase().includes(q) ||
        card.motifs.some((m) => m.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedFilter, searchQuery]);

  // Handle design selection
  const handleSelectDesign = (design) => {
    setSelectedDesign(design);
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F4ED] text-[#10110F] font-sans antialiased selection:bg-[#263D2B] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div 
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#10110F] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#263D2B]/40 flex items-center gap-3 text-xs font-medium animate-fade-in"
        >
          <Sparkles className="w-4 h-4 text-[#A8B5A0] flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 1. HERO SECTION                                                      */}
      {/* ===================================================================== */}
      <section className="relative pt-24 sm:pt-28 pb-16 sm:pb-24 overflow-hidden border-b border-[#DCE1D8]">
        <div className="absolute inset-0 bg-radial-[at_top_right] from-[#263D2B]/5 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Heading and Intro */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
                <Leaf className="w-3.5 h-3.5 text-[#263D2B]" />
                <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.26em] text-[#263D2B]">
                  SPECIAL TREATMENT • MEHNDI ATELIER
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#10110F] font-normal tracking-tight leading-[1.12]">
                Mehndi Design Studio
              </h1>

              <p className="font-serif text-lg sm:text-xl text-[#465640] italic font-light max-w-2xl mx-auto lg:mx-0">
                &ldquo;Every Pattern Tells a Story. Discover intricate henna artistry from timeless bridal patterns to modern minimalist designs.&rdquo;
              </p>

              <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                Handcrafted using 100% natural Rajasthani henna paste infused with organic eucalyptus oil. 
                Single-guest private suite care in Ottawa with customized scaling to your natural hand silhouette.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => packageBuilderRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="global-button !px-8 !py-4 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span>Create Your Mehndi Package</span>
                </button>

                <button
                  type="button"
                  onClick={() => ritRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="global-button-secondary !px-6 !py-4 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
                >
                  <Leaf className="w-3.5 h-3.5 text-[#263D2B]" />
                  <span>Mehndi Banavani Rit</span>
                </button>

                <button
                  type="button"
                  onClick={() => ingredientsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="global-button-secondary !px-6 !py-4 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
                  <span>Henna Ingredients &amp; Prep</span>
                </button>

                <button
                  type="button"
                  onClick={() => priceTimeRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="global-button-secondary !px-6 !py-4 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
                >
                  <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                  <span>Price &amp; Time Process</span>
                </button>

                <button
                  type="button"
                  onClick={() => galleryRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-5 py-4 rounded-full border border-[#DCE1D8] bg-white hover:border-[#263D2B] text-xs font-bold uppercase tracking-wider text-[#465640] hover:text-[#10110F] cursor-pointer flex items-center gap-1.5 shadow-2xs"
                >
                  <span>12 Design Categories</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Quality Badges */}
              <div className="pt-6 border-t border-[#DCE1D8]/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#263D2B] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-[#10110F] block">100% Natural Henna</span>
                    <span className="text-[10px] text-[#6B7068]">No chemicals or PPD</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#263D2B] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-[#10110F] block">48h Deep Mahogany</span>
                    <span className="text-[10px] text-[#6B7068]">Rich natural stain bloom</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 col-span-2 sm:col-span-1">
                  <Flower2 className="w-4 h-4 text-[#263D2B] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-[#10110F] block">Custom Motifs</span>
                    <span className="text-[10px] text-[#6B7068]">Personalized stories</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-[#DCE1D8] shadow-2xl group">
                <img
                  src="/images/mehndi/bridal-mehndi-hero.webp"
                  alt="Bridal Henna Artistry by Janki — GLAM GIRL BY JANKI"
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#DCE1D8] shadow-xs flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B]">
                  <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
                  <span>SIGNATURE SPECIAL TREATMENT</span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8B5A0] block">
                    EXCLUSIVE ATELIER DISCIPLINE
                  </span>
                  <p className="font-serif text-2xl font-normal text-white mt-1">
                    Organic Rajasthani Henna
                  </p>
                  <p className="text-[11px] text-white/80 font-light mt-0.5">
                    Bridal tapestries, Arabic bels & minimal contemporary accents
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-3xl border-2 border-[#263D2B]/20 -z-10 pointer-events-none hidden sm:block" />
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. FEATURE: CREATE YOUR MEHNDI PACKAGE (BESPOKE BUILDER)              */}
      {/* ===================================================================== */}
      <div ref={packageBuilderRef}>
        <CreateYourMehndiPackage />
      </div>

      {/* ===================================================================== */}
      {/* 2.5 SECTION: MEHNDI BANAVANI RIT (THE ART OF MEHNDI)                  */}
      {/* ===================================================================== */}
      <div ref={ritRef}>
        <MehndiBanavaniRit />
      </div>

      {/* ===================================================================== */}
      {/* 2.55 SECTION: WHAT IS MEHNDI MADE OF? — INGREDIENTS & PREPARATION     */}
      {/* ===================================================================== */}
      <div ref={ingredientsRef}>
        <MehndiIngredientsPrep />
      </div>

      {/* ===================================================================== */}
      {/* 2.6 SECTION: MEHNDI APPLICATION PROCESS — PRICE & TIME                */}
      {/* ===================================================================== */}
      <div ref={priceTimeRef}>
        <MehndiProcessPriceTime />
      </div>

      {/* ===================================================================== */}
      {/* 3. CHOOSE YOUR MEHNDI DESIGN (INTERACTIVE WORKBENCH)                  */}
      {/* ===================================================================== */}
      <section ref={chooserRef} id="choose-your-mehndi-design" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
        <ScrollReveal className="space-y-4 text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
            <Compass className="w-3.5 h-3.5 text-[#263D2B]" />
            <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              INTERACTIVE SELECTION
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal">
            Choose Your Mehndi Design
          </h2>
          <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />
          <p className="text-xs sm:text-sm text-[#6B7068] font-light max-w-xl mx-auto">
            Select any pattern below to view its details, estimated application time, and pricing, or book it directly for your celebration.
          </p>
        </ScrollReveal>

        {/* Selected Design Showcase Card */}
        <div className="bg-white rounded-3xl border border-[#DCE1D8] shadow-md p-6 sm:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-[#DCE1D8] shadow-sm">
                <img
                  src={selectedDesign.image}
                  alt={selectedDesign.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#263D2B] border border-[#DCE1D8]">
                  {selectedDesign.badge}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-[#263D2B]/10 text-[#263D2B] text-xs font-bold uppercase tracking-wider">
                  {selectedDesign.category}
                </span>
                <span className="text-sm font-bold text-[#263D2B] bg-[#F7F4ED] border border-[#DCE1D8] px-3.5 py-1 rounded-full">
                  {selectedDesign.priceDisplay}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                {selectedDesign.name}
              </h3>

              <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed font-light">
                {selectedDesign.description}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#DCE1D8]/80 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#465640] block">
                    APPLICATION DURATION
                  </span>
                  <div className="flex items-center gap-1.5 font-semibold text-[#10110F] mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                    <span>{selectedDesign.estimatedTime}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#465640] block">
                    KEY MOTIFS
                  </span>
                  <span className="text-xs text-[#10110F] font-medium block truncate mt-0.5">
                    {selectedDesign.motifs.join(', ')}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (bookingRef.current) {
                      bookingRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="global-button !px-7 !py-3.5 text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve This Design</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewModalDesign(selectedDesign)}
                  className="global-button-secondary !px-6 !py-3.5 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-4 h-4 text-[#263D2B]" />
                  <span>View Full Photo</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Quick Design Selector Horizontal Ribbon */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#465640] block">
            CLICK ANY DESIGN TO SELECT &amp; PREVIEW:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {MEHNDI_SERVICE_CARDS.map((item) => {
              const isSelected = selectedDesign.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedDesign(item)}
                  className={`text-left p-2.5 rounded-2xl border transition-all cursor-pointer bg-white group ${
                    isSelected
                      ? 'border-[#263D2B] ring-2 ring-[#263D2B]/20 shadow-sm'
                      : 'border-[#DCE1D8] hover:border-[#465640]'
                  }`}
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-800 mb-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-[#10110F] block truncate">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-[#263D2B] font-semibold block">
                    {item.priceDisplay}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </section>

      {/* ===================================================================== */}
      {/* 3. MEHNDI DESIGN GALLERY (12 SERVICE CARDS WITH FILTER PILLS)        */}
      {/* ===================================================================== */}
      <section ref={galleryRef} id="mehndi-gallery" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
        
        <ScrollReveal className="space-y-4 text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
            <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              COMPLETE MEHNDI COLLECTION
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal">
            Mehndi Design Categories
          </h2>
          <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />
          <p className="text-xs sm:text-sm text-[#6B7068] font-light max-w-2xl mx-auto">
            Explore all 12 signature mehndi design categories. Filter by style or search by motif to discover your ideal pattern.
          </p>
        </ScrollReveal>

        {/* Filter Pills & Search */}
        <div className="space-y-4 mb-10">
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#6B7068] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search designs by name, style, or motif..."
              className="w-full pl-10 pr-9 py-2.5 rounded-full bg-white border border-[#DCE1D8] text-xs text-[#10110F] placeholder-[#6B7068] focus:outline-none focus:border-[#263D2B] shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7068] hover:text-[#10110F]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {MEHNDI_GALLERY_FILTERS.map((filt) => {
              const isActive = selectedFilter === filt.id;
              return (
                <button
                  key={filt.id}
                  type="button"
                  onClick={() => setSelectedFilter(filt.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer border shadow-xs ${
                    isActive
                      ? 'bg-[#263D2B] text-white border-[#263D2B]'
                      : 'bg-white text-[#465640] border-[#DCE1D8] hover:border-[#263D2B] hover:text-[#10110F]'
                  }`}
                >
                  <span>{filt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 12 ELEGANT SERVICE CARDS GRID */}
        {filteredDesigns.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredDesigns.map((design) => (
              <div
                key={design.id}
                className="group bg-white rounded-3xl border border-[#DCE1D8] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#263D2B] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Image Frame */}
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                  <img
                    src={design.image}
                    alt={design.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-wider text-[#263D2B] border border-[#DCE1D8] shadow-xs">
                    {design.badge}
                  </div>

                  {/* Price Tag on Image */}
                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-white shadow-xs">
                    {design.priceDisplay}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg text-[#10110F] font-normal group-hover:text-[#263D2B] transition-colors leading-snug">
                      {design.name}
                    </h3>
                    <p className="text-xs text-[#6B7068] leading-relaxed line-clamp-2 font-light">
                      {design.description}
                    </p>

                    {/* Application Time */}
                    <div className="flex items-center gap-1.5 text-[11px] text-[#465640] pt-1">
                      <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                      <span>{design.estimatedTime}</span>
                    </div>

                    {/* Motifs Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {design.motifs.slice(0, 2).map((m, i) => (
                        <span
                          key={i}
                          className="text-[9.5px] font-medium text-[#465640] bg-[#F7F4ED] px-2 py-0.5 rounded-md border border-[#DCE1D8]"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button: View Design */}
                  <div className="pt-4 border-t border-[#DCE1D8]/80">
                    <button
                      type="button"
                      onClick={() => setPreviewModalDesign(design)}
                      className="w-full py-2.5 rounded-xl global-button text-[11px] font-bold text-white uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-white" />
                      <span>View Design &amp; Motifs</span>
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center space-y-4 max-w-md mx-auto bg-white rounded-3xl border border-[#DCE1D8]">
            <p className="text-sm text-[#6B7068]">No designs match your search query.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedFilter('all');
                setSearchQuery('');
              }}
              className="global-button-secondary !px-5 !py-2 text-xs uppercase"
            >
              Reset Filters
            </button>
          </div>
        )}

      </section>

      {/* ===================================================================== */}
      {/* 4. BESPOKE BRIDAL & CELEBRATION CONSULTATION                         */}
      {/* ===================================================================== */}
      <section id="mehndi-consultation" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
        <div className="bg-[#263D2B] text-white rounded-3xl p-8 sm:p-14 text-center space-y-5 shadow-xl relative overflow-hidden">
          <span className="text-[10.5px] font-mono uppercase tracking-widest text-[#A8B5A0] block">
            BESPOKE MEHNDI ARTISTRY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
            Planning a Wedding or Special Celebration?
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto font-light leading-relaxed">
            Every session is personalized with natural Rajasthani henna cones formulated in-house. Explore our complete treatment catalogue or connect with master artist Janki Khatroja for tailored bridal motifs.
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
              <span>Connect with Studio</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. 48-HOUR AFTERCARE SECTION                                         */}
      {/* ===================================================================== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#263D2B] block">
            THE NATURAL SCIENCE OF HENNA
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#10110F] font-normal">
            The 48-Hour Stain Ritual
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7068] font-light">
            We use only 100% natural Rajasthani henna paste. Follow our 4-step ritual for the deepest mahogany bloom.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HENNA_CARE_STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-white rounded-3xl border border-[#DCE1D8] p-6 space-y-3 shadow-xs hover:border-[#263D2B] transition-colors"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-xs font-bold text-[#263D2B] bg-[#263D2B]/10 px-2.5 py-1 rounded-full">
                  STEP {step.step}
                </span>
                <span className="text-[11px] text-[#6B7068] font-medium">{step.time}</span>
              </div>
              <h3 className="font-serif text-lg text-[#10110F] font-normal">
                {step.title}
              </h3>
              <p className="text-xs text-[#6B7068] leading-relaxed font-light">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* VIEW DESIGN MODAL                                                     */}
      {/* ===================================================================== */}
      {previewModalDesign && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewModalDesign(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden border border-[#DCE1D8] shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/11] bg-neutral-900">
              <img
                src={previewModalDesign.image}
                alt={previewModalDesign.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setPreviewModalDesign(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#263D2B]/10 text-[#263D2B] text-xs font-bold uppercase tracking-wider">
                  {previewModalDesign.category}
                </span>
                <span className="text-base font-bold text-[#263D2B]">
                  {previewModalDesign.priceDisplay}
                </span>
              </div>

              <h3 className="font-serif text-2xl text-[#10110F] font-normal">
                {previewModalDesign.name}
              </h3>

              <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed font-light">
                {previewModalDesign.description}
              </p>

              <div className="flex items-center gap-2 text-xs text-[#465640]">
                <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                <span>Estimated Application Time: <strong>{previewModalDesign.estimatedTime}</strong></span>
              </div>

              <div className="pt-4 border-t border-[#DCE1D8] flex gap-3">
                <button
                  type="button"
                  onClick={() => setPreviewModalDesign(null)}
                  className="w-full global-button !py-3.5 text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Close Window</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
