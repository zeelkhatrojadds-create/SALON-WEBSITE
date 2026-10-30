// GLAM GIRL BY JANKI — Special Treatments Landing Page
// Gateway to the salon's two signature couture disciplines: Nail Art Atelier & Hair Colour Studio

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  HeartHandshake, 
  Clock, 
  Palette, 
  Scissors, 
  CheckCircle2, 
  Phone,
  Layers,
  Compass
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal/ScrollReveal';
import HairRevivalLoungeSection from '../components/special-treatments/HairRevivalLoungeSection';
import HairTransformationStudioSection from '../components/special-treatments/HairTransformationStudioSection';

export default function SpecialTreatmentsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Special Treatments — Nail Art & Hair Colour | GLAM GIRL BY JANKI';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const specialTreatments = [
    {
      id: 'nail-art',
      title: 'The Nail Art Studio',
      subtitle: 'Haute Nail Atelier & 3D Sculpted Couture',
      tagline: 'From timeless elegance to bold statement nails',
      image: '/images/nails/3d/complex-nail-art.jpg',
      badge: 'ATELIER COUTURE',
      description: 'Step into an interactive nail art sanctuary featuring 7 precision shapes, our 3D Pattern Journal, rare-earth magnetic cat-eye simulator, 10-finger individual designer, and hand-carved floral sculptures.',
      highlights: [
        'Interactive Nail Shape & Color Customizer',
        '10-Finger Mix & Match Studio',
        'Magnetic Cat-Eye Optical Simulator',
        '3D Sculpted Blooms, Bows & Chrome Drips',
        'HEMA-Free & Hypoallergenic Gels'
      ],
      link: '/nail-art',
      actionLabel: 'EXPLORE NAIL ART ATELIER',
      icon: Palette
    },
    {
      id: 'hair-colour',
      title: 'The Hair Colour Atelier',
      subtitle: 'Balayage, Dimensional Lighting & Gloss Toning',
      tagline: 'Bespoke tones tailored to your unique complexion',
      image: '/images/hair-care/58-noor-balayage.webp',
      badge: 'HAUTE COLOUR',
      description: 'Discover master hand-painted Noor Balayage, whisper-thin babylights, seamless root melts, and rich ammonia-free global colours formulated with bond-building Olaplex for healthy, luminous hair.',
      highlights: [
        'Freehand Hand-Painted Noor Balayage',
        'Interactive Shade Explorer & Tone Swatches',
        'Interactive Colour Match Quiz',
        'Before & After Transformation Sliders',
        'Ammonia-Free & Olaplex Bond Formulations'
      ],
      link: '/hair-colour',
      actionLabel: 'EXPLORE HAIR COLOUR ATELIER',
      icon: Scissors
    },
    {
      id: 'mehndi-design-studio',
      title: 'Mehndi Design Studio',
      subtitle: 'Organic Henna Artistry & Bridal Couture',
      tagline: 'From timeless bridal patterns to modern minimalist designs',
      image: '/images/mehndi/mehndi-studio-card.webp',
      badge: 'HENNA COUTURE',
      description: 'Discover intricate henna artistry, from timeless bridal patterns to modern minimalist designs.',
      highlights: [
        'Interactive Design Preview Studio & Hand View',
        '10 Curated Style Collections & Bridal Showcase',
        'Personal Inspiration Board with Saved Designs',
        '100% Organic Rajasthani Henna Paste',
        'Bridal, Sangeet, Arabic & Minimal Modern Art'
      ],
      link: '/mehndi-design-studio',
      actionLabel: 'EXPLORE MEHNDI DESIGNS',
      icon: Sparkles
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#F7F4ED] text-[#10110F] pt-24 sm:pt-28 pb-20 selection:bg-[#263D2B] selection:text-white font-sans antialiased">
      
      {/* ========================================================================= */}
      {/* 1. HERO HEADER                                                            */}
      {/* ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 sm:pt-10 pb-12 sm:pb-16 text-center">
        <ScrollReveal className="max-w-4xl mx-auto space-y-4">
          
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
            <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-[#263D2B]">
              EXCLUSIVE ATELIER DISCIPLINES
            </span>
          </div>

          {/* Exact Heading Required */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#10110F] font-normal tracking-tight leading-[1.12]">
            Discover Our Special Treatments
          </h1>

          <div className="w-14 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

          {/* Subtitle */}
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto italic">
            &ldquo;Where imagination meets precision. Choose between our signature haute nail atelier, bespoke dimensional hair colour studio, and organic mehndi design studio.&rdquo;
          </p>

          {/* Trust Highlights */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-[#465640]">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#263D2B]" />
              Single-Guest Private Suite
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <HeartHandshake className="w-4 h-4 text-[#263D2B]" />
              Masterclass Direct Care by Janki
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-[#263D2B]" />
              Transparent Canadian Pricing
            </span>
          </div>

        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 2. SIGNATURE INTERACTIVE TREATMENT CARDS                                  */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {specialTreatments.map((treatment) => {
            const TreatmentIcon = treatment.icon;
            return (
              <div
                key={treatment.id}
                onClick={() => navigate(treatment.link)}
                className="group bg-white rounded-3xl border border-[#DCE1D8] overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#263D2B] transition-all duration-500 cursor-pointer flex flex-col justify-between relative"
              >
                {/* Top Image Frame with Smooth Hover Zoom */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={treatment.image}
                    alt={treatment.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = treatment.id === 'nail-art'
                        ? '/images/nails/nail-art-design.webp'
                        : treatment.id === 'mehndi-design-studio'
                        ? '/images/mehndi/mehndi-studio-card.webp'
                        : '/images/hair-care/58-noor-balayage.webp';
                    }}
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] border border-[#DCE1D8] shadow-xs flex items-center gap-1.5">
                    <TreatmentIcon className="w-3.5 h-3.5 text-[#263D2B]" />
                    <span>{treatment.badge}</span>
                  </div>

                  {/* Image Bottom Typography */}
                  <div className="absolute bottom-4 left-6 right-6 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#A8B5A0] block">
                      {treatment.subtitle}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal mt-0.5">
                      {treatment.title}
                    </h2>
                  </div>
                </div>

                {/* Card Content & Highlights */}
                <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <p className="text-xs sm:text-[13.5px] text-[#465640] leading-relaxed font-light">
                      {treatment.description}
                    </p>

                    <div className="pt-2 border-t border-[#DCE1D8]/70 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                        SIGNATURE EXPERIENCES
                      </span>
                      <ul className="space-y-2 text-xs text-[#10110F]">
                        {treatment.highlights.map((h, idx) => (
                          <li key={idx} className="flex items-center gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Action Button */}
                  <div className="pt-6 border-t border-[#DCE1D8]/80 flex items-center justify-between gap-4">
                    <Link
                      to={treatment.link}
                      onClick={(e) => e.stopPropagation()}
                      className="global-button !px-7 !py-3.5 text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2 group-hover:scale-[1.02] transition-transform cursor-pointer"
                    >
                      <span>{treatment.actionLabel}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <span className="text-xs font-semibold text-[#6B7068] group-hover:text-[#263D2B] transition-colors hidden sm:inline">
                      View Atelier Page →
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE HAIR REVIVAL LOUNGE                                                */}
      {/* ========================================================================= */}
      <HairRevivalLoungeSection />

      {/* ========================================================================= */}
      {/* 4. THE HAIR TRANSFORMATION STUDIO                                         */}
      {/* ========================================================================= */}
      <HairTransformationStudioSection />

      {/* ========================================================================= */}
      {/* 5. ATELIER PHILOSOPHY & APPOINTMENT SANCTUARY BANNER                      */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16 sm:pt-24">
        <ScrollReveal className="p-8 sm:p-12 rounded-3xl bg-white border border-[#DCE1D8] shadow-xs text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              <Sparkles className="w-4 h-4 text-[#263D2B]" />
              UNHURRIED BESPOKE BEAUTY CARE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#10110F]">
              Crafted with Care, Completed with Precision
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed max-w-lg mx-auto font-light">
              Whether you are refining your nail silhouette or illuminating your hair with Parisian balayage, every appointment is single-guest and custom-formulated for you.
            </p>

            <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
              <Link
                to="/services"
                className="global-button !px-8 !py-3.5 text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
              >
                EXPLORE COMPLETE SERVICE MENU
              </Link>
              <Link
                to="/about"
                className="global-button-secondary !px-8 !py-3.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                ABOUT JANKI PATEL
              </Link>
            </div>

            <div className="pt-4 border-t border-[#DCE1D8] flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#6B7068]">
              <span>Ottawa Private Suite</span>
              <span>•</span>
              <span>
                Direct Concierge: <a href="tel:+16162550549" className="font-semibold text-[#10110F] hover:text-[#263D2B]">+1 (616) 255-0549</a>
              </span>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
