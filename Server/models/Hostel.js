const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  name: String,
  about: String,
  rooms: {
    single: { description: String, price: String, image: String },
    double: { description: String, price: String, image: String },
    triple: { description: String, price: String, image: String }
  },
  facilities: [String],
  gallery: [String], // Array of image URLs
  reviews: [
    {
      name: String,
      comment: String,
      profileImage: String
    }
  ],
  events: [{ title: String, date: String }],
  contact: {
    phone: String,
    email: String,
    address: String,
    mapLink: String
  },
  location: {
    address: String,
    mapLink: String
  }
});

const Hostel = mongoose.model('Hostel', hostelSchema);
module.exports = Hostel;
