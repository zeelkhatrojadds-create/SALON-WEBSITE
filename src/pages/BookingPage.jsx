import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin,
  User, 
  Phone, 
  Mail, 
  CheckCircle, 
  Sparkles, 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck, 
  Scissors, 
  Star, 
  Search, 
  Check, 
  X, 
  MessageCircle,
  FileText,
  ChevronRight,
  ChevronLeft,
  Sparkle,
  Home,
  RotateCcw
} from 'lucide-react';
import Logo from '../components/common/Logo';
import floralImg from '../assets/floral-booking.webp';
import jankiPhoto from '../assets/janki-khatroja.webp';
import { ALL_SERVICES, CATEGORIES } from '../data/servicesData';
import { getWhatsAppBookingUrl, getWhatsAppConfig, formatDisplayPhone } from '../utils/whatsapp';
import salonDB from '../db/salonDatabase';
import ScrollReveal from '../components/ScrollReveal/ScrollReveal';
import SafeServiceImage from '../components/common/SafeServiceImage';

const STYLISTS = [
  {
    id: 'janki',
    name: 'Janki Khatroja',
    role: 'Salon Owner & Master Beauty Director',
    experience: '12+ Yrs Experience • Main Artist',
    image: jankiPhoto || '/janki-khatroja.jpg',
    rating: '5.0★'
  }
];

