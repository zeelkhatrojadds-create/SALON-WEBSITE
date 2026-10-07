import React, { useEffect } from 'react';
import ContactSection from '../components/home/ContactSection';

export default function ContactPage({ isSection = false }) {
  useEffect(() => {
    if (!isSection) {
      document.title = 'Maison & Concierge — Contact | GLAM GIRL BY JANKI — ATELIER';
    }
  }, [isSection]);

  if (isSection) {
    return <ContactSection />;
  }

  return (
    <div className="w-full bg-[#FAF5EE] min-h-screen pt-16 sm:pt-20">
      <ContactSection />
    </div>
  );
}
