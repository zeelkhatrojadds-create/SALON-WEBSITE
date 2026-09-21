import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../data/salonData';
import { CategoryIcon } from '../common/CategoryIcons';

export default function CategoryBar({ selectedCategory, onSelectCategory }) {
  const navigate = useNavigate();

  const handleCategoryClick = (catId) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    // Also scroll smoothly to services section if on homepage
    const servicesElement = document.getElementById('services-section');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/services?category=${catId}`);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl sm:rounded-full py-4 px-4 sm:px-8 shadow-card border border-brand-border/80 transition-all duration-300 hover:shadow-hover">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4 items-center justify-items-center">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`group flex flex-col items-center gap-2 p-2 sm:p-2.5 rounded-2xl transition-all duration-300 w-full hover:-translate-y-1 ${
                  isSelected ? 'scale-105' : 'opacity-90 hover:opacity-100'
                }`}
              >
                {/* Pink Circular Icon Container */}
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 border ${
                    isSelected
                      ? 'bg-brand-pink text-white border-brand-pink shadow-md shadow-brand-pink/30'
                      : 'bg-brand-pink-light/70 text-brand-pink border-brand-pink-soft group-hover:bg-brand-pink group-hover:text-white group-hover:border-brand-pink group-hover:shadow-md'
                  }`}
                >
                  <CategoryIcon type={cat.id} className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>

                {/* Category Label */}
                <span
                  className={`text-xs sm:text-sm font-medium tracking-tight text-center transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'text-brand-pink font-semibold'
                      : 'text-brand-charcoal group-hover:text-brand-pink'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
