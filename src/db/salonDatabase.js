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

// Initial Seed for Appointments (empty for clean fresh availability state)
const DEFAULT_APPOINTMENTS = [];

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
        salonName: import.meta.env.VITE_SALON_NAME || 'GLAM GIRL BY JANKI',
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
      // Check primary key first, fallback to legacy key
      const data = localStorage.getItem(DB_KEYS.APPOINTMENTS) || localStorage.getItem('girl-looked-for-you-appointments');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Error reading appointments:', e);
      return [];
    }
  }

  /**
   * Check if a specific Date and Time slot is currently free or occupied
   * Returns { available: boolean, conflict: object | null }
   */
  checkSlotAvailability(date, time) {
    const appointments = this.getAppointments();
    
    // Match exact Date + Time (excluding cancelled bookings)
    const conflict = appointments.find(
      (a) =>
        String(a.date).trim() === String(date).trim() &&
        String(a.time).trim() === String(time).trim() &&
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
