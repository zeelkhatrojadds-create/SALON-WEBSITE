import React, { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Edit3,
  Sparkles,
  Calendar,
  X,
  AlertCircle,
  Eye,
  EyeOff,
  Gift,
  Check,
  Search
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';

// Official salon festivals and celebrations
const PRESET_FESTIVALS = [
  'Canadian Thanksgiving Special',
  'Thanksgiving Special',
  'Halloween Glam',
  'Christmas Beauty Special',
  'New Year Glam',
  "Valentine's Day Special",
  'Seasonal Celebration',
  'Bridal Season'
];

// Curated festival imagery presets
const PRESET_BANNER_IMAGES = [
  { label: 'Canadian Thanksgiving Special — Fall Into Your Beauty Glow', url: '/images/festivals/thanksgiving-glow.jpg' },
  { label: 'Thanksgiving Special — Fall Into Your Beauty Glow', url: '/images/festivals/thanksgiving-glow.jpg' },
  { label: 'Halloween Glam — Get Ready to Glow', url: '/images/festivals/halloween-glam.jpg' },
  { label: 'Christmas Beauty — Your Holiday Glam Starts Here', url: '/images/festivals/christmas-glow.jpg' },
  { label: 'New Year Glam — New Year, New Glow', url: '/images/festivals/new-year-glow.jpg' },
  { label: "Valentine's Day Special — A Little Love, A Lot of Glow", url: 'blob:https://chatgpt.com/b488545c-cd9d-4a5c-b7e5-168995318b7e' },
  { label: 'Facial Atelier & Herbal Glow', url: '/facial-atelier-clean.jpg' }
];

export default function AdminOffers() {
  const [activeTab, setActiveTab] = useState('festivals'); // 'festivals' | 'coupons'

  // Data state
  const [festivalOffers, setFestivalOffers] = useState(() => salonDB.getFestivalOffers());
  const [standardOffers, setStandardOffers] = useState(() => salonDB.getOffers());
  const [servicesList, setServicesList] = useState(() => salonDB.getServices());
  const [settings, setSettings] = useState(() => salonDB.getSettings());
  const [popupSaveSuccess, setPopupSaveSuccess] = useState(false);

  // Festival Offer Modal State
  const [showFestModal, setShowFestModal] = useState(false);
  const [editingFestOffer, setEditingFestOffer] = useState(null);

  // Search & Filter for Festival Offers table
  const [festSearchQuery, setFestSearchQuery] = useState('');
  const [festStatusFilter, setFestStatusFilter] = useState('all');

  // Coupon Modal State
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);

  // Form data for Festival Offer
  const [festForm, setFestForm] = useState({
    festival: 'Diwali',
    customFestival: '',
    title: '',
    tagline: '',
    description: '',
    bannerImage: '/images/festivals/diwali-glow.jpg',
    includedServiceIds: [],
    originalPrice: 150,
    discountedPrice: 105,
    startDate: salonDB.getTodayLocalDateString(),
    endDate: '2026-11-15',
    status: 'Active',
    isPublished: true,
    displayOrder: 1,
    promoCode: '',
    usageLimit: '',
    terms: 'Valid on advance reservations only. Cannot be combined with other promotional coupons.',
    popupCtaText: 'EXPLORE FESTIVAL OFFER',
    showInHomepagePopup: true
  });

  const [formErrors, setFormErrors] = useState({});

  // Coupon Form State
  const [couponForm, setCouponForm] = useState({
    title: '',
    description: '',
    discountType: 'percentage',
    discountValue: 15,
    couponCode: 'GLOW15',
    startDate: salonDB.getTodayLocalDateString(),
    endDate: '2026-12-31',
    isActive: true
  });

  // Sync with DB
  useEffect(() => {
    const sync = () => {
      setFestivalOffers(salonDB.getFestivalOffers());
      setStandardOffers(salonDB.getOffers());
      setServicesList(salonDB.getServices());
      setSettings(salonDB.getSettings());
    };
    sync();
    const unsub = salonDB.subscribe(sync);
    return () => unsub();
  }, []);

  // Handler to update global homepage popup settings
  const handleUpdatePopupSetting = (key, value) => {
    const updated = salonDB.updateSettings({ [key]: value });
    setSettings(updated);
    setPopupSaveSuccess(true);
    setTimeout(() => setPopupSaveSuccess(false), 2000);
  };

  // Filtered festival offers
  const filteredFestOffers = festivalOffers.filter((o) => {
    const matchesSearch =
      o.title?.toLowerCase().includes(festSearchQuery.toLowerCase()) ||
      o.festival?.toLowerCase().includes(festSearchQuery.toLowerCase()) ||
      o.description?.toLowerCase().includes(festSearchQuery.toLowerCase()) ||
      (o.promoCode && o.promoCode.toLowerCase().includes(festSearchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (festStatusFilter === 'all') return true;
    if (festStatusFilter === 'published') return o.isPublished;
    if (festStatusFilter === 'unpublished') return !o.isPublished;
    return o.status?.toLowerCase() === festStatusFilter.toLowerCase();
  });

  // Open Create Festival Offer Modal
  const handleOpenAddFest = () => {
    setEditingFestOffer(null);
    const today = salonDB.getTodayLocalDateString();

    // Pick the first 2 popular services as initial default if available
    const initialServices = servicesList.slice(0, 2).map(s => s.id);
    const initialSum = servicesList.slice(0, 2).reduce((sum, s) => sum + (Number(s.price) || 0), 0);
    const defaultOriginal = initialSum || 140;
    const defaultDiscounted = Math.round(defaultOriginal * 0.75); // 25% off

    setFestForm({
      festival: 'Diwali',
      customFestival: '',
      title: 'Grand Diwali Glow Ritual',
      tagline: 'Luminous festive transformation',
      description: 'Pamper your skin and locks with an auspicious beauty bundle crafted for Diwali celebrations.',
      bannerImage: '/images/festivals/diwali-glow.jpg',
      includedServiceIds: initialServices,
      originalPrice: defaultOriginal,
      discountedPrice: defaultDiscounted,
      startDate: today,
      endDate: '2026-11-15',
      status: 'Active',
      isPublished: true,
      displayOrder: festivalOffers.length + 1,
      promoCode: 'DIWALI26',
      usageLimit: '50 bookings',
      terms: 'Advance booking required. Cannot be merged with other coupons. Includes complimentary herbal consultation.',
      popupCtaText: 'EXPLORE FESTIVAL OFFER',
      showInHomepagePopup: true
    });
    setFormErrors({});
    setShowFestModal(true);
  };

  // Open Edit Festival Offer Modal
  const handleOpenEditFest = (item) => {
    setEditingFestOffer(item);
    const isCustom = !PRESET_FESTIVALS.includes(item.festival);

    setFestForm({
      festival: isCustom ? 'Other' : item.festival,
      customFestival: isCustom ? item.festival : '',
      title: item.title || '',
      tagline: item.tagline || '',
      description: item.description || '',
      bannerImage: item.bannerImage || '/images/festivals/diwali-glow.jpg',
      includedServiceIds: Array.isArray(item.includedServiceIds) ? item.includedServiceIds : [],
      originalPrice: Number(item.originalPrice) || 0,
      discountedPrice: Number(item.discountedPrice) || 0,
      startDate: item.startDate || salonDB.getTodayLocalDateString(),
      endDate: item.endDate || '',
      status: item.status || 'Active',
      isPublished: item.isPublished !== false,
      displayOrder: Number(item.displayOrder) || 1,
      promoCode: item.promoCode || '',
      usageLimit: item.usageLimit || '',
      terms: Array.isArray(item.terms) ? item.terms.join('. ') : (item.terms || ''),
      popupCtaText: item.popupCtaText || 'EXPLORE FESTIVAL OFFER',
      showInHomepagePopup: item.showInHomepagePopup !== false
    });
    setFormErrors({});
    setShowFestModal(true);
  };

  // Toggle Included Service in Form
  const handleToggleService = (serviceId) => {
    const prev = festForm.includedServiceIds || [];
    let updated;
    if (prev.includes(serviceId)) {
      updated = prev.filter(id => id !== serviceId);
    } else {
      updated = [...prev, serviceId];
    }

    // Auto-calculate suggested original price based on selected services
    const sum = servicesList
      .filter(s => updated.includes(s.id))
      .reduce((acc, s) => acc + (Number(s.price) || 0), 0);

    setFestForm(prevForm => ({
      ...prevForm,
      includedServiceIds: updated,
      // If originalPrice was equal to the previous sum or 0, update it automatically
      originalPrice: sum > 0 ? sum : prevForm.originalPrice
    }));
  };

  // Form Validation
  const validateFestForm = () => {
    const errors = {};
    const effectiveFestival = festForm.festival === 'Other' ? festForm.customFestival.trim() : festForm.festival;

    if (!effectiveFestival) {
      errors.festival = 'Please specify a festival or celebration name.';
    }

    if (!festForm.title.trim()) {
      errors.title = 'Offer title is required.';
    }

    const orig = Number(festForm.originalPrice);
    const disc = Number(festForm.discountedPrice);

    if (isNaN(orig) || orig <= 0) {
      errors.originalPrice = 'Original price must be greater than 0 CAD.';
    }

    if (isNaN(disc) || disc <= 0) {
      errors.discountedPrice = 'Offer price must be greater than 0 CAD.';
    } else if (orig > 0 && disc > orig) {
      errors.discountedPrice = 'Offer price cannot be higher than original price.';
    }

    if (!festForm.startDate) {
      errors.startDate = 'Start date is required.';
    }

    if (!festForm.endDate) {
      errors.endDate = 'Expiry date is required.';
    } else if (festForm.startDate && festForm.endDate < festForm.startDate) {
      errors.endDate = 'Expiry date cannot be earlier than start date.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save Festival Offer
  const handleSaveFestOffer = (e) => {
    e.preventDefault();
    if (!validateFestForm()) return;

    const effectiveFestival = festForm.festival === 'Other' ? festForm.customFestival.trim() : festForm.festival;
    const orig = Number(festForm.originalPrice);
    const disc = Number(festForm.discountedPrice);
    const discountPercent = orig > 0 ? Math.round(((orig - disc) / orig) * 100) : 0;

    const payload = {
      festival: effectiveFestival,
      title: festForm.title.trim(),
      tagline: festForm.tagline.trim(),
      description: festForm.description.trim(),
      bannerImage: festForm.bannerImage,
      includedServiceIds: festForm.includedServiceIds,
      primaryServiceId: festForm.includedServiceIds[0] || '',
      originalPrice: orig,
      discountedPrice: disc,
      discountPercent: discountPercent,
      startDate: festForm.startDate,
      endDate: festForm.endDate,
      status: festForm.status,
      isPublished: Boolean(festForm.isPublished),
      displayOrder: Number(festForm.displayOrder) || 1,
      promoCode: festForm.promoCode ? festForm.promoCode.trim().toUpperCase() : '',
      usageLimit: festForm.usageLimit.trim(),
      terms: festForm.terms.trim(),
      popupCtaText: festForm.popupCtaText ? festForm.popupCtaText.trim() : 'EXPLORE FESTIVAL OFFER',
      showInHomepagePopup: Boolean(festForm.showInHomepagePopup)
    };

    if (editingFestOffer) {
      salonDB.updateFestivalOffer(editingFestOffer.id, payload);
    } else {
      salonDB.addFestivalOffer(payload);
    }

    setShowFestModal(false);
    setEditingFestOffer(null);
  };

  // Toggle Quick Publish
  const handleTogglePublish = (offer) => {
    salonDB.updateFestivalOffer(offer.id, { isPublished: !offer.isPublished });
  };

  // Quick Status Change
  const handleChangeStatus = (offer, newStatus) => {
    salonDB.updateFestivalOffer(offer.id, { status: newStatus });
  };

  // Delete Festival Offer
  const handleDeleteFestOffer = (id, title) => {
    if (window.confirm(`Are you sure you want to delete festival offer "${title}"?`)) {
      salonDB.deleteFestivalOffer(id);
    }
  };

  // ==========================================
  // COUPON MANAGEMENT METHODS
  // ==========================================
  const handleOpenAddCoupon = () => {
    setEditingCoupon(null);
    setCouponForm({
      title: '',
      description: '',
      discountType: 'percentage',
      discountValue: 15,
      couponCode: 'GLOW15',
      startDate: salonDB.getTodayLocalDateString(),
      endDate: '2026-12-31',
      isActive: true
    });
    setShowCouponModal(true);
  };

  const handleOpenEditCoupon = (item) => {
    setEditingCoupon(item);
    setCouponForm({
      title: item.title || '',
      description: item.description || '',
      discountType: item.discountType || 'percentage',
      discountValue: item.discountValue || 15,
      couponCode: item.couponCode || '',
      startDate: item.startDate || '',
      endDate: item.endDate || '',
      isActive: item.isActive !== false
    });
    setShowCouponModal(true);
  };

  const handleSaveCoupon = (e) => {
    e.preventDefault();
    if (!couponForm.title) return;

    const payload = {
      title: couponForm.title.trim(),
      description: couponForm.description.trim(),
      discountType: couponForm.discountType,
      discountValue: Number(couponForm.discountValue) || 0,
      couponCode: couponForm.couponCode.trim().toUpperCase(),
      startDate: couponForm.startDate,
      endDate: couponForm.endDate,
      isActive: couponForm.isActive
    };

    if (editingCoupon) {
      salonDB.updateOffer(editingCoupon.id, payload);
    } else {
      salonDB.addOffer(payload);
    }

    setShowCouponModal(false);
    setEditingCoupon(null);
  };

  const handleDeleteCoupon = (id, title) => {
    if (window.confirm(`Delete coupon "${title}"?`)) {
      salonDB.deleteOffer(id);
    }
  };

  // Calculate live discount for preview in modal
  const modalOrig = Number(festForm.originalPrice) || 0;
  const modalDisc = Number(festForm.discountedPrice) || 0;
  const modalPercent = modalOrig > 0 && modalDisc <= modalOrig
    ? Math.round(((modalOrig - modalDisc) / modalOrig) * 100)
    : 0;

  return (
    <div className="space-y-6 animate-fade-in text-[#10110F]">
      {/* Top Banner & Tab Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#DCE1D8]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#263D2B]/10 text-[#263D2B] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Seasonal Promotions Suite</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#10110F]">
            Festival Offers & Promos
          </h2>
          <p className="text-[#6B7068] text-xs sm:text-sm">
            Curate multi-festival packages, manage countdown timers, and control homepage promotions.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2 bg-[#F7F4ED] p-1.5 rounded-2xl border border-[#DCE1D8] self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('festivals')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'festivals'
                ? 'bg-[#263D2B] text-white shadow-sm'
                : 'text-[#6B7068] hover:text-[#10110F]'
              }`}
          >
            Festival Beauty Offers ({festivalOffers.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('coupons')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'coupons'
                ? 'bg-[#263D2B] text-white shadow-sm'
                : 'text-[#6B7068] hover:text-[#10110F]'
              }`}
          >
            General Promo Codes ({standardOffers.length})
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: FESTIVAL BEAUTY OFFERS MANAGEMENT                                  */}
      {/* ========================================================================= */}
      {activeTab === 'festivals' && (
        <div className="space-y-6">
          {/* HOMEPAGE FESTIVAL SPECIAL OFFERS POPUP CONTROL CARD */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#DCE1D8] shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DCE1D8]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-center text-[#263D2B]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#10110F]">
                    Homepage Festival Special Offers Popup
                  </h4>
                  <p className="text-xs text-[#6B7068]">
                    Controls the luxury promotional modal presented on the main homepage (~3 seconds after arrival).
                  </p>
                </div>
              </div>

              {popupSaveSuccess && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#263D2B] text-white text-[11px] font-bold animate-fade-in self-start sm:self-auto">
                  <Check className="w-3.5 h-3.5" />
                  <span>Settings Saved</span>
                </div>
              )}
            </div>

            {/* Quick Settings Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 1. Modal Enabled Toggle */}
              <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#10110F]">Modal Status</span>
                    <button
                      type="button"
                      onClick={() => handleUpdatePopupSetting('festivalPopupEnabled', !settings.festivalPopupEnabled)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${settings.festivalPopupEnabled !== false
                          ? 'bg-[#263D2B] text-white shadow-xs'
                          : 'bg-neutral-200 text-neutral-700'
                        }`}
                    >
                      {settings.festivalPopupEnabled !== false ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                  <p className="text-[11px] text-[#6B7068] pt-1">
                    {settings.festivalPopupEnabled !== false
                      ? 'Visitors receive promotional popup on homepage.'
                      : 'Popup is temporarily disabled across the homepage.'}
                  </p>
                </div>
              </div>

              {/* 2. Display Delay */}
              <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2">
                <span className="font-bold text-xs text-[#10110F] block">Display Delay (Seconds)</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={settings.festivalPopupDelaySeconds || 3}
                    onChange={(e) => handleUpdatePopupSetting('festivalPopupDelaySeconds', Math.max(1, Number(e.target.value) || 3))}
                    className="w-20 p-2 bg-white border border-[#DCE1D8] rounded-xl text-xs font-mono font-bold text-[#10110F]"
                  />
                  <span className="text-[11px] text-[#6B7068]">seconds after page load</span>
                </div>
              </div>

              {/* 3. Dismissal Schedule & Frequency */}
              <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2">
                <span className="font-bold text-xs text-[#10110F] block">Schedule & Frequency</span>
                <select
                  value={settings.festivalPopupFrequency || 'every_session'}
                  onChange={(e) => handleUpdatePopupSetting('festivalPopupFrequency', e.target.value)}
                  className="w-full p-2 bg-white border border-[#DCE1D8] rounded-xl text-xs text-[#10110F]"
                >
                  <option value="every_session">Once per browser session</option>
                  <option value="once_daily">Once per calendar day (strict)</option>
                </select>
              </div>

              {/* 4. Carousel Slide Count */}
              <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2">
                <span className="font-bold text-xs text-[#10110F] block">Carousel Slide Count</span>
                <select
                  value={settings.festivalPopupMaxOffers || 2}
                  onChange={(e) => handleUpdatePopupSetting('festivalPopupMaxOffers', Number(e.target.value))}
                  className="w-full p-2 bg-white border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] font-bold"
                >
                  <option value={1}>1 Main Offer</option>
                  <option value={2}>2 Main Offers (Thanksgiving & Halloween)</option>
                  <option value={3}>3 Main Offers</option>
                  <option value={5}>5 All Festival Offers</option>
                </select>
              </div>
            </div>

            {/* Currently Active Carousel Slides Preview */}
            {(() => {
              const activePopupOffers = salonDB.getHomepageFestivalPopupOffers();
              return (
                <div className="p-3.5 rounded-2xl border border-[#DCE1D8] bg-[#F7F4ED]/60 flex flex-col gap-3 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-bold text-[#10110F]">
                      Homepage Popup Carousel ({activePopupOffers.length} main offers active)
                    </span>
                    <span className="text-[11px] text-[#263D2B]">
                      5-second autoplay • Touch swipe enabled • Arrows & dots navigation
                    </span>
                  </div>

                  {activePopupOffers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-1">
                      {activePopupOffers.map((o, idx) => (
                        <div key={o.id} className="p-2.5 rounded-xl bg-white border border-[#DCE1D8] flex items-center gap-2.5 shadow-2xs">
                          <img
                            src={o.bannerImage}
                            alt={o.title}
                            className="w-12 h-12 rounded-lg object-cover border border-[#DCE1D8] shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1">
                              <span className="text-[9px] font-bold text-[#6B7068] font-mono">#{idx + 1}</span>
                              <span className="font-bold text-[11px] text-[#10110F] truncate">{o.festival}</span>
                            </div>
                            <div className="text-[10px] text-[#263D2B] font-bold">
                              {o.discountPercent}% OFF • ${o.discountedPrice} CAD
                            </div>
                            <div className="text-[9px] text-[#6B7068] truncate">
                              {o.title}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-[#6B7068]">
                      <AlertCircle className="w-4 h-4 text-[#465640]" />
                      <span>
                        {settings.festivalPopupEnabled === false
                          ? 'Popup is currently disabled in settings.'
                          : 'No active festival offer is currently eligible for the homepage popup. Ensure offers are Active, have current dates, and "Show in Homepage Promotional Popup" is enabled.'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>

          {/* Action Header & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7068]" />
                <input
                  type="text"
                  placeholder="Search by festival, title, code..."
                  value={festSearchQuery}
                  onChange={(e) => setFestSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                />
              </div>

              <select
                value={festStatusFilter}
                onChange={(e) => setFestStatusFilter(e.target.value)}
                className="py-2.5 px-3 bg-white border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published Only</option>
                <option value="unpublished">Unpublished / Drafts</option>
                <option value="active">Active Status</option>
                <option value="scheduled">Scheduled Status</option>
                <option value="expired">Expired Status</option>
              </select>
            </div>

            <button
              onClick={handleOpenAddFest}
              className="global-button inline-flex items-center justify-center gap-2 !px-5 !py-2.5 text-white text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Create Festival Offer</span>
            </button>
          </div>

          {/* Offers Table / Cards Grid */}
          {filteredFestOffers.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-[#DCE1D8] space-y-3">
              <Gift className="w-10 h-10 text-[#6B7068] mx-auto opacity-40" />
              <h4 className="font-serif font-bold text-base text-[#10110F]">No festival offers found</h4>
              <p className="text-xs text-[#6B7068] max-w-md mx-auto">
                {festSearchQuery
                  ? 'No festival offers match your current filter criteria.'
                  : 'Start by creating celebratory packages for Diwali, Karwa Chauth, Christmas, New Year, or Mother\'s Day.'}
              </p>
              <button
                onClick={handleOpenAddFest}
                className="mt-2 global-button !px-5 !py-2 !text-xs uppercase tracking-wider inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create First Festival Offer</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredFestOffers.map((offer) => {
                const orig = Number(offer.originalPrice) || 0;
                const disc = Number(offer.discountedPrice) || 0;
                const pct = orig > 0 ? Math.round(((orig - disc) / orig) * 100) : (offer.discountPercent || 0);

                return (
                  <div
                    key={offer.id}
                    className={`rounded-3xl bg-white border transition-all duration-200 overflow-hidden flex flex-col shadow-xs hover:shadow-md ${offer.isPublished
                        ? 'border-[#DCE1D8] hover:border-[#263D2B]'
                        : 'border-dashed border-neutral-300 opacity-75'
                      }`}
                  >
                    {/* Header Image with Quick Badges */}
                    <div className="relative aspect-[16/8] overflow-hidden bg-[#F7F4ED]">
                      <img
                        src={offer.bannerImage || '/images/festivals/diwali-glow.jpg'}
                        alt={offer.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/facial-atelier-clean.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 text-[#10110F] text-[10.5px] font-bold shadow-xs">
                        <Sparkles className="w-3 h-3 text-[#263D2B]" />
                        <span>{offer.festival}</span>
                      </div>

                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${offer.isPublished
                            ? 'bg-emerald-600 text-white'
                            : 'bg-neutral-800 text-neutral-200'
                          }`}>
                          {offer.isPublished ? 'Published' : 'Hidden / Draft'}
                        </span>
                      </div>

                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium">
                        <span className="font-serif font-bold text-sm truncate pr-2">{offer.title}</span>
                        {pct > 0 && (
                          <span className="bg-[#263D2B] text-white px-2 py-0.5 rounded-md font-bold text-[10px] shrink-0">
                            {pct}% OFF
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        {offer.tagline && (
                          <p className="text-[11px] font-semibold text-[#465640] uppercase tracking-wider">
                            {offer.tagline}
                          </p>
                        )}
                        <p className="text-xs text-[#6B7068] line-clamp-2 leading-relaxed">
                          {offer.description}
                        </p>

                        {/* Included Services preview */}
                        {Array.isArray(offer.includedServiceIds) && offer.includedServiceIds.length > 0 && (
                          <div className="pt-1 flex flex-wrap gap-1">
                            {offer.includedServiceIds.slice(0, 3).map((sid) => {
                              const srv = servicesList.find(s => s.id === sid);
                              return (
                                <span key={sid} className="px-2 py-0.5 rounded-md bg-[#F7F4ED] text-[#263D2B] text-[10px] font-medium border border-[#DCE1D8]">
                                  {srv ? srv.name : sid}
                                </span>
                              );
                            })}
                            {offer.includedServiceIds.length > 3 && (
                              <span className="px-1.5 py-0.5 rounded-md bg-[#F7F4ED] text-[#6B7068] text-[10px]">
                                +{offer.includedServiceIds.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Pricing & Timing Matrix */}
                      <div className="pt-2 border-t border-[#DCE1D8] space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[#6B7068]">Festival Price:</span>
                          <div className="flex items-center gap-2">
                            {orig > 0 && (
                              <span className="line-through text-[#6B7068] text-[11px]">
                                ${orig} CAD
                              </span>
                            )}
                            <span className="font-bold text-sm text-[#263D2B]">
                              ${disc} CAD
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-[#6B7068]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#263D2B]" />
                            <span>{offer.startDate} → {offer.endDate}</span>
                          </span>
                          <span className="font-semibold text-[#10110F]">
                            Order: #{offer.displayOrder || 1}
                          </span>
                        </div>

                        {offer.promoCode && (
                          <div className="flex items-center justify-between text-[11px] bg-[#F7F4ED] px-2.5 py-1 rounded-lg border border-[#DCE1D8]">
                            <span className="text-[#6B7068]">Promo Code:</span>
                            <span className="font-mono font-bold text-[#263D2B]">{offer.promoCode}</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-[11px] pt-0.5">
                          <span className="text-[#6B7068]">Homepage Popup:</span>
                          <button
                            type="button"
                            onClick={() => salonDB.updateFestivalOffer(offer.id, { showInHomepagePopup: offer.showInHomepagePopup === false ? true : false })}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${offer.showInHomepagePopup !== false
                                ? 'bg-[#263D2B]/10 text-[#263D2B] border border-[#263D2B]/30 hover:bg-[#263D2B]/20'
                                : 'bg-neutral-100 text-[#6B7068] hover:bg-neutral-200'
                              }`}
                          >
                            {offer.showInHomepagePopup !== false ? 'Popup Enabled' : 'Popup Muted'}
                          </button>
                        </div>
                      </div>

                      {/* Control Actions Row */}
                      <div className="pt-3 border-t border-[#DCE1D8] flex items-center justify-between gap-2">
                        {/* Publish toggle */}
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(offer)}
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${offer.isPublished
                              ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
                              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                            }`}
                        >
                          {offer.isPublished ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>Hide</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              <span>Publish</span>
                            </>
                          )}
                        </button>

                        {/* Status selector */}
                        <select
                          value={offer.status || 'Active'}
                          onChange={(e) => handleChangeStatus(offer, e.target.value)}
                          className="px-2 py-1 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-[11px] font-bold text-[#10110F] focus:outline-none cursor-pointer"
                        >
                          <option value="Active">Active</option>
                          <option value="Scheduled">Scheduled</option>
                          <option value="Draft">Draft</option>
                          <option value="Expired">Expired</option>
                        </select>

                        {/* Edit & Delete */}
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEditFest(offer)}
                            className="p-1.5 rounded-xl bg-[#F7F4ED] hover:bg-[#263D2B] text-[#263D2B] hover:text-white transition-colors cursor-pointer"
                            title="Edit festival offer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteFestOffer(offer.id, offer.title)}
                            className="p-1.5 rounded-xl bg-red-50 hover:bg-red-600 text-red-600 hover:text-white transition-colors cursor-pointer"
                            title="Delete offer"
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
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: GENERAL PROMO CODES                                                */}
      {/* ========================================================================= */}
      {activeTab === 'coupons' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#6B7068]">
              Standard promotional coupon codes redeemable at booking checkout.
            </p>
            <button
              onClick={handleOpenAddCoupon}
              className="global-button inline-flex items-center gap-1.5 !px-5 !py-2.5 text-white text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Coupon</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {standardOffers.map((offer) => (
              <div
                key={offer.id}
                className={`p-6 rounded-3xl bg-white border transition-all shadow-sm space-y-4 ${offer.isActive !== false ? 'border-[#DCE1D8] hover:border-[#263D2B]' : 'border-red-200 opacity-60'
                  }`}
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-bold text-lg text-[#10110F]">{offer.title}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${offer.isActive !== false ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                        {offer.isActive !== false ? 'Active' : 'Disabled'}
                      </span>
                    </div>
                    {offer.couponCode && (
                      <span className="inline-block px-3 py-1 rounded-lg bg-[#263D2B]/10 text-[#263D2B] font-mono font-bold text-xs border border-[#263D2B]/20">
                        CODE: {offer.couponCode}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditCoupon(offer)}
                      className="p-2 rounded-xl bg-[#F7F4ED] hover:bg-[#263D2B] text-[#263D2B] hover:text-white text-xs transition-colors cursor-pointer"
                      title="Edit coupon"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCoupon(offer.id, offer.title)}
                      className="p-2 rounded-xl bg-red-50 hover:bg-red-600 text-red-600 hover:text-white transition-colors cursor-pointer"
                      title="Delete coupon"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-[#10110F] leading-relaxed bg-[#F7F4ED]/60 p-3.5 rounded-2xl border border-[#DCE1D8]">
                  {offer.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[#DCE1D8] text-xs text-[#6B7068]">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#263D2B]" />
                    <span>Valid: {offer.startDate} → {offer.endDate}</span>
                  </div>
                  <button
                    onClick={() => salonDB.updateOffer(offer.id, { isActive: !offer.isActive })}
                    className={`text-[11px] font-bold underline cursor-pointer ${offer.isActive !== false ? 'text-[#465640] hover:text-[#10110F]' : 'text-emerald-800 hover:text-[#263D2B]'
                      }`}
                  >
                    {offer.isActive !== false ? 'Disable' : 'Enable'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CREATE / EDIT FESTIVAL BEAUTY OFFER                                */}
      {/* ========================================================================= */}
      {showFestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans">
          <div className="bg-white border border-[#DCE1D8] rounded-3xl p-5 sm:p-8 w-full max-w-2xl shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto text-xs">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE1D8]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#263D2B]" />
                <h3 className="font-serif font-bold text-[#10110F] text-lg sm:text-xl">
                  {editingFestOffer ? 'Edit Festival Beauty Offer' : 'Create Festival Beauty Offer'}
                </h3>
              </div>
              <button
                onClick={() => setShowFestModal(false)}
                className="text-[#6B7068] hover:text-[#10110F] p-1 rounded-lg hover:bg-[#F7F4ED] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFestOffer} className="space-y-5">
              {/* Festival selection & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#10110F] uppercase tracking-wider text-[11px]">
                    Festival / Celebration *
                  </label>
                  <select
                    value={festForm.festival}
                    onChange={(e) => setFestForm({ ...festForm, festival: e.target.value })}
                    className="w-full p-2.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] focus:border-[#263D2B] focus:outline-none"
                  >
                    {PRESET_FESTIVALS.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                    <option value="Other">Other / Custom Celebration</option>
                  </select>
                </div>

                {festForm.festival === 'Other' && (
                  <div className="space-y-1">
                    <label className="font-bold text-[#10110F] uppercase tracking-wider text-[11px]">
                      Custom Celebration Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Karwa Chauth, Spring Gala..."
                      value={festForm.customFestival}
                      onChange={(e) => setFestForm({ ...festForm, customFestival: e.target.value })}
                      className="w-full p-2.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] focus:border-[#263D2B] focus:outline-none"
                    />
                    {formErrors.festival && <p className="text-red-600 text-[10px]">{formErrors.festival}</p>}
                  </div>
                )}

                <div className={festForm.festival === 'Other' ? 'sm:col-span-2 space-y-1' : 'space-y-1'}>
                  <label className="font-bold text-[#10110F] uppercase tracking-wider text-[11px]">
                    Offer Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Grand Diwali Radiance Ritual"
                    value={festForm.title}
                    onChange={(e) => setFestForm({ ...festForm, title: e.target.value })}
                    className="w-full p-2.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] focus:border-[#263D2B] focus:outline-none"
                  />
                  {formErrors.title && <p className="text-red-600 text-[10px]">{formErrors.title}</p>}
                </div>
              </div>

              {/* Tagline & Short Description */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#10110F] uppercase tracking-wider text-[11px]">
                    Short Tagline (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Complete auspicious glow for family celebrations"
                    value={festForm.tagline}
                    onChange={(e) => setFestForm({ ...festForm, tagline: e.target.value })}
                    className="w-full p-2.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] focus:border-[#263D2B] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#10110F] uppercase tracking-wider text-[11px]">
                    Description & Customer Benefit
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Describe what makes this festive package special..."
                    value={festForm.description}
                    onChange={(e) => setFestForm({ ...festForm, description: e.target.value })}
                    className="w-full p-2.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] focus:border-[#263D2B] focus:outline-none"
                  />
                </div>
              </div>

              {/* Banner Image Preset Selector */}
              <div className="space-y-2">
                <label className="font-bold text-[#10110F] uppercase tracking-wider text-[11px]">
                  Festival Banner Image
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PRESET_BANNER_IMAGES.map((img) => (
                    <button
                      type="button"
                      key={img.url}
                      onClick={() => setFestForm({ ...festForm, bannerImage: img.url })}
                      className={`relative aspect-[16/9] rounded-xl overflow-hidden border-2 text-left group cursor-pointer transition-all ${festForm.bannerImage === img.url
                          ? 'border-[#263D2B] ring-2 ring-[#263D2B]/30'
                          : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                    >
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-end p-1.5">
                        <span className="text-[9px] text-white font-medium line-clamp-1">{img.label}</span>
                      </div>
                      {festForm.bannerImage === img.url && (
                        <div className="absolute top-1 right-1 w-4 h-4 bg-[#263D2B] text-white rounded-full flex items-center justify-center">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="pt-1 flex items-center gap-2">
                  <span className="text-[10px] text-[#6B7068]">Or custom image URL:</span>
                  <input
                    type="text"
                    placeholder="https://... or /images/..."
                    value={festForm.bannerImage}
                    onChange={(e) => setFestForm({ ...festForm, bannerImage: e.target.value })}
                    className="flex-1 p-2 bg-[#F7F4ED] border border-[#DCE1D8] rounded-lg text-xs text-[#10110F] focus:outline-none"
                  />
                </div>
              </div>

              {/* Included Salon Services Multi-Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-[#10110F] uppercase tracking-wider text-[11px]">
                    Included Salon Services ({festForm.includedServiceIds?.length || 0} selected)
                  </label>
                  <span className="text-[10.5px] text-[#465640]">
                    Select rituals included in this festival package
                  </span>
                </div>

                <div className="max-h-40 overflow-y-auto p-2 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {servicesList.map((svc) => {
                    const isSelected = festForm.includedServiceIds?.includes(svc.id);
                    return (
                      <div
                        key={svc.id}
                        onClick={() => handleToggleService(svc.id)}
                        className={`p-2 rounded-lg flex items-center justify-between cursor-pointer border text-[11px] transition-colors ${isSelected
                            ? 'bg-white border-[#263D2B] text-[#263D2B] font-bold shadow-xs'
                            : 'bg-white/60 border-transparent hover:bg-white text-[#10110F]'
                          }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-1">
                          <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${isSelected ? 'bg-[#263D2B] border-[#263D2B] text-white' : 'border-[#6B7068]'
                            }`}>
                            {isSelected && <Check className="w-2.5 h-2.5" />}
                          </div>
                          <span className="truncate">{svc.name}</span>
                        </div>
                        <span className="shrink-0 text-[#6B7068] font-mono">${svc.price} CAD</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pricing Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                <div className="space-y-1">
                  <label className="font-bold text-[#10110F] text-[11px]">
                    Original Price (CAD) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={festForm.originalPrice}
                    onChange={(e) => setFestForm({ ...festForm, originalPrice: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#DCE1D8] rounded-xl text-xs font-mono font-bold text-[#10110F]"
                  />
                  {formErrors.originalPrice && <p className="text-red-600 text-[10px]">{formErrors.originalPrice}</p>}
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#10110F] text-[11px]">
                    Offer Price (CAD) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={festForm.discountedPrice}
                    onChange={(e) => setFestForm({ ...festForm, discountedPrice: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#DCE1D8] rounded-xl text-xs font-mono font-bold text-[#263D2B]"
                  />
                  {formErrors.discountedPrice && <p className="text-red-600 text-[10px]">{formErrors.discountedPrice}</p>}
                </div>

                <div className="space-y-1 flex flex-col justify-end">
                  <span className="text-[10px] text-[#6B7068] uppercase font-bold tracking-wider">Calculated Savings</span>
                  <div className="p-2.5 bg-white border border-[#DCE1D8] rounded-xl flex items-center justify-between text-xs">
                    <span className="font-bold text-[#263D2B]">{modalPercent}% OFF</span>
                    <span className="text-[#6B7068] font-mono">
                      Save ${Math.max(0, modalOrig - modalDisc)} CAD
                    </span>
                  </div>
                </div>
              </div>

              {/* Dates & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#10110F] text-[11px]">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={festForm.startDate}
                    onChange={(e) => setFestForm({ ...festForm, startDate: e.target.value })}
                    className="w-full p-2.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F]"
                  />
                  {formErrors.startDate && <p className="text-red-600 text-[10px]">{formErrors.startDate}</p>}
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#10110F] text-[11px]">
                    Expiry Date *
                  </label>
                  <input
                    type="date"
                    value={festForm.endDate}
                    onChange={(e) => setFestForm({ ...festForm, endDate: e.target.value })}
                    className="w-full p-2.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F]"
                  />
                  {formErrors.endDate && <p className="text-red-600 text-[10px]">{formErrors.endDate}</p>}
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#10110F] text-[11px]">
                    Status
                  </label>
                  <select
                    value={festForm.status}
                    onChange={(e) => setFestForm({ ...festForm, status: e.target.value })}
                    className="w-full p-2.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F]"
                  >
                    <option value="Active">Active</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Draft">Draft</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div>

              {/* Promo Code & Limits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#10110F] text-[11px]">
                    Optional Promo Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DIWALI26"
                    value={festForm.promoCode}
                    onChange={(e) => setFestForm({ ...festForm, promoCode: e.target.value.toUpperCase() })}
                    className="w-full p-2.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs font-mono font-bold text-[#10110F]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#10110F] text-[11px]">
                    Usage Limit / Availability
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. First 50 reservations"
                    value={festForm.usageLimit}
                    onChange={(e) => setFestForm({ ...festForm, usageLimit: e.target.value })}
                    className="w-full p-2.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#10110F] text-[11px]">
                    Display Priority Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={festForm.displayOrder}
                    onChange={(e) => setFestForm({ ...festForm, displayOrder: e.target.value })}
                    className="w-full p-2.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs font-bold text-[#10110F]"
                  />
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="space-y-1">
                <label className="font-bold text-[#10110F] text-[11px]">
                  Terms & Conditions
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Applicable on appointments booked during festive window. Complimentary herbal tea included."
                  value={festForm.terms}
                  onChange={(e) => setFestForm({ ...festForm, terms: e.target.value })}
                  className="w-full p-2.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F]"
                />
              </div>

              {/* Homepage Visibility & Popup Settings */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#10110F] text-[11px]">
                    Modal Popup CTA Button Text
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. EXPLORE FESTIVAL OFFER"
                    value={festForm.popupCtaText}
                    onChange={(e) => setFestForm({ ...festForm, popupCtaText: e.target.value })}
                    className="w-full p-2.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] font-bold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#10110F] block">Publish to Section</span>
                      <span className="text-[10px] text-[#6B7068]">
                        Show in homepage Festival Offers catalog
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={festForm.isPublished}
                      onChange={(e) => setFestForm({ ...festForm, isPublished: e.target.checked })}
                      className="w-5 h-5 accent-[#263D2B] cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#10110F] block">Homepage Popup</span>
                      <span className="text-[10px] text-[#6B7068]">
                        Eligible for 3-second modal popup
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={festForm.showInHomepagePopup}
                      onChange={(e) => setFestForm({ ...festForm, showInHomepagePopup: e.target.checked })}
                      className="w-5 h-5 accent-[#263D2B] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#DCE1D8]">
                <button
                  type="button"
                  onClick={() => setShowFestModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#DCE1D8] text-[#6B7068] hover:bg-[#F7F4ED] font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="global-button !px-6 !py-2.5 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  {editingFestOffer ? 'Save Changes' : 'Create Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CREATE / EDIT COUPON                                               */}
      {/* ========================================================================= */}
      {showCouponModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-[#DCE1D8] rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE1D8]">
              <h3 className="font-serif font-bold text-[#10110F] text-lg">
                {editingCoupon ? 'Edit Coupon Code' : 'Create Coupon Code'}
              </h3>
              <button onClick={() => setShowCouponModal(false)} className="text-[#6B7068] hover:text-[#10110F]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCoupon} className="space-y-4">
              <div className="space-y-1">
                <label className="font-bold text-[#10110F]">Offer Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP Summer Glow"
                  value={couponForm.title}
                  onChange={(e) => setCouponForm({ ...couponForm, title: e.target.value })}
                  className="w-full p-2.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#10110F]">Description</label>
                <textarea
                  rows={2}
                  placeholder="Details about client eligibility and services"
                  value={couponForm.description}
                  onChange={(e) => setCouponForm({ ...couponForm, description: e.target.value })}
                  className="w-full p-2.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#10110F]">Discount Type</label>
                  <select
                    value={couponForm.discountType}
                    onChange={(e) => setCouponForm({ ...couponForm, discountType: e.target.value })}
                    className="w-full p-2.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F]"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (CAD $)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#10110F]">Discount Value</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={couponForm.discountValue}
                    onChange={(e) => setCouponForm({ ...couponForm, discountValue: e.target.value })}
                    className="w-full p-2.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs font-mono font-bold text-[#10110F]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#10110F]">Coupon Code</label>
                <input
                  type="text"
                  placeholder="e.g. FESTIVE20"
                  value={couponForm.couponCode}
                  onChange={(e) => setCouponForm({ ...couponForm, couponCode: e.target.value.toUpperCase() })}
                  className="w-full p-2.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs font-mono font-bold text-[#263D2B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#10110F]">Start Date</label>
                  <input
                    type="date"
                    value={couponForm.startDate}
                    onChange={(e) => setCouponForm({ ...couponForm, startDate: e.target.value })}
                    className="w-full p-2.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#10110F]">Expiry Date</label>
                  <input
                    type="date"
                    value={couponForm.endDate}
                    onChange={(e) => setCouponForm({ ...couponForm, endDate: e.target.value })}
                    className="w-full p-2.5 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="couponActive"
                  checked={couponForm.isActive}
                  onChange={(e) => setCouponForm({ ...couponForm, isActive: e.target.checked })}
                  className="w-4 h-4 accent-[#263D2B]"
                />
                <label htmlFor="couponActive" className="text-xs text-[#10110F] font-bold cursor-pointer">
                  Activate this promo code immediately
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#DCE1D8]">
                <button
                  type="button"
                  onClick={() => setShowCouponModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#DCE1D8] text-[#6B7068] hover:bg-[#F7F4ED] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="global-button !px-6 !py-2 text-white font-bold uppercase tracking-wider"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
