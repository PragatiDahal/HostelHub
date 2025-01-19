const Sentiment = require("sentiment");

/**
 * Function to calculate sentiment scores for reviews with advanced negation handling.
 * @param {Array} reviews - Array of review objects containing comments.
 * @returns {Object} Updated reviews with sentiment scores and total sentiment score.
 */
function calculateSentiment(reviews) {
  if (!Array.isArray(reviews)) {
    console.warn("Invalid input: reviews is not an array");
    return { updatedReviews: [], totalScore: 0 };
  }

  const negationWords = [
    "not", "no", "never", "isn't", "wasn't", "aren't", "won't", "don't", "can't", "doesn't"
  ];
  const modifiers = ["very", "so", "really", "quite", "too"];

  // Define the sentiment for common keywords
  const keywordSentimentScores = {
    wonderful: 3, great: 3, amazing: 3, excellent: 3, clean: 2, spotless: 3, good: 2,
    comfortable: 2, cozy: 2, friendly: 2, helpful: 2, affordable: 2, peaceful: 2, 
    quiet: 2, secure: 2, safe: 2, spacious: 2, modern: 2, bright: 2, vibrant: 2, lovely: 3, 
    relaxing: 2, value: 3, "value-for-money": 3, maintained: 2, "well-maintained": 3,
    welcoming: 2, organized: 2, neat: 2, enjoyable: 2, accessible: 2,

    bad: -2, terrible: -3, awful: -3, dirty: -3, unhygienic: -3, uncomfortable: -2, 
    noisy: -2, unsafe: -3, cramped: -2, rude: -3, unpleasant: -2, smelly: -3, 
    expensive: -2, overpriced: -3, small: -1, poor: -2, unhelpful: -2, disorganized: -2, 
    dark: -1, cold: -2, stuffy: -2, "lack-of-security": -3, "not-worth-it": -3,

    average: 0, okay: 0, decent: 0, basic: 0, standard: 0, acceptable: 0, typical: 0, 
    simple: 0, adequate: 0, minimal: 0, "nothing-special": 0, moderate: 0, 
    reasonable: 0, "as-expected": 0, functional: 0, "no-frills": 0
  };

  let totalScore = 0;

  const updatedReviews = reviews.map((review) => {
    if (!review.comment || typeof review.comment !== "string") {
      console.warn("Invalid comment: Skipping review");
      return { ...review, sentimentScore: 0 };
    }

    const words = review.comment.toLowerCase().replace(/[^\w\s]/g, "").split(" ");
    let score = 0;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      let currentScore = keywordSentimentScores[word] || 0;

      // Handle negations like "not", "no", etc.
      let negationMultiplier = 1;

      if (i > 0 && negationWords.includes(words[i - 1])) {
        negationMultiplier = -1; 
        if (i > 1 && modifiers.includes(words[i - 2])) {
          negationMultiplier *= 0.5; 
        }

      
        if (words[i - 1] === "not" && (words[i] === "so" || words[i] === "very")) {
          negationMultiplier = 0; // Keep the sentiment neutral (e.g., "not so bad")
        }
      }

      // Adjust score with the negation multiplier and modifier effects
      score += currentScore * negationMultiplier;
    }

    
    if (score >= -1 && score <= 1) {
      score = 0;  
    }

    totalScore += score;

    return { ...review, sentimentScore: score };
  });

  return { updatedReviews, totalScore };
}

module.exports = calculateSentiment;