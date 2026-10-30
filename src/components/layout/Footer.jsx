import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Heart, Phone, Clock, Sparkles } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '../common/SocialIcons';
import Logo from '../common/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#F7F4ED] text-[#10110F] pt-14 sm:pt-20 pb-8 border-t border-[#DCE1D8]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">

        {/* Main 4-Column Balanced Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-[#DCE1D8]">

          {/* Column 1: Brand & Atelier Story (lg:col-span-4) */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <div className="flex items-start">
              <Logo size="lg" theme="light" />
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-[#6B7068] pt-1 font-body font-light">
              Ottawa's luxury women's beauty sanctuary. Private 1-on-1 atelier treatments, bespoke rituals, and certified artistry designed around you — from everyday radiant glow to timeless bridal elegance.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#263D2B]/5 border border-[#263D2B]/15 text-[11px] font-medium text-[#263D2B]">
              <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>Private 1-on-1 Suite • By Appointment Only</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/glamgirlbyjanki"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 border border-[#DCE1D8] bg-white flex items-center justify-center text-[#6B7068] hover:text-[#263D2B] hover:border-[#263D2B] transition-all rounded-[4px] shadow-2xs"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 border border-[#DCE1D8] bg-white flex items-center justify-center text-[#6B7068] hover:text-[#263D2B] hover:border-[#263D2B] transition-all rounded-[4px] shadow-2xs"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Explore & Planning (lg:col-span-2) */}
          <div className="space-y-3.5">
            <h3 className="font-serif font-semibold text-[#10110F] text-xs tracking-[0.16em] uppercase">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-[#6B7068] font-body">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Janki', path: '/about' },
                { label: 'All 91 Services', path: '/services' },
                { label: 'Plan Your Salon Day', path: '/plan-salon-day' },
                { label: 'Special Treatments', path: '/special-treatments' },
                { label: 'Official Price List', path: '/price-list' },
                { label: 'Beauty Guide', path: '/beauty-guide' },
                { label: 'Visual Gallery', path: '/gallery' },
                { label: 'Client Reviews', path: '/reviews' },
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                    className="hover:text-[#10110F] transition-colors cursor-pointer block py-0.5"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Atelier Studios (lg:col-span-3) */}
          <div className="space-y-3.5">
            <h3 className="font-serif font-semibold text-[#10110F] text-xs tracking-[0.16em] uppercase">
              Atelier Studios
            </h3>
            <ul className="space-y-2 text-sm text-[#6B7068] font-body">
              {[
                { label: 'The Hair Atelier', path: '/hair-atelier', badge: 'Atelier' },
                { label: 'The Skin Atelier', path: '/skin-atelier', badge: 'Premium' },
                { label: 'The Lash Atelier', path: '/lash-atelier', badge: 'New' },
                { label: 'The Makeup Atelier', path: '/makeup-atelier', badge: 'New' },
                { label: 'The Brow Atelier', path: '/brow-atelier', badge: 'New' },
                { label: 'The Wax Atelier', path: '/wax-atelier', badge: 'New' },
                { label: 'Hair Colour Atelier', path: '/hair-colour' },
                { label: 'Nail Art Studio', path: '/nail-art' },
                { label: 'Mehndi Design Studio', path: '/mehndi-design-studio' },
                { label: 'Custom Experience Studio', path: '/custom-experience', badge: 'Bespoke' },
              ].map(({ label, path, badge }) => (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                    className="hover:text-[#10110F] transition-colors cursor-pointer flex items-center justify-between py-0.5 group"
                  >
                    <span>{label}</span>
                    {badge && (
                      <span className="text-[8.5px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-[#263D2B]/10 text-[#263D2B] group-hover:bg-[#263D2B] group-hover:text-white transition-colors">
                        {badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Atelier & Concierge (lg:col-span-3) */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-4">
            <h3 className="font-serif font-semibold text-[#10110F] text-xs tracking-[0.16em] uppercase">
              Atelier &amp; Concierge
            </h3>
            <div className="space-y-3 text-sm text-[#6B7068] font-body">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#263D2B] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-[#10110F]">Glam Girl Studio Suite</span>
                  <span>405 Euphoria Crescent,<br />Ottawa, ON K2J 7M7</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#263D2B] shrink-0" />
                <a href="tel:+16162550549" className="hover:text-[#10110F] transition-colors">
                  +1 (616) 255-0549
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#263D2B] shrink-0" />
                <a href="mailto:Glamgirlbyjanki@gmail.com" className="hover:text-[#10110F] transition-colors truncate">
                  Glamgirlbyjanki@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-xs pt-1">
                <Clock className="w-4 h-4 text-[#263D2B] shrink-0" />
                <span>Mon – Sun: 9:00 AM – 7:00 PM</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/book-appointment"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className="inline-flex items-center justify-center w-full px-6 h-[44px] rounded-[4px] bg-[#263D2B] hover:bg-[#1C2E20] text-white text-[11px] font-bold uppercase tracking-[0.16em] shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer"
              >
                BOOK APPOINTMENT
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Legal & Utility Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7068] font-body">
          <p>© {currentYear} GLAM GIRL BY JANKI — Ottawa, Canada. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">
            <Link
              to="/contact"
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              className="hover:text-[#10110F] transition-colors"
            >
              Contact
            </Link>
            <span>•</span>
            <Link 
              to="/careers" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              className="hover:text-[#10110F] transition-colors"
            >
              Careers
            </Link>
            <span>•</span>
            <Link
              to="/terms-and-conditions"
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              className="hover:text-[#10110F] transition-colors"
            >
              Terms &amp; Conditions
            </Link>
            <span>•</span>
            <Link
              to="/privacy-policy"
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              className="hover:text-[#10110F] transition-colors"
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link 
              to="/admin" 
              className="hover:text-[#10110F] transition-colors font-medium text-[#263D2B]"
            >
              Staff Portal
            </Link>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-[#263D2B] fill-[#263D2B] mx-0.5" /> for Ottawa
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
