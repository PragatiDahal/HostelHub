//models/booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userInfo: {
    email: { type: String, required: true },
    name: { type: String, required: true }, // user name
  },
  hostel: {
    name: { type: String, required: true },
    location: { type: String, required: true }, // optional field, can be fetched separately
  },
  roomType: [
    {
      type: String,
      required: true,
      enum: ["Single Room", "Double Room", "Triple Room"],
    },
  ],
  bookingDate: {
    type: Date,
    default: Date.now,
    status: { type: String, default: "pending" },
  },
  booked: {
    type: Boolean,
    default: false,
  },
  PaymentMethod: {
    type: String,
  },
  PaymentStatus: {
    type: String,
    default: "Pending",
  },
  paymentDetails: {
    type: Object,
  },
  paymentMode: {
    type: String,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
