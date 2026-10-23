import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, MessageCircle, Calendar, ArrowRight } from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

const TREATMENT_FAQS = [
  {
    question: 'How do I choose the right treatment for me?',
    answer: 'Our consultation and hair or skin analysis help us understand your needs and recommend a suitable treatment based on your goals.'
  },
  {
    question: 'Do I need a consultation before my treatment?',
    answer: 'A consultation is recommended to discuss your expectations, preferences, and any relevant hair or skin concerns before your treatment.'
  },
  {
    question: 'How long does a treatment take?',
    answer: 'Treatment duration depends on the service you choose. Please check the individual service details or contact us for more information.'
  },
  {
    question: 'How should I prepare for my appointment?',
    answer: 'Preparation depends on the selected treatment. Follow any instructions provided when booking, and contact the salon if you are unsure.'
  },
  {
    question: 'Can I book more than one treatment?',
    answer: 'Availability depends on the services selected and the time required. Please check available appointment slots when booking.'
  },
  {
    question: 'What happens during the treatment process?',
    answer: 'Our process includes consultation, hair and skin analysis, treatment application, and aftercare guidance, tailored to the selected service.'
  },
  {
    question: 'Will I receive aftercare guidance?',
    answer: 'Yes. We provide relevant aftercare recommendations to help you care for your hair or skin after your treatment.'
  },
  {
    question: 'Can I reschedule my appointment?',
    answer: 'Please check the booking confirmation and the salon’s current appointment policy for rescheduling options.'
  },
  {
    question: 'Are treatments suitable for every skin or hair type?',
    answer: 'Suitability varies by treatment and individual needs. Discuss relevant concerns with the salon before proceeding.'
  },
  {
    question: 'How can I learn about treatment prices?',
    answer: 'Visit the existing Services or Price List page to review available services and their current prices.'
  }
];

export default function TreatmentFaqSection() {
  // Allow one question open at a time; initialize with first item open
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="mt-20 sm:mt-28 lg:mt-32 pt-16 sm:pt-20 border-t border-[#DCE1D8]">
      <div className="w-full max-w-4xl mx-auto">
        
        {/* ===================================================================== */}
        {/* SECTION HEADER                                                        */}
        {/* ===================================================================== */}
        <ScrollReveal className="text-center max-w-2xl mx-auto space-y-4 mb-12 sm:mb-16">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
            <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.26em] text-[#263D2B]">
              HERE TO GUIDE YOU
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
            Frequently Asked Questions
          </h2>

          {/* Subtle Decorative Forest Green Accent Line */}
          <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

          {/* Description */}
          <p className="font-sans text-sm sm:text-base text-[#6B7068] leading-relaxed font-light max-w-xl mx-auto pt-1">
            Everything you need to know before beginning your beauty journey with us.
          </p>
        </ScrollReveal>

        {/* ===================================================================== */}
        {/* ACCORDION CONTAINER                                                   */}
        {/* ===================================================================== */}
        <div className="space-y-3.5 sm:space-y-4">
          {TREATMENT_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const questionId = `treatment-faq-q-${index}`;
            const answerId = `treatment-faq-a-${index}`;

            return (
              <ScrollReveal
                key={faq.question}
                delay={index * 40}
              >
                <div
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-[#263D2B] shadow-md ring-1 ring-[#263D2B]/10'
                      : 'bg-white/80 hover:bg-white border-[#DCE1D8] hover:border-[#A8B5A0] shadow-xs'
                  }`}
                >
                  {/* Accordion Trigger Button */}
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    id={questionId}
                    className="w-full min-h-[60px] py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#263D2B] focus-visible:ring-offset-2 transition-colors group"
                  >
                    <span className="flex items-center gap-3.5 sm:gap-4 pr-2">
                      <span className="font-serif text-xs sm:text-sm text-[#465640]/70 font-normal select-none">
                        {String(index + 1).padStart(2, '0')}.
                      </span>
                      <span
                        className={`font-serif text-base sm:text-lg leading-snug transition-colors ${
                          isOpen
                            ? 'text-[#263D2B] font-medium'
                            : 'text-[#10110F] group-hover:text-[#263D2B]'
                        }`}
                      >
                        {faq.question}
                      </span>
                    </span>

                    {/* Plus / Minus Indicator Icon */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-xs ${
                        isOpen
                          ? 'bg-[#263D2B] text-white rotate-0'
                          : 'bg-[#F7F4ED] text-[#263D2B] group-hover:bg-[#263D2B] group-hover:text-white'
                      }`}
                      aria-hidden="true"
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                      )}
                    </div>
                  </button>

                  {/* Accordion Smooth Expand/Collapse Content */}
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100 border-t border-[#DCE1D8]/70'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 sm:px-6 py-4 sm:py-5 text-sm sm:text-[15px] text-[#6B7068] leading-relaxed font-light bg-[#F7F4ED]/40">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* ===================================================================== */}
        {/* 4. BOTTOM CLOSING CTA SECTION                                          */}
        {/* ===================================================================== */}
        <ScrollReveal className="mt-16 sm:mt-20">
          <div className="rounded-3xl bg-white border border-[#DCE1D8] p-8 sm:p-12 text-center shadow-sm relative overflow-hidden">
            {/* Subtle luxury ambient glow */}
            <div 
              className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#A8B5A0]/10 blur-3xl pointer-events-none" 
              aria-hidden="true" 
            />
            <div 
              className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-[#263D2B]/5 blur-3xl pointer-events-none" 
              aria-hidden="true" 
            />

            <div className="relative z-10 max-w-xl mx-auto space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] mx-auto flex items-center justify-center text-[#263D2B] shadow-xs">
                <MessageCircle className="w-5 h-5 stroke-[1.8]" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#10110F] tracking-tight">
                Still Have Questions?
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#6B7068] leading-relaxed font-light">
                We’re here to help you find the right beauty experience for your needs.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[4px] border border-[#263D2B] text-[#263D2B] hover:bg-[#263D2B] hover:text-white text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-xs cursor-pointer group"
                >
                  <span>CONTACT US</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/book-appointment"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[4px] bg-[#263D2B] hover:bg-[#1C2E20] text-white text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#263D2B]/25 active:scale-98 cursor-pointer group"
                >
                  <Calendar className="w-4 h-4" />
                  <span>BOOK APPOINTMENT</span>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
