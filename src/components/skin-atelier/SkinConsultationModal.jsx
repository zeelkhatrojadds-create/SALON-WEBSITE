import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  Calendar, 
  ArrowRight
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';
import { 
  SKIN_CARE_GOALS, 
  DISCLOSED_SKIN_PREFERENCES, 
  COMMON_PRODUCT_SENSITIVITIES, 
  CONSULTATION_OCCASIONS,
  MEDICAL_SAFETY_DISCLAIMER 
} from './SkinConstants';

export default function SkinConsultationModal({ isOpen, onClose, initialService = null }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    skincareGoal: 'Deep Pore Cleansing & Clarifying',
    preferredTreatment: initialService ? initialService.name : "Aesthetician's Recommendation",
    skinPreference: 'Normal / Balanced',
    productSensitivities: ['None Known'],
    customSensitivity: '',
    occasion: 'Routine Skincare Maintenance',
    additionalRequests: '',
    medicalConsentAcknowledged: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const catalogServices = (salonDB.getServices() || []).filter(
    (s) => s.category === 'facial' && s.active !== false
  );

  const toggleSensitivity = (item) => {
    let current = [...formData.productSensitivities];
    if (item === 'None Known') {
      current = ['None Known'];
    } else {
      current = current.filter((i) => i !== 'None Known');
      if (current.includes(item)) {
        current = current.filter((i) => i !== item);
        if (current.length === 0) current = ['None Known'];
      } else {
        current.push(item);
      }
    }
    setFormData({ ...formData, productSensitivities: current });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMsg('Please provide your full name, contact phone number, and email address.');
      return;
    }

    if (!formData.medicalConsentAcknowledged) {
      setErrorMsg('Please acknowledge the aesthetic guidance and medical disclaimer before submitting.');
      return;
    }

    setIsSubmitting(true);

    const sensitivitySummary = [
      ...formData.productSensitivities,
      formData.customSensitivity.trim() ? `Custom: ${formData.customSensitivity.trim()}` : null
    ].filter(Boolean).join(', ');

    const consultationId = 'cr_skin_' + Date.now().toString(36);

    const payload = {
      id: consultationId,
      category: 'facial',
      categoryName: 'The Skin Atelier',
      serviceId: initialService?.id || 'skin-consultation',
      serviceName: formData.preferredTreatment,
      customerName: formData.fullName.trim(),
      customerPhone: formData.phone.trim(),
      customerEmail: formData.email.trim(),
      customerVision: `Skincare Goal: ${formData.skincareGoal}. Disclosed Skin Preference: ${formData.skinPreference}. Sensitivities/Allergies: ${sensitivitySummary}. Occasion: ${formData.occasion}. Notes: ${formData.additionalRequests.trim() || 'None'}`,
      desiredResult: formData.skincareGoal,
      focusAreas: formData.skinPreference,
      sensitivities: sensitivitySummary,
      occasion: formData.occasion,
      additionalRequests: formData.additionalRequests.trim(),
      medicalConsentAcknowledged: true,
      status: 'Submitted',
      consultationRequested: true,
      createdAt: new Date().toISOString(),
      source: 'The Skin Atelier Consultation Form'
    };

    try {
      if (salonDB.saveCustomRequest) {
        salonDB.saveCustomRequest(payload);
      } else if (salonDB.addCustomRequest) {
        salonDB.addCustomRequest(payload);
      }
    } catch (err) {
      console.warn('Skin consultation save error:', err);
    }

    setSubmittedRequest(payload);
    setIsSubmitting(false);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl bg-[#F7F4ED] rounded-3xl border border-[#DCE1D8] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col relative text-[#10110F]">
        
        {/* Modal Header */}
        <div className="p-6 bg-white border-b border-[#DCE1D8] flex items-center justify-between sticky top-0 z-10">
          <div className="space-y-0.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[10.5px] font-bold uppercase tracking-wider text-[#263D2B]">
              <Sparkles className="w-3 h-3 text-[#263D2B]" />
              <span>THE SKIN ATELIER CONSULTATION</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal">
              Personalized Skincare Consultation
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED] transition-colors"
            aria-label="Close consultation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {submittedRequest ? (
            /* Submission Success State */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center mx-auto border border-[#263D2B]/20">
                <CheckCircle2 className="w-8 h-8 text-[#263D2B]" />
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-widest text-[#465640]">
                  Reference #{submittedRequest.id}
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl text-[#10110F]">
                  Consultation Notes Received
                </h4>
                <p className="text-xs sm:text-sm text-[#465640] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{submittedRequest.customerName}</strong>. Your skincare goals and disclosed preferences have been saved to our salon database.
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-5 rounded-2xl bg-white border border-[#DCE1D8] text-left text-xs space-y-2.5 max-w-lg mx-auto shadow-xs">
                <div className="flex justify-between border-b border-[#DCE1D8]/60 pb-2">
                  <span className="text-[#6B7068]">Skincare Goal:</span>
                  <span className="font-semibold text-[#10110F]">{formData.skincareGoal}</span>
                </div>
                <div className="flex justify-between border-b border-[#DCE1D8]/60 pb-2">
                  <span className="text-[#6B7068]">Preferred Treatment:</span>
                  <span className="font-semibold text-[#263D2B]">{formData.preferredTreatment}</span>
                </div>
                <div className="flex justify-between border-b border-[#DCE1D8]/60 pb-2">
                  <span className="text-[#6B7068]">Skin Preference:</span>
                  <span className="font-semibold text-[#10110F]">{formData.skinPreference}</span>
                </div>
                <div className="flex justify-between border-b border-[#DCE1D8]/60 pb-2">
                  <span className="text-[#6B7068]">Sensitivities Disclosed:</span>
                  <span className="font-semibold text-[#10110F]">{formData.productSensitivities.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7068]">Occasion / Event:</span>
                  <span className="font-semibold text-[#10110F]">{formData.occasion}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="global-button w-full sm:w-auto !py-3.5 !px-8 text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md"
                >
                  Close &amp; Return to Skin Atelier
                </button>
              </div>

            </div>
          ) : (
            /* Consultation Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Important Medical & Non-Diagnostic Disclaimer Alert */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#263D2B]/30 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-[#263D2B] font-bold text-xs uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
                  <span>{MEDICAL_SAFETY_DISCLAIMER.title}</span>
                </div>
                <p className="text-[11.5px] sm:text-xs text-[#465640] leading-relaxed">
                  {MEDICAL_SAFETY_DISCLAIMER.content}
                </p>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* 1. Contact Information */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#263D2B] flex items-center gap-1.5">
                  <span>1. Contact Details</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#465640] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full h-10 px-3 rounded-xl border border-[#DCE1D8] bg-white text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#465640] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (613) 555-0199"
                      className="w-full h-10 px-3 rounded-xl border border-[#DCE1D8] bg-white text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#465640] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full h-10 px-3 rounded-xl border border-[#DCE1D8] bg-white text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Primary Skincare Goal */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#263D2B]">
                  2. Primary Skincare Goal *
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SKIN_CARE_GOALS.map((goal) => {
                    const isSelected = formData.skincareGoal === goal.label;
                    return (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, skincareGoal: goal.label })}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white border-[#263D2B] ring-1 ring-[#263D2B] shadow-xs'
                            : 'bg-white/70 border-[#DCE1D8] hover:bg-white text-[#465640]'
                        }`}
                      >
                        <div className="text-xs font-semibold text-[#10110F]">
                          {goal.label}
                        </div>
                        <div className="text-[10.5px] text-[#6B7068] mt-0.5 leading-snug">
                          {goal.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Preferred Treatment */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#263D2B]">
                  3. Preferred Treatment *
                </label>
                <select
                  value={formData.preferredTreatment}
                  onChange={(e) => setFormData({ ...formData, preferredTreatment: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-[#DCE1D8] bg-white text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                >
                  <option value="Aesthetician's Recommendation">
                    Aesthetician&apos;s Recommendation (Determine in Suite)
                  </option>
                  <option value="Skin Consultation (15 min - Complimentary)">
                    Skin Consultation ($0 CAD — 15 min Complimentary)
                  </option>
                  {catalogServices.map((srv) => (
                    <option key={srv.id} value={srv.name}>
                      {srv.name} — ${srv.price} CAD ({srv.duration})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-[#6B7068]">
                  Select an approved catalog service or let Janki Khatroja evaluate your skin during your appointment.
                </p>
              </div>

              {/* 4. Skin Preferences & Sensitivities Disclosed */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#263D2B]">
                  4. Disclosed Skin Preferences
                </label>
                <div className="flex flex-wrap gap-2">
                  {DISCLOSED_SKIN_PREFERENCES.map((pref) => {
                    const isSelected = formData.skinPreference === pref.label;
                    return (
                      <button
                        key={pref.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, skinPreference: pref.label })}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#263D2B] text-white shadow-xs'
                            : 'bg-white border border-[#DCE1D8] text-[#465640] hover:border-[#263D2B]'
                        }`}
                      >
                        {pref.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Product Sensitivities or Allergies */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#263D2B]">
                  5. Product Sensitivities or Allergies
                </label>
                <p className="text-[11px] text-[#6B7068]">
                  Select any ingredients or materials relevant to your facial treatment:
                </p>
                <div className="flex flex-wrap gap-2">
                  {COMMON_PRODUCT_SENSITIVITIES.map((item) => {
                    const isSelected = formData.productSensitivities.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleSensitivity(item)}
                        className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#465640] text-white font-semibold'
                            : 'bg-white border border-[#DCE1D8] text-[#6B7068] hover:text-[#10110F]'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
                <input
                  type="text"
                  value={formData.customSensitivity}
                  onChange={(e) => setFormData({ ...formData, customSensitivity: e.target.value })}
                  placeholder="Other known allergies or sensitivities (optional)..."
                  className="w-full h-9 px-3 rounded-xl border border-[#DCE1D8] bg-white text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                />
              </div>

              {/* 6. Occasion or Event */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#263D2B]">
                  6. Occasion or Event
                </label>
                <select
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-[#DCE1D8] bg-white text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                >
                  {CONSULTATION_OCCASIONS.map((occ) => (
                    <option key={occ} value={occ}>
                      {occ}
                    </option>
                  ))}
                </select>
              </div>

              {/* 7. Additional Requests */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#263D2B]">
                  7. Additional Requests &amp; Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.additionalRequests}
                  onChange={(e) => setFormData({ ...formData, additionalRequests: e.target.value })}
                  placeholder="Tell us about specific zones needing extra attention (e.g., forehead congestion, dry cheeks, sensitive neck), recent peel history, or relaxation preferences..."
                  className="w-full p-3 rounded-xl border border-[#DCE1D8] bg-white text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                />
              </div>

              {/* Medical Consent & Non-Diagnostic Acknowledgement */}
              <div className="p-4 rounded-xl bg-white border border-[#DCE1D8] space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.medicalConsentAcknowledged}
                    onChange={(e) => setFormData({ ...formData, medicalConsentAcknowledged: e.target.checked })}
                    className="mt-0.5 rounded border-[#DCE1D8] text-[#263D2B] focus:ring-[#263D2B]"
                  />
                  <span className="text-[11.5px] text-[#465640] leading-snug">
                    I acknowledge that GLAM GIRL BY JANKI provides aesthetic beauty and relaxation services only and does not diagnose medical conditions or promise medical outcomes. I agree that persistent or severe skin symptoms require evaluation by a licensed medical healthcare professional.
                  </span>
                </label>
              </div>

              {/* Actions Footer */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-[#DCE1D8]">
                <button
                  type="button"
                  onClick={onClose}
                  className="global-button-secondary w-full sm:w-auto !py-3 !px-5 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="global-button w-full sm:w-auto !py-3 !px-7 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isSubmitting ? 'Saving Notes...' : 'Save Consultation Notes'}</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
