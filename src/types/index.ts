import type { UseFormRegister } from "react-hook-form";

export type AppEnvironment = "production" | "development";

export type SolanaNetwork = "mainnet-beta" | "devnet";

export type ApiResponseType = {
    success: boolean;
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result: any;
};

export type Register = UseFormRegister<Record<string, unknown>>;

export interface Option {
    value: string;
    label: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon?: any;
    logo_url?: string;
}
