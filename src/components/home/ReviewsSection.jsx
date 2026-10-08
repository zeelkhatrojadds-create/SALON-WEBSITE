import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Sparkles, 
  Lock, 
  Check, 
  ArrowRight, 
  Quote, 
  ShieldCheck, 
  X, 
  MessageSquare, 
  ThumbsUp, 
  PlusCircle, 
  Building2,
  Calendar
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import salonDB from '../../db/salonDatabase';

export default function ReviewsSection() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('ALL REVIEWS');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [submittedReview, setSubmittedReview] = useState(false);
  const [reviewsList, setReviewsList] = useState(() => salonDB.getApprovedReviews());

  React.useEffect(() => {
    const sync = () => setReviewsList(salonDB.getApprovedReviews());
    sync();
    const unsub = salonDB.subscribe(sync);
    return () => unsub();
  }, []);

  // Form State
  const [newReview, setNewReview] = useState({
    name: '',
    title: '',
    role: '',
    service: '24K Cellular Facials',
    rating: 5,
    text: ''
  });

  // Filter Categories
  const categories = [
    'ALL REVIEWS',
    '24K CELLULAR FACIALS',
    'PARISIAN BALAYAGE & CUT',
    'BRIDAL PRIVÉ RITUALS',
    'DERMAL SKIN PROTOCOLS',
    'THREADING & LASHES'
  ];

  const handleLike = (id) => {
    salonDB.toggleLikeReview(id);
  };

  const handleAddReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;

    salonDB.addReview({
      customerName: newReview.name.trim(),
      service: newReview.service,
      serviceCategory: 'other',
      rating: newReview.rating,
      review: newReview.text.trim(),
      verified: true,
      tags: ['Guest Review', newReview.service]
    });

    setSubmittedReview(true);
    setTimeout(() => {
      setSubmittedReview(false);
      setReviewModalOpen(false);
      setNewReview({ name: '', title: '', role: '', service: '24K Cellular Facials', rating: 5, text: '' });
    }, 2000);
  };

  const filteredReviews = activeCategory === 'ALL REVIEWS'
    ? reviewsList
    : reviewsList.filter(r => {
        const cat = (r.serviceCategory || r.category || '').toUpperCase();
        const srv = (r.service || '').toUpperCase();
        const text = (r.review || r.text || '').toUpperCase();

        if (activeCategory === '24K CELLULAR FACIALS') return cat.includes('FACIAL') || srv.includes('FACIAL') || text.includes('FACIAL');
        if (activeCategory === 'PARISIAN BALAYAGE & CUT') return cat.includes('HAIR') || srv.includes('BALAYAGE') || srv.includes('CUT') || text.includes('BALAYAGE');
        if (activeCategory === 'BRIDAL PRIVÉ RITUALS') return cat.includes('BRIDAL') || cat.includes('HENNA') || srv.includes('BRIDAL');
        if (activeCategory === 'DERMAL SKIN PROTOCOLS') return cat.includes('FACIAL') || text.includes('SKIN');
        if (activeCategory === 'THREADING & LASHES') return cat.includes('THREADING') || cat.includes('LASH') || srv.includes('THREADING');
        return true;
      });

  return (
    <div id="reviews" className="w-full bg-[#FAF5EE] text-[#2B1D19] font-sans antialiased selection:bg-[#EAD5CA] selection:text-[#2B1D19]">
      
      {/* ========================================================================= */}
      {/* 1. HERO HEADER                                                           */}
      {/* ========================================================================= */}
      <section className="pt-20 sm:pt-28 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <ScrollReveal stagger={true}>
        {/* Top Tag Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3E5DE] border border-[#E4CEC3] text-[#A6634E] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] mb-6 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8735C]" />
          <span>BESPOKE ATELIER · GUEST CHRONICLES | 04 / CLIENT EXPERIENCES & REVIEWS</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#2B1D19] font-normal tracking-tight leading-[1.15] mb-5">
          Words of{' '}
          <span className="italic font-accent text-[#B8735C] font-normal">
            Radiance
          </span>{' '}
          & Reverence.
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-[#6E5C56] text-xs sm:text-sm md:text-[15px] leading-relaxed mb-8">
          Unfiltered reflections from our discerning clientele who have stepped inside our 180 Kent Street single-guest sanctuary to experience bespoke facial dermal rituals and haute coiffure.
        </p>

        {/* 3 Pill Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#543830]">
          <div className="px-4 py-2 rounded-full bg-[#F3E6DF] border border-[#E5D2C7] flex items-center gap-2">
            <Star className="w-3.5 h-3.5 fill-[#B8735C] text-[#B8735C]" />
            <span>5.0 VERIFIED OVERALL RATING (320+ REVIEWS)</span>
          </div>

          <div className="px-4 py-2 rounded-full bg-[#F3E6DF] border border-[#E5D2C7] flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-[#B8735C]" />
            <span>100% DISCREET SINGLE-OCCUPANCY PRIVACY</span>
          </div>

          <div className="px-4 py-2 rounded-full bg-[#F3E6DF] border border-[#E5D2C7] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B8735C]" />
            <span>OTTAWA'S LEADING HAUTE BEAUTY ATELIER</span>
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 2. METRICS & TRUST STATS BAR (4 COLUMNS)                                 */}
      {/* ========================================================================= */}
      <section className="pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <ScrollReveal className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE1D8] shadow-[0_15px_40px_-10px_rgba(74,50,43,0.06)] grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-[#F3E6DF]">
          
          {/* Stat 1 */}
          <div className="px-2 space-y-1">
            <div className="flex justify-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#B8735C] text-[#B8735C]" />
              ))}
            </div>
            <div className="font-serif text-2xl sm:text-3xl text-[#2B1D19] font-medium">
              5.0 / 5.0
            </div>
            <div className="text-[11px] font-bold text-[#2B1D19] uppercase tracking-wider">
              Impeccable Rating
            </div>
            <div className="text-[10px] text-[#8E756C]">Across 320+ certified submissions</div>
          </div>

          {/* Stat 2 */}
          <div className="px-2 space-y-1">
            <div className="font-serif text-2xl sm:text-3xl text-[#2B1D19] font-medium">
              99.4%
            </div>
            <div className="text-[11px] font-bold text-[#2B1D19] uppercase tracking-wider">
              Rebooking Loyalty
            </div>
            <div className="text-[10px] text-[#8E756C]">Discreet repeat patron rate</div>
          </div>

          {/* Stat 3 */}
          <div className="px-2 space-y-1">
            <div className="font-serif text-2xl sm:text-3xl text-[#2B1D19] font-medium">
              14+ Yrs
            </div>
            <div className="text-[11px] font-bold text-[#2B1D19] uppercase tracking-wider">
              Paris & Geneva Pedigree
            </div>
            <div className="text-[10px] text-[#8E756C]">Master aesthetician expression</div>
          </div>

          {/* Stat 4 */}
          <div className="px-2 space-y-1">
            <div className="font-serif text-2xl sm:text-3xl text-[#2B1D19] font-medium">
              03 Suites
            </div>
            <div className="text-[11px] font-bold text-[#2B1D19] uppercase tracking-wider">
              Acoustic Privé Chambers
            </div>
            <div className="text-[10px] text-[#8E756C]">Zero guest overlap guaranteed</div>
          </div>

        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 3. CATEGORY FILTER BUTTONS & WRITE REVIEW TRIGGER                         */}
      {/* ========================================================================= */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="pills-scroll sm:flex-wrap sm:justify-center pb-2">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-200 cursor-pointer flex-shrink-0 ${
                  isSelected
                    ? 'bg-[#3D2721] text-white shadow-sm border border-[#3D2721]'
                    : 'bg-white text-[#543830] border border-[#E2CCC0] hover:border-[#B8735C] hover:bg-[#FAF0EB]'
                }`}
              >
                {cat}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setReviewModalOpen(true)}
            className="px-4 py-2.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] bg-[#B8735C] hover:bg-[#A3604A] text-white shadow-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5 flex-shrink-0"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>WRITE A REVIEW</span>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FEATURED GUEST CHRONICLE SPOTLIGHT CARD                                */}
      {/* ========================================================================= */}
      <section className="pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="bg-[#FBF2EC] rounded-3xl p-5 sm:p-8 lg:p-10 border border-[#E8D5CC] shadow-[0_20px_50px_-15px_rgba(74,50,43,0.1)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 lg:gap-12 items-center">
            
            {/* Left Photo with Overlay */}
            <div className="md:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-[#E8D8CF]">
                <img
                  src="/facial-atelier-clean.jpg"
                  alt="Featured Treatment Session at Glam Girl Atelier"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-white">
                  SUITE 401 · 180 KENT STREET
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-bold text-[#4A322B] flex items-center gap-1">
                  <Star className="w-3 h-3 fill-[#B8735C] text-[#B8735C]" />
                  <span>Verified Patron</span>
                </div>
              </div>
            </div>

            {/* Right Quote Details */}
            <div className="md:col-span-7 space-y-4 sm:space-y-5">
              
              {/* Stars & Tag */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#B8735C] text-[#B8735C]" />
                  ))}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E5E50]">
                  FEATURED GUEST CHRONICLE
                </span>
              </div>

              {/* Quote */}
              <p className="font-serif italic text-base sm:text-xl md:text-2xl text-[#2B1D19] leading-relaxed">
                "From the discreet arrival protocol at 180 Kent St to the bespoke 24K gold cellular infusion, Janki has crafted something completely transcendent in Ottawa. My skin has never held such effortless, dewy luminosity."
              </p>

              {/* Patron Info & Tag */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-t border-[#E8D5CC]">
                <div>
                  <div className="font-serif font-bold text-sm sm:text-base text-[#2B1D19]">
                    Geneviève Moreau
                  </div>
                  <div className="text-[11px] text-[#6E5C56]">
                    Diplomatic Liaison & Editorial Contributor · Ottawa Flagship Patron
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E2CCC0] text-[10px] font-bold text-[#543830] uppercase tracking-wider flex-shrink-0">
                  <Sparkles className="w-3 h-3 text-[#B8735C]" />
                  <span>24K Gold Cellular Lift & Facial (90 Min)</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CHRONICLES OF UNHURRIED DEVOTION GRID (6 CARDS)                        */}
      {/* ========================================================================= */}
      <section className="pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#A6634E] mb-2.5">
            CHRONICLES OF UNHURRIED DEVOTION
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#2B1D19] font-normal tracking-tight mb-3">
            Chronicles of Unhurried Devotion
          </h2>
          <p className="text-[#6E5C56] text-xs sm:text-sm leading-relaxed">
            Authentic stories from patrons who celebrate their transformation inside our private treatment chambers.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {filteredReviews.map((rev) => {
            const isLiked = likedCards[rev.id];
            return (
              <div 
                key={rev.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EDE1D8] shadow-[0_10px_30px_-8px_rgba(74,50,43,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(74,50,43,0.12)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Rating & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#B8735C] text-[#B8735C]" />
                      ))}
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#A6634E] px-2 py-0.5 rounded-full bg-[#FAF0EB] border border-[#E8D4CA]">
                      VERIFIED GUEST
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg text-[#2B1D19] font-medium mb-3 leading-snug">
                    {rev.title}
                  </h3>

                  {/* Review text */}
                  <p className="text-xs text-[#6E5C56] leading-relaxed mb-6">
                    {rev.text}
                  </p>
                </div>

                {/* Author & Tag Footer */}
                <div className="border-t border-[#F3E6DF] pt-4 flex items-center justify-between">
                  <div>
                    <div className="font-serif font-bold text-xs text-[#2B1D19]">
                      {rev.author}
                    </div>
                    <div className="text-[10px] text-[#8E756C]">
                      {rev.role}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleLike(rev.id)}
                      className={`p-1.5 rounded-full text-[10px] transition-colors ${
                        isLiked ? 'text-[#B8735C] bg-[#FAF0EB]' : 'text-[#A6938A] hover:text-[#B8735C]'
                      }`}
                      title="Mark helpful"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>

                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#543830] px-2.5 py-1 rounded-full bg-[#F3E6DF] border border-[#E5D2C7]">
                      {rev.tag}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 6. CALL TO ACTION BANNER                                                  */}
      {/* ========================================================================= */}
      <section className="pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-[#2A1D19] rounded-3xl sm:rounded-[36px] p-8 sm:p-14 md:p-16 text-white text-center relative overflow-hidden shadow-2xl">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B8735C]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#B8735C]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            
            {/* Tag */}
            <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#E5C492]">
              AUTUMN & WINTER SANCTUARY RESERVATIONS
            </span>

            {/* Title */}
            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-white">
              Ready to Experience Your Own{' '}
              <span className="italic font-accent text-[#E5C492]">
                Transformation?
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-[#E2CCC0] text-xs sm:text-sm md:text-[15px] leading-relaxed max-w-lg mx-auto">
              Reserve your unhurried private atelier suite at 180 Kent Street with founder Janki Patel and senior dermal specialists.
            </p>

            {/* Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                to="/book-appointment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#B8735C] hover:bg-[#A3604A] text-white text-xs font-bold uppercase tracking-[0.16em] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>BOOK BESPOKE APPOINTMENT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>EXPLORE DETAILS</span>
              </Link>
            </div>

            {/* Guarantees */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-[10px] sm:text-[11px] font-semibold text-[#E2CCC0]/80 uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#E5C492]" />
                Complimentary Valet Parking
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#E5C492]" />
                Single-Occupancy Privacy Guarantee
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#E5C492]" />
                Zero Cancellation Fee (48h Notice)
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. WRITE A REVIEW MODAL                                                  */}
      {/* ========================================================================= */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FAF5EE] border border-[#E2CCC0] w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            
            <button
              onClick={() => setReviewModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EFE0D7] text-[#543830] flex items-center justify-center hover:bg-[#E2CCC0] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {submittedReview ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#B8735C] text-white flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl text-[#2B1D19]">Review Published</h3>
                <p className="text-xs sm:text-sm text-[#6E5C56]">
                  Thank you, <strong>{newReview.name || 'Valued Guest'}</strong>. Your reflection has been published to our guest chronicles.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A6634E] block mb-1">
                    GUEST CHRONICLE SUBMISSION
                  </span>
                  <h3 className="font-serif text-2xl text-[#2B1D19]">
                    Share Your Atelier Experience
                  </h3>
                </div>

                <form onSubmit={handleAddReviewSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="review-name" className="block text-[10px] font-bold uppercase tracking-wider text-[#543830] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        id="review-name"
                        type="text"
                        required
                        placeholder="e.g. Geneviève Moreau"
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DDC4B8] text-xs text-[#2B1D19] focus:outline-none focus:border-[#B8735C]"
                      />
                    </div>

                    <div>
                      <label htmlFor="review-role" className="block text-[10px] font-bold uppercase tracking-wider text-[#543830] mb-1">
                        Profession / Role
                      </label>
                      <input
                        id="review-role"
                        type="text"
                        placeholder="e.g. Architect · Ottawa"
                        value={newReview.role}
                        onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DDC4B8] text-xs text-[#2B1D19] focus:outline-none focus:border-[#B8735C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="review-title" className="block text-[10px] font-bold uppercase tracking-wider text-[#543830] mb-1">
                      Headline / Title *
                    </label>
                    <input
                      id="review-title"
                      type="text"
                      required
                      placeholder="e.g. Unsurpassed Cellular Precision"
                      value={newReview.title}
                      onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DDC4B8] text-xs text-[#2B1D19] focus:outline-none focus:border-[#B8735C]"
                    />
                  </div>

                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#543830] mb-1">
                      Rating
                    </span>
                    <div className="flex items-center gap-1 py-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          aria-label={`Rate ${star} stars out of 5`}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="p-1 cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newReview.rating
                                ? 'fill-[#B8735C] text-[#B8735C]'
                                : 'text-[#DDC4B8]'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="review-comment" className="block text-[10px] font-bold uppercase tracking-wider text-[#543830] mb-1">
                      Your Reflections *
                    </label>
                    <textarea
                      id="review-comment"
                      rows={3}
                      required
                      placeholder="Share details of your facial, balayage, or private suite experience..."
                      value={newReview.text}
                      onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-white border border-[#DDC4B8] text-xs text-[#2B1D19] focus:outline-none focus:border-[#B8735C] resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setReviewModalOpen(false)}
                      className="px-5 py-2.5 rounded-full text-xs font-bold text-[#6E5C56] hover:bg-[#EFE0D7] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-[#B8735C] hover:bg-[#A3604A] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all"
                    >
                      Publish Review
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
