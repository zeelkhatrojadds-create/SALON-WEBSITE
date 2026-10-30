import React, { useEffect } from 'react';
import { 
  Sparkles, 
  Eye, 
  Scissors, 
  ShieldCheck, 
  Compass, 
  Award,
  Layers,
  Heart,
  Droplets,
  CheckCircle2,
  HelpCircle,
  Clock
} from 'lucide-react';
import BrowGallerySection from '../components/brow-atelier/BrowGallerySection';
import BrowShapeExplorer from '../components/brow-atelier/BrowShapeExplorer';
import BrowServiceCollection from '../components/brow-atelier/BrowServiceCollection';
import BrowExperienceGuide from '../components/brow-atelier/BrowExperienceGuide';
import jankiPhoto from '../assets/janki-khatroja.webp';

export default function BrowAtelierPage() {
  useEffect(() => {
    document.title = 'The Brow Atelier — GLAM GIRL BY JANKI | Ottawa';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="bg-[#F7F4ED] text-[#10110F] min-h-screen">
      
      {/* =========================================================================
          1. BROW ATELIER HERO (Editorial & Luxury Studio, Strictly Informational)
      ========================================================================= */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-[#DCE1D8] bg-white">
        
        {/* Subtle Atmospheric Accents in Brand Tones (#263D2B, #A8B5A0) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#263D2B]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#A8B5A0]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Editorial Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] shadow-xs">
                <Scissors className="w-3.5 h-3.5 text-[#263D2B]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
                  PRECISION BROW ARCHITECTURE &amp; DESIGN
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

              <p className="text-sm sm:text-base text-[#465640] max-w-xl leading-relaxed">
                Discover the art of beautifully defined brows through personalized shaping, refined details, and timeless brow inspiration. Explore 12 editorial silhouettes, interactive shape preferences, and certified threading craftsmanship.
              </p>

              {/* 4 Atelier Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <div className="text-sm font-bold text-[#10110F]">100% Organic</div>
                  <div className="text-[10px] text-[#465640] uppercase font-mono">Cotton Thread</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <div className="text-sm font-bold text-[#10110F]">Millimeter</div>
                  <div className="text-[10px] text-[#465640] uppercase font-mono">Precision Arch</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <div className="text-sm font-bold text-[#10110F]">Pure Aloe</div>
                  <div className="text-[10px] text-[#465640] uppercase font-mono">Soothing Seal</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <div className="text-sm font-bold text-[#10110F]">Zero Burns</div>
                  <div className="text-[10px] text-[#465640] uppercase font-mono">Skin Preserving</div>
                </div>
              </div>

              {/* Action Buttons (Strictly Informational, Scrolls to Sections) */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
                <a
                  href="#brow-gallery"
                  className="global-button w-full sm:w-auto !py-3.5 !px-8 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  <Eye className="w-4 h-4 text-white" />
                  <span>Explore Brow Styles (12) ↓</span>
                </a>

                <a
                  href="#brow-explorer"
                  className="global-button-secondary w-full sm:w-auto !py-3.5 !px-6 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-[#263D2B]" />
                  <span>Discover Your Brow Look</span>
                </a>
              </div>

            </div>

            {/* Right Column: Photography Showcase (5 cols - Displays images completely without unwanted cropping) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Primary Wide Close-Up Image Card */}
              <div className="relative rounded-3xl overflow-hidden border border-[#DCE1D8] shadow-xl bg-[#10110F] group">
                <img
                  src="/images/brows/brow-hero.webp"
                  alt="Professional eyebrow close-up showing pristine precision hair removal and natural arch definition"
                  className="w-full h-auto max-h-[340px] sm:max-h-[380px] object-cover object-center transition-transform duration-700 group-hover:scale-102"
                  loading="eager"
                />
                
                {/* Floating Top Badge */}
                <div className="absolute top-3 left-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10110F]/75 backdrop-blur-md border border-white/15 text-white shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8B5A0] animate-pulse" />
                  <span className="text-[9.5px] uppercase font-mono tracking-[0.2em] text-[#F7F4ED]">
                    The Brow Atelier
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 bg-[#10110F]/85 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex items-center justify-between text-white">
                  <div>
                    <div className="text-xs font-serif font-medium">Macro Brow Definition</div>
                    <div className="text-[10px] text-[#A8B5A0]">High-definition natural hair retention</div>
                  </div>
                  <span className="text-[10px] uppercase font-mono text-[#F7F4ED] bg-[#263D2B] px-2.5 py-1 rounded-full">
                    Symmetry
                  </span>
                </div>
              </div>

              {/* Secondary Artist Working Image Card */}
              <div className="p-3 bg-[#F7F4ED] rounded-3xl border border-[#DCE1D8] flex items-center gap-3 shadow-xs">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-[#DCE1D8] flex-shrink-0 bg-white">
                  <img
                    src="/images/brows/brow-artist-client.webp"
                    alt="Certified brow artist Janki Khatroja shaping client brows with organic cotton thread"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-0.5">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#263D2B]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>In-Studio Craftsmanship</span>
                  </div>
                  <h3 className="font-serif text-sm font-semibold text-[#10110F]">
                    Artist at Work with Client
                  </h3>
                  <p className="text-[11px] text-[#465640] line-clamp-1">
                    Custom thread mapping tailored to personal facial bone structure.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Quick Anchor Navigation Strip */}
          <div className="pt-10 flex items-center justify-center">
            <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] overflow-x-auto max-w-full text-xs">
              <a href="#brow-gallery" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors whitespace-nowrap">
                1. Inspiration Gallery
              </a>
              <a href="#brow-explorer" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors whitespace-nowrap">
                2. Shape Explorer
              </a>
              <a href="#brow-services" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors whitespace-nowrap">
                3. Approved Services
              </a>
              <a href="#brow-artist" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors whitespace-nowrap">
                4. Master Artist
              </a>
              <a href="#brow-experience" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors whitespace-nowrap">
                5. 6-Step Experience
              </a>
              <a href="#brow-maintenance" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors whitespace-nowrap">
                6. Maintenance &amp; Care
              </a>
              <a href="#brow-faqs" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors whitespace-nowrap">
                7. FAQs
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. BROW INSPIRATION GALLERY (12 Individual Cards with Functional Filters)
      ========================================================================= */}
      <BrowGallerySection />

      {/* =========================================================================
          3. INTERACTIVE BROW SHAPE EXPLORER (5 Preferences, Dynamic Scoring)
      ========================================================================= */}
      <BrowShapeExplorer />

      {/* =========================================================================
          4. EXISTING APPROVED BROW SERVICES (Direct from Salon Database)
      ========================================================================= */}
      <BrowServiceCollection />

      {/* =========================================================================
          5. MASTER ARTIST SPOTLIGHT (Janki Khatroja - Certified Specialist)
      ========================================================================= */}
      <section id="brow-artist" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
        <div className="bg-white rounded-3xl border border-[#DCE1D8] p-8 sm:p-12 lg:p-16 shadow-xs relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Artist Photo */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#DCE1D8] aspect-[4/5] max-w-sm mx-auto shadow-md bg-[#F7F4ED]">
                <img
                  src={jankiPhoto}
                  alt="Janki Khatroja, Founder & Certified Threading Specialist at GLAM GIRL BY JANKI Ottawa"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10110F]/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#A8B5A0] block">
                      Founder &amp; Certified Specialist
                    </span>
                    <h3 className="font-serif text-2xl font-normal">Janki Khatroja</h3>
                    <p className="text-xs text-[#DCE1D8]/80 mt-0.5">
                      10+ Years of Threading &amp; Facial Symmetry Mastery
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Artist Biography & Philosophy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[10.5px] font-bold text-[#263D2B] uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>MEET YOUR BROW ARCHITECT</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#10110F] font-normal leading-tight">
                "Eyebrows are not twins; they are sisters. True beauty lies in honoring your unique symmetry."
              </h2>

              <p className="text-xs sm:text-sm text-[#465640] leading-relaxed">
                Eyebrow threading is an art passed down through generations. At GLAM GIRL BY JANKI, we approach every arch with scientific precision and artistic intuition. We don't believe in generic stencil cut-outs or aggressive hair removal. Instead, we study your orbital bone structure, hair growth direction, and facial contours to sculpt a frame that feels authentically yours.
              </p>

              {/* Quality & Craftsmanship Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <div className="font-serif text-2xl font-bold text-[#10110F]">10,000+</div>
                  <div className="text-xs font-medium text-[#263D2B] mt-0.5">Brows Shaped</div>
                  <div className="text-[10.5px] text-[#6B7068]">Ottawa &amp; Beyond</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <div className="font-serif text-2xl font-bold text-[#10110F]">100%</div>
                  <div className="text-xs font-medium text-[#263D2B] mt-0.5">Organic Thread</div>
                  <div className="text-[10.5px] text-[#6B7068]">Skin-Safe &amp; Sanitary</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] col-span-2 sm:col-span-1">
                  <div className="font-serif text-2xl font-bold text-[#10110F]">5.0 ★</div>
                  <div className="text-xs font-medium text-[#263D2B] mt-0.5">Client Rating</div>
                  <div className="text-[10.5px] text-[#6B7068]">Verified Reviews</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#263D2B] flex-shrink-0" />
                <p className="text-xs text-[#465640] leading-snug">
                  <strong>The Atelier Hygiene Promise:</strong> A fresh strand of organic cotton thread is drawn for every single client. All scissors and grooming tools undergo hospital-grade sanitization between appointments.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          6. BROW EXPERIENCE GUIDE (6 Steps, 5 Care Cards, Checklist, & 7 FAQs)
      ========================================================================= */}
      <BrowExperienceGuide />

      {/* =========================================================================
          7. BOTTOM INFORMATIONAL EXPLORATION BANNER (Strictly No Booking CTAs)
      ========================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
        <div className="bg-[#10110F] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden text-center space-y-6">
          
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#263D2B]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#A8B5A0]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10.5px] font-mono tracking-widest text-[#A8B5A0] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#F7F4ED]" />
              <span>THE BROW ATELIER DIRECTORY</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight">
              Ready to Explore Our Other Flagship Ateliers?
            </h2>

            <p className="text-xs sm:text-sm text-[#DCE1D8]/80 leading-relaxed">
              GLAM GIRL BY JANKI offers specialized atelier spaces dedicated to lash architecture, bespoke makeup artistry, clinical skin therapy, and organic hair spas.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <a
                href="/lash-atelier"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white hover:text-[#10110F] text-white text-xs font-semibold border border-white/15 transition-all"
              >
                The Lash Atelier →
              </a>
              <a
                href="/makeup-atelier"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white hover:text-[#10110F] text-white text-xs font-semibold border border-white/15 transition-all"
              >
                The Makeup Atelier →
              </a>
              <a
                href="/skin-atelier"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white hover:text-[#10110F] text-white text-xs font-semibold border border-white/15 transition-all"
              >
                The Skin Atelier →
              </a>
              <a
                href="/hair-atelier"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white hover:text-[#10110F] text-white text-xs font-semibold border border-white/15 transition-all"
              >
                The Hair Atelier →
              </a>
            </div>

            <div className="pt-4 text-[11px] text-[#A8B5A0] font-mono">
              The Brow Atelier • GLAM GIRL BY JANKI • 3004 Woodroffe Ave, Ottawa, ON
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
