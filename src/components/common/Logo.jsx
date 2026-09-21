import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ className = '', variant = 'default', size = 'default' }) {
  const isDark = variant === 'dark';
  
  return (
    <Link to="/" className={`group inline-flex items-center gap-2 sm:gap-3 transition-opacity hover:opacity-95 flex-shrink-0 ${className}`}>
      {/* Delicate feminine line-art logo icon */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <svg 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`${
            size === 'lg' 
              ? 'w-10 h-10 sm:w-12 sm:h-12' 
              : size === 'sm' 
                ? 'w-7 h-7 sm:w-8 sm:h-8' 
                : 'w-8 h-8 sm:w-10 sm:h-10'
          } text-brand-pink transition-transform group-hover:scale-105 duration-300`}
        >
          {/* Soft outer glow circle */}
          <circle cx="24" cy="24" r="22" className="fill-brand-pink/10 stroke-brand-pink/30" strokeWidth="1" />
          
          {/* Woman profile delicate line art */}
          <path 
            d="M20 12C23 10 27 11 29 13.5C31 16 31 19 29.5 21C28 23 27 24 27.5 26.5C28 29 29.5 31 29 33.5C28.5 36 26.5 37 25 38" 
            stroke="#D83A75" 
            strokeWidth="1.6" 
            strokeLinecap="round" 
          />
          <path 
            d="M23 16C23 16 26 17 26 19.5C26 22 24 23 24 25C24 27 25.5 29 25 31" 
            stroke="#D83A75" 
            strokeWidth="1.4" 
            strokeLinecap="round" 
          />
          {/* Hair flow curves */}
          <path 
            d="M17 18C15 21 15 26 17 30C19 34 22 36 24 37" 
            stroke="#8A234B" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
          />
          <path 
            d="M15 22C13 25 13.5 29 15.5 33" 
            stroke="#D83A75" 
            strokeWidth="1.2" 
            strokeLinecap="round" 
          />
          {/* Floral leaf petal accent */}
          <path 
            d="M31 31C34 29 36 31 35 34C33 36 31 34 31 31Z" 
            fill="#8A234B" 
          />
          <path 
            d="M34 27C36.5 26 38 27.5 37 29.5C35.5 31 34 29.5 34 27Z" 
            fill="#D83A75" 
          />
        </svg>
      </div>

      {/* Brand Name & Subtitle */}
      <div className="flex flex-col min-w-0">
        <span className={`font-serif font-bold tracking-tight transition-colors truncate ${
          size === 'lg' 
            ? 'text-xl sm:text-2xl md:text-3xl' 
            : size === 'sm' 
              ? 'text-sm sm:text-base' 
              : 'text-sm sm:text-lg md:text-xl'
        } ${isDark ? 'text-white' : 'text-brand-espresso'}`}>
          GIRL LOOKED FOR YOU
        </span>
        <span className={`font-sans uppercase tracking-[0.18em] sm:tracking-[0.24em] text-[8px] sm:text-[9px] md:text-[10px] font-semibold -mt-0.5 truncate ${
          isDark ? 'text-brand-pink-muted' : 'text-brand-pink'
        }`}>
          Women's Beauty & Wellness
        </span>
      </div>
    </Link>
  );
}
