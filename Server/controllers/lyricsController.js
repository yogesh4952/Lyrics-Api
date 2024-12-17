const Lyrics = require("../models/lyrics.models");
const fs = require("fs");
let data = require("../lyrics.json");
const path = require("path");
const { json } = require("express");
const lyricsModels = require("../models/lyrics.models");

exports.getAllLyrics = async (req, res) => {
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
  let limit = Number(req.query.limit) || 10;
  let skip = (page - 1) * limit;
  apiResult = apiResult.skip(skip).limit(limit);

  const myLyrics = await apiResult;

  res.status(200).json({ myLyrics });
};

exports.getSingleLyrics = async (req, res) => {
  try {
    const { id } = req.params;

    const lyrics = await Lyrics.findById(id);

    if (lyrics) {
      return res.status(200).json(lyrics);
    }
    return res.status(404).send("Item not found");
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch lyrics", err });
  }
};

exports.updateLyrics = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const lyrics = await Lyrics.findByIdAndUpdate(id, updateData);
    if (!lyrics) {
      return res.status(404).send("Lyrics cant found");
    }
    return res.status(200).json(lyrics);
  } catch (err) {
    res.status(504).send("Internal server error", err);
  }
};

exports.deleteLyrics = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await Lyrics.findByIdAndDelete(id);
    if (!deleteData) {
      return res.status(404).send("Cannot find data");
    }
    return res.status(204).json({ msg: "Deletd succesffuly" });
  } catch (err) {
    return res.status(500).send({ messgae: "Internal server error" });
  }
};

exports.createLyrics = async (req, res) => {
  try {
    const newLyrics = req.body;
    console.log("Received request body: ", newLyrics);
    const existingLyrics = await Lyrics.findOne({
      songTitle: newLyrics.songTitle,
    });
    if (existingLyrics) {
      return res.status(201).send("Lyrics already exist in Database");
    }
    const small = new Lyrics(newLyrics);
    await small.save();
    console.log("Lyrics Saved: ", small);
    res.status(201).json({
      message: "Lyrics successfully added",
      data: small,
    });
  } catch (err) {
    console.error("Internal server error", err);
    res.status(500).send("Internal server error");
  }
};

exports.getAllLyricsTesting = async (req, res) => {
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
