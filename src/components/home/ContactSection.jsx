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
    <div id="contact" className="w-full bg-[#FAF5EE] text-[#2B1D19] font-sans antialiased selection:bg-[#EAD5CA] selection:text-[#2B1D19]">
      
      {/* ========================================================================= */}
      {/* 1. HERO HEADER                                                           */}
      {/* ========================================================================= */}
      <section className="pt-20 sm:pt-28 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <ScrollReveal stagger={true}>
          {/* Top Tag Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3E5DE] border border-[#E4CEC3] text-[#A6634E] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] mb-6 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8735C]" />
            <span>BESPOKE CONCIERGE · DIRECT LIAISON | OR / INTIMATE INQUIRIES</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#2B1D19] font-normal tracking-tight leading-[1.15] mb-5">
            Connect with the{' '}
            <span className="italic font-accent text-[#B8735C] font-normal">
              Maison & Concierge
            </span>
            .
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-[#6E5C56] text-xs sm:text-sm md:text-[15px] leading-relaxed mb-8">
            Whether reserving an exclusive bridal takeover, inquiring about tailored dermatological protocols, or arranging discreet arrival at our Ottawa flagship, our concierge atelier awaits your dialogue.
          </p>

          {/* 3 Pill Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#543830]">
            <div className="px-4 py-2 rounded-full bg-[#F3E6DF] border border-[#E5D2C7] flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#B8735C]" />
              <span>DISCREET SINGLE-GUEST PRIVACY</span>
            </div>

            <div className="px-4 py-2 rounded-full bg-[#F3E6DF] border border-[#E5D2C7] flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#B8735C]" />
              <span>180 KENT STREET, OTTAWA</span>
            </div>

            <div className="px-4 py-2 rounded-full bg-[#F3E6DF] border border-[#E5D2C7] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#B8735C]" />
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
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#EDE1D8] shadow-[0_15px_40px_-10px_rgba(74,50,43,0.08)] relative overflow-hidden">
            
            {/* Corner Decorative Icon */}
            <div className="absolute top-6 right-6 text-[#E0C9BD]/60 pointer-events-none">
              <Flower2 className="w-8 h-8 stroke-[1.25]" />
            </div>

            {/* Form Header */}
            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6634E] block mb-1">
                DOSSIER PROTOCOL · DIRECT TRANSMISSION
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#2B1D19] font-normal">
                The Atelier Inquiry Protocol
              </h2>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4 bg-[#FAF3ED] rounded-2xl border border-[#E5D2C7]">
                <div className="w-14 h-14 rounded-full bg-[#B8735C] text-white flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl text-[#2B1D19]">Dossier Transmitted</h3>
                <p className="text-xs sm:text-sm text-[#6E5C56] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{salutation} {fullName || 'Valued Guest'}</strong>. Your inquiry has been routed to founder Janki Patel and senior concierge liaisons. We will contact you via {preferredContactMode.toLowerCase()}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Salutation & Full Legal Name */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4">
                  <div className="sm:col-span-4">
                    <label htmlFor="contact-salutation" className="block text-[10px] font-bold uppercase tracking-wider text-[#543830] mb-1">
                      SALUTATION
                    </label>
                    <select
                      id="contact-salutation"
                      value={salutation}
                      onChange={(e) => setSalutation(e.target.value)}
                      className="w-full h-11 px-3.5 bg-[#FAF5EE] border border-[#DDC4B8] rounded-xl text-xs text-[#2B1D19] focus:outline-none focus:border-[#B8735C] cursor-pointer"
                    >
                      <option>Ms.</option>
                      <option>Mrs.</option>
                      <option>Mr.</option>
                      <option>Dr.</option>
                      <option>Mx.</option>
                    </select>
                  </div>

                  <div className="sm:col-span-8">
                    <label htmlFor="contact-fullname" className="block text-[10px] font-bold uppercase tracking-wider text-[#543830] mb-1">
                      FULL LEGAL NAME *
                    </label>
                    <input
                      id="contact-fullname"
                      type="text"
                      required
                      placeholder="e.g. Catherine Vanderbilt"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full h-11 px-4 bg-white border border-[#DDC4B8] rounded-xl text-xs text-[#2B1D19] placeholder-[#A6938A] focus:outline-none focus:border-[#B8735C]"
                    />
                  </div>
                </div>

                {/* Telephone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-[10px] font-bold uppercase tracking-wider text-[#543830] mb-1">
                      TELEPHONE (DIRECT CELL) *
                    </label>
                    <div className="flex items-center">
                      <span className="h-11 px-3 bg-[#F3E6DF] border border-r-0 border-[#DDC4B8] rounded-l-xl text-[11px] font-bold text-[#543830] flex items-center justify-center">
                        +1 (CAN/US)
                      </span>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        placeholder="613-555-0192"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full h-11 px-4 bg-white border border-[#DDC4B8] rounded-r-xl text-xs text-[#2B1D19] placeholder-[#A6938A] focus:outline-none focus:border-[#B8735C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-[10px] font-bold uppercase tracking-wider text-[#543830] mb-1">
                      DIRECT EMAIL ADDRESS *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="catherine@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 px-4 bg-white border border-[#DDC4B8] rounded-xl text-xs text-[#2B1D19] placeholder-[#A6938A] focus:outline-none focus:border-[#B8735C]"
                    />
                  </div>
                </div>

                {/* Nature of Inquiry & Sanctuary Experience */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#543830] mb-2">
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
                              ? 'bg-[#3D2721] text-white shadow-sm border border-[#3D2721]'
                              : 'bg-[#FAF5EE] text-[#543830] border border-[#E2CCC0] hover:border-[#B8735C]'
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
                    <label htmlFor="contact-mode" className="block text-[10px] font-bold uppercase tracking-wider text-[#543830] mb-1">
                      PREFERRED MODE OF CONTACT
                    </label>
                    <select
                      id="contact-mode"
                      value={preferredContactMode}
                      onChange={(e) => setPreferredContactMode(e.target.value)}
                      className="w-full h-11 px-3.5 bg-[#FAF5EE] border border-[#DDC4B8] rounded-xl text-xs text-[#2B1D19] focus:outline-none focus:border-[#B8735C] cursor-pointer"
                    >
                      <option>Discreet Phone Call</option>
                      <option>Encrypted Email</option>
                      <option>SMS Text Liaison</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-targetdate" className="block text-[10px] font-bold uppercase tracking-wider text-[#543830] mb-1">
                      DESIRED TIMELINE / TARGET RITUAL DATE
                    </label>
                    <input
                      id="contact-targetdate"
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      className="w-full h-11 px-4 bg-white border border-[#DDC4B8] rounded-xl text-xs text-[#2B1D19] focus:outline-none focus:border-[#B8735C]"
                    />
                  </div>
                </div>

                {/* Notes Textarea */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="contact-notes" className="block text-[10px] font-bold uppercase tracking-wider text-[#543830]">
                      INTIMATE NOTES OR BESPOKE ACCOMMODATIONS
                    </label>
                    <span className="text-[9px] font-semibold text-[#8E756C] uppercase tracking-wider">
                      Skin notes, herbal tea, VIP arrival
                    </span>
                  </div>
                  <textarea
                    id="contact-notes"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Detail any dermal sensitivities, specific aesthetic desires, acoustic ambience preferences, beverage ritual specifications, or private arrival discretion requests..."
                    className="w-full p-4 bg-white border border-[#DDC4B8] rounded-2xl text-xs text-[#2B1D19] placeholder-[#A6938A] focus:outline-none focus:border-[#B8735C] resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-4 sm:px-6 rounded-full bg-[#4A322B] hover:bg-[#38241E] text-white text-[11.5px] sm:text-xs font-bold uppercase tracking-[0.14em] sm:tracking-[0.18em] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2.5 text-center"
                >
                  <span className="whitespace-nowrap">TRANSMIT INQUIRY TO CONCIERGE</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 text-white/80" />
                </button>

                {/* Confidentiality Footer */}
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#8E756C] pt-1 text-center">
                  <Lock className="w-3 h-3 text-[#B8735C]" />
                  <span>All inquiries are handled with absolute confidentiality by founder Janki Patel and our senior concierge liaisons.</span>
                </div>

              </form>
            )}

          </div>

          {/* RIGHT COLUMN: MAISON PROVENANCE & HOURS (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* CARD 1: MAISON PROVENANCE · DOWNTOWN OTTAWA */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#EDE1D8] shadow-[0_15px_40px_-10px_rgba(74,50,43,0.08)]">
              
              {/* Flagship Salon Image Banner */}
              <div className="relative aspect-[16/9] overflow-hidden bg-[#E8D8CF]">
                <img
                  src="/atelier-salon-interior.jpg"
                  alt="Maison Provenance Downtown Ottawa Flagship"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-[#4A322B] border border-[#E5D2C7]">
                  OTTAWA FLAGSHIP SANCTUARY
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4 text-white">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-[#EAD5CA]">HAUTE BEAUTY SUITE 400</div>
                  <h3 className="font-serif text-sm sm:text-base font-medium">Maison Provenance · Downtown Ottawa</h3>
                </div>
              </div>

              {/* Atelier Details List */}
              <div className="p-5 sm:p-6 space-y-4">
                
                {/* Physical Atelier */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#FAF0EB] border border-[#E8D4CA] flex items-center justify-center text-[#B8735C] flex-shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-xs sm:text-sm text-[#2B1D19]">
                      Physical Atelier
                    </h4>
                    <p className="text-xs text-[#6E5C56]">
                      Suite 400 · 180 Kent Street<br />
                      Ottawa, Ontario K1P 0B6, Canada
                    </p>
                  </div>
                </div>

                {/* Dedicated Concierge Desk */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#FAF0EB] border border-[#E8D4CA] flex items-center justify-center text-[#B8735C] flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-xs sm:text-sm text-[#2B1D19]">
                      Dedicated Concierge Desk
                    </h4>
                    <a href="tel:+16135550192" className="text-xs font-bold text-[#4A322B] hover:text-[#B8735C]">
                      +1 (613) 555-0192
                    </a>
                    <span className="block text-[10px] text-[#8E756C]">Direct Lines: Tue - Sat 09:00 - 19:00 EST</span>
                  </div>
                </div>

                {/* Direct Dossier Dispatch */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#FAF0EB] border border-[#E8D4CA] flex items-center justify-center text-[#B8735C] flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-xs sm:text-sm text-[#2B1D19]">
                      Direct Dossier Dispatch
                    </h4>
                    <a href="mailto:concierge@glamgirlbyjanki.com" className="text-xs text-[#6E5C56] hover:text-[#B8735C] block">
                      concierge@glamgirlbyjanki.com
                    </a>
                    <a href="mailto:atelier@glamgirlbyjanki.com" className="text-xs text-[#6E5C56] hover:text-[#B8735C] block">
                      atelier@glamgirlbyjanki.com
                    </a>
                  </div>
                </div>

                {/* Private Suite Arrival & Valet Highlight */}
                <div className="bg-[#FAF0EB] rounded-2xl p-4 border border-[#E8D4CA]">
                  <div className="flex items-start gap-2 text-xs text-[#4A322B] leading-relaxed">
                    <span className="font-bold text-[#B8735C] flex-shrink-0">P</span>
                    <p className="text-[11px] text-[#543830]">
                      <strong>Private Suite Arrival & Valet:</strong> Underground valet reception formatted off Queen & Kent St. Take the discreet private express elevator directly to Suite 400 for total guest anonymity.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-1 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleCallConcierge}
                    className="py-2.5 px-3 rounded-full border border-[#CDB5AA] text-[#543830] hover:bg-[#FAF0EB] text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Phone className="w-3 h-3 text-[#B8735C]" />
                    <span>CALL CONCIERGE</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDrivingDirections}
                    className="py-2.5 px-3 rounded-full border border-[#CDB5AA] text-[#543830] hover:bg-[#FAF0EB] text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Compass className="w-3 h-3 text-[#B8735C]" />
                    <span>DRIVING & VALET</span>
                  </button>
                </div>

              </div>

            </div>

            {/* CARD 2: ATELIER SANCTUARY HOURS */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EDE1D8] shadow-[0_15px_40px_-10px_rgba(74,50,43,0.08)]">
              <div className="flex items-center justify-between mb-4 border-b border-[#F0E4DC] pb-3">
                <h3 className="font-serif text-base text-[#2B1D19] font-medium">
                  Atelier Sanctuary Hours
                </h3>
                <Clock className="w-4 h-4 text-[#B8735C]" />
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#543830] font-medium">Tuesday – Friday</span>
                  <span className="text-[#2B1D19] font-semibold">09:00 – 19:00 EST</span>
                </div>

                <div className="flex justify-between items-center py-1 border-t border-[#FAF0EB]">
                  <span className="text-[#543830] font-medium flex items-center gap-1">
                    Saturday Privé <span className="text-[#B8735C]">⭐</span>
                  </span>
                  <span className="text-[#2B1D19] font-semibold">09:00 – 18:00 EST</span>
                </div>

                <div className="flex justify-between items-center py-1 border-t border-[#FAF0EB]">
                  <span className="text-[#543830] font-medium">Sunday & Monday</span>
                  <span className="text-[#A6634E] font-bold tracking-wider text-[10px] uppercase">EXCLUSIVE BUYOUTS ONLY</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0E4DC] text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#8E756C] flex items-center justify-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#B8735C]" />
                <span>BY PRIOR CONFIRMED APPOINTMENT ONLY</span>
              </div>
            </div>

          </div>

        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 3. ATELIER VISITOR PROTOCOL (DISCREET VISITATION STANDARDS)               */}
      {/* ========================================================================= */}
      <section className="bg-[#F5E8E0] py-16 sm:py-24 border-t border-[#EBD6CB]">
        <ScrollReveal className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#A6634E] mb-2.5">
              DISCREET VISITATION STANDARDS
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#2B1D19] font-normal tracking-tight mb-3">
              Atelier Visitor Protocol
            </h2>
            <p className="text-[#6E5C56] text-xs sm:text-sm leading-relaxed">
              To preserve the serenity and sanctuary quality of our spaces, we invite clientele to review our bespoke admission and reservation guidelines.
            </p>
          </div>

          {/* 3 Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE1D8] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#FAF0EB] border border-[#E8D4CA] flex items-center justify-center text-[#B8735C] mb-4">
                  <Calendar className="w-4 h-4" />
                </div>

                <h3 className="font-serif text-lg text-[#2B1D19] font-medium mb-2.5 leading-snug">
                  How far in advance should I reserve a private suite?
                </h3>

                <p className="text-xs text-[#6E5C56] leading-relaxed mb-6">
                  We recommend 2 to 3 weeks advance booking for signature facial rituals and haute coiffure styling. For master bridal consultations and exclusive weekend private sanctuary buyouts, 3 to 6 months is recommended to ensure calendar exclusivity.
                </p>
              </div>

              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8E756C] border-t border-[#F3E6DF] pt-3">
                PROTOCOL 01 · PLANNING
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE1D8] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#FAF0EB] border border-[#E8D4CA] flex items-center justify-center text-[#B8735C] mb-4">
                  <Shield className="w-4 h-4" />
                </div>

                <h3 className="font-serif text-lg text-[#2B1D19] font-medium mb-2.5 leading-snug">
                  What is your single-occupancy privacy protocol?
                </h3>

                <p className="text-xs text-[#6E5C56] leading-relaxed mb-6">
                  Our individual treatment atelier chambers strictly guarantee zero guest overlap. Each private suite is acoustically treated and features bespoke fragrance dispersion, dedicated fresh cotton linens, and secluded waiting amenities.
                </p>
              </div>

              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8E756C] border-t border-[#F3E6DF] pt-3">
                PROTOCOL 02 · EXCLUSION
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE1D8] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#FAF0EB] border border-[#E8D4CA] flex items-center justify-center text-[#B8735C] mb-4">
                  <Crown className="w-4 h-4" />
                </div>

                <h3 className="font-serif text-lg text-[#2B1D19] font-medium mb-2.5 leading-snug">
                  Can suites accommodate bridal parties or VIP entourage?
                </h3>

                <p className="text-xs text-[#6E5C56] leading-relaxed mb-6">
                  Yes. Full sanctuary takeovers allow complete access to the marble reception salon, all private transformation suites, artisan tea and champagne catering bar, and personalized beauty artists exclusively dedicated to your party.
                </p>
              </div>

              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8E756C] border-t border-[#F3E6DF] pt-3">
                PROTOCOL 03 · BUYOUTS
              </div>
            </div>

          </div>

        </ScrollReveal>
      </section>

    </div>
  );
}
