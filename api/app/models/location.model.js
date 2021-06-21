const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LocationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  qrCodeLink: {
    type: String,
  },
  secret: {
    type: String,
  },
});

module.exports = Location = mongoose.model("locations", LocationSchema);
