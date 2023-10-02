"use client";

import type { Register } from "@/src/types";
import { cn } from "@/src/utils/general";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    placeholderText: string;
    register?: Register;
    isError?: boolean;
};

function NumberInputField({
    id,
    className,
    placeholderText,
    register,
    value,
    onChange,
    onFocus,
    isError,
}: Props) {
    return (
        <input
            id={id}
            type="number"
            className={cn(
                `w-full appearance-none rounded-lg border border-black bg-transparent px-4 py-2 font-body outline-none focus:border-primary ${
                    isError ? "border-red-400 focus:border-red-400" : ""
                }`,
                className
            )}
            value={value}
            placeholder={placeholderText}
            onChange={onChange}
            onFocus={onFocus}
            {...register?.(id)}
        />
    );
}

export default NumberInputField;
