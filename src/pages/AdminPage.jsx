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
      <div className="min-h-screen bg-[#F7F4ED] text-[#10110F] flex items-center justify-center p-4 selection:bg-[#263D2B] selection:text-white">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl p-7 sm:p-10 space-y-6 relative overflow-hidden">
          {/* Header */}
          <div className="text-center space-y-2 relative z-10">
            <div className="flex justify-center mb-3">
              <Logo variant="light" size="default" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[#263D2B] text-[10px] font-bold uppercase tracking-[0.2em]">
              <Lock className="w-3 h-3 text-[#263D2B]" />
              <span>Executive Atelier Portal</span>
            </div>
            <h1 className="font-serif text-2xl font-normal text-[#10110F]">Director Sign In</h1>
            <p className="text-[#6B7068] text-xs font-sans font-light">Enter studio credentials to manage bookings, services & operations.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 relative z-10 text-xs">
            <div>
              <label className="block text-[#10110F] font-bold mb-1.5 uppercase tracking-wider text-[10px]">Director Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#6B7068] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="admin@girlookedforyou.ca"
                  className="w-full h-11 pl-10 pr-4 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-[#10110F] placeholder-[#6B7068]/50 focus:outline-none focus:border-[#263D2B] focus:ring-1 focus:ring-[#263D2B] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#10110F] font-bold mb-1.5 uppercase tracking-wider text-[10px]">Secure Password</label>
              <div className="relative">
                <Key className="w-4 h-4 text-[#6B7068] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-4 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-[#10110F] placeholder-[#6B7068]/50 focus:outline-none focus:border-[#263D2B] focus:ring-1 focus:ring-[#263D2B] transition-colors"
                />
              </div>
            </div>

            {loginError && (
              <p className="text-[11px] text-red-600 flex items-center gap-1.5 p-2.5 rounded-lg bg-red-50 border border-red-200 animate-fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </p>
            )}

            <button
              type="submit"
              className="global-button w-full !h-11 text-white font-bold uppercase tracking-widest text-[11px] shadow-md cursor-pointer"
            >
              Access Executive Suite
            </button>
          </form>

          {/* Quick Demo Access */}
          <div className="pt-4 border-t border-[#DCE1D8] text-center relative z-10 space-y-3">
            <button
              onClick={handleQuickDemoLogin}
              className="global-button-secondary w-full !py-2.5 !px-4 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#263D2B]" />
              <span>1-Click Verified Demo Access</span>
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-[#6B7068] hover:text-[#10110F] text-xs transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#263D2B]" />
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
        { id: 'messages', name: 'Guest Inquiries', icon: MessageSquare, badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined, badgeColor: 'bg-[#263D2B]/15 text-[#263D2B]' },
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
    <div className="min-h-screen bg-[#F7F4ED] text-[#10110F] flex flex-col md:flex-row selection:bg-[#263D2B] selection:text-white">

      {/* Desktop Executive Sidebar (260px) */}
      <aside className="hidden md:flex md:w-64 lg:w-72 bg-white border-r border-[#DCE1D8] flex-col justify-between p-5 lg:p-6 flex-shrink-0 min-h-screen sticky top-0 z-30">

        {/* Top: Brand Header & Categorized Nav */}
        <div className="space-y-6 overflow-y-auto pr-1">
          {/* Brand Header */}
          <div className="pb-4 border-b border-[#DCE1D8]">
            <Logo variant="light" size="default" />
            <div className="mt-2.5 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B]">
                EXECUTIVE SUITE
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#263D2B]/10 border border-[#263D2B]/20 text-[#263D2B] text-[9px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B] animate-pulse" />
                Live
              </span>
            </div>
          </div>

          {/* Categorized Navigation */}
          <nav className="space-y-5">
            {navGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <div className="px-3 text-[9.5px] font-bold uppercase tracking-[0.22em] text-[#6B7068] mb-1.5">
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
                        ? 'bg-[#263D2B] text-white shadow-sm font-semibold'
                        : 'text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED] border border-transparent'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#6B7068]'}`} />
                        <span>{tab.name}</span>
                      </div>
                      {tab.badge !== undefined && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                          isActive ? 'bg-white text-[#263D2B]' : 'bg-[#DCE1D8] text-[#10110F]'
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
        <div className="pt-4 border-t border-[#DCE1D8] space-y-3">
          {/* Director profile tile */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8]">
            <div className="w-8 h-8 rounded-full bg-[#263D2B] flex items-center justify-center text-white font-bold text-xs">
              JK
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-[#10110F] truncate">{envAdminName}</div>
              <div className="text-[10px] text-[#263D2B] font-bold truncate">Master Director</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/"
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-semibold text-[#6B7068] hover:text-[#10110F] bg-[#F7F4ED] hover:bg-white border border-[#DCE1D8] transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>Public Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden bg-white border-b border-[#DCE1D8] p-4 flex items-center justify-between sticky top-0 z-40">
        <Logo variant="light" size="sm" />
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="p-2 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-[#10110F] hover:text-[#263D2B] cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Mobile Sidebar Drawer */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative w-72 bg-white p-5 flex flex-col justify-between z-10 border-r border-[#DCE1D8] overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCE1D8]">
                <Logo variant="light" size="sm" onClick={() => setIsMobileSidebarOpen(false)} />
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-center text-[#10110F]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="space-y-4">
                {navGroups.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-1">
                    <div className="px-3 text-[9px] font-bold uppercase tracking-[0.22em] text-[#6B7068] mb-1">
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
                            ? 'bg-[#263D2B] text-white shadow-xs'
                            : 'text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED]'
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#6B7068]'}`} />
                            <span>{tab.name}</span>
                          </div>
                          {tab.badge !== undefined && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                              isActive ? 'bg-white text-[#263D2B]' : 'bg-[#DCE1D8] text-[#10110F]'
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

            <div className="pt-4 border-t border-[#DCE1D8] space-y-2 mt-6">
              <Link
                to="/"
                className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#6B7068] hover:text-[#10110F]"
              >
                <Globe className="w-4 h-4 text-[#263D2B]" />
                <span>View Public Website</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:text-red-700"
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
