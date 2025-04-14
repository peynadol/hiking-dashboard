export default function Card({
  name,
  location,
  distance_metres,
  hike_date,
  notes,
  elevation_gain,
  duration_minutes,
}) {
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.toLocaleString("en-GB", { month: "long" });
    const year = date.getFullYear();

    return `${day}${dateSuffix(day)} ${month} ${year}`;
  };

  const dateSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return (
    <div className="card">
      <h3>{name}</h3>
      <p>
        <strong>Location:</strong> {location}
      </p>
      <p>
        <strong>Date:</strong> {formatDate(hike_date)}
      </p>
      <p>
        <strong>Distance:</strong> {distance_metres}m
      </p>
      {elevation_gain && (
        <p>
          <strong>Elevation Gain:</strong> {elevation_gain}m
        </p>
      )}
      {duration_minutes && (
        <p>
          <strong>Duration:</strong> {duration_minutes} mins
        </p>
      )}
      {notes && (
        <p>
          <strong>Notes:</strong> {notes}
        </p>
      )}
    </div>
  );
}
