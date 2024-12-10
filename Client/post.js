document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const apiUrl = "http://localhost:5000/api/lyrics";

  const songTitle = document.getElementById("SongTitle").value;
  const artist = document.getElementById("artist").value;
  const lyrics = document.getElementById("lyrics").value;
  const genre = document.getElementById("genre").value;
  const requestData = {
    songTitle: songTitle,
    artist: artist,
    lyrics: lyrics,
    genre: genre,
  };
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    console.log(response);
    if (response.ok) {
      document.getElementById("responseMessage").innerHTML =
        "Succesfully uploaded";
    } else {
      const erroMsg = await response.text();
      document.getElementById(
        "responseMessage"
      ).innerHTML = `cant uploaded ${erroMsg}`;
    }
  } catch (err) {
    console.log("404 Internal server errr", err);
  }
});
