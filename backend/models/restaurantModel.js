import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'restaurant', required: true },
    business_id: { type: String, required: true, unique: true },
    stars: { type: Number, default: 0, required: true },
    review_count: { type: Number, default: 0, required: true },
    address: { type: String, default: 'none', required: true },
    city: { type: String, default: 'None' },
    state: { type: String, default: 'None' },
    categories: { type: Array, default: [], required: true },
    'postal code': { type: String, default: 'none', required: true },
    hours: { type: Object, default: {}, required: true },
    pros: { type: Array, default: [], required: true },
    cons: { type: Array, default: [], required: true },
    attributes: { type: Object, default: {}, required: true },
    is_open: { type: Number, default: 0, required: true },
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;
