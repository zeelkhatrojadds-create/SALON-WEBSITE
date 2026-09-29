import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ShieldCheck, Sparkles, AlertCircle, Share2 } from 'lucide-react';
import { ALL_SERVICES, getServiceById } from '../data/servicesData';
import Breadcrumbs from '../components/services/Breadcrumbs';
import BenefitsList from '../components/services/BenefitsList';
import RelatedServices from '../components/services/RelatedServices';
import salonDB from '../db/salonDatabase';

export default function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const service = salonDB.getServiceById(id) || getServiceById(id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setImageLoaded(false);
    setImageError(false);
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleBookAppointment = () => {
    navigate(`/book-appointment?service=${service.id}`);
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-[#140E11] text-white pt-32 pb-24">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="bg-[#1C1418] rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/10 animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-white/10 text-brand-pink flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              Service Not Found
            </h1>

            <p className="text-white/60 text-sm leading-relaxed mb-6">
              The beauty treatment you are looking for does not exist or may have been moved.
            </p>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white text-sm font-semibold shadow-lg shadow-brand-pink/30 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Services</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const benefits = service.benefits || [
    'Nourishes and restores vitality',
    'Improves texture and natural radiance',
    'Deep conditioning and hydration',
    'Relaxing luxury salon experience'
  ];

  const fallbackImage = 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="min-h-screen bg-[#140E11] text-white pt-24 sm:pt-28 pb-16 sm:pb-24">
      <div className="max-w-5xl xl:max-w-6xl w-full mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb & Share Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6">
          <div className="min-w-0 flex-1 overflow-x-auto">
            <Breadcrumbs
              treatmentName={service.name}
              categoryName={service.categoryName}
              categorySlug={service.category}
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white bg-white/5 px-3 py-1.5 rounded-full border border-white/10 shadow-xs transition-colors cursor-pointer"
              title="Copy page link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>

            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white bg-white/5 px-3 py-1.5 rounded-full border border-white/10 shadow-xs transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Services</span>
            </Link>
          </div>
        </div>

        {/* Main Service Detail Card — Exact Reference UI in Luxury Dark Style */}
        <div className="bg-[#1C1418]/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-300">
          
          {/* 1. Large Hero Image with Rounded Corners */}
          <div className="p-2.5 sm:p-4 pb-0">
            <div className="relative aspect-[16/10] sm:aspect-[21/10] w-full rounded-2xl overflow-hidden bg-white/5">
              <img
                src={imageError ? fallbackImage : service.image}
                alt={service.name}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`w-full h-full object-cover object-center transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-80'
                }`}
              />

              {/* Category Pill Tag */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                <span className="bg-black/60 backdrop-blur-md text-brand-pink-muted border border-white/10 font-semibold text-[10px] sm:text-xs px-2.5 sm:px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {service.categoryName}
                </span>
              </div>

              {/* Duration Pill */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-black/70 backdrop-blur-md text-white text-[11px] sm:text-xs font-medium px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full flex items-center gap-1.5 border border-white/10">
                <Clock className="w-3.5 h-3.5 text-brand-pink" />
                <span>{service.duration}</span>
              </div>
            </div>
          </div>

          {/* 2. Service Card Details */}
          <div className="p-4 sm:p-8 lg:p-10 space-y-3.5 sm:space-y-4">
            
            {/* Treatment Title */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              {service.name}
            </h1>

            {/* Price Tag matching Reference: "From $35" in Champagne / Rose Gold */}
            <div className="font-serif font-bold text-brand-pink-muted text-xl sm:text-3xl">
              From ${service.price} <span className="text-xs font-sans text-white/50 font-normal">(CAD)</span>
            </div>

            {/* Treatment Description */}
            <p className="text-[#F2ECE4]/80 text-xs sm:text-base leading-relaxed">
              {service.description}
            </p>

            {/* Checkmark Benefits List */}
            <div className="pt-2 pb-2 border-t border-white/10">
              <BenefitsList benefits={benefits} />
            </div>

            {/* Hygiene & Salon Quality Guarantee */}
            <div className="p-3.5 sm:p-4 bg-white/5 rounded-2xl border border-white/10 flex items-start sm:items-center gap-2.5 sm:gap-3 text-xs text-white/70">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-brand-pink flex-shrink-0 mt-0.5 sm:mt-0" />
              <span>100% Sanitized Tools • Non-toxic cruelty-free formulas • Certified Ottawa Artisans</span>
            </div>

            {/* 3. Full-Width Book Appointment Button */}
            <div className="pt-2 sm:pt-3">
              <button
                onClick={handleBookAppointment}
                className="w-full min-h-[48px] py-3.5 sm:py-4.5 px-6 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white font-semibold text-sm sm:text-base lg:text-lg flex items-center justify-center gap-2.5 shadow-xl shadow-brand-pink/30 hover:shadow-2xl hover:shadow-brand-pink/40 hover:scale-[1.01] active:scale-98 transition-all cursor-pointer uppercase tracking-wider"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Book Appointment</span>
              </button>
            </div>

          </div>
        </div>

        {/* Related Treatments in the same category */}
        <RelatedServices
          currentServiceId={service.id}
          category={service.category}
          categoryName={service.categoryName}
        />

      </div>
    </div>
  );
}
