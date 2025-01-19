const Sentiment = require("sentiment");

/**
 * Function to calculate sentiment scores for reviews based on keywords.
 * @param {Array} reviews - Array of review objects containing comments.
 * @returns {Object} Updated reviews with sentiment scores and total sentiment score.
 */
function calculateSentiment(reviews) {
  if (!Array.isArray(reviews)) {
    console.warn("Invalid input: reviews is not an array");
    return { updatedReviews: [], totalScore: 0 };
  }

  // Define keywords with their sentiment scores
  const keywordSentimentScores = {
    wonderful: 2.5,
    wow: 2.5,
    like: 2.5,
    need: -1.5,
    tidy: 2.5,
    clean: 2.5,
    healthy: 2.5,
    nice: 2.5,
    great: 2.5,
    amazing: 2.5,
    excellent: 2.5,
    good: 1.5,
    outstanding: 2.5,
    beautiful: 2.5,
    impressive: 2.5,
    lovely: 2.5,
    brilliant: 2.5,
    awesome: 2.5,
    delightful: 2.5,
    exceptional: 2.0,
    peaceful: 2.5,
    vibrant: 2.5,
    relaxing: 2.5,
    enjoyable: 2.5,
    cheerful: 2.5,
    friendly: 2.5,
    welcoming: 2.5,
    inspiring: 3.0,
    bad: -1.5,
    poor: -1.5,
    disgusting: -1.5,
    dirty: -1.5,
    unclean: -1.5,
    disappointing: -1.5,
    frustrating: -1.5,
    boring: -1.5,
    unpleasant: -1.5,
    pathetic: -1.5,
    dreadful: -1.5,
    mediocre: -1.5,
    unimpressive: -1.5,
    useless: -1.5,
    annoying: -1.5,
    unacceptable: -1.5,
    ugly: -1.5,
    unlike: -1.5,
    terrible: -2.5,
    awful: -2.5,
    improvement: 1.5,
  };

  const negationWords = [
    "not",
    "no",
    "never",
    "isn't",
    "wasn't",
    "aren't",
    "won't",
    "don't",
    "can't",
    "doesn't",
  ];
  const modifiers = ["very", "so", "really", "quite", "too"];

  let totalScore = 0;

  const updatedReviews = reviews.map((review) => {
    if (!review || typeof review.comment !== "string") {
      console.warn("Invalid comment: Skipping review");
      return { ...review, sentimentScore: 0 };
    }

    let comment = review.comment.toLowerCase();
    let words = comment.split(/\s+/); // Split comment into words
    let score = 0;

    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      let wordScore = keywordSentimentScores[word] || 0;

      // Check for negation
      if (i > 0 && negationWords.includes(words[i - 1])) {
        wordScore *= -1; // Flip the score
      }

      // Check for modifiers
      if (i > 0 && modifiers.includes(words[i - 1])) {
        wordScore *= 1.2; // Amplify the score
      }

      score += wordScore;
    }

    totalScore += score;
    return { ...review, sentimentScore: score };
  });

  return { updatedReviews, totalScore };
}

module.exports = calculateSentiment;
