const Lyrics = require("../models/lyrics.models");

const getAllLyrics = async (req, res) => {
  const { songTitle, artist, album, genre, sort, select } = req.query;

  const queryObject = {};
  if (songTitle) {
    queryObject.songTitle = { $regex: songTitle, $options: "i" };
  }

  if (artist) {
    queryObject.artist = { $regex: artist, $options: "i" };
  }

  if (album) {
    queryObject.album = { $regex: album, $options: "i" };
  }

  if (genre) {
    queryObject.genre = { $regex: genre, $options: "i" };
  }

  let apiResult = Lyrics.find(queryObject);
  if (sort) {
    const sortFix = sort.split(",").join(" ");
    apiResult = apiResult.sort(sortFix);
  }

  if (select) {
    const selectFix = select.split(",").join(" ");
    apiResult = apiResult.select(selectFix);
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 3;
  let skip = (page - 1) * limit;
  apiResult = apiResult.skip(skip).limit(limit);

  const myLyrics = await apiResult;

  res.status(200).json({ myLyrics });
};

const getAllLyricsTesting = async (req, res) => {
  const { artist, songTitle, album, genre, language, sort, select } = req.query;
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
    let sortFix = sort.split(",").join(" ");
    apiResult = apiResult.sort(sortFix);
  }

  if (select) {
    let selectFix = select.split(",").join(" ");
    apiResult = apiResult.select(selectFix);
  }

  let page = Number(req.query.page);
  let limit = Number(req.query.limit);
  let skip = (page - 1) * limit;

  apiResult = apiResult.skip(skip).limit(limit);

  const myLyrics = await apiResult;

  res.status(200).json({ myLyrics });
};

module.exports = { getAllLyrics, getAllLyricsTesting };
