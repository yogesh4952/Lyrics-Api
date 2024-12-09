const LyricsJson = require("./lyrics.json");
const Lyrics = require("./models/lyrics.models");
const mongoose = require("mongoose");
require("dotenv").config();

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    await Lyrics.deleteMany({});

    await Lyrics.create(LyricsJson);

    console.log("Database connected succesfully");
  } catch (err) {
    console.log("Cannot connect with database", err);
  }
};

start();
