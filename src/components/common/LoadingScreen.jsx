import React, { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete, duration = 1200 }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 250);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#100C0D] text-[#F7F1E8] flex flex-col items-center justify-center select-none overflow-hidden transition-opacity duration-300 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Soft Ambient Background Radial Glow */}
      <div className="absolute w-[360px] h-[360px] bg-[#CFA46A]/12 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Main Simple Loader Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm mx-auto space-y-5">
        
        {/* Animated Gold Ring Spinner with Brand Logo Star */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
          {/* Outer Rotating Gold Border */}
          <div className="absolute inset-0 rounded-full border-2 border-t-[#CFA46A] border-r-[#CFA46A]/40 border-b-[#CFA46A]/10 border-l-[#CFA46A]/70 animate-spin" />
          
          {/* Inner Glowing Salon Scissors */}
          <div className="text-[#CFA46A] w-6 h-6 flex items-center justify-center animate-pulse">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#CFA46A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="6" cy="6" r="3"/>
              <circle cx="6" cy="18" r="3"/>
              <line x1="20" y1="4" x2="8.12" y2="15.88"/>
              <line x1="14.47" y1="14.48" x2="20" y2="20"/>
              <line x1="8.12" y1="8.12" x2="12" y2="12"/>
            </svg>
          </div>
        </div>

        {/* Brand Name Typography */}
        <div className="space-y-1">
          <div className="text-[10px] font-sans font-bold uppercase tracking-[0.35em] text-[#CFA46A]">
            GLAM GIRL ATELIER
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#FAF6F0] tracking-widest font-normal uppercase">
            GLAM GIRL
          </h1>
          <div className="text-[11px] font-serif italic text-[#CFA46A] tracking-[0.25em] font-normal uppercase">
            BY JANKI
          </div>
        </div>

      </div>
    </div>
  );
}
