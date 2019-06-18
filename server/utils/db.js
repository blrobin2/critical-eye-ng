const { MongoClient, ObjectID } = require('mongodb');

const getUri = (admin, password, server) =>
  `mongodb+srv://${admin}:${password}@${server}`;

const connect = async (admin, password, server) => {
  const uri = getUri(admin, password, server);
  return new MongoClient(uri, { useNewUrlParser: true }).connect();
};

module.exports = {
  connect,
  ObjectID
};
