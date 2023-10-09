import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import Button from "../Button";
import useDonation from "@/src/hooks/useDonation";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const DonationDialog = ({ isOpen, onClose }: Props) => {
    const {
        donationAmount,
        donationPaymentHandler,
        isLoading,
        setDonationAmount,
    } = useDonation();

    const pathname = usePathname();

    useEffect(() => {
        onClose();
    }, [pathname]); //eslint-disable-line

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 backdrop-blur-md" />
                <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[90vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-xl bg-gray-300 p-5 focus:outline-none">
                    <div className="flex items-center justify-between">
                        <Dialog.Title className="text-xl text-primary">
                            Donate
                        </Dialog.Title>

                        <Dialog.Close asChild>
                            <button
                                type="button"
                                className="hover:text-primary"
                                aria-label="Close"
                            >
                                <X />
                            </button>
                        </Dialog.Close>
                    </div>
                    <Dialog.Description className="mt-3">
                        By donating you will receive a unique NFT from the DFA
                        team
                    </Dialog.Description>

                    <div className="my-4 space-y-2">
                        <fieldset className="flex flex-wrap items-center justify-between">
                            <label htmlFor="donation-amount">
                                Amount (In SOL):
                            </label>

                            <input
                                type="number"
                                id="donation-amount"
                                className="m-1 rounded-xl bg-gray-100 px-3 py-1 outline-primary"
                                placeholder="Enter donation amount"
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value);

                                    setDonationAmount(value);
                                }}
                            />
                        </fieldset>

                        <p className="text-sm text-gray-600">
                            Note: Minimum donation amount is 0.1 SOL
                        </p>
                    </div>

                    <div className="flex justify-end pt-2">
                        <Button
                            isLoading={isLoading}
                            loadingText="Donating..."
                            onClick={donationPaymentHandler}
                            isDisabled={!donationAmount || donationAmount < 0.1}
                        >
                            Donate Now
                        </Button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default DonationDialog;
