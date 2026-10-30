// GLAM GIRL BY JANKI — Hair Colour Atelier Page
// Techniques, Interactive Shade Explorer, Inspiration Gallery, Before & Afters, Colour Match Quiz, and Care Guide

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Scissors, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Palette, 
  HelpCircle, 
  RotateCcw, 
  Phone, 
  HeartHandshake, 
  Calendar,
  SplitSquareVertical,
  Layers,
  Zap,
  Info,
  X,
  Eye,
  SlidersHorizontal,
  Filter,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Heart,
  Bookmark,
  Check,
  Scale,
  Compass,
  CheckSquare,
  Square,
  ListChecks,
  BookOpen,
  Sun,
  Droplets,
  Edit3,
  ChevronDown,
  ChevronUp,
  RefreshCw
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal/ScrollReveal';
import { 
  HAIR_COLOUR_TECHNIQUES,
  TECHNIQUE_FILTERS,
  COLOUR_INSPIRATION_GALLERY,
  COLOUR_FAMILIES_CATALOGUE,
  SHADE_FAMILIES, 
  BEFORE_AFTER_TRANSFORMATIONS, 
  HAIR_COLOUR_QUIZ_QUESTIONS,
  COLOUR_PROCESS_STAGES,
  COLOUR_CARE_JOURNAL_CHAPTERS,
  COLOUR_FAMILY_CARE_ADVICE,
  HAIR_CONCERN_ADVICE
} from '../data/hairColourData';
import LiveHairColorCustomizer from '../components/hair-studio/LiveHairColorCustomizer';
import HairColorServiceMenu from '../components/services/HairColorServiceMenu';
import SaveDreamColourSection from '../components/hair-studio/SaveDreamColourSection';
import { 
  toggleSaveShade, 
  isShadeSaved, 
  toggleSaveInspiration, 
  isInspirationSaved, 
  getSavedDreamCollection 
} from '../utils/dreamColourStorage';

