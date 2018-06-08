var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var ratingSchema = new Schema({
    //TODO: current_user.id in state
    userName : {
        type: String,
        required: true,
        unique: { index: {unique: true}}
    },
    //TODO: current_user.images[0] in state
    userImage: {
        type: String,
    },
    //TODO: this is a review of an album push name of artists and then album then album url
    ratedItem: [String],
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});

var Rating = mongoose.model("Rating" , ratingSchema);

Rating.create({
    userName:  "TEst",
    userImage: "Test",
    ratedItem:["Irepress" , "Sol Eye Sea I" , "IRL"],
    review: "Brebby Gud",
    rating: 10
});

module.exports = Rating;