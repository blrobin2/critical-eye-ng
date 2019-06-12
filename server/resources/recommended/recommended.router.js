const { Router } = require('express');

const router = (db) => {
  const router = Router();

  router.get('/', async (req, res) => {
    try {
      const recommended = db.collection('recommended');
      const data = await recommended.find({}).toArray();

      res.status(200).json({ data });
    } catch (e) {
      res.sendStatus(500, e.message);
    }
  });

  return router;
};

module.exports = {
  getRecommendedRouter: router
};