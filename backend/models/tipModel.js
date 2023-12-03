import mongoose from 'mongoose';

const tipSchema = new mongoose.Schema(
  {
    user_id: { type: String },
    business_id: { type: String, unique: true, rquired: true },
    text: { type: String, default: '', required: true },
    date: { type: Date },
    compliment_count: { type: Number, default: 0, required: true },
  },
  {
    timestamps: true,
  }
);

const Tip = mongoose.model('tip', tipSchema);
export default Tip;
