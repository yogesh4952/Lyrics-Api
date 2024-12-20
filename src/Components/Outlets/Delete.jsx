import { useEffect, useState } from "react";
function Delete() {
  const [lyrics, setLyrics] = useState([]);
  const [error, setError] = useState(null);
  const [objectId, setObjectId] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    async function fetchLyrics() {
      try {
        const url = await fetch("http://localhost:5000/api/lyrics");
        if (!url.ok) {
          throw new Error("Failed to fetch lyrics");
        }
        const response = await url.json();
        setLyrics(response.myLyrics);
      } catch (err) {
        console.log("Cannot fetch lyrics", err);
        setError(err.message);
      } finally {
        setLoader(false);
      }
    }

    fetchLyrics();
  }, []);

  if (error) {
    return <div className="text-white">Error: {error}</div>;
  }

  const HandleSumbmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/lyrics/${objectId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete data");
      } else {
        setLyrics((prevLyrics) =>
          prevLyrics.filter((lyrics) => lyrics._id !== objectId)
        );
        alert("Lyrics deleted succefull");
        setObjectId("");
      }
    } catch (err) {
      console.log("Cannot fetch data", err.message);
    } finally {
      setLoader(false);
    }
  };

  const HandleInputChange = (event) => {
    const trimmedValue = event.target.value.trim();
    setObjectId(trimmedValue);
  };
  return (
    <div className="grid px-4  sm:grid-cols-2 w-[100%] max-h-[100%] py-2 text-white">
      <div id="left" className="gap-4 flex flex-col justify-center  mb-2">
        {loader ? (
          <div className="flex  justify-center items-center">
            <img src="/gifNobg.gif" alt="loading Please wait" />
          </div>
        ) : (
          lyrics.map((perLyrics, index) => (
            <div className="flex flex-col justify-center" key={index}>
              <h1 className="text-gray-300 sm:text-sm md:text-xl italic font-serif ">
                {perLyrics.songTitle} -<span>{perLyrics.artist}</span>
              </h1>
              <input
                className="text-white px-4 py-2 rounded-xl font-bold overflow-auto bg-gray-500 outline-none"
                type="text"
                value={perLyrics._id}
                readOnly
              />
            </div>
          ))
        )}
      </div>
      <form
        id="right"
        className="flex flex-col justify-center items-center "
        onSubmit={HandleSumbmit}
      >
        <div>
          <label className="font-mono font-semibold text-xl" htmlFor="objectId">
            Enter Lyrics id here:
          </label>{" "}
          <br />
          <input
            onChange={HandleInputChange}
            type="text"
            id="objectId"
            className="md:min-w-80 rounded-md px-1 py-1 text-gray-900 font-mono font-semibold"
          />
        </div>
        <button
          type="submit"
          className="px-4 bg-red-500 py-2 mt-4 rounded-md font-bold"
        >
          Delete
        </button>
      </form>
    </div>
  );
}

export default Delete;
