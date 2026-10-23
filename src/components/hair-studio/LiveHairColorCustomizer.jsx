// GLAM GIRL BY JANKI — Live Hair Colour Customizer
// Instant hair preview engine with photorealistic variant switching,
// alpha-mask hair recolouring for custom shades, comparison slider, search & categories.

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  RotateCcw, 
  Shuffle, 
  Bookmark, 
  Calendar, 
  Check, 
  ArrowRight, 
  Palette, 
  Layers, 
  Search, 
  SplitSquareVertical, 
  Sliders, 
  Eye, 
  Share2,
  Heart,
  Info,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import { 
  CUSTOMIZER_MODELS, 
  HAIR_SHADE_CATEGORIES, 
  COMPLETE_HAIR_SHADES, 
  HAIR_FINISHES 
} from './hairCustomizerData';

export default function LiveHairColorCustomizer() {
  // 1. Model State (Default: Aria)
  const activeModel = CUSTOMIZER_MODELS[0];

  // 2. Selected Shade State (Default: Chocolate Brown)
  const defaultShade = COMPLETE_HAIR_SHADES.find(s => s.id === 'chocolate-brown') || COMPLETE_HAIR_SHADES[0];
  const [selectedShade, setSelectedShade] = useState(defaultShade);
  
  // Custom Color Picker State
  const [isCustomColorActive, setIsCustomColorActive] = useState(false);
  const [customHex, setCustomHex] = useState('#B85226');

  // Active Category Filter & Search Query
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 3. Fine-tuning Controls
  const [selectedFinishId, setSelectedFinishId] = useState('gloss');
  const [colorIntensity, setColorIntensity] = useState(90); // 30 to 100%
  const [isOriginalMode, setIsOriginalMode] = useState(false); // Quick "View Original"

  // 4. Comparison Slider Position (0 to 100%)
  const [comparisonSliderPos, setComparisonSliderPos] = useState(100); // 100% = full customized, 50% = split
  const [isSliderDragging, setIsSliderDragging] = useState(false);
  const previewContainerRef = useRef(null);

  // 5. Favourites State (Local Storage persistence)
  const [favouriteShadeIds, setFavouriteShadeIds] = useState(() => {
    try {
      const saved = localStorage.getItem('glam_hair_customizer_favorites');
      return saved ? JSON.parse(saved) : ['chocolate-brown', 'copper', 'honey-blonde', 'burgundy'];
    } catch {
      return ['chocolate-brown', 'copper', 'honey-blonde', 'burgundy'];
    }
  });

  const toggleFavouriteShade = useCallback((shadeId, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setFavouriteShadeIds(prev => {
      const updated = prev.includes(shadeId) 
        ? prev.filter(id => id !== shadeId) 
        : [...prev, shadeId];
      try {
        localStorage.setItem('glam_hair_customizer_favorites', JSON.stringify(updated));
      } catch (err) {
        console.warn('LocalStorage error', err);
      }
      return updated;
    });
  }, []);

  // Compute Active Color Hex
  const activeHex = isCustomColorActive ? customHex : selectedShade.hex;
  const isDimensional = !isCustomColorActive && selectedShade.isDimensional;
  const rootHex = isDimensional ? (selectedShade.rootHex || '#2A1C15') : activeHex;

  const activeFinish = useMemo(() => {
    return HAIR_FINISHES.find(f => f.id === selectedFinishId) || HAIR_FINISHES[0];
  }, [selectedFinishId]);

  // Filtered Shades List based on Category and Search
  const filteredShades = useMemo(() => {
    return COMPLETE_HAIR_SHADES.filter(shade => {
      // Category Filter
      if (activeCategory === 'favourites') {
        if (!favouriteShadeIds.includes(shade.id)) return false;
      } else if (activeCategory !== 'all' && shade.category !== activeCategory) {
        return false;
      }

      // Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = shade.name.toLowerCase().includes(query);
        const matchesDesc = shade.description.toLowerCase().includes(query);
        const matchesUnder = shade.undertone?.toLowerCase().includes(query);
        const matchesHex = shade.hex?.toLowerCase().includes(query);
        const matchesCat = shade.category?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesUnder && !matchesHex && !matchesCat) return false;
      }

      return true;
    });
  }, [activeCategory, searchQuery, favouriteShadeIds]);

  // Reset to Original Natural Hair Tone
  const handleResetToNatural = useCallback(() => {
    setIsOriginalMode(false);
    setIsCustomColorActive(false);
    setSelectedShade(defaultShade);
    setColorIntensity(90);
    setSelectedFinishId('gloss');
    setComparisonSliderPos(100);
    setSearchQuery('');
    setActiveCategory('all');
  }, [defaultShade]);

  // Shuffle for Random Inspiration
  const handleShuffleInspiration = useCallback(() => {
    setIsOriginalMode(false);
    setIsCustomColorActive(false);
    const randomIndex = Math.floor(Math.random() * COMPLETE_HAIR_SHADES.length);
    setSelectedShade(COMPLETE_HAIR_SHADES[randomIndex]);
    setComparisonSliderPos(100);
  }, []);

  // Comparison Slider Dragging Handlers
  const handleSliderMove = useCallback((clientX) => {
    if (!previewContainerRef.current) return;
    const rect = previewContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setComparisonSliderPos(Math.round(pos));
  }, []);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsSliderDragging(true);
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (isSliderDragging) {
        handleSliderMove(e.clientX);
      }
    };
    const onMouseUp = () => {
      if (isSliderDragging) {
        setIsSliderDragging(false);
      }
    };
    const onTouchMove = (e) => {
      if (isSliderDragging && e.touches[0]) {
        handleSliderMove(e.touches[0].clientX);
      }
    };
    const onTouchEnd = () => {
      if (isSliderDragging) {
        setIsSliderDragging(false);
      }
    };

    if (isSliderDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isSliderDragging, handleSliderMove]);

  return (
    <section id="live-customizer" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-20 sm:pt-28 scroll-mt-24">
      
      {/* 1. Header Banner */}
      <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B] shadow-xs">
          <Palette className="w-3.5 h-3.5 text-[#263D2B]" />
          <span>VIRTUAL COLOUR LABORATORY</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
          Live Hair Colour Customizer
        </h2>

        <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

        <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto">
          Experience your next signature shade in real-time. Select from authentic artisan shades or mix a custom palette, rendered instantly on our studio portrait with natural texture, shadows and shine.
        </p>

        {/* Quick Trust Badges */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#465640]">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#263D2B]" />
            Hair-Region Precision (Skin &amp; Clothes Untouched)
          </span>
          <span className="hidden sm:inline text-[#A8B5A0]">•</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
            Natural Highlights &amp; Shadows Preserved
          </span>
          <span className="hidden sm:inline text-[#A8B5A0]">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
            Zero Page Reload
          </span>
        </div>
      </ScrollReveal>

      {/* 2. Main Customizer Studio Workbench */}
      <div className="bg-white border border-[#DCE1D8] rounded-3xl shadow-sm p-4 sm:p-6 lg:p-8">
        
        {/* Top Control Bar: Studio Model Info & Quick Tools */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE5DC]">
          
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#465640]">
              Studio Portrait:
            </span>
            <div className="inline-flex rounded-full px-3 py-1 bg-[#F7F4ED] border border-[#DCE1D8] text-xs font-semibold text-[#263D2B]">
              {activeModel.name} &bull; {activeModel.style}
            </div>
          </div>

          {/* Quick Utility Buttons: Shuffle & Reset */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShuffleInspiration}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#DCE1D8] bg-white hover:border-[#263D2B] text-[#263D2B] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
              title="Shuffle for random shade inspiration"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Shuffle</span>
            </button>

            <button
              type="button"
              onClick={handleResetToNatural}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#DCE1D8] bg-white hover:border-[#263D2B] text-[#6B7068] hover:text-[#10110F] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
              title="Reset to natural original tone"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

        </div>

        {/* Studio Grid: 5 Cols Preview Panel | 7 Cols Interactive Shade Explorer */}
        <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT: LIVE MODEL HAIR PREVIEW CANVAS (5 COLS)                             */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* The Live Interactive Model Preview Card */}
            <div 
              ref={previewContainerRef}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#10110F] shadow-lg select-none group border border-[#DCE1D8]"
            >
              {/* Layer 1: Base Original Photograph of the Model */}
              <img
                src={activeModel.image}
                alt={`${activeModel.name} - Original Hair Model Portrait`}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />

              {/* Layer 2: The Precise Hair-Masked Recoloured Layer */}
              {!isOriginalMode && (
                <div 
                  className="absolute inset-0 overflow-hidden pointer-events-none transition-all duration-200"
                  style={{
                    // Comparison slider clips this layer horizontally
                    clipPath: `polygon(0 0, ${comparisonSliderPos}% 0, ${comparisonSliderPos}% 100%, 0 100%)`
                  }}
                >
                  {/* Mode A: Supported Photographic Variant Image */}
                  {!isCustomColorActive && selectedShade.variantImage ? (
                    <img
                      src={selectedShade.variantImage}
                      alt={`${selectedShade.name} Live Hair Preview`}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
                      style={{
                        opacity: colorIntensity / 100
                      }}
                      draggable={false}
                    />
                  ) : (
                    /* Mode B: Live Dynamic Hair Mask Recolouring for Custom Colors */
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        WebkitMaskImage: `url('/images/hair/model-customizer-hair-mask-alpha.png')`,
                        maskImage: `url('/images/hair/model-customizer-hair-mask-alpha.png')`,
                        WebkitMaskSize: 'cover',
                        maskSize: 'cover',
                        WebkitMaskPosition: 'center',
                        maskPosition: 'center',
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                      }}
                    >
                      {/* Pass 1: Multiply Color (preserves strand depth and shadows) */}
                      <div 
                        className="absolute inset-0"
                        style={{
                          backgroundColor: activeHex,
                          mixBlendMode: 'multiply',
                          opacity: (colorIntensity / 100) * 0.95
                        }}
                      />
                      {/* Pass 2: Color Hue & Saturation Infusion */}
                      <div 
                        className="absolute inset-0"
                        style={{
                          backgroundColor: activeHex,
                          mixBlendMode: activeFinish.blendMode,
                          opacity: (colorIntensity / 100) * activeFinish.opacity
                        }}
                      />
                      {/* Pass 3: Specular Luster */}
                      {selectedFinishId !== 'matte' && (
                        <div 
                          className="absolute inset-0"
                          style={{
                            background: 'radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)',
                            mixBlendMode: 'screen',
                            opacity: selectedFinishId === 'metallic' ? 0.35 : 0.22
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Layer 3: Before / After Draggable Divider Line */}
              {comparisonSliderPos > 0 && comparisonSliderPos < 100 && (
                <div 
                  className="absolute top-0 bottom-0 z-20 flex items-center justify-center cursor-ew-resize pointer-events-auto"
                  style={{ left: `${comparisonSliderPos}%` }}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleMouseDown}
                >
                  <div className="w-0.5 h-full bg-white shadow-[0_0_8px_rgba(0,0,0,0.6)]" />
                  <div className="absolute w-7 h-7 rounded-full bg-white text-[#263D2B] shadow-lg flex items-center justify-center border-2 border-[#263D2B] cursor-ew-resize">
                    <SplitSquareVertical className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}

              {/* Top Overlay Pills: Left = Customized, Right = Original */}
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white border border-white/20">
                  <span className="w-2.5 h-2.5 rounded-full border border-white/40" style={{ backgroundColor: activeHex }} />
                  <span>{isOriginalMode ? 'ORIGINAL HAIR' : isCustomColorActive ? `CUSTOM (${customHex})` : selectedShade.name}</span>
                </span>
              </div>

              {comparisonSliderPos < 100 && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#A8B5A0] border border-white/10">
                    ORIGINAL
                  </span>
                </div>
              )}

              {/* Bottom Quick Bar: Compare & Shade Status */}
              <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs text-white">
                <div className="inline-flex items-center gap-2 bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] border border-white/10">
                  <span>Portrait: <strong>{activeModel.name}</strong></span>
                  <span className="text-[#A8B5A0]">&bull;</span>
                  <span className="text-[#A8B5A0]">{isCustomColorActive ? 'Bespoke' : selectedShade.category.toUpperCase()}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOriginalMode(prev => !prev)}
                  className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10.5px] font-bold uppercase tracking-wider border border-white/20 hover:border-white text-white transition-colors cursor-pointer"
                  title="Toggle original natural look"
                >
                  {isOriginalMode ? 'Show Color' : 'Hold to View Original'}
                </button>
              </div>

            </div>

            {/* Comparison Slider Quick Controls */}
            <div className="bg-[#F7F4ED] border border-[#DCE1D8] rounded-2xl p-3 flex items-center justify-between gap-2 text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#465640] flex items-center gap-1.5">
                <SplitSquareVertical className="w-3.5 h-3.5 text-[#263D2B]" />
                Before / After:
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setComparisonSliderPos(0)}
                  className={`px-2.5 py-1 rounded-md text-[10.5px] font-bold uppercase transition-all cursor-pointer ${
                    comparisonSliderPos === 0 
                      ? 'bg-[#263D2B] text-white shadow-xs' 
                      : 'bg-white border border-[#DCE1D8] text-[#465640] hover:border-[#263D2B]'
                  }`}
                >
                  Original
                </button>

                <button
                  type="button"
                  onClick={() => setComparisonSliderPos(50)}
                  className={`px-2.5 py-1 rounded-md text-[10.5px] font-bold uppercase transition-all cursor-pointer ${
                    comparisonSliderPos === 50 
                      ? 'bg-[#263D2B] text-white shadow-xs' 
                      : 'bg-white border border-[#DCE1D8] text-[#465640] hover:border-[#263D2B]'
                  }`}
                >
                  50/50 Split
                </button>

                <button
                  type="button"
                  onClick={() => setComparisonSliderPos(100)}
                  className={`px-2.5 py-1 rounded-md text-[10.5px] font-bold uppercase transition-all cursor-pointer ${
                    comparisonSliderPos === 100 
                      ? 'bg-[#263D2B] text-white shadow-xs' 
                      : 'bg-white border border-[#DCE1D8] text-[#465640] hover:border-[#263D2B]'
                  }`}
                >
                  Full Preview
                </button>
              </div>
            </div>

            {/* Depth & Finish Controls */}
            <div className="bg-[#F7F4ED] border border-[#DCE1D8] rounded-2xl p-4 space-y-3">
              
              {/* Depth Saturation Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-[10.5px] text-[#263D2B]">
                    Colour Saturation &amp; Depth
                  </span>
                  <span className="font-mono text-[10.5px] text-[#465640] font-bold">{colorIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={colorIntensity}
                  onChange={(e) => setColorIntensity(Number(e.target.value))}
                  className="w-full accent-[#263D2B] h-1.5 bg-[#EAE5DC] rounded-lg cursor-pointer"
                  aria-label="Tone Depth Saturation Slider"
                />
              </div>

              {/* Finish Type Pills */}
              <div className="space-y-1.5 pt-1">
                <span className="font-bold uppercase tracking-wider text-[10.5px] text-[#263D2B] block">
                  Salon Luster Finish
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {HAIR_FINISHES.map(finish => {
                    const isSelected = selectedFinishId === finish.id;
                    return (
                      <button
                        key={finish.id}
                        type="button"
                        onClick={() => setSelectedFinishId(finish.id)}
                        className={`py-1.5 px-2 rounded-xl text-center text-[10.5px] transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#263D2B] text-white font-bold shadow-xs'
                            : 'bg-white text-[#465640] border border-[#DCE1D8] hover:border-[#263D2B]'
                        }`}
                      >
                        {finish.label}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT: COMPLETE SHADES LIBRARY & CONTROLS (7 COLS)                        */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Active Selected Shade Details Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Swatch & Title */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span 
                      className="w-12 h-12 rounded-full border-2 border-white shadow-md block"
                      style={{
                        background: isDimensional 
                          ? `linear-gradient(135deg, ${rootHex} 0%, ${activeHex} 100%)` 
                          : activeHex
                      }}
                    />
                    {isDimensional && (
                      <span className="absolute -bottom-1 -right-1 bg-[#263D2B] text-white text-[8px] font-bold px-1 rounded-full uppercase">
                        Balayage
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-[#465640]">
                        HEX {activeHex.toUpperCase()}
                      </span>
                      <span className="text-[#A8B5A0]">&bull;</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B]">
                        {isCustomColorActive ? 'CUSTOM BLEND' : selectedShade.undertone}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-normal text-[#10110F]">
                      {isCustomColorActive ? 'Custom Bespoke Tint' : selectedShade.name}
                    </h3>
                  </div>
                </div>

                {/* Favorite & Book CTAs */}
                <div className="flex items-center gap-2">
                  {!isCustomColorActive && (
                    <button
                      type="button"
                      onClick={(e) => toggleFavouriteShade(selectedShade.id, e)}
                      className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                        favouriteShadeIds.includes(selectedShade.id)
                          ? 'bg-[#263D2B] text-white border-[#263D2B]'
                          : 'bg-white text-[#465640] border-[#DCE1D8] hover:border-[#263D2B]'
                      }`}
                      title={favouriteShadeIds.includes(selectedShade.id) ? 'Remove from saved' : 'Save to favourites'}
                      aria-label="Toggle favourite shade"
                    >
                      <Bookmark className={`w-4 h-4 ${favouriteShadeIds.includes(selectedShade.id) ? 'fill-white' : ''}`} />
                    </button>
                  )}

                  <Link
                    to={`/book-appointment?service=${selectedShade.service || 'noor-balayage'}&shade=${encodeURIComponent(isCustomColorActive ? `Custom Hex ${customHex}` : selectedShade.name)}`}
                    className="global-button !px-5 !py-2.5 text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book This Shade</span>
                  </Link>
                </div>

              </div>

              {/* Description & Professional In-Salon Formula */}
              <div className="pt-2 border-t border-[#EAE5DC] space-y-2 text-xs">
                <p className="text-[#465640] font-light leading-relaxed">
                  {isCustomColorActive 
                    ? 'Bespoke custom mixed shade. During your salon consultation, master artist Janki will balance lift levels and developer strength to achieve this chromatic tone.' 
                    : selectedShade.description}
                </p>

                <div className="p-3 rounded-xl bg-white border border-[#DCE1D8] flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#263D2B] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold text-[10.5px] uppercase tracking-wider text-[#263D2B] block">
                      Atelier In-Salon Formula:
                    </span>
                    <span className="text-[#465640] text-xs font-mono">
                      {isCustomColorActive ? `Custom Tone #${customHex.replace('#', '')} with Bond-Building Glaze` : selectedShade.formula}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Custom Colour Mixer Accordion */}
            <div className="bg-[#FDFBF7] border border-[#DCE1D8] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="color"
                    value={customHex}
                    onChange={(e) => {
                      setCustomHex(e.target.value);
                      setIsCustomColorActive(true);
                    }}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-xs cursor-pointer p-0 overflow-hidden"
                    title="Choose any custom colour"
                  />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                    Custom Colour Mixer
                  </span>
                  <span className="text-[11px] text-[#6B7068] font-light">
                    Pick any custom shade or input a HEX value for live preview.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customHex}
                  onChange={(e) => {
                    setCustomHex(e.target.value);
                    setIsCustomColorActive(true);
                  }}
                  placeholder="#Hex"
                  maxLength={7}
                  className="w-24 px-3 py-1.5 rounded-lg border border-[#DCE1D8] text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-[#263D2B] bg-white"
                />
                <button
                  type="button"
                  onClick={() => setIsCustomColorActive(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                    isCustomColorActive 
                      ? 'bg-[#263D2B] text-white' 
                      : 'bg-white border border-[#DCE1D8] text-[#465640] hover:border-[#263D2B]'
                  }`}
                >
                  {isCustomColorActive ? 'Active' : 'Apply'}
                </button>
              </div>
            </div>

            {/* Search Input & Category Tabs */}
            <div className="space-y-3">
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#A8B5A0] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search shades by name (e.g. Black, Chocolate Brown, Copper, Honey Blonde, Pink)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DCE1D8] bg-white text-xs placeholder:text-[#A8B5A0] focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B7068] hover:text-[#10110F] cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* The 7 Required Category Tabs + All + Favourites */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
                {HAIR_SHADE_CATEGORIES.map(cat => {
                  const isActive = activeCategory === cat.id;
                  const count = cat.id === 'all' 
                    ? COMPLETE_HAIR_SHADES.length 
                    : cat.id === 'favourites' 
                    ? favouriteShadeIds.length 
                    : COMPLETE_HAIR_SHADES.filter(s => s.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#263D2B] text-white font-bold shadow-xs'
                          : 'bg-white text-[#465640] border border-[#DCE1D8] hover:border-[#263D2B]'
                      }`}
                    >
                      {cat.id === 'favourites' && <Bookmark className="w-3 h-3" />}
                      <span>{cat.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-[#F2EFE8] text-[#6B7068]'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Clickable Real React Buttons Swatches Grid */}
            <div className="max-h-[480px] overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-[#263D2B]/20">
              {filteredShades.length === 0 ? (
                <div className="py-12 text-center text-[#6B7068] space-y-2 bg-[#F7F4ED] rounded-2xl border border-[#DCE1D8]">
                  <Palette className="w-8 h-8 text-[#A8B5A0] mx-auto" />
                  <p className="text-xs">No shades found matching &ldquo;{searchQuery}&rdquo;</p>
                  <button
                    type="button"
                    onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                    className="text-xs text-[#263D2B] font-bold underline cursor-pointer"
                  >
                    View all shades
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {filteredShades.map(shade => {
                    const isSelected = !isCustomColorActive && selectedShade.id === shade.id;
                    const isFav = favouriteShadeIds.includes(shade.id);

                    return (
                      <button
                        key={shade.id}
                        type="button"
                        onClick={() => {
                          setSelectedShade(shade);
                          setIsCustomColorActive(false);
                          setIsOriginalMode(false);
                        }}
                        aria-pressed={isSelected}
                        aria-label={`Select ${shade.name} hair colour`}
                        className={`w-full p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2.5 group relative ${
                          isSelected
                            ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-md ring-2 ring-[#263D2B] ring-offset-2'
                            : 'bg-white text-[#10110F] border-[#DCE1D8] hover:border-[#263D2B] hover:bg-[#FDFBF7]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Circle Swatch */}
                          <span
                            className="w-8 h-8 rounded-full border-2 border-white shadow-xs shrink-0 block"
                            style={{
                              background: shade.isDimensional 
                                ? `linear-gradient(135deg, ${shade.rootHex || '#2A1C15'} 0%, ${shade.hex} 100%)` 
                                : shade.hex
                            }}
                          />

                          <div className="min-w-0">
                            <span className={`text-xs font-serif font-medium truncate block leading-snug ${isSelected ? 'text-white' : 'text-[#10110F]'}`}>
                              {shade.name}
                            </span>
                            <span className={`text-[10px] font-mono tracking-wider block ${isSelected ? 'text-[#DCE1D8]' : 'text-[#6B7068]'}`}>
                              {shade.hex.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        {/* Selected Indicator Checkmark or Saved Bookmark Badge */}
                        <div className="flex items-center gap-1 shrink-0">
                          {isSelected ? (
                            <span className="w-5 h-5 rounded-full bg-white/25 flex items-center justify-center">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </span>
                          ) : isFav ? (
                            <span className="w-2 h-2 rounded-full bg-[#263D2B]" title="Saved favourite" />
                          ) : null}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bottom Atelier Formulation Note */}
            <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-start gap-2.5 text-xs text-[#465640]">
              <Info className="w-4 h-4 text-[#263D2B] shrink-0 mt-0.5" />
              <p className="font-light leading-relaxed">
                <strong>Colorist Formulation Note:</strong> Instant hair colour simulation reflects genuine tonal dimension. In-salon results are calibrated by Janki according to starting hair porosity, undertone lift history, and customized developer strength.
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
