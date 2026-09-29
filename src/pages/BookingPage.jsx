import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
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
  ArrowRight,
  ShieldCheck, 
  Scissors, 
  Star, 
  Search, 
  Check, 
  X, 
  MessageCircle,
  FileText,
  Trash2,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import floralImg from '../assets/floral-booking.jpg';
import jankiPhoto from '../assets/janki-khatroja.jpg';
import { ALL_SERVICES, CATEGORIES } from '../data/servicesData';
import { getWhatsAppBookingUrl, getWhatsAppConfig, formatDisplayPhone } from '../utils/whatsapp';
import salonDB from '../db/salonDatabase';

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

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preselectedServiceId = searchParams.get('service');
  const preselectedStylistId = searchParams.get('stylist');

  const { phoneNumber: whatsappNumber } = getWhatsAppConfig();
  const [availableServices, setAvailableServices] = useState(() => salonDB.getServices());

  useEffect(() => {
    setAvailableServices(salonDB.getServices());
    const unsub = salonDB.subscribe(() => {
      setAvailableServices(salonDB.getServices());
    });
    return () => unsub();
  }, []);

  // Step State (1: Treatment, 2: Stylist, 3: Date, 4: Time, 5: Customer Details, 6: Summary, 7: Confirmation)
  const [currentStep, setCurrentStep] = useState(1);

  // Selections State - Janki Khatroja set as sole master artist & owner
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [serviceSearchQuery, setServiceSearchQuery] = useState('');
  const [selectedStylistId, setSelectedStylistId] = useState('janki');

  const tomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState(tomorrowStr());
  const [selectedTime, setSelectedTime] = useState('');
  const [slotErrorMessage, setSlotErrorMessage] = useState('');
  
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

  // Handler for changing date: Clears previously selected time slot and error message
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setSelectedTime(''); // Clear time selection on date change
    setSlotErrorMessage('');
  };

  // Reusable helper: isSlotBooked(date, time)
  const isSlotBooked = (date, time) => {
    return salonDB.isSlotBooked(date, time);
  };

  // Pre-fill service & stylist from URL query parameters
  useEffect(() => {
    if (preselectedServiceId) {
      const match = availableServices.find(
        (s) => s.id === preselectedServiceId || s.name.toLowerCase() === preselectedServiceId.toLowerCase()
      );
      if (match) {
        setSelectedServiceId(match.id);
      }
    }
    if (preselectedStylistId) {
      setSelectedStylistId('janki');
    }
  }, [preselectedServiceId, preselectedStylistId, availableServices]);

  const selectedServiceObj = availableServices.find((s) => s.id === selectedServiceId);
  const selectedStylistObj = STYLISTS[0]; // Janki Khatroja (Main Owner & Lead Artist)

  // Filtering services for Step 1
  const filteredServices = availableServices.filter((s) => {
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

  // Submit Handler with Double Booking Protection
  const handleFinalSubmit = (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setSlotErrorMessage('');

    // Double Booking Protection: Re-check localStorage before confirming
    if (isSlotBooked(selectedDate, selectedTime)) {
      setIsSubmitting(false);
      setSlotErrorMessage("Sorry, this time slot was just booked. Please select another available time.");
      setSelectedTime(''); // Clear invalid selection
      setCurrentStep(4); // Jump back to Time Selection step
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
      serviceCategory: selectedServiceObj ? selectedServiceObj.categoryName : 'Hair Care',
      stylistId: selectedStylistObj.id,
      stylist: selectedStylistObj.name,
      stylistRole: selectedStylistObj.role,
      date: selectedDate,
      time: selectedTime,
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      notes: formData.notes.trim(),
      status: 'Pending',
      submittedAt: new Date().toLocaleString()
    };

    // Save to Salon Database
    salonDB.addAppointment(bookingPayload);

    setConfirmedBooking(bookingPayload);
    setIsSubmitting(false);
    setCurrentStep(7); // Jump to Step 7: Confirmation

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D83A75', '#E95E92', '#F3E5AB', '#C59A45']
      });
    } catch (err) {}
  };

  const handleResetBooking = () => {
    setConfirmedBooking(null);
    setCurrentStep(1);
    setSelectedServiceId('');
    setFormData({ name: '', phone: '', email: '', notes: '' });
    setErrors({});
  };

  const stepsList = [
    { num: 1, label: 'Treatment' },
    { num: 2, label: 'Master Artist' },
    { num: 3, label: 'Date' },
    { num: 4, label: 'Time' },
    { num: 5, label: 'Details' },
    { num: 6, label: 'Summary' },
    { num: 7, label: 'Confirmation' }
  ];

  return (
    <div className="min-h-screen bg-[#140E11] text-white flex flex-col justify-between selection:bg-brand-pink selection:text-white">
      
      {/* 1. TOP STANDALONE DEDICATED HEADER */}
      <header className="sticky top-0 z-40 bg-[#140E11]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 sm:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back to Home Button */}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all border border-white/15 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-brand-pink" />
            <span>Back to Home</span>
          </button>

          {/* Center Brand Title */}
          <div className="text-center">
            <h1 className="font-serif text-lg sm:text-2xl font-bold text-white tracking-tight">
              Book Your Appointment
            </h1>
            <p className="hidden sm:block text-[11px] sm:text-xs text-white/60">
              Personalized treatment with Master Artist & Owner Janki Khatroja
            </p>
          </div>

          {/* Saved Appointments Count Button */}
          <button
            type="button"
            onClick={() => setShowSavedModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-white/80 hover:text-white text-xs transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-brand-pink" />
            <span className="hidden sm:inline">My Bookings</span>
            {savedAppointments.length > 0 && (
              <span className="bg-brand-pink text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {savedAppointments.length}
              </span>
            )}
          </button>

        </div>
      </header>

      {/* 2. 7-STEP PROGRESS INDICATOR BAR */}
      {currentStep <= 6 && (
        <div className="bg-[#1C1418] border-b border-white/10 py-3 px-4 overflow-x-auto scrollbar-none">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 min-w-[550px]">
            {stepsList.slice(0, 6).map((st) => {
              const isCompleted = currentStep > st.num;
              const isActive = currentStep === st.num;
              return (
                <div 
                  key={st.num}
                  onClick={() => {
                    if (isCompleted) setCurrentStep(st.num);
                  }}
                  className={`flex items-center gap-2 cursor-pointer transition-all ${
                    isCompleted ? 'text-brand-pink font-medium' : isActive ? 'text-white font-bold' : 'text-white/30'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full text-xs flex items-center justify-center font-bold ${
                    isActive
                      ? 'bg-brand-pink text-white shadow-md shadow-brand-pink/30 scale-110'
                      : isCompleted
                        ? 'bg-brand-pink/20 text-brand-pink border border-brand-pink/40'
                        : 'bg-white/5 text-white/40 border border-white/10'
                  }`}>
                    {isCompleted ? <Check className="w-3.5 h-3.5" /> : st.num}
                  </div>
                  <span className="text-xs whitespace-nowrap">{st.label}</span>
                  {st.num < 6 && <ChevronRight className="w-3.5 h-3.5 text-white/20 ml-1" />}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. MAIN STEP-BY-STEP CONTENT AREA */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        
        {/* ========================================================================= */}
        {/* STEP 1: SELECT TREATMENT */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-brand-pink text-xs font-bold uppercase tracking-[0.2em]">Step 1 of 6</span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">Select Treatment</h2>
              <p className="text-xs sm:text-sm text-white/60">Choose your desired treatment from our comprehensive salon menu.</p>
            </div>

            {/* Selected Treatment Preview Banner (If already pre-selected) */}
            {selectedServiceObj && (
              <div className="p-4 rounded-2xl bg-brand-pink/10 border border-brand-pink/30 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={selectedServiceObj.image || floralImg} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <span className="text-[10px] text-brand-pink font-bold uppercase">{selectedServiceObj.categoryName}</span>
                    <h4 className="font-serif font-bold text-white text-base">{selectedServiceObj.name}</h4>
                    <p className="text-xs text-white/70">{selectedServiceObj.duration} • ${selectedServiceObj.price} CAD</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white text-xs font-bold transition-all shadow-md cursor-pointer flex-shrink-0"
                >
                  Continue with Selection →
                </button>
              </div>
            )}

            {/* Search & Category Filter Controls */}
            <div className="space-y-4">
              <div className="relative max-w-md mx-auto">
                <Search className="w-4 h-4 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={serviceSearchQuery}
                  onChange={(e) => setServiceSearchQuery(e.target.value)}
                  placeholder="Search treatments by name or keyword..."
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/15 rounded-full text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-brand-pink"
                />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-brand-pink text-white shadow-md'
                        : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Services Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredServices.map((service) => {
                const isSelected = selectedServiceId === service.id;
                return (
                  <div
                    key={service.id}
                    onClick={() => setSelectedServiceId(service.id)}
                    className={`p-4 rounded-2xl bg-[#1C1418] border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-brand-pink ring-2 ring-brand-pink/30 shadow-xl shadow-brand-pink/10 bg-[#24171E]'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black/20">
                        <img 
                          src={service.image} 
                          alt={service.name} 
                          onError={(e) => { e.currentTarget.src = floralImg; }}
                          className="w-full h-full object-cover" 
                        />
                        <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-brand-pink-muted text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                          {service.categoryName}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-serif font-bold text-white text-base">{service.name}</h3>
                        <p className="text-white/60 text-xs line-clamp-2 mt-1">{service.description}</p>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-white/50 block">Price</span>
                        <span className="font-serif font-bold text-white text-base">${service.price} CAD</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedServiceId(service.id);
                          setCurrentStep(2);
                        }}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-brand-pink text-white shadow-md'
                            : 'bg-white/10 text-white hover:bg-brand-pink hover:text-white'
                        }`}
                      >
                        {isSelected ? 'Selected ✓' : 'Select'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Step 1 Next Button */}
            <div className="pt-6 flex justify-end">
              <button
                type="button"
                disabled={!selectedServiceId}
                onClick={() => setCurrentStep(2)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-brand-pink/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Continue to Select Artist</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: SELECT STYLIST (SOLE MASTER ARTIST & OWNER JANKI KHATROJA) */}
        {/* ========================================================================= */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-brand-pink text-xs font-bold uppercase tracking-[0.2em]">Step 2 of 6</span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">Your Master Artist & Owner</h2>
              <p className="text-xs sm:text-sm text-white/60">Your luxury treatment will be personally conducted by Janki Khatroja.</p>
            </div>

            <div className="max-w-lg mx-auto">
              {STYLISTS.map((stylist) => {
                return (
                  <div
                    key={stylist.id}
                    className="p-6 sm:p-8 rounded-3xl bg-[#1C1418] border border-brand-pink ring-2 ring-brand-pink/30 shadow-2xl bg-[#24171E] flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left"
                  >
                    <img 
                      src={stylist.image} 
                      alt={stylist.name} 
                      onError={(e) => {
                        e.currentTarget.src = jankiPhoto;
                      }}
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-brand-pink shadow-xl flex-shrink-0" 
                    />
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2">
                        <h3 className="font-serif font-bold text-white text-xl sm:text-2xl">{stylist.name}</h3>
                        <span className="text-xs text-amber-400 font-bold bg-amber-400/10 px-3 py-0.5 rounded-full border border-amber-400/20">{stylist.rating}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-brand-pink font-semibold">{stylist.role}</p>
                      <p className="text-xs text-white/70">{stylist.experience}</p>
                      <div className="pt-2 flex items-center justify-center sm:justify-start gap-1.5 text-xs text-emerald-400 font-medium">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>Salon Founder & Primary Lead Artist</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-8 py-3.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-brand-pink/30 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Continue to Select Date</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: SELECT DATE */}
        {/* ========================================================================= */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in max-w-xl mx-auto">
            <div className="text-center space-y-2">
              <span className="text-brand-pink text-xs font-bold uppercase tracking-[0.2em]">Step 3 of 6</span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">Select Date</h2>
              <p className="text-xs sm:text-sm text-white/60">Choose your appointment date below.</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#1C1418] border border-white/10 space-y-6 shadow-xl text-center">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                  Pick a Date
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="w-full max-w-xs mx-auto py-3 px-4 bg-white/5 border border-white/20 rounded-xl text-center text-sm font-semibold text-white focus:outline-none focus:border-brand-pink cursor-pointer"
                />
              </div>

              {/* Selected Date Summary Display */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
                <span className="text-[11px] text-white/50 block">Selected Appointment Date</span>
                <span className="font-serif font-bold text-xl text-brand-pink">
                  {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-8 py-3.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-brand-pink/30 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Continue to Select Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: SELECT TIME */}
        {/* ========================================================================= */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
            <div className="text-center space-y-2">
              <span className="text-brand-pink text-xs font-bold uppercase tracking-[0.2em]">Step 4 of 6</span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">Select Time</h2>
              <p className="text-xs sm:text-sm text-white/60">
                Choose an available time slot for <strong className="text-white font-semibold">{new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong>.
              </p>
            </div>

            {/* Double Booking Warning Banner */}
            {slotErrorMessage && (
              <div className="p-4 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-center gap-3 animate-fade-in">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span>{slotErrorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {TIME_SLOTS.map((slot) => {
                const booked = isSlotBooked(selectedDate, slot);
                const isSelected = selectedTime === slot;

                if (booked) {
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={true}
                      className="py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-semibold opacity-50 bg-red-950/20 border border-red-500/20 text-red-300 cursor-not-allowed flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-red-400/60" />
                        <span className="line-through">{slot}</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-red-500/20 px-2 py-0.5 rounded-full border border-red-500/30">
                        BOOKED
                      </span>
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
                    className={`py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between border ${
                      isSelected
                        ? 'bg-brand-pink text-white border-brand-pink shadow-lg shadow-brand-pink/30 scale-105'
                        : 'bg-[#1C1418] text-white/80 border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{slot}</span>
                    </div>
                    <span className={`text-[10px] font-medium ${isSelected ? 'text-white font-bold' : 'text-emerald-400'}`}>
                      {isSelected ? 'Selected ✓' : 'Available'}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pt-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                disabled={!selectedTime || isSlotBooked(selectedDate, selectedTime)}
                onClick={() => setCurrentStep(5)}
                className="px-8 py-3.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-brand-pink/30 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Continue to Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 5: CUSTOMER DETAILS */}
        {/* ========================================================================= */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fade-in max-w-xl mx-auto">
            <div className="text-center space-y-2">
              <span className="text-brand-pink text-xs font-bold uppercase tracking-[0.2em]">Step 5 of 6</span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">Customer Details</h2>
              <p className="text-xs sm:text-sm text-white/60">Enter your contact information for confirmation.</p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#1C1418] border border-white/10 space-y-4 shadow-xl">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className={`w-full py-3 px-4 bg-white/5 border rounded-xl text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-brand-pink ${
                    errors.name ? 'border-red-500' : 'border-white/15'
                  }`}
                />
                {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(613) 555-0182"
                  className={`w-full py-3 px-4 bg-white/5 border rounded-xl text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-brand-pink ${
                    errors.phone ? 'border-red-500' : 'border-white/15'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className={`w-full py-3 px-4 bg-white/5 border rounded-xl text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-brand-pink ${
                    errors.email ? 'border-red-500' : 'border-white/15'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                  Special Notes / Requests <span className="text-white/40 font-normal lowercase">(optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any special requests or allergies..."
                  className="w-full py-3 px-4 bg-white/5 border border-white/15 rounded-xl text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-brand-pink resize-none"
                />
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (validateDetailsStep()) {
                    setCurrentStep(6);
                  }
                }}
                className="px-8 py-3.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-brand-pink/30 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Review Booking</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 6: BOOKING SUMMARY & REVIEW */}
        {/* ========================================================================= */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-fade-in max-w-xl mx-auto">
            <div className="text-center space-y-2">
              <span className="text-brand-pink text-xs font-bold uppercase tracking-[0.2em]">Step 6 of 6</span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">Booking Summary</h2>
              <p className="text-xs sm:text-sm text-white/60">Review all details before confirming your appointment.</p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#1C1418] border border-white/15 space-y-4 shadow-2xl">
              <div className="pb-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-brand-pink font-bold uppercase tracking-wider block">Treatment</span>
                  <h3 className="font-serif font-bold text-white text-lg sm:text-xl">
                    {selectedServiceObj ? selectedServiceObj.name : 'Selected Service'}
                  </h3>
                  <span className="text-xs text-white/60">
                    {selectedServiceObj ? `${selectedServiceObj.duration} • ${selectedServiceObj.categoryName}` : ''}
                  </span>
                </div>
                <span className="font-serif font-bold text-xl text-white">
                  ${selectedServiceObj ? selectedServiceObj.price : 85} CAD
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm py-2">
                <div>
                  <span className="text-white/50 block text-[11px]">Artist & Owner</span>
                  <span className="font-semibold text-white">{selectedStylistObj.name}</span>
                </div>
                <div>
                  <span className="text-white/50 block text-[11px]">Date & Time</span>
                  <span className="font-semibold text-white">{selectedDate} • {selectedTime}</span>
                </div>
                <div>
                  <span className="text-white/50 block text-[11px]">Customer</span>
                  <span className="font-semibold text-white">{formData.name}</span>
                </div>
                <div>
                  <span className="text-white/50 block text-[11px]">Phone</span>
                  <span className="font-semibold text-white">{formData.phone}</span>
                </div>
              </div>

              {formData.notes && (
                <div className="pt-3 border-t border-white/10 text-xs">
                  <span className="text-white/50 block text-[11px]">Notes</span>
                  <span className="text-white/80 italic">"{formData.notes}"</span>
                </div>
              )}
            </div>

            <div className="pt-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Edit</span>
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleFinalSubmit}
                className="flex-1 max-w-xs py-3.5 px-6 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-brand-pink/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Confirming...' : 'Confirm & Complete Booking'}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 7: CONFIRMATION & PENDING OWNER APPROVAL STATE */}
        {/* ========================================================================= */}
        {currentStep === 7 && confirmedBooking && (
          <div className="max-w-2xl mx-auto text-center space-y-6 py-6 animate-fade-in">
            {/* Live Status Icon */}
            {confirmedBooking.status === 'Confirmed' ? (
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/40 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-amber-500/20 text-amber-400 border-2 border-amber-500/40 flex items-center justify-center mx-auto shadow-inner">
                <Clock className="w-10 h-10 animate-pulse" />
              </div>
            )}

            <div className="space-y-2">
              {confirmedBooking.status === 'Confirmed' ? (
                <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-widest border border-emerald-500/30">
                  ✓ Appointment Confirmed by Owner
                </span>
              ) : (
                <span className="inline-block px-4 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs uppercase tracking-widest border border-amber-500/30">
                  ⏳ Booking Request Submitted — Awaiting Owner Approval
                </span>
              )}

              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
                {confirmedBooking.status === 'Confirmed' ? 'Booking Confirmed!' : 'Request Received!'}
              </h2>
              <p className="text-white/70 text-xs sm:text-sm max-w-md mx-auto">
                Thank you, <strong>{confirmedBooking.customerName}</strong>! Your appointment request for <strong>{confirmedBooking.service}</strong> has been sent to salon owner <strong>Janki Khatroja</strong>.
              </p>
            </div>

            {/* Voucher / Ticket Details */}
            <div className="bg-[#1C1418] border border-white/15 rounded-3xl p-6 sm:p-8 text-left space-y-4 shadow-2xl max-w-lg mx-auto">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="text-xs text-white/50 uppercase font-bold tracking-wider block">Booking Reference</span>
                  <span className="font-mono font-bold text-brand-pink text-base sm:text-lg">{confirmedBooking.referenceCode}</span>
                </div>
                <div>
                  {confirmedBooking.status === 'Confirmed' ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                      ✓ Confirmed
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 animate-pulse">
                      ⏳ Pending Owner Confirmation
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                <div>
                  <span className="text-white/50 block text-[11px]">Treatment</span>
                  <span className="font-bold text-white">{confirmedBooking.service}</span>
                </div>
                <div>
                  <span className="text-white/50 block text-[11px]">Artist & Owner</span>
                  <span className="font-bold text-white">{confirmedBooking.stylist}</span>
                </div>
                <div>
                  <span className="text-white/50 block text-[11px]">Date</span>
                  <span className="font-bold text-white">{confirmedBooking.date}</span>
                </div>
                <div>
                  <span className="text-white/50 block text-[11px]">Time Slot</span>
                  <span className="font-bold text-white">{confirmedBooking.time}</span>
                </div>
                <div>
                  <span className="text-white/50 block text-[11px]">Price</span>
                  <span className="font-bold text-brand-pink">${confirmedBooking.servicePrice} CAD</span>
                </div>
                <div>
                  <span className="text-white/50 block text-[11px]">Guest Phone</span>
                  <span className="font-bold text-white">{confirmedBooking.phone}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 text-[11px] text-white/50 flex items-center justify-between">
                <span>Location: 450 Bank St, Ottawa, ON</span>
                <span>Status: {confirmedBooking.status || 'Pending'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Back to Home
              </button>

              <button
                type="button"
                onClick={() => setShowSavedModal(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                View Status in My Bookings
              </button>

              <button
                type="button"
                onClick={handleResetBooking}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-pink/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        )}

      </main>

      {/* 4. SAVED APPOINTMENTS MODAL */}
      {showSavedModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowSavedModal(false)}
        >
          <div 
            className="bg-[#1C1418] rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div>
                <h3 className="font-serif font-bold text-lg text-white">Your Saved Bookings</h3>
                <p className="text-xs text-white/50">Track live approval status from Janki Khatroja</p>
              </div>
              <button
                onClick={() => setShowSavedModal(false)}
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {savedAppointments.length > 0 ? (
              <div className="space-y-3">
                {savedAppointments.map((app) => (
                  <div key={app.id || app.referenceCode} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-brand-pink">{app.referenceCode || app.id}</span>
                        <span className="text-white/50">• {app.date} at {app.time}</span>
                      </div>
                      <div className="font-bold text-sm text-white">{app.service}</div>
                      <div className="text-white/60">Artist: {app.stylist || 'Janki Khatroja'} | Guest: {app.customerName}</div>
                      
                      {/* Live Approval Status Tag */}
                      <div className="pt-1">
                        {app.status === 'Confirmed' ? (
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-500/30">
                            ✓ Confirmed by Owner
                          </span>
                        ) : app.status === 'Cancelled' ? (
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 font-bold text-[10px] border border-red-500/30">
                            ❌ Declined / Cancelled
                          </span>
                        ) : (
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] border border-amber-500/30 animate-pulse">
                            ⏳ Pending Owner Confirmation
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        salonDB.deleteAppointment(app.id || app.referenceCode);
                      }}
                      className="p-2 text-white/40 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Cancel / Remove Booking"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-white/50 text-xs">
                No saved appointments found.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. FOOTER */}
      <footer className="py-4 px-6 border-t border-white/10 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Lumière Beauty Salon • 450 Bank St, Ottawa, ON
      </footer>

    </div>
  );
}
