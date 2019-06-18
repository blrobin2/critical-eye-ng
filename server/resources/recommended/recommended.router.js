const { Router } = require('express');
const { getCached } = require('../../utils/cache');

const router = (db, cache) => {
  const router = Router();

  router.get('/', async (_, res) => {
    try {
      const data = await getCachedRecommendations(db, cache);
      res.status(200).json({ data });
    } catch (e) {
      res.sendStatus(500, e.message);
    }
  });

  return router;
};

const getCachedRecommendations = (db, cache) =>
  getCached(
    cache,
    'recommended',
    cb => db.collection('recommended').find({}).toArray(cb),
    43200);

module.exports = {
  getRecommendedRouter: router
};