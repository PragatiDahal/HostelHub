const express = require("express");
const router = express.Router();
const HostelDetail = require("../models/HostelDetail");

// Function to calculate dynamic pricing
const calculateDynamicPrice = (basePrice, occupancyRate, season) => {
  let price = basePrice;

  // Adjust based on occupancy rate
  if (occupancyRate > 80) price += basePrice * 0.2; // Add 20% for high occupancy
  else if (occupancyRate > 50) price += basePrice * 0.1; // Add 10% for moderate occupancy

  // Adjust for seasonality
  const seasonFactor = season === "Peak" ? 1.5 : season === "Off-Season" ? 0.8 : 1;
  price *= seasonFactor;

  return parseFloat(price.toFixed(2)); // Convert to number with two decimal places
};

// Get details of a specific hostel by name
router.get("/:name", async (req, res) => {
  const name = req.params.name.replace(/-/g, " ").toLowerCase();
  console.log("Received Name:", name);

  try {
    const hostel = await HostelDetail.findOne({ name: { $regex: new RegExp(name, "i") } });
    if (!hostel) return res.status(404).send("Hostel not found");

    // Calculate dynamic prices for all room types
    const dynamicRooms = Object.fromEntries(
      Object.entries(hostel.rooms).map(([key, room]) => {
        const dynamicPrice = calculateDynamicPrice(
          parseFloat(room.price.replace(" NPR", "")), // Convert price to number
          hostel.occupancyRate || 0, // Default to 0 if undefined
          hostel.season || "Regular" // Default to "Regular" if undefined
        );
        return [key, { ...room, dynamicPrice: `${dynamicPrice} NPR` }];
      })
    );

    // Return updated hostel data with dynamic prices
    res.json({ ...hostel.toObject(), rooms: dynamicRooms });
  } catch (error) {
    console.error("Error fetching hostel:", error);
    res.status(500).send("Server error");
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
