import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ treatmentName, categoryName, categorySlug }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs sm:text-sm text-[#6B7068] mb-6 sm:mb-8 overflow-x-auto whitespace-nowrap pb-1">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-[#263D2B] transition-colors text-[#10110F]"
      >
        <Home className="w-3.5 h-3.5 text-[#263D2B]" />
        <span>Home</span>
      </Link>

      <ChevronRight className="w-3.5 h-3.5 text-[#6B7068]/40 flex-shrink-0" />

      <Link
        to="/services"
        className="hover:text-[#263D2B] transition-colors text-[#10110F]"
      >
        Services
      </Link>

      {categoryName && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-[#6B7068]/40 flex-shrink-0" />
          {treatmentName ? (
            <Link
              to={`/services/${categorySlug || 'all'}`}
              className="hover:text-[#263D2B] transition-colors text-[#10110F]"
            >
              {categoryName}
            </Link>
          ) : (
            <span className="font-medium text-[#263D2B] truncate max-w-[200px] sm:max-w-none">
              {categoryName}
            </span>
          )}
        </>
      )}

      {treatmentName && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-[#6B7068]/40 flex-shrink-0" />
          <span className="font-medium text-[#263D2B] truncate max-w-[240px] sm:max-w-none">
            {treatmentName}
          </span>
        </>
      )}
    </nav>
  );
}
