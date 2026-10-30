import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Send, 
  Heart, 
  Check, 
  Calendar, 
  Info, 
  Droplets, 
  ArrowRight, 
  ShieldCheck, 
  Flower2 
} from 'lucide-react';
import { 
  TRANSFORMATION_LOOKS, 
  COLOUR_ATELIER_TECHNIQUES, 
  COLOUR_ATELIER_SHADES, 
  HAIR_RITUAL_CONCERNS, 
  RITUAL_SERVICES_CATALOG, 
  STYLING_LOUNGE_CATEGORIES, 
  STYLING_LOUNGE_LOOKS, 
  BRIDAL_HAIR_GALLERY 
} from './hairAtelierData';

export default function HairSignatureExperiences({ onOpenConsultation, onSaveInspiration, savedInspirations = [] }) {
  // ---------------------------------------------------------------------------
  // A. The Transformation Room State
  // ---------------------------------------------------------------------------
  const [selectedLength, setSelectedLength] = useState('all');
  const [selectedTexture, setSelectedTexture] = useState('all');
  const [selectedLookId, setSelectedLookId] = useState(TRANSFORMATION_LOOKS[0].id);
  const [customVisionNotes, setCustomVisionNotes] = useState('');
  const [visionNotesSaved, setVisionNotesSaved] = useState(false);

  const filteredTransformationLooks = TRANSFORMATION_LOOKS.filter((look) => {
    if (selectedLength !== 'all' && look.length !== selectedLength) return false;
    if (selectedTexture !== 'all' && look.texture !== selectedTexture) return false;
    return true;
  });

  const activeLook = TRANSFORMATION_LOOKS.find((l) => l.id === selectedLookId) || TRANSFORMATION_LOOKS[0];

  const handleSaveVisionNotes = (e) => {
    e.preventDefault();
    if (!customVisionNotes.trim()) return;
    try {
      localStorage.setItem('glam_hair_transformation_notes', customVisionNotes);
      setVisionNotesSaved(true);
      setTimeout(() => setVisionNotesSaved(false), 3500);
    } catch (err) {
      console.warn('LocalStorage error', err);
    }
  };

  // ---------------------------------------------------------------------------
  // B. The Colour Atelier State
  // ---------------------------------------------------------------------------
  const [selectedColourTechnique, setSelectedColourTechnique] = useState('all');

  const filteredShades = COLOUR_ATELIER_SHADES.filter((shade) => {
    if (selectedColourTechnique === 'all') return true;
    if (selectedColourTechnique === 'balayage') return shade.technique === 'balayage';
    if (selectedColourTechnique === 'highlights') return shade.technique === 'highlights';
    if (selectedColourTechnique === 'global') return shade.technique === 'global';
    if (selectedColourTechnique === 'blonde') return shade.family === 'blonde';
    if (selectedColourTechnique === 'brunette') return shade.family === 'brunette';
    if (selectedColourTechnique === 'grey-blending') return shade.family === 'grey-blending' || shade.technique === 'grey-blending';
    return true;
  });

  // ---------------------------------------------------------------------------
  // C. The Hair Ritual Studio State
  // ---------------------------------------------------------------------------
  const [selectedConcernId, setSelectedConcernId] = useState('dryness');
  const activeConcern = HAIR_RITUAL_CONCERNS.find((c) => c.id === selectedConcernId) || HAIR_RITUAL_CONCERNS[0];

  // ---------------------------------------------------------------------------
  // D. The Styling Lounge State
  // ---------------------------------------------------------------------------
  const [selectedStylingCategory, setSelectedStylingCategory] = useState('all');

  const filteredStylingLooks = STYLING_LOUNGE_LOOKS.filter((look) => {
    if (selectedStylingCategory === 'all') return true;
    return look.category === selectedStylingCategory;
  });

  // ---------------------------------------------------------------------------
  // E. The Bridal Hair Gallery State & Form
  // ---------------------------------------------------------------------------
  const [bridalForm, setBridalForm] = useState({
    eventDate: '',
    preferredStyle: 'Bridal Updo with Dupatta Setting',
    hairLength: 'Long (Below Shoulders)',
    notes: ''
  });
  const [bridalFormSuccess, setBridalFormSuccess] = useState(false);

  const handleBridalSubmit = (e) => {
    e.preventDefault();
    try {
      const existing = JSON.parse(localStorage.getItem('glam_bridal_requests') || '[]');
      existing.push({
        ...bridalForm,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('glam_bridal_requests', JSON.stringify(existing));
    } catch {}
    setBridalFormSuccess(true);
  };

  const isSaved = (id) => savedInspirations.some((item) => item.id === id);

  return (
    <div id="signature-experiences" className="py-16 sm:py-24 space-y-24 sm:space-y-32">
      
      {/* ===================================================================== */}
      {/* SECTION HEADER: 5 SIGNATURE EXPERIENCES                               */}
      {/* ===================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            CURATED ATELIER DISCIPLINES
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          Five Distinctive Hair Experiences
        </h2>
        <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed font-light">
          Unlike standard salon lists, every GLAM GIRL hair experience is hosted in a peaceful, single-guest Ottawa sanctuary with authentic pricing, dedicated 1:1 attention, and master styling.
        </p>
      </div>

      {/* ===================================================================== */}
      {/* EXPERIENCE A: THE TRANSFORMATION ROOM                                 */}
      {/* ===================================================================== */}
      <section id="experience-transformation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#DCE1D8]">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B] block">
                EXPERIENCE A &bull; CUT &amp; TEXTURAL ARCHITECTURE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#10110F] font-normal">
                The Transformation Room
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7068] font-light">
                Explore customized perimeter shaping, density balance, and face-framing layers tailored to your natural bone structure and lifestyle.
              </p>
            </div>
            <div className="text-left md:text-right">
              <span className="text-xs font-mono text-[#263D2B] bg-[#F7F4ED] px-3 py-1.5 rounded-full border border-[#DCE1D8]">
                Precision Cuts &bull; Wash &amp; Blowout Included
              </span>
            </div>
          </div>

          {/* Interactive Dual Filters: Length & Texture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#10110F] block mb-2">
                1. Select Hair Length:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Lengths' },
                  { id: 'short', label: 'Short' },
                  { id: 'medium', label: 'Medium' },
                  { id: 'long', label: 'Long' }
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setSelectedLength(btn.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedLength === btn.id
                        ? 'bg-[#263D2B] text-white shadow-xs'
                        : 'bg-[#F7F4ED] text-[#465640] hover:bg-white border border-[#DCE1D8]'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#10110F] block mb-2">
                2. Select Hair Texture:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Textures' },
                  { id: 'straight', label: 'Straight' },
                  { id: 'wavy', label: 'Wavy' },
                  { id: 'curly', label: 'Curly' },
                  { id: 'textured', label: 'Textured' }
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setSelectedTexture(btn.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedTexture === btn.id
                        ? 'bg-[#263D2B] text-white shadow-xs'
                        : 'bg-[#F7F4ED] text-[#465640] hover:bg-white border border-[#DCE1D8]'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Look Selector Grid & Active Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
            
            {/* Left: Inspiration Cards Selection */}
            <div className="lg:col-span-7 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7068] block">
                3. Choose Desired Look Inspiration:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
                {filteredTransformationLooks.map((look) => {
                  const isSelected = look.id === selectedLookId;
                  return (
                    <div
                      key={look.id}
                      onClick={() => setSelectedLookId(look.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex gap-3 items-center ${
                        isSelected
                          ? 'border-[#263D2B] bg-[#263D2B]/5 shadow-sm ring-1 ring-[#263D2B]'
                          : 'border-[#DCE1D8] bg-white hover:border-[#465640] hover:bg-[#F7F4ED]/50'
                      }`}
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-900 border border-[#DCE1D8] shrink-0">
                        <img
                          src={look.image}
                          alt={look.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#10110F] truncate">{look.title}</div>
                        <div className="text-[10px] font-mono text-[#263D2B] mt-0.5">${look.price} CAD &bull; {look.duration}</div>
                        <div className="text-[11px] text-[#6B7068] capitalize mt-0.5">{look.length} &bull; {look.texture}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Active Transformation Showcase Card */}
            <div className="lg:col-span-5 bg-[#F7F4ED] rounded-3xl border border-[#DCE1D8] p-6 space-y-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#DCE1D8] bg-neutral-900 shadow-md">
                <img
                  src={activeLook.image}
                  alt={activeLook.title}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSaveInspiration) onSaveInspiration(activeLook);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                    isSaved(activeLook.id)
                      ? 'bg-[#263D2B] text-white'
                      : 'bg-white/80 text-[#263D2B] hover:bg-white'
                  }`}
                  aria-label="Save to moodboard"
                >
                  <Heart className={`w-4 h-4 ${isSaved(activeLook.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#263D2B] block">
                  APPROVED SALON SERVICE: {activeLook.serviceName}
                </span>
                <h4 className="font-serif text-xl text-[#10110F] font-normal">
                  {activeLook.title}
                </h4>
                <p className="text-xs text-[#465640] leading-relaxed">
                  {activeLook.description}
                </p>
                <div className="p-2.5 rounded-xl bg-white border border-[#DCE1D8] text-[11px] text-[#6B7068]">
                  <strong className="text-[#10110F]">Ideal Hair Profile:</strong> {activeLook.idealFor}
                </div>
              </div>

              {/* Consultation Notes Form */}
              <form onSubmit={handleSaveVisionNotes} className="space-y-2 pt-2 border-t border-[#DCE1D8]">
                <label className="text-[11px] font-bold text-[#10110F] block">
                  Add Optional Style &amp; Vision Notes:
                </label>
                <textarea
                  rows={2}
                  value={customVisionNotes}
                  onChange={(e) => setCustomVisionNotes(e.target.value)}
                  placeholder="e.g. Keep curtain bangs long, prefer blunt perimeters with soft interior weight removal..."
                  className="w-full text-xs p-2.5 rounded-xl border border-[#DCE1D8] bg-white text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none focus:border-[#263D2B]"
                />
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="text-[11px] font-bold text-[#263D2B] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                    <span>Save Note to Session</span>
                  </button>
                  {visionNotesSaved && (
                    <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 animate-fade-in">
                      <Check className="w-3.5 h-3.5" /> Saved!
                    </span>
                  )}
                </div>
              </form>

              {/* Matching Service Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenConsultation && onOpenConsultation(activeLook)}
                  className="global-button w-full !py-3 text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Request Consultation for {activeLook.serviceName}</span>
                </button>
              </div>

              {/* Advisory Disclaimer */}
              <div className="flex items-start gap-2 pt-1 text-[10.5px] text-[#6B7068] leading-tight">
                <Info className="w-3.5 h-3.5 text-[#263D2B] shrink-0 mt-0.5" />
                <span>
                  <strong>Salon Advisory:</strong> Style guides are for creative direction. Every cut is sculpted individually according to personal density and facial architecture during your appointment.
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* EXPERIENCE B: THE COLOUR ATELIER                                      */}
      {/* ===================================================================== */}
      <section id="experience-colour" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#10110F] text-white rounded-3xl border border-[#263D2B] p-6 sm:p-10 lg:p-12 shadow-2xl space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#A8B5A0] block">
                EXPERIENCE B &bull; MULTI-DIMENSIONAL TONAL COLOR
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal">
                The Colour Atelier
              </h3>
              <p className="text-xs sm:text-sm text-[#A8B5A0] font-light">
                Discover seamless balayage, dimensional foil placement, and rich botanical glazes. Formulated with Olaplex fiber reinforcement and ammonia-free botanicals.
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={() => onOpenConsultation && onOpenConsultation({ type: 'hair-colour' })}
                className="global-button !bg-white !text-[#10110F] hover:!bg-[#F7F4ED] !py-3 !px-6 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <Droplets className="w-4 h-4 text-[#263D2B]" />
                <span>Request Colour Consultation</span>
              </button>
            </div>
          </div>

          {/* Technique Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {COLOUR_ATELIER_TECHNIQUES.map((tech) => (
              <button
                key={tech.id}
                onClick={() => setSelectedColourTechnique(tech.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  selectedColourTechnique === tech.id
                    ? 'bg-[#263D2B] text-white border border-[#A8B5A0]/40 shadow-sm'
                    : 'bg-white/5 text-[#A8B5A0] hover:bg-white/10 border border-white/10'
                }`}
              >
                {tech.name}
              </button>
            ))}
          </div>

          {/* Interactive Shade Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {filteredShades.map((shade) => (
              <div
                key={shade.id}
                className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-[#A8B5A0]/50 transition-all flex flex-col justify-between group"
              >
                <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden">
                  <img
                    src={shade.image}
                    alt={shade.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#10110F]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-[#A8B5A0] border border-white/15">
                    {shade.technique}
                  </div>
                  <button
                    type="button"
                    onClick={() => onSaveInspiration && onSaveInspiration(shade)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                      isSaved(shade.id)
                        ? 'bg-[#263D2B] text-white'
                        : 'bg-black/60 text-white hover:bg-[#263D2B]'
                    }`}
                    aria-label="Save shade"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isSaved(shade.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h4 className="font-serif text-lg text-white font-normal group-hover:text-[#A8B5A0] transition-colors">
                      {shade.name}
                    </h4>
                    <p className="text-xs text-white/70 leading-relaxed font-light">
                      {shade.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-white/10 text-[11px] font-mono text-[#A8B5A0]">
                    <div className="flex justify-between">
                      <span>Tonal Reflect:</span>
                      <span className="text-white">{shade.glossTone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Maintenance:</span>
                      <span className="text-white">{shade.maintenance}</span>
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] text-[#A8B5A0] uppercase font-mono">Catalog Rate</div>
                      <div className="text-sm font-bold text-white font-mono">${shade.price} CAD</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenConsultation && onOpenConsultation({ name: shade.title, serviceName: shade.title, price: shade.price })}
                      className="px-4 py-2 rounded-xl bg-white text-[#10110F] hover:bg-[#F7F4ED] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <span>Inquire / Consult</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Transparency Bar */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A8B5A0]">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#A8B5A0]" />
              Includes customized Olaplex bond reinforcement &amp; botanical post-wash gloss.
            </span>
            <Link
              to="/hair-colour"
              className="text-white hover:underline font-semibold flex items-center gap-1"
            >
              <span>Explore Full Hair Colour Atelier Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* EXPERIENCE C: THE HAIR RITUAL STUDIO                                  */}
      {/* ===================================================================== */}
      <section id="experience-rituals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
          
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B] block">
              EXPERIENCE C &bull; BOTANICAL SPAS &amp; DAMAGE REPAIR
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#10110F] font-normal">
              The Hair Ritual Studio
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7068] font-light">
              Nourish strands at the cellular level with warm Ayurvedic oil compressions, botanical hair spas, and structural bond repair treatments.
            </p>
          </div>

          {/* Interactive Concern Selector */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#10110F] block">
              Identify Your Primary Hair &amp; Scalp Concern:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {HAIR_RITUAL_CONCERNS.map((concern) => {
                const isSelected = concern.id === selectedConcernId;
                return (
                  <div
                    key={concern.id}
                    onClick={() => setSelectedConcernId(concern.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                      isSelected
                        ? 'border-[#263D2B] bg-[#263D2B] text-white shadow-md'
                        : 'border-[#DCE1D8] bg-[#F7F4ED] text-[#10110F] hover:bg-white'
                    }`}
                  >
                    <div className="text-xs font-bold">{concern.name}</div>
                    <div className={`text-[11px] leading-snug font-light ${isSelected ? 'text-white/80' : 'text-[#6B7068]'}`}>
                      {concern.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Concern Solution Spotlight Card */}
          <div className="p-6 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white border border-[#DCE1D8] text-[10.5px] font-mono text-[#263D2B]">
                <Flower2 className="w-3 h-3" />
                <span>RECOMMENDED RITUAL: {activeConcern.recommendedServiceName}</span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal">
                {activeConcern.ritualSummary}
              </h4>
              <p className="text-xs text-[#465640]">
                <strong>Active Botanical Infusion:</strong> {activeConcern.keyActive}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <div className="text-right">
                <span className="text-xs text-[#6B7068] block">Verified CAD Rate</span>
                <span className="text-lg font-bold font-mono text-[#10110F]">${activeConcern.price} CAD ({activeConcern.duration})</span>
              </div>
              <button
                type="button"
                onClick={() => onOpenConsultation && onOpenConsultation({ name: activeConcern.ritualSummary, price: activeConcern.price })}
                className="global-button !px-6 !py-3 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Inquire About Ritual
              </button>
            </div>
          </div>

          {/* Complete 4-Ritual Catalog Comparison Grid */}
          <div className="space-y-4 pt-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7068] block">
              Side-by-Side Catalog Treatment Comparison:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {RITUAL_SERVICES_CATALOG.map((ritual) => (
                <div
                  key={ritual.id}
                  className="rounded-2xl border border-[#DCE1D8] bg-white p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3">
                    <div className="aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-[#DCE1D8]">
                      <img
                        src={ritual.image}
                        alt={ritual.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h5 className="font-serif text-base text-[#10110F] font-medium">{ritual.name}</h5>
                      <div className="text-[11px] font-mono text-[#263D2B] mt-0.5">${ritual.price} CAD &bull; {ritual.duration}</div>
                    </div>
                    <p className="text-[11px] text-[#6B7068] leading-relaxed">
                      {ritual.idealFor}
                    </p>
                    <div className="space-y-1 pt-2 border-t border-[#DCE1D8]">
                      <span className="text-[10px] font-mono uppercase text-[#465640] block">Included Steps:</span>
                      {ritual.includes.map((step, idx) => (
                        <div key={idx} className="text-[10.5px] text-[#10110F] flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-[#263D2B] shrink-0" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenConsultation && onOpenConsultation(ritual)}
                    className="global-button-secondary w-full !py-2.5 text-center text-xs font-semibold cursor-pointer block hover:border-[#263D2B]"
                  >
                    Consult on Ritual
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* EXPERIENCE D: THE STYLING LOUNGE                                      */}
      {/* ===================================================================== */}
      <section id="experience-styling" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#DCE1D8]">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B] block">
                EXPERIENCE D &bull; BLOWOUTS, UPDO &amp; COUTURE WAVES
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#10110F] font-normal">
                The Styling Lounge
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7068] font-light">
                From architectural glass-hair blowouts to romantic S-curve waves and regal evening updos. Every styling ritual uses luxury thermal protection.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {STYLING_LOUNGE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedStylingCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedStylingCategory === cat.id
                      ? 'bg-[#263D2B] text-white shadow-xs'
                      : 'bg-[#F7F4ED] text-[#465640] hover:bg-white border border-[#DCE1D8]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Styling Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStylingLooks.map((look) => (
              <div
                key={look.id}
                className="rounded-2xl border border-[#DCE1D8] bg-[#F7F4ED]/40 overflow-hidden hover:border-[#263D2B] transition-all flex flex-col justify-between group"
              >
                <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden">
                  <img
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <button
                    type="button"
                    onClick={() => onSaveInspiration && onSaveInspiration(look)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                      isSaved(look.id)
                        ? 'bg-[#263D2B] text-white'
                        : 'bg-white/80 text-[#263D2B] hover:bg-white'
                    }`}
                    aria-label="Save style"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isSaved(look.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#263D2B] block">
                      {look.vibe}
                    </span>
                    <h4 className="font-serif text-lg text-[#10110F] font-normal">
                      {look.title}
                    </h4>
                    <p className="text-xs text-[#6B7068] leading-relaxed">
                      {look.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#DCE1D8] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-[#6B7068] uppercase font-mono">{look.serviceName}</div>
                      <div className="text-sm font-bold font-mono text-[#10110F]">${look.price} CAD ({look.duration})</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenConsultation && onOpenConsultation({ name: look.serviceName, price: look.price })}
                      className="global-button !py-2 !px-4 text-xs font-bold uppercase tracking-wider text-white cursor-pointer"
                    >
                      Inquire Style
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* EXPERIENCE E: THE BRIDAL HAIR GALLERY & INQUIRY                       */}
      {/* ===================================================================== */}
      <section id="experience-bridal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F7F4ED] rounded-3xl border border-[#DCE1D8] p-6 sm:p-10 lg:p-12 shadow-md space-y-10">
          
          <div className="max-w-2xl space-y-2">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B] block">
              EXPERIENCE E &bull; BRIDAL COUTURE &amp; WEDDING CELEBRATIONS
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#10110F] font-normal">
              The Bridal Hair Gallery
            </h3>
            <p className="text-xs sm:text-sm text-[#465640] font-light">
              Master bridal hair artistry designed to withstand 12+ hours of wedding festivities, heavy dupatta setting, and studio photography with effortless grace.
            </p>
          </div>

          {/* Bridal Inspiration Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BRIDAL_HAIR_GALLERY.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-white border border-[#DCE1D8] overflow-hidden shadow-xs hover:border-[#263D2B] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] bg-neutral-900 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#263D2B] block">
                      {item.type}
                    </span>
                    <h5 className="font-serif text-base text-[#10110F]">{item.title}</h5>
                    <p className="text-[11px] text-[#6B7068] leading-relaxed font-light">
                      {item.description}
                    </p>
                    <div className="space-y-1 pt-2 border-t border-[#DCE1D8]">
                      {item.features.map((feat, idx) => (
                        <div key={idx} className="text-[10.5px] text-[#465640] flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-[#263D2B] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[#DCE1D8]">
                    <span className="font-bold text-[#10110F]">${item.price} CAD</span>
                    <button
                      type="button"
                      onClick={() => onOpenConsultation && onOpenConsultation({ name: item.title, price: item.price })}
                      className="text-[#263D2B] hover:underline font-semibold cursor-pointer text-xs"
                    >
                      Inquire &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bridal Consultation Request Form Box */}
          <div className="bg-white rounded-2xl border border-[#DCE1D8] p-6 sm:p-8 space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#263D2B] block">
                RESERVE YOUR BRIDAL HAIR SESSION
              </span>
              <h4 className="font-serif text-xl sm:text-2xl text-[#10110F]">
                Bridal Consultation &amp; Event Styling Request
              </h4>
              <p className="text-xs text-[#6B7068]">
                Provide your celebration details for an unhurried 1-on-1 consultation and dupatta/veil trial planning.
              </p>
            </div>

            {bridalFormSuccess ? (
              <div className="p-6 rounded-2xl bg-[#263D2B]/10 border border-[#263D2B] text-center space-y-2">
                <Check className="w-8 h-8 text-[#263D2B] mx-auto" />
                <h5 className="font-serif text-lg text-[#10110F]">Bridal Consultation Inquiry Received</h5>
                <p className="text-xs text-[#465640]">
                  Your event details have been recorded. Janki will review your requested date ({bridalForm.eventDate || 'upcoming'}) and connect with you to confirm your suite availability.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setBridalFormSuccess(false)}
                    className="global-button-secondary !py-2.5 !px-6 text-xs font-semibold cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBridalSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#10110F] block">Wedding / Event Date:</label>
                  <input
                    type="date"
                    required
                    value={bridalForm.eventDate}
                    onChange={(e) => setBridalForm({ ...bridalForm, eventDate: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#10110F] block">Preferred Hair Style:</label>
                  <select
                    value={bridalForm.preferredStyle}
                    onChange={(e) => setBridalForm({ ...bridalForm, preferredStyle: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  >
                    <option value="Bridal Updo with Dupatta Setting">Bridal Updo with Dupatta Setting</option>
                    <option value="Romantic Hollywood Cascading Waves">Romantic Hollywood Cascading Waves</option>
                    <option value="Half-Up Textured Sangeet Curls">Half-Up Textured Sangeet Curls</option>
                    <option value="Modern Architectural Low Chignon">Modern Architectural Low Chignon</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#10110F] block">Current Hair Length:</label>
                  <select
                    value={bridalForm.hairLength}
                    onChange={(e) => setBridalForm({ ...bridalForm, hairLength: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  >
                    <option value="Short to Collarbone">Short to Collarbone</option>
                    <option value="Medium (Shoulder Length)">Medium (Shoulder Length)</option>
                    <option value="Long (Below Shoulders)">Long (Below Shoulders)</option>
                    <option value="Very Long / Using Extensions">Very Long / Using Extensions</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#10110F] block">Veil / Dupatta &amp; Vision:</label>
                  <input
                    type="text"
                    value={bridalForm.notes}
                    onChange={(e) => setBridalForm({ ...bridalForm, notes: e.target.value })}
                    placeholder="e.g. Heavy velvet dupatta + floral tiara"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-4 pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-[11px] text-[#6B7068]">
                    Approved service rate: <strong>$110 CAD</strong> (60 min private session with Janki).
                  </span>
                  <button
                    type="submit"
                    className="global-button !py-3 !px-8 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Submit Bridal Consultation Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
