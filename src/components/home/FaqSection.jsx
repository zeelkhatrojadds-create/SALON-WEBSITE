import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../../data/salonData';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-brand-border/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-pink-light border border-brand-pink/20 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-brand-pink" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">
              GOT QUESTIONS?
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-espresso mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-brand-charcoal/80 text-sm sm:text-base">
            Everything you need to know about visiting our Ottawa studio.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-brand-border/80 overflow-hidden shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-4 sm:py-5 px-6 text-left flex items-center justify-between gap-4 font-serif font-semibold text-brand-espresso hover:text-brand-pink transition-colors text-base sm:text-lg"
                >
                  <span>{faq.question}</span>
                  <div className={`p-1.5 rounded-full bg-brand-pink-light/60 text-brand-pink transition-transform duration-300 ${isOpen ? 'rotate-180 bg-brand-pink text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-brand-charcoal/85 text-xs sm:text-sm leading-relaxed border-t border-brand-pink-light/40 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
