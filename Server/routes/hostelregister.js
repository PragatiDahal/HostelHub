// routes/hostelregister.js
const express = require("express");
const router = express.Router();
const HostelRegister = require("../models/HostelRegister");
const nodemailer = require("nodemailer"); // For sending emails

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



// Function to send email
const sendEmail = (email, subject, message) => {
  const mailOptions = {
    from: "hostelhub2024@gmail.com",
    to: "pragatidahal001@gmail.com", // Send to the array of recipients
    subject: "Information about Hostel Registration",
    html: `<h1>Hello there</h1><p>${message}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

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
    res
      .status(500)
      .json({ message: "Failed to register hostel.", error: err.message });
  }
});

// GET route for fetching all hostel registration requests
router.get("/", async (req, res) => {
  try {
    const hostels = await HostelRegister.find(); // Fetch all registered hostels
    res.json(hostels); // Send the data as a JSON response
  } catch (err) {
    console.error("Error fetching hostels:", err.message);
    res
      .status(500)
      .json({ message: "Failed to fetch hostels.", error: err.message });
  }
});

// Approve route
router.put("/approve/:id", async (req, res) => {
  try {
    const hostel = await HostelRegister.findById(req.params.id);
    if (!hostel) {
      return res.status(404).json({ message: "Hostel not found." });
    }

    hostel.status = "approved";
    await hostel.save();

    // Send approval email to the user and other recipients
    const message = `Dear ${hostel.firstName},<br><br>Your hostel registration for  "${hostel.hostelName}" has been approved.`;
    sendEmail(hostel.email, "Hostel Registration Approved", message);

    res.status(200).json({ message: "Hostel approved successfully." });
  } catch (err) {
    console.error("Error approving hostel:", err.message);
    res
      .status(500)
      .json({ message: "Failed to approve hostel.", error: err.message });
  }
});

// Decline route
router.put("/decline/:id", async (req, res) => {
  try {
    const hostel = await HostelRegister.findById(req.params.id);
    if (!hostel) {
      return res.status(404).json({ message: "Hostel not found." });
    }

    hostel.status = "declined";
    await hostel.save();

    // Send decline email to the user and other recipients
    const message = `Dear ${hostel.firstName},<br><br>Your hostel registration for  "${hostel.hostelName}" has been declined.`;
    sendEmail(hostel.email, "Hostel Registration Declined", message);

    res.status(200).json({ message: "Hostel declined successfully." });
  } catch (err) {
    console.error("Error declining hostel:", err.message);
    res
      .status(500)
      .json({ message: "Failed to decline hostel.", error: err.message });
  }
});

// DELETE route for deleting a hostel by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedHostel = await HostelRegister.findByIdAndDelete(req.params.id);
    if (!deletedHostel) {
      return res.status(404).json({ message: "Hostel not found." });
    }
    res.status(200).json({ message: "Hostel deleted successfully." });
  } catch (err) {
    console.error("Error deleting hostel:", err.message);
    res.status(500).json({ message: "Failed to delete hostel.", error: err.message });
  }
});

module.exports = router;
