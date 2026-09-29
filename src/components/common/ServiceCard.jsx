import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Calendar } from 'lucide-react';

export default function ServiceCard({ service, onQuickBook, onViewDetails }) {
  const [imgSrc, setImgSrc] = useState(service.image);
  const navigate = useNavigate();

  const handleImageError = () => {
    setImgSrc('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80');
  };

  const handleBook = () => {
    if (onQuickBook) {
      onQuickBook(service);
    } else {
      navigate(`/book-appointment?service=${service.id}`);
    }
  };

  return (
    <div 
      onClick={handleBook}
      className="bg-[#1C1418]/90 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 shadow-2xl hover:border-brand-pink/50 hover:shadow-brand-pink/15 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 w-full cursor-pointer"
    >
      {/* Treatment Image Container */}
      <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-white/5">
        <img
          src={imgSrc}
          alt={service.name}
          onError={handleImageError}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1418] via-transparent to-black/20 opacity-80 group-hover:opacity-50 transition-opacity" />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3">
          <span className="bg-black/60 backdrop-blur-md text-brand-pink-muted border border-white/10 font-semibold text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
            {service.categoryName}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 lg:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Treatment Title */}
          <h3 className="font-serif font-bold text-white text-base sm:text-lg lg:text-xl leading-snug group-hover:text-brand-pink-muted transition-colors mb-1.5">
            {service.name}
          </h3>

          {/* Short Description */}
          <p className="text-white/70 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3 sm:mb-4">
            {service.description}
          </p>

          {/* Price & Duration */}
          <div className="flex items-center justify-between text-xs py-2 border-t border-white/10 mb-3 sm:mb-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-white/50 block -mb-0.5">Price</span>
              <span className="font-serif font-bold text-white text-base sm:text-lg">
                CA${service.price}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-white/70 font-medium text-[11px] sm:text-xs bg-white/5 px-2.5 sm:px-3 py-1 rounded-full border border-white/10">
              <Clock className="w-3.5 h-3.5 text-brand-pink flex-shrink-0" />
              <span>{service.duration}</span>
            </div>
          </div>
        </div>

        {/* Action Button: Direct Book */}
        <div className="pt-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleBook();
            }}
            className="w-full min-h-[44px] py-2.5 px-4 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-brand-pink/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>
    </div>
  );
}
