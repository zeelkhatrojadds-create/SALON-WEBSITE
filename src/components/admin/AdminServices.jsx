import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Edit2, Check, X, Layers, DollarSign, Clock, RefreshCw } from 'lucide-react';
import { ALL_SERVICES, CATEGORIES } from '../../data/servicesData';

export default function AdminServices({ customServices = [], onUpdateServices }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ price: '', duration: '', active: true });

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
        service.categoryName.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeServicesList, selectedCategory, searchQuery]);

  const handleStartEdit = (service) => {
    setEditingId(service.id);
    setEditForm({
      price: service.price,
      duration: service.duration,
      active: service.active !== false
    });
  };

  const handleSaveEdit = (serviceId) => {
    const updated = activeServicesList.map(s => {
      if (s.id === serviceId) {
        return {
          ...s,
          price: Number(editForm.price) || s.price,
          duration: editForm.duration || s.duration,
          active: editForm.active
        };
      }
      return s;
    });

    onUpdateServices(updated);
    setEditingId(null);
  };

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
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all 86 services to factory default prices and durations?')) {
      onUpdateServices(ALL_SERVICES.map(s => ({ ...s, active: true })));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Treatment Menu Catalog</h2>
          <p className="text-white/60 text-xs sm:text-sm">Manage pricing, duration, and availability for all 86 salon services.</p>
        </div>

        <button
          onClick={handleResetDefaults}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
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
              placeholder="Search 86 treatments by name or description..."
              className="w-full h-10 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-brand-pink"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-10 px-3 bg-[#24151E] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-brand-pink cursor-pointer"
            >
              <option value="all">All Categories ({activeServicesList.length})</option>
              {CATEGORIES.filter(c => c.id !== 'all').map((c) => (
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
                <th className="py-3.5 px-4 font-semibold text-right">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredServices.map((service) => {
                const isEditing = editingId === service.id;
                const isActive = service.active !== false;

                return (
                  <tr key={service.id} className="hover:bg-white/[0.03] transition-colors">
                    {/* Treatment Info */}
                    <td className="py-3.5 px-4 max-w-[240px]">
                      <div className="flex items-center gap-3">
                        <img 
                          src={service.image} 
                          alt={service.name} 
                          className="w-10 h-10 rounded-xl object-cover flex-shrink-0 border border-white/10"
                        />
                        <div className="min-w-0">
                          <div className="font-semibold text-white truncate">{service.name}</div>
                          <div className="text-white/40 text-[10px] truncate max-w-[180px]">{service.description}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-brand-gold-light">
                        {service.categoryName}
                      </span>
                    </td>

                    {/* Duration */}
                    <td className="py-3.5 px-4">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.duration}
                          onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                          className="w-24 h-8 px-2 bg-white/10 border border-brand-pink rounded-lg text-white text-xs"
                        />
                      ) : (
                        <div className="flex items-center gap-1.5 text-white/70">
                          <Clock className="w-3.5 h-3.5 text-brand-pink" />
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
                            className="w-20 h-8 px-2 bg-white/10 border border-brand-pink rounded-lg text-white text-xs"
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
                        {isActive ? 'Available' : 'Paused'}
                      </button>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleSaveEdit(service.id)}
                            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                            title="Save changes"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(service)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
                          title="Edit Treatment Details"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
