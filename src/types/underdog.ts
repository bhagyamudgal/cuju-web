export type GetUnderdogProjectResponse = {
    id: number;
    mintAddress: string;
    transferable: boolean;
    semifungible: boolean;
    isPublic: boolean;
    compressed: boolean;
    status: string;
    name: string;
    symbol?: string;
    description?: string;
    image: string;
    animationUrl?: string;
    externalUrl?: string;
    attributes?: {
        [key: string]: string;
    };
};

export type CreateUnderdogProjectResponse = {
    transactionId: string;
    projectId: number;
    transferable: boolean;
    compressed: boolean;
    mintAddress: string;
};

export type CreateUnderdogNftResponse = {
    transactionId: string;
    nftId: number;
    projectId: number;
    transferable: boolean;
    compressed: boolean;
    mintAddress: string;
};

export type UnderdogNft = {
    name: string;
    symbol?: string;
    description?: string;
    image: string;
    animationUrl?: string;
    externalUrl?: string;
    attributes?: {
        [key: string]: string;
    };
    id: number;
    projectId: number;
    transferable: boolean;
    compressed: boolean;
    mintAddress: string;
    ownerAddress: string;
    claimerAddress: string;
    status: string;
};

export type UpdateUnderdogNftResponse = UnderdogNft;
export type GetUnderdogNftResponse = UnderdogNft;
export type GetAllUnderdogNftResponse = {
    results: UnderdogNft[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
};
