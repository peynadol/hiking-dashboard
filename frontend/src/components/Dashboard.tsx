import { useState } from "react";
import Card from "../components/Card";
import "./Dashboard.css";
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
    <div className="dashboard-container">
      <section className="summary-section">
        <h2 className="section-title">Summary</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Total Distance</p>
            <p className="stat-value">{(totalDistance / 1000).toFixed(1)} km</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Total Elevation</p>
            <p className="stat-value">{totalElevation} m</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Time Spent Hiking</p>
            <p className="stat-value">{Math.round(totalDuration / 60)} hours</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Hikes Logged</p>
            <p className="stat-value">{hikes.length}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Unique Locations</p>
            <p className="stat-value">{uniqueLocationsCount}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Longest Hike</p>
            <p className="stat-value">{(longestHike / 1000).toFixed(1)} km</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Highest Elevation</p>
            <p className="stat-value">{highestElevation} m</p>
          </div>
        </div>
      </section>
      <section className="search-section">
        <input
          className="search-input"
          type="text"
          placeholder="Search Hikes"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>
      <section className="hikes-section">
        <h2 className="section-title">Hikes Logged</h2>
        <div className="hikes-grid">
          {filteredHikes.length > 0 ? (
            filteredHikes.map((hike) => <Card key={hike.id} {...hike} />)
          ) : (
            <p className="no-results">No hikes found</p>
          )}
        </div>
      </section>
    </div>
  );
}
