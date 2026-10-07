import React, { useState, useEffect } from 'react';
import './LuxuryLoader.css';

/**
 * LuxuryLoader — High-Speed 60fps Pure GPU Compositor 3D Opening
 * - CSS compositor-driven fade ensures sub-second FCP & LCP regardless of CPU throttle.
 * - Retains full 3D gold gyroscopic orbits, diamond star emblem, and brand lockup.
 * - Instant dismiss on click/tap/keydown.
 * - Zero main thread locking or continuous CPU redraws.
 */
export default function LuxuryLoader({ onComplete }) {
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Unmount from DOM after the pure CSS fade completes (1.2s)
    const timer = setTimeout(() => {
      setIsMounted(false);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (onComplete) onComplete();
    }, 1200);

    // Instant Skip on any user interaction
    const handleSkip = () => {
      setIsMounted(false);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (onComplete) onComplete();
    };

    window.addEventListener('click', handleSkip, { once: true });
    window.addEventListener('keydown', handleSkip, { once: true });
    window.addEventListener('touchstart', handleSkip, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleSkip);
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('touchstart', handleSkip);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [onComplete]);

  if (!isMounted) return null;

  return (
    <aside
      role="status"
      aria-live="polite"
      aria-label="GLAM GIRL BY JANKI Atelier"
      className="luxury-loader-container"
    >
      <div className="luxury-loader-ambient-glow" />
      <div className="luxury-loader-radial-burst active" />

      <div className="luxury-loader-3d-stage">
        <div className="luxury-3d-rings-wrapper visible settled">
          <div className="luxury-3d-ring luxury-3d-ring-outer">
            <div className="luxury-ring-specular-orb" />
          </div>
          <div className="luxury-3d-ring luxury-3d-ring-inner">
            <div className="luxury-ring-specular-orb-reverse" />
          </div>
          <div className="luxury-gold-halo-pulse active" />
        </div>

        <div className="luxury-brand-showcase stage-active logo-revealed full-lockup">
          <div className="luxury-emblem-container">
            <div className="luxury-emblem-3d-diamond">
              <svg viewBox="0 0 48 48" className="luxury-emblem-svg" fill="none">
                <defs>
                  <linearGradient id="goldLuxuryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF7E6" />
                    <stop offset="25%" stopColor="#E5C492" />
                    <stop offset="50%" stopColor="#CFA46A" />
                    <stop offset="75%" stopColor="#9C6F38" />
                    <stop offset="100%" stopColor="#FAF0DE" />
                  </linearGradient>
                </defs>
                <path
                  d="M24 2 L28 17 L43 17 L31 26 L35 41 L24 32 L13 41 L17 26 L5 17 L20 17 Z"
                  fill="url(#goldLuxuryGrad)"
                  className="luxury-emblem-star"
                />
                <circle cx="24" cy="24" r="3" fill="#FFFFFF" opacity="0.9" />
              </svg>
            </div>
          </div>

          <div className="luxury-text-reveal-box">
            <div className="luxury-brand-title">
              <span className="luxury-title-text">GLAM GIRL</span>
              <span className="luxury-light-sweep" />
            </div>

            <div className="luxury-brand-subtitle-wrapper">
              <div className="luxury-sub-line-left" />
              <span className="luxury-brand-subtitle">BY JANKI</span>
              <div className="luxury-sub-line-right" />
            </div>

            <div className="luxury-atelier-tag visible">
              <span>HAUTE BEAUTÉ · ATELIER · OTTAWA</span>
            </div>
          </div>
        </div>
      </div>

      <span className="sr-only">GLAM GIRL BY JANKI Atelier is loading</span>
    </aside>
  );
}
