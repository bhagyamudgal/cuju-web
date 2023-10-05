"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import type { HTMLProps } from "react";

import DonationDialog from "../DonationDialog";
import useDisclosure from "@/src/hooks/useDisclosure";
import { cn, logError } from "@/src/utils/general";

type Props = HTMLProps<HTMLButtonElement>;

function DonateButton({ className }: Props) {
    const router = useRouter();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { status } = useSession();

    const donateButtonHandler = () => {
        try {
            if (status === "unauthenticated") {
                router.push("/auth?redirect=/");
            } else {
                onOpen();
            }
        } catch (error) {
            logError("donateButtonHandler =>", error);
        }
    };
    return (
        <>
            <button
                type="button"
                className={
                    className ??
                    cn(
                        "bg-gradient-1 flex cursor-pointer items-center justify-center space-x-2 rounded-full px-6 py-2 font-heading font-medium drop-shadow-lg hover:bg-primary disabled:cursor-not-allowed disabled:bg-gray-400",
                        className
                    )
                }
                onClick={donateButtonHandler}
            >
                Donate Now
            </button>

            <DonationDialog isOpen={isOpen} onClose={onClose} />
        </>
    );
}

export default DonateButton;
