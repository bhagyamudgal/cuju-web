import { z } from "zod";

export const donationPaymentTransactionSchema = z.object({
    amount: z
        .number()
        .positive()
        .min(0.1, { message: "Minimum donation amount is 0.1 SOL!" }),
    txSignature: z
        .string()
        .nonempty({ message: "Transaction signature is required!" }),
    payeeWallet: z.string().nonempty({ message: "Payee wallet is required!" }),
});

export type DonationPaymentTransactionType = z.infer<
    typeof donationPaymentTransactionSchema
>;
