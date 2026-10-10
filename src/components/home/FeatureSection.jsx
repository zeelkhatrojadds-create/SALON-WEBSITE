import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function FeatureSection() {
  return (
    <section className="w-full bg-[#F7F4ED] py-20 sm:py-28 border-t border-[#DCE1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Large image */}
          <div className="relative overflow-hidden rounded-2xl border border-[#DCE1D8] shadow-md bg-white">
            <div className="aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:h-[580px]">
              <img
                src="/images/services/makeup/44-shringar-bridal-makeup.webp"
                alt="Luxury beauty experience at Glam Girl By Janki"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#10110F]/20 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6 lg:pl-4">
            <div className="inline-flex items-center gap-3 text-[#263D2B]">
              <span className="w-8 h-px bg-[#263D2B]/50" />
              <span className="font-sans text-[11px] uppercase tracking-[0.22em] font-semibold">The Experience</span>
            </div>

            <h2 className="font-serif font-normal text-[#10110F] text-[36px] sm:text-[48px] lg:text-[54px] leading-[0.95]">
              Your Moment.<br />
              <span className="italic text-[#263D2B]">Your Glow.</span>
            </h2>

            <p className="font-sans text-[#6B7068] text-sm sm:text-base leading-relaxed max-w-md">
              At Glam Girl By Janki, every appointment is a personal ritual. We believe beauty is not just about appearance — it's about how you feel walking out of our studio: confident, radiant, and completely yourself.
            </p>

            <div className="grid grid-cols-2 gap-4 py-4 border-t border-[#DCE1D8]">
              {[
                { label: 'Personalized Experience', desc: 'Every treatment tailored to you' },
                { label: 'Premium Products', desc: 'Only the finest used on your skin' },
                { label: 'Time-Tested Techniques', desc: 'Ancient beauty wisdom, modern results' },
                { label: 'Private Studio', desc: 'Comfortable & welcoming environment' },
              ].map(({ label, desc }) => (
                <div key={label} className="space-y-1">
                  <div className="w-4 h-px bg-[#263D2B]" />
                  <p className="font-serif text-[#10110F] text-[13px]">{label}</p>
                  <p className="font-sans text-[#6B7068] text-xs">{desc}</p>
                </div>
              ))}
            </div>

            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 bg-[#263D2B] hover:bg-[#1C2E20] text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-200 hover:scale-[1.02] shadow-md"
            >
              DISCOVER OUR SERVICES <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
