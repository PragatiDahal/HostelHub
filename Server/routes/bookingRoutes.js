//routes/bookingRoutes.js
const express = require("express");
const Booking = require("../models/Booking");
const HostelDetail = require("../models/HostelDetail");
const User = require("../models/User");
const router = express.Router();

router.post("/api/hostelBooking", async (req, res) => {
  const { userName, hostelName } = req.body;

  try {
    // Find user and hostel by name
    const user = await User.findOne({ userName });
    const hostel = await HostelDetail.findOne({ name: hostelName });

    // Check if user or hostel exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!hostel) {
      return res.status(404).json({ message: "Hostel not found" });
    }

    // Create new booking
    const newBooking = new Booking({
      user: user._id, // Use the user's ID for relational integrity
      hostel: hostel._id, // Use the hostel's ID for relational integrity
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
