 // utils/calculateSentiment.js
 const Sentiment = require("sentiment");
 const sentiment = new Sentiment();
 
 function calculateSentiment(reviews) {
   // Validation: Check if reviews is a valid array
   if (!Array.isArray(reviews)) {
     console.warn("Invalid input: reviews is not an array");
     return { updatedReviews: [], totalScore: 0 }; // Return empty data if invalid
   }
 
   let totalScore = 0;
 
   // Calculate sentiment scores for each review
   const updatedReviews = reviews.map((review) => {
     const score = sentiment.analyze(review.comment).score;
     totalScore += score; // Add each score to the total
     return { ...review, sentimentScore: score }; // Append sentimentScore to each review
   });
 
   return { updatedReviews, totalScore }; // Return updated reviews and total score
 }
 
 module.exports = calculateSentiment;
 
 

 
