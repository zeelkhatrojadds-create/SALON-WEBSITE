/**
 * GLAM GIRL BY JANKI — Unified API Client Service
 * Connects frontend components to the Master Database Engine.
 */

import salonDB from '../db/salonDatabase';

export const api = {
  // 1. Auth & Users
  login: async (email, password) => salonDB.authenticateUser(email, password),
  signup: async (userData) => salonDB.registerCustomer(userData),
  registerCustomer: async (userData) => salonDB.registerCustomer(userData),
  getCurrentUser: () => salonDB.getCurrentUser(),
  logout: () => salonDB.logoutUser(),
  getUsers: async () => salonDB.getUsers(),
  requestPasswordReset: async (email) => salonDB.requestPasswordReset(email),
  resetPasswordWithToken: async (email, token, newPassword) => salonDB.resetPasswordWithToken(email, token, newPassword),
  changePassword: async (userId, currentPass, newPass) => salonDB.changeCustomerPassword(userId, currentPass, newPass),
  updateCustomerProfile: async (userId, updates) => salonDB.updateCustomerProfile(userId, updates),
  requestDataExport: async (userId) => salonDB.requestCustomerDataExport(userId),
  requestAccountDeletion: async (userId, reason) => salonDB.requestCustomerAccountDeletion(userId, reason),

  // Customer Appointments & Booking Actions
  getCustomerAppointments: async (idOrEmail) => salonDB.getCustomerAppointments(idOrEmail),
  rescheduleAppointment: async (id, newDate, newTime, custId) => salonDB.rescheduleAppointment(id, newDate, newTime, custId),
  cancelAppointmentByCustomer: async (id, custId, reason) => salonDB.cancelAppointmentByCustomer(id, custId, reason),

  // Customer Reviews
  getCustomerReviews: async (idOrEmail) => salonDB.getCustomerReviews(idOrEmail),
  canReviewAppointment: (custId, apptId) => salonDB.canReviewAppointment(custId, apptId),
  addCustomerReview: async (data) => salonDB.addCustomerReview(data),
  updateCustomerReview: async (revId, custId, data) => salonDB.updateCustomerReview(revId, custId, data),
  deleteCustomerReview: async (revId, custId) => salonDB.deleteCustomerReview(revId, custId),

  // Notifications
  getNotifications: async () => salonDB.getNotifications(),
  getCustomerNotifications: async (idOrEmail) => salonDB.getCustomerNotifications(idOrEmail),
  markNotificationRead: async (id) => salonDB.markNotificationRead(id),
  markAllNotificationsRead: async (idOrEmail) => salonDB.markAllNotificationsRead(idOrEmail),

  // Admin Customer Management
  getCustomers: async () => salonDB.getCustomers(),
  adminAddCustomerNote: async (userId, noteText, author) => salonDB.adminAddCustomerNote(userId, noteText, author),
  adminUpdateCustomerStatus: async (userId, status) => salonDB.adminUpdateCustomerStatus(userId, status),
  adminProcessDataRequest: async (userId, reqId, status, notes) => salonDB.adminProcessDataRequest(userId, reqId, status, notes),
  adminUpdateCustomerProfile: async (userId, data) => salonDB.adminUpdateCustomerProfile(userId, data),

  // 2. Services (72 Master Services)
  getServices: async () => salonDB.getServices(),
  getServiceById: async (id) => salonDB.getServiceById(id),
  createService: async (data) => salonDB.addService(data),
  updateService: async (id, data) => salonDB.updateService(id, data),
  deleteService: async (id) => salonDB.deleteService(id),

  // 3. Appointments & Availability
  getAppointments: async () => salonDB.getAppointments(),
  checkAvailability: async (date, time, duration, stylistId) => salonDB.checkSlotAvailability(date, time, duration, stylistId),
  isSlotBooked: async (date, time, duration, stylistId) => salonDB.isSlotBooked(date, time, duration, stylistId),
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
  // 8.5. Combo Packages (Curated Service Combinations)
  getComboPackages: async () => salonDB.getComboPackages(),
  getActiveComboPackages: async () => salonDB.getActiveComboPackages(),
  getComboPackageById: async (id) => salonDB.getComboPackageById(id),
  createComboPackage: async (data) => salonDB.addComboPackage(data),
  updateComboPackage: async (id, data) => salonDB.updateComboPackage(id, data),
  deleteComboPackage: async (id) => salonDB.deleteComboPackage(id),

  // 9. Settings
  getSettings: async () => salonDB.getSettings(),
  updateSettings: async (data) => salonDB.updateSettings(data),

  // 10. Treatments (Informational)
  getTreatments: async () => salonDB.getTreatments(),
  updateTreatment: async (id, data) => salonDB.updateTreatment(id, data),

  // 11. FAQ Master Management
  getFaqs: async (includeUnpublished = false) => salonDB.getFaqs(includeUnpublished),
  getFaqById: async (id) => salonDB.getFaqById(id),
  createFaq: async (data) => salonDB.addFaq(data),
  updateFaq: async (id, data) => salonDB.updateFaq(id, data),
  toggleFaqPublish: async (id) => salonDB.toggleFaqPublish(id),
  deleteFaq: async (id) => salonDB.deleteFaq(id),
  resetFaqs: async () => salonDB.resetFaqsToDefault(),

  // 12. Dashboard Analytics
  getDashboardStats: () => salonDB.getDashboardStats(),

  // 13. Aftercare & Product Recommendations
  getAftercareSettings: async () => salonDB.getAftercareSettings(),
  getAftercareForService: (name, cat, slug) => salonDB.getAftercareForService(name, cat, slug),
  updateAftercareCategory: async (id, data) => salonDB.updateAftercareCategory(id, data),
  updateAftercareInstruction: async (catId, instId, data) => salonDB.updateAftercareInstruction(catId, instId, data),
  addAftercareInstruction: async (catId, data) => salonDB.addAftercareInstruction(catId, data),
  deleteAftercareInstruction: async (catId, instId) => salonDB.deleteAftercareInstruction(catId, instId),
  resetAftercareCategory: async (catId) => salonDB.resetAftercareCategoryToDefault(catId),
  saveCustomerAftercareRecommendation: async (userId, payload) => salonDB.saveCustomerAftercareRecommendation(userId, payload),
  getCustomerSavedRecommendations: async (userId) => salonDB.getCustomerSavedRecommendations(userId),
  removeCustomerSavedRecommendation: async (userId, savedId) => salonDB.removeCustomerSavedRecommendation(userId, savedId),

  // Live Subscription
  subscribe: (callback) => salonDB.subscribe(callback)
};

export default api;
