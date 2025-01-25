const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const loginpage = async (req, res) => {
  const secretKey = process.env.JWT_SECRET;
  const { userName, password } = req.body;

  try {
    // Find the user by username
    const result = await User.findOne({ userName: userName });

    if (result) {
      // Compare the password using bcrypt
      const comparePasswords = async (password, resultPassword) => {
        try {
          const match = await bcrypt.compare(password, resultPassword);
          return match; // returns true if passwords match
        } catch (err) {
          console.error("Error comparing passwords:", err);
        }
      };

      // Check if the passwords match
      const matched = await comparePasswords(password, result.password);

      if (matched) {
        // Generate a JWT token that includes userId, userName, and email
        const token = jwt.sign(
          {
            userId: result._id,
            userName: result.userName,
            email: result.email, // Include email in the token payload
          },
          secretKey,
          { expiresIn: "24h" } // Set expiration time for the token (1 hour in this case)
        );

        console.log("Login Successful");
        res.status(200).json({ message: "Login successful", token: token });
      } else {
        console.log("Incorrect Password");
        res.status(401).json({ message: "Incorrect password" });
      }
    } else {
      console.log("User doesn't exist");
      res
        .status(404)
        .json({ message: "User doesn't exist. Please register first" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = loginpage;
