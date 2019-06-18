require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const { json, urlencoded } = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const cacheManager = require('cache-manager');
const SpotifyWebApi = require("spotify-web-api-node");

const { connect } = require('./utils/db');

const userModel = require('./resources/user/user.model');
const { getAuthRouter, authenticate } = require('./resources/user/user.router');
const reviewModel = require('./resources/review/review.model');
const { getReviewRouter } = require('./resources/review/review.router');
const { getSearchRouter } = require('./resources/search/search.router');
const { getRecommendedRouter } = require('./resources/recommended/recommended.router');

const PORT = process.env.PORT || 8080;
const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}));
app.use(compression());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

const setUpSchemas = db => {
  userModel(db);
  reviewModel(db);
};

const setUpRoutes = (db, spotifyApi, cache) => {
  app.use('/auth', getAuthRouter(db, spotifyApi));

  app.use(authenticate(db, cache));

  app.use('/api/review', getReviewRouter(db, cache));
  app.use('/api/search', getSearchRouter(spotifyApi));
  app.use('/api/recommended', getRecommendedRouter(db, cache));
};

const start = async () => {
  try {
    const cache = cacheManager.caching({
      store: 'memory',
      max: 100,
      ttl: 10
    });
    const client = await connect(
      process.env.MONGO_ADMIN,
      process.env.MONGO_PASSWORD,
      process.env.MONGO_SERVER
    );
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.CLIENT_URL,
    });
    const db = client.db(process.env.MONGO_DB);
    setUpSchemas(db);
    setUpRoutes(db, spotifyApi, cache);

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