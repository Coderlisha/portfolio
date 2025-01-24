const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Initialize app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Create a Mongoose schema
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
});

// Create a model
const Message = mongoose.model("Message", messageSchema);

// API endpoint to handle form submissions
app.post("/api/contact", async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    // Save the message to MongoDB
    const newMessage = new Message({ name, phone, message });
    await newMessage.save();

    res
      .status(200)
      .json({ success: true, message: "Message saved successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
