const express = require("express");
const router = express.Router(); 
const HostelDetail = require("../models/HostelDetail");

const calculateDynamicPrice = (basePrice, occupancyRate, season) => {
  let price = basePrice;

  // Adjust based on occupancy rate
  if (occupancyRate > 80) price += basePrice * 0.2;
  else if (occupancyRate > 50) price += basePrice * 0.1;

  // Adjust for seasonality
  const seasonFactor = season === 'Peak' ? 1.5 : season === 'Off-Season' ? 0.8 : 1;
  price *= seasonFactor;

  return parseFloat(price.toFixed(2)); // Convert to number
};

// Get details of a specific hostel by name
router.get("/:name", async (req, res) => {
  const name = req.params.name.replace(/-/g, " ").toLowerCase();
  console.log("Received Name:", name);
  
  try {
    const hostel = await HostelDetail.findOne({ name }); // Use name for query
    if (!hostel) return res.status(404).send('Hostel not found');

    const dynamicPrice = calculateDynamicPrice(
      hostel.basePrice || 0,        // Provide default value if undefined
      hostel.occupancyRate || 0,   // Provide default value if undefined
      hostel.season || 'Regular'   // Provide default value if undefined
    );

    res.json({ ...hostel.toObject(), dynamicPrice });
  } catch (error) {
    console.error("Error fetching hostel:", error);
    res.status(500).send('Server error');
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