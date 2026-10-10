import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ theme = 'light', className = '', onClick }) {
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
      className={`group inline-flex flex-col items-center justify-center transition-all duration-300 hover:opacity-95 flex-shrink-0 cursor-pointer select-none ${className}`}
      title="GLAM GIRL BY JANKI — Ottawa Women's Beauty Studio"
    >
      {/* Botanical Leaf Motif (Reference Emblem) */}
      <svg 
        className="w-4 h-4 mb-0.5 text-[#263D2B] group-hover:text-[#465640] transition-colors flex-shrink-0" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M12 21C12 21 12 12 12 7C12 2 17 2 17 2C17 2 17 7 17 12C17 17 12 21 12 21Z" />
        <path d="M12 14C9.5 12.5 7 12 7 12C7 12 7.5 15 9.5 16.5C11 17.5 12 17 12 17" />
        <path d="M12 9C9.5 7.5 6.5 8 6.5 8C6.5 8 7 11.5 9 12.5" />
      </svg>

      {/* Brand Title */}
      <span className="font-serif text-[18px] sm:text-[20px] font-normal tracking-[0.2em] uppercase leading-tight text-[#10110F]">
        GLAM GIRL
      </span>

      {/* Sub-label */}
      <span className="text-[7.5px] sm:text-[8px] font-bold tracking-[0.28em] uppercase mt-0.5 leading-none text-[#6B7068]">
        OTTAWA • WOMEN'S BEAUTY STUDIO
      </span>
    </Link>
  );
}
