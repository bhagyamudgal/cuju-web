import {
    mysqlTable,
    timestamp,
    varchar,
    char,
    float,
} from "drizzle-orm/mysql-core";

export const donationsTable = mysqlTable("donations", {
    id: varchar("id", { length: 26 }).primaryKey(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
    donatorWalletAddress: char("donatorWalletAddress", {
        length: 44,
    }).notNull(),
    receiverWalletAddress: char("receiverWalletAddress", {
        length: 44,
    }).notNull(),
    amount: float("amount").notNull(),
    currency: varchar("currency", { length: 10 }).default("SOL"),
    organizationId: varchar("organizationId", { length: 26 }).notNull(),
});
