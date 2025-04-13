export default function Hike({ title, location, notes }) {
  return (
    <div>
      <h3>{title}</h3>
      <h5>{location}</h5>
      <p>{notes}</p>
    </div>
  );
}
