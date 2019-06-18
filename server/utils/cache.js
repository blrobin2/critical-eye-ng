const getCached = (cache, key, fn, ttl = 5) =>
  new Promise((resolve, reject) => {
    cache.get(key, (err, result) => {
      if (err) { return reject(err); }
      if (result) {return resolve(result); }

      fn((err, val) => {
        if (err) { return reject(err); }
        cache.set(key, val, { ttl });
        resolve(val);
      });
    });
  });

const clearCache = (cache, key) =>
  new Promise((resolve, reject) => {
    cache.del(key, (err, done) => {
      if (err) { return reject(err); }
      resolve(done);
    });
  });

module.exports = {
  getCached,
  clearCache
};
