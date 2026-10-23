import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  X, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Phone, 
  Calendar, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  KeyRound
} from 'lucide-react';
import Logo from '../common/Logo';
import { api } from '../../services/api';

export default function AuthModal({ isOpen, onClose, initialView = 'login', redirectAfter = null }) {
  const [view, setView] = useState(initialView); // 'login' | 'register' | 'forgot' | 'reset'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regData, setRegData] = useState({
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

  // Forgot / Reset state
  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    setErrorMessage('');
    setSuccessMessage('');
    onClose();
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const res = await api.login(loginEmail, loginPassword);
      if (res && res.success) {
        setSuccessMessage('Welcome back! Redirecting...');
        setTimeout(() => {
          handleClose();
          if (redirectAfter) {
            navigate(redirectAfter);
          } else if (res.user && (res.user.role === 'admin' || res.user.role === 'staff')) {
            navigate('/admin');
          } else {
            navigate('/customer-dashboard');
          }
        }, 600);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (regData.password !== regData.confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify.');
      return;
    }

    if (!regData.termsAccepted) {
      setErrorMessage('Please accept the Terms & Conditions and Privacy Policy to create your account.');
      return;
    }

    setLoading(true);

    try {
      await api.registerCustomer({
        name: regData.name,
        preferredName: regData.preferredName,
        email: regData.email,
        phone: regData.phone,
        dateOfBirth: regData.dateOfBirth,
        password: regData.password,
        termsAccepted: regData.termsAccepted,
        marketingEmailConsent: regData.marketingEmailConsent,
        marketingSmsConsent: regData.marketingSmsConsent,
        preferredContactMethod: regData.preferredContactMethod
      });

      setSuccessMessage('Account created successfully! Welcome to GLAM GIRL BY JANKI.');
      setTimeout(() => {
        handleClose();
        if (redirectAfter) {
          navigate(redirectAfter);
        } else {
          navigate('/customer-dashboard');
        }
      }, 700);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to register account.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const res = await api.requestPasswordReset(resetEmail);
      setSuccessMessage(res.message || 'Verification code generated.');
      setView('reset');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to generate reset code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const res = await api.resetPasswordWithToken(resetEmail, resetCode, newPassword);
      setSuccessMessage(res.message || 'Password updated successfully! You may now sign in.');
      setTimeout(() => {
        setLoginEmail(resetEmail);
        setView('login');
      }, 1000);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-6 bg-[#F7F4ED] border-b border-[#DCE1D8] flex items-center justify-between relative">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#263D2B] block">
              PATRON PORTAL
            </span>
            <h2 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal mt-0.5">
              {view === 'login' && 'Sign In to Your Account'}
              {view === 'register' && 'Create Patron Account'}
              {view === 'forgot' && 'Reset Your Password'}
              {view === 'reset' && 'Enter Verification Code'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-white border border-[#DCE1D8] text-[#10110F] hover:bg-[#DCE1D8] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs (Login vs Register) */}
        {(view === 'login' || view === 'register') && (
          <div className="flex border-b border-[#DCE1D8] bg-white">
            <button
              type="button"
              onClick={() => { setView('login'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider text-center transition-colors cursor-pointer ${
                view === 'login'
                  ? 'border-b-2 border-[#263D2B] text-[#263D2B] bg-[#F7F4ED]/50'
                  : 'text-[#6B7068] hover:text-[#10110F]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setView('register'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider text-center transition-colors cursor-pointer ${
                view === 'register'
                  ? 'border-b-2 border-[#263D2B] text-[#263D2B] bg-[#F7F4ED]/50'
                  : 'text-[#6B7068] hover:text-[#10110F]'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          {/* Status Messages */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-[#263D2B] text-xs flex items-center gap-2 animate-fade-in">
              <CheckCircle className="w-4 h-4 shrink-0 text-[#263D2B]" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* VIEW: LOGIN */}
          {view === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7068]" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-sm text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none focus:border-[#263D2B] focus:ring-1 focus:ring-[#263D2B] transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F]">
                    Password *
                  </label>
                  <button
                    type="button"
                    onClick={() => { setResetEmail(loginEmail); setView('forgot'); setErrorMessage(''); }}
                    className="text-[11px] font-semibold text-[#263D2B] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7068]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-11 pl-10 pr-11 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-sm text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none focus:border-[#263D2B] focus:ring-1 focus:ring-[#263D2B] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B7068] hover:text-[#10110F] cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Demo Account Helper */}
              <div className="p-3 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-[11px] text-[#6B7068] flex items-center justify-between">
                <span>Demo Patron: <strong>priya@example.ca</strong></span>
                <button
                  type="button"
                  onClick={() => {
                    setLoginEmail('priya@example.ca');
                    setLoginPassword('patron123');
                  }}
                  className="font-bold text-[#263D2B] hover:underline cursor-pointer"
                >
                  Fill Demo
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="global-button w-full !h-11 text-xs font-bold uppercase tracking-widest text-white shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? 'Signing In...' : 'Sign In to Account'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* VIEW: REGISTER */}
          {view === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6B7068]" />
                    <input
                      type="text"
                      required
                      value={regData.name}
                      onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                      placeholder="e.g. Priya Sharma"
                      className="w-full h-10 pl-9 pr-3 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1">
                    Preferred Name
                  </label>
                  <input
                    type="text"
                    value={regData.preferredName}
                    onChange={(e) => setRegData({ ...regData, preferredName: e.target.value })}
                    placeholder="Nickname (optional)"
                    className="w-full h-10 px-3 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6B7068]" />
                    <input
                      type="email"
                      required
                      value={regData.email}
                      onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full h-10 pl-9 pr-3 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6B7068]" />
                    <input
                      type="tel"
                      required
                      value={regData.phone}
                      onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                      placeholder="(613) 555-0199"
                      className="w-full h-10 pl-9 pr-3 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1">
                  Date of Birth <span className="text-[#6B7068] font-normal">(Optional, for birthday privileges)</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6B7068]" />
                  <input
                    type="date"
                    value={regData.dateOfBirth}
                    onChange={(e) => setRegData({ ...regData, dateOfBirth: e.target.value })}
                    className="w-full h-10 pl-9 pr-3 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6B7068]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={regData.password}
                      onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                      placeholder="Min 6 characters"
                      className="w-full h-10 pl-9 pr-9 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7068]"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6B7068]" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={regData.confirmPassword}
                      onChange={(e) => setRegData({ ...regData, confirmPassword: e.target.value })}
                      placeholder="Repeat password"
                      className="w-full h-10 pl-9 pr-9 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7068]"
                    >
                      {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Consent Checkboxes */}
              <div className="space-y-2.5 pt-2 border-t border-[#DCE1D8]">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#10110F]">
                  <input
                    type="checkbox"
                    required
                    checked={regData.termsAccepted}
                    onChange={(e) => setRegData({ ...regData, termsAccepted: e.target.checked })}
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
                    checked={regData.marketingEmailConsent}
                    onChange={(e) => setRegData({ ...regData, marketingEmailConsent: e.target.checked })}
                    className="mt-0.5 rounded border-[#DCE1D8] text-[#263D2B] focus:ring-[#263D2B]"
                  />
                  <span>Receive curated seasonal offers, festival beauty edits, and anniversary gifts via email.</span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#6B7068]">
                  <input
                    type="checkbox"
                    checked={regData.marketingSmsConsent}
                    onChange={(e) => setRegData({ ...regData, marketingSmsConsent: e.target.checked })}
                    className="mt-0.5 rounded border-[#DCE1D8] text-[#263D2B] focus:ring-[#263D2B]"
                  />
                  <span>Receive appointment reminders and concierge updates via SMS text.</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="global-button w-full !h-11 text-xs font-bold uppercase tracking-widest text-white shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? 'Creating Account...' : 'Complete Registration'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* VIEW: FORGOT PASSWORD */}
          {view === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <p className="text-xs text-[#6B7068]">
                Enter the email address registered with your patron account. We will generate a secure 6-digit one-time reset code.
              </p>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                  Account Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7068]" />
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-sm text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="global-button-secondary flex-1 !h-11 text-xs font-bold uppercase"
                >
                  Back to Sign In
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="global-button flex-1 !h-11 text-xs font-bold uppercase text-white"
                >
                  {loading ? 'Sending...' : 'Send Reset Code'}
                </button>
              </div>
            </form>
          )}

          {/* VIEW: ENTER CODE & RESET PASSWORD */}
          {view === 'reset' && (
            <form onSubmit={handleResetSubmit} className="space-y-4">
              <p className="text-xs text-[#6B7068]">
                Check your notifications or the confirmation message for your 6-digit reset code.
              </p>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                  6-Digit Verification Code *
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7068]" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    placeholder="e.g. 482910"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-sm text-[#10110F] font-mono tracking-widest focus:outline-none focus:border-[#263D2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                  New Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7068]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full h-11 pl-10 pr-11 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-sm text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B7068]"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setView('forgot')}
                  className="global-button-secondary flex-1 !h-11 text-xs font-bold uppercase"
                >
                  Resend Code
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="global-button flex-1 !h-11 text-xs font-bold uppercase text-white"
                >
                  {loading ? 'Updating...' : 'Set New Password'}
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Modal Footer Note */}
        <div className="p-4 bg-[#F7F4ED]/60 border-t border-[#DCE1D8] text-center text-[11px] text-[#6B7068] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#263D2B]" />
          <span>Encrypted with SHA-256 luxury privacy protection.</span>
        </div>
      </div>
    </div>
  );
}
