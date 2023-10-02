import "@/src/app/globals.css";
import { Suez_One, Source_Code_Pro } from "next/font/google";

import Providers from "../components/common/Providers";
import ToastNotification from "../components/common/ToastNotification";

const suezOne = Suez_One({
    variable: "--font-suez-one",
    subsets: ["latin"],
    weight: "400",
});

const sourceCodePro = Source_Code_Pro({
    variable: "--font-source-code-pro",
    subsets: ["latin"],
});

export const metadata = {
    title: "Cuju",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body
                className={`${suezOne.variable} ${sourceCodePro.variable} flex h-screen flex-col bg-gray-200 text-black`}
            >
                <Providers>{children}</Providers>

                <ToastNotification />
            </body>
        </html>
    );
}
