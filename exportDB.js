const mongoose = require("mongoose");
const Lyrics = require("./models/lyrics.models");
const fs = require("fs");
require("dotenv").config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });
const exportData = async () => {
  try {
    const lyrics = await Lyrics.find({});
    const jsonData = JSON.stringify(lyrics, null, 2);

    fs.writeFileSync("exportedData.json", jsonData, "utf-8");
  } catch (err) {
    console.log("Cannot write data to the json file", err);
  } finally {
    mongoose.disconnect();
  }
};

exportData();
