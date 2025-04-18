import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { z } from "zod";
import { createHike, deleteHike, getAllHikes } from "./queries.js";

const app = new Hono();
app.use(logger());

const newHikeSchema = z.object({
  name: z.string().min(1),
  location: z.string(),
  distance_metres: z.number().int().positive(),
  hike_date: z.string(),
  notes: z.string(),
});

// gets all hikes
app.get("/api/hikes", async (c) => {
  const response = await getAllHikes();
  return c.json(response);
});

// gets single hike from id
app.get("/api/hikes/:id", (c) => {
  const id = parseInt(c.req.param("id"));
  const singleHike = mockHikes.find((hike) => hike.id === id);
  if (!singleHike) {
    return c.json({ message: "Hike not found" }, 404);
  }
  return c.json(singleHike);
});

// post a hike
app.post("/api/hikes", async (c) => {
  try {
    const newHike = await c.req.json();
    const validateHike = newHikeSchema.parse(newHike);
    const insertedHike = await createHike(validateHike);
    return c.json(insertedHike, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ message: error.errors }, 400);
    }
    return c.json({ message: "Internal server error" });
  }
});

// delete hike
app.delete("/api/hikes/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  await deleteHike(id);
  return c.json({ message: "hike removed" });
});

// update hike
app.patch("/api/hikes/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  try {
    const { name: newName } = await c.req.json();
    const newNameSchema = z.object({
      name: z.string().min(1),
    });
    newNameSchema.parse({ name: newName });

    // Update the hike
    mockHikes = mockHikes.map((hike) => {
      if (hike.id === id) {
        return { ...hike, name: newName };
      }
      return hike;
    });

    return c.json({ message: "Hike updated", id, newName });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ message: error.errors }, 400); // Return validation errors if invalid
    }
    return c.json({ message: "Internal server error" }, 500);
  }
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
