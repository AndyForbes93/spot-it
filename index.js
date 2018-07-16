const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const reviewRoute = require("./routes/index");
const Rating = require("./models/index");


var app = express();
var router = express.Router();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/spot-it";

mongoose.connect(MONGODB_URI);


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use('/', express.static("./build"));
    app.use(express.static(path.join(__dirname, './build')));
}
app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname + './build/index.html'));
});

app.use(reviewRoute);

//start her up
app.listen(port, function() {
	console.log(`SEVER!!!!!!!!!!!!!!!!!!!!!!!!!!! api running on port ${port}`);
   });

