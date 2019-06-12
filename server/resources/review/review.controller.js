const { ObjectID } = require('../../utils/db');

const getMany = (db) => async (req, res) => {
  try {
    const reviews = db.collection('reviews');
    const data = await reviews.find({
      createdBy: new ObjectID(req.user._id)
    }).toArray();

    res.status(200).json({ data });
  } catch (e) {
    console.error(e)
    res.status(500).end();
  }
};

const getOne = (db) => async (req, res) => {
    try {
      const reviews = db.collection('reviews');
      const [data] = await reviews.aggregate(
        {
          $match: {
            _id: new ObjectID(req.params.id),
            createdBy: new ObjectID(req.user._id)
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
      ).toArray();

      if (! data) {
        return res.status(404).end();
      }

      res.status(200).json({ data });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
};

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

module.exports = db => ({
  getMany: getMany(db),
  getOne: getOne(db),
  createOne: createOne(db),
  updateOne: updateOne(db),
  removeOne: removeOne(db)
});