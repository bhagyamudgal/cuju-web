import { mysqlEnum } from "drizzle-orm/mysql-core";

import { UserRoles } from "../../constants";

export const UserRoleEnum = mysqlEnum("role", [
    UserRoles.Admin,
    UserRoles.User,
]);
