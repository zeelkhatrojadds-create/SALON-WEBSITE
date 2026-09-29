import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Sparkles, MapPin } from 'lucide-react';

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#140E11] flex items-center pt-24 pb-14 sm:py-28 lg:py-32">
      
      {/* 1. Full-Bleed Background Photograph */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          src="/hero-campaign.jpg"
          alt="Girl Looked For You — Luxury Ottawa Salon Campaign with Elegant Model"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-[70%_center] sm:object-[75%_center] lg:object-right-top transition-transform duration-1000 ease-out transform ${
            imageLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-90'
          }`}
          loading="eager"
        />

        {/* 2. Professional Cinematic Gradient Overlays for Maximum Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#140E11] via-[#140E11]/90 via-45% md:via-50% md:to-transparent to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#140E11]/80 via-transparent to-[#140E11]/95" />
        <div className="absolute top-1/4 left-5 sm:left-10 w-72 sm:w-96 h-72 sm:h-96 bg-brand-pink/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 3. Hero Foreground Content */}
      <div className="relative z-20 w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 mx-auto flex flex-col justify-center">
        <div className="max-w-xl lg:max-w-2xl xl:max-w-3xl space-y-5 sm:space-y-7 md:space-y-8 animate-fade-in">
          
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-brand-gold-light text-[10px] sm:text-xs md:text-[13px] font-bold tracking-[0.2em] sm:tracking-[0.26em] uppercase shadow-lg shadow-black/20 self-start">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-pink flex-shrink-0" />
            <span className="truncate">OTTAWA • WOMEN'S BEAUTY STUDIO</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white tracking-tight leading-[1.06] uppercase drop-shadow-md">
            BEAUTY <br />
            THAT FEELS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink-muted via-brand-pink to-brand-gold-light">
              LIKE YOU.
            </span>
          </h1>

          <p className="text-[#F2ECE4] text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed max-w-lg lg:max-w-xl drop-shadow-sm">
            Personalized beauty experiences created to highlight your natural beauty and confidence.
          </p>

          <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 md:gap-5">
            {/* Primary Button: BOOK APPOINTMENT */}
            <Link
              to="/book-appointment"
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 bg-brand-pink hover:bg-brand-pink-hover text-white text-xs sm:text-sm md:text-base font-semibold px-6 sm:px-8 md:px-9 py-3.5 sm:py-4 rounded-full shadow-lg shadow-brand-pink/30 hover:shadow-xl hover:shadow-brand-pink/40 hover:scale-[1.02] active:scale-95 transition-all duration-200 text-center uppercase tracking-wider cursor-pointer"
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>BOOK APPOINTMENT</span>
            </Link>

            {/* Secondary Button: EXPLORE SERVICES */}
            <Link
              to="/services"
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white hover:text-brand-pink-muted text-xs sm:text-sm md:text-base font-semibold px-6 sm:px-7 md:px-8 py-3.5 sm:py-4 rounded-full border border-white/25 hover:border-brand-pink/50 backdrop-blur-md shadow-sm hover:scale-[1.02] active:scale-95 transition-all duration-200 text-center uppercase tracking-wider cursor-pointer"
            >
              <span>EXPLORE SERVICES</span>
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </Link>
          </div>

          <div className="pt-5 sm:pt-7 border-t border-white/15 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-brand-ivory/80">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-pink flex-shrink-0" />
              <span className="font-medium">450 Bank Street, Central Ottawa</span>
            </div>
            <span className="hidden sm:inline text-white/30">•</span>
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <span>★ 4.9/5.0</span>
              <span className="text-white/70 font-normal">(450+ Verified Ottawa Reviews)</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
