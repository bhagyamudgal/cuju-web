import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({ path: ".env.local" });

const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
    throw new Error("DATABASE_URL not found in environment variables!");
}

export default {
    schema: "./src/db/schema/*",
    out: "./src/db/migrations",
    driver: "mysql2",
    dbCredentials: {
        connectionString: DB_URL,
    },
    breakpoints: true,
} satisfies Config;
