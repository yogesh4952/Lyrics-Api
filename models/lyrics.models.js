const mongoose = require("mongoose");

const lyricsSchema = new mongoose.Schema({
  songTitle: {
    type: String,
    required: [true, "Song title must be provided"],
  },

  artist: {
    type: String,
    required: [true, "Song artist must be provided"],
  },

  album: {
    type: String,
    default: "",
  },

  releaseDate: {
    type: Date,
  },

  genre: {
    type: String,
    required: [true, "Genre must be provided"],
  },

  lyrics: {
    type: String,
    required: true,
  },

  language: {
    type: String,
    default: "English",
  },

  songDuration: {
    type: Number,
  }, // duration in seconds

  rating: {
    type: Number,
    default: 0,
  },

  views: {
    type: Number,
    default: 0,
  },

  songURL: {
    type: String,
  },

  coverArtURL: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  updatedAt: {
    type: Date,
    default: Date.now(),
  },

  tags: [String],
});

module.exports = mongoose.model("Lyrics", lyricsSchema);
