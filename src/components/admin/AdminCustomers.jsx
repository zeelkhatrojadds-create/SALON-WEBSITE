import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  Search,
  Filter,
  Eye,
  Calendar,
  Clock,
  Mail,
  Phone,
  MapPin,
  Star,
  FileText,
  Shield,
  ShieldAlert,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  X,
  Edit2,
  Trash2,
  Plus,
  Send,
  Download,
  UserCheck,
  UserX
} from 'lucide-react';
import { api } from '../../services/api';
import salonDB from '../../db/salonDatabase';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Selected customer for full drawer/modal
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [activeCustomerTab, setActiveCustomerTab] = useState('profile'); // 'profile' | 'appointments' | 'reviews' | 'notes' | 'requests'

  // Admin Note Input
  const [newNoteText, setNewNoteText] = useState('');

  // Edit Customer Profile
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    preferredName: '',
    phone: '',
    dateOfBirth: '',
    address: {
      street: '',
      city: '',
      province: '',
      postalCode: '',
      country: ''
    }
  });

  // Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadCustomers = () => {
    try {
      const list = salonDB.getCustomers();
      setCustomers(list);
      setLoading(false);
      // Keep selected customer in sync if open
      if (selectedCustomer) {
        const fresh = list.find((c) => c.id === selectedCustomer.id);
        if (fresh) setSelectedCustomer(fresh);
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
    const unsub = salonDB.subscribe(loadCustomers);
    return () => unsub();
  }, [selectedCustomer?.id]);

  // Filtered customers
  const filteredCustomers = useMemo(() => {
    let list = [...customers];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (c) =>
          (c.name && c.name.toLowerCase().includes(q)) ||
          (c.preferredName && c.preferredName.toLowerCase().includes(q)) ||
          (c.email && c.email.toLowerCase().includes(q)) ||
          (c.id && c.id.toLowerCase().includes(q)) ||
          (c.phone && c.phone.includes(q))
      );
    }

    if (statusFilter !== 'all') {
      list = list.filter((c) => (c.status || 'active').toLowerCase() === statusFilter.toLowerCase());
    }

    if (dateFilter !== 'all') {
      const now = new Date();
      list = list.filter((c) => {
        const regDate = new Date(c.createdAt);
        if (isNaN(regDate.getTime())) return true;
        const diffDays = (now - regDate) / (1000 * 3600 * 24);
        if (dateFilter === '7') return diffDays <= 7;
        if (dateFilter === '30') return diffDays <= 30;
        if (dateFilter === '90') return diffDays <= 90;
        if (dateFilter === 'year') return regDate.getFullYear() === now.getFullYear();
        return true;
      });
    }

    return list;
  }, [customers, searchQuery, statusFilter, dateFilter]);

  const handleOpenCustomer = (cust) => {
    setSelectedCustomer(cust);
    setActiveCustomerTab('profile');
    setIsEditingProfile(false);
    setEditFormData({
      name: cust.name || '',
      preferredName: cust.preferredName || '',
      phone: cust.phone || '',
      dateOfBirth: cust.dateOfBirth || '',
      address: {
        street: cust.address?.street || '',
        city: cust.address?.city || '',
        province: cust.address?.province || '',
        postalCode: cust.address?.postalCode || '',
        country: cust.address?.country || 'Canada'
      }
    });
  };

  const handleToggleStatus = async (cust) => {
    const nextStatus = cust.status === 'suspended' ? 'active' : 'suspended';
    try {
      await api.adminUpdateCustomerStatus(cust.id, nextStatus);
      showToast(`Customer account marked as ${nextStatus}.`);
    } catch (e) {
      showToast(e.message || 'Failed to update account status.', 'error');
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedCustomer) return;

    try {
      await api.adminAddCustomerNote(selectedCustomer.id, newNoteText.trim(), 'Executive Suite');
      setNewNoteText('');
      showToast('Internal patron note recorded.');
    } catch (e) {
      showToast(e.message || 'Failed to add note.', 'error');
    }
  };

  const handleSaveProfileEdits = async (e) => {
    e.preventDefault();
    if (!selectedCustomer) return;

    try {
      await api.adminUpdateCustomerProfile(selectedCustomer.id, editFormData);
      setIsEditingProfile(false);
      showToast('Patron profile updated successfully.');
    } catch (e) {
      showToast(e.message || 'Failed to save edits.', 'error');
    }
  };

  const handleProcessDataRequest = async (reqId, status) => {
    if (!selectedCustomer) return;
    try {
      await api.adminProcessDataRequest(selectedCustomer.id, reqId, status, 'Processed by Salon Executive');
      showToast(`Privacy request marked as ${status}.`);
    } catch (e) {
      showToast(e.message || 'Failed to process request.', 'error');
    }
  };

  const handleClearAllCustomers = () => {
    if (window.confirm('Are you sure you want to clear all customer accounts and bookings? This will wipe all customer profiles and appointments for a clean slate, preserving only administrator accounts.')) {
      const res = salonDB.wipeAllCustomersAndAppointments();
      if (res.success) {
        showToast('All customer records and appointments have been cleared.');
        loadCustomers();
        setSelectedCustomer(null);
      } else {
        showToast('Failed to clear customer records.', 'error');
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[130] max-w-sm p-4 rounded-2xl bg-white border border-[#DCE1D8] shadow-2xl flex items-center gap-3 animate-fade-in">
          {toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          ) : (
            <CheckCircle className="w-5 h-5 text-[#263D2B] shrink-0" />
          )}
          <span className="text-xs font-medium text-[#10110F]">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCE1D8]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#263D2B] block">
            PATRON DIRECTORY
          </span>
          <h2 className="font-serif text-2xl text-[#10110F] font-normal mt-0.5">
            Customer Account Management
          </h2>
          <p className="text-xs text-[#6B7068]">
            Manage verified client records, view individual booking journeys, monitor feedback, and process privacy requests.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="bg-white px-3.5 py-2 rounded-xl border border-[#DCE1D8] text-xs font-semibold text-[#10110F]">
            Total Patrons: <span className="font-mono text-[#263D2B] font-bold">{customers.length}</span>
          </div>

          <button
            onClick={handleClearAllCustomers}
            className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Wipe all customer records and test data"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All Customers</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#DCE1D8] shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7068]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, patron ID, email, or phone..."
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="suspended">Suspended Only</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="h-10 px-3 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
          >
            <option value="all">Registration: All Time</option>
            <option value="7">Registered in Past 7 Days</option>
            <option value="30">Registered in Past 30 Days</option>
            <option value="90">Registered in Past 90 Days</option>
            <option value="year">Registered This Year</option>
          </select>
        </div>
      </div>

      {/* Customers Table */}
      {filteredCustomers.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 border border-[#DCE1D8] text-center space-y-3">
          <Users className="w-10 h-10 text-[#6B7068] mx-auto opacity-40" />
          <h3 className="font-serif text-lg text-[#10110F]">No customers match your criteria</h3>
          <p className="text-xs text-[#6B7068]">Try broadening your search query or reset the filters.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#DCE1D8] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F4ED] border-b border-[#DCE1D8] text-[10px] font-bold uppercase tracking-wider text-[#6B7068]">
                <tr>
                  <th className="py-3 px-4">Patron ID</th>
                  <th className="py-3 px-4">Customer Name</th>
                  <th className="py-3 px-4">Contact Info</th>
                  <th className="py-3 px-4">Joined Date</th>
                  <th className="py-3 px-4">Bookings</th>
                  <th className="py-3 px-4">Total Spend</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCE1D8]">
                {filteredCustomers.map((cust) => {
                  const isSuspended = cust.status === 'suspended';
                  return (
                    <tr key={cust.id} className="hover:bg-[#F7F4ED]/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#10110F]">
                        {cust.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-serif text-sm text-[#10110F] font-semibold">
                          {cust.name}
                        </div>
                        {cust.preferredName && (
                          <div className="text-[11px] text-[#6B7068]">
                            Calls: "{cust.preferredName}"
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-[#6B7068]">
                        <div>{cust.email}</div>
                        <div className="font-mono text-[11px] text-[#10110F]">{cust.phone || '—'}</div>
                      </td>
                      <td className="py-3.5 px-4 text-[#6B7068]">
                        {new Date(cust.createdAt || Date.now()).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-mono font-bold text-[#10110F]">
                          {cust.totalBookings || 0} total
                        </div>
                        <div className="text-[10px] text-[#6B7068]">
                          {cust.completedCount || 0} done • {cust.cancelledCount || 0} canc
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-[#263D2B]">
                        ${cust.totalSpend || 0} CAD
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isSuspended
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {cust.status || 'active'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenCustomer(cust)}
                          className="global-button-secondary !py-1 !px-2.5 text-xs font-semibold cursor-pointer"
                        >
                          View Dossier
                        </button>
                        <button
                          onClick={() => handleToggleStatus(cust)}
                          className={`text-xs font-semibold cursor-pointer ${
                            isSuspended ? 'text-emerald-700 hover:underline' : 'text-red-600 hover:underline'
                          }`}
                        >
                          {isSuspended ? 'Activate' : 'Suspend'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CUSTOMER DETAILS DOSSIER DRAWER / MODAL                                   */}
      {/* ========================================================================= */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] border border-[#DCE1D8] shadow-2xl flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="p-6 bg-[#F7F4ED] border-b border-[#DCE1D8] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#263D2B] text-white flex items-center justify-center font-serif text-xl">
                  {selectedCustomer.name?.charAt(0) || 'P'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#263D2B]">
                      {selectedCustomer.id}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DCE1D8]" />
                    <span className="text-[10px] uppercase font-bold text-[#6B7068]">
                      {selectedCustomer.status || 'active'}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal">
                    {selectedCustomer.name}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="w-9 h-9 rounded-full bg-white border border-[#DCE1D8] text-[#10110F] hover:bg-[#DCE1D8] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Subnav Tabs */}
            <div className="flex border-b border-[#DCE1D8] bg-white overflow-x-auto">
              {[
                { id: 'profile', label: 'Patron Profile' },
                { id: 'appointments', label: `Appointments (${selectedCustomer.appointments?.length || 0})` },
                { id: 'reviews', label: `Reviews (${selectedCustomer.reviews?.length || 0})` },
                { id: 'notes', label: `Admin Notes (${selectedCustomer.adminNotes?.length || 0})` },
                { id: 'requests', label: `Data Requests (${selectedCustomer.dataRequests?.length || 0})` }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveCustomerTab(t.id)}
                  className={`py-3 px-5 text-xs font-bold uppercase tracking-wider text-center transition-colors cursor-pointer whitespace-nowrap ${
                    activeCustomerTab === t.id
                      ? 'border-b-2 border-[#263D2B] text-[#263D2B] bg-[#F7F4ED]/40'
                      : 'text-[#6B7068] hover:text-[#10110F]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              
              {/* TAB 1: PROFILE */}
              {activeCustomerTab === 'profile' && (
                <div className="space-y-6">
                  {!isEditingProfile ? (
                    <>
                      <div className="flex items-center justify-between pb-3 border-b border-[#DCE1D8]">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-[#10110F]">
                          Personal & Contact Details
                        </h4>
                        <button
                          onClick={() => setIsEditingProfile(true)}
                          className="global-button-secondary !py-1.5 !px-3 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit Permitted Fields</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                        <div>
                          <span className="text-[#6B7068] block">Full Name</span>
                          <span className="font-semibold text-[#10110F] block mt-0.5">{selectedCustomer.name}</span>
                        </div>
                        <div>
                          <span className="text-[#6B7068] block">Preferred Name</span>
                          <span className="font-semibold text-[#10110F] block mt-0.5">
                            {selectedCustomer.preferredName || '—'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#6B7068] block">Email Address</span>
                          <span className="font-semibold text-[#10110F] block mt-0.5">{selectedCustomer.email}</span>
                        </div>
                        <div>
                          <span className="text-[#6B7068] block">Phone Number</span>
                          <span className="font-semibold text-[#10110F] block mt-0.5">{selectedCustomer.phone || '—'}</span>
                        </div>
                        <div>
                          <span className="text-[#6B7068] block">Date of Birth</span>
                          <span className="font-semibold text-[#10110F] block mt-0.5">
                            {selectedCustomer.dateOfBirth || 'Not provided'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#6B7068] block">Preferred Contact Method</span>
                          <span className="font-semibold text-[#10110F] block mt-0.5 uppercase">
                            {selectedCustomer.preferences?.preferredContactMethod || 'email'}
                          </span>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="pt-4 border-t border-[#DCE1D8]">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-[#10110F] mb-3">
                          Address Dossier
                        </h4>
                        <div className="p-4 rounded-2xl bg-[#F7F4ED] text-xs space-y-1">
                          <div>
                            <span className="text-[#6B7068]">Street: </span>
                            <span className="font-semibold text-[#10110F]">{selectedCustomer.address?.street || '—'}</span>
                          </div>
                          <div>
                            <span className="text-[#6B7068]">City & Province: </span>
                            <span className="font-semibold text-[#10110F]">
                              {selectedCustomer.address?.city || 'Ottawa'}, {selectedCustomer.address?.province || 'ON'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[#6B7068]">Postal Code: </span>
                            <span className="font-semibold text-[#10110F]">{selectedCustomer.address?.postalCode || '—'}</span>
                          </div>
                          <div>
                            <span className="text-[#6B7068]">Country: </span>
                            <span className="font-semibold text-[#10110F]">{selectedCustomer.address?.country || 'Canada'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Consents */}
                      <div className="pt-4 border-t border-[#DCE1D8]">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-[#10110F] mb-3">
                          Marketing & Privacy Consents
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 rounded-xl border border-[#DCE1D8] flex items-center justify-between">
                            <span>Email Marketing Consent</span>
                            <span className={`font-bold ${selectedCustomer.preferences?.marketingEmailConsent ? 'text-[#263D2B]' : 'text-stone-400'}`}>
                              {selectedCustomer.preferences?.marketingEmailConsent ? 'Granted' : 'Declined'}
                            </span>
                          </div>
                          <div className="p-3 rounded-xl border border-[#DCE1D8] flex items-center justify-between">
                            <span>SMS Marketing Consent</span>
                            <span className={`font-bold ${selectedCustomer.preferences?.marketingSmsConsent ? 'text-[#263D2B]' : 'text-stone-400'}`}>
                              {selectedCustomer.preferences?.marketingSmsConsent ? 'Granted' : 'Declined'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <form onSubmit={handleSaveProfileEdits} className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-[#DCE1D8]">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-[#10110F]">
                          Edit Patron Profile
                        </h4>
                        <button
                          type="button"
                          onClick={() => setIsEditingProfile(false)}
                          className="text-xs text-[#6B7068] hover:underline"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-[#10110F] mb-1">Full Name</label>
                          <input
                            type="text"
                            required
                            value={editFormData.name}
                            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                            className="w-full h-10 px-3 rounded-xl border border-[#DCE1D8] text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#10110F] mb-1">Preferred Name</label>
                          <input
                            type="text"
                            value={editFormData.preferredName}
                            onChange={(e) => setEditFormData({ ...editFormData, preferredName: e.target.value })}
                            className="w-full h-10 px-3 rounded-xl border border-[#DCE1D8] text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-[#10110F] mb-1">Phone Number</label>
                          <input
                            type="tel"
                            value={editFormData.phone}
                            onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                            className="w-full h-10 px-3 rounded-xl border border-[#DCE1D8] text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#10110F] mb-1">Date of Birth</label>
                          <input
                            type="date"
                            value={editFormData.dateOfBirth}
                            onChange={(e) => setEditFormData({ ...editFormData, dateOfBirth: e.target.value })}
                            className="w-full h-10 px-3 rounded-xl border border-[#DCE1D8] text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#10110F] mb-1">Street Address</label>
                        <input
                          type="text"
                          value={editFormData.address.street}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              address: { ...editFormData.address, street: e.target.value }
                            })
                          }
                          className="w-full h-10 px-3 rounded-xl border border-[#DCE1D8] text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-[#10110F] mb-1">City</label>
                          <input
                            type="text"
                            value={editFormData.address.city}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                address: { ...editFormData.address, city: e.target.value }
                              })
                            }
                            className="w-full h-10 px-3 rounded-xl border border-[#DCE1D8] text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#10110F] mb-1">Province</label>
                          <input
                            type="text"
                            value={editFormData.address.province}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                address: { ...editFormData.address, province: e.target.value }
                              })
                            }
                            className="w-full h-10 px-3 rounded-xl border border-[#DCE1D8] text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#10110F] mb-1">Postal Code</label>
                          <input
                            type="text"
                            value={editFormData.address.postalCode}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                address: { ...editFormData.address, postalCode: e.target.value }
                              })
                            }
                            className="w-full h-10 px-3 rounded-xl border border-[#DCE1D8] text-xs"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsEditingProfile(false)}
                          className="global-button-secondary !py-2 !px-4 text-xs font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="global-button !py-2 !px-5 text-xs font-bold uppercase text-white shadow-md"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 2: APPOINTMENTS */}
              {activeCustomerTab === 'appointments' && (
                <div className="space-y-4">
                  {(!selectedCustomer.appointments || selectedCustomer.appointments.length === 0) ? (
                    <p className="text-xs text-[#6B7068] text-center py-6">No appointment records for this patron.</p>
                  ) : (
                    selectedCustomer.appointments.map((a) => (
                      <div
                        key={a.id}
                        className="p-4 rounded-2xl bg-white border border-[#DCE1D8] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[#10110F]">{a.referenceCode || a.id}</span>
                            <span>•</span>
                            <span className="text-[#6B7068]">{a.date} ({a.time || a.startTime})</span>
                          </div>
                          <h5 className="font-serif text-base text-[#10110F] mt-0.5">{a.service}</h5>
                          <span className="text-[11px] text-[#465640] font-medium block mt-0.5">
                            Payment Method: {a.paymentMethod || 'Cash on Delivery'}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-[#263D2B]">${a.servicePrice} CAD</span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#F7F4ED] border border-[#DCE1D8]">
                            {a.status || a.appointmentStatus || 'Pending'}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 3: REVIEWS */}
              {activeCustomerTab === 'reviews' && (
                <div className="space-y-4">
                  {(!selectedCustomer.reviews || selectedCustomer.reviews.length === 0) ? (
                    <p className="text-xs text-[#6B7068] text-center py-6">No reviews submitted by this customer.</p>
                  ) : (
                    selectedCustomer.reviews.map((r) => (
                      <div key={r.id} className="p-4 rounded-2xl bg-white border border-[#DCE1D8] space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-semibold text-sm text-[#10110F]">{r.service}</span>
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${
                                  s <= r.rating ? 'text-[#263D2B] fill-[#263D2B]' : 'text-[#DCE1D8]'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-[#10110F]">"{r.review}"</p>
                        <span className="text-[10px] text-[#6B7068] block">Date: {r.date}</span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 4: ADMIN NOTES */}
              {activeCustomerTab === 'notes' && (
                <div className="space-y-5">
                  <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-[11px] text-[#263D2B] flex items-center gap-2">
                    <Shield className="w-4 h-4 shrink-0 text-[#263D2B]" />
                    <span>Confidential internal notes. Only accessible to authenticated Salon Admins.</span>
                  </div>

                  {/* Add Note Form */}
                  <form onSubmit={handleAddNote} className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      placeholder="Add an internal note about client preferences, skin sensitivity, etc..."
                      className="flex-1 h-10 px-3.5 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                    />
                    <button
                      type="submit"
                      className="global-button !h-10 !px-4 text-xs font-bold uppercase text-white shadow-xs shrink-0"
                    >
                      Add Note
                    </button>
                  </form>

                  {/* Notes List */}
                  {(!selectedCustomer.adminNotes || selectedCustomer.adminNotes.length === 0) ? (
                    <p className="text-xs text-[#6B7068] text-center py-6">No administrative notes recorded.</p>
                  ) : (
                    <div className="space-y-3">
                      {selectedCustomer.adminNotes.map((note) => (
                        <div key={note.id} className="p-3.5 rounded-xl bg-white border border-[#DCE1D8] text-xs space-y-1">
                          <p className="text-[#10110F]">{note.note}</p>
                          <div className="flex items-center justify-between text-[10px] text-[#6B7068]">
                            <span>Author: {note.author}</span>
                            <span>{new Date(note.createdAt).toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: PRIVACY / DATA REQUESTS */}
              {activeCustomerTab === 'requests' && (
                <div className="space-y-4">
                  {(!selectedCustomer.dataRequests || selectedCustomer.dataRequests.length === 0) ? (
                    <p className="text-xs text-[#6B7068] text-center py-6">No data export or deletion requests submitted.</p>
                  ) : (
                    selectedCustomer.dataRequests.map((req) => (
                      <div
                        key={req.id}
                        className="p-4 rounded-2xl bg-white border border-[#DCE1D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs uppercase text-[#10110F]">
                              Request: {req.type}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-[#F7F4ED] border border-[#DCE1D8]">
                              {req.status}
                            </span>
                          </div>
                          {req.reason && <p className="text-[#6B7068] mt-1">Reason: {req.reason}</p>}
                          <span className="text-[10px] text-[#6B7068] block mt-0.5">
                            Requested: {new Date(req.requestedAt).toLocaleString()}
                          </span>
                        </div>

                        {req.status === 'pending_review' && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleProcessDataRequest(req.id, 'approved')}
                              className="global-button !py-1 !px-3 text-xs font-bold uppercase text-white shadow-xs"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleProcessDataRequest(req.id, 'rejected')}
                              className="global-button-secondary !py-1 !px-3 text-xs font-semibold text-red-600"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="p-4 bg-[#F7F4ED] border-t border-[#DCE1D8] flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="global-button-secondary !py-2 !px-5 text-xs font-semibold cursor-pointer"
              >
                Close Dossier
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
