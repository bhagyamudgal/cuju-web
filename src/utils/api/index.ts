import axios from "axios";
import { NextResponse } from "next/server";

import env from "@/src/env/index.mjs";
import type { ApiResponseType } from "@/src/types";

export const apiInstance = axios.create({
    baseURL: env.NEXT_PUBLIC_API_URL,
});

export const apiResponse = ({ success, message, result }: ApiResponseType) => {
    return {
        success,
        message,
        result,
    };
};

export const errorHandler = (error: unknown) => {
    const errorMessage =
        error instanceof Error ? error?.message : "Something went wrong!";

    return apiResponse({
        success: false,
        message: errorMessage,
        result: null,
    });
};

export const successHandler = (
    result: ApiResponseType["result"],
    message: string
) => {
    return apiResponse({
        success: true,
        message,
        result,
    });
};

export const handleInvalidRoute = () => {
    return NextResponse.json(errorHandler("Route not found!"), { status: 404 });
};

export const handleApiRouteError = (error: unknown) => {
    return NextResponse.json(errorHandler(error), { status: 500 });
};

export const handleApiAuthError = () => {
    const error = new Error("Unauthorized Access!");
    return NextResponse.json(errorHandler(error), { status: 401 });
};

export const handleApiRatelimitError = () => {
    const error = new Error("Too Many Requests!");
    return NextResponse.json(errorHandler(error), { status: 429 });
};

export const handleApiClientError = (message?: string, notFound?: boolean) => {
    if (notFound) {
        const error = new Error(message || "Not Found!");
        return NextResponse.json(errorHandler(error), { status: 404 });
    }

    const error = new Error(message || "Wrong Parameters Provided!");
    return NextResponse.json(errorHandler(error), { status: 400 });
};
