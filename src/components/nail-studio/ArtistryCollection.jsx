// GLAM GIRL BY JANKI — The Artistry Collection Gallery
// Editorial-style magazine exhibition showcasing haute nail art, technique spotlights, and signature designs

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowUpRight, 
  Heart, 
  X, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Brush, 
  SlidersHorizontal, 
  Zap, 
  Calendar,
  Share2
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import { 
  ARTISTRY_CATEGORIES, 
  ARTIST_SPOTLIGHT_PIECE, 
  ARTISTRY_ARTWORKS 
} from '../../data/artistryCollectionData';

export default function ArtistryCollection({ onApplyPreset }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [copiedToast, setCopiedToast] = useState(false);

  // Filter artworks based on selected category
  const filteredArtworks = activeCategory === 'all'
    ? ARTISTRY_ARTWORKS
    : ARTISTRY_ARTWORKS.filter((art) => art.category === activeCategory);

  const toggleFavorite = (artId, e) => {
    if (e) e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [artId]: !prev[artId]
    }));
  };

  const handleApplyPreset = (preset, e) => {
    if (e) e.stopPropagation();
    if (onApplyPreset && preset) {
      onApplyPreset(preset);
      setSelectedArtwork(null);
    }
  };

  const handleShareArtwork = (art, e) => {
    if (e) e.stopPropagation();
    const shareText = `Explore "${art.title}" from The Artistry Collection at GLAM GIRL BY JANKI: ${window.location.origin}/nail-art#artistry-collection`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2400);
    }
  };

  return (
    <section 
      id="artistry-collection" 
      className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-20 sm:pt-28 scroll-mt-24"
    >
      {/* ========================================================================= */}
      {/* 1. SECTION HEADER (MAGAZINE EDITORIAL STYLE)                              */}
      {/* ========================================================================= */}
      <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
          <span>HAUTE COUTURE NAIL SALON EXHIBITION</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
          The Artistry Collection
        </h2>

        <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

        <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto italic">
          &ldquo;Where imagination meets precision, and every nail becomes a work of art.&rdquo;
        </p>

        {/* Category Filters Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {ARTISTRY_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#263D2B] text-white shadow-xs'
                    : 'bg-white text-[#465640] border border-[#DCE1D8] hover:text-[#10110F] hover:border-[#263D2B]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* ========================================================================= */}
      {/* 2. ARTIST'S SPOTLIGHT: FEATURED SIGNATURE MASTERPIECE                     */}
      {/* ========================================================================= */}
      <div className="mb-14">
        <div className="bg-[#10110F] text-[#F7F4ED] rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-[#263D2B]/80 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column (5 cols): Large Editorial Spotlight Photo */}
            <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl aspect-[4/5] bg-neutral-900 border border-[#263D2B] shadow-inner">
              <img
                src={ARTIST_SPOTLIGHT_PIECE.image}
                alt={ARTIST_SPOTLIGHT_PIECE.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = '/images/nails/3d/sculpted-flowers.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4 bg-[#263D2B] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-[#A8B5A0]/40 shadow-xs">
                ARTIST&apos;S SPOTLIGHT
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#A8B5A0] block">
                  {ARTIST_SPOTLIGHT_PIECE.collection}
                </span>
                <h3 className="font-serif text-2xl text-white font-normal">
                  {ARTIST_SPOTLIGHT_PIECE.title}
                </h3>
              </div>
            </div>

            {/* Right Column (7 cols): Creative Story & Interactive Actions */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2 border-b border-[#263D2B]/80 pb-4">
                <span className="text-[10.5px] font-mono tracking-widest text-[#A8B5A0] uppercase block">
                  FEATURED CURATION • SIGNATURE CREATION
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-tight">
                  {ARTIST_SPOTLIGHT_PIECE.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#A8B5A0] font-light italic">
                  {ARTIST_SPOTLIGHT_PIECE.subtitle}
                </p>
              </div>

              {/* Creative Story Quote */}
              <div className="p-5 rounded-2xl bg-[#18271B]/60 border border-[#263D2B] relative">
                <p className="text-xs sm:text-[13px] text-[#DCE1D8] font-serif italic leading-relaxed">
                  {ARTIST_SPOTLIGHT_PIECE.artistStory}
                </p>
              </div>

              {/* Spotlight Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#18271B]/40 border border-[#263D2B]/80 space-y-0.5">
                  <span className="text-[9.5px] uppercase font-bold tracking-wider text-[#A8B5A0] block">
                    RECOMMENDED SHAPES
                  </span>
                  <span className="text-white font-medium">
                    {ARTIST_SPOTLIGHT_PIECE.shapes}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#18271B]/40 border border-[#263D2B]/80 space-y-0.5">
                  <span className="text-[9.5px] uppercase font-bold tracking-wider text-[#A8B5A0] block">
                    PALETTE &amp; FINISH
                  </span>
                  <span className="text-white font-medium truncate block">
                    {ARTIST_SPOTLIGHT_PIECE.colors}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#18271B]/40 border border-[#263D2B]/80 space-y-0.5 col-span-2 sm:col-span-1">
                  <span className="text-[9.5px] uppercase font-bold tracking-wider text-[#A8B5A0] block">
                    TECHNIQUE
                  </span>
                  <span className="text-white font-medium truncate block">
                    4D Carving &amp; Chrome
                  </span>
                </div>
              </div>

              {/* Spotlight Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                
                <button
                  onClick={() => handleApplyPreset(ARTIST_SPOTLIGHT_PIECE.preset)}
                  className="global-button !px-6 !py-3 text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-[#A8B5A0]" />
                  <span>CUSTOMIZE THIS LOOK</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href="#behind-nail-design"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-[#263D2B] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-[#A8B5A0]" />
                  <span>VIEW CREATION STEPS</span>
                </a>

                <button
                  onClick={() => setSelectedArtwork(ARTIST_SPOTLIGHT_PIECE)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-transparent hover:bg-white/5 text-[#A8B5A0] hover:text-white border border-transparent text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>Explore Artwork Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. ASYMMETRIC EDITORIAL EXHIBITION MASONRY GRID                            */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {filteredArtworks.map((art, idx) => {
          const isFavorited = favorites[art.id];
          return (
            <div
              key={art.id}
              onClick={() => setSelectedArtwork(art)}
              className="group bg-white rounded-3xl border border-[#DCE1D8] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#263D2B] transition-all duration-500 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Frame with Aspect Variant */}
              <div className={`relative overflow-hidden bg-[#F7F4ED] ${
                art.aspect === 'tall' ? 'aspect-[4/5]' : art.aspect === 'wide' ? 'aspect-[16/11]' : 'aspect-square'
              }`}>
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/images/nails/nail-art-design.webp';
                  }}
                />
                
                {/* Gradient scrim for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Badge Tag */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-wider text-[#263D2B] border border-[#DCE1D8] shadow-xs">
                  {art.badge}
                </div>

                {/* Favorite Heart Button */}
                <button
                  type="button"
                  onClick={(e) => toggleFavorite(art.id, e)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all cursor-pointer shadow-xs ${
                    isFavorited
                      ? 'bg-[#263D2B] text-white border-[#263D2B]'
                      : 'bg-white/90 text-[#6B7068] hover:text-[#263D2B] border-[#DCE1D8]'
                  }`}
                  title="Save to favorites"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                </button>

                {/* Hover Reveal Details Tag */}
                <div className="absolute bottom-3 left-3 right-3 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#A8B5A0] block">
                    {art.categoryName}
                  </span>
                  <span className="text-xs font-semibold block truncate">
                    Click to view full exhibition card &amp; specs
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 sm:p-6 space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10.5px] text-[#465640] uppercase tracking-wider font-semibold">
                    <span>{art.categoryName}</span>
                    <span className="text-[#6B7068] font-normal">{art.shapes.split(',')[0]}</span>
                  </div>

                  <h4 className="font-serif text-lg sm:text-xl text-[#10110F] font-normal group-hover:text-[#263D2B] transition-colors leading-snug">
                    {art.title}
                  </h4>
                </div>

                <p className="text-xs sm:text-[12.5px] text-[#6B7068] leading-relaxed font-light line-clamp-2">
                  {art.shortDesc}
                </p>

                {/* Quick Action Footer */}
                <div className="pt-3 border-t border-[#DCE1D8]/70 flex items-center justify-between gap-2">
                  <button
                    onClick={(e) => handleApplyPreset(art.preset, e)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#263D2B] hover:text-[#18271B] cursor-pointer"
                  >
                    <span>Try This Design</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    to={`/book-appointment?service=${art.serviceId || 'nail-art-addon'}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs font-semibold text-[#6B7068] hover:text-[#10110F] underline cursor-pointer"
                  >
                    Book Look
                  </Link>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE DESIGN DETAIL MODAL (LIGHTBOX CARD)                        */}
      {/* ========================================================================= */}
      {selectedArtwork && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setSelectedArtwork(null)}
        >
          <div 
            className="bg-[#10110F] text-[#F7F4ED] rounded-3xl border border-[#263D2B] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedArtwork(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-[#263D2B] transition-colors cursor-pointer"
              title="Close details"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Hero Image */}
            <div className="relative aspect-[16/10] bg-neutral-900 overflow-hidden">
              <img
                src={selectedArtwork.image}
                alt={selectedArtwork.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10110F] via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#A8B5A0] block">
                  {selectedArtwork.categoryName}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                  {selectedArtwork.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Inspiration Story */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8B5A0] block">
                  ARTISTIC INSPIRATION &amp; CONCEPT
                </span>
                <p className="text-xs sm:text-sm text-[#DCE1D8] font-light leading-relaxed">
                  {selectedArtwork.inspiration}
                </p>
              </div>

              {/* Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                
                <div className="p-3 rounded-2xl bg-[#18271B]/50 border border-[#263D2B] space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#A8B5A0] block">
                    RECOMMENDED SHAPES
                  </span>
                  <span className="text-white font-medium">
                    {selectedArtwork.shapes}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-[#18271B]/50 border border-[#263D2B] space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#A8B5A0] block">
                    FINISH &amp; TEXTURE
                  </span>
                  <span className="text-white font-medium">
                    {selectedArtwork.finish}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-[#18271B]/50 border border-[#263D2B] space-y-1 sm:col-span-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#A8B5A0] block">
                    TECHNIQUES &amp; DECORATIVE DETAILS
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedArtwork.techniques?.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full bg-[#263D2B] text-[#F7F4ED] text-[10.5px] font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Action Bar */}
              <div className="pt-4 border-t border-[#263D2B]/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => toggleFavorite(selectedArtwork.id, e)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border text-xs font-bold tracking-wider transition-colors cursor-pointer ${
                      favorites[selectedArtwork.id]
                        ? 'bg-[#263D2B] text-white border-[#263D2B]'
                        : 'bg-white/5 text-[#A8B5A0] border-[#263D2B] hover:text-white'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>{favorites[selectedArtwork.id] ? 'Saved' : 'Save Favorite'}</span>
                  </button>

                  <button
                    onClick={(e) => handleShareArtwork(selectedArtwork, e)}
                    className="p-2.5 rounded-full bg-white/5 text-[#A8B5A0] hover:text-white border border-[#263D2B] transition-colors cursor-pointer"
                    title="Share artwork"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApplyPreset(selectedArtwork.preset)}
                    className="global-button !px-6 !py-2.5 text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>TRY THIS DESIGN</span>
                  </button>

                  <Link
                    to={`/book-appointment?service=${selectedArtwork.serviceId || 'nail-art-addon'}`}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-white text-[#10110F] text-xs font-bold uppercase tracking-wider hover:bg-[#F7F4ED] transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#263D2B]" />
                    <span>BOOK THIS LOOK</span>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Share Toast */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#10110F] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs border border-[#263D2B]">
          <CheckCircle2 className="w-4 h-4 text-[#A8B5A0]" />
          <span>Artwork link copied to clipboard!</span>
        </div>
      )}

    </section>
  );
}
