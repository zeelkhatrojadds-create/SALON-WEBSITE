import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck, 
  Clock, 
  Phone, 
  Calendar, 
  Palette, 
  Gem, 
  Layers, 
  CheckCircle2,
  Compass,
  Flower2,
  BookOpen,
  Zap,
  HeartHandshake
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal/ScrollReveal';
import NailShapeSelector from '../components/nail-studio/NailShapeSelector';
import NailCustomizerWorkbench from '../components/nail-studio/NailCustomizerWorkbench';
import MixMatchFingerDesigner from '../components/nail-studio/MixMatchFingerDesigner';
import MagneticCatEyeLab from '../components/nail-studio/MagneticCatEyeLab';
import NailPatternDiary from '../components/nail-studio/NailPatternDiary';
import BehindNailDesign from '../components/nail-studio/BehindNailDesign';
import ArtistryCollection from '../components/nail-studio/ArtistryCollection';
import NailArtGallery from '../components/nail-studio/NailArtGallery';
import SeasonalNailCollections from '../components/nail-studio/SeasonalNailCollections';
import Nail3DGallery from '../components/nail-studio/Nail3DGallery';
import NailAppointmentExperience from '../components/nail-studio/NailAppointmentExperience';
import { 
  NAIL_SHAPES, 
  NAIL_COLORS, 
  NAIL_FINISHES, 
  NAIL_ART_OPTIONS 
} from '../components/nail-studio/NailConstants';

