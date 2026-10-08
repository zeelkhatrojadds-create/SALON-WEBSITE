import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  EyeOff, 
  Image as ImageIcon, 
  Search, 
  X, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';

export default function AdminGallery() {
  const [gallery, setGallery] = useState(() => salonDB.getGallery());
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'hair',
    badge: 'HAUTE COIFFURE',
    price: '$150+',
    description: '',
    tags: 'SIGNATURE, LUXE',
    image: '',
    isActive: true
  });

  useEffect(() => {
    const sync = () => setGallery(salonDB.getGallery());
    sync();
    const unsub = salonDB.subscribe(sync);
    return () => unsub();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'hair',
      badge: 'HAUTE COIFFURE',
      price: '$150+',
      description: '',
      tags: 'SIGNATURE, LUXE',
      image: '',
      isActive: true
    });
    setShowAddModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      category: item.category || 'hair',
      badge: item.badge || '',
      price: item.price || '',
      description: item.description || '',
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || '',
      image: item.image || '',
      isActive: item.isActive !== false
    });
    setShowAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    const tagsArray = typeof formData.tags === 'string'
      ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      : formData.tags;

    const payload = {
      title: formData.title.trim(),
      category: formData.category,
      badge: formData.badge.trim(),
      price: formData.price.trim(),
      description: formData.description.trim(),
      tags: tagsArray,
      image: formData.image.trim() || '/images/facial/24k-gold-hydra-glow.webp',
      isActive: formData.isActive
    };

    if (editingItem) {
      salonDB.updateGalleryItem(editingItem.id, payload);
    } else {
      salonDB.addGalleryItem(payload);
    }

    setShowAddModal(false);
    setEditingItem(null);
  };

  const handleToggleActive = (item) => {
    salonDB.updateGalleryItem(item.id, { isActive: !item.isActive });
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete gallery exhibition "${title}"?`)) {
      salonDB.deleteGalleryItem(id);
    }
  };

  const filteredItems = gallery.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      !q ||
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.category && item.category.toLowerCase().includes(q)) ||
      (item.badge && item.badge.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 animate-fade-in text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Gallery Exhibitions</h2>
          <p className="text-white/60 text-xs sm:text-sm">Manage visual showcase items, categories, and public visibility.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#CFA46A] hover:bg-[#E5C492] text-[#0D0B0B] text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#CFA46A]/20 active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Exhibition</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-[#1C1418] rounded-2xl p-4 border border-white/10 shadow-lg">
        <div className="relative">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exhibitions by title, category, or badge..."
            className="w-full h-10 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#CFA46A]"
          />
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div 
            key={item.id}
            className={`bg-[#1C1418] rounded-3xl border overflow-hidden shadow-xl flex flex-col justify-between transition-all ${
              item.isActive !== false ? 'border-white/10 hover:border-[#CFA46A]/40' : 'border-red-500/30 opacity-70'
            }`}
          >
            <div>
              <div className="relative aspect-[16/10] bg-black/40 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = '/images/facial/24k-gold-hydra-glow.webp'; }}
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase text-[#CFA46A] border border-white/10">
                  {item.badge || item.category}
                </span>
                <button
                  onClick={() => handleToggleActive(item)}
                  className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md border ${
                    item.isActive !== false ? 'bg-emerald-500/80 text-white border-emerald-400' : 'bg-red-500/80 text-white border-red-400'
                  }`}
                  title={item.isActive !== false ? 'Active on website' : 'Hidden from website'}
                >
                  {item.isActive !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-serif font-bold text-base text-white">{item.title}</h3>
                  <span className="text-xs font-mono font-bold text-[#CFA46A] flex-shrink-0">{item.price}</span>
                </div>
                <p className="text-xs text-white/60 line-clamp-2">{item.description}</p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-white/5 flex items-center justify-between gap-2 mt-2">
              <span className="text-[10px] font-mono text-white/40 uppercase">
                {item.category}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs transition-colors"
                  title="Edit item"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-colors"
                  title="Delete item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#1C1418] border border-white/15 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-serif font-bold text-white text-lg">
                {editingItem ? 'Edit Gallery Exhibition' : 'Add New Exhibition'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-white/80 font-semibold mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Sunkissed Parisian Balayage"
                  className="w-full h-10 px-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#CFA46A] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/80 font-semibold mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full h-10 px-3 bg-[#24151E] border border-white/10 rounded-xl text-white focus:border-[#CFA46A] outline-none"
                  >
                    <option value="hair">Haute Coiffure & Balayage</option>
                    <option value="facials">Luminous Facials</option>
                    <option value="bridal">Bridal Prep</option>
                    <option value="suites">Atelier Suites & Interior</option>
                    <option value="clinical">Clinical Dermo Care</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/80 font-semibold mb-1">Price Tag</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="$190+"
                    className="w-full h-10 px-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#CFA46A] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 font-semibold mb-1">Badge Text</label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="HAUTE COIFFURE"
                  className="w-full h-10 px-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#CFA46A] outline-none"
                />
              </div>

              <div>
                <label className="block text-white/80 font-semibold mb-1">Image URL / Path</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/facial/24k-gold-hydra-glow.webp"
                  className="w-full h-10 px-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#CFA46A] outline-none"
                />
              </div>

              <div>
                <label className="block text-white/80 font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#CFA46A] outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded text-[#CFA46A] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="isActiveToggle" className="text-white/90 font-medium cursor-pointer">
                  Show on live website
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-full bg-white/10 text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#CFA46A] text-[#0D0B0B] font-bold uppercase tracking-wider cursor-pointer"
                >
                  {editingItem ? 'Update Exhibition' : 'Save Exhibition'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
