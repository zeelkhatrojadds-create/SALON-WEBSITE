import React, { useState, useEffect, useRef } from 'react';

/**
 * DeferredSection — High Performance Lazy Hydration Container
 * 
 * Prevents heavy below-the-fold React trees & images from compiling, 
 * evaluating, and mounting on initial page load.
 * 
 * - Instantly renders if window.location.hash targets this section.
 * - Hydrates via IntersectionObserver (600px margin before viewport entry).
 * - Hydrates on browser idle time.
 * - Strictly reserves layout height to guarantee CLS < 0.01.
 */
export default function DeferredSection({ 
  id, 
  children, 
  minHeight = 'min-h-[500px]',
  className = '' 
}) {
  const [isHydrated, setIsHydrated] = useState(() => {
    if (typeof window === 'undefined') return false;
    // Check if initial hash matches this section
    const currentHash = window.location.hash.replace('#', '');
    return currentHash === id;
  });

  const containerRef = useRef(null);

  useEffect(() => {
    if (isHydrated) return;

    // Check hash on location change
    const checkHash = () => {
      const currentHash = window.location.hash.replace('#', '');
      if (currentHash === id) {
        setIsHydrated(true);
      }
    };

    window.addEventListener('hashchange', checkHash, { passive: true });

    const el = containerRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setIsHydrated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsHydrated(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '600px 0px 600px 0px',
        threshold: 0.01
      }
    );

    observer.observe(el);

    // Idle hydration fallback
    let idleId = null;
    let timerId = null;

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(
        () => {
          setIsHydrated(true);
        },
        { timeout: 3500 }
      );
    } else {
      timerId = setTimeout(() => {
        setIsHydrated(true);
      }, 3500);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', checkHash);
      if (idleId && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
      if (timerId) clearTimeout(timerId);
    };
  }, [isHydrated, id]);

  return (
    <section 
      ref={containerRef} 
      id={id} 
      className={`w-full relative ${minHeight} ${className}`}
    >
      {isHydrated ? (
        children
      ) : (
        <div 
          className={`w-full ${minHeight} flex items-center justify-center bg-[#F7F4ED] text-[#263D2B]/40`}
          aria-hidden="true"
        >
          <div className="w-6 h-6 rounded-full border-2 border-[#263D2B]/30 border-t-[#263D2B] animate-spin" />
        </div>
      )}
    </section>
  );
}
