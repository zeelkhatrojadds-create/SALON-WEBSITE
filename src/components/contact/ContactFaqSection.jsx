import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  X, 
  Plus, 
  Minus, 
  HelpCircle, 
  Sparkles, 
  Calendar, 
  MessageCircle, 
  ArrowRight,
  ShieldCheck,
  Lock,
  ChevronRight,
  Clock,
  Tag,
  Scissors,
  CheckCircle2,
  Phone
} from 'lucide-react';
import { FAQ_CATEGORIES } from '../../data/faqData';
import salonDB from '../../db/salonDatabase';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

export default function ContactFaqSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState(() => new Set([1])); // First question open by default

  // Live dynamic data state from Unified Salon Database
  const [faqs, setFaqs] = useState(() => salonDB.getFaqs(false));
  const [services, setServices] = useState(() => salonDB.getServices());
  const [festivalOffers, setFestivalOffers] = useState(() => salonDB.getPublicFestivalOffers());

  useEffect(() => {
    // Subscribe to live DB updates (e.g. if services, festival offers, or FAQs are updated in admin)
    const syncData = () => {
      setFaqs(salonDB.getFaqs(false));
      setServices(salonDB.getServices());
      setFestivalOffers(salonDB.getPublicFestivalOffers());
    };

    syncData();
    const unsubscribe = salonDB.subscribe(syncData);
    return () => unsubscribe();
  }, []);

  // Toggle individual question in accordion
  const toggleFaq = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Expand all or Collapse all helper
  const expandAll = () => {
    setOpenIds(new Set(filteredFaqs.map((f) => f.id)));
  };

  const collapseAll = () => {
    setOpenIds(new Set());
  };

  // Filtered FAQs based on category + search query
  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return faqs.filter((faq) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || faq.category === selectedCategory;

      // Search keyword filter
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.categoryLabel?.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [faqs, selectedCategory, searchQuery]);

  // Group filtered FAQs by category when "all" is active and no search query
  const isGroupedView = selectedCategory === 'all' && !searchQuery.trim();

  // Category sections for grouped view
  const categorySections = [
    { id: 'booking', label: 'Booking Appointments & New Services' },
    { id: 'services', label: 'Services Overview' },
    { id: 'hair', label: 'Hair Care & Styling' },
    { id: 'facials', label: 'Facials & Skincare Treatments' },
    { id: 'makeup', label: 'Makeup & Bridal Packages' },
    { id: 'nails', label: 'Nail Treatments & Grooming' },
    { id: 'waxing', label: 'Waxing & Body Grooming' },
    { id: 'spa', label: 'Spa & Holistic Body Treatments' },
    { id: 'payments', label: 'Pricing & Treatment Durations' },
    { id: 'offers', label: 'Festival Offers & Promotional Packages' },
    { id: 'preparation', label: 'Before Your Appointment' },
    { id: 'aftercare', label: 'Aftercare and Support' },
    { id: 'privacy', label: 'Privacy Policy' },
  ];

  // Helper to locate live service from catalog
  const getLinkedService = (serviceId) => {
    if (!serviceId) return null;
    return services.find((s) => s.id === serviceId || s.slug === serviceId) || null;
  };

  // Featured services for dynamic display
  const featuredNewServices = useMemo(() => {
    return services.slice(0, 4);
  }, [services]);

  return (
    <section 
      id="faqs" 
      aria-label="Frequently Asked Questions"
      className="w-full bg-[#F7F4ED] text-[#10110F] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#DCE1D8] scroll-mt-24"
    >
      <div className="max-w-[1000px] mx-auto">

        {/* ========================================================================= */}
        {/* 1. SECTION HEADER                                                         */}
        {/* ========================================================================= */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[#263D2B] text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.24em] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
            <span>KNOWLEDGE BASE &amp; ADVICE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
            Frequently Asked Questions
          </h2>

          <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto italic">
            &ldquo;Everything you need to know before your visit to GLAM GIRL BY JANKI.&rdquo;
          </p>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 2. SEARCH INPUT & CATEGORY FILTER GRID                                    */}
        {/* ========================================================================= */}
        <div className="mb-10 sm:mb-14">
          
          {/* Search Bar */}
          <div className="relative w-full mx-auto group">
            <div className="relative flex items-center w-full h-[54px] bg-white rounded-[14px] border border-[#DCE1D8] transition-all duration-200 shadow-xs focus-within:border-[#263D2B] focus-within:ring-2 focus-within:ring-[#263D2B]/20 focus-within:shadow-sm">
              <div className="flex items-center justify-center pl-4 sm:pl-5 pr-2.5 pointer-events-none text-[#6B7068] group-focus-within:text-[#263D2B] transition-colors">
                <Search className="w-5 h-5 stroke-[2]" />
              </div>

              <input
                type="text"
                id="contact-faq-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions, services, prices, and bookings..."
                className="w-full h-full bg-transparent pr-12 text-xs sm:text-sm md:text-[15px] text-[#10110F] placeholder-[#6B7068]/70 focus:outline-none font-sans"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#F7F4ED] hover:bg-[#DCE1D8] text-[#10110F] flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#263D2B]"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills Container */}
          <div className="mt-5 w-full mx-auto space-y-3">
            
            {/* "All Questions" Master Button */}
            <div className="flex justify-center">
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategory === 'all'}
                onClick={() => setSelectedCategory('all')}
                className={`h-[46px] w-full max-w-[280px] sm:max-w-[320px] px-6 rounded-[14px] text-[13px] sm:text-[14px] font-medium inline-flex items-center justify-center gap-2 border transition-all duration-200 cursor-pointer group shadow-xs ${
                  selectedCategory === 'all'
                    ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-sm'
                    : 'bg-white text-[#10110F] border-[#DCE1D8] hover:bg-[#F7F4ED] hover:border-[#A8B5A0]'
                }`}
              >
                {selectedCategory === 'all' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8B5A0] flex-shrink-0" />
                )}
                <span>All Questions</span>
                <span
                  className={`text-[12px] font-normal transition-colors ml-1 ${
                    selectedCategory === 'all' ? 'text-[#A8B5A0]' : 'text-[#6B7068] group-hover:text-[#465640]'
                  }`}
                >
                  ({faqs.length})
                </span>
              </button>
            </div>

            {/* Category Grid */}
            <div
              className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 min-[1000px]:grid-cols-4 gap-[10px] w-full"
              role="tablist"
              aria-label="FAQ categories filter"
            >
              {FAQ_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count = faqs.filter((f) => f.category === cat.id).length;
                const isPrivacy = cat.id === 'privacy';

                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`h-[44px] w-full px-3 sm:px-3.5 rounded-[12px] text-[12.5px] sm:text-[13px] font-medium inline-flex items-center justify-center gap-1.5 border transition-all duration-200 cursor-pointer group text-center shadow-xs ${
                      isActive
                        ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-sm'
                        : 'bg-white text-[#10110F] border-[#DCE1D8] hover:bg-[#F7F4ED] hover:border-[#A8B5A0]'
                    }`}
                  >
                    {isActive && !isPrivacy && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A8B5A0] flex-shrink-0" />
                    )}
                    {isPrivacy && (
                      <ShieldCheck className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-[#A8B5A0]' : 'text-[#263D2B] group-hover:text-[#10110F]'}`} />
                    )}
                    <span className="truncate">{cat.label}</span>
                    <span
                      className={`text-[11.5px] font-normal transition-colors ml-0.5 flex-shrink-0 ${
                        isActive ? 'text-[#A8B5A0]' : 'text-[#6B7068] group-hover:text-[#465640]'
                      }`}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Results counter & expand/collapse actions */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-2 text-xs text-[#6B7068]">
              <span className="font-normal">
                Showing <strong className="text-[#10110F] font-semibold">{filteredFaqs.length}</strong> {filteredFaqs.length === 1 ? 'question' : 'questions'}
                {selectedCategory !== 'all' && (
                  <span> in <span className="text-[#263D2B] font-medium">{FAQ_CATEGORIES.find((c) => c.id === selectedCategory)?.label}</span></span>
                )}
                {searchQuery && (
                  <span> matching &ldquo;<span className="text-[#263D2B] font-semibold">{searchQuery}</span>&rdquo;</span>
                )}
              </span>

              {filteredFaqs.length > 0 && (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={expandAll}
                    className="hover:text-[#263D2B] font-medium transition-colors cursor-pointer text-[11px] uppercase tracking-wider underline underline-offset-4"
                  >
                    Expand All
                  </button>
                  <span className="text-[#DCE1D8]">•</span>
                  <button
                    type="button"
                    onClick={collapseAll}
                    className="hover:text-[#263D2B] font-medium transition-colors cursor-pointer text-[11px] uppercase tracking-wider underline underline-offset-4"
                  >
                    Collapse All
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. ACCORDION FAQ SECTION                                                  */}
        {/* ========================================================================= */}
        <div className="mb-14 sm:mb-16">
          {filteredFaqs.length === 0 ? (
            /* Empty Search Message */
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#DCE1D8] text-center space-y-4 shadow-sm max-w-md mx-auto">
              <div className="w-14 h-14 rounded-full bg-[#F7F4ED] text-[#263D2B] border border-[#DCE1D8] flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal">
                No matching questions found
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed">
                We couldn&apos;t find any questions matching &ldquo;{searchQuery}&rdquo;. Try searching for &ldquo;balayage&rdquo;, &ldquo;facial&rdquo;, &ldquo;bridal&rdquo;, or &ldquo;prices&rdquo;.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="global-button !px-6 !py-2.5 !text-xs text-white cursor-pointer"
                >
                  CLEAR FILTERS &amp; VIEW ALL
                </button>
              </div>
            </div>
          ) : isGroupedView ? (
            /* Grouped by Category View */
            <div className="space-y-10 sm:space-y-12">
              {categorySections.map((sec) => {
                const secFaqs = filteredFaqs.filter((f) => f.category === sec.id);
                if (secFaqs.length === 0) return null;

                return (
                  <div key={sec.id} className="space-y-4">
                    {/* Category Header */}
                    <div className="flex items-center gap-3 pb-2 border-b border-[#DCE1D8]">
                      {sec.id === 'privacy' ? (
                        <ShieldCheck className="w-5 h-5 text-[#263D2B] flex-shrink-0" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-[#263D2B] flex-shrink-0" />
                      )}
                      <h3 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal tracking-tight">
                        {sec.label}
                      </h3>
                      <span className="text-xs text-[#6B7068] ml-auto font-mono">
                        ({secFaqs.length})
                      </span>
                    </div>

                    {sec.id === 'privacy' && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DCE1D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#F7F4ED] text-[#263D2B] flex items-center justify-center flex-shrink-0 border border-[#DCE1D8]">
                            <Lock className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-serif text-sm text-[#10110F] font-medium block">Client Confidentiality &amp; Privacy Protocol</span>
                            <span className="text-[11px] text-[#6B7068]">Read our dedicated policy on personal data, local storage, and client protection.</span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2 sm:pt-0 w-full sm:w-auto shrink-0">
                          <Link
                            to="/privacy-policy"
                            className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-[#263D2B] hover:bg-[#1C2E20] text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer text-center"
                          >
                            <span>Read Full Privacy Policy</span>
                            <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                          </Link>
                          <Link
                            to="/terms-and-conditions"
                            className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-[#DCE1D8] bg-[#F7F4ED] hover:bg-[#DCE1D8] text-[#10110F] text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center justify-center text-center cursor-pointer"
                          >
                            Terms &amp; Conditions
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Accordion Items for this Category */}
                    <div className="space-y-3">
                      {secFaqs.map((faq) => {
                        const isOpen = openIds.has(faq.id);
                        const linkedSrv = getLinkedService(faq.serviceId);

                        return (
                          <div
                            key={faq.id}
                            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                              isOpen
                                ? 'bg-white border-[#263D2B] shadow-md'
                                : 'bg-white/80 hover:bg-white border-[#DCE1D8] hover:border-[#A8B5A0] shadow-xs'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => toggleFaq(faq.id)}
                              aria-expanded={isOpen}
                              aria-controls={`faq-contact-answer-${faq.id}`}
                              id={`faq-contact-question-${faq.id}`}
                              className="w-full min-h-[56px] py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#263D2B] focus-visible:outline-offset-2 transition-colors group"
                            >
                              <span
                                className={`font-serif text-base sm:text-lg leading-snug transition-colors ${
                                  isOpen
                                    ? 'text-[#263D2B] font-medium'
                                    : 'text-[#10110F] group-hover:text-[#263D2B]'
                                }`}
                              >
                                {faq.question}
                              </span>
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                  isOpen
                                    ? 'bg-[#263D2B] text-white rotate-0'
                                    : 'bg-[#F7F4ED] text-[#263D2B] group-hover:bg-[#263D2B] group-hover:text-white'
                                }`}
                                aria-hidden="true"
                              >
                                {isOpen ? (
                                  <Minus className="w-4 h-4 stroke-[2.5]" />
                                ) : (
                                  <Plus className="w-4 h-4 stroke-[2.5]" />
                                )}
                              </div>
                            </button>

                            {/* Accordion Content */}
                            <div
                              id={`faq-contact-answer-${faq.id}`}
                              role="region"
                              aria-labelledby={`faq-contact-question-${faq.id}`}
                              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                                isOpen
                                  ? 'grid-rows-[1fr] opacity-100 border-t border-[#DCE1D8]/70'
                                  : 'grid-rows-[0fr] opacity-0'
                              }`}
                            >
                              <div className="overflow-hidden">
                                <div className="px-5 sm:px-6 py-4 sm:py-5 text-xs sm:text-sm text-[#6B7068] leading-relaxed font-light space-y-4">
                                  <p>{faq.answer}</p>

                                  {/* Dynamic Linked Service Card (Price & Duration from Live DB) */}
                                  {linkedSrv && (
                                    <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                                      <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] bg-white px-2 py-0.5 rounded-full border border-[#DCE1D8]">
                                            {linkedSrv.categoryName || 'Treatment'}
                                          </span>
                                          <span className="text-[11px] text-[#6B7068] flex items-center gap-1">
                                            <Clock className="w-3 h-3 text-[#263D2B]" />
                                            <span>{linkedSrv.duration}</span>
                                          </span>
                                        </div>
                                        <div className="font-serif text-sm sm:text-base text-[#10110F] font-normal">
                                          {linkedSrv.name}
                                        </div>
                                        <div className="text-[#263D2B] font-semibold text-xs">
                                          ${linkedSrv.price} CAD <span className="text-[11px] text-[#6B7068] font-light">(Transparent Studio Rate)</span>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto pt-2 sm:pt-0">
                                        <Link
                                          to={`/book-appointment?service=${linkedSrv.id}`}
                                          className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-[#263D2B] hover:bg-[#1C2E20] text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs cursor-pointer text-center"
                                        >
                                          <span>Book This Service</span>
                                          <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                                        </Link>
                                      </div>
                                    </div>
                                  )}

                                  {/* Dynamic Festival Offers Pill if marked */}
                                  {faq.isDynamicOffers && festivalOffers.length > 0 && (
                                    <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2">
                                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#263D2B]">
                                        <Tag className="w-3.5 h-3.5 text-[#263D2B]" />
                                        <span>Current Live Festival Packages ({festivalOffers.length} Active)</span>
                                      </div>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                                        {festivalOffers.slice(0, 2).map((offer) => (
                                          <div key={offer.id} className="p-3 bg-white rounded-xl border border-[#DCE1D8] space-y-1">
                                            <div className="font-serif text-xs text-[#10110F] font-medium">{offer.festivalName || offer.title}</div>
                                            <div className="text-[11px] text-[#263D2B] font-semibold">
                                              Special: ${offer.discountedPrice} CAD{' '}
                                              <span className="line-through text-[#6B7068] font-normal">${offer.originalPrice} CAD</span>
                                            </div>
                                            {offer.couponCode && (
                                              <div className="text-[10px] text-[#465640] font-mono bg-[#F7F4ED] px-2 py-0.5 rounded inline-block">
                                                Code: {offer.couponCode}
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Dynamic Services List if marked */}
                                  {faq.isDynamicServices && (
                                    <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2.5">
                                      <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B]">
                                          Featured Master Treatments ({services.length} Total in Atelier)
                                        </span>
                                        <Link to="/price-list" className="text-[11px] text-[#263D2B] underline hover:text-[#10110F]">
                                          View Full Price List
                                        </Link>
                                      </div>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {featuredNewServices.map((srv) => (
                                          <div key={srv.id} className="p-2.5 bg-white rounded-xl border border-[#DCE1D8] flex items-center justify-between text-xs">
                                            <div>
                                              <div className="font-medium text-[#10110F]">{srv.name}</div>
                                              <div className="text-[10px] text-[#6B7068]">{srv.duration} • ${srv.price} CAD</div>
                                            </div>
                                            <Link
                                              to={`/book-appointment?service=${srv.id}`}
                                              className="px-2.5 py-1 rounded-lg bg-[#263D2B] text-white text-[10px] font-bold uppercase tracking-wider hover:bg-[#1f3123]"
                                            >
                                              Book
                                            </Link>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Optional Direct Link Button */}
                                  {faq.serviceLink && !linkedSrv && (
                                    <div className="pt-2 w-full sm:w-auto">
                                      <Link
                                        to={faq.serviceLink}
                                        className={
                                          faq.linkText
                                            ? "w-full sm:w-auto px-4 py-2.5 rounded-full bg-[#263D2B] hover:bg-[#1C2E20] text-white text-[11px] font-bold uppercase tracking-wider flex sm:inline-flex items-center justify-center gap-2 shadow-xs cursor-pointer text-center"
                                            : "inline-flex items-center gap-1.5 text-xs font-semibold text-[#263D2B] hover:text-[#10110F] transition-colors uppercase tracking-wider"
                                        }
                                      >
                                        {faq.linkText && <ShieldCheck className="w-3.5 h-3.5 text-[#A8B5A0] flex-shrink-0" />}
                                        <span>{faq.linkText || 'Explore Booking & Details'}</span>
                                        <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                                      </Link>
                                    </div>
                                  )}

                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Filtered Flat List View */
            <div className="space-y-3">
              {filteredFaqs.map((faq) => {
                const isOpen = openIds.has(faq.id);
                const linkedSrv = getLinkedService(faq.serviceId);

                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'bg-white border-[#263D2B] shadow-md'
                        : 'bg-white/80 hover:bg-white border-[#DCE1D8] hover:border-[#A8B5A0] shadow-xs'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-contact-answer-${faq.id}`}
                      id={`faq-contact-question-${faq.id}`}
                      className="w-full min-h-[56px] py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#263D2B] focus-visible:outline-offset-2 transition-colors group"
                    >
                      <div className="space-y-1 min-w-0 pr-2">
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#263D2B] block">
                          {faq.categoryLabel || faq.category}
                        </span>
                        <span
                          className={`font-serif text-base sm:text-lg leading-snug block transition-colors ${
                            isOpen
                              ? 'text-[#263D2B] font-medium'
                              : 'text-[#10110F] group-hover:text-[#263D2B]'
                          }`}
                        >
                          {faq.question}
                        </span>
                      </div>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          isOpen
                            ? 'bg-[#263D2B] text-white rotate-0'
                            : 'bg-[#F7F4ED] text-[#263D2B] group-hover:bg-[#263D2B] group-hover:text-white'
                        }`}
                        aria-hidden="true"
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4 stroke-[2.5]" />
                        ) : (
                          <Plus className="w-4 h-4 stroke-[2.5]" />
                        )}
                      </div>
                    </button>

                    {/* Accordion Content */}
                    <div
                      id={`faq-contact-answer-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-contact-question-${faq.id}`}
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                        isOpen
                          ? 'grid-rows-[1fr] opacity-100 border-t border-[#DCE1D8]/70'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 sm:px-6 py-4 sm:py-5 text-xs sm:text-sm text-[#6B7068] leading-relaxed font-light space-y-4">
                          <p>{faq.answer}</p>

                          {/* Dynamic Linked Service Card */}
                          {linkedSrv && (
                            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] bg-white px-2 py-0.5 rounded-full border border-[#DCE1D8]">
                                    {linkedSrv.categoryName || 'Treatment'}
                                  </span>
                                  <span className="text-[11px] text-[#6B7068] flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-[#263D2B]" />
                                    <span>{linkedSrv.duration}</span>
                                  </span>
                                </div>
                                <div className="font-serif text-sm sm:text-base text-[#10110F] font-normal">
                                  {linkedSrv.name}
                                </div>
                                <div className="text-[#263D2B] font-semibold text-xs">
                                  ${linkedSrv.price} CAD <span className="text-[11px] text-[#6B7068] font-light">(Studio Rate)</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto pt-2 sm:pt-0">
                                <Link
                                  to={`/book-appointment?service=${linkedSrv.id}`}
                                  className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-[#263D2B] hover:bg-[#1C2E20] text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs cursor-pointer text-center"
                                >
                                  <span>Book This Service</span>
                                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                                </Link>
                              </div>
                            </div>
                          )}

                          {/* Direct Link Button */}
                          {faq.serviceLink && !linkedSrv && (
                            <div className="pt-2 w-full sm:w-auto">
                              <Link
                                to={faq.serviceLink}
                                className={
                                  faq.linkText
                                    ? "w-full sm:w-auto px-4 py-2.5 rounded-full bg-[#263D2B] hover:bg-[#1C2E20] text-white text-[11px] font-bold uppercase tracking-wider flex sm:inline-flex items-center justify-center gap-2 shadow-xs cursor-pointer text-center"
                                    : "inline-flex items-center gap-1.5 text-xs font-semibold text-[#263D2B] hover:text-[#10110F] transition-colors uppercase tracking-wider"
                                }
                              >
                                {faq.linkText && <ShieldCheck className="w-3.5 h-3.5 text-[#A8B5A0] flex-shrink-0" />}
                                <span>{faq.linkText || 'Explore Booking & Details'}</span>
                                <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                              </Link>
                            </div>
                          )}

                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 4. FINAL CONTACT ASSISTANCE PROMPT (FOR EXTRA HELP)                       */}
        {/* ========================================================================= */}
        <ScrollReveal className="bg-white rounded-3xl p-8 sm:p-10 md:p-12 border border-[#DCE1D8] shadow-sm text-center relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B]">
              <HelpCircle className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>STILL NEED ASSISTANCE?</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal tracking-tight">
              Have a Specific Question?
            </h3>

            <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed font-light">
              Can&apos;t find what you&apos;re looking for? Salon director Janki Patel and our team are here to help. Reach out directly or send us a message through the contact form above.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#contact"
                className="global-button-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 !px-7 !py-3 text-xs font-bold uppercase tracking-[0.14em] cursor-pointer"
              >
                <span>SEND MESSAGE ABOVE</span>
                <span className="arrow-symbol text-xs font-normal">↑</span>
              </a>

              <Link
                to="/book-appointment"
                className="global-button w-full sm:w-auto inline-flex items-center justify-center gap-2 !px-7 !py-3 text-xs font-bold uppercase tracking-[0.14em] shadow-xs cursor-pointer text-white"
              >
                <span>BOOK APPOINTMENT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="pt-3 border-t border-[#DCE1D8] flex flex-wrap items-center justify-center gap-3 text-[11px] text-[#6B7068]">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-[#263D2B]" />
                Call Concierge: <a href="tel:+16162550549" className="font-semibold text-[#10110F] hover:text-[#263D2B]">+1 (616) 255-0549</a>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#263D2B]" />
                Private Ottawa Atelier Suite
              </span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
