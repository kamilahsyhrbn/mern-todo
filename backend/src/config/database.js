const mongoose = require("mongoose");
const { mongodbUri } = require("./env");

let isConnected = false; // Flag to track connection

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }
  try {
    await mongoose.connect(mongodbUri);
    isConnected = true; // Set the flag to true once connected
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
