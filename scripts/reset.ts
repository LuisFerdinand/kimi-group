// scripts/reset.ts

// 1. Import dotenv
import dotenv from 'dotenv';
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { tables } from "@/lib/db/schema";

// 2. Load environment variables
dotenv.config({ path: '.env.local' });

// 3. Now this will work
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function resetDatabase() {
  console.log("🔴 Resetting database...");

  try {
    // ... rest of the function is the same
    const tableNames = Object.keys(tables);
    const dropQueries = tableNames.map((name) => `DROP TABLE IF EXISTS "${name}" CASCADE;`);

    console.log("Dropping existing tables...");
    for (const query of dropQueries) {
      await sql`${query}`;
    }
    console.log("✅ Tables dropped successfully.");

    console.log("Running migrations to recreate tables...");
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("✅ Migrations completed successfully.");

    console.log("🟢 Database has been reset!");
  } catch (error) {
    console.error("❌ Error resetting database:", error);
    process.exit(1);
  }
}

resetDatabase();