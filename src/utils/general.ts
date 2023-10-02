import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ulid } from "ulid";

import {
    showErrorToast,
    showSuccessToast,
} from "@/src/components/common/ToastNotification";

export const isBase64 = (value: string) => {
    try {
        const buffer = Buffer.from(value, "base64");

        return buffer.toString("base64") === value;
    } catch (error) {
        return false;
    }
};

export const log = (
    message: string,
    data?: string | object | number | undefined | null
) => {
    if (data) {
        // eslint-disable-next-line no-console
        return console.log(message, data);
    }

    // eslint-disable-next-line no-console
    return console.log(message);
};

export const logError = (
    message: string | number | object,
    error?: unknown,
    logFullError = false
) => {
    const errorMessage = error instanceof Error ? error?.message : error;

    // eslint-disable-next-line no-console
    return console.error(message, logFullError ? error : errorMessage);
};

export const sleep = (ms: number) => {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const copyToClipboard = async (text: string, message?: string) => {
    try {
        await navigator.clipboard.writeText(text);
        showSuccessToast({
            id: "copy-to-clipboard",
            message: message || "Copied to clipboard!",
        });
    } catch (error) {
        logError("copyToClipboard =>", error);
        showErrorToast({
            id: "copy-to-clipboard",
            message: "Failed to copy!",
        });
    }
};

export const capitalizeFirstLetter = (str: string): string => {
    try {
        return str.slice(0, 1).toUpperCase() + str.slice(1);
    } catch (error) {
        logError("capitalizeFirstLetter =>", error);
        return str;
    }
};

export const generateId = () => {
    return ulid().toLowerCase();
};
