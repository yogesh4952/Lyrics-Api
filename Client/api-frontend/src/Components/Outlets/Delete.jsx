import { useEffect, useState } from "react";

function Delete() {
  const [lyrics, setLyrics] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLyrics() {
      try {
        const url = await fetch("http://localhost:5000/api/lyrics");
        if (!url.ok) {
          throw new Error("Failed to fetch lyrics");
        }
        const response = await url.json();
        setLyrics(response);
      } catch (err) {
        console.log("Cannot fetch lyrics", err);
        setError(err.message);
      }
    }

    fetchLyrics();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const HandleSumbmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex max-h-[100%] py-2">
      <div
        id="left"
        className="w-[50%] h-[100%] border-r-4 border-red-600"
      ></div>
      <form id="right" onSubmit={HandleSumbmit}>
        <input type="text" id="objectId" />
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}

export default Delete;
