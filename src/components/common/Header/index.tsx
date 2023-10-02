import Button from "../Button";
import PageContainer from "../PageContainer";

function Header() {
    return (
        <header>
            <PageContainer className="flex justify-between">
                <h1 className="text-2xl">Cuju</h1>
                <Button>DONATE NOW</Button>
            </PageContainer>
        </header>
    );
}

export default Header;
