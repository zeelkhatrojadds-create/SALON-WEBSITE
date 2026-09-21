import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

// Helper component for page transitions
function RouteScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top if on detail page, admin, or 404
    if (pathname.startsWith('/services/') || pathname.startsWith('/admin') || pathname === '/404') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }
  }, [pathname]);

  return null;
}

// App Layout wrapper to toggle Navbar and Footer visibility
function AppLayout() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <main className="min-h-screen">
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-brand-charcoal font-sans selection:bg-brand-pink selection:text-white">
      {/* Universal Dark Header with Smooth SPA Section Navigation */}
      <Navbar />

      {/* Main Application Pages */}
      <main className="flex-1">
        <Routes>
          {/* SPA Routes: All main sections on single page */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<HomePage defaultSection="services" />} />
          <Route path="/booking" element={<HomePage defaultSection="booking" />} />
          <Route path="/gallery" element={<HomePage defaultSection="gallery" />} />
          <Route path="/about" element={<HomePage defaultSection="about" />} />
          <Route path="/contact" element={<HomePage defaultSection="contact" />} />

          {/* Individual Service Deep Dive Page */}
          <Route path="/services/:id" element={<ServiceDetailPage />} />

          {/* Dedicated Admin Portal Route */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/*" element={<AdminPage />} />

          {/* 404 Fallback route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Global Footer with Instant SPA Section Links */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <RouteScrollManager />
      <AppLayout />
    </Router>
  );
}
