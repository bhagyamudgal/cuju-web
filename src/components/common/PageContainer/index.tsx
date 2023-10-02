import { cn } from "@/src/utils/general";

function PageContainer({
    children,
    className,
}: {
    children: React.ReactNode | React.ReactElement;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "mx-auto w-full max-w-[1440px] px-4 py-6 lg:px-6",
                className
            )}
        >
            {children}
        </div>
    );
}

export default PageContainer;
