import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ALL_SERVICES, CATEGORIES } from '../../data/servicesData';
import ServiceCard from '../common/ServiceCard';

export default function ServicesPreview({ selectedCategory, onSelectCategory }) {
  const [activeTab, setActiveTab] = useState(selectedCategory || 'all');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (selectedCategory) {
      setActiveTab(selectedCategory);
    }
  }, [selectedCategory]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (onSelectCategory) {
      onSelectCategory(tabId);
    }
  };

  const filteredServices = activeTab === 'all'
    ? ALL_SERVICES
    : ALL_SERVICES.filter((s) => s.category === activeTab);

  const handleQuickBook = (service) => {
    navigate(`/book-appointment?service=${service.id}`);
  };

  const handleViewDetails = (service) => {
    navigate(`/book-appointment?service=${service.id}`);
  };

  return (
    <section id="services-section" className="w-full py-16 sm:py-24 bg-[#FAF7F2] relative">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-20 mx-auto relative z-10">
        
        {/* Section Header Matching Reference */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-pink-light border border-brand-pink/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">
              OUR SERVICES
            </span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-espresso tracking-tight mb-4">
            Beauty & Wellness Services
          </h2>

          <p className="text-brand-charcoal/80 text-base sm:text-lg leading-relaxed">
            From hair care to skin care, we offer everything you need to feel your best.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10 sm:mb-14">
          <button
            onClick={() => handleTabChange('all')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'all'
                ? 'bg-brand-pink text-white shadow-md shadow-brand-pink/20'
                : 'bg-white text-brand-charcoal hover:bg-brand-pink-light/60 border border-brand-border'
            }`}
          >
            All Services ({ALL_SERVICES.length})
          </button>

          {CATEGORIES.map((cat) => {
            if (cat.id === 'all') return null;
            return (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === cat.id
                    ? 'bg-brand-pink text-white shadow-md shadow-brand-pink/20'
                    : 'bg-white text-brand-charcoal hover:bg-brand-pink-light/60 border border-brand-border'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Full-width Responsive Grid (4 columns on lg/xl) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {filteredServices.slice(0, 8).map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onQuickBook={handleQuickBook}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* View All Services CTA Button */}
        <div className="mt-14 sm:mt-16 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2.5 bg-white hover:bg-brand-pink hover:text-white text-brand-espresso font-medium text-sm sm:text-base px-9 py-4 rounded-full border border-brand-border hover:border-brand-pink shadow-card hover:shadow-hover transition-all duration-300 group cursor-pointer"
          >
            <span>Explore Full Treatment Menu ({ALL_SERVICES.length} Services)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
