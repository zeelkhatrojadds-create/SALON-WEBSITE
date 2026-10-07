import express from 'express';
import {
  getSlotAvailability,
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  approveAppointment,
  rejectAppointment,
  cancelAppointment,
  completeAppointment
} from '../controllers/appointmentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/availability', getSlotAvailability);

router.route('/')
  .get(protect, admin, getAppointments)
  .post(createAppointment);

router.route('/:id')
  .get(getAppointmentById)
  .put(protect, admin, updateAppointment)
  .delete(protect, admin, deleteAppointment);

router.patch('/:id/approve', protect, admin, approveAppointment);
router.patch('/:id/reject', protect, admin, rejectAppointment);
router.patch('/:id/cancel', cancelAppointment);
router.patch('/:id/complete', protect, admin, completeAppointment);

export default router;
