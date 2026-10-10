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
    service: 'Cellular Facials',
    rating: 5,
    text: ''
  });

  // Filter Categories
  const categories = [
    'ALL REVIEWS',
    'CELLULAR FACIALS',
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
      setNewReview({ name: '', title: '', role: '', service: 'Cellular Facials', rating: 5, text: '' });
    }, 2000);
  };

  const filteredReviews = activeCategory === 'ALL REVIEWS'
    ? reviewsList
    : reviewsList.filter(r => {
        const cat = (r.serviceCategory || r.category || '').toUpperCase();
        const srv = (r.service || '').toUpperCase();
        const text = (r.review || r.text || '').toUpperCase();

        if (activeCategory === 'CELLULAR FACIALS') return cat.includes('FACIAL') || srv.includes('FACIAL') || text.includes('FACIAL');
        if (activeCategory === 'PARISIAN BALAYAGE & CUT') return cat.includes('HAIR') || srv.includes('BALAYAGE') || srv.includes('CUT') || text.includes('BALAYAGE');
        if (activeCategory === 'BRIDAL PRIVÉ RITUALS') return cat.includes('BRIDAL') || cat.includes('HENNA') || srv.includes('BRIDAL');
        if (activeCategory === 'DERMAL SKIN PROTOCOLS') return cat.includes('FACIAL') || text.includes('SKIN');
        if (activeCategory === 'THREADING & LASHES') return cat.includes('THREADING') || cat.includes('LASH') || srv.includes('THREADING');
        return true;
      });

  return (
    <div id="reviews" className="w-full bg-[#F7F4ED] text-[#10110F] font-sans antialiased selection:bg-[#263D2B] selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO HEADER                                                           */}
      {/* ========================================================================= */}
      <section className="pt-20 sm:pt-28 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <ScrollReveal stagger={true}>
          {/* Top Tag Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[#10110F] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] mb-6 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
            <span>GLAM GIRL BY JANKI · GUEST EXPERIENCES & REVIEWS</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#10110F] font-normal tracking-tight leading-[1.15] mb-5">
            Words of{' '}
            <span className="italic font-normal text-[#263D2B]">
              Radiance
            </span>{' '}
            & Reverence.
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-[#6B7068] text-xs sm:text-sm md:text-[15px] leading-relaxed mb-8">
            Unfiltered reflections from our discerning clientele who have stepped inside our single-guest sanctuary to experience bespoke treatments and restorative beauty.
          </p>

          {/* 3 Pill Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#10110F]">
            <div className="px-4 py-2 rounded-full bg-white border border-[#DCE1D8] flex items-center gap-2">
              <Star className="w-3.5 h-3.5 fill-[#263D2B] text-[#263D2B]" />
              <span>5.0 VERIFIED OVERALL RATING (320+ REVIEWS)</span>
            </div>

            <div className="px-4 py-2 rounded-full bg-white border border-[#DCE1D8] flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>100% DISCREET SINGLE-OCCUPANCY PRIVACY</span>
            </div>

            <div className="px-4 py-2 rounded-full bg-white border border-[#DCE1D8] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>OTTAWA'S LEADING BEAUTY ATELIER</span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 2. METRICS & TRUST STATS BAR (4 COLUMNS)                                 */}
      {/* ========================================================================= */}
      <section className="pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <ScrollReveal className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-md grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-[#DCE1D8]">
          
          {/* Stat 1 */}
          <div className="px-2 space-y-1">
            <div className="flex justify-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#263D2B] text-[#263D2B]" />
              ))}
            </div>
            <div className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
              5.0 / 5.0
            </div>
            <div className="text-[11px] font-bold text-[#10110F] uppercase tracking-wider">
              Impeccable Rating
            </div>
            <div className="text-[10px] text-[#6B7068]">Across 320+ certified submissions</div>
          </div>

          {/* Stat 2 */}
          <div className="px-2 space-y-1">
            <div className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
              99.4%
            </div>
            <div className="text-[11px] font-bold text-[#10110F] uppercase tracking-wider">
              Rebooking Loyalty
            </div>
            <div className="text-[10px] text-[#6B7068]">Discreet repeat patron rate</div>
          </div>

          {/* Stat 3 */}
          <div className="px-2 space-y-1">
            <div className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
              12+ Yrs
            </div>
            <div className="text-[11px] font-bold text-[#10110F] uppercase tracking-wider">
              Master Pedigree
            </div>
            <div className="text-[10px] text-[#6B7068]">Master aesthetician expression</div>
          </div>

          {/* Stat 4 */}
          <div className="px-2 space-y-1">
            <div className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
              01 Private Suite
            </div>
            <div className="text-[11px] font-bold text-[#10110F] uppercase tracking-wider">
              Acoustic Privé Chambers
            </div>
            <div className="text-[10px] text-[#6B7068]">Zero guest overlap guaranteed</div>
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
                    ? 'bg-[#263D2B] text-white shadow-sm border border-[#263D2B]'
                    : 'bg-white text-[#10110F] border border-[#DCE1D8] hover:border-[#263D2B]'
                }`}
              >
                {cat}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setReviewModalOpen(true)}
            className="group relative px-5 py-2.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] bg-[#263D2B] text-white shadow-sm transition-all duration-300 hover:bg-[#17261B] hover:shadow-md hover:shadow-[#263D2B]/35 hover:-translate-y-0.5 active:scale-98 cursor-pointer flex items-center gap-1.5 flex-shrink-0 overflow-hidden"
          >
            <PlusCircle className="w-3.5 h-3.5 relative z-10" />
            <span className="relative z-10">WRITE A REVIEW</span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FEATURED GUEST CHRONICLE SPOTLIGHT CARD                                */}
      {/* ========================================================================= */}
      <section className="pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 border border-[#DCE1D8] shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 lg:gap-12 items-center">
            
            {/* Left Photo with Overlay */}
            <div className="md:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-4 border-[#F7F4ED] shadow-md bg-[#F7F4ED]">
                <img
                  src="/facial-atelier-clean.jpg"
                  alt="Featured Treatment Session at Glam Girl Atelier"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-white">
                  OTTAWA WOMEN'S STUDIO
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-bold text-[#10110F] flex items-center gap-1">
                  <Star className="w-3 h-3 fill-[#263D2B] text-[#263D2B]" />
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
                    <Star key={i} className="w-4 h-4 fill-[#263D2B] text-[#263D2B]" />
                  ))}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B]">
                  FEATURED GUEST CHRONICLE
                </span>
              </div>

              {/* Quote */}
              <p className="font-serif italic text-base sm:text-xl md:text-2xl text-[#10110F] leading-relaxed">
                "From the welcoming private appointment atmosphere to the bespoke botanical facial infusion, Janki has crafted something completely transcendent in Ottawa. My skin has never held such effortless, healthy luminosity."
              </p>

              {/* Patron Info & Tag */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-t border-[#DCE1D8]">
                <div>
                  <div className="font-serif font-bold text-sm sm:text-base text-[#10110F]">
                    Geneviève Moreau
                  </div>
                  <div className="text-[11px] text-[#6B7068]">
                    Ottawa Flagship Patron
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[10px] font-bold text-[#10110F] uppercase tracking-wider flex-shrink-0">
                  <Sparkles className="w-3 h-3 text-[#263D2B]" />
                  <span>Cellular Lift & Facial (90 Min)</span>
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
          <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#263D2B] mb-2.5">
            CHRONICLES OF UNHURRIED DEVOTION
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#10110F] font-normal tracking-tight mb-3">
            Chronicles of Unhurried Devotion
          </h2>
          <p className="text-[#6B7068] text-xs sm:text-sm leading-relaxed">
            Authentic stories from patrons who celebrate their transformation inside our private treatment chambers.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {filteredReviews.map((rev) => {
            return (
              <div 
                key={rev.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DCE1D8] shadow-xs hover:shadow-md hover:border-[#263D2B] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Rating & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#263D2B] text-[#263D2B]" />
                      ))}
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#10110F] px-2 py-0.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8]">
                      VERIFIED GUEST
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg text-[#10110F] font-normal mb-3 leading-snug">
                    {rev.title || rev.service || 'Exceptional Salon Care'}
                  </h3>

                  {/* Review text */}
                  <p className="text-xs text-[#6B7068] leading-relaxed mb-6">
                    {rev.review || rev.text}
                  </p>
                </div>

                {/* Author & Tag Footer */}
                <div className="border-t border-[#DCE1D8] pt-4 flex items-center justify-between">
                  <div>
                    <div className="font-serif font-bold text-xs text-[#10110F]">
                      {rev.customerName || rev.author || 'Glam Girl Guest'}
                    </div>
                    <div className="text-[10px] text-[#6B7068]">
                      {rev.role || 'Verified Customer'}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleLike(rev.id)}
                      className="p-1.5 rounded-full text-[10px] transition-colors text-[#6B7068] hover:text-[#263D2B] cursor-pointer"
                      title="Mark helpful"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>

                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#10110F] px-2.5 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8]">
                      {rev.service || rev.tag || 'Treatment'}
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
        <div className="bg-white rounded-3xl sm:rounded-[36px] p-8 sm:p-14 md:p-16 text-[#10110F] text-center relative overflow-hidden shadow-lg border border-[#DCE1D8]">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#263D2B]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#263D2B]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            
            {/* Tag */}
            <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
              SANCTUARY RESERVATIONS
            </span>

            {/* Title */}
            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#10110F]">
              Ready to Experience Your Own{' '}
              <span className="italic font-normal text-[#263D2B]">
                Transformation?
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-[#6B7068] text-xs sm:text-sm md:text-[15px] leading-relaxed max-w-lg mx-auto">
              Reserve your unhurried private atelier appointment in Ottawa with founder Janki Khatroja and senior specialists.
            </p>

            {/* Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/book-appointment"
                className="global-button flex items-center justify-center gap-2"
              >
                <span>BOOK BESPOKE APPOINTMENT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/services"
                className="global-button-secondary btn-luxury-arrow flex items-center justify-center"
              >
                <span>EXPLORE DETAILS</span>
                <span className="arrow-symbol">→</span>
              </Link>
            </div>

            {/* Guarantees */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-[10px] sm:text-[11px] font-semibold text-[#6B7068] uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#263D2B]" />
                Dedicated Private Parking
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#263D2B]" />
                Single-Occupancy Privacy Guarantee
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#263D2B]" />
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
          <div className="bg-white border border-[#DCE1D8] w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl p-5 sm:p-8 shadow-2xl relative">
            
            <button
              onClick={() => setReviewModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F7F4ED] text-[#10110F] flex items-center justify-center hover:bg-[#DCE1D8] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {submittedReview ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#263D2B] text-white flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl text-[#10110F]">Review Published</h3>
                <p className="text-xs sm:text-sm text-[#6B7068]">
                  Thank you, <strong>{newReview.name || 'Valued Guest'}</strong>. Your reflection has been published to our guest chronicles.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block mb-1">
                    GUEST CHRONICLE SUBMISSION
                  </span>
                  <h3 className="font-serif text-2xl text-[#10110F]">
                    Share Your Atelier Experience
                  </h3>
                </div>

                <form onSubmit={handleAddReviewSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="review-name" className="block text-[10px] font-bold uppercase tracking-wider text-[#10110F] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        id="review-name"
                        type="text"
                        required
                        placeholder="e.g. Geneviève Moreau"
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                      />
                    </div>

                    <div>
                      <label htmlFor="review-role" className="block text-[10px] font-bold uppercase tracking-wider text-[#10110F] mb-1">
                        Profession / Role
                      </label>
                      <input
                        id="review-role"
                        type="text"
                        placeholder="e.g. Architect · Ottawa"
                        value={newReview.role}
                        onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="review-title" className="block text-[10px] font-bold uppercase tracking-wider text-[#10110F] mb-1">
                      Headline / Title *
                    </label>
                    <input
                      id="review-title"
                      type="text"
                      required
                      placeholder="e.g. Unsurpassed Cellular Precision"
                      value={newReview.title}
                      onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                    />
                  </div>

                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#10110F] mb-1">
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
                                ? 'fill-[#263D2B] text-[#263D2B]'
                                : 'text-[#DCE1D8]'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="review-comment" className="block text-[10px] font-bold uppercase tracking-wider text-[#10110F] mb-1">
                      Your Reflections *
                    </label>
                    <textarea
                      id="review-comment"
                      rows={3}
                      required
                      placeholder="Share details of your facial, balayage, or private suite experience..."
                      value={newReview.text}
                      onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B] resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setReviewModalOpen(false)}
                      className="px-5 py-2.5 rounded-full text-xs font-bold text-[#6B7068] hover:bg-[#F7F4ED] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-[#263D2B] hover:bg-[#1C2E20] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
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
