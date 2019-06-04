module.exports = async db => {
  await db.createCollection('reviews', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['artist', 'album', 'spotifyId', 'dateListened', 'rating', 'createdBy'],
        properties: {
          artist: {
            bsonType: 'string',
            description: 'must be a string and is required'
          },
          album: {
            bsonType: 'string',
            description: 'must be a string and is required'
          },
          spotifyId: {
            bsonType: 'string',
            description: 'must be a string and is required'
          },
          artwork: {
            bsonType: 'string',
            description: 'must be a string and is not required'
          },
          dateListened: {
            bsonType: 'date',
            description: 'must be a date and is required'
          },
          description: {
            bsonType: 'string',
            description: 'must be a string and is not required'
          },
          href: {
            bsonType: 'string',
            description: 'must be a string and is not required'
          },
          rating: {
            bsonType: 'int',
            minimum: 0,
            maximum: 10,
            description: 'must be an integer between 0 and 10 and is required'
          },
          yearReleased: {
            bsonType: 'int',
            minimum: 1900,
            description: 'must be an integer of at least 1900 and is required'
          },
          createdBy: {
            bsonType: 'ObjectID',
            description: 'the ID of the person who wrote the review'
          }
        }
      }
    }
  });

  await db.collection('reviews').createIndex({
    createdBy: 1,
    spotifyId: 1
  }, {
    unique: true
  });
};