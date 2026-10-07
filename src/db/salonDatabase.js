/**
 * GIRL LOOKED FOR YOU — Unified Salon Database Engine
 * Persistent, reactive client database for appointments, services, categories & settings.
 */

import { ALL_SERVICES, CATEGORIES } from '../data/servicesData';
import { SALON_INFO } from '../data/salonData';

const DB_KEYS = {
  APPOINTMENTS: 'glfy_db_appointments',
  SERVICES: 'glfy_db_services',
  CATEGORIES: 'glfy_db_categories',
  SETTINGS: 'glfy_db_settings',
  REVIEWS: 'glfy_db_reviews',
  LIKED_REVIEWS: 'glfy_db_liked_reviews'
};

// Internal listeners for live UI synchronization
const subscribers = new Set();

const notifySubscribers = (event, data) => {
  subscribers.forEach((callback) => {
    try {
      callback(event, data);
    } catch (e) {
      console.warn('DB subscriber error:', e);
    }
  });

  // Cross-tab synchronization via window event
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('glfy_db_change', { detail: { event, data } }));
  }
};

// Initial Seed for Appointments (sample completed appointments for review verification testing)
const DEFAULT_APPOINTMENTS = [
  {
    id: 'GGJ-782910',
    customerName: 'Priya Sharma',
    phone: '(613) 555-0192',
    email: 'priya.sharma@example.com',
    service: 'Eyebrow Threading & Tint',
    servicePrice: 25,
    date: '2026-09-24',
    time: '10:00 AM',
    status: 'Completed',
    submittedAt: '2026-09-24'
  },
  {
    id: 'GGJ-782911',
    customerName: 'Emily Watson',
    phone: '(613) 555-0143',
    email: 'emily.watson@example.com',
    service: '24K Gold Hydra-Glow Facial',
    servicePrice: 135,
    date: '2026-09-21',
    time: '02:00 PM',
    status: 'Completed',
    submittedAt: '2026-09-21'
  },
  {
    id: 'GGJ-782912',
    customerName: 'Meera Patel',
    phone: '(613) 555-0188',
    email: 'meera.patel@example.com',
    service: 'Bridal Henna / Mehndi Art',
    servicePrice: 180,
    date: '2026-09-17',
    time: '11:30 AM',
    status: 'Completed',
    submittedAt: '2026-09-17'
  },
  {
    id: 'GGJ-782913',
    customerName: 'Sarah O\'Brien',
    phone: '(613) 555-0177',
    email: 'sarah.obrien@example.com',
    service: 'Luxe Balayage & Gloss Finish',
    servicePrice: 195,
    date: '2026-09-12',
    time: '01:00 PM',
    status: 'Completed',
    submittedAt: '2026-09-12'
  }
];

