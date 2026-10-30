import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  LogOut, 
  Shield, 
  Droplets, 
  Palette, 
  Feather, 
  Eye, 
  ArrowRight,
  ChevronRight,
  Scissors,
  Layers,
  Flower2,
  Calendar,
  FileText,
  Compass
} from 'lucide-react';
import Logo from '../common/Logo';
import { ALL_SERVICES } from '../../data/servicesData';

function getSessionUser() {
  try {
    const data = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('glfy_db_session_user') : null;
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

function logoutSessionUser() {
  try {
    sessionStorage.removeItem('glfy_db_session_user');
    sessionStorage.removeItem('glfy_admin_auth');
    localStorage.removeItem('glfy_admin_auth');
  } catch (e) {}
}

const AuthModal = lazy(() => import('../auth/AuthModal'));

// Primary curated navigation pillars (eliminating flat horizontal clutter)
const primaryNavLinks = [
  { name: 'SERVICES', id: 'services', path: '/services', hasDropdown: true },
  { name: 'CUSTOM STUDIO', id: 'custom-experience', path: '/custom-experience', isBespoke: true },
  { name: 'BEAUTY GUIDE', id: 'beauty-guide', path: '/beauty-guide' },
  { name: 'GALLERY', id: 'gallery', path: '/gallery' },
  { name: 'ABOUT', id: 'about', path: '/about' },
  { name: 'CONTACT', id: 'contact', path: '/contact' },
];

// Left Column: Services & Planning
const servicesPlanningData = [
  { 
    name: 'All Salon Services', 
    desc: 'Browse the complete treatment catalogue, prices, and durations.', 
    path: '/services',
    icon: Layers
  },
  { 
    name: 'Special Treatments & Spas', 
    desc: 'Explore existing specialized treatments and spa services.', 
    path: '/special-treatments',
    icon: Flower2
  },
  { 
    name: 'Plan Your Salon Day', 
    desc: 'Build a personalized itinerary using eligible existing services.', 
    path: '/plan-salon-day',
    icon: Calendar
  },
  { 
    name: 'Official Price List', 
    desc: 'View the approved salon price list.', 
    path: '/price-list',
    icon: FileText
  },
];

// Right Column: Flagship Ateliers (Featured)
const flagshipAteliers = [
  { 
    name: 'The Hair Atelier', 
    desc: 'Editorial styling, rituals, bridal hair, and cuts.', 
    path: '/hair-atelier',
    badge: 'ATELIER',
    icon: Scissors
  },
  { 
    name: 'The Skin Atelier', 
    desc: 'Personalized skincare, facials, and skin consultations.', 
    path: '/skin-atelier',
    badge: 'PREMIUM',
    icon: Sparkles
  },
  { 
    name: 'The Lash Atelier', 
    desc: 'Lash extensions, lifts, and tinting treatments.', 
    path: '/lash-atelier',
    badge: 'NEW',
    icon: Eye
  },
  { 
    name: 'The Makeup Atelier', 
    desc: 'Editorial makeup, bridal beauty, and signature looks.', 
    path: '/makeup-atelier',
    badge: 'NEW',
    icon: Sparkles
  },
];

// Right Column: Secondary Specialty Studios (2x2 Grid)
const secondaryStudios = [
  { 
    name: 'Hair Colour Atelier', 
    desc: 'Balayage, foil work, glossing, and dimensional colour.', 
    path: '/hair-colour',
    icon: Droplets
  },
  { 
    name: 'Nail Art Studio', 
    desc: 'Gel manicures, nail extensions, and custom nail art.', 
    path: '/nail-art',
    icon: Palette
  },
  { 
    name: 'Mehndi Design Studio', 
    desc: 'Organic henna artistry and bridal mehndi.', 
    path: '/mehndi-design-studio',
    icon: Feather
  },
  { 
    name: 'Custom Beauty Studio', 
    desc: 'Personalized beauty combinations and custom requests.', 
    path: '/custom-experience',
    icon: Compass
  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentUser, setCurrentUser] = useState(() => getSessionUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  const dropdownTimerRef = useRef(null);
  const servicesDropdownContainerRef = useRef(null);
  const dropdownCardRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Dynamic service count from master dataset
  const totalServiceCount = ALL_SERVICES?.length || 91;

  // Handle smooth dropdown hover timing
  const handleServicesMouseEnter = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    setIsServicesDropdownOpen(true);
  };

  const handleServicesMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 180);
  };

  // Close dropdown on navigation or route changes
  useEffect(() => {
    setIsServicesDropdownOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  // Close dropdown on click outside or Escape key press
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        servicesDropdownContainerRef.current && 
        !servicesDropdownContainerRef.current.contains(event.target)
      ) {
        setIsServicesDropdownOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsServicesDropdownOpen(false);
      }
    };

    if (isServicesDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isServicesDropdownOpen]);

  // Prevent dropdown card from overflowing right/left edges of viewport
  useEffect(() => {
    if (isServicesDropdownOpen && dropdownCardRef.current) {
      const rect = dropdownCardRef.current.getBoundingClientRect();
      const padding = 20;
      const rightOverflow = rect.right - (window.innerWidth - padding);
      if (rightOverflow > 0) {
        dropdownCardRef.current.style.transform = `translateX(-${rightOverflow}px)`;
      } else if (rect.left < padding) {
        dropdownCardRef.current.style.transform = `translateX(${padding - rect.left}px)`;
      } else {
        dropdownCardRef.current.style.transform = '';
      }
    }
  }, [isServicesDropdownOpen]);

  // Listen for login/logout changes dynamically
  useEffect(() => {
    const syncAuth = () => {
      setCurrentUser(getSessionUser());
    };
    syncAuth();
    window.addEventListener('storage', syncAuth);
    window.addEventListener('glfy:auth-changed', syncAuth);

    let unsub = null;
    import('../../db/salonDatabase').then((m) => {
      unsub = m.default.subscribe(syncAuth);
    }).catch(() => {});

    return () => {
      window.removeEventListener('storage', syncAuth);
      window.removeEventListener('glfy:auth-changed', syncAuth);
      if (unsub) unsub();
    };
  }, []);

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
    } else if (
      path.startsWith('/custom-experience') || 
      path.startsWith('/customization-studio') || 
      path.startsWith('/custom-studio') || 
      path.startsWith('/create-beauty-experience') || 
      path.startsWith('/create-your-own-beauty-experience')
    ) {
      setActiveSection('custom-experience');
    } else if (
      path.startsWith('/services') || 
      path.startsWith('/special-treatments') || 
      path.startsWith('/treatments') || 
      path.startsWith('/hair-atelier') || 
      path.startsWith('/the-hair-atelier') || 
      path.startsWith('/hair-colour') || 
      path.startsWith('/hair-color') || 
      path.startsWith('/skin-atelier') || 
      path.startsWith('/the-skin-atelier') || 
      path.startsWith('/lash-atelier') || 
      path.startsWith('/the-lash-atelier') || 
      path.startsWith('/nail-art') || 
      path.startsWith('/mehndi-design-studio') || 
      path.startsWith('/mehndi') ||
      path.startsWith('/plan-your-salon-day') ||
      path.startsWith('/plan-salon-day') ||
      path.startsWith('/price-list')
    ) {
      setActiveSection('services');
    } else if (path.startsWith('/beauty-guide') || path.startsWith('/guide')) {
      setActiveSection('beauty-guide');
    } else if (path.startsWith('/gallery')) {
      setActiveSection('gallery');
    } else if (path.startsWith('/about')) {
      setActiveSection('about');
    } else if (path.startsWith('/contact')) {
      setActiveSection('contact');
    }
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const showSolidNav = !isHome || isScrolled;

  return (
    <>
      {/* ========================================================================= */}
      {/* HEADER CONTAINER (SPACIOUS 3-ZONE ROW WITH PROPER MARGINS)                 */}
      {/* ========================================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          showSolidNav
            ? 'bg-[#F7F4ED]/95 backdrop-blur-md border-b border-[#DCE1D8] shadow-xs'
            : 'bg-[#F7F4ED]/90 md:bg-transparent'
        } h-[80px] sm:h-[86px] lg:h-[92px] px-4 sm:px-6 lg:px-8 xl:px-12`}
        style={{
          borderTop: 'none',
          outline: 'none',
          boxShadow: showSolidNav ? '0 1px 12px rgba(16,17,15,0.04)' : 'none'
        }}
      >
        <div className="w-full h-full max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* ===================================================================== */}
          {/* LEFT: Brand Logo                                                      */}
          {/* ===================================================================== */}
          <div className="flex items-center whitespace-nowrap shrink-0">
            <Logo size="default" theme="light" />
          </div>

          {/* ===================================================================== */}
          {/* CENTER: Curated Desktop Navigation (Uncluttered 6 Pillars)              */}
          {/* ===================================================================== */}
          <nav className="hidden lg:flex items-center justify-center space-x-4 xl:space-x-7 2xl:space-x-9 px-2 whitespace-nowrap">
            {primaryNavLinks.map((link) => {
              const isActive = activeSection === link.id;

              // 1. SERVICES WITH INTERACTIVE LUXURY MEGA-DROPDOWN
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    ref={servicesDropdownContainerRef}
                    className="relative group py-2"
                    onMouseEnter={handleServicesMouseEnter}
                    onMouseLeave={handleServicesMouseLeave}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsServicesDropdownOpen(false)}
                      className={`relative font-body text-[11px] xl:text-[12px] font-bold tracking-[0.14em] uppercase transition-colors duration-200 py-1.5 cursor-pointer flex items-center gap-1 ${
                        isActive || isServicesDropdownOpen
                          ? 'text-[#10110F]'
                          : 'text-[#6B7068] hover:text-[#10110F]'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isServicesDropdownOpen ? 'rotate-180 text-[#263D2B]' : 'text-[#6B7068]'
                      }`} />
                      {isActive && (
                        <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#263D2B] rounded-full" />
                      )}
                    </Link>

                    {/* Luxury Mega Dropdown Card (100% Solid Opaque Background, Zero Bleed-Through) */}
                    {isServicesDropdownOpen && (
                      <div
                        ref={dropdownCardRef}
                        className="absolute top-full left-0 lg:-left-16 xl:-left-24 mt-2 w-[780px] lg:w-[840px] xl:w-[890px] max-w-[calc(100vw-2rem)] bg-white border border-[#DCE1D8] shadow-[0_30px_70px_-15px_rgba(16,17,15,0.22)] rounded-2xl p-6 z-[100] whitespace-normal animate-in fade-in zoom-in-95 duration-150 origin-top"
                        style={{ backgroundColor: '#FFFFFF' }}
                        onMouseEnter={handleServicesMouseEnter}
                        onMouseLeave={handleServicesMouseLeave}
                      >
                        {/* Top decorative Forest Green bar */}
                        <div className="absolute top-0 left-6 right-6 h-[2.5px] bg-[#263D2B] rounded-full" />

                        {/* Dropdown Header */}
                        <div className="flex items-center justify-between pb-3.5 border-b border-[#DCE1D8] mb-5">
                          <span className="text-[10.5px] uppercase font-bold tracking-[0.22em] text-[#263D2B]">
                            GLAM GIRL ATELIER DIRECTORY
                          </span>
                          <Link
                            to="/services"
                            onClick={() => setIsServicesDropdownOpen(false)}
                            className="group/browse flex items-center gap-1.5 text-xs font-semibold text-[#465640] hover:text-[#10110F] transition-colors"
                          >
                            <span className="text-[11px] font-bold tracking-[0.06em] uppercase">
                              Browse All {totalServiceCount} Services
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#263D2B] transition-transform duration-200 group-hover/browse:translate-x-1" />
                          </Link>
                        </div>

                        {/* Two-Column Balanced Layout */}
                        <div className="grid grid-cols-12 gap-6">
                          
                          {/* Left Column — Services & Planning (col-span-5) */}
                          <div className="col-span-5 pr-5 border-r border-[#DCE1D8] flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-2.5 px-1">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B7068]">
                                  SERVICES &amp; PLANNING
                                </span>
                                <span className="text-[9.5px] font-medium text-[#465640] uppercase tracking-wider">
                                  Catalog &amp; Rates
                                </span>
                              </div>
                              <div className="space-y-1.5">
                                {servicesPlanningData.map((item) => {
                                  const ItemIcon = item.icon;
                                  return (
                                    <Link
                                      key={item.path}
                                      to={item.path}
                                      onClick={() => setIsServicesDropdownOpen(false)}
                                      className="flex items-start gap-3 p-2.5 rounded-xl border border-transparent hover:border-[#DCE1D8] hover:bg-[#F7F4ED] transition-all duration-200 group/item"
                                    >
                                      <div className="w-9 h-9 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-[#263D2B] flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-[#263D2B] group-hover/item:border-[#263D2B] group-hover/item:text-white transition-all duration-200 shadow-2xs">
                                        <ItemIcon className="w-4 h-4" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="text-xs font-semibold text-[#10110F] group-hover/item:text-[#263D2B] flex items-center justify-between transition-colors">
                                          <span>{item.name}</span>
                                          <ChevronRight className="w-3.5 h-3.5 text-[#A8B5A0] opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 shrink-0 ml-1" />
                                        </div>
                                        <p className="text-[11px] text-[#6B7068] leading-snug mt-0.5 group-hover/item:text-[#465640] transition-colors">
                                          {item.desc}
                                        </p>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          {/* Right Column — Atelier Studios (col-span-7) */}
                          <div className="col-span-7 flex flex-col justify-between space-y-3">
                            
                            {/* Flagship Atelier Destinations */}
                            <div>
                              <div className="flex items-center justify-between mb-2 px-1">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B7068]">
                                  ATELIER STUDIOS
                                </span>
                                <span className="text-[9.5px] font-medium text-[#263D2B] uppercase tracking-wider">
                                  Flagship Experiences
                                </span>
                              </div>
                              <div className="space-y-2">
                                {flagshipAteliers.map((atelier) => {
                                  const AtelierIcon = atelier.icon;
                                  return (
                                    <Link
                                      key={atelier.path}
                                      to={atelier.path}
                                      onClick={() => setIsServicesDropdownOpen(false)}
                                      className="flex items-center gap-3 p-2.5 rounded-xl border border-[#263D2B]/15 bg-[#263D2B]/[0.03] hover:bg-[#263D2B]/[0.08] hover:border-[#263D2B]/35 transition-all duration-200 group/flagship shadow-2xs"
                                    >
                                      <div className="w-9 h-9 rounded-xl bg-[#263D2B] text-white flex items-center justify-center shrink-0 shadow-xs group-hover/flagship:scale-105 group-hover/flagship:bg-[#17261B] transition-all duration-200">
                                        <AtelierIcon className="w-4 h-4 text-white" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                          <span className="text-xs font-bold text-[#10110F] group-hover/flagship:text-[#263D2B] transition-colors">
                                            {atelier.name}
                                          </span>
                                          {atelier.badge && (
                                            <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#263D2B] text-white shadow-2xs">
                                              {atelier.badge}
                                            </span>
                                          )}
                                        </div>
                                        <p className="text-[11px] text-[#6B7068] leading-tight mt-0.5 group-hover/flagship:text-[#263D2B]/85 transition-colors line-clamp-1">
                                          {atelier.desc}
                                        </p>
                                      </div>
                                      <ChevronRight className="w-3.5 h-3.5 text-[#A8B5A0] opacity-60 group-hover/flagship:opacity-100 group-hover/flagship:text-[#263D2B] group-hover/flagship:translate-x-0.5 transition-all duration-200 shrink-0" />
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Secondary Specialty Studios (2x2 Grid) */}
                            <div className="pt-2 border-t border-[#DCE1D8]/80">
                              <div className="flex items-center justify-between mb-2 px-1">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B7068]">
                                  SPECIALTY STUDIOS
                                </span>
                                <span className="text-[9.5px] font-medium text-[#465640] uppercase tracking-wider">
                                  Artistry &amp; Bespoke
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                {secondaryStudios.map((studio) => {
                                  const StudioIcon = studio.icon;
                                  return (
                                    <Link
                                      key={studio.path}
                                      to={studio.path}
                                      onClick={() => setIsServicesDropdownOpen(false)}
                                      className="flex items-start gap-2.5 p-2 rounded-lg border border-transparent hover:border-[#DCE1D8] hover:bg-[#F7F4ED] transition-all duration-150 group/substudio"
                                    >
                                      <div className="w-7 h-7 rounded-lg bg-[#F7F4ED] border border-[#DCE1D8] text-[#263D2B] flex items-center justify-center shrink-0 mt-0.5 group-hover/substudio:bg-[#263D2B] group-hover/substudio:border-[#263D2B] group-hover/substudio:text-white transition-all duration-150 shadow-2xs">
                                        <StudioIcon className="w-3.5 h-3.5" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="text-[11.5px] font-semibold text-[#10110F] group-hover/substudio:text-[#263D2B] transition-colors truncate">
                                          {studio.name}
                                        </div>
                                        <p className="text-[10px] text-[#6B7068] leading-tight mt-0.5 line-clamp-1">
                                          {studio.desc}
                                        </p>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              // 2. CUSTOM STUDIO WITH BESPOKE HIGHLIGHT
              if (link.isBespoke) {
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative font-body text-[11px] xl:text-[12px] font-bold tracking-[0.14em] uppercase transition-colors duration-200 py-1.5 cursor-pointer group whitespace-nowrap flex items-center gap-1.5 ${
                      isActive
                        ? 'text-[#10110F]'
                        : 'text-[#465640] hover:text-[#10110F]'
                    }`}
                  >
                    <span>{link.name}</span>
                    <span className="text-[8.5px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-[#263D2B]/10 text-[#263D2B] border border-[#263D2B]/20 shadow-2xs">
                      BESPOKE
                    </span>
                    {isActive ? (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#263D2B] rounded-full" />
                    ) : (
                      <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#263D2B]/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
                    )}
                  </Link>
                );
              }

              // 3. STANDARD NAVIGATION LINKS (BEAUTY GUIDE, GALLERY, ABOUT, CONTACT)
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative font-body text-[11px] xl:text-[12px] font-bold tracking-[0.14em] uppercase transition-colors duration-200 py-1.5 cursor-pointer group whitespace-nowrap flex items-center ${
                    isActive
                      ? 'text-[#10110F]'
                      : 'text-[#6B7068] hover:text-[#10110F]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive ? (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#263D2B] rounded-full" />
                  ) : (
                    <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#263D2B]/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ===================================================================== */}
          {/* RIGHT: Patron Account, Booking CTA & Responsive Menu                  */}
          {/* ===================================================================== */}
          <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
            
            {/* Desktop Patron Account Dropdown */}
            {currentUser && (
              <div className="hidden lg:relative lg:block">
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#DCE1D8] bg-white hover:border-[#263D2B] transition-all cursor-pointer shadow-xs"
                    aria-label="Patron account menu"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#263D2B] text-white flex items-center justify-center text-[11px] font-bold">
                      {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'P'}
                    </div>
                    <span className="text-xs font-semibold text-[#10110F]">
                      {currentUser.preferredName || currentUser.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#6B7068]" />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-[#DCE1D8] shadow-xl py-2 z-50 animate-fade-in"
                      onMouseLeave={() => setIsUserMenuOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-[#DCE1D8] mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                          SIGNED IN AS
                        </span>
                        <span className="text-xs font-serif font-bold text-[#10110F] block truncate">
                          {currentUser.name}
                        </span>
                        <span className="text-[11px] text-[#6B7068] block truncate">
                          {currentUser.email}
                        </span>
                      </div>

                      <Link
                        to="/customer-dashboard?tab=overview"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#10110F] hover:bg-[#F7F4ED] transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
                        <span>Patron Dashboard</span>
                      </Link>

                      {(currentUser.role === 'admin' || currentUser.role === 'staff') && (
                        <Link
                          to="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-[#263D2B] hover:bg-[#F7F4ED] transition-colors"
                        >
                          <Shield className="w-3.5 h-3.5 text-[#263D2B]" />
                          <span>Executive Suite</span>
                        </Link>
                      )}

                      <div className="pt-1 border-t border-[#DCE1D8] mt-1">
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            logoutSessionUser();
                            setCurrentUser(null);
                            window.dispatchEvent(new Event('glfy:auth-changed'));
                            navigate('/');
                          }}
                          className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Desktop Booking CTA */}
            <div className="hidden lg:block">
              <Link
                to="/book-appointment"
                className="global-button !px-5 xl:!px-7 !py-2.5 xl:!py-3 !text-[11px] xl:!text-[12px] shadow-sm hover:shadow-md"
              >
                BOOK APPOINTMENT
              </Link>
            </div>

            {/* Mobile / Tablet Toggle (< lg) */}
            <div className="flex lg:hidden items-center gap-2 sm:gap-2.5">
              {currentUser && (
                <Link
                  to="/customer-dashboard"
                  className="w-8 h-8 rounded-full bg-[#263D2B] text-white flex items-center justify-center text-xs font-bold shadow-xs"
                  aria-label="Patron dashboard"
                >
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'P'}
                </Link>
              )}

              <div className="hidden sm:block">
                <Link
                  to="/book-appointment"
                  className="global-button !px-3.5 sm:!px-4 !py-2 !text-[10px] sm:!text-[10.5px]"
                >
                  <span>BOOK</span>
                </Link>
              </div>

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
        className={`fixed top-0 right-0 h-full w-[min(340px,88vw)] z-[70] bg-[#F7F4ED] border-l border-[#DCE1D8] flex flex-col transform transition-transform duration-300 ease-out shadow-2xl overscroll-contain ${
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

        {/* Drawer Patron Block */}
        <div className="p-4 bg-white border-b border-[#DCE1D8]">
          {currentUser ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#263D2B] text-white flex items-center justify-center text-xs font-bold">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'P'}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                    PATRON
                  </span>
                  <span className="text-xs font-bold text-[#10110F] block">
                    {currentUser.preferredName || currentUser.name}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleMobileNav('/customer-dashboard')}
                className="text-xs font-bold text-[#263D2B] hover:underline"
              >
                Dashboard
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsAuthModalOpen(true);
              }}
              className="w-full py-2 px-3 rounded-xl border border-[#263D2B] text-[#263D2B] text-xs font-bold uppercase tracking-wider text-center"
            >
              Sign In / Patron Register
            </button>
          )}
        </div>

        {/* Drawer Links with Luxury Grouping */}
        <div className="flex-1 overflow-y-auto py-4 px-5 space-y-4">
          
          {/* Featured Custom Studio Card */}
          <div 
            onClick={() => handleMobileNav('/custom-experience')}
            className="p-3.5 rounded-2xl bg-[#263D2B] text-white cursor-pointer shadow-sm flex items-center justify-between gap-3 group"
          >
            <div className="space-y-0.5">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A8B5A0] block">
                CREATE YOUR OWN
              </span>
              <div className="text-xs font-bold">Customization Studio</div>
              <div className="text-[10px] text-white/70">Bespoke formulations &amp; styling</div>
            </div>
            <span className="p-2 rounded-xl bg-white/10 text-white group-hover:bg-white/20 transition-colors">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>

          {/* Services & Planning Section */}
          <div className="space-y-1">
            <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#6B7068] px-2 block">
              SERVICES &amp; PLANNING
            </span>
            {[
              { name: `All ${totalServiceCount} Services`, path: '/services' },
              { name: 'Special Treatments & Spas', path: '/special-treatments' },
              { name: 'Plan Your Salon Day', path: '/plan-salon-day' },
              { name: 'Official Price List', path: '/price-list' },
            ].map((link) => (
              <button
                key={link.path}
                onClick={() => handleMobileNav(link.path)}
                className="w-full text-left py-2 px-3 rounded-xl text-xs font-medium text-[#10110F] hover:bg-white transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#A8B5A0]" />
              </button>
            ))}
          </div>

          {/* Atelier Studios Section */}
          <div className="space-y-1 pt-2 border-t border-[#DCE1D8]">
            <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#6B7068] px-2 block">
              ATELIER STUDIOS
            </span>
            {[
              { name: 'The Hair Atelier', path: '/hair-atelier', badge: 'ATELIER' },
              { name: 'The Skin Atelier', path: '/skin-atelier', badge: 'PREMIUM' },
              { name: 'The Lash Atelier', path: '/lash-atelier', badge: 'NEW' },
              { name: 'Hair Colour Atelier', path: '/hair-colour' },
              { name: 'Nail Art Studio', path: '/nail-art' },
              { name: 'Mehndi Design Studio', path: '/mehndi-design-studio' },
            ].map((link) => (
              <button
                key={link.path}
                onClick={() => handleMobileNav(link.path)}
                className="w-full text-left py-2 px-3 rounded-xl text-xs font-medium text-[#10110F] hover:bg-white transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-[#263D2B] text-white">
                      {link.badge}
                    </span>
                  )}
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#A8B5A0]" />
              </button>
            ))}
          </div>

          {/* Exploration & Journal */}
          <div className="space-y-1 pt-2 border-t border-[#DCE1D8]">
            <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#6B7068] px-2 block">
              THE ATELIER
            </span>
            {[
              { name: 'Beauty Guide', path: '/beauty-guide' },
              { name: 'Gallery of Transformations', path: '/gallery' },
              { name: 'About Janki & Atelier', path: '/about' },
              { name: 'Client Reviews', path: '/reviews' },
              { name: 'Contact & Location', path: '/contact' },
            ].map((link) => (
              <button
                key={link.path}
                onClick={() => handleMobileNav(link.path)}
                className="w-full text-left py-2 px-3 rounded-xl text-xs font-medium text-[#10110F] hover:bg-white transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#A8B5A0]" />
              </button>
            ))}
          </div>

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

          {/* Secondary Policy Links */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-[11px] text-[#6B7068]">
            <button
              onClick={() => handleMobileNav('/terms-and-conditions')}
              className="hover:text-[#10110F] transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
            <span>•</span>
            <button
              onClick={() => handleMobileNav('/privacy-policy')}
              className="hover:text-[#10110F] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <Suspense fallback={null}>
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
          />
        </Suspense>
      )}
    </>
  );
}
