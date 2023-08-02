import type { WalletAdapter } from "@mysten/wallet-adapter-base";
import { Wallet } from './Wallet';
import { EthosConnectStatus } from '../enums/EthosConnectStatus';
import { WalletAccount } from '@mysten/wallet-standard';
import {SuiClient} from '@mysten/sui.js/client'

export type WalletContextContents = {
    wallets?: WalletAdapter[],
    selectWallet?: ((walletName: string) => void),
    status: EthosConnectStatus,
    client: SuiClient | null,
    wallet?: Wallet;
    altAccount?: WalletAccount;
    setAltAccount: (_account: WalletAccount) => void;
}