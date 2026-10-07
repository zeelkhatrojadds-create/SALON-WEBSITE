import React, { useEffect } from 'react';
import AboutSection from '../components/home/AboutSection';

export default function AboutPage({ isSection = false }) {
  useEffect(() => {
    if (!isSection) {
      document.title = 'About & Philosophy — GLAM GIRL BY JANKI | Atelier';
    }
  }, [isSection]);

  if (isSection) {
    return <AboutSection />;
  }

  return (
    <div className="w-full bg-[#FAF5EE] min-h-screen pt-16 sm:pt-20">
      <AboutSection />
    </div>
  );
}
