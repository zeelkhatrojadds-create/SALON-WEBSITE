import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    icon: { type: String, default: 'Sparkles' },
    count: { type: Number, default: 0 },
    description: { type: String, default: '' }
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);
export default Category;