const TIME_SLOTS = [
  '09:00 AM',
  '09:45 AM',
  '10:30 AM',
  '11:15 AM',
  '12:00 PM',
  '12:45 PM',
  '01:30 PM',
  '02:15 PM',
  '03:00 PM',
  '03:45 PM',
  '04:30 PM',
  '05:15 PM'
];

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preselectedServiceId = searchParams.get('service');

  const { phoneNumber: whatsappNumber } = getWhatsAppConfig();
  const [availableServices, setAvailableServices] = useState(() => salonDB.getServices());

  useEffect(() => {
    setAvailableServices(salonDB.getServices());
    const unsub = salonDB.subscribe(() => {
      setAvailableServices(salonDB.getServices());
    });
    return () => unsub();
  }, []);

  // Step State (1: Date & Time, 2: Customer Details, 3: Confirmation)
  const [currentStep, setCurrentStep] = useState(1);

  // Service Selection State
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [showAllServicesModal, setShowAllServicesModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [serviceSearchQuery, setServiceSearchQuery] = useState('');

  // Default to preselected service from URL slug/id or first service
  useEffect(() => {
    if (preselectedServiceId && availableServices.length > 0) {
      const target = String(preselectedServiceId).toLowerCase().trim();
      const match = availableServices.find(
        (s) =>
          (s.slug && s.slug.toLowerCase() === target) ||
          (s.id && s.id.toLowerCase() === target) ||
          s.name.toLowerCase() === target ||
          s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === target
      );
      if (match) {
        setSelectedServiceId(match.id);
        return;
      }
    }
    if (!selectedServiceId && availableServices.length > 0) {
      setSelectedServiceId(availableServices[0].id);
    }
  }, [preselectedServiceId, availableServices, selectedServiceId]);

  const selectedServiceObj = availableServices.find((s) => s.id === selectedServiceId) || availableServices[0] || {};
  const selectedStylistObj = STYLISTS[0]; // Janki Khatroja

  // Quick alternative services for left sidebar (excluding current selected)
  const alternativeServices = availableServices
    .filter((s) => s.id !== selectedServiceId && s.active !== false)
    .slice(0, 4);

  // Date selection state (min = tomorrow)
  const tomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState(tomorrowStr());
  const [selectedTime, setSelectedTime] = useState('09:45 AM');
  const [slotErrorMessage, setSlotErrorMessage] = useState('');

  // Calendar month view navigation state
  const [calendarViewDate, setCalendarViewDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const handlePrevMonth = () => {
    const minDate = new Date();
    const prevMonthDate = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() - 1, 1);
    if (
      prevMonthDate.getFullYear() < minDate.getFullYear() ||
      (prevMonthDate.getFullYear() === minDate.getFullYear() && prevMonthDate.getMonth() < minDate.getMonth())
    ) {
      return;
    }
    setCalendarViewDate(prevMonthDate);
  };

  const handleNextMonth = () => {
    setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 1));
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setSelectedTime('');
    setSlotErrorMessage('');
  };

  const isSlotBooked = (date, time) => {
    return salonDB.isSlotBooked(date, time);
  };

  // Form Details State
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
  const [showSavedModal, setShowSavedModal] = useState(false);

  // Load saved appointments from localStorage & subscribe to live database changes
  useEffect(() => {
    const syncBookings = () => {
      setSavedAppointments(salonDB.getAppointments());
    };
    syncBookings();
    const unsub = salonDB.subscribe(syncBookings);
    return () => unsub();
  }, []);

  const generateBookingReference = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `GGJ-${code}`;
  };

  // Form Validation
  const validateDetailsStep = () => {
    const newErrors = {};
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name (at least 2 characters).';
    }
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone || phoneDigits.length < 8) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleFinalSubmit = (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setSlotErrorMessage('');

    if (isSlotBooked(selectedDate, selectedTime)) {
      setIsSubmitting(false);
      setSlotErrorMessage("Sorry, this time slot was just booked. Please select another available time.");
      setSelectedTime('');
      setCurrentStep(1);
      return;
    }

    const refCode = generateBookingReference();

    const bookingPayload = {
      id: refCode,
      referenceCode: refCode,
      serviceId: selectedServiceObj ? selectedServiceObj.id : 'womens-haircut',
      service: selectedServiceObj ? selectedServiceObj.name : 'Salon Treatment',
      serviceDuration: selectedServiceObj ? selectedServiceObj.duration : '60 min',
      servicePrice: selectedServiceObj ? selectedServiceObj.price : 85,
      serviceImage: selectedServiceObj ? selectedServiceObj.image : floralImg,
      serviceCategory: selectedServiceObj ? selectedServiceObj.categoryName : 'Beauty Treatment',
      stylistId: selectedStylistObj.id,
      stylist: selectedStylistObj.name,
      stylistRole: selectedStylistObj.role,
      date: selectedDate,
      time: selectedTime,
      customerName: formData.name.trim(),
      customerPhone: formData.phone.trim(),
      customerEmail: formData.email.trim(),
      notes: formData.notes.trim(),
      createdAt: new Date().toISOString(),
      status: 'Pending'
    };

    salonDB.addAppointment(bookingPayload);
    setConfirmedBooking(bookingPayload);
    setIsSubmitting(false);
    setCurrentStep(3);

    import('canvas-confetti')
      .then(({ default: confetti }) => {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#263D2B', '#465640', '#A8B5A0', '#F7F4ED']
        });
      })
      .catch(() => {});
  };

  // Filtered services for modal dialog
  const modalFilteredServices = availableServices.filter((s) => {
    if (s.active === false) return false;
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const q = serviceSearchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      s.name.toLowerCase().includes(q) ||
      (s.categoryName && s.categoryName.toLowerCase().includes(q)) ||
      (s.description && s.description.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#10110F] font-sans selection:bg-[#263D2B] selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO BANNER */}
      {/* ========================================================================= */}
      <div className="bg-[#F7F4ED] text-[#10110F] relative overflow-hidden border-b border-[#DCE1D8] pt-[78px] sm:pt-[84px] lg:pt-[92px]">
        {/* Background Decorative Blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#263D2B]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        {/* Hero Title & Action Bar */}
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 relative z-10" stagger={true}>
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] text-[#263D2B] text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em]">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#263D2B]" />
              <span>ONLINE RESERVATION PORTAL</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-tight">
              Your Beauty Journey Starts Here
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7068]">
              Choose your service, pick a time, and let us take care of the rest.
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            {/* My Saved Bookings Pill Button */}
            <button
              type="button"
              onClick={() => setShowSavedModal(true)}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-full bg-white border border-[#DCE1D8] hover:border-[#263D2B] text-[#10110F] text-xs font-bold tracking-wider uppercase transition-all shadow-xs cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#263D2B]" />
              <span className="hidden xs:inline">My Bookings</span>
              <span className="xs:hidden">Bookings</span>
              {savedAppointments.length > 0 && (
                <span className="bg-[#263D2B] text-white text-[10.5px] font-bold px-2 py-0.5 rounded-full ml-1">
                  {savedAppointments.length}
                </span>
              )}
            </button>

            <div className="hidden lg:block text-right border-l border-[#DCE1D8] pl-5">
              <span className="text-[10px] text-[#6B7068] uppercase tracking-[0.2em] block">OTTAWA</span>
              <span className="font-serif text-xs font-semibold text-[#10110F] uppercase tracking-wider block">WOMEN'S BEAUTY STUDIO</span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN 3-COLUMN BOOKING ENGINE */}
      {/* ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* COLUMN 1: SELECTED SERVICE & ALTERNATIVE MENU (LEFT CARD) */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-4 sm:p-5 lg:p-6 border border-[#DCE1D8] shadow-md space-y-5 sm:space-y-6">
            <div className="space-y-4">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-[#F7F4ED] shadow-inner">
                <SafeServiceImage 
                  service={selectedServiceObj}
                  className="w-full h-full object-cover" 
                />
                <span className="absolute top-3 left-3 bg-[#F7F4ED]/95 text-[#10110F] text-[10px] font-bold px-3 py-1 rounded-full border border-[#DCE1D8]">
                  Selected Service
                </span>
              </div>

              <div>
                <h3 className="font-serif font-normal text-[#10110F] text-xl sm:text-2xl leading-tight">
                  {selectedServiceObj.name || 'Treatment'}
                </h3>
                <p className="text-xs text-[#6B7068] mt-1.5 line-clamp-3 font-sans">
                  {selectedServiceObj.description || 'Gentle and precise treatment for smooth, flawless beauty.'}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#10110F] bg-[#F7F4ED] px-3 py-1 rounded-lg border border-[#DCE1D8]">
                    <Check className="w-3.5 h-3.5 text-[#263D2B]" />
                    ${selectedServiceObj.price || 10} {selectedServiceObj.categoryName ? `(${selectedServiceObj.categoryName})` : ''}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#6B7068] bg-[#F7F4ED] px-3 py-1 rounded-lg border border-[#DCE1D8]">
                    <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                    {selectedServiceObj.duration || '45 min'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Alternative Services List */}
            <div className="pt-4 border-t border-[#DCE1D8] space-y-3">
              <span className="text-[11px] font-bold text-[#10110F] uppercase tracking-wider block font-sans">
                Quick Select Services
              </span>

              <div className="space-y-2">
                {alternativeServices.map((alt) => (
                  <button
                    key={alt.id}
                    type="button"
                    onClick={() => setSelectedServiceId(alt.id)}
                    className="w-full p-2.5 rounded-2xl bg-[#F7F4ED] hover:bg-white border border-[#DCE1D8] hover:border-[#263D2B] transition-all flex items-center justify-between text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <SafeServiceImage 
                        service={alt}
                        className="w-9 h-9 rounded-xl object-cover flex-shrink-0" 
                      />
                      <div>
                        <h4 className="text-xs font-bold text-[#10110F] group-hover:text-[#263D2B]">{alt.name}</h4>
                        <span className="text-[10px] text-[#6B7068] flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#263D2B]" /> {alt.duration || '30 min'} • ${alt.price} CAD
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#6B7068] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowAllServicesModal(true)}
                className="w-full py-3 px-4 rounded-2xl border border-[#DCE1D8] hover:border-[#263D2B] bg-[#F7F4ED] hover:bg-white text-[#10110F] font-bold text-xs text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 mt-2"
              >
                <span>View All Services</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#263D2B]" />
              </button>
            </div>
          </div>

          {/* COLUMN 2: STEPPER & INTERACTIVE BOOKING ENGINE (CENTER CARD) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-4 sm:p-6 lg:p-7 border border-[#DCE1D8] shadow-md space-y-5 sm:space-y-6">
            
            {/* 3-STEP LINE STEPPER BAR */}
            <div className="flex items-center justify-between px-1 sm:px-4 lg:px-6 relative">
              <div className="absolute left-8 right-8 top-4 h-0.5 bg-[#DCE1D8] -z-0" />
              
              {[
                { num: 1, label: 'Date & Time', fullLabel: 'Select Date & Time' },
                { num: 2, label: 'Details', fullLabel: 'Your Details' },
                { num: 3, label: 'Confirm', fullLabel: 'Confirmation' }
              ].map((st) => {
                const isActive = currentStep === st.num;
                const isDone = currentStep > st.num;

                return (
                  <div key={st.num} className="flex flex-col items-center gap-1 sm:gap-1.5 relative z-10">
                    <div 
                      className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all flex-shrink-0 ${
                        isActive
                          ? 'bg-[#263D2B] text-white shadow-md shadow-[#263D2B]/30 scale-110'
                          : isDone
                          ? 'bg-[#A8B5A0] text-[#10110F]'
                          : 'bg-[#F7F4ED] text-[#6B7068] border border-[#DCE1D8]'
                      }`}
                    >
                      {isDone ? <Check className="w-4 h-4" /> : st.num}
                    </div>
                    <span className={`text-[10px] sm:text-[11px] font-semibold text-center leading-tight max-w-[56px] sm:max-w-none ${isActive ? 'text-[#10110F]' : 'text-[#6B7068]'}`}>
                      <span className="sm:hidden">{st.label}</span>
                      <span className="hidden sm:inline">{st.fullLabel}</span>
                    </span>
                  </div>
                );
              })}
            </div>

            {/* STEP 1: SELECT DATE & TIME */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                
                {/* 1. SELECT DATE SECTION */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-normal text-lg text-[#10110F]">Select Date</h4>
                    <span className="text-[11px] text-[#6B7068] font-sans">Minimum date: Tomorrow</span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-4">
                    {/* Month Header Navigation */}
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="p-1.5 rounded-lg bg-white border border-[#DCE1D8] hover:border-[#263D2B] text-[#10110F] transition-all cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <h3 className="font-serif font-normal text-base sm:text-lg text-[#10110F]">
                        {calendarViewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </h3>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-1.5 rounded-lg bg-white border border-[#DCE1D8] hover:border-[#263D2B] text-[#10110F] transition-all cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Weekday Headers */}
                    <div className="grid grid-cols-7 gap-1 text-center border-b border-[#DCE1D8] pb-2">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                        <span key={d} className="text-[11px] font-bold text-[#6B7068]">
                          {d}
                        </span>
                      ))}
                    </div>

                    {/* Symmetrical Calendar Grid */}
                    <div className="grid grid-cols-7 gap-y-2 gap-x-1">
                      {(() => {
                        const year = calendarViewDate.getFullYear();
                        const month = calendarViewDate.getMonth();
                        const firstDayIndex = new Date(year, month, 1).getDay();
                        const totalDaysCurrentMonth = new Date(year, month + 1, 0).getDate();
                        const totalDaysPrevMonth = new Date(year, month, 0).getDate();
                        const minBookDateStr = tomorrowStr();
                        const cells = [];

                        // Previous month padding days
                        for (let i = firstDayIndex - 1; i >= 0; i--) {
                          const prevDay = totalDaysPrevMonth - i;
                          cells.push(
                            <div key={`prev-${prevDay}`} className="h-8 w-8 min-[380px]:h-9 min-[380px]:w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-xs text-[#6B7068]/40 cursor-not-allowed mx-auto font-medium">
                              {prevDay}
                            </div>
                          );
                        }

                        // Current month days
                        for (let day = 1; day <= totalDaysCurrentMonth; day++) {
                          const monthStr = String(month + 1).padStart(2, '0');
                          const dayStr = String(day).padStart(2, '0');
                          const dateStr = `${year}-${monthStr}-${dayStr}`;
                          const isDisabled = dateStr < minBookDateStr;
                          const isSelected = dateStr === selectedDate;

                          cells.push(
                            <button
                              key={dateStr}
                              type="button"
                              disabled={isDisabled}
                              onClick={() => handleDateChange(dateStr)}
                              className={`h-8 w-8 min-[380px]:h-9 min-[380px]:w-9 sm:h-10 sm:w-10 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center justify-center mx-auto cursor-pointer ${
                                isSelected
                                  ? 'bg-[#263D2B] text-white shadow-md shadow-[#263D2B]/30 font-bold scale-105'
                                  : isDisabled
                                  ? 'text-[#6B7068]/30 cursor-not-allowed line-through'
                                  : 'text-[#10110F] hover:bg-white hover:text-[#263D2B]'
                              }`}
                            >
                              {day}
                            </button>
                          );
                        }

                        // Next month padding days
                        const totalCellsSoFar = cells.length;
                        const remainingCells = (7 - (totalCellsSoFar % 7)) % 7;
                        for (let nextDay = 1; nextDay <= remainingCells; nextDay++) {
                          cells.push(
                            <div key={`next-${nextDay}`} className="h-8 w-8 min-[380px]:h-9 min-[380px]:w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-xs text-[#6B7068]/40 cursor-not-allowed mx-auto font-medium">
                              {nextDay}
                            </div>
                          );
                        }

                        return cells;
                      })()}
                    </div>
                  </div>
                </div>

                {/* 2. SELECT TIME SECTION */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-normal text-lg text-[#10110F]">Select Time</h4>
                    <span className="text-[11px] text-[#6B7068] font-sans">All times in EST (Ottawa)</span>
                  </div>

                  {slotErrorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{slotErrorMessage}</span>
                    </div>
                  )}

                  {/* 4-Column Time Slots Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {TIME_SLOTS.map((slot) => {
                      const booked = isSlotBooked(selectedDate, slot);
                      const isSelected = selectedTime === slot;

                      if (booked) {
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={true}
                            className="py-3 px-3 rounded-xl text-xs font-medium bg-[#F7F4ED] text-[#6B7068]/40 border border-[#DCE1D8] cursor-not-allowed line-through text-center"
                          >
                            {slot}
                          </button>
                        );
                      }

                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => {
                            setSelectedTime(slot);
                            setSlotErrorMessage('');
                          }}
                          className={`py-3 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center border ${
                            isSelected
                              ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-md shadow-[#263D2B]/20 font-bold scale-105'
                              : 'bg-[#F7F4ED] text-[#10110F] border-[#DCE1D8] hover:border-[#263D2B] hover:bg-white'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>

                  {/* Time Legend Bar */}
                  <div className="flex items-center justify-center gap-6 text-[11px] text-[#6B7068] pt-1 font-sans">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#263D2B]" />
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#A8B5A0]" />
                      <span>Selected</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#DCE1D8]" />
                      <span>Unavailable</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-[#DCE1D8]">
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="global-button-secondary text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 px-4 py-3 font-sans"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Return to Main Page</span>
                  </button>

                  <button
                    type="button"
                    disabled={!selectedTime || isSlotBooked(selectedDate, selectedTime)}
                    onClick={() => setCurrentStep(2)}
                    className="global-button flex items-center justify-center gap-2 !px-8 !py-3.5 !text-xs uppercase tracking-wider font-sans disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: YOUR DETAILS */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in font-sans">
                <div className="space-y-1">
                  <h4 className="font-serif font-normal text-lg text-[#10110F]">Your Details</h4>
                  <p className="text-xs text-[#6B7068]">Enter your contact information for appointment confirmation.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      className={`w-full py-3 px-4 bg-[#F7F4ED] border rounded-xl text-xs sm:text-sm text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none focus:border-[#263D2B] ${
                        errors.name ? 'border-red-500' : 'border-[#DCE1D8]'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(613) 555-0182"
                      className={`w-full py-3 px-4 bg-[#F7F4ED] border rounded-xl text-xs sm:text-sm text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none focus:border-[#263D2B] ${
                        errors.phone ? 'border-red-500' : 'border-[#DCE1D8]'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className={`w-full py-3 px-4 bg-[#F7F4ED] border rounded-xl text-xs sm:text-sm text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none focus:border-[#263D2B] ${
                        errors.email ? 'border-red-500' : 'border-[#DCE1D8]'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1">
                      Special Notes <span className="text-[#6B7068] font-normal lowercase">(optional)</span>
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any skin allergies or special requests..."
                      className="w-full py-3 px-4 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs sm:text-sm text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none focus:border-[#263D2B] resize-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-[#DCE1D8]">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="global-button-secondary text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 px-4 py-3"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => {
                      if (validateDetailsStep()) {
                        handleFinalSubmit();
                      }
                    }}
                    className="global-button flex items-center justify-center gap-2 !px-8 !py-3.5 !text-xs uppercase tracking-wider font-sans disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Confirming...' : 'Confirm Booking'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CONFIRMATION */}
            {currentStep === 3 && confirmedBooking && (
              <div className="space-y-6 text-center py-4 animate-fade-in font-sans">
                <div className="w-16 h-16 rounded-full bg-[#263D2B]/10 text-[#263D2B] border border-[#263D2B]/30 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-[#263D2B]/10 text-[#263D2B] text-[10px] font-bold uppercase tracking-wider">
                    ✓ Booking Submitted Successfully
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-[#10110F]">Appointment Requested!</h3>
                  <p className="text-xs text-[#6B7068] max-w-sm mx-auto">
                    Thank you, <strong>{confirmedBooking.customerName}</strong>! Your appointment has been reserved.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-left space-y-2 text-xs">
                  <div className="flex justify-between border-b border-[#DCE1D8] pb-2">
                    <span className="text-[#6B7068] font-semibold">Reference Code:</span>
                    <span className="font-mono font-bold text-[#10110F]">{confirmedBooking.referenceCode}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#DCE1D8] pb-2">
                    <span className="text-[#6B7068] font-semibold">Service:</span>
                    <span className="font-bold text-[#10110F]">{confirmedBooking.service}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#DCE1D8] pb-2">
                    <span className="text-[#6B7068] font-semibold">Date & Time:</span>
                    <span className="font-bold text-[#10110F]">{confirmedBooking.date} • {confirmedBooking.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7068] font-semibold">Master Artist:</span>
                    <span className="font-bold text-[#10110F]">{confirmedBooking.stylist}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <a
                    href={getWhatsAppBookingUrl(confirmedBooking)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                    <span>Send Confirmation to Owner on WhatsApp</span>
                  </a>

                  {/* Return / Shift to Main Page Button */}
                  <Link
                    to="/"
                    className="global-button w-full py-3.5 px-6 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Home className="w-4 h-4 text-white" />
                    <span>Return to Main Page</span>
                  </Link>

                  {/* Refresh / Reset & Book Another */}
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(1);
                      setConfirmedBooking(null);
                      setFormData({ name: '', phone: '', email: '', notes: '' });
                    }}
                    className="global-button-secondary w-full py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Refresh & Book Another Service</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* COLUMN 3: LIVE APPOINTMENT SUMMARY (RIGHT CARD) */}
          <div className="lg:col-span-3 space-y-5 sm:space-y-6">
            <div className="bg-white rounded-3xl p-4 sm:p-5 lg:p-6 border border-[#DCE1D8] shadow-md space-y-4 sm:space-y-5">
              <h3 className="font-serif font-normal text-lg text-[#10110F]">Appointment Summary</h3>

              {/* Service Thumbnail & Info */}
              <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center gap-3">
                <img 
                  src={selectedServiceObj.image || floralImg} 
                  alt={selectedServiceObj.name}
                  onError={(e) => { 
                    e.currentTarget.onerror = null; 
                    if (floralImg && e.currentTarget.src !== floralImg) {
                      e.currentTarget.src = floralImg;
                    }
                  }}
                  className="w-12 h-12 rounded-xl object-cover" 
                />
                <div>
                  <h4 className="font-serif font-normal text-[#10110F] text-sm">{selectedServiceObj.name || 'Threading'}</h4>
                  <span className="text-[10px] text-[#6B7068] block">{selectedServiceObj.categoryName || 'Eyebrows'} • {selectedServiceObj.duration || '45 min'}</span>
                  <span className="text-xs font-bold text-[#10110F]">${selectedServiceObj.price || 10} CAD</span>
                </div>
              </div>

              {/* Booking Details Readout */}
              <div className="space-y-3.5 pt-1 text-xs text-[#10110F] font-sans">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-[#263D2B] flex items-center justify-center shrink-0">
                    <CalendarIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6B7068] uppercase font-bold block">Date</span>
                    <span className="font-semibold text-xs">
                      {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-[#263D2B] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#263D2B]" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6B7068] uppercase font-bold block">Treatment Duration</span>
                    <span className="font-semibold text-xs text-[#10110F]">{selectedServiceObj.duration || '45 min'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-[#263D2B] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#263D2B]" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6B7068] uppercase font-bold block">Appointment Time</span>
                    <span className="font-semibold text-xs">{selectedTime || 'Select a time'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-[#263D2B] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6B7068] uppercase font-bold block">Location</span>
                    <span className="font-medium text-[11px] text-[#100C0D] leading-tight block">
                      405 EUPHORIA CRESCENT, OTTAWA, ON-K2J 7M7
                    </span>
                  </div>
                </div>
              </div>

              {/* Quote Promo Banner Box */}
              <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-center space-y-1">
                <div className="w-6 h-6 rounded-full bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center mx-auto mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
                </div>
                <h5 className="font-serif font-normal text-sm text-[#10110F]">Beauty Begins With You</h5>
                <p className="text-[10px] text-[#6B7068] font-sans">Because you deserve the best.</p>
              </div>

              {/* Studio Feature Badges */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-[#DCE1D8] text-center font-sans">
                <div className="p-2 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <Sparkles className="w-3.5 h-3.5 text-[#263D2B] mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-[#10110F] block">Premium Services</span>
                  <span className="text-[8px] text-[#6B7068] block">Luxury beauty treatments</span>
                </div>
                <div className="p-2 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <User className="w-3.5 h-3.5 text-[#263D2B] mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-[#10110F] block">Expert Care</span>
                  <span className="text-[8px] text-[#6B7068] block">By Janki Khatroja</span>
                </div>
                <div className="p-2 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B] mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-[#10110F] block">Safe & Hygienic</span>
                  <span className="text-[8px] text-[#6B7068] block">Your health matters</span>
                </div>
                <div className="p-2 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <FileText className="w-3.5 h-3.5 text-[#263D2B] mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-[#10110F] block">Easy Booking</span>
                  <span className="text-[8px] text-[#6B7068] block">Quick & Hassle-Free</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* VIEW ALL SERVICES MODAL DIALOG */}
      {showAllServicesModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-[#DCE1D8] animate-fade-in">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#DCE1D8] flex items-center justify-between bg-[#F7F4ED]">
              <div>
                <h3 className="font-serif font-normal text-xl text-[#10110F]">Select a Treatment</h3>
                <p className="text-xs text-[#6B7068] font-sans">Choose from our complete luxury salon service menu.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAllServicesModal(false)}
                className="p-2 rounded-full hover:bg-white text-[#6B7068] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search & Category Filter */}
            <div className="p-4 bg-[#F7F4ED]/70 border-b border-[#DCE1D8] space-y-3 font-sans">
              <div className="relative">
                <Search className="w-4 h-4 text-[#6B7068] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={serviceSearchQuery}
                  onChange={(e) => setServiceSearchQuery(e.target.value)}
                  placeholder="Search services..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#263D2B] text-white'
                        : 'bg-white border border-[#DCE1D8] text-[#10110F] hover:bg-[#F7F4ED]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Services Grid */}
            <div className="p-5 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
              {modalFilteredServices.map((service) => {
                const isSelected = selectedServiceId === service.id;
                return (
                  <div
                    key={service.id}
                    onClick={() => {
                      setSelectedServiceId(service.id);
                      setShowAllServicesModal(false);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#F7F4ED] border-[#263D2B] ring-2 ring-[#263D2B]/20'
                        : 'bg-white border-[#DCE1D8] hover:border-[#263D2B] hover:bg-[#F7F4ED]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <SafeServiceImage 
                        service={service}
                        className="w-12 h-12 rounded-xl object-cover flex-shrink-0" 
                      />
                      <div>
                        <h4 className="font-serif font-normal text-xs text-[#10110F]">{service.name}</h4>
                        <span className="text-[10px] text-[#6B7068] block">{service.duration} • ${service.price} CAD</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-[#263D2B] text-white'
                          : 'bg-[#F7F4ED] text-[#10110F]'
                      }`}
                    >
                      {isSelected ? 'Selected ✓' : 'Select'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MY BOOKINGS MODAL DIALOG */}
      {showSavedModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-[#DCE1D8] animate-fade-in">
            <div className="flex items-center justify-between border-b border-[#DCE1D8] pb-3">
              <h3 className="font-serif font-normal text-lg text-[#10110F]">My Booked Appointments</h3>
              <button
                type="button"
                onClick={() => setShowSavedModal(false)}
                className="p-1 rounded-full hover:bg-[#F7F4ED] text-[#6B7068]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {savedAppointments.length === 0 ? (
              <p className="text-xs text-[#6B7068] text-center py-6">No appointments booked yet.</p>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {savedAppointments.map((app) => {
                  const status = app.status || app.appointmentStatus || 'Pending';
                  return (
                    <div key={app.id || app.referenceCode} className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1.5 text-xs">
                      <div className="flex justify-between items-start font-bold">
                        <span className="text-[#10110F] text-sm">{app.service}</span>
                        <span className="text-[#10110F] font-serif font-normal">${app.servicePrice} CAD</span>
                      </div>
                      <div className="text-[11px] text-[#6B7068]">
                        📅 {app.date} • ⏰ {app.time}
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-[#DCE1D8]">
                        <span className="text-[10px] text-[#6B7068] font-mono">
                          Ref: {app.referenceCode || app.id}
                        </span>
                        
                        {/* Customer status display (Read-only) */}
                        {status === 'In Progress' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#263D2B]/15 text-[#263D2B] border border-[#263D2B]/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B] animate-ping" />
                            <span>Treatment In Progress</span>
                          </span>
                        ) : status === 'Completed' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-800 border border-emerald-500/30">
                            <span>✓ Treatment Completed</span>
                          </span>
                        ) : status === 'Confirmed' || status === 'Appointment Request Confirmed' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#263D2B]/15 text-[#263D2B] border border-[#263D2B]/30">
                            <span>Appointment Confirmed</span>
                          </span>
                        ) : status === 'Cancelled' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/15 text-red-800 border border-red-500/30">
                            <span>Cancelled</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#465640]/15 text-[#465640] border border-[#465640]/30">
                            <span>Pending Confirmation</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
