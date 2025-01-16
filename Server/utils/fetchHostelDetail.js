//utllis/fetchHostelDetail.js
const calculateSentiment = require("./calculateSentiment");
const axios = require("axios");

const HOSTEL_API_URL = "http://localhost:5000/api/hosteldetail";

/**
 * Fetch hostel data from the API, calculate sentiment scores, 
 * and sort hostels by their sentiment scores.
 *
 * @returns {Promise<Array>} Sorted list of hostels with sentiment scores.
 */
async function fetchHostelData() {
  try {
    // Fetch hostel data from the API
    const response = await axios.get(HOSTEL_API_URL);
    const hostels = response.data;

    // Process each hostel to calculate sentiment scores
    hostels.forEach((hostel) => {
      const { updatedReviews, totalScore } = calculateSentiment(hostel.reviews);

      // Add sentiment analysis results to the hostel object
      hostel.reviews = updatedReviews; // Reviews with sentiment scores
      hostel.sentimentScore = totalScore; // Overall sentiment score for the hostel
    });

    // Sort hostels by sentiment scores in descending order
    const sortedHostels = hostels.sort(
      (a, b) => b.sentimentScore - a.sentimentScore
    );

    console.log("Sorted Hostels:", JSON.stringify(sortedHostels, null, 2)); // Debugging output

    return sortedHostels; // Return the sorted list of hostels
  } catch (error) {
    // Log error message and rethrow
    console.error("Error fetching hostels:", error.message);
    throw error;
  }
}

module.exports = fetchHostelData;
