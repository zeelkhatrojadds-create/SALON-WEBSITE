import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Clock, Heart, ShieldCheck, ArrowRight, Phone } from 'lucide-react';
import PlanYourSalonDaySection from '../components/services/PlanYourSalonDaySection';
import ScrollReveal from '../components/ScrollReveal/ScrollReveal';

export default function PlanYourSalonDayPage() {
  useEffect(() => {
    document.title = 'Plan Your Salon Day — GLAM GIRL BY JANKI';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#10110F] pt-20 sm:pt-24 pb-20 selection:bg-[#263D2B] selection:text-white">
      {/* 1. HERO TITLE BANNER */}
      <div className="relative bg-[#F7F4ED] pt-8 sm:pt-12 pb-8 sm:pb-10 overflow-hidden border-b border-[#DCE1D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Breadcrumbs */}
          <nav className="flex items-center justify-center gap-2 text-xs text-[#6B7068] mb-4 font-sans">
            <Link to="/" className="hover:text-[#263D2B] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-[#263D2B] transition-colors">Services</Link>
            <span>/</span>
            <span className="text-[#263D2B] font-semibold">Plan Your Salon Day</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[#263D2B] text-xs font-bold uppercase tracking-[0.22em] shadow-xs mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>BESPOKE ITINERARY BUILDER</span>
          </div>

          <h1 className="font-serif text-[32px] sm:text-[46px] lg:text-[56px] text-[#10110F] leading-[1.08] tracking-tight mb-3 font-normal">
            Your Perfect Salon Day, <span className="italic text-[#263D2B]">Crafted in Harmony.</span>
          </h1>

          <p className="font-sans text-[#6B7068] text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-2xl mx-auto font-normal">
            Select your favorite hair, skin, and wellness treatments from our complete Ottawa catalog. We organize them into a seamless appointment sequence with live estimated duration and multi-treatment perks.
          </p>
        </div>
      </div>

      {/* 2. MAIN PLAN YOUR SALON DAY WORKBENCH */}
      <PlanYourSalonDaySection />

      {/* 3. ITINERARY TIPS & GUIDELINES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-10 shadow-xs">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#263D2B]">
              HOW IT WORKS
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F]">
              Tips for Your Personalized Beauty Day
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7068]">
              We dedicate personalized attention to make your visit restful, rejuvenating, and flawlessly sequenced.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#DCE1D8] text-[#263D2B] flex items-center justify-center font-serif font-bold text-sm">
                01
              </div>
              <h4 className="font-serif text-base text-[#10110F]">Optimal Sequencing</h4>
              <p className="text-xs text-[#6B7068] leading-relaxed">
                Reorder treatments in your itinerary based on preference. Facial rituals are recommended before hairstyling or makeup for the best results.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#DCE1D8] text-[#263D2B] flex items-center justify-center font-serif font-bold text-sm">
                02
              </div>
              <h4 className="font-serif text-base text-[#10110F]">Automatic Package Perks</h4>
              <p className="text-xs text-[#6B7068] leading-relaxed">
                When you combine 3 or more treatments into your salon day, you automatically receive a verified 10% perk discount (15% for 5+ treatments).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#DCE1D8] text-[#263D2B] flex items-center justify-center font-serif font-bold text-sm">
                03
              </div>
              <h4 className="font-serif text-base text-[#10110F]">Pay in Person at Studio</h4>
              <p className="text-xs text-[#6B7068] leading-relaxed">
                No deposit or credit card required online. Book your slot with confidence and settle your total in person after your treatments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