// Curated authentic reviews seed for all salon service categories
const DEFAULT_REVIEWS = [
  {
    id: 'rev-101',
    customerName: 'Priya Sharma',
    service: 'Eyebrow Threading & Tint',
    serviceCategory: 'threading',
    rating: 5,
    review: 'Absolutely the best brow threading I have ever had in Ottawa! Janki is incredibly skilled, meticulous, and so gentle. My brows look perfectly symmetrical every single visit. The studio is spotless and calming.',
    date: '2026-09-24',
    verified: true,
    likes: 18,
    recommended: true,
    status: 'approved',
    tags: ['Gentle Touch', 'Clean Studio', 'Perfect Shape'],
    featured: true
  },
  {
    id: 'rev-102',
    customerName: 'Emily Watson',
    service: '24K Gold Hydra-Glow Facial',
    serviceCategory: 'facial',
    rating: 5,
    review: 'The 24K Gold Hydra-Glow Facial completely transformed my skin. I could see the difference immediately — luminous, hydrated, and refreshed. Janki explained every step and made me feel so pampered.',
    date: '2026-09-21',
    verified: true,
    likes: 14,
    recommended: true,
    status: 'approved',
    tags: ['Glowing Skin', 'Relaxing', 'Luxury Experience'],
    featured: true
  },
  {
    id: 'rev-103',
    customerName: 'Meera Patel',
    service: 'Bridal Henna / Mehndi Art',
    serviceCategory: 'henna',
    rating: 5,
    review: 'Janki did my bridal mehndi and it was breathtaking! The intricate motifs came out so dark and rich in colour. All my wedding guests asked where I had it done. Truly a master artist!',
    date: '2026-09-17',
    verified: true,
    likes: 27,
    recommended: true,
    status: 'approved',
    tags: ['Intricate Design', 'Bridal Specialist', 'Rich Color'],
    featured: true
  },
  {
    id: 'rev-104',
    customerName: 'Sarah O\'Brien',
    service: 'Luxe Balayage & Gloss Finish',
    serviceCategory: 'haircolor',
    rating: 5,
    review: 'I came in for a customized balayage and toner gloss. Left looking like I stepped out of a high-fashion magazine! The blend is seamless and my hair still feels silky and healthy.',
    date: '2026-09-12',
    verified: true,
    likes: 11,
    recommended: true,
    status: 'approved',
    tags: ['Seamless Blend', 'Healthy Hair', 'Expert Advice'],
    featured: true
  },
  {
    id: 'rev-105',
    customerName: 'Ananya Roy',
    service: 'Full Body Organic Waxing',
    serviceCategory: 'waxing',
    rating: 5,
    review: 'Quick, virtually painless, and extremely hygienic stripless waxing. Janki is so warm and professional. Highly recommend to anyone looking for a reliable aesthetician in Ottawa.',
    date: '2026-09-08',
    verified: true,
    likes: 9,
    recommended: true,
    status: 'approved',
    tags: ['Painless', 'Hygienic', 'Quick'],
    featured: false
  },
  {
    id: 'rev-106',
    customerName: 'Jessica Tremblay',
    service: 'Lash Extensions & Lift',
    serviceCategory: 'lashes',
    rating: 5,
    review: 'Got a lash lift and tint before my vacation. They looked gorgeous for a whole month with zero mascara needed! Such high quality work.',
    date: '2026-09-01',
    verified: true,
    likes: 8,
    recommended: true,
    status: 'approved',
    tags: ['Long-lasting', 'Natural Look'],
    featured: false
  },
  {
    id: 'rev-107',
    customerName: 'Sonia Kapoor',
    service: 'Royal Indian Head & Scalp Massage',
    serviceCategory: 'massage',
    rating: 5,
    review: 'The warm herbal scalp therapy and shoulder massage melted away all my stress. Janki’s acupressure techniques are pure bliss! My hair feels so soft and revitalized.',
    date: '2026-08-28',
    verified: true,
    likes: 15,
    recommended: true,
    status: 'approved',
    tags: ['Relaxing Ambience', 'Scalp Therapy', 'Stress Relief'],
    featured: false
  },
  {
    id: 'rev-108',
    customerName: 'Kavita Reddy',
    service: 'Royal HD Airbrush Bridal Makeover',
    serviceCategory: 'makeup',
    rating: 5,
    review: 'Janki created the most flawless bridal makeup look for my reception! It stayed intact for 14 hours straight without fading. She listened to exactly what I wanted.',
    date: '2026-08-20',
    verified: true,
    likes: 22,
    recommended: true,
    status: 'approved',
    tags: ['Bridal Specialist', 'Long-lasting', 'HD Airbrush'],
    featured: false
  },
  {
    id: 'rev-109',
    customerName: 'Chloe Bennett',
    service: 'Signature Haircut & Blowdry Styling',
    serviceCategory: 'haircut',
    rating: 5,
    review: 'Janki gave me the precise face-framing layers and voluminous blowout I have been trying to get for years! She is truly a master stylist.',
    date: '2026-08-15',
    verified: true,
    likes: 12,
    recommended: true,
    status: 'approved',
    tags: ['Stunning Result', 'Volume Blowout', 'Precision Cut'],
    featured: false
  },
  {
    id: 'rev-110',
    customerName: 'Riya Verma',
    service: 'GLAM GIRL Signature Beauty Ritual Combo',
    serviceCategory: 'signature-combo',
    rating: 5,
    review: 'Booked the signature combo package including threading, facial, and scalp massage. Hands down the best pampering value in Ottawa. Left feeling completely rejuvenated!',
    date: '2026-08-10',
    verified: true,
    likes: 19,
    recommended: true,
    status: 'approved',
    tags: ['Best Value', 'Full Pampering', 'Clean Studio'],
    featured: false
  }
];

