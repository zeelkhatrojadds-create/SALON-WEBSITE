import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Droplets, 
  Wind, 
  Flower2, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  HeartHandshake
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

const HAIR_REVIVAL_SERVICES = [
  {
    id: 'hair-spa-therapy',
    name: 'Hair Spa Therapy',
    categoryTag: 'NOURISHING RITUAL',
    icon: Flower2,
    purpose: 'Deep nourishing hair therapy combining rich herbal butter mask infusion, warm steam hydration, and gentle scalp relaxation.',
    focusArea: 'Dry, dehydrated strands & fatigued hair roots',
    keyBenefits: [
      'Warm steam infuses essential lipids into the hair cuticle',
      'Restores silky softness, manageability, and natural shine',
      'Gentle scalp stimulation to encourage circulation'
    ]
  },
  {
    id: 'scalp-detox-treatment',
    name: 'Scalp Detox Treatment',
    categoryTag: 'PURIFYING CARE',
    icon: Droplets,
    purpose: 'Clarifying scalp exfoliation therapy designed to unclog hair follicles, clear stubborn product buildup, and soothe irritation.',
    focusArea: 'Product residue, dry flakiness & congested follicles',
    keyBenefits: [
      'Gentle salicylic & tea tree botanical purification',
      'Balances scalp sebum without stripping moisture',
      'Creates a clean, revitalized environment for hair growth'
    ]
  },
  {
    id: 'keratin-smoothing-treatment',
    name: 'Keratin Smoothing Treatment',
    categoryTag: 'SMOOTHING COUTURE',
    icon: Wind,
    purpose: 'Advanced smoothing therapy formulated to realign damaged cuticles, seal in essential proteins, and dramatically reduce blow-dry time.',
    focusArea: 'Unruly, porous, and humidity-reactive hair textures',
    keyBenefits: [
      'Infuses hydrolysed keratin deep into the hair fiber',
      'Delivers long-lasting mirror shine and fluid movement',
      'Protects against environmental humidity and daily friction'
    ]
  },
  {
    id: 'hair-botox-treatment',
    name: 'Hair Botox Treatment',
    categoryTag: 'INTENSIVE PLUMPING',
    icon: Sparkles,
    purpose: 'Deep restorative anti-aging conditioning therapy that fills in thinning hair gaps and replenishes lost keratin, collagen, and lipids.',
    focusArea: 'Fine, brittle, over-processed, or aged hair strands',
    keyBenefits: [
      'Plumps each strand from within for natural fullness',
      'Deeply conditions without weighing down delicate textures',
      'Zero formaldehyde, gentle nourishing formulation'
    ]
  },
  {
    id: 'head-massage-therapy',
    name: 'Head Massage Therapy',
    categoryTag: 'AYURVEDIC CALM',
    icon: HeartHandshake,
    purpose: 'Traditional pressure-point scalp therapy utilizing warm botanical oils to melt tension, relieve stress, and stimulate root vitality.',
    focusArea: 'Tense scalp muscles, neck stiffness & mental stress',
    keyBenefits: [
      'Promotes micro-circulation to nourish hair roots',
      'Warm herbal oil blend deeply conditions the scalp skin',
      'Unhurried, deeply relaxing sensory experience'
    ]
  },
  {
    id: 'hair-repair-treatment',
    name: 'Hair Repair Treatment',
    categoryTag: 'BOND RECONSTRUCTION',
    icon: ShieldCheck,
    purpose: 'Targeted molecular reconstruction treatment designed to reconnect broken disulfide bonds and heal heat- or chemical-stressed hair.',
    focusArea: 'Bleached, chemically lightened, or heat-damaged hair',
    keyBenefits: [
      'Amino acid bond builders reinforce internal hair strength',
      'Significantly reduces breakage and split-end vulnerability',
      'Restores elasticity and structural resilience to hair'
    ]
  },
  {
    id: 'deep-conditioning-treatment',
    name: 'Deep Conditioning Treatment',
    categoryTag: 'MOISTURE INFUSION',
    icon: Layers,
    purpose: 'Moisture-locking hydration therapy with argan and shea botanicals that quenches parched strands and seals split cuticles.',
    focusArea: 'Dry, brittle, weathered, or color-faded hair',
    keyBenefits: [
      'Rich humectant blend traps moisture inside hair cortex',
      'Smooths coarse outer cuticles for instant light reflection',
      'Provides weightless silkiness and effortless detangling'
    ]
  },
  {
    id: 'frizz-control-treatment',
    name: 'Frizz Control Treatment',
    categoryTag: 'HUMIDITY SHIELD',
    icon: Wind,
    purpose: 'Humidity-resistant smoothing barrier therapy that seals open cuticle scales, eliminates static flyaways, and keeps hair disciplined.',
    focusArea: 'Porous textures prone to frizz in changing weather',
    keyBenefits: [
      'Creates a weightless protective moisture barrier',
      'Tames persistent flyaways while preserving natural body',
      'Leaves hair sleek, polished, and touchably soft'
    ]
  }
];

