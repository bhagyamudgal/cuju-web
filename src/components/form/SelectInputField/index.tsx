"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import type { Option } from "@/src/types";
import { cn } from "@/src/utils/general";

interface Props {
    id: string;
    className?: string;
    placeholderText: string;
    options: Option[];
    defaultValue?: Option | null;
    valueCallback: (value: Option | null) => void;
}

function SelectInputField({
    id,
    className,
    options,
    placeholderText,
    defaultValue,
    valueCallback,
}: Props) {
    const defaultOption = useMemo(() => {
        if (defaultValue) {
            return options.find(
                (option) => option.value === defaultValue.value
            );
        }

        return null;
    }, [defaultValue, options]);

    const [selectedOption, setSelectedOption] = useState<Option | null>(
        defaultOption ?? null
    );
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const selectContainerRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(selectContainerRef, () => setIsDropdownOpen(false));

    useEffect(() => {
        valueCallback(selectedOption ?? null);
    }, [selectedOption]); //eslint-disable-line

    const handleOptionChange = (option: Option) => {
        setSelectedOption(option);

        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div id={id} ref={selectContainerRef} className="relative">
            <button
                type="button"
                className={cn(
                    `flex w-full min-w-[150px] cursor-pointer items-center justify-between space-x-2 rounded-lg border border-black bg-transparent px-4 py-2 font-body outline-none ${
                        isDropdownOpen &&
                        "border-2 border-primary outline-2 -outline-offset-4"
                    }`,
                    className
                )}
                onClick={toggleDropdown}
            >
                <span className="flex items-center space-x-2">
                    {selectedOption?.icon && (
                        <span className="option-icon">
                            <selectedOption.icon />
                        </span>
                    )}

                    {selectedOption?.logo_url && (
                        <span className="option-icon relative h-6 w-6">
                            <Image
                                className="rounded-full"
                                src={selectedOption.logo_url}
                                alt={selectedOption.label}
                                fill
                            />
                        </span>
                    )}

                    {selectedOption ? (
                        <span>{selectedOption.label}</span>
                    ) : (
                        <span className="text-gray-400">{placeholderText}</span>
                    )}
                </span>

                <span>{isDropdownOpen ? <ChevronUp /> : <ChevronDown />}</span>
            </button>

            {isDropdownOpen && (
                <ul className="bg-dark-2 absolute z-10 mt-2 w-full min-w-[150px] space-y-3 rounded-lg border border-black px-4 py-3">
                    {options.map((option) => {
                        const isSelected =
                            selectedOption?.value === option.value;
                        return (
                            <li
                                className={`flex cursor-pointer items-center space-x-2 ${
                                    isSelected
                                        ? "text-gray-400"
                                        : "hover:text-primary"
                                }`}
                                key={option.value}
                                onClick={() => handleOptionChange(option)}
                                onKeyDown={(event) => {
                                    if (
                                        event.key === "Enter" ||
                                        event.key === " "
                                    ) {
                                        handleOptionChange(option);
                                    }
                                }}
                                role="option"
                                aria-selected={option === selectedOption}
                                tabIndex={0}
                            >
                                {option?.icon && (
                                    <span className="option-icon">
                                        <option.icon />
                                    </span>
                                )}

                                {option?.logo_url && (
                                    <span className="option-icon relative h-6 w-6">
                                        <Image
                                            className="rounded-full"
                                            src={option.logo_url}
                                            alt={option.label}
                                            fill
                                        />
                                    </span>
                                )}

                                <span>{option.label}</span>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default SelectInputField;
