//models/user.js
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  userName: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  phoneNumber: {
    type: String,
  },
  password: {
    type: String,
  },
});

const User = mongoose.model("Users", userSchema);

module.exports = User;