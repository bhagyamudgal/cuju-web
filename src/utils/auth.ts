import type { SIWS } from "@web3auth/sign-in-with-solana";
// import { eq } from "drizzle-orm";
import { eq } from "drizzle-orm";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";

import db from "../db";
import { usersTable } from "../db/schema/users";
import env from "../env/index.mjs";

import { generateId, logError } from "./general";
import { verifySignature } from "./web3auth";

const authPage = "/dashboard";

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Solana",
            credentials: {
                message: {
                    label: "Message",
                    type: "text",
                },
                signature: {
                    label: "Signature",
                    type: "text",
                },
            },
            async authorize(credentials, authReq) {
                try {
                    if (!credentials?.message) {
                        throw new Error("credentials does not have message!");
                    }

                    if (!credentials?.signature) {
                        throw new Error("credentials does not have signature!");
                    }

                    if (!env.NEXTAUTH_URL) {
                        throw new Error("FRONTEND_URL env not defined!");
                    }

                    const solanaSignInMessage: SIWS = JSON.parse(
                        credentials.message
                    );

                    const frontendUrl = new URL(env.NEXTAUTH_URL);

                    if (
                        solanaSignInMessage.payload.domain !== frontendUrl.host
                    ) {
                        throw new Error("domain does not match!");
                    }

                    const csrfToken = await getCsrfToken({
                        req: { ...authReq, body: null },
                    });

                    if (solanaSignInMessage.payload.nonce !== csrfToken) {
                        throw new Error("nonce does not match!");
                    }

                    const validationResult = await verifySignature({
                        message: solanaSignInMessage,
                        signature: credentials.signature,
                    });

                    if (!validationResult) {
                        throw new Error(
                            "could not validate the signed message!"
                        );
                    }

                    return {
                        id: solanaSignInMessage.payload.address,
                    };
                } catch (error) {
                    logError("Error authorizing credentials", error);
                    return null;
                }
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    secret: env.NEXTAUTH_SECRET,

    callbacks: {
        async session({ session, token }) {
            const walletAddress = token.sub;

            const [userData] = await db
                .select()
                .from(usersTable)
                .where(eq(usersTable.walletAddress, walletAddress))
                .limit(1);

            if (!userData) {
                const userId = generateId();

                const { insertId } = await db
                    .insert(usersTable)
                    .values({ id: userId, walletAddress });

                if (insertId) {
                    const [user] = await db
                        .select()
                        .from(usersTable)
                        .where(eq(usersTable.id, userId))
                        .limit(1);

                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    // eslint-disable-next-line no-param-reassign
                    session.user = user;
                } else {
                    throw new Error("Failed to create user!");
                }
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line no-param-reassign
                session.user = userData;
            }

            return session;
        },
    },

    pages: {
        signIn: authPage,
        signOut: authPage,
        error: authPage,
        newUser: authPage,
        verifyRequest: authPage,
    },
};

export default authOptions;
