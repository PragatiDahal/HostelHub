//routes/bookingRoutes.js
const express = require("express");
// const jwtToken = require("../middleWare/jwtToken");
const {
  createBooking, getAllBookingDetails
} = require("../controller/bookingController");

const router = express.Router();

// Create a new booking
router.post("/bookings", createBooking);

// Fetch user details
router.get("/bookings", getAllBookingDetails);

module.exports = router;
