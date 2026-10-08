/**
 * GLAM GIRL BY JANKI — Unified API Client Service
 * Connects frontend components to the Master Database Engine.
 */

import salonDB from '../db/salonDatabase';

export const api = {
  // 1. Auth & Users
  login: async (email, password) => salonDB.authenticateUser(email, password),
  signup: async (userData) => salonDB.registerUser(userData),
  getCurrentUser: () => salonDB.getCurrentUser(),
  logout: () => salonDB.logoutUser(),
  getUsers: async () => salonDB.getUsers(),

  // 2. Services (72 Master Services)
  getServices: async () => salonDB.getServices(),
  getServiceById: async (id) => salonDB.getServiceById(id),
  createService: async (data) => salonDB.addService(data),
  updateService: async (id, data) => salonDB.updateService(id, data),
  deleteService: async (id) => salonDB.deleteService(id),

  // 3. Appointments & Availability
  getAppointments: async () => salonDB.getAppointments(),
  getAppointmentById: async (id) => salonDB.getAppointmentById(id),
  checkAvailability: async (date, time) => salonDB.checkSlotAvailability(date, time),
  createAppointment: async (data) => salonDB.addAppointment(data),
  updateAppointmentStatus: async (id, status) => salonDB.updateAppointmentStatus(id, status),
  startTreatment: async (id) => salonDB.startTreatment(id),
  completeTreatment: async (id) => salonDB.completeTreatment(id),
  deleteAppointment: async (id) => salonDB.deleteAppointment(id),

  // 4. Reviews
  getReviews: async () => salonDB.getReviews(),
  getApprovedReviews: async () => salonDB.getApprovedReviews(),
  getReviewStats: () => salonDB.getReviewStats(),
  createReview: async (data) => salonDB.addReview(data),
  updateReviewStatus: async (id, status) => salonDB.updateReviewStatus(id, status),
  deleteReview: async (id) => salonDB.deleteReview(id),
  likeReview: async (id) => salonDB.toggleLikeReview(id),
  verifyAppointmentForReview: (query) => salonDB.verifyAppointmentForReview(query),

  // 5. Gallery
  getGallery: async () => salonDB.getGallery(),
  getActiveGallery: async () => salonDB.getActiveGallery(),
  createGalleryItem: async (data) => salonDB.addGalleryItem(data),
  updateGalleryItem: async (id, data) => salonDB.updateGalleryItem(id, data),
  deleteGalleryItem: async (id) => salonDB.deleteGalleryItem(id),

  // 6. Contact Messages
  getContactMessages: async () => salonDB.getContactMessages(),
  submitContactMessage: async (data) => salonDB.addContactMessage(data),
  updateContactMessageStatus: async (id, status) => salonDB.updateContactMessageStatus(id, status),
  deleteContactMessage: async (id) => salonDB.deleteContactMessage(id),

  // 7. Newsletter
  getNewsletterSubscribers: async () => salonDB.getNewsletterSubscribers(),
  subscribeNewsletter: async (email, topics) => salonDB.subscribeNewsletter(email, topics),
  unsubscribeNewsletter: async (idOrEmail) => salonDB.deleteNewsletterSubscriber(idOrEmail),

  // 8. Offers
  getOffers: async () => salonDB.getOffers(),
  getActiveOffers: async () => salonDB.getActiveOffers(),
  createOffer: async (data) => salonDB.addOffer(data),
  updateOffer: async (id, data) => salonDB.updateOffer(id, data),
  deleteOffer: async (id) => salonDB.deleteOffer(id),

  // 9. Settings
  getSettings: async () => salonDB.getSettings(),
  updateSettings: async (data) => salonDB.updateSettings(data),

  // 10. Treatments (Informational)
  getTreatments: async () => salonDB.getTreatments(),
  updateTreatment: async (id, data) => salonDB.updateTreatment(id, data),

  // 11. Dashboard Analytics
  getDashboardStats: () => salonDB.getDashboardStats(),

  // Live Subscription
  subscribe: (callback) => salonDB.subscribe(callback)
};

export default api;
