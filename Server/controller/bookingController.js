//controller/bookingcontroller.js
const express = require("express");
const Booking = require("../models/Booking");
const User = require("../models/User");
const HostelDetail = require("../models/HostelDetail");

const createBooking = async (req, res) => {
  const { userInfo, name } = req.body;

  // Validate input fields
  if (!userInfo || !userInfo.email) {
    return res.status(400).json({ error: "User email is required." });
  }
  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Hostel name is required." });
  }

  try {
    console.log("Request Body:", req.body);

    // Find the hostel by name (case-insensitive search)
    const hostel = await HostelDetail.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    }).select("_id name");
    console.log("Queried Hostel Name:", name);
    console.log("Hostel Found:", hostel);

    if (!hostel) {
      return res.status(404).json({ error: "Hostel not found" });
    }

    // Find the user by email
    const user = await User.findOne({ email: userInfo.email }).select("_id email");
    console.log("Queried User Email:", userInfo.email);
    console.log("User Found:", user);

    if (!user) {
      return res.status(404).json({ error: "User not found. Please register first." });
    }

    // Check if a booking already exists for this user and hostel
    const existingBooking = await Booking.findOne({
      user: user._id,
      hostel: hostel._id,
    });
    if (existingBooking) {
      return res
        .status(400)
        .json({ error: "You have already booked this hostel." });
    }

    // Create a new booking
    const booking = new Booking({
      user: user._id,
      hostel: hostel._id,
      bookingDate: new Date(),
    });

    await booking.save();
    console.log("Booking Created:", booking);

    // Send success response
    res.status(201).json({
      message: "Booking successful",
      booking: {
        id: booking._id,
        user: user.email,
        hostel: hostel.name,
        bookingDate: booking.bookingDate,
      },
    });
  } catch (error) {
    console.error("Error in createBooking:", error.message, error.stack);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createBooking };
