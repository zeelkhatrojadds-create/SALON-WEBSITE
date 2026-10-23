import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  RotateCcw, 
  Shuffle, 
  Bookmark, 
  Calendar, 
  Check, 
  ArrowRight, 
  Palette, 
  Layers, 
  Wand2, 
  X,
  Sliders,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import { 
  NAIL_SHAPES, 
  NAIL_COLORS, 
  NAIL_FINISHES, 
  NAIL_ART_OPTIONS, 
  FINGERS_CONFIG 
} from './NailConstants';

function getSessionUser() {
  try {
    const data = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('glfy_db_session_user') : null;
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

export default function NailCustomizerWorkbench({
  selectedShape,
  setSelectedShape,
  selectedColor,
  setSelectedColor,
  customHexColor,
  setCustomHexColor,
  isCustomColorActive,
  setIsCustomColorActive,
  selectedFinish,
  setSelectedFinish,
  selectedArt,
  setSelectedArt,
  onResetAll,
  active3DNote = null,
  onDismiss3DNote = null
}) {
  const navigate = useNavigate();

  // Active Tab in customizer panel
  const [activeTab, setActiveTab] = useState('colors'); // 'colors', 'finishes', 'art'

  // Save Feedback state
  const [saveStatus, setSaveStatus] = useState(null); // 'saving', 'saved', 'error'
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Active color value
  const activeHex = useMemo(() => {
    return isCustomColorActive ? customHexColor : selectedColor.hex;
  }, [isCustomColorActive, customHexColor, selectedColor]);

  const activeColorName = useMemo(() => {
    return isCustomColorActive ? `Custom (${customHexColor.toUpperCase()})` : selectedColor.name;
  }, [isCustomColorActive, customHexColor, selectedColor]);

  // Randomize creative combination
  const handleRandomize = () => {
    const randomShape = NAIL_SHAPES[Math.floor(Math.random() * NAIL_SHAPES.length)];
    const randomColor = NAIL_COLORS[Math.floor(Math.random() * NAIL_COLORS.length)];
    const randomFinish = NAIL_FINISHES[Math.floor(Math.random() * NAIL_FINISHES.length)];
    const randomArt = NAIL_ART_OPTIONS[Math.floor(Math.random() * NAIL_ART_OPTIONS.length)];

    setSelectedShape(randomShape);
    setSelectedColor(randomColor);
    setIsCustomColorActive(false);
    setSelectedFinish(randomFinish);
    setSelectedArt(randomArt);
    setSaveStatus(null);
  };

  // Handle Save Design
  const handleSaveDesign = () => {
    const user = getSessionUser();
    const designPayload = {
      id: `nail-${Date.now()}`,
      shape: selectedShape.name,
      shapeId: selectedShape.id,
      color: activeColorName,
      colorHex: activeHex,
      finish: selectedFinish.name,
      finishId: selectedFinish.id,
      art: selectedArt.name,
      artId: selectedArt.id,
      createdAt: new Date().toISOString()
    };

    setSaveStatus('saving');

    try {
      if (user) {
        const storageKey = `glfy_saved_nail_designs_${user.id}`;
        const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
        const updated = [designPayload, ...existing.slice(0, 9)];
        localStorage.setItem(storageKey, JSON.stringify(updated));

        setTimeout(() => {
          setSaveStatus('saved');
          setTimeout(() => setSaveStatus(null), 3500);
        }, 400);
      } else {
        localStorage.setItem('glfy_pending_nail_design', JSON.stringify(designPayload));
        setTimeout(() => {
          setSaveStatus('saved');
          setShowAuthModal(true);
        }, 300);
      }
    } catch (err) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  // Handle Book Nail Appointment
  const handleBookDesign = () => {
    let serviceId = 'gel-manicure';
    if (selectedFinish.id === 'chrome' || selectedArt.id !== 'none') {
      serviceId = 'gel-manicure';
    } else {
      serviceId = 'classic-manicure';
    }

    try {
      const designSpec = `${selectedShape.name} shape, ${activeColorName} color, ${selectedFinish.name} finish, ${selectedArt.name}`;
      sessionStorage.setItem('glfy_nail_design_request', designSpec);
    } catch (e) {}

    navigate(`/book-appointment?service=${serviceId}`);
  };

  return (
    <section 
      id="nail-customizer-workbench" 
      aria-label="Nail Customization Workbench"
      className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24"
    >
      {/* Section Header */}
      <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B] shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
          <span>STEP 02 · LIVE 5-FINGER PREVIEW &amp; CUSTOMIZER</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
          Live Manicure Preview &amp; Studio
        </h2>

        <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

        <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto italic">
          &ldquo;Select any silhouette above to watch your 5-finger manicure update dynamically with your chosen colors, finishes, and bespoke art.&rdquo;
        </p>
      </ScrollReveal>

      {/* Main 2-Column Workbench Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* =================================================================== */}
        {/* LEFT / TOP: 5-FINGER LIVE COORDINATED MANICURE PREVIEW              */}
        {/* =================================================================== */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-sm flex flex-col justify-between space-y-6 lg:sticky lg:top-28">
          
          {/* Top Preview Toolbar */}
          <div className="flex items-center justify-between border-b border-[#DCE1D8] pb-4">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
                COORDINATED SET
              </span>
              <span className="font-serif text-base text-[#10110F] font-normal">
                Full 5-Finger Manicure Preview
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRandomize}
                className="px-3 py-1.5 rounded-full border border-[#DCE1D8] bg-[#F7F4ED] hover:bg-[#DCE1D8] text-[#10110F] text-[10.5px] font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Shuffle a random creative nail look"
              >
                <Shuffle className="w-3 h-3 text-[#263D2B]" />
                <span className="hidden sm:inline">Inspire Me</span>
              </button>

              <button
                type="button"
                onClick={onResetAll}
                className="p-1.5 rounded-full border border-[#DCE1D8] hover:bg-[#F7F4ED] text-[#6B7068] hover:text-[#10110F] transition-colors cursor-pointer"
                title="Reset to default classic manicure"
                aria-label="Reset design"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Hand Presentation Bed */}
          <div className="relative w-full aspect-[16/11] min-h-[300px] sm:min-h-[340px] bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#ECE5D8] rounded-2xl border border-[#DCE1D8] overflow-hidden flex items-end justify-center px-4 pt-6 pb-2 select-none shadow-inner">
            
            {/* Background Texture Rings */}
            <div className="absolute inset-0 opacity-25 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-[#263D2B]/15" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-[#263D2B]/15" />
            </div>

            {/* Studio Watermark */}
            <div className="absolute top-3.5 left-4 text-[9px] font-bold uppercase tracking-[0.24em] text-[#6B7068]/60 pointer-events-none flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-[#263D2B]" />
              GLAM GIRL · OTTAWA NAIL ATELIER
            </div>

            {/* 5 Nails Presentation Row */}
            <div className="relative z-10 flex items-end justify-center gap-2 sm:gap-3.5 w-full max-w-md pb-2">
              {FINGERS_CONFIG.map((finger) => (
                <div
                  key={finger.id}
                  className="flex flex-col items-center group transition-transform duration-300"
                  style={{
                    transform: `rotate(${finger.tilt}deg)`
                  }}
                >
                  {/* SVG Nail Model */}
                  <div 
                    className="relative filter drop-shadow-sm transition-all duration-300"
                    style={{
                      width: `${finger.width}px`,
                      height: `${finger.height}px`
                    }}
                  >
                    <svg
                      viewBox="0 0 100 160"
                      className="w-full h-full overflow-visible"
                    >
                      <defs>
                        {/* Base Nail Clip Mask */}
                        <clipPath id={`nail-clip-${finger.id}`}>
                          <path d={selectedShape.path} />
                        </clipPath>

                        {/* Nail Base Gradient */}
                        <linearGradient id={`nail-base-${finger.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={activeHex} />
                          <stop offset="70%" stopColor={activeHex} />
                          <stop offset="100%" stopColor="#10110F" stopOpacity="0.8" />
                        </linearGradient>

                        {/* French Smile Line Tip Gradient */}
                        <linearGradient id={`french-smile-${finger.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#FFFFFF" />
                          <stop offset="85%" stopColor="#F7F4ED" />
                          <stop offset="100%" stopColor="#DCE1D8" />
                        </linearGradient>

                        {/* Specular Highlight Shine */}
                        <linearGradient id={`gloss-shine-${finger.id}`} x1="15%" y1="0%" x2="65%" y2="100%">
                          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
                          <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.3" />
                          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.0" />
                        </linearGradient>

                        {/* Chrome Mirror Gradient */}
                        <linearGradient id={`chrome-grad-${finger.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                          <stop offset="25%" stopColor="#C0C0C0" stopOpacity="0.3" />
                          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
                          <stop offset="75%" stopColor="#808080" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.7" />
                        </linearGradient>

                        {/* Cat-Eye Magnetic Beam */}
                        <linearGradient id={`cat-eye-beam-${finger.id}`} x1="0%" y1="30%" x2="100%" y2="70%">
                          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                          <stop offset="40%" stopColor="#A8B5A0" stopOpacity="0.2" />
                          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
                          <stop offset="60%" stopColor="#A8B5A0" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                        </linearGradient>

                        {/* Pearl Iridescence */}
                        <linearGradient id={`pearl-glaze-${finger.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
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
                        d={selectedShape.path}
                        fill={selectedColor.isFrench && !isCustomColorActive ? '#F7D6D0' : `url(#nail-base-${finger.id})`}
                        stroke="#10110F"
                        strokeWidth="1.2"
                        className="transition-all duration-300"
                      />

                      {/* LAYER 2: FRENCH MANICURE / TIPS OVERLAY */}
                      {(selectedColor.isFrench || selectedFinish.id === 'french-tips') && (
                        <g clipPath={`url(#nail-clip-${finger.id})`}>
                          <path
                            d={`M 15 ${selectedShape.accentTipHeight || 40} Q 50 ${((selectedShape.accentTipHeight || 40) + 15)} 85 ${selectedShape.accentTipHeight || 40} L 85 0 L 15 0 Z`}
                            fill={`url(#french-smile-${finger.id})`}
                            stroke="#E8E2D8"
                            strokeWidth="0.5"
                          />
                        </g>
                      )}

                      {/* LAYER 3: FINISH OVERLAYS */}
                      {/* A. High Gloss Specular Reflection */}
                      {selectedFinish.id === 'glossy' && (
                        <g clipPath={`url(#nail-clip-${finger.id})`}>
                          <path
                            d="M 22 140 C 22 50, 32 30, 48 20 C 42 28, 32 60, 32 140 Z"
                            fill={`url(#gloss-shine-${finger.id})`}
                          />
                        </g>
                      )}

                      {/* B. Matte Frosted Texture */}
                      {selectedFinish.id === 'matte' && (
                        <g clipPath={`url(#nail-clip-${finger.id})`}>
                          <rect x="0" y="0" width="100" height="160" fill="#FFFFFF" opacity="0.08" />
                          <path
                            d={selectedShape.path}
                            stroke="#FFFFFF"
                            strokeWidth="1"
                            strokeOpacity="0.25"
                            fill="none"
                          />
                        </g>
                      )}

                      {/* C. Chrome Iridescent Sheen */}
                      {selectedFinish.id === 'chrome' && (
                        <g clipPath={`url(#nail-clip-${finger.id})`}>
                          <rect x="0" y="0" width="100" height="160" fill={`url(#chrome-grad-${finger.id})`} opacity="0.65" />
                          <path
                            d="M 18 130 Q 50 15 82 130"
                            stroke="#FFFFFF"
                            strokeWidth="1.5"
                            fill="none"
                            opacity="0.8"
                          />
                        </g>
                      )}

                      {/* D. Glitter Micro-Crystals */}
                      {selectedFinish.id === 'glitter' && (
                        <g clipPath={`url(#nail-clip-${finger.id})`}>
                          <circle cx="35" cy="45" r="2" fill="#FFFFFF" opacity="0.9" />
                          <circle cx="50" cy="35" r="1.5" fill="#FFFFFF" opacity="0.95" />
                          <circle cx="65" cy="50" r="2.5" fill="#FFFFFF" opacity="0.85" />
                          <circle cx="42" cy="70" r="1.5" fill="#FFFFFF" opacity="0.8" />
                          <circle cx="60" cy="80" r="2" fill="#FFFFFF" opacity="0.75" />
                          <circle cx="48" cy="105" r="1" fill="#FFFFFF" opacity="0.7" />
                          <circle cx="38" cy="120" r="1.5" fill="#FFFFFF" opacity="0.6" />
                          <circle cx="68" cy="115" r="1.2" fill="#FFFFFF" opacity="0.65" />
                        </g>
                      )}

                      {/* E. Pearl Iridescent Glaze */}
                      {selectedFinish.id === 'pearl' && (
                        <g clipPath={`url(#nail-clip-${finger.id})`}>
                          <rect x="0" y="0" width="100" height="160" fill={`url(#pearl-glaze-${finger.id})`} />
                          <ellipse cx="50" cy="50" rx="30" ry="40" fill="#FFFFFF" opacity="0.25" />
                        </g>
                      )}

                      {/* F. Cat-Eye Magnetic Shifting Beam */}
                      {selectedFinish.id === 'cat-eye' && (
                        <g clipPath={`url(#nail-clip-${finger.id})`}>
                          <rect x="0" y="0" width="100" height="160" fill={`url(#cat-eye-beam-${finger.id})`} />
                          <line x1="20" y1="120" x2="80" y2="40" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.6" filter="blur(2px)" />
                        </g>
                      )}

                      {/* LAYER 4: OPTIONAL NAIL ART PATTERNS */}
                      {/* Minimal Lines */}
                      {selectedArt.id === 'minimal-lines' && (
                        <g clipPath={`url(#nail-clip-${finger.id})`}>
                          <line x1="50" y1="20" x2="50" y2="150" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.8" />
                          <circle cx="50" cy="35" r="2" fill="#FFFFFF" />
                        </g>
                      )}

                      {/* Floral Art */}
                      {selectedArt.id === 'floral-art' && (
                        <g clipPath={`url(#nail-clip-${finger.id})`}>
                          <g transform="translate(40, 110)">
                            <circle cx="10" cy="10" r="3" fill="#FFFFFF" opacity="0.9" />
                            <circle cx="6" cy="7" r="2.5" fill="#A8B5A0" opacity="0.85" />
                            <circle cx="14" cy="7" r="2.5" fill="#A8B5A0" opacity="0.85" />
                            <circle cx="7" cy="14" r="2.5" fill="#A8B5A0" opacity="0.85" />
                            <circle cx="13" cy="14" r="2.5" fill="#A8B5A0" opacity="0.85" />
                            <path d="M 10 15 Q 12 25 15 32" stroke="#263D2B" strokeWidth="1" fill="none" />
                          </g>
                        </g>
                      )}

                      {/* Glitter Accent on Ring Finger and Thumb */}
                      {selectedArt.id === 'glitter-accent' && finger.isAccent && (
                        <g clipPath={`url(#nail-clip-${finger.id})`}>
                          <path
                            d={`M 15 ${selectedShape.accentTipHeight || 40} L 85 ${selectedShape.accentTipHeight || 40} L 85 0 L 15 0 Z`}
                            fill="#FFFFFF"
                            opacity="0.3"
                          />
                          <circle cx="50" cy="40" r="3" fill="#FFFFFF" opacity="0.95" />
                          <circle cx="40" cy="50" r="2" fill="#FFFFFF" opacity="0.9" />
                          <circle cx="60" cy="55" r="2" fill="#FFFFFF" opacity="0.9" />
                          <circle cx="48" cy="70" r="1.5" fill="#FFFFFF" opacity="0.8" />
                        </g>
                      )}

                      {/* Geometric Designs */}
                      {selectedArt.id === 'geometric' && (
                        <g clipPath={`url(#nail-clip-${finger.id})`}>
                          <line x1="20" y1="50" x2="80" y2="80" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.75" />
                          <line x1="80" y1="50" x2="20" y2="80" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.75" />
                          <polygon points="50,55 58,65 42,65" fill="#FFFFFF" opacity="0.85" />
                        </g>
                      )}

                      {/* Marble Veining */}
                      {selectedArt.id === 'marble' && (
                        <g clipPath={`url(#nail-clip-${finger.id})`}>
                          <path
                            d="M 25 40 Q 40 60 35 90 T 55 135"
                            stroke="#FFFFFF"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.55"
                          />
                          <path
                            d="M 65 30 Q 45 70 65 100 T 45 145"
                            stroke="#10110F"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.25"
                          />
                        </g>
                      )}

                      {/* Abstract Modern Strokes */}
                      {selectedArt.id === 'abstract' && (
                        <g clipPath={`url(#nail-clip-${finger.id})`}>
                          <path
                            d="M 30 30 Q 60 50 40 90 T 70 130"
                            stroke="#A8B5A0"
                            strokeWidth="4"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.6"
                          />
                          <circle cx="60" cy="50" r="6" fill="#263D2B" opacity="0.7" />
                        </g>
                      )}

                      {/* Free Edge Highlight */}
                      <path
                        d={selectedShape.tipHighlightPath}
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        opacity="0.8"
                      />
                    </svg>
                  </div>

                  {/* Finger Label */}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] mt-1.5 opacity-70 group-hover:opacity-100 group-hover:text-[#263D2B] transition-opacity">
                    {finger.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Artisan 3D Sculpting Note */}
          {active3DNote && (
            <div className="p-3.5 rounded-2xl bg-[#263D2B]/5 border border-[#263D2B]/20 flex items-start gap-2.5 animate-in fade-in duration-300">
              <Sparkles className="w-4 h-4 text-[#263D2B] flex-shrink-0 mt-0.5" />
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#263D2B] uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                    ✦ 3D Artisan Sculpting Detail
                  </span>
                  {onDismiss3DNote && (
                    <button
                      type="button"
                      onClick={onDismiss3DNote}
                      className="text-[#6B7068] hover:text-[#10110F] text-xs p-0.5 cursor-pointer"
                      aria-label="Dismiss 3D note"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <p className="text-[#465640] text-[11.5px] mt-1 leading-relaxed">
                  {active3DNote}
                </p>
              </div>
            </div>
          )}

          {/* Selected Design Summary Pill */}
          <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B]">
                MANICURE SPECIFICATIONS
              </span>
              <span className="text-[10px] text-[#6B7068] font-mono">
                CAD Rates Applied
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[#10110F]">
              <div className="p-2 bg-white rounded-xl border border-[#DCE1D8]">
                <span className="text-[9px] text-[#6B7068] uppercase font-bold block">SHAPE</span>
                <span className="font-semibold text-xs truncate block">{selectedShape.name}</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-[#DCE1D8]">
                <span className="text-[9px] text-[#6B7068] uppercase font-bold block">COLOR</span>
                <span className="font-semibold text-xs truncate block">{activeColorName}</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-[#DCE1D8]">
                <span className="text-[9px] text-[#6B7068] uppercase font-bold block">FINISH</span>
                <span className="font-semibold text-xs truncate block">{selectedFinish.name}</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-[#DCE1D8]">
                <span className="text-[9px] text-[#6B7068] uppercase font-bold block">NAIL ART</span>
                <span className="font-semibold text-xs truncate block">{selectedArt.name}</span>
              </div>
            </div>
          </div>

          {/* Action Row: Save My Design & Book Appointment */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={handleSaveDesign}
              disabled={saveStatus === 'saving'}
              className="flex-1 py-3 px-4 rounded-full border border-[#263D2B] bg-white hover:bg-[#F7F4ED] text-[#263D2B] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
            >
              {saveStatus === 'saved' ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#263D2B]" />
                  <span>DESIGN SAVED!</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4 text-[#263D2B]" />
                  <span>SAVE MY DESIGN</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleBookDesign}
              className="flex-1 global-button !py-3 !px-4 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>BOOK THIS NAIL DESIGN</span>
            </button>
          </div>

          {/* Guest Auth Prompt Banner if triggered */}
          {showAuthModal && (
            <div className="p-4 rounded-2xl bg-[#263D2B] text-white flex items-center justify-between gap-3 text-xs animate-fade-in shadow-md">
              <div className="space-y-0.5">
                <span className="font-semibold block">Design Preserved in Guest Draft!</span>
                <span className="text-white/80 text-[11px]">Sign in to permanently save your custom creations to your salon account.</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="px-3.5 py-1.5 rounded-full bg-white text-[#263D2B] font-bold text-[10.5px] uppercase tracking-wider hover:bg-[#F7F4ED] transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setShowAuthModal(false)}
                  className="p-1 text-white/70 hover:text-white"
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* =================================================================== */}
        {/* RIGHT: CUSTOMIZATION CONTROLS WORKBENCH                             */}
        {/* =================================================================== */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-sm space-y-6">
          
          {/* Navigation Tabs (Colors, Finishes, Art) */}
          <div className="flex items-center border-b border-[#DCE1D8] gap-2 pb-1 overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab('colors')}
              className={`pb-3 px-3 sm:px-4 text-xs font-bold uppercase tracking-[0.16em] transition-all cursor-pointer border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'colors'
                  ? 'border-[#263D2B] text-[#263D2B]'
                  : 'border-transparent text-[#6B7068] hover:text-[#10110F]'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Nail Color ({NAIL_COLORS.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('finishes')}
              className={`pb-3 px-3 sm:px-4 text-xs font-bold uppercase tracking-[0.16em] transition-all cursor-pointer border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'finishes'
                  ? 'border-[#263D2B] text-[#263D2B]'
                  : 'border-transparent text-[#6B7068] hover:text-[#10110F]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Finishes ({NAIL_FINISHES.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('art')}
              className={`pb-3 px-3 sm:px-4 text-xs font-bold uppercase tracking-[0.16em] transition-all cursor-pointer border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'art'
                  ? 'border-[#263D2B] text-[#263D2B]'
                  : 'border-transparent text-[#6B7068] hover:text-[#10110F]'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Nail Art ({NAIL_ART_OPTIONS.length})</span>
            </button>
          </div>

          {/* TAB 1: NAIL COLORS & CUSTOM PICKER */}
          {activeTab === 'colors' && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#263D2B]">
                    CLICKABLE COLOR SWATCHES
                  </span>
                  <span className="text-xs font-semibold text-[#10110F]">
                    Selected: <strong className="text-[#263D2B]">{activeColorName}</strong>
                  </span>
                </div>
                <p className="text-xs text-[#6B7068] font-light">
                  Choose from our curated salon pigments or select any custom hex tone.
                </p>
              </div>

              {/* Swatches Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {NAIL_COLORS.map((color) => {
                  const isSelected = !isCustomColorActive && selectedColor.id === color.id;

                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => {
                        setSelectedColor(color);
                        setIsCustomColorActive(false);
                      }}
                      aria-label={`Select ${color.name} nail color`}
                      className={`p-3 rounded-2xl border text-left flex flex-col justify-between h-24 transition-all duration-200 cursor-pointer shadow-2xs ${
                        isSelected
                          ? 'border-[#263D2B] ring-2 ring-[#263D2B]/30 scale-[1.02] bg-[#F7F4ED]'
                          : 'border-[#DCE1D8] hover:border-[#A8B5A0] bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div
                          className="w-8 h-8 rounded-full border border-black/15 shadow-xs flex items-center justify-center"
                          style={{
                            background: color.isFrench
                              ? 'linear-gradient(135deg, #F7D6D0 60%, #FFFFFF 60%)'
                              : color.hex
                          }}
                        >
                          {isSelected && (
                            <Check className={`w-3.5 h-3.5 stroke-[3] ${
                              color.textTone === 'light' ? 'text-white' : 'text-[#10110F]'
                            }`} />
                          )}
                        </div>
                      </div>

                      <span className="text-[11px] font-semibold text-[#10110F] leading-tight line-clamp-2">
                        {color.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom HTML5 Color Picker Card */}
              <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#10110F]">
                    <Sliders className="w-3.5 h-3.5 text-[#263D2B]" />
                    <span>Custom Atelier Color Picker</span>
                  </div>
                  <p className="text-[11px] text-[#6B7068]">
                    Looking for a specific couture shade? Select any custom hex color.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <input
                    type="color"
                    id="custom-hex-picker"
                    value={customHexColor}
                    onChange={(e) => {
                      setCustomHexColor(e.target.value);
                      setIsCustomColorActive(true);
                    }}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-xs cursor-pointer p-0 bg-transparent overflow-hidden"
                    title="Choose custom color"
                  />
                  <button
                    type="button"
                    onClick={() => setIsCustomColorActive(true)}
                    className={`px-3 py-1.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                      isCustomColorActive
                        ? 'bg-[#263D2B] text-white border-[#263D2B]'
                        : 'bg-white text-[#10110F] border-[#DCE1D8] hover:bg-[#F7F4ED]'
                    }`}
                  >
                    Apply Custom
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: NAIL FINISHES */}
          {activeTab === 'finishes' && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#263D2B]">
                  ATELIER TOPCOATS &amp; TEXTURES
                </span>
                <p className="text-xs text-[#6B7068] font-light">
                  Layered visual effects rendered using realistic optical specular filters.
                </p>
              </div>

              <div className="space-y-2.5">
                {NAIL_FINISHES.map((finish) => {
                  const isSelected = selectedFinish.id === finish.id;

                  return (
                    <button
                      key={finish.id}
                      type="button"
                      onClick={() => setSelectedFinish(finish)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-start justify-between gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#263D2B] bg-[#F7F4ED] shadow-sm ring-1 ring-[#263D2B]/20'
                          : 'border-[#DCE1D8] hover:border-[#A8B5A0] bg-white'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-serif text-sm font-medium ${
                            isSelected ? 'text-[#263D2B]' : 'text-[#10110F]'
                          }`}>
                            {finish.name}
                          </span>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#6B7068] bg-white px-2 py-0.5 rounded-full border border-[#DCE1D8]">
                            {finish.subtitle}
                          </span>
                        </div>
                        <p className="text-xs text-[#6B7068] font-light leading-relaxed">
                          {finish.description}
                        </p>
                      </div>

                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isSelected ? 'bg-[#263D2B] border-[#263D2B] text-white' : 'border-[#DCE1D8] bg-white'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: OPTIONAL NAIL ART PATTERNS */}
          {activeTab === 'art' && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#263D2B]">
                  BESPOKE HAND-PAINTED DESIGNS
                </span>
                <p className="text-xs text-[#6B7068] font-light">
                  Choose an accent motif to adorn your signature manicure.
                </p>
              </div>

              <div className="space-y-2.5">
                {NAIL_ART_OPTIONS.map((art) => {
                  const isSelected = selectedArt.id === art.id;

                  return (
                    <button
                      key={art.id}
                      type="button"
                      onClick={() => setSelectedArt(art)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-start justify-between gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#263D2B] bg-[#F7F4ED] shadow-sm ring-1 ring-[#263D2B]/20'
                          : 'border-[#DCE1D8] hover:border-[#A8B5A0] bg-white'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-serif text-sm font-medium ${
                            isSelected ? 'text-[#263D2B]' : 'text-[#10110F]'
                          }`}>
                            {art.name}
                          </span>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#6B7068] bg-white px-2 py-0.5 rounded-full border border-[#DCE1D8]">
                            {art.subtitle}
                          </span>
                        </div>
                        <p className="text-xs text-[#6B7068] font-light leading-relaxed">
                          {art.description}
                        </p>
                      </div>

                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isSelected ? 'bg-[#263D2B] border-[#263D2B] text-white' : 'border-[#DCE1D8] bg-white'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
