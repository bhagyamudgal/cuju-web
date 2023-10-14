import Image from "next/image";

import PageContainer from "../../common/PageContainer";
import featureImage1 from "@/public/images/feature-1.svg";
import featureImage2 from "@/public/images/feature-2.svg";
import featureImage3 from "@/public/images/feature-3.svg";
import type { ApiResponseType } from "@/src/types";
import { apiInstance } from "@/src/utils/api";
import { logError } from "@/src/utils/general";

const FEATURES = [
    {
        id: 1,
        name: "Donations Received",
        value: "Loading...",
        image: featureImage1,
    },
    {
        id: 2,
        name: "Careers Started",
        value: "0",
        image: featureImage2,
    },
    {
        id: 3,
        name: "Amount Gathered",
        value: "Loading...",
        image: featureImage3,
    },
];

export const revalidate = 0;

async function FeaturesSection() {
    try {
        const response = await apiInstance.get("/donations");

        const result = response.data as ApiResponseType;

        if (!result?.success) {
            throw new Error(result?.message);
        }

        const { totalDonationAmountInUsdc, totalDonationsReceived } =
            result.result;

        FEATURES[0].value = totalDonationsReceived;
        FEATURES[2].value = `$${totalDonationAmountInUsdc}`;
    } catch (error) {
        logError("FeaturesSection", error);
    }

    return (
        <section className="py-6">
            <PageContainer className="flex flex-wrap justify-center">
                {FEATURES.map((feature) => {
                    return (
                        <div
                            key={feature.name}
                            className="bg-gradient-1 m-4 flex w-full max-w-[400px] items-center space-x-4 rounded-[48px] p-8"
                        >
                            <Image src={feature.image} alt={feature.name} />
                            <div className="space-y-3">
                                <h4 className="text-xl">{feature.name}</h4>
                                <p className="text-3xl font-bold sm:text-4xl md:text-6xl">
                                    {feature.value}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </PageContainer>
        </section>
    );
}

export default FeaturesSection;
