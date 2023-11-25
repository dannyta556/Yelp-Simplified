import express from 'express';
import Restaurant from '../models/restaurantModel.js';
import data from '../sample.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Restaurant.deleteMany({});

  const createdRestaurants = await Restaurant.insertMany(data.restaurants);
  res.send({ createdRestaurants });
});

export default seedRouter;
