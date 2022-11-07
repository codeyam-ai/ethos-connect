import { createContext } from 'react';
import type { WalletAdapter } from "@mysten/wallet-adapter-base";
import { SuiAddress } from '@mysten/sui.js';

export type WalletContextContent = {
    wallets?: WalletAdapter[],
    selectWallet?: ((walletName: string) => void),
    connecting: boolean,
    connected: boolean,
    address?: SuiAddress
}

const defaultWalletContext: WalletContextContent = {
    connecting: true,
    connected: false,
};

const WalletContext = createContext<WalletContextContent>(defaultWalletContext);

export default WalletContext;