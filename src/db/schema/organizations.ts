import { mysqlTable, timestamp, varchar, char } from "drizzle-orm/mysql-core";

export const organizationsTable = mysqlTable("organizations", {
    id: varchar("id", { length: 26 }).primaryKey(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
    name: varchar("name", { length: 50 }),
    walletAddress: char("walletAddress", { length: 44 }).notNull().unique(),
    image: varchar("image", { length: 200 }).notNull(),
});
