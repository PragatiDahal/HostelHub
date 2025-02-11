// routes/hosteldetail.js
const express = require("express");
const router = express.Router();
const HostelDetail = require("../models/HostelDetail");
const fetchHostelData = require("../utils/fetchHostelDetail");
const calculateSentiment = require("../utils/calculateSentiment");
const Sentiment = require("sentiment");
const sentiment = new Sentiment();


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

    // Calculate sentiment scores dynamically
    const { updatedReviews, totalScore } = calculateSentiment(hostel.reviews);
    hostel.reviews = updatedReviews; // Update reviews with sentimentScore
    hostel.sentimentScore = totalScore; // Assign total sentiment score to the hostel

    // Sort reviews by sentimentScore
    hostel.reviews = hostel.reviews.sort(
      (a, b) => b.sentimentScore - a.sentimentScore
    );

    res.json(hostel); // Return the updated hostel details
  } catch (error) {
    console.error("Error retrieving hostel details:", error);
    res.status(500).json({ message: "Error retrieving hostel details", error });
  }
});

router.post("/:name/review", async (req, res) => {
  const name = req.params.name.replace(/-/g, " ").toLowerCase();
  const { name: reviewerName, comment, profileImage } = req.body;

  if (!reviewerName || !comment) {
    return res.status(400).json({ message: "Name and comment are required" });
  }

  try {
    const hostel = await HostelDetail.findOne({
      name: new RegExp(`^${name}$`, "i"),
    });

    if (!hostel) {
      return res.status(404).json({ message: "Hostel not found" });
    }

    // Add the new review
    const newReview = {
      name: reviewerName,
      comment,
      profileImage: profileImage || null, // Optional field
    };

    // Add sentiment score to the new review
    const Sentiment = require("sentiment");
    const sentiment = new Sentiment();
    const { score } = sentiment.analyze(comment);
    newReview.sentimentScore = score;

    hostel.reviews.push(newReview);

    await hostel.save(); // Save the updated hostel document

    res
      .status(200)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Error adding review", error });
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

router.get("/", async (req, res) => {
  try {
    const sortedHostels = await fetchHostelData(); // Use fetchHostelData
    res.json(sortedHostels); // Send sorted hostels as response
  } catch (error) {
    console.error("Error retrieving hostels:", error.message);
    res.status(500).json({ message: "Error retrieving hostels", error });
  }
});

module.exports = router;
