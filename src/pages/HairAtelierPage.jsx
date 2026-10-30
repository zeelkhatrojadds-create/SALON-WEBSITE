import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Award, 
  Check, 
  Compass 
} from 'lucide-react';
import HairHeroSection from '../components/hair-atelier/HairHeroSection';
import HairSignatureExperiences from '../components/hair-atelier/HairSignatureExperiences';
import HairInspirationBoard from '../components/hair-atelier/HairInspirationBoard';
import HairExperienceFinder from '../components/hair-atelier/HairExperienceFinder';
import HairServiceMenu from '../components/hair-atelier/HairServiceMenu';
import HairCareJournal from '../components/hair-atelier/HairCareJournal';
import HairConsultationModal from '../components/hair-atelier/HairConsultationModal';
import jankiPhoto from '../assets/janki-khatroja.webp';

export default function HairAtelierPage() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [consultationContext, setConsultationContext] = useState(null);

  // Persistent Saved Favourites Moodboard (Browser Session Storage)
  const [savedInspirations, setSavedInspirations] = useState(() => {
    try {
      const stored = localStorage.getItem('glam_hair_atelier_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    document.title = 'The Hair Atelier — GLAM GIRL BY JANKI | Ottawa Hair Studio';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleToggleSaveInspiration = (item) => {
    if (!item || !item.id) return;
    setSavedInspirations((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      let updated;
      if (exists) {
        updated = prev.filter((i) => i.id !== item.id);
      } else {
        updated = [...prev, item];
      }
      try {
        localStorage.setItem('glam_hair_atelier_favorites', JSON.stringify(updated));
      } catch (e) {
        console.warn('LocalStorage error', e);
      }
      return updated;
    });
  };

  const handleOpenConsultation = (context = null) => {
    setConsultationContext(context);
    setIsConsultationModalOpen(true);
  };

  const handleScrollToExperiences = () => {
    const el = document.getElementById('signature-experiences');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#F7F4ED] text-[#10110F] min-h-screen selection:bg-[#263D2B] selection:text-white font-sans antialiased">
      
      {/* 1. EDITORIAL HERO SECTION */}
      <HairHeroSection 
        onOpenConsultation={handleOpenConsultation}
        onExploreExperiences={handleScrollToExperiences}
      />

      {/* 2. SIGNATURE HAIR EXPERIENCES (5 Visually Distinct Studios) */}
      <HairSignatureExperiences
        onOpenConsultation={handleOpenConsultation}
        onSaveInspiration={handleToggleSaveInspiration}
        savedInspirations={savedInspirations}
      />

      {/* 3. INTERACTIVE HAIR INSPIRATION BOARD */}
      <HairInspirationBoard
        savedInspirations={savedInspirations}
        onToggleSave={handleToggleSaveInspiration}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* 4. FIND YOUR HAIR EXPERIENCE (Interactive 4-Step Questionnaire) */}
      <HairExperienceFinder
        onOpenConsultation={handleOpenConsultation}
      />

      {/* 5. REAL HAIR SERVICE MENU (Authentic 17 Services from salonDatabase) */}
      <HairServiceMenu 
        onOpenConsultation={handleOpenConsultation}
      />

      {/* 6. THE HAIR CARE JOURNAL (6 Editorial Guidance Chapters) */}
      <HairCareJournal />

      {/* 7. DIRECTOR SPOTLIGHT: JANKI KHATROJA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#DCE1D8] shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-4 flex justify-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-[#F7F4ED] shadow-xl relative">
              <img
                src={jankiPhoto}
                alt="Janki Khatroja — Master Stylist & Certified Aesthetic Director"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="md:col-span-8 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[10px] font-bold uppercase tracking-wider text-[#263D2B]">
              <Award className="w-3.5 h-3.5" />
              <span>Certified Master Stylist &amp; Aesthetic Director</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F]">
              Your Hair in Trusted Hands: Janki Khatroja
            </h3>

            <p className="text-xs sm:text-sm text-[#465640] leading-relaxed font-light">
              &ldquo;Hair is never just hair—it is your personal architecture, confidence, and living crown. In our Ottawa atelier, you are never passed off between assistants or rushed through back-to-back chairs. Every consultation, cut, balayage brush stroke, and Ayurvedic steam ritual is performed personally with unhurried devotion to strand health.&rdquo;
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-semibold text-[#10110F]">
              <span className="flex items-center gap-1.5 text-[#263D2B]">
                <Check className="w-4 h-4" />
                Single-Guest Ottawa Sanctuary
              </span>
              <span className="flex items-center gap-1.5 text-[#263D2B]">
                <Check className="w-4 h-4" />
                12+ Years Certified Experience
              </span>
              <span className="flex items-center gap-1.5 text-[#263D2B]">
                <Check className="w-4 h-4" />
                Olaplex &amp; Botanical Clean Formulas
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 8. BOTTOM APPOINTMENT RESERVATION BANNER */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#263D2B] text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#A8B5A0]">
              LIMITED SINGLE-GUEST SESSIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
              Ready for Your Signature Hair Experience?
            </h2>
            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              Appointments fill quickly across our Monday through Saturday calendar. Reserve your private session with certified master stylist Janki Khatroja.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
            <button
              type="button"
              onClick={() => handleOpenConsultation()}
              className="global-button !bg-white !text-[#10110F] hover:!bg-[#F7F4ED] !py-3.5 !px-8 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#263D2B]" />
              <span>Personalized Hair Consultation</span>
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

      {/* 9. PERSONALIZED HAIR CONSULTATION MODAL */}
      <HairConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        initialContext={consultationContext}
      />

    </div>
  );
}