export default function NailArtPage() {
  // Shared Studio State
  const [selectedShape, setSelectedShape] = useState(NAIL_SHAPES[4]); // Almond default
  const [selectedColor, setSelectedColor] = useState(NAIL_COLORS[4]); // Forest Green
  const [customHexColor, setCustomHexColor] = useState('#263D2B');
  const [isCustomColorActive, setIsCustomColorActive] = useState(false);
  const [selectedFinish, setSelectedFinish] = useState(NAIL_FINISHES[0]); // Glossy default
  const [selectedArt, setSelectedArt] = useState(NAIL_ART_OPTIONS[0]); // None default
  const [active3DNote, setActive3DNote] = useState(null); // Artisan note when a 3D design is tried

  useEffect(() => {
    document.title = 'The Nail Art Studio — GLAM GIRL BY JANKI | Ottawa';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Reset only shape (restoring Almond default)
  const handleResetShape = () => {
    setSelectedShape(NAIL_SHAPES[4]);
  };

  // Reset all customization choices
  const handleResetAll = () => {
    setSelectedShape(NAIL_SHAPES[4]);
    setSelectedColor(NAIL_COLORS[4]);
    setIsCustomColorActive(false);
    setSelectedFinish(NAIL_FINISHES[0]);
    setSelectedArt(NAIL_ART_OPTIONS[0]);
    setActive3DNote(null);
  };

  // Apply preset from the 12 Nail Art Gallery cards
  const handleApplyGalleryPreset = (preset) => {
    if (preset.shapeId) {
      const matchShape = NAIL_SHAPES.find((s) => s.id === preset.shapeId);
      if (matchShape) setSelectedShape(matchShape);
    }

    if (preset.colorId) {
      const matchColor = NAIL_COLORS.find((c) => c.id === preset.colorId);
      if (matchColor) {
        setSelectedColor(matchColor);
        setIsCustomColorActive(false);
      }
    }

    if (preset.finishId) {
      const matchFinish = NAIL_FINISHES.find((f) => f.id === preset.finishId);
      if (matchFinish) setSelectedFinish(matchFinish);
    }

    if (preset.artId) {
      const matchArt = NAIL_ART_OPTIONS.find((a) => a.id === preset.artId);
      if (matchArt) setSelectedArt(matchArt);
    }

    if (preset.artisanNote) {
      setActive3DNote(preset.artisanNote);
    } else {
      setActive3DNote(null);
    }

    // Smoothly scroll up to the live preview workbench
    const workbenchEl = document.getElementById('nail-customizer-workbench');
    if (workbenchEl) {
      workbenchEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 6 Salon Nail Treatments (Using verified catalog prices and durations)
  const salonNailServices = [
    {
      id: 'gel-manicure',
      name: 'Haute Gel Manicure & Russian Cuticle Detail',
      tagline: 'Medical-grade dry e-file prep & high-gloss diamond gel',
      price: 65,
      duration: '60 min',
      image: '/images/nails/classic-manicure.webp',
      description: 'Precision dry cuticle detailing followed by rubber base foundation, dual high-pigment gel lacquer coats, and diamond topcoat.',
      highlights: ['Waterless e-file cuticle care', 'Lasts 3–4 weeks without chipping', 'Non-toxic & HEMA-free']
    },
    {
      id: 'biab-overlay',
      name: 'BIAB (Builder In A Bottle) Structured Manicure',
      tagline: 'Natural nail reinforcement with apex building',
      price: 80,
      duration: '75 min',
      image: '/images/nails/nail-extensions.webp',
      description: 'Sculpted reinforcement designed to strengthen and grow break-prone natural nails while creating a flawless, balanced apex curve.',
      highlights: ['Reinforced architectural apex', 'High flexural strength', 'Infilled every 3–4 weeks']
    },
    {
      id: 'gel-x-extensions',
      name: 'Apres Gel-X Couture Soft Gel Extensions',
      tagline: 'Zero-damage full-cover sculpted length',
      price: 95,
      duration: '90 min',
      image: '/images/nails/gel-nail-extensions.webp',
      description: 'Revolutionary full-cover soft-gel tips custom-sized to your nail beds. Choose from Stiletto, Coffin, Almond, Square, or Oval.',
      highlights: ['Zero acrylic odor or harsh MMA', 'Pre-sculpted structural perfection', 'Gentle soak-off removal']
    },
    {
      id: 'nail-art-addon',
      name: 'Bespoke Hand-Painted Nail Art (Full Set)',
      tagline: 'Artisan brushwork, chrome powders & velvet cat-eye',
      price: 35,
      duration: '30 min',
      image: '/images/nails/nail-art-design.webp',
      description: 'Intricate custom detailing painted with Japanese liner brushes. Includes velvet cat-eye, chrome powders, micro-French, and line art.',
      highlights: ['100% hand-painted by master artists', 'Chrome, glitter & line art', 'Personalized aesthetic motif']
    },
    {
      id: 'acrylic-sculpting',
      name: 'Full Acrylic Sculpting & Refill',
      tagline: 'High-strength architectural nail enhancements',
      price: 85,
      duration: '75 min',
      image: '/images/nails/acrylic-nails.webp',
      description: 'High-strength sculpted acrylic on forms or tips for dramatic length, custom sidewall taper, and durable long-wear beauty.',
      highlights: ['Maximum strength & length', 'Custom sculpted shape', 'High-gloss gel seal']
    },
    {
      id: 'nail-repair-care',
      name: 'Atelier Nail Repair & Keratin Recovery',
      tagline: 'Therapeutic rehabilitation for compromised nails',
      price: 30,
      duration: '30 min',
      image: '/images/nails/nail-repair.webp',
      description: 'Gentle non-damaging gel removal, keratin matrix bonding treatment, and organic botanical oil therapy to restore healthy nail plates.',
      highlights: ['Gentle steam/foil removal', 'Pure keratin bond infusion', 'Organic cuticle nourishment']
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#F7F4ED] text-[#10110F] pt-24 sm:pt-28 pb-20 selection:bg-[#263D2B] selection:text-white font-sans antialiased">
      
      {/* Back to Special Treatments Navigation Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2">
        <Link
          to="/special-treatments"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#465640] hover:text-[#263D2B] transition-colors py-1 cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-[#263D2B] group-hover:-translate-x-1 transition-transform" />
          <span>Back to Special Treatments</span>
        </Link>
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO HEADER                                                            */}
      {/* ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 sm:pt-10 pb-12 sm:pb-16 text-center">
        <ScrollReveal className="max-w-4xl mx-auto space-y-4">
          
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
            <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.26em] text-[#263D2B]">
              HAUTE NAIL ATELIER &amp; COUTURE
            </span>
          </div>

          {/* Exact Page Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#10110F] font-normal tracking-tight leading-[1.12]">
            The Nail Art Studio
          </h1>

          <div className="w-14 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

          {/* Exact Subtitle */}
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto pt-1 italic">
            &ldquo;Discover your style. Choose your shape. Create your signature nails.&rdquo;
          </p>

          {/* Quick Anchor CTA Buttons */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#choose-nail-shape"
              className="global-button !px-7 !py-3 text-white text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer flex items-center gap-2"
            >
              <span>CHOOSE YOUR SHAPE</span>
              <span className="text-sm">↓</span>
            </a>

            <a
              href="#nail-customizer-workbench"
              className="global-button-secondary !px-7 !py-3 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
            >
              <Palette className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>CUSTOMIZE LIVE DESIGN</span>
            </a>

            <a
              href="#mix-match-finger-designer"
              className="global-button-secondary !px-7 !py-3 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
            >
              <Layers className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>10-FINGER MIX &amp; MATCH</span>
            </a>

            <a
              href="#magnetic-cat-eye-lab"
              className="global-button-secondary !px-7 !py-3 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
            >
              <Compass className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>MAGNETIC CAT-EYE LAB</span>
            </a>

            <a
              href="#nail-pattern-journal"
              className="global-button-secondary !px-7 !py-3 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>NAIL PATTERN JOURNAL</span>
            </a>

            <a
              href="#behind-nail-design"
              className="global-button-secondary !px-7 !py-3 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
            >
              <Zap className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>BEHIND THE DESIGN</span>
            </a>

            <a
              href="#artistry-collection"
              className="global-button-secondary !px-7 !py-3 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>THE ARTISTRY COLLECTION</span>
            </a>

            <a
              href="#nail-art-gallery"
              className="global-button-secondary !px-7 !py-3 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>NAIL ART GALLERY</span>
            </a>

            <a
              href="#seasonal-nail-collections"
              className="global-button-secondary !px-7 !py-3 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
            >
              <Flower2 className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>SEASONAL COLLECTIONS</span>
            </a>

            <a
              href="#3d-nail-art-gallery"
              className="global-button-secondary !px-7 !py-3 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
            >
              <Gem className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>3D NAIL ART GALLERY</span>
            </a>

            <a
              href="#appointment-experience"
              className="global-button-secondary !px-7 !py-3 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>APPOINTMENT EXPERIENCE</span>
            </a>
          </div>

          {/* Atelier Trust Badges */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left max-w-3xl mx-auto">
            <div className="p-3 bg-white rounded-2xl border border-[#DCE1D8] shadow-2xs space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B]" />
                HEMA-Free Gels
              </span>
              <p className="text-[10.5px] text-[#6B7068]">Medical-grade hypoallergenic resins.</p>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-[#DCE1D8] shadow-2xs space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1.5">
                <Gem className="w-3.5 h-3.5 text-[#263D2B]" />
                Russian E-File
              </span>
              <p className="text-[10.5px] text-[#6B7068]">Precision dry cuticle therapy.</p>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-[#DCE1D8] shadow-2xs space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#263D2B]" />
                BIAB Reinforcement
              </span>
              <p className="text-[10.5px] text-[#6B7068]">Natural nail apex building.</p>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-[#DCE1D8] shadow-2xs space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#263D2B]" />
                Bespoke Artistry
              </span>
              <p className="text-[10.5px] text-[#6B7068]">100% hand-painted motifs.</p>
            </div>
          </div>

        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 2. CHOOSE YOUR NAIL SHAPE SECTION (PROMINENTLY NEAR THE TOP)               */}
      {/* ========================================================================= */}
      <NailShapeSelector
        selectedShape={selectedShape}
        onSelectShape={setSelectedShape}
        onResetShape={handleResetShape}
        activeColorHex={isCustomColorActive ? customHexColor : selectedColor.hex}
      />

      {/* ========================================================================= */}
      {/* 3. NAIL CUSTOMIZATION CONTROLS & LIVE 5-FINGER PREVIEW WORKBENCH          */}
      {/* ========================================================================= */}
      <NailCustomizerWorkbench
        selectedShape={selectedShape}
        setSelectedShape={setSelectedShape}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        customHexColor={customHexColor}
        setCustomHexColor={setCustomHexColor}
        isCustomColorActive={isCustomColorActive}
        setIsCustomColorActive={setIsCustomColorActive}
        selectedFinish={selectedFinish}
        setSelectedFinish={setSelectedFinish}
        selectedArt={selectedArt}
        setSelectedArt={setSelectedArt}
        onResetAll={handleResetAll}
        active3DNote={active3DNote}
        onDismiss3DNote={() => setActive3DNote(null)}
      />

      {/* ========================================================================= */}
      {/* 3. MIX & MATCH FINGER DESIGNER (TEN FINGER INDIVIDUAL LAB)                */}
      {/* ========================================================================= */}
      <MixMatchFingerDesigner />

      {/* ========================================================================= */}
      {/* 4. MAGNETIC CAT-EYE NAIL LAB (INTERACTIVE OPTICAL SHIMMER SIMULATOR)      */}
      {/* ========================================================================= */}
      <MagneticCatEyeLab />

      {/* ========================================================================= */}
      {/* 5. NAIL PATTERN LIBRARY — 3D INTERACTIVE BEAUTY DIARY                     */}
      {/* ========================================================================= */}
      <NailPatternDiary
        onApplyPreset={handleApplyGalleryPreset}
      />

      {/* ========================================================================= */}
      {/* 6. BEHIND THE NAIL DESIGN (4-STAGE ANIMATED CREATION JOURNEY)             */}
      {/* ========================================================================= */}
      <BehindNailDesign
        onApplyPreset={handleApplyGalleryPreset}
      />

      {/* ========================================================================= */}
      {/* 7. THE ARTISTRY COLLECTION (EXCLUSIVE EDITORIAL GALLERY)                  */}
      {/* ========================================================================= */}
      <ArtistryCollection
        onApplyPreset={handleApplyGalleryPreset}
      />

      {/* ========================================================================= */}
      {/* 8. NAIL ART GALLERY (16 CURATED DESIGNS WITH "TRY THIS DESIGN" TRIGGER)   */}
      {/* ========================================================================= */}
      <NailArtGallery
        onApplyPreset={handleApplyGalleryPreset}
      />

      {/* ========================================================================= */}
      {/* 6. SEASONAL NAIL ART COLLECTIONS (SPRING, SUMMER, AUTUMN, WINTER)         */}
      {/* ========================================================================= */}
      <SeasonalNailCollections
        onApplyPreset={handleApplyGalleryPreset}
      />

      {/* ========================================================================= */}
      {/* 9. 3D NAIL ART GALLERY (10 SCULPTED DESIGNS WITH INTERACTIVE MODAL)       */}
      {/* ========================================================================= */}
      <Nail3DGallery
        onApplyPreset={handleApplyGalleryPreset}
      />

      {/* ========================================================================= */}
      {/* 10. YOUR NAIL APPOINTMENT EXPERIENCE (5-STAGE INTERACTIVE JOURNEY)        */}
      {/* ========================================================================= */}
      <NailAppointmentExperience
        selectedShape={selectedShape}
        selectedColor={selectedColor}
        selectedFinish={selectedFinish}
        selectedArt={selectedArt}
        active3DNote={active3DNote}
        onApplyPreset={handleApplyGalleryPreset}
      />

      {/* ========================================================================= */}
      {/* 11. SALON NAIL SERVICES & TRANSPARENT PRICING CATALOG                     */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-20 sm:pt-28">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
            <span>SALON CATALOG &amp; PRICING</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
            Master Nail Treatments
          </h2>

          <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto">
            Transparent studio rates in Canadian Dollars (CAD). Direct masterclass attention with salon director Janki Patel in Ottawa.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {salonNailServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-[#DCE1D8] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F7F4ED]">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#263D2B] border border-[#DCE1D8] shadow-xs flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#263D2B]" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg sm:text-xl font-normal text-[#10110F] group-hover:text-[#263D2B] transition-colors leading-snug">
                      {service.name}
                    </h3>
                    <p className="text-[11px] font-medium text-[#465640] uppercase tracking-wider">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-[13px] text-[#6B7068] leading-relaxed font-light">
                    {service.description}
                  </p>

                  <ul className="space-y-1.5 pt-2 border-t border-[#DCE1D8]/60 text-xs text-[#10110F]">
                    {service.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[11px] text-[#465640]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#263D2B] flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#DCE1D8]/60 flex items-center justify-between gap-3 mt-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">STUDIO RATE</span>
                  <span className="font-serif text-xl sm:text-2xl font-normal text-[#10110F]">
                    ${service.price} <span className="text-xs text-[#6B7068] font-sans">CAD</span>
                  </span>
                </div>

                <Link
                  to={`/book-appointment?service=${service.id}`}
                  className="global-button !px-5 !py-2.5 text-xs uppercase font-bold tracking-wider text-white flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>BOOK NOW</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. BOTTOM LUXURY BOOKING BANNER                                           */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16 sm:pt-24">
        <ScrollReveal className="p-8 sm:p-12 rounded-3xl bg-white text-[#10110F] border border-[#DCE1D8] shadow-xs relative overflow-hidden text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              <Sparkles className="w-4 h-4 text-[#263D2B]" />
              BESPOKE SANCTUARY APPOINTMENTS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#10110F]">
              Ready for your signature nail transformation?
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed max-w-lg mx-auto font-sans font-light">
              Reserve an unhurried, single-guest appointment with master artist Janki Khatroja in our private Ottawa suite.
            </p>

            <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
              <Link
                to="/book-appointment?service=gel-manicure"
                className="global-button !px-8 !py-3.5 text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
              >
                BOOK NAIL APPOINTMENT
              </Link>
              <a
                href="#choose-nail-shape"
                className="global-button-secondary !px-8 !py-3.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                SELECT NAIL SHAPE
              </a>
            </div>

            <div className="pt-4 border-t border-[#DCE1D8] flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#6B7068]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B]" />
                Single-Guest Private Suite
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-[#263D2B]" />
                Concierge: <a href="tel:+16162550549" className="font-semibold text-[#10110F] hover:text-[#263D2B]">+1 (616) 255-0549</a>
              </span>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
