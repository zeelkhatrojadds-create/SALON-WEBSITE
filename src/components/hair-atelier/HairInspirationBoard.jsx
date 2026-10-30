import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Eye, 
  X, 
  Filter, 
  Sparkles, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Trash2, 
  Edit3, 
  Check 
} from 'lucide-react';
import { INSPIRATION_BOARD_LOOKS } from './hairAtelierData';

export default function HairInspirationBoard({ 
  savedInspirations = [], 
  onToggleSave, 
  onOpenConsultation 
}) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLength, setFilterLength] = useState('all');
  const [activeLightboxLook, setActiveLightboxLook] = useState(null);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [consultationNotes, setConsultationNotes] = useState(() => {
    try {
      return localStorage.getItem('glam_hair_board_notes') || '';
    } catch {
      return '';
    }
  });
  const [notesSavedAlert, setNotesSavedAlert] = useState(false);

  // Filtered looks
  const filteredLooks = INSPIRATION_BOARD_LOOKS.filter((item) => {
    if (filterCategory !== 'all') {
      if (filterCategory === 'cut' && !item.category.toLowerCase().includes('cut')) return false;
      if (filterCategory === 'colour' && !item.category.toLowerCase().includes('colour')) return false;
      if (filterCategory === 'ritual' && !item.category.toLowerCase().includes('ritual')) return false;
      if (filterCategory === 'styling' && !item.category.toLowerCase().includes('styling') && !item.category.toLowerCase().includes('blowout')) return false;
      if (filterCategory === 'bridal' && !item.category.toLowerCase().includes('bridal')) return false;
    }
    if (filterLength !== 'all') {
      if (item.length !== 'all' && item.length !== filterLength) return false;
    }
    return true;
  });

  const isItemSaved = (id) => savedInspirations.some((s) => s.id === id);

  const handleSaveNotes = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('glam_hair_board_notes', consultationNotes);
      setNotesSavedAlert(true);
      setTimeout(() => setNotesSavedAlert(false), 3000);
    } catch {}
  };

  // Lightbox navigation
  const openLightbox = (look) => setActiveLightboxLook(look);
  const closeLightbox = () => setActiveLightboxLook(null);

  const currentIdx = activeLightboxLook 
    ? filteredLooks.findIndex((l) => l.id === activeLightboxLook.id) 
    : -1;

  const handlePrevLightbox = () => {
    if (currentIdx > 0) {
      setActiveLightboxLook(filteredLooks[currentIdx - 1]);
    } else {
      setActiveLightboxLook(filteredLooks[filteredLooks.length - 1]);
    }
  };

  const handleNextLightbox = () => {
    if (currentIdx < filteredLooks.length - 1 && currentIdx !== -1) {
      setActiveLightboxLook(filteredLooks[currentIdx + 1]);
    } else {
      setActiveLightboxLook(filteredLooks[0]);
    }
  };

  return (
    <section id="hair-inspiration-board" className="py-16 sm:py-24 border-t border-[#DCE1D8] bg-[#F7F4ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header with Saved Looks Trigger Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
              <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
                INTERACTIVE HAIR MOODBOARD
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
              Hair Inspiration Board
            </h2>
            <p className="text-xs sm:text-sm text-[#465640] leading-relaxed font-light">
              Explore real salon client transformations and editorial styles. Tap to enlarge, save your favourite looks to your session moodboard, and take your vision into your 1-on-1 consultation.
            </p>
          </div>

          {/* Saved Drawer Open Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSavedDrawerOpen(true)}
              className="global-button !px-5 !py-3.5 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Heart className={`w-4 h-4 ${savedInspirations.length > 0 ? 'fill-current' : ''}`} />
              <span>Review Saved Looks</span>
              {savedInspirations.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-[#263D2B] text-[11px] font-bold flex items-center justify-center font-mono">
                  {savedInspirations.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#DCE1D8] shadow-xs">
          
          {/* Discipline Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#6B7068] mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Style:
            </span>
            {[
              { id: 'all', label: 'All Styles' },
              { id: 'cut', label: 'Precision Cuts' },
              { id: 'colour', label: 'Hair Colour' },
              { id: 'ritual', label: 'Hair Rituals' },
              { id: 'styling', label: 'Blowouts & Waves' },
              { id: 'bridal', label: 'Bridal' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterCategory(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filterCategory === tab.id
                    ? 'bg-[#263D2B] text-white shadow-xs'
                    : 'text-[#465640] hover:text-[#10110F] hover:bg-[#F7F4ED]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Length Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#6B7068] mr-1">Length:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'short', label: 'Short' },
              { id: 'medium', label: 'Medium' },
              { id: 'long', label: 'Long' }
            ].map((len) => (
              <button
                key={len.id}
                type="button"
                onClick={() => setFilterLength(len.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  filterLength === len.id
                    ? 'bg-[#10110F] text-white font-bold'
                    : 'text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED]'
                }`}
              >
                {len.label}
              </button>
            ))}
          </div>

        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredLooks.map((look) => {
            const saved = isItemSaved(look.id);
            return (
              <div
                key={look.id}
                className="rounded-2xl bg-white border border-[#DCE1D8] overflow-hidden shadow-xs hover:border-[#263D2B] hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div 
                  className="relative aspect-[4/3] bg-neutral-900 overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(look)}
                >
                  <img
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-full bg-white/90 text-[#10110F] text-xs font-bold flex items-center gap-1.5 shadow-md">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Enlarge</span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onToggleSave) onToggleSave(look);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                      saved
                        ? 'bg-[#263D2B] text-white shadow-md'
                        : 'bg-white/80 text-[#263D2B] hover:bg-white'
                    }`}
                    aria-label={saved ? 'Remove from saved' : 'Save to favourites'}
                  >
                    <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
                  </button>
                  <span className="absolute bottom-3 left-3 bg-[#10110F]/80 backdrop-blur-md text-[10px] font-mono text-white px-2.5 py-0.5 rounded-full">
                    {look.category}
                  </span>
                </div>

                <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 
                      onClick={() => openLightbox(look)}
                      className="font-serif text-base text-[#10110F] font-medium hover:text-[#263D2B] transition-colors cursor-pointer"
                    >
                      {look.title}
                    </h4>
                    <p className="text-[11px] text-[#6B7068] leading-relaxed line-clamp-2">
                      {look.caption}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#DCE1D8] flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-[#10110F]">${look.price} CAD</span>
                    <button
                      type="button"
                      onClick={() => openLightbox(look)}
                      className="text-[#263D2B] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Temporary Storage Transparency Notice */}
        <div className="text-center text-[11px] text-[#6B7068] font-mono">
          <span>&bull; Note: Saved favourite looks and consultation notes are stored in your current browser session.</span>
        </div>

      </div>

      {/* ===================================================================== */}
      {/* ACCESSIBLE LIGHTBOX MODAL                                             */}
      {/* ===================================================================== */}
      {activeLightboxLook && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={activeLightboxLook.title}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 text-[#10110F] hover:bg-white shadow-md cursor-pointer"
              aria-label="Close image modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image View (Uncropped Full Image) */}
            <div className="md:w-1/2 bg-neutral-950 flex items-center justify-center relative p-2">
              <img
                src={activeLightboxLook.image}
                alt={activeLightboxLook.title}
                className="w-full h-auto max-h-[70vh] object-contain block rounded-2xl"
              />
              {/* Previous / Next buttons */}
              <button
                type="button"
                onClick={handlePrevLightbox}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black cursor-pointer"
                aria-label="Previous look"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextLightbox}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black cursor-pointer"
                aria-label="Next look"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Information & Actions */}
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[10.5px] font-mono text-[#263D2B]">
                  <span>{activeLightboxLook.category}</span>
                </div>
                <h3 className="font-serif text-2xl text-[#10110F] font-normal">
                  {activeLightboxLook.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#465640] leading-relaxed">
                  {activeLightboxLook.caption}
                </p>

                <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2 text-xs">
                  <div className="flex justify-between text-[#6B7068]">
                    <span>Catalog Service:</span>
                    <strong className="text-[#10110F]">{activeLightboxLook.serviceName}</strong>
                  </div>
                  <div className="flex justify-between text-[#6B7068]">
                    <span>Salon Price:</span>
                    <strong className="text-[#263D2B] font-mono font-bold">${activeLightboxLook.price} CAD</strong>
                  </div>
                  <div className="flex justify-between text-[#6B7068]">
                    <span>Approx. Duration:</span>
                    <span className="text-[#10110F] font-mono">{activeLightboxLook.duration}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#DCE1D8]">
                <button
                  type="button"
                  onClick={() => onToggleSave && onToggleSave(activeLightboxLook)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                    isItemSaved(activeLightboxLook.id)
                      ? 'bg-[#263D2B] text-white border-[#263D2B]'
                      : 'bg-white text-[#263D2B] border-[#263D2B] hover:bg-[#F7F4ED]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isItemSaved(activeLightboxLook.id) ? 'fill-current' : ''}`} />
                  <span>{isItemSaved(activeLightboxLook.id) ? 'Saved to Your Moodboard' : 'Save to Moodboard'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    closeLightbox();
                    if (onOpenConsultation) onOpenConsultation(activeLightboxLook);
                  }}
                  className="global-button w-full !py-3 text-center text-white text-xs font-bold uppercase tracking-wider block cursor-pointer"
                >
                  Request Consultation for This Look
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SAVED SELECTIONS DRAWER / MODAL                                       */}
      {/* ===================================================================== */}
      {isSavedDrawerOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end"
          onClick={() => setIsSavedDrawerOpen(false)}
        >
          <div 
            className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6 sm:p-8 overscroll-contain animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#DCE1D8]">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#263D2B] fill-current" />
                  <h3 className="font-serif text-xl text-[#10110F]">My Saved Looks ({savedInspirations.length})</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSavedDrawerOpen(false)}
                  className="p-1.5 rounded-full hover:bg-[#F7F4ED] text-[#6B7068] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="py-4 space-y-3 max-h-[45vh] overflow-y-auto pr-1">
                {savedInspirations.length === 0 ? (
                  <div className="py-12 text-center text-[#6B7068] space-y-2">
                    <Heart className="w-8 h-8 text-[#A8B5A0] mx-auto stroke-1" />
                    <p className="text-xs">No saved looks yet.</p>
                    <p className="text-[11px] text-[#A8B5A0]">Tap the heart icon on any hair inspiration to save it here.</p>
                  </div>
                ) : (
                  savedInspirations.map((item) => (
                    <div 
                      key={item.id}
                      className="p-3 rounded-2xl border border-[#DCE1D8] bg-[#F7F4ED] flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-900 border border-[#DCE1D8] shrink-0">
                          <img src={item.image} alt={item.title || item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#10110F] truncate">{item.title || item.name}</div>
                          <div className="text-[11px] font-mono text-[#263D2B]">${item.price} CAD</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onToggleSave && onToggleSave(item)}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Consultation Notes Area */}
              <form onSubmit={handleSaveNotes} className="pt-4 border-t border-[#DCE1D8] space-y-2">
                <label className="text-xs font-bold text-[#10110F] flex items-center justify-between">
                  <span>My Consultation Vision Notes:</span>
                  {notesSavedAlert && (
                    <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Saved!
                    </span>
                  )}
                </label>
                <textarea
                  rows={3}
                  value={consultationNotes}
                  onChange={(e) => setConsultationNotes(e.target.value)}
                  placeholder="Notes about your hair goals to discuss during your appointment..."
                  className="w-full text-xs p-3 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                />
                <button
                  type="submit"
                  className="text-xs text-[#263D2B] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Update Notes</span>
                </button>
              </form>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#DCE1D8] space-y-2">
              <button
                type="button"
                onClick={() => {
                  setIsSavedDrawerOpen(false);
                  if (onOpenConsultation) {
                    onOpenConsultation({
                      savedLooks: savedInspirations,
                      notes: consultationNotes
                    });
                  }
                }}
                className="global-button w-full !py-3 text-white text-xs font-bold uppercase tracking-wider text-center cursor-pointer block"
              >
                Proceed with Saved Looks to Consultation
              </button>

              <button
                type="button"
                onClick={() => setIsSavedDrawerOpen(false)}
                className="global-button-secondary w-full !py-2.5 text-center text-xs font-semibold cursor-pointer block"
              >
                Close Drawer
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
