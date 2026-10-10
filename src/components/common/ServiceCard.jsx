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
  
  // Format price: CAD $120.00
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
        className="group relative flex flex-col bg-white rounded-xl border border-[#DCE1D8] hover:border-[#263D2B]/50 overflow-hidden transition-all duration-300 shadow-2xs hover:shadow-md w-full text-left"
      >
        {/* Top Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#F7F4ED]">
          <SafeServiceImage
            service={service}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Top-Left Pill Badge: Category */}
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#F7F4ED]/95 backdrop-blur-md text-[#10110F] text-[10px] font-bold uppercase tracking-wider shadow-xs border border-[#DCE1D8]">
            {categoryLabel}
          </div>

          {/* Top-Right Pill Badge: Duration */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#10110F]/85 backdrop-blur-md text-white text-[10px] font-medium shadow-xs">
            {String(service.duration || '30 MIN').toUpperCase().includes('MIN') ? service.duration : `${service.duration} MIN`}
          </div>
        </div>

        {/* Card Body Content */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Eyebrow & Price Header Row */}
            <div className="flex items-baseline justify-between gap-2 mb-2">
              <span className="text-[10.5px] font-bold tracking-[0.18em] uppercase text-[#263D2B]">
                {categoryLabel}
              </span>
              <span className="font-serif text-base sm:text-lg font-normal text-[#10110F] whitespace-nowrap">
                {formattedPrice}
              </span>
            </div>

            {/* Service Title */}
            <h3 className="font-serif text-lg sm:text-[20px] font-normal text-[#10110F] leading-snug group-hover:text-[#263D2B] transition-colors mb-2">
              <Link to={detailUrl}>
                {service.name}
              </Link>
            </h3>

            {/* Description */}
            <p className="font-sans text-xs sm:text-[13px] text-[#6B7068] line-clamp-2 leading-relaxed mb-6">
              {service.description}
            </p>
          </div>

          {/* Card Footer Buttons Row */}
          <div className="flex items-center justify-between gap-2 pt-4 border-t border-[#DCE1D8] mt-auto">
            {/* Left: MORE DETAILS -> */}
            <Link
              to={detailUrl}
              onClick={(e) => {
                if (onViewDetails) {
                  e.preventDefault();
                  onViewDetails(service);
                }
              }}
              className="global-button-secondary btn-luxury-arrow !px-3.5 !py-1.5 !text-[10.5px]"
            >
              <span>DETAILS</span>
              <span className="arrow-symbol text-xs">→</span>
            </Link>

            {/* Right: BOOK APPOINTMENT */}
            <button
              type="button"
              onClick={handleBook}
              className="global-button !px-4 !py-2 !text-[11px]"
            >
              <span>BOOK NOW</span>
              <span className="text-xs ml-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
