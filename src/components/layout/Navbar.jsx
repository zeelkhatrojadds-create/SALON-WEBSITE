import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Calendar, X, ArrowRight } from 'lucide-react';
import Logo from '../common/Logo';

const navLinks = [
  { name: 'HOME', id: 'home', path: '/' },
  { name: 'SERVICES', id: 'services', path: '/services' },
  { name: 'TREATMENTS', id: 'treatments', path: '/treatments' },
  { name: 'GALLERY', id: 'gallery', path: '/gallery' },
  { name: 'ABOUT', id: 'about', path: '/about' },
  { name: 'CAREERS', id: 'careers', path: '/careers' },
  { name: 'CONTACT', id: 'contact', path: '/contact' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  const isLightPage = location.pathname.startsWith('/services') || 
                      location.pathname.startsWith('/treatments') || 
                      location.pathname.startsWith('/gallery') || 
                      location.pathname.startsWith('/about') || 
                      location.pathname.startsWith('/contact') ||
                      location.pathname.startsWith('/careers') ||
                      location.pathname.startsWith('/career');

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Set active section based on current pathname
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setActiveSection('home');
    } else if (path.startsWith('/services')) {
      setActiveSection('services');
    } else if (path.startsWith('/treatments')) {
      setActiveSection('treatments');
    } else if (path.startsWith('/gallery')) {
      setActiveSection('gallery');
    } else if (path.startsWith('/about')) {
      setActiveSection('about');
    } else if (path.startsWith('/reviews')) {
      setActiveSection('reviews');
    } else if (path.startsWith('/contact')) {
      setActiveSection('contact');
    } else if (path.startsWith('/careers') || path.startsWith('/career')) {
      setActiveSection('careers');
    }
  }, [location.pathname]);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (link.id === 'home') {
      navigate('/');
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }

    if (link.id === 'services') {
      navigate('/services');
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }

    if (link.id === 'treatments') {
      navigate('/treatments');
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }

    if (link.id === 'gallery') {
      navigate('/gallery');
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }

    if (link.id === 'about') {
      navigate('/about');
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }

    if (link.id === 'reviews') {
      navigate('/reviews');
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }

    if (link.id === 'careers') {
      navigate('/careers');
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }

    if (link.id === 'contact') {
      navigate('/contact');
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* LUXURY SALON NAVBAR HEADER                                                */}
      {/* ========================================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isLightPage
            ? 'bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E8DFD3] shadow-xs'
            : isScrolled
            ? 'bg-[#0D0A0B]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'bg-gradient-to-b from-black/85 via-black/50 to-transparent'
        } h-[68px] sm:h-[74px] lg:h-[80px] flex items-center px-[4%] sm:px-[5%] lg:px-[6%]`}
      >
        <div className="w-full flex items-center justify-between gap-4 sm:gap-6">
          
          {/* ===================================================================== */}
          {/* LEFT: Large Complete Brand Logo                                       */}
          {/* ===================================================================== */}
          <div className="flex items-center justify-start flex-shrink-0">
            <Logo size="default" theme={isLightPage ? 'light' : 'dark'} />
          </div>

          {/* ===================================================================== */}
          {/* CENTER: Centered Navigation with Medium/Large Readable Typography */}
          {/* ===================================================================== */}
          <nav className="hidden md:flex items-center justify-center space-x-6 lg:space-x-8 xl:space-x-10 flex-1 px-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={`/#${link.id}`}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`relative font-body text-[13px] lg:text-[14px] font-bold tracking-[0.2em] uppercase transition-colors duration-200 py-2 cursor-pointer group ${
                    isLightPage
                      ? isActive
                        ? 'text-[#A67C48]'
                        : 'text-[#5C4F46] hover:text-[#A67C48]'
                      : isActive
                      ? 'text-[#CFA46A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]'
                      : 'text-[#F7F1E8] hover:text-[#CFA46A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive ? (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#CFA46A] via-[#E5C492] to-[#CFA46A] rounded-full shadow-[0_0_8px_rgba(207,164,106,0.8)]" />
                  ) : (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#CFA46A]/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ===================================================================== */}
          {/* RIGHT: Large Premium Rectangular Button (190px × 46px) & Mobile Menu */}
          {/* ===================================================================== */}
          <div className="flex items-center justify-end gap-3 flex-shrink-0">
            
            {/* Desktop / Tablet Premium Rounded-Full Pill Button */}
            <Link
              to="/book-appointment"
              className="hidden sm:inline-flex items-center justify-center gap-2 px-6 h-[40px] lg:h-[44px] rounded-full bg-gradient-to-r from-[#CFA46A] via-[#E5C492] to-[#CFA46A] hover:from-[#E5C492] hover:to-[#CFA46A] text-[#0D0B0B] text-[11.5px] lg:text-[12px] font-extrabold uppercase tracking-[0.16em] border border-[#E5C492]/50 shadow-[0_4px_16px_rgba(207,164,106,0.35)] transition-all duration-300 hover:scale-[1.03] active:scale-98 cursor-pointer flex-shrink-0"
            >
              <span>BOOK APPOINTMENT</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`md:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                isLightPage
                  ? 'bg-white border border-[#E8DFD3] text-[#161012] hover:text-[#CFA46A]'
                  : 'bg-white/5 border border-white/10 text-[#F7F1E8] hover:text-[#CFA46A]'
              }`}
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* MOBILE DRAWER NAVIGATION */}
      {/* ========================================================================= */}
      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm transition-opacity animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Slide-in */}
      <div
        className={`fixed top-0 right-0 h-full w-[min(320px,85vw)] z-[70] bg-[#0A0809] border-l border-[#CFA46A]/20 flex flex-col transform transition-transform duration-300 ease-out shadow-2xl ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#CFA46A]/15 bg-[#140F11]">
          <Logo size="sm" onClick={() => setIsMobileMenuOpen(false)} />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F7F1E8]/70 hover:text-[#CFA46A] transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Nav Links */}
        <nav className="flex-1 flex flex-col gap-1 p-5 pt-6 overflow-y-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`/#${link.id}`}
              onClick={(e) => handleNavClick(e, link)}
              className={`font-body text-sm font-bold uppercase tracking-[0.2em] py-3.5 px-3 rounded-xl border-b border-[#CFA46A]/10 transition-colors flex items-center justify-between ${
                activeSection === link.id
                  ? 'text-[#CFA46A] bg-[#CFA46A]/10'
                  : 'text-[#F7F1E8]/80 hover:text-[#CFA46A] hover:bg-white/5'
              }`}
            >
              <span>{link.name}</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-50" />
            </a>
          ))}
        </nav>

        {/* Drawer Footer CTA */}
        <div className="p-5 border-t border-[#CFA46A]/15 bg-[#140F11] space-y-3">
          <Link
            to="/book-appointment"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full h-[46px] rounded-lg bg-gradient-to-r from-[#CFA46A] via-[#E5C492] to-[#CFA46A] text-[#0D0B0B] text-xs font-extrabold uppercase tracking-[0.16em] flex items-center justify-center gap-2 shadow-lg shadow-[#CFA46A]/20 transition-all hover:scale-105 active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>BOOK APPOINTMENT</span>
          </Link>
          <p className="text-[10px] text-center text-[#F7F1E8]/40 uppercase tracking-widest font-mono">
            Ottawa, ON • 1 616-255-0549
          </p>
        </div>
      </div>
    </>
  );
}
