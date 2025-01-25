const express = require("express");
const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Nodemailer setup
// Setup nodemailer transport
const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail's service
  auth: {
    user: "hostelhub2024@gmail.com",
    pass: "bzwg rlic gklp hmla", // Use App Password if 2FA is enabled
  },
  secure: true, // Use secure connection (TLS)
  port: 465, // Port for secure connection (TLS)
});



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
      return res.status(400).json({
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

    // Send booking confirmation email
    const emailOptions = {
      from: "hostelhub2024@gmail.com",
      to: "pragatikdhl123@gmail.com",
      subject: "Booking Confirmation",
      html: `
        <h1>Booking Confirmed</h1>
        <p>Dear ${userName},</p>
        <p>Your booking for ${roomType.name} at ${name}, ${location} has been confirmed.</p>
        <p>Thank you for choosing our services!</p>
      `,
    };

    await transporter.sendMail(emailOptions);

    res
      .status(201)
      .json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    console.error("Error during booking:", error);

    // Send error notification email
    if (req.body.userInfo?.email) {
      await transporter.sendMail({
        from: "hostelhub2024@gmail.com",
        to: "pragatikdhl123@gmail.com",
        subject: "Booking Error",
        html: `
          <h1>Booking Failed</h1>
          <p>Dear ${req.body.userInfo.name},</p>
          <p>Unfortunately, your booking could not be processed due to an error. Please try again later.</p>
        `,
      });
    }

    res.status(500).json({ error: "Failed to create booking" });
  }
};

// Fetch booking details
const getAllBookingDetails = async (req, res) => {
  try {
    const bookings = await Booking.find();

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found." });
    }

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    res.status(500).json({ error: "Failed to fetch booking details" });
  }
};

// Accept a booking
const acceptBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // Update booking status
    booking.status = "Accepted";
    await booking.save();

    // Send acceptance email
    await transporter.sendMail({
      from: "hostelhub2024@gmail.com",
      to: "pragatikdhl123@gmail.com",
      subject: "Booking Accepted",
      html: `
        <h1>Booking Accepted</h1>
        <p>Dear ${booking.userInfo.name},</p>
        <p>Your booking for ${booking.roomType.name} at ${booking.hostel.name}, ${booking.hostel.location} has been accepted.</p>
        <p>Thank you for choosing our services!</p>
      `,
    });

    res.status(200).json({ message: "Booking accepted successfully." });
  } catch (error) {
    console.error("Error accepting booking:", error);
    res.status(500).json({ error: "Failed to accept booking." });
  }
};

// Reject a booking
const rejectBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // Update booking status
    booking.status = "Rejected";
    await booking.save();

    // Send rejection email
    await transporter.sendMail({
      from: "hostelhub2024@gmail.com",
      to: "pragatikdhl123@gmail.com",
      subject: "Booking Rejected",
      html: `
        <h1>Booking Rejected</h1>
        <p>Dear ${booking.userInfo.name},</p>
        <p>Unfortunately, your booking for ${booking.roomType.name} at ${booking.hostel.name}, ${booking.hostel.location} has been rejected.</p>
        <p>We apologize for any inconvenience caused.</p>
      `,
    });

    res.status(200).json({ message: "Booking rejected successfully." });
  } catch (error) {
    console.error("Error rejecting booking:", error);
    res.status(500).json({ error: "Failed to reject booking." });
  }
};

module.exports = {
  createBooking,
  getAllBookingDetails,
  acceptBooking,
  rejectBooking,
};