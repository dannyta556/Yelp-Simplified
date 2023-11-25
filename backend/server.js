import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import restaurantRouter from './routes/restaurantRoutes.js';

dotenv.config();

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

// form data in the post request will be converted to json object in req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import data from sample database
app.use('/api/seed', seedRouter);

app.use('/api/restaurants', restaurantRouter);

// error handler for express
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
