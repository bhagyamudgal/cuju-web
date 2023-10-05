import { z } from "zod";

import { isBase64 } from "../utils/general";
import { validateSolAddress } from "../utils/solana";

export const createOrganizationSchema = z.object({
    name: z.string().nonempty({ message: "Organization name is required!" }),
    walletAddress: z
        .string()
        .nonempty({ message: "Organization wallet address is required!" })
        .refine((value) => validateSolAddress(value), {
            message: "Invalid wallet address!",
        }),
    image: z
        .string()
        .nonempty({ message: "Organization image is required!" })
        .refine((value) => isBase64(value), {
            message: "Invalid image base64!",
        }),
});

export type CreateOrganizationSchemaType = z.infer<
    typeof createOrganizationSchema
>;
