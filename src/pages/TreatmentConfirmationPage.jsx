import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Clock,
  Shield,
  ShieldAlert,
  Sun,
  Droplets,
  Heart,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Calendar,
  User,
  Printer,
  ArrowRight,
  ExternalLink,
  Lock,
  AlertCircle,
  Check,
  Flame,
  ThermometerSnowflake,
  Eye,
  ShoppingBag,
  RotateCcw,
  Scissors,
  CheckCircle,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import salonDB from '../db/salonDatabase';
import { api } from '../services/api';

// Icon resolver helper for dynamic icon strings
const ICON_MAP = {
  Clock,
  Shield,
  ShieldAlert,
  Sun,
  Droplets,
  Heart,
  Flame,
  ThermometerSnowflake,
  Eye,
  Sparkles,
  Scissors,
  AlertCircle
};

function renderLucideIcon(iconName, className = "w-5 h-5") {
  const IconComponent = ICON_MAP[iconName] || Sparkles;
  return <IconComponent className={className} />;
}

export default function TreatmentConfirmationPage() {
  const { appointmentId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryAppointmentId = searchParams.get('id') || searchParams.get('appointmentId');
  const activeApptId = appointmentId || queryAppointmentId;

  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => api.getCurrentUser());
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Data States
  const [appointments, setAppointments] = useState(() => salonDB.getAppointments());
  const [aftercareSettings, setAftercareSettings] = useState(() => salonDB.getAftercareSettings());
  const [savedStatus, setSavedStatus] = useState({ saved: false, isDuplicate: false, message: '' });
  const [activeTimelineFilter, setActiveTimelineFilter] = useState('all');

  // Sync DB updates
  useEffect(() => {
    const unsub = salonDB.subscribe(() => {
      setAppointments(salonDB.getAppointments());
      setAftercareSettings(salonDB.getAftercareSettings());
      setCurrentUser(api.getCurrentUser());
    });
    return () => unsub();
  }, []);

  // Check if pending recommendations were preserved before sign in
  useEffect(() => {
    const pendingSave = sessionStorage.getItem('glfy_pending_aftercare_save');
    if (pendingSave && currentUser) {
      try {
        const payload = JSON.parse(pendingSave);
        const res = salonDB.saveCustomerAftercareRecommendation(currentUser.id || currentUser.email, payload);
        sessionStorage.removeItem('glfy_pending_aftercare_save');
        setSavedStatus({
          saved: true,
          isDuplicate: res.isDuplicate,
          message: res.message || 'Treatment aftercare & product recommendations saved to your Patron account!'
        });
      } catch (e) {
        console.error('Failed to restore pending recommendation save:', e);
      }
    }
  }, [currentUser]);

  // Find the selected appointment or default to the most recent completed appointment
  const currentAppointment = useMemo(() => {
    if (activeApptId) {
      const match = appointments.find(a => a.id === activeApptId || a.referenceCode === activeApptId);
      if (match) return match;
    }

    // Default to the most recent completed appointment
    const completedList = appointments.filter(a => a.status === 'Completed' || a.appointmentStatus === 'Completed');
    if (completedList.length > 0) {
      return completedList[0];
    }

    // Fallback to latest appointment
    return appointments[0] || null;
  }, [appointments, activeApptId]);

  // Derive treatment info
  const serviceName = currentAppointment?.service || currentAppointment?.serviceName || 'Custom Hair & Scalp Treatment';
  const serviceCategory = currentAppointment?.serviceCategory || currentAppointment?.category || '';
  const serviceSlug = currentAppointment?.serviceSlug || currentAppointment?.serviceId || '';
  const customerName = currentAppointment?.customerName || currentUser?.name || 'Valued Patron';
  const completedDate = currentAppointment?.treatmentCompletedAt 
    ? new Date(currentAppointment.treatmentCompletedAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
    : (currentAppointment?.date || new Date().toISOString().split('T')[0]);
  const treatmentDuration = currentAppointment?.treatmentDuration || currentAppointment?.serviceDuration || '45 mins';
  const priceCad = currentAppointment?.servicePrice || currentAppointment?.price || 65;

  // Retrieve matching aftercare advice & approved products
  const aftercareData = useMemo(() => {
    return salonDB.getAftercareForService(serviceName, serviceCategory, serviceSlug);
  }, [serviceName, serviceCategory, serviceSlug, aftercareSettings]);

  // Check if current treatment is already saved in patron account
  useEffect(() => {
    if (!currentUser) {
      setSavedStatus({ saved: false, isDuplicate: false, message: '' });
      return;
    }

    const savedList = salonDB.getCustomerSavedRecommendations(currentUser.id || currentUser.email);
    const existing = savedList.find(item => {
      if (currentAppointment?.id && item.appointmentId === currentAppointment.id) return true;
      if (item.serviceName === serviceName && item.serviceDate === (currentAppointment?.date || completedDate)) return true;
      return false;
    });

    if (existing) {
      setSavedStatus({
        saved: true,
        isDuplicate: true,
        message: 'Saved to your Patron portal on ' + new Date(existing.savedAt).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })
      });
    } else {
      setSavedStatus({ saved: false, isDuplicate: false, message: '' });
    }
  }, [currentUser, currentAppointment, serviceName, completedDate]);

  // Handle Save My Recommendations
  const handleSaveRecommendations = () => {
    const payload = {
      appointmentId: currentAppointment?.id || `appt-${Date.now()}`,
      serviceName,
      serviceCategory: aftercareData.categoryId,
      serviceDate: currentAppointment?.date || completedDate,
      stylistName: 'Janki Khatroja (Founder & Master Stylist)',
      priceCad,
      treatmentDuration,
      instructions: aftercareData.instructions,
      products: aftercareData.products,
      notes: currentAppointment?.customizations ? JSON.stringify(currentAppointment.customizations) : ''
    };

    if (!currentUser) {
      // Store payload in sessionStorage so it survives login / sign-up redirect
      sessionStorage.setItem('glfy_pending_aftercare_save', JSON.stringify(payload));
      setShowAuthModal(true);
      return;
    }

    try {
      const res = salonDB.saveCustomerAftercareRecommendation(currentUser.id || currentUser.email, payload);
      setSavedStatus({
        saved: true,
        isDuplicate: res.isDuplicate,
        message: res.message
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Authentication within modal
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      if (authMode === 'login') {
        const user = await api.login(authEmail, authPassword);
        setCurrentUser(user);
        setShowAuthModal(false);
      } else {
        const newUser = await api.signup({
          name: authName,
          email: authEmail,
          password: authPassword,
          phone: authPhone
        });
        setCurrentUser(newUser);
        setShowAuthModal(false);
      }
    } catch (err) {
      setAuthError(err.message || 'Authentication failed. Please verify your details.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Print Handlers
  const handlePrint = () => {
    window.print();
  };

  // Filter instructions by timeline
  const filteredInstructions = useMemo(() => {
    if (activeTimelineFilter === 'all') return aftercareData.instructions;
    return aftercareData.instructions.filter(inst => {
      const p = (inst.timePeriod || '').toLowerCase();
      if (activeTimelineFilter === 'immediate') {
        return p.includes('24') || p.includes('48') || p.includes('72') || p.includes('first') || p.includes('night');
      }
      if (activeTimelineFilter === 'ongoing') {
        return p.includes('daily') || p.includes('wash') || p.includes('morning') || p.includes('ongoing') || p.includes('every');
      }
      if (activeTimelineFilter === 'weekly') {
        return p.includes('week') || p.includes('10') || p.includes('ritual');
      }
      return true;
    });
  }, [aftercareData.instructions, activeTimelineFilter]);

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 bg-[#F7F4ED] text-[#10110F]">
      
      {/* Top Breadcrumb & Status Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-[#DCE1D8]">
          <div className="flex items-center gap-2 text-xs text-[#6B7068]">
            <Link to="/" className="hover:text-[#263D2B] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/customer-dashboard" className="hover:text-[#263D2B] transition-colors">Patron Account</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#263D2B] font-semibold">Treatment Confirmation</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white border border-[#DCE1D8] text-[#263D2B] hover:bg-[#F7F4ED] hover:border-[#263D2B] transition-colors cursor-pointer shadow-xs print:hidden"
              title="Print official treatment care ritual"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Guide</span>
            </button>

            {currentUser && (
              <Link
                to="/customer-dashboard?tab=aftercare"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#263D2B] text-white hover:bg-[#1a2b1e] transition-colors cursor-pointer shadow-xs print:hidden"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>My Saved Aftercare</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Luxury Confirmation Card */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Hero Banner: Verified Treatment Completion */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DCE1D8] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#263D2B]/8 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            {/* Status Pill & Salon Tagline */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#263D2B] text-white text-[11px] font-bold uppercase tracking-wider shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Treatment Completed & Verified</span>
              </div>

              <div className="text-right">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#6B7068]">
                  GLAM GIRL BY JANKI • OTTAWA, ON
                </span>
              </div>
            </div>

            {/* Title & Customer Greeting */}
            <div className="max-w-3xl">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight">
                Treatment Confirmation & Personalized Aftercare
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#465640] leading-relaxed">
                Thank you for visiting <span className="font-semibold text-[#10110F]">GLAM GIRL BY JANKI</span>, {customerName}. Your ritual has been completed by founder & master stylist <span className="font-semibold text-[#10110F]">Janki Khatroja</span>. To prolong your luminous results, follow your customized post-care ritual below.
              </p>
            </div>

            {/* Treatment Summary Pill Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#DCE1D8]">
              <div className="space-y-1">
                <div className="text-[10px] uppercase tracking-wider text-[#6B7068] font-bold">Treatment Service</div>
                <div className="text-sm font-semibold text-[#10110F] line-clamp-1">{serviceName}</div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] uppercase tracking-wider text-[#6B7068] font-bold">Completion Date</div>
                <div className="text-sm font-semibold text-[#10110F]">{completedDate}</div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] uppercase tracking-wider text-[#6B7068] font-bold">Service Duration</div>
                <div className="text-sm font-semibold text-[#10110F]">{treatmentDuration}</div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] uppercase tracking-wider text-[#6B7068] font-bold">Price (CAD)</div>
                <div className="text-sm font-semibold text-[#263D2B] font-mono">${priceCad} CAD</div>
              </div>
            </div>

            {/* Save My Recommendations Action Banner */}
            <div className="mt-8 pt-6 border-t border-[#DCE1D8] flex flex-wrap items-center justify-between gap-4 bg-[#F7F4ED] -mx-6 sm:-mx-10 -mb-6 sm:-mb-10 p-6 sm:p-8 rounded-b-3xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-[#263D2B]" />
                  <span className="font-serif text-lg font-medium text-[#10110F]">
                    Preserve Your Home Care Plan
                  </span>
                </div>
                <p className="text-xs text-[#6B7068]">
                  Save this aftercare checklist and stylist product recommendations directly to your Patron Account.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {savedStatus.saved ? (
                  <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#263D2B] text-[#263D2B] text-xs font-bold shadow-xs">
                    <BookmarkCheck className="w-4 h-4 text-[#263D2B]" />
                    <span>{savedStatus.message || 'Saved to Your Account'}</span>
                  </div>
                ) : (
                  <button
                    onClick={handleSaveRecommendations}
                    className="global-button !px-6 !py-3 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>Save My Recommendations</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Treatment-Specific Aftercare Instructions */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#263D2B] mb-1">
                EXPERT POST-CARE PROTOCOL
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#10110F]">
                {aftercareData.displayName || `${serviceName} Aftercare`}
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7068] mt-1 max-w-2xl">
                {aftercareData.description}
              </p>
            </div>

            {/* Timeline Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#DCE1D8] text-xs print:hidden">
              <button
                onClick={() => setActiveTimelineFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeTimelineFilter === 'all'
                    ? 'bg-[#263D2B] text-white shadow-xs'
                    : 'text-[#6B7068] hover:text-[#10110F]'
                }`}
              >
                All Steps ({aftercareData.instructions.length})
              </button>
              <button
                onClick={() => setActiveTimelineFilter('immediate')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeTimelineFilter === 'immediate'
                    ? 'bg-[#263D2B] text-white shadow-xs'
                    : 'text-[#6B7068] hover:text-[#10110F]'
                }`}
              >
                Immediate (0-48h)
              </button>
              <button
                onClick={() => setActiveTimelineFilter('ongoing')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeTimelineFilter === 'ongoing'
                    ? 'bg-[#263D2B] text-white shadow-xs'
                    : 'text-[#6B7068] hover:text-[#10110F]'
                }`}
              >
                Daily Routine
              </button>
              <button
                onClick={() => setActiveTimelineFilter('weekly')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeTimelineFilter === 'weekly'
                    ? 'bg-[#263D2B] text-white shadow-xs'
                    : 'text-[#6B7068] hover:text-[#10110F]'
                }`}
              >
                Weekly Maintenance
              </button>
            </div>
          </div>

          {/* Instruction Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredInstructions.map((instruction, idx) => (
              <div
                key={instruction.id || idx}
                className="bg-white rounded-2xl p-6 border border-[#DCE1D8] shadow-xs hover:border-[#263D2B] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#263D2B]/8 text-[#263D2B] flex items-center justify-center group-hover:bg-[#263D2B] group-hover:text-white transition-colors">
                      {renderLucideIcon(instruction.icon, "w-5 h-5")}
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-[11px] font-bold text-[#263D2B]">
                      <Clock className="w-3 h-3 text-[#263D2B]" />
                      <span>{instruction.timePeriod}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-lg text-[#10110F] font-medium mb-2">
                    {instruction.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#465640] leading-relaxed">
                    {instruction.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#F7F4ED] flex items-center justify-between text-[11px] text-[#6B7068]">
                  <span className="font-semibold uppercase tracking-wider text-[#263D2B]">Step {idx + 1} of {aftercareData.instructions.length}</span>
                  <span className="italic">Stylist Approved Advice</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Stylist-Recommended Products */}
        <section className="space-y-6 pt-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#263D2B] mb-1">
                SALON-APPROVED HOME CARE
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#10110F]">
                Stylist-Recommended Products
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7068] mt-1 max-w-2xl">
                Formulations vetted and personally approved by Janki Khatroja to enhance and protect your results between appointments.
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs text-[#263D2B] font-semibold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>100% Genuine Salon Products • Pricing in CAD</span>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aftercareData.products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-[#DCE1D8] overflow-hidden shadow-xs hover:border-[#263D2B] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Product Header & Image */}
                  <div className="relative h-64 sm:h-72 bg-[#F7F4ED] overflow-hidden flex items-center justify-center p-6 border-b border-[#DCE1D8]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-[#263D2B] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                        {product.category}
                      </span>
                    </div>

                    {product.priceCad && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full bg-white border border-[#DCE1D8] text-[#10110F] font-mono text-xs font-bold shadow-xs">
                          ${product.priceCad.toFixed(2)} CAD
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-serif text-xl text-[#10110F] font-medium">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#465640] mt-1 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Why Stylist Recommends It */}
                    <div className="bg-[#F7F4ED] p-4 rounded-2xl border border-[#DCE1D8] space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#263D2B]">
                        <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
                        <span>Why Janki Recommends It</span>
                      </div>
                      <p className="text-xs text-[#10110F] leading-relaxed italic">
                        "{product.whyStylistRecommends}"
                      </p>
                    </div>

                    {/* How to Use It */}
                    <div className="space-y-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B7068]">
                        How to Apply
                      </div>
                      <p className="text-xs text-[#465640] leading-relaxed">
                        {product.howToUse}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 pt-0 border-t border-[#F7F4ED] mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs font-mono font-bold text-[#263D2B]">
                    ${product.priceCad?.toFixed(2)} CAD
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSaveRecommendations}
                      className="px-4 py-2 rounded-xl bg-[#F7F4ED] hover:bg-[#263D2B] text-[#263D2B] hover:text-white border border-[#DCE1D8] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      title="Save this product to your Patron account"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save Recommendation</span>
                    </button>

                    {product.purchaseUrl ? (
                      <a
                        href={product.purchaseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="global-button !px-4 !py-2 text-white text-xs font-bold flex items-center gap-1"
                      >
                        <span>Purchase</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <Link
                        to="/contact"
                        className="px-3 py-2 rounded-xl bg-white hover:bg-[#F7F4ED] text-[#10110F] border border-[#DCE1D8] text-xs font-semibold transition-colors flex items-center gap-1"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#263D2B]" />
                        <span>In-Salon Pickup</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Return & Next Booking Call to Action */}
        <section className="bg-gradient-to-r from-[#263D2B] to-[#1a2b1e] text-white rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 print:hidden">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-normal">
              Schedule Your Next Ritual
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 max-w-xl">
              Consistent care preserves radiant, healthy beauty. Book your subsequent maintenance session or consult with Janki for tailored care.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/book-appointment"
              className="px-6 py-3 rounded-xl bg-white text-[#10110F] text-xs font-bold uppercase tracking-wider hover:bg-[#F7F4ED] transition-all shadow-md flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#263D2B]" />
              <span>Book Appointment</span>
            </Link>

            <Link
              to="/customer-dashboard?tab=aftercare"
              className="px-5 py-3 rounded-xl bg-[#263D2B]/60 text-white border border-white/20 hover:bg-white/10 text-xs font-bold transition-all flex items-center gap-2"
            >
              <span>View Patron Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>

      {/* Authentication Modal (Preserves pending recommendations during sign-in) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#DCE1D8] shadow-2xl relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-5 right-5 text-[#6B7068] hover:text-[#10110F] p-1.5 rounded-full hover:bg-[#F7F4ED] transition-colors"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center mx-auto mb-3">
                <Bookmark className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#10110F]">
                {authMode === 'login' ? 'Sign In to Save' : 'Create Patron Account'}
              </h3>
              <p className="text-xs text-[#6B7068] mt-1">
                Your recommendations for <span className="font-semibold text-[#10110F]">{serviceName}</span> will be saved automatically upon signing in.
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex rounded-xl bg-[#F7F4ED] p-1 mb-5 border border-[#DCE1D8]">
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setAuthError(''); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  authMode === 'login' ? 'bg-white text-[#10110F] shadow-xs' : 'text-[#6B7068]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('register'); setAuthError(''); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  authMode === 'register' ? 'bg-white text-[#10110F] shadow-xs' : 'text-[#6B7068]'
                }`}
              >
                Register
              </button>
            </div>

            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B7068] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B7068] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                />
              </div>

              {authMode === 'register' && (
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B7068] mb-1">
                    Mobile Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={authPhone}
                    onChange={(e) => setAuthPhone(e.target.value)}
                    placeholder="e.g. +1 613-555-0199"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B7068] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full global-button !py-3 text-white text-xs font-bold uppercase tracking-wider shadow-sm mt-2 flex items-center justify-center gap-2 cursor-pointer"
              >
                {authLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{authMode === 'login' ? 'Sign In & Save Plan' : 'Create Account & Save Plan'}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
