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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-extrabold uppercase tracking-wider bg-emerald-100 text-[#263D2B] border border-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            <span>In Progress</span>
          </div>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Completed</span>
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-red-50 text-red-700 border border-red-200">
            <XCircle className="w-3 h-3 text-red-500" />
            <span>Cancelled</span>
          </span>
        );
      case 'Pending':
      case 'In Review':
        return (
          <div className="space-y-0.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-[#F7F4ED] text-[#465640] border border-[#DCE1D8]">
              <Clock className="w-3 h-3 text-[#465640]" />
              <span>Pending</span>
            </span>
            {hasConflict && (
              <span className="block text-[9px] text-[#465640] font-semibold">
                ⚠️ Slot In Working Progress
              </span>
            )}
          </div>
        );
      default:
        return (
          <div className="space-y-0.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-emerald-50 text-[#263D2B] border border-emerald-200">
              <Check className="w-3 h-3 text-[#263D2B]" />
              <span>Confirmed</span>
            </span>
            {isAuto && (
              <span className="block text-[9px] text-[#263D2B] font-medium">
                ✨ Auto-Accepted
              </span>
            )}
          </div>
        );
    }
  };

  return (
    <div className="space-y-5 animate-fade-in text-[#10110F]">
      
      {/* Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#F7F4ED] border border-[#DCE1D8] text-[#263D2B] text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5">
            <Timer className="w-3 h-3 text-[#263D2B]" />
            <span>OPERATIONAL QUEUE</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#10110F] tracking-tight">Appointments Roster</h2>
          <p className="text-[#6B7068] text-xs sm:text-sm font-light">Monitor booking admissions, control live treatment timers, and dispatch review triggers.</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="global-button-secondary inline-flex items-center gap-1.5 !px-3.5 !py-2 text-xs font-semibold cursor-pointer shadow-xs"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="global-button inline-flex items-center gap-1.5 !px-4 !py-2 text-white text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Booking</span>
          </button>
        </div>
      </div>

      {/* Error alert banner */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center justify-between gap-3 text-xs animate-fade-in">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage('')}
            className="text-red-500 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-2xl p-4 border border-[#DCE1D8] shadow-sm space-y-3">
        {/* Status Pill Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pb-3 border-b border-[#DCE1D8]">
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
                    ? 'bg-[#263D2B] text-white shadow-xs'
                    : 'text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED] border border-transparent'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-white text-[#263D2B] font-bold' : 'bg-[#DCE1D8] text-[#10110F]'
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
            <Search className="w-4 h-4 text-[#6B7068] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client name, telephone, email, service, or Ref ID..."
              className="w-full h-10 pl-10 pr-4 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] placeholder-[#6B7068]/50 focus:outline-none focus:border-[#263D2B] transition-colors"
            />
          </div>

          {/* Date Filter */}
          <div className="sm:col-span-4 flex items-center gap-2">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full h-10 px-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B] transition-colors"
            />
            {dateFilter && (
              <button
                onClick={() => setDateFilter('')}
                className="px-2.5 h-10 rounded-xl bg-[#F7F4ED] hover:bg-white text-[#10110F] border border-[#DCE1D8] text-xs font-semibold transition-colors"
                title="Clear date filter"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Appointments Table / Cards Container */}
      <div className="bg-white rounded-2xl border border-[#DCE1D8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#DCE1D8] bg-[#F7F4ED] text-[#6B7068] uppercase text-[10px] tracking-wider">
                <th className="py-4 px-4 font-semibold">Booking Ref</th>
                <th className="py-4 px-4 font-semibold">Guest</th>
                <th className="py-4 px-4 font-semibold">Service</th>
                <th className="py-4 px-4 font-semibold">Schedule</th>
                <th className="py-4 px-4 font-semibold">Status & Live Timing</th>
                <th className="py-4 px-4 font-semibold text-right">Treatment Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE1D8]">
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
                      className={`hover:bg-[#F7F4ED]/50 transition-colors ${
                        isInProgress ? 'bg-emerald-50/40' : ''
                      }`}
                    >
                      {/* ID */}
                      <td className="py-4 px-4 font-mono font-bold text-[#263D2B] whitespace-nowrap">
                        <div className="flex flex-col">
                          <span>{booking.id}</span>
                          {isInProgress && (
                            <span className="text-[9px] text-[#263D2B] font-sans uppercase font-bold tracking-wider animate-pulse">
                              ● ACTIVE SESSION
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Guest Info */}
                      <td className="py-4 px-4 min-w-[140px]">
                        <div className="font-semibold text-[#10110F] text-xs">{booking.customerName}</div>
                        <div className="text-[#6B7068] text-[11px] font-mono">{booking.phone}</div>
                        {booking.email && (
                          <div className="text-[#6B7068] text-[10px] truncate max-w-[140px]" title={booking.email}>
                            {booking.email}
                          </div>
                        )}
                      </td>

                      {/* Service */}
                      <td className="py-4 px-4 min-w-[160px]">
                        <div className="font-medium text-[#10110F]">{booking.service}</div>
                        <div className="text-[#263D2B] text-[11px] font-semibold">
                          ${booking.servicePrice || 85} CAD • {booking.serviceDuration || '60 mins'}
                        </div>
                        {booking.notes && (
                          <div className="text-[#6B7068] italic text-[10px] truncate max-w-[180px] mt-0.5" title={booking.notes}>
                            "{booking.notes}"
                          </div>
                        )}
                      </td>

                      {/* Schedule */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="text-[#10110F] font-medium">📅 {booking.date}</div>
                        <div className="text-[#6B7068] text-[11px]">⏰ {booking.time}</div>
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
                                <div className="text-[10px] text-[#6B7068]">
                                  Started: {salonDB.formatTimeAMPM(booking.treatmentStartedAt, true)}
                                </div>
                              )}
                            </div>
                          )}

                          {/* COMPLETED TIMING SUMMARY */}
                          {isCompleted && (
                            <div className="mt-1 space-y-0.5 text-[11px] text-[#10110F] bg-[#F7F4ED] p-2 rounded-xl border border-[#DCE1D8]">
                              <div className="text-[9px] uppercase tracking-wider font-bold text-[#263D2B]">
                                Treatment Completed
                              </div>
                              {booking.treatmentDuration && (
                                <div className="font-mono text-xs font-bold text-[#263D2B]">
                                  Duration: {booking.treatmentDuration}
                                </div>
                              )}
                              {booking.treatmentStartedAt && (
                                <div className="text-[10px] text-[#6B7068]">
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
                              className="text-[10px] bg-white text-[#10110F] border border-[#DCE1D8] rounded-md px-1.5 py-0.5 focus:outline-none cursor-pointer"
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
                              className="global-button !px-4 !py-2 text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer flex items-center gap-1.5"
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
                              className="global-button !px-4 !py-2 text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer flex items-center gap-1.5"
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
                                className="global-button !px-3 !py-1.5 text-[11px] font-bold cursor-pointer flex items-center gap-1"
                                title="Approve booking and set to Confirmed"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Approve</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => onUpdateStatus(booking.id, 'Cancelled')}
                                className="global-button-danger !px-2.5 !py-1.5 text-[11px] font-bold cursor-pointer"
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
                              className="p-1.5 rounded-lg bg-emerald-50 hover:bg-[#263D2B] text-[#263D2B] hover:text-white border border-[#DCE1D8] transition-colors"
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
                              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 transition-colors cursor-pointer"
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
                  <td colSpan={6} className="py-12 text-center text-[#6B7068]">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-[#DCE1D8] rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE1D8]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#263D2B]" />
                <h3 className="font-serif font-bold text-[#10110F] text-lg">Add Manual Appointment</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-[#F7F4ED] flex items-center justify-center text-[#10110F] hover:bg-[#DCE1D8] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#10110F] font-semibold mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={newForm.customerName}
                  onChange={(e) => setNewForm({ ...newForm, customerName: e.target.value })}
                  placeholder="Full Name"
                  className="w-full h-10 px-3.5 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#10110F] font-semibold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newForm.phone}
                    onChange={(e) => setNewForm({ ...newForm, phone: e.target.value })}
                    placeholder="(613) 555-0182"
                    className="w-full h-10 px-3.5 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  />
                </div>
                <div>
                  <label className="block text-[#10110F] font-semibold mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    value={newForm.email}
                    onChange={(e) => setNewForm({ ...newForm, email: e.target.value })}
                    placeholder="guest@example.com"
                    className="w-full h-10 px-3.5 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#10110F] font-semibold mb-1">Select Service *</label>
                <select
                  value={newForm.serviceId}
                  onChange={(e) => setNewForm({ ...newForm, serviceId: e.target.value })}
                  className="w-full h-10 px-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-[#10110F] focus:outline-none focus:border-[#263D2B] cursor-pointer"
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
                  <label className="block text-[#10110F] font-semibold mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={newForm.date}
                    onChange={(e) => setNewForm({ ...newForm, date: e.target.value })}
                    className="w-full h-10 px-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  />
                </div>
                <div>
                  <label className="block text-[#10110F] font-semibold mb-1">Time Slot *</label>
                  <select
                    value={newForm.time}
                    onChange={(e) => setNewForm({ ...newForm, time: e.target.value })}
                    className="w-full h-10 px-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-[#10110F] focus:outline-none focus:border-[#263D2B] cursor-pointer"
                  >
                    {['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#10110F] font-semibold mb-1">Notes / Requests</label>
                <textarea
                  rows={2}
                  value={newForm.notes}
                  onChange={(e) => setNewForm({ ...newForm, notes: e.target.value })}
                  placeholder="Walk-in guest notes, special requests..."
                  className="w-full p-2.5 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-[#10110F] focus:outline-none focus:border-[#263D2B] resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="global-button-secondary !px-4 !py-2.5 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="global-button !px-6 !py-2.5 text-white font-bold uppercase tracking-wider shadow-md cursor-pointer"
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
