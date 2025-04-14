import { Link } from "react-router-dom";
import "./Navbar.css";
export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/add">Add Hike</Link>
      <Link to="/map">Map</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}
