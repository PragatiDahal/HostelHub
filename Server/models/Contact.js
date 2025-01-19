// models/Contact.js
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String },
    message: { type: String, required: true },
  },
  { timestamps: true }, // Automatically adds createdAt and updatedAt
  { collection: 'contacts' });

module.exports = mongoose.model("Contact", contactSchema);
