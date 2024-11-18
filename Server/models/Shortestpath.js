// models/Shortestpath.js
const mongoose = require("mongoose");

const ShortestpathSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    latitude: Number,
    longitude: Number,
    // other fields as required
  },
  { collection: "shortestpath" }
);

module.exports = mongoose.model("Shortestpath", ShortestpathSchema);
