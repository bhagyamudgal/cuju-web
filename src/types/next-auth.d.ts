import type { DefaultSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

import type { SelectUser } from "@/src/db/types";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: SelectUser;
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT extends DefaultJWT {
        sub: string;
    }
}
