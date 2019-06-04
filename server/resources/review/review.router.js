const { Router } = require('express');

const ctrls = require('./review.controller');

const router = controllers => {
  const router = Router();

  router
    .route('/')
    .get(controllers.getMany)
    .post(controllers.createOne);

  router
    .route('/:id')
    .get(controllers.getOne)
    //.put(controllers.updateeOne)
    //.delete(controllers.removeOne)

  return router;
};

module.exports = {
  getReviewRouter: db => router(ctrls(db))
}