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
    <div className="p-4 md:p-6 bg-[#F7F7F7] min-h-screen">
      {/* Summary Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-[#2C3639]">Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-[#8FB996]">
            <p className="text-sm text-[#6B9080] font-medium">Total Distance</p>
            <p className="text-xl font-bold text-[#2C3639]">
              {(totalDistance / 1000).toFixed(1)} km
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-[#8FB996]">
            <p className="text-sm text-[#6B9080] font-medium">
              Total Elevation
            </p>
            <p className="text-xl font-bold text-[#2C3639]">
              {totalElevation} m
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-[#8FB996]">
            <p className="text-sm text-[#6B9080] font-medium">Time Hiking</p>
            <p className="text-xl font-bold text-[#2C3639]">
              {Math.round(totalDuration / 60)} hours
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-[#8FB996]">
            <p className="text-sm text-[#6B9080] font-medium">Hikes Logged</p>
            <p className="text-xl font-bold text-[#2C3639]">{hikes.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-[#8FB996]">
            <p className="text-sm text-[#6B9080] font-medium">
              Unique Locations
            </p>
            <p className="text-xl font-bold text-[#2C3639]">
              {uniqueLocationsCount}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-[#8FB996]">
            <p className="text-sm text-[#6B9080] font-medium">Longest Hike</p>
            <p className="text-xl font-bold text-[#2C3639]">
              {(longestHike / 1000).toFixed(1)} km
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-[#8FB996]">
            <p className="text-sm text-[#6B9080] font-medium">
              Highest Elevation
            </p>
            <p className="text-xl font-bold text-[#2C3639]">
              {highestElevation} m
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="mb-6">
        <div className="relative">
          <input
            className="w-full px-4 py-2 bg-white border border-[#8FB996] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B9080] pl-10"
            type="text"
            placeholder="Search Hikes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-[#6B9080]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </section>

      {/* Hikes Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[#2C3639]">Hikes Logged</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHikes.length > 0 ? (
            filteredHikes.map((hike) => <Card key={hike.id} {...hike} />)
          ) : (
            <p className="col-span-full text-center py-8 text-gray-500">
              No hikes found
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
