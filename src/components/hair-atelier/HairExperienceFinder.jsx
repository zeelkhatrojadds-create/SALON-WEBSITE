import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  RotateCcw, 
  Check, 
  ArrowRight, 
  Compass, 
  Info 
} from 'lucide-react';
import { HAIR_QUESTIONNAIRE } from './hairAtelierData';

export default function HairExperienceFinder({ onOpenConsultation }) {
  const [answers, setAnswers] = useState({
    goal: 'look',
    length: 'medium',
    style: 'voluminous',
    consultation: 'yes'
  });

  const handleSelectOption = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleReset = () => {
    setAnswers({
      goal: 'look',
      length: 'medium',
      style: 'voluminous',
      consultation: 'yes'
    });
  };

  // Recommendation engine based on authentic catalog services
  const recommendedServices = useMemo(() => {
    const list = [];
    const { goal, length, style } = answers;

    if (goal === 'look') {
      if (length === 'short') {
        list.push({
          id: 'classic-trim',
          name: 'Classic Trim & Perimeter Polish',
          price: 35,
          duration: '30 min',
          image: '/images/hair-care/55-classic-trim.webp',
          why: 'Tailored for shorter lengths needing crisp edge definition without sacrificing density.'
        });
        list.push({
          id: 'noor-signature-haircut',
          name: 'Noor Signature Precision Cut',
          price: 55,
          duration: '45 min',
          image: '/images/hair-care/53-noor-signature-haircut.webp',
          why: 'Adds structural volume and facial contouring to short-to-medium shapes.'
        });
      } else if (length === 'long') {
        list.push({
          id: 'meera-layer-cut',
          name: 'Meera Layer Cut',
          price: 65,
          duration: '45 min',
          image: '/images/hair-care/54-meera-layer-cut.webp',
          why: 'Ideal for long tresses seeking cascading motion, lightness, and beautiful bounce.'
        });
        list.push({
          id: 'long-hair-cut',
          name: 'Long Hair Cut & Split End Care',
          price: 50,
          duration: '40 min',
          image: '/images/hair-care/56-long-hair-cut.webp',
          why: 'Designed to preserve maximum length while removing damaged perimeters.'
        });
      } else {
        list.push({
          id: 'noor-signature-haircut',
          name: 'Noor Signature Haircut & Blowout',
          price: 55,
          duration: '45 min',
          image: '/images/hair-care/53-noor-signature-haircut.webp',
          why: 'Our most sought-after medium-length cut for seamless movement and easy morning maintenance.'
        });
        list.push({
          id: 'meera-layer-cut',
          name: 'Meera Layer Cut',
          price: 65,
          duration: '45 min',
          image: '/images/hair-care/54-meera-layer-cut.webp',
          why: 'Cascading layers that harmonize natural waves with modern face framing.'
        });
      }
    } else if (goal === 'styling') {
      if (style === 'polished' || style === 'natural') {
        list.push({
          id: 'blow-dry-styling',
          name: 'Blow Dry & Styling',
          price: 45,
          duration: '30 min',
          image: '/images/hair-care/52-blow-dry-styling.webp',
          why: 'Round-brush salon blowout delivering featherweight body, shine, and silky smoothness.'
        });
      } else if (style === 'voluminous') {
        list.push({
          id: 'party-hair-styling',
          name: 'Party Hair Styling & Waves',
          price: 75,
          duration: '45 min',
          image: '/images/hair-care/51-party-hair-styling.webp',
          why: 'Glossy Hollywood waves and voluminous event styling with anti-humidity thermal setting.'
        });
      } else {
        list.push({
          id: 'rani-hair-styling',
          name: 'Rani Royal Hair Styling',
          price: 65,
          duration: '45 min',
          image: '/images/hair-care/49-rani-hair-styling.webp',
          why: 'Sculpted romantic updos and braided textures for celebrations and evenings.'
        });
        list.push({
          id: 'bridal-hair-styling',
          name: 'Bridal Hair Styling Couture',
          price: 110,
          duration: '60 min',
          image: '/images/hair-care/50-bridal-hair-styling.webp',
          why: 'Master bridal and formal event styling with anchor pinning and dupatta balance.'
        });
      }
    } else if (goal === 'colour') {
      if (style === 'natural' || style === 'voluminous') {
        list.push({
          id: 'noor-balayage',
          name: 'Noor Dimensional Balayage',
          price: 195,
          duration: '150 min',
          image: '/images/hair-care/58-noor-balayage.webp',
          why: 'Hand-painted sun-kissed dimension with soft regrowth and Olaplex bond guard.'
        });
      } else if (style === 'polished') {
        list.push({
          id: 'highlights',
          name: 'Full Multi-Foil Highlights',
          price: 140,
          duration: '110 min',
          image: '/images/hair-care/59-highlights.webp',
          why: 'Luminous micro-woven foil placement with customizable acidic gloss toner.'
        });
      } else {
        list.push({
          id: 'kesariya-hair-colour',
          name: 'Kesariya Botanical Hair Colour',
          price: 85,
          duration: '75 min',
          image: '/images/hair-care/57-kesariya-hair-colour.webp',
          why: 'Rich ammonia-free Ayurvedic saturation delivering deep shine and 100% grey coverage.'
        });
      }
    } else {
      // Hair Care
      if (style === 'bold' || style === 'polished') {
        list.push({
          id: 'noor-hair-repair-ritual',
          name: 'Noor Hair Repair Ritual',
          price: 95,
          duration: '60 min',
          image: '/images/hair-care/63-noor-hair-repair-ritual.webp',
          why: 'Intensive bond-building therapy for chemically treated or heat-fatigued strands.'
        });
      } else {
        list.push({
          id: 'kesariya-hair-spa',
          name: 'Kesariya Luxury Hair Spa',
          price: 75,
          duration: '50 min',
          image: '/images/hair-care/62-kesariya-hair-spa.webp',
          why: 'Herbal steam immersion and warm botanical oil massage for silk-like hydration.'
        });
      }
      list.push({
        id: 'deep-conditioning',
        name: 'Deep Conditioning Treatment',
        price: 55,
        duration: '40 min',
        image: '/images/hair-care/64-deep-conditioning.webp',
        why: 'Fast, restorative moisture injection restoring suppleness and eliminating dry tangles.'
      });
    }

    return list;
  }, [answers]);

  return (
    <section id="hair-experience-finder" className="py-16 sm:py-24 border-t border-[#DCE1D8] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] shadow-xs">
            <Compass className="w-3.5 h-3.5 text-[#263D2B]" />
            <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              BESPOKE SERVICE MATCHER
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
            Find Your Hair Experience
          </h2>
          <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed font-light">
            Answer four quick questions to discover the approved salon services that best reflect your hair goals, length, and personal aesthetic.
          </p>
        </div>

        {/* 4 Questionnaire Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HAIR_QUESTIONNAIRE.map((q) => (
            <div 
              key={q.id}
              className="p-6 rounded-3xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-4 shadow-2xs"
            >
              <h3 className="font-serif text-lg text-[#10110F] font-medium">
                {q.title}
              </h3>

              <div className="space-y-2">
                {q.options.map((opt) => {
                  const isSelected = answers[q.id] === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(q.id, opt.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'border-[#263D2B] bg-white shadow-sm ring-1 ring-[#263D2B]'
                          : 'border-[#DCE1D8] bg-white/60 hover:bg-white text-[#465640]'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected 
                          ? 'border-[#263D2B] bg-[#263D2B] text-white' 
                          : 'border-[#A8B5A0] bg-white'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#10110F]">{opt.label}</div>
                        <div className="text-[11px] text-[#6B7068] mt-0.5 leading-snug">{opt.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Reset / Change Answers Action */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Questionnaire to Default</span>
          </button>
        </div>

        {/* Results Area */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#263D2B] text-white shadow-xl space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/15">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#A8B5A0] block">
                YOUR TAILORED SALON MATCHES
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                Recommended Services for Your Signature Style
              </h3>
              <p className="text-xs text-white/80 font-light">
                Based on your preference for a {answers.goal} journey with {answers.length} hair and {answers.style} finish.
              </p>
            </div>
            {answers.consultation === 'yes' && (
              <div className="bg-white/10 px-4 py-2.5 rounded-2xl border border-white/15 text-xs text-[#A8B5A0] flex items-center gap-2">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>1-on-1 Consultation Requested</span>
              </div>
            )}
          </div>

          {/* Recommended Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedServices.map((service) => (
              <div
                key={service.id}
                className="rounded-2xl bg-white text-[#10110F] p-5 border border-[#DCE1D8] shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="flex gap-4 items-start">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-neutral-900 border border-[#DCE1D8] shrink-0">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] font-mono uppercase text-[#263D2B] font-semibold block">
                      Approved Salon Catalog
                    </span>
                    <h4 className="font-serif text-lg text-[#10110F] leading-tight font-medium">
                      {service.name}
                    </h4>
                    <div className="text-xs font-mono font-bold text-[#263D2B]">
                      ${service.price} CAD &bull; {service.duration}
                    </div>
                    <p className="text-[11px] text-[#6B7068] leading-snug pt-1">
                      {service.why}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#DCE1D8] flex items-center justify-between gap-3">
                  <span className="text-xs text-[#6B7068] font-mono">
                    Duration: {service.duration}
                  </span>

                  <button
                    type="button"
                    onClick={() => onOpenConsultation && onOpenConsultation({
                      recommendedService: service,
                      quizAnswers: answers
                    })}
                    className="global-button !py-2.5 !px-5 text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Request Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Advisory Disclaimer Notice */}
          <div className="p-4 rounded-2xl bg-black/30 border border-white/10 flex items-start gap-2.5 text-xs text-[#A8B5A0] leading-relaxed">
            <Info className="w-4 h-4 text-white shrink-0 mt-0.5" />
            <span>
              <strong>Professional Notice:</strong> These curated questionnaire recommendations are cosmetic suggestions designed around your aesthetic preferences. They do not constitute a medical or dermatological diagnosis. For persistent scalp conditions, we advise professional medical guidance.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
