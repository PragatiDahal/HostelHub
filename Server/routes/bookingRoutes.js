//routes/bookingRoutes.js
const express = require("express");
const jwtToken = require("../middleWare/jwtToken");
const { createBooking } = require("../controller/bookingController");

const router = express.Router();

// Route to handle booking creation
router.post("/bookings", jwtToken, createBooking);

module.exports = router;
