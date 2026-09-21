import React from 'react';

export function CategoryIcon({ type, className = 'w-6 h-6' }) {
  switch (type) {
    case 'hair':
    case 'hair-care':
      return (
        /* Woman with styled hair icon matching reference */
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M16 4C11.5 4 8 7.5 8 12C8 16.5 10 18.5 10 22C10 23.5 11 25 12.5 25.5C14 26 15 25 16 25C17 25 18 26 19.5 25.5C21 25 22 23.5 22 22C22 18.5 24 16.5 24 12C24 7.5 20.5 4 16 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 14C12.5 16 14.5 17 16 17C17.5 17 19.5 16 21 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M16 17V20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M13 11C13 11 14.5 12 16 12C17.5 12 19 11 19 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M6 16C6 19.5 7.5 23 10 25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M26 16C26 19.5 24.5 23 22 25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'skin':
    case 'skin-care':
      return (
        /* Face sparkle / skincare icon matching reference */
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M16 6C10.5 6 7 10.5 7 16C7 21.5 10.5 26 16 26C21.5 26 25 21.5 25 16C25 10.5 21.5 6 16 6Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12 15C12.8 15 13.5 14.3 13.5 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M20 15C19.2 15 18.5 14.3 18.5 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M13.5 19.5C14.5 21 17.5 21 18.5 19.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          {/* Sparkle top right */}
          <path d="M25 6L26 8.5L28.5 9.5L26 10.5L25 13L24 10.5L21.5 9.5L24 8.5L25 6Z" fill="currentColor" />
          <path d="M6 10L6.7 11.8L8.5 12.5L6.7 13.2L6 15L5.3 13.2L3.5 12.5L5.3 11.8L6 10Z" fill="currentColor" />
        </svg>
      );

    case 'nails':
    case 'nail-care':
      return (
        /* Nail / nail polish icon matching reference */
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Finger / Nail shape */}
          <rect x="11" y="6" width="10" height="20" rx="5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M11 12C11 9.5 13 8 16 8C19 8 21 9.5 21 12V14H11V12Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.6" />
          <path d="M13 10.5C13.5 9.5 14.5 9 16 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          {/* Sparkle sparkle */}
          <path d="M23 5L23.8 6.8L25.5 7.5L23.8 8.2L23 10L22.2 8.2L20.5 7.5L22.2 6.8L23 5Z" fill="currentColor" />
        </svg>
      );

    case 'makeup':
      return (
        /* Lipstick & Cosmetic icon matching reference */
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Lipstick base */}
          <rect x="11" y="15" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M11 20H21" stroke="currentColor" strokeWidth="1.5" />
          {/* Lipstick slant top */}
          <path d="M13 15V10C13 10 13.5 8 15 6L19 9.5V15H13Z" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.2" strokeLinejoin="round" />
          {/* Sparkle */}
          <path d="M24 8L24.7 9.5L26.2 10.2L24.7 10.9L24 12.4L23.3 10.9L21.8 10.2L23.3 9.5L24 8Z" fill="currentColor" />
        </svg>
      );

    case 'spa':
    case 'spa-wellness':
      return (
        /* Lotus flower wellness icon matching reference */
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Center petal */}
          <path d="M16 6C14 10 13 15 16 22C19 15 18 10 16 6Z" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.15" strokeLinejoin="round" />
          {/* Left petal */}
          <path d="M16 22C11 21 8 16 9 11C12 13 14 17 16 22Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          {/* Right petal */}
          <path d="M16 22C21 21 24 16 23 11C20 13 18 17 16 22Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          {/* Base bottom leaf line */}
          <path d="M7 23C11 25.5 21 25.5 25 23" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
  }
}
