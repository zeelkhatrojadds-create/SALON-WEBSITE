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
    navigate(`/booking?service=${service.id}`);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#1C1418] text-white rounded-3xl shadow-2xl overflow-hidden border border-white/15 max-h-[90vh] flex flex-col animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white border border-white/10 shadow-lg transition-colors cursor-pointer"
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1418] via-black/40 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="inline-block bg-brand-pink text-white font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              {service.categoryName}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight drop-shadow-sm">
              {service.name}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-white/5 rounded-2xl text-center border border-white/10">
            <div className="flex flex-col items-center justify-center">
              <span className="text-xs text-white/50">Price</span>
              <span className="font-serif font-bold text-lg text-brand-pink-muted">
                ${service.price}{service.priceFrom ? '*' : ''} CAD
              </span>
            </div>
            <div className="flex flex-col items-center justify-center border-x border-white/10">
              <span className="text-xs text-white/50">Duration</span>
              <span className="font-medium text-sm text-white flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-brand-pink" />
                {service.duration}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-xs text-white/50">Rating</span>
              <span className="font-medium text-sm text-white flex items-center gap-1 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {service.rating} ({service.reviewsCount})
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-serif font-semibold text-base text-white mb-2">Treatment Overview</h3>
            <p className="text-[#F2ECE4]/80 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Key Features & Ritual Steps */}
          <div>
            <h3 className="font-serif font-semibold text-base text-white mb-3">What's Included in This Experience</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/90 bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <CheckCircle className="w-4 h-4 text-brand-pink flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Salon Safety & Clean Guarantee */}
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
            <Shield className="w-6 h-6 text-brand-pink flex-shrink-0" />
            <div className="text-xs text-white/70 leading-relaxed">
              <strong className="text-white font-semibold">100% Sanitized & Cruelty-Free:</strong> We sterilize all instruments with medical-grade autoclaves and use only clean, non-toxic luxury salon formulas.
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-5 border-t border-white/10 bg-[#160E12] flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-white/50">Total Investment</div>
            <div className="font-serif font-bold text-xl sm:text-2xl text-brand-pink-muted">
              ${service.price}{service.priceFrom ? '*' : ''} <span className="text-xs font-sans text-white/50 font-normal">CAD (taxes incl.)</span>
            </div>
            {service.priceFrom && (
              <div className="text-[10px] text-amber-400/90 italic -mt-0.5">* Price starts from mentioned value</div>
            )}
          </div>

          <button
            onClick={handleBookService}
            className="py-3 px-6 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white font-semibold text-sm flex items-center gap-2 shadow-xl shadow-brand-pink/30 hover:scale-105 active:scale-95 transition-all cursor-pointer uppercase tracking-wider"
          >
            <Calendar className="w-4 h-4" />
            <span>Book This Service</span>
          </button>
        </div>
      </div>
    </div>
  );
}
