import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ theme = 'dark', className = '', onClick }) {
  const isLight = theme === 'light';

  const handleClick = (e) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link
      to="/"
      onClick={handleClick}
      className={`group inline-flex flex-col items-start justify-center transition-all duration-300 hover:opacity-90 flex-shrink-0 cursor-pointer select-none ${className}`}
      title="GLAM GIRL By Janki Atelier — Return to Home Page"
    >
      {/* Brand Title: Crisp Luxury Serif Typography */}
      <span className={`font-serif text-[20px] sm:text-[24px] lg:text-[26px] font-normal tracking-[0.16em] uppercase leading-none ${
        isLight
          ? 'text-[#161012]'
          : 'text-[#FAF6F0] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]'
      }`}>
        GLAM GIRL
      </span>
      {/* Sub-label: Atelier Signature */}
      <span className={`text-[8px] sm:text-[9px] lg:text-[9.5px] font-semibold tracking-[0.32em] uppercase mt-1.5 leading-none ${
        isLight
          ? 'text-[#A67C48]'
          : 'text-[#CFA46A] drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]'
      }`}>
        BY JANKI - ATELIER
      </span>
    </Link>
  );
}
