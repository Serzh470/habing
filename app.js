const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const habitRoutes = require("./routes/habit");
const keys = require("./config/keys");
const app = express();

mongoose.connect(keys.mongoURI)
    .then(() => console.log("MongoDB connected!"))
    .catch((e) => console.error(e));

app.use(passport.initialize());
require("./middleware/passport")(passport);

app.use(require("morgan")("dev"));

// correct process requests
app.use(bodyParser.urlencoded({ "extended":true }));
app.use(bodyParser.json());

app.use(require("cors")());

// add routes
app.use("/api/auth", authRoutes);
app.use("/api/habit", habitRoutes);


module.exports = app;