import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import Logo from '../components/common/Logo';
import { api } from '../services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    setLoading(true);

    try {
      const res = await api.login(email, password);
      if (res && res.success) {
        setSuccess('Welcome back! Loading your patron suite...');
        setTimeout(() => {
          if (res.user && (res.user.role === 'admin' || res.user.role === 'staff')) {
            navigate('/admin');
          } else {
            navigate(redirectUrl);
          }
        }, 500);
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail('priya@example.ca');
    setPassword('patron123');
    setError('');
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-[#F7F4ED] flex flex-col justify-center items-center">
      <div className="w-full max-w-md">
        
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
              PATRON PORTAL
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
              Welcome Back
            </h1>
            <p className="text-xs text-[#6B7068] max-w-xs mx-auto">
              Sign in to manage your appointments, review beauty rituals, and access exclusive festival privileges.
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
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7068]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-semibold text-[#263D2B] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7068]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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

            {/* Quick Demo Access */}
            <div className="p-3 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-[11px] text-[#6B7068] flex items-center justify-between">
              <span>Demo Patron: <strong>priya@example.ca</strong></span>
              <button
                type="button"
                onClick={handleDemoFill}
                className="font-bold text-[#263D2B] hover:underline cursor-pointer"
              >
                1-Click Fill
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="global-button w-full !h-11 text-xs font-bold uppercase tracking-widest text-white shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? 'Authenticating...' : 'Sign In to Account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Switch to Register */}
          <div className="pt-4 border-t border-[#DCE1D8] text-center text-xs text-[#6B7068]">
            <span>Don't have a patron profile yet? </span>
            <Link
              to={`/register${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
              className="font-bold text-[#263D2B] hover:underline"
            >
              Create Account
            </Link>
          </div>

        </div>

        {/* Security badge */}
        <div className="mt-6 text-center text-[11px] text-[#6B7068] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#263D2B]" />
          <span>Protected with SHA-256 client encryption & role isolation.</span>
        </div>

      </div>
    </div>
  );
}
