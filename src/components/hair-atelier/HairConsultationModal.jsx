import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  Check, 
  Scissors, 
  Info, 
  Send 
} from 'lucide-react';

function getSessionUser() {
  try {
    const data = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('glfy_db_session_user') : null;
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

export default function HairConsultationModal({ 
  isOpen, 
  onClose, 
  initialContext = null 
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    goal: 'Bespoke Haircut & Framing Layers',
    currentLength: 'Medium (Shoulder Length)',
    chemicalHistory: 'Previously Coloured / Highlighted',
    preferredDate: '',
    timePreference: 'Morning (10:00 AM - 1:00 PM)',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const user = getSessionUser();
    if (user) {
      setCurrentUser(user);
      setFormData((prev) => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialContext) {
      if (initialContext.name || initialContext.title) {
        setFormData((prev) => ({
          ...prev,
          notes: `Interested in: ${initialContext.name || initialContext.title} ($${initialContext.price || ''} CAD). ${prev.notes || ''}`
        }));
      }
      if (initialContext.notes) {
        setFormData((prev) => ({
          ...prev,
          notes: `${initialContext.notes}\n${prev.notes || ''}`.trim()
        }));
      }
    }
  }, [initialContext]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const existing = JSON.parse(localStorage.getItem('glam_hair_consultations') || '[]');
      existing.push({
        ...formData,
        context: initialContext,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('glam_hair_consultations', JSON.stringify(existing));
    } catch {}
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleReset}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-[#F7F4ED] text-[#6B7068] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="font-serif text-2xl text-[#10110F]">
              Consultation Request Received
            </h3>
            <p className="text-xs sm:text-sm text-[#465640] max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{formData.name || 'valued guest'}</strong>. Your hair consultation details have been recorded. Janki Khatroja will review your strand history and contact you to align on your appointment.
            </p>
            <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs text-[#6B7068] text-left space-y-1">
              <div><strong>Primary Goal:</strong> {formData.goal}</div>
              <div><strong>Hair Profile:</strong> {formData.currentLength} &bull; {formData.chemicalHistory}</div>
              {formData.preferredDate && <div><strong>Preferred Date:</strong> {formData.preferredDate} ({formData.timePreference})</div>}
            </div>
            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={handleReset}
                className="global-button !py-3 !px-8 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[10.5px] font-mono text-[#263D2B]">
                <Scissors className="w-3 h-3" />
                <span>1:1 PRIVATE ATELIER CONSULTATION</span>
              </div>
              <h3 className="font-serif text-2xl text-[#10110F]">
                Personalized Hair Consultation
              </h3>
              <p className="text-xs text-[#6B7068]">
                Share your styling history, hair texture, and expectations. Every session in Ottawa is strictly 1-on-1 with master stylist Janki.
              </p>
            </div>

            {/* Guest Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#10110F] block">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Maya Sharma"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#10110F] block">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. (613) 555-0192"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#10110F] block">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. maya@example.com"
                className="w-full text-xs p-2.5 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-[#10110F] focus:outline-none focus:border-[#263D2B]"
              />
            </div>

            {/* Hair Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#10110F] block">Primary Goal:</label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                >
                  <option value="Bespoke Haircut & Framing Layers">Bespoke Haircut &amp; Framing Layers</option>
                  <option value="Dimensional Balayage or Highlights">Dimensional Balayage or Highlights</option>
                  <option value="Global Botanical Colour & Grey Blending">Global Botanical Colour &amp; Grey Blending</option>
                  <option value="Kesariya Hair Spa & Bond Repair">Kesariya Hair Spa &amp; Bond Repair</option>
                  <option value="Event Styling or Blowout">Event Styling or Blowout</option>
                  <option value="Bridal Hair Couture Consultation">Bridal Hair Couture Consultation</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#10110F] block">Current Length:</label>
                <select
                  value={formData.currentLength}
                  onChange={(e) => setFormData({ ...formData, currentLength: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                >
                  <option value="Short (Above Chin / Bob)">Short (Above Chin / Bob)</option>
                  <option value="Medium (Shoulder Length)">Medium (Shoulder Length)</option>
                  <option value="Long (Mid-Back)">Long (Mid-Back)</option>
                  <option value="Extra Long (Waist-Length)">Extra Long (Waist-Length)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#10110F] block">Chemical &amp; Colour History:</label>
                <select
                  value={formData.chemicalHistory}
                  onChange={(e) => setFormData({ ...formData, chemicalHistory: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                >
                  <option value="Virgin / Untreated Hair">Virgin / Untreated Hair</option>
                  <option value="Previously Coloured / Highlighted">Previously Coloured / Highlighted</option>
                  <option value="Bleached / Lightened">Bleached / Lightened</option>
                  <option value="Keratin / Chemically Straightened">Keratin / Chemically Straightened</option>
                  <option value="Henna Treated">Henna Treated</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#10110F] block">Preferred Day / Date:</label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#10110F] block">Vision Notes &amp; Sensitivities:</label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Mention any scalp sensitivities, previous salon experiences, or specific reference photos..."
                className="w-full text-xs p-2.5 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-[#10110F] focus:outline-none focus:border-[#263D2B]"
              />
            </div>

            {/* Non-Diagnostic Disclaimer */}
            <div className="p-3 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-start gap-2 text-[10.5px] text-[#6B7068] leading-tight">
              <Info className="w-3.5 h-3.5 text-[#263D2B] shrink-0 mt-0.5" />
              <span>
                <strong>Atelier Commitment:</strong> Consultations are cosmetic and aesthetic evaluations for styling and botanical care compatibility. We do not provide clinical medical diagnosis for scalp ailments.
              </span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-[#263D2B] font-mono">Mon–Sat Hours &bull; Sunday Closed</span>
              <button
                type="submit"
                className="global-button w-full sm:w-auto !py-3 !px-8 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Consultation Request</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
