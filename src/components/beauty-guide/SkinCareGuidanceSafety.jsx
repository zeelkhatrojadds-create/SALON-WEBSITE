import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Droplets,
  Sun,
  Layers,
  ShieldAlert,
  ShieldCheck,
  Check,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Info,
  Feather,
  Palette,
  Eye
} from 'lucide-react';
import {
  SKIN_TYPES,
  DAILY_ROUTINE,
  PRE_TREATMENT_CHECKLIST,
  AFTERCARE_GUIDES,
  INGREDIENT_GUIDE,
  PATCH_TEST_GUIDELINES,
  SAFETY_CHECKER_QUESTIONS,
  SKIN_CARE_FAQS
} from '../../data/skinCareGuidanceData';

const SKIN_TYPE_ICONS = {
  normal: Sparkles,
  dry: Droplets,
  oily: Sun,
  combination: Layers,
  sensitive: ShieldAlert
};

const AFTERCARE_ICONS = {
  facial: Sparkles,
  waxing: ShieldCheck,
  threading: Feather,
  mehndi: Palette,
  makeup: Eye
};

export default function SkinCareGuidanceSafety() {
  // 1. Skin Type Guide State
  const [selectedSkinTypeId, setSelectedSkinTypeId] = useState('normal');

  // 2. Aftercare Expanded Accordions (support multi-expand)
  const [expandedAftercare, setExpandedAftercare] = useState({
    facial: true,
    waxing: false,
    threading: false,
    mehndi: false,
    makeup: false
  });

  const toggleAftercare = (id) => {
    setExpandedAftercare((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // 3. Safety Checker Interactive State
  const [checkedSafetyItems, setCheckedSafetyItems] = useState({});

  const toggleSafetyItem = (id) => {
    setCheckedSafetyItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const resetSafetyChecker = () => {
    setCheckedSafetyItems({});
  };

  const totalQuestions = SAFETY_CHECKER_QUESTIONS.length;
  const completedCount = useMemo(() => {
    return SAFETY_CHECKER_QUESTIONS.filter((q) => checkedSafetyItems[q.id]).length;
  }, [checkedSafetyItems]);

  const isAllChecked = completedCount === totalQuestions;
  const progressPercent = Math.round((completedCount / totalQuestions) * 100);

  // 4. FAQ Accordion State
  const [openFaqId, setOpenFaqId] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  // Get active skin type object
  const activeSkinType = useMemo(() => {
    return SKIN_TYPES.find((st) => st.id === selectedSkinTypeId) || SKIN_TYPES[0];
  }, [selectedSkinTypeId]);

  return (
    <section
      id="skincare-guidance-safety"
      aria-label="Skin Care Guidance & Safety"
      className="mt-16 sm:mt-24 pt-8 text-[#10110F] font-sans"
    >
      {/* ===================================================================== */}
      {/* 1. SECTION HEADER                                                     */}
      {/* ===================================================================== */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[#263D2B] text-[10.5px] font-bold uppercase tracking-[0.22em] shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B]" />
          <span>CLIENT EDUCATION &amp; CARE STANDARDS</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-tight">
          Skin Care Guidance &amp; Safety
        </h2>

        <p className="text-base sm:text-lg font-serif italic text-[#465640]">
          Healthy Skin. Informed Choices. Beautiful Results.
        </p>

        <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed max-w-2xl mx-auto font-light">
          Help customers understand how to care for their skin before and after beauty treatments, recognize possible irritation, and make informed choices about skincare products.
        </p>

        {/* Quick Nav Anchors */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
          {[
            { label: 'Skin Types', href: '#skin-types' },
            { label: 'Daily Routines', href: '#daily-routines' },
            { label: 'Before Treatment', href: '#pre-treatment' },
            { label: 'Aftercare', href: '#aftercare-guidance' },
            { label: 'Ingredients', href: '#ingredient-safety' },
            { label: 'Patch Testing', href: '#patch-testing' },
            { label: 'Safety Checker', href: '#safety-checker' },
            { label: 'FAQs', href: '#skincare-faqs' }
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 rounded-full bg-white border border-[#DCE1D8] hover:border-[#263D2B] text-[#10110F] hover:text-[#263D2B] text-[11px] font-medium transition-all shadow-2xs"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <div className="space-y-16 sm:space-y-24">
        {/* ===================================================================== */}
        {/* 2. SKIN TYPE GUIDE                                                    */}
        {/* ===================================================================== */}
        <div id="skin-types" className="scroll-mt-28">
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#DCE1D8] shadow-xs">
            <div className="max-w-2xl mb-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block mb-1">
                STEP 01 • UNDERSTAND YOUR CANVAS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#10110F]">
                The Five Common Skin Types
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7068] mt-1.5 font-light leading-relaxed">
                Click on any skin type to discover tailored cleansing, hydration, and treatment preparation guidelines.
              </p>
            </div>

            {/* Skin Type Interactive Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
              {SKIN_TYPES.map((st) => {
                const isSelected = selectedSkinTypeId === st.id;
                const TypeIcon = SKIN_TYPE_ICONS[st.id] || Sparkles;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setSelectedSkinTypeId(st.id)}
                    className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between h-full min-h-[110px] ${
                      isSelected
                        ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-sm scale-[1.02]'
                        : 'bg-[#F7F4ED] text-[#10110F] border-[#DCE1D8] hover:border-[#263D2B]/50 hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-white text-[#263D2B] border border-[#DCE1D8]'
                          }`}
                        >
                          {st.badge}
                        </span>
                        <TypeIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#263D2B]'}`} />
                      </div>
                      <h4 className="font-serif text-base font-semibold">{st.name}</h4>
                    </div>
                    <span
                      className={`text-[10.5px] line-clamp-1 mt-2 ${
                        isSelected ? 'text-white/80' : 'text-[#6B7068]'
                      }`}
                    >
                      {st.summary}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Deep-Dive Card for Selected Skin Type */}
            <div className="p-5 sm:p-7 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-5 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DCE1D8] pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#263D2B] uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Selected Skin Profile</span>
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl text-[#10110F]">
                    {activeSkinType.name}
                  </h4>
                  <p className="text-xs text-[#465640] font-serif italic mt-0.5">
                    {activeSkinType.tagline}
                  </p>
                </div>
                <div className="px-3.5 py-2 rounded-xl bg-white border border-[#DCE1D8] text-xs text-[#10110F] font-medium max-w-sm">
                  <strong>Key Approach:</strong> {activeSkinType.summary}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#10110F] leading-relaxed">
                {activeSkinType.description}
              </p>

              {/* Core Needs & Salon Prep Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-[#DCE1D8] space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                    Recommended Care Fundamentals:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#10110F]">
                    {activeSkinType.coreNeeds.map((need, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#263D2B] shrink-0 mt-0.5" />
                        <span>{need}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DCE1D8] space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#465640] block">
                    Salon Treatment Consideration:
                  </span>
                  <p className="text-xs text-[#10110F] leading-relaxed">
                    {activeSkinType.treatmentPrepTip}
                  </p>
                  <div className="pt-2 border-t border-[#DCE1D8] flex items-center gap-1.5 text-[10.5px] text-[#6B7068]">
                    <Info className="w-3.5 h-3.5 text-[#263D2B] shrink-0" />
                    <span>Always share your skin history with your beauty artist before treatment.</span>
                  </div>
                </div>
              </div>

              {/* Medical Disclaimer Banner */}
              <div className="p-3.5 rounded-xl bg-white/70 border border-[#DCE1D8] text-[11px] text-[#6B7068] flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-[#465640] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-[#10110F]">Educational Disclaimer:</strong> Skin type descriptions, recommendations, and guidelines provided here are for general educational purposes only and do not constitute a medical diagnosis, dermatological prescription, or clinical consultation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 3. DAILY SKIN CARE ROUTINE TIMELINE                                   */}
        {/* ===================================================================== */}
        <div id="daily-routines" className="scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block mb-1">
              STEP 02 • TIME-TESTED ESSENTIALS
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#10110F]">
              Daily Skincare Routine
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7068] mt-1.5 font-light">
              A balanced morning and evening ritual built on non-stripping cleansing, hydration, and daily broad-spectrum sun defense.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* Morning Routine Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-xs flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#DCE1D8] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F7F4ED] text-[#263D2B] border border-[#DCE1D8] flex items-center justify-center shrink-0">
                      <Sun className="w-5 h-5 text-[#263D2B]" />
                    </div>
                    <div>
                      <h4 className="font-serif text-xl font-normal text-[#10110F]">
                        {DAILY_ROUTINE.morning.title}
                      </h4>
                      <p className="text-[11px] text-[#6B7068]">
                        {DAILY_ROUTINE.morning.subtitle}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#F7F4ED] text-[#263D2B] border border-[#DCE1D8]">
                    3 Steps
                  </span>
                </div>

                {/* Morning Steps Timeline */}
                <div className="space-y-4">
                  {DAILY_ROUTINE.morning.steps.map((st) => (
                    <div key={st.step} className="flex items-start gap-3.5 group">
                      <div className="w-7 h-7 rounded-full bg-[#263D2B] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-xs">
                        {st.step}
                      </div>
                      <div className="flex-1 space-y-1">
                        <h5 className="font-serif font-semibold text-sm text-[#10110F]">
                          {st.title}
                        </h5>
                        <p className="text-xs text-[#6B7068] leading-relaxed">
                          {st.desc}
                        </p>
                        <div className="text-[10.5px] text-[#465640] italic pt-0.5 flex items-center gap-1">
                          <span>💡 Tip:</span>
                          <span>{st.tip}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#DCE1D8] text-[11px] text-[#263D2B] font-medium flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#263D2B] shrink-0" />
                <span>Broad-spectrum SPF 30+ is essential every morning, rain or shine.</span>
              </div>
            </div>

            {/* Evening Routine Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-xs flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#DCE1D8] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F7F4ED] text-[#263D2B] border border-[#DCE1D8] flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5 text-[#263D2B]" />
                    </div>
                    <div>
                      <h4 className="font-serif text-xl font-normal text-[#10110F]">
                        {DAILY_ROUTINE.evening.title}
                      </h4>
                      <p className="text-[11px] text-[#6B7068]">
                        {DAILY_ROUTINE.evening.subtitle}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#F7F4ED] text-[#263D2B] border border-[#DCE1D8]">
                    4 Steps
                  </span>
                </div>

                {/* Evening Steps Timeline */}
                <div className="space-y-4">
                  {DAILY_ROUTINE.evening.steps.map((st) => (
                    <div key={st.step} className="flex items-start gap-3.5 group">
                      <div className="w-7 h-7 rounded-full bg-[#465640] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-xs">
                        {st.step}
                      </div>
                      <div className="flex-1 space-y-1">
                        <h5 className="font-serif font-semibold text-sm text-[#10110F]">
                          {st.title}
                        </h5>
                        <p className="text-xs text-[#6B7068] leading-relaxed">
                          {st.desc}
                        </p>
                        <div className="text-[10.5px] text-[#465640] italic pt-0.5 flex items-center gap-1">
                          <span>💡 Tip:</span>
                          <span>{st.tip}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#DCE1D8] text-[11px] text-[#465640] font-medium flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#465640] shrink-0" />
                <span>Nourish without scrubbing to allow the stratum corneum to regenerate.</span>
              </div>
            </div>
          </div>

          {/* Golden Rule for Beginners Callout */}
          <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-white border border-[#DCE1D8] shadow-xs flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldAlert className="w-4 h-4 text-[#263D2B]" />
            </div>
            <div>
              <h5 className="font-serif font-semibold text-xs sm:text-sm text-[#10110F]">
                {DAILY_ROUTINE.beginnerRule.headline}
              </h5>
              <p className="text-xs text-[#6B7068] leading-relaxed mt-0.5 font-light">
                {DAILY_ROUTINE.beginnerRule.text}
              </p>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 4. BEFORE A BEAUTY TREATMENT SAFETY CHECKLIST                         */}
        {/* ===================================================================== */}
        <div id="pre-treatment" className="scroll-mt-28">
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#DCE1D8] shadow-xs">
            <div className="max-w-2xl mb-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block mb-1">
                STEP 03 • PROACTIVE COMMUNICATION
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#10110F]">
                Before a Beauty Treatment
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7068] mt-1.5 font-light">
                Essential safety protocols before facials, waxing, threading, makeup, or mehndi application.
              </p>
            </div>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {PRE_TREATMENT_CHECKLIST.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#263D2B] px-2 py-0.5 rounded-full bg-white border border-[#DCE1D8]">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-[#6B7068]">
                        0{idx + 1}
                      </span>
                    </div>
                    <h4 className="font-serif font-semibold text-sm text-[#10110F] leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#6B7068] leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#DCE1D8]/60 flex items-center gap-1.5 text-[10.5px] text-[#263D2B] font-medium">
                    <Check className="w-3 h-3 text-[#263D2B]" />
                    <span>Client Safety Protocol</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Crucial Reminder Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#263D2B]/5 border border-[#263D2B]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-[#263D2B] shrink-0" />
                <span className="text-[#10110F]">
                  <strong>Important Notice:</strong> Preparation requirements differ between treatments. Waxing requires specific hair length, facials require pausing potent actives, and mehndi requires completely dry, oil-free skin.
                </span>
              </div>
              <span className="text-[10.5px] text-[#465640] uppercase tracking-wider font-bold shrink-0">
                Tailored Pre-Care
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 5. AFTERCARE GUIDANCE (EXPANDABLE ACCORDIONS)                          */}
        {/* ===================================================================== */}
        <div id="aftercare-guidance" className="scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block mb-1">
              STEP 04 • POST-SERVICE PROTECTION
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#10110F]">
              Aftercare Guidance
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7068] mt-1.5 font-light">
              Select any treatment to review specialized recovery, hygiene, and soothing best practices.
            </p>
          </div>

          <div className="space-y-4">
            {AFTERCARE_GUIDES.map((guide) => {
              const isExpanded = Boolean(expandedAftercare[guide.id]);
              const GuideIcon = AFTERCARE_ICONS[guide.id] || Sparkles;

              return (
                <div
                  key={guide.id}
                  className="bg-white rounded-3xl border border-[#DCE1D8] shadow-xs overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleAftercare(guide.id)}
                    aria-expanded={isExpanded}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F7F4ED]/50 transition-colors"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-2xl bg-[#F7F4ED] text-[#263D2B] border border-[#DCE1D8] flex items-center justify-center shrink-0">
                        <GuideIcon className="w-5 h-5 text-[#263D2B]" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-serif text-lg sm:text-xl font-normal text-[#10110F] truncate">
                          {guide.treatment}
                        </h4>
                        <span className="text-xs text-[#6B7068] block truncate font-light">
                          {guide.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] text-[#263D2B] font-bold hidden sm:inline">
                        {isExpanded ? 'Collapse' : 'Expand Guidelines'}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-center text-[#10110F]">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-[#263D2B]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#6B7068]" />
                        )}
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-2 border-t border-[#DCE1D8] bg-[#F7F4ED]/40 animate-fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
                        {guide.guidance.map((rule, rIdx) => (
                          <div
                            key={rIdx}
                            className="p-3.5 rounded-xl bg-white border border-[#DCE1D8] flex items-start gap-3"
                          >
                            <div className="w-5 h-5 rounded-full bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-[#263D2B]" />
                            </div>
                            <span className="text-xs text-[#10110F] leading-relaxed">
                              {rule}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 6. INGREDIENT SAFETY GUIDE TABLE                                      */}
        {/* ===================================================================== */}
        <div id="ingredient-safety" className="scroll-mt-28">
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#DCE1D8] shadow-xs space-y-6">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block mb-1">
                STEP 05 • INGREDIENT LITERACY
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#10110F]">
                Ingredient Safety Guide
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7068] mt-1.5 font-light">
                Common skincare and salon product components, typical reactions, and responsible usage principles.
              </p>
            </div>

            {/* Responsive Table Container */}
            <div className="overflow-x-auto rounded-2xl border border-[#DCE1D8]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F7F4ED] border-b border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-wider text-[#263D2B]">
                    <th className="p-3.5 sm:p-4 font-bold">Ingredient or Product Type</th>
                    <th className="p-3.5 sm:p-4 font-bold">Category</th>
                    <th className="p-3.5 sm:p-4 font-bold">Safety &amp; Application Guidance</th>
                    <th className="p-3.5 sm:p-4 font-bold">Advisory Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE1D8]">
                  {INGREDIENT_GUIDE.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#F7F4ED]/40 transition-colors font-sans"
                    >
                      <td className="p-3.5 sm:p-4 font-semibold text-[#10110F] whitespace-nowrap sm:whitespace-normal">
                        {row.ingredient}
                      </td>
                      <td className="p-3.5 sm:p-4 text-[#6B7068]">
                        <span className="px-2 py-0.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[10px] font-medium">
                          {row.category}
                        </span>
                      </td>
                      <td className="p-3.5 sm:p-4 text-[#10110F] leading-relaxed max-w-md">
                        {row.guidance}
                      </td>
                      <td className="p-3.5 sm:p-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-[#263D2B]/10 text-[#263D2B] border border-[#263D2B]/20">
                          <CheckCircle2 className="w-3 h-3 text-[#263D2B]" />
                          <span>{row.level}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Individual Variation Explanation */}
            <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs text-[#6B7068] leading-relaxed flex items-start gap-3">
              <Info className="w-4 h-4 text-[#263D2B] shrink-0 mt-0.5" />
              <p>
                <strong className="text-[#10110F]">Individual Formulation Note:</strong> Skincare ingredients affect different skin barriers in unique ways. A product’s overall safety and suitability depends not just on an isolated ingredient, but on its concentration, vehicle formulation, skin barrier state, and individual health circumstances.
              </p>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 7. PATCH TEST & ALLERGY AWARENESS (KNOW BEFORE YOU APPLY)             */}
        {/* ===================================================================== */}
        <div id="patch-testing" className="scroll-mt-28">
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#DCE1D8] shadow-xs space-y-8">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block mb-1">
                STEP 06 • PRECAUTIONARY TESTING
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#10110F]">
                {PATCH_TEST_GUIDELINES.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#465640] font-serif italic mt-0.5">
                {PATCH_TEST_GUIDELINES.subtitle}
              </p>
            </div>

            {/* Principles Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PATCH_TEST_GUIDELINES.principles.map((pr, pIdx) => (
                <div
                  key={pIdx}
                  className="p-4 sm:p-5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#263D2B]">
                      GUIDELINE 0{pIdx + 1}
                    </span>
                    <h4 className="font-serif font-semibold text-sm text-[#10110F]">
                      {pr.title}
                    </h4>
                    <p className="text-xs text-[#6B7068] leading-relaxed font-light">
                      {pr.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CRITICAL EMERGENCY WARNING PANEL */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#8B2626]/10 border-2 border-[#8B2626] text-[#8B2626] space-y-2">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-[#8B2626] shrink-0" />
                <h4 className="font-serif font-bold text-sm sm:text-base uppercase tracking-wider text-[#8B2626]">
                  {PATCH_TEST_GUIDELINES.emergencyWarning.title}
                </h4>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-[#5E1818] font-medium pl-7">
                {PATCH_TEST_GUIDELINES.emergencyWarning.text}
              </p>
            </div>

            {/* Medical Scope Disclaimer */}
            <div className="p-3.5 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-[11px] text-[#6B7068] text-center font-light">
              {PATCH_TEST_GUIDELINES.disclaimer}
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 8. SKIN CARE SAFETY CHECKER (INTERACTIVE COMPONENT)                   */}
        {/* ===================================================================== */}
        <div id="safety-checker" className="scroll-mt-28">
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#DCE1D8] shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DCE1D8] pb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block mb-1">
                  STEP 07 • INTERACTIVE PRE-FLIGHT CHECK
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#10110F]">
                  Skin Care Safety Checker
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7068] mt-1 font-light">
                  Review these five safety check items before receiving or applying cosmetic rituals.
                </p>
              </div>

              {/* Progress Summary Pill & Reset */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span className="text-xs font-bold text-[#10110F] block">
                    {completedCount} of {totalQuestions} Completed
                  </span>
                  <span className="text-[10.5px] text-[#6B7068] block">
                    {progressPercent}% Complete
                  </span>
                </div>

                <button
                  type="button"
                  onClick={resetSafetyChecker}
                  className="px-3 py-2 rounded-xl border border-[#DCE1D8] hover:border-[#263D2B] bg-[#F7F4ED] hover:bg-white text-xs font-semibold text-[#10110F] transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Reset all checkboxes"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#263D2B]" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full h-2.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] overflow-hidden">
              <div
                className="h-full bg-[#263D2B] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Checklist Items */}
            <div className="space-y-3 pt-2">
              {SAFETY_CHECKER_QUESTIONS.map((q) => {
                const checked = Boolean(checkedSafetyItems[q.id]);

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => toggleSafetyItem(q.id)}
                    className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-start gap-3.5 ${
                      checked
                        ? 'bg-[#263D2B]/5 border-[#263D2B] shadow-2xs'
                        : 'bg-[#F7F4ED] border-[#DCE1D8] hover:border-[#263D2B]/40 hover:bg-white'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {checked ? (
                        <div className="w-5 h-5 rounded-md bg-[#263D2B] text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-md border-2 border-[#DCE1D8] bg-white" />
                      )}
                    </div>

                    <div className="flex-1 space-y-0.5">
                      <span className={`text-xs sm:text-sm font-semibold block ${checked ? 'text-[#263D2B]' : 'text-[#10110F]'}`}>
                        {q.label}
                      </span>
                      <p className="text-[11.5px] text-[#6B7068] font-light leading-relaxed">
                        {q.detail}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Status Message Display */}
            <div
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-center gap-3 text-xs sm:text-sm font-medium ${
                isAllChecked
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                  : 'bg-amber-50 text-amber-900 border-amber-300'
              }`}
            >
              {isAllChecked ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-800 shrink-0" />
              )}
              <span>
                {isAllChecked
                  ? 'Checklist completed. This does not guarantee that a treatment or product is risk-free.'
                  : 'Please review the remaining safety steps.'}
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 9. FREQUENTLY ASKED QUESTIONS (ACCORDION)                             */}
        {/* ===================================================================== */}
        <div id="skincare-faqs" className="scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block mb-1">
              STEP 08 • EXPERT CLARITY
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#10110F]">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7068] mt-1.5 font-light">
              Clear, non-diagnostic answers to common client questions regarding skin care, treatments, and safety.
            </p>
          </div>

          <div className="space-y-3">
            {SKIN_CARE_FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;

              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-[#DCE1D8] shadow-xs overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F7F4ED]/50 transition-colors"
                  >
                    <span className="font-serif text-sm sm:text-base font-normal text-[#10110F] pr-2">
                      {faq.question}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-center text-[#10110F] shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-3.5 h-3.5 text-[#263D2B]" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-[#6B7068]" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 text-xs text-[#6B7068] leading-relaxed border-t border-[#DCE1D8] bg-[#F7F4ED]/30 animate-fade-in font-light">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
