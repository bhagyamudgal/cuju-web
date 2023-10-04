"use client";

import { ChevronDown, ChevronUp, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Button from "../../common/Button";
import useUserStore from "@/src/store/useUserStore";
import { cn } from "@/src/utils/general";
import { shortenWalletAddress } from "@/src/utils/solana";

function UserProfile() {
    const { status, data } = useSession();

    const router = useRouter();

    const pathname = usePathname();

    const userData = data?.user;

    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const setIsSigningOut = useUserStore((state) => state.setIsSigningOut);

    useEffect(() => {
        setIsProfileMenuOpen(false);
    }, [pathname]);

    const signOutHandler = async () => {
        setIsSigningOut(true);
        await signOut({
            redirect: false,
        });
        router.refresh();
        setIsSigningOut(false);
    };

    if (!userData || status === "unauthenticated") {
        return <Button link="/auth?redirect=/">Sign In</Button>;
    }

    return (
        <div className="relative">
            <div
                className={cn(
                    "flex items-center space-x-2 rounded-full bg-gray-300 px-6 py-2",
                    isProfileMenuOpen && "border border-primary"
                )}
            >
                <p>{shortenWalletAddress(userData?.walletAddress)}</p>

                <button
                    type="button"
                    className="hover:text-primary"
                    onClick={() =>
                        setIsProfileMenuOpen((prevState) => !prevState)
                    }
                >
                    {isProfileMenuOpen ? <ChevronUp /> : <ChevronDown />}
                </button>
            </div>

            {isProfileMenuOpen && (
                <div className="absolute my-1 w-full rounded-xl border border-primary bg-gray-300 px-6 py-3">
                    <button
                        type="button"
                        className="flex space-x-2 font-body hover:text-primary"
                        onClick={signOutHandler}
                    >
                        <LogOut /> <span>Sign Out</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default UserProfile;
