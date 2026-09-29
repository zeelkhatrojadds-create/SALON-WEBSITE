import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ className = '', size = 'default' }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 sm:gap-3 transition-opacity hover:opacity-95 flex-shrink-0 ${className}`}>
      {/* Lotus line-art emblem in gold matching mockup */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <svg 
          viewBox="0 0 50 50" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`${
            size === 'lg' 
              ? 'w-10 h-10 sm:w-12 sm:h-12' 
              : size === 'sm' 
                ? 'w-7 h-7 sm:w-8 sm:h-8' 
                : 'w-8 h-8 sm:w-10 sm:h-10'
          } text-[#DDB88C] transition-transform group-hover:scale-105 duration-300`}
        >
          {/* Central Lotus Petal */}
          <path 
            d="M25 8C25 8 19 19 25 32C31 19 25 8 25 8Z" 
            stroke="#DDB88C" 
            strokeWidth="1.8" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Left Inner Petal */}
          <path 
            d="M25 32C19 28 14 18 16 12C20 16 23 24 25 32Z" 
            stroke="#DDB88C" 
            strokeWidth="1.6" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Right Inner Petal */}
          <path 
            d="M25 32C31 28 36 18 34 12C30 16 27 24 25 32Z" 
            stroke="#DDB88C" 
            strokeWidth="1.6" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Left Outer Petal */}
          <path 
            d="M25 34C16 33 9 25 10 18C15 22 20 28 25 34Z" 
            stroke="#DDB88C" 
            strokeWidth="1.4" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Right Outer Petal */}
          <path 
            d="M25 34C34 33 41 25 40 18C35 22 30 28 25 34Z" 
            stroke="#DDB88C" 
            strokeWidth="1.4" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Base Curved Line */}
          <path 
            d="M12 36C18 40 32 40 38 36" 
            stroke="#DDB88C" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
          />
        </svg>
      </div>

      {/* Brand Name & Subtitle */}
      <div className="flex flex-col min-w-0">
        <span className={`font-serif font-semibold tracking-[0.08em] text-white transition-colors truncate ${
          size === 'lg' 
            ? 'text-xl sm:text-2xl md:text-3xl' 
            : size === 'sm' 
              ? 'text-sm sm:text-base' 
              : 'text-base sm:text-lg md:text-xl'
        }`}>
          LUMÉ
        </span>
        <span className="font-sans uppercase tracking-[0.28em] text-[8px] sm:text-[9px] font-medium text-[#DDB88C] -mt-0.5 truncate">
          BEAUTY STUDIO
        </span>
      </div>
    </Link>
  );
}

