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
import { ALL_SERVICES, CATEGORIES } from '../data/servicesData';
import { getWhatsAppBookingUrl, getWhatsAppConfig, sendWhatsAppBookingDirect, formatDisplayPhone } from '../utils/whatsapp';
import salonDB from '../db/salonDatabase';

const STYLISTS = [
  {
    id: 'any',
    name: 'Any Available Stylist',
    role: 'First Available Expert Specialist',
    experience: 'Optimal availability',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80',
    rating: '5.0★'
  },
  {
    id: 'janki',
    name: 'Janki Khatroja',
    role: 'Master Hair & Bridal Artistry Director',
    experience: '12+ Yrs Experience',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=400&q=80',
    rating: '5.0★'
  },
  {
    id: 'sophie',
    name: 'Sophie Dupont',
    role: 'Senior Skin & Aesthetic Specialist',
    experience: '8+ Yrs Experience',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    rating: '4.9★'
  },
  {
    id: 'chloe',
    name: 'Chloe Bennett',
    role: 'Nail Couture & Lash Expert',
    experience: '6+ Yrs Experience',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=400&q=80',
    rating: '4.9★'
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

  // Selections State
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [serviceSearchQuery, setServiceSearchQuery] = useState('');
  const [selectedStylistId, setSelectedStylistId] = useState('any');

  const tomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState(tomorrowStr());
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
  const [showSavedModal, setShowSavedModal] = useState(false);

  // Load saved appointments from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('girl-looked-for-you-appointments');
      if (stored) {
        setSavedAppointments(JSON.parse(stored));
      }
    } catch (err) {
      console.warn('LocalStorage load error:', err);
    }
  }, []);

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
      const matchStylist = STYLISTS.find(st => st.id === preselectedStylistId);
      if (matchStylist) {
        setSelectedStylistId(matchStylist.id);
      }
    }
  }, [preselectedServiceId, preselectedStylistId, availableServices]);

  const selectedServiceObj = availableServices.find((s) => s.id === selectedServiceId);
  const selectedStylistObj = STYLISTS.find((st) => st.id === selectedStylistId) || STYLISTS[0];

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

  // Submit Handler
  const handleFinalSubmit = (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

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
      submittedAt: new Date().toLocaleString()
    };

    // Save to Database
    const savedRecord = salonDB.addAppointment(bookingPayload);
    
    // Save to localStorage
    try {
      const updated = [bookingPayload, ...savedAppointments.filter(a => a.id !== refCode)];
      localStorage.setItem('girl-looked-for-you-appointments', JSON.stringify(updated));
      setSavedAppointments(updated);
    } catch (err) {
      console.warn('LocalStorage save error:', err);
    }

    // Auto-trigger WhatsApp message dispatch
    try {
      sendWhatsAppBookingDirect(bookingPayload);
    } catch (e) {}

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
    { num: 2, label: 'Stylist' },
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
              Reserve your luxury treatment at Lumière Beauty Salon
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
                        <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
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
                <span>Continue to Select Stylist</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: SELECT STYLIST */}
        {/* ========================================================================= */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-brand-pink text-xs font-bold uppercase tracking-[0.2em]">Step 2 of 6</span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">Select Stylist</h2>
              <p className="text-xs sm:text-sm text-white/60">Pick your preferred beauty specialist or choose any available expert.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {STYLISTS.map((stylist) => {
                const isSelected = selectedStylistId === stylist.id;
                return (
                  <div
                    key={stylist.id}
                    onClick={() => setSelectedStylistId(stylist.id)}
                    className={`p-5 rounded-2xl bg-[#1C1418] border transition-all cursor-pointer flex items-center gap-4 ${
                      isSelected
                        ? 'border-brand-pink ring-2 ring-brand-pink/30 shadow-xl bg-[#24171E]'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <img 
                      src={stylist.image} 
                      alt={stylist.name} 
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80';
                      }}
                      className="w-16 h-16 rounded-full object-cover border-2 border-brand-pink/30 flex-shrink-0" 
                    />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif font-bold text-white text-base">{stylist.name}</h3>
                        <span className="text-xs text-amber-400 font-bold">{stylist.rating}</span>
                      </div>
                      <p className="text-xs text-brand-pink-muted font-medium">{stylist.role}</p>
                      <p className="text-[11px] text-white/50">{stylist.experience}</p>
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
                  onChange={(e) => setSelectedDate(e.target.value)}
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
              <p className="text-xs sm:text-sm text-white/60">Choose an available time slot for your appointment.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {TIME_SLOTS.map((slot) => {
                const isSelected = selectedTime === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                      isSelected
                        ? 'bg-brand-pink text-white border-brand-pink shadow-lg shadow-brand-pink/30 scale-105'
                        : 'bg-[#1C1418] text-white/80 border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{slot}</span>
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
                onClick={() => setCurrentStep(5)}
                className="px-8 py-3.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-brand-pink/30 transition-all cursor-pointer flex items-center gap-2"
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
                  <span className="text-white/50 block text-[11px]">Stylist</span>
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
        {/* STEP 7: CONFIRMATION & SUCCESS STATE */}
        {/* ========================================================================= */}
        {currentStep === 7 && confirmedBooking && (
          <div className="max-w-2xl mx-auto text-center space-y-6 py-6 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/40 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-widest border border-emerald-500/30">
                ✓ Appointment Request Created
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
                Booking Confirmed!
              </h2>
              <p className="text-white/70 text-xs sm:text-sm max-w-md mx-auto">
                Thank you, <strong>{confirmedBooking.customerName}</strong>! Your appointment has been registered.
              </p>
            </div>

            {/* Voucher Details */}
            <div className="bg-[#1C1418] border border-white/15 rounded-3xl p-6 sm:p-8 text-left space-y-4 shadow-2xl max-w-lg mx-auto">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs text-white/50 uppercase font-bold tracking-wider">Booking Reference</span>
                <span className="font-mono font-bold text-brand-pink text-base sm:text-lg">{confirmedBooking.referenceCode}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                <div>
                  <span className="text-white/50 block text-[11px]">Treatment</span>
                  <span className="font-bold text-white">{confirmedBooking.service}</span>
                </div>
                <div>
                  <span className="text-white/50 block text-[11px]">Stylist</span>
                  <span className="font-bold text-white">{confirmedBooking.stylist}</span>
                </div>
                <div>
                  <span className="text-white/50 block text-[11px]">Date</span>
                  <span className="font-bold text-white">{confirmedBooking.date}</span>
                </div>
                <div>
                  <span className="text-white/50 block text-[11px]">Time</span>
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
                <span>Saved to browser storage</span>
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
                View Booking
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
                <p className="text-xs text-white/50">Stored in browser localStorage</p>
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
                      <div className="text-white/60">Stylist: {app.stylist || 'Any Stylist'} | Guest: {app.customerName}</div>
                    </div>

                    <button
                      onClick={() => {
                        const updated = savedAppointments.filter(a => (a.id || a.referenceCode) !== (app.id || app.referenceCode));
                        setSavedAppointments(updated);
                        localStorage.setItem('girl-looked-for-you-appointments', JSON.stringify(updated));
                      }}
                      className="p-2 text-white/40 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Delete booking"
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
