const express = require("express");
const router = express.Router();
const loginpage =require("../controller/login");
router.post("/", loginpage);

module.exports = router;