"use client";

import type { Register } from "@/src/types";
import { cn } from "@/src/utils/general";

interface Props {
    id: string;
    className?: string;
    placeholderText: string;
    register: Register;
    defaultValue?: string;
    isError?: boolean;
}

function TextBoxField({
    id,
    className,
    placeholderText,
    register,
    defaultValue,
    isError,
}: Props) {
    return (
        <textarea
            id={id}
            className={cn(
                `h-32 w-full resize-none rounded-lg border border-black bg-transparent px-4 py-2 font-body outline-none focus:border-primary ${
                    isError ? "border-red-400 focus:border-red-400" : ""
                }`,
                className
            )}
            defaultValue={defaultValue}
            placeholder={placeholderText}
            {...register?.(id)}
        />
    );
}

export default TextBoxField;
