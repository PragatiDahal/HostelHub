// routes/hosteldetail.js
const express = require("express");
const router = express.Router(); 
const HostelDetail = require("../models/HostelDetail");

// Get details of a specific hostel by name
router.get("/:name", async (req, res) => {
  const name = req.params.name.replace(/-/g, " ").toLowerCase();
  console.log("Received Name:", name);

  try {
    const hostel = await HostelDetail.findOne({
      name: new RegExp(`^${name}$`, "i"),
    });
    if (!hostel) {
      console.log("Hostel not found with Name:", name);
      return res.status(404).json({ message: "Hostel not found" });
    }
    res.json(hostel);
  } catch (error) {
    console.error("Error retrieving hostel details:", error);
    res.status(500).json({ message: "Error retrieving hostel details", error });
  }
});

// Get details of all hostels
router.get("/", async (req, res) => {
  try {
    const hostels = await HostelDetail.find({});
    res.json(hostels);
  } catch (error) {
    console.error("Error retrieving hostels:", error);
    res.status(500).json({ message: "Error retrieving hostels", error });
  }
});

module.exports = router;
