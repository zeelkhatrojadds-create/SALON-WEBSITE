import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Eye, 
  Maximize2, 
  X, 
  Check, 
  Info, 
  ChevronRight,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { 
  BROW_INSPIRATION_GALLERY, 
  BROW_GALLERY_FILTERS 
} from './BrowConstants';

export default function BrowGallerySection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedStyleModal, setSelectedStyleModal] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  const filteredStyles = useMemo(() => {
    if (activeFilter === 'all') return BROW_INSPIRATION_GALLERY;
    return BROW_INSPIRATION_GALLERY.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="brow-gallery" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
          <Eye className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            BROW ANTHOLOGY &amp; ARCHITECTURE
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          Brow Inspiration Gallery
        </h2>

        <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
          Explore our collection of 12 distinct brow silhouettes, from understated natural grooming and feathered wisps to crisp elevated arches and fluffy laminated textures.
        </p>

        {/* Informational Guidance Notice */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-[11px] text-[#465640] max-w-xl text-left sm:text-center mt-2">
          <Info className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
          <span>
            <strong>Inspiration Reference:</strong> Gallery styles demonstrate aesthetic brow silhouettes. Final arch height and thickness are individually tailored to your facial landmarks during your appointment.
          </span>
        </div>
      </div>

      {/* Working Filters */}
      <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
        <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-[#DCE1D8] shadow-xs">
          {BROW_GALLERY_FILTERS.map((tab) => {
            const isActive = activeFilter === tab.id;
            const count = tab.id === 'all' 
              ? BROW_INSPIRATION_GALLERY.length 
              : BROW_INSPIRATION_GALLERY.filter(item => item.category === tab.id).length;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#263D2B] text-white shadow-xs'
                    : 'text-[#465640] hover:text-[#10110F] hover:bg-[#F7F4ED]'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`ml-1.5 text-[10px] ${isActive ? 'text-[#A8B5A0]' : 'text-[#6B7068]'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Asymmetric Gallery Grid (12 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredStyles.map((style) => (
          <div
            key={style.id}
            className="group bg-white rounded-3xl border border-[#DCE1D8] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#263D2B]/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Image Preview with Zoom Action */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#10110F]">
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  {style.isServiceInCatalog ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#263D2B]/95 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-xs border border-white/10">
                      <ShieldCheck className="w-3 h-3 text-[#A8B5A0]" />
                      <span>Approved Salon Service</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#10110F]/85 text-[#F7F4ED] text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-xs border border-white/15">
                      <Sparkles className="w-3 h-3 text-[#A8B5A0]" />
                      <span>Design Inspiration</span>
                    </span>
                  )}
                </div>

                {/* Full-size Image Preview Trigger */}
                <button
                  type="button"
                  onClick={() => setLightboxImage({ src: style.image, title: style.name, note: style.inspirationNote })}
                  aria-label={`Preview full image for ${style.name}`}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-[#10110F] hover:bg-white hover:scale-110 transition-all shadow-md cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>

                {/* Subtitle Bar */}
                <div className="absolute bottom-3 inset-x-3 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#A8B5A0] block">
                    {style.subtitle}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-4">
                
                {/* Title and Tagline */}
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl text-[#10110F] group-hover:text-[#263D2B] transition-colors">
                    {style.name}
                  </h3>
                  <p className="text-xs text-[#263D2B] font-medium italic">
                    "{style.tagline}"
                  </p>
                  <p className="text-xs text-[#465640] line-clamp-2 leading-relaxed pt-1">
                    {style.description}
                  </p>
                </div>

                {/* Shape and Finish Characteristics */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#10110F] block">
                    Shape &amp; Finish Characteristics:
                  </span>
                  <ul className="space-y-1 text-xs text-[#465640]">
                    {style.characteristics.slice(0, 2).map((char, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#263D2B] flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suitable Look */}
                <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1 text-[11px]">
                  <span className="font-bold text-[#263D2B] block uppercase tracking-wider text-[9.5px]">
                    Ideal Compatibility:
                  </span>
                  <p className="text-[#465640] leading-snug line-clamp-2">
                    {style.suitableLook}
                  </p>
                </div>

              </div>
            </div>

            {/* View Style Action Footer */}
            <div className="p-5 sm:p-6 pt-0 border-t border-[#DCE1D8]/60 flex items-center justify-between gap-3 mt-4">
              <button
                type="button"
                onClick={() => setSelectedStyleModal(style)}
                className="global-button-secondary w-full !py-2.5 !px-4 text-xs font-semibold text-center cursor-pointer hover:border-[#263D2B] transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View Style Architecture</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Style Details Modal */}
      {selectedStyleModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedStyleModal(null)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedStyleModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-[#465640] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-8">
              <div className="flex items-center gap-2">
                {selectedStyleModal.isServiceInCatalog ? (
                  <span className="px-3 py-1 rounded-full bg-[#263D2B] text-white text-[10px] font-bold uppercase tracking-wider">
                    Offered Treatment
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-[#10110F] text-[#F7F4ED] text-[10px] font-bold uppercase tracking-wider">
                    Design Inspiration
                  </span>
                )}
                <span className="text-xs text-[#6B7068] font-mono">
                  Category: {selectedStyleModal.category.toUpperCase()}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F]">
                {selectedStyleModal.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#263D2B] italic">
                "{selectedStyleModal.tagline}"
              </p>
            </div>

            {/* Image Preview Banner */}
            <div className="relative rounded-2xl overflow-hidden border border-[#DCE1D8] aspect-[16/9] max-h-64 bg-[#10110F]">
              <img
                src={selectedStyleModal.image}
                alt={selectedStyleModal.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setLightboxImage({ src: selectedStyleModal.image, title: selectedStyleModal.name, note: selectedStyleModal.inspirationNote })}
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1.5 hover:bg-black/90 cursor-pointer"
              >
                <Maximize2 className="w-3 h-3" />
                <span>Zoom Photo</span>
              </button>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#465640] leading-relaxed">
              {selectedStyleModal.description}
            </p>

            {/* Characteristics Grid */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                Shape &amp; Finish Characteristics:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedStyleModal.characteristics.map((c, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs text-[#10110F]">
                    <Check className="w-3.5 h-3.5 text-[#263D2B] flex-shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ideal Compatibility */}
            <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1 text-xs">
              <span className="font-bold text-[#10110F] block">Ideal Compatibility:</span>
              <p className="text-[#465640] leading-relaxed">
                {selectedStyleModal.suitableLook}
              </p>
            </div>

            {/* Service cross-link if available */}
            {selectedStyleModal.offeredTreatmentName && (
              <div className="p-3.5 rounded-2xl bg-white border border-[#DCE1D8] text-xs flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#6B7068] block">Corresponding Approved Service:</span>
                  <span className="font-serif text-[#10110F] font-semibold">{selectedStyleModal.offeredTreatmentName}</span>
                </div>
                <a
                  href="#brow-services"
                  onClick={() => setSelectedStyleModal(null)}
                  className="text-xs text-[#263D2B] font-bold underline hover:text-[#10110F] whitespace-nowrap cursor-pointer"
                >
                  View in Menu ↓
                </a>
              </div>
            )}

            {/* Close action */}
            <div className="pt-2 border-t border-[#DCE1D8] flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedStyleModal(null)}
                className="global-button !py-2.5 !px-6 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Lightbox Preview Modal */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="max-w-4xl w-full bg-[#10110F] rounded-3xl overflow-hidden border border-white/20 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] sm:aspect-[16/9] w-full max-h-[75vh] bg-black">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-5 sm:p-6 bg-[#10110F] border-t border-white/10 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A8B5A0] block">
                  High-Resolution Studio Preview
                </span>
                <h4 className="font-serif text-xl sm:text-2xl text-white">
                  {lightboxImage.title}
                </h4>
                <p className="text-xs text-white/70 font-light mt-1">
                  {lightboxImage.note}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="px-5 py-2.5 rounded-full bg-white text-[#10110F] text-xs font-bold uppercase tracking-wider hover:bg-[#F7F4ED] cursor-pointer self-start sm:self-auto"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
