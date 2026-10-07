import Appointment from '../models/Appointment.js';
import Service from '../models/Service.js';
import Offer from '../models/Offer.js';
import Review from '../models/Review.js';

export const getAdminDashboardStats = async (req, res) => {
  try {
    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({
      status: { $in: ['pending', 'Pending'] }
    });
    const confirmedAppointments = await Appointment.countDocuments({
      status: { $in: ['confirmed', 'Confirmed'] }
    });
    const rejectedAppointments = await Appointment.countDocuments({
      status: { $in: ['rejected', 'Rejected'] }
    });
    const completedAppointments = await Appointment.countDocuments({
      status: { $in: ['completed', 'Completed'] }
    });
    const cancelledAppointments = await Appointment.countDocuments({
      status: { $in: ['cancelled', 'Cancelled'] }
    });

    const totalServices = await Service.countDocuments();
    const activeOffers = await Offer.countDocuments({ active: true });
    const totalReviews = await Review.countDocuments();

    return res.status(200).json({
      success: true,
      message: 'Admin dashboard statistics fetched successfully.',
      data: {
        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
        rejectedAppointments,
        completedAppointments,
        cancelledAppointments,
        totalServices,
        activeOffers,
        totalReviews
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error fetching admin dashboard metrics',
      error: error.message
    });
  }
};
