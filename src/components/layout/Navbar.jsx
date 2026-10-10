import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../common/Logo';

const navLinks = [
  { name: 'HOME', id: 'home', path: '/' },
  { name: 'ABOUT', id: 'about', path: '/about' },
  { name: 'SERVICES', id: 'services', path: '/services' },
  { name: 'TREATMENTS', id: 'treatments', path: '/treatments' },
  { name: 'GALLERY', id: 'gallery', path: '/gallery' },
  { name: 'CONTACT', id: 'contact', path: '/contact' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
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

  // Navigation handler for mobile menu
  const handleMobileNav = (path) => {
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
      {/* CSS GRID HEADER CONTAINER (100% HORIZONTAL ROW, ZERO TOP LINE)             */}
      {/* ========================================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F4ED]/95 backdrop-blur-md border-b border-[#DCE1D8] shadow-xs'
            : 'bg-transparent'
        } h-[84px] sm:h-[88px] lg:h-[92px] px-3.5 sm:px-6 lg:px-12 xl:px-14`}
        style={{
          borderTop: 'none',
          outline: 'none',
          boxShadow: isScrolled ? '0 1px 12px rgba(16,17,15,0.04)' : 'none'
        }}
      >
        <div className="w-full h-full grid grid-cols-[auto_minmax(0,1fr)_auto] items-center">
          
          {/* ===================================================================== */}
          {/* LEFT: Brand Logo + Subtitle                                           */}
          {/* ===================================================================== */}
          <div className="justify-self-start flex items-center whitespace-nowrap flex-shrink-0">
            <Logo size="default" theme="light" />
          </div>

          {/* ===================================================================== */}
          {/* CENTER: Desktop Navigation (Centered on Centerline)                   */}
          {/* ===================================================================== */}
          <nav className="hidden lg:flex justify-self-center items-center justify-center space-x-6 xl:space-x-8 2xl:space-x-9 px-4 whitespace-nowrap">
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
                  className={`relative font-body text-[11.5px] xl:text-[12.5px] 2xl:text-[13px] font-bold tracking-[0.2em] uppercase transition-colors duration-200 py-1.5 cursor-pointer group whitespace-nowrap flex items-center ${
                    isActive
                      ? 'text-[#10110F]'
                      : 'text-[#6B7068] hover:text-[#10110F]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive ? (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#263D2B] rounded-full" />
                  ) : (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] bg-[#263D2B]/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ===================================================================== */}
          {/* RIGHT: Booking CTA Button & Responsive Menu                           */}
          {/* ===================================================================== */}
          <div className="justify-self-end flex items-center gap-3 whitespace-nowrap flex-shrink-0">
            
            {/* Desktop Booking CTA (>= lg) */}
            <Link
              to="/book-appointment"
              className="global-button hidden lg:inline-flex !px-6 !py-3 !text-[12px] xl:!text-[12.5px]"
            >
              BOOK APPOINTMENT
            </Link>

            {/* Mobile / Tablet Toggle (< lg) */}
            <div className="flex lg:hidden items-center gap-2.5">
              <Link
                to="/book-appointment"
                className="hidden sm:inline-flex global-button !px-4 !py-2 !text-[10.5px]"
              >
                <span>BOOK</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="w-10 h-10 rounded-[4px] bg-[#263D2B] text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm active:scale-95 hover:bg-[#1C2E20]"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
            </div>

          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* MOBILE DRAWER NAVIGATION                                                  */}
      {/* ========================================================================= */}
      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in touch-none"
          onClick={() => handleMobileNav(location.pathname)}
          onTouchMove={(e) => e.preventDefault()}
        />
      )}

      {/* Mobile Drawer Slide-in */}
      <div
        className={`fixed top-0 right-0 h-full w-[min(320px,85vw)] z-[70] bg-[#F7F4ED] border-l border-[#DCE1D8] flex flex-col transform transition-transform duration-300 ease-out shadow-2xl overscroll-contain ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#DCE1D8] bg-[#F7F4ED]">
          <Logo onClick={() => handleMobileNav('/')} theme="light" />
          <button
            onClick={() => handleMobileNav(location.pathname)}
            className="w-9 h-9 rounded-full bg-[#DCE1D8]/60 hover:bg-[#DCE1D8] text-[#10110F] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex-1 overflow-y-auto py-6 px-5 space-y-1.5">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleMobileNav(link.path)}
              className={`w-full text-left py-3 px-4 rounded-xl font-body text-sm font-bold tracking-[0.16em] uppercase transition-all duration-200 flex items-center justify-between cursor-pointer ${
                activeSection === link.id
                  ? 'bg-[#263D2B] text-white shadow-xs'
                  : 'text-[#6B7068] hover:bg-white hover:text-[#10110F]'
              }`}
            >
              <span>{link.name}</span>
            </button>
          ))}
        </div>

        {/* Drawer Footer CTA */}
        <div className="p-5 border-t border-[#DCE1D8] bg-[#F7F4ED] space-y-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <button
            onClick={() => handleMobileNav('/book-appointment')}
            className="group relative w-full h-12 rounded-[4px] bg-[#263D2B] text-white text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2 shadow-md transition-all duration-300 hover:bg-[#17261B] hover:shadow-lg hover:shadow-[#263D2B]/35 active:scale-98 cursor-pointer overflow-hidden"
          >
            <span className="relative z-10">BOOK APPOINTMENT</span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          </button>
        </div>
      </div>
    </>
  );
}
