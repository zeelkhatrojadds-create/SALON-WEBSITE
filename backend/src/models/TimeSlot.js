import mongoose from 'mongoose';

const timeSlotSchema = new mongoose.Schema(
  {
    time: { type: String, required: true, unique: true, trim: true },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);
export default TimeSlot;
