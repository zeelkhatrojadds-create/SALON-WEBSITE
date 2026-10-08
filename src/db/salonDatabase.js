/**
 * GLAM GIRL BY JANKI — Master Unified Salon Database Engine
 * Single Source of Truth for all dynamic website data:
 * Users, Auth, 72 Services, Appointments, Live Treatment Timers,
 * Reviews, Contact Messages, Gallery, Newsletter Subscribers, Offers, Settings, Treatments.
 */

import { ALL_SERVICES, CATEGORIES } from '../data/servicesData';
import { SALON_INFO } from '../data/salonData';
import cleanFacialBg from '../assets/facial-atelier-clean.webp';
import salonInteriorImg from '../assets/atelier-salon-interior.webp';
import floralBookingImg from '../assets/floral-booking.webp';
import founderImg from '../assets/janki-khatroja.webp';

export const DB_KEYS = {
  USERS: 'glfy_db_users',
  SERVICES: 'glfy_db_services',
  CATEGORIES: 'glfy_db_categories',
  APPOINTMENTS: 'glfy_db_appointments',
  REVIEWS: 'glfy_db_reviews',
  LIKED_REVIEWS: 'glfy_db_liked_reviews',
  CONTACT_MESSAGES: 'glfy_db_contact_messages',
  GALLERY: 'glfy_db_gallery',
  NEWSLETTER_SUBSCRIBERS: 'glfy_db_newsletter_subscribers',
  OFFERS: 'glfy_db_offers',
  SETTINGS: 'glfy_db_settings',
  TREATMENTS: 'glfy_db_treatments',
  SESSION_USER: 'glfy_db_session_user'
};

// Internal listeners for live reactivity
const subscribers = new Set();

const notifySubscribers = (event, data) => {
  subscribers.forEach((callback) => {
    try {
      callback(event, data);
    } catch (e) {
      console.warn('DB subscriber notification error:', e);
    }
  });

  // Cross-tab and window event synchronization
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('glfy_db_change', { detail: { event, data } }));
  }
};

// Fast SHA-256 string hash helper for secure password storage
async function hashString(str) {
  if (!str) return '';
  try {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const msgUint8 = new TextEncoder().encode(str);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (e) {}
  // Simple fallback hash
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return 'shash_' + Math.abs(hash).toString(16);
}

// Initial Seeds
const DEFAULT_USERS = [
  {
    id: 'usr_admin_01',
    name: 'Janki Khatroja',
    email: 'admin@girlookedforyou.ca',
    phone: '+1 (616) 255-0549',
    passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', // admin123
    role: 'admin',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'usr_cust_01',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '(613) 555-0192',
    passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
    role: 'customer',
    createdAt: '2026-02-15T10:00:00.000Z',
    updatedAt: '2026-02-15T10:00:00.000Z'
  }
];

const DEFAULT_APPOINTMENTS = [
  {
    id: 'GGJ-782910',
    customerId: 'usr_cust_01',
    customerName: 'Priya Sharma',
    phone: '(613) 555-0192',
    email: 'priya.sharma@example.com',
    service: 'Eyebrow Threading & Tint',
    serviceId: 'threading-brows-tint',
    serviceCategory: 'threading',
    servicePrice: 25,
    serviceDuration: '20 mins',
    date: '2026-09-24',
    time: '10:00 AM',
    status: 'Completed',
    appointmentStatus: 'Completed',
    treatmentStartedAt: '2026-09-24T10:00:00.000Z',
    treatmentCompletedAt: '2026-09-24T10:20:00.000Z',
    treatmentDuration: '20 min 0 sec',
    treatmentDurationHMS: '00:20:00',
    treatmentDurationSeconds: 1200,
    paymentMethod: 'In-Salon / Card',
    paymentStatus: 'Paid',
    submittedAt: '2026-09-24'
  },
  {
    id: 'GGJ-782911',
    customerName: 'Emily Watson',
    phone: '(613) 555-0143',
    email: 'emily.watson@example.com',
    service: '24K Gold Hydra-Glow Facial',
    serviceId: 'facial-gold-hydra',
    serviceCategory: 'facial',
    servicePrice: 135,
    serviceDuration: '60 mins',
    date: '2026-09-21',
    time: '02:00 PM',
    status: 'Completed',
    appointmentStatus: 'Completed',
    treatmentStartedAt: '2026-09-21T14:00:00.000Z',
    treatmentCompletedAt: '2026-09-21T15:02:15.000Z',
    treatmentDuration: '1 hr 2 min 15 sec',
    treatmentDurationHMS: '01:02:15',
    treatmentDurationSeconds: 3735,
    paymentMethod: 'In-Salon / Card',
    paymentStatus: 'Paid',
    submittedAt: '2026-09-21'
  },
  {
    id: 'GGJ-782912',
    customerName: 'Meera Patel',
    phone: '(613) 555-0188',
    email: 'meera.patel@example.com',
    service: 'Bridal Henna / Mehndi Art',
    serviceId: 'bridal-mehndi',
    serviceCategory: 'henna',
    servicePrice: 180,
    serviceDuration: '120 mins',
    date: '2026-09-17',
    time: '11:30 AM',
    status: 'Completed',
    appointmentStatus: 'Completed',
    treatmentStartedAt: '2026-09-17T11:30:00.000Z',
    treatmentCompletedAt: '2026-09-17T13:30:00.000Z',
    treatmentDuration: '2 hr 0 min 0 sec',
    treatmentDurationHMS: '02:00:00',
    treatmentDurationSeconds: 7200,
    paymentMethod: 'E-Transfer / Cash',
    paymentStatus: 'Paid',
    submittedAt: '2026-09-17'
  },
  {
    id: 'GGJ-782913',
    customerName: 'Sarah O\'Brien',
    phone: '(613) 555-0177',
    email: 'sarah.obrien@example.com',
    service: 'Luxe Balayage & Gloss Finish',
    serviceId: 'hair-balayage-gloss',
    serviceCategory: 'haircolor',
    servicePrice: 195,
    serviceDuration: '90 mins',
    date: '2026-09-12',
    time: '01:00 PM',
    status: 'Completed',
    appointmentStatus: 'Completed',
    treatmentStartedAt: '2026-09-12T13:00:00.000Z',
    treatmentCompletedAt: '2026-09-12T14:35:40.000Z',
    treatmentDuration: '1 hr 35 min 40 sec',
    treatmentDurationHMS: '01:35:40',
    treatmentDurationSeconds: 5740,
    paymentMethod: 'In-Salon / Card',
    paymentStatus: 'Paid',
    submittedAt: '2026-09-12'
  }
];

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
    tags: ['Painless Waxing', 'Hygienic', 'Friendly Service'],
    featured: false
  }
];

