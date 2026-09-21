import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ALL_SERVICES } from '../../data/servicesData';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
      setSelectedCategory('all');
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredServices = ALL_SERVICES.filter((service) => {
    const matchesQuery = 
      service.name.toLowerCase().includes(query.toLowerCase()) ||
      service.description.toLowerCase().includes(query.toLowerCase()) ||
      service.categoryName.toLowerCase().includes(query.toLowerCase());
    const matchesCat = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesQuery && matchesCat;
  });

  const handleSelectService = (serviceId) => {
    onClose();
    navigate(`/booking?service=${serviceId}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-2.5 sm:px-4 bg-brand-espresso/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-brand-pink-soft animate-scale-up my-auto sm:my-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative p-3.5 sm:p-5 border-b border-brand-border flex items-center gap-2.5 sm:gap-3 bg-brand-cream/50">
          <Search className="w-5 h-5 text-brand-pink flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 86 hair, facials, waxing, nails, makeup rituals..."
            className="w-full bg-transparent text-brand-espresso placeholder-brand-muted text-xs sm:text-base focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 hover:bg-brand-pink-light text-brand-muted hover:text-brand-pink rounded-full transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-brand-pink-light text-brand-muted hover:text-brand-pink rounded-full transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="px-3.5 sm:px-6 py-2.5 sm:py-3 bg-brand-ivory/60 border-b border-brand-border flex items-center gap-1.5 sm:gap-2 overflow-x-auto text-xs scrollbar-none">
          <span className="text-brand-muted font-medium whitespace-nowrap text-[11px] sm:text-xs">Category:</span>
          {['all', 'hair', 'skin', 'waxing', 'nails', 'makeup', 'spa'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`min-h-[32px] px-2.5 sm:px-3 py-1 rounded-full capitalize font-medium transition-all whitespace-nowrap cursor-pointer text-[11px] sm:text-xs flex-shrink-0 ${
                selectedCategory === cat
                  ? 'bg-brand-pink text-white shadow-xs'
                  : 'bg-white text-brand-charcoal hover:bg-brand-pink-light'
              }`}
            >
              {cat === 'all' ? 'All' : cat === 'waxing' ? 'Waxing' : cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[55vh] sm:max-h-[60vh] overflow-y-auto p-2.5 sm:p-5 divide-y divide-brand-border/60">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div
                key={service.id}
                className="py-2.5 sm:py-3 px-2 sm:px-3 hover:bg-brand-pink-light/40 rounded-2xl flex items-center justify-between gap-2.5 sm:gap-4 transition-colors group cursor-pointer"
                onClick={() => handleSelectService(service.id)}
              >
                <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border border-brand-pink/20 flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-brand-pink truncate">
                        {service.categoryName}
                      </span>
                      <span className="text-[10px] sm:text-xs text-brand-muted truncate">• {service.duration}</span>
                    </div>
                    <h4 className="font-serif font-medium text-brand-espresso text-xs sm:text-base group-hover:text-brand-pink transition-colors truncate">
                      {service.name}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  <span className="font-serif font-bold text-brand-espresso text-xs sm:text-base">
                    CA${service.price}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectService(service.id);
                    }}
                    className="min-h-[36px] bg-brand-pink hover:bg-brand-pink-hover text-white text-[11px] sm:text-xs font-medium px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full flex items-center gap-1 shadow-xs transition-transform active:scale-95 cursor-pointer"
                  >
                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>Book</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-10 text-center text-brand-muted">
              <p className="text-sm sm:text-base font-medium">No salon services found matching "{query}"</p>
              <p className="text-xs mt-1">Try searching for "Balayage", "Facial", "Manicure", or "Spa"</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-brand-cream/70 border-t border-brand-border text-[10px] sm:text-xs text-brand-muted flex items-center justify-between">
          <span>Ottawa, Canada • 450 Bank St</span>
          <span className="text-[10px] sm:text-[11px]">Showing {filteredServices.length} of 86 rituals</span>
        </div>
      </div>
    </div>
  );
}
