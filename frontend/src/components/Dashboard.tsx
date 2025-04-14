import { useState } from "react";
import Card from "../components/Card";

export default function Dashboard({ hikes }) {
  const [searchQuery, setSearchQuery] = useState("");

  const totalDistance = hikes.reduce((sum, h) => sum + h.distance_metres, 0);
  const totalElevation = hikes.reduce(
    (sum, h) => sum + (h.elevation_gain || 0),
    0
  );
  const totalDuration = hikes.reduce(
    (sum, h) => sum + (h.duration_minutes || 0),
    0
  );

  const uniqueLocations = new Set(hikes.map((hike) => hike.location));
  const uniqueLocationsCount = uniqueLocations.size;

  const longestHike = hikes.reduce(
    (max, hike) => (hike.distance_metres > max ? hike.distance_metres : max),
    0
  );

  const highestElevation = hikes.reduce(
    (max, hike) => (hike.elevation_gain > max ? hike.elevation_gain : max),
    0
  );

  const filteredHikes = hikes.filter((hike) =>
    hike.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard">
      <section className="summary">
        <h2>🏞️ Summary</h2>
        <p>Total Distance: {(totalDistance / 1000).toFixed(1)}km</p>
        <p>Total Elevation Gain: {totalElevation}m</p>
        <p>Total Duration: {Math.round(totalDuration / 60)} hours</p>
        <p>Hikes Logged: {hikes.length}</p>
        <p>Unique Locations Visited: {uniqueLocationsCount}</p>
        <p>
          Longest Distance in a Single Hike: {(longestHike / 1000).toFixed(1)}{" "}
          km
        </p>
        <p>Highest Elevation Gain in a Single Hike: {highestElevation}m</p>
      </section>

      <section className="search">
        <input
          type="text"
          placeholder="Search Hikes"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

      <section className="hikes-list">
        <h2>📍 Hikes Logged</h2>
        {filteredHikes.length > 0 ? (
          filteredHikes.map((hike) => <Card key={hike.id} {...hike} />)
        ) : (
          <p>No hikes found</p>
        )}
      </section>
    </div>
  );
}
