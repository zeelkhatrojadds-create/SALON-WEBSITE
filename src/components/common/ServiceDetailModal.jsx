import React, { useEffect } from 'react';
import { X, Calendar, Clock, Star, CheckCircle, Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import SafeServiceImage from './SafeServiceImage';

export default function ServiceDetailModal({ service, isOpen, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !service) return null;

  const handleBookService = () => {
    onClose();
    navigate(`/book-appointment?service=${service.id}`);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white text-[#10110F] rounded-3xl shadow-2xl overflow-hidden border border-[#DCE1D8] max-h-[90vh] flex flex-col animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#10110F]/70 hover:bg-[#10110F] text-white border border-white/20 shadow-lg transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Hero Image */}
        <div className="relative h-60 sm:h-72 w-full flex-shrink-0">
          <SafeServiceImage
            service={service}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10110F]/80 via-[#10110F]/20 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="inline-block bg-[#263D2B] text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-2 shadow-sm">
              {service.categoryName}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight drop-shadow-sm">
              {service.name}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-[#F7F4ED] rounded-2xl text-center border border-[#DCE1D8]">
            <div className="flex flex-col items-center justify-center">
              <span className="text-xs text-[#6B7068]">Price</span>
              <span className="font-serif font-bold text-lg text-[#10110F]">
                ${service.price}{service.priceFrom ? '*' : ''} CAD
              </span>
            </div>
            <div className="flex flex-col items-center justify-center border-x border-[#DCE1D8]">
              <span className="text-xs text-[#6B7068]">Duration</span>
              <span className="font-medium text-sm text-[#10110F] flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                {service.duration}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-xs text-[#6B7068]">Rating</span>
              <span className="font-medium text-sm text-[#10110F] flex items-center gap-1 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-[#263D2B] text-[#263D2B]" />
                {service.rating} ({service.reviewsCount})
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-serif font-normal text-base text-[#10110F] mb-2">Treatment Overview</h3>
            <p className="text-[#6B7068] text-sm leading-relaxed font-light font-sans">
              {service.description}
            </p>
          </div>

          {/* Key Features & Ritual Steps */}
          <div>
            <h3 className="font-serif font-normal text-base text-[#10110F] mb-3">What's Included in This Experience</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.features?.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#10110F] bg-[#F7F4ED] p-2.5 rounded-xl border border-[#DCE1D8]">
                  <CheckCircle className="w-4 h-4 text-[#263D2B] flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Salon Safety & Clean Guarantee */}
          <div className="p-4 bg-[#F7F4ED] rounded-2xl border border-[#DCE1D8] flex items-center gap-3">
            <Shield className="w-6 h-6 text-[#263D2B] flex-shrink-0" />
            <div className="text-xs text-[#6B7068] leading-relaxed font-sans">
              <strong className="text-[#10110F] font-semibold">100% Sanitized & Cruelty-Free:</strong> We sterilize all instruments with medical-grade autoclaves and use only clean, non-toxic luxury salon formulas.
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-5 border-t border-[#DCE1D8] bg-[#F7F4ED] flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#6B7068]">Total Investment</div>
            <div className="font-serif font-bold text-xl sm:text-2xl text-[#10110F]">
              ${service.price}{service.priceFrom ? '*' : ''} <span className="text-xs font-sans text-[#6B7068] font-normal">CAD (taxes incl.)</span>
            </div>
            {service.priceFrom && (
              <div className="text-[10px] text-[#263D2B] italic -mt-0.5">* Price starts from mentioned value</div>
            )}
          </div>

          <button
            onClick={handleBookService}
            className="global-button !py-3 !px-6 text-white font-bold text-sm flex items-center gap-2 shadow-sm cursor-pointer uppercase tracking-wider"
          >
            <Calendar className="w-4 h-4" />
            <span>Book This Service</span>
          </button>
        </div>
      </div>
    </div>
  );
}
