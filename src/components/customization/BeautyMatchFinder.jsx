import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Scissors,
  Droplets,
  Sparkles,
  Feather,
  Wand2,
  Crown,
  Sparkle,
  Clock,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  Eye,
  Sliders,
  Compass,
  Calendar,
  AlertCircle
} from 'lucide-react';
import {
  BEAUTY_MATCH_CATEGORIES,
  OCCASIONS,
  LOOK_OPTIONS_BY_CATEGORY,
  RESULT_OPTIONS_BY_CATEGORY,
  DURATION_OPTIONS,
  BUDGET_OPTIONS,
  QUIZ_QUESTIONS,
  findBeautyMatches
} from '../../data/beautyMatchFinderData';

// Map icon names to Lucide icons
const CATEGORY_ICON_COMPONENTS = {
  Scissors,
  Droplets,
  Sparkles,
  Wand2,
  Sparkle,
  Feather,
  Crown
};

export default function BeautyMatchFinder({ onCustomizeService }) {
  const quizSectionRef = useRef(null);
  const resultsSectionRef = useRef(null);

  // Quiz visibility state: user can toggle or click "Find My Beauty Match"
  const [isQuizActive, setIsQuizActive] = useState(false);

  // Multi-step question index (0 to 5 for 6 questions)
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Selected Answers State
  const [answers, setAnswers] = useState({
    categoryId: '',
    occasionId: '',
    lookId: '',
    resultId: '',
    timeId: '',
    budgetId: ''
  });

  // Validation warning when user attempts to proceed without selection
  const [stepError, setStepError] = useState('');

  // Recommendation engine state
  const [isCalculating, setIsCalculating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [recommendationResult, setRecommendationResult] = useState({
    matches: [],
    reasoning: ''
  });

  const totalSteps = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[currentStepIndex];

  // Dynamic Options for current question
  const currentOptions = useMemo(() => {
    if (!currentQuestion) return [];

    switch (currentQuestion.id) {
      case 'category':
        return BEAUTY_MATCH_CATEGORIES;
      case 'occasion':
        return OCCASIONS;
      case 'look':
        return LOOK_OPTIONS_BY_CATEGORY[answers.categoryId] || LOOK_OPTIONS_BY_CATEGORY.hair;
      case 'result':
        return RESULT_OPTIONS_BY_CATEGORY[answers.categoryId] || RESULT_OPTIONS_BY_CATEGORY.hair;
      case 'time':
        return DURATION_OPTIONS;
      case 'budget':
        return BUDGET_OPTIONS;
      default:
        return [];
    }
  }, [currentQuestion, answers.categoryId]);

  // Current selected value for the active question
  const currentFieldValue = currentQuestion ? answers[currentQuestion.field] : '';

  // Start Quiz trigger
  const handleStartQuiz = () => {
    setIsQuizActive(true);
    setStepError('');
    setTimeout(() => {
      if (quizSectionRef.current) {
        quizSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Option selection handler
  const handleSelectOption = (optionId) => {
    setStepError('');
    if (!currentQuestion) return;

    setAnswers(prev => {
      const updated = { ...prev, [currentQuestion.field]: optionId };
      // If user switches category in Question 1, reset dependent fields (look & result)
      if (currentQuestion.field === 'categoryId' && prev.categoryId !== optionId) {
        updated.lookId = '';
        updated.resultId = '';
      }
      return updated;
    });
  };

  // Handle Keyboard navigation for selectable cards
  const handleKeyDown = (e, optionId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelectOption(optionId);
    }
  };

  // Proceed to Next Question or Finalize
  const handleNextStep = () => {
    if (!currentFieldValue) {
      setStepError('Please select an option above to continue.');
      return;
    }
    setStepError('');

    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Final step: Calculate intelligent recommendations with simulated luxury curation
      setIsCalculating(true);
      setTimeout(() => {
        const results = findBeautyMatches(answers);
        setRecommendationResult(results);
        setIsCalculating(false);
        setIsCompleted(true);
        setTimeout(() => {
          if (resultsSectionRef.current) {
            resultsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      }, 450);
    }
  };

  // Step Back
  const handlePrevStep = () => {
    setStepError('');
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  // Reset entire quiz
  const handleResetQuiz = () => {
    setAnswers({
      categoryId: '',
      occasionId: '',
      lookId: '',
      resultId: '',
      timeId: '',
      budgetId: ''
    });
    setCurrentStepIndex(0);
    setStepError('');
    setIsCompleted(false);
    setRecommendationResult({ matches: [], reasoning: '' });
  };

  // Edit My Answers from results view
  const handleEditAnswers = () => {
    setIsCompleted(false);
    setCurrentStepIndex(0);
    setTimeout(() => {
      if (quizSectionRef.current) {
        quizSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Action: Customize This Service
  const handleCustomizeAction = (service) => {
    if (onCustomizeService) {
      onCustomizeService(service, answers);
    } else {
      // Fallback: smooth scroll to custom studio on the same page
      const studioElement = document.getElementById('custom-studio-workspace') || document.getElementById('customization-studio');
      if (studioElement) {
        studioElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Progress percentage
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  // Resolve active category meta for summary badge
  const activeCategoryMeta = BEAUTY_MATCH_CATEGORIES.find(c => c.id === answers.categoryId);

  return (
    <section 
      id="beauty-match-finder" 
      aria-label="The Beauty Match Finder"
      className="w-full bg-[#F7F4ED] border-b border-[#DCE1D8] text-[#10110F] relative overflow-hidden"
    >
      {/* Editorial Luxury Header Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 sm:pt-14 sm:pb-12">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#263D2B]/10 border border-[#263D2B]/20 text-[#263D2B] text-xs font-semibold tracking-wider uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Beauty Match Finder</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#10110F] tracking-tight leading-tight">
            The Beauty Match Finder
          </h2>

          <p className="text-lg sm:text-xl font-medium text-[#263D2B] italic">
            “Your beauty goals. Your perfect match.”
          </p>

          <p className="text-sm sm:text-base text-[#465640] max-w-2xl mx-auto leading-relaxed">
            Answer 6 intuitive questions to discover personalized salon treatments from our master catalog, matched to your specific event, aesthetic, time, and budget.
          </p>

          {/* Trigger Button if quiz not yet opened or user wants to restart */}
          {!isQuizActive && (
            <div className="pt-4">
              <button
                type="button"
                id="start-beauty-match-quiz"
                onClick={handleStartQuiz}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-[#F7F4ED] font-semibold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B] focus-visible:ring-offset-2"
              >
                <span>Find My Beauty Match</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* QUIZ WORKSPACE */}
      {isQuizActive && !isCompleted && (
        <div 
          ref={quizSectionRef} 
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-2"
        >
          <div className="bg-white rounded-3xl border border-[#DCE1D8] shadow-sm p-6 sm:p-10 transition-all duration-300">
            {/* Header: Progress, Step Counter, Reset */}
            <div className="space-y-4 pb-6 border-b border-[#EBEFE8]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#263D2B]">
                      Question {currentStepIndex + 1} of {totalSteps}
                    </span>
                    {activeCategoryMeta && currentStepIndex > 0 && (
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#F7F4ED] text-[#465640] font-medium border border-[#DCE1D8]">
                        Department: {activeCategoryMeta.label}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#10110F]">
                    {currentQuestion.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#465640]">
                    {currentQuestion.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleResetQuiz}
                  className="inline-flex items-center gap-1.5 text-xs text-[#6B7068] hover:text-[#263D2B] font-medium transition-colors p-1.5 rounded-lg hover:bg-[#F7F4ED]"
                  title="Reset quiz from question 1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Quiz</span>
                </button>
              </div>

              {/* Accessible Progress Bar */}
              <div className="w-full">
                <div 
                  className="w-full bg-[#EBEFE8] h-2 rounded-full overflow-hidden" 
                  role="progressbar" 
                  aria-valuenow={currentStepIndex + 1} 
                  aria-valuemin="1" 
                  aria-valuemax={totalSteps}
                  aria-label={`Quiz progress: question ${currentStepIndex + 1} of ${totalSteps}`}
                >
                  <div 
                    className="bg-[#263D2B] h-full transition-all duration-300 ease-out" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Error / Validation Banner */}
            {stepError && (
              <div className="mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-2.5 text-xs font-medium">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{stepError}</span>
              </div>
            )}

            {/* QUESTIONS OPTIONS CONTAINER */}
            <div 
              role="radiogroup" 
              aria-label={currentQuestion.title}
              className="mt-6"
            >
              {/* Question 1: Category Selection Grid */}
              {currentQuestion.id === 'category' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {currentOptions.map((cat) => {
                    const isSelected = answers.categoryId === cat.id;
                    const IconComp = CATEGORY_ICON_COMPONENTS[cat.iconName] || Sparkles;

                    return (
                      <div
                        key={cat.id}
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={0}
                        onClick={() => handleSelectOption(cat.id)}
                        onKeyDown={(e) => handleKeyDown(e, cat.id)}
                        className={`group relative p-5 rounded-2xl border text-left cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B] ${
                          isSelected
                            ? 'bg-[#263D2B]/5 border-[#263D2B] ring-1 ring-[#263D2B]'
                            : 'bg-[#F7F4ED]/50 border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className={`p-2.5 rounded-xl transition-colors ${
                            isSelected ? 'bg-[#263D2B] text-[#F7F4ED]' : 'bg-[#EBEFE8] text-[#263D2B] group-hover:bg-[#263D2B]/10'
                          }`}>
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected ? 'border-[#263D2B] bg-[#263D2B] text-white' : 'border-[#A8B5A0] bg-white'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>

                        <div className="mt-4 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm text-[#10110F]">
                              {cat.label}
                            </h4>
                            <span className="text-[11px] font-medium text-[#465640]">
                              {cat.serviceCount} services
                            </span>
                          </div>
                          <p className="text-xs text-[#6B7068] line-clamp-2">
                            {cat.subtitle}
                          </p>
                          <div className="pt-2 text-[11px] font-semibold text-[#263D2B]">
                            {cat.priceRange}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Question 2: Occasion Selection */}
              {currentQuestion.id === 'occasion' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {currentOptions.map((occ) => {
                    const isSelected = answers.occasionId === occ.id;

                    return (
                      <div
                        key={occ.id}
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={0}
                        onClick={() => handleSelectOption(occ.id)}
                        onKeyDown={(e) => handleKeyDown(e, occ.id)}
                        className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B] flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-[#263D2B]/5 border-[#263D2B] ring-1 ring-[#263D2B]'
                            : 'bg-[#F7F4ED]/50 border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border mt-0.5 shrink-0 flex items-center justify-center transition-colors ${
                          isSelected ? 'border-[#263D2B] bg-[#263D2B] text-white' : 'border-[#A8B5A0] bg-white'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="font-semibold text-sm text-[#10110F]">
                            {occ.label}
                          </h4>
                          <p className="text-xs text-[#6B7068]">
                            {occ.subtitle}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Question 3: Desired Look (Dynamic) */}
              {currentQuestion.id === 'look' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {currentOptions.map((look) => {
                    const isSelected = answers.lookId === look.id;

                    return (
                      <div
                        key={look.id}
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={0}
                        onClick={() => handleSelectOption(look.id)}
                        onKeyDown={(e) => handleKeyDown(e, look.id)}
                        className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B] flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-[#263D2B]/5 border-[#263D2B] ring-1 ring-[#263D2B]'
                            : 'bg-[#F7F4ED]/50 border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border mt-0.5 shrink-0 flex items-center justify-center transition-colors ${
                          isSelected ? 'border-[#263D2B] bg-[#263D2B] text-white' : 'border-[#A8B5A0] bg-white'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="font-semibold text-sm text-[#10110F]">
                            {look.label}
                          </h4>
                          <p className="text-xs text-[#6B7068]">
                            {look.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Question 4: Preferred Result (Dynamic) */}
              {currentQuestion.id === 'result' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {currentOptions.map((res) => {
                    const isSelected = answers.resultId === res.id;

                    return (
                      <div
                        key={res.id}
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={0}
                        onClick={() => handleSelectOption(res.id)}
                        onKeyDown={(e) => handleKeyDown(e, res.id)}
                        className={`p-4.5 rounded-2xl border text-left cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B] flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-[#263D2B]/5 border-[#263D2B] ring-1 ring-[#263D2B]'
                            : 'bg-[#F7F4ED]/50 border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                        }`}
                      >
                        <span className="font-semibold text-sm text-[#10110F]">
                          {res.label}
                        </span>
                        <div className={`w-5 h-5 rounded-full border shrink-0 flex items-center justify-center transition-colors ${
                          isSelected ? 'border-[#263D2B] bg-[#263D2B] text-white' : 'border-[#A8B5A0] bg-white'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Question 5: Duration Preferences */}
              {currentQuestion.id === 'time' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {currentOptions.map((time) => {
                    const isSelected = answers.timeId === time.id;

                    return (
                      <div
                        key={time.id}
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={0}
                        onClick={() => handleSelectOption(time.id)}
                        onKeyDown={(e) => handleKeyDown(e, time.id)}
                        className={`p-4.5 rounded-2xl border text-left cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B] flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-[#263D2B]/5 border-[#263D2B] ring-1 ring-[#263D2B]'
                            : 'bg-[#F7F4ED]/50 border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border mt-0.5 shrink-0 flex items-center justify-center transition-colors ${
                          isSelected ? 'border-[#263D2B] bg-[#263D2B] text-white' : 'border-[#A8B5A0] bg-white'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                            <h4 className="font-semibold text-sm text-[#10110F]">
                              {time.label}
                            </h4>
                          </div>
                          <p className="text-xs text-[#6B7068]">
                            {time.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Question 6: CAD Budget Ranges */}
              {currentQuestion.id === 'budget' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {currentOptions.map((budget) => {
                    const isSelected = answers.budgetId === budget.id;

                    return (
                      <div
                        key={budget.id}
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={0}
                        onClick={() => handleSelectOption(budget.id)}
                        onKeyDown={(e) => handleKeyDown(e, budget.id)}
                        className={`p-4.5 rounded-2xl border text-left cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B] flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-[#263D2B]/5 border-[#263D2B] ring-1 ring-[#263D2B]'
                            : 'bg-[#F7F4ED]/50 border-[#DCE1D8] hover:border-[#A8B5A0] hover:bg-white'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border mt-0.5 shrink-0 flex items-center justify-center transition-colors ${
                          isSelected ? 'border-[#263D2B] bg-[#263D2B] text-white' : 'border-[#A8B5A0] bg-white'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-semibold text-sm text-[#10110F]">
                            {budget.label}
                          </h4>
                          <p className="text-xs text-[#6B7068]">
                            {budget.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* QUIZ CONTROLS: BACK / NEXT */}
            <div className="mt-8 pt-6 border-t border-[#EBEFE8] flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStepIndex === 0}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  currentStepIndex === 0
                    ? 'opacity-40 cursor-not-allowed text-[#6B7068]'
                    : 'text-[#263D2B] hover:bg-[#F7F4ED] border border-[#DCE1D8]'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="button"
                id="beauty-match-next-button"
                onClick={handleNextStep}
                disabled={isCalculating}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-[#F7F4ED] text-xs font-semibold tracking-wider uppercase shadow-sm hover:shadow transition-all transform active:scale-98 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B]"
              >
                {isCalculating ? (
                  <span>Curating Matches...</span>
                ) : currentStepIndex === totalSteps - 1 ? (
                  <>
                    <span>Reveal My Matches</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESULTS SECTION: YOUR BEAUTY MATCHES */}
      {isCompleted && (
        <div 
          ref={resultsSectionRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-2"
        >
          <div className="bg-white rounded-3xl border border-[#DCE1D8] shadow-sm p-6 sm:p-10 space-y-8">
            {/* Results Title Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EBEFE8]">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#263D2B]/10 text-[#263D2B] text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Curated Atelier Matches</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#10110F]">
                  Your Beauty Matches
                </h3>
                <p className="text-xs sm:text-sm text-[#465640]">
                  {recommendationResult.reasoning}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleEditAnswers}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#263D2B] text-[#263D2B] hover:bg-[#263D2B]/5 text-xs font-semibold tracking-wide transition-all"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Edit My Answers</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetQuiz}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs text-[#6B7068] hover:text-[#263D2B] hover:bg-[#F7F4ED] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>
            </div>

            {/* EMPTY STATE */}
            {recommendationResult.matches.length === 0 ? (
              <div className="p-8 sm:p-12 text-center rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] max-w-2xl mx-auto space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#263D2B]/10 text-[#263D2B] mx-auto flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl text-[#10110F]">
                  No Direct Service Match Found
                </h4>
                <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed">
                  {recommendationResult.reasoning || 'No services in our catalog matched this specific combination of duration and budget.'}
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleEditAnswers}
                    className="px-6 py-2.5 rounded-xl bg-[#263D2B] text-[#F7F4ED] text-xs font-semibold tracking-wide hover:bg-[#1E3022] transition-colors"
                  >
                    Adjust My Preferences
                  </button>
                  <Link
                    to="/services"
                    className="px-6 py-2.5 rounded-xl border border-[#263D2B] text-[#263D2B] text-xs font-semibold tracking-wide hover:bg-[#263D2B]/5 transition-colors inline-flex items-center gap-1"
                  >
                    <span>Browse All Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              /* MATCH CARDS GRID: UP TO 3 SERVICES */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {recommendationResult.matches.map((match, idx) => (
                  <div
                    key={match.id}
                    className="group flex flex-col rounded-2xl border border-[#DCE1D8] bg-[#F7F4ED]/40 overflow-hidden hover:border-[#263D2B] hover:shadow-md transition-all duration-300"
                  >
                    {/* Real Service Image & Match Badge */}
                    <div className="relative aspect-4/3 w-full bg-[#EBEFE8] overflow-hidden">
                      <img
                        src={match.image}
                        alt={match.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/facial/special-glam-girl-facial.jpg';
                        }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-[#10110F]/85 backdrop-blur-xs text-[#F7F4ED] text-[11px] font-semibold tracking-wider uppercase">
                          {match.categoryName}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#263D2B] text-[#F7F4ED] text-[11px] font-bold shadow-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>{idx === 0 ? 'Best Match' : `${match.matchScore}% Match`}</span>
                        </span>
                      </div>
                    </div>

                    {/* Service Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className="font-serif text-lg font-bold text-[#10110F] group-hover:text-[#263D2B] transition-colors leading-snug">
                            {match.name}
                          </h4>
                          <span className="text-base font-bold text-[#263D2B] whitespace-nowrap">
                            {match.priceDisplay}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-[#465640]">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                            <span>{match.durationDisplay}</span>
                          </span>
                          <span>•</span>
                          <span className="capitalize">{answers.occasionId || 'Any occasion'}</span>
                        </div>

                        {match.description && (
                          <p className="text-xs text-[#6B7068] line-clamp-2 leading-relaxed">
                            {match.description}
                          </p>
                        )}

                        {/* Match Explanation Box */}
                        <div className="p-3 rounded-xl bg-white border border-[#DCE1D8] text-xs text-[#263D2B] space-y-1">
                          <span className="font-semibold text-[11px] uppercase tracking-wider block text-[#465640]">
                            Why this matches:
                          </span>
                          <p className="leading-relaxed italic text-[#10110F]">
                            “{match.whyItMatches}”
                          </p>
                        </div>
                      </div>

                      {/* 3 Explicit Action Buttons */}
                      <div className="pt-2 border-t border-[#DCE1D8] space-y-2">
                        {/* 1. Customize This Service */}
                        <button
                          type="button"
                          onClick={() => handleCustomizeAction(match)}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-[#F7F4ED] text-xs font-semibold tracking-wider uppercase transition-all shadow-xs"
                        >
                          <Sliders className="w-3.5 h-3.5" />
                          <span>Customize This Service</span>
                        </button>

                        {/* 2. View Service Details */}
                        <Link
                          to={`/service/${match.slug || match.id}`}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-[#DCE1D8] hover:border-[#263D2B] bg-white text-xs font-semibold text-[#10110F] hover:text-[#263D2B] transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Full Treatment Details</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