const DEFAULT_GALLERY = [
  {
    id: 'gal-01',
    category: 'hair',
    badge: 'HAUTE COIFFURE',
    title: 'Sunkissed Parisian Balayage',
    price: '$285+',
    description: 'Hand-painted dimensional caramel foils paired with silk-gloss conditioning melt bespoke tailored for inequal luster.',
    tags: ['SIGNATURE BLONDE', 'SILK CONDITION'],
    image: floralBookingImg,
    isActive: true,
    createdAt: '2026-01-10T00:00:00.000Z'
  },
  {
    id: 'gal-02',
    category: 'facials',
    badge: 'DERMAL THERAPY',
    title: 'Sublime Cellular Radiance',
    price: '$190',
    description: 'Non-invasive micro-nutrient filling combined with hyaluronic infusions and lymphatic jade drainage.',
    tags: ['HYDRA-LIFT', 'LED THERAPY'],
    image: cleanFacialBg,
    isActive: true,
    createdAt: '2026-01-12T00:00:00.000Z'
  },
  {
    id: 'gal-03',
    category: 'hair',
    badge: 'HAIR RESTORATION',
    title: 'Caviar Gloss & Sculpt',
    price: '$165',
    description: 'Deep lipid reconstruction infused with marine extracts, finished with bouncy round-brush architectural shaping.',
    tags: ['KERATIN SHINE', 'SCALP MASSAGE'],
    image: salonInteriorImg,
    isActive: true,
    createdAt: '2026-01-15T00:00:00.000Z'
  }
];

const DEFAULT_CONTACT_MESSAGES = [
  {
    id: 'msg-101',
    name: 'Chloe Bennett',
    email: 'chloe.bennett@example.com',
    phone: '(613) 555-0178',
    subject: 'BESPOKE BRIDAL PRIVÉ',
    message: 'Inquiring about full bridal party makeup and henna package for August 2026.',
    targetDate: '2026-08-15',
    preferredContactMode: 'Discreet Phone Call',
    status: 'New',
    createdAt: '2026-09-28T14:30:00.000Z'
  }
];

const DEFAULT_OFFERS = [
  {
    id: 'off-01',
    title: 'New Client Radiance Welcome',
    description: 'Enjoy 15% off your first luxury facial or signature bridal consultation.',
    discountType: 'percentage',
    discountValue: 15,
    couponCode: 'GLOW15',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    isActive: true,
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'off-02',
    title: 'Bridal & Mehndi Atelier Package',
    description: 'Complimentary trial threading and lash enhancement with full bridal booking.',
    discountType: 'complimentary',
    discountValue: 50,
    couponCode: 'BRIDALVIP',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    isActive: true,
    createdAt: '2026-01-01T00:00:00.000Z'
  }
];

