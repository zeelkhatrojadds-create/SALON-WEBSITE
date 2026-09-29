import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Scissors, Flower2, Gem, MapPin, ChevronRight } from 'lucide-react';
import jankiPhoto from '../../assets/janki-khatroja.jpg';

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative w-full min-h-screen bg-[#0E0C0D] text-white flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-0 overflow-hidden selection:bg-[#DDB88C] selection:text-black">
      
      {/* Dark Ambient background lighting & warm champagne spotlights */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#3B291A]/30 rounded-full blur-[140px] pointer-events-none -mt-32" />
      <div className="absolute bottom-1/3 left-10 w-[400px] h-[400px] bg-[#2A1D15]/40 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Grid: Left Content (55%) & Right Janki Khatroja Photo (45%) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 flex-1 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 relative z-10">
        
        {/* LEFT COLUMN: Copy, Heading, Buttons */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 pt-4 sm:pt-8 text-center lg:text-left">
          
          {/* Top Line Badge matching mockup */}
          <div className="inline-flex items-center justify-center lg:justify-start gap-3 text-[#DDB88C]">
            <span className="w-10 h-[1px] bg-[#DDB88C]/40"></span>
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-[#DDB88C]">
              OTTAWA • WOMEN'S BEAUTY STUDIO
            </span>
            <span className="w-10 h-[1px] bg-[#DDB88C]/40"></span>
          </div>

          {/* Headline matching exact dark luxury mockup typography */}
          <div className="space-y-1 sm:space-y-2">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-tight text-white leading-[1.08]">
              Your Beauty.
            </h1>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-tight text-white leading-[1.08]">
              Your Confidence.
            </h1>
            <div className="font-script text-5xl sm:text-7xl lg:text-8xl xl:text-9xl text-[#DDB88C] leading-[0.9] pt-1 drop-shadow-md">
              Your Moment.
            </div>
          </div>

          {/* Subtitle Paragraph matching mockup */}
          <p className="text-[#C5BAC1] text-sm sm:text-base lg:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
            Premium beauty services designed to bring out the best version of you.
          </p>

          {/* Action Buttons matching mockup */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4">
            {/* Primary Button: Book Your Appointment (Gold Champagne Fill) */}
            <Link
              to="/book-appointment"
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 bg-[#DDB88C] hover:bg-[#E8C59A] text-[#140E11] text-xs sm:text-sm font-semibold px-7 sm:px-8 py-3.5 rounded-full shadow-lg shadow-[#DDB88C]/20 hover:shadow-xl hover:scale-[1.02] active:scale-98 transition-all duration-200 cursor-pointer"
            >
              <span>Book Your Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Secondary Button: Explore Services (Dark Outline Pill) */}
            <Link
              to="/services"
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-medium px-7 sm:px-8 py-3.5 rounded-full border border-white/25 hover:border-white/50 transition-all duration-200 cursor-pointer backdrop-blur-sm"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4 text-white/80" />
            </Link>
          </div>

        </div>

        {/* RIGHT COLUMN: Real Seated Photo of Main Owner Janki Khatroja */}
        <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
          <div className="relative w-full max-w-lg lg:max-w-none aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#161214] group">
            <img
              src={jankiPhoto || "/janki-khatroja.jpg"}
              alt="Janki Khatroja — Main Owner & Lead Beauty Director"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out ${
                imageLoaded ? 'opacity-100' : 'opacity-90'
              }`}
              loading="eager"
            />
            {/* Soft dark vignette gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0D] via-transparent to-transparent pointer-events-none opacity-60" />

            {/* Owner Label Tag */}
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-medium text-white shadow-lg border border-white/15 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#DDB88C] animate-pulse" />
              <span>Janki Khatroja — Owner & Main Artist</span>
            </div>
          </div>

          {/* Floating Slider Arrow matching mockup right edge */}
          <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 bg-black/40 backdrop-blur-md items-center justify-center text-white/80 hover:text-white hover:border-[#DDB88C] cursor-pointer transition-colors shadow-lg">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* BOTTOM 4-FEATURE TRUST BADGES BAR matching exact dark mockup */}
      <div className="w-full bg-[#080708]/90 border-t border-white/10 mt-12 sm:mt-16 py-6 sm:py-8 relative z-10 backdrop-blur-md">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-0 divide-x-0 md:divide-x divide-white/10 text-center">
            
            {/* Feature 1: Professional Stylists */}
            <div className="flex flex-col items-center gap-2.5 px-4 py-2">
              <div className="w-12 h-12 rounded-full border border-[#DDB88C]/40 bg-[#1A1417] flex items-center justify-center text-[#DDB88C]">
                <Scissors className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-white/90">
                Professional Stylists
              </span>
            </div>

            {/* Feature 2: Personalized Care */}
            <div className="flex flex-col items-center gap-2.5 px-4 py-2">
              <div className="w-12 h-12 rounded-full border border-[#DDB88C]/40 bg-[#1A1417] flex items-center justify-center text-[#DDB88C]">
                <Flower2 className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-white/90">
                Personalized Care
              </span>
            </div>

            {/* Feature 3: Premium Products */}
            <div className="flex flex-col items-center gap-2.5 px-4 py-2">
              <div className="w-12 h-12 rounded-full border border-[#DDB88C]/40 bg-[#1A1417] flex items-center justify-center text-[#DDB88C]">
                <Gem className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-white/90">
                Premium Products
              </span>
            </div>

            {/* Feature 4: Ottawa's Beauty Destination */}
            <div className="flex flex-col items-center gap-2.5 px-4 py-2">
              <div className="w-12 h-12 rounded-full border border-[#DDB88C]/40 bg-[#1A1417] flex items-center justify-center text-[#DDB88C]">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-white/90">
                Ottawa's Beauty Destination
              </span>
            </div>

          </div>

          {/* Decorative Gold Lotus Line Art in Bottom Right Corner matching mockup */}
          <div className="absolute right-4 bottom-1 opacity-20 pointer-events-none hidden lg:block">
            <svg width="120" height="100" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10C50 10 35 30 50 60C65 30 50 10 50 10Z" stroke="#DDB88C" strokeWidth="1" />
              <path d="M50 60C35 50 20 30 25 20C35 30 45 45 50 60Z" stroke="#DDB88C" strokeWidth="1" />
              <path d="M50 60C65 50 80 30 75 20C65 30 55 45 50 60Z" stroke="#DDB88C" strokeWidth="1" />
            </svg>
          </div>

        </div>
      </div>

    </section>
  );
}

