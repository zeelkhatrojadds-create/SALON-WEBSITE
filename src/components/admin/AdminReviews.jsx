import React, { useState, useMemo } from 'react';
import { 
  Star, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Plus, 
  Search, 
  Filter, 
  ThumbsUp, 
  MessageSquareHeart, 
  ShieldCheck,
  Copy,
  Check,
  Award
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';

export default function AdminReviews({ reviews = [], onUpdateReviews }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  // Add Review Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newReviewForm, setNewReviewForm] = useState({
    customerName: '',
    service: 'Eyebrow Threading & Tint',
    rating: 5,
    review: '',
    tags: 'Gentle Touch, Clean Studio',
    featured: false,
    verified: true,
    status: 'approved'
  });

  const stats = useMemo(() => salonDB.getReviewStats(), [reviews]);

  // Filter Reviews
  const filtered = useMemo(() => {
    return reviews.filter(r => {
      if (statusFilter !== 'all') {
        const s = r.status || 'approved';
        if (s !== statusFilter) return false;
      }
      if (ratingFilter !== 'all') {
        if (Number(r.rating) !== Number(ratingFilter)) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = r.customerName?.toLowerCase().includes(q);
        const matchText = r.review?.toLowerCase().includes(q);
        const matchService = r.service?.toLowerCase().includes(q);
        if (!matchName && !matchText && !matchService) return false;
      }
      return true;
    });
  }, [reviews, statusFilter, ratingFilter, searchQuery]);

  const handleToggleStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === 'approved' ? 'pending' : 'approved';
    salonDB.updateReviewStatus(id, nextStatus);
    onUpdateReviews?.();
  };

  const handleToggleFeatured = (id) => {
    salonDB.toggleReviewFeatured(id);
    onUpdateReviews?.();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this review?')) {
      salonDB.deleteReview(id);
      onUpdateReviews?.();
    }
  };

  const handleCopyQuote = (item) => {
    const quote = `"${item.review}" — ${item.customerName} (${item.service}) ★★★★★`;
    navigator.clipboard.writeText(quote);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newReviewForm.customerName.trim() || !newReviewForm.review.trim()) return;

    const tagsArray = newReviewForm.tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    salonDB.addReview({
      customerName: newReviewForm.customerName.trim(),
      service: newReviewForm.service,
      rating: Number(newReviewForm.rating),
      review: newReviewForm.review.trim(),
      tags: tagsArray,
      featured: newReviewForm.featured,
      verified: newReviewForm.verified,
      status: newReviewForm.status
    });

    onUpdateReviews?.();
    setIsAddModalOpen(false);
    setNewReviewForm({
      customerName: '',
      service: 'Eyebrow Threading & Tint',
      rating: 5,
      review: '',
      tags: 'Gentle Touch, Clean Studio',
      featured: false,
      verified: true,
      status: 'approved'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in text-white">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#24151E] via-[#2F1B27] to-[#1C1217] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink/20 border border-brand-pink/30 text-brand-pink-light text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
            <span>Real-Time Moderation Hub</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Client Reviews & Stories
          </h1>
          <p className="text-white/70 text-xs sm:text-sm max-w-xl">
            Manage public testimonials, toggle spotlight reviews, approve submissions, and monitor client sentiment.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-pink/30 active:scale-95 transition-all cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Verified Review</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1C1418] rounded-2xl p-5 border border-white/10 space-y-2">
          <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Total Reviews</span>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-white">{reviews.length}</div>
          <p className="text-[11px] text-white/50">{stats.totalReviews} approved live on website</p>
        </div>

        <div className="bg-[#1C1418] rounded-2xl p-5 border border-white/10 space-y-2">
          <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Average Rating</span>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-brand-gold flex items-center gap-2">
            <span>{stats.averageRating.toFixed(1)}</span>
            <Star className="w-5 h-5 fill-current text-brand-gold" />
          </div>
          <p className="text-[11px] text-emerald-400">99% would recommend to friends</p>
        </div>

        <div className="bg-[#1C1418] rounded-2xl p-5 border border-white/10 space-y-2">
          <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">5-Star Feedback</span>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-white">{stats.starCounts[5] || 0}</div>
          <p className="text-[11px] text-white/50">{stats.starPercentages[5]}% of total submissions</p>
        </div>

        <div className="bg-[#1C1418] rounded-2xl p-5 border border-white/10 space-y-2">
          <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Spotlight Featured</span>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-purple-400">
            {reviews.filter(r => r.featured).length}
          </div>
          <p className="text-[11px] text-white/50">Highlighted in homepage carousel</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#1C1418] rounded-2xl p-4 border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client name, service or review..."
            className="w-full bg-white/5 border border-white/10 rounded-xl text-xs text-white pl-9 pr-4 py-2.5 outline-none focus:border-brand-pink"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl text-xs text-white px-3 py-2.5 outline-none focus:border-brand-pink"
          >
            <option value="all" className="bg-[#1C1418]">All Statuses</option>
            <option value="approved" className="bg-[#1C1418]">Approved (Live)</option>
            <option value="pending" className="bg-[#1C1418]">Pending Moderation</option>
          </select>

          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl text-xs text-white px-3 py-2.5 outline-none focus:border-brand-pink"
          >
            <option value="all" className="bg-[#1C1418]">All Ratings</option>
            <option value="5" className="bg-[#1C1418]">5 Stars ★</option>
            <option value="4" className="bg-[#1C1418]">4 Stars ★</option>
            <option value="3" className="bg-[#1C1418]">3 Stars ★</option>
          </select>
        </div>

      </div>

      {/* Reviews Table / List */}
      <div className="bg-[#1C1418] rounded-3xl border border-white/10 shadow-xl overflow-hidden">
        {filtered.length > 0 ? (
          <div className="divide-y divide-white/10">
            {filtered.map((item) => {
              const isApproved = item.status === 'approved' || !item.status;
              const isFeatured = Boolean(item.featured);

              return (
                <div 
                  key={item.id}
                  className="p-5 sm:p-6 hover:bg-white/[0.02] transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  {/* Left: Review Info */}
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-white text-sm">
                        {item.customerName}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-brand-gold-light border border-white/10">
                        {item.service}
                      </span>
                      {item.verified && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                      {isFeatured && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full font-bold">
                          <Sparkles className="w-3 h-3" />
                          Spotlight
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {[...Array(Number(item.rating) || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#CFA46A] text-[#CFA46A]" />
                        ))}
                      </div>
                      <span className="text-xs text-white/40 font-mono">
                        • {item.date || 'Recent'}
                      </span>
                      <span className="text-xs text-white/50 flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3 text-white/40" />
                        {item.likes || 0} helpful
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed italic">
                      "{item.review}"
                    </p>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] text-white/60 bg-white/5 px-2 py-0.5 rounded-md"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-wrap items-center gap-2 self-start lg:self-center flex-shrink-0">
                    
                    {/* Copy Quote Button */}
                    <button
                      onClick={() => handleCopyQuote(item)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors"
                      title="Copy for Social Media"
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>

                    {/* Toggle Spotlight */}
                    <button
                      onClick={() => handleToggleFeatured(item.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        isFeatured
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                          : 'bg-white/5 text-white/60 border-white/10 hover:border-purple-400 hover:text-purple-300'
                      }`}
                      title="Toggle Featured Carousel"
                    >
                      {isFeatured ? '★ Featured' : '☆ Feature'}
                    </button>

                    {/* Status Button */}
                    <button
                      onClick={() => handleToggleStatus(item.id, item.status)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        isApproved
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25'
                          : 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25'
                      }`}
                    >
                      {isApproved ? 'Live (Approved)' : 'Pending Review'}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors cursor-pointer"
                      title="Delete Review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 text-white/50 text-sm space-y-2">
            <MessageSquareHeart className="w-8 h-8 text-white/30 mx-auto" />
            <p>No reviews match the selected filter criteria.</p>
          </div>
        )}
      </div>

      {/* Add Review Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#1C1418] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-5 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-serif font-bold text-lg text-white">Add Studio Testimonial</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-white/80 font-semibold mb-1">Customer Full Name</label>
                <input
                  type="text"
                  required
                  value={newReviewForm.customerName}
                  onChange={(e) => setNewReviewForm(f => ({ ...f, customerName: e.target.value }))}
                  placeholder="e.g. Meera Patel"
                  className="w-full h-10 px-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-pink"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/80 font-semibold mb-1">Service</label>
                  <input
                    type="text"
                    required
                    value={newReviewForm.service}
                    onChange={(e) => setNewReviewForm(f => ({ ...f, service: e.target.value }))}
                    className="w-full h-10 px-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-pink"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-semibold mb-1">Star Rating</label>
                  <select
                    value={newReviewForm.rating}
                    onChange={(e) => setNewReviewForm(f => ({ ...f, rating: Number(e.target.value) }))}
                    className="w-full h-10 px-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-pink"
                  >
                    <option value={5} className="bg-[#1C1418]">5 Stars ★★★★★</option>
                    <option value={4} className="bg-[#1C1418]">4 Stars ★★★★</option>
                    <option value={3} className="bg-[#1C1418]">3 Stars ★★★</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/80 font-semibold mb-1">Detailed Review</label>
                <textarea
                  required
                  rows={3}
                  value={newReviewForm.review}
                  onChange={(e) => setNewReviewForm(f => ({ ...f, review: e.target.value }))}
                  placeholder="Enter guest feedback..."
                  className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-pink resize-none"
                />
              </div>

              <div>
                <label className="block text-white/80 font-semibold mb-1">Tags (Comma Separated)</label>
                <input
                  type="text"
                  value={newReviewForm.tags}
                  onChange={(e) => setNewReviewForm(f => ({ ...f, tags: e.target.value }))}
                  placeholder="Gentle Touch, Clean Studio, Glowing Skin"
                  className="w-full h-10 px-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-pink"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newReviewForm.featured}
                    onChange={(e) => setNewReviewForm(f => ({ ...f, featured: e.target.checked }))}
                    className="w-4 h-4 accent-brand-pink"
                  />
                  <span className="text-white/80">Highlight in Spotlight</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newReviewForm.verified}
                    onChange={(e) => setNewReviewForm(f => ({ ...f, verified: e.target.checked }))}
                    className="w-4 h-4 accent-brand-pink"
                  />
                  <span className="text-white/80">Mark as Verified Guest</span>
                </label>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 h-10 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/15 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-10 rounded-xl bg-brand-pink hover:bg-brand-pink-hover text-white font-bold uppercase tracking-wider shadow-lg shadow-brand-pink/30 transition-all"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
