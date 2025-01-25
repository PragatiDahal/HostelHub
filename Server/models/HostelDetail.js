const mongoose = require("mongoose");

const hostelDetailSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    about: String,
    rooms: {
      single: {
        description: String,
        price: String, // Static price (if needed for display)
        basePrice: { type: Number, default: 0 }, // Base price for dynamic pricing
        image: String,
      },
      double: {
        description: String,
        price: String, // Static price (if needed for display)
        basePrice: { type: Number, default: 0 }, // Base price for dynamic pricing
        image: String,
      },
      triple: {
        description: String,
        price: String, // Static price (if needed for display)
        basePrice: { type: Number, default: 0 }, // Base price for dynamic pricing
        image: String,
      },
    },
    facilities: [String],
    gallery: [String],
    reviews: [
      {
        name: String,
        comment: String,
        profileImage: String,
        sentimentScore: { type: Number, default: 0 }, // Sentiment score field
      },
    ],
    events: [
      {
        title: String,
        date: String,
      },
    ],
    contact: {
      phone: String,
      email: String,
      address: String,
      mapLink: String,
    },
    location: {
      address: String,
      mapLink: String,
      latitude: String,
      longitude: String,
    },
  },
  { collection: "hosteldetail" }
);

const HostelDetail = mongoose.model("HostelDetail", hostelDetailSchema);
module.exports = HostelDetail;