export default function HairRevivalLoungeSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16 sm:pt-24">
      {/* Section Header */}
      <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            RESTORATIVE HAIR CARE &amp; THERAPY SANCTUARY
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-tight">
          The Hair Revival Lounge
        </h2>

        <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

        <p className="font-serif text-sm sm:text-base text-[#465640] italic">
          Holistic Scalp Wellness, Intensive Bond Restoration &amp; Couture Hair Therapies
        </p>

        <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto">
          An unhurried sanctuary dedicated to hair health, cortex repair, and scalp rejuvenation. Designed to address thermal stress, environmental fatigue, and texture revival through personalized, botanical-rich treatments.
        </p>
      </ScrollReveal>

      {/* 8 Responsive Treatment Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
        {HAIR_REVIVAL_SERVICES.map((service, index) => {
          const ServiceIcon = service.icon;
          const indexStr = String(index + 1).padStart(2, '0');

          return (
            <article
              key={service.id}
              className="group bg-white rounded-3xl p-6 sm:p-7 border border-[#DCE1D8] shadow-xs hover:shadow-xl hover:border-[#263D2B] transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Top Accent & Index */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#A8B5A0] group-hover:text-[#263D2B] transition-colors">
                    {indexStr}
                  </span>
                  <span className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#465640] px-2.5 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] group-hover:border-[#263D2B]/30 transition-colors">
                    {service.categoryTag}
                  </span>
                </div>

                {/* Service Name */}
                <div className="space-y-1.5">
                  <div className="w-8 h-8 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-center text-[#263D2B] group-hover:bg-[#263D2B] group-hover:text-white transition-colors duration-300">
                    <ServiceIcon className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-[22px] font-normal text-[#10110F] leading-snug group-hover:text-[#263D2B] transition-colors pt-1">
                    {service.name}
                  </h3>
                </div>

                {/* Purpose & Target Area */}
                <div className="space-y-2 pt-1 border-t border-[#DCE1D8]/60">
                  <p className="text-xs text-[#6B7068] font-light leading-relaxed">
                    {service.purpose}
                  </p>
                  <p className="text-[11px] text-[#465640] font-medium">
                    <span className="text-[#6B7068] font-light">Target Focus:</span> {service.focusArea}
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="pt-2 border-t border-[#DCE1D8]/60 space-y-1.5">
                  <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#263D2B] block">
                    THERAPY HIGHLIGHTS
                  </span>
                  <ul className="space-y-1.5 text-[11.5px] text-[#10110F]">
                    {service.keyBenefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#263D2B] mt-0.5 shrink-0" />
                        <span className="font-light leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Consultation & Booking Action */}
              <div className="pt-6 mt-6 border-t border-[#DCE1D8] flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-[11px] text-[#6B7068]">
                  <span className="font-light">Customized by hair density</span>
                  <span className="font-bold text-[#263D2B] uppercase tracking-wider text-[10px]">Private Suite</span>
                </div>

                <Link
                  to="/hair-atelier"
                  className="w-full py-2.5 px-4 rounded-full bg-[#F7F4ED] hover:bg-[#263D2B] text-[#263D2B] hover:text-white border border-[#DCE1D8] hover:border-[#263D2B] text-xs font-bold uppercase tracking-[0.14em] transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer text-center"
                >
                  <span>Explore in Hair Atelier</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>

            </article>
          );
        })}
      </div>

      {/* Lounge Assurance Banner */}
      <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-[#DCE1D8] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1 max-w-xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
            INDIVIDUALIZED FORMULATIONS
          </span>
          <h4 className="font-serif text-lg sm:text-xl font-normal text-[#10110F]">
            Every treatment is calibrated directly to your hair strand porosity &amp; scalp profile.
          </h4>
          <p className="text-xs text-[#6B7068] font-light">
            Have questions about whether Keratin, Botox, or an Ayurvedic Hair Spa is best for you? Complimentary 10-minute diagnostic consultations are included with your session.
          </p>
        </div>

        <Link
          to="/hair-atelier"
          className="global-button !px-7 !py-3 text-white text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-98 transition-all"
        >
          EXPLORE THE HAIR ATELIER
        </Link>
      </div>

    </section>
  );
}
