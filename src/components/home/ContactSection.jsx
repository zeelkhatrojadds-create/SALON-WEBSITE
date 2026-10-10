import React, { useState } from 'react';
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
  Navigation, 
  ArrowRight, 
  Check, 
  Lock, 
  Compass, 
  Flower2 
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import salonDB from '../../db/salonDatabase';

export default function ContactSection() {
  const settings = salonDB.getSettings();

  // Form State
  const [salutation, setSalutation] = useState('Ms.');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('BESPOKE BRIDAL PRIVÉ');
  const [preferredContactMode, setPreferredContactMode] = useState('Discreet Phone Call');
  const [targetDate, setTargetDate] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const inquiryOptions = [
    'BESPOKE BRIDAL PRIVÉ',
    'DERMAL & FACIAL PROTOCOL',
    'HAUTE COIFFURE CONSULTATION',
    'PRIVATE ATELIER SANCTUARY BUYOUT',
    'PRESS, BRAND PARTNERSHIP & CONCIERGE GIFTING'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    // Save directly to the Master Database
    salonDB.addContactMessage({
      name: `${salutation} ${fullName.trim()}`,
      email: email.trim(),
      phone: phone.trim(),
      subject: inquiryType,
      message: notes.trim(),
      targetDate,
      preferredContactMode
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFullName('');
      setPhone('');
      setEmail('');
      setNotes('');
      setTargetDate('');
    }, 4000);
  };

  const handleCallConcierge = () => {
    window.location.href = `tel:${settings.phone || '+16162550549'}`;
  };

  const handleDrivingDirections = () => {
    window.open(`https://maps.google.com/?q=${encodeURIComponent(settings.address + ' ' + settings.city)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="contact" className="w-full bg-[#F7F4ED] text-[#10110F] font-sans antialiased selection:bg-[#263D2B] selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO HEADER                                                           */}
      {/* ========================================================================= */}
      <section className="pt-20 sm:pt-28 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <ScrollReveal stagger={true}>

          {/* Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#10110F] font-normal tracking-tight leading-[1.15] mb-5">
            Connect with the{' '}
            <span className="italic font-normal text-[#263D2B]">
              Maison & Concierge
            </span>
            .
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-[#6B7068] text-xs sm:text-sm md:text-[15px] leading-relaxed mb-8">
            Whether reserving an exclusive bridal takeover, inquiring about tailored dermatological protocols, or arranging discreet arrival at our Ottawa flagship, our concierge atelier awaits your dialogue.
          </p>

          {/* 3 Pill Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#10110F]">
            <div className="px-4 py-2 rounded-full bg-white border border-[#DCE1D8] flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>DISCREET SINGLE-GUEST PRIVACY</span>
            </div>

            <div className="px-4 py-2 rounded-full bg-white border border-[#DCE1D8] flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>405 EUPHORIA CRESCENT, OTTAWA</span>
            </div>

            <div className="px-4 py-2 rounded-full bg-white border border-[#DCE1D8] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>COMPLIMENTARY VALET ASSISTANCE</span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN 2-COLUMN GRID (FORM & ATELIER DETAILS)                            */}
      {/* ========================================================================= */}
      <section className="pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: THE ATELIER INQUIRY PROTOCOL FORM (7 COLS) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#DCE1D8] shadow-md relative overflow-hidden">
            
            {/* Corner Decorative Icon */}
            <div className="absolute top-6 right-6 text-[#263D2B]/20 pointer-events-none">
              <Flower2 className="w-8 h-8 stroke-[1.25]" />
            </div>

            {/* Form Header */}
            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#263D2B] block mb-1">
                DOSSIER PROTOCOL · DIRECT TRANSMISSION
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                The Atelier Inquiry Protocol
              </h2>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4 bg-[#F7F4ED] rounded-2xl border border-[#DCE1D8]">
                <div className="w-14 h-14 rounded-full bg-[#263D2B] text-white flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl text-[#10110F]">Dossier Transmitted</h3>
                <p className="text-xs sm:text-sm text-[#6B7068] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{salutation} {fullName || 'Valued Guest'}</strong>. Your inquiry has been routed to founder Janki Khatroja and senior concierge liaisons. We will contact you via {preferredContactMode.toLowerCase()}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Salutation & Full Legal Name */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4">
                  <div className="sm:col-span-4">
                    <label htmlFor="contact-salutation" className="block text-[10px] font-bold uppercase tracking-wider text-[#10110F] mb-1">
                      SALUTATION
                    </label>
                    <select
                      id="contact-salutation"
                      value={salutation}
                      onChange={(e) => setSalutation(e.target.value)}
                      className="w-full h-11 px-3.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B] cursor-pointer"
                    >
                      <option>Ms.</option>
                      <option>Mrs.</option>
                      <option>Mr.</option>
                      <option>Dr.</option>
                      <option>Mx.</option>
                    </select>
                  </div>

                  <div className="sm:col-span-8">
                    <label htmlFor="contact-fullname" className="block text-[10px] font-bold uppercase tracking-wider text-[#10110F] mb-1">
                      FULL LEGAL NAME *
                    </label>
                    <input
                      id="contact-fullname"
                      type="text"
                      required
                      placeholder="e.g. Catherine Vanderbilt"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full h-11 px-4 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none focus:border-[#263D2B]"
                    />
                  </div>
                </div>

                {/* Telephone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-[10px] font-bold uppercase tracking-wider text-[#10110F] mb-1">
                      TELEPHONE (DIRECT CELL) *
                    </label>
                    <div className="flex items-center">
                      <span className="h-11 px-3 bg-white border border-r-0 border-[#DCE1D8] rounded-l-xl text-[11px] font-bold text-[#10110F] flex items-center justify-center">
                        +1 (CAN/US)
                      </span>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        placeholder="613-555-0192"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 min-w-0 w-full h-11 px-3 sm:px-4 bg-[#F7F4ED] border border-[#DCE1D8] rounded-r-xl text-xs text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none focus:border-[#263D2B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-[10px] font-bold uppercase tracking-wider text-[#10110F] mb-1">
                      DIRECT EMAIL ADDRESS *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="catherine@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 px-4 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none focus:border-[#263D2B]"
                    />
                  </div>
                </div>

                {/* Nature of Inquiry & Sanctuary Experience */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#10110F] mb-2">
                    NATURE OF INQUIRY & SANCTUARY EXPERIENCE
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {inquiryOptions.map((opt) => {
                      const isSelected = inquiryType === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setInquiryType(opt)}
                          className={`px-3.5 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'bg-[#263D2B] text-white shadow-sm border border-[#263D2B]'
                              : 'bg-[#F7F4ED] text-[#10110F] border border-[#DCE1D8] hover:border-[#263D2B]'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Mode of Contact & Desired Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="contact-mode" className="block text-[10px] font-bold uppercase tracking-wider text-[#10110F] mb-1">
                      PREFERRED MODE OF CONTACT
                    </label>
                    <select
                      id="contact-mode"
                      value={preferredContactMode}
                      onChange={(e) => setPreferredContactMode(e.target.value)}
                      className="w-full h-11 px-3.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B] cursor-pointer"
                    >
                      <option>Discreet Phone Call</option>
                      <option>Encrypted Email</option>
                      <option>SMS Text Liaison</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-targetdate" className="block text-[10px] font-bold uppercase tracking-wider text-[#10110F] mb-1">
                      DESIRED TIMELINE / TARGET RITUAL DATE
                    </label>
                    <input
                      id="contact-targetdate"
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      className="w-full h-11 px-4 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                    />
                  </div>
                </div>

                {/* Notes Textarea */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="contact-notes" className="block text-[10px] font-bold uppercase tracking-wider text-[#10110F]">
                      INTIMATE NOTES OR BESPOKE ACCOMMODATIONS
                    </label>
                    <span className="text-[9px] font-semibold text-[#6B7068] uppercase tracking-wider">
                      Skin notes, herbal tea, VIP arrival
                    </span>
                  </div>
                  <textarea
                    id="contact-notes"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Detail any dermal sensitivities, specific aesthetic desires, acoustic ambience preferences, beverage ritual specifications, or private arrival discretion requests..."
                    className="w-full p-4 bg-[#F7F4ED] border border-[#DCE1D8] rounded-2xl text-xs text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none focus:border-[#263D2B] resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="global-button w-full flex items-center justify-center gap-2.5 text-center text-xs sm:text-sm font-bold uppercase tracking-[0.16em]"
                >
                  <span className="whitespace-normal sm:whitespace-nowrap">TRANSMIT INQUIRY TO CONCIERGE</span>
                  <ArrowRight className="w-4 h-4 shrink-0 text-white/80" />
                </button>

                {/* Confidentiality Footer */}
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#6B7068] pt-1 text-center">
                  <Lock className="w-3 h-3 text-[#263D2B]" />
                  <span>All inquiries are handled with absolute confidentiality by founder Janki Khatroja and our senior concierge liaisons.</span>
                </div>

              </form>
            )}

          </div>

          {/* RIGHT COLUMN: MAISON PROVENANCE & HOURS (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* CARD 1: MAISON PROVENANCE · OTTAWA */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#DCE1D8] shadow-md">
              
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
