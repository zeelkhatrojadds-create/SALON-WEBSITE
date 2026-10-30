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

          {/* Brand Column (col-span-3) */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-4">
            <div className="flex items-start">
              <Logo size="lg" theme="light" />
            </div>
            <p className="text-sm leading-relaxed text-[#6B7068] pt-1 font-body font-light">
              Ottawa's luxury women's beauty studio. Personalized beauty rituals and bespoke care designed around you — from everyday radiant glow to timeless bridal elegance.
            </p>
            <div className="flex items-center gap-3 pt-1">
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
            <div className="pt-2 text-xs text-[#263D2B] font-medium tracking-wide">
              Private 1-on-1 Sanctuary • Barrhaven, Ottawa
            </div>
          </div>

          {/* Column 2: Explore & Planning (col-span-3) */}
          <div className="sm:col-span-1 lg:col-span-3 space-y-3">
            <h3 className="font-serif font-semibold text-[#10110F] text-xs tracking-wider uppercase">
              Explore &amp; Planning
            </h3>
            <ul className="space-y-2 text-sm text-[#6B7068] font-body">
              {[
                { label: 'About Atelier & Janki', path: '/about' },
                { label: 'All Salon Services', path: '/services' },
                { label: 'Custom Experience Studio', path: '/custom-experience' },
                { label: 'Plan Your Salon Day', path: '/plan-salon-day' },
                { label: 'Special Treatments & Spas', path: '/special-treatments' },
                { label: 'Official Price List', path: '/price-list' },
                { label: 'Beauty Guide & Journal', path: '/beauty-guide' },
                { label: 'Portfolio Gallery', path: '/gallery' },
                { label: 'Client Reviews', path: '/reviews' },
                { label: 'Contact Us', path: '/contact' },
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                    className="hover:text-[#263D2B] hover:translate-x-0.5 transition-all inline-block cursor-pointer"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Atelier Studios (col-span-3) */}
          <div className="sm:col-span-1 lg:col-span-3 space-y-3">
            <h3 className="font-serif font-semibold text-[#10110F] text-xs tracking-wider uppercase">
              Atelier Studios
            </h3>
            <ul className="space-y-2 text-sm text-[#6B7068] font-body">
              {[
                { label: 'The Hair Atelier', path: '/hair-atelier' },
                { label: 'The Skin Atelier', path: '/skin-atelier' },
                { label: 'The Lash Atelier', path: '/lash-atelier' },
                { label: 'The Makeup Atelier', path: '/makeup-atelier' },
                { label: 'The Brow Atelier', path: '/brow-atelier' },
                { label: 'The Wax Atelier', path: '/wax-atelier' },
                { label: 'Hair Colour Atelier', path: '/hair-colour' },
                { label: 'Nail Art Studio', path: '/nail-art' },
                { label: 'Mehndi Design Studio', path: '/mehndi-design-studio' },
                { label: 'Careers & Team', path: '/careers' },
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                    className="hover:text-[#263D2B] hover:translate-x-0.5 transition-all inline-block cursor-pointer"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Atelier & Concierge (col-span-3) */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-4">
            <h3 className="font-serif font-semibold text-[#10110F] text-xs tracking-wider uppercase">
              Atelier &amp; Concierge
            </h3>
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
                className="inline-flex items-center justify-center w-full px-6 h-[44px] rounded-[4px] bg-[#263D2B] hover:bg-[#1C2E20] text-white text-[11px] font-bold uppercase tracking-[0.16em] shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer"
              >
                BOOK APPOINTMENT
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7068] font-body">
          <p>© {new Date().getFullYear()} GLAM GIRL BY JANKI — Ottawa, Canada. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
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
            <Link to="/admin" className="hover:text-[#10110F] transition-colors font-medium">Staff Portal</Link>
            <span>•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-[#263D2B] fill-[#263D2B] mx-0.5" /> for Ottawa
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
