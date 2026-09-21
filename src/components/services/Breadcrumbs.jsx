import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ treatmentName, categoryName, categorySlug }) {
  return (
    <nav className="flex items-center space-x-2 text-xs sm:text-sm text-white/60 mb-6 sm:mb-8 overflow-x-auto whitespace-nowrap pb-1">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-brand-pink transition-colors text-white/80"
      >
        <Home className="w-3.5 h-3.5 text-brand-pink" />
        <span>Home</span>
      </Link>

      <ChevronRight className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />

      <Link
        to="/services"
        className="hover:text-brand-pink transition-colors text-white/80"
      >
        Services
      </Link>

      {categoryName && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
          <Link
            to={`/services?category=${categorySlug || 'all'}`}
            className="hover:text-brand-pink transition-colors text-white/60"
          >
            {categoryName}
          </Link>
        </>
      )}

      <ChevronRight className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />

      <span className="font-semibold text-brand-pink-muted truncate max-w-[200px] sm:max-w-none">
        {treatmentName}
      </span>
    </nav>
  );
}
