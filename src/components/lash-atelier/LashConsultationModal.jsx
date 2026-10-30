import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Sparkles,
  Upload,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  Eye,
  Calendar,
  Clock,
  ArrowRight,
  FileImage,
  Trash2
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';
import { MEDICAL_SAFETY_DISCLAIMER } from './LashConstants';

export default function LashConsultationModal({ isOpen, onClose, initialPreferences = null }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    desiredLook: initialPreferences?.style || 'Wispy Flutter',
    intensityPreference: 'Balanced Medium',
    occasion: 'Everyday Work & Lifestyle',
    previousExtensions: 'Never (First-Time Client)',
    productSensitivities: 'None known',
    medicalConcernReported: false,
    additionalRequests: initialPreferences ? `Preselected: Curl ${initialPreferences.curl || 'C-Curl'}, Length ${initialPreferences.length || 'Medium'}, Fullness ${initialPreferences.fullness || 'Light'}.` : '',
  });

  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [fileError, setFileError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState(null);

  if (!isOpen) return null;

  // Handle optional inspiration image upload with robust validation
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    setFileError('');

    if (!file) return;

    // 1. File Type validation
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setFileError('Please upload a valid image file (JPEG, PNG, or WEBP).');
      return;
    }

    // 2. File Size validation (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setFileError('Image file size must be under 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setImagePreviewUrl(uploadEvent.target.result);
      setUploadedImage({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        dataUrl: uploadEvent.target.result
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setImagePreviewUrl('');
    setFileError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.email) {
      alert('Please fill in your name, contact phone, and email address.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      id: 'cr_lash_' + Date.now().toString(36),
      category: 'lashes',
      serviceId: 'classic-eyelash-extension',
      customerName: formData.fullName.trim(),
      customerPhone: formData.phone.trim(),
      customerEmail: formData.email.trim(),
      customerVision: `Lash Look: ${formData.desiredLook}. Intensity: ${formData.intensityPreference}. Occasion: ${formData.occasion}. Previous Extensions: ${formData.previousExtensions}. Sensitivities: ${formData.productSensitivities}. Additional Notes: ${formData.additionalRequests.trim()}`,
      desiredLook: formData.desiredLook,
      intensity: formData.intensityPreference,
      occasion: formData.occasion,
      previousExtensions: formData.previousExtensions,
      sensitivities: formData.productSensitivities,
      hasInspirationImage: Boolean(uploadedImage),
      inspirationImageName: uploadedImage?.name || null,
      medicalConsentAcknowledged: true,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      source: 'The Lash Atelier Consultation Form'
    };

    try {
      if (salonDB.addCustomRequest) {
        salonDB.addCustomRequest(payload);
      }
    } catch (err) {
      console.warn('Consultation save warning:', err);
    }

    setSubmittedRequest(payload);
    setIsSubmitting(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto relative space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-[#465640] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedRequest ? (
          /* Submission Success State */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#263D2B]/10 text-[#263D2B] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-[10.5px] font-bold uppercase tracking-widest text-[#263D2B]">
                CONSULTATION SUBMITTED
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F]">
                Thank You, {submittedRequest.customerName}!
              </h3>
              <p className="text-xs text-[#6B7068] max-w-md mx-auto leading-relaxed">
                Your lash artistry profile has been submitted directly to Master Director <strong>Janki Khatroja</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs text-left space-y-2">
              <div className="flex items-center justify-between font-bold text-[#10110F]">
                <span>Reference ID:</span>
                <span className="font-mono text-[#263D2B]">#{submittedRequest.id}</span>
              </div>
              <div className="text-[#465640]">
                <strong>Look:</strong> {formData.desiredLook} • <strong>Intensity:</strong> {formData.intensityPreference} • <strong>Occasion:</strong> {formData.occasion}
              </div>
              {formData.productSensitivities && formData.productSensitivities !== 'None known' && (
                <div className="text-[#263D2B] bg-[#263D2B]/5 p-2 rounded-xl text-[11px] border border-[#263D2B]/15">
                  <strong>Recorded Sensitivities:</strong> {formData.productSensitivities} (Our artist will review this and perform a preliminary patch test).
                </div>
              )}
            </div>

            <div className="pt-3 flex justify-center">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto global-button !py-3 !px-8 text-white text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md"
              >
                Close &amp; Return to Lash Atelier
              </button>
            </div>

          </div>
        ) : (
          /* Consultation Form */
          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="space-y-1 pr-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[10px] font-bold uppercase tracking-wider text-[#263D2B]">
                <Sparkles className="w-3 h-3" />
                <span>Personalized Lash Atelier Consultation</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                Share Your Lash Vision
              </h3>
              <p className="text-xs text-[#6B7068]">
                Provide your style preferences and any sensitivities voluntarily so we can prepare your custom mapping.
              </p>
            </div>

            {/* Medical Disclaimer Banner */}
            <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-[#10110F] text-xs flex items-start gap-3 shadow-xs">
              <ShieldAlert className="w-4 h-4 text-[#263D2B] flex-shrink-0 mt-0.5" />
              <div className="space-y-1 text-[11px] leading-relaxed">
                <span className="font-bold text-[#10110F] uppercase tracking-wider block text-[10px]">
                  Eye Health &amp; Professional Guidance Advisory
                </span>
                <p className="text-[#465640]">
                  {MEDICAL_SAFETY_DISCLAIMER}
                </p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#10110F] block mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Maya Patel"
                  className="w-full h-10 px-3.5 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F] bg-white focus:outline-none focus:border-[#263D2B]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#10110F] block mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(613) 555-0199"
                  className="w-full h-10 px-3.5 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F] bg-white focus:outline-none focus:border-[#263D2B]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#10110F] block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="maya@example.ca"
                  className="w-full h-10 px-3.5 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F] bg-white focus:outline-none focus:border-[#263D2B]"
                />
              </div>
            </div>

            {/* Look & Preference Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="text-xs font-semibold text-[#10110F] block mb-1">
                  Desired Lash Silhouette
                </label>
                <select
                  value={formData.desiredLook}
                  onChange={(e) => setFormData({ ...formData, desiredLook: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F] bg-white focus:outline-none focus:border-[#263D2B]"
                >
                  <option value="Natural Classic">Natural Classic (1:1 Natural Definition)</option>
                  <option value="Wispy Flutter">Wispy Flutter (Kim-K Dimensional Spikes)</option>
                  <option value="Cat-Eye Flare">Cat-Eye Flare (Elongated Winged Corners)</option>
                  <option value="Doll-Eye Openness">Doll-Eye Openness (Centered Upward Openness)</option>
                  <option value="Textured Hybrid">Textured Hybrid (50/50 Classic &amp; Volume)</option>
                  <option value="Russian Glamour Volume">Russian Glamour Volume (Velvety Density)</option>
                  <option value="Mega Volume Couture">Mega Volume Couture (High-Impact Drama)</option>
                  <option value="Keratin Lash Lift &amp; Tint">Keratin Lash Lift &amp; Tint (100% Natural Lashes)</option>
                  <option value="Unsure / Recommend During Appointment">Unsure (Artist Evaluation During Appointment)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#10110F] block mb-1">
                  Intensity Preference
                </label>
                <select
                  value={formData.intensityPreference}
                  onChange={(e) => setFormData({ ...formData, intensityPreference: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F] bg-white focus:outline-none focus:border-[#263D2B]"
                >
                  <option value="Subtle Natural">Subtle Natural (Understated elegance)</option>
                  <option value="Balanced Medium">Balanced Medium (Noticeable yet daytime-friendly)</option>
                  <option value="Glamorous Dramatic">Glamorous Dramatic (Bold, velvety &amp; dense)</option>
                  <option value="Maximum Couture Mega">Maximum Couture Mega (Pitch-black editorial density)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#10110F] block mb-1">
                  Occasion or Event
                </label>
                <select
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F] bg-white focus:outline-none focus:border-[#263D2B]"
                >
                  <option value="Everyday Work &amp; Lifestyle">Everyday Work &amp; Lifestyle</option>
                  <option value="Wedding / Bridal Ceremony">Wedding / Bridal Ceremony</option>
                  <option value="Vacation &amp; Beach Travel">Vacation &amp; Beach Travel</option>
                  <option value="Festive Celebration (Diwali / Eid)">Festive Celebration (Diwali / Eid)</option>
                  <option value="Birthday or Gala Event">Birthday or Gala Event</option>
                  <option value="Photo Shoot / Editorial">Photo Shoot / Editorial</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#10110F] block mb-1">
                  Previous Lash Extension Experience
                </label>
                <select
                  value={formData.previousExtensions}
                  onChange={(e) => setFormData({ ...formData, previousExtensions: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F] bg-white focus:outline-none focus:border-[#263D2B]"
                >
                  <option value="Never (First-Time Client)">Never (First-Time Client)</option>
                  <option value="Had within past 6 months">Had within past 6 months</option>
                  <option value="Regular extension wearer">Regular extension wearer</option>
                  <option value="Currently wearing a set (Need removal/refill)">Currently wearing a set (Need removal/refill)</option>
                </select>
              </div>

            </div>

            {/* Product Sensitivities */}
            <div>
              <label className="text-xs font-semibold text-[#10110F] block mb-1">
                Known Product Sensitivities or Eye Concerns (Voluntary)
              </label>
              <input
                type="text"
                value={formData.productSensitivities}
                onChange={(e) => setFormData({ ...formData, productSensitivities: e.target.value })}
                placeholder="e.g. Sensitive to cyanoacrylate glue, wear daily contact lenses, dry eyes, or none known"
                className="w-full h-10 px-3.5 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F] bg-white focus:outline-none focus:border-[#263D2B]"
              />
              <span className="text-[10px] text-[#6B7068] mt-1 block">
                Preliminary 24-hour adhesive patch testing is complimentary upon request.
              </span>
            </div>

            {/* Additional Requests */}
            <div>
              <label className="text-xs font-semibold text-[#10110F] block mb-1">
                Additional Requests or Custom Notes
              </label>
              <textarea
                rows={2}
                value={formData.additionalRequests}
                onChange={(e) => setFormData({ ...formData, additionalRequests: e.target.value })}
                placeholder="Share any specific curl preferences, eye-shape questions, or wedding details..."
                className="w-full p-3 rounded-xl border border-[#DCE1D8] text-xs text-[#10110F] bg-white focus:outline-none focus:border-[#263D2B]"
              />
            </div>

            {/* Optional Inspiration Image Upload */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#10110F] block">
                Optional Inspiration Image Upload (Reference Only)
              </label>

              {uploadedImage ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#DCE1D8] bg-white">
                      <img
                        src={imagePreviewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#10110F] truncate max-w-xs">{uploadedImage.name}</div>
                      <div className="text-[10px] text-[#6B7068]">{uploadedImage.size} • Reference image</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-1.5 rounded-lg hover:bg-white text-rose-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-[#DCE1D8] hover:border-[#263D2B] rounded-2xl p-4 flex flex-col items-center justify-center gap-1.5 cursor-pointer bg-[#FBF9F4] transition-colors">
                  <Upload className="w-5 h-5 text-[#263D2B]" />
                  <span className="text-xs font-semibold text-[#10110F]">
                    Click to upload a reference lash photo
                  </span>
                  <span className="text-[10.5px] text-[#6B7068]">
                    Supports JPG, PNG, WEBP (Max 10MB)
                  </span>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}

              {fileError && (
                <p className="text-[11px] text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{fileError}</span>
                </p>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-2 border-t border-[#DCE1D8] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-[#DCE1D8] text-xs font-semibold text-[#465640] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="global-button !py-2.5 !px-7 text-white text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Lash Consultation'}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
