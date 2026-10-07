import React, { useEffect } from 'react';
import ReviewsSection from '../components/home/ReviewsSection';

export default function ReviewsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.title = 'Guest Chronicles & Reviews — GLAM GIRL BY JANKI — ATELIER';
  }, []);

  return (
    <div className="w-full bg-[#FAF5EE] min-h-screen pt-16 sm:pt-20">
      <ReviewsSection />
    </div>
  );
}
