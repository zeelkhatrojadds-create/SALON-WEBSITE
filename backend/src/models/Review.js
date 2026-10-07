import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: [true, 'Customer name is required'], trim: true },
    rating: { type: Number, required: [true, 'Rating is required'], min: 1, max: 5 },
    review: { type: String, required: [true, 'Review is required'], trim: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;
