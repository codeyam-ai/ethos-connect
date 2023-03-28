import type { TransactionBlock } from '@mysten/sui.js';
import type { IdentifierString, SuiSignAndExecuteTransactionBlockInput, WalletAccount } from '@mysten/wallet-standard';

export type EthosSignAndExecuteTransactionBlockInput = {
    transactionBlock: TransactionBlock;
    options?: SuiSignAndExecuteTransactionBlockInput['options'];
    requestType?: SuiSignAndExecuteTransactionBlockInput['requestType'];
    account?: WalletAccount;
    chain?: IdentifierString;
}