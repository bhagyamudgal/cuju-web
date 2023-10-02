import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { applyRatelimit } from "./services/redis";
import { errorHandler } from "./utils/api";

export default async function middleware(
    req: NextRequest
): Promise<Response | undefined> {
    const { success } = await applyRatelimit(req);

    const error = new Error("Too Many Requests!");

    return success
        ? NextResponse.next()
        : NextResponse.json(errorHandler(error), { status: 429 });
}

export const config = {
    matcher: "/api/:path*",
};
