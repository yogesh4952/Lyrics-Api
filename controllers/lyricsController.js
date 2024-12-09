const getAllLyrics = async (req, res) => {
  res.status(200).json({ msg: "I'm getAllLyrics" });
};

const getAllLyricsTesting = async (req, res) => {
  res.status(200).json({ msg: "I'm getAllLyricsTesting" });
};

module.exports = { getAllLyrics, getAllLyricsTesting };
