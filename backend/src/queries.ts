import sql from "./db";

export async function getAllHikes() {
  return await sql`SELECT * FROM hikes ORDER BY hike_date DESC`;
}

export async function getHikeById(id: number) {
  return await sql`SELECT * FROM hikes WHERE id = ${id}`;
}

export async function createHike(hike: {
  name: string;
  location: string;
  distance_metres: number;
  hike_date: string;
  notes: string;
}) {
  try {
    const [newHike] = await sql`
        INSERT INTO hikes (name, location, distance_metres, hike_date, notes)
        VALUES (
          ${hike.name},
          ${hike.location},
          ${hike.distance_metres},
          ${hike.hike_date},
          ${hike.notes}
        )
        RETURNING *
      `;
    return newHike;
  } catch (error) {
    console.error("Error creating hike:", error);
    throw new Error("Failed to create hike");
  }
}

export async function deleteHike(id: number) {
  return await sql`DELETE FROM hikes WHERE id = ${id}`;
}

export async function updateHike(
  id: number,
  hike: {
    name?: string;
    location?: string;
    distance_metres?: number;
    hike_date?: string;
    notes?: string;
    elevation_gain?: number;
    duration_minutes?: number;
  }
) {
  try {
    const updatedHike = await sql`
      UPDATE hikes 
      SET ${sql(hike)} 
      WHERE id = ${id} 
      RETURNING *`;
    return updatedHike;
  } catch (error) {
    console.error("Error updating hike:", error);
    throw new Error("Failed to update hike");
  }
}
