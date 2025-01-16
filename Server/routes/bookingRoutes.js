//routes/bookingRoutes.js
const express = require("express");
// const jwtToken = require("../middleWare/jwtToken");
const {createBooking,getBookingDetails,} = require("../controller/bookingController");
const router = express.Router();

// Create a new booking
router.post("/bookings", createBooking);

// Fetch booking details for a user
router.get("/bookings/:email", getBookingDetails);

module.exports = router;
