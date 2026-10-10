import React from 'react';
import { Check } from 'lucide-react';

export default function BenefitsList({ benefits = [] }) {
  if (!benefits || benefits.length === 0) return null;

  return (
    <div className="space-y-2.5 sm:space-y-3 my-4 sm:my-6">
      {benefits.map((benefit, index) => (
        <div 
          key={index}
          className="flex items-center gap-3 text-sm sm:text-base text-[#10110F] group font-sans"
        >
          {/* Forest Green Checkmark */}
          <div className="w-5 h-5 rounded-md bg-[#263D2B]/10 border border-[#263D2B]/30 flex items-center justify-center flex-shrink-0 text-[#263D2B] group-hover:bg-[#263D2B] group-hover:text-white transition-colors">
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>

          <span className="font-medium text-[#10110F]">{benefit}</span>
        </div>
      ))}
    </div>
  );
}
