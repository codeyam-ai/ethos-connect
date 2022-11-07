import { createContext } from 'react';
import type { WalletAdapter } from "@mysten/wallet-adapter-base";
import { Wallet } from 'types/Wallet';
import { JsonRpcProvider } from '@mysten/sui.js';

export type WalletContextContent = {
    wallets?: WalletAdapter[],
    selectWallet?: ((walletName: string) => void),
    connecting: boolean,
    connected: boolean,
    provider?: JsonRpcProvider,
    wallet?: Wallet
}

const defaultWalletContext: WalletContextContent = {
    connecting: true,
    connected: false,
};

const WalletContext = createContext<WalletContextContent>(defaultWalletContext);

export default WalletContext;