import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Clock, Check, ShieldCheck } from 'lucide-react';
import { HAIR_CARE_JOURNAL } from './hairAtelierData';

export default function HairCareJournal() {
  const [expandedArticles, setExpandedArticles] = useState({
    'journal-heat-protection': true,
    'journal-colour-maintenance': false,
    'journal-washing-cleansing': false,
    'journal-deep-hydration': false,
    'journal-styling-maintenance': false,
    'journal-post-service-aftercare': false
  });

  const toggleArticle = (id) => {
    setExpandedArticles((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleExpandAll = () => {
    const allExpanded = Object.keys(expandedArticles).reduce((acc, id) => {
      acc[id] = true;
      return acc;
    }, {});
    setExpandedArticles(allExpanded);
  };

  const handleCollapseAll = () => {
    const allCollapsed = Object.keys(expandedArticles).reduce((acc, id) => {
      acc[id] = false;
      return acc;
    }, {});
    setExpandedArticles(allCollapsed);
  };

  return (
    <section id="hair-care-journal" className="py-16 sm:py-24 border-t border-[#DCE1D8] bg-[#F7F4ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-[#263D2B]" />
              <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
                THE HAIR CARE COMPENDIUM
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
              The Hair Care Journal
            </h2>
            <p className="text-xs sm:text-sm text-[#465640] leading-relaxed font-light">
              Expert trichological knowledge and botanical aftercare guidelines written by Janki Khatroja to help you maintain salon silkiness, prevent thermal fatigue, and protect your colour investment.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExpandAll}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-[#DCE1D8] text-xs font-semibold text-[#465640] hover:text-[#10110F] cursor-pointer"
            >
              Expand All
            </button>
            <button
              type="button"
              onClick={handleCollapseAll}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-[#DCE1D8] text-xs font-semibold text-[#465640] hover:text-[#10110F] cursor-pointer"
            >
              Collapse
            </button>
          </div>
        </div>

        {/* 6 Expandable Editorial Article Cards */}
        <div className="space-y-4">
          {HAIR_CARE_JOURNAL.map((article, idx) => {
            const isExpanded = !!expandedArticles[article.id];
            return (
              <article
                key={article.id}
                className={`rounded-3xl bg-white border transition-all duration-200 overflow-hidden ${
                  isExpanded ? 'border-[#263D2B] shadow-sm' : 'border-[#DCE1D8] hover:border-[#465640]'
                }`}
              >
                {/* Header Row (Clickable) */}
                <div
                  onClick={() => toggleArticle(article.id)}
                  className="p-6 sm:p-8 flex items-start justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex items-center gap-3 text-[11px] font-mono text-[#263D2B]">
                      <span className="font-bold">CHAPTER {idx + 1} &bull; {article.category}</span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1 text-[#6B7068]">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#6B7068] font-light leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="p-2 rounded-full bg-[#F7F4ED] text-[#263D2B] mt-1 shrink-0 transition-transform"
                    aria-label={isExpanded ? 'Collapse article' : 'Expand article'}
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Expanded Full Editorial Content */}
                {isExpanded && (
                  <div className="px-6 pb-8 sm:px-8 border-t border-[#DCE1D8] pt-6 space-y-6 animate-in fade-in duration-200">
                    
                    <div className="space-y-3.5 max-w-3xl">
                      {article.content.map((paragraph, pIdx) => (
                        <p key={pIdx} className="text-xs sm:text-sm text-[#465640] leading-relaxed font-light">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Pro Salon Tips Box */}
                    {article.salonTips && article.salonTips.length > 0 && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] max-w-3xl space-y-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#263D2B]" />
                          Janki&rsquo;s Practical Atelier Rule:
                        </span>
                        <div className="space-y-1.5">
                          {article.salonTips.map((tip, tIdx) => (
                            <div key={tIdx} className="text-xs text-[#10110F] flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-[#263D2B] shrink-0 mt-0.5" />
                              <span>{tip}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
