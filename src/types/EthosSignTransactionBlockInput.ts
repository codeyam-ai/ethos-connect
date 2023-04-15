import type { TransactionBlock } from '@mysten/sui.js';
import type { IdentifierString, WalletAccount } from '@mysten/wallet-standard';

export interface EthosSignTransactionBlockInput {
    transactionBlock: TransactionBlock;
    account?: WalletAccount;
    chain?: IdentifierString;
}