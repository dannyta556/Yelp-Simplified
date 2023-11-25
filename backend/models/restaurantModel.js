import mongoose from 'mongoose';
import slugify from 'slugify';

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'restaurant', required: true },
    slug: { type: String, required: true, unique: true },
    rating: { type: Number, default: 0, required: true },
    numReviews: { type: Number, default: 0, required: true },
    website: { type: String, default: 'none', required: true },
    phone: { type: String, default: 'none', required: true },
    address: { type: String, default: 'none', required: true },
    hours: { type: Array, default: [], required: true },
    pros: { type: Array, default: [], required: true },
    cons: { type: Array, default: [], required: true },
  },
  {
    timestamps: true,
  }
);

restaurantSchema.pre('validate', function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;
