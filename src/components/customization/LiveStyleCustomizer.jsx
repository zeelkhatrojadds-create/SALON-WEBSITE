// GLAM GIRL BY JANKI — Live Style Customizer Component
// Integrated directly into Custom Studio for live interactive preview and personalization.
// Strictly adheres to salon brand identity:
// Deep Black: #10110F | Forest Green: #263D2B | Olive: #465640 | Sage: #A8B5A0 | Warm Cream: #F7F4ED

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  Sparkles,
  Palette,
  Scissors,
  Feather,
  Check,
  CheckCircle2,
  RotateCcw,
  Bookmark,
  ArrowRight,
  Eye,
  Layers,
  Sliders,
  Shuffle,
  Info,
  ShieldCheck,
  Clock,
  ChevronRight,
  SplitSquareVertical,
  SlidersHorizontal,
  Flame,
  Flower2,
  Heart,
  Maximize2
} from 'lucide-react';
import {
  NAIL_SHAPES,
  NAIL_COLORS,
  NAIL_FINISHES,
  NAIL_ART_OPTIONS,
  FINGERS_CONFIG
} from '../nail-studio/NailConstants';
import {
  CUSTOMIZER_MODELS,
  HAIR_SHADE_CATEGORIES,
  COMPLETE_HAIR_SHADES,
  HAIR_FINISHES
} from '../hair-studio/hairCustomizerData';
import {
  MEHNDI_SERVICE_CARDS,
  MEHNDI_GALLERY_FILTERS
} from '../../data/mehndiData';
import {
  HAIR_SERVICES_OPTIONS,
  HAIR_COLOUR_OPTIONS,
  SKIN_CARE_OPTIONS,
  MAKEUP_OPTIONS,
  THREADING_OPTIONS,
  WAXING_OPTIONS,
  MASSAGE_OPTIONS,
  LASHES_OPTIONS,
  HAIR_TREATMENTS_OPTIONS
} from '../../data/customizationStudioData';

// Nail lengths
const NAIL_LENGTHS = [
  { id: 'short', label: 'Short', desc: 'Natural active free-edge length (practical & chic)', scaleY: 0.9 },
  { id: 'medium', label: 'Medium', desc: 'Classic salon length with refined finger elongation', scaleY: 1.0 },
  { id: 'long', label: 'Long', desc: 'Elongated silhouette with striking glamour arch', scaleY: 1.15 },
  { id: 'extra-long', label: 'Extra Long', desc: 'High-fashion editorial statement silhouette', scaleY: 1.3 }
];

// Nail embellishments & add-ons
const NAIL_EMBELLISHMENTS = [
  { id: 'swarovski-crystals', name: 'Micro Swarovski Crystals', desc: 'Precision handset crystals on accent fingers' },
  { id: 'chrome-pearl-dust', name: 'Chrome Glazed Pearl Dust', desc: 'Hand-buffed iridescent mirror dust' },
  { id: 'gold-foil-leaf', name: 'Gold Foil Leafing Accents', desc: 'Artisanal organic gold leaf fragments' },
  { id: '3d-pearl-charms', name: '3D Sculpted Charms', desc: 'Couture raised miniature floral / pearl accents' },
  { id: 'magnetic-cat-eye-bar', name: 'Velvet Cat-Eye Magnetic Shift', desc: 'Shifting 3D optical celestial light band' }
];

// Mehndi coverage options
const MEHNDI_COVERAGE_LEVELS = [
  { id: 'light', label: 'Light / Minimal', desc: 'Delicate whisper-fine lines, micro-florals & negative space' },
  { id: 'medium', label: 'Medium / Elegant', desc: 'Balanced floral bels, mandalas and wrist cuffs' },
  { id: 'intricate', label: 'Intricate / Royal Bridal', desc: 'Dense Marwari checks, storytelling motifs, peacock & jhumkas' }
];

// Mehndi placements
const MEHNDI_PLACEMENTS = [
  { id: 'palms-only', label: 'Palms Only (Both Hands)', desc: 'Sacred palm mandala and fingertip caps' },
  { id: 'both-hands-wrists', label: 'Both Hands (Palms & Back to Wrists)', desc: 'Complete front and back wrist coverage' },
  { id: 'both-hands-elbows', label: 'Both Hands (Palms & Forearms to Elbows)', desc: 'Extensive royal bridal & sangeet coverage' },
  { id: 'back-hand-fingers', label: 'Back-of-Hand & Fine Finger Lace', desc: 'Graceful modern jewelry glove trail' },
  { id: 'bridal-hands-feet', label: 'Full Bridal (Hands, Forearms & Feet)', desc: 'Traditional all-inclusive wedding ceremony coverage' },
  { id: 'feet-ankles', label: 'Bridal Feet & Ankle Payal Only', desc: 'Intricate feet mandalas and payal borders' }
];

// Hairstyle volume / texture preferences
const HAIR_VOLUME_TEXTURES = [
  { id: 'fine-airy', label: 'Featherweight / Airy Texture', desc: 'Root lift and weightless bounce for fine strands' },
  { id: 'balanced-medium', label: 'Balanced Natural Density', desc: 'Harmonious movement with silky cuticle alignment' },
  { id: 'coarse-high-volume', label: 'High-Volume / Full Body', desc: 'Controlled density with frizz-resistant thermal smoothing' },
  { id: 'curly-coily-bounce', label: 'Enhanced Curly / Coily Definition', desc: 'Moisture seal and sculpted curl cluster separation' }
];

