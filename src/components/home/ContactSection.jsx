import React from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Shield, 
  Sparkles, 
  Calendar, 
  Crown, 
  Lock, 
  Compass 
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import salonDB from '../../db/salonDatabase';

export default function ContactSection() {
  const settings = salonDB.getSettings();

  const handleCallConcierge = () => {
    window.location.href = `tel:${settings.phone || '+16162550549'}`;
  };

  const handleDrivingDirections = () => {
    window.open(`https://maps.google.com/?q=${encodeURIComponent(settings.address + ' ' + settings.city)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="contact" className="w-full bg-[#F7F4ED] text-[#10110F] font-sans antialiased selection:bg-[#263D2B] selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO HEADER (MATCHING REFERENCE IMAGE)                                 */}
      {/* ========================================================================= */}
      <section className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center bg-[#07130A] text-white overflow-hidden">
        {/* Salon Interior Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-[center_35%] lg:bg-center"
          style={{ backgroundImage: "url('/contact-hero-clean.webp')" }}
          aria-hidden="true"
        />

        {/* Carefully tuned Dark Gradient Overlay for Maximum Readability and Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#061108]/95 via-[#061108]/85 via-45% to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061108]/80 via-transparent to-[#061108]/60 pointer-events-none" />

        {/* Hero Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
          <div className="max-w-xl text-left">

            {/* Small Eyebrow: GET IN TOUCH */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#C2D0C4]">
                GET IN TOUCH
              </span>
              <span className="w-12 sm:w-16 h-[1px] bg-white/35" />
            </div>

            {/* Heading: Your Beauty, Our Priority */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-normal tracking-tight leading-[1.08] mb-4 sm:mb-5 text-white">
              Your Beauty,<br />
              <span className="italic font-normal text-[#97AA93]">
                Our Priority
              </span>
            </h1>

            {/* Description */}
            <p className="text-white/80 text-xs sm:text-sm md:text-[14px] leading-relaxed max-w-md font-sans mb-8 sm:mb-10">
              Have a question, need more information, or want to book an appointment? We’re here to help. Fill out the form and we’ll get back to you as soon as possible.
            </p>

            {/* Contact Information Row */}
            <div className="flex flex-wrap sm:flex-nowrap items-start gap-5 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 text-white">
              
              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-black/45 border border-white/20 flex items-center justify-center text-[#97AA93] shrink-0 shadow-xs">
                  <Phone className="w-4 h-4 text-[#97AA93]" />
                </div>
                <div>
                  <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-white/60 mb-0.5">
                    CALL US
                  </span>
                  <a 
                    href="tel:+16135550123"
                    className="text-xs sm:text-[13px] font-medium text-white hover:text-[#97AA93] transition-colors whitespace-nowrap"
                  >
                    +1 (613) 555–0123
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-black/45 border border-white/20 flex items-center justify-center text-[#97AA93] shrink-0 shadow-xs">
                  <Mail className="w-4 h-4 text-[#97AA93]" />
                </div>
                <div>
                  <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-white/60 mb-0.5">
                    EMAIL US
                  </span>
                  <a 
                    href="mailto:Glamgirlbyjanki@gmail.com"
                    className="text-xs sm:text-[13px] font-medium text-white hover:text-[#97AA93] transition-colors whitespace-nowrap"
                  >
                    Glamgirlbyjanki@gmail.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-black/45 border border-white/20 flex items-center justify-center text-[#97AA93] shrink-0 shadow-xs">
                  <MapPin className="w-4 h-4 text-[#97AA93]" />
                </div>
                <div>
                  <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-white/60 mb-0.5">
                    VISIT US
                  </span>
                  <address className="not-italic text-xs sm:text-[12px] font-medium text-white leading-tight">
                    <span>405 EUPHORIA CRESCENT,</span><br />
                    <span className="text-white/90">OTTAWA, ON K2J 7M7</span>
                  </address>
                </div>
              </div>

            </div>

            {/* Small Decorative Script Text */}
            <div className="pt-1">
              <p className="font-serif italic text-lg sm:text-xl text-white/90 tracking-wide leading-tight">
                Beauty is better<br />
                when shared
              </p>
              <div className="w-16 h-[1px] bg-white/40 mt-3" />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAISON PROVENANCE & ATELIER DETAILS                                    */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* CARD 1: MAISON PROVENANCE · OTTAWA (7 COLS ON DESKTOP) */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-[#DCE1D8] shadow-md">
              
              {/* Flagship Salon Image Banner */}
              <div className="relative aspect-[16/9] overflow-hidden bg-[#F7F4ED]">
                <img
                  src="/atelier-salon-interior.jpg"
                  alt="Maison Provenance Ottawa Flagship"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-[#10110F] border border-[#DCE1D8]">
                  OTTAWA FLAGSHIP SANCTUARY
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4 text-white">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-[#A8B5A0]">HAUTE BEAUTY SUITE</div>
                  <h3 className="font-serif text-sm sm:text-base font-medium">Glam Girl By Janki · Ottawa</h3>
                </div>
              </div>

              {/* Atelier Details List */}
              <div className="p-5 sm:p-6 space-y-4">
                
                {/* Physical Atelier */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-center text-[#263D2B] flex-shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-xs sm:text-sm text-[#10110F]">
                      Physical Atelier
                    </h4>
                    <p className="text-xs text-[#6B7068]">
                      405 Euphoria Crescent<br />
                      Ottawa, Ontario K2J 7M7, Canada
                    </p>
                  </div>
                </div>

                {/* Dedicated Concierge Desk */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-center text-[#263D2B] flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-xs sm:text-sm text-[#10110F]">
                      Dedicated Concierge Desk
                    </h4>
                    <a href="tel:+16162550549" className="text-xs font-bold text-[#10110F] hover:text-[#263D2B]">
                      +1 (616) 255-0549
                    </a>
                    <span className="block text-[10px] text-[#6B7068]">Direct Lines: Tue - Sat 09:00 - 19:00 EST</span>
                  </div>
                </div>

                {/* Direct Dossier Dispatch */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-center text-[#263D2B] flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-xs sm:text-sm text-[#10110F]">
                      Direct Dossier Dispatch
                    </h4>
                    <a href="mailto:concierge@glamgirlbyjanki.com" className="text-xs text-[#6B7068] hover:text-[#10110F] block">
                      concierge@glamgirlbyjanki.com
                    </a>
                    <a href="mailto:atelier@glamgirlbyjanki.com" className="text-xs text-[#6B7068] hover:text-[#10110F] block">
                      atelier@glamgirlbyjanki.com
                    </a>
                  </div>
                </div>

                {/* Private Suite Arrival & Valet Highlight */}
                <div className="bg-[#F7F4ED] rounded-2xl p-4 border border-[#DCE1D8]">
                  <div className="flex items-start gap-2 text-xs text-[#10110F] leading-relaxed">
                    <span className="font-bold text-[#263D2B] flex-shrink-0">P</span>
                    <p className="text-[11px] text-[#6B7068]">
                      <strong className="text-[#10110F]">Private Suite Arrival:</strong> Private dedicated entrance and parking. Enjoy complete personalized attention and anonymity throughout your visit.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-1 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleCallConcierge}
                    className="py-2.5 px-3 rounded-full border border-[#DCE1D8] text-[#10110F] hover:bg-[#F7F4ED] text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer bg-white"
                  >
                    <Phone className="w-3 h-3 text-[#263D2B]" />
                    <span>CALL CONCIERGE</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDrivingDirections}
                    className="py-2.5 px-3 rounded-full border border-[#DCE1D8] text-[#10110F] hover:bg-[#F7F4ED] text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer bg-white"
                  >
                    <Compass className="w-3 h-3 text-[#263D2B]" />
                    <span>DIRECTIONS</span>
                  </button>
                </div>

              </div>

            </div>

          {/* RIGHT COLUMN: ATELIER SANCTUARY HOURS & APPOINTMENTS (5 COLS ON DESKTOP) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* CARD 2: ATELIER SANCTUARY HOURS */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#DCE1D8] shadow-md">
              <div className="flex items-center justify-between mb-4 border-b border-[#DCE1D8] pb-3">
                <h3 className="font-serif text-base text-[#10110F] font-normal">
                  Atelier Sanctuary Hours
                </h3>
                <Clock className="w-4 h-4 text-[#263D2B]" />
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#6B7068] font-medium">Tuesday – Friday</span>
                  <span className="text-[#10110F] font-semibold">09:00 – 19:00 EST</span>
                </div>

                <div className="flex justify-between items-center py-1 border-t border-[#DCE1D8]">
                  <span className="text-[#6B7068] font-medium flex items-center gap-1">
                    Saturday Privé
                  </span>
                  <span className="text-[#10110F] font-semibold">09:00 – 18:00 EST</span>
                </div>

                <div className="flex justify-between items-center py-1 border-t border-[#DCE1D8]">
                  <span className="text-[#6B7068] font-medium">Sunday & Monday</span>
                  <span className="text-[#263D2B] font-bold tracking-wider text-[10px] uppercase">EXCLUSIVE BUYOUTS ONLY</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#DCE1D8] text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#6B7068] flex items-center justify-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#263D2B]" />
                <span>BY PRIOR CONFIRMED APPOINTMENT ONLY</span>
              </div>
            </div>

            {/* CARD 3: SANCTUARY RESERVATIONS */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#DCE1D8] shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-center text-[#263D2B]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm sm:text-base text-[#10110F] font-medium">
                    Sanctuary Reservations
                  </h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B]">
                    Direct Online Booking
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#6B7068] leading-relaxed mb-4">
                To guarantee complete privacy and individualized aesthetic attention, appointments can be reserved directly online.
              </p>
              <a
                href="/book-appointment"
                className="w-full py-2.5 px-4 rounded-full bg-[#100C0D] text-white hover:bg-[#CFA46A] hover:text-[#100C0D] text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300"
              >
                <span>RESERVE APPOINTMENT</span>
              </a>
            </div>

          </div>

        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 3. ATELIER VISITOR PROTOCOL                                               */}
      {/* ========================================================================= */}
      <section className="bg-white py-16 sm:py-24 border-t border-[#DCE1D8]">
        <ScrollReveal className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#263D2B] mb-2.5">
              DISCREET VISITATION STANDARDS
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#10110F] font-normal tracking-tight mb-3">
              Atelier Visitor Protocol
            </h2>
            <p className="text-[#6B7068] text-xs sm:text-sm leading-relaxed">
              To preserve the serenity and sanctuary quality of our spaces, we invite clientele to review our bespoke admission and reservation guidelines.
            </p>
          </div>

          {/* 3 Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Card 1 */}
            <div className="bg-[#F7F4ED] rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-white border border-[#DCE1D8] flex items-center justify-center text-[#263D2B] mb-4">
                  <Calendar className="w-4 h-4" />
                </div>

                <h3 className="font-serif text-lg text-[#10110F] font-normal mb-2.5 leading-snug">
                  How far in advance should I reserve a private suite?
                </h3>

                <p className="text-xs text-[#6B7068] leading-relaxed mb-6">
                  We recommend 2 to 3 weeks advance booking for signature facial rituals and haute coiffure styling. For master bridal consultations and exclusive weekend private sanctuary buyouts, 3 to 6 months is recommended to ensure calendar exclusivity.
                </p>
              </div>

              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6B7068] border-t border-[#DCE1D8] pt-3">
                PROTOCOL 01 · PLANNING
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F7F4ED] rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-white border border-[#DCE1D8] flex items-center justify-center text-[#263D2B] mb-4">
                  <Shield className="w-4 h-4" />
                </div>

                <h3 className="font-serif text-lg text-[#10110F] font-normal mb-2.5 leading-snug">
                  What is your single-occupancy privacy protocol?
                </h3>

                <p className="text-xs text-[#6B7068] leading-relaxed mb-6">
                  Our individual treatment atelier chambers strictly guarantee zero guest overlap. Each private suite is acoustically treated and features bespoke fragrance dispersion, dedicated fresh cotton linens, and secluded waiting amenities.
                </p>
              </div>

              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6B7068] border-t border-[#DCE1D8] pt-3">
                PROTOCOL 02 · EXCLUSION
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F7F4ED] rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-white border border-[#DCE1D8] flex items-center justify-center text-[#263D2B] mb-4">
                  <Crown className="w-4 h-4" />
                </div>

                <h3 className="font-serif text-lg text-[#10110F] font-normal mb-2.5 leading-snug">
                  Can suites accommodate bridal parties or VIP entourage?
                </h3>

                <p className="text-xs text-[#6B7068] leading-relaxed mb-6">
                  Yes. Full sanctuary takeovers allow complete access to the reception salon, all private transformation suites, artisan tea and catering bar, and personalized beauty artists exclusively dedicated to your party.
                </p>
              </div>

              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6B7068] border-t border-[#DCE1D8] pt-3">
                PROTOCOL 03 · BUYOUTS
              </div>
            </div>

          </div>

        </ScrollReveal>
      </section>

    </div>
  );
}
