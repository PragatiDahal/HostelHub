//controller/bookingcontroller.js 
const express = require("express");
const Booking = require("../models/Booking");
const HostelDetail = require("../models/HostelDetail");
const User = require("../models/User");
const router = express.Router();

// Create a new booking
const bookHostel = async (req, res) => {
    const { userName, hostelName } = req.body;
  
    try {
      const user = await User.findOne({ userName });
      const hostel = await HostelDetail.findOne({ name: hostelName });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (!hostel) {
        return res.status(404).json({ message: "Hostel not found" });
      }
  
      const newBooking = new Booking({
        user: user._id,
        hostel: hostel._id,
      });
  
      await newBooking.save();
      res.status(201).json({ message: "Booking successful", booking: newBooking });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  // View all bookings for a user
  const getBookingsByUser = async (req, res) => {
    const { userName } = req.params;
  
    try {
      const user = await User.findOne({ userName });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const bookings = await Booking.find({ user: user._id })
        .populate("hostel")
        .exec();
  
      res.status(200).json({ bookings });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  // Update a booking
  const updateBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { newHostelName } = req.body;
  
    try {
      const hostel = await HostelDetail.findOne({ name: newHostelName });
      if (!hostel) {
        return res.status(404).json({ message: "Hostel not found" });
      }
  
      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        { hostel: hostel._id },
        { new: true }
      )
        .populate("hostel")
        .exec();
  
      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      res.status(200).json({ message: "Booking updated", booking: updatedBooking });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  // Cancel a booking
  const cancelBooking = async (req, res) => {
    const { bookingId } = req.params;
  
    try {
      const deletedBooking = await Booking.findByIdAndDelete(bookingId);
      if (!deletedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      res.status(200).json({ message: "Booking canceled", booking: deletedBooking });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  module.exports = {
    bookHostel,
    getBookingsByUser,
    updateBooking,
    cancelBooking,
  };