class SalonDatabase {
  constructor() {
    this.initDatabase();

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (Object.values(DB_KEYS).includes(e.key)) {
          notifySubscribers('storage_sync', { key: e.key });
        }
      });
    }
  }

  initDatabase() {
    if (typeof window === 'undefined') return;

    // 1. Seed & Sync Master Services & Categories (Ensures latest /images/threading/ and /images/facial/ image paths)
    localStorage.setItem(DB_KEYS.SERVICES, JSON.stringify(ALL_SERVICES.map(s => ({ ...s, active: true }))));
    localStorage.setItem(DB_KEYS.CATEGORIES, JSON.stringify(CATEGORIES));

    // 3. Seed Appointments if missing
    if (!localStorage.getItem(DB_KEYS.APPOINTMENTS)) {
      const legacy = localStorage.getItem('girl-looked-for-you-appointments');
      if (legacy) {
        localStorage.setItem(DB_KEYS.APPOINTMENTS, legacy);
      } else {
        localStorage.setItem(DB_KEYS.APPOINTMENTS, JSON.stringify(DEFAULT_APPOINTMENTS));
      }
    }

    // 4. Seed Reviews if missing
    if (!localStorage.getItem(DB_KEYS.REVIEWS)) {
      localStorage.setItem(DB_KEYS.REVIEWS, JSON.stringify(DEFAULT_REVIEWS));
    }

    // 5. Seed Settings if missing
    if (!localStorage.getItem(DB_KEYS.SETTINGS)) {
      localStorage.setItem(DB_KEYS.SETTINGS, JSON.stringify({
        salonName: import.meta.env.VITE_SALON_NAME || 'GLAM GIRL BY JANKI',
        whatsappPhone: import.meta.env.VITE_WHATSAPP_PHONE_NUMBER || '16162550549',
        phone: '+1 (616) 255-0549',
        email: 'Glamgirlbyjanki@gmail.com',
        address: SALON_INFO.address,
        city: SALON_INFO.city,
        hours: 'Mon-Sat: 9:30 AM – 7:30 PM • Sun: 10:00 AM – 5:30 PM'
      }));
    }
  }

  // ==========================================
  // APPOINTMENTS & AUTO-ACCEPT SCHEDULER
  // ==========================================

  getAppointments() {
    try {
      // Check primary key first, fallback to legacy key
      const data = localStorage.getItem(DB_KEYS.APPOINTMENTS) || localStorage.getItem('girl-looked-for-you-appointments');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Error reading appointments:', e);
      return [];
    }
  }

  normalizeDate(d) {
    if (!d) return '';
    const str = String(d).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;
    try {
      const parsed = new Date(str.includes('T') ? str : str + 'T00:00:00');
      if (!isNaN(parsed.getTime())) {
        const y = parsed.getFullYear();
        const m = String(parsed.getMonth() + 1).padStart(2, '0');
        const day = String(parsed.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
      }
    } catch (e) {}
    return str.toLowerCase();
  }

  normalizeTime(t) {
    if (!t) return '';
    return String(t).trim().replace(/^0/, '').toUpperCase();
  }

  /**
   * Check if a specific Date and Time slot is currently free or occupied
   * Returns { available: boolean, conflict: object | null }
   */
  checkSlotAvailability(date, time) {
    const appointments = this.getAppointments();
    const targetDate = this.normalizeDate(date);
    const targetTime = this.normalizeTime(time);
    
    // Match exact Date + Time (excluding cancelled bookings)
    const conflict = appointments.find(
      (a) =>
        this.normalizeDate(a.date) === targetDate &&
        this.normalizeTime(a.time) === targetTime &&
        a.status !== 'Cancelled'
    );

    return {
      available: !conflict,
      conflict: conflict || null
    };
  }

  /**
   * Reusable helper method: isSlotBooked(date, time)
   * Returns true ONLY if date + time match an active booking
   */
  isSlotBooked(date, time) {
    if (!date || !time) return false;
    const { available } = this.checkSlotAvailability(date, time);
    return !available;
  }

  /**
   * Add a new appointment with default Pending Owner Confirmation status
   */
  addAppointment(bookingData) {
    const appointments = this.getAppointments();
    const { available, conflict } = this.checkSlotAvailability(bookingData.date, bookingData.time);

    const bookingId = bookingData.id || `GGJ-${Math.floor(100000 + Math.random() * 900000)}`;

    const newBooking = {
      ...bookingData,
      id: bookingId,
      status: bookingData.status || 'Pending',
      isAutoAccepted: false,
      slotConflict: !available,
      conflictingWith: !available ? (conflict?.customerName || 'Active Guest') : null,
      submittedAt: new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })
    };

    const updated = [newBooking, ...appointments];
    localStorage.setItem(DB_KEYS.APPOINTMENTS, JSON.stringify(updated));
    
    // Also sync to legacy key for backwards compatibility
    localStorage.setItem('girl-looked-for-you-appointments', JSON.stringify(updated));

    notifySubscribers('appointment_added', newBooking);
    return newBooking;
  }

  updateAppointmentStatus(id, newStatus) {
    const appointments = this.getAppointments();
    const updated = appointments.map((a) => {
      if (a.id === id) {
        return {
          ...a,
          status: newStatus,
          slotConflict: newStatus === 'Cancelled' ? false : a.slotConflict
        };
      }
      return a;
    });

    localStorage.setItem(DB_KEYS.APPOINTMENTS, JSON.stringify(updated));
    localStorage.setItem('girl-looked-for-you-appointments', JSON.stringify(updated));
    notifySubscribers('appointment_updated', { id, status: newStatus });
    return updated;
  }

  deleteAppointment(id) {
    const appointments = this.getAppointments();
    const updated = appointments.filter((a) => a.id !== id);
    localStorage.setItem(DB_KEYS.APPOINTMENTS, JSON.stringify(updated));
    localStorage.setItem('girl-looked-for-you-appointments', JSON.stringify(updated));
    notifySubscribers('appointment_deleted', { id });
    return updated;
  }

  // ==========================================
  // SERVICES REPOSITORY
  // ==========================================

  getServices() {
    try {
      const data = localStorage.getItem(DB_KEYS.SERVICES);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {}
    return ALL_SERVICES.map(s => ({ ...s, active: true }));
  }

  getServicesByCategory(categoryId) {
    const services = this.getServices();
    if (categoryId === 'all') return services.filter(s => s.active !== false);
    
    // Support category ID or category slug or category name match
    const target = String(categoryId).toLowerCase();
    return services.filter((s) => {
      if (s.active === false) return false;
      const sCat = String(s.category || '').toLowerCase();
      const sCatName = String(s.categoryName || '').toLowerCase();
      return sCat === target || sCatName === target || sCat.replace(/[^a-z0-9]+/g, '-') === target;
    });
  }

  getServiceById(id) {
    if (!id) return null;
    const services = this.getServices();
    const query = String(id).toLowerCase();
    return services.find((s) => 
      s.id === id || 
      (s.slug && s.slug.toLowerCase() === query) ||
      s.name.toLowerCase() === query
    ) || null;
  }

  getServiceBySlug(slug) {
    if (!slug) return null;
    const services = this.getServices();
    const target = String(slug).toLowerCase().trim();
    return services.find((s) => {
      const sSlug = String(s.slug || '').toLowerCase();
      const sId = String(s.id || '').toLowerCase();
      const sNameSlug = String(s.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return sSlug === target || sId === target || sNameSlug === target;
    }) || null;
  }

  getCategoryBySlug(slug) {
    if (!slug) return null;
    const categories = this.getCategories();
    const target = String(slug).toLowerCase().trim();
    return categories.find((c) => {
      const cId = String(c.id || '').toLowerCase();
      const cSlug = String(c.slug || '').toLowerCase();
      const cNameSlug = String(c.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return cSlug === target || cId === target || cNameSlug === target;
    }) || null;
  }

  getRelatedServices(currentServiceId, categoryId, limit = 4) {
    const all = this.getServicesByCategory(categoryId);
    const filtered = all.filter(s => s.id !== currentServiceId && s.slug !== currentServiceId);
    if (filtered.length >= limit) {
      return filtered.slice(0, limit);
    }
    // Fallback: pick other services if category has fewer
    const otherServices = this.getServices().filter(s => s.id !== currentServiceId && s.active !== false);
    return [...filtered, ...otherServices.filter(s => !filtered.some(f => f.id === s.id))].slice(0, limit);
  }

  addService(newService) {
    const services = this.getServices();
    const id = newService.id || `srv-${Date.now()}`;
    const slug = newService.slug || newService.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const serviceToAdd = {
      ...newService,
      id,
      slug,
      active: newService.active !== false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updated = [serviceToAdd, ...services];
    localStorage.setItem(DB_KEYS.SERVICES, JSON.stringify(updated));
    notifySubscribers('services_updated', updated);
    return serviceToAdd;
  }

  updateService(id, updates) {
    const services = this.getServices();
    const updated = services.map((s) => {
      if (s.id === id || s.slug === id) {
        return { 
          ...s, 
          ...updates,
          updatedAt: new Date().toISOString() 
        };
      }
      return s;
    });

    localStorage.setItem(DB_KEYS.SERVICES, JSON.stringify(updated));
    localStorage.setItem('girl-looked-for-you-custom-services', JSON.stringify(updated));
    notifySubscribers('services_updated', updated);
    return updated;
  }

  deleteService(id) {
    const services = this.getServices();
    const updated = services.filter((s) => s.id !== id && s.slug !== id);
    localStorage.setItem(DB_KEYS.SERVICES, JSON.stringify(updated));
    localStorage.setItem('girl-looked-for-you-custom-services', JSON.stringify(updated));
    notifySubscribers('services_updated', updated);
    return updated;
  }

  // ==========================================
  // CATEGORIES REPOSITORY
  // ==========================================

  getCategories() {
    try {
      const data = localStorage.getItem(DB_KEYS.CATEGORIES);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return CATEGORIES;
  }

  // ==========================================
  // SETTINGS REPOSITORY
  // ==========================================

  getSettings() {
    try {
      const data = localStorage.getItem(DB_KEYS.SETTINGS);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return {
      salonName: 'GLAM GIRL BY JANKI',
      whatsappPhone: '16162550549',
      phone: '+1 (616) 255-0549',
      email: 'Glamgirlbyjanki@gmail.com'
    };
  }

  updateSettings(updates) {
    const current = this.getSettings();
    const updated = { ...current, ...updates };
    localStorage.setItem(DB_KEYS.SETTINGS, JSON.stringify(updated));
    notifySubscribers('settings_updated', updated);
    return updated;
  }

  // ==========================================
  // REVIEWS REPOSITORY & REAL-TIME STATS
  // ==========================================

  getReviews() {
    try {
      const data = localStorage.getItem(DB_KEYS.REVIEWS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Error reading reviews:', e);
    }
    return DEFAULT_REVIEWS;
  }

  getApprovedReviews() {
    const reviews = this.getReviews();
    return reviews.filter(r => r.status === 'approved' || !r.status);
  }

  addReview(newReviewData) {
    const reviews = this.getReviews();
    const id = newReviewData.id || `rev-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];

    const reviewToAdd = {
      id,
      customerName: (newReviewData.customerName || 'Delighted Guest').trim(),
      service: newReviewData.service || 'Salon Ritual',
      serviceCategory: newReviewData.serviceCategory || 'other',
      rating: Number(newReviewData.rating) || 5,
      review: (newReviewData.review || '').trim(),
      date: newReviewData.date || today,
      verified: newReviewData.verified !== undefined ? newReviewData.verified : true,
      likes: Number(newReviewData.likes) || 0,
      recommended: newReviewData.recommended !== undefined ? newReviewData.recommended : true,
      status: newReviewData.status || 'approved', // Auto-approved for instant real-time live preview
      tags: Array.isArray(newReviewData.tags) && newReviewData.tags.length > 0 
        ? newReviewData.tags 
        : ['Verified Client', '5-Star Experience'],
      featured: Boolean(newReviewData.featured),
      createdAt: new Date().toISOString()
    };

    const updated = [reviewToAdd, ...reviews];
    localStorage.setItem(DB_KEYS.REVIEWS, JSON.stringify(updated));
    notifySubscribers('review_added', reviewToAdd);
    return reviewToAdd;
  }

  updateReviewStatus(id, newStatus) {
    const reviews = this.getReviews();
    const updated = reviews.map(r => {
      if (r.id === id) {
        return { ...r, status: newStatus };
      }
      return r;
    });
    localStorage.setItem(DB_KEYS.REVIEWS, JSON.stringify(updated));
    notifySubscribers('review_updated', { id, status: newStatus });
    return updated;
  }

  toggleReviewFeatured(id) {
    const reviews = this.getReviews();
    const updated = reviews.map(r => {
      if (r.id === id) {
        return { ...r, featured: !r.featured };
      }
      return r;
    });
    localStorage.setItem(DB_KEYS.REVIEWS, JSON.stringify(updated));
    notifySubscribers('review_updated', { id });
    return updated;
  }

  toggleReviewLike(id) {
    try {
      const likedRaw = localStorage.getItem(DB_KEYS.LIKED_REVIEWS);
      const likedSet = new Set(likedRaw ? JSON.parse(likedRaw) : []);
      const isCurrentlyLiked = likedSet.has(id);

      if (isCurrentlyLiked) {
        likedSet.delete(id);
      } else {
        likedSet.add(id);
      }
      localStorage.setItem(DB_KEYS.LIKED_REVIEWS, JSON.stringify(Array.from(likedSet)));

      const reviews = this.getReviews();
      const updated = reviews.map(r => {
        if (r.id === id) {
          const currentLikes = Number(r.likes) || 0;
          return {
            ...r,
            likes: Math.max(0, currentLikes + (isCurrentlyLiked ? -1 : 1))
          };
        }
        return r;
      });

      localStorage.setItem(DB_KEYS.REVIEWS, JSON.stringify(updated));
      notifySubscribers('review_liked', { id, isLiked: !isCurrentlyLiked });
      return { isLiked: !isCurrentlyLiked, reviews: updated };
    } catch (e) {
      console.warn('Error toggling review like:', e);
      return { isLiked: false, reviews: this.getReviews() };
    }
  }

  isReviewLiked(id) {
    try {
      const likedRaw = localStorage.getItem(DB_KEYS.LIKED_REVIEWS);
      const likedSet = new Set(likedRaw ? JSON.parse(likedRaw) : []);
      return likedSet.has(id);
    } catch (e) {
      return false;
    }
  }

  deleteReview(id) {
    const reviews = this.getReviews();
    const updated = reviews.filter(r => r.id !== id);
    localStorage.setItem(DB_KEYS.REVIEWS, JSON.stringify(updated));
    notifySubscribers('review_deleted', { id });
    return updated;
  }

  getReviewStats() {
    const approved = this.getApprovedReviews();
    const total = approved.length;
    if (total === 0) {
      return {
        averageRating: 5.0,
        totalReviews: 0,
        recommendedPercent: 100,
        starCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        starPercentages: { 5: 100, 4: 0, 3: 0, 2: 0, 1: 0 }
      };
    }

    let sum = 0;
    let recommendedCount = 0;
    const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    approved.forEach(r => {
      const rating = Math.min(5, Math.max(1, Math.round(Number(r.rating) || 5)));
      sum += Number(r.rating) || 5;
      starCounts[rating] = (starCounts[rating] || 0) + 1;
      if (r.recommended !== false) recommendedCount++;
    });

    const averageRating = Number((sum / total).toFixed(1));
    const recommendedPercent = Math.round((recommendedCount / total) * 100);
    const starPercentages = {
      5: Math.round((starCounts[5] / total) * 100),
      4: Math.round((starCounts[4] / total) * 100),
      3: Math.round((starCounts[3] / total) * 100),
      2: Math.round((starCounts[2] / total) * 100),
      1: Math.round((starCounts[1] / total) * 100)
    };

    return {
      averageRating,
      totalReviews: total,
      recommendedPercent,
      starCounts,
      starPercentages
    };
  }

  /**
   * Verify if a user has a valid completed appointment eligible for review
   */
  verifyAppointmentForReview(query) {
    if (!query || !String(query).trim()) {
      return {
        valid: false,
        message: 'Please enter your Booking ID (e.g., GGJ-782910) or registered phone number.'
      };
    }

    const rawInput = String(query).trim();
    const clean = rawInput.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanDigits = rawInput.replace(/\D/g, '');
    const appointments = this.getAppointments();

    const match = appointments.find((a) => {
      const aId = String(a.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const aPhone = String(a.phone || '').replace(/\D/g, '');
      const aEmail = String(a.email || '').toLowerCase().trim();

      const matchId = aId && aId === clean;
      const matchPhone = cleanDigits.length >= 7 && aPhone && aPhone.endsWith(cleanDigits);
      const matchEmail = aEmail && aEmail === rawInput.toLowerCase();

      return matchId || matchPhone || matchEmail;
    });

    if (!match) {
      return {
        valid: false,
        appointment: null,
        message: 'No appointment found matching this Booking ID or Phone Number. Only clients with a completed treatment can leave a review.'
      };
    }

    const status = String(match.status || 'Pending');
    const isCompleted = status.toLowerCase() === 'completed';

    if (!isCompleted) {
      return {
        valid: false,
        appointment: match,
        status,
        message: `Your booking (${match.id}) for ${match.service} is currently marked as "${status}". Reviews can be posted after your treatment is completed!`
      };
    }

    return {
      valid: true,
      appointment: match,
      status,
      message: `Verified! Completed treatment (${match.id}) found for ${match.customerName}.`
    };
  }

  // ==========================================
  // REACTIVE SUBSCRIBER
  // ==========================================

  subscribe(callback) {
    subscribers.add(callback);
    return () => {
      subscribers.delete(callback);
    };
  }
}

// Export singleton instance
export const salonDB = new SalonDatabase();
export default salonDB;
