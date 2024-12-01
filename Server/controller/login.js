const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const loginpage = async (req, res) => {
  const secretKey = process.env.JWT_SECRET;
  const { userName, password } = req.body;
  try {
    const result = await User.findOne({ userName: userName });
    if (result) {
      const comparePasswords = async (password, result) => {
        try {
          const match = await bcrypt.compare(password, result);
          return match; // returns true if passwords match
        } catch (err) {
          console.error("Error comparing passwords:", err);
        }
      };
      const matched = await comparePasswords(password, result.password);
      if (matched) {
        const token = jwt.sign(
          { userId: result.id, userName: userName },
          secretKey,
          { expiresIn: "1h" }
        );

        console.log("Login Successful");
        res.status(200).json({ message: "login sucessfully", token: token });
      } else {
        console.log("Incorrect Password");
        res.json({ message: "incorrect password" });
      }
    } else {
      console.log("User doesnt exist");
      res.send("user doesnt exist please register first");
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = loginpage;
