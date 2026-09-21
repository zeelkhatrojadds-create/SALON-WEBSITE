import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Coffee, ShieldCheck, Check, ArrowRight } from 'lucide-react';

export default function ExperienceSection() {
  const highlights = [
    'Private VIP Bridal & Glamour Suites in Central Ottawa',
    'Certified master stylists with 10+ years European & Indian training',
    'Cruelty-free, organic and 100% ammonia-free color formulations',
    'Complimentary Kashmiri Chai & Organic Herbal Teas with every visit',
    'Medical-grade sterilization for all nail, hair and facial tools'
  ];

  return (
    <section className="w-full py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-20 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Image Showcase Composition */}
          <div className="lg:col-span-6 relative">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-brand-pink-light/60 aspect-[4/3] sm:aspect-[16/11]">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80"
                alt="Glow & Grace Luxury Ottawa Salon Interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Overlapping Floating Badge */}
            <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:right-6 bg-[#FAF7F2] p-4 sm:p-6 rounded-3xl shadow-xl border border-brand-pink/20 max-w-xs animate-float">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-brand-pink text-white flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-serif font-bold text-brand-espresso text-base sm:text-lg">#1 Girls Salon</div>
                  <div className="text-[11px] text-brand-muted uppercase tracking-wider">Ottawa Readers' Choice</div>
                </div>
              </div>
              <p className="text-xs text-brand-charcoal/80">
                Crafting timeless confidence and radiant beauty every day.
              </p>
            </div>
          </div>

          {/* Right: Copy & Features */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-pink-light border border-brand-pink/20">
              <Heart className="w-3.5 h-3.5 text-brand-pink" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">
                THE GIRL LOOKED FOR YOU SANCTUARY
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-espresso leading-tight">
              A Warm, Luxurious Retreat For Every Woman.
            </h2>

            <p className="text-brand-charcoal/80 text-sm sm:text-base leading-relaxed">
              Step into an intimate oasis where modern European styling meets the rich nourishing traditions of Ayurvedic botanicals. Located in the heart of Ottawa, Girl Looked For You is designed exclusively to celebrate your distinct glow.
            </p>

            {/* Bullet Points */}
            <div className="space-y-3 pt-2">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-pink-light text-brand-pink flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-brand-charcoal font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Link */}
            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-brand-pink font-semibold text-sm hover:text-brand-pink-hover underline underline-offset-4 decoration-brand-pink/40 hover:decoration-brand-pink transition-all"
              >
                <span>Read our story & philosophy</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
