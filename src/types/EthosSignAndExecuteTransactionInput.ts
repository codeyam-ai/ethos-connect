import type { Transaction } from '@mysten/sui.js';
import type { IdentifierString, SuiSignTransactionOptions, WalletAccount } from '@mysten/wallet-standard';

export type EthosSignAndExecuteTransactionInput = {
    transaction: Transaction;
    options?: SuiSignTransactionOptions;
    account?: WalletAccount;
    chain?: IdentifierString;
}