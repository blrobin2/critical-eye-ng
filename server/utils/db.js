const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const getUri = (admin, password) => `mongodb+srv://${admin}:${password}@cluster0-mv18n.mongodb.net/test?retryWrites=true&w=majority`;


const connect = async (admin, password) => {
  const uri = getUri(admin, password);
  return new MongoClient(uri, { useNewUrlParser: true }).connect();
};

module.exports = {
  connect,
  ObjectID: require('mongodb').ObjectID
};

