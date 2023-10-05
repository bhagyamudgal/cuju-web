import { CreateTransferError } from "@solana/pay";
import {
    createTransferCheckedInstruction,
    getAccount,
    getAssociatedTokenAddress,
    getMint,
} from "@solana/spl-token";
import {
    clusterApiUrl,
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
} from "@solana/web3.js";
import type { TransactionInstruction } from "@solana/web3.js";
import BigNumber from "bignumber.js";

import env from "@/src/env/index.mjs";

export const getSolanaConnectionUrl = () => {
    if (env.NEXT_PUBLIC_SOLANA_NETWORK === "mainnet-beta") {
        return (
            env.NEXT_PUBLIC_SOLANA_MAINNET_RPC_URL ||
            clusterApiUrl("mainnet-beta")
        );
    }

    return env.NEXT_PUBLIC_SOLANA_DEVNET_RPC_URL || clusterApiUrl("devnet");
};

export const getSolanaConnection = () => {
    const connectionUrl = getSolanaConnectionUrl();

    return new Connection(connectionUrl, "confirmed");
};

export const shortenWalletAddress = (address: string) => {
    if (address) {
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    }

    return null;
};

export const validateSolAddress = (address: string) => {
    try {
        return new PublicKey(address);
    } catch (error) {
        return false;
    }
};

export const confirmTransaction = async (
    txSignature: string,
    connection: Connection
) => {
    const latestBlockHash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: txSignature,
    });
};

export async function createSPLTokenInstruction(
    recipient: PublicKey,
    amount: BigNumber,
    splToken: PublicKey,
    sender: PublicKey,
    connection: Connection
): Promise<TransactionInstruction> {
    // Check that the token provided is an initialized mint
    const mint = await getMint(connection, splToken);
    if (!mint.isInitialized)
        throw new CreateTransferError("mint not initialized");

    // Check that the amount provided doesn't have greater precision than the mint
    if ((amount.decimalPlaces() ?? 0) > mint.decimals)
        throw new CreateTransferError("amount decimals invalid");

    // Convert input decimal amount to integer tokens according to the mint decimals
    // eslint-disable-next-line no-param-reassign
    amount = amount
        .times(new BigNumber(10).pow(mint.decimals))
        .integerValue(BigNumber.ROUND_FLOOR);

    // Get the sender's ATA and check that the account exists and can send tokens
    const senderATA = await getAssociatedTokenAddress(splToken, sender);
    const senderAccount = await getAccount(connection, senderATA);
    if (!senderAccount.isInitialized)
        throw new CreateTransferError("sender not initialized");
    if (senderAccount.isFrozen) throw new CreateTransferError("sender frozen");

    // Get the recipient's ATA and check that the account exists and can receive tokens
    const recipientATA = await getAssociatedTokenAddress(splToken, recipient);
    const recipientAccount = await getAccount(connection, recipientATA);
    if (!recipientAccount.isInitialized)
        throw new CreateTransferError("recipient not initialized");
    if (recipientAccount.isFrozen)
        throw new CreateTransferError("recipient frozen");

    // Check that the sender has enough tokens
    const tokens = BigInt(String(amount));
    if (tokens > senderAccount.amount)
        throw new CreateTransferError("insufficient funds");

    // Create an instruction to transfer SPL tokens, asserting the mint and decimals match
    return createTransferCheckedInstruction(
        senderATA,
        splToken,
        recipientATA,
        sender,
        tokens,
        mint.decimals
    );
}

export async function createSystemInstruction({
    recipient,
    amount,
    sender,
}: {
    recipient: PublicKey;
    amount: BigNumber;
    sender: PublicKey;
}) {
    if ((amount.decimalPlaces() ?? 0) > 9)
        throw new CreateTransferError("amount decimals invalid");

    // Convert input decimal amount to integer lamports
    const solAmount = amount
        .times(LAMPORTS_PER_SOL)
        .integerValue(BigNumber.ROUND_FLOOR);

    // Check that the sender has enough lamports
    const lamports = solAmount.toNumber();

    // Create an instruction to transfer native SOL
    return SystemProgram.transfer({
        fromPubkey: sender,
        toPubkey: recipient,
        lamports,
    });
}
