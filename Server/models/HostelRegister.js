// models/HostelRegister.js
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
    status: {
      type: String,
      enum: ["pending", "approved", "declined"],
      default: "pending",
    },
  },
  { collection: "hostelregister" }
);

module.exports = mongoose.model("HostelRegister", hostelRegisterSchema);

