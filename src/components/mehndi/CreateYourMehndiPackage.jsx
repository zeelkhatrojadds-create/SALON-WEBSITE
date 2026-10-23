// GLAM GIRL BY JANKI — Create Your Mehndi Package Builder
// Interactive 4-step customizer with live price/time calculator, live design preview, saved packages, and salon booking integration.

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  Clock,
  ShieldCheck,
  Check,
  CheckCircle2,
  X,
  Trash2,
  Bookmark,
  BookmarkCheck,
  RotateCcw,
  ArrowRight,
  Info,
  ChevronRight,
  ChevronLeft,
  SlidersHorizontal,
  Compass,
  Layers,
  Heart,
  Phone,
  MessageCircle,
  HelpCircle,
  Eye
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import {
  MEHNDI_OCCASIONS,
  HAND_DESIGN_OPTIONS,
  FEET_DESIGN_OPTIONS,
  COMPLEXITY_LEVELS,
  COVERAGE_LEVELS,
  STYLE_OPTIONS,
  calculatePackageSummary
} from '../../data/mehndiPackageData';
import salonDB from '../../db/salonDatabase';

const SAVED_PACKAGES_KEY = 'glam_saved_mehndi_packages';

export default function CreateYourMehndiPackage() {
  const navigate = useNavigate();
  const summaryPanelRef = useRef(null);

  // ---------------------------------------------------------------------------
  // BUILDER STATE
  // ---------------------------------------------------------------------------
  const [currentStep, setCurrentStep] = useState(1); // 1: Occasion, 2: Hand, 3: Feet, 4: Customize

  // Step 1: Occasion
  const [selectedOccasion, setSelectedOccasion] = useState(MEHNDI_OCCASIONS[0]);

  // Step 2: Hand Designs (Array of IDs)
  const [selectedHandIds, setSelectedHandIds] = useState(['front-hand']);

  // Step 3: Feet Designs (Array of IDs)
  const [selectedFeetIds, setSelectedFeetIds] = useState(['minimal-feet']);

  // Step 4: Customization
  const [complexity, setComplexity] = useState('medium');
  const [coverage, setCoverage] = useState('moderate');
  const [style, setStyle] = useState('traditional');
  const [matchingHandAndFeet, setMatchingHandAndFeet] = useState(true);
  const [isBridalPackage, setIsBridalPackage] = useState(false);

  // Saved Packages in localStorage
  const [savedPackages, setSavedPackages] = useState(() => {
    try {
      const stored = localStorage.getItem(SAVED_PACKAGES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  const [packageNameInput, setPackageNameInput] = useState('');
  const [isSavingPackage, setIsSavingPackage] = useState(false);
  const [toastNotification, setToastNotification] = useState(null);

  // Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const [bookingFormData, setBookingFormData] = useState({
    date: '',
    time: '11:00 AM',
    fullName: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [confirmedBookingResult, setConfirmedBookingResult] = useState(null);

  // Toast notification helper
  const showToast = (message) => {
    setToastNotification(message);
    setTimeout(() => {
      setToastNotification((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  // Persist saved packages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_PACKAGES_KEY, JSON.stringify(savedPackages));
    } catch (e) {
      console.warn('Could not save packages to localStorage', e);
    }
  }, [savedPackages]);

  // When occasion changes, update recommended defaults
  const handleSelectOccasion = (occasion) => {
    setSelectedOccasion(occasion);
    setComplexity(occasion.defaultComplexity || 'medium');
    setIsBridalPackage(Boolean(occasion.isBridal));

    if (occasion.recommendedHand) {
      setSelectedHandIds([occasion.recommendedHand]);
    }
    if (occasion.recommendedFeet) {
      setSelectedFeetIds([occasion.recommendedFeet]);
    } else {
      setSelectedFeetIds([]);
    }

    showToast(`Updated recommendations for ${occasion.name}`);
  };

  // Toggle hand design selection
  const handleToggleHand = (handId) => {
    setSelectedHandIds((prev) => {
      if (prev.includes(handId)) {
        return prev.filter((id) => id !== handId);
      }
      return [...prev, handId];
    });
  };

  // Toggle feet design selection
  const handleToggleFeet = (feetId) => {
    setSelectedFeetIds((prev) => {
      if (prev.includes(feetId)) {
        return prev.filter((id) => id !== feetId);
      }
      return [...prev, feetId];
    });
  };

  // Reset package to initial clean state
  const handleResetPackage = () => {
    if (window.confirm('Reset this customized mehndi package back to default?')) {
      setSelectedOccasion(MEHNDI_OCCASIONS[0]);
      setSelectedHandIds(['front-hand']);
      setSelectedFeetIds(['minimal-feet']);
      setComplexity('medium');
      setCoverage('moderate');
      setStyle('traditional');
      setMatchingHandAndFeet(true);
      setIsBridalPackage(false);
      setCurrentStep(1);
      showToast('Package reset to defaults');
    }
  };

  // Live calculated summary
  const summary = useMemo(() => {
    return calculatePackageSummary({
      occasion: selectedOccasion,
      selectedHandIds,
      selectedFeetIds,
      complexity,
      coverage,
      style,
      matchingHandAndFeet,
      isBridal: isBridalPackage
    });
  }, [
    selectedOccasion,
    selectedHandIds,
    selectedFeetIds,
    complexity,
    coverage,
    style,
    matchingHandAndFeet,
    isBridalPackage
  ]);

  // Save current package to saved packages list
  const handleSavePackage = () => {
    if (summary.itemCount === 0) {
      alert('Please select at least one hand or feet design before saving.');
      return;
    }

    const defaultTitle = `${selectedOccasion.name} Package (${summary.finalPriceDisplay})`;
    const titleToUse = packageNameInput.trim() || defaultTitle;

    const newPackage = {
      id: 'pkg_' + Date.now().toString(36),
      title: titleToUse,
      createdAt: new Date().toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' }),
      occasionId: selectedOccasion.id,
      selectedHandIds,
      selectedFeetIds,
      complexity,
      coverage,
      style,
      matchingHandAndFeet,
      isBridalPackage,
      finalPriceDisplay: summary.finalPriceDisplay,
      durationDisplay: summary.durationDisplay,
      summary
    };

    setSavedPackages((prev) => [newPackage, ...prev.filter((p) => p.title !== titleToUse)]);
    setPackageNameInput('');
    setIsSavingPackage(false);
    showToast(`Saved "${titleToUse}" to your package collection`);
  };

  // Load a previously saved package
  const handleLoadPackage = (pkg) => {
    const occ = MEHNDI_OCCASIONS.find((o) => o.id === pkg.occasionId) || MEHNDI_OCCASIONS[0];
    setSelectedOccasion(occ);
    setSelectedHandIds(pkg.selectedHandIds || []);
    setSelectedFeetIds(pkg.selectedFeetIds || []);
    setComplexity(pkg.complexity || 'medium');
    setCoverage(pkg.coverage || 'moderate');
    setStyle(pkg.style || 'traditional');
    setMatchingHandAndFeet(Boolean(pkg.matchingHandAndFeet));
    setIsBridalPackage(Boolean(pkg.isBridalPackage));
    setCurrentStep(4);
    showToast(`Loaded "${pkg.title}"`);
  };

  // Remove a saved package
  const handleRemoveSavedPackage = (pkgId, e) => {
    e.stopPropagation();
    setSavedPackages((prev) => prev.filter((p) => p.id !== pkgId));
    showToast('Package removed from collection');
  };

  // Validate and open booking modal
  const handleOpenBookingModal = () => {
    if (summary.itemCount === 0) {
      alert('Please select at least one hand or feet design before booking.');
      setCurrentStep(2);
      return;
    }
    setIsBookingModalOpen(true);
  };

  // Submit appointment to salonDB
  const handleConfirmAppointment = (e) => {
    e.preventDefault();

    if (!bookingFormData.date || !bookingFormData.fullName || !bookingFormData.phone) {
      alert('Please provide your name, phone number, and preferred date.');
      return;
    }

    setIsSubmittingBooking(true);

    const handNames = summary.selectedHands.map((h) => h.name).join(', ') || 'None';
    const feetNames = summary.selectedFeet.map((f) => f.name).join(', ') || 'None';
    const styleLabel = STYLE_OPTIONS.find((s) => s.id === style)?.label || style;
    const complexityLabel = COMPLEXITY_LEVELS.find((c) => c.id === complexity)?.label || complexity;

    const appointmentPayload = {
      id: 'pkg_bk_' + Date.now().toString(36),
      serviceId: summary.primaryServiceId,
      serviceName: `Custom Mehndi Package: ${selectedOccasion.name}`,
      category: 'henna',
      price: summary.finalPrice,
      priceDisplay: summary.finalPriceDisplay,
      duration: summary.durationDisplay,
      date: bookingFormData.date,
      time: bookingFormData.time,
      customerName: bookingFormData.fullName.trim(),
      customerEmail: bookingFormData.email.trim(),
      customerPhone: bookingFormData.phone.trim(),
      notes: `Custom Mehndi Package (${selectedOccasion.name}). Hands: ${handNames}. Feet: ${feetNames}. Style: ${styleLabel} (${complexityLabel}). Matching: ${matchingHandAndFeet ? 'Yes' : 'No'}. Client Notes: ${bookingFormData.notes.trim()}`,
      status: 'Pending',
      appointmentStatus: 'Pending',
      source: 'Create Your Mehndi Package Builder',
      createdAt: new Date().toISOString()
    };

    try {
      salonDB.addAppointment(appointmentPayload);
    } catch (err) {
      console.warn('DB appointment save error:', err);
    }

    // Trigger celebration confetti
    import('canvas-confetti')
      .then(({ default: confetti }) => {
        confetti({
          particleCount: 85,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#263D2B', '#465640', '#A8B5A0', '#F7F4ED']
        });
      })
      .catch(() => {});

    setConfirmedBookingResult(appointmentPayload);
    setIsSubmittingBooking(false);
  };

  return (
    <section id="create-your-mehndi-package" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
      
      {/* Toast Notification */}
      {toastNotification && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#10110F] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#263D2B]/40 flex items-center gap-3 text-xs font-medium animate-fade-in"
        >
          <Sparkles className="w-4 h-4 text-[#A8B5A0] flex-shrink-0" />
          <span>{toastNotification}</span>
        </div>
      )}

      {/* Section Header */}
      <ScrollReveal className="space-y-4 text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            INTERACTIVE BESPOKE BUILDER
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          Create Your Mehndi Package
        </h2>

        <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

        <p className="text-xs sm:text-sm text-[#6B7068] font-light max-w-2xl mx-auto leading-relaxed">
          Customize your own mehndi combination by selecting your occasion, hand designs, feet designs, and coverage preferences. 
          See your live estimated price and application time update instantly.
        </p>

        {/* Step Progress Navigation Bar */}
        <div className="pt-4 flex items-center justify-center">
          <div className="inline-flex rounded-full bg-white border border-[#DCE1D8] p-1 shadow-xs max-w-full overflow-x-auto">
            {[
              { num: 1, label: '1. Occasion' },
              { num: 2, label: '2. Hand Designs' },
              { num: 3, label: '3. Feet Designs' },
              { num: 4, label: '4. Customize' }
            ].map((step) => {
              const isActive = currentStep === step.num;
              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setCurrentStep(step.num)}
                  className={`px-3.5 sm:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#263D2B] text-white shadow-xs'
                      : 'text-[#6B7068] hover:text-[#10110F]'
                  }`}
                >
                  {step.label}
                </button>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* Main Grid: Steps on Left (8 Cols), Live Summary & Preview on Right (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* =================================================================== */}
        {/* LEFT COLUMN: ACTIVE STEP WORKBENCH                                  */}
        {/* =================================================================== */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* STEP 1: CHOOSE YOUR OCCASION */}
          {currentStep === 1 && (
            <div className="bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-8 shadow-xs space-y-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-[#DCE1D8] pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B] block">
                    STEP 1 OF 4
                  </span>
                  <h3 className="font-serif text-2xl text-[#10110F] font-normal">
                    Choose Your Occasion
                  </h3>
                </div>
                <span className="text-xs text-[#6B7068]">
                  Select 1 occasion to adapt recommendations
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {MEHNDI_OCCASIONS.map((occ) => {
                  const isSelected = selectedOccasion.id === occ.id;
                  return (
                    <div
                      key={occ.id}
                      onClick={() => handleSelectOccasion(occ)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectOccasion(occ);
                        }
                      }}
                      tabIndex={0}
                      role="radio"
                      aria-checked={isSelected}
                      className={`group relative rounded-2xl border p-3.5 transition-all cursor-pointer flex flex-col justify-between text-left select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B] ${
                        isSelected
                          ? 'border-[#263D2B] bg-[#263D2B]/5 ring-2 ring-[#263D2B]/20 shadow-sm'
                          : 'border-[#DCE1D8] bg-white hover:border-[#465640]'
                      }`}
                    >
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-neutral-900 mb-3">
                        <img
                          src={occ.image}
                          alt={occ.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                        
                        {/* Selected Indicator */}
                        <div className={`absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                          isSelected
                            ? 'bg-[#263D2B] text-white border-[#263D2B]'
                            : 'bg-white/90 border-[#DCE1D8] text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>

                        {occ.isBridal && (
                          <div className="absolute top-2.5 left-2.5 bg-white/90 px-2 py-0.5 rounded-full text-[9px] font-bold text-[#263D2B] uppercase tracking-wider">
                            Bridal Suite
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-serif text-base text-[#10110F] font-normal leading-snug">
                          {occ.name}
                        </h4>
                        <span className="text-[10.5px] font-semibold text-[#465640] block">
                          {occ.subtitle}
                        </span>
                        <p className="text-[11px] text-[#6B7068] line-clamp-2 font-light">
                          {occ.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="global-button !px-7 !py-3 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Next: Select Hand Designs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SELECT HAND DESIGNS */}
          {currentStep === 2 && (
            <div className="bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-8 shadow-xs space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#DCE1D8] pb-4 gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B] block">
                    STEP 2 OF 4
                  </span>
                  <h3 className="font-serif text-2xl text-[#10110F] font-normal">
                    Select Hand Designs
                  </h3>
                </div>
                <span className="text-xs text-[#6B7068]">
                  Select one or more hand placements
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {HAND_DESIGN_OPTIONS.map((hand) => {
                  const isSelected = selectedHandIds.includes(hand.id);
                  return (
                    <div
                      key={hand.id}
                      onClick={() => handleToggleHand(hand.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleToggleHand(hand.id);
                        }
                      }}
                      tabIndex={0}
                      role="checkbox"
                      aria-checked={isSelected}
                      className={`group relative rounded-2xl border p-3.5 transition-all cursor-pointer flex flex-col justify-between text-left select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B] ${
                        isSelected
                          ? 'border-[#263D2B] bg-[#263D2B]/5 ring-2 ring-[#263D2B]/20 shadow-sm'
                          : 'border-[#DCE1D8] bg-white hover:border-[#465640]'
                      }`}
                    >
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 mb-3">
                        <img
                          src={hand.image}
                          alt={hand.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        <div className={`absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                          isSelected
                            ? 'bg-[#263D2B] text-white border-[#263D2B]'
                            : 'bg-white/90 border-[#DCE1D8] text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>

                        <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-xs px-2 py-1 rounded text-[10px] text-white font-medium flex items-center justify-between">
                          <span>${hand.price} CAD</span>
                          <span>{hand.durationMinutes} min</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif text-base text-[#10110F] font-normal leading-snug">
                            {hand.name}
                          </h4>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                            {hand.scope}
                          </span>
                          <p className="text-[11px] text-[#6B7068] line-clamp-2 font-light mt-0.5">
                            {hand.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-[#DCE1D8]/60 text-[10.5px] text-[#465640]">
                          <span className="font-semibold block">Coverage:</span>
                          <span className="text-[10px] text-[#6B7068] block">{hand.coverage}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#DCE1D8]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 rounded-full border border-[#DCE1D8] text-xs font-semibold text-[#465640] hover:text-[#10110F] flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Occasion</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="global-button !px-7 !py-3 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Next: Select Feet Designs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SELECT FEET DESIGNS */}
          {currentStep === 3 && (
            <div className="bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-8 shadow-xs space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#DCE1D8] pb-4 gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B] block">
                    STEP 3 OF 4
                  </span>
                  <h3 className="font-serif text-2xl text-[#10110F] font-normal">
                    Select Feet Designs
                  </h3>
                </div>
                <span className="text-xs text-[#6B7068]">
                  Optional or matching feet adornment
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {FEET_DESIGN_OPTIONS.map((feet) => {
                  const isSelected = selectedFeetIds.includes(feet.id);
                  return (
                    <div
                      key={feet.id}
                      onClick={() => handleToggleFeet(feet.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleToggleFeet(feet.id);
                        }
                      }}
                      tabIndex={0}
                      role="checkbox"
                      aria-checked={isSelected}
                      className={`group relative rounded-2xl border p-3 transition-all cursor-pointer flex flex-col justify-between text-left select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B] ${
                        isSelected
                          ? 'border-[#263D2B] bg-[#263D2B]/5 ring-2 ring-[#263D2B]/20 shadow-sm'
                          : 'border-[#DCE1D8] bg-white hover:border-[#465640]'
                      }`}
                    >
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 mb-2.5">
                        <img
                          src={feet.image}
                          alt={feet.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        <div className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                          isSelected
                            ? 'bg-[#263D2B] text-white border-[#263D2B]'
                            : 'bg-white/90 border-[#DCE1D8] text-transparent'
                        }`}>
                          <Check className="w-3 h-3" />
                        </div>

                        <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-black/75 px-2 py-0.5 rounded text-[9.5px] text-white flex justify-between font-medium">
                          <span>${feet.price} CAD</span>
                          <span>{feet.durationMinutes}m</span>
                        </div>
                      </div>

                      <div className="space-y-1 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif text-sm text-[#10110F] font-normal leading-tight">
                            {feet.name}
                          </h4>
                          <span className="text-[9.5px] font-bold text-[#263D2B] block uppercase tracking-wider">
                            {feet.scope}
                          </span>
                          <p className="text-[10.5px] text-[#6B7068] line-clamp-2 font-light mt-0.5">
                            {feet.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-[#DCE1D8]/60 text-[9.5px] text-[#465640]">
                          <span className="font-semibold">Coverage:</span> {feet.coverage}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#DCE1D8]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 rounded-full border border-[#DCE1D8] text-xs font-semibold text-[#465640] hover:text-[#10110F] flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Hand Designs</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="global-button !px-7 !py-3 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Next: Customize Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CUSTOMIZE YOUR PACKAGE */}
          {currentStep === 4 && (
            <div className="bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-8 shadow-xs space-y-8 animate-fade-in">
              <div className="border-b border-[#DCE1D8] pb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B] block">
                  STEP 4 OF 4
                </span>
                <h3 className="font-serif text-2xl text-[#10110F] font-normal">
                  Customize Your Package
                </h3>
                <p className="text-xs text-[#6B7068] mt-0.5">
                  Tailor design complexity, coverage density, art style, and synchronizations.
                </p>
              </div>

              {/* Complexity Level */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                  Design Complexity
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {COMPLEXITY_LEVELS.map((comp) => {
                    const isSelected = complexity === comp.id;
                    return (
                      <button
                        key={comp.id}
                        type="button"
                        onClick={() => setComplexity(comp.id)}
                        className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#263D2B] bg-[#263D2B]/5 ring-2 ring-[#263D2B]/20'
                            : 'border-[#DCE1D8] bg-white hover:border-[#465640]'
                        }`}
                      >
                        <span className="text-xs font-bold text-[#10110F] block">
                          {comp.label}
                        </span>
                        <span className="text-[11px] text-[#6B7068] block mt-0.5">
                          {comp.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Coverage Level */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                  Coverage Density
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {COVERAGE_LEVELS.map((cov) => {
                    const isSelected = coverage === cov.id;
                    return (
                      <button
                        key={cov.id}
                        type="button"
                        onClick={() => setCoverage(cov.id)}
                        className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#263D2B] bg-[#263D2B]/5 ring-2 ring-[#263D2B]/20'
                            : 'border-[#DCE1D8] bg-white hover:border-[#465640]'
                        }`}
                      >
                        <span className="text-xs font-bold text-[#10110F] block">
                          {cov.label}
                        </span>
                        <span className="text-[11px] text-[#6B7068] block mt-0.5">
                          {cov.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Art Style */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                  Art Style Repertoire
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {STYLE_OPTIONS.map((st) => {
                    const isSelected = style === st.id;
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setStyle(st.id)}
                        className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#263D2B] bg-[#263D2B]/5 ring-2 ring-[#263D2B]/20'
                            : 'border-[#DCE1D8] bg-white hover:border-[#465640]'
                        }`}
                      >
                        <span className="text-xs font-bold text-[#10110F] block">
                          {st.label}
                        </span>
                        <span className="text-[11px] text-[#6B7068] block mt-0.5">
                          {st.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Matching Hands & Feet Toggle */}
              <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-[#10110F] block">
                    Matching Hand &amp; Feet Motif Synchronization
                  </span>
                  <p className="text-[11px] text-[#6B7068]">
                    Harmonizes sacred lotus, vine, and peacock borders across both hands and feet for visual consistency.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMatchingHandAndFeet(!matchingHandAndFeet)}
                  className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer flex-shrink-0 ${
                    matchingHandAndFeet ? 'bg-[#263D2B]' : 'bg-neutral-300'
                  }`}
                  role="switch"
                  aria-checked={matchingHandAndFeet}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                    matchingHandAndFeet ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Bridal Preparation Package Toggle */}
              <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-[#10110F] block">
                    Bridal Ceremony Special Care
                  </span>
                  <p className="text-[11px] text-[#6B7068]">
                    Includes warm lemon-sugar glaze sealants, clove steam treatment, and post-application wrapping guidance.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBridalPackage(!isBridalPackage)}
                  className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer flex-shrink-0 ${
                    isBridalPackage ? 'bg-[#263D2B]' : 'bg-neutral-300'
                  }`}
                  role="switch"
                  aria-checked={isBridalPackage}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                    isBridalPackage ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#DCE1D8]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-5 py-2.5 rounded-full border border-[#DCE1D8] text-xs font-semibold text-[#465640] hover:text-[#10110F] flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Feet Designs</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenBookingModal}
                  className="global-button !px-8 !py-3.5 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book My Mehndi Package</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* =================================================================== */}
        {/* RIGHT COLUMN: LIVE SUMMARY & DESIGN PREVIEW PANEL                   */}
        {/* =================================================================== */}
        <div ref={summaryPanelRef} className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
          
          <div className="bg-white rounded-3xl border border-[#DCE1D8] p-6 shadow-md space-y-6">
            
            {/* Summary Title Bar */}
            <div className="flex items-center justify-between border-b border-[#DCE1D8] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B] block">
                  LIVE PACKAGE SUMMARY
                </span>
                <h3 className="font-serif text-xl text-[#10110F] font-normal">
                  Your Bespoke Suite
                </h3>
              </div>
              <button
                type="button"
                onClick={handleResetPackage}
                className="inline-flex items-center gap-1 text-[11px] text-[#6B7068] hover:text-[#10110F] p-1 cursor-pointer"
                title="Reset package to defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* LIVE DESIGN PREVIEW AREA */}
            <div className="space-y-2">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#465640] block">
                VISUAL DESIGN PREVIEW:
              </span>
              
              <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-3">
                {/* Occasion Banner */}
                <div className="flex items-center gap-2.5 pb-2 border-b border-[#DCE1D8]/60">
                  <img
                    src={selectedOccasion.image}
                    alt={selectedOccasion.name}
                    className="w-9 h-9 rounded-lg object-cover border border-[#DCE1D8]"
                  />
                  <div>
                    <span className="text-[11px] font-bold text-[#10110F] block">
                      {selectedOccasion.name}
                    </span>
                    <span className="text-[9.5px] text-[#6B7068] block">
                      Style: {STYLE_OPTIONS.find((s) => s.id === style)?.label || style}
                    </span>
                  </div>
                </div>

                {/* Selected Thumbnails Grid */}
                {summary.itemCount > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {summary.selectedHands.map((h) => (
                      <div key={h.id} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 border border-[#DCE1D8] group">
                        <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                        <span className="absolute bottom-1 left-1.5 right-1.5 text-[9.5px] text-white font-medium truncate block">
                          {h.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleToggleHand(h.id)}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-rose-600 transition-colors"
                          title="Remove hand design"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    {summary.selectedFeet.map((f) => (
                      <div key={f.id} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 border border-[#DCE1D8] group">
                        <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                        <span className="absolute bottom-1 left-1.5 right-1.5 text-[9.5px] text-white font-medium truncate block">
                          {f.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleToggleFeet(f.id)}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-rose-600 transition-colors"
                          title="Remove feet design"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-[#6B7068] text-center py-4 font-light">
                    No designs selected yet. Choose hand and feet designs above.
                  </p>
                )}
              </div>
            </div>

            {/* SELECTIONS BREAKDOWN LIST */}
            <div className="space-y-2 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#465640] block">
                INCLUDED SERVICES ({summary.itemCount})
              </span>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {summary.selectedHands.map((h) => (
                  <div key={h.id} className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#DCE1D8] text-[11px]">
                    <div className="flex items-center gap-1.5 truncate pr-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B] flex-shrink-0" />
                      <span className="text-[#10110F] font-medium truncate">{h.name}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="font-bold text-[#263D2B]">${h.price} CAD</span>
                      <button
                        type="button"
                        onClick={() => handleToggleHand(h.id)}
                        className="text-[#6B7068] hover:text-rose-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}

                {summary.selectedFeet.map((f) => (
                  <div key={f.id} className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#DCE1D8] text-[11px]">
                    <div className="flex items-center gap-1.5 truncate pr-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#465640] flex-shrink-0" />
                      <span className="text-[#10110F] font-medium truncate">{f.name}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="font-bold text-[#263D2B]">${f.price} CAD</span>
                      <button
                        type="button"
                        onClick={() => handleToggleFeet(f.id)}
                        className="text-[#6B7068] hover:text-rose-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LIVE CALCULATION NUMBERS */}
            <div className="pt-4 border-t border-[#DCE1D8] space-y-2 text-xs">
              <div className="flex justify-between text-[#6B7068]">
                <span>Catalogue Base Total:</span>
                <span className="font-medium text-[#10110F]">${summary.rawTotal} CAD</span>
              </div>

              {summary.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span className="truncate pr-2">{summary.discountLabel}:</span>
                  <span>-${summary.discountAmount} CAD</span>
                </div>
              )}

              <div className="flex justify-between text-[#6B7068]">
                <span>Estimated Duration:</span>
                <div className="flex items-center gap-1 text-[#10110F] font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                  <span>{summary.durationDisplay}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#DCE1D8] flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                    FINAL ESTIMATED TOTAL
                  </span>
                  <span className="text-[10px] text-[#6B7068]">Taxes included</span>
                </div>
                <span className="font-serif text-2xl font-bold text-[#10110F]">
                  {summary.finalPriceDisplay}
                </span>
              </div>

              {/* Estimate Disclaimer */}
              <div className="p-2.5 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-start gap-2 mt-2">
                <Info className="w-3.5 h-3.5 text-[#263D2B] mt-0.5 flex-shrink-0" />
                <p className="text-[10px] text-[#6B7068] leading-tight font-light">
                  Estimated based on approved salon catalogue rates. Final timing and price may adjust slightly based on individual hand size and bespoke motif complexity during consultation with Janki.
                </p>
              </div>
            </div>

            {/* ACTIONS: BOOK & SAVE */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleOpenBookingModal}
                className="w-full global-button !py-4 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book My Mehndi Package</span>
              </button>

              {/* Save Package Form / Button */}
              {isSavingPackage ? (
                <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2 animate-fade-in">
                  <span className="text-[10.5px] font-bold text-[#10110F] block">
                    Name Your Custom Package:
                  </span>
                  <input
                    type="text"
                    value={packageNameInput}
                    onChange={(e) => setPackageNameInput(e.target.value)}
                    placeholder="e.g. Sangeet Glam Suite"
                    className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#DCE1D8] text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleSavePackage}
                      className="w-full py-1.5 rounded-lg bg-[#263D2B] text-white text-[11px] font-bold uppercase cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSavingPackage(false)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#DCE1D8] text-[11px] text-[#6B7068] cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSavingPackage(true)}
                  className="w-full py-2.5 rounded-2xl border border-[#DCE1D8] bg-white hover:border-[#263D2B] text-xs font-bold text-[#263D2B] uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save Package to My Collection</span>
                </button>
              )}
            </div>

          </div>

          {/* SAVED PACKAGES ACCORDION / LIST */}
          {savedPackages.length > 0 && (
            <div className="bg-white rounded-3xl border border-[#DCE1D8] p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#263D2B]">
                  SAVED PACKAGES ({savedPackages.length})
                </span>
                <span className="text-[10px] text-[#6B7068]">Stored in browser</span>
              </div>

              <div className="space-y-2">
                {savedPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => handleLoadPackage(pkg)}
                    className="p-3 rounded-2xl border border-[#DCE1D8] hover:border-[#263D2B] bg-[#FBF9F4] hover:bg-white transition-all cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <h4 className="font-serif text-xs font-normal text-[#10110F] group-hover:text-[#263D2B]">
                        {pkg.title}
                      </h4>
                      <span className="text-[10px] text-[#6B7068]">
                        {pkg.finalPriceDisplay} • {pkg.durationDisplay} • {pkg.createdAt}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => handleRemoveSavedPackage(pkg.id, e)}
                        className="p-1 text-[#6B7068] hover:text-rose-600 cursor-pointer"
                        title="Remove saved package"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <ChevronRight className="w-3.5 h-3.5 text-[#6B7068] group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* ===================================================================== */}
      {/* BOOKING CONFIRMATION & SCHEDULING MODAL                               */}
      {/* ===================================================================== */}
      {isBookingModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => !confirmedBookingResult && setIsBookingModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#DCE1D8] shadow-2xl relative my-8 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            {!confirmedBookingResult && (
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-center text-[#6B7068] hover:text-[#10110F] cursor-pointer"
                aria-label="Close booking modal"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {confirmedBookingResult ? (
              /* Success / Confirmed Screen */
              <div className="text-center space-y-5 py-4">
                <div className="w-16 h-16 rounded-full bg-[#263D2B] text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                    Mehndi Package Reserved!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7068]">
                    Thank you, <strong className="text-[#10110F]">{confirmedBookingResult.customerName}</strong>. Your custom appointment has been placed with Janki.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs text-left space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#6B7068]">Reference:</span>
                    <span className="font-mono font-bold text-[#10110F]">{confirmedBookingResult.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7068]">Occasion:</span>
                    <span className="font-semibold text-[#10110F]">{selectedOccasion.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7068]">Date &amp; Time:</span>
                    <span className="font-bold text-[#263D2B]">{confirmedBookingResult.date} at {confirmedBookingResult.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7068]">Estimated Total:</span>
                    <span className="font-bold text-[#10110F]">{confirmedBookingResult.priceDisplay}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7068]">Duration:</span>
                    <span className="text-[#10110F]">{confirmedBookingResult.duration}</span>
                  </div>
                </div>

                {/* WhatsApp Direct Confirmation Button */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`https://wa.me/16162550549?text=${encodeURIComponent(
                      `Hello Janki, I have booked a Custom Mehndi Package (${selectedOccasion.name}) on ${confirmedBookingResult.date} at ${confirmedBookingResult.time}. Reference: ${confirmedBookingResult.id}. Total: ${confirmedBookingResult.priceDisplay}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="global-button !px-6 !py-3 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirm via Salon WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setIsBookingModalOpen(false);
                      setConfirmedBookingResult(null);
                    }}
                    className="global-button-secondary !px-6 !py-3 text-xs font-bold uppercase tracking-wider"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Details Form */
              <form onSubmit={handleConfirmAppointment} className="space-y-5 text-left">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                    CONFIRM YOUR CUSTOM PACKAGE
                  </span>
                  <h3 className="font-serif text-2xl text-[#10110F] font-normal">
                    Reserve Appointment Date &amp; Time
                  </h3>
                  <p className="text-xs text-[#6B7068]">
                    Package: <strong>{selectedOccasion.name}</strong> • Estimated {summary.durationDisplay} • {summary.finalPriceDisplay}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="pkg-date" className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                      Appointment Date *
                    </label>
                    <input
                      id="pkg-date"
                      type="date"
                      required
                      min={todayStr}
                      value={bookingFormData.date}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, date: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCE1D8] focus:border-[#263D2B] text-xs text-[#10110F] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="pkg-time" className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                      Preferred Time Slot *
                    </label>
                    <select
                      id="pkg-time"
                      value={bookingFormData.time}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, time: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCE1D8] focus:border-[#263D2B] text-xs text-[#10110F] focus:outline-none cursor-pointer"
                    >
                      <option value="10:00 AM">10:00 AM — Morning Suite</option>
                      <option value="11:30 AM">11:30 AM — Mid-Morning</option>
                      <option value="1:00 PM">1:00 PM — Afternoon</option>
                      <option value="2:30 PM">2:30 PM — Afternoon</option>
                      <option value="4:00 PM">4:00 PM — Late Afternoon</option>
                      <option value="5:30 PM">5:30 PM — Evening Session</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="pkg-name" className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                      Full Name *
                    </label>
                    <input
                      id="pkg-name"
                      type="text"
                      required
                      placeholder="Your full name"
                      value={bookingFormData.fullName}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCE1D8] focus:border-[#263D2B] text-xs text-[#10110F] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="pkg-phone" className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                      Phone Number *
                    </label>
                    <input
                      id="pkg-phone"
                      type="tel"
                      required
                      placeholder="e.g. +1 (613) 555-0199"
                      value={bookingFormData.phone}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCE1D8] focus:border-[#263D2B] text-xs text-[#10110F] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label htmlFor="pkg-email" className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                      Email Address *
                    </label>
                    <input
                      id="pkg-email"
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      value={bookingFormData.email}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCE1D8] focus:border-[#263D2B] text-xs text-[#10110F] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label htmlFor="pkg-notes" className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                      Additional Notes or Special Requests (Optional)
                    </label>
                    <textarea
                      id="pkg-notes"
                      rows={2}
                      placeholder="e.g. Sangeet celebration timing, outfit color theme, or questions..."
                      value={bookingFormData.notes}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, notes: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#DCE1D8] focus:border-[#263D2B] text-xs text-[#10110F] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmittingBooking}
                    className="w-full global-button !py-3.5 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>
                      {isSubmittingBooking ? 'Reserving...' : `Confirm Booking (${summary.finalPriceDisplay})`}
                    </span>
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
