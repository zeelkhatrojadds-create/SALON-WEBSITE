import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Scissors, 
  Palette, 
  Wind, 
  Droplets, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  Clock,
  HeartHandshake
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

const HAIR_TRANSFORMATIONS = [
  {
    id: 'haircut-restyling',
    name: 'Haircut & Restyling',
    tag: 'PRECISION ARCHITECTURE',
    filterCategory: 'cut-style',
    icon: Scissors,
    image: '/images/hair-care/53-noor-signature-haircut.webp',
    description: 'Precision structural haircut calibrated to your facial symmetry, lifestyle, and natural texture, complete with a clarifying wash and blowout.',
    catalogServiceId: 'noor-signature-haircut',
    approvedPrice: '$55 CAD',
    approvedDuration: '45 min',
    highlights: [
      'Face-framing layer customized to bone structure',
      'Removal of damaged split ends while preserving length',
      'Complimentary scalp wash and round-brush blowout'
    ]
  },
  {
    id: 'hair-colour-transformation',
    name: 'Hair Colour Transformation',
    tag: 'DIMENSIONAL GLOSS',
    filterCategory: 'colour',
    icon: Palette,
    image: '/images/hair-care/57-kesariya-hair-colour.webp',
    description: 'Full-head rich global colour application utilizing ammonia-free micro-pigments and conditioning botanicals for multi-tonal richness.',
    catalogServiceId: 'kesariya-hair-colour',
    approvedPrice: '$85 CAD',
    approvedDuration: '60 min',
    highlights: [
      '100% grey coverage with high-gloss mirror finish',
      'Ammonia-free gentle formulation with botanical extracts',
      'Customized tone formulation tailored to undertones'
    ]
  },
  {
    id: 'balayage-highlights',
    name: 'Balayage & Highlights',
    tag: 'HAUTE COUTURE',
    filterCategory: 'colour',
    icon: Sparkles,
    image: '/images/hair-care/58-noor-balayage.webp',
    description: 'Master freehand painted balayage ribbons and fine babylights seamlessly blended with a shadow root melt for lived-in elegance.',
    catalogServiceId: 'noor-balayage',
    approvedPrice: '$195 CAD',
    approvedDuration: '150 min',
    highlights: [
      'Feathered root melt to ensure graceful, low-maintenance outgrowth',
      'Olaplex bond-building shield integrated into lightener',
      'Custom gloss toner neutralizing brassy undertones'
    ]
  },
  {
    id: 'hair-smoothing',
    name: 'Hair Smoothing',
    tag: 'TEXTURE DISCIPLINE',
    filterCategory: 'texture',
    icon: Wind,
    image: '/images/hair-care/kesariya-hair-treatment.webp',
    description: 'Professional cuticle-smoothing therapy that relaxes unruly waves, eliminates friction, and imparts fluid silkiness to coarse lengths.',
    catalogServiceId: null,
    consultationNote: 'Consultation Required • Customized by hair density',
    highlights: [
      'Seals open cuticle scales for high light reflectivity',
      'Dramatically reduces at-home drying and styling time',
      'Protective barrier against moisture and seasonal humidity'
    ]
  },
  {
    id: 'keratin-treatment',
    name: 'Keratin Treatment',
    tag: 'PROTEIN INFUSION',
    filterCategory: 'texture',
    icon: ShieldCheck,
    image: '/images/hair-care/63-noor-hair-repair-ritual.webp',
    description: 'Intensive hydrolysed keratin and amino acid infusion designed to fortify the hair cortex, eliminate porosity, and deliver sleek discipline.',
    catalogServiceId: 'noor-hair-repair-ritual',
    approvedPrice: '$95 CAD',
    approvedDuration: '60 min',
    highlights: [
      'Infuses essential keratin protein into weakened hair fibers',
      'Smooths and strengthens chemically treated or heat-stressed hair',
      'Long-lasting thermal protection and softness'
    ]
  },
  {
    id: 'hair-botox-treatment',
    name: 'Hair Botox Treatment',
    tag: 'FIBER PLUMPING',
    filterCategory: 'texture',
    icon: Droplets,
    image: '/images/hair-care/64-deep-conditioning.webp',
    description: 'Deep restorative anti-aging conditioning treatment that fills in depleted hair gaps with collagen, plant oils, and peptides for bouncy fullness.',
    catalogServiceId: 'deep-conditioning',
    approvedPrice: '$55 CAD',
    approvedDuration: '40 min',
    highlights: [
      'Non-chemical, formaldehyde-free deep fiber rejuvenation',
      'Restores elasticity and youthful bounce to fine or brittle hair',
      'Intense hydration without weighing down delicate textures'
    ]
  },
  {
    id: 'hair-spa-repair',
    name: 'Hair Spa & Repair',
    tag: 'AYURVEDIC SANCTUARY',
    filterCategory: 'texture',
    icon: Layers,
    image: '/images/hair-care/62-kesariya-hair-spa.webp',
    description: 'Ayurvedic Kesariya herbal butter hair mask combined with warm steam therapy, acupressure scalp massage, and conditioning rinse.',
    catalogServiceId: 'kesariya-hair-spa',
    approvedPrice: '$75 CAD',
    approvedDuration: '50 min',
    highlights: [
      'Traditional warm herb-infused oil scalp massage',
      'Deep steam hydration encouraging nutrient penetration',
      'Leaves hair replenished, fragrant, and touchably soft'
    ]
  },
  {
    id: 'frizz-control-treatment',
    name: 'Frizz Control Treatment',
    tag: 'HUMIDITY BARRIER',
    filterCategory: 'texture',
    icon: Wind,
    image: '/images/hair-care/balayage-highlights.webp',
    description: 'Targeted anti-humidity sealing therapy that envelopes each strand in a weightless lipid shield to prevent atmospheric expansion.',
    catalogServiceId: null,
    consultationNote: 'Consultation Required • Customized by hair density',
    highlights: [
      'Blocks out moisture-induced frizz in fluctuating climates',
      'Tames flyaways while preserving natural wave movement',
      'Lightweight botanical formula with zero greasy residue'
    ]
  },
  {
    id: 'hair-styling-blowout',
    name: 'Hair Styling & Blowout',
    tag: 'SALON FINISH',
    filterCategory: 'cut-style',
    icon: Sparkles,
    image: '/images/hair-care/52-blow-dry-styling.webp',
    description: 'Luxury shampoo wash, scalp massage, and expert round-brush blowout delivering voluminous root lift and bouncy, lasting shape.',
    catalogServiceId: 'blow-dry-styling',
    approvedPrice: '$45 CAD',
    approvedDuration: '30 min',
    highlights: [
      'Botanical thermal shield protection prior to heat styling',
      'Directional round-brush tension for lasting volume and hold',
      'Mirror shine serum finish for red-carpet polish'
    ]
  },
  {
    id: 'bridal-hair-transformation',
    name: 'Bridal Hair Transformation',
    tag: 'ROYAL COUTURE',
    filterCategory: 'cut-style',
    icon: HeartHandshake,
    image: '/images/hair-care/50-bridal-hair-styling.webp',
    description: 'Exquisite bridal updo, Hollywood waves, or traditional Sangeet braid with structural reinforcement for heavy dupattas and jewelry.',
    catalogServiceId: 'bridal-hair-styling',
    approvedPrice: '$110 CAD',
    approvedDuration: '75 min',
    highlights: [
      'Reinforced anchoring for dupattas, maang tikka, and passas',
      '12-hour ceremonial hold designed for dancing and photography',
      'Pre-wedding trial and custom texture preparation'
    ]
  }
];

