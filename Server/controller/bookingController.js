//controller/bookingcontroller.js
const express = require("express");
const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userEmail = decoded.email;
    if (!userEmail) {
      return res
        .status(400)
        .json({ error: "User email is missing from token" });
    }

    const { name, location, roomType } = req.body;
    const userName = req.body.userInfo?.name;

    if (!userName || !name || !location || !roomType) {
      return res
        .status(400)
        .json({
          error: "All fields (name, location, roomType, userName) are required",
        });
    }

    // Check for existing booking
    const existingBooking = await Booking.findOne({
      "userInfo.email": userEmail,
      "hostel.name": name,
      "hostel.location": location,
      "roomType.name": roomType.name,
    });

    if (existingBooking) {
      // Return a flag indicating the user already booked this room type
      return res.status(200).json({
        alreadyBooked: true,
        message: `You have already booked a ${roomType.name} in this hostel.`,
      });
    }

    // Create a new booking
    const newBooking = new Booking({
      userInfo: {
        email: userEmail,
        name: userName,
      },
      hostel: {
        name,
        location,
      },
      roomType,
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
const getAllBookingDetails = async (req, res) => {
  try {
    // Fetch all booking details
    const bookings = await Booking.find();

    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found." });
    }

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    res.status(500).json({ error: "Failed to fetch booking details" });
  }
};

module.exports = { createBooking, getAllBookingDetails };
