import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-3 sm:px-6 bg-[#FAF7F2]">
      <div className="max-w-md w-full text-center bg-white rounded-3xl p-6 sm:p-12 shadow-xl border border-brand-pink/20 space-y-4 sm:space-y-5">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-pink-light text-brand-pink flex items-center justify-center mx-auto border border-brand-pink/30">
          <Sparkles className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>

        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-brand-pink">
          404 ERROR • PAGE NOT FOUND
        </span>

        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#2E1620]">
          Looking for Beauty?
        </h1>

        <p className="text-xs sm:text-sm text-[#8A6A74] leading-relaxed">
          The page you are looking for doesn't exist or has moved. Explore our treatment menu or book your salon appointment below.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white text-xs font-semibold shadow-md shadow-brand-pink/25 flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>

          <Link
            to="/services"
            className="w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-full bg-white hover:bg-brand-pink-light text-brand-pink border border-brand-pink/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
