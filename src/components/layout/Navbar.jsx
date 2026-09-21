import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, Calendar } from 'lucide-react';
import Logo from '../common/Logo';
import MobileMenu from './MobileMenu';
import SearchModal from './SearchModal';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  const isDetailPage = location.pathname.startsWith('/services/');

  // Track scroll position for navbar background blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer / Scroll Spy for active section on SPA
  useEffect(() => {
    if (isDetailPage) {
      setActiveSection('services');
      return;
    }

    const sections = ['home', 'services', 'booking', 'gallery', 'about', 'contact'];
    
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleSpyWithThrottle(handleScrollSpy), { passive: true });
    handleScrollSpy();

    return () => window.removeEventListener('scroll', handleSpyWithThrottle(handleScrollSpy));
  }, [location.pathname, isDetailPage]);

  function handleSpyWithThrottle(fn) {
    let ticking = false;
    return () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          fn();
          ticking = false;
        });
        ticking = true;
      }
    };
  }

  const navLinks = [
    { name: 'Home', id: 'home', path: '/' },
    { name: 'Services', id: 'services', path: '/services' },
    { name: 'Gallery', id: 'gallery', path: '/gallery' },
    { name: 'About', id: 'about', path: '/about' },
    { name: 'Contact', id: 'contact', path: '/contact' },
  ];

  const handleNavClick = (e, link) => {
    e.preventDefault();
    if (isDetailPage) {
      navigate(`/#${link.id}`);
    } else {
      const el = document.getElementById(link.id);
      if (el) {
        const navHeight = 76;
        const pos = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: pos, behavior: 'smooth' });
        window.history.pushState(null, '', `/#${link.id}`);
        setActiveSection(link.id);
      } else {
        navigate(`/#${link.id}`);
      }
    }
  };

  const handleBookingClick = (e) => {
    e.preventDefault();
    if (isDetailPage) {
      navigate('/#booking');
    } else {
      const el = document.getElementById('booking');
      if (el) {
        const navHeight = 76;
        const pos = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: pos, behavior: 'smooth' });
        window.history.pushState(null, '', '/#booking');
        setActiveSection('booking');
      } else {
        navigate('/#booking');
      }
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#140E11]/95 backdrop-blur-md shadow-lg border-b border-white/10 py-2.5 sm:py-3.5' 
            : activeSection === 'home' && !isDetailPage
              ? 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-3 sm:py-5'
              : 'bg-[#140E11]/95 backdrop-blur-md border-b border-white/10 py-3 sm:py-4'
        }`}
      >
        {/* Full-width responsive header */}
        <div className="w-full px-3 sm:px-6 lg:px-12 xl:px-20 mx-auto">
          <div className="flex items-center justify-between gap-2">
            
            {/* Left: Brand Logo */}
            <div className="min-w-0 flex-1 sm:flex-initial">
              <a 
                href="/#home"
                onClick={(e) => handleNavClick(e, { id: 'home', path: '/' })}
                className="cursor-pointer inline-block"
              >
                <Logo variant="dark" size="default" />
              </a>
            </div>

            {/* Center: Desktop Navigation Links with Smooth SPA Scroll */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-10">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={`/#${link.id}`}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`relative text-sm lg:text-[15px] font-medium tracking-wide transition-colors py-1.5 cursor-pointer ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-pink rounded-full transition-all duration-300 shadow-glow" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right Actions: Search Trigger & Book Appointment Button */}
            <div className="flex items-center space-x-1.5 sm:space-x-4 flex-shrink-0">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-white/90 hover:text-brand-pink hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="Search services"
                title="Search salon services"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Desktop Book Appointment Button */}
              <a
                href="/#booking"
                onClick={handleBookingClick}
                className="hidden lg:inline-flex items-center gap-2 bg-brand-pink hover:bg-brand-pink-hover text-white text-xs sm:text-sm font-semibold uppercase tracking-wider px-5 xl:px-6 py-2.5 rounded-full shadow-md shadow-brand-pink/25 hover:shadow-lg hover:shadow-brand-pink/35 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </a>

              {/* Mobile Hamburger Menu Trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden w-10 h-10 flex items-center justify-center text-white hover:text-brand-pink hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        activeSection={activeSection}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onNavClick={handleNavClick}
        onBookingClick={handleBookingClick}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  );
}
