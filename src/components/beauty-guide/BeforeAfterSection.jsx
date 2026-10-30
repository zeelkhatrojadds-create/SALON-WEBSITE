import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  SlidersHorizontal,
  CheckCircle2,
  Eye,
  Info
} from 'lucide-react';
import { 
  TRANSFORMATION_CATEGORIES, 
  BEFORE_AFTER_LOOKS 
} from '../../data/beautyGuideTransformationsData';

/**
 * Single Interactive Before/After Comparison Card
 */
function TransformationCard({ item, onOpenModal }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [mobileView, setMobileView] = useState('slider'); // 'slider' | 'before' | 'after'
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
    setMobileView('slider');
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  }, [handleMove]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };
    const onMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, handleMove]);

  // Derived display position based on mobile view selection
  const activePosition = mobileView === 'before' ? 100 : mobileView === 'after' ? 0 : sliderPos;

  return (
    <article className="group bg-white rounded-3xl border border-[#DCE1D8] shadow-xs hover:shadow-xl hover:border-[#263D2B] transition-all duration-300 flex flex-col justify-between overflow-hidden">
      
      {/* Interactive Comparison Viewport */}
      <div className="p-4 sm:p-5 pb-0">
        <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden rounded-2xl bg-[#10110F] select-none">
          
          {/* Slider Container */}
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onTouchMove={handleTouchMove}
            className="w-full h-full relative cursor-ew-resize touch-none overflow-hidden"
          >
            {/* 1. After Image (Background Base) */}
            <img
              src={item.afterImage}
              alt={`${item.title} - After treatment result`}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              loading="lazy"
            />

            {/* 2. Before Image (Clipped Overlay) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${activePosition}%` }}
            >
              <img
                src={item.beforeImage}
                alt={`${item.title} - Before treatment state`}
                className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                  height: '100%'
                }}
                loading="lazy"
              />
            </div>

            {/* 3. Sliding Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none transition-opacity"
              style={{ left: `${activePosition}%` }}
            >
              {/* Circular Handle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#263D2B] text-white border-2 border-white shadow-md flex items-center justify-center text-[10px] font-bold">
                <span className="tracking-tighter">◀▶</span>
              </div>
            </div>

            {/* Accessible Hidden Range Input for Keyboard Navigation */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => {
                setSliderPos(Number(e.target.value));
                setMobileView('slider');
              }}
              aria-label={`Compare Before and After for ${item.title}`}
              className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-30 focus:p-2 focus:bg-white focus:text-[#10110F] focus:rounded-md text-xs"
            />
          </div>

          {/* Floating Badges */}
          <div className="absolute top-3 left-3 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[9px] font-bold tracking-[0.14em] uppercase border border-white/20 shadow-xs">
              BEFORE
            </span>
          </div>

          <div className="absolute top-3 right-3 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full bg-[#263D2B]/90 backdrop-blur-md text-white text-[9px] font-bold tracking-[0.14em] uppercase border border-white/20 shadow-xs">
              AFTER
            </span>
          </div>

          {/* Fullscreen Expand Button */}
          <button
            type="button"
            onClick={() => onOpenModal(item)}
            className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-[#263D2B] hover:text-white text-[#10110F] flex items-center justify-center transition-all duration-200 shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B]"
            title="Open Fullscreen Comparison"
            aria-label={`Open larger view for ${item.title}`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile View Toggle Switch Buttons */}
        <div className="flex items-center justify-between gap-1 pt-2 sm:hidden">
          <span className="text-[10px] text-[#6B7068] font-light">View mode:</span>
          <div className="inline-flex rounded-full p-0.5 bg-[#F7F4ED] border border-[#DCE1D8] text-[10px] font-medium">
            <button
              type="button"
              onClick={() => setMobileView('before')}
              className={`px-2.5 py-0.5 rounded-full transition-colors ${
                mobileView === 'before' ? 'bg-[#263D2B] text-white font-bold' : 'text-[#6B7068]'
              }`}
            >
              Before
            </button>
            <button
              type="button"
              onClick={() => setMobileView('slider')}
              className={`px-2.5 py-0.5 rounded-full transition-colors ${
                mobileView === 'slider' ? 'bg-[#263D2B] text-white font-bold' : 'text-[#6B7068]'
              }`}
            >
              Slider
            </button>
            <button
              type="button"
              onClick={() => setMobileView('after')}
              className={`px-2.5 py-0.5 rounded-full transition-colors ${
                mobileView === 'after' ? 'bg-[#263D2B] text-white font-bold' : 'text-[#6B7068]'
              }`}
            >
              After
            </button>
          </div>
        </div>
      </div>

      {/* Card Content Information */}
      <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Category & Verified Badge */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#465640] px-2.5 py-0.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8]">
              {item.categoryLabel}
            </span>
            <span className="text-[9.5px] font-medium text-[#263D2B] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#263D2B]" />
              <span>{item.badgeType}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg sm:text-xl font-normal text-[#10110F] leading-snug group-hover:text-[#263D2B] transition-colors">
            {item.title}
          </h3>

          {/* Description */}
          {item.description && (
            <p className="text-xs text-[#6B7068] leading-relaxed font-light line-clamp-2">
              {item.description}
            </p>
          )}

          {/* Micro Transformation Details */}
          <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1.5 text-[11px]">
            <p className="text-[#6B7068] font-light">
              <strong className="text-[#10110F] font-medium">Before:</strong> {item.beforeLabel.replace('Before: ', '')}
            </p>
            <p className="text-[#465640] font-light">
              <strong className="text-[#263D2B] font-medium">After:</strong> {item.afterLabel.replace('After: ', '')}
            </p>
          </div>
        </div>

        {/* Action: Educational Service Guidance Link */}
        <div className="pt-4 border-t border-[#DCE1D8] flex items-center justify-between gap-3">
          <Link
            to={item.guidePath}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#263D2B] hover:text-[#10110F] transition-colors group/link cursor-pointer"
          >
            <span>Explore This Service</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" />
          </Link>

          <button
            type="button"
            onClick={() => onOpenModal(item)}
            className="text-[11px] text-[#6B7068] hover:text-[#10110F] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Compare Fullscreen</span>
          </button>
        </div>

      </div>

    </article>
  );
}

/**
 * Fullscreen Interactive Lightbox Modal
 */
function TransformationModal({ item, onClose, onPrev, onNext, currentIndex, totalCount }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  }, [handleMove]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (isDragging) handleMove(e.clientX);
    };
    const onMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, handleMove]);

  // Keyboard navigation inside modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#DCE1D8]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#DCE1D8] flex items-center justify-between bg-[#F7F4ED]">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] px-2.5 py-1 rounded-full bg-white border border-[#DCE1D8]">
              {item.categoryLabel}
            </span>
            <span className="text-xs text-[#6B7068] font-mono">
              {currentIndex + 1} of {totalCount}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              className="w-8 h-8 rounded-full bg-white border border-[#DCE1D8] text-[#10110F] flex items-center justify-center hover:bg-[#263D2B] hover:text-white transition-colors cursor-pointer"
              aria-label="Previous transformation"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onNext}
              className="w-8 h-8 rounded-full bg-white border border-[#DCE1D8] text-[#10110F] flex items-center justify-center hover:bg-[#263D2B] hover:text-white transition-colors cursor-pointer"
              aria-label="Next transformation"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white border border-[#DCE1D8] text-[#10110F] flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer ml-1"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Comparison Slider */}
        <div className="p-4 sm:p-6 bg-[#10110F] flex items-center justify-center">
          <div 
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onTouchMove={handleTouchMove}
            className="relative aspect-[16/10] w-full max-h-[55vh] overflow-hidden rounded-2xl cursor-ew-resize touch-none select-none shadow-inner"
          >
            {/* After Image */}
            <img
              src={item.afterImage}
              alt={`${item.title} - After`}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />

            {/* Before Image with Width Clipping */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={item.beforeImage}
                alt={`${item.title} - Before`}
                className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                  height: '100%'
                }}
              />
            </div>

            {/* Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-[2.5px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#263D2B] text-white border-2 border-white shadow-lg flex items-center justify-center text-xs font-bold">
                ◀▶
              </div>
            </div>

            {/* Floating Badges */}
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-bold tracking-[0.16em] uppercase border border-white/20">
              BEFORE
            </span>
            <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#263D2B]/90 backdrop-blur-md text-white text-[10px] font-bold tracking-[0.16em] uppercase border border-white/20">
              AFTER
            </span>
          </div>
        </div>

        {/* Modal Bottom Information & Guidance Link */}
        <div className="p-5 sm:p-6 bg-white overflow-y-auto space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F]">
                {item.title}
              </h3>
              <p className="text-xs text-[#6B7068] font-light mt-0.5">
                {item.description}
              </p>
            </div>

            <Link
              to={item.guidePath}
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#263D2B] text-white hover:bg-[#1C2E20] text-xs font-bold uppercase tracking-[0.14em] transition-all shrink-0 cursor-pointer text-center"
            >
              <span>Explore This Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#DCE1D8] text-xs">
            <div className="p-3 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">
                BEFORE STATE
              </span>
              <p className="text-[#10110F] font-light mt-0.5">
                {item.beforeLabel.replace('Before: ', '')}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                AFTER PROTOCOL &amp; RESULT
              </span>
              <p className="text-[#10110F] font-light mt-0.5">
                {item.afterLabel.replace('After: ', '')}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/**
 * Main Before & After Transformations Section
 */
