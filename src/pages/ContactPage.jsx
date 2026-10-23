import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ContactSection from '../components/home/ContactSection';
import PlanYourVisitSection from '../components/contact/PlanYourVisitSection';
import ContactFaqSection from '../components/contact/ContactFaqSection';

export default function ContactPage({ isSection = false }) {
  const location = useLocation();

  useEffect(() => {
    if (!isSection) {
      document.title = 'Contact & Frequently Asked Questions — GLAM GIRL BY JANKI | Ottawa';
    }
  }, [isSection]);

  // Scroll to hash target if provided (e.g. #faqs, #faq, #contact, #plan-your-visit)
  useEffect(() => {
    const hash = location.hash || window.location.hash;
    if (hash) {
      const rawId = hash.replace('#', '');
      const targetId = rawId === 'faq' ? 'faqs' : rawId;
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      }
    } else if (!isSection) {
      window.scrollTo(0, 0);
    }
  }, [location.hash, isSection]);

  if (isSection) {
    return (
      <div className="w-full">
        <ContactSection />
        <ContactFaqSection />
        <PlanYourVisitSection />
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F7F4ED] min-h-screen">
      <ContactSection />
      <ContactFaqSection />
      <PlanYourVisitSection />
    </div>
  );
}

