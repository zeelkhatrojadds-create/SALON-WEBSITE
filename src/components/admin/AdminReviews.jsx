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
    <div className="space-y-6 animate-fade-in text-[#10110F]">
      
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[#263D2B] text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>Real-Time Moderation Hub</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#10110F] tracking-tight">
            Client Reviews & Stories
          </h1>
          <p className="text-[#6B7068] text-xs sm:text-sm max-w-xl">
            Manage public testimonials, toggle spotlight reviews, approve submissions, and monitor client sentiment.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="global-button inline-flex items-center gap-2 !px-5 !py-3 text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Verified Review</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#DCE1D8] space-y-2 shadow-sm">
          <span className="text-xs font-semibold text-[#6B7068] uppercase tracking-wider">Total Reviews</span>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-[#10110F]">{reviews.length}</div>
          <p className="text-[11px] text-[#6B7068]">{stats.totalReviews} approved live on website</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#DCE1D8] space-y-2 shadow-sm">
          <span className="text-xs font-semibold text-[#6B7068] uppercase tracking-wider">Average Rating</span>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-[#263D2B] flex items-center gap-2">
            <span>{stats.averageRating.toFixed(1)}</span>
            <Star className="w-5 h-5 fill-current text-[#263D2B]" />
          </div>
          <p className="text-[11px] text-emerald-800">99% would recommend to friends</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#DCE1D8] space-y-2 shadow-sm">
          <span className="text-xs font-semibold text-[#6B7068] uppercase tracking-wider">5-Star Feedback</span>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-[#10110F]">{stats.starCounts[5] || 0}</div>
          <p className="text-[11px] text-[#6B7068]">{stats.starPercentages[5]}% of total submissions</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#DCE1D8] space-y-2 shadow-sm">
          <span className="text-xs font-semibold text-[#6B7068] uppercase tracking-wider">Spotlight Featured</span>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-[#263D2B]">
            {reviews.filter(r => r.featured).length}
          </div>
          <p className="text-[11px] text-[#6B7068]">Highlighted in homepage carousel</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#DCE1D8] shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#6B7068] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client name, service or review..."
            className="w-full bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] pl-9 pr-4 py-2.5 outline-none focus:border-[#263D2B]"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] px-3 py-2.5 outline-none focus:border-[#263D2B]"
          >
            <option value="all">All Statuses</option>
            <option value="approved">Approved (Live)</option>
            <option value="pending">Pending Moderation</option>
          </select>

          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] px-3 py-2.5 outline-none focus:border-[#263D2B]"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars ★</option>
            <option value="4">4 Stars ★</option>
            <option value="3">3 Stars ★</option>
          </select>
        </div>

      </div>

      {/* Reviews Table / List */}
      <div className="bg-white rounded-3xl border border-[#DCE1D8] shadow-sm overflow-hidden">
        {filtered.length > 0 ? (
          <div className="divide-y divide-[#DCE1D8]">
            {filtered.map((item) => {
              const isApproved = item.status === 'approved' || !item.status;
              const isFeatured = Boolean(item.featured);

              return (
                <div 
                  key={item.id}
                  className="p-5 sm:p-6 hover:bg-[#F7F4ED]/40 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  {/* Left: Review Info */}
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-[#10110F] text-sm">
                        {item.customerName}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#F7F4ED] text-[#263D2B] border border-[#DCE1D8]">
                        {item.service}
                      </span>
                      {item.verified && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Verified
                        </span>
                      )}
                      {isFeatured && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-[#263D2B] bg-[#263D2B]/10 px-2 py-0.5 rounded-full font-bold border border-[#263D2B]/20">
                          <Sparkles className="w-3 h-3" />
                          Spotlight
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {[...Array(Number(item.rating) || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#263D2B] text-[#263D2B]" />
                        ))}
                      </div>
                      <span className="text-xs text-[#6B7068] font-mono">
                        • {item.date || 'Recent'}
                      </span>
                      <span className="text-xs text-[#6B7068] flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3 text-[#6B7068]" />
                        {item.likes || 0} helpful
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#10110F] leading-relaxed italic">
                      "{item.review}"
                    </p>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] text-[#6B7068] bg-[#F7F4ED] px-2 py-0.5 rounded-md border border-[#DCE1D8]"
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
                      className="p-2 rounded-xl bg-[#F7F4ED] hover:bg-[#DCE1D8] text-[#10110F] border border-[#DCE1D8] transition-colors"
                      title="Copy for Social Media"
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>

                    {/* Toggle Spotlight */}
                    <button
                      onClick={() => handleToggleFeatured(item.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        isFeatured
                          ? 'bg-[#263D2B] text-white border-[#263D2B]'
                          : 'bg-[#F7F4ED] text-[#10110F] border-[#DCE1D8] hover:border-[#263D2B]'
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
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      {isApproved ? 'Live (Approved)' : 'Pending Review'}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors cursor-pointer"
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
          <div className="text-center py-16 text-[#6B7068] text-sm space-y-2">
            <MessageSquareHeart className="w-8 h-8 text-[#6B7068] mx-auto" />
            <p>No reviews match the selected filter criteria.</p>
          </div>
        )}
      </div>

      {/* Add Review Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-[#DCE1D8] rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-5 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE1D8]">
              <h3 className="font-serif font-bold text-lg text-[#10110F]">Add Studio Testimonial</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F7F4ED] flex items-center justify-center text-[#10110F] hover:bg-[#DCE1D8]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#10110F] font-semibold mb-1">Customer Full Name</label>
                <input
                  type="text"
                  required
                  value={newReviewForm.customerName}
                  onChange={(e) => setNewReviewForm(f => ({ ...f, customerName: e.target.value }))}
                  placeholder="e.g. Meera Patel"
                  className="w-full h-10 px-3.5 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-[#10110F] outline-none focus:border-[#263D2B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#10110F] font-semibold mb-1">Service</label>
                  <input
                    type="text"
                    required
                    value={newReviewForm.service}
                    onChange={(e) => setNewReviewForm(f => ({ ...f, service: e.target.value }))}
                    className="w-full h-10 px-3.5 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-[#10110F] outline-none focus:border-[#263D2B]"
                  />
                </div>

                <div>
                  <label className="block text-[#10110F] font-semibold mb-1">Star Rating</label>
                  <select
                    value={newReviewForm.rating}
                    onChange={(e) => setNewReviewForm(f => ({ ...f, rating: Number(e.target.value) }))}
                    className="w-full h-10 px-3.5 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-[#10110F] outline-none focus:border-[#263D2B]"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★</option>
                    <option value={3}>3 Stars ★★★</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#10110F] font-semibold mb-1">Detailed Review</label>
                <textarea
                  required
                  rows={3}
                  value={newReviewForm.review}
                  onChange={(e) => setNewReviewForm(f => ({ ...f, review: e.target.value }))}
                  placeholder="Enter guest feedback..."
                  className="w-full p-3.5 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-[#10110F] outline-none focus:border-[#263D2B] resize-none"
                />
              </div>

              <div>
                <label className="block text-[#10110F] font-semibold mb-1">Tags (Comma Separated)</label>
                <input
                  type="text"
                  value={newReviewForm.tags}
                  onChange={(e) => setNewReviewForm(f => ({ ...f, tags: e.target.value }))}
                  placeholder="Gentle Touch, Clean Studio, Glowing Skin"
                  className="w-full h-10 px-3.5 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-[#10110F] outline-none focus:border-[#263D2B]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newReviewForm.featured}
                    onChange={(e) => setNewReviewForm(f => ({ ...f, featured: e.target.checked }))}
                    className="w-4 h-4 accent-[#263D2B]"
                  />
                  <span className="text-[#10110F]">Highlight in Spotlight</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newReviewForm.verified}
                    onChange={(e) => setNewReviewForm(f => ({ ...f, verified: e.target.checked }))}
                    className="w-4 h-4 accent-[#263D2B]"
                  />
                  <span className="text-[#10110F]">Mark as Verified Guest</span>
                </label>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#DCE1D8]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="global-button-secondary flex-1 !h-10 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="global-button flex-1 !h-10 text-white font-bold uppercase tracking-wider shadow-md cursor-pointer"
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
