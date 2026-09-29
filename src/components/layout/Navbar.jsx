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
    if (e) e.preventDefault();
    navigate('/book-appointment');
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0D0B0B]/95 backdrop-blur-md shadow-2xl border-b border-white/10 h-[76px] flex items-center' 
            : activeSection === 'home' && !isDetailPage
              ? 'bg-gradient-to-b from-[#0D0B0B]/90 via-[#0D0B0B]/60 to-transparent h-[84px] flex items-center'
              : 'bg-[#0D0B0B]/95 backdrop-blur-md border-b border-white/10 h-[76px] flex items-center'
        }`}
      >
        {/* Full-width responsive header container */}
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 mx-auto">
          <div className="flex items-center justify-between gap-4">
            
            {/* Left: Brand Logo */}
            <div className="min-w-0 flex-1 sm:flex-initial">
              <a 
                href="/#home"
                onClick={(e) => handleNavClick(e, { id: 'home', path: '/' })}
                className="cursor-pointer inline-block"
              >
                <Logo size="default" />
              </a>
            </div>

            {/* Center: Desktop Navigation Links with Smooth SPA Scroll */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={`/#${link.id}`}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`relative font-sans text-xs lg:text-[14px] font-medium tracking-widest uppercase transition-colors py-1 cursor-pointer ${
                      isActive
                        ? 'text-[#DDB88C]'
                        : 'text-[#E5DDD8]/80 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#DDB88C] rounded-full transition-all duration-300" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right Actions: Book Appointment CTA */}
            <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
              {/* Desktop Book Appointment Button */}
              <Link
                to="/book-appointment"
                className="hidden sm:inline-flex items-center gap-2 bg-[#D83A75] hover:bg-[#c42f65] text-white text-xs font-bold uppercase tracking-wider px-5 xl:px-6 py-2.5 rounded-full shadow-lg shadow-[#D83A75]/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>BOOK APPOINTMENT</span>
              </Link>

              {/* Mobile Hamburger Menu Trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden w-10 h-10 flex items-center justify-center text-white hover:text-[#DDB88C] hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
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
