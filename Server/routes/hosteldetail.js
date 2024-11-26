// routes/hosteldetail.js
const express = require("express");
const router = express.Router();
const HostelDetail = require("../models/HostelDetail");
const { calculateDistance, dijkstra } = require("../utils/Dijkstra");

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

// Calculate the shortest path between the user's location and hostels
router.post("/shortestpath", async (req, res) => {
  const { latitude, longitude } = req.body; // User's current location

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ message: "Latitude and longitude are required" });
  }

  try {
    const hostels = await HostelDetail.find({});
    if (!hostels.length) {
      return res.status(404).json({ message: "No hostels found" });
    }

    // Create a graph where the user location and hostels are nodes
    const graph = {};
    const userNode = "user";
    graph[userNode] = [];

    // Add distances from the user's location to each hostel
    hostels.forEach((hostel) => {
      const hostelNode = hostel.name;
      const distance = calculateDistance(
        latitude,
        longitude,
        parseFloat(hostel.location.latitude),
        parseFloat(hostel.location.longitude)
      );
      graph[userNode].push({ id: hostelNode, distance });
      graph[hostelNode] = [{ id: userNode, distance }];
    });

    // Add distances between hostels (optional, if required)
    for (let i = 0; i < hostels.length; i++) {
      for (let j = i + 1; j < hostels.length; j++) {
        const distance = calculateDistance(
          parseFloat(hostels[i].location.latitude),
          parseFloat(hostels[i].location.longitude),
          parseFloat(hostels[j].location.latitude),
          parseFloat(hostels[j].location.longitude)
        );
        graph[hostels[i].name].push({ id: hostels[j].name, distance });
        graph[hostels[j].name].push({ id: hostels[i].name, distance });
      }
    }

    // Find the shortest path using Dijkstra
    const distances = dijkstra(graph, userNode);

    // Find the closest hostel
    let closestHostel = null;
    let minDistance = Infinity;
    for (const hostel of hostels) {
      const hostelNode = hostel.name;
      if (distances[hostelNode] < minDistance) {
        minDistance = distances[hostelNode];
        closestHostel = hostel;
      }
    }

    res.json({
      message: "Shortest path calculated successfully",
      closestHostel,
      distance: minDistance,
    });
  } catch (error) {
    res.status(500).json({ message: "Error calculating shortest path", error });
  }
});

module.exports = router;
