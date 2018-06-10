const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const reviewRoute = require("./routes/index");


var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get("/", function(req, res) {
	res.json({ message: "API Initialized!"});
   });

app.use("/api", reviewRoute);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/spot-it";

mongoose.connect(MONGODB_URI);

//start her up
app.listen(port, function() {
	console.log(`SEVER!!!!!!!!!!!!!!!!!!!!!!!!!!! api running on port ${port}`);
   });

