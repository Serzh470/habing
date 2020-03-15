const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const habitRoutes = require("./routes/habit");
const keys = require("./config/keys");
const app = express();

// configure mongo database connection
// for deprecated options
const mongooseOpt = {
    useNewUrlParser:true,
    useUnifiedTopology:true
};

mongoose.connect(keys.mongoURI, mongooseOpt)
    .then(() => console.log("MongoDB connected!"))
    .catch((e) => console.error(e));

// configure authorization
app.use(passport.initialize());
require("./middleware/passport")(passport);

// configure logging
app.use(require("morgan")("dev"));

// correct process requests
app.use(bodyParser.urlencoded({ "extended":true }));
app.use(bodyParser.json());

app.use(require("cors")());

// add routes
app.use("/api/auth", authRoutes);
app.use("/api/habit", habitRoutes);


module.exports = app;