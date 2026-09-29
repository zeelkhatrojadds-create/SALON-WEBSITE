import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';
import { ALL_SERVICES } from '../../data/servicesData';

export default function RelatedServices({ currentServiceId, category, categoryName }) {
  const navigate = useNavigate();

  const related = ALL_SERVICES.filter(
    (s) => s.category === category && s.id !== currentServiceId
  ).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-14 sm:mt-20 pt-10 sm:pt-14 border-t border-white/10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#E95E92] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-brand-pink" />
            <span>MORE IN {categoryName?.toUpperCase()}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Related Treatments You’ll Love
          </h2>
        </div>

        <Link
          to={`/services?category=${category}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-pink-muted hover:text-brand-pink group"
        >
          <span>View all {categoryName}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Related Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {related.map((service) => (
          <div
            key={service.id}
            className="bg-[#1C1418]/90 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 shadow-xl hover:border-brand-pink/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-brand-pink-muted border border-white/10">
                {service.duration}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-bold text-white text-base mb-1.5 group-hover:text-brand-pink-muted transition-colors">
                  {service.name}
                </h3>
                <p className="text-white/70 text-xs line-clamp-2 leading-relaxed mb-3">
                  {service.description}
                </p>
              </div>

              {/* Price & View CTA */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="font-serif font-bold text-white text-sm sm:text-base">
                  CA${service.price}
                </span>

                <button
                  onClick={() => {
                    navigate(`/book-appointment?service=${service.id}`);
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-brand-pink text-white text-xs font-semibold transition-all cursor-pointer"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
