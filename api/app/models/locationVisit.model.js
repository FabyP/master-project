const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LocationVisitSchema = new Schema({
  locationId: String,
  userId: String,
  timestamp: Date,
});

module.exports = LocationVisit = mongoose.model("locationVisits", LocationVisitSchema);
