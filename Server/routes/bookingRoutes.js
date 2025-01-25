//routes/bookingRoutes.js
const express = require("express");
// Import booking controller methods
const {
  createBooking,
  getAllBookingDetails,
  acceptBooking,
  rejectBooking,
} = require("../controller/bookingController");

const router = express.Router();

// Create a new booking
router.post("/bookings", createBooking);

// Fetch all booking details
router.get("/bookings", getAllBookingDetails);

// Accept a booking
router.put("/bookings/accept/:id", acceptBooking);

// Reject a booking
router.put("/bookings/reject/:id", rejectBooking);

module.exports = router;


