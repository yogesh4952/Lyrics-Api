const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  const password = process.env.DB_PASSWORD;
  const uri = `mongodb+srv://user:${password}@lyricsapi.qnxlq.mongodb.net/?retryWrites=true&w=majority&appName=LyricsAPI`;

  try {
    await mongoose.connect(uri);
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Database couldn't connect successfully", err);
  }
};

module.exports = connectDB;
