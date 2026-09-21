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
  AlertCircle
} from 'lucide-react';
import Logo from '../components/common/Logo';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminAppointments from '../components/admin/AdminAppointments';
import AdminServices from '../components/admin/AdminServices';
import AdminSettings from '../components/admin/AdminSettings';
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

  // Subscribe to live database updates across tabs and bookings
  useEffect(() => {
    setAppointments(salonDB.getAppointments());
    setCustomServices(salonDB.getServices());

    const unsubscribe = salonDB.subscribe(() => {
      setAppointments(salonDB.getAppointments());
      setCustomServices(salonDB.getServices());
    });

    return () => unsubscribe();
  }, []);

  // Database operations
  const handleUpdateStatus = (id, newStatus) => {
    const updated = salonDB.updateAppointmentStatus(id, newStatus);
    setAppointments(updated);
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
      <div className="min-h-screen bg-[#140E11] text-white flex items-center justify-center p-4 selection:bg-brand-pink selection:text-white">
        <div className="w-full max-w-md bg-[#1C1418] rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-10 space-y-6 relative overflow-hidden">
          
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          {/* Logo & Header */}
          <div className="text-center space-y-2 relative z-10">
            <div className="flex justify-center mb-2">
              <Logo variant="dark" size="default" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-pink/15 border border-brand-pink/30 text-brand-pink-light text-[10px] font-bold uppercase tracking-wider">
              <Lock className="w-3 h-3 text-brand-pink" />
              <span>Studio Management Portal</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-white">Staff Login</h1>
            <p className="text-white/60 text-xs">Enter credentials to manage bookings & services.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 relative z-10 text-xs">
            <div>
              <label className="block text-white/80 font-semibold mb-1">Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="admin@girlookedforyou.ca"
                  className="w-full h-11 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-brand-pink"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 font-semibold mb-1">Password</label>
              <div className="relative">
                <Key className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-brand-pink"
                />
              </div>
            </div>

            {loginError && (
              <p className="text-[11px] text-red-400 flex items-center gap-1 animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{loginError}</span>
              </p>
            )}

            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-brand-pink hover:bg-brand-pink-hover text-white font-bold uppercase tracking-wider shadow-lg shadow-brand-pink/30 active:scale-98 transition-all cursor-pointer"
            >
              Sign In to Portal
            </button>
          </form>

          {/* Quick 1-Click Demo Login */}
          <div className="pt-2 border-t border-white/10 text-center relative z-10 space-y-3">
            <button
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white/90 text-xs font-semibold border border-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>1-Click Demo Access</span>
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>← Back to Public Website</span>
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED ADMIN DASHBOARD LAYOUT
  const navTabs = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', name: 'Appointments', icon: CalendarCheck, badge: appointments.length },
    { id: 'services', name: '86 Treatments', icon: Sparkles },
    { id: 'settings', name: 'WhatsApp & Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#140E11] text-white flex flex-col md:flex-row selection:bg-brand-pink selection:text-white">
      
      {/* Desktop Sidebar (Left: 260px) */}
      <aside className="hidden md:flex md:w-64 lg:w-72 bg-[#1C1418] border-r border-white/10 flex-col justify-between p-5 lg:p-6 flex-shrink-0 min-h-screen sticky top-0">
        
        {/* Top: Logo & Nav */}
        <div className="space-y-6">
          <div className="pb-4 border-b border-white/10">
            <Logo variant="dark" size="default" />
            <div className="mt-2 text-[11px] font-semibold text-brand-pink-muted uppercase tracking-wider">
              Management Portal
            </div>
          </div>

          {/* Nav Tab Links */}
          <nav className="space-y-1.5">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-brand-pink text-white shadow-lg shadow-brand-pink/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </div>
                  {tab.badge !== undefined && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-brand-pink-light'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Back to Website & Logout */}
        <div className="pt-6 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Globe className="w-4 h-4 text-brand-pink" />
            <span>View Live Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>

      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden bg-[#1C1418] border-b border-white/10 p-4 flex items-center justify-between sticky top-0 z-40">
        <Logo variant="dark" size="sm" />
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="p-2 rounded-xl bg-white/10 text-white hover:text-brand-pink cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Mobile Sidebar Drawer */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative w-72 bg-[#1C1418] p-5 flex flex-col justify-between z-10 border-r border-white/10">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <Logo variant="dark" size="sm" />
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="space-y-1.5">
                {navTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-brand-pink text-white shadow-lg shadow-brand-pink/30'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{tab.name}</span>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <Link
                to="/"
                className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white/70"
              >
                <Globe className="w-4 h-4 text-brand-pink" />
                <span>View Live Website</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {activeTab === 'dashboard' && (
          <AdminDashboard
            appointments={appointments}
            onNavigateTab={setActiveTab}
            onOpenNewBookingModal={() => setActiveTab('appointments')}
          />
        )}

        {activeTab === 'appointments' && (
          <AdminAppointments
            appointments={appointments}
            onUpdateStatus={handleUpdateStatus}
            onDeleteAppointment={handleDeleteAppointment}
            onAddAppointment={handleAddAppointment}
          />
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