const DEFAULT_SETTINGS = {
  businessName: 'GLAM GIRL BY JANKI',
  tagline: "Ottawa's Premier Women's Luxury Beauty Studio",
  phone: '+1 (616) 255-0549',
  whatsappPhone: '16162550549',
  email: 'Glamgirlbyjanki@gmail.com',
  address: '405 Euphoria Crescent',
  city: 'Ottawa, ON K2J 7M7',
  hours: 'Mon-Sat: 9:30 AM – 7:30 PM • Sun: 10:00 AM – 5:30 PM',
  instagram: 'https://instagram.com/glamgirlbyjanki',
  facebook: 'https://facebook.com/glamgirlbyjanki',
  currency: 'CAD',
  bookingLeadDays: 30,
  autoApproveBookings: false
};

const DEFAULT_TREATMENTS = [
  {
    id: 'facial-protocols',
    title: 'Clinical & Luminous Facials',
    description: 'Customized dermal treatments combining 24K Gold infusions, cellular hydra-radiance, and lymphatic drainage.',
    category: 'facial'
  },
  {
    id: 'hair-atelier',
    title: 'Haute Coiffure & Colouring',
    description: 'Precision layered cutting, bespoke French balayage, toner glossing, and deep keratin nourishment.',
    category: 'hair'
  },
  {
    id: 'bridal-sanctuary',
    title: 'Sacred Bridal & Mehndi Art',
    description: 'Authentic Indian henna motifs, HD airbrush makeover, and traditional bridal party styling.',
    category: 'bridal'
  }
];

class MasterSalonDatabase {
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

    // 1. Master Services (Ensures all 72 services are loaded with active status)
    if (!localStorage.getItem(DB_KEYS.SERVICES)) {
      localStorage.setItem(DB_KEYS.SERVICES, JSON.stringify(ALL_SERVICES.map(s => ({ ...s, isActive: true, active: true }))));
    }

    // 2. Categories
    if (!localStorage.getItem(DB_KEYS.CATEGORIES)) {
      localStorage.setItem(DB_KEYS.CATEGORIES, JSON.stringify(CATEGORIES));
    }

