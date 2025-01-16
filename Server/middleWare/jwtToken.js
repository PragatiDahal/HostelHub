//middleWare/jwtToken.js
const jwt = require("jsonwebtoken");

// Middleware to verify JWT
const jwtToken = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded token (user info) to the request object
    req.user = decoded; // Contains email and other user info
    
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    console.error("JWT Error:", err);
    return res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = jwtToken;

