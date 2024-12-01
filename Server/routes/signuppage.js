//routes/signuppage.js
const express = require("express");
const router = express.Router();
const signuppage = require("../controller/signup");
router.post("/", signuppage);

module.exports = router;