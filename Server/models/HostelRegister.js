// models/HostelRegister.js
const mongoose = require("mongoose");

const hostelRegisterSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    hostelName: String,
    panNumber: String,
  },
  { collection: "hostelregister" }
);
module.exports = mongoose.model("HostelRegister", hostelRegisterSchema);
