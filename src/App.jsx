import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ErrorBoundary from './components/common/ErrorBoundary';
import SalonLoader from './components/common/SalonLoader';
import LuxuryPageTransition from './components/common/LuxuryPageTransition';

// Code-split / Lazy load subpages to boost Initial Performance & reduce initial payload
const BookingPage = lazy(() => import('./pages/BookingPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const BeautyGuideHubPage = lazy(() => import('./pages/BeautyGuideHubPage'));
const BeautyGuideDetailPage = lazy(() => import('./pages/BeautyGuideDetailPage'));
const ThreadingGuidancePage = lazy(() => import('./pages/ThreadingGuidancePage'));
const SpecialTreatmentsPage = lazy(() => import('./pages/SpecialTreatmentsPage'));
const HairColorPage = lazy(() => import('./pages/HairColorPage'));
const MehndiDesignStudioPage = lazy(() => import('./pages/MehndiDesignStudioPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const TreatmentDetailPage = lazy(() => import('./pages/TreatmentDetailPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const NailArtPage = lazy(() => import('./pages/NailArtPage'));
const LashAtelierPage = lazy(() => import('./pages/LashAtelierPage'));
const SkinAtelierPage = lazy(() => import('./pages/SkinAtelierPage'));
const HairAtelierPage = lazy(() => import('./pages/HairAtelierPage'));
const MakeupAtelierPage = lazy(() => import('./pages/MakeupAtelierPage'));
const BrowAtelierPage = lazy(() => import('./pages/BrowAtelierPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const PriceListPage = lazy(() => import('./pages/PriceListPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const CustomerDashboardPage = lazy(() => import('./pages/CustomerDashboardPage'));
const TreatmentConfirmationPage = lazy(() => import('./pages/TreatmentConfirmationPage'));
const PlanYourSalonDayPage = lazy(() => import('./pages/PlanYourSalonDayPage'));
const ClientCustomizationPage = lazy(() => import('./pages/ClientCustomizationPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const ReviewInvitePopup = lazy(() => import('./components/common/ReviewInvitePopup'));

// Lightweight page loading fallback
function PageFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-[#F7F4ED] text-[#263D2B]">
      <div className="w-8 h-8 rounded-full border-2 border-[#263D2B] border-t-transparent animate-spin" />
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

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <main className="min-h-screen bg-[#F7F4ED] text-[#10110F]">
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
    <div className="min-h-screen flex flex-col bg-[#F7F4ED] text-[#10110F] font-body selection:bg-[#263D2B] selection:text-[#FFFFFF]">
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
                <Route path="/custom-experience" element={<ClientCustomizationPage />} />
                <Route path="/customization-studio" element={<ClientCustomizationPage />} />
                <Route path="/custom-studio" element={<ClientCustomizationPage />} />
                <Route path="/beauty-match-finder" element={<ClientCustomizationPage />} />
                <Route path="/beauty-match" element={<ClientCustomizationPage />} />
                <Route path="/create-beauty-experience" element={<ClientCustomizationPage />} />
                <Route path="/create-your-own-beauty-experience" element={<ClientCustomizationPage />} />
                <Route path="/plan-your-salon-day" element={<PlanYourSalonDayPage />} />
                <Route path="/plan-salon-day" element={<PlanYourSalonDayPage />} />
                <Route path="/salon-day" element={<PlanYourSalonDayPage />} />
                {/* Redirect old Combos pages directly to Treatments page */}
                <Route path="/combo-packages" element={<Navigate to="/treatments" replace />} />
                <Route path="/combos" element={<Navigate to="/treatments" replace />} />
                {/* Dedicated Separate Beauty Guide Compendium */}
                <Route path="/beauty-guide" element={<BeautyGuideHubPage />} />
                <Route path="/beauty-guide/threading" element={<ThreadingGuidancePage />} />
                <Route path="/beauty-guide/:category" element={<BeautyGuideDetailPage />} />
                <Route path="/threading-guidance" element={<Navigate to="/beauty-guide/threading" replace />} />
                <Route path="/guide" element={<Navigate to="/beauty-guide" replace />} />
                <Route path="/skincare-guidance" element={<Navigate to="/beauty-guide/skin-care" replace />} />
                <Route path="/skincare" element={<Navigate to="/beauty-guide/skin-care" replace />} />
                <Route path="/skin-care" element={<Navigate to="/beauty-guide/skin-care" replace />} />
                <Route path="/special-treatments" element={<SpecialTreatmentsPage />} />
                <Route path="/treatments" element={<SpecialTreatmentsPage />} />
                <Route path="/hair-colour" element={<HairColorPage />} />
                <Route path="/hair-color" element={<HairColorPage />} />
                <Route path="/nail-art" element={<NailArtPage />} />
                <Route path="/nail-design" element={<NailArtPage />} />
                <Route path="/nails" element={<NailArtPage />} />
                <Route path="/the-skin-atelier" element={<SkinAtelierPage />} />
                <Route path="/skin-atelier" element={<SkinAtelierPage />} />
                <Route path="/the-hair-atelier" element={<HairAtelierPage />} />
                <Route path="/hair-atelier" element={<HairAtelierPage />} />
                <Route path="/the-lash-atelier" element={<LashAtelierPage />} />
                <Route path="/lash-atelier" element={<LashAtelierPage />} />
                <Route path="/lashes" element={<LashAtelierPage />} />
                <Route path="/lash-studio" element={<LashAtelierPage />} />
                <Route path="/mehndi-design-studio" element={<MehndiDesignStudioPage />} />
                <Route path="/mehndi" element={<Navigate to="/mehndi-design-studio" replace />} />
                <Route path="/henna" element={<Navigate to="/mehndi-design-studio" replace />} />

                {/* The Makeup Atelier Routes */}
                <Route path="/the-makeup-atelier" element={<MakeupAtelierPage />} />
                <Route path="/makeup-atelier" element={<MakeupAtelierPage />} />
                <Route path="/makeup" element={<MakeupAtelierPage />} />
                <Route path="/makeup-studio" element={<MakeupAtelierPage />} />
                {/* The Brow Atelier Routes */}
                <Route path="/the-brow-atelier" element={<BrowAtelierPage />} />
                <Route path="/brow-atelier" element={<BrowAtelierPage />} />
                <Route path="/brows" element={<BrowAtelierPage />} />
                <Route path="/brow" element={<BrowAtelierPage />} />
                <Route path="/brow-studio" element={<BrowAtelierPage />} />
                <Route path="/threading" element={<Navigate to="/services/threading" replace />} />
                <Route path="/wax-atelier" element={<Navigate to="/services/waxing" replace />} />
                <Route path="/waxing" element={<Navigate to="/services/waxing" replace />} />
                <Route path="/wax" element={<Navigate to="/services/waxing" replace />} />
                <Route path="/bridal-atelier" element={<Navigate to="/services/bridal" replace />} />
                <Route path="/bridal" element={<Navigate to="/services/bridal" replace />} />
                <Route path="/body-atelier" element={<Navigate to="/services/spa" replace />} />
                <Route path="/body" element={<Navigate to="/services/spa" replace />} />
                <Route path="/spa" element={<Navigate to="/services/spa" replace />} />
                <Route path="/massage" element={<Navigate to="/services/spa" replace />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                {/* Redirect old FAQ pages directly to Contact page FAQ section */}
                <Route path="/faq" element={<Navigate to="/contact#faqs" replace />} />
                <Route path="/faqs" element={<Navigate to="/contact#faqs" replace />} />
                <Route path="/price-list" element={<PriceListPage />} />
                <Route path="/prices" element={<PriceListPage />} />
                <Route path="/terms-and-conditions" element={<TermsPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
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
                <Route path="/service/:slug" element={<TreatmentDetailPage />} />
                <Route path="/service/:category/:slug" element={<TreatmentDetailPage />} />
                <Route path="/service-detail/:slug" element={<TreatmentDetailPage />} />
                <Route path="/services/item/:slug" element={<TreatmentDetailPage />} />

                {/* Dedicated Admin Portal Route */}
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/*" element={<AdminPage />} />

                {/* Dedicated Customer Account & Patron Portal */}
                <Route path="/treatment-confirmation" element={<TreatmentConfirmationPage />} />
                <Route path="/treatment-confirmation/:appointmentId" element={<TreatmentConfirmationPage />} />
                <Route path="/aftercare" element={<TreatmentConfirmationPage />} />
                <Route path="/customer-dashboard" element={<CustomerDashboardPage />} />
                <Route path="/customer-dashboard/*" element={<CustomerDashboardPage />} />
                <Route path="/customer" element={<CustomerDashboardPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signin" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/signup" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ForgotPasswordPage />} />

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
  const [hasInitialLoaded, setHasInitialLoaded] = React.useState(false);

  return (
    <Router>
      {!hasInitialLoaded && (
        <SalonLoader onComplete={() => setHasInitialLoaded(true)} />
      )}
      <RouteScrollManager />
      <ErrorBoundary>
        <AppLayout />
      </ErrorBoundary>
    </Router>
  );
}


