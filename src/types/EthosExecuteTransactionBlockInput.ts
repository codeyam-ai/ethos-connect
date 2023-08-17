import { SerializedSignature } from '@mysten/sui.js/cryptography'
import { ExecuteTransactionRequestType, SuiTransactionBlockResponseOptions } from '@mysten/sui.js/client';

export type EthosExecuteTransactionBlockInput = {
    transactionBlock: Uint8Array | string;
    signature: SerializedSignature | SerializedSignature[];
    options?: SuiTransactionBlockResponseOptions;
    requestType?: ExecuteTransactionRequestType;
  }