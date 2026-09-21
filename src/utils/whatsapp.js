/**
 * WhatsApp Integration Utility for GIRL LOOKED FOR YOU Salon (Ottawa, Canada)
 * Dynamically configured from environment variables (.env)
 */

export const getWhatsAppConfig = () => {
  const envPhone = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER || '16135550182';
  // Clean phone number: keep only digits (e.g. +918320708028 -> 918320708028, +16135550182 -> 16135550182)
  const cleanPhone = String(envPhone).replace(/\D/g, '');

  const salonName = import.meta.env.VITE_SALON_NAME || 'GIRL LOOKED FOR YOU';
  const salonLocation = import.meta.env.VITE_SALON_LOCATION || '450 Bank Street, Ottawa, ON, Canada';

  return {
    phoneNumber: cleanPhone || '16135550182',
    rawPhone: envPhone,
    salonName,
    salonLocation
  };
};

/**
 * Format phone number nicely for human display
 */
export const formatDisplayPhone = (phoneStr) => {
  const digits = String(phoneStr).replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length === 12) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  if (digits.startsWith('1') && digits.length === 11) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return `+${digits}`;
};

/**
 * Generate a formatted WhatsApp appointment booking message
 * Matches: Customer Name, Mobile Number, Selected Service, Preferred Date, Preferred Time, Additional message/details
 */
export const generateWhatsAppBookingMessage = (booking) => {
  const { salonName, salonLocation } = getWhatsAppConfig();

  const customerName = booking.customerName || 'Valued Guest';
  const mobileNumber = booking.phone || 'N/A';
  const selectedService = booking.service || 'Salon Treatment';
  const servicePrice = booking.servicePrice ? ` ($${booking.servicePrice} CAD)` : '';
  const preferredDate = booking.date || 'N/A';
  const preferredTime = booking.time || 'N/A';
  const additionalNotes = booking.notes && booking.notes.trim() ? booking.notes.trim() : 'None';
  const bookingId = booking.id || `GLFY-${Math.floor(100000 + Math.random() * 900000)}`;

  const message = 
`🌸 *NEW APPOINTMENT BOOKING* 🌸
*${salonName.toUpperCase()} — Ottawa*

👤 *Customer Name:* ${customerName}
📱 *Mobile Number:* ${mobileNumber}
✨ *Selected Service:* ${selectedService}${servicePrice}
📅 *Preferred Date:* ${preferredDate}
⏰ *Preferred Time:* ${preferredTime}
📝 *Any Additional Message / Details:* ${additionalNotes}

📋 *Booking ID:* ${bookingId}
📍 *Salon Location:* ${salonLocation}

Please confirm my appointment slot. Thank you! ✨`;

  return message;
};

/**
 * Generate the standard WhatsApp redirect URL (Universal wa.me format for Mobile & Web)
 */
export const getWhatsAppBookingUrl = (booking) => {
  const { phoneNumber } = getWhatsAppConfig();
  const message = generateWhatsAppBookingMessage(booking);
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};

/**
 * Direct function to open WhatsApp automatically with pre-filled appointment details
 * Opens immediately during user click event stack to bypass browser popup blockers
 */
export const sendWhatsAppBookingDirect = (booking) => {
  const url = getWhatsAppBookingUrl(booking);
  if (typeof window !== 'undefined') {
    try {
      const newTab = window.open(url, '_blank', 'noopener,noreferrer');
      if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
        // Fallback if popup blocker intercepted
        window.location.href = url;
      }
    } catch (e) {
      console.warn('Direct WhatsApp opening fallback:', e);
      window.location.href = url;
    }
  }
  return url;
};

/**
 * Generate a general inquiry WhatsApp URL
 */
export const getWhatsAppInquiryUrl = (inquiry = {}) => {
  const { phoneNumber, salonName } = getWhatsAppConfig();
  const name = inquiry.name ? inquiry.name : 'Guest';
  const topic = inquiry.serviceInterest || 'General Inquiry';
  const userMessage = inquiry.message ? inquiry.message : 'I would like to inquire about your salon rituals.';

  const text = `🌸 *INQUIRY — ${salonName.toUpperCase()} (Ottawa)* 🌸\n\n` +
    `Hello ${salonName}! My name is ${name}.\n` +
    `📌 *Topic:* ${topic}\n` +
    `💬 *Message:* ${userMessage}\n\n` +
    `Please get back to me when available. Thank you!`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
};
