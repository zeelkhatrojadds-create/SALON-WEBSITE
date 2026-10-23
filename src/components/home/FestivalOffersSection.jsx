import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  Tag, 
  ArrowRight, 
  Check, 
  Info, 
  ShieldCheck, 
  Gift, 
  Flame,
  ChevronRight,
  X,
  HeartHandshake,
  Star
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

// Helper to compute countdown time parts safely
function calculateTimeRemaining(targetDateStr) {
  if (!targetDateStr) return null;
  const target = new Date(targetDateStr.includes('T') ? targetDateStr : `${targetDateStr}T23:59:59`);
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isPast: false };
}

// Live Countdown Timer Component with interval cleanup
function FestivalCountdownTimer({ offer }) {
  const isUpcoming = offer.status === 'Scheduled';
  const targetDate = isUpcoming ? `${offer.startDate}T00:00:00` : `${offer.endDate}T23:59:59`;
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeRemaining(targetDate));

  useEffect(() => {
    setTimeLeft(calculateTimeRemaining(targetDate));
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft || timeLeft.isPast) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10110F]/5 text-[#6B7068] text-[10.5px] font-bold">
        <Clock className="w-3 h-3 text-[#6B7068]" />
        <span>Offer Concluding Soon</span>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#6B7068]">
        <Clock className="w-3 h-3 text-[#263D2B]" />
        <span>{isUpcoming ? 'Celebration Starts In:' : 'Festive Offer Ends In:'}</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5 text-center font-mono">
        <div className="bg-[#F7F4ED] border border-[#DCE1D8] px-2 py-1 rounded-lg">
          <span className="block text-xs font-bold text-[#10110F]">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="block text-[8px] uppercase tracking-wider text-[#6B7068]">Days</span>
        </div>
        <div className="bg-[#F7F4ED] border border-[#DCE1D8] px-2 py-1 rounded-lg">
          <span className="block text-xs font-bold text-[#10110F]">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="block text-[8px] uppercase tracking-wider text-[#6B7068]">Hours</span>
        </div>
        <div className="bg-[#F7F4ED] border border-[#DCE1D8] px-2 py-1 rounded-lg">
          <span className="block text-xs font-bold text-[#10110F]">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="block text-[8px] uppercase tracking-wider text-[#6B7068]">Mins</span>
        </div>
        <div className="bg-[#F7F4ED] border border-[#DCE1D8] px-2 py-1 rounded-lg">
          <span className="block text-xs font-bold text-[#263D2B]">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="block text-[8px] uppercase tracking-wider text-[#6B7068]">Secs</span>
        </div>
      </div>
    </div>
  );
}

