const { Router } = require('express');
const jwt = require('jsonwebtoken');

const { ObjectID } = require('../../utils/db');
const { getCached } = require('../../utils/cache');

const newToken = (user, expiration) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: expiration
  });

const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) { return reject(err); }
      resolve(payload);
    });
  });

const router = (db, spotifyApi) => {
  const router = Router();

  router.get('/spotify/callback/', async (req, res) => {
    try {
      const data = req.query;
      const tokens = await spotifyApi.authorizationCodeGrant(data.code);
      spotifyApi.setAccessToken(tokens.body.access_token);
      spotifyApi.setRefreshToken(tokens.body.refresh_token);
      const expiresInMilliseconds = tokens.body.expires_in * 1000;

      const profile = await spotifyApi.getMe();
      const { value: user } = await db.collection('users').findOneAndUpdate({
          spotifyId: profile.body.id
        },
        {
          $set: {
            name: profile.body.display_name
          }
        }, {
          upsert: true,
          returnOriginal: false
        });

      const token = newToken(user, expiresInMilliseconds);
      return res.status(201).send({ token });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  });

  return router;
};

const authenticate = (db, cache) => async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [, token] = authorization.split('Bearer ');

    const user = await verifyToken(token);
    if (!user) throw new Error();

    const data = await getCachedUser(db, cache, user.id);
    if (! data) throw new Error();

    req.user = data;
    next();
  } catch (e) {
    res.status(401).end();
  }
}

const getCachedUser = (db, cache, id) =>
  getCached(cache,
    id,
    cb => db.collection('users').findOne({
        _id: new ObjectID(id)
      }, cb),
    6000);

module.exports = {
  getAuthRouter: router,
  authenticate
};