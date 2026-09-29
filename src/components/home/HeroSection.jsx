import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Scissors, Flower2, Gem, MapPin } from 'lucide-react';
import jankiPhoto from '../../assets/janki-khatroja.jpg';

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative w-full min-h-screen bg-[#F6F1EA] text-[#2D2327] flex flex-col justify-between pt-20 sm:pt-24 lg:pt-28 pb-8 overflow-hidden selection:bg-[#B38357] selection:text-white">
      
      {/* Ambient background glow & lighting */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-[#E8D4C2]/40 rounded-full blur-3xl pointer-events-none -mt-20" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#E5C3B0]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Main Grid: Left Content (60%) & Right Janki Khatroja Photo (40%) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 flex-1 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 relative z-10">
        
        {/* LEFT COLUMN: Copy, Heading, Buttons */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 pt-4 sm:pt-6 text-center lg:text-left">
          
          {/* Top Ornament Badge matching mockup */}
          <div className="inline-flex flex-col items-center lg:items-start space-y-1">
            <div className="flex items-center gap-3 text-[#A87B51]">
              <span className="w-8 h-[1px] bg-[#A87B51]/40 hidden sm:inline-block"></span>
              <Flower2 className="w-4 h-4 text-[#A87B51] flex-shrink-0" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.24em] uppercase text-[#7A5A3E]">
                OTTAWA • WOMEN'S BEAUTY STUDIO
              </span>
              <span className="w-8 h-[1px] bg-[#A87B51]/40 hidden sm:inline-block"></span>
            </div>
          </div>

          {/* Headline matching exact mockup typography */}
          <div className="space-y-1 sm:space-y-2">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-[#2B2025] leading-[1.08]">
              Your Beauty.
            </h1>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-[#2B2025] leading-[1.08]">
              Your Confidence.
            </h1>
            <div className="font-script text-5xl sm:text-7xl lg:text-8xl xl:text-9xl text-[#C4956B] leading-[0.9] pt-1">
              Your Moment.
            </div>
          </div>

          {/* Subtitle Paragraph matching mockup */}
          <p className="text-[#695852] text-sm sm:text-base lg:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
            Premium beauty services designed to bring out the best version of you.
          </p>

          {/* Action Buttons matching mockup */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4">
            {/* Primary Button: Book Your Appointment */}
            <Link
              to="/book-appointment"
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 bg-[#B38357] hover:bg-[#9C6F45] text-white text-xs sm:text-sm font-semibold px-7 sm:px-8 py-3.5 rounded-full shadow-lg shadow-[#B38357]/25 hover:shadow-xl hover:scale-[1.02] active:scale-98 transition-all duration-200 cursor-pointer"
            >
              <span>Book Your Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Secondary Button: Explore Services */}
            <Link
              to="/services"
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#3D3028]/5 text-[#3D3028] text-xs sm:text-sm font-semibold px-7 sm:px-8 py-3.5 rounded-full border border-[#3D3028]/25 hover:border-[#3D3028]/50 transition-all duration-200 cursor-pointer"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

        {/* RIGHT COLUMN: Real Seated Photo of Main Owner Janki Khatroja in Salon */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="relative w-full max-w-lg lg:max-w-none aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/60 bg-[#EFE8DF] group">
            <img
              src={jankiPhoto || "/janki-khatroja.jpg"}
              alt="Janki Khatroja — Main Owner & Lead Beauty Director"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out ${
                imageLoaded ? 'opacity-100' : 'opacity-90'
              }`}
              loading="eager"
            />
            {/* Subtle soft gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

            {/* Owner Label Tag */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-[#2D2327] shadow-lg border border-white/60 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B38357] animate-pulse" />
              <span>Janki Khatroja — Owner & Main Artist</span>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM 4-FEATURE TRUST BADGES BAR matching exact mockup */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 pt-10 sm:pt-12 relative z-10">
        <div className="pt-6 border-t border-[#E3D8CC] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          
          {/* Feature 1: Professional Stylists */}
          <div className="flex flex-col items-center gap-2 p-2">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#EDE4DA] border border-[#D9CABA] flex items-center justify-center text-[#96673E] shadow-xs">
              <Scissors className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#3D3028]">
              Professional Stylists
            </span>
          </div>

          {/* Feature 2: Personalized Care */}
          <div className="flex flex-col items-center gap-2 p-2">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#EDE4DA] border border-[#D9CABA] flex items-center justify-center text-[#96673E] shadow-xs">
              <Flower2 className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#3D3028]">
              Personalized Care
            </span>
          </div>

          {/* Feature 3: Premium Products */}
          <div className="flex flex-col items-center gap-2 p-2">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#EDE4DA] border border-[#D9CABA] flex items-center justify-center text-[#96673E] shadow-xs">
              <Gem className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#3D3028]">
              Premium Products
            </span>
          </div>

          {/* Feature 4: Ottawa's Beauty Destination */}
          <div className="flex flex-col items-center gap-2 p-2">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#EDE4DA] border border-[#D9CABA] flex items-center justify-center text-[#96673E] shadow-xs">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#3D3028]">
              Ottawa's Beauty Destination
            </span>
          </div>

        </div>
      </div>

    </section>
  );
}
