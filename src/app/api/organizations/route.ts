import { randomUUID } from "crypto";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import db from "@/src/db";
import { organizationsTable } from "@/src/db/schema/organizations";
import type { InsertOrganization } from "@/src/db/types";
import getAuthorizedUser from "@/src/middlewares/getAuthorizedUser";
import { logApi } from "@/src/services/logger";
import {
    handleApiAuthError,
    handleApiClientError,
    handleApiRouteError,
    successHandler,
} from "@/src/utils/api";
import { generateId } from "@/src/utils/general";
import { createOrganizationSchema } from "@/src/validators/organization";

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
            message: "Validating create organization body!",
            req,
        });

        const bodyValidationResult = createOrganizationSchema.safeParse(body);

        if (!bodyValidationResult.success) {
            logApi({
                logId,
                body,
                user,
                error: bodyValidationResult.error.message,
                message: "Create organization body validation failed!",
                req,
                statusCode: 400,
            });
            return handleApiClientError();
        }

        const { name, walletAddress } = bodyValidationResult.data;

        logApi(
            {
                logId,
                body,
                user,
                message: "Creating underdog project for the organization!",
                req,
            },
            { name, walletAddress }
        );

        const organizationId = generateId();

        const organizationData: InsertOrganization = {
            id: organizationId,
            image: "https://i.imgur.com/ANfFJVP.png",
            walletAddress,
            name,
        };

        logApi(
            {
                logId,
                body,
                user,
                message: "Creating organization in db!",
                req,
            },
            organizationData
        );

        await db.insert(organizationsTable).values(organizationData);

        logApi(
            {
                logId,
                body,
                user,
                message: "Organization created successfully in db!",
                req,
                statusCode: 201,
            },
            organizationData
        );

        return NextResponse.json(
            successHandler(
                organizationData,
                "Organization created successfully!"
            ),
            { status: 201 }
        );
    } catch (error) {
        logApi({
            logId,
            error,
            message: "Internal server error - Failed to create organization!",
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
