// scripts/seed.ts

// 1. Import dotenv at the top
import dotenv from 'dotenv';
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { users, userRoles } from "@/lib/db/schema";
import bcrypt from "bcryptjs";

// 2. Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// 3. Now this line will work correctly
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seed() {
  console.log("Seeding database...");

  try {
    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10);
    await db.insert(users).values({
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword,
      role: userRoles.ADMIN,
    }).onConflictDoNothing();

    // Create editor user
    const editorPassword = await bcrypt.hash("editor123", 10);
    await db.insert(users).values({
      name: "Editor User",
      email: "editor@example.com",
      password: editorPassword,
      role: userRoles.EDITOR,
    }).onConflictDoNothing();

    // Create contributor user
    const contributorPassword = await bcrypt.hash("contributor123", 10);
    await db.insert(users).values({
      name: "Contributor User",
      email: "contributor@example.com",
      password: contributorPassword,
      role: userRoles.CONTRIBUTOR,
    }).onConflictDoNothing();

    // Create regular user
    const readerPassword = await bcrypt.hash("reader123", 10);
    await db.insert(users).values({
      name: "Reader User",
      email: "reader@example.com",
      password: readerPassword,
      role: userRoles.READER,
    }).onConflictDoNothing();

    console.log("Database seeded successfully!");
    console.log("\nLogin credentials:");
    console.log("Admin: admin@example.com / admin123");
    console.log("Editor: editor@example.com / editor123");
    console.log("Contributor: contributor@example.com / contributor123");
    console.log("Reader: reader@example.com / reader123");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();