const express = require("express");
const router = express.Router();
const Shortestpath = require("../models/Shortestpath");
const { calculateDistance, dijkstra } = require("../utils/Dijkstra");

// Fetch all shortest path data
router.get("/shortestpath", async (req, res) => {
  try {
    // Fetch all documents from the Shortestpath collection
    const shortestPath = await Shortestpath.find();

    // Respond with the fetched data
    res.json({
      success: true,
      data: shortestPath,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      success: false,
      message: "Error fetching shortest path data",
      error,
    });
  }
});

// Calculate the shortest path from the user's location
router.get("/shortestpath/calculate", async (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  // Validate latitude and longitude inputs
  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({
      success: false,
      message: "Valid latitude and longitude are required",
    });
  }

  try {
    const hostels = await Shortestpath.find();
    const graph = {};

    // Add user location as a special node
    graph["user"] = hostels.map((hostel) => ({
      id: hostel._id.toString(),
      distance: calculateDistance(userLat, userLon, hostel.latitude, hostel.longitude),
    }));

    // Create graph connections between hostels
    hostels.forEach((hostel) => {
      graph[hostel._id.toString()] = hostels
        .filter((h) => h._id.toString() !== hostel._id.toString())
        .map((other) => ({
          id: other._id.toString(),
          distance: calculateDistance(
            hostel.latitude,
            hostel.longitude,
            other.latitude,
            other.longitude
          ),
        }));
    });

    // Run Dijkstra's algorithm from user location
    const distances = dijkstra(graph, "user");

    res.json({
      success: true,
      data: distances,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error calculating shortest path",
      error,
    });
  }
});

module.exports = router;
