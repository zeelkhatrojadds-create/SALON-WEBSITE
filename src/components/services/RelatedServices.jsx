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
    <section className="mt-14 sm:mt-20 pt-10 sm:pt-14 border-t border-[#DCE1D8]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#263D2B]/10 border border-[#263D2B]/20 text-[#263D2B] text-xs font-bold uppercase tracking-wider mb-2 font-sans">
            <Sparkles className="w-3 h-3 text-[#263D2B]" />
            <span>MORE IN {categoryName?.toUpperCase()}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#10110F]">
            Related Treatments You’ll Love
          </h2>
        </div>

        <Link
          to={`/services?category=${category}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#263D2B] hover:text-[#1C2E20] group font-sans"
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
            className="bg-white rounded-3xl overflow-hidden border border-[#DCE1D8] shadow-md hover:border-[#263D2B]/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 font-sans"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[#F7F4ED]">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-2.5 right-2.5 bg-[#10110F]/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white border border-white/10">
                {service.duration}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-normal text-[#10110F] text-base mb-1.5 group-hover:text-[#263D2B] transition-colors">
                  {service.name}
                </h3>
                <p className="text-[#6B7068] text-xs line-clamp-2 leading-relaxed mb-3">
                  {service.description}
                </p>
              </div>

              {/* Price & View CTA */}
              <div className="pt-3 border-t border-[#DCE1D8] flex items-center justify-between">
                <span className="font-serif font-normal text-[#10110F] text-sm sm:text-base">
                  CA${service.price}
                </span>

                <button
                  onClick={() => {
                    navigate(`/book-appointment?service=${service.id}`);
                  }}
                  className="global-button !px-4 !py-1.5 text-white text-xs font-semibold cursor-pointer"
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