export default function HairColorPage() {
  // Navigation & Page Title
  useEffect(() => {
    document.title = 'The Hair Colour Atelier — Balayage, Highlights & Toning | GLAM GIRL BY JANKI';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // State: Explore Colour Techniques
  const [activeTechniqueFilter, setActiveTechniqueFilter] = useState('all');
  const [selectedTechniqueModal, setSelectedTechniqueModal] = useState(null);
  const galleryScrollRef = useRef(null);

  const scrollGallery = (direction) => {
    if (galleryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      galleryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // State: Find Your Perfect Shade Explorer
  const [selectedFamilyId, setSelectedFamilyId] = useState(COLOUR_FAMILIES_CATALOGUE[0].id);
  const [selectedShade, setSelectedShade] = useState(COLOUR_FAMILIES_CATALOGUE[0].shades[0]);
  const [colourIntensity, setColourIntensity] = useState('Medium'); // 'Subtle' | 'Medium' | 'Bold'
  const [desiredEffect, setDesiredEffect] = useState('Dimensional'); // 'Natural' | 'Dimensional' | 'Vibrant'
  const [colourCoverage, setColourCoverage] = useState('Balayage'); // 'All-over colour' | 'Highlights' | 'Balayage' | 'Root Melt'
  const [previewSliderPos, setPreviewSliderPos] = useState(50);
  const [comparedShades, setComparedShades] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Unified Dream Colour Collection state
  const [savedDreamCollection, setSavedDreamCollection] = useState(() => getSavedDreamCollection());
  const [favouriteShades, setFavouriteShades] = useState(() => {
    try {
      const saved = localStorage.getItem('glam_hair_shade_favorites');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Listen to live cross-component dream colour collection updates
  useEffect(() => {
    const handleDreamUpdate = () => {
      const col = getSavedDreamCollection();
      setSavedDreamCollection(col);
      try {
        const legacy = localStorage.getItem('glam_hair_shade_favorites');
        if (legacy) setFavouriteShades(JSON.parse(legacy));
      } catch {}
    };

    window.addEventListener('glam_dream_colour_updated', handleDreamUpdate);
    window.addEventListener('storage', handleDreamUpdate);

    return () => {
      window.removeEventListener('glam_dream_colour_updated', handleDreamUpdate);
      window.removeEventListener('storage', handleDreamUpdate);
    };
  }, []);

  const totalDreamCount = (savedDreamCollection.shades?.length || 0) + (savedDreamCollection.inspirations?.length || 0);

  // Toggle Shade Save in Dream Collection
  const toggleFavouriteShade = (shadeOrId, e) => {
    if (e) e.stopPropagation();
    const shadeId = typeof shadeOrId === 'string' ? shadeOrId : shadeOrId?.id;
    if (!shadeId) return;

    let targetShade = typeof shadeOrId === 'object' && shadeOrId ? shadeOrId : null;
    let targetFamily = activeFamily;
    if (!targetShade) {
      for (const fam of COLOUR_FAMILIES_CATALOGUE) {
        const found = fam.shades.find((s) => s.id === shadeId);
        if (found) {
          targetShade = found;
          targetFamily = fam;
          break;
        }
      }
    }

    if (targetShade) {
      const isSaved = toggleSaveShade(targetShade, targetFamily?.id, targetFamily?.name);
      setFavouriteShades((prev) => ({ ...prev, [shadeId]: isSaved }));
    }
  };

  // Toggle Technique Look Save
  const toggleTechniqueInspiration = (tech, e) => {
    if (e) e.stopPropagation();
    if (!tech) return;
    toggleSaveInspiration({
      id: `tech-${tech.id}`,
      type: 'technique',
      title: tech.name,
      techniqueName: tech.name,
      techniqueId: tech.id,
      image: tech.image,
      vibe: tech.tagline || tech.categoryLabel,
      tones: tech.expectedResult,
      serviceId: tech.serviceId,
      sourceSection: 'Explore Colour Techniques'
    });
  };

  // Toggle Gallery Inspiration Look Save
  const toggleGalleryInspiration = (inspo, e) => {
    if (e) e.stopPropagation();
    if (!inspo) return;
    toggleSaveInspiration({
      id: inspo.id,
      type: 'gallery',
      title: inspo.title,
      techniqueName: inspo.techniqueName,
      techniqueId: inspo.techniqueId,
      image: inspo.image,
      vibe: inspo.vibe,
      tones: inspo.tones,
      sourceSection: 'Signature Colour Inspiration'
    });
  };

  // Toggle Transformation Case Study Look Save
  const toggleTransformationInspiration = (trans, e) => {
    if (e) e.stopPropagation();
    if (!trans) return;
    toggleSaveInspiration({
      id: trans.id,
      type: 'transformation',
      title: trans.title,
      techniqueName: trans.technique,
      techniqueId: trans.id,
      image: trans.afterImage,
      vibe: trans.service,
      tones: trans.afterDesc,
      sourceSection: 'Before & After Transformations'
    });
  };

  const toggleCompareShade = (shade, e) => {
    if (e) e.stopPropagation();
    setComparedShades((prev) => {
      const exists = prev.some((s) => s.id === shade.id);
      if (exists) {
        return prev.filter((s) => s.id !== shade.id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), shade];
      }
      return [...prev, shade];
    });
  };

  const activeFamily = COLOUR_FAMILIES_CATALOGUE.find((f) => f.id === selectedFamilyId) || COLOUR_FAMILIES_CATALOGUE[0];

  const currentShadeIndex = activeFamily.shades.findIndex((s) => s.id === selectedShade?.id);

  const handlePrevShade = () => {
    if (currentShadeIndex > 0) {
      setSelectedShade(activeFamily.shades[currentShadeIndex - 1]);
    } else {
      setSelectedShade(activeFamily.shades[activeFamily.shades.length - 1]);
    }
  };

  const handleNextShade = () => {
    if (currentShadeIndex < activeFamily.shades.length - 1) {
      setSelectedShade(activeFamily.shades[currentShadeIndex + 1]);
    } else {
      setSelectedShade(activeFamily.shades[0]);
    }
  };

  const handleResetShadePreferences = () => {
    setSelectedShade(activeFamily.shades[0]);
    setColourIntensity('Medium');
    setDesiredEffect('Dimensional');
    setColourCoverage('Balayage');
    setPreviewSliderPos(50);
  };

  // Keyboard shortcut (Escape) & body scroll locking for modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedTechniqueModal) setSelectedTechniqueModal(null);
        if (isCompareModalOpen) setIsCompareModalOpen(false);
      }
    };
    if (selectedTechniqueModal || isCompareModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedTechniqueModal, isCompareModalOpen]);

  const filteredTechniques = activeTechniqueFilter === 'all'
    ? HAIR_COLOUR_TECHNIQUES
    : HAIR_COLOUR_TECHNIQUES.filter(tech => tech.categoryIds && tech.categoryIds.includes(activeTechniqueFilter));

  // State: The Colour Process (Five Stages & Interactive Checklist)
  const [activeProcessStageIndex, setActiveProcessStageIndex] = useState(0);
  const [isViewAllStages, setIsViewAllStages] = useState(false);
  const [aftercareChecklistStatus, setAftercareChecklistStatus] = useState({});

  const handlePrevProcessStage = () => {
    setActiveProcessStageIndex((prev) => (prev > 0 ? prev - 1 : COLOUR_PROCESS_STAGES.length - 1));
  };

  const handleNextProcessStage = () => {
    setActiveProcessStageIndex((prev) => (prev < COLOUR_PROCESS_STAGES.length - 1 ? prev + 1 : 0));
  };

  const toggleChecklistItem = (id) => {
    setAftercareChecklistStatus((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const activeStage = COLOUR_PROCESS_STAGES[activeProcessStageIndex];

  // State: Gallery Filter
  const [galleryFilter, setGalleryFilter] = useState('all');

  // State: Before/After Slider
  const [activeTransformationIndex, setActiveTransformationIndex] = useState(0);
  const [comparisonSliderPos, setComparisonSliderPos] = useState(50);

  // State: Colour Match Quiz
  const [quizStep, setQuizStep] = useState(0); // 0 to 3, 4 is result
  const [quizAnswers, setQuizAnswers] = useState({
    baseLevel: null,
    skinUndertone: null,
    maintenance: null,
    vibe: null
  });

  const activeTransformation = BEFORE_AFTER_TRANSFORMATIONS[activeTransformationIndex];

  // Handle Quiz Option Selection
  const handleSelectQuizOption = (questionId, value) => {
    const nextAnswers = { ...quizAnswers, [questionId]: value };
    setQuizAnswers(nextAnswers);

    if (quizStep < HAIR_COLOUR_QUIZ_QUESTIONS.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizStep(HAIR_COLOUR_QUIZ_QUESTIONS.length); // Show result
    }
  };

  const handleResetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({
      baseLevel: null,
      skinUndertone: null,
      maintenance: null,
      vibe: null
    });
  };

  // Compute Quiz Recommendation
  const getQuizRecommendation = () => {
    if (quizAnswers.maintenance === 'low' || quizAnswers.vibe === 'natural-balayage') {
      return {
        title: 'Noor Hand-Painted Balayage',
        technique: 'Seamless Balayage with Lived-In Root Melt',
        price: 195,
        duration: '150 min',
        serviceId: 'noor-balayage',
        image: '/images/hair-care/58-noor-balayage.webp',
        description: 'Hand-painted lightener ribbons concentrated on mid-lengths and face-framing pieces with an organic shadow root. Requires zero high-maintenance upkeep and grows out like natural sunlit silk.',
        formulaAdvice: quizAnswers.skinUndertone === 'cool' 
          ? 'Recommended Formula: Smokey mushroom blonde with pearl toner.'
          : 'Recommended Formula: Sun-kissed caramel honey with amber gloss.'
      };
    } else if (quizAnswers.vibe === 'bright-highlights') {
      return {
        title: 'Full Foil Multi-Dimensional Highlights',
        technique: 'Micro-Weave Highlights & Acidic Gloss Bath',
        price: 140,
        duration: '110 min',
        serviceId: 'highlights',
        image: '/images/hair-care/59-highlights.webp',
        description: 'Micro-woven foil placement from scalp to ends providing maximum lightness and luminous multi-tonal brightness across the crown and lengths.',
        formulaAdvice: 'Recommended Formula: High-lift blonde neutralizer with violet toner gloss.'
      };
    } else if (quizAnswers.vibe === 'ash-melt') {
      return {
        title: 'Shadow Root Melt & Cool Toning Glaze',
        technique: 'Diffused Root Shadow with Demi-Permanent Gloss',
        price: 85,
        duration: '60 min',
        serviceId: 'root-touch-up',
        image: '/images/hair-care/60-root-touch-up.webp',
        description: 'Banish brass and soften previous foil lines with a customized cool ash shadow root that blends effortlessly into existing blonde.',
        formulaAdvice: 'Recommended Formula: Ash brown base feathering into cool platinum mid-lengths.'
      };
    } else {
      return {
        title: 'Kesariya Ammonia-Free Global Colour',
        technique: 'Rich Botanical Single-Process Saturation',
        price: 85,
        duration: '75 min',
        serviceId: 'full-colour',
        image: '/images/hair-care/57-kesariya-hair-colour.webp',
        description: 'Deep, glossy all-over color formulated with nourishing plant extracts for 100% gray coverage and high-luster chocolate or chestnut depth.',
        formulaAdvice: 'Recommended Formula: Rich hazelnut mocha with antioxidant gloss seal.'
      };
    }
  };

  const quizResult = getQuizRecommendation();

  // =========================================================================
  // STATE: THE COLOUR CARE JOURNAL (4 Chapters, Checklists, Planner, Preferences)
  // =========================================================================
  const [activeJournalChapterIndex, setActiveJournalChapterIndex] = useState(0);
  const [expandedJournalTips, setExpandedJournalTips] = useState({ 'wash-0': true, 'shine-0': true });

  const toggleJournalTip = (tipKey) => {
    setExpandedJournalTips((prev) => ({
      ...prev,
      [tipKey]: !prev[tipKey]
    }));
  };

  // Checklist progress with safe LocalStorage handling
  const [journalChecklist, setJournalChecklist] = useState(() => {
    try {
      const saved = localStorage.getItem('glam_hair_journal_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleJournalChecklistItem = (id) => {
    setJournalChecklist((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('glam_hair_journal_checklist', JSON.stringify(updated));
      } catch (e) {
        console.warn('LocalStorage error', e);
      }
      return updated;
    });
  };

  const handleResetJournalChecklist = () => {
    setJournalChecklist({});
    try {
      localStorage.removeItem('glam_hair_journal_checklist');
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  };

  // Weekly Hair Care Planner
  const DEFAULT_WEEKLY_PLANNER = {
    Mon: { routine: 'Wash & Light Condition', category: 'wash', note: 'Sulfate-free wash + cool cuticle rinse' },
    Tue: { routine: 'Heat-Free Day / Silk Waves', category: 'heat-free', note: 'Air-dry or silk heatless curls' },
    Wed: { routine: 'Leave-In Gloss & Shine Mist', category: 'shine', note: '1 drop argan/botanical serum on ends' },
    Thu: { routine: 'Gentle Wash & Scalp Massage', category: 'wash', note: 'Lather roots only, lukewarm water' },
    Fri: { routine: 'Thermal Shield Styling', category: 'heat-shield', note: 'Apply 450°F protectant spray before tools' },
    Sat: { routine: 'Deep Hydration Mask Ritual', category: 'mask', note: '15-min intensive restorative mask' },
    Sun: { routine: 'Scalp Reset & Silk Sleep Care', category: 'rest', note: 'Mulberry silk pillowcase protection' }
  };

  const [weeklyPlanner, setWeeklyPlanner] = useState(() => {
    try {
      const saved = localStorage.getItem('glam_hair_weekly_planner');
      return saved ? JSON.parse(saved) : DEFAULT_WEEKLY_PLANNER;
    } catch {
      return DEFAULT_WEEKLY_PLANNER;
    }
  });

  const [selectedPlannerDay, setSelectedPlannerDay] = useState('Mon');
  const [isEditingPlannerDay, setIsEditingPlannerDay] = useState(false);
  const [plannerEditText, setPlannerEditText] = useState('');

  const handleUpdatePlannerDay = (day, newRoutine, category) => {
    setWeeklyPlanner((prev) => {
      const updated = {
        ...prev,
        [day]: {
          ...prev[day],
          routine: newRoutine,
          category: category || prev[day]?.category || 'wash'
        }
      };
      try {
        localStorage.setItem('glam_hair_weekly_planner', JSON.stringify(updated));
      } catch (e) {
        console.warn('LocalStorage error', e);
      }
      return updated;
    });
    setIsEditingPlannerDay(false);
  };

  // Personalise My Colour Care Preferences
  const [carePreferences, setCarePreferences] = useState(() => {
    try {
      const saved = localStorage.getItem('glam_hair_care_preferences');
      return saved ? JSON.parse(saved) : {
        colourFamily: 'Brunette',
        concern: 'Dryness',
        routineLevel: 'Balanced'
      };
    } catch {
      return {
        colourFamily: 'Brunette',
        concern: 'Dryness',
        routineLevel: 'Balanced'
      };
    }
  });

  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [careRoutineNotice, setCareRoutineNotice] = useState(false);

  const handleSaveCarePreferences = (newPrefs) => {
    setCarePreferences(newPrefs);
    try {
      localStorage.setItem('glam_hair_care_preferences', JSON.stringify(newPrefs));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
    setIsEditingPreferences(false);
    setCareRoutineNotice(true);
    setTimeout(() => setCareRoutineNotice(false), 3500);
  };

  // Favourited Tips with safe persistence
  const [favouriteJournalTips, setFavouriteJournalTips] = useState(() => {
    try {
      const saved = localStorage.getItem('glam_hair_journal_favorites');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleFavouriteJournalTip = (tipId, e) => {
    if (e) e.stopPropagation();
    setFavouriteJournalTips((prev) => {
      const updated = { ...prev, [tipId]: !prev[tipId] };
      try {
        localStorage.setItem('glam_hair_journal_favorites', JSON.stringify(updated));
      } catch (err) {
        console.warn('LocalStorage error', err);
      }
      return updated;
    });
  };

  const activeJournalChapter = COLOUR_CARE_JOURNAL_CHAPTERS[activeJournalChapterIndex];

  // Global Progress across all 4 chapters (20 items total)
  const totalJournalChecklistCount = COLOUR_CARE_JOURNAL_CHAPTERS.reduce(
    (acc, ch) => acc + (ch.checklist?.length || 0), 0
  );
  const completedJournalChecklistCount = Object.values(journalChecklist).filter(Boolean).length;
  const journalProgressPercent = Math.min(100, Math.round((completedJournalChecklistCount / (totalJournalChecklistCount || 1)) * 100));

  return (
    <div className="w-full min-h-screen bg-[#F7F4ED] text-[#10110F] pt-24 sm:pt-28 pb-20 selection:bg-[#263D2B] selection:text-white font-sans antialiased">
      
      {/* ========================================================================= */}
      {/* 0. BACK TO SPECIAL TREATMENTS NAVIGATION BAR                              */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
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
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-4 pb-12 sm:pb-16 text-center">
        <ScrollReveal className="max-w-4xl mx-auto space-y-4">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
            <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.26em] text-[#263D2B]">
              HAUTE HAIR COLOUR &amp; BALAYAGE
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#10110F] font-normal tracking-tight leading-[1.12]">
            The Hair Colour Atelier
          </h1>

          <div className="w-14 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

          {/* Subtitle */}
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto italic">
            &ldquo;Master hand-painted dimension, bespoke toning, and healthy bond-protected radiance tailored to your skin tone.&rdquo;
          </p>

          {/* Quick CTAs */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#live-customizer"
              className="global-button !px-8 !py-3.5 text-white text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer flex items-center gap-2 hover:scale-[1.02] transition-transform"
            >
              <Palette className="w-3.5 h-3.5 text-white" />
              <span>LIVE HAIR CUSTOMIZER</span>
              <Sparkles className="w-3 h-3 text-[#A8B5A0]" />
            </a>

            <a
              href="#hair-colour-menu"
              className="global-button-secondary !px-6 !py-3 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
            >
              <Droplets className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>COLOUR SERVICE MENU</span>
            </a>

            <a
              href="#colour-techniques"
              className="global-button-secondary !px-6 !py-3 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
            >
              <span>COLOUR TECHNIQUES</span>
              <span className="text-sm">↓</span>
            </a>

            <a
              href="#shade-explorer"
              className="global-button-secondary !px-6 !py-3 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
            >
              <Palette className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>SHADE EXPLORER</span>
            </a>

            <a
              href="#dream-colour-collection"
              className="global-button-secondary !px-6 !py-3 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
            >
              <Heart className="w-3.5 h-3.5 text-[#263D2B] fill-[#263D2B]/30" />
              <span>DREAM MOODBOARD</span>
              {totalDreamCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#263D2B] text-[#A8B5A0] text-[10px] font-mono font-bold">
                  {totalDreamCount}
                </span>
              )}
            </a>

            <a
              href="#colour-process"
              className="global-button-secondary !px-6 !py-3 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
            >
              <Compass className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>THE PROCESS</span>
            </a>

            <a
              href="#colour-quiz"
              className="global-button-secondary !px-6 !py-3 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>COLOUR MATCH QUIZ</span>
            </a>

            <a
              href="#transformations"
              className="global-button-secondary !px-6 !py-3 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
            >
              <SplitSquareVertical className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>BEFORE &amp; AFTERS</span>
            </a>

            <a
              href="#colour-care-journal"
              className="global-button-secondary !px-6 !py-3 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>CARE JOURNAL</span>
            </a>
          </div>

          {/* Atelier Trust Badges */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left max-w-3xl mx-auto">
            <div className="p-3 bg-white rounded-2xl border border-[#DCE1D8] shadow-2xs space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B]" />
                Olaplex Bond Guard
              </span>
              <p className="text-[10.5px] text-[#6B7068]">Protects hair fiber during lifting.</p>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-[#DCE1D8] shadow-2xs space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
                Ammonia-Free Options
              </span>
              <p className="text-[10.5px] text-[#6B7068]">Gentle, odor-free botanical gloss.</p>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-[#DCE1D8] shadow-2xs space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-[#263D2B]" />
                Single-Guest Suite
              </span>
              <p className="text-[10.5px] text-[#6B7068]">100% focused attention by Janki.</p>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-[#DCE1D8] shadow-2xs space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                Verified Pricing
              </span>
              <p className="text-[10.5px] text-[#6B7068]">Clear rates in CAD with blowouts.</p>
            </div>
          </div>

        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 1.5 LIVE HAIR COLOUR CUSTOMIZER (REAL-TIME MODEL HAIR RECOLOURING)       */}
      {/* ========================================================================= */}
      <LiveHairColorCustomizer />

      {/* ========================================================================= */}
      {/* 1.8 THE HAIR COLOUR MENU (APPROVED SALON SERVICES & BOOKING)              */}
      {/* ========================================================================= */}
      <HairColorServiceMenu />

      {/* ========================================================================= */}
      {/* 2. EXPLORE COLOUR TECHNIQUES (8 MASTER TECHNIQUES, FILTERS & INSPIRATION) */}
      {/* ========================================================================= */}
      <section id="colour-techniques" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16 sm:pt-24 scroll-mt-24">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B] shadow-xs">
            <Scissors className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>DISCIPLINES &amp; APPLICATION</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
            Explore Colour Techniques
          </h2>

          <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto italic">
            Discover your perfect colour. From soft, sun-kissed dimensions to bold transformations, explore the artistry behind every look.
          </p>
        </ScrollReveal>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {TECHNIQUE_FILTERS.map((filter) => {
            const isActive = activeTechniqueFilter === filter.id;
            const count = filter.id === 'all' 
              ? HAIR_COLOUR_TECHNIQUES.length 
              : HAIR_COLOUR_TECHNIQUES.filter(t => t.categoryIds?.includes(filter.id)).length;

            return (
              <button
                key={filter.id}
                onClick={() => setActiveTechniqueFilter(filter.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-sm'
                    : 'bg-white text-[#465640] border-[#DCE1D8] hover:border-[#263D2B] hover:text-[#10110F]'
                }`}
                aria-pressed={isActive}
              >
                <span>{filter.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                  isActive ? 'bg-[#18271B] text-[#A8B5A0]' : 'bg-[#F7F4ED] text-[#6B7068]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 8 Technique Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {filteredTechniques.map((tech) => (
            <div
              key={tech.id}
              className="bg-white rounded-3xl border border-[#DCE1D8] overflow-hidden shadow-2xs hover:shadow-xl hover:border-[#263D2B] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#10110F]">
                  <img
                    src={tech.image}
                    alt={tech.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 bg-[#10110F]/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-wider text-[#A8B5A0] border border-[#263D2B]">
                    {tech.categoryLabel}
                  </div>

                  {/* Save to Moodboard Button & Duration */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                    <button
                      type="button"
                      onClick={(e) => toggleTechniqueInspiration(tech, e)}
                      className={`p-1.5 rounded-full backdrop-blur-md transition-all shadow-2xs cursor-pointer ${
                        isInspirationSaved(`tech-${tech.id}`)
                          ? 'bg-[#263D2B] text-white border border-[#A8B5A0]'
                          : 'bg-white/95 text-[#263D2B] hover:text-[#10110F] border border-[#DCE1D8]'
                      }`}
                      title={isInspirationSaved(`tech-${tech.id}`) ? 'Saved to Inspiration Board' : 'Save technique to moodboard'}
                      aria-label={`Save ${tech.name} to Inspiration Board`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isInspirationSaved(`tech-${tech.id}`) ? 'fill-[#A8B5A0] text-[#A8B5A0]' : ''}`} />
                    </button>

                    <div className="bg-white/95 backdrop-blur-md px-2 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-wider text-[#263D2B] border border-[#DCE1D8] shadow-2xs flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#263D2B]" />
                      <span>{tech.duration}</span>
                    </div>
                  </div>

                  {/* Consultation-First Ribbon */}
                  {tech.isConsultationRequired && (
                    <div className="absolute bottom-3 left-3 right-3 bg-[#263D2B]/95 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider text-[#F7F4ED] text-center border border-[#465640]">
                      Strand Test &amp; Consultation First
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl font-normal text-[#10110F] group-hover:text-[#263D2B] transition-colors leading-snug">
                      {tech.name}
                    </h3>
                    <p className="text-[11px] font-semibold text-[#465640] uppercase tracking-wider line-clamp-1">
                      {tech.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-[#6B7068] leading-relaxed font-light line-clamp-3">
                    {tech.description}
                  </p>

                  {/* Expected result preview snippet */}
                  <div className="p-2.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1">
                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#263D2B]" />
                      Expected Result
                    </span>
                    <p className="text-[11px] text-[#465640] leading-snug line-clamp-2">
                      {tech.expectedResult}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer: Discover Technique CTA */}
              <div className="p-5 pt-0 border-t border-[#DCE1D8]/60 mt-3 space-y-3">
                <div className="flex items-center justify-between pt-3">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#6B7068] block">
                      {tech.isConsultationRequired ? 'ESTIMATED RATE' : 'STUDIO RATE'}
                    </span>
                    <span className="font-serif text-lg font-normal text-[#10110F]">
                      ${tech.price} <span className="text-[10px] text-[#6B7068] font-sans">{tech.isConsultationRequired ? 'CAD/hr' : 'CAD'}</span>
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-[#6B7068]">
                    {tech.duration}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTechniqueModal(tech)}
                  className="w-full global-button !py-2.5 text-[11px] uppercase font-bold tracking-wider text-white flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Discover Technique</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Signature Colour Inspiration Gallery */}
        <div className="mt-16 pt-12 border-t border-[#DCE1D8]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div className="space-y-1">
              <span className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#263D2B] flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#263D2B]" />
                ATELIER EDITORIAL
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#10110F]">
                Signature Colour Inspiration
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7068] font-light max-w-xl">
                Browse curated salon looks and select any inspiration to explore its underlying technique and formulation notes.
              </p>
            </div>

            {/* Scroll navigation controls */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => scrollGallery('left')}
                className="w-10 h-10 rounded-full border border-[#DCE1D8] bg-white hover:bg-[#F7F4ED] hover:border-[#263D2B] text-[#263D2B] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                aria-label="Previous looks"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollGallery('right')}
                className="w-10 h-10 rounded-full border border-[#DCE1D8] bg-white hover:bg-[#F7F4ED] hover:border-[#263D2B] text-[#263D2B] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                aria-label="Next looks"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Inspiration Scroll Strip */}
          <div
            ref={galleryScrollRef}
            className="flex items-stretch gap-5 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin scrollbar-thumb-[#263D2B]/30 scrollbar-track-transparent"
            style={{ scrollbarWidth: 'thin' }}
          >
            {COLOUR_INSPIRATION_GALLERY.map((inspo) => {
              const matchedTech = HAIR_COLOUR_TECHNIQUES.find(t => t.id === inspo.techniqueId);
              return (
                <div
                  key={inspo.id}
                  onClick={() => matchedTech && setSelectedTechniqueModal(matchedTech)}
                  className="flex-shrink-0 w-72 sm:w-80 bg-white rounded-3xl border border-[#DCE1D8] overflow-hidden shadow-2xs hover:shadow-lg hover:border-[#263D2B] transition-all duration-300 cursor-pointer group snap-start flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#10110F]">
                    <img
                      src={inspo.image}
                      alt={inspo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50" />
                    <div className="absolute top-3 left-3 bg-[#10110F]/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-wider text-[#A8B5A0] border border-[#263D2B]">
                      {inspo.techniqueName}
                    </div>

                    {/* Save Inspiration to Moodboard */}
                    <button
                      type="button"
                      onClick={(e) => toggleGalleryInspiration(inspo, e)}
                      className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md transition-all shadow-sm cursor-pointer z-10 ${
                        isInspirationSaved(inspo.id)
                          ? 'bg-[#263D2B] text-white border border-[#A8B5A0]'
                          : 'bg-white/95 text-[#263D2B] hover:text-[#10110F] border border-[#DCE1D8]'
                      }`}
                      title={isInspirationSaved(inspo.id) ? 'Saved to Inspiration Board' : 'Save inspiration look'}
                      aria-label={`Save ${inspo.title} to inspiration board`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isInspirationSaved(inspo.id) ? 'fill-[#A8B5A0] text-[#A8B5A0]' : ''}`} />
                    </button>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <h4 className="font-serif text-lg font-normal text-[#10110F] group-hover:text-[#263D2B] transition-colors leading-snug">
                      {inspo.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-[10.5px]">
                      <span className="px-2 py-0.5 rounded-md bg-[#F7F4ED] border border-[#DCE1D8] text-[#465640] font-medium">
                        {inspo.vibe}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#F7F4ED] border border-[#DCE1D8] text-[#263D2B] font-medium">
                        {inspo.tones}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-[#DCE1D8]/60 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#263D2B] group-hover:translate-x-0.5 transition-transform">
                      <span>Explore Technique</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2.5. LIVE HAIR COLOUR CUSTOMIZER — REAL-TIME HAIR PREVIEW STUDIO          */}
      {/* ========================================================================= */}
      <LiveHairColorCustomizer />

      {/* ========================================================================= */}
      {/* 3. FIND YOUR PERFECT SHADE — INTERACTIVE HAIR COLOUR EXPLORER             */}
      {/* ========================================================================= */}
      <section id="shade-explorer" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-20 sm:pt-28 scroll-mt-24">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B] shadow-xs">
            <Palette className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>TONE HARMONY &amp; ATELIER SWATCHES</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
            Find Your Perfect Shade
          </h2>

          <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto italic">
            Explore a world of colour, discover your signature shade, and find the look that feels uniquely you.
          </p>
        </ScrollReveal>

        <div className="bg-[#10110F] text-[#F7F4ED] rounded-3xl p-5 sm:p-8 lg:p-10 border-2 border-[#263D2B]/80 shadow-2xl space-y-8">
          
          {/* 7 Interactive Colour Family Tabs + Favourites & Compare Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#263D2B]/80 pb-6">
            
            {/* Category Family Pills */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              {COLOUR_FAMILIES_CATALOGUE.map((family) => {
                const isActive = family.id === selectedFamilyId && !showFavoritesOnly;
                return (
                  <button
                    key={family.id}
                    onClick={() => {
                      setShowFavoritesOnly(false);
                      setSelectedFamilyId(family.id);
                      setSelectedShade(family.shades[0]);
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#263D2B] text-white shadow-xs border border-[#A8B5A0]'
                        : 'bg-[#18271B] text-[#A8B5A0] hover:text-white border border-[#263D2B]'
                    }`}
                  >
                    <span>{family.name}</span>
                    <span className="text-[10px] opacity-70 font-mono">({family.shades.length})</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Action Badges: Compare & Favourites */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              {/* Compare Button */}
              {comparedShades.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsCompareModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-full bg-[#263D2B] border border-[#A8B5A0] text-[#F7F4ED] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs hover:bg-[#18271B] transition-all"
                >
                  <Scale className="w-3.5 h-3.5 text-[#A8B5A0]" />
                  <span>Compare ({comparedShades.length}/3)</span>
                </button>
              )}

              {/* Favourites Filter Toggle */}
              <button
                type="button"
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer border transition-all ${
                  showFavoritesOnly
                    ? 'bg-[#A8B5A0] text-[#10110F] border-[#A8B5A0]'
                    : 'bg-[#18271B] text-[#A8B5A0] border-[#263D2B] hover:text-white'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-[#10110F]' : ''}`} />
                <span>Saved ({Object.values(favouriteShades).filter(Boolean).length})</span>
              </button>
            </div>
          </div>

          {/* Active Family Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#18271B]/50 p-4 sm:p-5 rounded-2xl border border-[#263D2B]">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#A8B5A0] uppercase">
                <span>UNDERTONE PROFILE</span>
                <span>•</span>
                <span className="text-[#F7F4ED]">{activeFamily.undertone}</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                {activeFamily.name} Atelier Palette
              </h3>
              <p className="text-xs text-[#DCE1D8] font-light max-w-xl">
                {activeFamily.description}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={handlePrevShade}
                className="px-3 py-1.5 rounded-full bg-[#18271B] border border-[#263D2B] text-xs text-[#A8B5A0] hover:text-white hover:border-[#A8B5A0] transition-colors cursor-pointer flex items-center gap-1"
                aria-label="Previous shade"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="text-[11px]">Prev</span>
              </button>
              <button
                type="button"
                onClick={handleNextShade}
                className="px-3 py-1.5 rounded-full bg-[#18271B] border border-[#263D2B] text-xs text-[#A8B5A0] hover:text-white hover:border-[#A8B5A0] transition-colors cursor-pointer flex items-center gap-1"
                aria-label="Next shade"
              >
                <span className="text-[11px]">Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleResetShadePreferences}
                className="p-2 rounded-full bg-[#18271B] border border-[#263D2B] text-[#A8B5A0] hover:text-white transition-colors cursor-pointer"
                title="Reset preferences to default"
                aria-label="Reset preferences"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Main Explorer Grid (7 Cols Swatches + Preferences | 5 Cols Live Preview) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Swatches + Personalize Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Clickable Swatches */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8B5A0] block">
                    {showFavoritesOnly ? 'SAVED FAVOURITE SHADES' : `AVAILABLE ${activeFamily.name.toUpperCase()} SHADES (${activeFamily.shades.length})`}
                  </span>
                  <span className="text-[10px] text-[#A8B5A0] font-light">
                    Click swatch to preview • Heart to save
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {(showFavoritesOnly
                    ? COLOUR_FAMILIES_CATALOGUE.flatMap(f => f.shades).filter(s => favouriteShades[s.id])
                    : activeFamily.shades
                  ).map((shade) => {
                    const isSelected = selectedShade?.id === shade.id;
                    const isFavorited = isShadeSaved(shade.id);
                    const isCompared = comparedShades.some(s => s.id === shade.id);

                    return (
                      <div
                        key={shade.id}
                        onClick={() => setSelectedShade(shade)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative group flex flex-col justify-between gap-2.5 ${
                          isSelected
                            ? 'bg-[#263D2B] text-white border-[#A8B5A0] shadow-md ring-1 ring-[#A8B5A0]'
                            : 'bg-[#18271B]/60 text-[#DCE1D8] border-[#263D2B] hover:border-[#A8B5A0] hover:bg-[#18271B]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          {/* Circular Swatch */}
                          <div className="flex items-center gap-2.5">
                            <span
                              className="w-7 h-7 rounded-full border-2 border-white/20 shadow-inner flex-shrink-0 relative overflow-hidden"
                              style={{ backgroundColor: shade.hex }}
                            >
                              <span className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
                            </span>
                            <div>
                              <span className="text-xs font-semibold block leading-tight text-white group-hover:text-[#A8B5A0] transition-colors">
                                {shade.name}
                              </span>
                              <span className="text-[10px] opacity-75 font-mono block">
                                {shade.baseLevel}
                              </span>
                            </div>
                          </div>

                          {/* Quick Actions (Favorite & Checkmark) */}
                          <div className="flex items-center gap-1">
                            {isSelected && (
                              <span className="w-4 h-4 rounded-full bg-white text-[#263D2B] flex items-center justify-center flex-shrink-0">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={(e) => toggleFavouriteShade(shade, e)}
                              className={`p-1 rounded-full transition-colors ${
                                isFavorited ? 'text-[#F7F4ED]' : 'text-[#6B7068] hover:text-white'
                              }`}
                              title={isFavorited ? 'Saved in Dream Colour' : 'Save favourite'}
                              aria-label="Save favourite"
                            >
                              <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-[#A8B5A0] text-[#A8B5A0]' : ''}`} />
                            </button>
                          </div>
                        </div>

                        {/* Swatch Footer: Compare Button */}
                        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                          <span className="text-[#A8B5A0] truncate max-w-[110px]">
                            {shade.bestSkin.split(' ')[0]}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => toggleCompareShade(shade, e)}
                            className={`px-2 py-0.5 rounded-full text-[9.5px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                              isCompared
                                ? 'bg-[#A8B5A0] text-[#10110F]'
                                : 'bg-[#10110F] text-[#A8B5A0] hover:text-white border border-[#263D2B]'
                            }`}
                          >
                            {isCompared ? 'Comparing' : '+ Compare'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Personalize Your Colour Controls */}
              <div className="p-5 rounded-2xl bg-[#18271B]/70 border border-[#263D2B] space-y-4">
                <div className="flex items-center gap-2 border-b border-[#263D2B] pb-2.5">
                  <SlidersHorizontal className="w-4 h-4 text-[#A8B5A0]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Personalize Your Colour Vision
                  </span>
                </div>

                <div className="space-y-4">
                  {/* 1. Colour Intensity */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] font-semibold text-[#A8B5A0] uppercase tracking-wider">
                        Colour Intensity
                      </span>
                      <span className="text-[11px] text-white font-mono">{colourIntensity}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'Subtle', desc: 'Soft whisper & natural reflection' },
                        { id: 'Medium', desc: 'Balanced classic salon radiance' },
                        { id: 'Bold', desc: 'High-octane statement saturation' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setColourIntensity(item.id)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            colourIntensity === item.id
                              ? 'bg-[#263D2B] text-white border-[#A8B5A0] shadow-xs'
                              : 'bg-[#10110F] text-[#A8B5A0] border-[#263D2B] hover:text-white'
                          }`}
                        >
                          <span className="text-xs font-bold block">{item.id}</span>
                          <span className="text-[9.5px] opacity-70 block line-clamp-1">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Desired Effect */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] font-semibold text-[#A8B5A0] uppercase tracking-wider">
                        Desired Effect
                      </span>
                      <span className="text-[11px] text-white font-mono">{desiredEffect}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'Natural', desc: 'Harmonious diffused blend' },
                        { id: 'Dimensional', desc: 'Multi-tonal light ribbons' },
                        { id: 'Vibrant', desc: 'High-gloss reflectivity' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setDesiredEffect(item.id)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            desiredEffect === item.id
                              ? 'bg-[#263D2B] text-white border-[#A8B5A0] shadow-xs'
                              : 'bg-[#10110F] text-[#A8B5A0] border-[#263D2B] hover:text-white'
                          }`}
                        >
                          <span className="text-xs font-bold block">{item.id}</span>
                          <span className="text-[9.5px] opacity-70 block line-clamp-1">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Colour Coverage Technique */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] font-semibold text-[#A8B5A0] uppercase tracking-wider">
                        Colour Coverage Technique
                      </span>
                      <span className="text-[11px] text-white font-mono">{colourCoverage}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'All-over colour', label: 'All-Over Colour' },
                        { id: 'Highlights', label: 'Highlights' },
                        { id: 'Balayage', label: 'Balayage' },
                        { id: 'Root Melt', label: 'Root Melt' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setColourCoverage(item.id)}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            colourCoverage === item.id
                              ? 'bg-[#263D2B] text-white border-[#A8B5A0] shadow-xs'
                              : 'bg-[#10110F] text-[#A8B5A0] border-[#263D2B] hover:text-white'
                          }`}
                        >
                          <span className="text-xs font-bold block truncate">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Hair Colour Preview Panel (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              
              <div className="bg-[#18271B]/60 p-6 rounded-3xl border border-[#263D2B] shadow-inner space-y-5">
                
                {/* Header with Swatch Indicator */}
                <div className="flex items-center justify-between border-b border-[#263D2B] pb-3">
                  <div className="space-y-0.5">
                    <span className="text-[9.5px] font-mono tracking-widest uppercase text-[#A8B5A0] block">
                      SELECTED SHADE PREVIEW
                    </span>
                    <h4 className="font-serif text-2xl text-white font-normal">
                      {selectedShade?.name}
                    </h4>
                  </div>

                  <span
                    className="w-8 h-8 rounded-full border-2 border-white/30 shadow-md flex-shrink-0"
                    style={{ backgroundColor: selectedShade?.hex }}
                  />
                </div>

                {/* Hair Colour Inspiration Image with Live Glaze Overlay */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#10110F] border border-[#263D2B]">
                  <img
                    src={selectedShade?.image}
                    alt={selectedShade?.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Dynamic simulated tone sheen tint over image based on previewSliderPos */}
                  <div
                    className="absolute inset-0 pointer-events-none mix-blend-color transition-opacity duration-300"
                    style={{
                      backgroundColor: selectedShade?.hex,
                      opacity: (previewSliderPos / 100) * (colourIntensity === 'Bold' ? 0.45 : colourIntensity === 'Subtle' ? 0.2 : 0.32)
                    }}
                  />

                  {/* Gradient shadow for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Badges on image */}
                  <div className="absolute top-3 left-3 bg-[#10110F]/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-wider text-[#A8B5A0] border border-[#263D2B]">
                    {selectedShade?.baseLevel}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs">
                    <span className="text-[11px] font-semibold text-[#A8B5A0]">
                      {activeFamily.name} • {selectedShade?.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#263D2B]/90 border border-[#A8B5A0]">
                      {colourCoverage}
                    </span>
                  </div>
                </div>

                {/* Interactive Simulated Glaze Intensity Slider */}
                <div className="p-3.5 rounded-2xl bg-[#10110F] border border-[#263D2B] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#A8B5A0] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#A8B5A0]" />
                      Simulated Glaze Slider
                    </span>
                    <span className="text-[10.5px] text-white font-mono font-bold">
                      {previewSliderPos}% Tonal Glaze
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={previewSliderPos}
                    onChange={(e) => setPreviewSliderPos(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#18271B] rounded-lg appearance-none cursor-pointer accent-[#A8B5A0]"
                    aria-label="Simulated glaze intensity slider"
                  />

                  <div className="flex items-center justify-between text-[10px] text-[#6B7068]">
                    <span>Natural Canvas Base</span>
                    <span>Saturated Glaze Glow</span>
                  </div>
                </div>

                {/* Concrete Shade Description & Expected Result */}
                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8B5A0] block">
                      ATELIER SHADE CHARACTERISTICS
                    </span>
                    <p className="text-[#DCE1D8] font-light">
                      {selectedShade?.description}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#10110F] border border-[#263D2B] space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8B5A0] block">
                      Expected Visual Result
                    </span>
                    <p className="text-[#F7F4ED] font-light text-[11.5px]">
                      {selectedShade?.expectedEffect}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="p-2.5 rounded-xl bg-[#18271B] border border-[#263D2B]">
                      <span className="text-[9.5px] text-[#A8B5A0] uppercase block">Flattering Complexions</span>
                      <span className="text-white font-medium">{selectedShade?.bestSkin}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#18271B] border border-[#263D2B]">
                      <span className="text-[9.5px] text-[#A8B5A0] uppercase block">Recommended Craft</span>
                      <span className="text-white font-medium">{selectedShade?.recommendedTechnique}</span>
                    </div>
                  </div>
                </div>

                {/* Important Illustrative Disclaimer */}
                <div className="p-3 rounded-xl bg-[#10110F]/70 border border-[#263D2B]/80 flex items-start gap-2 text-[10.5px] text-[#A8B5A0]">
                  <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#A8B5A0]" />
                  <p className="leading-snug font-light italic">
                    Simulated preview is an illustrative digital visualization. Actual in-salon outcome depends on individual hair history, porosity, natural base pigment, and chemical history.
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* 6. Your Selected Shade Summary (Bottom Full-Width Card) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#18271B] via-[#263D2B]/60 to-[#18271B] border border-[#A8B5A0]/40 shadow-lg">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10110F] border border-[#263D2B] text-[10px] font-bold uppercase tracking-wider text-[#A8B5A0]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#A8B5A0]" />
                  <span>YOUR SELECTED SHADE SUMMARY</span>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs text-[#DCE1D8]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#A8B5A0] uppercase text-[10.5px]">Family:</span>
                    <span className="font-bold text-white">{activeFamily.name}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#A8B5A0] uppercase text-[10.5px]">Shade:</span>
                    <span className="flex items-center gap-1.5 font-bold text-white">
                      <span className="w-3 h-3 rounded-full border border-white/30" style={{ backgroundColor: selectedShade?.hex }} />
                      {selectedShade?.name}
                    </span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#A8B5A0] uppercase text-[10.5px]">Intensity:</span>
                    <span className="font-bold text-white">{colourIntensity}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#A8B5A0] uppercase text-[10.5px]">Effect:</span>
                    <span className="font-bold text-white">{desiredEffect}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#A8B5A0] uppercase text-[10.5px]">Coverage:</span>
                    <span className="font-bold text-white">{colourCoverage}</span>
                  </div>
                </div>

                <p className="text-xs text-[#A8B5A0] font-light">
                  Recommended Atelier Service: <strong className="text-white font-medium">{selectedShade?.recommendedTechnique}</strong> (All formulas include Olaplex bond reinforcement).
                </p>
              </div>

              {/* Actions: Explore Another Shade + Book Consultation */}
              <div className="flex flex-wrap items-center gap-3 pt-2 lg:pt-0">
                <a
                  href="#shade-explorer"
                  onClick={handleNextShade}
                  className="px-5 py-3 rounded-full border border-[#A8B5A0] text-[#F7F4ED] hover:bg-white hover:text-[#10110F] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Explore Another Shade
                </a>

                {/* Save Current Shade to Moodboard Action */}
                <button
                  type="button"
                  onClick={(e) => toggleFavouriteShade(selectedShade, e)}
                  className={`px-5 py-3 rounded-full border text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 ${
                    isShadeSaved(selectedShade?.id)
                      ? 'bg-white text-[#10110F] border-white shadow-sm'
                      : 'border-[#A8B5A0] text-[#F7F4ED] hover:bg-white hover:text-[#10110F]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isShadeSaved(selectedShade?.id) ? 'fill-[#263D2B] text-[#263D2B]' : ''}`} />
                  <span>{isShadeSaved(selectedShade?.id) ? 'Saved in Dream Colour' : 'Save Shade to Moodboard'}</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3.5 SAVE YOUR DREAM COLOUR — PERSONAL COLOUR INSPIRATION COLLECTION       */}
      {/* ========================================================================= */}
      <SaveDreamColourSection 
        onSelectShadeInExplorer={(famId, shId) => {
          setSelectedFamilyId(famId);
          const fam = COLOUR_FAMILIES_CATALOGUE.find((f) => f.id === famId);
          if (fam) {
            const sh = fam.shades.find((s) => s.id === shId);
            if (sh) setSelectedShade(sh);
          }
        }} 
      />

      {/* ========================================================================= */}
      {/* 3.5. THE COLOUR PROCESS — YOUR JOURNEY TO BEAUTIFUL HAIR COLOUR           */}
      {/* ========================================================================= */}
      <section id="colour-process" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-20 sm:pt-28 scroll-mt-24">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B] shadow-xs">
            <Compass className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>HAIR TRANSFORMATION JOURNEY</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
            The Colour Process
          </h2>

          <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto">
            Every beautiful colour begins with a thoughtful consultation and finishes with personalised care. Discover the five steps behind your colour transformation.
          </p>

          {/* View Mode Toggle: Interactive Stage Slider vs. View All 5 Steps */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsViewAllStages(!isViewAllStages)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#DCE1D8] hover:border-[#263D2B] text-xs font-bold uppercase tracking-wider text-[#263D2B] transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
              aria-label={isViewAllStages ? 'Switch to interactive timeline' : 'View all 5 steps in full'}
            >
              <ListChecks className="w-3.5 h-3.5" />
              <span>{isViewAllStages ? 'Show Focused Stage View' : 'View All Steps'}</span>
            </button>
          </div>
        </ScrollReveal>

        {/* 5-STAGE TIMELINE INDICATORS (Horizontal Tabs on Desktop, Scrollable on Mobile) */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm border border-[#DCE1D8] rounded-2xl p-2 sm:p-3 shadow-xs">
            {/* Stage Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2" role="tablist" aria-label="Colour Process Stages">
              {COLOUR_PROCESS_STAGES.map((stage, idx) => {
                const isActive = !isViewAllStages && activeProcessStageIndex === idx;
                const isPassed = !isViewAllStages && activeProcessStageIndex > idx;
                return (
                  <button
                    key={stage.id}
                    onClick={() => {
                      setActiveProcessStageIndex(idx);
                      if (isViewAllStages) setIsViewAllStages(false);
                    }}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`process-panel-${stage.id}`}
                    className={`relative text-left p-3 rounded-xl transition-all flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#263D2B] ${
                      isActive
                        ? 'bg-[#263D2B] text-white shadow-sm'
                        : isPassed
                        ? 'bg-[#F2EFE8] text-[#10110F] hover:bg-[#EAE5DC]'
                        : 'bg-transparent text-[#6B7068] hover:bg-[#F7F4ED]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className={`text-[11px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : isPassed
                          ? 'bg-[#263D2B]/10 text-[#263D2B]'
                          : 'bg-[#E5E9E2] text-[#465640]'
                      }`}>
                        STEP {stage.step}
                      </span>
                      {isPassed && (
                        <Check className="w-3.5 h-3.5 text-[#263D2B]" />
                      )}
                    </div>
                    <div className={`font-serif text-xs sm:text-sm font-medium leading-snug line-clamp-1 ${
                      isActive ? 'text-white' : 'text-[#10110F]'
                    }`}>
                      {stage.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Progress Bar & Stage Indicator Info */}
            <div className="mt-3 pt-3 border-t border-[#E5E9E2] flex flex-col sm:flex-row items-center justify-between gap-2 px-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#465640]">
                  Step {activeStage.step} of 05
                </span>
                <span className="text-[#A8B5A0]">•</span>
                <span className="text-[11px] text-[#6B7068]">
                  {Math.round(((activeProcessStageIndex + 1) / COLOUR_PROCESS_STAGES.length) * 100)}% Journey Progress
                </span>
              </div>

              {/* Progress bar track */}
              <div className="w-full sm:w-64 h-1.5 bg-[#EAE5DC] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#263D2B] transition-all duration-300 rounded-full"
                  style={{ width: `${((activeProcessStageIndex + 1) / COLOUR_PROCESS_STAGES.length) * 100}%` }}
                />
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevProcessStage}
                  disabled={isViewAllStages}
                  className="p-1.5 rounded-lg border border-[#DCE1D8] bg-white text-[#263D2B] hover:bg-[#F7F4ED] disabled:opacity-40 transition-colors cursor-pointer"
                  title="Previous Step"
                  aria-label="Previous colour process step"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextProcessStage}
                  disabled={isViewAllStages}
                  className="p-1.5 rounded-lg border border-[#DCE1D8] bg-white text-[#263D2B] hover:bg-[#F7F4ED] disabled:opacity-40 transition-colors cursor-pointer"
                  title="Next Step"
                  aria-label="Next colour process step"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* VIEW MODE A: FOCUSED STAGE DETAIL CARD                              */}
        {/* =================================================================== */}
        {!isViewAllStages ? (
          <div
            id={`process-panel-${activeStage.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeStage.id}`}
            className="bg-white border border-[#DCE1D8] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Visual Showcase & Stage Media */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-2xl overflow-hidden bg-[#10110F] aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3] shadow-md group">
                  <img
                    src={activeStage.image}
                    alt={`${activeStage.title} - GLAM GIRL BY JANKI`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Step Badge Overlay */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-white/40 text-[10.5px] font-bold uppercase tracking-wider text-[#263D2B] shadow-xs">
                      <span>STEP {activeStage.step}</span>
                    </span>
                  </div>

                  {/* Duration / Technique Tag */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <div className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#A8B5A0]" />
                      <span>{activeStage.durationNote}</span>
                    </div>
                  </div>
                </div>

                {/* Step 04 Special: Before & After Comparison Showcase */}
                {activeStage.beforeAfter && (
                  <div className="bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#263D2B]">
                        Toner Neutralization Comparison
                      </span>
                      <span className="text-[10px] bg-white border border-[#DCE1D8] px-2 py-0.5 rounded text-[#465640]">
                        Visual Result
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative rounded-lg overflow-hidden border border-[#DCE1D8] aspect-[4/3]">
                        <img
                          src={activeStage.beforeAfter.beforeImage}
                          alt="Before Toning"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-1.5 left-1.5 bg-black/70 text-white text-[9.5px] font-bold px-1.5 py-0.5 rounded">
                          BEFORE TONING
                        </div>
                      </div>
                      <div className="relative rounded-lg overflow-hidden border border-[#263D2B] aspect-[4/3]">
                        <img
                          src={activeStage.beforeAfter.afterImage}
                          alt="After Custom Acidic Toner"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-1.5 left-1.5 bg-[#263D2B] text-white text-[9.5px] font-bold px-1.5 py-0.5 rounded">
                          AFTER GLOSS TONER
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-[#6B7068] italic leading-snug">
                      {activeStage.beforeAfter.caption}
                    </p>

                    <div className="text-[10.5px] text-[#465640] bg-white border border-[#DCE1D8] rounded-md p-2 flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 text-[#263D2B] shrink-0 mt-0.5" />
                      <span>Note: Toning is individually customized and not required for every service (e.g. solid single-process dark colours).</span>
                    </div>
                  </div>
                )}

                {/* Artisan Advice / Pro Tip Box */}
                <div className="p-4 rounded-xl bg-[#F2EFE8] border-l-2 border-[#263D2B] text-xs text-[#10110F] space-y-1">
                  <div className="font-bold text-[11px] uppercase tracking-wider text-[#263D2B] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
                    <span>Janki’s Editorial Note</span>
                  </div>
                  <p className="font-light text-[#465640] leading-relaxed">
                    {activeStage.tips}
                  </p>
                </div>
              </div>

              {/* Right Column: Stage Description & Detailed Steps */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#465640] mb-1">
                    {activeStage.eyebrow}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal leading-tight">
                    Step {activeStage.step} — {activeStage.title}
                  </h3>
                  <p className="font-serif italic text-sm text-[#465640] mt-1">
                    "{activeStage.tagline}"
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#465640] leading-relaxed font-light">
                  {activeStage.summary}
                </p>

                {/* Stage Key Protocols */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                    What Happens During This Stage:
                  </div>
                  <ul className="space-y-2.5">
                    {activeStage.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#465640] font-light leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#263D2B] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Step 05 Special: Interactive Aftercare Checklist */}
                {activeStage.checklist && (
                  <div className="mt-6 pt-5 border-t border-[#DCE1D8] space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ListChecks className="w-4 h-4 text-[#263D2B]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                          Personalised Home Aftercare Checklist
                        </span>
                      </div>
                      <span className="text-[11px] font-mono font-medium text-[#263D2B] bg-[#EBF0E9] px-2.5 py-0.5 rounded-full">
                        {Object.values(aftercareChecklistStatus).filter(Boolean).length} of {activeStage.checklist.length} Complete
                      </span>
                    </div>

                    <p className="text-[11.5px] text-[#6B7068] font-light">
                      Click to mark off recommendations as you prepare your home hair regimen. Maintaining moisture balance and using sulfate-free formulas ensures maximum vibrancy.
                    </p>

                    <div className="space-y-2">
                      {activeStage.checklist.map((item) => {
                        const isChecked = !!aftercareChecklistStatus[item.id];
                        return (
                          <button
                            key={item.id}
                            onClick={() => toggleChecklistItem(item.id)}
                            className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 cursor-pointer ${
                              isChecked
                                ? 'bg-[#EBF0E9] border-[#263D2B] text-[#18271B]'
                                : 'bg-[#F7F4ED] border-[#DCE1D8] hover:border-[#A8B5A0] text-[#465640]'
                            }`}
                            aria-label={`Mark checklist item: ${item.text}`}
                          >
                            {isChecked ? (
                              <CheckSquare className="w-4 h-4 text-[#263D2B] shrink-0" />
                            ) : (
                              <Square className="w-4 h-4 text-[#A8B5A0] shrink-0" />
                            )}
                            <span className={`text-xs sm:text-sm leading-snug ${isChecked ? 'line-through text-[#6B7068]' : 'font-light'}`}>
                              {item.text}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <p className="text-[10.5px] text-[#6B7068] italic">
                      *Note: Hair condition and color longevity naturally depend on water mineral hardness, washing frequency, and heat tool usage. We avoid promising a fixed universal colour lifespan.
                    </p>
                  </div>
                )}

                {/* Bottom Action Bar */}
                <div className="pt-6 border-t border-[#DCE1D8] flex flex-wrap items-center justify-between gap-4">
                  {activeStage.ctaLink.startsWith('#') ? (
                    <a
                      href={activeStage.ctaLink}
                      className="global-button !px-6 !py-3 text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>{activeStage.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link
                      to={activeStage.ctaLink}
                      className="global-button !px-6 !py-3 text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{activeStage.ctaText}</span>
                    </Link>
                  )}

                  {/* Step Navigation Pill */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevProcessStage}
                      className="px-3.5 py-2 rounded-full border border-[#DCE1D8] hover:border-[#263D2B] bg-white text-xs font-bold uppercase tracking-wider text-[#263D2B] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Previous Stage</span>
                    </button>
                    <button
                      onClick={handleNextProcessStage}
                      className="px-3.5 py-2 rounded-full border border-[#DCE1D8] hover:border-[#263D2B] bg-white text-xs font-bold uppercase tracking-wider text-[#263D2B] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Next Stage</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        ) : (
          /* =================================================================== */
          /* VIEW MODE B: COMPLETE EDITORIAL ROADMAP (ALL 5 STAGES EXPANDED)     */
          /* =================================================================== */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COLOUR_PROCESS_STAGES.map((stage, idx) => (
                <div
                  key={stage.id}
                  className="bg-white border border-[#DCE1D8] hover:border-[#263D2B] rounded-2xl p-6 shadow-xs flex flex-col justify-between transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-[#263D2B] text-white">
                        STEP {stage.step}
                      </span>
                      <span className="text-[10px] text-[#6B7068] font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#A8B5A0]" />
                        {stage.durationNote}
                      </span>
                    </div>

                    <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-[#10110F]">
                      <img
                        src={stage.image}
                        alt={stage.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div>
                      <h4 className="font-serif text-lg text-[#10110F] font-normal">
                        {stage.title}
                      </h4>
                      <p className="font-serif italic text-xs text-[#465640] mt-0.5">
                        "{stage.tagline}"
                      </p>
                    </div>

                    <p className="text-xs text-[#6B7068] font-light leading-relaxed">
                      {stage.summary}
                    </p>

                    <ul className="space-y-1.5 pt-1">
                      {stage.bullets.map((b, bi) => (
                        <li key={bi} className="text-[11.5px] text-[#465640] flex items-start gap-1.5 font-light leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#263D2B] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#EAE5DC] flex items-center justify-between">
                    <button
                      onClick={() => {
                        setActiveProcessStageIndex(idx);
                        setIsViewAllStages(false);
                      }}
                      className="text-xs font-bold uppercase tracking-wider text-[#263D2B] hover:underline cursor-pointer inline-flex items-center gap-1"
                    >
                      <span>Focus on Stage</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    {stage.ctaLink.startsWith('#') ? (
                      <a
                        href={stage.ctaLink}
                        className="text-[11px] text-[#6B7068] hover:text-[#263D2B] transition-colors"
                      >
                        {stage.ctaText}
                      </a>
                    ) : (
                      <Link
                        to={stage.ctaLink}
                        className="text-[11px] text-[#6B7068] hover:text-[#263D2B] transition-colors"
                      >
                        {stage.ctaText}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => setIsViewAllStages(false)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#263D2B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#18271B] transition-all cursor-pointer shadow-xs"
              >
                <span>Return to Interactive Timeline</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* 4. COLOUR JOURNEY SUMMARY PANEL                                     */}
        {/* =================================================================== */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-br from-[#10110F] via-[#18271B] to-[#263D2B] text-white rounded-3xl p-8 sm:p-12 lg:p-14 shadow-xl relative overflow-hidden">
          {/* Subtle decorative background watermark */}
          <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none select-none text-white font-serif text-[180px] leading-none">
            GG
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.26em] text-[#A8B5A0]">
              <Sparkles className="w-3 h-3 text-[#A8B5A0]" />
              <span>YOUR TRANSFORMATION ROADMAP</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
              Your Colour Journey Starts Here
            </h3>

            <p className="font-sans text-xs sm:text-sm md:text-base text-[#DCE1D8] font-light leading-relaxed max-w-2xl mx-auto">
              From the first consultation to the final finish, every stage is designed around your hair, your preferences, and your colour goals.
            </p>

            {/* 4 Functional Action Links */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <a
                href="#colour-quiz"
                className="px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 text-center group cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#A8B5A0] group-hover:scale-110 transition-transform" />
                <span>Discover Your Colour Match</span>
              </a>

              <a
                href="#colour-techniques"
                className="px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 text-center group cursor-pointer"
              >
                <Scissors className="w-3.5 h-3.5 text-[#A8B5A0] group-hover:scale-110 transition-transform" />
                <span>Explore Colour Techniques</span>
              </a>

              <a
                href="#shade-explorer"
                className="px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 text-center group cursor-pointer"
              >
                <Palette className="w-3.5 h-3.5 text-[#A8B5A0] group-hover:scale-110 transition-transform" />
                <span>Find Your Perfect Shade</span>
              </a>
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. BEFORE-AND-AFTER TRANSFORMATIONS                                       */}
      {/* ========================================================================= */}
      <section id="transformations" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-20 sm:pt-28 scroll-mt-24">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B] shadow-xs">
            <SplitSquareVertical className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>REAL CLIENT RESULTS</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
            Before &amp; After Transformations
          </h2>

          <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto">
            Witness how custom balayage placement, correct toner neutralization, and Olaplex restore luminosity to compromised hair.
          </p>

          {/* Transformation Switcher Tabs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {BEFORE_AFTER_TRANSFORMATIONS.map((trans, idx) => {
              const isActive = idx === activeTransformationIndex;
              return (
                <button
                  key={trans.id}
                  onClick={() => {
                    setActiveTransformationIndex(idx);
                    setComparisonSliderPos(50);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#263D2B] text-white shadow-xs'
                      : 'bg-white text-[#465640] border border-[#DCE1D8] hover:text-[#10110F]'
                  }`}
                >
                  Case 0{idx + 1}: {trans.title.split(' to ')[0]}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Split Comparison Showcase Card */}
        <div className="bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-10 shadow-xs max-w-4xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Split Comparison Image (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 select-none border border-[#DCE1D8] shadow-sm">
                
                {/* 1. Underlying "Before" Image */}
                <img
                  src={activeTransformation.beforeImage}
                  alt="Before Transformation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  BEFORE
                </div>

                {/* 2. Top "After" Image with Drag Clip */}
                <div 
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ clipPath: `inset(0 ${100 - comparisonSliderPos}% 0 0)` }}
                >
                  <img
                    src={activeTransformation.afterImage}
                    alt="After Transformation"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#263D2B] text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    AFTER
                  </div>
                </div>

                {/* Vertical Divider Bar */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl pointer-events-none"
                  style={{ left: `${comparisonSliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#263D2B] border-2 border-white flex items-center justify-center text-[10px] text-white shadow-md">
                    ⇄
                  </div>
                </div>
              </div>

              {/* Slider Control */}
              <div className="mt-4 space-y-1.5">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={comparisonSliderPos}
                  onChange={(e) => setComparisonSliderPos(Number(e.target.value))}
                  className="w-full h-2 bg-[#DCE1D8] rounded-lg appearance-none cursor-ew-resize accent-[#263D2B]"
                />
                <div className="flex items-center justify-between text-[11px] text-[#6B7068]">
                  <span>← Reveal Before (0%)</span>
                  <button
                    onClick={() => setComparisonSliderPos(50)}
                    className="font-medium text-[#263D2B] underline cursor-pointer"
                  >
                    Reset 50/50
                  </button>
                  <span>Reveal After (100%) →</span>
                </div>
              </div>
            </div>

            {/* Right: Transformation Case Notes (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1 border-b border-[#DCE1D8] pb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B] block">
                  TRANSFORMATION CASE STUDY
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal leading-snug">
                  {activeTransformation.title}
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-0.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#6B7068] block">
                    INITIAL HAIR CONCERN
                  </span>
                  <p className="text-[#10110F] font-light">
                    {activeTransformation.beforeDesc}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-0.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#263D2B] block">
                    ATELIER RESULT
                  </span>
                  <p className="text-[#10110F] font-light">
                    {activeTransformation.afterDesc}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#6B7068] pt-1">
                <span>⏱ Duration: <strong>{activeTransformation.time}</strong></span>
                <span>Rate: <strong>{activeTransformation.service}</strong></span>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={(e) => toggleTransformationInspiration(activeTransformation, e)}
                  className={`w-full py-2.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all border cursor-pointer ${
                    isInspirationSaved(activeTransformation.id)
                      ? 'bg-[#263D2B] text-white border-[#A8B5A0]'
                      : 'bg-[#F7F4ED] text-[#263D2B] border-[#DCE1D8] hover:border-[#263D2B]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isInspirationSaved(activeTransformation.id) ? 'fill-[#A8B5A0] text-[#A8B5A0]' : ''}`} />
                  <span>{isInspirationSaved(activeTransformation.id) ? 'Saved to Moodboard' : 'Save Transformation Look'}</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE COLOUR MATCH QUIZ                                          */}
      {/* ========================================================================= */}
      <section id="colour-quiz" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-20 sm:pt-28 scroll-mt-24">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B] shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>PERSONALIZED CONSULTATION ALGORITHM</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
            Hair Colour Match Quiz
          </h2>

          <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto">
            Answer 4 quick questions about your natural hair level, undertones, and lifestyle to discover your ideal colour technique.
          </p>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-10 shadow-xs relative">
          
          {quizStep < HAIR_COLOUR_QUIZ_QUESTIONS.length ? (
            /* Active Question View */
            <div className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-[#DCE1D8] pb-4">
                <span className="text-[10.5px] font-bold uppercase tracking-widest text-[#263D2B]">
                  QUESTION {quizStep + 1} OF {HAIR_COLOUR_QUIZ_QUESTIONS.length}
                </span>
                <span className="text-xs text-[#6B7068]">
                  Step {quizStep + 1} / 4
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal leading-snug">
                {HAIR_COLOUR_QUIZ_QUESTIONS[quizStep].question}
              </h3>

              <div className="space-y-2.5 pt-2">
                {HAIR_COLOUR_QUIZ_QUESTIONS[quizStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectQuizOption(HAIR_COLOUR_QUIZ_QUESTIONS[quizStep].id, opt.value)}
                    className="w-full p-4 rounded-2xl border border-[#DCE1D8] hover:border-[#263D2B] bg-[#F7F4ED]/60 hover:bg-white text-left transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <span className="text-xs sm:text-[13px] font-medium text-[#10110F] group-hover:text-[#263D2B] transition-colors">
                      {opt.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#DCE1D8] group-hover:text-[#263D2B] group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                  </button>
                ))}
              </div>

              {quizStep > 0 && (
                <div className="pt-2 flex justify-start">
                  <button
                    onClick={() => setQuizStep(quizStep - 1)}
                    className="text-xs text-[#6B7068] hover:text-[#10110F] underline cursor-pointer"
                  >
                    ← Back to previous question
                  </button>
                </div>
              )}

            </div>
          ) : (
            /* Quiz Result View */
            <div className="space-y-6 text-center animate-fade-in">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#263D2B]/10 text-[#263D2B] text-[10.5px] font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
                <span>YOUR BESPOKE COLOUR MATCH</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                  {quizResult.title}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#465640]">
                  {quizResult.technique}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-left space-y-3">
                <p className="text-xs sm:text-[13px] text-[#465640] leading-relaxed font-light">
                  {quizResult.description}
                </p>
                <div className="p-3 rounded-xl bg-white border border-[#DCE1D8] text-xs font-medium text-[#263D2B]">
                  {quizResult.formulaAdvice}
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-[#DCE1D8]/60 text-[#6B7068]">
                  <span>Estimated Duration: <strong>{quizResult.duration}</strong></span>
                  <span>Studio Rate: <strong>${quizResult.price} CAD</strong></span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#hair-colour-menu"
                  className="global-button !px-8 !py-3.5 text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>VIEW RECOMMENDED IN MENU</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={handleResetQuiz}
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full border border-[#DCE1D8] text-xs font-bold text-[#6B7068] hover:text-[#10110F] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. THE COLOUR CARE JOURNAL — YOUR GUIDE TO LASTING COLOUR & SHINE          */}
      {/* ========================================================================= */}
      <section id="colour-care-journal" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-20 sm:pt-28 scroll-mt-24">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B] shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>BEAUTY ARTIST&rsquo;S EDITORIAL JOURNAL</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
            The Colour Care Journal
          </h2>

          <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto">
            Beautiful colour deserves beautiful care. Discover simple routines to protect your colour, nourish your hair, and maintain a healthy-looking shine between salon visits.
          </p>

          {/* Habit Tracker Progress Pill */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#263D2B]" />
              <span className="font-bold text-[#263D2B]">{completedJournalChecklistCount} of {totalJournalChecklistCount} Habits Checked</span>
              <span className="text-[#A8B5A0]">•</span>
              <span className="text-[#6B7068]">{journalProgressPercent}% Ritual Progress</span>
              <div className="w-16 h-1.5 bg-[#EAE5DC] rounded-full overflow-hidden ml-1">
                <div
                  className="h-full bg-[#263D2B] transition-all duration-300 rounded-full"
                  style={{ width: `${journalProgressPercent}%` }}
                />
              </div>
            </div>

            {completedJournalChecklistCount > 0 && (
              <button
                type="button"
                onClick={handleResetJournalChecklist}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#DCE1D8] bg-white text-[#6B7068] hover:text-[#10110F] hover:border-[#263D2B] text-xs transition-colors cursor-pointer"
                title="Reset checklist habits"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Habits</span>
              </button>
            )}
          </div>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 6.1. PERSONALISE MY COLOUR CARE PREFERENCES CARD                          */}
        {/* ========================================================================= */}
        <div className="mb-10 bg-white border border-[#DCE1D8] rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#EAE5DC] pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-wider text-[#263D2B] mb-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#263D2B]" />
                <span>PERSONALISE MY COLOUR CARE</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal">
                Your Bespoke Home Regimen
              </h3>
              <p className="text-xs text-[#6B7068] font-light mt-0.5">
                Organise expert tips tailored to your shade, texture concerns, and lifestyle pace.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsEditingPreferences(!isEditingPreferences)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#263D2B] text-[#263D2B] hover:bg-[#263D2B] hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingPreferences ? 'Close Preferences' : 'Edit My Preferences'}</span>
              </button>
            </div>
          </div>

          {/* Preferences Selector (Collapsible / Interactive) */}
          {isEditingPreferences ? (
            <div className="py-6 space-y-6 border-b border-[#EAE5DC] animate-fade-in">
              {/* 1. Colour Family Selection */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                  1. My Colour Family
                </span>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(COLOUR_FAMILY_CARE_ADVICE).map((family) => {
                    const isSelected = carePreferences.colourFamily === family;
                    return (
                      <button
                        key={family}
                        type="button"
                        onClick={() => setCarePreferences({ ...carePreferences, colourFamily: family })}
                        className={`px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#263D2B] text-white font-bold shadow-xs'
                            : 'bg-[#F7F4ED] text-[#465640] border border-[#DCE1D8] hover:border-[#263D2B]'
                        }`}
                      >
                        {family}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Hair Concern Selection */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                  2. Primary Hair Concern
                </span>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(HAIR_CONCERN_ADVICE).map((concern) => {
                    const isSelected = carePreferences.concern === concern;
                    return (
                      <button
                        key={concern}
                        type="button"
                        onClick={() => setCarePreferences({ ...carePreferences, concern })}
                        className={`px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#263D2B] text-white font-bold shadow-xs'
                            : 'bg-[#F7F4ED] text-[#465640] border border-[#DCE1D8] hover:border-[#263D2B]'
                        }`}
                      >
                        {concern}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Routine Level Selection */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                  3. Routine Depth
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Simple', 'Balanced', 'Detailed'].map((level) => {
                    const isSelected = carePreferences.routineLevel === level;
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setCarePreferences({ ...carePreferences, routineLevel: level })}
                        className={`px-4 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#263D2B] text-white font-bold shadow-xs'
                            : 'bg-[#F7F4ED] text-[#465640] border border-[#DCE1D8] hover:border-[#263D2B]'
                        }`}
                      >
                        {level} Tier
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Save CTA */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleSaveCarePreferences(carePreferences)}
                  className="global-button !px-6 !py-2.5 text-xs text-white uppercase font-bold tracking-wider inline-flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Create My Care Routine</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingPreferences(false)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#6B7068] hover:text-[#10110F] cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : null}

          {/* Tailored Profile Summary Badges */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Tone Card */}
            <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B]">
                  SHADE FAMILY: {carePreferences.colourFamily}
                </span>
                <Palette className="w-3.5 h-3.5 text-[#263D2B]" />
              </div>
              <p className="text-xs text-[#465640] font-light leading-relaxed">
                {COLOUR_FAMILY_CARE_ADVICE[carePreferences.colourFamily]?.tips || 'Gentle sulfate-free washes and occasional gloss refreshes keep your tone clear.'}
              </p>
              <div className="text-[11px] text-[#263D2B] font-semibold pt-1 border-t border-[#EAE5DC]">
                Suggested: {COLOUR_FAMILY_CARE_ADVICE[carePreferences.colourFamily]?.recommendedGlaze}
              </div>
            </div>

            {/* Concern Card */}
            <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B]">
                  FOCUS: {carePreferences.concern}
                </span>
                <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B]" />
              </div>
              <p className="text-xs text-[#465640] font-light leading-relaxed">
                {HAIR_CONCERN_ADVICE[carePreferences.concern]?.action}
              </p>
              <div className="text-[11px] text-[#6B7068] italic pt-1 border-t border-[#EAE5DC]">
                Caution: {HAIR_CONCERN_ADVICE[carePreferences.concern]?.avoid}
              </div>
            </div>

            {/* Routine Depth Card */}
            <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B]">
                  SCHEDULE: {carePreferences.routineLevel} TIER
                </span>
                <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
              </div>
              <p className="text-xs text-[#465640] font-light leading-relaxed">
                {carePreferences.routineLevel === 'Simple' && 'Focus on 3 core pillars: sulfate-free washing, 350°F max heat protection, and 8-week toner refreshes.'}
                {carePreferences.routineLevel === 'Balanced' && 'A comprehensive 5-step flow: gentle wash, heat guard, weekly hydration mask, silk sleeping, and tone maintenance.'}
                {carePreferences.routineLevel === 'Detailed' && 'Full multi-phase regimen: pre-wash scalp oiling, double acid conditioning, cool-shot blast, UV shield, and custom toning baths.'}
              </p>
              <div className="text-[10.5px] text-[#6B7068] italic pt-1 border-t border-[#EAE5DC]">
                *Educational guidance only; not medical advice or guaranteed colour outcomes.
              </div>
            </div>

          </div>

          {careRoutineNotice && (
            <div className="mt-4 p-3 rounded-xl bg-[#EBF0E9] border border-[#263D2B] text-xs text-[#18271B] flex items-center gap-2 animate-fade-in">
              <Check className="w-4 h-4 text-[#263D2B]" />
              <span>Your personal care profile has been updated! The chapters below are aligned with your selections.</span>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 6.2. FOUR CLICKABLE EDITORIAL CHAPTERS TABS                               */}
        {/* ========================================================================= */}
        <div className="mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3" role="tablist" aria-label="Colour Care Journal Chapters">
            {COLOUR_CARE_JOURNAL_CHAPTERS.map((chap, idx) => {
              const isActive = activeJournalChapterIndex === idx;
              const chapterCheckedCount = chap.checklist.filter(item => journalChecklist[item.id]).length;
              return (
                <button
                  key={chap.id}
                  type="button"
                  onClick={() => setActiveJournalChapterIndex(idx)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`chapter-panel-${chap.id}`}
                  className={`relative text-left p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#263D2B] ${
                    isActive
                      ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-md'
                      : 'bg-white text-[#10110F] border-[#DCE1D8] hover:border-[#263D2B] hover:bg-[#FDFBF7]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className={`text-[10.5px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#F2EFE8] text-[#465640]'
                    }`}>
                      CHAPTER {chap.chapter}
                    </span>
                    <span className={`text-[10.5px] font-mono ${isActive ? 'text-[#DCE1D8]' : 'text-[#6B7068]'}`}>
                      {chapterCheckedCount}/{chap.checklist.length}
                    </span>
                  </div>

                  <div>
                    <h3 className={`font-serif text-sm sm:text-base font-normal leading-snug ${
                      isActive ? 'text-white' : 'text-[#10110F]'
                    }`}>
                      {chap.title}
                    </h3>
                    <p className={`text-[11px] font-light mt-0.5 line-clamp-1 ${
                      isActive ? 'text-[#DCE1D8]' : 'text-[#6B7068]'
                    }`}>
                      {chap.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6.3. ACTIVE CHAPTER DEEP-DIVE CONTENT                                     */}
        {/* ========================================================================= */}
        <div
          id={`chapter-panel-${activeJournalChapter.id}`}
          role="tabpanel"
          className="bg-white border border-[#DCE1D8] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Visual, Masterclass Expandable Tips & Shade Guidance */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Chapter Visual Image Card */}
              <div className="relative rounded-2xl overflow-hidden bg-[#10110F] aspect-[16/10] sm:aspect-[4/3] shadow-md group">
                <img
                  src={activeJournalChapter.image}
                  alt={activeJournalChapter.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-[#263D2B] shadow-xs">
                    <span>CHAPTER {activeJournalChapter.chapter}</span>
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                  <p className="font-serif italic text-white/95 drop-shadow-sm">
                    &ldquo;{activeJournalChapter.tagline}&rdquo;
                  </p>
                </div>
              </div>

              {/* Expandable Journal Tips / Science Notes */}
              <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
                  <span>Atelier Care Masterclass</span>
                </span>

                <div className="space-y-2">
                  {activeJournalChapter.expandableTips.map((tip, tIdx) => {
                    const tipKey = `${activeJournalChapter.id}-${tIdx}`;
                    const isExpanded = !!expandedJournalTips[tipKey];
                    const isFavorited = !!favouriteJournalTips[tipKey];
                    return (
                      <div
                        key={tIdx}
                        className="rounded-2xl border border-[#DCE1D8] bg-[#FDFBF7] p-4 transition-all"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => toggleJournalTip(tipKey)}
                            className="flex-1 text-left flex items-center justify-between gap-2 text-xs font-bold text-[#10110F] hover:text-[#263D2B] cursor-pointer"
                          >
                            <span>{tip.title}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-[#465640] shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-[#465640] shrink-0" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={(e) => toggleFavouriteJournalTip(tipKey, e)}
                            className="p-1 text-[#A8B5A0] hover:text-[#263D2B] transition-colors cursor-pointer"
                            title={isFavorited ? 'Remove from saved tips' : 'Save tip to favourites'}
                            aria-label={`Save tip ${tip.title}`}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isFavorited ? 'fill-[#263D2B] text-[#263D2B]' : ''}`} />
                          </button>
                        </div>

                        {isExpanded && (
                          <p className="text-xs text-[#465640] leading-relaxed font-light pt-2.5 border-t border-[#EAE5DC] mt-2.5 animate-fade-in">
                            {tip.text}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Special Chapter 04: Shade-Specific Care Matrix */}
              {activeJournalChapter.id === 'shine' && (
                <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#263D2B]">
                      Shade Family Quick Reference
                    </span>
                    <Palette className="w-3.5 h-3.5 text-[#263D2B]" />
                  </div>
                  <p className="text-[11.5px] text-[#6B7068] font-light leading-snug">
                    Each colour family reacts differently to water minerals and styling heat:
                  </p>
                  <div className="space-y-1.5 text-xs text-[#465640]">
                    <div className="p-2 rounded-lg bg-white border border-[#DCE1D8]">
                      <strong>Brunettes:</strong> Cold rinses seal rich chocolate depth without muddiness.
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-[#DCE1D8]">
                      <strong>Blondes:</strong> Violet/pearl glazes banish brass; avoid hard water minerals.
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-[#DCE1D8]">
                      <strong>Coppers/Reds:</strong> Wash exclusively in lukewarm water; red molecules leach fastest.
                    </div>
                  </div>
                  <p className="text-[10.5px] text-[#6B7068] italic pt-1">
                    *Colour fading naturally depends on porosity, mineral hardness, sunlight, and wash frequency.
                  </p>
                </div>
              )}

            </div>

            {/* Right Column: Editorial Summary, Core Guidelines, and Interactive Checklist */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#465640] block mb-1">
                  CHAPTER {activeJournalChapter.chapter} • {activeJournalChapter.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                  {activeJournalChapter.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#465640] leading-relaxed font-light mt-2">
                  {activeJournalChapter.summary}
                </p>
              </div>

              {/* Four Actionable Core Guidelines */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                  Artisanal Care Guidelines:
                </span>
                <div className="space-y-2.5">
                  {activeJournalChapter.guidelines.map((guide, gIdx) => (
                    <div
                      key={gIdx}
                      className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#263D2B] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#465640] font-light leading-relaxed">
                        {guide}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Chapter Checklist */}
              <div className="pt-4 border-t border-[#DCE1D8] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ListChecks className="w-4 h-4 text-[#263D2B]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                      Chapter {activeJournalChapter.chapter} Habit Checklist
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-[#263D2B] bg-[#EBF0E9] px-2.5 py-0.5 rounded-full">
                    {activeJournalChapter.checklist.filter(i => journalChecklist[i.id]).length} of {activeJournalChapter.checklist.length} Complete
                  </span>
                </div>

                <div className="space-y-2">
                  {activeJournalChapter.checklist.map((item) => {
                    const isChecked = !!journalChecklist[item.id];
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleJournalChecklistItem(item.id)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center gap-3 cursor-pointer ${
                          isChecked
                            ? 'bg-[#EBF0E9] border-[#263D2B] text-[#18271B]'
                            : 'bg-white border-[#DCE1D8] hover:border-[#A8B5A0] text-[#465640]'
                        }`}
                        aria-label={`Mark habit: ${item.text}`}
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-[#263D2B] shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-[#A8B5A0] shrink-0" />
                        )}
                        <span className={`text-xs sm:text-sm leading-snug ${isChecked ? 'line-through text-[#6B7068]' : 'font-light'}`}>
                          {item.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Quick Actions */}
              <div className="pt-4 border-t border-[#DCE1D8] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-[#6B7068]">
                  <span>Chapter {activeJournalChapter.chapter} of 04</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveJournalChapterIndex(prev => (prev > 0 ? prev - 1 : COLOUR_CARE_JOURNAL_CHAPTERS.length - 1))}
                    className="px-3.5 py-2 rounded-full border border-[#DCE1D8] hover:border-[#263D2B] bg-white text-xs font-bold uppercase tracking-wider text-[#263D2B] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev Chapter</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveJournalChapterIndex(prev => (prev < COLOUR_CARE_JOURNAL_CHAPTERS.length - 1 ? prev + 1 : 0))}
                    className="px-3.5 py-2 rounded-full border border-[#DCE1D8] hover:border-[#263D2B] bg-white text-xs font-bold uppercase tracking-wider text-[#263D2B] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Next Chapter</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6.4. INTERACTIVE WEEKLY HAIR-CARE PLANNER (7-DAY RHYTHM)                  */}
        {/* ========================================================================= */}
        <div className="mb-12 bg-[#F2EFE8] border border-[#DCE1D8] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-wider text-[#263D2B] mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#263D2B]" />
                <span>INTERACTIVE RHYTHM PLANNER</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                Weekly Hair-Care Planner
              </h3>
              <p className="text-xs text-[#6B7068] font-light mt-0.5">
                Map your weekly wash, hydration mask, and heat-free days to eliminate routine guesswork.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#465640] bg-white border border-[#DCE1D8] px-3 py-1.5 rounded-full">
                Selected Day: <strong>{selectedPlannerDay}</strong>
              </span>
            </div>
          </div>

          {/* 7-Day Tabs Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-6">
            {Object.keys(weeklyPlanner).map((day) => {
              const item = weeklyPlanner[day];
              const isSelected = selectedPlannerDay === day;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => {
                    setSelectedPlannerDay(day);
                    setIsEditingPlannerDay(false);
                  }}
                  className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-sm'
                      : 'bg-white text-[#10110F] border-[#DCE1D8] hover:border-[#263D2B]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className={`text-xs font-mono font-bold ${isSelected ? 'text-white' : 'text-[#263D2B]'}`}>
                      {day}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${
                      item.category === 'wash' ? 'bg-[#465640]' :
                      item.category === 'mask' ? 'bg-[#263D2B]' :
                      item.category === 'heat-shield' ? 'bg-[#A8B5A0]' : 'bg-[#DCE1D8]'
                    }`} />
                  </div>
                  <div className={`text-xs font-serif font-medium line-clamp-2 ${isSelected ? 'text-white' : 'text-[#10110F]'}`}>
                    {item.routine}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Day Detail & Customizer */}
          <div className="bg-white rounded-2xl border border-[#DCE1D8] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#263D2B]">
                  {selectedPlannerDay}&rsquo;s Dedicated Care Rhythm:
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#F2EFE8] text-[#465640]">
                  {weeklyPlanner[selectedPlannerDay]?.category}
                </span>
              </div>
              <h4 className="font-serif text-lg sm:text-xl text-[#10110F]">
                {weeklyPlanner[selectedPlannerDay]?.routine}
              </h4>
              <p className="text-xs text-[#6B7068] font-light">
                {weeklyPlanner[selectedPlannerDay]?.note}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setPlannerEditText(weeklyPlanner[selectedPlannerDay]?.routine || '');
                  setIsEditingPlannerDay(!isEditingPlannerDay);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#DCE1D8] hover:border-[#263D2B] bg-white text-xs font-bold uppercase tracking-wider text-[#263D2B] transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingPlannerDay ? 'Cancel Edit' : 'Edit Day Routine'}</span>
              </button>
            </div>
          </div>

          {/* Quick Edit Drawer for the Selected Day */}
          {isEditingPlannerDay && (
            <div className="mt-4 p-5 rounded-2xl bg-white border border-[#263D2B] space-y-4 animate-fade-in">
              <span className="text-xs font-bold uppercase tracking-wider text-[#10110F] block">
                Update {selectedPlannerDay}&rsquo;s Routine or Choose a Quick Preset:
              </span>

              {/* Preset Quick Buttons */}
              <div className="flex flex-wrap gap-2">
                {[
                  { text: 'Gentle Wash & Scalp Massage', cat: 'wash' },
                  { text: 'Deep Hydration Mask Ritual', cat: 'mask' },
                  { text: 'Heat-Free Day / Silk Styling', cat: 'heat-free' },
                  { text: 'Leave-In Gloss & Shine Mist', cat: 'shine' },
                  { text: 'Thermal Shield Styling Day', cat: 'heat-shield' },
                  { text: 'Rest & Pure Air-Dry', cat: 'rest' }
                ].map((preset, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => handleUpdatePlannerDay(selectedPlannerDay, preset.text, preset.cat)}
                    className="px-3 py-1.5 rounded-full text-xs bg-[#F7F4ED] border border-[#DCE1D8] hover:border-[#263D2B] hover:bg-[#263D2B] hover:text-white transition-all cursor-pointer text-[#465640]"
                  >
                    + {preset.text}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  value={plannerEditText}
                  onChange={(e) => setPlannerEditText(e.target.value)}
                  placeholder="Or type a custom reminder..."
                  className="flex-1 px-4 py-2 rounded-xl border border-[#DCE1D8] text-xs focus:outline-none focus:ring-1 focus:ring-[#263D2B]"
                />
                <button
                  type="button"
                  onClick={() => handleUpdatePlannerDay(selectedPlannerDay, plannerEditText || 'Custom Hair Care', 'custom')}
                  className="global-button !px-5 !py-2 text-white text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 6.5. SALON PREPARATION PROTOCOL (PRESERVED & ENHANCED)                    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          
          {/* Pre-Appointment Guidance */}
          <div className="bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="inline-flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-wider text-[#263D2B]">
              <Clock className="w-4 h-4 text-[#263D2B]" />
              <span>BEFORE YOUR COLOUR SESSION</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal">
              Preparing for Your Visit
            </h3>
            <ul className="space-y-3 text-xs text-[#465640] pt-1">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#263D2B] shrink-0 mt-0.5" />
                <span><strong>Wash 24–48 Hours Prior:</strong> Natural scalp oils act as a gentle protective shield during lightening.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#263D2B] shrink-0 mt-0.5" />
                <span><strong>Bring Inspiration Photos:</strong> Show Janki 2–3 photos highlighting the tones and placement you admire.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#263D2B] shrink-0 mt-0.5" />
                <span><strong>Disclose Past Treatments:</strong> Mention any prior box dyes, henna, or chemical keratin smoothing treatments.</span>
              </li>
            </ul>
          </div>

          {/* Post-Appointment Care */}
          <div className="bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="inline-flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-wider text-[#263D2B]">
              <Sparkles className="w-4 h-4 text-[#263D2B]" />
              <span>AFTERCARE FOR MAXIMUM WEAR</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal">
              Preserving Your Tone &amp; Gloss
            </h3>
            <ul className="space-y-3 text-xs text-[#465640] pt-1">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#263D2B] shrink-0 mt-0.5" />
                <span><strong>Wait 48 Hours to Shampoo:</strong> Allows the cuticle to fully close and lock in the acidic toner pigments.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#263D2B] shrink-0 mt-0.5" />
                <span><strong>Use Sulfate-Free Wash:</strong> Harsh sulfates strip toning molecules; wash with lukewarm water.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#263D2B] shrink-0 mt-0.5" />
                <span><strong>Schedule 8-Week Toner Baths:</strong> A quick 45-minute toner gloss ($60 CAD) revitalizes radiance effortlessly.</span>
              </li>
            </ul>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 7. BOTTOM BOOKING SANCTUARY BANNER                                        */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16 sm:pt-24">
        <ScrollReveal className="p-8 sm:p-12 rounded-3xl bg-white border border-[#DCE1D8] shadow-xs text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              <Sparkles className="w-4 h-4 text-[#263D2B]" />
              PRIVATE SUITE COLOUR CONSULTATIONS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#10110F]">
              Ready for your signature hair transformation?
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed max-w-lg mx-auto font-light">
              Reserve your unhurried appointment with master artist Janki Patel in our private Ottawa suite.
            </p>

            <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
              <Link
                to="/services"
                className="global-button !px-8 !py-3.5 text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer flex items-center gap-2"
              >
                <span>EXPLORE ALL SALON SERVICES</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
              <Link
                to="/contact"
                className="global-button-secondary !px-8 !py-3.5 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
              >
                <span>CONNECT WITH STUDIO</span>
              </Link>
            </div>

            <div className="pt-4 border-t border-[#DCE1D8] flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#6B7068]">
              <span>Single-Guest Suite</span>
              <span>•</span>
              <span>
                Concierge: <a href="tel:+16162550549" className="font-semibold text-[#10110F] hover:text-[#263D2B]">+1 (616) 255-0549</a>
              </span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 8. INTERACTIVE TECHNIQUE DETAILS MODAL                                    */}
      {/* ========================================================================= */}
      {selectedTechniqueModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="technique-modal-title"
          onClick={() => setSelectedTechniqueModal(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl text-[#10110F] scrollbar-thin scrollbar-thumb-[#263D2B]/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedTechniqueModal(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-[#DCE1D8] hover:bg-[#F7F4ED] hover:border-[#263D2B] text-[#10110F] flex items-center justify-center transition-all cursor-pointer shadow-xs"
              aria-label="Close technique details"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Hero Image */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-[#10110F]">
              <img
                src={selectedTechniqueModal.image}
                alt={selectedTechniqueModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              
              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#263D2B]/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#A8B5A0] border border-[#465640]">
                  {selectedTechniqueModal.categoryLabel}
                </div>
                <h3 id="technique-modal-title" className="font-serif text-2xl sm:text-3xl font-normal text-white">
                  {selectedTechniqueModal.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#A8B5A0] italic">
                  {selectedTechniqueModal.tagline}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Description */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                  THE ARTISTRY &amp; CRAFT
                </span>
                <p className="text-xs sm:text-sm text-[#465640] leading-relaxed">
                  {selectedTechniqueModal.description}
                </p>
              </div>

              {/* Key Technique Insights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Expected Visual Result */}
                <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1.5">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
                    Expected Visual Result
                  </span>
                  <p className="text-xs text-[#465640] leading-relaxed">
                    {selectedTechniqueModal.expectedResult}
                  </p>
                </div>

                {/* Hair Considerations */}
                <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1.5">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1.5">
                    <Scissors className="w-3.5 h-3.5 text-[#263D2B]" />
                    Hair Type &amp; Length Considerations
                  </span>
                  <p className="text-xs text-[#465640] leading-relaxed">
                    {selectedTechniqueModal.hairConsiderations}
                  </p>
                </div>

                {/* Maintenance Guidance */}
                <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1.5">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                    Maintenance Guidance
                  </span>
                  <p className="text-xs text-[#465640] leading-relaxed">
                    {selectedTechniqueModal.maintenance}
                  </p>
                </div>

                {/* Best For */}
                <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1.5">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#263D2B]" />
                    Ideal Client Profile
                  </span>
                  <p className="text-xs text-[#465640] leading-relaxed">
                    {selectedTechniqueModal.bestFor}
                  </p>
                </div>

              </div>

              {/* Consultation Notes Callout Box */}
              <div className={`p-4 sm:p-5 rounded-2xl border space-y-1.5 ${
                selectedTechniqueModal.isConsultationRequired
                  ? 'bg-[#18271B] text-[#F7F4ED] border-[#263D2B]'
                  : 'bg-[#F7F4ED] text-[#10110F] border-[#DCE1D8]'
              }`}>
                <div className="flex items-center gap-2">
                  <AlertCircle className={`w-4 h-4 flex-shrink-0 ${
                    selectedTechniqueModal.isConsultationRequired ? 'text-[#A8B5A0]' : 'text-[#263D2B]'
                  }`} />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    {selectedTechniqueModal.isConsultationRequired
                      ? 'Consultation-First Requirement & Strand Test'
                      : 'Atelier Consultation Notes'}
                  </span>
                </div>
                <p className={`text-xs leading-relaxed ${
                  selectedTechniqueModal.isConsultationRequired ? 'text-[#DCE1D8]' : 'text-[#465640]'
                }`}>
                  {selectedTechniqueModal.consultationNotes}
                </p>
              </div>

              {/* Process Highlights */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                  INCLUDED IN YOUR APPOINTMENT
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {selectedTechniqueModal.processHighlights?.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#465640] p-2.5 rounded-xl bg-white border border-[#DCE1D8]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#263D2B] flex-shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="pt-4 border-t border-[#DCE1D8] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">
                    {selectedTechniqueModal.isConsultationRequired ? 'ESTIMATED STUDIO RATE' : 'ALL-INCLUSIVE STUDIO RATE'}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-normal text-[#10110F]">
                      ${selectedTechniqueModal.price} <span className="text-xs font-sans text-[#6B7068]">{selectedTechniqueModal.isConsultationRequired ? 'CAD/hr' : 'CAD'}</span>
                    </span>
                    <span className="text-xs text-[#6B7068]">
                      • {selectedTechniqueModal.duration}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => toggleTechniqueInspiration(selectedTechniqueModal)}
                    className={`flex-1 sm:flex-none px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                      isInspirationSaved(`tech-${selectedTechniqueModal.id}`)
                        ? 'bg-[#263D2B] text-white border-[#A8B5A0] shadow-sm'
                        : 'bg-white text-[#263D2B] border-[#DCE1D8] hover:border-[#263D2B]'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isInspirationSaved(`tech-${selectedTechniqueModal.id}`) ? 'fill-[#A8B5A0] text-[#A8B5A0]' : ''}`} />
                    <span>{isInspirationSaved(`tech-${selectedTechniqueModal.id}`) ? 'Saved to Moodboard' : 'Save Look'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedTechniqueModal(null)}
                    className="flex-1 sm:flex-none px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider global-button text-white shadow-sm cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. COMPARE SHADES MODAL (UP TO 3 SHADES SIDE-BY-SIDE)                     */}
      {/* ========================================================================= */}
      {isCompareModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="compare-modal-title"
          onClick={() => setIsCompareModalOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl text-[#10110F] p-6 sm:p-8 space-y-6 scrollbar-thin scrollbar-thumb-[#263D2B]/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#DCE1D8] pb-4">
              <div>
                <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#263D2B]">
                  <Scale className="w-3.5 h-3.5 text-[#263D2B]" />
                  <span>SIDE-BY-SIDE SHADE COMPARISON</span>
                </div>
                <h3 id="compare-modal-title" className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal pt-1">
                  Compare Atelier Shades
                </h3>
                <p className="text-xs text-[#6B7068] font-light">
                  Comparing {comparedShades.length} of 3 shades across tone, base requirements, and expected results.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {comparedShades.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setComparedShades([])}
                    className="text-xs text-[#6B7068] hover:text-[#10110F] underline cursor-pointer px-2 py-1"
                  >
                    Clear All
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsCompareModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] hover:border-[#263D2B] text-[#10110F] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                  aria-label="Close shade comparison"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Comparison Grid */}
            {comparedShades.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <Palette className="w-10 h-10 text-[#A8B5A0] mx-auto" />
                <h4 className="font-serif text-xl text-[#10110F]">No shades added to compare</h4>
                <p className="text-xs text-[#6B7068] max-w-sm mx-auto font-light">
                  Click the &ldquo;+ Compare&rdquo; button on any shade swatch in the explorer to compare 2 or 3 shades side by side.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCompareModalOpen(false)}
                  className="global-button !px-6 !py-2.5 text-xs text-white uppercase font-bold tracking-wider inline-block cursor-pointer shadow-xs"
                >
                  Back to Shade Explorer
                </button>
              </div>
            ) : (
              <div className={`grid grid-cols-1 ${
                comparedShades.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
              } gap-6 items-stretch`}>
                {comparedShades.map((shade) => (
                  <div
                    key={shade.id}
                    className="bg-[#F7F4ED] rounded-2xl border border-[#DCE1D8] p-5 flex flex-col justify-between space-y-5 relative shadow-xs"
                  >
                    {/* Top: Swatch & Name */}
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span
                            className="w-10 h-10 rounded-full border-2 border-white shadow-md flex-shrink-0"
                            style={{ backgroundColor: shade.hex }}
                          />
                          <div>
                            <span className="text-[10px] font-mono tracking-widest text-[#6B7068] uppercase block">
                              HEX {shade.hex}
                            </span>
                            <h4 className="font-serif text-lg font-normal text-[#10110F]">
                              {shade.name}
                            </h4>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleCompareShade(shade)}
                          className="text-[10px] font-bold text-[#6B7068] hover:text-[#10110F] uppercase underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>

                      {/* Photo preview */}
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#10110F]">
                        <img
                          src={shade.image}
                          alt={shade.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-[#10110F]/85 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-[#A8B5A0]">
                          {shade.baseLevel}
                        </div>
                      </div>

                      {/* Attribute rows */}
                      <div className="space-y-2.5 text-xs">
                        <div className="p-2.5 rounded-xl bg-white border border-[#DCE1D8]">
                          <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#263D2B] block">
                            Expected Visual Result
                          </span>
                          <p className="text-[11px] text-[#465640] leading-snug pt-0.5">
                            {shade.expectedEffect}
                          </p>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white border border-[#DCE1D8]">
                          <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#263D2B] block">
                            Best Skin Harmony
                          </span>
                          <p className="text-[11px] text-[#465640] leading-snug pt-0.5">
                            {shade.bestSkin}
                          </p>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white border border-[#DCE1D8]">
                          <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#263D2B] block">
                            Recommended Technique
                          </span>
                          <p className="text-[11px] text-[#465640] leading-snug pt-0.5">
                            {shade.recommendedTechnique}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-3 border-t border-[#DCE1D8] space-y-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedShade(shade);
                          setIsCompareModalOpen(false);
                        }}
                        className="w-full py-2.5 rounded-full global-button text-xs font-bold uppercase tracking-wider text-white shadow-xs cursor-pointer"
                      >
                        Select in Explorer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
