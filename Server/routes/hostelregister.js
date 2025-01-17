//routes/hostelregister.js
const express = require("express");
const router = express.Router();
const HostelRegister = require("../models/HostelRegister");

// POST route for registering a new hostel
router.post("/", async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body cannot be empty." });
    }

    const newHostel = new HostelRegister(req.body);
    await newHostel.save();

    res.status(201).json({ message: "Hostel registered successfully!" });
  } catch (err) {
    console.error("Error registering hostel:", err.message);
    res.status(500).json({ message: "Failed to register hostel.", error: err.message });
  }
});

// GET route for fetching all hostel registration requests
router.get("/", async (req, res) => {
  try {
    const hostels = await HostelRegister.find(); // Fetch all registered hostels
    res.json(hostels); // Send the data as a JSON response
  } catch (err) {
    console.error("Error fetching hostels:", err.message);
    res.status(500).json({ message: "Failed to fetch hostels.", error: err.message });
  }
});

module.exports = router;




