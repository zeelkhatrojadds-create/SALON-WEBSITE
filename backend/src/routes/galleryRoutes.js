import express from 'express';
import {
  getGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} from '../controllers/galleryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getGallery)
  .post(protect, admin, createGalleryItem);

router.route('/:id')
  .put(protect, admin, updateGalleryItem)
  .delete(protect, admin, deleteGalleryItem);

export default router;
