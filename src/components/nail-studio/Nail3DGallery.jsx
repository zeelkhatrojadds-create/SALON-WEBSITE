import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Eye, 
  Wand2, 
  Calendar, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Info,
  Clock,
  Layers,
  HeartHandshake
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import { NAIL_3D_GALLERY } from '../../data/nail3dGalleryData';

export default function Nail3DGallery({ onApplyPreset }) {
  const [activeModalDesign, setActiveModalDesign] = useState(null);
  const closeButtonRef = useRef(null);

  // Keyboard accessibility (Escape key to dismiss) & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeModalDesign) {
        setActiveModalDesign(null);
      }
    };

    if (activeModalDesign) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalDesign]);

  const handleTryDesign = (preset) => {
    if (activeModalDesign) {
      setActiveModalDesign(null);
    }
    if (onApplyPreset) {
      onApplyPreset(preset);
    }
  };

  return (
    <section 
      id="3d-nail-art-gallery" 
      aria-label="3D Nail Art Gallery"
      className="w-full bg-[#FAF7F2] border-t border-[#DCE1D8] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 shadow-2xs scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER                                                         */}
        {/* ========================================================================= */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>STEP 04 · HAUTE DIMENSIONAL ATELIER</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
            3D Nail Art Gallery
          </h2>

          <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto">
            “Art beyond the ordinary — discover sculpted details, dimensional textures, and statement nail designs.”
          </p>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 2. GALLERY CARDS (10 SIGNATURE 3D DESIGNS)                                */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
          {NAIL_3D_GALLERY.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-[#DCE1D8] overflow-hidden shadow-2xs hover:shadow-md hover:border-[#263D2B] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Image Preview */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F7F4ED]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* 3D Couture Badge */}
                  <div className="absolute top-3 left-3 bg-[#263D2B] text-white px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-2xs">
                    3D SCULPTED
                  </div>

                  {/* Style Category Badge */}
                  <div className="absolute bottom-2.5 left-3 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider text-[#263D2B] border border-[#DCE1D8]">
                    {item.category}
                  </div>

                  {/* Quick View Button */}
                  <button
                    type="button"
                    onClick={() => setActiveModalDesign(item)}
                    aria-label={`Explore ${item.name} details`}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md border border-[#DCE1D8] flex items-center justify-center text-[#263D2B] opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#263D2B] hover:text-white cursor-pointer shadow-xs"
                    title="Explore design"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-2.5">
                  <div className="space-y-0.5">
                    <h3 className="font-serif text-lg font-normal text-[#10110F] group-hover:text-[#263D2B] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-[11px] font-medium text-[#465640] uppercase tracking-wider line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-[#6B7068] leading-relaxed font-light line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Explore Design & Try This Design */}
              <div className="p-5 pt-0 border-t border-[#DCE1D8]/60 mt-3 space-y-2">
                <button
                  type="button"
                  onClick={() => setActiveModalDesign(item)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#F7F4ED] hover:bg-[#263D2B] text-[#10110F] hover:text-white border border-[#DCE1D8] hover:border-[#263D2B] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-2xs group/btn"
                >
                  <Eye className="w-3.5 h-3.5 text-[#263D2B] group-hover/btn:text-white transition-colors" />
                  <span>Explore Design</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTryDesign(item.preset)}
                  className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-[#F7F4ED] text-[#263D2B] border border-[#263D2B]/30 hover:border-[#263D2B] text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-2xs"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Try In Studio</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE DESIGN DETAILS MODAL                                       */}
        {/* ========================================================================= */}
        {activeModalDesign && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#10110F]/80 backdrop-blur-xs animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-3d-design-title"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setActiveModalDesign(null);
              }
            }}
          >
            <div
              className="bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto relative animate-in zoom-in-95 duration-200"
            >
              {/* Close Button Top Right */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setActiveModalDesign(null)}
                aria-label="Close 3D design modal"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/95 border border-[#DCE1D8] text-[#10110F] hover:bg-[#263D2B] hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Large Close-Up Image */}
                <div className="md:col-span-5 relative aspect-square md:aspect-auto md:min-h-[460px] bg-[#F7F4ED] overflow-hidden rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl">
                  <img
                    src={activeModalDesign.image}
                    alt={activeModalDesign.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#263D2B] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    {activeModalDesign.category}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-[#DCE1D8] text-[11px] text-[#465640] shadow-sm">
                    <span className="font-bold text-[#10110F] block">Atelier Technique:</span>
                    <span>{activeModalDesign.sculptingTechnique}</span>
                  </div>
                </div>

                {/* Detail Content & Specifications */}
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-5">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#263D2B] block">
                        BESPOKE 3D COUTURE DESIGN
                      </span>
                      <h3
                        id="modal-3d-design-title"
                        className="font-serif text-2xl sm:text-3xl font-normal text-[#10110F] leading-tight"
                      >
                        {activeModalDesign.name}
                      </h3>
                      <p className="text-xs font-medium text-[#465640] uppercase tracking-wider">
                        {activeModalDesign.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed font-light">
                      {activeModalDesign.description}
                    </p>

                    {/* Specifications Matrix */}
                    <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-3 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#465640] block">
                          Suggested Nail Shapes:
                        </span>
                        <span className="font-semibold text-[#10110F]">
                          {activeModalDesign.suggestedShapes}
                        </span>
                      </div>

                      <div className="border-t border-[#DCE1D8]/60 pt-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#465640] block">
                          Recommended Colors &amp; Finishes:
                        </span>
                        <span className="font-semibold text-[#10110F]">
                          {activeModalDesign.suggestedColors} · {activeModalDesign.suggestedFinish}
                        </span>
                      </div>

                      <div className="border-t border-[#DCE1D8]/60 pt-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#263D2B] flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B]" />
                          Maintenance &amp; Aftercare Tips:
                        </span>
                        <p className="text-[11.5px] text-[#6B7068] leading-relaxed pt-0.5">
                          {activeModalDesign.aftercareTips}
                        </p>
                      </div>
                    </div>

                    {/* Service & Rate Linkage */}
                    <div className="p-3.5 rounded-xl bg-white border border-[#DCE1D8] flex items-center justify-between text-xs">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">
                          RECOMMENDED ATELIER SERVICE
                        </span>
                        <span className="font-serif text-sm font-normal text-[#10110F]">
                          {activeModalDesign.serviceName}
                        </span>
                        <span className="text-[10px] text-[#465640] block">
                          Duration: {activeModalDesign.serviceDuration}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-serif text-xl font-normal text-[#10110F]">
                          ${activeModalDesign.servicePrice}
                        </span>
                        <span className="text-[10px] text-[#6B7068] block font-sans">CAD</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="space-y-2 pt-2 border-t border-[#DCE1D8]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleTryDesign(activeModalDesign.preset)}
                        className="w-full py-3 px-4 rounded-full bg-[#263D2B] hover:bg-[#18271B] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                      >
                        <Wand2 className="w-3.5 h-3.5" />
                        <span>Try This Design</span>
                      </button>

                      <Link
                        to={`/book-appointment?service=${activeModalDesign.serviceId}`}
                        onClick={() => setActiveModalDesign(null)}
                        className="w-full py-3 px-4 rounded-full bg-white hover:bg-[#F7F4ED] text-[#10110F] border border-[#263D2B] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#263D2B]" />
                        <span>Book Appointment</span>
                      </Link>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveModalDesign(null)}
                      className="w-full py-2 text-center text-xs text-[#6B7068] hover:text-[#10110F] font-medium transition-colors cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
