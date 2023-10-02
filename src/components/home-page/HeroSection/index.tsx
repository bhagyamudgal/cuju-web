import Image from "next/image";

import PageContainer from "../../common/PageContainer";
import heroSectionImage from "@/public/images/hero-section-1.png";

function HeroSection() {
    return (
        <section className="py-6">
            <PageContainer className="relative flex justify-between">
                <div className="max-w-[450px] space-y-4">
                    <h1 className="text-6xl text-primary">
                        Shaping futures one kick at a time!
                    </h1>

                    <p className="text-2xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore eti posa{" "}
                    </p>
                </div>
                <div className="max-w-[450px] space-y-1">
                    <h2 className="font-body text-3xl italic text-primary">
                        “There is no pressure when you are making a dream come
                        true”
                    </h2>
                    <h2 className="text-3xl">Neymar Jr</h2>
                </div>
                <div className="absolute -bottom-32 left-0 w-full">
                    <button
                        type="button"
                        className="bg-gradient-1 mx-auto flex max-w-[400px] flex-col items-center space-y-4 rounded-br-[60px] rounded-tl-[60px] p-8 drop-shadow-2xl"
                    >
                        <h3 className="text-4xl">Donate Now</h3>

                        <p className="text-xl">
                            And receive a unique NFT from the DFA team as a
                            special token of gratitute!
                        </p>
                    </button>
                </div>
            </PageContainer>

            <Image
                src={heroSectionImage}
                alt="hero-section-image"
                className="mx-auto mt-8 w-full"
            />
        </section>
    );
}

export default HeroSection;
