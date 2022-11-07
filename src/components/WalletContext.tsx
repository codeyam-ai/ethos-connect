import { createContext } from 'react';
import type { WalletAdapter } from "@mysten/wallet-adapter-base";

export type WalletContextContent = {
    connecting: boolean,
    connected: boolean,
    noConnection: boolean,
    wallets: WalletAdapter[] | null,
    selectWallet: ((walletName: string) => void) | null
}

const defaultWalletContext: WalletContextContent = {
    connecting: false,
    connected: false,
    noConnection: false,
    wallets: null,
    selectWallet: null
};

const WalletContext = createContext<WalletContextContent>(defaultWalletContext);

export default WalletContext;