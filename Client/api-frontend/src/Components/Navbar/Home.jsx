import { NavLink } from "react-router-dom";
const Home = () => {
  return (
    <div className="w-[100%] min-h-40 flex flex-col justify-center items-center">
      <div>
        <button className="px-4 py-2 text-white bg-red-500 rounded-xl text-xl font-bold mr-2">
          <NavLink to="/post" className="text-white">
            Post
          </NavLink>
        </button>

        <button className="px-4 py-2 text-white bg-red-500 rounded-xl text-xl font-bold mr-2">
          <NavLink to="/delete" className="text-white">
            Delete
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default Home;
