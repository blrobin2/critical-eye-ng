const { Router } = require('express');

const router = spotifyApi => {
  const router = Router();

  router.get('/', async (req, res) => {
    try {
      const q = req.query.q;
      const data = await spotifyApi.refreshAccessToken();
      spotifyApi.setAccessToken(data.body.access_token);
      const { body: { albums } } = await spotifyApi.searchAlbums(q);
      res.status(200).json({ data: albums });
    } catch (e) {
      res.sendStatus(500, e.message);
    }
  });

  return router;
};

module.exports  = {
  getSearchRouter: router
};