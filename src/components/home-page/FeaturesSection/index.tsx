import Image from "next/image";

import PageContainer from "../../common/PageContainer";
import featureImage1 from "@/public/images/feature-1.svg";
import featureImage2 from "@/public/images/feature-2.svg";
import featureImage3 from "@/public/images/feature-3.svg";

const FEATURES = [
    {
        name: "Donations Received",
        value: 428,
        image: featureImage1,
    },
    {
        name: "Careers Started",
        value: 84,
        image: featureImage2,
    },
    {
        name: "Amount Gathered",
        value: "$24800",
        image: featureImage3,
    },
];

function FeaturesSection() {
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
