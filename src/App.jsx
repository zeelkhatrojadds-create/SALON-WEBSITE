import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ErrorBoundary from './components/common/ErrorBoundary';
import LuxuryLoader from './components/common/LuxuryLoader';
import LuxuryPageTransition from './components/common/LuxuryPageTransition';

// Code-split / Lazy load subpages to boost Initial Performance & reduce initial payload
const BookingPage = lazy(() => import('./pages/BookingPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const TreatmentsPage = lazy(() => import('./pages/TreatmentsPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const TreatmentDetailPage = lazy(() => import('./pages/TreatmentDetailPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const ReviewInvitePopup = lazy(() => import('./components/common/ReviewInvitePopup'));

// Lightweight page loading fallback
function PageFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-[#100C0D] text-[#CFA46A]">
      <div className="w-8 h-8 rounded-full border-2 border-[#CFA46A] border-t-transparent animate-spin" />
    </div>
  );
}

// Helper component for page transitions: resets scroll position on navigation
function RouteScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

// Reload Detection Manager: guarantees any browser reload (F5, Ctrl+R, reload button)
// on ANY page redirects cleanly and immediately to Home ('/') with zero history residue.
function ReloadRedirectManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      const navEntries = window.performance?.getEntriesByType?.('navigation');
      const navEntry = navEntries && navEntries.length > 0 ? navEntries[0] : null;
      const isReload = navEntry
        ? navEntry.type === 'reload'
        : window.performance?.navigation?.type === 1;

      if (isReload && pathname !== '/') {
        window.history.replaceState(null, '', '/');
        window.location.replace('/');
      }
    } catch (e) {
      // Graceful fallback
    }
  }, []);

  return null;
}

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <main className="min-h-screen">
        <ErrorBoundary>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/*" element={<AdminPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Suspense fallback={null}>
          <ReviewInvitePopup />
        </Suspense>
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#100C0D] text-[#F7F1E8] font-body selection:bg-[#CFA46A] selection:text-[#100C0D]">
      <Navbar />

      {/* Main Application Pages with Luxury Silk Reveal Transition */}
      <main className="flex-1">
        <ErrorBoundary>
          <LuxuryPageTransition>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                {/* Dedicated Separate Pages */}
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/treatments" element={<TreatmentsPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/career" element={<CareersPage />} />

                {/* Dedicated Appointment Booking */}
                <Route path="/book-appointment" element={<BookingPage />} />
                <Route path="/booking" element={<BookingPage />} />

                {/* Dedicated Hierarchical Services & Treatments System */}
                <Route path="/services/:category" element={<CategoryPage />} />
                <Route path="/services/:category/:slug" element={<TreatmentDetailPage />} />
                <Route path="/treatments/:category" element={<CategoryPage />} />
                <Route path="/treatments/:category/:slug" element={<TreatmentDetailPage />} />
                <Route path="/treatment/:slug" element={<TreatmentDetailPage />} />
                <Route path="/treatment/:category/:slug" element={<TreatmentDetailPage />} />

                {/* Dedicated Admin Portal Route */}
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/*" element={<AdminPage />} />

                {/* 404 Fallback route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </LuxuryPageTransition>
        </ErrorBoundary>
      </main>

      {/* Real-time Review Invite Popup Modal */}
      <Suspense fallback={null}>
        <ReviewInvitePopup />
      </Suspense>

      {/* Global Footer with Instant SPA Section Links */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <LuxuryLoader />
      <ReloadRedirectManager />
      <RouteScrollManager />
      <ErrorBoundary>
        <AppLayout />
      </ErrorBoundary>
    </Router>
  );
}

