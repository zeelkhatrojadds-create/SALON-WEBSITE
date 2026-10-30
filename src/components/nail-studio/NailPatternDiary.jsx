// GLAM GIRL BY JANKI — Nail Pattern Library 3D Interactive Diary
// Realistic luxury leather-bound beauty journal with 3D page-turn physics

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight, 
  Brush, 
  RotateCcw, 
  X, 
  Layers, 
  Share2,
  Heart
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import { NAIL_PATTERNS_DIARY } from '../../data/nailPatternDiaryData';
import { NAIL_SHAPES } from './NailConstants';

export default function NailPatternDiary({ onApplyPreset }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPlateIndex, setCurrentPlateIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('next'); // 'next' | 'prev'
  const [selectedShapeId, setSelectedShapeId] = useState('almond');
  const [selectedFinish, setSelectedFinish] = useState('glossy'); // 'glossy' | 'matte'
  const [favorites, setFavorites] = useState({});
  const [copiedNotification, setCopiedNotification] = useState(false);

  const notebookRef = useRef(null);
  const activePattern = NAIL_PATTERNS_DIARY[currentPlateIndex];

  // Update selected shape when plate changes to pattern's recommended shape
  useEffect(() => {
    if (activePattern) {
      setSelectedShapeId(activePattern.recommendedShape);
    }
  }, [currentPlateIndex]);

  // Keyboard navigation when journal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') {
        handleNextPlate();
      } else if (e.key === 'ArrowLeft') {
        handlePrevPlate();
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentPlateIndex, isFlipping]);

  const handleOpenJournal = () => {
    setIsOpen(true);
    // Smoothly ensure journal is centered in view
    setTimeout(() => {
      if (notebookRef.current) {
        notebookRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 120);
  };

  const handleCloseJournal = () => {
    setIsOpen(false);
  };

  const handleNextPlate = () => {
    if (isFlipping) return;
    if (currentPlateIndex < NAIL_PATTERNS_DIARY.length - 1) {
      setFlipDirection('next');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPlateIndex((prev) => prev + 1);
        setIsFlipping(false);
      }, 420);
    }
  };

  const handlePrevPlate = () => {
    if (isFlipping) return;
    if (currentPlateIndex > 0) {
      setFlipDirection('prev');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPlateIndex((prev) => prev - 1);
        setIsFlipping(false);
      }, 420);
    }
  };

  const handleJumpToPlate = (index) => {
    if (isFlipping || index === currentPlateIndex) return;
    setFlipDirection(index > currentPlateIndex ? 'next' : 'prev');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPlateIndex(index);
      setIsFlipping(false);
    }, 380);
  };

  const toggleFavorite = (plateId) => {
    setFavorites((prev) => ({
      ...prev,
      [plateId]: !prev[plateId]
    }));
  };

  const handleApplyToCustomizer = () => {
    if (onApplyPreset && activePattern.customizerPreset) {
      onApplyPreset(activePattern.customizerPreset);
    }
  };

  const handleSharePattern = () => {
    const shareText = `Check out the ${activePattern.title} nail pattern from GLAM GIRL BY JANKI: ${window.location.origin}/nail-art#nail-pattern-journal`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2400);
    }
  };

  // Find shape SVG path for live preview
  const currentShape = NAIL_SHAPES.find((s) => s.id === selectedShapeId) || NAIL_SHAPES[4];

  // Helper to render authentic pattern illustrations
  const renderPatternArt = (svgType) => {
    switch (svgType) {
      case 'french-mirage':
        return (
          <g>
            {/* Primary smile crescent */}
            <path
              d="M 22 52 C 34 30 66 30 78 52 C 70 38 30 38 22 52 Z"
              fill="#263D2B"
              className="drop-shadow-xs"
            />
            {/* Micro parallel floating arch */}
            <path
              d="M 26 62 C 38 46 62 46 74 62"
              fill="none"
              stroke="#F3F4F6"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.95"
            />
            {/* Soft pink French base glow */}
            <ellipse cx="50" cy="115" rx="22" ry="26" fill="#F7D6D0" opacity="0.18" />
          </g>
        );

      case 'celestial-aurora':
        return (
          <g>
            <defs>
              <radialGradient id="auraGlow" cx="50%" cy="52%" r="42%">
                <stop offset="0%" stopColor="#263D2B" stopOpacity="0.88" />
                <stop offset="55%" stopColor="#465640" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#263D2B" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Diffused central aura glow */}
            <ellipse cx="50" cy="78" rx="24" ry="32" fill="url(#auraGlow)" />
            {/* Hand-painted starlight 4-point crosses */}
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
            <circle cx="42" cy="56" r="1" fill="#FFFFFF" opacity="0.8" />
            <circle cx="60" cy="98" r="1.2" fill="#FFFFFF" opacity="0.85" />
            <circle cx="48" cy="110" r="0.9" fill="#FFFFFF" opacity="0.7" />
          </g>
        );

      case 'tortoiseshell-amber':
        return (
          <g>
            <defs>
              <linearGradient id="amberBase" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C98B44" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#965D1E" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {/* Amber jelly veil */}
            <rect x="0" y="0" width="100" height="180" fill="url(#amberBase)" opacity="0.45" />
            {/* Layer 1: Espresso organic blobs */}
            <ellipse cx="38" cy="55" rx="14" ry="9" transform="rotate(-25 38 55)" fill="#4A2E1B" opacity="0.85" />
            <ellipse cx="62" cy="85" rx="16" ry="11" transform="rotate(20 62 85)" fill="#4A2E1B" opacity="0.8" />
            <ellipse cx="40" cy="118" rx="15" ry="8" transform="rotate(-15 40 118)" fill="#4A2E1B" opacity="0.85" />
            {/* Layer 2: Deep onyx core shadows */}
            <ellipse cx="38" cy="55" rx="7" ry="4" transform="rotate(-25 38 55)" fill="#10110F" opacity="0.9" />
            <ellipse cx="62" cy="85" rx="8" ry="5" transform="rotate(20 62 85)" fill="#10110F" opacity="0.9" />
            <ellipse cx="40" cy="118" rx="7" ry="3.5" transform="rotate(-15 40 118)" fill="#10110F" opacity="0.9" />
            {/* Layer 3: Floating amber specks */}
            <circle cx="56" cy="42" r="3" fill="#D4B89C" opacity="0.6" />
            <circle cx="32" cy="88" r="4" fill="#D4B89C" opacity="0.5" />
          </g>
        );

      case 'modernist-negative-space':
        return (
          <g>
            {/* Left lateral sweeping arch */}
            <path
              d="M 22 135 C 22 80 40 40 76 34 L 76 46 C 46 52 34 85 34 135 Z"
              fill="#263D2B"
            />
            {/* Parallel fine tension line */}
            <path
              d="M 40 135 C 40 92 52 64 74 58"
              fill="none"
              stroke="#A8B5A0"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Tiny accent dot near cuticle */}
            <circle cx="50" cy="130" r="2.2" fill="#263D2B" />
          </g>
        );

      case 'botanical-jasmine':
        return (
          <g>
            {/* Organic curved leafy vine */}
            <path
              d="M 30 140 C 38 105 60 90 45 55 C 40 42 50 28 56 22"
              fill="none"
              stroke="#465640"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* Vine leaves */}
            <path d="M 37 115 C 30 110 32 102 38 106 C 42 108 41 114 37 115 Z" fill="#263D2B" />
            <path d="M 52 86 C 60 84 62 76 56 78 C 50 80 48 85 52 86 Z" fill="#263D2B" />
            <path d="M 42 66 C 34 62 36 54 42 58 Z" fill="#263D2B" />
            {/* Three-petal jasmine blossom cluster 1 */}
            <g transform="translate(48, 88)">
              <ellipse cx="-4" cy="-4" rx="3.5" ry="2.2" transform="rotate(-30 -4 -4)" fill="#FFFFFF" />
              <ellipse cx="4" cy="-4" rx="3.5" ry="2.2" transform="rotate(30 4 -4)" fill="#FFFFFF" />
              <ellipse cx="0" cy="4" rx="3.5" ry="2.2" transform="rotate(90 0 4)" fill="#FFFFFF" />
              <circle cx="0" cy="0" r="1.4" fill="#263D2B" />
            </g>
            {/* Jasmine blossom cluster 2 near tip */}
            <g transform="translate(54, 40) scale(0.8)">
              <ellipse cx="-4" cy="-4" rx="3.5" ry="2.2" transform="rotate(-30 -4 -4)" fill="#FFFFFF" />
              <ellipse cx="4" cy="-4" rx="3.5" ry="2.2" transform="rotate(30 4 -4)" fill="#FFFFFF" />
              <ellipse cx="0" cy="4" rx="3.5" ry="2.2" transform="rotate(90 0 4)" fill="#FFFFFF" />
              <circle cx="0" cy="0" r="1.4" fill="#263D2B" />
            </g>
          </g>
        );

      case 'fluid-waves-70s':
        return (
          <g>
            {/* Dominant Forest Green S-curve */}
            <path
              d="M 22 130 C 45 110 30 75 70 45 L 76 58 C 42 85 55 118 30 142 Z"
              fill="#263D2B"
              opacity="0.95"
            />
            {/* Sage Green secondary ribbon */}
            <path
              d="M 22 108 C 42 90 32 62 65 35"
              fill="none"
              stroke="#A8B5A0"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Cream hairline wave */}
            <path
              d="M 22 96 C 40 80 32 54 60 28"
              fill="none"
              stroke="#F3F4F6"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </g>
        );

      case 'liquid-chrome-drips':
        return (
          <g>
            <defs>
              <linearGradient id="chromeDripGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor="#CBD5E1" />
                <stop offset="65%" stopColor="#64748B" />
                <stop offset="100%" stopColor="#F8FAFC" />
              </linearGradient>
            </defs>
            {/* Sculptured molten metallic dripping free edge */}
            <path
              d="M 22 68 C 28 65 34 68 36 78 C 38 88 42 88 44 76 C 46 64 54 62 56 84 C 58 96 64 96 66 74 C 68 62 74 65 78 70 L 78 30 C 58 20 42 20 22 30 Z"
              fill="url(#chromeDripGrad)"
              className="drop-shadow-md"
            />
            {/* Drip highlight reflections */}
            <circle cx="39" cy="84" r="2.2" fill="#FFFFFF" />
            <circle cx="60" cy="90" r="2.6" fill="#FFFFFF" />
            {/* Molten bead on nail body */}
            <ellipse cx="48" cy="115" rx="5" ry="7" fill="url(#chromeDripGrad)" className="drop-shadow-xs" />
            <ellipse cx="46" cy="113" rx="1.5" ry="2.5" fill="#FFFFFF" opacity="0.9" />
          </g>
        );

      case 'embossed-cable-knit':
        return (
          <g>
            {/* Center chevron knit braid */}
            {[45, 65, 85, 105, 125].map((y, idx) => (
              <g key={idx}>
                {/* Left chevron arm */}
                <path
                  d={`M 38 ${y} C 44 ${y - 6} 46 ${y - 4} 50 ${y - 8}`}
                  fill="none"
                  stroke="#263D2B"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
                {/* Right chevron arm */}
                <path
                  d={`M 62 ${y} C 56 ${y - 6} 54 ${y - 4} 50 ${y - 8}`}
                  fill="none"
                  stroke="#263D2B"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
                {/* Flanking texture stitches */}
                <circle cx="30" cy={y - 4} r="1.6" fill="#465640" />
                <circle cx="70" cy={y - 4} r="1.6" fill="#465640" />
              </g>
            ))}
          </g>
        );

      case 'micro-checkerboard-french':
        return (
          <g>
            {/* French smile boundary clip path area */}
            <path
              d="M 22 55 C 32 36 68 36 78 55 L 78 30 C 58 20 42 20 22 30 Z"
              fill="#263D2B"
            />
            {/* Checkerboard tile overlays */}
            <rect x="34" y="32" width="7" height="7" fill="#F3F4F6" />
            <rect x="48" y="30" width="7" height="7" fill="#F3F4F6" />
            <rect x="62" y="32" width="7" height="7" fill="#F3F4F6" />
            <rect x="27" y="39" width="7" height="7" fill="#F3F4F6" />
            <rect x="41" y="38" width="7" height="7" fill="#F3F4F6" />
            <rect x="55" y="38" width="7" height="7" fill="#F3F4F6" />
            <rect x="69" y="39" width="7" height="7" fill="#F3F4F6" />
            {/* Crisp smile demarcation line */}
            <path
              d="M 22 55 C 32 36 68 36 78 55"
              fill="none"
              stroke="#263D2B"
              strokeWidth="2"
            />
          </g>
        );

      case 'quartz-mineral-veins':
        return (
          <g>
            {/* Soft semi-translucent clouding */}
            <path
              d="M 32 45 C 50 60 35 95 62 120"
              fill="none"
              stroke="#DCE1D8"
              strokeWidth="14"
              strokeLinecap="round"
              opacity="0.5"
            />
            {/* Deep jagged primary fracture line */}
            <path
              d="M 26 130 Q 38 112 34 98 T 52 74 T 46 52 T 68 28"
              fill="none"
              stroke="#263D2B"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Secondary branching micro fissure */}
            <path
              d="M 34 98 Q 45 92 58 96"
              fill="none"
              stroke="#465640"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M 52 74 Q 64 68 70 76"
              fill="none"
              stroke="#465640"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Silver mica metallic fracture overlay */}
            <path
              d="M 28 126 L 35 110 L 33 100 L 48 78 L 47 60"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.9"
              strokeDasharray="2 3"
              opacity="0.95"
            />
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <section 
      id="nail-pattern-journal" 
      ref={notebookRef}
      className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-20 sm:pt-28 scroll-mt-24 transition-all duration-500"
    >
      {/* ========================================================================= */}
      {/* SECTION HEADER                                                            */}
      {/* ========================================================================= */}
      <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B] shadow-xs">
          <BookOpen className="w-3.5 h-3.5 text-[#263D2B]" />
          <span>HAUTE BEAUTY ATELIER SKETCHBOOK</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
          The Nail Pattern Journal
        </h2>

        <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

        <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto italic">
          &ldquo;Open our private salon diary — discover hand-painted patterns, step-by-step techniques, and try each design live in the studio customizer.&rdquo;
        </p>

        {/* Quick state button if opened */}
        {isOpen && (
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={handleCloseJournal}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-xs font-semibold text-[#465640] hover:text-[#10110F] hover:border-[#263D2B] transition-colors shadow-2xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>Close Journal &amp; View Leather Cover</span>
            </button>
          </div>
        )}
      </ScrollReveal>

      {/* ========================================================================= */}
      {/* 3D INTERACTIVE NOTEBOOK CONTAINER                                         */}
      {/* ========================================================================= */}
      <div className="relative max-w-5xl mx-auto perspective-[2000px] select-none">
        
        {/* ======================================================================= */}
        {/* VIEW 1: CLOSED 3D NOTEBOOK COVER (Initial State)                        */}
        {/* ======================================================================= */}
        {!isOpen ? (
          <div className="relative mx-auto max-w-md sm:max-w-lg lg:max-w-xl transition-transform duration-700 hover:scale-[1.015]">
            
            {/* Ambient Multi-Layer Drop Shadow */}
            <div className="absolute inset-0 bg-[#10110F]/30 rounded-3xl blur-2xl transform translate-y-8 translate-x-3 -z-10" />
            <div className="absolute inset-0 bg-[#263D2B]/20 rounded-3xl blur-xl transform translate-y-4 -z-10" />

            {/* Realistic Stacked Paper Edge on the Right & Bottom */}
            <div className="absolute top-2 -right-3 bottom-2 w-4 bg-[#EDE8DC] rounded-r-2xl border-r border-t border-b border-[#D8D2C2] shadow-inner flex flex-col justify-between py-4 pointer-events-none">
              {[...Array(14)].map((_, i) => (
                <div key={i} className="w-full h-[1px] bg-[#DDD6C5]/70" />
              ))}
            </div>
            <div className="absolute -bottom-2.5 left-8 right-0 h-3 bg-[#E5DFD1] rounded-b-xl border-b border-l border-r border-[#D0C9B7] pointer-events-none" />

            {/* Dangling Forest Green Ribbon Bookmark */}
            <div className="absolute -bottom-8 left-16 w-6 h-12 bg-[#263D2B] shadow-md z-10 flex flex-col justify-end pointer-events-none">
              <div className="w-full h-3 bg-[#18271B]/30" />
              <div 
                className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[8px] border-t-[#263D2B] transform translate-y-2" 
              />
            </div>

            {/* Leather Book Cover Frame */}
            <div 
              onClick={handleOpenJournal}
              className="group relative bg-[#10110F] text-[#F7F4ED] rounded-3xl p-8 sm:p-12 border-2 border-[#263D2B]/80 shadow-2xl cursor-pointer overflow-hidden transition-all duration-500 hover:border-[#263D2B]"
            >
              {/* Subtle Leather Texture Grain Gradient */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/20 via-transparent to-black/80 pointer-events-none" />
              
              {/* Left Spine Texture & Ribs */}
              <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-10 bg-gradient-to-r from-[#0A0B0A] via-[#1A211B] to-[#10110F] border-r border-[#263D2B]/50 flex flex-col justify-around py-12 pointer-events-none">
                <div className="w-full h-1 bg-[#263D2B]/60 shadow-xs" />
                <div className="w-full h-1 bg-[#263D2B]/60 shadow-xs" />
                <div className="w-full h-1 bg-[#263D2B]/60 shadow-xs" />
                <div className="w-full h-1 bg-[#263D2B]/60 shadow-xs" />
              </div>

              {/* Cover Contents */}
              <div className="relative pl-6 sm:pl-8 space-y-6 text-center">
                
                {/* Brand Eyebrow Foil Stamp */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#263D2B]/40 border border-[#263D2B]/70 text-[9.5px] font-bold uppercase tracking-[0.28em] text-[#A8B5A0]">
                  <Sparkles className="w-3 h-3 text-[#A8B5A0]" />
                  <span>GLAM GIRL BY JANKI • ATELIER ARCHIVE</span>
                </div>

                {/* Debossed Foil Title */}
                <div className="space-y-2 pt-2">
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F7F4ED] tracking-tight uppercase font-normal leading-tight group-hover:text-white transition-colors">
                    THE NAIL PATTERN JOURNAL
                  </h3>
                  <p className="font-serif italic text-sm sm:text-base text-[#A8B5A0] font-light">
                    A Collection of Artistic Nail Designs
                  </p>
                </div>

                {/* Center Embossed Decorative Nail Line Art */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full bg-[#18271B]/50 border border-[#263D2B] p-4 flex items-center justify-center relative shadow-inner group-hover:scale-105 transition-transform duration-500">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#A8B5A0]">
                    {/* Stylized Almond Nail Contour */}
                    <path
                      d="M 30 85 C 30 92 70 92 70 85 L 68 45 C 66 26 55 12 50 10 C 45 12 34 26 32 45 Z"
                      fill="none"
                      stroke="#A8B5A0"
                      strokeWidth="1.8"
                    />
                    {/* Micro Smile Line */}
                    <path
                      d="M 35 44 C 42 28 58 28 65 44"
                      fill="none"
                      stroke="#F7F4ED"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    {/* Starburst */}
                    <circle cx="50" cy="55" r="2" fill="#F7F4ED" />
                    <line x1="50" y1="48" x2="50" y2="62" stroke="#F7F4ED" strokeWidth="1.2" />
                    <line x1="43" y1="55" x2="57" y2="55" stroke="#F7F4ED" strokeWidth="1.2" />
                  </svg>
                  <div className="absolute -bottom-2 bg-[#263D2B] px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-widest text-[#F7F4ED] border border-[#A8B5A0]/40">
                    VOL. 1
                  </div>
                </div>

                {/* Subtitle details */}
                <div className="pt-2 text-xs text-[#A8B5A0]/80 space-y-1 font-light max-w-xs mx-auto">
                  <p>10 Curated Artisan Plates • Step-by-Step Techniques • Colorway Studies</p>
                </div>

                {/* Click to Open Action Button */}
                <div className="pt-4">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#263D2B] text-[#F7F4ED] text-xs font-bold uppercase tracking-[0.2em] shadow-lg hover:bg-[#18271B] hover:border hover:border-[#A8B5A0]/50 transition-all duration-300 group-hover:scale-105 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-[#A8B5A0]" />
                    <span>OPEN YOUR JOURNAL</span>
                  </button>
                  <span className="block text-[10px] text-[#A8B5A0]/60 mt-2 tracking-wider">
                    Click anywhere to open the 3D sketchbook
                  </span>
                </div>

              </div>

              {/* Brass Corner Filigrees */}
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#263D2B] pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#263D2B] pointer-events-none" />
            </div>

          </div>
        ) : (
          /* ===================================================================== */
          /* VIEW 2: OPEN 3D NOTEBOOK SPREAD                                       */
          /* ===================================================================== */
          <div className="relative">
            
            {/* Top Toolbar: Navigation & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#263D2B] bg-white px-3 py-1 rounded-full border border-[#DCE1D8] shadow-2xs">
                  Plate {currentPlateIndex + 1} of {NAIL_PATTERNS_DIARY.length}
                </span>
                <span className="text-xs text-[#6B7068] hidden sm:inline">
                  Use ← and → keys to flip pages
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSharePattern}
                  className="px-3 py-1 rounded-full bg-white border border-[#DCE1D8] text-xs font-semibold text-[#465640] hover:text-[#10110F] hover:border-[#263D2B] transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
                  title="Share this pattern"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#263D2B]" />
                  <span className="hidden sm:inline">Share</span>
                </button>

                <button
                  onClick={handleCloseJournal}
                  className="px-3 py-1 rounded-full bg-[#10110F] text-white text-xs font-bold tracking-wider hover:bg-[#263D2B] transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
                  title="Close notebook"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Close</span>
                </button>
              </div>
            </div>

            {/* Quick Index Tabs Along the Top / Horizontal Strip */}
            <div className="mb-4 overflow-x-auto pb-2 scrollbar-none flex items-center gap-1.5">
              {NAIL_PATTERNS_DIARY.map((pattern, idx) => {
                const isActive = idx === currentPlateIndex;
                return (
                  <button
                    key={pattern.id}
                    onClick={() => handleJumpToPlate(idx)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#263D2B] text-white shadow-xs scale-105'
                        : 'bg-white/80 text-[#465640] hover:bg-white hover:text-[#10110F] border border-[#DCE1D8]'
                    }`}
                  >
                    <span className="text-[10px] opacity-75 font-mono">{pattern.plateNo}</span>
                    <span>{pattern.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Book Spread Outer Shadow & Structure */}
            <div className="relative bg-[#FAF7F0] rounded-3xl border border-[#D8D2C2] shadow-2xl overflow-hidden transition-all duration-300">
              
              {/* Realistic Paper Texture & Deckle Border */}
              <div className="absolute inset-0 bg-[radial-gradient(#263D2B_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-[0.035] pointer-events-none" />

              {/* Deep Central Spine Crease & Shadow */}
              <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 bg-gradient-to-r from-black/15 via-black/5 to-black/15 pointer-events-none z-20 border-l border-r border-[#D0C9B7]/40 shadow-inner" />
              
              {/* Forest Green Center Binding Ribbon */}
              <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1.5 bg-[#263D2B] shadow-sm z-30 pointer-events-none" />

              {/* 2-Page Grid Spread */}
              <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
                
                {/* ============================================================= */}
                {/* LEFT PAGE: Visual Canvas & Swatch Studies                    */}
                {/* ============================================================= */}
                <div className="p-6 sm:p-10 lg:p-12 lg:border-r border-[#E0D9C8] flex flex-col justify-between space-y-6">
                  
                  {/* Page Top Header */}
                  <div className="space-y-1.5 border-b border-[#E0D9C8] pb-4">
                    <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#465640] uppercase">
                      <span>PLATE NO. {activePattern.plateNo} / 10</span>
                      <span className="text-[#263D2B] font-bold">ATELIER ARCHIVE</span>
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal leading-tight">
                          {activePattern.title}
                        </h3>
                        <p className="text-xs text-[#6B7068] font-light italic pt-0.5">
                          {activePattern.subtitle}
                        </p>
                      </div>

                      <button
                        onClick={() => toggleFavorite(activePattern.id)}
                        className={`p-2 rounded-full border transition-all cursor-pointer ${
                          favorites[activePattern.id]
                            ? 'bg-[#263D2B] text-white border-[#263D2B]'
                            : 'bg-white text-[#6B7068] border-[#DCE1D8] hover:text-[#263D2B]'
                        }`}
                        title="Save to favorites"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px] font-bold uppercase tracking-wider">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#263D2B]/10 text-[#263D2B] border border-[#263D2B]/20">
                        {activePattern.category}
                      </span>
                      <span className="text-[#6B7068] italic font-serif">
                        Mood: {activePattern.mood}
                      </span>
                    </div>
                  </div>

                  {/* MASTER NAIL CANVAS PREVIEW */}
                  <div className="py-2 text-center">
                    <div className="inline-block relative p-6 sm:p-8 rounded-3xl bg-white border border-[#E0D9C8] shadow-sm">
                      
                      {/* Realistic Nail SVG Container */}
                      <div className="w-32 h-48 sm:w-36 sm:h-52 mx-auto relative flex items-center justify-center filter drop-shadow-lg">
                        <svg viewBox="0 0 100 180" className="w-full h-full overflow-visible">
                          
                          {/* Cuticle Bed Shadow */}
                          <path
                            d={currentShape.path}
                            fill="#EAD9CE"
                            transform="translate(0, 2)"
                            opacity="0.4"
                          />

                          {/* Base Nail Polish Layer */}
                          <path
                            d={currentShape.path}
                            fill={activePattern.palette[0].hex}
                            className="transition-colors duration-300"
                          />

                          {/* Clipped Nail Art Layer */}
                          <g clipPath="url(#nailClipPath)">
                            {renderPatternArt(activePattern.svgType)}
                          </g>

                          {/* Clip Path Definition matching current shape */}
                          <defs>
                            <clipPath id="nailClipPath">
                              <path d={currentShape.path} />
                            </clipPath>
                          </defs>

                          {/* Realistic Gloss / Specular Gel Reflection */}
                          {selectedFinish === 'glossy' && (
                            <path
                              d="M 32 40 C 30 75 32 120 34 140 C 36 120 34 75 36 40 Z"
                              fill="#FFFFFF"
                              opacity="0.38"
                              className="pointer-events-none"
                            />
                          )}

                          {/* Matte Velvet Coat Overlay */}
                          {selectedFinish === 'matte' && (
                            <path
                              d={currentShape.path}
                              fill="#10110F"
                              opacity="0.08"
                              className="pointer-events-none"
                            />
                          )}

                          {/* Subtle Rim Highlight Contour */}
                          <path
                            d={currentShape.path}
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="1.2"
                            opacity="0.35"
                            className="pointer-events-none"
                          />
                        </svg>
                      </div>

                      {/* Studio Preview Controls: Shape & Finish */}
                      <div className="pt-4 mt-4 border-t border-[#E0D9C8]/60 flex flex-wrap items-center justify-center gap-3 text-xs">
                        {/* Shape Selector Chips */}
                        <div className="flex items-center gap-1 bg-[#FAF7F0] p-1 rounded-xl border border-[#E0D9C8]">
                          {['almond', 'oval', 'coffin', 'stiletto', 'squoval'].map((shapeKey) => {
                            const isCur = selectedShapeId === shapeKey;
                            return (
                              <button
                                key={shapeKey}
                                onClick={() => setSelectedShapeId(shapeKey)}
                                className={`px-2 py-0.5 rounded-lg text-[10.5px] uppercase font-bold tracking-wider transition-colors cursor-pointer ${
                                  isCur ? 'bg-[#263D2B] text-white shadow-2xs' : 'text-[#6B7068] hover:text-[#10110F]'
                                }`}
                              >
                                {shapeKey}
                              </button>
                            );
                          })}
                        </div>

                        {/* Finish Toggle */}
                        <button
                          onClick={() => setSelectedFinish((prev) => (prev === 'glossy' ? 'matte' : 'glossy'))}
                          className="px-2.5 py-1 rounded-xl bg-[#FAF7F0] border border-[#E0D9C8] text-[10.5px] font-bold uppercase tracking-wider text-[#465640] hover:text-[#10110F] cursor-pointer"
                        >
                          Finish: <span className="text-[#263D2B] underline">{selectedFinish}</span>
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* Curated Swatch Palette Chips */}
                  <div className="space-y-2 border-t border-[#E0D9C8] pt-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#465640] block">
                      Plate Palette Swatches
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {activePattern.palette.map((chip, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-1.5 rounded-xl bg-white border border-[#E0D9C8] shadow-2xs"
                        >
                          <span
                            className="w-5 h-5 rounded-full border border-black/10 shadow-inner flex-shrink-0"
                            style={{ backgroundColor: chip.hex }}
                          />
                          <div className="overflow-hidden leading-tight">
                            <span className="text-[10.5px] font-semibold text-[#10110F] block truncate">
                              {chip.name}
                            </span>
                            <span className="text-[9px] text-[#6B7068] font-mono block">
                              {chip.hex}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Brush & Tool Badges */}
                  <div className="p-3 rounded-2xl bg-white border border-[#E0D9C8] flex items-center gap-2.5 text-xs text-[#465640]">
                    <Brush className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#263D2B] block">
                        Master Tool Recommendation
                      </span>
                      <span className="text-[11.5px] text-[#10110F] font-medium">
                        {activePattern.brushRecommendation}
                      </span>
                    </div>
                  </div>

                </div>

                {/* ============================================================= */}
                {/* RIGHT PAGE: Atelier Technique & Customizer Actions          */}
                {/* ============================================================= */}
                <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
                  
                  {/* Top Header of Right Page */}
                  <div className="space-y-1.5 border-b border-[#E0D9C8] pb-4">
                    <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#465640] uppercase">
                      <span>STEP-BY-STEP METHODOLOGY</span>
                      <span className="text-[#263D2B] font-bold">HAUTE APPLICATION</span>
                    </div>

                    <h4 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal">
                      Atelier Execution Technique
                    </h4>
                    <p className="text-xs text-[#6B7068] font-light">
                      Janki Patel&apos;s four-phase salon protocol for enduring wear and crisp fine-line geometry.
                    </p>
                  </div>

                  {/* 4 Execution Steps */}
                  <div className="space-y-3">
                    {activePattern.techniqueSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-3 sm:p-3.5 rounded-2xl bg-white border border-[#E0D9C8] shadow-2xs space-y-1 flex items-start gap-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-[#263D2B] text-white text-xs font-bold font-mono flex items-center justify-center flex-shrink-0 mt-0.5">
                          0{idx + 1}
                        </span>
                        <div className="space-y-0.5">
                          <h5 className="text-xs font-bold text-[#10110F] tracking-wide">
                            {step.title}
                          </h5>
                          <p className="text-[11.5px] text-[#6B7068] leading-relaxed font-light">
                            {step.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Artist Desk Pro Tip */}
                  <div className="p-4 rounded-2xl bg-[#263D2B]/5 border border-[#263D2B]/20 relative overflow-hidden">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
                        From the Master Artist&apos;s Desk
                      </span>
                      <p className="text-xs text-[#10110F] italic font-serif leading-relaxed">
                        {activePattern.artistNote}
                      </p>
                    </div>
                  </div>

                  {/* Plate Specifications Bar */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-t border-b border-[#E0D9C8] text-center">
                    <div>
                      <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#6B7068] block">
                        DIFFICULTY
                      </span>
                      <span className="text-xs font-semibold text-[#10110F]">
                        {activePattern.difficulty}
                      </span>
                    </div>

                    <div>
                      <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#6B7068] block">
                        STUDIO TIME
                      </span>
                      <span className="text-xs font-semibold text-[#10110F] flex items-center justify-center gap-1">
                        <Clock className="w-3 h-3 text-[#263D2B]" />
                        {activePattern.estimatedTime}
                      </span>
                    </div>

                    <div>
                      <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#6B7068] block">
                        BEST SHAPE
                      </span>
                      <span className="text-xs font-semibold text-[#10110F]">
                        {activePattern.recommendedShapeName}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons: Try in Customizer & Book Look */}
                  <div className="pt-2 space-y-2">
                    <button
                      onClick={handleApplyToCustomizer}
                      className="w-full global-button !py-3.5 text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Layers className="w-4 h-4" />
                      <span>TRY THIS PATTERN IN CUSTOMIZER</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleFavorite(activePattern.id)}
                        className="w-full py-2.5 px-4 rounded-full border border-[#DCE1D8] bg-white text-xs font-bold text-[#465640] hover:text-[#10110F] hover:border-[#263D2B] transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
                      >
                        <Bookmark className="w-3.5 h-3.5 text-[#263D2B]" />
                        <span>{favorites[activePattern.id] ? 'Pattern Saved in Favorites' : 'Save Pattern to Favorites'}</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom Pagination & Turn Buttons */}
              <div className="p-4 bg-white/90 border-t border-[#E0D9C8] flex items-center justify-between gap-3 text-xs">
                
                {/* Prev Button */}
                <button
                  onClick={handlePrevPlate}
                  disabled={currentPlateIndex === 0}
                  className={`inline-flex items-center gap-1 px-4 py-2 rounded-full font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    currentPlateIndex === 0
                      ? 'opacity-35 cursor-not-allowed bg-neutral-100 text-[#6B7068]'
                      : 'bg-[#263D2B] text-white hover:bg-[#18271B] shadow-xs'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>PREVIOUS PLATE</span>
                </button>

                {/* Micro Plate Thumb Dots */}
                <div className="hidden sm:flex items-center gap-1.5">
                  {NAIL_PATTERNS_DIARY.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleJumpToPlate(idx)}
                      className={`transition-all rounded-full cursor-pointer ${
                        idx === currentPlateIndex
                          ? 'w-6 h-2 bg-[#263D2B]'
                          : 'w-2 h-2 bg-[#DCE1D8] hover:bg-[#A8B5A0]'
                      }`}
                      title={`Jump to plate ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextPlate}
                  disabled={currentPlateIndex === NAIL_PATTERNS_DIARY.length - 1}
                  className={`inline-flex items-center gap-1 px-4 py-2 rounded-full font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    currentPlateIndex === NAIL_PATTERNS_DIARY.length - 1
                      ? 'opacity-35 cursor-not-allowed bg-neutral-100 text-[#6B7068]'
                      : 'bg-[#263D2B] text-white hover:bg-[#18271B] shadow-xs'
                  }`}
                >
                  <span>NEXT PLATE</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>

            </div>

            {/* Notification Toast for Share */}
            {copiedNotification && (
              <div className="fixed bottom-6 right-6 z-50 bg-[#10110F] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs border border-[#263D2B]">
                <CheckCircle2 className="w-4 h-4 text-[#A8B5A0]" />
                <span>Pattern link copied to clipboard!</span>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
