import UserProfile from "../../auth/UserProfile";
import DonateButton from "../DonateButton";
import PageContainer from "../PageContainer";

function Header() {
    return (
        <header>
            <PageContainer className="flex justify-between">
                <h1 className="text-2xl">Cuju</h1>

                <div className="flex space-x-3">
                    <DonateButton />
                    <UserProfile />
                </div>
            </PageContainer>
        </header>
    );
}

export default Header;
