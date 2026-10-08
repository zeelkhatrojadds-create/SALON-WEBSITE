import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Heart } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '../common/SocialIcons';
import Logo from '../common/Logo';

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const pos = el.getBoundingClientRect().top + window.pageYOffset - 76;
    window.scrollTo({ top: pos, behavior: 'smooth' });
  }
};

export default function Footer() {
  return (
    <footer className="w-full bg-[#0A0809] text-[#F7F1E8]/70 pt-14 sm:pt-20 pb-8 border-t border-[#CFA46A]/15">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-[#CFA46A]/10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <Logo size="lg" />
            <p className="text-sm leading-relaxed max-w-sm text-[#F7F1E8]/55 pt-1">
              Ottawa's luxury women's beauty studio. Personalized beauty experiences for every woman — from everyday glow to bridal transformations.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com/glamgirlbyjanki"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 border border-[#CFA46A]/25 flex items-center justify-center text-[#F7F1E8]/50 hover:text-[#CFA46A] hover:border-[#CFA46A]/60 transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 border border-[#CFA46A]/25 flex items-center justify-center text-[#F7F1E8]/50 hover:text-[#CFA46A] hover:border-[#CFA46A]/60 transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-semibold text-[#CFA46A] text-sm tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-2 text-sm text-[#F7F1E8]/55">
              {[
                { label: 'Home', path: '/' },
                { label: 'Services', path: '/services' },
                { label: 'Treatments', path: '/treatments' },
                { label: 'Gallery', path: '/gallery' },
                { label: 'About', path: '/about' },
                { label: 'Contact', path: '/contact' },
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                    className="hover:text-[#CFA46A] transition-colors cursor-pointer"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to="/careers" 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                  className="hover:text-[#CFA46A] transition-colors"
                >
                  Careers & Join Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/book-appointment" 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                  className="hover:text-[#CFA46A] transition-colors"
                >
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-semibold text-[#CFA46A] text-sm tracking-wider uppercase">Services</h4>
            <ul className="space-y-2 text-sm text-[#F7F1E8]/55">
              {[
                { name: 'Threading', path: '/services/threading' },
                { name: 'Waxing', path: '/services/waxing' },
                { name: 'Facial', path: '/services/facial' },
                { name: 'Makeup', path: '/services/makeup' },
                { name: 'Henna', path: '/services/henna' },
                { name: 'Hair Care', path: '/services/hair-cut' },
                { name: 'Massage', path: '/services/massage' }
              ].map((s) => (
                <li key={s.name}>
                  <Link
                    to={s.path}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                    className="hover:text-[#CFA46A] transition-colors cursor-pointer"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <h4 className="font-display font-semibold text-[#CFA46A] text-sm tracking-wider uppercase">Contact</h4>
            <div className="space-y-3 text-sm text-[#F7F1E8]/55">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#CFA46A] flex-shrink-0 mt-0.5" />
                <span>405 Euphoria Crescent,<br />Ottawa, ON K2J 7M7</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 text-[#CFA46A] flex items-center justify-center font-bold text-xs">📞</span>
                <a href="tel:+16162550549" className="hover:text-[#CFA46A] transition-colors">
                  +1 (616) 255-0549
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#CFA46A] flex-shrink-0" />
                <a href="mailto:Glamgirlbyjanki@gmail.com" className="hover:text-[#CFA46A] transition-colors">
                  Glamgirlbyjanki@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <InstagramIcon className="w-4 h-4 text-[#CFA46A] flex-shrink-0" />
                <a href="https://instagram.com/glamgirlbyjanki" target="_blank" rel="noreferrer" className="hover:text-[#CFA46A] transition-colors">
                  glamgirlbyjanki
                </a>
              </div>
            </div>

            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 bg-[#CFA46A] hover:bg-[#E5C492] text-[#100C0D] text-xs font-bold uppercase tracking-widest px-6 py-3 transition-all duration-200 mt-2"
            >
              BOOK AN APPOINTMENT
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#F7F1E8]/35">
          <p>© {new Date().getFullYear()} GLAM GIRL BY JANKI — Ottawa, Canada. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="hover:text-[#CFA46A] transition-colors">Staff Portal</Link>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-[#CFA46A] fill-[#CFA46A] mx-0.5" /> for Ottawa
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
