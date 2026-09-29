import React from 'react';
import { 
  Scissors, 
  Sparkles, 
  Hand, 
  Palette, 
  Flower2, 
  Sparkle,
  ArrowRight,
  Clock,
  Layers
} from 'lucide-react';
import ServiceCard from '../common/ServiceCard';

export default function CategorySection({
  category,
  services = [],
  onQuickBook,
  onViewDetails
}) {
  const getCategoryIcon = (catId) => {
    switch (catId) {
      case 'hair':
        return <Scissors className="w-5 h-5 text-brand-pink" />;
      case 'skin':
        return <Sparkles className="w-5 h-5 text-brand-pink" />;
      case 'nails':
        return <Hand className="w-5 h-5 text-brand-pink" />;
      case 'makeup':
        return <Palette className="w-5 h-5 text-brand-pink" />;
      case 'spa':
        return <Flower2 className="w-5 h-5 text-brand-pink" />;
      case 'waxing':
      default:
        return <Sparkle className="w-5 h-5 text-brand-pink" />;
    }
  };

  const getCategoryTagline = (catId) => {
    switch (catId) {
      case 'hair':
        return 'Precision haircuts, balayage couture, scalp rejuvenation & bridal hair artistry.';
      case 'skin':
        return 'Clinical-grade facials, 24K gold hydration, lymphatic therapy & glass skin rituals.';
      case 'nails':
        return 'Express gel manicures, luxury botanical pedicures & bespoke crystal nail art.';
      case 'makeup':
        return 'HD editorial glam, multicultural bridal looks & airbrush red-carpet finishing.';
      case 'spa':
        return 'Full body relaxation massage, Ayurvedic body polishes & sanctuary wellness retreats.';
      case 'waxing':
      default:
        return 'Gentle botanical waxing, precision brow threading & lash tinting treatments.';
    }
  };

  if (!services || services.length === 0) return null;

  return (
    <section 
      id={`services-${category.id}`} 
      className="py-10 sm:py-14 border-t border-white/10 first:border-t-0"
    >
      {/* Category Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#E95E92] text-[11px] font-bold uppercase tracking-wider">
            {getCategoryIcon(category.id)}
            <span>{category.name}</span>
            <span className="text-white/40">•</span>
            <span className="text-brand-pink-light font-mono">{services.length} Treatments</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            {category.name} Menu
          </h2>

          <p className="text-xs sm:text-sm text-[#F2ECE4]/70 leading-relaxed">
            {getCategoryTagline(category.id)}
          </p>
        </div>

        {/* Quick category jump badge */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-white/50 bg-white/5 px-4 py-2 rounded-full border border-white/10 self-start md:self-auto">
          <Clock className="w-3.5 h-3.5 text-brand-pink" />
          <span>Average Duration: 30–90 mins</span>
        </div>
      </div>

      {/* Services Grid for this Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onQuickBook={onQuickBook}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </section>
  );
}
