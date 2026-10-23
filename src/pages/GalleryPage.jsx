import React, { useEffect } from 'react';
import GallerySection from '../components/home/GallerySection';
import SignatureLooksSection from '../components/gallery/SignatureLooksSection';
import ClosingExperienceSection from '../components/gallery/ClosingExperienceSection';

export default function GalleryPage({ isSection = false }) {
  useEffect(() => {
    if (!isSection) {
      document.title = 'The Radiance Archive & Gallery — GLAM GIRL BY JANKI | Ottawa';
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [isSection]);

  return (
    <div className="w-full bg-[#FAF6F0] pt-[68px] sm:pt-[74px] lg:pt-[80px]">
      <GallerySection />
      {!isSection && <SignatureLooksSection />}
      {!isSection && <ClosingExperienceSection />}
    </div>
  );
}
