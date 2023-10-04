import type { ApiResponseType } from "@/src/types";
import type { DonationPaymentTransactionType } from "@/src/validators/donation";

import { apiInstance } from ".";

export const submitDonationTransaction = async (
    data: DonationPaymentTransactionType
) => {
    const response = await apiInstance.post("/donation", data);

    return response.data as ApiResponseType;
};
