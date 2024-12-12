import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  return (
    <nav className="bg-black shadow-gray-300 shadow-sm text-white w-[100%] sticky top-0 left-0 h-14 flex items-center justify-around">
      <div>
        <h1 className="text-xl sm:text-3xl text-gray-300 italic">
          yogeh<span className="text-red-500 font-bold">S</span>hah
          <span className="sm:text-red-500 sm:text-4xl sm:font-extrabold ">
            .
          </span>
        </h1>
      </div>
      <div
        id="links"
        className="hidden  sm:flex w-[30vw]  justify-around items-center text-md font-bold italic"
      >
        <NavLink
          end
          to="/"
          className={({ isActive }) =>
            `${isActive ? "active before:bg-red-600" : "before:bg-white"} nav`
          }
        >
          Home
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `${isActive ? "active before:bg-red-600" : "before:bg-white"} nav`
          }
          to="/post"
        >
          Post
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `${isActive ? "active before:bg-red-600" : "before:bg-white"} nav`
          }
          to="/delete"
        >
          Delete
        </NavLink>
      </div>
      <div
        id="menuIcon"
        className="sm:hidden block text-3xl font-extrabold text-white"
      >
        <FontAwesomeIcon
          icon={faBars}
          className="text-white text-xl sm:text-3xl"
        />
      </div>
    </nav>
  );
};

export default Navbar;
