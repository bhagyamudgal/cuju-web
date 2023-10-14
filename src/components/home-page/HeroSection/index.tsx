import Image from "next/image";
import Link from "next/link";

import DonateButton from "../../common/DonateButton";
import PageContainer from "../../common/PageContainer";
import HeroImage from "../HeroImage";
import dfaLogo from "@/public/images/dfa-logo.png";
import heroSectionImage1 from "@/public/images/hero-section-1.png";

function HeroSection() {
    return (
        <section className="py-6">
            <PageContainer className="relative flex flex-col justify-between space-y-6 sm:flex-row sm:space-y-0">
                <div className="max-w-[450px] space-y-5">
                    <h1 className="text-6xl text-primary">
                        Shaping futures one kick at a time!
                    </h1>

                    <p className="text-2xl">
                        Cuju is proud to partner with the Decentralized Football
                        Academy (DFA) in Lagos, Nigeria to help channelize
                        funding to their charitable football academy. You may
                        read more about them{" "}
                        <Link
                            className="underline hover:text-primary"
                            href="https://medium.com/@dfacademy/decentralized-football-academy-dfa-a-nigerian-charitable-football-soccer-academy-8b2c8e4beedb"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            here
                        </Link>
                    </p>
                    <p className="text-2xl">
                        Donate now and receive a unique NFT from the DFA team as
                        a special token of gratitude!
                    </p>

                    <DonateButton className="bg-gradient-1 mx-auto flex max-w-[400px] flex-col items-center space-y-4 rounded-[32px] p-8 text-4xl drop-shadow-2xl" />
                </div>
                <div className="max-w-[450px] space-y-1">
                    <h2 className="font-body text-2xl italic text-primary sm:text-3xl">
                        “There is no pressure when you are making a dream come
                        true”
                    </h2>
                    <h2 className="text-3xl">Neymar Jr</h2>

                    <Image src={dfaLogo} alt="dfa-logo" />
                </div>

                <HeroImage />
            </PageContainer>

            <Image
                src={heroSectionImage1}
                alt="hero-section-image-1"
                className="mx-auto mt-12 w-full"
            />
        </section>
    );
}

export default HeroSection;
