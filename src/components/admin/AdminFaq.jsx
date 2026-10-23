import React, { useState, useEffect, useMemo } from 'react';
import {
  HelpCircle,
  Plus,
  Search,
  Edit3,
  Trash2,
  CheckCircle2,
  Eye,
  EyeOff,
  X,
  ExternalLink,
  Sparkles,
  RotateCcw,
  Tag,
  Link as LinkIcon,
  Filter,
  Check,
  AlertCircle
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';
import { FAQ_CATEGORIES } from '../../data/faqData';

export default function AdminFaq({ faqs: initialFaqs, onUpdateFaqs }) {
  const [faqsList, setFaqsList] = useState(() => initialFaqs || salonDB.getFaqs(true));
  const [servicesList, setServicesList] = useState(() => salonDB.getServices());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'published' | 'draft'

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'booking',
    isPublished: true,
    serviceId: '',
    serviceLink: '',
    displayOrder: 1
  });

  const [notification, setNotification] = useState(null);

  // Sync with live DB updates
  useEffect(() => {
    const handleSync = () => {
      setFaqsList(salonDB.getFaqs(true));
      setServicesList(salonDB.getServices());
    };
    handleSync();
    const unsubscribe = salonDB.subscribe(handleSync);
    return () => unsubscribe();
  }, []);

  // Show transient alert message
  const triggerNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  };

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return faqsList.filter((f) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'all' || f.category === selectedCategory;

      // Status match
      const isPub = f.isPublished !== false;
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'published' && isPub) ||
        (statusFilter === 'draft' && !isPub);

      // Search match
      const matchesSearch =
        !q ||
        f.question?.toLowerCase().includes(q) ||
        f.answer?.toLowerCase().includes(q) ||
        f.categoryLabel?.toLowerCase().includes(q);

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [faqsList, searchQuery, selectedCategory, statusFilter]);

  // Metrics
  const totalCount = faqsList.length;
  const publishedCount = faqsList.filter((f) => f.isPublished !== false).length;
  const draftCount = totalCount - publishedCount;

  // Open Modal for Add
  const handleOpenAddModal = () => {
    setModalMode('add');
    setEditingId(null);
    setFormData({
      question: '',
      answer: '',
      category: 'booking',
      isPublished: true,
      serviceId: '',
      serviceLink: '',
      displayOrder: faqsList.length + 1
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (faq) => {
    setModalMode('edit');
    setEditingId(faq.id);
    setFormData({
      question: faq.question || '',
      answer: faq.answer || '',
      category: faq.category || 'booking',
      isPublished: faq.isPublished !== false,
      serviceId: faq.serviceId || '',
      serviceLink: faq.serviceLink || '',
      displayOrder: faq.displayOrder || 1
    });
    setIsModalOpen(true);
  };

  // Service change helper
  const handleServiceChange = (srvId) => {
    if (!srvId) {
      setFormData((prev) => ({
        ...prev,
        serviceId: '',
        serviceLink: ''
      }));
      return;
    }

    const srv = servicesList.find((s) => s.id === srvId);
    setFormData((prev) => ({
      ...prev,
      serviceId: srvId,
      serviceLink: srv ? `/book-appointment?service=${srv.id}` : ''
    }));
  };

  // Save FAQ Form
  const handleSaveFaq = (e) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) {
      triggerNotification('error', 'Please provide both question and answer content.');
      return;
    }

    const matchedCat = FAQ_CATEGORIES.find((c) => c.id === formData.category);
    const categoryLabel = matchedCat ? matchedCat.label : 'General';

    if (modalMode === 'add') {
      const newFaq = salonDB.addFaq({
        question: formData.question.trim(),
        answer: formData.answer.trim(),
        category: formData.category,
        categoryLabel,
        isPublished: formData.isPublished,
        serviceId: formData.serviceId || undefined,
        serviceLink: formData.serviceLink || undefined,
        displayOrder: Number(formData.displayOrder) || (faqsList.length + 1)
      });
      triggerNotification('success', 'New FAQ added successfully.');
    } else {
      salonDB.updateFaq(editingId, {
        question: formData.question.trim(),
        answer: formData.answer.trim(),
        category: formData.category,
        categoryLabel,
        isPublished: formData.isPublished,
        serviceId: formData.serviceId || undefined,
        serviceLink: formData.serviceLink || undefined,
        displayOrder: Number(formData.displayOrder) || 1
      });
      triggerNotification('success', 'FAQ updated successfully.');
    }

    if (onUpdateFaqs) onUpdateFaqs();
    setIsModalOpen(false);
  };

  // Toggle publish
  const handleTogglePublish = (id) => {
    const updated = salonDB.toggleFaqPublish(id);
    if (updated) {
      const statusText = updated.isPublished ? 'published' : 'moved to draft';
      triggerNotification('success', `Question #${id} is now ${statusText}.`);
      if (onUpdateFaqs) onUpdateFaqs();
    }
  };

  // Delete FAQ
  const handleDeleteFaq = (id) => {
    if (window.confirm(`Are you sure you want to delete this FAQ question?`)) {
      salonDB.deleteFaq(id);
      triggerNotification('success', `Question #${id} was deleted.`);
      if (onUpdateFaqs) onUpdateFaqs();
    }
  };

  // Reset to default
  const handleResetDefaults = () => {
    if (window.confirm('Reset all FAQs back to default verified master catalog? Any custom questions will be replaced.')) {
      salonDB.resetFaqsToDefault();
      triggerNotification('success', 'FAQ catalog reset to verified default.');
      if (onUpdateFaqs) onUpdateFaqs();
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-[#10110F]">
      
      {/* Toast Notification Banner */}
      {notification && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 border shadow-md text-xs font-medium transition-all ${
            notification.type === 'error'
              ? 'bg-red-50 text-red-700 border-red-200'
              : 'bg-[#263D2B] text-white border-[#263D2B]'
          }`}
        >
          {notification.type === 'error' ? (
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-[#A8B5A0] flex-shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* 1. Header & Quick Metrics */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B]">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>CONTENT MANAGEMENT</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal tracking-tight">
              FAQ & Service Q&A Hub
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7068] max-w-xl font-light">
              Add, edit, publish, unpublish, and link questions directly to live salon catalog treatments and festival offers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="px-4 py-2.5 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] hover:bg-[#DCE1D8] text-[#10110F] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Restore verified default FAQ list"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>Reset Defaults</span>
            </button>

            <button
              type="button"
              onClick={handleOpenAddModal}
              className="global-button !px-5 !py-2.5 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Question</span>
            </button>
          </div>
        </div>

        {/* Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-[#DCE1D8]">
          <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">Total FAQs</span>
            <span className="text-xl sm:text-2xl font-serif text-[#10110F] font-normal">{totalCount}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[#263D2B]/30">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
              Published Live
            </span>
            <span className="text-xl sm:text-2xl font-serif text-[#263D2B] font-medium">{publishedCount}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">Draft / Hidden</span>
            <span className="text-xl sm:text-2xl font-serif text-[#6B7068] font-normal">{draftCount}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">Categories</span>
            <span className="text-xl sm:text-2xl font-serif text-[#10110F] font-normal">{FAQ_CATEGORIES.length - 1}</span>
          </div>
        </div>
      </div>

      {/* 2. Controls & Filter Bar */}
      <div className="bg-white rounded-3xl p-5 border border-[#DCE1D8] shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#6B7068] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by question or answer keyword..."
              className="w-full bg-[#F7F4ED]/50 border border-[#DCE1D8] focus:border-[#263D2B] rounded-xl pl-10 pr-9 py-2.5 text-xs text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none focus:ring-1 focus:ring-[#263D2B] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7068] hover:text-[#10110F]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="w-full md:w-56">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white border border-[#DCE1D8] focus:border-[#263D2B] rounded-xl px-3 py-2.5 text-xs text-[#10110F] focus:outline-none cursor-pointer"
            >
              {FAQ_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status Tabs */}
          <div className="inline-flex rounded-xl bg-[#F7F4ED] p-1 border border-[#DCE1D8]">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-[#263D2B] text-white shadow-xs'
                  : 'text-[#6B7068] hover:text-[#10110F]'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('published')}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                statusFilter === 'published'
                  ? 'bg-[#263D2B] text-white shadow-xs'
                  : 'text-[#6B7068] hover:text-[#10110F]'
              }`}
            >
              Published
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('draft')}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                statusFilter === 'draft'
                  ? 'bg-[#263D2B] text-white shadow-xs'
                  : 'text-[#6B7068] hover:text-[#10110F]'
              }`}
            >
              Drafts
            </button>
          </div>
        </div>

        {/* Filter Summary */}
        <div className="text-[11px] text-[#6B7068] flex items-center justify-between pt-1">
          <span>
            Showing <strong className="text-[#10110F]">{filteredFaqs.length}</strong> of {totalCount} questions
            {selectedCategory !== 'all' && ` in ${FAQ_CATEGORIES.find((c) => c.id === selectedCategory)?.label}`}
          </span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="hover:text-[#263D2B] underline cursor-pointer"
            >
              Clear search
            </button>
          )}
        </div>
      </div>

      {/* 3. FAQ List View */}
      <div className="space-y-3.5">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 border border-[#DCE1D8] text-center space-y-3">
            <HelpCircle className="w-10 h-10 text-[#6B7068] mx-auto opacity-40" />
            <h3 className="font-serif text-lg text-[#10110F]">No matching questions found</h3>
            <p className="text-xs text-[#6B7068] max-w-sm mx-auto">
              Try adjusting your search query, selecting another category, or add a new FAQ.
            </p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isPub = faq.isPublished !== false;
            const linkedService = faq.serviceId
              ? servicesList.find((s) => s.id === faq.serviceId)
              : null;

            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all duration-200 ${
                  isPub
                    ? 'border-[#DCE1D8] hover:border-[#263D2B] shadow-xs'
                    : 'border-dashed border-[#A8B5A0] bg-white/70 opacity-80'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  
                  {/* Left: Content */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono text-[#6B7068] bg-[#F7F4ED] px-2 py-0.5 rounded border border-[#DCE1D8]">
                        #{faq.id}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#263D2B]/10 text-[#263D2B] border border-[#263D2B]/20">
                        {faq.categoryLabel || faq.category}
                      </span>
                      {isPub ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#263D2B] bg-[#263D2B]/5 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#6B7068] bg-gray-100 px-2 py-0.5 rounded-full">
                          <EyeOff className="w-3 h-3" />
                          Draft / Hidden
                        </span>
                      )}

                      {linkedService && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#465640] bg-[#F7F4ED] border border-[#DCE1D8] px-2 py-0.5 rounded-full">
                          <Sparkles className="w-3 h-3 text-[#263D2B]" />
                          <span>Linked: {linkedService.name} (${linkedService.price} CAD • {linkedService.duration})</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-base sm:text-lg text-[#10110F] font-normal leading-snug">
                      {faq.question}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed font-light">
                      {faq.answer}
                    </p>

                    {faq.serviceLink && (
                      <div className="pt-1">
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#263D2B] font-medium">
                          <LinkIcon className="w-3 h-3" />
                          <span>Target Route: {faq.serviceLink}</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right: Actions */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#DCE1D8]">
                    
                    {/* 1-Click Toggle Publish Status */}
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(faq.id)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold flex items-center gap-1.5 border transition-colors cursor-pointer ${
                        isPub
                          ? 'bg-white border-[#263D2B] text-[#263D2B] hover:bg-[#F7F4ED]'
                          : 'bg-[#263D2B] border-[#263D2B] text-white hover:bg-[#1f3123]'
                      }`}
                      title={isPub ? 'Click to hide question from public' : 'Click to publish question live'}
                    >
                      {isPub ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Unpublish</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Publish Live</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1.5">
                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(faq)}
                        className="p-2 rounded-xl text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED] border border-[#DCE1D8] transition-colors cursor-pointer"
                        title="Edit FAQ"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleDeleteFaq(faq.id)}
                        className="p-2 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 transition-colors cursor-pointer"
                        title="Delete FAQ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 4. Add / Edit FAQ Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE1D8]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B]">
                  {modalMode === 'add' ? 'Create New Entry' : `Edit Entry #${editingId}`}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl text-[#10110F]">
                  {modalMode === 'add' ? 'Add FAQ Question' : 'Modify FAQ Question'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F7F4ED] hover:bg-[#DCE1D8] flex items-center justify-center text-[#10110F] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-4 text-xs">
              
              {/* Question */}
              <div>
                <label className="block text-[#10110F] font-bold mb-1 uppercase tracking-wider text-[10px]">
                  Question Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g. What treatments do you offer for bridal hair and makeup?"
                  className="w-full bg-[#F7F4ED]/50 border border-[#DCE1D8] focus:border-[#263D2B] rounded-xl px-3.5 py-2.5 text-xs text-[#10110F] focus:outline-none focus:ring-1 focus:ring-[#263D2B]"
                />
              </div>

              {/* Answer */}
              <div>
                <label className="block text-[#10110F] font-bold mb-1 uppercase tracking-wider text-[10px]">
                  Detailed Answer *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Provide an accurate, reassuring explanation with exact details, timing, and policies..."
                  className="w-full bg-[#F7F4ED]/50 border border-[#DCE1D8] focus:border-[#263D2B] rounded-xl px-3.5 py-2.5 text-xs text-[#10110F] focus:outline-none focus:ring-1 focus:ring-[#263D2B] leading-relaxed resize-y"
                />
              </div>

              {/* Category & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#10110F] font-bold mb-1 uppercase tracking-wider text-[10px]">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#F7F4ED]/50 border border-[#DCE1D8] focus:border-[#263D2B] rounded-xl px-3 py-2.5 text-xs text-[#10110F] focus:outline-none cursor-pointer"
                  >
                    {FAQ_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#10110F] font-bold mb-1 uppercase tracking-wider text-[10px]">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                    className="w-full bg-[#F7F4ED]/50 border border-[#DCE1D8] focus:border-[#263D2B] rounded-xl px-3.5 py-2.5 text-xs text-[#10110F] focus:outline-none"
                  />
                </div>
              </div>

              {/* Dynamic Service Integration Selector */}
              <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2">
                <label className="block text-[#263D2B] font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
                  <span>Dynamic Service Linking (Optional)</span>
                </label>
                <p className="text-[11px] text-[#6B7068] leading-tight">
                  Connect this question to a real treatment from the catalog. Its live price in CAD and duration will be displayed and synchronized automatically.
                </p>
                <select
                  value={formData.serviceId}
                  onChange={(e) => handleServiceChange(e.target.value)}
                  className="w-full bg-white border border-[#DCE1D8] focus:border-[#263D2B] rounded-xl px-3 py-2 text-xs text-[#10110F] focus:outline-none cursor-pointer"
                >
                  <option value="">-- No specific treatment linked --</option>
                  {servicesList.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.name} ({srv.categoryName} • ${srv.price} CAD • {srv.duration})
                    </option>
                  ))}
                </select>

                {formData.serviceId && (
                  <div className="text-[11px] text-[#263D2B] bg-white p-2.5 rounded-xl border border-[#DCE1D8] flex items-center justify-between">
                    <span>Direct Booking Link Generated:</span>
                    <span className="font-mono text-[10px] bg-[#F7F4ED] px-2 py-0.5 rounded border border-[#DCE1D8]">
                      {formData.serviceLink}
                    </span>
                  </div>
                )}
              </div>

              {/* Published Switch */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="faq-published-toggle"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 rounded text-[#263D2B] focus:ring-[#263D2B] cursor-pointer"
                />
                <label htmlFor="faq-published-toggle" className="text-xs text-[#10110F] font-medium cursor-pointer">
                  Publish live to public website immediately
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#DCE1D8] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#DCE1D8] text-xs font-semibold text-[#6B7068] hover:text-[#10110F] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="global-button !px-6 !py-2.5 text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
                >
                  {modalMode === 'add' ? 'Save & Publish' : 'Update FAQ'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
