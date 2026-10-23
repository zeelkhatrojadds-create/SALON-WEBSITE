import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Clock, 
  Tag, 
  ArrowRight, 
  ShieldCheck, 
  Heart,
  Droplets,
  Sun,
  Flame,
  Flower2,
  Scissors,
  Check,
  UserCheck
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';
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

// 12 Monthly Self-Care Themes
const MONTHLY_THEMES = [
  {
    month: 0, // January
    title: 'Healthy Hair Habits',
    subtitle: 'Establish restorative cleansing, heat-protection, and hydration habits for lustrous hair.',
    icon: Scissors,
    focus: 'Cold-weather cuticle sealing & amino bond restoration',
    recommendedTreatmentId: 'noor-hair-repair-ritual',
    recommendedTreatmentName: 'Noor Hair Repair Ritual',
    serviceCategory: 'hair-treatments',
    price: 65,
    duration: '45 min'
  },
  {
    month: 1, // February
    title: 'Love Your Skin',
    subtitle: 'Nourish your skin barrier with botanical lipids, rosewater hydration, and gentle care.',
    icon: Heart,
    focus: 'Barrier restoration, facial massage, and deep moisture lock',
    recommendedTreatmentId: 'special-glam-girl-facial',
    recommendedTreatmentName: 'Special Glam Girl Facial',
    serviceCategory: 'facial',
    price: 80,
    duration: '60 min'
  },
  {
    month: 2, // March
    title: 'Scalp Care',
    subtitle: 'Revitalize hair follicles from the root with soothing botanical exfoliation and acupressure.',
    icon: Flower2,
    focus: 'Ayurvedic herbal oil scalp therapy & follicle purification',
    recommendedTreatmentId: 'scalp-treatment',
    recommendedTreatmentName: 'Relaxing Scalp Treatment',
    serviceCategory: 'hair-treatments',
    price: 50,
    duration: '45 min'
  },
  {
    month: 3, // April
    title: 'Fresh Spring Glow',
    subtitle: 'Shed winter dullness with gentle exfoliation, vitamin C radiance, and precision brow shaping.',
    icon: Sparkles,
    focus: 'Micro-exfoliation, 24K gold cellular rejuvenation, and precision brow contouring',
    recommendedTreatmentId: 'gold-facial',
    recommendedTreatmentName: '24K Gold Luxury Facial',
    serviceCategory: 'facial',
    price: 90,
    duration: '60 min'
  },
  {
    month: 4, // May
    title: 'Hydration and Moisture',
    subtitle: 'Replenish cellular moisture with aloe vera, cooling rose compression, and deep conditioning wraps.',
    icon: Droplets,
    focus: 'Deep steam moisture infusion & hyaluronic barrier plumping',
    recommendedTreatmentId: 'deep-conditioning',
    recommendedTreatmentName: 'Deep Conditioning Treatment',
    serviceCategory: 'hair-treatments',
    price: 45,
    duration: '45 min'
  },
  {
    month: 5, // June
    title: 'Sun Protection',
    subtitle: 'Shield skin and hair strands from UV exposure with broad-spectrum SPF 50 and soothing botanical wraps.',
    icon: Sun,
    focus: 'Broad-spectrum mineral defense, anti-redness care, and full face threading',
    recommendedTreatmentId: 'sitara-full-face-threading',
    recommendedTreatmentName: 'Sitara Full Face Threading',
    serviceCategory: 'threading',
    price: 35,
    duration: '30 min'
  },
  {
    month: 6, // July
    title: 'Summer Hair Care',
    subtitle: 'Defend against humidity and heat with smoothing keratin bond building and anti-frizz shine seals.',
    icon: Flame,
    focus: 'Anti-humidity thermal shields, blowout memory, and split-end seals',
    recommendedTreatmentId: 'blow-dry-styling',
    recommendedTreatmentName: 'Blow Dry & Styling',
    serviceCategory: 'hairstyling',
    price: 40,
    duration: '45 min'
  },
  {
    month: 7, // August
    title: 'Nail Care',
    subtitle: 'Pamper hands and feet with Himalayan mineral soaks, cuticle refinement, and long-lasting lacquer.',
    icon: Sparkles,
    focus: 'Cuticle hydration, sea salt exfoliation, and high-shine nail care',
    recommendedTreatmentId: 'classic-manicure',
    recommendedTreatmentName: 'Artisan Classic Manicure',
    serviceCategory: 'nails',
    price: 35,
    duration: '40 min'
  },
  {
    month: 8, // September
    title: 'Repair and Restore',
    subtitle: 'Recover from post-summer sun damage with amino bond repair, peptide serums, and targeted hydration.',
    icon: ShieldCheck,
    focus: 'Post-sun damage recovery, cuticle resealing, and gentle skin peel',
    recommendedTreatmentId: 'noor-hair-repair-ritual',
    recommendedTreatmentName: 'Noor Hair Repair Ritual',
    serviceCategory: 'hair-treatments',
    price: 65,
    duration: '45 min'
  },
  {
    month: 9, // October
    title: 'Seasonal Skin Care',
    subtitle: 'Transition to richer creams, comforting face massages, and restorative herbal steam rituals.',
    icon: Flower2,
    focus: 'Herbal skin calming, warm stone relaxation, and protective barrier renewal',
    recommendedTreatmentId: 'herbal-facial',
    recommendedTreatmentName: 'Restorative Herbal Facial',
    serviceCategory: 'facial',
    price: 70,
    duration: '60 min'
  },
  {
    month: 10, // November
    title: 'Nourishing Hair Care',
    subtitle: 'Lock in deep moisture against cold autumn winds with Ayurvedic herbal butters and steaming wraps.',
    icon: Droplets,
    focus: 'Warm oil acupressure, steam infusion, and herbal hair butter wrap',
    recommendedTreatmentId: 'kesariya-hair-spa',
    recommendedTreatmentName: 'Kesariya Luxury Hair Spa',
    serviceCategory: 'hair-treatments',
    price: 75,
    duration: '60 min'
  },
  {
    month: 11, // December
    title: 'Party-Ready Beauty',
    subtitle: 'Glow at every celebration with glass-skin facials, sculpted Hollywood glam waves, and couture artistry.',
    icon: Sparkles,
    focus: 'HD complexion radiance, festive eye artistry, and royal volume styling',
    recommendedTreatmentId: 'party-makeup',
    recommendedTreatmentName: 'Party Glam Makeover',
    serviceCategory: 'makeup',
    price: 90,
    duration: '60 min'
  }
];

