import React from 'react';
import { CATEGORIES } from '../../data/servicesData';
import { CategoryIcon } from '../common/CategoryIcons';
import { Sparkles } from 'lucide-react';

export default function CategoryFilter({ selectedCategory, onSelectCategory, counts = {} }) {
  return (
    <div className="w-full">
      {/* Clean responsive flex-wrap layout so all category pills fit perfectly without cutoff */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 md:gap-3 max-w-6xl mx-auto px-2 sm:px-4 py-2">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = counts[cat.id];

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`min-h-[42px] sm:min-h-[44px] flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-brand-pink text-white shadow-lg shadow-brand-pink/30 scale-[1.02]'
                  : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat.id === 'all' ? (
                <Sparkles className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${isSelected ? 'text-white' : 'text-brand-pink-muted'}`} />
              ) : (
                <CategoryIcon 
                  type={cat.id} 
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${isSelected ? 'text-white' : 'text-brand-pink-muted'}`} 
                />
              )}

              <span className="whitespace-nowrap">{cat.name}</span>

              {typeof count === 'number' && (
                <span
                  className={`text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-white/10 text-white/60'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
