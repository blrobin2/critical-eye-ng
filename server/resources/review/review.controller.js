const { ObjectID } = require('../../utils/db');

const getMany = (db, cache) => async (req, res) => {
  try {
    const data = await getCachedMany(db, req.user._id, cache);
    res.status(200).json({ data });
  } catch (e) {
    console.error(e)
    res.status(500).end();
  }
};

const getCachedMany = (db, userId, cache) => {
  const key = `${userId}-reviews`;
  return new Promise((resolve, reject) => {
    cache.get(key, (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result) {
        return resolve(result);
      }

      db.collection('reviews').find({
        createdBy: new ObjectID(userId)
      }).toArray((err, reviews) => {
        if (err) {
          return reject(err);
        }
        // Just big enough for searching and filtering
        // so we don't hammer the mongoDB server
        cache.set(key, reviews, { ttl: 5 });
        resolve(reviews);
      });
    });
  });
}

const getOne = (db, cache) => async (req, res) => {
    try {
      const data = await getCachedOne(db, req.params.id, req.user._id, cache);
      if (! data) {
        return res.status(404).end();
      }

      res.status(200).json({ data });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
};

const getCachedOne = (db, id, userId, cache) => {
  return new Promise((resolve, reject) => {
    cache.get(id, (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result) {
        return resolve(result);
      }

      db.collection('reviews').aggregate(
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
      ).toArray((err, [review]) => {
        if (err) {
          return reject(err);
        }
        cache.set(id, review, { ttl: 10 });
        resolve(review);
      });
    });
  });
}

const createOne = db => async (req, res) => {
  try {
    const doc = {
      ...req.body,
      createdBy: new ObjectID(req.user._id)
    };
    const cleaned = cleanRequestData(doc);
    const data = await db.collection('reviews').insertOne(cleaned);
    res.status(201).json({ data: data.ops[0] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const updateOne = db => async (req, res) => {
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

const removeOne = db => async (req, res) => {
  try {
    const { value: data } = await db.collection('reviews').findOneAndDelete({
      _id: new ObjectID(req.params.id),
      createdBy: new ObjectID(req.user._id)
    });

    if (! data) {
      return res.status(404).end();
    }

    res.status(200).json({ data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = (db, cache) => ({
  getMany: getMany(db, cache),
  getOne: getOne(db, cache),
  createOne: createOne(db),
  updateOne: updateOne(db),
  removeOne: removeOne(db)
});