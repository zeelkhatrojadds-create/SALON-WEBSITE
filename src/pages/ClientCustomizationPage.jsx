import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles, Shield, HeartHandshake, Calendar, Compass } from 'lucide-react';
import ClientCustomizationStudio from '../components/customization/ClientCustomizationStudio';
import BeautyMatchFinder from '../components/customization/BeautyMatchFinder';
import BeautyVisionBoard from '../components/customization/BeautyVisionBoard';
import { formatBeautyMatchSummaryNotes } from '../data/beautyMatchFinderData';
import { ALL_SERVICES } from '../data/servicesData';

export default function ClientCustomizationPage() {
  const [presetService, setPresetService] = useState(null);
  const [presetCategory, setPresetCategory] = useState(null);
  const [presetNotes, setPresetNotes] = useState('');
  const [presetPhotos, setPresetPhotos] = useState([]);

  // Update document title and meta description for SEO
  useEffect(() => {
    document.title = 'The Beauty Match Finder & Vision Board Custom Studio | GLAM GIRL BY JANKI';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Find your perfect salon match, curate your personal beauty vision board moodboard, and personalize your appointment in our luxury Custom Studio at GLAM GIRL BY JANKI.'
      );
    }
  }, []);

  // Seamlessly transition match recommendation into studio customization
  const handleCustomizeFromMatch = (service, answers) => {
    setPresetService(service);
    setPresetCategory(service.studioCategoryId || null);
    const notes = formatBeautyMatchSummaryNotes(service, answers);
    setPresetNotes(notes);

    // Smooth scroll down to the studio workspace
    const studioEl = document.getElementById('custom-studio-workspace');
    if (studioEl) {
      studioEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Seamlessly transition collected vision board moodboard into studio workspace
  const handleTransferFromVisionBoard = ({ serviceId, visionNotes, photos }) => {
    if (serviceId) {
      const match = ALL_SERVICES.find(s => s.id === serviceId);
      if (match) {
        setPresetService(match);
        setPresetCategory(match.category);
      }
    }
    if (visionNotes) {
      setPresetNotes(visionNotes);
    }
    if (photos && photos.length > 0) {
      setPresetPhotos(photos);
    }

    // Smooth scroll down to the studio workspace
    const studioEl = document.getElementById('custom-studio-workspace');
    if (studioEl) {
      studioEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F4ED] text-[#10110F]">
      {/* Breadcrumb Navigation Strip */}
      <div className="pt-24 sm:pt-28 pb-4 border-b border-[#DCE1D8] bg-[#F7F4ED]/80 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-[#6B7068]">
            <Link to="/" className="hover:text-[#263D2B] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#A8B5A0]" />
            <Link to="/services" className="hover:text-[#263D2B] transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#A8B5A0]" />
            <span className="font-semibold text-[#10110F]">
              Custom Studio, Vision Board & Beauty Match
            </span>
          </nav>
        </div>
      </div>

      {/* Editorial Hero Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 pb-12 sm:pb-16 text-center border-b border-[#DCE1D8]">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#263D2B]">
              BESPOKE BEAUTY STUDIO
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#10110F] font-normal tracking-tight leading-[1.15]">
            The Custom Beauty Studio
          </h1>

          <p className="font-serif text-lg sm:text-2xl text-[#263D2B] italic font-light">
            Personalized Beauty Combinations &amp; Custom Vision Requests
          </p>

          <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed font-light">
            Craft your signature experience with certified aesthetic director Janki Khatroja. Harmonize your custom skincare focuses, hair rituals, or bridal visions, and connect directly to our real-time master booking calendar.
          </p>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#custom-studio-workspace"
              className="global-button !py-3.5 !px-8 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer hover:scale-[1.02] transition-transform"
            >
              <Compass className="w-4 h-4 text-white" />
              <span>Open Custom Workspace ↓</span>
            </a>

            <Link
              to="/services"
              className="global-button-secondary !py-3.5 !px-6 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer hover:border-[#263D2B] transition-colors"
            >
              <span>Explore All Catalog Services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 1. The Beauty Match Finder Interactive Section */}
      <BeautyMatchFinder onCustomizeService={handleCustomizeFromMatch} />

      {/* 2. The Beauty Vision Board Interactive Moodboard Section */}
      <BeautyVisionBoard onTransferToStudio={handleTransferFromVisionBoard} />

      {/* 3. Main Interactive Customization Studio Component */}
      <ClientCustomizationStudio 
        isEmbedded={false} 
        presetService={presetService}
        presetCategory={presetCategory}
        presetNotes={presetNotes}
        presetPhotos={presetPhotos}
      />

      {/* Atelier Trust & Bespoke Promise Strip */}
      <section className="border-t border-[#DCE1D8] bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-[#263D2B]/5 text-[#263D2B] shrink-0 mx-auto sm:mx-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-sm text-[#10110F]">
                  1-on-1 Artist Consultation
                </h4>
                <p className="text-xs text-[#6B7068] leading-relaxed">
                  Every custom specification is evaluated personally by founder Janki Khatroja before appointment confirmation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-[#263D2B]/5 text-[#263D2B] shrink-0 mx-auto sm:mx-0">
                <Shield className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-sm text-[#10110F]">
                  Zero Hidden Surprises
                </h4>
                <p className="text-xs text-[#6B7068] leading-relaxed">
                  Base prices are approved and fixed. Any bespoke additions are clearly quoted and confirmed prior to starting your service.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-[#263D2B]/5 text-[#263D2B] shrink-0 mx-auto sm:mx-0">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-sm text-[#10110F]">
                  Organic & Ethical Ingredients
                </h4>
                <p className="text-xs text-[#6B7068] leading-relaxed">
                  100% natural organic Rajasthani henna, colophony-free Italian waxes, and cruelty-free professional botanicals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Booking CTA Banner */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#263D2B] text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#A8B5A0]">
              BESPOKE BEAUTY SANCTUARY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
              Ready for Your Tailored Beauty Experience?
            </h2>
            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              Reserve your unhurried single-guest session in our private Ottawa suite. Your custom vision notes are reviewed personally by Janki Khatroja.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
            <a
              href="#custom-studio-workspace"
              className="global-button !bg-white !text-[#10110F] hover:!bg-[#F7F4ED] !py-3.5 !px-8 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#263D2B]" />
              <span>Personalize in Custom Studio</span>
            </a>

            <Link
              to="/services"
              className="px-6 py-3.5 rounded-full border border-white/30 text-white hover:bg-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Explore All Treatment Offerings</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
