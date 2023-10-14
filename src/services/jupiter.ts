import axios from "axios";
import BigNumber from "bignumber.js";

import { logError } from "../utils/general";

export const convertSolToUsdc = async (amount: number) => {
    try {
        const { data } = await axios.get(
            "https://price.jup.ag/v4/price?ids=SOL"
        );

        const solPrice = data.data.SOL.price;

        return new BigNumber(solPrice).multipliedBy(amount).toNumber();
    } catch (error) {
        logError("convertSolToUsdc =>", error);
        return 0;
    }
};
