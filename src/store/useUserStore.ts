import { create } from "zustand";

interface UserState {
    authStatus: "unauthenticated" | "authenticated" | "loading";
    isConnectingWallet: boolean;
    isSigningIn: boolean;
    isSigningOut: boolean;
    setIsConnectingWallet: (isConnectingWallet: boolean) => void;
    setIsSigningIn: (isSigningIn: boolean) => void;
    setIsSigningOut: (isSigningOut: boolean) => void;
}

const useUserStore = create<UserState>()((set) => ({
    authStatus: "unauthenticated",
    isConnectingWallet: false,
    isSigningIn: false,
    isSigningOut: false,
    setIsConnectingWallet: (isConnectingWallet: boolean) =>
        set({ isConnectingWallet }),
    setIsSigningIn: (isSigningIn: boolean) => set({ isSigningIn }),
    setIsSigningOut: (isSigningOut: boolean) => set({ isSigningOut }),
}));

export default useUserStore;
