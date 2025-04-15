import sql from "./db"; // adjust the path if needed

const seedHikes = async () => {
  const sampleHikes = [
    {
      name: "Ben Nevis Ascent",
      location: "Scotland",
      distance_metres: 17000,
      hike_date: "2023-06-14",
      notes: "Challenging but beautiful views",
      elevation_gain: 1345,
      duration_minutes: 240,
    },
    {
      name: "Snowdon Sunrise Hike",
      location: "Wales",
      distance_metres: 14000,
      hike_date: "2023-08-03",
      notes: "Started at 3AM to catch sunrise",
      elevation_gain: 1000,
      duration_minutes: 180,
    },
    {
      name: "Lake District Loop",
      location: "England",
      distance_metres: 10000,
      hike_date: "2024-02-20",
      notes: "Lots of sheep, muddy trails",
      elevation_gain: 800,
      duration_minutes: 150,
    },
  ];

  for (const hike of sampleHikes) {
    await sql`INSERT INTO hikes ${sql(hike)}`;
  }

  console.log("Seed data inserted.");
  process.exit(); // optional, just to cleanly exit the script
};

seedHikes();
