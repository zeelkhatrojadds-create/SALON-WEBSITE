import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  Edit2, 
  Check, 
  X, 
  Layers, 
  DollarSign, 
  Clock, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Eye, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { ALL_SERVICES, CATEGORIES } from '../../data/servicesData';
import salonDB from '../../db/salonDatabase';
import ImageValidationModal from './ImageValidationModal';
import SafeServiceImage from '../common/SafeServiceImage';

export default function AdminServices({ customServices = [], onUpdateServices }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Edit State
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    category: 'threading',
    categoryName: 'Threading',
    price: '',
    duration: '',
    image: '',
    description: '',
    active: true
  });

  // Add New Service Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newServiceForm, setNewServiceForm] = useState({
    name: '',
    category: 'threading',
    price: 30,
    duration: '20 min',
    image: '/images/services/threading/07-sitara-full-face-threading.webp',
    description: 'Custom beauty treatment designed for glowing skin and ultimate relaxation.'
  });

  const [showValidationModal, setShowValidationModal] = useState(false);
  const [notification, setNotification] = useState('');

  const activeServicesList = useMemo(() => {
    if (customServices && customServices.length > 0) {
      return customServices;
    }
    return ALL_SERVICES.map(s => ({ ...s, active: true }));
  }, [customServices]);

  const filteredServices = useMemo(() => {
    return activeServicesList.filter((service) => {
      const matchesCategory =
        selectedCategory === 'all' || service.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        service.name.toLowerCase().includes(q) ||
        (service.categoryName && service.categoryName.toLowerCase().includes(q)) ||
        (service.description && service.description.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeServicesList, selectedCategory, searchQuery]);

  const showSuccess = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // Start Editing
  const handleStartEdit = (service) => {
    setEditingId(service.id);
    setEditForm({
      name: service.name,
      category: service.category || 'threading',
      categoryName: service.categoryName || 'Threading',
      price: service.price,
      duration: service.duration,
      image: service.image,
      description: service.description || '',
      active: service.active !== false
    });
  };

  // Save Edit
  const handleSaveEdit = (serviceId) => {
    const matchedCategory = CATEGORIES.find(c => c.id === editForm.category);
    const updatedCategoryName = matchedCategory ? matchedCategory.name : editForm.categoryName;

    const updated = activeServicesList.map(s => {
      if (s.id === serviceId) {
        return {
          ...s,
          name: editForm.name.trim() || s.name,
          category: editForm.category,
          categoryName: updatedCategoryName,
          price: Number(editForm.price) || s.price,
          duration: editForm.duration || s.duration,
          image: editForm.image.trim() || s.image,
          description: editForm.description.trim() || s.description,
          active: editForm.active
        };
      }
      return s;
    });

    onUpdateServices(updated);
    setEditingId(null);
    showSuccess(`Updated "${editForm.name}" successfully!`);
  };

  // Toggle Active/Disable status
  const handleToggleActive = (serviceId) => {
    const updated = activeServicesList.map(s => {
      if (s.id === serviceId) {
        return {
          ...s,
          active: s.active === false ? true : false
        };
      }
      return s;
    });
    onUpdateServices(updated);
    showSuccess('Service status updated!');
  };

  // Delete Service
  const handleDeleteService = (serviceId, serviceName) => {
    if (window.confirm(`Are you sure you want to delete "${serviceName}"? This action cannot be undone.`)) {
      const updated = activeServicesList.filter(s => s.id !== serviceId);
      onUpdateServices(updated);
      showSuccess(`Deleted "${serviceName}" from catalog.`);
    }
  };

  // Add Service Handler
  const handleCreateService = (e) => {
    e.preventDefault();
    if (!newServiceForm.name) return;

    const matchedCategory = CATEGORIES.find(c => c.id === newServiceForm.category);
    const catName = matchedCategory ? matchedCategory.name : 'Threading';
    const newSlug = newServiceForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newId = `custom-srv-${Date.now()}`;

    const newServiceObj = {
      id: newId,
      slug: newSlug,
      name: newServiceForm.name.trim(),
      category: newServiceForm.category,
      categoryName: catName,
      price: Number(newServiceForm.price) || 30,
      duration: newServiceForm.duration.trim() || '20 min',
      durationDisplay: `Approx. ${newServiceForm.duration}`,
      image: newServiceForm.image.trim() || '/images/services/threading/07-sitara-full-face-threading.webp',
      description: newServiceForm.description.trim(),
      whatsIncluded: ['Professional consultation', 'Sanitized equipment', 'Premium salon products'],
      features: ['Professional care', 'Hygienic studio', 'Premium products'],
      active: true,
      featured: false
    };

    const updated = [newServiceObj, ...activeServicesList];
    onUpdateServices(updated);
    setShowAddModal(false);
    showSuccess(`Added new treatment "${newServiceForm.name}"!`);

    // Reset form
    setNewServiceForm({
      name: '',
      category: 'threading',
      price: 30,
      duration: '20 min',
      image: '/images/services/threading/07-sitara-full-face-threading.webp',
      description: 'Custom beauty treatment designed for glowing skin and ultimate relaxation.'
    });
  };

  // Reset Defaults to 72 Master Services
  const handleResetDefaults = () => {
    if (window.confirm('Reset all 72 treatments to master default photos, prices, and durations?')) {
      onUpdateServices(ALL_SERVICES.map(s => ({ ...s, active: true })));
      showSuccess('Reset to 72 Master Treatments!');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 text-white font-semibold text-xs shadow-2xl animate-bounce">
          <CheckCircle className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CFA46A]/10 border border-[#CFA46A]/30 text-[#CFA46A] text-[11px] font-bold tracking-widest uppercase mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Master Services Engine</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Treatment Menu Catalog</h2>
          <p className="text-white/60 text-xs sm:text-sm">Manage pricing, duration, images, descriptions, and availability for all 72 treatments.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowValidationModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-emerald-900/30"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Validate 72 Images</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#CFA46A] hover:bg-[#B88D57] text-[#100C0D] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#CFA46A]/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Treatment</span>
          </button>

          <button
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset 72 Master Services</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#1C1418] rounded-2xl p-4 border border-white/10 shadow-lg space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 72 treatments by name, category, or description..."
              className="w-full h-10 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#CFA46A]"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-10 px-3 bg-[#24151E] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA46A] cursor-pointer"
            >
              <option value="all">All 11 Categories ({activeServicesList.length})</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Services List Table */}
      <div className="bg-[#1C1418] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-white/60 uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Treatment</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Duration</th>
                <th className="py-3.5 px-4 font-semibold">Price (CAD)</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredServices.map((service) => {
                const isEditing = editingId === service.id;
                const isActive = service.active !== false;

                return (
                  <tr key={service.id} className="hover:bg-white/[0.03] transition-colors">
                    {/* Treatment Info & Image Preview */}
                    <td className="py-3.5 px-4 max-w-[320px]">
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            placeholder="Treatment Name"
                            className="w-full h-8 px-2 bg-white/10 border border-[#CFA46A] rounded-lg text-white text-xs font-semibold"
                          />
                          <div className="flex items-center gap-2">
                            <SafeServiceImage
                              src={editForm.image || service.image}
                              alt="Preview"
                              className="w-10 h-10 rounded-xl object-cover border border-[#CFA46A]"
                            />
                            <input
                              type="text"
                              value={editForm.image}
                              onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                              placeholder="Image URL"
                              className="flex-1 h-8 px-2 bg-white/10 border border-white/20 rounded-lg text-white text-[11px]"
                            />
                          </div>
                          <textarea
                            value={editForm.description}
                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                            rows={2}
                            placeholder="Short description..."
                            className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white text-[11px]"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="relative group/img flex-shrink-0">
                            <SafeServiceImage 
                              service={service}
                              className="w-12 h-12 rounded-xl object-cover border border-white/10 shadow-md"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-white truncate">{service.name}</div>
                            <div className="text-white/40 text-[10px] line-clamp-2">{service.description}</div>
                          </div>
                        </div>
                      )}
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      {isEditing ? (
                        <select
                          value={editForm.category}
                          onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                          className="h-8 px-2 bg-[#24151E] border border-[#CFA46A] rounded-lg text-white text-xs"
                        >
                          {CATEGORIES.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#CFA46A]/15 text-[#CFA46A] border border-[#CFA46A]/30">
                          {service.categoryName || service.category}
                        </span>
                      )}
                    </td>

                    {/* Duration */}
                    <td className="py-3.5 px-4">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.duration}
                          onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                          className="w-24 h-8 px-2 bg-white/10 border border-[#CFA46A] rounded-lg text-white text-xs"
                        />
                      ) : (
                        <div className="flex items-center gap-1.5 text-white/70">
                          <Clock className="w-3.5 h-3.5 text-[#CFA46A]" />
                          <span>{service.duration}</span>
                        </div>
                      )}
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4">
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <span className="text-white/60">$</span>
                          <input
                            type="number"
                            value={editForm.price}
                            onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                            className="w-20 h-8 px-2 bg-white/10 border border-[#CFA46A] rounded-lg text-white text-xs"
                          />
                        </div>
                      ) : (
                        <span className="font-bold text-emerald-400 font-mono text-sm">
                          ${service.price} CAD
                        </span>
                      )}
                    </td>

                    {/* Active Status */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleActive(service.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-white/10 text-white/40 border border-white/15'
                        }`}
                      >
                        {isActive ? 'Available' : 'Disabled'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleSaveEdit(service.id)}
                            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer shadow-md"
                            title="Save treatment changes"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleStartEdit(service)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-[#CFA46A]/20 text-[#CFA46A] hover:text-white transition-colors cursor-pointer"
                            title="Edit Treatment Details & Image"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteService(service.id, service.name)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                            title="Delete Treatment"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#1C1418] border border-[#CFA46A]/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#CFA46A]" />
                <h3 className="font-serif text-xl text-white font-semibold">Add New Salon Treatment</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-white/50 hover:text-white p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateService} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Treatment Name</label>
                <input
                  type="text"
                  required
                  value={newServiceForm.name}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, name: e.target.value })}
                  placeholder="e.g. Royal Silk Facial"
                  className="w-full h-10 px-3 bg-white/5 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA46A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">Category</label>
                  <select
                    value={newServiceForm.category}
                    onChange={(e) => setNewServiceForm({ ...newServiceForm, category: e.target.value })}
                    className="w-full h-10 px-3 bg-[#24151E] border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA46A]"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">Price (CAD $)</label>
                  <input
                    type="number"
                    required
                    value={newServiceForm.price}
                    onChange={(e) => setNewServiceForm({ ...newServiceForm, price: e.target.value })}
                    className="w-full h-10 px-3 bg-white/5 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA46A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Duration</label>
                <input
                  type="text"
                  required
                  value={newServiceForm.duration}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, duration: e.target.value })}
                  placeholder="e.g. 30 min"
                  className="w-full h-10 px-3 bg-white/5 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA46A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Treatment Image URL</label>
                <input
                  type="text"
                  required
                  value={newServiceForm.image}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full h-10 px-3 bg-white/5 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA46A]"
                />
                {newServiceForm.image && (
                  <div className="mt-2 flex items-center gap-3 p-2 bg-white/5 rounded-xl border border-white/10">
                    <img
                      src={newServiceForm.image}
                      alt="Live Preview"
                      className="w-14 h-14 rounded-lg object-cover border border-[#CFA46A]"
                      onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                    />
                    <div className="text-[11px] text-white/60">
                      <span className="text-[#CFA46A] font-semibold block">Live Image Preview</span>
                      This image will appear across all service views.
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newServiceForm.description}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, description: e.target.value })}
                  className="w-full p-3 bg-white/5 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA46A]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#CFA46A] hover:bg-[#B88D57] text-[#100C0D] text-xs font-bold uppercase tracking-wider shadow-lg"
                >
                  Create Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
