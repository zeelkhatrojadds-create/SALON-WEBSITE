import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  MessageSquare,
  DollarSign,
  Eye,
  Image as ImageIcon,
  Plus,
  Trash2,
  Search,
  ArrowRight,
  User,
  Check,
  ChevronDown,
  X,
  Send,
  HelpCircle,
  CalendarCheck,
  ShieldAlert
} from 'lucide-react';
import { ALL_SERVICES, CATEGORIES } from '../../data/servicesData';
import { getCustomizationConfigForService } from '../../data/treatmentCustomizationsData';
import salonDB from '../../db/salonDatabase';

export default function CustomConsultationSection() {
  // Navigation tabs: 'submit' (Request Form) or 'track' (My Consultation Requests Tracker)
  const [activeTab, setActiveTab] = useState('submit');

  // Customer Authentication state
  const [currentUser, setCurrentUser] = useState(() => salonDB.getCurrentUser());

  // Consultation requests list from database
  const [allRequests, setAllRequests] = useState(() => salonDB.getCustomRequests());

  // Subscribe to live database updates
  useEffect(() => {
    const sync = () => {
      setAllRequests(salonDB.getCustomRequests());
      setCurrentUser(salonDB.getCurrentUser());
    };
    sync();
    const unsub = salonDB.subscribe(sync);
    return () => unsub();
  }, []);

  // ---------------------------------------------------------------------------
  // 1. FORM STATE
  // ---------------------------------------------------------------------------
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [serviceSearch, setServiceSearch] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(ALL_SERVICES[0]?.id || 'special-glam-girl-facial');
  const [showServicePickerModal, setShowServicePickerModal] = useState(false);

  // Form Fields
  const [customerVision, setCustomerVision] = useState('');
  const [desiredResult, setDesiredResult] = useState('');
  const [focusAreas, setFocusAreas] = useState('');
  const [thingsToAvoid, setThingsToAvoid] = useState('');
  const [sensitivities, setSensitivities] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [occasion, setOccasion] = useState('Everyday Luxury');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');

  // Service specific options & add-ons
  const [selectedOptionId, setSelectedOptionId] = useState('');
  const [selectedAddonIds, setSelectedAddonIds] = useState([]);
  const [customAddonRequest, setCustomAddonRequest] = useState('');

  // Inspiration Photos (up to 4 images with descriptions)
  const [inspirationPhotos, setInspirationPhotos] = useState([]);
  const fileInputRef = useRef(null);

  // Contact Info
  const [contactInfo, setContactInfo] = useState(() => ({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || ''
  }));

  // Update contact info if user logs in
  useEffect(() => {
    if (currentUser) {
      setContactInfo(prev => ({
        name: prev.name || currentUser.name || '',
        email: prev.email || currentUser.email || '',
        phone: prev.phone || currentUser.phone || ''
      }));
    }
  }, [currentUser]);

  // Submission feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(null); // stores { requestId, serviceName, date }

  // ---------------------------------------------------------------------------
  // 2. SELECTED SERVICE DATA & ADD-ONS COMPUTATION
  // ---------------------------------------------------------------------------
  const selectedService = useMemo(() => {
    return ALL_SERVICES.find(s => s.id === selectedServiceId) || ALL_SERVICES[0];
  }, [selectedServiceId]);

  const customizationConfig = useMemo(() => {
    return getCustomizationConfigForService(selectedService);
  }, [selectedService]);

  // Reset or initialize options when service changes
  useEffect(() => {
    if (customizationConfig?.optionsGroup?.options?.length > 0) {
      const defaultOpt = customizationConfig.optionsGroup.options.find(o => o.isDefault) || customizationConfig.optionsGroup.options[0];
      setSelectedOptionId(defaultOpt?.id || '');
    } else {
      setSelectedOptionId('');
    }
    // Filter out addons that don't belong to the new service
    const validAddonIds = new Set((customizationConfig?.addons || []).map(a => a.id));
    setSelectedAddonIds(prev => prev.filter(id => validAddonIds.has(id)));
  }, [customizationConfig]);

  // Catalog baseline pricing & add-ons total
  const catalogBasePrice = Number(selectedService?.price) || 0;
  const catalogDuration = selectedService?.durationDisplay || selectedService?.duration || '45 min';

  const selectedAddonsObjects = useMemo(() => {
    if (!customizationConfig?.addons) return [];
    return customizationConfig.addons.filter(a => selectedAddonIds.includes(a.id));
  }, [customizationConfig, selectedAddonIds]);

  const addOnTotal = useMemo(() => {
    return selectedAddonsObjects.reduce((acc, a) => acc + (Number(a.price) || 0), 0);
  }, [selectedAddonsObjects]);

  // ---------------------------------------------------------------------------
  // 3. INSPIRATION PHOTO UPLOADER HANDLERS
  // ---------------------------------------------------------------------------
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (inspirationPhotos.length + files.length > 4) {
      alert('You can upload a maximum of 4 inspiration reference photos.');
      return;
    }

    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} exceeds 5MB limit. Please choose a smaller image.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setInspirationPhotos(prev => {
          if (prev.length >= 4) return prev;
          return [
            ...prev,
            {
              id: 'photo_' + Math.random().toString(36).substring(2, 9),
              name: file.name,
              dataUrl: uploadEvent.target.result,
              description: ''
            }
          ];
        });
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemovePhoto = (photoId) => {
    setInspirationPhotos(prev => prev.filter(p => p.id !== photoId));
  };

  const handlePhotoDescriptionChange = (photoId, text) => {
    setInspirationPhotos(prev => prev.map(p => p.id === photoId ? { ...p, description: text } : p));
  };

  const toggleAddon = (addonId) => {
    setSelectedAddonIds(prev => {
      if (prev.includes(addonId)) {
        return prev.filter(id => id !== addonId);
      } else {
        return [...prev, addonId];
      }
    });
  };

  // ---------------------------------------------------------------------------
  // 4. SUBMIT CONSULTATION REQUEST
  // ---------------------------------------------------------------------------
  const validateForm = () => {
    const errors = {};
    if (!selectedService) {
      errors.service = 'Please select a salon service from the catalog.';
    }
    if (!customerVision.trim() || customerVision.trim().length < 10) {
      errors.customerVision = 'Please describe your desired look or personalized vision in at least 10 characters.';
    }
    if (!contactInfo.name.trim()) {
      errors.name = 'Please provide your name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactInfo.email.trim() || !emailRegex.test(contactInfo.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }
    const phoneDigits = (contactInfo.phone || '').replace(/\D/g, '');
    if (!contactInfo.phone.trim() || phoneDigits.length < 7) {
      errors.phone = 'Please provide a valid phone number.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstErr = document.querySelector('.form-field-error');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      const requestId = `GGJ-CR-${Math.floor(100000 + Math.random() * 900000)}`;

      const requestPayload = {
        id: requestId,
        createdAt: new Date().toISOString(),
        status: 'Submitted',
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        category: selectedService.category,
        categoryName: selectedService.categoryName || selectedService.category,
        catalogPrice: catalogBasePrice,
        catalogDuration: catalogDuration,
        catalogDurationMinutes: salonDB.parseServiceDurationMinutes(catalogDuration),
        customerName: contactInfo.name.trim(),
        customerEmail: contactInfo.email.trim(),
        customerPhone: contactInfo.phone.trim(),
        customerId: currentUser?.id || null,
        customerVision: customerVision.trim(),
        desiredResult: desiredResult.trim() || 'Custom bespoke finish',
        focusAreas: focusAreas.trim(),
        thingsToAvoid: thingsToAvoid.trim(),
        sensitivities: sensitivities.trim(),
        specialInstructions: specialInstructions.trim(),
        occasion: occasion,
        preferredDate: preferredDate || '',
        preferredTime: preferredTime || '',
        selectedAddons: selectedAddonsObjects.map(a => ({
          id: a.id,
          name: a.name,
          price: Number(a.price) || 0,
          durationMinutes: Number(a.durationMinutes) || 0
        })),
        customAddonRequest: customAddonRequest.trim(),
        calculatedEstimatedPrice: catalogBasePrice + addOnTotal,
        calculatedEstimatedDuration: salonDB.parseServiceDurationMinutes(catalogDuration),
        inspirationPhotos: inspirationPhotos.map(p => ({
          id: p.id,
          name: p.name,
          dataUrl: p.dataUrl,
          description: p.description
        })),
        // Before quote is provided:
        approvedPrice: null,
        approvedDuration: null,
        salonNotes: '',
        history: [
          {
            timestamp: new Date().toISOString(),
            action: 'Submitted',
            by: contactInfo.name.trim(),
            notes: 'Personalized consultation request submitted to the salon.'
          }
        ]
      };

      // Real database persistence via salonDB
      const saved = salonDB.saveCustomRequest(requestPayload);

      setSubmitSuccess({
        requestId: saved.id,
        serviceName: saved.serviceName,
        date: new Date().toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
      });

      // Reset form
      setCustomerVision('');
      setDesiredResult('');
      setFocusAreas('');
      setThingsToAvoid('');
      setSensitivities('');
      setSpecialInstructions('');
      setInspirationPhotos([]);
      setSelectedAddonIds([]);
      setCustomAddonRequest('');
    } catch (err) {
      console.error('Failed to submit consultation request:', err);
      setFormErrors({ submit: 'An error occurred while saving your request. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------------------------------------------------------------------------
  // 5. TRACKER / "MY CONSULTATION REQUESTS" LOGIC
  // ---------------------------------------------------------------------------
  const [trackerSearch, setTrackerSearch] = useState('');
  const [selectedDetailRequest, setSelectedDetailRequest] = useState(null);
  const [customerClarificationText, setCustomerClarificationText] = useState('');
  const [clarificationSuccess, setClarificationSuccess] = useState('');
  const [quoteDecisionMsg, setQuoteDecisionMsg] = useState('');

  // Filter requests belonging to current user or matching tracker search
  const myRequests = useMemo(() => {
    const userEmail = (currentUser?.email || contactInfo.email || '').toLowerCase().trim();
    const userPhone = (currentUser?.phone || contactInfo.phone || '').replace(/\D/g, '');

    return allRequests.filter(req => {
      // If user typed a search query in tracker
      if (trackerSearch.trim()) {
        const q = trackerSearch.toLowerCase().trim();
        return (
          req.id.toLowerCase().includes(q) ||
          (req.customerEmail && req.customerEmail.toLowerCase().includes(q)) ||
          (req.serviceName && req.serviceName.toLowerCase().includes(q)) ||
          (req.customerPhone && req.customerPhone.includes(q))
        );
      }

      // If user is logged in or entered email/phone in form, match their requests
      if (userEmail && req.customerEmail && req.customerEmail.toLowerCase().trim() === userEmail) {
        return true;
      }
      if (userPhone && req.customerPhone && req.customerPhone.replace(/\D/g, '') === userPhone) {
        return true;
      }
      if (currentUser?.id && req.customerId === currentUser.id) {
        return true;
      }

      // If just submitted, include that request
      if (submitSuccess?.requestId && req.id === submitSuccess.requestId) {
        return true;
      }

      return false;
    });
  }, [allRequests, currentUser, contactInfo.email, contactInfo.phone, trackerSearch, submitSuccess]);

  // Handle Accept Quote
  const handleAcceptQuote = (requestId) => {
    try {
      salonDB.acceptCustomQuote(requestId, 'Customer accepted the approved quote via online tracker.');
      setQuoteDecisionMsg('✓ You have accepted the quote! You may now proceed to schedule your appointment.');
      // Refresh current detail modal if open
      const updated = salonDB.getCustomRequestById(requestId);
      if (updated) setSelectedDetailRequest(updated);
    } catch (err) {
      alert('Error accepting quote: ' + err.message);
    }
  };

  // Handle Decline Quote
  const handleDeclineQuote = (requestId) => {
    const reason = window.prompt('Please let us know why you are declining this quote (e.g. price adjustment, scheduling, alternate style):');
    if (reason === null) return; // User cancelled prompt

    try {
      salonDB.declineCustomQuote(requestId, reason || 'Customer declined the proposed quote.');
      setQuoteDecisionMsg('You have declined this quote. Our salon team will review your feedback.');
      const updated = salonDB.getCustomRequestById(requestId);
      if (updated) setSelectedDetailRequest(updated);
    } catch (err) {
      alert('Error declining quote: ' + err.message);
    }
  };

  // Handle Customer Clarification Response
  const handleSendClarification = (requestId) => {
    if (!customerClarificationText.trim()) return;

    try {
      salonDB.updateCustomerClarification(requestId, customerClarificationText.trim());
      setCustomerClarificationText('');
      setClarificationSuccess('Your response has been transmitted to Janki Khatroja. Status updated to Under Review.');
      const updated = salonDB.getCustomRequestById(requestId);
      if (updated) setSelectedDetailRequest(updated);
    } catch (err) {
      alert('Error updating clarification: ' + err.message);
    }
  };

  // Helper for Status Badges
  const renderStatusBadge = (status, size = 'sm') => {
    const baseClasses = size === 'lg' 
      ? 'px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2'
      : 'px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5';

    switch (status) {
      case 'Submitted':
      case 'Pending':
        return (
          <span className={`${baseClasses} bg-amber-50 text-amber-900 border border-amber-200`}>
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span>Submitted</span>
          </span>
        );
      case 'Under Review':
        return (
          <span className={`${baseClasses} bg-blue-50 text-blue-900 border border-blue-200`}>
            <Eye className="w-3.5 h-3.5 text-blue-700" />
            <span>Under Review</span>
          </span>
        );
      case 'Awaiting Customer Response':
        return (
          <span className={`${baseClasses} bg-purple-50 text-purple-900 border border-purple-200`}>
            <MessageSquare className="w-3.5 h-3.5 text-purple-700" />
            <span>Awaiting Your Response</span>
          </span>
        );
      case 'Quote Provided':
        return (
          <span className={`${baseClasses} bg-emerald-50 text-emerald-950 border border-emerald-300 font-extrabold`}>
            <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
            <span>Quote Provided</span>
          </span>
        );
      case 'Approved':
        return (
          <span className={`${baseClasses} bg-[#263D2B]/10 text-[#263D2B] border border-[#263D2B]/30 font-bold`}>
            <CheckCircle className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>Approved</span>
          </span>
        );
      case 'Declined':
        return (
          <span className={`${baseClasses} bg-rose-50 text-rose-900 border border-rose-200`}>
            <XCircle className="w-3.5 h-3.5 text-rose-700" />
            <span>Declined</span>
          </span>
        );
      case 'Converted to Booking':
        return (
          <span className={`${baseClasses} bg-[#263D2B] text-[#F7F4ED] font-bold`}>
            <CalendarCheck className="w-3.5 h-3.5 text-white" />
            <span>Converted to Booking</span>
          </span>
        );
      case 'Cancelled':
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-800 border border-gray-300`}>
            <X className="w-3.5 h-3.5 text-gray-600" />
            <span>Cancelled</span>
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`}>
            <span>{status || 'Submitted'}</span>
          </span>
        );
    }
  };

  // Explanations for each status
  const getStatusExplanation = (status) => {
    switch (status) {
      case 'Submitted':
        return 'Request received by salon concierge. Queued for master artist evaluation.';
      case 'Under Review':
        return 'Janki Khatroja and senior stylists are reviewing your customized look and requirements.';
      case 'Awaiting Customer Response':
        return 'Our salon team requires additional clarification on your requested look or constraints.';
      case 'Quote Provided':
        return 'The salon has prepared an approved price and duration quote for your review.';
      case 'Approved':
        return 'The customization has been approved. You can now schedule your reservation.';
      case 'Declined':
        return 'The salon cannot fulfill this customization. Check notes for recommendations.';
      case 'Converted to Booking':
        return 'This customized consultation is linked to a confirmed appointment.';
      case 'Cancelled':
        return 'This consultation request has been cancelled.';
      default:
        return 'Consultation request is active.';
    }
  };

  // Catalog filtered services for service picker modal
  const pickerFilteredServices = useMemo(() => {
    return ALL_SERVICES.filter(s => {
      if (s.active === false) return false;
      const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
      const q = serviceSearch.toLowerCase().trim();
      const matchesSearch = !q || s.name.toLowerCase().includes(q) || (s.description && s.description.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, serviceSearch]);

  return (
    <section 
      id="custom-consultation" 
      className="w-full bg-[#F7F4ED] text-[#10110F] py-16 sm:py-20 lg:py-24 border-t border-[#DCE1D8] font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================================================================= */}
        {/* SECTION HEADER & BRAND POSITIONING                                */}
        {/* ================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#263D2B]/10 border border-[#263D2B]/20 text-[#263D2B] text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>BESPOKE SALON ATELIER</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight mb-4">
            Custom Consultation Request
          </h2>

          <p className="text-sm sm:text-base text-[#465640] leading-relaxed">
            “Submit your personalized look to the salon for review. Track your request and view the approved price and duration when available.”
          </p>
        </div>

        {/* ================================================================= */}
        {/* DUAL MODE TABS                                                    */}
        {/* ================================================================= */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#DCE1D8] shadow-xs">
            <button
              type="button"
              onClick={() => {
                setActiveTab('submit');
                setSubmitSuccess(null);
              }}
              className={`px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'submit'
                  ? 'bg-[#263D2B] text-[#F7F4ED] shadow-xs'
                  : 'text-[#465640] hover:text-[#10110F] hover:bg-[#F7F4ED]'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Submit Consultation Request</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('track')}
              className={`px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'track'
                  ? 'bg-[#263D2B] text-[#F7F4ED] shadow-xs'
                  : 'text-[#465640] hover:text-[#10110F] hover:bg-[#F7F4ED]'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>My Consultation Requests</span>
              {myRequests.length > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === 'track' ? 'bg-white text-[#263D2B]' : 'bg-[#263D2B] text-white'
                }`}>
                  {myRequests.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* TAB 1: CUSTOMER REQUEST FORM                                      */}
        {/* ================================================================= */}
        {activeTab === 'submit' && (
          <div className="max-w-4xl mx-auto">
            {submitSuccess ? (
              /* Success Confirmation Banner */
              <div className="bg-white rounded-3xl border border-[#DCE1D8] p-8 sm:p-10 shadow-md text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#263D2B]/10 border border-[#263D2B]/30 text-[#263D2B] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#263D2B]">
                    Request Confirmed & Transmitted
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#10110F]">
                    Personalized Look Received
                  </h3>
                  <p className="text-xs sm:text-sm text-[#465640] max-w-lg mx-auto">
                    Your bespoke consultation request for <strong>{submitSuccess.serviceName}</strong> has been saved directly to our salon database. Janki Khatroja and our senior artists will evaluate your requirements and provide an approved quote and duration.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] inline-block text-left">
                  <div className="text-[11px] uppercase tracking-wider text-[#6B7068] font-bold">
                    Unique Request ID
                  </div>
                  <div className="text-lg font-mono font-bold text-[#10110F] mt-0.5">
                    {submitSuccess.requestId}
                  </div>
                  <div className="text-xs text-[#263D2B] font-medium mt-1">
                    Submitted on: {submitSuccess.date} • Status: <strong>Submitted</strong>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('track');
                      const found = salonDB.getCustomRequestById(submitSuccess.requestId);
                      if (found) setSelectedDetailRequest(found);
                    }}
                    className="px-6 py-3 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-[#F7F4ED] text-xs font-bold uppercase tracking-wider transition-colors shadow-xs flex items-center gap-2"
                  >
                    <span>Track in “My Requests”</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmitSuccess(null)}
                    className="px-6 py-3 rounded-xl border border-[#DCE1D8] bg-white hover:bg-[#F7F4ED] text-[#10110F] text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Submit Another Look
                  </button>
                </div>
              </div>
            ) : (
              /* Request Form Container */
              <form onSubmit={handleSubmitRequest} className="bg-white rounded-3xl border border-[#DCE1D8] shadow-md p-6 sm:p-10 space-y-8">
                
                {/* 1. Complete Catalog Service Selector */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#263D2B] text-white flex items-center justify-center text-[11px]">1</span>
                      <span>Select Base Service from Salon Catalog (85 Services)</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowServicePickerModal(true)}
                      className="text-xs font-semibold text-[#263D2B] hover:underline flex items-center gap-1"
                    >
                      <span>Browse Full Catalog</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Selected Service Card */}
                  <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      {selectedService?.image ? (
                        <img 
                          src={selectedService.image} 
                          alt={selectedService.name} 
                          className="w-16 h-16 rounded-xl object-cover border border-[#DCE1D8] shrink-0" 
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-[#263D2B]/10 border border-[#DCE1D8] flex items-center justify-center text-[#263D2B] shrink-0 font-serif font-bold text-xl">
                          GJ
                        </div>
                      )}
                      <div>
                        <div className="inline-block px-2 py-0.5 rounded-md bg-white border border-[#DCE1D8] text-[10px] font-bold text-[#465640] uppercase tracking-wider mb-1">
                          {selectedService?.categoryName || selectedService?.category}
                        </div>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-[#10110F]">
                          {selectedService?.name}
                        </h4>
                        <div className="text-xs text-[#6B7068] mt-0.5">
                          Catalog Baseline: <span className="font-bold text-[#263D2B]">${catalogBasePrice} CAD</span> • Standard Duration: <span className="font-medium text-[#10110F]">{catalogDuration}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowServicePickerModal(true)}
                      className="px-4 py-2 rounded-xl border border-[#DCE1D8] bg-white hover:bg-[#F7F4ED] text-xs font-semibold text-[#10110F] transition-colors self-start sm:self-center"
                    >
                      Change Service
                    </button>
                  </div>
                  {formErrors.service && (
                    <p className="text-xs text-rose-700 font-medium">{formErrors.service}</p>
                  )}
                </div>

                {/* 2. Customer Personal Requirements */}
                <div className="space-y-4 pt-2 border-t border-[#DCE1D8]">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#263D2B] text-white flex items-center justify-center text-[11px]">2</span>
                    <span>Personalized Look, Vision & Desired Result</span>
                  </label>

                  <div className="space-y-1.5">
                    <label htmlFor="customer-vision" className="text-xs font-semibold text-[#10110F] block">
                      Describe your desired look and requirements in detail <span className="text-rose-600">*</span>
                    </label>
                    <textarea
                      id="customer-vision"
                      rows={4}
                      value={customerVision}
                      onChange={(e) => setCustomerVision(e.target.value)}
                      placeholder="e.g. I am looking for a dimensional cool-toned balayage with face-framing money pieces. My hair is naturally dark brown and reaches mid-back. Looking for a soft transition without brassy undertones for an engagement ceremony..."
                      className={`w-full p-3.5 text-xs sm:text-sm rounded-2xl border ${
                        formErrors.customerVision ? 'border-rose-500 bg-rose-50/20 form-field-error' : 'border-[#DCE1D8] bg-white'
                      } text-[#10110F] focus:outline-none focus:ring-2 focus:ring-[#263D2B] placeholder:text-[#6B7068]`}
                    />
                    {formErrors.customerVision && (
                      <p className="text-xs text-rose-700 font-medium">{formErrors.customerVision}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="desired-result" className="text-xs font-semibold text-[#10110F] block">
                        Desired Final Result / Aesthetic
                      </label>
                      <input
                        id="desired-result"
                        type="text"
                        value={desiredResult}
                        onChange={(e) => setDesiredResult(e.target.value)}
                        placeholder="e.g. Soft dewy glam, effortless textured volume, seamless bridal glow"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DCE1D8] bg-white text-[#10110F] focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="focus-areas" className="text-xs font-semibold text-[#10110F] block">
                        Key Focus Areas & Style Preferences
                      </label>
                      <input
                        id="focus-areas"
                        type="text"
                        value={focusAreas}
                        onChange={(e) => setFocusAreas(e.target.value)}
                        placeholder="e.g. Under-eye hydration, defined jawline contour, root shadow, crown lift"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DCE1D8] bg-white text-[#10110F] focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                      />
                    </div>
                  </div>

                  {/* Things to Avoid & Sensitivities */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <label htmlFor="things-to-avoid" className="text-xs font-semibold text-rose-900 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-700" />
                        <span>Things to Avoid (Strict Constraints)</span>
                      </label>
                      <textarea
                        id="things-to-avoid"
                        rows={2}
                        value={thingsToAvoid}
                        onChange={(e) => setThingsToAvoid(e.target.value)}
                        placeholder="e.g. No bleach touching scalp directly, avoid warm brassy tones, no heavy cakey powder, avoid threading upper cheeks"
                        className="w-full p-3 text-xs rounded-xl border border-rose-200 bg-rose-50/20 text-[#10110F] focus:outline-none focus:ring-2 focus:ring-rose-500 placeholder:text-[#6B7068]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="sensitivities" className="text-xs font-semibold text-amber-900 flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                        <span>Allergies / Chemical Sensitivities / Restrictions</span>
                      </label>
                      <textarea
                        id="sensitivities"
                        rows={2}
                        value={sensitivities}
                        onChange={(e) => setSensitivities(e.target.value)}
                        placeholder="e.g. Sensitive to strong fragrance, latex allergy, pregnant (avoid retinoids), eczema near hairline"
                        className="w-full p-3 text-xs rounded-xl border border-amber-200 bg-amber-50/20 text-[#10110F] focus:outline-none focus:ring-2 focus:ring-amber-600 placeholder:text-[#6B7068]"
                      />
                    </div>
                  </div>

                  {/* Special Instructions & Occasion */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <label htmlFor="special-instructions" className="text-xs font-semibold text-[#10110F] block">
                        Special Instructions / Accommodation
                      </label>
                      <input
                        id="special-instructions"
                        type="text"
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        placeholder="e.g. Requesting hijab-friendly private suite, bringing heirloom bridal veil"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#DCE1D8] bg-white text-[#10110F] focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="occasion-select" className="text-xs font-semibold text-[#10110F] block">
                        Occasion / Target Timing
                      </label>
                      <select
                        id="occasion-select"
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#DCE1D8] bg-white text-[#10110F] focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                      >
                        <option value="Everyday Luxury">Everyday Beauty & Maintenance</option>
                        <option value="Wedding / Bridal">Wedding or Bridal Ceremony</option>
                        <option value="Engagement / Reception">Engagement or Sangeet Gala</option>
                        <option value="Graduation / Gala">Graduation / Black Tie Gala</option>
                        <option value="Festival / Celebration">Diwali / Eid / Holiday Festivity</option>
                        <option value="Photo Shoot / Media">Professional Photography / Media</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. Upload Inspiration Photos */}
                <div className="space-y-3 pt-2 border-t border-[#DCE1D8]">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#263D2B] text-white flex items-center justify-center text-[11px]">3</span>
                      <span>Upload Inspiration Reference Photos (Up to 4)</span>
                    </label>
                    <span className="text-[11px] text-[#6B7068]">
                      {inspirationPhotos.length} / 4 Uploaded
                    </span>
                  </div>

                  <p className="text-xs text-[#465640]">
                    Upload screenshots or images of hairstyles, colour placement, makeup tones, nail art, or mehndi designs you love.
                  </p>

                  {/* Upload Drop Zone / Button */}
                  {inspirationPhotos.length < 4 && (
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        className="hidden"
                        id="consultation-photo-input"
                      />
                      <label
                        htmlFor="consultation-photo-input"
                        className="p-6 border-2 border-dashed border-[#DCE1D8] hover:border-[#263D2B] bg-[#F7F4ED]/50 hover:bg-[#F7F4ED] rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors text-center"
                      >
                        <ImageIcon className="w-6 h-6 text-[#263D2B]" />
                        <span className="text-xs font-bold text-[#10110F]">
                          Click to select inspiration images
                        </span>
                        <span className="text-[10px] text-[#6B7068]">
                          PNG, JPG, WEBP up to 5MB each. Instant preview available.
                        </span>
                      </label>
                    </div>
                  )}

                  {/* Photo Preview Grid with Caption and Removal */}
                  {inspirationPhotos.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {inspirationPhotos.map((photo, idx) => (
                        <div key={photo.id} className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex gap-3 items-start relative group">
                          <img
                            src={photo.dataUrl}
                            alt={`Inspiration ${idx + 1}`}
                            className="w-20 h-20 rounded-xl object-cover border border-[#DCE1D8] shrink-0"
                          />
                          <div className="flex-1 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-[#10110F]">
                                Photo #{idx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemovePhoto(photo.id)}
                                className="text-rose-700 hover:text-rose-900 p-1 rounded-md hover:bg-rose-50 transition-colors"
                                title="Remove photo"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <input
                              type="text"
                              value={photo.description}
                              onChange={(e) => handlePhotoDescriptionChange(photo.id, e.target.value)}
                              placeholder="Note: what part of this photo do you like?"
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#DCE1D8] bg-white text-[#10110F] focus:outline-none focus:ring-1 focus:ring-[#263D2B]"
                            />
                            <div className="text-[10px] text-[#6B7068] truncate">
                              {photo.name}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. Service-Specific Options & Eligible Add-Ons */}
                {((customizationConfig?.optionsGroup?.options?.length > 0) || (customizationConfig?.addons && customizationConfig.addons.length > 0)) && (
                  <div className="space-y-3 pt-2 border-t border-[#DCE1D8]">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#263D2B] text-white flex items-center justify-center text-[11px]">4</span>
                      <span>Service-Specific Options & Eligible Add-Ons</span>
                    </label>

                    {/* Service-Specific Options Group */}
                    {customizationConfig?.optionsGroup?.options?.length > 0 && (
                      <div className="space-y-2 p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#263D2B] block">
                          {customizationConfig.optionsGroup.title || 'Treatment Formula / Tier Option'}
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {customizationConfig.optionsGroup.options.map(opt => (
                            <button
                              type="button"
                              key={opt.id}
                              onClick={() => setSelectedOptionId(opt.id)}
                              className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between text-left transition-all ${
                                selectedOptionId === opt.id
                                  ? 'bg-[#263D2B] text-white border-[#263D2B]'
                                  : 'bg-white text-[#10110F] border-[#DCE1D8] hover:border-[#A8B5A0]'
                              }`}
                            >
                              <div className="font-semibold">{opt.name}</div>
                              {Number(opt.priceAdjustment) > 0 && (
                                <div className={`font-bold text-[11px] ${selectedOptionId === opt.id ? 'text-white' : 'text-[#263D2B]'}`}>
                                  +${opt.priceAdjustment} CAD
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-[#465640]">
                      Enhance your custom visit with curated treatment extensions. Pricing is itemized transparently.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {customizationConfig.addons.map(addon => {
                        const isChecked = selectedAddonIds.includes(addon.id);
                        return (
                          <div
                            key={addon.id}
                            onClick={() => toggleAddon(addon.id)}
                            className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                              isChecked
                                ? 'bg-[#263D2B]/5 border-[#263D2B]'
                                : 'bg-[#F7F4ED]/50 border-[#DCE1D8] hover:border-[#A8B5A0]'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-md border mt-0.5 flex items-center justify-center shrink-0 ${
                              isChecked ? 'bg-[#263D2B] border-[#263D2B] text-white' : 'border-[#A8B5A0] bg-white'
                            }`}>
                              {isChecked && <Check className="w-3 h-3" />}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#10110F]">{addon.name}</span>
                                <span className="text-xs font-bold text-[#263D2B]">+${addon.price} CAD</span>
                              </div>
                              {addon.description && (
                                <p className="text-[11px] text-[#6B7068] mt-0.5 leading-snug">
                                  {addon.description}
                                </p>
                              )}
                              <div className="text-[10px] text-[#465640] mt-1">
                                Duration: +{addon.durationMinutes || 10} min
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Unlisted Custom Add-on Request */}
                    <div className="pt-2">
                      <label htmlFor="unlisted-addon" className="text-xs font-semibold text-[#10110F] block mb-1">
                        Unlisted Custom Add-on or Special Treatment Request
                      </label>
                      <input
                        id="unlisted-addon"
                        type="text"
                        value={customAddonRequest}
                        onChange={(e) => setCustomAddonRequest(e.target.value)}
                        placeholder="e.g. Extended scalp acupressure, specific organic henna cone shade, custom nail jewel charm"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#DCE1D8] bg-white text-[#10110F] focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                      />
                    </div>
                  </div>
                )}

                {/* 5. Contact Info & Existing Authentication System */}
                <div className="space-y-4 pt-2 border-t border-[#DCE1D8]">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#263D2B] text-white flex items-center justify-center text-[11px]">5</span>
                      <span>Patron Contact Details & Salon Profile</span>
                    </label>

                    {currentUser ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#263D2B] bg-[#263D2B]/10 px-2.5 py-1 rounded-full">
                        <Check className="w-3 h-3 text-[#263D2B]" />
                        <span>Authenticated Patron</span>
                      </span>
                    ) : (
                      <Link to="/login?redirect=/contact#custom-consultation" className="text-xs font-semibold text-[#263D2B] hover:underline flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>Sign in for 1-click tracking</span>
                      </Link>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="contact-name" className="text-xs font-semibold text-[#10110F] block">
                        Full Name <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                        placeholder="Your full name"
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xl border ${
                          formErrors.name ? 'border-rose-500 bg-rose-50/20' : 'border-[#DCE1D8] bg-white'
                        } text-[#10110F] focus:outline-none focus:ring-2 focus:ring-[#263D2B]`}
                      />
                      {formErrors.name && (
                        <p className="text-[11px] text-rose-700">{formErrors.name}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-email" className="text-xs font-semibold text-[#10110F] block">
                        Email Address <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                        placeholder="you@example.com"
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xl border ${
                          formErrors.email ? 'border-rose-500 bg-rose-50/20' : 'border-[#DCE1D8] bg-white'
                        } text-[#10110F] focus:outline-none focus:ring-2 focus:ring-[#263D2B]`}
                      />
                      {formErrors.email && (
                        <p className="text-[11px] text-rose-700">{formErrors.email}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-phone" className="text-xs font-semibold text-[#10110F] block">
                        Phone Number <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        placeholder="+1 (616) 000-0000"
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xl border ${
                          formErrors.phone ? 'border-rose-500 bg-rose-50/20' : 'border-[#DCE1D8] bg-white'
                        } text-[#10110F] focus:outline-none focus:ring-2 focus:ring-[#263D2B]`}
                      />
                      {formErrors.phone && (
                        <p className="text-[11px] text-rose-700">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Preferred Appointment Date & Time Target (Optional) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1">
                      <label htmlFor="preferred-date" className="text-xs font-semibold text-[#465640] block">
                        Preferred Target Date (Optional)
                      </label>
                      <input
                        id="preferred-date"
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DCE1D8] bg-white text-[#10110F] focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="preferred-time" className="text-xs font-semibold text-[#465640] block">
                        Preferred Window / Time Slot (Optional)
                      </label>
                      <input
                        id="preferred-time"
                        type="text"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        placeholder="e.g. Afternoon around 2:00 PM or Weekend morning"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DCE1D8] bg-white text-[#10110F] focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing Disclaimer & Transparency Card */}
                <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[#10110F]">
                    <span className="font-semibold">Catalog Baseline Service Price:</span>
                    <span className="font-bold">${catalogBasePrice} CAD</span>
                  </div>
                  {addOnTotal > 0 && (
                    <div className="flex items-center justify-between text-[#263D2B]">
                      <span>Selected Eligible Add-Ons:</span>
                      <span className="font-bold">+${addOnTotal} CAD</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-[#DCE1D8] text-[#10110F]">
                    <span className="font-bold">Approved Price:</span>
                    <span className="font-extrabold text-[#263D2B] bg-[#263D2B]/10 px-2.5 py-0.5 rounded-full text-xs">
                      Pending salon review
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[#10110F]">
                    <span className="font-bold">Approved Appointment Duration:</span>
                    <span className="font-medium text-[#465640]">
                      To be confirmed
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6B7068] pt-1 italic">
                    Note: Never invent prices or durations. The salon master artist evaluates hair length, density, skin barrier, and custom specifications before confirming exact pricing and time.
                  </p>
                </div>

                {formErrors.submit && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
                    {formErrors.submit}
                  </div>
                )}

                {/* Submit Action Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-[#6B7068]">
                    Reviews typically completed within 4 to 24 hours.
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-[#F7F4ED] text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Transmitting Look...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit for Salon Review</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: MY CONSULTATION REQUESTS (TRACKER)                         */}
        {/* ================================================================= */}
        {activeTab === 'track' && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Search / Lookup Bar for Guest & User Tracking */}
            <div className="bg-white rounded-2xl border border-[#DCE1D8] p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A8B5A0]" />
                <input
                  type="text"
                  value={trackerSearch}
                  onChange={(e) => setTrackerSearch(e.target.value)}
                  placeholder="Lookup by Request ID (e.g. GGJ-CR-...) or your Email address..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-[#10110F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-[#465640]">
                <span>Tracking {myRequests.length} Request{myRequests.length === 1 ? '' : 's'}</span>
              </div>
            </div>

            {quoteDecisionMsg && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-semibold flex items-center justify-between">
                <span>{quoteDecisionMsg}</span>
                <button
                  type="button"
                  onClick={() => setQuoteDecisionMsg('')}
                  className="text-emerald-700 hover:text-emerald-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* List of Requests */}
            {myRequests.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#DCE1D8] p-12 text-center space-y-4 shadow-xs">
                <div className="w-14 h-14 rounded-full bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center mx-auto">
                  <Clock className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-[#10110F]">
                    No Consultation Requests Found
                  </h3>
                  <p className="text-xs text-[#6B7068] max-w-md mx-auto">
                    {trackerSearch 
                      ? `No requests matched “${trackerSearch}”. Please verify your Request ID or Email.` 
                      : 'You do not have any saved consultation requests matching your email or session. Submit a new personalized look to begin.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('submit')}
                  className="px-5 py-2.5 rounded-xl bg-[#263D2B] text-white text-xs font-semibold transition-colors"
                >
                  Create Custom Request
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {myRequests.map((req) => {
                  const photosCount = (req.inspirationPhotos?.length) || (req.inspirationPhoto ? 1 : 0);
                  const isQuoteProvided = req.status === 'Quote Provided';
                  const isApproved = req.status === 'Approved';

                  return (
                    <div
                      key={req.id}
                      className="bg-white rounded-3xl border border-[#DCE1D8] p-5 sm:p-6 shadow-xs hover:border-[#263D2B]/40 transition-all space-y-4"
                    >
                      {/* Top Bar: ID, Date & Live Status Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE1D8] pb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs sm:text-sm text-[#10110F]">
                            {req.id}
                          </span>
                          <span className="text-[#A8B5A0]">•</span>
                          <span className="text-xs text-[#6B7068]">
                            {new Date(req.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {renderStatusBadge(req.status)}
                        </div>
                      </div>

                      {/* Main Service & Personalized Vision Summary */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-[#465640] uppercase tracking-wider bg-[#F7F4ED] px-2 py-0.5 rounded-md border border-[#DCE1D8]">
                              {req.categoryName || req.category}
                            </span>
                            <h4 className="font-serif text-lg font-bold text-[#10110F]">
                              {req.serviceName}
                            </h4>
                          </div>

                          <p className="text-xs text-[#465640] line-clamp-2 italic leading-relaxed">
                            “{req.customerVision || 'No detailed vision specified'}”
                          </p>

                          {req.thingsToAvoid && (
                            <div className="text-[11px] text-rose-800 font-medium">
                              <strong>Avoid:</strong> {req.thingsToAvoid}
                            </div>
                          )}

                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#6B7068] pt-1">
                            {photosCount > 0 && (
                              <span className="flex items-center gap-1 text-[#263D2B]">
                                <ImageIcon className="w-3.5 h-3.5" />
                                <span>{photosCount} inspiration photo{photosCount > 1 ? 's' : ''}</span>
                              </span>
                            )}
                            {req.selectedAddons?.length > 0 && (
                              <span>+{req.selectedAddons.length} Add-on{req.selectedAddons.length > 1 ? 's' : ''}</span>
                            )}
                            {req.preferredDate && (
                              <span>Target: {req.preferredDate}</span>
                            )}
                          </div>
                        </div>

                        {/* Approved Price & Duration Box */}
                        <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex flex-col justify-between space-y-3">
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068]">
                              Approved Price
                            </div>
                            <div className="text-sm font-bold mt-0.5">
                              {req.approvedPrice !== null && req.approvedPrice !== undefined ? (
                                <span className="text-[#263D2B] text-base font-extrabold">
                                  ${req.approvedPrice} CAD
                                </span>
                              ) : (
                                <span className="text-amber-800 font-medium text-xs">
                                  Pending salon review
                                </span>
                              )}
                            </div>

                            <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] mt-2">
                              Approved Duration
                            </div>
                            <div className="text-xs font-semibold text-[#10110F] mt-0.5">
                              {req.approvedDuration || (
                                <span className="text-[#6B7068] font-normal italic">
                                  To be confirmed
                                </span>
                              )}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setSelectedDetailRequest(req)}
                            className="w-full py-2 px-3 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-[#F7F4ED] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Full Request</span>
                          </button>
                        </div>
                      </div>

                      {/* Status Explanation Bar */}
                      <div className="text-[11px] text-[#465640] bg-[#F7F4ED]/50 p-2.5 rounded-xl border border-[#DCE1D8]/60 flex items-center gap-2">
                        <HelpCircle className="w-3.5 h-3.5 text-[#263D2B] shrink-0" />
                        <span>{getStatusExplanation(req.status)}</span>
                      </div>

                      {/* Quick Quote Decision Buttons if Quote Provided */}
                      {isQuoteProvided && (
                        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                          <div className="text-xs text-emerald-950">
                            <strong>Quote ready:</strong> ${req.approvedPrice} CAD • {req.approvedDuration}. Please accept or decline to proceed.
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleAcceptQuote(req.id)}
                              className="px-4 py-1.5 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-white text-xs font-bold shadow-xs transition-colors"
                            >
                              Accept Quote
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeclineQuote(req.id)}
                              className="px-3 py-1.5 rounded-xl border border-rose-300 text-rose-800 hover:bg-rose-100 text-xs font-semibold transition-colors"
                            >
                              Decline
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Proceed to Booking button if Quote Approved */}
                      {isApproved && (
                        <div className="p-3.5 rounded-2xl bg-[#263D2B]/10 border border-[#263D2B]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                          <div className="text-xs text-[#263D2B] font-semibold">
                            ✓ Customization approved! Ready to schedule your appointment with approved duration & price.
                          </div>

                          <Link
                            to={`/book-appointment?service=${req.serviceId}&customRequestId=${req.id}`}
                            className="px-4 py-2 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 whitespace-nowrap"
                          >
                            <span>Proceed to Appointment Booking</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* SERVICE PICKER MODAL (ALL 85 SERVICES FROM CATALOG)                */}
        {/* ================================================================= */}
        {showServicePickerModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden my-6">
              
              {/* Modal Header */}
              <div className="p-5 border-b border-[#DCE1D8] flex items-center justify-between bg-[#F7F4ED]">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#10110F]">
                    Select Service from Salon Catalog (85 Services)
                  </h3>
                  <p className="text-xs text-[#465640]">
                    Every salon service supports bespoke client customization.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowServicePickerModal(false)}
                  className="p-2 rounded-xl text-[#6B7068] hover:text-[#10110F] hover:bg-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filters & Search */}
              <div className="p-4 border-b border-[#DCE1D8] bg-white space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A8B5A0]" />
                  <input
                    type="text"
                    value={serviceSearch}
                    onChange={(e) => setServiceSearch(e.target.value)}
                    placeholder="Search by service name or description..."
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-[#10110F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1 rounded-xl text-[11px] font-semibold transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-[#263D2B] text-white'
                        : 'bg-[#F7F4ED] text-[#465640] hover:bg-[#EBEFE8]'
                    }`}
                  >
                    All Categories ({ALL_SERVICES.length})
                  </button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1 rounded-xl text-[11px] font-semibold transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-[#263D2B] text-white'
                          : 'bg-[#F7F4ED] text-[#465640] hover:bg-[#EBEFE8]'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Services Grid */}
              <div className="p-4 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pickerFilteredServices.map(service => (
                  <div
                    key={service.id}
                    onClick={() => {
                      setSelectedServiceId(service.id);
                      setShowServicePickerModal(false);
                    }}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      selectedServiceId === service.id
                        ? 'bg-[#263D2B]/10 border-[#263D2B]'
                        : 'bg-[#F7F4ED]/50 border-[#DCE1D8] hover:border-[#263D2B]/50 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {service.image ? (
                        <img 
                          src={service.image} 
                          alt={service.name} 
                          className="w-12 h-12 rounded-xl object-cover border border-[#DCE1D8] shrink-0" 
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-[#263D2B]/10 border border-[#DCE1D8] flex items-center justify-center text-[#263D2B] shrink-0 font-serif font-bold text-sm">
                          GJ
                        </div>
                      )}
                      <div>
                        <div className="text-[10px] text-[#465640] font-bold uppercase tracking-wider">
                          {service.categoryName || service.category}
                        </div>
                        <h5 className="font-serif text-xs font-bold text-[#10110F]">
                          {service.name}
                        </h5>
                        <div className="text-[11px] text-[#263D2B] font-semibold">
                          ${service.price} CAD • {service.durationDisplay || service.duration || '45 min'}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                        selectedServiceId === service.id
                          ? 'bg-[#263D2B] text-white'
                          : 'bg-white border border-[#DCE1D8] text-[#10110F]'
                      }`}
                    >
                      {selectedServiceId === service.id ? 'Selected' : 'Select'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* REQUEST DETAILS MODAL (FULL INSPECTION, QUOTE DECISION & CHAT)     */}
        {/* ================================================================= */}
        {selectedDetailRequest && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden my-6">
              
              {/* Modal Top Header */}
              <div className="p-6 border-b border-[#DCE1D8] flex items-center justify-between bg-[#F7F4ED]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-[#263D2B]">
                      Request #{selectedDetailRequest.id}
                    </span>
                    {renderStatusBadge(selectedDetailRequest.status)}
                  </div>
                  <h3 className="text-xl font-serif text-[#10110F]">
                    {selectedDetailRequest.serviceName}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedDetailRequest(null);
                    setClarificationSuccess('');
                  }}
                  className="p-2 rounded-xl text-[#6B7068] hover:text-[#10110F] hover:bg-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#10110F]">
                
                {/* 1. Status & Pricing Breakdown Banner */}
                <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#465640] uppercase tracking-wider text-[11px]">
                      Quotation & Duration Status
                    </span>
                    <span className="text-[11px] text-[#6B7068]">
                      Submitted: {new Date(selectedDetailRequest.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1 border-t border-[#DCE1D8]">
                    <div>
                      <span className="text-[10px] text-[#6B7068] uppercase font-bold block">
                        Approved Price
                      </span>
                      <div className="text-base font-extrabold mt-0.5">
                        {selectedDetailRequest.approvedPrice !== null && selectedDetailRequest.approvedPrice !== undefined ? (
                          <span className="text-[#263D2B]">${selectedDetailRequest.approvedPrice} CAD</span>
                        ) : (
                          <span className="text-amber-800 font-semibold text-xs">Pending salon review</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#6B7068] uppercase font-bold block">
                        Approved Duration
                      </span>
                      <div className="text-base font-semibold text-[#10110F] mt-0.5">
                        {selectedDetailRequest.approvedDuration || (
                          <span className="text-[#6B7068] font-normal text-xs italic">To be confirmed</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Salon Notes / Condition Details */}
                  {selectedDetailRequest.salonNotes && (
                    <div className="pt-2 border-t border-[#DCE1D8]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                        Salon Artist Notes & Conditions:
                      </span>
                      <p className="text-xs text-[#10110F] italic bg-white p-3 rounded-xl border border-[#DCE1D8] mt-1 leading-relaxed">
                        “{selectedDetailRequest.salonNotes}”
                      </p>
                    </div>
                  )}
                </div>

                {/* 2. Customer Quote Action Buttons */}
                {selectedDetailRequest.status === 'Quote Provided' && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-3">
                    <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-700" />
                      <span>Quote Decision Required</span>
                    </div>
                    <p className="text-xs text-emerald-900 leading-relaxed">
                      The salon has evaluated your vision and provided a confirmed quote of <strong>${selectedDetailRequest.approvedPrice} CAD</strong> for an estimated duration of <strong>{selectedDetailRequest.approvedDuration}</strong>. Please confirm your decision below.
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => handleAcceptQuote(selectedDetailRequest.id)}
                        className="px-5 py-2.5 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-white text-xs font-bold transition-colors shadow-xs"
                      >
                        Accept Quote
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeclineQuote(selectedDetailRequest.id)}
                        className="px-4 py-2.5 rounded-xl border border-rose-300 bg-white text-rose-800 hover:bg-rose-50 text-xs font-semibold transition-colors"
                      >
                        Decline Quote
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. Quote Accepted Banner & Proceed to Booking */}
                {(selectedDetailRequest.status === 'Approved' || selectedDetailRequest.customerQuoteDecision === 'accepted') && (
                  <div className="p-4 rounded-2xl bg-[#263D2B]/10 border border-[#263D2B]/30 space-y-3">
                    <div className="flex items-center gap-2 text-[#263D2B] font-bold text-xs">
                      <CheckCircle className="w-4 h-4" />
                      <span>Quote Accepted & Ready for Booking</span>
                    </div>
                    <p className="text-xs text-[#465640]">
                      Your quote decision is confirmed in our database. Continue to our appointment booking system to reserve your date and time with the approved duration.
                    </p>
                    <Link
                      to={`/book-appointment?service=${selectedDetailRequest.serviceId}&customRequestId=${selectedDetailRequest.id}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                    >
                      <span>Proceed to Appointment Booking</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}

                {/* 4. Awaiting Customer Response Form */}
                {selectedDetailRequest.status === 'Awaiting Customer Response' && (
                  <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-3">
                    <div className="flex items-center gap-1.5 text-purple-950 font-bold text-xs">
                      <MessageSquare className="w-4 h-4 text-purple-700" />
                      <span>The Salon Has Requested Clarification</span>
                    </div>
                    <p className="text-xs text-purple-900 leading-relaxed italic bg-white p-3 rounded-xl border border-purple-200">
                      “{selectedDetailRequest.salonNotes || 'Please provide additional details regarding your preferred tone or hair length.'}”
                    </p>

                    {clarificationSuccess ? (
                      <div className="p-3 rounded-xl bg-white border border-purple-300 text-purple-900 text-xs font-semibold">
                        {clarificationSuccess}
                      </div>
                    ) : (
                      <div className="space-y-2 pt-1">
                        <textarea
                          rows={3}
                          value={customerClarificationText}
                          onChange={(e) => setCustomerClarificationText(e.target.value)}
                          placeholder="Type your clarification or response to Janki Khatroja..."
                          className="w-full p-3 text-xs rounded-xl border border-purple-200 bg-white text-[#10110F] focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                        <button
                          type="button"
                          onClick={() => handleSendClarification(selectedDetailRequest.id)}
                          className="px-4 py-2 rounded-xl bg-purple-900 hover:bg-purple-950 text-white text-xs font-semibold transition-colors"
                        >
                          Submit Clarification to Salon
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 5. Complete Submitted Requirements Review */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#465640]">
                    Submitted Vision & Requirements
                  </h4>
                  <div className="p-4 rounded-2xl bg-[#F7F4ED]/60 border border-[#DCE1D8] text-xs leading-relaxed italic">
                    “{selectedDetailRequest.customerVision || 'No detailed vision specified'}”
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {selectedDetailRequest.desiredResult && (
                      <div className="p-3 rounded-xl bg-[#F7F4ED]/40 border border-[#DCE1D8]">
                        <span className="font-bold text-[#465640] block">Desired Result:</span>
                        <span className="text-[#10110F]">{selectedDetailRequest.desiredResult}</span>
                      </div>
                    )}
                    {selectedDetailRequest.focusAreas && (
                      <div className="p-3 rounded-xl bg-[#F7F4ED]/40 border border-[#DCE1D8]">
                        <span className="font-bold text-[#465640] block">Focus Areas:</span>
                        <span className="text-[#10110F]">{selectedDetailRequest.focusAreas}</span>
                      </div>
                    )}
                  </div>

                  {/* Things to Avoid */}
                  {selectedDetailRequest.thingsToAvoid && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs">
                      <span className="font-bold text-rose-900 block">Strict Constraints / Things to Avoid:</span>
                      <span className="text-rose-950">{selectedDetailRequest.thingsToAvoid}</span>
                    </div>
                  )}

                  {/* Sensitivities */}
                  {selectedDetailRequest.sensitivities && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                      <span className="font-bold text-amber-900 block">Sensitivities & Allergies:</span>
                      <span className="text-amber-950">{selectedDetailRequest.sensitivities}</span>
                    </div>
                  )}

                  {/* Inspiration Photos */}
                  {((selectedDetailRequest.inspirationPhotos?.length > 0) || selectedDetailRequest.inspirationPhoto) && (
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-bold text-[#465640] uppercase tracking-wider block">
                        Inspiration Photos ({selectedDetailRequest.inspirationPhotos?.length || 1})
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {(selectedDetailRequest.inspirationPhotos || [selectedDetailRequest.inspirationPhoto]).map((photo, i) => {
                          if (!photo || !photo.dataUrl) return null;
                          return (
                            <div key={photo.id || i} className="p-1.5 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] space-y-1">
                              <img
                                src={photo.dataUrl}
                                alt={`Inspiration ${i + 1}`}
                                className="w-full aspect-square object-cover rounded-lg"
                              />
                              {photo.description && (
                                <p className="text-[10px] text-[#465640] truncate italic">
                                  {photo.description}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 6. History Timeline */}
                {selectedDetailRequest.history?.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-[#DCE1D8]">
                    <span className="text-[11px] font-bold text-[#465640] uppercase tracking-wider block">
                      Audit Trail & Request History
                    </span>
                    <div className="space-y-1.5">
                      {selectedDetailRequest.history.map((h, i) => (
                        <div key={i} className="text-[11px] p-2 rounded-lg bg-[#F7F4ED] border border-[#DCE1D8]/60 flex items-start justify-between gap-2">
                          <div>
                            <span className="font-bold text-[#10110F]">{h.action}</span>
                            <span className="text-[#6B7068] ml-1">by {h.by || 'Salon'}</span>
                            {h.notes && <p className="text-[#465640] italic mt-0.5">{h.notes}</p>}
                          </div>
                          <span className="text-[10px] text-[#6B7068] shrink-0">
                            {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
