const { Router } = require('express');

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

function getCachedRecommendations(db, cache) {
  return new Promise((resolve, reject) => {
    cache.get('recommended', (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result) {
        return resolve(result);
      }

      db.collection('recommended').find({}).toArray((err, rec) => {
        if (err) {
          return reject(err);
        }
        cache.set('recommended', rec, { ttl: 43200 });
        resolve(rec);
      });
    });
  });
}

module.exports = {
  getRecommendedRouter: router
};