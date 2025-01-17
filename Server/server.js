const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const hostelDetailRoute = require("./routes/hosteldetail");
const distanceRoute = require("./routes/distanceRoute");
const hostelRegisterRoutes = require("./routes/hostelregister");
const hostelRoomRoutes = require("./routes/hostelroom")
const signupRoute = require("./routes/signuppage");
const loginRoute = require("./routes/loginpage");
const bookingRoutes = require("./routes/bookingRoutes");
const axios = require("axios");

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.use("/api/hosteldetail", hostelDetailRoute);
// app.use("/api", shortestpathRoute);
app.use("/api", distanceRoute);
app.use("/api/hostelregister", hostelRegisterRoutes);
app.use("/api/hostelroom", hostelRoomRoutes);
app.use("/api/signup", signupRoute);
app.use("/api/login", loginRoute);
app.use("/api", bookingRoutes);
app.use("/uploads", express.static("uploads"));

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

    // Fetch hostels based on filters
    const hostels = await Hostel.find(cusQuery);

    // For each hostel, fetch its detailed data and calculate average sentiment score
    const hostelsWithSentiment = await Promise.all(
      hostels.map(async (hostel) => {
        try {
          // Fetch hostel details from the detail API
          const detailResponse = await axios.get(
            `http://localhost:5000/api/hosteldetail/${encodeURIComponent(
              hostel.name
            )}`
          );

          const hostelDetails = detailResponse.data;

          // Calculate the average sentiment score from the reviews
          const reviews = hostelDetails.reviews || [];
          const totalSentiment = reviews.reduce(
            (sum, review) => sum + review.sentimentScore,
            0
          );
          const averageSentimentScore =
            reviews.length > 0 ? totalSentiment / reviews.length : 0;

          // Return hostel data with the calculated average sentiment score
          return {
            ...hostel.toObject(), // Convert Mongoose document to plain object
            averageSentimentScore,
          };
        } catch (error) {
          console.error(
            `Error fetching details for hostel: ${hostel.name}`,
            error.message
          );
          return {
            ...hostel.toObject(),
            averageSentimentScore: 0, // Default to 0 if detail API fails
          };
        }
      })
    );
    // Sort the hostels by averageSentimentScore in descending order
    hostelsWithSentiment.sort(
      (a, b) => b.averageSentimentScore - a.averageSentimentScore
    );

    res.json(hostelsWithSentiment);
  } catch (error) {
    console.error("Error fetching hostels:", error.message);
    res.status(500).send("Server Error");
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  let cusQuery = {}; // Ensure cusQuery is defined
  console.log("Constructed query:", cusQuery);
  console.log(`Server is running on port ${port}`);
});
