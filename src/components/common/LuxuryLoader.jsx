import React, { useState, useEffect } from 'react';
import './LuxuryLoader.css';

/**
 * LuxuryLoader — Exact 5.0-Second Cinematic Opening Experience
 * GLAM GIRL BY JANKI — HAUTE BEAUTÉ · ATELIER · OTTAWA
 *
 * Sequence:
 * 0.0s - 1.2s: Deep ambient glow & 3D gyroscopic gold rings ignite
 * 1.2s - 2.4s: 3D Diamond Star emblem emerges with gold halo burst
 * 2.4s - 3.8s: "GLAM GIRL" couture title & "BY JANKI" subtitle with specular light sweep
 * 3.8s - 4.4s: Full prestige brand lockup in equilibrium + micro progress track
 * 4.4s - 5.0s: Smooth silk reveal fade-out (0.6s transition)
 * 5.0s: Exact unmount and seamless Home presentation
 */
export default function LuxuryLoader({ onComplete }) {
  const [isMounted, setIsMounted] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0); // 0: rings, 1: emblem, 2: title, 3: full lockup, 4: fading

  useEffect(() => {
    // Stage 1: 3D Emblem Reveal at 1.0s
    const t1 = setTimeout(() => setAnimationPhase(1), 1000);

    // Stage 2: Typography & Light Sweep at 2.2s
    const t2 = setTimeout(() => setAnimationPhase(2), 2200);

    // Stage 3: Full Lockup & Atelier Tag at 3.4s
    const t3 = setTimeout(() => setAnimationPhase(3), 3400);

    // Stage 4: Fade Out Transition at 4.4s
    const t4 = setTimeout(() => setAnimationPhase(4), 4400);

    // Stage 5: Final Unmount at EXACTLY 5000ms (5.0s)
    const tFinal = setTimeout(() => {
      setIsMounted(false);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (onComplete) onComplete();
    }, 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(tFinal);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [onComplete]);

  if (!isMounted) return null;

  const isFading = animationPhase >= 4;

  return (
    <aside
      role="status"
      aria-live="polite"
      aria-label="GLAM GIRL BY JANKI Atelier Opening"
      className={`luxury-loader-container ${isFading ? 'luxury-loader-fading' : ''}`}
    >
      {/* Deep Ambient Lighting & Radial Bloom */}
      <div className="luxury-loader-ambient-glow" />
      <div className={`luxury-loader-radial-burst ${animationPhase >= 1 ? 'active' : ''}`} />

      {/* 3D Gyroscopic Stage */}
      <div className="luxury-loader-3d-stage">
        {/* Orbiting Gold Rings */}
        <div className={`luxury-3d-rings-wrapper ${animationPhase >= 0 ? 'visible' : ''}`}>
          <div className="luxury-3d-ring luxury-3d-ring-outer">
            <div className="luxury-ring-specular-orb" />
          </div>
          <div className="luxury-3d-ring luxury-3d-ring-inner">
            <div className="luxury-ring-specular-orb-reverse" />
          </div>
          <div className={`luxury-gold-halo-pulse ${animationPhase >= 1 ? 'active' : ''}`} />
        </div>

        {/* Brand Showcase */}
        <div 
          className={`luxury-brand-showcase ${
            animationPhase === 1 ? 'stage-active' :
            animationPhase === 2 ? 'stage-active logo-revealed' :
            animationPhase >= 3 ? 'stage-active logo-revealed full-lockup' : ''
          }`}
        >
          {/* Haute Couture Salon Hairdressing Shears Emblem */}
          <div className="luxury-emblem-container">
            <div className="luxury-emblem-3d-diamond">
              <svg viewBox="0 0 54 54" className="luxury-emblem-svg" fill="none">
                <defs>
                  {/* Multi-tier Champagne-Gold Gradient */}
                  <linearGradient id="goldShearGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="15%" stopColor="#FFF4DE" />
                    <stop offset="40%" stopColor="#E5C492" />
                    <stop offset="70%" stopColor="#CFA46A" />
                    <stop offset="90%" stopColor="#9C6F38" />
                    <stop offset="100%" stopColor="#FAF0DE" />
                  </linearGradient>

                  <linearGradient id="goldShearGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFF6E5" />
                    <stop offset="30%" stopColor="#CFA46A" />
                    <stop offset="60%" stopColor="#E5C492" />
                    <stop offset="100%" stopColor="#8C6430" />
                  </linearGradient>

                  {/* Metallic Ambient Sheen Glow */}
                  <filter id="luxuryShearsAura" x="-25%" y="-25%" width="150%" height="150%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#CFA46A" floodOpacity="0.8"/>
                    <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#CFA46A" floodOpacity="0.3"/>
                  </filter>
                </defs>

                <g filter="url(#luxuryShearsAura)" className="luxury-shears-group">
                  {/* Blade 1 (Upper Left to Lower Right Blade) */}
                  <path
                    d="M21 21 L39 5.5 C40 6.5 35 15.5 28 22.5 L21 21 Z"
                    fill="url(#goldShearGrad1)"
                    stroke="url(#goldShearGrad1)"
                    strokeWidth="0.5"
                    strokeLinejoin="round"
                  />
                  {/* Blade 1 Edge Highlight */}
                  <path
                    d="M39 5.5 L21 21"
                    stroke="#FFFFFF"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    opacity="0.9"
                  />

                  {/* Blade 2 (Upper Right to Lower Left Blade) */}
                  <path
                    d="M33 21 L15 5.5 C14 6.5 19 15.5 26 22.5 L33 21 Z"
                    fill="url(#goldShearGrad2)"
                    stroke="url(#goldShearGrad2)"
                    strokeWidth="0.5"
                    strokeLinejoin="round"
                  />
                  {/* Blade 2 Edge Highlight */}
                  <path
                    d="M15 5.5 L33 21"
                    stroke="#FFF7E6"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    opacity="0.9"
                  />

                  {/* Left Shank & Ergonomic Finger Loop */}
                  <path
                    d="M24 24.5 L19 32.5 C16.5 36.5 11 38.5 7.5 35 C4 31.5 6 26 10 23.5 C13.5 21.5 17.5 24 19 28"
                    stroke="url(#goldShearGrad1)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  {/* Left Finger Ring Inner Hole Shadow */}
                  <ellipse cx="9.5" cy="30.5" rx="3.5" ry="4.5" fill="#0E0A0C" opacity="0.65" />

                  {/* Right Shank & Finger Loop with Rest Tang */}
                  <path
                    d="M30 24.5 L35 32.5 C37.5 36.5 43 38.5 46.5 35 C50 31.5 48 26 44 23.5 C40.5 21.5 36.5 24 35 28"
                    stroke="url(#goldShearGrad2)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  {/* Right Finger Ring Inner Hole Shadow */}
                  <ellipse cx="44.5" cy="30.5" rx="3.5" ry="4.5" fill="#0E0A0C" opacity="0.65" />

                  {/* Sculpted Finger Rest / Tang */}
                  <path
                    d="M46.5 35 C48.5 38.5 51.5 39.5 52.5 40"
                    stroke="url(#goldShearGrad1)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Central Jeweler's Pivot Screw */}
                  <circle cx="27" cy="21.5" r="2.8" fill="url(#goldShearGrad1)" stroke="#100C0D" strokeWidth="0.8" />
                  <circle cx="27" cy="21.5" r="1.1" fill="#FFFFFF" opacity="0.95" />
                  <line x1="25.8" y1="21.5" x2="28.2" y2="21.5" stroke="#100C0D" strokeWidth="0.5" />
                </g>
              </svg>
            </div>
          </div>

          {/* Typography */}
          <div className="luxury-text-reveal-box">
            <div className="luxury-brand-title">
              <span className="luxury-title-text">GLAM GIRL</span>
              <span className={`luxury-light-sweep ${animationPhase >= 2 ? 'active' : ''}`} />
            </div>

            <div className={`luxury-brand-subtitle-wrapper ${animationPhase >= 2 ? 'visible' : ''}`}>
              <div className="luxury-sub-line-left" />
              <span className="luxury-brand-subtitle">BY JANKI</span>
              <div className="luxury-sub-line-right" />
            </div>

            <div className={`luxury-atelier-tag ${animationPhase >= 3 ? 'visible' : ''}`}>
              <span>HAUTE BEAUTÉ · ATELIER · OTTAWA</span>
            </div>
          </div>
        </div>
      </div>

      <span className="sr-only">GLAM GIRL BY JANKI Atelier is loading</span>
    </aside>
  );
}
