import dotenv from "dotenv";
dotenv.config();

import { connectDatabase } from "../src/database/index";

const seed = async () => {
  try {
    console.log("[clear]: running...");
    const db = await connectDatabase();

    const bookings = await db.bookings.find({}).toArray();
    const users = await db.users.find({}).toArray();
    const listings = await db.listings.find({}).toArray();

    // Drop only if collection is not empty
    if (bookings.length > 0) {
      await db.bookings.drop();
    }
    if (users.length > 0) {
      await db.users.drop();
    }
    if (listings.length > 0) {
      await db.listings.drop();
    }

    console.log("[clear]: success");
  } catch {
    throw new Error("failed to seed database");
  }
};

seed();
