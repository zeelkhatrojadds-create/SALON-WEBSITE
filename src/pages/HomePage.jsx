import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import ServicesPage from './ServicesPage';
import BookingPage from './BookingPage';
import GalleryPage from './GalleryPage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';

export default function HomePage({ defaultSection = null }) {
  const location = useLocation();

  useEffect(() => {
    // Determine target section from prop, hash, or pathname
    let targetId = defaultSection;
    
    if (!targetId && location.hash) {
      targetId = location.hash.replace('#', '');
    } else if (!targetId && location.pathname !== '/') {
      targetId = location.pathname.replace('/', '').split('/')[0];
    }

    if (targetId) {
      const scrollTimer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const navHeight = 76;
          const pos = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({
            top: pos,
            behavior: 'smooth'
          });
        }
      }, 100);

      return () => clearTimeout(scrollTimer);
    } else if (location.pathname === '/' && !location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash, defaultSection]);

  return (
    <div className="w-full min-h-screen bg-[#140E11] text-white overflow-x-hidden">
      {/* 1. HERO SECTION (id="home") */}
      <section id="home" className="w-full relative">
        <HeroSection />
      </section>

      {/* 2. SERVICES SECTION (id="services") */}
      <section id="services" className="w-full relative border-t border-white/10">
        <ServicesPage isSection={true} />
      </section>

      {/* 3. BOOK APPOINTMENT SECTION (id="booking") */}
      <section id="booking" className="w-full relative border-t border-white/10">
        <BookingPage isSection={true} />
      </section>

      {/* 4. GALLERY SECTION (id="gallery") */}
      <section id="gallery" className="w-full relative border-t border-white/10">
        <GalleryPage isSection={true} />
      </section>

      {/* 5. ABOUT SECTION (id="about") */}
      <section id="about" className="w-full relative border-t border-white/10">
        <AboutPage isSection={true} />
      </section>

      {/* 6. CONTACT SECTION (id="contact") */}
      <section id="contact" className="w-full relative border-t border-white/10">
        <ContactPage isSection={true} />
      </section>
    </div>
  );
}
