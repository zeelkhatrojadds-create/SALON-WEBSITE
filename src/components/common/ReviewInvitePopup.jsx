import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Sparkles, 
  X, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  MessageSquareHeart, 
  Heart 
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';

export default function ReviewInvitePopup() {
  const [activeInvite, setActiveInvite] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Check URL params or reactive database events
  useEffect(() => {
    // 1. Check URL query params for ?invite=ID or ?completed=ID
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const inviteId = urlParams.get('invite') || urlParams.get('completed') || urlParams.get('review_invite');

      if (inviteId) {
        const verifyRes = salonDB.verifyAppointmentForReview(inviteId);
        if (verifyRes.valid && verifyRes.appointment) {
          triggerPopup(verifyRes.appointment);
        }
      }
    } catch (e) {}

    // 2. Listen to reactive database events (e.g., when Admin marks appointment as Completed)
    const handleDbEvent = (event, data) => {
      if (event === 'appointment_completed' && data) {
        triggerPopup(data);
      }
    };

    const unsubscribe = salonDB.subscribe(handleDbEvent);

    // 3. Listen to window CustomEvent across components/tabs
    const handleWindowChange = (e) => {
      const { event, data } = e.detail || {};
      if (event === 'appointment_completed' && data) {
        triggerPopup(data);
      }
    };

    window.addEventListener('glfy_db_change', handleWindowChange);

    return () => {
      unsubscribe();
      window.removeEventListener('glfy_db_change', handleWindowChange);
    };
  }, []);

  const triggerPopup = (appointment) => {
    // Check if user already dismissed or reviewed this booking
    const dismissedKey = `glfy_dismissed_review_${appointment.id}`;
    if (sessionStorage.getItem(dismissedKey)) return;

    setActiveInvite(appointment);
    setRating(5);
    setReviewText('');
    setIsOpen(true);
  };

  const handleDismiss = () => {
    if (activeInvite?.id) {
      sessionStorage.setItem(`glfy_dismissed_review_${activeInvite.id}`, 'true');
    }
    setIsOpen(false);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!activeInvite || !reviewText.trim()) return;

    setIsSubmitting(true);

    salonDB.addReview({
      customerName: activeInvite.customerName || 'Verified Salon Guest',
      service: activeInvite.service || 'Salon Ritual',
      serviceCategory: 'other',
      rating,
      review: reviewText.trim(),
      verified: true,
      bookingId: activeInvite.id,
      recommended: true,
      tags: ['Completed Treatment', 'Verified Guest']
    });

    import('canvas-confetti')
      .then(({ default: confetti }) => {
        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#263D2B', '#465640', '#A8B5A0', '#F7F4ED']
          });
        } catch (err) {}
      })
      .catch(() => {});

    setIsSubmitting(false);
    setSubmitted(true);

    if (activeInvite?.id) {
      sessionStorage.setItem(`glfy_dismissed_review_${activeInvite.id}`, 'true');
    }

    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
    }, 3000);
  };

  if (!isOpen || !activeInvite) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white border border-[#DCE1D8] rounded-3xl p-5 sm:p-8 shadow-2xl relative space-y-5 sm:space-y-6 text-[#10110F]">
        
        {/* Accent bar */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-[#263D2B] rounded-t-3xl" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-center text-[#6B7068] hover:text-[#10110F] transition-colors cursor-pointer"
          title="Dismiss Popup"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-3 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-[#263D2B]/10 text-[#263D2B] border border-[#263D2B]/30 flex items-center justify-center mx-auto text-3xl shadow-sm">
              ✓
            </div>
            <h3 className="font-serif text-2xl text-[#10110F]">Review Published!</h3>
            <p className="font-sans text-xs text-[#6B7068] max-w-xs mx-auto">
              Thank you {activeInvite.customerName}! Your review has been added to our live verified client stream.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            
            {/* Header Badge */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#263D2B]/10 border border-[#263D2B]/20 rounded-full text-[10px] font-sans font-bold text-[#263D2B] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
                <span>Treatment Marked Completed</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F]">
                How Was Your Experience, <span className="text-[#263D2B] italic">{activeInvite.customerName}</span>?
              </h3>

              <div className="inline-block px-3 py-1 bg-[#F7F4ED] border border-[#DCE1D8] rounded-full text-xs font-sans text-[#465640]">
                {activeInvite.service} • Ref: {activeInvite.id}
              </div>

              <p className="font-sans text-xs text-[#6B7068] max-w-sm mx-auto">
                Studio owner Janki Khatroja completed your appointment. Please take a moment to leave your verified review!
              </p>
            </div>

            {/* Interactive Form */}
            <form onSubmit={handleSubmitReview} className="space-y-4">
              
              {/* Star Rating */}
              <div className="bg-[#F7F4ED] border border-[#DCE1D8] rounded-2xl p-4 text-center space-y-1.5">
                <label className="text-[11px] font-sans text-[#263D2B] uppercase tracking-wider font-bold block">
                  Select Rating
                </label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                    >
                      <Star
                        className={`w-8 h-8 sm:w-9 sm:h-9 ${
                          star <= rating
                            ? 'fill-[#263D2B] text-[#263D2B]'
                            : 'text-[#DCE1D8]'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="text-[11px] font-sans text-[#263D2B] uppercase tracking-wider font-bold block mb-1">
                  Your Review Comment *
                </label>
                <textarea
                  required
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Describe your treatment results, comfort, and experience..."
                  className="w-full bg-[#F7F4ED] border border-[#DCE1D8] text-[#10110F] p-3.5 rounded-xl outline-none focus:border-[#263D2B] text-xs resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="global-button-secondary w-1/3 !py-3 text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Later
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="global-button w-2/3 !py-3 text-white font-extrabold text-xs uppercase tracking-widest shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Review</span>
                </button>
              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  );
}
