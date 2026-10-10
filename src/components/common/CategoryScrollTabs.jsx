import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CategoryScrollTabs({
  categories = [],
  selectedId = 'all',
  onSelect,
  allLabel = 'ALL 72 TREATMENTS',
  showAll = true,
  theme = 'light',
  className = ''
}) {
  const scrollContainerRef = useRef(null);
  const activeBtnRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll bounds accurately
  const checkScrollBounds = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    checkScrollBounds();
    window.addEventListener('resize', checkScrollBounds);
    el.addEventListener('scroll', checkScrollBounds, { passive: true });

    // Initial check after rendering
    const timer = setTimeout(checkScrollBounds, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkScrollBounds);
      el.removeEventListener('scroll', checkScrollBounds);
    };
  }, [checkScrollBounds, categories]);

  // Auto-scroll active button smoothly inside horizontal container only
  useEffect(() => {
    const container = scrollContainerRef.current;
    const btn = activeBtnRef.current;
    if (container && btn) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      const offset = (btnRect.left + btnRect.width / 2) - (containerRect.left + containerRect.width / 2);
      
      if (Math.abs(offset) > 10) {
        container.scrollBy({
          left: offset,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedId]);

  const handleScroll = (direction) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = Math.max(260, Math.floor(el.clientWidth * 0.55));
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const getInactiveBtnClass = () => {
    return 'bg-white text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED] border border-[#DCE1D8] hover:border-[#263D2B] shadow-xs';
  };

  const getArrowBtnClass = (canScroll) => {
    return canScroll
      ? 'bg-white border-[#DCE1D8] text-[#263D2B] hover:bg-[#263D2B] hover:text-white hover:border-[#263D2B] hover:scale-105 active:scale-95 shadow-sm cursor-pointer'
      : 'bg-[#F7F4ED]/80 border-[#DCE1D8] text-[#6B7068]/30 cursor-not-allowed opacity-40';
  };

  return (
    <div className={`flex items-center gap-1.5 sm:gap-2.5 w-full select-none ${className}`}>
      {/* Left Non-Overlapping Arrow Scroll Button */}
      <button
        type="button"
        onClick={() => handleScroll('left')}
        disabled={!canScrollLeft}
        aria-label="Scroll categories left"
        className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full flex-shrink-0 flex items-center justify-center border transition-all duration-200 ${getArrowBtnClass(canScrollLeft)}`}
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Center Horizontal Scrollable Category Track */}
      <div className="flex-1 overflow-hidden min-w-0">
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar scrollbar-none py-1.5 px-0.5 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* 'All' option pill */}
          {showAll && (
            <button
              type="button"
              ref={selectedId === 'all' ? activeBtnRef : null}
              onClick={() => onSelect('all')}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 ${
                selectedId === 'all'
                  ? 'bg-[#263D2B] text-white font-extrabold shadow-sm scale-[1.02] border border-[#263D2B]'
                  : getInactiveBtnClass()
              }`}
            >
              {allLabel}
            </button>
          )}

          {/* Dynamic Category Pills */}
          {categories.map((cat) => {
            const catId = typeof cat === 'string' ? cat : cat.id;
            const catName = typeof cat === 'string' ? cat : cat.name;
            const isActive = selectedId === catId;

            return (
              <button
                key={catId}
                type="button"
                ref={isActive ? activeBtnRef : null}
                onClick={() => onSelect(catId)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 ${
                  isActive
                    ? 'bg-[#263D2B] text-white font-extrabold shadow-sm scale-[1.02] border border-[#263D2B]'
                    : getInactiveBtnClass()
                }`}
              >
                {catName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Non-Overlapping Arrow Scroll Button */}
      <button
        type="button"
        onClick={() => handleScroll('right')}
        disabled={!canScrollRight}
        aria-label="Scroll categories right"
        className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full flex-shrink-0 flex items-center justify-center border transition-all duration-200 ${getArrowBtnClass(canScrollRight)}`}
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
}