export default function BeforeAfterSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeModalItem, setActiveModalItem] = useState(null);

  // Filtered list
  const filteredLooks = activeCategory === 'all'
    ? BEFORE_AFTER_LOOKS
    : BEFORE_AFTER_LOOKS.filter((look) => look.category === activeCategory);

  // Modal navigation indices
  const modalIndex = activeModalItem
    ? filteredLooks.findIndex((l) => l.id === activeModalItem.id)
    : -1;

  const handlePrevModal = () => {
    if (modalIndex > 0) {
      setActiveModalItem(filteredLooks[modalIndex - 1]);
    } else {
      setActiveModalItem(filteredLooks[filteredLooks.length - 1]);
    }
  };

  const handleNextModal = () => {
    if (modalIndex < filteredLooks.length - 1) {
      setActiveModalItem(filteredLooks[modalIndex + 1]);
    } else {
      setActiveModalItem(filteredLooks[0]);
    }
  };

  return (
    <section className="mt-16 sm:mt-24 pt-12 border-t border-[#DCE1D8]">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            VISUAL LOOK EXPLORATION
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-tight">
          Before &amp; After Transformations
        </h2>

        <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

        <p className="font-serif text-base sm:text-lg text-[#465640] italic">
          Explore beauty transformations and discover your next look.
        </p>

        <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto">
          Drag the center slider left and right to inspect authentic client results and technique demonstrations across our signature salon disciplines. Click any look to examine high-resolution comparison details.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="mb-8 sm:mb-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none justify-start sm:justify-center">
          {TRANSFORMATION_CATEGORIES.map((tab) => {
            const isActive = activeCategory === tab.id;
            const count = tab.id === 'all'
              ? BEFORE_AFTER_LOOKS.length
              : BEFORE_AFTER_LOOKS.filter((l) => l.category === tab.id).length;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#263D2B] text-white shadow-xs font-bold'
                    : 'bg-white text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED] border border-[#DCE1D8]'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#F7F4ED] text-[#465640]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Transformation Cards */}
      {filteredLooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredLooks.map((look) => (
            <TransformationCard
              key={look.id}
              item={look}
              onOpenModal={(item) => setActiveModalItem(item)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center p-12 bg-white rounded-3xl border border-[#DCE1D8] max-w-md mx-auto space-y-3">
          <SlidersHorizontal className="w-8 h-8 text-[#A8B5A0] mx-auto" />
          <h3 className="font-serif text-lg font-normal text-[#10110F]">
            No transformations found
          </h3>
          <p className="text-xs text-[#6B7068] font-light">
            There are currently no transformation looks filed under this specific filter.
          </p>
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className="text-xs font-bold text-[#263D2B] uppercase tracking-wider hover:underline cursor-pointer"
          >
            View All Transformations
          </button>
        </div>
      )}

      {/* Ethical Transparency & Client Consent Notice */}
      <div className="mt-12 sm:mt-16 p-5 sm:p-6 rounded-2xl bg-white border border-[#DCE1D8] shadow-2xs max-w-3xl mx-auto flex items-start gap-3.5 text-left">
        <Info className="w-5 h-5 text-[#263D2B] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-[#6B7068] font-light leading-relaxed">
          <p className="font-medium text-[#10110F]">
            Authentic Studio Documentation &amp; Client Consent Principle
          </p>
          <p>
            All before-and-after imagery displayed reflects genuine salon treatments performed with full client consent or verified professional technique demonstrations. Individual results vary naturally based on hair texture, pigment undertones, skin barrier condition, and natural regrowth cycles. In accordance with salon ethical standards, we never promise guaranteed or identical physiological outcomes.
          </p>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeModalItem && (
        <TransformationModal
          item={activeModalItem}
          onClose={() => setActiveModalItem(null)}
          onPrev={handlePrevModal}
          onNext={handleNextModal}
          currentIndex={modalIndex}
          totalCount={filteredLooks.length}
        />
      )}

    </section>
  );
}
