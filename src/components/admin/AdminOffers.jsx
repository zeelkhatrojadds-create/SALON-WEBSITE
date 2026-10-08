import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Tag, 
  Sparkles, 
  Calendar, 
  Percent, 
  X,
  CheckCircle2,
  AlertCircle 
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';

export default function AdminOffers() {
  const [offers, setOffers] = useState(() => salonDB.getOffers());
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discountType: 'percentage',
    discountValue: 15,
    couponCode: 'GLOW15',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    isActive: true
  });

  useEffect(() => {
    const sync = () => setOffers(salonDB.getOffers());
    sync();
    const unsub = salonDB.subscribe(sync);
    return () => unsub();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      discountType: 'percentage',
      discountValue: 15,
      couponCode: 'GLOW15',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-12-31',
      isActive: true
    });
    setShowAddModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      description: item.description || '',
      discountType: item.discountType || 'percentage',
      discountValue: item.discountValue || 15,
      couponCode: item.couponCode || '',
      startDate: item.startDate || '',
      endDate: item.endDate || '',
      isActive: item.isActive !== false
    });
    setShowAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      discountType: formData.discountType,
      discountValue: Number(formData.discountValue) || 0,
      couponCode: formData.couponCode.trim().toUpperCase(),
      startDate: formData.startDate,
      endDate: formData.endDate,
      isActive: formData.isActive
    };

    if (editingItem) {
      salonDB.updateOffer(editingItem.id, payload);
    } else {
      salonDB.addOffer(payload);
    }

    setShowAddModal(false);
    setEditingItem(null);
  };

  const handleToggleActive = (offer) => {
    salonDB.updateOffer(offer.id, { isActive: !offer.isActive });
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete offer "${title}"?`)) {
      salonDB.deleteOffer(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Promotions & Offers</h2>
          <p className="text-white/60 text-xs sm:text-sm">Manage VIP specials, holiday discount codes, and client perks.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#CFA46A] hover:bg-[#E5C492] text-[#0D0B0B] text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#CFA46A]/20 active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Offer</span>
        </button>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`p-6 rounded-3xl bg-[#1C1418] border transition-all shadow-xl space-y-4 ${
              offer.isActive !== false ? 'border-white/10 hover:border-[#CFA46A]/40' : 'border-red-500/20 opacity-60'
            }`}
          >
            <div className="flex justify-between items-start gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-lg text-white">{offer.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    offer.isActive !== false ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                    {offer.isActive !== false ? 'Active' : 'Disabled'}
                  </span>
                </div>
                {offer.couponCode && (
                  <span className="inline-block px-3 py-1 rounded-lg bg-[#CFA46A]/15 text-[#CFA46A] font-mono font-bold text-xs border border-[#CFA46A]/30">
                    CODE: {offer.couponCode}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(offer)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs transition-colors"
                  title="Edit offer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(offer.id, offer.title)}
                  className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-colors"
                  title="Delete offer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed bg-white/5 p-3.5 rounded-2xl border border-white/5">
              {offer.description}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-white/50">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#CFA46A]" />
                <span>Valid: {offer.startDate} → {offer.endDate}</span>
              </div>
              <button
                onClick={() => handleToggleActive(offer)}
                className={`text-[11px] font-bold underline ${
                  offer.isActive !== false ? 'text-amber-400 hover:text-amber-300' : 'text-emerald-400 hover:text-emerald-300'
                }`}
              >
                {offer.isActive !== false ? 'Disable' : 'Enable'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#1C1418] border border-white/15 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-serif font-bold text-white text-lg">
                {editingItem ? 'Edit Special Offer' : 'Create Special Offer'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-white/80 font-semibold mb-1">Offer Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. New Client Radiance Welcome"
                  className="w-full h-10 px-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#CFA46A] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/80 font-semibold mb-1">Coupon Code</label>
                  <input
                    type="text"
                    value={formData.couponCode}
                    onChange={(e) => setFormData({ ...formData, couponCode: e.target.value })}
                    placeholder="GLOW15"
                    className="w-full h-10 px-3 bg-white/5 border border-white/10 rounded-xl text-white uppercase focus:border-[#CFA46A] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white/80 font-semibold mb-1">Discount Value</label>
                  <input
                    type="number"
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                    className="w-full h-10 px-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#CFA46A] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/80 font-semibold mb-1">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full h-10 px-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#CFA46A] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white/80 font-semibold mb-1">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full h-10 px-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#CFA46A] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Details regarding offer eligibility..."
                  className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#CFA46A] outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="offerActiveToggle"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded text-[#CFA46A] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="offerActiveToggle" className="text-white/90 font-medium cursor-pointer">
                  Active and visible to customers
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
                  {editingItem ? 'Update Offer' : 'Save Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
