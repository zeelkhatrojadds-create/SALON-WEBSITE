import React from 'react';
import { Check, RotateCcw, Sparkles } from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import { NAIL_SHAPES } from './NailConstants';

export default function NailShapeSelector({
  selectedShape,
  onSelectShape,
  onResetShape,
  activeColorHex = '#263D2B'
}) {
  return (
    <section 
      id="choose-nail-shape"
      aria-label="Choose Your Nail Shape" 
      className="w-full bg-white border-y border-[#DCE1D8] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 shadow-2xs scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>STEP 01 · SILHOUETTE ARCHITECTURE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
            Choose Your Nail Shape
          </h2>

          <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto">
            “Find your perfect shape and create a manicure that reflects your personal style.”
          </p>
        </ScrollReveal>

        {/* 7 Shapes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3.5 sm:gap-4 items-stretch">
          {NAIL_SHAPES.map((shape) => {
            const isSelected = selectedShape.id === shape.id;

            return (
              <button
                key={shape.id}
                type="button"
                onClick={() => onSelectShape(shape)}
                aria-pressed={isSelected}
                aria-label={`Select ${shape.name} nail shape`}
                className={`group relative p-4 sm:p-5 rounded-2xl text-left flex flex-col justify-between transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#263D2B] focus-visible:outline-offset-2 ${
                  isSelected
                    ? 'bg-[#F7F4ED] border-2 border-[#263D2B] shadow-md ring-1 ring-[#263D2B]/20 -translate-y-1'
                    : 'bg-white hover:bg-[#F7F4ED]/60 border border-[#DCE1D8] hover:border-[#A8B5A0] shadow-xs hover:-translate-y-0.5'
                }`}
              >
                {/* Selected Checkmark Badge */}
                {isSelected && (
                  <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#263D2B] text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}

                {/* SVG Silhouette Thumbnail */}
                <div className="w-full aspect-[4/5] max-h-28 flex items-center justify-center mb-3">
                  <svg
                    viewBox="0 0 100 160"
                    className="w-16 h-24 filter drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
                  >
                    <defs>
                      <linearGradient id={`shape-grad-${shape.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={isSelected ? activeColorHex : '#DCE1D8'} />
                        <stop offset="100%" stopColor={isSelected ? '#10110F' : '#6B7068'} />
                      </linearGradient>
                      <linearGradient id={`shape-shine-${shape.id}`} x1="0%" y1="0%" x2="50%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Nail Silhouette Body */}
                    <path
                      d={shape.path}
                      fill={`url(#shape-grad-${shape.id})`}
                      stroke={isSelected ? '#263D2B' : '#A8B5A0'}
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                    />

                    {/* Specular Highlight along edge */}
                    <path
                      d={shape.path}
                      fill={`url(#shape-shine-${shape.id})`}
                    />

                    {/* Free edge tip highlight */}
                    <path
                      d={shape.tipHighlightPath}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity="0.75"
                    />
                  </svg>
                </div>

                {/* Name & Subtitle */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`font-serif text-sm sm:text-base font-normal leading-tight transition-colors ${
                      isSelected ? 'text-[#263D2B] font-medium' : 'text-[#10110F]'
                    }`}>
                      {shape.name}
                    </span>
                  </div>
                  <p className="text-[10.5px] sm:text-[11px] text-[#6B7068] leading-tight font-sans line-clamp-2">
                    {shape.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Shape Detail Bar & Reset Button */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] bg-white px-2.5 py-0.5 rounded-full border border-[#DCE1D8]">
                ACTIVE SILHOUETTE
              </span>
              <span className="font-serif text-base text-[#10110F] font-medium">
                {selectedShape.name}
              </span>
            </div>
            <p className="text-xs text-[#6B7068] font-light max-w-2xl">
              {selectedShape.description}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={onResetShape}
              aria-label="Reset shape to default"
              className="px-4 py-2 rounded-full border border-[#DCE1D8] bg-white hover:bg-[#F7F4ED] hover:border-[#263D2B] text-[#10110F] text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>Reset Shape</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
