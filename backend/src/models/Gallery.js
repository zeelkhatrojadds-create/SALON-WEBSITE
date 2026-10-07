import mongoose from 'mongoose';

export const GALLERY_CATEGORIES = [
  'Hair',
  'Facial',
  'Makeup',
  'Henna',
  'Nails',
  'Salon Interior'
];

const gallerySchema = new mongoose.Schema(
  {
    image: { type: String, required: [true, 'Image URL is required'] },
    title: { type: String, required: [true, 'Title is required'], trim: true },
    category: { type: String, required: [true, 'Category is required'], enum: GALLERY_CATEGORIES }
  },
  { timestamps: true }
);

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
