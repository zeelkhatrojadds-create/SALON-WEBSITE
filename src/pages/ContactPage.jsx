import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ContactSection from '../components/home/ContactSection';
import CustomConsultationSection from '../components/contact/CustomConsultationSection';
import BeautyBlueprintSection from '../components/contact/BeautyBlueprintSection';
import PlanYourVisitSection from '../components/contact/PlanYourVisitSection';
import ContactFaqSection from '../components/contact/ContactFaqSection';

export default function ContactPage({ isSection = false }) {
  const location = useLocation();

  useEffect(() => {
    if (!isSection) {
      document.title = 'Contact, Consultation & Beauty Blueprint — GLAM GIRL BY JANKI | Ottawa';
    }
  }, [isSection]);

  // Scroll to hash target if provided (e.g. #beauty-blueprint, #custom-consultation, #faqs, #faq, #contact, #plan-your-visit)
  useEffect(() => {
    const hash = location.hash || window.location.hash;
    if (hash) {
      const rawId = hash.replace('#', '');
      let targetId = rawId === 'faq' ? 'faqs' : rawId;
      if (targetId === 'consultation' || targetId === 'custom-request' || targetId === 'my-requests') {
        targetId = 'custom-consultation';
      }
      if (targetId === 'blueprint' || targetId === 'my-blueprint' || targetId === 'beauty-profile') {
        targetId = 'beauty-blueprint';
      }
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
        <CustomConsultationSection />
        <BeautyBlueprintSection />
        <ContactFaqSection />
        <PlanYourVisitSection />
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F7F4ED] min-h-screen">
      <ContactSection />
      <CustomConsultationSection />
      <BeautyBlueprintSection />
      <ContactFaqSection />
      <PlanYourVisitSection />
    </div>
  );
}

