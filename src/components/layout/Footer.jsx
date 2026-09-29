import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Heart, Sparkles, Send } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '../common/SocialIcons';
import Logo from '../common/Logo';
import { SALON_INFO, CATEGORIES } from '../../data/salonData';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer className="w-full bg-brand-espresso text-brand-ivory pt-12 sm:pt-16 pb-8 border-t border-brand-charcoal">
      <div className="w-full px-3 sm:px-6 lg:px-12 xl:px-20 mx-auto">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-10 sm:pb-12 border-b border-brand-charcoal/80">
          
          {/* Brand Info & Mission */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-3.5 sm:space-y-4">
            <Logo variant="dark" size="lg" />
            <p className="text-brand-ivory/70 text-xs sm:text-sm leading-relaxed max-w-sm pt-1">
              Ottawa’s premier luxury sanctuary dedicated to women’s beauty, certified hair couture, rejuvenating skin therapies, and flawless bridal transformations.
            </p>
            <div className="flex items-center space-x-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-pink text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-pink text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-semibold text-white text-sm sm:text-base tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-ivory/70">
              <li>
                <a 
                  href="/#home" 
                  onClick={(e) => {
                    const el = document.getElementById('home');
                    if (el) {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      window.history.pushState(null, '', '/#home');
                    }
                  }} 
                  className="hover:text-brand-pink transition-colors cursor-pointer"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="/#services" 
                  onClick={(e) => {
                    const el = document.getElementById('services');
                    if (el) {
                      e.preventDefault();
                      const pos = el.getBoundingClientRect().top + window.pageYOffset - 76;
                      window.scrollTo({ top: pos, behavior: 'smooth' });
                      window.history.pushState(null, '', '/#services');
                    }
                  }} 
                  className="hover:text-brand-pink transition-colors cursor-pointer"
                >
                  All Services
                </a>
              </li>
              <li>
                <Link 
                  to="/book-appointment" 
                  className="hover:text-brand-pink transition-colors cursor-pointer"
                >
                  Book Appointment
                </Link>
              </li>
              <li>
                <a 
                  href="/#gallery" 
                  onClick={(e) => {
                    const el = document.getElementById('gallery');
                    if (el) {
                      e.preventDefault();
                      const pos = el.getBoundingClientRect().top + window.pageYOffset - 76;
                      window.scrollTo({ top: pos, behavior: 'smooth' });
                      window.history.pushState(null, '', '/#gallery');
                    }
                  }} 
                  className="hover:text-brand-pink transition-colors cursor-pointer"
                >
                  Gallery Portfolio
                </a>
              </li>
              <li>
                <a 
                  href="/#about" 
                  onClick={(e) => {
                    const el = document.getElementById('about');
                    if (el) {
                      e.preventDefault();
                      const pos = el.getBoundingClientRect().top + window.pageYOffset - 76;
                      window.scrollTo({ top: pos, behavior: 'smooth' });
                      window.history.pushState(null, '', '/#about');
                    }
                  }} 
                  className="hover:text-brand-pink transition-colors cursor-pointer"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="/#contact" 
                  onClick={(e) => {
                    const el = document.getElementById('contact');
                    if (el) {
                      e.preventDefault();
                      const pos = el.getBoundingClientRect().top + window.pageYOffset - 76;
                      window.scrollTo({ top: pos, behavior: 'smooth' });
                      window.history.pushState(null, '', '/#contact');
                    }
                  }} 
                  className="hover:text-brand-pink transition-colors cursor-pointer"
                >
                  Contact & Directions
                </a>
              </li>
            </ul>
          </div>

          {/* Salon Categories */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-semibold text-white text-sm sm:text-base tracking-wide">
              Treatments
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-ivory/70">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/services?category=${cat.id}`}
                    className="hover:text-brand-pink transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-3.5">
            <h4 className="font-serif font-semibold text-white text-sm sm:text-base tracking-wide">
              Ottawa Salon Studio
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-brand-ivory/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-pink flex-shrink-0 mt-0.5" />
                <span>{SALON_INFO.address}, {SALON_INFO.city}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-pink flex-shrink-0" />
                <a href={`tel:${SALON_INFO.phone}`} className="hover:text-brand-pink transition-colors">
                  {SALON_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-pink flex-shrink-0" />
                <a href={`mailto:${SALON_INFO.email}`} className="hover:text-brand-pink transition-colors">
                  {SALON_INFO.email}
                </a>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-[11px] sm:text-xs font-semibold text-brand-pink-muted uppercase tracking-wider block mb-2">
                Join VIP Club (10% Off First Visit)
              </span>
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full min-h-[44px] bg-white/10 text-white placeholder-brand-ivory/40 text-xs px-3.5 py-2 rounded-full border border-white/15 focus:outline-none focus:border-brand-pink"
                />
                <button
                  type="submit"
                  className="min-h-[44px] bg-brand-pink hover:bg-brand-pink-hover text-white px-4 py-2 rounded-full text-xs font-medium flex items-center justify-center gap-1 flex-shrink-0 transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              {isSubscribed && (
                <p className="text-[11px] text-emerald-400 mt-1.5 animate-fade-in flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Thank you! Check your inbox for your 10% coupon code.
                </p>
              )}
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-brand-ivory/50 gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Girl Looked For You — Girls Salon Ottawa. All rights reserved.</p>
          <div className="flex items-center justify-center gap-4">
            <Link 
              to="/admin" 
              className="text-white/40 hover:text-brand-pink transition-colors font-medium hover:underline"
            >
              🔒 Staff Portal
            </Link>
            <div className="flex items-center gap-1">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-brand-pink fill-brand-pink" />
              <span>for Ottawa's beautiful community</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
