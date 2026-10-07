import mongoose from 'mongoose';

export const SERVICE_CATEGORIES = [
  'threading',
  'waxing',
  'facial',
  'massage',
  'henna',
  'makeup',
  'hairstyling',
  'haircut',
  'haircolor',
  'hairtreatments',
  'other',
  'Threading',
  'Waxing',
  'Facial',
  'Massage',
  'Henna',
  'Makeup',
  'Hairstyling',
  'Hair Cut',
  'Hair Color',
  'Hair treatments',
  'Other Services'
];

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    categoryName: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be positive']
    },
    duration: {
      type: String,
      required: [true, 'Duration is required']
    },
    description: {
      type: String,
      default: ''
    },
    features: {
      type: [String],
      default: []
    },
    image: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: true
    },
    popular: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

serviceSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

const Service = mongoose.model('Service', serviceSchema);
export default Service;
