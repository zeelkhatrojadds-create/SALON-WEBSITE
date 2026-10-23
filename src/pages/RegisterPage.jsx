import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { api } from '../services/api';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    preferredName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    marketingEmailConsent: false,
    marketingSmsConsent: false,
    preferredContactMethod: 'email'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/customer-dashboard';
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify your password confirmation.');
      return;
    }

    if (!formData.termsAccepted) {
      setError('You must accept the Terms & Conditions and Privacy Policy.');
      return;
    }

    setLoading(true);

    try {
      await api.registerCustomer({
        name: formData.name,
        preferredName: formData.preferredName,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        password: formData.password,
        termsAccepted: formData.termsAccepted,
        marketingEmailConsent: formData.marketingEmailConsent,
        marketingSmsConsent: formData.marketingSmsConsent,
        preferredContactMethod: formData.preferredContactMethod
      });

      setSuccess('Patron account created successfully! Preparing your luxury dashboard...');
      setTimeout(() => {
        navigate(redirectUrl);
      }, 700);
    } catch (err) {
      setError(err.message || 'Unable to complete registration. Please check the provided information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-[#F7F4ED] flex flex-col justify-center items-center">
      <div className="w-full max-w-lg">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7068] hover:text-[#10110F] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Boutique</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-[#DCE1D8] shadow-xl p-6 sm:p-8 space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#263D2B] block">
              PATRON MEMBERSHIP
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
              Create Your Profile
            </h1>
            <p className="text-xs text-[#6B7068] max-w-sm mx-auto">
              Join GLAM GIRL BY JANKI to track appointments, manage beauty preferences, and enjoy seasonal benefits.
            </p>
          </div>

          {/* Feedback Alerts */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-[#263D2B] text-xs flex items-center gap-2 animate-fade-in">
              <CheckCircle className="w-4 h-4 shrink-0 text-[#263D2B]" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7068]" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-sm text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                  Preferred Name
                </label>
                <input
                  type="text"
                  value={formData.preferredName}
                  onChange={(e) => setFormData({ ...formData, preferredName: e.target.value })}
                  placeholder="Nickname / Call name"
                  className="w-full h-11 px-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-sm text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                />
              </div>
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7068]" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-sm text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7068]" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(613) 555-0199"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-sm text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  />
                </div>
              </div>
            </div>

            {/* Date of Birth & Preferred Contact Method */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                  Date of Birth <span className="text-[#6B7068] font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7068]" />
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-sm text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                  Preferred Contact
                </label>
                <select
                  value={formData.preferredContactMethod}
                  onChange={(e) => setFormData({ ...formData, preferredContactMethod: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-sm text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                >
                  <option value="email">Email</option>
                  <option value="sms">SMS Text</option>
                  <option value="phone">Phone Call</option>
                </select>
              </div>
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7068]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Min 6 characters"
                    className="w-full h-11 pl-10 pr-10 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-sm text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B7068]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7068]" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Repeat password"
                    className="w-full h-11 pl-10 pr-10 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-sm text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B7068]"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Consents */}
            <div className="space-y-3 pt-3 border-t border-[#DCE1D8]">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#10110F]">
                <input
                  type="checkbox"
                  required
                  checked={formData.termsAccepted}
                  onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                  className="mt-0.5 rounded border-[#DCE1D8] text-[#263D2B] focus:ring-[#263D2B]"
                />
                <span>
                  I accept the{' '}
                  <Link to="/terms-and-conditions" target="_blank" className="font-semibold text-[#263D2B] hover:underline">
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy-policy" target="_blank" className="font-semibold text-[#263D2B] hover:underline">
                    Privacy Policy
                  </Link>
                  . *
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#6B7068]">
                <input
                  type="checkbox"
                  checked={formData.marketingEmailConsent}
                  onChange={(e) => setFormData({ ...formData, marketingEmailConsent: e.target.checked })}
                  className="mt-0.5 rounded border-[#DCE1D8] text-[#263D2B] focus:ring-[#263D2B]"
                />
                <span>Receive curated festival beauty promotions and seasonal discounts via email.</span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#6B7068]">
                <input
                  type="checkbox"
                  checked={formData.marketingSmsConsent}
                  onChange={(e) => setFormData({ ...formData, marketingSmsConsent: e.target.checked })}
                  className="mt-0.5 rounded border-[#DCE1D8] text-[#263D2B] focus:ring-[#263D2B]"
                />
                <span>Receive SMS text updates for booking reminders and schedule notifications.</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="global-button w-full !h-11 text-xs font-bold uppercase tracking-widest text-white shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              {loading ? 'Creating Account...' : 'Complete Registration'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Switch to Login */}
          <div className="pt-4 border-t border-[#DCE1D8] text-center text-xs text-[#6B7068]">
            <span>Already have a patron account? </span>
            <Link
              to={`/login${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
              className="font-bold text-[#263D2B] hover:underline"
            >
              Sign In
            </Link>
          </div>

        </div>

        {/* Security badge */}
        <div className="mt-6 text-center text-[11px] text-[#6B7068] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#263D2B]" />
          <span>No plain text passwords stored. Customer privileges strictly isolated.</span>
        </div>

      </div>
    </div>
  );
}
