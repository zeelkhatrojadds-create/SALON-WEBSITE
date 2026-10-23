import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  EyeOff, 
  Clock, 
  Tag, 
  Sparkles, 
  Search, 
  Check, 
  X, 
  AlertCircle,
  Layers,
  ChevronDown,
  Calendar,
  DollarSign,
  CheckCircle2,
  ListOrdered
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';

const PRESET_COMBO_IMAGES = [
  { label: 'Facial & Skincare Clean Atelier', url: '/facial-atelier-clean.webp' },
  { label: 'Hair Care & Refresh', url: '/images/services/hair-cut/hair-spa-deluxe.webp' },
  { label: 'Haircut & Styling', url: '/images/services/hair-cut/noor-signature-haircut.webp' },
  { label: 'Manicure & Pedicure Couture', url: '/images/nails/classic-pedicure.webp' },
  { label: 'Party Glam Makeover', url: '/images/services/makeup/47-party-makeup.webp' },
  { label: 'Royal Bridal Beauty', url: '/images/services/makeup/44-shringar-bridal-makeup.webp' },
  { label: 'Salon Studio Interior', url: '/atelier-salon-interior.webp' }
];

export default function AdminComboPackages() {
  const [activeSubTab, setActiveSubTab] = useState('packages'); // 'packages' | 'bookings'
  const [combos, setCombos] = useState(() => salonDB.getComboPackages());
  const [servicesList, setServicesList] = useState(() => salonDB.getServices());
  const [appointments, setAppointments] = useState(() => salonDB.getAppointments());

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'published' | 'draft'

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingCombo, setEditingCombo] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    tagline: '',
    description: '',
    image: '/facial-atelier-clean.webp',
    categoryTag: 'BEAUTY COMBO',
    serviceIds: [],
    comboPrice: 85,
    active: true,
    isPublished: true,
    featured: false,
    displayOrder: 1,
    benefits: ['']
  });

  const [formErrors, setFormErrors] = useState({});
  const [serviceSearch, setServiceSearch] = useState('');

  // Sync with database
  const refreshData = () => {
    setCombos(salonDB.getComboPackages());
    setServicesList(salonDB.getServices());
    setAppointments(salonDB.getAppointments());
  };

  useEffect(() => {
    refreshData();
    const unsub = salonDB.subscribe(() => {
      refreshData();
    });
    return () => unsub();
  }, []);

  // Filtered packages
  const filteredPackages = useMemo(() => {
    return combos.filter((pkg) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        pkg.name.toLowerCase().includes(q) || 
        (pkg.categoryTag && pkg.categoryTag.toLowerCase().includes(q)) ||
        (pkg.serviceNames && pkg.serviceNames.some(s => s.toLowerCase().includes(q)));

      let matchesStatus = true;
      if (statusFilter === 'published') {
        matchesStatus = pkg.isPublished !== false && pkg.active !== false;
      } else if (statusFilter === 'draft') {
        matchesStatus = pkg.isPublished === false || pkg.active === false;
      }

      return matchesSearch && matchesStatus;
    });
  }, [combos, searchQuery, statusFilter]);

  // Combo bookings
  const comboBookings = useMemo(() => {
    return appointments.filter(a => a.isCombo === true || a.comboId || (a.serviceCategory && a.serviceCategory.toLowerCase().includes('combo')));
  }, [appointments]);

  // Live calculation of selected services for modal
  const liveCalculation = useMemo(() => {
    const selected = formData.serviceIds
      .map(id => servicesList.find(s => s.id === id))
      .filter(Boolean);

    const totalOriginalPrice = selected.reduce((sum, s) => sum + (Number(s.price) || 0), 0);
    const comboPrice = Number(formData.comboPrice) || 0;
    const savingsAmount = Math.max(0, totalOriginalPrice - comboPrice);
    const savingsPercent = totalOriginalPrice > 0 ? Math.round((savingsAmount / totalOriginalPrice) * 100) : 0;

    const totalDurationMinutes = selected.reduce((sum, s) => {
      return sum + salonDB.parseServiceDurationMinutes(s.duration || s.serviceDuration || 45);
    }, 0);

    const hrs = Math.floor(totalDurationMinutes / 60);
    const mins = totalDurationMinutes % 60;
    let durationDisplay = '';
    if (hrs > 0 && mins > 0) durationDisplay = `${hrs} hr ${mins} mins`;
    else if (hrs > 0) durationDisplay = `${hrs} hr${hrs > 1 ? 's' : ''}`;
    else durationDisplay = `${mins} mins`;

    return {
      selectedServices: selected,
      totalOriginalPrice,
      savingsAmount,
      savingsPercent,
      totalDurationMinutes,
      durationDisplay
    };
  }, [formData.serviceIds, formData.comboPrice, servicesList]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingCombo(null);
    setFormData({
      name: '',
      slug: '',
      tagline: '',
      description: '',
      image: '/facial-atelier-clean.webp',
      categoryTag: 'EXCLUSIVE COMBO',
      serviceIds: [],
      comboPrice: 75,
      active: true,
      isPublished: true,
      featured: false,
      displayOrder: combos.length + 1,
      benefits: ['Hospital-grade sanitized atelier setting', 'Complimentary skin & hair consultation']
    });
    setFormErrors({});
    setShowModal(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (pkg) => {
    setEditingCombo(pkg);
    setFormData({
      name: pkg.name || '',
      slug: pkg.slug || '',
      tagline: pkg.tagline || '',
      description: pkg.description || '',
      image: pkg.image || '/facial-atelier-clean.webp',
      categoryTag: pkg.categoryTag || 'EXCLUSIVE COMBO',
      serviceIds: Array.isArray(pkg.serviceIds) ? [...pkg.serviceIds] : [],
      comboPrice: Number(pkg.comboPrice) || 0,
      active: pkg.active !== false,
      isPublished: pkg.isPublished !== false,
      featured: Boolean(pkg.featured),
      displayOrder: Number(pkg.displayOrder) || 1,
      benefits: Array.isArray(pkg.benefits) && pkg.benefits.length > 0 ? [...pkg.benefits] : ['']
    });
    setFormErrors({});
    setShowModal(true);
  };

  // Toggle Publish
  const handleTogglePublish = (id, currentVal) => {
    salonDB.updateComboPackage(id, { isPublished: !currentVal, active: !currentVal });
    refreshData();
  };

  // Delete Combo
  const handleDeleteCombo = (id) => {
    salonDB.deleteComboPackage(id);
    setDeleteConfirmId(null);
    refreshData();
  };

  // Toggle service selection in modal
  const handleToggleService = (serviceId) => {
    setFormData(prev => {
      const exists = prev.serviceIds.includes(serviceId);
      const updated = exists 
        ? prev.serviceIds.filter(id => id !== serviceId)
        : [...prev.serviceIds, serviceId];
      return { ...prev, serviceIds: updated };
    });
  };

  // Benefit bullet point helpers
  const handleAddBenefit = () => {
    setFormData(prev => ({ ...prev, benefits: [...prev.benefits, ''] }));
  };

  const handleBenefitChange = (index, value) => {
    setFormData(prev => {
      const copy = [...prev.benefits];
      copy[index] = value;
      return { ...prev, benefits: copy };
    });
  };

  const handleRemoveBenefit = (index) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, idx) => idx !== index)
    }));
  };

  // Submit Modal
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.name.trim()) errors.name = 'Package name is required';
    if (!formData.serviceIds || formData.serviceIds.length === 0) {
      errors.services = 'Please select at least one service from the catalog';
    }
    if (formData.comboPrice === '' || Number(formData.comboPrice) <= 0) {
      errors.comboPrice = 'Please enter a valid combo price greater than $0';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const cleanedPayload = {
      ...formData,
      comboPrice: Number(formData.comboPrice),
      displayOrder: Number(formData.displayOrder) || 1,
      benefits: formData.benefits.filter(b => b.trim().length > 0)
    };

    if (editingCombo) {
      salonDB.updateComboPackage(editingCombo.id, cleanedPayload);
    } else {
      salonDB.addComboPackage(cleanedPayload);
    }

    setShowModal(false);
    refreshData();
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-[#DCE1D8] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#263D2B]/10 text-[#263D2B]">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <h1 className="font-serif text-2xl font-normal text-[#10110F]">
                Combo Packages Management
              </h1>
              <p className="text-xs text-[#6B7068]">
                Configure multi-service rituals with verified catalog services, approved pricing, and automatic slot duration calculations.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 rounded-xl bg-[#263D2B] hover:bg-[#1C2E20] text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Combo Package</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs: Packages List vs Combo Bookings */}
      <div className="flex items-center justify-between border-b border-[#DCE1D8] pb-1">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveSubTab('packages')}
            className={`pb-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
              activeSubTab === 'packages'
                ? 'border-[#263D2B] text-[#263D2B]'
                : 'border-transparent text-[#6B7068] hover:text-[#10110F]'
            }`}
          >
            <span>Active Packages ({combos.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('bookings')}
            className={`pb-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 flex items-center gap-1.5 ${
              activeSubTab === 'bookings'
                ? 'border-[#263D2B] text-[#263D2B]'
                : 'border-transparent text-[#6B7068] hover:text-[#10110F]'
            }`}
          >
            <span>Combo Bookings ({comboBookings.length})</span>
          </button>
        </div>

        {/* Filter controls if on packages */}
        {activeSubTab === 'packages' && (
          <div className="flex items-center gap-3">
            <div className="relative w-56">
              <Search className="w-3.5 h-3.5 text-[#6B7068] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search combo packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#DCE1D8] text-xs bg-white focus:outline-none focus:border-[#263D2B]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-[#DCE1D8] text-xs bg-white text-[#10110F] focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Unpublished / Draft</option>
            </select>
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* 1. PACKAGES TABLE & LIST VIEW                                         */}
      {/* ===================================================================== */}
      {activeSubTab === 'packages' && (
        <div className="bg-white rounded-2xl border border-[#DCE1D8] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F4ED] border-b border-[#DCE1D8] text-[#6B7068] font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Order</th>
                  <th className="py-3 px-4">Package</th>
                  <th className="py-3 px-4">Services Included</th>
                  <th className="py-3 px-4">Combined Duration</th>
                  <th className="py-3 px-4">Catalog Value</th>
                  <th className="py-3 px-4">Combo Price</th>
                  <th className="py-3 px-4">Customer Savings</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCE1D8]">
                {filteredPackages.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="py-12 text-center text-[#6B7068]">
                      No combo packages found matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredPackages.map((pkg) => {
                    const isPub = pkg.isPublished !== false && pkg.active !== false;

                    return (
                      <tr key={pkg.id} className="hover:bg-[#F7F4ED]/50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#6B7068]">
                          #{pkg.displayOrder || 1}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={pkg.image || '/facial-atelier-clean.webp'}
                              alt={pkg.name}
                              className="w-12 h-12 rounded-lg object-cover border border-[#DCE1D8] bg-[#EFECE4] flex-shrink-0"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/facial-atelier-clean.webp';
                              }}
                            />
                            <div>
                              <span className="font-semibold text-sm text-[#10110F] block">
                                {pkg.name}
                              </span>
                              <span className="text-[11px] text-[#6B7068] block">
                                {pkg.categoryTag || 'COMBO'}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="space-y-1">
                            {pkg.services && pkg.services.length > 0 ? (
                              pkg.services.map((s) => (
                                <div key={s.id} className="flex items-center gap-1.5 text-[11px] text-[#10110F]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
                                  <span className="truncate">{s.name} (${s.price})</span>
                                </div>
                              ))
                            ) : (
                              <span className="text-[#6B7068]">{(pkg.serviceNames || []).join(', ')}</span>
                            )}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 font-mono text-xs text-[#10110F]">
                            <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                            <span>{pkg.durationDisplay || `${pkg.totalDurationMinutes} mins`}</span>
                          </span>
                        </td>

                        <td className="py-3.5 px-4 font-mono text-xs text-[#6B7068] line-through">
                          ${pkg.totalOriginalPrice} CAD
                        </td>

                        <td className="py-3.5 px-4 font-mono font-bold text-sm text-[#263D2B]">
                          ${pkg.comboPrice} CAD
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {pkg.savingsAmount > 0 ? (
                            <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                              Save ${pkg.savingsAmount} ({pkg.savingsPercent}%)
                            </span>
                          ) : (
                            <span className="text-[11px] text-[#6B7068]">No discount</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <button
                            type="button"
                            onClick={() => handleTogglePublish(pkg.id, isPub)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
                              isPub
                                ? 'bg-[#263D2B]/10 text-[#263D2B] border border-[#263D2B]/20'
                                : 'bg-gray-100 text-gray-500 border border-gray-200'
                            }`}
                          >
                            {isPub ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            <span>{isPub ? 'Published' : 'Draft'}</span>
                          </button>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(pkg)}
                              className="p-1.5 rounded-lg border border-[#DCE1D8] text-[#10110F] hover:bg-[#F7F4ED] hover:border-[#263D2B] transition-colors cursor-pointer"
                              title="Edit Combo Package"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(pkg.id)}
                              className="p-1.5 rounded-lg border border-[#DCE1D8] text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors cursor-pointer"
                              title="Delete Combo Package"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. COMBO BOOKINGS QUEUE                                               */}
      {/* ===================================================================== */}
      {activeSubTab === 'bookings' && (
        <div className="bg-white rounded-2xl border border-[#DCE1D8] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#DCE1D8] bg-[#F7F4ED] flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#263D2B]">
              Total Combo Reservations: {comboBookings.length}
            </span>
            <span className="text-xs text-[#6B7068]">
              Cash on Delivery (Pay at Appointment) Enforced
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F4ED] border-b border-[#DCE1D8] text-[#6B7068] font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Ref Code</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Combo Reserved</th>
                  <th className="py-3 px-4">Date &amp; Time Slot</th>
                  <th className="py-3 px-4">Total Price (COD)</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCE1D8]">
                {comboBookings.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-[#6B7068]">
                      No combo package appointments recorded yet.
                    </td>
                  </tr>
                ) : (
                  comboBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#F7F4ED]/50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#10110F]">
                        {b.referenceCode || b.id}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold block text-[#10110F]">{b.customerName || b.name}</span>
                        <span className="text-[11px] text-[#6B7068] block">{b.customerPhone || b.phone}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold block text-[#263D2B]">{b.comboName || b.service}</span>
                        <span className="text-[11px] text-[#6B7068] block">
                          {b.serviceDuration || `${b.durationMinutes} min`}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium block text-[#10110F]">{b.date}</span>
                        <span className="text-[11px] text-[#6B7068] block">{b.time} – {b.endTime}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-mono font-bold text-[#10110F]">${b.servicePrice} CAD</span>
                        <span className="text-[10px] text-emerald-700 block font-semibold">Pay at Studio</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          b.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                          b.status === 'Confirmed' ? 'bg-[#263D2B]/10 text-[#263D2B]' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {b.status || 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 3. CREATE / EDIT MODAL                                               */}
      {/* ===================================================================== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-2xl border border-[#DCE1D8] shadow-2xl my-8 overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-[#DCE1D8] bg-[#F7F4ED] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#263D2B]" />
                <h3 className="font-serif text-lg font-bold text-[#10110F]">
                  {editingCombo ? `Edit: ${editingCombo.name}` : 'Create New Combo Package'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full hover:bg-[#DCE1D8] text-[#10110F] flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1">
                    Package Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        name,
                        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                      }));
                    }}
                    placeholder="e.g. Hair Refresh Combo"
                    className="w-full px-3 py-2 rounded-xl border border-[#DCE1D8] text-xs focus:outline-none focus:border-[#263D2B]"
                  />
                  {formErrors.name && (
                    <span className="text-[11px] text-red-600 block mt-1">{formErrors.name}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={formData.categoryTag}
                    onChange={(e) => setFormData(prev => ({ ...prev, categoryTag: e.target.value }))}
                    placeholder="e.g. Hair Care, Skin Care, Hair Spa..."
                    className="w-full px-3 py-2 rounded-xl border border-[#DCE1D8] text-xs focus:outline-none focus:border-[#263D2B]"
                  />
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {['Hair Care', 'Skin Care', 'Hair Spa', 'Bridal', 'Makeup', 'Nail Care', 'Waxing', 'Complete Beauty'].map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, categoryTag: cat }))}
                        className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-colors cursor-pointer ${
                          formData.categoryTag === cat 
                            ? 'bg-[#263D2B] text-white border-[#263D2B]' 
                            : 'bg-[#F7F4ED] hover:bg-[#DCE1D8] text-[#465640] border-[#DCE1D8]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1">
                  Tagline / Short Ritual Hook
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                  placeholder="e.g. Precision Haircut & Deep Herbal Ayurvedic Spa"
                  className="w-full px-3 py-2 rounded-xl border border-[#DCE1D8] text-xs focus:outline-none focus:border-[#263D2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detail the combined benefits, atmosphere, and complete transformation journey..."
                  className="w-full px-3 py-2 rounded-xl border border-[#DCE1D8] text-xs focus:outline-none focus:border-[#263D2B]"
                />
              </div>

              {/* Image Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1">
                  Package Image
                </label>
                <div className="flex items-center gap-3 mb-2">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="/facial-atelier-clean.webp"
                    className="flex-1 px-3 py-2 rounded-xl border border-[#DCE1D8] text-xs focus:outline-none focus:border-[#263D2B]"
                  />
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-10 h-10 rounded-lg object-cover border border-[#DCE1D8] bg-[#EFECE4]"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/facial-atelier-clean.webp';
                    }}
                  />
                </div>
                {/* Presets */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PRESET_COMBO_IMAGES.map((preset, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: preset.url }))}
                      className="px-2 py-1 rounded-md bg-[#F7F4ED] hover:bg-[#DCE1D8] text-[10px] text-[#10110F] border border-[#DCE1D8]"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* SERVICE SELECTION FROM ACTUAL CATALOG */}
              <div className="p-4 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F]">
                      Select Included Services from Catalog *
                    </label>
                    <span className="text-[11px] text-[#6B7068]">
                      Selected: {formData.serviceIds.length} service(s)
                    </span>
                  </div>
                  <div className="w-48">
                    <input
                      type="text"
                      placeholder="Filter services..."
                      value={serviceSearch}
                      onChange={(e) => setServiceSearch(e.target.value)}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-[#DCE1D8] bg-white"
                    />
                  </div>
                </div>

                {formErrors.services && (
                  <span className="text-[11px] text-red-600 font-bold block">{formErrors.services}</span>
                )}

                {/* Services list with checkboxes */}
                <div className="max-h-48 overflow-y-auto bg-white rounded-lg border border-[#DCE1D8] divide-y divide-[#DCE1D8] p-1">
                  {servicesList
                    .filter(s => !serviceSearch || s.name.toLowerCase().includes(serviceSearch.toLowerCase()) || s.category.includes(serviceSearch.toLowerCase()))
                    .map((service) => {
                      const isSelected = formData.serviceIds.includes(service.id);
                      return (
                        <label
                          key={service.id}
                          className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                            isSelected ? 'bg-[#263D2B]/10 font-medium' : 'hover:bg-[#F7F4ED]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate pr-2">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleService(service.id)}
                              className="accent-[#263D2B] w-4 h-4 cursor-pointer"
                            />
                            <div className="truncate text-xs">
                              <span className="text-[#10110F] block truncate">{service.name}</span>
                              <span className="text-[10px] text-[#6B7068] block">
                                {service.categoryName || service.category} • {service.duration}
                              </span>
                            </div>
                          </div>
                          <span className="font-mono text-xs font-bold text-[#10110F] whitespace-nowrap">
                            ${service.price} CAD
                          </span>
                        </label>
                      );
                    })}
                </div>
              </div>

              {/* LIVE PRICING & SAVINGS CALCULATION PREVIEW */}
              <div className="p-4 rounded-xl bg-white border-2 border-[#263D2B]/20 space-y-4">
                <div className="flex items-center gap-2 text-[#263D2B]">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Live Package Pricing &amp; Duration Calculation
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg bg-[#F7F4ED]">
                    <span className="text-[10px] text-[#6B7068] uppercase font-bold block">Catalog Sum</span>
                    <span className="text-base font-bold font-mono text-[#10110F]">
                      ${liveCalculation.totalOriginalPrice} CAD
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#F7F4ED]">
                    <label className="text-[10px] text-[#263D2B] uppercase font-bold block">
                      Admin Combo Price *
                    </label>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-xs font-bold text-[#263D2B]">$</span>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={formData.comboPrice}
                        onChange={(e) => setFormData(prev => ({ ...prev, comboPrice: e.target.value }))}
                        className="w-full px-2 py-1 rounded border border-[#263D2B] text-sm font-bold font-mono text-[#263D2B] bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#F7F4ED]">
                    <span className="text-[10px] text-[#6B7068] uppercase font-bold block">Calculated Savings</span>
                    <span className={`text-base font-bold font-mono ${liveCalculation.savingsAmount > 0 ? 'text-emerald-700' : 'text-[#6B7068]'}`}>
                      ${liveCalculation.savingsAmount} CAD ({liveCalculation.savingsPercent}%)
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#F7F4ED]">
                    <span className="text-[10px] text-[#6B7068] uppercase font-bold block">Combined Duration</span>
                    <span className="text-sm font-bold text-[#10110F] flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                      <span>{liveCalculation.durationDisplay || '0 mins'}</span>
                    </span>
                  </div>
                </div>

                {liveCalculation.savingsAmount <= 0 && formData.serviceIds.length > 0 && (
                  <div className="flex items-center gap-2 p-2 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[11px]">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>The combo price equals or exceeds total individual service prices. Consider lowering combo price to offer customer savings.</span>
                  </div>
                )}
              </div>

              {/* Benefits Bullet Points */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F]">
                    Package Highlights / Benefits
                  </label>
                  <button
                    type="button"
                    onClick={handleAddBenefit}
                    className="text-[11px] font-bold text-[#263D2B] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Highlight</span>
                  </button>
                </div>

                {formData.benefits.map((benefit, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => handleBenefitChange(bIdx, e.target.value)}
                      placeholder="e.g. Save $25 compared to booking individual treatments"
                      className="flex-1 px-3 py-1.5 rounded-lg border border-[#DCE1D8] text-xs focus:outline-none focus:border-[#263D2B]"
                    />
                    {formData.benefits.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveBenefit(bIdx)}
                        className="p-1.5 text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Settings: Display Order, Featured, Published */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#DCE1D8]">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData(prev => ({ ...prev, displayOrder: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-[#DCE1D8] text-xs font-mono"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isPublishedCheck"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked, active: e.target.checked }))}
                    className="w-4 h-4 accent-[#263D2B] cursor-pointer"
                  />
                  <label htmlFor="isPublishedCheck" className="text-xs font-bold text-[#10110F] cursor-pointer">
                    Publish on Website
                  </label>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="featuredCheck"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="w-4 h-4 accent-[#263D2B] cursor-pointer"
                  />
                  <label htmlFor="featuredCheck" className="text-xs font-bold text-[#10110F] cursor-pointer">
                    Highlight as Featured
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#DCE1D8] flex items-center justify-end gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#DCE1D8] hover:bg-[#F7F4ED] text-xs font-bold uppercase tracking-wider text-[#10110F] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#263D2B] hover:bg-[#1C2E20] text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
                >
                  {editingCombo ? 'Save Changes' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white max-w-sm w-full p-6 rounded-2xl border border-[#DCE1D8] shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-[#10110F] font-bold">Delete Combo Package?</h3>
            <p className="text-xs text-[#6B7068]">
              Are you sure you want to remove this combination? This will not affect existing client bookings.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="w-1/2 py-2.5 rounded-xl border border-[#DCE1D8] text-xs font-bold uppercase tracking-wider text-[#10110F]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteCombo(deleteConfirmId)}
                className="w-1/2 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
