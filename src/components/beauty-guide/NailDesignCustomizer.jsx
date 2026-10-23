import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  RotateCcw, 
  Shuffle, 
  Bookmark, 
  Calendar, 
  Check, 
  CheckCircle2, 
  ArrowRight, 
  Sliders, 
  Palette, 
  Layers, 
  Wand2,
  X,
  UserCheck,
  Info
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

// Helper: safe session user lookup
function getSessionUser() {
  try {
    const data = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('glfy_db_session_user') : null;
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

// 7 Nail Shapes with SVG silhouette data
export const NAIL_SHAPES = [
  {
    id: 'square',
    name: 'Square',
    tagline: 'Classic & Clean',
    description: 'Straight parallel sidewalls with sharp, 90-degree flat edges.',
    // SVG path normalized for viewBox 0 0 100 160
    path: 'M 20 150 C 20 158 80 158 80 150 L 80 40 L 20 40 Z',
    tipHighlightPath: 'M 20 40 L 80 40',
    accentTipHeight: 40
  },
  {
    id: 'squoval',
    name: 'Squoval',
    tagline: 'Soft & Modern',
    description: 'Flat horizontal free edge with softly curved, rounded corners.',
    path: 'M 20 150 C 20 158 80 158 80 150 L 80 48 C 80 40, 75 38, 68 38 L 32 38 C 25 38, 20 40, 20 48 Z',
    tipHighlightPath: 'M 22 46 C 26 40 74 40 78 46',
    accentTipHeight: 42
  },
  {
    id: 'round',
    name: 'Round',
    tagline: 'Natural & Chic',
    description: 'Straight sides that curve gracefully into a soft, circular arch.',
    path: 'M 20 150 C 20 158 80 158 80 150 L 80 62 C 80 34, 20 34, 20 62 Z',
    tipHighlightPath: 'M 22 58 C 30 38 70 38 78 58',
    accentTipHeight: 48
  },
  {
    id: 'oval',
    name: 'Oval',
    tagline: 'Timeless & Elongating',
    description: 'Softly tapering sides with an extended, elegant rounded tip.',
    path: 'M 20 150 C 20 158 80 158 80 150 L 80 68 C 80 26, 20 26, 20 68 Z',
    tipHighlightPath: 'M 24 62 C 34 30 66 30 76 62',
    accentTipHeight: 42
  },
  {
    id: 'almond',
    name: 'Almond',
    tagline: 'Graceful & Feminine',
    description: 'Tapering sides converging into a slender, softly rounded peak.',
    path: 'M 20 150 C 20 158 80 158 80 150 L 78 72 C 76 42, 58 22, 50 20 C 42 22, 24 42, 22 72 Z',
    tipHighlightPath: 'M 28 66 C 38 34 50 24 50 24 C 50 24 62 34 72 66',
    accentTipHeight: 34
  },
  {
    id: 'coffin',
    name: 'Coffin / Ballerina',
    tagline: 'Dramatic & Fashion-Forward',
    description: 'Tapered slender sides with a bold, flat squared-off tip.',
    path: 'M 20 150 C 20 158 80 158 80 150 L 78 74 L 66 24 L 34 24 L 22 74 Z',
    tipHighlightPath: 'M 34 24 L 66 24',
    accentTipHeight: 28
  },
  {
    id: 'stiletto',
    name: 'Stiletto',
    tagline: 'Bold & Striking',
    description: 'Dramatic sidewalls converging into an ultra-sharp stiletto point.',
    path: 'M 20 150 C 20 158 80 158 80 150 L 78 72 L 50 12 L 22 72 Z',
    tipHighlightPath: 'M 26 68 L 50 16 L 74 68',
    accentTipHeight: 22
  }
];

// Clickable Curated Nail Colors
export const NAIL_COLORS = [
  { id: 'classic-red', name: 'Classic Red', hex: '#B91C1C', textTone: 'light' },
  { id: 'nude-beige', name: 'Nude Beige', hex: '#D4B89C', textTone: 'dark' },
  { id: 'soft-pink', name: 'Soft Pink', hex: '#E8A7A1', textTone: 'dark' },
  { id: 'milky-white', name: 'Milky White', hex: '#F3F4F6', textTone: 'dark' },
  { id: 'forest-green', name: 'Forest Green', hex: '#263D2B', textTone: 'light' },
  { id: 'black', name: 'Atelier Black', hex: '#10110F', textTone: 'light' },
  { id: 'burgundy', name: 'Royal Burgundy', hex: '#6B1D2F', textTone: 'light' },
  { id: 'lavender', name: 'Lavender Mist', hex: '#B8A9C9', textTone: 'dark' },
  { id: 'chocolate-brown', name: 'Chocolate Brown', hex: '#4A2E1B', textTone: 'light' },
  { id: 'french-manicure', name: 'French Manicure', hex: '#F7D6D0', textTone: 'dark', isFrench: true }
];

// Nail Finishes with visual effect descriptors
export const NAIL_FINISHES = [
  {
    id: 'glossy',
    name: 'High Gloss',
    subtitle: 'Mirror-glass shine',
    description: 'Ultra-reflective salon gel topcoat with crystalline specular highlights.'
  },
  {
    id: 'matte',
    name: 'Velvet Matte',
    subtitle: 'Silky smooth finish',
    description: 'Zero-reflection frosted velvet coat with a modern, high-fashion finish.'
  },
  {
    id: 'chrome',
    name: 'Metallic Chrome',
    subtitle: 'Futuristic mirror sheen',
    description: 'Hand-buffed metallic powder creating an iridescent mirror reflection.'
  },
  {
    id: 'glitter',
    name: 'Glitter Shimmer',
    subtitle: 'Sparkling diamond dust',
    description: 'Suspended micro-glitter crystals catching light from every angle.'
  },
  {
    id: 'pearl',
    name: 'Opalescent Pearl',
    subtitle: 'Soft iridescent glow',
    description: 'Subtle mermaid pearl glaze reflecting ethereal pink and gold sheen.'
  },
  {
    id: 'cat-eye',
    name: 'Magnetic Cat-Eye',
    subtitle: '3D velvet depth',
    description: 'Rare-earth magnet particles aligned to create a shifting dimensional beam.'
  },
  {
    id: 'french-tips',
    name: 'French Tips',
    subtitle: 'Crisp porcelain tip smile',
    description: 'Iconic smile-line crescent tips on sheer natural nail bed.'
  }
];

// Optional Nail Art Designs
export const NAIL_ART_OPTIONS = [
  {
    id: 'none',
    name: 'No Nail Art',
    subtitle: 'Pure pristine lacquer',
    description: 'Clean, solid salon polish emphasizing the color and finish.'
  },
  {
    id: 'minimal-lines',
    name: 'Minimal Lines',
    subtitle: 'Fine gold & green linear accents',
    description: 'Delicate geometric pinstripe detailing for understated luxury.'
  },
  {
    id: 'floral-art',
    name: 'Floral Art',
    subtitle: 'Hand-painted botanical petals',
    description: 'Fine-brush jasmine and botanical petals painted near the cuticle.'
  },
  {
    id: 'glitter-accent',
    name: 'Glitter Accent',
    subtitle: 'Cascade sparkle on accent nail',
    description: 'Diamond dust cascade drifting down the ring finger and thumb.'
  },
  {
    id: 'geometric',
    name: 'Geometric Patterns',
    subtitle: 'Modernist chevron & angles',
    description: 'Clean negative-space lines and contemporary angular framing.'
  }
];

// 5 Finger Proportions (Thumb, Index, Middle, Ring, Pinky)
const FINGERS_CONFIG = [
  { id: 'thumb', label: 'Thumb', scaleY: 0.95, width: 72, height: 140, isAccent: true, tilt: -4 },
  { id: 'index', label: 'Index', scaleY: 0.98, width: 64, height: 150, isAccent: false, tilt: -1.5 },
  { id: 'middle', label: 'Middle', scaleY: 1.05, width: 66, height: 160, isAccent: false, tilt: 0 },
  { id: 'ring', label: 'Ring', scaleY: 1.00, width: 62, height: 152, isAccent: true, tilt: 1.5 },
  { id: 'pinky', label: 'Pinky', scaleY: 0.88, width: 52, height: 130, isAccent: false, tilt: 4 }
];

export default function NailDesignCustomizer() {
  const navigate = useNavigate();

  // Selected State
  const [selectedShape, setSelectedShape] = useState(NAIL_SHAPES[4]); // Almond by default
  const [selectedColor, setSelectedColor] = useState(NAIL_COLORS[4]); // Forest Green
  const [customHexColor, setCustomHexColor] = useState('#263D2B');
  const [isCustomColorActive, setIsCustomColorActive] = useState(false);

  const [selectedFinish, setSelectedFinish] = useState(NAIL_FINISHES[0]); // High Gloss
  const [selectedArt, setSelectedArt] = useState(NAIL_ART_OPTIONS[0]); // None

  // Active Tab in customizer panel (shapes, colors, finishes, art)
  const [activeTab, setActiveTab] = useState('shape');

  // Saving state
  const [saveStatus, setSaveStatus] = useState(null); // 'saving', 'saved', 'error'
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  // Active color computed value
  const activeHex = useMemo(() => {
    return isCustomColorActive ? customHexColor : selectedColor.hex;
  }, [isCustomColorActive, customHexColor, selectedColor]);

  const activeColorName = useMemo(() => {
    return isCustomColorActive ? `Custom (${customHexColor.toUpperCase()})` : selectedColor.name;
  }, [isCustomColorActive, customHexColor, selectedColor]);

  // Reset to default
  const handleReset = () => {
    setSelectedShape(NAIL_SHAPES[4]); // Almond
    setSelectedColor(NAIL_COLORS[4]); // Forest Green
    setIsCustomColorActive(false);
    setSelectedFinish(NAIL_FINISHES[0]); // High Gloss
    setSelectedArt(NAIL_ART_OPTIONS[0]); // None
    setSaveStatus(null);
  };

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
        // Save to patron account
        const storageKey = `glfy_saved_nail_designs_${user.id}`;
        const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
        const updated = [designPayload, ...existing.slice(0, 9)];
        localStorage.setItem(storageKey, JSON.stringify(updated));
        
        setTimeout(() => {
          setSaveStatus('saved');
          setTimeout(() => setSaveStatus(null), 3500);
        }, 500);
      } else {
        // Save guest draft and prompt login
        localStorage.setItem('glfy_pending_nail_design', JSON.stringify(designPayload));
        setTimeout(() => {
          setSaveStatus('saved');
          setShowAuthPrompt(true);
        }, 400);
      }
    } catch (err) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  // Handle Book this design
  const handleBookDesign = () => {
    // Determine appropriate nail service
    let serviceId = 'gel-manicure';
    if (selectedFinish.id === 'chrome' || selectedArt.id !== 'none') {
      serviceId = 'gel-manicure';
    } else {
      serviceId = 'classic-manicure';
    }

    // Persist design specs to session storage for booking form
    try {
      const designSpec = `${selectedShape.name} shape, ${activeColorName} color, ${selectedFinish.name} finish, ${selectedArt.name}`;
      sessionStorage.setItem('glfy_nail_design_request', designSpec);
    } catch (e) {}

    navigate(`/book-appointment?service=${serviceId}`);
  };

  return (
    <section id="nail-design-customizer" className="mt-20 sm:mt-28 lg:mt-32 pt-16 sm:pt-20 border-t border-[#DCE1D8] scroll-mt-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ===================================================================== */}
        {/* 1. SECTION HEADER                                                     */}
        {/* ===================================================================== */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
            <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.26em] text-[#263D2B]">
              INTERACTIVE ATELIER STUDIO
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
            Design Your Signature Nails
          </h2>

          <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

          <p className="font-sans text-sm sm:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto pt-1 italic">
            &ldquo;Your style, your colors, your perfect nail look.&rdquo;
          </p>
        </ScrollReveal>

        {/* ===================================================================== */}
        {/* 2. MAIN WORKBENCH: 2-COLUMN LAYOUT (PREVIEW LEFT/TOP, CONTROLS RIGHT)  */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* =================================================================== */}
          {/* LEFT: 5-FINGER LIVE MANICURE PREVIEW                                */}
          {/* =================================================================== */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-sm flex flex-col justify-between space-y-6 lg:sticky lg:top-28">
            
            {/* Top Toolbar: Reset & Inspire Me buttons */}
            <div className="flex items-center justify-between border-b border-[#DCE1D8] pb-4">
              <div className="space-y-0.5">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
                  MANICURE PREVIEW
                </span>
                <span className="text-xs text-[#6B7068] font-light">
                  5-Finger Coordinated Atelier Hand
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRandomize}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#DCE1D8] hover:border-[#263D2B] bg-[#F7F4ED] hover:bg-white text-[10.5px] font-bold uppercase tracking-wider text-[#263D2B] transition-colors cursor-pointer shadow-2xs"
                  title="Randomize combination"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Inspire Me</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-8 h-8 rounded-full border border-[#DCE1D8] hover:border-[#10110F] bg-white text-[#6B7068] hover:text-[#10110F] flex items-center justify-center transition-colors cursor-pointer"
                  title="Reset to default"
                  aria-label="Reset customizer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Hand Presentation Bed */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl bg-gradient-to-b from-[#EFECE4] via-[#F7F4ED] to-[#EAE6DC] p-4 sm:p-6 flex items-end justify-center overflow-hidden border border-[#DCE1D8] shadow-inner">
              
              {/* Subtle Atelier Watermark */}
              <div className="absolute top-4 left-4 text-[10px] font-mono tracking-widest text-[#263D2B]/30 uppercase pointer-events-none select-none">
                GLAM GIRL • BESPOKE NAILS
              </div>

              {/* 5 Finger Display Row */}
              <div className="flex items-end justify-center gap-2.5 sm:gap-4 md:gap-5 w-full max-w-md pb-2">
                {FINGERS_CONFIG.map((finger) => {
                  const isAccent = finger.isAccent;
                  const isFrenchActive = selectedColor.isFrench || selectedFinish.id === 'french-tips';

                  return (
                    <div
                      key={finger.id}
                      className="flex flex-col items-center transition-transform duration-300 group"
                      style={{
                        transform: `rotate(${finger.tilt}deg)`
                      }}
                    >
                      {/* Finger Digit Silhouette Base */}
                      <div className="relative flex flex-col items-center">
                        
                        {/* Interactive SVG Nail */}
                        <div 
                          className="relative drop-shadow-md transition-all duration-300"
                          style={{
                            width: `${finger.width}px`,
                            height: `${finger.height * 0.72}px`
                          }}
                        >
                          <svg
                            viewBox="0 0 100 160"
                            className="w-full h-full overflow-visible"
                            preserveAspectRatio="none"
                          >
                            <defs>
                              {/* 1. Base Nail Color Linear Gradient with 3D cylindrical lighting */}
                              <linearGradient id={`nail-base-${finger.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#000" stopOpacity="0.25" />
                                <stop offset="25%" stopColor={activeHex} />
                                <stop offset="60%" stopColor={activeHex} />
                                <stop offset="100%" stopColor="#000" stopOpacity="0.35" />
                              </linearGradient>

                              {/* 2. Chrome Metallic Gradient Overlay */}
                              <linearGradient id={`finish-chrome-${finger.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                                <stop offset="20%" stopColor="#B3B3B3" stopOpacity="0.2" />
                                <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.9" />
                                <stop offset="60%" stopColor="#DCE1D8" stopOpacity="0.3" />
                                <stop offset="85%" stopColor="#FFFFFF" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#808080" stopOpacity="0.4" />
                              </linearGradient>

                              {/* 3. Glossy Specular Curved Highlight */}
                              <linearGradient id="gloss-specular" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
                                <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
                              </linearGradient>

                              {/* 4. Pearl Opalescent Shimmer Gradient */}
                              <linearGradient id="pearl-shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFD1DC" stopOpacity="0.5" />
                                <stop offset="35%" stopColor="#E0FFFF" stopOpacity="0.4" />
                                <stop offset="70%" stopColor="#FFFACD" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#E6E6FA" stopOpacity="0.6" />
                              </linearGradient>

                              {/* 5. Cat-Eye 3D Magnetic Light Beam */}
                              <linearGradient id="cat-eye-beam" x1="20%" y1="0%" x2="80%" y2="100%">
                                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                                <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.1" />
                                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.85" />
                                <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                              </linearGradient>

                              {/* ClipPath of the selected Nail Shape for layered rendering */}
                              <clipPath id={`nail-clip-${finger.id}`}>
                                <path d={selectedShape.path} />
                              </clipPath>
                            </defs>

                            {/* Base Nail Silhouette Fill */}
                            <path
                              d={selectedShape.path}
                              fill={`url(#nail-base-${finger.id})`}
                              stroke="#10110F"
                              strokeWidth="1.2"
                              strokeOpacity="0.2"
                              className="transition-all duration-300"
                            />

                            {/* Group clipped to nail shape for realistic layered finishes & art */}
                            <g clipPath={`url(#nail-clip-${finger.id})`}>
                              
                              {/* French Manicure Base & White Tip Smile Curve */}
                              {isFrenchActive && (
                                <g>
                                  {/* Porcelain French Tip */}
                                  <path
                                    d={`M 0 0 L 100 0 L 100 ${selectedShape.accentTipHeight + 8} Q 50 ${selectedShape.accentTipHeight + 22} 0 ${selectedShape.accentTipHeight + 8} Z`}
                                    fill="#FFFFFF"
                                    fillOpacity="0.95"
                                  />
                                  {/* Fine French Smile line accent */}
                                  <path
                                    d={`M 0 ${selectedShape.accentTipHeight + 8} Q 50 ${selectedShape.accentTipHeight + 22} 100 ${selectedShape.accentTipHeight + 8}`}
                                    fill="none"
                                    stroke="#DCE1D8"
                                    strokeWidth="1"
                                  />
                                </g>
                              )}

                              {/* Finish Layer: Chrome metallic sheen */}
                              {selectedFinish.id === 'chrome' && (
                                <rect
                                  x="0"
                                  y="0"
                                  width="100"
                                  height="160"
                                  fill={`url(#finish-chrome-${finger.id})`}
                                  style={{ mixBlendMode: 'overlay' }}
                                />
                              )}

                              {/* Finish Layer: Pearl opalescent glow */}
                              {selectedFinish.id === 'pearl' && (
                                <rect
                                  x="0"
                                  y="0"
                                  width="100"
                                  height="160"
                                  fill="url(#pearl-shimmer)"
                                  style={{ mixBlendMode: 'color-dodge' }}
                                />
                              )}

                              {/* Finish Layer: Cat-Eye magnetic light beam */}
                              {selectedFinish.id === 'cat-eye' && (
                                <rect
                                  x="0"
                                  y="0"
                                  width="100"
                                  height="160"
                                  fill="url(#cat-eye-beam)"
                                />
                              )}

                              {/* Finish Layer: Glitter micro-crystals */}
                              {selectedFinish.id === 'glitter' && (
                                <g fill="#FFFFFF" fillOpacity="0.75">
                                  <circle cx="35" cy="45" r="1.5" />
                                  <circle cx="65" cy="55" r="2" />
                                  <circle cx="45" cy="75" r="1.5" />
                                  <circle cx="55" cy="95" r="2.2" />
                                  <circle cx="30" cy="110" r="1.8" />
                                  <circle cx="70" cy="115" r="1.5" />
                                  <circle cx="48" cy="130" r="2" />
                                  <circle cx="58" cy="35" r="1.2" />
                                  {/* Starburst sparkle */}
                                  <path d="M 50 60 L 52 64 L 56 65 L 52 66 L 50 70 L 48 66 L 44 65 L 48 64 Z" fill="#FFFFFF" />
                                </g>
                              )}

                              {/* Finish Layer: Velvet Matte diffuse texture */}
                              {selectedFinish.id === 'matte' && (
                                <rect
                                  x="0"
                                  y="0"
                                  width="100"
                                  height="160"
                                  fill="#000000"
                                  fillOpacity="0.12"
                                />
                              )}

                              {/* Nail Art: Minimal Lines */}
                              {selectedArt.id === 'minimal-lines' && (
                                <g stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.85">
                                  <line x1="50" y1="20" x2="50" y2="150" />
                                  <line x1="25" y1="90" x2="75" y2="90" />
                                  <circle cx="50" cy="90" r="2.5" fill="#FFFFFF" />
                                </g>
                              )}

                              {/* Nail Art: Floral Art (accentuated on ring & thumb) */}
                              {selectedArt.id === 'floral-art' && (
                                <g fill="#FFFFFF" fillOpacity="0.9" stroke="#263D2B" strokeWidth="0.5">
                                  {/* Petals radiating from lower lateral cuticle */}
                                  <circle cx="35" cy="120" r="4.5" />
                                  <circle cx="42" cy="115" r="4" />
                                  <circle cx="45" cy="123" r="4" />
                                  <circle cx="40" cy="128" r="4" />
                                  <circle cx="33" cy="125" r="3.5" />
                                  <circle cx="39" cy="121" r="2.5" fill="#263D2B" />
                                  {/* Delicate vine branch */}
                                  <path d="M 39 121 Q 50 100 60 85" fill="none" stroke="#FFFFFF" strokeWidth="1" />
                                  <circle cx="58" cy="88" r="2.2" />
                                </g>
                              )}

                              {/* Nail Art: Glitter Accent (applied heavily on accent finger) */}
                              {selectedArt.id === 'glitter-accent' && (
                                <g fill="#FFFFFF" fillOpacity={isAccent ? '0.9' : '0.4'}>
                                  <circle cx="40" cy="35" r="2" />
                                  <circle cx="60" cy="40" r="1.5" />
                                  <circle cx="50" cy="50" r="2.5" />
                                  <circle cx="35" cy="65" r="1.8" />
                                  <circle cx="65" cy="70" r="2.2" />
                                  <path d="M 50 35 L 51 38 L 54 39 L 51 40 L 50 43 L 49 40 L 46 39 L 49 38 Z" fill="#FFFFFF" />
                                </g>
                              )}

                              {/* Nail Art: Geometric Modernist Chevron */}
                              {selectedArt.id === 'geometric' && (
                                <g stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.85" fill="none">
                                  <path d="M 25 70 L 50 90 L 75 70" />
                                  <path d="M 30 85 L 50 102 L 70 85" />
                                  <circle cx="50" cy="90" r="2" fill="#FFFFFF" />
                                </g>
                              )}

                              {/* Glossy Curved Highlight Overlay (if not matte) */}
                              {selectedFinish.id !== 'matte' && (
                                <path
                                  d="M 28 35 C 24 55, 24 110, 32 140 C 35 140, 38 55, 34 35 Z"
                                  fill="url(#gloss-specular)"
                                />
                              )}

                            </g>
                          </svg>
                        </div>

                        {/* Finger Flesh Pad Base Underneath */}
                        <div 
                          className="w-full bg-[#E5B5A1]/85 rounded-b-2xl shadow-xs -mt-1.5"
                          style={{
                            height: '24px',
                            width: `${finger.width * 0.9}px`
                          }}
                        />

                        {/* Finger Label */}
                        <span className="text-[10px] font-sans text-[#6B7068] font-medium pt-1">
                          {finger.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Design Summary Pill & Actions */}
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                  SELECTED NAIL SPECIFICATIONS:
                </span>
                
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white text-xs font-semibold text-[#10110F] border border-[#DCE1D8]">
                    Shape: <strong>{selectedShape.name}</strong>
                  </span>
                  
                  <span className="px-3 py-1 rounded-full bg-white text-xs font-semibold text-[#10110F] border border-[#DCE1D8] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: activeHex }} />
                    <span>Color: <strong>{activeColorName}</strong></span>
                  </span>

                  <span className="px-3 py-1 rounded-full bg-white text-xs font-semibold text-[#10110F] border border-[#DCE1D8]">
                    Finish: <strong>{selectedFinish.name}</strong>
                  </span>

                  <span className="px-3 py-1 rounded-full bg-white text-xs font-semibold text-[#10110F] border border-[#DCE1D8]">
                    Art: <strong>{selectedArt.name}</strong>
                  </span>
                </div>
              </div>

              {/* Dual Action Buttons: Save My Design & Book This Nail Design */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={handleSaveDesign}
                  disabled={saveStatus === 'saving'}
                  className="w-full sm:flex-1 py-3 px-4 rounded-[4px] border border-[#263D2B] text-[#263D2B] hover:bg-[#263D2B] hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-60"
                >
                  {saveStatus === 'saving' ? (
                    <span>Saving...</span>
                  ) : saveStatus === 'saved' ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Design Saved!</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4" />
                      <span>Save My Design</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleBookDesign}
                  className="w-full sm:flex-1 py-3 px-4 rounded-[4px] bg-[#263D2B] hover:bg-[#1C2E20] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book This Nail Design</span>
                </button>
              </div>

              {/* Guest Auth Prompt Notice */}
              {showAuthPrompt && (
                <div className="p-3.5 rounded-xl bg-white border border-[#263D2B]/30 shadow-xs flex items-center justify-between text-xs text-[#10110F] animate-fade-in">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
                    <span>Design saved to device. Sign in to sync across your patron dashboard.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAuthPrompt(false)}
                    className="text-[#6B7068] hover:text-[#10110F] p-1"
                    aria-label="Dismiss notice"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* =================================================================== */}
          {/* RIGHT: INTERACTIVE CUSTOMIZATION CONTROLS PANEL                     */}
          {/* =================================================================== */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-xs space-y-6">
            
            {/* Customizer Tabs Navigation */}
            <div className="flex items-center justify-start border-b border-[#DCE1D8] overflow-x-auto pb-2 gap-2 scrollbar-none">
              {[
                { id: 'shape', label: '1. Shape', count: NAIL_SHAPES.length },
                { id: 'color', label: '2. Color', count: NAIL_COLORS.length + 1 },
                { id: 'finish', label: '3. Finish', count: NAIL_FINISHES.length },
                { id: 'art', label: '4. Nail Art', count: NAIL_ART_OPTIONS.length }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#263D2B] text-white shadow-xs'
                        : 'bg-[#F7F4ED] text-[#6B7068] hover:text-[#10110F] hover:bg-white border border-[#DCE1D8]'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT: 1. NAIL SHAPES */}
            {activeTab === 'shape' && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-1">
                  <h4 className="font-serif text-lg text-[#10110F] font-normal">
                    Select Your Nail Silhouette
                  </h4>
                  <p className="text-xs text-[#6B7068] font-light">
                    Every shape alters the elongation, structural durability, and look of your manicure.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {NAIL_SHAPES.map((shape) => {
                    const isSelected = selectedShape.id === shape.id;

                    return (
                      <button
                        key={shape.id}
                        type="button"
                        onClick={() => setSelectedShape(shape)}
                        className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-3.5 group ${
                          isSelected
                            ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-sm'
                            : 'bg-[#F7F4ED]/50 hover:bg-[#F7F4ED] border-[#DCE1D8] text-[#10110F]'
                        }`}
                      >
                        {/* Visual Thumbnail for Shape */}
                        <div className={`w-9 h-11 rounded-xl flex items-center justify-center p-1 border transition-colors flex-shrink-0 ${
                          isSelected ? 'bg-white/15 border-white/30 text-white' : 'bg-white border-[#DCE1D8] text-[#263D2B]'
                        }`}>
                          <svg viewBox="0 0 100 160" className="w-5 h-8 overflow-visible">
                            <path
                              d={shape.path}
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          </svg>
                        </div>

                        <div className="space-y-0.5 flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-serif font-bold ${isSelected ? 'text-white' : 'text-[#10110F]'}`}>
                              {shape.name}
                            </span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                          </div>
                          <span className={`text-[10.5px] block font-light ${isSelected ? 'text-white/80' : 'text-[#6B7068]'}`}>
                            {shape.tagline}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB CONTENT: 2. NAIL COLORS */}
            {activeTab === 'color' && (
              <div className="space-y-5 animate-fade-in">
                <div className="space-y-1">
                  <h4 className="font-serif text-lg text-[#10110F] font-normal">
                    Select Your Nail Polish Hue
                  </h4>
                  <p className="text-xs text-[#6B7068] font-light">
                    Choose from our signature salon shades or use the custom color picker.
                  </p>
                </div>

                {/* Swatches Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {NAIL_COLORS.map((c) => {
                    const isSelected = !isCustomColorActive && selectedColor.id === c.id;

                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setSelectedColor(c);
                          setIsCustomColorActive(false);
                        }}
                        className={`p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center gap-2.5 text-left group ${
                          isSelected
                            ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-sm ring-1 ring-[#263D2B]'
                            : 'bg-white hover:bg-[#F7F4ED] border-[#DCE1D8] text-[#10110F]'
                        }`}
                      >
                        {/* Swatch circle */}
                        <div 
                          className="w-7 h-7 rounded-full border border-black/20 shadow-xs flex-shrink-0 flex items-center justify-center relative overflow-hidden"
                          style={{ backgroundColor: c.hex }}
                        >
                          {c.isFrench && (
                            <div className="absolute top-0 left-0 right-0 h-2 bg-white border-b border-gray-300" />
                          )}
                          {isSelected && (
                            <Check className={`w-3.5 h-3.5 stroke-[3] ${c.textTone === 'light' ? 'text-white' : 'text-black'}`} />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <span className={`text-xs font-semibold block truncate ${isSelected ? 'text-white' : 'text-[#10110F]'}`}>
                            {c.name}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Color Picker Widget */}
                <div className="pt-4 border-t border-[#DCE1D8]">
                  <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <input
                          type="color"
                          value={customHexColor}
                          onChange={(e) => {
                            setCustomHexColor(e.target.value);
                            setIsCustomColorActive(true);
                          }}
                          className="w-10 h-10 rounded-xl cursor-pointer border border-[#DCE1D8] p-0.5 bg-white shadow-xs"
                          aria-label="Custom color picker"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-[#10110F] block">
                          Custom Palette Tone
                        </span>
                        <span className="text-[11px] font-mono text-[#6B7068]">
                          {customHexColor.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsCustomColorActive(true)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                        isCustomColorActive
                          ? 'bg-[#263D2B] text-white shadow-xs'
                          : 'bg-white hover:bg-[#263D2B] text-[#263D2B] hover:text-white border border-[#DCE1D8]'
                      }`}
                    >
                      {isCustomColorActive ? 'Active Custom Color' : 'Use Custom Color'}
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* TAB CONTENT: 3. NAIL FINISHES */}
            {activeTab === 'finish' && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-1">
                  <h4 className="font-serif text-lg text-[#10110F] font-normal">
                    Select Your Nail Finish
                  </h4>
                  <p className="text-xs text-[#6B7068] font-light">
                    From crystalline mirror-gloss to opalescent pearl and magnetic cat-eye.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {NAIL_FINISHES.map((finish) => {
                    const isSelected = selectedFinish.id === finish.id;

                    return (
                      <button
                        key={finish.id}
                        type="button"
                        onClick={() => setSelectedFinish(finish)}
                        className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-2 group ${
                          isSelected
                            ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-sm'
                            : 'bg-[#F7F4ED]/50 hover:bg-[#F7F4ED] border-[#DCE1D8] text-[#10110F]'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className={`text-xs font-serif font-bold ${isSelected ? 'text-white' : 'text-[#10110F]'}`}>
                            {finish.name}
                          </span>
                          {isSelected ? (
                            <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                          ) : (
                            <span className="text-[10px] text-[#263D2B] font-mono uppercase bg-white px-2 py-0.5 rounded-full border border-[#DCE1D8]">
                              Effect
                            </span>
                          )}
                        </div>

                        <p className={`text-[11px] font-light leading-relaxed ${isSelected ? 'text-white/80' : 'text-[#6B7068]'}`}>
                          {finish.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB CONTENT: 4. OPTIONAL NAIL ART */}
            {activeTab === 'art' && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-1">
                  <h4 className="font-serif text-lg text-[#10110F] font-normal">
                    Optional Hand-Painted Nail Art
                  </h4>
                  <p className="text-xs text-[#6B7068] font-light">
                    Add handcrafted artistic accents painted by master artist Janki Khatroja.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {NAIL_ART_OPTIONS.map((art) => {
                    const isSelected = selectedArt.id === art.id;

                    return (
                      <button
                        key={art.id}
                        type="button"
                        onClick={() => setSelectedArt(art)}
                        className={`w-full p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-sm'
                            : 'bg-[#F7F4ED]/50 hover:bg-[#F7F4ED] border-[#DCE1D8] text-[#10110F]'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-serif font-bold ${isSelected ? 'text-white' : 'text-[#10110F]'}`}>
                              {art.name}
                            </span>
                            <span className={`text-[10px] uppercase font-mono px-2 py-0.2 rounded-full ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#263D2B] border border-[#DCE1D8]'
                            }`}>
                              {art.subtitle}
                            </span>
                          </div>
                          <p className={`text-[11px] font-light leading-relaxed ${isSelected ? 'text-white/80' : 'text-[#6B7068]'}`}>
                            {art.description}
                          </p>
                        </div>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-white text-[#263D2B] flex items-center justify-center flex-shrink-0 shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
