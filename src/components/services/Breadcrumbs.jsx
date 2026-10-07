import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ treatmentName, categoryName, categorySlug }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs sm:text-sm text-[#E0D5C7]/70 mb-6 sm:mb-8 overflow-x-auto whitespace-nowrap pb-1">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-[#CFA46A] transition-colors text-[#F7F1E8]"
      >
        <Home className="w-3.5 h-3.5 text-[#CFA46A]" />
        <span>Home</span>
      </Link>

      <ChevronRight className="w-3.5 h-3.5 text-[#CFA46A]/50 flex-shrink-0" />

      <Link
        to="/services"
        className="hover:text-[#CFA46A] transition-colors text-[#F7F1E8]"
      >
        Services
      </Link>

      {categoryName && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-[#CFA46A]/50 flex-shrink-0" />
          {treatmentName ? (
            <Link
              to={`/services/${categorySlug || 'all'}`}
              className="hover:text-[#CFA46A] transition-colors text-[#F7F1E8]"
            >
              {categoryName}
            </Link>
          ) : (
            <span className="font-medium text-[#CFA46A] truncate max-w-[200px] sm:max-w-none">
              {categoryName}
            </span>
          )}
        </>
      )}

      {treatmentName && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-[#CFA46A]/50 flex-shrink-0" />
          <span className="font-medium text-[#CFA46A] truncate max-w-[240px] sm:max-w-none">
            {treatmentName}
          </span>
        </>
      )}
    </nav>
  );
}
