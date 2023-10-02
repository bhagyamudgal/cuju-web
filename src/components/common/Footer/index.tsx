import Image from "next/image";
import Link from "next/link";

import PageContainer from "../PageContainer";
import twitterIcon from "@/public/icons/twitter.svg";
import solanaLogo from "@/public/images/solana-logo.svg";

function Footer() {
    return (
        <footer>
            <PageContainer className="flex items-end justify-between">
                <div className="space-y-1">
                    <Link
                        href="https://solana.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image src={solanaLogo} alt="solana-logo" />
                    </Link>
                    <p>Made possible on the Solana network.</p>
                    <p>
                        &copy; 2023 Dean&apos;s List DAO. All rights reserved.
                    </p>
                </div>

                <Link
                    href="https://twitter.com/deanslistDAO"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image src={twitterIcon} alt="twitter-icon" />
                </Link>
            </PageContainer>
        </footer>
    );
}

export default Footer;
