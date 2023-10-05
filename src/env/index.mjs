import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
    server: {
        TZ: z.string().default("Etc/UTC"),
        NODE_ENV: z.union([z.literal("development"), z.literal("production")]),
        ENABLE_API_RATE_LIMITS: z
            .union([z.literal("true"), z.literal("false")])
            .transform((value) => {
                return value === "true";
            }),

        // Database
        DATABASE_URL: z.string().nonempty(),

        // Nextauth
        NEXTAUTH_URL: z.string().url(),
        NEXTAUTH_SECRET: z.string().nonempty(),

        // Redis
        UPSTASH_REDIS_REST_URL: z.string().url(),
        UPSTASH_REDIS_REST_TOKEN: z.string().nonempty(),

        // Underdog
        UNDERDOG_API_KEY: z.string().nonempty(),

        // Axiom
        AXIOM_TOKEN: z.string().nonempty(),
        AXIOM_DATASET: z.union([
            z.literal("cuju-api-dev"),
            z.literal("cuju-api-prod"),
        ]),
    },
    client: {
        // app
        NEXT_PUBLIC_API_URL: z.string().url(),

        // solana
        NEXT_PUBLIC_SOLANA_NETWORK: z.union([
            z.literal("devnet"),
            z.literal("mainnet-beta"),
        ]),
        NEXT_PUBLIC_SOLANA_DEVNET_RPC_URL: z.string().url().optional(),
        NEXT_PUBLIC_SOLANA_MAINNET_RPC_URL: z.string().url().optional(),
    },
    runtimeEnv: {
        // client
        // app
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,

        // solana
        NEXT_PUBLIC_SOLANA_NETWORK: process.env.NEXT_PUBLIC_SOLANA_NETWORK,
        NEXT_PUBLIC_SOLANA_DEVNET_RPC_URL:
            process.env.NEXT_PUBLIC_SOLANA_DEVNET_RPC_URL,
        NEXT_PUBLIC_SOLANA_MAINNET_RPC_URL:
            process.env.NEXT_PUBLIC_SOLANA_MAINNET_RPC_URL,

        // server
        // app
        TZ: process.env.TZ,
        NODE_ENV: process.env.NODE_ENV,
        SEND_EMAILS: process.env.SEND_EMAILS,
        ENABLE_API_RATE_LIMITS: process.env.ENABLE_API_RATE_LIMITS,

        // Database
        DATABASE_URL: process.env.DATABASE_URL,
        SUPABASE_PROJECT_URL: process.env.SUPABASE_PROJECT_URL,
        SUPABASE_API_KEY: process.env.SUPABASE_API_KEY,

        // Nextauth
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

        // Redis
        UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
        UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,

        // Underdog
        UNDERDOG_API_KEY: process.env.UNDERDOG_API_KEY,

        // Axiom
        AXIOM_TOKEN: process.env.AXIOM_TOKEN,
        AXIOM_DATASET: process.env.AXIOM_DATASET,
    },
});

export default env;
