import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  RotateCcw, 
  Shuffle, 
  Bookmark, 
  Calendar, 
  CheckCircle2, 
  Layers, 
  Copy, 
  ClipboardPaste, 
  Undo2, 
  Check, 
  ArrowRight, 
  Sliders, 
  Wand2, 
  Heart, 
  Star, 
  Eye, 
  Info,
  Palette,
  Maximize2
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import { 
  TEN_FINGERS, 
  MIX_MATCH_COLORS, 
  MIX_MATCH_PATTERNS, 
  MIX_MATCH_ACCENTS, 
  MIX_MATCH_FINISHES, 
  COORDINATED_THEMES,
  INITIAL_TEN_NAILS_STATE,
  DEFAULT_NAIL_DESIGN
} from '../../data/mixMatchNailData';

// Single Nail SVG Renderer
function SingleNailVisual({ 
  finger, 
  design, 
  isSelected, 
  onClick,
  showLabel = true,
  size = "normal" // "normal" | "thumbnail" | "large"
}) {
  const { colorHex, patternId, accentId, finishId } = design;

  // Unique SVG IDs per finger to prevent mask collisions
  const clipId = `mix-nail-clip-${finger.id}`;
  const ombreId = `ombre-grad-${finger.id}`;
  const catEyeGradId = `cat-eye-grad-${finger.id}`;
  const holoGradId = `holo-grad-${finger.id}`;
  const marbleGradId = `marble-grad-${finger.id}`;
  const chromeGradId = `chrome-grad-${finger.id}`;

  const isLightColor = colorHex === '#F4F2EC' || colorHex === '#D4B89C' || colorHex === '#E8A7A1' || colorHex === '#B8A9C9';
  const contrastStroke = isLightColor ? '#263D2B' : '#FFFFFF';

  // Responsive width class based on display mode
  let widthClass = 'w-9 sm:w-11 md:w-12';
  if (size === 'thumbnail') widthClass = 'w-7 sm:w-8';
  if (size === 'large') widthClass = 'w-14 sm:w-16 md:w-18';

  return (
    <div 
      onClick={onClick}
      className={`flex flex-col items-center cursor-pointer select-none group relative transition-transform duration-200 ${
        isSelected ? 'z-20' : 'z-10'
      }`}
    >
      {/* Fixed Height Active Slot (Prevents layout jumping when active) */}
      {size !== 'thumbnail' && (
        <div className="h-6 flex items-center justify-center pointer-events-none mb-1">
          {isSelected ? (
            <div className="px-2 py-0.5 rounded-full bg-[#263D2B] text-white text-[8.5px] font-bold uppercase tracking-wider animate-in fade-in zoom-in-95 duration-150 shadow-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8B5A0] animate-pulse" />
              <span>Active</span>
            </div>
          ) : (
            <div className="w-1 h-1 rounded-full bg-transparent" />
          )}
        </div>
      )}

      {/* Nail SVG Bed with Anatomical Tilt & Arch Offset */}
      <div 
        className={`relative aspect-[100/160] rounded-2xl transition-all duration-300 ${widthClass} ${
          isSelected 
            ? 'ring-2 ring-[#263D2B] ring-offset-3 ring-offset-[#F7F4ED] scale-105' 
            : 'group-hover:ring-1 group-hover:ring-[#263D2B]/40 group-hover:ring-offset-2'
        }`}
        style={{
          transform: size !== 'thumbnail'
            ? `translateY(${finger.offsetY || 0}px) rotate(${finger.tilt || 0}deg) scale(${finger.scale || 1})`
            : undefined
        }}
      >
        <svg 
          viewBox="0 0 100 160" 
          className="w-full h-full overflow-visible drop-shadow-[0_8px_12px_rgba(0,0,0,0.14)]"
        >
          <defs>
            {/* Almond Shape Clip Mask */}
            <clipPath id={clipId}>
              <path d="M 20 150 C 20 158 80 158 80 150 L 78 72 C 76 42, 58 22, 50 20 C 42 22, 24 42, 22 72 Z" />
            </clipPath>

            {/* Ombre Gradient */}
            <linearGradient id={ombreId} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#D4B89C" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#D4B89C" stopOpacity="0.4" />
              <stop offset="70%" stopColor={colorHex} stopOpacity="0.9" />
              <stop offset="100%" stopColor={colorHex} />
            </linearGradient>

            {/* Cat-Eye Gradient */}
            <linearGradient id={catEyeGradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={colorHex} />
              <stop offset="35%" stopColor={colorHex} />
              <stop offset="48%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="52%" stopColor={contrastStroke} />
              <stop offset="65%" stopColor={colorHex} />
              <stop offset="100%" stopColor={colorHex} />
            </linearGradient>

            {/* Holographic Rainbow Dispersion */}
            <linearGradient id={holoGradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EC4899" stopOpacity="0.35" />
              <stop offset="30%" stopColor="#8B5CF6" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="0.3" />
            </linearGradient>

            {/* Chrome Mirror Gradient */}
            <linearGradient id={chromeGradId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#808080" />
              <stop offset="25%" stopColor="#E0E0E0" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="75%" stopColor="#B0B0B0" />
              <stop offset="100%" stopColor="#606060" />
            </linearGradient>

            {/* Marble Veining Filter */}
            <filter id={`marble-filter-${finger.id}`} x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>

          {/* Fingertip Cushion Bed behind the nail */}
          <path
            d="M 12 150 C 12 165, 88 165, 88 150 L 88 80 C 88 50, 12 50, 12 80 Z"
            fill="#E8D7CA"
            stroke="#D4B89C"
            strokeWidth="1"
            opacity="0.85"
          />
          <path
            d="M 18 150 C 18 160, 82 160, 82 150"
            stroke="#8B6B58"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
          />

          {/* LAYER 1: BASE COAT */}
          <path
            d="M 20 150 C 20 158 80 158 80 150 L 78 72 C 76 42, 58 22, 50 20 C 42 22, 24 42, 22 72 Z"
            fill={patternId === 'ombre' ? `url(#${ombreId})` : colorHex}
            stroke="#10110F"
            strokeWidth="1.2"
          />

          {/* LAYER 2: PATTERN OVERLAYS (CLIPPED INSIDE NAIL) */}
          <g clipPath={`url(#${clipId})`}>
            
            {/* French Tip */}
            {patternId === 'french-tip' && (
              <path
                d="M 20 54 Q 50 68 80 54 L 78 72 C 76 42, 58 22, 50 20 C 42 22, 24 42, 22 72 Z"
                fill="#FFFFFF"
                stroke="#E5E7EB"
                strokeWidth="0.8"
              />
            )}

            {/* Polka Dots */}
            {patternId === 'polka-dots' && (
              <g fill={contrastStroke} opacity="0.6">
                <circle cx="35" cy="50" r="2.8" />
                <circle cx="65" cy="50" r="2.8" />
                <circle cx="50" cy="70" r="2.8" />
                <circle cx="35" cy="90" r="2.8" />
                <circle cx="65" cy="90" r="2.8" />
                <circle cx="50" cy="110" r="2.8" />
                <circle cx="35" cy="130" r="2.8" />
                <circle cx="65" cy="130" r="2.8" />
              </g>
            )}

            {/* Stripes */}
            {patternId === 'stripes' && (
              <g stroke={contrastStroke} strokeWidth="2.5" opacity="0.5">
                <line x1="36" y1="20" x2="36" y2="150" />
                <line x1="50" y1="20" x2="50" y2="150" />
                <line x1="64" y1="20" x2="64" y2="150" />
              </g>
            )}

            {/* Checkerboard */}
            {patternId === 'checkerboard' && (
              <g fill={contrastStroke} opacity="0.45">
                <rect x="25" y="40" width="12" height="12" />
                <rect x="49" y="40" width="12" height="12" />
                <rect x="37" y="52" width="12" height="12" />
                <rect x="61" y="52" width="12" height="12" />
                <rect x="25" y="64" width="12" height="12" />
                <rect x="49" y="64" width="12" height="12" />
                <rect x="37" y="76" width="12" height="12" />
                <rect x="61" y="76" width="12" height="12" />
                <rect x="25" y="88" width="12" height="12" />
                <rect x="49" y="88" width="12" height="12" />
                <rect x="37" y="100" width="12" height="12" />
                <rect x="25" y="112" width="12" height="12" />
                <rect x="49" y="112" width="12" height="12" />
              </g>
            )}

            {/* Floral */}
            {patternId === 'floral' && (
              <g transform="translate(50, 75) scale(0.9)">
                {/* 5 Petals */}
                {[0, 72, 144, 216, 288].map((deg) => (
                  <ellipse
                    key={deg}
                    cx="0"
                    cy="-14"
                    rx="6"
                    ry="10"
                    fill="#FFFFFF"
                    opacity="0.85"
                    transform={`rotate(${deg})`}
                  />
                ))}
                {/* Flower center */}
                <circle cx="0" cy="0" r="4.5" fill="#263D2B" />
              </g>
            )}

            {/* Marble Veins */}
            {patternId === 'marble' && (
              <g stroke={contrastStroke} strokeWidth="1.8" opacity="0.6" fill="none">
                <path d="M 30 140 Q 45 100 35 70 T 55 30" />
                <path d="M 40 95 Q 65 75 70 45" />
                <path d="M 68 130 Q 55 110 65 90" />
              </g>
            )}

            {/* Glitter Sparkles */}
            {patternId === 'glitter' && (
              <g fill="#FFFFFF" opacity="0.85">
                <circle cx="34" cy="45" r="1.5" />
                <circle cx="48" cy="38" r="2.2" />
                <circle cx="62" cy="48" r="1.8" />
                <circle cx="40" cy="65" r="2.5" />
                <circle cx="58" cy="72" r="1.6" />
                <circle cx="45" cy="90" r="2.2" />
                <circle cx="35" cy="115" r="1.8" />
                <circle cx="65" cy="110" r="2" />
                <circle cx="50" cy="130" r="2.4" />
                {/* Starlight crosses */}
                <path d="M 50 55 L 50 61 M 47 58 L 53 58" stroke="#FFFFFF" strokeWidth="1" />
                <path d="M 38 82 L 38 88 M 35 85 L 41 85" stroke="#FFFFFF" strokeWidth="1" />
              </g>
            )}

            {/* Cat-Eye Luminous Band */}
            {patternId === 'cat-eye' && (
              <rect
                x="-40"
                y="-40"
                width="180"
                height="240"
                fill={`url(#${catEyeGradId})`}
                opacity="0.85"
              />
            )}

            {/* Abstract Swirls */}
            {patternId === 'abstract-swirls' && (
              <g stroke={contrastStroke} strokeWidth="2.5" fill="none" opacity="0.65">
                <path d="M 20 130 C 40 110, 20 80, 50 60 C 70 45, 80 30, 80 20" />
                <path d="M 30 150 C 60 120, 50 80, 75 50" />
              </g>
            )}

            {/* Chrome Molten Liquid */}
            {patternId === 'chrome' && (
              <rect
                x="0"
                y="0"
                width="100"
                height="160"
                fill={`url(#${chromeGradId})`}
                opacity="0.75"
              />
            )}

            {/* LAYER 3: ACCENT EMBELLISHMENTS */}
            {/* A. Rhinestone */}
            {accentId === 'rhinestones' && (
              <g transform="translate(50, 130)">
                <circle cx="0" cy="0" r="5" fill="#FFFFFF" stroke="#10110F" strokeWidth="0.8" />
                <circle cx="-1.5" cy="-1.5" r="1.5" fill="#FFFFFF" />
                <path d="M 0 -8 L 0 8 M -8 0 L 8 0" stroke="#FFFFFF" strokeWidth="1" opacity="0.75" />
              </g>
            )}

            {/* B. Tiny Flower */}
            {accentId === 'tiny-flowers' && (
              <g transform="translate(50, 130) scale(0.65)">
                {[0, 72, 144, 216, 288].map((deg) => (
                  <circle
                    key={deg}
                    cx="0"
                    cy="-8"
                    r="4"
                    fill="#FFFFFF"
                    transform={`rotate(${deg})`}
                  />
                ))}
                <circle cx="0" cy="0" r="3" fill="#263D2B" />
              </g>
            )}

            {/* C. Heart */}
            {accentId === 'hearts' && (
              <path
                d="M 50 132 C 45 125, 38 127, 38 133 C 38 140, 50 145, 50 145 C 50 145, 62 140, 62 133 C 62 127, 55 125, 50 132 Z"
                fill={contrastStroke}
                stroke="#10110F"
                strokeWidth="0.8"
                opacity="0.9"
              />
            )}

            {/* D. Star */}
            {accentId === 'stars' && (
              <g transform="translate(50, 128) scale(0.8)">
                <path
                  d="M 0 -12 Q 0 0, 12 0 Q 0 0, 0 12 Q 0 0, -12 0 Q 0 0, 0 -12 Z"
                  fill="#FFFFFF"
                  stroke="#10110F"
                  strokeWidth="0.6"
                />
              </g>
            )}

            {/* E. Pearl */}
            {accentId === 'pearls' && (
              <g transform="translate(50, 130)">
                <circle cx="0" cy="0" r="5.5" fill="#FAF7F2" stroke="#DCE1D8" strokeWidth="0.8" />
                <circle cx="-1.8" cy="-1.8" r="1.8" fill="#FFFFFF" opacity="0.8" />
              </g>
            )}

            {/* F. Gold-Free Metallic Details */}
            {accentId === 'metallic-details' && (
              <g transform="translate(50, 130)">
                <rect x="-4" y="-4" width="8" height="8" fill="#C0C0C0" stroke="#10110F" strokeWidth="0.8" transform="rotate(45)" />
                <circle cx="0" cy="0" r="1" fill="#FFFFFF" />
              </g>
            )}

            {/* G. Minimalist Lines */}
            {accentId === 'minimalist-lines' && (
              <g stroke={contrastStroke} strokeWidth="1.5">
                <line x1="50" y1="20" x2="50" y2="150" opacity="0.85" />
                <circle cx="50" cy="85" r="2.5" fill={contrastStroke} />
              </g>
            )}

            {/* LAYER 4: FINISH OVERLAYS */}
            {/* A. Glossy Curved Reflection */}
            {finishId === 'glossy' && (
              <path
                d="M 24 140 C 24 50, 34 30, 48 20 C 44 28, 34 60, 34 140 Z"
                fill="linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.1))"
                fillOpacity="0.45"
              />
            )}

            {/* B. Matte Frosted Surface */}
            {finishId === 'matte' && (
              <rect x="0" y="0" width="100" height="160" fill="#FFFFFF" opacity="0.08" />
            )}

            {/* C. Velvet Diffuse Glow */}
            {finishId === 'velvet' && (
              <ellipse cx="50" cy="80" rx="35" ry="50" fill="#FFFFFF" opacity="0.12" />
            )}

            {/* D. Holographic Rainbow Film */}
            {finishId === 'holographic' && (
              <rect
                x="0"
                y="0"
                width="100"
                height="160"
                fill={`url(#${holoGradId})`}
                className="mix-blend-overlay"
              />
            )}

            {/* Edge Specular Outline */}
            <path
              d="M 20 150 C 20 158 80 158 80 150 L 78 72 C 76 42, 58 22, 50 20 C 42 22, 24 42, 22 72 Z"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.9"
              strokeOpacity="0.3"
            />
          </g>
        </svg>
      </div>

      {/* Finger Label */}
      {showLabel && (
        <div 
          className="mt-2.5 flex flex-col items-center pointer-events-none"
          style={{
            marginTop: size !== 'thumbnail' ? `${8 + (finger.offsetY || 0)}px` : '4px'
          }}
        >
          <span className={`text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-center whitespace-nowrap transition-colors ${
            isSelected ? 'text-[#263D2B] font-extrabold' : 'text-[#6B7068] group-hover:text-[#10110F]'
          }`}>
            {finger.shortName}
          </span>
          <span 
            className="w-1.5 h-1.5 rounded-full border border-black/15 mt-1"
            style={{ backgroundColor: colorHex }}
          />
        </div>
      )}
    </div>
  );
}

export default function MixMatchFingerDesigner() {
  const navigate = useNavigate();

  // Active Selected Finger ('left-thumb', 'left-index', etc.)
  const [selectedFingerId, setSelectedFingerId] = useState('left-ring');

  // Master 10-Nails State
  const [nailsState, setNailsState] = useState(INITIAL_TEN_NAILS_STATE);

  // Smart Control States
  const [isSymmetrical, setIsSymmetrical] = useState(true);
  const [copiedDesign, setCopiedDesign] = useState(null);
  const [historyStack, setHistoryStack] = useState([]);
  const [customHexInput, setCustomHexInput] = useState('#263D2B');
  const [saveToast, setSaveToast] = useState(null);
  const [activeTab, setActiveTab] = useState('color'); // 'color' | 'pattern' | 'accent' | 'finish'
  const [handViewMode, setHandViewMode] = useState('both'); // 'both' | 'left' | 'right'

  // Current active finger config & design
  const activeFinger = useMemo(() => {
    return TEN_FINGERS.find(f => f.id === selectedFingerId) || TEN_FINGERS[3];
  }, [selectedFingerId]);

  const activeDesign = useMemo(() => {
    return nailsState[selectedFingerId] || DEFAULT_NAIL_DESIGN;
  }, [nailsState, selectedFingerId]);

  // Helper to commit changes and record undo stack
  const updateNails = (updaterFn) => {
    setHistoryStack(prev => [nailsState, ...prev.slice(0, 19)]);
    setNailsState(prev => updaterFn(prev));
  };

  // Update specific property on selected nail (and symmetrical counterpart if enabled)
  const handleUpdateProperty = (propName, value) => {
    updateNails(prev => {
      const updated = { ...prev };
      const current = { ...updated[selectedFingerId], [propName]: value };
      updated[selectedFingerId] = current;

      if (isSymmetrical && activeFinger.symmetryId) {
        updated[activeFinger.symmetryId] = {
          ...updated[activeFinger.symmetryId],
          [propName]: value
        };
      }
      return updated;
    });
  };

  // Undo recent change
  const handleUndo = () => {
    if (historyStack.length === 0) return;
    const previous = historyStack[0];
    setNailsState(previous);
    setHistoryStack(prev => prev.slice(1));
  };

  // Apply to All Nails
  const handleApplyToAll = () => {
    updateNails(prev => {
      const updated = {};
      TEN_FINGERS.forEach(f => {
        updated[f.id] = { ...activeDesign };
      });
      return updated;
    });
  };

  // Copy current design
  const handleCopyDesign = () => {
    setCopiedDesign({ ...activeDesign });
    setSaveToast(`Copied ${activeFinger.name} design!`);
    setTimeout(() => setSaveToast(null), 2500);
  };

  // Paste design to selected nail
  const handlePasteDesign = () => {
    if (!copiedDesign) return;
    updateNails(prev => {
      const updated = { ...prev };
      updated[selectedFingerId] = { ...copiedDesign };
      if (isSymmetrical && activeFinger.symmetryId) {
        updated[activeFinger.symmetryId] = { ...copiedDesign };
      }
      return updated;
    });
    setSaveToast(`Pasted onto ${activeFinger.name}!`);
    setTimeout(() => setSaveToast(null), 2500);
  };

  // Reset selected nail
  const handleResetSelected = () => {
    updateNails(prev => {
      const updated = { ...prev };
      updated[selectedFingerId] = { ...DEFAULT_NAIL_DESIGN };
      if (isSymmetrical && activeFinger.symmetryId) {
        updated[activeFinger.symmetryId] = { ...DEFAULT_NAIL_DESIGN };
      }
      return updated;
    });
  };

  // Reset All Nails
  const handleResetAll = () => {
    updateNails(() => INITIAL_TEN_NAILS_STATE);
  };

  // Randomize All Nails Coordinated
  const handleRandomizeAll = () => {
    const paletteShades = [...MIX_MATCH_COLORS].sort(() => 0.5 - Math.random());
    const primary = paletteShades[0];
    const accentColor = paletteShades[1];
    const patterns = ['solid', 'french-tip', 'cat-eye', 'glitter', 'abstract-swirls', 'marble'];
    const accents = ['none', 'rhinestones', 'pearls', 'tiny-flowers', 'metallic-details'];

    updateNails(() => {
      const updated = {};
      TEN_FINGERS.forEach(f => {
        const isAccent = f.isAccentDefault || f.id.includes('thumb');
        const color = isAccent ? accentColor : primary;
        const pat = isAccent 
          ? patterns[Math.floor(Math.random() * patterns.length)] 
          : 'solid';
        const acc = isAccent 
          ? accents[Math.floor(Math.random() * accents.length)] 
          : 'none';

        updated[f.id] = {
          colorHex: color.hex,
          colorId: color.id,
          patternId: pat,
          accentId: acc,
          finishId: 'glossy'
        };
      });
      return updated;
    });
  };

  // Apply Coordinated Theme
  const handleApplyTheme = (theme) => {
    updateNails(prev => theme.applyTheme(prev));
  };

  // Save My Design (Local / Session fallback)
  const handleSaveDesign = () => {
    try {
      const payload = {
        id: `mix-match-${Date.now()}`,
        nails: nailsState,
        createdAt: new Date().toISOString()
      };
      const existing = JSON.parse(localStorage.getItem('glfy_saved_mix_match_designs') || '[]');
      localStorage.setItem('glfy_saved_mix_match_designs', JSON.stringify([payload, ...existing.slice(0, 9)]));
      sessionStorage.setItem('glfy_latest_mix_match', JSON.stringify(payload));

      setSaveToast('✦ Manicure saved to your Atelier Portfolio!');
      setTimeout(() => setSaveToast(null), 3500);
    } catch (e) {
      setSaveToast('Design saved in session!');
      setTimeout(() => setSaveToast(null), 2500);
    }
  };

  // Book This Manicure
  const handleBookManicure = () => {
    try {
      // Calculate summary
      const uniqueColors = Array.from(new Set(Object.values(nailsState).map(n => n.colorId))).join(', ');
      const uniquePatterns = Array.from(new Set(Object.values(nailsState).map(n => n.patternId))).join(', ');
      const desc = `Bespoke 10-Finger Mix & Match Set: Colors (${uniqueColors}), Patterns (${uniquePatterns})`;
      sessionStorage.setItem('glfy_nail_design_request', desc);
    } catch (e) {}
    navigate('/book-appointment?service=nail-art-addon');
  };

  // Computed Telemetry
  const summaryData = useMemo(() => {
    const list = Object.values(nailsState);
    const uniqueColors = new Set(list.map(n => n.colorHex));
    const uniquePatterns = new Set(list.map(n => n.patternId));
    const uniqueAccents = new Set(list.filter(n => n.accentId !== 'none').map(n => n.accentId));
    const uniqueFinishes = new Set(list.map(n => n.finishId));

    return {
      totalColors: uniqueColors.size,
      totalPatterns: uniquePatterns.size,
      accentCount: list.filter(n => n.accentId !== 'none').length,
      finishesList: Array.from(uniqueFinishes).join(', ')
    };
  }, [nailsState]);

  // Separate left hand & right hand fingers
  const leftFingers = useMemo(() => TEN_FINGERS.filter(f => f.hand === 'left'), []);
  const rightFingers = useMemo(() => TEN_FINGERS.filter(f => f.hand === 'right'), []);

  return (
    <section 
      id="mix-match-finger-designer" 
      aria-label="Mix & Match Finger Designer"
      className="w-full bg-[#F7F4ED] text-[#10110F] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#DCE1D8] scroll-mt-24 select-none"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER                                                         */}
        {/* ========================================================================= */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>STEP 04 · FULL 10-FINGER BESPOKE LAB</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
            Mix &amp; Match Finger Designer
          </h2>

          <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto">
            Design all ten fingernails individually. Select any nail to curate bespoke colors, artistic patterns, micro-accents, and couture finishes.
          </p>
        </ScrollReveal>

        {/* Global Toast Notification */}
        {saveToast && (
          <div className="fixed top-24 right-6 z-50 bg-[#263D2B] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-lg animate-in fade-in slide-in-from-top-4 duration-200 flex items-center gap-2 border border-[#A8B5A0]/40">
            <CheckCircle2 className="w-4 h-4 text-[#A8B5A0]" />
            <span>{saveToast}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. MAIN 2-COLUMN DESIGNER WORKBENCH                                       */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ======================================================================= */}
          {/* LEFT / TOP: TEN-FINGER INTERACTIVE PREVIEW & TWO-HAND BED               */}
          {/* ======================================================================= */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-sm space-y-6">
            
            {/* Top Toolbar: Active Indicator, Symmetrical Toggle, Smart Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE1D8] pb-4">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
                  SELECTED NAIL
                </span>
                <span className="font-serif text-lg font-normal text-[#10110F] flex items-center gap-1.5">
                  <span>{activeFinger.name}</span>
                  {isSymmetrical && (
                    <span className="text-[10px] font-sans font-medium px-2 py-0.5 rounded-full bg-[#263D2B]/10 text-[#263D2B]">
                      ✦ Mirrored
                    </span>
                  )}
                </span>
              </div>

              {/* Symmetrical Design Toggle */}
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#DCE1D8] bg-[#F7F4ED] text-xs font-semibold text-[#10110F] cursor-pointer hover:bg-[#DCE1D8]/60 transition-colors">
                  <input
                    type="checkbox"
                    checked={isSymmetrical}
                    onChange={(e) => setIsSymmetrical(e.target.checked)}
                    className="w-3.5 h-3.5 rounded accent-[#263D2B] cursor-pointer"
                  />
                  <span className="text-[11px] uppercase tracking-wider">Symmetrical Hands</span>
                </label>

                {/* Undo Button */}
                <button
                  type="button"
                  onClick={handleUndo}
                  disabled={historyStack.length === 0}
                  className={`p-2 rounded-full border border-[#DCE1D8] transition-colors ${
                    historyStack.length === 0 
                      ? 'opacity-40 cursor-not-allowed text-[#6B7068]' 
                      : 'hover:bg-[#F7F4ED] text-[#10110F] cursor-pointer'
                  }`}
                  title="Undo last change"
                  aria-label="Undo last change"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleApplyToAll}
                  className="px-2.5 py-1 rounded-lg border border-[#DCE1D8] bg-white hover:bg-[#F7F4ED] text-[10.5px] font-semibold text-[#10110F] cursor-pointer transition-colors shadow-2xs"
                >
                  Apply to All
                </button>
                <button
                  type="button"
                  onClick={handleCopyDesign}
                  className="px-2.5 py-1 rounded-lg border border-[#DCE1D8] bg-white hover:bg-[#F7F4ED] text-[10.5px] font-semibold text-[#10110F] cursor-pointer transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <Copy className="w-3 h-3 text-[#263D2B]" />
                  <span>Copy</span>
                </button>
                <button
                  type="button"
                  onClick={handlePasteDesign}
                  disabled={!copiedDesign}
                  className={`px-2.5 py-1 rounded-lg border border-[#DCE1D8] text-[10.5px] font-semibold transition-colors flex items-center gap-1 shadow-2xs ${
                    copiedDesign 
                      ? 'bg-white hover:bg-[#F7F4ED] text-[#10110F] cursor-pointer' 
                      : 'opacity-40 bg-gray-50 text-[#6B7068] cursor-not-allowed'
                  }`}
                >
                  <ClipboardPaste className="w-3 h-3 text-[#263D2B]" />
                  <span>Paste</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetSelected}
                  className="px-2.5 py-1 rounded-lg border border-[#DCE1D8] bg-white hover:bg-[#F7F4ED] text-[10.5px] font-semibold text-[#6B7068] hover:text-[#10110F] cursor-pointer transition-colors shadow-2xs"
                >
                  Reset Nail
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleRandomizeAll}
                  className="px-3 py-1 rounded-lg border border-[#263D2B] bg-[#263D2B] text-white hover:bg-[#18271B] text-[10.5px] font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                >
                  <Shuffle className="w-3 h-3 text-white" />
                  <span>Randomize</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetAll}
                  className="p-1 rounded-lg border border-[#DCE1D8] hover:bg-[#F7F4ED] text-[#6B7068] hover:text-[#10110F] cursor-pointer"
                  title="Reset all ten nails"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* View Mode Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE1D8] pb-3 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] font-bold">
                MANICURE TRAY VIEW
              </span>

              <div className="flex items-center gap-1 p-1 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8]">
                <button
                  type="button"
                  onClick={() => setHandViewMode('both')}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    handViewMode === 'both' ? 'bg-[#263D2B] text-white shadow-2xs' : 'text-[#6B7068] hover:text-[#10110F]'
                  }`}
                >
                  Both Hands (10)
                </button>
                <button
                  type="button"
                  onClick={() => setHandViewMode('left')}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    handViewMode === 'left' ? 'bg-[#263D2B] text-white shadow-2xs' : 'text-[#6B7068] hover:text-[#10110F]'
                  }`}
                >
                  Left Hand
                </button>
                <button
                  type="button"
                  onClick={() => setHandViewMode('right')}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    handViewMode === 'right' ? 'bg-[#263D2B] text-white shadow-2xs' : 'text-[#6B7068] hover:text-[#10110F]'
                  }`}
                >
                  Right Hand
                </button>
              </div>
            </div>

            {/* TWO-HAND MAIN PRESENTATION BED */}
            <div className="relative w-full bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#ECE5D8] rounded-2xl border border-[#DCE1D8] p-4 sm:p-5 overflow-hidden flex flex-col justify-between min-h-[360px] select-none shadow-inner">
              
              {/* Luxury Studio Rings & Background Geometry */}
              <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
                <div className="w-[480px] h-[480px] rounded-full border border-[#263D2B]/30" />
                <div className="absolute w-[320px] h-[320px] rounded-full border border-dashed border-[#263D2B]/40" />
              </div>

              {/* Atelier Studio Watermark */}
              <div className="relative z-10 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.24em] text-[#6B7068]/70 border-b border-[#DCE1D8]/60 pb-2">
                <span>GLAM GIRL ATELIER</span>
                <span className="font-serif italic font-normal lowercase tracking-normal text-xs text-[#263D2B]">
                  Click any nail to customize
                </span>
                <span>OTTAWA PRIVATE SUITE</span>
              </div>

              {/* MODE 1: BOTH HANDS (Side-by-side or stacked dedicated pods) */}
              {handViewMode === 'both' && (
                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 items-end py-4">
                  {/* Left Hand Pod */}
                  <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-3 sm:p-4 border border-[#DCE1D8] shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center justify-between border-b border-[#DCE1D8]/60 pb-1.5 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
                        LEFT HAND
                      </span>
                      <span className="text-[9px] text-[#6B7068] font-mono">Pinky → Thumb</span>
                    </div>

                    <div className="flex items-end justify-center gap-2 sm:gap-2.5 pt-3 pb-1 min-h-[190px]">
                      {leftFingers.map((finger) => (
                        <SingleNailVisual
                          key={finger.id}
                          finger={finger}
                          design={nailsState[finger.id]}
                          isSelected={selectedFingerId === finger.id}
                          onClick={() => setSelectedFingerId(finger.id)}
                          size="normal"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right Hand Pod */}
                  <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-3 sm:p-4 border border-[#DCE1D8] shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center justify-between border-b border-[#DCE1D8]/60 pb-1.5 mb-2">
                      <span className="text-[9px] text-[#6B7068] font-mono">Thumb → Pinky</span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] flex items-center gap-1.5">
                        RIGHT HAND
                        <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
                      </span>
                    </div>

                    <div className="flex items-end justify-center gap-2 sm:gap-2.5 pt-3 pb-1 min-h-[190px]">
                      {rightFingers.map((finger) => (
                        <SingleNailVisual
                          key={finger.id}
                          finger={finger}
                          design={nailsState[finger.id]}
                          isSelected={selectedFingerId === finger.id}
                          onClick={() => setSelectedFingerId(finger.id)}
                          size="normal"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* MODE 2: LEFT HAND ATELIER FOCUS (Enlarged high-detail nails) */}
              {handViewMode === 'left' && (
                <div className="relative z-10 bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-[#DCE1D8] shadow-2xs my-3">
                  <div className="flex items-center justify-between border-b border-[#DCE1D8]/60 pb-2 mb-3">
                    <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#263D2B] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#263D2B]" />
                      LEFT HAND ATELIER DETAIL
                    </span>
                    <span className="text-[11px] text-[#6B7068]">Pinky → Ring → Middle → Index → Thumb</span>
                  </div>

                  <div className="flex items-end justify-center gap-4 sm:gap-6 py-6 min-h-[250px]">
                    {leftFingers.map((finger) => (
                      <SingleNailVisual
                        key={finger.id}
                        finger={finger}
                        design={nailsState[finger.id]}
                        isSelected={selectedFingerId === finger.id}
                        onClick={() => setSelectedFingerId(finger.id)}
                        size="large"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* MODE 3: RIGHT HAND ATELIER FOCUS (Enlarged high-detail nails) */}
              {handViewMode === 'right' && (
                <div className="relative z-10 bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-[#DCE1D8] shadow-2xs my-3">
                  <div className="flex items-center justify-between border-b border-[#DCE1D8]/60 pb-2 mb-3">
                    <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#263D2B] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#263D2B]" />
                      RIGHT HAND ATELIER DETAIL
                    </span>
                    <span className="text-[11px] text-[#6B7068]">Thumb → Index → Middle → Ring → Pinky</span>
                  </div>

                  <div className="flex items-end justify-center gap-4 sm:gap-6 py-6 min-h-[250px]">
                    {rightFingers.map((finger) => (
                      <SingleNailVisual
                        key={finger.id}
                        finger={finger}
                        design={nailsState[finger.id]}
                        isSelected={selectedFingerId === finger.id}
                        onClick={() => setSelectedFingerId(finger.id)}
                        size="large"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Visual Legend / Tip Bar */}
              <div className="relative z-10 pt-2 border-t border-[#DCE1D8]/60 flex flex-wrap items-center justify-between text-[10.5px] text-[#6B7068]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#263D2B]" />
                    <span>Active: <strong>{activeFinger.name}</strong></span>
                  </span>
                  <span>•</span>
                  <span>Ring Fingers Default Accents</span>
                </div>
                <div className="font-mono text-[9.5px] uppercase tracking-wider text-[#465640]">
                  10 Nails · Individual Control
                </div>
              </div>

            </div>

            {/* Clickable Finger Thumbnails Bar */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B7068] block">
                FINGER SELECTOR &amp; COLOR SWATCH MINI-MAP
              </span>

              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                {TEN_FINGERS.map((finger) => {
                  const isCur = selectedFingerId === finger.id;
                  const d = nailsState[finger.id];

                  return (
                    <button
                      key={finger.id}
                      type="button"
                      onClick={() => setSelectedFingerId(finger.id)}
                      className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-1 ${
                        isCur 
                          ? 'border-[#263D2B] bg-[#263D2B] text-white shadow-xs' 
                          : 'border-[#DCE1D8] bg-white hover:bg-[#F7F4ED] text-[#10110F]'
                      }`}
                    >
                      <div 
                        className="w-4 h-5 rounded-md border border-black/20"
                        style={{ backgroundColor: d.colorHex }}
                      />
                      <span className="text-[9px] font-bold truncate w-full block">
                        {finger.shortName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Curated Theme Quick Presets */}
            <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] flex items-center gap-1.5">
                  <Wand2 className="w-3.5 h-3.5 text-[#263D2B]" />
                  COORDINATED 10-NAIL ATELIER THEMES
                </span>
                <span className="text-[10px] text-[#6B7068]">1-Click Set</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {COORDINATED_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => handleApplyTheme(theme)}
                    className="p-2 rounded-xl bg-white hover:bg-[#263D2B] hover:text-white border border-[#DCE1D8] hover:border-[#263D2B] text-center text-xs font-semibold text-[#10110F] transition-all cursor-pointer shadow-2xs group"
                  >
                    <span className="block text-[11px] leading-tight">{theme.name}</span>
                    <span className="text-[9px] text-[#6B7068] group-hover:text-white/80 line-clamp-1 mt-0.5">
                      {theme.tagline}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* ======================================================================= */}
          {/* RIGHT / BOTTOM: CUSTOMIZATION CONTROLS PANEL FOR ACTIVE NAIL            */}
          {/* ======================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Control Panel Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DCE1D8] shadow-sm space-y-6">
              
              {/* Header with Active Finger Details */}
              <div className="flex items-center justify-between border-b border-[#DCE1D8] pb-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#263D2B] block">
                    CUSTOMIZING: {activeFinger.name.toUpperCase()}
                  </span>
                  <span className="font-serif text-base font-normal text-[#10110F]">
                    Choose Polish, Art &amp; Finish
                  </span>
                </div>

                <div 
                  className="w-7 h-7 rounded-full border border-black/20 shadow-inner"
                  style={{ backgroundColor: activeDesign.colorHex }}
                />
              </div>

              {/* 4 Tabs: Color | Pattern | Accent | Finish */}
              <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8]">
                {[
                  { id: 'color', label: 'Color' },
                  { id: 'pattern', label: 'Pattern' },
                  { id: 'accent', label: 'Accent' },
                  { id: 'finish', label: 'Finish' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === tab.id 
                        ? 'bg-[#263D2B] text-white shadow-xs' 
                        : 'text-[#6B7068] hover:text-[#10110F]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB 1: COLOR PALETTE (9 PRESETS + CUSTOM COLOR PICKER) */}
              {activeTab === 'color' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B7068] block">
                    ATELIER POLISH PALETTE
                  </span>

                  <div className="grid grid-cols-3 gap-2.5">
                    {MIX_MATCH_COLORS.map((col) => {
                      const isSel = activeDesign.colorHex.toLowerCase() === col.hex.toLowerCase();

                      return (
                        <button
                          key={col.id}
                          type="button"
                          onClick={() => handleUpdateProperty('colorHex', col.hex)}
                          className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                            isSel 
                              ? 'border-[#263D2B] bg-[#F7F4ED] ring-1 ring-[#263D2B]' 
                              : 'border-[#DCE1D8] bg-white hover:bg-[#F7F4ED]'
                          }`}
                        >
                          <div 
                            className="w-6 h-6 rounded-full border border-black/15 shadow-2xs flex-shrink-0 flex items-center justify-center"
                            style={{ backgroundColor: col.hex }}
                          >
                            {isSel && <Check className="w-3 h-3 text-white drop-shadow-sm" />}
                          </div>
                          <span className="text-xs font-medium text-[#10110F] truncate">
                            {col.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Color Picker Input */}
                  <div className="pt-2 border-t border-[#DCE1D8] flex items-center justify-between gap-3">
                    <span className="text-xs text-[#10110F] font-semibold">
                      Custom Color Picker:
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={activeDesign.colorHex}
                        onChange={(e) => handleUpdateProperty('colorHex', e.target.value)}
                        className="w-8 h-8 rounded-lg border border-[#DCE1D8] cursor-pointer"
                        title="Pick custom hex color"
                      />
                      <input
                        type="text"
                        value={activeDesign.colorHex.toUpperCase()}
                        onChange={(e) => {
                          if (e.target.value.startsWith('#')) {
                            handleUpdateProperty('colorHex', e.target.value);
                          }
                        }}
                        className="w-20 px-2 py-1 rounded-lg border border-[#DCE1D8] text-xs font-mono text-center uppercase"
                        maxLength={7}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PATTERNS (12 INTERACTIVE ART OPTIONS) */}
              {activeTab === 'pattern' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B7068] block">
                    NAIL ART PATTERN (12 COUTURE MOTIFS)
                  </span>

                  <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
                    {MIX_MATCH_PATTERNS.map((pat) => {
                      const isSel = activeDesign.patternId === pat.id;

                      return (
                        <button
                          key={pat.id}
                          type="button"
                          onClick={() => handleUpdateProperty('patternId', pat.id)}
                          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1 ${
                            isSel 
                              ? 'border-[#263D2B] bg-[#263D2B] text-white shadow-2xs' 
                              : 'border-[#DCE1D8] bg-white hover:bg-[#F7F4ED] text-[#10110F]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold">{pat.name}</span>
                            {isSel && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <span className={`text-[10px] line-clamp-1 leading-snug ${
                            isSel ? 'text-white/80' : 'text-[#6B7068]'
                          }`}>
                            {pat.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: ACCENTS (8 ORNAMENTS) */}
              {activeTab === 'accent' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B7068] block">
                    ACCENT EMBELLISHMENT (8 ATELIER ELEMENTS)
                  </span>

                  <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
                    {MIX_MATCH_ACCENTS.map((acc) => {
                      const isSel = activeDesign.accentId === acc.id;

                      return (
                        <button
                          key={acc.id}
                          type="button"
                          onClick={() => handleUpdateProperty('accentId', acc.id)}
                          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1 ${
                            isSel 
                              ? 'border-[#263D2B] bg-[#263D2B] text-white shadow-2xs' 
                              : 'border-[#DCE1D8] bg-white hover:bg-[#F7F4ED] text-[#10110F]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold">{acc.name}</span>
                            {isSel && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <span className={`text-[10px] line-clamp-1 leading-snug ${
                            isSel ? 'text-white/80' : 'text-[#6B7068]'
                          }`}>
                            {acc.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 4: FINISHES (5 COUTURE FINISHES) */}
              {activeTab === 'finish' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B7068] block">
                    SEALANT &amp; REFLECTION FINISH
                  </span>

                  <div className="space-y-2">
                    {MIX_MATCH_FINISHES.map((fin) => {
                      const isSel = activeDesign.finishId === fin.id;

                      return (
                        <button
                          key={fin.id}
                          type="button"
                          onClick={() => handleUpdateProperty('finishId', fin.id)}
                          className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                            isSel 
                              ? 'border-[#263D2B] bg-[#263D2B] text-white shadow-2xs' 
                              : 'border-[#DCE1D8] bg-white hover:bg-[#F7F4ED] text-[#10110F]'
                          }`}
                        >
                          <div>
                            <span className="text-xs font-bold block">{fin.name}</span>
                            <span className={`text-[10px] ${isSel ? 'text-white/80' : 'text-[#6B7068]'}`}>
                              {fin.description}
                            </span>
                          </div>
                          {isSel && <Check className="w-4 h-4 text-white" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* LIVE DESIGN SUMMARY BOX & BOOKING CTA */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DCE1D8] shadow-sm space-y-5">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#263D2B] block">
                  MANICURE DESIGN SUMMARY
                </span>
                <h3 className="font-serif text-lg font-normal text-[#10110F]">
                  Your Customized Set Telemetry
                </h3>
              </div>

              {/* Metrics Matrix */}
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-2.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <span className="text-[9px] font-bold text-[#6B7068] uppercase block">SHADES</span>
                  <span className="font-serif text-lg text-[#10110F]">{summaryData.totalColors} Colors</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <span className="text-[9px] font-bold text-[#6B7068] uppercase block">PATTERNS</span>
                  <span className="font-serif text-lg text-[#10110F]">{summaryData.totalPatterns} Motifs</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <span className="text-[9px] font-bold text-[#6B7068] uppercase block">ACCENTS</span>
                  <span className="font-serif text-lg text-[#10110F]">{summaryData.accentCount} Nails</span>
                </div>
              </div>

              {/* Action Buttons: Save & Book */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleSaveDesign}
                  className="w-full py-3 px-4 rounded-full border border-[#263D2B] bg-white hover:bg-[#F7F4ED] text-[#263D2B] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
                >
                  <Bookmark className="w-3.5 h-3.5 text-[#263D2B]" />
                  <span>Save My 10-Nail Design</span>
                </button>

                <button
                  type="button"
                  onClick={handleBookManicure}
                  className="w-full py-3.5 px-4 rounded-full bg-[#263D2B] hover:bg-[#18271B] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5 text-white" />
                  <span>Book This Manicure In Ottawa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-[10.5px] text-[#6B7068] text-center font-light italic">
                “Your customized 10-nail palette will be reviewed and perfected with master artist Janki during your private appointment.”
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
