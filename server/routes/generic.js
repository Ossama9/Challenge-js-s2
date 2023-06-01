const { Router } = require("express");

module.exports = function (Controller, options = {}) {
  const router = new Router();

  router.get("/", Controller.getAll);
  router.post("/", Controller.create);



  return router;
};
