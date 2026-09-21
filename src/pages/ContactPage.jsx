import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Sparkles, CheckCircle, MessageSquare, MessageCircle, ExternalLink } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { getWhatsAppInquiryUrl, getWhatsAppConfig, formatDisplayPhone } from '../utils/whatsapp';

export default function ContactPage({ isSection = false }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    serviceInterest: 'General Inquiry'
  });
  const [submitted, setSubmitted] = useState(false);
  const { phoneNumber: whatsappNumber } = getWhatsAppConfig();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '', serviceInterest: 'General Inquiry' });
    }, 6000);
  };

  return (
    <div 
      id="contact"
      className={`w-full bg-[#140E11] text-white ${
        isSection ? 'py-16 sm:py-24' : 'min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-24'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-brand-gold-light text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.24em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
            <span>GET IN TOUCH</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
            Visit Our Ottawa Studio
          </h1>
          <p className="text-[#F2ECE4]/70 text-xs sm:text-base">
            Have questions about bridal packages, balayage hair color consultations, or bespoke skin treatments? We’d love to welcome you.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-12 sm:mb-16">
          
          {/* Left: Studio Info & Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1C1418] rounded-3xl p-5 sm:p-8 shadow-2xl border border-white/10 space-y-6">
              <h3 className="font-serif font-bold text-white text-lg sm:text-xl">
                Studio Information
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#F2ECE4]/80">
                <div className="flex items-start gap-3 sm:gap-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 text-brand-pink flex items-center justify-center flex-shrink-0 border border-white/10 mt-0.5">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Ottawa Location</span>
                    <span>{SALON_INFO.address}</span>
                    <span className="block text-white/50">{SALON_INFO.city}</span>
                    <span className="text-[11px] sm:text-xs text-brand-pink-muted font-medium mt-0.5 block">Free guest parking at rear</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 text-brand-pink flex items-center justify-center flex-shrink-0 border border-white/10 mt-0.5">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Phone</span>
                    <a href={`tel:${SALON_INFO.phone}`} className="hover:text-brand-pink text-[#F2ECE4]/90 font-medium">
                      {SALON_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/30 mt-0.5">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">WhatsApp Concierge</span>
                    <a 
                      href={`https://wa.me/${whatsappNumber}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-emerald-400 text-emerald-300 font-medium inline-flex items-center gap-1.5"
                    >
                      <span>Chat ({formatDisplayPhone(whatsappNumber)})</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 text-brand-pink flex items-center justify-center flex-shrink-0 border border-white/10 mt-0.5">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Email Inquiries</span>
                    <a href={`mailto:${SALON_INFO.email}`} className="hover:text-brand-pink text-[#F2ECE4]/90 font-medium">
                      {SALON_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours Box */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="font-serif font-semibold text-white text-sm mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-pink" />
                  <span>Opening Hours</span>
                </h4>
                <div className="space-y-2 text-xs text-white/60">
                  {SALON_INFO.hours.map((h, i) => (
                    <div key={i} className="flex justify-between py-1 border-b border-white/5 last:border-0">
                      <span className="font-medium text-white/80">{h.days}</span>
                      <span className="text-brand-pink-muted">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#1C1418] rounded-3xl p-5 sm:p-8 shadow-2xl border border-white/10">
              <h3 className="font-serif font-bold text-white text-lg sm:text-xl mb-5 sm:mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-brand-pink" />
                <span>Send Us a Message</span>
              </h3>

              {submitted ? (
                <div className="p-6 sm:p-8 text-center space-y-3 bg-emerald-950/40 rounded-2xl border border-emerald-500/40 animate-fade-in">
                  <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="font-serif font-bold text-emerald-200 text-base sm:text-lg">Message Sent Successfully!</h4>
                  <p className="text-xs text-emerald-300 max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out to GIRL LOOKED FOR YOU Ottawa. Our concierge will get back to you within 2-4 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Maya Roy"
                        className="w-full min-h-[44px] px-4 py-2.5 sm:py-3 bg-white/5 border border-white/15 rounded-2xl text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-pink focus:bg-white/10 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="maya@example.com"
                        className="w-full min-h-[44px] px-4 py-2.5 sm:py-3 bg-white/5 border border-white/15 rounded-2xl text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-pink focus:bg-white/10 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1.5">Phone (Optional)</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(613) 555-0182"
                        className="w-full min-h-[44px] px-4 py-2.5 sm:py-3 bg-white/5 border border-white/15 rounded-2xl text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-pink focus:bg-white/10 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1.5">Topic / Service</label>
                      <select
                        value={formData.serviceInterest}
                        onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                        className="w-full min-h-[44px] px-4 py-2.5 sm:py-3 bg-[#140E11] border border-white/15 rounded-2xl text-xs sm:text-sm text-white focus:outline-none focus:border-brand-pink transition-colors cursor-pointer"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Bridal Consultation">Bridal Makeup / Hair Consultation</option>
                        <option value="Balayage & Colour">Balayage & Hair Colour Consultation</option>
                        <option value="Group & Party Booking">Group / Party Booking</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1.5">Your Message *</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how we can help you..."
                      className="w-full p-3.5 bg-white/5 border border-white/15 rounded-2xl text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-pink focus:bg-white/10 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                    <button
                      type="submit"
                      className="w-full sm:w-auto min-h-[44px] px-8 py-3.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-brand-pink/30 active:scale-98 transition-all cursor-pointer uppercase tracking-wider"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </button>

                    <a
                      href={getWhatsAppInquiryUrl(formData)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto min-h-[44px] px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 active:scale-98 transition-all cursor-pointer uppercase tracking-wider"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send via WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
