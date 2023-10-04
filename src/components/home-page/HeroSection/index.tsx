import Image from "next/image";

import PageContainer from "../../common/PageContainer";
import heroSectionImage1 from "@/public/images/hero-section-1.png";

function HeroSection() {
    return (
        <section className="py-6">
            <PageContainer className="relative flex justify-between">
                <div className="max-w-[450px] space-y-5">
                    <h1 className="text-6xl text-primary">
                        Shaping futures one kick at a time!
                    </h1>

                    <p className="text-2xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore eti posa{" "}
                    </p>
                    <p className="text-2xl">
                        Donate now and receive a unique NFT from the DFA team as
                        a special token of gratitude!
                    </p>

                    <button
                        type="button"
                        className="bg-gradient-1 mx-auto flex max-w-[400px] flex-col items-center space-y-4 rounded-[32px] p-8 text-4xl drop-shadow-2xl"
                    >
                        Donate Now
                    </button>
                </div>
                <div className="max-w-[450px] space-y-1">
                    <h2 className="font-body text-3xl italic text-primary">
                        “There is no pressure when you are making a dream come
                        true”
                    </h2>
                    <h2 className="text-3xl">Neymar Jr</h2>
                </div>
            </PageContainer>

            <Image
                src={heroSectionImage1}
                alt="hero-section-image-1"
                className="mx-auto mt-8 w-full"
            />
        </section>
    );
}

export default HeroSection;
