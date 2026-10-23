import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  EyeOff, 
  Star, 
  Calendar, 
  Tag, 
  Clock, 
  Search, 
  Check, 
  X, 
  AlertCircle, 
  ArrowRight, 
  DollarSign, 
  ExternalLink,
  Layers,
  CheckCircle2,
  Sliders,
  Image as ImageIcon
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';

const PRESET_SEASONAL_LABELS = [
  'Autumn Special',
  'Fall Harvest Glow',
  'Winter Sanctuary',
  'Winter Hydration Ritual',
  'Holiday Glamour',
  'Spring Awakening',
  'Spring Blossom Glow',
  'Summer Sun-Kissed',
  'Festive Harvest',
  'Bridal Season'
];

const PRESET_IMAGES = [
  { label: 'Special Glam Girl Facial', url: '/images/facial/special-glam-girl-facial.jpg' },
  { label: '24K Golden Glow Facial', url: '/images/facial/golden-glow.jpg' },
  { label: 'Clean Facial Atelier', url: '/facial-atelier-clean.webp' },
  { label: 'Haircut & Styling Atelier', url: '/images/hair-care/53-noor-signature-haircut.webp' },
  { label: 'Keratin Hair Repair Ritual', url: '/images/hair-care/63-noor-hair-repair-ritual.webp' },
  { label: 'Mini Facial Exfoliation', url: '/images/facial/mini-facial-exfoliation.jpg' },
  { label: 'Deep Cleansing Dermal Ritual', url: '/images/facial/deep-cleansing-facial.jpg' },
  { label: 'Luxury Manicure & Foot Spa', url: '/images/nails/classic-pedicure.webp' }
];