export default function LiveStyleCustomizer({
  selectedService,
  styleConfig = {},
  onChange,
  onSave,
  onReset,
  onContinueToSummary,
  isSaving = false,
  saveNotice = null
}) {
  const previewRef = useRef(null);
  const hairSliderRef = useRef(null);

  // Active customizer mode based on current selected service category
  const serviceCategory = selectedService?.category || 'nails';

  const isNailService = serviceCategory === 'nails';
  const isHairColorService = serviceCategory === 'hair-color';
  const isHairCutOrStylingService = ['hair-cut', 'hairstyling', 'hair-treatments'].includes(serviceCategory);
  const isMehndiService = serviceCategory === 'henna';
  const isOtherService = !isNailService && !isHairColorService && !isHairCutOrStylingService && !isMehndiService;

  // ---------------------------------------------------------------------------
  // 1. NAIL STATE & SELECTIONS
  // ---------------------------------------------------------------------------
  const currentNailShapeId = styleConfig.nailShapeId || 'almond';
  const currentNailColorHex = styleConfig.nailColorHex || '#263D2B';
  const currentNailColorName = styleConfig.nailColorName || 'Forest Green';
  const currentNailFinishId = styleConfig.nailFinishId || 'glossy';
  const currentNailArtId = styleConfig.nailArtId || 'none';
  const currentNailLengthId = styleConfig.nailLengthId || 'medium';
  const currentNailEmbellishments = styleConfig.nailEmbellishments || [];

  const activeNailShape = useMemo(() => {
    return NAIL_SHAPES.find(s => s.id === currentNailShapeId) || NAIL_SHAPES[4]; // Default Almond
  }, [currentNailShapeId]);

  const activeNailFinish = useMemo(() => {
    return NAIL_FINISHES.find(f => f.id === currentNailFinishId) || NAIL_FINISHES[0];
  }, [currentNailFinishId]);

  const activeNailArt = useMemo(() => {
    return NAIL_ART_OPTIONS.find(a => a.id === currentNailArtId) || NAIL_ART_OPTIONS[0];
  }, [currentNailArtId]);

  const activeNailLength = useMemo(() => {
    return NAIL_LENGTHS.find(l => l.id === currentNailLengthId) || NAIL_LENGTHS[1];
  }, [currentNailLengthId]);

  // ---------------------------------------------------------------------------
  // 2. HAIR COLOUR STATE & SELECTIONS
  // ---------------------------------------------------------------------------
  const activeModel = CUSTOMIZER_MODELS[0];
  const currentHairCategory = styleConfig.hairShadeCategory || 'all';
  const currentHairShadeId = styleConfig.hairShadeId || 'chocolate-brown';
  const currentHairCustomHex = styleConfig.hairCustomHex || '#263D2B';
  const isHairCustomActive = Boolean(styleConfig.isHairCustomActive);
  const hairIntensity = typeof styleConfig.hairIntensity === 'number' ? styleConfig.hairIntensity : 90;
  const hairFinishId = styleConfig.hairFinishId || 'gloss';
  const hairTechnique = styleConfig.hairTechnique || 'Balayage Hand-Painting';

  const [hairSliderPos, setHairSliderPos] = useState(100); // 100 = full preview, 50 = split
  const [isHairDragging, setIsHairDragging] = useState(false);
  const [isOriginalHairView, setIsOriginalHairView] = useState(false);

  const activeHairShade = useMemo(() => {
    return COMPLETE_HAIR_SHADES.find(s => s.id === currentHairShadeId) || COMPLETE_HAIR_SHADES[0];
  }, [currentHairShadeId]);

  const activeHairFinish = useMemo(() => {
    return HAIR_FINISHES.find(f => f.id === hairFinishId) || HAIR_FINISHES[0];
  }, [hairFinishId]);

  const activeHairHex = isHairCustomActive ? currentHairCustomHex : activeHairShade.hex;

  // Filtered hair shades
  const filteredHairShades = useMemo(() => {
    if (currentHairCategory === 'all') return COMPLETE_HAIR_SHADES;
    return COMPLETE_HAIR_SHADES.filter(s => s.category === currentHairCategory);
  }, [currentHairCategory]);

  // Comparison slider mouse/touch tracking
  const handleSliderMove = useCallback((clientX) => {
    if (!hairSliderRef.current) return;
    const rect = hairSliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setHairSliderPos(percent);
  }, []);

  useEffect(() => {
    if (!isHairDragging) return;
    const onMouseMove = (e) => handleSliderMove(e.clientX);
    const onTouchMove = (e) => {
      if (e.touches[0]) handleSliderMove(e.touches[0].clientX);
    };
    const onEnd = () => setIsHairDragging(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onEnd);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isHairDragging, handleSliderMove]);

  // ---------------------------------------------------------------------------
  // 3. HAIRSTYLE & CUT STATE & SELECTIONS
  // ---------------------------------------------------------------------------
  const currentHairstyle = styleConfig.hairstyle || 'Signature Voluminous Blowout';
  const currentHairLength = styleConfig.hairLength || 'Shoulder Length';
  const currentHairStyling = styleConfig.hairStyling || 'Voluminous Bouncy Curls';
  const currentHairVolume = styleConfig.hairVolume || 'Balanced Natural Density';

  // ---------------------------------------------------------------------------
  // 4. MEHNDI STATE & SELECTIONS
  // ---------------------------------------------------------------------------
  const currentMehndiDesignId = styleConfig.mehndiDesignId || MEHNDI_SERVICE_CARDS[0].id;
  const currentMehndiPlacement = styleConfig.mehndiPlacement || 'both-hands-wrists';
  const currentMehndiCoverage = styleConfig.mehndiCoverage || 'medium';
  const [mehndiFilter, setMehndiFilter] = useState('all');

  const activeMehndiDesign = useMemo(() => {
    return MEHNDI_SERVICE_CARDS.find(m => m.id === currentMehndiDesignId) || MEHNDI_SERVICE_CARDS[0];
  }, [currentMehndiDesignId]);

  const filteredMehndiCards = useMemo(() => {
    if (mehndiFilter === 'all') return MEHNDI_SERVICE_CARDS;
    if (mehndiFilter === 'bridal') return MEHNDI_SERVICE_CARDS.filter(m => m.id.includes('bridal') || m.orientation === 'bridal-full');
    if (mehndiFilter === 'arabic') return MEHNDI_SERVICE_CARDS.filter(m => m.id.includes('arabic'));
    if (mehndiFilter === 'traditional') return MEHNDI_SERVICE_CARDS.filter(m => m.id.includes('traditional') || m.id.includes('party'));
    if (mehndiFilter === 'minimal') return MEHNDI_SERVICE_CARDS.filter(m => m.id.includes('minimal') || m.id.includes('classic'));
    return MEHNDI_SERVICE_CARDS;
  }, [mehndiFilter]);

  // ---------------------------------------------------------------------------
  // 5. OTHER SERVICES STATE (Facial, Makeup, Threading, Waxing, Massage, Lashes)
  // ---------------------------------------------------------------------------
  const currentSkinPriority = styleConfig.skinPriority || 'Intense Cellular Hydration';
  const currentSkinSensitivity = styleConfig.skinSensitivity || 'No Known Sensitivities';
  const currentMakeupLook = styleConfig.makeupLook || 'Royal Traditional Bridal Glam';
  const currentMakeupOccasion = styleConfig.makeupOccasion || 'Bridal Wedding Ceremony';
  const currentThreadingArea = styleConfig.threadingArea || 'Eyebrows Only';
  const currentThreadingShaping = styleConfig.threadingShaping || 'Natural Full Arch';
  const currentWaxingArea = styleConfig.waxingArea || 'Facial Waxing (Brows, Lip, Chin)';
  const currentWaxingComfort = styleConfig.waxingComfort || 'Ultra-Gentle Stripless Italian Wax';
  const currentMassagePressure = styleConfig.massagePressure || 'Medium Restorative Pressure';
  const currentMassageFocus = styleConfig.massageFocus || 'Scalp, Neck & Shoulder Focus';
  const currentLashStyle = styleConfig.lashStyle || 'Natural Classic Set';
  const currentLashCurl = styleConfig.lashCurl || 'C-Curl (Natural Lift)';

  // ---------------------------------------------------------------------------
  // ACTION HANDLERS
  // ---------------------------------------------------------------------------
  const updateStyleField = (key, value) => {
    if (onChange) {
      onChange({
        ...styleConfig,
        [key]: value
      });
    }
  };

  const updateMultipleFields = (fields) => {
    if (onChange) {
      onChange({
        ...styleConfig,
        ...fields
      });
    }
  };

  // Preview My Style (scrolls to preview panel and adds pulse highlight)
  const handlePreviewMyStyle = () => {
    if (previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      previewRef.current.classList.add('ring-4', 'ring-[#263D2B]', 'ring-offset-2');
      setTimeout(() => {
        if (previewRef.current) {
          previewRef.current.classList.remove('ring-4', 'ring-[#263D2B]', 'ring-offset-2');
        }
      }, 1500);
    }
  };

  // Reset Customizer to initial defaults
  const handleResetCustomizer = () => {
    if (onReset) {
      onReset();
    }
  };

  return (
    <div
      id="live-style-customizer-section"
      className="pt-6 border-t border-[#DCE1D8] space-y-8"
      aria-label="Live Style Customizer Workspace"
    >
      {/* --------------------------------------------------------------------- */}
      {/* SECTION HEADER                                                        */}
      {/* --------------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#DCE1D8]">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#263D2B] text-[#F7F4ED] text-[11px] font-bold uppercase tracking-[0.2em] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#A8B5A0]" />
            <span>Interactive Bespoke Studio</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif text-[#10110F] font-normal">
            Live Style Customizer
          </h3>

          <p className="text-xs sm:text-sm text-[#465640] max-w-2xl font-serif italic">
            “Explore your style, personalize every detail, and preview your beauty vision before submitting your request.”
          </p>

          <p className="text-xs text-[#6B7068]">
            Selected Department:{' '}
            <strong className="text-[#263D2B] font-semibold">
              {selectedService?.categoryName || selectedService?.category || 'Salon Service'}
            </strong>{' '}
            • Service:{' '}
            <strong className="text-[#10110F] font-semibold">
              {selectedService?.name}
            </strong>
          </p>
        </div>

        {/* Global Action Button Bar: Preview, Save, Reset */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            id="preview-my-style-btn"
            onClick={handlePreviewMyStyle}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#263D2B] text-[#263D2B] hover:bg-[#263D2B] hover:text-white text-xs font-semibold tracking-wide transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview My Style</span>
          </button>

          <button
            type="button"
            id="save-my-customization-btn"
            onClick={onSave}
            disabled={isSaving}
            className="px-4 py-2 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-[#F7F4ED] text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving...' : 'Save My Customization'}</span>
          </button>

          <button
            type="button"
            id="reset-customizer-btn"
            onClick={handleResetCustomizer}
            className="px-3 py-2 rounded-xl border border-[#DCE1D8] bg-white hover:bg-rose-50 hover:text-rose-700 text-[#6B7068] text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
            title="Reset this customizer to initial settings"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Save Notification Banner */}
      {saveNotice && (
        <div className="p-3.5 rounded-2xl bg-[#263D2B] text-[#F7F4ED] text-xs font-medium flex items-center justify-between gap-3 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#A8B5A0] shrink-0" />
            <span>{saveNotice}</span>
          </div>
          <span className="text-[11px] text-[#A8B5A0] italic">Saved to Draft &amp; Blueprint</span>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* CASE A: NAIL ART CUSTOMIZER                                           */}
      {/* --------------------------------------------------------------------- */}
      {isNailService && (
        <div className="space-y-8">
          {/* Main 2-Col Layout: Left Live 5-Finger SVG Preview | Right Interactive Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 1. LIVE 5-FINGER SVG VISUAL PREVIEW (5 COLS) */}
            <div
              ref={previewRef}
              className="lg:col-span-5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm transition-all duration-300"
            >
              <div className="flex items-center justify-between border-b border-[#DCE1D8] pb-3">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#263D2B]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                    Live 5-Finger Manicure Preview
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B] bg-[#263D2B]/10 px-2.5 py-0.5 rounded-full">
                  Real-time SVG
                </span>
              </div>

              {/* 5-Finger Manicure Studio Canvas */}
              <div className="relative py-8 px-2 bg-gradient-to-b from-white to-[#F7F4ED] rounded-2xl border border-[#DCE1D8] flex items-end justify-center min-h-[300px] overflow-hidden select-none">
                
                {/* 5 Fingers Rendered Side-by-Side */}
                <div className="flex items-end justify-center gap-2 sm:gap-3.5 z-10">
                  {FINGERS_CONFIG.map((finger) => {
                    const scaledHeight = finger.height * (activeNailLength.scaleY || 1.0);
                    return (
                      <div
                        key={finger.id}
                        className="flex flex-col items-center group transition-transform duration-300"
                        style={{
                          transform: `rotate(${finger.tilt}deg)`
                        }}
                      >
                        <div
                          className="relative filter drop-shadow-sm transition-all duration-300"
                          style={{
                            width: `${finger.width}px`,
                            height: `${scaledHeight}px`
                          }}
                        >
                          <svg
                            viewBox="0 0 100 160"
                            className="w-full h-full overflow-visible"
                          >
                            <defs>
                              {/* Base Nail Clip Mask */}
                              <clipPath id={`studio-nail-clip-${finger.id}`}>
                                <path d={activeNailShape.path} />
                              </clipPath>

                              {/* Nail Base Gradient */}
                              <linearGradient id={`studio-nail-base-${finger.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={activeNailColorHex} />
                                <stop offset="70%" stopColor={activeNailColorHex} />
                                <stop offset="100%" stopColor="#10110F" stopOpacity="0.8" />
                              </linearGradient>

                              {/* French Smile Line Tip Gradient */}
                              <linearGradient id={`studio-french-smile-${finger.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#FFFFFF" />
                                <stop offset="85%" stopColor="#F7F4ED" />
                                <stop offset="100%" stopColor="#DCE1D8" />
                              </linearGradient>

                              {/* Specular Highlight Shine */}
                              <linearGradient id={`studio-gloss-shine-${finger.id}`} x1="15%" y1="0%" x2="65%" y2="100%">
                                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                                <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.3" />
                                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.0" />
                              </linearGradient>

                              {/* Chrome Mirror Gradient */}
                              <linearGradient id={`studio-chrome-grad-${finger.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                                <stop offset="25%" stopColor="#C0C0C0" stopOpacity="0.3" />
                                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
                                <stop offset="75%" stopColor="#808080" stopOpacity="0.25" />
                                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.7" />
                              </linearGradient>

                              {/* Cat-Eye Magnetic Beam */}
                              <linearGradient id={`studio-cat-eye-beam-${finger.id}`} x1="0%" y1="30%" x2="100%" y2="70%">
                                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                                <stop offset="40%" stopColor="#A8B5A0" stopOpacity="0.2" />
                                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
                                <stop offset="60%" stopColor="#A8B5A0" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                              </linearGradient>

                              {/* Pearl Iridescence */}
                              <linearGradient id={`studio-pearl-glaze-${finger.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFE4E1" stopOpacity="0.45" />
                                <stop offset="50%" stopColor="#F0FFF0" stopOpacity="0.35" />
                                <stop offset="100%" stopColor="#FFF0F5" stopOpacity="0.5" />
                              </linearGradient>
                            </defs>

                            {/* Fingertip Bed Cushion (Behind Nail) */}
                            <path
                              d="M 12 150 C 12 165, 88 165, 88 150 L 88 80 C 88 50, 12 50, 12 80 Z"
                              fill="#E8D7CA"
                              stroke="#D4B89C"
                              strokeWidth="1"
                              opacity="0.8"
                            />

                            {/* Cuticle Fold Shadow */}
                            <path
                              d="M 18 150 C 18 160, 82 160, 82 150"
                              stroke="#8B6B58"
                              strokeWidth="3"
                              strokeLinecap="round"
                              fill="none"
                              opacity="0.35"
                            />

                            {/* LAYER 1: BASE NAIL COLOR & SHAPE */}
                            <path
                              d={activeNailShape.path}
                              fill={`url(#studio-nail-base-${finger.id})`}
                              stroke="#10110F"
                              strokeWidth="1.2"
                              className="transition-all duration-300"
                            />

                            {/* LAYER 2: FRENCH TIPS OVERLAY */}
                            {(activeNailFinish.id === 'french-tips' || activeNailArt.id === 'french-tips') && (
                              <g clipPath={`url(#studio-nail-clip-${finger.id})`}>
                                <path
                                  d={`M 15 ${activeNailShape.accentTipHeight || 40} Q 50 ${((activeNailShape.accentTipHeight || 40) + 15)} 85 ${activeNailShape.accentTipHeight || 40} L 85 0 L 15 0 Z`}
                                  fill={`url(#studio-french-smile-${finger.id})`}
                                  stroke="#E8E2D8"
                                  strokeWidth="0.5"
                                />
                              </g>
                            )}

                            {/* LAYER 3: FINISH OVERLAYS */}
                            {activeNailFinish.id === 'glossy' && (
                              <g clipPath={`url(#studio-nail-clip-${finger.id})`}>
                                <path
                                  d="M 22 140 C 22 50, 32 30, 48 20 C 42 28, 32 60, 32 140 Z"
                                  fill={`url(#studio-gloss-shine-${finger.id})`}
                                />
                              </g>
                            )}

                            {activeNailFinish.id === 'matte' && (
                              <g clipPath={`url(#studio-nail-clip-${finger.id})`}>
                                <rect x="0" y="0" width="100" height="160" fill="#FFFFFF" opacity="0.08" />
                                <path
                                  d={activeNailShape.path}
                                  stroke="#FFFFFF"
                                  strokeWidth="1"
                                  strokeOpacity="0.25"
                                  fill="none"
                                />
                              </g>
                            )}

                            {activeNailFinish.id === 'chrome' && (
                              <g clipPath={`url(#studio-nail-clip-${finger.id})`}>
                                <rect x="0" y="0" width="100" height="160" fill={`url(#studio-chrome-grad-${finger.id})`} opacity="0.65" />
                                <path
                                  d="M 18 130 Q 50 15 82 130"
                                  stroke="#FFFFFF"
                                  strokeWidth="1.5"
                                  fill="none"
                                  opacity="0.8"
                                />
                              </g>
                            )}

                            {activeNailFinish.id === 'glitter' && (
                              <g clipPath={`url(#studio-nail-clip-${finger.id})`}>
                                <circle cx="35" cy="45" r="2" fill="#FFFFFF" opacity="0.9" />
                                <circle cx="50" cy="35" r="1.5" fill="#FFFFFF" opacity="0.95" />
                                <circle cx="65" cy="50" r="2.5" fill="#FFFFFF" opacity="0.85" />
                                <circle cx="42" cy="70" r="1.5" fill="#FFFFFF" opacity="0.8" />
                                <circle cx="60" cy="80" r="2" fill="#FFFFFF" opacity="0.75" />
                                <circle cx="48" cy="105" r="1" fill="#FFFFFF" opacity="0.7" />
                                <circle cx="38" cy="120" r="1.5" fill="#FFFFFF" opacity="0.6" />
                              </g>
                            )}

                            {activeNailFinish.id === 'pearl' && (
                              <g clipPath={`url(#studio-nail-clip-${finger.id})`}>
                                <rect x="0" y="0" width="100" height="160" fill={`url(#studio-pearl-glaze-${finger.id})`} />
                                <ellipse cx="50" cy="50" rx="30" ry="40" fill="#FFFFFF" opacity="0.25" />
                              </g>
                            )}

                            {activeNailFinish.id === 'cat-eye' && (
                              <g clipPath={`url(#studio-nail-clip-${finger.id})`}>
                                <rect x="0" y="0" width="100" height="160" fill={`url(#studio-cat-eye-beam-${finger.id})`} />
                                <line x1="20" y1="120" x2="80" y2="40" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
                              </g>
                            )}

                            {/* LAYER 4: NAIL ART PATTERNS */}
                            {activeNailArt.id === 'minimal-lines' && (
                              <g clipPath={`url(#studio-nail-clip-${finger.id})`}>
                                <line x1="50" y1="20" x2="50" y2="150" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.8" />
                                <circle cx="50" cy="35" r="2" fill="#FFFFFF" />
                              </g>
                            )}

                            {activeNailArt.id === 'floral-art' && (
                              <g clipPath={`url(#studio-nail-clip-${finger.id})`}>
                                <g transform="translate(40, 110)">
                                  <circle cx="10" cy="10" r="3" fill="#FFFFFF" opacity="0.9" />
                                  <circle cx="6" cy="7" r="2.5" fill="#A8B5A0" opacity="0.85" />
                                  <circle cx="14" cy="7" r="2.5" fill="#A8B5A0" opacity="0.85" />
                                  <circle cx="7" cy="14" r="2.5" fill="#A8B5A0" opacity="0.85" />
                                  <circle cx="13" cy="14" r="2.5" fill="#A8B5A0" opacity="0.85" />
                                </g>
                              </g>
                            )}

                            {activeNailArt.id === 'glitter-accent' && finger.isAccent && (
                              <g clipPath={`url(#studio-nail-clip-${finger.id})`}>
                                <circle cx="50" cy="40" r="3" fill="#FFFFFF" opacity="0.95" />
                                <circle cx="40" cy="50" r="2" fill="#FFFFFF" opacity="0.9" />
                                <circle cx="60" cy="55" r="2" fill="#FFFFFF" opacity="0.9" />
                                <circle cx="48" cy="70" r="1.5" fill="#FFFFFF" opacity="0.8" />
                              </g>
                            )}

                            {activeNailArt.id === 'geometric' && (
                              <g clipPath={`url(#studio-nail-clip-${finger.id})`}>
                                <line x1="20" y1="50" x2="80" y2="80" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.75" />
                                <line x1="80" y1="50" x2="20" y2="80" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.75" />
                              </g>
                            )}

                            {activeNailArt.id === 'marble' && (
                              <g clipPath={`url(#studio-nail-clip-${finger.id})`}>
                                <path
                                  d="M 25 40 Q 40 60 35 90 T 55 135"
                                  stroke="#FFFFFF"
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  fill="none"
                                  opacity="0.55"
                                />
                              </g>
                            )}

                            {activeNailArt.id === 'abstract' && (
                              <g clipPath={`url(#studio-nail-clip-${finger.id})`}>
                                <path
                                  d="M 30 30 Q 60 50 40 90 T 70 130"
                                  stroke="#A8B5A0"
                                  strokeWidth="3.5"
                                  strokeLinecap="round"
                                  fill="none"
                                  opacity="0.6"
                                />
                                <circle cx="60" cy="50" r="5" fill="#263D2B" opacity="0.7" />
                              </g>
                            )}

                            {/* Free Edge Tip Highlight */}
                            <path
                              d={activeNailShape.tipHighlightPath}
                              stroke="#FFFFFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              opacity="0.8"
                            />
                          </svg>
                        </div>

                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] mt-1.5 opacity-80">
                          {finger.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Real-time Chosen Configuration Summary Pill Strip */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#DCE1D8] space-y-2 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#465640] block">
                  Active Nail Specification
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-[#6B7068]">Shape:</span>{' '}
                    <strong className="text-[#10110F]">{activeNailShape.name}</strong>
                  </div>
                  <div>
                    <span className="text-[#6B7068]">Finish:</span>{' '}
                    <strong className="text-[#10110F]">{activeNailFinish.name}</strong>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#6B7068]">Colour:</span>
                    <span
                      className="w-3 h-3 rounded-full border border-black/20 shrink-0"
                      style={{ backgroundColor: activeNailColorHex }}
                    />
                    <strong className="text-[#10110F] truncate">{currentNailColorName}</strong>
                  </div>
                  <div>
                    <span className="text-[#6B7068]">Artwork:</span>{' '}
                    <strong className="text-[#10110F]">{activeNailArt.name}</strong>
                  </div>
                  <div>
                    <span className="text-[#6B7068]">Length:</span>{' '}
                    <strong className="text-[#10110F]">{activeNailLength.label}</strong>
                  </div>
                  <div>
                    <span className="text-[#6B7068]">Add-ons:</span>{' '}
                    <strong className="text-[#263D2B]">
                      {currentNailEmbellishments.length ? `${currentNailEmbellishments.length} selected` : 'None'}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. INTERACTIVE CONTROLS TABS & PANELS (7 COLS) */}
            <div className="lg:col-span-7 space-y-6">

              {/* Control 1: Nail Shapes (Square, Squoval, Round, Oval, Almond, Coffin, Stiletto) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] flex items-center gap-1.5">
                    <span>1. Nail Silhouette Shape</span>
                    <span className="text-[#263D2B]">*</span>
                  </label>
                  <span className="text-xs font-semibold text-[#263D2B]">
                    Current: {activeNailShape.name}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2.5">
                  {NAIL_SHAPES.map((shape) => {
                    const isSelected = activeNailShape.id === shape.id;
                    return (
                      <button
                        key={shape.id}
                        type="button"
                        onClick={() => updateStyleField('nailShapeId', shape.id)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                            : 'bg-white hover:bg-[#F7F4ED] text-[#10110F] border-[#DCE1D8]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-xs tracking-tight">
                            {shape.name}
                          </span>
                          {isSelected && (
                            <span className="w-4 h-4 rounded-full bg-white text-[#263D2B] flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <p className={`text-[10px] leading-tight line-clamp-2 ${isSelected ? 'text-[#F7F4ED]/80' : 'text-[#6B7068]'}`}>
                          {shape.subtitle}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Control 2: Length Preference */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                  2. Desired Nail Length
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {NAIL_LENGTHS.map((len) => {
                    const isSelected = currentNailLengthId === len.id;
                    return (
                      <button
                        key={len.id}
                        type="button"
                        onClick={() => updateStyleField('nailLengthId', len.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#263D2B] text-white border-[#263D2B]'
                            : 'bg-white hover:bg-[#F7F4ED] text-[#10110F] border-[#DCE1D8]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">{len.label}</span>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-[#F7F4ED]/80' : 'text-[#6B7068]'}`}>
                          {len.desc.split('(')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Control 3: Nail Colours Swatches + Custom Hex */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                    3. Colour Palette &amp; Custom Swatch
                  </label>
                  <span className="text-xs font-semibold text-[#263D2B]">
                    {currentNailColorName}
                  </span>
                </div>

                {/* Swatch Grid */}
                <div className="grid grid-cols-5 sm:grid-cols-5 gap-2.5">
                  {NAIL_COLORS.map((color) => {
                    const isSelected = activeNailColorHex.toLowerCase() === color.hex.toLowerCase();
                    return (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => {
                          updateMultipleFields({
                            nailColorHex: color.hex,
                            nailColorName: color.name
                          });
                        }}
                        className={`p-2 rounded-xl border transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                          isSelected
                            ? 'border-[#263D2B] ring-2 ring-[#263D2B] bg-[#263D2B]/5'
                            : 'border-[#DCE1D8] bg-white hover:border-[#A8B5A0]'
                        }`}
                        title={color.name}
                      >
                        <span
                          className="w-8 h-8 rounded-full border border-black/15 shadow-2xs relative flex items-center justify-center shrink-0"
                          style={{ backgroundColor: color.hex }}
                        >
                          {isSelected && (
                            <Check
                              className={`w-4 h-4 stroke-[3] ${
                                color.textTone === 'light' ? 'text-white' : 'text-[#10110F]'
                              }`}
                            />
                          )}
                        </span>
                        <span className="text-[10px] font-semibold text-[#10110F] text-center truncate max-w-full">
                          {color.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Colour Picker Input */}
                <div className="p-3 rounded-2xl bg-white border border-[#DCE1D8] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#10110F]">Mix Custom Polish Tone:</span>
                    <span className="text-[11px] text-[#6B7068]">Select any specific shade</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={activeNailColorHex}
                      onChange={(e) => {
                        updateMultipleFields({
                          nailColorHex: e.target.value,
                          nailColorName: `Custom (${e.target.value.toUpperCase()})`
                        });
                      }}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-[#DCE1D8]"
                      title="Choose custom nail polish color"
                    />
                    <span className="font-mono text-xs font-semibold text-[#263D2B]">
                      {activeNailColorHex.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Control 4: Finishes (Glossy, Matte, Chrome, Glitter, Pearl, Cat-Eye) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                    4. Topcoat Finish
                  </label>
                  <span className="text-xs font-semibold text-[#263D2B]">
                    {activeNailFinish.name}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {NAIL_FINISHES.map((finish) => {
                    const isSelected = activeNailFinish.id === finish.id;
                    return (
                      <button
                        key={finish.id}
                        type="button"
                        onClick={() => updateStyleField('nailFinishId', finish.id)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                            : 'bg-white hover:bg-[#F7F4ED] text-[#10110F] border-[#DCE1D8]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-xs">{finish.name}</span>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={`text-[10px] leading-tight ${isSelected ? 'text-[#F7F4ED]/80' : 'text-[#6B7068]'}`}>
                          {finish.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Control 5: Nail Design Patterns & Artwork */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                    5. Nail Design Patterns &amp; Artwork
                  </label>
                  <span className="text-xs font-semibold text-[#263D2B]">
                    {activeNailArt.name}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {NAIL_ART_OPTIONS.map((art) => {
                    const isSelected = activeNailArt.id === art.id;
                    return (
                      <button
                        key={art.id}
                        type="button"
                        onClick={() => updateStyleField('nailArtId', art.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#263D2B] text-white border-[#263D2B]'
                            : 'bg-white hover:bg-[#F7F4ED] text-[#10110F] border-[#DCE1D8]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold">{art.name}</span>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={`text-[10px] block mt-0.5 line-clamp-1 ${isSelected ? 'text-[#F7F4ED]/80' : 'text-[#6B7068]'}`}>
                          {art.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Control 6: Embellishments & Add-ons */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                  6. Embellishments &amp; Crystal Accents (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {NAIL_EMBELLISHMENTS.map((emb) => {
                    const isSelected = currentNailEmbellishments.includes(emb.id);
                    return (
                      <div
                        key={emb.id}
                        onClick={() => {
                          const updated = isSelected
                            ? currentNailEmbellishments.filter(id => id !== emb.id)
                            : [...currentNailEmbellishments, emb.id];
                          updateStyleField('nailEmbellishments', updated);
                        }}
                        className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#263D2B]/10 border-[#263D2B] text-[#263D2B]'
                            : 'bg-white hover:bg-[#F7F4ED] border-[#DCE1D8] text-[#10110F]'
                        }`}
                      >
                        <div>
                          <span className="text-xs font-semibold block">{emb.name}</span>
                          <span className="text-[10px] text-[#6B7068] block">{emb.desc}</span>
                        </div>
                        <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-[#263D2B] text-white' : 'border border-[#DCE1D8] bg-white'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* CASE B: HAIR COLOUR CUSTOMIZER                                        */}
      {/* --------------------------------------------------------------------- */}
      {isHairColorService && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 1. VIRTUAL HAIR COLOUR PREVIEW CANVAS (5 COLS) */}
            <div
              ref={previewRef}
              className="lg:col-span-5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-3xl p-5 space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-[#DCE1D8] pb-3">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#263D2B]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                    Virtual Hair Colour Simulation
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B] bg-[#263D2B]/10 px-2.5 py-0.5 rounded-full">
                  Photorealistic Studio Portrait
                </span>
              </div>

              {/* The Live Interactive Model Preview Card */}
              <div
                ref={hairSliderRef}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#10110F] shadow-md select-none group border border-[#DCE1D8]"
              >
                {/* Layer 1: Base Original Photograph of the Model */}
                <img
                  src={activeModel.image}
                  alt={`${activeModel.name} - Hair Portrait`}
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />

                {/* Layer 2: The Hair-Masked Recoloured Layer */}
                {!isOriginalHairView && (
                  <div
                    className="absolute inset-0 overflow-hidden pointer-events-none transition-all duration-200"
                    style={{
                      clipPath: `polygon(0 0, ${hairSliderPos}% 0, ${hairSliderPos}% 100%, 0 100%)`
                    }}
                  >
                    {!isHairCustomActive && activeHairShade.variantImage ? (
                      <img
                        src={activeHairShade.variantImage}
                        alt={`${activeHairShade.name} Live Hair Preview`}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ opacity: hairIntensity / 100 }}
                        draggable={false}
                      />
                    ) : (
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          WebkitMaskImage: `url('/images/hair/model-customizer-hair-mask-alpha.png')`,
                          maskImage: `url('/images/hair/model-customizer-hair-mask-alpha.png')`,
                          WebkitMaskSize: 'cover',
                          maskSize: 'cover',
                          WebkitMaskPosition: 'center',
                          maskPosition: 'center',
                          WebkitMaskRepeat: 'no-repeat',
                          maskRepeat: 'no-repeat',
                        }}
                      >
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundColor: activeHairHex,
                            mixBlendMode: 'multiply',
                            opacity: (hairIntensity / 100) * 0.95
                          }}
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundColor: activeHairHex,
                            mixBlendMode: activeHairFinish.blendMode || 'overlay',
                            opacity: (hairIntensity / 100) * (activeHairFinish.opacity || 0.7)
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Layer 3: Before / After Draggable Divider Line */}
                {hairSliderPos > 0 && hairSliderPos < 100 && (
                  <div
                    className="absolute top-0 bottom-0 z-20 flex items-center justify-center cursor-ew-resize pointer-events-auto"
                    style={{ left: `${hairSliderPos}%` }}
                    onMouseDown={() => setIsHairDragging(true)}
                    onTouchStart={() => setIsHairDragging(true)}
                  >
                    <div className="w-0.5 h-full bg-white shadow-[0_0_8px_rgba(0,0,0,0.6)]" />
                    <div className="absolute w-7 h-7 rounded-full bg-white text-[#263D2B] shadow-lg flex items-center justify-center border-2 border-[#263D2B] cursor-ew-resize">
                      <SplitSquareVertical className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}

                {/* Top Badge: Customized Shade */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider text-white border border-white/20">
                    <span className="w-2.5 h-2.5 rounded-full border border-white/40" style={{ backgroundColor: activeHairHex }} />
                    <span>{isHairCustomActive ? `CUSTOM (${currentHairCustomHex})` : activeHairShade.name}</span>
                  </span>
                </div>

                {/* Bottom Toggle Pill */}
                <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs text-white">
                  <button
                    type="button"
                    onClick={() => setIsOriginalHairView(!isOriginalHairView)}
                    className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs hover:bg-black text-[10px] font-medium border border-white/20"
                  >
                    {isOriginalHairView ? 'Show Custom Shade' : 'Hold to View Natural Base'}
                  </button>
                  <span className="text-[10px] bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-xs">
                    Technique: {hairTechnique}
                  </span>
                </div>
              </div>

              {/* Slider for Split Compare */}
              <div className="p-3 bg-white rounded-xl border border-[#DCE1D8] space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[11px] text-[#465640]">
                  <span>Before / After Split: <strong>{hairSliderPos}%</strong></span>
                  <button
                    type="button"
                    onClick={() => setHairSliderPos(hairSliderPos === 100 ? 50 : 100)}
                    className="text-[#263D2B] font-semibold underline text-[10px]"
                  >
                    {hairSliderPos === 100 ? 'Split 50/50' : 'Full 100%'}
                  </button>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={hairSliderPos}
                  onChange={(e) => setHairSliderPos(Number(e.target.value))}
                  className="w-full accent-[#263D2B] cursor-pointer"
                />
              </div>

              {/* Note on realism */}
              <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/60 text-[11px] text-amber-900 flex items-center gap-2">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Simulation reference only. In-salon consultation evaluates natural pigment, porosity, and lift level.</span>
              </div>
            </div>

            {/* 2. HAIR CONTROLS & PALETTE (7 COLS) */}
            <div className="lg:col-span-7 space-y-6">

              {/* Category Filter Pills */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                  1. Hair Shade Families
                </label>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {HAIR_SHADE_CATEGORIES.filter(c => c.id !== 'favourites').map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => updateStyleField('hairShadeCategory', cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                        currentHairCategory === cat.id
                          ? 'bg-[#263D2B] text-white shadow-xs'
                          : 'bg-white hover:bg-[#F7F4ED] text-[#465640] border border-[#DCE1D8]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shades Grid */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                    2. Select Artisan Shade
                  </span>
                  <span className="text-xs font-semibold text-[#263D2B]">
                    {isHairCustomActive ? 'Custom Formulation' : activeHairShade.name}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-64 overflow-y-auto pr-1">
                  {filteredHairShades.map((shade) => {
                    const isSelected = !isHairCustomActive && activeHairShade.id === shade.id;
                    return (
                      <button
                        key={shade.id}
                        type="button"
                        onClick={() => {
                          updateMultipleFields({
                            hairShadeId: shade.id,
                            isHairCustomActive: false
                          });
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                          isSelected
                            ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                            : 'bg-white hover:bg-[#F7F4ED] text-[#10110F] border-[#DCE1D8]'
                        }`}
                      >
                        <span
                          className="w-7 h-7 rounded-full border border-black/20 shadow-2xs shrink-0 flex items-center justify-center"
                          style={{ backgroundColor: shade.hex }}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                        </span>
                        <div className="min-w-0">
                          <span className="font-semibold text-xs block truncate">{shade.name}</span>
                          <span className={`text-[10px] block truncate ${isSelected ? 'text-[#F7F4ED]/80' : 'text-[#6B7068]'}`}>
                            {shade.undertone || shade.formula || 'Refined tone'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Color Picker for Hair */}
              <div className="p-3 rounded-2xl bg-white border border-[#DCE1D8] flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-[#10110F] block">Or Formulate Custom Shade:</span>
                  <span className="text-[11px] text-[#6B7068]">Use custom RGB/HEX tone</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={activeHairHex}
                    onChange={(e) => {
                      updateMultipleFields({
                        hairCustomHex: e.target.value,
                        isHairCustomActive: true
                      });
                    }}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-[#DCE1D8]"
                  />
                  <span className="font-mono text-xs font-semibold text-[#263D2B]">
                    {activeHairHex.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Technique Selector */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                  3. Colour Application Technique
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {HAIR_COLOUR_OPTIONS.techniques.map((tech) => {
                    const isSelected = hairTechnique === tech.label;
                    return (
                      <button
                        key={tech.id}
                        type="button"
                        onClick={() => updateStyleField('hairTechnique', tech.label)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#263D2B] text-white border-[#263D2B]'
                            : 'bg-white hover:bg-[#F7F4ED] text-[#10110F] border-[#DCE1D8]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">{tech.label}</span>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={`text-[10px] block mt-0.5 line-clamp-1 ${isSelected ? 'text-[#F7F4ED]/80' : 'text-[#6B7068]'}`}>
                          {tech.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Intensity Slider & Finish */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-white rounded-xl border border-[#DCE1D8] space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#10110F]">Colour Saturation</span>
                    <span className="font-semibold text-[#263D2B]">{hairIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={hairIntensity}
                    onChange={(e) => updateStyleField('hairIntensity', Number(e.target.value))}
                    className="w-full accent-[#263D2B] cursor-pointer"
                  />
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#DCE1D8] space-y-1.5">
                  <span className="font-bold text-xs text-[#10110F] block">Topcoat Luster Seal</span>
                  <div className="flex items-center gap-1.5">
                    {HAIR_FINISHES.map(f => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => updateStyleField('hairFinishId', f.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                          hairFinishId === f.id
                            ? 'bg-[#263D2B] text-white'
                            : 'bg-[#F7F4ED] text-[#465640] hover:bg-[#EBEFE8]'
                        }`}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* CASE C: HAIRCUT & HAIRSTYLING COUTURE CUSTOMIZER                      */}
      {/* --------------------------------------------------------------------- */}
      {isHairCutOrStylingService && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Visual Hairstyle Reference Card (5 cols) */}
            <div
              ref={previewRef}
              className="lg:col-span-5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-3xl p-5 space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-[#DCE1D8] pb-3">
                <div className="flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-[#263D2B]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                    Hairstyle &amp; Cut Visual Reference
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B] bg-[#263D2B]/10 px-2.5 py-0.5 rounded-full">
                  Illustrative Reference
                </span>
              </div>

              {/* Stylized Reference Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#10110F] shadow-sm border border-[#DCE1D8]">
                <img
                  src={selectedService.image || '/images/hair/signature-haircut.webp'}
                  alt={currentHairstyle}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8B5A0]">
                    Selected Styling Look
                  </span>
                  <h4 className="font-serif text-lg font-normal leading-snug">
                    {currentHairstyle}
                  </h4>
                  <span className="text-xs text-[#F7F4ED]/90 mt-0.5">
                    {currentHairLength} • {currentHairStyling}
                  </span>
                </div>
              </div>

              {/* Transparency Notice Distinguishing Simulation vs Illustrative Reference */}
              <div className="p-3 rounded-2xl bg-white border border-[#DCE1D8] text-xs text-[#465640] space-y-1">
                <div className="font-semibold text-[#10110F] flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#263D2B]" />
                  <span>Illustrative Hairstyle Reference</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#6B7068]">
                  This image serves as an aesthetic guide for your artist. All haircuts and styling finishes are hand-sculpted in our studio to match your face shape, hair density, and daily maintenance goals.
                </p>
              </div>
            </div>

            {/* Interactive Options (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Hairstyle Inspiration */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                  1. Hairstyle &amp; Silhouette Inspiration
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {HAIR_SERVICES_OPTIONS.hairstyles.map((style) => {
                    const isSelected = currentHairstyle === style.label;
                    return (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => updateStyleField('hairstyle', style.label)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                            : 'bg-white hover:bg-[#F7F4ED] text-[#10110F] border-[#DCE1D8]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs">{style.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-[#F7F4ED]/80' : 'text-[#6B7068]'}`}>
                          {style.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Length Preferences */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                  2. Current or Target Length
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                  {HAIR_SERVICES_OPTIONS.hairLengths.map((len) => {
                    const isSelected = currentHairLength === len.label;
                    return (
                      <button
                        key={len.id}
                        type="button"
                        onClick={() => updateStyleField('hairLength', len.label)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#263D2B] text-white border-[#263D2B]'
                            : 'bg-white hover:bg-[#F7F4ED] text-[#10110F] border-[#DCE1D8]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold">{len.label}</span>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={`text-[10px] block mt-0.5 line-clamp-1 ${isSelected ? 'text-[#F7F4ED]/80' : 'text-[#6B7068]'}`}>
                          {len.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Styling & Thermal Finish */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                  3. Styling Finish &amp; Thermal Work
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {HAIR_SERVICES_OPTIONS.stylingPreferences.map((pref) => {
                    const isSelected = currentHairStyling === pref.label;
                    return (
                      <button
                        key={pref.id}
                        type="button"
                        onClick={() => updateStyleField('hairStyling', pref.label)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#263D2B] text-white border-[#263D2B]'
                            : 'bg-white hover:bg-[#F7F4ED] text-[#10110F] border-[#DCE1D8]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold">{pref.label}</span>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={`text-[10px] block mt-0.5 line-clamp-1 ${isSelected ? 'text-[#F7F4ED]/80' : 'text-[#6B7068]'}`}>
                          {pref.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Volume & Texture */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                  4. Natural Density &amp; Volume Goal
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {HAIR_VOLUME_TEXTURES.map((vol) => {
                    const isSelected = currentHairVolume === vol.label;
                    return (
                      <button
                        key={vol.id}
                        type="button"
                        onClick={() => updateStyleField('hairVolume', vol.label)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#263D2B] text-white border-[#263D2B]'
                            : 'bg-white hover:bg-[#F7F4ED] text-[#10110F] border-[#DCE1D8]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold">{vol.label}</span>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={`text-[10px] block mt-0.5 line-clamp-1 ${isSelected ? 'text-[#F7F4ED]/80' : 'text-[#6B7068]'}`}>
                          {vol.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* CASE D: MEHNDI DESIGN STUDIO CUSTOMIZER                               */}
      {/* --------------------------------------------------------------------- */}
      {isMehndiService && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 1. LIVE MEHNDI DESIGN PREVIEW (5 COLS) */}
            <div
              ref={previewRef}
              className="lg:col-span-5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-3xl p-5 space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-[#DCE1D8] pb-3">
                <div className="flex items-center gap-2">
                  <Feather className="w-4 h-4 text-[#263D2B]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                    Organic Henna Visual Reference
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B] bg-[#263D2B]/10 px-2.5 py-0.5 rounded-full">
                  100% Organic Henna
                </span>
              </div>

              {/* Design Image Card */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#10110F] shadow-sm border border-[#DCE1D8]">
                <img
                  src={activeMehndiDesign.image}
                  alt={activeMehndiDesign.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8B5A0]">
                    {activeMehndiDesign.badge || 'HERITAGE ARTISTRY'}
                  </span>
                  <h4 className="font-serif text-lg font-normal leading-snug">
                    {activeMehndiDesign.name}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-[#F7F4ED]/90 mt-1">
                    <span>Baseline: ${activeMehndiDesign.numericPrice} CAD</span>
                    <span>{activeMehndiDesign.estimatedTime}</span>
                  </div>
                </div>
              </div>

              {/* Motifs & Details */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#DCE1D8] space-y-2 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#465640] block">
                  Artisanal Motifs &amp; Storytelling Elements
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(activeMehndiDesign.motifs || ['Peacock Motif', 'Lotus Bloom', 'Jaali Mesh']).map((m, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-[#F7F4ED] text-[#263D2B] text-[10px] font-semibold border border-[#DCE1D8]"
                    >
                      • {m}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#DCE1D8] text-[11px] text-[#6B7068] flex items-center justify-between">
                  <span>Coverage: <strong>{currentMehndiCoverage.toUpperCase()}</strong></span>
                  <span>Zero Chemicals or PPD</span>
                </div>
              </div>

              {/* Transparency Notice */}
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-900 flex items-center gap-2">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Base price and duration fixed. Final price subject to salon approval for custom wrist-to-elbow extensions.</span>
              </div>
            </div>

            {/* 2. MEHNDI DESIGN CATALOG & PLACEMENT SELECTION (7 COLS) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Filter Pills */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                    1. Choose from Authentic Mehndi Catalog
                  </label>
                  <span className="text-xs font-semibold text-[#263D2B]">
                    {activeMehndiDesign.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {MEHNDI_GALLERY_FILTERS.map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setMehndiFilter(f.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                        mehndiFilter === f.id
                          ? 'bg-[#263D2B] text-white shadow-xs'
                          : 'bg-white hover:bg-[#F7F4ED] text-[#465640] border border-[#DCE1D8]'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mehndi Designs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
                {filteredMehndiCards.map((mehndi) => {
                  const isSelected = activeMehndiDesign.id === mehndi.id;
                  return (
                    <button
                      key={mehndi.id}
                      type="button"
                      onClick={() => updateStyleField('mehndiDesignId', mehndi.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                          : 'bg-white hover:bg-[#F7F4ED] text-[#10110F] border-[#DCE1D8]'
                      }`}
                    >
                      <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-black/10 mb-2">
                        <img
                          src={mehndi.image}
                          alt={mehndi.name}
                          className="w-full h-full object-cover"
                        />
                        {isSelected && (
                          <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-white text-[#263D2B] flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="font-semibold text-xs block truncate">{mehndi.name}</span>
                        <span className={`text-[10px] block ${isSelected ? 'text-[#F7F4ED]/80' : 'text-[#6B7068]'}`}>
                          ${mehndi.numericPrice} CAD • {mehndi.estimatedTime}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Placement & Anatomical Zone */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                  2. Hand, Forearm or Foot Placement
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {MEHNDI_PLACEMENTS.map((place) => {
                    const isSelected = currentMehndiPlacement === place.id;
                    return (
                      <button
                        key={place.id}
                        type="button"
                        onClick={() => updateStyleField('mehndiPlacement', place.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#263D2B] text-white border-[#263D2B]'
                            : 'bg-white hover:bg-[#F7F4ED] text-[#10110F] border-[#DCE1D8]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold">{place.label}</span>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-[#F7F4ED]/80' : 'text-[#6B7068]'}`}>
                          {place.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Coverage Density */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                  3. Pattern Coverage &amp; Density
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {MEHNDI_COVERAGE_LEVELS.map((cov) => {
                    const isSelected = currentMehndiCoverage === cov.id;
                    return (
                      <button
                        key={cov.id}
                        type="button"
                        onClick={() => updateStyleField('mehndiCoverage', cov.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#263D2B] text-white border-[#263D2B]'
                            : 'bg-white hover:bg-[#F7F4ED] text-[#10110F] border-[#DCE1D8]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold">{cov.label.split('/')[0]}</span>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={`text-[10px] block mt-0.5 line-clamp-1 ${isSelected ? 'text-[#F7F4ED]/80' : 'text-[#6B7068]'}`}>
                          {cov.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* CASE E: OTHER SERVICE CUSTOMIZATIONS (Facial, Makeup, Threading, etc) */}
      {/* --------------------------------------------------------------------- */}
      {isOtherService && (
        <div className="space-y-6">
          <div className="p-5 rounded-3xl bg-white border border-[#DCE1D8] space-y-6 shadow-xs">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE1D8]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B]">
                  Bespoke Service Customization
                </span>
                <h4 className="font-serif text-lg text-[#10110F]">
                  Tailor Your {selectedService.name} Experience
                </h4>
              </div>
              <span className="text-xs font-semibold text-[#465640] bg-[#F7F4ED] px-3 py-1 rounded-full border border-[#DCE1D8]">
                Official Catalog: ${selectedService.price} CAD • {selectedService.duration}
              </span>
            </div>

            {/* Facial Controls */}
            {serviceCategory === 'facial' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                    Skin Care Priority
                  </label>
                  <div className="space-y-1.5">
                    {SKIN_CARE_OPTIONS.skinPreferences.slice(0, 4).map((p) => {
                      const isSelected = currentSkinPriority === p.label;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => updateStyleField('skinPriority', p.label)}
                          className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#263D2B] text-white border-[#263D2B]'
                              : 'bg-[#F7F4ED]/50 hover:bg-white text-[#10110F] border-[#DCE1D8]'
                          }`}
                        >
                          <span className="font-semibold">{p.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                    Skin Sensitivity Protocol
                  </label>
                  <div className="space-y-1.5">
                    {SKIN_CARE_OPTIONS.sensitivities.slice(0, 4).map((s) => {
                      const isSelected = currentSkinSensitivity === s.label;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => updateStyleField('skinSensitivity', s.label)}
                          className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#263D2B] text-white border-[#263D2B]'
                              : 'bg-[#F7F4ED]/50 hover:bg-white text-[#10110F] border-[#DCE1D8]'
                          }`}
                        >
                          <span className="font-semibold">{s.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Makeup Controls */}
            {serviceCategory === 'makeup' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                    Desired Makeup Aesthetic
                  </label>
                  <div className="space-y-1.5">
                    {MAKEUP_OPTIONS.looks.slice(0, 4).map((l) => {
                      const isSelected = currentMakeupLook === l.label;
                      return (
                        <button
                          key={l.id}
                          type="button"
                          onClick={() => updateStyleField('makeupLook', l.label)}
                          className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#263D2B] text-white border-[#263D2B]'
                              : 'bg-[#F7F4ED]/50 hover:bg-white text-[#10110F] border-[#DCE1D8]'
                          }`}
                        >
                          <span className="font-semibold">{l.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                    Event Photography &amp; Setting
                  </label>
                  <div className="space-y-1.5">
                    {MAKEUP_OPTIONS.occasions.slice(0, 4).map((o) => {
                      const isSelected = currentMakeupOccasion === o.label;
                      return (
                        <button
                          key={o.id}
                          type="button"
                          onClick={() => updateStyleField('makeupOccasion', o.label)}
                          className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#263D2B] text-white border-[#263D2B]'
                              : 'bg-[#F7F4ED]/50 hover:bg-white text-[#10110F] border-[#DCE1D8]'
                          }`}
                        >
                          <span className="font-semibold">{o.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Threading Controls */}
            {serviceCategory === 'threading' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                    Target Facial Zone
                  </label>
                  <div className="space-y-1.5">
                    {THREADING_OPTIONS.areas.map((a) => {
                      const isSelected = currentThreadingArea === a.label;
                      return (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => updateStyleField('threadingArea', a.label)}
                          className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#263D2B] text-white border-[#263D2B]'
                              : 'bg-[#F7F4ED]/50 hover:bg-white text-[#10110F] border-[#DCE1D8]'
                          }`}
                        >
                          <span className="font-semibold">{a.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                    Eyebrow Arch Silhouette
                  </label>
                  <div className="space-y-1.5">
                    {THREADING_OPTIONS.shapings.slice(0, 4).map((s) => {
                      const isSelected = currentThreadingShaping === s.label;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => updateStyleField('threadingShaping', s.label)}
                          className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#263D2B] text-white border-[#263D2B]'
                              : 'bg-[#F7F4ED]/50 hover:bg-white text-[#10110F] border-[#DCE1D8]'
                          }`}
                        >
                          <span className="font-semibold">{s.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Waxing Controls */}
            {serviceCategory === 'waxing' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                    Waxing Area Focus
                  </label>
                  <div className="space-y-1.5">
                    {WAXING_OPTIONS.areas.slice(0, 4).map((a) => {
                      const isSelected = currentWaxingArea === a.label;
                      return (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => updateStyleField('waxingArea', a.label)}
                          className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#263D2B] text-white border-[#263D2B]'
                              : 'bg-[#F7F4ED]/50 hover:bg-white text-[#10110F] border-[#DCE1D8]'
                          }`}
                        >
                          <span className="font-semibold">{a.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                    Comfort &amp; Sensitive Skin Protocol
                  </label>
                  <div className="space-y-1.5">
                    {WAXING_OPTIONS.comfortPreferences.map((c) => {
                      const isSelected = currentWaxingComfort === c.label;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => updateStyleField('waxingComfort', c.label)}
                          className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#263D2B] text-white border-[#263D2B]'
                              : 'bg-[#F7F4ED]/50 hover:bg-white text-[#10110F] border-[#DCE1D8]'
                          }`}
                        >
                          <span className="font-semibold">{c.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Massage Controls */}
            {serviceCategory === 'massage' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                    Pressure Intensity
                  </label>
                  <div className="space-y-1.5">
                    {MASSAGE_OPTIONS.pressures.map((p) => {
                      const isSelected = currentMassagePressure === p.label;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => updateStyleField('massagePressure', p.label)}
                          className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#263D2B] text-white border-[#263D2B]'
                              : 'bg-[#F7F4ED]/50 hover:bg-white text-[#10110F] border-[#DCE1D8]'
                          }`}
                        >
                          <span className="font-semibold">{p.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                    Target Knot &amp; Tension Zone
                  </label>
                  <div className="space-y-1.5">
                    {MASSAGE_OPTIONS.focusAreas.slice(0, 4).map((f) => {
                      const isSelected = currentMassageFocus === f.label;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => updateStyleField('massageFocus', f.label)}
                          className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#263D2B] text-white border-[#263D2B]'
                              : 'bg-[#F7F4ED]/50 hover:bg-white text-[#10110F] border-[#DCE1D8]'
                          }`}
                        >
                          <span className="font-semibold">{f.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Lashes Controls */}
            {serviceCategory === 'lashes' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                    Lash Extension Density
                  </label>
                  <div className="space-y-1.5">
                    {LASHES_OPTIONS.styles.map((s) => {
                      const isSelected = currentLashStyle === s.label;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => updateStyleField('lashStyle', s.label)}
                          className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#263D2B] text-white border-[#263D2B]'
                              : 'bg-[#F7F4ED]/50 hover:bg-white text-[#10110F] border-[#DCE1D8]'
                          }`}
                        >
                          <span className="font-semibold">{s.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                    Lash Curl Silhouette
                  </label>
                  <div className="space-y-1.5">
                    {LASHES_OPTIONS.curls.map((c) => {
                      const isSelected = currentLashCurl === c.label;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => updateStyleField('lashCurl', c.label)}
                          className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#263D2B] text-white border-[#263D2B]'
                              : 'bg-[#F7F4ED]/50 hover:bg-white text-[#10110F] border-[#DCE1D8]'
                          }`}
                        >
                          <span className="font-semibold">{c.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* BOTTOM BUTTON BAR: CONTINUE TO SUMMARY & QUICK ACTIONS                 */}
      {/* --------------------------------------------------------------------- */}
      <div className="pt-4 border-t border-[#DCE1D8] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-[#465640]">
          <ShieldCheck className="w-4 h-4 text-[#263D2B]" />
          <span>Selections saved in real-time. Original catalog rate remains guaranteed.</span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            type="button"
            id="change-selection-btn"
            onClick={handlePreviewMyStyle}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#DCE1D8] bg-white hover:bg-[#F7F4ED] text-xs font-semibold text-[#10110F] transition-colors"
          >
            Change Selection
          </button>

          <button
            type="button"
            id="continue-to-summary-btn"
            onClick={onContinueToSummary}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-[#F7F4ED] text-xs font-semibold tracking-wider uppercase shadow-xs transition-all"
          >
            <span>Continue to Custom Studio Summary</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
