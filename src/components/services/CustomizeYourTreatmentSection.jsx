import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Clock, 
  RotateCcw, 
  Check, 
  ArrowRight, 
  Search, 
  SlidersHorizontal,
  Info,
  CheckCircle2,
  Calendar,
  X
} from 'lucide-react';
import { salonDB } from '../../db/salonDatabase';
import { 
  getCustomizationConfigForService, 
  calculateCustomizedTotal 
} from '../../data/treatmentCustomizationsData';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import SafeServiceImage from '../common/SafeServiceImage';

export default function CustomizeYourTreatmentSection({ 
  preselectedServiceId = null,
  onServiceChange = null 
}) {
  const navigate = useNavigate();

  // Master services list from reactive DB
  const [services, setServices] = useState(() => salonDB.getServices());
  const [selectedServiceId, setSelectedServiceId] = useState(preselectedServiceId || '');
  const [serviceSearchQuery, setServiceSearchQuery] = useState('');
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState('all');

  // Customization selection state
  const [selectedOptionId, setSelectedOptionId] = useState('');
  const [selectedAddonIds, setSelectedAddonIds] = useState([]);

  // Subscribe to DB updates
  useEffect(() => {
    setServices(salonDB.getServices());
    const unsub = salonDB.subscribe(() => {
      setServices(salonDB.getServices());
    });
    return () => unsub();
  }, []);

  // Sync when prop changes
  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  // Current selected service object
  const selectedService = useMemo(() => {
    if (!selectedServiceId) return null;
    return services.find(
      (s) => s.id === selectedServiceId || s.slug === selectedServiceId
    ) || null;
  }, [services, selectedServiceId]);

  // Customization configuration for selected service
  const customizationConfig = useMemo(() => {
    if (!selectedService) return null;
    return getCustomizationConfigForService(selectedService);
  }, [selectedService]);

  // Whenever selected service changes, reset options to defaults for that service
  useEffect(() => {
    if (customizationConfig && customizationConfig.optionsGroup) {
      const defaultOpt = customizationConfig.optionsGroup.options.find((o) => o.isDefault) || 
                         customizationConfig.optionsGroup.options[0];
      setSelectedOptionId(defaultOpt ? defaultOpt.id : '');
    } else {
      setSelectedOptionId('');
    }
    // Clear add-ons on service switch to eliminate incompatible selections
    setSelectedAddonIds([]);

    if (onServiceChange && selectedService) {
      onServiceChange(selectedService);
    }
  }, [selectedServiceId, customizationConfig]);

  // Live calculation of price, adjustments, and duration
  const calculation = useMemo(() => {
    return calculateCustomizedTotal(selectedService, selectedOptionId, selectedAddonIds);
  }, [selectedService, selectedOptionId, selectedAddonIds]);

  // Handle Radio Option Change
  const handleOptionChange = (optionId) => {
    setSelectedOptionId(optionId);
  };

  // Handle Checkbox Add-on Toggle
  const handleAddonToggle = (addonId) => {
    setSelectedAddonIds((prev) => {
      if (prev.includes(addonId)) {
        return prev.filter((id) => id !== addonId);
      } else {
        return [...prev, addonId];
      }
    });
  };

  // Reset Customizations to Default
  const handleResetCustomizations = () => {
    if (customizationConfig && customizationConfig.optionsGroup) {
      const defaultOpt = customizationConfig.optionsGroup.options.find((o) => o.isDefault) || 
                         customizationConfig.optionsGroup.options[0];
      setSelectedOptionId(defaultOpt ? defaultOpt.id : '');
    } else {
      setSelectedOptionId('');
    }
    setSelectedAddonIds([]);
  };

  // Proceed to Booking with customizations in URL params
  const handleCustomizeAndBook = () => {
    if (!selectedService) return;

    const params = new URLSearchParams();
    params.set('service', selectedService.id);
    if (selectedOptionId) {
      params.set('option', selectedOptionId);
    }
    if (selectedAddonIds.length > 0) {
      params.set('addons', selectedAddonIds.join(','));
    }

    navigate(`/book-appointment?${params.toString()}`);
  };

  // Filtered services for the selector
  const eligibleServices = useMemo(() => {
    return services.filter((s) => {
      if (s.active === false) return false;
      if (serviceCategoryFilter !== 'all') {
        const catClean = String(s.category || '').toLowerCase().replace(/[-_\s]/g, '');
        const filterClean = String(serviceCategoryFilter).toLowerCase().replace(/[-_\s]/g, '');
        if (catClean !== filterClean) return false;
      }
      if (serviceSearchQuery.trim()) {
        const q = serviceSearchQuery.toLowerCase().trim();
        const matchName = s.name.toLowerCase().includes(q);
        const matchCat = (s.categoryName || '').toLowerCase().includes(q);
        const matchDesc = (s.description || '').toLowerCase().includes(q);
        if (!matchName && !matchCat && !matchDesc) return false;
      }
      return true;
    });
  }, [services, serviceCategoryFilter, serviceSearchQuery]);

  // Unique categories for service picker
  const serviceCategories = useMemo(() => {
    const set = new Set();
    services.forEach((s) => {
      if (s.category && s.active !== false) set.add(s.category);
    });
    return Array.from(set);
  }, [services]);

  return (
    <section 
      id="customize-treatment"
      aria-label="Customize Your Treatment"
      className="mt-16 sm:mt-24 lg:mt-28 pt-14 sm:pt-20 border-t border-[#DCE1D8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ===================================================================== */}
        {/* 1. SECTION HEADER                                                     */}
        {/* ===================================================================== */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              BESPOKE BEAUTY TAILORING
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
            Customize Your Treatment
          </h2>

          <p className="font-serif text-base sm:text-lg lg:text-xl italic font-normal text-[#263D2B]">
            Your beauty, your way. Personalize your treatment with options designed around your needs.
          </p>

          <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />
        </ScrollReveal>

        {/* ===================================================================== */}
        {/* 2. TREATMENT SELECTOR TOOLBAR                                          */}
        {/* ===================================================================== */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#DCE1D8] shadow-xs mb-8 sm:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Step 1 Label */}
            <div className="space-y-1">
              <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#263D2B] flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#263D2B] text-white flex items-center justify-center text-[10px] font-mono">1</span>
                <span>SELECT BASE TREATMENT</span>
              </span>
              <p className="text-xs sm:text-sm text-[#6B7068] font-light">
                Choose any service from our Ottawa salon catalog to view eligible customization options.
              </p>
            </div>

            {/* Quick Filter Inputs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Category Dropdown */}
              <select
                value={serviceCategoryFilter}
                onChange={(e) => setServiceCategoryFilter(e.target.value)}
                aria-label="Filter services by category"
                className="px-3.5 py-2.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs font-medium text-[#10110F] focus:outline-none focus:border-[#263D2B] cursor-pointer"
              >
                <option value="all">All Categories</option>
                {serviceCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.replace('-', ' ').toUpperCase()}
                  </option>
                ))}
              </select>

              {/* Service Select Picker */}
              <select
                id="treatment-service-select"
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                aria-label="Select treatment to customize"
                className="px-4 py-2.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs font-semibold text-[#10110F] focus:outline-none focus:border-[#263D2B] min-w-[240px] sm:min-w-[300px] cursor-pointer"
              >
                <option value="">-- Choose a Treatment to Customize --</option>
                {eligibleServices.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} — CAD ${Number(s.price).toFixed(2)} ({s.duration || '30 min'})
                  </option>
                ))}
              </select>

              {/* Clear / Reset Selection */}
              {selectedServiceId && (
                <button
                  type="button"
                  onClick={() => setSelectedServiceId('')}
                  className="px-3 py-2.5 rounded-xl border border-[#DCE1D8] hover:border-red-300 text-[#6B7068] hover:text-red-600 bg-white text-xs font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  title="Clear selected service"
                >
                  <X className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* ===================================================================== */}
        {/* 3. MAIN CUSTOMIZER WORKSPACE (EMPTY STATE vs ACTIVE STATE)             */}
        {/* ===================================================================== */}
        {!selectedService ? (
          /* EMPTY STATE */
          <div className="bg-white rounded-3xl border border-[#DCE1D8] p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-3xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-center text-[#263D2B] mx-auto mb-5 shadow-xs">
              <SlidersHorizontal className="w-7 h-7 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#10110F] mb-2 tracking-tight">
              Select a Treatment to Begin Customizing
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#6B7068] leading-relaxed font-light max-w-md mx-auto mb-6">
              Choose any facial ritual, precision haircut, hair spa, or beauty treatment from the selector above to personalize your active serums, length tiers, and restorative add-ons.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#465640] bg-[#F7F4ED] px-3 py-1.5 rounded-full border border-[#DCE1D8]">
                Instant Live Price
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#465640] bg-[#F7F4ED] px-3 py-1.5 rounded-full border border-[#DCE1D8]">
                Real-Time Duration Updates
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#465640] bg-[#F7F4ED] px-3 py-1.5 rounded-full border border-[#DCE1D8]">
                Seamless Booking Pass-Through
              </span>
            </div>
          </div>
        ) : (
          /* ACTIVE CUSTOMIZER LAYOUT: OPTIONS (LEFT) + LIVE SUMMARY (RIGHT) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
            
            {/* LEFT COLUMN: CUSTOMIZATION CONTROLS */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              
              {/* Selected Base Service Banner */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#DCE1D8] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#F7F4ED] border border-[#DCE1D8] shrink-0">
                    <SafeServiceImage
                      service={selectedService}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                      {selectedService.categoryName || selectedService.category}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-normal text-[#10110F] leading-snug">
                      {selectedService.name}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-[#6B7068] mt-1 font-medium">
                      <span>Base: CAD ${Number(selectedService.price).toFixed(2)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                        {selectedService.duration || '30 min'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reset Action */}
                <button
                  type="button"
                  onClick={handleResetCustomizations}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F7F4ED] hover:bg-white border border-[#DCE1D8] hover:border-[#263D2B] text-xs font-semibold text-[#10110F] transition-all self-start sm:self-center cursor-pointer shadow-2xs"
                  title="Reset all customizations for this service"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#263D2B]" />
                  <span>Reset Options</span>
                </button>
              </div>

              {/* Notice when no customization profile is configured */}
              {!customizationConfig && (
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] text-center space-y-3">
                  <Info className="w-6 h-6 text-[#263D2B] mx-auto" />
                  <h4 className="font-serif text-lg text-[#10110F]">
                    Customization Notice
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6B7068] max-w-md mx-auto font-light">
                    Customization options for this specific treatment are currently being curated by our master artist. You can proceed with the standard treatment booking at the base price.
                  </p>
                </div>
              )}

              {/* MUTUALLY EXCLUSIVE OPTIONS (RADIO BUTTONS) */}
              {customizationConfig && customizationConfig.optionsGroup && (
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#DCE1D8] shadow-xs space-y-4">
                  <div className="border-b border-[#DCE1D8] pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
                      MUTUALLY EXCLUSIVE CHOICE
                    </span>
                    <h4 className="font-serif text-lg sm:text-xl font-normal text-[#10110F] mt-0.5">
                      {customizationConfig.optionsGroup.title}
                    </h4>
                    <p className="text-xs text-[#6B7068] font-light mt-0.5">
                      {customizationConfig.optionsGroup.subtitle}
                    </p>
                  </div>

                  {/* Radio Options List */}
                  <div 
                    role="radiogroup" 
                    aria-label={customizationConfig.optionsGroup.title}
                    className="space-y-3 pt-1"
                  >
                    {customizationConfig.optionsGroup.options.map((opt) => {
                      const isSelected = selectedOptionId === opt.id;
                      const hasPriceAdj = Number(opt.priceAdjustment) > 0;
                      const hasDurAdj = Number(opt.durationMinutes) > 0;

                      return (
                        <label
                          key={opt.id}
                          htmlFor={`opt-${opt.id}`}
                          className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                            isSelected 
                              ? 'bg-[#263D2B]/5 border-[#263D2B] shadow-2xs' 
                              : 'bg-white border-[#DCE1D8] hover:border-[#263D2B]/40'
                          }`}
                        >
                          {/* Radio Input */}
                          <div className="pt-0.5">
                            <input
                              type="radio"
                              id={`opt-${opt.id}`}
                              name={customizationConfig.optionsGroup.id}
                              value={opt.id}
                              checked={isSelected}
                              onChange={() => handleOptionChange(opt.id)}
                              className="w-4 h-4 text-[#263D2B] border-[#DCE1D8] focus:ring-[#263D2B] cursor-pointer"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className={`font-serif text-sm sm:text-base font-normal tracking-tight ${
                                isSelected ? 'text-[#263D2B] font-semibold' : 'text-[#10110F]'
                              }`}>
                                {opt.name}
                              </span>
                              
                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                <span className={`text-xs font-bold font-mono ${
                                  hasPriceAdj ? 'text-[#263D2B]' : 'text-[#6B7068]'
                                }`}>
                                  {hasPriceAdj ? `+CAD $${Number(opt.priceAdjustment).toFixed(2)}` : 'Included'}
                                </span>
                                {hasDurAdj && (
                                  <span className="text-[10px] text-[#465640] bg-[#F7F4ED] px-2 py-0.5 rounded-full border border-[#DCE1D8]">
                                    +{opt.durationMinutes} min
                                  </span>
                                )}
                              </div>
                            </div>

                            <p className="font-sans text-xs text-[#6B7068] leading-relaxed font-light mt-1">
                              {opt.description}
                            </p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* OPTIONAL ADD-ONS (CHECKBOXES) */}
              {customizationConfig && customizationConfig.addons && customizationConfig.addons.length > 0 && (
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#DCE1D8] shadow-xs space-y-4">
                  <div className="border-b border-[#DCE1D8] pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
                      OPTIONAL ADD-ONS
                    </span>
                    <h4 className="font-serif text-lg sm:text-xl font-normal text-[#10110F] mt-0.5">
                      Restorative Treatment Add-Ons
                    </h4>
                    <p className="text-xs text-[#6B7068] font-light mt-0.5">
                      Select any eligible enhancements to complement your beauty session.
                    </p>
                  </div>

                  {/* Add-ons Checkbox List */}
                  <div className="space-y-3 pt-1">
                    {customizationConfig.addons.map((addon) => {
                      const isChecked = selectedAddonIds.includes(addon.id);

                      return (
                        <label
                          key={addon.id}
                          htmlFor={`addon-${addon.id}`}
                          className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                            isChecked 
                              ? 'bg-[#263D2B]/5 border-[#263D2B] shadow-2xs' 
                              : 'bg-white border-[#DCE1D8] hover:border-[#263D2B]/40'
                          }`}
                        >
                          {/* Checkbox Input */}
                          <div className="pt-0.5">
                            <input
                              type="checkbox"
                              id={`addon-${addon.id}`}
                              checked={isChecked}
                              onChange={() => handleAddonToggle(addon.id)}
                              className="w-4 h-4 rounded text-[#263D2B] border-[#DCE1D8] focus:ring-[#263D2B] cursor-pointer"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className={`font-serif text-sm sm:text-base font-normal tracking-tight ${
                                isChecked ? 'text-[#263D2B] font-semibold' : 'text-[#10110F]'
                              }`}>
                                {addon.name}
                              </span>

                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                <span className="text-xs font-bold font-mono text-[#263D2B]">
                                  +CAD ${Number(addon.price).toFixed(2)}
                                </span>
                                {addon.durationMinutes > 0 && (
                                  <span className="text-[10px] text-[#465640] bg-[#F7F4ED] px-2 py-0.5 rounded-full border border-[#DCE1D8]">
                                    +{addon.durationMinutes} min
                                  </span>
                                )}
                              </div>
                            </div>

                            <p className="font-sans text-xs text-[#6B7068] leading-relaxed font-light mt-1">
                              {addon.description}
                            </p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* RIGHT COLUMN: LIVE PRICE & DURATION SUMMARY (STICKY ON DESKTOP) */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DCE1D8] shadow-lg space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#DCE1D8] pb-4">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#263D2B] block">
                      LIVE CALCULATION
                    </span>
                    <h3 className="font-serif text-xl font-normal text-[#10110F]">
                      Treatment Summary
                    </h3>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-center text-[#263D2B]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                {/* Service Details Card */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-[#6B7068] font-light">Base Treatment:</span>
                    <span className="font-semibold text-[#10110F]">{selectedService.name}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-[#6B7068] font-light">Base Price:</span>
                    <span className="font-mono font-medium text-[#10110F]">
                      CAD ${calculation.basePrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Selected Option Tier */}
                  {calculation.selectedOption && (
                    <div className="p-3 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8]/70 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#10110F] truncate max-w-[200px]">
                          {calculation.selectedOption.name}
                        </span>
                        <span className="font-mono font-bold text-[#263D2B]">
                          {calculation.optionAdjustment > 0 
                            ? `+CAD $${calculation.optionAdjustment.toFixed(2)}` 
                            : 'Included'}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#6B7068]">
                        Selected Formulation Tier • {calculation.selectedOption.durationMinutes > 0 ? `+${calculation.selectedOption.durationMinutes} min` : 'Standard duration'}
                      </div>
                    </div>
                  )}

                  {/* Selected Add-ons List */}
                  {calculation.selectedAddons.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-[#DCE1D8]/60">
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#465640] block">
                        Selected Add-Ons ({calculation.selectedAddons.length}):
                      </span>

                      {calculation.selectedAddons.map((add) => (
                        <div 
                          key={add.id}
                          className="flex items-center justify-between text-xs py-1 border-b border-dashed border-[#DCE1D8]/50 last:border-0"
                        >
                          <div className="flex items-center gap-1.5 min-w-0 pr-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#263D2B] flex-shrink-0" />
                            <span className="text-[#10110F] font-light truncate">{add.name}</span>
                          </div>
                          <span className="font-mono font-semibold text-[#263D2B] whitespace-nowrap">
                            +CAD ${Number(add.price).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Duration Breakdown */}
                <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#263D2B]" />
                    <span className="text-xs font-medium text-[#10110F]">
                      Estimated Duration:
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-base font-normal text-[#10110F] block">
                      {calculation.totalDurationMinutes} minutes
                    </span>
                    {calculation.additionalDurationMinutes > 0 && (
                      <span className="text-[10px] text-[#465640] block">
                        ({calculation.baseDurationMinutes}m base + {calculation.additionalDurationMinutes}m add-ons)
                      </span>
                    )}
                  </div>
                </div>

                {/* Total Price Banner */}
                <div className="pt-2 border-t border-[#DCE1D8]">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                      Estimated Total:
                    </span>
                    <span className="font-serif text-2xl sm:text-3xl font-normal text-[#263D2B] tracking-tight">
                      CAD ${calculation.totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-[#6B7068] font-light text-right">
                    Taxes calculated at appointment • Pay with Cash on Delivery
                  </p>
                </div>

                {/* Customize & Book Action */}
                <div className="pt-2 space-y-2.5">
                  <button
                    type="button"
                    onClick={handleCustomizeAndBook}
                    className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-[#263D2B] hover:bg-[#1C2E20] text-white text-xs font-bold uppercase tracking-[0.18em] shadow-md transition-all duration-300 hover:shadow-lg active:scale-98 cursor-pointer group"
                  >
                    <span>CUSTOMIZE &amp; BOOK</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <p className="text-[10px] text-center text-[#6B7068] font-light">
                    Your selections will be securely preserved in your booking reservation.
                  </p>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
