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
  SETTINGS: 'glfy_db_settings'
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

// Initial Seed for Appointments if empty
const DEFAULT_APPOINTMENTS = [
  {
    id: 'GLFY-842910',
    customerName: 'Sarah Tremblay',
    phone: '6135550199',
    email: 'sarah.tremblay@example.ca',
    service: 'Hair Spa',
    serviceId: 'hair-spa',
    servicePrice: 85,
    serviceDuration: '60 mins',
    date: new Date().toISOString().split('T')[0],
    time: '11:00 AM',
    notes: 'Requested organic botanical oils',
    status: 'Confirmed',
    isAutoAccepted: true,
    slotConflict: false,
    submittedAt: new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })
  },
  {
    id: 'GLFY-719302',
    customerName: 'Elena Rostova',
    phone: '6135550144',
    email: 'elena.r@example.com',
    service: 'Balayage & Hair Colour',
    serviceId: 'hair-colour-balayage',
    servicePrice: 120,
    serviceDuration: '120 mins',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '02:00 PM',
    notes: 'Caramel blonde balayage touch-up',
    status: 'Confirmed',
    isAutoAccepted: true,
    slotConflict: false,
    submittedAt: new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })
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

    // 1. Seed Services if missing
    if (!localStorage.getItem(DB_KEYS.SERVICES)) {
      localStorage.setItem(DB_KEYS.SERVICES, JSON.stringify(ALL_SERVICES.map(s => ({ ...s, active: true }))));
    }

    // 2. Seed Categories if missing
    if (!localStorage.getItem(DB_KEYS.CATEGORIES)) {
      localStorage.setItem(DB_KEYS.CATEGORIES, JSON.stringify(CATEGORIES));
    }

    // 3. Seed Appointments if missing
    if (!localStorage.getItem(DB_KEYS.APPOINTMENTS)) {
      // Check legacy key first
      const legacy = localStorage.getItem('girl-looked-for-you-appointments');
      if (legacy) {
        localStorage.setItem(DB_KEYS.APPOINTMENTS, legacy);
      } else {
        localStorage.setItem(DB_KEYS.APPOINTMENTS, JSON.stringify(DEFAULT_APPOINTMENTS));
      }
    }

    // 4. Seed Settings if missing
    if (!localStorage.getItem(DB_KEYS.SETTINGS)) {
      localStorage.setItem(DB_KEYS.SETTINGS, JSON.stringify({
        salonName: import.meta.env.VITE_SALON_NAME || 'GIRL LOOKED FOR YOU',
        whatsappPhone: import.meta.env.VITE_WHATSAPP_PHONE_NUMBER || '+918320708028',
        phone: SALON_INFO.phone,
        email: SALON_INFO.email,
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
      const data = localStorage.getItem(DB_KEYS.APPOINTMENTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Error reading appointments:', e);
      return [];
    }
  }

  /**
   * Check if a specific Date and Time slot is currently free or occupied by another active service
   * Returns { available: boolean, conflict: object | null }
   */
  checkSlotAvailability(date, time) {
    const appointments = this.getAppointments();
    
    // Find active appointments on the same date & time (excluding cancelled ones)
    const conflict = appointments.find(
      (a) =>
        a.date === date &&
        a.time === time &&
        a.status !== 'Cancelled'
    );

    return {
      available: !conflict,
      conflict: conflict || null
    };
  }

  /**
   * Add a new appointment with smart Auto-Accept logic
   */
  addAppointment(bookingData) {
    const appointments = this.getAppointments();
    const { available, conflict } = this.checkSlotAvailability(bookingData.date, bookingData.time);

    let status = 'Confirmed';
    let isAutoAccepted = true;
    let slotConflict = false;

    if (!available) {
      // Another client service is currently in working progress for this slot
      status = 'Pending';
      isAutoAccepted = false;
      slotConflict = true;
    }

    const bookingId = bookingData.id || `GLFY-${Math.floor(100000 + Math.random() * 900000)}`;

    const newBooking = {
      ...bookingData,
      id: bookingId,
      status,
      isAutoAccepted,
      slotConflict,
      conflictingWith: slotConflict ? (conflict?.customerName || 'Active Guest') : null,
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
    if (categoryId === 'all') return services;
    return services.filter((s) => s.category === categoryId && s.active !== false);
  }

  getServiceById(id) {
    const services = this.getServices();
    return services.find((s) => s.id === id || s.name.toLowerCase() === String(id).toLowerCase()) || null;
  }

  updateService(id, updates) {
    const services = this.getServices();
    const updated = services.map((s) => {
      if (s.id === id) {
        return { ...s, ...updates };
      }
      return s;
    });

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
      salonName: 'GIRL LOOKED FOR YOU',
      whatsappPhone: '+918320708028',
      phone: SALON_INFO.phone,
      email: SALON_INFO.email
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
