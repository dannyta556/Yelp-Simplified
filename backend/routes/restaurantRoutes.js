import express from 'express';
import Restaurant from '../models/restaurantModel.js';
import expressAsyncHandler from 'express-async-handler';

const restaurantRouter = express.Router();

// default page size
const PAGE_SIZE = 10;

// The search route takes an input of a query and page number
// Mongoose searches based on the two parameters
// RETURNS
// restaurant info
// number of results
// current page
// number of pages
restaurantRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};

    const restaurants = await Restaurant.find({
      ...queryFilter,
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countRestaurants = await Restaurant.countDocuments({
      ...queryFilter,
    });
    let returnpages = 0;

    if (Math.ceil(countRestaurants / pageSize) > 20) {
      returnpages = 20;
    } else {
      returnpages = Math.ceil(countRestaurants / pageSize);
    }
    res.send({
      restaurants,
      countRestaurants,
      page,
      pages: returnpages,
    });
  })
);

// Input: restaurant slug
// Output: restaurant info
// Returns an error if slug isn't found
restaurantRouter.get('/slug/:slug', async (req, res) => {
  console.log(req.params.slug);
  const restaurant = await Restaurant.findOne({ slug: req.params.slug });
  if (restaurant) {
    res.send(restaurant);
  } else {
    res.status(404).send({ message: 'Restaurant not found' });
  }
});

export default restaurantRouter;
