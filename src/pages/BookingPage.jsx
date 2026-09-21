import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  CheckCircle, 
  Sparkles, 
  AlertCircle, 
  ArrowLeft, 
  Heart, 
  ShieldCheck, 
  Trash2, 
  ChevronDown,
  FileText,
  MapPin,
  RefreshCw,
  Scissors,
  Star,
  Search,
  Check,
  X,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import floralImg from '../assets/floral-booking.jpg';
import { ALL_SERVICES } from '../data/servicesData';
import { SALON_INFO } from '../data/salonData';
import { getWhatsAppBookingUrl, getWhatsAppConfig, sendWhatsAppBookingDirect, formatDisplayPhone } from '../utils/whatsapp';
import salonDB from '../db/salonDatabase';

export default function BookingPage({ isSection = false }) {
  const [searchParams] = useSearchParams();
  const preselectedServiceId = searchParams.get('service');
  const { phoneNumber: whatsappNumber, rawPhone } = getWhatsAppConfig();

  // Dynamic services pulled from salonDatabase
  const [availableServices, setAvailableServices] = useState(() => salonDB.getServices());

  useEffect(() => {
    setAvailableServices(salonDB.getServices());
    const unsub = salonDB.subscribe(() => {
      setAvailableServices(salonDB.getServices());
    });
    return () => unsub();
  }, []);

  // Group all services dynamically by category
  const serviceCategories = [
    {
      name: 'HAIR CARE',
      key: 'hair',
      services: availableServices.filter(s => s.category === 'hair' && s.active !== false)
    },
    {
      name: 'SKIN CARE',
      key: 'skin',
      services: availableServices.filter(s => s.category === 'skin' && s.active !== false)
    },
    {
      name: 'HAIR REMOVAL & BEAUTY EXTRAS',
      key: 'waxing',
      services: availableServices.filter(s => s.category === 'waxing' && s.active !== false)
    },
    {
      name: 'NAIL CARE',
      key: 'nails',
      services: availableServices.filter(s => s.category === 'nails' && s.active !== false)
    },
    {
      name: 'MAKEUP',
      key: 'makeup',
      services: availableServices.filter(s => s.category === 'makeup' && s.active !== false)
    },
    {
      name: 'SPA & WELLNESS',
      key: 'spa',
      services: availableServices.filter(s => s.category === 'spa' && s.active !== false)
    }
  ];

  // Time slot options
  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM'
  ];

  // Form State - Controlled inputs by Unique Service ID
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [serviceSearchQuery, setServiceSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Directly find selected service object using unique ID
  const selectedServiceData = ALL_SERVICES.find(
    (service) => service.id === selectedServiceId || service.name === selectedServiceId
  );

  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [savedAppointments, setSavedAppointments] = useState([]);
  const [showAppointmentsModal, setShowAppointmentsModal] = useState(false);

  // Minimum selectable date = Today (YYYY-MM-DD)
  const todayStr = new Date().toISOString().split('T')[0];

  // Click outside to close service dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServiceDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load past appointments from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('girl-looked-for-you-appointments');
      if (stored) {
        setSavedAppointments(JSON.parse(stored));
      }
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }
  }, []);

  // Pre-fill service if parameter is provided in query string or custom event
  useEffect(() => {
    if (preselectedServiceId) {
      const matched = ALL_SERVICES.find(
        (s) => s.id === preselectedServiceId || s.name.toLowerCase() === preselectedServiceId.toLowerCase()
      );
      if (matched) {
        setSelectedServiceId(matched.id);
      }
    }
  }, [preselectedServiceId]);

  useEffect(() => {
    const handleServiceSelect = (e) => {
      if (e.detail) {
        setSelectedServiceId(e.detail);
      }
    };
    window.addEventListener('select-booking-service', handleServiceSelect);
    return () => window.removeEventListener('select-booking-service', handleServiceSelect);
  }, []);

  // Validation functions
  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'service':
        if (!value || value.trim() === '') {
          error = 'Please select a service.';
        }
        break;
      case 'date':
        if (!value) {
          error = 'Please select a date.';
        } else if (value < todayStr) {
          error = 'Date cannot be in the past.';
        }
        break;
      case 'time':
        if (!value || value.trim() === '') {
          error = 'Please select a time.';
        }
        break;
      case 'name':
        if (!value || value.trim().length < 2) {
          error = 'Please enter your name (at least 2 characters).';
        }
        break;
      case 'phone':
        const phoneDigits = value.replace(/\D/g, '');
        if (!value || phoneDigits.length < 8) {
          error = 'Please enter a valid phone number.';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value.trim())) {
          error = 'Please enter a valid email address.';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    const err = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSelectService = (service) => {
    if (!service) {
      setSelectedServiceId('');
      const err = validateField('service', '');
      setErrors((prev) => ({ ...prev, service: err }));
    } else {
      setSelectedServiceId(service.id);
      const err = validateField('service', service.id);
      setErrors((prev) => ({ ...prev, service: err }));
    }
    setServiceDropdownOpen(false);
    setServiceSearchQuery('');
  };

  const handleDateChange = (e) => {
    const val = e.target.value;
    setSelectedDate(val);
    const err = validateField('date', val);
    setErrors((prev) => ({ ...prev, date: err }));
  };

  const handleTimeChange = (e) => {
    const val = e.target.value;
    setSelectedTime(val);
    const err = validateField('time', val);
    setErrors((prev) => ({ ...prev, time: err }));
  };

  const validateAll = () => {
    const newErrors = {
      service: validateField('service', selectedServiceId),
      date: validateField('date', selectedDate),
      time: validateField('time', selectedTime),
      name: validateField('name', formData.name),
      phone: validateField('phone', formData.phone),
      email: validateField('email', formData.email)
    };

    const activeErrors = {};
    Object.keys(newErrors).forEach((key) => {
      if (newErrors[key]) {
        activeErrors[key] = newErrors[key];
      }
    });

    setErrors(activeErrors);
    return Object.keys(activeErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);

    const bookingPayload = {
      serviceId: selectedServiceData ? selectedServiceData.id : selectedServiceId,
      service: selectedServiceData ? selectedServiceData.name : 'Salon Treatment',
      serviceDuration: selectedServiceData ? selectedServiceData.duration : '60 mins',
      servicePrice: selectedServiceData ? selectedServiceData.price : 85,
      serviceImage: selectedServiceData ? selectedServiceData.image : floralImg,
      serviceCategory: selectedServiceData ? selectedServiceData.categoryName : 'Hair Care',
      date: selectedDate,
      time: selectedTime,
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      notes: formData.notes.trim()
    };

    // Save with salonDatabase smart auto-accept logic
    const newBooking = salonDB.addAppointment(bookingPayload);

    // 1. Immediately open WhatsApp with pre-filled details in the user's click gesture stack (prevents popup blocker)
    try {
      sendWhatsAppBookingDirect(newBooking);
    } catch (err) {
      console.warn('WhatsApp auto-open error:', err);
    }

    // 2. Show confirmation voucher
    setConfirmedBooking(newBooking);
    setIsSubmitting(false);

    try {
      confetti({
        particleCount: 110,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#D83A75', '#E95E92', '#F3E5AB', '#C59A45']
      });
    } catch (err) {}
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setSelectedServiceId('');
    setFormData({
      name: '',
      phone: '',
      email: '',
      notes: ''
    });
    setErrors({});
  };

  const handleDeleteSaved = (id) => {
    salonDB.deleteAppointment(id);
    const updated = savedAppointments.filter((a) => a.id !== id);
    setSavedAppointments(updated);
  };

  // Filtered categories for searchable dropdown
  const filteredCategories = serviceCategories.map((cat) => {
    const query = serviceSearchQuery.trim().toLowerCase();
    if (!query) return cat;

    const filtered = cat.services.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.categoryName.toLowerCase().includes(query) ||
        s.duration.toLowerCase().includes(query) ||
        s.price.toString().includes(query)
    );

    return {
      ...cat,
      services: filtered
    };
  }).filter((cat) => cat.services.length > 0);

  const totalFilteredCount = filteredCategories.reduce((acc, cat) => acc + cat.services.length, 0);

  return (
    <div 
      id="booking"
      className={`w-full bg-[#FAF6F4] text-brand-charcoal ${
        isSection ? 'py-16 sm:py-24' : 'min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24'
      } px-3 sm:px-6 lg:px-8 selection:bg-brand-pink selection:text-white`}
    >
      
      {/* 1. TOP STEP INTRO SECTION (Well spaced, never hidden behind header) */}
      <div className="max-w-[1180px] mx-auto mb-6 sm:mb-10">
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Step Badge: 04 */}
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-brand-pink text-white font-serif font-bold text-lg sm:text-2xl flex items-center justify-center shadow-lg shadow-brand-pink/30 flex-shrink-0 border-2 border-white">
            04
          </div>

          {/* Heading & Subtitle */}
          <div>
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#2A1620] tracking-tight leading-tight">
              Book Appointment
            </h1>
            <p className="text-[#87586A] text-xs sm:text-sm md:text-base font-medium mt-0.5">
              Select service, date, time and fill details. Instant auto-confirmation for free slots.
            </p>
          </div>
        </div>
      </div>

      {/* 2. MAIN BOOKING CARD (Centered, max-width: 1180px, 24px border radius, subtle border & shadow) */}
      <div className="max-w-[1180px] mx-auto bg-white rounded-2xl sm:rounded-[24px] border border-[#ECDCDF] shadow-[0_20px_60px_rgba(42,22,32,0.06)] overflow-hidden">
        
        <div className="p-4 sm:p-8 lg:p-12">
          
          {/* SUCCESS CONFIRMATION STATE WITH WHATSAPP INTEGRATION */}
          {confirmedBooking ? (
            <div className="max-w-2xl mx-auto text-center py-4 sm:py-10 animate-fade-in">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${confirmedBooking.isAutoAccepted ? 'bg-emerald-100 text-emerald-600 border-2 border-emerald-300' : 'bg-amber-100 text-amber-600 border-2 border-amber-300'} flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-inner`}>
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>

              {confirmedBooking.isAutoAccepted ? (
                <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-2 border border-emerald-300 shadow-xs">
                  ✨ Auto-Accepted • Slot Confirmed
                </span>
              ) : (
                <span className="inline-block px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-2 border border-amber-300 shadow-xs">
                  ⏳ Pending Review • Working Progress Conflict
                </span>
              )}

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#2A1620] mb-2 sm:mb-3">
                {confirmedBooking.isAutoAccepted ? 'Appointment Confirmed & Reserved' : 'Appointment Request Received'}
              </h2>

              <p className="text-[#6D4C58] text-xs sm:text-base max-w-md mx-auto mb-6 sm:mb-8 leading-relaxed">
                {confirmedBooking.isAutoAccepted ? (
                  <>Thank you, <strong>{confirmedBooking.customerName}</strong>! Your appointment has been <strong>automatically accepted and confirmed</strong> for {confirmedBooking.date} at {confirmedBooking.time}.</>
                ) : (
                  <>Thank you, <strong>{confirmedBooking.customerName}</strong>! Another client service is currently scheduled during this time slot. Our concierge has registered your priority request and will coordinate with you on WhatsApp immediately.</>
                )}
              </p>

              {/* Summary Voucher Card */}
              <div className="bg-[#FAF5F6] border border-[#EEDDE2] rounded-2xl p-4 sm:p-8 text-left space-y-3 sm:space-y-4 shadow-sm max-w-lg mx-auto mb-6 sm:mb-8">
                <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-[#EEDDE2]">
                  <span className="text-[10px] sm:text-xs text-[#8A6A74] uppercase font-bold tracking-wider">Booking ID</span>
                  <span className="font-mono font-bold text-brand-pink text-sm sm:text-base">{confirmedBooking.id}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-[#8A6A74] block text-[10px] sm:text-[11px]">Selected Service</span>
                    <span className="font-bold text-[#2A1620]">{confirmedBooking.service}</span>
                  </div>
                  <div>
                    <span className="text-[#8A6A74] block text-[10px] sm:text-[11px]">Requested Date & Time</span>
                    <span className="font-bold text-[#2A1620]">{confirmedBooking.date} • {confirmedBooking.time}</span>
                  </div>
                  <div>
                    <span className="text-[#8A6A74] block text-[10px] sm:text-[11px]">Guest Name</span>
                    <span className="font-semibold text-[#2A1620]">{confirmedBooking.customerName}</span>
                  </div>
                  <div>
                    <span className="text-[#8A6A74] block text-[10px] sm:text-[11px]">Phone Number</span>
                    <span className="font-semibold text-[#2A1620]">{confirmedBooking.phone}</span>
                  </div>
                </div>

                {confirmedBooking.notes && (
                  <div className="pt-2.5 sm:pt-3 border-t border-[#EEDDE2] text-xs">
                    <span className="text-[#8A6A74] block text-[10px] sm:text-[11px]">Special Requests</span>
                    <span className="text-[#2A1620] italic">"{confirmedBooking.notes}"</span>
                  </div>
                )}

                <div className="pt-2.5 sm:pt-3 border-t border-[#EEDDE2] flex flex-wrap items-center justify-between gap-2 text-xs text-[#6D4C58]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-pink flex-shrink-0" />
                    <span>450 Bank St, Ottawa, ON</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-[#8A6A74]">{confirmedBooking.submittedAt}</span>
                </div>
              </div>

              {/* WHATSAPP CONFIRMATION ACTION BUTTON */}
              <div className="max-w-lg mx-auto mb-6 p-4 rounded-2xl bg-emerald-50/90 border border-emerald-300 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs">
                    <MessageCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Instant WhatsApp Dispatch</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 leading-tight">
                    Sending to Ottawa Concierge: <strong className="font-mono text-emerald-950 font-bold">{formatDisplayPhone(whatsappNumber)}</strong>
                  </p>
                </div>

                <a
                  href={getWhatsAppBookingUrl(confirmedBooking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    try {
                      sendWhatsAppBookingDirect(confirmedBooking);
                    } catch (e) {}
                  }}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/30 transition-all flex-shrink-0 active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto min-h-[44px] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-pink/30 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Book Another Appointment</span>
                </button>

                <Link
                  to="/services"
                  className="w-full sm:w-auto min-h-[44px] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white hover:bg-brand-pink-light border border-[#EEDDE2] text-[#2A1620] font-semibold text-xs uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2"
                >
                  <span>Explore All Services</span>
                </Link>
              </div>
            </div>
          ) : (
            
            /* 2-COLUMN BALANCED DESKTOP LAYOUT (55% Form / 45% Floral Artwork) */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* LEFT COLUMN: 55% (Form) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1620] tracking-tight">
                    Appointment Details
                  </h2>
                  <p className="text-xs sm:text-sm text-[#87586A] mt-1">
                    Select your beauty ritual from our complete 86-treatment menu below.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                  
                  {/* 1. SEARCHABLE & SCROLLABLE SELECT SERVICE DROPDOWN (ALL 86 SERVICES GROUPED BY CATEGORY) */}
                  <div ref={dropdownRef} className="relative">
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="serviceSelectTrigger" className="block text-xs font-bold text-[#3B1E2B] uppercase tracking-wide">
                        Select Service <span className="text-brand-pink">*</span>
                      </label>
                      <span className="text-[11px] font-semibold text-brand-pink bg-brand-pink-light px-2 py-0.5 rounded-full">
                        86 Treatments Available
                      </span>
                    </div>

                    {/* Custom Dropdown Trigger Button */}
                    <button
                      type="button"
                      id="serviceSelectTrigger"
                      onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
                      className={`w-full h-12 px-4 bg-[#FAF7F8] border rounded-xl text-left text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer ${
                        errors.service 
                          ? 'border-red-400 bg-red-50/20' 
                          : serviceDropdownOpen 
                            ? 'border-brand-pink ring-2 ring-brand-pink/20 bg-white' 
                            : 'border-[#E6D4D9] hover:border-brand-pink/50'
                      }`}
                      aria-haspopup="listbox"
                      aria-expanded={serviceDropdownOpen}
                    >
                      <span className={`truncate font-medium ${selectedServiceData ? 'text-[#2A1620]' : 'text-[#8A6A74]'}`}>
                        {selectedServiceData 
                          ? `${selectedServiceData.name} (${selectedServiceData.duration} • $${selectedServiceData.price} CAD)` 
                          : '-- Choose a beauty treatment --'}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-[#87586A] flex-shrink-0 transition-transform duration-200 ${
                        serviceDropdownOpen ? 'rotate-180 text-brand-pink' : ''
                      }`} />
                    </button>

                    {/* Dropdown Floating Menu with Search & Category Groupings */}
                    {serviceDropdownOpen && (
                      <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-[#E6D4D9] rounded-2xl shadow-2xl overflow-hidden animate-scale-up">
                        
                        {/* Live Search Input inside Dropdown */}
                        <div className="p-3 border-b border-[#F0E4E7] bg-[#FCF8F9] sticky top-0 z-10">
                          <div className="relative">
                            <Search className="w-4 h-4 text-[#87586A] absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={serviceSearchQuery}
                              onChange={(e) => setServiceSearchQuery(e.target.value)}
                              placeholder="Search 86 services (e.g. Hair Spa, Balayage, Facial, Threading)..."
                              className="w-full pl-9 pr-8 py-2 bg-white border border-[#E6D4D9] rounded-xl text-xs text-[#2A1620] placeholder-[#B59AA3] focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
                              autoFocus
                            />
                            {serviceSearchQuery && (
                              <button
                                type="button"
                                onClick={() => setServiceSearchQuery('')}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Scrollable Categories and Services List */}
                        <div className="max-h-72 overflow-y-auto divide-y divide-[#F6EDF0]">
                          
                          {/* Default / Deselect Option */}
                          <div
                            onClick={() => handleSelectService(null)}
                            className={`px-4 py-2.5 text-xs text-[#8A6A74] hover:bg-brand-pink-light hover:text-brand-pink cursor-pointer transition-colors ${
                              !selectedServiceId ? 'bg-brand-pink-light font-semibold text-brand-pink' : ''
                            }`}
                          >
                            -- Choose a beauty treatment --
                          </div>

                          {filteredCategories.length > 0 ? (
                            filteredCategories.map((cat) => (
                              <div key={cat.key} className="py-2">
                                {/* Category Header */}
                                <div className="px-4 py-1.5 bg-[#FAF3F5] text-[10px] font-bold tracking-[0.16em] uppercase text-[#8A1A4A] flex items-center justify-between">
                                  <span>{cat.name}</span>
                                  <span className="text-[9px] bg-white text-brand-pink px-2 py-0.5 rounded-full border border-brand-pink/20 font-mono">
                                    {cat.services.length} {cat.services.length === 1 ? 'Service' : 'Services'}
                                  </span>
                                </div>

                                {/* Service Items */}
                                <div className="py-1">
                                  {cat.services.map((service) => {
                                    const isSelected = selectedServiceId === service.id;
                                    return (
                                      <div
                                        key={service.id}
                                        onClick={() => handleSelectService(service)}
                                        className={`px-4 py-2 text-xs flex items-center justify-between hover:bg-[#FDF2F6] cursor-pointer transition-colors ${
                                          isSelected ? 'bg-brand-pink-light/70 font-bold text-brand-pink' : 'text-[#2A1620]'
                                        }`}
                                      >
                                        <div className="flex items-center gap-2 truncate pr-2">
                                          {isSelected && <Check className="w-3.5 h-3.5 text-brand-pink flex-shrink-0" />}
                                          <span className="truncate">{service.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0 text-[11px]">
                                          <span className="text-[#87586A] bg-gray-100 px-2 py-0.5 rounded-md text-[10px]">
                                            {service.duration}
                                          </span>
                                          <span className="font-serif font-bold text-[#8A1A4A]">
                                            ${service.price} CAD
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="p-6 text-center text-xs text-[#87586A]">
                              No services found matching "{serviceSearchQuery}".
                            </div>
                          )}

                        </div>

                        {/* Footer Status Bar in Dropdown */}
                        <div className="px-4 py-2 bg-[#FAF5F6] border-t border-[#F0E4E7] text-[10px] text-[#87586A] flex items-center justify-between">
                          <span>Showing {totalFilteredCount} of 86 treatments</span>
                          <span className="text-brand-pink font-semibold">GIRL LOOKED FOR YOU</span>
                        </div>

                      </div>
                    )}

                    {/* Validation Error Message */}
                    {errors.service && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 animate-fade-in">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{errors.service}</span>
                      </p>
                    )}
                  </div>

                  {/* 2-Column Row: Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Date */}
                    <div>
                      <label htmlFor="dateSelect" className="block text-xs font-bold text-[#3B1E2B] mb-1.5 uppercase tracking-wide">
                        Select Date <span className="text-brand-pink">*</span>
                      </label>
                      <input
                        type="date"
                        id="dateSelect"
                        min={todayStr}
                        value={selectedDate}
                        onChange={handleDateChange}
                        className={`w-full h-12 px-4 bg-[#FAF7F8] border rounded-xl text-xs sm:text-sm text-[#2A1620] focus:outline-none focus:ring-2 focus:ring-brand-pink/20 focus:border-brand-pink focus:bg-white transition-all cursor-pointer ${
                          errors.date ? 'border-red-400 bg-red-50/20' : 'border-[#E6D4D9]'
                        }`}
                      />
                      {errors.date && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 animate-fade-in">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{errors.date}</span>
                        </p>
                      )}
                    </div>

                    {/* Time */}
                    <div>
                      <label htmlFor="timeSelect" className="block text-xs font-bold text-[#3B1E2B] mb-1.5 uppercase tracking-wide">
                        Select Time <span className="text-brand-pink">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="timeSelect"
                          value={selectedTime}
                          onChange={handleTimeChange}
                          className={`w-full h-12 px-4 bg-[#FAF7F8] border rounded-xl text-xs sm:text-sm text-[#2A1620] appearance-none focus:outline-none focus:ring-2 focus:ring-brand-pink/20 focus:border-brand-pink focus:bg-white transition-all cursor-pointer ${
                            errors.time ? 'border-red-400 bg-red-50/20' : 'border-[#E6D4D9]'
                          }`}
                        >
                          <option value="">-- Choose time slot --</option>
                          {timeSlots.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#87586A] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                      {errors.time && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 animate-fade-in">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{errors.time}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 3. Your Name */}
                  <div>
                    <label htmlFor="nameInput" className="block text-xs font-bold text-[#3B1E2B] mb-1.5 uppercase tracking-wide">
                      Your Name <span className="text-brand-pink">*</span>
                    </label>
                    <input
                      type="text"
                      id="nameInput"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Enter your name"
                      className={`w-full h-12 px-4 bg-[#FAF7F8] border rounded-xl text-xs sm:text-sm text-[#2A1620] placeholder-[#B59AA3] focus:outline-none focus:ring-2 focus:ring-brand-pink/20 focus:border-brand-pink focus:bg-white transition-all ${
                        errors.name ? 'border-red-400 bg-red-50/20' : 'border-[#E6D4D9]'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 animate-fade-in">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* 4. Phone & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Number */}
                    <div>
                      <label htmlFor="phoneInput" className="block text-xs font-bold text-[#3B1E2B] mb-1.5 uppercase tracking-wide">
                        Phone Number <span className="text-brand-pink">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phoneInput"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="(613) 555-0182"
                        className={`w-full h-12 px-4 bg-[#FAF7F8] border rounded-xl text-xs sm:text-sm text-[#2A1620] placeholder-[#B59AA3] focus:outline-none focus:ring-2 focus:ring-brand-pink/20 focus:border-brand-pink focus:bg-white transition-all ${
                          errors.phone ? 'border-red-400 bg-red-50/20' : 'border-[#E6D4D9]'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 animate-fade-in">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label htmlFor="emailInput" className="block text-xs font-bold text-[#3B1E2B] mb-1.5 uppercase tracking-wide">
                        Email Address <span className="text-brand-pink">*</span>
                      </label>
                      <input
                        type="email"
                        id="emailInput"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="name@example.com"
                        className={`w-full h-12 px-4 bg-[#FAF7F8] border rounded-xl text-xs sm:text-sm text-[#2A1620] placeholder-[#B59AA3] focus:outline-none focus:ring-2 focus:ring-brand-pink/20 focus:border-brand-pink focus:bg-white transition-all ${
                          errors.email ? 'border-red-400 bg-red-50/20' : 'border-[#E6D4D9]'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 animate-fade-in">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 5. Additional Notes */}
                  <div>
                    <label htmlFor="notesInput" className="block text-xs font-bold text-[#3B1E2B] mb-1.5 uppercase tracking-wide">
                      Additional Notes <span className="text-[#87586A] font-normal lowercase">(optional)</span>
                    </label>
                    <textarea
                      id="notesInput"
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                      placeholder="Any special requests? (optional)"
                      className="w-full p-3 bg-[#FAF7F8] border border-[#E6D4D9] rounded-xl text-xs sm:text-sm text-[#2A1620] placeholder-[#B59AA3] focus:outline-none focus:ring-2 focus:ring-brand-pink/20 focus:border-brand-pink focus:bg-white transition-all resize-none"
                    />
                  </div>

                  {/* 6. Premium Full-Width Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 sm:h-[50px] px-6 rounded-xl bg-brand-pink hover:bg-brand-pink-hover text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-pink/30 hover:shadow-xl hover:shadow-brand-pink/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed transition-all cursor-pointer uppercase tracking-[0.14em]"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Opening WhatsApp...</span>
                        </>
                      ) : (
                        <>
                          <MessageCircle className="w-4 h-4" />
                          <span>Submit & Send on WhatsApp</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>

                {/* Stored Appointment Requests Counter */}
                {savedAppointments.length > 0 && (
                  <div className="pt-1 text-center">
                    <button
                      type="button"
                      onClick={() => setShowAppointmentsModal(true)}
                      className="text-xs font-semibold text-[#8A1A4A] hover:text-brand-pink hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Saved Appointment Requests ({savedAppointments.length})</span>
                    </button>
                  </div>
                )}

              </div>

              {/* RIGHT COLUMN: 45% (Dynamic Service Photo & Details Panel) */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div className="w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#FFF5F8] via-[#FDF0F5] to-[#F8E7EE] p-5 sm:p-7 border border-[#F0DFE5] shadow-inner space-y-4">
                  
                  {selectedServiceData ? (
                    /* DYNAMIC SELECTED SERVICE PREVIEW */
                    <div className="space-y-4 animate-fade-in" key={selectedServiceData.id}>
                      {/* Service Photo with Badges */}
                      <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl overflow-hidden bg-black/10 shadow-md border border-white/60 group">
                        <img
                          src={selectedServiceData.image || floralImg}
                          alt={selectedServiceData.name}
                          onError={(e) => {
                            e.currentTarget.src = floralImg;
                          }}
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        
                        {/* Category Tag Pill */}
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-brand-pink shadow-sm border border-brand-pink/20">
                          {selectedServiceData.categoryName}
                        </div>

                        {/* Duration & Price Pill */}
                        <div className="absolute bottom-3 right-3 bg-[#2A1620]/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-white shadow-sm flex items-center gap-1.5 border border-white/10">
                          <Clock className="w-3 h-3 text-brand-pink" />
                          <span>{selectedServiceData.duration} • ${selectedServiceData.price} CAD</span>
                        </div>
                      </div>

                      {/* Selected Service Information */}
                      <div className="space-y-1.5 text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-pink block">
                            SELECTED SERVICE
                          </span>
                          <span className="text-xs font-serif font-bold text-[#8A1A4A] bg-brand-pink-light px-2.5 py-0.5 rounded-full border border-brand-pink/20">
                            ${selectedServiceData.price} CAD
                          </span>
                        </div>

                        <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#2A1620] leading-tight">
                          {selectedServiceData.name}
                        </h3>

                        <p className="text-xs text-[#7A5060] leading-relaxed">
                          {selectedServiceData.description || "Personalized beauty care designed for your style."}
                        </p>
                      </div>

                      {/* Service Highlights / Features */}
                      {selectedServiceData.features && selectedServiceData.features.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-left">
                          {selectedServiceData.features.slice(0, 2).map((feat, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#6D4C58] bg-white/90 px-2.5 py-1.5 rounded-xl border border-[#ECDCDF]/70 shadow-2xs">
                              <Check className="w-3.5 h-3.5 text-brand-pink flex-shrink-0" />
                              <span className="truncate">{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Trust Pill Bar */}
                      <div className="pt-2 border-t border-[#ECDCDF]/70 flex items-center justify-between text-[11px] text-[#7A5060]">
                        <div className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-brand-pink" />
                          <span>Sanitized Tools</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>4.9★ Rated Treatment</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* DEFAULT FLORAL SALON PREVIEW (When no service is selected) */
                    <div className="space-y-4 animate-fade-in text-center">
                      <div className="relative aspect-[4/5] w-full max-w-[320px] mx-auto rounded-xl overflow-hidden bg-white/50 border border-white/60 shadow-sm flex items-center justify-center">
                        <img
                          src={floralImg}
                          alt="Floral Botanical Luxury Art"
                          className="w-full h-full object-contain object-center hover:scale-105 transition-transform duration-700"
                        />
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-pink block">
                          YOUR BEAUTY MOMENT
                        </span>
                        <h3 className="font-serif font-bold text-base sm:text-lg text-[#2A1620]">
                          Tailored Elegance & Wellness
                        </h3>
                        <p className="text-xs text-[#7A5060] leading-relaxed max-w-xs mx-auto">
                          Personalized care, thoughtful details, and a beautiful experience. Select any beauty ritual to view its photo and pricing.
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#ECDCDF]/70 flex items-center justify-center gap-4 text-[11px] text-[#7A5060]">
                        <div className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-brand-pink" />
                          <span>Sanitized Tools</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>4.9★ Rated Salon</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* 3. PAST APPOINTMENTS MODAL */}
      {showAppointmentsModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowAppointmentsModal(false)}
        >
          <div 
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-[#EEDDE2]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F4E9EC]">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#2A1620]">Saved Appointment Requests</h3>
                <p className="text-xs text-[#87586A]">Stored locally on your browser</p>
              </div>
              <button
                onClick={() => setShowAppointmentsModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {savedAppointments.map((app) => (
                <div key={app.id} className="p-4 rounded-xl bg-[#FAF5F6] border border-[#EEDDE2] flex items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-brand-pink">{app.id}</span>
                      <span className="text-[#87586A]">• {app.date} at {app.time}</span>
                    </div>
                    <div className="font-bold text-sm text-[#2A1620]">{app.service}</div>
                    <div className="text-[#87586A]">Guest: {app.customerName} ({app.phone})</div>
                  </div>

                  <button
                    onClick={() => handleDeleteSaved(app.id)}
                    className="p-2 text-[#87586A] hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
