module.exports = db => {
  db.createCollection('users', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['spotifyId', 'name'],
        properties: {
          spotifyId: {
            bsonType: 'string',
            description: 'must be a string and is required'
          },
          name: {
            bsonType: 'string',
            description: 'the user name'
          },
          accessToken: {
            bsonType: 'string',
            description: 'the Spotify access token'
          },
          refreshToken: {
            bsonType: 'string',
            description: 'the Spotify refresh token'
          },
          expiresIn: {
            bsonType: 'string',
            description: 'when the current token expires'
          }
        }
      }
    }
  });
}