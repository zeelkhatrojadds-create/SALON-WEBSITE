import React, { useState } from 'react';
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
  Star,
  Play,
  Timer,
  ShieldCheck,
  ChevronRight,
  Activity,
  Award
} from 'lucide-react';
import { ALL_SERVICES } from '../../data/servicesData';
import salonDB from '../../db/salonDatabase';
import TreatmentLiveTimer from './TreatmentLiveTimer';

export default function AdminDashboard({ 
  appointments = [], 
  onNavigateTab,
  onOpenNewBookingModal,
  onStartTreatment,
  onCompleteTreatment
}) {
  const [tableFilter, setTableFilter] = useState('All');
  const reviewStats = salonDB.getReviewStats();

  // Calculate metrics
  const totalBookings = appointments.length;
  
  const totalRevenue = appointments.reduce((sum, item) => {
    const price = Number(item.servicePrice) || 0;
    return sum + price;
  }, 0);

  const avgBookingValue = totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 0;

  const todayStr = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(a => a.date === todayStr);

  const inProgressList = appointments.filter(a => a.status === 'In Progress' || a.appointmentStatus === 'In Progress');
  const inProgressCount = inProgressList.length;
  const confirmedCount = appointments.filter(a => a.status === 'Appointment Request Confirmed' || a.status === 'Confirmed' || a.appointmentStatus === 'Confirmed').length;
  const pendingCount = appointments.filter(a => a.status === 'Pending' || a.status === 'In Review' || a.appointmentStatus === 'Pending').length;
  const completedCount = appointments.filter(a => a.status === 'Completed' || a.appointmentStatus === 'Completed').length;

  // Category breakdown
  const categoryStats = [
    { name: 'Hair Care & Balayage', key: 'hair', barColor: 'bg-[#CFA46A]' },
    { name: 'Facial & Skin Rituals', key: 'skin', barColor: 'bg-[#E5C492]' },
    { name: 'Nail Atelier & Gel', key: 'nails', barColor: 'bg-[#D4AF37]' },
    { name: 'Bridal & Haute Makeup', key: 'makeup', barColor: 'bg-[#B38F4D]' },
    { name: 'Spa & Wellness', key: 'spa', barColor: 'bg-[#8C6430]' },
    { name: 'Threading & Waxing', key: 'waxing', barColor: 'bg-[#6F5542]' },
  ].map(cat => {
    const count = appointments.filter(a => {
      const matchService = ALL_SERVICES.find(s => s.name === a.service || s.id === a.serviceId);
      return matchService ? matchService.category === cat.key : false;
    }).length;
    return { ...cat, count };
  });

  const filteredRecent = appointments.filter(b => {
    const status = b.status || b.appointmentStatus || 'Pending';
    if (tableFilter === 'All') return true;
    if (tableFilter === 'In Progress') return status === 'In Progress';
    if (tableFilter === 'Confirmed') return status === 'Confirmed' || status === 'Appointment Request Confirmed';
    if (tableFilter === 'Pending') return status === 'Pending' || status === 'In Review';
    if (tableFilter === 'Completed') return status === 'Completed';
    return true;
  }).slice(0, 6);

  return (
    <div className="space-y-6 sm:space-y-7 animate-fade-in text-[#F7F1E8]">
      
      {/* 1. TOP EXECUTIVE COMMAND HEADER */}
      <div className="bg-[#120E10] rounded-2xl p-6 sm:p-7 border border-[#261E22] shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#1D161A] border border-[#CFA46A]/30 text-[#CFA46A] text-[10px] font-bold uppercase tracking-[0.2em]">
              <Activity className="w-3 h-3 text-[#CFA46A]" />
              COMMAND CENTER
            </span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/50 text-xs font-mono">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-white tracking-tight">
            Executive Studio Operations
          </h1>
          <p className="text-white/60 text-xs sm:text-sm max-w-xl font-light">
            Real-time appointment schedule, revenue pipeline, guest satisfaction metrics, and live treatment telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <button
            onClick={() => onNavigateTab('appointments')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1D161A] hover:bg-[#281F24] text-white text-xs font-semibold border border-[#261E22] hover:border-[#CFA46A]/40 transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#CFA46A]" />
            <span>Full Schedule</span>
          </button>

          <button
            onClick={onOpenNewBookingModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#CFA46A] via-[#E5C492] to-[#CFA46A] hover:from-[#E5C492] hover:to-[#CFA46A] text-[#0D0B0B] font-extrabold text-xs uppercase tracking-wider shadow-md shadow-[#CFA46A]/20 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Booking</span>
          </button>
        </div>

        {/* Subtle ambient gradient highlight */}
        <div className="absolute right-0 top-0 w-72 h-72 bg-[#CFA46A]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      </div>

      {/* 2. LIVE IN-PROGRESS TREATMENT TELEMETRY BAR (If active) */}
      {inProgressCount > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#1C1412] via-[#221715] to-[#171012] border border-amber-500/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Timer className="w-5 h-5 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10.5px] font-bold text-amber-400 uppercase tracking-widest">
                  LIVE TREATMENT IN PROGRESS ({inProgressCount})
                </span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white truncate">
                {inProgressList[0]?.customerName} — <span className="text-[#CFA46A]">{inProgressList[0]?.service}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto flex-shrink-0">
            <TreatmentLiveTimer treatmentStartedAt={inProgressList[0]?.treatmentStartedAt} />
            {onCompleteTreatment && (
              <button
                type="button"
                onClick={() => onCompleteTreatment(inProgressList[0]?.id)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete Treatment</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* 3. FOUR KEY EXECUTIVE METRIC WIDGETS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Metric 1: Total Appointments */}
        <div className="bg-[#120E10] rounded-2xl p-5 border border-[#261E22] hover:border-[#CFA46A]/30 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold text-white/50 uppercase tracking-[0.16em]">Total Appointments</span>
            <div className="w-9 h-9 rounded-xl bg-[#1D161A] text-[#CFA46A] flex items-center justify-center border border-[#261E22]">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-normal font-serif text-white">{totalBookings}</div>
            <div className="text-[11px] text-white/50 mt-1 flex items-center gap-2">
              <span className="text-emerald-400 font-semibold">{confirmedCount} confirmed</span>
              <span>•</span>
              <span className="text-amber-400 font-semibold">{pendingCount} pending</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Pipeline Revenue */}
        <div className="bg-[#120E10] rounded-2xl p-5 border border-[#261E22] hover:border-[#CFA46A]/30 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold text-white/50 uppercase tracking-[0.16em]">Pipeline Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-[#1D161A] text-emerald-400 flex items-center justify-center border border-[#261E22]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-normal font-serif text-white">
              ${totalRevenue.toLocaleString()} <span className="text-xs font-sans text-white/50">CAD</span>
            </div>
            <div className="text-[11px] text-emerald-400/90 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Avg. ${avgBookingValue} CAD / booking</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Today's Schedule */}
        <div className="bg-[#120E10] rounded-2xl p-5 border border-[#261E22] hover:border-[#CFA46A]/30 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold text-white/50 uppercase tracking-[0.16em]">Today's Schedule</span>
            <div className="w-9 h-9 rounded-xl bg-[#1D161A] text-amber-400 flex items-center justify-center border border-[#261E22]">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-normal font-serif text-white">{todayAppointments.length}</div>
            <p className="text-[11px] text-white/50 mt-1">
              {todayAppointments.length === 0 ? 'No guests booked today' : `${todayAppointments.length} guest sessions scheduled`}
            </p>
          </div>
        </div>

        {/* Metric 4: Client Satisfaction */}
        <button
          onClick={() => onNavigateTab?.('reviews')}
          className="bg-[#120E10] hover:bg-[#171214] rounded-2xl p-5 border border-[#261E22] hover:border-[#CFA46A]/40 transition-all space-y-3 text-left cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold text-white/50 uppercase tracking-[0.16em]">Guest Ratings</span>
            <div className="w-9 h-9 rounded-xl bg-[#1D161A] text-[#CFA46A] flex items-center justify-center border border-[#261E22] group-hover:border-[#CFA46A]/40">
              <Star className="w-4 h-4 fill-current" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-normal font-serif text-white flex items-center gap-2">
              <span>{reviewStats.averageRating.toFixed(1)}</span>
              <span className="text-xs text-[#CFA46A] font-sans">/ 5.0 ★</span>
            </div>
            <p className="text-[11px] text-[#CFA46A]/80 mt-1 flex items-center justify-between">
              <span>{reviewStats.totalReviews} verified reviews</span>
              <ChevronRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
            </p>
          </div>
        </button>

      </div>

      {/* 4. MAIN SPLIT SECTION: RECENT APPOINTMENTS QUEUE & CATEGORY METRICS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Recent Bookings Queue (7 cols) */}
        <div className="lg:col-span-7 bg-[#120E10] rounded-2xl p-5 sm:p-6 border border-[#261E22] shadow-xl space-y-4">
          
          {/* Header & Filter Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#261E22]">
            <div>
              <h3 className="font-serif text-base sm:text-lg font-normal text-white">Live Appointments Queue</h3>
              <p className="text-white/50 text-xs font-light">Latest guest submissions and real-time status</p>
            </div>
            
            {/* Quick Status Filter Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#1A1417] border border-[#261E22]">
              {['All', 'Confirmed', 'Pending', 'In Progress'].map(f => (
                <button
                  key={f}
                  onClick={() => setTableFilter(f)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    tableFilter === f 
                      ? 'bg-[#261E22] text-[#CFA46A] shadow-xs' 
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Queue List */}
          {filteredRecent.length > 0 ? (
            <div className="space-y-2.5">
              {filteredRecent.map((booking) => {
                const status = booking.status || booking.appointmentStatus || 'Pending';
                const isInProgress = status === 'In Progress';
                const isConfirmed = status === 'Confirmed' || status === 'Appointment Request Confirmed';

                return (
                  <div 
                    key={booking.id}
                    className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isInProgress 
                        ? 'border-amber-500/40 bg-amber-500/[0.04]' 
                        : 'border-[#261E22] bg-[#171215] hover:border-[#CFA46A]/30'
                    }`}
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white text-xs sm:text-sm truncate">
                          {booking.customerName}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-white/60 border border-white/10 flex-shrink-0">
                          {booking.id}
                        </span>
                        {isInProgress && (
                          <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            <span>Active</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#CFA46A] truncate">
                        {booking.service} {booking.servicePrice ? `• $${booking.servicePrice} CAD` : ''}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/45">
                        <span>📅 {booking.date}</span>
                        <span>⏰ {booking.time}</span>
                        {isInProgress && (
                          <TreatmentLiveTimer 
                            treatmentStartedAt={booking.treatmentStartedAt}
                            compact
                          />
                        )}
                        {status === 'Completed' && booking.treatmentDuration && (
                          <span className="text-emerald-400 font-medium">✓ {booking.treatmentDuration}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
                      {isConfirmed && onStartTreatment && (
                        <button
                          type="button"
                          onClick={() => onStartTreatment(booking.id)}
                          className="px-2.5 py-1 rounded-lg bg-[#CFA46A] hover:bg-[#E5C492] text-[#0D0B0B] text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer"
                          title="Start Treatment"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Start</span>
                        </button>
                      )}

                      {isInProgress && onCompleteTreatment && (
                        <button
                          type="button"
                          onClick={() => onCompleteTreatment(booking.id)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer"
                          title="Complete Treatment"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Complete</span>
                        </button>
                      )}

                      <a
                        href={`https://wa.me/${String(booking.phone).replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${booking.customerName}! We have received your booking (${booking.id}) for ${booking.service} at GLAM GIRL BY JANKI.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/20 transition-all cursor-pointer"
                        title="WhatsApp Client"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </a>
                      
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider border ${
                        isInProgress
                          ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                          : status === 'Completed'
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20'
                          : status === 'Cancelled'
                          ? 'bg-red-500/15 text-red-300 border-red-500/20'
                          : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20'
                      }`}>
                        {status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 text-white/40 text-xs sm:text-sm font-light">
              No appointments match the current filter.
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => onNavigateTab('appointments')}
              className="text-xs font-semibold text-[#CFA46A] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Open Appointments Queue ({appointments.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Category Distribution & Record Index (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Category Distribution Card */}
          <div className="bg-[#120E10] rounded-2xl p-5 sm:p-6 border border-[#261E22] shadow-xl space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base sm:text-lg font-normal text-white">Treatment Demand</h3>
              <span className="text-[10.5px] text-white/50 uppercase tracking-wider">By Category</span>
            </div>

            <div className="space-y-3 pt-1">
              {categoryStats.map((cat) => (
                <div key={cat.key} className="space-y-1">
                  <div className="flex justify-between text-xs text-white/70">
                    <span>{cat.name}</span>
                    <span className="text-[#CFA46A] font-mono text-[11px]">{cat.count} bookings</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${cat.barColor} rounded-full transition-all duration-500`}
                      style={{ 
                        width: totalBookings > 0 
                          ? `${Math.max(6, (cat.count / totalBookings) * 100)}%` 
                          : '0%' 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Database Summary Grid */}
          <div className="bg-[#120E10] rounded-2xl p-5 sm:p-6 border border-[#261E22] shadow-xl space-y-3.5">
            <h3 className="font-serif text-base sm:text-lg font-normal text-white">Studio Repository Records</h3>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <button
                onClick={() => onNavigateTab('services')}
                className="p-3 rounded-xl bg-[#171215] hover:bg-[#1F181D] border border-[#261E22] text-left transition-colors cursor-pointer"
              >
                <span className="text-[10px] text-white/45 block font-mono uppercase tracking-wider">Service Catalog</span>
                <span className="text-base font-normal text-white font-serif">{ALL_SERVICES.length} Treatments</span>
              </button>

              <button
                onClick={() => onNavigateTab('messages')}
                className="p-3 rounded-xl bg-[#171215] hover:bg-[#1F181D] border border-[#261E22] text-left transition-colors cursor-pointer"
              >
                <span className="text-[10px] text-white/45 block font-mono uppercase tracking-wider">Inquiries</span>
                <span className="text-base font-normal text-[#CFA46A] font-serif">{salonDB.getContactMessages().length} Messages</span>
              </button>

              <button
                onClick={() => onNavigateTab('offers')}
                className="p-3 rounded-xl bg-[#171215] hover:bg-[#1F181D] border border-[#261E22] text-left transition-colors cursor-pointer"
              >
                <span className="text-[10px] text-white/45 block font-mono uppercase tracking-wider">Promotions</span>
                <span className="text-base font-normal text-emerald-400 font-serif">{salonDB.getActiveOffers().length} Active</span>
              </button>

              <button
                onClick={() => onNavigateTab('newsletter')}
                className="p-3 rounded-xl bg-[#171215] hover:bg-[#1F181D] border border-[#261E22] text-left transition-colors cursor-pointer"
              >
                <span className="text-[10px] text-white/45 block font-mono uppercase tracking-wider">VIP Newsletter</span>
                <span className="text-base font-normal text-amber-300 font-serif">{salonDB.getNewsletterSubscribers().length} Clients</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
