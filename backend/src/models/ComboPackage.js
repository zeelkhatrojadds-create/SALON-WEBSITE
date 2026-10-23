import mongoose from 'mongoose';

const comboPackageSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Combo package name is required'], trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true },
    tagline: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '/facial-atelier-clean.webp' },
    categoryTag: { type: String, default: 'BEAUTY COMBO' },
    serviceIds: [{ type: String, required: true }],
    serviceNames: [{ type: String }],
    comboPrice: { type: Number, required: [true, 'Combo price is required'], min: 0 },
    active: { type: Boolean, default: true },
    isPublished: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 1 },
    benefits: [{ type: String }]
  },
  { timestamps: true }
);

const ComboPackage = mongoose.model('ComboPackage', comboPackageSchema);
export default ComboPackage;
