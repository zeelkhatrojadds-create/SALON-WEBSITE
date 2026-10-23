// GLAM GIRL BY JANKI — Behind the Nail Design Interactive Studio
// Animated 4-stage creation reveal, step timeline, before & after comparison, and customizer integration

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Brush, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight, 
  Eye, 
  Sliders, 
  SplitSquareVertical, 
  Zap, 
  Calendar,
  Info
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import { BEHIND_THE_DESIGN_COLLECTION } from '../../data/behindTheDesignData';
import { NAIL_SHAPES } from './NailConstants';

export default function BehindNailDesign({ onApplyPreset }) {
  const [selectedDesignId, setSelectedDesignId] = useState(BEHIND_THE_DESIGN_COLLECTION[0].id);
  const [currentStep, setCurrentStep] = useState(1); // 1, 2, 3, 4
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(0); // 0 to 100 within current step
  const [activeTab, setActiveTab] = useState('journey'); // 'journey' | 'comparison'
  const [comparisonSliderPos, setComparisonSliderPos] = useState(50); // 0 to 100 %
  const [isBrushAnimating, setIsBrushAnimating] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const activeDesign = BEHIND_THE_DESIGN_COLLECTION.find((d) => d.id === selectedDesignId) || BEHIND_THE_DESIGN_COLLECTION[0];
  const activeStage = activeDesign.stages[currentStep];
  const activeShape = NAIL_SHAPES.find((s) => s.id === activeDesign.recommendedShape) || NAIL_SHAPES[4];

  // Check system reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Trigger brief brush stroke animation when step changes
  useEffect(() => {
    if (!reducedMotion) {
      setIsBrushAnimating(true);
      const timer = setTimeout(() => setIsBrushAnimating(false), 900);
      return () => clearTimeout(timer);
    }
  }, [currentStep, selectedDesignId, reducedMotion]);

  // Sequential Playback Timer
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      const stepDuration = 3200; // ms per step
      const tickRate = 50; // ms
      const increment = (tickRate / stepDuration) * 100;

      interval = setInterval(() => {
        setPlayProgress((prev) => {
          if (prev + increment >= 100) {
            setCurrentStep((curr) => {
              if (curr >= 4) {
                setIsPlaying(false);
                return 4;
              }
              return curr + 1;
            });
            return 0;
          }
          return prev + increment;
        });
      }, tickRate);
    } else {
      setPlayProgress(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const handleStepChange = (stepNumber) => {
    setIsPlaying(false);
    setPlayProgress(0);
    setCurrentStep(stepNumber);
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      handleStepChange(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      handleStepChange(currentStep - 1);
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (currentStep === 4) {
        setCurrentStep(1);
      }
      setIsPlaying(true);
    }
  };

  const handleReplay = () => {
    setCurrentStep(1);
    setPlayProgress(0);
    setIsPlaying(true);
  };

  const handleViewFinal = () => {
    setIsPlaying(false);
    setCurrentStep(4);
  };

  const handleApplyToCustomizer = () => {
    if (onApplyPreset && activeDesign.customizerPreset) {
      onApplyPreset(activeDesign.customizerPreset);
    }
  };

  // Helper to render art overlay on nail illustration based on current step & design
  const renderNailArtLayers = () => {
    const isStep1 = currentStep === 1;
    const isStep2 = currentStep === 2;
    const isStep3 = currentStep === 3;
    const isStep4 = currentStep === 4;

    return (
      <g>
        {/* ================================================================= */}
        {/* LAYER 0: Clean Natural Keratin Nail Bed (Base)                     */}
        {/* ================================================================= */}
        <path
          d={activeShape.path}
          fill="#F5E5DC"
          className="transition-colors duration-500"
        />

        {/* Natural Keratin Lunula (Cuticle Crescent) */}
        <ellipse
          cx="50"
          cy="146"
          rx="18"
          ry="10"
          fill="#FAF0E6"
          opacity={isStep1 ? 0.75 : 0.15}
        />

        {/* ================================================================= */}
        {/* LAYER 1: Base Coat Sheer Wet Gel Glaze (Steps 1, 2, 3, 4)         */}
        {/* ================================================================= */}
        <path
          d={activeShape.path}
          fill="#FFFFFF"
          opacity={isStep1 ? (isBrushAnimating ? 0.25 : 0.35) : 0.05}
          className="transition-opacity duration-500"
        />

        {/* ================================================================= */}
        {/* LAYER 2: Color Application Coat (Steps 2, 3, 4)                   */}
        {/* ================================================================= */}
        {(isStep2 || isStep3 || isStep4) && (
          <path
            d={activeShape.path}
            fill={activeDesign.baseColorHex}
            className={`transition-all duration-700 ${
              isStep2 && isBrushAnimating ? 'animate-fade-in' : ''
            }`}
          />
        )}

        {/* ================================================================= */}
        {/* LAYER 3: Art Detailing (Steps 3 & 4)                              */}
        {/* ================================================================= */}
        {(isStep3 || isStep4) && (
          <g clipPath="url(#behindDesignClip)">
            {/* French Mirage Art */}
            {activeDesign.artType === 'french-mirage' && (
              <g className="transition-opacity duration-500">
                <path
                  d="M 22 52 C 34 30 66 30 78 52 C 70 38 30 38 22 52 Z"
                  fill="#263D2B"
                />
                <path
                  d="M 26 62 C 38 46 62 46 74 62"
                  fill="none"
                  stroke="#F3F4F6"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </g>
            )}

            {/* Celestial Aurora Art */}
            {activeDesign.artType === 'celestial-aurora' && (
              <g className="transition-opacity duration-500">
                <defs>
                  <radialGradient id="behindAuraGlow" cx="50%" cy="52%" r="44%">
                    <stop offset="0%" stopColor="#263D2B" stopOpacity="0.88" />
                    <stop offset="60%" stopColor="#465640" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#263D2B" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <ellipse cx="50" cy="78" rx="24" ry="32" fill="url(#behindAuraGlow)" />
                <g transform="translate(50, 70)">
                  <path d="M 0 -11 L 0 11 M -11 0 L 11 0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                  <circle cx="0" cy="0" r="1.8" fill="#FFFFFF" />
                </g>
                <g transform="translate(36, 95) scale(0.65)">
                  <path d="M 0 -9 L 0 9 M -9 0 L 9 0" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="0" cy="0" r="1.4" fill="#FFFFFF" />
                </g>
                <g transform="translate(64, 52) scale(0.55)">
                  <path d="M 0 -8 L 0 8 M -8 0 L 8 0" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
                  <circle cx="0" cy="0" r="1.2" fill="#FFFFFF" />
                </g>
              </g>
            )}

            {/* Tortoiseshell Amber Art */}
            {activeDesign.artType === 'tortoiseshell-amber' && (
              <g className="transition-opacity duration-500">
                <ellipse cx="38" cy="55" rx="14" ry="9" transform="rotate(-25 38 55)" fill="#4A2E1B" opacity="0.85" />
                <ellipse cx="62" cy="85" rx="16" ry="11" transform="rotate(20 62 85)" fill="#4A2E1B" opacity="0.8" />
                <ellipse cx="40" cy="118" rx="15" ry="8" transform="rotate(-15 40 118)" fill="#4A2E1B" opacity="0.85" />
                <ellipse cx="38" cy="55" rx="7" ry="4" transform="rotate(-25 38 55)" fill="#10110F" opacity="0.9" />
                <ellipse cx="62" cy="85" rx="8" ry="5" transform="rotate(20 62 85)" fill="#10110F" opacity="0.9" />
                <ellipse cx="40" cy="118" rx="7" ry="3.5" transform="rotate(-15 40 118)" fill="#10110F" opacity="0.9" />
              </g>
            )}

            {/* Molten Liquid Chrome Drip Art */}
            {activeDesign.artType === 'liquid-chrome-drips' && (
              <g className="transition-opacity duration-500">
                <defs>
                  <linearGradient id="behindChromeGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="35%" stopColor="#CBD5E1" />
                    <stop offset="65%" stopColor="#64748B" />
                    <stop offset="100%" stopColor="#F8FAFC" />
                  </linearGradient>
                </defs>
                <path
                  d="M 22 68 C 28 65 34 68 36 78 C 38 88 42 88 44 76 C 46 64 54 62 56 84 C 58 96 64 96 66 74 C 68 62 74 65 78 70 L 78 30 C 58 20 42 20 22 30 Z"
                  fill="url(#behindChromeGrad)"
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
                />
                <circle cx="39" cy="84" r="2.2" fill="#FFFFFF" />
                <circle cx="60" cy="90" r="2.6" fill="#FFFFFF" />
                <ellipse cx="48" cy="115" rx="5" ry="7" fill="url(#behindChromeGrad)" />
                <ellipse cx="46" cy="113" rx="1.5" ry="2.5" fill="#FFFFFF" opacity="0.9" />
              </g>
            )}

            {/* Emerald Velvet Cat-Eye Art */}
            {activeDesign.artType === 'emerald-cat-eye' && (
              <g className="transition-opacity duration-500">
                <defs>
                  <linearGradient id="behindCatEyeBeam" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#263D2B" stopOpacity="0" />
                    <stop offset="45%" stopColor="#A8B5A0" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
                    <stop offset="55%" stopColor="#A8B5A0" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#263D2B" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="100" height="180" fill="#263D2B" opacity="0.88" />
                <rect x="-20" y="10" width="140" height="40" fill="url(#behindCatEyeBeam)" transform="rotate(-35 50 80)" />
              </g>
            )}

            {/* Botanical Jasmine Art */}
            {activeDesign.artType === 'botanical-jasmine' && (
              <g className="transition-opacity duration-500">
                <path
                  d="M 30 140 C 38 105 60 90 45 55 C 40 42 50 28 56 22"
                  fill="none"
                  stroke="#465640"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path d="M 37 115 C 30 110 32 102 38 106 C 42 108 41 114 37 115 Z" fill="#263D2B" />
                <path d="M 52 86 C 60 84 62 76 56 78 C 50 80 48 85 52 86 Z" fill="#263D2B" />
                <g transform="translate(48, 88)">
                  <ellipse cx="-4" cy="-4" rx="3.5" ry="2.2" transform="rotate(-30 -4 -4)" fill="#FFFFFF" />
                  <ellipse cx="4" cy="-4" rx="3.5" ry="2.2" transform="rotate(30 4 -4)" fill="#FFFFFF" />
                  <ellipse cx="0" cy="4" rx="3.5" ry="2.2" transform="rotate(90 0 4)" fill="#FFFFFF" />
                  <circle cx="0" cy="0" r="1.4" fill="#263D2B" />
                </g>
              </g>
            )}
          </g>
        )}

        {/* ================================================================= */}
        {/* LAYER 4: Final High-Gloss Specular Reflections (Step 4 only)       */}
        {/* ================================================================= */}
        {isStep4 && (
          <g className="pointer-events-none">
            {/* Mirror Glass Specular Light Curve */}
            <path
              d="M 32 38 C 30 75 32 120 34 142 C 36 120 34 75 36 38 Z"
              fill="#FFFFFF"
              opacity="0.45"
            />
            {/* Secondary Lateral Gleam */}
            <path
              d="M 68 55 C 66 80 67 110 68 125"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.32"
            />
            {/* Apex Sparkle Burst */}
            <g transform="translate(35, 65) scale(0.7)">
              <line x1="-8" y1="0" x2="8" y2="0" stroke="#FFFFFF" strokeWidth="1.5" />
              <line x1="0" y1="-8" x2="0" y2="8" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="2.2" fill="#FFFFFF" />
            </g>
          </g>
        )}

        {/* ================================================================= */}
        {/* ANIMATED ARTISAN BRUSH (Sweeps downward during transitions)       */}
        {/* ================================================================= */}
        {!reducedMotion && isBrushAnimating && (
          <g className="pointer-events-none transition-all duration-700 ease-out animate-brush-sweep">
            {/* Brush Ferrule */}
            <rect x="42" y="15" width="16" height="24" rx="2" fill="#465640" stroke="#263D2B" strokeWidth="1" />
            {/* Brush Bristles with Active Gel Tip */}
            <path
              d="M 44 39 L 46 54 C 47 57 53 57 54 54 L 56 39 Z"
              fill={
                isStep1
                  ? '#E2E8F0'
                  : isStep2
                  ? activeDesign.baseColorHex
                  : isStep3
                  ? activeDesign.primaryArtColorHex
                  : '#FFFFFF'
              }
              opacity="0.9"
            />
            {/* Gel Droplet Highlight */}
            <circle cx="50" cy="50" r="2" fill="#FFFFFF" opacity="0.8" />
          </g>
        )}
      </g>
    );
  };

  return (
    <section 
      id="behind-nail-design" 
      className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-20 sm:pt-28 scroll-mt-24"
    >
      {/* ========================================================================= */}
      {/* 1. SECTION HEADER                                                         */}
      {/* ========================================================================= */}
      <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B] shadow-xs">
          <Zap className="w-3.5 h-3.5 text-[#263D2B]" />
          <span>ATELIER PROCESS DISCOVERY</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
          Behind the Nail Design
        </h2>

        <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

        <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto italic">
          &ldquo;Every beautiful set begins with a little creativity, careful technique, and the perfect finishing touch.&rdquo;
        </p>

        {/* View Mode Switcher: Animated Journey vs Before & After Lens */}
        <div className="pt-3 flex items-center justify-center gap-2">
          <div className="inline-flex p-1 bg-white rounded-2xl border border-[#DCE1D8] shadow-2xs">
            <button
              onClick={() => setActiveTab('journey')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'journey'
                  ? 'bg-[#263D2B] text-white shadow-xs'
                  : 'text-[#6B7068] hover:text-[#10110F]'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>4-Step Animated Journey</span>
            </button>

            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'comparison'
                  ? 'bg-[#263D2B] text-white shadow-xs'
                  : 'text-[#6B7068] hover:text-[#10110F]'
              }`}
            >
              <SplitSquareVertical className="w-3.5 h-3.5" />
              <span>Before &amp; After Split Lens</span>
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* ========================================================================= */}
      {/* 2. CHOOSE YOUR DESIGN SELECTOR CAROUSEL / CHIPS                           */}
      {/* ========================================================================= */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#263D2B] flex items-center gap-1.5">
            <Brush className="w-3.5 h-3.5" />
            CHOOSE YOUR DESIGN TO EXPLORE
          </span>
          <span className="text-xs text-[#6B7068] hidden sm:inline">
            Select any couture design to inspect its step-by-step creation
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {BEHIND_THE_DESIGN_COLLECTION.map((design) => {
            const isSelected = design.id === selectedDesignId;
            return (
              <button
                key={design.id}
                onClick={() => {
                  setSelectedDesignId(design.id);
                  setCurrentStep(1);
                  setIsPlaying(false);
                }}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between space-y-2 relative overflow-hidden group ${
                  isSelected
                    ? 'bg-[#10110F] text-white border-[#263D2B] shadow-md ring-2 ring-[#263D2B]/50'
                    : 'bg-white text-[#10110F] border-[#DCE1D8] hover:border-[#263D2B]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-[#263D2B] text-[#A8B5A0]' : 'bg-[#263D2B]/10 text-[#263D2B]'
                    }`}>
                      {design.sourceCategory}
                    </span>
                    <span 
                      className="w-3 h-3 rounded-full border border-black/10 flex-shrink-0"
                      style={{ backgroundColor: design.baseColorHex }}
                    />
                  </div>
                  <h4 className="font-serif text-xs sm:text-sm font-normal leading-snug truncate">
                    {design.name}
                  </h4>
                </div>

                <div className="text-[10px] opacity-70 truncate font-light">
                  {design.recommendedShapeName} • {design.finish}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN WORKSPACE CONTAINER: DARK EDITORIAL FRAME                         */}
      {/* ========================================================================= */}
      <div className="bg-[#10110F] text-[#F7F4ED] rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-[#263D2B]/80 shadow-2xl relative overflow-hidden">
        
        {/* Clip Path Definition for Nail Artwork */}
        <svg className="absolute w-0 h-0" aria-hidden="true">
          <defs>
            <clipPath id="behindDesignClip">
              <path d={activeShape.path} />
            </clipPath>
          </defs>
        </svg>

        {activeTab === 'journey' ? (
          /* ===================================================================== */
          /* VIEW A: 4-STAGE ANIMATED CREATION JOURNEY                             */
          /* ===================================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column (5 cols): Large Animated Nail Preview */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              
              <div className="relative w-full max-w-xs p-8 rounded-3xl bg-[#18271B]/60 border border-[#263D2B] shadow-inner text-center">
                
                {/* Active Step Indicator Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#263D2B] text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8B5A0] mb-6 shadow-xs">
                  <span>STEP {activeStage.stepNumber}</span>
                  <span>•</span>
                  <span>{activeStage.title}</span>
                </div>

                {/* SVG Nail Container */}
                <div className="w-36 h-56 sm:w-44 sm:h-64 mx-auto relative flex items-center justify-center filter drop-shadow-2xl">
                  <svg viewBox="0 0 100 180" className="w-full h-full overflow-visible">
                    {renderNailArtLayers()}
                  </svg>
                </div>

                {/* Live Swatch Badge */}
                <div className="mt-6 pt-4 border-t border-[#263D2B]/80 flex items-center justify-between text-xs text-[#A8B5A0]">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-4 h-4 rounded-full border border-white/20 shadow-xs" 
                      style={{ 
                        backgroundColor: currentStep === 1 
                          ? '#F5E5DC' 
                          : currentStep === 2 
                          ? activeDesign.baseColorHex 
                          : activeDesign.primaryArtColorHex 
                      }} 
                    />
                    <span className="text-[11px] font-medium text-white">
                      {currentStep === 1 ? 'Clean Buffed Keratin' : currentStep === 2 ? activeDesign.baseColorName : activeDesign.primaryArtColorName}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#A8B5A0]">
                    {activeDesign.finish}
                  </span>
                </div>

                {/* Brush Active Cue */}
                {isBrushAnimating && !reducedMotion && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[9.5px] font-bold uppercase tracking-wider text-[#A8B5A0] bg-[#263D2B] px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3 text-[#A8B5A0]" />
                    <span>Applying...</span>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column (7 cols): Timeline, Controls & Step Explanations */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Four Step Connected Progress Timeline */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#A8B5A0]">
                  <span>Creation Timeline</span>
                  <span className="font-mono text-white">
                    Phase {currentStep} of 4
                  </span>
                </div>

                {/* 4 Connected Step Pills */}
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((stepNum) => {
                    const isCurrent = currentStep === stepNum;
                    const isPassed = currentStep > stepNum;
                    return (
                      <button
                        key={stepNum}
                        onClick={() => handleStepChange(stepNum)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                          isCurrent
                            ? 'bg-[#263D2B] text-white border-[#A8B5A0] shadow-md'
                            : isPassed
                            ? 'bg-[#18271B] text-[#A8B5A0] border-[#263D2B]'
                            : 'bg-[#10110F]/60 text-[#6B7068] border-[#263D2B]/50 hover:border-[#263D2B]'
                        }`}
                      >
                        {/* Progress Bar within active step when playing */}
                        {isCurrent && isPlaying && (
                          <div
                            className="absolute bottom-0 left-0 h-1 bg-[#A8B5A0] transition-all"
                            style={{ width: `${playProgress}%` }}
                          />
                        )}

                        <span className="text-[10px] font-mono font-bold block mb-0.5">
                          0{stepNum}
                        </span>
                        <span className="text-[11px] font-bold leading-tight block truncate">
                          {stepNum === 1 && 'Base Coat'}
                          {stepNum === 2 && 'Color Coat'}
                          {stepNum === 3 && 'Art Details'}
                          {stepNum === 4 && 'Final Gloss'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Step Content Card */}
              <div className="p-6 rounded-3xl bg-[#18271B]/50 border border-[#263D2B] space-y-4 shadow-sm">
                
                <div className="flex items-start justify-between gap-3 border-b border-[#263D2B]/80 pb-3">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#A8B5A0] uppercase block">
                      STAGE {activeStage.stepNumber} • {activeStage.techniqueName}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mt-0.5">
                      {activeStage.shortDesc}
                    </h3>
                  </div>

                  <div className="p-2 rounded-xl bg-[#263D2B] text-[#A8B5A0] flex-shrink-0">
                    <Brush className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-xs sm:text-[13px] text-[#DCE1D8] leading-relaxed font-light">
                  {activeStage.explanation}
                </p>

                {/* Atelier Tool & Curing Spec */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#10110F]/60 border border-[#263D2B] space-y-0.5">
                    <span className="text-[9.5px] uppercase font-bold tracking-wider text-[#A8B5A0] block">
                      TOOL / BRUSH SPEC
                    </span>
                    <span className="text-white font-medium">
                      {activeStage.brushType}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#10110F]/60 border border-[#263D2B] space-y-0.5">
                    <span className="text-[9.5px] uppercase font-bold tracking-wider text-[#A8B5A0] block">
                      LED CURE DURATION
                    </span>
                    <span className="text-white font-medium">
                      {currentStep === 1 ? '30s flash seal' : currentStep === 2 ? '60s full cure' : currentStep === 3 ? '15s art freeze' : '60s diamond seal'}
                    </span>
                  </div>
                </div>

              </div>

              {/* Functional Controls Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                
                {/* Step Navigation Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                      currentStep === 1
                        ? 'opacity-30 cursor-not-allowed border-neutral-800 text-neutral-600'
                        : 'border-[#263D2B] text-white hover:bg-[#263D2B]'
                    }`}
                    title="Previous stage"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleTogglePlay}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#263D2B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#18271B] transition-colors shadow-xs cursor-pointer border border-[#A8B5A0]/40"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-[#A8B5A0]" />
                        <span>PAUSE</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-[#A8B5A0]" />
                        <span>PLAY FULL PROCESS</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleNextStep}
                    disabled={currentStep === 4}
                    className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                      currentStep === 4
                        ? 'opacity-30 cursor-not-allowed border-neutral-800 text-neutral-600'
                        : 'border-[#263D2B] text-white hover:bg-[#263D2B]'
                    }`}
                    title="Next stage"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Secondary Fast-Actions */}
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={handleReplay}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#A8B5A0] border border-[#263D2B] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Replay</span>
                  </button>

                  <button
                    onClick={handleViewFinal}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-[#263D2B] transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#A8B5A0]" />
                    <span>View Final</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        ) : (
          /* ===================================================================== */
          /* VIEW B: INTERACTIVE BEFORE & AFTER COMPARISON SLIDER                  */
          /* ===================================================================== */
          <div className="space-y-6">
            
            <div className="text-center max-w-xl mx-auto space-y-1">
              <h3 className="font-serif text-2xl text-white font-normal">
                Before &amp; After Transformation Lens
              </h3>
              <p className="text-xs text-[#A8B5A0] font-light">
                Drag the interactive slider below to compare the clean, natural nail with the cured couture masterpiece.
              </p>
            </div>

            {/* Split Comparison Canvas */}
            <div className="relative max-w-lg mx-auto bg-[#18271B]/50 rounded-3xl p-6 border border-[#263D2B] shadow-lg overflow-hidden select-none">
              
              <div className="relative w-44 h-64 sm:w-52 sm:h-72 mx-auto flex items-center justify-center">
                
                {/* 1. Underlying: Clean Natural Prepared Nail ("Before") */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 100 180" className="w-full h-full overflow-visible">
                    <path d={activeShape.path} fill="#F5E5DC" />
                    <ellipse cx="50" cy="146" rx="18" ry="10" fill="#FAF0E6" opacity="0.8" />
                    <path d={activeShape.path} fill="#FFFFFF" opacity="0.15" />
                  </svg>
                </div>

                {/* 2. Top Clamped Layer: Finished Couture Nail ("After") */}
                <div 
                  className="absolute inset-0 flex items-center justify-center overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - comparisonSliderPos}% 0 0)` }}
                >
                  <svg viewBox="0 0 100 180" className="w-full h-full overflow-visible">
                    <path d={activeShape.path} fill={activeDesign.baseColorHex} />
                    <g clipPath="url(#behindDesignClip)">
                      {/* Render same pattern artwork */}
                      {activeDesign.artType === 'french-mirage' && (
                        <g>
                          <path d="M 22 52 C 34 30 66 30 78 52 C 70 38 30 38 22 52 Z" fill="#263D2B" />
                          <path d="M 26 62 C 38 46 62 46 74 62" fill="none" stroke="#F3F4F6" strokeWidth="1.8" />
                        </g>
                      )}
                      {activeDesign.artType === 'celestial-aurora' && (
                        <g>
                          <circle cx="50" cy="78" r="28" fill="#263D2B" opacity="0.8" />
                          <path d="M 50 60 L 50 80 M 40 70 L 60 70" stroke="#FFFFFF" strokeWidth="1.6" />
                        </g>
                      )}
                      {activeDesign.artType === 'tortoiseshell-amber' && (
                        <g>
                          <ellipse cx="38" cy="55" rx="14" ry="9" fill="#4A2E1B" />
                          <ellipse cx="62" cy="85" rx="16" ry="11" fill="#4A2E1B" />
                          <ellipse cx="38" cy="55" rx="7" ry="4" fill="#10110F" />
                        </g>
                      )}
                      {activeDesign.artType === 'liquid-chrome-drips' && (
                        <g>
                          <path d="M 22 68 C 28 65 34 68 36 78 C 38 88 42 88 44 76 L 78 30 C 58 20 42 20 22 30 Z" fill="#E2E8F0" />
                        </g>
                      )}
                      {activeDesign.artType === 'emerald-cat-eye' && (
                        <g>
                          <rect x="0" y="0" width="100" height="180" fill="#263D2B" />
                          <line x1="20" y1="120" x2="80" y2="40" stroke="#A8B5A0" strokeWidth="14" opacity="0.8" />
                        </g>
                      )}
                      {activeDesign.artType === 'botanical-jasmine' && (
                        <g>
                          <path d="M 30 140 C 38 105 60 90 45 55" fill="none" stroke="#465640" strokeWidth="2" />
                          <circle cx="48" cy="88" r="5" fill="#FFFFFF" />
                        </g>
                      )}
                    </g>
                    {/* Mirror reflections */}
                    <path d="M 32 38 C 30 75 32 120 34 142 Z" fill="#FFFFFF" opacity="0.45" />
                  </svg>
                </div>

                {/* Divider Line & Handle */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl pointer-events-none"
                  style={{ left: `${comparisonSliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#263D2B] border-2 border-white flex items-center justify-center text-[10px] text-white shadow-md">
                    ⇄
                  </div>
                </div>

              </div>

              {/* Range Slider Drag Input */}
              <div className="mt-6 space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={comparisonSliderPos}
                  onChange={(e) => setComparisonSliderPos(Number(e.target.value))}
                  className="w-full h-2 bg-[#263D2B] rounded-lg appearance-none cursor-ew-resize accent-[#A8B5A0]"
                />
                
                <div className="flex items-center justify-between text-xs text-[#A8B5A0]">
                  <span className="font-bold uppercase tracking-wider">
                    ← Natural Clean Plate (0%)
                  </span>
                  <button
                    onClick={() => setComparisonSliderPos(50)}
                    className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] transition-colors"
                  >
                    Reset 50/50
                  </button>
                  <span className="font-bold uppercase tracking-wider">
                    Finished Look (100%) →
                  </span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ===================================================================== */}
        {/* 4. COMPACT TECHNIQUE DETAILS SPEC PANEL                               */}
        {/* ===================================================================== */}
        <div className="mt-8 pt-6 border-t border-[#263D2B]/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8B5A0] block">
              DESIGN &amp; CATEGORY
            </span>
            <span className="font-serif text-sm text-white font-normal block">
              {activeDesign.name}
            </span>
            <span className="text-[11px] text-[#A8B5A0]/80 block">
              {activeDesign.categoryLabel}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8B5A0] block">
              RECOMMENDED SHAPE
            </span>
            <span className="font-serif text-sm text-white font-normal block">
              {activeDesign.recommendedShapeName}
            </span>
            <span className="text-[11px] text-[#A8B5A0]/80 block">
              {activeDesign.difficulty}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8B5A0] block">
              STUDIO TOOLS USED
            </span>
            <span className="text-[11px] text-[#DCE1D8] block">
              {activeDesign.toolsUsed.slice(0, 2).join(', ')}
            </span>
            <span className="text-[10px] text-[#A8B5A0]/80 block">
              Est. {activeDesign.estimatedTime}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8B5A0] block">
              ATELIER MAINTENANCE TIP
            </span>
            <p className="text-[11px] text-[#DCE1D8] leading-tight font-light line-clamp-2">
              {activeDesign.aftercareTip}
            </p>
          </div>

        </div>

        {/* ===================================================================== */}
        {/* 5. PRIMARY ACTION BAR: TRY THIS DESIGN & BOOK LOOK                    */}
        {/* ===================================================================== */}
        <div className="mt-8 pt-6 border-t border-[#263D2B]/80 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 text-xs text-[#A8B5A0]">
            <CheckCircle2 className="w-4 h-4 text-[#A8B5A0] flex-shrink-0" />
            <span>Ready to see this on your hands or book in Ottawa?</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleApplyToCustomizer}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#263D2B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#18271B] border border-[#A8B5A0]/40 transition-colors shadow-sm cursor-pointer"
            >
              <Layers className="w-4 h-4 text-[#A8B5A0]" />
              <span>CUSTOMIZE THIS DESIGN</span>
              <ArrowUpRight className="w-4 h-4 text-[#A8B5A0]" />
            </button>

            <Link
              to="/book-appointment?service=nail-art-addon"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#10110F] text-xs font-bold uppercase tracking-wider hover:bg-[#F7F4ED] transition-colors shadow-sm cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#263D2B]" />
              <span>BOOK THIS LOOK</span>
            </Link>
          </div>

        </div>

      </div>

    </section>
  );
}
