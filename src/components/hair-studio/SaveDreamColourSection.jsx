import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Bookmark, 
  Trash2, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Edit3, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  ExternalLink, 
  Check, 
  X, 
  Copy, 
  Info, 
  Clock, 
  ShieldCheck, 
  Palette, 
  RotateCcw, 
  HelpCircle, 
  Camera, 
  Layers, 
  UserCheck, 
  HeartHandshake 
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';
import { 
  getSavedDreamCollection, 
  removeSavedItem, 
  clearDreamCollection, 
  updateItemNote,
  isShadeSaved,
  isInspirationSaved
} from '../../utils/dreamColourStorage';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

export default function SaveDreamColourSection({ onSelectShadeInExplorer }) {
  const navigate = useNavigate();

  // Unified collection state synchronized with dreamColourStorage
  const [collection, setCollection] = useState(() => getSavedDreamCollection());
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return salonDB.getCurrentUser();
    } catch {
      return null;
    }
  });

  // UI State: Active Tab ('moodboard' | 'shades' | 'inspirations')
  const [activeTab, setActiveTab] = useState('moodboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent'); // 'recent' | 'name-asc' | 'name-desc'

  // Modals & Dialogs
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const [editingNoteItem, setEditingNoteItem] = useState(null); // { id, type, note, title }
  const [noteDraft, setNoteDraft] = useState('');
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Synchronize on cross-component events and DB auth events
  useEffect(() => {
    const handleUpdate = () => {
      setCollection(getSavedDreamCollection());
    };
    const handleAuth = () => {
      try {
        setCurrentUser(salonDB.getCurrentUser());
      } catch {}
      setCollection(getSavedDreamCollection());
    };

    window.addEventListener('glam_dream_colour_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    const unsubDB = salonDB.subscribe(handleAuth);

    return () => {
      window.removeEventListener('glam_dream_colour_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
      unsubDB();
    };
  }, []);

  const totalShadesCount = collection.shades?.length || 0;
  const totalInspirationsCount = collection.inspirations?.length || 0;
  const totalSavedCount = totalShadesCount + totalInspirationsCount;

  // Dynamically collect filter tags present across saved items
  const availableFilterOptions = useMemo(() => {
    const options = new Set();
    collection.shades?.forEach((s) => {
      if (s.familyName) options.add(s.familyName);
    });
    collection.inspirations?.forEach((insp) => {
      if (insp.techniqueName) options.add(insp.techniqueName);
    });
    return Array.from(options).sort();
  }, [collection]);

  // Filter and Sort: Shades
  const filteredShades = useMemo(() => {
    let list = [...(collection.shades || [])];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.name?.toLowerCase().includes(q) ||
          s.familyName?.toLowerCase().includes(q) ||
          s.note?.toLowerCase().includes(q)
      );
    }
    if (categoryFilter !== 'all') {
      list = list.filter((s) => s.familyName === categoryFilter);
    }
    if (sortBy === 'name-asc') {
      list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else if (sortBy === 'name-desc') {
      list.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
    } else {
      list.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
    }
    return list;
  }, [collection.shades, searchQuery, categoryFilter, sortBy]);

  // Filter and Sort: Inspirations
  const filteredInspirations = useMemo(() => {
    let list = [...(collection.inspirations || [])];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (insp) =>
          insp.title?.toLowerCase().includes(q) ||
          insp.techniqueName?.toLowerCase().includes(q) ||
          insp.note?.toLowerCase().includes(q) ||
          insp.vibe?.toLowerCase().includes(q)
      );
    }
    if (categoryFilter !== 'all') {
      list = list.filter((insp) => insp.techniqueName === categoryFilter);
    }
    if (sortBy === 'name-asc') {
      list.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    } else if (sortBy === 'name-desc') {
      list.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
    } else {
      list.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
    }
    return list;
  }, [collection.inspirations, searchQuery, categoryFilter, sortBy]);

  // Handle Remove Item
  const handleRemove = (id, type) => {
    removeSavedItem(id, type);
  };

  // Handle Clear Entire Collection
  const handleConfirmClear = () => {
    clearDreamCollection();
    setIsClearConfirmOpen(false);
  };

  // Handle Note Edit
  const openNoteEditor = (item, type) => {
    setEditingNoteItem({ id: item.id, type, title: item.name || item.title, note: item.note || '' });
    setNoteDraft(item.note || '');
  };

  const saveNoteDraft = () => {
    if (editingNoteItem) {
      updateItemNote(editingNoteItem.id, noteDraft.trim(), editingNoteItem.type);
      setEditingNoteItem(null);
      setNoteDraft('');
    }
  };

  // Navigate back to the Shade Explorer and select this exact shade
  const handleJumpToExplorer = (shade) => {
    if (onSelectShadeInExplorer) {
      onSelectShadeInExplorer(shade.familyId, shade.id);
    }
    const el = document.getElementById('shade-explorer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Prepare Consultation Notes text
  const generateConsultationSummary = () => {
    const shadesList = collection.shades?.map((s) => `• ${s.name} (${s.familyName}${s.baseLevel ? `, ${s.baseLevel}` : ''})${s.note ? ` — Note: "${s.note}"` : ''}`).join('\n') || 'None selected';
    const inspoList = collection.inspirations?.map((i) => `• ${i.title} (${i.techniqueName})${i.note ? ` — Note: "${i.note}"` : ''}`).join('\n') || 'None selected';

    return `GLAM GIRL BY JANKI — Hair Colour Consultation Dossier
Guest: ${currentUser?.name || 'Private Guest'}
Date: ${new Date().toLocaleDateString('en-CA', { dateStyle: 'medium' })}

--- MY SAVED DREAM SHADES ---
${shadesList}

--- MY INSPIRATION BOARD ---
${inspoList}

Consultation Goals:
- Assess natural undertones and face-framing dimensional placement
- Confirm bond-protected lightening protocol (Olaplex)
- Establish tailored grow-out and gloss maintenance roadmap`;
  };

  const handleCopySummary = () => {
    const text = generateConsultationSummary();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    }
  };

  // Connect to Booking flow with pre-populated consultation notes
  const handleBookConsultation = () => {
    const primaryService = collection.shades?.[0]?.serviceId || collection.inspirations?.[0]?.serviceId || 'noor-balayage';
    const shadesSummary = collection.shades?.map((s) => s.name).join(', ');
    const techniquesSummary = collection.inspirations?.map((i) => i.techniqueName).join(', ');

    let notesText = 'Dream Colour Consultation:';
    if (shadesSummary) notesText += ` Preferred Shades: ${shadesSummary}.`;
    if (techniquesSummary) notesText += ` Inspirations: ${techniquesSummary}.`;

    navigate(`/book-appointment?service=${encodeURIComponent(primaryService)}&notes=${encodeURIComponent(notesText)}`);
  };

  const isFiltered = searchQuery.trim() !== '' || categoryFilter !== 'all' || sortBy !== 'recent';

  return (
    <section 
      id="dream-colour-collection"
      aria-labelledby="dream-colour-heading"
      className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16 sm:pt-24 pb-12 sm:pb-20 scroll-mt-24 font-sans"
    >
      {/* ========================================================================= */}
      {/* 1. SECTION INTRODUCTION                                                   */}
      {/* ========================================================================= */}
      <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B] shadow-xs">
          <Heart className="w-3.5 h-3.5 fill-[#263D2B] text-[#263D2B]" />
          <span>PERSONAL COLOUR MOODBOARD</span>
        </div>

        <h2 
          id="dream-colour-heading"
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]"
        >
          Save Your Dream Colour
        </h2>

        <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

        <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto italic">
          Collect the shades you love, save your favourite inspiration images, and build your personal colour moodboard before your salon visit.
        </p>

        {/* Persistence & Account Awareness Indicator */}
        <div className="pt-2 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[11px] text-[#465640] shadow-2xs">
            {currentUser ? (
              <>
                <UserCheck className="w-3.5 h-3.5 text-[#263D2B]" />
                <span>Saved to your Glam Girl profile (<strong>{currentUser.email}</strong>)</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-[#465640]" />
                <span>Saved locally in this browser. <button onClick={() => navigate('/login')} className="text-[#263D2B] underline font-semibold cursor-pointer">Sign in</button> to sync across devices.</span>
              </>
            )}
          </div>
        </div>
      </ScrollReveal>

      {/* ========================================================================= */}
      {/* 2. COLLECTION NAV TABS & TOP TOOLBAR                                      */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#DCE1D8] shadow-xs mb-8 space-y-5">
        
        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DCE1D8] pb-4">
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Moodboard Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('moodboard')}
              className={`inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer border ${
                activeTab === 'moodboard'
                  ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-sm'
                  : 'bg-[#F7F4ED] text-[#465640] border-[#DCE1D8] hover:border-[#263D2B] hover:text-[#10110F]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Personal Moodboard</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                activeTab === 'moodboard' ? 'bg-[#18271B] text-[#A8B5A0]' : 'bg-white text-[#6B7068]'
              }`}>
                {totalSavedCount}
              </span>
            </button>

            {/* My Favourite Shades Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('shades')}
              className={`inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer border ${
                activeTab === 'shades'
                  ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-sm'
                  : 'bg-[#F7F4ED] text-[#465640] border-[#DCE1D8] hover:border-[#263D2B] hover:text-[#10110F]'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>My Favourite Shades</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                activeTab === 'shades' ? 'bg-[#18271B] text-[#A8B5A0]' : 'bg-white text-[#6B7068]'
              }`}>
                {totalShadesCount}
              </span>
            </button>

            {/* My Inspiration Board Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('inspirations')}
              className={`inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer border ${
                activeTab === 'inspirations'
                  ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-sm'
                  : 'bg-[#F7F4ED] text-[#465640] border-[#DCE1D8] hover:border-[#263D2B] hover:text-[#10110F]'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>My Inspiration Board</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                activeTab === 'inspirations' ? 'bg-[#18271B] text-[#A8B5A0]' : 'bg-white text-[#6B7068]'
              }`}>
                {totalInspirationsCount}
              </span>
            </button>

          </div>

          {/* Quick Action CTAs: Prepare for Consultation & Clear */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {totalSavedCount > 0 && (
              <>
                <button
                  type="button"
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="global-button !py-2 !px-4 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#A8B5A0]" />
                  <span>Prepare for Consultation</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsClearConfirmOpen(true)}
                  className="p-2 text-[#6B7068] hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors cursor-pointer border border-[#DCE1D8]"
                  title="Clear entire collection"
                  aria-label="Clear collection"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Search, Filter & Sort Controls */}
        {totalSavedCount > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <label htmlFor="dream-search" className="sr-only">Search saved items</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7068] pointer-events-none" />
                <input
                  id="dream-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search saved shades, looks, or notes..."
                  className="w-full pl-10 pr-10 py-2 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs sm:text-sm text-[#10110F] placeholder-[#6B7068] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7068] hover:text-[#10110F] p-1 cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter by Category/Technique */}
            <div className="md:col-span-4 flex items-center gap-2">
              <label htmlFor="dream-filter" className="text-xs font-semibold text-[#10110F] whitespace-nowrap hidden sm:inline">
                Filter:
              </label>
              <select
                id="dream-filter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full py-2 px-3 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#263D2B]"
              >
                <option value="all">All Saved Categories</option>
                {availableFilterOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort by Dropdown */}
            <div className="md:col-span-3 flex items-center gap-2">
              <label htmlFor="dream-sort" className="text-xs font-semibold text-[#10110F] whitespace-nowrap hidden sm:inline">
                Sort:
              </label>
              <select
                id="dream-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-2 px-3 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#263D2B]"
              >
                <option value="recent">Recently Saved</option>
                <option value="name-asc">Name (A to Z)</option>
                <option value="name-desc">Name (Z to A)</option>
              </select>
            </div>

          </div>
        )}

        {/* Results summary & reset button */}
        {isFiltered && (
          <div className="pt-2 flex items-center justify-between text-xs text-[#6B7068]">
            <span>Active filters applied</span>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setSortBy('recent');
              }}
              className="inline-flex items-center gap-1 text-[#263D2B] font-semibold hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset filters</span>
            </button>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 3. TAB 1: PERSONAL MOODBOARD VIEW                                         */}
      {/* ========================================================================= */}
      {activeTab === 'moodboard' && (
        <div className="space-y-8">
          
          {totalSavedCount === 0 ? (
            /* Empty State for Moodboard */
            <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#DCE1D8] text-center max-w-xl mx-auto shadow-xs">
              <div className="w-16 h-16 rounded-full bg-[#F7F4ED] text-[#263D2B] flex items-center justify-center mx-auto mb-4 border border-[#DCE1D8]">
                <Layers className="w-8 h-8 text-[#263D2B]" />
              </div>
              <h3 className="font-serif text-2xl text-[#10110F] font-normal mb-2">
                Your Moodboard is Empty
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed mb-6 font-sans">
                Save your favourite hair shades and inspiration images from the atelier sections below to compose your personalized consultation moodboard.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#shade-explorer"
                  className="global-button !px-6 !py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5"
                >
                  <Palette className="w-3.5 h-3.5 text-white" />
                  <span>Explore Shades</span>
                </a>
                <a
                  href="#colour-techniques"
                  className="global-button-secondary !px-6 !py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5 text-[#263D2B]" />
                  <span>Browse Techniques</span>
                </a>
              </div>
            </div>
          ) : (
            <>
              {/* Moodboard Header Ribbon */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#263D2B] via-[#18271B] to-[#263D2B] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8B5A0] block">
                    CONSULTATION-READY MOODBOARD
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal">
                    {totalShadesCount} Dream Shade{totalShadesCount === 1 ? '' : 's'} &bull; {totalInspirationsCount} Inspiration Look{totalInspirationsCount === 1 ? '' : 's'}
                  </h3>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsConsultationModalOpen(true)}
                    className="px-5 py-2.5 rounded-full bg-white text-[#263D2B] hover:bg-[#F7F4ED] text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
                    <span>Dossier View</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBookConsultation}
                    className="px-5 py-2.5 rounded-full bg-[#A8B5A0] text-[#10110F] hover:bg-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Consultation</span>
                  </button>
                </div>
              </div>

              {/* Combined Grid: Visual Distinction between Shades & Inspirations */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1. Saved Shades Cards */}
                {filteredShades.map((shade) => (
                  <div
                    key={`mood-shade-${shade.id}`}
                    className="bg-white rounded-3xl border border-[#DCE1D8] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#263D2B] transition-all duration-300 flex flex-col justify-between group relative"
                  >
                    <div>
                      {/* Top Header Banner with Swatch */}
                      <div className="p-4 sm:p-5 pb-3 border-b border-[#DCE1D8]/60 bg-[#F7F4ED]/60 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span
                            className="w-10 h-10 rounded-full border-2 border-white shadow-md flex-shrink-0 relative overflow-hidden"
                            style={{ backgroundColor: shade.hex }}
                          >
                            <span className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
                          </span>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#465640] block">
                              {shade.familyName} Family
                            </span>
                            <h4 className="font-serif text-lg font-normal text-[#10110F] leading-snug">
                              {shade.name}
                            </h4>
                          </div>
                        </div>

                        {/* Remove Action */}
                        <button
                          type="button"
                          onClick={() => handleRemove(shade.id, 'shade')}
                          className="p-1.5 rounded-full text-[#6B7068] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Remove from saved shades"
                          aria-label={`Remove ${shade.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Card Body */}
                      <div className="p-4 sm:p-5 space-y-3">
                        {/* Base Level & Undertone badges */}
                        <div className="flex flex-wrap gap-1.5 text-[10.5px]">
                          {shade.baseLevel && (
                            <span className="px-2.5 py-0.5 rounded-full bg-[#18271B] text-[#A8B5A0] font-mono">
                              {shade.baseLevel}
                            </span>
                          )}
                          <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#DCE1D8] text-[#465640]">
                            HEX: {shade.hex}
                          </span>
                        </div>

                        {/* Associated Inspiration image if present */}
                        {shade.image && (
                          <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-[#DCE1D8] bg-[#10110F]">
                            <img
                              src={shade.image}
                              alt={shade.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            <span className="absolute bottom-2 left-2 text-[10px] font-bold uppercase tracking-wider text-white">
                              {shade.recommendedTechnique || 'Atelier Tone'}
                            </span>
                          </div>
                        )}

                        {/* Customer Personal Note */}
                        <div className="p-2.5 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1">
                              <Edit3 className="w-3 h-3 text-[#263D2B]" />
                              Personal Notes
                            </span>
                            <button
                              type="button"
                              onClick={() => openNoteEditor(shade, 'shade')}
                              className="text-[10px] text-[#263D2B] font-semibold hover:underline cursor-pointer"
                            >
                              {shade.note ? 'Edit' : '+ Add Note'}
                            </button>
                          </div>
                          {shade.note ? (
                            <p className="text-[#10110F] italic font-light">&ldquo;{shade.note}&rdquo;</p>
                          ) : (
                            <p className="text-[#6B7068] italic font-light">No notes added yet.</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer: Revisit Explorer */}
                    <div className="p-4 sm:p-5 pt-0 border-t border-[#DCE1D8]/60 mt-2">
                      <button
                        type="button"
                        onClick={() => handleJumpToExplorer(shade)}
                        className="w-full pt-3 text-xs font-bold uppercase tracking-wider text-[#263D2B] hover:text-[#18271B] flex items-center justify-center gap-1.5 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>View in Shade Explorer</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* 2. Saved Inspirations Cards */}
                {filteredInspirations.map((insp) => (
                  <div
                    key={`mood-insp-${insp.id}`}
                    className="bg-white rounded-3xl border border-[#DCE1D8] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#263D2B] transition-all duration-300 flex flex-col justify-between group relative"
                  >
                    <div>
                      {/* Image with Badges */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#10110F]">
                        <img
                          src={insp.image}
                          alt={insp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                        
                        {/* Technique Tag */}
                        <div className="absolute top-3 left-3 bg-[#10110F]/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-wider text-[#A8B5A0] border border-[#263D2B]">
                          {insp.techniqueName}
                        </div>

                        {/* Remove Action */}
                        <button
                          type="button"
                          onClick={() => handleRemove(insp.id, 'inspiration')}
                          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 text-[#6B7068] hover:text-rose-600 transition-colors shadow-sm cursor-pointer"
                          title="Remove from inspiration board"
                          aria-label={`Remove ${insp.title}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="absolute bottom-3 left-3 right-3">
                          <span className="text-[10px] text-white/80 uppercase tracking-wider block">
                            {insp.sourceSection}
                          </span>
                          <h4 className="font-serif text-lg font-normal text-white leading-snug">
                            {insp.title}
                          </h4>
                        </div>
                      </div>

                      {/* Body Content */}
                      <div className="p-4 sm:p-5 space-y-3">
                        <div className="flex flex-wrap gap-1.5 text-[10.5px]">
                          {insp.vibe && (
                            <span className="px-2.5 py-0.5 rounded-md bg-[#F7F4ED] border border-[#DCE1D8] text-[#465640] font-medium">
                              {insp.vibe}
                            </span>
                          )}
                          {insp.tones && (
                            <span className="px-2.5 py-0.5 rounded-md bg-[#F7F4ED] border border-[#DCE1D8] text-[#263D2B] font-medium">
                              {insp.tones}
                            </span>
                          )}
                        </div>

                        {/* Customer Personal Note */}
                        <div className="p-2.5 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1">
                              <Edit3 className="w-3 h-3 text-[#263D2B]" />
                              Personal Notes
                            </span>
                            <button
                              type="button"
                              onClick={() => openNoteEditor(insp, 'inspiration')}
                              className="text-[10px] text-[#263D2B] font-semibold hover:underline cursor-pointer"
                            >
                              {insp.note ? 'Edit' : '+ Add Note'}
                            </button>
                          </div>
                          {insp.note ? (
                            <p className="text-[#10110F] italic font-light">&ldquo;{insp.note}&rdquo;</p>
                          ) : (
                            <p className="text-[#6B7068] italic font-light">No notes added yet.</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer: Book / Inquire */}
                    <div className="p-4 sm:p-5 pt-0 border-t border-[#DCE1D8]/60 mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          const noteText = insp.note ? `Inspiration: ${insp.title} (${insp.techniqueName}) - Note: ${insp.note}` : `Inspiration: ${insp.title} (${insp.techniqueName})`;
                          navigate(`/book-appointment?service=${encodeURIComponent(insp.serviceId || 'noor-balayage')}&notes=${encodeURIComponent(noteText)}`);
                        }}
                        className="w-full pt-3 text-xs font-bold uppercase tracking-wider text-[#263D2B] hover:text-[#18271B] flex items-center justify-center gap-1.5 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>Book Similar Look</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

              </div>
            </>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. TAB 2: MY FAVOURITE SHADES DEDICATED VIEW                              */}
      {/* ========================================================================= */}
      {activeTab === 'shades' && (
        <div>
          {totalShadesCount === 0 ? (
            <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#DCE1D8] text-center max-w-xl mx-auto shadow-xs">
              <div className="w-16 h-16 rounded-full bg-[#F7F4ED] text-[#263D2B] flex items-center justify-center mx-auto mb-4 border border-[#DCE1D8]">
                <Palette className="w-8 h-8 text-[#263D2B]" />
              </div>
              <h3 className="font-serif text-2xl text-[#10110F] font-normal mb-2">
                No Favourite Shades Saved
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed mb-6 font-sans">
                Browse our 7 colour families (Brunette, Blonde, Copper, Auburn, Burgundy, Ash, and Fantasy) in the Shade Explorer and heart your dream tones.
              </p>
              <a
                href="#shade-explorer"
                className="global-button !px-6 !py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer inline-flex items-center gap-2"
              >
                <Palette className="w-3.5 h-3.5 text-white" />
                <span>Open Shade Explorer</span>
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredShades.map((shade) => (
                <div
                  key={`fav-shade-${shade.id}`}
                  className="bg-white rounded-3xl border border-[#DCE1D8] p-5 sm:p-6 shadow-xs hover:shadow-lg hover:border-[#263D2B] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header: Swatch + Title + Delete */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-12 h-12 rounded-full border-2 border-white shadow-md flex-shrink-0 relative overflow-hidden"
                          style={{ backgroundColor: shade.hex }}
                        >
                          <span className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
                        </span>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#465640] block">
                            {shade.familyName}
                          </span>
                          <h4 className="font-serif text-xl font-normal text-[#10110F]">
                            {shade.name}
                          </h4>
                          <span className="text-xs font-mono text-[#6B7068]">
                            HEX: {shade.hex}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemove(shade.id, 'shade')}
                        className="p-1.5 rounded-full text-[#6B7068] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Remove shade"
                        aria-label={`Remove ${shade.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Metadata highlights */}
                    <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1.5 text-xs">
                      {shade.baseLevel && (
                        <div className="flex justify-between">
                          <span className="text-[#6B7068]">Base Level:</span>
                          <span className="font-semibold text-[#10110F]">{shade.baseLevel}</span>
                        </div>
                      )}
                      {shade.bestSkin && (
                        <div className="flex justify-between">
                          <span className="text-[#6B7068]">Best Complexion:</span>
                          <span className="font-semibold text-[#10110F] text-right truncate max-w-[150px]">{shade.bestSkin}</span>
                        </div>
                      )}
                      {shade.recommendedTechnique && (
                        <div className="flex justify-between">
                          <span className="text-[#6B7068]">Recommended:</span>
                          <span className="font-semibold text-[#263D2B]">{shade.recommendedTechnique}</span>
                        </div>
                      )}
                    </div>

                    {/* Associated Inspo Image */}
                    {shade.image && (
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-[#DCE1D8] bg-[#10110F]">
                        <img
                          src={shade.image}
                          alt={shade.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Note Box */}
                    <div className="p-3 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1">
                          <Edit3 className="w-3 h-3 text-[#263D2B]" />
                          Personal Notes
                        </span>
                        <button
                          type="button"
                          onClick={() => openNoteEditor(shade, 'shade')}
                          className="text-[10px] text-[#263D2B] font-semibold hover:underline cursor-pointer"
                        >
                          {shade.note ? 'Edit' : '+ Add Note'}
                        </button>
                      </div>
                      {shade.note ? (
                        <p className="text-[#10110F] italic font-light">&ldquo;{shade.note}&rdquo;</p>
                      ) : (
                        <p className="text-[#6B7068] italic font-light">No notes added yet.</p>
                      )}
                    </div>
                  </div>

                  {/* Action Link: Revisit in Explorer */}
                  <div className="pt-4 mt-3 border-t border-[#DCE1D8] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleJumpToExplorer(shade)}
                      className="text-xs font-bold uppercase tracking-wider text-[#263D2B] hover:text-[#18271B] flex items-center gap-1 cursor-pointer"
                    >
                      <span>Jump to Explorer</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const noteText = shade.note ? `Requested Shade: ${shade.name} (${shade.familyName}) - Note: ${shade.note}` : `Requested Shade: ${shade.name} (${shade.familyName})`;
                        navigate(`/book-appointment?service=${encodeURIComponent(shade.serviceId || 'noor-balayage')}&notes=${encodeURIComponent(noteText)}`);
                      }}
                      className="global-button !py-1.5 !px-3 text-[10.5px] font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Book Shade
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. TAB 3: MY INSPIRATION BOARD DEDICATED VIEW                             */}
      {/* ========================================================================= */}
      {activeTab === 'inspirations' && (
        <div>
          {totalInspirationsCount === 0 ? (
            <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#DCE1D8] text-center max-w-xl mx-auto shadow-xs">
              <div className="w-16 h-16 rounded-full bg-[#F7F4ED] text-[#263D2B] flex items-center justify-center mx-auto mb-4 border border-[#DCE1D8]">
                <Camera className="w-8 h-8 text-[#263D2B]" />
              </div>
              <h3 className="font-serif text-2xl text-[#10110F] font-normal mb-2">
                No Inspiration Images Saved
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed mb-6 font-sans">
                Explore our 8 signature disciplines: Balayage, Highlights, Babylights, Ombre, Root Melt, Global Colour, Grey Blending, and Colour Correction.
              </p>
              <a
                href="#colour-techniques"
                className="global-button !px-6 !py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer inline-flex items-center gap-2"
              >
                <Camera className="w-3.5 h-3.5 text-white" />
                <span>Browse Techniques</span>
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInspirations.map((insp) => (
                <div
                  key={`inspo-board-${insp.id}`}
                  className="bg-white rounded-3xl border border-[#DCE1D8] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#263D2B] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#10110F]">
                      <img
                        src={insp.image}
                        alt={insp.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                      
                      <div className="absolute top-3 left-3 bg-[#10110F]/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-wider text-[#A8B5A0] border border-[#263D2B]">
                        {insp.techniqueName}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemove(insp.id, 'inspiration')}
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 text-[#6B7068] hover:text-rose-600 transition-colors shadow-sm cursor-pointer"
                        title="Remove inspiration"
                        aria-label={`Remove ${insp.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="text-[10px] text-white/80 uppercase tracking-wider block">
                          {insp.sourceSection}
                        </span>
                        <h4 className="font-serif text-lg font-normal text-white leading-snug">
                          {insp.title}
                        </h4>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex flex-wrap gap-1.5 text-[10.5px]">
                        {insp.vibe && (
                          <span className="px-2.5 py-0.5 rounded-md bg-[#F7F4ED] border border-[#DCE1D8] text-[#465640] font-medium">
                            {insp.vibe}
                          </span>
                        )}
                        {insp.tones && (
                          <span className="px-2.5 py-0.5 rounded-md bg-[#F7F4ED] border border-[#DCE1D8] text-[#263D2B] font-medium">
                            {insp.tones}
                          </span>
                        )}
                      </div>

                      {/* Note Box */}
                      <div className="p-3 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1">
                            <Edit3 className="w-3 h-3 text-[#263D2B]" />
                            Personal Notes
                          </span>
                          <button
                            type="button"
                            onClick={() => openNoteEditor(insp, 'inspiration')}
                            className="text-[10px] text-[#263D2B] font-semibold hover:underline cursor-pointer"
                          >
                            {insp.note ? 'Edit' : '+ Add Note'}
                          </button>
                        </div>
                        {insp.note ? (
                          <p className="text-[#10110F] italic font-light">&ldquo;{insp.note}&rdquo;</p>
                        ) : (
                          <p className="text-[#6B7068] italic font-light">No notes added yet.</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-[#DCE1D8] mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const noteText = insp.note ? `Inspiration: ${insp.title} (${insp.techniqueName}) - Note: ${insp.note}` : `Inspiration: ${insp.title} (${insp.techniqueName})`;
                        navigate(`/book-appointment?service=${encodeURIComponent(insp.serviceId || 'noor-balayage')}&notes=${encodeURIComponent(noteText)}`);
                      }}
                      className="w-full pt-3 text-xs font-bold uppercase tracking-wider text-[#263D2B] hover:text-[#18271B] flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Book Consultation for this Look</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. PREPARE FOR MY CONSULTATION MODAL (DOSSIER)                            */}
      {/* ========================================================================= */}
      {isConsultationModalOpen && (
        <div 
          className="fixed inset-0 bg-[#10110F]/65 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="consultation-modal-title"
          onClick={() => setIsConsultationModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-2xl bg-[#F7F4ED] rounded-3xl border border-[#DCE1D8] shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-[#DCE1D8] bg-white flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#263D2B]" />
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#263D2B]">
                    PERSONAL COLOUR DOSSIER
                  </span>
                </div>
                <h3 id="consultation-modal-title" className="font-serif text-2xl text-[#10110F] font-normal">
                  Your Atelier Consultation Plan
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsConsultationModalOpen(false)}
                className="p-1.5 rounded-full text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-xs text-[#10110F]">
              
              {/* Introduction Card */}
              <div className="p-4 rounded-2xl bg-white border border-[#DCE1D8] space-y-2">
                <p className="text-sm text-[#465640] leading-relaxed">
                  Bring this summary to your appointment with Janki. It condenses your saved shades, favourite inspiration techniques, and custom notes for a clear, collaborative salon consultation.
                </p>
              </div>

              {/* Saved Shades Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-[#263D2B]" />
                  <span>Selected Dream Shades ({totalShadesCount})</span>
                </h4>
                {totalShadesCount === 0 ? (
                  <p className="text-xs text-[#6B7068] italic">No shades saved yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {collection.shades?.map((s) => (
                      <div key={s.id} className="p-3 bg-white rounded-xl border border-[#DCE1D8] flex items-start gap-3">
                        <span
                          className="w-8 h-8 rounded-full border-2 border-white shadow-inner flex-shrink-0"
                          style={{ backgroundColor: s.hex }}
                        />
                        <div className="space-y-0.5 min-w-0">
                          <strong className="block text-sm font-semibold text-[#10110F] truncate">{s.name}</strong>
                          <span className="text-[10.5px] text-[#6B7068] block">{s.familyName} &bull; {s.baseLevel || s.hex}</span>
                          {s.note && <p className="text-[11px] text-[#263D2B] italic">&ldquo;{s.note}&rdquo;</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Saved Inspirations Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-[#263D2B]" />
                  <span>Inspiration Board Looks ({totalInspirationsCount})</span>
                </h4>
                {totalInspirationsCount === 0 ? (
                  <p className="text-xs text-[#6B7068] italic">No inspiration looks saved yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {collection.inspirations?.map((insp) => (
                      <div key={insp.id} className="p-3 bg-white rounded-xl border border-[#DCE1D8] flex items-start gap-3">
                        <img
                          src={insp.image}
                          alt={insp.title}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-[#DCE1D8]"
                        />
                        <div className="space-y-0.5 min-w-0">
                          <strong className="block text-xs font-semibold text-[#10110F] truncate">{insp.title}</strong>
                          <span className="text-[10px] text-[#263D2B] font-bold uppercase tracking-wider block">{insp.techniqueName}</span>
                          {insp.note && <p className="text-[11px] text-[#465640] italic">&ldquo;{insp.note}&rdquo;</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Questions for Janki */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DCE1D8] space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#10110F] flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#263D2B]" />
                  <span>Recommended Questions to Ask During Your Visit</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-[#6B7068]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B] mt-1.5 flex-shrink-0" />
                    <span>How will my natural hair porosity and underlying pigments affect this target tone?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B] mt-1.5 flex-shrink-0" />
                    <span>What is the expected grow-out maintenance schedule for my chosen technique?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B] mt-1.5 flex-shrink-0" />
                    <span>Which Olaplex bond-protection tier or gloss toner is recommended for post-care?</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-[#DCE1D8] bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleCopySummary}
                className="global-button-secondary !py-2.5 !px-4 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5 w-full sm:w-auto"
              >
                <Copy className="w-3.5 h-3.5 text-[#263D2B]" />
                <span>{copiedSummary ? 'Copied to Clipboard!' : 'Copy Dossier Summary'}</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsConsultationModalOpen(false)}
                  className="px-4 py-2.5 rounded-full border border-[#DCE1D8] text-xs font-bold uppercase tracking-wider text-[#6B7068] hover:text-[#10110F] cursor-pointer w-full sm:w-auto"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsConsultationModalOpen(false);
                    handleBookConsultation();
                  }}
                  className="global-button !py-2.5 !px-5 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. NOTE EDITOR MODAL                                                      */}
      {/* ========================================================================= */}
      {editingNoteItem && (
        <div 
          className="fixed inset-0 bg-[#10110F]/65 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-md bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl p-6 text-left space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B]">
                  PERSONAL MOODBOARD NOTE
                </span>
                <h4 className="font-serif text-lg font-normal text-[#10110F]">
                  {editingNoteItem.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setEditingNoteItem(null)}
                className="p-1 rounded-full text-[#6B7068] hover:text-[#10110F]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <textarea
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              placeholder="e.g. Love this warm caramel tone for face-framing pieces. Need to ask Janki about toner upkeep..."
              rows={4}
              className="w-full p-3 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs sm:text-sm text-[#10110F] placeholder-[#6B7068] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#263D2B]"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingNoteItem(null)}
                className="px-4 py-2 rounded-full border border-[#DCE1D8] text-xs font-semibold text-[#6B7068] hover:text-[#10110F]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveNoteDraft}
                className="global-button !py-2 !px-5 text-xs font-bold uppercase tracking-wider"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. CLEAR ENTIRE COLLECTION CONFIRMATION DIALOG                             */}
      {/* ========================================================================= */}
      {isClearConfirmOpen && (
        <div 
          className="fixed inset-0 bg-[#10110F]/65 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-sm bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h4 className="font-serif text-xl font-normal text-[#10110F]">
                Clear Your Dream Colour Collection?
              </h4>
              <p className="text-xs text-[#6B7068] leading-relaxed">
                Are you sure you want to remove all saved shades and inspiration looks from your personal moodboard? This action cannot be undone.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsClearConfirmOpen(false)}
                className="global-button-secondary !py-2 text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmClear}
                className="py-2 px-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
