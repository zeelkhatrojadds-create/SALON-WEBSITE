import React from 'react';
import { 
  Calendar, 
  DollarSign, 
  Users, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight,
  MessageCircle,
  Plus,
  Star
} from 'lucide-react';
import { ALL_SERVICES } from '../../data/servicesData';
import salonDB from '../../db/salonDatabase';

export default function AdminDashboard({ 
  appointments = [], 
  onNavigateTab,
  onOpenNewBookingModal 
}) {
  const reviewStats = salonDB.getReviewStats();

  // Calculate metrics
  const totalBookings = appointments.length;
  
  const totalRevenue = appointments.reduce((sum, item) => {
    const price = Number(item.servicePrice) || 0;
    return sum + price;
  }, 0);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(a => a.date === todayStr);

  const confirmedCount = appointments.filter(a => a.status === 'Appointment Request Confirmed' || a.status === 'Confirmed').length;
  const pendingCount = appointments.filter(a => a.status === 'Pending' || a.status === 'In Review').length;
  const completedCount = appointments.filter(a => a.status === 'Completed').length;

  // Category breakdown
  const categoryStats = [
    { name: 'Hair Care', key: 'hair', color: 'bg-rose-500' },
    { name: 'Skin Care', key: 'skin', color: 'bg-amber-500' },
    { name: 'Nail Care', key: 'nails', color: 'bg-pink-500' },
    { name: 'Bridal & Makeup', key: 'makeup', color: 'bg-purple-500' },
    { name: 'Spa & Wellness', key: 'spa', color: 'bg-emerald-500' },
    { name: 'Waxing & Extras', key: 'waxing', color: 'bg-blue-500' },
  ].map(cat => {
    const count = appointments.filter(a => {
      const matchService = ALL_SERVICES.find(s => s.name === a.service || s.id === a.serviceId);
      return matchService ? matchService.category === cat.key : false;
    }).length;
    return { ...cat, count };
  });

  const recentBookings = [...appointments].slice(0, 5);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      
      {/* Top Welcome & Quick Action Banner */}
      <div className="bg-gradient-to-r from-[#24151E] via-[#2F1B27] to-[#1C1217] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative z-10 space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink/20 border border-brand-pink/30 text-brand-pink-light text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
            <span>Ottawa Studio Hub</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Salon Executive Dashboard
          </h1>
          <p className="text-[#F2ECE4]/70 text-xs sm:text-sm max-w-xl">
            Real-time appointment schedule, revenue overview, guest ratings, and studio communications.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <button
            onClick={onOpenNewBookingModal}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-pink/30 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Appointment</span>
          </button>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-brand-pink/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      </div>

      {/* 4 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Metric 1: Total Appointments */}
        <div className="bg-[#1C1418] rounded-2xl p-5 border border-white/10 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Total Bookings</span>
            <div className="w-10 h-10 rounded-xl bg-brand-pink/15 text-brand-pink flex items-center justify-center border border-brand-pink/20">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-white">{totalBookings}</div>
            <p className="text-[11px] text-white/50 mt-1 flex items-center gap-1">
              <span className="text-emerald-400 font-semibold">{confirmedCount} confirmed</span> • {pendingCount} pending
            </p>
          </div>
        </div>

        {/* Metric 2: Est. Revenue */}
        <div className="bg-[#1C1418] rounded-2xl p-5 border border-white/10 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Pipeline Revenue</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-white">${totalRevenue.toLocaleString()} <span className="text-xs font-normal text-white/60">CAD</span></div>
            <p className="text-[11px] text-emerald-400/90 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Based on selected service values</span>
            </p>
          </div>
        </div>

        {/* Metric 3: Today's Schedule */}
        <div className="bg-[#1C1418] rounded-2xl p-5 border border-white/10 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Today's Guests</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-white">{todayAppointments.length}</div>
            <p className="text-[11px] text-white/50 mt-1">
              {todayAppointments.length === 0 ? 'No appointments today' : 'Scheduled for today'}
            </p>
          </div>
        </div>

        {/* Metric 4: Real-time Reviews Rating */}
        <button
          onClick={() => onNavigateTab?.('reviews')}
          className="bg-[#1C1418] hover:bg-[#251A20] rounded-2xl p-5 border border-white/10 hover:border-brand-gold/40 shadow-xl space-y-3 text-left transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Client Reviews</span>
            <div className="w-10 h-10 rounded-xl bg-brand-gold/15 text-brand-gold flex items-center justify-center border border-brand-gold/20">
              <Star className="w-5 h-5 fill-current" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-white flex items-center gap-2">
              <span>{reviewStats.averageRating.toFixed(1)}</span>
              <span className="text-xs text-brand-gold font-normal">/ 5.0 ★</span>
            </div>
            <p className="text-[11px] text-brand-gold-light mt-1 flex items-center justify-between">
              <span>{reviewStats.totalReviews} verified reviews</span>
              <span className="text-[10px] text-white/50">Manage →</span>
            </p>
          </div>
        </button>

      </div>

      {/* Main Grid: Recent Bookings & Category Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Recent Bookings Table (7 cols) */}
        <div className="lg:col-span-7 bg-[#1C1418] rounded-3xl p-5 sm:p-6 border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="font-serif font-bold text-white text-base sm:text-lg">Recent Booking Requests</h3>
              <p className="text-white/50 text-xs">Latest online and offline guest submissions</p>
            </div>
            <button
              onClick={() => onNavigateTab('appointments')}
              className="text-xs font-semibold text-brand-pink hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View All</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {recentBookings.length > 0 ? (
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-pink/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-xs sm:text-sm truncate">
                        {booking.customerName}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-pink/20 text-brand-pink-light border border-brand-pink/30 flex-shrink-0">
                        {booking.id}
                      </span>
                    </div>
                    <p className="text-xs text-brand-gold-light truncate">
                      {booking.service} {booking.servicePrice ? `• $${booking.servicePrice} CAD` : ''}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-white/50">
                      <span>📅 {booking.date}</span>
                      <span>⏰ {booking.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
                    <a
                      href={`https://wa.me/${String(booking.phone).replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${booking.customerName}! We have received your booking (${booking.id}) for ${booking.service} at Girl Looked For You.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/20 transition-all cursor-pointer"
                      title="WhatsApp Client"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {booking.status || 'Confirmed'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-white/50 text-xs sm:text-sm">
              No appointments in the queue yet. New bookings submitted on the website will appear here in real-time.
            </div>
          )}
        </div>

        {/* Right: Category Distribution & Quick Links (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Category Distribution Card */}
          <div className="bg-[#1C1418] rounded-3xl p-5 sm:p-6 border border-white/10 shadow-xl space-y-4">
            <h3 className="font-serif font-bold text-white text-base sm:text-lg">Category Popularity</h3>
            <div className="space-y-3">
              {categoryStats.map((cat) => (
                <div key={cat.key} className="space-y-1">
                  <div className="flex justify-between text-xs text-white/80 font-medium">
                    <span>{cat.name}</span>
                    <span className="text-brand-gold-light">{cat.count} bookings</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                      style={{ 
                        width: totalBookings > 0 
                          ? `${Math.max(8, (cat.count / totalBookings) * 100)}%` 
                          : '0%' 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Help / Ottawa Studio Concierge Notice */}
          <div className="bg-gradient-to-br from-[#291722] to-[#1C1217] rounded-3xl p-5 sm:p-6 border border-brand-pink/20 shadow-xl space-y-3">
            <h4 className="font-serif font-bold text-white text-sm sm:text-base flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-pink" />
              <span>Direct WhatsApp Sync Active</span>
            </h4>
            <p className="text-xs text-[#F2ECE4]/70 leading-relaxed">
              Every client booking dispatched through the online booking form automatically opens a pre-formatted WhatsApp chat to the configured studio number.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
