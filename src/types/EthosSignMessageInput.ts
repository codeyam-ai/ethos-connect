import { WalletAccount } from '@mysten/wallet-standard';

export type EthosSignMessageInput = {
    message: string | Uint8Array,
    account?: WalletAccount,
    chain?: string
}