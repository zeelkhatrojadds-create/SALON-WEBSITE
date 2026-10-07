import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './LuxuryPageTransition.css';

/**
 * LuxuryPageTransition — Seamless 1-Second Direct Route Transition
 * - Zero overlays, Zero black screens, Zero blank gaps.
 * - Animates directly on the page container:
 *   opacity: 0.96 -> 1
 *   scale: 0.985 -> 1
 *   translateX: 8px -> 0
 *   translateY: 8px -> 0
 *   Easing: cubic-bezier(0.22, 1, 0.36, 1) over exactly 1000ms.
 */
export default function LuxuryPageTransition({ children }) {
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(false);
  const isInitialMount = useRef(true);
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    // Skip on initial site opening (LuxuryLoader 5s 3D intro handles initial load)
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevPathname.current = location.pathname;
      return;
    }

    // Only trigger when pathname actually changes
    if (location.pathname === prevPathname.current) {
      return;
    }

    prevPathname.current = location.pathname;

    // Immediately reset scroll position to top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Check for prefers-reduced-motion
    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsAnimating(false);
      return;
    }

    // Trigger 1-second transition on the new page
    setIsAnimating(true);

    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname]);

  return (
    <div className="luxury-transition-root">
      <div
        key={location.pathname}
        className={`luxury-transition-page ${isAnimating ? 'animating' : 'settled'}`}
      >
        {children}
      </div>
    </div>
  );
}
