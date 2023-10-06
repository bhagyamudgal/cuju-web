import BigNumber from "bignumber.js";
import { randomUUID } from "crypto";
import format from "date-fns/format";
import { eq, sql } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
    DONATION_ADDRESS,
    ORGANIZATION_ID,
    UNDERDOG_NFT_PROJECT_ID,
} from "@/src/constants";
import db from "@/src/db";
import { donationsTable } from "@/src/db/schema/donations";
import { usersTable } from "@/src/db/schema/users";
import type { InsertDonation } from "@/src/db/types";
import getAuthorizedUser from "@/src/middlewares/getAuthorizedUser";
import { logApi } from "@/src/services/logger";
import {
    createUnderdogCompressedNft,
    getUnderdogCompressedNft,
    updateUnderdogCompressedNft,
} from "@/src/services/underdog";
import {
    handleApiAuthError,
    handleApiClientError,
    handleApiRouteError,
    successHandler,
} from "@/src/utils/api";
import { generateId } from "@/src/utils/general";
import { getSolanaConnection } from "@/src/utils/solana";
import { donationPaymentTransactionSchema } from "@/src/validators/donation";

// eslint-disable-next-line sonarjs/cognitive-complexity
export async function POST(req: NextRequest) {
    const logId = randomUUID();
    const user = await getAuthorizedUser();

    try {
        if (!user) {
            return handleApiAuthError();
        }

        const body = await req.json();

        logApi({
            logId,
            body,
            user,
            message: "Validating donation payment transaction body!",
            req,
        });

        const bodyValidationResult =
            donationPaymentTransactionSchema.safeParse(body);

        if (!bodyValidationResult.success) {
            logApi({
                logId,
                body,
                user,
                error: bodyValidationResult.error.message,
                message: "Donation payment transaction body validation failed!",
                req,
                statusCode: 400,
            });
            return handleApiClientError();
        }

        const { amount, txSignature, payeeWallet } = bodyValidationResult.data;

        const connection = getSolanaConnection();

        logApi(
            {
                logId,
                body,
                user,
                message: "Getting parsed transaction from solana rpc!",
                req,
            },
            { txSignature }
        );

        const transactionResponse =
            await connection.getParsedTransaction(txSignature);

        if (!transactionResponse) {
            throw new Error("Error fetching transaction details!");
        }

        const isError = transactionResponse.meta?.err;

        if (isError) {
            throw new Error("Transaction failed to succeed!");
        }

        let isRightRecipient = false;
        let isRightPayee = false;

        transactionResponse.transaction.message.accountKeys.forEach(
            (account) => {
                if (
                    account.pubkey.toString() === DONATION_ADDRESS &&
                    account.source === "transaction" &&
                    !account.signer
                ) {
                    isRightRecipient = true;
                }
                if (
                    account.signer &&
                    account.pubkey.toString() === user.walletAddress
                ) {
                    isRightPayee = true;
                }
            }
        );

        if (!isRightRecipient) {
            throw new Error("Transaction recipient is not valid!");
        }

        if (!isRightPayee) {
            throw new Error(
                "Transaction payee and user wallet address does not match!"
            );
        }

        const donationId = generateId();

        const donationPaymentData: InsertDonation = {
            id: donationId,
            donatorWalletAddress: payeeWallet,
            amount,
            organizationId: ORGANIZATION_ID,
            receiverWalletAddress: DONATION_ADDRESS,
            txSignature,
            currency: "SOL",
        };

        logApi(
            {
                logId,
                body,
                user,
                message: "Saving donation payment transaction in db!",
                req,
            },
            donationPaymentData
        );

        await db.insert(donationsTable).values(donationPaymentData);

        logApi(
            {
                logId,
                body,
                user,
                message:
                    "Donation payment transaction saved in db successfully!",
                req,
                statusCode: 201,
            },
            donationPaymentData
        );

        logApi({
            logId,
            body,
            user,
            message: "Checking if user have donation nft!",
            req,
        });

        let nftMintAddress: string | null = null;

        try {
            if (user.nftId) {
                logApi(
                    {
                        logId,
                        body,
                        user,
                        message: "Updating user nft donation!",
                        req,
                    },
                    { nftId: user.nftId }
                );

                const getNftResponse = await getUnderdogCompressedNft(
                    user.nftId,
                    UNDERDOG_NFT_PROJECT_ID
                );

                const { attributes } = getNftResponse;

                const oldDonations = new BigNumber(
                    attributes?.totalDonations ?? 0
                );

                const newTotalDonations = oldDonations.plus(amount);

                const nftUpdateDate = format(new Date(), "dd MMM yyyy");

                const updateNftResponse = await updateUnderdogCompressedNft(
                    user.nftId,
                    UNDERDOG_NFT_PROJECT_ID,
                    {
                        attributes: {
                            ...attributes,
                            totalDonations: newTotalDonations.toString(),
                            nftUpdateDate,
                        },
                    }
                );

                nftMintAddress = updateNftResponse.mintAddress;

                await db
                    .update(usersTable)
                    .set({
                        nftMintAddress,
                        totalAmountDonated: newTotalDonations.toNumber(),
                    })
                    .where(eq(usersTable.id, user.id));

                logApi(
                    {
                        logId,
                        body,
                        user,
                        message: "Updated user donation nft!",
                        req,
                    },
                    {
                        updateNftResponse,
                        oldDonations: oldDonations.toString(),
                        newTotalDonations: newTotalDonations.toString(),
                    }
                );
            } else {
                logApi(
                    {
                        logId,
                        body,
                        user,
                        message: "Creating user nft donation!",
                        req,
                    },
                    { nftId: null }
                );

                const [{ count }] = await db
                    .select({ count: sql<string>`count(*)` })
                    .from(usersTable);

                const totalDonations = amount;

                const nftIssueDate = format(new Date(), "dd MMM yyyy");

                const createNftResponse = await createUnderdogCompressedNft(
                    UNDERDOG_NFT_PROJECT_ID,
                    {
                        name: `Cuju Donation NFT ${
                            count === "1" ? count : parseInt(count, 10) + 1
                        }`,
                        description: `NFT rewarded for donating on Cuju!`,
                        image: "https://i.imgur.com/ANfFJVP.png",
                        attributes: {
                            totalDonations: totalDonations.toString(),
                            nftIssueDate,
                        },
                        receiverAddress: user.walletAddress,
                    }
                );

                const { nftId } = createNftResponse;

                const getCreatedNftResponse = await getUnderdogCompressedNft(
                    nftId,
                    UNDERDOG_NFT_PROJECT_ID
                );

                nftMintAddress = getCreatedNftResponse.mintAddress;

                await db
                    .update(usersTable)
                    .set({
                        nftId,
                        nftMintAddress,
                        totalAmountDonated: totalDonations,
                    })
                    .where(eq(usersTable.id, user.id));

                logApi(
                    {
                        logId,
                        body,
                        user,
                        message: "Successfully created user donation nft!",
                        req,
                    },
                    createNftResponse
                );
            }
        } catch (error) {
            logApi({
                logId,
                error,
                user,
                message: "Failed to create or update user donation nft!",
                req,
            });
        }

        return NextResponse.json(
            successHandler(
                { ...donationPaymentData, nftMintAddress },
                "Donation payment transaction saved successfully!"
            ),
            { status: 201 }
        );
    } catch (error) {
        logApi({
            logId,
            error,
            user,
            message:
                "Internal server error - Failed to save donation payment transaction!",
            req,
            statusCode: 500,
        });
        return handleApiRouteError(error);
    }
}

export async function OPTIONS() {
    try {
        return NextResponse.json(
            successHandler(
                { options: "POST" },
                "Options fetched successfully!"
            ),
            { status: 200 }
        );
    } catch (error) {
        return handleApiRouteError(error);
    }
}
