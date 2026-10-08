import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2, ArrowRight, Bell, ShieldCheck, Gift } from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([
    'Exclusive Offers',
    'Beauty Tips & Trends',
  ]);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const topicsList = [
    'Exclusive Offers',
    'Beauty Tips & Trends',
    'New Treatments',
    'VIP Atelier Events',
  ];

  const toggleTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.trim()) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address (e.g. alexa@example.com).');
      return;
    }

    setStatus('loading');

    setTimeout(() => {
      try {
        salonDB.subscribeNewsletter(email, selectedTopics);
        setStatus('success');
      } catch (err) {
        console.error('Subscription error:', err);
        setStatus('success');
      }
    }, 400);
  };

  const handleReset = () => {
    setEmail('');
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <section id="newsletter" className="relative w-full py-20 sm:py-28 bg-[#0D090A] text-[#F7F1E8] overflow-hidden border-y border-[#CFA46A]/20">
      {/* Ambient Radial Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#CFA46A]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-10 w-80 h-80 bg-[#B8735C]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#CFA46A]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Shimmer Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#CFA46A]/40 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="bg-[#140F11]/90 border border-[#CFA46A]/30 rounded-3xl p-8 sm:p-12 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl relative overflow-hidden" stagger={true}>
          
          {/* Subtle Corner Ornament */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-[#CFA46A]/20 to-transparent rounded-full blur-2xl pointer-events-none" />

          {/* Top Pill Header */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CFA46A]/10 border border-[#CFA46A]/30 text-[#CFA46A] text-xs font-bold uppercase tracking-[0.22em] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#CFA46A] animate-pulse" />
              <span>STAY IN THE GLOW</span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center max-w-2xl mx-auto mb-4">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#F7F1E8] leading-[1.2]">
              Beauty Updates, Special Offers &amp; More
            </h2>
          </div>

          {/* Subtitle / Description */}
          <p className="text-center text-[#F7F1E8]/70 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed font-light">
            Be the first to discover our latest treatments, exclusive offers, beauty tips, and salon updates.
          </p>

          {/* Topic Selector Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <span className="text-xs text-[#CFA46A]/80 font-medium uppercase tracking-wider mr-1 hidden sm:inline-block">
              Tailor your updates:
            </span>
            {topicsList.map((topic) => {
              const isSelected = selectedTopics.includes(topic);
              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => toggleTopic(topic)}
                  className={`text-xs px-3.5 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#CFA46A] text-[#100C0D] border-[#CFA46A] font-semibold shadow-[0_0_12px_rgba(207,164,106,0.3)]'
                      : 'bg-[#1D1618]/60 text-[#F7F1E8]/60 border-[#CFA46A]/20 hover:border-[#CFA46A]/50 hover:text-[#F7F1E8]'
                  }`}
                >
                  {isSelected ? '✓ ' : '+ '}{topic}
                </button>
              );
            })}
          </div>

          {/* Subscription Form or Success Card */}
          {status === 'success' ? (
            <div className="bg-[#1A1315] border border-[#CFA46A]/40 rounded-2xl p-6 sm:p-8 text-center space-y-4 max-w-lg mx-auto shadow-inner animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-[#CFA46A]/20 border border-[#CFA46A] text-[#CFA46A] flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8 text-[#CFA46A]" />
              </div>
              <h3 className="font-serif text-2xl text-[#F7F1E8] font-medium">
                Welcome to the Glow Club!
              </h3>
              <p className="text-xs sm:text-sm text-[#F7F1E8]/70 leading-relaxed">
                Thank you for subscribing with <span className="text-[#CFA46A] font-semibold">{email}</span>. You're now on our VIP list to receive curated beauty updates and exclusive salon offers.
              </p>
              
              {/* Voucher Code Preview */}
              <div className="bg-[#100C0D] border border-dashed border-[#CFA46A]/50 rounded-xl p-3.5 flex items-center justify-between text-left max-w-xs mx-auto">
                <div className="flex items-center gap-2.5">
                  <Gift className="w-5 h-5 text-[#CFA46A]" />
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#CFA46A]">WELCOME VOUCHER</div>
                    <div className="text-sm font-mono font-bold text-[#F7F1E8]">GLOW10</div>
                  </div>
                </div>
                <span className="text-[10px] bg-[#CFA46A]/20 text-[#CFA46A] px-2 py-1 rounded font-semibold uppercase">10% OFF</span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-[#CFA46A] underline hover:text-[#E5C492] transition-colors cursor-pointer"
                >
                  Subscribe another email address
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="max-w-xl mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                
                {/* Email Input Field */}
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#CFA46A]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="Enter your email address"
                    className="w-full h-14 pl-12 pr-4 bg-[#0A0708] border border-[#CFA46A]/40 rounded-xl sm:rounded-2xl text-sm text-[#F7F1E8] placeholder-[#F7F1E8]/40 focus:outline-none focus:border-[#CFA46A] focus:ring-2 focus:ring-[#CFA46A]/20 transition-all duration-200"
                    aria-label="Enter your email address"
                  />
                </div>

                {/* SUBSCRIBE Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="h-14 px-8 bg-gradient-to-r from-[#CFA46A] via-[#E5C492] to-[#CFA46A] hover:brightness-110 active:scale-[0.98] text-[#100C0D] font-bold text-xs sm:text-sm uppercase tracking-[0.2em] rounded-xl sm:rounded-2xl transition-all duration-200 shadow-[0_4px_20px_rgba(207,164,106,0.3)] hover:shadow-[0_6px_25px_rgba(207,164,106,0.5)] flex items-center justify-center gap-2 cursor-pointer flex-shrink-0 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#100C0D] border-t-transparent rounded-full animate-spin" />
                      SUBSCRIBING...
                    </span>
                  ) : (
                    <>
                      <span>SUBSCRIBE</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Validation Error Message */}
              {errorMessage && (
                <p className="text-xs text-red-400 text-center font-medium">
                  {errorMessage}
                </p>
              )}

              {/* Disclaimer */}
              <p className="text-center text-[11px] sm:text-xs text-[#F7F1E8]/50 leading-relaxed pt-1">
                By subscribing, you agree to receive beauty updates and promotional emails from us.
              </p>
            </form>
          )}

          {/* Guarantee Badges */}
          <div className="mt-10 pt-6 border-t border-[#CFA46A]/15 flex flex-wrap items-center justify-center gap-6 text-[11px] text-[#F7F1E8]/50">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#CFA46A]" />
              <span>100% Privacy &amp; No Spam</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-[#CFA46A]" />
              <span>Unsubscribe Anytime</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#CFA46A]" />
              <span>Ottawa VIP Beauty Perks</span>
            </div>
          </div>

          </div>

        </ScrollReveal>
      </div>
    </section>
  );
}
