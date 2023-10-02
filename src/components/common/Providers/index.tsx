"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import WalletContextProvider from "./WalletContextProvider";

function Providers(props: { children: React.ReactNode; session?: Session }) {
    return (
        <WalletContextProvider>
            <SessionProvider session={props?.session}>
                {props?.children}
            </SessionProvider>
        </WalletContextProvider>
    );
}

export default Providers;
