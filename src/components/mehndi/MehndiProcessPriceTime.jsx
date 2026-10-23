// GLAM GIRL BY JANKI — Mehndi Application Process — Price & Time
// Interactive 16-Service Menu with Live Multi-Select Price & Time Calculator,
// 6-Step Application Process Timeline, Admin Price/Duration Manager, and Direct Booking Integration.

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  Clock,
  CheckCircle2,
  Check,
  X,
  ChevronRight,
  ShieldCheck,
  Compass,
  Layers,
  Flower2,
  Leaf,
  SlidersHorizontal,
  Edit2,
  RotateCcw,
  Plus,
  Trash2,
  DollarSign,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  User,
  Phone,
  Mail,
  Info
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import salonDB from '../../db/salonDatabase';
import {
  DEFAULT_MEHNDI_PROCESS_SERVICES,
  MEHNDI_APPLICATION_PROCESS_STEPS,
  calculateTotalMehndiPrice,
  calculateTotalMehndiTime
} from '../../data/mehndiProcessData';

export default function MehndiProcessPriceTime() {
  const navigate = useNavigate();

  // ---------------------------------------------------------------------------
  // STATE: SERVICES & ADMIN CONTROLS
  // ---------------------------------------------------------------------------
  const [services, setServices] = useState(() => salonDB.getMehndiProcessServices());
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [selectedServiceIds, setSelectedServiceIds] = useState(['front-hand-mehndi']);
  const [activeStepTab, setActiveStepTab] = useState(0);

  // Admin Modal & Editing
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminServiceEdit, setAdminServiceEdit] = useState(null);
  const [adminNotification, setAdminNotification] = useState('');

  // Booking Modal State
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '11:00 AM',
    fullName: '',
    email: '',
    phone: '',
    notes: ''
  });

  // Subscribe to live database updates
  useEffect(() => {
    const syncServices = () => {
      setServices(salonDB.getMehndiProcessServices());
    };
    const unsubscribe = salonDB.subscribe((event) => {
      if (event === 'mehndi_process_pricing_updated') {
        syncServices();
      }
    });
    return () => unsubscribe();
  }, []);

  // Filtered services
  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      if (activeCategoryFilter === 'all') return true;
      if (activeCategoryFilter === 'hand') return s.category === 'hand';
      if (activeCategoryFilter === 'feet') return s.category === 'feet';
      if (activeCategoryFilter === 'bridal') return s.category === 'bridal';
      if (activeCategoryFilter === 'custom') return s.category === 'custom';
      return true;
    });
  }, [services, activeCategoryFilter]);

  // Selected Services objects
  const selectedServices = useMemo(() => {
    return services.filter((s) => selectedServiceIds.includes(s.id));
  }, [services, selectedServiceIds]);

  // Aggregated Price & Time
  const priceTotals = useMemo(() => {
    return calculateTotalMehndiPrice(selectedServices);
  }, [selectedServices]);

  const timeTotals = useMemo(() => {
    return calculateTotalMehndiTime(selectedServices);
  }, [selectedServices]);

  // Toggle selection
  const handleToggleService = (serviceId) => {
    setSelectedServiceIds((prev) => {
      if (prev.includes(serviceId)) {
        // keep at least 1 or allow 0
        return prev.filter((id) => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };

  const handleClearSelections = () => {
    setSelectedServiceIds([]);
  };

  const handleSelectPreset = (presetType) => {
    if (presetType === 'bridal-full') {
      setSelectedServiceIds(['bridal-hands-feet']);
    } else if (presetType === 'front-back') {
      setSelectedServiceIds(['front-hand-mehndi', 'back-hand-mehndi']);
    } else if (presetType === 'festival-duo') {
      setSelectedServiceIds(['arabic-mehndi', 'feet-mehndi']);
    } else if (presetType === 'minimalist') {
      setSelectedServiceIds(['simple-finger-mehndi', 'minimal-mehndi']);
    }
  };

  // ---------------------------------------------------------------------------
  // ADMIN SAVE / EDIT HANDLERS
  // ---------------------------------------------------------------------------
  const handleOpenAdminEdit = (service) => {
    setAdminServiceEdit({ ...service });
    setShowAdminModal(true);
  };

  const handleSaveAdminService = (e) => {
    e.preventDefault();
    if (!adminServiceEdit) return;

    salonDB.updateMehndiProcessService(adminServiceEdit.id, {
      name: adminServiceEdit.name,
      applicationTime: adminServiceEdit.applicationTime,
      suggestedPriceDisplay: adminServiceEdit.suggestedPriceDisplay,
      suggestedPriceCad: Number(adminServiceEdit.suggestedPriceCad) || 0,
      minPrice: Number(adminServiceEdit.minPrice) || 0,
      maxPrice: Number(adminServiceEdit.maxPrice) || Number(adminServiceEdit.minPrice) || 0,
      minMinutes: Number(adminServiceEdit.minMinutes) || 15,
      maxMinutes: Number(adminServiceEdit.maxMinutes) || 30,
      available: adminServiceEdit.available,
      isApprovedByAdmin: adminServiceEdit.isApprovedByAdmin
    });

    setAdminNotification(`Successfully updated "${adminServiceEdit.name}" pricing & durations!`);
    setTimeout(() => setAdminNotification(''), 4000);
    setShowAdminModal(false);
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset all 16 Mehndi services, suggested prices, and application times to original catalog defaults?')) {
      salonDB.resetMehndiProcessServices();
      setAdminNotification('Reset all Mehndi services to default suggested pricing and times.');
      setTimeout(() => setAdminNotification(''), 4000);
      setShowAdminModal(false);
    }
  };

  // ---------------------------------------------------------------------------
  // BOOKING HANDLER
  // ---------------------------------------------------------------------------
  const handleDirectBookingNav = () => {
    const primaryId = selectedServices[0]?.serviceIdRef || 'bridal-mehndi';
    const names = selectedServices.map((s) => s.name).join(', ');
    const params = new URLSearchParams({
      service: primaryId,
      customService: `Mehndi Application: ${names}`,
      price: priceTotals.display,
      duration: timeTotals.display
    });
    navigate(`/book-appointment?${params.toString()}`);
  };

  const handleQuickBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.fullName || !bookingForm.phone || !bookingForm.date) {
      alert('Please provide your name, phone number, and preferred date.');
      return;
    }

    setIsSubmittingBooking(true);

    const names = selectedServices.map((s) => s.name).join(' + ') || 'Custom Mehndi Process';
    const payload = {
      id: 'bk_mproc_' + Date.now().toString(36),
      serviceId: selectedServices[0]?.serviceIdRef || 'bridal-mehndi',
      serviceName: `Mehndi Design: ${names}`,
      category: 'henna',
      price: priceTotals.min,
      priceDisplay: priceTotals.display,
      duration: timeTotals.display,
      date: bookingForm.date,
      time: bookingForm.time,
      customerName: bookingForm.fullName.trim(),
      customerEmail: bookingForm.email.trim(),
      customerPhone: bookingForm.phone.trim(),
      notes: `Custom Mehndi Package: ${names}. Est Time: ${timeTotals.display}. Client Notes: ${bookingForm.notes.trim()}`,
      createdAt: new Date().toISOString(),
      status: 'Pending',
      appointmentStatus: 'Pending',
      paymentMethod: 'Cash on Delivery',
      source: 'Mehndi Process — Price & Time Section'
    };

    try {
      salonDB.addAppointment(payload);
    } catch (err) {
      console.warn('Booking save error:', err);
    }

    // Celebration confetti
    import('canvas-confetti')
      .then(({ default: confetti }) => {
        confetti({
          particleCount: 65,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#263D2B', '#465640', '#A8B5A0', '#F7F4ED']
        });
      })
      .catch(() => {});

    setBookingSuccess(true);
    setIsSubmittingBooking(false);
  };

  return (
    <section 
      id="mehndi-process-price-time" 
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]"
      aria-label="Mehndi Application Process — Price & Time"
    >
      
      {/* Admin Live Notification */}
      {adminNotification && (
        <div 
          role="status"
          className="fixed bottom-6 left-6 z-50 bg-[#263D2B] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 text-xs font-medium animate-fade-in"
        >
          <CheckCircle2 className="w-4 h-4 text-[#A8B5A0] flex-shrink-0" />
          <span>{adminNotification}</span>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 1. SECTION HEADER                                                     */}
      {/* ===================================================================== */}
      <ScrollReveal className="space-y-4 text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
          <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            TRANSPARENT ATELIER PRICING &amp; DURATION
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          Mehndi Application Process — Price &amp; Time
        </h2>

        <p className="font-serif text-lg sm:text-xl text-[#465640] italic font-light max-w-2xl mx-auto">
          From Quick Finger Accents to Royal Bridal Trousseaus
        </p>

        <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

        <p className="text-xs sm:text-sm text-[#6B7068] font-light max-w-2xl mx-auto leading-relaxed">
          Select multiple hand and feet services to automatically calculate your combined application time and suggested investment. 
          Every session is performed by master artist Janki Khatroja using 100% organic Rajasthani henna paste.
        </p>

        {/* Disclaimer & Admin Controls Link */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F7F4ED] border border-[#DCE1D8] text-[#465640] text-[11px] font-medium">
            <Info className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>All prices are suggested estimates and must be approved by the salon admin before publication.</span>
          </div>

          <button
            type="button"
            onClick={() => {
              setAdminServiceEdit(services[0]);
              setShowAdminModal(true);
            }}
            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#263D2B] hover:text-[#10110F] underline underline-offset-4 cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Admin Price &amp; Time Controls</span>
          </button>
        </div>
      </ScrollReveal>

      {/* ===================================================================== */}
      {/* 2. STEP-BY-STEP MEHNDI APPLICATION PROCESS TIMELINE                   */}
      {/* ===================================================================== */}
      <div className="mb-16 sm:mb-20">
        <div className="bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-10 shadow-sm">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#DCE1D8]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B] block">
                THE ARTISANAL JOURNEY
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                Step-by-Step Mehndi Application Process
              </h3>
            </div>
            <div className="text-xs text-[#6B7068] flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-[#F7F4ED] font-mono font-semibold text-[#263D2B] border border-[#DCE1D8]">
                6 Focused Stages
              </span>
              <span>• Click any step to inspect</span>
            </div>
          </div>

          {/* Step Pill Navigation */}
          <div className="pt-6 pb-4 flex flex-wrap gap-2">
            {MEHNDI_APPLICATION_PROCESS_STEPS.map((s, idx) => {
              const isCurrent = activeStepTab === idx;
              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActiveStepTab(idx)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-2 border ${
                    isCurrent
                      ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                      : 'bg-[#F7F4ED] text-[#465640] border-[#DCE1D8] hover:border-[#263D2B]'
                  }`}
                >
                  <span className="font-mono text-[10px] font-bold opacity-80">STEP {s.number}</span>
                  <span className="font-serif">{s.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep-Dive Showcase */}
          {(() => {
            const step = MEHNDI_APPLICATION_PROCESS_STEPS[activeStepTab];
            return (
              <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-[#FBF9F4] border border-[#DCE1D8] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-[#263D2B]/10 text-[#263D2B] text-[10.5px] font-mono font-bold tracking-wider">
                      STEP {step.number} OF 06
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white text-[#465640] text-xs font-semibold border border-[#DCE1D8] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                      <span>{step.estimatedTime}</span>
                    </span>
                  </div>

                  <h4 className="font-serif text-2xl text-[#10110F] font-normal">
                    {step.title}
                  </h4>

                  <p className="text-sm text-[#10110F] leading-relaxed font-normal">
                    {step.description}
                  </p>

                  <p className="text-xs text-[#6B7068] leading-relaxed font-light pt-1 border-t border-[#DCE1D8]/60">
                    <strong className="font-semibold text-[#465640]">Artisanal Discipline: </strong>
                    {step.details}
                  </p>
                </div>

                <div className="md:col-span-4 flex flex-col justify-center items-start md:items-end gap-3 border-t md:border-t-0 md:border-l border-[#DCE1D8] md:pl-6 pt-4 md:pt-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#465640]">
                    STAGE DURATION
                  </span>
                  <div className="font-mono text-xl font-bold text-[#263D2B]">
                    {step.estimatedTime}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={activeStepTab === 0}
                      onClick={() => setActiveStepTab((prev) => Math.max(0, prev - 1))}
                      className="px-3 py-1.5 rounded-xl border border-[#DCE1D8] text-xs font-semibold text-[#465640] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white"
                    >
                      ← Prev
                    </button>
                    <button
                      type="button"
                      disabled={activeStepTab === MEHNDI_APPLICATION_PROCESS_STEPS.length - 1}
                      onClick={() => setActiveStepTab((prev) => Math.min(MEHNDI_APPLICATION_PROCESS_STEPS.length - 1, prev + 1))}
                      className="px-3 py-1.5 rounded-xl bg-[#263D2B] text-white text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1f3123]"
                    >
                      Next Step →
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

        </div>
      </div>

      {/* ===================================================================== */}
      {/* 3. INTERACTIVE 16-SERVICE SELECTOR & LIVE CALCULATOR                  */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: 16 Services Grid & Filtering */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Controls Bar: Category Filter & Presets */}
          <div className="bg-white rounded-2xl border border-[#DCE1D8] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
            
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'All 16 Services' },
                { id: 'hand', label: 'Hand Designs' },
                { id: 'feet', label: 'Feet Mehndi' },
                { id: 'bridal', label: 'Bridal & Occasion' },
                { id: 'custom', label: 'Custom' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategoryFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeCategoryFilter === tab.id
                      ? 'bg-[#263D2B] text-white shadow-2xs'
                      : 'bg-[#F7F4ED] text-[#465640] hover:text-[#10110F] border border-[#DCE1D8]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] mr-1 hidden sm:inline">
                Quick Combos:
              </span>
              <button
                type="button"
                onClick={() => handleSelectPreset('front-back')}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#DCE1D8] text-[11px] font-semibold text-[#465640] hover:border-[#263D2B] cursor-pointer"
              >
                Front + Back
              </button>
              <button
                type="button"
                onClick={() => handleSelectPreset('festival-duo')}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#DCE1D8] text-[11px] font-semibold text-[#465640] hover:border-[#263D2B] cursor-pointer"
              >
                Arabic + Feet
              </button>
              <button
                type="button"
                onClick={() => handleSelectPreset('bridal-full')}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#DCE1D8] text-[11px] font-semibold text-[#465640] hover:border-[#263D2B] cursor-pointer"
              >
                Royal Bridal
              </button>
            </div>

          </div>

          {/* 16 Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredServices.map((service) => {
              const isSelected = selectedServiceIds.includes(service.id);
              return (
                <div
                  key={service.id}
                  onClick={() => handleToggleService(service.id)}
                  className={`rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer bg-white group relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#263D2B] ring-2 ring-[#263D2B]/20 shadow-md bg-[#FBF9F4]'
                      : 'border-[#DCE1D8] hover:border-[#465640] hover:shadow-xs'
                  } ${!service.available ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  <div>
                    {/* Header: Badge & Checkbox */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-[#263D2B] border-[#263D2B] text-white'
                              : 'border-[#DCE1D8] bg-white group-hover:border-[#263D2B]'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#465640]">
                          {service.categoryLabel}
                        </span>
                      </div>

                      {/* Admin Edit Link */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenAdminEdit(service);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-[#6B7068] hover:text-[#263D2B]"
                        title="Edit price and duration"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Image Thumbnail & Service Name */}
                    <div className="flex gap-3.5 items-start">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-16 h-16 rounded-xl object-cover border border-[#DCE1D8] flex-shrink-0"
                      />
                      <div className="space-y-1">
                        <h4 className="font-serif text-base text-[#10110F] font-normal leading-tight group-hover:text-[#263D2B] transition-colors">
                          {service.name}
                        </h4>
                        <p className="text-[11px] text-[#6B7068] font-light leading-snug line-clamp-2">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer: Price & Time Tags */}
                  <div className="pt-3 mt-3 border-t border-[#DCE1D8]/70 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-[#10110F]">
                      <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                      <span>{service.applicationTime}</span>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-sm font-bold text-[#263D2B] bg-[#F7F4ED] px-2.5 py-0.5 rounded-lg border border-[#DCE1D8]">
                        {service.suggestedPriceDisplay} CAD
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Sticky Live Calculator & Booking Summary */}
        <div className="lg:col-span-4 sticky top-24 space-y-5">
          
          <div className="bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-7 shadow-md space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#DCE1D8]">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B] block">
                  LIVE ESTIMATOR
                </span>
                <h3 className="font-serif text-xl text-[#10110F] font-normal">
                  Selected Designs
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#263D2B] text-white text-[11px] font-mono font-bold">
                {selectedServices.length} {selectedServices.length === 1 ? 'Design' : 'Designs'}
              </span>
            </div>

            {/* List of Selected Items */}
            {selectedServices.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <p className="text-xs text-[#6B7068]">
                  No designs selected yet. Click any service card on the left to start building your mehndi plan.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedServiceIds(['front-hand-mehndi', 'back-hand-mehndi'])}
                  className="text-xs font-bold text-[#263D2B] hover:underline cursor-pointer"
                >
                  Select Front &amp; Back Hand
                </button>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
                {selectedServices.map((s) => (
                  <div
                    key={s.id}
                    className="p-2.5 rounded-xl bg-[#FBF9F4] border border-[#DCE1D8] flex items-center justify-between text-xs"
                  >
                    <div className="space-y-0.5 truncate pr-2">
                      <span className="font-medium text-[#10110F] block truncate">
                        {s.name}
                      </span>
                      <span className="text-[10px] text-[#6B7068] flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-[#263D2B]" />
                        {s.applicationTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="font-mono font-bold text-[#263D2B]">
                        {s.suggestedPriceDisplay}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleService(s.id);
                        }}
                        className="text-[#6B7068] hover:text-red-700 p-1 cursor-pointer"
                        title="Remove from selection"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Price & Time Summary Totals */}
            <div className="pt-4 border-t border-[#DCE1D8] space-y-3">
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#6B7068]">Combined Application Time:</span>
                <span className="font-mono font-bold text-[#10110F] text-sm">
                  {timeTotals.display}
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-2 border-t border-[#DCE1D8]/60">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#465640] block">
                    Estimated Total Price:
                  </span>
                  <span className="text-[10px] text-[#6B7068]">
                    Suggested CAD Estimate
                  </span>
                </div>
                <div className="font-mono text-2xl font-bold text-[#263D2B]">
                  {priceTotals.display}
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                disabled={selectedServices.length === 0}
                onClick={() => setShowBookingModal(true)}
                className="w-full global-button !py-3.5 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Design</span>
              </button>

              <button
                type="button"
                disabled={selectedServices.length === 0}
                onClick={handleDirectBookingNav}
                className="w-full global-button-secondary !py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>Book on Main Calendar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {selectedServices.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearSelections}
                  className="w-full text-center text-[11px] text-[#6B7068] hover:text-[#10110F] py-1 cursor-pointer"
                >
                  Clear All Selections
                </button>
              )}
            </div>

            {/* Salon Guarantee Seal */}
            <div className="pt-3 border-t border-[#DCE1D8] flex items-center gap-2 text-[10.5px] text-[#6B7068]">
              <ShieldCheck className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
              <span>100% Rajasthani Henna • Single-Guest Private Suite</span>
            </div>

          </div>

        </div>

      </div>

      {/* ===================================================================== */}
      {/* 4. ADMIN PRICE & TIME MANAGER MODAL                                   */}
      {/* ===================================================================== */}
      {showAdminModal && adminServiceEdit && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="admin-modal-title"
        >
          <div className="bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-scale-up">
            
            <button
              type="button"
              onClick={() => setShowAdminModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-[#465640] cursor-pointer"
              aria-label="Close admin modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal className="w-5 h-5 text-[#263D2B]" />
              <h3 id="admin-modal-title" className="font-serif text-xl text-[#10110F] font-normal">
                Salon Admin: Edit Price &amp; Time
              </h3>
            </div>

            <p className="text-xs text-[#6B7068] mb-5">
              Update suggested pricing, estimated application times, and service availability. 
              Changes are immediately applied to the customer estimator and stored locally.
            </p>

            <form onSubmit={handleSaveAdminService} className="space-y-4">
              
              {/* Select Service Dropdown */}
              <div>
                <label className="text-xs font-bold text-[#10110F] block mb-1">
                  Select Service to Edit:
                </label>
                <select
                  value={adminServiceEdit.id}
                  onChange={(e) => {
                    const match = services.find((s) => s.id === e.target.value);
                    if (match) setAdminServiceEdit({ ...match });
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-[#DCE1D8] text-xs font-medium bg-[#FBF9F4] text-[#10110F]"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.suggestedPriceDisplay} CAD)
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Name */}
              <div>
                <label className="text-xs font-bold text-[#10110F] block mb-1">
                  Service Name:
                </label>
                <input
                  type="text"
                  value={adminServiceEdit.name}
                  onChange={(e) => setAdminServiceEdit({ ...adminServiceEdit, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F]"
                  required
                />
              </div>

              {/* Price Display and Numeric Min/Max */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#10110F] block mb-1">
                    Price Label:
                  </label>
                  <input
                    type="text"
                    value={adminServiceEdit.suggestedPriceDisplay}
                    onChange={(e) => setAdminServiceEdit({ ...adminServiceEdit, suggestedPriceDisplay: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F]"
                    placeholder="e.g. $35 or $250–$450"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#10110F] block mb-1">
                    Min Price (CAD):
                  </label>
                  <input
                    type="number"
                    value={adminServiceEdit.minPrice}
                    onChange={(e) => setAdminServiceEdit({ ...adminServiceEdit, minPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F]"
                    required
                  />
                </div>
              </div>

              {/* Application Time Label and Minutes */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#10110F] block mb-1">
                    Time Label:
                  </label>
                  <input
                    type="text"
                    value={adminServiceEdit.applicationTime}
                    onChange={(e) => setAdminServiceEdit({ ...adminServiceEdit, applicationTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F]"
                    placeholder="e.g. 30–45 minutes"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#10110F] block mb-1">
                    Avg Minutes (for total):
                  </label>
                  <input
                    type="number"
                    value={adminServiceEdit.minMinutes}
                    onChange={(e) => setAdminServiceEdit({ ...adminServiceEdit, minMinutes: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F]"
                    required
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-2 flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs font-medium text-[#10110F] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={adminServiceEdit.available}
                    onChange={(e) => setAdminServiceEdit({ ...adminServiceEdit, available: e.target.checked })}
                    className="rounded text-[#263D2B] focus:ring-[#263D2B]"
                  />
                  <span>Active &amp; Available for Booking</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium text-[#10110F] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={adminServiceEdit.isApprovedByAdmin}
                    onChange={(e) => setAdminServiceEdit({ ...adminServiceEdit, isApprovedByAdmin: e.target.checked })}
                    className="rounded text-[#263D2B] focus:ring-[#263D2B]"
                  />
                  <span>Admin Approved</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-[#DCE1D8]">
                <button
                  type="button"
                  onClick={handleResetToDefaults}
                  className="text-xs text-red-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All to Defaults</span>
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAdminModal(false)}
                    className="px-4 py-2 rounded-xl border border-[#DCE1D8] text-xs font-semibold text-[#465640] hover:bg-neutral-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#263D2B] text-white text-xs font-bold hover:bg-[#1f3123]"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 5. DIRECT ON-PAGE QUICK BOOKING MODAL                                 */}
      {/* ===================================================================== */}
      {showBookingModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-scale-up">
            
            <button
              type="button"
              onClick={() => {
                setShowBookingModal(false);
                setBookingSuccess(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-[#465640] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#263D2B]/10 text-[#263D2B] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-[#10110F]">
                  Mehndi Appointment Requested!
                </h3>
                <p className="text-xs text-[#6B7068] max-w-md mx-auto">
                  Thank you, <strong>{bookingForm.fullName}</strong>. Janki will review your requested designs ({selectedServices.map(s => s.name).join(', ')}) and confirm your appointment for <strong>{bookingForm.date} at {bookingForm.time}</strong>.
                </p>
                <div className="p-4 rounded-xl bg-[#F7F4ED] text-xs text-[#465640] border border-[#DCE1D8]">
                  Payment is due in person via <strong>Cash on Delivery</strong> at the conclusion of your session in Ottawa.
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowBookingModal(false);
                    setBookingSuccess(false);
                  }}
                  className="global-button !px-8 !py-3 text-white text-xs font-bold uppercase tracking-wider mx-auto"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickBookingSubmit} className="space-y-4">
                
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-5 h-5 text-[#263D2B]" />
                  <h3 className="font-serif text-xl text-[#10110F] font-normal">
                    Reserve Your Mehndi Session
                  </h3>
                </div>

                {/* Selected Summary Pill */}
                <div className="p-3 rounded-2xl bg-[#FBF9F4] border border-[#DCE1D8] text-xs space-y-1">
                  <div className="flex items-center justify-between font-semibold text-[#10110F]">
                    <span>{selectedServices.length} Selected Designs:</span>
                    <span className="font-mono text-[#263D2B]">{priceTotals.display}</span>
                  </div>
                  <p className="text-[11px] text-[#6B7068] truncate">
                    {selectedServices.map(s => s.name).join(' • ')}
                  </p>
                  <p className="text-[10px] text-[#465640] font-mono">
                    Estimated Time: {timeTotals.display}
                  </p>
                </div>

                {/* Customer Details */}
                <div>
                  <label className="text-xs font-bold text-[#10110F] block mb-1">
                    Your Full Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingForm.fullName}
                    onChange={(e) => setBookingForm({ ...bookingForm, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F]"
                    placeholder="e.g. Priya Sharma"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#10110F] block mb-1">
                      Phone Number:
                    </label>
                    <input
                      type="tel"
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F]"
                      placeholder="(613) 555-0199"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#10110F] block mb-1">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F]"
                      placeholder="client@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#10110F] block mb-1">
                      Preferred Date:
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#10110F] block mb-1">
                      Preferred Time:
                    </label>
                    <select
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F] bg-white"
                    >
                      {['10:00 AM', '11:00 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM', '7:00 PM'].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#10110F] block mb-1">
                    Occasion / Notes:
                  </label>
                  <textarea
                    rows={2}
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F]"
                    placeholder="Occasion (Wedding, Karwa Chauth, Sangeet), custom motif requests, or skin sensitivities..."
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="px-5 py-2.5 rounded-xl border border-[#DCE1D8] text-xs font-semibold text-[#465640]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingBooking}
                    className="global-button !px-7 !py-2.5 text-white text-xs font-bold uppercase tracking-wider"
                  >
                    {isSubmittingBooking ? 'Submitting...' : 'Confirm Reservation'}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
