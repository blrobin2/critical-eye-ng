require('dotenv').config();
const express = require('express');
const { json, urlencoded } = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const { connect } = require('./utils/db');
const reviewModel = require('./resources/review/review.model');
const { getReviewRouter } = require('./resources/review/review.router');

const PORT = process.env.PORT || 8080;
const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

const setUpSchemas = db => {
  reviewModel(db);
}

const setUpRoutes = db => {
  app.use('/api/review', getReviewRouter(db));
}

const start = async () => {
  try {
    const client = await connect(
      process.env.MONGO_ADMIN, process.env.MONGO_PASSWORD
    );
    const db = client.db(process.env.MONGO_DB);
    setUpSchemas(db);
    setUpRoutes(db);

    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  } catch (e) {
    console.error(e);
    client.close();
  }
};

module.exports = {
  app,
  start
};