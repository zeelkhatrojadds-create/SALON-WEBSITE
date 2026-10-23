import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Clock, 
  Calendar, 
  ArrowRight, 
  ArrowUp, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Search,
  X,
  Printer,
  Sparkles,
  CreditCard,
  RotateCcw,
  UserCheck,
  Tag,
  Lock,
  Globe,
  FileEdit,
  SlidersHorizontal,
  BookmarkCheck
} from 'lucide-react';

const SECTIONS = [
  { 
    id: 'introduction', 
    number: '1', 
    title: 'Introduction', 
    icon: FileText,
    summary: 'Atelier scope, website terms of use, and mutual agreement.'
  },
  { 
    id: 'appointments', 
    number: '2', 
    title: 'Appointments & Bookings', 
    icon: Calendar,
    summary: 'Real-time booking, instant on-screen confirmation, single-guest suite.'
  },
  { 
    id: 'cancellations', 
    number: '3', 
    title: 'Cancellations & Rescheduling', 
    icon: RotateCcw,
    summary: 'Flexible rescheduling; zero cancellation penalty fees; 24-hr courtesy.'
  },
  { 
    id: 'pricing', 
    number: '4', 
    title: 'Pricing & Payments', 
    icon: CreditCard,
    summary: 'Transparent CAD pricing; payment upon completion via Cash on Delivery.'
  },
  { 
    id: 'deposits', 
    number: '5', 
    title: 'Deposits, Refunds & No-Shows', 
    icon: BookmarkCheck,
    summary: 'Zero advance deposits; 48-hr complimentary adjustment guarantee.'
  },
  { 
    id: 'services', 
    number: '6', 
    title: 'Services & Results', 
    icon: Sparkles,
    summary: 'Bespoke botanical rituals tailored to unique biology; consultations.'
  },
  { 
    id: 'responsibilities', 
    number: '7', 
    title: 'Customer Responsibilities', 
    icon: UserCheck,
    summary: 'Accurate contact info, allergy/sensitivity disclosures, and aftercare.'
  },
  { 
    id: 'late-arrivals', 
    number: '8', 
    title: 'Late Arrivals', 
    icon: Clock,
    summary: 'Arrive 5-10 min early; no late arrival fines or financial penalties.'
  },
  { 
    id: 'offers', 
    number: '9', 
    title: 'Offers & Discounts', 
    icon: Tag,
    summary: 'Promotional bundles subject to published parameters and validity.'
  },
  { 
    id: 'intellectual-property', 
    number: '10', 
    title: 'Website Content & Intellectual Property', 
    icon: ShieldCheck,
    summary: 'Proprietary trademarks, photos, treatments, and authorized personal use.'
  },
  { 
    id: 'privacy', 
    number: '11', 
    title: 'Privacy & Personal Information', 
    icon: Lock,
    summary: 'Strict client confidentiality; data never sold or leased to third parties.'
  },
  { 
    id: 'third-party', 
    number: '12', 
    title: 'Third-Party Services', 
    icon: Globe,
    summary: 'External tools (WhatsApp, Google Maps, secure card terminals).'
  },
  { 
    id: 'changes', 
    number: '13', 
    title: 'Changes to These Terms', 
    icon: FileEdit,
    summary: 'Periodic reviews with updated timestamps published on this page.'
  },
  { 
    id: 'contact', 
    number: '14', 
    title: 'Contact Information', 
    icon: Phone,
    summary: 'Atelier address, direct phone, concierge email, and master director info.'
  },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    document.title = 'Terms & Conditions — GLAM GIRL BY JANKI | Ottawa';
    window.scrollTo({ top: 0, behavior: 'instant' });

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const scrollPosition = window.scrollY + 180;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 110;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  // Filter sections when user searches
  const filteredSections = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return SECTIONS;
    return SECTIONS.filter(s => 
      s.title.toLowerCase().includes(q) || 
      s.summary.toLowerCase().includes(q) ||
      s.number.includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="w-full min-h-screen bg-[#F7F4ED] text-[#10110F] pt-24 sm:pt-28 pb-16 sm:pb-24 selection:bg-[#263D2B] selection:text-white font-sans antialiased">
      
      {/* ========================================================================= */}
      {/* PRINT-ONLY OFFICIAL HEADER                                                */}
      {/* ========================================================================= */}
      <div className="hidden print:block mb-8 border-b-2 border-[#10110F] pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#10110F] uppercase tracking-wider">
              GLAM GIRL BY JANKI
            </h1>
            <p className="text-xs text-[#465640] tracking-widest uppercase mt-0.5 font-medium">
              Official Terms &amp; Conditions of Service
            </p>
          </div>
          <div className="text-right text-[11px] text-[#465640] leading-tight">
            <p>405 Euphoria Crescent, Ottawa, ON K2J 7M7</p>
            <p>Tel: +1 (616) 255-0549 • Glamgirlbyjanki@gmail.com</p>
            <p className="mt-1 font-semibold text-[#10110F]">Published &amp; Updated: October 12, 2026</p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO INTRODUCTION SECTION                                              */}
      {/* ========================================================================= */}
      <section className="print:hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-4 sm:pt-8 pb-8 sm:pb-12 border-b border-[#DCE1D8]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          
          <div className="max-w-3xl space-y-4">
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[#263D2B] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
              <span>STUDIO POLICIES &amp; TERMS OF USE</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#10110F] font-normal tracking-tight leading-[1.12]">
              Terms &amp;{' '}
              <span className="italic font-normal text-[#263D2B]">
                Conditions
              </span>
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl">
              Please review the terms that apply when booking and using our salon services.
            </p>

            {/* Metadata Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-[#6B7068]">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                Last Updated: <strong className="text-[#10110F] font-semibold">October 12, 2026</strong>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B]" />
                Applies to: All Online Bookings &amp; In-Studio Services
              </span>
              <span>•</span>
              <span className="text-[#465640]">Ottawa, Ontario, Canada</span>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={handlePrint}
              aria-label="Print terms and conditions"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-[4px] bg-white hover:bg-[#F7F4ED] border border-[#DCE1D8] hover:border-[#263D2B] text-[#10110F] text-xs font-bold uppercase tracking-[0.14em] transition-all duration-200 cursor-pointer shadow-xs active:scale-98"
            >
              <Printer className="w-4 h-4 text-[#263D2B]" />
              <span>PRINT TERMS</span>
            </button>

            <Link
              to="/book-appointment"
              className="global-button !px-6 !py-3 !text-xs text-white inline-flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>BOOK APPOINTMENT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* EXECUTIVE SUMMARY "AT A GLANCE" CARDS (4 PILLARS)                        */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#DCE1D8] shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#F7F4ED] text-[#263D2B] flex items-center justify-center">
              <BookmarkCheck className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-sm font-semibold text-[#10110F]">Zero Advance Deposit</h4>
            <p className="text-xs text-[#6B7068] leading-relaxed">
              No credit card pre-charge or deposit required for standard online bookings.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#DCE1D8] shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#F7F4ED] text-[#263D2B] flex items-center justify-center">
              <RotateCcw className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-sm font-semibold text-[#10110F]">Flexible Cancellations</h4>
            <p className="text-xs text-[#6B7068] leading-relaxed">
              24-hour advance notice appreciated; zero penalty fees charged.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#DCE1D8] shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#F7F4ED] text-[#263D2B] flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-sm font-semibold text-[#10110F]">Transparent CAD Pricing</h4>
            <p className="text-xs text-[#6B7068] leading-relaxed">
              Confirmed upfront before service begins. Payment in-studio via Cash on Delivery.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#DCE1D8] shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#F7F4ED] text-[#263D2B] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-sm font-semibold text-[#10110F]">Single-Guest Privacy</h4>
            <p className="text-xs text-[#6B7068] leading-relaxed">
              Private Ottawa atelier suite dedicated entirely to your appointment comfort.
            </p>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. SEARCH & MOBILE SECTION JUMP TABS BAR                                  */}
      {/* ========================================================================= */}
      <section className="print:hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 space-y-4">
        
        {/* Search Input */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-[#6B7068] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search policies (e.g. cancellation, pricing, deposit, allergies)..."
            className="w-full bg-white border border-[#DCE1D8] focus:border-[#263D2B] rounded-full pl-10 pr-10 py-2.5 text-xs text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none focus:ring-1 focus:ring-[#263D2B] shadow-2xs transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7068] hover:text-[#10110F] p-1"
              aria-label="Clear policy search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Mobile & Tablet Horizontal Section Pills */}
        <div className="lg:hidden pills-scroll flex items-center gap-2 pb-2">
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => scrollToSection(sec.id)}
              className={`min-h-[34px] px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 flex-shrink-0 ${
                activeSection === sec.id
                  ? 'bg-[#263D2B] text-white shadow-xs'
                  : 'bg-white text-[#6B7068] hover:text-[#10110F] border border-[#DCE1D8]'
              }`}
            >
              <span className="font-mono text-[10px]">{sec.number}.</span>
              <span>{sec.title}</span>
            </button>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 3. MAIN CONTENT (DESKTOP STICKY TOC + LEGAL SECTIONS COLUMN)              */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ===================================================================== */}
          {/* LEFT COLUMN: TABLE OF CONTENTS (STICKY ON DESKTOP)                    */}
          {/* ===================================================================== */}
          <aside className="lg:col-span-4 hidden lg:block sticky top-28 bg-white rounded-3xl p-6 border border-[#DCE1D8] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#DCE1D8] pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#263D2B]" />
                <h3 className="font-serif text-base font-semibold text-[#10110F] tracking-wide">
                  Table of Contents
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[#6B7068]">14 Sections</span>
            </div>

            <nav aria-label="Terms of service sections" className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
              {filteredSections.map((sec) => {
                const isActive = activeSection === sec.id;
                const IconComponent = sec.icon;

                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left py-2.5 px-3 rounded-xl text-xs transition-all duration-200 flex items-center gap-2.5 cursor-pointer ${
                      isActive
                        ? 'bg-[#263D2B] text-white font-semibold shadow-xs'
                        : 'text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED]'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono flex-shrink-0 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#F7F4ED] text-[#465640]'
                    }`}>
                      {sec.number}
                    </span>
                    <span className="truncate flex-1">{sec.title}</span>
                    <IconComponent className={`w-3.5 h-3.5 opacity-60 flex-shrink-0 ${isActive ? 'opacity-100' : ''}`} />
                  </button>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-[#DCE1D8] flex items-center justify-between text-xs text-[#6B7068]">
              <Link to="/price-list" className="hover:text-[#263D2B] underline underline-offset-2">
                View Price List
              </Link>
              <span>•</span>
              <Link to="/contact#faqs" className="hover:text-[#263D2B] underline underline-offset-2">
                Salon FAQ
              </Link>
              <span>•</span>
              <Link to="/book-appointment" className="hover:text-[#263D2B] font-bold">
                Book Online →
              </Link>
            </div>
          </aside>

          {/* ===================================================================== */}
          {/* RIGHT COLUMN: READABLE LEGAL CONTENT COLUMN                           */}
          {/* ===================================================================== */}
          <main className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-[#DCE1D8] shadow-xs space-y-14">
            
            {/* Transparency Banner */}
            <div className="rounded-2xl p-4 sm:p-5 bg-[#F7F4ED] border border-[#DCE1D8] flex items-start gap-3.5 text-xs text-[#465640] leading-relaxed">
              <AlertCircle className="w-4 h-4 text-[#263D2B] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#10110F] font-semibold block mb-0.5">
                  Transparency Notice &amp; Confirmed Studio Practices
                </strong>
                These terms reflect our confirmed salon operations, transparent Canadian Dollar pricing, single-guest atelier model, and flexible scheduling policies. We do not charge hidden fees or upfront booking deposits.
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* 1. INTRODUCTION */}
            {/* ------------------------------------------------------------- */}
            <article id="introduction" className="space-y-4 pt-2">
              <div className="flex items-center gap-3 border-b border-[#DCE1D8] pb-3">
                <span className="w-8 h-8 rounded-full bg-[#263D2B] text-white flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                  1
                </span>
                <div className="min-w-0">
                  <h2 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal tracking-tight">
                    Introduction
                  </h2>
                  <p className="text-[11px] text-[#6B7068] uppercase tracking-wider font-mono">Purpose of terms and website usage</p>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-[#465640] leading-relaxed space-y-3 font-light">
                <p>
                  Welcome to <strong className="text-[#10110F] font-medium">GLAM GIRL BY JANKI</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;, or &ldquo;the Salon&rdquo;). We provide luxury aesthetics, hair couture, bridal styling, therapeutic skin treatments, and beauty rituals at our private studio atelier located at <strong className="text-[#10110F] font-medium">405 Euphoria Crescent, Ottawa, ON K2J 7M7</strong>.
                </p>
                <p>
                  These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to and use of our website, reservation platform, and all in-studio beauty services. By accessing our website, reserving an appointment, or receiving a treatment, you acknowledge that you have read, understood, and agreed to be bound by these Terms. If you do not agree with any part of these Terms, please contact our concierge prior to booking.
                </p>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* 2. APPOINTMENTS & BOOKINGS */}
            {/* ------------------------------------------------------------- */}
            <article id="appointments" className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#DCE1D8] pb-3">
                <span className="w-8 h-8 rounded-full bg-[#263D2B] text-white flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                  2
                </span>
                <div className="min-w-0">
                  <h2 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal tracking-tight">
                    Appointments &amp; Bookings
                  </h2>
                  <p className="text-[11px] text-[#6B7068] uppercase tracking-wider font-mono">Booking requests, confirmations &amp; availability</p>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-[#465640] leading-relaxed space-y-3 font-light">
                <p>
                  All appointments may be scheduled directly through our online reservation portal at <Link to="/book-appointment" className="text-[#263D2B] font-medium underline underline-offset-2">/book-appointment</Link>, via telephone at <a href="tel:+16162550549" className="text-[#263D2B] font-medium hover:underline">+1 (616) 255-0549</a>, or through our online inquiry concierge.
                </p>
                <p>
                  Appointments are subject to slot availability on a real-time basis. When you complete an online booking request, your reservation is confirmed immediately with an on-screen confirmation summary detailing the selected ritual, appointment date, time, and confirmed Canadian Dollar price.
                </p>
                <p>
                  Because we operate on an exclusive, peaceful single-guest atelier model, each reserved time window is dedicated entirely to your personal consultation and care.
                </p>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* 3. CANCELLATIONS & RESCHEDULING */}
            {/* ------------------------------------------------------------- */}
            <article id="cancellations" className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#DCE1D8] pb-3">
                <span className="w-8 h-8 rounded-full bg-[#263D2B] text-white flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                  3
                </span>
                <div className="min-w-0">
                  <h2 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal tracking-tight">
                    Cancellations &amp; Rescheduling
                  </h2>
                  <p className="text-[11px] text-[#6B7068] uppercase tracking-wider font-mono">Flexible scheduling rules &amp; courtesy notice</p>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-[#465640] leading-relaxed space-y-3 font-light">
                <p>
                  We understand that personal schedules and commitments can shift unpredictably. In alignment with our customer-centric ethos, GLAM GIRL BY JANKI offers <strong className="text-[#10110F] font-medium">flexible cancellation and rescheduling without penalties</strong>.
                </p>
                <p>
                  As a courtesy to our master aesthetic team and waiting guests, we kindly request a minimum of <strong className="text-[#10110F] font-medium">24 hours advance notice</strong> whenever you need to reschedule or cancel your reservation. This allows us sufficient time to offer the open suite reservation to other guests.
                </p>
                
                {/* Highlight Card */}
                <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1 text-xs">
                  <div className="font-bold text-[#10110F] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#263D2B]" />
                    <span>Confirmed Salon Policy: Zero Cancellation Fees</span>
                  </div>
                  <p className="text-[#6B7068]">
                    We do not charge cancellation fees or penalty deductions. Should any specialized group bridal contracts require customized date-hold terms, those will be agreed upon in writing directly with the salon director.
                  </p>
                </div>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* 4. PRICING & PAYMENTS */}
            {/* ------------------------------------------------------------- */}
            <article id="pricing" className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#DCE1D8] pb-3">
                <span className="w-8 h-8 rounded-full bg-[#263D2B] text-white flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                  4
                </span>
                <div className="min-w-0">
                  <h2 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal tracking-tight">
                    Pricing &amp; Payments
                  </h2>
                  <p className="text-[11px] text-[#6B7068] uppercase tracking-wider font-mono">CAD currency, price transparency &amp; payment methods</p>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-[#465640] leading-relaxed space-y-3 font-light">
                <p>
                  All prices published on our website, in our <Link to="/price-list" className="text-[#263D2B] font-medium underline underline-offset-2">All Services Price List</Link>, and throughout the booking flow are quoted in <strong className="text-[#10110F] font-medium">Canadian Dollars (CAD)</strong>.
                </p>
                <p>
                  We uphold 100% price transparency. The price of your reserved treatment is confirmed upfront before any service begins. Any optional bespoke additions, upgrades, or specialized treatments will be clearly communicated and agreed upon with you beforehand.
                </p>
                <p>
                  Payment is rendered in person at the studio atelier upon the successful completion of your treatment. We accept:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li><strong className="text-[#10110F]">Cash on Delivery (Pay at Appointment)</strong> (Exact Canadian Dollar cash amount appreciated upon service completion)</li>
                </ul>
                <p>
                  Applicable taxes (including Ontario Harmonized Sales Tax - HST) follow official provincial and federal tax regulations where applicable.
                </p>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* 5. DEPOSITS, REFUNDS & NO-SHOWS */}
            {/* ------------------------------------------------------------- */}
            <article id="deposits" className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#DCE1D8] pb-3">
                <span className="w-8 h-8 rounded-full bg-[#263D2B] text-white flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                  5
                </span>
                <div className="min-w-0">
                  <h2 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal tracking-tight">
                    Deposits, Refunds &amp; No-Shows
                  </h2>
                  <p className="text-[11px] text-[#6B7068] uppercase tracking-wider font-mono">No advance deposit &amp; 48-hr satisfaction assurance</p>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-[#465640] leading-relaxed space-y-3 font-light">
                <p>
                  <strong className="text-[#10110F] font-medium">Zero Advance Deposit:</strong> You are not required to provide credit card prepayment or advance financial deposits to secure a standard online appointment.
                </p>
                <p>
                  <strong className="text-[#10110F] font-medium">Service-Based Adjustments &amp; Refunds:</strong> Salon services, custom hair coloring, bridal mehndi, and skincare therapies represent custom aesthetic labor, professional consultation, and formulated product usage. Completed treatments are non-refundable. However, your complete satisfaction is our highest priority: if any treatment does not meet your expectations, please notify master director Janki Khatroja within <strong className="text-[#10110F] font-medium">48 hours</strong> of your visit so we may provide a complimentary touch-up, corrective styling, or personalized resolution.
                </p>
                <p>
                  <strong className="text-[#10110F] font-medium">No-Shows:</strong> If an unforeseen circumstance prevents you from attending, we request that you notify our atelier as promptly as possible via phone or message so our aesthetic specialists may accommodate waiting guests.
                </p>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* 6. SERVICES & RESULTS */}
            {/* ------------------------------------------------------------- */}
            <article id="services" className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#DCE1D8] pb-3">
                <span className="w-8 h-8 rounded-full bg-[#263D2B] text-white flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                  6
                </span>
                <div className="min-w-0">
                  <h2 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal tracking-tight">
                    Services &amp; Results
                  </h2>
                  <p className="text-[11px] text-[#6B7068] uppercase tracking-wider font-mono">Individual variation &amp; realistic consultations</p>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-[#465640] leading-relaxed space-y-3 font-light">
                <p>
                  Each treatment at GLAM GIRL BY JANKI is customized to your individual skin profile, hair texture, bone structure, and beauty preferences using premium botanical, hypoallergenic, and professional-grade formulations.
                </p>
                <p>
                  Because beauty, hair coloring, lash lifting, and skin treatments interact uniquely with individual biology, lifestyle, previous chemical applications, and home care routines, <strong className="text-[#10110F] font-medium">individual results may vary</strong>. We do not provide absolute guarantees of specific outcomes (such as permanent hair color longevity or universal dermal reactions).
                </p>
                <p>
                  A thorough personalized consultation is provided prior to the commencement of every ritual to assess suitability and set clear, collaborative expectations.
                </p>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* 7. CUSTOMER RESPONSIBILITIES */}
            {/* ------------------------------------------------------------- */}
            <article id="responsibilities" className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#DCE1D8] pb-3">
                <span className="w-8 h-8 rounded-full bg-[#263D2B] text-white flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                  7
                </span>
                <div className="min-w-0">
                  <h2 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal tracking-tight">
                    Customer Responsibilities
                  </h2>
                  <p className="text-[11px] text-[#6B7068] uppercase tracking-wider font-mono">Accurate details, sensitivities &amp; aftercare</p>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-[#465640] leading-relaxed space-y-3 font-light">
                <p>
                  To ensure a safe, exceptional, and serene experience for every guest, you agree to:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                  <li>
                    <strong className="text-[#10110F]">Accurate Booking Information:</strong> Provide correct contact details (full name, phone number, email address) so our concierge can reach you regarding appointment confirmations.
                  </li>
                  <li>
                    <strong className="text-[#10110F]">Health &amp; Allergy Disclosures:</strong> Inform your aesthetician prior to treatment of any skin sensitivities, known product allergies (e.g., latex, nuts, essential oils, wax, henna), active dermatological conditions, recent chemical peels, Retin-A / Accutane usage, or pregnancy.
                  </li>
                  <li>
                    <strong className="text-[#10110F]">Preliminary Patch Testing:</strong> Request or participate in an allergy patch test when trying new hair dyes, lash tinting, or chemical formulations if you have a history of sensitive skin.
                  </li>
                  <li>
                    <strong className="text-[#10110F]">Aftercare Compliance:</strong> Follow professional aftercare guidance provided by your specialist to maintain your treatment results and protect your skin and hair health.
                  </li>
                </ul>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* 8. LATE ARRIVALS */}
            {/* ------------------------------------------------------------- */}
            <article id="late-arrivals" className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#DCE1D8] pb-3">
                <span className="w-8 h-8 rounded-full bg-[#263D2B] text-white flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                  8
                </span>
                <div className="min-w-0">
                  <h2 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal tracking-tight">
                    Late Arrivals
                  </h2>
                  <p className="text-[11px] text-[#6B7068] uppercase tracking-wider font-mono">Arrival etiquette &amp; zero penalty fees</p>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-[#465640] leading-relaxed space-y-3 font-light">
                <p>
                  We recommend arriving <strong className="text-[#10110F] font-medium">5 to 10 minutes prior</strong> to your scheduled appointment time. This allows you an unhurried arrival, a moment to unwind in our lounge, and ample consultation time.
                </p>
                <p>
                  If you anticipate being delayed, please phone our atelier as soon as possible. Because we operate dedicated time slots to protect every guest&apos;s privacy, significant delays may necessitate shortening your treatment duration so that subsequent guests are not impacted.
                </p>
                <p>
                  We do not charge financial penalties or late fees for delays.
                </p>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* 9. OFFERS & DISCOUNTS */}
            {/* ------------------------------------------------------------- */}
            <article id="offers" className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#DCE1D8] pb-3">
                <span className="w-8 h-8 rounded-full bg-[#263D2B] text-white flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                  9
                </span>
                <div className="min-w-0">
                  <h2 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal tracking-tight">
                    Offers &amp; Discounts
                  </h2>
                  <p className="text-[11px] text-[#6B7068] uppercase tracking-wider font-mono">Published conditions &amp; non-transferability</p>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-[#465640] leading-relaxed space-y-3 font-light">
                <p>
                  From time to time, GLAM GIRL BY JANKI may introduce promotional offers, seasonal discounts, or bridal beauty bundles. All offers are subject to their specifically published terms, minimum service requirements, and stated expiry dates.
                </p>
                <p>
                  Promotional discounts cannot be combined with other offers unless explicitly indicated, are non-transferable, and possess no cash redeemable value. We reserve the right to modify or conclude promotional packages in accordance with studio capacity.
                </p>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* 10. WEBSITE CONTENT & INTELLECTUAL PROPERTY */}
            {/* ------------------------------------------------------------- */}
            <article id="intellectual-property" className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#DCE1D8] pb-3">
                <span className="w-8 h-8 rounded-full bg-[#263D2B] text-white flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                  10
                </span>
                <div className="min-w-0">
                  <h2 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal tracking-tight">
                    Website Content &amp; Intellectual Property
                  </h2>
                  <p className="text-[11px] text-[#6B7068] uppercase tracking-wider font-mono">Original branding &amp; authorized digital use</p>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-[#465640] leading-relaxed space-y-3 font-light">
                <p>
                  All materials, branding, logos, trademarks (&ldquo;GLAM GIRL BY JANKI&rdquo;), custom treatment titles, photography, textual descriptions, color palettes, and digital layout on this website are the proprietary property of GLAM GIRL BY JANKI and are protected by applicable Canadian and international intellectual property laws.
                </p>
                <p>
                  You are granted a limited, revocable license to access this website for personal, non-commercial purposes (viewing services, researching treatments, checking prices, and reserving appointments). Reproducing, distributing, republishing, modifying, scraping, or exploiting any content without prior written authorization from the salon director is strictly prohibited.
                </p>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* 11. PRIVACY & PERSONAL INFORMATION */}
            {/* ------------------------------------------------------------- */}
            <article id="privacy" className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#DCE1D8] pb-3">
                <span className="w-8 h-8 rounded-full bg-[#263D2B] text-white flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                  11
                </span>
                <div className="min-w-0">
                  <h2 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal tracking-tight">
                    Privacy &amp; Personal Information
                  </h2>
                  <p className="text-[11px] text-[#6B7068] uppercase tracking-wider font-mono">Confidentiality &amp; zero data monetization</p>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-[#465640] leading-relaxed space-y-3 font-light">
                <p>
                  Your privacy is paramount. Personal details submitted through our website or reservation portal (including full name, phone number, email address, and service notes) are utilized exclusively to coordinate your appointment, confirm reservations, provide treatment consultations, and communicate important updates.
                </p>
                <p>
                  We maintain strict single-occupancy confidentiality. We <strong className="text-[#10110F] font-medium">do not sell, lease, or monetize</strong> your personal information to third-party advertising brokers or external marketing networks.
                </p>
                <p>
                  For complete information regarding how client records are protected and handled, please visit our dedicated <Link to="/privacy-policy" className="text-[#263D2B] font-medium underline underline-offset-2">Privacy Policy</Link> page. For additional inquiries, you may reach out directly to our privacy concierge at <a href="mailto:Glamgirlbyjanki@gmail.com" className="text-[#263D2B] font-medium underline underline-offset-2">Glamgirlbyjanki@gmail.com</a>.
                </p>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* 12. THIRD-PARTY SERVICES */}
            {/* ------------------------------------------------------------- */}
            <article id="third-party" className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#DCE1D8] pb-3">
                <span className="w-8 h-8 rounded-full bg-[#263D2B] text-white flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                  12
                </span>
                <div className="min-w-0">
                  <h2 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal tracking-tight">
                    Third-Party Services
                  </h2>
                  <p className="text-[11px] text-[#6B7068] uppercase tracking-wider font-mono">External communication tools &amp; payment processors</p>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-[#465640] leading-relaxed space-y-3 font-light">
                <p>
                  Our digital experience may incorporate links or integrations with reputable third-party services, such as:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li><strong className="text-[#10110F]">Communication Platforms:</strong> Direct WhatsApp messaging, SMS reminders, and telephone protocols.</li>
                  <li><strong className="text-[#10110F]">Mapping &amp; Navigation:</strong> Google Maps and local Ottawa navigation tools for atelier directions.</li>
                  <li><strong className="text-[#10110F]">Payment Terminals:</strong> Certified in-person Interac and credit card processing merchant hardware.</li>
                </ul>
                <p>
                  We are not responsible for the privacy practices, content, or independent terms of third-party platforms. We encourage you to review their respective policies when navigating outside our website.
                </p>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* 13. CHANGES TO THESE TERMS */}
            {/* ------------------------------------------------------------- */}
            <article id="changes" className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#DCE1D8] pb-3">
                <span className="w-8 h-8 rounded-full bg-[#263D2B] text-white flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                  13
                </span>
                <div className="min-w-0">
                  <h2 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal tracking-tight">
                    Changes to These Terms
                  </h2>
                  <p className="text-[11px] text-[#6B7068] uppercase tracking-wider font-mono">Periodic updates &amp; latest revision notices</p>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-[#465640] leading-relaxed space-y-3 font-light">
                <p>
                  GLAM GIRL BY JANKI reserves the right to amend, update, or revise these Terms &amp; Conditions periodically to reflect modifications in salon operations, statutory requirements, or booking system enhancements.
                </p>
                <p>
                  Any updates will be published directly on this page with an updated &ldquo;Last Updated&rdquo; date at the top. Your continued access to our website or booking of salon services following the publication of revised terms constitutes your acceptance of the updated terms.
                </p>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* 14. CONTACT INFORMATION */}
            {/* ------------------------------------------------------------- */}
            <article id="contact" className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#DCE1D8] pb-3">
                <span className="w-8 h-8 rounded-full bg-[#263D2B] text-white flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                  14
                </span>
                <div className="min-w-0">
                  <h2 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal tracking-tight">
                    Contact Information
                  </h2>
                  <p className="text-[11px] text-[#6B7068] uppercase tracking-wider font-mono">Salon atelier address, phone &amp; concierge</p>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-[#465640] leading-relaxed space-y-4 font-light">
                <p>
                  If you have questions, feedback, or require clarification regarding these Terms &amp; Conditions or studio booking policies, our concierge team is at your service:
                </p>
                
                {/* Contact Card */}
                <div className="rounded-2xl p-6 bg-[#F7F4ED] border border-[#DCE1D8] space-y-3 text-xs sm:text-sm">
                  <div className="font-serif text-lg font-semibold text-[#10110F]">
                    GLAM GIRL BY JANKI
                  </div>
                  <div className="text-xs text-[#6B7068] font-mono uppercase tracking-wider">
                    Master Director: Janki Patel (Khatroja)
                  </div>
                  
                  <div className="pt-2 space-y-2.5 text-[#10110F]">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#263D2B] flex-shrink-0 mt-0.5" />
                      <span>405 Euphoria Crescent, Ottawa, ON K2J 7M7, Canada</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
                      <a href="tel:+16162550549" className="hover:text-[#263D2B] transition-colors font-medium">
                        +1 (616) 255-0549
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
                      <a href="mailto:Glamgirlbyjanki@gmail.com" className="hover:text-[#263D2B] transition-colors font-medium">
                        Glamgirlbyjanki@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#DCE1D8] flex flex-wrap items-center gap-3">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[4px] bg-[#263D2B] text-white text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#1C2E20] transition-colors"
                    >
                      <span>SEND INQUIRY</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <Link
                      to="/contact#faqs"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[4px] bg-white border border-[#DCE1D8] text-[#10110F] text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#F7F4ED] transition-colors"
                    >
                      <span>READ FAQ</span>
                    </Link>
                    <Link
                      to="/price-list"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[4px] bg-white border border-[#DCE1D8] text-[#10110F] text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#F7F4ED] transition-colors"
                    >
                      <span>PRICE LIST</span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>

          </main>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. BOTTOM CONCIERGE CTA                                                   */}
      {/* ========================================================================= */}
      <section className="print:hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-16 sm:mt-24">
        <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-14 border border-[#DCE1D8] shadow-lg text-center relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B]">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>QUESTIONS ABOUT OUR POLICIES?</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl text-[#10110F] font-normal tracking-tight">
              We&apos;re Here to Assist You
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light">
              Whether you need to clarify treatment details, request custom bridal arrangements, or reserve a visit, our atelier is ready to welcome you.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
              <Link
                to="/contact"
                className="global-button-secondary btn-luxury-arrow w-full sm:w-auto inline-flex items-center justify-center gap-2 !px-7 !py-3.5 text-xs font-bold uppercase tracking-[0.16em] cursor-pointer"
              >
                <span>CONTACT CONCIERGE</span>
                <span className="arrow-symbol text-sm font-normal">→</span>
              </Link>

              <Link
                to="/book-appointment"
                className="global-button w-full sm:w-auto inline-flex items-center justify-center gap-2 !px-8 !py-3.5 text-xs font-bold uppercase tracking-[0.16em] shadow-md cursor-pointer"
              >
                <span>BOOK APPOINTMENT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FLOATING BACK TO TOP BUTTON                                            */}
      {/* ========================================================================= */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#263D2B] text-white shadow-xl hover:bg-[#1C2E20] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer animate-fade-in border border-white/20"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}
