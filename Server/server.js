const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const axios = require("axios");

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));  // Set limit for JSON requests
app.use(cors());

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");  // Specify the directory for uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;  // Create a unique filename
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });  // Configure multer with the storage option;

// Import routes
const hostelDetailRoute = require("./routes/hosteldetail");
const distanceRoute = require("./routes/distanceRoute");
const hostelRegisterRoutes = require("./routes/hostelregister");
const hostelRoomRoutes = require("./routes/hostelroom");
const signupRoute = require("./routes/signuppage");
const loginRoute = require("./routes/loginpage");
const bookingRoutes = require("./routes/bookingRoutes");
const shortestpathRoutes = require("./routes/shortestpathRoutes");
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
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
app.use("/api", distanceRoute);
app.use("/", shortestpathRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);
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
    const cusQuery = {};

    if (location) cusQuery.location = { $regex: location, $options: "i" };
    if (gender) cusQuery.gender = { $regex: gender, $options: "i" };
    if (minPrice || maxPrice) {
      cusQuery.price = {};
      if (minPrice) cusQuery.price.$gte = parseInt(minPrice);
      if (maxPrice) cusQuery.price.$lte = parseInt(maxPrice);
    }

    const hostels = await Hostel.find(cusQuery);

    const hostelsWithSentiment = await Promise.all(
      hostels.map(async (hostel) => {
        try {
          const detailResponse = await axios.get(
            `http://localhost:5000/api/hosteldetail/${encodeURIComponent(
              hostel.name
            )}`
          );
          const hostelDetails = detailResponse.data;
          const reviews = hostelDetails.reviews || [];
          const totalSentiment = reviews.reduce(
            (sum, review) => sum + review.sentimentScore,
            0
          );
          const averageSentimentScore =
            reviews.length > 0 ? totalSentiment / reviews.length : 0;
          return { ...hostel.toObject(), averageSentimentScore };
        } catch (error) {
          console.error(
            `Error fetching details for hostel: ${hostel.name}`,
            error.message
          );
          return { ...hostel.toObject(), averageSentimentScore: 0 };
        }
      })
    );

    hostelsWithSentiment.sort(
      (a, b) => b.averageSentimentScore - a.averageSentimentScore
    );
    res.json(hostelsWithSentiment);
  } catch (error) {
    console.error("Error fetching hostels:", error.message);
    res.status(500).send("Server Error");
  }
});

app.post("/api/hostels", upload.single("image"), async (req, res) => {
  try {
    const hostelData = req.body;
    if (req.file) {
      hostelData.image = `uploads/${req.file.filename}`;
    }
    const newHostel = new Hostel(hostelData);
    await newHostel.save();
    res.json(newHostel);
  } catch (error) {
    console.error("Error creating hostel:", error.message);
    res.status(500).send("Server Error");
  }
});

app.put("/api/hostels/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID");
    }
    const hostelData = req.body;
    if (req.file) {
      hostelData.image = `uploads/${req.file.filename}`;
    }
    const updatedHostel = await Hostel.findByIdAndUpdate(id, hostelData, {
      new: true,
    });
    if (!updatedHostel) return res.status(404).send("Hostel not found");
    res.json(updatedHostel);
  } catch (error) {
    console.error("Error updating hostel:", error.message);
    res.status(500).send("Server Error");
  }
});

app.delete("/api/hostels/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID");
    }
    const deletedHostel = await Hostel.findByIdAndDelete(id);
    if (!deletedHostel) return res.status(404).send("Hostel not found");
    res.json({ message: "Hostel deleted successfully", hostel: deletedHostel });
  } catch (error) {
    console.error("Error deleting hostel:", error.message);
    res.status(500).send("Server Error");
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
