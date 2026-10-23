import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Mail, 
  Phone, 
  ArrowRight, 
  ExternalLink,
  Sparkles,
  Heart,
  HelpCircle
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import { SALON_INFO } from '../../data/salonData';
import salonDB from '../../db/salonDatabase';

export default function PlanYourVisitSection() {
  const settings = salonDB.getSettings();

  const salonHours = (SALON_INFO && Array.isArray(SALON_INFO.hours) && SALON_INFO.hours.length > 0)
    ? SALON_INFO.hours
    : null;

  const phoneDisplay = settings.phone || SALON_INFO.phone || '+1 (616) 255-0549';
  const phoneClean = phoneDisplay.replace(/[^0-9+]/g, '');
  const emailDisplay = settings.email || SALON_INFO.email || 'Glamgirlbyjanki@gmail.com';
  const fullAddress = '405 Euphoria Crescent, Ottawa, ON K2J 7M7, Canada';
  const encodedAddress = encodeURIComponent(fullAddress);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const helpfulCards = [
    {
      step: '01',
      title: 'Before Your Visit',
      text: 'Arrive at your scheduled appointment time and let our team know about any preferences or treatment requirements.',
      icon: Sparkles
    },
    {
      step: '02',
      title: 'Your Comfort Matters',
      text: 'Our studio is designed to offer a welcoming, calm, and personalized beauty experience.',
      icon: Heart
    },
    {
      step: '03',
      title: 'Need Assistance?',
      text: 'Contact us before your appointment if you have questions about services, timing, or preparation.',
      icon: HelpCircle
    }
  ];

  return (
    <section 
      id="plan-your-visit" 
      aria-label="Plan Your Visit"
      className="w-full bg-[#FAF7F2] text-[#100C0D] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#E8E2D8] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* ========================================================================= */}
        {/* 1. SECTION HEADING                                                        */}
        {/* ========================================================================= */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[1px] bg-[#CFA46A]" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#CFA46A]">
              YOUR VISIT, BEAUTIFULLY PLANNED
            </span>
            <span className="w-5 h-[1px] bg-[#CFA46A]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#100C0D] font-normal tracking-tight leading-[1.2] mb-5">
            Plan Your Visit
          </h2>

          <p className="text-[#6B7068] text-sm sm:text-base md:text-[15px] font-sans leading-relaxed">
            Everything you need to know before visiting Glam Girl by Janki. We look forward to welcoming you to our beauty studio for a personalized, relaxing experience.
          </p>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 2. VISIT INFORMATION LAYOUT (TWO COLUMNS)                                  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mb-16 sm:mb-20">
          
          {/* LEFT COLUMN: VISIT DETAILS (7 COLS ON DESKTOP) */}
          <ScrollReveal className="lg:col-span-6 xl:col-span-7 flex flex-col justify-between space-y-5">
            
            {/* Block 1: OUR LOCATION */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8E2D8] transition-all duration-300 hover:border-[#CFA46A]/50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F7F1E8] border border-[#E8E2D8] flex items-center justify-center text-[#CFA46A] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-[#CFA46A]" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#CFA46A] block mb-1">
                    OUR LOCATION
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-[#100C0D] font-medium mb-1.5">
                    Studio Address
                  </h3>
                  <address className="not-italic text-xs sm:text-sm text-[#6B7068] font-sans leading-relaxed">
                    405 Euphoria Crescent<br />
                    Ottawa, ON K2J 7M7<br />
                    Canada
                  </address>
                </div>
              </div>
            </div>

            {/* Block 2: OPENING HOURS */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8E2D8] transition-all duration-300 hover:border-[#CFA46A]/50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F7F1E8] border border-[#E8E2D8] flex items-center justify-center text-[#CFA46A] shrink-0 mt-0.5">
                  <Clock className="w-5 h-5 text-[#CFA46A]" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#CFA46A] block mb-1">
                    OPENING HOURS
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-[#100C0D] font-medium mb-2.5">
                    Beauty Studio Hours
                  </h3>

                  {salonHours && salonHours.length > 0 ? (
                    <div className="space-y-2 text-xs sm:text-sm">
                      {salonHours.map((schedule, idx) => (
                        <div 
                          key={idx} 
                          className="flex justify-between items-center py-1 border-b border-[#E8E2D8]/60 last:border-b-0"
                        >
                          <span className="text-[#6B7068] font-medium">{schedule.days}</span>
                          <span className="text-[#100C0D] font-semibold tracking-wide">{schedule.time}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-[#6B7068] font-sans">
                      Please contact us to confirm availability.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Block 3: APPOINTMENTS */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8E2D8] transition-all duration-300 hover:border-[#CFA46A]/50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F7F1E8] border border-[#E8E2D8] flex items-center justify-center text-[#CFA46A] shrink-0 mt-0.5">
                  <Calendar className="w-5 h-5 text-[#CFA46A]" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#CFA46A] block mb-1">
                    APPOINTMENTS
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-[#100C0D] font-medium mb-1.5">
                    Advance Reservations
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7068] font-sans leading-relaxed mb-4">
                    We recommend booking in advance to secure your preferred treatment and time.
                  </p>
                  <div>
                    <Link
                      to="/book-appointment"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#100C0D] text-white hover:bg-[#CFA46A] hover:text-[#100C0D] transition-all duration-300 text-xs font-bold uppercase tracking-[0.16em] shadow-xs group"
                    >
                      <span>BOOK AN APPOINTMENT</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Block 4: GET IN TOUCH */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8E2D8] transition-all duration-300 hover:border-[#CFA46A]/50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F7F1E8] border border-[#E8E2D8] flex items-center justify-center text-[#CFA46A] shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-[#CFA46A]" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#CFA46A] block mb-1">
                    GET IN TOUCH
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-[#100C0D] font-medium mb-2.5">
                    Direct Inquiries
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm">
                    <a 
                      href={`mailto:${emailDisplay}`}
                      className="inline-flex items-center gap-2 text-[#100C0D] hover:text-[#CFA46A] transition-colors font-medium underline underline-offset-4 decoration-[#CFA46A]/40"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#CFA46A]" />
                      <span>{emailDisplay}</span>
                    </a>

                    <a 
                      href={`tel:${phoneClean}`}
                      className="inline-flex items-center gap-2 text-[#6B7068] hover:text-[#100C0D] transition-colors font-medium"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#CFA46A]" />
                      <span>{phoneDisplay}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </ScrollReveal>

          {/* RIGHT COLUMN: LOCATION PREVIEW & MAP (5-6 COLS ON DESKTOP) */}
          <ScrollReveal className="lg:col-span-6 xl:col-span-5 flex flex-col">
            <div className="bg-white rounded-3xl p-3 sm:p-4 border border-[#E8E2D8] shadow-xs flex-1 flex flex-col overflow-hidden">
              
              {/* Studio Map Header Label */}
              <div className="flex items-center justify-between px-3 py-2.5 mb-2 border-b border-[#E8E2D8]/60">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#CFA46A] animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#100C0D]">
                    GLAM GIRL BY JANKI · OTTAWA
                  </span>
                </div>
                <span className="text-[10px] font-medium text-[#6B7068]">
                  Euphoria Crescent
                </span>
              </div>

              {/* Responsive Google Map Embed */}
              <div className="relative w-full flex-1 min-h-[360px] sm:min-h-[420px] rounded-2xl overflow-hidden bg-[#F7F1E8] border border-[#E8E2D8]">
                <iframe
                  title="Glam Girl by Janki Location Map"
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />

                {/* Subtle Map Overlay Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#100C0D] border border-[#E8E2D8] shadow-xs pointer-events-none flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#CFA46A]" />
                  <span>405 Euphoria Crescent</span>
                </div>
              </div>

              {/* Map Footer Link: Clearly Labeled Get Directions */}
              <div className="pt-3 px-1 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-[11px] text-[#6B7068] text-center sm:text-left">
                  Located in Ottawa, ON · Ample complimentary parking available
                </p>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#100C0D] text-white hover:bg-[#CFA46A] hover:text-[#100C0D] transition-all duration-300 text-[11px] font-bold uppercase tracking-wider shrink-0"
                >
                  <span>GET DIRECTIONS</span>
                  <ExternalLink className="w-3 h-3 text-white/80" />
                </a>
              </div>

            </div>
          </ScrollReveal>

        </div>

        {/* ========================================================================= */}
        {/* 3. HELPFUL VISITOR INFORMATION (3 EDITORIAL CARDS)                         */}
        {/* ========================================================================= */}
        <ScrollReveal className="pt-4 sm:pt-6 border-t border-[#E8E2D8]">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#CFA46A] block mb-1">
              VISITOR PROTOCOL & COMFORT
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#100C0D] font-normal">
              Helpful Visitor Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {helpfulCards.map((card, idx) => {
              const CardIcon = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8E2D8] hover:border-[#CFA46A]/50 transition-all duration-300 flex flex-col justify-between shadow-xs group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold tracking-[0.18em] text-[#CFA46A]">
                        {card.step}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#F7F1E8] border border-[#E8E2D8] flex items-center justify-center text-[#CFA46A] group-hover:bg-[#CFA46A] group-hover:text-white transition-colors duration-300">
                        <CardIcon className="w-4 h-4" />
                      </div>
                    </div>

                    <h4 className="font-serif text-lg text-[#100C0D] font-normal mb-2.5">
                      {card.step} — {card.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#6B7068] font-sans leading-relaxed">
                      {card.text}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E8E2D8]/60 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#CFA46A]">
                    <span>GLAM GIRL ATELIER</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Downloadable Beauty Menu Quick Banner */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E2D8] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B]">
                COMPLIMENTARY ATELIER LOOKBOOK
              </span>
              <h4 className="font-serif text-lg sm:text-xl font-normal text-[#100C0D]">
                Looking for our Complete Treatment Menu?
              </h4>
              <p className="text-xs text-[#6B7068]">
                Download our latest printable PDF catalogue or browse active seasonal beauty rituals wherever you go.
              </p>
            </div>
            <Link
              to="/services#download-menu"
              className="global-button !px-6 !py-3 text-xs uppercase font-bold flex items-center gap-2 flex-shrink-0 cursor-pointer"
            >
              <span>Download Beauty Menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
