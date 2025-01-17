//routes/hostelroom.js
const express = require('express');
const router = express.Router();
const HostelRoom = require('../models/HostelRoom'); // Import the HostelRoom model

// POST route for registering a new hostel with room availability
router.post("/", async (req, res) => {
  try {
    // Ensure the request body is not empty
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body cannot be empty." });
    }

    // Create a new hostel with room availability
    const newHostel = new HostelRoom(req.body);

    // Save the hostel data to the database
    await newHostel.save();

    res.status(201).json({ message: "Hostel registered successfully!" });
  } catch (err) {
    console.error("Error registering hostel:", err.message);
    res.status(500).json({ message: "Failed to register hostel.", error: err.message });
  }
});

// GET route for fetching all hostels with room availability
router.get("/", async (req, res) => {
  try {
    // Fetch all registered hostels and their room availability
    const hostels = await HostelRoom.find(); // Get all hostels from the database
    res.json(hostels); // Send the fetched data as a JSON response
  } catch (err) {
    console.error("Error fetching hostels:", err.message);
    res.status(500).json({ message: "Failed to fetch hostels.", error: err.message });
  }
});

// PUT route for updating room availability
router.put('/:hostelId/rooms', async (req, res) => {
    const { hostelId } = req.params;
    const { roomUpdates } = req.body; // Array of room updates with type and available fields
  
    try {
      const hostel = await HostelRoom.findById(hostelId);
  
      if (!hostel) {
        return res.status(404).json({ message: `Hostel with ID ${hostelId} not found` });
      }
  
      // Track which rooms are updated
      const updatedRooms = [];
      const notFoundRooms = [];
  
      roomUpdates.forEach(({ type, available }) => {
        const room = hostel.rooms.find((r) => r.type.toLowerCase() === type.toLowerCase());
        if (room) {
          room.available = available;
          updatedRooms.push({ type: room.type, newAvailable: room.available });
        } else {
          notFoundRooms.push(type);
        }
      });
  
      // Save the updated hostel
      await hostel.save();
  
      res.status(200).json({
        message: 'Room availability updated successfully!',
        updatedRooms,
        notFoundRooms,
        hostelName: hostel.name,
      });
    } catch (error) {
      console.error('Error updating room availability:', error);
      res.status(500).json({ message: 'Failed to update room availability', error: error.message });
    }
  });

module.exports = router;
