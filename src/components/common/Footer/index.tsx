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
                    <Image src={solanaLogo} alt="solana-logo" />
                    <p>Made possible on the Solana network.</p>
                    <p>
                        &copy; 2023 Dean&apos;s List DAO. All rights reserved.
                    </p>
                </div>

                <Link href="https://twitter.com/deanslistDAO">
                    <Image src={twitterIcon} alt="twitter-icon" />
                </Link>
            </PageContainer>
        </footer>
    );
}

export default Footer;
