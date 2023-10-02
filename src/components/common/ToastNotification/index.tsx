"use client";

import { Info } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import type { Toast } from "react-hot-toast";

function ToastNotification() {
    return (
        <Toaster
            position="bottom-left"
            toastOptions={{
                style: {
                    fontFamily: "var(--font-heading)",
                },
            }}
        />
    );
}

type ToastOptions = {
    id: string;
    message: string;
} & Partial<Toast>;

const showSuccessToast = (toastOptions: ToastOptions) => {
    return toast.success(toastOptions.message, {
        id: toastOptions.id,
        duration: toastOptions.duration,
    });
};

const showInfoToast = (toastOptions: ToastOptions) => {
    return toast(toastOptions.message, {
        id: toastOptions.id,
        duration: toastOptions.duration,
        icon: <Info />,
    });
};

const showErrorToast = (toastOptions: ToastOptions) => {
    return toast.error(toastOptions.message, {
        id: toastOptions.id,
        duration: toastOptions.duration,
    });
};

const showLoadingToast = (toastOptions: ToastOptions) => {
    return toast.loading(toastOptions.message, {
        id: toastOptions.id,
        duration: toastOptions.duration,
    });
};

export { showSuccessToast, showInfoToast, showErrorToast, showLoadingToast };

export default ToastNotification;
