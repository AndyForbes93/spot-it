const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Rating = require("./models");

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get("/", function(req, res) {
	res.json({ message: "API Initialized!"});
   });

app.use("/api", router);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/spot-it";

mongoose.connect(MONGODB_URI);

//TODO: SET UP API TO POST RATINGS ENTERED TO MONGO THEN REDIRECT BACK TO DAHSBOARD
//ON THE ABLUM COMPONENT THAT DISPLAYS THE SONGS SHOW ALL REVIEWS FOR THE ALBUM

router.get("/rating" , function(req, res){
	let ratingTest = {
    userName:  "TEst",
    userImage: "Test",
    ratedItem:["Irepress" , "Sol Eye Sea I" , "URL"],
    review: "Brebby Gud",
	rating: 10
	};
	
	db.Rating.create(ratingTest).then(function(dbRate){
		res.json(dbRate);
	});
});

app.listen(port, function() {
	console.log(`api running on port ${port}`);
   });

