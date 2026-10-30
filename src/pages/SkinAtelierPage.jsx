import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  Compass, 
  Check, 
  Award
} from 'lucide-react';
import SkinServiceMenu from '../components/skin-atelier/SkinServiceMenu';
import SkinAftercareGuide from '../components/skin-atelier/SkinAftercareGuide';
import SkinConsultationModal from '../components/skin-atelier/SkinConsultationModal';
import jankiPhoto from '../assets/janki-khatroja.webp';
import facialHeroImg from '../assets/the-skin-atelier-hero.jpg';

export default function SkinAtelierPage() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [consultationInitialService, setConsultationInitialService] = useState(null);

  useEffect(() => {
    document.title = 'The Skin Atelier — GLAM GIRL BY JANKI | Ottawa';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleOpenConsultation = (service = null) => {
    setConsultationInitialService(service);
    setIsConsultationModalOpen(true);
  };

  return (
    <div className="bg-[#F7F4ED] text-[#10110F] min-h-screen selection:bg-[#263D2B] selection:text-white font-sans antialiased">
      
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative pt-12 sm:pt-16 pb-14 sm:pb-20 border-b border-[#DCE1D8] bg-white">
        
        {/* Subtle Ambient Atmosphere Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#263D2B]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#A8B5A0]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Editorial Intro */}
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-5">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
                BESPOKE OTTAWA BEAUTY SUITE
              </span>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#10110F] font-normal tracking-tight leading-[1.15]">
                The Skin Atelier
              </h1>
              <p className="font-serif text-lg sm:text-2xl text-[#263D2B] italic font-light">
                Curated Facial Rituals &amp; Clinical Botanical Skincare
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed font-light">
              Immerse yourself in our private Ottawa sanctuary. From pore-purifying deep cleanses and Ayurvedic soothing rituals to 24K gold firming treatments and targeted Vitamin C brightening, our certified aesthetic director Janki Khatroja harmonizes clinical efficacy with pure botanical wellness.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href="#skin-service-menu"
                className="global-button w-full sm:w-auto !py-3.5 !px-8 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer hover:scale-[1.02] transition-transform"
              >
                <span>View Menu &amp; Protocols ↓</span>
              </a>

              <button
                type="button"
                onClick={() => handleOpenConsultation()}
                className="global-button-secondary w-full sm:w-auto !py-3.5 !px-7 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer hover:border-[#263D2B] transition-colors"
              >
                <Compass className="w-4 h-4 text-[#263D2B]" />
                <span>Personalized Consultation</span>
              </button>
            </div>

          </div>

          {/* MAIN HERO IMAGE: COMPLETE FULL IMAGE, NO CROPPING, NO OVERLAYS */}
          <div className="mt-8 sm:mt-12 w-full max-w-6xl mx-auto">
            <div className="w-full bg-[#10110F] rounded-2xl sm:rounded-3xl border border-[#DCE1D8] shadow-2xl p-1.5 sm:p-2.5">
              <img
                src={facialHeroImg}
                alt="The Skin Atelier facial treatment sanctuary at GLAM GIRL BY JANKI"
                className="w-full h-auto block rounded-xl sm:rounded-2xl"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src = '/images/facial/the-skin-atelier-hero.jpg';
                }}
              />
            </div>

            {/* Clean Editorial Caption Below (NOT on top of image) */}
            <div className="mt-3.5 px-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs text-[#6B7068]">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-serif italic text-sm text-[#263D2B]">The Private Skincare Sanctuary</span>
                <span className="hidden sm:inline text-[#DCE1D8]">&bull;</span>
                <span>Holistic skin barrier restoration &amp; botanical pore care</span>
              </div>
              <div className="flex items-center gap-3 flex-wrap text-[11px] font-mono">
                <span className="text-[#263D2B] font-semibold">Founder &amp; Certified Director: Janki Khatroja</span>
                <span className="inline-flex items-center gap-1 text-[#263D2B] bg-[#263D2B]/10 px-2.5 py-0.5 rounded-full font-sans font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Clean Beauty Formulations
                </span>
              </div>
            </div>
          </div>

          {/* 4 Atelier Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mt-10 pt-4 border-t border-[#DCE1D8]/60">
            <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-center">
              <div className="text-base font-bold text-[#10110F]">12+ Yrs</div>
              <div className="text-[10px] text-[#6B7068] uppercase font-mono mt-0.5">Certified Director</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-center">
              <div className="text-base font-bold text-[#10110F]">1:1 Suite</div>
              <div className="text-[10px] text-[#6B7068] uppercase font-mono mt-0.5">Private Sanctuary</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-center">
              <div className="text-base font-bold text-[#10110F]">100% CAD</div>
              <div className="text-[10px] text-[#6B7068] uppercase font-mono mt-0.5">Transparent Pricing</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-center">
              <div className="text-base font-bold text-[#10110F]">Botanical</div>
              <div className="text-[10px] text-[#6B7068] uppercase font-mono mt-0.5">Clean Formulations</div>
            </div>
          </div>

          {/* Quick Anchor Jumps */}
          <div className="pt-8 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] overflow-x-auto max-w-full text-xs">
              <a href="#skin-service-menu" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors">
                1. Service Menu
              </a>
              <button
                type="button"
                onClick={() => handleOpenConsultation()}
                className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors cursor-pointer"
              >
                2. Skin Consultation
              </button>
              <a href="#director-spotlight" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors">
                3. About the Director
              </a>
              <a href="#skin-aftercare-guide" className="px-3.5 py-1.5 rounded-full hover:bg-white text-[#465640] font-semibold transition-colors">
                4. Aftercare &amp; Health
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SKIN SERVICE MENU (Approved Treatments) */}
      <SkinServiceMenu onOpenConsultation={handleOpenConsultation} />

      {/* 3. DIRECTOR SPOTLIGHT */}
      <section id="director-spotlight" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#DCE1D8] shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-4 flex justify-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-[#F7F4ED] shadow-xl relative">
              <img
                src={jankiPhoto}
                alt="Janki Khatroja"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-8 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[10px] font-bold uppercase tracking-wider text-[#263D2B]">
              <Award className="w-3.5 h-3.5" />
              <span>Certified Master Aesthetician</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F]">
              Your Skin Health in Trusted Hands: Janki Khatroja
            </h3>

            <p className="text-xs sm:text-sm text-[#465640] leading-relaxed font-light">
              &ldquo;Healthy skin is not about stripping your lipid barrier with harsh aggressive treatments. It is about understanding your unique skin barrier, supplying active botanical nourishment, and nurturing cell vitality. In my single-guest Ottawa suite, every client receives dedicated, unhurried care tailored to their skin preferences.&rdquo;
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-semibold text-[#10110F]">
              <span className="flex items-center gap-1.5 text-[#263D2B]">
                <Check className="w-4 h-4" />
                Certified Aesthetician
              </span>
              <span className="flex items-center gap-1.5 text-[#263D2B]">
                <Check className="w-4 h-4" />
                Private Ottawa Suite
              </span>
              <span className="flex items-center gap-1.5 text-[#263D2B]">
                <Check className="w-4 h-4" />
                Sunday Closed • Mon–Sat Hours
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. SALON-APPROVED SKIN AFTERCARE & FAQS */}
      <SkinAftercareGuide />

      {/* 5. BOTTOM BOOKING CTA BANNER */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#263D2B] text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#A8B5A0]">
              LIMITED PRIVATE SUITE APPOINTMENTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
              Ready for Radiant, Rejuvenated Skin?
            </h2>
            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              Appointments fill quickly throughout the week. Secure your private session with our certified Ottawa aesthetician.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
            <button
              type="button"
              onClick={() => handleOpenConsultation()}
              className="global-button !bg-white !text-[#10110F] hover:!bg-[#F7F4ED] !py-3.5 !px-8 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#263D2B]" />
              <span>Personalized Skin Consultation</span>
            </button>

            <Link
              to="/services"
              className="px-6 py-3.5 rounded-full border border-white/30 text-white hover:bg-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Explore All Salon Services</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Personalized Consultation Modal */}
      <SkinConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        initialService={consultationInitialService}
      />

    </div>
  );
}
