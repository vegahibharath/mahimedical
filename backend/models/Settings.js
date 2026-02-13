const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  phone: String,
  email: String,
  address1: String,
    address2: String,
  mapLink: String,
  logo: String
});

module.exports = mongoose.model("Settings", settingsSchema);
