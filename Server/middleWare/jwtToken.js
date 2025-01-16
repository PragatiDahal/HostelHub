//middleWare/jwtToken.js
const jwt = require("jsonwebtoken");

const jwtToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request
    next();
  } catch (err) {
    console.error("JWT Error:", err);
    return res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = jwtToken;
