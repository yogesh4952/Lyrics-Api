const express = require("express");
const app = express();
require("dotenv").config();
const lyrics_route = require("./routes/lyricsRoute");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
//Database connection
const connectDB = require("./db/connect");
connectDB();

//port declaration
const port = 5000 || process.env.PORT;
app.get("/", (req, res) => {
  res.send("I am live");
});

//route handler
app.use("/api/lyrics", lyrics_route);

//server start
app.listen(port, () => {
  console.log("Server started at port " + port);
});
