const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

// Load Location model
const Location = require("../models/location.model.js");

router.post("/location", async (req, res) => {
  let location = new Location(req.body);

  try {
    let tmp = await location.save();
    let secret = uuidv4();
    tmp.qrCodeLink =
      "http://localhost:5000/?location=" + tmp._id + "&s=" + secret;
    tmp.secret = secret;
    await tmp.save();
    res.send(tmp);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/locations", async (req, res) => {
  const locations = await Location.find({});

  try {
    res.send(locations);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/location/:id", async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);

    if (!location) {
      res.status(404).send("No Location found");
    }
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/location/:id", async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body);

    if (!location) {
      res.status(404).send("No Location found");
    }
    res.send(location);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
