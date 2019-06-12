module.exports = db => {
  db.createCollection('recommended', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['artist', 'album', 'date'],
        properties: {
          artist: {
            bsonType: 'string',
            description: 'the artist for the album'
          },
          album: {
            bsonType: 'string',
            description: 'the name of the album'
          },
          date: {
            bsonType: 'string',
            description: 'the release date of the album'
          },
          link: {
            bsonType: 'string',
            description: 'where to hear the album'
          },
          artwork: {
            basonType: 'string',
            description: 'the location of the album cover image'
          }
        }
      }
    }
  });

  await db.collection('recommended').createIndex({
    album: 1,
    artist: 1
  }, {
    unique: true
  });
}

