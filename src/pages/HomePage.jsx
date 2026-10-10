import React, { useEffect, lazy, Suspense } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Calendar, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import ServiceMarquee from '../components/ServiceMarquee/ServiceMarquee';
import DeferredSection from '../components/common/DeferredSection';

// Lazy load below-the-fold sections to boost Initial Page Load, FCP, LCP, and reduce TBT
const ServicesPage = lazy(() => import('./ServicesPage'));
const GalleryPage = lazy(() => import('./GalleryPage'));
const AboutPage = lazy(() => import('./AboutPage'));
const ContactPage = lazy(() => import('./ContactPage'));
const ReviewsSection = lazy(() => import('../components/home/ReviewsSection'));

// Lightweight section placeholder for seamless below-the-fold hydration
function SectionSkeleton({ height = 'min-h-[400px]' }) {
  return (
    <div className={`w-full ${height} flex items-center justify-center bg-[#F7F4ED] text-[#263D2B]`}>
      <div className="w-7 h-7 rounded-full border-2 border-[#263D2B] border-t-transparent animate-spin" />
    </div>
  );
}

export default function HomePage({ defaultSection = null }) {
  const location = useLocation();

  useEffect(() => {
    let targetId = defaultSection;

    if (!targetId && location.hash) {
      targetId = location.hash.replace('#', '');
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
      }, 120);

      return () => clearTimeout(scrollTimer);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.hash, defaultSection]);

  return (
    <div className="w-full min-h-screen bg-[#F7F4ED] text-[#10110F] overflow-x-hidden">
      {/* 1. HERO SECTION (id="home") — Immediate Critical Paint */}
      <section id="home" className="w-full relative">
        <HeroSection />
      </section>

      {/* CONTINUOUS MAIN SERVICES MARQUEE STRIP */}
      <ServiceMarquee />

      {/* 2. SERVICES SECTION (id="services") — Asynchronously hydrated on scroll */}
      <DeferredSection id="services" minHeight="min-h-[600px]" className="border-t border-[#DCE1D8]">
        <Suspense fallback={<SectionSkeleton height="min-h-[600px]" />}>
          <ServicesPage isSection={true} />
        </Suspense>
      </DeferredSection>

      {/* 3. BOOK APPOINTMENT CTA BANNER (id="booking") */}
      <section id="booking" className="w-full relative border-t border-[#DCE1D8] py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[#6B7068] text-xs font-bold uppercase tracking-[0.2em]">
            <Sparkles className="w-4 h-4 text-[#263D2B]" />
            <span>INSTANT RESERVATION</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#10110F] tracking-tight">
            Ready to Reserve Your Beauty Experience?
          </h2>

          <p className="text-[#6B7068] text-sm sm:text-lg max-w-xl mx-auto leading-relaxed font-body font-light">
            Choose from 86 luxury hair, facial, nail, and spa rituals. Select your preferred date, time, and specialist on our dedicated booking page.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/book-appointment"
              className="global-button flex items-center justify-center gap-2.5"
            >
              <Calendar className="w-4 h-4" />
              <span>BOOK YOUR APPOINTMENT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-6 border-t border-[#DCE1D8] flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#6B7068] font-body">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#263D2B]" />
              Instant Confirmation
            </span>
            <span className="hidden sm:inline text-[#DCE1D8]">•</span>
            <span>No Prepayment Required</span>
            <span className="hidden sm:inline text-[#DCE1D8]">•</span>
            <span>Free Cancellation</span>
          </div>
        </div>
      </section>

      {/* 4. GALLERY SECTION (id="gallery") */}
      <DeferredSection id="gallery" minHeight="min-h-[500px]" className="border-t border-[#DCE1D8]">
        <Suspense fallback={<SectionSkeleton height="min-h-[500px]" />}>
          <GalleryPage isSection={true} />
        </Suspense>
      </DeferredSection>

      {/* 5. ABOUT SECTION (id="about") */}
      <DeferredSection id="about" minHeight="min-h-[500px]" className="border-t border-[#DCE1D8]">
        <Suspense fallback={<SectionSkeleton height="min-h-[500px]" />}>
          <AboutPage isSection={true} />
        </Suspense>
      </DeferredSection>

      {/* 6. CONTACT SECTION (id="contact") */}
      <DeferredSection id="contact" minHeight="min-h-[500px]" className="border-t border-[#DCE1D8]">
        <Suspense fallback={<SectionSkeleton height="min-h-[500px]" />}>
          <ContactPage isSection={true} />
        </Suspense>
      </DeferredSection>

      {/* 7. REVIEWS & GUEST CHRONICLES SECTION (id="reviews") — Added Last */}
      <DeferredSection id="reviews" minHeight="min-h-[600px]" className="border-t border-[#DCE1D8]">
        <Suspense fallback={<SectionSkeleton height="min-h-[600px]" />}>
          <ReviewsSection />
        </Suspense>
      </DeferredSection>
    </div>
  );
}
