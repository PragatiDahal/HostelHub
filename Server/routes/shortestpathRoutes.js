//routes/shortestpathRoutes.js
const express = require("express");
const router = express.Router();
const shortestPathController = require("../controller/shortestPathController");

// // Route to get data from shortestpath collection
// router.get('/shortestpath', shortestPathController.getData);

// Route to get clusters
router.get("/shortestpath/clusters", shortestPathController.getClusters);  // For clustering functionality

module.exports = router;