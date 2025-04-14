import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddHike from "./pages/AddHike";
import Map from "./pages/Map";
import Login from "./pages/Login";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <>
      <Router>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddHike />} />
          <Route path="/map" element={<Map />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
