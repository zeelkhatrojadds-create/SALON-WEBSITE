import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  ArrowRight, 
  Check, 
  Layers, 
  Award,
  Feather,
  Info,
  CheckCircle2,
  Heart
} from 'lucide-react';
import BrowGallerySection from '../components/brow-atelier/BrowGallerySection';
import BrowShapeExplorer from '../components/brow-atelier/BrowShapeExplorer';
import BrowServiceCollection from '../components/brow-atelier/BrowServiceCollection';
import BrowExperienceGuide from '../components/brow-atelier/BrowExperienceGuide';
import jankiPhoto from '../assets/janki-khatroja.webp';

export default function BrowAtelierPage() {
  useEffect(() => {
    document.title = 'The Brow Atelier — GLAM GIRL BY JANKI | Ottawa Luxury Studio';
    
    // Set meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Explore The Brow Atelier by GLAM GIRL BY JANKI. Discover brow inspiration styles, interactive shape explorer, approved threading & waxing services, and complete maintenance guides.');
    }
    
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#F7F4ED] text-[#10110F] min-h-screen">
      
      {/* ============================================================ */}
      {/* 1. BROW ATELIER HERO (Strictly Informational, No Booking) */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-[#DCE1D8] bg-white">
        
        {/* Subtle Luxury Pattern Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#263D2B]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#A8B5A0]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] shadow-xs">
                <Feather className="w-3.5 h-3.5 text-[#263D2B]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
                  LUXURY BROW ARCHITECTURE & DESIGN
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#10110F] font-normal tracking-tight leading-[1.1]">
                  THE BROW ATELIER
                </h1>
                <p className="font-serif text-xl sm:text-2xl text-[#263D2B] italic font-light">
                  "Perfectly Framed. Naturally You."
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#465640] leading-relaxed max-w-xl">
                Discover the art of beautifully defined brows through personalized shaping, refined details, and timeless brow inspiration.
              </p>

              {/* Atelier Key Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 py-2">
                <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <span className="text-[10px] uppercase font-bold text-[#263D2B] tracking-wider block mb-1">
                    Organic Technique
                  </span>
                  <span className="text-xs text-[#465640] leading-snug">
                    100% antibacterial cotton thread
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <span className="text-[10px] uppercase font-bold text-[#263D2B] tracking-wider block mb-1">
                    Personalized Map
                  </span>
                  <span className="text-xs text-[#465640] leading-snug">
                    Calibrated to your natural bone structure
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <span className="text-[10px] uppercase font-bold text-[#263D2B] tracking-wider block mb-1">
                    Certified Director
                  </span>
                  <span className="text-xs text-[#465640] leading-snug">
                    Led personally by Janki Khatroja
                  </span>
                </div>
              </div>

              {/* Informational Guidance Notice - Strictly No Booking */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs text-[#465640]">
                <Info className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
                <span>
                  <strong>Informational Atelier:</strong> Explore 12 inspiration styles, shape finder, approved salon treatments, and aftercare guides.
                </span>
              </div>

              {/* Action Buttons (Scroll to content sections — NO BOOKING) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => scrollToSection('brow-gallery')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#10110F] text-white text-xs sm:text-sm font-medium hover:bg-[#263D2B] transition-all duration-300 shadow-sm group"
                >
                  <Sparkles className="w-4 h-4 text-[#A8B5A0] group-hover:scale-110 transition-transform" />
                  <span>Explore Brow Styles</span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('brow-explorer')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#10110F] text-xs sm:text-sm font-medium border border-[#DCE1D8] hover:bg-[#F7F4ED] hover:border-[#263D2B] transition-all duration-300"
                >
                  <Compass className="w-4 h-4 text-[#263D2B]" />
                  <span>Discover Your Brow Look</span>
                </button>
              </div>

            </div>

            {/* Right Images Editorial Composition (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Main Wide Eyebrow Close-Up Photograph */}
              <div className="relative rounded-3xl overflow-hidden border border-[#DCE1D8] shadow-lg group bg-[#EAE7DC]">
                <img
                  src="/images/brows/brow-hero.jpg"
                  alt="High definition eyebrow close-up displaying feathered texture and natural arch symmetry"
                  className="w-full h-72 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#A8B5A0] block mb-1">
                    Editorial Architecture
                  </span>
                  <p className="font-serif text-lg font-light">
                    Precision micro-thread shaping & balanced bone mapping
                  </p>
                </div>
              </div>

              {/* Secondary Inset: Professional Brow Artist Working on a Client */}
              <div className="relative rounded-2xl overflow-hidden border border-[#DCE1D8] bg-[#F7F4ED] p-4 flex items-center gap-4 shadow-sm hover:border-[#263D2B]/50 transition-colors">
                <img
                  src="/images/brows/brow-artist.jpg"
                  alt="Professional brow artist carefully shaping client eyebrows with organic cotton thread"
                  className="w-20 h-20 rounded-xl object-cover border border-[#DCE1D8] flex-shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#263D2B]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>In-Studio Artistry</span>
                  </div>
                  <h2 className="font-serif text-sm font-medium text-[#10110F]">
                    Organic Threading Technique
                  </h2>
                  <p className="text-[11px] text-[#465640] leading-snug">
                    Zero chemical exposure, zero skin peeling. Safe for delicate eye contours.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. BROW INSPIRATION GALLERY */}
      {/* ============================================================ */}
      <BrowGallerySection />

      {/* ============================================================ */}
      {/* 3. BROW SHAPE EXPLORER */}
      {/* ============================================================ */}
      <BrowShapeExplorer />

      {/* ============================================================ */}
      {/* 4. EXISTING BROW SERVICE COLLECTION */}
      {/* ============================================================ */}
      <BrowServiceCollection />

      {/* ============================================================ */}
      {/* 5, 6, 7, 8. BROW DESIGN EXPERIENCE, AFTERCARE, CHECKLIST, FAQS */}
      {/* ============================================================ */}
      <BrowExperienceGuide />

      {/* ============================================================ */}
      {/* MASTER ARTIST SPOTLIGHT */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#DCE1D8]">
        <div className="rounded-3xl bg-[#263D2B] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#A8B5A0]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative">
                <img
                  src={jankiPhoto}
                  alt="Janki Khatroja — Master Beauty & Brow Director"
                  className="w-48 h-48 sm:w-60 sm:h-60 rounded-full object-cover border-4 border-[#A8B5A0]/30 shadow-2xl"
                />
                <div className="absolute -bottom-2 -right-2 p-2.5 rounded-full bg-[#10110F] border border-[#A8B5A0]/40 text-[#A8B5A0] shadow-md">
                  <Award className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-[10.5px] uppercase font-bold tracking-widest text-[#A8B5A0]">
                <span>Artisan Esthetics Direction</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight">
                "The most flattering brow doesn't copy a trend—it mirrors your natural expression."
              </h2>

              <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl">
                With over a decade of mastery in organic facial threading, skin mapping, and brow architecture, Janki Khatroja approaches every pair of brows as an individual artwork. In our studio, we reject harsh stencils in favor of organic symmetry that enhances your unique facial bone structure.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-[#A8B5A0]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>100% Antibacterial Thread</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Zero Epidermal Pulling</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Private Women's Studio</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ATELIER EXPLORATION BANNER (Strictly Informational, Links to Other Ateliers & Catalog) */}
      {/* ============================================================ */}
      <section className="pb-16 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-[#DCE1D8] p-8 sm:p-12 text-center space-y-6 shadow-xs">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-widest text-[#263D2B]">
            <Layers className="w-3.5 h-3.5" />
            <span>THE ATELIER COLLECTION</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#10110F] font-normal">
            Explore All GLAM GIRL Artistry Studios
          </h2>

          <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
            Continue your beauty exploration through our curated visual ateliers, from tailored lash extensions to red-carpet event makeup and holistic Ayurvedic skin therapy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/the-lash-atelier"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-xs font-semibold text-[#10110F] hover:bg-[#263D2B] hover:text-white hover:border-[#263D2B] transition-all"
            >
              <span>The Lash Atelier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/the-makeup-atelier"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-xs font-semibold text-[#10110F] hover:bg-[#263D2B] hover:text-white hover:border-[#263D2B] transition-all"
            >
              <span>The Makeup Atelier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/the-skin-atelier"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-xs font-semibold text-[#10110F] hover:bg-[#263D2B] hover:text-white hover:border-[#263D2B] transition-all"
            >
              <span>The Skin Atelier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#10110F] text-white text-xs font-semibold hover:bg-[#263D2B] transition-all"
            >
              <span>Full Services Menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="pt-4 border-t border-[#DCE1D8]/60 text-[11px] text-[#465640]">
            GLAM GIRL BY JANKI — Private Women's Beauty Atelier • Ottawa, ON • Strictly Informational Atelier Suite
          </div>
        </div>
      </section>

    </div>
  );
}
