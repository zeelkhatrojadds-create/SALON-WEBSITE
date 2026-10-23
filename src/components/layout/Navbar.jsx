import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, ChevronDown, Sparkles, Calendar, LogOut, Shield } from 'lucide-react';
import Logo from '../common/Logo';
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

const navLinks = [
  { name: 'HOME', id: 'home', path: '/' },
  { name: 'ABOUT', id: 'about', path: '/about' },
  { name: 'SERVICES', id: 'services', path: '/services' },
  { name: 'SPECIAL TREATMENTS', id: 'special-treatments', path: '/special-treatments' },
  { name: 'BEAUTY GUIDE', id: 'beauty-guide', path: '/beauty-guide' },
  { name: 'GALLERY', id: 'gallery', path: '/gallery' },
  { name: 'CONTACT', id: 'contact', path: '/contact' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentUser, setCurrentUser] = useState(() => getSessionUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Listen for login/logout changes dynamically
  useEffect(() => {
    const syncAuth = () => {
      setCurrentUser(getSessionUser());
    };
    syncAuth();
    window.addEventListener('storage', syncAuth);
    window.addEventListener('glfy:auth-changed', syncAuth);

    let unsub = null;
    // Async subscribe without blocking critical initial chunk
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
    } else if (path.startsWith('/services')) {
      setActiveSection('services');
    } else if (path.startsWith('/special-treatments') || path.startsWith('/treatments') || path.startsWith('/nail-art') || path.startsWith('/hair-colour') || path.startsWith('/hair-color') || path.startsWith('/mehndi-design-studio') || path.startsWith('/mehndi')) {
      setActiveSection('special-treatments');
    } else if (path.startsWith('/beauty-guide') || path.startsWith('/guide')) {
      setActiveSection('beauty-guide');
    } else if (path.startsWith('/gallery')) {
      setActiveSection('gallery');
    } else if (path.startsWith('/about')) {
      setActiveSection('about');
    } else if (path.startsWith('/reviews')) {
      setActiveSection('reviews');
    } else if (path.startsWith('/price-list') || path.startsWith('/prices')) {
      setActiveSection('price-list');
    } else if (path.startsWith('/terms')) {
      setActiveSection('terms');
    } else if (path.startsWith('/contact')) {
      setActiveSection('contact');
    } else if (path.startsWith('/careers') || path.startsWith('/career')) {
      setActiveSection('careers');
    }
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const showSolidNav = !isHome || isScrolled;

  return (
    <>
      {/* ========================================================================= */}
      {/* CSS GRID HEADER CONTAINER (100% HORIZONTAL ROW, ZERO TOP LINE)             */}
      {/* ========================================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          showSolidNav
            ? 'bg-[#F7F4ED]/95 backdrop-blur-md border-b border-[#DCE1D8] shadow-xs'
            : 'bg-[#F7F4ED]/90 md:bg-transparent'
        } h-[80px] sm:h-[86px] lg:h-[92px] px-3.5 sm:px-6 lg:px-6 xl:px-12 2xl:px-14`}
        style={{
          borderTop: 'none',
          outline: 'none',
          boxShadow: showSolidNav ? '0 1px 12px rgba(16,17,15,0.04)' : 'none'
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
          <nav className="hidden lg:flex justify-self-center items-center justify-center space-x-2.5 xl:space-x-5 2xl:space-x-7 px-1 xl:px-3 whitespace-nowrap">
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
                  className={`relative font-body text-[11px] xl:text-[12.5px] 2xl:text-[13px] font-bold tracking-[0.14em] xl:tracking-[0.2em] uppercase transition-colors duration-200 py-1.5 cursor-pointer group whitespace-nowrap flex items-center ${
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
          {/* RIGHT: Patron Account, Booking CTA & Responsive Menu                  */}
          {/* ===================================================================== */}
          <div className="justify-self-end flex items-center gap-2 sm:gap-3 whitespace-nowrap flex-shrink-0">
            
            {/* Desktop Patron Account Dropdown (Only >= lg when logged in) */}
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

                      <Link
                        to="/customer-dashboard?tab=appointments"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#10110F] hover:bg-[#F7F4ED] transition-colors"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#263D2B]" />
                        <span>My Appointments</span>
                      </Link>

                      <Link
                        to="/customer-dashboard?tab=profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#10110F] hover:bg-[#F7F4ED] transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-[#263D2B]" />
                        <span>Profile & Address</span>
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

            {/* Desktop Booking CTA (Only >= lg) */}
            <div className="hidden lg:block">
              <Link
                to="/book-appointment"
                className="global-button !px-4 xl:!px-6 !py-2.5 xl:!py-3 !text-[11px] xl:!text-[12.5px]"
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

        {/* Drawer Links */}
        <div className="flex-1 overflow-y-auto py-4 px-5 space-y-1">
          {[
            ...navLinks.slice(0, 3),
            { name: 'PRICE LIST', id: 'price-list', path: '/price-list' },
            ...navLinks.slice(3)
          ].map((link) => (
            <button
              key={link.name}
              onClick={() => handleMobileNav(link.path)}
              className={`w-full text-left py-2.5 px-3.5 rounded-xl font-body text-xs font-bold tracking-[0.16em] uppercase transition-all duration-200 flex items-center justify-between cursor-pointer ${
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
