export const sendWhatsAppConfirmation = (appointment) => {
  const cleanPhone = appointment.phone.replace(/[^0-9]/g, '');
  const message = `Hello ${appointment.customerName}! Your appointment for ${appointment.service} on ${appointment.date} at ${appointment.time} with Glam Girl By Janki has been recorded. Status: ${appointment.status}.`;
  const encodedMessage = encodeURIComponent(message);
  
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

  return {
    success: true,
    channel: 'WhatsApp',
    provider: 'click-to-chat',
    recipientPhone: appointment.phone,
    actionUrl: whatsappUrl,
    message: 'WhatsApp confirmation link generated.'
  };
};

export const sendEmailConfirmation = (appointment) => {
  const recipientEmail = appointment.email || 'customer@example.com';
  const subject = encodeURIComponent(`Glam Girl By Janki - Appointment Status (${appointment.status.toUpperCase()})`);
  const body = encodeURIComponent(
    `Dear ${appointment.customerName},\n\n` +
    `Thank you for booking with Glam Girl By Janki!\n\n` +
    `Service: ${appointment.service}\n` +
    `Date: ${appointment.date}\n` +
    `Time: ${appointment.time}\n` +
    `Price: $${appointment.price}\n` +
    `Status: ${appointment.status}\n\n` +
    `Location: Ottawa, Canada\n` +
    `We look forward to serving you!`
  );

  const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

  return {
    success: true,
    channel: 'Email',
    provider: 'mailto-fallback',
    recipientEmail: recipientEmail,
    actionUrl: mailtoUrl,
    message: 'Email confirmation link generated.'
  };
};

export default {
  sendWhatsAppConfirmation,
  sendEmailConfirmation
};
