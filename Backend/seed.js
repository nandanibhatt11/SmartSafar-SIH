import dotenv from "dotenv";
dotenv.config();
import "dotenv/config";
import mongoose from "mongoose";
import Location from "./models/Location.js";
import City from "./models/City.js";
import { cities, locations } from "./seedData.js";

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Location.deleteMany({});
    await City.deleteMany({});

    await Location.insertMany(locations);
    await City.insertMany(cities);

    console.log(`Seeded ${locations.length} locations and ${cities.length} cities.`);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
