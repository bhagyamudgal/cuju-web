"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import base58 from "bs58";
import { ArrowLeftRight } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import type { HTMLProps } from "react";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

import UserProfile from "../UserProfile";
import useUserStore from "@/src/store/useUserStore";
import { cn, logError } from "@/src/utils/general";
import { shortenWalletAddress } from "@/src/utils/solana";
import { createSolanaSignInMessage } from "@/src/utils/web3auth";

type Props = HTMLProps<HTMLButtonElement>;

function AuthButton({ className }: Props) {
    const wallet = useWallet();
    const walletModal = useWalletModal();

    const { status } = useSession();

    const router = useRouter();

    const searchParams = useSearchParams();

    const redirectUrl = searchParams.get("redirect");

    const isConnectingWallet = useUserStore(
        (state) => state.isConnectingWallet
    );
    const isSigningIn = useUserStore((state) => state.isSigningIn);

    const buttonClasses = cn(
        "bg-gradient-1 py-2 flex cursor-pointer items-center justify-center space-x-2 rounded-full px-6 font-heading font-medium drop-shadow-lg hover:bg-primary disabled:cursor-not-allowed disabled:bg-gray-400",
        className
    );

    const setIsConnectingWallet = useUserStore(
        (state) => state.setIsConnectingWallet
    );
    const setIsSigningIn = useUserStore((state) => state.setIsSigningIn);

    useEffect(() => {
        if (status === "authenticated") {
            if (redirectUrl) {
                router.push(redirectUrl);
            } else {
                router.push("/");
            }
        }
    }, [status]); //eslint-disable-line

    useEffect(() => {
        if (wallet?.wallet?.adapter) {
            (async () => {
                setIsConnectingWallet(true);
                try {
                    await wallet?.connect();
                } catch (error) {
                    logError("Failed to connect wallet =>", error);
                }
                setIsConnectingWallet(false);
            })();
        }
    }, [wallet, setIsConnectingWallet]);

    const signInHandler = async () => {
        setIsSigningIn(true);
        try {
            const csrf = await getCsrfToken();

            if (!wallet.publicKey) {
                throw new Error("Wallet is not connected!");
            }

            if (!csrf) {
                throw new Error("CSRF token is not found!");
            }

            if (!wallet?.signMessage) {
                throw new Error("Wallet does not support signMessage!");
            }

            const message = createSolanaSignInMessage({
                domain: window.location.host,
                address: wallet.publicKey?.toString(),
                statement: "Sign this message to sign in to the app.",
                nonce: csrf,
                origin: window.location.origin,
            });

            const encodedMessage = new TextEncoder().encode(
                message?.prepareMessage()
            );
            const signature = await wallet.signMessage(encodedMessage);

            const serializedSignature = base58.encode(signature);

            await signIn("credentials", {
                message: JSON.stringify(message),
                redirect: false,
                signature: serializedSignature,
            });
        } catch (error) {
            logError({ message: "handlerSignIn =>", error });
        }
        setIsSigningIn(false);
    };

    if (status === "loading") {
        return (
            <button type="button" className={buttonClasses} disabled>
                <span className="flex items-center space-x-2">
                    <ClipLoader color="white" size={15} />
                    <span className="font-heading">Authenticating</span>
                </span>
            </button>
        );
    }

    if (status === "authenticated") {
        return (
            <div className="flex items-center space-x-3">
                <UserProfile />
            </div>
        );
    }

    if (wallet.connected && wallet.publicKey && status === "unauthenticated") {
        return (
            <div className="space-y-4 text-lg">
                <div className="space-y-1">
                    <p>Connected Wallet</p>
                    <p>{shortenWalletAddress(wallet.publicKey?.toString())}</p>
                </div>
                <div className="flex flex-wrap space-x-2">
                    <button
                        type="button"
                        className={buttonClasses}
                        onClick={signInHandler}
                        disabled={isSigningIn}
                    >
                        {isSigningIn ? (
                            <span className="flex items-center space-x-2">
                                <ClipLoader color="white" size={15} />
                                <span className="font-heading">Signing in</span>
                            </span>
                        ) : (
                            "Sign In"
                        )}
                    </button>

                    <button
                        type="button"
                        className={buttonClasses}
                        onClick={() => {
                            wallet.disconnect();
                        }}
                        disabled={isSigningIn}
                    >
                        <ArrowLeftRight />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <button
            type="button"
            className={buttonClasses}
            onClick={() => walletModal.setVisible(true)}
            disabled={isConnectingWallet}
        >
            {wallet.wallet?.adapter.icon && (
                <Image
                    className="rounded-full"
                    src={wallet.wallet?.adapter.icon}
                    alt="user-profile-pic"
                    width={30}
                    height={30}
                />
            )}

            <span className="font-heading">
                {isConnectingWallet ? (
                    <span className="flex items-center space-x-2">
                        <ClipLoader color="white" size={15} />
                        <span className="font-heading">Connecting</span>
                    </span>
                ) : (
                    "Connect Wallet"
                )}
            </span>
        </button>
    );
}

export default AuthButton;
