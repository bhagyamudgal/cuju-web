"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
    showErrorToast,
    showInfoToast,
    showLoadingToast,
    showSuccessToast,
} from "../components/common/ToastNotification";
import { DONATION_ADDRESS } from "../constants";
import { submitDonationTransaction } from "../utils/api/donation";
import { logError } from "../utils/general";
import {
    confirmTransaction,
    createSystemInstruction,
    getSolanaConnection,
} from "../utils/solana";

function useDonation() {
    const router = useRouter();

    const { publicKey, sendTransaction } = useWallet();
    const [donationAmount, setDonationAmount] = useState<number>();
    const [isLoading, setIsLoading] = useState(false);

    const donationPaymentHandler = async () => {
        const toastId = "donation";

        setIsLoading(true);

        showLoadingToast({
            id: toastId,
            message: "Processing payment!",
        });

        try {
            if (!publicKey) {
                router.push("/auth");
                setIsLoading(false);
                showInfoToast({
                    id: toastId,
                    message: "Please signin to donate!",
                });
                return;
            }

            if (!donationAmount || donationAmount <= 0) {
                throw new Error("Please select an amount to donate!");
            }

            if (donationAmount < 0.1) {
                throw new Error("Minimum donation amount is 0.1 SOL!");
            }

            const transactionInstruction = await createSystemInstruction({
                amount: BigNumber(donationAmount),
                recipient: new PublicKey(DONATION_ADDRESS),
                sender: publicKey,
            });

            const transaction = new Transaction().add(transactionInstruction);

            const connection = getSolanaConnection();

            showLoadingToast({
                id: toastId,
                message: "Waiting for payment approval!",
            });

            const signature = await sendTransaction(transaction, connection);

            if (!signature) {
                throw new Error("Payment failed!");
            }

            showLoadingToast({
                id: toastId,
                message: "Confirming payment on blockchain!",
            });

            await confirmTransaction(signature, connection);

            const response = await submitDonationTransaction({
                amount: donationAmount,
                payeeWallet: publicKey.toString(),
                txSignature: signature,
            });

            if (!response.success) {
                throw new Error("Failed to submit donation transaction!");
            }

            showSuccessToast({
                id: toastId,
                message: "Payment successful. Thanks for supporting us!",
            });
        } catch (error) {
            logError("donationPaymentHandler =>", error);
            showErrorToast({
                id: toastId,
                message: "Something went wrong! Please try again later.",
            });
        }

        setIsLoading(false);
    };

    return {
        isLoading,
        donationAmount,
        setDonationAmount,
        donationPaymentHandler,
    };
}

export default useDonation;
