import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Eye, 
  HeartHandshake, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Compass, 
  Award,
  Layers,
  Calendar,
  SlidersHorizontal
} from 'lucide-react';
import MakeupGallerySection from '../components/makeup-atelier/MakeupGallerySection';
import MakeupOccasionSelector from '../components/makeup-atelier/MakeupOccasionSelector';
import MakeupStyleExplorer from '../components/makeup-atelier/MakeupStyleExplorer';
import MakeupServiceCollection from '../components/makeup-atelier/MakeupServiceCollection';
import MakeupConsultationForm from '../components/makeup-atelier/MakeupConsultationForm';
import MakeupExperienceGuide from '../components/makeup-atelier/MakeupExperienceGuide';
import jankiPhoto from '../assets/janki-khatroja.webp';

export default function MakeupAtelierPage() {
  const [consultationPreferences, setConsultationPreferences] = useState(null);

  useEffect(() => {
    document.title = 'The Makeup Atelier — GLAM GIRL BY JANKI | Ottawa';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleApplyPreferencesToConsultation = (prefs) => {
    setConsultationPreferences(prefs);
  };

  return (
    <div className="bg-[#F7F4ED] text-[#10110F] min-h-screen">
      
      {/* 1. MAKEUP ATELIER HERO (Editorial & Luxury, No Booking Buttons) */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-[#DCE1D8] bg-white">
        
        {/* Subtle Atmospheric Blur Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#263D2B]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#A8B5A0]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
                  LUXURY EDITORIAL MAKEUP STUDIO
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#10110F] font-normal tracking-tight leading-[1.1]">
                  THE MAKEUP ATELIER
                </h1>
                <p className="font-serif text-xl sm:text-2xl text-[#263D2B] italic font-light">
                  "Your Beauty. Your Moment. Your Signature Look."
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#465640] max-w-xl leading-relaxed">
                Discover the art of makeup through personalized looks, beautiful details, and artistry designed around your special moments. Explore our curated collections, interactive occasion finder, and personalized consultation experience.
              </p>

              {/* 4 Atelier Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <div className="text-sm font-bold text-[#10110F]">16+ Hrs</div>
                  <div className="text-[10px] text-[#465640] uppercase font-mono">Transfer-Proof</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <div className="text-sm font-bold text-[#10110F]">4K Ready</div>
                  <div className="text-[10px] text-[#465640] uppercase font-mono">Strobe &amp; Flash</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <div className="text-sm font-bold text-[#10110F]">100%</div>
                  <div className="text-[10px] text-[#465640] uppercase font-mono">Custom Color</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <div className="text-sm font-bold text-[#10110F]">Hypoallergenic</div>
                  <div className="text-[10px] text-[#465640] uppercase font-mono">Sanitized Kit</div>
                </div>
              </div>

              {/* Action Buttons (Strictly Informational, Scrolls to Sections) */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
                <a
                  href="#makeup-gallery"
                  className="global-button w-full sm:w-auto !py-3.5 !px-8 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  <Eye className="w-4 h-4 text-white" />
                  <span>Explore Makeup Looks (12) ↓</span>
                </a>

                <a
                  href="#makeup-consultation"
                  className="global-button-secondary w-full sm:w-auto !py-3.5 !px-6 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-[#263D2B]" />
                  <span>Discover Your Style</span>
                </a>
              </div>

            </div>

            {/* Right Hero Image (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-[#DCE1D8] shadow-2xl bg-[#10110F] aspect-[4/5] sm:h-[540px] max-w-md mx-auto lg:max-w-none group">
                <img
                  src="/images/makeup/makeup-hero.webp"
                  alt="Professional makeup artist working with client at The Makeup Atelier"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-102"
                  loading="eager"
                />
                
                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10110F]/70 backdrop-blur-md border border-white/15 text-white shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8B5A0] animate-pulse" />
                  <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#F7F4ED]">
                    The Makeup Atelier
                  </span>
                </div>

                {/* Base Gradient Info */}
                <div className="absolute inset-x-0 bottom-0 pt-24 pb-6 px-6 bg-gradient-to-t from-[#10110F]/95 via-[#10110F]/45 to-transparent text-white flex items-end justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#A8B5A0] block">
                      Founder &amp; Master Artist
                    </span>
                    <h2 className="font-serif text-lg sm:text-xl text-white font-normal tracking-wide">
                      Janki Khatroja
                    </h2>
                    <p className="text-[11px] text-[#DCE1D8]/80 font-light">
                      Custom color theory calibrated to natural skin undertones
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#263D2B]/90 border border-[#A8B5A0]/30 text-[10.5px] font-mono text-[#F7F4ED]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#A8B5A0]" />
                      <span>HD Airbrush</span>
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Quick Anchor Navigation Strip */}
          <div className="pt-10 flex items-center justify-center">
            <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] overflow-x-auto max-w-full text-xs">
              <a href="#makeup-gallery" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors whitespace-nowrap">
                1. Inspiration Gallery
              </a>
              <a href="#makeup-occasions" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors whitespace-nowrap">
                2. Choose Occasion
              </a>
              <a href="#makeup-explorer" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors whitespace-nowrap">
                3. Style Explorer
              </a>
              <a href="#makeup-services" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors whitespace-nowrap">
                4. Approved Services
              </a>
              <a href="#makeup-consultation" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors whitespace-nowrap">
                5. Consultation Form
              </a>
              <a href="#makeup-experience" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors whitespace-nowrap">
                6. Experience &amp; Guides
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 2. MAKEUP INSPIRATION GALLERY (12 Looks) */}
      <MakeupGallerySection />

      {/* 3. CHOOSE YOUR OCCASION (12 Occasions) */}
      <MakeupOccasionSelector />

      {/* 4. MAKEUP STYLE EXPLORER (Interactive Finish, Eye, Lip, & Mood) */}
      <MakeupStyleExplorer onApplyToConsultation={handleApplyPreferencesToConsultation} />

      {/* 5. EXISTING MAKEUP SERVICES (Approved Catalog Services) */}
      <MakeupServiceCollection />

      {/* 6. PERSONALIZED MAKEUP CONSULTATION (Backend Connected via salonDB) */}
      <MakeupConsultationForm prefilledPreferences={consultationPreferences} />

      {/* 7. MASTER ARTIST SPOTLIGHT (Janki Khatroja) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#DCE1D8] shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-4 flex justify-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-[#F7F4ED] shadow-xl relative bg-[#10110F]">
              <img
                src={jankiPhoto}
                alt="Janki Khatroja — Certified Master Makeup Artist"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-8 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[10px] font-bold uppercase tracking-wider text-[#263D2B]">
              <Award className="w-3.5 h-3.5" />
              <span>Certified Master Director</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F]">
              Artistry with Intention: Janki Khatroja
            </h3>

            <p className="text-xs sm:text-sm text-[#465640] leading-relaxed">
              "Makeup is not about covering your identity — it is about revealing your signature radiance on the milestones that matter most. At GLAM GIRL BY JANKI, we never apply a generic formula. Every brush stroke, undertone balance, and lash placement is tailored to your unique bone structure and comfort zone."
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-semibold text-[#10110F]">
              <span className="flex items-center gap-1.5 text-[#263D2B]">
                <Check className="w-4 h-4" />
                South-Asian &amp; Western Bridal Specialist
              </span>
              <span className="flex items-center gap-1.5 text-[#263D2B]">
                <Check className="w-4 h-4" />
                Ottawa Studio Sanctuary
              </span>
              <span className="flex items-center gap-1.5 text-[#263D2B]">
                <Check className="w-4 h-4" />
                Hygienic Single-Use Applicator Standards
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 8. THE MAKEUP EXPERIENCE, PREPARATION, AFTERCARE & FAQS */}
      <MakeupExperienceGuide />

      {/* 9. BOTTOM ATELIER EXPLORATION BANNER (Strictly No Booking) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#263D2B] text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#A8B5A0]">
              GLAM GIRL BY JANKI ATELIER SUITE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
              Explore Our Atelier Destinations
            </h2>
            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              Discover our signature specialized ateliers covering bespoke eyelash architecture, rejuvenating facials, hair styling couture, and intricate bridal mehndi.
            </p>
          </div>

          {/* Navigation Links — Strictly Informational, No Booking CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
            <Link
              to="/services"
              className="px-6 py-3.5 rounded-full bg-white text-[#10110F] hover:bg-[#F7F4ED] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02]"
            >
              <span>Explore All Salon Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/the-lash-atelier"
              className="px-6 py-3.5 rounded-full border border-white/30 text-white hover:bg-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>The Lash Atelier</span>
            </Link>

            <Link
              to="/skin-atelier"
              className="px-6 py-3.5 rounded-full border border-white/30 text-white hover:bg-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>The Skin Atelier</span>
            </Link>

            <Link
              to="/hair-atelier"
              className="px-6 py-3.5 rounded-full border border-white/30 text-white hover:bg-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>The Hair Atelier</span>
            </Link>

            <Link
              to="/mehndi-design-studio"
              className="px-6 py-3.5 rounded-full border border-white/30 text-white hover:bg-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>Mehndi Studio</span>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
