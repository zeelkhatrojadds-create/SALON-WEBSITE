import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function FeatureSection() {
  return (
    <section className="w-full bg-[#1A1617] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Large image */}
          <div className="relative overflow-hidden">
            <div className="aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:h-[580px]">
              <img
                src="/images/services/makeup/44-shringar-bridal-makeup.webp"
                alt="Luxury beauty experience at Glam Girl By Janki"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A1617]/40 to-transparent pointer-events-none" />
            </div>
            {/* Gold border accent */}
            <div className="absolute inset-0 ring-1 ring-[#CFA46A]/20 pointer-events-none" />
          </div>

          {/* Text */}
          <div className="space-y-6 lg:pl-4">
            <div className="inline-flex items-center gap-3 text-[#CFA46A]">
              <span className="w-8 h-px bg-[#CFA46A]/50" />
              <span className="font-body text-[11px] uppercase tracking-[0.22em]">The Experience</span>
            </div>

            <h2 className="font-display font-normal text-[#F7F1E8] text-[36px] sm:text-[48px] lg:text-[54px] leading-[0.95]">
              Your Moment.<br />
              <span className="italic text-[#CFA46A]">Your Glow.</span>
            </h2>

            <p className="font-body text-[#F7F1E8]/60 text-sm sm:text-base leading-relaxed max-w-md">
              At Glam Girl By Janki, every appointment is a personal ritual. We believe beauty is not just about appearance — it's about how you feel walking out of our studio: confident, radiant, and completely yourself.
            </p>

            <div className="grid grid-cols-2 gap-4 py-4 border-t border-[#CFA46A]/10">
              {[
                { label: 'Personalized Experience', desc: 'Every treatment tailored to you' },
                { label: 'Premium Products', desc: 'Only the finest used on your skin' },
                { label: 'Indian-Inspired', desc: 'Ancient beauty wisdom, modern results' },
                { label: 'Private Studio', desc: 'Comfortable & welcoming environment' },
              ].map(({ label, desc }) => (
                <div key={label} className="space-y-1">
                  <div className="w-4 h-px bg-[#CFA46A]" />
                  <p className="font-display text-[#F7F1E8] text-[13px]">{label}</p>
                  <p className="font-body text-[#F7F1E8]/45 text-xs">{desc}</p>
                </div>
              ))}
            </div>

            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 bg-[#CFA46A] hover:bg-[#E5C492] text-[#100C0D] text-xs font-bold uppercase tracking-widest px-8 py-4 transition-all duration-200 hover:scale-[1.02]"
            >
              DISCOVER OUR SERVICES <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
