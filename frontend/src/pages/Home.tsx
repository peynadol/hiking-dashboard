import Card from "../components/Card";
export default function Home() {
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

  return (
    <>
      {data.map((hike, index) => {
        return <Card key={index} title={hike.title} value={hike.value} />;
      })}
    </>
  );
}
