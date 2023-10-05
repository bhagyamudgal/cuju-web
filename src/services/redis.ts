import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import type { NextRequest } from "next/server";
import type { AxiomRequest } from "next-axiom";

import env from "@/src/env/index.mjs";

const redis = new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
});

const rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, "1 m"),
    prefix: "@upstash/ratelimit",
});

export default redis;

const getIp = (req: AxiomRequest | NextRequest) => {
    let ip = "127.0.0.1";

    if ("ip" in req) {
        ip = req.ip ?? "127.0.0.1";
    }

    return ip;
};

export const applyRatelimit = (req: NextRequest) => {
    const ip = getIp(req);

    if (!env.ENABLE_API_RATE_LIMITS) {
        const limit = async () => {
            return { success: true, ip };
        };

        return limit();
    }

    return rateLimit.limit(ip);
};
