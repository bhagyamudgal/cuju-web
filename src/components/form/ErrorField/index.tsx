import { cn } from "@/src/utils/general";

interface Props {
    isError: boolean;
    errorMessage?: string;
    className?: string;
}

function ErrorField({ errorMessage, isError, className }: Props) {
    if (isError) {
        return (
            <p className={cn("text-sm text-red-400", className)}>
                {errorMessage ?? "Error!"}
            </p>
        );
    }

    return null;
}

export default ErrorField;
