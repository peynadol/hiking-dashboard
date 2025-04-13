import Hike from "../components/Hike";
export default function Hikes() {
  const data = [
    {
      title: "Snowdonia",
      location: "Snowdonia, Wales",
      notes: "Rugged, steeped in history.",
    },
    {
      title: "Pen y Fan",
      location: "Brecon Becons, Wales",
      notes: "Visually iconic.",
    },
    {
      title: "Walk to Wombourne",
      location: "Wolverhampton, England",
      notes: "A gentle walk along an abandoned railway track.",
    },
  ];

  return (
    <div>
      {data.map((hike, index) => {
        return (
          <Hike
            key={index}
            title={hike.title}
            location={hike.location}
            notes={hike.notes}
          />
        );
      })}
    </div>
  );
}
