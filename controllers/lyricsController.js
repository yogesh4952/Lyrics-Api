const Lyrics = require("../models/lyrics.models");

const getAllLyrics = async (req, res) => {
  const myData = await Lyrics.find(req.query);

  res.status(200).json({ myData });
};

const getAllLyricsTesting = async (req, res) => {
  const { artist, songTitle, album, genre, language, sort } = req.query;
  const queryObject = {};

  if (artist) {
    queryObject.artist = { $regex: artist, $options: "i" };
  }

  if (songTitle) {
    queryObject.songTitle = { $regex: songTitle, $options: "i" };
  }

  if (album) {
    queryObject.album = { $regex: album, $options: "i" };
  }

  if (genre) {
    queryObject.genre = { $regex: genre, $options: "i" };
  }

  if (language) {
    queryObject.language = { $regex: language, $options: "i" };
  }

  let apiResult = Lyrics.find(queryObject);

  if (sort) {
    let sortFix = sort.replace(",", " ");
    apiResult = apiResult.sort(sortFix);
  }

  const myData = await apiResult;

  res.status(200).json({ myData });
};

module.exports = { getAllLyrics, getAllLyricsTesting };