export default function FestivalOffersSection() {
  const [offers, setOffers] = useState(() => salonDB.getPublicFestivalOffers());
  const [selectedOfferForModal, setSelectedOfferForModal] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const syncOffers = () => {
      setOffers(salonDB.getPublicFestivalOffers());
    };
    syncOffers();
    const unsub = salonDB.subscribe(syncOffers);
    return () => unsub();
  }, []);

  // Filter tabs
  const filteredOffers = offers.filter((o) => {
    if (activeFilter === 'active') return o.status === 'Active';
    if (activeFilter === 'upcoming') return o.status === 'Scheduled';
    return true;
  });

  return (
    <section id="festival-offers" className="w-full relative py-14 sm:py-20 lg:py-24 bg-[#F7F4ED] border-t border-[#DCE1D8] overflow-hidden text-[#10110F]">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#263D2B]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#465640]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER (Playfair Display + DM Sans, Forest Green Theme)        */}
        {/* ========================================================================= */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4" stagger={true}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE1D8] text-[#263D2B] text-xs font-bold uppercase tracking-[0.22em] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>CELEBRATE YOUR GLOW</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-tight">
            Festival Beauty Offers
          </h2>

          <p className="text-[#6B7068] text-sm sm:text-base leading-relaxed font-body font-light max-w-2xl mx-auto">
            Celebrate every special occasion with exclusive beauty treatments and seasonal offers designed just for you.
          </p>

          {/* Interactive Status Filter Pills (Only if offers exist) */}
          {offers.length > 0 && (
            <div className="pt-2 flex items-center justify-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-[#263D2B] text-white shadow-xs'
                    : 'bg-white border border-[#DCE1D8] text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED]'
                }`}
              >
                All Festive Offers ({offers.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('active')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === 'active'
                    ? 'bg-[#263D2B] text-white shadow-xs'
                    : 'bg-white border border-[#DCE1D8] text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED]'
                }`}
              >
                Current Celebrations ({offers.filter(o => o.status === 'Active').length})
              </button>
              {offers.some(o => o.status === 'Scheduled') && (
                <button
                  type="button"
                  onClick={() => setActiveFilter('upcoming')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeFilter === 'upcoming'
                      ? 'bg-[#263D2B] text-white shadow-xs'
                      : 'bg-white border border-[#DCE1D8] text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED]'
                  }`}
                >
                  Upcoming Festivals ({offers.filter(o => o.status === 'Scheduled').length})
                </button>
              )}
            </div>
          )}
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 2. FESTIVAL OFFERS CARDS GRID                                             */}
        {/* ========================================================================= */}
        {filteredOffers.length === 0 ? (
          /* TASTEFUL LUXURY EMPTY STATE */
          <div className="max-w-xl mx-auto p-8 sm:p-12 rounded-3xl bg-white border border-[#DCE1D8] text-center space-y-4 shadow-sm animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-[#263D2B]/10 text-[#263D2B] border border-[#263D2B]/20 flex items-center justify-center mx-auto shadow-inner">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F]">
              Seasonal Offers in Preparation
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed">
              We are currently curating our next festival rituals and celebratory packages. Sign up for our concierge VIP updates or reserve standard rituals anytime.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/book-appointment"
                className="global-button !px-6 !py-3 !text-xs uppercase tracking-wider"
              >
                Book Regular Treatment
              </Link>
              <Link
                to="/price-list"
                className="global-button-secondary !px-6 !py-3 !text-xs uppercase tracking-wider"
              >
                View Full Price List
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {filteredOffers.map((offer) => {
              const isUpcoming = offer.status === 'Scheduled';
              const originalPrice = Number(offer.originalPrice) || 0;
              const discountedPrice = Number(offer.discountedPrice) || 0;
              const discountPercent = originalPrice > 0 
                ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100) 
                : Number(offer.discountPercent) || 0;
              const savings = Math.max(0, originalPrice - discountedPrice);

              const bookingUrl = `/book-appointment?offer=${encodeURIComponent(offer.id)}&service=${encodeURIComponent(offer.primaryServiceId || offer.includedServiceIds?.[0] || '')}`;

              return (
                <div
                  key={offer.id}
                  className="bg-white rounded-3xl border border-[#DCE1D8] hover:border-[#263D2B] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col overflow-hidden group"
                >
                  {/* Festival Banner Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F7F4ED]">
                    <img
                      src={offer.bannerImage || '/images/festivals/diwali-glow.jpg'}
                      alt={`${offer.festival} - ${offer.title}`}
                      loading="lazy"
                      decoding="async"
                      width="400"
                      height="250"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/facial-atelier-clean.jpg';
                      }}
                    />
                    
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    {/* Festival Pill Badge */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs border border-[#DCE1D8] text-[#10110F] text-[10.5px] font-bold uppercase tracking-wider shadow-xs">
                      <Sparkles className="w-3 h-3 text-[#263D2B]" />
                      <span>{offer.festival}</span>
                    </div>

                    {/* Discount Tag Badge */}
                    {discountPercent > 0 && (
                      <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-[#263D2B] text-white text-[10.5px] font-bold uppercase tracking-wider shadow-md">
                        {discountPercent}% OFF
                      </div>
                    )}

                    {/* Status Pill on Bottom Right of Banner */}
                    <div className="absolute bottom-3 left-3.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${
                        isUpcoming
                          ? 'bg-amber-500/90 text-white'
                          : 'bg-[#263D2B]/90 text-white'
                      }`}>
                        {isUpcoming ? 'Scheduled Soon' : 'Active Celebration'}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      
                      {/* Title & Description */}
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F] leading-snug group-hover:text-[#263D2B] transition-colors">
                          {offer.title}
                        </h3>
                        <p className="text-xs text-[#6B7068] font-body mt-2 line-clamp-3 leading-relaxed">
                          {offer.description}
                        </p>
                      </div>

                      {/* Included Services List */}
                      {Array.isArray(offer.includedServiceNames) && offer.includedServiceNames.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">
                            Included In This Celebration:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {offer.includedServiceNames.map((svcName, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#F7F4ED] text-[#10110F] px-2.5 py-1 rounded-lg border border-[#DCE1D8]"
                              >
                                <Check className="w-3 h-3 text-[#263D2B]" />
                                <span>{svcName}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Price Matrix */}
                      <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#6B7068] block tracking-wider">
                            Special Festive Price
                          </span>
                          <div className="flex items-baseline gap-2 mt-0.5">
                            <span className="font-serif text-2xl font-bold text-[#263D2B]">
                              ${discountedPrice} <span className="text-xs font-sans font-semibold">CAD</span>
                            </span>
                            {originalPrice > discountedPrice && (
                              <span className="text-xs line-through text-[#6B7068] font-medium">
                                ${originalPrice} CAD
                              </span>
                            )}
                          </div>
                        </div>

                        {savings > 0 && (
                          <div className="text-right">
                            <span className="text-[10px] uppercase font-bold text-[#263D2B] bg-[#263D2B]/10 border border-[#263D2B]/20 px-2.5 py-1 rounded-full inline-block">
                              Save ${savings} CAD
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Date Range Readout */}
                      <div className="flex items-center justify-between text-xs text-[#6B7068] pt-1">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#263D2B]" />
                          <span>Valid: {offer.startDate} → {offer.endDate}</span>
                        </div>
                        {offer.couponCode && (
                          <span className="font-mono text-[11px] font-bold text-[#263D2B] bg-[#263D2B]/10 px-2 py-0.5 rounded-md border border-[#263D2B]/20">
                            {offer.couponCode}
                          </span>
                        )}
                      </div>

                      {/* Live Countdown Timer */}
                      <FestivalCountdownTimer offer={offer} />
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-[#DCE1D8] flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                      <Link
                        to={bookingUrl}
                        className="global-button flex-1 flex items-center justify-center gap-2 !py-3 !px-4 !text-xs font-bold uppercase tracking-wider text-white text-center cursor-pointer shadow-md hover:scale-[1.02] active:scale-98 transition-all"
                      >
                        <span>Book This Offer</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => setSelectedOfferForModal(offer)}
                        className="global-button-secondary !py-3 !px-3.5 !text-xs font-semibold text-center flex items-center justify-center gap-1 cursor-pointer shrink-0"
                        title="View inclusions and terms"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Details</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. SECTION FOOTER / EXPLORE ALL OFFERS BAR                                */}
        {/* ========================================================================= */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#DCE1D8] text-xs text-[#6B7068]">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-[#263D2B] shrink-0" />
            <span>All festival offers feature verified pricing, complimentary herbal refreshments, and genuine natural salon products.</span>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={() => {
                setActiveFilter('all');
                document.getElementById('festival-offers')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#263D2B]/10 hover:bg-[#263D2B] text-[#263D2B] hover:text-white font-bold text-xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore All Offers ({offers.length})</span>
            </button>
            <Link
              to="/price-list"
              className="hover:text-[#263D2B] font-bold underline underline-offset-4 transition-colors text-xs"
            >
              All Services Price List →
            </Link>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. MODAL: OFFER INCLUSIONS, POLICIES & TERMS DIALOG                       */}
      {/* ========================================================================= */}
      {selectedOfferForModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-sans animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-[#DCE1D8] max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#DCE1D8] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] bg-[#263D2B]/10 px-2.5 py-0.5 rounded-full border border-[#263D2B]/20">
                  {selectedOfferForModal.festival} CELEBRATION
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#10110F] mt-1.5">
                  {selectedOfferForModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOfferForModal(null)}
                className="p-1.5 rounded-full hover:bg-[#F7F4ED] text-[#6B7068] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed">
              {selectedOfferForModal.description}
            </p>

            {/* Inclusions */}
            {Array.isArray(selectedOfferForModal.includedServiceNames) && (
              <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2 text-xs">
                <span className="font-bold text-[#10110F] block uppercase tracking-wider text-[11px]">
                  Included Salon Services:
                </span>
                <ul className="space-y-1.5">
                  {selectedOfferForModal.includedServiceNames.map((name, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#10110F]">
                      <Check className="w-3.5 h-3.5 text-[#263D2B] shrink-0" />
                      <span>{name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pricing Summary */}
            <div className="grid grid-cols-2 gap-3 text-center text-xs">
              <div className="p-3 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8]">
                <span className="text-[10px] text-[#6B7068] uppercase font-bold block">Standard Value</span>
                <span className="font-serif text-lg text-[#6B7068] line-through font-semibold">
                  ${selectedOfferForModal.originalPrice} CAD
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#263D2B]/10 border border-[#263D2B]/20">
                <span className="text-[10px] text-[#263D2B] uppercase font-bold block">Offer Price</span>
                <span className="font-serif text-xl font-bold text-[#263D2B]">
                  ${selectedOfferForModal.discountedPrice} CAD
                </span>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="text-[11px] text-[#6B7068] space-y-1 pt-1 border-t border-[#DCE1D8]">
              <span className="font-bold text-[#10110F] block">Offer Terms & Notes:</span>
              <p>{selectedOfferForModal.terms || 'Valid during configured festival dates. Pre-booking required.'}</p>
              {selectedOfferForModal.couponCode && (
                <p className="font-mono text-[#263D2B] font-bold">Promo Code: {selectedOfferForModal.couponCode}</p>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedOfferForModal(null)}
                className="global-button-secondary !py-2.5 !px-4 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
              <Link
                to={`/book-appointment?offer=${encodeURIComponent(selectedOfferForModal.id)}&service=${encodeURIComponent(selectedOfferForModal.primaryServiceId || selectedOfferForModal.includedServiceIds?.[0] || '')}`}
                className="global-button !py-2.5 !px-6 text-xs font-bold uppercase tracking-wider text-white cursor-pointer"
                onClick={() => setSelectedOfferForModal(null)}
              >
                Book This Offer Now
              </Link>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
