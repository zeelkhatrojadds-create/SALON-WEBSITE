import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Home, Calendar, Phone, Search } from 'lucide-react';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = '404 - Page Not Found | GLAM GIRL BY JANKI';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const popularLinks = [
    { name: 'Book Appointment', path: '/book-appointment' },
    { name: 'Services & Rituals', path: '/services' },
    { name: 'Price List', path: '/price-list' },
    { name: 'Treatment Gallery', path: '/gallery' },
    { name: 'Frequently Asked Questions', path: '/contact#faqs' },
    { name: 'Contact Concierge', path: '/contact' }
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F4ED] text-[#10110F]">
      <div className="max-w-xl w-full text-center space-y-6 sm:space-y-8">
        
        {/* Main 404 Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-xl border border-[#DCE1D8] space-y-5">
          {/* Subtle Atelier Badge */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F7F4ED] text-[#263D2B] flex items-center justify-center mx-auto border border-[#DCE1D8] shadow-xs">
            <span className="font-serif text-2xl sm:text-3xl font-light text-[#263D2B]">404</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#263D2B]/10 border border-[#263D2B]/20 text-[#263D2B] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em]">
            <Sparkles className="w-3 h-3 text-[#263D2B]" />
            <span>PAGE NOT FOUND</span>
          </div>

          {/* Required Heading */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight">
            Oops! Page Not Found
          </h1>

          {/* Forest Green Accent Line */}
          <div className="w-12 h-[2px] bg-[#263D2B] mx-auto rounded-full" />

          {/* Required Message */}
          <p className="text-sm sm:text-base text-[#6B7068] leading-relaxed font-body font-light max-w-md mx-auto">
            The page you’re looking for may have moved or doesn’t exist.
          </p>

          {/* Required Buttons */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <Link
              to="/"
              id="btn-404-home"
              className="global-button w-full sm:w-auto min-h-[48px] !px-7 !py-3.5 text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <Link
              to="/services"
              id="btn-404-services"
              className="global-button-secondary w-full sm:w-auto min-h-[48px] !px-7 !py-3.5 text-xs font-bold flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer border border-[#DCE1D8] hover:border-[#263D2B]"
            >
              <Search className="w-4 h-4 text-[#263D2B]" />
              <span>Explore Services</span>
            </Link>
          </div>
        </div>

        {/* Helpful Quick Links Suggestion */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#DCE1D8]/80 text-left space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#263D2B] text-center sm:text-left">
            Popular Atelier Destinations
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {popularLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F4ED] text-[#6B7068] hover:text-[#10110F] transition-colors border border-transparent hover:border-[#DCE1D8]"
              >
                <span>{item.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#263D2B]" />
              </Link>
            ))}
          </div>
        </div>

        {/* Studio Concierge Contact */}
        <div className="text-center text-xs text-[#6B7068] space-y-1">
          <p>Need assistance finding a specific appointment or service?</p>
          <p>
            Call concierge at{' '}
            <a href="tel:+16162550549" className="font-semibold text-[#263D2B] hover:underline">
              +1 (616) 255-0549
            </a>{' '}
            or write to{' '}
            <a href="mailto:Glamgirlbyjanki@gmail.com" className="font-semibold text-[#263D2B] hover:underline">
              Glamgirlbyjanki@gmail.com
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
