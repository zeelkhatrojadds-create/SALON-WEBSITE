import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ShieldCheck, Award, Users, Calendar, Star, MapPin, CheckCircle2, User } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export default function AboutPage({ isSection = false }) {
  const pillars = [
    {
      num: '01',
      title: 'Bespoke Artistry',
      desc: 'Custom formulated treatments tailored to your unique hair profile, skin chemistry, and personal elegance.'
    },
    {
      num: '02',
      title: 'Clean Luxury Formulas',
      desc: 'Cruelty-free botanical infusions, ammonia-free colours, and dermatologically tested luxury skincare.'
    },
    {
      num: '03',
      title: 'Private Sanctuary',
      desc: 'An intimate, serene escape in Central Ottawa designed exclusively for women’s wellness and relaxation.'
    }
  ];

  return (
    <div 
      id="about"
      className={`w-full bg-[#140E11] text-white ${
        isSection ? 'py-16 sm:py-24' : 'min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-24'
      }`}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#E95E92] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.24em] mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
            <span>OUR HERITAGE & PHILOSOPHY</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
            Celebrating the Beauty & Grace of Every Woman
          </h1>
          <p className="text-[#F2ECE4]/70 text-xs sm:text-base lg:text-lg leading-relaxed">
            Founded in the heart of Ottawa, <strong className="text-white">GIRL LOOKED FOR YOU</strong> is a sanctuary where high-fashion editorial styling meets authentic botanical wellness.
          </p>
        </div>

        {/* Story Section Card */}
        <div className="bg-[#1C1418]/90 backdrop-blur-md rounded-3xl p-5 sm:p-10 lg:p-12 shadow-2xl border border-white/10 mb-10 sm:mb-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-brand-pink-muted">Our Studio Story</span>
            <h2 className="font-serif text-xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              Crafted With Passion In Ottawa, Ontario
            </h2>
            <p className="text-[#F2ECE4]/80 text-xs sm:text-base leading-relaxed">
              We believe beauty rituals shouldn’t feel rushed or clinical. From the warm ambient lighting and fragrant jasmine oils to personalized consultations, every detail is engineered to leave you feeling radiant, confident, and celebrated.
            </p>
            <p className="text-[#F2ECE4]/80 text-xs sm:text-base leading-relaxed">
              Under the visionary artistry of <strong className="text-white">Janki Khatroja</strong>, every beauty ritual is tailored with precision, utilizing clean luxury formulas, advanced haircare techniques, and bespoke skincare regimens.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-white/60">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-pink flex-shrink-0" />
                <span>450 Bank St, Ottawa</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-[#E95E92] flex-shrink-0" />
                <span>4.9 Star Rated (320+ Reviews)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl border border-white/10 relative group">
            <img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80"
              alt="Girl Looked For You Salon Experience"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </div>

        {/* 3 Pillars Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {pillars.map((p, idx) => (
            <div key={idx} className="bg-[#1C1418] rounded-3xl p-5 sm:p-8 border border-white/10 shadow-xl hover:border-brand-pink/40 transition-all">
              <span className="text-xs font-mono font-bold text-brand-pink-muted block mb-2 sm:mb-3">{p.num} — PRINCIPLE</span>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-white mb-1.5 sm:mb-2">{p.title}</h3>
              <p className="text-xs sm:text-sm text-[#F2ECE4]/70 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Meet Our Owner & Main Artist (ONLY Janki Khatroja) */}
        <div className="mb-12 sm:mb-16">
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-pink/15 border border-brand-pink/30 text-xs font-bold uppercase tracking-widest text-brand-pink-light mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
              <span>OWNER & MAIN ARTIST</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight">
              Meet Our Owner & Main Artist
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#F2ECE4]/70">
              Passion, creativity, and personalized beauty experiences.
            </p>
          </div>

          {/* Centered Luxury Profile Showcase Card for Janki Khatroja */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#1C1418] rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/15 hover:border-brand-pink/50 transition-all duration-300 relative overflow-hidden group">
              
              {/* Background ambient gold/pink glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:bg-brand-pink/15 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

              <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 text-center sm:text-left">
                
                {/* Real Owner & Main Artist Photograph */}
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-brand-pink/40 shadow-xl group-hover:border-brand-pink transition-all">
                    <img 
                      src="/janki-khatroja.jpg" 
                      alt="Janki Khatroja — Salon Owner & Main Artist"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Profile Details */}
                <div className="space-y-3 flex-1 min-w-0">
                  <div>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        Janki Khatroja
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-pink/20 text-brand-pink-light border border-brand-pink/30">
                        Owner
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm font-semibold text-brand-pink-muted">
                      Owner & Main Artist
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-[11px] text-[#E95E92] font-medium mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-pink flex-shrink-0" />
                      <span>Professional Beauty Specialist</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#F2ECE4]/80 leading-relaxed pt-1">
                    Janki Khatroja is the owner and main artist of Girl Looked For You. She is passionate about creating personalized beauty experiences and helping every client feel confident, beautiful, and special.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-[11px] text-white/60">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-pink" />
                      Ottawa, Canada
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#E95E92]" />
                      Bespoke Beauty Rituals
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-[#2A1520] via-[#1C1418] to-[#2A1520] border border-brand-pink/30 rounded-3xl p-6 sm:p-10 lg:p-12 text-center shadow-2xl">
          <h2 className="font-serif text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">
            Ready to Experience the GIRL LOOKED FOR YOU Difference?
          </h2>
          <p className="text-xs sm:text-sm text-[#F2ECE4]/80 max-w-lg mx-auto mb-5 sm:mb-6">
            Book your bespoke consultation or beauty ritual today and let our specialists craft your signature look.
          </p>
          <Link
            to="/book-appointment"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white font-semibold text-xs sm:text-sm shadow-xl shadow-brand-pink/30 hover:scale-105 active:scale-95 transition-all cursor-pointer uppercase tracking-wider"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
