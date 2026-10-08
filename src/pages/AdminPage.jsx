import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  Sparkles,
  Settings,
  LogOut,
  Globe,
  Menu,
  X,
  Lock,
  Key,
  Mail,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Star,
  Image as ImageIcon,
  MessageSquare,
  Tag,
  Users,
  Send
} from 'lucide-react';
import Logo from '../components/common/Logo';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminAppointments from '../components/admin/AdminAppointments';
import AdminServices from '../components/admin/AdminServices';
import AdminSettings from '../components/admin/AdminSettings';
import AdminReviews from '../components/admin/AdminReviews';
import AdminGallery from '../components/admin/AdminGallery';
import AdminContacts from '../components/admin/AdminContacts';
import AdminOffers from '../components/admin/AdminOffers';
import AdminNewsletter from '../components/admin/AdminNewsletter';
import AdminUsers from '../components/admin/AdminUsers';
import { ALL_SERVICES } from '../data/servicesData';
import salonDB from '../db/salonDatabase';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('glfy_admin_auth') === 'true';
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Dynamic Admin credentials from environment (.env)
  const envAdminEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@girlookedforyou.ca').trim();
  const envAdminPassword = (import.meta.env.VITE_ADMIN_PASSWORD || 'admin123').trim();
  const envAdminName = import.meta.env.VITE_ADMIN_NAME || 'Janki Khatroja';

  // Login form state
  const [emailInput, setEmailInput] = useState(envAdminEmail);
  const [passwordInput, setPasswordInput] = useState(envAdminPassword);
  const [loginError, setLoginError] = useState('');

  // Live database state
  const [appointments, setAppointments] = useState(() => salonDB.getAppointments());
  const [customServices, setCustomServices] = useState(() => salonDB.getServices());
  const [reviews, setReviews] = useState(() => salonDB.getReviews());

  // Subscribe to live database updates across tabs and bookings
  useEffect(() => {
    const syncAll = () => {
      setAppointments(salonDB.getAppointments());
      setCustomServices(salonDB.getServices());
      setReviews(salonDB.getReviews());
    };

    syncAll();
    const unsubscribe = salonDB.subscribe(() => {
      syncAll();
    });

    return () => unsubscribe();
  }, []);

  // Database operations
  const handleUpdateStatus = (id, newStatus) => {
    const updated = salonDB.updateAppointmentStatus(id, newStatus);
    setAppointments(updated);
  };

  const handleStartTreatment = (id) => {
    try {
      const updated = salonDB.startTreatment(id);
      setAppointments(updated);
      return { success: true };
    } catch (e) {
      console.error('Error starting treatment:', e);
      return { success: false, error: e.message || 'Unable to start treatment.' };
    }
  };

  const handleCompleteTreatment = (id) => {
    try {
      const updated = salonDB.completeTreatment(id);
      setAppointments(updated);
      return { success: true };
    } catch (e) {
      console.error('Error completing treatment:', e);
      return { success: false, error: e.message || 'Unable to complete treatment.' };
    }
  };

  const handleDeleteAppointment = (id) => {
    const updated = salonDB.deleteAppointment(id);
    setAppointments(updated);
  };

  const handleAddAppointment = (newBooking) => {
    salonDB.addAppointment(newBooking);
    setAppointments(salonDB.getAppointments());
  };

  const handleUpdateServices = (updatedList) => {
    localStorage.setItem('glfy_db_services', JSON.stringify(updatedList));
    localStorage.setItem('girl-looked-for-you-custom-services', JSON.stringify(updatedList));
    setCustomServices(updatedList);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('glfy_db_change', { detail: { event: 'services_updated', data: updatedList } }));
    }
  };

  // Login Handler with dynamic credentials
  const handleLogin = (e) => {
    e.preventDefault();
    const inputEmailClean = emailInput.trim().toLowerCase();
    const targetEmailClean = envAdminEmail.toLowerCase();

    if (
      (inputEmailClean === targetEmailClean || inputEmailClean === 'admin') &&
      passwordInput.trim() === envAdminPassword
    ) {
      sessionStorage.setItem('glfy_admin_auth', 'true');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError(`Invalid credentials. Check your configured .env credentials.`);
    }
  };

  const handleQuickDemoLogin = () => {
    setEmailInput(envAdminEmail);
    setPasswordInput(envAdminPassword);
    sessionStorage.setItem('glfy_admin_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('glfy_admin_auth');
    setIsAuthenticated(false);
  };

  // 1. LOGIN SCREEN (If not authenticated)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B090A] text-[#F7F1E8] flex items-center justify-center p-4 selection:bg-[#CFA46A] selection:text-[#0B090A]">
        {/* Subtle executive background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#CFA46A_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

        <div className="w-full max-w-md bg-[#130F11]/95 backdrop-blur-xl rounded-3xl border border-[#2B2227] shadow-2xl p-7 sm:p-10 space-y-6 relative overflow-hidden">
          {/* Subtle top gold accent glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#CFA46A]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center space-y-2 relative z-10">
            <div className="flex justify-center mb-3">
              <Logo variant="dark" size="default" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F171B] border border-[#CFA46A]/30 text-[#CFA46A] text-[10px] font-bold uppercase tracking-[0.2em]">
              <Lock className="w-3 h-3 text-[#CFA46A]" />
              <span>Executive Atelier Portal</span>
            </div>
            <h1 className="font-serif text-2xl font-normal text-white">Director Sign In</h1>
            <p className="text-white/50 text-xs font-sans">Enter studio credentials to manage bookings, services & operations.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 relative z-10 text-xs">
            <div>
              <label className="block text-white/70 font-medium mb-1.5 uppercase tracking-wider text-[10px]">Director Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="admin@girlookedforyou.ca"
                  className="w-full h-11 pl-10 pr-4 bg-[#1A1417] border border-[#2B2227] rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-[#CFA46A] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/70 font-medium mb-1.5 uppercase tracking-wider text-[10px]">Secure Password</label>
              <div className="relative">
                <Key className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-4 bg-[#1A1417] border border-[#2B2227] rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-[#CFA46A] transition-colors"
                />
              </div>
            </div>

            {loginError && (
              <p className="text-[11px] text-red-400 flex items-center gap-1.5 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 animate-fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </p>
            )}

            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-gradient-to-r from-[#CFA46A] via-[#E5C492] to-[#CFA46A] hover:from-[#E5C492] hover:to-[#CFA46A] text-[#0D0B0B] font-extrabold uppercase tracking-widest text-[11px] shadow-lg shadow-[#CFA46A]/20 active:scale-98 transition-all cursor-pointer"
            >
              Access Executive Suite
            </button>
          </form>

          {/* Quick Demo Access */}
          <div className="pt-4 border-t border-[#2B2227] text-center relative z-10 space-y-3">
            <button
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 px-4 rounded-xl bg-[#1A1417] hover:bg-[#241C20] text-white/80 text-xs font-semibold border border-[#2B2227] hover:border-[#CFA46A]/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#CFA46A]" />
              <span>1-Click Verified Demo Access</span>
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-[#CFA46A] text-xs transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED EXECUTIVE SUITE LAYOUT
  const unreadMessagesCount = salonDB.getContactMessages().filter(m => m.status === 'New').length;
  const subscribersCount = salonDB.getNewsletterSubscribers().length;
  const offersCount = salonDB.getActiveOffers().length;

  const navGroups = [
    {
      groupTitle: 'OPERATIONS',
      items: [
        { id: 'dashboard', name: 'Executive Overview', icon: LayoutDashboard },
        { id: 'appointments', name: 'Appointments Queue', icon: CalendarCheck, badge: appointments.length },
        { id: 'messages', name: 'Guest Inquiries', icon: MessageSquare, badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined, badgeColor: 'bg-amber-500/20 text-amber-300' },
      ]
    },
    {
      groupTitle: 'CATALOG & MEDIA',
      items: [
        { id: 'services', name: '72 Service Catalog', icon: Sparkles, badge: customServices.length },
        { id: 'reviews', name: 'Client Reviews', icon: Star, badge: reviews.length },
        { id: 'gallery', name: 'Radiance Archive', icon: ImageIcon },
      ]
    },
    {
      groupTitle: 'COMMERCE & ENGAGEMENT',
      items: [
        { id: 'offers', name: 'Offers & Promos', icon: Tag, badge: offersCount > 0 ? offersCount : undefined },
        { id: 'newsletter', name: 'Newsletter Audience', icon: Send, badge: subscribersCount > 0 ? subscribersCount : undefined },
      ]
    },
    {
      groupTitle: 'ADMINISTRATION',
      items: [
        { id: 'users', name: 'Users & Roles', icon: Users },
        { id: 'settings', name: 'Salon Settings', icon: Settings },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B090A] text-[#F7F1E8] flex flex-col md:flex-row selection:bg-[#CFA46A] selection:text-[#0B090A]">

      {/* Desktop Executive Sidebar (260px) */}
      <aside className="hidden md:flex md:w-64 lg:w-72 bg-[#100C0E] border-r border-[#241C20] flex-col justify-between p-5 lg:p-6 flex-shrink-0 min-h-screen sticky top-0 z-30">

        {/* Top: Brand Header & Categorized Nav */}
        <div className="space-y-6 overflow-y-auto pr-1">
          {/* Brand Header */}
          <div className="pb-4 border-b border-[#241C20]">
            <Logo variant="dark" size="default" />
            <div className="mt-2.5 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#CFA46A]">
                EXECUTIVE SUITE
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>
          </div>

          {/* Categorized Navigation */}
          <nav className="space-y-5">
            {navGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <div className="px-3 text-[9.5px] font-bold uppercase tracking-[0.22em] text-white/40 mb-1.5">
                  {group.groupTitle}
                </div>
                {group.items.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${isActive
                        ? 'bg-[#22181D] text-white border border-[#CFA46A]/50 shadow-sm shadow-[#CFA46A]/10 font-semibold'
                        : 'text-white/65 hover:text-white hover:bg-white/5 border border-transparent'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#CFA46A]' : 'text-white/40'}`} />
                        <span>{tab.name}</span>
                      </div>
                      {tab.badge !== undefined && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                          tab.badgeColor || (isActive ? 'bg-[#CFA46A] text-[#0B090A]' : 'bg-white/10 text-white/80')
                        }`}>
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom: Profile & Actions */}
        <div className="pt-4 border-t border-[#241C20] space-y-3">
          {/* Director profile tile */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#171114] border border-[#241C20]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#CFA46A] to-[#8C6430] flex items-center justify-center text-[#0B090A] font-bold text-xs">
              JK
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white truncate">{envAdminName}</div>
              <div className="text-[10px] text-[#CFA46A] truncate">Master Director</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/"
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-semibold text-white/70 hover:text-white bg-[#171114] hover:bg-[#20181C] border border-[#241C20] transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#CFA46A]" />
              <span>Public Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-semibold text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden bg-[#100C0E] border-b border-[#241C20] p-4 flex items-center justify-between sticky top-0 z-40">
        <Logo variant="dark" size="sm" />
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="p-2 rounded-xl bg-[#171114] border border-[#241C20] text-white hover:text-[#CFA46A] cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Mobile Sidebar Drawer */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative w-72 bg-[#100C0E] p-5 flex flex-col justify-between z-10 border-r border-[#241C20] overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#241C20]">
                <Logo variant="dark" size="sm" onClick={() => setIsMobileSidebarOpen(false)} />
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="space-y-4">
                {navGroups.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-1">
                    <div className="px-3 text-[9px] font-bold uppercase tracking-[0.22em] text-white/40 mb-1">
                      {group.groupTitle}
                    </div>
                    {group.items.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;

                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id);
                            setIsMobileSidebarOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${isActive
                            ? 'bg-[#22181D] text-white border border-[#CFA46A]/50 shadow-sm'
                            : 'text-white/65 hover:text-white hover:bg-white/5'
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-[#CFA46A]' : 'text-white/40'}`} />
                            <span>{tab.name}</span>
                          </div>
                          {tab.badge !== undefined && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-white/10 text-white/80">
                              {tab.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </nav>
            </div>

            <div className="pt-4 border-t border-[#241C20] space-y-2 mt-6">
              <Link
                to="/"
                className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white/70"
              >
                <Globe className="w-4 h-4 text-[#CFA46A]" />
                <span>View Public Website</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {activeTab === 'dashboard' && (
          <AdminDashboard
            appointments={appointments}
            onNavigateTab={setActiveTab}
            onOpenNewBookingModal={() => setActiveTab('appointments')}
            onStartTreatment={handleStartTreatment}
            onCompleteTreatment={handleCompleteTreatment}
          />
        )}

        {activeTab === 'appointments' && (
          <AdminAppointments
            appointments={appointments}
            onUpdateStatus={handleUpdateStatus}
            onStartTreatment={handleStartTreatment}
            onCompleteTreatment={handleCompleteTreatment}
            onDeleteAppointment={handleDeleteAppointment}
            onAddAppointment={handleAddAppointment}
          />
        )}

        {activeTab === 'reviews' && (
          <AdminReviews
            reviews={reviews}
            onUpdateReviews={() => setReviews(salonDB.getReviews())}
          />
        )}

        {activeTab === 'gallery' && (
          <AdminGallery />
        )}

        {activeTab === 'messages' && (
          <AdminContacts />
        )}

        {activeTab === 'offers' && (
          <AdminOffers />
        )}

        {activeTab === 'newsletter' && (
          <AdminNewsletter />
        )}

        {activeTab === 'users' && (
          <AdminUsers />
        )}

        {activeTab === 'services' && (
          <AdminServices
            customServices={customServices}
            onUpdateServices={handleUpdateServices}
          />
        )}

        {activeTab === 'settings' && (
          <AdminSettings />
        )}
      </main>

    </div>
  );
}