const FILTER_TABS = [
  { id: 'all', label: 'All Transformations' },
  { id: 'cut-style', label: 'Cuts & Styling' },
  { id: 'colour', label: 'Colour & Balayage' },
  { id: 'texture', label: 'Smoothing & Repair' }
];

export default function HairTransformationStudioSection() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredServices = activeFilter === 'all'
    ? HAIR_TRANSFORMATIONS
    : HAIR_TRANSFORMATIONS.filter((item) => item.filterCategory === activeFilter);

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16 sm:pt-24">
      {/* Section Header */}
      <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            HAIR ARTISTRY &amp; MAKEOVER DISCIPLINE
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-tight">
          The Hair Transformation Studio
        </h2>

        <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

        <p className="font-serif text-sm sm:text-base text-[#465640] italic">
          Bespoke Hair Architecture, Dimensional Colour &amp; Structural Artistry
        </p>

        <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto">
          From sculptural precision cuts and luminous Parisian balayage to intensive bond repair and royal bridal updos, explore our 10 signature hair transformation disciplines. Every look is custom-formulated to complement your bone structure, hair porosity, and daily routine.
        </p>
      </ScrollReveal>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-10 scrollbar-none">
        {FILTER_TABS.map((tab) => {
          const isActive = activeFilter === tab.id;
          const count = tab.id === 'all'
            ? HAIR_TRANSFORMATIONS.length
            : HAIR_TRANSFORMATIONS.filter((item) => item.filterCategory === tab.id).length;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                isActive
                  ? 'bg-[#263D2B] text-white shadow-xs font-bold'
                  : 'bg-white text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED] border border-[#DCE1D8]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-white/20 text-white' : 'bg-[#F7F4ED] text-[#465640]'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 10 Responsive Transformation Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 items-stretch">
        {filteredServices.map((service, index) => {
          const ServiceIcon = service.icon;
          const indexStr = String(index + 1).padStart(2, '0');

          return (
            <article
              key={service.id}
              className="group bg-white rounded-3xl border border-[#DCE1D8] shadow-xs hover:shadow-xl hover:border-[#263D2B] transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
            >
              {/* Image Frame with Zoom */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/images/hair-care/58-noor-balayage.webp';
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.16em] text-[#263D2B] border border-[#DCE1D8] shadow-xs flex items-center gap-1.5">
                  <ServiceIcon className="w-3 h-3 text-[#263D2B]" />
                  <span>{service.tag}</span>
                </div>

                {/* Index on Top Right */}
                <span className="absolute top-3 right-3 font-mono text-xs font-bold text-white/90 drop-shadow-sm">
                  {indexStr}
                </span>

                {/* Image Bottom Approved Meta */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono">
                  {service.approvedPrice ? (
                    <span className="font-bold text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      {service.approvedPrice}
                    </span>
                  ) : (
                    <span className="text-[10px] text-white/90 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      Consultation Required
                    </span>
                  )}

                  {service.approvedDuration && (
                    <span className="text-[10px] text-white/90 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      <Clock className="w-3 h-3" />
                      <span>{service.approvedDuration}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-normal text-[#10110F] leading-snug group-hover:text-[#263D2B] transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-xs text-[#6B7068] leading-relaxed font-light">
                    {service.description}
                  </p>

                  {/* Highlights */}
                  <div className="pt-2 border-t border-[#DCE1D8]/70 space-y-1.5">
                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#263D2B] block">
                      TRANSFORMATION HIGHLIGHTS
                    </span>
                    <ul className="space-y-1.5 text-[11.5px] text-[#10110F]">
                      {service.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#263D2B] mt-0.5 shrink-0" />
                          <span className="font-light leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Atelier Information Link */}
                <div className="pt-4 border-t border-[#DCE1D8] space-y-2">
                  <Link
                    to={service.filterCategory === 'colour' ? '/hair-colour' : '/hair-atelier'}
                    className="w-full py-2.5 px-4 rounded-full bg-[#263D2B] hover:bg-[#1C2E20] text-white text-xs font-bold uppercase tracking-[0.14em] transition-all duration-200 flex items-center justify-center gap-2 shadow-2xs hover:scale-[1.01] active:scale-98 cursor-pointer text-center"
                  >
                    <span>{service.filterCategory === 'colour' ? 'Explore Colour Atelier' : 'Explore Hair Atelier'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {service.consultationNote && (
                    <p className="text-[10px] text-[#6B7068] text-center font-light italic">
                      {service.consultationNote}
                    </p>
                  )}
                </div>

              </div>

            </article>
          );
        })}
      </div>

      {/* Studio Excellence Guarantee */}
      <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-[#DCE1D8] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
        <div className="space-y-1.5 max-w-xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
            INDIVIDUALIZED STRAND DIAGNOSTICS
          </span>
          <h4 className="font-serif text-lg sm:text-xl font-normal text-[#10110F]">
            Every transformation begins with a thorough texture and porosity evaluation.
          </h4>
          <p className="text-xs text-[#6B7068] font-light leading-relaxed">
            Uncertain which hair transformation best suits your routine? Our private Ottawa suite offers strand test evaluations and customized color match consultations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            to="/hair-colour"
            className="global-button-secondary !px-6 !py-3 text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            EXPLORE COLOUR ATELIER
          </Link>
          <Link
            to="/hair-atelier"
            className="global-button !px-6 !py-3 text-white text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm hover:scale-[1.02] active:scale-98 transition-all"
          >
            EXPLORE HAIR ATELIER
          </Link>
        </div>
      </div>

    </section>
  );
}
