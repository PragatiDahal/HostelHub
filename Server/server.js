const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Hostel Schema and Model
const hostelSchema = new mongoose.Schema({
  name: String,
  image: String,
  location: String,
  price: Number,
  gender: String,
  facilities: [String],
  description: String,
  ratings: Number,
});

const Hostel = mongoose.model("Hostel", hostelSchema);

// Routes
app.get("/api/hostels", async (req, res) => {
  try {
    const { location, gender, minPrice, maxPrice } = req.query;

    // Log query parameters to verify input
    console.log("Query params:", req.query);

    const cusQuery = {};

    if (location) {
      cusQuery.location = { $regex: location, $options: "i" };
    }

    if (gender) {
      cusQuery.gender = { $regex: gender, $options: "i" };
    }

    if (minPrice || maxPrice) {
      cusQuery.price = {};
      if (minPrice) cusQuery.price.$gte = parseInt(minPrice);
      if (maxPrice) cusQuery.price.$lte = parseInt(maxPrice);
    }

    const hostels = await Hostel.find(cusQuery);
    res.json(hostels);
  } catch (error) {
    if (error.response) {
      console.error("Error fetching hostels:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  let cusQuery = {}; // Ensure cusQuery is defined
  console.log("Constructed query:", cusQuery);
  console.log(`Server is running on port ${port}`);
});
