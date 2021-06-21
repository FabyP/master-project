const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const cron = require("node-cron");
const { Expo } = require("expo-server-sdk");

const users = require("./app/routes/user.routes");
const locations = require("./app/routes/location.routes");
const locationVisits = require("./app/routes/locationVisit.routes");

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
app.use("/locations", locations);
app.use("/locationVisits", locationVisits);

// Set Port and listen for requests
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

const sendPushNotification = async (targetExpoPushToken, message) => {
  const expo = new Expo();
  const chunks = expo.chunkPushNotifications([
    { to: targetExpoPushToken, sound: "default", body: message },
  ]);
  let tickets = [];
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error(error);
    }
  }
};

// cron Job
cron.schedule("* * * * * *", function () {
  getLastVisits();
  sendPushNotification("ExponentPushToken[token]", "hello");
}); 

const LocationVisit = require("./app/models/locationVisit.model.js");
async function getLastVisits() {
  let start = new Date(new Date().getTime() - 7 * 60 * 60 * 24 * 1000); // get date of last week
  LocationVisit.find(
    { timestamp: { $gte: start } },
    function (err, locationVisits) {
      if (err) return err;
      console.log(locationVisits);
    }
  );
}


