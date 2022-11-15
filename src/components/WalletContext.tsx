import { createContext } from 'react';
import type { WalletAdapter } from "@mysten/wallet-adapter-base";
import { Wallet } from '../types/Wallet';
import { JsonRpcProvider } from '@mysten/sui.js';
import { EthosConnectStatus } from '../enums/EthosConnectStatus';

export type WalletContextContent = {
    wallets?: WalletAdapter[],
    selectWallet?: ((walletName: string) => void),
    status: EthosConnectStatus,
    provider?: JsonRpcProvider,
    wallet?: Wallet
}

const defaultWalletContext: WalletContextContent = {
    status: EthosConnectStatus.Loading
};

const WalletContext = createContext<WalletContextContent>(defaultWalletContext);

export default WalletContext;