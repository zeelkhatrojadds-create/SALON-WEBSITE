import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear, totalResults }) {
  return (
    <div className="w-full max-w-2xl mx-auto px-1">
      <div className="relative flex items-center">
        <div className="absolute left-4 sm:left-5 pointer-events-none text-white/50">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-brand-pink" />
        </div>

        <input
          type="text"
          aria-label="Search treatments"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search treatments (e.g. Haircut, Balayage, Facial, Nails)..."
          className="w-full pl-11 sm:pl-13 pr-10 sm:pr-12 min-h-[46px] py-3 sm:py-4 bg-white/5 border border-white/15 rounded-full text-xs sm:text-sm md:text-base text-white placeholder-white/40 shadow-xl focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/30 backdrop-blur-md transition-all"
        />

        {value && (
          <button
            onClick={onClear}
            className="absolute right-3 sm:right-4 w-8 h-8 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {value && (
        <div className="mt-2 text-center text-[11px] sm:text-xs text-white/60">
          Found <strong className="text-white font-semibold">{totalResults}</strong> treatments for "<span className="text-brand-pink-muted">{value}</span>"
        </div>
      )}
    </div>
  );
}
