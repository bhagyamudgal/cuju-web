import { cn } from "@/src/utils/general";

interface Props {
    htmlFor: string;
    className?: string;
    children: React.ReactNode;
}

function FieldLabel({ htmlFor, className, children }: Props) {
    return (
        <label
            htmlFor={htmlFor}
            className={cn("min-w-fit font-body", className)}
        >
            {children}
        </label>
    );
}

export default FieldLabel;
