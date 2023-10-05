import type { NextRequest } from "next/server";
import { Logger } from "next-axiom";
import { LogLevel } from "next-axiom/dist/logger";

import type { SelectUser } from "../db/types";
import { log, logError } from "../utils/general";

const logger = new Logger({
    source: "cuju-api",
    logLevel: LogLevel.info,
});

export const logApi = (
    {
        logId,
        level = "info",
        error = null,
        body,
        message,
        user,
        req,
        statusCode = null,
    }: {
        logId: `${string}-${string}-${string}-${string}-${string}`;
        level?: "info" | "error" | "debug";
        error?: string | null | unknown;
        body?: object;
        message: string;
        user?: SelectUser | null;
        req?: NextRequest;
        statusCode?: 200 | 201 | 400 | 401 | 500 | null;
    },
    data?: object
) => {
    let reqData: object | null = null;

    if (req?.nextUrl) {
        const { host, hostname, origin, pathname } = req.nextUrl;

        reqData = {
            ip: req?.ip ?? "127.0.0.1",
            method: req?.method ?? null,
            url: req?.url ?? null,
            geo: req?.geo ?? null,
            "user-agent": req?.headers?.get("user-agent") ?? null,
            host,
            hostname,
            origin,
            pathname,
        };
    }

    const logData = {
        logId,
        user: user
            ? {
                  walletAddress: user?.walletAddress,
              }
            : null,
        request: reqData,
        error: error instanceof Error ? error.message : error,
        response: {
            statusCode,
        },
        body: [body ?? null],
        data: [data ?? null],
    };

    const logLevel = error ? "error" : level;

    const logMessage = `${logId} - ${message}`;

    if (error) {
        logError(logMessage, error);
    } else {
        log(logMessage, logData);
    }

    return logger[logLevel](logMessage, logData);
};

export default logger;
