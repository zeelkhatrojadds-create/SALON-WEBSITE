import React from 'react';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';

export default function FeatureStrip() {
  const features = [
    {
      number: '01',
      title: 'PERSONALIZED CARE',
      description: 'Tailored diagnostics and bespoke rituals designed for your unique skin and hair texture.',
      icon: Sparkles
    },
    {
      number: '02',
      title: 'PREMIUM BEAUTY',
      description: '100% clean, cruelty-free luxury formulas with medical-grade sterilized instruments.',
      icon: ShieldCheck
    },
    {
      number: '03',
      title: 'WOMEN-FOCUSED EXPERIENCE',
      description: 'An intimate, peaceful sanctuary in Central Ottawa crafted for your comfort and confidence.',
      icon: Heart
    }
  ];

  return (
    <section className="w-full bg-[#181014] border-y border-white/10 py-8 sm:py-12 relative text-white">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-20 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {features.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className={`flex items-start gap-4 sm:gap-5 ${
                  index > 0 ? 'pt-6 md:pt-0 md:pl-8 lg:pl-12' : ''
                } group`}
              >
                {/* Number Badge with Pink Accent */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <span className="font-serif font-bold text-2xl sm:text-3xl text-brand-pink-muted tracking-tight">
                    {item.number}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-pink mt-1 group-hover:bg-brand-pink group-hover:text-white transition-colors">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <h3 className="font-sans font-bold text-xs sm:text-sm tracking-[0.18em] uppercase text-white group-hover:text-brand-pink transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
