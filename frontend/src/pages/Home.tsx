import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { Hike } from "@/hike";

export default function Home() {
  const [allHikes, setAllHikes] = useState<Hike[]>([]);

  useEffect(() => {
    const fetchHikes = async () => {
      const res = await fetch("http://localhost:3000/api/hikes");
      const data = await res.json();
      setAllHikes(data);
    };
    fetchHikes();
  }, []);

  const onDelete = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/hikes/${id}`, {
      method: "DELETE",
    });
    console.log(response);
    setAllHikes(allHikes.filter((hike) => hike.id != id));
  };

  return <Dashboard hikes={allHikes} onDelete={onDelete} />;
}
