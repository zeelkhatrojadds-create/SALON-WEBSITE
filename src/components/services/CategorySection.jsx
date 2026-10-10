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
        return <Scissors className="w-5 h-5 text-[#263D2B]" />;
      case 'skin':
        return <Sparkles className="w-5 h-5 text-[#263D2B]" />;
      case 'nails':
        return <Hand className="w-5 h-5 text-[#263D2B]" />;
      case 'makeup':
        return <Palette className="w-5 h-5 text-[#263D2B]" />;
      case 'spa':
        return <Flower2 className="w-5 h-5 text-[#263D2B]" />;
      case 'waxing':
      default:
        return <Sparkle className="w-5 h-5 text-[#263D2B]" />;
    }
  };

  const getCategoryTagline = (catId) => {
    switch (catId) {
      case 'hair':
        return 'Precision haircuts, balayage couture, scalp rejuvenation & bridal hair artistry.';
      case 'skin':
        return 'Clinical-grade facials, cellular hydration, lymphatic therapy & glass skin rituals.';
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
      className="py-10 sm:py-14 border-t border-[#DCE1D8] first:border-t-0"
    >
      {/* Category Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div className="space-y-2 max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#263D2B]/10 border border-[#263D2B]/20 text-[#263D2B] text-[11px] font-bold uppercase tracking-wider">
            {getCategoryIcon(category.id)}
            <span>{category.name}</span>
            <span className="text-[#6B7068]">•</span>
            <span className="text-[#465640] font-mono">{services.length} Treatments</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#10110F] tracking-tight">
            {category.name} Menu
          </h2>

          <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed">
            {getCategoryTagline(category.id)}
          </p>
        </div>

        {/* Quick category jump badge */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-[#6B7068] bg-white px-4 py-2 rounded-full border border-[#DCE1D8] self-start md:self-auto shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
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
