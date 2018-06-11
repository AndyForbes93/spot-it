const router = require("express").Router();
const API = require("./API");
const reviewController = require("../controllers/reviewControllers");

router.route("/")
  .get(reviewController.findAll)
  .post(reviewController.create);




  router.use("/api" , API);

module.exports = router;
