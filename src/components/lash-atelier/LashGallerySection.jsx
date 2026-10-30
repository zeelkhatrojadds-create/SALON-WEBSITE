import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Eye, 
  Maximize2, 
  X, 
  Check, 
  Info, 
  Layers, 
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { LASH_STYLES, LASH_STYLE_CATEGORIES } from './LashConstants';

export default function LashGallerySection({ onSelectStyleForDetail }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedStyleModal, setSelectedStyleModal] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  const filteredStyles = useMemo(() => {
    if (activeCategory === 'all') return LASH_STYLES;
    return LASH_STYLES.filter((style) => style.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="lash-styles-gallery" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
          <Eye className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            EXPLORE LASH SILHOUETTES
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          Explore Lash Styles &amp; Design Maps
        </h2>

        <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
          Discover a curated anthology of lash aesthetics, from understated 1:1 definition to dimensional wispy spikes and feline wings. Click any style to explore its optical characteristics and suitable eye geometry.
        </p>

        {/* Clear Distinction Notice */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-[11px] text-[#465640] max-w-xl text-left sm:text-center mt-2">
          <Info className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
          <span>
            <strong>Service Clarity:</strong> Some styles represent offered salon treatments, while others are creative design maps and inspiration silhouettes tailored during application.
          </span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
        <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-[#DCE1D8] shadow-xs">
          {LASH_STYLE_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = cat.id === 'all' 
              ? LASH_STYLES.length 
              : LASH_STYLES.filter(s => s.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#263D2B] text-white shadow-xs'
                    : 'text-[#465640] hover:text-[#10110F] hover:bg-[#F7F4ED]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`ml-1.5 text-[10px] ${isActive ? 'text-[#A8B5A0]' : 'text-[#6B7068]'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Gallery Cards Grid (12 Styles) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredStyles.map((style) => (
          <div
            key={style.id}
            className="group bg-white rounded-3xl border border-[#DCE1D8] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#263D2B]/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Image Container with Zoom & Badge Overlays */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#10110F]">
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Status Badge: Available Treatment vs Inspiration Look */}
                <div className="absolute top-3 left-3">
                  {style.isSalonService ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#263D2B]/95 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-xs border border-white/10">
                      <ShieldCheck className="w-3 h-3 text-[#A8B5A0]" />
                      <span>Offered Salon Service</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#10110F]/85 text-[#F7F4ED] text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-xs border border-white/15">
                      <Sparkles className="w-3 h-3 text-[#A8B5A0]" />
                      <span>Design Inspiration Map</span>
                    </span>
                  )}
                </div>

                {/* Lightbox Trigger Button */}
                <button
                  type="button"
                  onClick={() => setLightboxImage({ src: style.image, title: style.name, note: style.referenceNote })}
                  aria-label={`Preview full image for ${style.name}`}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-[#10110F] hover:bg-white hover:scale-110 transition-all shadow-md cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>

                {/* Subtitle Bar at bottom of image */}
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

                {/* Characteristics Bullets */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#10110F] block">
                    Visual Characteristics:
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

                {/* Suitable Look / Desired Effect */}
                <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1 text-[11px]">
                  <span className="font-bold text-[#263D2B] block uppercase tracking-wider text-[9.5px]">
                    Suitable Look &amp; Desired Effect:
                  </span>
                  <p className="text-[#465640] leading-snug line-clamp-2">
                    {style.suitableLook}
                  </p>
                </div>

              </div>
            </div>

            {/* Card Action Footer */}
            <div className="p-5 sm:p-6 pt-0 border-t border-[#DCE1D8]/60 flex items-center justify-between gap-3 mt-4">
              <button
                type="button"
                onClick={() => setSelectedStyleModal(style)}
                className="global-button-secondary w-full !py-2.5 !px-4 text-xs font-semibold text-center cursor-pointer hover:border-[#263D2B] transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View Style Details</span>
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
                {selectedStyleModal.isSalonService ? (
                  <span className="px-3 py-1 rounded-full bg-[#263D2B] text-white text-[10px] font-bold uppercase tracking-wider">
                    Offered Salon Service
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-[#10110F] text-[#F7F4ED] text-[10px] font-bold uppercase tracking-wider">
                    Design Inspiration Map
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

            {/* Image Banner */}
            <div className="relative rounded-2xl overflow-hidden border border-[#DCE1D8] aspect-[16/9] max-h-64 bg-[#10110F]">
              <img
                src={selectedStyleModal.image}
                alt={selectedStyleModal.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setLightboxImage({ src: selectedStyleModal.image, title: selectedStyleModal.name, note: selectedStyleModal.referenceNote })}
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1.5 hover:bg-black/90 cursor-pointer"
              >
                <Maximize2 className="w-3 h-3" />
                <span>Zoom Photo</span>
              </button>
            </div>

            {/* Full Description */}
            <p className="text-xs sm:text-sm text-[#465640] leading-relaxed">
              {selectedStyleModal.description}
            </p>

            {/* Key Characteristics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                Visual Style Characteristics:
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

            {/* Optical Recommendations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FBF9F4] border border-[#DCE1D8] text-xs">
              <div>
                <span className="font-bold text-[#10110F] block mb-0.5">Recommended Curl</span>
                <span className="text-[#263D2B] font-mono">{selectedStyleModal.recommendedCurl}</span>
              </div>
              <div>
                <span className="font-bold text-[#10110F] block mb-0.5">Typical Length</span>
                <span className="text-[#263D2B] font-mono">{selectedStyleModal.recommendedLength}</span>
              </div>
              <div>
                <span className="font-bold text-[#10110F] block mb-0.5">Fullness / Density</span>
                <span className="text-[#263D2B] font-mono">{selectedStyleModal.recommendedFullness}</span>
              </div>
            </div>

            {/* Suitable Look */}
            <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1 text-xs">
              <span className="font-bold text-[#10110F] block">Desired Optical Effect &amp; Eye Compatibility:</span>
              <p className="text-[#465640] leading-relaxed">
                {selectedStyleModal.suitableLook}
              </p>
            </div>

            {/* Associated Salon Treatment Note */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#DCE1D8] text-xs flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#6B7068] block">Corresponding Service:</span>
                <span className="font-serif text-[#10110F] font-semibold">{selectedStyleModal.offeredTreatmentName}</span>
              </div>
              <a
                href="#lash-service-menu"
                onClick={() => setSelectedStyleModal(null)}
                className="text-xs text-[#263D2B] font-bold underline hover:text-[#10110F] whitespace-nowrap cursor-pointer"
              >
                View in Menu ↓
              </a>
            </div>

            {/* Disclaimer */}
            <p className="text-[11px] text-[#6B7068] italic">
              {selectedStyleModal.referenceNote}
            </p>

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

      {/* Lightbox Image Preview Modal */}
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
                  High-Resolution Studio Reference
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
