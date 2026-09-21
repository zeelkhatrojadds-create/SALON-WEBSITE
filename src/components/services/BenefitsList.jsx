import React from 'react';
import { Check } from 'lucide-react';

export default function BenefitsList({ benefits = [] }) {
  if (!benefits || benefits.length === 0) return null;

  return (
    <div className="space-y-2.5 sm:space-y-3 my-4 sm:my-6">
      {benefits.map((benefit, index) => (
        <div 
          key={index}
          className="flex items-center gap-3 text-sm sm:text-base text-white/90 group"
        >
          {/* Vibrant Red/Pink Checkmark */}
          <div className="w-5 h-5 rounded-md bg-brand-pink/20 border border-brand-pink/40 flex items-center justify-center flex-shrink-0 text-brand-pink group-hover:bg-brand-pink group-hover:text-white transition-colors">
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>

          <span className="font-medium text-white/90">{benefit}</span>
        </div>
      ))}
    </div>
  );
}
