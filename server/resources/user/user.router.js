const { Router } = require('express');
const jwt = require('jsonwebtoken');

const { ObjectID } = require('../../utils/db');

const newToken = (user, expiration) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: expiration
  });
};

const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

const router = (db, spotifyApi) => {
  const router = Router();

  router.get('/spotify/callback/', async (req, res) => {
    try {
      const data = req.query;
      spotifyApi.setAccessToken(data.access_token);
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

      const token = newToken(user, data.expires_in * 1000);
      return res.status(201).send({ token });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  });

  return router;
};

const authenticate = db => async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [, token] = authorization.split('Bearer ');

    const user = await verifyToken(token);
    if (!user) throw new Error();

    const data = await db.collection('users').findOne({
      _id: new ObjectID(user.id)
    });
    if (! data) throw new Error();

    req.user = data;
    next();
  } catch (e) {
    res.status(401).end();
  }
}

module.exports = {
  getAuthRouter: router,
  authenticate
};