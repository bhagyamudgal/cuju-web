import Image from "next/image";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";

import PageContainer from "../PageContainer";
import twitterIcon from "@/public/icons/twitter.svg";
import solanaLogo from "@/public/images/solana-logo.svg";

function Footer() {
    return (
        <footer>
            <PageContainer className="flex items-end justify-between">
                <div className="space-y-2">
                    <Link
                        href="https://solana.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image src={solanaLogo} alt="solana-logo" />
                    </Link>
                    <p>Made possible on the Solana network.</p>
                    <p>&copy; Cuju 2023. All rights reserved.</p>
                </div>

                <div className="flex items-center space-x-4">
                    <Link
                        href="https://github.com/bhagyamudgal/cuju-web"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-6xl"
                    >
                        <AiFillGithub />
                    </Link>
                    <Link
                        href="https://twitter.com/cujuofficial"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image src={twitterIcon} alt="twitter-icon" />
                    </Link>
                </div>
            </PageContainer>
        </footer>
    );
}

export default Footer;
