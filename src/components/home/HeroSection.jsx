import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Scissors, Flower2, Gem, MapPin } from 'lucide-react';
import jankiPhoto from '../../assets/janki-khatroja.jpg';

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative w-full min-h-screen lg:h-screen text-[#E5DDD8] bg-[#0D0B0B] flex flex-col justify-between pt-20 lg:pt-20 pb-0 overflow-hidden selection:bg-[#DDB88C] selection:text-[#120E10]">
      
      {/* Soft Luxury Radial Ambient Lighting */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-[#3A281C]/25 rounded-full blur-[140px] pointer-events-none -mt-16" />
      <div className="absolute bottom-1/3 left-12 w-[350px] h-[350px] bg-[#2A1D15]/30 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container: Split 48% Left / 52% Right on Desktop */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 flex-1 grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-10 relative z-10 py-2 sm:py-4 lg:py-4">
        
        {/* LEFT COLUMN (48% on Desktop) */}
        <div className="lg:col-span-6 xl:col-span-6 space-y-4 sm:space-y-5 lg:space-y-5 text-center lg:text-left flex flex-col justify-center">
          
          {/* Location Label with Thin Decorative Lines */}
          <div className="inline-flex items-center justify-center lg:justify-start gap-2.5 text-[#DDB88C]">
            <span className="w-7 sm:w-9 h-[1px] bg-[#DDB88C]/40 inline-block"></span>
            <span className="font-sans text-[11px] sm:text-xs lg:text-[13px] font-medium tracking-[0.18em] uppercase text-[#DDB88C]">
              OTTAWA • WOMEN'S BEAUTY STUDIO
            </span>
            <span className="w-7 sm:w-9 h-[1px] bg-[#DDB88C]/40 inline-block"></span>
          </div>

          {/* Controlled 3-Line Headline matching specs */}
          <h1 className="font-serif font-normal tracking-[-0.03em] text-white leading-[0.98] sm:leading-[1.0] text-[34px] sm:text-[44px] lg:text-[clamp(42px,3.8vw,62px)] xl:text-[clamp(48px,4vw,68px)] flex flex-col space-y-0.5">
            <span className="block">Your Beauty.</span>
            <span className="block">Your Confidence.</span>
            <span className="font-script text-[#DDB88C] font-normal leading-[1.05] inline-block pt-1 text-[40px] sm:text-[50px] lg:text-[clamp(48px,4.2vw,70px)] xl:text-[clamp(54px,4.5vw,76px)]">
              Your Moment.
            </span>
          </h1>

          {/* Supporting Description */}
          <p className="font-sans text-[#E5DDD8]/85 text-xs sm:text-sm lg:text-[15px] xl:text-base leading-[1.5] max-w-[440px] mx-auto lg:mx-0 font-normal">
            Personalized beauty experiences designed to help you feel confident, beautiful, and completely yourself.
          </p>

          {/* Touch-Friendly Action Buttons */}
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-3.5">
            {/* Primary Button */}
            <Link
              to="/book-appointment"
              className="w-full sm:w-auto h-[48px] sm:h-[52px] inline-flex items-center justify-center gap-2 bg-[#D83A75] hover:bg-[#c42f65] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-7 rounded-full shadow-lg shadow-[#D83A75]/30 hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#D83A75] focus:ring-offset-2 focus:ring-offset-[#0D0B0B] active:scale-98 transition-all duration-200 cursor-pointer"
            >
              <span>BOOK YOUR APPOINTMENT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Secondary Button */}
            <Link
              to="/services"
              className="w-full sm:w-auto h-[48px] sm:h-[52px] inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 text-[#E5DDD8] hover:text-white text-xs sm:text-sm font-medium uppercase tracking-wider px-7 rounded-full border border-white/25 hover:border-[#DDB88C] focus:outline-none focus:ring-2 focus:ring-[#DDB88C] focus:ring-offset-2 focus:ring-offset-[#0D0B0B] transition-all duration-200 cursor-pointer backdrop-blur-sm"
            >
              <span>EXPLORE SERVICES</span>
              <ArrowRight className="w-4 h-4 text-white/70" />
            </Link>
          </div>

        </div>

        {/* RIGHT COLUMN: Vertically Centered Integrated Salon Portrait (52% on Desktop) */}
        <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end">
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-[460px] aspect-[3/4] sm:aspect-[2/3] lg:aspect-[3/4] max-h-[520px] xl:max-h-[580px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-[#161214] shadow-2xl group">
            <img
              src={jankiPhoto || "/janki-khatroja.jpg"}
              alt="Janki Khatroja — Owner & Master Beauty Specialist"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover object-center transition-opacity duration-700 ease-out ${
                imageLoaded ? 'opacity-100' : 'opacity-90'
              }`}
              loading="eager"
            />
            
            {/* Dark Vignette Overlay for Seamless Integration with #0D0B0B Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0B0B]/70 via-transparent to-transparent pointer-events-none hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0B]/70 via-transparent to-transparent pointer-events-none lg:hidden" />

            {/* Subtle Artist Tag */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-black/75 backdrop-blur-md px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium text-white shadow-lg border border-white/15 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#DDB88C] animate-pulse" />
              <span>Janki Khatroja — Founder & Master Artist</span>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM TRUST BADGES BAR */}
      <div className="w-full bg-[#080708]/90 border-t border-white/10 py-3.5 sm:py-4 relative z-10 backdrop-blur-md mt-auto">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-0 divide-x-0 md:divide-x divide-white/10 text-center">
            
            {/* Feature 1 */}
            <div className="flex flex-col items-center gap-1.5 px-2 py-0.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#DDB88C]/40 bg-[#1A1417] flex items-center justify-center text-[#DDB88C]">
                <Scissors className="w-4 h-4" />
              </div>
              <span className="text-[11px] sm:text-xs font-medium text-white/90">
                Professional Stylists
              </span>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center gap-1.5 px-2 py-0.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#DDB88C]/40 bg-[#1A1417] flex items-center justify-center text-[#DDB88C]">
                <Flower2 className="w-4 h-4" />
              </div>
              <span className="text-[11px] sm:text-xs font-medium text-white/90">
                Personalized Care
              </span>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center gap-1.5 px-2 py-0.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#DDB88C]/40 bg-[#1A1417] flex items-center justify-center text-[#DDB88C]">
                <Gem className="w-4 h-4" />
              </div>
              <span className="text-[11px] sm:text-xs font-medium text-white/90">
                Premium Products
              </span>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center gap-1.5 px-2 py-0.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#DDB88C]/40 bg-[#1A1417] flex items-center justify-center text-[#DDB88C]">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-[11px] sm:text-xs font-medium text-white/90">
                Ottawa's Beauty Destination
              </span>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
