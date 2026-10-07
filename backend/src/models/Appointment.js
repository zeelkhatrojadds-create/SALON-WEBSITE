import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: ''
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: false
    },
    service: {
      type: String,
      default: 'Salon Treatment',
      trim: true
    },
    date: {
      type: String,
      required: [true, 'Date is required (YYYY-MM-DD)'],
      trim: true
    },
    time: {
      type: String,
      required: [true, 'Time is required (e.g., 10:00 AM)'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Price is required']
    },
    status: {
      type: String,
      enum: ['pending', 'Pending', 'confirmed', 'Confirmed', 'rejected', 'Rejected', 'completed', 'Completed', 'cancelled', 'Cancelled'],
      default: 'pending'
    },
    paymentMethod: {
      type: String,
      enum: ['COD', 'card', 'online'],
      default: 'COD'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    },
    specialRequest: {
      type: String,
      default: ''
    },
    rejectionReason: {
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

appointmentSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

appointmentSchema.index(
  { date: 1, time: 1 },
  {
    unique: true,
    partialFilterExpression: { status: { $in: ['pending', 'Pending', 'confirmed', 'Confirmed'] } }
  }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
