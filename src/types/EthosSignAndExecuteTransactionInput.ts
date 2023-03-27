import type { Transaction } from '@mysten/sui.js';
import type { IdentifierString, SuiSignAndExecuteTransactionInput, WalletAccount } from '@mysten/wallet-standard';

export type EthosSignAndExecuteTransactionInput = {
    transaction: Transaction;
    options?: SuiSignAndExecuteTransactionInput['options'];
    requestType?: SuiSignAndExecuteTransactionInput['requestType'];
    account?: WalletAccount;
    chain?: IdentifierString;
}