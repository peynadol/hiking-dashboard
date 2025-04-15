const linkStyles = "text-white hover:underline hover:text-[#6B9080]";

import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-[#8FB996] p-4 shadow-sm">
      <div className="flex gap-5 ml-5">
        <Link to="/" className={linkStyles}>
          Home
        </Link>
        <Link to="/add" className={linkStyles}>
          Add Hike
        </Link>
        <Link to="/map" className={linkStyles}>
          Map
        </Link>
      </div>
      <div className="flex items-center mr-5">
        <Link to="/login" className={linkStyles}>
          Login
        </Link>
      </div>
    </nav>
  );
}
