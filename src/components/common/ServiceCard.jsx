import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SafeServiceImage from './SafeServiceImage';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

export default function ServiceCard({ service, onQuickBook, onViewDetails }) {
  const navigate = useNavigate();

  if (!service) return null;

  const categorySlug = service.category || 'threading';
  const treatmentSlug = service.slug || service.id;
  const detailUrl = `/services/${categorySlug}/${treatmentSlug}`;
  const bookingUrl = `/book-appointment?service=${treatmentSlug}`;

  const categoryLabel = (service.categoryName || service.category || 'HAIR CARE').toUpperCase();
  
  // Format price exact to reference screenshot: CAD $120.00
  const numericPrice = Number(service.price) || 0;
  const formattedPrice = `CAD $${numericPrice.toFixed(2)}`;

  const handleBook = (e) => {
    e.stopPropagation();
    if (onQuickBook) {
      onQuickBook(service);
    } else {
      navigate(bookingUrl);
    }
  };

  return (
    <ScrollReveal className="w-full">
      <div 
        className="group relative flex flex-col bg-white rounded-2xl border border-[#E8DFD3] hover:border-[#1E1714] overflow-hidden transition-all duration-300 shadow-xs hover:shadow-xl hover:shadow-black/5 w-full text-left"
      >
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F5F0E8]">
        <SafeServiceImage
          service={service}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top-Left Pill Badge: Category */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#1E1714] text-[10.5px] font-bold uppercase tracking-wider shadow-sm border border-[#E8DFD3]">
          {categoryLabel}
        </div>

        {/* Top-Right Pill Badge: Duration */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#140F11]/85 backdrop-blur-md text-white text-[10.5px] font-medium shadow-sm">
          {String(service.duration || '30 MIN').endsWith('MIN') || String(service.duration || '30 MIN').endsWith('min') ? service.duration : `${service.duration} MIN`}
        </div>
      </div>

      {/* Card Body Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Eyebrow & Price Header Row */}
          <div className="flex items-baseline justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#D4A373]">
              {categoryLabel}
            </span>
            <span className="font-serif text-base sm:text-lg font-normal text-[#1E1714] whitespace-nowrap">
              {formattedPrice}
            </span>
          </div>

          {/* Service Title */}
          <h3 className="font-serif text-lg sm:text-[20px] font-bold text-[#1E1714] leading-snug group-hover:text-[#CFA46A] transition-colors mb-2">
            <Link to={detailUrl}>
              {service.name}
            </Link>
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-[13px] text-[#6B5E55] line-clamp-2 leading-relaxed mb-6 font-normal">
            {service.description}
          </p>
        </div>

        {/* Card Footer Buttons Row */}
        <div className="flex items-center justify-between gap-2 pt-4 border-t border-[#F2ECE4] mt-auto">
          {/* Left: MORE DETAILS -> */}
          <Link
            to={detailUrl}
            onClick={(e) => {
              if (onViewDetails) {
                e.preventDefault();
                onViewDetails(service);
              }
            }}
            className="text-[11px] font-bold uppercase tracking-wider text-[#1E1714] hover:text-[#CFA46A] transition-colors inline-flex items-center gap-1 group/btn py-2 px-1"
          >
            <span>MORE DETAILS</span>
            <span className="text-xs group-hover/btn:translate-x-1 transition-transform">→</span>
          </Link>

          {/* Right: BOOK APPOINTMENT -> */}
          <button
            type="button"
            onClick={handleBook}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#0F0D0E] hover:bg-[#CFA46A] text-white hover:text-[#0F0D0E] text-[11px] font-bold uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer"
          >
            <span>BOOK APPOINTMENT</span>
            <span className="text-xs">→</span>
          </button>
        </div>
      </div>
    </div>
  </ScrollReveal>
);
}
