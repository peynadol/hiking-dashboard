import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";

export default function Home() {
  const [allHikes, setAllHikes] = useState([]);

  useEffect(() => {
    const fetchHikes = async () => {
      const res = await fetch("http://localhost:3000/api/hikes");
      const data = await res.json();
      setAllHikes(data);
    };
    fetchHikes();
  }, []);

  return <Dashboard hikes={allHikes} />;
}
