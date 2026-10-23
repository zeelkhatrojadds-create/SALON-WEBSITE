import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Question is required'],
      trim: true
    },
    answer: {
      type: String,
      required: [true, 'Answer is required'],
      trim: true
    },
    category: {
      type: String,
      default: 'booking',
      trim: true
    },
    categoryLabel: {
      type: String,
      default: 'General'
    },
    isPublished: {
      type: Boolean,
      default: true
    },
    serviceId: {
      type: String,
      default: ''
    },
    serviceLink: {
      type: String,
      default: ''
    },
    displayOrder: {
      type: Number,
      default: 1
    }
  },
  {
    timestamps: true
  }
);

const Faq = mongoose.models.Faq || mongoose.model('Faq', faqSchema);

export default Faq;
