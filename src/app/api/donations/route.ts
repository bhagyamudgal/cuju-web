import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { ORGANIZATION_ID } from "@/src/constants";
import db from "@/src/db";
import { organizationsTable } from "@/src/db/schema/organizations";
import { convertSolToUsdc } from "@/src/services/jupiter";
import { logApi } from "@/src/services/logger";
import { handleApiRouteError, successHandler } from "@/src/utils/api";

export async function GET(req: NextRequest) {
    const logId = randomUUID();

    try {
        const [{ totalDonationsAmount, totalDonationsReceived }] = await db
            .select()
            .from(organizationsTable)
            .where(eq(organizationsTable.id, ORGANIZATION_ID));

        const totalDonationAmountInUsdc = await convertSolToUsdc(
            totalDonationsAmount ?? 0
        );

        return NextResponse.json(
            successHandler(
                {
                    totalDonationAmountInUsdc:
                        totalDonationAmountInUsdc.toFixed(2),
                    totalDonationsReceived,
                },
                "Donations data fetched successfully!"
            ),
            { status: 200 }
        );
    } catch (error) {
        logApi({
            logId,
            error,
            message: "Internal server error - Failed to get donations data!",
            req,
            statusCode: 500,
        });
        return handleApiRouteError(error);
    }
}

export async function OPTIONS() {
    try {
        return NextResponse.json(
            successHandler({ options: "GET" }, "Options fetched successfully!"),
            { status: 200 }
        );
    } catch (error) {
        return handleApiRouteError(error);
    }
}
