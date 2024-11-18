// models/Shortestpath.js
const mongoose = require("mongoose");

const ShortestpathSchema = new mongoose.Schema({
  name: String,
  address: String,
  latitude: Number,
  longitude: Number,
  // other fields as required
});

module.exports = mongoose.model("Shortestpath", ShortestpathSchema);