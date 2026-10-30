import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Check, 
  AlertCircle, 
  Upload, 
  X, 
  Sparkles, 
  HeartHandshake, 
  ShieldCheck, 
  Calendar,
  MessageSquare,
  User,
  Mail,
  Sliders,
  CheckCircle2,
  Info
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';
import { MAKEUP_OCCASIONS } from './MakeupConstants';

export default function MakeupConsultationForm({ prefilledPreferences }) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    occasion: 'Wedding',
    eventDate: '',
    preferredStyle: 'Soft Glam Makeup',
    preferredFinish: 'Satin',
    eyeMakeup: 'Soft Shimmer',
    lipStyle: 'Nude',
    sensitivities: '',
    additionalNotes: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState(null);

  // Sync prefilled preferences if received from Style Explorer
  useEffect(() => {
    if (prefilledPreferences) {
      setFormData(prev => ({
        ...prev,
        preferredFinish: prefilledPreferences.finish || prev.preferredFinish,
        eyeMakeup: prefilledPreferences.eyeMakeup || prev.eyeMakeup,
        lipStyle: prefilledPreferences.lipStyle || prev.lipStyle
      }));
    }
  }, [prefilledPreferences]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, image: 'Inspiration photo size must be under 5MB.' }));
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setErrors(prev => ({ ...prev, image: null }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Please enter your full name.';
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Please provide an email address.';
    } else if (!validateEmail(formData.customerEmail.trim())) {
      newErrors.customerEmail = 'Please enter a valid email address (e.g. name@example.com).';
    }

    if (!formData.occasion) {
      newErrors.occasion = 'Please choose your occasion.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const generatedId = `GGJ-CR-${Math.floor(100000 + Math.random() * 900000)}`;

      const requestPayload = {
        id: generatedId,
        createdAt: new Date().toISOString(),
        status: 'Submitted',
        category: 'makeup',
        categoryName: 'Makeup',
        serviceId: 'makeup-atelier-consultation',
        serviceName: 'The Makeup Atelier — Custom Consultation',
        customerName: formData.customerName.trim(),
        customerEmail: formData.customerEmail.trim(),
        customerPhone: formData.customerPhone.trim(),
        occasion: formData.occasion,
        eventDate: formData.eventDate,
        customerVision: formData.additionalNotes.trim(),
        sensitivities: formData.sensitivities.trim(),
        personalPreferences: {
          preferredStyle: formData.preferredStyle,
          finish: formData.preferredFinish,
          eyeMakeup: formData.eyeMakeup,
          lipStyle: formData.lipStyle,
          sensitivities: formData.sensitivities.trim()
        },
        consultationRequested: true,
        inspirationPhoto: imagePreview || null,
        history: [
          {
            timestamp: new Date().toISOString(),
            action: 'Consultation Request submitted from The Makeup Atelier.'
          }
        ]
      };

      // Save through master salon database backend
      if (salonDB && typeof salonDB.saveCustomRequest === 'function') {
        salonDB.saveCustomRequest(requestPayload);
      } else {
        // Fallback local storage protection
        const existing = JSON.parse(localStorage.getItem('glamgirl_custom_requests') || '[]');
        localStorage.setItem('glamgirl_custom_requests', JSON.stringify([requestPayload, ...existing]));
      }

      setSubmittedRequest(requestPayload);
    } catch (err) {
      console.error('Failed to save consultation request:', err);
      setErrors({ form: 'An unexpected system error occurred while transmitting your request. Please try again or reach out to our studio.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmittedRequest(null);
    setFormData({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      occasion: 'Wedding',
      eventDate: '',
      preferredStyle: 'Soft Glam Makeup',
      preferredFinish: 'Satin',
      eyeMakeup: 'Soft Shimmer',
      lipStyle: 'Nude',
      sensitivities: '',
      additionalNotes: ''
    });
    setImagePreview(null);
    setImageFile(null);
    setErrors({});
  };

  return (
    <section id="makeup-consultation" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DCE1D8]">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
          <HeartHandshake className="w-3.5 h-3.5 text-[#263D2B]" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#263D2B]">
            BESPOKE ARTISTRY CONSULTATION
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
          Let's Discover Your Signature Look
        </h2>

        <p className="font-serif text-lg sm:text-xl text-[#263D2B] italic font-light">
          "Tell us about your occasion, preferences, and the look you have in mind."
        </p>

        <p className="text-xs sm:text-sm text-[#465640] max-w-2xl mx-auto leading-relaxed pt-1">
          Share your celebration details, preferred finishes, and inspiration images with master director Janki Khatroja. We review every request individually to craft a bespoke makeup blueprint.
        </p>

        {/* Clear Non-Booking Notice */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-[11px] text-[#465640] max-w-xl text-left sm:text-center mt-2">
          <ShieldCheck className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
          <span>
            <strong>Consultation Request Only:</strong> Submitting this form shares your preferences and vision with our studio. It does not schedule or confirm an appointment booking.
          </span>
        </div>
      </div>

      {/* Confirmation View after Successful Submission */}
      {submittedRequest ? (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#263D2B]/30 p-8 sm:p-12 shadow-xl space-y-6 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-[#263D2B] text-white flex items-center justify-center mx-auto shadow-md">
            <Check className="w-8 h-8 text-[#A8B5A0]" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#263D2B] block">
              CONSULTATION INQUIRY LOGGED
            </span>
            <h3 className="font-serif text-3xl text-[#10110F]">
              Thank You, {submittedRequest.customerName}!
            </h3>
            <p className="text-xs sm:text-sm text-[#465640] leading-relaxed max-w-lg mx-auto">
              Your consultation request has been successfully recorded in our studio system with reference number:
            </p>
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-sm font-mono font-bold text-[#263D2B]">
              {submittedRequest.id}
            </div>
          </div>

          {/* Submitted Summary Box */}
          <div className="p-5 rounded-2xl bg-[#FBF9F4] border border-[#DCE1D8] text-left space-y-2 text-xs">
            <div className="font-bold text-[#10110F] border-b border-[#DCE1D8] pb-2 flex items-center justify-between">
              <span>Recorded Preferences:</span>
              <span className="font-mono text-[#6B7068]">{new Date(submittedRequest.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[#465640] pt-1">
              <div><strong>Occasion:</strong> {submittedRequest.occasion}</div>
              <div><strong>Event Date:</strong> {submittedRequest.eventDate || 'Flexible / TBD'}</div>
              <div><strong>Preferred Finish:</strong> {submittedRequest.personalPreferences?.finish}</div>
              <div><strong>Eye Design:</strong> {submittedRequest.personalPreferences?.eyeMakeup}</div>
              <div><strong>Lip Palette:</strong> {submittedRequest.personalPreferences?.lipStyle}</div>
              <div><strong>Contact Email:</strong> {submittedRequest.customerEmail}</div>
            </div>
            {submittedRequest.sensitivities && (
              <div className="pt-2 text-[#6B7068]">
                <strong>Sensitivities Noted:</strong> {submittedRequest.sensitivities}
              </div>
            )}
          </div>

          <p className="text-xs text-[#6B7068] max-w-lg mx-auto leading-relaxed">
            Master artist Janki Khatroja will personally review your occasion details and reach out to <strong>{submittedRequest.customerEmail}</strong> within 24 business hours with custom palette recommendations.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleResetForm}
              className="global-button-secondary !py-2.5 !px-6 text-xs font-semibold cursor-pointer"
            >
              Submit Another Request
            </button>
            <a
              href="#makeup-gallery"
              className="global-button !py-2.5 !px-6 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Return to Gallery
            </a>
          </div>
        </div>
      ) : (
        /* The Consultation Form */
        <form
          onSubmit={handleSubmit}
          noValidate
          className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-10 shadow-xs space-y-8"
        >
          {errors.form && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{errors.form}</span>
            </div>
          )}

          {/* 1. Client Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#DCE1D8]">
              <User className="w-4 h-4 text-[#263D2B]" />
              <h3 className="font-serif text-lg text-[#10110F]">
                1. Your Contact Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  placeholder="e.g. Priya Sharma"
                  className={`w-full h-11 px-4 rounded-xl border text-xs text-[#10110F] bg-white focus:outline-none focus:border-[#263D2B] ${
                    errors.customerName ? 'border-red-400 bg-red-50/20' : 'border-[#DCE1D8]'
                  }`}
                />
                {errors.customerName && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.customerName}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  placeholder="e.g. priya@example.com"
                  className={`w-full h-11 px-4 rounded-xl border text-xs text-[#10110F] bg-white focus:outline-none focus:border-[#263D2B] ${
                    errors.customerEmail ? 'border-red-400 bg-red-50/20' : 'border-[#DCE1D8]'
                  }`}
                />
                {errors.customerEmail && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.customerEmail}</span>
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                  Phone Number <span className="text-[10px] text-[#6B7068] font-normal normal-case">(Optional, for WhatsApp consult)</span>
                </label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  placeholder="e.g. (613) 555-0199"
                  className="w-full h-11 px-4 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F] bg-white focus:outline-none focus:border-[#263D2B]"
                />
              </div>
            </div>
          </div>

          {/* 2. Occasion & Date */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#DCE1D8]">
              <Calendar className="w-4 h-4 text-[#263D2B]" />
              <h3 className="font-serif text-lg text-[#10110F]">
                2. Event Milestone &amp; Timeline
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                  Celebration Occasion <span className="text-red-500">*</span>
                </label>
                <select
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleInputChange}
                  className="w-full h-11 px-3 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F] bg-white focus:outline-none focus:border-[#263D2B] cursor-pointer"
                >
                  {MAKEUP_OCCASIONS.map(occ => (
                    <option key={occ.id} value={occ.name}>{occ.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                  Target Event Date <span className="text-[10px] text-[#6B7068] font-normal normal-case">(Optional)</span>
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  className="w-full h-11 px-4 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F] bg-white focus:outline-none focus:border-[#263D2B]"
                />
              </div>
            </div>
          </div>

          {/* 3. Aesthetic Preferences */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#DCE1D8]">
              <Sliders className="w-4 h-4 text-[#263D2B]" />
              <h3 className="font-serif text-lg text-[#10110F]">
                3. Your Makeup Preferences
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                  Preferred Makeup Style
                </label>
                <select
                  name="preferredStyle"
                  value={formData.preferredStyle}
                  onChange={handleInputChange}
                  className="w-full h-11 px-3 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F] bg-white focus:outline-none focus:border-[#263D2B] cursor-pointer"
                >
                  <option value="Natural Makeup">Natural Makeup (Clean-Girl Definition)</option>
                  <option value="Soft Glam Makeup">Soft Glam Makeup (Diffused Red-Carpet)</option>
                  <option value="Full Glam Makeup">Full Glam Makeup (Dramatic Cut-Crease)</option>
                  <option value="Bridal Makeup Inspiration">Bridal Makeup Inspiration (Royal 24h)</option>
                  <option value="Traditional Makeup">Traditional Makeup (Heritage South-Asian)</option>
                  <option value="Party Makeup">Party Makeup (Celebration Shimmer)</option>
                  <option value="Evening Glam">Evening Glam (Sultry Smokey Drama)</option>
                  <option value="Dewy Makeup">Dewy Makeup (Luminous Glass Skin)</option>
                  <option value="Editorial Makeup">Editorial Makeup (Runway Graphic)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                  Preferred Skin Finish
                </label>
                <select
                  name="preferredFinish"
                  value={formData.preferredFinish}
                  onChange={handleInputChange}
                  className="w-full h-11 px-3 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F] bg-white focus:outline-none focus:border-[#263D2B] cursor-pointer"
                >
                  <option value="Natural">Natural (Skin-like breathable)</option>
                  <option value="Dewy">Dewy (Reflective glass glow)</option>
                  <option value="Satin">Satin (Velvety demi-matte)</option>
                  <option value="Matte">Matte (Flash-proof oil control)</option>
                  <option value="Radiant">Radiant (Lit-from-within pearl)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                  Eye Makeup Preference
                </label>
                <select
                  name="eyeMakeup"
                  value={formData.eyeMakeup}
                  onChange={handleInputChange}
                  className="w-full h-11 px-3 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F] bg-white focus:outline-none focus:border-[#263D2B] cursor-pointer"
                >
                  <option value="Minimal">Minimal (Clean wash + lashes)</option>
                  <option value="Soft Shimmer">Soft Shimmer (Romantic champagne/rose)</option>
                  <option value="Smokey">Smokey (Charcoal or bronze khol)</option>
                  <option value="Defined">Defined (Sculpted cut-crease)</option>
                  <option value="Winged">Winged (Crisp liquid cat-eye)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                  Lip Color Preference
                </label>
                <select
                  name="lipStyle"
                  value={formData.lipStyle}
                  onChange={handleInputChange}
                  className="w-full h-11 px-3 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F] bg-white focus:outline-none focus:border-[#263D2B] cursor-pointer"
                >
                  <option value="Nude">Nude (Warm caramel or beige)</option>
                  <option value="Pink">Pink (Romantic rose or mauve)</option>
                  <option value="Peach">Peach (Warm coral & apricot)</option>
                  <option value="Red">Red (Classic crimson or vermillion)</option>
                  <option value="Bold">Bold (Berry, plum, or chocolate)</option>
                </select>
              </div>
            </div>
          </div>

          {/* 4. Inspiration Image Upload (Optional) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#DCE1D8]">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#263D2B]" />
                <h3 className="font-serif text-lg text-[#10110F]">
                  4. Inspiration Photograph
                </h3>
              </div>
              <span className="text-[11px] text-[#6B7068] font-mono">Optional</span>
            </div>

            {imagePreview ? (
              <div className="relative rounded-2xl overflow-hidden border border-[#DCE1D8] max-w-xs">
                <img src={imagePreview} alt="Inspiration preview" className="w-full h-44 object-cover" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-black cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-[#DCE1D8] bg-[#FBF9F4] hover:bg-white hover:border-[#263D2B] transition-colors cursor-pointer text-center">
                <Upload className="w-6 h-6 text-[#263D2B] mb-2" />
                <span className="text-xs font-semibold text-[#10110F]">
                  Upload an Inspiration Photo or Outfit Swatch
                </span>
                <span className="text-[10px] text-[#6B7068] mt-1">
                  PNG, JPG, or WEBP up to 5MB
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
            {errors.image && (
              <p className="text-[11px] text-red-600">{errors.image}</p>
            )}
          </div>

          {/* 5. Sensitivities & Notes */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#DCE1D8]">
              <MessageSquare className="w-4 h-4 text-[#263D2B]" />
              <h3 className="font-serif text-lg text-[#10110F]">
                5. Sensitivities &amp; Additional Vision
              </h3>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                Skin Sensitivities or Product Preferences <span className="text-[10px] text-[#6B7068] font-normal normal-case">(Optional)</span>
              </label>
              <input
                type="text"
                name="sensitivities"
                value={formData.sensitivities}
                onChange={handleInputChange}
                placeholder="e.g. Sensitive to synthetic fragrances, latex lash glue, or dry skin near brows"
                className="w-full h-11 px-4 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F] bg-white focus:outline-none focus:border-[#263D2B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                Additional Notes or Outfit Descriptions <span className="text-[10px] text-[#6B7068] font-normal normal-case">(Optional)</span>
              </label>
              <textarea
                name="additionalNotes"
                rows={3}
                value={formData.additionalNotes}
                onChange={handleInputChange}
                placeholder="Tell us about your outfit neckline, jewelry colors, event lighting, or any special requests..."
                className="w-full p-3.5 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F] bg-white focus:outline-none focus:border-[#263D2B] resize-none"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-[#DCE1D8] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[11px] text-[#6B7068]">
              <ShieldCheck className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
              <span>Your personal contact data is strictly confidential and protected.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="global-button w-full sm:w-auto !py-3.5 !px-8 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer hover:scale-[1.02] transition-transform"
            >
              {isSubmitting ? (
                <span>Transmitting Inquiry...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-white" />
                  <span>Submit Consultation Request</span>
                </>
              )}
            </button>
          </div>

        </form>
      )}

    </section>
  );
}
