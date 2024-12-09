const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  const password = process.env.DB_PASSWORD;
  const uri = process.env.DB_URL;

  try {
    await mongoose.connect(uri);
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Database couldn't connect successfully", err);
  }
};

module.exports = connectDB;
