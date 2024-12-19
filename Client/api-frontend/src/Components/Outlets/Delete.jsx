import { useEffect, useState } from "react";
function Delete() {
  const [lyrics, setLyrics] = useState([]);
  const [error, setError] = useState(null);
  const [objectId, setObjectId] = useState("");
  const [loader, setLoader] = useState(false);
  const [filterInput, setFilterInput] = useState("");

  const [filteredLyrics, setFilteredLyrics] = useState([]);

const filterChange = (e) => {
  setFilterInput(e.target.value);
  setFilteredLyrics(
    lyrics.filter((lyric) =>
      lyric.songTitle.toLowerCase().includes(e.target.value.toLowerCase()) ||
      lyric.artist.toLowerCase().includes(e.target.value.toLowerCase())
    )
  );
};


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

      <div id="search">
        <input className="text-red-500" type="text" value={filterInput} onChange={filterChange}/>
      </div>
      <div id="left" className="flex flex-col justify-center gap-4 mb-2">
        {loader ? (
          <div className="flex items-center justify-center">
            <img src="/gifNobg.gif" alt="loading Please wait" />
          </div>
        ) : filteredLyrics && filterInput ? (
          filteredLyrics.map((perLyrics,index)=>(
            <div className="flex flex-col justify-center" key={index}>
              <h1 className="font-serif italic text-gray-300 sm:text-sm md:text-xl ">
                {perLyrics.songTitle} -<span>{perLyrics.artist}</span>
              </h1>There isn’t anything to compare.
              yogesh4952:main and aryansaud-80:edited are identical.
              <input
                className="px-4 py-2 overflow-auto font-bold text-white bg-gray-500 rounded-xl"
                type="text"
                value={perLyrics._id}
                readOnly
              />
            </div>
          ))
        ) : (
          lyrics.map((perLyrics, index) => (
            <div className="flex flex-col justify-center" key={index}>
              <h1 className="font-serif italic text-gray-300 sm:text-sm md:text-xl ">
                {perLyrics.songTitle} -<span>{perLyrics.artist}</span>
              </h1>
              <input
                className="px-4 py-2 overflow-auto font-bold text-white bg-gray-500 rounded-xl"
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
        className="flex flex-col items-center justify-center "
        onSubmit={HandleSumbmit}
      >
        <div>
          <label className="font-mono text-xl font-semibold" htmlFor="objectId">
            Enter Lyrics id here:
          </label>{" "}
          <br />
          <input
            onChange={HandleInputChange}
            type="text"
            id="objectId"
            className="px-1 py-1 font-mono font-semibold text-gray-900 rounded-md md:min-w-80"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 mt-4 font-bold bg-red-500 rounded-md"
        >
          Delete
        </button>
      </form>
    </div>
  );
}

export default Delete;
