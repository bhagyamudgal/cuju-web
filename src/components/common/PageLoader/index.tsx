"use client";

import { SyncLoader } from "react-spinners";

import { PRIMARY_COLOR } from "@/src/constants";
import { cn } from "@/src/utils/general";

function PageLoader({
    pageName,
    className,
}: {
    pageName?: string;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "flex h-full min-h-[70vh] flex-col items-center justify-center space-y-4 py-10 text-xl text-primary",
                className
            )}
        >
            <SyncLoader color={PRIMARY_COLOR} />

            {pageName && <p>Loading {pageName}</p>}
        </div>
    );
}

export default PageLoader;
