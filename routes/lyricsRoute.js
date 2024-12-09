const express = require("express");
const route = express.Router();

const {
  getAllLyrics,
  getAllLyricsTesting,
} = require("../controllers/lyricsController");

route.route("/").get(getAllLyrics);
route.route("/testing").get(getAllLyricsTesting);

module.exports = route;
