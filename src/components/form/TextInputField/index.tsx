"use client";

import type { Register } from "@/src/types";
import { cn } from "@/src/utils/general";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    placeholderText: string;
    register?: Register;
    defaultValue?: string;
    isError?: boolean;
};

function TextInputField({
    id,
    className,
    placeholderText,
    register,
    value,
    onChange,
    defaultValue,
    isError,
    type = "text",
}: Props) {
    return (
        <input
            id={id}
            type={type}
            className={cn(
                `w-full rounded-lg border border-black bg-transparent px-4 py-2 font-body outline-none focus:border-primary ${
                    isError ? "border-red-400 focus:border-red-400" : ""
                }`,
                className
            )}
            defaultValue={defaultValue}
            value={value}
            placeholder={placeholderText}
            onChange={onChange}
            {...register?.(id, {
                setValueAs: (v) => {
                    if (v && v?.trim()) {
                        return v.trim();
                    }

                    return null;
                },
            })}
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
        />
    );
}

export default TextInputField;
