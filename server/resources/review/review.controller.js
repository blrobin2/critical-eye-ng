const { ObjectID } = require('../../utils/db');
const { getCached, clearCache } = require('../../utils/cache');

const getMany = (db, cache) => async (req, res) => {
  try {
    const data = await getCachedMany(db, cache, req.user._id);
    res.status(200).json({ data });
  } catch (e) {
    console.error(e)
    res.status(500).end();
  }
};

const getManyCacheKey = userId => `${userId}-reviews`;

const getCachedMany = (db, cache, userId) =>
  getCached(
    cache,
    getManyCacheKey(userId),
    cb => db.collection('reviews').find({
        createdBy: new ObjectID(userId)
      }).toArray(cb),
    6000);

const getOne = (db, cache) => async (req, res) => {
    try {
      const data = await getCachedOne(db, cache, req.params.id, req.user._id);
      if (! data) {
        return res.status(404).end();
      }

      res.status(200).json({ data });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
};

const getCachedOne = (db, cache, id, userId) =>
  getCached(
    cache,
    id,
    cb => db.collection('reviews').aggregate(
      {
        $match: {
          _id: new ObjectID(id),
          createdBy: new ObjectID(userId)
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'createdByUser'
        }
      }, {
        $unwind: '$createdByUser'
      }, {
        $group: {
          createdByUser: null
        }
      }
    ).toArray((err, [review]) => cb(err, review)),
    10
  );

const createOne = (db, cache) => async (req, res) => {
  try {
    const doc = {
      ...req.body,
      createdBy: new ObjectID(req.user._id)
    };
    const cleaned = cleanRequestData(doc);
    const data = await db.collection('reviews').insertOne(cleaned);
    await clearManyCache(cache, req.user._id);
    res.status(201).json({ data: data.ops[0] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const updateOne = (db, cache) => async (req, res) => {
  try {
    const doc = {
      ...req.body,
      createdBy: new ObjectID(req.user._id)
    };

    const cleaned = cleanRequestData(doc);

    const { value: data } = await db.collection('reviews').findOneAndUpdate({
      _id: new ObjectID(req.params.id),
      createdBy: cleaned.createdBy
    }, {
        $set: cleaned
    }, {
      returnOriginal: false
    });

    if (!data) {
      return res.status(404).end();
    }

    await clearManyCache(cache, req.user._id);

    res.status(200).json({ data: data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const cleanRequestData = (doc) => {
  // We don't want to overwrite the existing _id
  delete doc._id;
  for (let key in doc) {
    if (key === 'dateListened') {
      doc.dateListened = new Date(doc.dateListened);
    }
    // Remove empty values so it doesn't freak out Mongo's validation
    if (!doc[key]) {
      delete doc[key];
    }
  }

  return doc;
}

const removeOne = (db, cache) => async (req, res) => {
  try {
    const { value: data } = await db.collection('reviews').findOneAndDelete({
      _id: new ObjectID(req.params.id),
      createdBy: new ObjectID(req.user._id)
    });

    if (! data) {
      return res.status(404).end();
    }

    // Clear cache so that getAll doesn't return deleted review
    await clearManyCache(cache, req.user._id);

    res.status(200).json({ data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const clearManyCache = (cache, userId) =>
  clearCache(cache, getManyCacheKey(userId));

module.exports = (db, cache) => ({
  getMany: getMany(db, cache),
  getOne: getOne(db, cache),
  createOne: createOne(db, cache),
  updateOne: updateOne(db, cache),
  removeOne: removeOne(db, cache)
});