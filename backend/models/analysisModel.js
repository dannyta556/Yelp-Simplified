import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema(
  {
    business_id: { type: String, unique: true, rquired: true },
    pos: { type: Array, default: [], required: true },
    neg: { type: Array, default: [], required: true },
  },
  {
    timestamps: true,
  }
);

const Analysis = mongoose.model('analysis', analysisSchema);
export default Analysis;
