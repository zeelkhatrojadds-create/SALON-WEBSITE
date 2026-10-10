import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  return (
    <section
      id="home"
      className="relative w-full text-[#10110F] overflow-x-hidden bg-[#F7F4ED]"
    >
      {/* ========================================================================= */}
      {/* MOBILE & TABLET VIEW (< md): TALL EDITORIAL LUXURY HERO                   */}
      {/* ========================================================================= */}
      <div className="block md:hidden w-full pt-[76px] bg-[#F7F4ED]">
        {/* 1. Uncropped High-Res Salon Photography */}
        <div className="w-full bg-[#F7F4ED]">
          <img
            src="/facial-atelier-clean-1920.webp"
            alt="GLAM GIRL BY JANKI luxury women's salon"
            width="1920"
            height="1080"
            fetchPriority="high"
            decoding="async"
            className="w-full h-auto block object-contain"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'contain',
              objectPosition: 'center top'
            }}
          />
        </div>

        {/* 2. Mobile Hero Content Section */}
        <div className="w-full px-4 sm:px-6 py-6 sm:py-7 bg-[#F7F4ED] flex flex-col items-start border-t border-[#DCE1D8]">
          {/* Eyebrow */}
          <div className="mb-3">
            <span className="text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6B7068]">
              YOUR BEAUTY, YOUR MOMENT
            </span>
          </div>

          {/* 3-Line Tall Serif Heading */}
          <h1 className="font-serif font-normal text-[36px] min-[380px]:text-[44px] xs:text-[52px] leading-[0.98] text-[#10110F] tracking-[-0.02em] mb-4">
            <span className="block">Beauty</span>
            <span className="block">Begins With</span>
            <span className="block">You.</span>
          </h1>

          {/* Forest Green Accent Line */}
          <div className="w-12 h-[2px] bg-[#263D2B] mb-4 rounded-full" />

          {/* Supporting Text */}
          <p className="font-body text-[14px] leading-[1.65] text-[#6B7068] mb-6 max-w-[440px] font-light">
            Personalized beauty rituals, designed around you.<br />
            Discover your glow with care, confidence, and elegance.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
            <Link
              to="/book-appointment"
              className="global-button w-full sm:w-auto"
            >
              BOOK YOUR EXPERIENCE
            </Link>

            <Link
              to="/services"
              className="global-button-secondary btn-luxury-arrow w-full sm:w-auto"
            >
              <span>EXPLORE SERVICES</span>
              <span className="arrow-symbol text-sm font-normal">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP VIEW (>= md): FULL SCREEN NEW EDITORIAL HERO                      */}
      {/* ========================================================================= */}
      <div className="hidden md:flex relative w-full min-h-[100svh] xl:min-h-[100vh] flex-col justify-between bg-[#F7F4ED]">
        
        {/* LAYER 0: BACKGROUND PHOTOGRAPH / VIDEO ANCHORED AT RIGHT-BOTTOM */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-[#F7F4ED] flex items-end justify-end">
          {/* Static high-res salon photo */}
          <picture className={`w-full h-full flex items-end justify-end transition-opacity duration-1000 ${videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'}`}>
            <source
              type="image/webp"
              srcSet="/facial-atelier-clean-1920.webp 1920w, /facial-atelier-clean-1200.webp 1200w"
              sizes="100vw"
            />
            <img
              src="/facial-atelier-clean-1920.webp"
              alt="GLAM GIRL BY JANKI Luxury Salon Interior"
              width="1920"
              height="1080"
              fetchPriority="high"
              decoding="async"
              loading="eager"
              className="w-full h-full"
              style={{
                objectFit: 'contain',
                objectPosition: 'right bottom',
                maxWidth: '100%',
                maxHeight: '100%'
              }}
            />
          </picture>

          {/* Autoplay silent looped hero video if MP4 supplied */}
          {!videoError && (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/facial-atelier-clean-1920.webp"
              onCanPlay={() => setVideoLoaded(true)}
              onError={() => setVideoError(true)}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                objectFit: 'contain',
                objectPosition: 'right bottom'
              }}
            >
              <source src="/videos/glam-girl-hero.mp4" type="video/mp4" />
            </video>
          )}
        </div>

        {/* LAYER 1: WARM CREAM EDITORIAL READING GRADIENT */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, #F7F4ED 0%, rgba(247, 244, 237, 0.98) 32%, rgba(247, 244, 237, 0.7) 48%, rgba(247, 244, 237, 0.08) 66%, transparent 100%)'
          }}
        />

        {/* LAYER 2: LEFT HERO CONTENT */}
        <div className="relative z-20 flex-1 flex flex-col justify-center w-full max-w-none xl:max-w-[1600px] mx-auto px-8 md:px-10 lg:px-14 xl:px-[6%] pt-[96px] pb-12">
          <div className="w-full max-w-[520px] lg:max-w-[560px] text-left flex flex-col items-start">

            {/* Eyebrow Label */}
            <div className="mb-3.5">
              <span className="text-[11px] lg:text-[12px] font-semibold uppercase tracking-[0.22em] text-[#6B7068]">
                YOUR BEAUTY, YOUR MOMENT
              </span>
            </div>

            {/* 3-Line Tall Serif Heading */}
            <h1 className="font-serif font-normal text-[58px] md:text-[68px] lg:text-[84px] xl:text-[96px] leading-[0.98] text-[#10110F] tracking-[-0.02em] mb-5 select-none">
              <span className="block">Beauty</span>
              <span className="block">Begins With</span>
              <span className="block">You.</span>
            </h1>

            {/* Forest Green Accent Line */}
            <div className="w-14 h-[2px] bg-[#263D2B] mb-5 rounded-full" />

            {/* Supporting Description */}
            <p className="font-body text-[14.5px] md:text-[15.5px] lg:text-[16px] text-[#6B7068] leading-[1.65] max-w-[430px] mb-8 font-light">
              Personalized beauty rituals, designed around you.<br />
              Discover your glow with care, confidence, and elegance.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-6">
              <Link
                to="/book-appointment"
                className="global-button"
              >
                BOOK YOUR EXPERIENCE
              </Link>

              <Link
                to="/services"
                className="global-button-secondary btn-luxury-arrow"
              >
                <span>EXPLORE SERVICES</span>
                <span className="arrow-symbol text-sm font-normal">→</span>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
