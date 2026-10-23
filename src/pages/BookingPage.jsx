import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin,
  User, 
  CheckCircle, 
  Sparkles, 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck, 
  Search, 
  Check, 
  X, 
  MessageCircle,
  FileText,
  ChevronRight,
  ChevronLeft,
  Home,
  RotateCcw,
  Gift
} from 'lucide-react';
import floralImg from '../assets/floral-booking.webp';
import jankiPhoto from '../assets/janki-khatroja.webp';
import { CATEGORIES } from '../data/servicesData';
import { getWhatsAppBookingUrl } from '../utils/whatsapp';
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

const DEFAULT_TIME_SLOTS = [
  '09:00 AM',
  '09:15 AM',
  '09:30 AM',
  '09:45 AM',
  '10:00 AM',
  '10:15 AM',
  '10:30 AM',
  '10:45 AM',
  '11:00 AM',
  '11:15 AM',
  '11:30 AM',
  '11:45 AM',
  '12:00 PM',
  '12:15 PM',
  '12:30 PM',
  '12:45 PM',
  '01:00 PM',
  '01:15 PM',
  '01:30 PM',
  '01:45 PM',
  '02:00 PM',
  '02:15 PM',
  '02:30 PM',
  '02:45 PM',
  '03:00 PM',
  '03:15 PM',
  '03:30 PM',
  '03:45 PM',
  '04:00 PM',
  '04:15 PM',
  '04:30 PM',
  '04:45 PM',
  '05:00 PM',
  '05:15 PM'
];

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const preselectedServiceId = searchParams.get('service');
  const offerParam = searchParams.get('offer');
  const comboParam = searchParams.get('combo') || searchParams.get('package');
  const optionParam = searchParams.get('option');
  const addonsParam = searchParams.get('addons');
  const itineraryParam = searchParams.get('itinerary') || searchParams.get('services');
  const notesParam = searchParams.get('notes') || searchParams.get('note') || '';

  const [availableServices, setAvailableServices] = useState(() => salonDB.getServices());

  // Salon Day Itinerary state
  const selectedItinerary = useMemo(() => {
    if (!itineraryParam || !itineraryParam.trim()) return null;
    const ids = itineraryParam.split(',').map((s) => s.trim()).filter(Boolean);
    if (ids.length === 0) return null;
    const calc = salonDB.calculateSalonDayItinerary(ids);
    return calc.itemCount > 0 ? calc : null;
  }, [itineraryParam, availableServices]);

  // Combo package state
  const [selectedCombo, setSelectedCombo] = useState(() => {
    if (!comboParam) return null;
    return salonDB.getComboPackageById(comboParam);
  });

  // Festival offer state
  const [appliedOfferId] = useState(() => offerParam || '');
  const [offerDismissed, setOfferDismissed] = useState(false);

  useEffect(() => {
    setAvailableServices(salonDB.getServices());
    if (comboParam) {
      const found = salonDB.getComboPackageById(comboParam);
      if (found) setSelectedCombo(found);
    }
    const unsub = salonDB.subscribe(() => {
      setAvailableServices(salonDB.getServices());
      if (comboParam) {
        const found = salonDB.getComboPackageById(comboParam);
        if (found) setSelectedCombo(found);
      }
    });
    return () => unsub();
  }, [comboParam]);

  // Step State (1: Date & Time, 2: Customer Details, 3: Confirmation)
  const [currentStep, setCurrentStep] = useState(1);

  // Service Selection State
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [showAllServicesModal, setShowAllServicesModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [serviceSearchQuery, setServiceSearchQuery] = useState('');

  // Default to preselected service from offer / URL slug / id or first service
  useEffect(() => {
    // If offer is specified and no explicit service in URL, preselect the offer's primary service
    if (offerParam && !preselectedServiceId && availableServices.length > 0) {
      const offerObj = salonDB.getFestivalOfferById(offerParam);
      if (offerObj) {
        const primary = offerObj.primaryServiceId || (offerObj.includedServiceIds && offerObj.includedServiceIds[0]);
        if (primary) {
          const match = availableServices.find(
            (s) => s.id === primary || s.slug === primary || s.name.toLowerCase() === String(primary).toLowerCase()
          );
          if (match) {
            setSelectedServiceId(match.id);
            return;
          }
        }
      }
    }

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
  }, [preselectedServiceId, offerParam, availableServices, selectedServiceId]);

  const selectedServiceObj = useMemo(() => {
    return availableServices.find((s) => s.id === selectedServiceId) || availableServices[0] || {};
  }, [availableServices, selectedServiceId]);
  const selectedStylistObj = STYLISTS[0]; // Janki Khatroja

  // Calculate tailored customization if passed via URL parameters
  const selectedCustomization = useMemo(() => {
    if (!selectedServiceObj || !selectedServiceObj.id || selectedCombo) return null;
    if (!optionParam && (!addonsParam || !addonsParam.trim())) return null;

    const addonIds = addonsParam ? addonsParam.split(',').map((s) => s.trim()).filter(Boolean) : [];
    const customCalc = salonDB.calculateCustomizedService(selectedServiceObj.id, optionParam, addonIds);
    return customCalc;
  }, [selectedServiceObj, selectedCombo, optionParam, addonsParam]);

  // Dynamically extract treatment duration in minutes from master data (never hardcoded, applies to all services, itineraries, and combo packages)
  const selectedServiceDuration = useMemo(() => {
    if (selectedItinerary) {
      return Number(selectedItinerary.totalDurationMinutes) || 60;
    }
    if (selectedCombo) {
      return Number(selectedCombo.totalDurationMinutes) || 60;
    }
    if (selectedCustomization) {
      return Number(selectedCustomization.totalDurationMinutes) || 45;
    }
    return salonDB.parseServiceDurationMinutes(selectedServiceObj?.duration || 45);
  }, [selectedItinerary, selectedCombo, selectedCustomization, selectedServiceObj]);

  // Quick alternative services for left sidebar (excluding current selected)
  const alternativeServices = availableServices
    .filter((s) => s.id !== selectedServiceId && s.active !== false)
    .slice(0, 4);

  // Helper: Format local date as YYYY-MM-DD
  const formatLocalDate = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  // Earliest bookable date: Tomorrow (local time)
  const getTomorrowLocalDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return formatLocalDate(d);
  };

  const [selectedDate, setSelectedDate] = useState(() => getTomorrowLocalDate());

  // Dynamically generated 15-minute slot intervals based on salon opening/closing hours for selectedDate
  const activeTimeSlots = useMemo(() => {
    const slots = salonDB.getTimeSlotsForDate(selectedDate, 15);
    return slots && slots.length > 0 ? slots : DEFAULT_TIME_SLOTS;
  }, [selectedDate]);

  const [selectedTime, setSelectedTime] = useState(() => {
    const tomorrow = getTomorrowLocalDate();
    const initialSlots = salonDB.getTimeSlotsForDate(tomorrow, 15);
    const initialDuration = salonDB.parseServiceDurationMinutes(availableServices[0]?.duration || 45);
    return initialSlots.find((s) => !salonDB.isSlotBooked(tomorrow, s, initialDuration, STYLISTS[0].id)) || initialSlots[0] || '09:00 AM';
  });
  const [slotErrorMessage, setSlotErrorMessage] = useState('');

  // Calculate dynamic end time string for the currently selected slot & duration
  const calculatedEndTime = useMemo(() => {
    if (!selectedTime) return '';
    return salonDB.calculateEndTimeString(selectedTime, selectedServiceDuration);
  }, [selectedTime, selectedServiceDuration]);

  // Check if a slot is blocked/unavailable based on service duration & existing bookings
  const isSlotBooked = (date, time) => {
    return salonDB.isSlotBooked(date, time, selectedServiceDuration, selectedStylistObj?.id);
  };

  // Authoritative Festival Offer or Combo Package validation & pricing calculations
  const appliedOffer = (!offerDismissed && appliedOfferId) ? salonDB.getFestivalOfferById(appliedOfferId) : null;
  const offerValidation = appliedOffer ? salonDB.validateOfferForBooking(appliedOffer.id, selectedDate) : { valid: false };
  const baseServicePrice = Number(selectedServiceObj?.price) || 0;
  const originalDisplayPrice = selectedItinerary
    ? Number(selectedItinerary.totalOriginalPrice)
    : (selectedCombo 
        ? Number(selectedCombo.totalOriginalPrice) 
        : (selectedCustomization 
            ? Number(selectedCustomization.totalPrice) 
            : (isOfferActive && appliedOffer?.originalPrice ? Number(appliedOffer.originalPrice) : baseServicePrice)));

  const finalDiscountedPrice = selectedItinerary
    ? Number(selectedItinerary.finalPrice)
    : (selectedCombo 
        ? Number(selectedCombo.comboPrice) 
        : (selectedCustomization 
            ? Number(selectedCustomization.totalPrice) 
            : (isOfferActive && appliedOffer?.discountedPrice ? Number(appliedOffer.discountedPrice) : baseServicePrice)));
  const savingsAmount = Math.max(0, originalDisplayPrice - finalDiscountedPrice);

  // Calendar month view navigation state
  const [calendarViewDate, setCalendarViewDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const isPrevMonthDisabled = (() => {
    const now = new Date();
    return (
      calendarViewDate.getFullYear() < now.getFullYear() ||
      (calendarViewDate.getFullYear() === now.getFullYear() && calendarViewDate.getMonth() <= now.getMonth())
    );
  })();

  const handlePrevMonth = () => {
    if (isPrevMonthDisabled) return;
    setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 1));
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setSlotErrorMessage('');
    const slots = salonDB.getTimeSlotsForDate(newDate, 15);
    // Automatically preserve selectedTime if available on newDate for this duration, or pick first available slot
    if (selectedTime && !salonDB.isSlotBooked(newDate, selectedTime, selectedServiceDuration, selectedStylistObj?.id)) {
      // Keep current slot
    } else {
      const firstAvailable = slots.find((s) => !salonDB.isSlotBooked(newDate, s, selectedServiceDuration, selectedStylistObj?.id));
      setSelectedTime(firstAvailable || '');
    }
  };

  // Ensure an available time slot is selected whenever date, service duration, or stylist changes
  useEffect(() => {
    const slots = salonDB.getTimeSlotsForDate(selectedDate, 15);
    setSelectedTime((prevTime) => {
      if (prevTime && !salonDB.isSlotBooked(selectedDate, prevTime, selectedServiceDuration, selectedStylistObj?.id)) {
        return prevTime;
      }
      const firstAvailable = slots.find((s) => !salonDB.isSlotBooked(selectedDate, s, selectedServiceDuration, selectedStylistObj?.id));
      return firstAvailable || '';
    });
  }, [selectedDate, selectedServiceDuration, selectedStylistObj?.id]);

  const scrollToBookingTop = () => {
    const el = document.getElementById('booking-main-card');
    if (el) {
      const navOffset = 95;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementPosition - navOffset),
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleContinueToStep2 = () => {
    if (!selectedDate) {
      setSlotErrorMessage('Please select a preferred appointment date.');
      return;
    }
    if (!selectedTime) {
      setSlotErrorMessage('Please select a preferred appointment time slot above to continue.');
      const slotEl = document.getElementById('select-time-section');
      if (slotEl) {
        slotEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    const availability = salonDB.checkSlotAvailability(selectedDate, selectedTime, selectedServiceDuration, selectedStylistObj?.id);
    if (!availability.available) {
      setSlotErrorMessage(availability.reason || 'The selected time slot is unavailable for this service duration. Please choose another available time.');
      return;
    }
    setSlotErrorMessage('');
    setCurrentStep(2);
    scrollToBookingTop();
  };

  // Form Details State
  const [currentUser] = useState(() => salonDB.getCurrentUser());
  const [formData, setFormData] = useState(() => {
    const u = salonDB.getCurrentUser();
    return {
      name: u?.name || '',
      phone: u?.phone || '',
      email: u?.email || '',
      notes: notesParam || ''
    };
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
    const phoneDigits = (formData.phone || '').replace(/\D/g, '');
    if (!formData.phone || phoneDigits.length < 7) {
      newErrors.phone = 'Please enter a valid phone number (at least 7 digits).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    setErrors(newErrors);

    // Auto-focus first invalid input
    if (newErrors.name) {
      document.getElementById('customer-name')?.focus();
    } else if (newErrors.phone) {
      document.getElementById('customer-phone')?.focus();
    } else if (newErrors.email) {
      document.getElementById('customer-email')?.focus();
    }

    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleFinalSubmit = (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setSlotErrorMessage('');

    const availability = salonDB.checkSlotAvailability(selectedDate, selectedTime, selectedServiceDuration, selectedStylistObj?.id);
    if (!availability.available) {
      setIsSubmitting(false);
      setSlotErrorMessage(availability.reason || 'Sorry, this time slot was just booked or overlaps an existing appointment. Please select another available time.');
      setSelectedTime('');
      setCurrentStep(1);
      scrollToBookingTop();
      return;
    }

    const refCode = generateBookingReference();

    // Secure authoritative recalculation of prices to prevent browser tampering:
    let bookingOffer = null;
    let finalAuthorizedPrice = selectedServiceObj ? Number(selectedServiceObj.price) : 85;
    let authoritativeOriginalPrice = finalAuthorizedPrice;
    let authoritativeSavings = 0;
    if (selectedItinerary) {
      finalAuthorizedPrice = Number(selectedItinerary.finalPrice) || 85;
      authoritativeOriginalPrice = Number(selectedItinerary.totalOriginalPrice) || finalAuthorizedPrice;
      authoritativeSavings = Number(selectedItinerary.discountAmount) || 0;
    } else if (selectedCombo) {
      finalAuthorizedPrice = Number(selectedCombo.comboPrice) || 85;
      authoritativeOriginalPrice = Number(selectedCombo.totalOriginalPrice) || finalAuthorizedPrice;
      authoritativeSavings = Math.max(0, authoritativeOriginalPrice - finalAuthorizedPrice);
    } else if (selectedCustomization) {
      finalAuthorizedPrice = Number(selectedCustomization.totalPrice) || finalAuthorizedPrice;
      authoritativeOriginalPrice = finalAuthorizedPrice;
      authoritativeSavings = 0;
    } else if (!offerDismissed && appliedOfferId) {
      const dbCheck = salonDB.validateOfferForBooking(appliedOfferId, selectedDate);
      if (dbCheck.valid && dbCheck.offer) {
        bookingOffer = dbCheck.offer;
        finalAuthorizedPrice = Number(dbCheck.offer.discountedPrice) || finalAuthorizedPrice;
        authoritativeOriginalPrice = Number(dbCheck.offer.originalPrice) || finalAuthorizedPrice;
        authoritativeSavings = Math.max(0, authoritativeOriginalPrice - finalAuthorizedPrice);
      }
    }

    const bookingPayload = {
      id: refCode,
      referenceCode: refCode,
      serviceId: selectedItinerary ? selectedItinerary.serviceIds.join(',') : (selectedCombo ? selectedCombo.id : (selectedServiceObj ? selectedServiceObj.id : 'womens-haircut')),
      service: selectedItinerary ? `Salon Day Itinerary (${selectedItinerary.itemCount} Treatments)` : (selectedCombo ? selectedCombo.name : (selectedServiceObj ? selectedServiceObj.name : 'Salon Treatment')),
      serviceDuration: selectedItinerary ? selectedItinerary.durationDisplay : (selectedCombo ? (selectedCombo.durationDisplay || `${selectedServiceDuration} min`) : (selectedServiceObj?.duration || `${selectedServiceDuration} min`)),
      durationMinutes: selectedServiceDuration,
      startTime: selectedTime,
      endTime: calculatedEndTime,
      servicePrice: finalAuthorizedPrice,
      originalPrice: authoritativeOriginalPrice,
      discountAmount: authoritativeSavings,
      isSalonDay: Boolean(selectedItinerary),
      itineraryServices: selectedItinerary ? selectedItinerary.services : [],
      itineraryCount: selectedItinerary ? selectedItinerary.itemCount : 0,
      isCombo: Boolean(selectedCombo),
      comboId: selectedCombo ? selectedCombo.id : null,
      comboName: selectedCombo ? selectedCombo.name : null,
      customizations: selectedCustomization ? {
        serviceId: selectedServiceObj.id,
        serviceName: selectedServiceObj.name,
        selectedOption: selectedCustomization.selectedOption,
        selectedAddons: selectedCustomization.selectedAddons,
        basePrice: selectedCustomization.basePrice,
        optionAdjustment: selectedCustomization.optionAdjustment,
        addonTotal: selectedCustomization.addonTotal,
        totalPrice: selectedCustomization.totalPrice,
        baseDurationMinutes: selectedCustomization.baseDurationMinutes,
        additionalDurationMinutes: selectedCustomization.additionalDurationMinutes,
        totalDurationMinutes: selectedCustomization.totalDurationMinutes
      } : null,
      includedServices: selectedCombo ? (selectedCombo.services || []).map(s => ({
        id: s.id,
        name: s.name,
        price: s.price,
        duration: s.duration
      })) : [],
      offerId: bookingOffer ? bookingOffer.id : null,
      offerTitle: bookingOffer ? bookingOffer.title : null,
      festival: bookingOffer ? bookingOffer.festival : null,
      promoCode: bookingOffer ? bookingOffer.promoCode : null,
      serviceImage: selectedCombo ? selectedCombo.image : (selectedServiceObj ? selectedServiceObj.image : floralImg),
      serviceCategory: selectedCombo ? (selectedCombo.categoryTag || 'Combo Package') : (selectedServiceObj ? selectedServiceObj.categoryName : 'Beauty Treatment'),
      stylistId: selectedStylistObj.id,
      stylist: selectedStylistObj.name,
      stylistRole: selectedStylistObj.role,
      date: selectedDate,
      time: selectedTime,
      customerId: currentUser ? currentUser.id : null,
      customerPreferredName: currentUser ? currentUser.preferredName : null,
      paymentMethod: 'Cash on Delivery',
      paymentStatus: 'Pending (Due at Appointment)',
      phone: formData.phone.trim(),
      customerPhone: formData.phone.trim(),
      email: formData.email.trim(),
      customerEmail: formData.email.trim(),
      customerName: formData.name.trim(),
      notes: formData.notes.trim(),
      createdAt: new Date().toISOString(),
      status: 'Pending',
      appointmentStatus: 'Pending'
    };

    try {
      salonDB.addAppointment(bookingPayload);
    } catch (err) {
      console.warn('DB appointment save error (using fallback):', err);
    }

    setConfirmedBooking(bookingPayload);
    setIsSubmitting(false);
    setCurrentStep(3);
    scrollToBookingTop();

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
      {/* 2. MAIN RESPONSIVE BOOKING ENGINE (MOBILE 1-COL, IPAD 2-COL, LAPTOP 3-COL) */}
      {/* ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        
        {/* COMPACT SELECTED SERVICE BANNER (VISIBLE ON MOBILE & TABLET < xl) */}
        <div className="xl:hidden bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-[#DCE1D8] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6">
          <div className="flex items-center gap-3 min-w-0">
            <img 
              src={selectedCombo ? selectedCombo.image : (selectedServiceObj.image || floralImg)} 
              alt={selectedCombo ? selectedCombo.name : selectedServiceObj.name}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shrink-0" 
            />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                {selectedCombo ? 'Exclusive Combo Package' : 'Selected Treatment'}
              </span>
              <h3 className="font-serif text-base sm:text-lg font-normal text-[#10110F] truncate">
                {selectedCombo ? selectedCombo.name : (selectedServiceObj.name || 'Treatment')}
              </h3>
              <div className="text-xs text-[#6B7068] font-medium flex items-center gap-1.5 mt-0.5">
                <span>{selectedCombo ? (selectedCombo.durationDisplay || `${selectedServiceDuration} min`) : (selectedServiceObj.duration || '45 min')}</span>
                <span>•</span>
                {savingsAmount > 0 ? (
                  <span className="flex items-center gap-1.5">
                    <span className="line-through text-[#6B7068] text-[11px]">${originalDisplayPrice} CAD</span>
                    <span className="font-bold text-[#263D2B]">${finalDiscountedPrice} CAD</span>
                  </span>
                ) : (
                  <span className="font-bold text-[#10110F]">${finalDiscountedPrice} CAD</span>
                )}
              </div>
              {selectedCustomization && (
                <div className="mt-2 pt-2 border-t border-[#DCE1D8] text-[11px] text-[#263D2B] space-y-0.5">
                  <span className="font-bold uppercase tracking-wider block text-[9.5px] text-[#465640]">Tailored Customization:</span>
                  {selectedCustomization.selectedOption && (
                    <div className="text-[#10110F] text-[10.5px]">• Tier: {selectedCustomization.selectedOption.name}</div>
                  )}
                  {selectedCustomization.selectedAddons?.length > 0 && (
                    <div className="text-[#10110F] text-[10.5px]">
                      • Add-ons: {selectedCustomization.selectedAddons.map(a => a.name).join(', ')}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {selectedCombo && (
              <button
                type="button"
                onClick={() => setSelectedCombo(null)}
                className="px-3 py-1.5 rounded-lg border border-[#DCE1D8] hover:bg-[#F7F4ED] text-[11px] font-medium text-[#6B7068]"
              >
                Switch to Single Service
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowAllServicesModal(true)}
              className="global-button-secondary !py-2 !px-4 !text-xs self-stretch sm:self-auto shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Change Treatment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 xl:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* COLUMN 1: SELECTED SERVICE & ALTERNATIVE MENU (DESKTOP ONLY >= xl) */}
          <div className="hidden xl:block xl:col-span-3 bg-white rounded-3xl p-4 sm:p-5 lg:p-6 border border-[#DCE1D8] shadow-md space-y-5 sm:space-y-6">
            <div className="space-y-4">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-[#F7F4ED] shadow-inner">
                <img 
                  src={selectedItinerary ? (selectedItinerary.services[0]?.image || floralImg) : (selectedCombo ? selectedCombo.image : (selectedServiceObj.image || floralImg))}
                  alt={selectedItinerary ? 'Salon Day Itinerary' : (selectedCombo ? selectedCombo.name : selectedServiceObj.name)}
                  className="w-full h-full object-cover" 
                />
                <span className="absolute top-3 left-3 bg-[#263D2B] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-xs">
                  {selectedItinerary ? 'Salon Day Itinerary' : (selectedCombo ? 'Combo Package' : 'Selected Service')}
                </span>
              </div>

              <div>
                <h3 className="font-serif font-normal text-[#10110F] text-xl sm:text-2xl leading-tight">
                  {selectedItinerary ? `Salon Day (${selectedItinerary.itemCount} Treatments)` : (selectedCombo ? selectedCombo.name : (selectedServiceObj.name || 'Treatment'))}
                </h3>
                {selectedItinerary ? (
                  <p className="text-xs font-serif italic text-[#465640] mt-1">
                    Your personalized beauty itinerary, planned in appointment sequence.
                  </p>
                ) : selectedCombo && selectedCombo.tagline ? (
                  <p className="text-xs font-serif italic text-[#465640] mt-1">
                    {selectedCombo.tagline}
                  </p>
                ) : null}
                <p className="text-xs text-[#6B7068] mt-1.5 line-clamp-3 font-sans">
                  {selectedItinerary 
                    ? `Enjoy a seamless multi-treatment salon experience. Total estimated duration: ${selectedItinerary.durationDisplay}.` 
                    : (selectedCombo ? selectedCombo.description : (selectedServiceObj.description || 'Gentle and precise treatment for smooth, flawless beauty.'))}
                </p>

                {selectedItinerary ? (
                  <div className="mt-3 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">
                      Included In Your Salon Day:
                    </span>
                    <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                      {selectedItinerary.services?.map((s, idx) => (
                        <div key={s.id} className="p-2 rounded-lg bg-[#F7F4ED] border border-[#DCE1D8] text-xs flex items-center justify-between">
                          <span className="font-medium text-[#10110F] truncate pr-2">
                            {idx + 1}. {s.name}
                          </span>
                          <span className="text-[11px] text-[#6B7068] shrink-0 font-mono">${s.price} • {s.duration}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 flex items-center justify-between border-t border-[#DCE1D8]">
                      <div>
                        {selectedItinerary.discountAmount > 0 && (
                          <span className="line-through text-xs text-[#6B7068] font-mono">${selectedItinerary.totalOriginalPrice} </span>
                        )}
                        <span className="font-serif font-bold text-lg text-[#263D2B] block">${selectedItinerary.finalPrice} CAD</span>
                      </div>
                      {selectedItinerary.discountAmount > 0 && (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          Save ${selectedItinerary.discountAmount} CAD ({selectedItinerary.discountPercent}% OFF)
                        </span>
                      )}
                    </div>
                  </div>
                ) : selectedCombo ? (
                  <div className="mt-3 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">
                      Included In This Combo:
                    </span>
                    <div className="space-y-1.5">
                      {selectedCombo.services?.map((s) => (
                        <div key={s.id} className="p-2 rounded-lg bg-[#F7F4ED] border border-[#DCE1D8] text-xs flex items-center justify-between">
                          <span className="font-medium text-[#10110F] truncate pr-2">{s.name}</span>
                          <span className="text-[11px] text-[#6B7068] shrink-0 font-mono">{s.duration}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 flex items-center justify-between border-t border-[#DCE1D8]">
                      <div>
                        <span className="line-through text-xs text-[#6B7068] font-mono">${selectedCombo.totalOriginalPrice}</span>
                        <span className="font-serif font-bold text-lg text-[#263D2B] block">${selectedCombo.comboPrice} CAD</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        Save ${selectedCombo.savingsAmount} CAD
                      </span>
                    </div>
                  </div>
                ) : (
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
                )}

                {selectedCustomization && (
                  <div className="mt-3 space-y-2 bg-[#F7F4ED] p-3 rounded-2xl border border-[#DCE1D8]">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B]">
                        Tailored Customizations
                      </span>
                      <span className="text-[10px] text-[#465640] font-semibold">
                        +{selectedCustomization.additionalDurationMinutes} min
                      </span>
                    </div>
                    {selectedCustomization.selectedOption && (
                      <div className="text-xs flex items-center justify-between text-[#10110F]">
                        <span className="truncate pr-2 font-medium">• {selectedCustomization.selectedOption.name}</span>
                        <span className="font-mono text-[#263D2B] shrink-0 font-bold">
                          {selectedCustomization.optionAdjustment > 0 
                            ? `+$${selectedCustomization.optionAdjustment}` 
                            : 'Included'}
                        </span>
                      </div>
                    )}
                    {selectedCustomization.selectedAddons?.map(a => (
                      <div key={a.id} className="text-xs flex items-center justify-between text-[#10110F]">
                        <span className="truncate pr-2 font-medium">+ {a.name}</span>
                        <span className="font-mono text-[#263D2B] shrink-0 font-bold">+${a.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Alternative Services List */}
            <div className="pt-4 border-t border-[#DCE1D8] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#10110F] uppercase tracking-wider block font-sans">
                  {selectedCombo ? 'Other Options' : 'Quick Select Services'}
                </span>
                <Link to="/treatments#treatment-combos" className="text-[10.5px] font-bold text-[#263D2B] hover:underline flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Browse Packages</span>
                </Link>
              </div>

              {selectedCombo && (
                <button
                  type="button"
                  onClick={() => setSelectedCombo(null)}
                  className="w-full py-2 px-3 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] hover:bg-white text-xs font-bold text-[#10110F] transition-all text-center cursor-pointer"
                >
                  Switch to Single Service
                </button>
              )}

              <div className="space-y-2">
                {alternativeServices.map((alt) => (
                  <button
                    key={alt.id}
                    type="button"
                    onClick={() => {
                      setSelectedCombo(null);
                      setSelectedServiceId(alt.id);
                    }}
                    className="w-full p-2.5 rounded-2xl bg-[#F7F4ED] hover:bg-white border border-[#DCE1D8] hover:border-[#263D2B] transition-all flex items-center justify-between text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <SafeServiceImage service={alt} className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <span className="font-semibold text-xs text-[#10110F] group-hover:text-[#263D2B] block truncate max-w-[120px]">
                          {alt.name}
                        </span>
                        <span className="text-[10px] text-[#6B7068] block">{alt.duration}</span>
                      </div>
                    </div>
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
          <div id="booking-main-card" className="col-span-12 md:col-span-7 xl:col-span-6 bg-white rounded-3xl p-4 sm:p-6 lg:p-7 border border-[#DCE1D8] shadow-md space-y-5 sm:space-y-6">
            
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
                const canClick = st.num === 1 || (st.num === 2 && selectedTime) || (st.num === 3 && confirmedBooking);

                return (
                  <button
                    key={st.num}
                    type="button"
                    disabled={!canClick}
                    onClick={() => {
                      if (st.num === 1) {
                        setCurrentStep(1);
                        scrollToBookingTop();
                      } else if (st.num === 2) {
                        handleContinueToStep2();
                      } else if (st.num === 3 && confirmedBooking) {
                        setCurrentStep(3);
                        scrollToBookingTop();
                      }
                    }}
                    className={`flex flex-col items-center gap-1 sm:gap-1.5 relative z-10 transition-all ${
                      !canClick ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'
                    }`}
                  >
                    <div 
                      className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all flex-shrink-0 ${
                        isActive
                          ? 'bg-[#263D2B] text-white shadow-md shadow-[#263D2B]/30 scale-110 ring-2 ring-[#263D2B]/20'
                          : isDone
                          ? 'bg-[#A8B5A0] text-[#10110F]'
                          : 'bg-[#F7F4ED] text-[#6B7068] border border-[#DCE1D8]'
                      }`}
                    >
                      {isDone ? <Check className="w-4 h-4" /> : st.num}
                    </div>
                    <span className={`text-[10px] sm:text-[11px] font-semibold text-center leading-tight max-w-[56px] sm:max-w-none ${isActive ? 'text-[#10110F] font-bold' : 'text-[#6B7068]'}`}>
                      <span className="sm:hidden">{st.label}</span>
                      <span className="hidden sm:inline">{st.fullLabel}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* FESTIVE OFFER APPLIED PROMOTIONAL BANNER */}
            {appliedOffer && !offerDismissed && currentStep < 3 && (
              <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                isOfferActive 
                  ? 'bg-[#263D2B]/5 border-[#263D2B]/30' 
                  : 'bg-amber-50 border-amber-200'
              }`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isOfferActive ? 'bg-[#263D2B] text-white shadow-xs' : 'bg-amber-100 text-amber-800'
                    }`}>
                      <Gift className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-[#DCE1D8] text-[#263D2B] text-[10px] font-bold uppercase tracking-wider">
                          <Sparkles className="w-3 h-3 text-[#263D2B]" />
                          {appliedOffer.festival} Special Offer
                        </span>
                        {isOfferActive ? (
                          <span className="px-2 py-0.5 rounded-full bg-[#263D2B] text-white text-[10px] font-bold">
                            Save ${savingsAmount} CAD
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold">
                            Date Outside Window
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#10110F]">
                        {appliedOffer.title}
                      </h4>
                      <p className="text-xs text-[#6B7068]">
                        {appliedOffer.tagline || appliedOffer.description}
                      </p>
                      {isOfferActive ? (
                        <div className="pt-1 flex items-center gap-2 text-xs font-semibold text-[#263D2B]">
                          <span>Festive Rate: ${finalDiscountedPrice} CAD</span>
                          <span className="text-[#6B7068] line-through font-normal text-[11px]">${originalDisplayPrice} CAD</span>
                          <span className="text-[10px] text-[#465640]">• Verified at booking</span>
                        </div>
                      ) : (
                        <p className="text-[11px] text-amber-800 font-medium pt-1">
                          {offerValidation.reason || `This festive offer is valid between ${appliedOffer.startDate} and ${appliedOffer.endDate}. Regular rates will apply for other dates.`}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOfferDismissed(true)}
                    className="text-[#6B7068] hover:text-[#10110F] p-1 rounded-lg hover:bg-white text-xs cursor-pointer shrink-0"
                    title="Remove festival offer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

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
                        disabled={isPrevMonthDisabled}
                        onClick={handlePrevMonth}
                        className={`p-1.5 rounded-lg bg-white border border-[#DCE1D8] text-[#10110F] transition-all ${
                          isPrevMonthDisabled ? 'opacity-30 cursor-not-allowed' : 'hover:border-[#263D2B] cursor-pointer'
                        }`}
                        aria-label="Previous Month"
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
                        aria-label="Next Month"
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
                        const minBookDateStr = getTomorrowLocalDate();
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
                <div id="select-time-section" className="space-y-4 pt-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h4 className="font-serif font-normal text-lg text-[#10110F]">Select Time</h4>
                      {selectedTime ? (
                        <span className="text-xs font-bold text-[#263D2B] bg-[#263D2B]/10 px-2.5 py-0.5 rounded-full border border-[#263D2B]/20">
                          Selected: {selectedTime} – {calculatedEndTime} ({selectedServiceDuration} min)
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                          Please select a time slot
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#6B7068] font-sans">All times in EST (Ottawa)</span>
                  </div>

                  {/* Service Duration & Automatic Slot Blocking Information Pill */}
                  <div className="flex items-center gap-2 text-xs text-[#263D2B] bg-[#263D2B]/5 px-3.5 py-2 rounded-xl border border-[#263D2B]/15">
                    <Clock className="w-4 h-4 text-[#263D2B] shrink-0" />
                    <span>
                      Treatment duration: <strong className="font-bold">{selectedServiceDuration} mins</strong> ({selectedCombo ? `Combo: ${selectedCombo.name}` : (selectedServiceObj?.name || 'Selected Service')}). Overlapping slots are automatically blocked.
                    </span>
                  </div>

                  {slotErrorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-fade-in">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span className="font-medium">{slotErrorMessage}</span>
                    </div>
                  )}

                  {/* 4-Column Time Slots Grid (Generated dynamically at 15-min intervals) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                    {activeTimeSlots.map((slot) => {
                      const booked = isSlotBooked(selectedDate, slot);
                      const isSelected = selectedTime === slot;

                      if (booked) {
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={true}
                            aria-label={`${slot} - Unavailable`}
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
                          aria-label={`${slot} - ${isSelected ? 'Selected' : 'Available'}`}
                          aria-pressed={isSelected}
                          className={`py-3 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center border relative ${
                            isSelected
                              ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-md shadow-[#263D2B]/30 font-bold scale-[1.02] ring-2 ring-[#263D2B] ring-offset-1'
                              : 'bg-white text-[#10110F] border-[#DCE1D8] hover:border-[#263D2B] hover:bg-[#F7F4ED]'
                          }`}
                        >
                          {isSelected && <span className="inline-block mr-1">✓</span>}
                          {slot}
                        </button>
                      );
                    })}
                  </div>

                  {/* Time Legend Bar */}
                  <div className="flex items-center justify-center gap-6 text-[11px] text-[#6B7068] pt-1 font-sans">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-md bg-white border border-[#263D2B]" />
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-md bg-[#263D2B] text-white flex items-center justify-center text-[8px] font-bold">✓</span>
                      <span className="font-semibold text-[#10110F]">Selected</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-md bg-[#F7F4ED] border border-[#DCE1D8] text-[8px] flex items-center justify-center text-[#6B7068]/50">✕</span>
                      <span>Unavailable</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-[#DCE1D8]">
                  <Link
                    to="/"
                    className="global-button-secondary text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 px-4 py-3 font-sans"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Return to Main Page</span>
                  </Link>

                  <button
                    type="button"
                    id="step1-continue-btn"
                    onClick={handleContinueToStep2}
                    className="global-button flex items-center justify-center gap-2 !px-8 !py-3.5 !text-xs uppercase tracking-wider font-sans cursor-pointer shadow-md hover:scale-[1.02] active:scale-98 transition-all"
                  >
                    <span>Continue to Details</span>
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

                {/* Validation error summary banner */}
                {Object.keys(errors).length > 0 && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-fade-in">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="font-medium">Please correct the highlighted fields below to continue.</span>
                  </div>
                )}

                {/* Patron Account Indicator */}
                {currentUser ? (
                  <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#263D2B] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'P'}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                          LINKED PATRON ACCOUNT
                        </span>
                        <span className="font-semibold text-[#10110F]">
                          {currentUser.name} ({currentUser.email})
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#6B7068] hidden sm:inline-block">
                      {currentUser.id}
                    </span>
                  </div>
                ) : (
                  <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between text-xs text-[#6B7068]">
                    <span>Already a patron? Sign in to autofill details.</span>
                    <Link to="/login?redirect=/book-appointment" className="font-bold text-[#263D2B] hover:underline">
                      Sign In
                    </Link>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label htmlFor="customer-name" className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1">
                      Full Name *
                    </label>
                    <input
                      id="customer-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="e.g. Sarah Jenkins"
                      className={`w-full py-3 px-4 bg-[#F7F4ED] border rounded-xl text-xs sm:text-sm text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none focus:border-[#263D2B] transition-colors ${
                        errors.name ? 'border-red-500 bg-red-50/20' : 'border-[#DCE1D8]'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="customer-phone" className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="customer-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      placeholder="e.g. (613) 555-0182"
                      className={`w-full py-3 px-4 bg-[#F7F4ED] border rounded-xl text-xs sm:text-sm text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none focus:border-[#263D2B] transition-colors ${
                        errors.phone ? 'border-red-500 bg-red-50/20' : 'border-[#DCE1D8]'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="customer-email" className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1">
                      Email Address *
                    </label>
                    <input
                      id="customer-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="e.g. sarah@example.com"
                      className={`w-full py-3 px-4 bg-[#F7F4ED] border rounded-xl text-xs sm:text-sm text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none focus:border-[#263D2B] transition-colors ${
                        errors.email ? 'border-red-500 bg-red-50/20' : 'border-[#DCE1D8]'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="customer-notes" className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1">
                      Special Notes <span className="text-[#6B7068] font-normal lowercase">(optional)</span>
                    </label>
                    <textarea
                      id="customer-notes"
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any sensitivities, allergies, or special requests..."
                      className="w-full py-3 px-4 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs sm:text-sm text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none focus:border-[#263D2B] resize-none"
                    />
                  </div>

                  {/* Payment Method Section: Cash on Delivery (Pay at Appointment) */}
                  <div className="pt-3 border-t border-[#DCE1D8] space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F]">
                        Payment Method
                      </label>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Default Selection
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F7F4ED] border-2 border-[#263D2B] shadow-xs">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#263D2B] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between flex-wrap gap-1">
                            <span className="font-serif font-bold text-sm text-[#10110F]">
                              Cash on Delivery (Pay at Appointment)
                            </span>
                            <span className="text-xs font-mono font-bold text-[#263D2B]">
                              $0.00 Due Online
                            </span>
                          </div>
                          <p className="text-xs text-[#6B7068] leading-relaxed">
                            No advance deposit, credit card, or online transaction required. Total amount of <strong className="text-[#10110F]">${finalDiscountedPrice} CAD</strong> is payable in cash upon completion of your beauty ritual in studio.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-[#DCE1D8]">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(1);
                      scrollToBookingTop();
                    }}
                    className="global-button-secondary text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 px-4 py-3"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Date & Time</span>
                  </button>

                  <button
                    type="button"
                    id="confirm-booking-btn"
                    disabled={isSubmitting}
                    onClick={(e) => {
                      if (validateDetailsStep()) {
                        handleFinalSubmit(e);
                      }
                    }}
                    className="global-button flex items-center justify-center gap-2 !px-8 !py-3.5 !text-xs uppercase tracking-wider font-sans cursor-pointer shadow-md hover:scale-[1.02] active:scale-98 transition-all"
                  >
                    <span>{isSubmitting ? 'Confirming Appointment...' : 'Confirm Booking'}</span>
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
                  {confirmedBooking.isSalonDay && confirmedBooking.itineraryServices && confirmedBooking.itineraryServices.length > 0 && (
                    <div className="border-b border-[#DCE1D8] pb-2 space-y-1.5 bg-[#263D2B]/5 p-2 rounded-xl">
                      <span className="text-[10.5px] font-bold text-[#263D2B] uppercase tracking-wider block">
                        Included Salon Day Itinerary ({confirmedBooking.itineraryServices.length} Treatments):
                      </span>
                      <div className="space-y-1">
                        {confirmedBooking.itineraryServices.map((svc, sIdx) => (
                          <div key={sIdx} className="flex justify-between text-[11px] text-[#10110F]">
                            <span>{sIdx + 1}. {svc.name}</span>
                            <span className="text-[#6B7068] font-mono">${svc.price} CAD • {svc.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {confirmedBooking.isCombo && confirmedBooking.includedServices && confirmedBooking.includedServices.length > 0 && (
                    <div className="border-b border-[#DCE1D8] pb-2 space-y-1.5 bg-[#263D2B]/5 p-2 rounded-lg">
                      <span className="text-[10.5px] font-bold text-[#263D2B] uppercase tracking-wider block">
                        Included Rituals In This Combo:
                      </span>
                      <div className="space-y-1">
                        {confirmedBooking.includedServices.map((svc, sIdx) => (
                          <div key={sIdx} className="flex justify-between text-[11px] text-[#10110F]">
                            <span>• {svc.name}</span>
                            <span className="text-[#6B7068] font-mono">{svc.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {confirmedBooking.offerTitle && (
                    <div className="flex justify-between border-b border-[#DCE1D8] pb-2 text-xs text-[#263D2B] font-bold">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Festive Special ({confirmedBooking.festival}):</span>
                      </span>
                      <span className="truncate max-w-[180px]">{confirmedBooking.offerTitle}</span>
                    </div>
                  )}
                  {confirmedBooking.customizations && (
                    <div className="border-b border-[#DCE1D8] pb-2 space-y-1.5 bg-[#263D2B]/5 p-2.5 rounded-xl">
                      <span className="text-[10.5px] font-bold text-[#263D2B] uppercase tracking-wider block">
                        Tailored Customizations:
                      </span>
                      {confirmedBooking.customizations.selectedOption && (
                        <div className="flex justify-between text-[11px] text-[#10110F]">
                          <span>• Tier: {confirmedBooking.customizations.selectedOption.name}</span>
                          <span className="text-[#263D2B] font-mono font-semibold">
                            {confirmedBooking.customizations.selectedOption.priceAdjustment > 0 
                              ? `+CAD $${Number(confirmedBooking.customizations.selectedOption.priceAdjustment).toFixed(2)}` 
                              : 'Included'}
                          </span>
                        </div>
                      )}
                      {confirmedBooking.customizations.selectedAddons && confirmedBooking.customizations.selectedAddons.length > 0 && (
                        <div className="space-y-1 pt-1">
                          {confirmedBooking.customizations.selectedAddons.map((ad, aIdx) => (
                            <div key={aIdx} className="flex justify-between text-[11px] text-[#10110F]">
                              <span>+ {ad.name}</span>
                              <span className="text-[#263D2B] font-mono font-semibold">
                                +CAD ${Number(ad.price).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex justify-between border-b border-[#DCE1D8] pb-2">
                    <span className="text-[#6B7068] font-semibold">Total Payable at Salon:</span>
                    <div className="text-right">
                      <span className="font-bold text-[#263D2B]">${confirmedBooking.servicePrice} CAD</span>
                      {confirmedBooking.discountAmount > 0 && (
                        <span className="text-[10px] text-[#465640] block font-semibold">
                          (Saved ${confirmedBooking.discountAmount} CAD)
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between border-b border-[#DCE1D8] pb-2">
                    <span className="text-[#6B7068] font-semibold">Payment Method:</span>
                    <span className="font-bold text-[#263D2B]">Cash on Delivery (Pay at Appointment)</span>
                  </div>
                  <div className="flex justify-between border-b border-[#DCE1D8] pb-2">
                    <span className="text-[#6B7068] font-semibold">Date & Time:</span>
                    <span className="font-bold text-[#10110F]">
                      {confirmedBooking.date} • {confirmedBooking.startTime || confirmedBooking.time}{confirmedBooking.endTime ? ` – ${confirmedBooking.endTime}` : ''} ({confirmedBooking.serviceDuration || `${confirmedBooking.durationMinutes} min`})
                    </span>
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
          <div className="col-span-12 md:col-span-5 xl:col-span-3 space-y-5 sm:space-y-6 md:sticky md:top-24">
            <div className="bg-white rounded-3xl p-4 sm:p-5 lg:p-6 border border-[#DCE1D8] shadow-md space-y-4 sm:space-y-5">
              <h3 className="font-serif font-normal text-lg text-[#10110F]">Appointment Summary</h3>

              {/* Service Thumbnail & Info */}
              <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center gap-3">
                <img 
                  src={selectedItinerary ? (selectedItinerary.services[0]?.image || floralImg) : (selectedCombo ? selectedCombo.image : (selectedServiceObj.image || floralImg))} 
                  alt={selectedItinerary ? 'Salon Day Itinerary' : (selectedCombo ? selectedCombo.name : selectedServiceObj.name)}
                  onError={(e) => { 
                    e.currentTarget.onerror = null; 
                    if (floralImg && e.currentTarget.src !== floralImg) {
                      e.currentTarget.src = floralImg;
                    }
                  }}
                  className="w-12 h-12 rounded-xl object-cover shrink-0" 
                />
                <div className="min-w-0">
                  <h4 className="font-serif font-normal text-[#10110F] text-sm truncate">
                    {selectedItinerary ? `Salon Day (${selectedItinerary.itemCount} Treatments)` : (selectedCombo ? selectedCombo.name : (selectedServiceObj.name || 'Threading'))}
                  </h4>
                  <span className="text-[10px] text-[#6B7068] block truncate">
                    {selectedItinerary 
                      ? `${selectedItinerary.itemCount} Treatments • ${selectedItinerary.durationDisplay}` 
                      : `${selectedCombo ? (selectedCombo.categoryTag || 'Combo Package') : (selectedServiceObj.categoryName || 'Eyebrows')} • ${selectedCombo ? (selectedCombo.durationDisplay || `${selectedServiceDuration} min`) : (selectedServiceObj.duration || '45 min')}`}
                  </span>
                  {savingsAmount > 0 ? (
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs line-through text-[#6B7068]">${originalDisplayPrice} CAD</span>
                      <span className="text-xs font-bold text-[#263D2B]">${finalDiscountedPrice} CAD</span>
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-[#10110F]">${finalDiscountedPrice} CAD</span>
                  )}
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
                    <span className="font-semibold text-xs text-[#10110F]">
                      {selectedItinerary ? selectedItinerary.durationDisplay : (selectedCombo ? (selectedCombo.durationDisplay || `${selectedServiceDuration} mins`) : (selectedServiceObj.duration || '45 min'))}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-[#263D2B] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#263D2B]" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6B7068] uppercase font-bold block">Appointment Time</span>
                    <span className="font-semibold text-xs">
                      {selectedTime ? `${selectedTime} – ${calculatedEndTime}` : 'Select a time'}
                    </span>
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

              {/* Financial Price Breakdown Card */}
              <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2 text-xs font-sans">
                <div className="flex justify-between items-center text-[#6B7068]">
                  <span>{selectedItinerary ? 'Itinerary Subtotal:' : 'Regular Service Rate:'}</span>
                  <span className={(isOfferActive || selectedItinerary) && savingsAmount > 0 ? "line-through text-[#6B7068]" : "font-bold text-[#10110F]"}>
                    ${originalDisplayPrice} CAD
                  </span>
                </div>
                {selectedItinerary && selectedItinerary.discountAmount > 0 && (
                  <div className="flex justify-between items-center text-[#263D2B] font-bold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Salon Day Perk ({selectedItinerary.discountPercent}% OFF):</span>
                    </span>
                    <span>-${selectedItinerary.discountAmount} CAD</span>
                  </div>
                )}
                {isOfferActive && !selectedItinerary && savingsAmount > 0 && (
                  <div className="flex justify-between items-center text-[#263D2B] font-bold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{appliedOffer?.festival || 'Festive'} Discount:</span>
                    </span>
                    <span>-${savingsAmount} CAD</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#DCE1D8] flex justify-between items-center">
                  <span className="font-bold text-[#10110F]">Payable at Salon:</span>
                  <span className="font-serif font-bold text-base text-[#263D2B]">${finalDiscountedPrice} CAD</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#6B7068] font-medium">Payment Method:</span>
                  <span className="font-bold text-[#263D2B]">Cash on Delivery</span>
                </div>
                <div className="pt-1 flex items-center gap-1.5 text-[10px] text-[#6B7068]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B] shrink-0" />
                  <span>No upfront online charge. Pay in person.</span>
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

              <div className="pills-scroll pb-1 gap-1.5">
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
