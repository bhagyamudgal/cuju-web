import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import type { donationsTable } from "../schema/donations";
import type { organizationsTable } from "../schema/organizations";
import type { usersTable } from "../schema/users";

export type SelectUser = InferSelectModel<typeof usersTable>;
export type SelectOrganization = InferSelectModel<typeof organizationsTable>;
export type SelectDonation = InferSelectModel<typeof donationsTable>;

export type InsertUser = InferInsertModel<typeof usersTable>;
export type InsertOrganization = InferInsertModel<typeof organizationsTable>;
export type InsertDonation = InferInsertModel<typeof donationsTable>;
