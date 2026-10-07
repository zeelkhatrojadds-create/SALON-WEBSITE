import React from 'react';
import { Link } from 'react-router-dom';
import './ServiceMarquee.css';

const MAIN_CATEGORIES = [
  { name: 'THREADING', query: 'Threading' },
  { name: 'WAXING', query: 'Waxing' },
  { name: 'FACIAL', query: 'Facial' },
  { name: 'MASSAGE', query: 'Massage' },
  { name: 'MEHNDI', query: 'Mehndi' },
  { name: 'MAKEUP', query: 'Makeup' },
  { name: 'HAIR STYLING', query: 'Hair Styling' },
  { name: 'HAIR CUT', query: 'Hair Cut' },
  { name: 'HAIR COLOUR', query: 'Hair Colour' },
  { name: 'HAIR TREATMENTS', query: 'Hair Treatments' },
  { name: 'LASHES', query: 'Lashes' },
];

export default function ServiceMarquee() {
  return (
    <div className="service-marquee-wrapper" aria-label="Main service categories marquee">
      <div className="service-marquee-track">
        {[1, 2, 3].map((copyIndex) => (
          <div 
            key={`track-${copyIndex}`} 
            className="service-marquee-list" 
            aria-hidden={copyIndex > 1 ? 'true' : undefined}
          >
            {MAIN_CATEGORIES.map((cat, idx) => (
              <div key={`entry-${copyIndex}-${idx}`} className="service-marquee-entry">
                <Link
                  to={`/services?category=${encodeURIComponent(cat.query)}`}
                  className="service-marquee-item"
                  tabIndex={copyIndex > 1 ? -1 : 0}
                >
                  {cat.name}
                </Link>
                <span className="service-marquee-dot" aria-hidden="true">✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

