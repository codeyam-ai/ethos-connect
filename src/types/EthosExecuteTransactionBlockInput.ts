import { ExecuteTransactionRequestType, SerializedSignature, SuiTransactionBlockResponseOptions } from '@mysten/sui.js';

export type EthosExecuteTransactionBlockInput = {
    transactionBlock: Uint8Array | string;
    signature: SerializedSignature | SerializedSignature[];
    options?: SuiTransactionBlockResponseOptions;
    requestType?: ExecuteTransactionRequestType;
  }