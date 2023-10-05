import AuthButton from "@/src/components/auth/AuthButton";
import PageContainer from "@/src/components/common/PageContainer";

function Auth() {
    return (
        <main>
            <PageContainer className="flex min-h-[50vh] flex-col items-center space-y-8 text-center">
                <h1 className="text-6xl">Sign in</h1>
                <AuthButton />
            </PageContainer>
        </main>
    );
}

export default Auth;
