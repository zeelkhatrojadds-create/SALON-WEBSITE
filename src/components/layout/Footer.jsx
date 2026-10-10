import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Heart, Phone } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '../common/SocialIcons';
import Logo from '../common/Logo';

export default function Footer() {
  return (
    <footer className="w-full bg-[#F7F4ED] text-[#10110F] pt-14 sm:pt-20 pb-8 border-t border-[#DCE1D8]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-[#DCE1D8]">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <div className="flex items-start">
              <Logo size="lg" theme="light" />
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-[#6B7068] pt-1 font-body font-light">
              Ottawa's luxury women's beauty studio. Personalized beauty rituals and bespoke care designed around you — from everyday radiant glow to timeless bridal elegance.
            </p>
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

          {/* Quick links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-semibold text-[#10110F] text-sm tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2.5 text-sm text-[#6B7068] font-body">
              {[
                { label: 'Home', path: '/' },
                { label: 'About', path: '/about' },
                { label: 'Services', path: '/services' },
                { label: 'Treatments', path: '/treatments' },
                { label: 'Gallery', path: '/gallery' },
                { label: 'Reviews', path: '/#reviews' },
                { label: 'Contact', path: '/contact' },
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                    className="hover:text-[#10110F] transition-colors cursor-pointer"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to="/careers" 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                  className="hover:text-[#10110F] transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-semibold text-[#10110F] text-sm tracking-wider uppercase">Rituals</h4>
            <ul className="space-y-2.5 text-sm text-[#6B7068] font-body">
              {[
                { name: 'Threading & Brows', path: '/services/threading' },
                { name: 'Organic Waxing', path: '/services/waxing' },
                { name: 'Luxury Facials', path: '/services/facial' },
                { name: 'Bridal & HD Makeup', path: '/services/makeup' },
                { name: 'Organic Henna', path: '/services/henna' },
                { name: 'Hair Couture & Spa', path: '/services/hair-cut' },
                { name: 'Body Therapy', path: '/services/massage' }
              ].map((s) => (
                <li key={s.name}>
                  <Link
                    to={s.path}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                    className="hover:text-[#10110F] transition-colors cursor-pointer"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <h4 className="font-serif font-semibold text-[#10110F] text-sm tracking-wider uppercase">Atelier & Concierge</h4>
            <div className="space-y-3 text-sm text-[#6B7068] font-body">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#263D2B] flex-shrink-0 mt-0.5" />
                <span>405 Euphoria Crescent,<br />Ottawa, ON K2J 7M7</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
                <a href="tel:+16162550549" className="hover:text-[#10110F] transition-colors">
                  +1 (616) 255-0549
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
                <a href="mailto:Glamgirlbyjanki@gmail.com" className="hover:text-[#10110F] transition-colors">
                  Glamgirlbyjanki@gmail.com
                </a>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/book-appointment"
                className="inline-flex items-center justify-center px-6 h-[44px] rounded-[4px] bg-[#263D2B] hover:bg-[#1C2E20] text-white text-[11px] font-bold uppercase tracking-[0.16em] shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer"
              >
                BOOK APPOINTMENT
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7068] font-body">
          <p>© {new Date().getFullYear()} GLAM GIRL BY JANKI — Ottawa, Canada. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/admin" className="hover:text-[#10110F] transition-colors font-medium">Staff Portal</Link>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-[#263D2B] fill-[#263D2B] mx-0.5" /> for Ottawa
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
