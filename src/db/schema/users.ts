import {
    mysqlTable,
    timestamp,
    varchar,
    char,
    float,
    int,
    serial,
} from "drizzle-orm/mysql-core";

import { UserRoles } from "../../constants";
import { UserRoleEnum } from "../enums";

export const usersTable = mysqlTable("users", {
    id: varchar("id", { length: 26 }).primaryKey(),
    number: serial("number").autoincrement(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
    name: varchar("name", { length: 50 }),
    walletAddress: char("walletAddress", { length: 44 }).notNull().unique(),
    role: UserRoleEnum.notNull().default(UserRoles.User),
    totalAmountDonated: float("totalAmountDonated").default(0),
    nftId: int("nftId"),
    nftMintAddress: char("nftMintAddress", { length: 44 }),
});
