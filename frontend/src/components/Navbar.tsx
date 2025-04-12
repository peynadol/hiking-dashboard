import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <nav
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
          borderBottom: "1px solid #ccc",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/add">Add Hike</Link>
        <Link to="/hikes">Hikes</Link>
        <Link to="/map">Map</Link>
        <Link to="/login">Login</Link>
      </nav>
    </>
  );
}
