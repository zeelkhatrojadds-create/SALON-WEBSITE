import React, { useState, useMemo } from 'react';
import {
  Search,
  Sliders,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Calendar,
  Eye,
  MessageSquare,
  Sparkles,
  X,
  Image as ImageIcon,
  CheckCircle2,
  DollarSign,
  UserCheck
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';

export default function AdminCustomRequests({
  onRefresh
}) {
  const currentUser = salonDB.getCurrentUser();
  const isAuthorizedAdmin = currentUser && (currentUser.role === 'admin' || currentUser.email === 'admin@girlookedforyou.ca');

  const [requests, setRequests] = useState(() => salonDB.getCustomRequests());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Review modal form state
  const [reviewForm, setReviewForm] = useState({
    status: 'Under Review',
    approvedPrice: '',
    approvedDuration: '',
    salonNotes: ''
  });
  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');

  // Synchronize with database
  const refreshList = () => {
    const fresh = salonDB.getCustomRequests();
    setRequests(fresh);
    if (onRefresh) onRefresh();
  };

  // Filter requests
  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        req.id.toLowerCase().includes(q) ||
        (req.customerName && req.customerName.toLowerCase().includes(q)) ||
        (req.customerEmail && req.customerEmail.toLowerCase().includes(q)) ||
        (req.customerPhone && req.customerPhone.toLowerCase().includes(q)) ||
        (req.serviceName && req.serviceName.toLowerCase().includes(q)) ||
        (req.categoryName && req.categoryName.toLowerCase().includes(q)) ||
        (req.occasion && req.occasion.toLowerCase().includes(q));

      const reqStatus = (req.status || 'Submitted').toLowerCase();
      const filterLower = statusFilter.toLowerCase();

      let matchesStatus = false;
      if (statusFilter === 'All') {
        matchesStatus = true;
      } else if (filterLower === 'submitted') {
        matchesStatus = reqStatus === 'submitted' || reqStatus === 'pending';
      } else {
        matchesStatus = reqStatus === filterLower;
      }

      return matchesSearch && matchesStatus;
    });
  }, [requests, searchQuery, statusFilter]);

  // Counts by status
  const counts = useMemo(() => {
    return {
      all: requests.length,
      submitted: requests.filter(r => r.status === 'Submitted' || r.status === 'Pending').length,
      underReview: requests.filter(r => r.status === 'Under Review').length,
      awaitingCustomer: requests.filter(r => r.status === 'Awaiting Customer Response').length,
      quoteProvided: requests.filter(r => r.status === 'Quote Provided').length,
      approved: requests.filter(r => r.status === 'Approved').length,
      converted: requests.filter(r => r.status === 'Converted to Booking').length,
      declined: requests.filter(r => r.status === 'Declined').length,
      cancelled: requests.filter(r => r.status === 'Cancelled').length
    };
  }, [requests]);

  // Open review modal
  const handleOpenReview = (req) => {
    setSelectedRequest(req);
    const defaultPrice = req.approvedPrice !== null && req.approvedPrice !== undefined 
      ? req.approvedPrice 
      : (req.calculatedEstimatedPrice || req.catalogPrice || '');
    const defaultDur = req.approvedDuration || (req.calculatedEstimatedDuration ? `${req.calculatedEstimatedDuration} min` : req.catalogDuration || '');

    setReviewForm({
      status: req.status || 'Under Review',
      approvedPrice: defaultPrice,
      approvedDuration: defaultDur,
      salonNotes: req.salonNotes || ''
    });
    setActionSuccess('');
    setActionError('');
  };

  // Submit review update
  const handleSaveReview = (e, overrideStatus = null) => {
    if (e) e.preventDefault();
    if (!selectedRequest) return;

    try {
      const finalStatus = overrideStatus || reviewForm.status;
      const parsedPrice = reviewForm.approvedPrice !== '' ? parseFloat(reviewForm.approvedPrice) : null;
      
      salonDB.updateCustomRequestStatus(
        selectedRequest.id,
        finalStatus,
        reviewForm.salonNotes,
        parsedPrice,
        reviewForm.approvedDuration
      );

      setActionSuccess(`Custom request ${selectedRequest.id} updated to “${finalStatus}”.`);
      refreshList();
      setTimeout(() => {
        setSelectedRequest(null);
        setActionSuccess('');
      }, 1200);
    } catch (err) {
      setActionError(err.message || 'Failed to update request.');
    }
  };

  // Quick Action: Ask for Clarification
  const handleAskClarification = () => {
    if (!reviewForm.salonNotes.trim()) {
      setActionError('Please enter your question/clarification note to the customer below.');
      return;
    }
    handleSaveReview(null, 'Awaiting Customer Response');
  };

  // Quick Action: Send Quote for Approval
  const handleSendQuote = () => {
    if (!reviewForm.approvedPrice) {
      setActionError('Please enter the approved quote price before sending.');
      return;
    }
    handleSaveReview(null, 'Quote Provided');
  };

  // Convert approved request to live appointment in queue
  const handleConvertToAppointment = () => {
    if (!selectedRequest) return;

    try {
      const parsedPrice = reviewForm.approvedPrice !== '' ? parseFloat(reviewForm.approvedPrice) : (selectedRequest.calculatedEstimatedPrice || selectedRequest.catalogPrice || 85);
      const dur = reviewForm.approvedDuration || (selectedRequest.calculatedEstimatedDuration ? `${selectedRequest.calculatedEstimatedDuration} min` : selectedRequest.catalogDuration || '60 min');

      salonDB.addAppointment({
        id: `GGJ-APPT-${Math.floor(100000 + Math.random() * 900000)}`,
        customRequestId: selectedRequest.id,
        serviceId: selectedRequest.serviceId,
        service: selectedRequest.serviceName,
        servicePrice: parsedPrice,
        serviceDuration: dur,
        date: selectedRequest.preferredDate || new Date().toISOString().split('T')[0],
        time: selectedRequest.preferredTime || '11:00 AM',
        customerName: selectedRequest.customerName || 'Bespoke Client',
        customerPhone: selectedRequest.customerPhone || '',
        customerEmail: selectedRequest.customerEmail || '',
        notes: `[Custom Experience #${selectedRequest.id}]\nVision: ${selectedRequest.customerVision}\nResult: ${selectedRequest.desiredResult || 'Bespoke finish'}\nAvoid: ${selectedRequest.thingsToAvoid || 'None'}\nSensitivities: ${selectedRequest.sensitivities || 'None'}\nNotes: ${reviewForm.salonNotes || 'Approved by Salon'}`,
        status: 'Confirmed',
        approvalNote: 'Approved bespoke customization request converted to scheduled appointment.'
      });

      // Mark request as Converted to Booking
      salonDB.updateCustomRequestStatus(selectedRequest.id, 'Converted to Booking', reviewForm.salonNotes, parsedPrice, dur);
      setActionSuccess(`✓ Request converted into a Confirmed Appointment in the appointments queue.`);
      refreshList();
      setTimeout(() => {
        setSelectedRequest(null);
        setActionSuccess('');
      }, 1500);
    } catch (err) {
      setActionError('Error converting to appointment: ' + err.message);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Submitted':
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Submitted</span>
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
            <Eye className="w-3 h-3 text-blue-600" />
            <span>Under Review</span>
          </span>
        );
      case 'Quote Provided':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
            <DollarSign className="w-3 h-3 text-emerald-600" />
            <span>Quote Provided</span>
          </span>
        );
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#263D2B]/10 text-[#263D2B] border border-[#263D2B]/30 font-semibold">
            <CheckCircle className="w-3 h-3 text-[#263D2B]" />
            <span>Approved</span>
          </span>
        );
      case 'Converted to Booking':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#263D2B] text-[#F7F4ED] font-semibold">
            <UserCheck className="w-3 h-3 text-white" />
            <span>Booked</span>
          </span>
        );
      case 'Declined':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-50 text-rose-800 border border-rose-200">
            <XCircle className="w-3 h-3 text-rose-600" />
            <span>Declined</span>
          </span>
        );
      case 'Awaiting Customer Response':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-50 text-purple-800 border border-purple-200">
            <MessageSquare className="w-3 h-3 text-purple-600" />
            <span>Awaiting Patron</span>
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gray-100 text-gray-700 border border-gray-300">
            <span>Cancelled</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gray-100 text-gray-700">
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-[#DCE1D8] p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-[#263D2B]/10 text-[#263D2B]">
              <Sliders className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-serif text-[#10110F]">
              All-Service Customization Studio Management
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#465640]">
            Review, quote, approve, and convert client requests submitted across all 85 services in the catalog.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={refreshList}
            className="px-4 py-2 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] hover:bg-white text-xs font-semibold text-[#10110F] transition-colors"
          >
            Refresh Queue ({requests.length})
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white rounded-2xl border border-[#DCE1D8] p-4 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'All', label: 'All Requests', count: counts.all },
              { id: 'Submitted', label: 'Submitted', count: counts.submitted },
              { id: 'Under Review', label: 'Under Review', count: counts.underReview },
              { id: 'Awaiting Customer Response', label: 'Awaiting Patron', count: counts.awaitingCustomer },
              { id: 'Quote Provided', label: 'Quoted', count: counts.quoteProvided },
              { id: 'Approved', label: 'Approved', count: counts.approved },
              { id: 'Converted to Booking', label: 'Booked', count: counts.converted },
              { id: 'Declined', label: 'Declined', count: counts.declined },
              { id: 'Cancelled', label: 'Cancelled', count: counts.cancelled }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                  statusFilter === tab.id
                    ? 'bg-[#263D2B] text-white shadow-xs'
                    : 'bg-[#F7F4ED] text-[#465640] hover:bg-[#EBEFE8]'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  statusFilter === tab.id ? 'bg-white/20 text-white' : 'bg-white text-[#263D2B]'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A8B5A0]" />
            <input
              type="text"
              placeholder="Search patron, service, ID, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B]/30"
            />
          </div>
        </div>
      </div>

      {/* Requests Table */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#DCE1D8] p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#263D2B]/10 text-[#263D2B] mx-auto flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h4 className="font-serif text-lg text-[#10110F]">No Custom Requests in this View</h4>
          <p className="text-xs text-[#6B7068] max-w-md mx-auto">
            {searchQuery
              ? `No requests matched “${searchQuery}”. Try clearing your search.`
              : `All customization requests under “${statusFilter}” have been processed.`}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#DCE1D8] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#DCE1D8] bg-[#F7F4ED]/60 text-[#465640] uppercase tracking-wider text-[10px] font-bold">
                  <th className="py-3.5 px-4">Request ID & Date</th>
                  <th className="py-3.5 px-4">Patron Details</th>
                  <th className="py-3.5 px-4">Service & Baseline</th>
                  <th className="py-3.5 px-4">Add-Ons & Requests</th>
                  <th className="py-3.5 px-4">Customer Vision</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCE1D8]/60">
                {filteredRequests.map(req => {
                  const photosCount = (req.inspirationPhotos?.length) || (req.inspirationPhoto ? 1 : 0);
                  const addOnsCount = req.selectedAddons?.length || 0;
                  return (
                    <tr key={req.id} className="hover:bg-[#F7F4ED]/30 transition-colors">
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-mono font-bold text-[#10110F]">{req.id}</div>
                        <div className="text-[10px] text-[#6B7068]">
                          {new Date(req.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#10110F]">{req.customerName || 'Anonymous'}</div>
                        <div className="text-[11px] text-[#465640]">{req.customerEmail}</div>
                        <div className="text-[11px] text-[#6B7068]">{req.customerPhone}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-serif font-bold text-[#10110F]">{req.serviceName}</div>
                        <div className="text-[11px] text-[#263D2B]">
                          Base: ${req.catalogPrice} CAD • {req.catalogDuration}
                        </div>
                        <div className="text-[10px] text-[#6B7068]">
                          Dept: {req.categoryName || req.category}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex flex-col gap-1">
                          {addOnsCount > 0 && (
                            <span className="text-[10px] font-bold text-[#263D2B] bg-[#263D2B]/10 px-2 py-0.5 rounded-full inline-block w-fit">
                              +{addOnsCount} Add-on{addOnsCount > 1 ? 's' : ''}
                            </span>
                          )}
                          {req.customAddonRequest && (
                            <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full inline-block w-fit">
                              Unlisted Request
                            </span>
                          )}
                          {photosCount > 0 && (
                            <span className="text-[10px] text-[#465640] flex items-center gap-1">
                              <ImageIcon className="w-3 h-3 text-[#263D2B]" />
                              <span>{photosCount} photo{photosCount > 1 ? 's' : ''}</span>
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="line-clamp-2 text-[#465640] italic leading-relaxed">
                          “{req.customerVision || 'No detailed vision specified'}”
                        </p>
                        {req.thingsToAvoid && (
                          <div className="text-[10px] text-rose-800 font-medium truncate mt-0.5">
                            Avoid: {req.thingsToAvoid}
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="space-y-1">
                          {getStatusBadge(req.status)}
                          {req.customerQuoteDecision === 'accepted' && (
                            <div className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 w-fit">
                              Quote Accepted
                            </div>
                          )}
                          {req.customerQuoteDecision === 'declined' && (
                            <div className="text-[10px] font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200 w-fit">
                              Quote Declined
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleOpenReview(req)}
                          className="px-3 py-1.5 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-[#F7F4ED] text-xs font-semibold shadow-xs transition-colors"
                        >
                          Review & Quote
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

      {/* DETAILED REVIEW & APPROVAL MODAL */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden my-6">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#DCE1D8] flex items-center justify-between bg-[#F7F4ED]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#263D2B]">
                    Customization Request #{selectedRequest.id}
                  </span>
                  {getStatusBadge(selectedRequest.status)}
                </div>
                <h3 className="text-xl font-serif text-[#10110F]">
                  Review Bespoke Vision: {selectedRequest.serviceName}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="p-2 rounded-xl text-[#6B7068] hover:text-[#10110F] hover:bg-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Scrollable */}
            <div className="p-6 overflow-y-auto space-y-6">
              {actionSuccess && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{actionSuccess}</span>
                </div>
              )}

              {actionError && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{actionError}</span>
                </div>
              )}

              {/* Customer Quote Decision Banner */}
              {selectedRequest.customerQuoteDecision === 'accepted' && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-semibold flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold text-sm">Quote Accepted by Customer</div>
                      <div className="text-[11px] text-emerald-800 font-normal mt-0.5">
                        Customer accepted approved quote of ${selectedRequest.approvedPrice} CAD ({selectedRequest.approvedDuration}). You can convert this directly to an appointment in queue.
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleConvertToAppointment}
                    className="px-4 py-2 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-white text-xs font-bold shadow-xs transition-colors shrink-0"
                  >
                    Convert to Booking
                  </button>
                </div>
              )}

              {selectedRequest.customerQuoteDecision === 'declined' && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 text-xs flex items-center gap-2.5">
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <div>
                    <div className="font-bold text-sm">Quote Declined by Customer</div>
                    <div className="text-[11px] text-rose-800 font-normal mt-0.5">
                      The customer declined the proposed quote. Revise price, duration, or notes below and click “Send Quote for Approval” to submit a revised quote.
                    </div>
                  </div>
                </div>
              )}

              {/* Patron & Appointment Info Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#F7F4ED]/60 border border-[#DCE1D8] text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#465640] block">
                    Patron Contact
                  </span>
                  <div className="font-semibold text-sm text-[#10110F] mt-1">
                    {selectedRequest.customerName}
                  </div>
                  <div className="text-[#465640] mt-0.5">{selectedRequest.customerEmail}</div>
                  <div className="text-[#465640]">{selectedRequest.customerPhone || 'No phone'}</div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#465640] block">
                    Target Appointment Slot & Occasion
                  </span>
                  <div className="font-semibold text-[#10110F] mt-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#263D2B]" />
                    <span>{selectedRequest.preferredDate || 'Flexible date'} at {selectedRequest.preferredTime || 'Flexible time'}</span>
                  </div>
                  <div className="text-[#263D2B] font-medium mt-0.5">
                    Occasion: {selectedRequest.occasion || 'Everyday beauty'} {selectedRequest.eventDate ? `(Event date: ${selectedRequest.eventDate})` : ''}
                  </div>
                  {selectedRequest.consultationRequested && (
                    <div className="text-[11px] font-bold text-amber-800 mt-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-800" />
                      <span>Requested pre-service 1-on-1 consultation</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Customer Exact Requirements Box */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#465640] mb-1.5">
                    1. Patron's Exact Vision & Requirements
                  </h4>
                  <div className="p-4 rounded-2xl bg-white border border-[#DCE1D8] shadow-xs text-xs text-[#10110F] leading-relaxed whitespace-pre-line italic">
                    “{selectedRequest.customerVision || 'No detailed vision specified.'}”
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#465640] mb-1.5">
                      Desired Final Result
                    </h4>
                    <div className="p-3.5 rounded-2xl bg-white border border-[#DCE1D8] text-xs text-[#10110F]">
                      {selectedRequest.desiredResult || 'Standard salon outcome.'}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#465640] mb-1.5">
                      Focus Areas & Preferences
                    </h4>
                    <div className="p-3.5 rounded-2xl bg-white border border-[#DCE1D8] text-xs text-[#10110F]">
                      {selectedRequest.focusAreas || selectedRequest.preferredStyle || 'Overall precision service.'}
                    </div>
                  </div>
                </div>

                {/* Things to Avoid & Sensitivities */}
                {(selectedRequest.thingsToAvoid || selectedRequest.sensitivities) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedRequest.thingsToAvoid && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 mb-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Things to Avoid (Strict Constraints)</span>
                        </h4>
                        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-950 font-medium">
                          {selectedRequest.thingsToAvoid}
                        </div>
                      </div>
                    )}
                    {selectedRequest.sensitivities && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                          <span>Allergies / Sensitivities / Restrictions</span>
                        </h4>
                        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-medium">
                          {selectedRequest.sensitivities}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Add-ons Breakdown */}
                {((selectedRequest.selectedAddons && selectedRequest.selectedAddons.length > 0) || selectedRequest.customAddonRequest) && (
                  <div className="p-4 rounded-2xl bg-[#F7F4ED]/60 border border-[#DCE1D8] space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#465640]">
                      Add-Ons & Custom Extensions
                    </h4>
                    {selectedRequest.selectedAddons?.map(a => (
                      <div key={a.id} className="flex items-center justify-between text-xs py-1 border-b border-[#DCE1D8]/40 last:border-0">
                        <span className="font-medium text-[#10110F]">{a.name}</span>
                        <span className="font-bold text-[#263D2B]">+${a.price} CAD (+{a.durationMinutes} min)</span>
                      </div>
                    ))}
                    {selectedRequest.customAddonRequest && (
                      <div className="pt-1 text-xs">
                        <span className="font-bold text-amber-900 block">Unlisted Add-On Request:</span>
                        <p className="italic text-[#10110F] bg-white p-2 rounded-lg border border-[#DCE1D8] mt-1">
                          “{selectedRequest.customAddonRequest}”
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Live Style Customizer Selections */}
                {(selectedRequest.styleConfig || selectedRequest.styleCustomization || selectedRequest.personalPreferences?.styleConfig) && (
                  <div className="p-4 rounded-2xl bg-white border border-[#DCE1D8] space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#465640] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
                      <span>Live Style Customizer Selections</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {Object.entries(
                        selectedRequest.styleConfig || selectedRequest.styleCustomization || selectedRequest.personalPreferences?.styleConfig || {}
                      ).filter(([k, v]) => v !== undefined && v !== null && v !== '' && typeof v !== 'object').map(([key, val]) => (
                        <div key={key} className="p-2 rounded-xl bg-[#F7F4ED]/50 border border-[#DCE1D8] flex items-center justify-between">
                          <span className="text-[#6B7068] capitalize">{key.replace(/([A-Z])/g, ' $1').replace(/Id$/, '')}:</span>
                          <span className="font-semibold text-[#10110F] text-right truncate max-w-[150px]">{String(val)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Multi-Photo Inspiration Gallery */}
                {((selectedRequest.inspirationPhotos && selectedRequest.inspirationPhotos.length > 0) || selectedRequest.inspirationPhoto) && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#465640] mb-2 flex items-center gap-1">
                      <ImageIcon className="w-3.5 h-3.5 text-[#263D2B]" />
                      <span>Patron Inspiration Photos</span>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {(selectedRequest.inspirationPhotos || [selectedRequest.inspirationPhoto]).map((photo, idx) => {
                        if (!photo || !photo.dataUrl) return null;
                        return (
                          <div key={photo.id || idx} className="rounded-2xl border border-[#DCE1D8] p-2 bg-[#F7F4ED] space-y-1.5">
                            <img
                              src={photo.dataUrl}
                              alt={`Inspiration #${idx + 1}`}
                              className="w-full aspect-square object-cover rounded-xl"
                            />
                            {photo.description && (
                              <div className="text-[11px] text-[#10110F] italic leading-tight">
                                “{photo.description}”
                              </div>
                            )}
                            <div className="text-[10px] text-[#6B7068]">
                              {photo.name || 'reference_photo'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* SALON REVIEW & APPROVAL FORM */}
              <form onSubmit={handleSaveReview} className="p-5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#263D2B]" />
                  <h4 className="font-serif text-sm font-bold text-[#10110F]">
                    Salon Evaluation & Pricing Approval
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Status Selector */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#465640] uppercase tracking-wider mb-1">
                      Status
                    </label>
                    <select
                      value={reviewForm.status}
                      onChange={(e) => setReviewForm({ ...reviewForm, status: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE1D8] bg-white text-[#10110F] font-medium focus:ring-2 focus:ring-[#263D2B]"
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Awaiting Customer Response">Awaiting Patron</option>
                      <option value="Quote Provided">Quote Provided</option>
                      <option value="Approved">Approved</option>
                      <option value="Converted to Booking">Converted to Booking</option>
                      <option value="Declined">Declined</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Approved Price */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#465640] uppercase tracking-wider mb-1">
                      Approved Quote Price ($ CAD)
                    </label>
                    <input
                      type="number"
                      step="1"
                      placeholder={`Baseline: $${selectedRequest.catalogPrice}`}
                      value={reviewForm.approvedPrice}
                      onChange={(e) => setReviewForm({ ...reviewForm, approvedPrice: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE1D8] bg-white text-[#10110F] font-medium focus:ring-2 focus:ring-[#263D2B]"
                    />
                  </div>

                  {/* Approved Duration */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#465640] uppercase tracking-wider mb-1">
                      Approved Duration
                    </label>
                    <input
                      type="text"
                      placeholder={`Baseline: ${selectedRequest.catalogDuration}`}
                      value={reviewForm.approvedDuration}
                      onChange={(e) => setReviewForm({ ...reviewForm, approvedDuration: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE1D8] bg-white text-[#10110F] font-medium focus:ring-2 focus:ring-[#263D2B]"
                    />
                  </div>
                </div>

                {/* Salon Artist Notes / Response */}
                <div>
                  <label className="block text-[11px] font-bold text-[#465640] uppercase tracking-wider mb-1">
                    Salon Consultation Notes & Message to Patron
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide bespoke consultation advice, ask clarification questions, confirm formula details, or explain quoted surcharge..."
                    value={reviewForm.salonNotes}
                    onChange={(e) => setReviewForm({ ...reviewForm, salonNotes: e.target.value })}
                    className="w-full p-3 text-xs rounded-xl border border-[#DCE1D8] bg-white text-[#10110F] focus:ring-2 focus:ring-[#263D2B]"
                  />
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAskClarification}
                      className="px-3.5 py-2 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Ask Patron for Clarification</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendQuote}
                      className="px-3.5 py-2 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>Send Quote for Approval</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleConvertToAppointment}
                      className="px-3.5 py-2 rounded-xl border border-[#263D2B] bg-[#263D2B]/10 hover:bg-[#263D2B]/20 text-[#263D2B] text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Convert to Booking</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedRequest(null)}
                      className="px-4 py-2 rounded-xl text-xs text-[#6B7068] hover:text-[#10110F] hover:bg-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-white text-xs font-semibold shadow-xs transition-colors"
                    >
                      Save Evaluation
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
