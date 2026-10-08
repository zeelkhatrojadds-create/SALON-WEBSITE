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

  // Prevent background scroll when mobile drawer is open (iOS & Android compatible)
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Clean navigation handler for mobile menu links
  const handleMobileNav = (path) => {
    // Unlock body scroll immediately
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    setIsMobileMenuOpen(false);

    if (location.pathname === path) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      navigate(path);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  };

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
          {/* CENTER: Full Desktop Navigation (>= 1200px / xl)                     */}
          {/* ===================================================================== */}
          <nav className="hidden xl:flex items-center justify-center space-x-6 xl:space-x-8 2xl:space-x-10 flex-1 px-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className={`relative font-body text-[12.5px] xl:text-[13.5px] 2xl:text-[14px] font-bold tracking-[0.2em] uppercase transition-colors duration-200 py-2 cursor-pointer group whitespace-nowrap ${
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
                </Link>
              );
            })}
          </nav>

          {/* ===================================================================== */}
          {/* RIGHT: Responsive CTA & Menu (Desktop / Tablet / Mobile)              */}
          {/* ===================================================================== */}
          <div className="flex items-center justify-end gap-2.5 sm:gap-3 flex-shrink-0">
            
            {/* Desktop Full CTA (>= 1200px / xl) */}
            <Link
              to="/book-appointment"
              className="hidden xl:inline-flex items-center justify-center gap-2 px-6 h-[42px] 2xl:h-[44px] rounded-full bg-gradient-to-r from-[#CFA46A] via-[#E5C492] to-[#CFA46A] hover:from-[#E5C492] hover:to-[#CFA46A] text-[#0D0B0B] text-[11.5px] 2xl:text-[12px] font-extrabold uppercase tracking-[0.16em] border border-[#E5C492]/50 shadow-[0_4px_16px_rgba(207,164,106,0.35)] transition-all duration-300 hover:scale-[1.03] active:scale-98 cursor-pointer flex-shrink-0"
            >
              <span>BOOK APPOINTMENT</span>
            </Link>

            {/* Tablet View (768px → 1199px): Book Appointment CTA + Hamburger Toggle */}
            <div className="hidden md:flex xl:hidden items-center gap-3">
              <Link
                to="/book-appointment"
                className="inline-flex items-center justify-center gap-2 px-5 h-[42px] rounded-full bg-gradient-to-r from-[#CFA46A] via-[#E5C492] to-[#CFA46A] hover:from-[#E5C492] hover:to-[#CFA46A] text-[#0D0B0B] text-[11px] font-extrabold uppercase tracking-[0.14em] border border-[#E5C492]/50 shadow-[0_4px_14px_rgba(207,164,106,0.3)] transition-all duration-200 active:scale-98 cursor-pointer"
              >
                <span>BOOK APPOINTMENT</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md active:scale-95 ${
                  isLightPage
                    ? 'bg-[#221D1F] text-white hover:bg-[#342D2F]'
                    : 'bg-[#241F20]/90 backdrop-blur-md border border-white/15 text-white hover:bg-[#342D2F]'
                }`}
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Mobile View (< 768px): Ottawa Location Pill Badge + Menu Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <div
                className={`flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border shadow-sm select-none transition-all ${
                  isLightPage
                    ? 'bg-[#221D1F] border-black/15 text-white'
                    : 'bg-[#241F20]/90 backdrop-blur-md border-white/15 text-[#F7F1E8]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.9)] flex-shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase font-body text-white leading-none">
                  OTTAWA
                </span>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md active:scale-95 ${
                  isLightPage
                    ? 'bg-[#221D1F] text-white hover:bg-[#342D2F]'
                    : 'bg-[#241F20]/90 backdrop-blur-md border border-white/15 text-white hover:bg-[#342D2F]'
                }`}
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
            </div>

          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* MOBILE DRAWER NAVIGATION */}
      {/* ========================================================================= */}
      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm transition-opacity animate-fade-in touch-none"
          onClick={() => handleMobileNav(location.pathname)}
          onTouchMove={(e) => e.preventDefault()}
        />
      )}

      {/* Mobile Drawer Slide-in */}
      <div
        className={`fixed top-0 right-0 h-full w-[min(320px,85vw)] z-[70] bg-[#0A0809] border-l border-[#CFA46A]/20 flex flex-col transform transition-transform duration-300 ease-out shadow-2xl overscroll-contain ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#CFA46A]/15 bg-[#140F11]">
          <Logo size="sm" onClick={() => handleMobileNav('/')} />
          <button
            onClick={() => handleMobileNav(location.pathname)}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F7F1E8]/70 hover:text-[#CFA46A] transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Nav Links */}
        <nav className="flex-1 flex flex-col gap-1 p-5 pt-6 overflow-y-auto overscroll-contain">
          {navLinks.map((link) => (
            <button
              key={link.name}
              type="button"
              onClick={() => handleMobileNav(link.path)}
              className={`font-body text-sm font-bold uppercase tracking-[0.2em] py-3.5 px-3 rounded-xl border-b border-[#CFA46A]/10 transition-colors flex items-center justify-between text-left w-full cursor-pointer ${
                activeSection === link.id
                  ? 'text-[#CFA46A] bg-[#CFA46A]/10'
                  : 'text-[#F7F1E8]/80 hover:text-[#CFA46A] hover:bg-white/5'
              }`}
            >
              <span>{link.name}</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-50" />
            </button>
          ))}
        </nav>

        {/* Drawer Footer CTA */}
        <div className="p-5 border-t border-[#CFA46A]/15 bg-[#140F11] space-y-3">
          <button
            type="button"
            onClick={() => handleMobileNav('/book-appointment')}
            className="w-full h-[46px] rounded-lg bg-gradient-to-r from-[#CFA46A] via-[#E5C492] to-[#CFA46A] text-[#0D0B0B] text-xs font-extrabold uppercase tracking-[0.16em] flex items-center justify-center gap-2 shadow-lg shadow-[#CFA46A]/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>BOOK APPOINTMENT</span>
          </button>
          <p className="text-[10px] text-center text-[#F7F1E8]/40 uppercase tracking-widest font-mono">
            Ottawa, ON • 1 616-255-0549
          </p>
        </div>
      </div>
    </>
  );
}
