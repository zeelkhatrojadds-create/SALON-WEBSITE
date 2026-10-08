import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Trash2, 
  MessageCircle, 
  CheckCircle, 
  Clock, 
  XCircle, 
  ExternalLink,
  ChevronDown,
  Calendar,
  X,
  Sparkles,
  Play,
  CheckCircle2,
  AlertCircle,
  Timer,
  Check,
  RotateCcw
} from 'lucide-react';
import { ALL_SERVICES } from '../../data/servicesData';
import { formatDisplayPhone } from '../../utils/whatsapp';
import salonDB from '../../db/salonDatabase';
import TreatmentLiveTimer from './TreatmentLiveTimer';

export default function AdminAppointments({
  appointments = [],
  onUpdateStatus,
  onStartTreatment,
  onCompleteTreatment,
  onDeleteAppointment,
  onAddAppointment
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Loading & error states for treatment actions
  const [actionLoadingMap, setActionLoadingMap] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  // New appointment form state
  const [newForm, setNewForm] = useState({
    customerName: '',
    phone: '',
    email: '',
    serviceId: ALL_SERVICES[0]?.id || '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM',
    notes: ''
  });

  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (item.customerName && item.customerName.toLowerCase().includes(q)) ||
        (item.phone && item.phone.toLowerCase().includes(q)) ||
        (item.email && item.email.toLowerCase().includes(q)) ||
        (item.id && item.id.toLowerCase().includes(q)) ||
        (item.service && item.service.toLowerCase().includes(q));

      const status = item.status || item.appointmentStatus || 'Pending';

      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'In Progress' && status === 'In Progress') ||
        (statusFilter === 'Confirmed' && (status === 'Confirmed' || status === 'Appointment Request Confirmed')) ||
        (statusFilter === 'Pending' && (status === 'Pending' || status === 'In Review')) ||
        (statusFilter === 'Completed' && status === 'Completed') ||
        (statusFilter === 'Cancelled' && status === 'Cancelled');

      const matchesDate = !dateFilter || item.date === dateFilter;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [appointments, searchQuery, statusFilter, dateFilter]);

  // Handle Start Treatment Action
  const handleStartTreatmentClick = async (bookingId) => {
    if (actionLoadingMap[bookingId]) return;
    setErrorMessage('');
    setActionLoadingMap((prev) => ({ ...prev, [bookingId]: 'starting' }));

    try {
      const res = onStartTreatment ? await onStartTreatment(bookingId) : { success: true };
      if (res && res.success === false) {
        setErrorMessage(res.error || 'Unable to update treatment status. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Unable to update treatment status. Please try again.');
    } finally {
      setActionLoadingMap((prev) => {
        const next = { ...prev };
        delete next[bookingId];
        return next;
      });
    }
  };

  // Handle Complete Treatment Action
  const handleCompleteTreatmentClick = async (bookingId) => {
    if (actionLoadingMap[bookingId]) return;
    setErrorMessage('');
    setActionLoadingMap((prev) => ({ ...prev, [bookingId]: 'completing' }));

    try {
      const res = onCompleteTreatment ? await onCompleteTreatment(bookingId) : { success: true };
      if (res && res.success === false) {
        setErrorMessage(res.error || 'Unable to update treatment status. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Unable to update treatment status. Please try again.');
    } finally {
      setActionLoadingMap((prev) => {
        const next = { ...prev };
        delete next[bookingId];
        return next;
      });
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (appointments.length === 0) return;
    const headers = [
      'Booking ID', 
      'Customer Name', 
      'Phone', 
      'Email', 
      'Service', 
      'Price (CAD)', 
      'Date', 
      'Time', 
      'Status', 
      'Started At', 
      'Completed At', 
      'Duration',
      'Notes'
    ];

    const rows = filteredAppointments.map(a => [
      `"${a.id || ''}"`,
      `"${a.customerName || ''}"`,
      `"${a.phone || ''}"`,
      `"${a.email || ''}"`,
      `"${a.service || ''}"`,
      `"${a.servicePrice || 85}"`,
      `"${a.date || ''}"`,
      `"${a.time || ''}"`,
      `"${a.status || a.appointmentStatus || 'Confirmed'}"`,
      `"${a.treatmentStartedAt ? salonDB.formatTimeAMPM(a.treatmentStartedAt, true) : ''}"`,
      `"${a.treatmentCompletedAt ? salonDB.formatTimeAMPM(a.treatmentCompletedAt, true) : ''}"`,
      `"${a.treatmentDuration || ''}"`,
      `"${(a.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `glam_girl_appointments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateAppointment = (e) => {
    e.preventDefault();
    if (!newForm.customerName || !newForm.phone) return;

    const matchedService = ALL_SERVICES.find(s => s.id === newForm.serviceId) || ALL_SERVICES[0];
    const bookingId = `GGJ-${Math.floor(100000 + Math.random() * 900000)}`;

    const newBooking = {
      id: bookingId,
      customerName: newForm.customerName.trim(),
      phone: newForm.phone.trim(),
      email: newForm.email.trim(),
      service: matchedService.name,
      serviceId: matchedService.id,
      servicePrice: matchedService.price,
      serviceDuration: matchedService.duration,
      date: newForm.date,
      time: newForm.time,
      notes: newForm.notes.trim(),
      status: 'Confirmed',
      appointmentStatus: 'Confirmed',
      treatmentStartedAt: null,
      treatmentCompletedAt: null,
      treatmentDuration: null,
      submittedAt: new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })
    };

    onAddAppointment(newBooking);
    setShowAddModal(false);
    setNewForm({
      customerName: '',
      phone: '',
      email: '',
      serviceId: ALL_SERVICES[0]?.id || '',
      date: new Date().toISOString().split('T')[0],
      time: '10:00 AM',
      notes: ''
    });
  };

  const getStatusBadge = (booking) => {
    const status = booking.status || booking.appointmentStatus || 'Pending';
    const isAuto = booking.isAutoAccepted;
    const hasConflict = booking.slotConflict;

    switch (status) {
      case 'In Progress':
        return (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>In Progress</span>
          </div>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Completed</span>
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/30">
            <XCircle className="w-3 h-3 text-red-400" />
            <span>Cancelled</span>
          </span>
        );
      case 'Pending':
      case 'In Review':
        return (
          <div className="space-y-0.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>Pending</span>
            </span>
            {hasConflict && (
              <span className="block text-[9px] text-amber-400 font-semibold">
                ⚠️ Slot In Working Progress
              </span>
            )}
          </div>
        );
      default:
        return (
          <div className="space-y-0.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Check className="w-3 h-3 text-emerald-400" />
              <span>Confirmed</span>
            </span>
            {isAuto && (
              <span className="block text-[9px] text-emerald-400 font-medium">
                ✨ Auto-Accepted
              </span>
            )}
          </div>
        );
    }
  };

  return (
    <div className="space-y-5 animate-fade-in text-[#F7F1E8]">
      
      {/* Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#1D161A] border border-[#CFA46A]/30 text-[#CFA46A] text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5">
            <Timer className="w-3 h-3 text-[#CFA46A]" />
            <span>OPERATIONAL QUEUE</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white tracking-tight">Appointments Roster</h2>
          <p className="text-white/50 text-xs sm:text-sm font-light">Monitor booking admissions, control live treatment timers, and dispatch review triggers.</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#171215] hover:bg-[#20181D] text-white/80 hover:text-white text-xs font-semibold border border-[#261E22] transition-colors cursor-pointer"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5 text-[#CFA46A]" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#CFA46A] via-[#E5C492] to-[#CFA46A] hover:from-[#E5C492] hover:to-[#CFA46A] text-[#0D0B0B] text-xs font-extrabold uppercase tracking-wider shadow-md shadow-[#CFA46A]/20 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Booking</span>
          </button>
        </div>
      </div>

      {/* Error alert banner */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 flex items-center justify-between gap-3 text-xs animate-fade-in">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage('')}
            className="text-white/60 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter and Search Controls */}
      <div className="bg-[#120E10] rounded-2xl p-4 border border-[#261E22] shadow-xl space-y-3">
        {/* Status Pill Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pb-3 border-b border-[#261E22]">
          {[
            { id: 'All', label: 'All Bookings', count: appointments.length },
            { id: 'In Progress', label: '⚡ In Progress', count: appointments.filter(a => a.status === 'In Progress' || a.appointmentStatus === 'In Progress').length },
            { id: 'Confirmed', label: '✓ Confirmed', count: appointments.filter(a => a.status === 'Confirmed' || a.status === 'Appointment Request Confirmed' || a.appointmentStatus === 'Confirmed').length },
            { id: 'Pending', label: '⏳ Pending', count: appointments.filter(a => a.status === 'Pending' || a.status === 'In Review' || a.appointmentStatus === 'Pending').length },
            { id: 'Completed', label: '★ Completed', count: appointments.filter(a => a.status === 'Completed' || a.appointmentStatus === 'Completed').length },
            { id: 'Cancelled', label: '✕ Cancelled', count: appointments.filter(a => a.status === 'Cancelled' || a.appointmentStatus === 'Cancelled').length }
          ].map(tab => {
            const isSelected = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#261E22] text-[#CFA46A] border border-[#CFA46A]/40 shadow-xs'
                    : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-[#CFA46A] text-[#0D0B0B] font-bold' : 'bg-white/10 text-white/60'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Date Input Row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search */}
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client name, telephone, email, service, or Ref ID..."
              className="w-full h-10 pl-10 pr-4 bg-[#171215] border border-[#261E22] rounded-xl text-xs text-white placeholder-white/35 focus:outline-none focus:border-[#CFA46A] transition-colors"
            />
          </div>

          {/* Date Filter */}
          <div className="sm:col-span-4 flex items-center gap-2">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full h-10 px-3 bg-[#171215] border border-[#261E22] rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA46A] transition-colors"
            />
            {dateFilter && (
              <button
                onClick={() => setDateFilter('')}
                className="px-2.5 h-10 rounded-xl bg-[#261E22] hover:bg-[#33292E] text-white text-xs font-semibold transition-colors"
                title="Clear date filter"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Appointments Table / Cards Container */}
      <div className="bg-[#120E10] rounded-2xl border border-[#261E22] shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-white/60 uppercase text-[10px] tracking-wider">
                <th className="py-4 px-4 font-semibold">Booking Ref</th>
                <th className="py-4 px-4 font-semibold">Guest</th>
                <th className="py-4 px-4 font-semibold">Service</th>
                <th className="py-4 px-4 font-semibold">Schedule</th>
                <th className="py-4 px-4 font-semibold">Status & Live Timing</th>
                <th className="py-4 px-4 font-semibold text-right">Treatment Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((booking) => {
                  const status = booking.status || booking.appointmentStatus || 'Pending';
                  const isConfirmed = status === 'Confirmed' || status === 'Appointment Request Confirmed';
                  const isInProgress = status === 'In Progress';
                  const isCompleted = status === 'Completed';
                  const isPending = status === 'Pending' || status === 'In Review';
                  const isCancelled = status === 'Cancelled';

                  const loadingAction = actionLoadingMap[booking.id];

                  const cleanPhone = String(booking.phone).replace(/\D/g, '');
                  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                    `Hello ${booking.customerName}! This is GLAM GIRL BY JANKI Salon Ottawa regarding your appointment for ${booking.service} on ${booking.date} at ${booking.time}. (Ref: ${booking.id})`
                  )}`;

                  return (
                    <tr 
                      key={booking.id} 
                      className={`hover:bg-white/[0.03] transition-colors ${
                        isInProgress ? 'bg-amber-500/[0.04]' : ''
                      }`}
                    >
                      {/* ID */}
                      <td className="py-4 px-4 font-mono font-bold text-[#CFA46A] whitespace-nowrap">
                        <div className="flex flex-col">
                          <span>{booking.id}</span>
                          {isInProgress && (
                            <span className="text-[9px] text-amber-400 font-sans uppercase font-bold tracking-wider animate-pulse">
                              ● ACTIVE SESSION
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Guest Info */}
                      <td className="py-4 px-4 min-w-[140px]">
                        <div className="font-semibold text-white text-xs">{booking.customerName}</div>
                        <div className="text-white/60 text-[11px] font-mono">{booking.phone}</div>
                        {booking.email && (
                          <div className="text-white/40 text-[10px] truncate max-w-[140px]" title={booking.email}>
                            {booking.email}
                          </div>
                        )}
                      </td>

                      {/* Service */}
                      <td className="py-4 px-4 min-w-[160px]">
                        <div className="font-medium text-white">{booking.service}</div>
                        <div className="text-brand-gold-light text-[11px] font-semibold">
                          ${booking.servicePrice || 85} CAD • {booking.serviceDuration || '60 mins'}
                        </div>
                        {booking.notes && (
                          <div className="text-white/40 italic text-[10px] truncate max-w-[180px] mt-0.5" title={booking.notes}>
                            "{booking.notes}"
                          </div>
                        )}
                      </td>

                      {/* Schedule */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="text-white font-medium">📅 {booking.date}</div>
                        <div className="text-white/60 text-[11px]">⏰ {booking.time}</div>
                      </td>

                      {/* Status & Live Timing */}
                      <td className="py-4 px-4 min-w-[180px]">
                        <div className="space-y-2">
                          <div>{getStatusBadge(booking)}</div>

                          {/* IN PROGRESS LIVE TIMER */}
                          {isInProgress && (
                            <div className="mt-1.5 space-y-1">
                              <TreatmentLiveTimer 
                                treatmentStartedAt={booking.treatmentStartedAt} 
                              />
                              {booking.treatmentStartedAt && (
                                <div className="text-[10px] text-white/50">
                                  Started: {salonDB.formatTimeAMPM(booking.treatmentStartedAt, true)}
                                </div>
                              )}
                            </div>
                          )}

                          {/* COMPLETED TIMING SUMMARY */}
                          {isCompleted && (
                            <div className="mt-1 space-y-0.5 text-[11px] text-[#F7F1E8]/80 bg-white/5 p-2 rounded-xl border border-white/10">
                              <div className="text-[9px] uppercase tracking-wider font-bold text-emerald-400">
                                Treatment Completed
                              </div>
                              {booking.treatmentDuration && (
                                <div className="font-mono text-xs font-bold text-amber-200">
                                  Duration: {booking.treatmentDuration}
                                </div>
                              )}
                              {booking.treatmentStartedAt && (
                                <div className="text-[10px] text-white/50">
                                  Start: {salonDB.formatTimeAMPM(booking.treatmentStartedAt, false)}
                                  {booking.treatmentCompletedAt ? ` • End: ${salonDB.formatTimeAMPM(booking.treatmentCompletedAt, false)}` : ''}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Quick Status Override Dropdown */}
                          <div className="pt-1">
                            <select
                              value={booking.status === 'Appointment Request Confirmed' ? 'Confirmed' : (booking.status || 'Confirmed')}
                              onChange={(e) => onUpdateStatus(booking.id, e.target.value)}
                              className="text-[10px] bg-[#24151E] text-white/80 border border-white/10 rounded-md px-1.5 py-0.5 focus:outline-none cursor-pointer"
                            >
                              <option value="Confirmed">Set Confirmed</option>
                              <option value="In Progress">Set In Progress</option>
                              <option value="Pending">Set Pending</option>
                              <option value="Completed">Set Completed</option>
                              <option value="Cancelled">Set Cancelled</option>
                            </select>
                          </div>
                        </div>
                      </td>

                      {/* Treatment Actions */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="flex flex-col items-end gap-2">
                          
                          {/* 1. START TREATMENT BUTTON (Only when Confirmed) */}
                          {isConfirmed && (
                            <button
                              type="button"
                              onClick={() => handleStartTreatmentClick(booking.id)}
                              disabled={Boolean(loadingAction)}
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#CFA46A] via-[#E5C492] to-[#CFA46A] hover:from-[#E5C492] hover:to-[#CFA46A] text-[#0D0B0B] text-xs font-extrabold uppercase tracking-wider border border-[#E5C492]/50 shadow-md shadow-[#CFA46A]/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center gap-1.5"
                              title="Start treatment and activate live timer"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>{loadingAction === 'starting' ? 'Starting treatment...' : 'START TREATMENT'}</span>
                            </button>
                          )}

                          {/* 2. COMPLETE TREATMENT BUTTON (Only when In Progress) */}
                          {isInProgress && (
                            <button
                              type="button"
                              onClick={() => handleCompleteTreatmentClick(booking.id)}
                              disabled={Boolean(loadingAction)}
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-extrabold uppercase tracking-wider border border-emerald-400/50 shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center gap-1.5"
                              title="Complete treatment, record duration and enable review flow"
                            >
                              <CheckCircle2 className="w-4 h-4 text-white" />
                              <span>{loadingAction === 'completing' ? 'Completing treatment...' : 'COMPLETE TREATMENT'}</span>
                            </button>
                          )}

                          {/* 3. PENDING ACTIONS (Approve / Confirm) */}
                          {isPending && (
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => onUpdateStatus(booking.id, 'Confirmed')}
                                className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white border border-emerald-500/30 text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1"
                                title="Approve booking and set to Confirmed"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Approve</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => onUpdateStatus(booking.id, 'Cancelled')}
                                className="px-2.5 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 text-[11px] font-bold transition-all cursor-pointer"
                                title="Reject booking"
                              >
                                ✕
                              </button>
                            </div>
                          )}

                          {/* Secondary utility buttons: WhatsApp & Delete */}
                          <div className="flex items-center justify-end gap-1.5 mt-1">
                            {/* Direct WhatsApp Client */}
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/20 transition-colors"
                              title="Direct WhatsApp Message to Guest"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Delete appointment ${booking.id} for ${booking.customerName}?`)) {
                                  onDeleteAppointment(booking.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 transition-colors cursor-pointer"
                              title="Delete Appointment"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-white/50">
                    No appointments matched your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Add Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#1C1418] border border-white/15 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#CFA46A]" />
                <h3 className="font-serif font-bold text-white text-lg">Add Manual Appointment</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} className="space-y-4 text-xs">
              <div>
                <label className="block text-white/80 font-semibold mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={newForm.customerName}
                  onChange={(e) => setNewForm({ ...newForm, customerName: e.target.value })}
                  placeholder="Full Name"
                  className="w-full h-10 px-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#CFA46A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/80 font-semibold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newForm.phone}
                    onChange={(e) => setNewForm({ ...newForm, phone: e.target.value })}
                    placeholder="(613) 555-0182"
                    className="w-full h-10 px-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#CFA46A]"
                  />
                </div>
                <div>
                  <label className="block text-white/80 font-semibold mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    value={newForm.email}
                    onChange={(e) => setNewForm({ ...newForm, email: e.target.value })}
                    placeholder="guest@example.com"
                    className="w-full h-10 px-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#CFA46A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 font-semibold mb-1">Select Service *</label>
                <select
                  value={newForm.serviceId}
                  onChange={(e) => setNewForm({ ...newForm, serviceId: e.target.value })}
                  className="w-full h-10 px-3 bg-[#24151E] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#CFA46A] cursor-pointer"
                >
                  {ALL_SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} (${s.price} CAD • {s.duration})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/80 font-semibold mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={newForm.date}
                    onChange={(e) => setNewForm({ ...newForm, date: e.target.value })}
                    className="w-full h-10 px-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#CFA46A]"
                  />
                </div>
                <div>
                  <label className="block text-white/80 font-semibold mb-1">Time Slot *</label>
                  <select
                    value={newForm.time}
                    onChange={(e) => setNewForm({ ...newForm, time: e.target.value })}
                    className="w-full h-10 px-3 bg-[#24151E] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#CFA46A] cursor-pointer"
                  >
                    {['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/80 font-semibold mb-1">Notes / Requests</label>
                <textarea
                  rows={2}
                  value={newForm.notes}
                  onChange={(e) => setNewForm({ ...newForm, notes: e.target.value })}
                  placeholder="Walk-in guest notes, special requests..."
                  className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#CFA46A] resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#CFA46A] hover:bg-[#E5C492] text-[#0D0B0B] font-bold uppercase tracking-wider shadow-lg shadow-[#CFA46A]/20 cursor-pointer"
                >
                  Save Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
