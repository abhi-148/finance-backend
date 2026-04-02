require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes import
const userRoutes = require("./routes/userRoutes");
const recordRoutes = require("./routes/recordRoutes");

// Routes use
app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Finance Backend Running 🚀");
});

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.error("DB Error:", err.message);
    process.exit(1);
  }
};

// Start server AFTER DB connects (important for deploy)
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});