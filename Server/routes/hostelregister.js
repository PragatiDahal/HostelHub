//routes/hostelregister.js
const express = require("express");
const router = express.Router();
const HostelRegister = require("../models/HostelRegister");

router.post("/hostelregister", async (req, res) => {
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

module.exports = router;



