import Image from "next/image";
import Link from "next/link";

import UserProfile from "../../auth/UserProfile";
import DonateButton from "../DonateButton";
import PageContainer from "../PageContainer";
import logoImage from "@/public/images/cuju-logo.png";

function Header() {
    return (
        <header>
            <PageContainer className="flex justify-between">
                <Link href="/">
                    <Image src={logoImage} alt="cuju-logo" width={50} />
                </Link>

                <div className="flex items-center space-x-3">
                    <DonateButton />
                    <UserProfile />
                </div>
            </PageContainer>
        </header>
    );
}

export default Header;
