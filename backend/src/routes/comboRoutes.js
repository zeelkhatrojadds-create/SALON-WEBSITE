import express from 'express';
import {
  getComboPackages,
  getComboPackageById,
  createComboPackage,
  updateComboPackage,
  deleteComboPackage
} from '../controllers/comboController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getComboPackages)
  .post(protect, admin, createComboPackage);

router.route('/:id')
  .get(getComboPackageById)
  .put(protect, admin, updateComboPackage)
  .delete(protect, admin, deleteComboPackage);

export default router;
