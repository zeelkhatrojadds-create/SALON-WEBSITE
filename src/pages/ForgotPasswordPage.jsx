import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  KeyRound, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle,
  ArrowLeft 
} from 'lucide-react';
import { api } from '../services/api';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: Email, 2: Code + New Password
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await api.requestPasswordReset(email);
      setSuccess(res.message || 'Verification code sent to your email.');
      if (res.resetCode) {
        setResetCode(res.resetCode);
      }
      setStep(2);
    } catch (err) {
      setError(err.message || 'Failed to request verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);

    try {
      const res = await api.resetPasswordWithToken(email, resetCode, newPassword);
      setSuccess(res.message || 'Password reset successfully! Redirecting to sign in...');
      setTimeout(() => {
        navigate('/login');
      }, 1200);
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please check your verification code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-[#F7F4ED] flex flex-col justify-center items-center">
      <div className="w-full max-w-md">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link 
            to="/login" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7068] hover:text-[#10110F] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-[#DCE1D8] shadow-xl p-6 sm:p-8 space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#263D2B] block">
              SECURITY VERIFICATION
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
              {step === 1 ? 'Reset Password' : 'Set New Password'}
            </h1>
            <p className="text-xs text-[#6B7068] max-w-xs mx-auto">
              {step === 1 
                ? 'Enter your patron email address to receive a secure 6-digit verification code.'
                : 'Enter your 6-digit code and choose a new password for your account.'
              }
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

          {step === 1 && (
            <form onSubmit={handleRequestCode} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                  Account Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7068]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-sm text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="global-button w-full !h-11 text-xs font-bold uppercase tracking-widest text-white shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? 'Sending Code...' : 'Request Reset Code'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
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
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-sm font-mono tracking-widest text-[#10110F] focus:outline-none focus:border-[#263D2B]"
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
                  Confirm New Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7068]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-sm text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="global-button-secondary flex-1 !h-11 text-xs font-bold uppercase"
                >
                  Change Email
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="global-button flex-1 !h-11 text-xs font-bold uppercase text-white shadow-md"
                >
                  {loading ? 'Updating...' : 'Save Password'}
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Security badge */}
        <div className="mt-6 text-center text-[11px] text-[#6B7068] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#263D2B]" />
          <span>Verification codes expire in 60 minutes.</span>
        </div>

      </div>
    </div>
  );
}
