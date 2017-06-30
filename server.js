var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var Handlebars = require("handlebars");
var PORT = 4000 || process.env.PORT;

var app = express();
var db = mongoose.connection;

mongoose.Promise = Promise;

app.use(bodyParser.json());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("public"));

require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

mongoose.connect("mongodb://localhost/week18day3mongoose");

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(PORT, function() {
  console.log("App running on port " + PORT);
});
