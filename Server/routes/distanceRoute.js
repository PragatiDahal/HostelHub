const express = require("express");
const axios = require("axios");
const router = express.Router();

// Haversine formula function
function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const toRad = (x) => (x * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

// API endpoint to calculate distances
router.post("/hosteldistance", async (req, res) => {
    try {
        const { userLocation } = req.body;
        
        if (!userLocation || !userLocation.lat || !userLocation.lon) {
            return res.status(400).json({ error: "User location is required." });
        }

        // Fetch hostel data
        const response = await axios.get("http://localhost:5000/api/hosteldetail");
        const hostels = response.data; // Assuming API returns an array of hostels
        console.log("hostels");
        
        // Calculate distance for each hostel
        const hostelsWithDistance = hostels.map((hostel) => {
            const { location } = hostel;
            const distance = haversine(
                userLocation.lat,
                userLocation.lon,
                location.lat,
                location.lon
            );

            return {
                ...hostel,
                distance, // Add distance to each hostel object
            };
        });

        // Sort hostels by distance
        hostelsWithDistance.sort((a, b) => a.distance - b.distance);

        res.json(hostelsWithDistance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch hostel data." });
    }
});

module.exports = router;
