//routes/bookingRoutes.js
const express = require("express");
const jwtToken = require("../middleWare/jwtToken");
const {
  bookHostel,
  getBookingsByUser,
  updateBooking,
  cancelBooking,
} = require("../controller/bookingController");

const router = express.Router();

// Create a new booking
router.post("/api/hostelBooking", jwtToken, bookHostel);

// View all bookings for a user
router.get("/api/hostelBookings/:userName", jwtToken, getBookingsByUser);

// Update a booking
router.put("/api/hostelBooking/:bookingId", jwtToken, updateBooking);

// Cancel a booking
router.delete("/api/hostelBooking/:bookingId", jwtToken, cancelBooking);

module.exports = router;
