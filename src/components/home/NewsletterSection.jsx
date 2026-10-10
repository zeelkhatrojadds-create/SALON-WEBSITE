import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2, ArrowRight, Bell, ShieldCheck, Gift } from 'lucide-react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import salonDB from '../../db/salonDatabase';

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
    <section id="newsletter" className="relative w-full py-20 sm:py-24 bg-[#F7F4ED] text-[#10110F] overflow-hidden border-y border-[#DCE1D8]">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="bg-white border border-[#DCE1D8] rounded-3xl p-8 sm:p-12 md:p-14 shadow-md relative overflow-hidden" stagger={true}>
          
          {/* Top Pill Header */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[#263D2B] text-xs font-bold uppercase tracking-[0.22em] shadow-xs font-sans">
              <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>STAY IN THE GLOW</span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center max-w-2xl mx-auto mb-3">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#10110F] leading-[1.2]">
              Beauty Updates, Special Offers &amp; More
            </h2>
          </div>

          {/* Subtitle / Description */}
          <p className="text-center text-[#6B7068] text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed font-sans font-light">
            Be the first to discover our latest treatments, exclusive offers, beauty tips, and salon updates.
          </p>

          {/* Topic Selector Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 font-sans">
            <span className="text-xs text-[#6B7068] font-medium uppercase tracking-wider mr-1 hidden sm:inline-block">
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
                      ? 'bg-[#263D2B] text-white border-[#263D2B] font-medium shadow-sm'
                      : 'bg-[#F7F4ED] text-[#6B7068] border-[#DCE1D8] hover:border-[#263D2B] hover:text-[#10110F]'
                  }`}
                >
                  {isSelected ? '✓ ' : '+ '}{topic}
                </button>
              );
            })}
          </div>

          {/* Subscription Form or Success Card */}
          {status === 'success' ? (
            <div className="bg-[#F7F4ED] border border-[#DCE1D8] rounded-2xl p-6 sm:p-8 text-center space-y-4 max-w-lg mx-auto shadow-sm animate-fade-in font-sans">
              <div className="w-14 h-14 rounded-full bg-white border border-[#263D2B] text-[#263D2B] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8 text-[#263D2B]" />
              </div>
              <h3 className="font-serif text-2xl text-[#10110F] font-normal">
                Welcome to the Glow Club!
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7068] leading-relaxed font-light">
                Thank you for subscribing with <span className="text-[#10110F] font-semibold">{email}</span>. You're now on our VIP list to receive curated beauty updates and exclusive salon offers.
              </p>
              
              {/* Voucher Code Preview */}
              <div className="bg-white border border-dashed border-[#263D2B] rounded-xl p-3.5 flex items-center justify-between text-left max-w-xs mx-auto">
                <div className="flex items-center gap-2.5">
                  <Gift className="w-5 h-5 text-[#263D2B]" />
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B]">WELCOME VOUCHER</div>
                    <div className="text-sm font-mono font-bold text-[#10110F]">GLOW10</div>
                  </div>
                </div>
                <span className="text-[10px] bg-[#263D2B] text-white px-2 py-1 rounded font-semibold uppercase">10% OFF</span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-[#6B7068] underline hover:text-[#10110F] transition-colors cursor-pointer"
                >
                  Subscribe another email address
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="max-w-xl mx-auto space-y-4 font-sans">
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                
                {/* Email Input Field */}
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#6B7068]">
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
                    className="w-full h-14 pl-12 pr-4 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl sm:rounded-2xl text-sm text-[#10110F] placeholder-[#6B7068]/60 focus:outline-none focus:border-[#263D2B] focus:ring-1 focus:ring-[#263D2B] transition-all duration-200"
                    aria-label="Enter your email address"
                  />
                </div>

                {/* SUBSCRIBE Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="global-button h-14 !px-8 text-white font-bold text-xs sm:text-sm uppercase tracking-[0.2em] shadow-md flex items-center justify-center gap-2 cursor-pointer flex-shrink-0 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
                <p className="text-xs text-red-600 text-center font-medium">
                  {errorMessage}
                </p>
              )}

              {/* Disclaimer */}
              <p className="text-center text-[11px] sm:text-xs text-[#6B7068] leading-relaxed pt-1 font-light">
                By subscribing, you agree to receive beauty updates and promotional emails from us.
              </p>
            </form>
          )}

          {/* Guarantee Badges */}
          <div className="mt-10 pt-6 border-t border-[#DCE1D8] flex flex-wrap items-center justify-center gap-6 text-[11px] text-[#6B7068] font-sans">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#263D2B]" />
              <span>100% Privacy &amp; No Spam</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-[#263D2B]" />
              <span>Unsubscribe Anytime</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#263D2B]" />
              <span>Ottawa VIP Beauty Perks</span>
            </div>
          </div>

        </ScrollReveal>
      </div>
    </section>
  );
}
