const db = require("../models");


// Defining methods for the reviewController
module.exports = {
    findAll: function(req, res) {
      db.Rating
        .find(req.query)
        .sort({ date: -1 })
        .then(dbRating => res.json(dbRating))
        .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        const rating = {
          userName: req.body.userName,
          userImage: req.body.userImageURL,
          ratedItem: req.body.ratedItem,
          review: req.body.review,
          rating: req.body.rating
        };
        db.Rating
          .create(rating)
          .then(dbRating => res.json(dbRating))
          .catch(err => res.status(422).json(err));
      }
}