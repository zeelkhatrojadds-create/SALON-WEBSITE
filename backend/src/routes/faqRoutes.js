import express from 'express';
import {
  getFaqs,
  getFaqById,
  createFaq,
  updateFaq,
  deleteFaq
} from '../controllers/faqController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getFaqs)
  .post(protect, admin, createFaq);

router.route('/:id')
  .get(getFaqById)
  .put(protect, admin, updateFaq)
  .delete(protect, admin, deleteFaq);

export default router;
