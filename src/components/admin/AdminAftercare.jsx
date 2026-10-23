import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  Clock,
  Shield,
  Heart,
  Droplets,
  Sun,
  Flame,
  ThermometerSnowflake,
  Eye,
  Scissors,
  AlertCircle,
  ExternalLink,
  CheckCircle2,
  Tag,
  DollarSign,
  Link as LinkIcon
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';

const AVAILABLE_ICONS = [
  { id: 'Clock', label: 'Clock / Time' },
  { id: 'Shield', label: 'Shield / Protection' },
  { id: 'Heart', label: 'Heart / Care' },
  { id: 'Droplets', label: 'Droplets / Moisture' },
  { id: 'Sun', label: 'Sun / SPF UV' },
  { id: 'Flame', label: 'Flame / Heat' },
  { id: 'ThermometerSnowflake', label: 'Cool / Ice' },
  { id: 'Eye', label: 'Eye / Lashes' },
  { id: 'Scissors', label: 'Scissors / Trim' },
  { id: 'Sparkles', label: 'Sparkles / Glow' },
  { id: 'ShieldAlert', label: 'Alert / Avoid' }
];

export default function AdminAftercare() {
  const [categories, setCategories] = useState(() => salonDB.getAftercareSettings());
  const [selectedCatId, setSelectedCatId] = useState('hair-treatments');
  const [toast, setToast] = useState('');

  // Editing state for an instruction
  const [editingInstruction, setEditingInstruction] = useState(null);
  const [isAddingInstruction, setIsAddingInstruction] = useState(false);
  const [newInstruction, setNewInstruction] = useState({
    title: '',
    description: '',
    icon: 'Clock',
    timePeriod: 'First 48 Hours'
  });

  // Editing state for a product
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    image: '/images/products/keratin-hair-serum.jpg',
    description: '',
    whyStylistRecommends: '',
    howToUse: '',
    priceCad: 45.0,
    purchaseUrl: '',
    approved: true
  });

  useEffect(() => {
    const unsub = salonDB.subscribe(() => {
      setCategories(salonDB.getAftercareSettings());
    });
    return () => unsub();
  }, []);

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const currentCategory = categories.find(c => c.id === selectedCatId) || categories[0];

  // Save Instruction Edit
  const handleSaveInstruction = (e) => {
    e.preventDefault();
    if (!editingInstruction) return;

    salonDB.updateAftercareInstruction(selectedCatId, editingInstruction.id, {
      title: editingInstruction.title,
      description: editingInstruction.description,
      icon: editingInstruction.icon,
      timePeriod: editingInstruction.timePeriod
    });

    setEditingInstruction(null);
    showNotification('Instruction updated successfully.');
  };

  // Add New Instruction
  const handleAddInstruction = (e) => {
    e.preventDefault();
    if (!newInstruction.title || !newInstruction.description) return;

    salonDB.addAftercareInstruction(selectedCatId, newInstruction);
    setNewInstruction({
      title: '',
      description: '',
      icon: 'Clock',
      timePeriod: 'First 48 Hours'
    });
    setIsAddingInstruction(false);
    showNotification('New aftercare instruction added.');
  };

  // Delete Instruction
  const handleDeleteInstruction = (instructionId) => {
    if (window.confirm('Delete this aftercare instruction?')) {
      salonDB.deleteAftercareInstruction(selectedCatId, instructionId);
      showNotification('Instruction removed.');
    }
  };

  // Toggle Product Approval
  const handleToggleProductApproval = (product) => {
    const updatedProducts = (currentCategory.products || []).map(p => {
      if (p.id === product.id) {
        return { ...p, approved: !p.approved };
      }
      return p;
    });

    salonDB.updateAftercareCategory(selectedCatId, { products: updatedProducts });
    showNotification(`Product ${!product.approved ? 'approved' : 'hidden'} from customer recommendations.`);
  };

  // Save Product Edit
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    const updatedProducts = (currentCategory.products || []).map(p => {
      if (p.id === editingProduct.id) {
        return {
          ...p,
          name: editingProduct.name,
          category: editingProduct.category,
          image: editingProduct.image,
          description: editingProduct.description,
          whyStylistRecommends: editingProduct.whyStylistRecommends,
          howToUse: editingProduct.howToUse,
          priceCad: Number(editingProduct.priceCad) || 0,
          purchaseUrl: editingProduct.purchaseUrl,
          approved: editingProduct.approved !== false
        };
      }
      return p;
    });

    salonDB.updateAftercareCategory(selectedCatId, { products: updatedProducts });
    setEditingProduct(null);
    showNotification('Recommended product details updated.');
  };

  // Add New Product
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name) return;

    const newProdItem = {
      ...newProduct,
      id: `prod-${Date.now()}`,
      priceCad: Number(newProduct.priceCad) || 0
    };

    const updatedProducts = [...(currentCategory.products || []), newProdItem];
    salonDB.updateAftercareCategory(selectedCatId, { products: updatedProducts });
    setIsAddingProduct(false);
    setNewProduct({
      name: '',
      category: '',
      image: '/images/products/keratin-hair-serum.jpg',
      description: '',
      whyStylistRecommends: '',
      howToUse: '',
      priceCad: 45.0,
      purchaseUrl: '',
      approved: true
    });
    showNotification('Product recommendation added.');
  };

  // Reset to Default
  const handleResetDefaults = () => {
    if (window.confirm(`Reset "${currentCategory.name}" aftercare advice and products to salon master defaults?`)) {
      salonDB.resetAftercareCategoryToDefault(selectedCatId);
      showNotification('Reset to salon master standards.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#263D2B] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-[#10110F]">
            Aftercare & Stylist Recommendations
          </h2>
          <p className="text-xs text-[#6B7068] mt-1">
            Configure personalized post-service instructions and approved product recommendations for completed treatments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDefaults}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 border border-[#DCE1D8] text-xs font-semibold text-[#6B7068] hover:text-[#10110F] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Reset this category to default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Category</span>
          </button>

          <a
            href="/treatment-confirmation"
            target="_blank"
            rel="noopener noreferrer"
            className="global-button !px-4 !py-2 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <span>Live Customer Preview</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 border-b border-[#DCE1D8] scrollbar-none">
        {categories.map((cat) => {
          const isActive = cat.id === selectedCatId;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCatId(cat.id);
                setEditingInstruction(null);
                setEditingProduct(null);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#263D2B] text-white shadow-xs'
                  : 'bg-white text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED] border border-[#DCE1D8]'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] ${
                isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-[#6B7068]'
              }`}>
                {cat.instructions?.length || 0} steps
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Content: Instructions & Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Aftercare Instructions (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg text-[#10110F] font-medium">
                Home-Care Instructions ({currentCategory.instructions?.length || 0})
              </h3>
              <p className="text-xs text-[#6B7068]">
                Displayed in the customer's Treatment Confirmation ritual checklist.
              </p>
            </div>

            <button
              onClick={() => { setIsAddingInstruction(true); setEditingInstruction(null); }}
              className="px-3 py-1.5 rounded-lg bg-[#263D2B] text-white text-xs font-bold hover:bg-[#1a2b1e] transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Step</span>
            </button>
          </div>

          {/* Add New Instruction Modal/Form */}
          {isAddingInstruction && (
            <form onSubmit={handleAddInstruction} className="bg-white p-5 rounded-2xl border border-[#263D2B] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#DCE1D8]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#263D2B]">
                  New Aftercare Instruction
                </h4>
                <button
                  type="button"
                  onClick={() => setIsAddingInstruction(false)}
                  className="text-xs text-[#6B7068] hover:text-[#10110F]"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#6B7068] mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={newInstruction.title}
                    onChange={(e) => setNewInstruction({ ...newInstruction, title: e.target.value })}
                    placeholder="e.g. Recommended Washing Schedule"
                    className="w-full px-3 py-2 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#6B7068] mb-1">Time Period</label>
                  <input
                    type="text"
                    required
                    value={newInstruction.timePeriod}
                    onChange={(e) => setNewInstruction({ ...newInstruction, timePeriod: e.target.value })}
                    placeholder="e.g. First 48 Hours"
                    className="w-full px-3 py-2 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-[#6B7068] mb-1">Relevant Icon</label>
                <select
                  value={newInstruction.icon}
                  onChange={(e) => setNewInstruction({ ...newInstruction, icon: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                >
                  {AVAILABLE_ICONS.map(ic => (
                    <option key={ic.id} value={ic.id}>{ic.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-[#6B7068] mb-1">Description / Advice</label>
                <textarea
                  rows={3}
                  required
                  value={newInstruction.description}
                  onChange={(e) => setNewInstruction({ ...newInstruction, description: e.target.value })}
                  placeholder="Provide precise stylist instructions for the customer..."
                  className="w-full px-3 py-2 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingInstruction(false)}
                  className="px-3 py-1.5 rounded-lg border border-[#DCE1D8] text-xs text-[#6B7068]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="global-button !px-4 !py-1.5 text-white text-xs font-bold"
                >
                  Save Instruction
                </button>
              </div>
            </form>
          )}

          {/* List of Instructions */}
          <div className="space-y-3">
            {currentCategory.instructions?.map((inst, index) => (
              <div
                key={inst.id || index}
                className="bg-white rounded-2xl p-4 border border-[#DCE1D8] shadow-xs space-y-3"
              >
                {editingInstruction?.id === inst.id ? (
                  <form onSubmit={handleSaveInstruction} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#6B7068] mb-1">Title</label>
                        <input
                          type="text"
                          required
                          value={editingInstruction.title}
                          onChange={(e) => setEditingInstruction({ ...editingInstruction, title: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#DCE1D8] text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#6B7068] mb-1">Time Period</label>
                        <input
                          type="text"
                          required
                          value={editingInstruction.timePeriod}
                          onChange={(e) => setEditingInstruction({ ...editingInstruction, timePeriod: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#DCE1D8] text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-[#6B7068] mb-1">Icon</label>
                      <select
                        value={editingInstruction.icon}
                        onChange={(e) => setEditingInstruction({ ...editingInstruction, icon: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#DCE1D8] text-xs"
                      >
                        {AVAILABLE_ICONS.map(ic => (
                          <option key={ic.id} value={ic.id}>{ic.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-[#6B7068] mb-1">Description</label>
                      <textarea
                        rows={3}
                        required
                        value={editingInstruction.description}
                        onChange={(e) => setEditingInstruction({ ...editingInstruction, description: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#DCE1D8] text-xs"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingInstruction(null)}
                        className="px-3 py-1 rounded-lg border border-[#DCE1D8] text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="global-button !px-3 !py-1 text-white text-xs font-bold"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-[#263D2B]/10 text-[#263D2B] text-xs font-bold flex items-center justify-center">
                          {index + 1}
                        </span>
                        <h4 className="font-serif text-base text-[#10110F] font-medium">
                          {inst.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#F7F4ED] text-[10px] font-bold text-[#263D2B] border border-[#DCE1D8]">
                          {inst.timePeriod}
                        </span>
                        <button
                          onClick={() => setEditingInstruction(inst)}
                          className="p-1.5 rounded-lg text-[#6B7068] hover:text-[#263D2B] hover:bg-[#F7F4ED] transition-colors"
                          title="Edit instruction"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteInstruction(inst.id)}
                          className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                          title="Delete instruction"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-[#465640] pl-8 leading-relaxed">
                      {inst.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Approved Products (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg text-[#10110F] font-medium">
                Approved Products ({currentCategory.products?.length || 0})
              </h3>
              <p className="text-xs text-[#6B7068]">
                Only salon-approved items are displayed to customers.
              </p>
            </div>

            <button
              onClick={() => { setIsAddingProduct(true); setEditingProduct(null); }}
              className="px-3 py-1.5 rounded-lg bg-[#263D2B] text-white text-xs font-bold hover:bg-[#1a2b1e] transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>
          </div>

          {/* Add New Product Form */}
          {isAddingProduct && (
            <form onSubmit={handleAddProduct} className="bg-white p-5 rounded-2xl border border-[#263D2B] shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#DCE1D8]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#263D2B]">
                  New Recommended Product
                </h4>
                <button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="text-xs text-[#6B7068] hover:text-[#10110F]"
                >
                  ✕
                </button>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-[#6B7068] mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Luxe Botanical Keratin Elixir"
                  className="w-full px-3 py-1.5 rounded-lg border border-[#DCE1D8] text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#6B7068] mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    placeholder="e.g. Hair Repair"
                    className="w-full px-3 py-1.5 rounded-lg border border-[#DCE1D8] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#6B7068] mb-1">Price (CAD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProduct.priceCad}
                    onChange={(e) => setNewProduct({ ...newProduct, priceCad: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#DCE1D8] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-[#6B7068] mb-1">Image URL</label>
                <input
                  type="text"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#DCE1D8] text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-[#6B7068] mb-1">Why Stylist Recommends It</label>
                <textarea
                  rows={2}
                  value={newProduct.whyStylistRecommends}
                  onChange={(e) => setNewProduct({ ...newProduct, whyStylistRecommends: e.target.value })}
                  placeholder="Why Janki Khatroja recommends this specific product..."
                  className="w-full px-3 py-1.5 rounded-lg border border-[#DCE1D8] text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-[#6B7068] mb-1">How to Use</label>
                <textarea
                  rows={2}
                  value={newProduct.howToUse}
                  onChange={(e) => setNewProduct({ ...newProduct, howToUse: e.target.value })}
                  placeholder="Step by step application instructions..."
                  className="w-full px-3 py-1.5 rounded-lg border border-[#DCE1D8] text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="px-3 py-1 rounded-lg border border-[#DCE1D8] text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="global-button !px-3 !py-1 text-white text-xs font-bold"
                >
                  Add Product
                </button>
              </div>
            </form>
          )}

          {/* List of Products */}
          <div className="space-y-4">
            {currentCategory.products?.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl p-4 border border-[#DCE1D8] shadow-xs space-y-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-xl bg-[#F7F4ED] overflow-hidden shrink-0 border border-[#DCE1D8] p-1 flex items-center justify-center">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase font-bold text-[#6B7068]">
                        {prod.category}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleToggleProductApproval(prod)}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                            prod.approved !== false
                              ? 'bg-emerald-50 text-[#263D2B] border border-emerald-200'
                              : 'bg-stone-100 text-[#6B7068]'
                          }`}
                        >
                          {prod.approved !== false ? 'Approved' : 'Hidden'}
                        </button>

                        <button
                          onClick={() => setEditingProduct(prod)}
                          className="p-1 rounded-lg text-[#6B7068] hover:text-[#263D2B]"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h4 className="font-serif text-sm font-semibold text-[#10110F] truncate mt-0.5">
                      {prod.name}
                    </h4>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-xs font-bold text-[#263D2B]">
                        ${prod.priceCad?.toFixed(2)} CAD
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F7F4ED] p-3 rounded-xl border border-[#DCE1D8] text-[11px] space-y-1">
                  <div className="font-bold text-[#263D2B]">Stylist Recommendation:</div>
                  <div className="text-[#465640] italic line-clamp-2">
                    "{prod.whyStylistRecommends}"
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
