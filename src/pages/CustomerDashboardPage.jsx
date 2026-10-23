import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  User,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Shield,
  Star,
  Tag,
  Bell,
  Settings,
  LogOut,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Search,
  Filter,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Download,
  Trash2,
  Lock,
  Eye,
  EyeOff,
  X,
  MessageSquare,
  ExternalLink,
  Info,
  CalendarDays,
  FileText,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  ShoppingBag
} from 'lucide-react';
import { api } from '../services/api';
import salonDB from '../db/salonDatabase';
import { getWhatsAppBookingUrl } from '../utils/whatsapp';

export default function CustomerDashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTabParam = searchParams.get('tab') || 'overview';

  const [activeTab, setActiveTab] = useState(currentTabParam);
  const [user, setUser] = useState(() => api.getCurrentUser());
  const [loading, setLoading] = useState(true);

  // Data states
  const [appointments, setAppointments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [offers, setOffers] = useState([]);
  const [savedRecommendations, setSavedRecommendations] = useState([]);

  // Modals & Action states
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [rescheduleAppointment, setRescheduleAppointment] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');
  const [cancelAppointment, setCancelAppointment] = useState(null);
  const [cancelReason, setCancelReason] = useState('');

  // Review modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [reviewAppointmentId, setReviewAppointmentId] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  // Deletion state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');

  // Filter & Search states
  const [appointmentFilter, setAppointmentFilter] = useState('all');
  const [historySearch, setHistorySearch] = useState('');
  const [historyStatusFilter, setHistoryStatusFilter] = useState('all');
  const [historyDateRange, setHistoryDateRange] = useState('all');

  // Profile Form state
  const [profileForm, setProfileForm] = useState({
    name: '',
    preferredName: '',
    phone: '',
    dateOfBirth: '',
    address: {
      street: '',
      city: 'Ottawa',
      province: 'Ontario',
      postalCode: '',
      country: 'Canada'
    },
    preferences: {
      preferredContactMethod: 'email',
      marketingEmailConsent: false,
      marketingSmsConsent: false,
      specialRequests: ''
    }
  });

  // UI Toast message
  const [toastMessage, setToastMessage] = useState(null);
  const [copiedId, setCopiedId] = useState(false);

  const navigate = useNavigate();

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Sync tab with URL
  useEffect(() => {
    if (currentTabParam && currentTabParam !== activeTab) {
      setActiveTab(currentTabParam);
    }
  }, [currentTabParam]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth Guard & Data Loading
  useEffect(() => {
    const currentUser = api.getCurrentUser();
    if (!currentUser) {
      navigate('/login?redirect=/customer-dashboard');
      return;
    }
    setUser(currentUser);

    // Initialize profile form from user
    setProfileForm({
      name: currentUser.name || '',
      preferredName: currentUser.preferredName || '',
      phone: currentUser.phone || '',
      dateOfBirth: currentUser.dateOfBirth || '',
      address: {
        street: currentUser.address?.street || '',
        city: currentUser.address?.city || 'Ottawa',
        province: currentUser.address?.province || 'Ontario',
        postalCode: currentUser.address?.postalCode || '',
        country: currentUser.address?.country || 'Canada'
      },
      preferences: {
        preferredContactMethod: currentUser.preferences?.preferredContactMethod || 'email',
        marketingEmailConsent: !!currentUser.preferences?.marketingEmailConsent,
        marketingSmsConsent: !!currentUser.preferences?.marketingSmsConsent,
        specialRequests: currentUser.preferences?.specialRequests || ''
      }
    });

    const loadCustomerData = () => {
      if (!currentUser) return;
      const appts = salonDB.getCustomerAppointments(currentUser.id || currentUser.email);
      const revs = salonDB.getCustomerReviews(currentUser.id || currentUser.email);
      const notifs = salonDB.getCustomerNotifications(currentUser.id || currentUser.email);
      const pubOffers = salonDB.getPublicFestivalOffers();
      const savedRecs = salonDB.getCustomerSavedRecommendations(currentUser.id || currentUser.email);

      setAppointments(appts);
      setReviews(revs);
      setNotifications(notifs);
      setOffers(pubOffers);
      setSavedRecommendations(savedRecs);
      setLoading(false);
    };

    loadCustomerData();

    // Subscribe to live DB updates
    const unsub = salonDB.subscribe(() => {
      const freshUser = api.getCurrentUser();
      if (freshUser) setUser(freshUser);
      loadCustomerData();
    });

    return () => unsub();
  }, [navigate]);

  const handleLogout = () => {
    api.logout();
    navigate('/');
  };

  const handleCopyId = () => {
    if (user?.id) {
      navigator.clipboard.writeText(user.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
      showToast('Patron ID copied to clipboard');
    }
  };

  // Remove Saved Aftercare Recommendation
  const handleRemoveSavedRecommendation = (savedId) => {
    if (!user) return;
    if (window.confirm('Remove this saved treatment aftercare from your account?')) {
      const updated = salonDB.removeCustomerSavedRecommendation(user.id || user.email, savedId);
      const target = String(user.id || user.email).toLowerCase().trim();
      setSavedRecommendations(updated.filter(item => {
        const itemUserId = String(item.userId || '').toLowerCase().trim();
        const itemEmail = String(item.email || '').toLowerCase().trim();
        return itemUserId === target || itemEmail === target;
      }));
      showToast('Saved recommendation removed.');
    }
  };

  // Profile Save
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const updated = await api.updateCustomerProfile(user.id, {
        name: profileForm.name,
        preferredName: profileForm.preferredName,
        phone: profileForm.phone,
        dateOfBirth: profileForm.dateOfBirth,
        address: profileForm.address,
        preferences: profileForm.preferences
      });
      setUser(updated);
      showToast('Patron profile details updated successfully.');
    } catch (err) {
      showToast(err.message || 'Failed to update profile.', 'error');
    }
  };

  // Password Change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!user) return;
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match.', 'error');
      return;
    }

    try {
      await api.changePassword(user.id, currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showToast('Account password changed securely.');
    } catch (err) {
      showToast(err.message || 'Failed to change password.', 'error');
    }
  };

  // Data Export Request
  const handleExportData = async () => {
    if (!user) return;
    try {
      const exportJson = await api.requestDataExport(user.id);
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportJson, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `GLAM_GIRL_PATRON_DATA_${user.id}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Your privacy data export has been downloaded.');
    } catch (err) {
      showToast(err.message || 'Failed to export customer data.', 'error');
    }
  };

  // Account Deletion Request
  const handleDeleteRequest = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      await api.requestAccountDeletion(user.id, deleteReason);
      setShowDeleteModal(false);
      setDeleteReason('');
      showToast('Account deletion request submitted. Our executive will verify within 48h.');
    } catch (err) {
      showToast(err.message || 'Failed to submit request.', 'error');
    }
  };

  // Reschedule Action
  const handleOpenReschedule = (appt) => {
    setRescheduleAppointment(appt);
    setRescheduleDate(appt.date);
    setRescheduleTime(appt.time || appt.startTime || '10:00 AM');
  };

  const handleConfirmReschedule = async () => {
    if (!rescheduleAppointment) return;
    try {
      await api.rescheduleAppointment(rescheduleAppointment.id, rescheduleDate, rescheduleTime, user?.id);
      setRescheduleAppointment(null);
      showToast('Appointment rescheduled successfully.');
    } catch (err) {
      showToast(err.message || 'Could not reschedule slot.', 'error');
    }
  };

  // Cancel Action
  const handleOpenCancel = (appt) => {
    setCancelAppointment(appt);
    setCancelReason('');
  };

  const handleConfirmCancel = async () => {
    if (!cancelAppointment) return;
    try {
      await api.cancelAppointmentByCustomer(cancelAppointment.id, user?.id, cancelReason);
      setCancelAppointment(null);
      showToast('Appointment cancelled.');
    } catch (err) {
      showToast(err.message || 'Failed to cancel appointment.', 'error');
    }
  };

  // Review Actions
  const completedUnreviewedAppointments = useMemo(() => {
    const reviewedApptIds = new Set(reviews.map((r) => r.appointmentId).filter(Boolean));
    return appointments.filter(
      (a) =>
        (a.status === 'Completed' || a.appointmentStatus === 'Completed') &&
        !reviewedApptIds.has(a.id)
    );
  }, [appointments, reviews]);

  const handleOpenNewReview = (appt = null) => {
    setEditingReview(null);
    setReviewAppointmentId(appt ? appt.id : (completedUnreviewedAppointments[0]?.id || ''));
    setReviewRating(5);
    setReviewComment('');
    setShowReviewModal(true);
  };

  const handleOpenEditReview = (rev) => {
    setEditingReview(rev);
    setReviewRating(rev.rating || 5);
    setReviewComment(rev.review || '');
    setShowReviewModal(true);
  };

  const handleSaveReview = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      if (editingReview) {
        await api.updateCustomerReview(editingReview.id, user.id, {
          rating: reviewRating,
          review: reviewComment
        });
        showToast('Review updated.');
      } else {
        const appt = appointments.find((a) => a.id === reviewAppointmentId);
        if (!appt) {
          showToast('Please select a completed appointment to review.', 'error');
          return;
        }
        await api.addCustomerReview({
          customerId: user.id,
          customerName: user.name,
          customerEmail: user.email,
          appointmentId: appt.id,
          service: appt.service,
          serviceCategory: appt.serviceCategory,
          rating: reviewRating,
          review: reviewComment
        });
        showToast('Review published! Thank you for your feedback.');
      }
      setShowReviewModal(false);
    } catch (err) {
      showToast(err.message || 'Failed to save review.', 'error');
    }
  };

  const handleDeleteReview = async (revId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await api.deleteCustomerReview(revId, user?.id);
      showToast('Review deleted.');
    } catch (err) {
      showToast(err.message || 'Failed to delete review.', 'error');
    }
  };

  // Notification actions
  const handleMarkNotifRead = async (id) => {
    await api.markNotificationRead(id);
  };

  const handleMarkAllNotifsRead = async () => {
    await api.markAllNotificationsRead(user?.id);
    showToast('All notifications marked as read.');
  };

  // Appointments Filter Logic
  const filteredAppointments = useMemo(() => {
    if (appointmentFilter === 'all') return appointments;
    if (appointmentFilter === 'upcoming') {
      return appointments.filter(
        (a) => a.status === 'Confirmed' || a.status === 'Pending' || a.status === 'Appointment Request Confirmed'
      );
    }
    return appointments.filter((a) => {
      const st = (a.status || a.appointmentStatus || '').toLowerCase();
      return st === appointmentFilter.toLowerCase();
    });
  }, [appointments, appointmentFilter]);

  // History Filter Logic
  const filteredHistory = useMemo(() => {
    let list = [...appointments];

    if (historySearch.trim()) {
      const q = historySearch.toLowerCase().trim();
      list = list.filter(
        (a) =>
          (a.service && a.service.toLowerCase().includes(q)) ||
          (a.id && a.id.toLowerCase().includes(q)) ||
          (a.referenceCode && a.referenceCode.toLowerCase().includes(q))
      );
    }

    if (historyStatusFilter !== 'all') {
      list = list.filter((a) => {
        const s = (a.status || a.appointmentStatus || '').toLowerCase();
        return s === historyStatusFilter.toLowerCase();
      });
    }

    if (historyDateRange !== 'all') {
      const now = new Date();
      list = list.filter((a) => {
        const aDate = new Date(a.date);
        if (isNaN(aDate.getTime())) return true;
        const diffDays = (now - aDate) / (1000 * 3600 * 24);
        if (historyDateRange === '30') return diffDays <= 30;
        if (historyDateRange === '90') return diffDays <= 90;
        if (historyDateRange === 'year') return aDate.getFullYear() === now.getFullYear();
        return true;
      });
    }

    return list;
  }, [appointments, historySearch, historyStatusFilter, historyDateRange]);

  // Next upcoming appointment
  const nextAppointment = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return appointments
      .filter((a) => a.date >= today && (a.status === 'Confirmed' || a.status === 'Pending'))
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))[0];
  }, [appointments]);

  const unreadNotifsCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  if (loading || !user) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-[#F7F4ED]">
        <div className="w-9 h-9 rounded-full border-2 border-[#263D2B] border-t-transparent animate-spin" />
      </div>
    );
  }

  const navMenuItems = [
    { id: 'overview', name: 'Overview', icon: Sparkles },
    { id: 'appointments', name: 'My Appointments', icon: Calendar, badge: appointments.length },
    { id: 'aftercare', name: 'My Aftercare', icon: Bookmark, badge: savedRecommendations.length > 0 ? savedRecommendations.length : undefined },
    { id: 'history', name: 'Booking History', icon: RotateCcw },
    { id: 'profile', name: 'Profile & Address', icon: User },
    { id: 'preferences', name: 'Preferences', icon: Info },
    { id: 'reviews', name: 'My Reviews', icon: Star, badge: reviews.length },
    { id: 'offers', name: 'Festival Privileges', icon: Tag, badge: offers.length },
    { id: 'notifications', name: 'Notifications', icon: Bell, badge: unreadNotifsCount > 0 ? unreadNotifsCount : undefined },
    { id: 'security', name: 'Account & Security', icon: Shield }
  ];

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16 bg-[#F7F4ED] text-[#10110F]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[120] max-w-sm p-4 rounded-2xl bg-white border border-[#DCE1D8] shadow-2xl flex items-center gap-3 animate-fade-in">
          {toastMessage.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          ) : (
            <CheckCircle className="w-5 h-5 text-[#263D2B] shrink-0" />
          )}
          <span className="text-xs font-medium text-[#10110F]">{toastMessage.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Patron Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#263D2B] text-white flex items-center justify-center font-serif text-2xl sm:text-3xl font-light shadow-md shrink-0">
              {user.name ? user.name.charAt(0).toUpperCase() : 'P'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#263D2B]">
                  DISTINGUISHED PATRON
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
                <span className="text-[10px] font-mono text-[#6B7068]">
                  MEMBER SINCE {new Date(user.createdAt || Date.now()).getFullYear()}
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal mt-0.5">
                {user.preferredName || user.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-[#6B7068]">
                <span>{user.email}</span>
                <span>•</span>
                <span>{user.phone || 'No phone registered'}</span>
                <span>•</span>
                <button
                  onClick={handleCopyId}
                  className="inline-flex items-center gap-1 font-mono text-[11px] bg-[#F7F4ED] px-2 py-0.5 rounded-md border border-[#DCE1D8] hover:border-[#263D2B] transition-colors cursor-pointer text-[#10110F]"
                  title="Click to copy ID"
                >
                  <span>{user.id}</span>
                  {copiedId ? <Check className="w-3 h-3 text-[#263D2B]" /> : <Copy className="w-3 h-3 text-[#6B7068]" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-center">
            <Link
              to="/book-appointment"
              className="global-button !px-5 !py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </Link>
            <button
              onClick={handleLogout}
              className="global-button-secondary !px-4 !py-2.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer text-[#6B7068] hover:text-red-700 hover:border-red-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Layout Grid: Left Sidebar Tabs + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar (Desktop 3 Cols, Mobile Horizontal Scroller) */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-4 sm:p-5 border border-[#DCE1D8] shadow-xs space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B7068]">
              PATRON NAVIGATION
            </div>
            <nav className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1.5 pb-2 lg:pb-0 scrollbar-none">
              {navMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#263D2B] text-white shadow-xs'
                        : 'text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#6B7068]'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          isActive ? 'bg-white text-[#263D2B]' : 'bg-[#DCE1D8] text-[#10110F]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Main Content Panel */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* 4 Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-[#DCE1D8] shadow-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">
                      Total Visits
                    </span>
                    <span className="font-serif text-2xl sm:text-3xl text-[#10110F] block mt-1">
                      {appointments.length}
                    </span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#DCE1D8] shadow-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">
                      Upcoming
                    </span>
                    <span className="font-serif text-2xl sm:text-3xl text-[#263D2B] block mt-1">
                      {appointments.filter((a) => a.status === 'Confirmed' || a.status === 'Pending').length}
                    </span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#DCE1D8] shadow-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">
                      My Reviews
                    </span>
                    <span className="font-serif text-2xl sm:text-3xl text-[#10110F] block mt-1">
                      {reviews.length}
                    </span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#DCE1D8] shadow-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">
                      Active Rewards
                    </span>
                    <span className="font-serif text-2xl sm:text-3xl text-[#263D2B] block mt-1">
                      {offers.length}
                    </span>
                  </div>
                </div>

                {/* Highlight Next Appointment */}
                {nextAppointment ? (
                  <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DCE1D8] shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between pb-4 border-b border-[#DCE1D8]">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#263D2B]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[#263D2B]">
                          NEXT APPOINTMENT RITUAL
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {nextAppointment.status}
                      </span>
                    </div>

                    <div className="py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <span className="text-[11px] text-[#6B7068] block">Treatment</span>
                        <h4 className="font-serif text-lg text-[#10110F] font-normal mt-0.5">
                          {nextAppointment.service}
                        </h4>
                        <span className="text-xs text-[#6B7068]">{nextAppointment.serviceDuration}</span>
                      </div>

                      <div>
                        <span className="text-[11px] text-[#6B7068] block">Schedule</span>
                        <div className="font-semibold text-sm text-[#10110F] mt-0.5 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#263D2B]" />
                          <span>{nextAppointment.date}</span>
                        </div>
                        <div className="text-xs text-[#6B7068] mt-0.5 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                          <span>{nextAppointment.time || nextAppointment.startTime}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] text-[#6B7068] block">Reference & Price</span>
                        <span className="font-mono text-xs font-bold text-[#10110F] block mt-0.5">
                          {nextAppointment.referenceCode || nextAppointment.id}
                        </span>
                        <span className="font-bold text-sm text-[#263D2B] block">
                          ${nextAppointment.servicePrice} CAD
                        </span>
                        <span className="text-[11px] text-[#465640] block font-medium mt-0.5">
                          Payment Method: Cash on Delivery
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#DCE1D8] flex flex-wrap items-center gap-2.5">
                      <button
                        onClick={() => setSelectedAppointment(nextAppointment)}
                        className="global-button-secondary !py-2 !px-4 text-xs font-semibold cursor-pointer"
                      >
                        View Full Details
                      </button>
                      <button
                        onClick={() => handleOpenReschedule(nextAppointment)}
                        className="global-button-secondary !py-2 !px-4 text-xs font-semibold cursor-pointer text-[#263D2B]"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={() => handleOpenCancel(nextAppointment)}
                        className="global-button-secondary !py-2 !px-4 text-xs font-semibold cursor-pointer text-red-700 hover:border-red-200"
                      >
                        Cancel
                      </button>
                      <a
                        href={getWhatsAppBookingUrl(nextAppointment.service)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto inline-flex items-center gap-1.5 text-xs text-[#263D2B] font-semibold hover:underline"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Contact Salon</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-8 border border-[#DCE1D8] text-center space-y-3">
                    <Calendar className="w-10 h-10 text-[#6B7068] mx-auto opacity-40" />
                    <h3 className="font-serif text-lg text-[#10110F]">No Upcoming Appointments Scheduled</h3>
                    <p className="text-xs text-[#6B7068] max-w-sm mx-auto">
                      Pamper yourself with one of our master beauty rituals. Reserve your dedicated time slot with Janki Khatroja today.
                    </p>
                    <Link
                      to="/book-appointment"
                      className="global-button inline-flex items-center gap-2 !px-6 !py-2.5 text-xs font-bold uppercase text-white shadow-sm mt-2"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Book a Ritual</span>
                    </Link>
                  </div>
                )}

                {/* Festival Privilege Spotlight */}
                {offers.length > 0 && (
                  <div className="bg-[#263D2B] text-white rounded-3xl p-6 sm:p-7 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#A8B5A0]">
                        EXCLUSIVE FESTIVAL PRIVILEGE
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                        {offers[0].title} — Save {offers[0].discountPercent || 25}%
                      </h3>
                      <p className="text-xs text-[#A8B5A0] max-w-xl">
                        {offers[0].headline || offers[0].description}
                      </p>
                    </div>
                    <Link
                      to={`/book-appointment?offer=${offers[0].id}`}
                      className="global-button !bg-white !text-[#263D2B] hover:!bg-[#F7F4ED] !px-6 !py-3 text-xs font-bold uppercase tracking-wider shadow-md shrink-0 whitespace-nowrap"
                    >
                      Claim Privilege
                    </Link>
                  </div>
                )}

              </div>
            )}

            {/* 2. MY APPOINTMENTS TAB */}
            {activeTab === 'appointments' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Tabs for statuses */}
                <div className="flex items-center justify-between flex-wrap gap-4 pb-2 border-b border-[#DCE1D8]">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'all', label: 'All Bookings' },
                      { id: 'upcoming', label: 'Upcoming' },
                      { id: 'Confirmed', label: 'Confirmed' },
                      { id: 'Pending', label: 'Pending Review' },
                      { id: 'Completed', label: 'Completed' },
                      { id: 'Cancelled', label: 'Cancelled' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setAppointmentFilter(t.id)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                          appointmentFilter === t.id
                            ? 'bg-[#263D2B] text-white shadow-xs'
                            : 'bg-white border border-[#DCE1D8] text-[#6B7068] hover:text-[#10110F]'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <Link
                    to="/book-appointment"
                    className="global-button !px-4 !py-2 text-xs font-bold uppercase text-white shadow-xs flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>New Booking</span>
                  </Link>
                </div>

                {filteredAppointments.length === 0 ? (
                  <div className="bg-white rounded-3xl p-10 border border-[#DCE1D8] text-center space-y-3">
                    <Calendar className="w-10 h-10 text-[#6B7068] mx-auto opacity-40" />
                    <h3 className="font-serif text-lg text-[#10110F]">No appointments match this filter</h3>
                    <p className="text-xs text-[#6B7068]">
                      Try selecting another status tab or book a new appointment ritual.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredAppointments.map((appt) => {
                      const isUpcoming = appt.status === 'Confirmed' || appt.status === 'Pending';
                      const isCompleted = appt.status === 'Completed' || appt.appointmentStatus === 'Completed';
                      const isCancelled = appt.status === 'Cancelled' || appt.appointmentStatus === 'Cancelled';

                      return (
                        <div
                          key={appt.id}
                          className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#DCE1D8] shadow-xs space-y-4 hover:border-[#263D2B]/40 transition-colors"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DCE1D8]">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-[#10110F]">
                                  {appt.referenceCode || appt.id}
                                </span>
                                <span className="text-xs text-[#6B7068]">•</span>
                                <span className="text-xs text-[#6B7068]">
                                  Booked on {new Date(appt.createdAt || Date.now()).toLocaleDateString()}
                                </span>
                              </div>
                              <h3 className="font-serif text-lg sm:text-xl text-[#10110F] font-normal mt-0.5">
                                {appt.service}
                              </h3>
                            </div>

                            <div className="flex items-center gap-2 self-start sm:self-auto">
                              <span
                                className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                                  isUpcoming
                                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                    : isCompleted
                                    ? 'bg-blue-50 text-blue-800 border border-blue-200'
                                    : 'bg-stone-100 text-stone-700 border border-stone-300'
                                }`}
                              >
                                {appt.status || appt.appointmentStatus || 'Pending'}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                            <div>
                              <span className="text-[#6B7068] block">Date</span>
                              <span className="font-semibold text-[#10110F] mt-0.5 block">{appt.date}</span>
                            </div>
                            <div>
                              <span className="text-[#6B7068] block">Time Window</span>
                              <span className="font-semibold text-[#10110F] mt-0.5 block">
                                {appt.time || appt.startTime} - {appt.endTime || 'End'}
                              </span>
                            </div>
                            <div>
                              <span className="text-[#6B7068] block">Duration</span>
                              <span className="font-semibold text-[#10110F] mt-0.5 block">
                                {appt.serviceDuration || '45 min'}
                              </span>
                            </div>
                            <div>
                              <span className="text-[#6B7068] block">Price in CAD</span>
                              <span className="font-bold text-[#263D2B] mt-0.5 block">
                                ${appt.servicePrice} CAD
                              </span>
                            </div>
                            <div>
                              <span className="text-[#6B7068] block">Payment Method</span>
                              <span className="font-semibold text-[#263D2B] mt-0.5 block">
                                Cash on Delivery
                              </span>
                            </div>
                          </div>

                          {appt.offerTitle && (
                            <div className="p-2.5 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] text-[11px] text-[#263D2B] flex items-center gap-1.5 font-medium">
                              <Tag className="w-3.5 h-3.5 text-[#263D2B]" />
                              <span>Applied Privilege: <strong>{appt.offerTitle}</strong> (Saved ${appt.discountAmount || 0} CAD)</span>
                            </div>
                          )}

                          {appt.customizations && (
                            <div className="p-3 rounded-2xl bg-[#263D2B]/5 border border-[#263D2B]/15 text-xs space-y-1">
                              <span className="text-[10px] font-bold text-[#263D2B] uppercase tracking-wider block">
                                ✨ Tailored Customization:
                              </span>
                              {appt.customizations.selectedOption && (
                                <div className="text-[#10110F]">
                                  • Tier: {appt.customizations.selectedOption.name}
                                </div>
                              )}
                              {appt.customizations.selectedAddons && appt.customizations.selectedAddons.length > 0 && (
                                <div className="text-[#465640]">
                                  • Add-ons: {appt.customizations.selectedAddons.map(a => a.name).join(', ')}
                                </div>
                              )}
                            </div>
                          )}

                          {appt.notes && (
                            <div className="text-xs text-[#6B7068] bg-[#F7F4ED]/50 p-2.5 rounded-xl border border-[#DCE1D8]">
                              <span className="font-semibold text-[#10110F]">Special Requests: </span>
                              <span>{appt.notes}</span>
                            </div>
                          )}

                          <div className="pt-3 border-t border-[#DCE1D8] flex flex-wrap items-center gap-2">
                            <button
                              onClick={() => setSelectedAppointment(appt)}
                              className="global-button-secondary !py-1.5 !px-3 text-xs font-semibold cursor-pointer"
                            >
                              View Full Details
                            </button>

                            {isUpcoming && !isCancelled && (
                              <>
                                <button
                                  onClick={() => handleOpenReschedule(appt)}
                                  className="global-button-secondary !py-1.5 !px-3 text-xs font-semibold cursor-pointer text-[#263D2B]"
                                >
                                  Reschedule
                                </button>
                                <button
                                  onClick={() => handleOpenCancel(appt)}
                                  className="global-button-secondary !py-1.5 !px-3 text-xs font-semibold cursor-pointer text-red-700"
                                >
                                  Cancel Appointment
                                </button>
                              </>
                            )}

                            {isCompleted && (
                              <>
                                <button
                                  onClick={() => handleOpenNewReview(appt)}
                                  className="global-button-secondary !py-1.5 !px-3 text-xs font-semibold cursor-pointer text-[#263D2B] flex items-center gap-1"
                                >
                                  <Star className="w-3.5 h-3.5" />
                                  <span>Write Review</span>
                                </button>
                                <Link
                                  to={`/treatment-confirmation?id=${appt.id}`}
                                  className="global-button !py-1.5 !px-3 text-xs font-bold text-white flex items-center gap-1 shadow-xs cursor-pointer"
                                >
                                  <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                                  <span>Aftercare Advice</span>
                                </Link>
                              </>
                            )}

                            <Link
                              to={`/book-appointment?service=${appt.serviceId || ''}`}
                              className="global-button-secondary !py-1.5 !px-3 text-xs font-semibold ml-auto"
                            >
                              Book Again
                            </Link>

                            <a
                              href={getWhatsAppBookingUrl(appt.service)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="global-button-secondary !py-1.5 !px-3 text-xs font-semibold flex items-center gap-1"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Salon Concierge</span>
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            )}

            {/* 2.5 SAVED AFTERCARE & PRODUCT RECOMMENDATIONS TAB */}
            {activeTab === 'aftercare' && (
              <div className="space-y-8 animate-fade-in">
                
                {/* Header */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-xs flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#263D2B] mb-1">
                      <Bookmark className="w-4 h-4 text-[#263D2B]" />
                      <span>PATRON HOME-CARE REPOSITORY</span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#10110F]">
                      My Saved Aftercare & Recommendations
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6B7068] mt-1 max-w-2xl">
                      Personalized instructions and stylist-approved home care preserved directly from your completed salon rituals with Janki Khatroja.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to="/treatment-confirmation"
                      className="global-button !px-4 !py-2 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Latest Treatment Confirmation</span>
                    </Link>
                  </div>
                </div>

                {/* Saved Recommendations List or Empty State */}
                {savedRecommendations.length === 0 ? (
                  <div className="bg-white rounded-3xl p-10 sm:p-14 border border-[#DCE1D8] text-center space-y-4 shadow-xs">
                    <div className="w-14 h-14 rounded-2xl bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center mx-auto">
                      <Bookmark className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#10110F]">
                      No Saved Aftercare Plans Yet
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B7068] max-w-md mx-auto leading-relaxed">
                      When your appointment is marked as completed by Janki, visit the Treatment Confirmation page and click <strong className="text-[#10110F]">Save My Recommendations</strong> to preserve your custom home care protocol here.
                    </p>
                    <div className="pt-2 flex flex-wrap justify-center gap-3">
                      <button
                        onClick={() => setActiveTab('appointments')}
                        className="global-button-secondary !px-4 !py-2 text-xs font-semibold cursor-pointer"
                      >
                        View Completed Appointments
                      </button>
                      <Link
                        to="/treatment-confirmation"
                        className="global-button !px-5 !py-2 text-white text-xs font-bold uppercase tracking-wider"
                      >
                        Preview Aftercare Guide
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {savedRecommendations.map((rec) => (
                      <div
                        key={rec.id}
                        className="bg-white rounded-3xl border border-[#DCE1D8] shadow-xs overflow-hidden"
                      >
                        {/* Card Top Banner */}
                        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#F7F4ED] to-white border-b border-[#DCE1D8] flex flex-wrap items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-full bg-[#263D2B] text-white text-[10px] font-bold uppercase tracking-wider">
                                Saved Treatment Plan
                              </span>
                              <span className="text-xs text-[#6B7068]">
                                Saved on {new Date(rec.savedAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                            <h3 className="font-serif text-2xl text-[#10110F] font-normal">
                              {rec.serviceName}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B7068]">
                              <span>Stylist: <strong className="text-[#10110F]">{rec.stylistName || 'Janki Khatroja'}</strong></span>
                              <span>•</span>
                              <span>Service Date: <strong className="text-[#10110F]">{rec.serviceDate}</strong></span>
                              {rec.priceCad && (
                                <>
                                  <span>•</span>
                                  <span className="font-mono text-[#263D2B] font-bold">${rec.priceCad} CAD</span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Link
                              to={`/treatment-confirmation?id=${rec.appointmentId || ''}`}
                              className="global-button !px-4 !py-2 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>View Confirmation</span>
                            </Link>
                            <button
                              onClick={() => handleRemoveSavedRecommendation(rec.id)}
                              className="p-2 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 border border-red-200 transition-colors cursor-pointer"
                              title="Remove from saved recommendations"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Card Body: Instructions & Products */}
                        <div className="p-6 sm:p-8 space-y-8">
                          
                          {/* Instructions Checklist */}
                          {rec.instructions && rec.instructions.length > 0 && (
                            <div className="space-y-4">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[#263D2B]" />
                                <h4 className="font-serif text-lg text-[#10110F] font-medium">
                                  Home-Care Protocol ({rec.instructions.length} Steps)
                                </h4>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {rec.instructions.map((inst, idx) => (
                                  <div
                                    key={inst.id || idx}
                                    className="p-4 rounded-2xl bg-[#F7F4ED]/50 border border-[#DCE1D8] space-y-2"
                                  >
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="font-bold text-xs text-[#10110F]">
                                        {inst.title}
                                      </span>
                                      <span className="px-2 py-0.5 rounded-full bg-white border border-[#DCE1D8] text-[10px] font-bold text-[#263D2B]">
                                        {inst.timePeriod}
                                      </span>
                                    </div>
                                    <p className="text-xs text-[#465640] leading-relaxed">
                                      {inst.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Recommended Products */}
                          {rec.products && rec.products.length > 0 && (
                            <div className="space-y-4 pt-4 border-t border-[#DCE1D8]">
                              <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-[#263D2B]" />
                                <h4 className="font-serif text-lg text-[#10110F] font-medium">
                                  Stylist-Recommended Products
                                </h4>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {rec.products.map((prod) => (
                                  <div
                                    key={prod.id}
                                    className="p-4 rounded-2xl bg-white border border-[#DCE1D8] flex gap-4 items-start shadow-2xs"
                                  >
                                    <div className="w-20 h-20 rounded-xl bg-[#F7F4ED] overflow-hidden shrink-0 border border-[#DCE1D8] p-1.5 flex items-center justify-center">
                                      <img
                                        src={prod.image}
                                        alt={prod.name}
                                        className="max-h-full max-w-full object-contain"
                                      />
                                    </div>

                                    <div className="flex-1 min-w-0 space-y-1">
                                      <div className="flex items-center justify-between gap-2">
                                        <span className="text-[10px] font-bold uppercase text-[#6B7068]">
                                          {prod.category}
                                        </span>
                                        {prod.priceCad && (
                                          <span className="font-mono text-xs font-bold text-[#263D2B]">
                                            ${prod.priceCad.toFixed(2)} CAD
                                          </span>
                                        )}
                                      </div>

                                      <h5 className="font-serif text-sm font-semibold text-[#10110F] truncate">
                                        {prod.name}
                                      </h5>

                                      <p className="text-xs text-[#465640] line-clamp-2 italic">
                                        "{prod.whyStylistRecommends}"
                                      </p>

                                      <div className="pt-1 flex items-center gap-2">
                                        {prod.purchaseUrl ? (
                                          <a
                                            href={prod.purchaseUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[11px] font-bold text-[#263D2B] hover:underline flex items-center gap-1"
                                          >
                                            <span>Purchase Online</span>
                                            <ExternalLink className="w-3 h-3" />
                                          </a>
                                        ) : (
                                          <span className="text-[11px] text-[#6B7068] flex items-center gap-1">
                                            <ShoppingBag className="w-3 h-3 text-[#263D2B]" />
                                            <span>Available for in-salon pickup</span>
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

            {/* 3. BOOKING HISTORY TAB */}
            {activeTab === 'history' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Search & Filter Bar */}
                <div className="bg-white rounded-2xl p-4 border border-[#DCE1D8] shadow-xs flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7068]" />
                    <input
                      type="text"
                      value={historySearch}
                      onChange={(e) => setHistorySearch(e.target.value)}
                      placeholder="Search by treatment or booking ref..."
                      className="w-full h-10 pl-10 pr-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                    />
                  </div>

                  <div className="flex gap-2">
                    <select
                      value={historyStatusFilter}
                      onChange={(e) => setHistoryStatusFilter(e.target.value)}
                      className="h-10 px-3 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                    >
                      <option value="all">All Statuses</option>
                      <option value="completed">Completed</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <select
                      value={historyDateRange}
                      onChange={(e) => setHistoryDateRange(e.target.value)}
                      className="h-10 px-3 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                    >
                      <option value="all">All Time</option>
                      <option value="30">Past 30 Days</option>
                      <option value="90">Past 90 Days</option>
                      <option value="year">This Year</option>
                    </select>
                  </div>
                </div>

                {filteredHistory.length === 0 ? (
                  <div className="bg-white rounded-3xl p-10 border border-[#DCE1D8] text-center space-y-3">
                    <RotateCcw className="w-10 h-10 text-[#6B7068] mx-auto opacity-40" />
                    <h3 className="font-serif text-lg text-[#10110F]">No historical records match your search</h3>
                    <p className="text-xs text-[#6B7068]">Clear the search query to see past appointments.</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-[#DCE1D8] shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#F7F4ED] border-b border-[#DCE1D8] text-[10px] font-bold uppercase tracking-wider text-[#6B7068]">
                          <tr>
                            <th className="py-3 px-4">Booking Ref</th>
                            <th className="py-3 px-4">Treatment</th>
                            <th className="py-3 px-4">Date & Time</th>
                            <th className="py-3 px-4">Price (CAD)</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#DCE1D8]">
                          {filteredHistory.map((h) => (
                            <tr key={h.id} className="hover:bg-[#F7F4ED]/40 transition-colors">
                              <td className="py-3.5 px-4 font-mono font-bold text-[#10110F]">
                                {h.referenceCode || h.id}
                              </td>
                              <td className="py-3.5 px-4 font-serif text-sm text-[#10110F]">
                                {h.service}
                              </td>
                              <td className="py-3.5 px-4 text-[#6B7068]">
                                <div>{h.date}</div>
                                <div className="text-[11px]">{h.time || h.startTime}</div>
                              </td>
                              <td className="py-3.5 px-4 font-bold text-[#263D2B]">
                                <div>${h.servicePrice} CAD</div>
                                <div className="text-[10px] text-[#465640] font-normal">Cash on Delivery</div>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="font-medium text-[11px] px-2.5 py-0.5 rounded-full bg-[#F7F4ED] border border-[#DCE1D8]">
                                  {h.status || h.appointmentStatus || 'Pending'}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right space-x-2">
                                <button
                                  onClick={() => setSelectedAppointment(h)}
                                  className="text-[#263D2B] font-semibold hover:underline cursor-pointer"
                                >
                                  Details
                                </button>
                                {(h.status === 'Completed' || h.appointmentStatus === 'Completed') && (
                                  <Link
                                    to={`/treatment-confirmation?id=${h.id}`}
                                    className="text-[#263D2B] font-bold hover:underline"
                                  >
                                    Aftercare
                                  </Link>
                                )}
                                <Link
                                  to={`/book-appointment?service=${h.serviceId || ''}`}
                                  className="text-[#10110F] font-semibold hover:underline"
                                >
                                  Rebook
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* 4. PROFILE & ADDRESS TAB */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-xs space-y-6 animate-fade-in">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#263D2B] block">
                    PATRON IDENTIFICATION
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal mt-0.5">
                    Personal & Address Information
                  </h2>
                </div>

                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  
                  {/* Account Metadata (Read-only) */}
                  <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-[#6B7068] block">Patron ID</span>
                      <span className="font-mono font-bold text-[#10110F] mt-0.5 block">{user.id}</span>
                    </div>
                    <div>
                      <span className="text-[#6B7068] block">Account Created</span>
                      <span className="font-medium text-[#10110F] mt-0.5 block">
                        {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#6B7068] block">Last Login</span>
                      <span className="font-medium text-[#10110F] mt-0.5 block">
                        {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'Just now'}
                      </span>
                    </div>
                  </div>

                  {/* Personal Fields */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#10110F]">
                      Personal Details
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#10110F] mb-1">
                          Full Legal Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full h-11 px-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/30 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#10110F] mb-1">
                          Preferred Name / Nickname
                        </label>
                        <input
                          type="text"
                          value={profileForm.preferredName}
                          onChange={(e) => setProfileForm({ ...profileForm, preferredName: e.target.value })}
                          className="w-full h-11 px-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/30 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#10110F] mb-1">
                          Email Address (Sign-In ID)
                        </label>
                        <input
                          type="email"
                          disabled
                          value={user.email}
                          className="w-full h-11 px-4 rounded-xl border border-[#DCE1D8] bg-stone-100 text-xs text-[#6B7068] cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#10110F] mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          className="w-full h-11 px-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/30 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#10110F] mb-1">
                        Date of Birth (Optional, for birthday privileges)
                      </label>
                      <input
                        type="date"
                        value={profileForm.dateOfBirth}
                        onChange={(e) => setProfileForm({ ...profileForm, dateOfBirth: e.target.value })}
                        className="w-full sm:w-1/2 h-11 px-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/30 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                      />
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="space-y-4 pt-4 border-t border-[#DCE1D8]">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#10110F]">
                      Address Information
                    </h3>

                    <div>
                      <label className="block text-xs font-semibold text-[#10110F] mb-1">
                        Street Address (Optional)
                      </label>
                      <input
                        type="text"
                        value={profileForm.address.street}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            address: { ...profileForm.address, street: e.target.value }
                          })
                        }
                        placeholder="e.g. 145 Bank St, Apt 4B"
                        className="w-full h-11 px-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/30 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#10110F] mb-1">City</label>
                        <input
                          type="text"
                          value={profileForm.address.city}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              address: { ...profileForm.address, city: e.target.value }
                            })
                          }
                          className="w-full h-11 px-3 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/30 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#10110F] mb-1">Province</label>
                        <input
                          type="text"
                          value={profileForm.address.province}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              address: { ...profileForm.address, province: e.target.value }
                            })
                          }
                          className="w-full h-11 px-3 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/30 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#10110F] mb-1">Postal Code</label>
                        <input
                          type="text"
                          value={profileForm.address.postalCode}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              address: { ...profileForm.address, postalCode: e.target.value }
                            })
                          }
                          placeholder="K1P 5N7"
                          className="w-full h-11 px-3 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/30 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#10110F] mb-1">Country</label>
                        <input
                          type="text"
                          value={profileForm.address.country}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              address: { ...profileForm.address, country: e.target.value }
                            })
                          }
                          className="w-full h-11 px-3 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/30 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="global-button !px-6 !py-3 text-xs font-bold uppercase text-white shadow-md cursor-pointer"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 5. PREFERENCES & CONSENT TAB */}
            {activeTab === 'preferences' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-xs space-y-6 animate-fade-in">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#263D2B] block">
                    SERVICE PREFERENCES & PRIVACY
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal mt-0.5">
                    Communication & Ritual Customization
                  </h2>
                </div>

                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                      Preferred Contact Method
                    </label>
                    <select
                      value={profileForm.preferences.preferredContactMethod}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          preferences: {
                            ...profileForm.preferences,
                            preferredContactMethod: e.target.value
                          }
                        })
                      }
                      className="w-full sm:w-1/2 h-11 px-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                    >
                      <option value="email">Email</option>
                      <option value="sms">SMS Text</option>
                      <option value="phone">Phone Call</option>
                    </select>
                  </div>

                  <div className="space-y-4 pt-3 border-t border-[#DCE1D8]">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                      Marketing Consent
                    </h3>

                    <label className="flex items-start gap-3 p-4 rounded-2xl bg-[#F7F4ED]/50 border border-[#DCE1D8] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profileForm.preferences.marketingEmailConsent}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            preferences: {
                              ...profileForm.preferences,
                              marketingEmailConsent: e.target.checked
                            }
                          })
                        }
                        className="mt-0.5 rounded border-[#DCE1D8] text-[#263D2B] focus:ring-[#263D2B]"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-[#10110F] block">Email Beauty Edits & Offers</span>
                        <span className="text-[#6B7068]">Receive seasonal discounts, festival lookbooks, and celebratory anniversary gifts.</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-4 rounded-2xl bg-[#F7F4ED]/50 border border-[#DCE1D8] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profileForm.preferences.marketingSmsConsent}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            preferences: {
                              ...profileForm.preferences,
                              marketingSmsConsent: e.target.checked
                            }
                          })
                        }
                        className="mt-0.5 rounded border-[#DCE1D8] text-[#263D2B] focus:ring-[#263D2B]"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-[#10110F] block">SMS Concierge Notifications</span>
                        <span className="text-[#6B7068]">Receive instant SMS booking confirmations, time reminders, and rescheduling updates.</span>
                      </div>
                    </label>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-[#DCE1D8]">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#10110F]">
                      Accessibility or Appointment Requests
                    </label>
                    <textarea
                      rows={3}
                      value={profileForm.preferences.specialRequests}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          preferences: {
                            ...profileForm.preferences,
                            specialRequests: e.target.value
                          }
                        })
                      }
                      placeholder="e.g. Sensitive scalp, fragrance preferences, quiet appointment preference..."
                      className="w-full p-3 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/30 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="global-button !px-6 !py-3 text-xs font-bold uppercase text-white shadow-md cursor-pointer"
                    >
                      Save Preferences
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 6. MY REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <div className="space-y-6 animate-fade-in">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#DCE1D8]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#263D2B] block">
                      FEEDBACK ARCHIVE
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal mt-0.5">
                      My Reviews & Ratings
                    </h2>
                  </div>

                  {completedUnreviewedAppointments.length > 0 && (
                    <button
                      onClick={() => handleOpenNewReview()}
                      className="global-button !px-5 !py-2.5 text-xs font-bold uppercase text-white shadow-xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                    >
                      <Star className="w-3.5 h-3.5" />
                      <span>Write Review ({completedUnreviewedAppointments.length} Eligible)</span>
                    </button>
                  )}
                </div>

                {reviews.length === 0 ? (
                  <div className="bg-white rounded-3xl p-10 border border-[#DCE1D8] text-center space-y-3">
                    <Star className="w-10 h-10 text-[#6B7068] mx-auto opacity-40" />
                    <h3 className="font-serif text-lg text-[#10110F]">No Reviews Submitted Yet</h3>
                    <p className="text-xs text-[#6B7068] max-w-sm mx-auto">
                      Reviews can be submitted for completed beauty appointments. Share your experience with the GLAM GIRL community!
                    </p>
                    {completedUnreviewedAppointments.length > 0 ? (
                      <button
                        onClick={() => handleOpenNewReview()}
                        className="global-button !px-6 !py-2.5 text-xs font-bold uppercase text-white shadow-sm mt-2 cursor-pointer"
                      >
                        Review a Completed Ritual
                      </button>
                    ) : (
                      <span className="text-xs font-mono text-[#6B7068] block mt-2">
                        Complete your next scheduled appointment to leave a verified review.
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="bg-white rounded-3xl p-6 border border-[#DCE1D8] shadow-xs space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                              {rev.serviceCategory || 'BEAUTY RITUAL'}
                            </span>
                            <h4 className="font-serif text-lg text-[#10110F] font-normal">
                              {rev.service}
                            </h4>
                          </div>

                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= rev.rating
                                    ? 'text-[#263D2B] fill-[#263D2B]'
                                    : 'text-[#DCE1D8]'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-xs text-[#10110F] font-sans leading-relaxed">
                          "{rev.review}"
                        </p>

                        <div className="pt-3 border-t border-[#DCE1D8] flex items-center justify-between text-[11px] text-[#6B7068]">
                          <span>Published on {rev.date || new Date(rev.createdAt).toLocaleDateString()}</span>
                          <div className="space-x-3">
                            <button
                              onClick={() => handleOpenEditReview(rev)}
                              className="text-[#263D2B] font-semibold hover:underline cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteReview(rev.id)}
                              className="text-red-600 font-semibold hover:underline cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

            {/* 7. FESTIVAL PRIVILEGES & OFFERS TAB */}
            {activeTab === 'offers' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#263D2B] block">
                    EXCLUSIVE REWARDS
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal mt-0.5">
                    Published Festival Offers & Privileges
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {offers.map((off) => (
                    <div
                      key={off.id}
                      className="bg-white rounded-3xl p-6 border border-[#DCE1D8] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#263D2B]/50 transition-colors"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F7F4ED] text-[#263D2B] border border-[#DCE1D8]">
                            {off.festival || 'Seasonal Beauty Edit'}
                          </span>
                          <span className="text-xs font-mono font-bold text-[#263D2B]">
                            Save {off.discountPercent || 25}%
                          </span>
                        </div>
                        <h3 className="font-serif text-lg text-[#10110F] font-normal">
                          {off.title}
                        </h3>
                        <p className="text-xs text-[#6B7068] leading-relaxed">
                          {off.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#DCE1D8] flex items-center justify-between">
                        <div>
                          <span className="line-through text-xs text-[#6B7068] block">
                            ${off.originalPrice} CAD
                          </span>
                          <span className="font-serif text-xl font-bold text-[#263D2B]">
                            ${off.discountedPrice} CAD
                          </span>
                        </div>
                        <Link
                          to={`/book-appointment?offer=${off.id}`}
                          className="global-button !px-5 !py-2.5 text-xs font-bold uppercase text-white shadow-xs"
                        >
                          Book Privilege
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. NOTIFICATIONS TAB */}
            {activeTab === 'notifications' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-[#DCE1D8]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#263D2B] block">
                      CONCIERGE FEED
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl text-[#10110F] font-normal mt-0.5">
                      Notifications & Reminders
                    </h2>
                  </div>

                  {notifications.some((n) => !n.read) && (
                    <button
                      onClick={handleMarkAllNotifsRead}
                      className="text-xs font-bold text-[#263D2B] hover:underline cursor-pointer"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                {notifications.length === 0 ? (
                  <div className="bg-white rounded-3xl p-10 border border-[#DCE1D8] text-center space-y-3">
                    <Bell className="w-10 h-10 text-[#6B7068] mx-auto opacity-40" />
                    <h3 className="font-serif text-lg text-[#10110F]">No Notifications</h3>
                    <p className="text-xs text-[#6B7068]">Your notifications queue is clear.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => handleMarkNotifRead(n.id)}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                          n.read
                            ? 'bg-white border-[#DCE1D8] text-[#6B7068]'
                            : 'bg-white border-[#263D2B]/50 shadow-xs text-[#10110F]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {!n.read && <span className="w-2 h-2 rounded-full bg-[#263D2B]" />}
                              <h4 className="font-bold text-xs uppercase tracking-wider text-[#10110F]">
                                {n.title}
                              </h4>
                            </div>
                            <p className="text-xs leading-relaxed">{n.message}</p>
                          </div>
                          <span className="text-[10px] font-mono text-[#6B7068] whitespace-nowrap shrink-0">
                            {new Date(n.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 9. ACCOUNT & SECURITY TAB */}
            {activeTab === 'security' && (
              <div className="space-y-8 animate-fade-in">
                
                {/* Change Password Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-xs space-y-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#263D2B] block">
                      AUTHENTICATION
                    </span>
                    <h2 className="font-serif text-xl text-[#10110F] font-normal mt-0.5">
                      Change Account Password
                    </h2>
                  </div>

                  <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-xs font-semibold text-[#10110F] mb-1">
                        Current Password *
                      </label>
                      <input
                        type={showPass ? 'text' : 'password'}
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full h-11 px-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/30 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#10110F] mb-1">
                        New Password * (Min 6 characters)
                      </label>
                      <input
                        type={showPass ? 'text' : 'password'}
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        className="w-full h-11 px-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/30 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#10110F] mb-1">
                        Confirm New Password *
                      </label>
                      <input
                        type={showPass ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat new password"
                        className="w-full h-11 px-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/30 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="text-xs text-[#6B7068] hover:text-[#10110F] cursor-pointer"
                      >
                        {showPass ? 'Hide passwords' : 'Show passwords'}
                      </button>

                      <button
                        type="submit"
                        className="global-button !px-5 !py-2.5 text-xs font-bold uppercase text-white shadow-md cursor-pointer"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>

                {/* Privacy & Data Rights Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-xs space-y-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#263D2B] block">
                      PRIVACY & DATA RIGHTS
                    </span>
                    <h2 className="font-serif text-xl text-[#10110F] font-normal mt-0.5">
                      GDPR & PIPEDA Compliance
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-[#10110F]">
                          Export My Personal Salon Records
                        </h4>
                        <p className="text-xs text-[#6B7068] mt-0.5">
                          Download a portable JSON archive of your personal profile, booking history, and review feedback.
                        </p>
                      </div>
                      <button
                        onClick={handleExportData}
                        className="global-button-secondary !py-2 !px-4 text-xs font-semibold flex items-center gap-1.5 shrink-0 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export Data JSON</span>
                      </button>
                    </div>

                    <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-red-900">
                          Request Account & Data Deletion
                        </h4>
                        <p className="text-xs text-red-700/80 mt-0.5">
                          Initiate verified patron account removal in compliance with Canadian privacy legislation.
                        </p>
                      </div>
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="global-button-secondary !py-2 !px-4 text-xs font-semibold text-red-700 hover:bg-red-50 shrink-0 cursor-pointer"
                      >
                        Request Deletion
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODAL: VIEW BOOKING DETAILS                                               */}
      {/* ========================================================================= */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#DCE1D8] shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE1D8]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
                  APPOINTMENT DOSSIER
                </span>
                <h3 className="font-serif text-xl text-[#10110F] font-normal">
                  {selectedAppointment.service}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="w-8 h-8 rounded-full bg-[#F7F4ED] text-[#10110F] flex items-center justify-center cursor-pointer hover:bg-[#DCE1D8]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#6B7068] block">Reference</span>
                <span className="font-mono font-bold text-[#10110F] block mt-0.5">
                  {selectedAppointment.referenceCode || selectedAppointment.id}
                </span>
              </div>
              <div>
                <span className="text-[#6B7068] block">Status</span>
                <span className="font-bold text-[#263D2B] block mt-0.5">
                  {selectedAppointment.status || selectedAppointment.appointmentStatus || 'Pending'}
                </span>
              </div>
              <div>
                <span className="text-[#6B7068] block">Date</span>
                <span className="font-semibold text-[#10110F] block mt-0.5">{selectedAppointment.date}</span>
              </div>
              <div>
                <span className="text-[#6B7068] block">Time Window</span>
                <span className="font-semibold text-[#10110F] block mt-0.5">
                  {selectedAppointment.time || selectedAppointment.startTime} - {selectedAppointment.endTime || 'End'}
                </span>
              </div>
              <div>
                <span className="text-[#6B7068] block">Duration</span>
                <span className="font-semibold text-[#10110F] block mt-0.5">
                  {selectedAppointment.serviceDuration || '45 min'}
                </span>
              </div>
              <div>
                <span className="text-[#6B7068] block">Total Amount</span>
                <span className="font-bold text-[#263D2B] block mt-0.5">
                  ${selectedAppointment.servicePrice} CAD
                </span>
              </div>
              <div>
                <span className="text-[#6B7068] block">Master Artist</span>
                <span className="font-semibold text-[#10110F] block mt-0.5">
                  {selectedAppointment.stylist || 'Janki Khatroja'}
                </span>
              </div>
              <div>
                <span className="text-[#6B7068] block">Payment Method</span>
                <span className="font-semibold text-[#10110F] block mt-0.5">
                  Cash on Delivery (Pay at Appointment)
                </span>
              </div>
            </div>

            {selectedAppointment.notes && (
              <div className="p-3 rounded-xl bg-[#F7F4ED] text-xs">
                <span className="font-bold text-[#10110F] block">Patron Notes:</span>
                <span className="text-[#6B7068]">{selectedAppointment.notes}</span>
              </div>
            )}

            <div className="pt-3 border-t border-[#DCE1D8] flex justify-end gap-2">
              <button
                onClick={() => setSelectedAppointment(null)}
                className="global-button-secondary !py-2 !px-4 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: RESCHEDULE APPOINTMENT                                             */}
      {/* ========================================================================= */}
      {rescheduleAppointment && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#DCE1D8] shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE1D8]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
                  RESCHEDULE APPOINTMENT
                </span>
                <h3 className="font-serif text-xl text-[#10110F] font-normal">
                  {rescheduleAppointment.service}
                </h3>
              </div>
              <button
                onClick={() => setRescheduleAppointment(null)}
                className="w-8 h-8 rounded-full bg-[#F7F4ED] text-[#10110F] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#6B7068]">
              Select a new date and time slot. Our availability engine will verify there are no scheduling conflicts.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#10110F] mb-1">
                  New Appointment Date *
                </label>
                <input
                  type="date"
                  required
                  value={rescheduleDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#10110F] mb-1">
                  New Time Slot *
                </label>
                <select
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                >
                  {[
                    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
                    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
                    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
                  ].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-[#DCE1D8] flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setRescheduleAppointment(null)}
                className="global-button-secondary !py-2 !px-4 text-xs font-semibold cursor-pointer"
              >
                Keep Current
              </button>
              <button
                type="button"
                onClick={handleConfirmReschedule}
                className="global-button !py-2 !px-5 text-xs font-bold uppercase text-white shadow-md cursor-pointer"
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CANCEL APPOINTMENT                                                 */}
      {/* ========================================================================= */}
      {cancelAppointment && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#DCE1D8] shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE1D8]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-700 block">
                  CANCEL APPOINTMENT
                </span>
                <h3 className="font-serif text-xl text-[#10110F] font-normal">
                  {cancelAppointment.service}
                </h3>
              </div>
              <button
                onClick={() => setCancelAppointment(null)}
                className="w-8 h-8 rounded-full bg-[#F7F4ED] text-[#10110F] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#6B7068]">
              Are you sure you wish to cancel this appointment on {cancelAppointment.date}?
            </p>

            <div>
              <label className="block text-xs font-semibold text-[#10110F] mb-1">
                Reason for cancellation (optional):
              </label>
              <textarea
                rows={3}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Schedule conflict, ill health, travel..."
                className="w-full p-3 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
              />
            </div>

            <div className="pt-3 border-t border-[#DCE1D8] flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setCancelAppointment(null)}
                className="global-button-secondary !py-2 !px-4 text-xs font-semibold cursor-pointer"
              >
                Keep Booking
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="global-button !bg-red-700 hover:!bg-red-800 !py-2 !px-5 text-xs font-bold uppercase text-white shadow-md cursor-pointer"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: WRITE / EDIT REVIEW                                                */}
      {/* ========================================================================= */}
      {showReviewModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#DCE1D8] shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE1D8]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#263D2B] block">
                  PATRON REVIEW
                </span>
                <h3 className="font-serif text-xl text-[#10110F] font-normal">
                  {editingReview ? 'Edit Your Review' : 'Review Completed Ritual'}
                </h3>
              </div>
              <button
                onClick={() => setShowReviewModal(false)}
                className="w-8 h-8 rounded-full bg-[#F7F4ED] text-[#10110F] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-4">
              {!editingReview && (
                <div>
                  <label className="block text-xs font-semibold text-[#10110F] mb-1">
                    Select Completed Ritual *
                  </label>
                  <select
                    value={reviewAppointmentId}
                    onChange={(e) => setReviewAppointmentId(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                  >
                    {completedUnreviewedAppointments.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.service} ({a.date} — {a.referenceCode || a.id})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#10110F] mb-1">
                  Overall Star Rating *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewRating
                            ? 'text-[#263D2B] fill-[#263D2B]'
                            : 'text-[#DCE1D8]'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 font-bold text-xs text-[#263D2B]">
                    {reviewRating} of 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#10110F] mb-1">
                  Your Review Feedback *
                </label>
                <textarea
                  required
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Describe your salon experience with Janki Khatroja..."
                  className="w-full p-3.5 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                />
              </div>

              <div className="pt-3 border-t border-[#DCE1D8] flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="global-button-secondary !py-2 !px-4 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="global-button !py-2 !px-6 text-xs font-bold uppercase text-white shadow-md cursor-pointer"
                >
                  {editingReview ? 'Save Edits' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: DELETION REQUEST                                                   */}
      {/* ========================================================================= */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#DCE1D8] shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE1D8]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-700 block">
                  DATA DELETION REQUEST
                </span>
                <h3 className="font-serif text-xl text-[#10110F] font-normal">
                  Verified Account Removal
                </h3>
              </div>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-8 h-8 rounded-full bg-[#F7F4ED] text-[#10110F] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#6B7068]">
              In accordance with PIPEDA & GDPR, you may request complete erasure of your patron records and history. Our executive director will review and confirm within 48 business hours.
            </p>

            <form onSubmit={handleDeleteRequest} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#10110F] mb-1">
                  Reason for account deletion (optional):
                </label>
                <textarea
                  rows={3}
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  placeholder="Moved out of Ottawa, privacy preference, etc."
                  className="w-full p-3 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
                />
              </div>

              <div className="pt-3 border-t border-[#DCE1D8] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="global-button-secondary !py-2 !px-4 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="global-button !bg-red-700 hover:!bg-red-800 !py-2 !px-5 text-xs font-bold uppercase text-white shadow-md cursor-pointer"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
