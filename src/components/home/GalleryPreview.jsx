import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { InstagramIcon } from '../common/SocialIcons';
import { GALLERY_ITEMS } from '../../data/salonData';

export default function GalleryPreview() {
  return (
    <section className="w-full py-16 sm:py-24 bg-white">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-20 mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-pink-light border border-brand-pink/20 mb-3">
              <InstagramIcon className="w-3.5 h-3.5 text-brand-pink" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">
                VISUAL SHOWCASE
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-espresso">
              Radiance In Every Detail
            </h2>
          </div>

          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-pink hover:text-brand-pink-hover group"
          >
            <span>View Full Portfolio Gallery</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl overflow-hidden aspect-square bg-brand-pink-light/30 shadow-card hover:shadow-hover transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso/80 via-brand-espresso/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6 text-white" />
              
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-brand-pink text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1.5">
                  {item.category}
                </span>
                <h4 className="font-serif font-medium text-sm sm:text-lg leading-tight drop-shadow-sm">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
