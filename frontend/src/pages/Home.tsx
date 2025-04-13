import { useEffect, useState } from "react";
import Card from "../components/Card";
export default function Home() {
  const [allHikes, setAllHikes] = useState([]);
  const data = [
    {
      title: "Total Distance Traveled",
      value: "350 km",
      icon: "🚶‍♂️", // Optional: an icon to represent the data
    },
    {
      title: "Hikes Completed",
      value: "15",
      icon: "🏞️", // Optional: an icon to represent the data
    },
    {
      title: "Locations Visited",
      value: "7",
      icon: "🌍", // Optional: an icon to represent the data
    },
  ];

  useEffect(() => {
    const getAllHikes = async () => {
      const response = await fetch("http://localhost:3000/api/hikes");
      const data = await response.json();
      setAllHikes(data);
    };
    getAllHikes();
  }, []);

  return (
    <>
      {data.map((hike, index) => {
        return <Card key={index} title={hike.title} value={hike.value} />;
      })}
    </>
  );
}
