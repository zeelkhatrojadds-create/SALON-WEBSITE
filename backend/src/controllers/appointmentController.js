import Appointment from '../models/Appointment.js';
import Service from '../models/Service.js';
import TimeSlot from '../models/TimeSlot.js';
import { DEFAULT_SALON_TIME_SLOTS } from '../utils/timeSlots.js';

export const getSlotAvailability = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a date query parameter (YYYY-MM-DD)'
      });
    }

    const targetDate = date.trim();

    let dbSlots = await TimeSlot.find({ active: true }).sort({ order: 1 });
    let slotStrings = dbSlots.map((s) => s.time);

    if (slotStrings.length === 0) {
      slotStrings = DEFAULT_SALON_TIME_SLOTS;
    }

    const activeAppointments = await Appointment.find({
      date: targetDate,
      status: { $in: ['pending', 'Pending', 'confirmed', 'Confirmed'] }
    });

    const bookedTimeSet = new Set(activeAppointments.map((a) => a.time.trim()));

    const slots = slotStrings.map((slotTime) => ({
      time: slotTime,
      available: !bookedTimeSet.has(slotTime.trim())
    }));

    return res.status(200).json({
      success: true,
      date: targetDate,
      slots,
      data: slots
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error checking availability',
      error: error.message
    });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const {
      customerId,
      customerName,
      phone,
      email,
      serviceId,
      service: inputService,
      date,
      time,
      price,
      paymentMethod,
      specialRequest
    } = req.body;

    if (!customerName || !phone || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Please provide customerName, phone, date, and time'
      });
    }

    const cleanDate = date.trim();
    const cleanTime = time.trim();

    const existingConflict = await Appointment.findOne({
      date: cleanDate,
      time: cleanTime,
      status: { $in: ['pending', 'Pending', 'confirmed', 'Confirmed'] }
    });

    if (existingConflict) {
      return res.status(409).json({
        success: false,
        message: 'This time slot is no longer available.'
      });
    }

    let finalServiceName = inputService || 'Salon Treatment';
    let finalPrice = price;

    if (serviceId) {
      const serviceObj = await Service.findById(serviceId);
      if (serviceObj) {
        finalServiceName = serviceObj.name;
        if (!finalPrice) finalPrice = serviceObj.price;
      }
    }

    if (!finalPrice) finalPrice = 85;

    const appointment = await Appointment.create({
      customerId: customerId || (req.user ? req.user._id : undefined),
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      serviceId: serviceId || undefined,
      service: finalServiceName,
      date: cleanDate,
      time: cleanTime,
      price: Number(finalPrice),
      status: 'pending',
      paymentMethod: paymentMethod || 'COD',
      paymentStatus: 'pending',
      specialRequest: specialRequest || ''
    });

    return res.status(201).json({
      success: true,
      message: 'Appointment submitted successfully.',
      appointment: {
        _id: appointment._id,
        status: 'pending',
        date: appointment.date,
        time: appointment.time,
        service: appointment.service,
        price: appointment.price
      },
      data: appointment
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'This time slot is no longer available.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Server Error creating appointment',
      error: error.message
    });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const { status, date } = req.query;
    const filter = {};

    if (status) {
      if (status.toLowerCase() === 'pending') {
        filter.status = { $in: ['pending', 'Pending'] };
      } else if (status.toLowerCase() === 'confirmed') {
        filter.status = { $in: ['confirmed', 'Confirmed'] };
      } else if (status.toLowerCase() === 'rejected') {
        filter.status = { $in: ['rejected', 'Rejected'] };
      } else if (status.toLowerCase() === 'cancelled') {
        filter.status = { $in: ['cancelled', 'Cancelled'] };
      } else if (status.toLowerCase() === 'completed') {
        filter.status = { $in: ['completed', 'Completed'] };
      } else {
        filter.status = status;
      }
    }

    if (date) filter.date = date.trim();

    const appointments = await Appointment.find(filter)
      .populate('customerId', 'name email phone')
      .populate('serviceId', 'name price duration category image')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error fetching appointments',
      error: error.message
    });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('customerId', 'name email phone')
      .populate('serviceId', 'name price duration category image');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error fetching appointment',
      error: error.message
    });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    return res.status(200).json({
      success: true,
      message: 'Appointment updated successfully',
      data: appointment
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error updating appointment',
      error: error.message
    });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    await appointment.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error deleting appointment',
      error: error.message
    });
  }
};

export const approveAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    if (appointment.status.toLowerCase() !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'This appointment has already been processed.'
      });
    }

    const slotConflict = await Appointment.findOne({
      _id: { $ne: appointment._id },
      date: appointment.date,
      time: appointment.time,
      status: { $in: ['confirmed', 'Confirmed'] }
    });

    if (slotConflict) {
      return res.status(409).json({
        success: false,
        message: 'This time slot is no longer available.'
      });
    }

    appointment.status = 'confirmed';
    await appointment.save();

    return res.status(200).json({
      success: true,
      message: 'Appointment confirmed.',
      appointment: {
        _id: appointment._id,
        status: 'confirmed'
      },
      data: appointment
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to update appointment. Please try again.',
      error: error.message
    });
  }
};

export const rejectAppointment = async (req, res) => {
  try {
    const { rejectionReason } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    if (appointment.status.toLowerCase() !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'This appointment has already been processed.'
      });
    }

    appointment.status = 'rejected';
    appointment.rejectionReason = rejectionReason || 'Requested time is unavailable.';
    await appointment.save();

    return res.status(200).json({
      success: true,
      message: 'Appointment rejected. Slot is now available.',
      appointment: {
        _id: appointment._id,
        status: 'rejected',
        rejectionReason: appointment.rejectionReason
      },
      data: appointment
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to update appointment. Please try again.',
      error: error.message
    });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    return res.status(200).json({
      success: true,
      message: 'Appointment cancelled. Slot is now available.',
      appointment: {
        _id: appointment._id,
        status: appointment.status
      },
      data: appointment
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to update appointment. Please try again.',
      error: error.message
    });
  }
};

export const completeAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    appointment.status = 'completed';
    await appointment.save();

    return res.status(200).json({
      success: true,
      message: 'Appointment marked as completed.',
      appointment: {
        _id: appointment._id,
        status: appointment.status
      },
      data: appointment
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to update appointment. Please try again.',
      error: error.message
    });
  }
};
