import React from 'react';
import { ShieldCheck, Sparkles, Clock, Heart } from 'lucide-react';
import { BENEFITS } from '../../data/salonData';

export default function BenefitsSection() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-brand-pink" strokeWidth={1.8} />;
      case 'Sparkles':
        return (
          /* Lotus flower icon matching reference */
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-7 sm:h-7 text-brand-pink">
            <path d="M16 6C14 10 13 15 16 22C19 15 18 10 16 6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M16 22C11 21 8 16 9 11C12 13 14 17 16 22Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M16 22C21 21 24 16 23 11C20 13 18 17 16 22Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M7 23C11 25.5 21 25.5 25 23" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        );
      case 'Clock':
        return <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-brand-pink" strokeWidth={1.8} />;
      case 'Heart':
        return <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-brand-pink" strokeWidth={1.8} />;
      default:
        return <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-brand-pink" strokeWidth={1.8} />;
    }
  };

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-[#FAF7F2] border-b border-brand-border/60">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-20 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.id}
              className="flex flex-col items-center text-center p-4 sm:p-6 rounded-3xl transition-all duration-300 hover:bg-white/80 group"
            >
              {/* Pink outline icon circle */}
              <div className="w-16 h-16 rounded-full bg-white border border-brand-pink-soft flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:border-brand-pink group-hover:bg-brand-pink-light/40 transition-all duration-300">
                {getIcon(benefit.icon)}
              </div>

              {/* Title */}
              <h3 className="font-serif font-bold text-brand-espresso text-lg sm:text-xl mb-2 group-hover:text-brand-pink transition-colors">
                {benefit.title}
              </h3>

              {/* Subtitle */}
              <p className="text-brand-muted text-sm sm:text-[15px] leading-relaxed max-w-[260px]">
                {benefit.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
