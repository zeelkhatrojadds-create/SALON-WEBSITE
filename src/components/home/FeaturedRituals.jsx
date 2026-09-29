import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ALL_SERVICES } from '../../data/servicesData';
import ServiceCard from '../common/ServiceCard';

export default function FeaturedRituals() {
  const navigate = useNavigate();

  // Find the 4 featured treatments: Hair Spa, Balayage, Signature/Deep Facial, Bridal Makeup
  const featuredIds = ['hair-spa', 'balayage', 'deep-cleansing-facial', 'bridal-makeup'];
  
  const featuredTreatments = featuredIds.map((id) => {
    return ALL_SERVICES.find((s) => s.id === id) || ALL_SERVICES[0];
  });

  const handleQuickBook = (service) => {
    navigate(`/book-appointment?service=${service.id}`);
  };

  const handleViewDetails = (service) => {
    navigate(`/services/${service.id}`);
  };

  return (
    <section className="w-full py-16 sm:py-24 bg-[#140E11] text-white relative">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-20 mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-brand-gold-light text-xs font-bold uppercase tracking-[0.24em] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
              <span>SIGNATURE EXPERIENCES</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Discover Your Beauty Ritual
            </h2>

            <p className="text-[#F2ECE4]/70 text-sm sm:text-base lg:text-lg leading-relaxed mt-3">
              Personalized luxury beauty and wellness treatments tailored to help you feel confident, refreshed, and beautifully you.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-brand-pink hover:text-brand-pink-hover group whitespace-nowrap"
          >
            <span>Explore All 86 Treatments</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-Column Featured Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {featuredTreatments.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onQuickBook={handleQuickBook}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
