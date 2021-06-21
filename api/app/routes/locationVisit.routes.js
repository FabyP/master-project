const express = require("express");
const router = express.Router();

// Load Location model
const LocationVisit = require("../models/locationVisit.model.js");

router.post("/locationVisit", async (req, res) => {
  console.log(req.body);
  date = new Date();
  let locationVisit = new LocationVisit({
    locationId: req.body.locationId,
    userId: req.body.userId,
    timestamp: date,
  });

  try {
    await locationVisit.save();
    res.send({ status: "success", data: { locationVisit: locationVisit } });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/locationVisits", async (req, res) => {
  const locationVisits = await LocationVisit.find({});

  try {
    res.send(locationVisits);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
