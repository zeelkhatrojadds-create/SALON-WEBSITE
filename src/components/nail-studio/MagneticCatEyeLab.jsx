import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  RotateCcw, 
  Shuffle, 
  Bookmark, 
  Calendar, 
  Download, 
  CheckCircle2, 
  Sliders, 
  Compass, 
  Layers, 
  Zap, 
  ArrowRight, 
  Check, 
  Info,
  Wand2
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import { 
  MAGNETIC_COLORS, 
  MAGNETIC_FINISHES, 
  MAGNETIC_SHAPES, 
  MAGNETIC_PRESETS 
} from '../../data/magneticCatEyeData';

export default function MagneticCatEyeLab() {
  const navigate = useNavigate();

  // Active Lab State
  const [selectedColor, setSelectedColor] = useState(MAGNETIC_COLORS[0]); // Emerald Green
  const [selectedFinish, setSelectedFinish] = useState(MAGNETIC_FINISHES[0]); // Glossy
  const [selectedShape, setSelectedShape] = useState(MAGNETIC_SHAPES[0]); // Almond
  const [bandPosition, setBandPosition] = useState(50); // 0 to 100 %
  const [bandAngle, setBandAngle] = useState(45); // -90 to +90 deg
  const [shimmerIntensity, setShimmerIntensity] = useState(95); // 30 to 100 %

  // Interaction & Feedback States
  const [isDraggingWand, setIsDraggingWand] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'saving', 'saved', 'error'
  const [downloadStatus, setDownloadStatus] = useState(null); // 'generating', 'success'
  const [activePresetId, setActivePresetId] = useState('emerald-galaxy');

  const previewBedRef = useRef(null);

  // Default Reset
  const handleReset = () => {
    setSelectedColor(MAGNETIC_COLORS[0]);
    setSelectedFinish(MAGNETIC_FINISHES[0]);
    setSelectedShape(MAGNETIC_SHAPES[0]);
    setBandPosition(50);
    setBandAngle(45);
    setShimmerIntensity(95);
    setActivePresetId('emerald-galaxy');
    setSaveStatus(null);
  };

  // Shuffle Look
  const handleShuffle = () => {
    const randomColor = MAGNETIC_COLORS[Math.floor(Math.random() * MAGNETIC_COLORS.length)];
    const randomFinish = MAGNETIC_FINISHES[Math.floor(Math.random() * MAGNETIC_FINISHES.length)];
    const randomShape = MAGNETIC_SHAPES[Math.floor(Math.random() * MAGNETIC_SHAPES.length)];
    const randomPos = Math.floor(Math.random() * 60) + 20; // 20% to 80%
    const randomAngle = Math.floor(Math.random() * 140) - 70; // -70° to +70°
    const randomIntensity = Math.floor(Math.random() * 30) + 70; // 70% to 100%

    setSelectedColor(randomColor);
    setSelectedFinish(randomFinish);
    setSelectedShape(randomShape);
    setBandPosition(randomPos);
    setBandAngle(randomAngle);
    setShimmerIntensity(randomIntensity);
    setActivePresetId(null);
  };

  // Apply Preset
  const handleApplyPreset = (preset) => {
    const color = MAGNETIC_COLORS.find(c => c.id === preset.colorId) || MAGNETIC_COLORS[0];
    const finish = MAGNETIC_FINISHES.find(f => f.id === preset.finishId) || MAGNETIC_FINISHES[0];
    const shape = MAGNETIC_SHAPES.find(s => s.id === preset.shapeId) || MAGNETIC_SHAPES[0];

    setSelectedColor(color);
    setSelectedFinish(finish);
    setSelectedShape(shape);
    setBandPosition(preset.bandPosition);
    setBandAngle(preset.bandAngle);
    setShimmerIntensity(preset.shimmerIntensity);
    setActivePresetId(preset.id);
  };

  // Pointer drag control for moving the magnetic light band on the preview
  const handlePointerDown = (e) => {
    setIsDraggingWand(true);
    handlePointerMove(e);
  };

  const handlePointerMove = (e) => {
    if (!previewBedRef.current) return;
    const rect = previewBedRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    // Map X to band position (20% to 80%)
    const newPos = Math.round(20 + x * 60);
    setBandPosition(newPos);

    // Map Y to angle shift (-75° to +75°)
    const newAngle = Math.round((y - 0.5) * 150);
    setBandAngle(newAngle);
    setActivePresetId(null);
  };

  useEffect(() => {
    const handleGlobalPointerUp = () => {
      if (isDraggingWand) setIsDraggingWand(false);
    };
    const handleGlobalPointerMove = (e) => {
      if (isDraggingWand) handlePointerMove(e);
    };

    if (isDraggingWand) {
      window.addEventListener('pointermove', handleGlobalPointerMove);
      window.addEventListener('pointerup', handleGlobalPointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove);
      window.removeEventListener('pointerup', handleGlobalPointerUp);
    };
  }, [isDraggingWand]);

  // Save Design
  const handleSaveDesign = () => {
    setSaveStatus('saving');
    const designPayload = {
      id: `cat-eye-${Date.now()}`,
      colorName: selectedColor.name,
      colorHex: selectedColor.magneticHex,
      finish: selectedFinish.name,
      shape: selectedShape.name,
      bandPosition,
      bandAngle,
      shimmerIntensity,
      createdAt: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('glfy_saved_cat_eye_designs') || '[]');
      localStorage.setItem('glfy_saved_cat_eye_designs', JSON.stringify([designPayload, ...existing.slice(0, 8)]));
      sessionStorage.setItem('glfy_latest_cat_eye_design', JSON.stringify(designPayload));

      setTimeout(() => {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus(null), 3500);
      }, 350);
    } catch (err) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  // Download High-Resolution Design Card
  const handleDownloadDesign = () => {
    setDownloadStatus('generating');

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1000;
      canvas.height = 1000;
      const ctx = canvas.getContext('2d');

      // 1. Studio Backdrop
      const bgGrad = ctx.createLinearGradient(0, 0, 1000, 1000);
      bgGrad.addColorStop(0, '#FAF7F2');
      bgGrad.addColorStop(1, '#ECE5D8');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1000, 1000);

      // Atelier luxury border
      ctx.strokeStyle = '#DCE1D8';
      ctx.lineWidth = 12;
      ctx.strokeRect(30, 30, 940, 940);

      // Studio Header Branding
      ctx.fillStyle = '#263D2B';
      ctx.font = 'bold 20px "Cinzel", "Playfair Display", serif';
      ctx.textAlign = 'center';
      ctx.fillText('GLAM GIRL BY JANKI · OTTAWA NAIL ATELIER', 500, 90);

      ctx.fillStyle = '#10110F';
      ctx.font = 'normal 38px "Playfair Display", serif';
      ctx.fillText('Magnetic Cat-Eye Haute Couture', 500, 145);

      ctx.fillStyle = '#6B7068';
      ctx.font = '16px sans-serif';
      ctx.fillText(`Design: ${selectedColor.name} · ${selectedFinish.name} Finish · ${selectedShape.name} Shape`, 500, 185);

      // 2. Draw Nail Base Silhouette using Path2D
      ctx.save();
      ctx.translate(500, 240);
      ctx.scale(4.8, 4.8);
      ctx.translate(-50, -20);

      const nailPath = new Path2D(selectedShape.path);

      // Shadow behind nail
      ctx.shadowColor = 'rgba(16, 17, 15, 0.28)';
      ctx.shadowBlur = 24;
      ctx.shadowOffsetY = 14;

      // Base coat fill
      ctx.fillStyle = selectedColor.baseHex;
      ctx.fill(nailPath);

      // Clip inside nail for magnetic gradients
      ctx.shadowColor = 'transparent';
      ctx.clip(nailPath);

      // 3. Draw Cat-Eye Magnetic Linear Gradient
      const rad = (bandAngle * Math.PI) / 180;
      const cx = 50 + (bandPosition - 50) * 0.6;
      const cy = 80;
      const dist = 60;

      const x1 = cx - Math.cos(rad) * dist;
      const y1 = cy - Math.sin(rad) * dist;
      const x2 = cx + Math.cos(rad) * dist;
      const y2 = cy + Math.sin(rad) * dist;

      const magGrad = ctx.createLinearGradient(x1, y1, x2, y2);
      magGrad.addColorStop(0, selectedColor.baseHex);
      magGrad.addColorStop(0.35, selectedColor.midHex);
      magGrad.addColorStop(0.46, selectedColor.baseHex);
      magGrad.addColorStop(0.50, selectedColor.sparkleHex);
      magGrad.addColorStop(0.54, selectedColor.magneticHex);
      magGrad.addColorStop(0.65, selectedColor.midHex);
      magGrad.addColorStop(1, selectedColor.baseHex);

      ctx.globalAlpha = shimmerIntensity / 100;
      ctx.fillStyle = magGrad;
      ctx.fillRect(0, 0, 100, 160);

      // 4. Gloss specular reflection
      if (selectedFinish.id === 'glossy') {
        const glossGrad = ctx.createLinearGradient(20, 0, 45, 0);
        glossGrad.addColorStop(0, 'rgba(255,255,255,0.7)');
        glossGrad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = glossGrad;
        ctx.beginPath();
        ctx.ellipse(32, 70, 7, 50, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      // 5. Footer Specification Badges
      ctx.fillStyle = '#263D2B';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText(`BAND POSITION: ${bandPosition}%   |   ANGLE: ${bandAngle}°   |   SHIMMER: ${shimmerIntensity}%`, 500, 890);

      ctx.fillStyle = '#465640';
      ctx.font = 'italic 15px sans-serif';
      ctx.fillText('Crafted with Japanese Neodymium Magnetic Suspensions & Medical-Grade Gels', 500, 925);

      // Trigger download
      const dataUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = `glam-girl-cat-eye-${selectedColor.id}-${selectedShape.id}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setTimeout(() => {
        setDownloadStatus('success');
        setTimeout(() => setDownloadStatus(null), 3000);
      }, 500);
    } catch (err) {
      setDownloadStatus(null);
      alert('Unable to generate image preview. Please take a screenshot or save to your portfolio.');
    }
  };

  // Gradient computation for SVG
  const normalizedPos = useMemo(() => {
    return Math.max(15, Math.min(85, bandPosition));
  }, [bandPosition]);

  return (
    <section 
      id="magnetic-cat-eye-lab" 
      aria-label="Magnetic Cat-Eye Nail Lab"
      className="w-full bg-[#10110F] text-[#F7F4ED] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden scroll-mt-24"
    >
      {/* Background Ambience: Subtle Forest-Green Radial Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#263D2B]/20 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-24 right-10 w-[450px] h-[450px] rounded-full bg-[#465640]/15 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER                                                         */}
        {/* ========================================================================= */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18271B] border border-[#263D2B] text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#A8B5A0] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#A8B5A0]" />
            <span>STEP 03 · INTERACTIVE ATELIER SIMULATOR</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-[1.12]">
            Magnetic Cat-Eye Nail Lab
          </h2>

          <div className="w-14 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#A8B5A0] leading-relaxed font-light max-w-2xl mx-auto">
            Experiment with micronized magnetic pigments, custom focal angles, and velvet light bands in real time before booking your in-studio manicure.
          </p>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 2. MAIN 2-COLUMN LAB GRID (PREVIEW vs CONTROLS)                           */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ======================================================================= */}
          {/* LEFT: INTERACTIVE NAIL PREVIEW BED & MAGNET WAND                        */}
          {/* ======================================================================= */}
          <div className="lg:col-span-5 bg-[#18271B]/70 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#263D2B] shadow-2xl flex flex-col justify-between space-y-6 lg:sticky lg:top-28">
            
            {/* Header Toolbar */}
            <div className="flex items-center justify-between border-b border-[#263D2B]/70 pb-4">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8B5A0] block">
                  OPTICAL MAGNET SIMULATOR
                </span>
                <span className="font-serif text-base text-white font-normal">
                  {selectedColor.name} · {selectedFinish.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShuffle}
                  className="px-3 py-1.5 rounded-full border border-[#263D2B] bg-[#10110F] hover:bg-[#263D2B] text-white text-[10.5px] font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  title="Randomize combination"
                >
                  <Shuffle className="w-3 h-3 text-[#A8B5A0]" />
                  <span className="hidden sm:inline">Shuffle Look</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="p-1.5 rounded-full border border-[#263D2B] hover:bg-[#263D2B] text-[#A8B5A0] hover:text-white transition-colors cursor-pointer"
                  title="Reset to default settings"
                  aria-label="Reset design"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Direct Interactive Nail Bed */}
            <div 
              ref={previewBedRef}
              onPointerDown={handlePointerDown}
              className="relative w-full aspect-[4/5] min-h-[340px] sm:min-h-[380px] bg-gradient-to-b from-[#10110F] via-[#151D17] to-[#0A0D0B] rounded-2xl border border-[#263D2B] overflow-hidden flex flex-col items-center justify-center p-6 select-none cursor-crosshair group shadow-inner"
            >
              {/* Concentric Magnetic Flux Field Guides */}
              <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
                <div className="w-72 h-72 rounded-full border border-dashed border-[#A8B5A0]" />
                <div className="absolute w-52 h-52 rounded-full border border-[#263D2B]" />
                <div className="absolute w-32 h-32 rounded-full border border-dashed border-[#A8B5A0]/60" />
              </div>

              {/* Neodymium Magnet Wand Indicator (Follows pointer and shows active angle) */}
              <div 
                className="absolute pointer-events-none transition-all duration-150 z-20 flex items-center gap-1"
                style={{
                  left: `${bandPosition}%`,
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${bandAngle}deg)`
                }}
              >
                <div className="w-1.5 h-48 bg-gradient-to-b from-transparent via-white to-transparent opacity-40 blur-[1px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded-full bg-[#10110F]/90 border border-[#263D2B] text-[8px] font-mono text-[#A8B5A0] whitespace-nowrap shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {bandAngle}° · {bandPosition}%
                </div>
              </div>

              {/* The Nail SVG Model */}
              <div className="relative z-10 w-44 sm:w-52 aspect-[100/160] filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.85)]">
                <svg
                  viewBox="0 0 100 160"
                  className="w-full h-full overflow-visible transition-all duration-300"
                >
                  <defs>
                    {/* Nail Silhouette Clip Mask */}
                    <clipPath id="cat-eye-nail-clip">
                      <path d={selectedShape.path} />
                    </clipPath>

                    {/* Cat-Eye Linear Shimmer Gradient with dynamic angle & stops */}
                    <linearGradient
                      id="cat-eye-magnetic-gradient"
                      gradientTransform={`rotate(${bandAngle}, 50, 80)`}
                      x1="0"
                      y1="0"
                      x2="100%"
                      y2="0"
                    >
                      <stop offset="0%" stopColor={selectedColor.baseHex} />
                      <stop offset={`${Math.max(0, normalizedPos - 22)}%`} stopColor={selectedColor.midHex} />
                      <stop offset={`${Math.max(0, normalizedPos - 9)}%`} stopColor={selectedColor.baseHex} />
                      <stop offset={`${normalizedPos}%`} stopColor={selectedColor.sparkleHex} />
                      <stop offset={`${Math.min(100, normalizedPos + 4)}%`} stopColor={selectedColor.magneticHex} />
                      <stop offset={`${Math.min(100, normalizedPos + 10)}%`} stopColor={selectedColor.baseHex} />
                      <stop offset={`${Math.min(100, normalizedPos + 24)}%`} stopColor={selectedColor.midHex} />
                      <stop offset="100%" stopColor={selectedColor.baseHex} />
                    </linearGradient>

                    {/* Secondary diffuse gradient for Velvet finish */}
                    <radialGradient id="velvet-diffuse" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor={selectedColor.sparkleHex} stopOpacity="0.8" />
                      <stop offset="40%" stopColor={selectedColor.magneticHex} stopOpacity="0.5" />
                      <stop offset="80%" stopColor={selectedColor.midHex} stopOpacity="0.2" />
                      <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>

                    {/* Prismatic Holographic dispersion overlay */}
                    <linearGradient id="holo-rainbow" x1="0" y1="0" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#EC4899" stopOpacity="0.35" />
                      <stop offset="25%" stopColor="#8B5CF6" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.4" />
                      <stop offset="75%" stopColor="#34D399" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>

                  {/* Cuticle Bed Cushion Behind Nail */}
                  <path
                    d="M 12 150 C 12 165, 88 165, 88 150 L 88 80 C 88 50, 12 50, 12 80 Z"
                    fill="#2E201B"
                    stroke="#4A342C"
                    strokeWidth="1"
                    opacity="0.85"
                  />
                  <path
                    d="M 18 150 C 18 160, 82 160, 82 150"
                    stroke="#10110F"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.6"
                  />

                  {/* Base Nail Layer */}
                  <path
                    d={selectedShape.path}
                    fill={selectedColor.baseHex}
                    stroke="#0B100D"
                    strokeWidth="1.2"
                  />

                  {/* LAYER 1: Deep Jewel Coat */}
                  <g clipPath="url(#cat-eye-nail-clip)">
                    <rect
                      x="0"
                      y="0"
                      width="100"
                      height="160"
                      fill={selectedColor.baseHex}
                    />

                    {/* LAYER 2: Magnetic Cat-Eye Light Band */}
                    <rect
                      x="-50"
                      y="-50"
                      width="200"
                      height="260"
                      fill="url(#cat-eye-magnetic-gradient)"
                      style={{
                        opacity: shimmerIntensity / 100
                      }}
                    />

                    {/* LAYER 3: Finish Variations */}
                    {/* A. Velvet Diffuse Glow */}
                    {selectedFinish.id === 'velvet' && (
                      <ellipse
                        cx={`${normalizedPos}`}
                        cy="80"
                        rx="40"
                        ry="60"
                        fill="url(#velvet-diffuse)"
                        className="mix-blend-screen animate-pulse"
                      />
                    )}

                    {/* B. Holographic Rainbow Prismatic Shimmer */}
                    {selectedFinish.id === 'holographic' && (
                      <g className="mix-blend-overlay">
                        <rect
                          x="0"
                          y="0"
                          width="100"
                          height="160"
                          fill="url(#holo-rainbow)"
                        />
                        <circle
                          cx={`${normalizedPos}`}
                          cy="70"
                          r="35"
                          fill="#FFFFFF"
                          opacity="0.18"
                        />
                      </g>
                    )}

                    {/* C. Glossy Glass Specular Highlight (Curved light reflection bar) */}
                    {selectedFinish.id === 'glossy' && (
                      <path
                        d="M 24 140 C 24 50, 34 30, 48 20 C 44 28, 34 60, 34 140 Z"
                        fill="linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.1))"
                        fillOpacity="0.5"
                      />
                    )}

                    {/* Edge Rim Highlight */}
                    <path
                      d={selectedShape.path}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="1"
                      strokeOpacity="0.25"
                    />
                  </g>
                </svg>
              </div>

              {/* Interactive Drag Hint Pill */}
              <div className="absolute bottom-3 px-3 py-1 rounded-full bg-[#10110F]/85 border border-[#263D2B] text-[10px] text-[#A8B5A0] flex items-center gap-1.5 pointer-events-none backdrop-blur-xs">
                <Wand2 className="w-3 h-3 text-[#A8B5A0]" />
                <span>Drag directly to steer magnetic light band</span>
              </div>
            </div>

            {/* Live Specifications Pill */}
            <div className="p-4 rounded-2xl bg-[#10110F] border border-[#263D2B] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8B5A0]">
                  SIMULATOR TELEMETRY
                </span>
                <span className="text-[10px] text-[#6E8E68] font-mono">
                  Real-time CSS Optics
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="p-2 bg-[#18271B] rounded-xl border border-[#263D2B]">
                  <span className="text-[9px] text-[#A8B5A0] uppercase font-bold block">POSITION</span>
                  <span className="font-semibold text-xs text-white">{bandPosition}%</span>
                </div>
                <div className="p-2 bg-[#18271B] rounded-xl border border-[#263D2B]">
                  <span className="text-[9px] text-[#A8B5A0] uppercase font-bold block">ANGLE</span>
                  <span className="font-semibold text-xs text-white">{bandAngle}°</span>
                </div>
                <div className="p-2 bg-[#18271B] rounded-xl border border-[#263D2B]">
                  <span className="text-[9px] text-[#A8B5A0] uppercase font-bold block">INTENSITY</span>
                  <span className="font-semibold text-xs text-white">{shimmerIntensity}%</span>
                </div>
              </div>
            </div>

            {/* Design Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleSaveDesign}
                  disabled={saveStatus === 'saving'}
                  className="py-3 px-3 rounded-full border border-[#263D2B] bg-[#10110F] hover:bg-[#263D2B] text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  {saveStatus === 'saved' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A8B5A0]" />
                      <span>SAVED!</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5 text-[#A8B5A0]" />
                      <span>SAVE DESIGN</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadDesign}
                  disabled={downloadStatus === 'generating'}
                  className="py-3 px-3 rounded-full border border-[#263D2B] bg-[#10110F] hover:bg-[#263D2B] text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  {downloadStatus === 'success' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A8B5A0]" />
                      <span>DOWNLOADED</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-[#A8B5A0]" />
                      <span>DOWNLOAD HD</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* ======================================================================= */}
          {/* RIGHT: CUSTOMIZATION CONTROLS & PRESET GALLERY                          */}
          {/* ======================================================================= */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. POLISH COLORS (9 SELECTABLE JEWEL SWATCHES) */}
            <div className="bg-[#18271B]/50 rounded-3xl p-6 sm:p-7 border border-[#263D2B] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#A8B5A0] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8B5A0]" />
                  SELECT POLISH COLOR (9 HAUTE SHADES)
                </span>
                <span className="text-xs text-white font-medium">
                  {selectedColor.name}
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {MAGNETIC_COLORS.map((color) => {
                  const isSelected = selectedColor.id === color.id;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => {
                        setSelectedColor(color);
                        setActivePresetId(null);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2 group ${
                        isSelected 
                          ? 'border-[#A8B5A0] bg-[#263D2B] shadow-md ring-1 ring-[#A8B5A0]' 
                          : 'border-[#263D2B] bg-[#10110F]/80 hover:border-[#A8B5A0]/60 hover:bg-[#18271B]'
                      }`}
                    >
                      {/* Swatch Circle with Magnetic Sheen */}
                      <div 
                        className="w-10 h-10 rounded-full border border-white/20 shadow-inner relative flex items-center justify-center"
                        style={{ background: color.swatchGrad }}
                      >
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-white/90 text-[#10110F] flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <span className="text-[11px] font-medium text-white text-center leading-tight">
                        {color.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. OPTICAL SLIDER CONTROLS (POSITION, ANGLE, SHIMMER) */}
            <div className="bg-[#18271B]/50 rounded-3xl p-6 sm:p-7 border border-[#263D2B] space-y-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#A8B5A0] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#A8B5A0]" />
                PRECISION OPTICAL &amp; SHIMMER CONTROLS
              </span>

              <div className="space-y-4">
                {/* Control A: Magnetic Band Position */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label htmlFor="band-position-slider" className="font-semibold text-white">
                      Magnetic Band Position
                    </label>
                    <span className="font-mono text-[11px] text-[#A8B5A0]">
                      {bandPosition}% (Apex Alignment)
                    </span>
                  </div>
                  <input
                    id="band-position-slider"
                    type="range"
                    min="15"
                    max="85"
                    value={bandPosition}
                    onChange={(e) => {
                      setBandPosition(Number(e.target.value));
                      setActivePresetId(null);
                    }}
                    className="w-full h-2 bg-[#10110F] rounded-lg appearance-none cursor-pointer accent-[#263D2B]"
                  />
                  <div className="flex justify-between text-[10px] text-[#6B7068]">
                    <span>Left Sidewall</span>
                    <span>Nail Apex</span>
                    <span>Right Sidewall</span>
                  </div>
                </div>

                {/* Control B: Band Angle */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label htmlFor="band-angle-slider" className="font-semibold text-white">
                      Band Angle (Focal Slit Rotation)
                    </label>
                    <span className="font-mono text-[11px] text-[#A8B5A0]">
                      {bandAngle}° Diagonal
                    </span>
                  </div>
                  <input
                    id="band-angle-slider"
                    type="range"
                    min="-80"
                    max="80"
                    value={bandAngle}
                    onChange={(e) => {
                      setBandAngle(Number(e.target.value));
                      setActivePresetId(null);
                    }}
                    className="w-full h-2 bg-[#10110F] rounded-lg appearance-none cursor-pointer accent-[#263D2B]"
                  />
                  <div className="flex justify-between text-[10px] text-[#6B7068]">
                    <span>-80° Diagonal</span>
                    <span>0° Vertical</span>
                    <span>+80° Diagonal</span>
                  </div>
                </div>

                {/* Control C: Shimmer Intensity */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label htmlFor="shimmer-intensity-slider" className="font-semibold text-white">
                      Shimmer Intensity &amp; Micro-Particle Density
                    </label>
                    <span className="font-mono text-[11px] text-[#A8B5A0]">
                      {shimmerIntensity}% Reflectivity
                    </span>
                  </div>
                  <input
                    id="shimmer-intensity-slider"
                    type="range"
                    min="40"
                    max="100"
                    value={shimmerIntensity}
                    onChange={(e) => {
                      setShimmerIntensity(Number(e.target.value));
                      setActivePresetId(null);
                    }}
                    className="w-full h-2 bg-[#10110F] rounded-lg appearance-none cursor-pointer accent-[#263D2B]"
                  />
                  <div className="flex justify-between text-[10px] text-[#6B7068]">
                    <span>Soft Halo</span>
                    <span>Medium Flash</span>
                    <span>Maximum High-Beam</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. FINISH & NAIL SHAPE CONTROLS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Finish Selector */}
              <div className="bg-[#18271B]/50 rounded-3xl p-5 border border-[#263D2B] space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#A8B5A0] block">
                  COUTURE FINISH
                </span>
                <div className="space-y-2">
                  {MAGNETIC_FINISHES.map((finish) => {
                    const isSelected = selectedFinish.id === finish.id;
                    return (
                      <button
                        key={finish.id}
                        type="button"
                        onClick={() => {
                          setSelectedFinish(finish);
                          setActivePresetId(null);
                        }}
                        className={`w-full p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                          isSelected 
                            ? 'border-[#A8B5A0] bg-[#263D2B] text-white shadow-xs' 
                            : 'border-[#263D2B] bg-[#10110F]/80 text-[#A8B5A0] hover:border-[#A8B5A0]/50 hover:text-white'
                        }`}
                      >
                        <div>
                          <span className="text-xs font-semibold block">{finish.name}</span>
                          <span className="text-[10px] text-[#A8B5A0]/80">{finish.tagline}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Shape Selector (Almond, Oval, Square, Coffin, Stiletto) */}
              <div className="bg-[#18271B]/50 rounded-3xl p-5 border border-[#263D2B] space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#A8B5A0] block">
                  NAIL SILHOUETTE
                </span>
                <div className="space-y-2">
                  {MAGNETIC_SHAPES.map((shape) => {
                    const isSelected = selectedShape.id === shape.id;
                    return (
                      <button
                        key={shape.id}
                        type="button"
                        onClick={() => {
                          setSelectedShape(shape);
                          setActivePresetId(null);
                        }}
                        className={`w-full p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                          isSelected 
                            ? 'border-[#A8B5A0] bg-[#263D2B] text-white shadow-xs' 
                            : 'border-[#263D2B] bg-[#10110F]/80 text-[#A8B5A0] hover:border-[#A8B5A0]/50 hover:text-white'
                        }`}
                      >
                        <div>
                          <span className="text-xs font-semibold block">{shape.name}</span>
                          <span className="text-[10px] text-[#A8B5A0]/80">{shape.subtitle}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* 4. PRESET LOOKS CARDS (6 CURATED HAUTE LOOKS) */}
            <div className="bg-[#18271B]/50 rounded-3xl p-6 sm:p-7 border border-[#263D2B] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#A8B5A0] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#A8B5A0]" />
                  INSTANT PRESET LOOKS (CURATED BY JANKI)
                </span>
                <span className="text-[11px] text-[#6E8E68]">1-Click Application</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {MAGNETIC_PRESETS.map((preset) => {
                  const isPresetActive = activePresetId === preset.id;
                  const matchColor = MAGNETIC_COLORS.find(c => c.id === preset.colorId);

                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleApplyPreset(preset)}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-2 group ${
                        isPresetActive 
                          ? 'border-[#A8B5A0] bg-[#263D2B] shadow-md ring-1 ring-[#A8B5A0]' 
                          : 'border-[#263D2B] bg-[#10110F]/80 hover:border-[#A8B5A0]/50 hover:bg-[#18271B]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div 
                          className="w-4 h-4 rounded-full border border-white/30"
                          style={{ backgroundColor: matchColor?.magneticHex || '#34D399' }}
                        />
                        <span className="text-[9px] font-mono uppercase tracking-wider text-[#A8B5A0]">
                          {preset.bandAngle}° ANGLE
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        <span className="font-serif text-sm text-white font-normal block group-hover:text-[#A8B5A0] transition-colors">
                          {preset.name}
                        </span>
                        <p className="text-[10.5px] text-[#A8B5A0]/90 leading-relaxed font-light line-clamp-2">
                          {preset.description}
                        </p>
                      </div>

                      <div className="pt-1 border-t border-[#263D2B]/80 flex items-center justify-between text-[10px] text-[#6E8E68]">
                        <span>{preset.finishId.toUpperCase()}</span>
                        <span className="text-white group-hover:translate-x-0.5 transition-transform">Apply →</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
