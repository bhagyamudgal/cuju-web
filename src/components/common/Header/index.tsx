import Image from "next/image";
import Link from "next/link";

import UserProfile from "../../auth/UserProfile";
import DonateButton from "../DonateButton";
import PageContainer from "../PageContainer";
import logoImage from "@/public/images/cuju-logo.png";

function Header() {
    return (
        <header className="py-6">
            <PageContainer className="flex justify-between">
                <Link href="/">
                    <Image src={logoImage} alt="cuju-logo" width={50} />
                </Link>

                <div className="flex flex-col items-center space-x-3 space-y-2 xs:flex-row xs:space-y-0">
                    <DonateButton />
                    <UserProfile />
                </div>
            </PageContainer>
        </header>
    );
}

export default Header;
