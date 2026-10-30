import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Maximize2, 
  X, 
  Check, 
  Clock, 
  Calendar, 
  ChevronRight, 
  Droplets,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { WAX_CATEGORIES } from './WaxConstants';

const WAX_FILTER_OPTIONS = [
  { id: 'all', label: 'All Waxing Categories' },
  { id: 'face', label: 'Facial Waxing' },
  { id: 'arms', label: 'Arms & Underarms' },
  { id: 'legs', label: 'Legs' },
  { id: 'body', label: 'Body & Torso' },
  { id: 'bikini', label: 'Bikini & Brazilian' }
];

export default function WaxGallerySection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  const filteredCategories = useMemo(() => {
    if (activeFilter === 'all') return WAX_CATEGORIES;
    return WAX_CATEGORIES.filter((cat) => cat.group === activeFilter);
  }, [activeFilter]);

  return (
    <section id="wax-gallery" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
          <Droplets className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            ATELIER WAXING CATEGORIES (11)
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          Waxing Inspiration Gallery
        </h2>

        <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
          Explore our specialized waxing categories, from precision facial hair contouring to comprehensive full-body velvet transformations. Learn optimal hair lengths, skin benefits, and natural growth intervals.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-12 no-scrollbar">
        {WAX_FILTER_OPTIONS.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#263D2B] text-white shadow-xs'
                  : 'bg-white text-[#465640] hover:text-[#10110F] hover:bg-[#F7F4ED] border border-[#DCE1D8]'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* 11 Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="group bg-white rounded-3xl border border-[#DCE1D8] overflow-hidden shadow-xs hover:shadow-md hover:border-[#263D2B]/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Card Image */}
              <div className="relative h-60 sm:h-64 overflow-hidden bg-[#10110F]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-3 py-1 rounded-full bg-[#10110F]/80 backdrop-blur-md text-[10px] font-medium text-white uppercase tracking-wider">
                    {category.recommendedInterval}
                  </span>
                </div>

                {/* Lightbox Trigger Button */}
                <button
                  type="button"
                  onClick={() => setLightboxImage(category.image)}
                  aria-label={`Preview full image of ${category.name}`}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-[#10110F] hover:bg-white flex items-center justify-center shadow-xs transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>

                {/* Bottom Overlay Info */}
                <div className="absolute inset-x-0 bottom-0 pt-16 pb-4 px-4 bg-gradient-to-t from-[#10110F]/90 via-[#10110F]/40 to-transparent text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#A8B5A0] block">
                    Ideal Hair Length: {category.idealLength}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-white">
                    {category.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-3.5">
                <div>
                  <h4 className="text-xs font-semibold text-[#263D2B]">
                    {category.subtitle}
                  </h4>
                  <p className="text-xs text-[#465640] line-clamp-3 leading-relaxed mt-1">
                    {category.description}
                  </p>
                </div>

                {/* Benefits */}
                <div className="pt-2 border-t border-[#DCE1D8]/60 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068]">
                    Treatment Highlights:
                  </span>
                  <ul className="space-y-1">
                    {category.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-[11px] text-[#465640]">
                        <Check className="w-3.5 h-3.5 text-[#263D2B] flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Card Action: View Category Details (Strictly Informational) */}
            <div className="p-5 sm:p-6 pt-0 mt-auto">
              <button
                type="button"
                onClick={() => setSelectedCategory(category)}
                className="w-full py-2.5 px-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] hover:bg-[#263D2B] text-[#10110F] hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-2 group/btn shadow-2xs"
              >
                <span>View Category Details</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#465640] group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedCategory && (
        <div
          className="fixed inset-0 z-50 bg-[#10110F]/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedCategory(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-[#DCE1D8] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-60 sm:h-72 bg-[#10110F] overflow-hidden rounded-t-3xl">
              <img
                src={selectedCategory.image}
                alt={selectedCategory.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-[#10110F] hover:bg-white flex items-center justify-center shadow-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="px-3 py-1 rounded-full bg-[#10110F]/85 backdrop-blur-md text-xs font-semibold text-white uppercase tracking-wider">
                  Every {selectedCategory.recommendedInterval}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#10110F]">
                  {selectedCategory.name}
                </h3>
                <p className="font-serif italic text-sm text-[#263D2B] mt-1">
                  "{selectedCategory.tagline}"
                </p>
                <p className="text-xs sm:text-sm text-[#465640] leading-relaxed mt-3">
                  {selectedCategory.description}
                </p>
              </div>

              {/* Inclusions / Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#10110F] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#263D2B]" />
                  <span>Key Benefits &amp; Skin Care Protocol</span>
                </h4>
                <div className="space-y-2">
                  {selectedCategory.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8]">
                      <Check className="w-4 h-4 text-[#263D2B] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-[#10110F] font-medium">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hair Length Spec */}
              <div className="p-4 rounded-2xl bg-white border border-[#DCE1D8] flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#263D2B] flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-[#10110F] block">
                    Ideal Hair Length: {selectedCategory.idealLength}
                  </span>
                  <p className="text-[11.5px] text-[#465640] leading-relaxed">
                    Ensure adequate hair length for clean follicle extraction. Refrain from shaving for at least 2 weeks prior.
                  </p>
                </div>
              </div>

              {/* Informational Notice */}
              <div className="pt-2 border-t border-[#DCE1D8] flex items-center justify-between">
                <span className="text-[11px] text-[#6B7068] italic">
                  Informational category overview.
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#10110F] text-white text-xs font-semibold hover:bg-[#263D2B] transition-colors"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-[#10110F]/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/40 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImage}
            alt="Enlarged waxing category view"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl border border-white/20 shadow-2xl"
          />
        </div>
      )}

    </section>
  );
}
