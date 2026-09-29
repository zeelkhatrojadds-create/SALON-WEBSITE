import React, { useState } from 'react';
import { InstagramIcon } from '../components/common/SocialIcons';
import { GALLERY_ITEMS } from '../data/salonData';
import { Link } from 'react-router-dom';

export default function GalleryPage({ isSection = false }) {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Hair Care', 'Skin Care', 'Nail Care', 'Makeup', 'Spa & Wellness'];

  const filteredItems = filter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === filter);

  return (
    <div 
      id="gallery"
      className={`w-full bg-[#140E11] text-white ${
        isSection ? 'py-16 sm:py-24' : 'min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-24'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#E95E92] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.24em] mb-3">
            <InstagramIcon className="w-3.5 h-3.5 text-brand-pink" />
            <span>CLIENT TRANSFORMATIONS</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
            Our Visual Portfolio
          </h1>
          <p className="text-[#F2ECE4]/70 text-xs sm:text-base">
            Glimpse the artistry, glamour, and confidence crafted at our Ottawa studio every day.
          </p>
        </div>

        {/* Filter Tabs - Horizontal touch scroll on mobile */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 sm:mb-10 justify-start sm:justify-center scrollbar-none px-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`min-h-[44px] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                filter === cat
                  ? 'bg-brand-pink text-white shadow-lg shadow-brand-pink/30 scale-[1.02]'
                  : 'bg-[#1C1418] text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#1C1418] rounded-3xl overflow-hidden shadow-2xl border border-white/10 hover:border-brand-pink/40 transition-all duration-300 group"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold text-brand-pink-muted border border-white/15">
                  {item.tag}
                </div>
              </div>
              <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-brand-pink font-semibold">{item.category}</span>
                  <h3 className="font-serif font-semibold text-white text-sm sm:text-base lg:text-lg mt-0.5 truncate">{item.title}</h3>
                </div>
                <Link
                  to="/book-appointment"
                  className="min-h-[40px] flex items-center justify-center text-xs text-white/80 hover:text-white hover:bg-brand-pink transition-colors px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 flex-shrink-0"
                >
                  Book Look
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Follow Callout */}
        <div className="text-center p-5 sm:p-8 rounded-3xl bg-[#1C1418] border border-white/10 max-w-2xl mx-auto space-y-3 sm:space-y-4">
          <InstagramIcon className="w-7 h-7 sm:w-8 sm:h-8 text-brand-pink mx-auto" />
          <h3 className="font-serif font-bold text-lg sm:text-xl text-white">Follow @girlookedforyou on Instagram</h3>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed">Tag your fresh salon look with #GirlLookedForYou for a chance to be featured on our official Ottawa feed.</p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-white transition-all"
          >
            Visit Instagram Profile
          </a>
        </div>

      </div>
    </div>
  );
}
