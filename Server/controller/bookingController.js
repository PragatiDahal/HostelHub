//controller/bookingcontroller.js
const express = require("express");
const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");

// Create a new booking
const createBooking = async (req, res) => {
  try {
    // Validate token and get user info
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure the token contains the user's email
    const userEmail = decoded.email;
    if (!userEmail) {
      return res
        .status(400)
        .json({ error: "User email is missing from token" });
    }

    const { name, location } = req.body; // Extract hostel name and location
    const userName = req.body.userInfo?.name; // Extract username from request body

    if (!userName) {
      return res.status(400).json({ error: "User name is required" });
    }

    if (!name || !location) {
      return res
        .status(400)
        .json({ error: "Hostel name and location are required" });
    }

    // Create new booking
    const newBooking = new Booking({
      userInfo: {
        email: userEmail, // Ensure email is added here
        name: userName,
      },
      hostel: {
        name: name,
        location: location, // Hostel location from request body
      },
    });

    await newBooking.save();

    res
      .status(201)
      .json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    console.error("Error during booking:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
};

// Fetch booking details for a user
const getBookingDetails = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      "userInfo.email": req.params.email,
    });
    if (!booking) {
      return res
        .status(404)
        .json({ message: "No booking found for this user." });
    }

    res.status(200).json({ booking });
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ error: "Failed to fetch booking details" });
  }
};

module.exports = { createBooking, getBookingDetails };
