import { createContext } from 'react';
import type { WalletAdapter } from "@mysten/wallet-adapter-base";

export type WalletContextContent = {
    wallets: WalletAdapter[] | null,
    selectWallet: ((walletName: string) => void) | null
}

const defaultWalletContext: WalletContextContent = {
    wallets: null,
    selectWallet: null
};

const WalletContext = createContext<WalletContextContent>(defaultWalletContext);

export default WalletContext;