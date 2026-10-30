import React, { useState, useMemo, useRef } from 'react';
import { 
  Sparkles, 
  Heart, 
  Check, 
  Trash2, 
  Share2, 
  ArrowRight, 
  Plus, 
  Upload, 
  X, 
  Layers, 
  Edit3, 
  Scissors, 
  Droplets, 
  Palette, 
  Sparkle, 
  Feather, 
  Info,
  CheckCircle2
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';
import { 
  VISION_BOARD_CATEGORIES, 
  CURATED_VISION_INSPIRATIONS,
  formatVisionBoardSummaryNotes 
} from '../../data/visionBoardData';

export default function BeautyVisionBoard({ onTransferToStudio }) {
  // Read saved vision board from salon database
  const [boardData, setBoardData] = useState(() => {
    return salonDB.getVisionBoard();
  });

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInspirationModal, setSelectedInspirationModal] = useState(null);
  const [isMoodboardDrawerOpen, setIsMoodboardDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Custom Upload Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [customUpload, setCustomUpload] = useState({
    title: '',
    category: 'hairstyles',
    userNote: '',
    dataUrl: null,
    name: ''
  });
  const [uploadError, setUploadError] = useState('');
  const customFileInputRef = useRef(null);

  // Synchronize board changes to localStorage
  const updateBoard = (newBoard) => {
    setBoardData(newBoard);
    salonDB.saveVisionBoard(newBoard);
  };

  // Toast notification helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Check if an item is pinned
  const isPinned = (itemId) => {
    return boardData.pins.some(p => p.id === itemId);
  };

  // Toggle Pin Item
  const handleTogglePin = (item, e) => {
    if (e) e.stopPropagation();

    if (isPinned(item.id)) {
      const updatedPins = boardData.pins.filter(p => p.id !== item.id);
      updateBoard({ ...boardData, pins: updatedPins });
      showToast(`Removed “${item.title}” from your vision board.`);
    } else {
      const newPin = {
        id: item.id,
        category: item.category,
        categoryLabel: item.categoryLabel,
        title: item.title,
        subtitle: item.subtitle,
        image: item.image,
        tags: item.tags,
        recommendedServiceId: item.recommendedServiceId,
        userNote: '',
        pinnedAt: new Date().toISOString()
      };
      updateBoard({ ...boardData, pins: [...boardData.pins, newPin] });
      showToast(`Pinned “${item.title}” to your vision board!`);
    }
  };

  // Update user note on a pin
  const handleUpdatePinNote = (pinId, noteText) => {
    const updatedPins = boardData.pins.map(p => {
      if (p.id === pinId) {
        return { ...p, userNote: noteText };
      }
      return p;
    });
    updateBoard({ ...boardData, pins: updatedPins });
  };

  // Remove a pin from drawer
  const handleRemovePin = (pinId) => {
    const updatedPins = boardData.pins.filter(p => p.id !== pinId);
    updateBoard({ ...boardData, pins: updatedPins });
    showToast('Inspiration removed from vision board.');
  };

  // Remove custom pin
  const handleRemoveCustomPin = (customId) => {
    const updatedCustomPins = (boardData.customPins || []).filter(p => p.id !== customId);
    updateBoard({ ...boardData, customPins: updatedCustomPins });
    showToast('Custom inspiration removed.');
  };

  // Handle custom upload photo
  const handleCustomPhotoSelect = (e) => {
    const file = e.target.files?.[0];
    setUploadError('');
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Only JPG, PNG, and WEBP images are supported.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size must be under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCustomUpload(prev => ({
        ...prev,
        dataUrl: reader.result,
        name: file.name
      }));
    };
    reader.onerror = () => setUploadError('Failed to read image.');
    reader.readAsDataURL(file);
  };

  // Save custom inspiration pin
  const handleSaveCustomPin = (e) => {
    e.preventDefault();
    if (!customUpload.dataUrl) {
      setUploadError('Please select an image file to upload.');
      return;
    }
    if (!customUpload.title.trim()) {
      setUploadError('Please enter a title for your inspiration.');
      return;
    }

    const newCustomPin = {
      id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      title: customUpload.title.trim(),
      category: customUpload.category,
      categoryLabel: VISION_BOARD_CATEGORIES.find(c => c.id === customUpload.category)?.label || 'Custom',
      image: customUpload.dataUrl,
      userNote: customUpload.userNote.trim(),
      isCustom: true,
      pinnedAt: new Date().toISOString()
    };

    updateBoard({
      ...boardData,
      customPins: [...(boardData.customPins || []), newCustomPin]
    });

    setIsUploadModalOpen(false);
    setCustomUpload({
      title: '',
      category: 'hairstyles',
      userNote: '',
      dataUrl: null,
      name: ''
    });
    showToast(`Added custom pin “${newCustomPin.title}” to your vision board!`);
  };

  // Clear entire vision board
  const handleClearBoard = () => {
    if (window.confirm('Reset your beauty vision board? All saved pins and notes will be cleared.')) {
      const blank = salonDB.clearVisionBoard();
      setBoardData(blank);
      showToast('Vision board reset.');
    }
  };

  // Copy shareable summary text to clipboard
  const handleCopyBoardSummary = () => {
    const summary = formatVisionBoardSummaryNotes(boardData);
    if (!summary) {
      showToast('Your vision board is empty. Pin some looks first!');
      return;
    }

    try {
      navigator.clipboard.writeText(summary);
      showToast('Copied vision board summary to clipboard!');
    } catch (e) {
      showToast('Summary generated for your salon appointment.');
    }
  };

  // One-click transfer moodboard to Custom Studio workspace
  const handleTransferToStudio = () => {
    const summaryNotes = formatVisionBoardSummaryNotes(boardData);
    if (!summaryNotes) {
      showToast('Please pin at least one look to your vision board first!');
      return;
    }

    // Determine highest-priority recommended service
    let targetServiceId = null;
    const allPins = [...boardData.pins];
    const bridalPin = allPins.find(p => p.id.includes('bridal') || p.tags?.some(t => t.toLowerCase().includes('bridal')));
    if (bridalPin && bridalPin.recommendedServiceId) {
      targetServiceId = bridalPin.recommendedServiceId;
    } else if (allPins.length > 0 && allPins[0].recommendedServiceId) {
      targetServiceId = allPins[0].recommendedServiceId;
    }

    // Collect images for pre-populating photo slots
    const photosToPass = allPins
      .filter(p => p.image)
      .slice(0, 4)
      .map((p, idx) => ({
        id: `vb_photo_${idx}_${Date.now()}`,
        name: `${p.title}.webp`,
        size: '120 KB',
        dataUrl: p.image,
        description: `Vision Board Pin: ${p.title}${p.userNote ? ` — ${p.userNote}` : ''}`
      }));

    if (onTransferToStudio) {
      onTransferToStudio({
        serviceId: targetServiceId,
        visionNotes: summaryNotes,
        photos: photosToPass,
        title: boardData.title
      });
    }

    setIsMoodboardDrawerOpen(false);
    showToast('Transferred your Vision Board into the Custom Studio workspace below!');
  };

  // Filtered Inspirations
  const filteredInspirations = useMemo(() => {
    return CURATED_VISION_INSPIRATIONS.filter(item => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Counts by category inside vision board
  const totalPinsCount = (boardData.pins?.length || 0) + (boardData.customPins?.length || 0);

  const categoryIcon = (catId) => {
    switch (catId) {
      case 'hairstyles': return <Scissors className="w-3.5 h-3.5" />;
      case 'hair-colours': return <Droplets className="w-3.5 h-3.5" />;
      case 'nail-art': return <Palette className="w-3.5 h-3.5" />;
      case 'makeup': return <Sparkle className="w-3.5 h-3.5" />;
      case 'mehndi': return <Feather className="w-3.5 h-3.5" />;
      default: return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section 
      id="beauty-vision-board-section" 
      className="py-12 sm:py-16 bg-[#F7F4ED] text-[#10110F] border-b border-[#DCE1D8]"
      aria-label="The Beauty Vision Board"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* ========================================================================= */}
        {/* 1. SECTION HEADER                                                         */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[#263D2B] text-xs font-bold uppercase tracking-[0.22em] shadow-xs">
            <Layers className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>THE BEAUTY VISION BOARD</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-tight">
            Curate Your Personal Beauty Moodboard
          </h2>

          <p className="text-sm sm:text-base text-[#263D2B] font-medium font-serif italic max-w-2xl mx-auto">
            “Collect your favourite hairstyles, hair colours, nail art, makeup looks, and mehndi inspiration into one personalized moodboard.”
          </p>

          <p className="text-xs sm:text-sm text-[#465640] max-w-xl mx-auto leading-relaxed">
            Click the heart on any look to pin it to your moodboard, upload your own photos, add notes, and transfer your unified look directly into the Custom Studio workspace.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. STICKY / FLOATING MOODBOARD CONTROL BAR                                */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-2xl border border-[#DCE1D8] p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center shrink-0">
              <Heart className={`w-5 h-5 ${totalPinsCount > 0 ? 'fill-[#263D2B] text-[#263D2B]' : 'text-[#263D2B]'}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={boardData.title || 'My Bespoke Beauty Vision Board'}
                  onChange={(e) => updateBoard({ ...boardData, title: e.target.value })}
                  placeholder="Name your moodboard..."
                  className="font-serif font-bold text-base text-[#10110F] bg-transparent border-b border-transparent hover:border-[#DCE1D8] focus:border-[#263D2B] focus:outline-none transition-colors"
                />
                <Edit3 className="w-3 h-3 text-[#A8B5A0]" />
              </div>
              <div className="text-xs text-[#6B7068]">
                <span>{totalPinsCount} Pinned Look{totalPinsCount === 1 ? '' : 's'}</span>
                <span className="mx-1.5">•</span>
                <span className="text-[#263D2B] font-medium">Ready for Studio Transfer</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(true)}
              className="px-3.5 py-2 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] hover:bg-white text-xs font-semibold text-[#10110F] transition-colors inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>Add Custom Pin</span>
            </button>

            <button
              type="button"
              onClick={() => setIsMoodboardDrawerOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-[#F7F4ED] text-xs font-semibold tracking-wide transition-colors inline-flex items-center gap-2 shadow-xs"
            >
              <span>View Moodboard ({totalPinsCount})</span>
              <Layers className="w-3.5 h-3.5 text-[#A8B5A0]" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. CATEGORY PILLS FILTER & SEARCH                                         */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {VISION_BOARD_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#263D2B] text-white shadow-xs'
                      : 'bg-white hover:bg-[#EBEFE8] text-[#465640] border border-[#DCE1D8]'
                  }`}
                >
                  {categoryIcon(cat.id)}
                  <span>{cat.label}</span>
                  {cat.count && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#F7F4ED] text-[#263D2B]'
                    }`}>
                      {cat.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64 shrink-0">
            <input
              type="text"
              placeholder="Search inspiration..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DCE1D8] bg-white text-[#10110F] placeholder-[#6B7068] focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B7068] hover:text-[#10110F]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. INSPIRATION CARDS GRID                                                 */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredInspirations.map((item) => {
            const pinned = isPinned(item.id);
            return (
              <div
                key={item.id}
                className={`group bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  pinned
                    ? 'border-[#263D2B] ring-2 ring-[#263D2B]/20 shadow-md'
                    : 'border-[#DCE1D8] hover:border-[#A8B5A0] hover:shadow-xs'
                }`}
              >
                {/* Photo Header */}
                <div className="relative aspect-[16/11] w-full bg-[#EBEFE8] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/facial/special-glam-girl-facial.jpg';
                    }}
                  />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-[#10110F]/80 backdrop-blur-xs text-[#F7F4ED] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      {categoryIcon(item.category)}
                      <span>{item.categoryLabel}</span>
                    </span>
                  </div>

                  {/* Heart / Pin Button */}
                  <button
                    type="button"
                    onClick={(e) => handleTogglePin(item, e)}
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md ${
                      pinned
                        ? 'bg-[#263D2B] text-white scale-105'
                        : 'bg-white/90 hover:bg-white text-[#465640] hover:text-[#263D2B]'
                    }`}
                    title={pinned ? 'Remove from Moodboard' : 'Pin to Moodboard'}
                  >
                    <Heart className={`w-4 h-4 ${pinned ? 'fill-white' : ''}`} />
                  </button>

                  {pinned && (
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#263D2B] text-[#F7F4ED] text-[10px] font-bold shadow-xs flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Pinned to Board</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-lg font-bold text-[#10110F] group-hover:text-[#263D2B] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#263D2B] font-medium">
                      {item.subtitle}
                    </p>
                    <p className="text-xs text-[#6B7068] leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-semibold text-[#465640] bg-[#F7F4ED] px-2 py-0.5 rounded-md border border-[#DCE1D8]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Expert Tip Callout */}
                  <div className="p-2.5 rounded-xl bg-[#263D2B]/5 border border-[#263D2B]/10 text-[11px] text-[#263D2B] flex items-start gap-1.5 leading-relaxed">
                    <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#465640]" />
                    <span><strong>Artist Insight:</strong> {item.expertTip}</span>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-2 border-t border-[#EBEFE8] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedInspirationModal(item)}
                      className="text-xs text-[#465640] hover:text-[#10110F] font-semibold underline underline-offset-2 transition-colors"
                    >
                      View Details
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleTogglePin(item, e)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all inline-flex items-center gap-1.5 ${
                        pinned
                          ? 'bg-[#263D2B] text-[#F7F4ED]'
                          : 'bg-[#F7F4ED] text-[#263D2B] hover:bg-[#263D2B] hover:text-white'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${pinned ? 'fill-white' : ''}`} />
                      <span>{pinned ? 'Pinned' : 'Pin to Board'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 5. PERSONAL MOODBOARD CANVAS MODAL / DRAWER                               */}
        {/* ========================================================================= */}
        {isMoodboardDrawerOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
            <div className="bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden my-6">
              {/* Modal Header */}
              <div className="p-6 border-b border-[#DCE1D8] flex items-center justify-between bg-[#F7F4ED]">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B]">
                      PERSONALIZED BEAUTY MOODBOARD
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#263D2B] text-[#F7F4ED] text-[10px] font-bold">
                      {totalPinsCount} Saved Look{totalPinsCount === 1 ? '' : 's'}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#10110F]">
                    {boardData.title || 'My Bespoke Beauty Vision Board'}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMoodboardDrawerOpen(false)}
                  className="p-2 rounded-xl text-[#6B7068] hover:text-[#10110F] hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Moodboard Content */}
              <div className="p-6 overflow-y-auto space-y-6">
                {totalPinsCount === 0 ? (
                  <div className="py-12 text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-[#263D2B]/10 text-[#263D2B] mx-auto flex items-center justify-center">
                      <Heart className="w-7 h-7" />
                    </div>
                    <h4 className="font-serif text-lg text-[#10110F]">Your Vision Board is Empty</h4>
                    <p className="text-xs text-[#6B7068] max-w-sm mx-auto">
                      Explore the inspiration cards above and click the heart on your favourite hairstyles, colours, nails, makeup, and mehndi designs.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="p-4 rounded-2xl bg-[#263D2B]/5 border border-[#263D2B]/15 text-xs text-[#263D2B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <strong>Ready to bring this vision to life?</strong>
                        <p className="text-[11px] text-[#465640] mt-0.5">
                          Click "Transfer to Custom Studio" to populate your chosen looks directly into founder Janki Khatroja's consultation workspace.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleTransferToStudio}
                        className="px-5 py-2.5 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-[#F7F4ED] font-semibold text-xs tracking-wider uppercase transition-all shadow-xs shrink-0 flex items-center gap-2"
                      >
                        <span>Customize in Studio</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Curated Pinned Items */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {boardData.pins.map((pin) => (
                        <div key={pin.id} className="p-3.5 rounded-2xl border border-[#DCE1D8] bg-[#F7F4ED]/40 space-y-2.5 relative">
                          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-white">
                            <img
                              src={pin.image}
                              alt={pin.title}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#10110F]/80 text-[#F7F4ED] text-[9px] font-bold uppercase">
                              {pin.categoryLabel}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemovePin(pin.id)}
                              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 hover:bg-rose-600 hover:text-white text-[#6B7068] flex items-center justify-center transition-colors shadow-xs"
                              title="Remove pin"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div>
                            <h4 className="font-serif font-bold text-sm text-[#10110F] leading-snug">
                              {pin.title}
                            </h4>
                            <p className="text-[11px] text-[#465640]">
                              {pin.subtitle}
                            </p>
                          </div>

                          {/* Personal Note on Pin */}
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7068] mb-1">
                              Your Personal Note:
                            </label>
                            <input
                              type="text"
                              value={pin.userNote || ''}
                              onChange={(e) => handleUpdatePinNote(pin.id, e.target.value)}
                              placeholder="e.g. For Sangeet night; keep warm"
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#DCE1D8] bg-white text-[#10110F] focus:outline-none focus:ring-1 focus:ring-[#263D2B]"
                            />
                          </div>
                        </div>
                      ))}

                      {/* Custom Uploaded Pins */}
                      {boardData.customPins?.map((cPin) => (
                        <div key={cPin.id} className="p-3.5 rounded-2xl border border-[#263D2B]/30 bg-[#263D2B]/5 space-y-2.5 relative">
                          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-white">
                            <img
                              src={cPin.image}
                              alt={cPin.title}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#263D2B] text-[#F7F4ED] text-[9px] font-bold uppercase">
                              Custom {cPin.categoryLabel}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveCustomPin(cPin.id)}
                              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 hover:bg-rose-600 hover:text-white text-[#6B7068] flex items-center justify-center transition-colors shadow-xs"
                              title="Remove custom pin"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div>
                            <h4 className="font-serif font-bold text-sm text-[#10110F]">
                              {cPin.title}
                            </h4>
                            {cPin.userNote && (
                              <p className="text-[11px] text-[#465640] italic mt-0.5">
                                “{cPin.userNote}”
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Modal Footer Controls */}
              <div className="p-5 border-t border-[#DCE1D8] flex flex-wrap items-center justify-between gap-3 bg-[#F7F4ED]">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyBoardSummary}
                    disabled={totalPinsCount === 0}
                    className="px-3.5 py-2 rounded-xl border border-[#DCE1D8] bg-white text-xs font-semibold text-[#10110F] hover:bg-[#F7F4ED] disabled:opacity-50 transition-colors inline-flex items-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#263D2B]" />
                    <span>Copy Summary</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClearBoard}
                    disabled={totalPinsCount === 0}
                    className="px-3.5 py-2 rounded-xl border border-rose-200 bg-white text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-50 transition-colors inline-flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Board</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleTransferToStudio}
                  disabled={totalPinsCount === 0}
                  className="px-6 py-2.5 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-[#F7F4ED] text-xs font-semibold tracking-wider uppercase disabled:opacity-50 transition-all inline-flex items-center gap-2 shadow-xs"
                >
                  <span>Transfer to Custom Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 6. UPLOAD CUSTOM INSPIRATION PIN MODAL                                     */}
        {/* ========================================================================= */}
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl max-w-lg w-full p-6 space-y-5 animate-scale-in">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCE1D8]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                    CUSTOM PIN CREATOR
                  </span>
                  <h3 className="font-serif text-xl text-[#10110F]">
                    Add Your Own Look to the Vision Board
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="p-1.5 rounded-xl text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {uploadError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs">
                  {uploadError}
                </div>
              )}

              <form onSubmit={handleSaveCustomPin} className="space-y-4">
                {/* Photo Upload Zone */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                    Reference Photo <span className="text-[#263D2B]">*</span>
                  </label>
                  {customUpload.dataUrl ? (
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#263D2B]">
                      <img src={customUpload.dataUrl} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setCustomUpload({ ...customUpload, dataUrl: null, name: '' })}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="custom-pin-file"
                      className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#DCE1D8] hover:border-[#263D2B] rounded-2xl bg-[#F7F4ED]/40 hover:bg-white cursor-pointer transition-all text-center"
                    >
                      <Upload className="w-6 h-6 text-[#A8B5A0] mb-2" />
                      <span className="text-xs font-semibold text-[#10110F]">Click to upload photo</span>
                      <span className="text-[11px] text-[#6B7068]">JPG, PNG, or WEBP up to 5MB</span>
                      <input
                        id="custom-pin-file"
                        ref={customFileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleCustomPhotoSelect}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1">
                    Inspiration Title <span className="text-[#263D2B]">*</span>
                  </label>
                  <input
                    type="text"
                    value={customUpload.title}
                    onChange={(e) => setCustomUpload({ ...customUpload, title: e.target.value })}
                    placeholder="e.g. Pinterest Sangeet Fishtail Braid with Baby's Breath"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#DCE1D8] bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1">
                    Category Pillar
                  </label>
                  <select
                    value={customUpload.category}
                    onChange={(e) => setCustomUpload({ ...customUpload, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#DCE1D8] bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                  >
                    <option value="hairstyles">Hairstyles & Cuts</option>
                    <option value="hair-colours">Hair Colours & Balayage</option>
                    <option value="nail-art">Nail Art & Manicure</option>
                    <option value="makeup">Makeup & Bridal Glam</option>
                    <option value="mehndi">Mehndi & Henna Art</option>
                  </select>
                </div>

                {/* Note */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1">
                    Personal Note / Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={customUpload.userNote}
                    onChange={(e) => setCustomUpload({ ...customUpload, userNote: e.target.value })}
                    placeholder="e.g. Love this exact shade but with soft waves instead"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#DCE1D8] bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                  />
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="px-4 py-2.5 text-xs font-semibold text-[#6B7068] hover:text-[#10110F]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-[#F7F4ED] text-xs font-semibold tracking-wider uppercase transition-colors"
                  >
                    Pin to Board
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 7. INSPIRATION DETAIL MODAL                                               */}
        {/* ========================================================================= */}
        {selectedInspirationModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in">
              <div className="relative aspect-[16/10] w-full bg-[#EBEFE8]">
                <img
                  src={selectedInspirationModal.image}
                  alt={selectedInspirationModal.title}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelectedInspirationModal(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#10110F]/80 text-[#F7F4ED] text-[10px] font-bold uppercase tracking-wider">
                    {selectedInspirationModal.categoryLabel}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4 text-xs">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#10110F]">
                    {selectedInspirationModal.title}
                  </h3>
                  <p className="text-xs text-[#263D2B] font-medium mt-0.5">
                    {selectedInspirationModal.subtitle}
                  </p>
                </div>

                <p className="text-[#465640] leading-relaxed">
                  {selectedInspirationModal.description}
                </p>

                <div className="p-3 rounded-xl bg-[#263D2B]/5 border border-[#263D2B]/10 text-[#263D2B] leading-relaxed">
                  <strong>Founder Janki's Recommendation:</strong> {selectedInspirationModal.expertTip}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {selectedInspirationModal.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-semibold text-[#465640] bg-[#F7F4ED] px-2 py-0.5 rounded-md border border-[#DCE1D8]">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#DCE1D8] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedInspirationModal(null)}
                    className="px-4 py-2 text-xs font-semibold text-[#6B7068] hover:text-[#10110F]"
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      handleTogglePin(selectedInspirationModal, e);
                      setSelectedInspirationModal(null);
                    }}
                    className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all inline-flex items-center gap-2 ${
                      isPinned(selectedInspirationModal.id)
                        ? 'bg-[#263D2B] text-white'
                        : 'bg-[#263D2B] text-white hover:bg-[#1E3022]'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isPinned(selectedInspirationModal.id) ? 'fill-white' : ''}`} />
                    <span>{isPinned(selectedInspirationModal.id) ? 'Remove Pin' : 'Pin to My Vision Board'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOAST NOTIFICATION */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#263D2B] text-[#F7F4ED] text-xs font-semibold shadow-lg flex items-center gap-2.5 animate-slide-up">
            <CheckCircle2 className="w-4 h-4 text-[#A8B5A0] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

      </div>
    </section>
  );
}
