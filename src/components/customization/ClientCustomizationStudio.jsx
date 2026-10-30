import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Sparkles, 
  Clock, 
  Upload, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Check, 
  ArrowRight, 
  Search, 
  Bookmark, 
  RotateCcw, 
  ShieldCheck, 
  Send, 
  XCircle,
  Layers
} from 'lucide-react';
import { ALL_SERVICES } from '../../data/servicesData';
import salonDB from '../../db/salonDatabase';
import { 
  CUSTOM_OCCASIONS,
  MAINTENANCE_LEVELS,
  CUSTOM_STATUSES,
  getEligibleAddonsForService,
  getServiceCustomControls,
  HAIR_SERVICES_OPTIONS,
  HAIR_COLOUR_OPTIONS,
  SKIN_CARE_OPTIONS,
  NAIL_ART_OPTIONS,
  MEHNDI_OPTIONS,
  MAKEUP_OPTIONS,
  THREADING_OPTIONS,
  WAXING_OPTIONS,
  MASSAGE_OPTIONS,
  LASHES_OPTIONS,
  HAIR_TREATMENTS_OPTIONS
} from '../../data/customizationStudioData';
import LiveStyleCustomizer from './LiveStyleCustomizer';
import { NAIL_SHAPES, NAIL_COLORS, NAIL_FINISHES, NAIL_ART_OPTIONS as NAIL_STUDIO_ART } from '../nail-studio/NailConstants';
import { COMPLETE_HAIR_SHADES } from '../hair-studio/hairCustomizerData';
import { MEHNDI_SERVICE_CARDS } from '../../data/mehndiData';

// Default style configuration resolver based on service category
function getDefaultStyleConfigForService(service) {
  if (!service) return {};
  const cat = service.category;
  return {
    category: cat,
    serviceId: service.id,
    serviceName: service.name,
    // Nails
    nailShapeId: 'almond',
    nailColorHex: '#263D2B',
    nailColorName: 'Forest Green',
    nailFinishId: 'glossy',
    nailArtId: 'none',
    nailLengthId: 'medium',
    nailEmbellishments: [],
    // Hair Colour
    hairShadeCategory: 'all',
    hairShadeId: 'chocolate-brown',
    hairCustomHex: '#263D2B',
    isHairCustomActive: false,
    hairIntensity: 90,
    hairFinishId: 'gloss',
    hairTechnique: 'Balayage Hand-Painting',
    // Hair Cut / Styling
    hairstyle: 'Signature Voluminous Blowout',
    hairLength: 'Shoulder Length',
    hairStyling: 'Voluminous Bouncy Curls',
    hairVolume: 'Balanced Natural Density',
    // Mehndi
    mehndiDesignId: 'bridal-mehndi',
    mehndiPlacement: 'both-hands-wrists',
    mehndiCoverage: 'medium',
    // Other treatments
    skinPriority: 'Intense Cellular Hydration',
    skinSensitivity: 'No Known Sensitivities',
    makeupLook: 'Royal Traditional Bridal Glam',
    makeupOccasion: 'Bridal Wedding Ceremony',
    threadingArea: 'Eyebrows Only',
    threadingShaping: 'Natural Full Arch',
    waxingArea: 'Facial Waxing (Brows, Lip, Chin)',
    waxingComfort: 'Ultra-Gentle Stripless Italian Wax',
    massagePressure: 'Medium Restorative Pressure',
    massageFocus: 'Scalp, Neck & Shoulder Focus',
    lashStyle: 'Natural Classic Set',
    lashCurl: 'C-Curl (Natural Lift)'
  };
}

// Format human-readable summary of the active style customization
function formatStyleSummary(styleConfig, category) {
  if (!styleConfig) return [];
  const items = [];
  if (category === 'nails') {
    const shape = NAIL_SHAPES.find(s => s.id === styleConfig.nailShapeId)?.name || styleConfig.nailShapeId;
    const finish = NAIL_FINISHES.find(f => f.id === styleConfig.nailFinishId)?.name || styleConfig.nailFinishId;
    const art = NAIL_STUDIO_ART.find(a => a.id === styleConfig.nailArtId)?.name || styleConfig.nailArtId;
    items.push({ label: 'Nail Shape', value: shape });
    items.push({ label: 'Nail Colour', value: styleConfig.nailColorName || styleConfig.nailColorHex, hex: styleConfig.nailColorHex });
    items.push({ label: 'Finish', value: finish });
    items.push({ label: 'Artwork', value: art });
    if (styleConfig.nailLengthId) items.push({ label: 'Length', value: styleConfig.nailLengthId.toUpperCase() });
    if (styleConfig.nailEmbellishments && styleConfig.nailEmbellishments.length) {
      items.push({ label: 'Embellishments', value: styleConfig.nailEmbellishments.join(', ') });
    }
  } else if (category === 'hair-color') {
    const shade = COMPLETE_HAIR_SHADES.find(s => s.id === styleConfig.hairShadeId)?.name || styleConfig.hairShadeId;
    items.push({ label: 'Colour Technique', value: styleConfig.hairTechnique || 'Balayage' });
    items.push({ label: 'Shade Formulation', value: styleConfig.isHairCustomActive ? `Custom (${styleConfig.hairCustomHex})` : shade, hex: styleConfig.isHairCustomActive ? styleConfig.hairCustomHex : undefined });
    if (styleConfig.hairFinishId) items.push({ label: 'Finish', value: styleConfig.hairFinishId.toUpperCase() });
    if (styleConfig.hairIntensity) items.push({ label: 'Intensity', value: `${styleConfig.hairIntensity}%` });
  } else if (['hair-cut', 'hairstyling', 'hair-treatments'].includes(category)) {
    if (styleConfig.hairstyle) items.push({ label: 'Hairstyle Look', value: styleConfig.hairstyle });
    if (styleConfig.hairLength) items.push({ label: 'Target Length', value: styleConfig.hairLength });
    if (styleConfig.hairStyling) items.push({ label: 'Styling Finish', value: styleConfig.hairStyling });
    if (styleConfig.hairVolume) items.push({ label: 'Density / Volume', value: styleConfig.hairVolume });
  } else if (category === 'henna') {
    const card = MEHNDI_SERVICE_CARDS.find(m => m.id === styleConfig.mehndiDesignId);
    items.push({ label: 'Mehndi Pattern', value: card?.name || styleConfig.mehndiDesignId });
    if (styleConfig.mehndiPlacement) items.push({ label: 'Placement', value: styleConfig.mehndiPlacement.replace(/-/g, ' ').toUpperCase() });
    if (styleConfig.mehndiCoverage) items.push({ label: 'Coverage', value: styleConfig.mehndiCoverage.toUpperCase() });
  } else if (category === 'facial') {
    if (styleConfig.skinPriority) items.push({ label: 'Skincare Priority', value: styleConfig.skinPriority });
    if (styleConfig.skinSensitivity) items.push({ label: 'Sensitivity Protocol', value: styleConfig.skinSensitivity });
  } else if (category === 'makeup') {
    if (styleConfig.makeupLook) items.push({ label: 'Makeup Aesthetic', value: styleConfig.makeupLook });
    if (styleConfig.makeupOccasion) items.push({ label: 'Event Focus', value: styleConfig.makeupOccasion });
  } else if (category === 'threading') {
    if (styleConfig.threadingArea) items.push({ label: 'Target Area', value: styleConfig.threadingArea });
    if (styleConfig.threadingShaping) items.push({ label: 'Brow Arch Contour', value: styleConfig.threadingShaping });
  } else if (category === 'waxing') {
    if (styleConfig.waxingArea) items.push({ label: 'Waxing Zone', value: styleConfig.waxingArea });
    if (styleConfig.waxingComfort) items.push({ label: 'Comfort Protocol', value: styleConfig.waxingComfort });
  } else if (category === 'massage') {
    if (styleConfig.massagePressure) items.push({ label: 'Pressure Level', value: styleConfig.massagePressure });
    if (styleConfig.massageFocus) items.push({ label: 'Focus Zone', value: styleConfig.massageFocus });
  } else if (category === 'lashes') {
    if (styleConfig.lashStyle) items.push({ label: 'Lash Style', value: styleConfig.lashStyle });
    if (styleConfig.lashCurl) items.push({ label: 'Lash Curl', value: styleConfig.lashCurl });
  }
  return items;
}

// Available time slots for booking (salon business hours: 10:00 AM - 7:00 PM)
const TIME_SLOTS = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
  '06:00 PM', '06:30 PM'
];

// Department filter definitions covering all 85 services across 12 categories
const ALL_DEPARTMENTS = [
  { id: 'all', label: 'All Services (85)', count: ALL_SERVICES.length },
  { id: 'hair-cut', label: 'Haircuts & Shaping', count: ALL_SERVICES.filter(s => s.category === 'hair-cut').length },
  { id: 'hair-color', label: 'Hair Colour', count: ALL_SERVICES.filter(s => s.category === 'hair-color').length },
  { id: 'hairstyling', label: 'Hairstyling Couture', count: ALL_SERVICES.filter(s => s.category === 'hairstyling').length },
  { id: 'hair-treatments', label: 'Hair Treatments', count: ALL_SERVICES.filter(s => s.category === 'hair-treatments').length },
  { id: 'facial', label: 'Skin Care & Facials', count: ALL_SERVICES.filter(s => s.category === 'facial').length },
  { id: 'makeup', label: 'Royal Makeup', count: ALL_SERVICES.filter(s => s.category === 'makeup').length },
  { id: 'nails', label: 'Nails & Nail Art', count: ALL_SERVICES.filter(s => s.category === 'nails').length },
  { id: 'henna', label: 'Mehndi & Henna', count: ALL_SERVICES.filter(s => s.category === 'henna').length },
  { id: 'threading', label: 'Threading & Shaping', count: ALL_SERVICES.filter(s => s.category === 'threading').length },
  { id: 'waxing', label: 'Silky Waxing', count: ALL_SERVICES.filter(s => s.category === 'waxing').length },
  { id: 'massage', label: 'Holistic Massage', count: ALL_SERVICES.filter(s => s.category === 'massage').length },
  { id: 'lashes', label: 'Lashes & Brows', count: ALL_SERVICES.filter(s => s.category === 'lashes').length },
];

