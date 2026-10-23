import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  CreditCard, 
  Share2, 
  Shield, 
  Trash2, 
  Cookie, 
  UserCheck, 
  Baby, 
  RefreshCw, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Calendar, 
  ChevronRight, 
  ArrowUp, 
  CheckCircle2, 
  HelpCircle,
  Sparkles,
  ExternalLink,
  Info
} from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import salonDB from '../db/salonDatabase';
import ScrollReveal from '../components/ScrollReveal/ScrollReveal';

// 14 Comprehensive Privacy Policy Sections
const POLICY_SECTIONS = [
  { id: 'introduction', number: '01', title: 'Introduction & Scope', icon: FileText },
  { id: 'information-we-collect', number: '02', title: 'Information We Collect', icon: Eye },
  { id: 'how-we-use-information', number: '03', title: 'How We Use Your Information', icon: Sparkles },
  { id: 'customer-accounts', number: '04', title: 'Customer Accounts & Authentication', icon: Lock },
  { id: 'appointment-booking-info', number: '05', title: 'Appointment & Booking Information', icon: Calendar },
  { id: 'payments', number: '06', title: 'In-Studio Payment Processing (COD Only)', icon: CreditCard },
  { id: 'information-sharing', number: '07', title: 'Information Sharing & Third Parties', icon: Share2 },
  { id: 'data-security', number: '08', title: 'Data Security & Technical Safeguards', icon: Shield },
  { id: 'data-retention-deletion', number: '09', title: 'Data Retention & Deletion Requests', icon: Trash2 },
  { id: 'cookies-browser-storage', number: '10', title: 'Cookies & Browser Storage Technologies', icon: Cookie },
  { id: 'customer-rights', number: '11', title: 'Your Privacy Rights (PIPEDA & Ontario)', icon: UserCheck },
  { id: 'childrens-privacy', number: '12', title: "Children's & Teen Privacy", icon: Baby },
  { id: 'policy-updates', number: '13', title: 'Changes to This Privacy Policy', icon: RefreshCw },
  { id: 'contact-us', number: '14', title: 'Contact Our Privacy Concierge', icon: Phone },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  // Dynamic / configured studio settings
  const settings = salonDB.getSettings() || {};
  const studioName = settings.businessName || SALON_INFO.name;
  const studioPhone = settings.phone || SALON_INFO.phone;
  const studioEmail = settings.email || SALON_INFO.email;
  const studioAddress = `${settings.address || SALON_INFO.address}, ${settings.city || SALON_INFO.city}`;
  const studioHours = settings.hours || 'Mon-Sat: 9:30 AM – 7:30 PM • Sun: 10:00 AM – 5:30 PM';
  
  // Real verified date
  const lastUpdatedDate = 'October 16, 2026';

  useEffect(() => {
    document.title = 'Privacy Policy — GLAM GIRL BY JANKI | Ottawa';
    window.scrollTo({ top: 0, behavior: 'instant' });

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const scrollPosition = window.scrollY + 220;
      for (let i = POLICY_SECTIONS.length - 1; i >= 0; i--) {
        const secId = POLICY_SECTIONS[i].id;
        const el = document.getElementById(secId);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(secId);
          break;
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
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementPosition - navOffset),
        behavior: 'smooth'
      });
      setActiveSection(id);
      setMobileTocOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F4ED] text-[#10110F] pt-24 sm:pt-28 pb-16 sm:pb-24 selection:bg-[#263D2B] selection:text-white font-sans antialiased">
      
      {/* ========================================================================= */}
      {/* 1. HERO HEADER                                                            */}
      {/* ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center pt-6 sm:pt-12 pb-10 sm:pb-14 animate-fade-in border-b border-[#DCE1D8]">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[#263D2B] text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.22em] mb-5 shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B]" />
          <span>YOUR PRIVACY MATTERS</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#10110F] font-normal tracking-tight leading-[1.14] mb-5">
          Your Trust. Our Commitment.
        </h1>

        <p className="font-sans text-xs sm:text-base md:text-lg text-[#6B7068] max-w-2xl mx-auto leading-relaxed font-light mb-6">
          Learn how we handle your personal information when you visit our website or book a beauty appointment.
        </p>

        <div className="inline-flex items-center gap-3 text-xs text-[#6B7068] bg-white px-4 py-2 rounded-full border border-[#DCE1D8] shadow-2xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Last Updated: <strong className="text-[#10110F] font-semibold">{lastUpdatedDate}</strong></span>
          <span>•</span>
          <span>Effective: Immediate</span>
        </div>

        {/* Quick Action Badges */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/book-appointment"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] bg-[#263D2B] hover:bg-[#1C2E20] text-white text-xs font-bold uppercase tracking-[0.16em] shadow-sm transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Appointment</span>
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] bg-white hover:bg-[#F7F4ED] border border-[#DCE1D8] hover:border-[#263D2B] text-[#263D2B] text-xs font-bold uppercase tracking-[0.16em] shadow-2xs transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Us</span>
          </Link>
          <Link
            to="/terms-and-conditions"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[4px] bg-white hover:bg-[#F7F4ED] border border-[#DCE1D8] text-[#6B7068] hover:text-[#10110F] text-xs font-semibold uppercase tracking-wider transition-all"
          >
            <span>Terms of Service</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <Link
            to="/contact#faqs"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[4px] bg-white hover:bg-[#F7F4ED] border border-[#DCE1D8] text-[#6B7068] hover:text-[#10110F] text-xs font-semibold uppercase tracking-wider transition-all"
          >
            <span>FAQ Help Center</span>
            <HelpCircle className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT GRID: STICKY TOC SIDEBAR + 14 POLICY SECTIONS              */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        
        {/* Mobile Quick-Jump Dropdown / TOC Trigger */}
        <div className="lg:hidden mb-6 sticky top-[76px] z-30">
          <button
            type="button"
            onClick={() => setMobileTocOpen(!mobileTocOpen)}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#DCE1D8] shadow-md text-xs font-bold text-[#10110F]"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#263D2B]" />
              <span>Table of Contents: Jump to Section</span>
            </div>
            <ChevronRight className={`w-4 h-4 text-[#6B7068] transition-transform ${mobileTocOpen ? 'rotate-90' : ''}`} />
          </button>

          {mobileTocOpen && (
            <div className="mt-2 p-3 bg-white rounded-2xl border border-[#DCE1D8] shadow-xl max-h-72 overflow-y-auto space-y-1 animate-fade-in">
              {POLICY_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full text-left p-2 rounded-xl text-xs font-medium flex items-center justify-between cursor-pointer ${
                    activeSection === sec.id
                      ? 'bg-[#263D2B] text-white font-bold'
                      : 'text-[#6B7068] hover:bg-[#F7F4ED] hover:text-[#10110F]'
                  }`}
                >
                  <span className="truncate pr-2">{sec.number}. {sec.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 opacity-70" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* ===================================================================== */}
          {/* DESKTOP STICKY TABLE OF CONTENTS (COL 1-4)                            */}
          {/* ===================================================================== */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-5">
            <div className="bg-white rounded-3xl p-5 border border-[#DCE1D8] shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCE1D8]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#263D2B]" />
                  <h3 className="font-serif text-sm font-bold text-[#10110F] uppercase tracking-wider">
                    Policy Index
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-[#6B7068] bg-[#F7F4ED] px-2 py-0.5 rounded-full border border-[#DCE1D8]">
                  14 Sections
                </span>
              </div>

              {/* Scrollable List of 14 Sections */}
              <nav className="space-y-1 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
                {POLICY_SECTIONS.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;

                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer group ${
                        isActive
                          ? 'bg-[#263D2B] text-white shadow-xs font-semibold'
                          : 'text-[#6B7068] hover:bg-[#F7F4ED] hover:text-[#10110F]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate pr-2">
                        <span className={`text-[10px] font-mono font-bold w-5 ${isActive ? 'text-white' : 'text-[#263D2B]'}`}>
                          {sec.number}
                        </span>
                        <span className="truncate">{sec.title}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${
                        isActive ? 'text-white translate-x-0.5' : 'text-[#6B7068]/50 group-hover:translate-x-0.5'
                      }`} />
                    </button>
                  );
                })}
              </nav>

              {/* Concierge Help Card */}
              <div className="pt-3 border-t border-[#DCE1D8] bg-[#F7F4ED] -mx-5 -mb-5 p-4 rounded-b-3xl space-y-2">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#263D2B] block">
                  Privacy Inquiries
                </span>
                <p className="text-[11px] text-[#6B7068] leading-relaxed">
                  Questions regarding your personal information? Connect with our dedicated Privacy Concierge directly.
                </p>
                <a
                  href={`mailto:${studioEmail}`}
                  className="text-xs font-bold text-[#10110F] hover:text-[#263D2B] flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#263D2B]" />
                  <span>{studioEmail}</span>
                </a>
              </div>
            </div>
          </aside>

          {/* ===================================================================== */}
          {/* ARTICLE CONTENT: ALL 14 SECTIONS (COL 5-12)                           */}
          {/* ===================================================================== */}
          <article className="lg:col-span-8 space-y-12 sm:space-y-16">

            {/* ----------------------------------------------------------------- */}
            {/* 1. INTRODUCTION                                                   */}
            {/* ----------------------------------------------------------------- */}
            <section id="introduction" className="scroll-mt-32 space-y-4">
              <div className="flex items-center gap-2 text-[#263D2B]">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#263D2B]/10">01</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">PURPOSE &amp; GOVERNANCE</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                1. Introduction &amp; Scope
              </h2>
              <div className="prose prose-sm text-[#6B7068] leading-relaxed space-y-3 font-normal">
                <p>
                  Welcome to <strong>{studioName}</strong>. This Privacy Policy outlines our uncompromising dedication to safeguarding your privacy and personal data when you interact with our website, browse our beauty catalogue, register a patron account, or schedule a salon ritual.
                </p>
                <p>
                  Founded and directed by Master Beauty Artist <strong>Janki Khatroja</strong>, our studio is located at <strong>{studioAddress}</strong>. We operate as a private, single-guest luxury beauty haven designed around discreet, tailored self-care experiences.
                </p>
                <p>
                  We govern our data collection and handling in accordance with applicable Canadian federal legislation, specifically the <em>Personal Information Protection and Electronic Documents Act</em> (<strong>PIPEDA</strong>), alongside Ontario provincial privacy standards and fair information practices.
                </p>
              </div>
            </section>

            {/* ----------------------------------------------------------------- */}
            {/* 2. INFORMATION WE COLLECT                                         */}
            {/* ----------------------------------------------------------------- */}
            <section id="information-we-collect" className="scroll-mt-32 space-y-4 border-t border-[#DCE1D8] pt-10">
              <div className="flex items-center gap-2 text-[#263D2B]">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#263D2B]/10">02</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">TRANSPARENT COLLECTION</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                2. Information We Collect
              </h2>
              <p className="text-sm text-[#6B7068] leading-relaxed">
                We only collect information that is strictly necessary to deliver personalized salon services, schedule appointments, and support client communications. This comprises:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-[#DCE1D8] space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-base text-[#10110F]">Personal Identifiers</h3>
                  <p className="text-xs text-[#6B7068] leading-relaxed">
                    Full name, telephone number, and email address provided when booking an appointment, filling out our contact form, or registering an account.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#DCE1D8] space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-base text-[#10110F]">Account Credentials</h3>
                  <p className="text-xs text-[#6B7068] leading-relaxed">
                    Email address and irreversibly hashed password strings. We never store, display, or transmit your plain-text passwords.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#DCE1D8] space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-base text-[#10110F]">Booking &amp; Consultation Records</h3>
                  <p className="text-xs text-[#6B7068] leading-relaxed">
                    Selected salon treatments, combo packages, appointment dates, preferred time slots, and optional special notes (such as skin sensitivities or styling preferences).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#DCE1D8] space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-base text-[#10110F]">Guest Inquiries &amp; Reviews</h3>
                  <p className="text-xs text-[#6B7068] leading-relaxed">
                    Messages submitted through our Contact Page, voluntary star ratings, and patron reviews submitted following completed treatments.
                  </p>
                </div>
              </div>
            </section>

            {/* ----------------------------------------------------------------- */}
            {/* 3. HOW WE USE YOUR INFORMATION                                    */}
            {/* ----------------------------------------------------------------- */}
            <section id="how-we-use-information" className="scroll-mt-32 space-y-4 border-t border-[#DCE1D8] pt-10">
              <div className="flex items-center gap-2 text-[#263D2B]">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#263D2B]/10">03</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">GENUINE BUSINESS PURPOSES</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                3. How We Use Your Information
              </h2>
              <div className="prose prose-sm text-[#6B7068] leading-relaxed space-y-3 font-normal">
                <p>
                  We strictly process your personal information for lawful and direct operational purposes related to your beauty treatments. Specific uses include:
                </p>
                <ul className="space-y-2 list-none pl-0">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#263D2B] flex-shrink-0 mt-0.5" />
                    <span><strong>Appointment Scheduling:</strong> Reserving master artist time slots, calculating exact treatment durations, and preventing overlapping schedule collisions.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#263D2B] flex-shrink-0 mt-0.5" />
                    <span><strong>Client Communications:</strong> Generating unique appointment reference codes (e.g. <code>GGJ-XXXXXX</code>) and sending automated booking confirmation summaries.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#263D2B] flex-shrink-0 mt-0.5" />
                    <span><strong>Tailored Care &amp; Safety:</strong> Reviewing disclosed notes or sensitivities to prepare sanitized tools and customized botanical products prior to your arrival.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#263D2B] flex-shrink-0 mt-0.5" />
                    <span><strong>Customer Support:</strong> Answering inquiries sent via the Contact page or direct studio email regarding services, pricing, or bridal consultations.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#263D2B] flex-shrink-0 mt-0.5" />
                    <span><strong>Optional Newsletters:</strong> Sending seasonal festival announcements or exclusive patron discounts if you expressly subscribed (with immediate one-click unsubscribe access).</span>
                  </li>
                </ul>
                <div className="p-4 rounded-xl bg-white border border-[#DCE1D8] text-xs text-[#10110F] font-medium">
                  <strong>Zero Data Monetization:</strong> We do not sell, rent, lease, trade, or monetize your personal details to third-party marketing companies, advertisers, or data aggregators under any circumstances.
                </div>
              </div>
            </section>

            {/* ----------------------------------------------------------------- */}
            {/* 4. CUSTOMER ACCOUNTS                                              */}
            {/* ----------------------------------------------------------------- */}
            <section id="customer-accounts" className="scroll-mt-32 space-y-4 border-t border-[#DCE1D8] pt-10">
              <div className="flex items-center gap-2 text-[#263D2B]">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#263D2B]/10">04</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">PATRON PORTAL</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                4. Customer Accounts &amp; Authentication
              </h2>
              <div className="prose prose-sm text-[#6B7068] leading-relaxed space-y-3 font-normal">
                <p>
                  While appointment bookings can be submitted as a guest, creating a patron account unlocks advanced convenience, including appointment history tracking, one-click rescheduling, review submissions, and personalized birthday preferences.
                </p>
                <div className="p-4 rounded-2xl bg-white border border-[#DCE1D8] space-y-2 text-xs">
                  <h3 className="font-serif text-sm font-bold text-[#10110F]">Cryptographic Password Protection</h3>
                  <p className="text-[#6B7068]">
                    When you create an account, your password is converted into an irreversible cryptographic hash (using client-side SHA-256 and server-side cryptographic hashing) before being committed to the database. Plain-text passwords are never recorded in logs or database tables.
                  </p>
                </div>
                <p>
                  Active login sessions are maintained via secure browser session storage (<code>glfy_db_session_user</code>), which naturally terminates when you log out or close your browser tab. We encourage patrons to select strong, distinct passwords and maintain the secrecy of their credentials.
                </p>
              </div>
            </section>

            {/* ----------------------------------------------------------------- */}
            {/* 5. APPOINTMENT AND BOOKING INFORMATION                            */}
            {/* ----------------------------------------------------------------- */}
            <section id="appointment-booking-info" className="scroll-mt-32 space-y-4 border-t border-[#DCE1D8] pt-10">
              <div className="flex items-center gap-2 text-[#263D2B]">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#263D2B]/10">05</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">RITUAL LOGISTICS</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                5. Appointment &amp; Booking Information
              </h2>
              <div className="prose prose-sm text-[#6B7068] leading-relaxed space-y-3 font-normal">
                <p>
                  When you submit an appointment request, our scheduling engine captures the details necessary to orchestrate your private salon session. This includes:
                </p>
                <ul className="space-y-1.5 list-disc pl-5">
                  <li>Unique reservation code (e.g. <code>GGJ-782910</code>) for instant verification.</li>
                  <li>Designated service name, combo package identifiers, and included individual rituals.</li>
                  <li>Selected date, start time, dynamic end time, and calculated total duration in minutes.</li>
                  <li>Assigned Master Beauty Artist (Janki Khatroja).</li>
                  <li>Customer contact numbers, email address, and optional appointment notes.</li>
                  <li>Current reservation status (e.g., <em>Pending</em>, <em>Confirmed</em>, <em>Completed</em>, or <em>Cancelled</em>).</li>
                </ul>
                <p>
                  These records allow the studio to enforce single-guest exclusivity, sanitize treatment chairs between clients, and display live treatment timers within the studio.
                </p>
              </div>
            </section>

            {/* ----------------------------------------------------------------- */}
            {/* 6. PAYMENTS (CASH ON DELIVERY ONLY)                               */}
            {/* ----------------------------------------------------------------- */}
            <section id="payments" className="scroll-mt-32 space-y-4 border-t border-[#DCE1D8] pt-10">
              <div className="flex items-center gap-2 text-[#263D2B]">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#263D2B]/10">06</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">HONEST PAYMENT PROCESS</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                6. Payments &amp; In-Studio Settlement (COD Only)
              </h2>
              <div className="p-5 rounded-2xl bg-white border-2 border-[#263D2B]/20 space-y-3">
                <div className="flex items-center gap-2 text-[#263D2B]">
                  <CreditCard className="w-5 h-5" />
                  <h3 className="font-serif text-base font-bold text-[#10110F]">
                    Cash on Delivery (Pay at Appointment) — Our Sole Payment Method
                  </h3>
                </div>
                <p className="text-xs text-[#6B7068] leading-relaxed">
                  GLAM GIRL BY JANKI exclusively operates on an in-person, <strong>Cash on Delivery (Pay at Appointment)</strong> basis. When booking online, no advance financial commitment is required. Payment is settled in person upon completion of your ritual at the Ottawa studio.
                </p>
                <div className="p-3.5 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs text-[#10110F] space-y-1">
                  <span className="font-bold block">No Online Financial Card Details Collected:</span>
                  <p className="text-[#6B7068]">
                    We do <strong>NOT</strong> collect, request, process, transmit, or store credit card numbers, debit card numbers, PINs, CVV security codes, bank account details, or third-party payment gateway tokens on this website. Any claims to the contrary do not originate from this platform.
                  </p>
                </div>
              </div>
            </section>

            {/* ----------------------------------------------------------------- */}
            {/* 7. INFORMATION SHARING & THIRD PARTIES                            */}
            {/* ----------------------------------------------------------------- */}
            <section id="information-sharing" className="scroll-mt-32 space-y-4 border-t border-[#DCE1D8] pt-10">
              <div className="flex items-center gap-2 text-[#263D2B]">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#263D2B]/10">07</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">VERIFIED THIRD PARTIES</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                7. Information Sharing &amp; Third-Party Services
              </h2>
              <p className="text-sm text-[#6B7068] leading-relaxed">
                We disclose personal details only to the limited external services actually employed to deliver website functionality:
              </p>
              
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white border border-[#DCE1D8] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#10110F]">WhatsApp Click-to-Chat Integration</span>
                    <span className="text-[10px] font-mono text-[#263D2B] bg-[#263D2B]/10 px-2 py-0.5 rounded">Optional</span>
                  </div>
                  <p className="text-xs text-[#6B7068] leading-relaxed">
                    Following booking confirmation, clients may voluntarily click a WhatsApp link (<code>wa.me</code> / <code>api.whatsapp.com</code>) to send pre-formatted appointment details directly to owner Janki Khatroja. Interaction with WhatsApp is subject to Meta's privacy policies.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DCE1D8] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#10110F]">Google Fonts &amp; CDN Infrastructure</span>
                    <span className="text-[10px] font-mono text-[#6B7068] bg-[#F7F4ED] px-2 py-0.5 rounded">Design Assets</span>
                  </div>
                  <p className="text-xs text-[#6B7068] leading-relaxed">
                    Used strictly to render web typography (such as Inter and Cormorant Garamond). Standard browser headers (such as IP address) are processed by Google server nodes to return web font files.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DCE1D8] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#10110F]">Client-Side Visual Libraries</span>
                    <span className="text-[10px] font-mono text-[#6B7068] bg-[#F7F4ED] px-2 py-0.5 rounded">In-Browser</span>
                  </div>
                  <p className="text-xs text-[#6B7068] leading-relaxed">
                    Lightweight client-side animation packages (such as <code>canvas-confetti</code> and <code>lucide-react</code>) execute entirely within your local browser sandbox without tracking or transmitting user identifiers.
                  </p>
                </div>
              </div>
            </section>

            {/* ----------------------------------------------------------------- */}
            {/* 8. DATA SECURITY                                                  */}
            {/* ----------------------------------------------------------------- */}
            <section id="data-security" className="scroll-mt-32 space-y-4 border-t border-[#DCE1D8] pt-10">
              <div className="flex items-center gap-2 text-[#263D2B]">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#263D2B]/10">08</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">PHYSICAL &amp; TECHNICAL SAFEGUARDS</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                8. Data Security
              </h2>
              <div className="prose prose-sm text-[#6B7068] leading-relaxed space-y-3 font-normal">
                <p>
                  We implement reasonable physical, organizational, and technological safeguards to protect your personal information against loss, theft, unauthorized access, disclosure, copying, or modification.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-white border border-[#DCE1D8] text-xs space-y-1">
                    <span className="font-bold text-[#10110F] block">TLS/SSL Encryption</span>
                    <p className="text-[#6B7068]">All data in transit between your browser and our servers is encrypted using modern HTTPS protocols.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-[#DCE1D8] text-xs space-y-1">
                    <span className="font-bold text-[#10110F] block">Role-Based Access Control</span>
                    <p className="text-[#6B7068]">Administrative access to booking records is strictly restricted to authenticated studio staff via dynamic credentials.</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Realistic Security Notice:</strong> While we employ commercially reasonable safeguards, no system of electronic transmission or data storage is completely immune to vulnerabilities. We cannot and do not guarantee absolute security.
                  </p>
                </div>
              </div>
            </section>

            {/* ----------------------------------------------------------------- */}
            {/* 9. DATA RETENTION AND DELETION                                    */}
            {/* ----------------------------------------------------------------- */}
            <section id="data-retention-deletion" className="scroll-mt-32 space-y-4 border-t border-[#DCE1D8] pt-10">
              <div className="flex items-center gap-2 text-[#263D2B]">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#263D2B]/10">09</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">RETENTION &amp; DELETION</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                9. Data Retention &amp; Deletion Requests
              </h2>
              <div className="prose prose-sm text-[#6B7068] leading-relaxed space-y-3 font-normal">
                <p>
                  We retain personal information only for as long as necessary to fulfill the purposes for which it was collected, to provide customer support, and to satisfy accounting and tax retention regulations in Canada.
                </p>
                <div className="p-4 rounded-2xl bg-white border border-[#DCE1D8] space-y-3 text-xs">
                  <h3 className="font-serif text-sm font-bold text-[#10110F]">How to Request Account &amp; Data Deletion</h3>
                  <p className="text-[#6B7068] leading-relaxed">
                    You hold the unconditional right to request the permanent deletion of your patron profile and associated personal data. You can submit this request in two ways:
                  </p>
                  <ol className="list-decimal pl-5 space-y-1 text-[#10110F]">
                    <li>
                      <strong>Self-Service Dashboard:</strong> Sign in to your account, navigate to <em>Patron Dashboard &rarr; Security &amp; Data Privacy</em>, and click <code>Request Account Deletion</code>.
                    </li>
                    <li>
                      <strong>Direct Email Request:</strong> Send an email to <a href={`mailto:${studioEmail}`} className="text-[#263D2B] underline font-bold">{studioEmail}</a> with the subject line <em>"Privacy Deletion Request"</em>.
                    </li>
                  </ol>
                  <p className="text-[#6B7068]">
                    Verified requests are processed within 30 calendar days in compliance with PIPEDA requirements.
                  </p>
                </div>
              </div>
            </section>

            {/* ----------------------------------------------------------------- */}
            {/* 10. COOKIES AND SIMILAR TECHNOLOGIES                              */}
            {/* ----------------------------------------------------------------- */}
            <section id="cookies-browser-storage" className="scroll-mt-32 space-y-4 border-t border-[#DCE1D8] pt-10">
              <div className="flex items-center gap-2 text-[#263D2B]">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#263D2B]/10">10</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">LOCAL STORAGE</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                10. Cookies &amp; Browser Storage Technologies
              </h2>
              <div className="prose prose-sm text-[#6B7068] leading-relaxed space-y-3 font-normal">
                <p>
                  GLAM GIRL BY JANKI does <strong>not</strong> deploy advertising tracking cookies, cross-site tracking pixels, or third-party behavioral profiling scripts. We utilize standard Web Storage APIs strictly to deliver core site operations:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-4 rounded-xl bg-white border border-[#DCE1D8] text-xs space-y-1.5">
                    <span className="font-mono font-bold text-[#263D2B] block">localStorage (glfy_db_*)</span>
                    <p className="text-[#6B7068]">
                      Caches the 72 master salon services, curated combo packages, customer reviews, and local site preferences for instantaneous page load speeds.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-[#DCE1D8] text-xs space-y-1.5">
                    <span className="font-mono font-bold text-[#263D2B] block">sessionStorage (glfy_db_session_user)</span>
                    <p className="text-[#6B7068]">
                      Maintains your active authentication state while navigating between pages and is automatically expunged when the browser tab is closed.
                    </p>
                  </div>
                </div>
                <p>
                  You can clear your browser storage at any time through your browser's history and privacy settings.
                </p>
              </div>
            </section>

            {/* ----------------------------------------------------------------- */}
            {/* 11. CUSTOMER RIGHTS                                               */}
            {/* ----------------------------------------------------------------- */}
            <section id="customer-rights" className="scroll-mt-32 space-y-4 border-t border-[#DCE1D8] pt-10">
              <div className="flex items-center gap-2 text-[#263D2B]">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#263D2B]/10">11</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">PIPEDA &amp; ONTARIO PRIVACY</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                11. Your Privacy Rights
              </h2>
              <div className="prose prose-sm text-[#6B7068] leading-relaxed space-y-3 font-normal">
                <p>
                  Under Canadian privacy laws, you possess fundamental rights regarding how your information is accessed and handled:
                </p>
                <div className="space-y-2">
                  <div className="p-3.5 rounded-xl bg-white border border-[#DCE1D8] text-xs flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#263D2B] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">A</span>
                    <div>
                      <strong className="text-[#10110F]">Right to Access:</strong>
                      <span className="text-[#6B7068] block">You may request a copy of the personal information we hold on file about you. Patrons can also use the self-service <em>Export My Data</em> button in their dashboard.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#DCE1D8] text-xs flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#263D2B] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">B</span>
                    <div>
                      <strong className="text-[#10110F]">Right to Rectification:</strong>
                      <span className="text-[#6B7068] block">You may update or correct inaccurate or outdated contact numbers, preferred names, or email addresses through your profile settings or by reaching out to us.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#DCE1D8] text-xs flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#263D2B] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">C</span>
                    <div>
                      <strong className="text-[#10110F]">Right to Erasure / Account Deletion:</strong>
                      <span className="text-[#6B7068] block">You may request the full deletion of your patron profile and historical records as described in Section 9.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#DCE1D8] text-xs flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#263D2B] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">D</span>
                    <div>
                      <strong className="text-[#10110F]">Right to Withdraw Consent:</strong>
                      <span className="text-[#6B7068] block">You may revoke consent for future promotional communications or newsletters at any time without affecting your past salon care records.</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ----------------------------------------------------------------- */}
            {/* 12. CHILDREN'S PRIVACY                                            */}
            {/* ----------------------------------------------------------------- */}
            <section id="childrens-privacy" className="scroll-mt-32 space-y-4 border-t border-[#DCE1D8] pt-10">
              <div className="flex items-center gap-2 text-[#263D2B]">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#263D2B]/10">12</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">PROTECTING MINORS</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                12. Children's &amp; Teen Privacy
              </h2>
              <div className="prose prose-sm text-[#6B7068] leading-relaxed space-y-3 font-normal">
                <p>
                  Our website and online booking platform are directed to individuals aged <strong>16 and older</strong>. We do not knowingly solicit or collect personal information from children under 16 without verifiable parental or legal guardian consent.
                </p>
                <p>
                  For teen beauty sessions (such as prom makeup, graduation hairstyling, or first-time eyebrow shaping), appointments must be scheduled or authorized by a parent or legal guardian. If we discover that personal information has been collected from a child under 16 without verified parental consent, we will take immediate steps to delete the record.
                </p>
              </div>
            </section>

            {/* ----------------------------------------------------------------- */}
            {/* 13. POLICY UPDATES                                                */}
            {/* ----------------------------------------------------------------- */}
            <section id="policy-updates" className="scroll-mt-32 space-y-4 border-t border-[#DCE1D8] pt-10">
              <div className="flex items-center gap-2 text-[#263D2B]">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#263D2B]/10">13</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">CONTINUOUS REVIEW</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                13. Changes to This Privacy Policy
              </h2>
              <div className="prose prose-sm text-[#6B7068] leading-relaxed space-y-3 font-normal">
                <p>
                  We may periodically revise this Privacy Policy to reflect evolving atelier operations, technological updates, or legislative changes. When updates occur, we will revise the <em>"Last Updated"</em> date at the top of this document.
                </p>
                <p>
                  For material changes that impact how your personal data is collected or handled, we will provide prominent notice on our website homepage or via an alert within the Patron Dashboard prior to the change becoming effective.
                </p>
              </div>
            </section>

            {/* ----------------------------------------------------------------- */}
            {/* 14. CONTACT US                                                    */}
            {/* ----------------------------------------------------------------- */}
            <section id="contact-us" className="scroll-mt-32 space-y-6 border-t border-[#DCE1D8] pt-10">
              <div className="flex items-center gap-2 text-[#263D2B]">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#263D2B]/10">14</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">DIRECT ATELIER LIAISON</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                14. Contact Our Privacy Concierge
              </h2>
              <p className="text-sm text-[#6B7068] leading-relaxed">
                If you have questions, feedback, or formal privacy requests concerning this policy, please reach out to our studio management directly:
              </p>

              {/* Verified Contact Card */}
              <div className="p-6 rounded-3xl bg-white border border-[#DCE1D8] shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-[#DCE1D8]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
                      OFFICIAL STUDIO HEADQUARTERS
                    </span>
                    <h3 className="font-serif text-xl font-normal text-[#10110F]">
                      {studioName}
                    </h3>
                    <span className="text-xs text-[#6B7068]">Founder &amp; Master Artist: Janki Khatroja</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-[#263D2B] text-white flex items-center justify-center font-serif text-lg font-bold">
                    GJ
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#263D2B] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#10110F] block">Physical Studio Location</span>
                      <span className="text-[#6B7068]">{studioAddress}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#263D2B] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#10110F] block">Telephone &amp; WhatsApp</span>
                      <a href={`tel:${studioPhone}`} className="text-[#263D2B] hover:underline font-mono">
                        {studioPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#263D2B] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#10110F] block">Privacy Inquiries Email</span>
                      <a href={`mailto:${studioEmail}`} className="text-[#263D2B] hover:underline font-mono">
                        {studioEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#263D2B] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#10110F] block">Studio Atelier Hours</span>
                      <span className="text-[#6B7068]">{studioHours}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#DCE1D8] flex flex-wrap items-center gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] bg-[#263D2B] hover:bg-[#1C2E20] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
                  >
                    <span>Open Contact Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to="/book-appointment"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] bg-[#F7F4ED] hover:bg-white border border-[#DCE1D8] text-[#10110F] text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    <span>Book Your Next Visit</span>
                  </Link>
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. FLOATING BACK TO TOP CONTROL                                           */}
      {/* ========================================================================= */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#263D2B] hover:bg-[#1C2E20] text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer animate-fade-in hover:scale-105 active:scale-95"
          aria-label="Back to top of privacy policy"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