// Weekly hair-care reminders by Day of Week (0 = Sun, 1 = Mon, ..., 6 = Sat)
const WEEKLY_HAIR_REMINDERS = [
  {
    dayName: 'Sunday',
    headline: 'Ayurvedic Scalp Rejuvenation',
    tip: 'Warm Brahmi and Bhringraj botanical oil acupressure massage for 15 minutes before your relaxing shower.'
  },
  {
    dayName: 'Monday',
    headline: 'Hydration Reset & Gentle Detangling',
    tip: 'Apply lightweight leave-in conditioner to towel-damp hair and detangle with a wide-tooth sandalwood comb.'
  },
  {
    dayName: 'Tuesday',
    headline: 'Heat-Protection Check',
    tip: 'Always mist with thermal defense spray (up to 450°F) before any blowout, flat iron, or curling wand styling.'
  },
  {
    dayName: 'Wednesday',
    headline: 'Mid-Week Deep Conditioning Mask',
    tip: 'Pamper lengths with a hydrating amino mask. Wrap in a warm micro-fiber towel for 10 minutes for deeper penetration.'
  },
  {
    dayName: 'Thursday',
    headline: 'Split-End Sealing & Argan Care',
    tip: 'Warm 2 drops of pure cold-pressed argan oil between palms and smooth over hair tips to combat friction and split ends.'
  },
  {
    dayName: 'Friday',
    headline: 'Weekend Radiance Blowout Prep',
    tip: 'Round-brush blowout finish with cool-shot seal on roots to maximize volume and mirror-like shine for your weekend.'
  },
  {
    dayName: 'Saturday',
    headline: 'Scalp Exfoliation & Silk Pillowcase Refresh',
    tip: 'Gently clarify product buildup with botanical tea tree rinse, and sleep on a fresh pure mulberry silk pillowcase.'
  }
];

