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
  Sparkles
} from 'lucide-react';
import { ALL_SERVICES } from '../../data/servicesData';
import { formatDisplayPhone } from '../../utils/whatsapp';

export default function AdminAppointments({
  appointments = [],
  onUpdateStatus,
  onDeleteAppointment,
  onAddAppointment
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

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

      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Confirmed' && (item.status === 'Confirmed' || item.status === 'Appointment Request Confirmed')) ||
        (statusFilter === 'Pending' && (item.status === 'Pending' || item.status === 'In Review')) ||
        (statusFilter === 'Completed' && item.status === 'Completed') ||
        (statusFilter === 'Cancelled' && item.status === 'Cancelled');

      const matchesDate = !dateFilter || item.date === dateFilter;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [appointments, searchQuery, statusFilter, dateFilter]);

  // Export to CSV
  const handleExportCSV = () => {
    if (appointments.length === 0) return;
    const headers = ['Booking ID', 'Customer Name', 'Phone', 'Email', 'Service', 'Price (CAD)', 'Date', 'Time', 'Status', 'Notes'];
    const rows = filteredAppointments.map(a => [
      `"${a.id || ''}"`,
      `"${a.customerName || ''}"`,
      `"${a.phone || ''}"`,
      `"${a.email || ''}"`,
      `"${a.service || ''}"`,
      `"${a.servicePrice || 85}"`,
      `"${a.date || ''}"`,
      `"${a.time || ''}"`,
      `"${a.status || 'Confirmed'}"`,
      `"${(a.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `girl_looked_for_you_appointments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateAppointment = (e) => {
    e.preventDefault();
    if (!newForm.customerName || !newForm.phone) return;

    const matchedService = ALL_SERVICES.find(s => s.id === newForm.serviceId) || ALL_SERVICES[0];
    const bookingId = `GLFY-${Math.floor(100000 + Math.random() * 900000)}`;

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
    const status = booking.status;
    const isAuto = booking.isAutoAccepted;
    const hasConflict = booking.slotConflict;

    switch (status) {
      case 'Completed':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">Completed</span>;
      case 'Cancelled':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/30">Cancelled</span>;
      case 'Pending':
      case 'In Review':
        return (
          <div className="space-y-0.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-block">
              Pending
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
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-block">
              Confirmed
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
    <div className="space-y-6 animate-fade-in">
      
      {/* Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Appointments Queue</h2>
          <p className="text-white/60 text-xs sm:text-sm">Manage bookings, update statuses, and message clients via WhatsApp.</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-brand-pink/30 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Booking</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-[#1C1418] rounded-2xl p-4 border border-white/10 shadow-lg grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Search */}
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client, phone, email, service, ID..."
            className="w-full h-10 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-brand-pink"
          />
        </div>

        {/* Status Filter */}
        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full h-10 px-3 bg-[#24151E] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-brand-pink cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Date Filter */}
        <div className="sm:col-span-3">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full h-10 px-3 bg-[#24151E] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-brand-pink"
          />
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-[#1C1418] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-white/60 uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Booking Ref</th>
                <th className="py-3.5 px-4 font-semibold">Guest</th>
                <th className="py-3.5 px-4 font-semibold">Service</th>
                <th className="py-3.5 px-4 font-semibold">Schedule</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((booking) => {
                  const cleanPhone = String(booking.phone).replace(/\D/g, '');
                  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                    `Hello ${booking.customerName}! This is Girl Looked For You Salon Ottawa confirming your appointment for ${booking.service} on ${booking.date} at ${booking.time}. (Ref: ${booking.id})`
                  )}`;

                  return (
                    <tr key={booking.id} className="hover:bg-white/[0.03] transition-colors">
                      {/* ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-brand-pink-light">
                        {booking.id}
                      </td>

                      {/* Guest Info */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{booking.customerName}</div>
                        <div className="text-white/50 text-[11px]">{booking.phone}</div>
                        {booking.email && <div className="text-white/40 text-[10px] truncate max-w-[140px]">{booking.email}</div>}
                      </td>

                      {/* Service */}
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-white">{booking.service}</div>
                        <div className="text-brand-gold-light text-[11px]">${booking.servicePrice || 85} CAD • {booking.serviceDuration || '60 mins'}</div>
                        {booking.notes && (
                          <div className="text-white/40 italic text-[10px] truncate max-w-[180px] mt-0.5" title={booking.notes}>
                            "{booking.notes}"
                          </div>
                        )}
                      </td>

                      {/* Schedule */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="text-white font-medium">📅 {booking.date}</div>
                        <div className="text-white/60 text-[11px]">⏰ {booking.time}</div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="space-y-1">
                          {getStatusBadge(booking)}
                          <select
                            value={booking.status === 'Appointment Request Confirmed' ? 'Confirmed' : (booking.status || 'Confirmed')}
                            onChange={(e) => onUpdateStatus(booking.id, e.target.value)}
                            className="block text-[10px] bg-[#24151E] text-white/80 border border-white/10 rounded-md px-1.5 py-0.5 focus:outline-none cursor-pointer mt-1"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Direct WhatsApp Client */}
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/20 transition-colors"
                            title="Direct WhatsApp Message to Guest"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          {/* Quick Mark Completed & Dispatch Review Popup */}
                          {booking.status !== 'Completed' ? (
                            <button
                              onClick={() => {
                                onUpdateStatus(booking.id, 'Completed');
                                if (typeof window !== 'undefined') {
                                  window.dispatchEvent(
                                    new CustomEvent('glfy_db_change', {
                                      detail: { event: 'appointment_completed', data: { ...booking, status: 'Completed' } }
                                    })
                                  );
                                }
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white border border-emerald-500/30 text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
                              title="Mark Treatment Finished & Open Review Popup for Client"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Finish & Request Review</span>
                            </button>
                          ) : (
                            <a
                              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                                `Hi ${booking.customerName}! Thank you for visiting Girl Looked For You Salon Ottawa for your ${booking.service}. We would love to hear your feedback! Please leave your review using your Booking ID: ${booking.id}`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500 text-purple-300 hover:text-white border border-purple-500/30 text-[10px] font-bold transition-colors flex items-center gap-1"
                              title="Send WhatsApp Review Invite with Booking ID"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>WhatsApp Invite</span>
                            </a>
                          )}

                          {/* Delete */}
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete appointment ${booking.id} for ${booking.customerName}?`)) {
                                onDeleteAppointment(booking.id);
                              }
                            }}
                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 transition-colors cursor-pointer"
                            title="Delete Appointment"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
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
                <Sparkles className="w-5 h-5 text-brand-pink" />
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
                  className="w-full h-10 px-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
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
                    className="w-full h-10 px-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                  />
                </div>
                <div>
                  <label className="block text-white/80 font-semibold mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    value={newForm.email}
                    onChange={(e) => setNewForm({ ...newForm, email: e.target.value })}
                    placeholder="guest@example.com"
                    className="w-full h-10 px-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 font-semibold mb-1">Select Service *</label>
                <select
                  value={newForm.serviceId}
                  onChange={(e) => setNewForm({ ...newForm, serviceId: e.target.value })}
                  className="w-full h-10 px-3 bg-[#24151E] border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink cursor-pointer"
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
                    className="w-full h-10 px-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                  />
                </div>
                <div>
                  <label className="block text-white/80 font-semibold mb-1">Time Slot *</label>
                  <select
                    value={newForm.time}
                    onChange={(e) => setNewForm({ ...newForm, time: e.target.value })}
                    className="w-full h-10 px-3 bg-[#24151E] border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink cursor-pointer"
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
                  className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink resize-none"
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
                  className="px-6 py-2.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white font-bold uppercase tracking-wider shadow-lg shadow-brand-pink/30 cursor-pointer"
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
