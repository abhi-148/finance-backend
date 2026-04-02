require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());


const userRoutes = require("./routes/userRoutes");
const recordRoutes = require("./routes/recordRoutes");


app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);


app.get("/", (req, res) => {
  res.send("Finance Backend Running 🚀");
});


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.error("DB Error:", err.message);
    process.exit(1);
  }
};

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});