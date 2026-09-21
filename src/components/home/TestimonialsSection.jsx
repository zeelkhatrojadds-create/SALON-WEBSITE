import React from 'react';
import { Star, Quote, Heart } from 'lucide-react';
import { TESTIMONIALS } from '../../data/salonData';

export default function TestimonialsSection() {
  return (
    <section className="w-full py-16 sm:py-24 bg-[#FAF7F2] relative overflow-hidden">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-20 mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-pink-light border border-brand-pink/20 mb-3">
            <Heart className="w-3.5 h-3.5 text-brand-pink" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">
              CLIENT LOVE
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-espresso mb-4">
            Loved By Ottawa’s Finest
          </h2>
          <p className="text-brand-charcoal/80 text-sm sm:text-base">
            Read why hundreds of girls and women trust Girl Looked For You for their hair, skin, and bridal makeovers.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-brand-border/80 flex flex-col justify-between hover:shadow-hover transition-all duration-300 relative group hover:-translate-y-1"
            >
              <div>
                {/* Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-brand-pink-muted/30 group-hover:text-brand-pink/40 transition-colors" />
                </div>

                {/* Review Text */}
                <p className="text-brand-charcoal text-sm leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
              </div>

              {/* Author Details */}
              <div className="pt-4 border-t border-brand-border/60 flex items-center gap-3.5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-pink/30"
                />
                <div>
                  <h4 className="font-serif font-bold text-brand-espresso text-base">{t.name}</h4>
                  <p className="text-xs text-brand-muted">{t.role}</p>
                  <span className="inline-block text-[11px] font-medium text-brand-pink mt-0.5">
                    {t.service}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