// Helper: Format Date key as YYYY-MM-DD
function formatDateKey(year, month, day) {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

export default function MonthlyBeautyCalendar() {
  const today = useMemo(() => new Date(), []);
  
  // Navigation month & year state
  const [currentYear, setCurrentYear] = useState(() => today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(() => today.getMonth());
  
  // Selected date state (defaults to today)
  const [selectedDay, setSelectedDay] = useState(() => today.getDate());

  // Logged-in patron state
  const [currentUser, setCurrentUser] = useState(() => getSessionUser());

  // Checkbox activity checklist progress state: { "YYYY-MM-DD": { item0: true, item1: false, ... } }
  const [completedActivities, setCompletedActivities] = useState(() => {
    try {
      const user = getSessionUser();
      const storageKey = `glfy_beauty_cal_progress_${user?.id || 'guest'}`;
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Sync user state on auth change
  useEffect(() => {
    const handleAuth = () => {
      const u = getSessionUser();
      setCurrentUser(u);
      try {
        const storageKey = `glfy_beauty_cal_progress_${u?.id || 'guest'}`;
        const saved = localStorage.getItem(storageKey);
        if (saved) setCompletedActivities(JSON.parse(saved));
      } catch (e) {}
    };

    window.addEventListener('storage', handleAuth);
    window.addEventListener('glfy:auth-changed', handleAuth);
    return () => {
      window.removeEventListener('storage', handleAuth);
      window.removeEventListener('glfy:auth-changed', handleAuth);
    };
  }, []);

  // Save checklist progress to localStorage
  const saveProgress = (updatedMap) => {
    try {
      const storageKey = `glfy_beauty_cal_progress_${currentUser?.id || 'guest'}`;
      localStorage.setItem(storageKey, JSON.stringify(updatedMap));
    } catch (e) {
      console.warn('Could not save calendar progress:', e);
    }
  };

  // Month navigation handlers
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
    setSelectedDay(1);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
    setSelectedDay(1);
  };

  const handleJumpToToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setSelectedDay(today.getDate());
  };

  // Active theme for current navigated month
  const activeTheme = useMemo(() => {
    return MONTHLY_THEMES[currentMonth] || MONTHLY_THEMES[0];
  }, [currentMonth]);

  // Calendar days grid computation
  const daysInMonth = useMemo(() => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  }, [currentYear, currentMonth]);

  const firstDayOfWeek = useMemo(() => {
    return new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday
  }, [currentYear, currentMonth]);

  // Selected date object & details
  const selectedDateObj = useMemo(() => {
    const safeDay = Math.min(selectedDay, daysInMonth);
    return new Date(currentYear, currentMonth, safeDay);
  }, [currentYear, currentMonth, selectedDay, daysInMonth]);

  const selectedDateKey = useMemo(() => {
    return formatDateKey(currentYear, currentMonth, selectedDateObj.getDate());
  }, [currentYear, currentMonth, selectedDateObj]);

  const selectedDayOfWeek = selectedDateObj.getDay();
  const weeklyReminder = WEEKLY_HAIR_REMINDERS[selectedDayOfWeek];

  // Activities list for selected date
  const dayActivities = useMemo(() => {
    const dayNum = selectedDateObj.getDate();
    return [
      {
        id: 'act-1',
        title: 'Morning Complexion Awakening',
        description: 'Splash with lukewarm water, gently pat botanical toner, and seal with broad-spectrum SPF 50 sunscreen.'
      },
      {
        id: 'act-2',
        title: `Weekly Hair Ritual: ${weeklyReminder.headline}`,
        description: weeklyReminder.tip
      },
      {
        id: 'act-3',
        title: 'Hydration & Antioxidant Infusion',
        description: 'Drink 2.5 litres of room-temperature water with a squeeze of fresh lemon, and apply hydrating lip butter.'
      },
      {
        id: 'act-4',
        title: 'Evening Restorative Self-Care',
        description: `Double-cleanse away impurities, apply peptide-rich night serum, and practice 5 minutes of mindful breathwork.`
      }
    ];
  }, [selectedDateObj, weeklyReminder]);

  // Toggle activity checkbox
  const handleToggleActivity = (actId) => {
    setCompletedActivities((prev) => {
      const currentDayMap = prev[selectedDateKey] || {};
      const updatedDayMap = {
        ...currentDayMap,
        [actId]: !currentDayMap[actId]
      };
      const updatedMap = {
        ...prev,
        [selectedDateKey]: updatedDayMap
      };
      saveProgress(updatedMap);
      return updatedMap;
    });
  };

  // Check completion stats for selected date
  const dayCompletionStats = useMemo(() => {
    const dayMap = completedActivities[selectedDateKey] || {};
    const total = dayActivities.length;
    const completed = dayActivities.filter((act) => dayMap[act.id]).length;
    const percent = Math.round((completed / total) * 100);
    return { completed, total, percent };
  }, [completedActivities, selectedDateKey, dayActivities]);

  // Helper: check if a given day in the month is completed
  const isDayFullyCompleted = (day) => {
    const key = formatDateKey(currentYear, currentMonth, day);
    const dayMap = completedActivities[key] || {};
    return dayActivities.length > 0 && dayActivities.every((act) => dayMap[act.id]);
  };

  const hasDayAnyProgress = (day) => {
    const key = formatDateKey(currentYear, currentMonth, day);
    const dayMap = completedActivities[key] || {};
    return Object.values(dayMap).some(Boolean);
  };

  // Month formatted name (e.g. "October 2026")
  const monthNameString = useMemo(() => {
    return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
      new Date(currentYear, currentMonth, 1)
    );
  }, [currentYear, currentMonth]);

  // Selected date formatted (e.g. "Wednesday, October 21, 2026")
  const selectedDateFormatted = useMemo(() => {
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(selectedDateObj);
  }, [selectedDateObj]);

  const ThemeIcon = activeTheme.icon;

  return (
    <section id="monthly-beauty-calendar" className="mt-20 sm:mt-28 lg:mt-32 pt-16 sm:pt-20 border-t border-[#DCE1D8] scroll-mt-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ===================================================================== */}
        {/* 1. SECTION HEADER                                                     */}
        {/* ===================================================================== */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
            <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.26em] text-[#263D2B]">
              DAILY SELF-CARE &amp; HAIR CARE RHYTHM
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
            Your Monthly Beauty Calendar
          </h2>

          <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

          <p className="font-sans text-sm sm:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto pt-1">
            A little care every day, a healthier glow all month long.
          </p>
        </ScrollReveal>

        {/* ===================================================================== */}
        {/* 2. MONTHLY THEME BANNER                                               */}
        {/* ===================================================================== */}
        <div className="mb-10 bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-center text-[#263D2B] flex-shrink-0">
              <ThemeIcon className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#263D2B]">
                  MONTHLY THEME
                </span>
                <span className="text-[10px] font-mono uppercase bg-[#263D2B]/10 text-[#263D2B] px-2 py-0.5 rounded-full font-bold">
                  {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(currentYear, currentMonth, 1))}
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal">
                {activeTheme.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#6B7068] font-light max-w-xl">
                {activeTheme.subtitle}
              </p>
            </div>
          </div>

          {/* Quick link to treatment of the month */}
          <div className="pt-2 md:pt-0 border-t md:border-t-0 border-[#DCE1D8] flex-shrink-0">
            <Link
              to={`/book-appointment?service=${activeTheme.recommendedTreatmentId}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-[4px] bg-[#263D2B] hover:bg-[#1C2E20] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>Book {activeTheme.recommendedTreatmentName}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 3. CALENDAR INTERFACE: 2-COLUMN LAYOUT (GRID ON LEFT, DAY DETAIL RIGHT) */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* =================================================================== */}
          {/* LEFT: MONTHLY CALENDAR GRID (7 COLS)                                */}
          {/* =================================================================== */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-7 border border-[#DCE1D8] shadow-xs">
            
            {/* Header: Month / Year Title & Navigation Controls */}
            <div className="flex items-center justify-between pb-6 border-b border-[#DCE1D8]">
              <div>
                <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F]">
                  {monthNameString}
                </h4>
                <p className="text-[11px] text-[#6B7068] font-sans font-light">
                  Select a day to view daily beauty rituals &amp; hair care focus
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleJumpToToday}
                  className="px-3 py-1.5 rounded-full border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-wider text-[#263D2B] hover:bg-[#F7F4ED] transition-colors cursor-pointer"
                >
                  Today
                </button>
                <div className="flex items-center gap-1 border border-[#DCE1D8] rounded-full p-0.5 bg-[#F7F4ED]/60">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#10110F] hover:bg-white hover:text-[#263D2B] transition-colors cursor-pointer"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#10110F] hover:bg-white hover:text-[#263D2B] transition-colors cursor-pointer"
                    aria-label="Next month"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Weekday Names Header */}
            <div className="grid grid-cols-7 gap-1 pt-4 pb-2 text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, dIdx) => (
                <div key={d} className={`text-[11px] font-bold tracking-wider uppercase font-sans ${dIdx === 0 || dIdx === 6 ? 'text-[#263D2B]' : 'text-[#6B7068]'}`}>
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar Days Matrix */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 pt-2">
              {/* Empty leading padding slots */}
              {Array.from({ length: firstDayOfWeek }).map((_, padIdx) => (
                <div key={`pad-${padIdx}`} className="aspect-square rounded-2xl bg-transparent" />
              ))}

              {/* Days of the active month */}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const dayNum = idx + 1;
                const isSelected = selectedDay === dayNum;
                const isTodayDate = 
                  today.getDate() === dayNum && 
                  today.getMonth() === currentMonth && 
                  today.getFullYear() === currentYear;
                
                const fullyDone = isDayFullyCompleted(dayNum);
                const hasProgress = hasDayAnyProgress(dayNum);

                return (
                  <button
                    key={`day-${dayNum}`}
                    type="button"
                    onClick={() => setSelectedDay(dayNum)}
                    className={`aspect-square rounded-2xl p-1.5 sm:p-2 transition-all duration-200 flex flex-col justify-between items-center text-center cursor-pointer relative group ${
                      isSelected
                        ? 'bg-[#263D2B] text-white shadow-md ring-2 ring-[#263D2B] ring-offset-2 scale-[1.02]'
                        : isTodayDate
                        ? 'bg-[#F7F4ED] border-2 border-[#263D2B] text-[#10110F] font-bold'
                        : 'bg-[#F7F4ED]/50 hover:bg-[#F7F4ED] text-[#10110F] border border-[#DCE1D8]/60 hover:border-[#263D2B]/50'
                    }`}
                  >
                    {/* Top Row: Day Number & Today indicator */}
                    <div className="w-full flex items-center justify-between">
                      <span className={`text-xs sm:text-sm font-semibold font-serif leading-none ${isSelected ? 'text-white' : 'text-[#10110F]'}`}>
                        {dayNum}
                      </span>
                      {isTodayDate && (
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-[#263D2B]'}`} title="Today" />
                      )}
                    </div>

                    {/* Bottom Indicator: Completed or Activity Dot */}
                    <div className="w-full flex items-center justify-center pt-1">
                      {fullyDone ? (
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center ${isSelected ? 'bg-white text-[#263D2B]' : 'bg-[#263D2B] text-white'}`}>
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      ) : hasProgress ? (
                        <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white/80' : 'bg-[#465640]'}`} />
                      ) : (
                        <span className="w-1 h-1 rounded-full bg-transparent" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Legend */}
            <div className="mt-6 pt-4 border-t border-[#DCE1D8] flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#6B7068] font-sans">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full border border-[#263D2B] bg-[#F7F4ED]" />
                  <span>Today</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#263D2B]" />
                  <span>Selected</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#263D2B] text-white flex items-center justify-center">
                    <Check className="w-2 h-2 stroke-[3]" />
                  </span>
                  <span>Activities Completed</span>
                </span>
              </div>

              {currentUser ? (
                <span className="flex items-center gap-1 text-[#263D2B] font-semibold">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Progress saved to your account</span>
                </span>
              ) : (
                <span className="text-[10.5px] text-[#6B7068]">
                  Progress saved on this device
                </span>
              )}
            </div>

          </div>

          {/* =================================================================== */}
          {/* RIGHT: SELECTED DATE BEAUTY TIPS & INTERACTIVE CHECKLIST            */}
          {/* =================================================================== */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#DCE1D8] shadow-xs space-y-6">
            
            {/* Header: Selected Date & Completion Progress */}
            <div className="space-y-3 pb-5 border-b border-[#DCE1D8]">
              <div className="inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-[#263D2B]">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>DAILY BEAUTY RITUAL</span>
              </div>

              <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F]">
                {selectedDateFormatted}
              </h4>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-[#6B7068]">Checklist Progress:</span>
                  <span className="text-[#263D2B] font-mono">
                    {dayCompletionStats.completed} / {dayCompletionStats.total} ({dayCompletionStats.percent}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F7F4ED] overflow-hidden border border-[#DCE1D8]">
                  <div 
                    className="h-full bg-[#263D2B] transition-all duration-500 rounded-full"
                    style={{ width: `${dayCompletionStats.percent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Weekly Hair Care Focus Pill */}
            <div className="p-4 rounded-2xl bg-[#F7F4ED]/80 border border-[#DCE1D8] space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] bg-white px-2 py-0.5 rounded-md border border-[#DCE1D8]">
                  {weeklyReminder.dayName} Hair Focus
                </span>
                <span className="text-xs font-bold font-serif text-[#10110F]">
                  {weeklyReminder.headline}
                </span>
              </div>
              <p className="text-xs text-[#6B7068] font-light leading-relaxed">
                {weeklyReminder.tip}
              </p>
            </div>

            {/* Interactive Daily Activities Checklist */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                  Today&apos;s Beauty Checklist:
                </span>
                <span className="text-[11px] text-[#6B7068]">Tap box to complete</span>
              </div>

              <div className="space-y-2.5">
                {dayActivities.map((act) => {
                  const isChecked = Boolean(completedActivities[selectedDateKey]?.[act.id]);

                  return (
                    <div
                      key={act.id}
                      onClick={() => handleToggleActivity(act.id)}
                      className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3 text-left ${
                        isChecked
                          ? 'bg-[#F7F4ED]/80 border-[#263D2B] text-[#10110F]'
                          : 'bg-white hover:bg-[#F7F4ED]/40 border-[#DCE1D8]'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleActivity(act.id);
                        }}
                        className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer ${
                          isChecked
                            ? 'bg-[#263D2B] border-[#263D2B] text-white shadow-xs'
                            : 'border-[#DCE1D8] bg-white hover:border-[#263D2B]'
                        }`}
                        aria-label={isChecked ? `Mark ${act.title} as incomplete` : `Mark ${act.title} as completed`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>

                      <div className="space-y-0.5 flex-1">
                        <span className={`text-xs font-semibold block transition-colors ${
                          isChecked ? 'line-through text-[#6B7068]' : 'text-[#10110F]'
                        }`}>
                          {act.title}
                        </span>
                        <p className={`text-[11px] leading-relaxed font-light ${
                          isChecked ? 'line-through text-[#6B7068]/80' : 'text-[#6B7068]'
                        }`}>
                          {act.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommended Salon Ritual Card */}
            <div className="pt-2 border-t border-[#DCE1D8]">
              <div className="p-4 rounded-2xl bg-[#10110F] text-white space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8B5A0]">
                    COMPLEMENTARY SALON RITUAL
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    ${activeTheme.price} CAD
                  </span>
                </div>

                <div>
                  <h5 className="font-serif text-lg font-normal text-white">
                    {activeTheme.recommendedTreatmentName}
                  </h5>
                  <p className="text-xs text-white/70 font-light pt-0.5">
                    {activeTheme.focus} • {activeTheme.duration}
                  </p>
                </div>

                <Link
                  to={`/book-appointment?service=${activeTheme.recommendedTreatmentId}`}
                  className="w-full py-2.5 px-4 rounded-[4px] bg-[#263D2B] hover:bg-[#1C2E20] text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <span>Book This Ritual</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
