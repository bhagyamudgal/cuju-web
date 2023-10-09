"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import Button from "../common/Button";
import PageContainer from "../common/PageContainer";
import donationSuccessImage from "@/public/images/donation-success.png";
import env from "@/src/env/index.mjs";

function DonationSuccessSection() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const nftMintAddress = searchParams.get("nftMintAddress");

    const amount = searchParams.get("amount");

    useEffect(() => {
        if (!nftMintAddress || !amount) {
            router.push("/");
        }
    }, [nftMintAddress, amount]); // eslint-disable-line

    return (
        <PageContainer className="flex min-h-[50vh] max-w-4xl flex-col items-center space-y-8 text-center">
            <h1 className="text-5xl italic">“HE&apos;S DONE IIITT!”</h1>

            <Image src={donationSuccessImage} alt="donation-success" />

            <p className="font-heading text-xl">
                You just donated {amount} SOL to DFA! The DFA team is extremely
                thankful for your generosity!
            </p>

            <p className="font-heading text-xl">
                As a token of appreciation, a special NFT has been sent to your
                wallet.
            </p>

            <p className="font-heading text-xl">
                We hope to see you keep supporting our superstars in the future!
                :)
            </p>

            <div className="flex items-center space-x-4">
                <Button
                    target="_blank"
                    link={`https://xray.helius.xyz/token/${nftMintAddress}${
                        env.NEXT_PUBLIC_SOLANA_NETWORK === "devnet" &&
                        "?network=devnet"
                    }`}
                >
                    VIEW MY NFT
                </Button>
                <Button link="/">HOME PAGE</Button>
            </div>
        </PageContainer>
    );
}

export default DonationSuccessSection;