const VISION_INSPIRATION_PROMPTS = [
  'Bridal glam with natural dewy skin and defined soft eyes',
  'Sun-kissed warm balayage with face-framing money pieces',
  'Precision layers with voluminous bouncy round-brush blowout',
  'Natural arched brow shaping with organic soothing aloe',
  'Holistic hydrating facial targeting sensitive skin barrier',
  'Minimalist French tip gel manicure on almond silhouette',
  'Rajasthani peacock motif mehndi extending to mid-forearm'
];

export default function ClientCustomizationStudio({ 
  isEmbedded = false,
  presetService = null,
  presetCategory = null,
  presetNotes = '',
  presetPhotos = []
}) {
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef(null);
  const workspaceRef = useRef(null);

  // Read preselected category or service from URL query params
  const paramServiceId = searchParams.get('service');
  const paramCategoryId = searchParams.get('category');

  // Active Department Filter for Catalog Browser
  const [selectedDepartment, setSelectedDepartment] = useState(() => {
    if (paramCategoryId) {
      const match = ALL_DEPARTMENTS.find(d => d.id === paramCategoryId);
      if (match) return match.id;
    }
    return 'all';
  });

  // Catalog Search Query
  const [catalogSearch, setCatalogSearch] = useState('');

  // Selected Service State (defaults to first service or preselected from params/props)
  const [selectedServiceId, setSelectedServiceId] = useState(() => {
    if (presetService && presetService.id) return presetService.id;
    if (paramServiceId && ALL_SERVICES.some(s => s.id === paramServiceId || s.slug === paramServiceId)) {
      const match = ALL_SERVICES.find(s => s.id === paramServiceId || s.slug === paramServiceId);
      return match ? match.id : ALL_SERVICES[0]?.id;
    }
    return ALL_SERVICES[0]?.id || 'noor-signature-haircut';
  });

  // Resolve full service object
  const selectedService = useMemo(() => {
    return ALL_SERVICES.find(s => s.id === selectedServiceId) || ALL_SERVICES[0];
  }, [selectedServiceId]);

  // Dynamic service customization controls based on selected service
  const serviceCustomControls = useMemo(() => {
    return getServiceCustomControls(selectedService);
  }, [selectedService]);

  // Eligible Add-ons based on selected service department
  const eligibleAddons = useMemo(() => {
    return getEligibleAddonsForService(selectedService);
  }, [selectedService]);

  // Match loaded notification banner
  const [matchLoadedNotice, setMatchLoadedNotice] = useState(null);

  // Draft saved notice banner
  const [draftNotice, setDraftNotice] = useState(null);
  const [savedDraftAvailable, setSavedDraftAvailable] = useState(false);

  // =========================================================================
  // CUSTOMER-DRIVEN SERVICE CUSTOMIZATION FORM STATE
  // =========================================================================
  // Section A: Personal Requirements
  const [customerVision, setCustomerVision] = useState('');
  const [desiredResult, setDesiredResult] = useState('');
  const [preferredStyle, setPreferredStyle] = useState('');
  const [focusAreas, setFocusAreas] = useState('');
  const [thingsToAvoid, setThingsToAvoid] = useState('');
  const [sensitivities, setSensitivities] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [occasion, setOccasion] = useState('everyday-care');
  const [customOccasion, setCustomOccasion] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [maintenanceLevel, setMaintenanceLevel] = useState('low');
  const [consultationRequested, setConsultationRequested] = useState(false);

  // Section B: Dynamic Service-Specific Choices & Live Style Customizer State
  const [serviceOptions, setServiceOptions] = useState({});
  const [styleConfig, setStyleConfig] = useState(() => {
    try {
      const draft = salonDB.getCustomDraft();
      if (draft && draft.styleConfig) {
        return draft.styleConfig;
      }
    } catch (e) {}
    return getDefaultStyleConfigForService(selectedService);
  });
  const [isSavingCustomization, setIsSavingCustomization] = useState(false);
  const [styleSaveNotice, setStyleSaveNotice] = useState(null);

  // Synchronize styleConfig with selectedService if service changes
  useEffect(() => {
    if (selectedService && (!styleConfig || styleConfig.serviceId !== selectedService.id)) {
      setStyleConfig(prev => ({
        ...getDefaultStyleConfigForService(selectedService),
        ...(prev?.serviceId === selectedService.id ? prev : {})
      }));
    }
  }, [selectedService]);

  // Synchronize styleConfig to serviceOptions for all downstream consumers
  const handleStyleConfigChange = (newConfig) => {
    setStyleConfig(newConfig);

    const mapped = { ...serviceOptions };
    if (selectedService.category === 'nails') {
      const shapeObj = NAIL_SHAPES.find(s => s.id === newConfig.nailShapeId);
      const finishObj = NAIL_FINISHES.find(f => f.id === newConfig.nailFinishId);
      const artObj = NAIL_STUDIO_ART.find(a => a.id === newConfig.nailArtId);
      mapped.nailShape = shapeObj?.name || newConfig.nailShapeId;
      mapped.nailColor = newConfig.nailColorName || newConfig.nailColorHex;
      mapped.nailFinish = finishObj?.name || newConfig.nailFinishId;
      mapped.nailDesign = artObj?.name || newConfig.nailArtId;
      mapped.nailLength = newConfig.nailLengthId?.toUpperCase();
      mapped.nailEmbellishments = (newConfig.nailEmbellishments || []).join(', ');
    } else if (selectedService.category === 'hair-color') {
      const shadeObj = COMPLETE_HAIR_SHADES.find(s => s.id === newConfig.hairShadeId);
      mapped.colourTechnique = newConfig.hairTechnique;
      mapped.colourShade = newConfig.isHairCustomActive ? `Custom (${newConfig.hairCustomHex})` : shadeObj?.name;
      mapped.colourFinish = newConfig.hairFinishId;
      mapped.colourIntensity = `${newConfig.hairIntensity}%`;
    } else if (['hair-cut', 'hairstyling', 'hair-treatments'].includes(selectedService.category)) {
      mapped.hairstyle = newConfig.hairstyle;
      mapped.hairLength = newConfig.hairLength;
      mapped.stylingPreference = newConfig.hairStyling;
      mapped.hairVolume = newConfig.hairVolume;
    } else if (selectedService.category === 'henna') {
      const card = MEHNDI_SERVICE_CARDS.find(m => m.id === newConfig.mehndiDesignId);
      mapped.mehndiDesign = card?.name || newConfig.mehndiDesignId;
      mapped.mehndiPlacement = newConfig.mehndiPlacement;
      mapped.mehndiCoverage = newConfig.mehndiCoverage;
      mapped.mehndiPrice = card ? `$${card.numericPrice} CAD` : undefined;
      mapped.mehndiDuration = card?.estimatedTime;
    } else if (selectedService.category === 'facial') {
      mapped.skinPreference = newConfig.skinPriority;
      mapped.sensitivityProtocol = newConfig.skinSensitivity;
    } else if (selectedService.category === 'makeup') {
      mapped.makeupLook = newConfig.makeupLook;
      mapped.makeupOccasion = newConfig.makeupOccasion;
    } else if (selectedService.category === 'threading') {
      mapped.threadingArea = newConfig.threadingArea;
      mapped.threadingShaping = newConfig.threadingShaping;
    } else if (selectedService.category === 'waxing') {
      mapped.waxingArea = newConfig.waxingArea;
      mapped.waxingComfort = newConfig.waxingComfort;
    } else if (selectedService.category === 'massage') {
      mapped.massagePressure = newConfig.massagePressure;
      mapped.massageFocus = newConfig.massageFocus;
    } else if (selectedService.category === 'lashes') {
      mapped.lashStyle = newConfig.lashStyle;
      mapped.lashCurl = newConfig.lashCurl;
    }
    setServiceOptions(mapped);
  };

  // Save Style Customization directly into draft and My Beauty Blueprint
  const handleSaveCustomization = () => {
    setIsSavingCustomization(true);
    try {
      const draftPayload = {
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        category: selectedService.category,
        customerVision,
        desiredResult,
        preferredStyle,
        focusAreas,
        thingsToAvoid,
        sensitivities,
        specialInstructions,
        occasion,
        customOccasion,
        eventDate,
        maintenanceLevel,
        consultationRequested,
        serviceOptions,
        styleConfig,
        selectedAddonIds,
        customAddonRequest,
        inspirationPhotos,
        formData
      };
      salonDB.saveCustomDraft(draftPayload);

      const userIdent = currentUser?.id || currentUser?.email || 'guest';
      const summaryItems = formatStyleSummary(styleConfig, selectedService.category);
      const styleSummaryText = summaryItems.map(s => `${s.label}: ${s.value}`).join(' • ');

      salonDB.addSavedServiceToBlueprint(userIdent, {
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        category: selectedService.category,
        categoryName: selectedService.categoryName || selectedService.category,
        price: Number(selectedService.price) || 0,
        duration: selectedService.duration || '45 min',
        image: selectedService.image,
        customizationOptions: styleSummaryText || 'Live Style Customizer selections',
        styleCustomization: { ...styleConfig },
        isCustomStudioRequest: true,
        personalNotes: customerVision || '',
        desiredResults: desiredResult || 'Bespoke precision finish'
      });

      setStyleSaveNotice(`Your style customization for “${selectedService.name}” has been saved to your Custom Studio draft and Beauty Blueprint.`);
      setTimeout(() => setStyleSaveNotice(null), 5000);
      setIsSavingCustomization(false);
    } catch (e) {
      console.warn('Error saving style customization:', e);
      setIsSavingCustomization(false);
    }
  };

  // Reset customizer for current service
  const handleResetCustomizer = () => {
    const cleanDefaults = getDefaultStyleConfigForService(selectedService);
    setStyleConfig(cleanDefaults);
    handleStyleConfigChange(cleanDefaults);
    setStyleSaveNotice('Style customizer reset to standard catalog baseline.');
    setTimeout(() => setStyleSaveNotice(null), 3500);
  };

  // Section C: Custom Add-Ons Builder
  const [selectedAddonIds, setSelectedAddonIds] = useState([]);
  const [customAddonRequest, setCustomAddonRequest] = useState('');

  // Section D: Multi-Photo Inspiration Upload (Up to 4 images with descriptions)
  const [inspirationPhotos, setInspirationPhotos] = useState([]);
  const [imageError, setImageError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Synchronize when preset props change from Beauty Match Finder or Vision Board
  useEffect(() => {
    if (presetService) {
      setSelectedServiceId(presetService.id);
      if (presetService.category) {
        setSelectedDepartment(presetService.category);
      }
      setMatchLoadedNotice(`Loaded “${presetService.name}” into your Custom Studio.`);
      const timer = setTimeout(() => setMatchLoadedNotice(null), 8000);
      return () => clearTimeout(timer);
    }
  }, [presetService, presetCategory]);

  useEffect(() => {
    if (presetNotes) {
      setCustomerVision(prev => (prev ? `${prev}\n\n${presetNotes}` : presetNotes));
    }
  }, [presetNotes]);

  useEffect(() => {
    if (presetPhotos && presetPhotos.length > 0) {
      setInspirationPhotos(presetPhotos);
    }
  }, [presetPhotos]);

  // Check for existing saved draft on initial mount
  useEffect(() => {
    try {
      const draft = salonDB.getCustomDraft();
      if (draft && draft.serviceId && draft.savedAt) {
        setSavedDraftAvailable(draft);
      }
    } catch (e) {
      console.warn('Error checking custom draft:', e);
    }
  }, []);

  // Current User (if logged in)
  const [currentUser] = useState(() => {
    try {
      return salonDB.getCurrentUser();
    } catch (e) {
      return null;
    }
  });

  // Default Booking Date (Tomorrow)
  const defaultBookingDate = useMemo(() => {
    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);
    const y = tmr.getFullYear();
    const m = String(tmr.getMonth() + 1).padStart(2, '0');
    const d = String(tmr.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, []);

  // Patron Contact & Preferred Time
  const [formData, setFormData] = useState({
    name: currentUser?.name || currentUser?.preferredName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    date: defaultBookingDate,
    time: '11:00 AM'
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const [submissionError, setSubmissionError] = useState('');
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  // Customer Clarification & Follow-up State (Step 10 interaction)
  const [clarificationText, setClarificationText] = useState('');
  const [clarificationSubmitted, setClarificationSubmitted] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [requestCancelled, setRequestCancelled] = useState(false);

  // Live Slot Availability Checking
  const [slotAvailability, setSlotAvailability] = useState({
    checked: false,
    available: true,
    reason: ''
  });

  // Calculate Add-on totals
  const selectedAddonsObjects = useMemo(() => {
    return eligibleAddons.filter(a => selectedAddonIds.includes(a.id));
  }, [eligibleAddons, selectedAddonIds]);

  const addOnCostTotal = useMemo(() => {
    return selectedAddonsObjects.reduce((acc, a) => acc + (a.price || 0), 0);
  }, [selectedAddonsObjects]);

  const addOnDurationMinutesTotal = useMemo(() => {
    return selectedAddonsObjects.reduce((acc, a) => acc + (a.durationMinutes || 0), 0);
  }, [selectedAddonsObjects]);

  // Baseline Duration in minutes
  const baselineDurationMinutes = useMemo(() => {
    if (!selectedService?.duration) return 30;
    return salonDB.parseServiceDurationMinutes(selectedService.duration);
  }, [selectedService]);

  // Total Estimated Price and Duration
  const totalEstimatedPrice = (selectedService?.price || 0) + addOnCostTotal;
  const totalEstimatedDurationMinutes = baselineDurationMinutes + addOnDurationMinutesTotal;

  // Has unquoted or custom elements
  const hasUnquotedCustomRequests = Boolean(
    customAddonRequest.trim() ||
    customerVision.length > 150 ||
    thingsToAvoid.trim() ||
    sensitivities.trim()
  );

  // Live Slot availability check when date, time, or total duration changes
  useEffect(() => {
    if (formData.date && formData.time && selectedService) {
      const res = salonDB.checkSlotAvailability(formData.date, formData.time, totalEstimatedDurationMinutes);
      setSlotAvailability({
        checked: true,
        available: res.available,
        reason: res.reason || ''
      });
    }
  }, [formData.date, formData.time, selectedService, totalEstimatedDurationMinutes]);

  // Handle Multi-Photo Upload with Validation
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setImageError('');
    if (!files.length) return;

    if (inspirationPhotos.length + files.length > 4) {
      setImageError('You can upload a maximum of 4 reference images.');
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    setIsUploading(true);

    const readPromises = files.map(file => {
      return new Promise((resolve, reject) => {
        if (!validTypes.includes(file.type)) {
          reject(new Error(`“${file.name}” is not a valid format. Please use JPG, PNG, or WEBP.`));
          return;
        }
        if (file.size > maxSize) {
          reject(new Error(`“${file.name}” exceeds 5MB. Please choose a smaller photo.`));
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            id: `photo_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            name: file.name,
            size: (file.size / 1024).toFixed(1) + ' KB',
            type: file.type,
            dataUrl: reader.result,
            description: ''
          });
        };
        reader.onerror = () => reject(new Error(`Failed to read “${file.name}”.`));
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readPromises)
      .then(newPhotos => {
        setInspirationPhotos(prev => [...prev, ...newPhotos]);
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      })
      .catch(err => {
        setImageError(err.message || 'Image upload error occurred.');
        setIsUploading(false);
      });
  };

  // Update photo description note
  const handlePhotoDescriptionChange = (photoId, text) => {
    setInspirationPhotos(prev => prev.map(p => {
      if (p.id === photoId) {
        return { ...p, description: text };
      }
      return p;
    }));
  };

  // Remove individual photo
  const handleRemovePhoto = (photoId) => {
    setInspirationPhotos(prev => prev.filter(p => p.id !== photoId));
  };

  // Quick Service Selection from Catalog Browser
  const handleSelectService = (service) => {
    setSelectedServiceId(service.id);
    setSelectedAddonIds([]);
    setSubmissionError('');
    setSubmissionSuccess(null);
    const newStyle = getDefaultStyleConfigForService(service);
    setStyleConfig(newStyle);
    handleStyleConfigChange(newStyle);
    if (workspaceRef.current) {
      workspaceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Toggle Add-on
  const handleToggleAddon = (addonId) => {
    setSelectedAddonIds(prev => {
      if (prev.includes(addonId)) {
        return prev.filter(id => id !== addonId);
      } else {
        return [...prev, addonId];
      }
    });
  };

  // Save Draft to Local Database
  const handleSaveDraft = () => {
    try {
      const draftPayload = {
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        category: selectedService.category,
        customerVision,
        desiredResult,
        preferredStyle,
        focusAreas,
        thingsToAvoid,
        sensitivities,
        specialInstructions,
        occasion,
        customOccasion,
        eventDate,
        maintenanceLevel,
        consultationRequested,
        serviceOptions,
        styleConfig,
        selectedAddonIds,
        customAddonRequest,
        inspirationPhotos,
        formData
      };
      salonDB.saveCustomDraft(draftPayload);
      setDraftNotice(`Draft saved at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. You can return anytime.`);
      setTimeout(() => setDraftNotice(null), 6000);
    } catch (e) {
      console.warn('Error saving draft:', e);
    }
  };

  // Load Saved Draft
  const handleLoadSavedDraft = (draft) => {
    if (!draft) return;
    if (draft.serviceId) setSelectedServiceId(draft.serviceId);
    if (draft.customerVision) setCustomerVision(draft.customerVision);
    if (draft.desiredResult) setDesiredResult(draft.desiredResult);
    if (draft.preferredStyle) setPreferredStyle(draft.preferredStyle);
    if (draft.focusAreas) setFocusAreas(draft.focusAreas);
    if (draft.thingsToAvoid) setThingsToAvoid(draft.thingsToAvoid);
    if (draft.sensitivities) setSensitivities(draft.sensitivities);
    if (draft.specialInstructions) setSpecialInstructions(draft.specialInstructions);
    if (draft.occasion) setOccasion(draft.occasion);
    if (draft.customOccasion) setCustomOccasion(draft.customOccasion);
    if (draft.eventDate) setEventDate(draft.eventDate);
    if (draft.maintenanceLevel) setMaintenanceLevel(draft.maintenanceLevel);
    if (draft.consultationRequested !== undefined) setConsultationRequested(draft.consultationRequested);
    if (draft.serviceOptions) setServiceOptions(draft.serviceOptions);
    if (draft.styleConfig) {
      setStyleConfig(draft.styleConfig);
      handleStyleConfigChange(draft.styleConfig);
    }
    if (draft.selectedAddonIds) setSelectedAddonIds(draft.selectedAddonIds);
    if (draft.customAddonRequest) setCustomAddonRequest(draft.customAddonRequest);
    if (Array.isArray(draft.inspirationPhotos)) setInspirationPhotos(draft.inspirationPhotos);
    if (draft.formData) setFormData(prev => ({ ...prev, ...draft.formData }));

    setSavedDraftAvailable(false);
    setDraftNotice('Saved draft restored successfully.');
    setTimeout(() => setDraftNotice(null), 5000);
  };

  // Discard Draft
  const handleDiscardDraft = () => {
    salonDB.clearCustomDraft();
    setSavedDraftAvailable(false);
  };

  // Filter Catalog Services by Department & Search
  const filteredCatalogServices = useMemo(() => {
    return ALL_SERVICES.filter(service => {
      if (service.active === false) return false;
      const matchesDept = selectedDepartment === 'all' || service.category === selectedDepartment;
      const q = catalogSearch.toLowerCase().trim();
      const matchesSearch = !q ||
        service.name.toLowerCase().includes(q) ||
        (service.description && service.description.toLowerCase().includes(q)) ||
        (service.categoryName && service.categoryName.toLowerCase().includes(q));
      return matchesDept && matchesSearch;
    });
  }, [selectedDepartment, catalogSearch]);

  // Open Review Summary Step
  const handleOpenSummary = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setFormErrors({});
    const errors = {};

    if (!formData.name.trim()) errors.name = 'Please provide your full name.';
    if (!formData.email.trim()) errors.email = 'Please provide your email address.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Please provide a valid email address.';
    if (!formData.phone.trim()) errors.phone = 'Please provide your phone number for consultation.';
    if (!customerVision.trim() && !desiredResult.trim()) {
      errors.vision = 'Please describe your vision or desired result in your own words.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSummaryOpen(true);
  };

  // Final Submission to Database
  const handleSubmitCustomRequest = async () => {
    setIsSubmitting(true);
    setSubmissionError('');

    try {
      const occasionLabel = occasion === 'other'
        ? (customOccasion.trim() || 'Custom Occasion')
        : (CUSTOM_OCCASIONS.find(o => o.id === occasion)?.label || 'Everyday Care');

      // Structured Custom Request Payload
      const customRequestPayload = {
        id: `GGJ-CR-${Math.floor(100000 + Math.random() * 900000)}`,
        status: CUSTOM_STATUSES.SUBMITTED,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        category: selectedService.category,
        categoryName: selectedService.categoryName || selectedService.category,
        catalogPrice: selectedService.price,
        catalogDuration: selectedService.duration,
        catalogDurationMinutes: baselineDurationMinutes,
        customerName: formData.name.trim(),
        customerEmail: formData.email.trim(),
        customerPhone: formData.phone.trim(),
        preferredDate: formData.date,
        preferredTime: formData.time,
        customerVision: customerVision.trim(),
        desiredResult: desiredResult.trim(),
        preferredStyle: preferredStyle.trim(),
        focusAreas: focusAreas.trim(),
        thingsToAvoid: thingsToAvoid.trim(),
        sensitivities: sensitivities.trim(),
        specialInstructions: specialInstructions.trim(),
        occasion: occasionLabel,
        eventDate: eventDate || '',
        maintenanceLevel,
        personalPreferences: {
          ...serviceOptions,
          styleConfig
        },
        styleConfig,
        styleCustomization: styleConfig,
        selectedAddons: selectedAddonsObjects,
        customAddonRequest: customAddonRequest.trim(),
        calculatedEstimatedPrice: totalEstimatedPrice,
        calculatedEstimatedDuration: totalEstimatedDurationMinutes,
        consultationRequested: Boolean(consultationRequested),
        inspirationPhotos: inspirationPhotos.map(p => ({
          id: p.id,
          name: p.name,
          size: p.size,
          dataUrl: p.dataUrl,
          description: p.description || ''
        })),
        inspirationPhoto: inspirationPhotos[0] ? {
          name: inspirationPhotos[0].name,
          size: inspirationPhotos[0].size,
          dataUrl: inspirationPhotos[0].dataUrl
        } : null,
        approvedPrice: null,
        approvedDuration: null,
        salonNotes: ''
      };

      // 1. Authoritative Persistence in Master Salon Database
      const saved = salonDB.saveCustomRequest(customRequestPayload);

      // 2. Clear draft after successful submission
      salonDB.clearCustomDraft();

      // 3. Persist to My Beauty Blueprint
      try {
        const userIdent = currentUser?.id || currentUser?.email || 'guest';
        const summaryItems = formatStyleSummary(styleConfig, selectedService.category);
        const styleSummaryText = summaryItems.map(s => `${s.label}: ${s.value}`).join(' • ');

        salonDB.addSavedServiceToBlueprint(userIdent, {
          serviceId: selectedService.id,
          serviceName: selectedService.name,
          category: selectedService.category,
          categoryName: selectedService.categoryName || selectedService.category,
          price: Number(selectedService.price) || 0,
          duration: selectedService.duration || '45 min',
          image: selectedService.image,
          customizationOptions: styleSummaryText || 'Live Style Customizer selections',
          styleCustomization: { ...styleConfig },
          isCustomStudioRequest: true,
          personalNotes: customerVision.trim(),
          desiredResults: desiredResult.trim() || 'Bespoke precision finish'
        });
      } catch (bpErr) {
        console.warn('Beauty blueprint save warning:', bpErr);
      }

      // 4. Confetti Visual Celebration
      try {
        const { default: confetti } = await import('canvas-confetti');
        confetti({
          particleCount: 85,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#263D2B', '#465640', '#A8B5A0', '#F7F4ED']
        });
      } catch (e) {
        // Confetti non-critical
      }

      setIsSummaryOpen(false);
      setSubmissionSuccess({
        requestId: saved.id,
        status: saved.status,
        service: selectedService,
        date: formData.date,
        time: formData.time,
        occasion: occasionLabel,
        customerName: formData.name.trim(),
        customerEmail: formData.email.trim(),
        customerPhone: formData.phone.trim(),
        vision: customerVision.trim(),
        desiredResult: desiredResult.trim(),
        focusAreas: focusAreas.trim(),
        thingsToAvoid: thingsToAvoid.trim(),
        sensitivities: sensitivities.trim(),
        maintenanceLevel,
        selectedAddons: selectedAddonsObjects,
        customAddonRequest: customAddonRequest.trim(),
        totalEstimatedPrice,
        totalEstimatedDurationMinutes,
        inspirationPhotosCount: inspirationPhotos.length,
        consultationRequested,
        styleConfig
      });

      setIsSubmitting(false);
    } catch (err) {
      console.error('Custom request submission error:', err);
      setSubmissionError(err.message || 'An error occurred while saving your custom request. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Customer adds follow-up / clarification note (Step 10 action)
  const handleSendClarification = (e) => {
    e.preventDefault();
    if (!clarificationText.trim() || !submissionSuccess) return;

    try {
      salonDB.updateCustomerClarification(submissionSuccess.requestId, clarificationText.trim());
      setClarificationSubmitted(true);
      setClarificationText('');
      setTimeout(() => setClarificationSubmitted(false), 5000);
    } catch (e) {
      console.warn('Clarification submission error:', e);
    }
  };

  // Customer cancels request (Step 10 action)
  const handleCancelRequest = () => {
    if (!submissionSuccess) return;
    setIsCancelling(true);
    try {
      salonDB.cancelCustomRequest(submissionSuccess.requestId, 'Cancelled by client from custom studio confirmation.');
      setRequestCancelled(true);
      setIsCancelling(false);
    } catch (e) {
      console.warn('Error cancelling custom request:', e);
      setIsCancelling(false);
    }
  };

  // Reset Form for New Custom Experience
  const handleResetForNewRequest = () => {
    setCustomerVision('');
    setDesiredResult('');
    setPreferredStyle('');
    setFocusAreas('');
    setThingsToAvoid('');
    setSensitivities('');
    setSpecialInstructions('');
    const cleanStyle = getDefaultStyleConfigForService(selectedService);
    setStyleConfig(cleanStyle);
    handleStyleConfigChange(cleanStyle);
    setSelectedAddonIds([]);
    setCustomAddonRequest('');
    setConsultationRequested(false);
    setInspirationPhotos([]);
    setSubmissionSuccess(null);
    setSubmissionError('');
    setIsSummaryOpen(false);
    setRequestCancelled(false);
    if (workspaceRef.current) {
      workspaceRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      id="custom-studio-workspace" 
      ref={workspaceRef}
      className={`w-full ${isEmbedded ? 'py-8' : 'min-h-screen pt-8 pb-24'} bg-[#F7F4ED] text-[#10110F] font-body selection:bg-[#263D2B] selection:text-white`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ========================================================================= */}
        {/* 1. HERO HEADER: EXACT REQUIRED HEADING & SUBTITLE                         */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[#263D2B] text-xs font-bold uppercase tracking-[0.22em] mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>GLAM GIRL ATELIER</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-tight">
            Your Vision, Our Expertise.
          </h1>

          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-[#263D2B] font-medium font-serif italic">
            “Every client is unique. Customize your beauty experience to match your style, preferences, needs, and occasion.”
          </p>

          <p className="mt-2 text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed">
            Every service in our authentic 85-treatment catalog supports full client personalization. Describe your aesthetic goals, upload reference photos, select tailored add-ons, and disclose sensitivities for personal evaluation by founder Janki Khatroja.
          </p>

          {/* Quick Anchor Button to The Beauty Vision Board */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#beauty-vision-board-section"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#DCE1D8] hover:border-[#263D2B] text-xs font-semibold text-[#263D2B] shadow-2xs hover:shadow-xs transition-all"
            >
              <Layers className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>Explore The Beauty Vision Board Moodboard</span>
            </a>
          </div>

          {/* Beauty Match Finder Notice Banner */}
          {matchLoadedNotice && (
            <div className="mt-5 p-3.5 rounded-2xl bg-[#263D2B] text-[#F7F4ED] text-xs font-medium flex items-center justify-center gap-2 shadow-sm animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#A8B5A0] shrink-0" />
              <span>{matchLoadedNotice}</span>
            </div>
          )}

          {/* Draft Notification Banner */}
          {draftNotice && (
            <div className="mt-4 p-3 rounded-2xl bg-white border border-[#263D2B]/30 text-[#263D2B] text-xs font-medium flex items-center justify-center gap-2 shadow-xs">
              <Bookmark className="w-4 h-4 text-[#263D2B]" />
              <span>{draftNotice}</span>
            </div>
          )}

          {/* Saved Draft Restore Prompt */}
          {savedDraftAvailable && !submissionSuccess && (
            <div className="mt-4 p-4 rounded-2xl bg-white border border-[#DCE1D8] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-4 h-4 text-[#263D2B] shrink-0" />
                <span className="text-xs text-[#10110F]">
                  You have an unfinished custom draft for <strong>{savedDraftAvailable.serviceName || 'a salon service'}</strong> saved on {new Date(savedDraftAvailable.savedAt).toLocaleDateString()}.
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleLoadSavedDraft(savedDraftAvailable)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#263D2B] text-[#F7F4ED] text-xs font-semibold hover:bg-[#1E3022] transition-colors"
                >
                  Resume Draft
                </button>
                <button
                  type="button"
                  onClick={handleDiscardDraft}
                  className="px-3 py-1.5 rounded-xl border border-[#DCE1D8] text-xs font-medium text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED] transition-colors"
                >
                  Discard
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 2. SUCCESS CONFIRMATION & STEP 10 STATUS TRACKING (IF SUBMITTED)           */}
        {/* ========================================================================= */}
        {submissionSuccess && (
          <div className="mb-14 p-6 sm:p-10 rounded-3xl bg-white border border-[#DCE1D8] shadow-md max-w-3xl mx-auto space-y-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                requestCancelled ? 'bg-rose-50 text-rose-700' : 'bg-[#263D2B]/10 text-[#263D2B]'
              }`}>
                {requestCancelled ? <XCircle className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-[#263D2B]">
                Request #{submissionSuccess.requestId} {requestCancelled ? 'Cancelled' : 'Logged & Authenticated'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#10110F]">
                {requestCancelled ? 'Customization Request Cancelled' : 'Your Vision Has Been Submitted to Janki'}
              </h2>
              
              <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold ${
                requestCancelled 
                  ? 'bg-rose-50 border border-rose-200 text-rose-800' 
                  : 'bg-amber-50 border border-amber-200 text-amber-900'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>Current Status: {requestCancelled ? 'Cancelled by Client' : 'Submitted & Awaiting Salon Review'}</span>
              </div>
            </div>

            {/* Request Summary Overview */}
            <div className="p-5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-3 text-xs leading-relaxed text-[#10110F]">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCE1D8]">
                <span className="font-bold text-[#465640] uppercase tracking-wider">Requested Service:</span>
                <span className="font-serif font-bold text-sm text-[#10110F]">{submissionSuccess.service.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7068]">Original Catalog Baseline:</span>
                <span className="font-semibold text-[#263D2B]">${submissionSuccess.service.price} CAD • {submissionSuccess.service.duration}</span>
              </div>
              {submissionSuccess.selectedAddons && submissionSuccess.selectedAddons.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7068]">Selected Add-Ons ({submissionSuccess.selectedAddons.length}):</span>
                  <span className="font-semibold">{submissionSuccess.selectedAddons.map(a => a.name).join(', ')}</span>
                </div>
              )}
              {submissionSuccess.customAddonRequest && (
                <div className="flex items-center justify-between">
                  <span className="text-amber-800 font-medium">Unlisted Add-On Request:</span>
                  <span className="font-semibold italic text-amber-900">“{submissionSuccess.customAddonRequest}” (Quote pending)</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-[#6B7068]">Estimated Total:</span>
                <span className="font-bold text-sm text-[#10110F]">${submissionSuccess.totalEstimatedPrice} CAD • ~{submissionSuccess.totalEstimatedDurationMinutes} min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7068]">Preferred Slot:</span>
                <span className="font-semibold">{submissionSuccess.date} at {submissionSuccess.time}</span>
              </div>
              {submissionSuccess.consultationRequested && (
                <div className="pt-2 text-amber-900 font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
                  <span>Complimentary 1-on-1 Artist Consultation requested prior to treatment.</span>
                </div>
              )}

              {/* Personalized Live Style Customizer Summary */}
              {submissionSuccess.styleConfig && formatStyleSummary(submissionSuccess.styleConfig, submissionSuccess.service?.category).length > 0 && (
                <div className="pt-3 border-t border-[#DCE1D8] space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#465640] block">
                    Personalized Style Customization:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {formatStyleSummary(submissionSuccess.styleConfig, submissionSuccess.service?.category).map((item, idx) => (
                      <div key={idx} className="bg-white p-2.5 rounded-xl border border-[#DCE1D8] flex items-center justify-between">
                        <span className="text-[#6B7068]">{item.label}:</span>
                        <div className="flex items-center gap-1.5 font-semibold text-[#10110F]">
                          {item.hex && (
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0 inline-block shadow-xs"
                              style={{ backgroundColor: item.hex }}
                            />
                          )}
                          <span>{item.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Step 10: Follow-up & Clarification Box for Customer */}
            {!requestCancelled && (
              <div className="p-4 rounded-2xl bg-white border border-[#DCE1D8] space-y-3">
                <span className="font-bold text-xs uppercase tracking-wider text-[#465640] block">
                  Need to Add a Detail or Reply to the Salon?
                </span>
                <form onSubmit={handleSendClarification} className="space-y-2">
                  <textarea
                    rows={2}
                    value={clarificationText}
                    onChange={(e) => setClarificationText(e.target.value)}
                    placeholder="Provide any additional detail or answers to salon clarification requests..."
                    className="w-full p-3 text-xs rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                  />
                  <div className="flex items-center justify-between">
                    {clarificationSubmitted ? (
                      <span className="text-[11px] font-semibold text-[#263D2B]">
                        ✓ Update sent to salon staff!
                      </span>
                    ) : <span />}
                    <button
                      type="submit"
                      disabled={!clarificationText.trim()}
                      className="px-4 py-2 rounded-xl bg-[#263D2B] text-white text-xs font-semibold hover:bg-[#1E3022] disabled:opacity-50 transition-colors inline-flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Update</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              {!requestCancelled && (
                <Link
                  to={`/book-appointment?service=${submissionSuccess.service.slug || submissionSuccess.service.id}&customRequestId=${submissionSuccess.requestId}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-[#F7F4ED] font-semibold text-xs tracking-wider uppercase shadow-sm transition-all"
                >
                  <span>Proceed to Booking Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              <button
                type="button"
                onClick={handleResetForNewRequest}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-[#DCE1D8] bg-white hover:bg-[#F7F4ED] text-xs font-semibold text-[#10110F] transition-colors"
              >
                Customize Another Service
              </button>
              {!requestCancelled && (
                <button
                  type="button"
                  onClick={handleCancelRequest}
                  disabled={isCancelling}
                  className="w-full sm:w-auto px-4 py-3.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors"
                >
                  {isCancelling ? 'Cancelling...' : 'Cancel Request'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. STEP 1: SELECT ANY EXISTING SALON SERVICE (CATALOG BROWSER)            */}
        {/* ========================================================================= */}
        <section className="mb-14 space-y-6" aria-label="Catalog Service Selection">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#DCE1D8]">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#263D2B]">
                Step 1 of 6: Choose Any Service
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#10110F]">
                Select from Our Master Salon Catalog
              </h2>
              <p className="text-xs sm:text-sm text-[#465640]">
                Every single service from our authentic 85-service menu is eligible for full bespoke personalization.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8B5A0]" />
              <input
                type="text"
                placeholder="Search by name, treatment, or keyword..."
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[#DCE1D8] bg-white text-[#10110F] placeholder-[#6B7068] focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
              />
              {catalogSearch && (
                <button
                  type="button"
                  onClick={() => setCatalogSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7068] hover:text-[#10110F]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Department Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {ALL_DEPARTMENTS.map((dept) => {
              const isSelected = selectedDepartment === dept.id;
              return (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => setSelectedDepartment(dept.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#263D2B] text-white shadow-xs'
                      : 'bg-white hover:bg-[#EBEFE8] text-[#465640] border border-[#DCE1D8]'
                  }`}
                >
                  <span>{dept.label}</span>
                </button>
              );
            })}
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredCatalogServices.slice(0, 16).map((service) => {
              const isCurrent = selectedServiceId === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => handleSelectService(service)}
                  className={`group rounded-2xl border text-left cursor-pointer transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-white border-[#263D2B] ring-2 ring-[#263D2B] shadow-md'
                      : 'bg-white/80 border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white hover:shadow-xs'
                  }`}
                >
                  {/* Service Thumbnail */}
                  <div className="relative aspect-16/10 w-full bg-[#EBEFE8] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/facial/special-glam-girl-facial.jpg';
                      }}
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-full bg-[#10110F]/80 backdrop-blur-xs text-[#F7F4ED] text-[10px] font-bold uppercase tracking-wider">
                        {service.categoryName || service.category}
                      </span>
                    </div>
                    {isCurrent && (
                      <div className="absolute top-2.5 right-2.5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#263D2B] text-[#F7F4ED] text-[10px] font-bold shadow-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Selected</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Service Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <h4 className={`font-serif text-base font-semibold leading-snug transition-colors ${
                        isCurrent ? 'text-[#263D2B]' : 'text-[#10110F] group-hover:text-[#263D2B]'
                      }`}>
                        {service.name}
                      </h4>
                      <p className="text-xs text-[#6B7068] line-clamp-2 leading-relaxed">
                        {service.description || 'Authentic salon service crafted with premium botanicals.'}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#EBEFE8] flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">
                          Catalog Baseline
                        </span>
                        <div className="text-xs font-bold text-[#10110F]">
                          ${service.price} CAD <span className="font-normal text-[#6B7068]">• {service.duration}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectService(service);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                          isCurrent
                            ? 'bg-[#263D2B] text-[#F7F4ED]'
                            : 'bg-[#F7F4ED] text-[#263D2B] hover:bg-[#263D2B] hover:text-white'
                        }`}
                      >
                        {isCurrent ? 'Customizing' : 'Customize'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCatalogServices.length > 16 && (
            <div className="text-center pt-2">
              <span className="text-xs text-[#6B7068] italic">
                Showing 16 of {filteredCatalogServices.length} services. Use search to find any specific treatment instantly.
              </span>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 4. DEDICATED CUSTOMIZATION WORKSPACE FOR SELECTED SERVICE                 */}
        {/* ========================================================================= */}
        <section 
          className="bg-white rounded-3xl border border-[#DCE1D8] shadow-sm p-6 sm:p-10 mb-14 transition-all duration-300"
          aria-label="Dedicated Customization Workspace"
        >
          {/* Active Service Showcase & Baseline Transparency Banner */}
          <div className="pb-8 border-b border-[#DCE1D8] space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <img
                  src={selectedService.image}
                  alt={selectedService.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover object-center border border-[#DCE1D8] shrink-0"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/facial/special-glam-girl-facial.jpg';
                  }}
                />
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#263D2B]">
                      Step 2 of 6: Personalize Service
                    </span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#F7F4ED] text-[#465640] border border-[#DCE1D8] font-medium">
                      {selectedService.categoryName || selectedService.category}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#10110F]">
                    Customizing: {selectedService.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#465640] max-w-xl">
                    {selectedService.description || 'Describe your unique vision below. We tailor every aspect to your hair, skin, and occasion.'}
                  </p>
                </div>
              </div>

              {/* Baseline Price & Duration Box */}
              <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] shrink-0 space-y-2 text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#465640] block">
                  Official Catalog Baseline
                </span>
                <div className="text-xl sm:text-2xl font-serif font-bold text-[#263D2B]">
                  ${selectedService.price} CAD
                </div>
                <div className="text-xs text-[#6B7068] flex items-center justify-end gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                  <span>Duration: {selectedService.duration}</span>
                </div>
              </div>
            </div>

            {/* Price Transparency & Approval Disclaimer */}
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-950 text-xs flex items-center gap-2.5">
              <Info className="w-4 h-4 text-amber-800 shrink-0" />
              <span>
                <strong>Bespoke Pricing Guarantee:</strong> Catalog baseline prices are approved and fixed. If your custom vision requires extra time, density, or specialized formulas, final price and duration are subject to salon review and confirmed prior to your service.
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 5. FORM: TELL US EXACTLY WHAT YOU WANT                                    */}
          {/* ========================================================================= */}
          <form onSubmit={handleOpenSummary} className="pt-8 space-y-10">
            {/* General Form Error Alert */}
            {Object.keys(formErrors).length > 0 && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-700 shrink-0" />
                <span>Please complete the required contact and vision fields highlighted below.</span>
              </div>
            )}

            {/* ===================================================================== */}
            {/* SECTION A: PERSONAL REQUIREMENTS                                      */}
            {/* ===================================================================== */}
            <div className="space-y-6">
              <div className="border-b border-[#DCE1D8] pb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#263D2B] block">
                  Step 3: Personal Requirements & Constraints
                </span>
                <h4 className="font-serif text-xl text-[#10110F]">
                  Tell Us Exactly What You Want
                </h4>
              </div>

              {/* 1. What you want (Large editable textarea) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] flex items-center gap-1">
                    <span>1. Describe Exactly What You Want</span>
                    <span className="text-[#263D2B]">*</span>
                  </label>
                  <span className="text-[11px] text-[#6B7068]">
                    {customerVision.length} / 1000 characters
                  </span>
                </div>
                <p className="text-xs text-[#465640] mb-2">
                  Share your personal vision, hair or skin history, and anything unique you have in mind. You are never limited to fixed dropdown choices.
                </p>

                {/* Helpful Inspiration Prompt Pills */}
                <div className="mb-2.5 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[11px] text-[#6B7068] font-medium mr-1">Quick Ideas:</span>
                  {VISION_INSPIRATION_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCustomerVision(prev => prev ? `${prev}. ${prompt}` : prompt)}
                      className="px-2.5 py-1 rounded-lg bg-[#F7F4ED] hover:bg-[#EBEFE8] border border-[#DCE1D8] text-[11px] text-[#263D2B] font-medium transition-colors"
                    >
                      + {prompt}
                    </button>
                  ))}
                </div>

                <textarea
                  rows={4}
                  maxLength={1000}
                  value={customerVision}
                  onChange={(e) => {
                    setCustomerVision(e.target.value);
                    if (formErrors.vision) setFormErrors({ ...formErrors, vision: null });
                  }}
                  placeholder="e.g. I would love a soft warm caramel balayage with face-framing money pieces, seamlessly blended into dark roots. I have medium-thick wavy hair with previous brown dye. I prefer low-maintenance grow-out with mirror gloss shine..."
                  className={`w-full p-4 text-xs sm:text-sm rounded-2xl border bg-[#F7F4ED]/40 text-[#10110F] placeholder-[#6B7068] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B] transition-all leading-relaxed ${
                    formErrors.vision ? 'border-rose-400 bg-rose-50/30' : 'border-[#DCE1D8]'
                  }`}
                />
                {formErrors.vision && (
                  <p className="text-[11px] text-rose-600 font-medium mt-1">{formErrors.vision}</p>
                )}
              </div>

              {/* 2 & 3: Desired Result & Preferred Style */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                    2. Desired Final Result
                  </label>
                  <p className="text-xs text-[#465640] mb-2">
                    Explain the exact look, texture, or aesthetic finish you want to leave with.
                  </p>
                  <input
                    type="text"
                    value={desiredResult}
                    onChange={(e) => setDesiredResult(e.target.value)}
                    placeholder="e.g. Ultra-smooth mirror glass finish with lasting root lift"
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                    3. Preferred Style & Appearance
                  </label>
                  <p className="text-xs text-[#465640] mb-2">
                    Overall mood or aesthetic direction (e.g. Hollywood Glam, Minimalist Chic, Royal Heritage).
                  </p>
                  <input
                    type="text"
                    value={preferredStyle}
                    onChange={(e) => setPreferredStyle(e.target.value)}
                    placeholder="e.g. Classic European romantic elegance with modern dewy finish"
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                  />
                </div>
              </div>

              {/* 4 & 5: Areas to Focus On & Things to Avoid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                    4. Areas to Focus On
                  </label>
                  <p className="text-xs text-[#465640] mb-2">
                    Highlight specific areas (e.g. front layers, dry cheek zone, shoulder knots, accent nails).
                  </p>
                  <input
                    type="text"
                    value={focusAreas}
                    onChange={(e) => setFocusAreas(e.target.value)}
                    placeholder="e.g. Front face framing and crown volume; T-zone pore clarity"
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-rose-900 mb-1.5 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-700" />
                    <span>5. Things to Avoid (Critical Constraints)</span>
                  </label>
                  <p className="text-xs text-[#465640] mb-2">
                    Tell us what to steer clear of (e.g. no orange brassiness, no thinning shears, avoid square nails).
                  </p>
                  <input
                    type="text"
                    value={thingsToAvoid}
                    onChange={(e) => setThingsToAvoid(e.target.value)}
                    placeholder="e.g. Do not cut more than 1 inch; no heavy chemical fragrances"
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-rose-200 bg-rose-50/20 text-[#10110F] placeholder-[#6B7068] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                  />
                </div>
              </div>

              {/* 6 & 7: Allergies/Sensitivities & Special Instructions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B]" />
                    <span>6. Allergies, Sensitivities & Restrictions</span>
                  </label>
                  <p className="text-xs text-[#465640] mb-2">
                    Disclose reactive skin, nut-oil allergies, active retinols, or product restrictions.
                  </p>
                  <textarea
                    rows={2}
                    value={sensitivities}
                    onChange={(e) => setSensitivities(e.target.value)}
                    placeholder="e.g. Highly sensitive skin; no almond or tree-nut oils; prone to redness with warm wax..."
                    className="w-full p-3 text-xs sm:text-sm rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                    7. Special Instructions
                  </label>
                  <p className="text-xs text-[#465640] mb-2">
                    Any timing needs, quiet appointment preference, or event preparation details.
                  </p>
                  <textarea
                    rows={2}
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Bringing heavy bridal dupatta and jewelry; ceremony starts at 5:00 PM prompt..."
                    className="w-full p-3 text-xs sm:text-sm rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                  />
                </div>
              </div>

              {/* 8: Occasion & Event Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                    8. Occasion or Event
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-[#10110F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                  >
                    {CUSTOM_OCCASIONS.map((occ) => (
                      <option key={occ.id} value={occ.id}>
                        {occ.label}
                      </option>
                    ))}
                  </select>

                  {occasion === 'other' && (
                    <input
                      type="text"
                      placeholder="Specify your unique event..."
                      value={customOccasion}
                      onChange={(e) => setCustomOccasion(e.target.value)}
                      className="mt-2 w-full px-4 py-2.5 text-xs rounded-xl border border-[#DCE1D8] bg-white text-[#10110F] focus:ring-2 focus:ring-[#263D2B]"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                    Event Date (If Applicable)
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-[#10110F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                  />
                  <span className="text-[11px] text-[#6B7068] mt-1 block">
                    Helps us schedule treatments with optimal skin healing or hair setting windows.
                  </span>
                </div>
              </div>

              {/* 9: Desired Maintenance Level */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-2">
                  9. Desired Maintenance Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {MAINTENANCE_LEVELS.map((level) => {
                    const isSelected = maintenanceLevel === level.id;
                    return (
                      <div
                        key={level.id}
                        onClick={() => setMaintenanceLevel(level.id)}
                        className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                            : 'bg-[#F7F4ED]/50 border-[#DCE1D8] hover:border-[#A8B5A0] text-[#10110F]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${
                            isSelected ? 'text-[#A8B5A0]' : 'text-[#465640]'
                          }`}>
                            {level.badge}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <div className="font-serif font-bold text-sm mb-1">{level.label}</div>
                        <div className={`text-[11px] leading-relaxed ${
                          isSelected ? 'text-[#F7F4ED]/80' : 'text-[#6B7068]'
                        }`}>
                          {level.desc}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 10: 1-on-1 Consultation Request */}
              <div className="p-4 rounded-2xl border border-[#DCE1D8] bg-[#F7F4ED]/50 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consultation-check"
                  checked={consultationRequested}
                  onChange={(e) => setConsultationRequested(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-[#263D2B] focus:ring-[#263D2B] border-[#DCE1D8] cursor-pointer"
                />
                <label htmlFor="consultation-check" className="cursor-pointer space-y-0.5">
                  <span className="font-semibold text-xs text-[#10110F] block">
                    Request a Complimentary 1-on-1 Artist Consultation
                  </span>
                  <span className="text-xs text-[#465640] block">
                    Receive direct guidance from founder Janki Khatroja via telephone or brief preview before treatment confirmation.
                  </span>
                </label>
              </div>
            </div>

            {/* ===================================================================== */}
            {/* STEP 4: LIVE STYLE CUSTOMIZER                                         */}
            {/* ===================================================================== */}
            <LiveStyleCustomizer
              selectedService={selectedService}
              styleConfig={styleConfig}
              onChange={handleStyleConfigChange}
              onSave={handleSaveCustomization}
              onReset={handleResetCustomizer}
              onContinueToSummary={handleOpenSummary}
              isSaving={isSavingCustomization}
              saveNotice={styleSaveNotice}
            />

            {/* ===================================================================== */}
            {/* SECTION C: CUSTOM ADD-ON BUILDER                                      */}
            {/* ===================================================================== */}
            <div className="pt-6 border-t border-[#DCE1D8] space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#263D2B] block">
                  Step 5: Add-On Builder
                </span>
                <h4 className="font-serif text-xl text-[#10110F]">
                  Enhance Your Treatment with Eligible Add-Ons
                </h4>
                <p className="text-xs text-[#465640]">
                  Select verified salon add-ons with preconfigured pricing and duration, or request a custom unlisted add-on.
                </p>
              </div>

              {/* Eligible Add-On Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {eligibleAddons.map((addon) => {
                  const isSelected = selectedAddonIds.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => handleToggleAddon(addon.id)}
                      className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#263D2B]/5 border-[#263D2B] ring-1 ring-[#263D2B] shadow-xs'
                          : 'bg-[#F7F4ED]/40 border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#10110F]">
                            {addon.name}
                          </span>
                          <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-[#263D2B] text-white' : 'border border-[#DCE1D8] bg-white'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                        <p className="text-[11px] text-[#6B7068] leading-relaxed">
                          {addon.desc}
                        </p>
                      </div>

                      <div className="pt-2 mt-2 border-t border-[#DCE1D8]/60 flex items-center justify-between text-xs">
                        <span className="font-bold text-[#263D2B]">
                          +${addon.price} CAD
                        </span>
                        <span className="text-[#6B7068] text-[11px]">
                          +{addon.durationMinutes} min
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Request Unlisted Add-on */}
              <div className="p-4 rounded-2xl bg-[#F7F4ED]/60 border border-[#DCE1D8] space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F]">
                  Request an Unlisted Custom Add-On
                </label>
                <p className="text-xs text-[#465640]">
                  Need a treatment addition not listed above? Describe it here. (Submitted for salon review; price and duration confirmed before booking).
                </p>
                <input
                  type="text"
                  value={customAddonRequest}
                  onChange={(e) => setCustomAddonRequest(e.target.value)}
                  placeholder="e.g. 15-minute hand reflexology massage while facial sheet mask sets..."
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DCE1D8] bg-white text-[#10110F] focus:ring-2 focus:ring-[#263D2B]"
                />
                {customAddonRequest && (
                  <span className="text-[11px] text-amber-800 font-medium block">
                    * Unlisted custom add-ons will be reviewed by founder Janki Khatroja. Price and duration to be confirmed by the salon.
                  </span>
                )}
              </div>
            </div>

            {/* ===================================================================== */}
            {/* SECTION D: MULTI-PHOTO INSPIRATION UPLOAD                             */}
            {/* ===================================================================== */}
            <div className="pt-6 border-t border-[#DCE1D8] space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#263D2B] block">
                  Step 6: Inspiration Gallery
                </span>
                <h4 className="font-serif text-xl text-[#10110F]">
                  Attach Reference & Inspiration Photos (Up to 4 Images)
                </h4>
                <p className="text-xs text-[#465640]">
                  Attach photos of your preferred look, color shade, or hairstyle. Add a quick note to each image to guide our artists.
                </p>
              </div>

              {imageError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{imageError}</span>
                </div>
              )}

              {/* Uploaded Photos Grid */}
              {inspirationPhotos.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {inspirationPhotos.map((photo, idx) => (
                    <div key={photo.id} className="p-3 rounded-2xl border border-[#DCE1D8] bg-white space-y-2 relative shadow-xs">
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#EBEFE8]">
                        <img
                          src={photo.dataUrl}
                          alt={photo.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(photo.id)}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#10110F]/70 hover:bg-rose-700 text-white flex items-center justify-center transition-colors shadow-xs"
                          title="Remove photo"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-[#10110F]/80 text-[#F7F4ED] text-[10px] font-bold">
                          #{idx + 1}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="text-[11px] font-semibold text-[#10110F] truncate" title={photo.name}>
                          {photo.name}
                        </div>
                        <div className="text-[10px] text-[#6B7068]">
                          {photo.size}
                        </div>
                        <input
                          type="text"
                          value={photo.description || ''}
                          onChange={(e) => handlePhotoDescriptionChange(photo.id, e.target.value)}
                          placeholder="Note: e.g. Love this tone"
                          className="w-full px-2.5 py-1.5 text-[11px] rounded-lg border border-[#DCE1D8] bg-[#F7F4ED]/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#263D2B]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Input Area */}
              {inspirationPhotos.length < 4 && (
                <div className="max-w-md">
                  <label
                    htmlFor="inspiration-upload"
                    className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#DCE1D8] hover:border-[#263D2B] rounded-2xl bg-[#F7F4ED]/40 hover:bg-white cursor-pointer transition-all text-center group"
                  >
                    <Upload className="w-6 h-6 text-[#A8B5A0] group-hover:text-[#263D2B] mb-2 transition-colors" />
                    <span className="text-xs font-semibold text-[#10110F]">
                      {isUploading ? 'Processing image...' : `Click to add inspiration photo (${inspirationPhotos.length}/4)`}
                    </span>
                    <span className="text-[11px] text-[#6B7068] mt-0.5">
                      JPG, PNG, or WEBP up to 5MB each
                    </span>
                    <input
                      id="inspiration-upload"
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handlePhotoUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>

            {/* ===================================================================== */}
            {/* SECTION E: PATRON CONTACT & PREFERRED APPOINTMENT TIMING               */}
            {/* ===================================================================== */}
            <div className="pt-6 border-t border-[#DCE1D8] space-y-4">
              <div>
                <h4 className="font-serif text-xl text-[#10110F]">
                  Your Contact & Preferred Slot
                </h4>
                <p className="text-xs text-[#465640]">
                  Where should founder Janki Khatroja send your approved quote and consultation confirmation?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#465640] mb-1">
                    Full Name <span className="text-[#263D2B]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Siobhan Roy"
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B] ${
                      formErrors.name ? 'border-rose-400 bg-rose-50/40' : 'border-[#DCE1D8]'
                    }`}
                  />
                  {formErrors.name && (
                    <span className="text-[10px] text-rose-600 block mt-1">{formErrors.name}</span>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#465640] mb-1">
                    Email Address <span className="text-[#263D2B]">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. patron@example.ca"
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B] ${
                      formErrors.email ? 'border-rose-400 bg-rose-50/40' : 'border-[#DCE1D8]'
                    }`}
                  />
                  {formErrors.email && (
                    <span className="text-[10px] text-rose-600 block mt-1">{formErrors.email}</span>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#465640] mb-1">
                    Phone Number <span className="text-[#263D2B]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +1 (616) 255-0549"
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B] ${
                      formErrors.phone ? 'border-rose-400 bg-rose-50/40' : 'border-[#DCE1D8]'
                    }`}
                  />
                  {formErrors.phone && (
                    <span className="text-[10px] text-rose-600 block mt-1">{formErrors.phone}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#465640] mb-1">
                    Preferred Appointment Date
                  </label>
                  <input
                    type="date"
                    min={defaultBookingDate}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#DCE1D8] bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#465640] mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#DCE1D8] bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Slot Availability Notice */}
              {slotAvailability.checked && !slotAvailability.available && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>
                    Note: The slot on {formData.date} at {formData.time} has high demand or overlaps existing appointments. Founder Janki will suggest the closest optimal timing.
                  </span>
                </div>
              )}
            </div>

            {/* ===================================================================== */}
            {/* LIVE CUSTOMIZATION SUMMARY & DRAFT BAR                                */}
            {/* ===================================================================== */}
            <div className="p-5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DCE1D8]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#465640] block">
                    Live Customization Summary
                  </span>
                  <div className="font-serif font-bold text-base text-[#10110F]">
                    {selectedService.name}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="px-3.5 py-1.5 rounded-xl border border-[#DCE1D8] bg-white hover:bg-[#F7F4ED] text-xs font-semibold text-[#263D2B] transition-colors inline-flex items-center gap-1.5"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Save Draft</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleResetForNewRequest}
                    className="px-3 py-1.5 rounded-xl border border-[#DCE1D8] bg-white hover:bg-rose-50 text-xs font-medium text-[#6B7068] hover:text-rose-700 transition-colors inline-flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Price & Duration Transparency Line */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-[#6B7068] block">Catalog Baseline:</span>
                  <span className="font-semibold text-[#10110F]">${selectedService.price} CAD ({selectedService.duration})</span>
                </div>
                <div>
                  <span className="text-[#6B7068] block">Confirmed Add-Ons:</span>
                  <span className="font-semibold text-[#263D2B]">
                    {selectedAddonsObjects.length > 0 ? `+${addOnCostTotal} CAD (+${addOnDurationMinutesTotal} min)` : 'None'}
                  </span>
                </div>
                <div>
                  <span className="text-[#6B7068] block">Estimated Total:</span>
                  <span className="font-bold text-sm text-[#10110F]">
                    ${totalEstimatedPrice} CAD • ~{totalEstimatedDurationMinutes} min
                  </span>
                </div>
              </div>

              {hasUnquotedCustomRequests && (
                <div className="text-[11px] text-amber-900 font-medium flex items-center gap-1.5 pt-1">
                  <Info className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                  <span>
                    Final price and duration subject to salon approval. Price to be confirmed by the salon.
                  </span>
                </div>
              )}
            </div>

            {/* REVIEW & SUBMIT BUTTON */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#6B7068]">
                <span>All customization requests are evaluated and quoted by founder Janki Khatroja.</span>
              </div>

              <button
                type="submit"
                id="review-custom-request-button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-[#F7F4ED] font-semibold text-xs tracking-wider uppercase shadow-sm hover:shadow transition-all"
              >
                <span>Review Request Summary</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </section>

        {/* ========================================================================= */}
        {/* 6. STEP 5: INTERACTIVE REQUEST SUMMARY MODAL                             */}
        {/* ========================================================================= */}
        {isSummaryOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden my-6 animate-scale-in">
              {/* Summary Header */}
              <div className="p-6 border-b border-[#DCE1D8] flex items-center justify-between bg-[#F7F4ED]">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B]">
                    Step 5 of 6: Verification & Approval
                  </span>
                  <h3 className="text-xl font-serif text-[#10110F]">
                    Review Your Customization Request
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSummaryOpen(false)}
                  className="p-2 rounded-xl text-[#6B7068] hover:text-[#10110F] hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Summary Content: Scrollable */}
              <div className="p-6 overflow-y-auto space-y-5 text-xs">
                {submissionError && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-700 shrink-0" />
                    <span>{submissionError}</span>
                  </div>
                )}

                {/* Service Card */}
                <div className="p-4 rounded-2xl bg-[#F7F4ED]/60 border border-[#DCE1D8] flex items-center gap-4">
                  <img
                    src={selectedService.image}
                    alt={selectedService.name}
                    className="w-16 h-16 rounded-xl object-cover border border-[#DCE1D8]"
                  />
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#465640]">
                      {selectedService.categoryName || selectedService.category}
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#10110F]">
                      {selectedService.name}
                    </h4>
                    <div className="text-[#263D2B] font-semibold">
                      Catalog Baseline: ${selectedService.price} CAD • {selectedService.duration}
                    </div>
                  </div>
                </div>

                {/* Live Style Customizer Selections */}
                {styleConfig && formatStyleSummary(styleConfig, selectedService.category).length > 0 && (
                  <div className="space-y-2">
                    <span className="font-bold uppercase tracking-wider text-[#465640] text-[10px] block">
                      Live Style Customizer Selections
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3.5 rounded-2xl bg-white border border-[#DCE1D8]">
                      {formatStyleSummary(styleConfig, selectedService.category).map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs py-1 px-1.5 rounded-lg hover:bg-[#F7F4ED]/50 transition-colors">
                          <span className="text-[#6B7068]">{item.label}:</span>
                          <div className="flex items-center gap-1.5 font-semibold text-[#10110F]">
                            {item.hex && (
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0 inline-block shadow-xs"
                                style={{ backgroundColor: item.hex }}
                              />
                            )}
                            <span>{item.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Patron's Vision */}
                <div className="space-y-1">
                  <span className="font-bold uppercase tracking-wider text-[#465640] text-[10px] block">
                    Your Exact Vision
                  </span>
                  <p className="p-3.5 rounded-xl bg-white border border-[#DCE1D8] text-[#10110F] italic leading-relaxed whitespace-pre-line">
                    “{customerVision || 'None specified'}”
                  </p>
                </div>

                {/* Desired Result & Finish */}
                {desiredResult && (
                  <div className="space-y-1">
                    <span className="font-bold uppercase tracking-wider text-[#465640] text-[10px] block">
                      Desired Result & Finish
                    </span>
                    <div className="p-3 rounded-xl bg-white border border-[#DCE1D8] text-[#10110F]">
                      {desiredResult}
                    </div>
                  </div>
                )}

                {/* Focus Areas & Things to Avoid */}
                {(focusAreas || thingsToAvoid) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {focusAreas && (
                      <div className="p-3 rounded-xl bg-white border border-[#DCE1D8]">
                        <span className="text-[10px] font-bold uppercase text-[#465640] block">Focus Areas:</span>
                        <span className="text-[#10110F] font-medium">{focusAreas}</span>
                      </div>
                    )}
                    {thingsToAvoid && (
                      <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-200">
                        <span className="text-[10px] font-bold uppercase text-rose-800 block">Things to Avoid:</span>
                        <span className="text-rose-950 font-medium">{thingsToAvoid}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Sensitivities */}
                {sensitivities && (
                  <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200">
                    <span className="text-[10px] font-bold uppercase text-amber-900 block">Sensitivities / Restrictions:</span>
                    <span className="text-amber-950 font-medium">{sensitivities}</span>
                  </div>
                )}

                {/* Add-Ons Breakdown */}
                {selectedAddonsObjects.length > 0 && (
                  <div className="space-y-1">
                    <span className="font-bold uppercase tracking-wider text-[#465640] text-[10px] block">
                      Selected Add-Ons ({selectedAddonsObjects.length})
                    </span>
                    <div className="p-3 rounded-xl bg-white border border-[#DCE1D8] space-y-1.5">
                      {selectedAddonsObjects.map(a => (
                        <div key={a.id} className="flex items-center justify-between text-xs">
                          <span className="text-[#10110F] font-medium">{a.name}</span>
                          <span className="font-semibold text-[#263D2B]">+${a.price} CAD (+{a.durationMinutes} min)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom Unlisted Add-on */}
                {customAddonRequest && (
                  <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200 text-amber-950">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">
                      Unlisted Add-On Request (Pending Salon Quote)
                    </span>
                    <span className="font-medium italic">“{customAddonRequest}”</span>
                  </div>
                )}

                {/* Inspiration Photos Count */}
                {inspirationPhotos.length > 0 && (
                  <div className="space-y-1">
                    <span className="font-bold uppercase tracking-wider text-[#465640] text-[10px] block">
                      Attached Reference Photos ({inspirationPhotos.length})
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {inspirationPhotos.map(p => (
                        <div key={p.id} className="aspect-square rounded-lg overflow-hidden border border-[#DCE1D8]">
                          <img src={p.dataUrl} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Estimated Total Calculation */}
                <div className="p-4 rounded-xl bg-[#263D2B]/5 border border-[#263D2B]/20 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#263D2B] block">Estimated Total Calculation:</span>
                    <span className="text-[11px] text-[#465640]">Includes baseline catalog rate + selected add-ons</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-base text-[#263D2B]">
                      ${totalEstimatedPrice} CAD
                    </div>
                    <div className="text-[11px] text-[#6B7068]">
                      Approx. {totalEstimatedDurationMinutes} min
                    </div>
                  </div>
                </div>

                {/* Consultation */}
                {consultationRequested && (
                  <div className="p-2.5 rounded-xl bg-[#263D2B]/10 text-[#263D2B] font-semibold text-xs flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Complimentary 1-on-1 Consultation Requested</span>
                  </div>
                )}

                {/* Disclaimer */}
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                  By submitting, you request an artist consultation and review for this service. No payment is collected until salon confirmation.
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="p-6 border-t border-[#DCE1D8] flex items-center justify-between gap-3 bg-[#F7F4ED]">
                <button
                  type="button"
                  onClick={() => setIsSummaryOpen(false)}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl border border-[#DCE1D8] bg-white text-xs font-semibold text-[#10110F] hover:bg-[#F7F4ED] transition-colors"
                >
                  Edit Details
                </button>

                <button
                  type="button"
                  id="confirm-submit-custom-request"
                  onClick={handleSubmitCustomRequest}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-7 py-2.5 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-[#F7F4ED] text-xs font-semibold tracking-wider uppercase shadow-sm transition-all"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>Submit for Salon Review</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
