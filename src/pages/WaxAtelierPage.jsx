import React, { useEffect } from 'react';
import { 
  Sparkles, 
  Eye, 
  Droplets, 
  ShieldCheck, 
  Compass, 
  Award,
  Layers,
  Heart,
  CheckCircle2,
  HelpCircle,
  Clock,
  Feather
} from 'lucide-react';
import WaxGallerySection from '../components/wax-atelier/WaxGallerySection';
import WaxServiceDirectory from '../components/wax-atelier/WaxServiceDirectory';
import WaxExperienceGuide from '../components/wax-atelier/WaxExperienceGuide';
import jankiPhoto from '../assets/janki-khatroja.webp';

export default function WaxAtelierPage() {
  useEffect(() => {
    document.title = 'The Wax Atelier — GLAM GIRL BY JANKI | Ottawa';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="bg-[#F7F4ED] text-[#10110F] min-h-screen">
      
      {/* =========================================================================
          1. WAX ATELIER HERO (Editorial & Luxury Studio, Strictly Informational)
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
                <Droplets className="w-3.5 h-3.5 text-[#263D2B]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
                  GENTLE BOTANICAL WAXING &amp; SKINCARE
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#10110F] font-normal tracking-tight leading-[1.1]">
                  THE WAX ATELIER
                </h1>
                <p className="font-serif text-xl sm:text-2xl text-[#263D2B] italic font-light">
                  "Smooth Confidence. Beautifully Refined."
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#465640] max-w-xl leading-relaxed">
                Discover the luxury of velvet smoothness through personalized waxing techniques, low-temperature hypoallergenic formulas, and restorative post-wax botanical care. Explore 11 specialized categories, preparation protocols, and approved salon treatments.
              </p>

              {/* 4 Atelier Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <div className="text-sm font-bold text-[#10110F]">Zero Double-Dip</div>
                  <div className="text-[10px] text-[#465640] uppercase font-mono">100% Sanitary</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <div className="text-sm font-bold text-[#10110F]">Low-Temp</div>
                  <div className="text-[10px] text-[#465640] uppercase font-mono">Zero Burn Risk</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <div className="text-sm font-bold text-[#10110F]">Chamomile</div>
                  <div className="text-[10px] text-[#465640] uppercase font-mono">Soothing Balm</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <div className="text-sm font-bold text-[#10110F]">Up to 5 Wks</div>
                  <div className="text-[10px] text-[#465640] uppercase font-mono">Lasting Silkiness</div>
                </div>
              </div>

              {/* Action Buttons (Strictly Informational, Scrolls to Sections) */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
                <a
                  href="#wax-gallery"
                  className="global-button w-full sm:w-auto !py-3.5 !px-8 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  <Eye className="w-4 h-4 text-white" />
                  <span>Explore Waxing Styles (11) ↓</span>
                </a>

                <a
                  href="#wax-prep"
                  className="global-button-secondary w-full sm:w-auto !py-3.5 !px-6 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-[#263D2B]" />
                  <span>Skin Prep &amp; Aftercare</span>
                </a>
              </div>

            </div>

            {/* Right Column: Photography Showcase (5 cols - Displays images completely without unwanted cropping) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Primary Wide Hero Card */}
              <div className="relative rounded-3xl overflow-hidden border border-[#DCE1D8] shadow-xl bg-[#10110F] group">
                <img
                  src="/images/waxing/wax-hero.webp"
                  alt="Luxury waxing atelier treatment suite showing botanical oils and soothing spa presentation"
                  className="w-full h-auto max-h-[340px] sm:max-h-[380px] object-cover object-center transition-transform duration-700 group-hover:scale-102"
                  loading="eager"
                />
                
                {/* Floating Top Badge */}
                <div className="absolute top-3 left-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10110F]/75 backdrop-blur-md border border-white/15 text-white shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8B5A0] animate-pulse" />
                  <span className="text-[9.5px] uppercase font-mono tracking-[0.2em] text-[#F7F4ED]">
                    The Wax Atelier
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 bg-[#10110F]/85 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex items-center justify-between text-white">
                  <div>
                    <div className="text-xs font-serif font-medium">Botanical Wax Rituals</div>
                    <div className="text-[10px] text-[#A8B5A0]">Gentle on skin, merciless on roots</div>
                  </div>
                  <span className="text-[10px] uppercase font-mono text-[#F7F4ED] bg-[#263D2B] px-2.5 py-1 rounded-full">
                    Private Suite
                  </span>
                </div>
              </div>

              {/* Secondary Specialist Working Image Card */}
              <div className="p-3 bg-[#F7F4ED] rounded-3xl border border-[#DCE1D8] flex items-center gap-3 shadow-xs">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-[#DCE1D8] flex-shrink-0 bg-white">
                  <img
                    src="/images/waxing/wax-artist-client.webp"
                    alt="Master esthetician in treatment suite providing comforting, professional waxing care"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-0.5">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#263D2B]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>In-Studio Excellence</span>
                  </div>
                  <h3 className="font-serif text-sm font-semibold text-[#10110F]">
                    Certified Esthetics Master
                  </h3>
                  <p className="text-[11px] text-[#465640] line-clamp-1">
                    Calibrated temperature and anatomical grain removal technique.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Quick Anchor Navigation Strip */}
          <div className="pt-10 flex items-center justify-center">
            <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] overflow-x-auto max-w-full text-xs">
              <a href="#wax-gallery" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors whitespace-nowrap">
                1. Waxing Categories
              </a>
              <a href="#wax-services" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors whitespace-nowrap">
                2. Approved Services
              </a>
              <a href="#wax-prep" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors whitespace-nowrap">
                3. Skin Prep Guide
              </a>
              <a href="#wax-experience" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors whitespace-nowrap">
                4. 6-Step Experience
              </a>
              <a href="#wax-aftercare" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors whitespace-nowrap">
                5. Aftercare &amp; Checklist
              </a>
              <a href="#wax-faqs" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors whitespace-nowrap">
                6. FAQs
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. WAXING INSPIRATION GALLERY (11 Categories with Functional Filters)
      ========================================================================= */}
      <WaxGallerySection />

      {/* =========================================================================
          3. APPROVED WAXING SERVICES (Direct from Salon Database)
      ========================================================================= */}
      <WaxServiceDirectory />

      {/* =========================================================================
          4. MASTER SPECIALIST SPOTLIGHT (Janki Khatroja - Certified Esthetician)
      ========================================================================= */}
      <section id="wax-specialist" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
        <div className="bg-white rounded-3xl border border-[#DCE1D8] p-8 sm:p-12 lg:p-16 shadow-xs relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Artist Photo */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#DCE1D8] aspect-[4/5] max-w-sm mx-auto shadow-md bg-[#F7F4ED]">
                <img
                  src={jankiPhoto}
                  alt="Janki Khatroja, Founder & Certified Waxing Specialist at GLAM GIRL BY JANKI Ottawa"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10110F]/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#A8B5A0] block">
                      Founder &amp; Certified Esthetician
                    </span>
                    <h3 className="font-serif text-2xl font-normal">Janki Khatroja</h3>
                    <p className="text-xs text-[#DCE1D8]/80 mt-0.5">
                      10+ Years of Gentle Hair Removal &amp; Barrier Preservation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Specialist Philosophy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[10.5px] font-bold text-[#263D2B] uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>EXPERT ESTHETICS MASTERY</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#10110F] font-normal leading-tight">
                "Waxing should be a soothing skin transformation, never an ordeal."
              </h2>

              <p className="text-xs sm:text-sm text-[#465640] leading-relaxed">
                At GLAM GIRL BY JANKI, we transform waxing from a routine task into a refined, comfortable beauty ritual. We utilize premium European low-temperature strip and hard waxes enriched with calming chamomile and lavender. Every session is hosted in a private, immaculately sanitized Ottawa suite dedicated to your comfort and privacy.
              </p>

              {/* Quality & Craftsmanship Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <div className="font-serif text-2xl font-bold text-[#10110F]">Zero</div>
                  <div className="text-xs font-medium text-[#263D2B] mt-0.5">Double-Dipping</div>
                  <div className="text-[10.5px] text-[#6B7068]">Sterile Single-Use</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <div className="font-serif text-2xl font-bold text-[#10110F]">100%</div>
                  <div className="text-xs font-medium text-[#263D2B] mt-0.5">Private Suite</div>
                  <div className="text-[10.5px] text-[#6B7068]">Discreet &amp; Relaxing</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] col-span-2 sm:col-span-1">
                  <div className="font-serif text-2xl font-bold text-[#10110F]">4-5 Wks</div>
                  <div className="text-xs font-medium text-[#263D2B] mt-0.5">Smooth Freedom</div>
                  <div className="text-[10.5px] text-[#6B7068]">Slower Regrowth</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#263D2B] flex-shrink-0" />
                <p className="text-xs text-[#465640] leading-snug">
                  <strong>The Atelier Wax Hygiene Promise:</strong> Every spatula is dipped once and immediately discarded. Clean hospital-grade sanitary paper protects the treatment bed for every appointment.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          5. WAX EXPERIENCE GUIDE (Prep, 6 Steps, Aftercare, Checklist, & FAQs)
      ========================================================================= */}
      <WaxExperienceGuide />

      {/* =========================================================================
          6. BOTTOM INFORMATIONAL EXPLORATION BANNER (Strictly No Booking CTAs)
      ========================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
        <div className="bg-[#10110F] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden text-center space-y-6">
          
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#263D2B]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#A8B5A0]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10.5px] font-mono tracking-widest text-[#A8B5A0] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#F7F4ED]" />
              <span>THE WAX ATELIER DIRECTORY</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight">
              Ready to Explore Our Other Flagship Ateliers?
            </h2>

            <p className="text-xs sm:text-sm text-[#DCE1D8]/80 leading-relaxed">
              GLAM GIRL BY JANKI offers dedicated spaces for eyebrow design, lash architecture, bespoke makeup artistry, clinical skin therapy, and organic hair spas.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <a
                href="/brow-atelier"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white hover:text-[#10110F] text-white text-xs font-semibold border border-white/15 transition-all"
              >
                The Brow Atelier →
              </a>
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
              The Wax Atelier • GLAM GIRL BY JANKI • 405 Euphoria Crescent, Ottawa, ON
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
