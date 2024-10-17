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

    // Build the custom query object
    const cusQuery = {};

    // Apply filters based on location, gender, minPrice, and maxPrice
    if (location) {
      query.location = { $regex: location, $options: "i" }; // Case-insensitive location filter
    }

    if (gender) {
      query.gender = { $regex: gender, $options: "i" }; // Case-insensitive gender filter
    }

    if (minPrice) {
      cusQuery.price = { ...cusQuery.price, $gte: parseInt(minPrice) }; // Minimum price filter
    }

    if (maxPrice) {
      cusQuery.price = { ...cusQuery.price, $lte: parseInt(maxPrice) }; // Maximum price filter
    }

    // Fetch filtered hostels using cusQuery
    const hostels = await Hostel.find(cusQuery);

    res.json(hostels); // Send filtered hostels to the frontend
  } catch (error) {
    console.error("Error fetching hostels:", error);
    res.status(500).json({ message: "Error fetching hostels", error });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

