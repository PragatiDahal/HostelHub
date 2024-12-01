//controller/signup.js
const express = require("express");
const User = require("../models/User")
const bcrypt = require("bcrypt");
const signuppage = async (req, res) => {
  const { userName, email, phoneNumber, password } = req.body;
  async function serverValidation(userName, email, phoneNumber, password) {
    if (!userName) {
      console.log("user name is required");
      return res.status(400).send("user name is required");
    } else if (!/^[A-Za-z][A-Za-z0-9]*\s?[A-Za-z0-9]*$/.test(userName)) {
      console.log(
        "userName must start with an alphabet and may include numbers and an optional space."
      );
      res
        .status(400)
        .send(
          "userName must start with an alphabet and may include numbers and an optional space."
        );
    }

    if (!email) {
      console.log("email is required");
      res.send("email is requires");
    } else if (
      !/^([A-Za-z0-9]+(?:[.#_][A-Za-z\d]+)*@[A-Za-z]+)(\.[A-Za-z]{2,3})$/.test(
        email
      )
    ) {
      console.log("invalid email");
      res.send("invalid email");
    }

    if (!phoneNumber) {
      console.log("Phone number is Required *");
      res.send("phNumber is required");
    } else if (!/^[0-9]{10}$/.test(phoneNumber)) {
      console.log("Invalid phone Number");
      res.send("invalid phoneNumber");
    }

    if (!password) {
      console.log("Password Is required *");
      res.send("password is required");
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[\W_]).{8,}$/.test(password)
    ) {
      console.log("Use atleast a uppercase lowercase a digit and a symbol");
      res.send("Use atleast a uppercase lowercase a digit and a symbol");
    }

    return true;
  }
  const checked = await serverValidation(
    userName,
    email,
    phoneNumber,
    password
  );
  if (checked) {
    try {
      let result = await User.findOne({ email: email });
      let checkUserName = await User.findOne({ userName: userName });
      if (result) {
        console.log("user already exist");
        res.send("user already exist");
      } else if (checkUserName) {
        console.log("userName already exist");
        res.send("userName already exist");
      } else {
        const hashPassword = async (password) => {
          const saltRounds = Number(process.env.SALT);
          try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            return hashedPassword;
          } catch (err) {
            console.error("Error hashing password:", err);
          }
        };
        try {
          const register = new User({
            userName: userName,
            email: email,
            phoneNumber: phoneNumber,
            password: await hashPassword(password),
          });
          register.save();
          console.log("User Registered Successfully");
          res.status(200).send("user registered successfully");
        } catch (err) {
          res.send(err);
        }
      }
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    console.log("Validation Error");
  }
};

module.exports = signuppage;
