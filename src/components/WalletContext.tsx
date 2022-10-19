import { createContext } from 'react';
import type { WalletAdapter } from "@mysten/wallet-adapter-base";

const defaultWallets: WalletAdapter[] | null = null;

const WalletContext = createContext<WalletAdapter[] | null>(defaultWallets);

export default WalletContext;