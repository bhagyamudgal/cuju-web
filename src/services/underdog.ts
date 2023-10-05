import axios from "axios";

import env from "../env/index.mjs";
import type {
    CreateUnderdogNftResponse,
    CreateUnderdogProjectResponse,
    GetAllUnderdogNftResponse,
    GetUnderdogProjectResponse,
    UpdateUnderdogNftResponse,
} from "../types/underdog";

const UNDERDOG_API_URL =
    env.NEXT_PUBLIC_SOLANA_NETWORK === "mainnet-beta"
        ? "https://mainnet.underdogprotocol.com/v2"
        : "https://devnet.underdogprotocol.com/v2";

const underdogApiInstance = axios.create({
    baseURL: UNDERDOG_API_URL,
    headers: {
        Authorization: `Bearer ${env.UNDERDOG_API_KEY}`,
    },
});

export const getUnderdogCompressedProject = async (projectId: number) => {
    const response = await underdogApiInstance.get(`/projects/${projectId}`);

    return response.data as GetUnderdogProjectResponse;
};

export const createUnderdogCompressedProject = async ({
    name,
    image,
}: {
    name: string;
    image: string;
}) => {
    const response = await underdogApiInstance.post("/projects", {
        name,
        image,
    });

    return response.data as CreateUnderdogProjectResponse;
};

export const createUnderdogCompressedNft = async (
    projectId: number,
    data: {
        name: string;
        symbol?: string;
        image: string;
        description?: string;
        attributes?: {
            [key: string]: string;
        };
        receiverAddress: string;
    }
) => {
    const response = await underdogApiInstance.post(
        `/projects/${projectId}/nfts`,
        data
    );

    return response.data as CreateUnderdogNftResponse;
};

export const updateUnderdogCompressedNft = async (
    nftId: number,
    projectId: number,
    data: {
        image?: string;
        description?: string;
        attributes?: {
            [key: string]: string;
        };
    }
) => {
    const response = await underdogApiInstance.patch(
        `/projects/${projectId}/nfts/${nftId}`,
        data
    );

    return response.data as UpdateUnderdogNftResponse;
};

export const getUnderdogCompressedNft = async (
    nftId: number,
    projectId: number
) => {
    const response = await underdogApiInstance.get(
        `/projects/${projectId}/nfts/${nftId}`
    );

    return response.data as GetUnderdogProjectResponse;
};

export const getAllUnderdogCompressedNfts = async (
    projectId: number,
    limit: number = 10
) => {
    const response = await underdogApiInstance.get(
        `/projects/${projectId}/nfts?limit=${limit}`
    );

    return response.data as GetAllUnderdogNftResponse;
};
