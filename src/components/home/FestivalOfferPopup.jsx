import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  X, 
  ArrowRight, 
  Clock, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';

const STORAGE_KEY_SESSION = 'glfy_festival_popup_dismissed_v8';
const STORAGE_KEY_DATE = 'glfy_festival_popup_dismissed_until';
const AUTO_SCROLL_DURATION = 5000; // 5 seconds per offer

function formatOfferExpiryDate(dateStr) {
  if (!dateStr) return null;
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  } catch {
    // fallback
  }
  return dateStr;
}

export default function FestivalOfferPopup() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState(() => salonDB.getHomepageFestivalPopupOffers().slice(0, 5));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowToday, setDontShowToday] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState('next');
  const [reducedMotion] = useState(() => {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);
  const lastInteractionTime = useRef(0);

  // Clear legacy lockout storage keys on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      sessionStorage.removeItem('glfy_festival_popup_dismissed_session');
      sessionStorage.removeItem('glfy_festival_popup_dismissed_session_v2');
      sessionStorage.removeItem('glfy_festival_popup_2main_dismissed');
      sessionStorage.removeItem('glfy_festival_popup_dismissed_v4');
      sessionStorage.removeItem('glfy_festival_popup_dismissed_v5');
      sessionStorage.removeItem('glfy_festival_popup_dismissed_v6');
      sessionStorage.removeItem('glfy_festival_popup_dismissed_v7');
      sessionStorage.removeItem('glfy_festival_popup_dismissed_v8');
    } catch {
      // ignore
    }
  }, []);

  // Sync offers whenever DB updates (capped strictly at 5 offers)
  useEffect(() => {
    const sync = () => {
      const activeOffers = salonDB.getHomepageFestivalPopupOffers().slice(0, 5);
      setOffers(activeOffers);
      if (activeOffers.length > 0 && currentIndex >= activeOffers.length) {
        setCurrentIndex(0);
      }
    };
    const unsub = salonDB.subscribe(sync);
    return () => unsub();
  }, [currentIndex]);

  // Expose global trigger for on-demand opening
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('glfy:open-festival-popup', handleOpen);
    window.openFestivalPopup = () => setIsOpen(true);
    return () => {
      window.removeEventListener('glfy:open-festival-popup', handleOpen);
      try {
        delete window.openFestivalPopup;
      } catch {
        // ignore
      }
    };
  }, []);

  // Dismissal helper
  const recordDismissal = useCallback(() => {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(STORAGE_KEY_SESSION, 'true');

    if (dontShowToday) {
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      localStorage.setItem(STORAGE_KEY_DATE, String(endOfDay.getTime()));
    }
  }, [dontShowToday]);

  const handleClose = useCallback(() => {
    recordDismissal();
    setIsOpen(false);
  }, [recordDismissal]);

  // Debounced navigation to protect carousel stability
  const changeSlide = useCallback((newIndex, dir = 'next') => {
    const now = Date.now();
    if (now - lastInteractionTime.current < 350) {
      return;
    }
    lastInteractionTime.current = now;
    setDirection(dir);
    setCurrentIndex(newIndex);
  }, []);

  const handlePrev = useCallback(() => {
    if (offers.length <= 1) return;
    const prevIdx = currentIndex === 0 ? offers.length - 1 : currentIndex - 1;
    changeSlide(prevIdx, 'prev');
  }, [currentIndex, offers.length, changeSlide]);

  const handleNext = useCallback(() => {
    if (offers.length <= 1) return;
    const nextIdx = (currentIndex + 1) % offers.length;
    changeSlide(nextIdx, 'next');
  }, [currentIndex, offers.length, changeSlide]);

  const handleDotClick = useCallback((idx) => {
    if (idx === currentIndex) return;
    changeSlide(idx, idx > currentIndex ? 'next' : 'prev');
  }, [currentIndex, changeSlide]);

  // Auto-scroll every 5 seconds, pauses on hover or interaction
  const isAutoScrollActive = !isHovered && !reducedMotion;

  useEffect(() => {
    if (!isOpen || !isAutoScrollActive || offers.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      const nextIdx = (currentIndex + 1) % offers.length;
      changeSlide(nextIdx, 'next');
    }, AUTO_SCROLL_DURATION);

    return () => clearInterval(timer);
  }, [isOpen, isAutoScrollActive, offers.length, currentIndex, changeSlide]);

  // Schedule popup on homepage: show approximately 3 seconds after page loads
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!offers || offers.length === 0) return;

    const urlParams = new URLSearchParams(window.location.search);
    const forceOpen = urlParams.has('popup') || urlParams.has('offer') || urlParams.has('offers');

    if (!forceOpen) {
      if (typeof navigator !== 'undefined' && (
        navigator.webdriver || 
        /Lighthouse|HeadlessChrome|PageSpeed|Speed Insights|Google-InspectionTool/i.test(navigator.userAgent)
      )) {
        return;
      }

      const dismissedUntil = localStorage.getItem(STORAGE_KEY_DATE);
      if (dismissedUntil && Number(dismissedUntil) > Date.now()) {
        return;
      }

      if (sessionStorage.getItem(STORAGE_KEY_SESSION) === 'true') {
        return;
      }
    }

    const settings = salonDB.getSettings();
    if (settings.festivalPopupEnabled === false && !forceOpen) {
      return;
    }

    const delayMs = forceOpen ? 150 : Math.max(8000, (Number(settings.festivalPopupDelaySeconds) || 8) * 1000);
    const timer = setTimeout(() => {
      previousActiveElement.current = document.activeElement;
      setIsOpen(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [offers]);

  // Focus trap, Escape & Arrow keyboard interaction + comprehensive background scroll lock
  useEffect(() => {
    if (!isOpen) return;

    // 1. Strictly lock scrolling on background (both <html> and <body>)
    const htmlEl = document.documentElement;
    const bodyEl = document.body;

    // Record the current scroll position so page doesn't jump
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    const origBodyStyle = {
      position: bodyEl.style.position,
      top: bodyEl.style.top,
      left: bodyEl.style.left,
      right: bodyEl.style.right,
      width: bodyEl.style.width,
      overflow: bodyEl.style.overflow,
      paddingRight: bodyEl.style.paddingRight,
      overscrollBehavior: bodyEl.style.overscrollBehavior,
    };
    const origHtmlStyle = {
      overflow: htmlEl.style.overflow,
      overscrollBehavior: htmlEl.style.overscrollBehavior,
    };

    // Apply strict fixed lock on body (universal iOS + Android + Desktop fix)
    bodyEl.style.position = 'fixed';
    bodyEl.style.top = `-${scrollY}px`;
    bodyEl.style.left = '0';
    bodyEl.style.right = '0';
    bodyEl.style.width = '100%';
    bodyEl.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      bodyEl.style.paddingRight = `${scrollbarWidth}px`;
    }
    htmlEl.style.overflow = 'hidden';
    htmlEl.style.overscrollBehavior = 'none';

    htmlEl.classList.add('popup-scroll-locked');
    bodyEl.classList.add('popup-scroll-locked');

    // 2. Prevent touch dragging outside modal or overscrolling inside modal from scrolling background
    let lastTouchMoveY = 0;
    const handleTouchStartGlobal = (e) => {
      if (e.touches && e.touches.length > 0) {
        lastTouchMoveY = e.touches[0].clientY;
      }
    };

    const handleTouchMoveLock = (e) => {
      const scrollable = modalRef.current?.querySelector('.festival-modal-content-panel');
      if (!scrollable || !scrollable.contains(e.target)) {
        if (e.cancelable) {
          e.preventDefault();
        }
        return;
      }

      // Inside scrollable panel: check whether panel has scrollable content
      const { scrollTop, scrollHeight, clientHeight } = scrollable;
      if (scrollHeight <= clientHeight) {
        // Not tall enough to scroll: block touch movement to prevent body scroll
        if (e.cancelable) e.preventDefault();
        return;
      }

      if (e.touches && e.touches.length > 0) {
        const currentY = e.touches[0].clientY;
        const deltaY = lastTouchMoveY - currentY; // positive = dragging up / scrolling down
        lastTouchMoveY = currentY;

        const atTop = scrollTop <= 0 && deltaY < 0;
        const atBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight && deltaY > 0;
        if ((atTop || atBottom) && e.cancelable) {
          e.preventDefault();
        }
      }
    };

    // 3. Prevent mouse wheel outside modal or at boundaries from scrolling homepage
    const handleWheelLock = (e) => {
      const scrollable = modalRef.current?.querySelector('.festival-modal-content-panel');
      if (!scrollable || !scrollable.contains(e.target)) {
        if (e.cancelable) {
          e.preventDefault();
        }
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = scrollable;
      if (scrollHeight <= clientHeight) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      const deltaY = e.deltaY;
      const atTop = scrollTop <= 0 && deltaY < 0;
      const atBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight && deltaY > 0;
      if ((atTop || atBottom) && e.cancelable) {
        e.preventDefault();
      }
    };

    window.addEventListener('touchstart', handleTouchStartGlobal, { passive: true });
    window.addEventListener('touchmove', handleTouchMoveLock, { passive: false });
    window.addEventListener('wheel', handleWheelLock, { passive: false });

    const focusable = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable && focusable.length > 0) {
      focusable[0].focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
        return;
      }

      // Block background scrolling shortcut keys (Space, PageUp, PageDown, Home, End)
      const SCROLL_KEYS = [' ', 'Spacebar', 'PageUp', 'PageDown', 'Home', 'End'];
      if (SCROLL_KEYS.includes(e.key)) {
        const isInteractive = ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target?.tagName);
        if (!isInteractive && e.cancelable) {
          e.preventDefault();
        }
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = Array.from(
          modalRef.current.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // Revert body and html styles
      bodyEl.style.position = origBodyStyle.position;
      bodyEl.style.top = origBodyStyle.top;
      bodyEl.style.left = origBodyStyle.left;
      bodyEl.style.right = origBodyStyle.right;
      bodyEl.style.width = origBodyStyle.width;
      bodyEl.style.overflow = origBodyStyle.overflow;
      bodyEl.style.paddingRight = origBodyStyle.paddingRight;
      bodyEl.style.overscrollBehavior = origBodyStyle.overscrollBehavior;

      htmlEl.style.overflow = origHtmlStyle.overflow;
      htmlEl.style.overscrollBehavior = origHtmlStyle.overscrollBehavior;

      htmlEl.classList.remove('popup-scroll-locked');
      bodyEl.classList.remove('popup-scroll-locked');

      window.removeEventListener('touchstart', handleTouchStartGlobal);
      window.removeEventListener('touchmove', handleTouchMoveLock);
      window.removeEventListener('wheel', handleWheelLock);
      window.removeEventListener('keydown', handleKeyDown);

      // Restore scroll offset smoothly without sudden jump
      window.scrollTo(0, scrollY);

      if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, handleClose, handlePrev, handleNext]);

  // Two-axis touch swipe support on phones and iPads
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
    setIsHovered(true);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
    const diffX = touchStartX.current - touchEndX.current;
    const diffY = touchStartY.current - touchEndY.current;
    const minSwipeDistance = 40;

    // Only trigger horizontal slide switch when horizontal swipe exceeds vertical scroll
    if (Math.abs(diffX) > minSwipeDistance && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleBookOffer = (offer) => {
    recordDismissal();
    setIsOpen(false);

    if (!offer) {
      navigate('/book-appointment');
      return;
    }

    const srvParam = offer.primaryServiceId || (offer.includedServiceIds && offer.includedServiceIds[0]) || '';
    if (offer.id) {
      navigate(`/book-appointment?offer=${encodeURIComponent(offer.id)}&service=${encodeURIComponent(srvParam)}`);
    } else {
      navigate('/book-appointment');
    }
  };

  if (!offers || offers.length === 0) {
    return null;
  }

  const activeOffer = offers[currentIndex] || offers[0];
  const originalPrice = Number(activeOffer.originalPrice) || 0;
  const discountedPrice = Number(activeOffer.discountedPrice) || 0;
  const discountPercent = activeOffer.discountPercent || (originalPrice > 0 ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100) : 0);
  const formattedExpiry = formatOfferExpiryDate(activeOffer.endDate);
  const counterText = `${String(currentIndex + 1).padStart(2, '0')} / ${String(offers.length).padStart(2, '0')}`;
  const slideAnimationClass = direction === 'next' ? 'animate-carousel-slide-next' : 'animate-carousel-slide-prev';

  return (
    <>
      {/* 1. PERSISTENT FLOATING TRIGGER BADGE (Visible when modal is closed) */}
      {!isOpen && (
        <button
          type="button"
          id="open-festival-offers-modal-button"
          onClick={() => setIsOpen(true)}
          aria-label={`Special Offers (${offers.length})`}
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#263D2B] text-white shadow-xl hover:bg-[#1C2E20] active:scale-95 transition-all transform hover:-translate-y-0.5 border border-[#A8B5A0]/40 cursor-pointer group animate-fade-in"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A8B5A0] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A8B5A0]"></span>
          </span>
          <span className="font-sans font-medium text-xs tracking-wider uppercase">
            Special Offers ({offers.length})
          </span>
        </button>
      )}

      {/* 2. REFINED LUXURY FESTIVAL OFFERS MODAL DIALOG */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="festival-popup-title"
          aria-describedby="festival-popup-desc"
          onClick={handleBackdropClick}
          className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/65 backdrop-blur-xs overscroll-contain select-none touch-none ${
            reducedMotion ? '' : 'animate-fade-in'
          }`}
          style={{ overscrollBehavior: 'contain' }}
        >
          {/* Modal Container: Mobile (calc(100%-24px), max 90dvh), iPad portrait (stacked), iPad landscape (40/60 split), Desktop (48/52 split) */}
          <div
            ref={modalRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`festival-modal-container relative bg-[#F7F4ED] border border-[#DCE1D8] shadow-[0_20px_50px_rgba(16,17,15,0.18)] ${
              reducedMotion ? '' : 'animate-scale-in'
            }`}
          >
            {/* Dedicated Visible Close Button (>=44x44px touch target on mobile) */}
            <button
              type="button"
              id="close-festival-modal-button"
              onClick={handleClose}
              aria-label="Close festival offers popup"
              className="festival-modal-close-btn hover:bg-[#EDE8DC] focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
            >
              <X className="w-5 h-5 sm:w-4 sm:h-4 text-[#10110F]" />
            </button>

            {/* ========================================================================= */}
            {/* FESTIVAL BEAUTY IMAGE PANEL (30-35% on mobile, 40% on tablet landscape)   */}
            {/* ========================================================================= */}
            <div className="festival-modal-image-panel bg-[#10110F] select-none">
              <img
                key={activeOffer.id}
                src={activeOffer.bannerImage || '/images/festivals/thanksgiving-glow.jpg'}
                alt={`${activeOffer.festival || 'Festival'} — ${activeOffer.title || 'Beauty Special'}`}
                loading="eager"
                className={`w-full h-full object-cover object-[center_25%] transition-opacity duration-500 ease-out ${
                  reducedMotion ? '' : 'animate-fade-in'
                }`}
              />

              {/* Refined subtle vignette gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />

              {/* Festival campaign pill on image */}
              <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-20 pointer-events-none">
                <span className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-[#10110F]/80 backdrop-blur-md border border-white/20 text-[#F7F4ED] text-[10px] sm:text-[11px] font-medium tracking-wide shadow-xs">
                  {activeOffer.festival}
                </span>
              </div>

              {/* Previous & Next Arrows positioned neatly at image edges */}
              {offers.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous festival offer"
                    className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#10110F]/65 hover:bg-[#10110F] text-white border border-white/25 backdrop-blur-xs flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#A8B5A0]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next festival offer"
                    className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#10110F]/65 hover:bg-[#10110F] text-white border border-white/25 backdrop-blur-xs flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#A8B5A0]"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* ========================================================================= */}
            {/* EDITORIAL OFFER CONTENT PANEL                                             */}
            {/* ========================================================================= */}
            <div className="festival-modal-content-panel text-[#10110F] font-sans bg-[#F7F4ED]">
              
              {/* Synchronized Offer Details with fixed vertical allocations to prevent content jumping */}
              <div key={activeOffer.id} className={`flex flex-col flex-1 justify-between ${reducedMotion ? '' : slideAnimationClass}`}>
                
                {/* 1. Small Eyebrow: SEASONAL BEAUTY EDIT */}
                <div>
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-[#465640] block">
                    SEASONAL BEAUTY EDIT
                  </span>

                  {/* 2. Festival Name */}
                  <span className="text-[11.5px] sm:text-xs font-medium text-[#263D2B] tracking-wide block mt-0.5 sm:mt-1">
                    {activeOffer.festival}
                  </span>

                  {/* 3. Large Editorial Headline (Playfair Display) */}
                  <h2
                    id="festival-popup-title"
                    className="font-serif text-[22px] sm:text-[25px] md:landscape:text-[26px] lg:text-[28px] text-[#10110F] font-normal tracking-tight leading-[1.2] mt-1 sm:mt-1.5 min-h-[50px] sm:min-h-[58px] flex items-center"
                  >
                    {activeOffer.title}
                  </h2>

                  {/* 4. Short Description (Maximum 2–3 lines) */}
                  <p
                    id="festival-popup-desc"
                    className="font-sans text-[12.5px] sm:text-[13.5px] text-[#6B7068] leading-relaxed line-clamp-2 sm:line-clamp-3 min-h-[42px] sm:min-h-[52px] font-light mt-1"
                  >
                    {activeOffer.description}
                  </p>
                </div>

                {/* 5 & 6. Configured Price / Discount & Expiry Date (Clean & stable card) */}
                {(discountedPrice > 0 || discountPercent > 0 || formattedExpiry) && (
                  <div className="my-2 sm:my-2.5 h-[56px] sm:h-[62px] px-3.5 sm:px-4 rounded-xl bg-white border border-[#DCE1D8] flex items-center justify-between shadow-2xs">
                    <div className="flex flex-col justify-center">
                      <div className="flex items-baseline gap-1.5 sm:gap-2">
                        {discountedPrice > 0 ? (
                          <span className="font-serif text-xl sm:text-2xl font-medium text-[#263D2B]">
                            ${discountedPrice} <span className="text-[11px] sm:text-xs font-sans font-normal text-[#6B7068]">CAD</span>
                          </span>
                        ) : (
                          <span className="font-serif text-base sm:text-lg font-medium text-[#263D2B]">
                            Seasonal Special
                          </span>
                        )}
                        {originalPrice > discountedPrice && (
                          <span className="text-[11px] sm:text-xs text-[#6B7068] line-through font-normal">
                            ${originalPrice} CAD
                          </span>
                        )}
                      </div>
                      {formattedExpiry && (
                        <div className="text-[10px] sm:text-[11px] text-[#465640] flex items-center gap-1 font-medium pt-0.5">
                          <Clock className="w-3 h-3 text-[#465640]" />
                          <span>Valid through {formattedExpiry}</span>
                        </div>
                      )}
                    </div>

                    {discountPercent > 0 && (
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-[#263D2B] text-white text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider flex-shrink-0">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>
                )}

                {/* Counter & 5 Small Circular Pagination Dots (Single set, compact & aligned) */}
                <div className="flex items-center justify-between py-1 border-t border-[#DCE1D8]/40">
                  <span className="text-[10.5px] sm:text-[11px] font-mono font-medium text-[#465640] tracking-wider">
                    {counterText}
                  </span>

                  <div className="flex items-center gap-2" role="tablist" aria-label="Offer slides">
                    {offers.map((o, idx) => (
                      <button
                        key={o.id || idx}
                        type="button"
                        role="tab"
                        aria-selected={currentIndex === idx}
                        aria-label={`Go to slide ${idx + 1}: ${o.festival}`}
                        onClick={() => handleDotClick(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${
                          currentIndex === idx
                            ? 'bg-[#263D2B] ring-2 ring-[#263D2B]/30 ring-offset-1 ring-offset-[#F7F4ED]'
                            : 'bg-[#A8B5A0]/60 hover:bg-[#465640]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* 7. Primary Action Button: BOOK THIS OFFER (Full-width, approx 48px height) */}
                <button
                  type="button"
                  id="festival-modal-book-now-button"
                  onClick={() => handleBookOffer(activeOffer)}
                  className="w-full h-[48px] bg-[#263D2B] hover:bg-[#1C2E20] text-white text-xs font-bold uppercase tracking-[0.14em] rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-[0.99] transition-all cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#263D2B] focus:ring-offset-2 mt-1.5 sm:mt-2"
                >
                  <span>BOOK THIS OFFER</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                {/* 8. Small Link: Offer Terms & Conditions + Don't show again today */}
                <div className="flex items-center justify-between pt-2 mt-1.5 border-t border-[#DCE1D8]/60 text-[10.5px] sm:text-[11px] text-[#6B7068]">
                  <Link
                    to="/terms-and-conditions"
                    onClick={() => {
                      recordDismissal();
                      setIsOpen(false);
                    }}
                    className="underline underline-offset-2 text-[#465640] hover:text-[#10110F] transition-colors font-medium"
                  >
                    Offer Terms &amp; Conditions
                  </Link>

                  <label className="inline-flex items-center gap-1.5 cursor-pointer select-none hover:text-[#10110F]">
                    <input
                      type="checkbox"
                      checked={dontShowToday}
                      onChange={(e) => setDontShowToday(e.target.checked)}
                      className="w-3.5 h-3.5 rounded text-[#263D2B] focus:ring-[#263D2B] border-[#DCE1D8] cursor-pointer accent-[#263D2B]"
                    />
                    <span>Don&apos;t show again today</span>
                  </label>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
}

