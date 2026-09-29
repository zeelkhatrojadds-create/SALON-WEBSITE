import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Calendar, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import ServicesPage from './ServicesPage';
import GalleryPage from './GalleryPage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';

export default function HomePage({ defaultSection = null }) {
  const location = useLocation();

  useEffect(() => {
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

      {/* 3. BOOK APPOINTMENT CTA BANNER (id="booking") */}
      <section id="booking" className="w-full relative border-t border-white/10 py-16 sm:py-24 bg-gradient-to-br from-[#1C1418] via-[#24171E] to-[#140E11]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-brand-gold-light text-xs font-bold uppercase tracking-[0.2em]">
            <Sparkles className="w-4 h-4 text-brand-pink" />
            <span>INSTANT RESERVATION</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Ready to Reserve Your Beauty Experience?
          </h2>

          <p className="text-white/70 text-sm sm:text-lg max-w-xl mx-auto leading-relaxed">
            Choose from 86 luxury hair, facial, nail, and spa treatments. Select your preferred date, time, and specialist on our dedicated booking page.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/book-appointment"
              className="w-full sm:w-auto min-h-[50px] px-8 py-3.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white text-sm font-bold uppercase tracking-wider shadow-lg shadow-brand-pink/30 hover:scale-105 active:scale-95 transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Your Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-xs text-white/50">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-pink" />
              Instant Confirmation
            </span>
            <span>•</span>
            <span>No Prepayment Required</span>
            <span>•</span>
            <span>Free Cancellation</span>
          </div>
        </div>
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
