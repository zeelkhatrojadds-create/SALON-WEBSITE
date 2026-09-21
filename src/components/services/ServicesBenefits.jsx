import React from 'react';
import { ShieldCheck, Sparkles, Heart, Sparkle } from 'lucide-react';
import { SERVICE_BENEFITS } from '../../data/servicesData';

export default function ServicesBenefits() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-brand-pink" strokeWidth={1.8} />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-brand-pink" strokeWidth={1.8} />;
      case 'Sparkle':
        return <Sparkle className="w-5 h-5 sm:w-6 sm:h-6 text-brand-pink" strokeWidth={1.8} />;
      case 'Heart':
        return <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-brand-pink" strokeWidth={1.8} />;
      default:
        return <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-brand-pink" strokeWidth={1.8} />;
    }
  };

  return (
    <div className="py-6 sm:py-8 lg:py-10 px-4 sm:px-6 bg-white/5 rounded-3xl border border-white/10 shadow-xl backdrop-blur-md mb-8 sm:mb-12 lg:mb-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {SERVICE_BENEFITS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center p-2.5 sm:p-3 rounded-2xl group transition-all"
            >
              {/* Pink outline icon circle */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2.5 sm:mb-3.5 group-hover:scale-110 group-hover:border-brand-pink group-hover:bg-brand-pink/15 transition-all duration-300">
                {getIcon(item.icon)}
              </div>

              {/* Title */}
              <h3 className="font-serif font-bold text-white text-sm sm:text-base mb-1 group-hover:text-brand-pink-muted transition-colors">
                {item.title}
              </h3>

              {/* Subtitle */}
              <p className="text-white/60 text-[11px] sm:text-xs leading-relaxed max-w-[220px]">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
