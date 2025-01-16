 // utils/calculateSentiment.js
const Sentiment = require("sentiment");
const sentiment = new Sentiment();

// Define an extended keyword dictionary with positive, negative, and neutral keywords
const keywordSentimentScores = {
  // Positive keywords
  wonderful: 3,
  great: 3,
  amazing: 3,
  excellent: 3,
  clean: 2,
  spotless: 3,
  good: 2,
  comfortable: 2,
  cozy: 2,
  friendly: 2,
  helpful: 2,
  affordable: 2,
  peaceful: 2,
  quiet: 2,
  secure: 2,
  safe: 2,
  spacious: 2,
  modern: 2,
  bright: 2,
  vibrant: 2,
  lovely: 3,
  relaxing: 2,
  value: 3, // Short for "value for money"
  "value-for-money": 3,
  maintained: 2,
  "well-maintained": 3,
  welcoming: 2,
  organized: 2,
  neat: 2,
  enjoyable: 2,
  accessible: 2,

  // Negative keywords
  bad: -2,
  terrible: -3,
  awful: -3,
  dirty: -3,
  unhygienic: -3,
  uncomfortable: -2,
  noisy: -2,
  unsafe: -3,
  cramped: -2,
  rude: -3,
  unpleasant: -2,
  smelly: -3,
  expensive: -2,
  overpriced: -3,
  small: -1,
  poor: -2,
  unhelpful: -2,
  disorganized: -2,
  dark: -1,
  cold: -2,
  stuffy: -2,
  "lack-of-security": -3,
  "not-worth-it": -3,

  // Neutral keywords
  average: 0,
  okay: 0,
  decent: 0,
  basic: 0,
  standard: 0,
  acceptable: 0,
  typical: 0,
  simple: 0,
  adequate: 0,
  minimal: 0,
  "nothing-special": 0,
  moderate: 0,
  reasonable: 0,
  "as-expected": 0,
  functional: 0,
  "no-frills": 0,
};

const negationWords = ["not", "no", "never", "hardly", "barely", "isn't", "wasn't", "aren't", "won't", "don't"];

/**
 * Function to calculate sentiment scores for reviews with negation handling.
 * @param {Array} reviews - Array of review objects containing comments.
 * @returns {Object} Updated reviews with sentiment scores and total sentiment score.
 */
function calculateSentiment(reviews) {
  if (!Array.isArray(reviews)) {
    console.warn("Invalid input: reviews is not an array");
    return { updatedReviews: [], totalScore: 0 };
  }

  let totalScore = 0;

  const updatedReviews = reviews.map((review) => {
    if (!review.comment || typeof review.comment !== "string") {
      console.warn("Invalid comment: Skipping review");
      return { ...review, sentimentScore: 0 };
    }

    const words = review.comment.toLowerCase().replace(/[^\w\s]/g, "").split(" ");
    const reviewText = review.comment.toLowerCase();

    let score = 0;

    words.forEach((word, index) => {
      if (keywordSentimentScores[word] !== undefined) {
        const isNegated = index > 0 && negationWords.includes(words[index - 1]);
        score += isNegated ? -keywordSentimentScores[word] : keywordSentimentScores[word];
      }
    });

    // Handle multi-word phrases
    Object.keys(keywordSentimentScores).forEach((phrase) => {
      if (phrase.split(" ").length > 1 && reviewText.includes(phrase)) {
        const isNegated = negationWords.some((neg) => reviewText.includes(`${neg} ${phrase}`));
        const phraseScore = isNegated ? -keywordSentimentScores[phrase] : keywordSentimentScores[phrase];
        score += phraseScore;
      }
    });

    totalScore += score;
    return { ...review, sentimentScore: score };
  });

  return { updatedReviews, totalScore };
}
module.exports = calculateSentiment;

 
 

 
