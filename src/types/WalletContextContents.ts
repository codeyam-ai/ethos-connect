import type { Wallet } from './Wallet';
import type { WalletAccount, WalletWithSuiFeatures } from '@mysten/wallet-standard';
import type { SuiClient } from '@mysten/sui.js/client'
import { EthosConnectStatus } from '../enums/EthosConnectStatus';

export type WalletContextContents = {
    wallets?: WalletWithSuiFeatures[],
    selectWallet?: ((walletName: string) => void),
    status: EthosConnectStatus,
    client: SuiClient | null,
    wallet?: Wallet;
    altAccount?: WalletAccount;
    setAltAccount: (_account: WalletAccount) => void;
}