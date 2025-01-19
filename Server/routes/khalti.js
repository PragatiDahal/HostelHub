const express = require("express");
const router = express.Router();

const { khalti, paymentVerify } = require("../controller/khalti");

router.post("/", khalti);
// router.post("/verify", paymentVerify);

module.exports = router;