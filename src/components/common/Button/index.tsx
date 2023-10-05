"use client";

import Link from "next/link";
import { ClipLoader } from "react-spinners";

import { cn } from "@/src/utils/general";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    link?: string;
    size?: "lg" | "md" | "sm";
    isLoading?: boolean;
    loadingText?: string;
    isDisabled?: boolean;
    target?: "_blank";
};

function Button({
    type = "button",
    link,
    target,
    className,
    size = "md",
    onClick,
    children,
    isLoading = false,
    loadingText = "Loading",
    isDisabled,
}: Props) {
    let buttonSize = "btn-md";

    if (size === "lg") {
        buttonSize = "btn-lg";
    } else if (size === "sm") {
        buttonSize = "btn-sm";
    }

    const disabledClasses = isDisabled
        ? "disabled:bg-gray-400"
        : "bg-gradient-1";

    if (link) {
        if (target === "_blank") {
            return (
                <Link
                    href={link}
                    className={cn(
                        "flex cursor-pointer items-center justify-center space-x-2 rounded-full px-6 font-heading font-medium drop-shadow-lg hover:bg-primary disabled:cursor-not-allowed disabled:bg-gray-400",
                        disabledClasses,
                        buttonSize,
                        className
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {children}
                </Link>
            );
        }
        return (
            <Link
                href={link}
                className={cn(
                    "flex cursor-pointer items-center justify-center space-x-2 rounded-full px-6 font-heading font-medium drop-shadow-lg hover:bg-primary disabled:cursor-not-allowed disabled:bg-gray-400",
                    disabledClasses,
                    buttonSize,
                    className
                )}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            // eslint-disable-next-line react/button-has-type
            type={type}
            className={cn(
                "flex cursor-pointer items-center justify-center space-x-2 rounded-full px-6 font-medium drop-shadow-lg hover:bg-primary disabled:cursor-not-allowed disabled:bg-gray-400",
                disabledClasses,
                buttonSize,
                className
            )}
            onClick={onClick}
            disabled={isLoading || isDisabled}
        >
            {isLoading ? (
                <span className="flex items-center space-x-2">
                    <ClipLoader color="white" size={15} />
                    <span className="font-heading">{loadingText}</span>
                </span>
            ) : (
                children
            )}
        </button>
    );
}

export default Button;