export default function AdminSeasonalMenu() {
  const [highlights, setHighlights] = useState(() => salonDB.getSeasonalHighlights());
  const [servicesList, setServicesList] = useState(() => salonDB.getServices());
  const [comboPackages, setComboPackages] = useState(() => salonDB.getComboPackages());

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all | active | scheduled | expired | draft | featured
  const [typeFilter, setTypeFilter] = useState('all'); // all | service | package
  const [seasonFilter, setSeasonFilter] = useState('all'); // all | autumn | winter | spring | summer | festive

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalTab, setModalTab] = useState('details'); // 'details' | 'preview'
  const [editingHighlight, setEditingHighlight] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [previewModalItem, setPreviewModalItem] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    itemType: 'service',
    targetId: '',
    title: '',
    seasonalLabel: 'Autumn Special',
    season: 'autumn',
    description: '',
    image: '/images/facial/special-glam-girl-facial.jpg',
    originalPrice: 125,
    promotionalPrice: '',
    validFrom: salonDB.getTodayLocalDateString(),
    validUntil: '',
    isPublished: true,
    isFeatured: false,
    displayOrder: 1,
    benefits: ['']
  });

  const [formErrors, setFormErrors] = useState({});

  // Refresh DB subscriptions
  const refreshData = () => {
    setHighlights(salonDB.getSeasonalHighlights());
    setServicesList(salonDB.getServices());
    setComboPackages(salonDB.getComboPackages());
  };

  useEffect(() => {
    refreshData();
    const unsub = salonDB.subscribe(() => {
      refreshData();
    });
    return () => unsub();
  }, []);

  // Filtered highlights list
  const filteredHighlights = useMemo(() => {
    return highlights.filter((h) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        h.title.toLowerCase().includes(q) ||
        (h.seasonalLabel && h.seasonalLabel.toLowerCase().includes(q)) ||
        (h.description && h.description.toLowerCase().includes(q));

      let matchesStatus = true;
      if (statusFilter === 'active') matchesStatus = h.status === 'Active';
      else if (statusFilter === 'scheduled') matchesStatus = h.status === 'Scheduled';
      else if (statusFilter === 'expired') matchesStatus = h.status === 'Expired';
      else if (statusFilter === 'draft') matchesStatus = h.status === 'Draft';
      else if (statusFilter === 'featured') matchesStatus = Boolean(h.isFeatured);

      let matchesType = true;
      if (typeFilter !== 'all') matchesType = h.itemType === typeFilter;

      let matchesSeason = true;
      if (seasonFilter !== 'all') matchesSeason = h.season === seasonFilter;

      return matchesSearch && matchesStatus && matchesType && matchesSeason;
    });
  }, [highlights, searchQuery, statusFilter, typeFilter, seasonFilter]);

  // Statistics counters
  const totalCount = highlights.length;
  const activeCount = highlights.filter(h => h.status === 'Active').length;
  const scheduledCount = highlights.filter(h => h.status === 'Scheduled').length;
  const expiredCount = highlights.filter(h => h.status === 'Expired').length;
  const draftCount = highlights.filter(h => h.status === 'Draft').length;
  const featuredCount = highlights.filter(h => h.isFeatured).length;

  // Handle Target Selection in Form (auto populates defaults)
  const handleTargetChange = (type, targetId) => {
    if (!targetId) {
      setFormData(prev => ({ ...prev, itemType: type, targetId: '' }));
      return;
    }

    if (type === 'service') {
      const svc = servicesList.find(s => s.id === targetId);
      if (svc) {
        setFormData(prev => ({
          ...prev,
          itemType: 'service',
          targetId: svc.id,
          title: prev.title || `${svc.name} — Seasonal Ritual`,
          description: prev.description || svc.description || '',
          originalPrice: Number(svc.price) || 0,
          image: svc.image || prev.image,
          benefits: Array.isArray(svc.whatsIncluded) && svc.whatsIncluded.length > 0 
            ? svc.whatsIncluded.slice(0, 4) 
            : prev.benefits
        }));
      }
    } else if (type === 'package') {
      const combo = comboPackages.find(c => c.id === targetId);
      if (combo) {
        setFormData(prev => ({
          ...prev,
          itemType: 'package',
          targetId: combo.id,
          title: prev.title || combo.name,
          description: prev.description || combo.description || '',
          originalPrice: Number(combo.comboPrice) || 0,
          image: combo.image || prev.image,
          benefits: Array.isArray(combo.benefits) && combo.benefits.length > 0 
            ? combo.benefits.slice(0, 4) 
            : prev.benefits
        }));
      }
    }
  };

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setEditingHighlight(null);
    setFormData({
      itemType: 'service',
      targetId: servicesList[0]?.id || '',
      title: '',
      seasonalLabel: 'Autumn Special',
      season: 'autumn',
      description: '',
      image: '/images/facial/special-glam-girl-facial.jpg',
      originalPrice: 125,
      promotionalPrice: '',
      validFrom: salonDB.getTodayLocalDateString(),
      validUntil: '2026-12-31',
      isPublished: true,
      isFeatured: false,
      displayOrder: highlights.length + 1,
      benefits: ['Master consultation & personalized analysis', 'Artisan treatment application', 'Complimentary botanical aftercare']
    });
    setFormErrors({});
    setModalTab('details');
    setShowModal(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (highlight) => {
    setEditingHighlight(highlight);
    setFormData({
      itemType: highlight.itemType || 'service',
      targetId: highlight.targetId || '',
      title: highlight.title || '',
      seasonalLabel: highlight.seasonalLabel || 'Seasonal Highlight',
      season: highlight.season || 'autumn',
      description: highlight.description || '',
      image: highlight.image || '/facial-atelier-clean.webp',
      originalPrice: highlight.originalPrice || 0,
      promotionalPrice: highlight.promotionalPrice !== null && highlight.promotionalPrice !== undefined ? highlight.promotionalPrice : '',
      validFrom: highlight.validFrom || '',
      validUntil: highlight.validUntil || '',
      isPublished: highlight.isPublished !== false,
      isFeatured: Boolean(highlight.isFeatured),
      displayOrder: highlight.displayOrder || 1,
      benefits: Array.isArray(highlight.benefits) && highlight.benefits.length > 0 ? highlight.benefits : ['']
    });
    setFormErrors({});
    setModalTab('details');
    setShowModal(true);
  };

  // Benefit bullet management
  const handleAddBenefit = () => {
    setFormData(prev => ({ ...prev, benefits: [...prev.benefits, ''] }));
  };

  const handleBenefitChange = (index, value) => {
    setFormData(prev => {
      const updated = [...prev.benefits];
      updated[index] = value;
      return { ...prev, benefits: updated };
    });
  };

  const handleRemoveBenefit = (index) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, idx) => idx !== index)
    }));
  };

  // Form Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.targetId) errors.targetId = 'Please select a linked service or package';
    if (!formData.seasonalLabel.trim()) errors.seasonalLabel = 'Seasonal label is required';

    const orig = Number(formData.originalPrice);
    if (isNaN(orig) || orig < 0) {
      errors.originalPrice = 'Please enter a valid regular price';
    }

    if (formData.promotionalPrice !== '' && formData.promotionalPrice !== null && formData.promotionalPrice !== undefined) {
      const promo = Number(formData.promotionalPrice);
      if (isNaN(promo) || promo <= 0) {
        errors.promotionalPrice = 'Promotional price must be a positive number';
      } else if (promo >= orig && orig > 0) {
        errors.promotionalPrice = `Promotional price ($${promo}) must be lower than regular price ($${orig})`;
      }
    }

    if (formData.validFrom && formData.validUntil && formData.validUntil < formData.validFrom) {
      errors.validUntil = 'Valid until date cannot be earlier than valid from date';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save Highlight
  const handleSave = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const payload = {
        ...formData,
        originalPrice: Number(formData.originalPrice) || 0,
        promotionalPrice: formData.promotionalPrice !== '' ? Number(formData.promotionalPrice) : null,
        displayOrder: Number(formData.displayOrder) || 1,
        benefits: formData.benefits.filter(b => b.trim().length > 0)
      };

      if (editingHighlight) {
        salonDB.updateSeasonalHighlight(editingHighlight.id, payload);
      } else {
        salonDB.addSeasonalHighlight(payload);
      }

      setShowModal(false);
      refreshData();
    } catch (err) {
      setFormErrors(prev => ({ ...prev, submit: err.message || 'Error saving seasonal highlight' }));
    }
  };

  // Toggle Actions
  const handleTogglePublish = (id) => {
    salonDB.togglePublishSeasonalHighlight(id);
    refreshData();
  };

  const handleToggleFeature = (id) => {
    salonDB.toggleFeatureSeasonalHighlight(id);
    refreshData();
  };

  // Delete Action
  const handleDelete = (id) => {
    salonDB.deleteSeasonalHighlight(id);
    setDeleteConfirmId(null);
    refreshData();
  };

  // Helper for live preview in modal
  const livePreviewData = useMemo(() => {
    const orig = Number(formData.originalPrice) || 0;
    const promo = formData.promotionalPrice !== '' ? Number(formData.promotionalPrice) : null;
    const hasDiscount = promo !== null && promo > 0 && promo < orig;
    const discountPercent = hasDiscount && orig > 0 ? Math.round(((orig - promo) / orig) * 100) : 0;

    return {
      title: formData.title || 'Seasonal Ritual Title',
      seasonalLabel: formData.seasonalLabel || 'Autumn Special',
      description: formData.description || 'Treatment description highlighting personal care and glow rituals for the current season.',
      image: formData.image || '/facial-atelier-clean.webp',
      originalPrice: orig,
      promotionalPrice: promo,
      effectivePrice: hasDiscount ? promo : orig,
      discountPercent,
      validFrom: formData.validFrom,
      validUntil: formData.validUntil,
      benefits: formData.benefits.filter(b => b.trim().length > 0),
      isPublished: formData.isPublished,
      isFeatured: formData.isFeatured
    };
  }, [formData]);

  return (
    <div className="space-y-8 animate-fade-in text-[#10110F]">
      
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & METRICS                                                   */}
      {/* ========================================================================= */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#DCE1D8] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#263D2B]/10 border border-[#263D2B]/20 text-[#263D2B] text-[11px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>SEASONAL ATELIER MANAGEMENT</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#10110F]">
            Seasonal Beauty Menu
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7068] font-light max-w-2xl">
            Control the curated seasonal treatments and packages displayed on the homepage. Configure promotional discounts, validity windows, and publish status in real time.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="global-button !px-5 !py-3 flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-bold shadow-md cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Seasonal Highlight</span>
        </button>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#DCE1D8] text-center shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">Total Items</span>
          <span className="text-xl sm:text-2xl font-serif font-bold text-[#10110F]">{totalCount}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#DCE1D8] text-center shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">Active Live</span>
          <span className="text-xl sm:text-2xl font-serif font-bold text-[#263D2B]">{activeCount}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#DCE1D8] text-center shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">Scheduled</span>
          <span className="text-xl sm:text-2xl font-serif font-bold text-amber-600">{scheduledCount}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#DCE1D8] text-center shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">Drafts</span>
          <span className="text-xl sm:text-2xl font-serif font-bold text-neutral-600">{draftCount}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#DCE1D8] text-center shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block">Expired</span>
          <span className="text-xl sm:text-2xl font-serif font-bold text-rose-500">{expiredCount}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#DCE1D8] text-center shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 block">Featured</span>
          <span className="text-xl sm:text-2xl font-serif font-bold text-amber-500">{featuredCount}</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SEARCH & FILTER CONTROLS                                              */}
      {/* ========================================================================= */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#DCE1D8] shadow-xs flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#6B7068] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, seasonal label, or description..."
            className="w-full h-10 pl-10 pr-4 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] placeholder-[#6B7068] focus:outline-none focus:border-[#263D2B]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs font-semibold text-[#10110F] focus:outline-none focus:border-[#263D2B] cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active (Live on Web)</option>
            <option value="scheduled">Scheduled (Upcoming)</option>
            <option value="draft">Draft (Unpublished)</option>
            <option value="expired">Expired</option>
            <option value="featured">Featured Only</option>
          </select>

          {/* Item Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="h-10 px-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs font-semibold text-[#10110F] focus:outline-none focus:border-[#263D2B] cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="service">Services Only</option>
            <option value="package">Packages Only</option>
          </select>

          {/* Season Filter */}
          <select
            value={seasonFilter}
            onChange={(e) => setSeasonFilter(e.target.value)}
            className="h-10 px-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs font-semibold text-[#10110F] focus:outline-none focus:border-[#263D2B] cursor-pointer"
          >
            <option value="all">All Seasons</option>
            <option value="autumn">Autumn / Fall</option>
            <option value="winter">Winter</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="festive">Festive Harvest</option>
          </select>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. HIGHLIGHTS TABLE & CARD VIEW                                          */}
      {/* ========================================================================= */}
      {filteredHighlights.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-[#DCE1D8] text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center mx-auto">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-normal text-[#10110F]">No Seasonal Highlights Match Your Filters</h3>
          <p className="text-xs text-[#6B7068] max-w-sm mx-auto">
            Try resetting your search query or create a new seasonal offer to display on the homepage.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setStatusFilter('all'); setTypeFilter('all'); setSeasonFilter('all'); }}
            className="global-button-secondary !py-2 !px-4 text-xs font-semibold"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHighlights.map((item) => {
              const orig = Number(item.originalPrice) || 0;
              const promo = item.promotionalPrice !== null ? Number(item.promotionalPrice) : null;
              const hasDiscount = promo !== null && promo > 0 && promo < orig;
              const discountPercent = hasDiscount && orig > 0 ? Math.round(((orig - promo) / orig) * 100) : 0;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-[#DCE1D8] hover:border-[#263D2B] transition-all shadow-xs hover:shadow-lg flex flex-col overflow-hidden group"
                >
                  {/* Card Header & Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F7F4ED]">
                    <img
                      src={item.image || '/facial-atelier-clean.webp'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/facial-atelier-clean.webp';
                      }}
                    />

                    {/* Dark gradient for badge contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#10110F] text-[10px] font-bold uppercase tracking-wider border border-[#DCE1D8] shadow-xs">
                        {item.seasonalLabel}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[9.5px] font-medium uppercase tracking-wider">
                        {item.itemType === 'service' ? 'Service' : 'Combo Package'}
                      </span>
                    </div>

                    {/* Quick Feature Star & Discount Tag */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      {hasDiscount && (
                        <span className="px-2.5 py-1 rounded-full bg-[#263D2B] text-white text-[10px] font-bold shadow-md">
                          {discountPercent}% OFF
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleToggleFeature(item.id)}
                        title={item.isFeatured ? 'Unfeature this item' : 'Feature this item on homepage'}
                        className={`p-1.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer ${
                          item.isFeatured
                            ? 'bg-amber-400 text-[#10110F] shadow-md'
                            : 'bg-black/40 text-white hover:bg-black/60'
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 ${item.isFeatured ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Bottom Status Pill */}
                    <div className="absolute bottom-3 left-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs ${
                        item.status === 'Active'
                          ? 'bg-[#263D2B]/90 text-white'
                          : item.status === 'Scheduled'
                          ? 'bg-amber-500/90 text-white'
                          : item.status === 'Expired'
                          ? 'bg-rose-500/90 text-white'
                          : 'bg-neutral-600/90 text-white'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        {item.status}
                      </span>
                    </div>

                    {/* Display Order */}
                    <div className="absolute bottom-3 right-3 text-white/90 text-[10px] font-mono font-bold bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      #{item.displayOrder}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <h3 className="font-serif text-lg font-normal text-[#10110F] leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#6B7068] font-body line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Pricing block */}
                      <div className="p-3 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between">
                        <div>
                          <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#6B7068] block">
                            {hasDiscount ? 'Seasonal Promo Price' : 'Standard Rate'}
                          </span>
                          <div className="flex items-baseline gap-2 mt-0.5">
                            <span className="font-serif text-xl font-bold text-[#263D2B]">
                              ${item.effectivePrice} <span className="text-[10px] font-sans font-semibold">CAD</span>
                            </span>
                            {hasDiscount && (
                              <span className="text-xs line-through text-[#6B7068]">
                                ${orig} CAD
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Validity Dates */}
                        {(item.validFrom || item.validUntil) && (
                          <div className="text-right">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-[#6B7068] block">Validity</span>
                            <span className="text-[11px] font-mono text-[#10110F] block">
                              {item.validUntil ? `Until ${item.validUntil}` : `From ${item.validFrom}`}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="pt-3 border-t border-[#DCE1D8] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        {/* Publish / Unpublish Toggle */}
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(item.id)}
                          title={item.isPublished ? 'Unpublish (make draft)' : 'Publish highlight'}
                          className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                            item.isPublished
                              ? 'bg-[#263D2B]/10 border-[#263D2B]/20 text-[#263D2B] hover:bg-[#263D2B]/20'
                              : 'bg-neutral-100 border-neutral-300 text-neutral-500 hover:bg-neutral-200'
                          }`}
                        >
                          {item.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          <span className="text-[10px] uppercase font-bold">{item.isPublished ? 'Live' : 'Draft'}</span>
                        </button>

                        {/* Preview button */}
                        <button
                          type="button"
                          onClick={() => setPreviewModalItem(item)}
                          title="Preview public card"
                          className="p-2 rounded-xl border border-[#DCE1D8] text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED] transition-colors cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(item)}
                          className="p-2 rounded-xl border border-[#DCE1D8] text-[#263D2B] hover:bg-[#263D2B]/10 transition-colors cursor-pointer"
                          title="Edit highlight"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-2 rounded-xl border border-rose-200 text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete highlight"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. CREATE / EDIT MODAL                                                   */}
      {/* ========================================================================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-3xl border border-[#DCE1D8] shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col animate-fade-in">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-[#F7F4ED] border-b border-[#DCE1D8] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B] block">
                  {editingHighlight ? 'UPDATE HIGHLIGHT' : 'NEW HIGHLIGHT'}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F]">
                  {editingHighlight ? 'Edit Seasonal Menu Item' : 'Create Seasonal Highlight'}
                </h2>
              </div>

              {/* Tab Switcher: Details vs Live Preview */}
              <div className="flex items-center gap-2">
                <div className="flex bg-white p-1 rounded-xl border border-[#DCE1D8]">
                  <button
                    type="button"
                    onClick={() => setModalTab('details')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      modalTab === 'details' ? 'bg-[#263D2B] text-white shadow-xs' : 'text-[#6B7068] hover:text-[#10110F]'
                    }`}
                  >
                    Details Form
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalTab('preview')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      modalTab === 'preview' ? 'bg-[#263D2B] text-white shadow-xs' : 'text-[#6B7068] hover:text-[#10110F]'
                    }`}
                  >
                    Card Preview
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full hover:bg-black/5 text-[#6B7068] hover:text-[#10110F] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              
              {modalTab === 'preview' ? (
                /* LIVE PREVIEW TAB */
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs text-[#6B7068]">
                    This is a live representation of how this seasonal ritual will display on the Home page (`/`) within the <strong>Seasonal Beauty Menu</strong> section.
                  </div>

                  <div className="max-w-md mx-auto bg-white rounded-3xl border border-[#DCE1D8] shadow-lg overflow-hidden">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#F7F4ED]">
                      <img
                        src={livePreviewData.image}
                        alt={livePreviewData.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = '/facial-atelier-clean.webp'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#10110F] text-[10.5px] font-bold uppercase tracking-wider border border-[#DCE1D8]">
                        {livePreviewData.seasonalLabel}
                      </div>
                      {livePreviewData.discountPercent > 0 && (
                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#263D2B] text-white text-[10.5px] font-bold shadow-md">
                          {livePreviewData.discountPercent}% OFF
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#263D2B]/90 text-white backdrop-blur-xs">
                          {livePreviewData.isPublished ? 'Published Offer' : 'Draft Preview'}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <h4 className="font-serif text-xl font-normal text-[#10110F]">{livePreviewData.title}</h4>
                        <p className="text-xs text-[#6B7068] mt-2 leading-relaxed">{livePreviewData.description}</p>
                      </div>

                      {livePreviewData.benefits.length > 0 && (
                        <div className="space-y-1.5 pt-1 border-t border-[#DCE1D8]/60">
                          {livePreviewData.benefits.slice(0, 3).map((b, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-[#10110F]">
                              <Check className="w-3.5 h-3.5 text-[#263D2B] flex-shrink-0" />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">Seasonal Rate</span>
                          <div className="flex items-baseline gap-2 mt-0.5">
                            <span className="font-serif text-2xl font-bold text-[#263D2B]">
                              ${livePreviewData.effectivePrice} <span className="text-xs font-sans font-semibold">CAD</span>
                            </span>
                            {livePreviewData.discountPercent > 0 && (
                              <span className="text-xs line-through text-[#6B7068]">
                                ${livePreviewData.originalPrice} CAD
                              </span>
                            )}
                          </div>
                        </div>

                        {livePreviewData.validUntil && (
                          <div className="text-right">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-[#6B7068] block">Offer Valid Until</span>
                            <span className="text-xs font-mono font-bold text-[#10110F]">{livePreviewData.validUntil}</span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <button type="button" className="global-button-secondary !py-2.5 !text-xs uppercase font-bold text-center">
                          View Details
                        </button>
                        <button type="button" className="global-button !py-2.5 !text-xs uppercase font-bold text-center">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* DETAILS FORM */
                <form id="seasonalForm" onSubmit={handleSave} className="space-y-5">
                  
                  {formErrors.submit && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{formErrors.submit}</span>
                    </div>
                  )}

                  {/* 1. Item Type & Target Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                        Highlight Type *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleTargetChange('service', servicesList[0]?.id || '')}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            formData.itemType === 'service'
                              ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                              : 'bg-white border-[#DCE1D8] text-[#6B7068] hover:text-[#10110F]'
                          }`}
                        >
                          Single Service
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTargetChange('package', comboPackages[0]?.id || '')}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            formData.itemType === 'package'
                              ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                              : 'bg-white border-[#DCE1D8] text-[#6B7068] hover:text-[#10110F]'
                          }`}
                        >
                          Combo Package
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                        Link Existing {formData.itemType === 'service' ? 'Service' : 'Combo Package'} *
                      </label>
                      <select
                        value={formData.targetId}
                        onChange={(e) => handleTargetChange(formData.itemType, e.target.value)}
                        className="w-full h-10 px-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs font-medium text-[#10110F] focus:outline-none focus:border-[#263D2B] cursor-pointer"
                      >
                        <option value="">Select target...</option>
                        {formData.itemType === 'service' ? (
                          servicesList.map(s => (
                            <option key={s.id} value={s.id}>
                              {s.name} (${s.price} CAD) — {s.categoryName || s.category}
                            </option>
                          ))
                        ) : (
                          comboPackages.map(c => (
                            <option key={c.id} value={c.id}>
                              {c.name} (${c.comboPrice} CAD)
                            </option>
                          ))
                        )}
                      </select>
                      {formErrors.targetId && (
                        <p className="text-[11px] text-rose-500 mt-1">{formErrors.targetId}</p>
                      )}
                    </div>
                  </div>

                  {/* 2. Title & Seasonal Label */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                        Highlight Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g. Autumn Radiance Renewal Facial"
                        className="w-full h-10 px-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                      />
                      {formErrors.title && (
                        <p className="text-[11px] text-rose-500 mt-1">{formErrors.title}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                        Seasonal Label Badge *
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formData.seasonalLabel}
                          onChange={(e) => setFormData(prev => ({ ...prev, seasonalLabel: e.target.value }))}
                          placeholder="e.g. Autumn Special"
                          className="flex-1 h-10 px-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                        />
                        <select
                          onChange={(e) => {
                            if (e.target.value) setFormData(prev => ({ ...prev, seasonalLabel: e.target.value }));
                          }}
                          className="h-10 px-2.5 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs text-[#6B7068] cursor-pointer"
                        >
                          <option value="">Presets...</option>
                          {PRESET_SEASONAL_LABELS.map((lbl, idx) => (
                            <option key={idx} value={lbl}>{lbl}</option>
                          ))}
                        </select>
                      </div>
                      {formErrors.seasonalLabel && (
                        <p className="text-[11px] text-rose-500 mt-1">{formErrors.seasonalLabel}</p>
                      )}
                    </div>
                  </div>

                  {/* 3. Season & Display Order */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                        Season Theme
                      </label>
                      <select
                        value={formData.season}
                        onChange={(e) => setFormData(prev => ({ ...prev, season: e.target.value }))}
                        className="w-full h-10 px-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs font-medium text-[#10110F] focus:outline-none focus:border-[#263D2B] cursor-pointer"
                      >
                        <option value="autumn">Autumn / Fall</option>
                        <option value="winter">Winter</option>
                        <option value="spring">Spring</option>
                        <option value="summer">Summer</option>
                        <option value="festive">Festive Harvest</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                        Display Order (1 = First)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.displayOrder}
                        onChange={(e) => setFormData(prev => ({ ...prev, displayOrder: e.target.value }))}
                        className="w-full h-10 px-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs font-mono text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                      />
                    </div>
                  </div>

                  {/* 4. Description */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                      Short Description *
                    </label>
                    <textarea
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the seasonal ritual, focus, and botanical ingredients..."
                      className="w-full p-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                    />
                  </div>

                  {/* 5. Pricing & Promotional Discount */}
                  <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                      Pricing & Seasonal Discount Configuration
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-[#10110F] mb-1">
                          Regular / Base Price (CAD) *
                        </label>
                        <div className="relative">
                          <DollarSign className="w-3.5 h-3.5 text-[#6B7068] absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="number"
                            min="0"
                            value={formData.originalPrice}
                            onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                            className="w-full h-10 pl-8 pr-3 bg-white border border-[#DCE1D8] rounded-xl text-xs font-mono font-bold text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                          />
                        </div>
                        {formErrors.originalPrice && (
                          <p className="text-[11px] text-rose-500 mt-1">{formErrors.originalPrice}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#10110F] mb-1">
                          Promotional Price (CAD) <span className="text-[#6B7068] font-normal">(Optional)</span>
                        </label>
                        <div className="relative">
                          <DollarSign className="w-3.5 h-3.5 text-[#6B7068] absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="number"
                            min="0"
                            value={formData.promotionalPrice}
                            onChange={(e) => setFormData(prev => ({ ...prev, promotionalPrice: e.target.value }))}
                            placeholder="Leave empty for regular rate"
                            className="w-full h-10 pl-8 pr-3 bg-white border border-[#DCE1D8] rounded-xl text-xs font-mono font-bold text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                          />
                        </div>
                        {formErrors.promotionalPrice && (
                          <p className="text-[11px] text-rose-500 mt-1">{formErrors.promotionalPrice}</p>
                        )}
                      </div>
                    </div>

                    {/* Calculated Discount Feedback */}
                    {formData.promotionalPrice !== '' && Number(formData.promotionalPrice) > 0 && Number(formData.promotionalPrice) < Number(formData.originalPrice) && (
                      <div className="p-2.5 rounded-xl bg-white border border-[#263D2B]/30 flex items-center justify-between text-xs">
                        <span className="text-[#263D2B] font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-[#263D2B]" />
                          Valid Seasonal Discount: Save ${Number(formData.originalPrice) - Number(formData.promotionalPrice)} CAD
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#263D2B] text-white font-bold text-[10px]">
                          {Math.round(((Number(formData.originalPrice) - Number(formData.promotionalPrice)) / Number(formData.originalPrice)) * 100)}% OFF
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 6. Validity Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                        Valid From (Date)
                      </label>
                      <input
                        type="date"
                        value={formData.validFrom}
                        onChange={(e) => setFormData(prev => ({ ...prev, validFrom: e.target.value }))}
                        className="w-full h-10 px-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B] cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                        Valid Until (Expiry Date)
                      </label>
                      <input
                        type="date"
                        value={formData.validUntil}
                        onChange={(e) => setFormData(prev => ({ ...prev, validUntil: e.target.value }))}
                        className="w-full h-10 px-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B] cursor-pointer"
                      />
                      {formErrors.validUntil && (
                        <p className="text-[11px] text-rose-500 mt-1">{formErrors.validUntil}</p>
                      )}
                    </div>
                  </div>

                  {/* 7. Image selection */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                      Card Image URL *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                        placeholder="/images/facial/..."
                        className="flex-1 h-10 px-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                      />
                      <select
                        onChange={(e) => {
                          if (e.target.value) setFormData(prev => ({ ...prev, image: e.target.value }));
                        }}
                        className="h-10 px-2.5 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs text-[#6B7068] cursor-pointer"
                      >
                        <option value="">Salon Presets...</option>
                        {PRESET_IMAGES.map((img, idx) => (
                          <option key={idx} value={img.url}>{img.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 8. Ritual Highlights / Benefits bullets */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F]">
                        Ritual Highlights & Benefits
                      </label>
                      <button
                        type="button"
                        onClick={handleAddBenefit}
                        className="text-xs text-[#263D2B] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Bullet</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {formData.benefits.map((b, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={b}
                            onChange={(e) => handleBenefitChange(idx, e.target.value)}
                            placeholder="e.g. Ultrasonic hydra-dermal infusion"
                            className="flex-1 h-9 px-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-lg text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                          />
                          {formData.benefits.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveBenefit(idx)}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 9. Publish & Feature Toggles */}
                  <div className="pt-2 flex flex-wrap items-center gap-6">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isPublished}
                        onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                        className="w-4 h-4 rounded text-[#263D2B] focus:ring-[#263D2B] cursor-pointer"
                      />
                      <span className="text-xs font-bold text-[#10110F]">
                        Publish Immediately on Website
                      </span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                        className="w-4 h-4 rounded text-[#263D2B] focus:ring-[#263D2B] cursor-pointer"
                      />
                      <span className="text-xs font-bold text-[#10110F]">
                        Mark as Featured Seasonal Item
                      </span>
                    </label>
                  </div>

                </form>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-[#F7F4ED] border-t border-[#DCE1D8] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="global-button-secondary !py-2.5 !px-5 text-xs font-semibold"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="global-button !py-2.5 !px-6 text-xs uppercase tracking-wider font-bold shadow-md cursor-pointer"
              >
                {editingHighlight ? 'Save Changes' : 'Create Highlight'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. PUBLIC CARD PREVIEW MODAL (STANDALONE)                                 */}
      {/* ========================================================================= */}
      {previewModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-3xl border border-[#DCE1D8] shadow-2xl overflow-hidden animate-fade-in">
            <div className="p-4 bg-[#F7F4ED] border-b border-[#DCE1D8] flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B]">
                HOMEPAGE CARD PREVIEW
              </span>
              <button
                onClick={() => setPreviewModalItem(null)}
                className="p-1 rounded-full hover:bg-black/5 text-[#6B7068] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#F7F4ED]">
                <img
                  src={previewModalItem.image}
                  alt={previewModalItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 text-[#10110F] text-[10.5px] font-bold uppercase tracking-wider shadow-xs">
                  {previewModalItem.seasonalLabel}
                </div>
                {previewModalItem.discountPercent > 0 && (
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#263D2B] text-white text-[10.5px] font-bold shadow-md">
                    {previewModalItem.discountPercent}% OFF
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-serif text-xl font-normal text-[#10110F]">{previewModalItem.title}</h4>
                <p className="text-xs text-[#6B7068] mt-2 leading-relaxed">{previewModalItem.description}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">Seasonal Rate</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-serif text-2xl font-bold text-[#263D2B]">
                      ${previewModalItem.effectivePrice} <span className="text-xs font-sans font-semibold">CAD</span>
                    </span>
                    {previewModalItem.discountPercent > 0 && (
                      <span className="text-xs line-through text-[#6B7068]">
                        ${previewModalItem.originalPrice} CAD
                      </span>
                    )}
                  </div>
                </div>

                {previewModalItem.validUntil && (
                  <div className="text-right">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#6B7068] block">Offer Valid Until</span>
                    <span className="text-xs font-mono font-bold text-[#10110F]">{previewModalItem.validUntil}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-[#F7F4ED] border-t border-[#DCE1D8] text-center">
              <button
                onClick={() => setPreviewModalItem(null)}
                className="global-button !py-2 !px-6 text-xs font-bold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. DELETE CONFIRMATION MODAL                                              */}
      {/* ========================================================================= */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white max-w-sm w-full p-6 rounded-3xl border border-[#DCE1D8] shadow-2xl text-center space-y-4 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-normal text-[#10110F]">
              Delete Seasonal Highlight?
            </h3>
            <p className="text-xs text-[#6B7068] leading-relaxed">
              This will remove the seasonal highlight from the database and homepage. The linked catalog service or package will remain intact.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="global-button-secondary !py-2 !px-4 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="bg-rose-600 hover:bg-rose-700 text-white !py-2 !px-4 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
