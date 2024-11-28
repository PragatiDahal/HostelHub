//utllis/fetchHostelDetail.js
const calculateSentiment = require('./calculateSentiment');
const axios = require('axios');

const HOSTEL_API_URL = 'http://localhost:5000/api/hosteldetail';

async function fetchHostelData() {
  try {
    const response = await axios.get(HOSTEL_API_URL);
    const hostels = response.data;

    // Add sentiment scores to hostels and their reviews
    hostels.forEach((hostel) => {
      const { updatedReviews, totalScore } = calculateSentiment(hostel.reviews); // Get updated reviews and total score
      hostel.reviews = updatedReviews; // Replace with updated reviews (including sentimentScore)
      hostel.sentimentScore = totalScore; // Assign total sentiment score to the hostel
    });

    // Sort hostels by overall sentiment score
    const sortedHostels = hostels.sort((a, b) => b.sentimentScore - a.sentimentScore);

    console.log(JSON.stringify(sortedHostels, null, 2)); // Debugging sorted output

    return sortedHostels; // Return sorted hostels
  } catch (error) {
    console.error("Error fetching hostels:", error.message);
    throw error;
  }
}

module.exports = fetchHostelData;

