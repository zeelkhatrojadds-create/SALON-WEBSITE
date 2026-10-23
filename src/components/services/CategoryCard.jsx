import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

export default function CategoryCard({ category, serviceCount }) {
  const navigate = useNavigate();

  if (!category) return null;

  const targetUrl = `/services/${category.slug}`;

  const handleCardClick = () => {
    navigate(targetUrl);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <ScrollReveal className="w-full h-full flex flex-col">
      <div
        onClick={handleCardClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`Explore ${category.name} services — ${serviceCount} services available`}
        className="group relative flex flex-col bg-white rounded-3xl border border-[#DCE1D8] hover:border-[#263D2B] overflow-hidden transition-all duration-500 shadow-sm hover:shadow-xl w-full h-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B] focus-visible:ring-offset-2 select-none"
      >
        {/* Top Image Frame with Smooth Hover Zoom */}
        <div className="relative aspect-[16/11] overflow-hidden bg-neutral-900">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = '/images/threading/sitara-full-face-threading.jpg';
            }}
          />

          {/* Subtle Contrast Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

          {/* Top-Left Category Badge */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] border border-[#DCE1D8] shadow-xs flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>{category.badge || 'ATELIER CATEGORY'}</span>
          </div>

          {/* Top-Right Service Count Pill */}
          {typeof serviceCount === 'number' && (
            <div className="absolute top-4 right-4 bg-[#10110F]/85 backdrop-blur-md px-3 py-1 rounded-full text-[10.5px] font-semibold text-white shadow-xs border border-white/10">
              {serviceCount} {serviceCount === 1 ? 'Treatment' : 'Treatments'}
            </div>
          )}

          {/* Bottom Title on Image */}
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A8B5A0] block">
              {category.subtitle}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1 group-hover:text-[#F7F4ED] transition-colors leading-tight">
              {category.name}
            </h3>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
          <p className="font-sans text-xs sm:text-[13.5px] text-[#465640] leading-relaxed font-light">
            {category.description}
          </p>

          {/* Bottom Action Row */}
          <div className="pt-4 border-t border-[#DCE1D8]/80 flex items-center justify-between gap-3 mt-auto">
            {/* View Services Button Required */}
            <Link
              to={targetUrl}
              onClick={(e) => {
                e.stopPropagation();
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="global-button !px-6 !py-3 text-white text-xs font-bold uppercase tracking-wider shadow-xs flex items-center gap-2 group-hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <span>View Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <span className="text-xs font-semibold text-[#6B7068] group-hover:text-[#263D2B] transition-colors flex items-center gap-1">
              <span>Explore</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </div>
        </div>

      </div>
    </ScrollReveal>
  );
}
