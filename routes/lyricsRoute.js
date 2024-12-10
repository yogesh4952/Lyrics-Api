const express = require("express");
const route = express.Router();

const lyricsController = require("../controllers/lyricsController");

route.route("/").get(lyricsController.getAllLyrics);

route.route("/").post(lyricsController.createLyrics);

route.route("/:id").get(lyricsController.getSingleLyrics);
// Place GET at the top for clarity
route.route("/:id").put(lyricsController.updateLyrics);
route.route("/:id").delete(lyricsController.deleteLyrics);
route.route("/testing").get(lyricsController.getAllLyricsTesting);

module.exports = route;
