import postgres from "postgres";

const sql = postgres("postgres://localhost/hikes");

await sql`
CREATE TABLE IF NOT EXISTS hikes (
id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
location TEXT NOT NULL,
distance_metres INTEGER NOT NULL,
hike_date DATE NOT NULL,
notes TEXT,
elevation_gain INTEGER,
duration_mintes INTEGER
)
`;

export default sql;
