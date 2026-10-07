import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Calendar, MapPin, Phone, Clock, ChevronRight } from 'lucide-react';
import Logo from '../common/Logo';
import { SALON_INFO } from '../../data/salonData';

export default function MobileMenu({ 
  isOpen, 
  activeSection = 'home',
  onClose, 
  onOpenSearch,
  onNavClick
}) {
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navLinks = [
    { name: 'Home', id: 'home', path: '/' },
    { name: 'Services', id: 'services', path: '/services' },
    { name: 'Gallery', id: 'gallery', path: '/gallery' },
    { name: 'About', id: 'about', path: '/about' },
    { name: 'Contact', id: 'contact', path: '/contact' },
  ];

  const handleLinkClick = (e, link) => {
    onClose();
    if (onNavClick) {
      onNavClick(e, link);
    }
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-brand-espresso/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-[320px] sm:max-w-sm bg-[#FAF7F2] shadow-2xl flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-out z-10 border-l border-brand-pink/10">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-brand-border/80 bg-white/80 backdrop-blur-md">
          <Logo size="sm" />
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full text-brand-charcoal hover:text-brand-pink hover:bg-brand-pink-light/60 transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Quick Search Banner */}
        <div className="px-4 sm:px-5 pt-4">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full min-h-[44px] py-2.5 px-3.5 sm:px-4 bg-white border border-brand-border rounded-2xl flex items-center justify-between text-brand-muted text-xs sm:text-sm shadow-xs hover:border-brand-pink/40 transition-colors cursor-pointer"
          >
            <span className="truncate pr-2">Search all 72 treatments & prices...</span>
            <span className="text-[11px] bg-brand-pink-light text-brand-pink font-semibold px-2 py-0.5 rounded-full flex-shrink-0">
              Search
            </span>
          </button>
        </div>

        {/* Nav Links */}
        <div className="px-4 sm:px-5 py-3 space-y-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={`/#${link.id}`}
                onClick={(e) => handleLinkClick(e, link)}
                className={`flex items-center justify-between min-h-[44px] py-2.5 px-3.5 sm:px-4 rounded-xl text-sm sm:text-base font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-brand-pink-light text-brand-pink font-semibold shadow-xs'
                    : 'text-brand-espresso hover:bg-white hover:text-brand-pink'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 opacity-60" />
              </a>
            );
          })}
        </div>

        {/* CTA & Booking Button */}
        <div className="p-4 sm:p-5 space-y-3.5 sm:space-y-4">
          <Link
            to="/book-appointment"
            onClick={onClose}
            className="w-full min-h-[44px] py-3.5 px-5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-pink/25 active:scale-98 transition-all uppercase tracking-wider cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </Link>

          {/* Ottawa Salon Quick Info */}
          <div className="p-3.5 sm:p-4 bg-white rounded-2xl border border-brand-border/70 space-y-2.5 text-[11px] sm:text-xs text-brand-muted">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-brand-pink flex-shrink-0 mt-0.5" />
              <span>{SALON_INFO.address}, {SALON_INFO.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-brand-pink flex-shrink-0" />
              <a href={`tel:${SALON_INFO.phone}`} className="hover:text-brand-pink">{SALON_INFO.phone}</a>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-pink flex-shrink-0" />
              <span>Mon-Sat: 9:30 AM – 7:30 PM • Sun: 10:00 AM – 5:30 PM</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="p-3.5 border-t border-brand-border/60 bg-brand-ivory text-center text-[10px] sm:text-[11px] text-brand-muted">
          <p>© {new Date().getFullYear()} Girl Looked For You Salon Ottawa.</p>
        </div>
      </div>
    </div>
  );
}
