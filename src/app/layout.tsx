import "@/src/app/globals.css";
import { Suez_One, Source_Code_Pro } from "next/font/google";

import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
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
            <Providers>
                <body
                    className={`${suezOne.variable} ${sourceCodePro.variable} flex h-screen flex-col bg-[#E3E3E3] text-black`}
                >
                    <Header />

                    <div className="flex-grow">{children}</div>

                    <Footer />

                    <ToastNotification />
                </body>
            </Providers>
        </html>
    );
}
