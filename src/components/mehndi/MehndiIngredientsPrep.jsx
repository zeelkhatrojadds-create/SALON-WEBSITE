// GLAM GIRL BY JANKI — What Is Mehndi Made Of? — Henna Ingredients & Preparation
// Comprehensive educational section detailing Lawsonia inermis botanical origin,
// 6 ingredient visual cards, 7-step natural preparation pipeline, safety comparison table,
// Natural vs Black Henna contrast matrix, interactive ingredient explorer, and safety checklist.
// Color palette: #10110F (Deep Black), #263D2B (Forest Green), #465640 (Olive Green), #A8B5A0 (Sage), #F7F4ED (Warm Cream).

import React, { useState, useMemo } from 'react';
import {
  Leaf,
  Droplets,
  Sparkles,
  Layers,
  AlertTriangle,
  HelpCircle,
  Clock,
  Compass,
  Flower2,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Check,
  Info,
  ChevronRight,
  ExternalLink,
  SlidersHorizontal,
  X
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import {
  HENNA_BOTANICAL_INFO,
  MEHNDI_CORE_INGREDIENTS,
  NATURAL_HENNA_PREPARATION_STEPS,
  COMMON_HENNA_INGREDIENTS,
  HENNA_COMPARISON,
  SAFE_PREPARATION_TIPS
} from '../../data/mehndiIngredientsData';

export default function MehndiIngredientsPrep() {
  // State for 7-step visual preparation process
  const [activePrepStep, setActivePrepStep] = useState(0);

  // State for Interactive Ingredient Explorer
  const [explorerFilter, setExplorerFilter] = useState('all');
  const [selectedIngredientId, setSelectedIngredientId] = useState(COMMON_HENNA_INGREDIENTS[0].id);

  // Filtered ingredients for explorer
  const filteredIngredients = useMemo(() => {
    if (explorerFilter === 'all') return COMMON_HENNA_INGREDIENTS;
    return COMMON_HENNA_INGREDIENTS.filter((item) => item.categoryKey === explorerFilter);
  }, [explorerFilter]);

  // Selected ingredient object for detail pane
  const activeIngredient = useMemo(() => {
    return (
      COMMON_HENNA_INGREDIENTS.find((item) => item.id === selectedIngredientId) ||
      COMMON_HENNA_INGREDIENTS[0]
    );
  }, [selectedIngredientId]);

  return (
    <section
      id="henna-ingredients-prep"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]"
      aria-label="What Is Mehndi Made Of? — Henna Ingredients & Preparation"
    >
      {/* ===================================================================== */}
      {/* 1. SECTION HEADER                                                     */}
      {/* ===================================================================== */}
      <ScrollReveal className="space-y-4 text-center max-w-3xl mx-auto mb-14 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] shadow-2xs">
          <Leaf className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            BOTANICAL ORIGIN • LAWSONIA INERMIS
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          What Is Mehndi Made Of? — Henna Ingredients &amp; Preparation
        </h2>

        <p className="font-serif text-lg sm:text-xl text-[#465640] italic font-light max-w-2xl mx-auto">
          Understanding Pure Botanical Henna, Traditional Preparation, and Skin Safety
        </p>

        <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

        <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs sm:text-sm text-[#465640] leading-relaxed max-w-3xl mx-auto text-left shadow-2xs">
          <p className="font-normal text-[#10110F] mb-1.5">
            <strong>Natural Henna Plant Origin:</strong> {HENNA_BOTANICAL_INFO.overview}
          </p>
          <p className="text-xs text-[#6B7068] font-light leading-relaxed">
            {HENNA_BOTANICAL_INFO.botanicalFact}
          </p>
        </div>
      </ScrollReveal>

      {/* ===================================================================== */}
      {/* 2. WHAT IS MEHNDI MADE FROM? (6 INDIVIDUAL VISUAL CARDS)              */}
      {/* ===================================================================== */}
      <div className="mb-16 sm:mb-24">
        <div className="space-y-3 text-center sm:text-left mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#263D2B]">
            <Layers className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>INGREDIENT DISCOVERY</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
            What Is Mehndi Made From?
          </h3>
          <p className="text-xs sm:text-sm text-[#6B7068] max-w-3xl font-light">
            Traditional recipes rely on simple, time-honoured natural botanicals, while optional ingredients modify texture or dye timing. Not every henna paste contains all of these ingredients.
          </p>
        </div>

        {/* 6 Visual Ingredient Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {MEHNDI_CORE_INGREDIENTS.map((item) => {
            const isTraditional = !item.isOptional;
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-[#DCE1D8] p-6 shadow-sm hover:shadow-md hover:border-[#263D2B] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Card Header & Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`text-[9.5px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                        isTraditional
                          ? 'bg-[#263D2B] text-white border-[#263D2B]'
                          : item.id === 'essential-oils'
                          ? 'bg-[#F7F4ED] text-[#263D2B] border-[#465640]/40 ring-1 ring-[#263D2B]/10'
                          : 'bg-[#F7F4ED] text-[#465640] border-[#DCE1D8]'
                      }`}
                    >
                      {item.badge}
                    </span>
                    <span className="text-[10.5px] font-mono text-[#6B7068]">
                      {isTraditional ? 'Traditional' : 'Optional'}
                    </span>
                  </div>

                  {/* Title & Scientific Identity */}
                  <div>
                    <h4 className="font-serif text-xl text-[#10110F] font-normal group-hover:text-[#263D2B] transition-colors">
                      {item.name}
                    </h4>
                    <span className="text-[11px] font-mono text-[#6B7068] italic block mt-0.5">
                      {item.scientificName}
                    </span>
                  </div>

                  {/* Summary Callout */}
                  <p className="text-xs text-[#10110F] font-medium leading-relaxed bg-[#FBF9F4] p-3 rounded-xl border border-[#DCE1D8]/60">
                    {item.summary}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-[#6B7068] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Safety & Context Footer */}
                <div className="pt-4 mt-4 border-t border-[#DCE1D8]/70 space-y-2">
                  <div className="flex items-start gap-1.5 text-[11px] text-[#465640] leading-snug">
                    <Info className="w-3.5 h-3.5 text-[#263D2B] mt-0.5 flex-shrink-0" />
                    <span className="font-light">{item.safetyNote}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear Traditional vs Optional Distinction Notice */}
        <div className="mt-6 p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs text-[#465640] flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
          <p className="font-light">
            <strong>Traditional vs. Optional Clarification:</strong> Natural henna paste fundamentally requires only pure henna powder and clean water. Lemon juice, sugar, and essential oils are optional additions in select recipes and are never universally necessary or suitable for all skin types.
          </p>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 3. HOW IS NATURAL MEHNDI MADE? (7-STEP VISUAL PROCESS)                */}
      {/* ===================================================================== */}
      <div className="mb-16 sm:mb-24">
        <div className="bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#DCE1D8]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B] block">
                FROM LEAF TO SKIN
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                How Is Natural Mehndi Made?
              </h3>
            </div>
            <div className="text-xs text-[#6B7068] flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-[#F7F4ED] font-mono font-semibold text-[#263D2B] border border-[#DCE1D8]">
                7 Authentic Stages
              </span>
              <span>• Click any stage to inspect</span>
            </div>
          </div>

          {/* 7-Step Pipeline Grid / Horizontal Stepper */}
          <div className="pt-8 pb-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-3.5 relative">
              {NATURAL_HENNA_PREPARATION_STEPS.map((s, idx) => {
                const isCurrent = activePrepStep === idx;
                return (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => setActivePrepStep(idx)}
                    className={`p-3.5 sm:p-4 rounded-2xl text-left transition-all cursor-pointer relative flex flex-col justify-between border ${
                      isCurrent
                        ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-md ring-2 ring-[#263D2B]/20 scale-[1.02]'
                        : 'bg-[#FBF9F4] text-[#10110F] border-[#DCE1D8] hover:border-[#465640] hover:bg-white'
                    }`}
                  >
                    <div>
                      {/* Step Number Badge */}
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] font-bold transition-colors ${
                            isCurrent
                              ? 'bg-white text-[#263D2B]'
                              : 'bg-[#263D2B]/10 text-[#263D2B]'
                          }`}
                        >
                          {s.number}
                        </span>
                        <span
                          className={`text-[9px] uppercase font-bold tracking-wider ${
                            isCurrent ? 'text-[#A8B5A0]' : 'text-[#6B7068]'
                          }`}
                        >
                          Stage {s.step}
                        </span>
                      </div>

                      <h4
                        className={`font-serif text-xs sm:text-sm font-medium leading-tight mb-1 ${
                          isCurrent ? 'text-white' : 'text-[#10110F]'
                        }`}
                      >
                        {s.shortTitle}
                      </h4>
                    </div>

                    <div className="pt-2 mt-2 border-t border-current/15 text-[10px] font-mono truncate opacity-90">
                      {s.timeframe}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Step Deep-Dive Showcase */}
          {(() => {
            const step = NATURAL_HENNA_PREPARATION_STEPS[activePrepStep];
            return (
              <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-[#263D2B] text-white text-[10.5px] font-mono font-bold tracking-wider">
                      STEP {step.number} OF 07
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white text-[#465640] text-xs font-semibold border border-[#DCE1D8] flex items-center gap-1.5 shadow-2xs">
                      <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                      <span>{step.timeframe}</span>
                    </span>
                    <span className="text-xs text-[#6B7068] font-mono font-medium">
                      {step.subtitle}
                    </span>
                  </div>

                  <h4 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                    {step.title}
                  </h4>

                  <p className="text-sm sm:text-base text-[#10110F] leading-relaxed font-normal">
                    {step.description}
                  </p>

                  <p className="text-xs text-[#6B7068] leading-relaxed font-light pt-2 border-t border-[#DCE1D8]">
                    <strong className="font-semibold text-[#465640]">Artisanal Discipline: </strong>
                    {step.details}
                  </p>
                </div>

                <div className="md:col-span-4 flex flex-col justify-center items-start md:items-end gap-3 border-t md:border-t-0 md:border-l border-[#DCE1D8] md:pl-6 pt-4 md:pt-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#465640]">
                    PHASE PROGRESSION
                  </span>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-[#263D2B]">
                    Stage {step.number} / 07
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={activePrepStep === 0}
                      onClick={() => setActivePrepStep((prev) => Math.max(0, prev - 1))}
                      className="px-3.5 py-1.5 rounded-xl border border-[#DCE1D8] text-xs font-semibold text-[#465640] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white cursor-pointer"
                    >
                      ← Prev
                    </button>
                    <button
                      type="button"
                      disabled={activePrepStep === NATURAL_HENNA_PREPARATION_STEPS.length - 1}
                      onClick={() => setActivePrepStep((prev) => Math.min(NATURAL_HENNA_PREPARATION_STEPS.length - 1, prev + 1))}
                      className="px-3.5 py-1.5 rounded-xl bg-[#263D2B] text-white text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1f3123] cursor-pointer"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 4. COMMON INGREDIENTS TO UNDERSTAND (TABLE)                           */}
      {/* ===================================================================== */}
      <div className="mb-16 sm:mb-24">
        <div className="space-y-3 text-center sm:text-left mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#263D2B]">
            <Compass className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>INGREDIENT REFERENCE</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
            Common Ingredients to Understand
          </h3>
          <p className="text-xs sm:text-sm text-[#6B7068] max-w-3xl font-light">
            Comprehensive breakdown of substances commonly encountered in natural and commercial henna formulations, why they may be used, and their critical safety profiles.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#DCE1D8] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F7F4ED] border-b border-[#DCE1D8] text-[#465640] uppercase tracking-wider text-[10.5px] font-bold">
                  <th className="py-4 px-5 w-1/4">Ingredient</th>
                  <th className="py-4 px-5 w-1/3">Why It May Be Used</th>
                  <th className="py-4 px-5">Important Safety Information</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCE1D8]/60">
                {COMMON_HENNA_INGREDIENTS.map((item) => {
                  const isPPD = item.id === 'ppd';
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-[#FBF9F4] transition-colors ${
                        isPPD ? 'bg-red-50/40 hover:bg-red-50/70' : ''
                      }`}
                    >
                      <td className="py-4 px-5 align-top">
                        <div className="font-serif text-sm font-semibold text-[#10110F] flex items-center gap-2">
                          {isPPD && <AlertTriangle className="w-4 h-4 text-red-700 flex-shrink-0" />}
                          <span>{item.name}</span>
                        </div>
                        <span
                          className={`inline-block mt-1 text-[9.5px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md border ${
                            isPPD
                              ? 'bg-red-100 text-red-800 border-red-300'
                              : item.categoryKey === 'plant'
                              ? 'bg-[#263D2B]/10 text-[#263D2B] border-[#263D2B]/20'
                              : item.categoryKey === 'mixing'
                              ? 'bg-[#F7F4ED] text-[#465640] border-[#DCE1D8]'
                              : 'bg-neutral-100 text-[#6B7068] border-neutral-300'
                          }`}
                        >
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 px-5 align-top text-[#10110F] leading-relaxed font-light">
                        {item.whyUsed}
                      </td>
                      <td className="py-4 px-5 align-top leading-relaxed">
                        <span
                          className={`block font-light text-xs ${
                            isPPD ? 'text-red-900 font-medium' : 'text-[#6B7068]'
                          }`}
                        >
                          {item.safetyInformation}
                        </span>
                        {isPPD && (
                          <div className="mt-2 p-2 rounded-lg bg-red-100/80 border border-red-200 text-red-950 font-semibold text-[11px]">
                            ⚠️ WARNING: Never recommend adding PPD to henna paste. It is illegal and hazardous for skin application.
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* PPD Alert Card */}
        <div className="mt-6 p-5 rounded-2xl bg-white border-2 border-red-200/80 shadow-xs flex flex-col sm:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-800 flex items-center justify-center flex-shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif text-base font-semibold text-[#10110F]">
              Critical Public Health Notice: PPD (para-phenylenediamine)
            </h4>
            <p className="text-xs text-[#6B7068] leading-relaxed font-light">
              PPD is an industrial dye intermediate designed strictly for hair coloring. When illegally mixed into products sold as &ldquo;black henna&rdquo; for skin decoration, it can trigger severe chemical contact dermatitis, weeping blisters, permanent depigmentation, and lifelong cross-sensitization to everyday medications and dyes. <strong>GLAM GIRL BY JANKI never uses PPD or synthetic black stains.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 5. NATURAL HENNA VS. BLACK HENNA (SIDE-BY-SIDE COMPARISON)            */}
      {/* ===================================================================== */}
      <div className="mb-16 sm:mb-24">
        <div className="space-y-3 text-center sm:text-left mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#263D2B]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>SAFETY CONTRAST MATRIX</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
            Natural Henna vs. Black Henna
          </h3>
          <p className="text-xs sm:text-sm text-[#6B7068] max-w-3xl font-light">
            Understanding the profound differences between authentic botanical lawsone paste and hazardous chemical black dyes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Natural Henna Card */}
          <div className="bg-white rounded-3xl border-2 border-[#263D2B]/30 p-6 sm:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#263D2B] text-white text-[10px] font-mono font-bold tracking-wider">
                  {HENNA_COMPARISON.natural.badge}
                </span>
                <span className="text-xs font-serif italic text-[#465640]">Traditional &amp; Safe</span>
              </div>

              <div>
                <h4 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                  {HENNA_COMPARISON.natural.title}
                </h4>
                <p className="text-xs text-[#465640] font-mono mt-0.5">
                  {HENNA_COMPARISON.natural.subtitle}
                </p>
              </div>

              <div className="space-y-3 text-xs divide-y divide-[#DCE1D8]">
                <div className="pt-2 flex items-start gap-2.5">
                  <Leaf className="w-4 h-4 text-[#263D2B] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-[#10110F] block">Botanical Origin:</strong>
                    <span className="text-[#6B7068] font-light">{HENNA_COMPARISON.natural.origin}</span>
                  </div>
                </div>

                <div className="pt-3 flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#263D2B] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-[#10110F] block">Stain Evolution:</strong>
                    <span className="text-[#6B7068] font-light">{HENNA_COMPARISON.natural.stainAppearance}</span>
                  </div>
                </div>

                <div className="pt-3 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#263D2B] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-[#10110F] block">Allergy &amp; Skin Profile:</strong>
                    <span className="text-[#6B7068] font-light">{HENNA_COMPARISON.natural.safetyProfile}</span>
                  </div>
                </div>

                <div className="pt-3 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#263D2B] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-[#10110F] block">Atelier Recommendation:</strong>
                    <span className="text-[#6B7068] font-light">{HENNA_COMPARISON.natural.verdict}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#DCE1D8] text-[11px] text-[#263D2B] font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#263D2B]" />
              <span>Verified pure botanical lawsone dye</span>
            </div>
          </div>

          {/* Black Henna Card */}
          <div className="bg-white rounded-3xl border-2 border-red-300 p-6 sm:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden bg-red-50/20">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-red-700 text-white text-[10px] font-mono font-bold tracking-wider">
                  {HENNA_COMPARISON.black.badge}
                </span>
                <span className="text-xs font-serif italic text-red-900">Hazardous Chemical</span>
              </div>

              <div>
                <h4 className="font-serif text-2xl sm:text-3xl text-red-950 font-normal">
                  {HENNA_COMPARISON.black.title}
                </h4>
                <p className="text-xs text-red-800 font-mono mt-0.5">
                  {HENNA_COMPARISON.black.subtitle}
                </p>
              </div>

              <div className="space-y-3 text-xs divide-y divide-red-200/80">
                <div className="pt-2 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-red-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-[#10110F] block">Composition:</strong>
                    <span className="text-[#6B7068] font-light">{HENNA_COMPARISON.black.origin}</span>
                  </div>
                </div>

                <div className="pt-3 flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-red-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-[#10110F] block">Stain Characteristics:</strong>
                    <span className="text-[#6B7068] font-light">{HENNA_COMPARISON.black.stainAppearance}</span>
                  </div>
                </div>

                <div className="pt-3 flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-red-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-[#10110F] block">Health Risks &amp; Reactions:</strong>
                    <span className="text-[#6B7068] font-light">{HENNA_COMPARISON.black.safetyProfile}</span>
                  </div>
                </div>

                <div className="pt-3 flex items-start gap-2.5">
                  <X className="w-4 h-4 text-red-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-[#10110F] block">Atelier Guidance:</strong>
                    <span className="text-[#6B7068] font-light">{HENNA_COMPARISON.black.verdict}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-red-200 text-[11px] text-red-800 font-semibold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-700" />
              <span>Do not use products containing PPD for skin decoration</span>
            </div>
          </div>
        </div>

        {/* Colour Alone Disclaimer */}
        <div className="mt-6 p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs text-[#465640] flex items-center gap-2.5">
          <Info className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
          <p className="font-light italic">
            {HENNA_COMPARISON.colourDisclaimer}
          </p>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 6. INTERACTIVE INGREDIENT EXPLORER                                    */}
      {/* ===================================================================== */}
      <div className="mb-16 sm:mb-24">
        <div className="space-y-3 text-center sm:text-left mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#263D2B]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>INTERACTIVE WORKBENCH</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
            Interactive Ingredient Explorer
          </h3>
          <p className="text-xs sm:text-sm text-[#6B7068] max-w-3xl font-light">
            Filter by classification to inspect individual ingredient purposes, biochemical roles, and essential safety guidelines.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-8 shadow-sm space-y-6">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-[#DCE1D8]">
            {[
              { id: 'all', label: 'All Ingredients (8)' },
              { id: 'plant', label: 'Natural plant ingredient' },
              { id: 'mixing', label: 'Mixing ingredient' },
              { id: 'optional', label: 'Optional ingredient' },
              { id: 'caution', label: 'Ingredient requiring extra caution' }
            ].map((f) => {
              const isActive = explorerFilter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setExplorerFilter(f.id);
                    // auto select first matching
                    const match =
                      f.id === 'all'
                        ? COMMON_HENNA_INGREDIENTS[0]
                        : COMMON_HENNA_INGREDIENTS.find((i) => i.categoryKey === f.id);
                    if (match) setSelectedIngredientId(match.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-2xs'
                      : 'bg-[#F7F4ED] text-[#465640] border-[#DCE1D8] hover:border-[#263D2B]'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Explorer Layout: List on Left, Detail Pane on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Selectable Items */}
            <div className="lg:col-span-5 space-y-2.5 max-h-96 overflow-y-auto pr-1 scrollbar-thin">
              {filteredIngredients.map((ing) => {
                const isSelected = selectedIngredientId === ing.id;
                const isHazard = ing.isHazard;
                return (
                  <div
                    key={ing.id}
                    onClick={() => setSelectedIngredientId(ing.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[#263D2B] bg-[#FBF9F4] ring-2 ring-[#263D2B]/15 shadow-xs'
                        : 'border-[#DCE1D8] bg-white hover:border-[#465640]'
                    } ${isHazard ? 'hover:border-red-400' : ''}`}
                  >
                    <div>
                      <h5 className="font-serif text-sm text-[#10110F] font-medium leading-tight">
                        {ing.name}
                      </h5>
                      <span className="text-[10px] text-[#6B7068] font-mono block mt-0.5">
                        {ing.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span
                        className={`text-[9.5px] font-mono px-2 py-0.5 rounded-md border ${
                          isHazard
                            ? 'bg-red-100 text-red-800 border-red-200'
                            : ing.isOptional
                            ? 'bg-[#F7F4ED] text-[#465640] border-[#DCE1D8]'
                            : 'bg-[#263D2B]/10 text-[#263D2B] border-[#263D2B]/20'
                        }`}
                      >
                        {isHazard ? 'High Risk' : ing.isOptional ? 'Optional' : 'Core'}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#6B7068]" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Selected Ingredient Deep-Dive Card */}
            <div className="lg:col-span-7 bg-[#F7F4ED] rounded-2xl border border-[#DCE1D8] p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#DCE1D8]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                    {activeIngredient.category}
                  </span>
                  <h4 className="font-serif text-2xl text-[#10110F] font-normal">
                    {activeIngredient.name}
                  </h4>
                </div>
                <span
                  className={`text-xs font-mono font-semibold px-3 py-1 rounded-full border ${
                    activeIngredient.isHazard
                      ? 'bg-red-100 text-red-800 border-red-300'
                      : 'bg-white text-[#263D2B] border-[#DCE1D8]'
                  }`}
                >
                  {activeIngredient.riskLevel}
                </span>
              </div>

              {/* Purpose */}
              <div className="space-y-1">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#465640] block">
                  Why It May Be Used:
                </span>
                <p className="text-xs sm:text-sm text-[#10110F] leading-relaxed font-light">
                  {activeIngredient.whyUsed}
                </p>
              </div>

              {/* Safety Information */}
              <div className="space-y-1 pt-2 border-t border-[#DCE1D8]/60">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#465640] block">
                  Important Safety Information:
                </span>
                <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed font-light">
                  {activeIngredient.safetyInformation}
                </p>
              </div>

              {/* Disclaimer Notice */}
              <div className="pt-3 border-t border-[#DCE1D8] text-[11px] text-[#6B7068] italic font-light">
                *Products are never labeled as medically certified, allergy-free, or guaranteed safe. Individual skin sensitivities vary.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 7. SAFE PREPARATION TIPS (CHECKLIST)                                  */}
      {/* ===================================================================== */}
      <div>
        <div className="space-y-3 text-center sm:text-left mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#263D2B]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>BEST PRACTICES CHECKLIST</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
            Safe Preparation &amp; Application Tips
          </h3>
          <p className="text-xs sm:text-sm text-[#6B7068] max-w-3xl font-light">
            Essential guidelines for ensuring clean preparation, transparent labeling, and skin wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SAFE_PREPARATION_TIPS.map((tip, idx) => (
            <div
              key={tip.id}
              className="bg-white rounded-2xl border border-[#DCE1D8] p-5 shadow-2xs hover:border-[#263D2B] transition-all flex items-start gap-3.5 group"
            >
              <div className="w-7 h-7 rounded-full bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 group-hover:bg-[#263D2B] group-hover:text-white transition-colors">
                {idx + 1}
              </div>
              <div className="space-y-1">
                <h5 className="font-serif text-sm font-semibold text-[#10110F]">
                  {tip.title}
                </h5>
                <p className="text-xs text-[#6B7068] leading-relaxed font-light">
                  {tip.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Patch Test Advisory */}
        <div className="mt-6 p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs text-[#465640] flex items-center gap-2.5">
          <ShieldAlert className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
          <p className="font-light">
            <strong>Advisory on Patch Testing:</strong> While conducting a small preliminary skin test is a recommended precautionary measure, it cannot guarantee that an adverse allergic reaction will not occur during or after a full application. Always discontinue use immediately if redness, itching, or swelling develops.
          </p>
        </div>
      </div>
    </section>
  );
}
