const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Rating = require("./models");

const SERVER = {
	app: express(),
	port: process.env.PORT || 3000,
	static: function(req, res) {
		console.log('dirname',__dirname)
		res.sendFile('/build/index.html');
	}
};

// Webserver
SERVER.app.use(express.static(path.join(__dirname, 'build')));
SERVER.app.get('/*', SERVER.static);

//mongo server
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/spotIt");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

Rating.create({
    userName:  "TEst",
    userImage: "Test",
    ratedItem:["Irepress" , "Sol Eye Sea I" , "IRL"],
    review: "Brebby Gud",
    rating: 10
});

// Start it up boys
SERVER.app.listen(SERVER.port, () => {
	console.log(`Port ${SERVER.port} is lit fam 🔥 🔥 🔥`);
});