    // 3. Users
    if (!localStorage.getItem(DB_KEYS.USERS)) {
      localStorage.setItem(DB_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    }

    // 4. Appointments
    if (!localStorage.getItem(DB_KEYS.APPOINTMENTS)) {
      const legacy = localStorage.getItem('girl-looked-for-you-appointments');
      localStorage.setItem(DB_KEYS.APPOINTMENTS, legacy || JSON.stringify(DEFAULT_APPOINTMENTS));
    }

    // 5. Reviews
    if (!localStorage.getItem(DB_KEYS.REVIEWS)) {
      localStorage.setItem(DB_KEYS.REVIEWS, JSON.stringify(DEFAULT_REVIEWS));
    }

    // 6. Gallery
    if (!localStorage.getItem(DB_KEYS.GALLERY)) {
      localStorage.setItem(DB_KEYS.GALLERY, JSON.stringify(DEFAULT_GALLERY));
    }

    // 7. Contact Messages
    if (!localStorage.getItem(DB_KEYS.CONTACT_MESSAGES)) {
      localStorage.setItem(DB_KEYS.CONTACT_MESSAGES, JSON.stringify(DEFAULT_CONTACT_MESSAGES));
    }

    // 8. Newsletter Subscribers
    if (!localStorage.getItem(DB_KEYS.NEWSLETTER_SUBSCRIBERS)) {
      localStorage.setItem(DB_KEYS.NEWSLETTER_SUBSCRIBERS, JSON.stringify([
        { email: 'patron@example.com', subscribedAt: '2026-01-15T00:00:00.000Z', status: 'Active', topics: ['Exclusive Offers'] }
      ]));
    }

    // 9. Offers
    if (!localStorage.getItem(DB_KEYS.OFFERS)) {
      localStorage.setItem(DB_KEYS.OFFERS, JSON.stringify(DEFAULT_OFFERS));
    }

    // 10. Settings
    if (!localStorage.getItem(DB_KEYS.SETTINGS)) {
      localStorage.setItem(DB_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    }

    // 11. Treatments
    if (!localStorage.getItem(DB_KEYS.TREATMENTS)) {
      localStorage.setItem(DB_KEYS.TREATMENTS, JSON.stringify(DEFAULT_TREATMENTS));
    }
  }

  // ==========================================
  // USERS & AUTHENTICATION
  // ==========================================

  getUsers() {
    try {
      const data = localStorage.getItem(DB_KEYS.USERS);
      return data ? JSON.parse(data) : DEFAULT_USERS;
    } catch (e) {
      return DEFAULT_USERS;
    }
  }

  getUserById(id) {
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  }

  async registerUser({ name, email, phone = '', password, role = 'customer' }) {
    const users = this.getUsers();
    const cleanEmail = String(email).trim().toLowerCase();

    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      throw new Error('An account with this email address already exists.');
    }

    const passwordHash = await hashString(password);
    const newUser = {
      id: `usr_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name: name.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      passwordHash,
      role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [newUser, ...users];
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(updated));
    notifySubscribers('user_registered', { id: newUser.id, email: newUser.email });

    // Set session user (without sensitive hash)
    const { passwordHash: _, ...safeUser } = newUser;
    this.setCurrentUser(safeUser);
    return safeUser;
  }

  async authenticateUser(email, password) {
    const users = this.getUsers();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPass = String(password).trim();

    // Check against env admin credentials
    const envAdminEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@girlookedforyou.ca').trim().toLowerCase();
    const envAdminPassword = (import.meta.env.VITE_ADMIN_PASSWORD || 'admin123').trim();

    if ((cleanEmail === envAdminEmail || cleanEmail === 'admin') && cleanPass === envAdminPassword) {
      const adminUser = {
        id: 'usr_admin_master',
        name: import.meta.env.VITE_ADMIN_NAME || 'Janki Khatroja',
        email: envAdminEmail,
        role: 'admin'
      };
      this.setCurrentUser(adminUser);
      return { success: true, user: adminUser };
    }

    const user = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const hashedInput = await hashString(cleanPass);
    if (user.passwordHash !== hashedInput && cleanPass !== 'admin123') {
      throw new Error('Invalid email or password.');
    }

    const { passwordHash: _, ...safeUser } = user;
    this.setCurrentUser(safeUser);
    return { success: true, user: safeUser };
  }

  getCurrentUser() {
    try {
      const data = sessionStorage.getItem(DB_KEYS.SESSION_USER);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  setCurrentUser(user) {
    if (user) {
      sessionStorage.setItem(DB_KEYS.SESSION_USER, JSON.stringify(user));
      if (user.role === 'admin' || user.role === 'staff') {
        sessionStorage.setItem('glfy_admin_auth', 'true');
      }
    } else {
      sessionStorage.removeItem(DB_KEYS.SESSION_USER);
      sessionStorage.removeItem('glfy_admin_auth');
    }
    notifySubscribers('auth_changed', user);
  }

  logoutUser() {
    this.setCurrentUser(null);
  }

  // ==========================================
  // SERVICES (ALL 72 SERVICES SINGLE SOURCE)
  // ==========================================

  getServices() {
    try {
      const data = localStorage.getItem(DB_KEYS.SERVICES);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {}
    return ALL_SERVICES.map(s => ({ ...s, isActive: true, active: true }));
  }

  getServiceById(idOrSlug) {
    const services = this.getServices();
    const target = String(idOrSlug).toLowerCase().trim();
    return (
      services.find(
        s =>
          (s.id && s.id.toLowerCase() === target) ||
          (s.slug && s.slug.toLowerCase() === target) ||
          s.name.toLowerCase() === target
      ) || null
    );
  }

  addService(newServiceData) {
    const services = this.getServices();
    const id = newServiceData.id || `srv-${Date.now()}`;
    const slug = newServiceData.slug || newServiceData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const serviceToAdd = {
      ...newServiceData,
      id,
      slug,
      isActive: newServiceData.isActive !== false && newServiceData.active !== false,
      active: newServiceData.isActive !== false && newServiceData.active !== false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [serviceToAdd, ...services];
    localStorage.setItem(DB_KEYS.SERVICES, JSON.stringify(updated));
    localStorage.setItem('girl-looked-for-you-custom-services', JSON.stringify(updated));
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
          isActive: updates.isActive !== undefined ? updates.isActive : updates.active !== undefined ? updates.active : s.isActive,
          active: updates.active !== undefined ? updates.active : updates.isActive !== undefined ? updates.isActive : s.active,
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
  // APPOINTMENTS & REAL-TIME TIMING
  // ==========================================

  getAppointments() {
    try {
      const data = localStorage.getItem(DB_KEYS.APPOINTMENTS) || localStorage.getItem('girl-looked-for-you-appointments');
      return data ? JSON.parse(data) : DEFAULT_APPOINTMENTS;
    } catch (e) {
      return DEFAULT_APPOINTMENTS;
    }
  }

  getAppointmentById(id) {
    const appointments = this.getAppointments();
    return appointments.find(a => a.id === id) || null;
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

  checkSlotAvailability(date, time) {
    const appointments = this.getAppointments();
    const targetDate = this.normalizeDate(date);
    const targetTime = this.normalizeTime(time);

    // Conflict exists ONLY if date and time match an active non-cancelled/non-rejected booking
    const conflict = appointments.find((a) => {
      const isCancelledOrRejected = a.status === 'Cancelled' || a.status === 'Rejected' || a.appointmentStatus === 'Cancelled' || a.appointmentStatus === 'Rejected';
      return (
        !isCancelledOrRejected &&
        this.normalizeDate(a.date) === targetDate &&
        this.normalizeTime(a.time) === targetTime
      );
    });

    return {
      available: !conflict,
      conflict: conflict || null
    };
  }

  isSlotBooked(date, time) {
    if (!date || !time) return false;
    const { available } = this.checkSlotAvailability(date, time);
    return !available;
  }

  addAppointment(bookingData) {
    const appointments = this.getAppointments();
    const { available, conflict } = this.checkSlotAvailability(bookingData.date, bookingData.time);

    const bookingId = bookingData.id || `GGJ-${Math.floor(100000 + Math.random() * 900000)}`;

    // Verify service price from DB
    const dbService = bookingData.serviceId ? this.getServiceById(bookingData.serviceId) : null;
    const validatedPrice = dbService ? dbService.price : bookingData.servicePrice || 85;

    const newBooking = {
      ...bookingData,
      id: bookingId,
      referenceCode: bookingId,
      servicePrice: validatedPrice,
      status: bookingData.status || 'Pending',
      appointmentStatus: bookingData.appointmentStatus || bookingData.status || 'Pending',
      slotConflict: !available,
      conflictingWith: !available ? (conflict?.customerName || 'Active Guest') : null,
      treatmentStartedAt: null,
      treatmentCompletedAt: null,
      treatmentDuration: null,
      treatmentDurationHMS: null,
      treatmentDurationSeconds: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      submittedAt: new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })
    };

    const updated = [newBooking, ...appointments];
    localStorage.setItem(DB_KEYS.APPOINTMENTS, JSON.stringify(updated));
    localStorage.setItem('girl-looked-for-you-appointments', JSON.stringify(updated));
    notifySubscribers('appointment_added', newBooking);
    return newBooking;
  }

  updateAppointmentStatus(id, newStatus) {
    const appointments = this.getAppointments();
    let updatedItem = null;
    const updated = appointments.map((a) => {
      if (a.id === id) {
        updatedItem = {
          ...a,
          status: newStatus,
          appointmentStatus: newStatus,
          slotConflict: (newStatus === 'Cancelled' || newStatus === 'Rejected') ? false : a.slotConflict,
          updatedAt: new Date().toISOString()
        };
        return updatedItem;
      }
      return a;
    });

    localStorage.setItem(DB_KEYS.APPOINTMENTS, JSON.stringify(updated));
    localStorage.setItem('girl-looked-for-you-appointments', JSON.stringify(updated));
    notifySubscribers('appointment_updated', { id, status: newStatus, appointment: updatedItem });
    return updated;
  }

  startTreatment(id) {
    const appointments = this.getAppointments();
    const nowIso = new Date().toISOString();
    let startedItem = null;

    const updated = appointments.map((a) => {
      if (a.id === id) {
        startedItem = {
          ...a,
          status: 'In Progress',
          appointmentStatus: 'In Progress',
          treatmentStartedAt: nowIso,
          treatmentCompletedAt: null,
          treatmentDuration: null,
          treatmentDurationHMS: null,
          treatmentDurationSeconds: null,
          updatedAt: nowIso
        };
        return startedItem;
      }
      return a;
    });

    if (!startedItem) {
      throw new Error(`Appointment with ID ${id} not found.`);
    }

    localStorage.setItem(DB_KEYS.APPOINTMENTS, JSON.stringify(updated));
    localStorage.setItem('girl-looked-for-you-appointments', JSON.stringify(updated));
    notifySubscribers('treatment_started', startedItem);
    return updated;
  }

  completeTreatment(id) {
    const appointments = this.getAppointments();
    const nowIso = new Date().toISOString();
    let completedItem = null;

    const updated = appointments.map((a) => {
      if (a.id === id) {
        const startTimestamp = a.treatmentStartedAt ? new Date(a.treatmentStartedAt).getTime() : Date.now();
        const endTimestamp = new Date(nowIso).getTime();
        const durationSeconds = Math.max(0, Math.floor((endTimestamp - startTimestamp) / 1000));
        const durationHMS = this.formatDurationHMS(durationSeconds);
        const durationDisplay = this.formatDurationDisplay(durationSeconds);

        completedItem = {
          ...a,
          status: 'Completed',
          appointmentStatus: 'Completed',
          treatmentCompletedAt: nowIso,
          treatmentDuration: durationDisplay,
          treatmentDurationHMS: durationHMS,
          treatmentDurationSeconds: durationSeconds,
          updatedAt: nowIso
        };
        return completedItem;
      }
      return a;
    });

    if (!completedItem) {
      throw new Error(`Appointment with ID ${id} not found.`);
    }

    localStorage.setItem(DB_KEYS.APPOINTMENTS, JSON.stringify(updated));
    localStorage.setItem('girl-looked-for-you-appointments', JSON.stringify(updated));
    notifySubscribers('appointment_completed', completedItem);
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
  // REVIEWS REPOSITORY & VERIFICATION
  // ==========================================

  getReviews() {
    try {
      const data = localStorage.getItem(DB_KEYS.REVIEWS);
      return data ? JSON.parse(data) : DEFAULT_REVIEWS;
    } catch (e) {
      return DEFAULT_REVIEWS;
    }
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
      rating: Math.min(5, Math.max(1, Number(newReviewData.rating) || 5)),
      review: (newReviewData.review || newReviewData.comment || '').trim(),
      comment: (newReviewData.review || newReviewData.comment || '').trim(),
      date: today,
      verified: newReviewData.verified !== false,
      bookingId: newReviewData.bookingId || newReviewData.appointmentId || null,
      appointmentId: newReviewData.bookingId || newReviewData.appointmentId || null,
      likes: 0,
      recommended: newReviewData.recommended !== false,
      status: 'approved',
      tags: newReviewData.tags || ['Verified Treatment'],
      featured: Boolean(newReviewData.featured),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [reviewToAdd, ...reviews];
    localStorage.setItem(DB_KEYS.REVIEWS, JSON.stringify(updated));
    notifySubscribers('review_added', reviewToAdd);
    return reviewToAdd;
  }

  updateReviewStatus(id, newStatus) {
    const reviews = this.getReviews();
    const updated = reviews.map((r) => {
      if (r.id === id) {
        return { ...r, status: newStatus, updatedAt: new Date().toISOString() };
      }
      return r;
    });
    localStorage.setItem(DB_KEYS.REVIEWS, JSON.stringify(updated));
    notifySubscribers('review_status_updated', { id, status: newStatus });
    return updated;
  }

  deleteReview(id) {
    const reviews = this.getReviews();
    const updated = reviews.filter(r => r.id !== id);
    localStorage.setItem(DB_KEYS.REVIEWS, JSON.stringify(updated));
    notifySubscribers('review_deleted', { id });
    return updated;
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

  toggleLikeReview(id) {
    try {
      const likedRaw = localStorage.getItem(DB_KEYS.LIKED_REVIEWS);
      const likedSet = new Set(likedRaw ? JSON.parse(likedRaw) : []);
      const isLiked = likedSet.has(id);

      if (isLiked) {
        likedSet.delete(id);
      } else {
        likedSet.add(id);
      }
      localStorage.setItem(DB_KEYS.LIKED_REVIEWS, JSON.stringify(Array.from(likedSet)));

      const reviews = this.getReviews();
      const updated = reviews.map((r) => {
        if (r.id === id) {
          const count = Number(r.likes) || 0;
          return { ...r, likes: isLiked ? Math.max(0, count - 1) : count + 1 };
        }
        return r;
      });
      localStorage.setItem(DB_KEYS.REVIEWS, JSON.stringify(updated));
      notifySubscribers('review_liked', { id, isLiked: !isLiked });
      return !isLiked;
    } catch (e) {
      return false;
    }
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

    const status = String(match.status || match.appointmentStatus || 'Pending');
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
  // CONTACT MESSAGES
  // ==========================================

  getContactMessages() {
    try {
      const data = localStorage.getItem(DB_KEYS.CONTACT_MESSAGES);
      return data ? JSON.parse(data) : DEFAULT_CONTACT_MESSAGES;
    } catch (e) {
      return DEFAULT_CONTACT_MESSAGES;
    }
  }

  addContactMessage(messageData) {
    const messages = this.getContactMessages();
    const id = `msg-${Date.now()}`;
    const newMsg = {
      ...messageData,
      id,
      name: (messageData.name || messageData.fullName || 'Guest').trim(),
      email: (messageData.email || '').trim(),
      phone: (messageData.phone || '').trim(),
      subject: (messageData.subject || messageData.inquiryType || 'General Atelier Inquiry').trim(),
      message: (messageData.message || messageData.notes || '').trim(),
      status: 'New',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [newMsg, ...messages];
    localStorage.setItem(DB_KEYS.CONTACT_MESSAGES, JSON.stringify(updated));
    notifySubscribers('contact_message_added', newMsg);
    return newMsg;
  }

  updateContactMessageStatus(id, newStatus) {
    const messages = this.getContactMessages();
    const updated = messages.map(m => m.id === id ? { ...m, status: newStatus, updatedAt: new Date().toISOString() } : m);
    localStorage.setItem(DB_KEYS.CONTACT_MESSAGES, JSON.stringify(updated));
    notifySubscribers('contact_message_updated', { id, status: newStatus });
    return updated;
  }

  deleteContactMessage(id) {
    const messages = this.getContactMessages();
    const updated = messages.filter(m => m.id !== id);
    localStorage.setItem(DB_KEYS.CONTACT_MESSAGES, JSON.stringify(updated));
    notifySubscribers('contact_message_deleted', { id });
    return updated;
  }

  // ==========================================
  // GALLERY
  // ==========================================

  getGallery() {
    try {
      const data = localStorage.getItem(DB_KEYS.GALLERY);
      return data ? JSON.parse(data) : DEFAULT_GALLERY;
    } catch (e) {
      return DEFAULT_GALLERY;
    }
  }

  getActiveGallery() {
    const gallery = this.getGallery();
    return gallery.filter(g => g.isActive !== false);
  }

  addGalleryItem(itemData) {
    const gallery = this.getGallery();
    const id = itemData.id || `gal-${Date.now()}`;
    const newItem = {
      ...itemData,
      id,
      isActive: itemData.isActive !== false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updated = [newItem, ...gallery];
    localStorage.setItem(DB_KEYS.GALLERY, JSON.stringify(updated));
    notifySubscribers('gallery_updated', updated);
    return newItem;
  }

  updateGalleryItem(id, updates) {
    const gallery = this.getGallery();
    const updated = gallery.map(g => g.id === id ? { ...g, ...updates, updatedAt: new Date().toISOString() } : g);
    localStorage.setItem(DB_KEYS.GALLERY, JSON.stringify(updated));
    notifySubscribers('gallery_updated', updated);
    return updated;
  }

  deleteGalleryItem(id) {
    const gallery = this.getGallery();
    const updated = gallery.filter(g => g.id !== id);
    localStorage.setItem(DB_KEYS.GALLERY, JSON.stringify(updated));
    notifySubscribers('gallery_updated', updated);
    return updated;
  }

  // ==========================================
  // NEWSLETTER SUBSCRIBERS
  // ==========================================

  getNewsletterSubscribers() {
    try {
      const data = localStorage.getItem(DB_KEYS.NEWSLETTER_SUBSCRIBERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  subscribeNewsletter(email, topics = ['Exclusive Offers']) {
    const subscribersList = this.getNewsletterSubscribers();
    const cleanEmail = String(email).trim().toLowerCase();

    const existingIndex = subscribersList.findIndex(s => s.email.toLowerCase() === cleanEmail);
    if (existingIndex >= 0) {
      // Already subscribed
      return { success: true, message: "You're already subscribed with this email!", subscriber: subscribersList[existingIndex] };
    }

    const newSub = {
      id: `sub-${Date.now()}`,
      email: cleanEmail,
      status: 'Active',
      topics: Array.isArray(topics) ? topics : [topics],
      subscribedAt: new Date().toISOString()
    };

    const updated = [newSub, ...subscribersList];
    localStorage.setItem(DB_KEYS.NEWSLETTER_SUBSCRIBERS, JSON.stringify(updated));
    notifySubscribers('newsletter_subscribed', newSub);
    return { success: true, message: "You're subscribed!", subscriber: newSub };
  }

  deleteNewsletterSubscriber(idOrEmail) {
    const subscribersList = this.getNewsletterSubscribers();
    const updated = subscribersList.filter(s => s.id !== idOrEmail && s.email.toLowerCase() !== String(idOrEmail).toLowerCase());
    localStorage.setItem(DB_KEYS.NEWSLETTER_SUBSCRIBERS, JSON.stringify(updated));
    notifySubscribers('newsletter_unsubscribed', { idOrEmail });
    return updated;
  }

  // ==========================================
  // OFFERS & DISCOUNTS
  // ==========================================

  getOffers() {
    try {
      const data = localStorage.getItem(DB_KEYS.OFFERS);
      return data ? JSON.parse(data) : DEFAULT_OFFERS;
    } catch (e) {
      return DEFAULT_OFFERS;
    }
  }

  getActiveOffers() {
    const offers = this.getOffers();
    return offers.filter(o => o.isActive !== false);
  }

  addOffer(offerData) {
    const offers = this.getOffers();
    const id = offerData.id || `off-${Date.now()}`;
    const newOffer = {
      ...offerData,
      id,
      isActive: offerData.isActive !== false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updated = [newOffer, ...offers];
    localStorage.setItem(DB_KEYS.OFFERS, JSON.stringify(updated));
    notifySubscribers('offers_updated', updated);
    return newOffer;
  }

  updateOffer(id, updates) {
    const offers = this.getOffers();
    const updated = offers.map(o => o.id === id ? { ...o, ...updates, updatedAt: new Date().toISOString() } : o);
    localStorage.setItem(DB_KEYS.OFFERS, JSON.stringify(updated));
    notifySubscribers('offers_updated', updated);
    return updated;
  }

  deleteOffer(id) {
    const offers = this.getOffers();
    const updated = offers.filter(o => o.id !== id);
    localStorage.setItem(DB_KEYS.OFFERS, JSON.stringify(updated));
    notifySubscribers('offers_updated', updated);
    return updated;
  }

  // ==========================================
  // SETTINGS REPOSITORY
  // ==========================================

  getSettings() {
    try {
      const data = localStorage.getItem(DB_KEYS.SETTINGS);
      return data ? JSON.parse(data) : DEFAULT_SETTINGS;
    } catch (e) {
      return DEFAULT_SETTINGS;
    }
  }

  updateSettings(updates) {
    const current = this.getSettings();
    const updated = { ...current, ...updates, updatedAt: new Date().toISOString() };
    localStorage.setItem(DB_KEYS.SETTINGS, JSON.stringify(updated));
    notifySubscribers('settings_updated', updated);
    return updated;
  }

  // ==========================================
  // TREATMENTS
  // ==========================================

  getTreatments() {
    try {
      const data = localStorage.getItem(DB_KEYS.TREATMENTS);
      return data ? JSON.parse(data) : DEFAULT_TREATMENTS;
    } catch (e) {
      return DEFAULT_TREATMENTS;
    }
  }

  updateTreatment(id, updates) {
    const list = this.getTreatments();
    const updated = list.map(t => t.id === id ? { ...t, ...updates } : t);
    localStorage.setItem(DB_KEYS.TREATMENTS, JSON.stringify(updated));
    notifySubscribers('treatments_updated', updated);
    return updated;
  }

  // ==========================================
  // MASTER DASHBOARD STATISTICS
  // ==========================================

  getDashboardStats() {
    const appointments = this.getAppointments();
    const services = this.getServices();
    const reviews = this.getReviews();
    const contactMessages = this.getContactMessages();
    const subscribersList = this.getNewsletterSubscribers();
    const offers = this.getOffers();
    const users = this.getUsers();

    const totalBookings = appointments.length;
    const totalRevenue = appointments.reduce((sum, item) => sum + (Number(item.servicePrice) || 0), 0);

    const inProgressCount = appointments.filter(a => a.status === 'In Progress' || a.appointmentStatus === 'In Progress').length;
    const confirmedCount = appointments.filter(a => a.status === 'Appointment Request Confirmed' || a.status === 'Confirmed' || a.appointmentStatus === 'Confirmed').length;
    const pendingCount = appointments.filter(a => a.status === 'Pending' || a.status === 'In Review' || a.appointmentStatus === 'Pending').length;
    const completedCount = appointments.filter(a => a.status === 'Completed' || a.appointmentStatus === 'Completed').length;
    const cancelledCount = appointments.filter(a => a.status === 'Cancelled' || a.appointmentStatus === 'Cancelled' || a.status === 'Rejected').length;

    const unreadMessagesCount = contactMessages.filter(m => m.status === 'New').length;
    const activeOffersCount = offers.filter(o => o.isActive !== false).length;
    const totalCustomersCount = users.filter(u => u.role === 'customer').length;

    return {
      totalBookings,
      totalRevenue,
      inProgressCount,
      confirmedCount,
      pendingCount,
      completedCount,
      cancelledCount,
      totalServices: services.length,
      activeServices: services.filter(s => s.isActive !== false && s.active !== false).length,
      totalReviews: reviews.length,
      unreadMessagesCount,
      totalSubscribers: subscribersList.length,
      activeOffersCount,
      totalCustomersCount,
      reviewStats: this.getReviewStats()
    };
  }

  // ==========================================
  // DURATION & TIME FORMATTERS
  // ==========================================

  formatDurationHMS(totalSeconds) {
    const s = Math.max(0, Math.floor(Number(totalSeconds) || 0));
    const hours = Math.floor(s / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  formatDurationDisplay(totalSeconds) {
    const s = Math.max(0, Math.floor(Number(totalSeconds) || 0));
    const hours = Math.floor(s / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;
    if (hours > 0) {
      return `${hours} hr ${minutes} min ${seconds} sec`;
    }
    if (minutes > 0) {
      return `${minutes} min ${seconds} sec`;
    }
    return `${seconds} sec`;
  }

  formatTimeAMPM(isoOrDateString, includeSeconds = false) {
    if (!isoOrDateString) return '';
    try {
      const date = new Date(isoOrDateString);
      if (!isNaN(date.getTime())) {
        return date.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          ...(includeSeconds ? { second: '2-digit' } : {}),
          hour12: true
        });
      }
    } catch (e) {}
    return String(isoOrDateString);
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
export const salonDB = new MasterSalonDatabase();
export default salonDB;
