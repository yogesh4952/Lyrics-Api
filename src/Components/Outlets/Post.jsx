import { useEffect, useState } from "react";
import "./Post.css";

function Post() {
  const [songTitle, setSongTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [album, setAlbum] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(false);

  const requestData = {
    songTitle,
    artist,
    genre,
    album,
    lyrics,
    language,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!songTitle || !album || !artist || !lyrics || !genre) {
      alert("Please fill the all required fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/lyrics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Invalid request", response.text());
      } else {
        alert("Your request send sucessfully");
        alert("Your request was sent successfully!");
        // Optionally, clear the form after success
        setSongTitle("");
        setArtist("");
        setGenre("");
        setAlbum("");
        setLyrics("");
        setLanguage("");
      }
    } catch (error) {
      console.log("Cannot fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(songTitle, artist, genre, album, lyrics);
  return (
    <form
      onSubmit={handleSubmit}
      className="border max-w-[30%] mx-auto py-4 mt-14 flex flex-col justify-start items-center text-white px-2 mb-2"
    >
      <h1 className="text-center text-2xl text-green-500 font-bold font-mono">
        Enter details here
      </h1>

      <div className="inputField">
        <label htmlFor="songTitle">Song Title:</label>
        <input
          className="px-4 py-2 text-black font-serif"
          type="text"
          id="songTitle"
          placeholder="Song title"
          required
          onChange={(e) => setSongTitle(e.target.value.trim())}
        />
      </div>

      <div className="inputField">
        <label htmlFor="artist">Artist:</label>
        <input
          type="text"
          className="px-4 py-2 text-black font-serif"
          id="artist"
          placeholder="Artist"
          required
          onChange={(e) => setArtist(e.target.value.trim())}
        />
      </div>

      <div className="inputField">
        <label htmlFor="genre">Genre:</label>
        <input
          type="text"
          id="genre"
          className="px-4 py-2 text-black font-serif"
          placeholder="Genre"
          required
          onChange={(e) => setGenre(e.target.value.trim())}
        />
      </div>

      <div className="inputField">
        <label htmlFor="album">Album:</label>
        <input
          type="text"
          id="album"
          className="px-4 py-2 text-black font-serif"
          placeholder="Album"
          onChange={(e) => setAlbum(e.target.value.trim())}
        />
      </div>

      <div className="inputField">
        <label htmlFor="language">Album:</label>
        <input
          type="text"
          id="language"
          className="px-4 py-2 text-black font-serif"
          placeholder="Language"
          onChange={(e) => setLanguage(e.target.value.trim())}
        />
      </div>

      <div className="inputField">
        <label htmlFor="lyrics">Lyrics:</label>
        <textarea
          onChange={(e) => setLyrics(e.target.value.trim())}
          className="overflow-x-scroll-scroll text-black px-2 py-1 rounded-md resize-none"
          id="lyrics"
          required
          placeholder="Lyrics"
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-red-500 rounded-md mt-4 px-4 py-2"
          disabled={loading}
        >
          Post
        </button>

        <p className={`${loading ? "block" : "hidden"}`}>
          <img src="/gifNobg" alt="loading..." />
        </p>
      </div>
    </form>
  );
}

export default Post;
