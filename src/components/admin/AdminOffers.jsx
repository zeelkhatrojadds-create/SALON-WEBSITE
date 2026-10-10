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
    <div className="space-y-6 animate-fade-in text-[#10110F]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#10110F]">Promotions & Offers</h2>
          <p className="text-[#6B7068] text-xs sm:text-sm">Manage VIP specials, holiday discount codes, and client perks.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="global-button inline-flex items-center gap-1.5 !px-5 !py-2.5 text-white text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
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
            className={`p-6 rounded-3xl bg-white border transition-all shadow-sm space-y-4 ${
              offer.isActive !== false ? 'border-[#DCE1D8] hover:border-[#263D2B]' : 'border-red-200 opacity-60'
            }`}
          >
            <div className="flex justify-between items-start gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-lg text-[#10110F]">{offer.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    offer.isActive !== false ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
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
                  onClick={() => handleOpenEdit(offer)}
                  className="p-2 rounded-xl bg-[#F7F4ED] hover:bg-[#263D2B] text-[#263D2B] hover:text-white text-xs transition-colors"
                  title="Edit offer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(offer.id, offer.title)}
                  className="p-2 rounded-xl bg-red-50 hover:bg-red-600 text-red-600 hover:text-white transition-colors"
                  title="Delete offer"
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
                onClick={() => handleToggleActive(offer)}
                className={`text-[11px] font-bold underline ${
                  offer.isActive !== false ? 'text-[#465640] hover:text-[#10110F]' : 'text-emerald-800 hover:text-[#263D2B]'
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-[#DCE1D8] rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE1D8]">
              <h3 className="font-serif font-bold text-[#10110F] text-lg">
                {editingItem ? 'Edit Special Offer' : 'Create Special Offer'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#6B7068] hover:text-[#10110F]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[#10110F] font-semibold mb-1">Offer Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. New Client Radiance Welcome"
                  className="w-full h-10 px-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-[#10110F] focus:border-[#263D2B] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#10110F] font-semibold mb-1">Coupon Code</label>
                  <input
                    type="text"
                    value={formData.couponCode}
                    onChange={(e) => setFormData({ ...formData, couponCode: e.target.value })}
                    placeholder="GLOW15"
                    className="w-full h-10 px-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-[#10110F] uppercase focus:border-[#263D2B] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#10110F] font-semibold mb-1">Discount Value</label>
                  <input
                    type="number"
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                    className="w-full h-10 px-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-[#10110F] focus:border-[#263D2B] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#10110F] font-semibold mb-1">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full h-10 px-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-[#10110F] focus:border-[#263D2B] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#10110F] font-semibold mb-1">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full h-10 px-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-[#10110F] focus:border-[#263D2B] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#10110F] font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Details regarding offer eligibility..."
                  className="w-full p-2.5 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-[#10110F] focus:border-[#263D2B] outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="offerActiveToggle"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded text-[#263D2B] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="offerActiveToggle" className="text-[#10110F] font-medium cursor-pointer">
                  Active and visible to customers
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="global-button-secondary !px-4 !py-2 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="global-button !px-6 !py-2 text-white font-bold uppercase tracking-wider cursor-pointer"
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
