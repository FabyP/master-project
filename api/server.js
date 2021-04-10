const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const users = require("./app/routes/user.routes");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(cors({ credentials: true, origin: true }));

// DB Config
const db = require("./app/models");

// Connect to MongoDB
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the MongoDB!");
  })
  .catch((err) => {
    console.log("Cannot connect to MongoDB!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./app/config/passport")(passport);

// Routes
app.use("/users", users);

// Set Port and listen for requests
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
