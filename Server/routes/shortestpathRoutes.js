//routes/shortestpathRoutes.js
const express = require("express");
const router = express.Router();
const shortestPathController = require("../controller/shortestPathController");

// Route for clustering hostels
router.get("/clusters", shortestPathController.getClusters);

module.exports = router;