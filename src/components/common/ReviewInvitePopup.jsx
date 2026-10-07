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
            colors: ['#CFA46A', '#E5C492', '#F7F1E8', '#FFB7D5']
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-[#161012] border-2 border-[#CFA46A] rounded-3xl p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.9)] relative space-y-6 text-[#F7F1E8]">
        
        {/* Glow effect */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#CFA46A] via-[#E5C492] to-[#B8860B] rounded-t-3xl" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0E0B0C] border border-[#CFA46A]/30 flex items-center justify-center text-[#F7F1E8]/60 hover:text-[#CFA46A] transition-colors cursor-pointer"
          title="Dismiss Popup"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-3 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto text-3xl shadow-lg">
              ✓
            </div>
            <h3 className="font-display text-2xl text-[#F7F1E8]">Review Published!</h3>
            <p className="font-body text-xs text-[#F7F1E8]/70 max-w-xs mx-auto">
              Thank you {activeInvite.customerName}! Your review has been added to our live verified client stream.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            
            {/* Header Badge */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#CFA46A]/15 border border-[#CFA46A]/30 rounded-full text-[10px] font-mono text-[#CFA46A] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#CFA46A] animate-spin" style={{ animationDuration: '4s' }} />
                <span>Treatment Marked Completed</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl text-[#F7F1E8]">
                How Was Your Experience, <span className="text-[#CFA46A] italic">{activeInvite.customerName}</span>?
              </h3>

              <div className="inline-block px-3 py-1 bg-[#0E0B0C] border border-[#CFA46A]/30 rounded-full text-xs font-mono text-[#E5C492]">
                {activeInvite.service} • Ref: {activeInvite.id}
              </div>

              <p className="font-body text-xs text-[#F7F1E8]/70 max-w-sm mx-auto">
                Studio owner Janki Khatroja completed your appointment. Please take a moment to leave your verified review!
              </p>
            </div>

            {/* Interactive Form */}
            <form onSubmit={handleSubmitReview} className="space-y-4">
              
              {/* Star Rating */}
              <div className="bg-[#0E0B0C] border border-[#CFA46A]/30 rounded-2xl p-4 text-center space-y-1.5">
                <label className="text-[11px] font-mono text-[#CFA46A] uppercase tracking-wider font-bold block">
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
                            ? 'fill-[#CFA46A] text-[#CFA46A] drop-shadow-[0_0_8px_rgba(207,164,106,0.7)]'
                            : 'text-[#CFA46A]/25'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="text-[11px] font-mono text-[#CFA46A] uppercase tracking-wider font-bold block mb-1">
                  Your Review Comment *
                </label>
                <textarea
                  required
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Describe your treatment results, comfort, and experience..."
                  className="w-full bg-[#0E0B0C] border border-[#CFA46A]/30 text-[#F7F1E8] p-3.5 rounded-xl outline-none focus:border-[#CFA46A] text-xs resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="w-1/3 py-3 rounded-full bg-[#0E0B0C] border border-[#CFA46A]/30 text-[#F7F1E8]/70 hover:text-[#F7F1E8] text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Later
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-2/3 py-3 rounded-full bg-gradient-to-r from-[#CFA46A] via-[#E5C492] to-[#CFA46A] hover:from-[#E5C492] hover:to-[#CFA46A] text-[#0E0B0C] font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg shadow-[#CFA46A]/20 cursor-pointer flex items-center justify-center gap-2"
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
